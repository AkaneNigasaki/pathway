import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de DevOps : la culture, les pratiques et les outils.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. DevOps est traité ici comme une discipline (culture +
 * pratiques), pas comme un outil : chaque outil cité (GitHub Actions,
 * Terraform, Ansible, Kubernetes…) est présenté factuellement, sans
 * verdict universel. Tous les textes supportent le code inline entre
 * backticks. Aucune statistique inventée : les métriques DORA sont
 * décrites sans seuils chiffrés.
 */
export const LEARNING_DEVOPS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction : DevOps n'est pas un outil",
    level: 1,
    intro:
      "Comprendre ce qu'est vraiment DevOps : une culture et un ensemble de pratiques, pas un logiciel à installer ni un intitulé de poste magique.",
    blocks: [
      {
        kind: "text",
        text: "DevOps est un mouvement né en 2009 (autour des premières conférences DevOpsDays) pour rapprocher les développeurs (« dev ») qui écrivent le code et les exploitants (« ops ») qui le font tourner en production. Avant lui, ces deux mondes se parlaient peu : les devs « jetaient le code par-dessus le mur » et les ops découvraient les problèmes en production. DevOps propose de casser ce mur : mêmes objectifs, responsabilités partagées, automatisation maximale, feedback rapide.",
      },
      {
        kind: "text",
        text: "Point essentiel : DevOps n'est ni un outil, ni un poste, ni une certification. On n'« installe » pas DevOps comme on installe Docker. C'est une façon de travailler : livrer des changements petits et fréquents, automatiser tout ce qui est répétitif, mesurer ce qui compte, et apprendre de chaque incident sans chercher un coupable. Les outils (CI, conteneurs, IaC, monitoring) ne sont que les moyens de cette culture.",
      },
      {
        kind: "text",
        text: "DevOps, c'est livrer du logiciel fiable et souvent, en rapprochant développement et exploitation par la culture, l'automatisation et la mesure.",
      },
      {
        kind: "text",
        text: "Les déploiements « big bang » rares et douloureux : des semaines de préparation, des nuits de mise en production, des pannes mystérieuses que personne ne sait d'où viennent. DevOps répond par des changements petits, testés et réversibles.",
      },
      {
        kind: "fields",
        title: "DevOps : l'essentiel",
        fields: [          {
            label: "Quand l'adopter",
            value:
              "Dès qu'une équipe livre un logiciel utilisé par d'autres : startup comme grande entreprise. Les pratiques s'adaptent à l'échelle — un solo peut faire du DevOps « léger » (CI + déploiement automatisé), une équipe de 50 aura besoin d'une plateforme complète.",
          },
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni « le gars qui fait les serveurs », ni un outil à acheter, ni l'automatisation pour l'automatisation. Embaucher quelqu'un avec « DevOps » dans son titre sans changer les pratiques ne change rien.",
          },
        ],
      },
      {
        kind: "fields",
        title: "CALMS — les 5 piliers de la culture DevOps",
        fields: [
          {
            label: "Culture",
            value:
              "Responsabilité partagée entre dev et ops, confiance, postmortems sans blâme. La technique suit la culture, jamais l'inverse.",
          },
          {
            label: "Automation",
            value:
              "Tout ce qui est fait plus d'une fois à la main est un candidat à l'automatisation : builds, tests, déploiements, provisionnement.",
          },
          {
            label: "Lean",
            value:
              "Petits lots, flux continu, élimination du gaspillage (attentes, travail non terminé, déplacements inutiles du code).",
          },
          {
            label: "Measurement",
            value:
              "Mesurer ce qui compte : fréquence de déploiement, temps de restauration, taux d'échec. On n'améliore que ce qu'on mesure.",
          },
          {
            label: "Sharing",
            value:
              "Partager connaissances, outils et retours d'expérience : documentation, runbooks, revues ouvertes, inner source.",
          },
        ],
      },
    ],
  },
  {
    id: "cycle-devops",
    title: "Le cycle DevOps : une boucle, pas une ligne",
    level: 1,
    intro:
      "Le cycle de vie d'un changement, de l'idée au retour d'expérience — et pourquoi il tourne en boucle.",
    blocks: [
      {
        kind: "diagram",
        title: "Les 8 étapes du cycle (boucle infinie)",
        lines: [
          "              ┌──────────────────────────────────┐",
          "              │              PLAN                │",
          "              │  idées, tickets, priorités       │",
          "              └───────────────┬──────────────────┘",
          "                              ▼",
          "              ┌──────────────────────────────────┐",
          "              │              CODE                │",
          "              │  développement, revues           │",
          "              └───────────────┬──────────────────┘",
          "                              ▼",
          "              ┌──────────────────────────────────┐",
          "              │             BUILD                │",
          "              │  compilation, image, artefact    │",
          "              └───────────────┬──────────────────┘",
          "                              ▼",
          "              ┌──────────────────────────────────┐",
          "              │              TEST                │",
          "              │  tests auto, qualité             │",
          "              └───────────────┬──────────────────┘",
          "                              ▼",
          "              ┌──────────────────────────────────┐",
          "              │             RELEASE              │",
          "              │  versionnage, validation         │",
          "              └───────────────┬──────────────────┘",
          "                              ▼",
          "              ┌──────────────────────────────────┐",
          "              │             DEPLOY               │",
          "              │  mise en production              │",
          "              └───────────────┬──────────────────┘",
          "                              ▼",
          "              ┌──────────────────────────────────┐",
          "              │             OPERATE              │",
          "              │  exploitation, incidents         │",
          "              └───────────────┬──────────────────┘",
          "                              ▼",
          "              ┌──────────────────────────────────┐",
          "              │             MONITOR              │",
          "              │  métriques, alertes, retours     │",
          "              └───────────────┬──────────────────┘",
          "                              │",
          "                              └────► retour vers PLAN (la boucle recommence)",
        ],
      },
      {
        kind: "text",
        text: "L'idée clé : chaque étape alimente la suivante, et le monitoring réalimente la planification. Un bug vu en production devient un ticket, puis du code, puis un test qui empêchera sa réapparition. C'est cette boucle courte qui rend les équipes rapides ET fiables : on n'essaie pas de tout prévoir, on apprend vite.",
      },
      {
        kind: "list",
        items: [
          "La moitié gauche (plan → release) concerne surtout le flux de changement ; la moitié droite (deploy → monitor) concerne l'exploitation.",
          "L'automatisation relie les étapes : un commit peut déclencher build, tests et déploiement sans intervention humaine.",
          "Plus la boucle est courte (de l'idée au retour utilisateur), plus l'équipe apprend vite — c'est la mesure qui compte, pas la vitesse brute.",
        ],
      },
    ],
  },
  {
    id: "pourquoi-devops",
    title: "Pourquoi DevOps change tout",
    level: 1,
    intro:
      "Les problèmes concrets que DevOps résout — racontés comme on les vit dans une équipe sans ces pratiques.",
    blocks: [
      {
        kind: "text",
        text: "Sans DevOps, une mise en production ressemble souvent à ceci : des semaines de développements accumulés, une « nuit de déploiement » stressante avec une checklist manuelle de 40 étapes, une panne à 3h du matin que personne ne sait diagnostiquer parce que « ça marchait sur ma machine », puis des jours pour comprendre et corriger. Chaque livraison est un événement risqué, donc on livre rarement — et chaque livraison rare est encore plus risquée. C'est le cercle vicieux des gros lots.",
      },
      {
        kind: "text",
        text: "DevOps inverse la logique : des changements petits et fréquents, chacun testé automatiquement, déployé par une machine (pas un humain stressé à 3h du matin), surveillé dès sa mise en ligne, et réversible en quelques minutes si quelque chose cloche. Le déploiement devient une routine ennuyeuse — et c'est exactement le but : une routine ennuyeuse est une routine fiable.",
      },
      {
        kind: "fields",
        title: "Ce que DevOps apporte, concrètement",
        fields: [
          {
            label: "Livraisons fréquentes",
            value:
              "Des déploiements quotidiens ou hebdomadaires au lieu de trimestriels : les utilisateurs voient les améliorations vite, les retours arrivent vite.",
          },
          {
            label: "Moins de stress",
            value:
              "Un pipeline automatisé et un plan de rollback transforment la mise en production en non-événement. Fini les déploiements du vendredi soir redoutés.",
          },
          {
            label: "Pannes plus courtes",
            value:
              "Monitoring, alertes et runbooks : on détecte vite, on diagnostique vite, on répare vite — et on documente pour la prochaine fois.",
          },
          {
            label: "Équipes alignées",
            value:
              "Dev et ops partagent les objectifs et les outils : moins de « c'est ton problème », plus de « comment on améliore le système ensemble ».",
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
    intro:
      "Ce qu'il faut déjà savoir avant d'attaquer sérieusement DevOps — et ce qu'on peut apprendre en route.",
    blocks: [
      {
        kind: "fields",
        title: "Les fondations indispensables",
        fields: [
          {
            label: "Git",
            value:
              "Indispensable : tout le workflow DevOps part du dépôt Git (déclenchement des pipelines, revues, traçabilité). Savoir brancher, merger et résoudre un conflit suffit pour commencer.",
          },
          {
            label: "Ligne de commande Linux",
            value:
              "Naviguer, lire des logs, gérer des fichiers et des processus (`cd`, `ls`, `tail`, `grep`, `ps`, `systemctl`). La plupart des serveurs et conteneurs tournent sous Linux.",
          },
          {
            label: "Un langage de script",
            value:
              "Bash ou Python pour automatiser : lire un fichier, appeler une API, enchaîner des commandes. Pas besoin d'être développeur expert, mais il faut savoir écrire un petit script.",
          },
          {
            label: "Notions réseau",
            value:
              "IP, ports, DNS, HTTP : comprendre pourquoi une application « n'est pas joignable » dans 80 % des cas de débogage d'infrastructure.",
          },
        ],
      },
      {
        kind: "text",
        text: "Bonne nouvelle : on peut apprendre DevOps par la pratique sur un seul projet personnel. Un dépôt GitHub + un pipeline qui lance les tests + un déploiement automatisé, et vous touchez déjà à 70 % des concepts. Les sections suivantes construisent exactement ce chemin.",
      },
    ],
  },
  {
    id: "premier-pipeline-ci",
    title: "Votre premier pipeline CI (tutoriel)",
    level: 2,
    intro:
      "Le « hello world » du DevOps : un pipeline GitHub Actions qui teste automatiquement votre code à chaque push.",
    blocks: [
      {
        kind: "text",
        text: "L'intégration continue (CI), c'est simple : à chaque fois que du code est poussé, une machine vérifie automatiquement qu'il fonctionne (tests, lint, build). On commence par GitHub Actions car il est intégré à GitHub, gratuit pour les dépôts publics et les petits usages, et son fichier de configuration se versionne avec le code.",
      },
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le fichier de workflow",
            detail:
              "Dans votre dépôt, créez `.github/workflows/ci.yml`. Tout workflow GitHub Actions vit dans ce dossier : il est versionné comme le code, donc l'historique du pipeline suit l'historique du projet.",
          },
          {
            title: "Déclarer le déclencheur",
            detail:
              "La clé `on:` dit quand le pipeline se lance : sur chaque `push` et chaque `pull_request`. Chaque modification de code déclenche une vérification — c'est le cœur de l'intégration continue.",
          },
          {
            title: "Définir le job et la machine",
            detail:
              "Un `job` regroupe des étapes qui s'exécutent sur une même machine virtuelle (`runs-on: ubuntu-latest`). GitHub fournit la machine : rien à installer chez vous.",
          },
          {
            title: "Écrire les étapes",
            detail:
              "Les `steps` s'enchaînent : récupérer le code (`actions/checkout`), installer le runtime (`actions/setup-node`), installer les dépendances (`npm ci`), lancer les tests (`npm test`). Si une étape échoue, le pipeline s'arrête et le commit est marqué en rouge.",
          },
          {
            title: "Pousser et observer",
            detail:
              "Commitez, poussez, puis regardez l'onglet « Actions » du dépôt : le workflow apparaît, chaque étape affiche ses logs en temps réel. Vert = le code est sain ; rouge = quelque chose à corriger avant de merger.",
          },
        ],
      },
      {
        kind: "code",
        language: "yaml",
        title: ".github/workflows/ci.yml — pipeline minimal",
        code: "name: CI\n\non:\n  push:\n  pull_request:\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: \"lts/*\"\n      - run: npm ci\n      - run: npm test",
      },
      {
        kind: "text",
        text: "Note sur `${{ }}` : dans les workflows vous croiserez la syntaxe `${{ github.sha }}` ou `${{ secrets.TOKEN }}` — ce sont des expressions évaluées par GitHub Actions (contexte d'exécution, secrets). Ce n'est pas du shell : ne les mettez jamais entre guillemets simples dans un `run:` si vous voulez qu'elles soient interpolées… et ne les affichez jamais dans les logs quand elles contiennent un secret.",
      },
    ],
  },
  {
    id: "anatomie-workflow-yaml",
    title: "Anatomie d'un workflow GitHub Actions",
    level: 2,
    intro:
      "Comprendre chaque mot-clé d'un workflow pour pouvoir lire — puis écrire — n'importe quel pipeline.",
    blocks: [
      {
        kind: "fields",
        title: "Les briques d'un workflow, une par une",
        fields: [
          {
            label: "name",
            value:
              "Le nom affiché du workflow dans l'onglet Actions. Purement informatif, mais un bon nom (« CI », « Déploiement staging ») aide à s'y retrouver.",
          },
          {
            label: "on",
            value:
              "Le déclencheur : `push`, `pull_request`, `schedule` (cron), `workflow_dispatch` (bouton manuel), `release`, etc. On peut filtrer par branche ou par chemin de fichiers modifiés.",
          },
          {
            label: "jobs",
            value:
              "Les tâches du pipeline. Par défaut elles tournent EN PARALLÈLE sur des machines séparées ; `needs:` crée une dépendance (ex. `deploy` a besoin de `test`).",
          },
          {
            label: "runs-on",
            value:
              "Le type de machine : `ubuntu-latest`, `windows-latest`, `macos-latest`, ou un runner auto-hébergé. Le code du job ne voit que cette machine.",
          },
          {
            label: "steps / uses",
            value:
              "`uses:` appelle une action réutilisable (ex. `actions/checkout@v4` pour cloner le dépôt). Le `@v4` fige la version majeure — toujours épingler une version, jamais `@main`.",
          },
          {
            label: "steps / run",
            value:
              "`run:` exécute une commande shell directement. C'est là que vivent `npm ci`, `npm test`, `docker build`… Chaque `run` démarre un nouveau shell : les variables d'environnement exportées ne survivent pas d'une étape à l'autre (sauf via `$GITHUB_ENV`).",
          },
          {
            label: "with / env",
            value:
              "`with:` passe des paramètres à une action ; `env:` définit des variables d'environnement pour une étape ou un job. Les secrets arrivent via `secrets.NOM` (voir la section dédiée).",
          },
        ],
      },
      {
        kind: "code",
        language: "yaml",
        title: "Workflow avec dépendance entre jobs et secret",
        code: "name: Build et déploiement\n\non:\n  push:\n    branches: [\"main\"]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm run build\n\n  deploy:\n    needs: build\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo \"Déploiement…\"\n        env:\n          API_TOKEN: ${{ secrets.API_TOKEN }}",
      },
      {
        kind: "text",
        text: "Erreur fréquente : oublier `needs:` et supposer que les jobs s'exécutent dans l'ordre du fichier. Sans `needs`, `deploy` pourrait partir AVANT la fin de `build`. L'ordre visuel du YAML ne garantit rien : seules les dépendances déclarées comptent.",
      },
    ],
  },
  {
    id: "commandes-gh-cli",
    title: "Piloter les pipelines depuis le terminal",
    level: 2,
    intro:
      "La CLI `gh` (GitHub CLI) permet de suivre et déclencher les workflows sans quitter le terminal.",
    blocks: [
      {
        kind: "command",
        label: "Lister les workflows du dépôt",
        command: "gh workflow list",
        why: "Voir en un coup d'œil les pipelines configurés, leur état et leur fichier source. Utile avant de modifier un workflow pour vérifier son nom exact.",
        verify: "La sortie affiche chaque workflow avec son état (active/disabled) et son fichier `.yml`.",
      },
      {
        kind: "command",
        label: "Voir les dernières exécutions",
        command: "gh run list --limit 10",
        why: "Lister les runs récents avec leur statut (completed success, failure…), la branche et le commit. C'est le point d'entrée pour diagnostiquer un pipeline rouge.",
        verify: "Chaque ligne montre un run : ID, nom du workflow, statut, branche.",
      },
      {
        kind: "command",
        label: "Suivre un run en direct",
        command: "gh run watch",
        why: "Attacher le terminal au run le plus récent et voir les logs défiler en temps réel, étape par étape. Évite les allers-retours dans l'interface web pendant le débogage.",
        verify: "Les jobs passent de « in progress » à « completed » sous vos yeux, avec les logs de chaque étape.",
      },
      {
        kind: "command",
        label: "Déclencher un workflow manuellement",
        command: "gh workflow run CI",
        why: "Lancer à la demande un workflow qui accepte `workflow_dispatch`. Pratique pour relancer un déploiement ou tester un pipeline sans faire un commit vide.",
        verify: "`gh run list` montre ensuite le nouveau run en cours.",
      },
    ],
  },
  {
    id: "ci-vs-cd",
    title: "CI vs CD : la distinction qui évite les confusions",
    level: 2,
    intro:
      "Trois concepts qu'on mélange constamment : intégration continue, livraison continue, déploiement continu.",
    blocks: [
      {
        kind: "table",
        headers: ["Pratique", "Question à laquelle elle répond", "Déclenchée par"],
        rows: [
          [
            "Intégration continue (CI)",
            "« Est-ce que le code fonctionne ? » — chaque changement est fusionné et vérifié (build + tests) automatiquement.",
            "Chaque push / pull request.",
          ],
          [
            "Livraison continue (Continuous Delivery)",
            "« Est-ce qu'on PEUT livrer à tout moment ? » — le code est toujours dans un état déployable, mais la mise en production reste une décision humaine (un clic).",
            "Pipeline CI vert + validation manuelle.",
          ],
          [
            "Déploiement continu (Continuous Deployment)",
            "« Est-ce qu'on livre VRAIMENT à chaque fois ? » — chaque changement validé part automatiquement en production, sans intervention humaine.",
            "Chaque merge sur la branche principale.",
          ],
        ],
      },
      {
        kind: "text",
        text: "Le piège classique : dire « on fait du CD » en parlant de CI. Avoir des tests automatiques, c'est de la CI. Le CD (livraison ou déploiement) commence quand le pipeline peut amener le code jusqu'en production. Et « CD » tout seul est ambigu : précisez toujours « livraison continue » (avec validation humaine) ou « déploiement continu » (entièrement automatique).",
      },
      {
        kind: "fields",
        title: "Quel niveau viser ?",
        fields: [
          {
            label: "CI seule",
            value:
              "Le minimum vital pour toute équipe : tests automatiques à chaque changement. Sans elle, le reste est fragile.",
          },
          {
            label: "Livraison continue",
            value:
              "Le bon compromis pour la plupart des équipes : le pipeline prépare tout, un humain appuie sur le bouton en production. Contrôle + automatisation.",
          },
          {
            label: "Déploiement continu",
            value:
              "Pour les équipes matures avec une excellente couverture de tests, du monitoring solide et un rollback rapide. Pas un objectif obligatoire : beaucoup d'excellentes équipes restent en livraison continue.",
          },
        ],
      },
    ],
  },
  {
    id: "environnements",
    title: "Les environnements : dev, staging, production",
    level: 2,
    intro:
      "Pourquoi on ne déploie jamais directement en production, et à quoi sert chaque environnement.",
    blocks: [
      {
        kind: "table",
        headers: ["Environnement", "Rôle", "Caractéristiques"],
        rows: [
          [
            "Development (dev)",
            "Le terrain de jeu du développeur : machine locale ou environnement personnel.",
            "Données factices, instable par nature, on peut tout casser sans conséquence.",
          ],
          [
            "Staging (pré-production)",
            "La répétition générale : une copie aussi fidèle que possible de la production.",
            "Même configuration, données anonymisées proches du réel, derniers tests avant la vraie mise en ligne.",
          ],
          [
            "Production (prod)",
            "Le spectacle : ce que les vrais utilisateurs utilisent.",
            "Données réelles, haute disponibilité exigée, chaque changement y est surveillé de près.",
          ],
        ],
      },
      {
        kind: "text",
        text: "La règle d'or : les environnements doivent être aussi semblables que possible (même système, mêmes versions, même configuration — idéalement générés par le même code d'infrastructure). Chaque différence entre staging et prod est un bug potentiel qui ne se révélera qu'au pire moment. Le staging ne sert à rien s'il ne ressemble pas à la prod.",
      },
      {
        kind: "fields",
        title: "Bonnes pratiques des environnements",
        fields: [
          {
            label: "Promotion, pas reconstruction",
            value:
              "Le MÊME artefact (même image, même binaire) traverse les environnements. On ne recompile pas pour la prod : on promeut ce qui a été testé en staging.",
          },
          {
            label: "Configuration par environnement",
            value:
              "Ce qui change entre envs (URLs, clés, tailles) vient de variables d'environnement ou de fichiers de config — jamais du code.",
          },
          {
            label: "Données de prod protégées",
            value:
              "Jamais de vraies données utilisateurs en dev/staging : anonymisation ou jeux de données synthétiques. C'est aussi une exigence réglementaire dans beaucoup de contextes.",
          },
        ],
      },
    ],
  },
  {
    id: "feature-flags",
    title: "Feature flags : découpler déploiement et mise à disposition",
    level: 2,
    intro:
      "Déployer du code sans l'activer : la technique qui rend le déploiement continu sûr.",
    blocks: [
      {
        kind: "text",
        text: "Un feature flag (ou feature toggle) est un simple interrupteur dans le code : `if (flagNouveauPanier) { … } else { … }`. Le code de la nouvelle fonctionnalité est déployé en production mais DORMANT, puis activé progressivement : 1 % des utilisateurs, puis 10 %, puis tout le monde. Si un problème survient, on coupe le flag — sans redéployer.",
      },
      {
        kind: "text",
        text: "Séparer « le code est en production » de « la fonctionnalité est visible » pour pouvoir déployer souvent et activer prudemment.",
      },
      {
        kind: "text",
        text: "Parce que le risque n'est pas dans le déploiement, il est dans l'activation. Les flags transforment un déploiement risqué en activation réversible en un clic.",
      },
      {
        kind: "text",
        text: "Nouvelles fonctionnalités à risque, tests A/B, migrations progressives, kill switch d'urgence. Inutile pour un simple correctif de bug.",
      },
      {
        kind: "fields",
        title: "Feature flags en pratique",
        fields: [
          {
            label: "Exemple simple",
            value:
              "Une variable d'environnement `FEATURE_NOUVEAU_PANIER=true` lue au démarrage ; un service dédié (Unleash, LaunchDarkly, ou une table en base) pour du ciblage fin par utilisateur.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Laisser des flags morts s'accumuler : chaque flag oublié est de la dette technique (branches de code jamais nettoyées). Règle : un flag a une date de retrait prévue dès sa création.",
          },
          {
            label: "Bonne pratique",
            value:
              "Nommer les flags explicitement (`checkout-nouveau-flux`), les documenter, et traiter leur suppression comme une tâche du ticket d'origine — pas comme un « plus tard ».",
          },
        ],
      },
    ],
  },
  {
    id: "strategies-branches",
    title: "Stratégies de branches pour livrer souvent",
    level: 2,
    intro:
      "Votre façon de brancher détermine votre capacité à livrer : deux approches, leurs compromis réels.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Trunk-based development", "Git Flow (et variantes)"],
        rows: [
          [
            "Principe",
            "Tout le monde travaille sur (ou près de) la branche principale ; branches courtes (quelques heures à 2 jours max), intégration permanente.",
            "Branches longue durée par type (`feature/`, `develop`, `release/`, `hotfix/`) avec des merges planifiés.",
          ],
          [
            "Idéal pour",
            "Livraison continue / déploiement continu : petits changements qui partent vite.",
          ],
          [
            "Idéal pour",
            "Versions planifiées, plusieurs versions maintenues en parallèle, équipes avec des cycles de release formels.",
          ],
          [
            "Exige",
            "Feature flags, CI rapide et fiable, revues de code disciplinées.",
            "Rigueur dans les merges, gestion des conflits sur les branches longues.",
          ],
          [
            "Risque typique",
            "Un commit cassé bloque tout le monde sur `main` (d'où l'importance de la CI).",
            "« Merge hell » : des semaines de divergences à réconcilier avant chaque release.",
          ],
        ],
      },
      {
        kind: "text",
        text: "Position honnête : aucune stratégie n'est universellement meilleure. Le trunk-based est le choix naturel quand on vise des livraisons fréquentes (c'est celui que recommandent les études DORA), Git Flow reste pertinent quand on doit maintenir plusieurs versions stables en parallèle. Le vrai anti-pattern, c'est la branche feature qui vit trois semaines sans être intégrée — quelle que soit la stratégie affichée.",
      },
    ],
  },
  {
    id: "docker-essentiel",
    title: "Docker : l'essentiel pour le pipeline",
    level: 2,
    intro:
      "Image contre conteneur, et les quatre commandes qui couvrent 80 % des besoins DevOps.",
    blocks: [
      {
        kind: "text",
        text: "En DevOps, Docker sert à empaqueter l'application et tout son environnement (runtime, dépendances, configuration) dans une IMAGE immuable, puis à l'exécuter comme CONTENEUR n'importe où : poste dev, CI, staging, prod. « Ça marchait sur ma machine » disparaît quand la machine est la même partout — parce que c'est littéralement la même image.",
      },
      {
        kind: "command",
        label: "Construire l'image",
        command: "docker build -t mon-app:1.0 .",
        why: "Fabrique une image versionnée (`1.0`) à partir du `Dockerfile` du répertoire courant (`.`). Le tag est crucial : `latest` seul est ambigu, un numéro de version permet de savoir exactement ce qui tourne et de revenir en arrière.",
        verify: "`docker images` liste `mon-app:1.0` avec sa taille et sa date.",
      },
      {
        kind: "command",
        label: "Lancer un conteneur",
        command: "docker run -d -p 8080:80 mon-app:1.0",
        why: "Démarre un conteneur détaché (`-d`, en arrière-plan) depuis l'image, en exposant le port 80 du conteneur sur le port 8080 de la machine (`-p`). Séparer l'image (le modèle) du conteneur (l'instance) permet de lancer plusieurs copies identiques.",
        verify: "`docker ps` montre le conteneur en cours d'exécution ; `curl localhost:8080` répond.",
      },
      {
        kind: "command",
        label: "Voir les conteneurs actifs",
        command: "docker ps",
        why: "Liste les conteneurs en cours d'exécution avec leur image, leurs ports et leur âge. Le premier réflexe quand « ça ne répond plus » : vérifier que le conteneur tourne vraiment.",
        verify: "La sortie liste chaque conteneur avec son statut `Up ...`.",
      },
      {
        kind: "command",
        label: "Lire les logs d'un conteneur",
        command: "docker logs mon-conteneur",
        why: "Affiche ce que l'application écrit sur sa sortie standard. En conteneur, les logs vont sur stdout/stderr (jamais dans des fichiers locaux) : c'est ce qui permet de les collecter de façon centralisée.",
        verify: "Les dernières lignes de log de l'application s'affichent ; `--follow` les suit en temps réel.",
      },
      {
        kind: "text",
        text: "Erreur fréquente : stocker des données importantes DANS le conteneur. Un conteneur est éphémère par design : on peut le détruire et le recréer à tout moment. Données persistantes = volumes ou base externe, jamais le système de fichiers du conteneur.",
      },
    ],
  },
  {
    id: "secrets-gestion",
    title: "Gérer les secrets sans les exposer",
    level: 2,
    intro:
      "Clés API, mots de passe, tokens : les règles non négociables pour ne pas les fuiter.",
    blocks: [
      {
        kind: "text",
        text: "Un secret n'est jamais dans le code, jamais dans Git, jamais dans les logs : il est injecté au moment de l'exécution par un mécanisme dédié.",
      },
      {
        kind: "text",
        text: "Un secret commité dans Git est compromis pour toujours : l'historique le garde, les clones le propagent, les robots le trouvent en quelques minutes sur les dépôts publics.",
      },
      {
        kind: "fields",
        title: "Les règles des secrets",
        fields: [          {
            label: "Comment (CI)",
            value:
              "GitHub : `Settings → Secrets → Actions`, puis `${{ secrets.NOM }}` dans le workflow. GitLab : variables CI/CD masquées et protégées. Jamais de secret en clair dans le YAML.",
          },
          {
            label: "Comment (applications)",
            value:
              "Variables d'environnement injectées au déploiement, ou gestionnaire dédié (HashiCorp Vault, AWS Secrets Manager, Azure Key Vault — à choisir selon votre plateforme).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Le fichier `.env` commité « par accident », ou le secret passé en argument de `docker build` (il reste dans les couches de l'image !). `.env` doit être dans le `.gitignore` dès le premier commit.",
          },
          {
            label: "Bonne pratique",
            value:
              "Rotation régulière, moindre privilège (un token ne peut faire que ce qu'il doit faire), et secrets différents par environnement. Un token de dev ne doit jamais ouvrir la prod.",
          },
        ],
      },
    ],
  },
  {
    id: "observabilite-piliers",
    title: "Observabilité : logs, métriques, traces",
    level: 2,
    intro:
      "Les trois piliers qui permettent de comprendre ce qui se passe en production — avant que les utilisateurs ne vous l'apprennent.",
    blocks: [
      {
        kind: "table",
        headers: ["Pilier", "Ce que c'est", "Question typique"],
        rows: [
          [
            "Logs",
            "Les événements écrits par l'application (« l'utilisateur X a payé », « erreur de connexion à la base »).",
            "« Que s'est-il passé exactement à 14h32 ? »",
          ],
          [
            "Métriques",
            "Des nombres mesurés dans le temps : temps de réponse, taux d'erreur, CPU, requêtes/seconde.",
            "« Le système est-il en bonne santé en ce moment ? »",
          ],
          [
            "Traces",
            "Le parcours d'une requête à travers les services (API → auth → base → cache), avec le temps passé dans chacun.",
            "« Pourquoi CETTE requête précise est-elle lente ? »",
          ],
        ],
      },
      {
        kind: "text",
        text: "La distinction monitoring / observabilité : le monitoring répond à des questions connues à l'avance (« le CPU dépasse-t-il 80 % ? »), l'observabilité permet d'explorer des questions imprévues (« pourquoi les paiements échouent-ils seulement pour les utilisateurs mobile depuis ce matin ? »). Les trois piliers corrélés (même requête retrouvée dans logs, métriques et traces) donnent une vraie observabilité. OpenTelemetry est le standard ouvert pour instrumenter tout cela sans être lié à un fournisseur.",
      },
      {
        kind: "fields",
        title: "Mettre en place l'essentiel",
        fields: [
          {
            label: "Logs structurés",
            value:
              "Écrire des logs en JSON avec des champs (`niveau`, `service`, `request_id`) plutôt que du texte libre : ils deviennent cherchables et agrégeables.",
          },
          {
            label: "Métriques RED",
            value:
              "Pour chaque service : Rate (requêtes/s), Errors (taux d'erreur), Duration (temps de réponse). Trois métriques qui résument la santé d'un service.",
          },
          {
            label: "Corrélation",
            value:
              "Propager un identifiant de requête unique (`request_id` / `trace_id`) dans tous les services : sans lui, impossible de reconstituer le parcours d'une requête.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le quotidien d'une équipe DevOps",
    level: 2,
    intro:
      "À quoi ressemble une journée quand les pratiques sont en place : la boucle de feedback en action.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "On code petit",
            detail:
              "Chaque développeur pousse des changements petits sur des branches courtes. Les revues de code sont rapides parce que les changements sont petits — personne ne relit sérieusement 2000 lignes.",
          },
          {
            title: "La CI vérifie tout",
            detail:
              "Chaque push déclenche tests, lint et build. Un pipeline rouge bloque le merge : la branche principale reste toujours verte, toujours déployable.",
          },
          {
            title: "On déploie sans cérémonie",
            detail:
              "Le pipeline promeut le même artefact vers staging puis production (manuellement ou automatiquement selon la maturité). Pas de « nuit de déploiement » : c'est une routine.",
          },
          {
            title: "On observe",
            detail:
              "Dashboards et alertes surveillent la mise en production. Après chaque déploiement significatif, quelqu'un jette un œil aux métriques — c'est le « baby-sitting » du déploiement, qui dure quelques minutes quand tout est automatisé.",
          },
          {
            title: "On apprend",
            detail:
              "Incident ? Postmortem sans blâme, action corrective suivie, runbook mis à jour. Amélioration continue du système ET du processus — chaque semaine, le pipeline est un peu meilleur que la précédente.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "calms-detail",
    title: "CALMS en détail : le référentiel culturel",
    level: 3,
    intro:
      "Les cinq lettres de CALMS décortiquées : ce que chacune exige concrètement d'une équipe.",
    blocks: [
      {
        kind: "text",
        text: "CALMS (Culture, Automation, Lean, Measurement, Sharing) est le modèle le plus cité pour évaluer la maturité DevOps d'une organisation. Ce n'est pas une checklist à cocher mais une grille de lecture : face à un problème, on se demande quel pilier est faible. Les cinq sections suivantes approfondissent chacun d'eux.",
      },
      {
        kind: "fields",
        title: "Signes que chaque pilier est en bonne santé",
        fields: [
          {
            label: "Culture saine",
            value:
              "Les devs et les ops déjeunent ensemble (au sens propre comme au figuré) ; un incident n'entraîne pas une chasse au coupable ; « je ne sais pas » se dit sans honte.",
          },
          {
            label: "Automation saine",
            value:
              "Personne ne fait deux fois la même manipulation à la main ; le pipeline est la seule voie vers la production — pas de déploiement « à la main, juste cette fois ».",
          },
          {
            label: "Lean sain",
            value:
              "Les changements sont petits, les files d'attente courtes, le travail en cours limité. On mesure le temps entre « idée » et « en production ».",
          },
          {
            label: "Measurement sain",
            value:
              "Les décisions s'appuient sur des données (métriques DORA, SLO) plutôt que sur des opinions ; les dashboards sont consultés, pas décoratifs.",
          },
          {
            label: "Sharing sain",
            value:
              "La documentation existe et est à jour, les postmortems sont partagés à toute l'équipe, les nouveaux arrivants sont opérationnels vite grâce aux runbooks.",
          },
        ],
      },
    ],
  },
  {
    id: "culture-blameless",
    title: "Culture : le postmortem sans blâme",
    level: 3,
    intro:
      "Pourquoi punir l'erreur est contre-productif, et comment transformer chaque incident en apprentissage collectif.",
    blocks: [
      {
        kind: "text",
        text: "Le postmortem sans blâme (blameless postmortem) part d'un constat : dans un système complexe, un incident résulte presque toujours d'une combinaison de facteurs, jamais de la seule « faute » d'une personne. Blâmer pousse à cacher les erreurs ; comprendre pousse à les révéler tôt. Or en exploitation, une erreur révélée tôt est une erreur peu coûteuse.",
      },
      {
        kind: "text",
        text: "Après chaque incident significatif, l'équipe écrit ensemble ce qui s'est passé, pourquoi le système l'a permis, et ce qu'on change — sans nommer de coupable.",
      },
      {
        kind: "text",
        text: "Parce que « qui a cassé » n'apprend rien, alors que « comment le système a-t-il permis que ça casse » apprend tout. Les organisations qui punissent obtiennent le silence ; celles qui apprennent obtiennent la résilience.",
      },
      {
        kind: "fields",
        title: "Le postmortem sans blâme en pratique",
        fields: [          {
            label: "Quand",
            value:
              "Après tout incident ayant impacté les utilisateurs ou failli le faire (near-miss). Pas après chaque micro-alerte : il faut garder le rituel précieux.",
          },
          {
            label: "Structure type",
            value:
              "Résumé, impact (durée, utilisateurs touchés), chronologie factuelle, causes profondes (les « 5 pourquoi »), actions correctives avec responsables ET dates. Relire les actions au postmortem suivant.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Écrire le postmortem puis ne jamais appliquer les actions correctives. Un postmortem sans suivi est pire que rien : il apprend à l'équipe que le rituel ne sert à rien.",
          },
          {
            label: "Bonne pratique",
            value:
              "Partager les postmortems à toute l'entreprise (pas seulement à l'équipe) : l'incident de l'équipe A évite l'incident de l'équipe B. C'est le « Sharing » de CALMS en action.",
          },
        ],
      },
    ],
  },
  {
    id: "automatisation-principe",
    title: "Automatisation : tout ce qui est répétitif",
    level: 3,
    intro:
      "Le principe central : une tâche manuelle répétée est un bug en attente — et du temps volé.",
    blocks: [
      {
        kind: "text",
        text: "L'automatisation n'est pas un but en soi : c'est le moyen d'éliminer les erreurs humaines sur les tâches répétitives et de libérer du temps pour le travail à forte valeur. La règle empirique : si vous faites quelque chose à la main plus de deux fois, automatisez-le. Mais attention à l'ordre : automatiser un processus cassé ne fait que produire des erreurs plus vite. On simplifie d'abord, on automatise ensuite.",
      },
      {
        kind: "fields",
        title: "Quoi automatiser, dans quel ordre",
        fields: [
          {
            label: "1. Build et tests",
            value:
              "Le premier pas, le plus rentable : chaque commit déclenche compilation et tests. Retour en minutes au lieu de jours.",
          },
          {
            label: "2. Déploiement",
            value:
              "Le pipeline amène l'artefact testé jusqu'aux environnements. Fini les checklists manuelles de 40 étapes et les « j'ai oublié de… ».",
          },
          {
            label: "3. Provisionnement",
            value:
              "Créer serveurs, bases, réseaux par code (IaC) plutôt qu'en cliquant dans une console. Reproductible, versionné, révisable.",
          },
          {
            label: "4. Opérations courantes",
            value:
              "Redémarrages, rotations de secrets, nettoyages : des runbooks exécutables plutôt que des procédures Word que personne ne suit.",
          },
        ],
      },
      {
        kind: "text",
        text: "Erreur fréquente : vouloir tout automatiser d'un coup et abandonner devant l'ampleur. L'automatisation est un investissement continu : chaque semaine, on automatise LA tâche manuelle la plus douloureuse. En un an, le paysage a changé.",
      },
    ],
  },
  {
    id: "lean-devops",
    title: "Lean : petits lots, flux continu",
    level: 3,
    intro:
      "L'héritage du lean manufacturing appliqué au logiciel : pourquoi les petits changements sont plus sûrs que les gros.",
    blocks: [
      {
        kind: "text",
        text: "Le lean vient de l'industrie (Toyota) : la valeur, c'est ce qui arrive à l'utilisateur ; tout le reste est du gaspillage — attentes, travail non terminé, reprises, déplacements inutiles. Appliqué au logiciel : un gros lot de changements accumulés pendant un mois, c'est un gros risque concentré. Dix petits changements livrés séparément, c'est dix petits risques maîtrisés, chacun réversible.",
      },
      {
        kind: "fields",
        title: "Les gaspillages typiques d'une équipe logicielle",
        fields: [
          {
            label: "Le travail partiellement fait",
            value:
              "Des branches qui vivent des semaines sans être mergées : du code écrit mais jamais livré, qui se périme et crée des conflits. C'est le gaspillage n°1.",
          },
          {
            label: "L'attente",
            value:
              "Attendre une validation, un environnement, une revue pendant des jours. Chaque attente allonge le délai idée → production sans ajouter de valeur.",
          },
          {
            label: "Les reprises",
            value:
              "Corriger en production ce qu'un test automatisé aurait attrapé en 2 minutes. Le coût d'un bug croît avec le délai de sa détection.",
          },
          {
            label: "Le context switching",
            value:
              "Trop de travail en cours simultané : tout avance lentement, rien ne se termine. Limiter le WIP (work in progress) accélère paradoxalement les livraisons.",
          },
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : visualiser le flux (tableau Kanban du backlog jusqu'à la prod) et mesurer le temps de traversée. Ce qu'on ne voit pas, on ne l'améliore pas — d'où le lien direct avec le « M » de CALMS (Measurement).",
      },
    ],
  },
  {
    id: "mesure-devops",
    title: "Measurement : mesurer ce qui compte",
    level: 3,
    intro:
      "On n'améliore que ce qu'on mesure — mais mesurer les mauvaises choses est pire que ne rien mesurer.",
    blocks: [
      {
        kind: "text",
        text: "La mesure en DevOps sert à piloter l'amélioration, pas à surveiller les individus. La règle d'or : mesurer le SYSTÈME (vitesse et stabilité des livraisons), jamais la productivité individuelle (lignes de code, tickets fermés — des métriques qui se manipulent et détruisent la confiance). Les métriques DORA (voir section dédiée) sont la référence du secteur pour la performance de livraison.",
      },
      {
        kind: "fields",
        title: "Bien et mal mesurer",
        fields: [
          {
            label: "Bonnes métriques",
            value:
              "Fréquence de déploiement, délai de mise en production d'un changement, taux d'échec des changements, temps de restauration (les 4 DORA) ; disponibilité vs SLO.",
          },
          {
            label: "Mauvaises métriques",
            value:
              "Lignes de code par développeur, nombre de commits, tickets fermés : elles récompensent l'agitation, pas la valeur, et incitent à tricher.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Le dashboard que personne ne regarde : des dizaines de graphiques sans seuil d'alerte ni responsable. Une métrique sans action associée est de la décoration.",
          },
          {
            label: "Bonne pratique",
            value:
              "Peu de métriques, visibles par tous, revues régulièrement en équipe, chacune liée à une décision (« si ce chiffre se dégrade, on fait quoi ? »).",
          },
        ],
      },
    ],
  },
  {
    id: "partage-devops",
    title: "Sharing : la connaissance comme infrastructure",
    level: 3,
    intro:
      "Documenter, partager, rendre l'équipe antifragile face aux départs et aux incidents.",
    blocks: [
      {
        kind: "text",
        text: "Le « bus factor » (combien de personnes doivent être renversées par un bus pour paralyser l'équipe) est une blague qui cache un vrai risque : si une seule personne sait déployer, l'équipe est fragile. Le Sharing, c'est traiter la connaissance comme de l'infrastructure : runbooks, documentation vivante, postmortems partagés, pair programming, revues ouvertes.",
      },
      {
        kind: "fields",
        title: "Partager concrètement",
        fields: [
          {
            label: "Runbooks",
            value:
              "Pour chaque alerte : « si X sonne, faire 1, 2, 3 ». Un runbook permet à quelqu'un qui n'a jamais vu l'incident de réagir correctement à 3h du matin.",
          },
          {
            label: "Documentation vivante",
            value:
              "À côté du code (README, docs/ versionnés), courte et à jour. Une doc longue et périmée est pire que pas de doc : elle induit en erreur.",
          },
          {
            label: "Inner source",
            value:
              "Appliquer les pratiques open source en interne : code visible par tous, contributions bienvenues, revues croisées entre équipes.",
          },
          {
            label: "Rituels",
            value:
              "Démos régulières, rétrospectives, partage d'incidents : la connaissance circule aussi par les conversations, pas seulement par les documents.",
          },
        ],
      },
    ],
  },
  {
    id: "pipeline-stages",
    title: "Anatomie d'un pipeline complet",
    level: 3,
    intro:
      "Au-delà du « build + test » : les étapes d'un pipeline mature, de bout en bout.",
    blocks: [
      {
        kind: "diagram",
        title: "Les stages d'un pipeline de livraison",
        lines: [
          "Commit sur main",
          "     │",
          "     ▼",
          "┌─────────────┐",
          "│   LINT      │  qualité du code (ESLint, Ruff…), formatage",
          "└──────┬──────┘",
          "     ▼",
          "┌─────────────┐",
          "│    TEST     │  unitaires → intégration (parallélisés)",
          "└──────┬──────┘",
          "     ▼",
          "┌─────────────┐",
          "│   BUILD     │  compilation, construction de l'image Docker",
          "└──────┬──────┘",
          "     ▼",
          "┌─────────────┐",
          "│   SCAN      │  vulnérabilités dépendances + image (DevSecOps)",
          "└──────┬──────┘",
          "     ▼",
          "┌─────────────┐",
          "│   PUSH      │  publication de l'artefact versionné au registre",
          "└──────┬──────┘",
          "     ▼",
          "┌─────────────┐",
          "│ DEPLOY STG  │  déploiement automatique en staging + tests e2e",
          "└──────┬──────┘",
          "     ▼",
          "┌─────────────┐",
          "│ DEPLOY PROD │  validation (manuelle ou auto) → production",
          "└─────────────┘",
        ],
      },
      {
        kind: "text",
        text: "Deux principes structurent ce pipeline : « fail fast » (les vérifications rapides et bon marché d'abord — inutile de builder si le lint échoue) et « build once » (l'artefact construit une fois traverse tous les stages ; on ne recompile jamais pour la prod). Chaque stage est une porte : si elle est rouge, rien ne passe plus loin.",
      },
      {
        kind: "fields",
        title: "Concevoir un bon pipeline",
        fields: [
          {
            label: "Rapide",
            value:
              "Objectif : un retour en quelques minutes, pas en une heure. Paralléliser les tests, mettre en cache les dépendances, éviter les étapes inutiles. Un pipeline lent est un pipeline contourné.",
          },
          {
            label: "Fiable",
            value:
              "Pas de tests « flaky » (qui échouent aléatoirement) : un pipeline qui crie au loup apprend à l'équipe à l'ignorer. Réparer ou supprimer tout test instable en priorité.",
          },
          {
            label: "Observable",
            value:
              "Chaque échec doit dire clairement QUOI et OÙ : logs accessibles, étapes nommées explicitement, notifications au bon endroit (pas de spam).",
          },
        ],
      },
    ],
  },
  {
    id: "tests-pipeline",
    title: "Les tests dans le pipeline : la pyramide",
    level: 3,
    intro:
      "Quels tests, à quel niveau, et pourquoi l'équilibre entre eux détermine la vitesse du pipeline.",
    blocks: [
      {
        kind: "table",
        headers: ["Niveau", "Ce qu'on teste", "Vitesse / coût", "Rôle dans le pipeline"],
        rows: [
          [
            "Unitaires",
            "Une fonction, une classe, isolée du reste.",
            "Millisecondes, quasi gratuit.",
            "La base : des centaines, lancés à chaque commit.",
          ],
          [
            "Intégration",
            "Plusieurs modules ensemble (API + base de données, par ex.).",
            "Secondes, environnement nécessaire.",
            "Attrapent les problèmes d'assemblage que les unitaires ne voient pas.",
          ],
          [
            "End-to-end (e2e)",
            "Le parcours utilisateur complet dans un environnement proche de la prod.",
            "Minutes, coûteux et parfois instables.",
            "Le filet de sécurité final : peu nombreux, sur les parcours critiques uniquement.",
          ],
        ],
      },
      {
        kind: "text",
        text: "La pyramide dit : beaucoup d'unitaires (rapides, stables), moins d'intégration, très peu d'e2e. L'anti-pattern inverse — le « cône de glace » avec des centaines de tests e2e lents et fragiles — donne un pipeline lent que tout le monde déteste. Et le lint/formatage ne sont pas des tests, mais ils appartiennent au pipeline : ils attrapent gratuitement toute une classe d'erreurs.",
      },
      {
        kind: "fields",
        title: "Règles d'or des tests en CI",
        fields: [
          {
            label: "Déterministes",
            value:
              "Un test doit donner le même résultat à chaque exécution. Pas de dépendance à l'heure réelle, au hasard non seedé, ou à un service externe non mocké.",
          },
          {
            label: "Indépendants",
            value:
              "Chaque test nettoie après lui (base réinitialisée, fichiers temporaires supprimés) : l'ordre d'exécution ne doit jamais influencer le résultat.",
          },
          {
            label: "Le pipeline est la vérité",
            value:
              "« Ça passe sur ma machine » ne compte pas : seul le pipeline décide si le code est bon. D'où l'importance d'environnements CI reproductibles.",
          },
        ],
      },
    ],
  },
  {
    id: "artefacts-registres",
    title: "Artefacts et registres : « build once, deploy anywhere »",
    level: 3,
    intro:
      "Pourquoi on construit une seule fois et on déploie partout — et où vivent les artefacts entre les deux.",
    blocks: [
      {
        kind: "text",
        text: "Un artefact est le résultat versionné du build : image Docker, archive, binaire. Le principe « build once » dit : on construit l'artefact UNE fois, on le stocke dans un REGISTRE (Docker Hub, GitHub Container Registry, Artifact Registry…), puis chaque environnement déploie LE MÊME artefact. Recompiler pour la prod, c'est tester autre chose que ce qu'on livre.",
      },
      {
        kind: "text",
        text: "L'artefact immuable est l'unité de déploiement : ce qui a passé les tests en staging est bit à bit ce qui part en production.",
      },
      {
        kind: "fields",
        title: "Artefacts et registres en pratique",
        fields: [          {
            label: "Versionnement",
            value:
              "Chaque artefact porte un identifiant unique : tag Git, hash de commit, ou version sémantique. `mon-app:1.4.2` ou `mon-app:abc1234` — jamais seulement `latest` en production.",
          },
          {
            label: "Immuabilité",
            value:
              "Un tag publié ne change jamais : si `1.4.2` contenait un bug, on publie `1.4.3`, on ne réécrit pas `1.4.2`. Sinon impossible de savoir ce qui tourne vraiment.",
          },
          {
            label: "Registres",
            value:
              "Le garde-manger des artefacts : Docker Hub (public), GHCR (intégré à GitHub), ou les registres des clouds. Privés pour le code interne, avec contrôle d'accès.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Déployer `latest` en production : au prochain déploiement, `latest` a changé sans qu'on sache exactement vers quoi. Le rollback devient impossible à raisonner.",
          },
        ],
      },
    ],
  },
  {
    id: "versioning-semver",
    title: "Versionnement : SemVer et tags Git",
    level: 3,
    intro:
      "Donner un sens aux numéros de version pour que chacun sache ce qu'un changement implique.",
    blocks: [
      {
        kind: "text",
        text: "Le versionnement sémantique (SemVer, semver.org) structure les versions en `MAJEUR.MINEUR.PATCH` : on incrémente MAJEUR pour un changement incompatible, MINEUR pour une fonctionnalité rétrocompatible, PATCH pour un correctif. `2.4.1` → `2.5.0` : pas de surprise ; `2.4.1` → `3.0.0` : attention, breaking change. Couplé aux tags Git (`git tag v2.5.0`), c'est la traçabilité complète : chaque version pointe vers un commit exact.",
      },
      {
        kind: "command",
        label: "Taguer une version",
        command: "git tag -a v1.2.0 -m \"Version 1.2.0\" && git push origin v1.2.0",
        why: "Crée un tag annoté (avec message et auteur) sur le commit actuel et le pousse. Beaucoup de pipelines déclenchent la release sur les tags : pousser le tag, c'est déclencher la publication de la version.",
        verify: "`git tag --list` affiche `v1.2.0` ; le pipeline de release démarre si configuré sur les tags.",
      },
      {
        kind: "text",
        text: "Bonne pratique : automatiser le versionnement (release-please, semantic-release — des outils qui déduisent la version des messages de commit conventionnels) plutôt que de choisir les numéros à la main. Moins d'oublis, moins de débats.",
      },
    ],
  },
  {
    id: "iac-introduction",
    title: "Infrastructure as Code : l'infra versionnée",
    level: 3,
    intro:
      "Gérer serveurs, réseaux et bases comme du code : versionné, relu, testé, reproductible.",
    blocks: [
      {
        kind: "text",
        text: "L'Infrastructure as Code (IaC) consiste à décrire l'infrastructure (machines virtuelles, réseaux, bases de données, DNS…) dans des fichiers texte versionnés en Git, plutôt qu'en cliquant dans une console. Avantages décisifs : l'environnement se recrée à l'identique en une commande, chaque changement est relu en pull request, et l'historique Git dit qui a changé quoi et quand.",
      },
      {
        kind: "text",
        text: "L'infrastructure devient du code : déclarative, versionnée, reproductible, au lieu d'une configuration manuelle fragile.",
      },
      {
        kind: "text",
        text: "Parce que « le serveur configuré à la main il y a 2 ans par quelqu'un qui est parti » est un cauchemar classique : impossible à reproduire, impossible à auditer, dangereux à toucher.",
      },
      {
        kind: "fields",
        title: "L'IaC : l'essentiel",
        fields: [          {
            label: "Quand",
            value:
              "Dès qu'une infrastructure doit exister plus d'une fois (dev/staging/prod) ou survivre au départ de son créateur. Même pour un projet perso, c'est un excellent exercice.",
          },
          {
            label: "Exemple réel",
            value:
              "Recréer l'environnement de staging après un incident : avec l'IaC, une commande ; sans, des heures de reconfiguration manuelle approximative.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Le « drift » : quelqu'un modifie l'infra à la main « juste pour dépanner » sans mettre à jour le code. Le code ne reflète plus la réalité — la prochaine application écrase la correction manuelle.",
          },
          {
            label: "Bonne pratique",
            value:
              "Le code IaC est la SEULE source de vérité : tout changement passe par Git et le pipeline. Les accès manuels directs à la console sont l'exception tracée, pas la norme.",
          },
        ],
      },
      {
        kind: "table",
        headers: ["Approche", "Philosophie", "Exemples d'outils"],
        rows: [
          [
            "Déclarative",
            "On décrit l'ÉTAT SOUHAITÉ (« je veux 3 serveurs »), l'outil se charge du comment.",
            "Terraform, OpenTofu, CloudFormation, Pulumi (mode déclaratif).",
          ],
          [
            "Impérative / configuration",
            "On décrit les ÉTAPES (« installe X, puis configure Y »), souvent idempotentes.",
            "Ansible, Chef, Puppet, scripts.",
          ],
        ],
      },
      {
        kind: "text",
        text: "En pratique les deux se complètent : Terraform provisionne l'infrastructure (le « quoi »), Ansible configure les machines (le « comment » détaillé). Aucun n'est universellement meilleur : Terraform excelle à gérer des ressources cloud, Ansible à configurer des systèmes — beaucoup d'équipes utilisent les deux.",
      },
    ],
  },
  {
    id: "terraform-bases",
    title: "Terraform : init, plan, apply",
    level: 3,
    intro:
      "Le trio de commandes qui structure tout usage de Terraform, l'outil IaC déclaratif le plus répandu.",
    blocks: [
      {
        kind: "text",
        text: "Terraform (HashiCorp ; son fork communautaire OpenTofu reprend le même langage) décrit l'infrastructure en HCL, un langage déclaratif lisible. Le workflow tient en trois commandes, toujours dans cet ordre : `init` prépare, `plan` montre, `apply` exécute. Cette séparation « montrer avant de faire » est la clé de la sécurité du workflow.",
      },
      {
        kind: "command",
        label: "Initialiser le projet",
        command: "terraform init",
        why: "Télécharge les providers (les plugins qui parlent à chaque plateforme : AWS, Docker, etc.) et prépare le répertoire de travail. À lancer une fois par projet (et après chaque changement de provider). Sans init, rien d'autre ne fonctionne.",
        verify: "Un dossier `.terraform/` apparaît et le message confirme l'initialisation des providers.",
      },
      {
        kind: "command",
        label: "Prévisualiser les changements",
        command: "terraform plan",
        why: "Compare l'état réel de l'infrastructure avec le code et affiche EXACTEMENT ce qui va être créé, modifié ou détruit — sans rien changer. C'est la relecture du changement d'infra : en CI, on commente automatiquement le plan sur la pull request pour revue.",
        verify: "Le résumé final indique par exemple « Plan: 2 to add, 1 to change, 0 to destroy ». Zéro « to destroy » inattendu avant d'appliquer.",
      },
      {
        kind: "command",
        label: "Appliquer les changements",
        command: "terraform apply",
        why: "Exécute le plan : crée, modifie ou détruit les ressources pour atteindre l'état décrit. En interactif, Terraform redemande confirmation ; en pipeline, on applique un plan préalablement relu (jamais d'apply aveugle en production).",
        verify: "`terraform show` ou la console du provider confirme que les ressources existent avec les bons paramètres.",
      },
      {
        kind: "text",
        text: "Erreur fréquente : lancer `apply` sans avoir lu le `plan`, surtout quand il mentionne des destructions. Un `plan` qui propose de détruire une base de données, c'est le moment de s'arrêter et de comprendre — pas de taper « yes » par habitude.",
      },
    ],
  },
  {
    id: "terraform-exemple",
    title: "Terraform : un premier fichier HCL",
    level: 3,
    intro:
      "Lire et comprendre un fichier Terraform minimal, commenté ligne par ligne.",
    blocks: [
      {
        kind: "code",
        language: "hcl",
        title: "main.tf — exemple minimal sans cloud",
        code: "# Déclare les providers nécessaires et leurs versions\nterraform {\n  required_providers {\n    random = {\n      source  = \"hashicorp/random\"\n      version = \"~> 3.6\"\n    }\n  }\n}\n\n# Une ressource : un nom aléatoire généré et géré par Terraform\nresource \"random_pet\" \"nom_serveur\" {\n  length = 2\n}\n\n# Une sortie : affiche la valeur après apply\noutput \"nom_genere\" {\n  value = random_pet.nom_serveur.id\n}",
      },
      {
        kind: "fields",
        title: "Anatomie du fichier",
        fields: [
          {
            label: "terraform { }",
            value:
              "Le bloc de configuration : versions de Terraform et des providers exigées. C'est le contrat de reproductibilité du projet.",
          },
          {
            label: "resource",
            value:
              "Le cœur : `resource \"TYPE\" \"NOM\"` déclare UNE ressource à gérer. Terraform la crée si elle n'existe pas, la met à jour si elle diverge, la détruit si on supprime le bloc.",
          },
          {
            label: "output",
            value:
              "Expose une valeur après `apply` (nom généré, IP d'un serveur…) : utile pour enchaîner avec d'autres outils ou simplement vérifier.",
          },
          {
            label: "Idempotence",
            value:
              "Relancer `apply` dix fois ne change rien après la première : Terraform ne fait que converger vers l'état décrit. C'est ce qui rend l'IaC sûre à réappliquer.",
          },
        ],
      },
      {
        kind: "text",
        text: "Exemple réel : le même fichier avec un provider cloud déclare un bucket de stockage, une base de données et leurs paramètres — puis `plan`/`apply` les créent réellement. La syntaxe ne change pas, seul le provider change : c'est la force de l'abstraction Terraform.",
      },
    ],
  },
  {
    id: "terraform-etat",
    title: "Terraform : comprendre le « state »",
    level: 3,
    intro:
      "Le fichier d'état : la mémoire de Terraform, son talon d'Achille, et comment le gérer proprement.",
    blocks: [
      {
        kind: "text",
        text: "Pour savoir ce qui existe réellement, Terraform tient un fichier d'ÉTAT (`terraform.tfstate`) : la correspondance entre votre code et les ressources créées. C'est ce qui permet le `plan` (« je sais que ce serveur existe déjà, je ne le recrée pas »). Problèmes : ce fichier contient souvent des SECRETS en clair, et si deux personnes appliquent en même temps, il se corrompt.",
      },
      {
        kind: "fields",
        title: "Gérer le state en équipe",
        fields: [
          {
            label: "Backend distant",
            value:
              "Ne jamais garder le state en local en équipe : on le stocke dans un backend partagé (S3, Terraform Cloud, GitLab managed state…). Tout le monde voit le même état.",
          },
          {
            label: "Verrouillage",
            value:
              "Le backend verrouille le state pendant un `apply` : deux applications simultanées sont impossibles. Sans verrou, la corruption guette.",
          },
          {
            label: "Secrets",
            value:
              "Le state contient les secrets en clair : le backend doit être chiffré et son accès restreint aux seules personnes/autorisations nécessaires.",
          },
          {
            label: "Ne jamais éditer à la main",
            value:
              "Le state se manipule via `terraform import` (adopter une ressource existante) ou `terraform state mv` (renommer), jamais avec un éditeur de texte.",
          },
        ],
      },
    ],
  },
  {
    id: "ansible-notions",
    title: "Ansible : l'automatisation sans agent",
    level: 3,
    intro:
      "Quand Terraform provisionne, Ansible configure : la gestion de configuration agentless en notions.",
    blocks: [
      {
        kind: "text",
        text: "Ansible automatise la CONFIGURATION des machines via SSH, sans installer d'agent sur les cibles — c'est sa différence majeure. On écrit des playbooks en YAML : des listes de tâches (« installer nginx », « copier ce fichier de config », « démarrer le service ») appliquées à des groupes de machines définis dans un inventaire. Chaque tâche est idempotente : la relancer ne change rien si tout est déjà en place.",
      },
      {
        kind: "code",
        language: "yaml",
        title: "playbook.yml — installer nginx",
        code: "---\n- name: Préparer les serveurs web\n  hosts: web\n  become: true\n  tasks:\n    - name: Installer nginx\n      ansible.builtin.apt:\n        name: nginx\n        state: present\n        update_cache: true\n    - name: Démarrer et activer nginx\n      ansible.builtin.service:\n        name: nginx\n        state: started\n        enabled: true",
      },
      {
        kind: "command",
        label: "Exécuter un playbook",
        command: "ansible-playbook -i inventaire.ini playbook.yml",
        why: "Applique le playbook aux machines listées dans l'inventaire (`-i`). Ansible se connecte en SSH à chacune et exécute les tâches dans l'ordre. Le mode `--check` permet une répétition à blanc, comme le `plan` de Terraform.",
        verify: "Le récapitulatif final affiche `ok`, `changed`, `failed` par machine : zéro `failed`, et `changed=0` à la seconde exécution (idempotence).",
      },
      {
        kind: "text",
        text: "Configuration fine des OS, déploiements applicatifs sur machines existantes, tâches d'administration répétées sur un parc. Complément naturel de Terraform, pas concurrent.",
      },
      {
        kind: "fields",
        title: "Ansible : quand et comment",
        fields: [          {
            label: "Inventaire",
            value:
              "Le fichier qui liste les machines par groupe (`[web]`, `[db]`) : c'est lui qui dit OÙ le playbook s'applique. Versionné comme le reste.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Écrire des tâches non idempotentes (un `shell: echo ... >> fichier` qui duplique la ligne à chaque run). Préférer les modules dédiés (`copy`, `template`, `lineinfile`) aux commandes shell brutes.",
          },
        ],
      },
    ],
  },
  {
    id: "strategies-deploiement",
    title: "Stratégies de déploiement : au-delà du « on remplace tout »",
    level: 3,
    intro:
      "Rolling, blue/green, canary : trois façons de mettre en production sans (trop) trembler.",
    blocks: [
      {
        kind: "table",
        headers: ["Stratégie", "Principe", "Avantages", "Contraintes"],
        rows: [
          [
            "Rolling (progressif)",
            "Remplacer les instances une par une : à tout moment, anciennes et nouvelles versions coexistent.",
            "Simple, pas de doublement des ressources, rollback en re-déployant l'ancienne version.",
            "Pendant le déploiement, deux versions servent du trafic : elles doivent être compatibles (API, base).",
          ],
          [
            "Blue/green",
            "Deux environnements identiques : le nouveau (green) est déployé et testé, puis on bascule TOUT le trafic d'un coup.",
            "Bascule instantanée, rollback immédiat (on rebascule vers blue).",
            "Coûte double en ressources pendant le déploiement ; la bascule brutale expose 100 % du trafic d'un coup.",
          ],
          [
            "Canary",
            "La nouvelle version ne reçoit d'abord qu'une petite fraction du trafic (1 %, 5 %), qu'on augmente si tout va bien.",
            "Le risque est proportionnel au trafic exposé ; on détecte les problèmes sur un échantillon avant généralisation.",
            "Exige un routage fin du trafic et un monitoring capable de comparer les deux versions.",
          ],
        ],
      },
      {
        kind: "text",
        text: "Point commun : toutes exigent des health checks (la plateforme vérifie que la nouvelle version répond avant de lui envoyer du trafic) et un chemin de rollback pensé AVANT le déploiement. La stratégie se choisit selon le risque : correctif mineur → rolling ; refonte à risque → canary ; besoin de rollback instantané → blue/green.",
      },
      {
        kind: "fields",
        title: "Prérequis souvent oubliés",
        fields: [
          {
            label: "Migrations de base compatibles",
            value:
              "La cause n°1 d'échec des déploiements progressifs : l'ancienne ET la nouvelle version doivent fonctionner avec le schéma de base pendant la transition (technique expand/contract).",
          },
          {
            label: "Health checks réels",
            value:
              "Un check qui répond toujours 200 OK ne protège de rien. Il doit vérifier les dépendances critiques (base, cache) pour être utile.",
          },
        ],
      },
    ],
  },
  {
    id: "rollback",
    title: "Rollback : prévoir l'échec avant qu'il arrive",
    level: 3,
    intro:
      "Un déploiement sans plan de retour en arrière est un pari, pas une pratique professionnelle.",
    blocks: [
      {
        kind: "text",
        text: "Le rollback, c'est la capacité à revenir à la version précédente rapidement quand un déploiement tourne mal. L'erreur classique : n'y penser qu'au moment où tout est en feu. Un bon plan de rollback se prépare AVANT : artefact précédent conservé et identifié, procédure testée (au moins en staging), décision claire sur qui peut le déclencher.",
      },
      {
        kind: "text",
        text: "Savoir, avant chaque déploiement, comment revenir en arrière en quelques minutes si les métriques se dégradent.",
      },
      {
        kind: "fields",
        title: "Un plan de rollback solide",
        fields: [          {
            label: "Mécanismes",
            value:
              "Redéployer le tag précédent (rolling), rebascule du trafic (blue/green), couper le feature flag — le flag est souvent le rollback le plus rapide.",
          },
          {
            label: "Le cas épineux : les données",
            value:
              "Revenir sur le CODE est facile ; revenir sur une MIGRATION de base destructive ne l'est pas. D'où les migrations compatibles (expand/contract) et les sauvegardes avant migration.",
          },
          {
            label: "Bonne pratique",
            value:
              "Définir à l'avance les critères de rollback (« si le taux d'erreur dépasse X % pendant Y minutes après le déploiement, on revient en arrière ») : décider sous stress est la pire façon de décider.",
          },
        ],
      },
    ],
  },
  {
    id: "kubernetes-notions",
    title: "Kubernetes : les notions essentielles",
    level: 3,
    intro:
      "L'orchestrateur de conteneurs en notions : ce qu'il fait, ses objets de base, et quand on en a (vraiment) besoin.",
    blocks: [
      {
        kind: "text",
        text: "Kubernetes (souvent « K8s ») orchestre des conteneurs à grande échelle : il décide OÙ lancer chaque conteneur, les redémarre s'ils meurent, répartit le trafic entre eux et fait les montées de version en rolling update. Puissant, mais complexe : c'est une plateforme à opérer, pas un simple outil à installer.",
      },
      {
        kind: "fields",
        title: "Les objets de base",
        fields: [
          {
            label: "Pod",
            value:
              "La plus petite unité : un ou plusieurs conteneurs qui partagent réseau et stockage, toujours déployés ensemble. Éphémère par design.",
          },
          {
            label: "Deployment",
            value:
              "Déclare l'état désiré (« je veux 3 réplicas de cette image ») ; Kubernetes converge vers cet état et gère les mises à jour progressives.",
          },
          {
            label: "Service",
            value:
              "Une adresse stable devant des pods instables : le trafic est réparti entre les pods sains, même quand ils sont remplacés.",
          },
          {
            label: "ConfigMap / Secret",
            value:
              "La configuration (non sensible) et les secrets, injectés dans les pods sans être codés en dur dans l'image.",
          },
        ],
      },
      {
        kind: "command",
        label: "Voir les pods d'un namespace",
        command: "kubectl get pods",
        why: "Liste les pods avec leur statut (Running, CrashLoopBackOff…), leurs redémarrages et leur âge. Le premier réflexe de diagnostic sur un cluster : ce qui ne tourne pas saute aux yeux.",
        verify: "Chaque pod affiche `STATUS Running` et `RESTARTS` à 0 (ou un nombre stable et expliqué).",
      },
      {
        kind: "text",
        text: "Position honnête : Kubernetes est le standard pour orchestrer des dizaines de services, mais c'est de l'over-engineering pour une application simple — un VPS avec Docker Compose ou une plateforme managée suffit largement au début. Adopter K8s, c'est adopter sa complexité opérationnelle : à ne faire que quand le besoin est réel.",
      },
    ],
  },
  {
    id: "sli-slo-sla",
    title: "SLI, SLO, SLA : formaliser la fiabilité",
    level: 3,
    intro:
      "Le vocabulaire de la fiabilité : mesurer ce que les utilisateurs ressentent vraiment, et s'engager dessus.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois S",
        fields: [
          {
            label: "SLI (indicateur)",
            value:
              "Ce qu'on MESURE : par exemple « proportion de requêtes HTTP réussies en moins de 300 ms sur 30 jours ». Un SLI quantifie l'expérience utilisateur.",
          },
          {
            label: "SLO (objectif)",
            value:
              "La CIBLE qu'on se fixe sur le SLI : « 99,9 % de requêtes réussies en moins de 300 ms ». En dessous, on considère le service dégradé et on agit.",
          },
          {
            label: "SLA (accord)",
            value:
              "L'ENGAGEMENT contractuel envers le client, avec conséquences (pénalités, crédits) s'il n'est pas tenu. Le SLA est toujours moins ambitieux que le SLO interne — on se donne une marge.",
          },
        ],
      },
      {
        kind: "text",
        text: "L'idée puissante du SLO : le « budget d'erreur ». Avec un SLO à 99,9 %, on accepte 0,1 % d'échecs — soit environ 43 minutes d'indisponibilité par mois. Tant que le budget n'est pas épuisé, on peut prendre des risques (déployer vite) ; quand il est épuisé, on gèle les nouveautés et on investit dans la fiabilité. La fiabilité devient une décision chiffrée, pas un débat d'opinions.",
      },
      {
        kind: "fields",
        title: "Bien définir ses SLO",
        fields: [
          {
            label: "Mesurer côté utilisateur",
            value:
              "Le SLI doit refléter l'expérience réelle (requêtes réussies vues par le client), pas une métrique interne flatteuse (CPU du serveur à 40 %).",
          },
          {
            label: "Peu de SLO",
            value:
              "Deux ou trois par service critique suffisent (disponibilité, latence). Vingt SLO que personne ne suit ne servent à rien.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Viser 100 % de disponibilité : chaque « 9 » supplémentaire coûte exponentiellement plus cher. 99,9 % vs 99,99 %, c'est un facteur 10 sur le budget d'erreur pour un coût d'ingénierie sans commune mesure.",
          },
        ],
      },
    ],
  },
  {
    id: "alerting",
    title: "Alerting : des alertes qui servent à quelque chose",
    level: 3,
    intro:
      "La différence entre être alerté et être spammé : l'art de l'alerte actionnable.",
    blocks: [
      {
        kind: "text",
        text: "Une alerte doit répondre à trois questions : est-ce URGENT (faut-il agir maintenant ?), est-ce ACTIONNABLE (sait-on quoi faire ?), et est-ce pour MOI (suis-je la bonne personne ?). Toute alerte qui échoue à l'une des trois est du bruit — et le bruit tue : la « fatigue d'alerte » fait qu'on finit par ignorer aussi les vraies urgences.",
      },
      {
        kind: "fields",
        title: "L'alerting en pratique",
        fields: [
          {
            label: "Alerter sur les symptômes, pas les causes",
            value:
              "« Le taux d'erreur dépasse le SLO » (symptôme utilisateur) plutôt que « le CPU est à 85 % » (cause possible parmi d'autres). Le CPU peut être à 85 % sans aucun impact.",
          },
          {
            label: "Chaque alerte a un runbook",
            value:
              "Si on ne sait pas quoi faire quand elle sonne, ce n'est pas une alerte, c'est une notification. Soit on écrit le runbook, soit on supprime l'alerte.",
          },
          {
            label: "Hiérarchiser",
            value:
              "Page (réveiller quelqu'un) uniquement pour un impact utilisateur réel et immédiat ; ticket/message pour le reste. Tout pager « au cas où » garantit qu'on ignorera le jour où ça comptera.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Des seuils statiques jamais réajustés : l'alerte qui sonne à chaque pic normal devient du bruit de fond. Les seuils se calibrent avec l'historique réel du service.",
          },
        ],
      },
    ],
  },
  {
    id: "metriques-dora",
    title: "Les 4 métriques DORA",
    level: 3,
    intro:
      "La référence du secteur pour mesurer la performance de livraison d'une équipe — présentée sans chiffres inventés.",
    blocks: [
      {
        kind: "text",
        text: "DORA (DevOps Research and Assessment, aujourd'hui au sein de Google Cloud) étudie depuis des années ce qui distingue les équipes performantes, via son rapport annuel « Accelerate State of DevOps ». Sa conclusion centrale : vitesse ET stabilité vont ensemble — les équipes qui livrent le plus vite sont aussi celles qui ont le moins d'échecs. Quatre métriques résument cette performance.",
      },
      {
        kind: "fields",
        title: "Les 4 métriques, une par une",
        fields: [
          {
            label: "Fréquence de déploiement",
            value:
              "À quelle fréquence le code part en production. Plus c'est fréquent, plus les changements sont petits — et les petits changements sont moins risqués.",
          },
          {
            label: "Délai de mise en production (lead time)",
            value:
              "Temps entre « le code est commité » et « il tourne en production ». Il mesure la fluidité du pipeline, pas la vitesse des développeurs.",
          },
          {
            label: "Taux d'échec des changements",
            value:
              "Proportion de déploiements qui causent une dégradation nécessitant une intervention (hotfix, rollback). Il mesure la qualité du processus de livraison.",
          },
          {
            label: "Temps de restauration (MTTR)",
            value:
              "Temps moyen pour rétablir le service après un incident. Il mesure la résilience : tout casse un jour, ce qui compte c'est la vitesse de récupération.",
          },
        ],
      },
      {
        kind: "text",
        text: "Note d'honnêteté : DORA publie chaque année des repères qui classent les équipes (des moins aux plus performantes), mais ces seuils évoluent d'un rapport à l'autre et dépendent du contexte. Retenez les quatre métriques et leur logique — pas des chiffres sortis de leur contexte. L'usage correct : suivre VOTRE tendance dans le temps (s'améliore-t-on ?), pas se comparer à un chiffre magique.",
      },
      {
        kind: "fields",
        title: "Utiliser DORA sans se tromper",
        fields: [
          {
            label: "Tendance, pas absolu",
            value:
              "Ce qui compte, c'est la courbe sur 6 mois : le lead time diminue-t-il ? Le MTTR aussi ? Un chiffre isolé ne dit rien.",
          },
          {
            label: "Les 4 ensemble",
            value:
              "Optimiser une seule métrique fausse le jeu (déployer souvent en cassant tout n'est pas de la performance). Les quatre se lisent ensemble : vitesse + stabilité.",
          },
          {
            label: "Jamais sur les individus",
            value:
              "Ce sont des métriques d'ÉQUIPE et de SYSTÈME. Les utiliser pour évaluer une personne détruit la confiance — et donc la performance qu'on prétend mesurer.",
          },
        ],
      },
    ],
  },
  {
    id: "devsecops",
    title: "DevSecOps : la sécurité intégrée, pas ajoutée",
    level: 3,
    intro:
      "« Shift left » : déplacer la sécurité au début du pipeline plutôt qu'en audit de fin de projet.",
    blocks: [
      {
        kind: "text",
        text: "DevSecOps applique le principe DevOps à la sécurité : au lieu d'un audit de sécurité en fin de projet (qui arrive trop tard et bloque tout), les contrôles sont intégrés au pipeline, automatiquement, à chaque changement. L'expression consacrée est « shift left » : déplacer les vérifications vers la gauche du cycle, le plus tôt possible.",
      },
      {
        kind: "fields",
        title: "Les contrôles de sécurité du pipeline",
        fields: [
          {
            label: "Scan des dépendances (SCA)",
            value:
              "Vérifier que les bibliothèques utilisées n'ont pas de vulnérabilités connues. La plupart des failles viennent des dépendances, pas du code écrit en interne.",
          },
          {
            label: "Analyse statique (SAST)",
            value:
              "Analyser le code source sans l'exécuter pour détecter des patterns dangereux (injections, secrets en dur…). Intégré au lint, il donne un retour immédiat.",
          },
          {
            label: "Scan des images",
            value:
              "Scanner les images Docker avant publication : une image basée sur un OS non patché embarque ses vulnérabilités en production.",
          },
          {
            label: "Détection de secrets",
            value:
              "Bloquer tout commit contenant une clé API ou un token (gitleaks, GitHub secret scanning). Le premier rempart contre la fuite de secrets.",
          },
        ],
      },
      {
        kind: "command",
        label: "Auditer les dépendances npm",
        command: "npm audit",
        why: "Liste les vulnérabilités connues dans les dépendances du projet avec leur sévérité. `npm audit fix` tente de les corriger automatiquement. À intégrer au pipeline pour bloquer les merges qui introduisent des failles critiques.",
        verify: "Le rapport indique le nombre de vulnérabilités par sévérité ; zéro critique après correction.",
      },
      {
        kind: "text",
        text: "Erreur fréquente : empiler les scanners sans traiter les résultats — des centaines d'alertes que personne ne lit. Comme pour l'alerting : prioriser (exploitabilité réelle, criticité), corriger progressivement, et configurer des seuils de blocage réalistes que l'équipe peut tenir.",
      },
    ],
  },
  {
    id: "securite-pipeline",
    title: "Sécuriser le pipeline lui-même",
    level: 3,
    intro:
      "Le pipeline a les clés de la production : c'est une cible de choix — et souvent le maillon faible.",
    blocks: [
      {
        kind: "text",
        text: "Un pipeline de déploiement peut pousser du code en production : quiconque le contrôle, contrôle la production. Pourtant on le sécurise rarement aussi bien que la prod elle-même. Les attaques via la chaîne d'approvisionnement logicielle (supply chain) ciblent précisément ce maillon : dépendances compromises, actions CI malveillantes, tokens volés.",
      },
      {
        kind: "fields",
        title: "Durcir le pipeline",
        fields: [
          {
            label: "Moindre privilège",
            value:
              "Chaque job ne reçoit que les permissions strictement nécessaires (en GitHub Actions : `permissions:` explicites et minimales par job, pas de token tout-puissant par défaut).",
          },
          {
            label: "Épingler les actions",
            value:
              "`actions/checkout@v4` plutôt que `@main` : une version flottante peut changer sous vos pieds — y compris de façon malveillante. Les plus exigeants épinglent le hash de commit complet.",
          },
          {
            label: "OIDC plutôt que secrets longue durée",
            value:
              "Pour déployer vers le cloud depuis la CI, préférer l'authentification OIDC (identité fédérée de courte durée) aux clés statiques stockées en secrets : rien à faire fuiter, rien à faire tourner.",
          },
          {
            label: "Protéger la branche principale",
            value:
              "Exiger revue + CI verte avant tout merge sur `main` : sans cela, n'importe quel commit pousse (éventuellement) en production.",
          },
          {
            label: "Auditer les dépendances du pipeline",
            value:
              "Les actions et plugins tiers sont du code exécuté avec vos secrets : limiter leur nombre, privilégier les actions officielles ou auditées.",
          },
        ],
      },
    ],
  },
  {
    id: "documentation-runbooks",
    title: "Runbooks : l'exploitation écrite",
    level: 3,
    intro:
      "Transformer la connaissance tacite des seniors en procédures que toute l'équipe peut exécuter.",
    blocks: [
      {
        kind: "text",
        text: "Un runbook est une procédure pas à pas pour une situation opérationnelle : « l'alerte X sonne », « redémarrer le service Y », « restaurer la base ». Il existe parce qu'à 3h du matin, sous stress, personne ne réfléchit bien — mais tout le monde peut suivre une checklist. C'est le « Sharing » de CALMS appliqué à l'exploitation.",
      },
      {
        kind: "text",
        text: "La procédure écrite qui permet à quelqu'un qui n'a jamais vu l'incident de réagir correctement du premier coup.",
      },
      {
        kind: "fields",
        title: "Un bon runbook",
        fields: [          {
            label: "Contenu type",
            value:
              "Symptômes et comment les confirmer, diagnostic pas à pas (commandes copiables), actions correctives dans l'ordre, critères d'escalade (« si ça ne marche pas après X, appeler Y »).",
          },
          {
            label: "Testé",
            value:
              "Un runbook non testé est une fiction : on le valide en staging ou lors d'exercices (game days). Chaque incident réel est l'occasion de le corriger.",
          },
          {
            label: "À jour",
            value:
              "Relu après chaque incident et chaque changement d'infrastructure. Un runbook périmé est dangereux : il donne une fausse confiance.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Le runbook de 30 pages que personne ne lit : court, direct, avec les commandes copiables en premier et le contexte après.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-frequentes",
    title: "Erreurs fréquentes : le mur des anti-patterns",
    level: 3,
    intro:
      "Neuf erreurs classiques — organisationnelles et techniques — qui font échouer les démarches DevOps.",
    blocks: [
      {
        kind: "fields",
        title: "Les 9 anti-patterns à connaître",
        fields: [
          {
            label: "1. « On a embauché un DevOps »",
            value:
              "Croire qu'un intitulé de poste suffit : la personne devient le « gars des serveurs » pendant que les pratiques ne changent pas. DevOps est une transformation d'équipe, pas un recrutement.",
          },
          {
            label: "2. Automatiser un processus cassé",
            value:
              "Scripter un déploiement manuel chaotique sans le simplifier d'abord : on obtient un chaos plus rapide, pas un processus fiable. Simplifier, puis automatiser.",
          },
          {
            label: "3. Le pipeline rouge normalisé",
            value:
              "Des tests qui échouent « tout le temps » et que tout le monde ignore : le pipeline ne protège plus rien. Règle non négociable : `main` est toujours verte, un test instable est réparé ou supprimé immédiatement.",
          },
          {
            label: "4. « Juste cette fois, à la main »",
            value:
              "Le hotfix déployé manuellement en contournant le pipeline : l'environnement diverge du code versionné, et le prochain déploiement écrase ou casse quelque chose. Le pipeline est la SEULE voie vers la prod.",
          },
          {
            label: "5. Secrets dans Git",
            value:
              "La clé API commitée « temporairement » : elle est compromise dès le push (l'historique la garde pour toujours). Rotation immédiate + détection automatique au pre-commit.",
          },
          {
            label: "6. Environnements qui divergent",
            value:
              "Staging configuré à la main différemment de la prod : les tests en staging ne prouvent plus rien. Même code d'infrastructure partout, seules les variables changent.",
          },
          {
            label: "7. Déployer sans pouvoir revenir",
            value:
              "Aucun plan de rollback, aucune migration compatible : quand ça casse un vendredi soir, c'est la panique. Chaque déploiement a son chemin de retour testé.",
          },
          {
            label: "8. Monitorer sans alerter (ou l'inverse)",
            value:
              "Des dashboards que personne ne regarde, ou des alertes qui spamment : dans les deux cas, l'incident est découvert par les utilisateurs. Alertes actionnables + runbooks, rien de plus.",
          },
          {
            label: "9. ClickOps",
            value:
              "Configurer l'infrastructure en cliquant dans une console cloud : non versionné, non relu, non reproductible. Tout changement d'infra passe par le code et la pull request.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-realistes",
    title: "Projets réalistes : 4 niveaux",
    level: 3,
    intro:
      "Quatre projets progressifs qui construisent, brique par brique, une vraie pratique DevOps.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Pipeline CI pour un projet existant",
        fields: [
          {
            label: "Objectif",
            value:
              "Ajouter à un de vos projets un workflow GitHub Actions : lint + tests + build à chaque push et pull request, avec badge de statut sur le README.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "YAML GitHub Actions (`on`/`jobs`/`steps`), `gh run watch` pour déboguer, protection de branche (CI verte exigée avant merge).",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Lire les logs d'un pipeline, le rendre rapide (cache des dépendances), et ce que « main toujours verte » change au quotidien.",
          },
          {
            label: "Difficulté",
            value: "Débutant — un week-end.",
          },
          {
            label: "Projet suivant",
            value: "Le projet 2, pour provisionner l'infrastructure qui recevra ce code.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — Infrastructure as Code avec Terraform",
        fields: [
          {
            label: "Objectif",
            value:
              "Décrire en Terraform une petite infrastructure complète (réseau + machine + base managée, ou équivalent Docker local), avec backend distant et `plan` commenté automatiquement sur les pull requests.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "`init`/`plan`/`apply`, HCL (resources, variables, outputs), gestion du state distant et verrouillé, revue d'un plan comme on relit du code.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Penser déclaratif, gérer le drift, et pourquoi « l'infra en pull request » change la collaboration avec les équipes.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — deux à trois semaines.",
          },
          {
            label: "Projet suivant",
            value: "Le projet 3 : brancher le pipeline applicatif sur cette infrastructure.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Déploiement complet avec stratégie",
        fields: [
          {
            label: "Objectif",
            value:
              "Pipeline de bout en bout : build de l'image Docker versionnée → scan de vulnérabilités → push au registre → déploiement automatique en staging → promotion en production avec stratégie canary ou blue/green, health checks et rollback documenté.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Artefacts immuables et registres, secrets de CI, stratégies de déploiement, migrations de base compatibles, plan de rollback testé.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Ce que « livraison continue » veut vraiment dire, et pourquoi chaque raccourci (latest en prod, pas de rollback) se paie un jour.",
          },
          {
            label: "Difficulté",
            value: "Avancé — un mois, idéalement en binôme.",
          },
          {
            label: "Projet suivant",
            value: "Le projet 4 : transformer tout cela en plateforme réutilisable.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 4 — Mini plateforme interne",
        fields: [
          {
            label: "Objectif",
            value:
              "Factoriser les acquis en « plateforme » : template de pipeline réutilisable, monitoring (métriques RED + dashboards + alertes avec runbooks), feature flags, et documentation permettant à un nouveau venu de déployer seul dès la première semaine.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Métriques DORA suivies dans le temps, SLI/SLO, alerting actionnable, postmortems sans blâme, documentation vivante.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Le passage de « je sais déployer mon app » à « l'équipe entière livre vite et sereinement » : c'est là que DevOps devient culture, pas technique.",
          },
          {
            label: "Difficulté",
            value: "Avancé — projet d'équipe sur plusieurs mois.",
          },
          {
            label: "Projet suivant",
            value:
              "Approfondir SRE (Site Reliability Engineering) ou le platform engineering : l'étape suivante naturelle.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources officielles",
    level: 3,
    intro:
      "Les documentations de référence des outils et concepts cités — uniquement des sources officielles.",
    blocks: [
      {
        kind: "list",
        items: [
          "GitHub Actions — https://docs.github.com/actions",
          "GitLab CI/CD — https://docs.gitlab.com/ee/ci/",
          "Terraform — https://developer.hashicorp.com/terraform/docs",
          "Ansible — https://docs.ansible.com/",
          "Docker — https://docs.docker.com/",
          "Kubernetes — https://kubernetes.io/docs/",
          "DORA (métriques et rapports) — https://dora.dev/",
          "OpenTelemetry — https://opentelemetry.io/docs/",
          "Google SRE (livres gratuits : SRE, Workbooks) — https://sre.google/",
        ],
      },
      {
        kind: "text",
        text: "Pour aller plus loin côté culture : « The Phoenix Project » et « Accelerate » (Gene Kim, Jez Humble, Nicole Forsgren) racontent respectivement la transformation DevOps sous forme de roman et sous forme d'étude scientifique — les deux sont des références du domaine, pas des tutoriels.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "DevOps maîtrisé dans ses fondamentaux : les directions naturelles pour continuer.",
    blocks: [
      {
        kind: "fields",
        title: "Les prochaines étapes",
        fields: [
          {
            label: "SRE (Site Reliability Engineering)",
            value:
              "La discipline née chez Google qui formalise l'exploitation à grande échelle : SLO, budgets d'erreur, automatisation des opérations. Le prolongement naturel de DevOps côté fiabilité.",
          },
          {
            label: "Platform engineering",
            value:
              "Construire la « plateforme développeur » interne : portails, templates, environnements à la demande. L'industrialisation du DevOps pour les grandes organisations.",
          },
          {
            label: "Cloud et Kubernetes en profondeur",
            value:
              "Si vos projets 3 et 4 vous ont donné le goût de l'orchestration : réseaux, stockage, sécurité et observabilité d'un cluster en production.",
          },
          {
            label: "FinOps",
            value:
              "Le pilotage des coûts cloud (tagging, dimensionnement, achats réservés) : la dimension économique de l'infrastructure, de plus en plus demandée.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le fil rouge de tout ce parcours : DevOps n'est jamais « fini ». Chaque incident, chaque déploiement douloureux, chaque tâche manuelle répétée est une invitation à améliorer le système. La culture de l'amélioration continue est le vrai livrable.",
      },
    ],
  },
];

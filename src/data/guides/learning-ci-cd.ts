import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de la CI/CD : automatiser le chemin du commit à la
 * production avec GitHub Actions et GitLab CI. 3 niveaux d'information
 * (Aperçu / Pratique / Approfondi) avec divulgation progressive. Tous les
 * textes supportent le code inline entre backticks.
 */
export const LEARNING_CI_CD: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est la CI/CD, pourquoi elle existe et ce qu'elle change concrètement dans le quotidien d'une équipe.",
    blocks: [
      {
        kind: "text",
        text: "La CI/CD automatise le chemin du commit à la production. CI (Continuous Integration) : à chaque push, le code est construit et testé automatiquement. CD : Continuous Delivery (le code est toujours prêt à être déployé, la mise en production reste manuelle) ou Continuous Deployment (chaque changement validé est déployé automatiquement). L'objectif est le même : rendre la livraison si fluide qu'elle devient un non-événement.",
      },
      {
        kind: "text",
        text: "Pourquoi ça existe : la livraison manuelle est lente, stressante et source d'erreurs — on déploie rarement, en gros paquets, le vendredi soir, en croisant les doigts. La CI/CD inverse la logique : des déploiements fréquents, petits et réversibles. Un problème est alors facile à identifier (peu de changements) et à annuler (rollback rapide). C'est la marque des équipes qui livrent vite sans casser.",
      },
      {
        kind: "fields",
        title: "CI/CD en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un pipeline automatisé qui transforme chaque commit en candidat testé, construit et déployable à la production.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Supprimer les étapes manuelles répétitives et risquées entre le code écrit et le code en production : build, tests, packaging, déploiement.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Dès qu'un projet a plus d'un contributeur ou plus d'un environnement : même un petit projet gagne à avoir tests et build automatiques.",
          },
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni un simple script de déploiement, ni de la magie : c'est une chaîne d'étapes déclaratives, versionnées dans Git, qui s'exécutent sur des machines dédiées (runners).",
          },
        ],
      },
    ],
  },
  {
    id: "ci-cd-en-une-image",
    title: "CI, livraison continue, déploiement continu",
    level: 1,
    intro:
      "Trois termes souvent confondus, trois niveaux d'automatisation différents.",
    blocks: [
      {
        kind: "diagram",
        title: "Les trois niveaux, du moins au plus automatisé",
        lines: [
          "Commit (git push)",
          "     │",
          "     ▼",
          "CI — Intégration continue",
          "  build + tests + qualité à chaque push",
          "  → on sait en minutes si le code est sain",
          "     │",
          "     ▼",
          "Continuous Delivery — Livraison continue",
          "  l'artefact est construit, testé, PRÊT à déployer",
          "  → la mise en production reste un clic (humain)",
          "     │",
          "     ▼",
          "Continuous Deployment — Déploiement continu",
          "  chaque changement validé part en production SEUL",
          "  → aucun geste manuel, le rollback est la sécurité",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : la CI répond « est-ce que ça marche ? », la livraison continue répond « est-ce qu'on peut déployer ? », le déploiement continu fait « c'est déployé ». La plupart des équipes commencent par CI + livraison continue, et n'activent le déploiement continu que quand les tests et le monitoring sont assez fiables pour s'y fier.",
      },
      {
        kind: "list",
        items: [
          "CI seule : déjà utile — chaque push est testé, les régressions sont détectées en minutes.",
          "Livraison continue : l'étape manuelle restante (le déploiement) devient un bouton, pas une procédure de 2 heures.",
          "Déploiement continu : exige une confiance totale dans les tests automatiques et le rollback — c'est un objectif, pas un point de départ.",
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
      "Ce qu'il faut maîtriser avant de construire son premier pipeline, et pourquoi.",
    blocks: [
      {
        kind: "fields",
        title: "Les fondations du pipeline",
        fields: [
          {
            label: "Git (branches, push, pull requests)",
            value:
              "Le pipeline se déclenche sur les événements Git : push, pull request, tag. Sans branches et PR propres, le pipeline n'a rien de fiable à déclencher.",
          },
          {
            label: "Ligne de commande",
            value:
              "Un pipeline n'est qu'une suite de commandes shell exécutées sur une machine distante : si vous ne savez pas le faire à la main, vous ne pourrez pas le déboguer.",
          },
          {
            label: "Docker (bases)",
            value:
              "Les pipelines modernes construisent et poussent des images : comprendre `build`, `tag` et `push` est indispensable.",
          },
          {
            label: "YAML",
            value:
              "Les pipelines GitHub Actions et GitLab CI se déclarent en YAML : indentation stricte, listes, dictionnaires. Une erreur d'indentation = un pipeline cassé.",
          },
          {
            label: "Tests automatisés (bases)",
            value:
              "Le pipeline exécute vos tests : il faut en avoir. Même quelques tests unitaires suffisent pour que la CI apporte de la valeur.",
          },
        ],
      },
      {
        kind: "text",
        text: "Chaque prérequis est cliquable dans la roadmap : si un point est fragile, consolidez-le d'abord. Un pipeline construit sur des bases approximatives produit des échecs mystérieux.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation et outillage",
    level: 2,
    intro:
      "Les outils à installer pour travailler avec la CI/CD au quotidien.",
    blocks: [
      {
        kind: "command",
        label: "Installer la CLI GitHub (gh)",
        command: "gh auth login",
        why: "La CLI officielle GitHub permet de piloter les workflows depuis le terminal : lister les exécutions, relancer un run, voir les logs. `gh auth login` connecte la CLI à votre compte (navigateur ou token). Sans elle, tout se fait dans l'interface web — possible, mais lent au quotidien.",
        verify: "gh auth status",
      },
      {
        kind: "command",
        label: "Lister les exécutions d'un workflow",
        command: "gh run list --workflow ci.yml",
        why: "Affiche les derniers runs du workflow `ci.yml` : statut (succès/échec), branche, auteur, durée. C'est le point d'entrée pour surveiller la santé du pipeline sans ouvrir le navigateur.",
        verify: "gh run list --limit 5",
      },
      {
        kind: "text",
        text: "Pour GitLab, l'interface web suffit au début ; la CLI `glab` existe pour les mêmes usages. Côté local, l'outil open source `act` rejoue un workflow GitHub Actions sur votre machine avec Docker : utile pour tester un workflow sans pusher à chaque essai.",
      },
      {
        kind: "list",
        items: [
          "GitHub : le workflow vit dans `.github/workflows/` — aucun outil serveur à installer, les runners sont fournis.",
          "GitLab : le pipeline se déclare dans `.gitlab-ci.yml` à la racine — les runners partagés GitLab.com suffisent pour commencer.",
          "En local : `act` (GitHub Actions) permet de valider un workflow avant de le pusher.",
        ],
      },
    ],
  },
  {
    id: "anatomie-pipeline",
    title: "Anatomie d'un pipeline",
    level: 2,
    intro:
      "Le vocabulaire commun à toutes les plateformes : une fois compris, GitHub Actions et GitLab CI se ressemblent.",
    blocks: [
      {
        kind: "diagram",
        title: "Du déclencheur au déploiement",
        lines: [
          "Événement (push, pull request, tag, planification)",
          "     │",
          "     ▼",
          "Pipeline / Workflow (la recette complète)",
          "     │",
          "     ├── Job 1 : tests ──→ s'exécute sur un runner",
          "     │       └── Steps : checkout → install → test",
          "     ├── Job 2 : build ──→ parallèle au job 1",
          "     │       └── Steps : checkout → build → upload artefact",
          "     └── Job 3 : deploy ──→ après les jobs 1 et 2",
          "             └── Steps : download artefact → deploy",
          "     │",
          "     ▼",
          "Runner (la machine éphémère qui exécute les jobs)",
        ],
      },
      {
        kind: "fields",
        title: "Les briques, une par une",
        fields: [
          {
            label: "Déclencheur (trigger)",
            value:
              "L'événement qui lance le pipeline : un push, l'ouverture d'une pull request, un tag, une planification horaire. Sans déclencheur, rien ne s'exécute.",
          },
          {
            label: "Job",
            value:
              "Une unité de travail exécutée sur un runner. Les jobs tournent en parallèle par défaut ; on déclare explicitement leurs dépendances quand l'ordre compte.",
          },
          {
            label: "Step (étape)",
            value:
              "Une commande shell ou une action réutilisable à l'intérieur d'un job. Les steps d'un même job s'exécutent dans l'ordre, sur la même machine.",
          },
          {
            label: "Runner",
            value:
              "La machine (virtuelle, éphémère) qui exécute les jobs. Chaque job démarre sur un environnement propre : rien ne persiste entre deux runs sauf artefacts et caches explicites.",
          },
          {
            label: "Artefact",
            value:
              "Un fichier produit par un job et conservé après son exécution : binaire compilé, rapport de tests, image. C'est le pont entre les jobs et avec l'extérieur.",
          },
        ],
      },
    ],
  },
  {
    id: "github-actions-premier-workflow",
    title: "Premier workflow GitHub Actions",
    level: 2,
    intro:
      "Un workflow réel et minimal : à chaque push, le projet est installé et testé.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: ".github/workflows/ci.yml",
        code: "name: CI\n\non:\n  push:\n    branches: [main]\n  pull_request:\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: \"20\"\n      - run: npm ci\n      - run: npm test",
      },
      {
        kind: "text",
        text: "Lecture ligne par ligne : `on` déclare les déclencheurs (push sur `main`, toute pull request). `jobs.test` est le job unique, exécuté sur une machine Ubuntu fournie par GitHub. Les steps : récupérer le code (`actions/checkout`), installer Node.js 20 (`actions/setup-node`), installer les dépendances proprement (`npm ci`, qui respecte le lockfile), lancer les tests. Si un step échoue, le job échoue et l'équipe est notifiée.",
      },
      {
        kind: "text",
        text: "`actions/checkout@v4` et `actions/setup-node@v4` sont des actions officielles : des steps réutilisables maintenus par GitHub. Le `@v4` épingle une version majeure — ne jamais utiliser `@main` ou une branche flottante en production (voir la section Sécurité du pipeline).",
      },
    ],
  },
  {
    id: "gitlab-ci-premier-pipeline",
    title: "Premier pipeline GitLab CI",
    level: 2,
    intro:
      "L'équivalent GitLab : un fichier `.gitlab-ci.yml` à la racine du dépôt.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: ".gitlab-ci.yml",
        code: "stages: [test, build]\n\nunit-tests:\n  stage: test\n  image: node:20\n  script:\n    - npm ci\n    - npm test\n\nbuild:\n  stage: build\n  image: node:20\n  script:\n    - npm ci\n    - npm run build\n  artifacts:\n    paths:\n      - dist/",
      },
      {
        kind: "text",
        text: "Lecture : `stages` définit l'ordre d'exécution (test avant build). Chaque job déclare son image Docker (`node:20`) et son `script`. Le job `build` publie le dossier `dist/` en artefact, téléchargeable ensuite. Les jobs d'un même stage tournent en parallèle, les stages s'enchaînent dans l'ordre.",
      },
      {
        kind: "list",
        items: [
          "GitLab CI n'a pas de `checkout` explicite : le runner clone le dépôt automatiquement.",
          "Le mot-clé `image:` choisit l'environnement d'exécution par job — équivalent du `runs-on` + conteneur de GitHub Actions.",
          "`artifacts:` conserve des fichiers entre jobs et après le pipeline, avec une durée de rétention configurable.",
        ],
      },
    ],
  },
  {
    id: "declencheurs-essentiels",
    title: "Déclencheurs essentiels",
    level: 2,
    intro:
      "Quand le pipeline doit-il se lancer ? Les quatre déclencheurs qui couvrent 95 % des besoins.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Déclencheurs GitHub Actions",
        code: "on:\n  push:\n    branches: [main]\n  pull_request:\n    types: [opened, synchronize]\n  workflow_dispatch:\n  schedule:\n    - cron: \"0 2 * * *\"",
      },
      {
        kind: "fields",
        title: "Les quatre déclencheurs",
        fields: [
          {
            label: "`push`",
            value:
              "Se lance à chaque push sur les branches listées. Usage : valider `main` en continu, ou une branche de feature pendant son développement.",
          },
          {
            label: "`pull_request`",
            value:
              "Se lance à l'ouverture et à chaque nouveau commit d'une PR. Usage : donner un verdict automatique avant la revue humaine — c'est le garde-fou principal.",
          },
          {
            label: "`workflow_dispatch`",
            value:
              "Déclenchement manuel depuis l'interface (un bouton « Run workflow »). Usage : relancer un déploiement, exécuter une tâche d'administration.",
          },
          {
            label: "`schedule` (cron)",
            value:
              "Exécution planifiée en syntaxe cron (ici : tous les jours à 2h). Usage : builds nocturnes, tests d'intégration lourds, vérifications de dépendances.",
          },
        ],
      },
      {
        kind: "text",
        text: "Équivalents GitLab : `rules:` avec `$CI_PIPELINE_SOURCE == \"push\"` / `\"merge_request_event\"` / `\"schedule\"`, ou le mot-clé `only:` (plus ancien). Le principe est identique : le pipeline réagit aux événements du dépôt.",
      },
    ],
  },
  {
    id: "tests-dans-le-pipeline",
    title: "Les tests dans le pipeline",
    level: 2,
    intro:
      "Le cœur de la CI : exécuter les tests automatiquement, vite, et avec un verdict clair.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Job de tests avec rapport",
        code: "jobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: \"20\"\n          cache: npm\n      - run: npm ci\n      - run: npm test -- --reporter=junit --outputFile=junit.xml\n      - uses: actions/upload-artifact@v4\n        if: always()\n        with:\n          name: test-report\n          path: junit.xml",
      },
      {
        kind: "text",
        text: "Points importants : le cache npm (`cache: npm`) évite de retélécharger les dépendances à chaque run. Le rapport JUnit est conservé en artefact même en cas d'échec (`if: always()`), pour diagnostiquer. Un test qui échoue fait échouer le job, qui bloque la PR : c'est exactement le comportement voulu.",
      },
      {
        kind: "list",
        items: [
          "Séparez les tests rapides (unitaires, à chaque push) des tests lents (intégration, e2e, sur `main` ou la nuit).",
          "Un test instable (flaky) qui échoue aléatoirement détruit la confiance dans la CI : corrigez-le ou mettez-le en quarantaine, ne l'ignorez pas.",
          "La couverture de code est un indicateur, pas un objectif : 80 % de couverture avec de bons tests vaut mieux que 100 % de tests vides.",
        ],
      },
    ],
  },
  {
    id: "qualite-code",
    title: "Qualité du code : lint, format, types",
    level: 2,
    intro:
      "Avant même les tests : vérifier automatiquement que le code respecte les standards de l'équipe.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Job qualité",
        code: "jobs:\n  quality:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: \"20\"\n          cache: npm\n      - run: npm ci\n      - run: npm run lint\n      - run: npm run format:check\n      - run: npm run typecheck",
      },
      {
        kind: "text",
        text: "Trois vérifications complémentaires : le lint (ESLint : erreurs probables, règles d'équipe), le format (Prettier en mode `check` : le style est uniforme, aucun débat en revue), le typecheck (`tsc --noEmit` : les types sont corrects sans produire de fichiers). Exécutées en parallèle des tests, elles donnent un verdict en quelques minutes.",
      },
      {
        kind: "text",
        text: "Règle d'or : tout ce qui est vérifié en CI doit être vérifiable en local avec la même commande. Un développeur ne devrait jamais découvrir un échec de lint uniquement dans la CI.",
      },
    ],
  },
  {
    id: "artefacts-et-cache",
    title: "Artefacts et cache",
    level: 2,
    intro:
      "Deux mécanismes souvent confondus : l'un transporte les résultats, l'autre accélère les runs.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Artefacts", "Cache"],
        rows: [
          ["Rôle", "Conserver les fichiers produits par un run", "Accélérer les runs suivants"],
          ["Contenu typique", "Binaires, rapports de tests, images", "Dépendances (`node_modules`, `~/.m2`), compilations"],
          ["Durée de vie", "Jours à semaines (téléchargeable)", "Jusqu'à invalidation (clé de cache)"],
          ["GitHub Actions", "`actions/upload-artifact` / `download-artifact`", "`actions/cache` ou option `cache:` intégrée"],
          ["GitLab CI", "`artifacts:`", "`cache:`"],
        ],
      },
      {
        kind: "text",
        text: "En pratique : le cache des dépendances est le premier gain de vitesse (divise souvent le temps d'installation par 5). Les artefacts servent à passer le résultat du build au job de déploiement, ou à récupérer un rapport de tests après un échec.",
      },
    ],
  },
  {
    id: "secrets-et-variables",
    title: "Secrets et variables",
    level: 2,
    intro:
      "Le pipeline a besoin de clés (registry, cloud, tokens) : comment les lui donner sans les exposer.",
    blocks: [
      {
        kind: "command",
        label: "Créer un secret GitHub depuis le terminal",
        command: "gh secret set REGISTRY_TOKEN",
        why: "Enregistre un secret chiffré au niveau du dépôt : la CLI demande la valeur interactivement (rien n'apparaît dans l'historique shell). Le secret est ensuite accessible dans le workflow via `secrets.REGISTRY_TOKEN`, jamais affiché dans les logs (GitHub masque automatiquement les valeurs connues).",
        verify: "gh secret list",
      },
      {
        kind: "code",
        language: "yaml",
        title: "Utiliser un secret dans un workflow",
        code: "jobs:\n  deploy:\n    runs-on: ubuntu-latest\n    environment: production\n    steps:\n      - run: echo \"Déploiement avec le token\"\n        env:\n          TOKEN: \\${{ secrets.REGISTRY_TOKEN }}",
      },
      {
        kind: "list",
        items: [
          "Jamais de secret en clair dans le YAML, dans le code, ni dans les logs : utilisez toujours le mécanisme de secrets de la plateforme.",
          "Distinguez variables (non sensibles : nom d'environnement, région) et secrets (tokens, clés, mots de passe).",
          "Limitez la portée : un secret de production ne doit être accessible qu'aux jobs de déploiement en production, pas à tous les jobs.",
          "En cas de doute sur une fuite (secret visible dans un log), considérez-le comme compromis : révoquez-le et régénérez-le.",
        ],
      },
    ],
  },
  {
    id: "environnements",
    title: "Environnements : dev, staging, production",
    level: 2,
    intro:
      "Le même pipeline déploie vers des cibles aux exigences croissantes.",
    blocks: [
      {
        kind: "diagram",
        title: "La promotion entre environnements",
        lines: [
          "Pull request → CI (build + tests)",
          "     │",
          "     ▼",
          "Merge sur main",
          "     │",
          "     ├──→ dev : déploiement automatique à chaque merge",
          "     │         (feedback rapide, données factices)",
          "     │",
          "     ├──→ staging : déploiement automatique ou sur approbation",
          "     │         (copie fidèle de la prod, tests d'acceptation)",
          "     │",
          "     └──→ production : déploiement sur approbation manuelle",
          "               (trafic réel, monitoring renforcé)",
        ],
      },
      {
        kind: "text",
        text: "Le principe : le même artefact (la même image Docker, le même binaire) progresse d'un environnement à l'autre. On ne reconstruit pas pour la production : on promeut ce qui a été validé en staging. Chaque environnement a ses propres secrets et variables — jamais partagés.",
      },
      {
        kind: "text",
        text: "Sur GitHub Actions, le mot-clé `environment: production` attache un job à un environnement configuré dans les réglages du dépôt : approbateurs requis, délai d'attente, secrets dédiés. Sur GitLab, le mot-clé `environment:` (avec `name:` et `url:`) offre l'équivalent.",
      },
    ],
  },
  {
    id: "deboguer-pipeline",
    title: "Déboguer un pipeline cassé",
    level: 2,
    intro:
      "Un pipeline rouge n'est pas une catastrophe : c'est une méthode à appliquer.",
    blocks: [
      {
        kind: "command",
        label: "Voir les logs d'un run en échec",
        command: "gh run view <run-id> --log-failed",
        why: "Affiche uniquement les logs des jobs en échec, au lieu de tout le run. `<run-id>` s'obtient via `gh run list`. C'est le réflexe n°1 : lire l'erreur exacte plutôt que de deviner.",
      },
      {
        kind: "steps",
        steps: [
          {
            title: "Lire le log du step en échec",
            detail:
              "Ouvrez les logs du job rouge et remontez au premier step en échec (les suivants échouent souvent en cascade). L'erreur réelle est presque toujours dans ce premier step.",
          },
          {
            title: "Reproduire en local",
            detail:
              "Exécutez la même commande que le step (`npm ci && npm test`) sur votre machine. Si ça échoue aussi, le problème est dans le code, pas dans la CI.",
          },
          {
            title: "Vérifier l'environnement du runner",
            detail:
              "Si ça passe en local mais pas en CI : comparez les versions (Node, OS), les variables d'environnement et les secrets. L'outil `act` rejoue un workflow GitHub Actions en local avec Docker pour isoler le problème.",
          },
          {
            title: "Isoler : relancer le job seul",
            detail:
              "`gh run rerun <run-id> --failed` ne relance que les jobs en échec. Utile quand l'échec vient d'un aléa réseau ou d'un service externe temporaire.",
          },
          {
            title: "Corriger à la racine",
            detail:
              "Ne contournez pas l'échec (désactiver le test, forcer le merge) : comprenez-le et corrigez-le. Un pipeline qu'on apprend à ignorer ne sert plus à rien.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "workflow-professionnel",
    title: "Le flux professionnel complet",
    level: 3,
    intro:
      "Comment une équipe mature articule Git, CI/CD et revue de code au quotidien.",
    blocks: [
      {
        kind: "diagram",
        title: "Du ticket à la production",
        lines: [
          "Ticket / issue",
          "     ↓",
          "Branche de feature (git switch -c feat/xxx)",
          "     ↓",
          "Commits locaux + tests en local",
          "     ↓",
          "Push → CI de PR : build, tests, qualité, scans",
          "     ↓",
          "Revue humaine (le pipeline vert est un prérequis)",
          "     ↓",
          "Merge sur main (squash ou merge commit selon l'équipe)",
          "     ↓",
          "CI de main : build de l'artefact de release",
          "     ↓",
          "Déploiement dev → staging (automatique)",
          "     ↓",
          "Validation (tests d'acceptation, revue produit)",
          "     ↓",
          "Déploiement production (approbation + stratégie à risque limité)",
          "     ↓",
          "Monitoring post-déploiement (métriques, erreurs)",
        ],
      },
      {
        kind: "text",
        text: "Chaque étape a un garde-fou : la CI bloque les PR cassées, la revue humaine bloque les PR douteuses, les environnements intermédiaires absorbent les problèmes avant la production, le monitoring détecte ce qui a échappé à tout le reste. Aucune étape ne repose sur la mémoire ou la bonne volonté d'une personne.",
      },
    ],
  },
  {
    id: "yaml-en-detail",
    title: "Le YAML des pipelines, en détail",
    level: 3,
    intro:
      "Le YAML est simple à lire et traître à écrire : les pièges classiques expliqués.",
    blocks: [
      {
        kind: "text",
        text: "Le YAML est sensible à l'indentation (espaces uniquement, jamais de tabulations) et au typage implicite : `on:` seul est interprété comme le booléen `true` par certains parseurs — d'où la forme `on:` entre guillemets (`\"on\":`) dans les vieux workflows, ou simplement `on:` en début de fichier qui fonctionne car c'est une clé racine. Les deux-points suivis d'un espace séparent clé et valeur ; sans espace, c'est une simple chaîne.",
      },
      {
        kind: "fields",
        title: "Pièges classiques",
        fields: [
          {
            label: "Indentation incohérente",
            value:
              "Problem : un step au mauvais niveau d'indentation est ignoré ou provoque une erreur obscure. Better : 2 espaces par niveau, partout, et un éditeur qui affiche les espaces.",
          },
          {
            label: "Booléens implicites",
            value:
              "Problem : `yes`, `no`, `on`, `off` non quotés sont lus comme des booléens. Better : quoter les chaînes ambiguës (`\"on\"`, `\"yes\"`).",
          },
          {
            label: "Multilignes",
            value:
              "`|` conserve les retours à la ligne (scripts multi-commandes), `>` les replie en une seule ligne. Pour un `run:` de plusieurs commandes, `|` est le bon choix.",
          },
          {
            label: "Variables d'environnement",
            value:
              "Dans GitHub Actions, `env:` au niveau workflow, job ou step. Les secrets ne vont QUE dans `secrets.`, jamais dans `env:` en clair.",
          },
        ],
      },
      {
        kind: "code",
        language: "yaml",
        title: "Expressions et contextes GitHub Actions",
        code: "jobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo \"Branche ${{ github.ref_name }}\"\n      - run: echo \"SHA ${{ github.sha }}\"\n      - run: echo \"Acteur ${{ github.actor }}\"\n      - if: github.ref == 'refs/heads/main'\n        run: echo \"Déploiement prod\"",
      },
    ],
  },
  {
    id: "matrices-de-build",
    title: "Matrices de build",
    level: 3,
    intro:
      "Tester toutes les combinaisons (versions, OS) sans dupliquer le workflow.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Matrice Node.js × OS",
        code: "jobs:\n  test:\n    runs-on: \\${{ matrix.os }}\n    strategy:\n      fail-fast: false\n      matrix:\n        os: [ubuntu-latest, windows-latest]\n        node: [\"18\", \"20\", \"22\"]\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: \\${{ matrix.node }}\n      - run: npm ci\n      - run: npm test",
      },
      {
        kind: "text",
        text: "La matrice génère ici 6 jobs (2 OS × 3 versions de Node), chacun nommé automatiquement. `fail-fast: false` laisse les autres combinaisons se terminer même si l'une échoue — essentiel pour savoir si un échec est spécifique à une version ou général.",
      },
      {
        kind: "list",
        items: [
          "Usage typique : bibliothèques multi-versions, applications desktop multi-OS, tests de compatibilité.",
          "Attention au coût : chaque combinaison consomme des minutes de runner — limitez la matrice au nécessaire.",
          "Équivalent GitLab : jobs parallèles avec `parallel:matrix:` et variables.",
        ],
      },
    ],
  },
  {
    id: "jobs-dependances",
    title: "Dépendances entre jobs : needs",
    level: 3,
    intro:
      "Les jobs sont parallèles par défaut : déclarez l'ordre quand il compte.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Chaîne test → build → deploy",
        code: "jobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci && npm test\n\n  build:\n    needs: test\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci && npm run build\n      - uses: actions/upload-artifact@v4\n        with:\n          name: dist\n          path: dist/\n\n  deploy:\n    needs: build\n    if: github.ref == 'refs/heads/main'\n    runs-on: ubuntu-latest\n    environment: production\n    steps:\n      - uses: actions/download-artifact@v4\n        with:\n          name: dist\n      - run: ./deploy.sh",
      },
      {
        kind: "text",
        text: "`needs: test` : le job `build` ne démarre que si `test` réussit. `needs: build` + condition sur la branche `main` : le déploiement ne se produit que pour la branche principale, après un build validé. Le job `deploy` récupère l'artefact `dist` produit par `build` — les jobs ne partagent rien d'autre.",
      },
    ],
  },
  {
    id: "cache-avance",
    title: "Cache avancé",
    level: 3,
    intro:
      "Un cache bien conçu divise les temps de build ; un cache mal conçu produit des builds fantômes.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Cache explicite avec clé de lockfile",
        code: "- uses: actions/cache@v4\n  with:\n    path: ~/.npm\n    key: npm-\\${{ runner.os }}-\\${{ hashFiles('package-lock.json') }}\n    restore-keys: |\n      npm-\\${{ runner.os }}-",
      },
      {
        kind: "text",
        text: "Le principe : la clé de cache inclut un hash du lockfile. Si les dépendances changent, la clé change et le cache est reconstruit ; sinon, il est réutilisé. `restore-keys` fournit un repli partiel (cache de l'OS même si le lockfile a changé) pour ne jamais repartir de zéro.",
      },
      {
        kind: "list",
        items: [
          "Ne mettez jamais en cache ce que le job produit (résultats de build) : seul ce qui est coûteux à télécharger ou calculer mérite un cache.",
          "Un cache empoisonné (contenu corrompu) se purge en changeant la clé — prévoyez un moyen simple de l'invalider.",
          "Les caches ont une taille et une durée de vie limitées par la plateforme : surveillez leur taux de hit dans les logs.",
        ],
      },
    ],
  },
  {
    id: "artefacts-avance",
    title: "Artefacts avancés",
    level: 3,
    intro:
      "Au-delà du simple fichier : passer des résultats entre jobs et les conserver utilement.",
    blocks: [
      {
        kind: "text",
        text: "Cycle de vie typique : le job `build` produit `dist/` et l'upload (`actions/upload-artifact@v4`), le job `deploy` le télécharge (`actions/download-artifact@v4`). Les artefacts ont une rétention configurable (jours) : courte pour les builds intermédiaires, longue pour les releases.",
      },
      {
        kind: "list",
        items: [
          "Nommez les artefacts de façon unique par run (ex. avec le SHA) si plusieurs runs coexistent.",
          "Les rapports (tests, couverture, scans de sécurité) sont des artefacts : conservez-les même en cas d'échec avec `if: always()`.",
          "Ne stockez jamais de secret dans un artefact : les artefacts sont téléchargeables par quiconque a accès au dépôt.",
          "Pour les gros binaires, préférez un registry d'artefacts (ou un registry de conteneurs) aux artefacts du pipeline.",
        ],
      },
    ],
  },
  {
    id: "runners-auto-heberges",
    title: "Runners auto-hébergés",
    level: 3,
    intro:
      "Quand les runners fournis ne suffisent plus : exécuter ses propres machines.",
    blocks: [
      {
        kind: "text",
        text: "Les runners cloud (GitHub-hosted, GitLab shared) suffisent pour la plupart des projets. On passe à l'auto-hébergé pour : du matériel spécifique (GPU, macOS, architecture ARM), l'accès à un réseau privé, des contraintes de conformité (données ne sortant pas), ou des coûts à grande échelle.",
      },
      {
        kind: "fields",
        title: "Ce que ça implique",
        fields: [
          {
            label: "Avantage",
            value:
              "Contrôle total : OS, outils préinstallés, cache persistant, accès réseau interne. Builds souvent plus rapides (pas de provisioning).",
          },
          {
            label: "Coût caché",
            value:
              "C'est vous qui maintenez : mises à jour, sécurité, disponibilité, scalabilité. Un runner auto-hébergé mal patché qui exécute du code de PR externes est un risque majeur.",
          },
          {
            label: "Règle de sécurité",
            value:
              "Ne jamais exécuter de code non fiable (PR de forks) sur un runner persistant auto-hébergé : utilisez des runners éphémères (un job = une VM jetable).",
          },
        ],
      },
    ],
  },
  {
    id: "concurrency",
    title: "Concurrence : annuler les runs obsolètes",
    level: 3,
    intro:
      "Éviter que 5 pushes rapides lancent 5 pipelines complets qui se marchent dessus.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Un seul run à la fois par branche",
        code: "concurrency:\n  group: \\${{ github.workflow }}-\\${{ github.ref }}\n  cancel-in-progress: true",
      },
      {
        kind: "text",
        text: "Effet : quand un nouveau run démarre sur la même branche, le run précédent encore en cours est annulé. Sur une branche de feature très active, cela économise des minutes de CI et donne le verdict sur le dernier code uniquement — le seul qui compte.",
      },
      {
        kind: "text",
        text: "Attention : n'activez jamais `cancel-in-progress` sur les déploiements de production — annuler un déploiement en cours laisse l'environnement dans un état incertain.",
      },
    ],
  },
  {
    id: "docker-dans-ci",
    title: "Construire et publier des images Docker",
    level: 3,
    intro:
      "Le pipeline produit l'unité de déploiement moderne : l'image de conteneur versionnée.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Build et push vers un registry",
        code: "jobs:\n  docker:\n    runs-on: ubuntu-latest\n    permissions:\n      contents: read\n      packages: write\n    steps:\n      - uses: actions/checkout@v4\n      - uses: docker/login-action@v3\n        with:\n          registry: ghcr.io\n          username: \\${{ github.actor }}\n          password: \\${{ secrets.GITHUB_TOKEN }}\n      - uses: docker/build-push-action@v6\n        with:\n          push: true\n          tags: ghcr.io/mon-org/mon-app:\\${{ github.sha }}",
      },
      {
        kind: "text",
        text: "Chaque image est taguée avec le SHA du commit : traçabilité totale entre le code et ce qui tourne. `docker/login-action` et `docker/build-push-action` sont les actions officielles de Docker. Le token `GITHUB_TOKEN` est fourni par GitHub avec des permissions minimales déclarées explicitement (`packages: write`).",
      },
      {
        kind: "command",
        label: "Vérifier une image locale avant de pusher",
        command: "docker build -t mon-app:test .",
        why: "Construit l'image en local avec exactement le même Dockerfile que la CI. Si le build échoue ici, il échouera en CI : on le découvre en secondes plutôt qu'après un push.",
        verify: "docker images mon-app",
      },
    ],
  },
  {
    id: "provenance-images",
    title: "Provenance : tags mutables, digests immuables",
    level: 3,
    intro:
      "Un tag peut être réécrit ; un digest identifie un contenu exact, pour toujours.",
    blocks: [
      {
        kind: "text",
        text: "Le tag `latest` ou `v1.2.0` est une étiquette mobile : demain, elle peut désigner une autre image. Le digest (`sha256:abc123…`) est l'empreinte cryptographique du contenu : il ne change jamais. Pour la production, déployez toujours le digest — c'est la seule façon de garantir que ce qui tourne est exactement ce qui a été testé.",
      },
      {
        kind: "command",
        label: "Récupérer le digest d'une image",
        command: "docker inspect --format='{{index .RepoDigests 0}}' mon-app:test",
        why: "Affiche le digest de l'image locale (`mon-app@sha256:…`). En CI, l'action `docker/build-push-action` expose le digest en sortie (`steps.build.outputs.digest`) : enregistrez-le comme référence de déploiement plutôt que le tag.",
      },
      {
        kind: "list",
        items: [
          "En développement : les tags suffisent (lisibilité).",
          "En staging/production : épinglez le digest (reproductibilité, audit).",
          "Signez les images critiques (Sigstore/cosign) : la signature prouve qui a construit l'image, le digest prouve quoi.",
        ],
      },
    ],
  },
  {
    id: "deploiement-continu",
    title: "Déploiement continu et approbations",
    level: 3,
    intro:
      "Automatiser la mise en production sans perdre le contrôle : le rôle des environnements protégés.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Déploiement protégé sur GitHub",
        code: "jobs:\n  deploy-prod:\n    runs-on: ubuntu-latest\n    environment:\n      name: production\n      url: https://app.example.com\n    steps:\n      - run: ./deploy.sh \\${{ vars.APP_URL }}",
      },
      {
        kind: "text",
        text: "L'environnement `production` se configure dans les réglages du dépôt : approbateurs requis (une personne doit cliquer « Approve »), délai d'attente, restriction aux branches protégées, secrets dédiés. Le workflow reste automatique jusqu'à la porte de la production — l'humain ne valide que le passage, pas la procédure.",
      },
      {
        kind: "list",
        items: [
          "Séparez toujours le déploiement (mettre le code en place) de la release (l'exposer aux utilisateurs) : voir les feature flags.",
          "Chaque déploiement doit être traçable : qui, quoi (SHA), quand, vers où — le pipeline l'enregistre automatiquement.",
          "Un déploiement sans plan de rollback n'est pas un déploiement, c'est un pari.",
        ],
      },
    ],
  },
  {
    id: "strategies-deploiement",
    title: "Stratégies de déploiement",
    level: 3,
    intro:
      "Quatre façons de basculer le trafic vers la nouvelle version, du plus simple au plus sûr.",
    blocks: [
      {
        kind: "table",
        headers: ["Stratégie", "Principe", "Risque", "Quand l'utiliser"],
        rows: [
          ["Recreate", "Arrêter l'ancien, démarrer le nouveau", "Coupure de service pendant le basculement", "Environnements de dev, applications tolérant l'indisponibilité"],
          ["Rolling", "Remplacer les instances une par une", "Faible : coexistence temporaire de deux versions", "Cas général, défaut de Kubernetes"],
          ["Blue/green", "Deux environnements identiques, bascule du trafic d'un coup", "Bascule instantanée mais double infrastructure", "Releases critiques nécessitant un rollback immédiat"],
          ["Canary", "Exposer la nouvelle version à un faible % du trafic, puis généraliser", "Le plus faible : les problèmes touchent peu d'utilisateurs", "Applications à fort trafic, changements risqués"],
        ],
      },
      {
        kind: "text",
        text: "Le point commun : aucune de ces stratégies ne déploie « à l'aveugle ». Chacune s'accompagne de vérifications (health checks, métriques) et d'un chemin de retour. Le choix dépend du coût d'un échec : plus il est élevé, plus la stratégie doit être progressive.",
      },
    ],
  },
  {
    id: "blue-green-detail",
    title: "Blue/green en détail",
    level: 3,
    intro:
      "Deux environnements identiques, une bascule instantanée, un rollback trivial.",
    blocks: [
      {
        kind: "diagram",
        title: "Le ballet blue/green",
        lines: [
          "État initial :",
          "  [Blue = v1.2] ← 100 % du trafic",
          "  [Green = v1.1] (en stand-by)",
          "",
          "Déploiement :",
          "  [Blue = v1.2] ← 100 % du trafic",
          "  [Green = v1.3] ← déployée, testée (smoke tests)",
          "",
          "Bascule :",
          "  [Blue = v1.2] (en stand-by)",
          "  [Green = v1.3] ← 100 % du trafic",
          "",
          "Problème ? Re-bascule immédiate vers Blue.",
          "OK après N minutes ? Blue devient la cible du prochain déploiement.",
        ],
      },
      {
        kind: "text",
        text: "Le rollback consiste à re-basculer le trafic : secondes, pas minutes. Le prix : deux fois l'infrastructure pendant la bascule, et une gestion fine des migrations de base de données (l'ancienne et la nouvelle version doivent coexister avec le même schéma pendant la transition).",
      },
    ],
  },
  {
    id: "canary-detail",
    title: "Canary en détail",
    level: 3,
    intro:
      "La nouvelle version d'abord à 5 % du trafic : les problèmes se révèlent sur un échantillon, pas sur tout le monde.",
    blocks: [
      {
        kind: "diagram",
        title: "Progression d'un déploiement canary",
        lines: [
          "v1.2 (stable) ← 100 %",
          "     ↓ déploiement canary",
          "v1.2 ← 95 %   |   v1.3 ← 5 %",
          "     ↓ métriques OK (erreurs, latence) pendant N minutes",
          "v1.2 ← 50 %   |   v1.3 ← 50 %",
          "     ↓ métriques toujours OK",
          "v1.3 ← 100 % (généralisation)",
          "",
          "À tout moment : métriques anormales → retour à 100 % v1.2",
        ],
      },
      {
        kind: "text",
        text: "Le canary n'a de sens qu'avec des métriques comparées automatiquement : taux d'erreurs, latence p95, taux de conversion métier. Sans comparaison chiffrée, « 5 % du trafic » ne dit rien. Les service meshes (Istio) ou les ingress controllers avancés gèrent la répartition ; à défaut, un reverse proxy avec pondération suffit pour commencer.",
      },
    ],
  },
  {
    id: "feature-flags",
    title: "Feature flags : découpler déploiement et release",
    level: 3,
    intro:
      "Déployer du code inactif, puis l'activer pour qui on veut, quand on veut.",
    blocks: [
      {
        kind: "text",
        text: "Un feature flag est un interrupteur dans le code : `if (flags.newCheckout) { … } else { … }`. Le code est déployé éteint, puis activé progressivement (équipe interne, 1 % des utilisateurs, tout le monde) depuis une console, sans redéployer. En cas de problème : on éteint, en secondes.",
      },
      {
        kind: "list",
        items: [
          "Déploiement ≠ release : le pipeline déploie du code, le flag décide qui le voit.",
          "Les flags temporaires (de release) doivent être nettoyés après généralisation : un flag oublié devient de la dette technique.",
          "Les flags permanents (abonnements, permissions) sont une fonctionnalité produit, pas un outil de déploiement.",
          "Des solutions open source existent (ex. Unleash) pour gérer les flags sans les coder en dur.",
        ],
      },
    ],
  },
  {
    id: "migrations-bdd",
    title: "Migrations de base de données dans le pipeline",
    level: 3,
    intro:
      "Le point le plus délicat du déploiement : le schéma évolue pendant que l'application tourne.",
    blocks: [
      {
        kind: "text",
        text: "Règle fondamentale : les migrations doivent être compatibles avec l'ancienne ET la nouvelle version du code pendant la transition. Concrètement : on n'ajoute d'abord que des changements additifs (nouvelle colonne nullable, nouvelle table), on déploie le code qui les utilise, et on ne supprime l'ancien qu'une fois la bascule terminée — souvent dans une release ultérieure.",
      },
      {
        kind: "list",
        items: [
          "Toujours sauvegarder avant de migrer en production, et tester la restauration — pas seulement la sauvegarde.",
          "Les migrations destructrices (DROP COLUMN, renommage) se font en deux temps : d'abord cesser d'utiliser, ensuite supprimer.",
          "Versionnez les migrations avec le code (outils : Flyway, Alembic, Prisma Migrate) et appliquez-les dans le pipeline, pas à la main.",
          "Prévoyez le rollback du schéma : une migration sans chemin inverse est un aller simple.",
        ],
      },
    ],
  },
  {
    id: "smoke-tests",
    title: "Smoke tests post-déploiement",
    level: 3,
    intro:
      "Après chaque déploiement : vérifier en une minute que l'essentiel fonctionne.",
    blocks: [
      {
        kind: "text",
        text: "Les smoke tests sont une poignée de vérifications critiques exécutées juste après le déploiement : la page d'accueil répond 200, le login fonctionne, l'endpoint de santé est vert, la base est joignable. Ils ne testent pas tout — ils détectent les déploiements catastrophiques (mauvaise config, variable manquante, migration oubliée) avant les utilisateurs.",
      },
      {
        kind: "code",
        language: "bash",
        title: "Smoke test minimal",
        code: "#!/usr/bin/env bash\nset -euo pipefail\n\nURL=\"https://app.example.com\"\n\ncurl -fsS \"$URL/health\" > /dev/null\ncurl -fsS \"$URL/\" | grep -q \"<title>\"\n\necho \"Smoke tests OK\"",
      },
      {
        kind: "text",
        text: "En cas d'échec : le pipeline déclenche le rollback automatiquement au lieu d'attendre qu'un humain s'en aperçoive. C'est la boucle fermée déploiement → vérification → retour en arrière.",
      },
    ],
  },
  {
    id: "rollback",
    title: "Rollback : revenir en arrière vite",
    level: 3,
    intro:
      "La sécurité qui autorise la vitesse : savoir annuler un déploiement en minutes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Détecter",
            detail:
              "Alerte monitoring (taux d'erreurs, latence), smoke tests post-déploiement en échec, ou signalement utilisateur. Le temps de détection détermine le temps d'impact.",
          },
          {
            title: "Décider",
            detail:
              "Un responsable identifié à l'avance tranche : rollback ou fix-forward ? Règle simple : si le diagnostic prend plus de quelques minutes, rollback d'abord, on comprendra après.",
          },
          {
            title: "Exécuter",
            detail:
              "Revenir à l'artefact précédent connu-sain : re-taguer l'image précédente, re-basculer le trafic (blue/green), `kubectl rollout undo`. Une seule commande, déjà testée.",
          },
          {
            title: "Vérifier",
            detail:
              "Les mêmes smoke tests confirment le retour à la normale. Le monitoring doit montrer un retour aux métriques de base.",
          },
          {
            title: "Comprendre",
            detail:
              "Post-mortem sans blâme : pourquoi le pipeline n'a-t-il pas bloqué ce déploiement ? Quel test manquait ? Le correctif porte sur le pipeline, pas seulement sur le code.",
          },
        ],
      },
      {
        kind: "command",
        label: "Annuler un déploiement Kubernetes",
        command: "kubectl rollout undo deployment/mon-app",
        why: "Revient à la révision précédente du Deployment : Kubernetes conserve l'historique des ReplicaSets. C'est le rollback le plus rapide quand le déploiement est déclaratif — à condition de ne jamais modifier l'historique.",
        verify: "kubectl rollout status deployment/mon-app",
      },
    ],
  },
  {
    id: "securite-pipeline",
    title: "Sécuriser le pipeline lui-même",
    level: 3,
    intro:
      "Le pipeline a les clés de la production : c'est une cible. Les règles de base.",
    blocks: [
      {
        kind: "fields",
        title: "Règles de sécurité du pipeline",
        fields: [
          {
            label: "Permissions minimales",
            value:
              "Chaque job déclare uniquement les permissions dont il a besoin (`permissions: contents: read`). Un job de tests n'a pas besoin d'écrire dans les packages.",
          },
          {
            label: "Épingler les actions par version",
            value:
              "`actions/checkout@v4` plutôt que `@main` : une branche flottante peut changer de contenu à tout moment. Pour les pipelines critiques, épinglez le SHA du commit.",
          },
          {
            label: "Ne pas exécuter de code non fiable",
            value:
              "Un workflow déclenché par une PR de fork ne doit jamais avoir accès aux secrets. GitHub limite d'ailleurs les `pull_request_target` — comprenez la différence avant de l'utiliser.",
          },
          {
            label: "Secrets : portée minimale",
            value:
              "Secrets d'environnement (pas de dépôt) pour la production, rotation régulière, jamais dans les logs ni les artefacts.",
          },
          {
            label: "Audit",
            value:
              "Qui a approuvé quel déploiement, quand : les logs du pipeline sont la piste d'audit. Conservez-les selon vos obligations.",
          },
        ],
      },
    ],
  },
  {
    id: "monorepos",
    title: "CI et monorepos",
    level: 3,
    intro:
      "Un seul dépôt, plusieurs projets : ne tester que ce qui a changé.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Déclencher selon les chemins modifiés",
        code: "jobs:\n  test-frontend:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n        with:\n          fetch-depth: 0\n      - uses: dorny/paths-filter@v3\n        id: changes\n        with:\n          filters: |\n            frontend:\n              - 'apps/web/**'\n      - if: steps.changes.outputs.frontend == 'true'\n        run: echo \"Le frontend a changé : tests…\"",
      },
      {
        kind: "text",
        text: "Le principe : détecter quels dossiers ont changé et ne lancer que les jobs concernés. Sans cela, chaque commit déclenche les tests de tous les projets — lent et coûteux. L'action `dorny/paths-filter` (communautaire, très utilisée) implémente cette détection ; GitLab le fait nativement avec `rules:changes:`.",
      },
    ],
  },
  {
    id: "releases-tags",
    title: "Releases, tags et versioning",
    level: 3,
    intro:
      "Marquer les versions de façon à ce que le pipeline sache quoi construire et publier.",
    blocks: [
      {
        kind: "command",
        label: "Créer une release via un tag",
        command: "git tag v1.2.0 && git push origin v1.2.0",
        why: "Le tag `v1.2.0` marque un commit comme version officielle. Le pipeline, déclenché sur les tags (`on: push: tags: ['v*']`), construit alors les artefacts de release : binaires, images taguées `v1.2.0`, notes de version. Le tag est le contrat entre l'équipe et le pipeline.",
        verify: "git tag --list 'v*'",
      },
      {
        kind: "text",
        text: "Versioning sémantique (semver) : `MAJEUR.MINEUR.CORRECTIF`. Un changement cassant incrémente le majeur, une fonctionnalité le mineur, un correctif le correctif. Les outils comme `semantic-release` génèrent version, changelog et release GitHub à partir des messages de commit conventionnels — la release devient elle aussi automatique.",
      },
      {
        kind: "list",
        items: [
          "Ne déplacez jamais un tag de release : une version publiée est immuable.",
          "Le changelog se génère depuis les commits (conventional commits) ou les PR mergées, pas à la main.",
          "Gardez les anciennes versions déployables : pouvoir redéployer `v1.1.0` est le fondement du rollback.",
        ],
      },
    ],
  },
  {
    id: "tests-e2e-ci",
    title: "Tests end-to-end dans la CI",
    level: 3,
    intro:
      "Tester l'application comme un utilisateur, dans le pipeline, sans flakiness.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Playwright en CI",
        code: "jobs:\n  e2e:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: \"20\"\n          cache: npm\n      - run: npm ci\n      - run: npx playwright install --with-deps chromium\n      - run: npm run build\n      - run: npm run test:e2e\n      - uses: actions/upload-artifact@v4\n        if: always()\n        with:\n          name: playwright-report\n          path: playwright-report/",
      },
      {
        kind: "text",
        text: "Playwright installe un vrai Chromium headless et pilote l'application comme un utilisateur. Les rapports (captures, traces) sont conservés en artefact pour diagnostiquer les échecs. Règle d'or : les tests e2e tournent sur `main` et les PR critiques, pas à chaque commit — ils sont lents et doivent rester fiables.",
      },
    ],
  },
  {
    id: "multi-plateformes",
    title: "Builds multi-plateformes",
    level: 3,
    intro:
      "Compiler pour Linux, macOS, Windows — ou pour plusieurs architectures CPU.",
    blocks: [
      {
        kind: "text",
        text: "Deux dimensions : l'OS (via la matrice `os:`) et l'architecture CPU (via QEMU pour Docker : `linux/amd64` + `linux/arm64`). Pour les images Docker multi-arch, `docker/build-push-action` avec `platforms: linux/amd64,linux/arm64` produit une image unique fonctionnant sur les deux architectures — indispensable avec les runners ARM (Apple Silicon, Graviton).",
      },
      {
        kind: "list",
        items: [
          "L'émulation QEMU est lente : réservez les builds multi-arch aux releases, pas à chaque commit.",
          "Testez au moins un job par plateforme cible : un binaire compilé mais jamais exécuté sur sa cible est un pari.",
          "Pour les applications desktop, les runners macOS/Windows cloud évitent de maintenir des machines dédiées.",
        ],
      },
    ],
  },
  {
    id: "optimisation-temps-build",
    title: "Optimiser les temps de build",
    level: 3,
    intro:
      "Un pipeline lent est un pipeline contourné : la vitesse est une fonctionnalité.",
    blocks: [
      {
        kind: "fields",
        title: "Leviers d'optimisation, par gain typique",
        fields: [
          {
            label: "Cache des dépendances",
            value:
              "Le premier gain : `npm ci` passe de minutes à secondes. À mettre en place avant tout le reste.",
          },
          {
            label: "Parallélisation des jobs",
            value:
              "Tests, lint, build en parallèle plutôt qu'en séquence : le temps total devient celui du job le plus lent.",
          },
          {
            label: "Ne tester que ce qui a changé",
            value:
              "Filtres par chemins (monorepo) ou tests affectés : inutile de tout relancer pour une coquille dans un README.",
          },
          {
            label: "Images Docker allégées",
            value:
              "Builds multi-stage, `.dockerignore` strict : moins de contexte envoyé, couches mieux cachées.",
          },
          {
            label: "Runners plus puissants",
            value:
              "Le dernier levier, pas le premier : il coûte plus cher et masque les inefficacités.",
          },
        ],
      },
      {
        kind: "text",
        text: "Mesurez d'abord : le temps par job est visible dans chaque run. Optimisez le goulot (le job le plus lent sur le chemin critique), pas la moyenne. Objectif raisonnable : un verdict de PR en moins de 10 minutes.",
      },
    ],
  },
  {
    id: "observabilite-pipeline",
    title: "Mesurer le pipeline : métriques DORA",
    level: 3,
    intro:
      "Quatre métriques factuelles pour savoir si la CI/CD fait son travail.",
    blocks: [
      {
        kind: "fields",
        title: "Les quatre métriques DORA",
        fields: [
          {
            label: "Fréquence de déploiement",
            value:
              "À quelle fréquence le code arrive en production. Plus c'est fréquent, plus les changements sont petits et sûrs.",
          },
          {
            label: "Lead time (délai de changement)",
            value:
              "Temps entre le commit et sa mise en production. Mesure la fluidité du pipeline de bout en bout.",
          },
          {
            label: "Taux d'échec des changements",
            value:
              "Proportion de déploiements causant un incident ou nécessitant un rollback. Mesure la fiabilité.",
          },
          {
            label: "MTTR (temps de rétablissement)",
            value:
              "Temps moyen pour restaurer le service après un incident. Mesure l'efficacité du rollback et de la réponse.",
          },
        ],
      },
      {
        kind: "text",
        text: "Ces métriques viennent de la recherche DORA (DevOps Research and Assessment) : elles distinguent les équipes performantes sans mesurer l'activité individuelle (pas de « lignes de code par développeur »). Suivez-les par tendance, pas en valeur absolue — l'objectif est l'amélioration continue, pas un score.",
      },
    ],
  },
  {
    id: "couts-ci",
    title: "Coûts de la CI",
    level: 3,
    intro:
      "La CI cloud se paie en minutes de runner : comprendre la facture pour la maîtriser.",
    blocks: [
      {
        kind: "text",
        text: "GitHub Actions et GitLab CI offrent des quotas gratuits généreux (minutes par mois), puis facturent au-delà. Les leviers de maîtrise des coûts sont les mêmes que ceux de la vitesse : cache, parallélisation raisonnée, ne pas tout tester à chaque commit, `concurrency` pour annuler les runs obsolètes, matrices limitées au nécessaire.",
      },
      {
        kind: "list",
        items: [
          "Surveillez la consommation mensuelle dans les réglages (facturation) avant qu'elle ne surprenne.",
          "Les runners auto-hébergés deviennent rentables à grande échelle, mais ajoutent un coût d'exploitation.",
          "Un pipeline lent coûte deux fois : en minutes facturées et en temps d'attente des développeurs.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pièges classiques des pipelines, et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Le pipeline vert qui ne teste rien",
            value:
              "Problem : le workflow passe toujours car aucun test ne s'exécute vraiment (mauvais chemin, script vide). Why : on a vérifié que ça passe, pas que ça teste. Better : faire échouer volontairement un test pour vérifier que la CI le détecte.",
          },
          {
            label: "Tester en local différemment qu'en CI",
            value:
              "Problem : `npm test` en local, autre chose en CI. Why : commandes dupliquées qui divergent. Better : la CI appelle exactement les mêmes scripts npm que le développeur.",
          },
          {
            label: "Secrets dans les logs",
            value:
              "Problem : un `echo` de debug affiche un token. Why : les logs semblent privés. Better : ne jamais afficher de secret ; la plateforme les masque, mais seulement si elle les connaît comme secrets.",
          },
          {
            label: "Déploiement sans health check",
            value:
              "Problem : le pipeline déclare « déployé » alors que l'app crash en boucle. Why : on vérifie que la commande a réussi, pas que le service fonctionne. Better : health check + smoke tests après chaque déploiement.",
          },
          {
            label: "Ignorer les pipelines rouges",
            value:
              "Problem : « ça passe sur ma machine », merge quand même. Why : la CI est perçue comme une formalité. Better : branche protégée qui exige un pipeline vert — non négociable.",
          },
          {
            label: "Tout reconstruire à chaque fois",
            value:
              "Problem : 20 minutes de pipeline pour une coquille. Why : aucun cache, aucune parallélisation. Better : cache des dépendances, jobs parallèles, filtres par chemins.",
          },
          {
            label: "Tags mobiles en production",
            value:
              "Problem : déployer `latest` et ne plus savoir ce qui tourne. Why : simplicité apparente. Better : tags immuables (SHA, semver) et digests en production.",
          },
          {
            label: "Pas de rollback testé",
            value:
              "Problem : le jour où il faut revenir en arrière, personne ne sait comment. Why : le rollback n'a jamais été exercé. Better : procédure documentée et testée, comme les sauvegardes.",
          },
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
        title: "Débutant — CI pour un projet existant",
        fields: [
          { label: "Compétences requises", value: "Git, YAML, ligne de commande" },
          { label: "Ce que vous construisez", value: "Un workflow qui installe, lint et teste un petit projet à chaque push et PR" },
          { label: "Ce que vous apprenez", value: "La structure d'un workflow, les déclencheurs, la lecture des logs" },
          { label: "Difficulté attendue", value: "Faible — quelques heures" },
          { label: "Projet suivant", value: "Pipeline de build Docker" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Pipeline de build et publication Docker",
        fields: [
          { label: "Compétences requises", value: "Docker, registries, secrets" },
          { label: "Ce que vous construisez", value: "Build multi-stage, tag par SHA, push vers un registry, scan de l'image" },
          { label: "Ce que vous apprenez", value: "Artefacts, secrets, provenance des images" },
          { label: "Difficulté attendue", value: "Moyenne — quelques jours" },
          { label: "Projet suivant", value: "Déploiement multi-environnements" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Déploiement multi-environnements avec approbation",
        fields: [
          { label: "Compétences requises", value: "Environnements, stratégies de déploiement, rollback" },
          { label: "Ce que vous construisez", value: "Pipeline dev → staging → production avec approbation manuelle, smoke tests et rollback automatisé" },
          { label: "Ce que vous apprenez", value: "La livraison continue de bout en bout, la gestion du risque" },
          { label: "Difficulté attendue", value: "Élevée — une à deux semaines" },
          { label: "Projet suivant", value: "Plateforme complète" },
        ],
      },
      {
        kind: "fields",
        title: "Professionnel — Chaîne complète avec canary",
        fields: [
          { label: "Compétences requises", value: "Tout le programme : matrices, cache, sécurité, observabilité" },
          { label: "Ce que vous construisez", value: "Monorepo avec tests ciblés, déploiement canary basé sur les métriques, métriques DORA suivies" },
          { label: "Ce que vous apprenez", value: "L'industrialisation : vitesse, sécurité et fiabilité ensemble" },
          { label: "Difficulté attendue", value: "Professionnelle — plusieurs semaines" },
          { label: "Projet suivant", value: "Ajouter les gates de sécurité (DevSecOps)" },
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
          { label: "GitHub Actions", value: "La documentation officielle : syntaxe des workflows, contextes, actions officielles." },
          { label: "GitLab CI/CD", value: "La référence du `.gitlab-ci.yml` : tous les mots-clés, avec exemples." },
          { label: "Docker", value: "La documentation du build multi-stage et des bonnes pratiques de Dockerfile." },
        ],
      },
      {
        kind: "list",
        items: [
          "Guides : la documentation de votre hébergeur pour les spécificités de déploiement (variables, health checks).",
          "Référence : les release notes de GitHub Actions et GitLab pour suivre les nouveautés (runners, syntaxe).",
          "Pratique : reproduire ces projets sur un dépôt bac à sable avant de toucher au pipeline d'équipe.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "CI/CD maîtrisée, voici les prolongements naturels dans la roadmap DevOps.",
    blocks: [
      {
        kind: "list",
        items: [
          "Sécuriser le pipeline : `devsecops` — SAST, scan d'images, gestion des secrets, policy as code.",
          "Conteneuriser proprement : `docker` — builds multi-stage, images minimales, registries.",
          "Orchestrer : `kubernetes` — déploiements déclaratifs, rolling updates, health checks natifs.",
          "Déclarer l'infrastructure : `iac` — Terraform appliqué depuis la CI, plan en pull request.",
          "Observer : `monitoring` — métriques du pipeline et de la production, alertes, SLO.",
          "Revenir à la roadmap : valider CI/CD et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

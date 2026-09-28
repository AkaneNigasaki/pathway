import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de GitLab CI : de zéro à des pipelines
 * professionnels. 3 niveaux d'information (Aperçu / Pratique /
 * Approfondi) avec divulgation progressive. Tous les textes supportent
 * le code inline entre backticks.
 */
export const LEARNING_GITLAB_CI: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est GitLab CI et pourquoi son intégration change la donne.",
    blocks: [
      {
        kind: "text",
        text: "GitLab CI est le CI/CD natif de GitLab : un seul outil pour le code, les pipelines, les registres de conteneurs et le déploiement. Tout se configure dans un fichier `.gitlab-ci.yml` à la racine du projet — aucun service externe à brancher, aucune intégration à maintenir.",
      },
      {
        kind: "text",
        text: "Le modèle : des stages (étapes : build, test, deploy) contenant des jobs, exécutés par des runners (partagés par GitLab ou les vôtres). Chaque commit ou merge request déclenche le pipeline, dont la visualisation en graphe montre exactement où en est chaque job. Les fonctionnalités comme les review apps (environnement par merge request) sont natives, pas des plugins.",
      },
      {
        kind: "diagram",
        title: "Du commit au pipeline GitLab",
        lines: [
          "git push (branche feature)",
          "   │",
          "   ▼",
          "Pipeline (.gitlab-ci.yml)",
          "   │",
          "   ├── Stage « test » ──► jobs en parallèle (unit, lint)",
          "   │",
          "   ├── Stage « build » ──► image Docker + push au registre",
          "   │",
          "   └── Stage « deploy » ──► review app / staging / production",
          "   │",
          "   ▼",
          "Merge request : pipeline vert + environnement de test = revue éclairée",
        ],
      },
    ],
  },
  {
    id: "plateforme-unifiee",
    title: "Une plateforme, pas un assemblage",
    level: 1,
    intro:
      "Ce que l'intégration native apporte concrètement par rapport à un CI branché sur un forge externe.",
    blocks: [
      {
        kind: "list",
        items: [
          "Zéro intégration : le pipeline connaît le dépôt, les variables, le registre et les environnements sans configuration.",
          "Les merge requests affichent le pipeline, les artefacts et l'environnement déployé : la revue se fait avec le contexte complet.",
          "Le registre de conteneurs est intégré : chaque projet a son registre, sans compte ni token supplémentaire.",
          "Les permissions suivent celles du projet : qui peut merger peut (selon la config) déployer — pas de système d'accès parallèle.",
          "Auto DevOps : des pipelines préconfigurés qui détectent le type de projet — un point de départ pour aller vite.",
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
      "Ce qu'il faut maîtriser avant d'écrire son premier pipeline.",
    blocks: [
      {
        kind: "fields",
        title: "Les fondations indispensables",
        fields: [
          {
            label: "Git et GitLab",
            value:
              "Dépôts, branches, merge requests : le commit et la MR sont les déclencheurs du pipeline. La fluidité Git conditionne tout le reste.",
          },
          {
            label: "CI/CD (`cicd`)",
            value:
              "Les concepts de pipeline, stage, job, artefact et environnement : GitLab CI n'est qu'une implémentation de ces principes.",
          },
          {
            label: "YAML",
            value:
              "Indentation, listes, dictionnaires : la plupart des erreurs de débutant sont du YAML invalide.",
          },
          {
            label: "Docker (notions)",
            value:
              "Les jobs tournent souvent dans des images (`image: node:20`) : comprendre ce qu'est une image aide à lire n'importe quel pipeline.",
          },
        ],
      },
    ],
  },
  {
    id: "premier-pipeline",
    title: "Premier pipeline : test + build",
    level: 2,
    intro:
      "Le pipeline minimal : un fichier à la racine, trois stages, et ça tourne à chaque push.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: ".gitlab-ci.yml",
        code: `stages:
  - test
  - build
  - deploy

test:
  stage: test
  image: node:20
  script:
    - npm ci
    - npm test

build:
  stage: build
  image: node:20
  script:
    - npm run build
  artifacts:
    paths:
      - dist/`,
      },
      {
        kind: "list",
        items: [
          "Commitez à la racine, poussez : l'onglet `CI/CD > Pipelines` montre l'exécution en temps réel, stage par stage.",
          "`stages:` définit l'ordre ; chaque job déclare son `stage:`. Les jobs d'un même stage tournent en parallèle.",
          "`image: node:20` : le job s'exécute dans ce conteneur — l'environnement est explicite et reproductible.",
        ],
      },
    ],
  },
  {
    id: "stages-jobs",
    title: "Stages et jobs",
    level: 2,
    intro:
      "L'organisation d'un pipeline : quand les jobs s'enchaînent et quand ils se parallélisent.",
    blocks: [
      {
        kind: "fields",
        title: "Les règles du jeu",
        fields: [
          {
            label: "Stages",
            value:
              "Les phases séquentielles (`stages: [test, build, deploy]`) : un stage ne démarre que si le précédent a réussi (sauf configuration contraire).",
          },
          {
            label: "Jobs",
            value:
              "Les unités de travail dans un stage : ils tournent en parallèle sur des runners. Plus de jobs parallèles = pipeline plus rapide.",
          },
          {
            label: "needs:",
            value:
              "Crée une dépendance entre jobs sans attendre tout le stage : le job de déploiement peut démarrer dès que le build est fini, même si d'autres jobs du stage test tournent encore (DAG).",
          },
          {
            label: "Runners",
            value:
              "Les exécuteurs : partagés (fournis par GitLab, avec quotas) ou spécifiques (les vôtres, avec tags pour les cibler).",
          },
        ],
      },
      {
        kind: "code",
        language: "yaml",
        title: "Dépendance ciblée avec needs",
        code: `deploy-staging:
  stage: deploy
  needs: ["build"]
  script:
    - ./deploy.sh staging`,
      },
    ],
  },
  {
    id: "variables",
    title: "Variables : prédéfinies et custom",
    level: 2,
    intro:
      "GitLab injecte des variables sur le contexte ; vous ajoutez les vôtres.",
    blocks: [
      {
        kind: "table",
        headers: ["Variable", "Contenu", "Usage typique"],
        rows: [
          ["`$CI_COMMIT_SHA`", "SHA complet du commit", "Taguer les images Docker"],
          ["`$CI_COMMIT_SHORT_SHA`", "SHA court (8 caractères)", "Tags lisibles"],
          ["`$CI_COMMIT_BRANCH`", "Nom de la branche", "Conditions par branche"],
          ["`$CI_COMMIT_REF_SLUG`", "Référence slugifiée", "Noms d'environnements dynamiques"],
          ["`$CI_PIPELINE_ID`", "ID du pipeline", "Traçabilité"],
          ["`$CI_REGISTRY_IMAGE`", "URL du registre du projet", "Push d'images sans config"],
        ],
      },
      {
        kind: "code",
        language: "yaml",
        title: "Variables custom",
        code: `variables:
  NODE_VERSION: "20"

test:
  stage: test
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm test`,
      },
      {
        kind: "text",
        text: "Les variables définies en haut du fichier s'appliquent à tout le pipeline ; on peut les surcharger par job. Les secrets, eux, vont dans les variables CI/CD masquées/protégées (voir section dédiée).",
      },
    ],
  },
  {
    id: "artifacts",
    title: "Artefacts : partager entre jobs",
    level: 2,
    intro:
      "Les jobs tournent sur des runners différents : les artefacts transfèrent les fichiers produits.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Artefacts avec expiration",
        code: `build:
  stage: build
  script:
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week`,
      },
      {
        kind: "list",
        items: [
          "`paths:` déclare ce qui est conservé ; les jobs suivants le récupèrent automatiquement (ou via `dependencies:` pour cibler).",
          "`expire_in:` évite l'accumulation : les artefacts sont temporaires, pas des archives. Pour les images Docker, utilisez le registre intégré.",
          "Les artefacts sont téléchargeables depuis l'interface : pratique pour récupérer un build ou un rapport de tests.",
          "`reports:` (ex. `junit:`, `coverage_report:`) expose les résultats de tests directement dans la merge request.",
        ],
      },
    ],
  },
  {
    id: "variables-cicd",
    title: "Variables CI/CD : les secrets",
    level: 2,
    intro:
      "Stocker les credentials sans les exposer : le coffre intégré de GitLab.",
    blocks: [
      {
        kind: "list",
        items: [
          "Créez-les dans `Settings > CI/CD > Variables` : marquez-les `masked` (masquées dans les logs) et `protected` (uniquement sur les branches protégées).",
          "Utilisation directe : `$MA_CLE_API` dans les scripts — jamais en dur dans le YAML, jamais en `echo` pour déboguer.",
          "Les variables de type `file` écrivent la valeur dans un fichier temporaire : idéal pour les clés SSH ou certificats.",
          "Les variables d'environnement (définies par `environment:`) peuvent avoir leurs propres secrets : séparez staging et production.",
          "Scopes par environnement : une variable limitée à `production` n'existe pas pour les autres environnements.",
        ],
      },
    ],
  },
  {
    id: "glab-cli",
    title: "Piloter avec glab",
    level: 2,
    intro:
      "La CLI GitLab pour suivre les pipelines depuis le terminal.",
    blocks: [
      {
        kind: "command",
        label: "Lister les pipelines",
        command: "glab ci list",
        why: "Affiche les pipelines récents du projet : statut, branche, durée. Le tableau de bord « qu'est-ce qui tourne / qu'est-ce qui est rouge ? ».",
      },
      {
        kind: "command",
        label: "Voir un pipeline",
        command: "glab ci view",
        why: "Ouvre la vue détaillée du pipeline courant (ou l'ouvre dans le navigateur) : stages, jobs, statuts. Le premier réflexe après un push.",
      },
      {
        kind: "command",
        label: "Relancer un job en échec",
        command: "glab ci retry",
        why: "Relance les jobs en échec du pipeline courant, sans passer par l'interface. À n'utiliser que pour les échecs transitoires avérés (infra), pas pour masquer un vrai problème.",
      },
      {
        kind: "command",
        label: "S'authentifier",
        command: "glab auth login",
        why: "Connecte la CLI à votre instance GitLab (gitlab.com ou auto-hébergée) : à faire une fois avant toute autre commande.",
      },
    ],
  },
  {
    id: "editeur-pipeline",
    title: "L'éditeur de pipeline : valider avant de pousser",
    level: 2,
    intro:
      "GitLab valide la syntaxe du pipeline : utilisez-le avant de commiter.",
    blocks: [
      {
        kind: "list",
        items: [
          "`CI/CD > Editor` : éditeur avec validation en temps réel et visualisation du graphe — il signale les erreurs de syntaxe et de structure.",
          "Le bouton « Validate » simule le pipeline : attrape les `stages:` manquants, les `needs:` vers des jobs inexistants, les variables mal formées.",
          "L'onglet `Visualize` montre le DAG : vérifiez que l'ordre d'exécution correspond à votre intention.",
          "En local, l'extension « GitLab Workflow » pour VS Code apporte validation et autocomplétion dans l'éditeur.",
        ],
      },
    ],
  },
  {
    id: "environnements-bases",
    title: "Environnements : suivre les déploiements",
    level: 2,
    intro:
      "Déclarer où chaque job déploie : GitLab suit « quelle version tourne où ».",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Job avec environnement",
        code: `deploy-staging:
  stage: deploy
  script:
    - ./deploy.sh staging
  environment:
    name: staging
    url: https://staging.example.com`,
      },
      {
        kind: "list",
        items: [
          "`Environments` (dans `Operate`) liste les déploiements : version, date, auteur, URL — la traçabilité sans effort.",
          "Les environnements protégés exigent des approbations ou des branches spécifiques pour déployer : le garde-fou de la production.",
          "Chaque environnement peut avoir ses variables CI/CD propres : les secrets de prod ne sont visibles que là.",
        ],
      },
    ],
  },
  {
    id: "runners-partages",
    title: "Runners : partagés et spécifiques",
    level: 2,
    intro:
      "Où s'exécutent les jobs : comprendre les deux modèles.",
    blocks: [
      {
        kind: "table",
        headers: ["Critère", "Runners partagés", "Runners spécifiques"],
        rows: [
          ["Fournis par", "GitLab (quotas selon l'offre)", "Vous (VM, conteneur, bare metal)"],
          ["Configuration", "Aucune", "Enregistrement avec token, tags"],
          ["Isolation", "Bonne (jobs isolés)", "À durcir vous-même"],
          ["Cas d'usage", "Démarrer immédiatement", "GPU, réseau privé, gros volumes"],
        ],
      },
      {
        kind: "list",
        items: [
          "Les tags routent les jobs : `tags: [docker, linux]` cible les runners correspondants.",
          "Commencez avec les partagés : zéro maintenance. Passez aux spécifiques sur besoin avéré.",
          "Les runners spécifiques sur infrastructure éphémère (autoscaling) combinent contrôle et élasticité.",
        ],
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow quotidien",
    level: 2,
    intro:
      "La boucle de travail avec GitLab CI.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Éditer et valider",
            detail:
              "Modifiez `.gitlab-ci.yml` dans l'éditeur de pipeline (validation intégrée) ou VS Code + extension GitLab Workflow.",
          },
          {
            title: "Pousser sur une branche",
            detail:
              "Testez les changements de pipeline sur une branche feature : un pipeline cassé sur main bloque toute l'équipe.",
          },
          {
            title: "Observer",
            detail:
              "`glab ci view` ou `CI/CD > Pipelines` : vérifiez le graphe, les durées, les artefacts.",
          },
          {
            title: "Itérer",
            detail:
              "Corrigez, re-poussez : chaque push relance le pipeline. La boucle est rapide.",
          },
          {
            title: "Merger via MR",
            detail:
              "La merge request montre le pipeline : mergez uniquement sur pipeline vert (option « pipeline must succeed »).",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-debutant",
    title: "Erreurs de débutant à éviter",
    level: 2,
    intro:
      "Les pièges classiques des premiers pipelines.",
    blocks: [
      {
        kind: "list",
        items: [
          "Oublier `stages:` : les jobs tombent dans des stages par défaut dans un ordre inattendu. Déclarez toujours vos stages.",
          "Secrets en clair dans le YAML ou affichés en `echo` : utilisez les variables CI/CD masquées/protégées.",
          "Tester les changements de pipeline directement sur la branche par défaut : utilisez une branche.",
          "Ignorer un pipeline rouge : la branche principale doit rester verte en permanence.",
          "Confondre `only`/`except` (ancien) et `rules` (moderne) : utilisez `rules:`, l'ancien système est déprécié.",
          "Laisser les artefacts sans `expire_in` : le stockage grossit indéfiniment.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "rules",
    title: "Rules : contrôler quand les jobs tournent",
    level: 3,
    intro:
      "`rules:` est le système moderne de conditions : il décide si un job est créé, et avec quel comportement.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Rules typiques",
        code: `deploy-prod:
  stage: deploy
  script: ./deploy.sh prod
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
      when: manual
    - when: never`,
      },
      {
        kind: "list",
        items: [
          "Les règles s'évaluent dans l'ordre, la première qui correspond gagne : terminez par `- when: never` pour exclure les autres cas.",
          "`when: manual` crée un bouton de lancement manuel ; `when: never` exclut le job ; `allow_failure: true` le rend non bloquant.",
          "Variables utiles : `$CI_COMMIT_BRANCH`, `$CI_PIPELINE_SOURCE` (push, merge_request_event, schedule, web), `$CI_MERGE_REQUEST_ID`.",
          "`rules:changes:` limite aux MR touchant certains chemins : l'équivalent des filtres de chemins, pour les monorepos.",
          "Évitez `only`/`except` : l'ancien système, moins expressif, est déprécié au profit de `rules`.",
        ],
      },
    ],
  },
  {
    id: "workflow-rules",
    title: "Workflow rules : contrôler le pipeline entier",
    level: 3,
    intro:
      "Au niveau du pipeline : décider quand un pipeline est créé du tout.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Pas de pipeline en double sur les MR",
        code: `workflow:
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
    - if: $CI_COMMIT_TAG`,
      },
      {
        kind: "text",
        text: "Le cas classique : sans `workflow:rules`, un push sur une branche avec MR ouverte crée deux pipelines (branch + MR). Ces règles ne gardent que le pipeline de MR, plus pertinent (il teste le résultat du merge).",
      },
    ],
  },
  {
    id: "before-after-script",
    title: "before_script et after_script",
    level: 3,
    intro:
      "Factoriser la préparation et le nettoyage communs à plusieurs jobs.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Préparation partagée",
        code: `default:
  before_script:
    - echo "Démarrage du job $CI_JOB_NAME"
    - npm ci --prefer-offline

test:
  stage: test
  script:
    - npm test`,
      },
      {
        kind: "list",
        items: [
          "`default:` applique `before_script`/`after_script` à tous les jobs ; on peut aussi les définir par job.",
          "`after_script` s'exécute même si le job échoue : idéal pour le nettoyage et l'envoi de rapports.",
          "Attention : un `before_script` en échec fait échouer le job avant son `script:` — gardez-le simple et robuste.",
        ],
      },
    ],
  },
  {
    id: "needs-dag",
    title: "Needs : le graphe acyclique (DAG)",
    level: 3,
    intro:
      "Dépasser les stages séquentiels : `needs:` crée des dépendances fines pour des pipelines plus rapides.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Pipeline en DAG",
        code: `stages: [build, test, deploy]

build:
  stage: build
  script: npm run build

unit:
  stage: test
  needs: ["build"]
  script: npm run test:unit

lint:
  stage: test
  needs: []
  script: npm run lint

deploy:
  stage: deploy
  needs: ["unit", "build"]
  script: ./deploy.sh`,
      },
      {
        kind: "list",
        items: [
          "`needs: []` : le job démarre immédiatement, sans attendre le stage précédent — le lint n'a pas besoin du build.",
          "Le pipeline devient un graphe : plus rapide, mais plus complexe à lire — la visualisation DAG de GitLab aide.",
          "Avec `needs:`, les artefacts se téléchargent sélectivement (`artifacts: true/false` par dépendance).",
        ],
      },
    ],
  },
  {
    id: "cache",
    title: "Cache : accélérer les builds",
    level: 3,
    intro:
      "Le cache partage les dépendances entre pipelines : le gain le plus simple sur la durée.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Cache npm",
        code: `cache:
  key:
    files:
      - package-lock.json
  paths:
    - node_modules/

test:
  stage: test
  script:
    - npm ci --prefer-offline
    - npm test`,
      },
      {
        kind: "list",
        items: [
          "La clé basée sur le lockfile invalide le cache quand les dépendances changent : le bon compromis fraîcheur/vitesse.",
          "Le cache est partagé entre branches (avec politique de fallback) : la branche feature profite du cache de main.",
          "Ne mettez en cache que le coûteux (`node_modules`, pas les builds) et surveillez la taille.",
          "Distinguez cache (réutilisable, peut être périmé) et artefacts (produits du pipeline, précis) : deux mécanismes, deux usages.",
        ],
      },
    ],
  },
  {
    id: "services",
    title: "Services : bases de données pour les tests",
    level: 3,
    intro:
      "Lancer des services annexes (PostgreSQL, Redis) à côté du job pour les tests d'intégration.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Tests avec PostgreSQL",
        code: `integration:
  stage: test
  image: node:20
  services:
    - name: postgres:15
      alias: db
  variables:
    POSTGRES_DB: testdb
    POSTGRES_USER: runner
    POSTGRES_PASSWORD: $DB_PASSWORD
  script:
    - npm ci
    - DATABASE_URL=postgres://runner:$DB_PASSWORD@db/testdb npm run test:integration`,
      },
      {
        kind: "list",
        items: [
          "`services:` démarre des conteneurs liés au job, joignables par leur alias (`db`) sur le réseau interne.",
          "Les credentials passent par des variables CI/CD masquées, jamais en dur.",
          "Pour Docker-in-Docker (builder des images), utilisez `docker:24-dind` comme service avec l'image `docker:24` — la configuration standard, documentée par GitLab.",
        ],
      },
    ],
  },
  {
    id: "review-apps",
    title: "Review apps : un environnement par MR",
    level: 3,
    intro:
      "La fonctionnalité signature de GitLab CI : chaque merge request déploie un environnement éphémère.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Review app dynamique",
        code: `review:
  stage: deploy
  script: ./deploy.sh review-$CI_COMMIT_REF_SLUG
  environment:
    name: review/$CI_COMMIT_REF_SLUG
    url: https://$CI_COMMIT_REF_SLUG.example.com
    on_stop: stop_review
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"

stop_review:
  stage: deploy
  script: ./teardown.sh review-$CI_COMMIT_REF_SLUG
  environment:
    name: review/$CI_COMMIT_REF_SLUG
    action: stop
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
      when: manual`,
      },
      {
        kind: "list",
        items: [
          "Chaque MR obtient sa propre URL : les reviewers testent le vrai comportement, pas des captures d'écran.",
          "`on_stop:` lie le job de nettoyage : l'environnement se détruit au merge/close (manuellement ou via `auto_stop_in:`).",
          "Le nettoyage automatique est non négociable : sans lui, les environnements orphelins s'accumulent et coûtent.",
          "Données de test anonymisées uniquement : jamais de copie de production avec des données réelles.",
        ],
      },
    ],
  },
  {
    id: "manual-jobs",
    title: "Jobs manuels et approbations",
    level: 3,
    intro:
      "Le garde-fou humain : exiger un clic avant les étapes sensibles.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Déploiement prod manuel",
        code: `deploy-prod:
  stage: deploy
  script: ./deploy.sh prod
  environment: production
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
      when: manual
      allow_failure: false`,
      },
      {
        kind: "list",
        items: [
          "`when: manual` + `allow_failure: false` (défaut pour les manuels) : le pipeline attend le clic et bloque la suite sinon.",
          "Les environnements protégés restreignent qui peut déclencher : pas l'auteur seul pour le critique.",
          "Réservez le manuel à la production et aux actions destructrices : trop de clics tuent la fluidité.",
        ],
      },
    ],
  },
  {
    id: "parallel",
    title: "Paralléliser avec parallel:",
    level: 3,
    intro:
      "Diviser un job en N instances parallèles : le sharding natif des tests.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Tests en 4 parallèles",
        code: `test:
  stage: test
  parallel: 4
  script:
    - npm ci
    - npm run test -- --shard=$CI_NODE_INDEX/$CI_NODE_TOTAL`,
      },
      {
        kind: "list",
        items: [
          "`$CI_NODE_INDEX` / `$CI_NODE_TOTAL` permettent au runner de test de ne jouer que sa part (si le framework supporte le sharding).",
          "Divise le temps de la suite par N au prix de N runners : mesurez le gain réel.",
          "Combinez avec le cache : chaque instance restaure les dépendances plutôt que de les retélécharger.",
        ],
      },
    ],
  },
  {
    id: "resource-group",
    title: "Resource group : un seul à la fois",
    level: 3,
    intro:
      "Empêcher deux déploiements concurrents vers le même environnement.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Déploiements sérialisés",
        code: `deploy-prod:
  stage: deploy
  resource_group: production
  script: ./deploy.sh prod`,
      },
      {
        kind: "text",
        text: "Les jobs partageant un `resource_group` s'exécutent en file : un seul déploiement vers la production à la fois. Simple et efficace contre les déploiements qui se chevauchent.",
      },
    ],
  },
  {
    id: "include",
    title: "Include : factoriser les pipelines",
    level: 3,
    intro:
      "Composer un pipeline depuis des fichiers partagés : la fin du copier-coller.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Inclure des templates",
        code: `include:
  - local: /templates/test.yml
  - project: mon-org/ci-templates
    file: /templates/deploy.yml
  - template: Security/SAST.gitlab-ci.yml`,
      },
      {
        kind: "list",
        items: [
          "`local:` : fichier du même dépôt ; `project:` + `file:` : fichier d'un autre projet (templates centralisés d'équipe) ; `remote:` : URL.",
          "`template:` : les modèles fournis par GitLab (sécurité, Code Quality, etc.) — `Security/SAST.gitlab-ci.yml` ajoute l'analyse statique de sécurité.",
          "Centralisez les motifs communs (test, build, deploy) dans un projet de templates versionné : toute l'équipe bénéficie des améliorations.",
          "Épinglez la référence (`ref:`) des includes externes : un template qui change sous vos pieds casse vos pipelines.",
        ],
      },
    ],
  },
  {
    id: "components",
    title: "Composants CI/CD",
    level: 3,
    intro:
      "Le mécanisme moderne de réutilisation : des composants versionnés et testés.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un composant est une unité réutilisable (job ou pipeline) publiée depuis un dépôt, consommée via `include: component:` avec une version explicite.",
          "Avantage sur les templates bruts : interface déclarée (inputs), versionnage sémantique, testabilité.",
          "À privilégier pour les standards d'équipe (pipeline de release, scans de sécurité) : un catalogue interne de composants documentés.",
          "Commencez par `include:` classique, migrez vers les composants quand les motifs se stabilisent.",
        ],
      },
    ],
  },
  {
    id: "registry-integre",
    title: "Le registre intégré : builder et pousser",
    level: 3,
    intro:
      "Chaque projet a son registre : le pipeline y pousse sans configuration d'accès.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Build et push avec DinD",
        code: `build-image:
  stage: build
  image: docker:24
  services:
    - docker:24-dind
  variables:
    IMAGE: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA
  script:
    - docker build -t $IMAGE .
    - echo "$CI_REGISTRY_PASSWORD" | docker login $CI_REGISTRY -u $CI_REGISTRY_USER --password-stdin
    - docker push $IMAGE`,
      },
      {
        kind: "list",
        items: [
          "`$CI_REGISTRY_IMAGE` / `$CI_REGISTRY_USER` / `$CI_REGISTRY_PASSWORD` sont fournis : aucune variable à créer.",
          "Le tag = le SHA court : chaque image est rattachée à un commit précis.",
          "Ajoutez un scan (Trivy ou template Security) avant le push : une image vulnérable ne doit pas atteindre le registre.",
          "Les politiques de nettoyage (`Settings > Packages`) purgent les vieux tags automatiquement.",
        ],
      },
    ],
  },
  {
    id: "pages",
    title: "GitLab Pages : héberger du statique",
    level: 3,
    intro:
      "Publier un site statique (documentation, démo) directement depuis le pipeline.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Job pages",
        code: `pages:
  stage: deploy
  script:
    - npm ci
    - npm run build
    - mv dist/ public/
  artifacts:
    paths:
      - public/
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH`,
      },
      {
        kind: "list",
        items: [
          "Le job doit s'appeler `pages` et exposer un dossier `public/` : GitLab le publie sur `https://<groupe>.gitlab.io/<projet>/`.",
          "Idéal pour la documentation, les rapports de couverture, les démos de branches.",
          "Domaine custom et HTTPS possibles depuis les paramètres du projet.",
        ],
      },
    ],
  },
  {
    id: "releases",
    title: "Releases automatisées",
    level: 3,
    intro:
      "Créer des releases GitLab depuis le pipeline : tag, changelog, assets.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Job de release",
        code: `release:
  stage: deploy
  image: registry.gitlab.com/gitlab-org/release-cli:latest
  script:
    - release-cli create --name "v$CI_COMMIT_TAG" --tag-name $CI_COMMIT_TAG
  rules:
    - if: $CI_COMMIT_TAG`,
      },
      {
        kind: "list",
        items: [
          "Déclenché sur tag (`$CI_COMMIT_TAG`) : le pipeline build, puis crée la release avec notes et liens vers les artefacts.",
          "Générez les notes depuis les commits (conventional commits) ou les MR mergées depuis la dernière release.",
          "Les assets (binaires, images) liés à la release rendent chaque version téléchargeable et traçable.",
        ],
      },
    ],
  },
  {
    id: "scheduled-pipelines",
    title: "Pipelines planifiés",
    level: 3,
    intro:
      "Les exécutions périodiques : tests nocturnes, maintenance, vérifications.",
    blocks: [
      {
        kind: "list",
        items: [
          "`CI/CD > Schedules > New schedule` : cron + branche cible + variables spécifiques au schedule.",
          "Détectez la source avec `$CI_PIPELINE_SOURCE == \"schedule\"` dans les `rules:` pour des jobs réservés aux runs planifiés.",
          "Usages : suite E2E complète la nuit, scans de sécurité hebdomadaires, vérification des dépendances, sauvegardes.",
          "Les schedules appartiennent à un utilisateur : s'il quitte l'équipe, transférez la propriété (ou utilisez un compte de service).",
        ],
      },
    ],
  },
  {
    id: "merge-trains",
    title: "Merge trains : merger sans attendre",
    level: 3,
    intro:
      "Les MR s'enfilent et se testent en file : fini l'attente du rebase manuel.",
    blocks: [
      {
        kind: "list",
        items: [
          "Principe : les MR approuvées rejoignent un « train » ; GitLab teste chacune sur le résultat des précédentes et merge automatiquement si vert.",
          "Bénéfice : plus de « pipeline vert sur ma branche mais rouge après merge » — le train valide l'état mergé réel.",
          "Si une MR échoue, elle sort du train sans bloquer les suivantes : le train continue.",
          "À activer quand les merges vers main sont fréquents et que les conflits d'intégration deviennent un goulot.",
        ],
      },
    ],
  },
  {
    id: "securite-pipeline",
    title: "Sécuriser le pipeline",
    level: 3,
    intro:
      "Le pipeline touche au code, aux secrets et à la prod : les défenses à mettre en place.",
    blocks: [
      {
        kind: "list",
        items: [
          "Variables `masked` + `protected` : masquées dans les logs, disponibles uniquement sur branches protégées.",
          "Ne donnez pas les variables de production aux pipelines de MR de forks : un contributeur externe ne doit pas accéder aux secrets.",
          "Épinglez les images (`node:20`, pas `node:latest`) et les templates inclus (`ref:`) : un changement amont ne doit pas casser ou compromettre vos builds.",
          "Les runners partagés exécutent du code non fiable par design ; vos runners spécifiques internes ne doivent pas traiter de code externe.",
          "Scannez en continu : SAST, dépendances, images, secrets — les templates `Security/` de GitLab s'intègrent en un `include:`.",
          "Auditez : qui a modifié `.gitlab-ci.yml`, qui a déclenché un job manuel, qui a accédé aux variables — les journaux d'audit du projet.",
        ],
      },
    ],
  },
  {
    id: "auto-devops",
    title: "Auto DevOps",
    level: 3,
    intro:
      "Le pipeline automatique de GitLab : détection du projet, build, test, déploiement.",
    blocks: [
      {
        kind: "list",
        items: [
          "Activation en un clic (`Settings > CI/CD > Auto DevOps`) : GitLab détecte le langage (via les buildpacks/herokuish) et génère le pipeline.",
          "Inclut : build, tests, analyse de code, scan de dépendances, build d'image, review apps, déploiement progressif.",
          "Excellent pour prototyper et pour les équipes sans expertise CI : un pipeline décent en minutes.",
          "Limite : dès que le projet a des besoins spécifiques, un `.gitlab-ci.yml` sur mesure (éventuellement inspiré d'Auto DevOps) prend le relais.",
        ],
      },
    ],
  },
  {
    id: "erreurs-frequentes",
    title: "Erreurs fréquentes et solutions",
    level: 3,
    intro:
      "Les messages et comportements classiques, avec le diagnostic.",
    blocks: [
      {
        kind: "fields",
        title: "Diagnostic express",
        fields: [
          {
            label: "Le pipeline ne se crée pas",
            value:
              "YAML invalide (validez dans l'éditeur de pipeline), `workflow:rules` qui exclut le cas, ou fichier pas à la racine / mal nommé (`.gitlab-ci.yml` exact).",
          },
          {
            label: "Job « stuck » / en attente",
            value:
              "Aucun runner disponible avec les tags demandés : vérifiez les tags du job vs les runners du projet, et les quotas des runners partagés.",
          },
          {
            label: "Variable non définie",
            value:
              "Faute de frappe, variable définie au mauvais niveau, ou variable `protected` sur une branche non protégée.",
          },
          {
            label: "Artefact introuvable dans le job suivant",
            value:
              "Le job producteur n'a pas déclaré `artifacts:paths:`, ou `dependencies:` restreint la récupération. Vérifiez aussi `expire_in`.",
          },
          {
            label: "Échec seulement en CI",
            value:
              "Image différente (`image:`), variable manquante, ou service (`services:`) mal configuré. Reproduisez avec la même image en local.",
          },
          {
            label: "Deux pipelines pour un push (doublon)",
            value:
              "Pipeline de branche + pipeline de MR : ajoutez `workflow:rules` pour ne garder que le pipeline de MR.",
          },
          {
            label: "Docker-in-Docker qui échoue",
            value:
              "Vérifiez le couple image/service (`docker:24` + `docker:24-dind`), la variable `DOCKER_HOST`, et les permissions du runner.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-avance",
    title: "Déboguer efficacement",
    level: 3,
    intro:
      "La méthode quand le pipeline résiste.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Valider la syntaxe",
            detail:
              "L'éditeur de pipeline (`CI/CD > Editor`) valide et visualise le DAG : la moitié des problèmes sont des erreurs de structure.",
          },
          {
            title: "Isoler le job",
            detail:
              "Repérez le premier job rouge et sa première commande en échec : lisez son log depuis le début.",
          },
          {
            title: "Activer le debug",
            detail:
              "Variable `CI_DEBUG_TRACE: \"true\"` : trace détaillée des scripts exécutés (les variables masquées le restent).",
          },
          {
            title: "Rejouer en local",
            detail:
              "Lancez les mêmes commandes dans la même image Docker (`docker run -it node:20 bash`) : si ça échoue en local, le problème n'est pas GitLab.",
          },
          {
            title: "Bisecter",
            detail:
              "« Ça marchait hier » : comparez `.gitlab-ci.yml`, images et dépendances entre le dernier vert et le premier rouge.",
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
      "Les habitudes des pipelines GitLab sains.",
    blocks: [
      {
        kind: "list",
        items: [
          "Déclarez toujours `stages:` explicitement ; utilisez `rules:`, pas `only`/`except`.",
          "Nommez jobs et stages clairement : le graphe du pipeline est une documentation.",
          "Validez dans l'éditeur avant de pousser ; testez les changements de pipeline sur branche.",
          "Secrets en variables masquées/protégées, jamais en clair ; scopes par environnement.",
          "Cachez les dépendances, parallélisez, utilisez `needs:` pour raccourcir le chemin critique.",
          "`expire_in` sur tous les artefacts ; images versionnées (SHA) dans le registre intégré.",
          "Review apps avec nettoyage automatique ; environnements protégés pour la prod.",
          "Factorisez avec `include:` / composants ; épinglez les références externes.",
        ],
      },
    ],
  },
  {
    id: "projets-realistes",
    title: "Projets réalistes : 3 niveaux",
    level: 3,
    intro:
      "Trois projets progressifs pour maîtriser GitLab CI.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Pipeline CI d'un projet réel",
        fields: [
          {
            label: "Objectif",
            value:
              "Pipeline sur un de vos projets : stages test/build, cache, artefacts avec rapports JUnit visibles dans la MR, `workflow:rules` anti-doublons.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "YAML (stages, jobs, script), cache, artefacts, variables prédéfinies, `glab ci view`.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Le feedback rapide : un pipeline lisible dans le graphe, des échecs compréhensibles en un coup d'œil.",
          },
          {
            label: "Difficulté",
            value: "Débutant — un week-end.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — Pipeline avec review apps",
        fields: [
          {
            label: "Objectif",
            value:
              "Chaîne complète : build de l'image → push au registre → review app par MR (avec destruction auto) → staging → production manuelle sur environnement protégé.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Environnements dynamiques (`on_stop`), registre intégré, `rules:`, jobs manuels, variables par environnement.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "La force de l'intégration GitLab : chaque MR testable en conditions réelles, chaque déploiement tracé.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — deux à trois semaines.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Templates d'équipe et sécurité",
        fields: [
          {
            label: "Objectif",
            value:
              "Projet central de templates CI : pipeline standard (test, SAST, build, scan d'image, deploy), composants versionnés, documentation, adoption par plusieurs projets.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "`include:` multi-projets, composants, templates Security/, merge trains, runners spécifiques.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Le CI/CD à l'échelle d'une organisation : standardiser sans rigidifier, sécuriser par défaut.",
          },
          {
            label: "Difficulté",
            value: "Avancé — un mois.",
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
      "Les documentations de référence — uniquement des sources officielles.",
    blocks: [
      {
        kind: "list",
        items: [
          "Documentation GitLab CI/CD — https://docs.gitlab.com/ee/ci/",
          "Référence YAML — https://docs.gitlab.com/ee/ci/yaml/",
          "Variables prédéfinies — https://docs.gitlab.com/ee/ci/variables/predefined_variables.html",
          "Environnements et review apps — https://docs.gitlab.com/ee/ci/environments/",
          "Runners — https://docs.gitlab.com/runner/",
          "Composants CI/CD — https://docs.gitlab.com/ee/ci/components/",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "GitLab CI maîtrisé : les prolongements naturels.",
    blocks: [
      {
        kind: "fields",
        title: "Les prochaines étapes",
        fields: [
          {
            label: "GitHub Actions (`github-actions`)",
            value:
              "L'autre grande implémentation : comparer les deux éclaire les concepts au-delà des syntaxes.",
          },
          {
            label: "CI/CD (`cicd`) en profondeur",
            value:
              "Stratégies de déploiement, DORA, feature flags : la théorie qui rend les pipelines vraiment efficaces.",
          },
          {
            label: "Registres (`container-registry`) et Docker (`docker`)",
            value:
              "Le pivot build → déploiement : images versionnées, scannées, promues entre environnements.",
          },
          {
            label: "Kubernetes (`kubernetes`) et GitOps",
            value:
              "Déployer sur Kubernetes depuis GitLab CI (ou via Argo CD/Flux) : l'étape suivante du déploiement automatisé.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le signe que vous maîtrisez GitLab CI : vos pipelines sont factorisés, vos review apps se nettoient toutes seules, et chaque MR arrive avec son environnement de test.",
      },
    ],
  },
  {
    id: "templates-qualite",
    title: "Templates de qualité et sécurité",
    level: 3,
    intro:
      "Les analyses prêtes à l'emploi de GitLab : qualité, dépendances, conteneurs.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Activer les scans",
        code: `include:
  - template: Jobs/Code-Quality.gitlab-ci.yml
  - template: Security/Dependency-Scanning.gitlab-ci.yml
  - template: Security/Container-Scanning.gitlab-ci.yml
  - template: Security/Secret-Detection.gitlab-ci.yml`,
      },
      {
        kind: "list",
        items: [
          "Code Quality : analyse statique (basée sur CodeClimate) — les problèmes remontent en annotations dans la merge request.",
          "Dependency Scanning : vulnérabilités connues dans les dépendances (Gemnasium) ; Container Scanning : dans les images (Trivy/Grype).",
          "Secret Detection : détecte les secrets commités par accident — le filet de sécurité contre les fuites.",
          "Les résultats alimentent le Security Dashboard et les politiques d'approbation : bloquer le merge si une vulnérabilité critique est trouvée.",
          "Réglez les faux positifs avec soin : un scan que l'équipe ignore vaut moins qu'un scan ciblé qu'elle respecte.",
        ],
      },
    ],
  },
  {
    id: "pipelines-enfants",
    title: "Pipelines enfants : découper les gros pipelines",
    level: 3,
    intro:
      "Parent-child pipelines : un pipeline qui en déclenche d'autres, statiques ou générés dynamiquement.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Pipeline enfant dynamique",
        code: `generate-config:
  stage: build
  script:
    - ./generate-pipeline.sh > generated-config.yml
  artifacts:
    paths: [generated-config.yml]

child-pipeline:
  stage: test
  trigger:
    include:
      - artifact: generated-config.yml
        job: generate-config`,
      },
      {
        kind: "list",
        items: [
          "Le pipeline parent génère la configuration du pipeline enfant (ex. un job par microservice détecté) : parfait pour les monorepos dynamiques.",
          "`trigger:include:` avec un fichier local : pipeline enfant statique pour factoriser par équipe ou par service.",
          "Chaque pipeline enfant a sa propre vue, ses propres artefacts : le débogage reste lisible malgré la taille.",
          "Limite : la génération dynamique complexifie la compréhension — documentez ce que le générateur produit et pourquoi.",
        ],
      },
    ],
  },
];

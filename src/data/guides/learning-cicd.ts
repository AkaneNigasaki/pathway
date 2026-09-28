import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du CI/CD : les concepts et la pratique,
 * indépendamment de l'outil. 3 niveaux d'information
 * (Aperçu / Pratique / Approfondi) avec divulgation progressive.
 * Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_CICD: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce que le CI/CD automatise, et pourquoi il a remplacé les déploiements manuels.",
    blocks: [
      {
        kind: "text",
        text: "Le CI/CD (intégration continue / déploiement continu) automatise le cycle de vie du code : à chaque commit, le code est testé, construit puis déployé automatiquement. L'objectif : livrer des changements petits, fréquents et fiables, au lieu de grosses mises en production stressantes tous les six mois.",
      },
      {
        kind: "text",
        text: "Deux pratiques distinctes : l'intégration continue (CI) — chaque commit déclenche build et tests automatiques, avec une branche principale toujours fonctionnelle ; et la livraison/déploiement continu (CD) — chaque changement validé peut (livraison continue, avec validation humaine) ou doit (déploiement continu, automatique) atteindre la production.",
      },
      {
        kind: "diagram",
        title: "Le cycle CI/CD",
        lines: [
          "COMMIT (push sur une branche)",
          "   │",
          "   ▼",
          "CI : lint + tests + build ──► échec ? → notification, on corrige",
          "   │  succès",
          "   ▼",
          "Artefact versionné (image Docker, archive)",
          "   │",
          "   ▼",
          "CD : staging ──► tests de fumée ──► production",
          "   │",
          "   ▼",
          "Monitoring (+ rollback si problème)",
        ],
      },
    ],
  },
  {
    id: "pourquoi-cicd",
    title: "Pourquoi le CI/CD change tout",
    level: 1,
    intro:
      "Ce que l'automatisation apporte concrètement à une équipe de développement.",
    blocks: [
      {
        kind: "list",
        items: [
          "Détection précoce : un test qui échoue 5 minutes après le commit se corrige en 10 minutes ; le même bug découvert en recette coûte des jours.",
          "Déploiements ennuyeux : quand la mise en production est un non-événement automatisé, on déploie souvent et sans stress.",
          "Traçabilité : chaque déploiement correspond à un commit précis — on sait toujours « quelle version tourne où ».",
          "Reproductibilité : le pipeline est du code versionné ; n'importe qui peut comprendre comment l'application est construite et déployée.",
          "Confiance : les garde-fous automatiques (tests, scans, approbations) remplacent les checklists manuelles oubliées.",
        ],
      },
      {
        kind: "text",
        text: "Le CI/CD est la colonne vertébrale du DevOps : sans pipeline automatisé, pas de livraison rapide ni de qualité durable en équipe. Les outils (GitHub Actions, GitLab CI, Jenkins...) ne sont que des implémentations de ces principes.",
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
      "Le pipeline automatise ce que vous faites déjà à la main : il faut d'abord savoir le faire sans lui.",
    blocks: [
      {
        kind: "fields",
        title: "Les fondations indispensables",
        fields: [
          {
            label: "Git (`git`)",
            value:
              "Branches, commits, pull/merge requests : le push est le déclencheur de tout pipeline. Sans Git fluide, le CI/CD reste abstrait.",
          },
          {
            label: "Ligne de commande",
            value:
              "Un pipeline n'est qu'une suite de commandes shell exécutées sur une machine distante : savoir builder et tester en local d'abord.",
          },
          {
            label: "Tests automatisés (notions)",
            value:
              "Comprendre ce qu'est un test unitaire et pourquoi il doit être rapide et fiable : le pipeline les exécute, il ne les invente pas.",
          },
        ],
      },
    ],
  },
  {
    id: "vocabulaire",
    title: "Le vocabulaire du CI/CD",
    level: 2,
    intro:
      "Les termes employés par tous les outils, avec le même sens partout.",
    blocks: [
      {
        kind: "fields",
        title: "Parler pipeline couramment",
        fields: [
          {
            label: "Pipeline",
            value:
              "La séquence automatisée complète : du commit au déploiement, en passant par tests et build.",
          },
          {
            label: "Job / Stage",
            value:
              "Une étape du pipeline (test, build, deploy). Les stages s'enchaînent ; les jobs d'un même stage peuvent tourner en parallèle.",
          },
          {
            label: "Step",
            value:
              "Une commande individuelle dans un job : installer les dépendances, lancer les tests...",
          },
          {
            label: "Artefact",
            value:
              "Le livrable produit par le build (image Docker, archive zip, binaire) : ce qui est testé est exactement ce qui est déployé.",
          },
          {
            label: "Runner / Agent",
            value:
              "La machine (virtuelle ou conteneur) qui exécute les jobs. Hébergée par le fournisseur ou auto-hébergée.",
          },
          {
            label: "Trigger",
            value:
              "L'événement qui lance le pipeline : push, pull request, planification (cron), déclenchement manuel, tag.",
          },
        ],
      },
    ],
  },
  {
    id: "pipeline-minimal",
    title: "Un pipeline minimal",
    level: 2,
    intro:
      "Le plus petit pipeline utile : à chaque push, installer, tester, builder. Deux syntaxes, même idée.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: ".github/workflows/ci.yml — GitHub Actions",
        code: `name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm ci
      - run: npm test
      - run: npm run build`,
      },
      {
        kind: "code",
        language: "yaml",
        title: ".gitlab-ci.yml — GitLab CI",
        code: `stages: [test, build]

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
    - npm run build`,
      },
      {
        kind: "text",
        text: "Même structure dans les deux outils : un déclencheur (`on` / implicite), des étapes ordonnées, un environnement d'exécution. Apprendre le CI/CD, c'est apprendre ces concepts ; changer d'outil ensuite n'est qu'une traduction de syntaxe.",
      },
    ],
  },
  {
    id: "declencheurs",
    title: "Les déclencheurs",
    level: 2,
    intro:
      "Quand le pipeline se lance : chaque événement a son usage.",
    blocks: [
      {
        kind: "table",
        headers: ["Déclencheur", "Usage typique", "Exemple"],
        rows: [
          ["Push sur branche", "Valider chaque commit d'une feature", "push sur `feature/*`"],
          ["Pull / merge request", "Valider avant de merger", "CI obligatoire avant merge"],
          ["Tag / release", "Déclencher la mise en production", "push du tag `v1.4.2`"],
          ["Planifié (cron)", "Tests nocturnes, sauvegardes, dépendances", "tous les jours à 3h"],
          ["Manuel", "Déploiement en production validé par un humain", "bouton « Deploy to prod »"],
        ],
      },
      {
        kind: "text",
        text: "La combinaison classique : CI automatique sur chaque push et pull request (rapide, sans friction), déploiement en staging automatique, et production sur approbation manuelle ou sur tag. L'automatisation totale du déploiement en production (déploiement continu pur) se mérite : il faut des tests et un monitoring très solides.",
      },
    ],
  },
  {
    id: "etapes-classiques",
    title: "Les étapes classiques d'un pipeline",
    level: 2,
    intro:
      "L'ordre canonique : chaque étape protège la suivante.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Checkout",
            detail:
              "Récupérer le code du commit déclencheur sur le runner. Toujours la première étape, toujours sur une machine fraîche.",
          },
          {
            title: "Lint / format",
            detail:
              "Vérification statique rapide (quelques secondes) : attrape les erreurs de style et une partie des bugs avant les tests.",
          },
          {
            title: "Tests",
            detail:
              "Unitaires puis d'intégration : le filet de sécurité. S'ils échouent, le pipeline s'arrête — rien ne part plus loin.",
          },
          {
            title: "Build",
            detail:
              "Compilation, bundling, construction de l'image Docker : production de l'artefact versionné.",
          },
          {
            title: "Scan (optionnel mais recommandé)",
            detail:
              "Vulnérabilités des dépendances et de l'image : bloque le déploiement si critique.",
          },
          {
            title: "Déploiement",
            detail:
              "Staging automatique, production selon la stratégie (manuelle, sur tag, ou continue).",
          },
          {
            title: "Vérification post-déploiement",
            detail:
              "Tests de fumée (l'application répond-elle ?) et surveillance des métriques : détecter une régression en minutes.",
          },
        ],
      },
    ],
  },
  {
    id: "artefacts",
    title: "Artefacts : builder une fois, déployer partout",
    level: 2,
    intro:
      "Le principe cardinal : l'artefact testé est l'artefact déployé, sans reconstruction intermédiaire.",
    blocks: [
      {
        kind: "list",
        items: [
          "Construisez une seule fois : l'image Docker (ou l'archive) produite en CI est promue telle quelle de staging vers production.",
          "Reconstruire pour la production invalide les tests : « c'est le même code » ne suffit pas, l'environnement de build peut différer.",
          "Versionnez les artefacts (tag semver, SHA du commit) et conservez-les : un rollback = redéployer l'artefact précédent, pas reconstruire l'ancien code.",
          "Stockez-les dans un registre (images) ou un gestionnaire d'artefacts : pas sur le runner, pas en pièce jointe.",
        ],
      },
    ],
  },
  {
    id: "environnements",
    title: "Les environnements : dev, staging, prod",
    level: 2,
    intro:
      "La promotion d'un même artefact à travers des environnements de confiance croissante.",
    blocks: [
      {
        kind: "diagram",
        title: "Chaîne de promotion",
        lines: [
          "Commit",
          "  │",
          "  ▼",
          "DEV (optionnel) ── branche feature, données factices",
          "  │",
          "  ▼",
          "STAGING ── copie fidèle de la prod, données anonymisées",
          "  │  tests de fumée, tests d'intégration, revue humaine",
          "  ▼",
          "PROD ── le même artefact, rien d'autre",
        ],
      },
      {
        kind: "list",
        items: [
          "Staging doit ressembler à la prod (même OS, mêmes versions, données réalistes) : sinon les tests ne prouvent rien.",
          "Les secrets diffèrent par environnement (clés de test vs clés réelles) : jamais les mêmes credentials partout.",
          "Chaque environnement a sa protection : staging déployé automatiquement, production sur approbation ou tag.",
        ],
      },
    ],
  },
  {
    id: "feedback-rapide",
    title: "Le feedback rapide",
    level: 2,
    intro:
      "Un pipeline lent est un pipeline contourné : la vitesse de retour est une fonctionnalité.",
    blocks: [
      {
        kind: "list",
        items: [
          "Objectif : un premier verdict (lint + tests unitaires) en moins de 5-10 minutes après le push.",
          "Échouez vite : les vérifications rapides d'abord (lint, unitaires), les lentes ensuite (e2e, scans).",
          "Notifiez au bon endroit : le développeur qui a poussé, sur le canal qu'il lit (PR, Slack) — pas un e-mail perdu.",
          "Le badge de statut sur le README rend l'état de la branche principale visible par tous : une branche rouge est une priorité collective.",
        ],
      },
    ],
  },
  {
    id: "protection-branches",
    title: "Protection de branches",
    level: 2,
    intro:
      "La règle qui rend la CI contraignante : interdire le merge d'une branche rouge.",
    blocks: [
      {
        kind: "list",
        items: [
          "Sur GitHub : `Settings > Branches > Add rule` — exiger les status checks (la CI) avant merge sur `main`. Sur GitLab : branches protégées + « pipeline must succeed ».",
          "Effet : impossible de merger du code non testé, même « juste pour cette fois ». La discipline devient automatique.",
          "Exigez aussi une revue humaine pour la production : la CI vérifie le « ça marche », l'humain vérifie le « c'est ce qu'on veut ».",
          "La branche principale reste toujours déployable : c'est le prérequis du déploiement continu.",
        ],
      },
    ],
  },
  {
    id: "secrets-bases",
    title: "Les secrets en CI",
    level: 2,
    intro:
      "Clés d'API, tokens, mots de passe : le pipeline en a besoin, sans jamais les exposer.",
    blocks: [
      {
        kind: "list",
        items: [
          "Stockez-les dans le coffre du fournisseur CI (GitHub : `Settings > Secrets and variables > Actions` ; GitLab : `Settings > CI/CD > Variables`), jamais en dur dans le YAML.",
          "Marquez-les comme masqués/protégés : ils n'apparaissent pas dans les logs et ne sont disponibles que sur les branches protégées.",
          "Ne les affichez jamais avec `echo` pour déboguer : un secret logué est un secret compromis, à révoquer immédiatement.",
          "Préférez les identités fédérées (OIDC) aux secrets de longue durée quand le fournisseur le permet : pas de secret à faire tourner.",
          "Faites tourner les secrets régulièrement, et révoquez immédiatement ceux qui ont fuité (dans un log, un commit, un ticket).",
        ],
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow quotidien avec CI/CD",
    level: 2,
    intro:
      "La journée type d'un développeur dans une équipe outillée CI/CD.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Coder sur une branche",
            detail:
              "Petites branches, commits fréquents : le pipeline valide chaque push, pas seulement à la fin.",
          },
          {
            title: "Pousser et surveiller",
            detail:
              "Le pipeline démarre automatiquement. On jette un œil au verdict avant de passer à autre chose — pas une heure après.",
          },
          {
            title: "Corriger si rouge",
            detail:
              "Pipeline rouge = priorité : lire les logs, corriger, re-pousser. On ne laisse jamais une branche rouge traîner.",
          },
          {
            title: "Ouvrir la pull request",
            detail:
              "La CI tourne sur la PR ; la revue humaine se concentre sur le sens, pas sur « est-ce que ça compile ».",
          },
          {
            title: "Merger et déployer",
            detail:
              "Merge vers main (protégée), déploiement automatique en staging, puis promotion en production selon la stratégie de l'équipe.",
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
      "Les pièges classiques quand on découvre les pipelines.",
    blocks: [
      {
        kind: "list",
        items: [
          "Ignorer un pipeline rouge (« ça passera plus tard ») : la branche principale doit rester verte en permanence.",
          "Mettre des secrets en clair dans le YAML ou les logs : utilisez le coffre du fournisseur CI.",
          "Reconstruire l'artefact pour la production au lieu de promouvoir celui testé.",
          "Déployer `latest` ou « la dernière version » sans version explicite : on ne sait plus ce qui tourne.",
          "Un pipeline de 45 minutes que personne n'attend : optimisez (parallélisme, cache) ou il sera contourné.",
          "Tester uniquement en local (« ça marche chez moi ») : la CI est la référence, sur machine fraîche.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "tests-pipeline",
    title: "La pyramide des tests en pipeline",
    level: 3,
    intro:
      "Tous les tests ne vont pas dans le pipeline de la même façon : la pyramide organise le quoi, le quand et le combien.",
    blocks: [
      {
        kind: "diagram",
        title: "Pyramide des tests",
        lines: [
          "        /\\        Tests E2E / UI",
          "       /  \\       (peu, lents, fragiles — parcours critiques)",
          "      /----\\",
          "     /      \\    Tests d'intégration",
          "    /        \\   (API, base de données, contrats)",
          "   /----------\\",
          "  /            \\  Tests unitaires",
          " /              \\ (nombreux, rapides < 1s, stables)",
          "/________________\\",
        ],
      },
      {
        kind: "fields",
        title: "Chaque niveau, son rôle",
        fields: [
          {
            label: "Unitaires",
            value:
              "Rapides et nombreux : ils tournent à chaque push et donnent le premier verdict en minutes. Un test unitaire flaky est un bug à corriger immédiatement.",
          },
          {
            label: "Intégration",
            value:
              "Vérifient les collaborations (API, base, file de messages) avec des doubles ou des services conteneurisés. Plus lents, ils tournent sur les PR et la branche principale.",
          },
          {
            label: "E2E / UI",
            value:
              "Parcours critiques uniquement (inscription, paiement, checkout) : lents et fragiles, ils tournent sur staging ou en nocturne, pas à chaque commit.",
          },
          {
            label: "Tests de fumée",
            value:
              "Après chaque déploiement : « l'application démarre-t-elle et répond-elle ? ». Quelques requêtes HTTP critiques, exécution en secondes.",
          },
          {
            label: "Contrats (contract tests)",
            value:
              "En microservices : chaque service vérifie qu'il respecte le contrat attendu par ses consommateurs, sans tester tout le système.",
          },
        ],
      },
    ],
  },
  {
    id: "tests-flaky",
    title: "Tests instables (flaky) : l'ennemi numéro un",
    level: 3,
    intro:
      "Un test qui échoue aléatoirement détruit la confiance dans le pipeline : à traiter comme un bug prioritaire.",
    blocks: [
      {
        kind: "list",
        items: [
          "Causes classiques : dépendance au temps (sleep arbitraires), ordre d'exécution, état partagé entre tests, ressources externes non mockées, parallélisme mal géré.",
          "Détection : rejouez les tests suspects en boucle, isolez-les, mesurez leur taux d'échec sur une semaine.",
          "Politique : un test flaky est mis en quarantaine (exclu du pipeline bloquant) le temps d'être corrigé — jamais « relancé jusqu'à ce qu'il passe ».",
          "Prévention : tests déterministes (horloges mockées, seeds fixées), isolation (base par test ou transactions rollbackées), timeouts explicites.",
          "Un pipeline auquel on ne fait plus confiance est un pipeline mort : la fiabilité des tests est un investissement, pas un luxe.",
        ],
      },
    ],
  },
  {
    id: "strategies-branches",
    title: "Stratégies de branches",
    level: 3,
    intro:
      "L'organisation des branches détermine la fluidité du CI/CD : deux écoles principales.",
    blocks: [
      {
        kind: "table",
        headers: ["Approche", "Principe", "Adaptée quand"],
        rows: [
          ["Trunk-based", "Branches courtes (< 1 jour), merges fréquents vers main, feature flags pour le code inachevé", "Équipes pratiquant le déploiement continu, CI rapide"],
          ["GitFlow", "Branches develop/release/hotfix, releases planifiées", "Versions packagées (mobile, desktop), cycles de release formels"],
          ["GitHub Flow", "Branches feature + PR vers main, déploiement après merge", "La plupart des applications web, bon compromis"],
        ],
      },
      {
        kind: "text",
        text: "Le point commun des approches modernes : des branches courtes et des merges fréquents. Les longues branches divergentes sont l'ennemi de l'intégration continue — le « merge hell » n'est pas une fatalité, c'est un symptôme.",
      },
    ],
  },
  {
    id: "versioning",
    title: "Versionner : semver et releases",
    level: 3,
    intro:
      "Un numéro de version est un contrat : le versionnage sémantique rend les changements lisibles.",
    blocks: [
      {
        kind: "list",
        items: [
          "Semver `MAJEUR.MINEUR.CORRECTIF` : correctif = bug compatible, mineur = fonctionnalité compatible, majeur = rupture de compatibilité.",
          "Automatisez : les releases se créent depuis un tag Git (`v1.4.2`), le pipeline build l'artefact, génère le changelog depuis les commits (conventional commits) et publie.",
          "Le changelog est une documentation utilisateur : « quoi de neuf, quoi de cassé, comment migrer » — pas une liste de commits brute.",
          "En déploiement continu pur, chaque commit sur main est une release candidate : le versionnage reste utile pour tracer, même sans « sortie » formelle.",
        ],
      },
    ],
  },
  {
    id: "strategies-deploiement",
    title: "Stratégies de déploiement",
    level: 3,
    intro:
      "Mettre en production sans interruption et avec un retour en arrière possible : trois stratégies de référence.",
    blocks: [
      {
        kind: "fields",
        title: "Trois stratégies, trois philosophies",
        fields: [
          {
            label: "Rolling (progressif)",
            value:
              "Remplace les instances une par une (ou par lots). Simple, sans infrastructure doublée, mais la bascule est progressive : deux versions cohabitent temporairement.",
          },
          {
            label: "Blue/green",
            value:
              "Deux environnements identiques : la nouvelle version (green) est déployée et testée, puis tout le trafic bascule d'un coup. Rollback instantané (rebascule), mais coût doublé pendant l'opération.",
          },
          {
            label: "Canary",
            value:
              "La nouvelle version reçoit d'abord un petit pourcentage du trafic (1 %, 5 %), puis on augmente progressivement en surveillant les métriques. Le plus sûr pour détecter les régressions subtiles, mais exige un monitoring fin.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Précondition commune : les health checks. Le pipeline ne bascule le trafic que vers des instances saines.",
          "Les migrations de base doivent être compatibles avec les deux versions pendant la transition (ajouter avant de supprimer : expand/contract).",
          "Choisissez selon le risque : rolling par défaut, blue/green pour les bascules critiques, canary pour les changements à risque.",
        ],
      },
    ],
  },
  {
    id: "rollback",
    title: "Rollback : le plan de sortie",
    level: 3,
    intro:
      "Tout déploiement peut échouer : la question n'est pas « si », mais « en combien de temps on revient en arrière ».",
    blocks: [
      {
        kind: "list",
        items: [
          "Le rollback redéploie l'artefact précédent (versionné, conservé) : jamais « on re-pousse l'ancien code et on rebuild ».",
          "Testez le rollback comme le déploiement : un plan jamais exercé est un vœu pieux. Faites un exercice en staging.",
          "Automatisez le rollback sur échec des health checks post-déploiement : la machine réagit en secondes, l'humain en minutes.",
          "Les migrations de base compliquent le rollback : prévoyez des migrations réversibles ou compatibles avant/arrière.",
          "Après incident : post-mortem sans blâme, cause racine, action corrective dans le pipeline (nouveau test, nouvelle alarme).",
        ],
      },
    ],
  },
  {
    id: "environnements-ephemeres",
    title: "Environnements éphémères",
    level: 3,
    intro:
      "Un environnement complet par pull request, créé automatiquement et détruit au merge : la revue en conditions réelles.",
    blocks: [
      {
        kind: "list",
        items: [
          "Principe : chaque PR déploie l'application sur une URL unique (`pr-123.staging.example.com`) avec ses données de test.",
          "Bénéfice : les reviewers testent le vrai comportement, pas des captures d'écran ; les conflits d'intégration se voient tôt.",
          "Coût maîtrisé : création à la PR, destruction au merge/close — l'automatisation du nettoyage est non négociable.",
          "GitLab CI les appelle « review apps » avec support natif ; sur GitHub Actions, on les construit avec des environnements dynamiques + Terraform/pipeline.",
          "Données : jeux de test anonymisés, jamais de copie de la production avec des données réelles.",
        ],
      },
    ],
  },
  {
    id: "parallelisation",
    title: "Paralléliser pour aller vite",
    level: 3,
    intro:
      "Le temps de pipeline se compresse en parallélisant ce qui est indépendant.",
    blocks: [
      {
        kind: "list",
        items: [
          "Jobs parallèles : lint, tests unitaires et build peuvent souvent tourner simultanément plutôt qu'en séquence.",
          "Sharding des tests : répartir la suite de tests sur N runners (par dossier, par timing historique) divise le temps par N.",
          "Matrice (matrix) : tester plusieurs versions (Node 20/22, Python 3.11/3.12) en parallèle avec une seule définition de job.",
          "Limite : le parallélisme a un coût (runners) et un seuil d'utilité — paralléliser 30 secondes de lint ne sert à rien.",
          "Mesurez : le temps de pipeline est une métrique à suivre (objectif : premier verdict en minutes, pipeline complet en dizaines de minutes max).",
        ],
      },
    ],
  },
  {
    id: "cache-dependances",
    title: "Cacher les dépendances",
    level: 3,
    intro:
      "Le cache évite de retélécharger le monde à chaque build : le gain le plus simple sur le temps de pipeline.",
    blocks: [
      {
        kind: "list",
        items: [
          "Principe : clé de cache = hash du fichier de dépendances (`package-lock.json`, `requirements.txt`) — si inchangé, on restaure le cache.",
          "Ciblez les étapes lentes : `npm ci` / `pip install` (minutes), build Docker (couches), pas les étapes de quelques secondes.",
          "Attention aux caches périmés : une clé trop large sert un cache obsolète ; une clé trop fine ne sert jamais. Le hash du lockfile est le bon compromis.",
          "En Docker, le cache de couches (registry ou local) accélère les rebuilds : seules les couches modifiées sont reconstruites.",
          "Nettoyez : les caches ont une taille limite et une rétention — un cache qui grossit indéfiniment finit par ralentir.",
        ],
      },
    ],
  },
  {
    id: "dora",
    title: "Mesurer : les métriques DORA",
    level: 3,
    intro:
      "Quatre métriques pour piloter la performance de livraison, issues de la recherche (programme DORA, Google).",
    blocks: [
      {
        kind: "fields",
        title: "Les quatre métriques",
        fields: [
          {
            label: "Fréquence de déploiement",
            value:
              "À quelle fréquence le code atteint la production. Les équipes performantes déploient plusieurs fois par jour.",
          },
          {
            label: "Lead time (commit → production)",
            value:
              "Le délai entre un commit et son arrivée en production. L'indicateur de la fluidité du pipeline.",
          },
          {
            label: "Taux d'échec des changements",
            value:
              "La part des déploiements qui causent un incident ou nécessitent un rollback. La qualité du filet de sécurité.",
          },
          {
            label: "MTTR (temps de rétablissement)",
            value:
              "Le temps moyen pour restaurer le service après un incident. La résilience de l'équipe.",
          },
        ],
      },
      {
        kind: "text",
        text: "L'enseignement clé de la recherche DORA : vitesse et stabilité vont ensemble. Les équipes qui déploient souvent ont aussi moins d'échecs — parce que chaque changement est petit et le pipeline est rodé. Référence : https://dora.dev/",
      },
    ],
  },
  {
    id: "pipeline-as-code",
    title: "Pipeline as Code",
    level: 3,
    intro:
      "Le pipeline est du code : versionné, reviewé, testé comme le reste.",
    blocks: [
      {
        kind: "list",
        items: [
          "La définition du pipeline vit dans le dépôt (`.github/workflows/`, `.gitlab-ci.yml`) : chaque changement passe par une PR reviewée.",
          "Avantage : historique, rollback du pipeline lui-même, et cohérence entre branches (la PR teste avec le pipeline de la PR).",
          "Factorisez : templates, actions/composants partagés, workflows réutilisables — pas de copier-coller entre 20 dépôts.",
          "Testez les changements de pipeline sur une branche avant de les appliquer à `main` : un pipeline cassé bloque toute l'équipe.",
          "Documentez les pipelines non triviaux : que fait chaque job, pourquoi cet ordre, qui contacter en cas d'échec.",
        ],
      },
    ],
  },
  {
    id: "securite-pipeline",
    title: "Sécuriser le pipeline",
    level: 3,
    intro:
      "Le pipeline a accès au code, aux secrets et à la production : c'est une cible de choix.",
    blocks: [
      {
        kind: "list",
        items: [
          "Moindre privilège sur les tokens CI : le `GITHUB_TOKEN` ou les tokens GitLab n'ont que les permissions nécessaires (ne pas tout autoriser « au cas où »).",
          "Épinglez les versions des actions et images tierces (SHA ou tag majeur) : une action compromise ou mise à jour sauvagement peut exfiltrer des secrets.",
          "Les workflows sur les PR de forks sont sensibles : n'exécutez pas de code non reviewé avec accès aux secrets.",
          "Scannez dépendances et images dans le pipeline (pas après) : bloquez sur les vulnérabilités critiques.",
          "Protégez les runners auto-hébergés : ce sont des machines avec accès réseau interne — durcissez-les comme des serveurs de production.",
          "Auditez : qui a modifié le pipeline, qui a approuvé le déploiement — les logs CI sont des preuves.",
        ],
      },
    ],
  },
  {
    id: "runners",
    title: "Runners : hébergés vs auto-hébergés",
    level: 3,
    intro:
      "Où s'exécutent les jobs : le choix impacte coût, sécurité et capacités.",
    blocks: [
      {
        kind: "table",
        headers: ["Critère", "Runners hébergés", "Runners auto-hébergés"],
        rows: [
          ["Maintenance", "Aucune", "OS, mises à jour, scaling à gérer"],
          ["Sécurité", "Isolation par job, machine fraîche", "Accès réseau interne possible — à durcir"],
          ["Capacités", "Catalogue standard (CPU/RAM/OS)", "GPU, gros volumes, réseau privé, licences spécifiques"],
          ["Coût", "Minutes facturées (gratuit en open source)", "Infrastructure à payer, rentable à fort volume"],
        ],
      },
      {
        kind: "text",
        text: "Commencez hébergé : zéro maintenance, sécurité correcte par défaut. Passez à l'auto-hébergé quand un besoin précis l'exige (GPU, réseau privé, volume) — pas par principe.",
      },
    ],
  },
  {
    id: "monorepo",
    title: "CI/CD en monorepo",
    level: 3,
    intro:
      "Un seul dépôt, plusieurs applications : le pipeline doit savoir quoi tester et déployer.",
    blocks: [
      {
        kind: "list",
        items: [
          "Détection des changements : ne tester/déployer que les projets affectés par le commit (paths filters), pas tout le repo à chaque fois.",
          "Pipelines par projet avec une configuration partagée : factorisez les étapes communes (setup, cache, notifications).",
          "Versionnez chaque livrable indépendamment : le monorepo n'impose pas des releases synchronisées.",
          "Attention à la complexité : le monorepo simplifie le partage de code mais complexifie le pipeline — outillez la détection de changements dès le début.",
        ],
      },
    ],
  },
  {
    id: "migrations-bdd",
    title: "Migrations de base en CD",
    level: 3,
    intro:
      "Le point le plus délicat du déploiement continu : faire évoluer le schéma sans casser la version en cours.",
    blocks: [
      {
        kind: "list",
        items: [
          "Règle d'or : les migrations sont compatibles avant/arrière (expand/contract) — d'abord ajouter (colonne nullable), déployer, puis seulement supprimer l'ancien.",
          "Automatisez les migrations dans le pipeline (job dédié avant le déploiement applicatif), jamais à la main en production.",
          "Chaque migration est réversible ou documentée comme telle ; testez le rollback en staging.",
          "Séparez les migrations destructrices (suppression de colonne) des déploiements : en deux temps, avec une version intermédiaire.",
          "Surveillez la durée : une migration longue verrouille des tables — planifiez les grosses migrations hors heures de pointe.",
        ],
      },
    ],
  },
  {
    id: "feature-flags",
    title: "Feature flags : découpler déploiement et release",
    level: 3,
    intro:
      "Déployer du code sans l'activer : le feature flag sépare la mise en production technique de l'ouverture aux utilisateurs.",
    blocks: [
      {
        kind: "list",
        items: [
          "Principe : le code est déployé mais inactif derrière un interrupteur (flag) — on l'active progressivement, sans redéployer.",
          "Usages : trunk-based development (merger du code inachevé sans l'exposer), canary par flag (5 % des utilisateurs), kill switch (désactiver une fonctionnalité en panne en secondes).",
          "Nettoyez : un flag permanent devient de la dette — supprimez les flags après généralisation (avec le code mort associé).",
          "Pour les flags complexes (ciblage, pourcentages), utilisez un système dédié plutôt que des variables d'environnement artisanales.",
        ],
      },
    ],
  },
  {
    id: "approvals",
    title: "Approbations et environnements protégés",
    level: 3,
    intro:
      "Le garde-fou humain : exiger une validation explicite avant les étapes sensibles.",
    blocks: [
      {
        kind: "list",
        items: [
          "La production exige une approbation : un humain clique (ou le pipeline attend un tag signé) — jamais de déploiement prod purement automatique sans filet.",
          "Restreignez qui peut approuver : pas l'auteur du changement seul (principe des quatre yeux pour le critique).",
          "Les approbations ne remplacent pas les tests : elles valident le « quand » et le « quoi », pas le « est-ce que ça marche ».",
          "Tracez : qui a approuvé, quand, quelle version — l'audit commence là.",
          "Équilibre : trop d'approbations tuent la fluidité ; réservez-les à la production et aux actions destructrices.",
        ],
      },
    ],
  },
  {
    id: "notifications",
    title: "Notifications et visibilité",
    level: 3,
    intro:
      "Un pipeline silencieux est un pipeline ignoré : la bonne information, au bon endroit, au bon moment.",
    blocks: [
      {
        kind: "list",
        items: [
          "Échec → notification immédiate à l'auteur (PR, Slack/Teams) : le feedback doit arriver en minutes.",
          "Succès → discret : pas de spam pour les pipelines verts de routine, sauf les déploiements en production (canal d'équipe).",
          "Déploiement en prod → annonce visible (canal dédié, avec version et lien vers le changelog) : tout le monde sait ce qui tourne.",
          "Tableaux de bord : état des pipelines, temps d'exécution, taux d'échec — la santé du système de livraison en un coup d'œil.",
        ],
      },
    ],
  },
  {
    id: "erreurs-frequentes",
    title: "Erreurs fréquentes et solutions",
    level: 3,
    intro:
      "Les pannes classiques des pipelines, avec le diagnostic.",
    blocks: [
      {
        kind: "fields",
        title: "Diagnostic express",
        fields: [
          {
            label: "Le pipeline échoue mais ça marche en local",
            value:
              "Différence d'environnement : version de langage, variable d'environnement manquante, dépendance système absente sur le runner. Figez les versions (lockfiles, images précises) et lisez les logs depuis le début.",
          },
          {
            label: "Timeout",
            value:
              "Étape trop longue (tests, build) : augmentez le timeout avec parcimonie, mais surtout parallélisez, cachez, ou découpez. Un timeout qui augmente sans fin cache un problème.",
          },
          {
            label: "Échec intermittent",
            value:
              "Test flaky, ressource externe instable, race condition : identifiez (logs, rejeu), mettez en quarantaine, corrigez. Ne « relancez pas jusqu'au vert ».",
          },
          {
            label: "Secret non trouvé / permission refusée",
            value:
              "Mauvais nom de variable, secret non défini sur la branche (protégé), ou token expiré/révoqué. Vérifiez le coffre du fournisseur CI et les scopes.",
          },
          {
            label: "Artefact introuvable au déploiement",
            value:
              "Le job de déploiement ne récupère pas l'artefact du job de build : vérifiez le nommage, la rétention et le passage entre jobs (artifacts/dependencies).",
          },
          {
            label: "Déploiement réussi mais application en erreur",
            value:
              "Le pipeline a déployé, l'application ne démarre pas : variables d'environnement manquantes, migration non appliquée, port incorrect. Les tests de fumée post-déploiement existent pour ça.",
          },
          {
            label: "Pipeline de plus en plus lent",
            value:
              "Suite de tests qui grossit sans sharding, cache inefficace, étapes séquentielles parallélisables : mesurez par étape et optimisez le maillon lent.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-pipeline",
    title: "Déboguer un pipeline",
    level: 3,
    intro:
      "La méthode quand le pipeline est rouge et que la cause n'est pas évidente.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Identifier l'étape en échec",
            detail:
              "Ne lisez pas tout : repérez le premier job rouge et, dedans, la première commande en échec. Tout ce qui suit est une conséquence.",
          },
          {
            title: "Lire le message d'erreur exact",
            detail:
              "Copiez le message tel quel : la plupart des erreurs CI sont des erreurs classiques (dépendance manquante, permission, syntaxe) avec des solutions documentées.",
          },
          {
            title: "Reproduire en local",
            detail:
              "Lancez la même commande dans le même environnement (même image Docker, mêmes variables) : si ça échoue en local, le problème n'est pas le pipeline.",
          },
          {
            title: "Activer les logs détaillés",
            detail:
              "Mode debug du runner (variables `ACTIONS_STEP_DEBUG` / `CI_DEBUG_TRACE` selon l'outil) : affiche les commandes exactes et les variables (masquées pour les secrets).",
          },
          {
            title: "Bisecter",
            detail:
              "Si « ça marchait hier » : comparez les changements (code, dépendances, pipeline lui-même) entre le dernier vert et le premier rouge.",
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
      "Les habitudes d'un CI/CD sain et durable.",
    blocks: [
      {
        kind: "list",
        items: [
          "Main toujours verte : un pipeline rouge est une priorité, pas un bruit de fond.",
          "Petits commits, merges fréquents : le CI/CD récompense les petits changements.",
          "Builder une fois, promouvoir l'artefact : jamais de reconstruction entre staging et prod.",
          "Pipeline as Code : versionné, reviewé, testé.",
          "Secrets dans le coffre CI, jamais dans le code ni les logs ; identités fédérées quand possible.",
          "Environnements éphémères par PR pour les revues en conditions réelles.",
          "Rollback testé, migrations compatibles, feature flags pour les changements à risque.",
          "Mesurez DORA : fréquence, lead time, taux d'échec, MTTR — et améliorez en continu.",
        ],
      },
    ],
  },
  {
    id: "projets-realistes",
    title: "Projets réalistes : 3 niveaux",
    level: 3,
    intro:
      "Trois projets progressifs pour construire une vraie pratique du CI/CD.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Pipeline CI pour un projet existant",
        fields: [
          {
            label: "Objectif",
            value:
              "Ajouter à un de vos projets un pipeline : lint + tests + build à chaque push et PR, badge de statut sur le README, protection de branche exigeant le vert.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "YAML du fournisseur choisi, lecture des logs, cache des dépendances, protection de branche.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Le feedback rapide : ce que « main toujours verte » change au quotidien d'un développeur.",
          },
          {
            label: "Difficulté",
            value: "Débutant — un week-end.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — CD complet avec environnements",
        fields: [
          {
            label: "Objectif",
            value:
              "Chaîne complète : build de l'image versionnée → scan → push au registre → staging automatique → production sur approbation, avec tests de fumée et notifications.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Artefacts et registres, secrets de CI, environnements, approbations, stratégies de déploiement.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "La livraison continue : promouvoir le même artefact, avec des garde-fous à chaque étape.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — deux à trois semaines.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Plateforme CI/CD d'équipe",
        fields: [
          {
            label: "Objectif",
            value:
              "Templates de pipeline partagés pour plusieurs projets, environnements éphémères par PR, métriques DORA, scans de sécurité intégrés, documentation.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Pipeline as Code factorisé, review apps, sécurité du pipeline, mesure et amélioration continue.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Le CI/CD à l'échelle : standardiser sans rigidifier, et faire du pipeline un produit pour les développeurs.",
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
      "Les références — sources officielles et recherche de référence.",
    blocks: [
      {
        kind: "list",
        items: [
          "GitHub Actions — https://docs.github.com/actions",
          "GitLab CI/CD — https://docs.gitlab.com/ee/ci/",
          "DORA (métriques et rapports) — https://dora.dev/",
          "Google SRE (livres gratuits) — https://sre.google/",
          "Martin Fowler — Continuous Integration — https://martinfowler.com/articles/continuousIntegration.html",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Les concepts CI/CD maîtrisés : les implémentations et les prolongements.",
    blocks: [
      {
        kind: "fields",
        title: "Les prochaines étapes",
        fields: [
          {
            label: "GitHub Actions (`github-actions`)",
            value:
              "L'implémentation la plus accessible : workflows YAML intégrés au dépôt, marketplace d'actions, runners hébergés.",
          },
          {
            label: "GitLab CI (`gitlab-ci`)",
            value:
              "L'alternative intégrée : un seul outil pour le code, les pipelines, les registres et les review apps.",
          },
          {
            label: "Docker (`docker`) et registres (`container-registry`)",
            value:
              "Le pivot entre CI et CD : builder des images versionnées, les scanner, les promouvoir entre environnements.",
          },
          {
            label: "DevOps (`devops`) et SRE",
            value:
              "La culture autour du pipeline : DORA, blameless post-mortems, SLO — le CI/CD n'est qu'une pièce du système.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le signe que vous maîtrisez le CI/CD : déployer un vendredi après-midi ne vous fait plus peur — parce que le pipeline, les tests et le rollback sont fiables.",
      },
    ],
  },
  {
    id: "securite-supply-chain",
    title: "Sécurité de la supply chain",
    level: 3,
    intro:
      "Le pipeline construit ce qui tourne en prod : sécuriser la chaîne, pas seulement le code.",
    blocks: [
      {
        kind: "list",
        items: [
          "SBOM (Software Bill of Materials) : générer la liste des composants de chaque build — savoir exactement ce qui est embarqué.",
          "Signatures : signer les artefacts (images, binaires) pour prouver leur origine — voir `container-registry` (cosign).",
          "SLSA : le framework de niveaux de garantie pour les builds — du scripté au vérifiable.",
          "Scans à chaque étape : dépendances, code (SAST), images, secrets — jamais seulement « à la fin ».",
          "Politiques d'admission : en production (Kubernetes), n'accepter que les artefacts signés et scannés.",
          "Provenance : chaque artefact doit être rattaché à un commit, un pipeline, un build — la traçabilité complète.",
        ],
      },
    ],
  },
  {
    id: "verification-continue",
    title: "Vérification continue après déploiement",
    level: 3,
    intro:
      "Le pipeline ne s'arrête pas au déploiement : vérifier que la prod se comporte comme prévu.",
    blocks: [
      {
        kind: "list",
        items: [
          "Smoke tests post-déploiement : une étape du pipeline qui vérifie les endpoints critiques après chaque déploiement — échec = rollback automatique.",
          "Vérification progressive : canary/blue-green avec métriques (taux d'erreur, latence) — le déploiement ne progresse que si les indicateurs sont sains.",
          "Tests en production : feature flags + monitoring ciblé pour valider les nouveautés sur un sous-ensemble d'utilisateurs.",
          "Alertes liées au déploiement : corréler les incidents avec les releases (marqueurs de déploiement dans l'APM).",
          "Le pipeline idéal : build → test → déploie → vérifie → promeut ou rollback — sans intervention humaine sur le chemin nominal.",
        ],
      },
    ],
  },
];

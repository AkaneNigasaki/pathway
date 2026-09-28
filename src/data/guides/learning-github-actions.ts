import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de GitHub Actions : de zéro à des workflows
 * professionnels. 3 niveaux d'information (Aperçu / Pratique /
 * Approfondi) avec divulgation progressive. Tous les textes supportent
 * le code inline entre backticks.
 */
export const LEARNING_GITHUB_ACTIONS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est GitHub Actions et pourquoi il est devenu le CI/CD le plus accessible.",
    blocks: [
      {
        kind: "text",
        text: "GitHub Actions est le système CI/CD intégré à GitHub : des workflows décrits en YAML dans `.github/workflows/` s'exécutent à chaque push, pull request ou planification. Aucune infrastructure à gérer, gratuit pour les dépôts publics et avec un quota mensuel pour les dépôts privés.",
      },
      {
        kind: "text",
        text: "Le modèle : un événement déclenche un workflow, composé de jobs qui tournent en parallèle sur des machines fraîches (runners hébergés), chaque job étant une suite d'étapes (steps) qui exécutent des commandes ou des actions réutilisables du marketplace. Le tout est versionné avec le code : le pipeline évolue avec le projet.",
      },
      {
        kind: "diagram",
        title: "Du push au workflow",
        lines: [
          "git push",
          "   │",
          "   ▼",
          "Événement (push, pull_request, schedule...)",
          "   │",
          "   ▼",
          "Workflow (.github/workflows/ci.yml)",
          "   │",
          "   ├── Job « test » ──► runner ubuntu ──► steps",
          "   └── Job « lint » ──► runner ubuntu ──► steps",
          "   │         (parallèles, machines fraîches)",
          "   ▼",
          "Statut : vert (mergeable) ou rouge (à corriger)",
        ],
      },
    ],
  },
  {
    id: "runners-heberges",
    title: "Les runners hébergés",
    level: 1,
    intro:
      "Où s'exécutent les workflows : des machines fraîches, gérées par GitHub.",
    blocks: [
      {
        kind: "list",
        items: [
          "`runs-on: ubuntu-latest` (aussi `windows-latest`, `macos-latest`) : chaque job démarre sur une machine vierge, avec un catalogue d'outils préinstallés (langages, Docker, CLI).",
          "Machine fraîche = reproductibilité : aucun état résiduel d'une exécution précédente ne peut fausser le build.",
          "Gratuit pour les dépôts publics ; les dépôts privés ont un quota mensuel de minutes (plus généreux sur les plans payants).",
          "Pour des besoins spécifiques (GPU, réseau privé, gros volumes), on peut enregistrer ses propres runners auto-hébergés (voir niveau 3).",
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
      "Ce qu'il faut maîtriser avant d'écrire son premier workflow.",
    blocks: [
      {
        kind: "fields",
        title: "Les fondations indispensables",
        fields: [
          {
            label: "Git et GitHub (`git`, `github`)",
            value:
              "Dépôts, branches, pull requests : les événements qui déclenchent les workflows. Sans Git fluide, les déclencheurs restent abstraits.",
          },
          {
            label: "CI/CD (`cicd`)",
            value:
              "Les concepts de pipeline, job, artefact et environnement : GitHub Actions n'est qu'une implémentation de ces principes.",
          },
          {
            label: "YAML",
            value:
              "Indentation, listes, dictionnaires : 90 % des erreurs de débutant sont du YAML invalide, pas de la logique Actions.",
          },
          {
            label: "Ligne de commande",
            value:
              "Les steps `run:` ne sont que des commandes shell : savoir builder et tester en local d'abord.",
          },
        ],
      },
    ],
  },
  {
    id: "premier-workflow",
    title: "Premier workflow : CI lint + test + build",
    level: 2,
    intro:
      "Le workflow canonique : à chaque push et PR, installer, tester, builder.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: ".github/workflows/ci.yml",
        code: `name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Installer Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Installer les dépendances
        run: npm ci

      - name: Lancer les tests
        run: npm test

      - name: Builder
        run: npm run build`,
      },
      {
        kind: "list",
        items: [
          "Créez le fichier, commitez, poussez : l'onglet `Actions` du dépôt montre l'exécution en temps réel.",
          "`on: [push, pull_request]` : le workflow tourne à chaque push et sur chaque PR — le filet de sécurité de base.",
          "Chaque `name:` rend les logs lisibles : nommez chaque étape comme vous nommeriez une fonction.",
        ],
      },
    ],
  },
  {
    id: "declencheurs-on",
    title: "Les déclencheurs (on:)",
    level: 2,
    intro:
      "Quand le workflow se lance : la syntaxe `on:` contrôle tout.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Déclencheurs courants",
        code: `on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: "0 3 * * *"
  workflow_dispatch:`,
      },
      {
        kind: "table",
        headers: ["Déclencheur", "Usage"],
        rows: [
          ["`push` (filtré par branches)", "Valider chaque commit poussé"],
          ["`pull_request`", "Valider avant merge — la base de la revue"],
          ["`schedule` (cron)", "Tests nocturnes, vérification des dépendances"],
          ["`workflow_dispatch`", "Lancement manuel depuis l'onglet Actions (avec paramètres possibles)"],
          ["`release` / tag", "Déclencher la mise en production sur publication"],
        ],
      },
      {
        kind: "text",
        text: "Filtrez par branches et par chemins (`paths:`) pour ne pas lancer le pipeline backend quand seule la doc a changé : moins d'exécutions inutiles, feedback plus rapide.",
      },
    ],
  },
  {
    id: "anatomie-workflow",
    title: "Anatomie : workflows, jobs, steps",
    level: 2,
    intro:
      "La hiérarchie d'un workflow et ce que chaque niveau contrôle.",
    blocks: [
      {
        kind: "fields",
        title: "Trois niveaux",
        fields: [
          {
            label: "Workflow",
            value:
              "Le fichier YAML : un nom, des déclencheurs (`on:`), des jobs. Un dépôt peut avoir plusieurs workflows (ci.yml, deploy.yml, nightly.yml).",
          },
          {
            label: "Job",
            value:
              "Une unité qui tourne sur un runner (`runs-on:`). Les jobs tournent en parallèle par défaut ; `needs:` crée une dépendance (le job B attend le job A).",
          },
          {
            label: "Step",
            value:
              "Une étape dans un job : soit `run:` (commande shell), soit `uses:` (action réutilisable). Les steps d'un job s'exécutent en séquence sur la même machine.",
          },
        ],
      },
      {
        kind: "code",
        language: "yaml",
        title: "Jobs en séquence avec needs",
        code: `jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm test

  deploy:
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main'
    steps:
      - run: ./deploy.sh`,
      },
      {
        kind: "text",
        text: "`needs: test` : le déploiement attend les tests. `if: github.ref == ...` : il ne se lance que sur `main`. Ces deux mécanismes structurent 90 % des pipelines.",
      },
    ],
  },
  {
    id: "actions-marketplace",
    title: "Les actions : ne pas réinventer",
    level: 2,
    intro:
      "Le marketplace fournit des briques prêtes : checkout, setup des langages, login Docker, déploiement.",
    blocks: [
      {
        kind: "table",
        headers: ["Action", "Usage"],
        rows: [
          ["`actions/checkout@v4`", "Récupérer le code du dépôt sur le runner"],
          ["`actions/setup-node@v4`", "Installer Node.js (avec cache npm intégré)"],
          ["`actions/setup-python@v5`", "Installer Python"],
          ["`docker/login-action@v3`", "S'authentifier à un registre de conteneurs"],
          ["`docker/build-push-action@v6`", "Builder et pousser une image Docker"],
          ["`actions/upload-artifact@v4`", "Sauvegarder des fichiers entre jobs"],
        ],
      },
      {
        kind: "list",
        items: [
          "Épinglez les versions majeures (`@v4`) : vous bénéficiez des correctifs sans les ruptures. Pour la sécurité maximale, épinglez le SHA du commit.",
          "Préférez les actions officielles (`actions/*`) et les éditeurs reconnus : une action tierce obscure avec accès à vos secrets est un risque.",
          "Lisez le README de l'action avant usage : les paramètres (`with:`) et les sorties y sont documentés.",
        ],
      },
    ],
  },
  {
    id: "gh-cli",
    title: "Piloter avec la CLI gh",
    level: 2,
    intro:
      "La CLI GitHub permet de suivre et déclencher les workflows sans quitter le terminal.",
    blocks: [
      {
        kind: "command",
        label: "Lister les exécutions",
        command: "gh run list",
        why: "Affiche les runs récents du dépôt : statut, workflow, branche, durée. Le tableau de bord « qu'est-ce qui tourne / qu'est-ce qui est rouge ? ».",
      },
      {
        kind: "command",
        label: "Suivre un run en direct",
        command: "gh run watch",
        why: "Suit l'exécution en cours dans le terminal, avec les logs qui défilent. Idéal après un push : on voit le verdict sans ouvrir le navigateur.",
      },
      {
        kind: "command",
        label: "Déclencher manuellement un workflow",
        command: "gh workflow run deploy.yml",
        why: "Lance un workflow ayant un déclencheur `workflow_dispatch`, sans passer par l'interface web. Pratique pour les déploiements manuels et les scripts.",
        verify: "gh run list : le nouveau run apparaît en tête.",
      },
      {
        kind: "command",
        label: "Voir les logs d'un run",
        command: "gh run view --log",
        why: "Affiche les logs complets d'un run (par défaut le dernier). Le premier réflexe quand un workflow est rouge et qu'on est dans le terminal.",
      },
    ],
  },
  {
    id: "secrets",
    title: "Les secrets",
    level: 2,
    intro:
      "Stocker et utiliser les credentials sans jamais les exposer.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Utiliser un secret dans un workflow",
        code: `jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Déployer
        env:
          API_TOKEN: \${{ secrets.API_TOKEN }}
        run: ./deploy.sh`,
      },
      {
        kind: "list",
        items: [
          "Créez les secrets dans `Settings > Secrets and variables > Actions` : ils sont chiffrés et masqués dans les logs.",
          "Référencez-les via `\${{ secrets.NOM }}` : jamais en dur, jamais en `echo` pour déboguer.",
          "Les secrets d'environnement (`Environments > Production > Secrets`) ne sont disponibles que pour les jobs ciblant cet environnement : séparez staging et prod.",
          "Les variables (`vars.`) sont pour la configuration non sensible ; les secrets pour tout le reste.",
        ],
      },
    ],
  },
  {
    id: "logs-debogage",
    title: "Lire et déboguer les logs",
    level: 2,
    intro:
      "L'onglet Actions montre chaque step : savoir lire les logs, c'est savoir corriger.",
    blocks: [
      {
        kind: "list",
        items: [
          "Cliquez sur le job rouge, puis sur la step en échec : les logs montrent la commande exacte et l'erreur. Lisez depuis le haut de la step, pas depuis la fin.",
          "Relancez avec les logs de debug : créez le secret `ACTIONS_STEP_DEBUG` à `true` pour des logs détaillés (commandes, variables — secrets toujours masqués).",
          "Le bouton « Re-run failed jobs » ne relance que les jobs en échec : gain de temps sur les pipelines longs.",
          "Reproduisez en local : la plupart des échecs (`npm ci`, tests) se reproduisent sur votre poste — le runner n'est pas magique.",
        ],
      },
    ],
  },
  {
    id: "badges",
    title: "Badges de statut",
    level: 2,
    intro:
      "Rendre l'état du pipeline visible : un badge sur le README.",
    blocks: [
      {
        kind: "code",
        language: "markdown",
        title: "Badge dans le README.md",
        code: `[![CI](https://github.com/mon-org/mon-repo/actions/workflows/ci.yml/badge.svg)](https://github.com/mon-org/mon-repo/actions/workflows/ci.yml)`,
      },
      {
        kind: "text",
        text: "Le badge reflète le statut de la branche par défaut : vert = la CI passe, rouge = quelqu'un doit regarder. C'est un signal social autant que technique — une équipe qui voit son badge rouge le corrige vite.",
      },
    ],
  },
  {
    id: "permissions-token",
    title: "Permissions du GITHUB_TOKEN",
    level: 2,
    intro:
      "Le token automatique a des permissions : les comprendre et les restreindre.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Permissions minimales explicites",
        code: `jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4`,
      },
      {
        kind: "list",
        items: [
          "Par défaut, le `GITHUB_TOKEN` a des permissions larges en lecture/écriture : restreignez-les par job avec `permissions:` (moindre privilège).",
          "`contents: read` suffit pour la plupart des jobs de CI ; `packages: write` uniquement pour pousser des images ; `pull-requests: write` pour commenter les PR.",
          "Réglez le défaut au niveau du dépôt (`Settings > Actions > General > Workflow permissions`) sur lecture seule : chaque workflow demande ensuite explicitement ce dont il a besoin.",
        ],
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow quotidien",
    level: 2,
    intro:
      "La boucle de travail avec GitHub Actions.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Éditer le workflow",
            detail:
              "VS Code + extension « GitHub Actions » : autocomplétion et validation du YAML pendant l'écriture.",
          },
          {
            title: "Pousser sur une branche",
            detail:
              "Testez les changements de workflow sur une branche feature, pas directement sur main : un workflow cassé sur main bloque toute l'équipe.",
          },
          {
            title: "Observer",
            detail:
              "`gh run watch` ou l'onglet Actions : vérifiez que le workflow se déclenche et passe.",
          },
          {
            title: "Itérer",
            detail:
              "Corrigez le YAML, re-poussez, re-vérifiez. La boucle est rapide : chaque push relance le workflow.",
          },
          {
            title: "Protéger main",
            detail:
              "Une fois stable, exigez le workflow vert avant merge (`Settings > Branches`) : la CI devient contraignante.",
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
      "Les pièges classiques des premiers workflows.",
    blocks: [
      {
        kind: "list",
        items: [
          "YAML invalide : indentation incohérente ou tabulations. Validez avec l'extension VS Code avant de pousser.",
          "Oublier `actions/checkout` : sans lui, le runner est vide et `npm ci` échoue sur « package.json not found ».",
          "Secrets affichés en `echo` pour déboguer : un secret logué est compromis — révoquez-le et changez votre méthode.",
          "Ne pas épingler les versions d'actions : `@main` peut changer sous vos pieds ; utilisez `@v4` ou un SHA.",
          "Tester les changements de workflow directement sur `main` : utilisez une branche et une PR.",
          "Laisser un workflow rouge sans le corriger : la branche principale doit rester verte en permanence.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "matrice",
    title: "Matrice : tester plusieurs versions",
    level: 3,
    intro:
      "Une seule définition de job, exécutée sur plusieurs versions : la matrice évite la duplication.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Matrice Node.js",
        code: `jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node: ["20", "22"]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node }}
      - run: npm ci && npm test`,
      },
      {
        kind: "list",
        items: [
          "`\${{ matrix.node }}` injecte la valeur courante : deux jobs tournent en parallèle, un par version.",
          "`fail-fast: false` (dans `strategy:`) laisse les autres combinaisons finir même si l'une échoue : utile pour voir l'étendue d'un problème.",
          "`include`/`exclude` ajustent les combinaisons (ex. ajouter Windows uniquement pour Node 20).",
          "Ne multipliez pas les axes sans raison : chaque combinaison consomme des minutes de runner.",
        ],
      },
    ],
  },
  {
    id: "expressions-contextes",
    title: "Expressions et contextes",
    level: 3,
    intro:
      "La syntaxe `\${{ }}` donne accès aux informations du run : qui, quoi, où.",
    blocks: [
      {
        kind: "table",
        headers: ["Contexte", "Exemple", "Usage"],
        rows: [
          ["`github`", "`github.sha`, `github.ref`, `github.actor`", "SHA du commit, branche, auteur du déclenchement"],
          ["`secrets`", "`secrets.API_TOKEN`", "Secrets du dépôt/environnement"],
          ["`vars`", "`vars.ENVIRONNEMENT`", "Variables non sensibles"],
          ["`matrix`", "`matrix.node`", "Valeur courante de la matrice"],
          ["`env`", "`env.NODE_ENV`", "Variables d'environnement du workflow"],
          ["`needs`", "`needs.build.outputs.image`", "Sorties des jobs précédents"],
        ],
      },
      {
        kind: "list",
        items: [
          "Les expressions supportent les fonctions (`contains()`, `startsWith()`, `format()`) : `\${{ contains(github.event.head_commit.message, '[skip ci]') }}`.",
          "N'injectez jamais `\${{ github.event.* }}` (contenu contrôlé par l'auteur de la PR) directement dans un script shell : risque d'injection. Passez par des variables d'environnement intermédiaires.",
        ],
      },
    ],
  },
  {
    id: "conditions-if",
    title: "Conditions (if:)",
    level: 3,
    intro:
      "Exécuter ou sauter des steps et jobs selon le contexte.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Conditions typiques",
        code: `steps:
  - name: Déployer en production
    if: github.ref == 'refs/heads/main'
    run: ./deploy.sh

  - name: Notifier en cas d'échec
    if: failure()
    run: ./notify.sh

  - name: Toujours nettoyer
    if: always()
    run: ./cleanup.sh`,
      },
      {
        kind: "list",
        items: [
          "`failure()` : exécute si un step précédent a échoué (notifications). `always()` : dans tous les cas (nettoyage). `cancelled()` : si le run a été annulé.",
          "`if:` au niveau du job saute tout le job : pratique pour « déployer uniquement sur main ».",
          "Attention : un job sauté (`skipped`) peut bloquer les protections de branche qui exigent son succès — utilisez des règles adaptées.",
        ],
      },
    ],
  },
  {
    id: "artifacts",
    title: "Artefacts : passer des fichiers entre jobs",
    level: 3,
    intro:
      "Les jobs tournent sur des machines différentes : les artefacts transfèrent les fichiers (builds, rapports).",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Uploader puis télécharger",
        code: `jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: dist
          path: dist/
      - run: ./deploy.sh`,
      },
      {
        kind: "list",
        items: [
          "Rétention configurable (`retention-days:`) : les artefacts expirent, ce ne sont pas des archives permanentes.",
          "Pour les images Docker, préférez le registre au artefact : les artefacts sont faits pour les fichiers, pas les images.",
          "Les rapports de tests et couvertures en artefacts rendent les échecs analysables sans relancer le pipeline.",
        ],
      },
    ],
  },
  {
    id: "cache",
    title: "Cache des dépendances",
    level: 3,
    intro:
      "Éviter de retélécharger les dépendances à chaque run : le gain le plus simple sur le temps de CI.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Cache npm",
        code: `- uses: actions/setup-node@v4
  with:
    node-version: "20"
    cache: "npm"`,
      },
      {
        kind: "list",
        items: [
          "`setup-node`/`setup-python` ont un cache intégré (`cache:`) : la solution la plus simple, clé basée sur le lockfile.",
          "Pour les cas avancés, `actions/cache@v4` avec une clé explicite : `key: \${{ hashFiles('**/package-lock.json') }}`.",
          "Le cache est par branche (la branche par défaut sert de repli) et a une taille limite : il s'évince automatiquement (LRU).",
          "Ne mettez en cache que ce qui est coûteux à reconstruire : dépendances, pas les builds eux-mêmes (sauf cas mesurés).",
        ],
      },
    ],
  },
  {
    id: "outputs",
    title: "Sorties de jobs (outputs)",
    level: 3,
    intro:
      "Transmettre des valeurs (pas des fichiers) entre jobs : version calculée, URL de déploiement.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Définir et consommer une sortie",
        code: `jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      version: \${{ steps.meta.outputs.version }}
    steps:
      - id: meta
        run: echo "version=1.4.2" >> "$GITHUB_OUTPUT"

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: ./deploy.sh \${{ needs.build.outputs.version }}`,
      },
      {
        kind: "text",
        text: "`$GITHUB_OUTPUT` est le mécanisme moderne (les anciennes commandes `::set-output` sont dépréciées). Les outputs portent des valeurs courtes ; pour des fichiers, utilisez les artefacts.",
      },
    ],
  },
  {
    id: "environnements-proteges",
    title: "Environnements et protection",
    level: 3,
    intro:
      "Staging, production : des environnements avec règles, secrets dédiés et approbations.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Job ciblant un environnement",
        code: `jobs:
  deploy-prod:
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://mon-app.example.com
    steps:
      - run: ./deploy.sh`,
      },
      {
        kind: "list",
        items: [
          "Créez les environnements dans `Settings > Environments` : `staging`, `production`, chacun avec ses secrets.",
          "Les protection rules exigent des reviewers avant déploiement : le garde-fou humain pour la production.",
          "L'URL de l'environnement s'affiche dans l'interface : traçabilité « quelle version est déployée où ».",
          "Les déploiements sont historisés par environnement : qui a déployé quoi et quand.",
        ],
      },
    ],
  },
  {
    id: "concurrency",
    title: "Concurrence : éviter les déploiements qui se chevauchent",
    level: 3,
    intro:
      "Deux pushes rapides ne doivent pas déployer deux versions en même temps.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Annuler les runs obsolètes",
        code: `concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true`,
      },
      {
        kind: "list",
        items: [
          "`cancel-in-progress: true` : un nouveau push annule le run précédent sur la même branche — fini les builds qui s'accumulent.",
          "Pour la production, préférez une file (sans annulation) : on ne veut pas annuler un déploiement prod en cours.",
          "Le groupe de concurrence par environnement (`production`) garantit un seul déploiement prod à la fois.",
        ],
      },
    ],
  },
  {
    id: "timeouts",
    title: "Timeouts",
    level: 3,
    intro:
      "Un job bloqué ne doit pas tourner indéfiniment : les timeouts protègent les minutes de runner.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Timeout par job",
        code: `jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - run: npm ci && npm test`,
      },
      {
        kind: "text",
        text: "Le défaut est de 6 heures : beaucoup trop pour la plupart des jobs. Fixez un timeout réaliste par job (10-30 min pour la CI classique) : un job qui dépasse son timeout a un problème, pas besoin de plus de temps.",
      },
    ],
  },
  {
    id: "reusable-workflows",
    title: "Workflows réutilisables",
    level: 3,
    intro:
      "Factoriser les pipelines partagés : un workflow appelé par plusieurs dépôts.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Workflow appelable (reusable)",
        code: `# .github/workflows/reusable-test.yml
on:
  workflow_call:
    inputs:
      node-version:
        required: false
        type: string
        default: "20"

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ inputs.node-version }}
      - run: npm ci && npm test`,
      },
      {
        kind: "code",
        language: "yaml",
        title: "Appel depuis un autre workflow",
        code: `jobs:
  test:
    uses: mon-org/workflows/.github/workflows/reusable-test.yml@main
    with:
      node-version: "22"`,
      },
      {
        kind: "list",
        items: [
          "Centralisez les pipelines standards dans un dépôt dédié : toute l'organisation bénéficie des améliorations.",
          "Les secrets se transmettent explicitement (`secrets: inherit` ou nommés) : pas de fuite implicite.",
          "Versionnez l'appel (`@main`, `@v1`) : `@main` suit les dernières modifications, un tag fige le comportement.",
        ],
      },
    ],
  },
  {
    id: "composite-actions",
    title: "Composite actions",
    level: 3,
    intro:
      "Regrouper des steps en une action réutilisable : plus léger qu'un workflow réutilisable.",
    blocks: [
      {
        kind: "list",
        items: [
          "Une composite action (`action.yml` avec `runs.using: composite`) enchaîne des steps `run:` : parfaite pour « installer + configurer + valider » répété partout.",
          "À publier dans un dépôt dédié ou localement (`.github/actions/mon-action`) selon la portée.",
          "Différence avec les workflows réutilisables : la composite action s'utilise comme une step dans un job, le workflow réutilisable comme un job entier.",
        ],
      },
    ],
  },
  {
    id: "docker-build-push",
    title: "Builder et pousser des images Docker",
    level: 3,
    intro:
      "Le pipeline type : build multi-plateforme, tag versionné, push vers GHCR.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Build et push vers GHCR",
        code: `jobs:
  image:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4

      - name: Connexion à GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Build et push
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: ghcr.io/\${{ github.repository }}:\${{ github.sha }}`,
      },
      {
        kind: "list",
        items: [
          "Le tag = le SHA du commit : traçabilité totale entre l'image et le code.",
          "Le `GITHUB_TOKEN` suffit pour pousser vers GHCR dans le même dépôt/organisation : aucun secret à créer.",
          "Ajoutez une étape de scan (Trivy) avant le push : une image vulnérable ne doit pas atteindre le registre.",
        ],
      },
    ],
  },
  {
    id: "oidc-cloud",
    title: "OIDC : déployer sur le cloud sans secret",
    level: 3,
    intro:
      "La fédération d'identité : GitHub s'authentifie auprès d'AWS/Azure/GCP sans credential stockée.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Authentification AWS via OIDC",
        code: `jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/github-deploy
          aws-region: eu-west-3
      - run: aws s3 sync dist/ s3://mon-bucket/`,
      },
      {
        kind: "list",
        items: [
          "Principe : GitHub émet un token OIDC que le cloud vérifie ; le rôle IAM fait confiance au dépôt/branches autorisés. Aucune clé d'accès à stocker ni à faire tourner.",
          "Configurez la relation de confiance côté cloud une fois (qui peut assumer le rôle), puis tous les workflows en bénéficient.",
          "Équivalents : `azure/login` avec federated credentials, `google-github-actions/auth` avec Workload Identity Federation.",
          "C'est la pratique recommandée actuelle : préférez-la systématiquement aux clés longue durée dans les secrets.",
        ],
      },
    ],
  },
  {
    id: "paths-filters",
    title: "Filtres de chemins",
    level: 3,
    intro:
      "Ne lancer un workflow que si les fichiers concernés ont changé.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Workflow backend uniquement",
        code: `on:
  push:
    paths:
      - "backend/**"
      - ".github/workflows/backend.yml"
  pull_request:
    paths:
      - "backend/**"`,
      },
      {
        kind: "text",
        text: "Indispensable en monorepo : le pipeline frontend ne tourne pas quand seul le backend a changé. Moins d'exécutions, feedback plus rapide, minutes économisées.",
      },
    ],
  },
  {
    id: "planification",
    title: "Planification (cron)",
    level: 3,
    intro:
      "Les workflows périodiques : tests nocturnes, vérifications, maintenance.",
    blocks: [
      {
        kind: "list",
        items: [
          "Syntaxe cron standard : `cron: \"0 3 * * *\"` = tous les jours à 3h UTC.",
          "Usages : suite E2E complète la nuit, vérification des liens morts, mise à jour des dépendances (avec Dependabot), sauvegardes.",
          "Les workflows planifiés ne tournent que sur la branche par défaut.",
          "Attention : un cron trop fréquent sur un pipeline lourd consomme le quota — planifiez selon le besoin réel.",
        ],
      },
    ],
  },
  {
    id: "dependabot",
    title: "Dependabot : les dépendances à jour",
    level: 3,
    intro:
      "Les mises à jour de dépendances automatisées, avec la CI qui valide.",
    blocks: [
      {
        kind: "list",
        items: [
          "Dependabot ouvre des PR automatiques pour les dépendances obsolètes (npm, Python, Docker, GitHub Actions elles-mêmes) : configurable dans `.github/dependabot.yml`.",
          "Chaque PR passe par votre CI : une mise à jour qui casse les tests ne sera pas mergée aveuglément.",
          "Les alertes de sécurité (Dependabot alerts) signalent les CVE dans vos dépendances : traitez les critiques en priorité.",
          "Limitez la fréquence (hebdomadaire suffit souvent) et regroupez pour ne pas noyer l'équipe sous les PR.",
        ],
      },
    ],
  },
  {
    id: "self-hosted",
    title: "Runners auto-hébergés",
    level: 3,
    intro:
      "Quand les runners GitHub ne suffisent pas : vos propres machines.",
    blocks: [
      {
        kind: "list",
        items: [
          "Cas d'usage : GPU, licences spécifiques, accès réseau privé, volumes de données importants, ou volume tel que l'auto-hébergé coûte moins cher.",
          "Installation : un agent léger sur la machine, enregistrée au niveau dépôt/organisation avec un token (`Settings > Actions > Runners`).",
          "Ciblez avec les labels : `runs-on: [self-hosted, linux, gpu]` route les jobs vers les bonnes machines.",
          "Sécurité : durcissez ces machines comme des serveurs de production — elles exécutent du code et ont accès au réseau interne. Préférez les runners éphémères (un job = une VM).",
          "Ne mélangez pas : les dépôts publics (code non fiable) ne doivent pas tourner sur les mêmes runners que l'interne.",
        ],
      },
    ],
  },
  {
    id: "securite-avancee",
    title: "Sécurité avancée des workflows",
    level: 3,
    intro:
      "Les attaques contre les pipelines sont réelles : les défenses à mettre en place.",
    blocks: [
      {
        kind: "list",
        items: [
          "Ne faites jamais `pull_request_target` avec un checkout du code de la PR sans comprendre le risque : ce déclencheur a accès aux secrets avec du code non reviewé.",
          "Ne passez pas `\${{ github.event.pull_request.title }}` (ou tout champ contrôlable) directement dans un `run:` : utilisez des variables d'environnement intermédiaires contre l'injection.",
          "Épinglez les actions tierces par SHA pour les workflows sensibles (déploiement, release).",
          "Limitez les permissions du `GITHUB_TOKEN` au minimum par job, et le défaut du dépôt en lecture seule.",
          "Auditez les changements de workflows comme du code critique : une modification malveillante du pipeline compromet tout.",
        ],
      },
    ],
  },
  {
    id: "starter-workflows",
    title: "Starter workflows et bonnes habitudes",
    level: 3,
    intro:
      "Démarrer vite sans partir de zéro, puis standardiser.",
    blocks: [
      {
        kind: "list",
        items: [
          "GitHub propose des starter workflows par langage/framework dans l'onglet Actions (« New workflow ») : un bon point de départ à adapter.",
          "Créez vos propres templates d'organisation (dépôt `.github`) : chaque nouveau projet démarre avec la CI standard.",
          "Standardisez les noms (`ci.yml`, `deploy.yml`, `release.yml`) : on retrouve le pipeline les yeux fermés dans n'importe quel dépôt.",
          "Documentez les workflows non triviaux en commentaire YAML : pourquoi cet ordre, pourquoi ce timeout, qui contacter.",
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
            label: "Le workflow ne se déclenche pas",
            value:
              "Vérifiez : le fichier est-il sur la branche par défaut (pour `schedule`) ? Le filtre `branches:`/`paths:` exclut-il le push ? La syntaxe `on:` est-elle valide ? L'onglet Actions montre les workflows désactivés.",
          },
          {
            label: "« Context access might be invalid »",
            value:
              "Un `\${{ secrets.X }}` ou `\${{ vars.Y }}` inexistant : le nom est mal orthographié ou le secret n'est pas défini au bon niveau (dépôt vs environnement).",
          },
          {
            label: "Permission denied du GITHUB_TOKEN",
            value:
              "Le token n'a pas la permission nécessaire : ajoutez-la dans `permissions:` du job (ex. `packages: write`, `pull-requests: write`).",
          },
          {
            label: "Job « skipped » inattendu",
            value:
              "Un `if:` toujours faux, un `needs` sur un job sauté, ou une matrice vide. Vérifiez la condition avec les valeurs réelles du contexte.",
          },
          {
            label: "Échec seulement en CI, jamais en local",
            value:
              "Version d'outil différente (épinglez avec setup-*), variable d'environnement manquante, ou dépendance système absente du runner.",
          },
          {
            label: "Workflow très lent",
            value:
              "Pas de cache, tests séquentiels, image Docker reconstruite de zéro : cachez les dépendances, parallélisez les jobs, utilisez le cache de couches Docker.",
          },
          {
            label: "« This job is not configured for OIDC »",
            value:
              "Il manque `permissions: id-token: write` sur le job : sans elle, GitHub ne délivre pas de token OIDC.",
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
      "La méthode quand le workflow résiste.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Isoler la step",
            detail:
              "Repérez la première step rouge : tout ce qui suit est une conséquence. Lisez son log depuis le début.",
          },
          {
            title: "Activer le debug",
            detail:
              "Secret `ACTIONS_STEP_DEBUG=true` : logs détaillés des exécutions, variables et évaluations d'expressions.",
          },
          {
            title: "Rejouer en local",
            detail:
              "L'outil `act` exécute les workflows localement avec Docker : itérez sans pousser. (Fidélité approximative mais très utile pour la logique.)",
          },
          {
            title: "Simplifier",
            detail:
              "Commentez temporairement les steps non essentielles pour isoler le problème, sur une branche de test.",
          },
          {
            title: "Vérifier les changements récents",
            detail:
              "Le workflow, les actions utilisées (`@v4` → mise à jour ?), les dépendances : « ça marchait hier » se bisecte.",
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
      "Les habitudes des workflows sains et maintenables.",
    blocks: [
      {
        kind: "list",
        items: [
          "Nommez workflows, jobs et steps explicitement : les logs sont la documentation d'exploitation.",
          "Épinglez les versions d'actions (`@v4` minimum, SHA pour le sensible).",
          "Permissions minimales par job ; défaut du dépôt en lecture seule.",
          "Secrets dans le coffre, jamais en clair ; OIDC vers le cloud quand possible.",
          "Testez les changements de workflow sur branche avant main ; protégez main avec la CI verte exigée.",
          "Cachez les dépendances, parallélisez les jobs, fixez des timeouts réalistes.",
          "Factorisez : workflows réutilisables et composite actions pour les motifs répétés.",
          "Nettoyez les vieux runs et artefacts : quotas et lisibilité.",
        ],
      },
    ],
  },
  {
    id: "projets-realistes",
    title: "Projets réalistes : 3 niveaux",
    level: 3,
    intro:
      "Trois projets progressifs pour maîtriser GitHub Actions.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — CI complète d'un projet réel",
        fields: [
          {
            label: "Objectif",
            value:
              "Workflow CI sur un de vos projets : lint, tests avec matrice de versions, build, artefacts, badge README, protection de branche.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "YAML (`on`, `jobs`, `steps`), marketplace (checkout, setup-*), cache, `gh run watch`, badges.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Le feedback rapide : lire les logs, itérer sur le YAML, et ce que « main verte » change au quotidien.",
          },
          {
            label: "Difficulté",
            value: "Débutant — un week-end.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — CD vers un VPS ou un cloud",
        fields: [
          {
            label: "Objectif",
            value:
              "Pipeline de déploiement : build de l'image → scan → push GHCR → déploiement (SSH ou cloud via OIDC), environnements staging/prod avec approbation.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "docker/build-push-action, secrets d'environnement, `needs`/`if`, OIDC, concurrency, rollback manuel.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Le déploiement continu : promouvoir des artefacts versionnés avec des garde-fous à chaque étape.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — deux à trois semaines.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Workflows réutilisables d'organisation",
        fields: [
          {
            label: "Objectif",
            value:
              "Dépôt central de workflows réutilisables et de composite actions : CI standard, release automatisée (changelog, tags), politiques de sécurité (permissions, pinning).",
          },
          {
            label: "Compétences mobilisées",
            value:
              "`workflow_call`, inputs/secrets, composite actions, OIDC multi-comptes, documentation.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Le CI/CD à l'échelle : standardiser les pipelines de toute une organisation sans les rigidifier.",
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
          "Documentation GitHub Actions — https://docs.github.com/actions",
          "Référence de la syntaxe des workflows — https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax",
          "Marketplace des actions — https://github.com/marketplace?type=actions",
          "Guides de déploiement (Azure, AWS, GCP...) — https://docs.github.com/actions/use-cases-and-examples/deploying",
          "Sécurité renforcée (hardening) — https://docs.github.com/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "GitHub Actions maîtrisé : les prolongements naturels.",
    blocks: [
      {
        kind: "fields",
        title: "Les prochaines étapes",
        fields: [
          {
            label: "GitLab CI (`gitlab-ci`)",
            value:
              "L'autre grande implémentation : comparer les deux éclaire les concepts (stages, runners, environnements) au-delà de la syntaxe.",
          },
          {
            label: "CI/CD (`cicd`) en profondeur",
            value:
              "Stratégies de déploiement, DORA, feature flags : la théorie qui rend les workflows vraiment efficaces.",
          },
          {
            label: "Registres (`container-registry`) et Docker (`docker`)",
            value:
              "Le pivot build → déploiement : images versionnées, scannées, signées, promues entre environnements.",
          },
          {
            label: "Terraform (`terraform`) et clouds (`aws`, `azure`, `gcp`)",
            value:
              "Déployer l'infrastructure elle-même depuis les workflows : OIDC, `what-if`/`plan` sur les PR, apply au merge.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le signe que vous maîtrisez GitHub Actions : vos workflows sont factorisés, vos permissions minimales, vos déploiements se font sans secret stocké — et tout est réversible.",
      },
    ],
  },
  {
    id: "attestations-artefacts",
    title: "Attestations d'artefacts",
    level: 3,
    intro:
      "Prouver cryptographiquement qu'un artefact vient de votre workflow : la provenance signée.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Attester un build",
        code: `      - uses: actions/attest-build-provenance@v2
        with:
          subject-path: dist/mon-app.tar.gz`,
      },
      {
        kind: "list",
        items: [
          "`actions/attest-build-provenance` génère une attestation SLSA signée : quel workflow, quel commit, quelles sources ont produit l'artefact.",
          "Vérifiable avec la CLI GitHub : `gh attestation verify dist/mon-app.tar.gz --repo mon-org/mon-app` — quiconque peut contrôler la provenance.",
          "Fonctionne sans secret stocké : la signature utilise l'identité OIDC du workflow (Sigstore).",
          "Combinez avec les environnements protégés : seuls les builds de la branche par défaut produisent des attestations « release ».",
        ],
      },
    ],
  },
  {
    id: "codeql",
    title: "CodeQL : l'analyse de code native",
    level: 3,
    intro:
      "Le SAST intégré à GitHub : détecter les vulnérabilités dans le code à chaque PR.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Workflow CodeQL",
        code: `name: CodeQL
on:
  push:
    branches: [main]
  pull_request:
  schedule:
    - cron: '0 6 * * 1'
jobs:
  analyze:
    runs-on: ubuntu-latest
    permissions:
      security-events: write
    steps:
      - uses: actions/checkout@v4
      - uses: github/codeql-action/init@v3
        with:
          languages: javascript-typescript
      - uses: github/codeql-action/analyze@v3`,
      },
      {
        kind: "list",
        items: [
          "Activation en quelques lignes : init → (build si langage compilé) → analyze. Les alertes remontent dans l'onglet Security.",
          "Le scan planifié hebdomadaire attrape les vulnérabilités découvertes après coup dans les dépendances et patterns.",
          "Langages supportés : JavaScript/TypeScript, Python, Java, C#, Go, C/C++, Ruby, Swift, Kotlin.",
          "Règles personnalisées possibles en CodeQL (requêtes sur le graphe du code) pour les patterns spécifiques à votre codebase.",
        ],
      },
    ],
  },
];

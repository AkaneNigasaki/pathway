import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Playwright : de zéro à des suites E2E
 * professionnelles. 3 niveaux d'information (Aperçu / Pratique / Approfondi)
 * avec divulgation progressive. Tous les textes supportent le code inline
 * entre backticks. Commandes toujours expliquées : label, commande,
 * pourquoi, vérification.
 */
export const LEARNING_PLAYWRIGHT: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Playwright, ce qu'il automatise et pourquoi il est devenu la référence des tests end-to-end.",
    blocks: [
      {
        kind: "text",
        text: "Playwright est un framework open source développé par Microsoft pour automatiser les navigateurs web. Il pilote de vrais navigateurs — Chromium, Firefox et WebKit — exactement comme le ferait un utilisateur : clics, saisie, navigation, vérifications. On l'utilise principalement pour écrire des tests end-to-end (E2E) qui valident un parcours complet dans l'application.",
      },
      {
        kind: "text",
        text: "Pourquoi Playwright plutôt qu'un autre outil : il est conçu dès le départ pour la fiabilité. Les sélecteurs sont résilients (rôles d'accessibilité, texte visible), l'attente des éléments est automatique (auto-waiting), et chaque exécution produit des traces exploitables (captures, vidéos, trace viewer). Le résultat : des tests E2E qui échouent quand il y a un vrai bug, pas à cause d'un timing.",
      },
      {
        kind: "text",
        text: "Au-delà des tests, Playwright sert aussi au web scraping, à la génération de captures d'écran, aux tests de régression visuelle et à l'automatisation de tâches répétitives dans le navigateur. Mais son usage principal — et celui de cette page — reste le test end-to-end.",
      },
    ],
  },
  {
    id: "tests-e2e-positionnement",
    title: "Où se situent les tests E2E",
    level: 1,
    intro:
      "Les tests E2E ne remplacent pas les autres tests : ils occupent le sommet de la pyramide des tests.",
    blocks: [
      {
        kind: "diagram",
        title: "La pyramide des tests",
        lines: [
          "              /\\",
          "             /E2E\\          Peu nombreux, lents, coûteux",
          "            /------\\       (Playwright : parcours critiques)",
          "           /Intégr. \\      Nombre moyen",
          "          /----------\\     (API, composants assemblés)",
          "         / Unitaires  \\    Nombreux, rapides, peu coûteux",
          "        /--------------\\   (Vitest, Jest : fonctions, logique)",
        ],
      },
      {
        kind: "text",
        text: "Principe : on teste la logique métier avec beaucoup de tests unitaires rapides, les interactions entre modules avec des tests d'intégration, et on réserve les tests E2E aux parcours critiques (inscription, paiement, connexion). Un test E2E coûte cher à écrire et à exécuter : chaque test Playwright doit donc justifier son existence en couvrant un risque réel.",
      },
      {
        kind: "list",
        items: [
          "Unitaire : une fonction, isolée, exécutée en millisecondes.",
          "Intégration : plusieurs modules ensemble (ex. API + base de données de test).",
          "E2E : l'application complète, dans un vrai navigateur, comme un utilisateur.",
          "Playwright excelle au sommet de la pyramide, mais ne remplace pas la base.",
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
      "Ce qu'il faut maîtriser avant d'écrire des tests Playwright utiles.",
    blocks: [
      {
        kind: "fields",
        title: "Connaissances requises",
        fields: [
          {
            label: "JavaScript / TypeScript",
            value:
              "Les tests Playwright s'écrivent en JS/TS avec `async`/`await` partout. Il faut être à l'aise avec les promesses : chaque action navigateur est asynchrone.",
          },
          {
            label: "HTML et CSS",
            value:
              "Pour cibler les éléments (sélecteurs) et comprendre la structure de la page testée. Les rôles ARIA (`button`, `textbox`, `heading`) sont les sélecteurs recommandés.",
          },
          {
            label: "npm et Node.js",
            value:
              "Installer Playwright, lancer les tests, gérer les dépendances. Node.js 18 ou supérieur est requis par les versions récentes.",
          },
          {
            label: "Bases du test logiciel",
            value:
              "Savoir ce qu'est une assertion, un cas de test, un setup/teardown. La compétence `testing` de la roadmap couvre ces fondamentaux.",
          },
        ],
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Installer Playwright dans un projet : le framework, les navigateurs, et la configuration initiale.",
    blocks: [
      {
        kind: "command",
        label: "Initialiser Playwright dans le projet",
        command: "npm init playwright@latest",
        why: "L'assistant officiel crée l'arborescence (`tests/`, `playwright.config.ts`), installe le paquet `@playwright/test` et propose d'installer les navigateurs. C'est la voie recommandée : elle produit une configuration saine dès le départ au lieu d'un assemblage manuel.",
        verify: "ls tests playwright.config.ts",
      },
      {
        kind: "command",
        label: "Installer les navigateurs",
        command: "npx playwright install",
        why: "Playwright télécharge ses propres builds de Chromium, Firefox et WebKit, indépendants des navigateurs installés sur la machine. Ces versions sont figées et testées avec la version de Playwright : les tests se comportent de la même façon partout, y compris en CI.",
        verify: "npx playwright install --dry-run",
      },
      {
        kind: "command",
        label: "Installer aussi les dépendances système (Linux/CI)",
        command: "npx playwright install --with-deps",
        why: "Sur un système Linux minimal (conteneur, runner CI), les navigateurs ont besoin de bibliothèques système (polices, codecs, dépendances graphiques). `--with-deps` les installe via le gestionnaire de paquets. Sans elles, les navigateurs refusent de démarrer avec des erreurs obscures.",
        verify: "npx playwright install --dry-run --with-deps",
      },
      {
        kind: "text",
        text: "Après l'installation, `npx playwright test` lance un test d'exemple généré par l'assistant : la boucle complète fonctionne en quelques minutes.",
      },
    ],
  },
  {
    id: "premier-test",
    title: "Votre premier test en 10 minutes",
    level: 2,
    intro:
      "Écrire, lancer et comprendre un test Playwright minimal, étape par étape.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le fichier de test",
            detail:
              "Dans `tests/`, créez `premier.spec.ts`. L'extension `.spec.ts` est la convention : le runner Playwright la détecte automatiquement.",
          },
          {
            title: "Écrire le test",
            detail:
              "Importez `test` et `expect` depuis `@playwright/test`. Chaque test reçoit une `page` : l'onglet navigateur automatisé. `page.goto()` navigue, les `getBy*` ciblent des éléments, `expect` vérifie.",
          },
          {
            title: "Lancer le test",
            detail:
              "`npx playwright test` exécute tous les tests en headless (sans fenêtre). En cas de succès, le rapport indique le nombre de tests passés.",
          },
          {
            title: "Voir le rapport",
            detail:
              "`npx playwright show-report` ouvre le rapport HTML généré : chaque test y est détaillé avec captures et traces en cas d'échec.",
          },
        ],
      },
      {
        kind: "code",
        language: "typescript",
        title: "tests/premier.spec.ts",
        code: `import { test, expect } from "@playwright/test";\n\ntest("la page d'accueil affiche son titre", async ({ page }) => {\n  await page.goto("https://playwright.dev");\n  await expect(page.getByRole("heading", { name: "Playwright" })).toBeVisible();\n});`,
      },
    ],
  },
  {
    id: "executer-les-tests",
    title: "Exécuter les tests : les commandes du quotidien",
    level: 2,
    intro:
      "Les variantes de `npx playwright test` à connaître pour le développement et le débogage.",
    blocks: [
      {
        kind: "command",
        label: "Lancer toute la suite (headless)",
        command: "npx playwright test",
        why: "Le mode par défaut : navigateurs sans interface graphique, exécution parallèle, sortie console concise. C'est ce que la CI exécute.",
      },
      {
        kind: "command",
        label: "Voir les navigateurs pendant le test",
        command: "npx playwright test --headed",
        why: "Affiche les fenêtres des navigateurs pendant l'exécution. Utile pour comprendre visuellement ce que fait un test qui se comporte bizarrement.",
      },
      {
        kind: "command",
        label: "Mode interface de débogage",
        command: "npx playwright test --ui",
        why: "Ouvre l'UI Mode : on rejoue chaque test pas à pas, on inspecte chaque action, on voit les captures à chaque étape. L'outil de débogage le plus productif au quotidien.",
      },
      {
        kind: "command",
        label: "Ne lancer qu'un fichier, voire un seul test",
        command: "npx playwright test tests/panier.spec.ts -g \"ajoute un article\"",
        why: "Pendant le développement d'un test, inutile de relancer toute la suite. On cible un fichier, et `-g` filtre par le titre du test (expression régulière). Gain de temps considérable.",
      },
      {
        kind: "command",
        label: "Déboguer pas à pas avec l'inspecteur",
        command: "npx playwright test --debug",
        why: "Ouvre le Playwright Inspector : chaque action peut être exécutée manuellement, les sélecteurs sont testés en direct, les points d'arrêt fonctionnent. À réserver aux cas vraiment bloquants.",
      },
    ],
  },
  {
    id: "selecteurs-essentiels",
    title: "Sélecteurs : cibler les bons éléments",
    level: 2,
    intro:
      "La règle d'or : cibler comme un utilisateur perçoit la page, pas comme le DOM est construit.",
    blocks: [
      {
        kind: "fields",
        title: "Les sélecteurs recommandés, par priorité",
        fields: [
          {
            label: "`getByRole()`",
            value:
              "Premier choix. Cible par rôle d'accessibilité : `getByRole('button', { name: 'Se connecter' })`. Résilient aux changements de CSS et de structure, et il pousse à une bonne accessibilité.",
          },
          {
            label: "`getByLabel()`",
            value:
              "Pour les champs de formulaire : `getByLabel('Adresse e-mail')`. Suit l'association label/input, comme un lecteur d'écran.",
          },
          {
            label: "`getByPlaceholder()` / `getByText()`",
            value:
              "Pratiques quand il n'y a ni rôle ni label explicite. `getByText('Bienvenue')` cible un texte visible — attention aux textes dynamiques.",
          },
          {
            label: "`getByTestId()`",
            value:
              "Le filet de sécurité : `getByTestId('bouton-panier')` cible l'attribut `data-testid`. Stable à 100 %, mais demande d'ajouter des attributs dans le code applicatif.",
          },
        ],
      },
      {
        kind: "text",
        text: "À éviter : les sélecteurs CSS fragiles (`div > div:nth-child(3) > span`) et les XPath générés. Ils cassent au moindre changement de mise en page et rendent la suite impossible à maintenir.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Ordre de préférence en pratique",
        code: `// 1. Rôle + nom accessible (préféré)\nawait page.getByRole("button", { name: "Ajouter au panier" }).click();\n\n// 2. Label de formulaire\nawait page.getByLabel("Adresse e-mail").fill("ada@example.com");\n\n// 3. Test id quand rien d'autre n'est stable\nawait page.getByTestId("total-panier").textContent();`,
      },
    ],
  },
  {
    id: "assertions-essentielles",
    title: "Assertions : vérifier, pas seulement cliquer",
    level: 2,
    intro:
      "Un test sans assertion ne prouve rien. Playwright fournit des assertions qui attendent automatiquement.",
    blocks: [
      {
        kind: "fields",
        title: "Les assertions les plus utilisées",
        fields: [
          {
            label: "`toBeVisible()`",
            value:
              "L'élément est affiché à l'écran. L'assertion réessaie jusqu'au timeout si ce n'est pas encore le cas — pas besoin de `waitFor` manuel.",
          },
          {
            label: "`toHaveText()` / `toContainText()`",
            value:
              "Vérifie le contenu textuel exact ou partiel. `toHaveText` exige l'égalité stricte (espaces normalisés) ; `toContainText` est plus souple.",
          },
          {
            label: "`toHaveURL()` / `toHaveTitle()`",
            value:
              "Vérifie l'URL ou le titre de la page après navigation. Accepte des expressions régulières : `toHaveURL(/.*confirmation/)`.",
          },
          {
            label: "`toHaveValue()` / `toBeChecked()`",
            value:
              "Pour les formulaires : valeur d'un champ, état d'une case à cocher ou d'un bouton radio.",
          },
          {
            label: "`toHaveCount()`",
            value:
              "Nombre d'éléments correspondants : `await expect(page.getByRole('listitem')).toHaveCount(3)`.",
          },
        ],
      },
      {
        kind: "text",
        text: "Point clé : ces assertions sont « web-first » — elles attendent que la condition devienne vraie (jusqu'au timeout configuré) au lieu d'échouer immédiatement. C'est ce qui élimine la plupart des tests instables sans aucun `sleep` manuel.",
      },
    ],
  },
  {
    id: "configuration-de-base",
    title: "Le fichier `playwright.config.ts`",
    level: 2,
    intro:
      "Un seul fichier pilote toute la suite : navigateurs, timeouts, parallélisme, rapports.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "playwright.config.ts minimal et sain",
        code: `import { defineConfig, devices } from "@playwright/test";\n\nexport default defineConfig({\n  testDir: "./tests",\n  fullyParallel: true,\n  retries: process.env.CI ? 2 : 0,\n  workers: process.env.CI ? 1 : undefined,\n  reporter: "html",\n  use: {\n    baseURL: "http://localhost:3000",\n    trace: "on-first-retry",\n    screenshot: "only-on-failure",\n  },\n  projects: [\n    { name: "chromium", use: { ...devices["Desktop Chrome"] } },\n    { name: "firefox", use: { ...devices["Desktop Firefox"] } },\n  ],\n  webServer: {\n    command: "npm run dev",\n    url: "http://localhost:3000",\n    reuseExistingServer: !process.env.CI,\n  },\n});`,
      },
      {
        kind: "fields",
        title: "Options à comprendre",
        fields: [
          {
            label: "`projects`",
            value:
              "Chaque projet = une configuration de navigateur. Le même test tourne sur Chromium puis Firefox : la matrice de compatibilité sans effort.",
          },
          {
            label: "`use.baseURL`",
            value:
              "Préfixe de toutes les navigations : `page.goto('/panier')` suffit. Évite de répéter l'URL complète dans chaque test.",
          },
          {
            label: "`webServer`",
            value:
              "Playwright démarre lui-même l'application avant les tests et attend qu'elle réponde. Fini les scripts shell qui lancent le serveur à la main.",
          },
          {
            label: "`retries` / `trace` / `screenshot`",
            value:
              "En CI : 2 tentatives, trace enregistrée à la première relance, capture uniquement en cas d'échec. Le bon équilibre entre diagnostic et performance.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-de-base",
    title: "Déboguer un test qui échoue",
    level: 2,
    intro:
      "La méthode systématique quand un test passe en local mais échoue en CI — ou l'inverse.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Lire le message d'erreur en entier",
            detail:
              "Playwright affiche le sélecteur utilisé, l'action tentée et ce qui a bloqué (élément masqué, détaché du DOM, timeout). 80 % des diagnostics sont dans ce message.",
          },
          {
            title: "Ouvrir le rapport HTML",
            detail:
              "`npx playwright show-report` : chaque échec montre la capture d'écran au moment de l'erreur et l'historique des actions. On voit littéralement ce que le navigateur affichait.",
          },
          {
            title: "Rejouer en UI Mode",
            detail:
              "`npx playwright test --ui` puis cliquer sur le test en échec : on rejoue action par action et on inspecte l'état de la page à chaque étape.",
          },
          {
            title: "Ouvrir la trace",
            detail:
              "Si `trace` est activé, le rapport propose d'ouvrir la trace dans le Trace Viewer : timeline complète, DOM à chaque instant, requêtes réseau, console. C'est l'équivalent d'une boîte noire.",
          },
        ],
      },
    ],
  },
  {
    id: "rapport-html",
    title: "Le rapport HTML",
    level: 2,
    intro:
      "Le rapport est la sortie la plus utile de la suite : il raconte chaque exécution.",
    blocks: [
      {
        kind: "command",
        label: "Ouvrir le rapport de la dernière exécution",
        command: "npx playwright show-report",
        why: "Sert le dossier `playwright-report/` dans le navigateur : liste des tests, durées, pièces jointes (captures, traces, vidéos) par test. En CI, ce dossier est généralement publié comme artefact.",
      },
      {
        kind: "text",
        text: "Contenu d'un rapport utile : pour chaque test en échec, la capture d'écran au moment de l'erreur, la trace complète si activée, et les logs console de la page. Un rapport bien configuré permet de diagnostiquer un échec CI sans relancer quoi que ce soit en local.",
      },
    ],
  },
  {
    id: "workflow-developpement",
    title: "Le workflow quotidien",
    level: 2,
    intro:
      "La boucle de travail recommandée quand on écrit ou maintient des tests E2E.",
    blocks: [
      {
        kind: "diagram",
        title: "Boucle de développement d'un test",
        lines: [
          "Écrire le test (ou le générer avec codegen)",
          "     │",
          "     ▼",
          "npx playwright test <fichier> --ui   (itérer vite)",
          "     │",
          "     ├── échec → corriger sélecteur / attente / appli",
          "     │",
          "     ▼",
          "npx playwright test                   (suite complète)",
          "     │",
          "     ▼",
          "CI : tous navigateurs, rapport en artefact",
        ],
      },
      {
        kind: "list",
        items: [
          "On développe un test à la fois, en UI Mode, contre l'application locale.",
          "On ne committe un test que s'il passe de façon répétée (3 exécutions de suite).",
          "La CI exécute toute la suite sur tous les navigateurs configurés.",
          "Un test instable (flaky) est un bug : on le corrige ou on le met en quarantaine, on ne l'ignore pas.",
        ],
      },
    ],
  },
  {
    id: "erreurs-debutants",
    title: "Erreurs classiques des débutants",
    level: 2,
    intro:
      "Les pièges dans lesquels presque tout le monde tombe en commençant avec Playwright.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Symptôme", "Correction"],
        rows: [
          ["Oublier `await`", "Le test passe mais ne fait rien, ou échoue aléatoirement", "Chaque action Playwright retourne une promesse : toujours `await`"],
          ["`page.waitForTimeout()` partout", "Tests lents et toujours instables", "Utiliser les assertions web-first qui attendent la condition"],
          ["Sélecteurs CSS fragiles", "Tests qui cassent à chaque changement de design", "Privilégier `getByRole`, `getByLabel`, `getByTestId`"],
          ["Tester les détails d'implémentation", "Suite impossible à maintenir", "Tester ce que l'utilisateur voit et fait, pas le DOM interne"],
          ["Un seul navigateur en local, trois en CI", "Échecs surprises en CI", "Tester régulièrement sur tous les projets configurés"],
          ["Données de test partagées", "Tests qui s'influencent mutuellement", "Isoler les données par test (fixtures, API de setup)"],
        ],
      },
    ],
  },
  {
    id: "editeurs-outils",
    title: "Éditeurs et outils",
    level: 2,
    intro:
      "L'écosystème autour de Playwright pour écrire des tests plus vite.",
    blocks: [
      {
        kind: "fields",
        title: "Outils du quotidien",
        fields: [
          {
            label: "Extension VS Code (Microsoft)",
            value:
              "L'extension officielle « Playwright Test for VSCode » : lancer les tests depuis l'éditeur, déboguer avec points d'arrêt, générer des sélecteurs en survolant la page.",
          },
          {
            label: "UI Mode",
            value:
              "`npx playwright test --ui` : l'outil intégré pour développer et déboguer, sans extension.",
          },
          {
            label: "Trace Viewer",
            value:
              "https://trace.playwright.dev : ouvrir une trace localement ou en ligne, sans installer quoi que ce soit.",
          },
          {
            label: "Codegen",
            value:
              "`npx playwright codegen` : enregistre les actions effectuées dans un navigateur et génère le code du test. Excellent point de départ, à nettoyer ensuite.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "architecture-interne",
    title: "Architecture : browser, context, page",
    level: 3,
    intro:
      "Le modèle mental qui explique tout le reste : trois niveaux d'isolation emboîtés.",
    blocks: [
      {
        kind: "diagram",
        title: "Hiérarchie des objets Playwright",
        lines: [
          "Browser (le navigateur : coûteux à démarrer)",
          " └── BrowserContext (profil isolé : cookies, storage)",
          " │    └── Page (un onglet : là où les actions ont lieu)",
          " │    └── Page (un autre onglet du même contexte)",
          " └── BrowserContext (un second profil, totalement isolé)",
          "      └── Page",
          "",
          "Dans les tests : chaque test reçoit un contexte + une page",
          "neufs et isolés, créés par la fixture `page`.",
        ],
      },
      {
        kind: "text",
        text: "Conséquence pratique : deux tests ne partagent jamais ni cookies, ni localStorage, ni cache — chaque test part d'un navigateur vierge. C'est ce qui rend les tests Playwright isolés par construction, sans effort. Le revers : créer un contexte a un coût, d'où l'intérêt de l'authentification par `storageState` réutilisé (voir la section dédiée) plutôt que de se reconnecter dans chaque test.",
      },
    ],
  },
  {
    id: "locator-api",
    title: "L'API Locator : ne jamais stocker d'élément",
    level: 3,
    intro:
      "La différence fondamentale entre Playwright et les anciens outils d'automatisation.",
    blocks: [
      {
        kind: "text",
        text: "Un `Locator` n'est pas un élément du DOM : c'est une recette pour retrouver un élément au moment où l'action s'exécute. Si la page se recharge ou si le DOM change entre la création du locator et son utilisation, Playwright résout à nouveau le sélecteur. C'est pour cela qu'il n'y a quasiment jamais d'erreur d'élément « périmé » (stale element) avec Playwright.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Locator : résolution paresseuse",
        code: `// Le locator est créé immédiatement, résolu à chaque usage\nconst bouton = page.getByRole("button", { name: "Valider" });\n\nawait bouton.click();      // résolu ici\nawait bouton.click();      // résolu à nouveau ici (DOM peut avoir changé)\n\n// Chainer : affiner sans perdre la paresse\nconst dialogue = page.getByRole("dialog");\nawait dialogue.getByRole("button", { name: "Confirmer" }).click();`,
      },
      {
        kind: "text",
        text: "Règle : on manipule des locators, jamais d'éléments résolus (`elementHandle`). Les element handles existent pour des cas rares (interopérabilité) ; les utiliser par défaut, c'est renoncer à l'auto-waiting et à la résolution paresseuse.",
      },
    ],
  },
  {
    id: "auto-waiting",
    title: "L'auto-waiting : comment Playwright attend",
    level: 3,
    intro:
      "Comprendre précisément ce que Playwright vérifie avant chaque action — pour savoir quand il faut intervenir manuellement.",
    blocks: [
      {
        kind: "text",
        text: "Avant chaque action (clic, saisie, sélection), Playwright vérifie automatiquement que l'élément est : attaché au DOM, visible, stable (pas d'animation en cours), capable de recevoir des événements (pas recouvert), et activé. Ces vérifications sont réessayées jusqu'au timeout. C'est l'auto-waiting, et c'est la raison principale de la fiabilité des tests.",
      },
      {
        kind: "list",
        items: [
          "Attaché : l'élément existe dans le DOM au moment de l'action.",
          "Visible : ni `display: none`, ni taille nulle, ni masqué.",
          "Stable : sa boîte englobante ne bouge plus (fin des animations/transitions).",
          "Recevant les événements : aucun élément ne le recouvre au point de clic.",
          "Activé : pas d'attribut `disabled` au moment du clic.",
        ],
      },
      {
        kind: "text",
        text: "Quand intervenir manuellement : quand l'action dépend d'un état applicatif invisible dans le DOM (ex. attendre qu'une requête réseau précise soit terminée). Dans ce cas, `page.waitForResponse()` ou les assertions web-first sur un état visible sont préférables à tout `waitForTimeout`.",
      },
    ],
  },
  {
    id: "selecteurs-avances",
    title: "Sélecteurs avancés",
    level: 3,
    intro:
      "Quand les sélecteurs simples ne suffisent pas : moteurs de sélection et combinaisons.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Techniques de sélection avancée",
        code: `// Cibler par texte avec correspondance exacte\npage.getByText("Conditions générales", { exact: true });\n\n// Filtrer un locator par un autre\npage.getByRole("listitem").filter({ hasText: "En stock" });\npage.getByRole("listitem").filter({ has: page.getByRole("button") });\n\n// Nième élément (éviter si possible, mais parfois nécessaire)\npage.getByRole("listitem").nth(2);\npage.getByRole("listitem").first();\npage.getByRole("listitem").last();\n\n// CSS en dernier recours, avec :visible et :has\npage.locator("css=.carte-produit:visible");\npage.locator(".panier:has(.article-en-promo)");\n\n// XPath : uniquement pour ce que CSS ne peut pas exprimer\npage.locator("xpath=//button[contains(@class, 'valider')]");`,
      },
      {
        kind: "text",
        text: "Ordre de préférence : rôle/label/texte d'abord, `filter({ has })` pour affiner, `nth`/`first`/`last` quand l'ordre est stable, CSS en dernier recours, XPath en tout dernier. Chaque niveau descendu est un niveau de fragilité ajouté.",
      },
    ],
  },
  {
    id: "assertions-web-first",
    title: "Assertions web-first en détail",
    level: 3,
    intro:
      "Pourquoi `expect(locator).toBeVisible()` est fondamentalement différent d'un `assert` classique.",
    blocks: [
      {
        kind: "text",
        text: "Une assertion web-first ne vérifie pas une valeur instantanée : elle décrit un état désiré et réessaie jusqu'à ce qu'il soit atteint ou que le timeout expire. `await expect(page.getByText('Commande confirmée')).toBeVisible()` attend que le texte apparaisse — pendant un chargement, une transition, un appel API. Sans cela, chaque test aurait besoin de sleeps manuels fragiles.",
      },
      {
        kind: "fields",
        title: "Familles d'assertions",
        fields: [
          {
            label: "État (`toBeVisible`, `toBeHidden`, `toBeEnabled`, `toBeChecked`)",
            value: "L'état interactif des éléments. La base de la plupart des vérifications.",
          },
          {
            label: "Contenu (`toHaveText`, `toContainText`, `toHaveValue`, `toHaveAttribute`)",
            value: "Ce que l'élément affiche ou contient. `toHaveText` avec un tableau vérifie une liste entière dans l'ordre.",
          },
          {
            label: "Page (`toHaveURL`, `toHaveTitle`)",
            value: "L'état de la page après navigation. Supportent les regex et les glob patterns.",
          },
          {
            label: "Négation (`not`)",
            value: "`await expect(locator).not.toBeVisible()` attend la disparition — utile pour les spinners et les modales qui se ferment.",
          },
        ],
      },
      {
        kind: "text",
        text: "À ne pas faire : `expect(await locator.textContent()).toBe('...')`. En résolvant la valeur avant l'assertion, on perd le réessai automatique — c'est exactement le pattern qui produit des tests instables.",
      },
    ],
  },
  {
    id: "fixtures",
    title: "Fixtures : le système d'injection de Playwright",
    level: 3,
    intro:
      "Les fixtures sont la façon propre de partager du setup entre tests : page, contexte, données.",
    blocks: [
      {
        kind: "text",
        text: "Chaque argument d'un test (`{ page }`, `{ context }`, `{ browser }`) est une fixture : une valeur construite avant le test et nettoyée après. Playwright fournit les fixtures navigateur ; on définit les siennes pour le setup applicatif (utilisateur connecté, données de test, page pré-remplie).",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Fixture custom : utilisateur connecté",
        code: `import { test as base, expect } from "@playwright/test";\n\ntype MesFixtures = { pageConnectee: Page };\n\nexport const test = base.extend<MesFixtures>({\n  pageConnectee: async ({ page }, use) => {\n    await page.goto("/connexion");\n    await page.getByLabel("E-mail").fill("ada@example.com");\n    await page.getByLabel("Mot de passe").fill("secret");\n    await page.getByRole("button", { name: "Se connecter" }).click();\n    await expect(page.getByText("Bonjour Ada")).toBeVisible();\n    await use(page); // le test s'exécute ici\n    // nettoyage éventuel après use()\n  },\n});\n\ntest("le profil affiche le nom", async ({ pageConnectee }) => {\n  await pageConnectee.goto("/profil");\n  // ... déjà connecté\n});`,
      },
      {
        kind: "text",
        text: "Avantage sur un simple `beforeEach` : la fixture est paresseuse (construite seulement si le test la demande), typée, et composable. Pour l'authentification à grande échelle, préférer toutefois le `storageState` (section dédiée), plus rapide que de rejouer le formulaire de connexion dans chaque test.",
      },
    ],
  },
  {
    id: "hooks-cycle-de-vie",
    title: "Hooks : `beforeEach`, `afterEach`, `beforeAll`",
    level: 3,
    intro:
      "Quand utiliser les hooks plutôt que les fixtures — et leurs limites.",
    blocks: [
      {
        kind: "fields",
        title: "Les quatre hooks",
        fields: [
          {
            label: "`test.beforeEach`",
            value: "Exécuté avant chaque test du fichier : navigation vers la page de départ, réinitialisation légère. Simple et lisible pour du setup uniforme.",
          },
          {
            label: "`test.afterEach`",
            value: "Nettoyage après chaque test. Rarement nécessaire : les fixtures nettoient déjà le navigateur. Utile pour du nettoyage applicatif (supprimer des données créées).",
          },
          {
            label: "`test.beforeAll` / `test.afterAll`",
            value: "Une seule fois par fichier : création de données coûteuses partagées. Attention : pas d'accès à la fixture `page` (un seul contexte partagé via `browser`), donc réservé au setup via API.",
          },
          {
            label: "`test.describe`",
            value: "Regroupe des tests et permet des hooks scoped au groupe. La structure recommandée pour organiser une suite.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle pratique : `beforeEach` pour le setup simple et uniforme, fixtures pour le setup réutilisable entre fichiers, `beforeAll` uniquement pour ce qui est vraiment coûteux et sûr à partager (avec nettoyage en `afterAll`).",
      },
    ],
  },
  {
    id: "projects-navigateurs",
    title: "Projects : la matrice navigateurs",
    level: 3,
    intro:
      "Un test écrit une fois, exécuté sur Chromium, Firefox et WebKit.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Configurer les projects",
        code: `projects: [\n  { name: "chromium", use: { ...devices["Desktop Chrome"] } },\n  { name: "firefox", use: { ...devices["Desktop Firefox"] } },\n  { name: "webkit", use: { ...devices["Desktop Safari"] } },\n  { name: "mobile", use: { ...devices["Pixel 7"] } },\n],`,
      },
      {
        kind: "command",
        label: "Lancer un seul project",
        command: "npx playwright test --project=chromium",
        why: "Pendant le développement, on itère sur un seul navigateur pour aller vite. La matrice complète est réservée à la CI (ou à une vérification avant merge).",
      },
      {
        kind: "text",
        text: "Les `devices` prédéfinis décrivent viewport, user-agent, tactile ou non, et autres paramètres : `devices[\"iPhone 14\"]` simule un mobile sans émulateur. Les différences de comportement entre moteurs (surtout WebKit) justifient à elles seules la matrice : un test qui passe partout est un test qui prouve la compatibilité réelle.",
      },
    ],
  },
  {
    id: "authentification-storage-state",
    title: "Authentification : `storageState`",
    level: 3,
    intro:
      "Se connecter une fois, réutiliser la session dans tous les tests.",
    blocks: [
      {
        kind: "text",
        text: "Rejouer le formulaire de connexion dans chaque test est lent et fragile. Le pattern recommandé : un test de setup effectue la connexion une fois et sauvegarde l'état de stockage (cookies, localStorage) dans un fichier ; tous les autres tests chargent ce fichier.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Setup d'authentification réutilisable",
        code: `// auth.setup.ts : joué une fois\nimport { test as setup, expect } from "@playwright/test";\n\nsetup("authentification", async ({ page }) => {\n  await page.goto("/connexion");\n  await page.getByLabel("E-mail").fill("ada@example.com");\n  await page.getByLabel("Mot de passe").fill("secret");\n  await page.getByRole("button", { name: "Se connecter" }).click();\n  await expect(page.getByText("Bonjour Ada")).toBeVisible();\n  await page.context().storageState({ path: "auth.json" });\n});\n\n// playwright.config.ts\nprojects: [\n  { name: "setup", testMatch: /.*\\.setup\\.ts/ },\n  {\n    name: "chromium",\n    use: { ...devices["Desktop Chrome"], storageState: "auth.json" },\n    dependencies: ["setup"],\n  },\n],`,
      },
      {
        kind: "text",
        text: "`dependencies: [\"setup\"]` garantit que l'authentification est rejouée avant les tests qui en dépendent. Le fichier `auth.json` ne doit jamais être committé s'il contient de vrais identifiants : il est généré à chaque exécution.",
      },
    ],
  },
  {
    id: "interception-reseau",
    title: "Interception réseau : mocker les API",
    level: 3,
    intro:
      "Contrôler les réponses réseau pour tester les cas limites sans dépendre d'un backend.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Mocker une réponse API",
        code: `test("affiche une erreur si l'API échoue", async ({ page }) => {\n  await page.route("**/api/panier", async (route) => {\n    await route.fulfill({\n      status: 500,\n      contentType: "application/json",\n      body: JSON.stringify({ erreur: "Panne simulée" }),\n    });\n  });\n  await page.goto("/panier");\n  await expect(page.getByText("Une erreur est survenue")).toBeVisible();\n});`,
      },
      {
        kind: "fields",
        title: "Les trois usages de `page.route`",
        fields: [
          {
            label: "`route.fulfill()`",
            value: "Remplacer la réponse par des données contrôlées : erreurs 500, listes vides, cas limites. Le test ne dépend plus du backend réel.",
          },
          {
            label: "`route.abort()`",
            value: "Bloquer une requête (images, analytics, polices tierces) pour accélérer les tests ou simuler une ressource indisponible.",
          },
          {
            label: "`route.continue()`",
            value: "Observer ou modifier la requête avant de la laisser passer : ajouter un header, logger les appels pour les assertions.",
          },
        ],
      },
      {
        kind: "text",
        text: "Limite à connaître : un test qui mocke tout ne teste plus l'intégration réelle. Les mocks servent aux cas limites et à l'isolation ; les parcours critiques doivent aussi être testés contre le vrai backend, au moins en CI.",
      },
    ],
  },
  {
    id: "tests-api",
    title: "Tester les API avec `request`",
    level: 3,
    intro:
      "Playwright inclut un client HTTP : tester l'API directement, sans navigateur.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Test API pur",
        code: `import { test, expect } from "@playwright/test";\n\ntest("l'API retourne l'utilisateur", async ({ request }) => {\n  const reponse = await request.get("/api/utilisateurs/1");\n  expect(reponse.ok()).toBeTruthy();\n  const corps = await reponse.json();\n  expect(corps.nom).toBe("Ada");\n});`,
      },
      {
        kind: "text",
        text: "Usage principal : préparer les données de test via l'API (créer un utilisateur, vider un panier) avant de lancer le test E2E dans le navigateur. C'est beaucoup plus rapide que de cliquer à travers l'interface pour mettre en place l'état initial. La fixture `request` partage les cookies du contexte quand on l'utilise avec `storageState`.",
      },
    ],
  },
  {
    id: "captures-traces-videos",
    title: "Captures, vidéos et traces",
    level: 3,
    intro:
      "Les trois artefacts de diagnostic : quand les activer et ce qu'ils coûtent.",
    blocks: [
      {
        kind: "table",
        headers: ["Artefact", "Contenu", "Coût", "Réglage recommandé"],
        rows: [
          ["Screenshot", "Image PNG au moment de l'échec", "Faible", "`screenshot: 'only-on-failure'`"],
          ["Vidéo", "Enregistrement complet du test", "Moyen (stockage)", "`video: 'retain-on-failure'`"],
          ["Trace", "Timeline : DOM, réseau, console, actions", "Moyen", "`trace: 'on-first-retry'`"],
        ],
      },
      {
        kind: "text",
        text: "La trace est l'artefact le plus précieux : elle permet de rejouer l'échec image par image, avec le DOM inspectable à chaque instant, les requêtes réseau et la console. S'ouvre avec le Trace Viewer intégré au rapport HTML ou sur trace.playwright.dev.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Capture manuelle dans un test",
        code: `// Capture d'un élément précis, pour documentation ou comparaison\nawait page.getByTestId("facture").screenshot({ path: "facture.png" });\n\n// Capture pleine page (scroll assemblé)\nawait page.screenshot({ path: "page.png", fullPage: true });`,
      },
    ],
  },
  {
    id: "codegen",
    title: "Codegen : générer un test en cliquant",
    level: 3,
    intro:
      "L'enregistreur intégré qui transforme des actions manuelles en code Playwright.",
    blocks: [
      {
        kind: "command",
        label: "Lancer l'enregistreur",
        command: "npx playwright codegen https://example.com",
        why: "Ouvre un navigateur et une fenêtre Codegen : chaque action (clic, saisie, navigation) est traduite en code Playwright en temps réel. Idéal pour découvrir les bons sélecteurs sur une application inconnue.",
        verify: "npx playwright codegen --help",
      },
      {
        kind: "text",
        text: "Le code généré est un brouillon, pas un test fini : il faut le nettoyer (supprimer les pauses, nommer le test, ajouter des assertions, remplacer les sélecteurs fragiles par des rôles). Codegen accélère l'écriture, il ne remplace pas la réflexion sur ce que le test doit prouver.",
      },
    ],
  },
  {
    id: "mode-ui-approfondi",
    title: "UI Mode en détail",
    level: 3,
    intro:
      "L'outil de développement interactif : plus qu'un simple lanceur.",
    blocks: [
      {
        kind: "list",
        items: [
          "Rejouer un test action par action avec la timeline visuelle.",
          "Voir la capture d'écran et le DOM à chaque étape, avant/après chaque action.",
          "Filtrer les tests par nom, ne relancer que les échecs (bouton dédié).",
          "Basculer en mode « pick locator » : cliquer sur un élément de la page pour obtenir son meilleur sélecteur.",
          "Attacher le navigateur en mode headed pour observer en direct.",
        ],
      },
      {
        kind: "text",
        text: "En pratique, l'UI Mode remplace la plupart des usages de `--debug` et de l'inspecteur : il est plus rapide à ouvrir et montre plus de contexte. C'est l'outil à ouvrir en premier quand un test se comporte bizarrement.",
      },
    ],
  },
  {
    id: "parallelisme-sharding",
    title: "Parallélisme et sharding",
    level: 3,
    intro:
      "Exécuter vite en local, répartir en CI : les deux leviers de vitesse.",
    blocks: [
      {
        kind: "fields",
        title: "Les réglages de parallélisme",
        fields: [
          {
            label: "`fullyParallel: true`",
            value: "Les tests d'un même fichier s'exécutent en parallèle (un worker par test). Par défaut, les tests d'un fichier partagent un worker séquentiellement. À activer quand les tests sont indépendants.",
          },
          {
            label: "`workers`",
            value: "Nombre de processus parallèles. En local : la moitié des cœurs environ. En CI : 1 par défaut dans beaucoup de templates, à ajuster selon le runner.",
          },
          {
            label: "Sharding",
            value: "`npx playwright test --shard=1/3` : divise la suite en 3 parts exécutées sur 3 machines CI en parallèle. Indispensable quand la suite dépasse quelques minutes.",
          },
          {
            label: "`test.describe.configure({ mode: 'serial' })`",
            value: "Force l'exécution séquentielle d'un groupe quand l'ordre compte vraiment (rare, mais nécessaire pour certains workflows multi-étapes).",
          },
        ],
      },
      {
        kind: "text",
        text: "Condition du parallélisme : l'indépendance totale des tests (données isolées, pas d'état partagé). Un test qui dépend de l'ordre d'exécution est un test à réparer, pas à séquentialiser.",
      },
    ],
  },
  {
    id: "retries-et-flaky",
    title: "Retries et tests instables",
    level: 3,
    intro:
      "Les retries masquent les symptômes ; il faut aussi traiter la cause.",
    blocks: [
      {
        kind: "text",
        text: "Un test « flaky » (instable) passe et échoue sans changement de code. Les causes typiques : attente insuffisante d'un état asynchrone, données partagées entre tests, dépendance à un service tiers lent, ou animation non stabilisée. `retries: 2` en CI absorbe le bruit résiduel, mais un test qui échoue régulièrement au premier essai doit être investigué, pas simplement relancé.",
      },
      {
        kind: "steps",
        steps: [
          {
            title: "Reproduire",
            detail: "Lancer le test en boucle : `npx playwright test --repeat-each=10 <fichier>`. Si l'échec est reproductible, c'est un vrai bug du test ou de l'application.",
          },
          {
            title: "Observer",
            detail: "Relancer en `--headed` ou en UI Mode : que se passe-t-il visuellement au moment de l'échec ? Un spinner ? Une requête lente ? Un élément qui bouge ?",
          },
          {
            title: "Corriger la cause",
            detail: "Remplacer le sleep par une assertion web-first sur l'état attendu, isoler les données, mocker le service tiers lent.",
          },
          {
            title: "Vérifier",
            detail: "Relancer en boucle après correction. Un test corrigé doit passer 10 fois de suite avant d'être considéré comme stable.",
          },
        ],
      },
    ],
  },
  {
    id: "timeouts",
    title: "Les timeouts : trois niveaux",
    level: 3,
    intro:
      "Comprendre quel timeout s'applique où évite les tests qui abandonnent trop tôt — ou trop tard.",
    blocks: [
      {
        kind: "fields",
        title: "La hiérarchie des timeouts",
        fields: [
          {
            label: "Timeout d'action (5 s par défaut)",
            value: "`locator.click({ timeout: 10000 })` : durée maximale d'une action et de son auto-waiting. À augmenter ponctuellement pour les opérations lentes connues.",
          },
          {
            label: "Timeout d'assertion (5 s par défaut)",
            value: "`expect(locator).toBeVisible({ timeout: 10000 })` : durée du réessai d'une assertion web-first. Réglable globalement via `expect: { timeout }` dans la config.",
          },
          {
            label: "Timeout de test (30 s par défaut)",
            value: "`test.setTimeout(60000)` ou `timeout` dans la config : durée maximale d'un test entier, setup inclus. Un test qui le dépasse systématiquement est trop gros : le découper.",
          },
        ],
      },
      {
        kind: "text",
        text: "Anti-pattern : augmenter les timeouts pour faire passer un test instable. Un timeout plus long ne rend pas un test fiable, il le rend seulement plus lent à échouer. La fiabilité vient des bonnes attentes, pas des longues attentes.",
      },
    ],
  },
  {
    id: "reporters",
    title: "Reporters : choisir sa sortie",
    level: 3,
    intro:
      "Le reporter `html` n'est pas le seul : chaque contexte a sa sortie adaptée.",
    blocks: [
      {
        kind: "fields",
        title: "Les reporters utiles",
        fields: [
          {
            label: "`html`",
            value: "Le rapport interactif complet. Le choix par défaut pour le développement et les artefacts CI.",
          },
          {
            label: "`list`",
            value: "Sortie console ligne par ligne. Le plus lisible en CI quand on surveille les logs en direct.",
          },
          {
            label: "`junit`",
            value: "Format XML standard : `['junit', { outputFile: 'resultats.xml' }]` — compris par Jenkins, GitLab, Azure DevOps pour afficher les résultats.",
          },
          {
            label: "`json`",
            value: "Sortie machine pour traitement ultérieur (dashboards custom, analyse de tendances).",
          },
          {
            label: "`github`",
            value: "Annote directement les pull requests GitHub avec les échecs. Pratique sur ce seul hébergeur.",
          },
        ],
      },
      {
        kind: "code",
        language: "typescript",
        title: "Combiner plusieurs reporters",
        code: `reporter: [\n  ["html", { open: "never" }],\n  ["junit", { outputFile: "resultats/junit.xml" }],\n  ["list"],\n],`,
      },
    ],
  },
  {
    id: "ci-github-actions",
    title: "Intégration CI : GitHub Actions",
    level: 3,
    intro:
      "Le pipeline type pour exécuter la suite Playwright à chaque pull request.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: ".github/workflows/e2e.yml",
        code: `name: Tests E2E\non: [push, pull_request]\njobs:\n  e2e:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - run: npm ci\n      - run: npx playwright install --with-deps\n      - run: npx playwright test\n      - uses: actions/upload-artifact@v4\n        if: always()\n        with:\n          name: rapport-playwright\n          path: playwright-report/`,
      },
      {
        kind: "text",
        text: "Points clés : `npm ci` pour une installation reproductible, `--with-deps` pour les dépendances système des navigateurs, et le rapport publié en artefact même en cas d'échec (`if: always()`) pour diagnostiquer sans accès au runner.",
      },
    ],
  },
  {
    id: "page-object-model",
    title: "Page Object Model",
    level: 3,
    intro:
      "Le pattern d'organisation qui garde une suite lisible quand elle grandit.",
    blocks: [
      {
        kind: "text",
        text: "Principe : chaque page (ou composant majeur) de l'application est représentée par une classe qui encapsule ses sélecteurs et ses actions. Les tests appellent des méthodes métier (`panier.ajouterArticle('Clavier')`) au lieu de manipuler des sélecteurs bruts. Quand l'interface change, on modifie une classe, pas cinquante tests.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "pages/panier.page.ts",
        code: `import { Page, Locator, expect } from "@playwright/test";\n\nexport class PanierPage {\n  readonly page: Page;\n  readonly total: Locator;\n\n  constructor(page: Page) {\n    this.page = page;\n    this.total = page.getByTestId("total-panier");\n  }\n\n  async aller() {\n    await this.page.goto("/panier");\n  }\n\n  async ajouterArticle(nom: string) {\n    await this.page.getByRole("button", { name: \`Ajouter \${nom}\` }).click();\n  }\n\n  async verifierTotal(montant: string) {\n    await expect(this.total).toHaveText(montant);\n  }\n}`,
      },
      {
        kind: "text",
        text: "Nuance : pour les petites suites, les page objects sont du sur-ingenierie — des fonctions helpers suffisent. Le pattern devient rentable quand plusieurs tests partagent les mêmes parcours.",
      },
    ],
  },
  {
    id: "strategie-data-testid",
    title: "Stratégie `data-testid`",
    level: 3,
    intro:
      "Quand et comment ajouter des attributs de test dans le code applicatif.",
    blocks: [
      {
        kind: "text",
        text: "Les rôles et labels couvrent 80 % des cas, mais certains éléments n'ont ni l'un ni l'autre : totaux calculés, badges dynamiques, zones sans texte stable. Pour ceux-là, `data-testid` est la solution propre — à condition d'une convention d'équipe.",
      },
      {
        kind: "list",
        items: [
          "Convention de nommage : `data-testid=\"panier-total\"`, kebab-case, préfixé par le domaine quand pertinent.",
          "Réservé aux éléments sans ancrage sémantique : ne pas en mettre partout « au cas où ».",
          "Les `data-testid` ne doivent jamais influencer le style ou le comportement : ce sont des métadonnées de test.",
          "En production, ils restent dans le DOM (les retirer complexifie le build pour un gain nul) — ce n'est pas une information sensible.",
        ],
      },
    ],
  },
  {
    id: "regression-visuelle",
    title: "Régression visuelle",
    level: 3,
    intro:
      "Détecter les changements visuels non voulus, au pixel près.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Comparaison de capture",
        code: `test("la page d'accueil n'a pas régressé visuellement", async ({ page }) => {\n  await page.goto("/");\n  await expect(page).toHaveScreenshot("accueil.png");\n});`,
      },
      {
        kind: "text",
        text: "Fonctionnement : la première exécution enregistre la capture de référence ; les suivantes comparent pixel par pixel, avec une tolérance configurable. Toute différence (même un décalage d'un pixel) fait échouer le test. C'est puissant mais exigeant : polices, animations et contenus dynamiques (dates, publicités) doivent être stabilisés, sinon chaque exécution produit des faux positifs.",
      },
      {
        kind: "list",
        items: [
          "Stabiliser avant de comparer : désactiver les animations, figer les dates, mocker les contenus dynamiques.",
          "Comparer des composants isolés plutôt que des pages entières quand c'est possible.",
          "Les captures de référence sont versionnées avec le code et régénérées consciemment.",
        ],
      },
    ],
  },
  {
    id: "accessibilite-tests",
    title: "Tester l'accessibilité",
    level: 3,
    intro:
      "Playwright et les rôles ARIA : les tests E2E comme filet d'accessibilité.",
    blocks: [
      {
        kind: "text",
        text: "Un effet secondaire vertueux des sélecteurs par rôle : si `getByRole('button', { name: 'Valider' })` ne trouve rien, c'est souvent que le bouton n'est pas accessible (div cliquable sans rôle, nom inaccessible). Les tests Playwright bien écrits détectent donc indirectement les régressions d'accessibilité.",
      },
      {
        kind: "list",
        items: [
          "Privilégier systématiquement `getByRole` : chaque test devient un mini-audit.",
          "Vérifier la navigation au clavier sur les parcours critiques (`page.keyboard.press('Tab')` puis assertion sur l'élément focalisé).",
          "Tester les messages d'erreur des formulaires : ils doivent être associés à leurs champs (rôle `alert` ou `aria-describedby`).",
          "Pour un audit automatisé complet, des outils dédiés d'analyse statique complètent les tests E2E — les deux approches se combinent.",
        ],
      },
    ],
  },
  {
    id: "trace-viewer-approfondi",
    title: "Trace Viewer en détail",
    level: 3,
    intro:
      "Exploiter pleinement la trace : bien plus qu'une simple vidéo.",
    blocks: [
      {
        kind: "list",
        items: [
          "Timeline : chaque action est horodatée ; on voit exactement où le temps est passé.",
          "Instantanés DOM : à chaque action, le DOM complet est capturé et inspectable (sélecteurs, styles calculés).",
          "Onglet réseau : toutes les requêtes avec leurs temps de réponse — idéal pour repérer l'appel lent qui fait échouer le test.",
          "Console : les logs et erreurs JS de la page au moment de l'échec.",
          "Actions : la liste des actions Playwright avec leurs paramètres et leur résultat.",
        ],
      },
      {
        kind: "text",
        text: "Astuce : on peut ouvrir une trace sans le rapport, directement avec `npx playwright show-trace trace.zip`. Pratique quand un collègue partage une trace d'échec CI.",
      },
    ],
  },
  {
    id: "debugging-flaky-avance",
    title: "Diagnostiquer les tests instables",
    level: 3,
    intro:
      "Méthode complète pour traquer un test qui échoue une fois sur dix.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Quantifier l'instabilité",
            detail: "`npx playwright test --repeat-each=20 <fichier>` : mesurer le taux d'échec réel. En dessous de 5 %, c'est du bruit environnemental ; au-dessus, c'est un problème du test.",
          },
          {
            title: "Isoler la variable",
            detail: "Le test échoue-t-il seul ? En parallèle ? Après un autre test précis ? L'ordre d'exécution révèle souvent une dépendance cachée (données partagées, état global).",
          },
          {
            title: "Examiner la trace d'un échec",
            detail: "Dans le Trace Viewer : quelle action a timeouté ? L'élément était-il présent mais masqué ? Une requête réseau a-t-elle mis 8 secondes ? Le diagnostic visuel bat les hypothèses.",
          },
          {
            title: "Corriger la cause racine",
            detail: "Assertion web-first sur l'état réellement attendu, isolation des données, mock du service lent. Jamais de `waitForTimeout` ajouté « pour stabiliser ».",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques-pro",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro:
      "Ce qui distingue une suite E2E qui dure d'une suite abandonnée après trois mois.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un test = un comportement utilisateur, avec un titre qui le décrit en langage métier.",
          "Indépendance totale : chaque test crée ses données et ne dépend d'aucun autre.",
          "Vitesse : mocker ce qui est lent et non pertinent (analytics, services tiers), tester le reste pour de vrai.",
          "Sélecteurs résilients : rôles et labels d'abord, `data-testid` en filet, jamais de CSS structurel.",
          "Assertions sur l'état visible, pas sur l'implémentation.",
          "La suite complète doit tenir en quelques minutes : au-delà, elle ne sera plus lancée.",
          "Traiter chaque test instable comme un bug bloquant de la suite.",
          "Versionner les captures de référence et les régénérer consciemment.",
          "En CI : sharding si nécessaire, rapport en artefact, notifications sur échec uniquement.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes et solutions",
    level: 3,
    intro:
      "Les messages d'erreur que l'on rencontre vraiment, et leur résolution.",
    blocks: [
      {
        kind: "table",
        headers: ["Message / symptôme", "Cause probable", "Solution"],
        rows: [
          ["`locator.click: Timeout exceeded`", "L'élément n'est jamais devenu actionnable", "Vérifier visibilité/stabilité dans le rapport ; l'élément existe-t-il vraiment à cet instant ?"],
          ["`strict mode violation`", "Le sélecteur correspond à plusieurs éléments", "Affiner avec `filter()`, `nth()`, ou un nom plus précis"],
          ["`Target page, context or browser has been closed`", "La page a été fermée pendant le test", "Souvent une navigation inattendue ou un `page.close()` prématuré"],
          ["`Executable doesn't exist`", "Navigateurs non installés", "`npx playwright install` (ou `--with-deps` en CI Linux)"],
          ["Tests verts en local, rouges en CI", "Différence d'environnement", "Vitesse réseau, résolution d'écran, polices manquantes, fuseau horaire"],
          ["`waiting for getByRole(...)` puis timeout", "Le rôle ou le nom accessible est faux", "Vérifier avec l'UI Mode (pick locator) quel rôle le navigateur expose réellement"],
        ],
      },
    ],
  },
  {
    id: "projet-parcours-achat",
    title: "Projet : tester un parcours d'achat",
    level: 3,
    intro:
      "Le projet canonique : couvrir le tunnel d'achat d'une boutique de bout en bout.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Cartographier le parcours",
            detail: "Accueil → fiche produit → ajout panier → tunnel → confirmation. Identifier les pages et les états critiques (panier vide, stock épuisé, paiement refusé).",
          },
          {
            title: "Préparer les données via API",
            detail: "Créer les produits et l'utilisateur de test avec la fixture `request` plutôt qu'en cliquant : le setup prend des millisecondes.",
          },
          {
            title: "Écrire les tests par étape",
            detail: "Un test par étape du tunnel, chacun vérifiant l'état visible (total du panier, récapitulatif, page de confirmation).",
          },
          {
            title: "Mocker le paiement",
            detail: "Le prestataire de paiement réel est mocké avec `page.route` : tester le succès, le refus, et l'erreur réseau — trois scénarios impossibles à tester de façon déterministe autrement.",
          },
          {
            title: "Stabiliser et industrialiser",
            detail: "Répéter chaque test 10 fois, configurer la matrice navigateurs, brancher la CI avec rapport en artefact.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-suite-ci-complete",
    title: "Projet : suite E2E complète en CI",
    level: 3,
    intro:
      "Passer de quelques tests locaux à une suite qui protège chaque merge.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Sélectionner les parcours critiques",
            detail: "Connexion, inscription, parcours principal de l'application : 5 à 10 tests maximum pour commencer. La couverture exhaustive vient après.",
          },
          {
            title: "Mettre en place l'authentification partagée",
            detail: "Test de setup + `storageState` : une seule connexion pour toute la suite.",
          },
          {
            title: "Configurer les projects",
            detail: "Chromium, Firefox, WebKit, plus un project mobile si l'application est responsive.",
          },
          {
            title: "Écrire le workflow CI",
            detail: "Installation avec `--with-deps`, exécution, rapport en artefact, sharding si la suite dépasse 5 minutes.",
          },
          {
            title: "Définir la politique d'échec",
            detail: "Échec E2E = merge bloqué. Retry automatique limité à 2. Tout test instable récurrent est mis en quarantaine puis réparé sous une semaine.",
          },
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
          {
            label: "Guide Playwright",
            value: "playwright.dev : le guide complet, des premiers pas aux sujets avancés, avec des exemples pour chaque langage supporté.",
          },
          {
            label: "Référence API",
            value: "playwright.dev/docs/api : la référence exhaustive des classes (Page, Locator, BrowserContext) et de leurs méthodes.",
          },
          {
            label: "Trace Viewer en ligne",
            value: "trace.playwright.dev : ouvrir et partager des traces sans installation.",
          },
          {
            label: "Dépôt GitHub",
            value: "microsoft/playwright : issues, discussions et release notes pour suivre les nouveautés.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les projets de cette page, en commençant par le parcours d'achat.",
          "Communauté : les exemples officiels du dépôt et les conférences (les talks des mainteneurs sont d'excellentes sources).",
          "Complément : la compétence `vitest` pour les tests unitaires — les deux outils couvrent ensemble toute la pyramide.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Playwright maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir les tests unitaires avec la compétence `vitest` : couvrir la logique métier en complément des parcours E2E.",
          "Industrialiser avec `cicd` et `github-actions` : qualité gates, sharding, rapports publiés à chaque PR.",
          "Élargir au web avec `typescript` : des tests typés et des page objects robustes.",
          "Conteneuriser l'exécution avec `docker` : des runners E2E reproductibles partout.",
          "Revenir à la roadmap : valider Playwright et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

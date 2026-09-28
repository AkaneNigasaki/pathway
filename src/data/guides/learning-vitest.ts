import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Vitest : du premier test au setup CI professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_VITEST: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Vitest, pourquoi il existe et quelle est sa relation avec Vite.",
    blocks: [
      {
        kind: "text",
        text: "Vitest est le runner de tests pensé pour l'écosystème Vite : rapide, API compatible Jest, mode watch et interface de debug soignée. Il exécute vos tests unitaires et d'intégration en réutilisant le pipeline de transformation de Vite, ce qui le rend quasi instantané sur les projets Vite.",
      },
      {
        kind: "text",
        text: "Pourquoi Vitest existe : les runners historiques (Jest, Mocha) ont été conçus avant les bundlers modernes. Ils transforment le code avec leur propre pipeline, souvent lent et déconnecté de la configuration du projet. Vitest partage la configuration et les plugins de Vite : ce que vous testez est transformé exactement comme ce qui sera construit, et le démarrage est quasi immédiat.",
      },
      {
        kind: "text",
        text: "Relation avec Vite : Vitest n'est pas un concurrent de Vite, c'est son complément. Un projet Vite peut ajouter Vitest en une dépendance et tester son code avec la même configuration (`vite.config.ts`), les mêmes alias et les mêmes plugins.",
      },
    ],
  },
  {
    id: "vitest-en-bref",
    title: "Vitest en 30 secondes",
    level: 1,
    intro: "L'essentiel à retenir avant d'aller plus loin.",
    blocks: [
      {
        kind: "diagram",
        title: "Le rôle de Vitest dans la chaîne de développement",
        lines: [
          "Votre code (.ts, .tsx, .vue…)",
          "     │",
          "     ▼",
          "Fichiers *.test.ts (describe / it / expect)",
          "     │",
          "     ▼",
          "Vitest",
          "     │",
          "     ├── Transforme via Vite (esbuild, rapide)",
          "     ├── Exécute en workers parallèles",
          "     ├── Mode watch : relance à chaque sauvegarde",
          "     └── Verdict : passés / échoués + couverture",
        ],
      },
      {
        kind: "list",
        items: [
          "API compatible Jest : `describe`, `it` / `test`, `expect` — la courbe d'apprentissage est quasi nulle si vous venez de Jest.",
          "ESM natif : les modules ES fonctionnent sans transpilation préalable.",
          "Watch mode par défaut avec `npx vitest` : les tests se relancent à chaque modification.",
          "Interface graphique optionnelle (`@vitest/ui`) pour explorer les résultats dans le navigateur.",
          "Couverture de code intégrée (fournisseur V8 ou Istanbul).",
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
      "Ce qu'il faut maîtriser avant d'écrire des tests utiles avec Vitest.",
    blocks: [
      {
        kind: "fields",
        title: "Bases nécessaires",
        fields: [
          {
            label: "JavaScript / TypeScript",
            value:
              "Fonctions, modules (`import` / `export`), promesses et `async`/`await`. Les tests sont du code comme un autre : sans ces bases, on teste à l'aveugle.",
          },
          {
            label: "Node.js et npm",
            value:
              "Installer des dépendances, lancer des scripts `package.json`. Vitest s'installe comme n'importe quelle dépendance de développement.",
          },
          {
            label: "Modules ES",
            value:
              "Comprendre `import` / `export` : Vitest les supporte nativement, et les mocks (`vi.mock`) s'appuient sur le système de modules.",
          },
          {
            label: "Un projet Vite (recommandé)",
            value:
              "Vitest brille dans un projet Vite existant, mais il fonctionne aussi seul avec un simple `vitest.config.ts`. La configuration partagée (alias, plugins) est le vrai gain.",
          },
        ],
      },
      {
        kind: "text",
        text: "Chaque prérequis est cliquable dans la roadmap : si un point est fragile, consolidez-le d'abord, puis revenez ici. Un test écrit sans comprendre les modules ou l'asynchrone produit des faux positifs.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Ajouter Vitest à un projet, en comprenant ce que fait chaque commande.",
    blocks: [
      {
        kind: "command",
        label: "Installer Vitest en dépendance de développement",
        command: "npm install -D vitest",
        why: "Installe Vitest dans `devDependencies` : il ne sert qu'au développement et aux tests, jamais dans le code livré en production. Le `-D` (alias de `--save-dev`) l'enregistre dans `package.json` pour que toute l'équipe installe la même version.",
        verify: "npx vitest --version",
      },
      {
        kind: "text",
        text: "`npx vitest --version` exécute le binaire installé localement dans `node_modules/.bin/` et affiche la version. Si la commande échoue, l'installation n'a pas abouti ou vous n'êtes pas à la racine du projet.",
      },
    ],
  },
  {
    id: "premier-test",
    title: "Premier test",
    level: 2,
    intro:
      "Écrire une fonction, la tester, lancer Vitest : le cycle complet en trois fichiers.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer la fonction à tester",
            detail:
              "Créez `src/sum.ts` avec une fonction simple : `export function sum(a: number, b: number) { return a + b; }`. Tester commence toujours par du code isolable : une fonction pure est le cas idéal.",
          },
          {
            title: "Créer le fichier de test à côté",
            detail:
              "Créez `src/sum.test.ts` (même dossier, suffixe `.test.ts`). Vitest détecte automatiquement les fichiers `*.test.ts` et `*.spec.ts`, sans configuration.",
          },
          {
            title: "Lancer en une passe",
            detail:
              "`npx vitest run` exécute tous les tests une fois puis quitte. C'est le mode à utiliser pour vérifier, et celui qu'utilisera la CI.",
          },
        ],
      },
      {
        kind: "code",
        language: "typescript",
        title: "src/sum.test.ts",
        code: `import { describe, it, expect } from "vitest";\nimport { sum } from "./sum";\n\ndescribe("sum", () => {\n  it("additionne deux nombres", () => {\n    expect(sum(2, 3)).toBe(5);\n  });\n\n  it("gère les nombres négatifs", () => {\n    expect(sum(-1, 1)).toBe(0);\n  });\n});`,
      },
      {
        kind: "text",
        text: "Lecture du test : `describe` regroupe des tests liés, `it` déclare un cas (synonyme : `test`), `expect(...).toBe(5)` affirme le résultat attendu. Si l'affirmation est fausse, Vitest signale le test comme échoué avec le détail attendu / reçu.",
      },
    ],
  },
  {
    id: "modes-execution",
    title: "Modes d'exécution",
    level: 2,
    intro:
      "Deux commandes, deux usages : développer en watch, vérifier en une passe.",
    blocks: [
      {
        kind: "command",
        label: "Mode watch (développement)",
        command: "npx vitest",
        why: "Sans argument, Vitest reste en écoute : à chaque sauvegarde d'un fichier source ou de test, seuls les tests concernés sont relancés. C'est le mode de travail quotidien — le feedback est quasi instantané.",
      },
      {
        kind: "command",
        label: "Une passe (vérification et CI)",
        command: "npx vitest run",
        why: "Exécute toute la suite une fois puis quitte avec un code de sortie non nul si un test échoue. C'est ce mode qu'exécute la CI : un processus qui reste en écoute bloquerait le pipeline.",
      },
      {
        kind: "table",
        headers: ["", "`npx vitest` (watch)", "`npx vitest run`"],
        rows: [
          ["Comportement", "Reste actif, relance à chaque changement", "Une passe puis quitte"],
          ["Usage", "Développement local", "CI, vérification avant commit"],
          ["Filtre interactif", "Touche `t` puis motif, `q` pour quitter", "Option `-- -t` en ligne de commande"],
          ["Code de sortie", "N/A (interactif)", "Non nul si échec : la CI détecte"],
        ],
      },
    ],
  },
  {
    id: "anatomie-test",
    title: "Anatomie d'un test",
    level: 2,
    intro:
      "La structure que suivent presque tous les tests : préparer, agir, vérifier.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Structure Arrange / Act / Assert",
        code: `import { describe, it, expect } from "vitest";\nimport { createCart } from "./cart";\n\ndescribe("createCart", () => {\n  it("calcule le total avec la remise", () => {\n    // Arrange : préparer les données\n    const cart = createCart();\n    cart.addItem({ name: "Livre", price: 20 });\n\n    // Act : exécuter le comportement testé\n    const total = cart.totalWithDiscount(0.1);\n\n    // Assert : vérifier le résultat\n    expect(total).toBe(18);\n  });\n});`,
      },
      {
        kind: "text",
        text: "Le motif AAA (Arrange, Act, Assert) n'est pas imposé par Vitest, mais il rend chaque test lisible en trois temps : on prépare, on exécute une seule action, on vérifie. Un test qui mélange plusieurs actions devient difficile à déboguer quand il échoue.",
      },
      {
        kind: "list",
        items: [
          "Un test = un comportement : si le nom du test contient « et », découpez-le en deux.",
          "Nommez le test comme une phrase : `it(\"retourne 0 pour un panier vide\")` se lit comme une spécification.",
          "Évitez la logique (`if`, boucles) dans les tests : un test doit être bête et prévisible.",
        ],
      },
    ],
  },
  {
    id: "matchers-courants",
    title: "Matchers courants",
    level: 2,
    intro:
      "Les affirmations les plus utilisées : savoir choisir la bonne comparaison.",
    blocks: [
      {
        kind: "table",
        headers: ["Matcher", "Usage", "Exemple"],
        rows: [
          ["`toBe`", "Égalité stricte (`===`) : nombres, chaînes, booléens", "`expect(2 + 2).toBe(4)`"],
          ["`toEqual`", "Égalité profonde : objets et tableaux comparés récursivement", "`expect(user).toEqual({ name: \"Ada\" })`"],
          ["`toContain`", "Présence dans un tableau ou une chaîne", "`expect([1, 2]).toContain(2)`"],
          ["`toBeNull` / `toBeUndefined`", "Valeurs nulles explicites", "`expect(value).toBeNull()`"],
          ["`toBeTruthy` / `toBeFalsy`", "Valeur vraie / fausse au sens JavaScript", "`expect(list).toBeTruthy()`"],
          ["`toThrow`", "La fonction lève une erreur", "`expect(() => parse(\"\")).toThrow()`"],
          ["`toHaveLength`", "Longueur d'un tableau ou d'une chaîne", "`expect(items).toHaveLength(3)`"],
        ],
      },
      {
        kind: "text",
        text: "Piège classique : `toBe` sur des objets compare les références, pas le contenu — deux objets identiques mais distincts échouent avec `toBe`. Pour les objets et tableaux, utilisez toujours `toEqual`.",
      },
    ],
  },
  {
    id: "configuration",
    title: "Configuration",
    level: 2,
    intro:
      "Le fichier `vitest.config.ts` : centraliser les réglages des tests.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "vitest.config.ts minimal",
        code: `import { defineConfig } from "vitest/config";\n\nexport default defineConfig({\n  test: {\n    environment: "node",\n    include: ["src/**/*.{test,spec}.ts"],\n  },\n});`,
      },
      {
        kind: "text",
        text: "`defineConfig` vient de `\"vitest/config\"` (pas de `\"vite\"`) : il ajoute l'autocomplétion du bloc `test`. Le bloc `test` accepte l'environnement d'exécution, les motifs de fichiers inclus/exclus, les setup files, la couverture, etc. Si votre projet a déjà un `vite.config.ts`, vous pouvez aussi y déclarer le bloc `test` : Vitest le lira.",
      },
      {
        kind: "fields",
        title: "Options les plus utiles",
        fields: [
          {
            label: "`environment`",
            value:
              "`\"node\"` (défaut, rapide) ou `\"jsdom\"` (DOM simulé pour tester du code qui manipule le navigateur).",
          },
          {
            label: "`include` / `exclude`",
            value:
              "Motifs glob des fichiers de test. Par défaut : `**/*.{test,spec}.?(c|m)[jt]s?(x)` — inutile de le redéfinir sauf besoin spécifique.",
          },
          {
            label: "`globals`",
            value:
              "`true` rend `describe`, `it`, `expect` disponibles sans import (style Jest). Pratique, mais l'import explicite est plus clair.",
          },
          {
            label: "`setupFiles`",
            value:
              "Fichiers exécutés avant chaque fichier de test : configuration globale, mocks partagés (voir niveau 3).",
          },
        ],
      },
    ],
  },
  {
    id: "environnement-jsdom",
    title: "Tester le DOM avec jsdom",
    level: 2,
    intro:
      "Quand le code touche au navigateur (`document`, `window`), Node seul ne suffit plus.",
    blocks: [
      {
        kind: "command",
        label: "Installer jsdom",
        command: "npm install -D jsdom",
        why: "jsdom simule les API du navigateur (DOM, `document`, `window`) dans Node. Sans lui, un test qui touche à `document` échoue avec `document is not defined`. C'est une dépendance de dev comme les autres.",
        verify: "npx vitest run",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Activer jsdom",
        code: `// vitest.config.ts\nimport { defineConfig } from "vitest/config";\n\nexport default defineConfig({\n  test: {\n    environment: "jsdom",\n  },\n});`,
      },
      {
        kind: "code",
        language: "typescript",
        title: "Test DOM simple",
        code: `import { it, expect } from "vitest";\n\nit("crée un bouton avec le bon label", () => {\n  const button = document.createElement("button");\n  button.textContent = "Valider";\n  document.body.appendChild(button);\n\n  expect(document.querySelector("button")?.textContent).toBe("Valider");\n});`,
      },
      {
        kind: "text",
        text: "Astuce par fichier : un commentaire `// @vitest-environment jsdom` en tête d'un fichier de test active jsdom uniquement pour ce fichier, sans toucher à la configuration globale. Utile quand 90 % des tests sont de la logique pure Node.",
      },
    ],
  },
  {
    id: "watch-et-ui",
    title: "Watch mode et interface graphique",
    level: 2,
    intro:
      "Exploiter le mode interactif et l'UI pour un feedback visuel pendant le développement.",
    blocks: [
      {
        kind: "command",
        label: "Installer l'interface graphique",
        command: "npm install -D @vitest/ui",
        why: "Ajoute un tableau de bord web qui affiche les fichiers de test, les résultats, les erreurs et la couverture. Indispensable quand la suite grandit : on voit d'un coup d'œil ce qui échoue.",
      },
      {
        kind: "command",
        label: "Lancer Vitest avec l'UI",
        command: "npx vitest --ui",
        why: "Démarre le mode watch et ouvre le dashboard dans le navigateur (généralement sur `http://localhost:51204/__vitest__/`). Chaque sauvegarde relance les tests et rafraîchit l'affichage.",
      },
      {
        kind: "fields",
        title: "Intégrations éditeur",
        fields: [
          {
            label: "VS Code — extension Vitest",
            value:
              "Lance et débogue les tests depuis l'éditeur : pastilles vertes/rouges dans la marge, exécution d'un seul test au clic, debug avec points d'arrêt.",
          },
          {
            label: "WebStorm",
            value:
              "Intégration Vitest native : exécution et debug sans extension supplémentaire.",
          },
        ],
      },
    ],
  },
  {
    id: "scripts-npm",
    title: "Scripts npm",
    level: 2,
    intro:
      "Standardiser les commandes de test pour toute l'équipe et la CI.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "package.json",
        code: `{\n  "scripts": {\n    "test": "vitest run",\n    "test:watch": "vitest",\n    "test:ui": "vitest --ui",\n    "test:coverage": "vitest run --coverage"\n  }\n}`,
      },
      {
        kind: "text",
        text: "Pourquoi des scripts : `npm test` fonctionne partout pareil — sur la machine de chacun et en CI — sans que personne ait à retenir les flags. Le script `test` doit toujours être la version « une passe » (`vitest run`), jamais le watch qui bloquerait un pipeline.",
      },
    ],
  },
  {
    id: "debug-premier-niveau",
    title: "Déboguer : premier niveau",
    level: 2,
    intro:
      "Les trois réflexes quand un test échoue : isoler, détailler, cibler.",
    blocks: [
      {
        kind: "command",
        label: "Rapport détaillé",
        command: "npx vitest run --reporter=verbose",
        why: "Affiche chaque test individuellement (pas seulement les fichiers) avec son statut. Quand la suite grandit, le rapport par défaut ne montre que les échecs : `verbose` montre tout, y compris les tests ignorés.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Isoler : .only, .skip, .todo",
        code: `import { describe, it } from "vitest";\n\ndescribe("panier", () => {\n  it.only("calcule le total", () => {\n    // seul ce test s'exécute : idéal pour déboguer\n  });\n\n  it.skip("applique la remise", () => {\n    // ignoré temporairement\n  });\n\n  it.todo("gère les codes promo");\n  // déclaré mais pas encore écrit : visible dans le rapport\n});`,
      },
      {
        kind: "text",
        text: "Attention : `it.only` est un outil de debug, pas un état à commiter. Un `.only` oublié fait passer la CI au vert en ignorant le reste de la suite — la plupart des équipes l'interdisent via une règle de lint.",
      },
    ],
  },
  {
    id: "erreurs-debutant",
    title: "Erreurs fréquentes (débutant)",
    level: 2,
    intro:
      "Les messages que tout le monde rencontre les premiers jours, et leur solution.",
    blocks: [
      {
        kind: "table",
        headers: ["Message / symptôme", "Cause probable", "Solution"],
        rows: [
          ["`No test files found`", "Aucun fichier ne correspond au motif", "Nommer les tests `*.test.ts` ou ajuster `test.include`"],
          ["`document is not defined`", "Test DOM sans environnement navigateur", "Installer `jsdom` et mettre `environment: \"jsdom\"`"],
          ["`Cannot find module './x'`", "Mauvais chemin d'import ou extension manquante", "Vérifier le chemin relatif et l'export du module"],
          ["Le watch ne relance rien", "Fichier hors du projet ou exclusion", "Vérifier `test.exclude` et que le fichier est sous la racine"],
          ["`__name is not defined`", "Code qui dépend d'un global navigateur", "Mocker le global avec `vi.stubGlobal` ou passer en jsdom"],
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "architecture",
    title: "Architecture : pourquoi c'est rapide",
    level: 3,
    intro:
      "Ce qui rend Vitest rapide n'est pas de la magie : c'est le partage du pipeline Vite.",
    blocks: [
      {
        kind: "diagram",
        title: "Pipeline d'exécution d'un test",
        lines: [
          "Fichier .test.ts",
          "     │",
          "     ▼",
          "Transform Vite (esbuild — natif, rapide)",
          "     │  mêmes alias, mêmes plugins que le build",
          "     ▼",
          "Workers parallèles (threads Node)",
          "     │  chaque fichier de test isolé",
          "     ▼",
          "Résultats + rapport",
        ],
      },
      {
        kind: "text",
        text: "Trois différences avec Jest : la transformation utilise esbuild (écrit en Go, compilé en natif) au lieu de Babel ; la configuration Vite du projet est réutilisée telle quelle (alias `@/`, plugins) au lieu d'être dupliquée dans une config Jest ; les fichiers de test tournent en parallèle dans des workers. Résultat : démarrage quasi instantané et re-exécution en millisecondes en watch.",
      },
      {
        kind: "text",
        text: "Conséquence pratique : si votre code passe avec `vite build`, il se transforme de la même façon sous Vitest. Les divergences « ça marche en dev mais pas en test » sont rares — et quand elles surviennent, c'est généralement l'environnement (`node` vs `jsdom`) qui est en cause, pas la transformation.",
      },
    ],
  },
  {
    id: "fichiers-detectes",
    title: "Quels fichiers sont détectés",
    level: 3,
    intro:
      "Le motif de détection par défaut et comment le personnaliser sans se tromper.",
    blocks: [
      {
        kind: "text",
        text: "Par défaut, Vitest inclut `**/*.{test,spec}.?(c|m)[jt]s?(x)` : tout fichier se terminant par `.test.` ou `.spec.` avec une extension JS/TS (y compris `.tsx`, `.mts`, `.cts`). Les dossiers `node_modules` et `dist` sont exclus d'office.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Personnaliser include / exclude",
        code: `import { defineConfig } from "vitest/config";\n\nexport default defineConfig({\n  test: {\n    include: ["tests/**/*.test.ts"],\n    exclude: ["**/fixtures/**", "**/e2e/**"],\n  },\n});`,
      },
      {
        kind: "text",
        text: "Convention d'équipe à trancher tôt : tests à côté du code (`src/cart.ts` + `src/cart.test.ts`) ou dossier `tests/` séparé. Les tests colocalisés se retrouvent plus vite et voyagent avec le code lors des déplacements ; un dossier séparé clarifie la structure sur les gros projets. L'important est la constance, pas le choix.",
      },
    ],
  },
  {
    id: "setup-files",
    title: "Setup files",
    level: 3,
    intro:
      "Exécuter du code avant chaque fichier de test : configuration globale, matchers custom.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "vitest.config.ts",
        code: `import { defineConfig } from "vitest/config";\n\nexport default defineConfig({\n  test: {\n    setupFiles: ["./tests/setup.ts"],\n  },\n});`,
      },
      {
        kind: "code",
        language: "typescript",
        title: "tests/setup.ts",
        code: `import { beforeEach, vi } from "vitest";\n\n// Nettoyer les mocks entre chaque fichier de test\nbeforeEach(() => {\n  vi.clearAllMocks();\n});\n\n// Simuler une API navigateur manquante sous jsdom\nvi.stubGlobal("matchMedia", () => ({\n  matches: false,\n  addEventListener: () => {},\n  removeEventListener: () => {},\n}));`,
      },
      {
        kind: "text",
        text: "`setupFiles` s'exécute avant chaque fichier de test, dans son contexte isolé : idéal pour les stubs globaux (`vi.stubGlobal`), les matchers personnalisés ou le nettoyage systématique des mocks. Pour du code qui doit tourner une seule fois par worker (connexion DB de test), préférez `globalSetup` — exécuté une fois avant toute la suite.",
      },
    ],
  },
  {
    id: "hooks-cycle-vie",
    title: "Hooks de cycle de vie",
    level: 3,
    intro:
      "Préparer et nettoyer proprement : `beforeEach`, `afterEach`, `beforeAll`, `afterAll`.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Hooks",
        code: `import { describe, it, expect, beforeEach, afterEach } from "vitest";\nimport { createDatabase } from "./db";\n\ndescribe("repository", () => {\n  let db: ReturnType<typeof createDatabase>;\n\n  beforeEach(() => {\n    db = createDatabase(); // base fraîche pour chaque test\n  });\n\n  afterEach(() => {\n    db.close(); // nettoyage systématique\n  });\n\n  it("sauvegarde un utilisateur", () => {\n    db.save({ name: "Ada" });\n    expect(db.find("Ada")).toBeDefined();\n  });\n});`,
      },
      {
        kind: "text",
        text: "Règle d'or : chaque test doit pouvoir s'exécuter seul, dans n'importe quel ordre. `beforeEach` recrée l'état frais ; `afterEach` libère les ressources (connexions, timers, stubs). Un test qui dépend de l'état laissé par le précédent est un test flaky en puissance — il échouera un jour en CI, au pire moment.",
      },
    ],
  },
  {
    id: "mocks-fonctions",
    title: "Mocks : fonctions avec vi.fn()",
    level: 3,
    intro:
      "Remplacer une dépendance par un double programmable et vérifier les appels.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "vi.fn()",
        code: `import { it, expect, vi } from "vitest";\n\nit("notifie l'utilisateur après inscription", () => {\n  const sendEmail = vi.fn();\n  const register = (email: string, notify: (e: string) => void) => {\n    notify(email);\n  };\n\n  register("ada@example.com", sendEmail);\n\n  expect(sendEmail).toHaveBeenCalledTimes(1);\n  expect(sendEmail).toHaveBeenCalledWith("ada@example.com");\n});`,
      },
      {
        kind: "code",
        language: "typescript",
        title: "Programmer le comportement",
        code: `const fetchUser = vi.fn();\n\nfetchUser.mockResolvedValue({ name: "Ada" });\n// ou : .mockReturnValue(...), .mockRejectedValue(new Error("..."))\n// ou : .mockImplementation((id: string) => ({ id }));\n\nconst user = await fetchUser("1");\nexpect(user.name).toBe("Ada");`,
      },
      {
        kind: "text",
        text: "Vocabulaire : un mock remplace une dépendance ; `mockReturnValue` programme ce qu'il retourne ; les matchers `toHaveBeenCalledWith` vérifient comment il a été appelé. `vi.clearAllMocks()` (dans un `beforeEach` global, voir setup files) réinitialise les appels entre les tests pour éviter les fuites d'un test à l'autre.",
      },
    ],
  },
  {
    id: "mocks-espions",
    title: "Mocks : espions avec vi.spyOn()",
    level: 3,
    intro:
      "Observer une méthode existante sans la remplacer définitivement.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "vi.spyOn()",
        code: `import { it, expect, vi, afterEach } from "vitest";\nimport { logger } from "./logger";\n\nafterEach(() => {\n  vi.restoreAllMocks(); // rend aux espions leur implémentation d'origine\n});\n\nit("journalise les erreurs", () => {\n  const spy = vi.spyOn(logger, "error");\n\n  logger.error("panne");\n\n  expect(spy).toHaveBeenCalledWith("panne");\n});`,
      },
      {
        kind: "text",
        text: "Différence avec `vi.fn()` : l'espion garde l'implémentation d'origine (le code réel s'exécute) tout en enregistrant les appels. On peut aussi la remplacer ponctuellement avec `spy.mockImplementation(...)`. `vi.restoreAllMocks()` restaure les originaux — sans lui, un espion laissé actif pollue les tests suivants.",
      },
    ],
  },
  {
    id: "mocks-modules",
    title: "Mocks : modules avec vi.mock()",
    level: 3,
    intro:
      "Remplacer tout un module importé : la technique la plus puissante, à manier avec soin.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "vi.mock avec factory",
        code: `import { it, expect, vi } from "vitest";\nimport { getProfile } from "./profile";\nimport { fetchJson } from "./http";\n\n// Remplace le module ./http pour TOUS les tests de ce fichier\nvi.mock("./http", () => ({\n  fetchJson: vi.fn(),\n}));\n\nit("construit le profil depuis l'API", async () => {\n  vi.mocked(fetchJson).mockResolvedValue({ name: "Ada" });\n\n  const profile = await getProfile("1");\n\n  expect(profile.displayName).toBe("Ada");\n});`,
      },
      {
        kind: "text",
        text: "Point crucial : `vi.mock()` est remonté (hoisted) en haut du fichier par Vitest, avant les imports. La factory ne peut donc pas référencer de variables du fichier (sauf préfixées par `vi.`) — d'où le `vi.fn()` à l'intérieur. `vi.mocked(fetchJson)` redonne le typage TypeScript au mock pour `mockResolvedValue`.",
      },
      {
        kind: "text",
        text: "Mise en garde : mocker un module, c'est tester avec une réalité de substitution. Réservez `vi.mock` aux frontières (HTTP, base de données, temps) et testez votre logique avec le vrai code. Une suite qui mocke tout ne teste plus que ses propres mocks.",
      },
    ],
  },
  {
    id: "mocks-timers",
    title: "Mocks : timers",
    level: 3,
    intro:
      "Tester le code basé sur le temps sans attendre réellement.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Fake timers",
        code: `import { it, expect, vi, afterEach } from "vitest";\nimport { debounce } from "./debounce";\n\nvi.useFakeTimers();\n\nafterEach(() => {\n  vi.useRealTimers(); // toujours restaurer\n});\n\nit("n'appelle la fonction qu'après le délai", () => {\n  const fn = vi.fn();\n  const debounced = debounce(fn, 300);\n\n  debounced();\n  debounced();\n  expect(fn).not.toHaveBeenCalled();\n\n  vi.advanceTimersByTime(300);\n  expect(fn).toHaveBeenCalledTimes(1);\n});`,
      },
      {
        kind: "text",
        text: "`vi.useFakeTimers()` remplace `setTimeout`, `setInterval` et `Date` ; `vi.advanceTimersByTime(ms)` fait avancer l'horloge simulée. Pour le code `async` qui attend des timers, utilisez `await vi.advanceTimersByTimeAsync(ms)`. Et restaurez toujours les vrais timers après — des timers fakés qui fuient rendent toute la suite imprévisible.",
      },
    ],
  },
  {
    id: "tests-parametres",
    title: "Tests paramétrés",
    level: 3,
    intro:
      "Même logique, plusieurs jeux de données : `it.each` évite la duplication.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "it.each",
        code: `import { it, expect } from "vitest";\nimport { sum } from "./sum";\n\nit.each([\n  [1, 2, 3],\n  [-1, 1, 0],\n  [0, 0, 0],\n  [100, 200, 300],\n])("sum(%i, %i) vaut %i", (a, b, expected) => {\n  expect(sum(a, b)).toBe(expected);\n});`,
      },
      {
        kind: "text",
        text: "Chaque ligne du tableau devient un test indépendant, avec son nom formaté (`%i` = entier, `%s` = chaîne). Avantage : ajouter un cas limite, c'est ajouter une ligne. `describe.each` existe pour paramétrer un groupe entier. Quand les cas divergent trop (données et assertions différentes), préférez des tests séparés explicites.",
      },
    ],
  },
  {
    id: "tests-async",
    title: "Tester le code asynchrone",
    level: 3,
    intro:
      "Promesses, erreurs rejetées, timeouts : les pièges de l'async en test.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Async / await et rejets",
        code: `import { it, expect } from "vitest";\nimport { fetchUser } from "./api";\n\nit("retourne l'utilisateur", async () => {\n  const user = await fetchUser("1");\n  expect(user.name).toBe("Ada");\n});\n\nit("rejette sur identifiant inconnu", async () => {\n  await expect(fetchUser("inconnu")).rejects.toThrow("introuvable");\n});`,
      },
      {
        kind: "text",
        text: "Deux règles : un test async doit être déclaré `async` et `await` ses promesses — sinon le test se termine avant la fin du code testé et passe à tort. Pour les erreurs, `await expect(promesse).rejects.toThrow(...)` vérifie le rejet ; sans le `await`, l'assertion ne s'exécute jamais. `expect.assertions(n)` garantit qu'exactement `n` assertions ont tourné : une sécurité contre les tests qui passent sans rien vérifier.",
      },
    ],
  },
  {
    id: "snapshots",
    title: "Snapshots",
    level: 3,
    intro:
      "Figer une sortie complexe (objet, HTML) et détecter les changements involontaires.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Snapshots",
        code: `import { it, expect } from "vitest";\nimport { renderProfile } from "./profile";\n\nit("rend le profil", () => {\n  // Premier passage : crée le snapshot. Ensuite : compare.\n  expect(renderProfile({ name: "Ada" })).toMatchSnapshot();\n});\n\nit("vérifie une valeur précise", () => {\n  // toMatchInlineSnapshot() écrit le snapshot dans le code :\n  // même principe, sans fichier __snapshots__ séparé.\n  expect({ a: 1 }).toEqual({ a: 1 });\n});`,
      },
      {
        kind: "text",
        text: "Les snapshots sont stockés dans `__snapshots__/` à côté du test. Quand la sortie change légitimement, `npx vitest run -u` met à jour les snapshots. Danger : valider un snapshot sans le relire, c'est figer un bug. Relisez toujours le diff avant `-u`, et préférez les assertions explicites pour les valeurs critiques.",
      },
    ],
  },
  {
    id: "coverage",
    title: "Couverture de code",
    level: 3,
    intro:
      "Mesurer quelles lignes sont exécutées par les tests — et comprendre les limites de la métrique.",
    blocks: [
      {
        kind: "command",
        label: "Installer le fournisseur de couverture",
        command: "npm install -D @vitest/coverage-v8",
        why: "La couverture n'est pas incluse par défaut : elle demande un paquet supplémentaire. Le fournisseur `v8` utilise la couverture native du moteur JavaScript — rapide et précise. Alternative : `@vitest/coverage-istanbul` (instrumentation classique, plus lente).",
      },
      {
        kind: "command",
        label: "Lancer les tests avec couverture",
        command: "npx vitest run --coverage",
        why: "Exécute la suite en mesurant la couverture et affiche un tableau par fichier. Le rapport HTML détaillé (ligne par ligne) est généré dans `coverage/` quand le reporter `html` est activé.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Configuration de la couverture",
        code: `import { defineConfig } from "vitest/config";\n\nexport default defineConfig({\n  test: {\n    coverage: {\n      provider: "v8",\n      reporter: ["text", "html"],\n      include: ["src/**/*.{ts,tsx}"],\n      exclude: ["src/**/*.d.ts", "src/**/*.test.ts"],\n    },\n  },\n});`,
      },
    ],
  },
  {
    id: "coverage-seuils",
    title: "Seuils de couverture",
    level: 3,
    intro:
      "Faire échouer la CI quand la couverture passe sous un plancher : le garde-fou.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Seuils",
        code: `import { defineConfig } from "vitest/config";\n\nexport default defineConfig({\n  test: {\n    coverage: {\n      thresholds: {\n        lines: 80,\n        functions: 80,\n        branches: 80,\n        statements: 80,\n      },\n    },\n  },\n});`,
      },
      {
        kind: "text",
        text: "Si une métrique passe sous son seuil, `vitest run --coverage` échoue — la CI bloque la fusion. Les quatre métriques : lignes exécutées, fonctions appelées, branches (`if`/`else`, ternaires) prises, instructions couvertes. Démarrez avec des seuils modestes et augmentez progressivement : un seuil à 90 % sur une base non testée bloque tout le monde du jour au lendemain.",
      },
      {
        kind: "text",
        text: "Limite à garder en tête : 100 % de couverture ne prouve pas l'absence de bugs — seulement que chaque ligne a été exécutée. Un test sans assertion compte dans la couverture. La couverture mesure la quantité, les assertions mesurent la qualité.",
      },
    ],
  },
  {
    id: "coverage-lire",
    title: "Lire un rapport de couverture",
    level: 3,
    intro: "Interpréter le tableau affiché après `--coverage`.",
    blocks: [
      {
        kind: "table",
        headers: ["Colonne", "Signification", "Action si faible"],
        rows: [
          ["`% Stmts`", "Instructions exécutées", "Ajouter des tests sur les chemins non couverts"],
          ["`% Branch`", "Branches (`if`/`else`, `&&`, ternaires) prises des deux côtés", "Tester le cas `else`, souvent oublié"],
          ["`% Funcs`", "Fonctions appelées au moins une fois", "Couvrir les utilitaires orphelins"],
          ["`% Lines`", "Lignes exécutées", "Regarder le rapport HTML ligne par ligne"],
          ["`Uncovered`", "Numéros de lignes non couvertes", "Cliquer dans le rapport HTML pour voir le code exact"],
        ],
      },
      {
        kind: "text",
        text: "Le rapport HTML (`coverage/index.html`) colore le code : rouge = jamais exécuté, jaune = partiellement (une branche sur deux). C'est l'outil le plus rentable : dix minutes à parcourir les lignes rouges révèlent les angles morts de la suite.",
      },
    ],
  },
  {
    id: "ui-detaillee",
    title: "L'UI en détail",
    level: 3,
    intro: "Ce que le dashboard `@vitest/ui` apporte quand la suite grandit.",
    blocks: [
      {
        kind: "fields",
        title: "Fonctionnalités du dashboard",
        fields: [
          {
            label: "Explorateur de fichiers",
            value:
              "Arborescence des fichiers de test avec statut par fichier : on repère d'un coup d'œil où sont les échecs.",
          },
          {
            label: "Détail des erreurs",
            value:
              "Diff attendu / reçu coloré, pile d'appels cliquable : plus besoin de fouiller le terminal.",
          },
          {
            label: "Relance ciblée",
            value:
              "Relancer un seul fichier ou un seul test depuis l'UI, sans quitter le navigateur.",
          },
          {
            label: "Couverture visuelle",
            value:
              "Vue d'ensemble des taux par fichier quand `--coverage` est actif.",
          },
        ],
      },
      {
        kind: "text",
        text: "L'UI est un outil de développement, pas de CI : elle ne remplace ni `vitest run` ni les rapports machine. Son vrai apport est le debug visuel — comprendre un échec complexe est plus rapide avec un diff coloré qu'avec du texte brut.",
      },
    ],
  },
  {
    id: "reporters",
    title: "Reporters",
    level: 3,
    intro:
      "Choisir le format de sortie selon le contexte : humain, CI, ou outil externe.",
    blocks: [
      {
        kind: "table",
        headers: ["Reporter", "Format", "Usage typique"],
        rows: [
          ["`default`", "Compact, fichiers résumés", "Développement quotidien"],
          ["`verbose`", "Chaque test listé", "Comprendre une suite qui échoue"],
          ["`dot`", "Points minimalistes", "Suites énormes où le détail noie l'info"],
          ["`json`", "JSON structuré", "Exploitation par un script ou un dashboard"],
          ["`junit`", "XML JUnit", "CI (Jenkins, GitLab, Azure) qui affichent les tests"],
        ],
      },
      {
        kind: "code",
        language: "typescript",
        title: "Configurer",
        code: `import { defineConfig } from "vitest/config";\n\nexport default defineConfig({\n  test: {\n    reporter: ["default", "junit"],\n    outputFile: { junit: "./reports/junit.xml" },\n  },\n});`,
      },
    ],
  },
  {
    id: "typecheck",
    title: "Tester les types",
    level: 3,
    intro:
      "Vitest exécute le JavaScript transformé : les erreurs de types passent inaperçues. Le mode typecheck les attrape.",
    blocks: [
      {
        kind: "command",
        label: "Lancer les tests de types",
        command: "npx vitest run --typecheck",
        why: "Exécute `tsc` sur les fichiers `*.test-d.ts` en plus des tests normaux. Nécessite `typescript` installé : c'est le seul moyen de vérifier que vos utilitaires typés (génériques, overloads) se comportent comme prévu au niveau des types.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Exemple : sum.test-d.ts",
        code: `import { expectTypeOf } from "vitest";\nimport { sum } from "./sum";\n\nexpectTypeOf(sum).parameter(0).toBeNumber();\nexpectTypeOf(sum(1, 2)).toBeNumber();`,
      },
      {
        kind: "text",
        text: "`expectTypeOf` est l'équivalent type-level de `expect` : il affirme des types, pas des valeurs. Réservé aux bibliothèques et au code générique complexe — pour une application classique, `tsc --noEmit` dans la CI suffit.",
      },
    ],
  },
  {
    id: "isolation-pools",
    title: "Isolation et pools",
    level: 3,
    intro:
      "Comment Vitest parallélise et isole : `threads`, `forks`, et l'option `isolate`.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Choisir le pool",
        code: `import { defineConfig } from "vitest/config";\n\nexport default defineConfig({\n  test: {\n    pool: "threads", // défaut : rapide, workers légers\n    // pool: "forks", // processus séparés : isolation maximale\n    isolate: true,   // défaut : environnement frais par fichier\n  },\n});`,
      },
      {
        kind: "text",
        text: "Par défaut, chaque fichier de test tourne dans un worker isolé (`isolate: true`) : les globals, mocks et modules d'un fichier ne fuient pas dans un autre. `pool: \"threads\"` partage la mémoire via des threads (rapide) ; `\"forks\"` lance de vrais processus (plus lent, isolation totale — utile si des dépendances natives posent problème). `isolate: false` accélère en partageant l'environnement, mais réintroduit les fuites d'état : à éviter sauf suite très lente et maîtrisée.",
      },
    ],
  },
  {
    id: "performance-suite",
    title: "Accélérer une suite lente",
    level: 3,
    intro:
      "Quand `vitest run` dépasse la minute : les leviers, dans l'ordre d'impact.",
    blocks: [
      {
        kind: "list",
        items: [
          "Mesurer d'abord : `--reporter=verbose` et le temps par fichier identifient les coupables — souvent 2-3 fichiers représentent 80 % du temps.",
          "Réduire jsdom : l'environnement DOM simulé coûte cher. Réservez-le aux fichiers qui en ont besoin (commentaire `// @vitest-environment jsdom`), laissez le reste en `node`.",
          "Éviter les vrais timers et les vrais appels réseau : `vi.useFakeTimers()` et mocks HTTP transforment des secondes d'attente en millisecondes.",
          "Paralléliser en CI avec `--shard` : diviser la suite sur plusieurs jobs (voir section dédiée).",
          "En dernier recours : `deps.optimizer` et la réduction des `setupFiles` lourds. Ne désactivez pas la couverture pour « aller plus vite » en CI — mesurez d'abord son coût réel.",
        ],
      },
      {
        kind: "text",
        text: "Objectif raisonnable : une suite qui tourne en moins d'une minute en local reste un outil de feedback ; au-delà, les développeurs cessent de la lancer. La vitesse de la suite est une fonctionnalité, pas un luxe.",
      },
    ],
  },
  {
    id: "shard-ci",
    title: "Sharding en CI",
    level: 3,
    intro:
      "Diviser la suite sur plusieurs jobs parallèles avec `--shard`.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: ".github/workflows/test.yml",
        code: `name: Tests\non: [push]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    strategy:\n      matrix:\n        shard: [1, 2, 3, 4]\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n          cache: npm\n      - run: npm ci\n      - run: npx vitest run --shard=\${{ matrix.shard }}/4`,
      },
      {
        kind: "text",
        text: "`--shard=1/4` exécute le premier quart des fichiers de test : la matrice lance 4 jobs qui se partagent la suite. Vitest répartit les fichiers, pas les tests individuels — un fichier très lent peut déséquilibrer les shards. Combinez avec le cache npm (`cache: npm`) et `npm ci` pour des builds reproductibles.",
      },
    ],
  },
  {
    id: "workspace",
    title: "Workspaces (monorepo)",
    level: 3,
    intro:
      "Plusieurs projets, plusieurs configs : `vitest.workspace.ts`.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "vitest.workspace.ts",
        code: `import { defineWorkspace } from "vitest/config";\n\nexport default defineWorkspace([\n  "packages/app",\n  "packages/ui",\n  {\n    extends: "./vitest.shared.ts",\n    test: { include: ["packages/api/**/*.test.ts"] },\n  },\n]);`,
      },
      {
        kind: "text",
        text: "Le workspace déclare chaque projet (dossier ou config inline) : `vitest run` les exécute tous avec leurs propres réglages (environnement, setup). Pratique en monorepo où l'app veut jsdom et l'API veut node. Chaque projet garde son rapport, et `--project` permet de n'en lancer qu'un : `npx vitest run --project ui`.",
      },
    ],
  },
  {
    id: "migration-jest",
    title: "Migrer depuis Jest",
    level: 3,
    intro:
      "Vitest est compatible avec l'API Jest : la migration est surtout de la configuration.",
    blocks: [
      {
        kind: "table",
        headers: ["Jest", "Vitest", "Note"],
        rows: [
          ["`jest.config.js`", "`vitest.config.ts` (bloc `test`)", "La config Vite existante est réutilisée"],
          ["`describe` / `it` / `expect`", "Identique", "Import depuis `\"vitest\"` ou `globals: true`"],
          ["`jest.fn()`", "`vi.fn()`", "Même sémantique, import depuis `\"vitest\"`"],
          ["`jest.mock()`", "`vi.mock()`", "Factory et hoisting équivalents"],
          ["`babel-jest` / `ts-jest`", "esbuild via Vite", "Supprimer la couche de transpilation"],
          ["`testEnvironment: \"jsdom\"`", "`environment: \"jsdom\"`", "Installer `jsdom` séparément"],
        ],
      },
      {
        kind: "text",
        text: "Stratégie : activez `globals: true` pour ne pas réécrire les imports tout de suite, migrez la configuration, lancez la suite, puis convertissez les mocks au cas par cas. Les différences subtiles (timers, ESM) se révèlent en exécutant — prévoyez une passe de stabilisation.",
      },
    ],
  },
  {
    id: "globals-option",
    title: "L'option globals",
    level: 3,
    intro: "`globals: true` : `describe` et `expect` sans import — pratique ou piège ?",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Activation",
        code: `import { defineConfig } from "vitest/config";\n\nexport default defineConfig({\n  test: {\n    globals: true,\n  },\n});\n\n// Ensuite, dans les tests : plus d'import nécessaire\n// import { describe, it, expect } from "vitest";\ndescribe("exemple", () => {\n  it("fonctionne", () => {\n    expect(1).toBe(1);\n  });\n});`,
      },
      {
        kind: "text",
        text: "Avantage : migration Jest facilitée, tests plus concis. Inconvénient : TypeScript a besoin des types globaux (`/// <reference types=\"vitest/globals\" />` ou config `types`), et l'origine de `describe` devient implicite pour un nouveau lecteur. Recommandation : imports explicites sur les nouveaux projets, `globals: true` comme pont de migration.",
      },
    ],
  },
  {
    id: "expect-avance",
    title: "Expect avancé",
    level: 3,
    intro:
      "Assertions expressives pour les cas qui dépassent `toBe` / `toEqual`.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Matchers avancés",
        code: `import { it, expect } from "vitest";\n\nit("vérifie partiellement un objet", () => {\n  const user = { id: 1, name: "Ada", createdAt: new Date() };\n  // Ne vérifie que les champs listés : createdAt est ignoré\n  expect(user).toEqual(expect.objectContaining({ name: "Ada" }));\n});\n\nit("garantit que les assertions ont tourné", () => {\n  expect.assertions(1);\n  // Si le code ci-dessous ne s'exécute pas, le test échoue\n  expect(true).toBe(true);\n});\n\nit("vérifie un tableau d'objets", () => {\n  const users = [{ name: "Ada" }, { name: "Grace" }];\n  expect(users).toEqual(\n    expect.arrayContaining([expect.objectContaining({ name: "Grace" })])\n  );\n});`,
      },
      {
        kind: "text",
        text: "`expect.objectContaining` et `expect.arrayContaining` sont des matchers asymétriques : ils s'utilisent à l'intérieur d'un autre matcher pour ne vérifier qu'une partie. `expect.assertions(n)` est l'assurance anti-faux-positif des tests async. `expect.any(Date)` et `expect.stringContaining(\"...\")` complètent la boîte à outils.",
      },
    ],
  },
  {
    id: "tests-flaky",
    title: "Tests instables (flaky)",
    level: 3,
    intro:
      "Un test qui passe « la plupart du temps » est un test cassé : diagnostiquer et corriger.",
    blocks: [
      {
        kind: "list",
        items: [
          "Timers réels : un `setTimeout` de 100 ms peut dépasser sous charge CI. Utilisez `vi.useFakeTimers()` pour un temps déterministe.",
          "État partagé : deux tests qui écrivent dans le même fichier ou la même variable globale. Isolez avec `beforeEach` qui recrée l'état.",
          "Réseau réel : latence et indisponibilité. Mockez la couche HTTP (`vi.mock`, MSW) : les tests automatisés ne doivent jamais dépendre du réseau.",
          "Ordre d'exécution : un test qui passe seul mais échoue dans la suite révèle une fuite d'état. Lancez avec `--no-isolate` temporairement ? Non — faites l'inverse : isolez le fichier suspect avec `-t` ou `.only`.",
          "Aléatoire et dates : `Math.random()` et `new Date()` non mockés. Injectez une horloge ou un générateur.",
        ],
      },
      {
        kind: "text",
        text: "Vitest propose `retry` (relancer un test échoué) : c'est un pansement, pas un remède. Un retry masque l'instabilité au lieu de la corriger — à réserver aux dépendances externes incompressibles, jamais à votre propre logique.",
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 2,
    intro:
      "Les règles qui distinguent une suite utile d'une suite qui ralentit l'équipe.",
    blocks: [
      {
        kind: "list",
        items: [
          "Tester le comportement, pas l'implémentation : si un refactoring interne casse des tests sans changer le comportement, les tests sont trop couplés.",
          "Pyramide des tests : beaucoup de tests unitaires rapides, quelques tests d'intégration, très peu de tests lents de bout en bout.",
          "Un test doit échouer pour une seule raison : quand il échoue, son nom doit dire quoi réparer.",
          "Données de test explicites : préférez des littéraux lisibles aux factories magiques pour les cas simples.",
          "La suite doit rester rapide : au-delà d'une minute, les développeurs cessent de la lancer en local.",
          "Ne jamais committer de `.only` : un seul test qui tourne, c'est toute la suite qui ne protège plus rien.",
        ],
      },
    ],
  },
  {
    id: "anti-patterns",
    title: "Anti-patterns",
    level: 3,
    intro: "Les pièges classiques qui rendent une suite fragile ou inutile.",
    blocks: [
      {
        kind: "list",
        items: [
          "Snapshots géants validés sans relecture : figer 500 lignes de HTML sans les lire, c'est figer des bugs potentiels.",
          "Mocks excessifs : mocker le code que vous testez vous-même — la suite ne teste plus que ses propres doubles.",
          "Tests dépendants de l'ordre : passent ensemble, échouent isolément. Chaque test doit être autonome.",
          "`sleep()` arbitraires : `await new Promise(r => setTimeout(r, 500))` pour « laisser le temps ». Lent et flaky : préférez les fake timers ou l'attente d'une condition.",
          "Assertions faibles : `expect(result).toBeDefined()` au lieu de vérifier la valeur. Un test qui ne peut presque pas échouer ne protège de rien.",
          "Tester les bibliothèques : écrire des tests pour vérifier que `lodash` trie bien — c'est déjà testé en amont.",
        ],
      },
    ],
  },
  {
    id: "node-vs-jsdom",
    title: "Node vs jsdom : choisir",
    level: 3,
    intro: "Deux environnements, deux coûts : bien les répartir.",
    blocks: [
      {
        kind: "table",
        headers: ["", "`node` (défaut)", "`jsdom`"],
        rows: [
          ["Vitesse", "Rapide", "Plus lent (DOM simulé à construire)"],
          ["API disponibles", "Node uniquement", "`document`, `window`, `localStorage`…"],
          ["Usage", "Logique pure, utilitaires, API", "Composants, code qui manipule le DOM"],
          ["Activation par fichier", "—", "Commentaire `// @vitest-environment jsdom`"],
        ],
      },
      {
        kind: "text",
        text: "Stratégie : `node` par défaut dans la config, jsdom uniquement sur les fichiers qui en ont besoin via le commentaire en tête de fichier. Sur une grosse suite, cette répartition seule peut diviser le temps d'exécution par deux.",
      },
    ],
  },
  {
    id: "debug-avance",
    title: "Déboguer : niveau avancé",
    level: 3,
    intro: "Quand l'échec résiste aux premiers réflexes : filtrer, tracer, debugger.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Filtrer par nom",
            detail:
              "`npx vitest run -t \"calcule le total\"` n'exécute que les tests dont le nom correspond. En watch, la touche `t` fait la même chose interactivement. On réduit le bruit avant de chercher.",
          },
          {
            title: "Lire le diff attendu / reçu",
            detail:
              "Vitest affiche un diff coloré pour `toEqual` : la ligne précédée de `-` est l'attendu, `+` le reçu. Pour les objets complexes, copiez le diff dans l'UI (`--ui`) où il est plus lisible.",
          },
          {
            title: "Ajouter un point d'arrêt",
            detail:
              "Avec l'extension VS Code Vitest, posez un breakpoint dans le test et lancez « Debug » : l'exécution s'arrête et vous inspectez les variables. Plus efficace que les `console.log` en série.",
          },
          {
            title: "Vérifier l'isolation",
            detail:
              "Le test passe seul (`-t`) mais échoue dans la suite ? C'est une fuite d'état : mock non restauré, timer non nettoyé, fichier partagé. Ajoutez `vi.restoreAllMocks()` et `vi.useRealTimers()` dans un `afterEach` global.",
          },
        ],
      },
    ],
  },
  {
    id: "projets",
    title: "Projets pour pratiquer",
    level: 3,
    intro: "Trois projets progressifs pour ancrer chaque niveau.",
    blocks: [
      {
        kind: "list",
        items: [
          "Bibliothèque d'utilitaires testée : écrivez 10 fonctions pures (formatage de dates, validation, calculs) avec leurs tests `*.test.ts`, en visant des noms de tests qui se lisent comme une documentation.",
          "Suite avec mocks et couverture : prenez un petit module qui appelle une API (mockée avec `vi.mock`), ajoutez des fake timers, activez la couverture avec un seuil à 80 % et faites passer la CI.",
          "Pipeline complète : GitHub Actions avec sharding (`--shard`), rapport JUnit, et badge de statut. Mesurez le temps avant/après le sharding.",
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Les références officielles, en priorité.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle",
        fields: [
          {
            label: "vitest.dev",
            value:
              "La documentation officielle : guides (Getting Started, Mocking, Coverage), référence de configuration et API. Le point de départ et la référence pour chaque option.",
          },
          {
            label: "Guide Mocking",
            value:
              "La page Mocking de la doc officielle : `vi.mock`, `vi.spyOn`, timers — avec les subtilités du hoisting expliquées.",
          },
          {
            label: "Guide Coverage",
            value:
              "La page Coverage de la doc officielle : fournisseurs v8/istanbul, seuils, reporters.",
          },
        ],
      },
      {
        kind: "text",
        text: "Réflexe : devant une option inconnue, la référence de configuration de vitest.dev donne la valeur par défaut et un exemple — c'est plus fiable que n'importe quel tutoriel.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite",
    level: 3,
    intro:
      "Vitest maîtrisé, ces compétences prolongent naturellement la démarche qualité.",
    blocks: [
      {
        kind: "fields",
        title: "Continuer dans la roadmap",
        fields: [
          {
            label: "testing",
            value:
              "La stratégie globale des tests : pyramide, TDD, tests d'intégration — Vitest n'est que l'outil, `testing` est la méthode.",
          },
          {
            label: "playwright",
            value:
              "Les tests de bout en bout dans un vrai navigateur : le complément des tests Vitest, pour les parcours utilisateur complets.",
          },
          {
            label: "cicd",
            value:
              "Exécuter `vitest run` automatiquement à chaque push : quality gates, sharding, rapports.",
          },
          {
            label: "github-actions",
            value:
              "Le pipeline concret : workflow YAML qui installe, teste et publie les rapports.",
          },
          {
            label: "typescript",
            value:
              "Typer le code testé — et utiliser `expectTypeOf` pour tester les types eux-mêmes.",
          },
        ],
      },
    ],
  },
];

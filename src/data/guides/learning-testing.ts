import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète des tests logiciels : de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Périmètre : tests unitaires, d'intégration et end-to-end (écosystème JS en exemples).
 */
export const LEARNING_TESTING: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce que sont les tests logiciels : une vérification automatique que le code se comporte comme prévu.",
    blocks: [
      {
        kind: "text",
        text: "Les tests vérifient automatiquement que le code se comporte comme prévu : tests unitaires (une fonction isolée), tests d'intégration (plusieurs modules ensemble), tests end-to-end (l'application comme un utilisateur). Ils permettent de refactorer sans peur.",
      },
      {
        kind: "text",
        text: "Pourquoi tester : sans tests, chaque modification est un pari — on ne sait ce qui casse qu'en production. Avec des tests, on obtient un verdict en secondes à chaque changement. Tester, c'est pouvoir faire évoluer un projet sans tout casser : c'est ce qui distingue un prototype d'un logiciel maintenable.",
      },
      {
        kind: "text",
        text: "Ce que les tests ne sont pas : une preuve d'absence de bugs. Un test vérifie les cas qu'on a pensés à écrire. Les tests réduisent drastiquement le risque, ils ne l'annulent pas — d'où l'importance de tester les bons cas, pas d'en écrire le plus possible.",
      },
    ],
  },
  {
    id: "pyramide-tests",
    title: "La pyramide des tests",
    level: 1,
    intro:
      "Le modèle mental qui organise les types de tests : beaucoup d'unitaires rapides, peu d'e2e lents.",
    blocks: [
      {
        kind: "diagram",
        title: "La pyramide des tests",
        lines: [
          "           /\\",
          "          /E2E\\          peu nombreux, lents, coûteux",
          "         /──────\\       (parcours utilisateur complets)",
          "        /Intégrat.\\     moyens : les modules ensemble",
          "       /────────────\\   (API, base de données)",
          "      /  Unitaires   \\  nombreux, rapides, précis",
          "     /────────────────\\ (une fonction, un module isolé)",
        ],
      },
      {
        kind: "text",
        text: "La base (unitaires) est large : des centaines de tests qui s'exécutent en millisecondes et localisent précisément les pannes. Le sommet (e2e) est étroit : quelques parcours critiques qui valident l'ensemble mais sont lents et fragiles. Une pyramide inversée (que des e2e) donne une suite lente, fragile et chère à maintenir.",
      },
      {
        kind: "list",
        items: [
          "Unitaires : rapides et précis — la première ligne de défense.",
          "Intégration : vérifient que les pièces fonctionnent ensemble — là où se cachent les vrais bugs.",
          "E2E : valident les parcours critiques de bout en bout — avec un vrai navigateur.",
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
      "On ne teste bien que du code qu'on sait écrire : les bases du langage d'abord, la testabilité ensuite.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut savoir",
        fields: [
          {
            label: "JavaScript (ou le langage testé)",
            value:
              "Écrire du code courant : fonctions, modules, async/await. On teste ce qu'on sait écrire.",
          },
          {
            label: "Code testable",
            value:
              "Fonctions pures (même entrée → même sortie), modules découplés, effets de bord isolés : un code emmêlé est intestable.",
          },
          {
            label: "Ligne de commande",
            value:
              "Lancer les tests via npm scripts, lire un rapport d'échec, comprendre une stack trace.",
          },
          {
            label: "Git",
            value:
              "Les tests vivent avec le code : même commit, même pull request, même revue.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le prérequis le plus sous-estimé : savoir écrire du code testable. Une fonction qui mélange calcul, accès réseau et écriture fichier est intestable ; la même logique découpée en trois fonctions pures + une couche d'effets se teste trivialement. La testabilité est une qualité de conception, pas un outil.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Installer les trois outils de référence : Vitest (unitaire), Jest (alternative) et Playwright (e2e).",
    blocks: [
      {
        kind: "command",
        label: "Installer Vitest",
        command: "npm install -D vitest",
        why: "Vitest est le testeur unitaire moderne, compatible avec l'API de Jest et intégré à l'écosystème Vite : démarrage instantané, watch mode, exécution en parallèle. Le choix par défaut pour un projet récent.",
        verify: "npx vitest --version",
      },
      {
        kind: "command",
        label: "Installer Jest (alternative historique)",
        command: "npm install -D jest",
        why: "Jest est le testeur historique de l'écosystème JavaScript, à l'écosystème très riche. Pertinent pour les projets existants déjà configurés avec lui ; pour TypeScript, ajouter `ts-jest` ou passer par Babel.",
        verify: "npx jest --version",
      },
      {
        kind: "command",
        label: "Installer Playwright (e2e)",
        command: "npm init playwright@latest",
        why: "L'assistant officiel installe Playwright, les navigateurs de test (Chromium, Firefox, WebKit) et génère une configuration de base. `npx playwright install` installe ou met à jour les navigateurs seuls.",
        verify: "npx playwright --version",
      },
      {
        kind: "text",
        text: "Un seul testeur unitaire par projet : Vitest ou Jest, pas les deux. Playwright cohabite avec l'un ou l'autre — il couvre le sommet de la pyramide pendant que Vitest/Jest couvre la base.",
      },
    ],
  },
  {
    id: "premier-test",
    title: "Premier test",
    level: 2,
    intro:
      "Écrire et exécuter un premier test unitaire : le cycle rouge → vert en cinq minutes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Écrire la fonction à tester",
            detail:
              "Créer `math.ts` avec `export function add(a: number, b: number) { return a + b; }` : une fonction pure, le cas le plus simple à tester.",
          },
          {
            title: "Écrire le test",
            detail:
              "Créer `math.test.ts` à côté : importer `add`, décrire le comportement attendu avec `describe`/`it`, vérifier avec `expect(add(2, 3)).toBe(5)`.",
          },
          {
            title: "Lancer en watch",
            detail:
              "`npx vitest` : le mode watch relance les tests à chaque sauvegarde — la boucle de feedback immédiate.",
          },
          {
            title: "Voir le vert",
            detail:
              "Le test passe : Vitest affiche le fichier, le nombre de tests et la durée. C'est le « vert ».",
          },
          {
            title: "Casser pour voir le rouge",
            detail:
              "Changer temporairement `+` en `-` dans `math.ts` : le test échoue avec le détail (attendu 5, reçu -1). C'est le « rouge » — et la preuve que le test protège vraiment.",
          },
          {
            title: "Lancer en une fois (CI)",
            detail:
              "`npx vitest run` : exécution unique sans watch — c'est cette commande que la CI utilisera.",
          },
        ],
      },
      {
        kind: "code",
        language: "typescript",
        title: "math.test.ts — premier test Vitest",
        code: `import { describe, it, expect } from "vitest";\nimport { add } from "./math";\n\ndescribe("add", () => {\n  it("additionne deux nombres", () => {\n    expect(add(2, 3)).toBe(5);\n  });\n\n  it("gère les nombres négatifs", () => {\n    expect(add(-2, -3)).toBe(-5);\n  });\n});`,
      },
    ],
  },
  {
    id: "anatomie-test",
    title: "Anatomie d'un test",
    level: 2,
    intro:
      "La structure AAA (Arrange, Act, Assert) et l'organisation `describe`/`it` : écrire des tests lisibles.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Structure Arrange / Act / Assert",
        code: `it("applique une remise de 10 %", () => {\n  // Arrange : préparer les données\n  const panier = [{ prix: 100 }, { prix: 50 }];\n\n  // Act : exécuter le comportement testé\n  const total = calculerTotal(panier, 0.1);\n\n  // Assert : vérifier le résultat\n  expect(total).toBe(135);\n});`,
      },
      {
        kind: "list",
        items: [
          "`describe(\"panier\", ...)` : regroupe les tests d'un même sujet — le rapport devient une documentation.",
          "`it(\"fait ceci quand cela\", ...)` : un test = un comportement — le nom décrit le comportement attendu, pas l'implémentation.",
          "Un seul `expect` logique par test : quand il échoue, on sait exactement quel comportement est cassé.",
          "Nommage : `it(\"retourne 0 pour un panier vide\")` se lit comme une spécification — un bon nom évite de lire le corps.",
        ],
      },
    ],
  },
  {
    id: "assertions",
    title: "Assertions : le vocabulaire de expect",
    level: 2,
    intro:
      "Les matchers essentiels : égalité, contenu, exceptions — et leurs pièges.",
    blocks: [
      {
        kind: "table",
        headers: ["Matcher", "Vérifie", "Piège"],
        rows: [
          ["`toBe(5)`", "Égalité stricte (`===`)", "Ne pas l'utiliser sur des objets"],
          ["`toEqual({...})`", "Égalité profonde des objets", "Le bon choix pour les objets/tableaux"],
          ["`toContain(\"x\")`", "Présence dans un tableau ou une chaîne", "—"],
          ["`toBeTruthy()` / `toBeFalsy()`", "Valeur truthy/falsy", "Préférer un matcher précis quand possible"],
          ["`toThrow()`", "La fonction lève une erreur", "Passer une fonction, pas son résultat : `expect(() => f()).toThrow()`"],
          ["`toMatchSnapshot()`", "Correspond au snapshot enregistré", "À relire à chaque mise à jour, pas à valider aveuglément"],
        ],
      },
      {
        kind: "text",
        text: "Le piège classique : `expect(obj).toBe(obj2)` sur deux objets identiques échoue — `toBe` compare les références, `toEqual` compare le contenu. Pour les erreurs : toujours envelopper l'appel dans une fonction, sinon l'exception est levée avant qu'`expect` ne la voie.",
      },
    ],
  },
  {
    id: "mocks-bases",
    title: "Mocks : isoler l'unité testée",
    level: 2,
    intro:
      "Tester une fonction sans appeler le réseau ou la base : les fonctions simulées.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Simuler une dépendance avec Vitest",
        code: `import { vi, it, expect } from "vitest";\nimport { getNomComplet } from "./utilisateur";\nimport { api } from "./api";\n\n// Remplace api.getUtilisateur par une version simulée\nvi.spyOn(api, "getUtilisateur").mockResolvedValue({ prenom: "Ada", nom: "Lovelace" });\n\nit("compose le nom complet", async () => {\n  expect(await getNomComplet(1)).toBe("Ada Lovelace");\n  expect(api.getUtilisateur).toHaveBeenCalledWith(1);\n});`,
      },
      {
        kind: "list",
        items: [
          "Pourquoi mocker : un test unitaire ne doit pas dépendre du réseau, d'une base ou d'une API tierce — sinon il est lent et fragile.",
          "`vi.fn()` : une fonction vide qui enregistre ses appels — pour vérifier qu'elle a été appelée, avec quels arguments.",
          "`vi.spyOn(obj, \"methode\")` : espionne une méthode réelle et permet de la simuler.",
          "`mockResolvedValue` : simule une promesse résolue — pour les dépendances async.",
          "Règle : mocker les frontières (réseau, disque, temps), pas la logique métier.",
        ],
      },
    ],
  },
  {
    id: "tests-async",
    title: "Tester le code asynchrone",
    level: 2,
    intro:
      "Promesses, async/await et timers : les patterns pour tester l'asynchrone sans flakiness.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Tests async et timers simulés",
        code: `it("charge l'utilisateur", async () => {\n  const user = await chargerUtilisateur(1);  // await suffit\n  expect(user.nom).toBe("Lovelace");\n});\n\nit("rejette sur erreur réseau", async () => {\n  await expect(chargerUtilisateur(999)).rejects.toThrow();\n});`,
      },
      {
        kind: "list",
        items: [
          "Test `async` + `await` : le pattern standard — le testeur attend la fin de la promesse.",
          "`.rejects` : pour vérifier qu'une promesse rejette — l'équivalent async de `toThrow()`.",
          "Ne jamais oublier le `return`/`await` : un test async sans attente passe toujours au vert — le pire faux positif.",
          "Timers : `vi.useFakeTimers()` simule `setTimeout`/`setInterval` — tester le debounce sans attendre réellement.",
        ],
      },
    ],
  },
  {
    id: "couverture",
    title: "Couverture de code",
    level: 2,
    intro:
      "Mesurer ce qui est testé : utile comme indicateur, dangereux comme objectif.",
    blocks: [
      {
        kind: "command",
        label: "Lancer avec couverture",
        command: "npx vitest run --coverage",
        why: "Exécute les tests en mesurant la couverture : pourcentage de lignes, fonctions et branches exécutées. Nécessite le provider de couverture (`@vitest/coverage-v8`). Le rapport HTML montre les lignes non couvertes.",
        verify: "ls coverage/",
      },
      {
        kind: "list",
        items: [
          "Lignes / branches / fonctions : trois métriques — les branches (if/else) sont les plus révélatrices.",
          "100 % de couverture ≠ 100 % testé : on peut exécuter chaque ligne sans vérifier aucun comportement.",
          "Usage sain : détecter les zones non testées, pas imposer un seuil arbitraire qui pousse à écrire des tests vides.",
          "Seuils en CI (`--coverage.thresholds`) : un garde-fou contre les régressions de couverture, pas un objectif.",
        ],
      },
    ],
  },
  {
    id: "debugging-tests",
    title: "Debugging : quand un test échoue",
    level: 2,
    intro:
      "Lire un échec de test comme un diagnostic : attendu vs reçu, et les techniques d'isolation.",
    blocks: [
      {
        kind: "fields",
        title: "Techniques",
        fields: [
          {
            label: "Lire le diff",
            value:
              "Le rapport affiche attendu vs reçu avec un diff : 90 % du diagnostic est là. Chercher la première différence, pas la dernière.",
          },
          {
            label: "Isoler avec .only",
            value:
              "`it.only(...)` ou `describe.only(...)` n'exécute que ce test — pour debugger sans le bruit des autres. À retirer avant de committer.",
          },
          {
            label: "Mode verbose",
            value:
              "`--reporter=verbose` affiche chaque test individuellement : utile pour repérer lequel bloque ou ralentit la suite.",
          },
          {
            label: "console.log ciblé",
            value:
              "Autorisé en debug, interdit en commit : un log oublié pollue les rapports CI.",
          },
        ],
      },
      {
        kind: "text",
        text: "Réflexe : avant de corriger le code, s'assurer que c'est bien le code qui est faux et pas le test. Un test qui échoue après un changement volontaire du comportement doit être mis à jour — pas « réparé » en trichant sur l'assertion.",
      },
    ],
  },
  {
    id: "tests-composants",
    title: "Tester les composants",
    level: 2,
    intro:
      "Tester une interface comme un utilisateur : Testing Library et ses requêtes.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Test d'un composant React (Testing Library)",
        code: `import { render, screen } from "@testing-library/react";\nimport userEvent from "@testing-library/user-event";\nimport { Compteur } from "./Compteur";\n\nit("incrémente au clic", async () => {\n  render(<Compteur />);\n  await userEvent.click(screen.getByRole("button", { name: "Incrémenter" }));\n  expect(screen.getByText("Compteur : 1")).toBeInTheDocument();\n});`,
      },
      {
        kind: "list",
        items: [
          "Principe : interroger le DOM comme un utilisateur (`getByRole`, `getByText`) — pas les détails d'implémentation.",
          "`userEvent` : simule des interactions réalistes (clic, frappe) plutôt que des événements bas niveau.",
          "Ce qu'on teste : le comportement visible (texte affiché, interaction) — pas l'état interne du composant.",
          "Installation : `@testing-library/react` (+ `@testing-library/user-event`) en devDependencies.",
        ],
      },
    ],
  },
  {
    id: "tests-e2e-bases",
    title: "Tests E2E : les bases avec Playwright",
    level: 2,
    intro:
      "Piloter un vrai navigateur : le premier test de parcours utilisateur.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Premier test Playwright",
        code: `import { test, expect } from "@playwright/test";\n\ntest("la page d'accueil affiche le titre", async ({ page }) => {\n  await page.goto("http://localhost:5173");\n  await expect(page.getByRole("heading", { name: "Bienvenue" })).toBeVisible();\n});`,
      },
      {
        kind: "command",
        label: "Lancer les tests E2E",
        command: "npx playwright test",
        why: "Exécute les tests du dossier configuré dans de vrais navigateurs (Chromium par défaut). Les assertions auto-attendent : `toBeVisible()` réessaie jusqu'au timeout au lieu d'échouer immédiatement.",
        verify: "npx playwright test --list",
      },
      {
        kind: "list",
        items: [
          "Auto-wait : Playwright attend que les éléments soient actionnables — fini les `sleep()` arbitraires, première source de flakiness.",
          "Localisateurs : `getByRole`, `getByText`, `getByTestId` — préférer les rôles sémantiques, stables face aux changements de style.",
          "Que tester en e2e : les parcours critiques (inscription, paiement, connexion) — pas tout.",
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro:
      "Quatre projets de difficulté croissante, de la fonction pure au pipeline CI complet.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Bibliothèque testée",
        fields: [
          { label: "Compétences requises", value: "Vitest, assertions, describe/it" },
          { label: "Ce que vous construisez", value: "Une petite bibliothèque utilitaire (dates, chaînes) avec 100 % de fonctions testées" },
          { label: "Ce que vous apprenez", value: "Écrire des tests lisibles, nommer les comportements, viser les cas limites" },
          { label: "Difficulté attendue", value: "Faible — quelques heures" },
          { label: "Projet suivant", value: "API testée" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — API testée",
        fields: [
          { label: "Compétences requises", value: "Mocks, tests async, tests d'intégration" },
          { label: "Ce que vous construisez", value: "Une API REST avec tests d'intégration (routes + base de test)" },
          { label: "Ce que vous apprenez", value: "Isoler les dépendances, tester les erreurs, fixtures de base de données" },
          { label: "Difficulté attendue", value: "Moyenne — quelques jours" },
          { label: "Projet suivant", value: "E2E critiques" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Parcours E2E critiques",
        fields: [
          { label: "Compétences requises", value: "Playwright, localisateurs, CI" },
          { label: "Ce que vous construisez", value: "Les parcours critiques d'une app (inscription → achat) testés en e2e" },
          { label: "Ce que vous apprenez", value: "Stabilité des tests e2e, données de test, rapports" },
          { label: "Difficulté attendue", value: "Élevée — une à deux semaines" },
          { label: "Projet suivant", value: "Stratégie complète" },
        ],
      },
      {
        kind: "fields",
        title: "Professionnel — Stratégie complète en CI",
        fields: [
          { label: "Compétences requises", value: "Tout le programme : pyramide, CI, qualité" },
          { label: "Ce que vous construisez", value: "Un projet avec pyramide complète, seuils de couverture, tests en CI bloquante" },
          { label: "Ce que vous apprenez", value: "Équilibrer les niveaux, temps d'exécution, culture du test en équipe" },
          { label: "Difficulté attendue", value: "Professionnelle — plusieurs semaines" },
          { label: "Projet suivant", value: "Contribuer les tests d'un projet open source" },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "tdd",
    title: "TDD : Test-Driven Development",
    level: 3,
    intro:
      "Écrire le test avant le code : le cycle rouge → vert → refactor, ses bénéfices et ses limites.",
    blocks: [
      {
        kind: "diagram",
        title: "Le cycle TDD",
        lines: [
          "ROUGE  : écrire un test qui échoue (le comportement n'existe pas)",
          "  │",
          "VERT   : écrire le code minimal qui fait passer le test",
          "  │",
          "REFACTOR : nettoyer le code, les tests restent verts",
          "  │",
          "→ recommencer pour le comportement suivant",
        ],
      },
      {
        kind: "text",
        text: "Bénéfices réels : le test prouve qu'il teste quelque chose (il a été rouge), le design émerge testable, la régression est impossible par construction. Limites honnêtes : contre-productif pour l'exploration (spike d'abord, tests après) et pour les interfaces visuelles. Le TDD est une discipline de design, pas une religion.",
      },
    ],
  },
  {
    id: "test-doubles",
    title: "Test doubles : mocks, stubs, spies, fakes",
    level: 3,
    intro:
      "Le vocabulaire précis des doublures : chaque type a son usage.",
    blocks: [
      {
        kind: "table",
        headers: ["Type", "Rôle", "Exemple"],
        rows: [
          ["Dummy", "Bouche-trou jamais utilisé", "Paramètre obligatoire mais ignoré"],
          ["Stub", "Retourne des réponses programmées", "API qui retourne un utilisateur fixe"],
          ["Spy", "Enregistre les appels", "Vérifier que `sendEmail` a été appelé"],
          ["Mock", "Vérifie les interactions et les réponses", "`expect(mock).toHaveBeenCalledWith(...)`"],
          ["Fake", "Implémentation simplifiée fonctionnelle", "Base de données en mémoire"],
        ],
      },
      {
        kind: "text",
        text: "En pratique, `vi.fn()` couvre stub/spy/mock selon l'usage. Le fake (ex. fausse implémentation en mémoire) est sous-utilisé : il teste plus de comportement réel qu'un mock, pour un coût modéré. Règle : préférer le fake au mock quand c'est possible — on teste alors du vrai comportement.",
      },
    ],
  },
  {
    id: "fixtures",
    title: "Fixtures et hooks",
    level: 3,
    intro:
      "Préparer le contexte des tests sans duplication : `beforeEach`, factories et builders.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Hooks et factory",
        code: `import { beforeEach, vi } from "vitest";\n\nbeforeEach(() => {\n  vi.clearAllMocks();  // réinitialise les mocks entre les tests\n});\n\n// Factory : des données valides par défaut, surchargeables\nfunction creerUtilisateur(surcharge = {}) {\n  return { id: 1, nom: "Lovelace", email: "ada@exemple.com", ...surcharge };\n}`,
      },
      {
        kind: "list",
        items: [
          "`beforeEach` : réinitialiser l'état partagé (mocks, base de test) — chaque test doit être indépendant.",
          "`afterEach`/`afterAll` : nettoyer (fermer connexions, restaurer).",
          "Factory plutôt que fixtures globales : chaque test déclare ce dont il a besoin, avec des valeurs sensibles par défaut.",
          "Tests indépendants et ordonnables : un test ne doit jamais dépendre de l'exécution d'un autre.",
        ],
      },
    ],
  },
  {
    id: "tests-integration",
    title: "Tests d'intégration",
    level: 3,
    intro:
      "Tester les modules ensemble : là où les mocks s'arrêtent et où les vrais bugs se cachent.",
    blocks: [
      {
        kind: "list",
        items: [
          "Définition : plusieurs unités réelles ensemble, frontières simulées au minimum (ex. service + vraie base de test, API externe mockée).",
          "Base de données de test : base dédiée, migrations appliquées, transactions rollbackées entre les tests — jamais la base de dev.",
          "Contrats : vérifier les formats échangés (schémas JSON, codes HTTP) — la plupart des bugs d'intégration sont des malentendus de format.",
          "Équilibre : assez d'intégration pour attraper les bugs de câblage, pas tant que la suite devient lente.",
        ],
      },
    ],
  },
  {
    id: "tests-api",
    title: "Tester une API HTTP",
    level: 3,
    intro:
      "Tester les routes sans lancer de serveur : supertest et les assertions HTTP.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Test d'API avec supertest",
        code: `import request from "supertest";\nimport { app } from "./app";\n\nit("GET /utilisateurs retourne la liste", async () => {\n  const res = await request(app).get("/utilisateurs");\n  expect(res.status).toBe(200);\n  expect(res.body).toEqual(expect.arrayContaining([\n    expect.objectContaining({ nom: "Lovelace" }),\n  ]));\n});\n\nit("POST /utilisateurs valide le corps", async () => {\n  const res = await request(app).post("/utilisateurs").send({});\n  expect(res.status).toBe(400);\n});`,
      },
      {
        kind: "text",
        text: "Supertest injecte des requêtes HTTP dans l'application Express/Fastify sans port réseau : rapide et sans flakiness. On teste les cas nominaux, les erreurs de validation (400), l'authentification (401) et les ressources inexistantes (404).",
      },
    ],
  },
  {
    id: "snapshot-testing",
    title: "Tests par snapshot",
    level: 3,
    intro:
      "Figer une sortie complexe : puissant pour détecter les changements, dangereux en aveugle.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Snapshot d'un composant",
        code: `it("rend la carte utilisateur", () => {\n  const { container } = render(<CarteUtilisateur user={user} />);\n  expect(container.firstChild).toMatchSnapshot();\n});`,
      },
      {
        kind: "list",
        items: [
          "Principe : la première exécution enregistre la sortie ; les suivantes comparent — tout changement échoue.",
          "Mise à jour : `-u` régénère les snapshots — à n'utiliser qu'après avoir vérifié que le changement est voulu.",
          "Le piège : valider un snapshot sans le relire fige potentiellement un bug — le snapshot doit être relu comme du code.",
          "Bon usage : sorties complexes et stables (rendus, sérialisations) — pas la logique métier.",
        ],
      },
    ],
  },
  {
    id: "property-based",
    title: "Tests par propriétés (property-based)",
    level: 3,
    intro:
      "Au lieu d'exemples : des propriétés vérifiées sur des centaines d'entrées générées.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Propriété avec fast-check",
        code: `import fc from "fast-check";\n\nit("le tri est idempotent et ordonné", () => {\n  fc.assert(\n    fc.property(fc.array(fc.integer()), (arr) => {\n      const trie = trier(arr);\n      expect(estTrie(trie)).toBe(true);\n      expect(trier(trie)).toEqual(trie);  // idempotence\n    })\n  );\n});`,
      },
      {
        kind: "text",
        text: "On énonce des propriétés universelles (« le tri d'un tri est identique ») et la bibliothèque génère des centaines de cas, y compris aux limites. Redoutable pour les fonctions pures (parsers, tris, encodages). La bibliothèque de référence en JS est fast-check.",
      },
    ],
  },
  {
    id: "tests-contrat",
    title: "Tests de contrat",
    level: 3,
    intro:
      "Quand deux équipes partagent une API : tester le contrat plutôt que l'intégration complète.",
    blocks: [
      {
        kind: "list",
        items: [
          "Problème : le frontend suppose un format que le backend change — détecté seulement en intégration ou en production.",
          "Solution : le consommateur publie ses attentes (contrat), le fournisseur les vérifie dans sa CI.",
          "Bénéfice : chaque équipe teste de son côté, vite — sans environnement intégré partagé.",
          "À petite échelle : un schéma partagé (OpenAPI, zod) validé des deux côtés joue déjà ce rôle.",
        ],
      },
    ],
  },
  {
    id: "bdd",
    title: "BDD : tests en langage naturel",
    level: 3,
    intro:
      "Écrire les comportements en Gherkin pour les rendre lisibles par les non-développeurs.",
    blocks: [
      {
        kind: "code",
        language: "gherkin",
        title: "Scénario Gherkin",
        code: `Fonctionnalité: Connexion\n\n  Scénario: Connexion réussie\n    Étant donné un utilisateur "ada@exemple.com" avec le mot de passe "secret"\n    Quand elle se connecte avec ces identifiants\n    Alors elle voit le tableau de bord`,
      },
      {
        kind: "text",
        text: "Le BDD (Cucumber et équivalents) a du sens quand le métier participe vraiment à l'écriture des scénarios. Sinon, c'est une couche de traduction coûteuse au-dessus de tests e2e ordinaires — à réserver aux contextes où la collaboration le justifie.",
      },
    ],
  },
  {
    id: "mutation-testing",
    title: "Mutation testing",
    level: 3,
    intro:
      "Tester les tests : des mutants (bugs artificiels) vérifient que la suite détecte vraiment les régressions.",
    blocks: [
      {
        kind: "list",
        items: [
          "Principe : l'outil modifie le code (`+` → `-`, `true` → `false`) et relance les tests — chaque mutant non tué révèle un test insuffisant.",
          "Score de mutation : pourcentage de mutants tués — une mesure de qualité des tests bien plus fine que la couverture.",
          "Coût : lent (N mutants × suite complète) — à réserver aux modules critiques, en CI planifiée.",
          "Outil JS : Stryker — le mutant testing de référence pour l'écosystème JavaScript.",
        ],
      },
    ],
  },
  {
    id: "e2e-avance",
    title: "E2E avancé avec Playwright",
    level: 3,
    intro:
      "Stabiliser les tests e2e : fixtures, traces et bonnes pratiques d'écriture.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Configuration Playwright typique",
        code: `import { defineConfig } from "@playwright/test";\n\nexport default defineConfig({\n  testDir: "./e2e",\n  use: { baseURL: "http://localhost:5173", trace: "on-first-retry" },\n  projects: [{ name: "chromium", use: { browserName: "chromium" } }],\n});`,
      },
      {
        kind: "command",
        label: "Voir le rapport HTML",
        command: "npx playwright show-report",
        why: "Ouvre le rapport HTML du dernier run : chaque test avec sa trace (captures, DOM, requêtes réseau) — l'outil principal pour diagnostiquer un e2e qui échoue en CI.",
      },
      {
        kind: "list",
        items: [
          "`trace: \"on-first-retry\"` : enregistre une trace rejouable quand un test échoue — le debugging e2e sans deviner.",
          "Page Object ou fixtures : encapsuler les sélecteurs et actions réutilisables — un changement d'UI ne doit pas casser 50 tests.",
          "Données : seed déterministe avant chaque test, nettoyage après — jamais de dépendance aux données existantes.",
          "Réseau : mocker les API tierces (`page.route`) — un e2e ne doit pas dépendre d'un service externe.",
        ],
      },
    ],
  },
  {
    id: "tests-visuels",
    title: "Tests visuels",
    level: 3,
    intro:
      "Comparer des captures d'écran : attraper les régressions que les assertions ne voient pas.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Comparaison de capture avec Playwright",
        code: `test("la page d'accueil est stable visuellement", async ({ page }) => {\n  await page.goto("/");\n  await expect(page).toHaveScreenshot("accueil.png");\n});`,
      },
      {
        kind: "text",
        text: "La première exécution enregistre la capture de référence ; les suivantes comparent pixel par pixel (avec tolérance). Indispensable pour les design systems et les pages marketing. Limites : faux positifs sur les contenus dynamiques (dates, animations) — figer ou masquer ces zones.",
      },
    ],
  },
  {
    id: "tests-accessibilite",
    title: "Tests d'accessibilité automatisés",
    level: 3,
    intro:
      "Détecter automatiquement une partie des problèmes d'accessibilité avec axe-core.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Scan axe dans un test Playwright",
        code: `import AxeBuilder from "@axe-core/playwright";\n\ntest("la page ne contient pas de violation critique", async ({ page }) => {\n  await page.goto("/");\n  const resultats = await new AxeBuilder({ page }).analyze();\n  expect(resultats.violations).toEqual([]);\n});`,
      },
      {
        kind: "text",
        text: "Axe détecte ~30 % des problèmes d'accessibilité (contrastes, labels manquants, structure des titres) — le reste exige des tests manuels au clavier et avec lecteur d'écran. L'automatisation n'est qu'un filet, pas une certification.",
      },
    ],
  },
  {
    id: "tests-performance",
    title: "Tests de performance et de charge",
    level: 3,
    intro:
      "Vérifier le comportement sous charge : les concepts, sans confondre avec les tests fonctionnels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Test de charge : N utilisateurs simultanés — le système tient-il le débit nominal ?",
          "Test de stress : au-delà du nominal — où casse-t-il, et comment (dégradation gracieuse ou effondrement) ?",
          "Test d'endurance : charge nominale prolongée — fuites mémoire, connexions non libérées.",
          "Outil : k6 (scripts JS, `k6 run`) — la référence moderne, s'intègre en CI.",
          "Métriques : latence p95/p99, taux d'erreur, débit — jamais de moyenne seule.",
          "Environnement : tester sur un environnement représentatif — un test de charge sur un laptop ne prouve rien.",
        ],
      },
    ],
  },
  {
    id: "flaky-tests",
    title: "Tests instables (flaky)",
    level: 3,
    intro:
      "Le fléau des suites de tests : un test qui échoue aléatoirement détruit la confiance.",
    blocks: [
      {
        kind: "fields",
        title: "Causes et remèdes",
        fields: [
          {
            label: "Timing / attentes arbitraires",
            value:
              "`sleep(1000)` puis assertion : échoue sur machine lente. Remède : attentes conditionnelles (auto-wait Playwright, `waitFor`).",
          },
          {
            label: "État partagé",
            value:
              "Tests qui dépendent de l'ordre d'exécution ou de données résiduelles. Remède : isolation totale, seed et cleanup par test.",
          },
          {
            label: "Dépendances externes",
            value:
              "API tierce, horloge, aléatoire. Remède : mocker les frontières, figer le temps, fixer les graines.",
          },
          {
            label: "Parallélisme",
            value:
              "Tests qui se marchent dessus en parallèle (même fichier, même port). Remède : ressources isolées par worker.",
          },
        ],
      },
      {
        kind: "text",
        text: "Politique : un test flaky est mis en quarantaine immédiatement (marqué, investigué) — jamais « relancé jusqu'au vert ». Le retry systématique masque les vrais bugs et habitue l'équipe à ignorer les échecs.",
      },
    ],
  },
  {
    id: "strategie-ci",
    title: "Les tests en CI",
    level: 3,
    intro:
      "Faire des tests un garde-fou automatique : pipeline, parallélisation et feedback rapide.",
    blocks: [
      {
        kind: "diagram",
        title: "Pipeline de test typique",
        lines: [
          "Pull request",
          "  → lint + typecheck (rapide, bloque tôt)",
          "  → tests unitaires (parallélisés par fichier)",
          "  → tests d'intégration (services de test)",
          "  → build",
          "  → tests e2e critiques (sur l'app construite)",
          "Merge bloqué si rouge",
        ],
      },
      {
        kind: "list",
        items: [
          "Fail fast : les vérifications rapides d'abord — inutile de lancer les e2e si le lint échoue.",
          "Parallélisation : sharder la suite (Vitest et Playwright le font nativement) — viser un feedback sous 10 minutes.",
          "Artefacts : rapports et traces publiés sur échec — diagnostiquer sans relancer.",
          "Cache : dépendances et navigateurs en cache — l'installation ne doit pas dominer le temps de CI.",
        ],
      },
    ],
  },
  {
    id: "pyramide-vs-trophy",
    title: "Pyramide vs trophée",
    level: 3,
    intro:
      "Nuancer la pyramide : le « testing trophy » donne plus de place aux tests d'intégration.",
    blocks: [
      {
        kind: "diagram",
        title: "Le trophée des tests (Kent C. Dodds)",
        lines: [
          "        ____E2E____       (peu)",
          "       /            \\",
          "      |  Intégration  |   (beaucoup : le meilleur ROI)",
          "      |_______________|",
          "      |   Unitaires   |   (moins qu'avant)",
          "      |___Statique____|   (lint, types : le socle)",
          "      |_______________|",
        ],
      },
      {
        kind: "text",
        text: "L'argument : les tests d'intégration (composant + dépendances réelles légères) offrent le meilleur rapport confiance/coût — ils testent du comportement réel sans la fragilité des e2e. La pyramide reste valable ; le trophée affine la répartition pour les applications frontend modernes. Dans les deux modèles, le statique (lint, types) est le socle gratuit.",
      },
    ],
  },
  {
    id: "isolation-dependances",
    title: "Isolation des dépendances",
    level: 3,
    intro:
      "L'art de couper les dépendances : injection, ports/adapters et seams.",
    blocks: [
      {
        kind: "list",
        items: [
          "Injection de dépendances : passer les collaborateurs en paramètres plutôt que les importer en dur — le code devient testable sans magie.",
          "Ports/adapters : la logique métier parle à des interfaces, les adapters implémentent (vraie base, fausse base en mémoire).",
          "Seam : l'endroit où l'on peut substituer — une fonction pure avec ses dépendances en paramètres est un seam naturel.",
          "Ne pas mocker ce qu'on ne possède pas : envelopper les librairies tierces dans un adapter maison avant de les mocker.",
        ],
      },
    ],
  },
  {
    id: "tests-base-de-donnees",
    title: "Tester avec une base de données",
    level: 3,
    intro:
      "Les patterns pour des tests base de données rapides et fiables.",
    blocks: [
      {
        kind: "list",
        items: [
          "Base dédiée : jamais la base de dev, jamais la prod — une base de test créée par les migrations.",
          "Transaction par test : ouvrir une transaction, rollback à la fin — isolation parfaite, rapide.",
          "Seed minimal : seeder uniquement les données nécessaires au test — pas de dump géant.",
          "Conteneurs : Testcontainers lance une vraie base (PostgreSQL…) éphémère en Docker — le réalisme sans l'infrastructure.",
          "SQLite en mémoire : rapide pour la logique, mais attention aux différences de dialecte SQL.",
        ],
      },
    ],
  },
  {
    id: "vitest-config",
    title: "Configurer Vitest",
    level: 3,
    intro:
      "Le fichier `vitest.config.ts` : environnement, setup et couverture.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "vitest.config.ts typique",
        code: `import { defineConfig } from "vitest/config";\n\nexport default defineConfig({\n  test: {\n    environment: "node",\n    setupFiles: ["./tests/setup.ts"],\n    coverage: {\n      provider: "v8",\n      reporter: ["text", "html"],\n    },\n  },\n});`,
      },
      {
        kind: "list",
        items: [
          "`environment: \"node\"` par défaut ; `\"jsdom\"` pour tester du DOM (nécessite le paquet `jsdom`).",
          "`setupFiles` : exécuté avant chaque fichier de test — mocks globaux, matchers custom.",
          "`include` : motif des fichiers de test (`**/*.test.ts` par défaut).",
          "Même fichier que Vite : dans un projet Vite, la config Vitest fusionne avec `vite.config.ts`.",
        ],
      },
    ],
  },
  {
    id: "jest-config",
    title: "Configurer Jest",
    level: 3,
    intro:
      "Le fichier `jest.config` : preset TypeScript et environnements.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "jest.config.js avec ts-jest",
        code: `module.exports = {\n  preset: "ts-jest",\n  testEnvironment: "node",\n  testMatch: ["**/*.test.ts"],\n  setupFilesAfterEach: ["./tests/setup.ts"],\n};`,
      },
      {
        kind: "list",
        items: [
          "`preset: \"ts-jest\"` : compile le TypeScript à la volée — nécessite les paquets `ts-jest` et `@types/jest`.",
          "`testEnvironment: \"jsdom\"` : pour les tests DOM (nécessite `jest-environment-jsdom`).",
          "Alternative moderne : `@swc/jest` à la place de ts-jest — plus rapide.",
          "Règle : configurer une fois, versionner le fichier — toute l'équipe et la CI utilisent la même config.",
        ],
      },
    ],
  },
  {
    id: "playwright-config-avance",
    title: "Configurer Playwright en profondeur",
    level: 3,
    intro:
      "Projets multi-navigateurs, retries et serveur de dev : la config e2e complète.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "playwright.config.ts complète",
        code: `import { defineConfig, devices } from "@playwright/test";\n\nexport default defineConfig({\n  testDir: "./e2e",\n  retries: process.env.CI ? 2 : 0,\n  use: { baseURL: "http://localhost:5173", trace: "on-first-retry" },\n  webServer: {\n    command: "npm run dev",\n    url: "http://localhost:5173",\n    reuseExistingServer: !process.env.CI,\n  },\n  projects: [\n    { name: "chromium", use: { ...devices["Desktop Chrome"] } },\n    { name: "mobile", use: { ...devices["Pixel 7"] } },\n  ],\n});`,
      },
      {
        kind: "list",
        items: [
          "`webServer` : Playwright démarre l'app avant les tests — la CI n'a rien à orchestrer.",
          "`retries` : 2 en CI pour absorber l'aléa infra — jamais comme excuse à des tests flaky.",
          "`devices` : presets navigateurs/appareils — tester mobile sans émulateur manuel.",
          "Shard en CI : `--shard=1/3` répartit sur plusieurs runners.",
        ],
      },
    ],
  },
  {
    id: "choisir-outil",
    title: "Choisir son testeur (factuel)",
    level: 3,
    intro:
      "Vitest, Jest, node:test : les différences factuelles pour choisir en connaissance de cause.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Vitest", "Jest", "node:test"],
        rows: [
          ["API", "Compatible Jest (`describe/it/expect`)", "La référence historique", "API native Node (`node:test`, `node:assert`)"],
          ["Vitesse", "Très rapide (Vite, workers)", "Plus lent au démarrage", "Rapide, zéro dépendance"],
          ["Écosystème", "Jeune, en croissance", "Immense (matchers, tooling)", "Minimaliste"],
          ["Cas d'usage", "Projets Vite / modernes", "Projets existants, besoins exotiques", "Librairies sans dépendances"],
        ],
      },
      {
        kind: "text",
        text: "Pas de supériorité absolue : Vitest est le choix naturel d'un projet Vite neuf, Jest reste pertinent là où son écosystème est requis, `node:test` suffit pour une bibliothèque qui refuse les dépendances. L'important n'est pas l'outil mais la discipline.",
      },
    ],
  },
  {
    id: "tests-securite",
    title: "Tests et sécurité",
    level: 3,
    intro:
      "Ce que les tests apportent (et n'apportent pas) à la sécurité.",
    blocks: [
      {
        kind: "list",
        items: [
          "Tests de validation : injection, XSS, entrées malformées — chaque faille corrigée devient un test de non-régression.",
          "Authentification/autorisation : tester les 401/403 systématiquement — les oublis d'autorisation sont des failles.",
          "Dépendances : `npm audit` en CI — les tests ne détectent pas les vulnérabilités des librairies.",
          "Limite : les tests vérifient le connu — l'audit de sécurité et les tests d'intrusion restent indispensables.",
        ],
      },
    ],
  },
  {
    id: "revue-tests",
    title: "Relire les tests en revue de code",
    level: 3,
    intro:
      "Les tests se relisent comme le code : la checklist de revue.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le test échoue-t-il sans le fix ? Un test qui passe avant et après ne prouve rien.",
          "Le nom décrit-il un comportement ? `it(\"marche\")` n'aide personne dans six mois.",
          "Teste-t-on le comportement ou l'implémentation ? Un refactor ne devrait pas casser les tests.",
          "Les mocks sont-ils minimaux ? Trop de mocks = test qui vérifie ses propres simulations.",
          "Y a-t-il des `sleep`, des `.only`, des `console.log` oubliés ?",
          "Les cas limites sont-ils couverts : vide, null, extrêmes, erreurs ?",
        ],
      },
    ],
  },
  {
    id: "debugging-avance",
    title: "Debugging avancé",
    level: 3,
    intro:
      "Quand la suite est lente ou mystérieuse : profiler, isoler, bissecter.",
    blocks: [
      {
        kind: "list",
        items: [
          "Test lent : `--reporter=verbose` + durées — les 5 % de tests les plus lents coûtent souvent 50 % du temps.",
          "Bissecter : `it.only` + dichotomie sur les fichiers pour localiser un test qui fait planter la suite.",
          "Fuite de handles : processus qui ne se termine pas — timers non nettoyés, serveurs non fermés (`afterAll`).",
          "Debug Node : `node --inspect` + `npx vitest run --inspect` — points d'arrêt dans le test.",
          "Playwright : `npx playwright test --debug` ouvre l'inspecteur pas à pas ; `--headed` montre le navigateur.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes-avancees",
    title: "Erreurs courantes (avancé)",
    level: 3,
    intro:
      "Les anti-patterns qui survivent aux débuts et pourrissent les suites.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Tester l'implémentation",
            value:
              "Vérifier les appels internes plutôt que le résultat observable : le moindre refactor casse tout. Tester le comportement public.",
          },
          {
            label: "Mocks excessifs",
            value:
              "Tout simuler, y compris la logique métier : le test passe toujours et ne protège de rien. Mocker les frontières, pas le code.",
          },
          {
            label: "Tests géants",
            value:
              "Un test de 100 lignes qui vérifie tout : illisible, fragile. Un comportement par test.",
          },
          {
            label: "Logique dans les tests",
            value:
              "Boucles et conditions dans le test : qui teste le test ? Des tests linéaires et explicites.",
          },
          {
            label: "Données magiques partagées",
            value:
              "Une fixture globale modifiée par un test en casse un autre. Factories locales, état isolé.",
          },
          {
            label: "Ignorer les tests lents",
            value:
              "Suite de 20 minutes → on ne la lance plus → elle ne sert plus. Budget temps et parallélisation.",
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
      "La checklist d'une culture du test saine, en équipe.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un comportement par test, nommé comme une spécification.",
          "Tests rapides par défaut ; lents isolés et marqués.",
          "Indépendants, ordonnables, déterministes — toujours.",
          "Les tests vivent avec le code : même PR, même revue.",
          "CI bloquante : un main rouge est une urgence, pas une habitude.",
          "Couverture comme indicateur, jamais comme objectif.",
          "Flaky = quarantaine immédiate, pas retry silencieux.",
          "Tester les erreurs autant que les cas nominaux.",
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
          { label: "Vitest", value: "vitest.dev : guide, API, configuration — la référence du testeur moderne." },
          { label: "Jest", value: "jestjs.io : documentation exhaustive du testeur historique." },
          { label: "Playwright", value: "playwright.dev : guides, API des localisateurs, bonnes pratiques e2e." },
          { label: "Testing Library", value: "testing-library.com : la philosophie des tests orientés utilisateur." },
        ],
      },
      {
        kind: "list",
        items: [
          "Lecture : « Test-Driven Development » (Kent Beck) pour la discipline, les articles de Kent C. Dodds pour les tests frontend.",
          "Pratique : ajouter des tests à un projet existant non testé — le vrai exercice.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Les tests maîtrisés, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Automatiser : CI/CD — les tests ne protègent que s'ils tournent à chaque changement.",
          "Typer : TypeScript — les types attrapent une classe d'erreurs que les tests ne couvrent pas.",
          "Mesurer : performance et qualité — les tests de charge et l'analyse statique.",
          "Sécuriser : tests de sécurité, audit de dépendances, OWASP.",
          "Revenir à la roadmap : valider les tests et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

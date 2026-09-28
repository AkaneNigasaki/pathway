import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du « Mode strict » : les vérifications les plus
 * rigoureuses de tsc, flag par flag, et comment les apprivoiser.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_STRICT: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Le mode strict active les vérifications les plus rigoureuses du compilateur : c'est ce qui fait de TypeScript un vrai garde-fou.",
    blocks: [
      {
        kind: "text",
        text: "Le mode strict (`\"strict\": true` dans `tsconfig.json`) active d'un coup tout un ensemble de vérifications : `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`, `strictPropertyInitialization`, et d'autres. Sans lui, TypeScript reste permissif — beaucoup d'erreurs passent inaperçues et le typage n'est qu'un vernis.",
      },
      {
        kind: "text",
        text: "L'idée centrale : déplacer les bugs du moment de l'exécution vers le moment de la compilation. La majorité des erreurs d'exécution JavaScript viennent de valeurs `null` inattendues et de types implicites. Le mode strict force à traiter ces cas explicitement — le code devient plus verbeux à écrire, mais incomparablement plus sûr à exécuter.",
      },
    ],
  },
  {
    id: "cout-des-erreurs",
    title: "Pourquoi le strict rapporte",
    level: 1,
    intro:
      "Une erreur détectée à la compilation coûte une fraction d'une erreur en production.",
    blocks: [
      {
        kind: "diagram",
        title: "Le coût d'une erreur selon le moment de détection",
        lines: [
          "Compilation (tsc)      → quelques secondes, correction immédiate",
          "Tests                  → quelques minutes, contexte frais",
          "Revue de code          → quelques heures, discussion nécessaire",
          "Production             → incident, utilisateurs impactés, urgence",
        ],
      },
      {
        kind: "text",
        text: "Le mode strict déplace toute une classe d'erreurs vers la première ligne — la moins chère. `Cannot read properties of null`, paramètres du mauvais type, propriétés mal initialisées : tout cela devient des erreurs de compilation corrigées en quelques secondes, au lieu d'incidents découverts par les utilisateurs.",
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
      "Ce qu'il faut connaître avant d'activer le mode strict.",
    blocks: [
      {
        kind: "fields",
        title: "Avant le strict",
        fields: [
          {
            label: "Types de base",
            value:
              "string, number, boolean, tableaux, objets : le strict vérifie ces types avec exigence — il faut les connaître.",
          },
          {
            label: "Unions et narrowing",
            value:
              "Le strict force à affiner les unions (`string | null`) par des tests : sans narrowing, le code strict est inécrivable.",
          },
          {
            label: "tsconfig.json",
            value:
              "Savoir où et comment activer les options : le strict se configure dans le fichier du compilateur.",
          },
          {
            label: "Projet qui compile",
            value:
              "Activer le strict sur un projet qui ne compile déjà pas mélange deux chantiers : d'abord un `tsc --noEmit` vert en non-strict.",
          },
        ],
      },
    ],
  },
  {
    id: "activer-strict",
    title: "Activer le mode strict",
    level: 2,
    intro:
      "Une ligne dans `tsconfig.json` : l'activation la plus rentable de tout TypeScript.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "tsconfig.json",
        code: "{\n  \"compilerOptions\": {\n    \"strict\": true\n  }\n}",
      },
      {
        kind: "text",
        text: "`\"strict\": true` est l'interrupteur maître : il active simultanément `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`, `strictBindCallApply`, `strictPropertyInitialization`, `noImplicitThis`, `alwaysStrict` et `useUnknownInCatchVariables`. Sur un nouveau projet, on l'active dès le premier jour — il n'y a aucune raison de s'en priver. Sur un projet existant, on l'active par paliers (voir la section dédiée).",
      },
    ],
  },
  {
    id: "premieres-erreurs",
    title: "Lire les premières erreurs",
    level: 2,
    intro:
      "Le strict parle : apprendre à écouter ses trois messages les plus fréquents.",
    blocks: [
      {
        kind: "command",
        label: "Lister les erreurs du mode strict",
        command: "npx tsc --noEmit",
        why: "Vérifie tout le projet sans émettre de fichiers. Avec `strict: true`, chaque violation devient une erreur listée avec son fichier, sa ligne et son code — c'est la liste de travail pour durcir le projet.",
        verify: "npx tsc --noEmit 2>&1 | wc -l",
      },
      {
        kind: "list",
        items: [
          "`TS7006` — paramètre implicitement `any` : écrire l'annotation manquante.",
          "`TS18048` — valeur possiblement `undefined` : tester avant d'utiliser.",
          "`TS2564` — propriété sans initialiseur : initialiser dans le constructeur ou marquer l'assignation différée.",
          "Chaque erreur est un bug potentiel documenté : les traiter une par une, sans les masquer.",
        ],
      },
    ],
  },
  {
    id: "strictnullchecks-pratique",
    title: "strictNullChecks en pratique",
    level: 2,
    intro:
      "Le flag le plus important : `null` et `undefined` deviennent des cas à traiter.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Avant / après strictNullChecks",
        code: "// Sans strictNullChecks : compile, mais crash possible\nfunction getName(user: { name: string }): string {\n  return user.name.toUpperCase();\n}\ngetName(null as any); // crash à l'exécution\n\n// Avec strictNullChecks : l'absence est explicite\nfunction getNameSafe(user: { name: string } | null): string {\n  if (user === null) return \"Anonyme\";\n  return user.name.toUpperCase(); // user est non-null ici\n}",
      },
      {
        kind: "text",
        text: "Le mécanisme : avec `strictNullChecks`, `null` et `undefined` ont leurs propres types — une variable `string` ne peut pas valoir `null`. Pour exprimer l'absence possible, on écrit `string | null`. Le compilateur force ensuite à tester avant d'utiliser : c'est le narrowing appliqué à la nullabilité.",
      },
    ],
  },
  {
    id: "noimplicitany-pratique",
    title: "noImplicitAny en pratique",
    level: 2,
    intro:
      "Interdire les `any` silencieux : chaque type ambigu doit être déclaré.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "L'erreur TS7006 et sa correction",
        code: "// Erreur TS7006 : le paramètre 'name' a implicitement un type any\nfunction greet(name) {\n  return \"Hello \" + name;\n}\n\n// Correction : annotation explicite\nfunction greetFixed(name: string): string {\n  return \"Hello \" + name;\n}",
      },
      {
        kind: "text",
        text: "Un `any` implicite désactive silencieusement la vérification : le compilateur ne dit rien, mais ne vérifie rien non plus. `noImplicitAny` transforme ce silence en erreur — chaque zone d'ombre doit être éclairée par une annotation explicite. Si le type est vraiment inconnu, `unknown` (pas `any`) est la réponse honnête.",
      },
    ],
  },
  {
    id: "workflow-strict",
    title: "Travailler en mode strict",
    level: 2,
    intro:
      "Le rythme quotidien quand le compilateur est exigeant.",
    blocks: [
      {
        kind: "diagram",
        title: "Boucle de travail stricte",
        lines: [
          "Écrire du code (l'éditeur signale en direct)",
          "     ↓",
          "Erreur de type ? → Lire le message → Corriger le type, pas le compilateur",
          "     ↓",
          "npx tsc --noEmit (vert)",
          "     ↓",
          "Tests (le strict ne remplace pas les tests)",
          "     ↓",
          "Commit",
        ],
      },
      {
        kind: "text",
        text: "Le réflexe fondamental : face à une erreur du strict, on corrige le code — jamais en désactivant l'option. Chaque erreur est une information : elle décrit un cas que le code ne traitait pas. La tentation de « faire taire le compilateur » avec un `as any` ou un `!` est l'anti-pattern numéro un du mode strict.",
      },
    ],
  },
  {
    id: "typecheck-script",
    title: "Le script typecheck",
    level: 2,
    intro:
      "Rendre la vérification stricte automatique et obligatoire.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "package.json",
        code: "{\n  \"scripts\": {\n    \"typecheck\": \"tsc --noEmit\"\n  }\n}",
      },
      {
        kind: "text",
        text: "Le script `typecheck` est la porte d'entrée de la CI : `npm run typecheck` doit passer avant chaque merge. Avec `strict: true` dans le `tsconfig.json`, ce script vérifie le mode strict sur tout le projet — aucune violation ne peut se glisser silencieusement.",
      },
    ],
  },
  {
    id: "editeur-strict",
    title: "L'éditeur en mode strict",
    level: 2,
    intro:
      "VS Code signale les violations en direct : le feedback immédiat.",
    blocks: [
      {
        kind: "list",
        items: [
          "Chaque violation du strict est soulignée pendant la frappe : on corrige au fil de l'écriture, pas en fin de journée.",
          "Le survol d'une erreur affiche son code (`TS18048`) et son explication : cliquer dessus mène à la documentation.",
          "Les actions rapides (« Quick Fix ») proposent parfois la correction : ajouter la garde, l'annotation, l'initialiseur.",
          "Aligner la version TypeScript de VS Code sur celle du projet pour que l'éditeur et `tsc` appliquent exactement les mêmes règles.",
        ],
      },
    ],
  },
  {
    id: "erreurs-frequentes-strict",
    title: "Erreurs fréquentes au début",
    level: 2,
    intro:
      "Les trois erreurs que tout le monde rencontre en activant le strict — et leur correction.",
    blocks: [
      {
        kind: "fields",
        title: "Les classiques",
        fields: [
          {
            label: "Object is possibly 'null' (TS18048)",
            value:
              "Une valeur peut être nulle et vous l'utilisez directement. Correction : tester (`if (x != null)`), ou typer l'absence en `| null` et la traiter.",
          },
          {
            label: "Parameter implicitly has an 'any' type (TS7006)",
            value:
              "Un paramètre sans annotation que le compilateur ne peut pas inférer. Correction : écrire le type explicitement.",
          },
          {
            label: "Property has no initializer (TS2564)",
            value:
              "Une propriété de classe non initialisée dans le constructeur. Correction : l'initialiser, lui donner une valeur par défaut, ou utiliser l'assignation différée (`!`) en dernier recours documenté.",
          },
        ],
      },
    ],
  },
  {
    id: "activer-sur-existant",
    title: "Activer le strict sur l'existant",
    level: 2,
    intro:
      "Un projet non-strict ne devient pas strict en un jour : la méthode par paliers.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Palier 1 — noImplicitAny",
            detail:
              "Activer uniquement `noImplicitAny: true`. Corriger chaque TS7006 : à la fin, plus aucun type implicite dans le projet.",
          },
          {
            title: "Palier 2 — strictNullChecks",
            detail:
              "Activer `strictNullChecks: true`. Le palier le plus long : chaque `null` possible devient visible et doit être traité par des gardes.",
          },
          {
            title: "Palier 3 — strict complet",
            detail:
              "Passer `strict: true`. Les vérifications restantes se corrigent vite une fois les deux premiers paliers passés.",
          },
          {
            title: "Verrouiller",
            detail:
              "Ajouter `npm run typecheck` à la CI : le strict est désormais garanti, aucune régression possible.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-strict",
    title: "Projets strict",
    level: 2,
    intro:
      "Trois chantiers pour apprivoiser le mode strict.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Durcir un module",
        fields: [
          { label: "Skills required", value: "strictNullChecks, noImplicitAny, narrowing" },
          { label: "What you build", value: "La conversion d'un module non-strict en strict, erreur par erreur" },
          { label: "What you learn", value: "Lire les erreurs du strict, écrire des gardes, typer les absences" },
          { label: "Expected difficulty", value: "Faible — quelques heures" },
          { label: "Next project", value: "Zéro non-null assertion" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Zéro non-null assertion",
        fields: [
          { label: "Skills required", value: "Guards, type predicates, règle ESLint no-non-null-assertion" },
          { label: "What you build", value: "L'élimination de tous les `!` d'un projet, remplacés par des gardes" },
          { label: "What you learn", value: "Prouver la non-nullité au lieu de l'affirmer, écrire des guards réutilisables" },
          { label: "Expected difficulty", value: "Moyenne — quelques jours" },
          { label: "Next project", value: "Validation runtime" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Validation aux frontières",
        fields: [
          { label: "Skills required", value: "unknown, type guards, validation de schémas" },
          { label: "What you build", value: "Une couche de validation typée aux frontières du système (API, formulaires)" },
          { label: "What you learn", value: "Typage statique + validation runtime : la combinaison qui élimine les `any`" },
          { label: "Expected difficulty", value: "Élevée — une semaine" },
          { label: "Next project", value: "Activer les options au-delà du strict" },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "strictnullchecks-detail",
    title: "strictNullChecks en détail",
    level: 3,
    intro: "Le flag le plus rentable du strict : anatomie complète.",
    blocks: [
      {
        kind: "text",
        text: "Sans `strictNullChecks`, `null` et `undefined` sont assignables à tout type : `const s: string = null` compile. Avec l'option, ils deviennent des types à part — `string` signifie vraiment « une chaîne, jamais nulle ». Toute absence possible doit être déclarée (`string | null`, `string | undefined`, `string | null | undefined`) et traitée avant usage.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Les trois formes d'absence",
        code: "let a: string | null = null;      // absence explicite nullable\nlet b: string | undefined;        // absence explicite indéfinie\nlet c?: string;                   // propriété/paramètre optionnel (= | undefined)\n\nfunction length(s: string | null): number {\n  if (s === null) return 0;       // garde : après ce test, s est string\n  return s.length;\n}",
      },
    ],
  },
  {
    id: "noimplicitany-detail",
    title: "noImplicitAny en détail",
    level: 3,
    intro: "Chaque zone d'ombre typée explicitement : le flag anti-paresse.",
    blocks: [
      {
        kind: "text",
        text: "`noImplicitAny` interdit au compilateur de « deviner » `any` quand il ne peut pas inférer un type : paramètres de fonction, éléments de tableaux hétérogènes, retours de certaines expressions. Chaque cas devient une erreur TS7006 (ou similaire) qui exige une annotation.",
      },
      {
        kind: "list",
        items: [
          "Le cas le plus fréquent : les paramètres de fonction et de callbacks.",
          "La réponse honnête quand on ne sait pas : `unknown`, pas `any` — `unknown` force la vérification avant usage.",
          "Un `any` explicite reste autorisé : mais il doit être un choix conscient, idéalement commenté.",
        ],
      },
    ],
  },
  {
    id: "strictfunctiontypes",
    title: "strictFunctionTypes",
    level: 3,
    intro: "La variance des fonctions vérifiée strictement : des callbacks sûrs.",
    blocks: [
      {
        kind: "text",
        text: "`strictFunctionTypes` rend la vérification des types de fonctions stricte (contravariance des paramètres) — sauf pour les méthodes, qui restent bivariantes pour des raisons historiques. Concrètement : assigner une fonction qui n'accepte qu'un type plus étroit là où on attend une fonction acceptant un type plus large devient une erreur.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Variance des paramètres",
        code: "type Handler = (event: Event) => void;\n\n// Erreur sous strictFunctionTypes :\n// (event: MouseEvent) ne sait pas traiter tout Event\n// (ex. un KeyboardEvent passé à ce handler)\nconst h: Handler = (event: MouseEvent) => console.log(event.clientX);",
      },
    ],
  },
  {
    id: "strictbindcallapply",
    title: "strictBindCallApply",
    level: 3,
    intro: "`bind`, `call`, `apply` typés : fini les appels bricolés.",
    blocks: [
      {
        kind: "text",
        text: "Avec `strictBindCallApply`, les méthodes `bind`, `call` et `apply` vérifient les arguments contre la signature réelle de la fonction. Sans l'option, `fn.call(obj, mauvaisArg)` passe silencieusement ; avec elle, le compilateur vérifie le nombre et le type des arguments comme pour un appel normal.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "call vérifié",
        code: "function greet(greeting: string, name: string): string {\n  return greeting + \", \" + name;\n}\n\ngreet.call(undefined, \"Hello\", \"Ada\"); // OK\n// greet.call(undefined, \"Hello\");     // Erreur : argument manquant",
      },
    ],
  },
  {
    id: "strictpropertyinitialization",
    title: "strictPropertyInitialization",
    level: 3,
    intro: "Chaque propriété de classe doit être initialisée : adieu les `undefined` surprises.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Initialisation contrôlée",
        code: "class User {\n  name: string;                    // Erreur TS2564 : non initialisée\n  email: string = \"\";              // OK : valeur par défaut\n  id: number;                       // OK si assignée dans le constructeur\n\n  constructor(id: number) {\n    this.id = id;\n  }\n}",
      },
      {
        kind: "text",
        text: "L'option exige que chaque propriété soit assignée dans le constructeur ou ait un initialiseur. Échappatoires (à documenter) : l'assignation différée (`id!: number` — « fais-moi confiance, ce sera assigné ») pour l'injection de dépendances ou les frameworks, et les propriétés optionnelles (`email?: string`).",
      },
    ],
  },
  {
    id: "noimplicitthis",
    title: "noImplicitThis",
    level: 3,
    intro: "Le `this` des fonctions doit être typé : fini les `this` fantômes.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Typer this explicitement",
        code: "function getName(this: { name: string }): string {\n  return this.name;\n}\n\nconst user = { name: \"Ada\", getName };\nuser.getName(); // OK : this est { name: string }",
      },
      {
        kind: "text",
        text: "Dans une fonction ordinaire, `this` dépend de l'appelant — source classique de bugs. `noImplicitThis` exige de déclarer son type en premier paramètre fictif (`this: T`). Les méthodes de classe et les fonctions fléchées ne sont pas concernées : leur `this` est déjà déterminé.",
      },
    ],
  },
  {
    id: "alwaysstrict",
    title: "alwaysStrict",
    level: 3,
    intro: "Le mode strict JavaScript dans le code émis : une ligne, zéro surprise.",
    blocks: [
      {
        kind: "text",
        text: "`alwaysStrict` ajoute `\"use strict\"` en tête de chaque fichier JavaScript émis. Le mode strict ECMAScript interdit notamment les variables globales implicites et rend certaines erreurs silencieuses explicites. C'est une hygiène de l'émission : le code généré se comporte de façon prévisible.",
      },
    ],
  },
  {
    id: "useunknownincatchvariables",
    title: "useUnknownInCatchVariables",
    level: 3,
    intro: "Les erreurs capturées sont `unknown` : on ne sait jamais ce qu'on attrape.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "catch avec unknown",
        code: "try {\n  riskyOperation();\n} catch (error) {\n  // error: unknown — pas any !\n  if (error instanceof Error) {\n    console.error(error.message); // OK après affinement\n  }\n}",
      },
      {
        kind: "text",
        text: "En JavaScript, n'importe quoi peut être levé (`throw \"chaîne\"`, `throw 42`) — pas seulement des `Error`. Typer la variable de `catch` en `unknown` plutôt qu'en `any` force à vérifier avant d'utiliser : `instanceof Error`, garde personnalisée, ou conversion prudente. C'est l'honnêteté typée face à l'incertitude réelle.",
      },
    ],
  },
  {
    id: "nouncheckedindexedaccess",
    title: "noUncheckedIndexedAccess",
    level: 3,
    intro: "Au-delà du strict : l'accès par index retourne `T | undefined`.",
    blocks: [
      {
        kind: "text",
        text: "Cette option ne fait pas partie de `strict` mais prolonge sa philosophie : `arr[0]` vaut `number | undefined` au lieu de `number`, car l'index peut ne pas exister. Elle rend visibles les accès hors limites — une source fréquente de bugs — au prix d'un code plus verbeux sur les manipulations intensives de tableaux.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Index vérifié",
        code: "const scores: number[] = [10, 20];\nconst first = scores[0]; // number | undefined\n\nif (first !== undefined) {\n  console.log(first.toFixed()); // OK\n}",
      },
      {
        kind: "text",
        text: "À n'activer que si l'équipe est à l'aise avec le strict de base : sur du code qui manipule beaucoup de tableaux, elle ajoute un coût de verbosité réel. C'est un palier 4, pas un point de départ.",
      },
    ],
  },
  {
    id: "exactoptionalpropertytypes",
    title: "exactOptionalPropertyTypes",
    level: 3,
    intro: "Au-delà du strict : distinguer « absent » de « explicitement undefined ».",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Optionnel exact",
        code: "interface Config {\n  host?: string; // sans l'option : string | undefined, assignable explicitement\n}\n\ndeclare const c: Config;\n// Avec exactOptionalPropertyTypes :\n// c = { host: undefined }; // Erreur : undefined n'est pas assignable",
      },
      {
        kind: "text",
        text: "Par défaut, `{ host?: string }` accepte `{ host: undefined }`. Avec `exactOptionalPropertyTypes`, l'optionnel signifie strictement « absent ou string » — pas « undefined explicite ». Cette distinction compte quand l'absence d'une clé a un sens différent d'une valeur `undefined` (options par défaut, sérialisation JSON).",
      },
    ],
  },
  {
    id: "noimplicitreturns",
    title: "noImplicitReturns",
    level: 3,
    intro: "Tous les chemins d'une fonction doivent retourner (ou aucun).",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Retours cohérents",
        code: "// Erreur : certains chemins retournent une valeur, d'autres non\nfunction findUser(id: number): string {\n  if (id > 0) {\n    return \"Ada\";\n  }\n  // chemin implicite : retourne undefined\n}",
      },
      {
        kind: "text",
        text: "`noImplicitReturns` exige la cohérence : si une branche retourne une valeur, toutes les branches doivent en retourner une (ou la fonction doit être typée avec `| undefined`). Il élimine les `undefined` furtifs glissés par un chemin oublié.",
      },
    ],
  },
  {
    id: "nofallthroughcasesinswitch",
    title: "noFallthroughCasesInSwitch",
    level: 3,
    intro: "Interdire les `case` qui tombent dans le suivant par oubli.",
    blocks: [
      {
        kind: "text",
        text: "En JavaScript, un `case` sans `break` « tombe » dans le `case` suivant — parfois volontaire, souvent un oubli. `noFallthroughCasesInSwitch` signale les chutes non vides : chaque `case` doit se terminer par `break`, `return`, ou un commentaire explicite. Les `case` vides en cascade (plusieurs cas pour un même traitement) restent autorisés.",
      },
    ],
  },
  {
    id: "nounusedlocals",
    title: "noUnusedLocals",
    level: 3,
    intro: "Signaler les variables locales inutilisées : le ménage automatique.",
    blocks: [
      {
        kind: "text",
        text: "`noUnusedLocals` transforme les variables déclarées mais jamais lues en erreurs (`TS6133`). C'est le ménage automatique après les refactors : paramètres oubliés, imports devenus inutiles, variables temporaires abandonnées. Le code reste propre sans effort conscient.",
      },
      {
        kind: "list",
        items: [
          "Les paramètres de fonction préfixés par `_` sont exemptés : convention pour les paramètres intentionnellement ignorés.",
          "À combiner avec ESLint (`no-unused-vars`) qui couvre aussi les cas que `tsc` ne voit pas.",
          "Peut gêner pendant l'écriture exploratoire : c'est le prix d'un code final propre.",
        ],
      },
    ],
  },
  {
    id: "nounusedparameters",
    title: "noUnusedParameters",
    level: 3,
    intro: "Le pendant pour les paramètres : détecter les signatures qui mentent.",
    blocks: [
      {
        kind: "text",
        text: "`noUnusedParameters` signale les paramètres de fonction jamais utilisés. Un paramètre ignoré est souvent le symptôme d'une signature obsolète ou d'une logique incomplète. Comme pour les variables, le préfixe `_` marque les exceptions volontaires (ex. le premier paramètre d'un callback dont seul le second nous intéresse).",
      },
    ],
  },
  {
    id: "narrowing-avance",
    title: "Narrowing avancé",
    level: 3,
    intro: "Le strict exploite l'analyse de contrôle de flux : la maîtriser, c'est écrire moins de code défensif.",
    blocks: [
      {
        kind: "text",
        text: "TypeScript suit l'état des variables à travers le code : après `if (x != null)`, `x` est resserré ; après une assignation, son type est affiné. Le mode strict tire le maximum de cette analyse — mais seulement si on écrit du code « analysable » : des gardes simples, des retours anticipés, des discriminants explicites.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Retours anticipés : le style qui aide le compilateur",
        code: "function process(input: string | null | undefined): string {\n  if (input == null) return \"défaut\";  // garde : élimine null/undefined\n  if (input === \"\") return \"vide\";      // garde : élimine la chaîne vide\n  return input.toUpperCase();            // input est string non-vide ici\n}",
      },
    ],
  },
  {
    id: "unknown-vs-any",
    title: "unknown vs any : le choix du strict",
    level: 3,
    intro: "Quand on ne connaît pas le type : l'honnêteté de `unknown` contre le mensonge de `any`.",
    blocks: [
      {
        kind: "table",
        headers: ["", "`any`", "`unknown`"],
        rows: [
          ["Accepte tout", "Oui", "Oui"],
          ["Utilisable sans vérification", "Oui (aucun contrôle)", "Non (affinement requis)"],
          ["Propagation", "Contamine : tout devient `any`", "Contenue : force la validation"],
          ["En mode strict", "Toléré si explicite, à éviter", "Le choix recommandé"],
        ],
      },
      {
        kind: "text",
        text: "Règle simple : quand on hésite entre `any` et `unknown`, `unknown` est presque toujours le bon choix. `any` dit « fais-moi confiance » ; `unknown` dit « je ne sais pas, vérifions ». Le premier masque les bugs, le second les révèle.",
      },
    ],
  },
  {
    id: "assertions-justifiees",
    title: "Assertions justifiées",
    level: 3,
    intro: "`as` et `!` : les rares cas où l'affirmation est légitime.",
    blocks: [
      {
        kind: "text",
        text: "Le strict n'interdit pas les assertions — il exige qu'elles soient justifiées. Cas légitimes : après une validation manuelle que le compilateur ne peut pas suivre, pour l'assignation différée d'un framework (`@Input()` Angular, injection), ou quand une API externe garantit contractuellement une non-nullité.",
      },
      {
        kind: "list",
        items: [
          "Chaque assertion doit pouvoir s'expliquer en une phrase : si on ne peut pas, c'est qu'il faut une garde.",
          "Préférer les type guards : une fonction `isUser(x): x is User` prouve au lieu d'affirmer.",
          "La règle `@typescript-eslint/no-non-null-assertion` bannit les `!` quand le projet est mûr.",
        ],
      },
    ],
  },
  {
    id: "exhaustivite-never",
    title: "Exhaustivité avec never",
    level: 3,
    intro: "Prouver qu'on a traité tous les cas : le pattern le plus élégant du strict.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Vérification d'exhaustivité",
        code: "type Shape =\n  | { kind: \"circle\"; radius: number }\n  | { kind: \"square\"; side: number };\n\nfunction area(s: Shape): number {\n  switch (s.kind) {\n    case \"circle\": return Math.PI * s.radius ** 2;\n    case \"square\": return s.side ** 2;\n    default: {\n      const exhaustive: never = s; // Erreur si un cas manque\n      return exhaustive;\n    }\n  }\n}",
      },
      {
        kind: "text",
        text: "Si un membre est ajouté à l'union `Shape` sans son `case`, `s` n'est plus `never` dans le `default` : erreur de compilation immédiate. C'est la garantie que tous les cas sont traités — précieuse pour les machines à états, les reducers, les gestionnaires d'événements.",
      },
    ],
  },
  {
    id: "result-pattern",
    title: "Le pattern Result",
    level: 3,
    intro: "Typer l'échec comme le succès : des erreurs explicites au lieu d'exceptions surprises.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Result : succès ou échec typé",
        code: "type Result<T, E = Error> =\n  | { ok: true; value: T }\n  | { ok: false; error: E };\n\nfunction divide(a: number, b: number): Result<number, string> {\n  if (b === 0) return { ok: false, error: \"Division par zéro\" };\n  return { ok: true, value: a / b };\n}\n\nconst r = divide(10, 0);\nif (!r.ok) {\n  console.error(r.error); // l'échec est traité, pas subi\n}",
      },
      {
        kind: "text",
        text: "Au lieu de lever des exceptions invisibles dans les signatures, `Result` rend l'échec explicite : l'appelant doit traiter les deux cas, et le compilateur l'y force via le discriminant `ok`. C'est le strict appliqué à la gestion d'erreurs.",
      },
    ],
  },
  {
    id: "validation-runtime",
    title: "Validation aux frontières",
    level: 3,
    intro: "Les types s'arrêtent à la compilation : valider les données qui entrent.",
    blocks: [
      {
        kind: "text",
        text: "Le strict ne protège pas à l'exécution : un `data as User` sur une réponse API ne vérifie rien. Aux frontières du système (API, formulaires, fichiers), il faut une validation runtime qui produit des types : des type guards écrits à la main, ou une bibliothèque de schémas comme `zod` qui infère le type depuis le schéma.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Garde manuelle à la frontière",
        code: "function isUser(data: unknown): data is { name: string } {\n  return (\n    typeof data === \"object\" &&\n    data !== null &&\n    \"name\" in data &&\n    typeof (data as { name: unknown }).name === \"string\"\n  );\n}\n\nconst raw: unknown = JSON.parse(response);\nif (isUser(raw)) {\n  console.log(raw.name); // typé et validé\n}",
      },
    ],
  },
  {
    id: "zero-non-null-assertion",
    title: "Objectif zéro non-null assertion",
    level: 3,
    intro: "Éliminer les `!` : le chantier qui prouve la maturité strict d'un projet.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Recenser",
            detail:
              "Rechercher tous les `!` du projet : chacun est une affirmation non prouvée, un pari sur la nullabilité.",
          },
          {
            title: "Classer",
            detail:
              "Trier en trois catégories : les `!` justifiés (assignation différée de framework, garanties contractuelles), les paresseux (une garde ferait l'affaire), les dangereux (on n'en sait rien).",
          },
          {
            title: "Convertir",
            detail:
              "Remplacer les paresseux par des gardes ou des valeurs par défaut, documenter les justifiés en une phrase.",
          },
          {
            title: "Verrouiller",
            detail:
              "Activer `@typescript-eslint/no-non-null-assertion` en erreur : aucun nouveau `!` ne pourra entrer sans discussion.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-strict",
    title: "Déboguer en mode strict",
    level: 3,
    intro: "Le strict change le débogage : moins de surprises, des hypothèses vérifiables.",
    blocks: [
      {
        kind: "text",
        text: "Paradoxe : le strict simplifie le débogage. Quand le compilateur garantit qu'une valeur n'est pas nulle et a le bon type, le débogueur sert à comprendre la logique — pas à chasser des `undefined` fantômes. Les points d'arrêt se posent sur les décisions, pas sur les vérifications défensives.",
      },
      {
        kind: "list",
        items: [
          "Avec les source maps, on débogue le `.ts` d'origine : les types annotés restent visibles pendant l'inspection.",
          "Une erreur à l'exécution en mode strict pointe presque toujours vers une frontière non validée (données externes) ou une assertion abusive — deux suspects au lieu de dix.",
          "Le strict ne remplace pas les tests : il élimine les bugs de types, les tests prouvent le comportement.",
        ],
      },
    ],
  },
  {
    id: "erreurs-ts-strict",
    title: "Erreurs tsc du mode strict",
    level: 3,
    intro: "Le catalogue des codes d'erreur strict, et leur correction.",
    blocks: [
      {
        kind: "table",
        headers: ["Code", "Message", "Correction"],
        rows: [
          ["TS18048", "'x' is possibly 'undefined'", "Garder (`if (x != null)`), ou typer l'absence et la traiter."],
          ["TS7006", "Parameter implicitly has an 'any' type", "Annoter explicitement le paramètre."],
          ["TS2564", "Property has no initializer", "Initialiser dans le constructeur, valeur par défaut, ou assignation différée documentée."],
          ["TS18046", "'x' is of type 'unknown'", "Affiner par garde avant usage (`typeof`, `instanceof`)."],
          ["TS2571", "Object is of type 'unknown'", "Valider la forme (type guard) avant d'accéder aux propriétés."],
          ["TS2531", "Object is possibly 'null'", "Même traitement que TS18048, pour `null` explicite."],
        ],
      },
    ],
  },
  {
    id: "strict-et-bibliotheques",
    title: "Le strict et les bibliothèques",
    level: 3,
    intro: "Vos dépendances sont-elles strictes ? Gérer les types tiers imparfaits.",
    blocks: [
      {
        kind: "text",
        text: "Le strict s'applique à votre code, mais les `.d.ts` des dépendances ont leur propre qualité : certains sont laxistes (`any` partout), d'autres précis. `skipLibCheck: true` évite de revérifier ces déclarations — sans quoi les erreurs des bibliothèques pollueraient votre compilation.",
      },
      {
        kind: "list",
        items: [
          "Un type tiers en `any` contamine votre code strict : l'isoler derrière une garde ou une interface propre.",
          "Ne jamais modifier un `.d.ts` dans `node_modules` : écrire une déclaration locale d'affinage ou un wrapper typé.",
          "Préférer les bibliothèques qui fournissent leurs propres types : la qualité des types fait partie du choix d'une dépendance.",
        ],
      },
    ],
  },
  {
    id: "cas-limites-strict",
    title: "Cas limites du strict",
    level: 3,
    intro: "JSON.parse, tableaux, DOM : les zones où le strict demande un effort conscient.",
    blocks: [
      {
        kind: "fields",
        title: "Zones de friction",
        fields: [
          {
            label: "`JSON.parse` retourne `any`",
            value:
              "La signature officielle retourne `any` : en strict, typer le résultat en `unknown` puis valider par garde. C'est la frontière typique entre monde externe et monde typé.",
          },
          {
            label: "Accès aux tableaux",
            value:
              "`arr[0]` est typé `T` même si l'index n'existe pas — le strict de base ne couvre pas ce cas. `noUncheckedIndexedAccess` (palier 4) le couvre.",
          },
          {
            label: "APIs DOM",
            value:
              "`document.getElementById` retourne `HTMLElement | null` : le strict force à tester. L'assertion `as HTMLInputElement` est tentante mais doit rester justifiée.",
          },
          {
            label: "Variables d'environnement",
            value:
              "`process.env.MA_CLE` vaut `string | undefined` : le strict rappelle que la config peut manquer — avec raison.",
          },
        ],
      },
    ],
  },
  {
    id: "performance-strict",
    title: "Le strict et la performance",
    level: 3,
    intro: "Le strict ralentit-il la compilation ? Les faits.",
    blocks: [
      {
        kind: "text",
        text: "Le mode strict n'a aucun coût à l'exécution : les types sont effacés à la compilation, quel que soit leur niveau d'exigence. À la compilation, l'analyse est légèrement plus coûteuse (plus de vérifications), mais l'écart est négligeable devant le coût de la résolution des modules et de la vérification des `.d.ts`. Le vrai levier de vitesse reste `skipLibCheck`.",
      },
    ],
  },
  {
    id: "erreurs-courantes-strict",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les pièges classiques du mode strict, et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Faire taire au lieu de corriger",
            value:
              "Problem : `as any` et `!` saupoudrés pour passer la compilation. Why : confondre « ça compile » et « c'est correct ». Better : chaque erreur décrit un cas non traité — le traiter.",
          },
          {
            label: "Désactiver strict face aux erreurs",
            value:
              "Problem : repasser `strict` à `false` devant 50 erreurs. Why : découragement. Better : paliers progressifs (noImplicitAny, puis strictNullChecks), 50 erreurs traitées valent mieux que zéro vérification.",
          },
          {
            label: "Abuser de l'assignation différée",
            value:
              "Problem : des `!` partout sur les propriétés de classe. Why : éviter de réfléchir à l'initialisation. Better : initialiser vraiment quand c'est possible, réserver `!` aux cas documentés.",
          },
          {
            label: "Croire que le strict protège à l'exécution",
            value:
              "Problem : `data as User` sur une réponse API sans validation. Why : oublier que les types sont effacés. Better : valider aux frontières (guards, schémas).",
          },
          {
            label: "Activer les paliers 4 trop tôt",
            value:
              "Problem : `noUncheckedIndexedAccess` sur une équipe qui découvre le strict — verbosité décourageante. Why : vouloir tout, tout de suite. Better : maîtriser le strict de base d'abord, resserrer ensuite.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques-strict",
    title: "Bonnes pratiques",
    level: 3,
    intro: "Les habitudes d'un projet durablement strict.",
    blocks: [
      {
        kind: "list",
        items: [
          "`strict: true` dès le premier jour sur tout nouveau projet : sans discussion.",
          "Corriger le code, jamais le compilateur : aucune erreur ne se masque.",
          "Gardes plutôt qu'assertions : prouver plutôt qu'affirmer.",
          "`unknown` plutôt que `any` : l'honnêteté typée par défaut.",
          "Valider aux frontières : les données externes sont coupables jusqu'à preuve du contraire.",
          "Exhaustivité sur les unions : le `never` qui prouve que tous les cas sont traités.",
          "Verrouiller en CI : `tsc --noEmit` strict à chaque pull request.",
          "Resserrer par paliers : `noUncheckedIndexedAccess` et `exactOptionalPropertyTypes` quand l'équipe est prête.",
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
          { label: "strict (tsconfig)", value: "https://www.typescriptlang.org/tsconfig#strict : la référence de l'option et de chaque flag qu'elle active." },
          { label: "Narrowing (Handbook)", value: "Le guide de l'affinement : le mécanisme qui rend le strict vivable au quotidien." },
          { label: "Everyday Types (Handbook)", value: "Les types quotidiens, avec les pièges de nullabilité expliqués." },
        ],
      },
      {
        kind: "list",
        items: [
          "Community : le dépôt GitHub microsoft/TypeScript pour les discussions sur les flags stricts.",
          "Practice : activer le strict palier par palier sur un vrai projet — c'est là qu'on apprend.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Le strict maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir `types-avances` : les types fins que le strict exige de manier.",
          "Explorer `generiques` : écrire du code réutilisable qui reste strict.",
          "Maîtriser `unions` : le narrowing est l'outil quotidien du strict.",
          "Comprendre `tsconfig` : chaque option de rigueur en détail.",
          "Sécuriser avec `outillage` : ESLint strict pour verrouiller les bonnes habitudes.",
          "Revenir à la roadmap : valider la compétence et passer à la suivante du parcours.",
        ],
      },
    ],
  },
];

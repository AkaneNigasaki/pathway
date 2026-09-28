import type { LearningSection } from "../skill-guides";

/**
 * Learning Page de TypeScript côté frontend : typage du DOM, événements,
 * composants React/Next.js, variables d'environnement Vite et outillage
 * de build. Angle résolument frontend — la page TypeScript générale
 * (roadmap informatique) reste la référence sur le langage lui-même.
 */
export const LEARNING_TYPESCRIPT_FRONTEND: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "TypeScript côté frontend : typer ce que l'utilisateur voit et touche — DOM, événements, composants, données d'API.",
    blocks: [
      {
        kind: "text",
        text: "Dans le navigateur, TypeScript protège trois frontières : le DOM (`getElementById` retourne `HTMLElement | null`, pas `any`), les événements (un clic n'a pas la même forme qu'une frappe clavier), et les composants (les props sont un contrat entre parent et enfant). Chaque frontière typée élimine une famille de bugs d'exécution.",
      },
      {
        kind: "text",
        text: "Spécificité du frontend : le code est compilé puis servi à un navigateur. Les bundlers modernes (Vite, esbuild) retirent les types sans les vérifier — la vérification (`tsc --noEmit`) est une étape séparée à ajouter soi-même. Comprendre cette séparation évite la fausse sécurité du « ça build donc c'est typé ».",
      },
      {
        kind: "text",
        text: "Cette page suppose les bases du langage acquises (types, interfaces, unions, génériques — voir la page TypeScript générale) et se concentre sur leur application au navigateur : DOM, React, Next.js, Vite, tests et débogage.",
      },
    ],
  },
  {
    id: "typescript-frontend-en-30-secondes",
    title: "TypeScript côté frontend en 30 secondes",
    level: 1,
    intro: "Les cinq chantiers du typage frontend.",
    blocks: [
      {
        kind: "diagram",
        title: "Où typer dans une app frontend",
        lines: [
          "DOM natif      : HTMLElement | null, casts, querySelector<T>",
          "Événements     : MouseEvent, KeyboardEvent, ChangeEvent",
          "Composants     : props typées, useState<T>, refs typées",
          "Données        : réponses d'API en unknown → gardes → types",
          "Build          : tsc --noEmit séparé du bundler (Vite/esbuild)",
        ],
      },
      {
        kind: "text",
        text: "Retenez la règle d'or : le navigateur ne voit jamais vos types — ils sont effacés avant l'envoi. Toute donnée qui entre (API, formulaire, URL) doit donc être validée à l'exécution, même si elle est typée à la compilation.",
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
    intro: "Ce qu'il faut maîtriser avant TypeScript côté frontend.",
    blocks: [
      {
        kind: "fields",
        title: "Fondations indispensables",
        fields: [
          {
            label: "TypeScript — les bases",
            value:
              "Types de base, interfaces, unions, génériques, narrowing : le vocabulaire appliqué ici. Voir la page TypeScript générale.",
          },
          {
            label: "DOM et JavaScript navigateur",
            value:
              "`document.querySelector`, `addEventListener`, la différence entre `Element` et `HTMLElement`. Sans ça, les types du DOM n'ont pas de sens.",
          },
          {
            label: "React — composants et hooks",
            value:
              "Composants fonctionnels, `useState`, `useEffect` : les sections React supposent ces bases.",
          },
          {
            label: "npm et Vite",
            value:
              "Créer un projet, installer des dépendances, lancer un serveur de dev : l'outillage de cette page.",
          },
        ],
      },
    ],
  },
  {
    id: "installation-vite",
    title: "Créer un projet React + TypeScript",
    level: 2,
    intro: "Le point de départ standard : le template officiel Vite.",
    blocks: [
      {
        kind: "command",
        label: "Créer le projet avec le template react-ts",
        command: "npm create vite@latest mon-app -- --template react-ts",
        why: "Génère un projet React + TypeScript configuré : `tsconfig.json` adapté (`jsx: react-jsx`, `lib` avec DOM), Vite comme bundler et serveur de dev, structure `src/` prête. C'est le point de départ officiel et maintenu.",
        verify: "ls mon-app",
      },
      {
        kind: "command",
        label: "Installer les dépendances et lancer le dev",
        command: "cd mon-app && npm install && npm run dev",
        why: "`npm install` installe React, TypeScript et Vite ; `npm run dev` démarre le serveur de développement avec rechargement à chaud. Ouvrez l'URL affichée pour voir l'application.",
        verify: "curl -s -o /dev/null -w \"%{http_code}\" http://localhost:5173",
      },
      {
        kind: "text",
        text: "Point crucial à retenir dès maintenant : `npm run dev` et `npm run build` utilisent esbuild, qui retire les types sans les vérifier. Une erreur de type n'empêche pas le build Vite — la vérification se fait avec `tsc --noEmit`, à ajouter comme étape séparée.",
      },
    ],
  },
  {
    id: "tsconfig-frontend",
    title: "Le `tsconfig` d'un projet frontend",
    level: 2,
    intro: "Les options qui font la différence côté navigateur.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "tsconfig.app.json (template Vite)",
        code: `{\n  "compilerOptions": {\n    "strict": true,\n    "target": "ES2020",\n    "lib": ["ES2020", "DOM", "DOM.Iterable"],\n    "jsx": "react-jsx",\n    "module": "ESNext",\n    "moduleResolution": "bundler",\n    "noEmit": true,\n    "isolatedModules": true\n  },\n  "include": ["src"]\n}`,
      },
      {
        kind: "fields",
        title: "Les options clés",
        fields: [
          {
            label: "`lib` avec `DOM`",
            value:
              "Inclut les types du navigateur (`document`, `HTMLElement`, `fetch`) : sans `DOM`, le moindre `querySelector` est inconnu.",
          },
          {
            label: "`jsx: react-jsx`",
            value:
              "Active la syntaxe JSX avec la transform moderne (pas besoin d'importer React dans chaque fichier).",
          },
          {
            label: "`moduleResolution: bundler`",
            value:
              "Résolution pensée pour les bundlers (Vite, webpack) : gère les exports `package.json` modernes.",
          },
          {
            label: "`noEmit: true`",
            value:
              "`tsc` ne sert qu'à vérifier : c'est Vite qui émet le JavaScript. Les deux outils ont des rôles séparés.",
          },
          {
            label: "`isolatedModules: true`",
            value:
              "Garantit que chaque fichier est compilable isolément (ce que fait esbuild) : interdit notamment les enums `const` non compatibles.",
          },
        ],
      },
    ],
  },
  {
    id: "dom-premiers-pas",
    title: "Typer le DOM : premiers pas",
    level: 2,
    intro: "`getElementById` ne retourne jamais ce que vous croyez.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Le DOM est typé — et prudent",
        code: `// getElementById retourne HTMLElement | null : l'élément peut ne pas exister\nconst app = document.getElementById("app");\n// app: HTMLElement | null\n\n// Affiner avant usage\nif (app) {\n  app.innerHTML = "Bonjour"; // app: HTMLElement ici\n}\n\n// querySelector est générique : précisez le type d'élément\nconst input = document.querySelector<HTMLInputElement>("#email");\n// input: HTMLInputElement | null\n\nif (input) {\n  console.log(input.value); // .value n'existe que sur HTMLInputElement\n}\n\n// Le cast quand vous savez mieux que le compilateur\nconst canvas = document.getElementById("scene") as HTMLCanvasElement;\nconst ctx = canvas.getContext("2d"); // CanvasRenderingContext2D | null`,
      },
      {
        kind: "list",
        items: [
          "Tout accès DOM peut échouer : les types le reflètent avec `| null`. Vérifiez avant d'utiliser.",
          "`querySelector<T>` : le générique précise le type d'élément (`HTMLInputElement`, `HTMLButtonElement`).",
          "Le cast `as` est un aveu (« je sais ») : utilisez-le quand le HTML garantit l'existence, pas pour faire taire le compilateur.",
        ],
      },
    ],
  },
  {
    id: "evenements-natifs",
    title: "Typer les événements natifs",
    level: 2,
    intro: "Chaque événement a sa forme : `MouseEvent`, `KeyboardEvent`, `Event`.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Événements natifs typés",
        code: `const button = document.querySelector<HTMLButtonElement>("#send");\n\nbutton?.addEventListener("click", (event) => {\n  // event: MouseEvent — inféré depuis \"click\"\n  console.log(\`Clic en \${event.clientX},\${event.clientY}\`);\n  event.preventDefault();\n});\n\ndocument.addEventListener("keydown", (event) => {\n  // event: KeyboardEvent\n  if (event.key === "Enter") {\n    console.log("Entrée pressée");\n  }\n});\n\n// event.target est EventTarget | null : caster pour l'utiliser\nbutton?.addEventListener("click", (event) => {\n  const target = event.target as HTMLButtonElement;\n  target.disabled = true;\n});`,
      },
      {
        kind: "text",
        text: "Le type d'événement est inféré depuis le nom (`\"click\"` → `MouseEvent`) : les propriétés spécifiques (`clientX`, `key`) sont disponibles sans annotation. Seul `event.target` reste vague (`EventTarget | null`) — c'est volontaire : le compilateur ne sait pas quel élément a déclenché l'événement.",
      },
    ],
  },
  {
    id: "premier-composant-type",
    title: "Premier composant React typé",
    level: 2,
    intro: "Props, état, événements : le trio de base d'un composant typé.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définir les props comme une interface",
            detail:
              "`interface ButtonProps { label: string; onClick: () => void; disabled?: boolean }`. Les props sont le contrat du composant : explicites, nommées, typées.",
          },
          {
            title: "Typer le composant",
            detail:
              "`function Button({ label, onClick, disabled = false }: ButtonProps)`. La déstructuration avec le type des props donne l'autocomplétion et la vérification à chaque usage.",
          },
          {
            title: "Ajouter un état typé",
            detail:
              "`const [count, setCount] = useState<number>(0)`. Le générique fige le type de l'état ; `setCount` n'acceptera ensuite que des nombres.",
          },
          {
            title: "Typer le gestionnaire d'événement",
            detail:
              "`onClick={(e) => ...}` : `e` est inféré en `React.MouseEvent<HTMLButtonElement>` depuis le JSX. Pas d'annotation nécessaire.",
          },
          {
            title: "Vérifier",
            detail:
              "`npx tsc --noEmit` : utilisez le composant avec une prop manquante ou du mauvais type, constatez l'erreur, corrigez.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "src/components/Button.tsx",
        code: `import { useState } from "react";\n\ninterface ButtonProps {\n  label: string;\n  onClick: () => void;\n  disabled?: boolean;\n}\n\nexport function Button({ label, onClick, disabled = false }: ButtonProps) {\n  const [count, setCount] = useState<number>(0);\n\n  return (\n    <button\n      disabled={disabled}\n      onClick={() => {\n        setCount((c) => c + 1);\n        onClick();\n      }}\n    >\n      {label} ({count})\n    </button>\n  );\n}`,
      },
    ],
  },
  {
    id: "editeurs",
    title: "Éditeurs et TypeScript frontend",
    level: 2,
    intro: "Le serveur de langage TypeScript dans l'éditeur : votre vérificateur permanent.",
    blocks: [
      {
        kind: "fields",
        title: "VS Code — réflexes frontend",
        fields: [
          {
            label: "Erreurs inline dans le TSX",
            value:
              "Les erreurs de props s'affichent directement dans le JSX : une prop manquante est soulignée à l'usage, pas à la définition.",
          },
          {
            label: "Autocomplétion des props",
            value:
              "Dans `<Button `, l'éditeur propose les props avec leurs types : la documentation du composant, sans quitter le clavier.",
          },
          {
            label: "Renommage (`F2`)",
            value:
              "Renommer une prop met à jour tous les usages : sûr grâce aux types, dangereux à la main.",
          },
          {
            label: "`Ctrl` + clic sur un composant",
            value:
              "Saute à sa définition : vérifiez les props attendues avant de l'utiliser.",
          },
        ],
      },
    ],
  },
  {
    id: "fetch-type",
    title: "Typer les appels API",
    level: 2,
    intro: "`fetch` retourne `unknown` déguisé : reprenez le contrôle.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "fetch générique et garde",
        code: `interface User {\n  id: string;\n  name: string;\n}\n\n// fetchJson générique : le type est décidé à l'appel\nasync function fetchJson<T>(url: string): Promise<T> {\n  const res = await fetch(url);\n  if (!res.ok) {\n    throw new Error(\`HTTP \${res.status}\`);\n  }\n  return (await res.json()) as T;\n}\n\n// À l'usage : le type est explicite...\nconst users = await fetchJson<User[]>("/api/users");\n// ...mais rien ne le VÉRIFIE : si l'API change, le cast ment\n\n// Mieux : valider à l'exécution avec une garde\nfunction isUser(value: unknown): value is User {\n  return (\n    typeof value === "object" &&\n    value !== null &&\n    "id" in value &&\n    "name" in value\n  );\n}`,
      },
      {
        kind: "text",
        text: "Le cast `as T` sur `res.json()` est une promesse non vérifiée : pratique, mais fragile. En production, validez les réponses (garde maison, schéma) avant de les typer — les types décrivent ce que vous croyez, la validation ce que vous savez.",
      },
    ],
  },
  {
    id: "erreurs-frequentes-debut",
    title: "Erreurs fréquentes au début",
    level: 2,
    intro: "Les trois erreurs que tout débutant rencontre en TypeScript frontend.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue express",
        fields: [
          {
            label: "`Object is possibly 'null'` sur le DOM",
            value:
              "`getElementById` et `querySelector` retournent `| null`. Vérifiez (`if (el)`) ou utilisez `?.` avant d'accéder aux propriétés.",
          },
          {
            label: "`Property 'value' does not exist on type 'HTMLElement'`",
            value:
              "Vous avez un `HTMLElement` générique au lieu de `HTMLInputElement`. Précisez avec `querySelector<HTMLInputElement>` ou un cast.",
          },
          {
            label: "Le build passe malgré une erreur de type",
            value:
              "Normal : Vite/esbuild retire les types sans les vérifier. Lancez `npx tsc --noEmit` pour la vraie vérification.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro: "Quatre projets pour ancrer TypeScript côté frontend.",
    blocks: [
      {
        kind: "fields",
        title: "Par niveau",
        fields: [
          {
            label: "Beginner — Compteur et formulaire",
            value:
              "État `useState<number>`, input contrôlé `useState<string>`, soumission typée. Objectif : props, état, événements.",
          },
          {
            label: "Intermediate — Liste de tâches avec API",
            value:
              "`fetchJson<T>`, états `idle | loading | success | error` en union discriminée, rendu par état. Objectif : données + états.",
          },
          {
            label: "Advanced — Mini design system",
            value:
              "Bouton, Input, Modal avec variants typées (`\"primary\" | \"secondary\"`), `Omit`/`Pick` sur les props natives. Objectif : composants réutilisables.",
          },
          {
            label: "Professional — Application Next.js",
            value:
              "App Router, pages typées, appels API validés, tests. Objectif : TypeScript de bout en bout en production.",
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "dom-lib",
    title: "La lib DOM",
    level: 3,
    intro: "Des centaines de types navigateur fournis par TypeScript.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "La hiérarchie des éléments",
        code: `// Hiérarchie : EventTarget → Node → Element → HTMLElement → ...\nconst el: Element | null = document.querySelector(".x");\nconst html: HTMLElement | null = document.getElementById("y");\n\n// Chaque balise a son interface précise\nconst input: HTMLInputElement | null = document.querySelector("input");\nconst form: HTMLFormElement | null = document.querySelector("form");\nconst video: HTMLVideoElement | null = document.querySelector("video");\n\n// Propriétés spécifiques par interface\nif (input) {\n  input.value; // string — n'existe que sur les inputs\n  input.checked; // boolean — cases à cocher\n}\nif (video) {\n  video.play(); // Promise<void>\n  video.currentTime; // number\n}`,
      },
      {
        kind: "text",
        text: "La lib DOM (`lib.dom.d.ts`) décrit le navigateur : chaque balise a son interface, chaque API ses signatures. `Ctrl` + clic sur `HTMLInputElement` ouvre sa définition — des centaines de propriétés documentées par les types eux-mêmes.",
      },
    ],
  },
  {
    id: "casts-dom",
    title: "Casts DOM : quand et comment",
    level: 3,
    intro: "`as` avec discernement : les règles du cast DOM.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Bon et mauvais casts",
        code: `// Bon : le HTML garantit l'existence et le type\nconst canvas = document.getElementById("scene") as HTMLCanvasElement;\n\n// Bon : affiner un type trop large vers un plus précis compatible\nconst el = document.querySelector(".modal"); // Element | null\nconst dialog = el as HTMLDialogElement | null;\n\n// Mauvais : caster pour faire taire une erreur de logique\n// const input = document.getElementById("x") as HTMLInputElement;\n// input.value; // crash si #x n'existe pas ou n'est pas un input\n\n// Mieux : vérifier quand le doute est légitime\nconst maybe = document.getElementById("x");\nif (maybe instanceof HTMLInputElement) {\n  console.log(maybe.value); // affiné proprement, sans cast\n}`,
      },
      {
        kind: "list",
        items: [
          "Cast légitime : vous connaissez le HTML, le compilateur ne le voit pas — l'élément existe et a le bon type.",
          "Alternative sûre : `instanceof HTMLInputElement` affine sans cast et protège à l'exécution.",
          "Cast interdit : changer un type en un type incompatible (`as unknown as X`) — c'est un mensonge au compilateur.",
          "Règle : si le cast peut être faux à l'exécution, vérifiez au lieu de caster.",
        ],
      },
    ],
  },
  {
    id: "queryselector-generics",
    title: "`querySelector` générique",
    level: 3,
    intro: "Le paramètre de type qui précise l'élément retourné.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Préciser le type d'élément",
        code: `// Sans générique : Element | null (trop vague)\nconst vague = document.querySelector("#email");\n\n// Avec générique : le bon type d'élément\nconst email = document.querySelector<HTMLInputElement>("#email");\n// HTMLInputElement | null → .value accessible après vérification\n\n// querySelectorAll : NodeListOf<T>, itérable et typée\nconst buttons = document.querySelectorAll<HTMLButtonElement>("button.action");\nbuttons.forEach((btn) => {\n  // btn: HTMLButtonElement\n  btn.disabled = true;\n});\n\n// Le générique ne VÉRIFIE rien : si #email est un <div>, le cast ment\n// (c'est une assertion, pas une garde)`,
      },
      {
        kind: "text",
        text: "Le générique de `querySelector` est une assertion : il dit au compilateur quel élément attendre, sans vérification à l'exécution. Si le sélecteur ne correspond pas au type annoncé, le mensonge se paie au runtime. Pour les éléments critiques, combinez avec `instanceof`.",
      },
    ],
  },
  {
    id: "evenements-natifs-detail",
    title: "Événements natifs en détail",
    level: 3,
    intro: "La hiérarchie des événements et leurs propriétés.",
    blocks: [
      {
        kind: "table",
        headers: ["Événement", "Type", "Propriétés utiles"],
        rows: [
          ["`click`, `mousedown`", "`MouseEvent`", "`clientX`, `clientY`, `button`, `shiftKey`"],
          ["`keydown`, `keyup`", "`KeyboardEvent`", "`key`, `code`, `ctrlKey`, `metaKey`"],
          ["`submit`", "`SubmitEvent`", "`submitter` (le bouton utilisé)"],
          ["`input`, `change`", "`Event`", "cible à caster (`HTMLInputElement`)"],
          ["`focus`, `blur`", "`FocusEvent`", "`relatedTarget`"],
        ],
      },
      {
        kind: "code",
        language: "typescript",
        title: "Formulaire : l'exemple complet",
        code: `const form = document.querySelector<HTMLFormElement>("#signup");\n\nform?.addEventListener("submit", (event) => {\n  // event: SubmitEvent\n  event.preventDefault();\n\n  const data = new FormData(form);\n  const email = data.get("email"); // FormDataEntryValue | null\n\n  if (typeof email === "string" && email.includes("@")) {\n    console.log("Email valide :", email);\n  }\n});`,
      },
    ],
  },
  {
    id: "evenements-react",
    title: "Événements React",
    level: 3,
    intro: "Les événements synthétiques : typés, normalisés, avec leurs pièges.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "SyntheticEvents",
        code: `import type { ChangeEvent, FormEvent, MouseEvent } from "react";\n\nfunction SignupForm() {\n  function handleChange(event: ChangeEvent<HTMLInputElement>) {\n    // event.target.value: string — target est typé par le générique !\n    console.log(event.target.value);\n  }\n\n  function handleSubmit(event: FormEvent<HTMLFormElement>) {\n    event.preventDefault();\n  }\n\n  function handleClick(event: MouseEvent<HTMLButtonElement>) {\n    // event.currentTarget: HTMLButtonElement (l'élément du handler)\n    event.currentTarget.disabled = true;\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input onChange={handleChange} />\n      <button type="submit" onClick={handleClick}>\n        Envoyer\n      </button>\n    </form>\n  );\n}`,
      },
      {
        kind: "list",
        items: [
          "En React, `event.target` est typé grâce au générique (`ChangeEvent<HTMLInputElement>`) — mieux que le DOM natif.",
          "`currentTarget` = l'élément qui porte le handler (typé) ; `target` = l'élément cliqué (peut être un enfant).",
          "Les événements React sont « poolés » historiquement : ne pas les utiliser en async sans `event.persist()` — en React 17+, le pooling a disparu, mais la prudence reste de mise avec les closures.",
          "Dans le JSX inline, le type est inféré : annotez seulement les handlers extraits en fonctions nommées.",
        ],
      },
    ],
  },
  {
    id: "props-composants",
    title: "Props : contrats des composants",
    level: 3,
    intro: "Concevoir des props qui se lisent comme de la documentation.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Props bien conçues",
        code: `// Littéraux pour les variantes : autocomplétion + exhaustivité\ninterface BadgeProps {\n  tone: "info" | "success" | "warning" | "error";\n  size?: "sm" | "md" | "lg";\n  children: React.ReactNode;\n}\n\n// Étendre les props natives : le composant accepte tout ce que <button> accepte\ninterface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {\n  variant?: "primary" | "secondary";\n}\n\nexport function Button({ variant = "primary", ...rest }: ButtonProps) {\n  return <button className={\`btn-\${variant}\`} {...rest} />;\n}\n\n// Usage : toutes les props natives sont disponibles et typées\n// <Button variant=\"primary\" onClick={...} disabled aria-label=\"...\" />`,
      },
      {
        kind: "list",
        items: [
          "Variantes en unions de littéraux : l'éditeur propose les valeurs, le compilateur refuse les autres.",
          "`extends React.ButtonHTMLAttributes<...>` : hériter des props natives au lieu de les redéclarer.",
          "`children: React.ReactNode` : le type standard pour le contenu (texte, éléments, fragments).",
          "Props optionnelles avec défauts : `disabled = false` dans la déstructuration — le type reste `boolean | undefined` en entrée, `boolean` à l'intérieur.",
        ],
      },
    ],
  },
  {
    id: "usestate-generics",
    title: "`useState` générique",
    level: 3,
    intro: "Le générique qui fige le type de l'état.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Typer l'état",
        code: `import { useState } from "react";\n\n// Inférence simple : pas besoin de générique\nconst [count, setCount] = useState(0); // number\nconst [name, setName] = useState(""); // string\n\n// Générique nécessaire : état initial null/undefined ou union\nconst [user, setUser] = useState<User | null>(null);\n// user: User | null — setUser n'accepte que User | null\n\n// Tableaux : le générique évite never[]\nconst [items, setItems] = useState<string[]>([]);\n\n// État paresseux : la fonction d'init est typée aussi\nconst [config] = useState<Config>(() => loadConfig());\n\n// setUser avec fonction : le paramètre est typé\nsetUser((prev) => (prev ? { ...prev, name: "Akane" } : prev));\n// prev: User | null`,
      },
      {
        kind: "text",
        text: "Règle : omettez le générique quand l'inférence suffit (`useState(0)`), ajoutez-le quand l'état initial est ambigu (`null`, `[]`, union). Un état typé `User | null` force à gérer l'absence à chaque lecture — c'est la protection, pas une contrainte.",
      },
    ],
  },
  {
    id: "useref-type",
    title: "`useRef` typé",
    level: 3,
    intro: "Refs DOM et refs mutables : deux usages, deux typages.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Les deux visages de useRef",
        code: `import { useRef, useEffect } from "react";\n\nfunction Player() {\n  // Ref DOM : initialisée à null, attachée au JSX\n  const videoRef = useRef<HTMLVideoElement>(null);\n\n  useEffect(() => {\n    // videoRef.current: HTMLVideoElement | null\n    videoRef.current?.play();\n  }, []);\n\n  // Ref mutable : valeur persistante sans re-render\n  const renders = useRef<number>(0);\n  renders.current += 1;\n\n  // Timer : le type du retour de setTimeout\n  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);\n\n  return <video ref={videoRef} src="/intro.mp4" />;\n}`,
      },
      {
        kind: "list",
        items: [
          "Ref DOM : `useRef<HTMLVideoElement>(null)` — `current` est `| null` jusqu'au montage, d'où le `?.`.",
          "`ref={videoRef}` : React remplit `current` au montage ; le type du JSX vérifie la compatibilité.",
          "Ref mutable : `useRef<number>(0)` — une « variable d'instance » qui survit aux renders sans les déclencher.",
          "`ReturnType<typeof setTimeout>` : le type du timer diffère entre navigateur (`number`) et Node — cette formule est portable.",
        ],
      },
    ],
  },
  {
    id: "useeffect-cleanup",
    title: "`useEffect` et le typage",
    level: 3,
    intro: "Ce que TypeScript vérifie (et ne vérifie pas) dans les effets.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Effets typés",
        code: `import { useEffect, useState } from "react";\n\nfunction UsersList() {\n  const [users, setUsers] = useState<User[]>([]);\n\n  useEffect(() => {\n    // Le cleanup doit retourner void ou une fonction : pas de Promise !\n    // useEffect(async () => {...}) — INTERDIT par les types\n\n    let cancelled = false;\n\n    async function load() {\n      const data = await fetchJson<User[]>("/api/users");\n      if (!cancelled) setUsers(data);\n    }\n    load();\n\n    return () => {\n      cancelled = true; // cleanup : éviter setState après démontage\n    };\n  }, []); // dépendances : tableau, vérifié comme tel (pas son contenu)\n\n  return <ul>{users.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;\n}`,
      },
      {
        kind: "text",
        text: "TypeScript interdit l'effet `async` direct (le retour serait une promesse, pas un cleanup) : déclarez une fonction async interne. Le tableau de dépendances n'est pas vérifié sémantiquement — c'est le rôle du linter (`eslint-plugin-react-hooks`), pas du compilateur.",
      },
    ],
  },
  {
    id: "custom-hooks",
    title: "Custom hooks typés",
    level: 3,
    intro: "Extraire de la logique avec des signatures précises.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "useLocalStorage générique",
        code: `import { useState, useEffect } from "react";\n\n// Hook générique : le type est décidé à l'appel\nexport function useLocalStorage<T>(key: string, initial: T) {\n  const [value, setValue] = useState<T>(() => {\n    try {\n      const raw = localStorage.getItem(key);\n      return raw ? (JSON.parse(raw) as T) : initial;\n    } catch {\n      return initial;\n    }\n  });\n\n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n\n  return [value, setValue] as const; // tuple : pas (T | Dispatch)[]\n}\n\n// Usage : le type est inféré\nconst [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");\n// theme: \"light\" | \"dark\" — setTheme n'accepte que ces valeurs`,
      },
      {
        kind: "text",
        text: "`as const` sur le retour fige le tuple : sans lui, le retour serait `(T | Dispatch<...>)[]` et la déstructuration perdrait les types. Les custom hooks sont des fonctions ordinaires : les génériques, les unions et les utilitaires s'y appliquent comme partout.",
      },
    ],
  },
  {
    id: "context-type",
    title: "Context typé",
    level: 3,
    intro: "Partager l'état sans props drilling — avec des types sûrs.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "createContext avec garde",
        code: `import { createContext, useContext } from "react";\n\ninterface ThemeContextValue {\n  theme: "light" | "dark";\n  toggle: () => void;\n}\n\n// null par défaut : le hook vérifie la présence du Provider\nconst ThemeContext = createContext<ThemeContextValue | null>(null);\n\nexport function useTheme(): ThemeContextValue {\n  const ctx = useContext(ThemeContext);\n  if (!ctx) {\n    throw new Error("useTheme doit être utilisé dans <ThemeProvider>");\n  }\n  return ctx; // ThemeContextValue garanti\n}\n\n// Alternative : valeur par défaut complète (pas de null)\n// const ThemeContext = createContext<ThemeContextValue>({ theme: \"light\", toggle: () => {} });`,
      },
      {
        kind: "text",
        text: "Deux écoles : défaut `null` + hook qui lance une erreur (échec explicite si le Provider manque), ou valeur par défaut complète (silencieux mais potentiellement trompeur). La première est préférable : un composant hors Provider est un bug, pas un cas nominal.",
      },
    ],
  },
  {
    id: "formulaires-controles",
    title: "Formulaires contrôlés typés",
    level: 3,
    intro: "L'état du formulaire comme source de vérité typée.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Formulaire contrôlé",
        code: `import { useState, type FormEvent, type ChangeEvent } from "react";\n\ninterface SignupData {\n  username: string;\n  email: string;\n}\n\nfunction SignupForm() {\n  const [form, setForm] = useState<SignupData>({ username: "", email: "" });\n  const [errors, setErrors] = useState<Partial<Record<keyof SignupData, string>>>({});\n\n  function handleChange(e: ChangeEvent<HTMLInputElement>) {\n    const { name, value } = e.target;\n    setForm((f) => ({ ...f, [name]: value }));\n  }\n\n  function handleSubmit(e: FormEvent<HTMLFormElement>) {\n    e.preventDefault();\n    const next: typeof errors = {};\n    if (form.username.length < 3) next.username = "3 caractères minimum";\n    if (!form.email.includes("@")) next.email = "Email invalide";\n    setErrors(next);\n    if (Object.keys(next).length === 0) {\n      console.log("Envoi :", form); // form: SignupData complet\n    }\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input name="username" value={form.username} onChange={handleChange} />\n      {errors.username && <p>{errors.username}</p>}\n      <input name="email" value={form.email} onChange={handleChange} />\n      {errors.email && <p>{errors.email}</p>}\n      <button type="submit\">Envoyer</button>\n    </form>\n  );\n}`,
      },
      {
        kind: "text",
        text: "`Partial<Record<keyof SignupData, string>>` type les erreurs par champ : chaque clé de `SignupData` peut porter un message. Ajoutez un champ au formulaire, le type d'erreurs suit. La validation reste manuelle ici — pour des schémas déclaratifs, voyez la section validation.",
      },
    ],
  },
  {
    id: "validation-runtime",
    title: "Validation à l'exécution",
    level: 3,
    intro: "Les types sont effacés : les données externes se valident, pas seulement se typent.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Garde maison vs schéma",
        code: `// Option 1 : garde maison (zéro dépendance)\ninterface User {\n  id: string;\n  name: string;\n}\n\nfunction isUser(value: unknown): value is User {\n  return (\n    typeof value === "object" &&\n    value !== null &&\n    typeof (value as Record<string, unknown>).id === "string" &&\n    typeof (value as Record<string, unknown>).name === "string"\n  );\n}\n\nasync function loadUser(id: string): Promise<User> {\n  const data: unknown = await (await fetch(\`/api/users/\${id}\`)).json();\n  if (!isUser(data)) {\n    throw new Error("Réponse API inattendue");\n  }\n  return data; // User garanti\n}`,
      },
      {
        kind: "list",
        items: [
          "Principe : toute donnée externe (`fetch`, `localStorage`, URL, `postMessage`) entre en `unknown` et traverse une validation.",
          "Garde maison : suffisante pour 2-3 champs, zéro dépendance, lisible.",
          "Bibliothèques de schémas (validation déclarative) : pertinentes quand les formes se multiplient — un schéma décrit la forme une fois et produit le type + la validation.",
          "Le cast `as T` direct sur `res.json()` reste acceptable en prototype, jamais comme contrat de production.",
        ],
      },
    ],
  },
  {
    id: "narrowing-rendu",
    title: "Narrowing dans le rendu",
    level: 3,
    intro: "L'affinement au service du JSX : rendus conditionnels sûrs.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Rendu par état affiné",
        code: `type State =\n  | { status: "idle" }\n  | { status: "loading" }\n  | { status: "success"; users: User[] }\n  | { status: "error"; message: string };\n\nfunction UsersView({ state }: { state: State }) {\n  // Early returns : chaque branche est affinée\n  if (state.status === "loading") return <p>Chargement…</p>;\n  if (state.status === "error") return <p>Erreur : {state.message}</p>;\n  if (state.status === "idle") return <p>En attente.</p>;\n\n  // Ici, state est affiné : { status: \"success\"; users: User[] }\n  return (\n    <ul>\n      {state.users.map((u) => (\n        <li key={u.id}>{u.name}</li>\n      ))}\n    </ul>\n  );\n}\n\n// Rendu conditionnel inline avec &&\nfunction Badge({ user }: { user: User | null }) {\n  return <div>{user && <span>{user.name}</span>}</div>;\n  // user && ... : si user est null, rien n'est rendu\n}`,
      },
      {
        kind: "text",
        text: "Les early returns sont le motif le plus lisible : chaque cas est traité dans sa branche, et le cas principal (succès) reste au niveau d'indentation zéro. Le narrowing fait le reste — `state.users` est accessible sans `?.` défensif dans la branche succès.",
      },
    ],
  },
  {
    id: "unions-etats-ui",
    title: "Unions d'états UI",
    level: 3,
    intro: "Modéliser le cycle de vie d'une vue avec des unions discriminées.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "AsyncState générique",
        code: `type AsyncState<T> =\n  | { status: "idle" }\n  | { status: "loading" }\n  | { status: "success"; data: T }\n  | { status: "error"; error: string };\n\n// Chaque état porte exactement ses données :\n// - pas de data fantôme en loading\n// - pas d'erreur possible en success\n// - impossible d'avoir loading ET error à la fois\n\nfunction useAsync<T>(fn: () => Promise<T>) {\n  const [state, setState] = useState<AsyncState<T>>({ status: "idle" });\n\n  async function run() {\n    setState({ status: "loading" });\n    try {\n      const data = await fn();\n      setState({ status: "success", data });\n    } catch (e) {\n      setState({ status: "error", error: String(e) });\n    }\n  }\n\n  return [state, run] as const;\n}`,
      },
      {
        kind: "text",
        text: "Comparez à `{ data, loading, error }` séparés : 8 combinaisons possibles dont 5 absurdes. L'union discriminée n'autorise que les 4 états réels. C'est le motif standard pour tout chargement de données côté frontend.",
      },
    ],
  },
  {
    id: "utility-types-props",
    title: "Utility types pour les props",
    level: 3,
    intro: "`Pick`, `Omit`, `Partial` appliqués aux composants.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Dériver des props",
        code: `interface User {\n  id: string;\n  name: string;\n  email: string;\n  role: "admin" | "member";\n}\n\n// Le composant n'a besoin que de deux champs\nfunction UserBadge(props: Pick<User, "id" | "name">) {\n  return <span>{props.name}</span>;\n}\n\n// Étendre les props natives en retirant les conflits\ninterface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {\n  onChange: (value: string) => void; // signature simplifiée\n}\n\nfunction Input({ onChange, ...rest }: InputProps) {\n  return (\n    <input\n      {...rest}\n      onChange={(e) => onChange(e.target.value)}\n    />\n  );\n}\n// <Input onChange={(v) => ...} placeholder=\"...\" /> — v: string`,
      },
      {
        kind: "text",
        text: "`Omit` sur les props natives permet de redéfinir une prop avec une meilleure signature (`onChange: (value: string) => void` au lieu de l'événement brut). Le composant expose une API simple ; l'adaptation vit à l'intérieur.",
      },
    ],
  },
  {
    id: "generics-composants",
    title: "Composants génériques",
    level: 3,
    intro: "Des composants réutilisables sans perdre la précision des types.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Liste générique typée",
        code: `// Un composant générique : T est décidé à l'usage\ninterface ListProps<T> {\n  items: T[];\n  renderItem: (item: T, index: number) => React.ReactNode;\n  keyOf: (item: T) => string;\n}\n\n// Note : en .tsx, la virgule après T (syntaxe <T,>) distingue\n// le générique d'une balise JSX\nfunction List<T,>({ items, renderItem, keyOf }: ListProps<T>) {\n  return (\n    <ul>\n      {items.map((item, i) => (\n        <li key={keyOf(item)}>{renderItem(item, i)}</li>\n      ))}\n    </ul>\n  );\n}\n\n// Usage : T = User, inféré — renderItem reçoit un User typé\n// <List items={users} keyOf={(u) => u.id} renderItem={(u) => u.name} />`,
      },
      {
        kind: "text",
        text: "La virgule dans `<T,>` est obligatoire en `.tsx` : sans elle, `<T>` est parsé comme une balise JSX. Les composants génériques (listes, tableaux, selects) sont le principal cas d'usage des génériques côté frontend : un seul composant, une précision totale à chaque usage.",
      },
    ],
  },
  {
    id: "nextjs-pages",
    title: "Next.js : pages typées",
    level: 3,
    intro: "L'App Router et ses conventions de typage.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "app/users/[id]/page.tsx",
        code: `// Les props de page suivent les conventions de l'App Router\ninterface PageProps {\n  params: { id: string };\n  searchParams: { [key: string]: string | string[] | undefined };\n}\n\nexport default async function UserPage({ params }: PageProps) {\n  // params.id: string — le segment dynamique [id]\n  const user = await fetchJson<User>(\`/api/users/\${params.id}\`);\n\n  return (\n    <main>\n      <h1>{user.name}</h1>\n    </main>\n  );\n}\n\n// Métadonnées typées\nimport type { Metadata } from "next";\n\nexport const metadata: Metadata = {\n  title: "Profil utilisateur",\n  description: "Page de profil",\n};`,
      },
      {
        kind: "text",
        text: "Dans l'App Router, les pages sont des composants async qui reçoivent `params` (segments dynamiques) et `searchParams`. Typer ces props rend la navigation sûre : un segment renommé dans le dossier mais pas dans le code devient une erreur de compilation.",
      },
    ],
  },
  {
    id: "server-vs-client",
    title: "Server Components vs Client Components",
    level: 3,
    intro: "La frontière qui structure le typage Next.js moderne.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Server Component (défaut)", "Client Component (`\"use client\"`)"],
        rows: [
          ["Exécution", "Serveur uniquement", "Navigateur (hydratation)"],
          ["Hooks / état", "Interdits", "Autorisés"],
          ["Événements", "Non", "Oui"],
          ["Accès direct", "Base de données, secrets, `process.env`", "APIs navigateur, `localStorage`"],
          ["Types", "Peut retourner des promesses (composant async)", "`useState<T>`, refs, contexte"],
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Composition par la frontière",
        code: `// app/dashboard/page.tsx — Server Component : charge les données\nimport { Stats } from "./stats"; // Client Component interactif\n\ninterface StatsData {\n  users: number;\n  revenue: number;\n}\n\nexport default async function Dashboard() {\n  const data: StatsData = await fetchJson<StatsData>("/api/stats");\n\n  // Les données sérialisables traversent la frontière vers le client\n  return <Stats data={data} />;\n}\n\n// app/dashboard/stats.tsx — \"use client\" : interactivité\n// "use client";\n// Les props reçues doivent être sérialisables (pas de fonctions complexes,\n// pas de classes) : la contrainte est d'exécution, les types la documentent`,
      },
      {
        kind: "text",
        text: "Règle de composition : les données sont chargées côté serveur (typées via les mêmes utilitaires), l'interactivité vit dans des Client Components qui reçoivent des props sérialisables. Les types documentent ce qui traverse la frontière — le runtime l'impose.",
      },
    ],
  },
  {
    id: "api-routes-types",
    title: "Routes API typées",
    level: 3,
    intro: "Typer les handlers : requête entrante, réponse sortante.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "app/api/users/route.ts",
        code: `import { NextRequest, NextResponse } from "next/server";\n\ninterface CreateUserBody {\n  name: string;\n  email: string;\n}\n\n// POST /api/users\nexport async function POST(request: NextRequest) {\n  const body: unknown = await request.json();\n\n  if (!isCreateUserBody(body)) {\n    return NextResponse.json({ error: "Corps invalide" }, { status: 400 });\n  }\n\n  // body: CreateUserBody — validé\n  const user = { id: crypto.randomUUID(), ...body };\n  return NextResponse.json(user, { status: 201 });\n}\n\nfunction isCreateUserBody(value: unknown): value is CreateUserBody {\n  return (\n    typeof value === "object" &&\n    value !== null &&\n    typeof (value as Record<string, unknown>).name === "string" &&\n    typeof (value as Record<string, unknown>).email === "string"\n  );\n}\n\n// GET /api/users/[id] : les params sont typés comme les pages\n// export async function GET(_req: NextRequest, { params }: { params: { id: string } })`,
      },
      {
        kind: "text",
        text: "Le corps d'une requête entre en `unknown` : la garde `isCreateUserBody` le valide avant usage. Partagez les interfaces (`CreateUserBody`) entre la route et le client via un module commun : un seul contrat, vérifié des deux côtés.",
      },
    ],
  },
  {
    id: "vite-env",
    title: "Variables d'environnement Vite",
    level: 3,
    intro: "`import.meta.env` typé : la configuration sans `any`.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "vite-env.d.ts",
        code: `// src/vite-env.d.ts — généré par le template, à compléter\n/// <reference types=\"vite/client\" />\n\ninterface ImportMetaEnv {\n  readonly VITE_API_URL: string;\n  readonly VITE_SENTRY_DSN?: string;\n}\n\ninterface ImportMeta {\n  readonly env: ImportMetaEnv;\n}\n\n// Usage : autocomplété et typé\nconst apiUrl: string = import.meta.env.VITE_API_URL;\n// import.meta.env.VITE_TYPO; // erreur : n'existe pas dans ImportMetaEnv`,
      },
      {
        kind: "list",
        items: [
          "Seules les variables préfixées `VITE_` sont exposées au client : c'est une règle de Vite, pas de TypeScript.",
          "Déclarez chaque variable dans `ImportMetaEnv` : une faute de frappe devient une erreur de compilation.",
          "Les variables restent des `string` : convertissez explicitement (`Number(...)`, comparaison à `\"true\"`).",
          "Ne jamais y mettre de secret : le contenu est embarqué dans le JavaScript servi au navigateur.",
        ],
      },
    ],
  },
  {
    id: "vite-ne-verifie-pas",
    title: "Vite ne vérifie pas les types",
    level: 3,
    intro: "Le point le plus mal compris du tooling frontend : esbuild retire les types sans les lire.",
    blocks: [
      {
        kind: "diagram",
        title: "Deux outils, deux rôles",
        lines: [
          "Vite / esbuild",
          "  → retire les types (strip), transpile le JSX",
          "  → rapide, mais AVEUGLE aux erreurs de types",
          "  → un code mal typé build sans protester",
          "",
          "tsc --noEmit",
          "  → VÉRIFIE les types, n'émet rien",
          "  → lent, mais voit tout",
          "  → à lancer en dev, en CI, en pre-commit",
        ],
      },
      {
        kind: "code",
        language: "json",
        title: "package.json — les deux scripts",
        code: `{\n  "scripts": {\n    "dev": "vite",\n    "build": "tsc --noEmit && vite build",\n    "typecheck": "tsc --noEmit",\n    "preview": "vite preview"\n  }\n}`,
      },
      {
        kind: "text",
        text: "Le template Vite inclut `tsc --noEmit && vite build` : le build échoue si les types sont faux. Ne retirez jamais la première partie pour « aller plus vite » — c'est exactement la protection qui justifie TypeScript. En CI, `npm run typecheck` est une étape obligatoire.",
      },
    ],
  },
  {
    id: "assets-declarations",
    title: "Déclarer les assets",
    level: 3,
    intro: "Importer images, CSS et SVG en TypeScript : les déclarations du template.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Ce que fournit vite/client",
        code: `// Via /// <reference types=\"vite/client\" /> :\n// declare module \"*.png\"  → { default: string }\n// declare module \"*.css\"  → { default: Record<string, string> }\n// declare module \"*.svg\"  → { default: string }\n\nimport logo from "./logo.png"; // logo: string (URL)\nimport styles from "./button.module.css"; // styles: Record<string, string>\n\n// <img src={logo} className={styles.primary} />\n\n// Pour un format non couvert, déclarez vous-même :\n// src/types/assets.d.ts\ndeclare module "*.avif" {\n  const src: string;\n  export default src;\n}`,
      },
      {
        kind: "text",
        text: "`vite/client` fournit les déclarations des assets courants : un import d'image donne une `string` (l'URL), un module CSS un dictionnaire de classes. Sans ces déclarations, chaque import d'asset est une erreur `Cannot find module`.",
      },
    ],
  },
  {
    id: "strict-frontend",
    title: "Le mode strict côté frontend",
    level: 3,
    intro: "Ce que `strict` change concrètement dans une app navigateur.",
    blocks: [
      {
        kind: "fields",
        title: "Impacts frontend du strict",
        fields: [
          {
            label: "`strictNullChecks`",
            value:
              "Le DOM est plein de `| null` (`getElementById`, `querySelector`, `current` des refs) : le strict force à gérer chaque absence. C'est 80 % de la valeur du strict côté frontend.",
          },
          {
            label: "`noImplicitAny`",
            value:
              "Les handlers d'événements et les callbacks doivent être typés ou inférables : fini les paramètres implicites `any` dans les `.map` et les handlers.",
          },
          {
            label: "`strictFunctionTypes`",
            value:
              "Vérifie la compatibilité des callbacks (handlers, props de type fonction) : un handler incompatible est refusé à la compilation.",
          },
          {
            label: "`noUncheckedIndexedAccess`",
            value:
              "Optionnel mais précieux : `list[i]` devient `T | undefined` — les accès par index dans les rendus de listes sont sécurisés.",
          },
        ],
      },
    ],
  },
  {
    id: "tests-frontend",
    title: "Tester les composants",
    level: 3,
    intro: "Vitest + Testing Library : tester ce que l'utilisateur voit.",
    blocks: [
      {
        kind: "command",
        label: "Installer l'outillage de test",
        command: "npm install --save-dev vitest jsdom @testing-library/react",
        why: "Vitest exécute les tests, `jsdom` simule le DOM dans Node, Testing Library rend les composants et simule les interactions utilisateur. Tester les composants complète les types : les types prouvent les formes, les tests prouvent les comportements visibles.",
        verify: "npx vitest run",
      },
      {
        kind: "code",
        language: "tsx",
        title: "Button.test.tsx",
        code: `import { describe, it, expect, vi } from "vitest";\nimport { render, screen, fireEvent } from "@testing-library/react";\nimport { Button } from "./Button";\n\ndescribe("Button", () => {\n  it("affiche le label", () => {\n    render(<Button label="Envoyer" onClick={() => {}} />);\n    expect(screen.getByRole("button", { name: "Envoyer" })).toBeDefined();\n  });\n\n  it("appelle onClick au clic", () => {\n    const onClick = vi.fn();\n    render(<Button label=\"Go\" onClick={onClick} />);\n    fireEvent.click(screen.getByRole("button"));\n    expect(onClick).toHaveBeenCalledOnce();\n  });\n\n  it("est désactivé avec disabled", () => {\n    render(<Button label=\"Go\" onClick={() => {}} disabled />);\n    expect(screen.getByRole("button")).toHaveProperty("disabled", true);\n  });\n});`,
      },
      {
        kind: "text",
        text: "Note : `jsdom` doit être déclaré comme environnement de test (option `environment: \"jsdom\"` dans la config Vitest ou commentaire `// @vitest-environment jsdom`). Testez par rôle accessible (`getByRole`) : vos tests vérifient du même coup l'accessibilité de base.",
      },
    ],
  },
  {
    id: "debugging-frontend",
    title: "Déboguer avec les sourcemaps",
    level: 3,
    intro: "Retrouver son TypeScript dans les outils de développement.",
    blocks: [
      {
        kind: "fields",
        title: "DevTools et TypeScript",
        fields: [
          {
            label: "Sourcemaps en dev",
            value:
              "Vite génère des sourcemaps en développement : dans l'onglet Sources des DevTools, retrouvez vos fichiers `.ts`/`.tsx` originaux avec les types visibles.",
          },
          {
            label: "Points d'arrêt",
            value:
              "Posez les breakpoints dans le fichier `.tsx` affiché via la sourcemap : l'exécution s'arrête là, avec les variables du scope.",
          },
          {
            label: "`debugger`",
            value:
              "L'instruction `debugger` dans le `.tsx` fonctionne via la sourcemap : pratique pour un arrêt conditionnel rapide.",
          },
          {
            label: "React DevTools",
            value:
              "L'extension React DevTools affiche l'arbre des composants avec leurs props : vérifiez que les props reçues correspondent aux types déclarés.",
          },
          {
            label: "Erreurs de types vs erreurs runtime",
            value:
              "Une erreur de type n'apparaît jamais dans la console : si ça plante à l'exécution, c'est une donnée non validée ou une logique fausse — pas un « problème TypeScript ».",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les pièges classiques de TypeScript côté frontend, et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Croire que le build vérifie les types",
            value:
              "Problem : `vite build` passe avec des erreurs de types. Why : esbuild retire les types sans les vérifier. Bad example : déployer sans `tsc`. Better : script build qui enchaine `tsc --noEmit` puis `vite build`, et `typecheck` en CI., `typecheck` en CI.",
          },
          {
            label: "Caster les réponses d'API sans valider",
            value:
              "Problem : `as User` sur `res.json()` ment si l'API change. Why : les types sont effacés, le cast n'est pas une validation. Bad example : `const u = await res.json() as User`. Better : garde `isUser` ou schéma de validation.",
          },
          {
            label: "Oublier le `| null` du DOM",
            value:
              "Problem : crash sur `getElementById` quand l'élément manque. Why : accès direct sans vérification. Bad example : `document.getElementById(\"x\").innerHTML`. Better : `if (el)` ou `?.` — le strict l'exige.",
          },
          {
            label: "`useState` sans générique sur `[]`",
            value:
              "Problem : `useState([])` infère `never[]`, chaque `setState` échoue. Why : l'inférence ne devine pas le contenu. Bad example : `useState([])`. Better : `useState<string[]>([])`.",
          },
          {
            label: "Générique JSX sans virgule",
            value:
              "Problem : `function List<T>(...)` en `.tsx` est parsé comme du JSX. Why : ambiguïté syntaxique. Bad example : `<T>` seul. Better : `<T,>` avec la virgule.",
          },
          {
            label: "Effet `async` direct",
            value:
              "Problem : `useEffect(async () => ...)` refusé par les types. Why : le retour doit être un cleanup, pas une promesse. Bad example : effet async. Better : fonction async déclarée à l'intérieur de l'effet.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro: "Des repères de contexte, pas des règles absolues.",
    blocks: [
      {
        kind: "list",
        items: [
          "Vérifier les types séparément : `tsc --noEmit` en dev, en pre-commit et en CI — jamais seulement le build Vite.",
          "Valider les données externes : `unknown` + garde à chaque frontière (API, formulaires, URL, storage).",
          "Props explicites : interfaces nommées, variantes en littéraux, `children: ReactNode` quand pertinent.",
          "État minimal et typé : `useState<T>` précis, unions discriminées pour les cycles de vie (`AsyncState`).",
          "Early returns dans le rendu : un cas par branche, le cas principal à indentation zéro.",
          "Composants génériques (`<T,>`) pour les listes et structures réutilisables.",
          "Partager les contrats : mêmes interfaces côté client et serveur (monorepo ou module partagé).",
          "Tester les comportements : Testing Library par rôle accessible, un test par état de l'union.",
          "Sourcemaps en dev : déboguer dans le `.tsx`, pas dans le JavaScript compilé.",
        ],
      },
      {
        kind: "text",
        text: "Contexte : un prototype peut se contenter de casts pragmatiques ; une application en production exige validation des données, `tsc` en CI et tests des parcours critiques. Le curseur se règle selon la durée de vie du code.",
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
            label: "TypeScript Handbook",
            value:
              "typescriptlang.org/docs : la référence du langage, dont le DOM (`lib.dom.d.ts`) et le JSX.",
          },
          {
            label: "React — TypeScript",
            value:
              "react.dev : la documentation officielle couvre le typage des composants, hooks et événements avec des exemples.",
          },
          {
            label: "Vite",
            value:
              "vite.dev : le guide officiel, dont la section TypeScript (vérification, `vite/client`, variables d'environnement).",
          },
          {
            label: "Next.js",
            value:
              "nextjs.org/docs : les conventions de typage de l'App Router, des pages et des routes API.",
          },
          {
            label: "MDN",
            value:
              "developer.mozilla.org : la référence des APIs DOM — ce que les types décrivent, MDN l'explique.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Outils : React DevTools (extension navigateur) pour inspecter props et état.",
          "Practice : retyper un petit projet JavaScript existant, en commençant par le DOM puis les composants.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "TypeScript côté frontend maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "React : composants avancés, performance, patterns — le framework en profondeur.",
          "Next.js : App Router, Server Components, rendu et déploiement.",
          "State management : partager l'état proprement quand les props ne suffisent plus.",
          "Tests : Testing Library en profondeur, tests end-to-end des parcours critiques.",
          "Revenir à la roadmap : valider TypeScript et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

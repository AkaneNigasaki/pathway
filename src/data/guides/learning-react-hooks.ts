import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète des Hooks React : de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Cohérent avec le guide existant (useState, useEffect, useRef, useMemo,
 * custom hooks, règles des hooks).
 */
export const LEARNING_REACT_HOOKS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce que sont les hooks, pourquoi ils ont remplacé les classes et ce qu'ils permettent.",
    blocks: [
      {
        kind: "text",
        text: "Les hooks sont des fonctions spéciales (reconnaissables à leur préfixe `use`) qui donnent aux composants fonctionnels accès à l'état (`useState`), aux effets de bord (`useEffect`), au contexte et à la mémoïsation. Avant eux, seules les classes pouvaient porter de l'état ou du cycle de vie.",
      },
      {
        kind: "text",
        text: "Pourquoi les hooks ont gagné : les classes mélangeaient des logiques sans rapport dans les mêmes méthodes de cycle de vie (`componentDidMount` faisait le fetch, l'abonnement et le timer), et la réutilisation de logique passait par des patterns complexes (HOC, render props). Les hooks permettent d'extraire chaque préoccupation dans une fonction réutilisable — les custom hooks — et de composer les comportements au lieu de les hériter.",
      },
      {
        kind: "text",
        text: "L'idée centrale : un composant est une fonction qui décrit l'UI à partir de l'état, et les hooks sont la grammaire de cette description — état local, synchronisation avec l'extérieur, optimisation. Tout l'écosystème React moderne (React Router, TanStack Query, Zustand) s'écrit avec des hooks : les comprendre, c'est comprendre React.",
      },
    ],
  },
  {
    id: "hooks-carte-mentale",
    title: "La carte mentale des hooks",
    level: 1,
    intro:
      "Six hooks, deux règles : le minimum vital en un schéma.",
    blocks: [
      {
        kind: "diagram",
        title: "Les hooks essentiels et leurs rôles",
        lines: [
          "ÉTAT",
          " useState ─── valeur + setter, re-rendu à chaque changement",
          " useReducer ─ état complexe, transitions explicites",
          "     │",
          "SYNCHRONISATION",
          " useEffect ─── synchroniser avec l'extérieur (API, DOM, timers)",
          "     │  cleanup à la fin",
          "     ▼",
          "RÉFÉRENCES & PERF",
          " useRef ─── boîte mutable, survit aux rendus, n'en déclenche pas",
          " useMemo / useCallback ─── mémoriser calculs et fonctions",
          "     │",
          "COMPOSITION",
          " Custom hooks ─── useFetch, useLocalStorage : logique réutilisable",
          "",
          "RÈGLES : 1) toujours au niveau racine  2) jamais dans des conditions",
        ],
      },
      {
        kind: "text",
        text: "La distinction fondamentale : `useState`/`useReducer` décrivent ce que le composant affiche, `useEffect` synchronise le composant avec ce qui est hors de React (réseau, timers, DOM impératif). La majorité des bugs viennent de confondre les deux — mettre dans un effet ce qui devrait être calculé pendant le rendu.",
      },
      {
        kind: "list",
        items: [
          "État = mémoire du composant ; effet = synchronisation avec l'extérieur.",
          "Les règles des hooks garantissent un ordre d'appel stable : React s'y fie pour associer chaque hook à son état.",
          "Un custom hook n'est qu'une fonction qui appelle des hooks : la réutilisation sans classes ni HOC.",
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
      "Ce qu'il faut maîtriser avant les hooks, et pourquoi.",
    blocks: [
      {
        kind: "fields",
        title: "Fondations requises",
        fields: [
          {
            label: "JavaScript moderne",
            value:
              "Fonctions fléchées, déstructuration, spread, modules : les hooks sont des fonctions JavaScript, leur syntaxe doit être fluide.",
          },
          {
            label: "React de base (`react`)",
            value:
              "Composants, props, JSX, rendu : les hooks s'utilisent dans des composants, pas à la place d'eux.",
          },
          {
            label: "Closures",
            value:
              "Une fonction qui capture les variables de sa portée : c'est le mécanisme derrière les « stale closures », le bug le plus fréquent des hooks.",
          },
          {
            label: "Async / Promises",
            value:
              "`fetch`, `async`/`await` : la plupart des `useEffect` appellent des API — il faut comprendre l'asynchrone pour gérer chargement et erreurs.",
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
      "Un projet React moderne pour pratiquer les hooks.",
    blocks: [
      {
        kind: "command",
        label: "Créer un projet React + TypeScript",
        command: "npm create vite@latest hooks-lab -- --template react-ts",
        why: "Crée un projet React 18+ avec TypeScript via Vite : démarrage instantané, HMR rapide. Les hooks sont natifs depuis React 16.8 — aucune librairie à installer, ils font partie de React.",
        verify: "npm list react",
      },
      {
        kind: "command",
        label: "Installer les dépendances et lancer",
        command: "npm install && npm run dev",
        why: "Installe `react` et `react-dom`, puis démarre le serveur de développement. Le StrictMode est activé par défaut dans le template : il double-invoque les effets en dev pour révéler les bugs — c'est voulu, voir la section dédiée.",
        verify: "curl -s -o /dev/null -w \"%{http_code}\" http://localhost:5173",
      },
    ],
  },
  {
    id: "premier-composant-hooks",
    title: "Premier composant avec hooks",
    level: 2,
    intro:
      "Compteur, fetch de données, timer : les trois motifs de base en un composant.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "État local avec useState",
            detail:
              "`const [count, setCount] = useState(0)` : `count` est la valeur, `setCount` la fonction de mise à jour. Chaque appel à `setCount` re-rend le composant avec la nouvelle valeur.",
          },
          {
            title: "Effet de synchronisation avec useEffect",
            detail:
              "`useEffect(() => { ... }, [])` : le code s'exécute après le montage. Y placer le `fetch` vers l'API, stocker le résultat dans un `useState`.",
          },
          {
            title: "Nettoyage avec la fonction de cleanup",
            detail:
              "Retourner une fonction depuis l'effet (`return () => clearInterval(id)`) : React l'appelle au démontage ou avant de rejouer l'effet. Sans cleanup, les timers et abonnements fuient.",
          },
          {
            title: "Référence mutable avec useRef",
            detail:
              "`const timer = useRef<number>()` : stocke l'identifiant du timer entre les rendus sans déclencher de re-rendu — parfait pour les valeurs impératives.",
          },
          {
            title: "Vérifier les règles",
            detail:
              "Tous les hooks sont appelés au niveau racine du composant, dans le même ordre à chaque rendu : jamais dans un `if`, une boucle ou après un `return` conditionnel.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Les trois motifs réunis",
        code: "import { useEffect, useRef, useState } from \"react\";\n\nexport function Dashboard() {\n  const [count, setCount] = useState(0);\n  const [user, setUser] = useState<string | null>(null);\n  const timer = useRef<number | undefined>(undefined);\n\n  useEffect(() => {\n    // Effet : synchronisation avec l'extérieur (API)\n    fetch(\"https://api.github.com/users/octocat\")\n      .then((r) => r.json())\n      .then((d) => setUser(d.name));\n  }, []); // [] = une fois au montage\n\n  useEffect(() => {\n    // Effet avec cleanup : timer\n    timer.current = window.setInterval(() => {\n      setCount((c) => c + 1); // forme fonctionnelle : valeur à jour\n    }, 1000);\n    return () => clearInterval(timer.current); // cleanup\n  }, []);\n\n  return (\n    <div>\n      <p>Compteur : {count}</p>\n      <p>Utilisateur : {user ?? \"chargement…\"}</p>\n      <button onClick={() => setCount(0)}>Réinitialiser</button>\n    </div>\n  );\n}",
      },
    ],
  },
  {
    id: "usestate-details",
    title: "useState en détail",
    level: 2,
    intro:
      "Le hook le plus utilisé : ses formes, ses pièges, ses limites.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Formes et mises à jour",
        code: "const [count, setCount] = useState(0);\n\n// Mise à jour simple\nsetCount(5);\n\n// Mise à jour fonctionnelle : basée sur la valeur précédente\nsetCount((c) => c + 1);\n\n// État initial coûteux : fonction d'initialisation (une seule fois)\nconst [data, setData] = useState(() => computeExpensive());\n\n// Objets : remplacer, pas muter\nconst [user, setUser] = useState({ name: \"Lea\", age: 30 });\nsetUser({ ...user, age: 31 }); // nouveau objet -> re-rendu",
      },
      {
        kind: "text",
        text: "Points clés : `setState` est asynchrone et groupé (batching) — lire l'état juste après `setCount` donne l'ancienne valeur ; la forme fonctionnelle `setCount(c => c + 1)` est obligatoire quand la nouvelle valeur dépend de l'ancienne (timers, compteurs rapides) ; l'état est immutable — muter l'objet existant ne déclenche pas de re-rendu car React compare les références.",
      },
      {
        kind: "list",
        items: [
          "Un `useState` par préoccupation, pas un objet géant : des états indépendants se mettent à jour indépendamment.",
          "Dériver pendant le rendu plutôt que stocker : `const fullName = first + last` — pas besoin d'état pour ce qui se calcule.",
          "L'état doit être le minimum : tout ce qui se dérive des props ou d'autres états n'est pas de l'état.",
        ],
      },
    ],
  },
  {
    id: "useeffect-bases",
    title: "useEffect : les bases",
    level: 2,
    intro:
      "Le hook le plus puissant et le plus piégeux : quand l'utiliser, et surtout quand ne pas.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois formes",
        fields: [
          {
            label: "`useEffect(fn)` — sans dépendances",
            value:
              "S'exécute après chaque rendu. Rarement ce qu'on veut : risque de boucle infinie si l'effet met à jour l'état.",
          },
          {
            label: "`useEffect(fn, [])` — tableau vide",
            value:
              "S'exécute une fois au montage (+ cleanup au démontage). Pour les synchronisations uniques : fetch initial, abonnement.",
          },
          {
            label: "`useEffect(fn, [a, b])` — avec dépendances",
            value:
              "Se rejoue quand `a` ou `b` change. La forme courante : resynchroniser quand les entrées changent.",
          },
        ],
      },
      {
        kind: "text",
        text: "La règle mentale : `useEffect` sert à synchroniser avec l'extérieur de React (API, DOM impératif, timers, abonnements). Si le calcul peut se faire pendant le rendu à partir des props/état, ce n'est pas un effet — c'est une dérivation. La majorité des `useEffect` inutiles viennent de cette confusion.",
      },
      {
        kind: "code",
        language: "tsx",
        title: "Effet vs dérivation",
        code: "// MAL : effet pour ce qui se calcule\nconst [fullName, setFullName] = useState(\"\");\nuseEffect(() => {\n  setFullName(`${first} ${last}`);\n}, [first, last]);\n\n// BIEN : calcul pendant le rendu\nconst fullName = `${first} ${last}`;",
      },
    ],
  },
  {
    id: "useref-details",
    title: "useRef en détail",
    level: 2,
    intro:
      "La boîte mutable : quand on a besoin d'une valeur qui survit sans re-rendre.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Les deux usages",
        code: "import { useEffect, useRef } from \"react\";\n\nfunction Player() {\n  // 1. Référence DOM : accès impératif\n  const inputRef = useRef<HTMLInputElement>(null);\n  // 2. Boîte mutable : valeur persistante sans re-rendu\n  const renders = useRef(0);\n\n  useEffect(() => {\n    renders.current += 1; // mutation : pas de re-rendu\n    inputRef.current?.focus();\n  });\n\n  return <input ref={inputRef} />;\n}",
      },
      {
        kind: "text",
        text: "`useRef` retourne un objet `{ current }` stable entre les rendus : le modifier ne re-rend pas — c'est à la fois sa force (timers, valeurs précédentes, flags) et son piège (l'UI ne se met pas à jour). Si la valeur doit s'afficher, c'est un état (`useState`), pas une ref.",
      },
      {
        kind: "list",
        items: [
          "Ne pas lire/écrire `ref.current` pendant le rendu : c'est un effet de bord, à faire dans `useEffect` ou un gestionnaire.",
          "`ref` sur un composant custom exige `forwardRef` (ou React 19, où les refs sont des props normales).",
          "Stocker la valeur précédente : `prev.current = value` dans un effet — le pattern classique.",
        ],
      },
    ],
  },
  {
    id: "regles-hooks",
    title: "Les règles des hooks",
    level: 2,
    intro:
      "Pourquoi ces deux règles existent — pas juste les apprendre, les comprendre.",
    blocks: [
      {
        kind: "fields",
        title: "Les deux règles",
        fields: [
          {
            label: "Toujours au niveau racine",
            value:
              "Jamais dans des conditions, boucles ou fonctions imbriquées. React associe chaque hook à son état par ordre d'appel : un `if` qui saute un hook décale tout et corrompt l'état.",
          },
          {
            label: "Uniquement dans React",
            value:
              "Dans des composants ou des custom hooks, jamais dans des fonctions ordinaires. Hors composant, il n'y a pas d'instance React à laquelle attacher l'état.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Règle violée / respectée",
        code: "// MAL : ordre d'appel variable\nif (user) {\n  const [data, setData] = useState(null); // parfois appelé, parfois non\n}\n\n// BIEN : toujours appelé, condition à l'intérieur\nconst [data, setData] = useState(null);\nuseEffect(() => {\n  if (user) fetchData(user).then(setData);\n}, [user]);",
      },
      {
        kind: "text",
        text: "Le plugin ESLint `eslint-plugin-react-hooks` vérifie ces règles automatiquement — l'installer n'est pas optionnel, c'est le filet de sécurité. Il signale aussi les dépendances d'effets manquantes, l'autre grande source de bugs.",
      },
    ],
  },
  {
    id: "custom-hooks-bases",
    title: "Custom hooks : les bases",
    level: 2,
    intro:
      "Extraire de la logique réutilisable : la vraie puissance des hooks.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "useLocalStorage : état persisté",
        code: "import { useEffect, useState } from \"react\";\n\nexport function useLocalStorage<T>(key: string, initial: T) {\n  const [value, setValue] = useState<T>(() => {\n    try {\n      const raw = localStorage.getItem(key);\n      return raw ? (JSON.parse(raw) as T) : initial;\n    } catch {\n      return initial;\n    }\n  });\n\n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n\n  return [value, setValue] as const;\n}\n\n// Usage : const [theme, setTheme] = useLocalStorage(\"theme\", \"clair\");",
      },
      {
        kind: "text",
        text: "Un custom hook est une fonction qui appelle des hooks et retourne ce qu'elle veut : état, callbacks, valeurs dérivées. Chaque composant qui l'appelle obtient sa propre instance d'état — il n'y a pas de partage magique. C'est le mécanisme de réutilisation de logique : `useFetch`, `useDebounce`, `useLocalStorage` forment la bibliothèque de tout projet.",
      },
    ],
  },
  {
    id: "environnement-developpement",
    title: "Environnement de développement",
    level: 2,
    intro:
      "Outillage : ce qui rend les hooks débogables.",
    blocks: [
      {
        kind: "fields",
        title: "Boîte à outils",
        fields: [
          {
            label: "React DevTools",
            value:
              "Extension navigateur : inspecter les hooks de chaque composant (état, effets), profiler les re-rendus. L'onglet Components montre les valeurs de chaque hook.",
          },
          {
            label: "eslint-plugin-react-hooks",
            value:
              "Vérifie les règles des hooks et les dépendances d'effets. Inclus par défaut dans les templates Vite/CRA : ne pas le désactiver.",
          },
          {
            label: "StrictMode",
            value:
              "Double-invoque les effets en développement pour exposer les cleanups manquants : un effet qui casse en double-invocation est un effet buggé.",
          },
          {
            label: "TypeScript",
            value:
              "Typer les états et les retours de custom hooks : `useState<User | null>(null)` — les erreurs de type attrapent les incohérences tôt.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-professionnel",
    title: "Comment travaillent les professionnels",
    level: 2,
    intro:
      "Les habitudes d'équipe autour des hooks.",
    blocks: [
      {
        kind: "diagram",
        title: "Cycle de vie d'une logique à hooks",
        lines: [
          "Besoin (fetch, persistance, timer…)",
          "     ↓",
          "Existe-t-il ? (librairie, hook existant du projet)",
          "     ↓ non",
          "Custom hook isolé : useXxx",
          "     ↓",
          "État minimal, effets avec cleanup, dépendances exhaustives",
          "     ↓",
          "Tests : renderHook + cas limites",
          "     ↓",
          "Documentation : quand l'utiliser, exemple",
        ],
      },
      {
        kind: "text",
        text: "La discipline pro : ne jamais dupliquer un `useEffect` de fetch dans dix composants — en faire un `useFetch` partagé. Nommer les customs hooks par intention (`useCurrentUser`, pas `useData`). Et relire chaque effet en se demandant « est-ce vraiment une synchronisation externe ? » — la moitié des effets en revue de code devraient être des dérivations.",
      },
    ],
  },
  {
    id: "debugging-hooks",
    title: "Déboguer : les premiers réflexes",
    level: 2,
    intro:
      "« Mon effet tourne en boucle » : la méthode systématique.",
    blocks: [
      {
        kind: "list",
        items: [
          "Boucle infinie ? L'effet met à jour un état qui est dans ses dépendances (ou sans dépendances) : ajouter le tableau correct ou déplacer la logique.",
          "Valeur obsolète (stale) ? L'effet ou le callback capture une ancienne valeur : vérifier les dépendances, utiliser la forme fonctionnelle du setter.",
          "Double exécution en dev ? C'est StrictMode, pas un bug : vérifier que le cleanup rend l'effet idempotent.",
          "Warning « missing dependency » ? Le linter a raison dans 95 % des cas : ajouter la dépendance plutôt que mentir au tableau.",
          "État non mis à jour ? Mutation directe d'un objet au lieu de créer un nouvel objet — React compare les références.",
          "React DevTools → Components : inspecter les valeurs réelles des hooks, pas celles qu'on imagine.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes-hooks",
    title: "Erreurs courantes",
    level: 2,
    intro:
      "Les pièges que tous les débutants rencontrent.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "setState avec l'ancienne valeur",
            value:
              "`setCount(count + 1)` dans un timer ou après un autre `setCount` : `count` est capturé, périmé. Utiliser `setCount(c => c + 1)`.",
          },
          {
            label: "Effet sans tableau de dépendances",
            value:
              "`useEffect(() => { setX(...) })` sans second argument tourne à chaque rendu et peut boucler : toujours un tableau, même vide.",
          },
          {
            label: "Dépendances mensongères",
            value:
              "Omettre une variable utilisée dans l'effet pour « éviter » un re-déclenchement : l'effet travaille avec une valeur périmée. Corriger la cause, pas le symptôme.",
          },
          {
            label: "Mutation d'état",
            value:
              "`user.age = 31; setUser(user)` : même référence, pas de re-rendu. Toujours créer un nouvel objet/tableau.",
          },
          {
            label: "Cleanup oublié",
            value:
              "Timer, `addEventListener`, `setInterval` sans cleanup : fuites mémoire et comportements fantômes après démontage.",
          },
          {
            label: "Hooks dans des conditions",
            value:
              "`if (x) useState(...)` : l'ordre d'appel varie, React mélange les états. Hooks toujours au niveau racine.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro:
      "Trois projets de difficulté croissante, alignés sur ceux du guide de la compétence.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Bibliothèque de hooks customs",
        fields: [
          { label: "À construire", value: "`useFetch`, `useDebounce`, `useLocalStorage`, `usePrevious` : testés et documentés" },
          { label: "Objectif", value: "Maîtriser l'extraction de logique : état, effets, cleanup, types génériques" },
          { label: "Durée", value: "Quelques jours" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Refactorer des classes vers les hooks",
        fields: [
          { label: "À construire", value: "Prendre un composant classe (lifecycle) et le convertir, effet par effet" },
          { label: "Objectif", value: "Comprendre la correspondance lifecycle ↔ effets, et quand un effet est inutile" },
          { label: "Durée", value: "Une semaine" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Formulaire piloté par hooks",
        fields: [
          { label: "À construire", value: "Validation live, champs dynamiques, soumission asynchrone — sans librairie de formulaires" },
          { label: "Objectif", value: "Composer `useState`, `useEffect`, `useRef`, `useMemo` sur un cas réel complexe" },
          { label: "Durée", value: "Deux semaines" },
        ],
      },
    ],
  },
  {
    id: "ressources-essentielles",
    title: "Ressources essentielles",
    level: 2,
    intro:
      "Par où continuer, en commençant par la documentation officielle.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          {
            label: "react.dev/reference/react",
            value: "La référence de chaque hook : signature, exemples, pièges. Le premier réflexe devant un doute.",
          },
          {
            label: "react.dev/learn",
            value: "Le tutoriel « Learn React » : les hooks y sont introduits progressivement, avec les bonnes intuitions.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Essai : « You Might Not Need an Effect » (react.dev) — l'article qui corrige 80 % des mauvais `useEffect`.",
          "Pratique : les trois projets progressifs de cette page, dans l'ordre.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "useeffect-approfondi",
    title: "useEffect approfondi",
    level: 3,
    intro:
      "Dépendances, cleanup, StrictMode : maîtriser l'effet au lieu de le subir.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Effet robuste avec cleanup",
        code: "useEffect(() => {\n  const controller = new AbortController();\n\n  fetch(`/api/users/${userId}`, { signal: controller.signal })\n    .then((r) => r.json())\n    .then(setUser)\n    .catch((e) => {\n      if (e.name !== \"AbortError\") setError(e);\n    });\n\n  return () => controller.abort(); // cleanup : annule la requête\n}, [userId]); // rejoue quand userId change",
      },
      {
        kind: "text",
        text: "L'effet ci-dessus illustre les trois disciplines : dépendances exhaustives (`userId` utilisé → déclaré), cleanup qui annule le travail en cours (requête, timer, abonnement), et gestion de l'annulation (ignorer `AbortError`). En StrictMode (dev), React monte → démonte → remonte : l'effet tourne deux fois. Si le double appel casse quelque chose, le bug est dans l'effet (cleanup manquant), pas dans StrictMode.",
      },
      {
        kind: "list",
        items: [
          "Les objets/fonctions recréés à chaque rendu comme dépendances rejouent l'effet en boucle : les mémoriser (`useMemo`/`useCallback`) ou les déplacer dans l'effet.",
          "Un effet qui ne dépend de rien d'autre que ses propres setters peut souvent devenir un gestionnaire d'événement.",
          "Le linter `react-hooks/exhaustive-deps` a raison dans l'immense majorité des cas : corriger la cause plutôt que désactiver la règle.",
        ],
      },
    ],
  },
  {
    id: "synchronisation-vs-evenements",
    title: "Synchronisation vs événements",
    level: 3,
    intro:
      "La distinction qui élimine la moitié des `useEffect` : effet ou gestionnaire ?",
    blocks: [
      {
        kind: "table",
        headers: ["Question", "Effet (`useEffect`)", "Gestionnaire d'événement"],
        rows: [
          ["Déclenché par", "Le rendu (React décide)", "L'utilisateur ou un événement précis"],
          ["Exemple", "Synchroniser un chat avec la room affichée", "Envoyer un message au clic"],
          ["Cleanup", "Oui, quand les dépendances changent", "Non : action ponctuelle"],
          ["Test", "« Quand X s'affiche, Y doit être synchronisé »", "« Quand on clique, Z se produit »"],
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Acheter : événement, pas effet",
        code: "// MAL : effet qui réagit à un état\nconst [cart, setCart] = useState([]);\nuseEffect(() => {\n  if (cart.length > 0) sendOrder(cart); // effet détourné\n}, [cart]);\n\n// BIEN : l'achat est un événement\nconst buy = () => {\n  sendOrder(cart);\n  setCart([]);\n};\n<button onClick={buy}>Acheter</button>",
      },
      {
        kind: "text",
        text: "Test décisif : si la logique répond à « l'utilisateur a fait X », c'est un gestionnaire d'événement. Si elle répond à « l'UI affiche X, donc le monde extérieur doit refléter X », c'est un effet. Les achats, envois, navigations sont des événements ; les abonnements, timers et fetches liés à l'affichage sont des effets.",
      },
    ],
  },
  {
    id: "data-fetching-robuste",
    title: "Data fetching robuste",
    level: 3,
    intro:
      "Chargement, erreur, race conditions : le fetch qui ne ment jamais.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "useFetch avec états et annulation",
        code: "import { useEffect, useState } from \"react\";\n\nexport function useFetch<T>(url: string) {\n  const [data, setData] = useState<T | null>(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState<Error | null>(null);\n\n  useEffect(() => {\n    const controller = new AbortController();\n    setLoading(true);\n    fetch(url, { signal: controller.signal })\n      .then((r) => {\n        if (!r.ok) throw new Error(`HTTP ${r.status}`);\n        return r.json();\n      })\n      .then(setData)\n      .catch((e) => {\n        if (e.name !== \"AbortError\") setError(e);\n      })\n      .finally(() => setLoading(false));\n    return () => controller.abort();\n  }, [url]);\n\n  return { data, loading, error };\n}",
      },
      {
        kind: "text",
        text: "La race condition : l'utilisateur clique sur l'item 1 puis vite sur l'item 2 ; la réponse 1 arrive après la 2 et écrase l'affichage. `AbortController` l'élimine : changer d'URL annule la requête précédente. En production, des librairies (TanStack Query, SWR) gèrent cela plus le cache, les retries et la déduplication — ce hook maison est pédagogique, pas une recommandation d'architecture.",
      },
    ],
  },
  {
    id: "usereducer-detail",
    title: "useReducer en détail",
    level: 3,
    intro:
      "Quand l'état a des transitions : la machine à états locale.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Réducteur de formulaire",
        code: "import { useReducer } from \"react\";\n\ntype State = { status: \"idle\" | \"loading\" | \"ok\" | \"error\"; data: string | null };\ntype Action = { type: \"start\" } | { type: \"success\"; data: string } | { type: \"fail\" };\n\nfunction reducer(state: State, action: Action): State {\n  switch (action.type) {\n    case \"start\":   return { status: \"loading\", data: null };\n    case \"success\": return { status: \"ok\", data: action.data };\n    case \"fail\":    return { status: \"error\", data: null };\n  }\n}\n\nconst [state, dispatch] = useReducer(reducer, { status: \"idle\", data: null });\n// dispatch({ type: \"start\" }) — transitions explicites et typées",
      },
      {
        kind: "text",
        text: "`useReducer` s'impose quand plusieurs sous-valeurs évoluent ensemble selon des règles (statuts de requête, wizards, paniers) : les transitions sont nommées, centralisées et testables isolément (le réducteur est une fonction pure). Pour un booléen ou un compteur isolé, `useState` reste plus lisible.",
      },
    ],
  },
  {
    id: "usecontext-detail",
    title: "useContext en détail",
    level: 3,
    intro:
      "Partager sans prop drilling : le contexte, ses forces et sa limite.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Contexte de thème",
        code: "import { createContext, useContext, useState } from \"react\";\n\nconst ThemeCtx = createContext<\"clair\" | \"sombre\">(\"clair\");\n\nexport function App() {\n  const [theme, setTheme] = useState<\"clair\" | \"sombre\">(\"clair\");\n  return (\n    <ThemeCtx.Provider value={theme}>\n      <button onClick={() => setTheme(t => t === \"clair\" ? \"sombre\" : \"clair\")}>\n        Thème\n      </button>\n      <Page />\n    </ThemeCtx.Provider>\n  );\n}\n\nfunction Page() {\n  const theme = useContext(ThemeCtx); // lecture, où que ce soit dans l'arbre\n  return <main data-theme={theme}>…</main>;\n}",
      },
      {
        kind: "text",
        text: "Le contexte élimine le prop drilling pour les valeurs stables et peu changeantes (thème, utilisateur connecté, locale). Sa limite : chaque changement de `value` re-rend tous les consommateurs, même ceux qui n'utilisent qu'une partie. Pour un état qui change souvent (panier, filtres), un store externe (Zustand) avec sélecteurs est plus adapté — voir `react-state`.",
      },
    ],
  },
  {
    id: "usememo-usecallback-detail",
    title: "useMemo et useCallback en détail",
    level: 3,
    intro:
      "Mémoriser à bon escient : ni partout, ni jamais.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Usages légitimes",
        code: "import { useCallback, useMemo } from \"react\";\n\n// useMemo : calcul coûteux uniquement quand les entrées changent\nconst sorted = useMemo(\n  () => items.toSorted((a, b) => a.price - b.price),\n  [items]\n);\n\n// useCallback : fonction stable pour un enfant mémorisé\nconst onSelect = useCallback((id: string) => {\n  setSelected(id);\n}, []);\n<MemoizedList items={sorted} onSelect={onSelect} />",
      },
      {
        kind: "text",
        text: "Règle : mémoriser quand il y a un coût mesuré — calcul coûteux (tri de milliers d'éléments), ou props d'un composant mémorisé (`React.memo`) qui re-rendrait sinon à chaque fois. Mémoriser « au cas où » ajoute du code et des dépendances à maintenir pour zéro gain : la plupart des calculs sont négligeables. Le compilateur React (React 19) automatise d'ailleurs cette mémorisation.",
      },
      {
        kind: "list",
        items: [
          "`useMemo(() => x, [])` pour une valeur constante coûteuse à créer (regex compilée, worker).",
          "Attention : `useMemo` n'est pas une garantie sémantique — React peut oublier le cache ; ne jamais y mettre un effet de bord.",
          "Profiler d'abord (React DevTools) : optimiser un rendu qui coûte 2 ms est du temps perdu.",
        ],
      },
    ],
  },
  {
    id: "custom-hooks-avances",
    title: "Custom hooks avancés",
    level: 3,
    intro:
      "Composer les hooks : de la logique métier réutilisable et typée.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "useDebounce générique et composé",
        code: "import { useEffect, useState } from \"react\";\n\nexport function useDebounce<T>(value: T, delay = 300): T {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const id = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(id); // retape -> annule le précédent\n  }, [value, delay]);\n  return debounced;\n}\n\n// Composition : recherche avec debounce + fetch\nfunction Search() {\n  const [q, setQ] = useState(\"\");\n  const dq = useDebounce(q, 400);\n  const { data } = useFetch(`/api/search?q=${dq}`);\n  return <input value={q} onChange={(e) => setQ(e.target.value)} />;\n}",
      },
      {
        kind: "text",
        text: "Les custom hooks se composent comme des fonctions : `useDebounce` + `useFetch` = recherche instantanée robuste. Bonnes pratiques : génériques TypeScript (`<T>`), nom d'intention (`useDebouncedSearch`, pas `useHook1`), `useDebugValue` pour afficher un label dans les DevTools, et tests via `renderHook` de Testing Library.",
      },
    ],
  },
  {
    id: "use-transition-deferred",
    title: "useTransition et useDeferredValue",
    level: 3,
    intro:
      "Garder l'UI réactive pendant les mises à jour lourdes (React 18+).",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Recherche non bloquante",
        code: "import { useDeferredValue, useState, useTransition } from \"react\";\n\nfunction Search({ items }) {\n  const [query, setQuery] = useState(\"\");\n  const deferredQuery = useDeferredValue(query); // version « en retard »\n  const [isPending, startTransition] = useTransition();\n\n  // La liste lourde se base sur deferredQuery : la frappe reste fluide,\n  // la liste se met à jour en arrière-plan (isPending = indicateur).\n  const results = useMemo(\n    () => items.filter((i) => i.name.includes(deferredQuery)),\n    [items, deferredQuery]\n  );\n\n  return (\n    <>\n      <input value={query} onChange={(e) => setQuery(e.target.value)} />\n      {isPending && <span>Recherche…</span>}\n      <List items={results} />\n    </>\n  );\n}",
      },
      {
        kind: "text",
        text: "Idée : marquer une mise à jour comme « transition » (non urgente) pour que React priorise la frappe (urgente). `useDeferredValue` fait cela automatiquement pour une valeur ; `useTransition` donne le contrôle manuel avec `isPending`. À réserver aux vrais problèmes de fluidité mesurés — pas d'optimisation préventive.",
      },
    ],
  },
  {
    id: "useid-detail",
    title: "useId en détail",
    level: 3,
    intro:
      "Des identifiants stables et uniques : l'allié de l'accessibilité.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Lier label et input sans collision",
        code: "import { useId } from \"react\";\n\nfunction Field({ label }: { label: string }) {\n  const id = useId(); // stable entre rendus, unique par instance\n  return (\n    <>\n      <label htmlFor={id}>{label}</label>\n      <input id={id} aria-describedby={`${id}-help`} />\n      <p id={`${id}-help`}>Format attendu…</p>\n    </>\n  );\n}",
      },
      {
        kind: "text",
        text: "`useId` génère un identifiant stable pendant toute la vie du composant, unique même avec plusieurs instances, et cohérent entre serveur et client (SSR sans hydration mismatch). Ne pas l'utiliser comme `key` de liste ni pour générer des données : c'est un identifiant d'accessibilité, pas une clé métier.",
      },
    ],
  },
  {
    id: "use-sync-external-store-detail",
    title: "useSyncExternalStore en détail",
    level: 3,
    intro:
      "S'abonner à une source externe : le hook officiel pour les stores.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "S'abonner à un store externe",
        code: "import { useSyncExternalStore } from \"react\";\n\n// store : { subscribe(fn), getSnapshot() }\nfunction useOnline() {\n  return useSyncExternalStore(\n    (cb) => {\n      window.addEventListener(\"online\", cb);\n      window.addEventListener(\"offline\", cb);\n      return () => {\n        window.removeEventListener(\"online\", cb);\n        window.removeEventListener(\"offline\", cb);\n      };\n    },\n    () => navigator.onLine,          // snapshot client\n    () => true                        // snapshot serveur (SSR)\n  );\n}",
      },
      {
        kind: "text",
        text: "Ce hook est la fondation officielle des librairies de state externe (Zustand, Redux) : il gère l'abonnement, les snapshots cohérents et le tearing (lectures incohérentes en mode concurrent). À utiliser quand on branche React sur une source qui n'est pas son état : stores, `matchMedia`, état du navigateur. S'abonner « à la main » avec `useEffect` + `useState` produit des bugs subtils en concurrent mode — ce hook les évite.",
      },
    ],
  },
  {
    id: "use-layout-effect-detail",
    title: "useLayoutEffect en détail",
    level: 3,
    intro:
      "L'effet synchrone avant peinture : pour les mesures DOM uniquement.",
    blocks: [
      {
        kind: "text",
        text: "`useLayoutEffect` s'exécute comme `useEffect`, mais synchroniquement après le DOM et avant que le navigateur peigne : idéal pour mesurer un élément (`getBoundingClientRect`) et ajuster le layout sans scintillement. Partout ailleurs, `useEffect` suffit — `useLayoutEffect` bloque la peinture et dégrade la fluidité s'il est mal utilisé.",
      },
      {
        kind: "list",
        items: [
          "Usage canonique : positionner un tooltip/popover après mesure de l'ancre.",
          "En SSR, préférer `useEffect` : `useLayoutEffect` n'existe pas côté serveur (warning) — ou `useIsomorphicLayoutEffect` si vraiment nécessaire.",
          "Si l'effet ne touche pas au layout visible, c'est `useEffect`, point.",
        ],
      },
    ],
  },
  {
    id: "use-optimistic",
    title: "useOptimistic (React 19)",
    level: 3,
    intro:
      "Mises à jour optimistes déclaratives : l'UI répond avant le serveur.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Like optimiste",
        code: "\"use client\";\nimport { useOptimistic, useState } from \"react\";\n\nfunction LikeButton({ likes }: { likes: number }) {\n  const [optimisticLikes, addLike] = useOptimistic(likes, (n) => n + 1);\n\n  return (\n    <button\n      onClick={async () => {\n        addLike(undefined);       // UI immédiate : +1\n        await fetch(\"/api/like\", { method: \"POST\" }); // serveur après\n      }}\n    >\n      ♥ {optimisticLikes}\n    </button>\n  );\n}",
      },
      {
        kind: "text",
        text: "`useOptimistic` affiche une valeur temporaire pendant l'action asynchrone, puis React la remplace par la valeur réelle du serveur. En cas d'échec, prévoir le retour en arrière (ou laisser le serveur trancher au re-rendu). C'est le pattern « UI optimiste » sans état manuel dupliqué.",
      },
    ],
  },
  {
    id: "stale-closures-approfondi",
    title: "Stale closures : l'ennemi intime",
    level: 3,
    intro:
      "Pourquoi l'effet « voit » une ancienne valeur — et les trois parades.",
    blocks: [
      {
        kind: "text",
        text: "Chaque rendu crée de nouvelles closures : un `setTimeout` ou un effet avec `[]` capture les valeurs du rendu où il a été créé. Si l'état change ensuite, la closure garde l'ancienne valeur — le « stale ». Ce n'est pas un bug de React, c'est JavaScript ; React expose juste le mécanisme.",
      },
      {
        kind: "code",
        language: "tsx",
        title: "Les trois parades",
        code: "// 1. Forme fonctionnelle du setter (pas besoin de la valeur)\nsetCount((c) => c + 1);\n\n// 2. Dépendances correctes : l'effet se recrée avec les valeurs fraîches\nuseEffect(() => { console.log(count); }, [count]);\n\n// 3. Ref pour la dernière valeur (sans re-déclencher l'effet)\nconst countRef = useRef(count);\ncountRef.current = count;\nuseEffect(() => {\n  const id = setInterval(() => console.log(countRef.current), 1000);\n  return () => clearInterval(id);\n}, []);",
      },
    ],
  },
  {
    id: "boucles-infinies",
    title: "Boucles infinies : diagnostic",
    level: 3,
    intro:
      "L'effet qui se nourrit de lui-même : reconnaître les trois variantes.",
    blocks: [
      {
        kind: "fields",
        title: "Variantes",
        fields: [
          {
            label: "Effet sans dépendances + setState",
            value:
              "`useEffect(() => setX(x+1))` : chaque rendu rejoue l'effet qui re-rend. Ajouter les dépendances ou déplacer dans un gestionnaire.",
          },
          {
            label: "Objet recréé en dépendance",
            value:
              "`useEffect(fn, [options])` où `options = {...}` est recréé à chaque rendu : dépendance « toujours différente ». Mémoriser avec `useMemo` ou passer des primitives.",
          },
          {
            label: "Fetch qui set l'état qui relance le fetch",
            value:
              "L'URL ou un objet dépendance change à chaque réponse. Stabiliser les dépendances : n'y mettre que ce qui doit vraiment redéclencher.",
          },
        ],
      },
      {
        kind: "text",
        text: "Méthode : commenter le contenu de l'effet — si la boucle s'arrête, le déclencheur est dans les dépendances ; inspecter alors chaque dépendance avec un `console.log` ou les DevTools pour trouver celle qui change à chaque rendu.",
      },
    ],
  },
  {
    id: "batching-automatique",
    title: "Batching automatique (React 18+)",
    level: 3,
    intro:
      "Plusieurs `setState` = un seul re-rendu : le regroupement automatique.",
    blocks: [
      {
        kind: "text",
        text: "Depuis React 18, tous les `setState` — gestionnaires, timeouts, promesses — sont groupés automatiquement : trois `setX` dans un `fetch().then()` ne provoquent qu'un re-rendu. Avant React 18, seuls les gestionnaires d'événements étaient groupés. Conséquence : `flushSync` (sortie de secours pour forcer un rendu synchrone) est presque toujours un signe de mauvaise conception.",
      },
      {
        kind: "list",
        items: [
          "Ne pas « optimiser » en regroupant manuellement les états : le batching le fait déjà.",
          "Lire l'état juste après `setState` donne toujours l'ancienne valeur — batching ou non.",
          "`flushSync` bloque le navigateur : à éviter sauf cas impératif mesuré (ex. lire le DOM juste après une mise à jour).",
        ],
      },
    ],
  },
  {
    id: "refs-callback",
    title: "Callback refs",
    level: 3,
    intro:
      "Quand `useRef` ne suffit pas : réagir à l'attachement d'un élément.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Mesurer un élément à son montage",
        code: "import { useCallback, useState } from \"react\";\n\nfunction Measured() {\n  const [height, setHeight] = useState(0);\n  const ref = useCallback((node: HTMLDivElement | null) => {\n    if (node) setHeight(node.getBoundingClientRect().height);\n  }, []);\n  return <div ref={ref}>Hauteur : {height}px</div>;\n}",
      },
      {
        kind: "text",
        text: "Une callback ref est appelée avec l'élément au montage (et `null` au démontage) : c'est le seul moyen fiable d'exécuter du code quand un élément apparaît, y compris pour des éléments conditionnels. `useRef` + `useEffect` échoue sur les éléments qui montent après le premier rendu — la callback ref les capte.",
      },
    ],
  },
  {
    id: "use-debug-value",
    title: "useDebugValue",
    level: 3,
    intro:
      "Rendre les custom hooks lisibles dans les DevTools.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Label dans les DevTools",
        code: "import { useDebugValue } from \"react\";\n\nexport function useOnline() {\n  const online = /* … */ true;\n  useDebugValue(online ? \"en ligne\" : \"hors ligne\");\n  return online;\n}\n// Les DevTools affichent : useOnline: \"en ligne\"",
      },
      {
        kind: "text",
        text: "Un appel, un label : les custom hooks deviennent inspectables comme les hooks natifs. Le second argument optionnel formate paresseusement les valeurs coûteuses. Détail d'artisan, pas de fonctionnalité — mais il change le débogage des bibliothèques de hooks.",
      },
    ],
  },
  {
    id: "tester-hooks",
    title: "Tester les hooks",
    level: 3,
    intro:
      "Tester la logique des hooks isolément avec `renderHook`.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Test d'un custom hook",
        code: "import { renderHook, act } from \"@testing-library/react\";\nimport { useCounter } from \"./useCounter\";\n\ntest(\"incrémente\", () => {\n  const { result } = renderHook(() => useCounter());\n  act(() => {\n    result.current.increment();\n  });\n  expect(result.current.count).toBe(1);\n});",
      },
      {
        kind: "text",
        text: "`renderHook` monte le hook dans un composant de test ; `act` entoure les mises à jour pour que les effets soient joués. Tester : les transitions d'état, les cleanups (démontage), les cas limites (valeurs initiales, erreurs). Les paquets : `@testing-library/react` fournit `renderHook` depuis la v13.1 — pas de paquet séparé nécessaire.",
      },
    ],
  },
  {
    id: "typescript-hooks-avance",
    title: "Hooks + TypeScript avancé",
    level: 3,
    intro:
      "Typer les hooks comme un pro : génériques et inférence.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Génériques et tuples",
        code: "// useState : typer l'état, surtout les null initiaux\nconst [user, setUser] = useState<User | null>(null);\n\n// Custom hook générique : T inféré à l'appel\nfunction useLocalStorage<T>(key: string, initial: T) {\n  const [value, setValue] = useState<T>(initial);\n  // …\n  return [value, setValue] as const; // tuple, pas (T | setter)[]\n}\nconst [theme, setTheme] = useLocalStorage(\"theme\", \"clair\");\n//    theme: string ✓   setTheme: (v: string) => void ✓",
      },
      {
        kind: "text",
        text: "`as const` sur le retour : sans lui, TypeScript élargit en tableau union et `theme` devient `string | Dispatch` — inutilisable. Typer les refs DOM (`useRef<HTMLInputElement>(null)`), les réducteurs (actions en union discriminée), et éviter `any` dans les dépendances d'effets : un `any` masque les erreurs de dépendances.",
      },
    ],
  },
  {
    id: "performance-re-rendus",
    title: "Re-rendus : comprendre et mesurer",
    level: 3,
    intro:
      "Quand React re-rend, pourquoi, et quand s'en soucier.",
    blocks: [
      {
        kind: "text",
        text: "Un re-rendu = React réexécute la fonction du composant (pas forcément le DOM : la réconciliation ne touche le DOM que si le résultat diffère). Déclencheurs : `setState` du composant, nouveau contexte consommé, nouveau `value` du parent (le parent re-rend → les enfants aussi, sauf `React.memo`).",
      },
      {
        kind: "fields",
        title: "Stratégie",
        fields: [
          {
            label: "Mesurer d'abord",
            value:
              "React DevTools → Profiler : « pourquoi ce composant a-t-il re-rendu ? » Les intuitions sur les perfs React sont fausses plus souvent que justes.",
          },
          {
            label: "État local d'abord",
            value:
              "Descendre l'état au plus près de son usage : un état dans la racine re-rend tout, dans une feuille il ne re-rend qu'elle.",
          },
          {
            label: "React.memo",
            value:
              "Mémorise un composant : re-rend seulement si ses props changent (comparaison superficielle). Utile pour les feuilles lourdes aux props stables.",
          },
          {
            label: "Éviter",
            value:
              "Mémoriser préventivement partout : le code devient illisible pour un gain nul. Le compilateur React 19 automatise une partie du travail.",
          },
        ],
      },
    ],
  },
  {
    id: "anti-patterns-hooks",
    title: "Anti-patterns",
    level: 3,
    intro:
      "Les mauvais réflexes à reconnaître — et par quoi les remplacer.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "`useEffect` pour dériver",
            value:
              "Calculer pendant le rendu ce qui se calcule des props/état. L'effet ajoute un rendu de retard et des bugs.",
          },
          {
            label: "`useState` + `useEffect` pour initialiser",
            value:
              "`useState(() => compute(props))` : l'initialiseur paresseux remplace l'effet de « synchronisation initiale ».",
          },
          {
            label: "Clé `key` pour « reset »",
            value:
              "Changer la `key` remonte le composant avec un état frais : légitime pour un vrai reset, abusif comme rustine.",
          },
          {
            label: "Tout dans un seul état objet",
            value:
              "Des champs indépendants dans un objet géant : chaque mise à jour touche tout. Séparer par préoccupation.",
          },
          {
            label: "Effets qui s'enchaînent",
            value:
              "Effet A set un état que l'effet B lit : cascade de rendus fragile. Fusionner, ou calculer B pendant le rendu.",
          },
          {
            label: "`useMemo` comme cache sémantique",
            value:
              "React peut jeter le cache : ne jamais y mettre une valeur dont l'absence casserait la logique.",
          },
        ],
      },
    ],
  },
  {
    id: "suspense-donnees-bref",
    title: "Suspense pour les données : panorama",
    level: 3,
    intro:
      "L'état de chargement déclaratif : ce que Suspense change au fetching.",
    blocks: [
      {
        kind: "text",
        text: "Avec Suspense, le composant « suspend » pendant le chargement et React affiche le `fallback` le plus proche — plus besoin d'états `loading` manuels. Cela exige des sources de données compatibles (frameworks : Next.js, TanStack Query en mode suspense) : le `useFetch` maison de cette page ne suspend pas. C'est un changement d'architecture, pas un flag.",
      },
      {
        kind: "list",
        items: [
          "Bénéfice : les états de chargement se composent (fallbacks imbriqués) au lieu de se propager en props.",
          "Coût : toute la chaîne (routeur, fetching, erreurs via Error Boundaries) doit suivre le modèle.",
          "Ne pas mélanger les paradigmes dans une même zone : suspense ou états manuels, pas les deux.",
        ],
      },
    ],
  },
  {
    id: "migration-classes-hooks",
    title: "Migrer des classes vers les hooks",
    level: 3,
    intro:
      "Correspondances lifecycle ↔ hooks pour moderniser l'existant.",
    blocks: [
      {
        kind: "table",
        headers: ["Classe", "Hooks"],
        rows: [
          ["`this.state` / `setState`", "`useState` / `useReducer`"],
          ["`componentDidMount`", "`useEffect(fn, [])`"],
          ["`componentDidUpdate`", "`useEffect(fn, [deps])`"],
          ["`componentWillUnmount`", "cleanup retourné par `useEffect`"],
          ["`this.props` / `this.context`", "props / `useContext`"],
          ["`shouldComponentUpdate`", "`React.memo`"],
        ],
      },
      {
        kind: "text",
        text: "Attention : la correspondance n'est pas littérale. `componentDidMount` + `componentDidUpdate` mélangés deviennent souvent deux effets distincts (un par synchronisation) — ou disparaissent (dérivations). Migrer méthode par méthode produit du code bancal : repenser en « quelles synchronisations ? » donne du code propre.",
      },
    ],
  },
  {
    id: "checklist-hooks",
    title: "Checklist de revue",
    level: 3,
    intro:
      "Avant de merger : les questions à se poser sur chaque hook.",
    blocks: [
      {
        kind: "list",
        items: [
          "Chaque `useEffect` est-il vraiment une synchronisation externe ? Sinon → dérivation ou gestionnaire.",
          "Les dépendances sont-elles exhaustives ? (Le linter est vert.)",
          "Chaque effet a-t-il son cleanup (requête, timer, abonnement) ?",
          "Les `setState` basés sur l'ancienne valeur utilisent-ils la forme fonctionnelle ?",
          "Aucune mutation directe d'état (objet/tableau) ?",
          "Les hooks sont-ils au niveau racine, jamais en condition ?",
          "Les custom hooks ont-ils un nom d'intention et sont-ils testés ?",
          "`useMemo`/`useCallback` sont-ils justifiés par une mesure ?",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Hooks maîtrisés, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "`react-state` : quand l'état dépasse le composant — Context, Zustand, Redux Toolkit.",
          "`react-forms` : les formulaires poussent les hooks dans leurs retranchements (listes dynamiques, validation).",
          "`react` : les fondamentaux — cycle de vie du rendu, réconciliation — pour comprendre ce que les hooks orchestrent.",
          "TanStack Query : le data fetching professionnel (cache, retries, invalidation) au-delà du `useFetch` maison.",
          "Revenir à la roadmap : valider les hooks et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
  {
    id: "ressources-avancees",
    title: "Ressources avancées",
    level: 3,
    intro:
      "Aller plus loin, en commençant toujours par la documentation officielle.",
    blocks: [
      {
        kind: "fields",
        title: "Documentations officielles (à privilégier)",
        fields: [
          {
            label: "react.dev/reference/react",
            value: "Chaque hook en détail : `use`, `useOptimistic`, `useActionState` (React 19) et les autres.",
          },
          {
            label: "react.dev/learn/you-might-not-need-an-effect",
            value: "L'article de référence contre les effets inutiles : à relire régulièrement.",
          },
          {
            label: "react.dev/learn/synchronizing-with-effects",
            value: "Le guide officiel de la synchronisation : le modèle mental complet.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les trois projets progressifs de cette page, dans l'ordre.",
          "Communauté : les RFC du dépôt facebook/react pour comprendre les orientations (compilateur, nouvelles API).",
        ],
      },
    ],
  },
];

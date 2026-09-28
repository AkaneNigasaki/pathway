import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de State Management : où vit l'état, comment il
 * circule, et comment il se synchronise avec le serveur.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_STATE_MANAGEMENT: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce que le state management organise : bien plus que « mettre des données dans un store ».",
    blocks: [
      {
        kind: "text",
        text: "Le state management organise les données d'une application frontend : où vit l'état, comment il circule entre composants, comment il se synchronise avec le serveur. Dès qu'une application grandit, l'état éparpillé devient ingérable : props qui descendent sur cinq niveaux, données serveur mélangées à l'état d'interface.",
      },
      {
        kind: "diagram",
        title: "Les trois familles d'état",
        lines: [
          "ÉTAT LOCAL",
          "  │  useState, useReducer : vit dans un composant,",
          "  │  meurt avec lui. Formulaires, toggles, onglets.",
          "  │",
          "ÉTAT PARTAGÉ CLIENT",
          "  │  Zustand, Redux : vit hors des composants,",
          "  │  plusieurs écrans s'y abonnent. Panier, session.",
          "  │",
          "ÉTAT SERVEUR (cache)",
          "     TanStack Query : copie locale des données distantes,",
          "     avec revalidation, invalidation, synchronisation.",
        ],
      },
      {
        kind: "text",
        text: "L'erreur la plus coûteuse : traiter l'état serveur comme de l'état client. Les données du serveur ont un cycle de vie propre (chargement, fraîcheur, invalidation) qu'un simple `useState` ne gère pas. Choisir la bonne stratégie par famille d'état est une décision d'architecture.",
      },
    ],
  },
  {
    id: "server-state-vs-client-state",
    title: "État serveur vs état client",
    level: 1,
    intro:
      "La distinction fondamentale : tout le reste en découle.",
    blocks: [
      {
        kind: "table",
        headers: ["", "État client", "État serveur"],
        rows: [
          ["Exemples", "Panier, thème, onglet actif", "Liste d'articles, profil utilisateur"],
          ["Source de vérité", "Le navigateur", "Le serveur (copie locale)"],
          ["Questions clés", "Qui le partage ? Où le placer ?", "Est-il frais ? Quand le revalider ?"],
          ["Outil adapté", "useState, Zustand, Redux", "TanStack Query"],
        ],
      },
      {
        kind: "text",
        text: "Test simple : si les données peuvent changer sans que l'utilisateur agisse (un autre utilisateur modifie, le serveur évolue), c'est de l'état serveur — il faut un outil qui gère la fraîcheur. Le reste est de l'état client : local par défaut, partagé seulement si plusieurs écrans en ont besoin.",
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
      "Comprendre les limites de l'état local avant de le remplacer par un store.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut maîtriser avant",
        fields: [
          {
            label: "React : useState",
            value:
              "Déclarer un état local, comprendre qu'un changement déclenche un re-rendu. Tout store n'est qu'une généralisation de ce mécanisme.",
          },
          {
            label: "React : useReducer",
            value:
              "État complexe mis à jour par actions : le pattern qui préfigure Redux et les machines à états.",
          },
          {
            label: "React : Context",
            value:
              "Diffuser une valeur sans prop drilling — et comprendre pourquoi il re-rend tout à chaque changement.",
          },
          {
            label: "JavaScript : async/await",
            value:
              "Les données serveur arrivent de façon asynchrone : promesses, erreurs, annulation. TanStack Query les encapsule, mais il faut comprendre ce qu'il encapsule.",
          },
        ],
      },
    ],
  },
  {
    id: "installer-zustand",
    title: "Installer Zustand",
    level: 2,
    intro:
      "Zustand est le store client le plus simple : un hook, des sélecteurs, zéro boilerplate.",
    blocks: [
      {
        kind: "command",
        label: "Installer Zustand",
        command: "npm install zustand",
        why: "Zustand crée des stores externes à React : n'importe quel composant s'y abonne avec un sélecteur, sans provider ni boilerplate. Léger (quelques Ko), il suffit à la plupart des besoins d'état partagé client.",
        verify: "npm ls zustand",
      },
      {
        kind: "text",
        text: "Zustand ne gère pas l'état serveur : pour les données distantes, c'est TanStack Query (voir plus bas). Les deux cohabitent très bien : chacun sa famille d'état.",
      },
    ],
  },
  {
    id: "premier-store-zustand",
    title: "Premier store Zustand",
    level: 2,
    intro:
      "Un store compteur en dix lignes : créer, s'abonner, mettre à jour.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "stores/useCounter.ts",
        code: "import { create } from 'zustand';\n\ntype CounterState = {\n  count: number;\n  increment: () => void;\n  reset: () => void;\n};\n\nexport const useCounter = create<CounterState>((set) => ({\n  count: 0,\n  increment: () => set((s) => ({ count: s.count + 1 })),\n  reset: () => set({ count: 0 }),\n}));",
      },
      {
        kind: "code",
        language: "tsx",
        title: "Usage avec sélecteur",
        code: "function Counter() {\n  // Le composant ne se re-rend que si `count` change\n  const count = useCounter((s) => s.count);\n  const increment = useCounter((s) => s.increment);\n  return <button onClick={increment}>Clics : {count}</button>;\n}",
      },
      {
        kind: "text",
        text: "Le sélecteur `(s) => s.count` est le point clé : le composant s'abonne à une tranche du store, pas au store entier. Sans sélecteur, chaque changement re-rend tous les abonnés — on perd le principal bénéfice.",
      },
    ],
  },
  {
    id: "installer-tanstack-query",
    title: "Installer TanStack Query",
    level: 2,
    intro:
      "TanStack Query (ex React Query) gère l'état serveur : récupération, cache, invalidation, synchronisation.",
    blocks: [
      {
        kind: "command",
        label: "Installer TanStack Query",
        command: "npm install @tanstack/react-query",
        why: "Le cache serveur n'est pas de l'état UI : TanStack Query gère récupération, mise en cache, revalidation en arrière-plan, retries et invalidation. Il remplace les `useEffect` + `useState` artisanaux qui dupliquent cette logique — mal — dans chaque composant.",
        verify: "npm ls @tanstack/react-query",
      },
      {
        kind: "code",
        language: "tsx",
        title: "Configurer le QueryClient",
        code: "import { QueryClient, QueryClientProvider } from '@tanstack/react-query';\n\nconst queryClient = new QueryClient();\n\nexport function App() {\n  return (\n    <QueryClientProvider client={queryClient}>\n      <CatalogPage />\n    </QueryClientProvider>\n  );\n}",
      },
      {
        kind: "text",
        text: "Le `QueryClient` est le cache global : il vit dans le provider, une seule instance par application. Chaque requête est identifiée par une clé (`queryKey`) : c'est elle qui permet le partage, la déduplication et l'invalidation.",
      },
    ],
  },
  {
    id: "premier-usequery",
    title: "Première requête avec useQuery",
    level: 2,
    intro:
      "Récupérer des données serveur en déclaratif : états de chargement et d'erreur inclus.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Liste d'articles avec useQuery",
        code: "import { useQuery } from '@tanstack/react-query';\n\nasync function fetchArticles() {\n  const res = await fetch('/api/articles');\n  if (!res.ok) throw new Error('Chargement impossible');\n  return res.json();\n}\n\nfunction ArticleList() {\n  const { data, isPending, isError } = useQuery({\n    queryKey: ['articles'],\n    queryFn: fetchArticles,\n  });\n\n  if (isPending) return <p>Chargement…</p>;\n  if (isError) return <p>Erreur de chargement.</p>;\n  return <ul>{data.map((a) => <li key={a.id}>{a.title}</li>)}</ul>;\n}",
      },
      {
        kind: "text",
        text: "Pas de `useEffect`, pas d'état de chargement artisanal : `isPending` et `isError` sont fournis. Mieux : si un autre composant demande `['articles']`, la requête n'est pas relancée — le cache est partagé. Et au retour sur l'onglet, les données sont revalidées en arrière-plan.",
      },
    ],
  },
  {
    id: "devtools-query",
    title: "DevTools TanStack Query",
    level: 2,
    intro:
      "Voir le cache en direct : requêtes, états, invalidations.",
    blocks: [
      {
        kind: "command",
        label: "Installer les DevTools",
        command: "npm install --save-dev @tanstack/react-query-devtools",
        why: "Les DevTools affichent le contenu du cache en temps réel : chaque `queryKey`, son état (fresh, stale, fetching), ses données. Indispensable pour comprendre ce que fait réellement le cache — et pour debugger les invalidations.",
        verify: "npm ls @tanstack/react-query-devtools",
      },
      {
        kind: "code",
        language: "tsx",
        title: "Ajouter le panneau (développement uniquement)",
        code: "import { ReactQueryDevtools } from '@tanstack/react-query-devtools';\n\n<QueryClientProvider client={queryClient}>\n  <App />\n  <ReactQueryDevtools initialIsOpen={false} />\n</QueryClientProvider>",
      },
    ],
  },
  {
    id: "persistance-locale",
    title: "Persistance locale simple",
    level: 2,
    intro:
      "Retrouver une partie de l'état après rechargement : le panier qui survit au F5.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Persistance manuelle avec localStorage",
        code: "import { create } from 'zustand';\n\ntype CartState = { items: string[]; add: (id: string) => void };\n\nconst saved = JSON.parse(localStorage.getItem('cart') ?? '[]');\n\nexport const useCart = create<CartState>((set) => ({\n  items: saved,\n  add: (id) =>\n    set((s) => {\n      const items = [...s.items, id];\n      localStorage.setItem('cart', JSON.stringify(items));\n      return { items };\n    }),\n}));",
      },
      {
        kind: "text",
        text: "Principe : charger au démarrage, sauvegarder à chaque changement. Limites de cette version manuelle : pas de versioning du format (un changement de structure casse les anciennes données), écriture synchrone à chaque action. Pour un besoin robuste, le middleware `persist` de Zustand gère versioning et réhydratation partielle.",
      },
    ],
  },
  {
    id: "editeurs",
    title: "Éditeurs et outillage",
    level: 2,
    intro:
      "L'éditeur n'a pas de réglage spécifique : les DevTools font le travail d'inspection.",
    blocks: [
      {
        kind: "fields",
        title: "Configuration recommandée",
        fields: [
          {
            label: "TypeScript strict",
            value:
              "Typer les stores (`create<CartState>`) et les réponses (`useQuery<Article[]>`) : l'éditeur autocomplète les sélecteurs et signale les clés de cache incohérentes.",
          },
          {
            label: "ESLint : exhaustive-deps",
            value:
              "La règle `react-hooks/exhaustive-deps` évite les `queryFn` qui capturent des variables périmées — une source classique de données incohérentes.",
          },
          {
            label: "React Query DevTools",
            value:
              "Le panneau flottant en développement : inspecter le cache vaut mieux que `console.log` l'état.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-pro",
    title: "Workflow professionnel",
    level: 2,
    intro:
      "Les habitudes qui évitent que l'état ne redevienne un plat de spaghettis.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Classer avant de stocker",
            detail:
              "Pour chaque donnée : locale, partagée cliente, ou serveur ? Le choix de l'outil découle de la réponse. En cas de doute, commencez local.",
          },
          {
            title: "Nommer les clés de cache",
            detail:
              "Des `queryKey` hiérarchiques et stables : `['articles']`, `['articles', id]`, `['articles', { page }]`. L'invalidation par préfixe en dépend.",
          },
          {
            title: "Ne jamais dupliquer la source de vérité",
            detail:
              "Le total du panier se dérive, il ne se stocke pas. Les données serveur ne se copient pas dans un store Zustand « pour y accéder plus vite ».",
          },
          {
            title: "Tester les transitions, pas l'implémentation",
            detail:
              "Un test de store vérifie que `add()` ajoute et que le total se dérive — pas la structure interne du store.",
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
      "Trois projets pour pratiquer chaque famille d'état séparément.",
    blocks: [
      {
        kind: "fields",
        title: "Par niveau",
        fields: [
          {
            label: "Débutant — Panier avec Zustand",
            value:
              "Panier partagé entre la page produit et le header : store typé, sélecteurs, total dérivé, persistance en localStorage.",
          },
          {
            label: "Intermédiaire — Catalogue avec TanStack Query",
            value:
              "Liste paginée d'articles depuis une API : `useQuery`, `useInfiniteQuery` pour le scroll infini, invalidation après création.",
          },
          {
            label: "Avancé — Refactor d'un état chaotique",
            value:
              "Prenez une app avec du prop drilling et des `useEffect` de fetch : auditez, séparez les trois familles, migrez vers Zustand + TanStack Query, mesurez la suppression de code.",
          },
        ],
      },
    ],
  },
  {
    id: "choisir-sa-strategie",
    title: "Choisir sa stratégie",
    level: 2,
    intro:
      "Le tableau de décision : quel outil pour quel besoin.",
    blocks: [
      {
        kind: "table",
        headers: ["Besoin", "Outil", "Pourquoi"],
        rows: [
          ["État d'un seul composant", "useState / useReducer", "Simple, local, rien à installer"],
          ["Valeur stable partagée", "Context", "Thème, langue, session : change rarement"],
          ["État client partagé", "Zustand", "Sélecteurs fins, zéro boilerplate"],
          ["État complexe traçable", "Redux Toolkit", "DevTools temporels, équipes larges"],
          ["Données serveur", "TanStack Query", "Cache, invalidation, revalidation"],
        ],
      },
      {
        kind: "text",
        text: "On peut combiner : TanStack Query pour le serveur, Zustand pour l'UI partagée, `useState` pour le local. Le piège est d'utiliser un seul outil pour tout — surtout de mettre du serveur dans du client.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "usestate-limites",
    title: "Les limites de useState",
    level: 3,
    intro: "useState suffit jusqu'au moment précis où il ne suffit plus : savoir reconnaître ce moment.",
    blocks: [
      {
        kind: "list",
        items: [
          "L'état doit être partagé entre des composants éloignés : le prop drilling commence (plus de 2 niveaux).",
          "Plusieurs états doivent changer ensemble de façon cohérente : les `setState` en cascade deviennent fragiles.",
          "L'état doit survivre au démontage du composant : navigation, onglets, retour en arrière.",
          "La logique de mise à jour est complexe : conditions, validations, transitions — `useReducer` puis un store.",
        ],
      },
      {
        kind: "text",
        text: "Règle pratique : tant que l'état vit et meurt dans un composant (ou son parent direct), `useState` est le bon choix. Le store est une réponse à un problème de partage, pas un défaut d'architecture.",
      },
    ],
  },
  {
    id: "usereducer-pattern",
    title: "useReducer : les actions avant le store",
    level: 3,
    intro: "Centraliser les mises à jour complexes dans un reducer : le pattern qui mène à Redux.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Reducer de panier",
        code: "import { useReducer } from 'react';\n\ntype Action =\n  | { type: 'add'; id: string }\n  | { type: 'remove'; id: string }\n  | { type: 'clear' };\n\nfunction cartReducer(items: string[], action: Action): string[] {\n  switch (action.type) {\n    case 'add': return [...items, action.id];\n    case 'remove': return items.filter((i) => i !== action.id);\n    case 'clear': return [];\n  }\n}\n\nconst [items, dispatch] = useReducer(cartReducer, []);\ndispatch({ type: 'add', id: 'p42' });",
      },
      {
        kind: "text",
        text: "Le reducer rend les transitions explicites et testables : chaque action est une fonction pure. Quand ce reducer doit être partagé entre écrans, il déménage tel quel dans Zustand ou Redux — la logique ne change pas, seul le conteneur change.",
      },
    ],
  },
  {
    id: "context-pieges",
    title: "Context : les pièges",
    level: 3,
    intro: "Context diffuse, mais re-rend : comprendre son coût avant de s'en servir comme store.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Le piège du re-render global",
        code: "// Chaque `setUser` re-rend TOUS les consommateurs du contexte,\n// même ceux qui n'utilisent que le thème.\nconst AppContext = createContext();\n\nfunction App() {\n  const [user, setUser] = useState(null);\n  const [theme, setTheme] = useState('light');\n  // La valeur change à chaque rendu : tout se re-rend.\n  return (\n    <AppContext.Provider value={{ user, setUser, theme, setTheme }}>\n      <App2 />\n    </AppContext.Provider>\n  );\n}",
      },
      {
        kind: "list",
        items: [
          "Context n'est pas un store : il n'a pas de sélecteurs. Tout changement de la valeur re-rend tous les consommateurs.",
          "Usage sain : valeurs stables ou rarement modifiées (thème, langue, client API, session).",
          "Si la valeur change souvent (panier, formulaire), séparez les contextes ou passez à un vrai store avec sélecteurs.",
          "Mémoïsez la valeur (`useMemo`) pour éviter les re-renders dus à la recréation de l'objet à chaque rendu.",
        ],
      },
    ],
  },
  {
    id: "selecteurs-zustand",
    title: "Sélecteurs Zustand",
    level: 3,
    intro: "Le sélecteur est ce qui rend Zustand performant : s'abonner à peu, se re-rendre peu.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Sélecteurs fins",
        code: "// ✅ Ne se re-rend que si le nombre d'articles change\nconst count = useCart((s) => s.items.length);\n\n// ✅ Ne se re-rend que si le total change\nconst total = useCart((s) => s.total);\n\n// ❌ Se re-rend à chaque changement du store\nconst state = useCart();",
      },
      {
        kind: "text",
        text: "Zustand compare le résultat du sélecteur avec `Object.is` : si vous sélectionnez un objet recréé à chaque fois, la comparaison échoue toujours. Sélectionnez des primitives ou mémoïsez. Pour les sélecteurs complexes, le middleware `subscribeWithSelector` ou des sélecteurs mémoïsés évitent les calculs répétés.",
      },
    ],
  },
  {
    id: "slices-zustand",
    title: "Organiser un store en slices",
    level: 3,
    intro: "Un store monolithique devient illisible : découpez en tranches combinées.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Slices combinées",
        code: "import { create } from 'zustand';\n\ntype CartSlice = { items: string[]; add: (id: string) => void };\ntype UserSlice = { name: string | null; login: (n: string) => void };\n\nconst createCartSlice = (set): CartSlice => ({\n  items: [],\n  add: (id) => set((s) => ({ items: [...s.items, id] })),\n});\n\nconst createUserSlice = (set): UserSlice => ({\n  name: null,\n  login: (n) => set({ name: n }),\n});\n\nexport const useStore = create<CartSlice & UserSlice>((set) => ({\n  ...createCartSlice(set),\n  ...createUserSlice(set),\n}));",
      },
      {
        kind: "text",
        text: "Chaque slice vit dans son fichier, avec ses types et ses tests. Le store racine ne fait que combiner. Quand une slice grossit trop, c'est le signal qu'elle mérite son propre store.",
      },
    ],
  },
  {
    id: "structure-stores",
    title: "Structurer plusieurs stores",
    level: 3,
    intro: "Un store par domaine, pas un store global : la même règle que les features.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un store par domaine métier : `useCart`, `useSession`, `useFilters` — chacun dans sa feature.",
          "Les stores ne s'importent pas entre eux : si deux stores doivent se parler, c'est via un sélecteur dérivé ou un événement, pas un import croisé.",
          "Le store expose des actions, pas des `set` bruts : `cart.add(id)` plutôt que `set({ items: [...] })` depuis les composants.",
          "Colocalisez : le store du panier vit dans `features/cart/store.ts`, pas dans un dossier `stores/` global.",
        ],
      },
    ],
  },
  {
    id: "redux-toolkit",
    title: "Redux Toolkit : quand et comment",
    level: 3,
    intro: "Redux Toolkit pour les cas où la traçabilité prime sur la simplicité.",
    blocks: [
      {
        kind: "text",
        text: "Redux Toolkit reste pertinent pour les états complexes d'équipes larges : DevTools temporels (rejouer les actions), middlewares standardisés, conventions partagées. Le coût est le boilerplate — réduit par Toolkit, mais réel.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Slice Redux Toolkit",
        code: "import { createSlice, configureStore } from '@reduxjs/toolkit';\n\nconst cartSlice = createSlice({\n  name: 'cart',\n  initialState: { items: [] as string[] },\n  reducers: {\n    add: (state, action) => { state.items.push(action.payload); },\n    remove: (state, action) => {\n      state.items = state.items.filter((i) => i !== action.payload);\n    },\n  },\n});\n\nexport const store = configureStore({ reducer: { cart: cartSlice.reducer } });\nexport const { add, remove } = cartSlice.actions;",
      },
      {
        kind: "text",
        text: "Notez `state.items.push` : Immer (intégré) autorise l'écriture « mutable » qui produit un état immuable. Choisissez Redux Toolkit quand vous avez besoin de l'écosystème (DevTools, middlewares) ou d'une convention d'équipe forte — sinon Zustand suffit.",
      },
    ],
  },
  {
    id: "normalisation",
    title: "Normalisation des entités",
    level: 3,
    intro: "Stocker par id plutôt qu'imbriqué : la règle qui évite les incohérences.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Entités normalisées",
        code: "// ❌ Imbriqué : le même auteur existe en 3 copies, jamais synchronisées\ntype Bad = { articles: { id: string; author: { id: string; name: string } }[] };\n\n// ✅ Normalisé : chaque entité une fois, liée par id\ntype Good = {\n  articles: Record<string, { id: string; authorId: string }>;\n  authors: Record<string, { id: string; name: string }>;\n};\n\nconst authorName = (s: Good, articleId: string) =>\n  s.authors[s.articles[articleId].authorId].name;",
      },
      {
        kind: "text",
        text: "La normalisation évite les mises à jour incohérentes (renommer un auteur en un seul endroit) et accélère les accès (par clé, pas par recherche). Redux Toolkit fournit `createEntityAdapter` qui gère les adapters normalisés ; avec Zustand, un simple `Record<id, entité>` suffit souvent.",
      },
    ],
  },
  {
    id: "etat-derive",
    title: "État dérivé, jamais dupliqué",
    level: 3,
    intro: "Tout ce qui se calcule ne se stocke pas : le dérivé est toujours frais par construction.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Dériver plutôt que stocker",
        code: "const items = useCart((s) => s.items);\n\n// ✅ Calculé à chaque rendu : impossible à désynchroniser\nconst total = items.reduce((sum, i) => sum + i.price, 0);\nconst count = items.length;\n\n// ❌ Stocké : chaque `add` doit penser à mettre à jour le total\n// type Bad = { items: Item[]; total: number };",
      },
      {
        kind: "text",
        text: "Si le calcul est coûteux, `useMemo` le mémoïse ; si plusieurs composants en ont besoin, un sélecteur le partage. La duplication d'état dérivé est la source n°1 des bugs « l'affichage ne correspond pas aux données ».",
      },
    ],
  },
  {
    id: "staleTime-gcTime",
    title: "staleTime et gcTime",
    level: 3,
    intro: "Les deux durées qui règlent le comportement du cache TanStack Query.",
    blocks: [
      {
        kind: "fields",
        title: "Les deux horloges",
        fields: [
          {
            label: "staleTime (défaut : 0)",
            value:
              "Durée pendant laquelle les données sont considérées fraîches : aucun refetch en arrière-plan. `staleTime: 60_000` = « ces données sont valables une minute ».",
          },
          {
            label: "gcTime (défaut : 5 min)",
            value:
              "Durée de conservation en cache après le dernier observateur : passé ce délai, les données sont purgées et la prochaine visite refetch.",
          },
          {
            label: "Réglage typique",
            value:
              "Données quasi-statiques (catégories) : `staleTime` long. Données vivantes (notifications) : `staleTime: 0` + `refetchInterval`. Jamais de `staleTime: Infinity` sans raison.",
          },
        ],
      },
    ],
  },
  {
    id: "invalidation",
    title: "Invalidation du cache",
    level: 3,
    intro: "Dire au cache que ses données sont périmées : le mécanisme central de la fraîcheur.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Invalider après une mutation",
        code: "import { useMutation, useQueryClient } from '@tanstack/react-query';\n\nfunction useCreateArticle() {\n  const queryClient = useQueryClient();\n  return useMutation({\n    mutationFn: (data) => fetch('/api/articles', {\n      method: 'POST',\n      body: JSON.stringify(data),\n    }),\n    onSuccess: () => {\n      // Toutes les requêtes ['articles', ...] sont marquées périmées\n      queryClient.invalidateQueries({ queryKey: ['articles'] });\n    },\n  });\n}",
      },
      {
        kind: "text",
        text: "L'invalidation par préfixe (`['articles']` invalide `['articles', id]` et `['articles', { page }]`) est la raison des clés hiérarchiques. Invalidez large et peu souvent plutôt que précis et partout : un refetch de trop coûte moins cher qu'un cache incohérent.",
      },
    ],
  },
  {
    id: "mutations",
    title: "Mutations : écrire côté serveur",
    level: 3,
    intro: "useMutation encapsule les écritures : états, erreurs, retries.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Mutation avec états",
        code: "const mutation = useMutation({ mutationFn: createArticle });\n\n<button\n  onClick={() => mutation.mutate({ title })}\n  disabled={mutation.isPending}\n>\n  {mutation.isPending ? 'Envoi…' : 'Publier'}\n</button>\n{mutation.isError && <p>Échec : {mutation.error.message}</p>}",
      },
      {
        kind: "text",
        text: "`useMutation` fournit `isPending`, `isError`, `isSuccess` : plus besoin d'états artisanaux. Les mutations ne sont pas mises en cache (ce sont des écritures) : leur seul lien avec le cache est l'invalidation en `onSuccess`. Pour l'UX, combinez avec les mises à jour optimistes.",
      },
    ],
  },
  {
    id: "optimiste",
    title: "Mises à jour optimistes",
    level: 3,
    intro: "Mettre à jour l'UI avant la réponse du serveur : l'illusion de l'instantanéité.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Optimistic update avec rollback",
        code: "useMutation({\n  mutationFn: toggleLike,\n  onMutate: async (id) => {\n    await queryClient.cancelQueries({ queryKey: ['articles'] });\n    const previous = queryClient.getQueryData(['articles']);\n    queryClient.setQueryData(['articles'], (old) =>\n      old.map((a) => (a.id === id ? { ...a, liked: !a.liked } : a))\n    );\n    return { previous };\n  },\n  onError: (err, id, context) => {\n    queryClient.setQueryData(['articles'], context.previous);\n  },\n  onSettled: () => {\n    queryClient.invalidateQueries({ queryKey: ['articles'] });\n  },\n});",
      },
      {
        kind: "text",
        text: "Le pattern : snapshot (`onMutate`), mise à jour immédiate, rollback en cas d'erreur (`onError`), revalidation finale (`onSettled`). Réservez-le aux actions réversibles et fréquentes (likes, toggles) : sur un formulaire complexe, l'état de chargement suffit.",
      },
    ],
  },
  {
    id: "pagination-infinie",
    title: "Pagination et scroll infini",
    level: 3,
    intro: "useInfiniteQuery gère les pages comme une seule liste : le scroll infini sans la complexité.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Scroll infini",
        code: "const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =\n  useInfiniteQuery({\n    queryKey: ['articles'],\n    queryFn: ({ pageParam }) => fetch('/api/articles?cursor=' + pageParam).then((r) => r.json()),\n    initialPageParam: 0,\n    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,\n  });\n\nconst articles = data?.pages.flatMap((p) => p.items) ?? [];",
      },
      {
        kind: "text",
        text: "Préférez les curseurs (`nextCursor`) à l'offset pour la pagination : stables quand des éléments s'ajoutent. `fetchNextPage` se déclenche via un IntersectionObserver sur un élément sentinelle en bas de liste. Chaque page reste adressable séparément dans le cache.",
      },
    ],
  },
  {
    id: "requetes-dependantes",
    title: "Requêtes dépendantes",
    level: 3,
    intro: "Enchaîner les requêtes proprement : la seconde attend la première.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "enabled : la requête conditionnelle",
        code: "// 1. Charger l'utilisateur\nconst { data: user } = useQuery({ queryKey: ['me'], queryFn: fetchMe });\n\n// 2. Charger ses articles SEULEMENT quand l'utilisateur est connu\nconst { data: articles } = useQuery({\n  queryKey: ['articles', user?.id],\n  queryFn: () => fetchUserArticles(user.id),\n  enabled: !!user,\n});",
      },
      {
        kind: "text",
        text: "`enabled: false` suspend la requête sans la détruire : dès que la condition devient vraie, elle s'exécute. C'est le mécanisme déclaratif qui remplace les `useEffect` en cascade — plus lisible, et la clé inclut la dépendance (`user.id`), donc le cache reste correct.",
      },
    ],
  },
  {
    id: "deduplication",
    title: "Déduplication des requêtes",
    level: 3,
    intro: "Cinq composants demandent la même donnée : une seule requête part.",
    blocks: [
      {
        kind: "text",
        text: "TanStack Query déduplique automatiquement : si une requête avec la même `queryKey` est déjà en vol, les nouveaux abonnés attendent son résultat au lieu de relancer un fetch. C'est gratuit et ça élimine toute une classe de problèmes (requêtes en double au montage).",
      },
      {
        kind: "list",
        items: [
          "Condition : des `queryKey` identiques — d'où l'importance des clés stables et partagées.",
          "Le `staleTime` évite même le refetch : données fraîches = réponse immédiate depuis le cache.",
          "En dehors de TanStack Query (fetch manuel), la déduplication se fait à la main avec un `Map` de promesses en vol.",
        ],
      },
    ],
  },
  {
    id: "persistance-avancee",
    title: "Persistance avancée",
    level: 3,
    intro: "Au-delà du localStorage artisanal : versioning, réhydratation partielle, cache serveur persistant.",
    blocks: [
      {
        kind: "fields",
        title: "Techniques",
        fields: [
          {
            label: "Middleware persist (Zustand)",
            value:
              "Persiste une partie du store avec versioning du schéma : les anciennes données sont migrées ou ignorées au lieu de casser l'app.",
          },
          {
            label: "Ne persister que l'utile",
            value:
              "Panier, préférences, brouillons : oui. Tokens, données sensibles : non — le localStorage est lisible par tout script (XSS).",
          },
          {
            label: "Réhydratation asynchrone",
            value:
              "Le chargement depuis le stockage est asynchrone : prévoyez un état « en cours de réhydratation » pour éviter le flash de l'état vide.",
          },
          {
            label: "Cache serveur persistant",
            value:
              "TanStack Query peut persister son cache (experimental persisters) : au redémarrage, les données s'affichent aussitôt, puis se revalident.",
          },
        ],
      },
    ],
  },
  {
    id: "sync-onglets",
    title: "Synchronisation entre onglets",
    level: 3,
    intro: "Deux onglets, un panier : garder l'état cohérent partout.",
    blocks: [
      {
        kind: "text",
        text: "L'événement `storage` se déclenche dans les autres onglets quand le `localStorage` change : c'est le canal simple pour synchroniser. TanStack Query fait déjà cela pour son cache (`refetchOnWindowFocus`) : au retour sur un onglet, les données périmées se revalident.",
      },
      {
        kind: "code",
        language: "typescript",
        title: "Écouter les changements d'un autre onglet",
        code: "window.addEventListener('storage', (e) => {\n  if (e.key === 'cart') {\n    useCart.setState({ items: JSON.parse(e.newValue ?? '[]') });\n  }\n});",
      },
    ],
  },
  {
    id: "formulaires",
    title: "État des formulaires",
    level: 3,
    intro: "Les formulaires ont leur propre cycle de vie : ne les gérez pas comme le reste.",
    blocks: [
      {
        kind: "list",
        items: [
          "État local d'abord : les champs d'un formulaire vivent dans le composant (ou une bibliothèque dédiée), pas dans le store global.",
          "Bibliothèques dédiées (React Hook Form, TanStack Form) : champs non contrôlés, validation intégrée, performances — ne réinventez pas.",
          "Le serveur ne voit que la soumission : la validation client est de l'UX, la validation serveur est de la sécurité. Les deux sont nécessaires.",
          "Brouillons : si le formulaire doit survivre à la navigation, persistez le brouillon (localStorage) séparément de l'état du formulaire.",
        ],
      },
    ],
  },
  {
    id: "machines-etat",
    title: "Machines à états (XState)",
    level: 3,
    intro: "Pour les flux complexes, les transitions explicites battent les booléens.",
    blocks: [
      {
        kind: "text",
        text: "Un tunnel d'achat (panier → livraison → paiement → confirmation) avec ses erreurs, retours en arrière et cas limites devient vite une soupe de booléens. Une machine à états (XState) déclare les états possibles et les transitions autorisées : les états impossibles n'existent plus.",
      },
      {
        kind: "list",
        items: [
          "À réserver aux flux vraiment complexes : checkout, onboarding multi-étapes, éditeurs.",
          "Bénéfice principal : la visualisation — la machine se dessine, se discute avec le produit, se teste exhaustivement.",
          "Coût : verbosité et courbe d'apprentissage. Pour un toggle, c'est de la sur-ingénierie.",
        ],
      },
    ],
  },
  {
    id: "url-etat",
    title: "L'URL comme état",
    level: 3,
    intro: "Filtres, pagination, recherche : l'état partageable vit dans l'URL.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Filtres dans les search params",
        code: "import { useSearchParams } from 'react-router-dom';\n\nfunction Catalog() {\n  const [params, setParams] = useSearchParams();\n  const category = params.get('category') ?? 'all';\n  const page = Number(params.get('page') ?? 1);\n\n  // L'URL est partageable, le retour arrière fonctionne,\n  // et la clé de cache en découle naturellement.\n  const { data } = useQuery({\n    queryKey: ['articles', { category, page }],\n    queryFn: () => fetchArticles({ category, page }),\n  });\n}",
      },
      {
        kind: "text",
        text: "Bénéfices : lien partageable, boutons précédent/suivant qui fonctionnent, état survivant au rechargement — gratuitement. Réservez l'URL à l'état « adressable » (filtres, pagination, onglets) : pas au thème ni au contenu du panier.",
      },
    ],
  },
  {
    id: "temps-reel",
    title: "Temps réel : WebSockets et état",
    level: 3,
    intro: "Quand le serveur pousse, le cache doit suivre : brancher le temps réel sur TanStack Query.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Injecter un événement WebSocket dans le cache",
        code: "socket.on('article:updated', (article) => {\n  queryClient.setQueryData(['articles', article.id], article);\n  queryClient.invalidateQueries({ queryKey: ['articles'] });\n});",
      },
      {
        kind: "list",
        items: [
          "`setQueryData` met à jour le cache sans requête : l'UI reflète l'événement aussitôt.",
          "L'invalidation qui suit garantit la cohérence avec le serveur (l'événement peut être partiel).",
          "Le WebSocket lui-même vit hors React (singleton de module) : les composants s'abonnent au cache, pas au socket.",
          "Reconnexion : à la reconnexion, invalidez large — les événements manqués sont récupérés par refetch.",
        ],
      },
    ],
  },
  {
    id: "offline",
    title: "Mode hors-ligne",
    level: 3,
    intro: "L'état doit survivre à la perte réseau : file d'attente et réconciliation.",
    blocks: [
      {
        kind: "list",
        items: [
          "Lecture : le cache (persisté) affiche les dernières données connues avec un indicateur « hors-ligne ».",
          "Écriture : les mutations sont mises en file et rejouées à la reconnexion — TanStack Query gère la file, vous gérez les conflits.",
          "Conflits : définissez la stratégie (dernier écrit gagne, fusion manuelle, refus avec message) avant d'en avoir besoin.",
          "Détection : `navigator.onLine` + événements `online`/`offline` pour l'indicateur ; ne vous fiez pas qu'à eux (un portail captif ment).",
        ],
      },
    ],
  },
  {
    id: "selecteurs-memoises",
    title: "Sélecteurs mémoïsés",
    level: 3,
    intro: "Quand le dérivé coûte cher, le sélecteur se mémoïse.",
    blocks: [
      {
        kind: "text",
        text: "Un sélecteur qui filtre et trie mille articles à chaque rendu annule le bénéfice de l'abonnement fin. La solution : mémoïser le calcul sur ses entrées — le résultat n'est recalculé que si les articles changent, pas à chaque rendu du composant.",
      },
      {
        kind: "list",
        items: [
          "Zustand : combinez le sélecteur avec `useMemo` dans le composant, ou un sélecteur mémoïsé externe.",
          "Redux : `createSelector` (Reselect, intégré à Toolkit) mémoïse par entrées.",
          "Règle : mesurez d'abord — un filtre sur 50 éléments n'a pas besoin de mémoïsation.",
        ],
      },
    ],
  },
  {
    id: "testing",
    title: "Tester les stores et les requêtes",
    level: 3,
    intro: "L'état se teste sans React : des fonctions, des transitions, des états.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Tester un store Zustand",
        code: "import { describe, it, expect, beforeEach } from 'vitest';\nimport { useCart } from './store';\n\nbeforeEach(() => useCart.setState({ items: [] }));\n\ndescribe('panier', () => {\n  it('ajoute un article', () => {\n    useCart.getState().add('p42');\n    expect(useCart.getState().items).toEqual(['p42']);\n  });\n\n  it('calcule le total', () => {\n    useCart.setState({ items: [{ id: 'p1', price: 10 }] });\n    expect(useCart.getState().total).toBe(10);\n  });\n});",
      },
      {
        kind: "list",
        items: [
          "Stores : testez les actions et les dérivés via `getState()`/`setState()` — aucun rendu nécessaire.",
          "Requêtes : mockez `fetch` (ou le client HTTP) et vérifiez les clés, les retries, l'invalidation après mutation.",
          "Composants : testez le comportement (clic → article ajouté → total affiché), pas l'implémentation du store.",
        ],
      },
    ],
  },
  {
    id: "debugging",
    title: "Debugging de l'état",
    level: 3,
    intro: "Quand l'UI affiche n'importe quoi, la méthode pour remonter à la source.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Identifier la famille",
            detail:
              "Donnée serveur périmée ? État partagé mal mis à jour ? État local désynchronisé ? La famille oriente l'outil : DevTools Query, DevTools Redux, ou React DevTools.",
          },
          {
            title: "Inspecter le cache",
            detail:
              "React Query DevTools : la `queryKey` contient-elle les bonnes données ? Est-elle `stale` ? Une invalidation manquante explique 80 % des « données fantômes ».",
          },
          {
            title: "Tracer les actions",
            detail:
              "Redux DevTools : rejouez les actions une par une. Pour Zustand, loggez les `set` en développement via le middleware `devtools`.",
          },
          {
            title: "Vérifier les sélecteurs",
            detail:
              "Le composant s'abonne-t-il à la bonne tranche ? Un sélecteur trop large re-rend trop ; un sélecteur périmé affiche du vide.",
          },
          {
            title: "Reproduire en isolation",
            detail:
              "Extrayez le store et le composant dans un test : si le bug disparaît, la cause est dans l'interaction (ordre des effets, double montage StrictMode).",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les pièges classiques du state management.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Serveur dans le client",
            value:
              "Problem : les données API copiées dans un store Zustand « pour y accéder partout ». Why : méconnaissance de la distinction serveur/client. Better : TanStack Query pour le serveur, avec ses clés partagées.",
          },
          {
            label: "useEffect de fetch artisanal",
            value:
              "Problem : `useEffect` + `fetch` + trois `useState` (data, loading, error) dupliqués partout. Why : habitude. Better : `useQuery` — le cache, les retries et la déduplication sont inclus.",
          },
          {
            label: "État dérivé stocké",
            value:
              "Problem : `total` stocké à côté de `items`, désynchronisé après un bug. Why : « optimisation » prématurée. Better : dériver à chaque rendu (ou mémoïser si coûteux).",
          },
          {
            label: "Context comme store global",
            value:
              "Problem : un contexte unique qui re-rend toute l'app à chaque frappe. Why : Context confondu avec un store. Better : valeurs stables en Context, état changeant en store avec sélecteurs.",
          },
          {
            label: "Clés de cache instables",
            value:
              "Problem : `queryKey: ['articles', { page }]` recréé différemment à chaque rendu. Why : objet inline non stable. Better : clés construites de façon déterministe, filtres sérialisés proprement.",
          },
          {
            label: "Invalidation oubliée",
            value:
              "Problem : après création, la liste n'affiche pas le nouvel élément. Why : `onSuccess` sans `invalidateQueries`. Better : invalider systématiquement, ou mettre à jour le cache en optimiste.",
          },
          {
            label: "Prop drilling par paresse",
            value:
              "Problem : props qui traversent six niveaux « en attendant ». Why : le store semble trop lourd pour « juste ça ». Better : l'effort d'un store localisé est inférieur au coût du drilling.",
          },
          {
            label: "Normalisation ignorée",
            value:
              "Problem : le même auteur affiché différemment sur deux écrans. Why : entités imbriquées dupliquées. Better : normaliser par id, une seule source de vérité.",
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
          "Local par défaut : ne partagez que ce qui est réellement partagé, ne mettez en cache que ce qui vient du serveur.",
          "Sélecteurs fins : abonnez chaque composant à la tranche dont il a besoin, rien de plus.",
          "Clés hiérarchiques : `['articles']`, `['articles', id]` — l'invalidation par préfixe en dépend.",
          "Dériver, pas dupliquer : totaux, comptes, filtrés se calculent.",
          "Normaliser les entités : par id, une seule copie.",
          "Invalider après écrire : chaque mutation connaît les clés qu'elle périme.",
          "Tester les transitions : actions, dérivés, invalidations — pas l'implémentation.",
          "Documenter les clés : un endroit qui liste les `queryKey` et leur signification évite les collisions.",
        ],
      },
      {
        kind: "text",
        text: "Contexte : une petite app peut vivre avec `useState` + quelques `useQuery`. N'introduisez Zustand ou Redux que quand le partage devient douloureux — l'outil suit le besoin, jamais l'inverse.",
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
            label: "React — Managing State",
            value:
              "react.dev : le guide officiel sur l'état (useState, useReducer, Context) — la base avant les bibliothèques.",
          },
          {
            label: "TanStack Query",
            value:
              "tanstack.com/query : guides (caching, invalidation, mutations optimistes) et référence des options.",
          },
          {
            label: "Redux Toolkit",
            value:
              "redux-toolkit.js.org : tutoriels et patterns quand la traçabilité prime.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Zustand : la documentation du dépôt (README et docs) — courte et suffisante.",
          "Pratique : refactorisez une app existante en séparant les trois familles d'état, et mesurez le code supprimé.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Le state management maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir React : les Server Components changent la donne — moins d'état client, plus de données serveur.",
          "Consolider TypeScript : des stores typés strictement rendent les sélecteurs sûrs et l'invalidation prévisible.",
          "Apprendre les tests : Vitest pour les stores, Testing Library pour les comportements.",
          "Travailler l'architecture frontend : les stores vivent dans les features, avec des frontières vérifiées.",
          "Revenir à la roadmap : valider State Management et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

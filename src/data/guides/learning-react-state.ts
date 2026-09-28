import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de la gestion d'état React : de zéro à un usage
 * professionnel. 3 niveaux d'information (Aperçu / Pratique / Approfondi)
 * avec divulgation progressive. Tous les textes supportent le code inline
 * entre backticks. Cohérent avec le guide existant (useState, useReducer,
 * Context, Zustand, Redux Toolkit, TanStack Query).
 */
export const LEARNING_REACT_STATE: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est l'état en React, où le placer et quand il doit dépasser le composant.",
    blocks: [
      {
        kind: "text",
        text: "L'état, c'est la mémoire de l'application : ce que l'utilisateur a saisi, chargé, sélectionné. En React, l'état vit par défaut dans le composant (`useState`) — local, simple, suffisant pour la majorité des cas. La « gestion d'état » devient un sujet quand l'état doit être partagé entre des composants éloignés, persister, ou se synchroniser avec un serveur.",
      },
      {
        kind: "text",
        text: "L'erreur classique : installer une librairie globale dès le premier composant. La discipline professionnelle est inverse — état local d'abord, remontée (`lifting state`) ensuite, contexte pour les valeurs stables partagées, store externe (Zustand, Redux Toolkit) pour l'état global changeant, et une librairie serveur (TanStack Query) pour les données distantes. Chaque couche répond à un problème précis.",
      },
      {
        kind: "text",
        text: "Distinction fondamentale : l'état client (ce que l'utilisateur fait : formulaires, UI, préférences) et l'état serveur (ce que le serveur sait : listes, profils, données métier). Les mélanger dans le même store produit des caches incohérents ; les séparer — état client local, état serveur géré par une librairie de fetching — simplifie tout.",
      },
    ],
  },
  {
    id: "state-carte-mentale",
    title: "La carte mentale de l'état",
    level: 1,
    intro:
      "Cinq couches, une question : où vit cette donnée ?",
    blocks: [
      {
        kind: "diagram",
        title: "Les couches d'état, du local au distant",
        lines: [
          "LOCAL (composant)",
          " useState / useReducer ─── formulaire, toggle, état d'un écran",
          "     │ partagé entre proches",
          "REMONTÉE (lifting state)",
          " parent commun ─── état partagé par quelques composants voisins",
          "     │ valeur stable, arbre entier",
          "CONTEXTE (React)",
          " createContext ─── thème, utilisateur, locale (change rarement)",
          "     │ change souvent, sélecteurs",
          "STORE EXTERNE",
          " Zustand / Redux Toolkit ─── panier, session, état global métier",
          "     │ données du serveur",
          "ÉTAT SERVEUR",
          " TanStack Query ─── cache, revalidation, états loading/error",
          "",
          "RÈGLE : la couche la plus basse qui suffit.",
        ],
      },
      {
        kind: "text",
        text: "La question à se poser pour chaque donnée : qui la lit, qui l'écrit, à quelle fréquence change-t-elle ? Un thème lu partout mais changé rarement → contexte. Un panier modifié partout → store externe. Une liste d'utilisateurs → état serveur, pas un `useState` + `useEffect` manuel.",
      },
      {
        kind: "list",
        items: [
          "État local par défaut : la majorité de l'état d'une app n'a pas besoin d'être global.",
          "Contexte ≠ store : le contexte re-rend tous ses consommateurs à chaque changement.",
          "État serveur ≠ état client : cache et synchronisation d'un côté, interactions de l'autre.",
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
      "Ce qu'il faut maîtriser avant la gestion d'état, et pourquoi.",
    blocks: [
      {
        kind: "fields",
        title: "Fondations requises",
        fields: [
          {
            label: "Hooks (`react-hooks`)",
            value:
              "`useState`, `useReducer`, `useContext`, `useEffect` : les briques de base de tout état React.",
          },
          {
            label: "Composants et props (`react`)",
            value:
              "Arborescence, composition, flux de données descendant : comprendre où l'état peut vivre.",
          },
          {
            label: "Immutabilité",
            value:
              "Mettre à jour sans muter (`{...obj}`, `map`, `filter`) : tous les stores détectent les changements par référence.",
          },
          {
            label: "Async / Promises",
            value:
              "L'état serveur arrive par le réseau : chargement, erreur, revalidation sont des états à modéliser.",
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
      "Le projet de base et les librairies d'état les plus utilisées.",
    blocks: [
      {
        kind: "command",
        label: "Créer le projet",
        command: "npm create vite@latest state-lab -- --template react-ts",
        why: "Projet React + TypeScript pour expérimenter : l'état local et le contexte sont natifs, aucune dépendance requise pour commencer.",
        verify: "npm list react",
      },
      {
        kind: "command",
        label: "Installer Zustand",
        command: "npm install zustand",
        why: "Zustand : store externe minimaliste (~1 Ko), sans boilerplate, avec sélecteurs. Le choix pragmatique pour l'état global client quand le contexte ne suffit plus.",
        verify: "npm list zustand",
      },
      {
        kind: "command",
        label: "Installer TanStack Query",
        command: "npm install @tanstack/react-query",
        why: "La référence pour l'état serveur : cache, déduplication des requêtes, revalidation, états `isLoading`/`isError` intégrés. À installer quand l'app lit des API.",
        verify: "npm list @tanstack/react-query",
      },
    ],
  },
  {
    id: "etat-local-dabord",
    title: "L'état local d'abord",
    level: 2,
    intro:
      "La discipline de base : 80 % de l'état reste dans le composant.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "État local bien découpé",
        code: "import { useState } from \"react\";\n\nfunction SearchPanel({ items }: { items: string[] }) {\n  const [query, setQuery] = useState(\"\");\n  const [open, setOpen] = useState(false);\n  // Dérivé pendant le rendu : pas d'état\n  const results = items.filter((i) => i.includes(query));\n\n  return (\n    <div>\n      <input value={query} onChange={(e) => setQuery(e.target.value)} />\n      {open && <ul>{results.map((r) => <li key={r}>{r}</li>)}</ul>}\n      <button onClick={() => setOpen((o) => !o)}>Toggle</button>\n    </div>\n  );\n}",
      },
      {
        kind: "text",
        text: "Principes : un `useState` par préoccupation indépendante ; dériver pendant le rendu tout ce qui se calcule (`results` n'est pas un état) ; placer l'état au plus près de son usage — un état dans la racine re-rend tout, dans une feuille il ne re-rend qu'elle. Quand deux composants frères ont besoin de la même valeur, la remonter au parent commun (lifting state) suffit souvent.",
      },
    ],
  },
  {
    id: "lifting-state-pratique",
    title: "Remonter l'état (lifting state)",
    level: 2,
    intro:
      "Partager entre voisins sans librairie : le parent commun.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "État partagé par le parent",
        code: "import { useState } from \"react\";\n\nfunction Tabs() {\n  const [active, setActive] = useState(\"profil\"); // état remonté ici\n  return (\n    <>\n      <TabBar active={active} onSelect={setActive} />\n      <TabPanel active={active} />\n    </>\n  );\n}\n// TabBar et TabPanel partagent `active` sans store ni contexte.",
      },
      {
        kind: "text",
        text: "Le lifting state est la première réponse au partage : l'état vit dans le plus proche ancêtre commun, les enfants reçoivent valeur + setter en props. Simple, explicite, typé. Il atteint sa limite quand l'ancêtre commun est trop haut (prop drilling sur cinq niveaux) ou que beaucoup de composants dispersés partagent la valeur — c'est le signal pour le contexte ou un store.",
      },
    ],
  },
  {
    id: "context-pratique",
    title: "Context : le partage sans props",
    level: 2,
    intro:
      "Éliminer le prop drilling pour les valeurs stables.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Contexte utilisateur",
        code: "import { createContext, useContext, useState, type ReactNode } from \"react\";\n\ntype User = { name: string } | null;\nconst UserCtx = createContext<User>(null);\n\nexport function UserProvider({ children }: { children: ReactNode }) {\n  const [user, setUser] = useState<User>(null);\n  // En pratique : charger l'utilisateur au montage, exposer login/logout\n  return <UserCtx.Provider value={user}>{children}</UserCtx.Provider>;\n}\n\nexport function useUser() {\n  const user = useContext(UserCtx);\n  if (user === undefined) throw new Error(\"useUser hors Provider\");\n  return user;\n}\n// N'importe quel composant : const user = useUser();",
      },
      {
        kind: "text",
        text: "Le pattern complet : `createContext` + Provider + custom hook `useUser()` qui encapsule `useContext`. Le hook lève une erreur explicite hors Provider — bien meilleur qu'un `null` silencieux. Rappel : le contexte convient aux valeurs qui changent rarement (utilisateur, thème, locale) ; un `value` qui change souvent re-rend tous les consommateurs.",
      },
    ],
  },
  {
    id: "zustand-pratique",
    title: "Zustand : le store minimaliste",
    level: 2,
    intro:
      "L'état global sans boilerplate : créer, sélectionner, mettre à jour.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Store de panier",
        code: "import { create } from \"zustand\";\n\ntype CartStore = {\n  items: string[];\n  add: (item: string) => void;\n  remove: (item: string) => void;\n};\n\nexport const useCart = create<CartStore>((set) => ({\n  items: [],\n  add: (item) => set((s) => ({ items: [...s.items, item] })),\n  remove: (item) => set((s) => ({ items: s.items.filter((i) => i !== item) })),\n}));\n\n// Dans un composant : sélecteur = ne re-rend que si `items` change\nfunction CartCount() {\n  const count = useCart((s) => s.items.length);\n  return <span>{count}</span>;\n}",
      },
      {
        kind: "text",
        text: "Zustand : un `create()` définit état + actions ; les composants s'abonnent via des sélecteurs (`s => s.items.length`) et ne re-rendent que quand la sélection change — c'est la différence décisive avec le contexte. Pas de Provider, pas de boilerplate, compatible DevTools. Le choix par défaut pour l'état global client dans un nouveau projet.",
      },
    ],
  },
  {
    id: "tanstack-query-pratique",
    title: "TanStack Query : l'état serveur",
    level: 2,
    intro:
      "Ne plus gérer le fetching à la main : cache et états intégrés.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Requête avec cache",
        code: "import { QueryClient, QueryClientProvider, useQuery } from \"@tanstack/react-query\";\n\nconst client = new QueryClient();\n\nexport function App() {\n  return (\n    <QueryClientProvider client={client}>\n      <UserList />\n    </QueryClientProvider>\n  );\n}\n\nfunction UserList() {\n  const { data, isLoading, isError } = useQuery({\n    queryKey: [\"users\"],\n    queryFn: () => fetch(\"/api/users\").then((r) => r.json()),\n  });\n  if (isLoading) return <p>Chargement…</p>;\n  if (isError) return <p>Erreur.</p>;\n  return <ul>{data.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;\n}",
      },
      {
        kind: "text",
        text: "Le `queryKey` identifie la donnée : deux composants avec la même clé partagent le cache, une seule requête réseau. TanStack Query gère la déduplication, le re-fetch au focus, les retries et l'invalidation (`queryClient.invalidateQueries`). L'état serveur sort des `useState`/`useEffect` manuels — et avec lui toute une classe de bugs (race conditions, caches périmés).",
      },
    ],
  },
  {
    id: "ou-mettre-etat",
    title: "Où mettre cet état ? (décision)",
    level: 2,
    intro:
      "L'arbre de décision à appliquer à chaque nouvelle donnée.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Un seul composant l'utilise ?",
            detail: "`useState` local. Ne pas anticiper un partage futur : YAGNI.",
          },
          {
            title: "Quelques composants voisins ?",
            detail: "Lifting state au parent commun. Simple et explicite.",
          },
          {
            title: "Beaucoup de composants, valeur stable ?",
            detail: "Contexte : thème, utilisateur connecté, locale, configuration.",
          },
          {
            title: "Beaucoup de composants, valeur changeante ?",
            detail: "Store externe (Zustand) : panier, notifications, état métier global.",
          },
          {
            title: "La donnée vient d'un serveur ?",
            detail: "État serveur (TanStack Query) : ni `useState`, ni store — un cache synchronisé.",
          },
          {
            title: "La donnée est dans l'URL ?",
            detail: "Paramètres de route / query string : page, filtres, onglet — partageable par lien.",
          },
        ],
      },
    ],
  },
  {
    id: "environnement-developpement",
    title: "Environnement de développement",
    level: 2,
    intro:
      "Voir l'état bouger : les outils indispensables.",
    blocks: [
      {
        kind: "fields",
        title: "Boîte à outils",
        fields: [
          {
            label: "React DevTools",
            value:
              "Inspecter l'état et les hooks de chaque composant, profiler les re-rendus causés par l'état.",
          },
          {
            label: "Zustand DevTools",
            value:
              "Middleware `devtools` : historique des actions dans l'extension Redux DevTools — time travel sur le store.",
          },
          {
            label: "TanStack Query Devtools",
            value:
              "Paquet `@tanstack/react-query-devtools` : inspecter le cache, les clés, l'état de chaque requête.",
          },
          {
            label: "TypeScript strict",
            value:
              "Typer chaque store et chaque état : les formes d'état incohérentes sont la première source de bugs.",
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
      "Les conventions d'équipe autour de l'état.",
    blocks: [
      {
        kind: "diagram",
        title: "Concevoir l'état d'une fonctionnalité",
        lines: [
          "Inventorier les données de la fonctionnalité",
          "     ↓",
          "Classer : locale / partagée / serveur / URL",
          "     ↓",
          "Choisir la couche minimale (arbre de décision)",
          "     ↓",
          "Définir la forme : types, valeurs initiales, transitions",
          "     ↓",
          "Implémenter + typer strictement",
          "     ↓",
          "Vérifier : re-rendus ciblés, pas de duplication",
        ],
      },
      {
        kind: "text",
        text: "La règle d'or en revue : « cette donnée peut-elle vivre plus bas ? » — tout état global injustifié est une dette. Les équipes maintiennent un inventaire implicite : état serveur dans TanStack Query, état global métier dans le store, le reste en local. Et une donnée = une source de vérité : jamais la même information dans deux endroits.",
      },
    ],
  },
  {
    id: "debugging-state",
    title: "Déboguer : les premiers réflexes",
    level: 2,
    intro:
      "« L'UI n'affiche pas la bonne valeur » : remonter à la source.",
    blocks: [
      {
        kind: "list",
        items: [
          "Identifier la source de vérité : où vit réellement cette donnée ? (local, contexte, store, cache serveur).",
          "Valeur périmée ? Mutation directe au lieu d'un nouvel objet — les stores comparent les références.",
          "Re-rendu manquant ? Le sélecteur Zustand ne sélectionne pas la bonne tranche, ou le contexte n'a pas changé de référence.",
          "Re-rendus en cascade ? Un état trop haut, ou un contexte qui change trop souvent — descendre ou découper.",
          "Donnée serveur incohérente ? Vérifier le `queryKey` : deux clés différentes = deux caches, invalidation manquée.",
          "DevTools : inspecter la valeur réelle dans le composant / le store / le cache, pas celle qu'on suppose.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes-state",
    title: "Erreurs courantes",
    level: 2,
    intro:
      "Les pièges classiques de la gestion d'état.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Tout globaliser",
            value:
              "Mettre l'état d'un formulaire dans le store « au cas où » : re-rendus globaux, code illisible. Local d'abord.",
          },
          {
            label: "Dupliquer la source de vérité",
            value:
              "Copier une donnée du cache serveur dans un `useState` : les deux divergent. Sélectionner, pas copier.",
          },
          {
            label: "Muter l'état",
            value:
              "`state.items.push(x)` : même référence, aucun abonné notifié. Toujours créer un nouvel objet/tableau (ou Immer).",
          },
          {
            label: "Contexte pour état changeant",
            value:
              "Un compteur global en contexte re-rend toute l'app à chaque tick : store avec sélecteurs à la place.",
          },
          {
            label: "État serveur en `useState`",
            value:
              "Fetch manuel + états `loading`/`error` artisanaux : race conditions et caches incohérents. TanStack Query.",
          },
          {
            label: "Dérivé stocké",
            value:
              "Stocker `total` alors qu'il se calcule de `items` : les deux peuvent diverger. Calculer pendant le rendu ou via sélecteur.",
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
        title: "Débutant — Panier avec état local + contexte",
        fields: [
          { label: "À construire", value: "Panier partagé entre catalogue et header : d'abord lifting state, puis contexte, comparer" },
          { label: "Objectif", value: "Sentir les limites du lifting state et l'apport du contexte" },
          { label: "Durée", value: "Quelques jours" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Migration vers Zustand",
        fields: [
          { label: "À construire", value: "Reprendre le panier en store Zustand : sélecteurs, persistance `localStorage`, DevTools" },
          { label: "Objectif", value: "Maîtriser les sélecteurs et la persistance ; mesurer les re-rendus évités" },
          { label: "Durée", value: "Une semaine" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Catalogue avec état serveur",
        fields: [
          { label: "À construire", value: "Liste produits via TanStack Query : pagination, filtres URL, invalidation après mutation, optimistic update" },
          { label: "Objectif", value: "Séparer état client / état serveur sur une app réaliste" },
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
      "Par où continuer, en commençant par les documentations officielles.",
    blocks: [
      {
        kind: "fields",
        title: "Documentations officielles (à privilégier)",
        fields: [
          {
            label: "react.dev/learn/managing-state",
            value: "Le guide officiel : penser en état, choisir sa structure — la référence conceptuelle.",
          },
          {
            label: "zustand.docs.pmnd.rs",
            value: "Documentation Zustand : guides, middlewares, TypeScript.",
          },
          {
            label: "tanstack.com/query",
            value: "Documentation TanStack Query : concepts (clés, cache) et guides.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les trois projets progressifs de cette page, dans l'ordre.",
          "Réflexe : devant chaque nouvelle donnée, appliquer l'arbre de décision « Où mettre cet état ? ».",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "etat-derive-vs-stocke",
    title: "État dérivé vs état stocké",
    level: 3,
    intro:
      "La règle qui élimine une classe entière de bugs : ne stocker que l'irréductible.",
    blocks: [
      {
        kind: "text",
        text: "Tout ce qui se calcule à partir d'un état existant est dérivé : total d'un panier, liste filtrée, `isValid` d'un formulaire. Le stocker crée une seconde source de vérité qui peut diverger (mise à jour oubliée, ordre des setters). Le dériver — pendant le rendu, via `useMemo` si coûteux, ou via sélecteur dans le store — garantit la cohérence par construction.",
      },
      {
        kind: "code",
        language: "tsx",
        title: "Dérivation dans un store Zustand",
        code: "import { create } from \"zustand\";\n\ntype Store = { items: { price: number }[]; add: (p: number) => void };\n\nexport const useCart = create<Store>((set) => ({\n  items: [],\n  add: (price) => set((s) => ({ items: [...s.items, { price }] })),\n}));\n\n// Dérivé via sélecteur : jamais stocké\nconst total = useCart((s) => s.items.reduce((n, i) => n + i.price, 0));",
      },
      {
        kind: "list",
        items: [
          "Test : si la valeur peut se recalculer à tout moment depuis l'état, ne pas la stocker.",
          "Exception : dérivation coûteuse + lue souvent → mémoriser (`useMemo`, sélecteur mémorisé), pas dupliquer.",
          "Les formulaires sont le cas piège : `errors` se dérive de `values` + règles — voir `react-forms`.",
        ],
      },
    ],
  },
  {
    id: "context-decoupage",
    title: "Découper les contextes",
    level: 3,
    intro:
      "Le pattern qui sauve le contexte : un contexte par préoccupation.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Valeur et actions séparées",
        code: "import { createContext, useContext, useState, type ReactNode } from \"react\";\n\nconst ThemeValue = createContext<\"clair\" | \"sombre\">(\"clair\");\nconst ThemeActions = createContext<{ toggle: () => void }>({ toggle: () => {} });\n\nexport function ThemeProvider({ children }: { children: ReactNode }) {\n  const [theme, setTheme] = useState<\"clair\" | \"sombre\">(\"clair\");\n  // `toggle` stable : les consommateurs de ThemeValue ne re-rendent pas\n  // quand seules les actions changeraient (ici elles ne changent jamais).\n  return (\n    <ThemeValue.Provider value={theme}>\n      <ThemeActions.Provider value={{ toggle: () => setTheme(t => t === \"clair\" ? \"sombre\" : \"clair\") }}>\n        {children}\n      </ThemeActions.Provider>\n    </ThemeValue.Provider>\n  );\n}\n\nexport const useTheme = () => useContext(ThemeValue);\nexport const useThemeActions = () => useContext(ThemeActions);",
      },
      {
        kind: "text",
        text: "Le problème : un contexte `{ value, setValue }` re-rend tous les consommateurs quand `value` change — même ceux qui n'utilisent que `setValue`. La parade : séparer les contextes de lecture et d'actions. Les composants qui n'affichent rien (boutons) s'abonnent aux actions et ne re-rendent jamais. C'est le pattern recommandé par la documentation React pour les contextes à changements fréquents.",
      },
    ],
  },
  {
    id: "zustand-selecteurs",
    title: "Zustand : sélecteurs avancés",
    level: 3,
    intro:
      "Ne re-rendre que quand c'est nécessaire : l'art du sélecteur.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Sélecteurs précis et stables",
        code: "import { useShallow } from \"zustand/react/shallow\";\n\n// Primitif : comparaison par défaut (Object.is) — idéal\nconst count = useCart((s) => s.items.length);\n\n// Objet dérivé : useShallow compare les clés, évite les re-rendus\nconst { total, count: n } = useCart(\n  useShallow((s) => ({\n    total: s.items.reduce((a, i) => a + i.price, 0),\n    count: s.items.length,\n  }))\n);\n\n// Sans useShallow, l'objet littéral est « nouveau » à chaque appel\n// -> le composant re-rendrait à chaque changement du store.",
      },
      {
        kind: "text",
        text: "Règle : sélectionner des primitifs quand possible ; pour les objets dérivés, `useShallow` (fourni par Zustand) compare superficiellement et stabilise. Les sélecteurs coûteux se mémorisent hors composant. Et les actions se sélectionnent aussi (`useCart(s => s.add)`) : stables par nature, elles ne re-rendent pas.",
      },
    ],
  },
  {
    id: "zustand-middleware",
    title: "Zustand : middlewares",
    level: 3,
    intro:
      "Persistance, DevTools, Immer : composer les comportements du store.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "persist + devtools",
        code: "import { create } from \"zustand\";\nimport { devtools, persist } from \"zustand/middleware\";\n\ntype Prefs = { theme: \"clair\" | \"sombre\"; toggle: () => void };\n\nexport const usePrefs = create<Prefs>()(\n  devtools(\n    persist(\n      (set) => ({\n        theme: \"clair\",\n        toggle: () =>\n          set((s) => ({ theme: s.theme === \"clair\" ? \"sombre\" : \"clair\" })),\n      }),\n      { name: \"prefs\" } // clé localStorage\n    ),\n    { name: \"Prefs\" } // nom dans Redux DevTools\n  )\n);",
      },
      {
        kind: "text",
        text: "`persist` synchronise le store avec `localStorage` (rehydratation au chargement, versionnage via `version` + `migrate`) ; `devtools` expose les actions dans l'extension Redux DevTools ; le middleware `immer` autorise l'écriture « mutable » (`s.items.push(x)`) en produisant un état immutable. Les middlewares se composent dans l'ordre : `devtools(persist(...))`.",
      },
      {
        kind: "list",
        items: [
          "Ne persister que le nécessaire : `partialize` exclut les champs volatils (tokens, états de chargement).",
          "Gérer la réhydratation : l'état persisté arrive après le premier rendu — prévoir un état de chargement ou `onRehydrateStorage`.",
          "Ne jamais persister de secrets : `localStorage` est lisible par tout script de la page.",
        ],
      },
    ],
  },
  {
    id: "redux-toolkit-panorama",
    title: "Redux Toolkit : panorama",
    level: 3,
    intro:
      "Quand Zustand ne suffit plus : le standard des apps complexes.",
    blocks: [
      {
        kind: "text",
        text: "Redux Toolkit (RTK) est le Redux moderne officiel : `createSlice` (état + reducers + actions en un bloc), `createAsyncThunk` (logique asynchrone), RTK Query (état serveur intégré). Plus verbeux que Zustand, mais avec des conventions d'équipe fortes, un écosystème mature et des DevTools excellents.",
      },
      {
        kind: "fields",
        title: "Quand choisir RTK plutôt que Zustand",
        fields: [
          {
            label: "Équipe nombreuse",
            value:
              "Les conventions RTK (slices, thunks) cadrent le code là où Zustand laisse toute liberté.",
          },
          {
            label: "Logique métier complexe",
            value:
              "Machines d'état, workflows multi-étapes : les reducers explicites et le time travel aident.",
          },
          {
            label: "Écosystème",
            value:
              "RTK Query pour l'état serveur, `createEntityAdapter` pour les collections normalisées.",
          },
          {
            label: "Sinon",
            value:
              "Zustand suffit : moins de concepts, moins de code, même robustesse pour l'état client courant.",
          },
        ],
      },
    ],
  },
  {
    id: "server-vs-client-detail",
    title: "État serveur vs état client : en profondeur",
    level: 3,
    intro:
      "Deux natures, deux gestions : le découpage qui structure l'architecture.",
    blocks: [
      {
        kind: "table",
        headers: ["Aspect", "État client", "État serveur"],
        rows: [
          ["Exemples", "Formulaire, onglet actif, panier, thème", "Utilisateurs, produits, commandes"],
          ["Source de vérité", "Le navigateur", "Le serveur (le client a un cache)"],
          ["Durée de vie", "Session, parfois persisté", "Partagé, peut changer sans le client"],
          ["Gestion", "useState, contexte, Zustand", "TanStack Query / RTK Query / SWR"],
          ["Invalidation", "N/A", "Re-fetch, invalidation, websockets"],
        ],
      },
      {
        kind: "text",
        text: "Le symptôme du mélange : un `useState` rempli par un `useEffect` de fetch, avec un bouton « rafraîchir » artisanal et des données périmées après une mutation. La séparation stricte — le client ne fait que lire le cache via `useQuery` et déclencher des mutations qui invalident — élimine cette classe de bugs. L'état client restant (UI, formulaires) redevient trivial.",
      },
    ],
  },
  {
    id: "mutations-invalidations",
    title: "Mutations et invalidation",
    level: 3,
    intro:
      "Écrire côté serveur : le cycle mutation → invalidation.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Mutation avec invalidation",
        code: "import { useMutation, useQueryClient } from \"@tanstack/react-query\";\n\nfunction AddUser() {\n  const client = useQueryClient();\n  const mutation = useMutation({\n    mutationFn: (name: string) =>\n      fetch(\"/api/users\", {\n        method: \"POST\",\n        body: JSON.stringify({ name }),\n      }).then((r) => r.json()),\n    onSuccess: () => {\n      // La liste « users » est périmée : la recharger\n      client.invalidateQueries({ queryKey: [\"users\"] });\n    },\n  });\n\n  return (\n    <button\n      disabled={mutation.isPending}\n      onClick={() => mutation.mutate(\"Lea\")}\n    >\n      {mutation.isPending ? \"Ajout…\" : \"Ajouter\"}\n    </button>\n  );\n}",
      },
      {
        kind: "text",
        text: "Le cycle canonique : `useMutation` pour l'écriture (états `isPending`/`isError` intégrés), puis `invalidateQueries` pour marquer les caches affectés comme périmés — TanStack Query les recharge. Granularité : invalider `[\"users\"]` recharge la liste ; des clés plus fines (`[\"users\", id]`) limitent le re-fetch. Alternative : `setQueryData` pour mettre à jour le cache directement sans requête.",
      },
    ],
  },
  {
    id: "optimistic-updates-tq",
    title: "Mises à jour optimistes",
    level: 3,
    intro:
      "L'UI instantanée : appliquer avant la réponse serveur, avec rollback.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Optimistic update avec rollback",
        code: "const mutation = useMutation({\n  mutationFn: (todo: string) =>\n    fetch(\"/api/todos\", { method: \"POST\", body: JSON.stringify({ todo }) }),\n  onMutate: async (todo) => {\n    await client.cancelQueries({ queryKey: [\"todos\"] });\n    const previous = client.getQueryData([\"todos\"]); // snapshot\n    client.setQueryData([\"todos\"], (old: string[]) => [...old, todo]); // UI immédiate\n    return { previous }; // contexte pour le rollback\n  },\n  onError: (_e, _v, context) => {\n    client.setQueryData([\"todos\"], context?.previous); // rollback\n  },\n  onSettled: () => client.invalidateQueries({ queryKey: [\"todos\"] }),\n});",
      },
      {
        kind: "text",
        text: "Séquence : `onMutate` annule les re-fetch en cours, sauvegarde le cache, applique la valeur optimiste ; en cas d'erreur `onError` restaure le snapshot ; `onSettled` resynchronise avec le serveur dans tous les cas. À réserver aux actions réversibles et fréquentes (likes, toggles, listes) — pas aux paiements.",
      },
    ],
  },
  {
    id: "url-state",
    title: "L'URL comme état",
    level: 3,
    intro:
      "Page, filtres, onglet : l'état partageable par lien.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Filtres dans la query string",
        code: "import { useSearchParams } from \"react-router-dom\";\n\nfunction ProductList() {\n  const [params, setParams] = useSearchParams();\n  const page = Number(params.get(\"page\") ?? 1);\n  const q = params.get(\"q\") ?? \"\";\n\n  const setPage = (p: number) =>\n    setParams({ page: String(p), q }, { replace: true });\n\n  // page et q sont dans l'URL : bookmarkables, partageables,\n  // restaurés au retour arrière — sans état React.\n  return <>{/* … */}</>;\n}",
      },
      {
        kind: "text",
        text: "Règle : si l'état doit survivre au rechargement, au partage ou au bouton retour, il appartient à l'URL (paramètres de route pour la ressource, query string pour les filtres/tri/pagination). Sinon, état React. Les routeurs modernes (React Router, TanStack Router) font de l'URL une source de vérité typée.",
      },
    ],
  },
  {
    id: "immer-detail",
    title: "Immer : l'immutabilité sans la douleur",
    level: 3,
    intro:
      "Écrire « mutable », produire de l'immutable : le draft.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Mise à jour imbriquée",
        code: "import { produce } from \"immer\";\n\n// Sans Immer : spread gymnastics\nsetUser({ ...user, address: { ...user.address, city: \"Paris\" } });\n\n// Avec Immer : écriture naturelle, résultat immutable\nsetUser(produce(user, (draft) => {\n  draft.address.city = \"Paris\";\n}));\n// `draft` est un brouillon : Immer produit un nouvel objet,\n// les branches non touchées gardent leurs références (mémoïsation OK).",
      },
      {
        kind: "text",
        text: "Immer brille sur l'état imbriqué : formulaires complexes, arbres, normalisation manuelle. Intégré nativement à Redux Toolkit (`createSlice` utilise Immer) et disponible comme middleware Zustand. Coût : une dépendance et une abstraction — pour l'état plat, les spreads suffisent.",
      },
    ],
  },
  {
    id: "etat-async-machine",
    title: "Modéliser l'asynchrone : idle/loading/error",
    level: 3,
    intro:
      "Trois booléens ou une machine ? La modélisation des statuts.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Statut unique vs booléens",
        code: "// Fragile : combinaisons impossibles (loading ET error ?)\nconst [loading, setLoading] = useState(false);\nconst [error, setError] = useState<Error | null>(null);\n\n// Robuste : un seul statut, transitions explicites\ntype Status = \"idle\" | \"loading\" | \"success\" | \"error\";\nconst [status, setStatus] = useState<Status>(\"idle\");\n// status === \"loading\" : impossible d'être aussi en erreur.",
      },
      {
        kind: "text",
        text: "Un statut unique (union de littéraux) rend les états impossibles irreprésentables : pas de `loading=true` + `error` simultanés. C'est une mini machine à états — le pattern recommandé par la documentation React pour les requêtes. Pour des workflows complexes (wizard multi-étapes avec gardes), des librairies comme XState formalisent la machine complète.",
      },
    ],
  },
  {
    id: "sync-onglets",
    title: "Synchroniser entre onglets",
    level: 3,
    intro:
      "Le même état dans deux onglets : l'événement `storage`.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Écouter les changements d'onglet",
        code: "import { useEffect } from \"react\";\nimport { usePrefs } from \"./store\";\n\nfunction useCrossTabSync() {\n  useEffect(() => {\n    const onStorage = (e: StorageEvent) => {\n      if (e.key === \"prefs\") {\n        // Un autre onglet a changé les prefs : recharger\n        usePrefs.persist.rehydrate();\n      }\n    };\n    window.addEventListener(\"storage\", onStorage);\n    return () => window.removeEventListener(\"storage\", onStorage);\n  }, []);\n}",
      },
      {
        kind: "text",
        text: "`storage` se déclenche dans tous les onglets sauf celui qui a écrit : c'est le canal natif de synchronisation inter-onglets pour l'état persisté. Zustand `persist` expose `rehydrate()` pour recharger. Limite : `localStorage` ≈ 5 Mo et API synchrone — pour du temps réel, les WebSockets ou `BroadcastChannel` prennent le relais.",
      },
    ],
  },
  {
    id: "ssr-hydration-etat",
    title: "État et SSR : l'hydratation",
    level: 3,
    intro:
      "L'état initial doit coïncider entre serveur et client.",
    blocks: [
      {
        kind: "text",
        text: "En SSR (Next.js…), le serveur rend avec un état initial, puis le client « hydrate ». Si l'état initial diffère (`Math.random()`, `localStorage`, `window.innerWidth` lus pendant le rendu), l'hydratation échoue ou produit un scintillement. Règle : état initial déterministe pendant le rendu ; les valeurs navigateur se lisent dans `useEffect` (client uniquement) ou via un état « monté ».",
      },
      {
        kind: "list",
        items: [
          "`useState(() => window.innerWidth)` casse le SSR : `window` n'existe pas côté serveur.",
          "Pattern : `const [mounted, setMounted] = useState(false); useEffect(() => setMounted(true), [])` puis n'afficher la valeur navigateur que si `mounted`.",
          "TanStack Query déshydrate le cache serveur vers le client (`dehydrate`/`HydrationBoundary`) : pas de double fetch.",
        ],
      },
    ],
  },
  {
    id: "testing-state",
    title: "Tester l'état",
    level: 3,
    intro:
      "Stores et logique d'état : tests unitaires directs, sans DOM.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Tester un store Zustand",
        code: "import { useCart } from \"./cart\";\n\ntest(\"ajoute un article\", () => {\n  // Reset avant chaque test\n  useCart.setState({ items: [] });\n  useCart.getState().add(\"livre\");\n  expect(useCart.getState().items).toEqual([\"livre\"]);\n});\n\ntest(\"ne mute pas\", () => {\n  useCart.setState({ items: [] });\n  const before = useCart.getState().items;\n  useCart.getState().add(\"livre\");\n  expect(useCart.getState().items).not.toBe(before); // nouvelle référence\n});",
      },
      {
        kind: "text",
        text: "Les stores externes se testent sans rendu : `getState()`/`setState()` manipulent directement le store. Tester : les transitions, l'immutabilité (nouvelles références), les sélecteurs, la persistance (mock de `localStorage`). Les réducteurs (`useReducer`, slices RTK) sont des fonctions pures : les cas limites s'y testent exhaustivement.",
      },
    ],
  },
  {
    id: "typescript-state",
    title: "Typer l'état strictement",
    level: 3,
    intro:
      "Le typage comme garde-fou : unions discriminées et inférence.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Store typé avec statuts",
        code: "type Remote<T> =\n  | { status: \"idle\" }\n  | { status: \"loading\" }\n  | { status: \"success\"; data: T }\n  | { status: \"error\"; error: Error };\n\ntype Store = {\n  users: Remote<User[]>;\n  setUsers: (r: Remote<User[]>) => void;\n};\n\n// Usage : le switch est exhaustif, TypeScript vérifie\nswitch (users.status) {\n  case \"success\":\n    return <List data={users.data} />; // data existe ici, garanti\n  case \"error\":\n    return <p>{users.error.message}</p>;\n  // …\n}",
      },
      {
        kind: "text",
        text: "L'union discriminée sur `status` rend les accès conditionnels sûrs : `data` n'existe que dans la branche `success`, vérifié par le compilateur. Éviter les états « à moitié typés » (`data: any`, `error: string | null` mélangé à `loading: boolean`) : chaque incohérence de type est un bug d'état en attente.",
      },
    ],
  },
  {
    id: "performance-etat",
    title: "Performance : l'état et les re-rendus",
    level: 3,
    intro:
      "Mesurer l'impact réel de l'état sur les rendus.",
    blocks: [
      {
        kind: "fields",
        title: "Leviers",
        fields: [
          {
            label: "Descendre l'état",
            value:
              "Le levier n°1 : un état utilisé par une feuille ne doit pas vivre à la racine. Chaque niveau remonté multiplie les re-rendus.",
          },
          {
            label: "Sélecteurs fins",
            value:
              "Zustand : sélectionner le minimum (`s.items.length`, pas `s.items`). Le composant ne re-rend que si sa tranche change.",
          },
          {
            label: "Découper les contextes",
            value:
              "Valeur / actions séparées ; un contexte par domaine. Un méga-contexte « App » est un goulot de re-rendus.",
          },
          {
            label: "Normaliser les collections",
            value:
              "Stocker par id (`Record<id, item>`) plutôt qu'en tableaux imbriqués : mise à jour ciblée, pas de re-rendu en cascade.",
          },
          {
            label: "Profiler avant d'optimiser",
            value:
              "React DevTools Profiler : la plupart des « problèmes de perfs d'état » présumés n'en sont pas.",
          },
        ],
      },
    ],
  },
  {
    id: "devtools-avances",
    title: "DevTools : aller plus loin",
    level: 3,
    intro:
      "Time travel et inspection : déboguer l'état comme un pro.",
    blocks: [
      {
        kind: "list",
        items: [
          "Redux DevTools + middleware `devtools` (Zustand) ou RTK : historique des actions, saut temporel, diff d'état.",
          "Nommer les actions : `set(..., \"cart/add\")` — l'historique devient lisible au lieu d'une suite de « anonymous ».",
          "TanStack Query Devtools : états des requêtes, observateurs, bouton « refetch » manuel pour reproduire.",
          "React DevTools Profiler : corréler un changement d'état avec les composants re-rendus — le chaînon manquant des bugs de perfs.",
        ],
      },
    ],
  },
  {
    id: "migration-contexte-zustand",
    title: "Migrer du contexte vers Zustand",
    level: 3,
    intro:
      "Le refactoring typique : quand le contexte montre ses limites.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Identifier le symptôme",
            detail:
              "Profiler : un contexte qui change souvent re-rend des dizaines de composants qui n'en utilisent qu'une partie.",
          },
          {
            title: "Créer le store miroir",
            detail:
              "Transposer état + setters en `create()` Zustand, avec les mêmes noms pour limiter le diff.",
          },
          {
            title: "Remplacer les consommateurs un par un",
            detail:
              "`useContext(X)` → `useStore(s => s.tranche)` : chaque composant ne s'abonne qu'à sa tranche.",
          },
          {
            title: "Supprimer le Provider",
            detail:
              "Quand plus aucun consommateur n'utilise le contexte, retirer le Provider — l'arbre s'allège.",
          },
          {
            title: "Mesurer",
            detail:
              "Re-profiler : vérifier que les re-rendus ont chuté. Sinon, affiner les sélecteurs.",
          },
        ],
      },
    ],
  },
  {
    id: "anti-patterns-state",
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
            label: "Le méga-store",
            value:
              "Un seul store pour toute l'app : toute mise à jour touche potentiellement tout. Découper par domaine (panier, session, UI).",
          },
          {
            label: "Miroir du serveur en local",
            value:
              "`useState` + `useEffect` qui copient le cache TanStack Query : divergence garantie. Lire le cache directement.",
          },
          {
            label: "Props drilling « résolu » par le global",
            value:
              "Mettre en global ce que deux composants voisins partagent : le lifting state suffisait.",
          },
          {
            label: "État dans le DOM",
            value:
              "Lire `input.value` via ref au lieu d'un état contrôlé : l'état devient invisible aux DevTools et aux tests.",
          },
          {
            label: "Clés de cache artisanales",
            value:
              "Concaténer des strings pour les `queryKey` : collisions. Utiliser des tableaux structurés `[\"users\", id]`.",
          },
          {
            label: "Persister sans versionner",
            value:
              "Changer la forme du store sans `version`/`migrate` : les anciens `localStorage` plantent l'app au chargement.",
          },
        ],
      },
    ],
  },
  {
    id: "checklist-state",
    title: "Checklist de revue",
    level: 3,
    intro:
      "Avant de merger : les questions à se poser sur chaque état.",
    blocks: [
      {
        kind: "list",
        items: [
          "Chaque donnée vit-elle à la couche la plus basse possible ? (arbre de décision)",
          "Une seule source de vérité par donnée — aucune duplication ?",
          "Rien de dérivé n'est stocké (totaux, filtrés, validités) ?",
          "Les mises à jour sont-elles immutables (nouvelles références) ?",
          "Les sélecteurs sont-ils fins (pas d'abonnement au store entier) ?",
          "L'état serveur passe-t-il par TanStack Query (pas de fetch manuel) ?",
          "Les contextes sont-ils découpés (valeur/actions, par domaine) ?",
          "Types stricts : pas de `any`, statuts en unions discriminées ?",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "État maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "`react-hooks` : les fondations — `useReducer`, `useContext`, `useSyncExternalStore` en détail.",
          "`react-forms` : les formulaires sont le cas d'école de l'état local complexe (validation, champs dynamiques).",
          "`react` : le modèle de rendu — comprendre ce que l'état déclenche exactement.",
          "RTK Query / tRPC : l'état serveur typé de bout en bout, au-delà de TanStack Query.",
          "Revenir à la roadmap : valider la gestion d'état et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
  {
    id: "ressources-avancees",
    title: "Ressources avancées",
    level: 3,
    intro:
      "Aller plus loin, en commençant toujours par les documentations officielles.",
    blocks: [
      {
        kind: "fields",
        title: "Documentations officielles (à privilégier)",
        fields: [
          {
            label: "react.dev/learn/managing-state",
            value: "Le guide officiel complet : le socle conceptuel.",
          },
          {
            label: "zustand.docs.pmnd.rs/guides",
            value: "Guides Zustand : pratiques, TypeScript, middlewares.",
          },
          {
            label: "tanstack.com/query/latest/docs",
            value: "Guides TanStack Query : requêtes, mutations, SSR.",
          },
          {
            label: "redux-toolkit.js.org",
            value: "Documentation Redux Toolkit, pour les apps où Zustand ne suffit plus.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les trois projets progressifs de cette page, dans l'ordre.",
          "Réflexe durable : l'arbre de décision « Où mettre cet état ? » devant chaque nouvelle donnée.",
        ],
      },
    ],
  },
  {
    id: "normalisation-collections",
    title: "Normaliser les collections",
    level: 3,
    intro:
      "Stocker par identifiant : la forme qui rend les mises à jour ciblées.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Dictionnaire par id",
        code: "// Tableau : mise à jour en O(n), re-création du tableau\ntype State1 = { users: User[] };\nsetUsers(users.map((u) => (u.id === id ? { ...u, name } : u)));\n\n// Normalisé : accès direct, mise à jour ciblée\ntype State2 = { users: Record<string, User>; ids: string[] };\nsetState((s) => ({\n  users: { ...s.users, [id]: { ...s.users[id], name } },\n}));\n// Seul l'utilisateur modifié change de référence :\n// les composants des autres ne re-rendent pas.",
      },
      {
        kind: "text",
        text: "La normalisation (un dictionnaire `byId` + une liste d'ids pour l'ordre) est le standard des stores avec collections : Redux Toolkit fournit `createEntityAdapter` qui l'implémente (CRUD, tri, sélecteurs). À adopter dès qu'une collection se met à jour élément par élément.",
      },
    ],
  },
  {
    id: "reselect-memoisation",
    title: "Sélecteurs mémorisés (Reselect)",
    level: 3,
    intro:
      "Dériver sans recalculer : la mémorisation des sélecteurs.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "createSelector",
        code: "import { createSelector } from \"reselect\";\n\nconst selectItems = (s: Store) => s.items;\n\n// Recalculé uniquement si `items` change de référence\nconst selectTotal = createSelector([selectItems], (items) =>\n  items.reduce((n, i) => n + i.price, 0)\n);\n\n// Dans le composant : valeur stable entre les rendus\nconst total = useCart(selectTotal);",
      },
      {
        kind: "text",
        text: "Reselect (inclus dans Redux Toolkit, utilisable partout) mémorise le résultat d'un sélecteur : tant que les entrées ne changent pas de référence, il retourne la valeur précédente — stable, donc sans re-rendu. Indispensable quand une dérivation coûteuse alimente un composant mémorisé.",
      },
    ],
  },
  {
    id: "xstate-panorama",
    title: "Machines à états (XState) : panorama",
    level: 3,
    intro:
      "Quand les booléens ne suffisent plus : l'état comme machine formelle.",
    blocks: [
      {
        kind: "text",
        text: "XState modélise l'état comme une machine : états nommés, événements, transitions autorisées, gardes. Un lecteur vidéo (`idle → loading → playing ⇄ paused → ended`), un wizard avec retours conditionnels : les transitions impossibles deviennent inexprimables au lieu d'être des bugs.",
      },
      {
        kind: "list",
        items: [
          "Bénéfice : visualisation du graphe d'états, tests exhaustifs des transitions, logique indépendante de l'UI.",
          "Coût : formalisme et courbe d'apprentissage — surdimensionné pour un toggle ou un formulaire simple.",
          "S'intègre à React via `@xstate/react` (`useMachine`) ; cohabite avec Zustand/TanStack Query par domaine.",
        ],
      },
    ],
  },
];

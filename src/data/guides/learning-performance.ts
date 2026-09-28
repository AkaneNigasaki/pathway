import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Performance web : mesurer, comprendre puis
 * optimiser le chargement, l'interactivité et la fluidité d'une application.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_PERFORMANCE: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce que mesure la performance web et pourquoi c'est une fonctionnalité à part entière.",
    blocks: [
      {
        kind: "text",
        text: "La performance web mesure la rapidité ressentie d'une application : temps de chargement, réactivité aux interactions, fluidité visuelle. Ce n'est pas un ressenti subjectif : les Core Web Vitals (LCP, INP, CLS) en sont la mesure standard, utilisée aussi par les moteurs de recherche pour le classement.",
      },
      {
        kind: "fields",
        title: "Les trois Core Web Vitals",
        fields: [
          {
            label: "LCP (Largest Contentful Paint)",
            value:
              "Le temps d'affichage du plus grand élément visible : mesure la vitesse de chargement perçue. Objectif : 2,5 secondes ou moins.",
          },
          {
            label: "INP (Interaction to Next Paint)",
            value:
              "Le délai entre une interaction (clic, frappe) et la mise à jour visuelle : mesure la réactivité. Objectif : 200 millisecondes ou moins.",
          },
          {
            label: "CLS (Cumulative Layout Shift)",
            value:
              "L'instabilité visuelle : les éléments qui bougent pendant le chargement. Objectif : un score de 0,1 ou moins.",
          },
        ],
      },
      {
        kind: "text",
        text: "Chaque seconde de chargement en plus fait chuter la conversion et le référencement. La performance se traite comme une fonctionnalité : avec des objectifs chiffrés, des mesures régulières et des budgets — jamais à l'intuition.",
      },
    ],
  },
  {
    id: "mesurer-avant-optimiser",
    title: "Mesurer avant d'optimiser",
    level: 1,
    intro:
      "La règle d'or : on n'optimise que ce que l'on a mesuré, sinon on optimise au hasard.",
    blocks: [
      {
        kind: "text",
        text: "L'optimisation prématurée est la principale source de complexité inutile : mémoïsation partout, abstractions de cache, micro-optimisations — pour un gain nul sur les métriques réelles. Le workflow professionnel est toujours le même : mesurer, identifier le goulot, corriger, re-mesurer.",
      },
      {
        kind: "diagram",
        title: "La boucle d'optimisation",
        lines: [
          "MESURER (Lighthouse, DevTools)",
          "     │",
          "     ▼",
          "IDENTIFIER le goulot (une cause, pas dix)",
          "     │",
          "     ▼",
          "CORRIGER (un seul changement à la fois)",
          "     │",
          "     ▼",
          "RE-MESURER (le gain est-il réel ?)",
          "     │",
          "     └── non ──▶ revenir à IDENTIFIER",
          "     └── oui ──▶ documenter, passer au goulot suivant",
        ],
      },
      {
        kind: "list",
        items: [
          "Un seul changement à la fois : sinon impossible de savoir ce qui a aidé.",
          "Mesurer sur du matériel représentatif : votre MacBook Pro n'est pas le téléphone d'entrée de gamme de vos utilisateurs.",
          "Tester en conditions réseau limitées : le DevTools simule la 4G lente et le CPU bridé.",
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
      "On n'optimise efficacement que ce que l'on comprend : le rendu d'abord, les outils ensuite.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut maîtriser avant",
        fields: [
          {
            label: "React",
            value:
              "Comprendre le rendu et les re-renders : qu'est-ce qui déclenche un rendu, que coûte-t-il. Sans ça, la mémoïsation est de la magie noire.",
          },
          {
            label: "Next.js",
            value:
              "Code splitting, optimisation d'images, SSR : le framework offre les leviers, encore faut-il savoir quand les activer.",
          },
          {
            label: "Réseau (bases)",
            value:
              "Requêtes HTTP, cache du navigateur, compression : la moitié des problèmes de performance sont des problèmes réseau, pas du JavaScript.",
          },
        ],
      },
    ],
  },
  {
    id: "installer-lighthouse",
    title: "Installer Lighthouse",
    level: 2,
    intro:
      "Lighthouse est l'audit de référence : il mesure les Core Web Vitals et liste les opportunités, avec des gains estimés.",
    blocks: [
      {
        kind: "command",
        label: "Installer Lighthouse en dépendance de développement",
        command: "npm install --save-dev lighthouse",
        why: "La CLI Lighthouse audite une page et produit un rapport noté sur 100, avec les métriques (LCP, INP, CLS) et des recommandations priorisées. En dépendance de développement : c'est un outil de mesure, pas du code livré.",
        verify: "npx lighthouse --version",
      },
      {
        kind: "command",
        label: "Auditer une page en local",
        command: "npx lighthouse http://localhost:3000 --only-categories=performance --output=json --output-path=./rapport.json",
        why: "`--only-categories=performance` ne garde que l'audit performance (plus rapide) ; `--output=json` produit un rapport exploitable par script. Lancez-le sur votre page la plus visitée : c'est elle qui définit l'expérience de la majorité.",
        verify: "ls -la rapport.json",
      },
      {
        kind: "text",
        text: "Lighthouse s'utilise aussi depuis le DevTools (onglet Lighthouse) pour un audit rapide sans CLI. Les deux mesurent en conditions simulées (CPU bridé, réseau ralenti) : ce sont des mesures de laboratoire, à compléter par des mesures terrain (voir la section web-vitals).",
      },
    ],
  },
  {
    id: "lire-un-rapport",
    title: "Lire un rapport Lighthouse",
    level: 2,
    intro:
      "Un rapport Lighthouse se lit de haut en bas : métriques, opportunités, diagnostics.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Regarder le score et les métriques",
            detail:
              "Le score /100 est un résumé ; les métriques (LCP, INP, CLS, Speed Index) sont le vrai diagnostic. Un score de 95 avec un LCP à 4 s reste un problème.",
          },
          {
            title: "Trier les opportunités par gain estimé",
            detail:
              "Chaque opportunité affiche un gain potentiel en secondes : attaquez la plus grosse en premier. « Properly size images » à 2,1 s économisées bat toujours « Minify CSS » à 0,1 s.",
          },
          {
            title: "Distinguer opportunité et diagnostic",
            detail:
              "Les opportunités chiffrent un gain ; les diagnostics informent (nombre de requêtes, taille du DOM). Un diagnostic n'est pas forcément un problème.",
          },
          {
            title: "Vérifier la capture d'écran du chargement",
            detail:
              "La pellicule montre ce que voit l'utilisateur seconde par seconde : un écran blanc de 3 s est plus parlant qu'un LCP abstrait.",
          },
        ],
      },
    ],
  },
  {
    id: "devtools-performance",
    title: "L'onglet Performance du DevTools",
    level: 2,
    intro:
      "Quand Lighthouse dit « quoi », l'onglet Performance dit « pourquoi » : l'enregistrement image par image de l'exécution.",
    blocks: [
      {
        kind: "list",
        items: [
          "Enregistrez 5 à 10 secondes d'interaction (chargement, clic, scroll) avec le CPU bridé ×4 : c'est le mode « téléphone d'entrée de gamme ».",
          "Repérez les longues tâches (barres rouges > 50 ms) : elles bloquent l'interactivité et dégradent l'INP.",
          "La piste « Main » montre l'exécution JavaScript ; « Network » les requêtes ; « Rendering » les recalculs de style et les layouts.",
          "Cliquez sur une longue tâche pour voir sa stack : la fonction coupable s'affiche avec son fichier et sa ligne.",
        ],
      },
      {
        kind: "text",
        text: "L'onglet Performance demande de la pratique : commencez par comparer avant/après une optimisation. La différence visuelle (moins de rouge, barres plus courtes) valide le gain mieux que n'importe quel discours.",
      },
    ],
  },
  {
    id: "profiler-react",
    title: "Profiler React",
    level: 2,
    intro:
      "Le Profiler de React DevTools mesure ce que coûte chaque composant : qui se re-rend, combien de fois, combien de temps.",
    blocks: [
      {
        kind: "list",
        items: [
          "Installez l'extension React Developer Tools, ouvrez l'onglet Profiler, lancez un enregistrement pendant l'interaction lente.",
          "Le flamegraph colore les composants par coût : jaune = cher. Un composant qui se re-rend sans que ses props changent est le suspect n°1.",
          "L'option « Highlight updates » fait clignoter les composants à chaque rendu : visuel et immédiat pour repérer les rendus parasites.",
          "Profilez en mode production quand c'est possible : le mode développement est significativement plus lent et fausse les mesures.",
        ],
      },
    ],
  },
  {
    id: "editeurs-config",
    title: "Éditeurs et configuration",
    level: 2,
    intro:
      "Peu de configuration spécifique : la performance se joue dans le build et la mesure.",
    blocks: [
      {
        kind: "fields",
        title: "Réglages utiles",
        fields: [
          {
            label: "Source maps en développement",
            value:
              "Pour que le Profiler et l'onglet Performance pointent vers vos vrais fichiers TypeScript, pas vers le bundle.",
          },
          {
            label: "Build de production pour mesurer",
            value:
              "Ne mesurez jamais sur le serveur de dev : `npm run build && npm run start` (ou l'équivalent) avant tout audit sérieux.",
          },
          {
            label: "Analyseur de bundle",
            value:
              "`rollup-plugin-visualizer` génère une treemap du bundle : voir les 800 Ko, c'est déjà commencer à les réduire.",
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
      "La performance durable repose sur des budgets, pas sur des héros qui optimisent la veille de la release.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définir des budgets",
            detail:
              "Exemples : LCP < 2,5 s sur la page d'accueil, bundle initial < 200 Ko, aucune image > 300 Ko. Des nombres écrits, validés par l'équipe produit.",
          },
          {
            title: "Mesurer en CI",
            detail:
              "Lighthouse CI tourne sur chaque PR et échoue si un budget est dépassé : la régression de performance devient aussi visible qu'un test cassé.",
          },
          {
            title: "Mesurer sur le terrain",
            detail:
              "La bibliothèque `web-vitals` envoie les métriques réelles des utilisateurs vers votre analytics : le labo ne remplace jamais le réel.",
          },
          {
            title: "Revoir régulièrement",
            detail:
              "Un point trimestriel sur les métriques terrain : les régressions lentes (50 ms par mois) sont invisibles au quotidien mais fatales à un an.",
          },
        ],
      },
    ],
  },
  {
    id: "web-vitals-terrain",
    title: "Mesurer sur le terrain (web-vitals)",
    level: 2,
    intro:
      "Les mesures de laboratoire ne remplacent pas l'expérience réelle des utilisateurs : la bibliothèque `web-vitals` la capture.",
    blocks: [
      {
        kind: "command",
        label: "Installer web-vitals",
        command: "npm install web-vitals",
        why: "Bibliothèque officielle de Google qui mesure les Core Web Vitals dans le navigateur réel de l'utilisateur (LCP, INP, CLS). Quelques Ko, aucune dépendance, conçue pour envoyer les métriques vers votre outil d'analytics.",
        verify: "npm ls web-vitals",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Envoyer les métriques vers votre analytics",
        code: "import { onLCP, onINP, onCLS } from 'web-vitals';\n\nfunction sendToAnalytics(metric) {\n  // metric.name : 'LCP' | 'INP' | 'CLS', metric.value : la valeur\n  navigator.sendBeacon('/analytics', JSON.stringify(metric));\n}\n\nonLCP(sendToAnalytics);\nonINP(sendToAnalytics);\nonCLS(sendToAnalytics);",
      },
      {
        kind: "text",
        text: "En pratique : segmentez par page, par appareil et par pays. Un LCP médian à 1,8 s peut cacher un 90e percentile à 6 s sur mobile — et c'est le percentile élevé que vos utilisateurs retiennent.",
      },
    ],
  },
  {
    id: "images-premiers-gains",
    title: "Images : les premiers gains",
    level: 2,
    intro:
      "Les images sont le premier goulot dans la majorité des audits : c'est aussi le plus facile à corriger.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Image optimisée avec Next.js",
        code: "import Image from 'next/image';\n\n// L'image hero : prioritaire, dimensions déclarées (pas de CLS)\n<Image src=\"/hero.jpg\" alt=\"Présentation du produit\" width={1200} height={630} priority />\n\n// Les images sous la ligne de flottaison : chargement différé\n<Image src=\"/galerie-1.jpg\" alt=\"Exemple\" width={800} height={600} loading=\"lazy\" />",
      },
      {
        kind: "list",
        items: [
          "Toujours déclarer `width` et `height` : le navigateur réserve l'espace avant le chargement, zéro décalage de mise en page (CLS).",
          "`priority` uniquement sur l'image hero : elle précharge l'image LCP au lieu d'attendre.",
          "`loading=\"lazy\"` sur tout le reste : les images hors écran ne se chargent qu'au scroll.",
          "Formats modernes (AVIF, WebP) : 30 à 50 % plus légers que JPEG à qualité égale — `next/image` les sert automatiquement.",
        ],
      },
    ],
  },
  {
    id: "fonts",
    title: "Polices : éviter le texte invisible",
    level: 2,
    intro:
      "Une police qui bloque l'affichage du texte dégrade le LCP : le texte doit s'afficher immédiatement.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "font-display: swap",
        code: "@font-face {\n  font-family: 'Inter';\n  src: url('/fonts/inter.woff2') format('woff2');\n  font-display: swap;\n}",
      },
      {
        kind: "list",
        items: [
          "`font-display: swap` : le texte s'affiche aussitôt avec une police système, puis bascule quand la police arrive. Jamais de texte invisible.",
          "Préchargez la police principale : `<link rel=\"preload\" href=\"/fonts/inter.woff2\" as=\"font\" type=\"font/woff2\" crossorigin>`.",
          "Limitez les variantes (graisses, italiques) : chaque fichier est une requête et des Ko. Deux graisses suffisent souvent.",
          "`size-adjust` dans `@font-face` réduit le décalage visuel au basculement entre police système et police web.",
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro:
      "Trois projets pour pratiquer la mesure puis l'optimisation, dans cet ordre.",
    blocks: [
      {
        kind: "fields",
        title: "Par niveau",
        fields: [
          {
            label: "Débutant — Audit d'un site existant",
            value:
              "Auditez trois pages avec Lighthouse, notez les métriques, corrigez la plus grosse opportunité (souvent une image), re-mesurez et documentez le gain.",
          },
          {
            label: "Intermédiaire — Budgets en CI",
            value:
              "Ajoutez Lighthouse CI à un projet avec deux budgets (LCP, taille du bundle). Faites passer une PR qui les dépasse, observez l'échec, corrigez.",
          },
          {
            label: "Avancé — Optimisation complète",
            value:
              "Prenez une page lente (LCP > 4 s) : profilez, appliquez code splitting + images optimisées + préchargement, visez LCP < 2,5 s avec preuves avant/après.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "core-web-vitals",
    title: "Core Web Vitals en détail",
    level: 3,
    intro: "Les seuils officiels et ce que chaque métrique révèle du problème.",
    blocks: [
      {
        kind: "table",
        headers: ["Métrique", "Bon", "À améliorer", "Mauvais"],
        rows: [
          ["LCP", "≤ 2,5 s", "2,5 – 4 s", "> 4 s"],
          ["INP", "≤ 200 ms", "200 – 500 ms", "> 500 ms"],
          ["CLS", "≤ 0,1", "0,1 – 0,25", "> 0,25"],
        ],
      },
      {
        kind: "text",
        text: "Ces seuils s'évaluent au 75e percentile des utilisateurs réels : trois quarts de vos visiteurs doivent être sous le seuil « bon ». Une métrique se dégrade rarement seule : un LCP élevé vient du réseau ou du rendu, un INP élevé du JavaScript qui bloque, un CLS élevé du manque de dimensions réservées.",
      },
    ],
  },
  {
    id: "lcp-optimisation",
    title: "Optimiser le LCP",
    level: 3,
    intro: "Le LCP se joue en quatre temps : serveur, réseau, rendu, ressource.",
    blocks: [
      {
        kind: "fields",
        title: "Les quatre sous-parties du LCP",
        fields: [
          {
            label: "TTFB (serveur)",
            value:
              "Le temps de réponse du serveur. Optimisez le backend, mettez en cache les pages, rapprochez le serveur (CDN, edge).",
          },
          {
            label: "Délai de chargement de la ressource",
            value:
              "Le temps pour télécharger l'image LCP : préchargez-la (`fetchpriority=\"high\"`), compressez-la, servez-la depuis un CDN.",
          },
          {
            label: "Délai de rendu",
            value:
              "Le temps entre la réception et l'affichage : réduisez le JavaScript qui bloque le rendu, différez l'hydratation non critique.",
          },
          {
            label: "Découverte tardive",
            value:
              "L'image LCP découverte trop tard (CSS background, JS injecté) : rendez-la découvrable tôt dans le HTML, jamais en arrière-plan CSS.",
          },
        ],
      },
      {
        kind: "text",
        text: "Identifiez votre élément LCP dans le rapport Lighthouse (« Largest Contentful Paint element »), puis attaquez sa sous-partie dominante. Optimiser le serveur quand le problème est une image de 4 Mo ne sert à rien.",
      },
    ],
  },
  {
    id: "inp-optimisation",
    title: "Optimiser l'INP",
    level: 3,
    intro: "L'INP mesure la pire interaction : une seule interaction lente suffit à le dégrader.",
    blocks: [
      {
        kind: "text",
        text: "L'INP observe toutes les interactions de la visite et retient la plus lente (approximativement). Les coupables habituels : un gestionnaire de clic qui fait trop de travail synchrone, un rendu React massif déclenché par une frappe, un script tiers qui s'exécute au mauvais moment.",
      },
      {
        kind: "list",
        items: [
          "Découpez le travail : `setTimeout` ou `requestIdleCallback` pour le non urgent, afin de rendre la main au thread principal.",
          "Évitez les rendus synchrones massifs : virtualisez les longues listes, paginez, différez.",
          "Retardez les scripts tiers (analytics, chat) : ils ne doivent jamais bloquer une interaction utilisateur.",
          "Testez sur appareil réel lent : l'INP se dégrade d'abord sur les téléphones d'entrée de gamme.",
        ],
      },
    ],
  },
  {
    id: "cls-stabilite",
    title: "Éliminer les décalages (CLS)",
    level: 3,
    intro: "Le CLS vient du contenu qui arrive sans espace réservé : chaque décalage est évitable.",
    blocks: [
      {
        kind: "list",
        items: [
          "Dimensions sur chaque image et vidéo (`width`/`height` ou ratio CSS) : le navigateur réserve l'espace avant le chargement.",
          "Ne jamais insérer de contenu au-dessus du contenu existant : bannières, pubs, notifications s'ajoutent en bas ou en surimpression.",
          "Réserver l'espace des emplacements publicitaires : un slot vide qui se remplit décale toute la page.",
          "Polices : `font-display: swap` avec `size-adjust` pour limiter le décalage au basculement.",
          "Animations : n'animez que `transform` et `opacity` — elles ne déclenchent pas de recalcul de mise en page.",
        ],
      },
    ],
  },
  {
    id: "images-avancees",
    title: "Images avancées : srcset et formats",
    level: 3,
    intro: "Servir à chaque écran l'image qu'il mérite : ni plus lourde, ni plus floue.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "srcset : le navigateur choisit",
        code: "<img\n  src=\"/photo-800.jpg\"\n  srcset=\"/photo-400.jpg 400w, /photo-800.jpg 800w, /photo-1600.jpg 1600w\"\n  sizes=\"(max-width: 600px) 400px, 800px\"\n  alt=\"Description\"\n  width=\"800\" height=\"600\"\n  loading=\"lazy\">",
      },
      {
        kind: "text",
        text: "`srcset` propose plusieurs largeurs, `sizes` indique la taille d'affichage : le navigateur télécharge la plus adaptée, jamais plus. Formats : AVIF puis WebP en premier, JPEG en repli. Les frameworks (`next/image`, `nuxt/image`) automatisent tout cela : ne le faites à la main que hors framework.",
      },
    ],
  },
  {
    id: "code-splitting",
    title: "Code splitting",
    level: 3,
    intro: "Ne charger que le JavaScript nécessaire à l'écran affiché : le levier n°1 sur le bundle.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Découpage par route avec React.lazy",
        code: "import { lazy, Suspense } from 'react';\n\nconst Admin = lazy(() => import('./pages/Admin'));\nconst Settings = lazy(() => import('./pages/Settings'));\n\n<Suspense fallback={<Spinner />}>\n  <Routes>\n    <Route path=\"/admin\" element={<Admin />} />\n    <Route path=\"/settings\" element={<Settings />} />\n  </Routes>\n</Suspense>",
      },
      {
        kind: "list",
        items: [
          "Par route d'abord : le découpage le plus rentable, un chunk par page.",
          "Par composant lourd ensuite : éditeur riche, graphiques, visionneuse PDF — chargés à l'ouverture, pas au démarrage.",
          "Le `fallback` du Suspense doit être instantané (skeleton léger), sinon le gain se perd en écran vide.",
          "Vérifiez le résultat : l'analyseur de bundle doit montrer des chunks séparés, et l'onglet Network un chargement différé.",
        ],
      },
    ],
  },
  {
    id: "tree-shaking",
    title: "Tree shaking",
    level: 3,
    intro: "Éliminer le code mort du bundle : le bundler secoue l'arbre, le code inutilisé tombe.",
    blocks: [
      {
        kind: "list",
        items: [
          "Imports nommés, jamais de namespace entier : `import { debounce } from 'lodash-es'` plutôt que `import _ from 'lodash'`.",
          "Côté bibliothèque : publiez en modules ES (`\"sideEffects\": false` dans package.json) pour être secouable.",
          "`import type` pour les types : effacé à la compilation, il ne peut pas traîner de code dans le bundle.",
          "Méfiez-vous des barrel files géants : `import { x } from './index'` peut embarquer tout l'index si le tree shaking échoue.",
        ],
      },
      {
        kind: "text",
        text: "Le tree shaking ne fonctionne que sur du code à effets de bord prévisibles (modules ES statiques). Un `require` dynamique ou un polyfill global y échappe : vérifiez toujours le bundle final, pas les intentions.",
      },
    ],
  },
  {
    id: "memoisation",
    title: "Mémoïsation React",
    level: 3,
    intro: "useMemo et useCallback évitent de recalculer — mais seulement quand la mesure le justifie.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Mémoïsation ciblée",
        code: "import { memo, useMemo, useCallback } from 'react';\n\n// Composant cher : ne se re-rend que si ses props changent\nconst Row = memo(function Row({ item, onSelect }) {\n  return <div onClick={() => onSelect(item.id)}>{item.name}</div>;\n});\n\nfunction List({ items }) {\n  // Callback stable : ne casse pas la mémoïsation des enfants\n  const handleSelect = useCallback((id) => selectItem(id), []);\n  // Calcul coûteux : refait uniquement quand items change\n  const sorted = useMemo(() => sortItems(items), [items]);\n  return sorted.map((item) => <Row key={item.id} item={item} onSelect={handleSelect} />);\n}",
      },
      {
        kind: "text",
        text: "La mémoïsation a un coût (comparaisons, mémoire) : appliquée partout, elle ralentit. Le Profiler React décide : ne mémoïsez qu'un composant prouvé coûteux, puis re-mesurez. `memo` sans props stables ne sert à rien — d'où `useCallback` sur les handlers.",
      },
    ],
  },
  {
    id: "virtualisation",
    title: "Virtualisation des listes",
    level: 3,
    intro: "Afficher 10 000 lignes sans créer 10 000 nœuds DOM : ne rendre que le visible.",
    blocks: [
      {
        kind: "text",
        text: "Une liste de mille éléments crée mille nœuds DOM, mille écouteurs potentiels, un layout interminable. La virtualisation ne rend que les lignes visibles (+ une marge), et recycle les nœuds au scroll. Le DOM reste à quelques dizaines d'éléments quelle que soit la taille des données.",
      },
      {
        kind: "list",
        items: [
          "Bibliothèques éprouvées : `react-window` ou `virtua` — ne réimplémentez pas, les cas limites (hauteurs variables, scroll horizontal) sont piégeux.",
          "Hauteurs fixes quand possible : le calcul est simple et rapide ; les hauteurs variables coûtent une mesure par ligne.",
          "Alternative simple : la pagination. La virtualisation n'est justifiée que pour le scroll continu sur de gros volumes.",
        ],
      },
    ],
  },
  {
    id: "debounce-throttle",
    title: "Debounce et throttle",
    level: 3,
    intro: "Limiter la fréquence des traitements coûteux déclenchés par l'utilisateur.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Debounce pour la recherche",
        code: "import { useState, useEffect } from 'react';\n\nfunction useDebouncedValue(value: string, delay = 300) {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const t = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(t);\n  }, [value, delay]);\n  return debounced;\n}\n\n// La requête API part 300 ms après la dernière frappe, pas à chaque touche.",
      },
      {
        kind: "fields",
        title: "Debounce vs throttle",
        fields: [
          {
            label: "Debounce",
            value:
              "Attend la fin de l'activité : idéal pour la recherche (une requête après la frappe) et le redimensionnement.",
          },
          {
            label: "Throttle",
            value:
              "Limite à une exécution par intervalle : idéal pour le scroll (mettre à jour un indicateur) et les événements haute fréquence.",
          },
        ],
      },
    ],
  },
  {
    id: "preloading",
    title: "Préchargement des ressources",
    level: 3,
    intro: "Dire au navigateur ce qui arrive : il peut charger en avance au lieu d'attendre.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Les trois hints de chargement",
        code: "<!-- La ressource critique de cette page : chargez-la tout de suite -->\n<link rel=\"preload\" href=\"/fonts/inter.woff2\" as=\"font\" type=\"font/woff2\" crossorigin>\n\n<!-- La prochaine page probable : chargez-la quand le réseau est libre -->\n<link rel=\"prefetch\" href=\"/checkout.js\">\n\n<!-- Le domaine tiers : connectez-vous en avance -->\n<link rel=\"preconnect\" href=\"https://api.example.com\">",
      },
      {
        kind: "list",
        items: [
          "`preload` : pour la ressource LCP (image hero, police). Sur-utilisé, il vole la bande passante aux vraies priorités.",
          "`prefetch` : pour la prochaine navigation probable (page de paiement après le panier). Priorité basse, sans risque.",
          "`preconnect` : pour les domaines tiers (API, CDN) — économise la poignée de main TLS/DNS.",
          "`fetchpriority=\"high\"` sur l'image LCP : le signal explicite quand le preload ne suffit pas.",
        ],
      },
    ],
  },
  {
    id: "cache-navigateur",
    title: "Cache HTTP du navigateur",
    level: 3,
    intro: "La requête la plus rapide est celle qu'on ne fait pas : le cache HTTP bien réglé.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Politique de cache par type de ressource",
        code: "# Assets versionnés (hash dans le nom) : cache long, immuables\nCache-Control: public, max-age=31536000, immutable\n\n# HTML d'entrée : toujours revalidé, jamais servi périmé\nCache-Control: no-cache\n\n# API : selon la fraîcheur acceptable\nCache-Control: public, max-age=60, stale-while-revalidate=30",
      },
      {
        kind: "text",
        text: "Règle d'or : tout ce qui a un hash de contenu dans son nom (`app.a3f9c2.js`) se cache un an ; tout ce qui n'en a pas (`index.html`) se revalide. Le `stale-while-revalidate` sert la version en cache pendant la mise à jour en arrière-plan : fraîcheur sans latence.",
      },
    ],
  },
  {
    id: "service-workers",
    title: "Service Workers",
    level: 3,
    intro: "Un proxy programmable dans le navigateur : cache avancé et mode hors-ligne.",
    blocks: [
      {
        kind: "text",
        text: "Le service worker intercepte les requêtes réseau et applique des stratégies : cache-first pour les assets, network-first pour l'API, stale-while-revalidate pour le contenu. Il permet aussi le fonctionnement hors-ligne et les mises à jour en arrière-plan.",
      },
      {
        kind: "list",
        items: [
          "Ne l'écrivez pas à la main : Workbox (ou le plugin PWA de votre framework) gère le cycle de vie, les stratégies et les pièges.",
          "Le service worker lui-même ne doit jamais être mis en cache (`Cache-Control: no-cache`) : sinon les mises à jour ne sont pas détectées.",
          "Stratégie par type : assets immuables en cache-first, pages HTML en network-first avec repli cache.",
          "Coût : complexité de debug réelle. Sans besoin hors-ligne ou cache fin, le cache HTTP suffit.",
        ],
      },
    ],
  },
  {
    id: "ssr-ssg-isr",
    title: "SSR, SSG, ISR : choisir le rendu",
    level: 3,
    intro: "Où la page est-elle générée ? Le choix détermine le TTFB et la fraîcheur.",
    blocks: [
      {
        kind: "table",
        headers: ["Stratégie", "Génération", "Idéal pour"],
        rows: [
          ["SSG", "Au build, une fois", "Contenu statique : marketing, docs, blog"],
          ["ISR", "Au build + régénéré périodiquement", "Contenu quasi-statique : catalogue, fiches produit"],
          ["SSR", "À chaque requête", "Contenu personnalisé : dashboard, panier connecté"],
          ["CSR", "Dans le navigateur", "Apps très interactives derrière login"],
        ],
      },
      {
        kind: "text",
        text: "Le SSG donne le meilleur LCP (HTML prêt, servi par CDN) ; le SSR donne la fraîcheur au prix du TTFB. Mixez par page, pas par application : la page marketing en SSG, le dashboard en SSR. Mesurez le TTFB de chaque stratégie avant de trancher.",
      },
    ],
  },
  {
    id: "hydratation-partielle",
    title: "Hydratation : le coût caché du SSR",
    level: 3,
    intro: "Le HTML serveur s'affiche vite, mais l'hydratation peut tout ralentir derrière.",
    blocks: [
      {
        kind: "text",
        text: "L'hydratation rejoue React sur le HTML existant pour le rendre interactif : elle télécharge et exécute tout le JavaScript de la page. Une page SSR avec un LCP excellent peut avoir un INP catastrophique si l'hydratation bloque le thread principal pendant deux secondes.",
      },
      {
        kind: "list",
        items: [
          "Hydratation partielle (islands) : n'hydrater que les zones interactives, le reste reste du HTML statique.",
          "Chargement différé des composants non critiques : le footer interactif peut attendre.",
          "React Server Components : le composant ne s'exécute que sur le serveur, zéro JavaScript envoyé au client.",
          "Mesurez le « temps jusqu'à interactivité », pas seulement le LCP : un écran visible mais figé est pire qu'un écran lent.",
        ],
      },
    ],
  },
  {
    id: "bundle-analyse",
    title: "Analyser le bundle",
    level: 3,
    intro: "Voir ce que pèse chaque dépendance : l'analyseur transforme les soupçons en faits.",
    blocks: [
      {
        kind: "command",
        label: "Installer l'analyseur de bundle",
        command: "npm install --save-dev rollup-plugin-visualizer",
        why: "Génère une treemap interactive du bundle : chaque rectangle est un module, sa taille est sa surface. On y découvre les dépendances surprises — la bibliothèque de dates de 200 Ko, le polyfill embarqué par erreur.",
        verify: "npm ls rollup-plugin-visualizer",
      },
      {
        kind: "list",
        items: [
          "Cherchez les gros rectangles inattendus : une dépendance utilitaire ne devrait pas peser plus que votre code.",
          "Repérez les doublons : deux versions de la même bibliothèque embarquées par des dépendances différentes.",
          "Vérifiez le découpage : chaque route a son chunk, le code partagé est dans un chunk commun.",
          "Refaites l'analyse après chaque optimisation : la treemap est la preuve du gain.",
        ],
      },
    ],
  },
  {
    id: "long-tasks",
    title: "Longues tâches et thread principal",
    level: 3,
    intro: "Le thread principal est une ressource unique : toute tâche de plus de 50 ms bloque l'interactivité.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Observer les longues tâches",
        code: "const observer = new PerformanceObserver((list) => {\n  for (const entry of list.getEntries()) {\n    console.warn('Longue tâche :', Math.round(entry.duration), 'ms');\n  }\n};\nobserver.observe({ entryTypes: ['longtask'] });",
      },
      {
        kind: "list",
        items: [
          "Une longue tâche = plus de 50 ms de JavaScript ininterrompu : parsing, gros calcul, rendu massif.",
          "Stratégie : découper (`await new Promise(r => setTimeout(r))` entre les lots), différer (requestIdleCallback), ou déplacer (Web Worker).",
          "Les scripts tiers sont les coupables fréquents : chargez-les en `async`/`defer`, retardez-les après l'interactivité.",
          "`scheduler.yield()` (API récente) rend la main explicitement au navigateur au milieu d'un traitement.",
        ],
      },
    ],
  },
  {
    id: "web-workers",
    title: "Web Workers",
    level: 3,
    intro: "Exécuter le JavaScript lourd hors du thread principal : l'UI reste fluide.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Worker minimal",
        code: "// worker.js : s'exécute dans un thread séparé\nself.onmessage = (e) => {\n  const result = calculLourd(e.data);\n  self.postMessage(result);\n};\n\n// main.js\nconst worker = new Worker(new URL('./worker.js', import.meta.url));\nworker.postMessage(donnees);\nworker.onmessage = (e) => afficher(e.data);",
      },
      {
        kind: "text",
        text: "Cas d'usage : chiffrement, parsing de gros fichiers, calculs (tableaux croisés, simulations). Limites : pas d'accès au DOM, communication par messages (sérialisation). Pour du code existant, des bibliothèques comme Comlink simplifient l'interface.",
      },
    ],
  },
  {
    id: "css-performant",
    title: "CSS performant",
    level: 3,
    intro: "Le CSS aussi coûte : sélecteurs, recalculs de style et contenus hors écran.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "content-visibility : sauter le rendu hors écran",
        code: ".card {\n  content-visibility: auto;\n  contain-intrinsic-size: 300px;\n}",
      },
      {
        kind: "list",
        items: [
          "`content-visibility: auto` : le navigateur saute le rendu des sections hors écran — gain massif sur les longues pages.",
          "`contain-intrinsic-size` : réserve une taille approximative pour éviter les décalages (CLS) pendant le saut.",
          "`contain: layout` : isole les recalculs de mise en page à un sous-arbre.",
          "Évitez les sélecteurs très coûteux (`*`, `:not()` complexes) sur de gros DOM — leur coût se paie à chaque recalcul de style.",
        ],
      },
    ],
  },
  {
    id: "animations-60fps",
    title: "Animations à 60 images/seconde",
    level: 3,
    intro: "Une animation fluide n'anime que ce que le GPU compose : transform et opacity.",
    blocks: [
      {
        kind: "list",
        items: [
          "N'animez que `transform` (translate, scale, rotate) et `opacity` : elles évitent layout et paint, le compositeur GPU s'en charge.",
          "Ne jamais animer `width`, `height`, `top`, `left`, `margin` : chaque frame recalcule la mise en page de toute la page.",
          "`will-change: transform` annonce une animation imminente — à utiliser avec parcimonie, sur l'élément animé uniquement.",
          "Préférez les transitions CSS aux animations JS pour les cas simples : le navigateur les optimise mieux.",
          "`prefers-reduced-motion` : désactivez les animations non essentielles pour les utilisateurs qui le demandent.",
        ],
      },
    ],
  },
  {
    id: "scripts-tiers",
    title: "Scripts tiers : le coût caché",
    level: 3,
    intro: "Analytics, chat, pubs : chaque script tiers est du JavaScript que vous ne contrôlez pas.",
    blocks: [
      {
        kind: "text",
        text: "Les scripts tiers sont la première cause d'INP dégradé sur les sites e-commerce : ils s'exécutent sur le thread principal, souvent au pire moment. Auditez-les comme votre propre code : chacun doit justifier son coût.",
      },
      {
        kind: "list",
        items: [
          "Inventaire : listez chaque script tiers, son poids, son moment de chargement. Supprimez les doublons et les outils oubliés.",
          "Chargement différé : `defer` ou chargement après l'interactivité (`requestIdleCallback`). Jamais de script tiers synchrone dans le `<head>`.",
          "Isolation : Partytown exécute les scripts tiers dans un Web Worker — l'analytics ne bloque plus le thread principal.",
          "Façades : affichez un faux bouton « Lire la vidéo » qui ne charge le lecteur tiers qu'au clic — zéro coût avant interaction.",
        ],
      },
    ],
  },
  {
    id: "compression",
    title: "Compression : Brotli et Gzip",
    level: 3,
    intro: "Le texte se compresse à 70-80 % : ne jamais servir du JavaScript non compressé.",
    blocks: [
      {
        kind: "list",
        items: [
          "Brotli (niveau 11 en statique) compresse mieux que Gzip : ~15-20 % de gain supplémentaire sur JS/CSS.",
          "Pré-compressez au build : le serveur sert le fichier `.br` existant au lieu de compresser à chaque requête.",
          "Vérifiez l'en-tête : `Content-Encoding: br` doit apparaître sur vos assets. Sans lui, la compression est inactive.",
          "Les images et vidéos sont déjà compressées : ne pas les recompresser, ça ne gagne rien et coûte du CPU.",
        ],
      },
      {
        kind: "command",
        label: "Vérifier la compression d'un asset",
        command: "curl -sI -H \"Accept-Encoding: br\" http://localhost:3000/app.js | grep -i content-encoding",
        why: "Affiche l'en-tête `Content-Encoding` renvoyé par le serveur pour cet asset. Si la réponse est vide ou indique l'absence de compression, vos bundles voyagent en clair — corrigez la configuration du serveur ou du CDN.",
        verify: "curl -s -H \"Accept-Encoding: br\" http://localhost:3000/app.js -o /dev/null -w \"%{size_download}\\n\"",
      },
    ],
  },
  {
    id: "http2",
    title: "HTTP/2 et HTTP/3",
    level: 3,
    intro: "Le multiplexage change les règles : fini le temps où il fallait concaténer pour limiter les requêtes.",
    blocks: [
      {
        kind: "list",
        items: [
          "HTTP/2 multiplexe les requêtes sur une seule connexion : le code splitting par petits chunks n'est plus pénalisé comme en HTTP/1.1.",
          "HTTP/3 (QUIC) réduit la latence de connexion, surtout sur mobile : activez-le sur votre CDN si disponible.",
          "La priorisation compte toujours : `fetchpriority` et `preload` guident l'ordre quand la bande passante est limitée.",
          "Vérifiez : l'onglet Network du DevTools affiche le protocole (`h2`, `h3`) par requête.",
        ],
      },
    ],
  },
  {
    id: "metriques-terrain-lab",
    title: "Terrain vs laboratoire",
    level: 3,
    intro: "Deux mesures complémentaires : le labo pour diagnostiquer, le terrain pour décider.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Laboratoire (Lighthouse)", "Terrain (web-vitals)"],
        rows: [
          ["Environnement", "Simulé, reproductible", "Réel, variable"],
          ["Usage", "Diagnostiquer, comparer avant/après", "Piloter, détecter les régressions"],
          ["Limite", "Ne voit pas vos vrais utilisateurs", "Bruité, nécessite du volume"],
          ["Appareils", "Un profil simulé", "Tous les appareils réels"],
        ],
      },
      {
        kind: "text",
        text: "Workflow : le labo identifie le goulot et valide le correctif ; le terrain confirme le gain pour les utilisateurs et surveille les régressions. Un LCP labo à 1,5 s avec un LCP terrain à 4 s signifie que vos utilisateurs n'ont ni votre réseau ni votre machine.",
      },
    ],
  },
  {
    id: "debugging",
    title: "Debugging de performance",
    level: 3,
    intro: "Méthode systématique quand une page est lente et que la cause n'est pas évidente.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Qualifier : quelle métrique ?",
            detail:
              "LCP lent = problème de chargement (réseau, ressource). INP lent = problème d'interactivité (JS bloquant). CLS = problème de stabilité (dimensions). La métrique oriente l'enquête.",
          },
          {
            title: "Isoler avec le waterfall réseau",
            detail:
              "L'onglet Network trié par temps : quelle requête domine ? Une image de 3 Mo, une API à 2 s, 200 petites requêtes ? Le waterfall ne ment pas.",
          },
          {
            title: "Enregistrer l'onglet Performance",
            detail:
              "CPU bridé ×4, 10 secondes d'usage réel : les longues tâches rouges désignent les fonctions coupables, fichier et ligne à l'appui.",
          },
          {
            title: "Comparer avant/après",
            detail:
              "Un seul changement, deux mesures. Sans baseline, toute « optimisation » est une supposition.",
          },
          {
            title: "Valider sur le terrain",
            detail:
              "Le gain labo se confirme dans les métriques `web-vitals` des jours suivants. Sinon, le goulot réel est ailleurs.",
          },
        ],
      },
    ],
  },
  {
    id: "testing-perf",
    title: "Tester la performance en CI",
    level: 3,
    intro: "Les régressions de performance sont des bugs : testez-les comme des bugs.",
    blocks: [
      {
        kind: "command",
        label: "Installer Lighthouse CI",
        command: "npm install --save-dev @lhci/cli",
        why: "Lighthouse CI exécute des audits à chaque pull request et échoue si les budgets sont dépassés (score, LCP, taille). La régression devient visible avant le merge, pas après la plainte des utilisateurs.",
        verify: "npx lhci --version",
      },
      {
        kind: "code",
        language: "json",
        title: ".lighthouserc.json — budgets",
        code: "{\n  \"ci\": {\n    \"assert\": {\n      \"assertions\": {\n        \"largest-contentful-paint\": [\"error\", { \"maxNumericValue\": 2500 }],\n        \"interactive\": [\"warn\", { \"maxNumericValue\": 3500 }],\n        \"resource-summary:script:size\": [\"error\", { \"maxNumericValue\": 200000 }]\n      }\n    }\n  }\n}",
      },
      {
        kind: "text",
        text: "Commencez avec des budgets indulgents alignés sur vos métriques actuelles, puis resserrez progressivement. Un budget trop strict dès le départ sera désactivé — et ne reviendra jamais.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les pièges classiques de l'optimisation web.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Optimiser sans mesurer",
            value:
              "Problem : mémoïsation partout, refactorings « pour la perf » sans baseline. Why : l'intuition remplace la mesure. Better : Lighthouse d'abord, le Profiler ensuite, l'optimisation en dernier.",
          },
          {
            label: "Mémoïsation abusive",
            value:
              "Problem : `useMemo` sur chaque valeur, `memo` sur chaque composant. Why : « ça ne peut pas faire de mal ». Better : le coût de comparaison dépasse souvent le gain ; ne mémoïsez que le prouvé coûteux.",
          },
          {
            label: "Images non dimensionnées",
            value:
              "Problem : CLS élevé, page qui saute au chargement. Why : `width`/`height` oubliés. Better : dimensions toujours déclarées, espace réservé avant chargement.",
          },
          {
            label: "Bundle monolithique",
            value:
              "Problem : 1,5 Mo de JavaScript au premier chargement. Why : aucun code splitting, tout importé d'emblée. Better : découpage par route, lazy loading des modules lourds.",
          },
          {
            label: "Scripts tiers synchrones",
            value:
              "Problem : INP dégradé par l'analytics ou le chat. Why : scripts dans le `<head>` sans `defer`. Better : chargement différé, façades, isolation en worker.",
          },
          {
            label: "Mesurer en développement",
            value:
              "Problem : « c'est lent » sur le serveur de dev. Why : le mode dev est 5 à 10× plus lent (vérifications React, pas de minification). Better : toujours mesurer sur un build de production.",
          },
          {
            label: "Négliger le mobile réel",
            value:
              "Problem : parfait sur MacBook, catastrophique sur Android d'entrée de gamme. Why : CPU bridé jamais testé. Better : DevTools en CPU ×4, tests sur appareil réel.",
          },
          {
            label: "Précharger à l'excès",
            value:
              "Problem : dix `preload` qui se battent pour la bande passante. Why : tout semble « critique ». Better : 2-3 preloads maximum, sur la ressource LCP et la police.",
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
          "Mesurer d'abord : chaque optimisation commence par un chiffre et se termine par un chiffre.",
          "Budgets écrits : LCP, taille du bundle, nombre de requêtes — validés avec l'équipe produit, vérifiés en CI.",
          "Un changement à la fois : sinon impossible d'attribuer le gain.",
          "Terrain + labo : Lighthouse pour diagnostiquer, web-vitals pour piloter.",
          "Images d'abord : le goulot le plus fréquent est aussi le plus facile à corriger.",
          "JavaScript avec parcimonie : le code le plus rapide est celui qu'on n'envoie pas.",
          "Scripts tiers sous contrôle : inventaire, chargement différé, façades.",
          "Accessibilité et performance ensemble : `prefers-reduced-motion`, contrastes, navigation clavier — la vitesse ne justifie pas l'exclusion.",
        ],
      },
      {
        kind: "text",
        text: "Contexte : un site vitrine n'a pas les mêmes budgets qu'une application métier complexe. Fixez les seuils avec les utilisateurs réels en tête, pas avec le score parfait en tête.",
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
            label: "MDN — Performance",
            value:
              "developer.mozilla.org/en-US/docs/Web/Performance : la référence sur les concepts (critical rendering path, optimisation des ressources).",
          },
          {
            label: "web.dev",
            value:
              "web.dev : guides Google sur les Core Web Vitals, les patterns d'optimisation et les études de cas.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Lighthouse : la documentation des audits explique chaque opportunité et son calcul.",
          "web-vitals : le README du paquet détaille chaque métrique et sa mesure.",
          "Pratique : auditez un site réel par semaine et tenez un journal des gains — c'est ainsi qu'on développe l'œil.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "La performance maîtrisée, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Travailler l'architecture frontend : un bon découpage par feature devient un bon découpage de chunks.",
          "Apprendre l'accessibilité : performance et accessibilité partagent le même objectif — une expérience fluide pour tous.",
          "Approfondir les tests : Lighthouse CI et les tests de non-régression visuelle verrouillent les gains.",
          "Explorer le backend : quand le TTFB domine le LCP, l'optimisation se déplace côté serveur (cache, requêtes).",
          "Revenir à la roadmap : valider Performance et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

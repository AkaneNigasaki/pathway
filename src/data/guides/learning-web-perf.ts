import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de la performance web : mesurer, diagnostiquer, optimiser.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_WEB_PERF: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est la performance web et pourquoi c'est une fonctionnalité à part entière.",
    blocks: [
      {
        kind: "text",
        text: "La performance web mesure et optimise la vitesse ressentie par l'utilisateur : temps d'affichage, réactivité aux interactions, stabilité visuelle. On l'évalue avec des métriques standardisées — les Core Web Vitals (LCP, INP, CLS) — et des outils comme Lighthouse, avant d'optimiser le code, les images, les polices et le réseau.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est une fonctionnalité : la vitesse impacte la conversion, le référencement et la rétention. Un site lent fait partir les visiteurs avant même qu'ils voient le contenu ; un site rapide donne une impression de qualité. Et contrairement aux idées reçues, la performance ne s'obtient pas en « optimisant à la fin » : elle se mesure dès le début, puis se protège.",
      },
      {
        kind: "text",
        text: "Le principe cardinal : mesurer d'abord, optimiser ensuite — jamais l'inverse. Sans mesure, on optimise au hasard : on risque de complexifier le code pour un gain nul, voire de dégrader ce qui comptait vraiment.",
      },
    ],
  },
  {
    id: "mesurer-avant-optimiser",
    title: "Mesurer avant d'optimiser",
    level: 1,
    intro: "La boucle de travail de toute démarche performance.",
    blocks: [
      {
        kind: "diagram",
        title: "La boucle performance",
        lines: [
          "MESURER (Lighthouse, DevTools)",
          "     │",
          "     ▼",
          "IDENTIFIER le goulot (une métrique, une cause)",
          "     │",
          "     ▼",
          "OPTIMISER (une seule chose à la fois)",
          "     │",
          "     ▼",
          "RE-MESURER (le gain est-il réel ?)",
          "     │",
          "     └── oui → protéger (budget, CI)",
          "     └── non → autre hypothèse",
        ],
      },
      {
        kind: "list",
        items: [
          "Une métrique à la fois : LCP (affichage), INP (réactivité) ou CLS (stabilité) — pas les trois en même temps.",
          "Une optimisation à la fois : sinon on ne sait jamais ce qui a fonctionné.",
          "Toujours re-mesurer après : l'intuition est un mauvais instrument de mesure.",
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
    intro: "Les bases indispensables pour comprendre ce qu'on mesure.",
    blocks: [
      {
        kind: "fields",
        title: "Bases nécessaires",
        fields: [
          {
            label: "HTML / CSS / JavaScript",
            value:
              "Lire une page web et son code : la plupart des optimisations touchent ces trois couches (images, scripts, styles).",
          },
          {
            label: "HTTP",
            value:
              "Méthodes, codes de statut, en-têtes — notamment le cache (`Cache-Control`). Le réseau est la moitié de la performance.",
          },
          {
            label: "DevTools du navigateur",
            value:
              "Ouvrir l'onglet Network, lire une waterfall : sans ça, on ne voit pas ce qui est lent.",
          },
          {
            label: "Outil de build (Vite, webpack…)",
            value:
              "Comprendre que le code est transformé et découpé en bundles avant d'être servi : c'est là qu'agissent le code splitting et la minification.",
          },
        ],
      },
    ],
  },
  {
    id: "core-web-vitals",
    title: "Core Web Vitals",
    level: 2,
    intro:
      "Les trois métriques qui résument l'expérience : LCP, INP, CLS.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois métriques",
        fields: [
          {
            label: "LCP — Largest Contentful Paint",
            value:
              "Temps d'affichage du plus gros élément visible (souvent une image ou un titre). Seuil « bon » : 2,5 secondes ou moins. Il mesure la vitesse de chargement perçue.",
          },
          {
            label: "INP — Interaction to Next Paint",
            value:
              "Délai entre une interaction (clic, frappe) et la mise à jour visuelle suivante. Seuil « bon » : 200 millisecondes ou moins. Il mesure la réactivité.",
          },
          {
            label: "CLS — Cumulative Layout Shift",
            value:
              "Somme des déplacements inattendus de mise en page pendant le chargement. Seuil « bon » : 0,1 ou moins. Il mesure la stabilité visuelle.",
          },
        ],
      },
      {
        kind: "text",
        text: "Ces seuils sont ceux publiés par Google pour qualifier une expérience de « bonne ». En pratique : visez le vert sur les trois, mais attaquez-les un par un — chacun a ses propres causes et ses propres remèdes, détaillés au niveau 3.",
      },
    ],
  },
  {
    id: "lighthouse",
    title: "Lighthouse",
    level: 2,
    intro:
      "L'audit de référence : un score et des opportunités chiffrées, à lancer avant toute optimisation.",
    blocks: [
      {
        kind: "command",
        label: "Auditer une page en ligne de commande",
        command: "npx lighthouse https://example.com --view",
        why: "Lance un audit Lighthouse complet (performance, accessibilité, bonnes pratiques, SEO) et ouvre le rapport HTML dans le navigateur avec `--view`. Le score de performance est accompagné d'opportunités chiffrées (« réduisez le JavaScript inutilisé : −1,2 s »).",
      },
      {
        kind: "fields",
        title: "Lire le rapport",
        fields: [
          {
            label: "Score (0-100)",
            value:
              "Une synthèse, pas un objectif en soi. Un score de 90+ est « bon », mais deux sites à 90 peuvent avoir des expériences très différentes.",
          },
          {
            label: "Métriques",
            value:
              "Les valeurs mesurées (LCP, INP estimé via TBT, CLS…) avec leur code couleur. C'est ici que se joue le diagnostic.",
          },
          {
            label: "Opportunités",
            value:
              "Les gains potentiels triés par impact estimé. Commencez toujours par le haut de la liste.",
          },
          {
            label: "Diagnostics",
            value:
              "Des informations contextuelles (nombre de requêtes, taille des ressources) qui expliquent les opportunités.",
          },
        ],
      },
      {
        kind: "text",
        text: "Alternative sans terminal : l'onglet Lighthouse des DevTools Chrome (même moteur, mêmes métriques). Et pour mesurer ce que vivent les vrais utilisateurs plutôt qu'un labo, PageSpeed Insights affiche les données de terrain (voir niveau 3).",
      },
    ],
  },
  {
    id: "devtools-performance",
    title: "DevTools : onglets Network et Performance",
    level: 2,
    intro: "Voir ce qui est lent, requête par requête.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Ouvrir l'onglet Network",
            detail:
              "F12 → onglet Network → recharger la page. Chaque ligne est une requête : sa taille, sa durée, son type. Triez par taille ou par durée pour repérer les ressources les plus coûteuses.",
          },
          {
            title: "Lire la waterfall",
            detail:
              "Les barres horizontales montrent quand chaque requête démarre et se termine. Une longue barre violette = attente réseau ; une cascade séquentielle = des ressources qui se bloquent mutuellement au lieu de se charger en parallèle.",
          },
          {
            title: "Enregistrer avec l'onglet Performance",
            detail:
              "Onglet Performance → bouton Record → interagissez avec la page → Stop. La timeline montre le thread principal : les longues tâches jaunes (plus de 50 ms) sont celles qui dégradent l'INP.",
          },
          {
            title: "Simuler un mobile",
            detail:
              "Dans Network, limitez le débit (« Fast 3G ») et le CPU (onglet Performance → CPU 4x). Tester sur une machine puissante en fibre ne dit rien de l'expérience d'un téléphone d'entrée de gamme.",
          },
        ],
      },
    ],
  },
  {
    id: "images-bases",
    title: "Images : les bases",
    level: 2,
    intro:
      "Les images sont le premier poste de poids d'une page : trois attributs changent tout.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Image bien chargée",
        code: `<img\n  src="photo.jpg"\n  alt="Description de la photo"\n  width="800"\n  height="600"\n  loading="lazy"\n  decoding="async"\n/>`,
      },
      {
        kind: "fields",
        title: "Les trois attributs qui comptent",
        fields: [
          {
            label: "`width` + `height`",
            value:
              "Réservent l'espace avant le chargement : sans dimensions, l'image fait sauter la mise en page à son arrivée (CLS).",
          },
          {
            label: "`loading=\"lazy\"`",
            value:
              "Charge l'image seulement quand elle approche du viewport. À réserver aux images sous la ligne de flottaison — jamais à l'image principale (LCP).",
          },
          {
            label: "`decoding=\"async\"`",
            value:
              "Décode l'image hors du thread principal : le décodage ne bloque plus l'interactivité.",
          },
        ],
      },
      {
        kind: "text",
        text: "Formats : préférez les formats modernes (WebP, AVIF) aux JPEG/PNG classiques — même qualité visuelle pour un poids nettement inférieur. Le niveau 3 détaille `srcset` et l'élément `<picture>`.",
      },
    ],
  },
  {
    id: "code-splitting",
    title: "Code splitting",
    level: 2,
    intro:
      "Ne charger que le JavaScript nécessaire : découper le bundle par route.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Import dynamique",
        code: `// Chargé immédiatement : le bundle initial\nimport { Header } from "./Header.js";\n\n// Chargé à la demande : chunk séparé\nasync function openEditor() {\n  const { Editor } = await import("./Editor.js");\n  Editor.mount(document.getElementById("app"));\n}`,
      },
      {
        kind: "text",
        text: "`import()` dynamique dit au bundler : « mets ce module dans un fichier séparé, chargé uniquement quand on l'appelle ». L'éditeur (lourd, rarement utilisé d'emblée) ne pèse plus sur le chargement initial. Par route : chaque page ne charge que son propre chunk.",
      },
      {
        kind: "list",
        items: [
          "Découpez par route et par fonctionnalité lourde (éditeur, graphiques, lecteur vidéo).",
          "Ne découpez pas à l'excès : trop de petits chunks = trop de requêtes. L'équilibre se mesure.",
          "Le code splitting ne réduit pas le poids total — il réduit le poids du chargement initial.",
        ],
      },
    ],
  },
  {
    id: "cache-http",
    title: "Cache HTTP",
    level: 2,
    intro:
      "La requête la plus rapide est celle qu'on ne fait pas : le cache navigateur.",
    blocks: [
      {
        kind: "code",
        language: "text",
        title: "En-tête Cache-Control",
        code: `# Fichiers versionnés (nom avec hash) : cache agressif\nCache-Control: public, max-age=31536000, immutable\n\n# HTML non versionné : toujours revalidé\nCache-Control: no-cache`,
      },
      {
        kind: "text",
        text: "Principe : les fichiers dont le nom change à chaque build (hash dans le nom, ex. `app.a3f9.js`) peuvent être cachés un an (`immutable`) — quand le contenu change, le nom change, donc l'ancien cache ne gêne jamais. Le HTML, lui, doit être revalidé (`no-cache`) pour pointer vers les bons fichiers.",
      },
      {
        kind: "list",
        items: [
          "`max-age=31536000` = un an en secondes : la valeur standard pour les assets versionnés.",
          "`immutable` : le navigateur ne revalidera même pas le fichier pendant un an.",
          "Sans hash dans les noms de fichiers, un cache agressif sert des versions périmées : le versionnage est un prérequis.",
        ],
      },
    ],
  },
  {
    id: "polices",
    title: "Polices web",
    level: 2,
    intro:
      "Les polices personnalisées bloquent l'affichage du texte : les charger sans bloquer.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "@font-face non bloquant",
        code: `@font-face {\n  font-family: "Inter";\n  src: url("/fonts/inter.woff2") format("woff2");\n  font-display: swap;\n}`,
      },
      {
        kind: "code",
        language: "html",
        title: "Précharger la police critique",
        code: `<link\n  rel="preload"\n  href="/fonts/inter.woff2"\n  as="font"\n  type="font/woff2"\n  crossorigin\n/>`,
      },
      {
        kind: "text",
        text: "`font-display: swap` affiche immédiatement le texte avec une police système, puis bascule vers la police web quand elle arrive — fini le texte invisible pendant le chargement. Le `preload` de la police critique la fait arriver plus tôt. Servez vos polices vous-même en `woff2` (le format le plus compact) plutôt que via un CDN tiers quand c'est possible : une connexion en moins.",
      },
    ],
  },
  {
    id: "minification",
    title: "Minification et build",
    level: 2,
    intro: "Ce que l'outil de build fait déjà pour vous — et ce qu'il faut vérifier.",
    blocks: [
      {
        kind: "text",
        text: "En mode production, Vite (et les autres bundlers) minifient automatiquement : espaces et commentaires supprimés, noms de variables raccourcis, code mort éliminé (tree shaking). Un build de dev n'est jamais représentatif : mesurez toujours sur un build de production (`npm run build` + prévisualisation).",
      },
      {
        kind: "list",
        items: [
          "Vérifiez que vous mesurez le build de production, pas le serveur de dev (non minifié, avec les source maps).",
          "Activez la compression côté serveur (gzip ou brotli) : le texte (JS, CSS, HTML) se compresse typiquement à 20-30 % de sa taille.",
          "Surveillez la taille du bundle initial dans la sortie du build : c'est votre premier indicateur, avant même Lighthouse.",
        ],
      },
    ],
  },
  {
    id: "audit-express",
    title: "Audit express en 10 minutes",
    level: 2,
    intro: "Un protocole simple pour un premier diagnostic.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Lancer Lighthouse",
            detail:
              "`npx lighthouse https://votre-site.com --view` (ou l'onglet Lighthouse des DevTools). Notez le score et les trois Core Web Vitals.",
          },
          {
            title: "Trier les opportunités par gain",
            detail:
              "Le rapport chiffre chaque opportunité (« −1,4 s »). Prenez la première : c'est là que l'effort paie le plus.",
          },
          {
            title: "Vérifier le Network",
            detail:
              "Onglet Network, tri par taille : les 5 ressources les plus lourdes expliquent souvent 80 % du problème (image non compressée, bundle trop gros, police tierce).",
          },
          {
            title: "Corriger UNE chose, re-mesurer",
            detail:
              "Appliquez une seule optimisation, relancez Lighthouse. Si le gain est là, passez à la suivante ; sinon, changez d'hypothèse.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 2,
    intro: "Les fautes qui coûtent le plus cher, et leur correction immédiate.",
    blocks: [
      {
        kind: "table",
        headers: ["Symptôme", "Cause probable", "Correction"],
        rows: [
          ["LCP élevé", "Image principale lourde ou chargée en lazy", "Formats modernes, pas de `lazy` sur l'image hero, `preload` si critique"],
          ["CLS élevé", "Images/polices sans dimensions réservées", "`width`/`height`, `font-display: swap`"],
          ["INP élevé", "Longues tâches JS au chargement ou sur interaction", "Découper le JS, différer le non-critique, voir niveau 3"],
          ["Bundle énorme", "Bibliothèque importée en entier", "Imports ciblés, code splitting, analyse du bundle"],
          ["Requêtes en cascade", "Scripts qui chargent d'autres scripts", "`preload` des ressources critiques, réduire les dépendances tierces"],
        ],
      },
    ],
  },
  {
    id: "checklist-lancement",
    title: "Checklist avant mise en ligne",
    level: 2,
    intro: "Les vérifications minimales avant de publier.",
    blocks: [
      {
        kind: "list",
        items: [
          "Lighthouse ≥ 90 en performance sur la page d'accueil et une page type (build de production).",
          "Images : dimensions réservées, `loading=\"lazy\"` hors hero, formats modernes.",
          "Polices : `font-display: swap`, `woff2`, préchargement de la critique.",
          "Cache : assets versionnés en `immutable`, HTML en `no-cache`.",
          "Aucun script tiers non audité dans le `<head>` (chaque tiers = un risque de lenteur).",
          "Test sur mobile simulé (CPU ralenti, 4G) : le score desktop ne suffit pas.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "lcp-detail",
    title: "LCP en détail",
    level: 3,
    intro: "Diagnostiquer un Largest Contentful Paint trop lent, phase par phase.",
    blocks: [
      {
        kind: "diagram",
        title: "Les 4 phases du LCP",
        lines: [
          "Requête",
          "  │ TTFB : le serveur répond-il vite ?",
          "  ▼",
          "Chargement de la ressource",
          "  │ La ressource LCP est-elle découverte tôt ? Est-elle lourde ?",
          "  ▼",
          "Rendu",
          "  │ Le thread principal est-il bloqué ?",
          "  ▼",
          "Affichage du plus gros élément",
        ],
      },
      {
        kind: "fields",
        title: "Causes et remèdes par phase",
        fields: [
          {
            label: "TTFB lent",
            value:
              "Serveur ou hébergement lent, pas de CDN. Remède : CDN, cache serveur, hébergement proche des utilisateurs.",
          },
          {
            label: "Ressource découverte tard",
            value:
              "L'image LCP chargée via CSS ou JS au lieu du HTML. Remède : `<img>` dans le HTML initial, `fetchpriority=\"high\"`, `preload` si chargée en fond.",
          },
          {
            label: "Ressource trop lourde",
            value:
              "Image de 2 Mo affichée en 800 px. Remède : redimensionner, AVIF/WebP, `srcset` (voir sections images).",
          },
          {
            label: "Thread bloqué",
            value:
              "Gros bundle JS qui s'exécute avant l'affichage. Remède : différer le non-critique (`defer`), code splitting.",
          },
        ],
      },
    ],
  },
  {
    id: "inp-detail",
    title: "INP en détail",
    level: 3,
    intro: "La réactivité : pourquoi un clic met 500 ms à répondre.",
    blocks: [
      {
        kind: "text",
        text: "L'INP mesure le pire délai d'interaction sur la page (toutes les interactions, pas la moyenne). Trois phases : le délai d'entrée (le thread est occupé quand l'utilisateur clique), le traitement (votre handler), le délai de présentation (le navigateur repeint). La cause la plus fréquente : de longues tâches JavaScript (> 50 ms) qui monopolisent le thread principal.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Détecter les longues tâches",
        code: `const observer = new PerformanceObserver((list) => {\n  for (const entry of list.getEntries()) {\n    if (entry.duration > 50) {\n      console.warn("Longue tâche :", Math.round(entry.duration), "ms");\n    }\n  }\n});\nobserver.observe({ entryTypes: ["longtask"] });`,
      },
      {
        kind: "list",
        items: [
          "Découper les longues tâches : un traitement de 300 ms en 6× 50 ms laisse le navigateur respirer entre chaque.",
          "Différer le non-critique : tout ce qui n'est pas lié à l'interaction peut attendre (`requestIdleCallback`, import dynamique).",
          "Éviter le travail redondant dans les handlers : un `input` qui re-rend toute la page à chaque frappe est un classique.",
          "Rendre tôt : mettre à jour le visuel d'abord (feedback immédiat), traiter ensuite.",
        ],
      },
    ],
  },
  {
    id: "cls-detail",
    title: "CLS en détail",
    level: 3,
    intro: "La stabilité visuelle : empêcher la mise en page de sauter.",
    blocks: [
      {
        kind: "table",
        headers: ["Cause de décalage", "Mécanisme", "Remède"],
        rows: [
          ["Images sans dimensions", "L'espace est réservé à 0×0 puis l'image pousse le contenu", "`width` + `height` (ou `aspect-ratio` en CSS)"],
          ["Polices web (FOUT/FOIT)", "Le texte change de métriques quand la police arrive", "`font-display: swap` + police système proche"],
          ["Contenu injecté tard", "Bannière, pub ou widget inséré au-dessus du contenu", "Réserver l'espace avec un conteneur à hauteur fixe"],
          ["Animations de layout", "Animation de `width`, `top`, `margin`", "Animer `transform` et `opacity` uniquement"],
        ],
      },
      {
        kind: "text",
        text: "Règle : tout contenu qui arrive après le premier rendu doit avoir son espace réservé. Un CLS de 0 est atteignable sur la plupart des pages — c'est la plus « mécanique » des trois métriques : pas d'arbitrage, juste de la discipline.",
      },
    ],
  },
  {
    id: "critical-rendering-path",
    title: "Critical Rendering Path",
    level: 3,
    intro: "Le chemin critique : ce que le navigateur doit faire avant le premier pixel.",
    blocks: [
      {
        kind: "diagram",
        title: "Chemin critique simplifié",
        lines: [
          "HTML",
          " │ parse",
          " ▼",
          "DOM ──────┐",
          "         ├─► Render tree ─► Layout ─► Paint",
          "CSS ──────┘",
          " │ parse (bloquant par défaut)",
          " ▼",
          "CSSOM",
          "",
          "JS : bloque le parse sauf defer / async",
        ],
      },
      {
        kind: "text",
        text: "Le navigateur construit le DOM (HTML) et le CSSOM (CSS) avant de calculer la mise en page : le CSS est bloquant par nature — un gros fichier CSS retarde tout. Le JavaScript synchrone bloque le parsing du HTML. Optimiser le chemin critique, c'est réduire ce qui est bloquant et différer le reste : CSS critique inline, JS en `defer`, ressources non critiques en `preload`/`lazy`.",
      },
    ],
  },
  {
    id: "preload-preconnect-prefetch",
    title: "Preload, preconnect, prefetch",
    level: 3,
    intro: "Trois indices au navigateur, trois usages différents — à ne pas confondre.",
    blocks: [
      {
        kind: "table",
        headers: ["", "`preload`", "`preconnect`", "`prefetch`"],
        rows: [
          ["Rôle", "Charger tôt une ressource nécessaire à la page actuelle", "Ouvrir tôt la connexion à un domaine tiers", "Charger en basse priorité une ressource pour la navigation suivante"],
          ["Exemple", "Police critique, image hero en CSS", "`https://fonts.googleapis.com`", "Chunk JS de la page suivante"],
          ["Risque d'abus", "Précharger ce qui n'est pas critique = voler de la bande passante au critique", "Trop de preconnects = connexions inutiles", "Télécharger ce que l'utilisateur ne visitera jamais"],
        ],
      },
      {
        kind: "code",
        language: "html",
        title: "Exemples",
        code: `<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />\n<link rel="preconnect" href="https://cdn.example.com" />\n<link rel="prefetch" href="/chunks/dashboard.js" />`,
      },
      {
        kind: "text",
        text: "`as` est obligatoire avec `preload` (le navigateur doit connaître le type pour la priorité et le CSP). Règle d'usage : `preload` pour 1-3 ressources vraiment critiques, `preconnect` pour les domaines tiers indispensables, `prefetch` pour anticiper la navigation suivante quand elle est probable.",
      },
    ],
  },
  {
    id: "defer-async",
    title: "Defer vs async",
    level: 3,
    intro: "Deux attributs, deux stratégies de chargement des scripts.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Sans attribut", "`defer`", "`async`"],
        rows: [
          ["Téléchargement", "Bloque le parsing", "En parallèle", "En parallèle"],
          ["Exécution", "Immédiate, bloque le parsing", "Après le parsing HTML, dans l'ordre", "Dès la fin du téléchargement, sans ordre"],
          ["Ordre garanti", "Oui", "Oui", "Non"],
          ["Usage", "Script critique au rendu", "Presque tous les scripts (défaut recommandé)", "Scripts indépendants (analytics, widgets tiers)"],
        ],
      },
      {
        kind: "code",
        language: "html",
        title: "Usage",
        code: `<script src="/app.js" defer></script>\n<script src="https://analytics.example.com/pixel.js" async></script>`,
      },
      {
        kind: "text",
        text: "Règle simple : `defer` par défaut pour vos scripts (ordre préservé, pas de blocage), `async` pour les scripts tiers indépendants. Les modules ES (`type=\"module\"`) sont `defer` par comportement natif — pas besoin de l'attribut.",
      },
    ],
  },
  {
    id: "fetchpriority",
    title: "Fetchpriority",
    level: 3,
    intro: "Ajuster la priorité d'une ressource quand le navigateur se trompe.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Prioriser l'image LCP",
        code: `<!-- L'image hero : priorité haute, jamais lazy -->\n<img src="hero.avif" alt="Présentation" fetchpriority="high" width="1600" height="900" />\n\n<!-- Image décorative sous la ligne de flottaison : priorité basse -->\n<img src="texture.avif" alt="" loading="lazy" fetchpriority="low" width="400" height="300" />`,
      },
      {
        kind: "text",
        text: "`fetchpriority=\"high\"` signale au navigateur que cette ressource est critique — utile quand l'image LCP est découverte tard (fond CSS, carrousel). `fetchpriority=\"low\"` fait l'inverse pour le non-critique. À utiliser avec parcimonie : tout marquer « high », c'est ne rien prioriser.",
      },
    ],
  },
  {
    id: "tree-shaking",
    title: "Tree shaking",
    level: 3,
    intro: "Éliminer le code mort : pourquoi les imports ES comptent.",
    blocks: [
      {
        kind: "text",
        text: "Le tree shaking supprime les exports inutilisés du bundle final. Il exige une syntaxe de modules statique : le bundler doit savoir à la compilation ce qui est importé. `import { map } from \"./utils\"` est analysable ; `require()` dynamique ou les effets de bord cachés ne le sont pas.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Import ciblé vs tonneau",
        code: `// Bien : seul ce qui est utilisé est inclus\nimport { debounce } from "../utils/debounce.js";\n\n// Mal : le fichier tonneau peut embarquer tout le dossier\n// si le bundler ne peut pas prouver l'absence d'effets de bord\nimport { debounce } from "../utils/index.js";`,
      },
      {
        kind: "text",
        text: "Le champ `sideEffects: false` dans `package.json` déclare au bundler que les modules n'ont pas d'effets de bord à l'import — il peut alors les éliminer agressivement. Les « barrel files » (`index.js` qui réexporte tout) sont l'ennemi classique : préférez les imports directs vers le module précis.",
      },
    ],
  },
  {
    id: "manual-chunks",
    title: "Découpage manuel des chunks",
    level: 3,
    intro: "Contrôler la granularité du bundle avec `manualChunks` (Vite/Rollup).",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "vite.config.ts",
        code: `import { defineConfig } from "vite";\n\nexport default defineConfig({\n  build: {\n    rollupOptions: {\n      output: {\n        manualChunks: {\n          vendor: ["react", "react-dom"],\n          charts: ["chart.js"],\n        },\n      },\n    },\n  },\n});`,
      },
      {
        kind: "text",
        text: "`manualChunks` regroupe des dépendances dans des fichiers séparés : `vendor.js` (framework, change rarement → bien caché) et `charts.js` (lourd, chargé uniquement sur les pages qui en ont besoin via import dynamique). Le cache navigateur travaille mieux avec des chunks stables : un chunk qui ne change pas n'est pas retéléchargé.",
      },
      {
        kind: "text",
        text: "Attention : le découpage manuel est un réglage fin, pas un premier réflexe. Trop de chunks = trop de requêtes ; des chunks instables = cache inefficace. Mesurez avec l'analyseur de bundle avant et après.",
      },
    ],
  },
  {
    id: "analyser-bundle",
    title: "Analyser le bundle",
    level: 3,
    intro: "Visualiser ce qui pèse dans le bundle : la treemap qui dit la vérité.",
    blocks: [
      {
        kind: "command",
        label: "Installer l'analyseur",
        command: "npm install -D rollup-plugin-visualizer",
        why: "Génère une treemap interactive du bundle après le build : chaque rectangle est un module, sa taille est proportionnelle à son poids. On y découvre les surprises — la bibliothèque importée pour une fonction, les doublons, les locales de dates embarquées par erreur.",
        verify: "npm run build",
      },
      {
        kind: "code",
        language: "typescript",
        title: "vite.config.ts",
        code: `import { defineConfig } from "vite";\nimport { visualizer } from "rollup-plugin-visualizer";\n\nexport default defineConfig({\n  plugins: [\n    visualizer({\n      filename: "dist/stats.html",\n      open: true,\n      gzipSize: true,\n    }),\n  ],\n});`,
      },
      {
        kind: "text",
        text: "Lecture du rapport : les gros rectangles verts (`node_modules`) sont les premiers suspects. Questions à se poser : « pourquoi cette lib est-elle là ? », « l'utilise-t-on en entier ? », « existe-t-il une alternative plus légère ou un import ciblé ? ». `gzipSize: true` affiche les tailles compressées — plus proches de la réalité réseau.",
      },
    ],
  },
  {
    id: "compression",
    title: "Compression : gzip et brotli",
    level: 3,
    intro: "Le texte se compresse : servir des assets compressés divise le transfert par 3-4.",
    blocks: [
      {
        kind: "text",
        text: "Le JavaScript, le CSS et le HTML sont du texte très redondant : gzip les réduit à environ 30 % de leur taille, brotli (plus moderne) fait encore mieux sur le texte. La compression s'active côté serveur (nginx, CDN, hébergeur) — vérifiez dans l'onglet Network que la réponse porte `content-encoding: gzip` ou `br`.",
      },
      {
        kind: "list",
        items: [
          "brotli > gzip sur le texte : préférez-le quand le serveur le supporte (la plupart des CDN le font).",
          "Les images (JPEG, WebP, AVIF) sont déjà compressées : les recompresser ne sert à rien.",
          "Alternative au build : précompresser les assets au build et servir les `.gz` / `.br` statiques — utile sur les hébergements statiques.",
        ],
      },
    ],
  },
  {
    id: "images-responsives",
    title: "Images responsives : srcset",
    level: 3,
    intro: "Servir à chaque écran la taille d'image dont il a besoin, pas plus.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "srcset + sizes",
        code: `<img\n  src="photo-800.jpg"\n  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"\n  sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"\n  alt="Paysage"\n  width="1200"\n  height="800"\n/>`,
      },
      {
        kind: "text",
        text: "`srcset` liste les versions disponibles avec leur largeur (`400w`) ; `sizes` dit au navigateur quelle largeur d'affichage prévoir selon le viewport. Le navigateur choisit la plus adaptée — un téléphone ne télécharge plus la version desktop de 1200 px. Sans `srcset`, tout le monde reçoit la plus grosse version.",
      },
    ],
  },
  {
    id: "formats-modernes",
    title: "Formats modernes : picture",
    level: 3,
    intro: "AVIF et WebP avec repli gracieux via `<picture>`.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "picture avec replis",
        code: `<picture>\n  <source srcset="photo.avif" type="image/avif" />\n  <source srcset="photo.webp" type="image/webp" />\n  <img src="photo.jpg" alt="Paysage" width="1200" height="800" />\n</picture>`,
      },
      {
        kind: "text",
        text: "Le navigateur prend la première `<source>` dont il supporte le `type` : AVIF (le plus compact) si possible, sinon WebP, sinon le JPEG de repli. Ordre : du plus moderne au plus ancien. Générez les trois versions au build ou via un service d'images — ne convertissez jamais à la main pour chaque image.",
      },
    ],
  },
  {
    id: "lazy-loading-avance",
    title: "Lazy loading avancé",
    level: 3,
    intro: "`loading=\"lazy\"` suffit souvent ; `IntersectionObserver` pour les cas spéciaux.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Lazy load manuel",
        code: `const observer = new IntersectionObserver((entries) => {\n  for (const entry of entries) {\n    if (entry.isIntersecting) {\n      const img = entry.target;\n      img.src = img.dataset.src; // vraie URL dans data-src\n      observer.unobserve(img);\n    }\n  }\n}, { rootMargin: "200px" }); // précharge 200px avant l'arrivée\n\ndocument.querySelectorAll("img[data-src]").forEach((img) => observer.observe(img));`,
      },
      {
        kind: "text",
        text: "`loading=\"lazy\"` natif couvre 95 % des besoins et ne coûte aucun JavaScript. `IntersectionObserver` sert aux cas que l'attribut ne couvre pas : composants custom, iframes spécifiques, préchargement anticipé via `rootMargin`. Ne lazy-loadez jamais l'image LCP : elle doit partir immédiatement.",
      },
    ],
  },
  {
    id: "content-visibility",
    title: "Content-visibility",
    level: 3,
    intro: "Ne pas payer le rendu des sections hors écran.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Rendu différé",
        code: `.below-fold {\n  content-visibility: auto;\n  contain-intrinsic-size: 0 500px;\n}`,
      },
      {
        kind: "text",
        text: "`content-visibility: auto` dit au navigateur de sauter le rendu (layout, paint) des sections hors écran — le coût est payé seulement au scroll. `contain-intrinsic-size` réserve une hauteur estimée pour éviter que la scrollbar ne saute. Efficace sur les longues pages avec beaucoup de sections ; inutile (et contre-productif) sur le contenu above-the-fold.",
      },
    ],
  },
  {
    id: "web-fonts-avance",
    title: "Polices : stratégie avancée",
    level: 3,
    intro: "Subset, unicode-range et police système de repli.",
    blocks: [
      {
        kind: "list",
        items: [
          "Subset : n'embarquez que les glyphes nécessaires (latin de base vs fichier complet avec cyrillique, grec…). Un subset latin divise souvent le poids par deux ou plus.",
          "`unicode-range` dans `@font-face` : le navigateur ne télécharge que les plages utilisées sur la page.",
          "Police système de repli proche : choisissez une fallback aux métriques similaires (ex. `system-ui`) pour limiter le décalage visuel au swap (FOUT maîtrisé, CLS contenu).",
          "Limitez les graisses : chaque graisse (400, 500, 700) est un fichier. Deux graisses bien choisies suffisent souvent.",
        ],
      },
      {
        kind: "text",
        text: "Ordre de priorité : 1) moins de polices et de graisses, 2) `woff2` auto-hébergé, 3) `font-display: swap`, 4) preload de la critique, 5) subset. La police la plus rapide est celle qu'on ne charge pas.",
      },
    ],
  },
  {
    id: "long-tasks",
    title: "Longues tâches : les découper",
    level: 3,
    intro: "Le thread principal est unique : une tâche de 300 ms bloque tout.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Découper un traitement lourd",
        code: `// Mal : 10 000 éléments traités d'un coup → INP dégradé\nfunction processAll(items) {\n  for (const item of items) heavy(item);\n}\n\n// Bien : par paquets, en rendant la main entre chaque\nasync function processChunked(items) {\n  for (let i = 0; i < items.length; i += 100) {\n    items.slice(i, i + 100).forEach(heavy);\n    await new Promise((r) => setTimeout(r, 0)); // rend la main\n  }\n}`,
      },
      {
        kind: "text",
        text: "`await new Promise(r => setTimeout(r, 0))` rend la main au navigateur entre deux paquets : les interactions et le paint s'intercalent. Pour les calculs vraiment lourds et parallélisables, les Web Workers déplacent le travail hors du thread principal — au prix d'une communication par messages à architecturer.",
      },
    ],
  },
  {
    id: "inlining-css",
    title: "CSS critique inline",
    level: 3,
    intro: "Le CSS bloque le rendu : inliner le critique, différer le reste.",
    blocks: [
      {
        kind: "text",
        text: "Le navigateur ne peint rien avant d'avoir le CSS (il est bloquant par construction). Technique : extraire le CSS nécessaire au above-the-fold, l'inliner dans un `<style>` du `<head>`, et charger le reste en différé. Le premier paint arrive plus tôt car il n'attend plus le fichier CSS complet.",
      },
      {
        kind: "code",
        language: "html",
        title: "CSS non critique différé",
        code: `<!-- CSS critique : inline, immédiat -->\n<style>/* styles du hero, header, above-the-fold */</style>\n\n<!-- Reste : chargé sans bloquer -->\n<link rel="stylesheet" href="/app.css" media="print" onload="this.media='all'" />`,
      },
      {
        kind: "text",
        text: "L'astuce `media=\"print\"` + `onload` charge la feuille en non-bloquant puis l'active. Des outils extraient le CSS critique automatiquement au build — à la main, c'est fastidieux et fragile. Réservez cette technique aux pages où le CSS est le goulot avéré.",
      },
    ],
  },
  {
    id: "http-versions",
    title: "HTTP/2 et HTTP/3",
    level: 3,
    intro: "Le protocole compte : multiplexage et en-têtes compressés.",
    blocks: [
      {
        kind: "text",
        text: "HTTP/1.1 ouvrait une connexion par lot de requêtes (d'où les anciens « sprites » et la concaténation). HTTP/2 multiplexe : toutes les requêtes partagent une connexion, les en-têtes sont compressés. HTTP/3 va plus loin en remplaçant TCP par QUIC (moins de latence à l'établissement, meilleure résilience sur mobile).",
      },
      {
        kind: "list",
        items: [
          "Vérifiez que votre hébergeur sert en HTTP/2 minimum (onglet Network → colonne Protocol).",
          "Avec HTTP/2, la concaténation en un seul gros fichier perd son intérêt : préférez des chunks ciblés + cache.",
          "HTTP/3 se négocie automatiquement quand serveur et client le supportent — c'est une config serveur, pas du code.",
        ],
      },
    ],
  },
  {
    id: "cdn",
    title: "CDN",
    level: 3,
    intro: "Servir depuis le bord du réseau : la latence géographique.",
    blocks: [
      {
        kind: "text",
        text: "Un CDN réplique vos fichiers statiques sur des serveurs répartis dans le monde : l'utilisateur télécharge depuis le point le plus proche, pas depuis votre serveur d'origine. Gain double : latence réduite (TTFB) et décharge de votre serveur.",
      },
      {
        kind: "list",
        items: [
          "Mettez au CDN : JS, CSS, images, polices — tout ce qui est statique et versionné.",
          "Ne mettez pas au CDN : le HTML personnalisé par utilisateur (ou avec des règles de cache fines).",
          "Le CDN ne remplace pas l'optimisation : servir vite un bundle de 2 Mo reste servir 2 Mo.",
        ],
      },
    ],
  },
  {
    id: "cache-strategies",
    title: "Stratégies de cache avancées",
    level: 3,
    intro: "Service workers : le cache programmable côté client.",
    blocks: [
      {
        kind: "fields",
        title: "Stratégies classiques",
        fields: [
          {
            label: "Cache first",
            value:
              "Servir le cache, aller au réseau en dernier recours. Pour les assets versionnés immuables : instantané et sûr.",
          },
          {
            label: "Network first",
            value:
              "Essayer le réseau, repli sur le cache en cas d'échec. Pour le HTML et les données : fraîcheur d'abord, hors-ligne en secours.",
          },
          {
            label: "Stale-while-revalidate",
            value:
              "Servir le cache immédiatement ET rafraîchir en arrière-plan. Le meilleur des deux pour les ressources semi-dynamiques.",
          },
        ],
      },
      {
        kind: "text",
        text: "Un service worker intercepte les requêtes et applique ces stratégies par type de ressource. C'est puissant (fonctionnement hors-ligne, instantanéité) mais c'est du code qui tourne en production : un worker buggé sert du contenu périmé à tout le monde. Versionnez-le et testez la mise à jour.",
      },
    ],
  },
  {
    id: "tiers-scripts",
    title: "Scripts tiers",
    level: 3,
    intro: "Analytics, pubs, widgets : le poste le plus traître.",
    blocks: [
      {
        kind: "text",
        text: "Chaque script tiers (analytics, chat, pub, A/B testing) ajoute du JS, des requêtes et souvent des écouteurs qui dégradent l'INP — sans que vous contrôliez son code. Un seul widget mal optimisé peut coûter plus cher que tout votre bundle.",
      },
      {
        kind: "list",
        items: [
          "Auditez chaque tiers : son poids, ses requêtes, son impact mesuré (comparez Lighthouse avec et sans).",
          "Chargez en `async` ou différé, jamais en synchrone dans le `<head>`.",
          "Façades : affichez un faux lecteur vidéo / faux widget léger, chargez le vrai au clic — le coût n'est payé que si l'utilisateur s'en sert.",
          "Supprimez les tiers inutilisés : le tag posé « pour plus tard » il y a deux ans coûte encore aujourd'hui.",
        ],
      },
    ],
  },
  {
    id: "mesurer-terrain",
    title: "Mesurer le terrain (RUM)",
    level: 3,
    intro: "Le labo ne suffit pas : mesurer ce que vivent les vrais utilisateurs.",
    blocks: [
      {
        kind: "text",
        text: "Lighthouse mesure en labo (machine, réseau simulés). Le RUM (Real User Monitoring) mesure les vrais appareils, vrais réseaux, vraies interactions — y compris l'INP, impossible à simuler fidèlement en labo. Les deux se complètent : le labo pour diagnostiquer, le terrain pour prioriser.",
      },
      {
        kind: "command",
        label: "Installer la bibliothèque web-vitals",
        command: "npm install web-vitals",
        why: "La bibliothèque officielle de Google pour mesurer les Core Web Vitals côté client en quelques lignes, et les envoyer vers votre analytics. C'est la base d'un suivi RUM maison.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Collecter les métriques",
        code: `import { onLCP, onINP, onCLS } from "web-vitals";\n\nfunction sendToAnalytics(metric) {\n  console.log(metric.name, Math.round(metric.value));\n  // Ici : fetch vers votre endpoint d'analytics\n}\n\nonLCP(sendToAnalytics);\nonINP(sendToAnalytics);\nonCLS(sendToAnalytics);`,
      },
    ],
  },
  {
    id: "outils-mesure",
    title: "Panorama des outils de mesure",
    level: 3,
    intro: "Labo vs terrain : quel outil pour quel usage.",
    blocks: [
      {
        kind: "table",
        headers: ["Outil", "Type", "Usage"],
        rows: [
          ["Lighthouse (CLI / DevTools)", "Labo", "Diagnostiquer une page, itérer sur les optimisations"],
          ["PageSpeed Insights", "Labo + terrain", "Voir le labo ET les données réelles Chrome (CrUX) d'une URL"],
          ["Chrome UX Report (CrUX)", "Terrain", "Données agrégées d'utilisateurs réels, par origine"],
          ["Search Console → Signaux Web", "Terrain", "Suivi des Core Web Vitals sur tout le site, avec impact SEO"],
          ["web-vitals (lib)", "Terrain", "RUM maison : vos propres données, vos propres segments"],
        ],
      },
      {
        kind: "text",
        text: "Note : les données de terrain (CrUX) portent sur 28 jours glissants — une optimisation met des semaines à s'y refléter. Le labo donne un feedback immédiat, le terrain donne la vérité : utilisez les deux, sans les confondre.",
      },
    ],
  },
  {
    id: "animations-performantes",
    title: "Animations performantes",
    level: 3,
    intro: "60 images/seconde : n'animer que ce que le GPU fait bien.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Bonnes propriétés à animer",
        code: `/* Bien : transform et opacity sont composés par le GPU */\n.card {\n  transition: transform 0.3s ease, opacity 0.3s ease;\n}\n.card:hover {\n  transform: translateY(-4px);\n}\n\n/* Mal : width, top, margin déclenchent layout + paint */\n/* .card:hover { width: 320px; } */`,
      },
      {
        kind: "text",
        text: "Le navigateur peint en trois étapes : layout (positions), paint (pixels), composite (assemblage GPU). Animer `width` ou `top` rejoue les trois à chaque frame ; animer `transform` / `opacity` ne rejoue que le composite — d'où la fluidité. `will-change: transform` prévient le navigateur à l'avance, à réserver aux éléments vraiment animés (surutilisé, il consomme de la mémoire).",
      },
    ],
  },
  {
    id: "taille-dom",
    title: "Taille du DOM",
    level: 3,
    intro: "Un DOM de 5000 nœuds ralentit tout : layout, JS, mémoire.",
    blocks: [
      {
        kind: "text",
        text: "Chaque nœud DOM coûte : le navigateur le stocke, le met en page, et vos sélecteurs le parcourent. Les symptômes d'un DOM trop gros : interactions lentes, `querySelectorAll` coûteux, INP dégradé même avec peu de JS. Lighthouse signale « éviter un DOM de taille excessive » au-delà d'environ 1500 nœuds.",
      },
      {
        kind: "list",
        items: [
          "Virtualiser les longues listes : ne rendre que les lignes visibles (fenêtrage) au lieu de 10 000 `<div>`.",
          "Paginer ou charger plus (« load more ») plutôt qu'un scroll infini sans limite.",
          "Éviter les wrappers inutiles : chaque `<div>` de structure compte.",
        ],
      },
    ],
  },
  {
    id: "fuites-memoire",
    title: "Fuites mémoire",
    level: 3,
    intro: "La mémoire qui ne revient jamais : écouteurs et observers oubliés.",
    blocks: [
      {
        kind: "text",
        text: "Une fuite mémoire en JS, c'est presque toujours une référence conservée : un `addEventListener` jamais retiré, un `setInterval` jamais nettoyé, un `IntersectionObserver` qui observe des éléments supprimés. Sur une SPA qui vit des heures, ça finit en ralentissements puis en crash d'onglet.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Nettoyer systématiquement",
        code: `function trackScroll() {\n  const onScroll = () => { /* ... */ };\n  window.addEventListener("scroll", onScroll);\n\n  // Retourne le nettoyage : à appeler quand le composant meurt\n  return () => window.removeEventListener("scroll", onScroll);\n}\n\nconst cleanup = trackScroll();\n// plus tard : cleanup();`,
      },
      {
        kind: "text",
        text: "Diagnostic : l'onglet Memory des DevTools (heap snapshots comparés) montre ce qui grandit entre deux états. Les frameworks modernes nettoient via leurs cycles de vie (`useEffect` → return, `onUnmounted`) — encore faut-il les utiliser.",
      },
    ],
  },
  {
    id: "budgets-performance",
    title: "Budgets de performance",
    level: 3,
    intro: "Empêcher la régression : un budget chiffré, vérifié en CI.",
    blocks: [
      {
        kind: "text",
        text: "Un budget de performance, c'est une limite contractuelle : « le JS initial ne dépasse pas 170 Ko », « le LCP reste sous 2,5 s ». Sans budget, chaque PR ajoute « juste un petit script » et la performance s'érode en silence. Avec un budget vérifié en CI, la régression bloque la fusion comme un test échoué.",
      },
      {
        kind: "list",
        items: [
          "Budgets simples et parlants : taille du JS initial, nombre de requêtes, poids des images — pas 15 métriques.",
          "Vérifiez en CI : taille des bundles au build, score Lighthouse sur les pages critiques.",
          "Rendez le budget visible : affiché dans la PR, il devient une contrainte de design comme une autre.",
          "Revisitez le budget : un budget intenable est ignoré ; un budget trop lâche ne protège rien.",
        ],
      },
    ],
  },
  {
    id: "erreurs-avancees",
    title: "Erreurs avancées",
    level: 3,
    intro: "Les pièges qui survivent au niveau 2.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Pourquoi c'est tentant", "La réalité"],
        rows: [
          ["Optimiser sans mesurer", "« C'est évident que c'est lent »", "La moitié des intuitions sont fausses ; la mesure tranche"],
          ["Tout mettre en lazy", "« Moins chargé = plus rapide »", "Lazy sur le LCP = LCP plus lent. Le critique part immédiatement"],
          ["Concaténer en un seul fichier", "Habitude HTTP/1.1", "En HTTP/2, des chunks ciblés + cache valent mieux"],
          ["Chasser le score Lighthouse", "Le 100/100 fait bien", "Le score est un proxy ; l'expérience terrain (CrUX) est l'objectif"],
          ["Ignorer le mobile", "On développe sur desktop", "La majorité du trafic est mobile, sur des appareils modestes"],
        ],
      },
    ],
  },
  {
    id: "projets",
    title: "Projets pour pratiquer",
    level: 3,
    intro: "Trois projets progressifs.",
    blocks: [
      {
        kind: "list",
        items: [
          "Audit complet : prenez un site existant (le vôtre ou un portfolio), lancez Lighthouse, corrigez les 3 premières opportunités, documentez avant/après avec captures du rapport.",
          "Images optimisées : convertissez les images d'un projet en AVIF/WebP avec `srcset`, ajoutez le lazy loading et mesurez le gain sur le LCP.",
          "Budget en CI : ajoutez à un projet un contrôle de taille de bundle au build qui échoue au-delà d'un seuil, plus un audit Lighthouse planifié.",
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
            label: "web.dev/vitals",
            value:
              "La référence officielle des Core Web Vitals : définitions, seuils, guides d'optimisation par métrique. Le point de départ.",
          },
          {
            label: "Documentation Lighthouse",
            value:
              "La doc officielle de Lighthouse (developer.chrome.com) : chaque audit y est expliqué avec ses seuils et ses remèdes.",
          },
          {
            label: "MDN — Performance",
            value:
              "Les guides performance de MDN : fondamentaux navigateur, APIs (`PerformanceObserver`, `IntersectionObserver`), bonnes pratiques.",
          },
        ],
      },
      {
        kind: "text",
        text: "Réflexe : un score Lighthouse bas s'accompagne toujours d'un lien « En savoir plus » vers la doc de l'audit — suivez-le avant de chercher ailleurs.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite",
    level: 3,
    intro: "La performance touche à tout : ces compétences prolongent la démarche.",
    blocks: [
      {
        kind: "fields",
        title: "Continuer dans la roadmap",
        fields: [
          {
            label: "vite",
            value:
              "Maîtriser l'outil de build : code splitting, chunks, analyse — là où se joue le poids du bundle.",
          },
          {
            label: "frontend-archi",
            value:
              "Architecturer pour la performance : découpage, chargement par route, stratégies de rendu.",
          },
          {
            label: "accessibility",
            value:
              "Performance et accessibilité partagent les audits Lighthouse — et souvent les mêmes corrections.",
          },
          {
            label: "nextjs",
            value:
              "Le framework et ses optimisations intégrées : images, polices, découpage automatique.",
          },
          {
            label: "nginx",
            value:
              "Côté serveur : compression, cache, en-têtes — la moitié de la performance se joue là.",
          },
        ],
      },
    ],
  },
];

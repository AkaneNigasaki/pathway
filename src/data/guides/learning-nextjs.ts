import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Next.js : le framework React full-stack,
 * de la première page au déploiement production.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_NEXTJS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Next.js, pourquoi il existe et ce qu'il apporte à React.",
    blocks: [
      {
        kind: "text",
        text: "Next.js est un framework React pour la production : il ajoute à React le rendu côté serveur (SSR), la génération statique (SSG), un routeur basé sur le système de fichiers (App Router), des routes API et une chaîne de build optimisée.",
      },
      {
        kind: "text",
        text: "Pourquoi Next.js existe : une application React pure s'exécute entièrement dans le navigateur — premier affichage lent, contenu invisible pour les moteurs de recherche, pas de backend. Next.js résout ces problèmes réels : le serveur génère le HTML (SEO, performance du premier chargement), le routing est intégré, et on peut exposer des endpoints backend dans le même projet.",
      },
      {
        kind: "text",
        text: "Next.js n'est pas un autre React : c'est React + une architecture. Les composants, les hooks et l'écosystème restent React ; Next.js décide où et quand le code s'exécute (serveur vs client) et comment les pages sont servies.",
      },
    ],
  },
  {
    id: "panorama-nextjs",
    title: "Next.js en une image",
    level: 1,
    intro:
      "Le trajet d'une visite, de la route au rendu.",
    blocks: [
      {
        kind: "diagram",
        title: "De la route au rendu",
        lines: [
          "Visite de /blog/mon-article",
          "     │",
          "     ▼",
          "ROUTE (app/blog/[slug]/page.tsx)",
          "     │",
          "     ▼",
          "SERVEUR : Server Components exécutés,",
          "        données récupérées, HTML généré",
          "     │",
          "     ▼",
          "NAVIGATEUR : page affichée immédiatement",
          "     │",
          "     ▼",
          "HYDRATATION : React prend le relais (interactivité)",
          "     │",
          "     ▼",
          "NAVIGATION suivante : instantanée (client-side),",
          "  contenu mis en CACHE et revalidé",
        ],
      },
      {
        kind: "list",
        items: [
          "Server Components par défaut : moins de JavaScript envoyé au navigateur.",
          "`\"use client\"` : déclare les composants interactifs exécutés côté client.",
          "Le cache et la revalidation rendent les pages à la fois rapides et fraîches.",
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
      "Next.js s'appuie entièrement sur React : les bases exigées.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut maîtriser",
        fields: [
          {
            label: "React",
            value:
              "Composants, props, état (`useState`), effets (`useEffect`) : Next.js ne réexplique pas React, il l'orchestre.",
          },
          {
            label: "JavaScript / TypeScript",
            value:
              "Le langage courant : `create-next-app` propose TypeScript par défaut, et c'est le choix recommandé.",
          },
          {
            label: "Node.js et npm",
            value:
              "Exécuter des scripts (`npm run dev`), installer des dépendances : l'environnement d'exécution de Next.js.",
          },
          {
            label: "HTTP (bases)",
            value:
              "Requêtes, réponses, codes de statut : pour les routes API et le data fetching.",
          },
        ],
      },
      {
        kind: "text",
        text: "Si React est fragile, le consolider d'abord : Next.js ajoute le serveur, le routing et le cache par-dessus — trois couches qui exigent des fondations React solides.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Créer une application Next.js avec l'outil officiel.",
    blocks: [
      {
        kind: "command",
        label: "Créer l'application",
        command: "npx create-next-app@latest mon-app",
        why: "Lance l'assistant de création officiel : il propose TypeScript, ESLint, Tailwind, le dossier `src/`, l'App Router et la configuration d'imports. Répondre oui à TypeScript et à l'App Router pour suivre cette page.",
        verify: "ls mon-app",
      },
      {
        kind: "command",
        label: "Démarrer en développement",
        command: "npm run dev",
        why: "Lance le serveur de développement (par défaut `http://localhost:3000`) avec rechargement à chaud et compilation à la demande. C'est le mode de travail quotidien.",
        verify: "curl -s -o /dev/null -w \"%{http_code}\" http://localhost:3000",
      },
      {
        kind: "text",
        text: "Les trois scripts qui structurent la vie du projet : `npm run dev` (développer), `npm run build` (compiler pour la production), `npm start` (servir le build). Retenir ce trio, c'est comprendre le cycle de vie.",
      },
    ],
  },
  {
    id: "premier-projet",
    title: "Premier projet",
    level: 2,
    intro:
      "Créer des pages, naviguer, afficher des données : le premier site.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Comprendre la structure",
            detail:
              "Le dossier `app/` est le routeur : chaque dossier est une route, chaque `page.tsx` une page. `app/page.tsx` = `/`, `app/blog/page.tsx` = `/blog`, `app/layout.tsx` = le layout racine (HTML, `<body>`).",
          },
          {
            title: "Créer une page",
            detail:
              "Créer `app/a-propos/page.tsx` exportant un composant React par défaut : la route `/a-propos` existe immédiatement, sans configuration. Le routing est le système de fichiers.",
          },
          {
            title: "Naviguer avec Link",
            detail:
              "Utiliser `<Link href=\"/a-propos\">` (de `next/link`) plutôt que `<a>` : la navigation est côté client, sans rechargement complet — et préchargée au survol.",
          },
          {
            title: "Afficher des données serveur",
            detail:
              "Dans un Server Component, `fetch` s'exécute côté serveur : `const data = await (await fetch(url)).json()`. Pas de `useEffect`, pas d'état de chargement manuel pour le cas simple.",
          },
          {
            title: "Ajouter de l'interactivité",
            detail:
              "Pour un compteur ou un formulaire : créer un composant avec `\"use client\"` en première ligne, puis l'utiliser dans la page. Le serveur rend le reste, le client gère l'interaction.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "app/blog/page.tsx — page serveur avec données",
        code: "import Link from \"next/link\"\n\nexport default async function Blog() {\n  const res = await fetch(\"https://api.example.com/articles\")\n  const articles = await res.json()\n\n  return (\n    <main>\n      <h1>Blog</h1>\n      {articles.map((a) => (\n        <Link key={a.id} href={`/blog/${a.slug}`}>\n          {a.titre}\n        </Link>\n      ))}\n    </main>\n  )\n}",
      },
    ],
  },
  {
    id: "app-router-bases",
    title: "App Router : les conventions",
    level: 2,
    intro:
      "Les fichiers spéciaux qui structurent chaque route.",
    blocks: [
      {
        kind: "fields",
        title: "Conventions de fichiers",
        fields: [
          { label: "page.tsx", value: "La page de la route : obligatoire pour qu'une route existe." },
          { label: "layout.tsx", value: "Le layout partagé : englobe les pages enfants, persiste entre navigations (la sidebar ne se recharge pas)." },
          { label: "loading.tsx", value: "L'état de chargement : affiché automatiquement pendant le rendu (skeleton)." },
          { label: "error.tsx", value: "L'erreur : composant client qui capture les erreurs du segment (`\"use client\"` obligatoire)." },
          { label: "not-found.tsx", value: "La page 404 du segment, affichée via `notFound()`." },
          { label: "route.ts", value: "Un endpoint API (GET, POST…) : le backend dans le même projet." },
        ],
      },
      {
        kind: "text",
        text: "Les layouts s'imbriquent : le layout racine enveloppe tout, chaque segment peut ajouter le sien. Cette composition remplace les architectures de routing manuelles.",
      },
    ],
  },
  {
    id: "environnement-developpement",
    title: "Environnement de développement",
    level: 2,
    intro:
      "Les pièces d'un poste Next.js.",
    blocks: [
      {
        kind: "diagram",
        title: "La chaîne locale",
        lines: [
          "Terminal",
          "   ├─► Node.js : exécute Next.js (`npm run dev`)",
          "   ├─► Navigateur : http://localhost:3000",
          "   └─► Éditeur : VS Code (support TSX intégré)",
          "           ├─► ESLint (config Next.js incluse)",
          "           └─► DevTools React (profiler, composants)",
          "",
          "Fichiers clés :",
          "  next.config.ts (options du framework)",
          "  .env.local (secrets, jamais commité)",
          "  app/ (routes), public/ (assets statiques)",
        ],
      },
    ],
  },
  {
    id: "configuration",
    title: "Configuration essentielle",
    level: 2,
    intro:
      "Les réglages à connaître : `next.config.ts` et les variables d'environnement.",
    blocks: [
      {
        kind: "fields",
        title: "À connaître",
        fields: [
          {
            label: "next.config.ts",
            value:
              "Les options du framework : images distantes autorisées (`images.remotePatterns`), redirections, headers. La plupart des projets n'y touchent que pour les images et les redirects.",
          },
          {
            label: ".env.local",
            value:
              "Les secrets et URLs par environnement : jamais commité (dans `.gitignore` par défaut). `NEXT_PUBLIC_*` expose une variable au navigateur — tout le reste reste serveur.",
          },
          {
            label: "public/",
            value:
              "Les assets statiques servis tels quels (`/logo.png` → `public/logo.png`). Pas de build, pas d'optimisation : pour les fichiers bruts.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle critique : seules les variables préfixées `NEXT_PUBLIC_` atteignent le navigateur. Une clé secrète sans préfixe dans un Server Component reste côté serveur — c'est tout l'intérêt de l'architecture.",
      },
    ],
  },
  {
    id: "server-vs-client",
    title: "Serveur vs Client : la règle du jeu",
    level: 2,
    intro:
      "La décision centrale de Next.js : où s'exécute ce composant ?",
    blocks: [
      {
        kind: "table",
        headers: ["", "Server Component (défaut)", "Client Component (`\"use client\"`)"],
        rows: [
          ["Exécution", "Sur le serveur uniquement", "Sur le serveur (rendu) + navigateur (interactivité)"],
          ["Peut", "Accéder aux secrets, à la base, au système de fichiers", "Utiliser état, effets, événements, APIs navigateur"],
          ["Ne peut pas", "Utiliser `useState`/`useEffect`/événements", "Accéder aux secrets (le code part au navigateur)"],
          ["JS envoyé", "Zéro pour ce composant", "Le bundle du composant"],
        ],
      },
      {
        kind: "text",
        text: "La stratégie : serveur par défaut, client uniquement pour l'interactivité — et des composants clients petits, en feuilles de l'arbre. Un `\"use client\"` en haut d'une page rend toute la page cliente : le placer au plus bas possible.",
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Workflow quotidien",
    level: 2,
    intro:
      "Développer, vérifier, construire : la routine.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Développer avec `npm run dev`",
            detail:
              "Le serveur de dev recompile à la demande : modifier, sauvegarder, voir. Les erreurs s'affichent en overlay dans le navigateur.",
          },
          {
            title: "Vérifier les types et le lint",
            detail:
              "`npx tsc --noEmit` et le lint ESLint avant de commiter : attraper les erreurs serveur/client (ex. hook dans un Server Component) tôt.",
          },
          {
            title: "Construire pour la production",
            detail:
              "`npm run build` : le build de production révèle les erreurs invisibles en dev (pages qui échouent au prerender, types). Toujours builder avant de déployer.",
          },
          {
            title: "Tester le build localement",
            detail:
              "`npm start` sert le build de production : vérifier que tout fonctionne comme en dev, notamment les variables d'environnement.",
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
      "Quatre projets pour monter en puissance.",
    blocks: [
      {
        kind: "fields",
        title: "Dans l'ordre",
        fields: [
          {
            label: "1. Site vitrine",
            value:
              "Pages statiques, layouts, navigation, images optimisées : le socle (routing, Server Components, `next/image`).",
          },
          {
            label: "2. Blog avec génération statique",
            value:
              "Articles en Markdown, `generateStaticParams` pour les slugs, métadonnées SEO : le SSG en pratique.",
          },
          {
            label: "3. Application avec données dynamiques",
            value:
              "Fetch serveur avec revalidation, route API, formulaire avec Server Action : le full-stack Next.js.",
          },
          {
            label: "4. Dashboard authentifié",
            value:
              "Middleware de protection, session, pages protégées, mutations sécurisées : l'application réelle.",
          },
        ],
      },
    ],
  },
  {
    id: "limites-nextjs",
    title: "Quand ne pas utiliser Next.js",
    level: 2,
    intro:
      "Le framework a un coût : savoir quand il n'est pas rentable.",
    blocks: [
      {
        kind: "list",
        items: [
          "Site purement statique sans interactivité : un générateur statique simple ou du HTML suffit.",
          "Application 100 % cliente (dashboard derrière login, pas de SEO) : un SPA Vite est plus léger.",
          "Backend complexe : Next.js dépanne (routes API), mais une API dédiée (Node, Python…) scale mieux en équipe.",
          "En revanche, dès qu'il faut SEO + performance + backend léger dans un seul projet, Next.js est le défaut raisonnable.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "rendu-ssr-ssg-isr",
    title: "SSR, SSG, ISR : les stratégies de rendu",
    level: 3,
    intro:
      "Trois façons de servir une page : comprendre pour choisir.",
    blocks: [
      {
        kind: "table",
        headers: ["", "SSG (statique)", "SSR (dynamique)", "ISR (revalidé)"],
        rows: [
          ["Génération", "Au build", "À chaque requête", "Au build + revalidée périodiquement"],
          ["Fraîcheur", "Figée jusqu'au rebuild", "Toujours fraîche", "Fraîche à intervalle défini"],
          ["Vitesse", "Maximale (CDN)", "Plus lente (calcul par requête)", "Proche du statique"],
          ["Usage", "Blog, docs, marketing", "Données temps réel, pages personnalisées", "Catalogue, prix, contenus semi-dynamiques"],
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Revalidation ISR sur un fetch",
        code: "// app/produits/page.tsx\n// Revalidée au plus toutes les 60 secondes\nexport default async function Produits() {\n  const res = await fetch(\"https://api.example.com/produits\", {\n    next: { revalidate: 60 },\n  })\n  const produits = await res.json()\n  return (\n    <ul>\n      {produits.map((p) => (\n        <li key={p.id}>{p.nom}</li>\n      ))}\n    </ul>\n  )\n}",
      },
    ],
  },
  {
    id: "data-fetching",
    title: "Data fetching côté serveur",
    level: 3,
    intro:
      "Récupérer des données sans useEffect : les patterns.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Fetch parallèle et séquentiel",
        code: "// Séquentiel : quand la 2e dépend de la 1re\nconst user = await getUser(id)\nconst commandes = await getCommandes(user.id)\n\n// Parallèle : indépendantes → Promise.all\nconst [user, produits] = await Promise.all([\n  getUser(id),\n  getProduits(),\n])",
      },
      {
        kind: "list",
        items: [
          "Le `fetch` est mémorisé par Next.js : deux appels identiques dans le même rendu n'en font qu'un.",
          "`cache: \"no-store\"` pour du vraiment dynamique (données temps réel).",
          "Les waterfalls (requêtes en chaîne inutiles) sont l'ennemi n°1 : paralléliser tout ce qui est indépendant.",
          "Les secrets (clés API) dans le fetch serveur ne fuient jamais vers le navigateur.",
        ],
      },
    ],
  },
  {
    id: "routes-dynamiques",
    title: "Routes dynamiques",
    level: 3,
    intro:
      "Des URLs paramétrées : `[slug]`, générations statiques.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "app/blog/[slug]/page.tsx",
        code: "export async function generateStaticParams() {\n  const articles = await getArticles()\n  return articles.map((a) => ({ slug: a.slug }))\n}\n\nexport async function generateMetadata({ params }) {\n  const article = await getArticle(params.slug)\n  return { title: article.titre }\n}\n\nexport default async function Article({ params }) {\n  const article = await getArticle(params.slug)\n  return <article>{/* … */}</article>\n}",
      },
      {
        kind: "list",
        items: [
          "`[slug]` : segment dynamique, accessible via `params.slug`.",
          "`generateStaticParams` : prégénère les pages au build (SSG) — sans elle, rendu à la demande.",
          "`generateMetadata` : titre et meta par page — le SEO programmatique.",
          "`[...slug]` (catch-all) pour les profondeurs variables.",
        ],
      },
    ],
  },
  {
    id: "server-actions",
    title: "Server Actions",
    level: 3,
    intro:
      "Muter des données sans route API : les actions serveur.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Formulaire avec Server Action",
        code: "\"use client\"\nimport { ajouterProduit } from \"./actions\"\n\nexport function Formulaire() {\n  return (\n    <form action={ajouterProduit}>\n      <input name=\"nom\" required />\n      <button type=\"submit\">Ajouter</button>\n    </form>\n  )\n}",
      },
      {
        kind: "code",
        language: "typescript",
        title: "actions.ts — s'exécute sur le serveur",
        code: "\"use server\"\nimport { revalidatePath } from \"next/cache\"\n\nexport async function ajouterProduit(formData: FormData) {\n  const nom = formData.get(\"nom\")\n  // … validation + écriture en base …\n  revalidatePath(\"/produits\")\n}",
      },
      {
        kind: "list",
        items: [
          "`\"use server\"` marque une fonction exécutable uniquement côté serveur, appelable depuis le client.",
          "Toujours valider les entrées côté serveur : le client n'est jamais de confiance.",
          "`revalidatePath` rafraîchit les pages concernées après mutation.",
        ],
      },
    ],
  },
  {
    id: "middleware",
    title: "Middleware",
    level: 3,
    intro:
      "Intercepter les requêtes avant le rendu : auth, redirections.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "middleware.ts — protéger /dashboard",
        code: "import { NextResponse } from \"next/server\"\nimport type { NextRequest } from \"next/server\"\n\nexport function middleware(request: NextRequest) {\n  const session = request.cookies.get(\"session\")\n  if (!session) {\n    return NextResponse.redirect(new URL(\"/login\", request.url))\n  }\n  return NextResponse.next()\n}\n\nexport const config = {\n  matcher: [\"/dashboard/:path*\"],\n}",
      },
      {
        kind: "list",
        items: [
          "S'exécute avant chaque requête correspondante : idéal pour l'authentification et les redirections.",
          "Le `matcher` limite les routes concernées : ne pas faire tourner le middleware sur les assets.",
          "Léger par design : pas d'accès base de données lourde ici — vérifier le token, pas le revalider à chaque fois.",
        ],
      },
    ],
  },
  {
    id: "api-routes",
    title: "Routes API (route.ts)",
    level: 3,
    intro:
      "Le backend dans le même projet : quand et comment.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "app/api/produits/route.ts",
        code: "import { NextResponse } from \"next/server\"\n\nexport async function GET() {\n  const produits = await db.produits.findMany()\n  return NextResponse.json(produits)\n}\n\nexport async function POST(request: Request) {\n  const body = await request.json()\n  // … validation …\n  const produit = await db.produits.create({ data: body })\n  return NextResponse.json(produit, { status: 201 })\n}",
      },
      {
        kind: "text",
        text: "Usage légitime : webhooks entrants, proxys d'API tierces (cacher les clés), endpoints pour clients non-Next. Pour une API métier conséquente, un backend dédié reste préférable.",
      },
    ],
  },
  {
    id: "streaming-suspense",
    title: "Streaming et Suspense",
    level: 3,
    intro:
      "Afficher vite, compléter ensuite : le rendu progressif.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Suspense autour du contenu lent",
        code: "import { Suspense } from \"react\"\n\nexport default function Page() {\n  return (\n    <main>\n      <h1>Dashboard</h1>\n      {/* S'affiche immédiatement */}\n      <Stats />\n      {/* Chargé en différé avec fallback */}\n      <Suspense fallback={<p>Chargement…</p>}>\n        <GraphiquesLents />\n      </Suspense>\n    </main>\n  )\n}",
      },
      {
        kind: "text",
        text: "Le serveur envoie le HTML par morceaux : le rapide s'affiche tout de suite, le lent arrive quand il est prêt. Combiné à `loading.tsx` (par segment), c'est la fin des pages blanches en attente du slowest query.",
      },
    ],
  },
  {
    id: "metadata-seo",
    title: "Métadonnées et SEO",
    level: 3,
    intro:
      "Le référencement programmatique : titres, descriptions, Open Graph.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Métadonnées statiques et dynamiques",
        code: "// app/layout.tsx — défaut global\nexport const metadata = {\n  title: {\n    default: \"Ma boutique\",\n    template: \"%s — Ma boutique\",\n  },\n  description: \"Description du site.\",\n}\n\n// app/blog/[slug]/page.tsx — par article\nexport async function generateMetadata({ params }) {\n  const a = await getArticle(params.slug)\n  return {\n    title: a.titre,\n    description: a.extrait,\n    openGraph: { images: [a.image] },\n  }\n}",
      },
      {
        kind: "list",
        items: [
          "Le SSR/SSG rend le HTML complet aux crawlers : l'avantage SEO fondamental de Next.js.",
          "`robots.ts` et `sitemap.ts` : générer robots et sitemap dynamiquement.",
          "Tester avec l'inspecteur d'URL et les validateurs Open Graph, pas à l'aveugle.",
        ],
      },
    ],
  },
  {
    id: "images",
    title: "Images optimisées",
    level: 3,
    intro:
      "`next/image` : le composant qui évite les pages lourdes.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Image responsive optimisée",
        code: "import Image from \"next/image\"\n\n<Image\n  src=\"/produit.jpg\"\n  alt=\"Description du produit\"\n  width={800}\n  height={600}\n  sizes=\"(max-width: 768px) 100vw, 50vw\"\n  priority={false}\n/>",
      },
      {
        kind: "list",
        items: [
          "Redimensionnement et formats modernes (WebP/AVIF) automatiques : fini les images de 5 Mo.",
          "`priority` pour l'image above-the-fold (LCP) ; lazy-loading par défaut pour les autres.",
          "Toujours un `alt` : accessibilité et SEO.",
          "Images distantes : déclarer les domaines dans `next.config.ts` (`images.remotePatterns`).",
        ],
      },
    ],
  },
  {
    id: "fonts",
    title: "Polices avec next/font",
    level: 3,
    intro:
      "Des polices sans CLS ni requêtes externes bloquantes.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "app/layout.tsx — police optimisée",
        code: "import { Inter } from \"next/font/google\"\n\nconst inter = Inter({ subsets: [\"latin\"] })\n\nexport default function RootLayout({ children }) {\n  return (\n    <html lang=\"fr\" className={inter.className}>\n      <body>{children}</body>\n    </html>\n  )\n}",
      },
      {
        kind: "text",
        text: "`next/font` auto-héberge la police au build : pas de requête vers Google Fonts au runtime, pas de décalage de mise en page (CLS). Pour une police locale : `next/font/local`.",
      },
    ],
  },
  {
    id: "gestion-erreurs",
    title: "Gestion des erreurs",
    level: 3,
    intro:
      "error.tsx, not-found, erreurs serveur : chaque cas a son fichier.",
    blocks: [
      {
        kind: "fields",
        title: "Les mécanismes",
        fields: [
          {
            label: "error.tsx",
            value:
              "Composant client qui capture les erreurs du segment : affiche un repli avec bouton 'réessayer' (`reset()`). Doit contenir `\"use client\"`.",
          },
          {
            label: "notFound()",
            value:
              "Appelée dans un Server Component quand la ressource n'existe pas : affiche `not-found.tsx` (ou la 404 par défaut).",
          },
          {
            label: "Erreurs globales",
            value:
              "`app/global-error.tsx` : le dernier recours quand même le layout racine échoue. Rare, mais à connaître.",
          },
          {
            label: "Validation",
            value:
              "Les erreurs prévisibles (données invalides, ressource absente) se gèrent en retournant des états, pas en jetant : `error.tsx` est pour l'imprévu.",
          },
        ],
      },
    ],
  },
  {
    id: "caching",
    title: "Le cache Next.js",
    level: 3,
    intro:
      "Quatre caches imbriqués : savoir lequel invalider.",
    blocks: [
      {
        kind: "fields",
        title: "Les couches",
        fields: [
          {
            label: "Request memoization",
            value:
              "Déduplique les `fetch` identiques pendant un rendu serveur. Automatique, invisible.",
          },
          {
            label: "Data cache",
            value:
              "Persiste les résultats de `fetch` entre requêtes (contrôlé par `revalidate` / `no-store`). La fraîcheur des données.",
          },
          {
            label: "Full route cache",
            value:
              "Le HTML/RSC des routes au build. Invalider via `revalidatePath` / `revalidateTag`.",
          },
          {
            label: "Router cache",
            value:
              "Côté navigateur : les segments déjà visités pour une navigation instantanée. Invalider via `router.refresh()`.",
          },
        ],
      },
      {
        kind: "text",
        text: "'Mes données ne se mettent pas à jour' = presque toujours un cache : identifier la couche (données ? route ? navigateur ?) puis invalider au bon niveau. `revalidateTag(\"produits\")` après chaque mutation est le pattern propre.",
      },
    ],
  },
  {
    id: "testing",
    title: "Testing",
    level: 3,
    intro:
      "Tester une app Next.js : composants, pages, e2e.",
    blocks: [
      {
        kind: "fields",
        title: "Les niveaux",
        fields: [
          {
            label: "Composants (Vitest + Testing Library)",
            value:
              "Tester les composants clients (interactions, rendus conditionnels) isolément. Les Server Components se testent via leurs fonctions de données.",
          },
          {
            label: "Routes API",
            value:
              "Appeler les handlers `GET`/`POST` en test avec des requêtes simulées : statuts, payloads, erreurs.",
          },
          {
            label: "E2E (Playwright)",
            value:
              "Parcours réels dans un vrai navigateur contre `npm run build && npm start` : navigation, formulaires, Server Actions. Le seul test qui valide l'assemblage.",
          },
        ],
      },
      {
        kind: "command",
        label: "Lancer les tests e2e",
        command: "npx playwright test",
        why: "Exécute les tests Playwright : nécessite `npx playwright install` au préalable pour les navigateurs. À lancer contre un build de production pour tester ce qui sera déployé.",
      },
    ],
  },
  {
    id: "debugging",
    title: "Debugging",
    level: 3,
    intro:
      "Débugger des deux côtés : serveur et navigateur.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Erreur d'hydratation",
            value:
              "Le HTML serveur diffère du premier rendu client (souvent : date/heure, `Math.random()`, extensions navigateur). Identifier le composant fautif via le message, rendre le contenu déterministe ou le reporter côté client.",
          },
          {
            label: "Hook dans un Server Component",
            value:
              "`useState` sans `\"use client\"` : l'erreur est explicite. Extraire la partie interactive dans un composant client.",
          },
          {
            label: "Page blanche après build",
            value:
              "Comparer `npm run dev` et `npm run build && npm start` : le build prérend les pages et révèle les erreurs (fetch qui échoue au build, variables manquantes).",
          },
          {
            label: "Données périmées",
            value:
              "Voir 'caching' : identifier la couche de cache en cause et invalider (`revalidateTag`, `router.refresh()`).",
          },
          {
            label: "Logs serveur",
            value:
              "Les `console.log` des Server Components apparaissent dans le terminal, pas dans la console navigateur : chercher au bon endroit.",
          },
        ],
      },
    ],
  },
  {
    id: "performance",
    title: "Performance",
    level: 3,
    intro:
      "Les leviers mesurables : Core Web Vitals et bundle.",
    blocks: [
      {
        kind: "fields",
        title: "Leviers",
        fields: [
          {
            label: "Moins de JS client",
            value:
              "Server Components par défaut, `\"use client\"` minimal et bas dans l'arbre : chaque ko de moins améliore l'interactivité.",
          },
          {
            label: "Images et polices",
            value:
              "`next/image` + `next/font` : les deux postes les plus rentables (LCP, CLS).",
          },
          {
            label: "Streaming",
            value:
              "Suspense/`loading.tsx` : afficher vite le reste pendant que le lent charge.",
          },
          {
            label: "Bundle analyzer",
            value:
              "`@next/bundle-analyzer` : visualiser ce qui pèse dans le bundle client et traquer les dépendances lourdes importées par erreur côté client.",
          },
        ],
      },
      {
        kind: "text",
        text: "Mesurer avec Lighthouse/PageSpeed avant d'optimiser, après chaque changement. Les intuitions de performance sont fausses une fois sur deux.",
      },
    ],
  },
  {
    id: "securite",
    title: "Sécurité",
    level: 3,
    intro:
      "Les règles spécifiques à l'architecture serveur/client.",
    blocks: [
      {
        kind: "list",
        items: [
          "Secrets uniquement côté serveur : jamais de clé dans un composant client ou une variable `NEXT_PUBLIC_`.",
          "Valider côté serveur : Server Actions et routes API revalident tout — le client n'est jamais de confiance.",
          "Authentification dans le middleware : protéger les routes avant le rendu, pas après.",
          "XSS : React échappe par défaut ; rester vigilant sur `dangerouslySetInnerHTML` et les URLs.",
          "Headers de sécurité : CSP, HSTS, X-Frame-Options via `next.config.ts` (headers).",
          "Dépendances à jour : `npm audit` régulier, mises à jour de Next.js suivies (correctifs de sécurité).",
        ],
      },
    ],
  },
  {
    id: "deploiement-vercel",
    title: "Déploiement sur Vercel",
    level: 3,
    intro:
      "La voie la plus simple : la plateforme des créateurs de Next.js.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Pousser sur GitHub",
            detail:
              "Le dépôt contient le projet (`node_modules` et `.env.local` exclus). Vercel déploie depuis Git.",
          },
          {
            title: "Importer le projet",
            detail:
              "Sur vercel.com : 'Add New Project', sélectionner le dépôt. Next.js est détecté automatiquement (build et commandes préremplies).",
          },
          {
            title: "Configurer les variables",
            detail:
              "Renseigner les variables d'environnement (production) dans les réglages du projet : elles remplacent le `.env.local`.",
          },
          {
            title: "Déployer",
            detail:
              "Chaque push sur la branche principale redéploie ; chaque PR obtient une URL de prévisualisation. Rollback en un clic vers un déploiement précédent.",
          },
        ],
      },
    ],
  },
  {
    id: "deploiement-docker",
    title: "Déploiement avec Docker",
    level: 3,
    intro:
      "L'alternative auto-hébergée : le build standalone.",
    blocks: [
      {
        kind: "code",
        language: "dockerfile",
        title: "Dockerfile — build standalone",
        code: "# next.config.ts : output: \"standalone\"\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine\nWORKDIR /app\nCOPY --from=builder /app/.next/standalone ./\nCOPY --from=builder /app/.next/static ./.next/static\nCOPY --from=builder /app/public ./public\nEXPOSE 3000\nCMD [\"node\", \"server.js\"]",
      },
      {
        kind: "text",
        text: "L'option `output: \"standalone\"` produit un serveur Node minimal : image légère, démarrage rapide. Les variables d'environnement sont injectées au runtime (pas au build) pour les valeurs non publiques.",
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
          "Serveur par défaut : `\"use client\"` uniquement pour l'interactivité, au plus bas dans l'arbre.",
          "Colocaliser : les composants proches de leur usage, pas dans un dossier global fourre-tout.",
          "Paralléliser les fetches indépendants : pas de waterfalls.",
          "Invalider le cache après mutation : `revalidateTag`/`revalidatePath` systématiques.",
          "Builder avant de déployer : `npm run build` en CI, toujours.",
          "SEO : `generateMetadata` sur chaque page publique, sitemap, URLs propres.",
          "Accessibilité : HTML sémantique, `alt` sur les images, navigation au clavier.",
          "Secrets côté serveur uniquement ; validation systématique des entrées.",
          "Tester l'assemblage en e2E sur le build de production.",
          "Mesurer la performance avant d'optimiser.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pièges classiques des développeurs Next.js.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "\"use client\" en haut d'une page",
            value:
              "Problem : toute la page devient un composant client, perdant les bénéfices serveur. Why : placé par habitude dès qu'un hook est nécessaire. Better : extraire le composant interactif, garder la page serveur.",
          },
          {
            label: "Erreur d'hydratation",
            value:
              "Problem : contenu serveur ≠ premier rendu client. Why : dates, aléatoire, état initial divergent. Better : contenu déterministe, ou reporter au client (`useEffect`).",
          },
          {
            label: "Fetch en cascade",
            value:
              "Problem : page lente malgré le serveur. Why : requêtes séquentielles dépendantes inutilement. Better : `Promise.all` pour l'indépendant.",
          },
          {
            label: "Secret exposé",
            value:
              "Problem : clé API visible dans le bundle. Why : utilisée dans un composant client ou préfixée `NEXT_PUBLIC_`. Better : fetch serveur uniquement.",
          },
          {
            label: "Cache jamais invalidé",
            value:
              "Problem : 'mes modifications n'apparaissent pas'. Why : data cache/route cache non invalidé après mutation. Better : `revalidateTag`/`revalidatePath` après chaque écriture.",
          },
          {
            label: "Link remplacé par <a>",
            value:
              "Problem : rechargements complets, navigation lente. Why : habitude HTML. Better : `next/link` pour la navigation interne.",
          },
          {
            label: "Images non optimisées",
            value:
              "Problem : LCP catastrophique. Why : `<img>` avec des fichiers lourds. Better : `next/image` avec dimensions et `priority` sur l'image principale.",
          },
          {
            label: "Ne builder qu'au déploiement",
            value:
              "Problem : le déploiement échoue sur des erreurs invisibles en dev. Why : on ne lance jamais `npm run build` en local. Better : builder en CI à chaque PR.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-avances",
    title: "Projets avancés",
    level: 3,
    intro:
      "Trois projets niveau production.",
    blocks: [
      {
        kind: "fields",
        title: "À réaliser",
        fields: [
          {
            label: "E-commerce avec panier",
            value:
              "Catalogue ISR, panier (état client + persistance), checkout via Server Actions, routes API pour les webhooks de paiement : le full-stack complet.",
          },
          {
            label: "SaaS multi-tenant",
            value:
              "Authentification, middleware de protection, rôles, facturation : l'application réelle avec ses contraintes.",
          },
          {
            label: "Blog haute performance",
            value:
              "SSG + ISR, images optimisées, SEO parfait (sitemap, métadonnées), score Lighthouse 95+ : la vitrine technique.",
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
          { label: "Documentation Next.js", value: "nextjs.org/docs : la référence — App Router, data fetching, cache, déploiement." },
          { label: "Learn Next.js", value: "nextjs.org/learn : le tutoriel officiel pas à pas, de zéro au déploiement." },
          { label: "Référence API", value: "Les pages de référence des fonctions (`fetch`, `revalidateTag`, `generateMetadata`…) : les détails exacts." },
        ],
      },
      {
        kind: "list",
        items: [
          "React : react.dev — la documentation React reste la moitié du savoir Next.js.",
          "Pratique : reconstruire un projet React existant en Next.js pour sentir la différence d'architecture.",
          "Communauté : les discussions GitHub du dépôt vercel/next.js pour les cas limites.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Next.js maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Architecturer le frontend : frontend-archi pour structurer les grosses applications.",
          "Aller full-stack : fullstack puis Node.js pour le backend dédié quand les routes API ne suffisent plus.",
          "Approfondir React : react-hooks et TypeScript pour un code plus robuste.",
          "Styler efficacement : Tailwind CSS, l'allié standard des projets Next.js.",
          "Revenir à la roadmap : valider Next.js et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
  {
    id: "parallel-intercepting-routes",
    title: "Routes parallèles et interceptées",
    level: 3,
    intro:
      "Les conventions avancées du routeur : `@slot` et `(..)`.",
    blocks: [
      {
        kind: "fields",
        title: "Concepts",
        fields: [
          {
            label: "Routes parallèles (@)",
            value:
              "Un dossier `@equipe/page.tsx` définit un slot affiché simultanément dans le même layout : dashboards avec plusieurs panneaux indépendants, chacun avec son `loading.tsx`.",
          },
          {
            label: "Routes interceptées",
            value:
              "`(..)photo` intercepte la navigation : afficher une photo en modale par-dessus la page, tout en gardant une URL partageable qui affiche la page complète au rechargement.",
          },
          {
            label: "Groupes de routes ( )",
            value:
              "Les dossiers entre parenthèses organisent sans affecter l'URL : `(marketing)/a-propos` → `/a-propos`, avec un layout propre au groupe.",
          },
        ],
      },
    ],
  },
  {
    id: "draft-mode",
    title: "Draft Mode : prévisualiser le brouillon",
    level: 3,
    intro:
      "Voir le contenu non publié : le mode brouillon.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Activer le draft mode via une route",
        code: "import { draftMode } from \"next/headers\"\nimport { redirect } from \"next/navigation\"\n\nexport async function GET(request: Request) {\n  const { searchParams } = new URL(request.url)\n  // … vérifier le secret …\n  ;(await draftMode()).enable()\n  redirect(searchParams.get(\"slug\") || \"/\")\n}",
      },
      {
        kind: "text",
        text: "Une fois activé, `(await draftMode()).isEnabled` permet de servir le contenu brouillon (CMS headless) au lieu du publié — sans rebuild, sans exposer les brouillons au public.",
      },
    ],
  },
  {
    id: "internationalisation",
    title: "Internationalisation (i18n)",
    level: 3,
    intro:
      "Un site multilingue : la stratégie recommandée.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Routes localisées : app/[lang]/page.tsx",
        code: "// middleware.ts — détecte et redirige vers /fr ou /en\nimport { NextResponse } from \"next/server\"\nimport type { NextRequest } from \"next/server\"\n\nconst locales = [\"fr\", \"en\"]\n\nexport function middleware(request: NextRequest) {\n  const { pathname } = request.nextUrl\n  const missing = locales.every((l) => !pathname.startsWith(`/${l}`))\n  if (missing) {\n    // … détecter la langue préférée …\n    return NextResponse.redirect(new URL(`/fr${pathname}`, request.url))\n  }\n}",
      },
      {
        kind: "list",
        items: [
          "Le pattern standard : segment `[lang]` dans les routes, dictionnaires par langue chargés côté serveur.",
          "Le middleware détecte la langue du navigateur (`Accept-Language`) et redirige.",
          "Chaque langue a ses métadonnées SEO (`generateMetadata` par locale).",
        ],
      },
    ],
  },
  {
    id: "redirects-rewrites",
    title: "Redirects et rewrites",
    level: 3,
    intro:
      "Rediriger et réécrire les URLs dans `next.config.ts`.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "next.config.ts",
        code: "const nextConfig = {\n  async redirects() {\n    return [\n      {\n        source: \"/ancien-blog/:slug\",\n        destination: \"/blog/:slug\",\n        permanent: true, // 308 : transmet le SEO\n      },\n    ]\n  },\n  async rewrites() {\n    return [\n      {\n        source: \"/api-externe/:path*\",\n        // Proxy : l'URL reste la même pour le visiteur\n        destination: \"https://api.exemple.com/:path*\",\n      },\n    ]\n  },\n}\nexport default nextConfig",
      },
      {
        kind: "list",
        items: [
          "Redirects : changent l'URL visible (301/308 permanents pour le SEO, 302/307 temporaires).",
          "Rewrites : servent un autre contenu sans changer l'URL — idéal pour proxifier une API en masquant les clés.",
        ],
      },
    ],
  },
  {
    id: "edge-runtime",
    title: "Edge Runtime",
    level: 3,
    intro:
      "Exécuter au plus près de l'utilisateur : le runtime edge.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "Route sur l'edge",
        code: "export const runtime = \"edge\"\n\nexport async function GET() {\n  // Géolocalisation, A/B testing, personnalisation légère\n  return Response.json({ message: \"Servi depuis l'edge\" })\n}",
      },
      {
        kind: "list",
        items: [
          "Le code s'exécute dans des régions proches du visiteur : latence minimale pour la personnalisation.",
          "Contraintes : pas d'accès Node.js complet (pas de `fs`, modules natifs) — logique légère uniquement.",
          "Cas d'usage : middleware géolocalisé, A/B testing, headers dynamiques. Le lourd reste sur Node.",
        ],
      },
    ],
  },
];

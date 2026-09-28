import type { SkillGuide } from "../skill-guides";
import { LEARNING_HTML } from "./learning-html";
import { LEARNING_CSS } from "./learning-css";
import { LEARNING_JAVASCRIPT } from "./learning-javascript";
import { LEARNING_REACT } from "./learning-react";
import { LEARNING_ANGULAR } from "./learning-angular";
import { LEARNING_VUE } from "./learning-vue";
import { LEARNING_ACCESSIBILITY } from "./learning-accessibility";
import { LEARNING_DESIGN_SYSTEMS } from "./learning-design-systems";
import { LEARNING_FRONTEND_ARCHITECTURE } from "./learning-frontend-architecture";
import { LEARNING_NEXTJS } from "./learning-nextjs";
import { LEARNING_PERFORMANCE } from "./learning-performance";
import { LEARNING_STATE_MANAGEMENT } from "./learning-state-management";
import { LEARNING_TESTING } from "./learning-testing";
import { LEARNING_TYPESCRIPT_FRONTEND } from "./learning-typescript-frontend";

/**
 * Guides pédagogiques — frontend : parcours Frontend Developer.
 *
 * Ces entrées enrichissent les compétences de la roadmap `frontend-developer`
 * (désignées par leur `id`) avec un contenu éditorial structuré :
 * définition, intérêt pédagogique, prérequis expliqués, concepts clés,
 * fonctionnement, exemple concret et projets progressifs.
 *
 * Conventions suivies :
 * - `prerequisiteNotes` : clés = ids EXACTS du tableau `prerequisites` du skill.
 * - `conceptDetails[].name` : reprend au plus proche le tableau `concepts` du skill.
 * - Ton : documentation technique premium, concret, sans marketing. Français.
 */
export const GUIDES_FRONTEND: Record<string, SkillGuide> = {
  // ------------------------------------------------------------------ html
  html: {
    learning: LEARNING_HTML,
    definition:
      "HTML (HyperText Markup Language) est le langage de balisage qui structure le contenu des pages web : titres, paragraphes, liens, images, formulaires. Chaque élément décrit le sens du contenu, pas son apparence.",
    whyLearn:
      "Tout le web repose sur HTML : frameworks, CMS et applications ne font que générer du HTML. Un HTML sémantique rend les pages accessibles aux lecteurs d'écran, compréhensibles par les moteurs de recherche et plus simples à styler et à maintenir. C'est le fondement sur lequel CSS et JavaScript s'appuient.",
    conceptDetails: [
      {
        name: "Éléments sémantiques",
        definition:
          "Des balises comme <header>, <article> ou <nav> décrivent le rôle du contenu, ce qui aide l'accessibilité, le SEO et la maintenance.",
      },
      {
        name: "Formulaires",
        definition:
          "Les <form>, <input> et <label> créent des zones de saisie : bien associés, ils sont utilisables au clavier et aux lecteurs d'écran sans aucun JavaScript.",
      },
      {
        name: "Accessibilité native",
        definition:
          "Utiliser le bon élément (un vrai <button>, une vraie liste) offre gratuitement des comportements accessibles qu'il faudrait sinon réimplémenter.",
      },
      {
        name: "SEO technique",
        definition:
          "Titres hiérarchisés, métadonnées, textes alternatifs : la structure HTML est la première chose que les moteurs de recherche lisent.",
      },
      {
        name: "DOM",
        definition:
          "Le navigateur transforme le HTML en DOM, un arbre d'objets que CSS stylise et que JavaScript manipule : c'est la représentation vivante de la page.",
      },
    ],
    howItWorksTitle: "Du HTML à la page affichée",
    howItWorks: ["DOCUMENT", "PARSING", "DOM", "RENDER TREE", "LAYOUT", "PAINT"],
    example: {
      title: "Une carte article",
      steps: [
        "Balise <article> pour le sens sémantique",
        "Titre <h2> puis paragraphe de résumé",
        "Image avec texte alternatif descriptif",
        "Lien « Lire la suite »",
        "Le navigateur construit le DOM correspondant",
      ],
    },
    projectsDetailed: [
      {
        title: "Page personnelle sémantique",
        flow: "Maquette → <header> / <main> / <footer> → Sections <section> → Validation W3C",
      },
      {
        title: "Formulaire accessible complet",
        flow: "Champs <label> → Types d'input adaptés → Validation native → Messages d'erreur",
      },
    ],
  },

  // ------------------------------------------------------------------ css
  css: {
    learning: LEARNING_CSS,
    definition:
      "CSS (Cascading Style Sheets) est le langage qui décrit la présentation des pages web : mise en page, couleurs, typographie, espacements et animations. Il sépare le fond (HTML) de la forme.",
    whyLearn:
      "CSS détermine la qualité perçue d'une interface : alignements précis, hiérarchie claire, adaptation mobile, micro-interactions. Le maîtriser, c'est passer d'interfaces approximatives à des interfaces nettes et cohérentes. Ses fondamentaux changent peu : c'est un investissement durable.",
    conceptDetails: [
      {
        name: "Flexbox & Grid",
        definition:
          "Flexbox aligne des éléments sur un axe, Grid compose des mises en page en deux dimensions : les deux systèmes couvrent 95 % des layouts modernes.",
      },
      {
        name: "Cascade & spécificité",
        definition:
          "Quand plusieurs règles ciblent un élément, la cascade tranche selon l'origine, la spécificité et l'ordre : comprendre ce mécanisme évite les !important sauvages.",
      },
      {
        name: "Responsive design",
        definition:
          "Media queries, unités fluides et grilles adaptatives : une même page s'ajuste du mobile au grand écran sans duplication de code.",
      },
      {
        name: "Variables CSS",
        definition:
          "Les custom properties (--couleur-primaire) centralisent les valeurs réutilisables et se modifient dynamiquement, y compris en JavaScript.",
      },
      {
        name: "Animations",
        definition:
          "Transitions et keyframes animent les changements d'état : elles guident l'œil et rendent les interfaces vivantes, à condition de rester sobres.",
      },
    ],
    howItWorksTitle: "Comment le style est appliqué",
    howItWorks: ["SÉLECTEUR", "CASCADE", "SPÉCIFICITÉ", "HÉRITAGE", "BOÎTES", "RENDU"],
    example: {
      title: "Une barre de navigation responsive",
      steps: [
        "HTML sémantique avec <nav> et liste de liens",
        "Flexbox pour aligner logo et liens",
        "Media query sous 768 px : liens masqués",
        "Bouton hamburger qui ouvre le menu",
        "Transition douce à l'ouverture",
      ],
    },
    projectsDetailed: [
      {
        title: "Clone d'une landing page",
        flow: "Capture d'écran → Grille de mise en page → Typographie → Version responsive",
      },
      {
        title: "Système de grille responsive",
        flow: "12 colonnes → Breakpoints → Gouttières → Tests sur mobile réel",
      },
    ],
  },

  // ------------------------------------------------------------------ javascript
  javascript: {
    learning: LEARNING_JAVASCRIPT,
    definition:
      "JavaScript est le langage de programmation du web : il rend les pages interactives en manipulant le DOM, en réagissant aux événements et en dialoguant avec des serveurs via des APIs.",
    whyLearn:
      "JavaScript est partout : navigateurs, serveurs avec Node.js, mobile, desktop. Comprendre ses mécanismes profonds — closures, modèle asynchrone, prototypes — distingue un utilisateur de framework d'un développeur qui débogue et conçoit. Tous les frameworks frontend ne sont que du JavaScript organisé.",
    prerequisiteNotes: {
      html: "Savoir structurer une page : JavaScript manipule le DOM que HTML décrit.",
      css: "Comprendre la présentation : JavaScript modifie aussi les styles et les classes des éléments.",
    },
    conceptDetails: [
      {
        name: "Closures & scope",
        definition:
          "Une closure est une fonction qui capture les variables de son contexte de création : le mécanisme derrière les callbacks, les modules et les hooks.",
      },
      {
        name: "Promesses & async/await",
        definition:
          "Les promesses représentent une valeur future (appel réseau, lecture de fichier) ; async/await permet d'écrire ce code asynchrone de façon lisible, presque synchrone.",
      },
      {
        name: "DOM & événements",
        definition:
          "Le DOM est l'arbre vivant de la page ; les événements (clic, saisie, scroll) permettent d'y réagir. La délégation d'événements optimise l'écoute sur de grandes listes.",
      },
      {
        name: "Modules ES",
        definition:
          "import et export découpent le code en modules aux dépendances explicites : la base de toute application maintenable et de tout bundler.",
      },
      {
        name: "Prototypes",
        definition:
          "L'héritage en JavaScript passe par des chaînes de prototypes : comprendre ce mécanisme éclaire le comportement des objets, des classes et du this.",
      },
    ],
    howItWorksTitle: "Le cycle d'un événement",
    howItWorks: ["EVENT", "LISTENER", "CALLBACK", "CALL STACK", "DOM UPDATE", "RENDER"],
    example: {
      title: "Un compteur interactif",
      steps: [
        "Bouton et affichage dans le HTML",
        "addEventListener sur le clic",
        "Variable d'état incrémentée",
        "Mise à jour du texte dans le DOM",
        "Réaffichage instantané, sans rechargement",
      ],
    },
    projectsDetailed: [
      {
        title: "Todo app sans framework",
        flow: "État en mémoire → Rendu DOM → Événements → Persistance localStorage",
      },
      {
        title: "Jeu du serpent en canvas",
        flow: "Boucle de jeu → Dessin canvas → Clavier → Score → Écran de fin",
      },
    ],
  },

  // ------------------------------------------------------------------ typescript
  typescript: {
    learning: LEARNING_TYPESCRIPT_FRONTEND,
    definition:
      "TypeScript est un sur-ensemble typé de JavaScript : il ajoute des types statiques vérifiés à la compilation, puis se compile en JavaScript standard exécutable partout.",
    whyLearn:
      "TypeScript détecte les erreurs avant l'exécution : propriétés inexistantes, mauvais types d'arguments, refactos cassées. Sur une base de code qui grandit, il documente les intentions et rend la maintenance sûre. C'est devenu le standard des projets frontend sérieux.",
    prerequisiteNotes: {
      javascript:
        "Maîtriser les fondamentaux (fonctions, objets, asynchrone) : TypeScript ajoute des types par-dessus, il ne remplace pas le langage.",
    },
    conceptDetails: [
      {
        name: "Generics",
        definition:
          "Les génériques paramètrent les types (Array<T>, Promise<T>) : des fonctions et structures réutilisables sans perdre la précision du typage.",
      },
      {
        name: "Interfaces & types",
        definition:
          "Ils décrivent la forme des objets : contrats explicites entre les parties du code, vérifiés automatiquement à chaque utilisation.",
      },
      {
        name: "Union types",
        definition:
          "string | null ou 'idle' | 'loading' | 'error' : les unions modélisent des états finis et forcent à traiter chaque cas.",
      },
      {
        name: "Type guards",
        definition:
          "Des vérifications à l'exécution (typeof, instanceof, prédicats) qui affinent le type dans une branche : le pont entre runtime et typage statique.",
      },
      {
        name: "Utility types",
        definition:
          "Partial, Pick, Omit, Record : des utilitaires intégrés pour dériver des types existants sans les redéfinir.",
      },
    ],
    howItWorksTitle: "Du .ts au .js",
    howItWorks: ["SOURCE TS", "INFÉRENCE", "VÉRIFICATION", "ERREURS", "ÉMISSION JS", "EXÉCUTION"],
    example: {
      title: "Typer une fonction de calcul",
      steps: [
        "Paramètre déclaré : price: number",
        "Type de retour : number",
        "Un appel avec une string est signalé",
        "L'erreur apparaît à la compilation",
        "Zéro bug de ce type en production",
      ],
    },
    projectsDetailed: [
      {
        title: "API REST typée de bout en bout",
        flow: "Schémas partagés → Contrats client/serveur → Erreurs détectées à la compilation",
      },
      {
        title: "Migration d'un projet JS vers TS",
        flow: "allowJs → Types progressifs → Mode strict → Suppression des any",
      },
    ],
  },

  // ------------------------------------------------------------------ react
  react: {
    learning: LEARNING_REACT,
    definition:
      "React est une bibliothèque JavaScript pour construire des interfaces à partir de composants : des fonctions qui décrivent l'UI en fonction de l'état, et que React met à jour efficacement quand l'état change.",
    whyLearn:
      "React est l'outil dominant du frontend : son modèle mental — composants, état, flux unidirectionnel — structure la façon dont on pense les interfaces modernes. Le maîtriser ouvre l'accès à l'écosystème le plus riche : Next.js, React Native et des milliers de bibliothèques.",
    prerequisiteNotes: {
      javascript:
        "Closures, tableaux, fonctions fléchées, modules : React s'écrit en JavaScript moderne, sans détour possible.",
    },
    conceptDetails: [
      {
        name: "Composants & props",
        definition:
          "Un composant est une fonction qui retourne de l'UI ; les props sont ses paramètres, en lecture seule, qui descendent du parent vers l'enfant.",
      },
      {
        name: "Hooks (useState, useEffect)",
        definition:
          "useState déclare un état local réactif, useEffect synchronise le composant avec l'extérieur (API, abonnements, DOM) : les deux hooks couvrent l'essentiel.",
      },
      {
        name: "Rendu conditionnel",
        definition:
          "Afficher ou masquer des portions d'UI selon l'état (opérateurs &&, ternaires, early returns) : l'UI devient une fonction pure de l'état.",
      },
      {
        name: "État local vs global",
        definition:
          "L'état proche de son usage reste local ; l'état partagé par de nombreux composants remonte ou migre vers un store : ce choix conditionne la maintenabilité.",
      },
      {
        name: "Refs",
        definition:
          "Les refs donnent accès à un nœud DOM ou conservent une valeur mutable sans déclencher de rendu : l'échappatoire contrôlée du modèle déclaratif.",
      },
    ],
    howItWorksTitle: "Le cycle de rendu",
    howItWorks: ["ÉTAT", "RENDER", "VIRTUAL DOM", "DIFF", "COMMIT", "DOM RÉEL"],
    example: {
      title: "Un champ de recherche filtrant",
      steps: [
        "useState stocke la requête de l'utilisateur",
        "Input contrôlé lié à cet état",
        "La liste est filtrée à chaque frappe",
        "Rendu conditionnel si aucun résultat",
        "Mise à jour instantanée, sans rechargement",
      ],
    },
    projectsDetailed: [
      {
        title: "Application de notes avec recherche",
        flow: "État local → Composants → Filtre temps réel → Sauvegarde localStorage",
      },
      {
        title: "Galerie avec appels API",
        flow: "useEffect → Fetch → États chargement/erreur → Grille d'images",
      },
    ],
  },

  // ------------------------------------------------------------------ nextjs
  nextjs: {
    learning: LEARNING_NEXTJS,
    definition:
      "Next.js est un framework React qui ajoute le rendu côté serveur, le routage par fichiers et les optimisations de production : l'outillage standard pour des applications React sérieuses.",
    whyLearn:
      "Next.js résout les angles morts de React pur : SEO, performance du premier chargement, routage, routes API intégrées. Il impose des conventions saines (App Router, Server Components) et se déploie en un clic. C'est la voie la plus directe du composant au produit réel.",
    prerequisiteNotes: {
      react: "Composants, hooks, état : Next.js orchestre React, il ne le remplace pas.",
      typescript:
        "Le typage des props, des routes et des données : indispensable dès que l'application grandit.",
    },
    conceptDetails: [
      {
        name: "App Router",
        definition:
          "Le routage se définit par l'arborescence de fichiers dans app/ : chaque dossier est une route, chaque page.tsx un écran, avec layouts imbriqués.",
      },
      {
        name: "SSR / SSG / ISR",
        definition:
          "Trois stratégies de rendu : page générée à chaque requête (SSR), au build (SSG), ou régénérée en arrière-plan (ISR) selon la fraîcheur requise.",
      },
      {
        name: "Server Components",
        definition:
          "Les composants serveur s'exécutent uniquement côté serveur : accès direct aux données, zéro JavaScript envoyé au client par défaut.",
      },
      {
        name: "Middleware",
        definition:
          "Du code qui s'exécute avant chaque requête : redirections, authentification, géolocalisation, sans toucher aux pages.",
      },
      {
        name: "Optimisations images",
        definition:
          "Le composant Image redimensionne, convertit et charge en différé automatiquement : la moitié des problèmes de performance disparaît.",
      },
    ],
    howItWorksTitle: "Le cycle d'une page",
    howItWorks: ["REQUEST", "ROUTER", "SERVER COMPONENT", "DATA FETCH", "HTML", "HYDRATION"],
    example: {
      title: "Une page d'article de blog",
      steps: [
        "Fichier app/blog/[slug]/page.tsx",
        "Génération statique au build (SSG)",
        "HTML servi instantanément au visiteur",
        "Hydratation : la page devient interactive",
        "Navigation suivante sans rechargement",
      ],
    },
    projectsDetailed: [
      {
        title: "Blog avec génération statique",
        flow: "Fichiers Markdown → Slugs dynamiques → Build statique → Déploiement",
      },
      {
        title: "Mini e-commerce",
        flow: "Catalogue → Panier (état global) → Page checkout → Confirmation de commande",
      },
    ],
  },

  // ------------------------------------------------------------------ testing
  testing: {
    learning: LEARNING_TESTING,
    definition:
      "Le testing consiste à vérifier automatiquement que le code se comporte comme prévu : tests unitaires, d'intégration et end-to-end forment un filet de sécurité contre les régressions.",
    whyLearn:
      "Sans tests, chaque modification est un pari. Les tests documentent les comportements attendus, sécurisent les refactos et rendent le déploiement continu possible. C'est ce qui distingue un prototype d'un produit maintenable en équipe.",
    prerequisiteNotes: {
      javascript:
        "Écrire des fonctions pures et testables : entrées claires, sorties prévisibles, pas d'effets cachés.",
      react:
        "Comprendre le rendu des composants : on teste ce que l'utilisateur voit et fait, pas l'implémentation interne.",
    },
    conceptDetails: [
      {
        name: "Tests unitaires (Vitest)",
        definition:
          "Ils vérifient une fonction ou un composant isolé : rapides, nombreux, ils forment la base de la pyramide des tests.",
      },
      {
        name: "Testing Library",
        definition:
          "Une approche qui teste les composants comme un utilisateur : par le texte visible et les rôles, jamais par les détails d'implémentation.",
      },
      {
        name: "Tests E2E (Playwright)",
        definition:
          "Un vrai navigateur piloté automatiquement parcourt les scénarios critiques (inscription, achat) : lents mais irremplaçables.",
      },
      {
        name: "Mocks",
        definition:
          "Simuler les dépendances (API, timers, modules) pour tester un composant de façon déterministe, sans réseau ni hasard.",
      },
      {
        name: "TDD",
        definition:
          "Test-Driven Development : écrire le test avant le code (rouge → vert → refactor) pour concevoir des APIs simples et un code testable.",
      },
    ],
    howItWorksTitle: "Le cycle du TDD",
    howItWorks: ["RED", "GREEN", "REFACTOR", "SUITE", "CI", "CONFIANCE"],
    example: {
      title: "Tester un formulaire de contact",
      steps: [
        "Rendu du composant dans le test",
        "Simulation de saisie dans les champs",
        "Clic sur le bouton Envoyer",
        "Vérification du message de succès",
        "Cas d'erreur : champ vide → message adapté",
      ],
    },
    projectsDetailed: [
      {
        title: "Suite de tests pour une app existante",
        flow: "Parcours critiques → Tests unitaires → Tests d'intégration → Lancement en CI",
      },
      {
        title: "Pipeline CI avec tests E2E",
        flow: "Scénarios Playwright → Exécution en CI → Rapport → Blocage du merge si échec",
      },
    ],
  },

  // ------------------------------------------------------------------ state-management
  "state-management": {
    learning: LEARNING_STATE_MANAGEMENT,
    definition:
      "Le state management organise les données d'une application frontend : où vit l'état, comment il circule entre composants, comment il se synchronise avec le serveur.",
    whyLearn:
      "Dès qu'une application grandit, l'état éparpillé devient ingérable : props qui descendent sur cinq niveaux, données serveur mélangées à l'UI. Choisir la bonne stratégie — état local, store client, cache serveur — est une décision d'architecture qui conditionne la maintenabilité.",
    prerequisiteNotes: {
      react:
        "useState, useReducer et Context : comprendre les limites de l'état local avant de le remplacer par un store.",
    },
    conceptDetails: [
      {
        name: "Zustand / Redux",
        definition:
          "Des stores externes à React qui centralisent l'état partagé : Zustand pour la simplicité, Redux Toolkit quand la traçabilité prime.",
      },
      {
        name: "React Query (server state)",
        definition:
          "Le cache serveur n'est pas de l'état UI : React Query gère récupération, cache, invalidation et synchronisation avec le backend.",
      },
      {
        name: "Context vs stores",
        definition:
          "Context diffuse des valeurs stables (thème, langue) mais re-rend tout à chaque changement : les stores offrent des sélecteurs fins.",
      },
      {
        name: "Normalisation",
        definition:
          "Stocker les entités par id plutôt qu'imbriquées évite les duplications et les mises à jour incohérentes entre écrans.",
      },
      {
        name: "Persistance",
        definition:
          "Sauvegarder une partie de l'état (panier, préférences) en localStorage pour le retrouver après rechargement, avec réhydratation contrôlée.",
      },
    ],
    howItWorksTitle: "Le flux de données",
    howItWorks: ["ACTION", "STORE", "SÉLECTEUR", "COMPOSANT", "RENDER", "SYNC"],
    example: {
      title: "Un panier d'achat",
      steps: [
        "Clic sur « Ajouter » → action vers le store",
        "Chaque composant s'abonne via un sélecteur",
        "Le total est dérivé, jamais stocké",
        "Persistance en localStorage",
        "Synchronisation avec le serveur au checkout",
      ],
    },
    projectsDetailed: [
      {
        title: "App avec cache serveur intelligent",
        flow: "React Query → Clés de cache → Invalidation → UI optimiste",
      },
      {
        title: "Refactor d'un état global chaotique",
        flow: "Audit de l'existant → Découpage en stores → Sélecteurs → Suppression du prop drilling",
      },
    ],
  },

  // ------------------------------------------------------------------ performance
  performance: {
    learning: LEARNING_PERFORMANCE,
    definition:
      "La performance web mesure la rapidité ressentie d'une application : temps de chargement, réactivité aux interactions, fluidité visuelle. Les Core Web Vitals en sont la mesure standard.",
    whyLearn:
      "Chaque seconde de chargement en plus fait chuter la conversion et le référencement. La performance est une fonctionnalité : elle se mesure avec des outils, pas à l'intuition. Savoir profiler puis optimiser distingue un développeur qui livre vite d'un développeur qui livre vite et bien.",
    prerequisiteNotes: {
      react:
        "Comprendre le rendu et les re-renders : on n'optimise efficacement que ce que l'on mesure.",
      nextjs:
        "Code splitting, images, SSR : le framework offre les leviers, encore faut-il savoir les activer.",
    },
    conceptDetails: [
      {
        name: "Core Web Vitals",
        definition:
          "LCP (chargement), INP (interactivité), CLS (stabilité visuelle) : les trois métriques que Google utilise pour évaluer l'expérience réelle.",
      },
      {
        name: "Code splitting",
        definition:
          "Découper le bundle JavaScript pour ne charger que le nécessaire par route : moins de code initial, démarrage plus rapide.",
      },
      {
        name: "Mémoïsation",
        definition:
          "useMemo et useCallback évitent de recalculer ou de recréer à chaque rendu : utile sur les composants coûteux, nuisible en abus.",
      },
      {
        name: "Images & fonts",
        definition:
          "Formats modernes, dimensions adaptées, chargement différé, font-display : les ressources lourdes sont le premier goulot.",
      },
      {
        name: "Profiling",
        definition:
          "Le Profiler React et l'onglet Performance du navigateur identifient les rendus coûteux : mesurer d'abord, optimiser ensuite.",
      },
    ],
    howItWorksTitle: "Le chemin critique du chargement",
    howItWorks: ["REQUÊTE", "HTML", "CSS / JS", "HYDRATATION", "INTERACTIF", "MESURE"],
    example: {
      title: "Une page qui rame",
      steps: [
        "Lighthouse : LCP à 4,2 secondes",
        "Coupable : image hero non optimisée",
        "next/image + chargement différé",
        "Bundle découpé par route",
        "LCP redescendu à 1,1 seconde",
      ],
    },
    projectsDetailed: [
      {
        title: "Audit Lighthouse : 60 → 95+",
        flow: "Mesure initiale → Goulots identifiés → Correctifs → Re-mesure documentée",
      },
      {
        title: "Optimisation d'une app lente",
        flow: "Profiler → Mémoïsation ciblée → Virtualisation des listes → Cache",
      },
    ],
  },

  // ------------------------------------------------------------------ accessibility
  accessibility: {
    learning: LEARNING_ACCESSIBILITY,
    definition:
      "L'accessibilité web consiste à rendre les interfaces utilisables par tout le monde : navigation au clavier, lecteurs d'écran, contrastes suffisants, alternatives textuelles.",
    whyLearn:
      "Une part importante de la population vit avec un handicap, et les bonnes pratiques d'accessibilité profitent à tous (mobile, vieillissement, contextes difficiles). C'est aussi une obligation légale croissante et un critère de qualité. L'accessibilité se conçoit dès le départ, elle ne se rajoute pas.",
    prerequisiteNotes: {
      html: "La sémantique HTML offre l'accessibilité native : un vrai <button> est déjà accessible.",
      css: "Contrastes, focus visibles, tailles de cibles : le visuel porte une partie de l'accessibilité.",
      react:
        "Les composants sur mesure (dialog, menu) doivent réimplémenter les comportements natifs : rôles, focus, clavier.",
    },
    conceptDetails: [
      {
        name: "WCAG 2.2",
        definition:
          "Les Web Content Accessibility Guidelines définissent les critères d'accessibilité (niveaux A, AA, AAA) : la référence internationale.",
      },
      {
        name: "Navigation clavier",
        definition:
          "Tab, Entrée, Échap, flèches : toute action faisable à la souris doit l'être au clavier, avec un focus toujours visible.",
      },
      {
        name: "ARIA",
        definition:
          "Des attributs (role, aria-label, aria-expanded) qui enrichissent la sémantique quand le HTML seul ne suffit pas : à utiliser avec parcimonie.",
      },
      {
        name: "Contrastes",
        definition:
          "Un ratio de 4.5:1 minimum entre texte et fond (AA) garantit la lisibilité, y compris en plein soleil ou avec une vue basse.",
      },
      {
        name: "Lecteurs d'écran",
        definition:
          "NVDA, VoiceOver : tester avec un vrai lecteur d'écran révèle ce que les audits automatisés ne voient pas.",
      },
    ],
    howItWorksTitle: "Le parcours d'un lecteur d'écran",
    howItWorks: ["FOCUS", "RÔLE", "NOM", "ÉTAT", "ANNONCE", "ACTION"],
    example: {
      title: "Un menu déroulant accessible",
      steps: [
        "Bouton avec aria-expanded",
        "Liste structurée avec les bons rôles",
        "Navigation aux flèches du clavier",
        "Échap ferme et restaure le focus",
        "Annonce correcte au lecteur d'écran",
      ],
    },
    projectsDetailed: [
      {
        title: "Audit d'accessibilité d'un site",
        flow: "Outil automatisé (Axe) → Navigation clavier → Lecteur d'écran → Plan de correctifs",
      },
      {
        title: "Composants accessibles",
        flow: "Rôles ARIA → Focus trap → Tests clavier → Documentation d'usage",
      },
    ],
  },

  // ------------------------------------------------------------------ frontend-architecture
  "frontend-architecture": {
    learning: LEARNING_FRONTEND_ARCHITECTURE,
    definition:
      "L'architecture frontend définit l'organisation d'une application : découpage en modules, frontières entre couches, conventions partagées et décisions documentées pour rester maintenable quand l'équipe grandit.",
    whyLearn:
      "Un projet qui grandit sans architecture devient un enchevêtrement où chaque changement casse autre chose. Penser en systèmes — features isolées, dépendances explicites, décisions tracées — permet à une équipe de livrer vite sans accumuler une dette qui finit par paralyser.",
    prerequisiteNotes: {
      typescript:
        "Des types stricts dessinent les frontières : contrats entre modules, pas d'objets opaques qui fuient partout.",
      testing:
        "Une architecture se prouve par ses tests : des modules testables isolément valident le découpage.",
      performance:
        "Le découpage conditionne le chargement : une feature bien isolée devient un chunk chargeable à la demande.",
    },
    conceptDetails: [
      {
        name: "Feature-based structure",
        definition:
          "Organiser le code par fonctionnalité métier plutôt que par type de fichier : chaque feature regroupe ses composants, sa logique et ses tests.",
      },
      {
        name: "Design patterns",
        definition:
          "Des solutions éprouvées aux problèmes récurrents (composition, providers, state machines) : un vocabulaire partagé pour concevoir.",
      },
      {
        name: "Micro-frontends",
        definition:
          "Découper une grande application en sous-applications déployables indépendamment : puissant, mais un coût de complexité à ne payer qu'à grande échelle.",
      },
      {
        name: "ADR",
        definition:
          "Les Architecture Decision Records documentent le contexte, les options et la décision : la mémoire technique de l'équipe.",
      },
      {
        name: "Dette technique",
        definition:
          "Les raccourcis conscients s'accumulent comme une dette : la mesurer, la prioriser et la rembourser fait partie du travail d'architecture.",
      },
    ],
    howItWorksTitle: "D'une feature à la production",
    howItWorks: ["FEATURE", "MODULE", "CONTRAT", "TEST", "BUILD", "DÉPLOIEMENT"],
    example: {
      title: "Découper une application monolithique",
      steps: [
        "Inventaire des écrans et de leurs dépendances",
        "Regroupement en features métier",
        "Définition des APIs internes entre modules",
        "Migration progressive, feature par feature",
        "Dette résiduelle mesurée et planifiée",
      ],
    },
    projectsDetailed: [
      {
        title: "Refonte architecturale d'une app",
        flow: "Audit de l'existant → Architecture cible → Migration incrémentale → ADRs",
      },
      {
        title: "Rédaction d'ADRs",
        flow: "Contexte → Options envisagées → Décision → Conséquences assumées",
      },
    ],
  },

  // ------------------------------------------------------------------ design-systems
  "design-systems": {
    learning: LEARNING_DESIGN_SYSTEMS,
    definition:
      "Un design system est l'ensemble des tokens, composants et règles qui garantissent la cohérence d'un produit : une source unique de vérité partagée entre design et code.",
    whyLearn:
      "Sans design system, chaque équipe réinvente ses boutons et ses espacements : incohérences visuelles, dette, temps perdu. Un bon design system accélère toute l'organisation produit et rend l'accessibilité systématique au lieu d'être artisanale.",
    prerequisiteNotes: {
      css: "Variables, cascade, spécificité : les design tokens sont du CSS industrialisé.",
      react: "Composants, props, composition : la bibliothèque vit dans le framework de l'équipe.",
      accessibility:
        "Un composant partagé doit être accessible par construction, pour chacun de ses usages.",
    },
    conceptDetails: [
      {
        name: "Design tokens",
        definition:
          "Les valeurs fondamentales (couleurs, espacements, typographies) nommées et versionnées : une modification se propage partout.",
      },
      {
        name: "Storybook",
        definition:
          "L'atelier qui présente chaque composant isolément, avec ses variants et ses états : documentation vivante et terrain de test visuel.",
      },
      {
        name: "Documentation",
        definition:
          "Règles d'usage, exemples, contre-exemples : un composant sans documentation sera mal utilisé, aussi bon soit-il.",
      },
      {
        name: "Versioning",
        definition:
          "Le versionnage sémantique des composants permet aux équipes d'adopter les changements à leur rythme, sans casses surprises.",
      },
      {
        name: "Gouvernance",
        definition:
          "Qui décide, qui contribue, qui valide : sans gouvernance claire, le système se fragmente dès la deuxième équipe.",
      },
    ],
    howItWorksTitle: "De la décision au composant",
    howItWorks: ["TOKEN", "COMPOSANT", "DOC", "VERSION", "ADOPTION", "FEEDBACK"],
    example: {
      title: "Un bouton partagé",
      steps: [
        "Token de couleur issu de la palette",
        "Variants : tailles, états, intentions",
        "Story documentée dans Storybook",
        "Test d'accessibilité au clavier",
        "Publication en version 1.2.0",
      ],
    },
    projectsDetailed: [
      {
        title: "Bibliothèque de 15 composants",
        flow: "Inventaire des besoins → Tokens → Composants → Documentation Storybook",
      },
      {
        title: "Migration d'une app vers le design system",
        flow: "Audit des écarts → Remplacements progressifs → Tests de non-régression visuelle",
      },
    ],
  },

  // ------------------------------------------------------------------ vue
  vue: {
    learning: LEARNING_VUE,
    "conceptDetails": [
      {
        "definition": "Le cœur de Vue : `ref()` et `reactive()` encapsulent des valeurs dans des proxies JavaScript qui notifient le framework à chaque modification, déclenchant un re-rendu ciblé sans manipulation manuelle du DOM.",
        "name": "Réactivité"
      },
      {
        "definition": "Unités d'interface autonomes (fichiers `.vue`) qui reçoivent des données via les props et signalent les événements vers le parent via `emit`. Ils se composent comme des briques pour former des pages entières.",
        "name": "Composants"
      },
      {
        "definition": "Attributs spéciaux du template qui ajoutent du comportement au DOM : `v-if` pour le rendu conditionnel, `v-for` pour les listes, `v-model` pour la liaison bidirectionnelle des formulaires, `v-bind` et `v-on` pour les attributs et événements.",
        "name": "Directives"
      },
      {
        "definition": "Le style moderne d'écriture des composants avec `<script setup>` : `ref`, `computed` et `watch` organisent la logique par fonctionnalité plutôt que par option, et facilitent sa réutilisation via les composables.",
        "name": "Composition API"
      },
      {
        "definition": "Le routeur officiel : il associe des URL à des composants, gère les paramètres et les routes imbriquées, et protège les pages via des gardes de navigation. Le chargement différé des routes garde le bundle initial léger.",
        "name": "Vue Router"
      },
      {
        "definition": "Le store officiel de Vue : il centralise l'état partagé (utilisateur connecté, panier, préférences) avec des `stores` composés d'état, de getters calculés et d'actions. Remplace les props qui descendraient sur dix niveaux.",
        "name": "Pinia"
      }
    ],
    "definition": "Vue.js est un framework JavaScript progressif pour construire des interfaces utilisateur à partir de composants : un template déclaratif se lie à un état réactif, et Vue synchronise le DOM automatiquement quand l'état change. Il s'adopte par incréments, d'une simple portion de page à une application complète avec routage et store.",
    "environment": [
      "Node.js LTS installé et vérifié via `node --version`",
      "npm fonctionnel, vérifié via `npm --version`",
      "Git disponible pour versionner le projet (`git --version`)",
      "Un navigateur récent (Chrome ou Firefox) pour tester le rendu",
      "VS Code avec l'extension « Vue (Official) », ou WebStorm"
    ],
    "example": {
      "steps": [
        "Générez le projet avec `npm create vue@latest` puis démarrez-le avec `npm run dev`",
        "Créez un composant `TodoList.vue` : un `ref([])` stocke les tâches, un `ref('')` la recherche",
        "Liez un champ de recherche avec `v-model` et filtrez la liste via un `computed`",
        "Affichez les tâches avec `v-for` et un bouton qui bascule leur état via un gestionnaire d'événement `@click`",
        "Vérifiez dans le navigateur : chaque frappe filtre instantanément la liste, sans rechargement"
      ],
      "title": "Une liste de tâches filtrable"
    },
    "howItWorks": [
      "ÉTAT RÉACTIF",
      "PROXY",
      "TEMPLATE",
      "VIRTUAL DOM",
      "DIFF",
      "PATCH"
    ],
    "howItWorksTitle": "De l'état au DOM",
    "prerequisiteNotes": {
      "javascript": "Maîtriser le DOM, les événements et les modules ES : Vue s'appuie directement dessus."
    },
    "projectsDetailed": [
      {
        "flow": "Scaffolding create-vue → Composant de recherche (v-model) → Appel API météo → Affichage conditionnel (v-if) → Build de production",
        "title": "Application météo avec recherche de ville"
      },
      {
        "flow": "Vue Router (routes articles/auteurs) → Pinia (articles, favoris) → Composables (fetch réutilisable) → Formulaires commentés (v-model) → Déploiement statique",
        "title": "Blog avec routage et état global"
      },
      {
        "flow": "WebSocket dans un composable → Store Pinia synchronisé → Graphiques mis à jour par la réactivité → Routes protégées par gardes → Tests et build optimisé",
        "title": "Tableau de bord temps réel"
      }
    ],
    "setup": {
      "configure": [
        "Chaque composant est un fichier `.vue` en trois blocs : `<template>` pour le markup, `<script setup>` pour la logique, `<style scoped>` pour le CSS isolé au composant. C'est la convention Single-File Component à respecter dès le départ.",
        "Le fichier `vite.config.ts` centralise la configuration du build : plugins Vue, alias de chemins (ex. `@` vers `src/`). Ajoutez-y l'alias `@` pour éviter les chemins relatifs profonds dès les premiers imports.",
        "Si vous avez activé TypeScript lors du scaffolding, `tsconfig.json` règle le typage des templates et des props : laissez la configuration générée en place tant que vous ne savez pas exactement ce que vous changez."
      ],
      "editors": [
        "VS Code avec l'extension « Vue (Official) » : coloration, autocomplétion et vérification de types dans les blocs `<template>`, `<script>` et `<style>` des fichiers `.vue`.",
        "WebStorm : support intégré de Vue (completion des templates, navigation entre blocs, inspection des props) sans extension supplémentaire."
      ],
      "install": [
        "Exécutez `npm create vue@latest` : l'assistant officiel `create-vue` génère le squelette du projet. Répondez à ses questions (TypeScript, Vue Router, Pinia...) ; vérifiez que le dossier du projet est créé avec `package.json` à sa racine.",
        "Exécutez `npm install` dans le dossier du projet : installe les dépendances déclarées dans `package.json`. Vérifiez la fin du journal d'installation (aucune erreur) et la présence du dossier `node_modules/`.",
        "Exécutez `npm run dev` : démarre le serveur de développement Vite avec rechargement à chaud. Vérifiez que le terminal affiche une URL locale et que l'application s'affiche en l'ouvrant dans le navigateur.",
        "Exécutez `npm run build` : compile et optimise le projet pour la production. Vérifiez la création du dossier `dist/` contenant les fichiers statiques prêts à être déployés."
      ],
      "workflow": [
        "Travaillez avec `npm run dev` en permanence : le rechargement à chaud reflète chaque modification du template ou du script quasi instantanément. Un changement d'état visible à l'écran sans rechargement confirme que la réactivité fonctionne.",
        "Débuggez avec l'extension navigateur officielle Vue DevTools : elle inspecte l'arbre des composants, leurs props et leur état réactif en direct. Si l'extension ne détecte pas l'application, vérifiez que vous êtes bien en mode développement.",
        "Avant chaque déploiement, exécutez `npm run build` et corrigez les avertissements affichés : un build propre sans erreurs est la condition d'une mise en production sereine."
      ]
    },
    "whyLearn": "Vue combine la courbe d'apprentissage la plus douce des grands frameworks avec un modèle de production complet : réactivité intuitive, Single-File Components lisibles, écosystème officiel cohérent (Router, Pinia). C'est le choix pragmatique pour des équipes qui veulent livrer vite sans sacrifier la structure."
  }
,
  // ------------------------------------------------------------------ angular
  angular: {
    learning: LEARNING_ANGULAR,
    "conceptDetails": [
      {
        "definition": "Classes TypeScript décorées avec `@Component` qui associent un template HTML, des styles et de la logique. Chaque composant contrôle une portion de l'écran ; l'application entière est un arbre de composants.",
        "name": "Composants"
      },
      {
        "definition": "L'injection de dépendances fournit les services (classes `@Injectable` : appels HTTP, logique métier) aux composants qui les demandent dans leur constructeur. Un même service partagé reste une instance unique : l'état est cohérent partout.",
        "name": "Services & DI"
      },
      {
        "definition": "La bibliothèque de programmation réactive d'Angular : les `Observable` modélisent les flux asynchrones (requêtes HTTP, événements, formulaires). Les opérateurs (`map`, `filter`, `switchMap`) transforment ces flux, et le pipe `async` du template gère l'abonnement automatiquement.",
        "name": "RxJS"
      },
      {
        "definition": "Deux approches : les formulaires pilotés par template (simples, déclaratifs) et les formulaires réactifs (`FormControl`, `FormGroup`, `Validators`) qui décrivent le formulaire en TypeScript. Les réactifs dominent dès que la validation devient sérieuse.",
        "name": "Formulaires"
      },
      {
        "definition": "Le routeur associe des chemins d'URL aux composants, avec paramètres, routes enfants et chargement différé des modules. Les gardes (`CanActivate`) protègent les routes selon l'authentification ou les rôles.",
        "name": "Router"
      },
      {
        "definition": "Le système de réactivité moderne d'Angular (depuis v16) : `signal()` crée une valeur réactive, `computed()` en dérive une valeur, `effect()` réagit aux changements. Plus simple et plus performant que la détection de changements par défaut pour l'état local.",
        "name": "Signals"
      }
    ],
    "definition": "Angular est un framework TypeScript complet, maintenu par Google, pour construire des applications web d'entreprise : composants, injection de dépendances, routage et formulaires sont intégrés dans une architecture opinionée. Tout passe par son CLI, qui génère, sert, teste et compile les projets.",
    "environment": [
      "Node.js LTS installé et vérifié via `node --version`",
      "npm fonctionnel, vérifié via `npm --version`",
      "Angular CLI installé en global et vérifié via `ng version`",
      "Un navigateur récent (Chrome recommandé pour `ng test` et le debug)",
      "VS Code avec l'extension « Angular Language Service », ou WebStorm"
    ],
    "example": {
      "steps": [
        "Générez le projet avec `ng new mon-app` (avec routage) et démarrez-le avec `ng serve`",
        "Créez un composant avec `ng generate component inscription`",
        "Décrivez le formulaire en réactif : `FormGroup` avec `FormControl` pour chaque champ et `Validators.required`, `Validators.email`",
        "Affichez les erreurs dans le template quand un champ est touché et invalide, et désactivez le bouton tant que le formulaire est invalide",
        "Soumettez vers un service qui envoie les données en HTTP ; vérifiez la requête dans l'onglet réseau du navigateur"
      ],
      "title": "Un formulaire d'inscription avec validation"
    },
    "howItWorks": [
      "MODULE",
      "COMPONENT",
      "TEMPLATE",
      "DATA BINDING",
      "CHANGE DETECTION",
      "RENDU"
    ],
    "howItWorksTitle": "Le cycle d'une application",
    "prerequisiteNotes": {
      "typescript": "Angular est écrit en TypeScript : types, classes et décorateurs sont indispensables."
    },
    "projectsDetailed": [
      {
        "flow": "ng new → Composants liste/détail → Service en mémoire (DI) → Router (routes paramétrées) → Build",
        "title": "Carnet d'adresses"
      },
      {
        "flow": "Formulaires réactifs (login) → Guard CanActivate → Service HTTP + intercepteur JWT → RxJS (switchMap, catchError) → Tests ng test → Build production",
        "title": "Back-office avec authentification"
      },
      {
        "flow": "Modules lazy-loaded → Signals pour l'état local → Store/state partagé via services → Tests unitaires + e2e → Budgets de bundle et optimisation du build",
        "title": "Plateforme e-learning modulaire"
      }
    ],
    "setup": {
      "configure": [
        "Le fichier `angular.json` centralise la configuration du workspace : projets, builds, assets, budgets de taille des bundles. Laissez les valeurs générées par défaut jusqu'à en comprendre chaque section.",
        "Les fichiers `src/environments/` séparent les variables par environnement (URL d'API de dev vs de prod). Le build de production substitue automatiquement le bon fichier : ne codez jamais une URL d'API en dur dans un service.",
        "Pour le développement local contre une API, créez un fichier proxy (ex. `proxy.conf.json`) et servez avec l'option correspondante : les appels `/api` sont redirigés vers le backend sans problème CORS. Vérifiez dans l'onglet réseau du navigateur que les requêtes atteignent bien le backend."
      ],
      "editors": [
        "VS Code avec l'extension « Angular Language Service » : autocomplétion et vérification de types dans les templates HTML, navigation vers les définitions des composants.",
        "WebStorm : support Angular intégré (templates, injection de dépendances, refactoring des composants) sans extension supplémentaire."
      ],
      "install": [
        "Exécutez `npm install -g @angular/cli` : installe la CLI Angular en global sur votre machine. Vérifiez avec `ng version`, qui doit afficher les versions d'Angular, de Node.js et du gestionnaire de paquets.",
        "Exécutez `ng version` seul à tout moment pour diagnostiquer l'environnement : il liste les versions installées du framework, du CLI et des dépendances. Des versions incohérentes ici expliquent la plupart des erreurs de build.",
        "Exécutez `ng new mon-app` : génère l'arborescence complète du projet (configuration, dossier `src/`, tests). Répondez aux questions (routage, style) ; vérifiez que le dossier `mon-app/` est créé et contient `angular.json`.",
        "Exécutez `ng generate component nom` dans le projet : crée les quatre fichiers d'un composant (TypeScript, template, styles, test). Vérifiez leur présence dans `src/app/nom/` et l'enregistrement automatique du composant."
      ],
      "workflow": [
        "Développez avec `ng serve` : serveur local avec rechargement à chaud sur `http://localhost:4200`. Chaque sauvegarde recompile ; une erreur de compilation TypeScript s'affiche directement dans le terminal et le navigateur.",
        "Générez tout avec la CLI (`ng generate service`, `ng generate guard`...) plutôt qu'en créant les fichiers à la main : les conventions de nommage et d'enregistrement sont respectées automatiquement.",
        "Testez avec `ng test` : lance la suite Karma/Jasmine dans le navigateur. Des tests verts avant chaque commit garantissent que la refactorisation n'a rien cassé.",
        "Livrez avec `ng build` : compile en mode production (optimisations, tree-shaking). Vérifiez le dossier `dist/` et les tailles de bundles affichées dans le rapport de build."
      ]
    },
    "whyLearn": "Angular est le standard des grandes applications d'équipe : son architecture imposée (modules, services, typage strict) rend le code prévisible à grande échelle. Le maîtriser ouvre les postes entreprise et donne une culture solide de l'ingénierie frontend : DI, RxJS, tests."
  }
,
};

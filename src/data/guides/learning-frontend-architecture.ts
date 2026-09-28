import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète d'Architecture Frontend : organiser une application
 * pour qu'elle reste maintenable quand le code et l'équipe grandissent.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_FRONTEND_ARCHITECTURE: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce que recouvre l'architecture frontend : bien plus que du découpage de fichiers.",
    blocks: [
      {
        kind: "text",
        text: "L'architecture frontend définit l'organisation d'une application : découpage en modules, frontières entre couches, conventions partagées et décisions documentées. Son objectif est simple : que le projet reste compréhensible et modifiable quand il passe de 2 000 à 200 000 lignes, et d'un développeur à une équipe.",
      },
      {
        kind: "diagram",
        title: "Les quatre piliers de l'architecture frontend",
        lines: [
          "DÉCOUPAGE",
          "     │  regrouper le code par fonctionnalité métier,",
          "     │  pas par type de fichier",
          "     ▼",
          "FRONTIÈRES",
          "     │  décider qui peut dépendre de qui,",
          "     │  et l'imposer avec des outils",
          "     ▼",
          "CONVENTIONS",
          "     │  nommage, structure, patterns partagés :",
          "     │  le code se lit pareil partout",
          "     ▼",
          "DÉCISIONS",
          "        documentées (ADRs) : pourquoi ce choix,",
          "        quelles alternatives écartées",
        ],
      },
      {
        kind: "text",
        text: "L'architecture n'est pas un gros document rédigé une fois au début. C'est un ensemble de décisions petites et réversibles, appliquées chaque jour et documentées quand elles comptent. Un bon test : un nouveau développeur comprend où ajouter une fonctionnalité en moins d'une journée.",
      },
    ],
  },
  {
    id: "cout-absence-architecture",
    title: "Le coût d'une architecture absente",
    level: 1,
    intro:
      "Pourquoi investir du temps dans l'organisation du code plutôt que dans des fonctionnalités.",
    blocks: [
      {
        kind: "text",
        text: "Sans architecture, chaque fonctionnalité s'ajoute là où c'est le plus rapide. Au début, tout va vite. Puis les dépendances s'entremêlent : modifier un composant casse un écran lointain, ajouter une page demande de comprendre tout le projet. C'est le « big ball of mud » : le code fonctionne, mais personne n'ose le toucher.",
      },
      {
        kind: "fields",
        title: "Symptômes d'une architecture absente",
        fields: [
          {
            label: "Peur de modifier",
            value:
              "Chaque changement provoque des régressions imprévues : les dépendances sont implicites, rien n'isole les effets de bord.",
          },
          {
            label: "Onboarding de plusieurs semaines",
            value:
              "Un nouveau venu doit tout comprendre avant de produire : il n'y a pas de carte du territoire, chaque fichier est un cas particulier.",
          },
          {
            label: "Duplication silencieuse",
            value:
              "Trois versions du même bouton, deux logiques de panier : sans modules clairs, on recrée plutôt que réutiliser.",
          },
          {
            label: "Dette qui paralyse",
            value:
              "Les raccourcis s'accumulent jusqu'au point où ajouter une fonctionnalité coûte plus cher que réécrire — et la réécriture est impossible sans carte.",
          },
        ],
      },
      {
        kind: "text",
        text: "L'architecture ne ralentit pas : elle déplace l'effort. Un peu de structure chaque semaine évite le mois de refactorisation panique. Les équipes qui livrent vite sur la durée sont celles qui protègent leurs frontières, pas celles qui les ignorent.",
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
      "L'architecture s'apprend sur du code réel : il faut d'abord savoir construire avant d'organiser.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut maîtriser avant",
        fields: [
          {
            label: "React",
            value:
              "Composants, hooks, composition : l'architecture organise des briques que vous savez déjà assembler. Sans cette base, les patterns restent abstraits.",
          },
          {
            label: "TypeScript",
            value:
              "Des types stricts dessinent les frontières : contrats entre modules, pas d'objets opaques qui fuient partout. `strict: true` est un outil d'architecture.",
          },
          {
            label: "Tests",
            value:
              "Une architecture se prouve par ses tests : des modules testables isolément valident le découpage. Si un module est intestable seul, sa frontière est mauvaise.",
          },
          {
            label: "Performance",
            value:
              "Le découpage conditionne le chargement : une feature bien isolée devient un chunk chargeable à la demande. Architecture et performance se renforcent.",
          },
        ],
      },
      {
        kind: "text",
        text: "Chaque prérequis est cliquable dans la roadmap. L'architecture n'est pas un sujet de débutant : revenez ici après avoir construit — et souffert sur — une application de taille moyenne.",
      },
    ],
  },
  {
    id: "outillage-analyse",
    title: "Outillage d'analyse",
    level: 2,
    intro:
      "Installer les outils qui rendent l'architecture visible : graphe de dépendances et détection des cycles.",
    blocks: [
      {
        kind: "command",
        label: "Installer madge (analyse des dépendances)",
        command: "npm install --save-dev madge",
        why: "Madge construit le graphe des imports du projet et détecte les dépendances circulaires — le premier symptôme mesurable d'une architecture qui se dégrade. En devDependency : c'est un outil d'analyse, pas du code livré.",
        verify: "npx madge --version",
      },
      {
        kind: "command",
        label: "Détecter les dépendances circulaires",
        command: "npx madge --circular --extensions ts,tsx src",
        why: "Un cycle A → B → A signifie que deux modules ne peuvent plus évoluer indépendamment : c'est une frontière manquante. Cette commande liste chaque cycle ; un projet sain n'en affiche aucun. À exécuter régulièrement, idéalement en CI.",
        verify: "npx madge --circular --extensions ts,tsx src && echo \"aucun cycle\"",
      },
      {
        kind: "text",
        text: "Ajoutez cette vérification à vos scripts : `\"arch\": \"madge --circular --extensions ts,tsx src\"` dans `package.json`. Une architecture se surveille comme des tests : automatiquement, à chaque changement.",
      },
    ],
  },
  {
    id: "premier-decoupage",
    title: "Premier découpage : les features",
    level: 2,
    intro:
      "Organiser le code par fonctionnalité métier plutôt que par type de fichier : le découpage le plus rentable.",
    blocks: [
      {
        kind: "diagram",
        title: "Structure feature-based (au lieu de components/hooks/utils)",
        lines: [
          "src/",
          "├── features/",
          "│   ├── auth/",
          "│   │   ├── components/      LoginForm.tsx",
          "│   │   ├── hooks/           useSession.ts",
          "│   │   ├── api.ts           appels réseau de la feature",
          "│   │   └── index.ts         API publique de la feature",
          "│   ├── cart/",
          "│   │   ├── components/",
          "│   │   ├── store.ts",
          "│   │   └── index.ts",
          "│   └── catalog/",
          "│       └── ...",
          "├── shared/",
          "│   ├── ui/                Button, Input : vraiment partagés",
          "│   └── lib/               utilitaires transverses",
          "└── app/                   composition : routes, providers",
        ],
      },
      {
        kind: "text",
        text: "Règle d'or : une feature ne doit jamais importer les fichiers internes d'une autre feature — uniquement son `index.ts` public. `shared/` n'accueille que du code utilisé par au moins deux features : tout le reste vit dans sa feature. Ce découpage rend les suppressions sûres : effacer une feature, c'est effacer un dossier.",
      },
      {
        kind: "list",
        items: [
          "Par type de fichier (`components/`, `hooks/`) : tout est mélangé, rien n'est supprimable sans fouiller.",
          "Par feature : chaque dossier raconte une fonctionnalité métier complète, avec ses composants, sa logique et ses tests.",
          "`index.ts` par feature : le seul point d'entrée autorisé, qui expose l'API publique du module.",
        ],
      },
    ],
  },
  {
    id: "frontieres-modules",
    title: "Imposer les frontières avec ESLint",
    level: 2,
    intro:
      "Une frontière documentée mais non vérifiée n'existe pas : faites-en une règle de lint.",
    blocks: [
      {
        kind: "text",
        text: "La règle `no-restricted-imports` d'ESLint interdit les imports qui traversent les frontières : une feature ne peut pas piocher dans les entrailles d'une autre. La violation devient une erreur de lint, visible dans l'éditeur et bloquante en CI.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "eslint.config.js — frontières entre features",
        code: "export default [\n  {\n    rules: {\n      'no-restricted-imports': ['error', {\n        patterns: [{\n          group: ['../features/*'],\n          message: 'Importez via l’index public de la feature (features/x), pas ses fichiers internes.'\n        }]\n      }]\n    }\n  }\n];",
      },
      {
        kind: "text",
        text: "Complétez avec une règle sur `shared/` : rien dans `shared/` ne doit importer depuis `features/`, sinon le « partagé » dépend du spécifique et tout s'inverse. Ces deux règles tiennent en dix lignes et valent mieux qu'un document d'architecture de vingt pages.",
      },
    ],
  },
  {
    id: "conventions-projet",
    title: "Conventions de projet",
    level: 2,
    intro:
      "Les conventions rendent le code prévisible : on sait où chercher avant même d'ouvrir un fichier.",
    blocks: [
      {
        kind: "list",
        items: [
          "Nommage : un composant = un fichier `PascalCase.tsx`, un hook = `useXxx.ts`, un test = `Xxx.test.ts` à côté du code testé.",
          "Un `README.md` court à la racine de chaque feature : ce qu'elle fait, son API publique, ses dépendances.",
          "Barrel files (`index.ts`) : chaque feature n'expose que ce qui est destiné aux autres — le reste est interne par défaut.",
          "Colocalisation : le style, le test et la story d'un composant vivent à côté de lui, pas dans des dossiers globaux.",
          "Interdictions explicites : pas d'import relatif qui remonte de plus d'un niveau (`../../`), pas de `any` dans les contrats publics.",
        ],
      },
      {
        kind: "text",
        text: "Écrivez ces conventions dans un `ARCHITECTURE.md` à la racine : une page, pas un roman. Une convention non écrite n'existe pas ; une convention écrite mais non vérifiée par le lint est un vœu pieux.",
      },
    ],
  },
  {
    id: "editeurs",
    title: "Éditeurs et outillage",
    level: 2,
    intro:
      "L'éditeur doit rendre les frontières visibles pendant l'écriture, pas après.",
    blocks: [
      {
        kind: "fields",
        title: "Configuration recommandée",
        fields: [
          {
            label: "VS Code + extension ESLint",
            value:
              "Les violations de frontières (`no-restricted-imports`) apparaissent soulignées en rouge pendant la frappe. Activez « ESLint: Format on Save » pour un feedback immédiat.",
          },
          {
            label: "TypeScript strict",
            value:
              "`strict: true` dans `tsconfig.json` : les contrats entre modules sont vérifiés à chaque sauvegarde. Les frontières typées sont des frontières testées.",
          },
          {
            label: "Graphe de dépendances",
            value:
              "`npx madge --image graph.svg src` génère une image du graphe d'imports : affichez-la en revue d'architecture pour voir les enchevêtrements.",
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
      "Comment les équipes maintiennent l'architecture au quotidien, sans comité ni lourdeur.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Proposer avant de construire",
            detail:
              "Toute décision structurante (nouveau module partagé, changement de frontière) s'écrit d'abord en quelques lignes : problème, options, choix. Cinq minutes d'écriture évitent des semaines de désaccord.",
          },
          {
            title: "Implémenter feature par feature",
            detail:
              "Une pull request = une feature ou une évolution de feature. Les PR qui touchent dix dossiers sans lien sont un signal d'architecture floue.",
          },
          {
            title: "Revue avec la carte en tête",
            detail:
              "Le reviewer vérifie : respecte-t-elle les frontières ? Le nouveau code vit-il dans la bonne feature ? Un import interdit aurait dû faire échouer le lint.",
          },
          {
            title: "Mesurer en CI",
            detail:
              "`madge --circular`, `tsc --noEmit`, `eslint` : trois commandes qui tournent à chaque push. L'architecture qui n'est pas vérifiée automatiquement se dégrade silencieusement.",
          },
          {
            title: "Documenter les décisions",
            detail:
              "Quand un choix surprendra dans six mois, il doit exister un ADR qui l'explique. Écrire après coup coûte dix fois plus cher qu'écrire sur le moment.",
          },
        ],
      },
    ],
  },
  {
    id: "adr-pratique",
    title: "Écrire un ADR",
    level: 2,
    intro:
      "Les Architecture Decision Records sont la mémoire technique de l'équipe : courts, datés, assumés.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Numéroter et titrer",
            detail:
              "`docs/decisions/0007-choix-zustand.md` : un numéro croissant, un titre qui énonce la décision, pas le sujet.",
          },
          {
            title: "Décrire le contexte",
            detail:
              "Quel problème ? Quelles contraintes (équipe, délais, existant) ? Un ADR sans contexte est incompréhensible six mois plus tard.",
          },
          {
            title: "Lister les options envisagées",
            detail:
              "Deux ou trois alternatives, avec leurs avantages et inconvénients en une phrase chacune. Montrer qu'on a comparé évite les remises en cause permanentes.",
          },
          {
            title: "Énoncer la décision et ses conséquences",
            detail:
              "« Nous choisissons X parce que… » puis « En conséquence, nous acceptons… » : les compromis assumés par écrit ne deviennent pas des reproches.",
          },
        ],
      },
      {
        kind: "text",
        text: "Un ADR fait une page maximum et se rédige en vingt minutes. N'en écrivez pas pour chaque micro-choix : seulement pour les décisions coûteuses à inverser (framework, découpage, stratégie de données).",
      },
    ],
  },
  {
    id: "documentation",
    title: "Documentation vivante",
    level: 2,
    intro:
      "La documentation utile vit à côté du code et se vérifie, sinon elle pourrit.",
    blocks: [
      {
        kind: "list",
        items: [
          "`ARCHITECTURE.md` à la racine : la carte du territoire en une page — découpage, frontières, conventions, où ajouter quoi.",
          "Un `README.md` par feature : responsabilité, API publique, dépendances vers d'autres features.",
          "`docs/decisions/` : les ADRs, la mémoire des choix structurants.",
          "Storybook pour les composants de `shared/ui` : chaque composant partagé est visible, testable et documenté isolément.",
          "Diagrammes générés (`madge --image`), jamais dessinés à la main : un schéma manuel est faux dès la semaine suivante.",
        ],
      },
      {
        kind: "text",
        text: "Règle simple : si la documentation n'est pas relue lors des revues, elle mourra. Traitez les `README.md` comme du code : ils sont relus, corrigés et versionnés avec lui.",
      },
    ],
  },
  {
    id: "migration-strangler",
    title: "Migration progressive (strangler fig)",
    level: 2,
    intro:
      "Refondre sans tout casser : la nouvelle architecture grandit autour de l'ancienne jusqu'à l'étouffer.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Inventaire de l'existant",
            detail:
              "Listez les écrans, leurs dépendances et les modules partagés. `madge --image` donne la carte des enchevêtrements : commencez par les zones les moins connectées.",
          },
          {
            title: "Créer la structure cible à côté",
            detail:
              "Le nouveau découpage (`features/`, `shared/`) coexiste avec l'ancien code. Les nouvelles fonctionnalités naissent directement dans la nouvelle structure.",
          },
          {
            title: "Migrer feature par feature",
            detail:
              "Déplacez une feature à la fois, en gardant ses tests verts. Chaque migration est une PR petite, relisible et réversible.",
          },
          {
            title: "Étrangler l'ancien code",
            detail:
              "Les routes et imports basculent progressivement vers les nouvelles features. L'ancien dossier rétrécit jusqu'à disparaître.",
          },
          {
            title: "Mesurer la dette résiduelle",
            detail:
              "Ce qui reste dans l'ancienne structure est listé, priorisé et planifié — pas oublié. Une migration sans fin est pire qu'une migration lente mais suivie.",
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
      "Trois projets pour pratiquer le découpage, les frontières et les décisions documentées.",
    blocks: [
      {
        kind: "fields",
        title: "Par niveau",
        fields: [
          {
            label: "Débutant — Découper une todo-app",
            value:
              "Prenez une application monolithique (todo-list) et redécoupez-la en features (`tasks`, `filters`) + `shared/ui`. Ajoutez un `index.ts` public par feature et un `ARCHITECTURE.md`.",
          },
          {
            label: "Intermédiaire — Frontières vérifiées",
            value:
              "Sur un projet existant, ajoutez la règle `no-restricted-imports`, corrigez les violations en extrayant les API publiques, puis branchez `madge --circular` en CI.",
          },
          {
            label: "Avancé — Migration strangler + ADRs",
            value:
              "Refondez l'architecture d'une app réelle : inventaire, structure cible, migration par feature, 3 ADRs rédigés (découpage, état, tests). Mesurez avant/après (cycles, temps d'onboarding).",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "feature-based-en-detail",
    title: "Le découpage par feature, en détail",
    level: 3,
    intro: "Ce que contient exactement une feature, et où s'arrête sa responsabilité.",
    blocks: [
      {
        kind: "text",
        text: "Une feature regroupe tout ce qui change ensemble : composants, hooks, appels API, état local, tests. Si une modification métier touche toujours les mêmes trois dossiers, c'est qu'ils forment une feature. Le découpage suit les raisons de changer, pas les types de fichiers.",
      },
      {
        kind: "list",
        items: [
          "Une feature expose une API publique minimale via `index.ts` : pages, hooks ou stores destinés aux autres features.",
          "Tout le reste est interne : un composant utilisé uniquement dans `auth/` ne sort jamais de `auth/`.",
          "Les features ne se connaissent pas entre elles : la composition (qui assemble quoi) vit dans `app/` (routes, layout).",
          "Taille cible : une feature se lit en une session. Si elle dépasse ~15 fichiers, elle cache probablement deux features.",
        ],
      },
    ],
  },
  {
    id: "code-partage",
    title: "Le dossier shared/ : avec parcimonie",
    level: 3,
    intro: "Le code partagé est une dette potentielle : chaque ajout crée une dépendance pour tous.",
    blocks: [
      {
        kind: "text",
        text: "`shared/` n'accueille que du code utilisé par au moins deux features ET stable. Un composant « partagé » utilisé une seule fois est un composant mal rangé : il vit dans sa feature jusqu'à preuve du deuxième usage. C'est la règle des trois : on duplique deux fois, on extrait à la troisième.",
      },
      {
        kind: "fields",
        title: "Contenu légitime de shared/",
        fields: [
          {
            label: "shared/ui",
            value:
              "Design system local : Button, Input, Modal. Des composants génériques, sans logique métier, documentés et testés.",
          },
          {
            label: "shared/lib",
            value:
              "Utilitaires purs et stables : formatage de dates, requêtes HTTP de base, constantes. Jamais de logique métier.",
          },
          {
            label: "Ce qui n'y va pas",
            value:
              "Un hook métier, un type spécifique à une feature, un composant « au cas où ». Le fourre-tout partagé devient vite le dossier que tout le monde craint.",
          },
        ],
      },
    ],
  },
  {
    id: "contrats-publics",
    title: "Contrats publics des modules",
    level: 3,
    intro: "L'index.ts d'une feature est un contrat : ce qu'il expose est une promesse de stabilité.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "features/cart/index.ts — API publique",
        code: "// Seul ce fichier peut être importé par d'autres features.\n// Tout le reste est un détail d'implémentation.\nexport { CartPage } from './pages/CartPage';\nexport { useCart } from './hooks/useCart';\nexport type { CartItem } from './types';",
      },
      {
        kind: "text",
        text: "Typé strictement, documenté, versionné dans les faits : changer un export public est un changement cassant qui se relit en revue. Les barrel files ont un coût (cycles d'imports possibles) : gardez-les plats, un seul niveau, jamais de réexport en cascade.",
      },
    ],
  },
  {
    id: "design-patterns",
    title: "Design patterns frontend",
    level: 3,
    intro: "Un vocabulaire partagé pour les problèmes récurrents : nommer, c'est déjà décider.",
    blocks: [
      {
        kind: "fields",
        title: "Patterns les plus utiles",
        fields: [
          {
            label: "Composition",
            value:
              "Assembler des petits composants plutôt qu'hériter ou configurer : `children`, slots, render props. Le pattern par défaut de React.",
          },
          {
            label: "Provider",
            value:
              "Diffuser une dépendance (thème, session, client API) sans prop drilling. Réservé aux valeurs stables : un provider qui change souvent re-rend tout.",
          },
          {
            label: "Container / Présentation",
            value:
              "Séparer la logique (données, effets) du rendu : des composants présentationnels purs, testables sans mock.",
          },
          {
            label: "State machines",
            value:
              "Modéliser les états complexes (formulaires multi-étapes, lecteurs média) comme des transitions explicites plutôt qu'une soupe de booléens.",
          },
          {
            label: "Repository / API layer",
            value:
              "Isoler les appels réseau derrière des fonctions typées : les composants ne connaissent jamais `fetch` directement.",
          },
        ],
      },
      {
        kind: "text",
        text: "Un pattern est un outil, pas un objectif. Si l'équipe ne connaît pas le nom, le pattern ne sert pas de vocabulaire partagé : documentez-le dans `ARCHITECTURE.md` avec un exemple tiré du projet.",
      },
    ],
  },
  {
    id: "state-machines",
    title: "Machines à états",
    level: 3,
    intro: "Quand les booléens se multiplient, une machine à états rend les transitions explicites.",
    blocks: [
      {
        kind: "text",
        text: "`isLoading`, `isError`, `isSuccess`, `isRetrying` : quatre booléens donnent seize combinaisons, dont douze impossibles. Une machine à états n'autorise que les transitions déclarées (`idle → loading → success`), ce qui élimine les états incohérents par construction.",
      },
      {
        kind: "diagram",
        title: "Machine d'un formulaire d'envoi",
        lines: [
          "idle ──submit──▶ sending ──ok──▶ sent",
          "                  │",
          "                  └─error─▶ failed ──retry──▶ sending",
          "",
          "États possibles : idle, sending, sent, failed. Rien d'autre.",
          "Chaque transition est nommée et traçable.",
        ],
      },
      {
        kind: "text",
        text: "À réserver aux flux vraiment complexes (checkout, onboarding, lecteurs). Pour un simple chargement de données, `useQuery` et ses états (`isPending`, `isError`) suffisent : la sur-ingénierie est l'ennemie.",
      },
    ],
  },
  {
    id: "micro-frontends",
    title: "Micro-frontends",
    level: 3,
    intro: "Découper l'application en sous-applications déployables indépendamment : puissant, et coûteux.",
    blocks: [
      {
        kind: "text",
        text: "Les micro-frontends répondent à un problème d'organisation, pas de code : plusieurs équipes qui doivent déployer sans se coordonner. Chaque micro-app possède son build, son déploiement, parfois son framework. Le prix : duplication des dépendances, cohérence UX difficile, debug à travers les frontières, versioning des contrats.",
      },
      {
        kind: "fields",
        title: "Quand c'est justifié — et quand non",
        fields: [
          {
            label: "Justifié",
            value:
              "Plusieurs équipes autonomes, cycles de déploiement indépendants réellement nécessaires, zones métier très découplées (ex. back-office vs boutique).",
          },
          {
            label: "Non justifié",
            value:
              "Une seule équipe, un seul rythme de release, ou un simple besoin de « ranger » le code : un monorepo ou un bon découpage par feature suffit.",
          },
          {
            label: "Alternative : Module Federation",
            value:
              "Partager des modules à l'exécution entre builds (Webpack, Vite) : moins lourd que des apps totalement séparées, mais les contrats entre fédérés restent à versionner.",
          },
        ],
      },
    ],
  },
  {
    id: "monorepos",
    title: "Monorepos",
    level: 3,
    intro: "Un seul dépôt pour plusieurs paquets : partager le code sans le publier.",
    blocks: [
      {
        kind: "text",
        text: "Le monorepo regroupe applications et bibliothèques dans un dépôt unique, avec des dépendances internes versionnées ensemble. Avantages : refactorisations atomiques à travers les paquets, une seule CI, pas de publication npm pour chaque changement partagé. Inconvénients : builds plus complexes, outillage spécifique (workspaces npm, Turborepo).",
      },
      {
        kind: "code",
        language: "bash",
        title: "Workspaces npm — structure minimale",
        code: "apps/\n  web/            # l'application\n  docs/           # le site de documentation\npackages/\n  ui/             # composants partagés\n  config/         # eslint, tsconfig partagés",
      },
      {
        kind: "text",
        text: "Pertinent quand plusieurs applications partagent du code vivant (design system, utilitaires). Pour une seule application, c'est de la complexité gratuite : un simple dossier `shared/` suffit.",
      },
    ],
  },
  {
    id: "couche-donnees",
    title: "Couche d'accès aux données",
    level: 3,
    intro: "Les composants ne parlent jamais directement au réseau : une couche typée fait l'interface.",
    blocks: [
      {
        kind: "code",
        language: "typescript",
        title: "features/catalog/api.ts — couche d'accès",
        code: "import { apiClient } from '../../shared/lib/api-client';\nimport type { Product } from './types';\n\nexport async function fetchProducts(): Promise<Product[]> {\n  const res = await apiClient.get('/products');\n  return ProductSchema.parse(res.data);\n}\n\nexport async function fetchProduct(id: string): Promise<Product> {\n  const res = await apiClient.get('/products/' + id);\n  return ProductSchema.parse(res.data);\n}",
      },
      {
        kind: "text",
        text: "Bénéfices : un seul endroit où changer l'URL de base, les headers d'authentification ou la gestion d'erreurs ; des fonctions typées et testables ; des composants qui ne connaissent que des promesses typées. La validation du schéma (ici `ProductSchema`) protège contre les réponses API inattendues.",
      },
    ],
  },
  {
    id: "error-boundaries",
    title: "Gestion globale des erreurs",
    level: 3,
    intro: "Une erreur de rendu ne doit jamais faire écran blanc : isolez les pannes par zone.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Error boundary par feature",
        code: "import { ErrorBoundary } from 'react-error-boundary';\n\nfunction FeatureFallback({ error, resetErrorBoundary }) {\n  return (\n    <div role=\"alert\">\n      <p>Le catalogue est momentanément indisponible.</p>\n      <button onClick={resetErrorBoundary}>Réessayer</button>\n    </div>\n  );\n}\n\n<ErrorBoundary FallbackComponent={FeatureFallback}>\n  <CatalogPage />\n</ErrorBoundary>",
      },
      {
        kind: "text",
        text: "Placez une boundary par zone indépendante (feature, route) : si le catalogue plante, le panier continue de fonctionner. Loggez l'erreur vers votre observabilité dans `onError`. Les boundaries ne captent pas les erreurs d'effets ou d'événements : celles-ci se gèrent avec try/catch et des états d'erreur.",
      },
    ],
  },
  {
    id: "dependances-circulaires",
    title: "Dépendances circulaires",
    level: 3,
    intro: "Le cycle A → B → A est la forme la plus concrète d'une frontière manquante.",
    blocks: [
      {
        kind: "text",
        text: "Les cycles provoquent des bugs d'ordre d'initialisation : un module reçoit `undefined` au lieu de l'export attendu, selon l'ordre de chargement. Ils rendent aussi les tests fragiles et les refactorisations dangereuses, car rien ne peut changer sans l'autre.",
      },
      {
        kind: "fields",
        title: "Trois façons de casser un cycle",
        fields: [
          {
            label: "Extraire le partagé",
            value:
              "Le type ou la constante utilisée des deux côtés déménage dans un module neutre (ex. `types.ts`) que les deux importent. La solution la plus fréquente.",
          },
          {
            label: "Inverser la dépendance",
            value:
              "Au lieu que A importe B, A reçoit B en paramètre (injection) ou via un callback. La flèche ne pointe plus que dans un sens.",
          },
          {
            label: "Importer depuis le fichier, pas le barrel",
            value:
              "Les `index.ts` qui se réexportent mutuellement créent des cycles artificiels : importez le fichier précis quand c'est interne à la feature.",
          },
        ],
      },
    ],
  },
  {
    id: "tests-frontieres",
    title: "Tester les frontières",
    level: 3,
    intro: "Les règles ESLint empêchent les violations ; les tests prouvent que le découpage tient.",
    blocks: [
      {
        kind: "text",
        text: "Un module bien découpé s'importe et se teste seul, sans charger la moitié de l'application. Testez l'API publique de chaque feature (ses hooks, ses fonctions) en isolation : si le test exige de mocker dix modules internes, la frontière est poreuse.",
      },
      {
        kind: "list",
        items: [
          "Tests unitaires sur les fonctions pures de la feature (formatage, calculs, reducers).",
          "Tests de composants sur l'API publique, avec la couche d'accès aux données mockée — jamais l'inverse.",
          "Un test d'import par feature critique : vérifier que `features/cart` n'importe rien de `features/catalog` en scannant les imports.",
          "La CI exécute `madge --circular` : un cycle introduit par une PR échoue comme un test cassé.",
        ],
      },
    ],
  },
  {
    id: "code-splitting-architectural",
    title: "Code splitting par feature",
    level: 3,
    intro: "Un bon découpage métier devient un bon découpage de chargement : chaque feature, un chunk.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Chargement différé par route",
        code: "import { lazy, Suspense } from 'react';\n\nconst CatalogPage = lazy(() => import('../features/catalog'));\nconst AdminPage = lazy(() => import('../features/admin'));\n\n<Suspense fallback={<PageSkeleton />}>\n  <Routes>\n    <Route path=\"/catalog\" element={<CatalogPage />} />\n    <Route path=\"/admin\" element={<AdminPage />} />\n  </Routes>\n</Suspense>",
      },
      {
        kind: "text",
        text: "Le découpage par feature rend le lazy loading naturel : la page admin, lourde et rarement visitée, ne charge qu'à la demande. Condition : des features sans dépendances croisées, sinon les chunks se chevauchent et le gain s'évapore. Mesurez avec l'analyseur de bundle avant et après.",
      },
    ],
  },
  {
    id: "dette-technique",
    title: "Dette technique : la mesurer",
    level: 3,
    intro: "La dette n'est pas le mal : c'est un emprunt. Le problème, c'est l'emprunt non suivi.",
    blocks: [
      {
        kind: "fields",
        title: "Gérer la dette comme un portefeuille",
        fields: [
          {
            label: "Tracer",
            value:
              "Un `// TODO(issue-123)` lié à un ticket, pas un commentaire orphelin. Chaque dette a un propriétaire et une échéance de réévaluation.",
          },
          {
            label: "Mesurer",
            value:
              "Nombre de cycles madge, taille du bundle, temps de build, fichiers de plus de 500 lignes : des indicateurs suivis dans le temps, pas des impressions.",
          },
          {
            label: "Rembourser",
            value:
              "Un budget fixe par sprint (ex. 15 %) consacré à la dette priorisée. Sans budget sanctuarisé, le remboursement n'arrive jamais.",
          },
          {
            label: "Distinguer",
            value:
              "Dette délibérée (choix conscient, tracé) vs dette accidentelle (ignorance, précipitation). La seconde se paie en formation et en revues, pas en refactorings.",
          },
        ],
      },
    ],
  },
  {
    id: "code-ownership",
    title: "Propriété du code (ownership)",
    level: 3,
    intro: "Chaque module a un responsable : sans propriétaire, personne ne rembourse la dette.",
    blocks: [
      {
        kind: "text",
        text: "Le `CODEOWNERS` du dépôt désigne les reviewers obligatoires par dossier : toute PR touchant `features/payments/` exige l'aval de l'équipe paiements. L'ownership n'est pas un territoire défendu, c'est une responsabilité : le propriétaire répond de la qualité, de la dette et de la documentation de son périmètre.",
      },
      {
        kind: "code",
        language: "bash",
        title: ".github/CODEOWNERS — extrait",
        code: "/src/features/payments/   @equipe-paiements\n/src/features/catalog/    @equipe-catalogue\n/src/shared/ui/           @equipe-design-system",
      },
    ],
  },
  {
    id: "revue-architecture",
    title: "Checklist de revue d'architecture",
    level: 3,
    intro: "Les questions à se poser en revue quand la PR touche à la structure.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le nouveau code vit-il dans la bonne feature ? Aurait-il dû créer une nouvelle feature ?",
          "Les frontières sont-elles respectées : aucun import vers les fichiers internes d'une autre feature ?",
          "Le lint (`no-restricted-imports`), les types (`tsc --noEmit`) et madge passent-ils ?",
          "Un nouveau module partagé est-il vraiment utilisé par deux features, ou anticipe-t-on un besoin ?",
          "La PR introduit-elle un cycle de dépendances, même indirect ?",
          "Les décisions structurantes sont-elles tracées (ADR ou commentaire de PR) ?",
          "Le `README.md` de la feature est-il à jour si son API publique change ?",
        ],
      },
    ],
  },
  {
    id: "adr-template",
    title: "Template d'ADR",
    level: 3,
    intro: "Un modèle prêt à copier pour `docs/decisions/`.",
    blocks: [
      {
        kind: "diagram",
        title: "docs/decisions/0007-xxx.md — template",
        lines: [
          "# 7. Titre de la décision",
          "",
          "Date : 2026-09-29",
          "Statut : accepté",
          "",
          "## Contexte",
          "Quel problème ? Quelles contraintes ?",
          "",
          "## Options envisagées",
          "- Option A : avantage / inconvénient",
          "- Option B : avantage / inconvénient",
          "",
          "## Décision",
          "Nous choisissons l'option A parce que...",
          "",
          "## Conséquences",
          "Positives : ...",
          "Négatives (assumées) : ...",
        ],
      },
      {
        kind: "text",
        text: "Copiez ce template dans `docs/decisions/` et numérotez en séquence. Un ADR modifié après acceptation change de statut (« remplacé par le n°12 ») : on n'efface pas l'historique des décisions.",
      },
    ],
  },
  {
    id: "securite",
    title: "Sécurité côté architecture",
    level: 3,
    intro: "L'architecture frontend participe à la sécurité : réduire la surface d'attaque par construction.",
    blocks: [
      {
        kind: "list",
        items: [
          "Ne jamais faire confiance au client : toute règle métier critique est re-validée côté serveur. Le frontend est une commodité, pas une barrière.",
          "Éviter `dangerouslySetInnerHTML` ; si indispensable, assainir avec une bibliothèque dédiée et documenter pourquoi.",
          "Content Security Policy (CSP) : restreindre les sources de scripts exécutables, même si sa mise au point est progressive.",
          "Dépendances : `npm audit` en CI, mises à jour régulières. Une faille dans une dépendance transitive reste votre faille.",
          "Secrets : aucune clé, aucun token dans le code frontend — tout secret y est public par définition.",
          "La couche d'accès aux données centralise les tokens (headers) : un seul endroit à auditer, pas cinquante `fetch` éparpillés.",
        ],
      },
    ],
  },
  {
    id: "anti-patterns",
    title: "Anti-patterns courants",
    level: 3,
    intro: "Les formes que prend une architecture qui se dégrade : les reconnaître tôt.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "God component",
            value:
              "Un composant de 800 lignes qui fait tout : affichage, requêtes, logique métier. Symptôme : impossible à tester, effrayant à modifier. Remède : extraire la logique (hooks), découper le rendu.",
          },
          {
            label: "Prop drilling profond",
            value:
              "Des props qui traversent cinq niveaux pour atteindre une feuille. Symptôme : chaque composant intermédiaire connaît des données qui ne le concernent pas. Remède : composition, ou état localisé.",
          },
          {
            label: "Utils fourre-tout",
            value:
              "Un `utils.ts` de 2 000 lignes où tout atterrit. Symptôme : personne ne sait ce qu'il contient, tout le monde en dépend. Remède : éclater par domaine, colocaliser.",
          },
          {
            label: "Import en étoile des features",
            value:
              "Importer toute une feature pour une fonction : `import * as cart from '../features/cart'`. Symptôme : dépendances artificielles, cycles. Remède : API publique minimale.",
          },
          {
            label: "Abstraction prématurée",
            value:
              "Un système de plugins pour trois cas d'usage. Symptôme : plus de code d'abstraction que de code utile. Remède : dupliquer deux fois, extraire à la troisième.",
          },
        ],
      },
    ],
  },
  {
    id: "contrats-versionnes",
    title: "Versionner les contrats internes",
    level: 3,
    intro: "En monorepo ou entre équipes, les API publiques des modules se versionnent comme des APIs.",
    blocks: [
      {
        kind: "text",
        text: "Quand plusieurs applications consomment `packages/ui`, chaque changement de son API publique suit le versionnage sémantique : correctif, fonctionnalité rétrocompatible, changement cassant. Un changelog par paquet rend les mises à jour prévisibles et les régressions traçables.",
      },
      {
        kind: "list",
        items: [
          "Majeur : suppression ou renommage d'un export public — annoncé, documenté, migré.",
          "Mineur : nouvel export, nouvelle prop optionnelle — adoptable sans changer le code existant.",
          "Correctif : bug interne sans changement d'API — transparent pour les consommateurs.",
        ],
      },
    ],
  },
  {
    id: "ci-cd",
    title: "Portes de CI",
    level: 3,
    intro: "Les vérifications automatiques qui protègent l'architecture à chaque push.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Pipeline minimal d'architecture",
        code: "npm run typecheck   # tsc --noEmit : les contrats tiennent\nnpm run lint        # eslint : les frontières tiennent\nnpx madge --circular --extensions ts,tsx src   # aucun cycle\nnpm run build       # le projet compile vraiment",
      },
      {
        kind: "text",
        text: "Chaque porte doit être rapide (quelques minutes) et déterministe : une CI lente ou capricieuse sera contournée. Ajoutez ensuite les budgets de bundle (taille maximale) et les tests. L'ordre compte : types, lint, cycles, build, tests.",
      },
    ],
  },
  {
    id: "debugging",
    title: "Debugging architectural",
    level: 3,
    intro: "Quand le bug vient de la structure, pas du code : les techniques pour le traquer.",
    blocks: [
      {
        kind: "list",
        items: [
          "Source maps activées en développement : le debugger du navigateur pointe vers le vrai fichier TypeScript, pas le bundle.",
          "React DevTools : l'onglet Components révèle les re-renders parasites dus à un état mal placé — souvent un symptôme de découpage.",
          "`madge --image graph.svg src` : visualiser le graphe d'imports pour repérer les modules « dieux » dont tout dépend.",
          "Git blame sur les frontières : qui a introduit l'import interdit, et pourquoi ? Le contexte évite de casser en corrigeant.",
          "Réduction du cas : reproduire avec une seule feature isolée. Si le bug disparaît, la cause est dans l'interaction entre modules.",
        ],
      },
    ],
  },
  {
    id: "strategie-tests",
    title: "Stratégie de tests",
    level: 3,
    intro: "La pyramide adaptée au frontend : beaucoup d'unitaires, peu d'e2e, des tests ciblés entre les deux.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois niveaux",
        fields: [
          {
            label: "Unitaires (base large)",
            value:
              "Fonctions pures, hooks, reducers : rapides, stables, ils documentent le comportement des modules. Vitest ou Jest.",
          },
          {
            label: "Intégration (milieu)",
            value:
              "Une feature montée avec sa couche d'accès mockée : vérifie que les briques collaborent. Testing Library, sans détails d'implémentation.",
          },
          {
            label: "E2E (sommet fin)",
            value:
              "Les parcours critiques (inscription, paiement) sur un navigateur réel. Playwright ou Cypress. Lents et fragiles : peu nombreux, mais sur les chemins qui rapportent.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle : tester le comportement, pas l'implémentation. Un test qui casse à chaque refactor interne est un test qui ment sur la qualité de l'architecture.",
      },
    ],
  },
  {
    id: "feature-flags",
    title: "Feature flags",
    level: 3,
    intro: "Découpler le déploiement de la mise en production : livrer du code éteint, allumer progressivement.",
    blocks: [
      {
        kind: "text",
        text: "Un feature flag est un interrupteur qui active une fonctionnalité pour un sous-ensemble d'utilisateurs. Il permet la migration strangler en production (bascule progressive), les tests A/B et le rollback instantané sans redéployer. Le code lit le flag, jamais l'inverse.",
      },
      {
        kind: "code",
        language: "tsx",
        title: "Usage minimal",
        code: "import { useFeatureFlag } from './flags';\n\nfunction CheckoutPage() {\n  const newFlow = useFeatureFlag('checkout-v2');\n  return newFlow ? <CheckoutV2 /> : <CheckoutV1 />;\n}",
      },
      {
        kind: "text",
        text: "Discipline obligatoire : chaque flag a une date de péremption. Un flag oublié devient une branche morte que personne n'ose retirer — de la dette déguisée en prudence. Nettoyez après bascule.",
      },
    ],
  },
  {
    id: "scalabilite-build",
    title: "Scalabilité du build",
    level: 3,
    intro: "Quand le projet grandit, le build doit rester rapide : l'architecture y contribue.",
    blocks: [
      {
        kind: "list",
        items: [
          "Barrel files plats : des réexports en cascade forcent le bundler à tout parcourir. Un seul niveau d'index par feature.",
          "Imports précis : `import { Button } from '../shared/ui/Button'` plutôt que la racine du barrel quand le tree-shaking peine.",
          "Isolation des types : `import type` pour les types purs — effacés à la compilation, zéro coût, zéro cycle.",
          "Découpage des tâches : lint et typecheck par projet (références TypeScript) plutôt que sur tout le dépôt d'un coup.",
          "Cache de build : les outils modernes (Turborepo, Nx) ne reconstruisent que ce qui a changé — rentable dès le monorepo.",
        ],
      },
    ],
  },
  {
    id: "design-system-integration",
    title: "Architecture et design system",
    level: 3,
    intro: "Le design system est un module comme les autres : il mérite les mêmes frontières.",
    blocks: [
      {
        kind: "text",
        text: "`shared/ui` (ou un paquet dédié) expose les composants du design system avec une API publique versionnée, une documentation (Storybook) et des tests d'accessibilité. Les features le consomment, jamais l'inverse : aucun composant du design system n'importe de logique métier.",
      },
      {
        kind: "list",
        items: [
          "Les tokens (couleurs, espacements) vivent dans le design system, pas éparpillés dans les features.",
          "Un composant métier déguisé en composant partagé (« le bouton spécial du checkout ») retourne dans sa feature.",
          "Les changements cassants du design system se planifient : codemods, guide de migration, version majeure.",
        ],
      },
    ],
  },
  {
    id: "migrations-versions",
    title: "Migrations de versions majeures",
    level: 3,
    intro: "React 19, nouvelle version du framework : les migrations sont un exercice d'architecture.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Lire le guide de migration officiel",
            detail:
              "Les changements cassants sont documentés par les mainteneurs : commencez toujours par la source officielle, pas par les articles.",
          },
          {
            title: "Isoler les zones à risque",
            detail:
              "APIs dépréciées, comportements modifiés : `grep` et le codemod officiel localisent les occurrences. Une bonne architecture les concentre déjà (couche d'accès, wrappers).",
          },
          {
            title: "Migrer par vague, derrière un flag",
            detail:
              "Une feature à la fois, l'ancienne et la nouvelle cohabitant via feature flag. Chaque vague est déployable et réversible.",
          },
          {
            title: "Nettoyer et documenter",
            detail:
              "Supprimer le code de compatibilité, mettre à jour les ADRs concernés, noter les leçons pour la prochaine migration.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les pièges classiques des équipes qui organisent leur frontend.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Sur-architecturer trop tôt",
            value:
              "Problem : micro-frontends et monorepo pour une équipe de deux sur un MVP. Why : confondre « propre » et « complexe ». Better : commencer simple (features + frontières), complexifier quand la douleur est réelle.",
          },
          {
            label: "Frontières non vérifiées",
            value:
              "Problem : un beau schéma d'architecture que le code ignore. Why : aucune règle de lint, aucune porte de CI. Better : `no-restricted-imports` + madge en CI dès le premier jour.",
          },
          {
            label: "Shared fourre-tout",
            value:
              "Problem : tout atterrit dans `shared/`, qui devient le module dont tout dépend. Why : plus facile que de réfléchir au bon endroit. Better : règle des trois usages, revues strictes sur `shared/`.",
          },
          {
            label: "ADR pour tout et rien",
            value:
              "Problem : vingt ADRs pour des choix triviaux, que personne ne lit. Why : bureaucratie rassurante. Better : ADRs réservés aux décisions coûteuses à inverser.",
          },
          {
            label: "Ignorer les cycles",
            value:
              "Problem : `madge --circular` affiche des cycles « qu'on corrigera plus tard ». Why : chaque cycle rend deux modules inséparables. Better : zéro cycle toléré, correction immédiate.",
          },
          {
            label: "Documentation décorative",
            value:
              "Problem : un wiki plein de schémas obsolètes. Why : documentation déconnectée du code. Better : docs à côté du code, relues en PR, diagrammes générés.",
          },
          {
            label: "Big bang rewrite",
            value:
              "Problem : « on réécrit tout proprement » pendant six mois sans livrer. Why : la migration progressive semble lente. Better : strangler fig — l'ancien et le nouveau cohabitent.",
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
          "Frontières d'abord : le découpage parfait n'existe pas, mais des frontières vérifiées valent mieux qu'un plan idéal non appliqué.",
          "Petits modules : un module se lit en une session ; au-delà, il cache deux responsabilités.",
          "API publiques minimales : exposez peu, documentez ce que vous exposez, versionnez les changements.",
          "Décisions tracées : si ça coûte cher à inverser, ça mérite un ADR.",
          "Automatiser la surveillance : madge, tsc, eslint en CI — l'architecture se dégrade en silence sinon.",
          "Dette suivie : chaque raccourci a un ticket, un propriétaire et une échéance de réévaluation.",
          "Conventions écrites : une page `ARCHITECTURE.md`, relue et tenue à jour.",
          "Migration incrémentale : strangler fig plutôt que big bang, feature flags plutôt que bascules aveugles.",
        ],
      },
      {
        kind: "text",
        text: "Contexte : ces pratiques s'appliquent différemment selon la taille de l'équipe et du projet. Un side-project solo n'a pas besoin de CODEOWNERS ; une équipe de vingt ne peut pas s'en passer. La maturité, c'est doser.",
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Aller plus loin, en commençant par les références reconnues.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation et références",
        fields: [
          {
            label: "web.dev",
            value:
              "web.dev : guides Google sur les architectures web modernes — code splitting, patterns de chargement, performance.",
          },
          {
            label: "ADRs",
            value:
              "Le format d'ADR popularisé par Michael Nygard : exemples de templates et retours d'expérience de la communauté.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Livres : « A Philosophy of Software Design » (John Ousterhout) sur la complexité ; « Clean Architecture » (Robert C. Martin) sur les frontières ; « Building Micro-Frontends » (Luca Mele) si le sujet se pose vraiment.",
          "Pratique : appliquez chaque pattern de cette page sur un projet réel avant de le prescrire à une équipe.",
          "Revue : faites relire vos ADRs par un pair extérieur au projet — s'il comprend la décision, l'ADR est bon.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "L'architecture maîtrisée, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir Next.js : le framework impose une architecture (routes, layouts, server components) — comprenez ses choix.",
          "Apprendre les tests : Vitest et Playwright pour prouver que le découpage tient.",
          "Construire un design system : tokens, composants, documentation — l'architecture appliquée au visuel.",
          "Travailler la performance : le découpage par feature devient du code splitting mesuré.",
          "Revenir à la roadmap : valider Architecture Frontend et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de React : de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Approche : les hooks d'abord ; les classes ne sont mentionnées qu'en note
 * historique.
 */
export const LEARNING_REACT: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est React, ce qu'il n'est pas, et pourquoi il domine le développement d'interfaces web.",
    blocks: [
      {
        kind: "text",
        text: "React est une bibliothèque JavaScript open source, créée par Meta, pour construire des interfaces utilisateur à partir de composants réutilisables. Un composant est une fonction qui décrit ce que l'interface doit afficher pour un état donné : quand l'état change, React met à jour l'affichage.",
      },
      {
        kind: "text",
        text: "Point essentiel : React est une bibliothèque, pas un framework. Il ne s'occupe que de la couche « vue » : comment décrire l'interface et la garder synchronisée avec les données. Le routing, la récupération de données, le build ou le rendu côté serveur sont confiés à d'autres outils (React Router, Vite, Next.js…). C'est une force — vous assemblez la pile adaptée à votre besoin — mais cela signifie aussi qu'apprendre React, c'est apprendre un écosystème, pas un seul outil.",
      },
      {
        kind: "fields",
        title: "React en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "React permet de décrire l'interface comme une fonction de l'état : `UI = f(état)`.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Manipuler le DOM à la main devient vite ingérable : l'état et l'affichage se désynchronisent, le code devient fragile. React centralise la source de vérité dans l'état et se charge des mises à jour du DOM.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Interfaces interactives et dynamiques : tableaux de bord, applications métier, réseaux sociaux, e-commerce. Pour une page statique simple, du HTML/CSS suffit.",
          },
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni un framework complet, ni un langage, ni un outil de backend. Le JSX n'est pas du HTML : c'est une syntaxe compilée en appels JavaScript.",
          },
        ],
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : état → interface",
    level: 1,
    intro:
      "La seule idée à retenir avant tout le reste : en React, on ne manipule pas le DOM, on décrit l'interface.",
    blocks: [
      {
        kind: "diagram",
        title: "Le cycle de React, en une image",
        lines: [
          "État (données)",
          "     │",
          "     ▼",
          "Composants (fonctions)",
          "     │  décrivent",
          "     ▼",
          "Arbre virtuel (description en mémoire)",
          "     │",
          "     ├── comparé à la version précédente (réconciliation)",
          "     │",
          "     ▼",
          "DOM réel (mises à jour minimales)",
          "     │",
          "     ▼",
          "Événement utilisateur → nouvel état → le cycle recommence",
        ],
      },
      {
        kind: "text",
        text: "La réconciliation, en une phrase : quand l'état change, React reconstruit une description de l'interface, la compare à la précédente et n'applique au DOM réel que les différences. Vous ne dites jamais « change ce nœud » : vous redécrivez le résultat souhaité, React s'occupe du « comment ».",
      },
      {
        kind: "list",
        items: [
          "Déclaratif : vous décrivez ce que l'interface doit être, pas les étapes pour y arriver.",
          "L'état est la source de vérité : toute donnée affichée devrait idéalement dériver d'un état.",
          "Les composants sont des fonctions pures en esprit : mêmes props et même état → même interface.",
          "React ne touche au DOM réel qu'avec parcimonie : c'est ce qui rend les mises à jour efficaces.",
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
      "React est du JavaScript organisé : sans bases solides en JS moderne, chaque concept React semblera magique.",
    blocks: [
      {
        kind: "fields",
        title: "JavaScript moderne — ce qu'il faut savoir",
        fields: [
          {
            label: "Variables, fonctions, portée",
            value:
              "`let`/`const`, fonctions fléchées, portée des variables. Les composants React sont des fonctions : tout repose dessus.",
          },
          {
            label: "Destructuration et spread",
            value:
              "`const { name } = props`, `[...items, nouveau]`. Utilisés en permanence pour les props et les mises à jour d'état immuables.",
          },
          {
            label: "Tableaux : `map`, `filter`, `find`",
            value:
              "Afficher une liste en React, c'est presque toujours un `.map()`. `filter` sert à supprimer, `find` à rechercher.",
          },
          {
            label: "Modules (`import` / `export`)",
            value:
              "Chaque composant vit dans son fichier et s'importe. Sans cela, impossible d'organiser un projet React.",
          },
          {
            label: "Async / Promises",
            value:
              "`async`/`await` et `fetch` pour charger des données — le cœur de toute application réelle.",
          },
          {
            label: "HTML et CSS",
            value:
              "Le JSX ressemble à du HTML : il faut connaître les balises, les formulaires, et savoir styler avec CSS.",
          },
          {
            label: "TypeScript (recommandé)",
            value:
              "Pas obligatoire pour débuter, mais fortement recommandé en contexte professionnel : il sécurise les props, l'état et les événements. Une section complète lui est consacrée plus bas.",
          },
        ],
      },
      {
        kind: "text",
        text: "Si un point est fragile, travaillez-le d'abord en JavaScript pur, puis revenez. React ne pardonne pas les bases approximatives : la plupart des « bugs React » sont en réalité des incompréhensions JavaScript (références, closures, mutations).",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Créer un projet React moderne avec Vite, l'outil recommandé aujourd'hui.",
    blocks: [
      {
        kind: "command",
        label: "Créer le projet (répondez aux questions : nom, puis template React + TypeScript)",
        command: "npm create vite@latest",
        why: "`create-vite` est le générateur officiel de Vite. Il crée un dossier avec une configuration React minimale et moderne : serveur de développement instantané, rechargement à chaud, build optimisé. Le template `react-ts` ajoute TypeScript préconfiguré.",
        verify:
          "Un dossier est créé avec `package.json`, `index.html`, `src/main.tsx` et `src/App.tsx`.",
      },
      {
        kind: "command",
        label: "Installer les dépendances du projet",
        command: "npm install",
        why: "Télécharge `react`, `react-dom`, Vite et les outils de développement listés dans `package.json`. À exécuter une fois après la création, puis après chaque `git pull` qui modifie les dépendances.",
        verify: "Le dossier `node_modules/` apparaît, sans erreur dans le terminal.",
      },
      {
        kind: "command",
        label: "Lancer le serveur de développement",
        command: "npm run dev",
        why: "Démarre Vite en mode développement : l'application se recharge automatiquement à chaque sauvegarde (Hot Module Replacement). C'est la commande que vous lancerez 50 fois par jour.",
        verify:
          "Le terminal affiche une URL locale (souvent `http://localhost:5173`) : ouvrez-la, la page d'accueil Vite + React s'affiche.",
      },
      {
        kind: "text",
        text: "Et `create-react-app` ? C'était l'outil historique pour démarrer un projet React, mais il n'est plus recommandé pour les nouveaux projets : la documentation officielle oriente désormais vers Vite (pour une application simple) ou un framework comme Next.js (pour une application complète). Si vous tombez sur un tutoriel qui l'utilise, préférez Vite.",
      },
    ],
  },
  {
    id: "premier-composant",
    title: "Premier composant",
    level: 2,
    intro:
      "Écrire, afficher et faire interagir un premier composant, étape par étape.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Ouvrir `src/App.tsx`",
            detail:
              "C'est le composant racine affiché par défaut. Supprimez son contenu : vous partez d'une page blanche, c'est normal.",
          },
          {
            title: "Écrire un composant fonction",
            detail:
              "Un composant est une fonction dont le nom commence par une majuscule et qui retourne du JSX : `function Bonjour() { return <h1>Bonjour</h1>; }`. La majuscule permet à React de distinguer un composant d'une balise HTML.",
          },
          {
            title: "L'utiliser comme une balise",
            detail:
              "Dans `App`, écrivez `<Bonjour />` : React appelle la fonction et insère le résultat. Un composant peut être réutilisé autant de fois que voulu.",
          },
          {
            title: "Ajouter de l'interactivité avec `useState`",
            detail:
              "`const [compteur, setCompteur] = useState(0)` crée un état. `setCompteur(compteur + 1)` au clic d'un bouton met à jour l'état, et React ré-affiche automatiquement le composant avec la nouvelle valeur.",
          },
          {
            title: "Observer le rechargement à chaud",
            detail:
              "Modifiez le texte, sauvegardez : la page se met à jour sans rechargement manuel, et l'état du compteur est conservé. C'est le confort du développement moderne.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "src/App.tsx — premier composant interactif",
        code: "import { useState } from \"react\";\n\nfunction Compteur() {\n  const [compteur, setCompteur] = useState(0);\n\n  return (\n    <div>\n      <p>Clics : {compteur}</p>\n      <button onClick={() => setCompteur(compteur + 1)}>\n        Incrémenter\n      </button>\n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <main>\n      <h1>Mon premier composant</h1>\n      <Compteur />\n    </main>\n  );\n}",
      },
      {
        kind: "text",
        text: "Ce petit exemple contient déjà l'essentiel de React : un composant fonction, du JSX, un état local avec `useState`, un gestionnaire d'événement, et la réactivité automatique. Tout le reste de cette page approfondit ces briques.",
      },
    ],
  },
  {
    id: "environnement-developpement",
    title: "Environnement de développement",
    level: 2,
    intro:
      "Les outils qui rendent le développement React confortable et professionnel.",
    blocks: [
      {
        kind: "fields",
        title: "La chaîne d'outils React",
        fields: [
          {
            label: "Éditeur : VS Code",
            value:
              "Le choix le plus courant : excellent support JSX/TSX, autocomplétion, refactoring. WebStorm, Zed et Neovim conviennent aussi — l'important est un bon support TypeScript.",
          },
          {
            label: "React DevTools",
            value:
              "Extension navigateur (Chrome, Firefox, Edge) indispensable : inspecter l'arbre des composants, voir les props et l'état en direct, profiler les rendus. À installer dès le premier jour.",
          },
          {
            label: "ESLint + `eslint-plugin-react-hooks`",
            value:
              "Le linter signale les erreurs classiques : règles des hooks violées, dépendances d'effets oubliées. Le template Vite l'inclut souvent déjà.",
          },
          {
            label: "TypeScript",
            value:
              "Le template `react-ts` le préconfigure. Il vérifie les props, l'état et les événements pendant l'écriture.",
          },
          {
            label: "Prettier (ou Biome)",
            value:
              "Formatage automatique du code : plus aucun débat sur l'indentation en revue.",
          },
        ],
      },
      {
        kind: "diagram",
        title: "Le poste de travail React typique",
        lines: [
          "Navigateur + React DevTools",
          "     │",
          "     ▼",
          "VS Code (ou autre éditeur)",
          "     │  + TypeScript (vérification)",
          "     │  + ESLint (règles des hooks)",
          "     │  + Prettier (formatage)",
          "     ▼",
          "Vite — serveur de dev (`npm run dev`)",
          "     │",
          "     ▼",
          "Git → CI → build (`npm run build`) → hébergement",
        ],
      },
    ],
  },
  {
    id: "configuration-vscode",
    title: "Configurer VS Code pour React",
    level: 2,
    intro:
      "Les concepts à comprendre plutôt qu'une liste de paramètres à copier.",
    blocks: [
      {
        kind: "fields",
        title: "Concepts de configuration",
        fields: [
          {
            label: "Langage des fichiers",
            value:
              "VS Code doit traiter les `.tsx` comme du TypeScript React : c'est automatique avec l'extension TypeScript intégrée. Vérifiez que la coloration et l'autocomplétion fonctionnent dans le JSX.",
          },
          {
            label: "Emmet",
            value:
              "L'expansion d'abréviations (`div.container` + Tab) fonctionne dans les fichiers JSX/TSX et accélère l'écriture du balisage.",
          },
          {
            label: "Formatage à la sauvegarde",
            value:
              "Activez le formatage automatique à la sauvegarde avec Prettier : le code reste propre sans y penser.",
          },
          {
            label: "React DevTools (navigateur)",
            value:
              "Ce n'est pas une extension d'éditeur mais de navigateur : deux nouveaux onglets « Components » et « Profiler » apparaissent dans les outils de développement.",
          },
          {
            label: "Snippets",
            value:
              "Des modèles de code pour générer un composant ou un `useState` en quelques touches. Utiles, mais apprenez d'abord à les écrire à la main.",
          },
        ],
      },
      {
        kind: "text",
        text: "Principe général : comprenez ce que fait chaque outil (vérification, formatage, inspection) avant d'empiler les extensions. Un éditeur bien compris vaut mieux que dix extensions installées au hasard.",
      },
    ],
  },
  {
    id: "workflow-professionnel",
    title: "Workflow professionnel",
    level: 2,
    intro:
      "À quoi ressemble une journée de développement React en équipe.",
    blocks: [
      {
        kind: "diagram",
        title: "Du ticket au déploiement",
        lines: [
          "Ticket / maquette",
          "     │",
          "     ▼",
          "Branche Git dédiée",
          "     │",
          "     ▼",
          "`npm run dev` — développer composant par composant",
          "     │  (React DevTools ouvert, tests au fil de l'eau)",
          "     ▼",
          "Vérifications locales : TypeScript, ESLint, tests",
          "     │",
          "     ▼",
          "Commit → Pull Request → revue de code",
          "     │  (la CI rejoue les vérifications)",
          "     ▼",
          "Fusion → `npm run build` → déploiement",
        ],
      },
      {
        kind: "command",
        label: "Vérifier que le projet compile et que les types sont sains",
        command: "npx tsc --noEmit",
        why: "Le template Vite sépare le build (rapide, sans vérification de types) et la vérification TypeScript. Cette commande détecte les erreurs de typage des props et de l'état sans produire de fichiers.",
        verify: "Aucune erreur affichée : les types sont cohérents.",
      },
      {
        kind: "command",
        label: "Produire le build de production",
        command: "npm run build",
        why: "Compile l'application en fichiers statiques optimisés (minifiés, découpés) dans le dossier `dist/`. C'est ce qui est déployé, jamais le code source.",
        verify: "Le dossier `dist/` contient `index.html` et des fichiers JS/CSS.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "jsx-tsx",
    title: "JSX / TSX",
    level: 3,
    intro:
      "La syntaxe qui ressemble à du HTML mais n'en est pas : comprendre ce qu'elle devient vraiment.",
    blocks: [
      {
        kind: "fields",
        title: "JSX, point par point",
        fields: [
          {
            label: "En une phrase",
            value:
              "JSX est une extension de syntaxe qui permet d'écrire une description d'interface proche du HTML directement dans le JavaScript (TSX = JSX + TypeScript).",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Décrire une interface avec des appels de fonctions imbriqués est illisible. JSX rend la structure visuelle : l'imbrication du code reflète l'imbrication de l'interface.",
          },
          {
            label: "Comment ça fonctionne",
            value:
              "Le JSX est compilé avant l'exécution : `<h1>Bonjour</h1>` devient un appel qui crée un objet décrivant l'élément (type, props, enfants). Avec le transformateur moderne, aucune importation de React n'est nécessaire dans chaque fichier.",
          },
          {
            label: "Ce n'est pas du HTML",
            value:
              "`class` devient `className`, `for` devient `htmlFor`, les attributs utilisent le camelCase (`onClick`, `tabIndex`). Les accolades `{}` permettent d'injecter n'importe quelle expression JavaScript.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Expressions dans le JSX",
        code: "const utilisateur = { nom: \"Aina\", role: \"admin\" };\n\nfunction Carte() {\n  return (\n    <article className=\"carte\">\n      <h2>{utilisateur.nom}</h2>\n      {/* expression JavaScript entre accolades */}\n      <p>{utilisateur.nom.length > 3 ? \"Nom long\" : \"Nom court\"}</p>\n    </article>\n  );\n}",
      },
      {
        kind: "text",
        text: "Erreur fréquente : écrire des instructions (`if`, `for`) directement dans le JSX. Seules les expressions sont autorisées entre accolades : utilisez l'opérateur ternaire ou extrayez la logique dans une variable avant le `return`.",
      },
    ],
  },
  {
    id: "composants-props",
    title: "Composants et props",
    level: 3,
    intro:
      "Les briques de toute application React : des fonctions qui reçoivent des données et décrivent une interface.",
    blocks: [
      {
        kind: "fields",
        title: "Composants et props, point par point",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un composant est une fonction qui reçoit des `props` (données en entrée) et retourne du JSX (interface en sortie).",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Découper l'interface en composants rend le code réutilisable, testable et compréhensible : chaque composant a une responsabilité claire.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Dès qu'un morceau d'interface se répète ou mérite un nom : bouton, carte, champ de formulaire, mise en page.",
          },
          {
            label: "Comment ça fonctionne",
            value:
              "Le parent rend `<Carte titre=\"Bonjour\" />` : React appelle la fonction `Carte` avec `props = { titre: \"Bonjour\" }`. Les props sont en lecture seule — un composant ne doit jamais modifier ses props.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Typer les props avec TypeScript",
        code: "interface CarteProps {\n  titre: string;\n  description?: string; // optionnelle\n  onFermer: () => void;\n}\n\nfunction Carte({ titre, description, onFermer }: CarteProps) {\n  return (\n    <article>\n      <h2>{titre}</h2>\n      {description && <p>{description}</p>}\n      <button onClick={onFermer}>Fermer</button>\n    </article>\n  );\n}",
      },
      {
        kind: "text",
        text: "Exemple réel : une liste de produits rend un composant `CarteProduit` par produit, chacun recevant `nom`, `prix` et `image` en props. Le même composant sert sur la page d'accueil, la recherche et les recommandations.",
      },
      {
        kind: "text",
        text: "Bonne pratique : typer systématiquement les props avec une `interface`. L'éditeur signale alors immédiatement une prop manquante ou mal typée, et la signature du composant devient sa documentation.",
      },
    ],
  },
  {
    id: "composition",
    title: "Composition",
    level: 3,
    intro:
      "Le mécanisme central pour assembler des composants : passer des composants à des composants.",
    blocks: [
      {
        kind: "fields",
        title: "La composition, point par point",
        fields: [
          {
            label: "En une phrase",
            value:
              "La composition consiste à imbriquer des composants via la prop spéciale `children` plutôt que de les configurer avec des dizaines de props.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Un composant `Boite` qui accepte `children` peut contenir n'importe quoi — texte, boutons, autres composants — sans connaître leur nature. C'est plus flexible que de prévoir une prop pour chaque cas.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Conteneurs génériques : mise en page, carte, modale, panneau. Dès qu'un composant « enveloppe » du contenu, pensez `children`.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "children en pratique",
        code: "function Carte({ titre, children }: { titre: string; children: React.ReactNode }) {\n  return (\n    <section className=\"carte\">\n      <h2>{titre}</h2>\n      <div className=\"contenu\">{children}</div>\n    </section>\n  );\n}\n\n// Utilisation : le contenu est libre\n<Carte titre=\"Profil\">\n  <img src=\"/avatar.png\" alt=\"Avatar\" />\n  <p>Développeuse front-end</p>\n  <button>Contacter</button>\n</Carte>",
      },
      {
        kind: "text",
        text: "Bonne pratique : préférez la composition à la configuration excessive. Si un composant accumule des props booléennes (`avecImage`, `avecBouton`, `varianteX`), c'est souvent le signe qu'il devrait accepter des `children` à la place. React recommande la composition plutôt que l'héritage entre composants.",
      },
    ],
  },
  {
    id: "rendu-conditionnel",
    title: "Rendu conditionnel",
    level: 3,
    intro:
      "Afficher ou masquer des parties de l'interface selon l'état.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois techniques",
        fields: [
          {
            label: "`&&` — afficher si vrai",
            value:
              "`{estConnecte && <Bonjour />}` : le composant ne s'affiche que si la condition est vraie. Attention : si la condition peut valoir `0`, il s'affichera !",
          },
          {
            label: "Ternaire — l'un ou l'autre",
            value:
              "`{chargement ? <Spinner /> : <Contenu />}` : le choix explicite entre deux affichages.",
          },
          {
            label: "Retour anticipé — rien du tout",
            value:
              "`if (!donnees) return null;` en début de composant : le plus lisible quand il n'y a rien à afficher.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Les trois états d'une donnée",
        code: "function Profil({ utilisateur }: { utilisateur: User | null }) {\n  if (utilisateur === null) {\n    return <p>Veuillez vous connecter.</p>;\n  }\n  return (\n    <div>\n      <h1>{utilisateur.nom}</h1>\n      {utilisateur.estAdmin && <button>Administration</button>}\n    </div>\n  );\n}",
      },
      {
        kind: "text",
        text: "Erreur fréquente : `{compteur && <p>...}` où `compteur` vaut `0` affiche « 0 » à l'écran, car `0` est falsy mais rendu tel quel. Écrivez `{compteur > 0 && ...}` pour être explicite.",
      },
    ],
  },
  {
    id: "listes-cles",
    title: "Listes et clés",
    level: 3,
    intro:
      "Afficher des collections et aider React à suivre chaque élément avec la prop `key`.",
    blocks: [
      {
        kind: "fields",
        title: "Listes et clés, point par point",
        fields: [
          {
            label: "En une phrase",
            value:
              "On affiche une liste avec `.map()`, et chaque élément reçoit une prop `key` stable et unique qui permet à React de l'identifier entre deux rendus.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Sans clé, React ne sait pas quel élément a été ajouté, supprimé ou déplacé : il peut détruire et recréer des éléments inutilement, perdre l'état local (focus, saisie) ou animer le mauvais élément.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Toujours, dès qu'on rend un tableau d'éléments. La clé doit être stable (même valeur entre les rendus) et unique parmi ses frères et sœurs.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Bonnes et mauvaises clés",
        code: "// Bien : identifiant stable venant des données\n{utilisateurs.map((u) => (\n  <li key={u.id}>{u.nom}</li>\n))}\n\n// À éviter : l'index comme clé sur une liste qui change\n{utilisateurs.map((u, index) => (\n  <li key={index}>{u.nom}</li>\n))}",
      },
      {
        kind: "text",
        text: "Erreur fréquente : utiliser l'index du tableau comme clé sur une liste où l'on peut réordonner, filtrer ou supprimer. React confond alors les éléments : un champ de saisie peut « suivre » la mauvaise ligne. L'index n'est acceptable que pour une liste statique qui ne change jamais d'ordre.",
      },
      {
        kind: "text",
        text: "Bonne pratique : utilisez l'identifiant métier (`id` de la base de données). La clé n'est pas accessible dans le composant via les props — si l'enfant en a besoin, passez l'`id` comme prop séparée.",
      },
    ],
  },
  {
    id: "evenements",
    title: "Gestion des événements",
    level: 3,
    intro:
      "Réagir aux clics, saisies et soumissions : la syntaxe et les pièges.",
    blocks: [
      {
        kind: "fields",
        title: "Les événements, point par point",
        fields: [
          {
            label: "En une phrase",
            value:
              "On attache un gestionnaire avec une prop `onQuelqueChose` (`onClick`, `onChange`, `onSubmit`) qui reçoit une fonction.",
          },
          {
            label: "Comment ça fonctionne",
            value:
              "React normalise les événements du navigateur : `onClick={maFonction}` passe la fonction (elle sera appelée au clic), tandis que `onClick={maFonction()}` l'appelle immédiatement pendant le rendu — une erreur classique.",
          },
          {
            label: "Passer des arguments",
            value:
              "Enveloppez l'appel dans une flèche : `onClick={() => supprimer(id)}`. La fonction fléchée n'est créée qu'au rendu, l'appel a lieu au clic.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Formulaire : empêcher le rechargement",
        code: "function Recherche() {\n  const [texte, setTexte] = useState(\"\");\n\n  function valider(e: React.FormEvent) {\n    e.preventDefault(); // bloque le rechargement de la page\n    console.log(\"Recherche :\", texte);\n  }\n\n  return (\n    <form onSubmit={valider}>\n      <input value={texte} onChange={(e) => setTexte(e.target.value)} />\n      <button type=\"submit\">Chercher</button>\n    </form>\n  );\n}",
      },
      {
        kind: "text",
        text: "Erreur fréquente : oublier `e.preventDefault()` sur la soumission d'un formulaire — la page se recharge et l'état React est perdu. Bonne pratique : typer l'événement (`React.FormEvent`, `React.ChangeEvent<HTMLInputElement>`) pour bénéficier de l'autocomplétion.",
      },
    ],
  },
  {
    id: "etat-usestate",
    title: "État local avec useState",
    level: 3,
    intro:
      "Le hook fondamental : mémoriser une valeur entre les rendus et déclencher un ré-affichage quand elle change.",
    blocks: [
      {
        kind: "fields",
        title: "useState, point par point",
        fields: [
          {
            label: "En une phrase",
            value:
              "`useState` déclare une valeur persistante : `const [valeur, setValeur] = useState(initial)` — modifier la valeur via `setValeur` demande à React de ré-afficher le composant.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Une variable locale est réinitialisée à chaque rendu. L'état survit aux rendus : c'est la mémoire du composant.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Toute donnée qui change avec l'interaction et influence l'affichage : champ de saisie, onglet actif, élément sélectionné, ouverture d'un panneau.",
          },
          {
            label: "Comment ça fonctionne",
            value:
              "L'appel à `setValeur` ne modifie pas la variable immédiatement : il planifie un nouveau rendu, pendant lequel `useState` retournera la nouvelle valeur. L'état est immuable — on le remplace, on ne le mute pas.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Mise à jour fonctionnelle et immuabilité",
        code: "const [compteur, setCompteur] = useState(0);\nconst [taches, setTaches] = useState<string[]>([]);\n\n// Bien : forme fonctionnelle quand le nouveau dépend de l'ancien\nsetCompteur((c) => c + 1);\n\n// Bien : créer un nouveau tableau, jamais de mutation\nsetTaches((anciennes) => [...anciennes, \"Nouvelle tâche\"]);\n\n// Mal : mutation directe — React ne détecte pas le changement\n// taches.push(\"Nouvelle tâche\");",
      },
      {
        kind: "text",
        text: "Erreur fréquente : muter l'état directement (`tableau.push()`, `objet.champ = x`). React compare les références : si la référence n'a pas changé, il considère qu'il n'y a rien à mettre à jour et l'interface ne bouge pas. Copiez toujours (`...spread`, `.map`, `.filter`).",
      },
      {
        kind: "text",
        text: "Bonne pratique : utilisez la forme fonctionnelle `setX(v => ...)` dès que la nouvelle valeur dépend de l'ancienne, surtout dans des gestionnaires rapides ou des effets. Et ne stockez dans l'état que ce qui ne peut pas être calculé : si une valeur dérive d'autres états, calculez-la pendant le rendu.",
      },
    ],
  },
  {
    id: "regles-hooks",
    title: "Les règles des hooks",
    level: 3,
    intro:
      "Trois règles simples qui expliquent 80 % des erreurs de débutants avec les hooks.",
    blocks: [
      {
        kind: "fields",
        title: "Les règles et leur raison",
        fields: [
          {
            label: "Règle 1 : au niveau racine uniquement",
            value:
              "Appelez les hooks au niveau racine du composant ou d'un hook personnalisé — jamais dans des conditions, des boucles ou des fonctions imbriquées.",
          },
          {
            label: "Pourquoi",
            value:
              "React associe chaque hook à sa position dans l'ordre d'appel. Si un `useState` est parfois appelé et parfois non (à cause d'un `if`), tous les hooks suivants sont décalés et reçoivent le mauvais état.",
          },
          {
            label: "Règle 2 : dans les composants ou hooks customs",
            value:
              "N'appelez pas les hooks dans des fonctions ordinaires : uniquement dans des composants React ou des hooks personnalisés (fonctions commençant par `use`).",
          },
          {
            label: "Règle 3 : l'ESLint vous surveille",
            value:
              "Le plugin `eslint-plugin-react-hooks` détecte automatiquement les violations. Une erreur de ce linter n'est jamais un faux positif à ignorer.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Condition sur le résultat, pas sur l'appel",
        code: "// Mal : hook dans une condition\nif (connecte) {\n  const [donnees, setDonnees] = useState(null); // interdit\n}\n\n// Bien : hook toujours appelé, condition sur l'usage\nconst [donnees, setDonnees] = useState(null);\nif (!connecte) return <p>Non connecté</p>;",
      },
    ],
  },
  {
    id: "usereducer",
    title: "useReducer : état complexe",
    level: 3,
    intro:
      "Quand plusieurs valeurs d'état évoluent ensemble selon des règles, `useReducer` structure les transitions.",
    blocks: [
      {
        kind: "fields",
        title: "useReducer, point par point",
        fields: [
          {
            label: "En une phrase",
            value:
              "`useReducer` centralise les mises à jour d'un état complexe dans une fonction `reducer` qui reçoit l'état actuel et une action, et retourne le nouvel état.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Avec plusieurs `useState` liés (ex. chargement + données + erreur), les mises à jour s'éparpillent et des états incohérents apparaissent. Le reducer regroupe les transitions valides en un seul endroit.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "État avec plusieurs sous-valeurs interdépendantes, transitions nommées (panier, formulaire multi-étapes, machine à états simple). Pour un compteur isolé, `useState` suffit.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Un panier avec useReducer",
        code: "type Action = { type: \"ajouter\"; id: string } | { type: \"vider\" };\n\nfunction reducer(panier: string[], action: Action): string[] {\n  switch (action.type) {\n    case \"ajouter\":\n      return [...panier, action.id];\n    case \"vider\":\n      return [];\n  }\n}\n\nfunction Boutique() {\n  const [panier, dispatch] = useReducer(reducer, []);\n  return (\n    <button onClick={() => dispatch({ type: \"ajouter\", id: \"p1\" })}>\n      Ajouter ({panier.length})\n    </button>\n  );\n}",
      },
      {
        kind: "text",
        text: "Exemple réel : un formulaire d'inscription en 3 étapes où chaque étape valide ses champs et où « précédent » restaure les valeurs — le reducer garde les transitions (`suivant`, `precedent`, `reinitialiser`) explicites et testables séparément du composant.",
      },
    ],
  },
  {
    id: "effets-useeffect",
    title: "Effets avec useEffect",
    level: 3,
    intro:
      "Le hook le plus puissant et le plus mal compris : synchroniser le composant avec le monde extérieur.",
    blocks: [
      {
        kind: "fields",
        title: "useEffect, point par point",
        fields: [
          {
            label: "En une phrase",
            value:
              "`useEffect` exécute du code après le rendu pour synchroniser le composant avec un système externe : réseau, DOM manuel, minuteur, abonnement.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Le rendu doit rester pur (même entrées → même sortie). Tout ce qui a un effet de bord — charger des données, s'abonner, manipuler le DOM — doit se faire à part, après le rendu.",
          },
          {
            label: "Le modèle mental",
            value:
              "Ne pensez pas « au montage / à la mise à jour », pensez synchronisation : « quand ces valeurs changent, resynchronise cet effet ». Le tableau de dépendances liste tout ce que l'effet utilise et qui peut changer.",
          },
          {
            label: "Le nettoyage",
            value:
              "L'effet peut retourner une fonction de nettoyage, exécutée avant le prochain effet et au démontage : désabonner, annuler un minuteur, fermer une connexion.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Effet avec dépendances et nettoyage",
        code: "function TitrePage({ titre }: { titre: string }) {\n  useEffect(() => {\n    document.title = titre; // synchronise le titre de l'onglet\n  }, [titre]); // se resynchronise quand `titre` change\n\n  return <h1>{titre}</h1>;\n}\n\nfunction Horloge() {\n  const [heure, setHeure] = useState(new Date());\n\n  useEffect(() => {\n    const id = setInterval(() => setHeure(new Date()), 1000);\n    return () => clearInterval(id); // nettoyage indispensable\n  }, []);\n\n  return <p>{heure.toLocaleTimeString()}</p>;\n}",
      },
      {
        kind: "text",
        text: "Erreur fréquente n°1 : oublier une dépendance. Si l'effet utilise `utilisateurId` mais que le tableau est vide `[]`, l'effet garde l'ancienne valeur et affiche des données périmées. Suivez l'avertissement ESLint `exhaustive-deps`.",
      },
      {
        kind: "text",
        text: "Erreur fréquente n°2 : mettre dans un effet ce qui n'en est pas un. Calculer une valeur dérivée → faites-le pendant le rendu. Réagir à un événement (clic) → mettez le code dans le gestionnaire, pas dans un effet. Un effet qui se déclenche en boucle infinie vient presque toujours d'un objet ou d'une fonction recréée à chaque rendu placée dans les dépendances.",
      },
    ],
  },
  {
    id: "refs-useref",
    title: "Refs avec useRef",
    level: 3,
    intro:
      "Une « boîte » mutable qui survit aux rendus sans en déclencher : pour le DOM et les valeurs persistantes.",
    blocks: [
      {
        kind: "fields",
        title: "useRef, point par point",
        fields: [
          {
            label: "En une phrase",
            value:
              "`useRef` retourne un objet `{ current }` persistant entre les rendus ; modifier `.current` ne déclenche pas de ré-affichage.",
          },
          {
            label: "Cas d'usage 1 : accéder au DOM",
            value:
              "`<input ref={champRef} />` puis `champRef.current.focus()` : donner le focus, mesurer un élément, contrôler une vidéo.",
          },
          {
            label: "Cas d'usage 2 : valeur persistante non visuelle",
            value:
              "Stocker un identifiant de minuteur, le rendu précédent d'une valeur, ou un drapeau — tout ce qui doit survivre sans être affiché.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Focus automatique à l'ouverture",
        code: "function ChampRecherche() {\n  const champRef = useRef<HTMLInputElement>(null);\n\n  useEffect(() => {\n    champRef.current?.focus(); // accès direct au DOM, une fois\n  }, []);\n\n  return <input ref={champRef} placeholder=\"Rechercher…\" />;\n}",
      },
      {
        kind: "text",
        text: "Erreur fréquente : utiliser une ref pour stocker une valeur affichée à l'écran. Comme la modification ne déclenche pas de rendu, l'interface ne se met pas à jour — c'est le travail de `useState`. Règle simple : si la valeur influence le JSX, c'est un état ; sinon, c'est une ref.",
      },
    ],
  },
  {
    id: "context",
    title: "Context : partager sans prop drilling",
    level: 3,
    intro:
      "Transmettre une donnée à toute une sous-arborescence sans la faire transiter par chaque composant intermédiaire.",
    blocks: [
      {
        kind: "fields",
        title: "Context, point par point",
        fields: [
          {
            label: "En une phrase",
            value:
              "`createContext` + `Provider` + `useContext` permettent à un composant profond de lire une valeur fournie en haut de l'arbre, sans props intermédiaires.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Faire passer `utilisateur` ou `theme` par 5 niveaux de props pollue chaque composant intermédiaire avec des données qui ne le concernent pas (prop drilling).",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Données stables et globales : utilisateur connecté, thème, langue, configuration. Idéal quand la valeur change rarement.",
          },
          {
            label: "Quand l'éviter",
            value:
              "Pour un état qui change souvent (panier, filtres de recherche) : chaque changement re-rend tous les consommateurs du contexte, ce qui peut devenir coûteux. C'est là qu'un store externe (Zustand, Redux) est plus adapté.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Un contexte de thème minimal",
        code: "const ThemeContext = createContext<\"clair\" | \"sombre\">(\"clair\");\n\nfunction App() {\n  return (\n    <ThemeContext.Provider value=\"sombre\">\n      <Page /> {/* tous les descendants peuvent lire le thème */}\n    </ThemeContext.Provider>\n  );\n}\n\nfunction Bouton() {\n  const theme = useContext(ThemeContext);\n  return <button className={theme}>OK</button>;\n}",
      },
      {
        kind: "text",
        text: "Bonne pratique : créez un hook dédié (`useTheme()`) qui encapsule `useContext`, et séparez les contextes par préoccupation plutôt qu'un unique « contexte global ». Le Context transporte des données, il ne remplace pas une vraie gestion d'état.",
      },
    ],
  },
  {
    id: "etat-global",
    title: "État global : Context, Zustand, Redux Toolkit",
    level: 3,
    intro:
      "Quand l'état dépasse un composant : trois approches, leurs différences et leurs cas d'usage — sans vainqueur désigné.",
    blocks: [
      {
        kind: "table",
        headers: ["Approche", "Principe", "Idéal pour", "À noter"],
        rows: [
          [
            "Context + hooks",
            "Valeur fournie en haut de l'arbre, lue avec `useContext`",
            "Données stables et peu modifiées (utilisateur, thème, langue)",
            "Chaque mise à jour re-rend tous les consommateurs",
          ],
          [
            "Zustand",
            "Store externe minimaliste consommé via des hooks sélectifs",
            "État partagé qui change souvent, sans boilerplate (panier, UI)",
            "Petite API, pas de Provider obligatoire, chaque composant ne se ré-abonne qu'à ce qu'il lit",
          ],
          [
            "Redux Toolkit",
            "Store centralisé avec tranches (`createSlice`), actions et devtools",
            "Applications complexes : état normalisé, logique métier, traçabilité, équipes nombreuses",
            "Plus structuré et outillé, mais plus de concepts à apprendre",
          ],
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Zustand : un store en quelques lignes",
        code: "import { create } from \"zustand\";\n\ninterface PanierStore {\n  articles: string[];\n  ajouter: (id: string) => void;\n}\n\nconst usePanier = create<PanierStore>((set) => ({\n  articles: [],\n  ajouter: (id) => set((s) => ({ articles: [...s.articles, id] })),\n}));\n\n// Dans n'importe quel composant :\nconst ajouter = usePanier((s) => s.ajouter);",
      },
      {
        kind: "command",
        label: "Installer Zustand",
        command: "npm install zustand",
        why: "Zustand est une bibliothèque de gestion d'état légère et populaire. On l'installe uniquement si l'état partagé le justifie — pas par défaut sur un petit projet.",
        verify: "`zustand` apparaît dans les `dependencies` de `package.json`.",
      },
      {
        kind: "text",
        text: "Comment choisir : commencez par l'état local (`useState`), remontez l'état au parent commun quand deux composants le partagent, passez au Context pour les données stables et globales, et n'adoptez Zustand ou Redux Toolkit que lorsque l'état partagé devient fréquent, complexe ou critique. Chaque couche ajoute de la complexité : ne la payez que si elle résout un problème réel.",
      },
    ],
  },
  {
    id: "hooks-customs",
    title: "Hooks personnalisés",
    level: 3,
    intro:
      "Extraire la logique réutilisable des composants dans des fonctions `useQuelqueChose`.",
    blocks: [
      {
        kind: "fields",
        title: "Les hooks customs, point par point",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un hook personnalisé est une fonction dont le nom commence par `use` et qui peut appeler d'autres hooks : elle encapsule une logique avec état pour la réutiliser.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Sans eux, la même logique (charger des données, suivre la taille d'une fenêtre, gérer un formulaire) serait dupliquée dans chaque composant.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Dès qu'une logique avec état ou effet sert dans deux composants — ou même dans un seul, pour clarifier le composant en séparant la logique de l'affichage.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "useLocalStorage : persistance réutilisable",
        code: "function useLocalStorage(cle: string, initial: string) {\n  const [valeur, setValeur] = useState(() => {\n    return localStorage.getItem(cle) ?? initial;\n  });\n\n  function changer(nouvelle: string) {\n    setValeur(nouvelle);\n    localStorage.setItem(cle, nouvelle);\n  }\n\n  return [valeur, changer] as const;\n}\n\n// Utilisation : comme un useState qui survit au rechargement\nfunction Editeur() {\n  const [texte, setTexte] = useLocalStorage(\"brouillon\", \"\");\n  return <textarea value={texte} onChange={(e) => setTexte(e.target.value)} />;\n}",
      },
      {
        kind: "text",
        text: "Bonne pratique : un hook custom ne rend pas de JSX, il retourne des données et des fonctions. Nommez-le par ce qu'il fait (`useDebounce`, `useMediaQuery`), gardez-le focalisé sur une seule responsabilité, et testez-le indépendamment du composant.",
      },
    ],
  },
  {
    id: "formulaires-controles",
    title: "Formulaires contrôlés",
    level: 3,
    intro:
      "La manière idiomatique de gérer les saisies en React : l'état est la source de vérité.",
    blocks: [
      {
        kind: "fields",
        title: "Formulaires contrôlés, point par point",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un champ contrôlé tire sa valeur de l'état React (`value={...}`) et la met à jour via `onChange` : React possède la donnée, pas le DOM.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Valider en direct, désactiver le bouton tant que le formulaire est invalide, formater la saisie, réinitialiser : tout devient trivial quand la valeur vit dans l'état.",
          },
          {
            label: "L'alternative",
            value:
              "Les champs non contrôlés laissent le DOM gérer la valeur (`defaultValue` + `ref` pour la lire). Plus simple pour un champ isolé, moins adapté aux formulaires riches.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Champ contrôlé avec validation",
        code: "function Inscription() {\n  const [email, setEmail] = useState(\"\");\n  const valide = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);\n\n  return (\n    <form onSubmit={(e) => e.preventDefault()}>\n      <label>\n        Email\n        <input\n          type=\"email\"\n          value={email}\n          onChange={(e) => setEmail(e.target.value)}\n        />\n      </label>\n      {!valide && email !== \"\" && <p>Format d'email invalide.</p>}\n      <button type=\"submit\" disabled={!valide}>S'inscrire</button>\n    </form>\n  );\n}",
      },
      {
        kind: "text",
        text: "Erreur fréquente : passer `value` sans `onChange` — le champ devient en lecture seule et l'utilisateur ne peut plus taper. React affiche d'ailleurs un avertissement explicite dans la console dans ce cas.",
      },
    ],
  },
  {
    id: "formulaires-libs",
    title: "Bibliothèques de formulaires",
    level: 3,
    intro:
      "Quand les formulaires deviennent complexes, des bibliothèques dédiées évitent le code répétitif.",
    blocks: [
      {
        kind: "fields",
        title: "Quand passer à une bibliothèque",
        fields: [
          {
            label: "Le seuil",
            value:
              "Un ou deux champs : l'état local suffit. Dès qu'on accumule validation, messages d'erreur par champ, champs dynamiques ou soumission asynchrone, une bibliothèque fait gagner un temps considérable.",
          },
          {
            label: "React Hook Form",
            value:
              "Bibliothèque populaire qui gère les champs en non-contrôlé (performances) avec une API de validation simple et une bonne intégration TypeScript. Mention factuelle : c'est un choix courant, pas une obligation.",
          },
          {
            label: "Validation de schémas",
            value:
              "Des bibliothèques comme Zod permettent de décrire le schéma attendu (types, contraintes) et de valider les données avec — en synergie avec TypeScript.",
          },
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : apprenez d'abord les formulaires contrôlés à la main — c'est le fondement. La bibliothèque n'est qu'une automatisation de ce que vous savez déjà faire, et vous saurez la quitter si le besoin change.",
      },
    ],
  },
  {
    id: "memoisation",
    title: "Mémoïsation : useMemo, useCallback, memo",
    level: 3,
    intro:
      "Éviter les calculs et rendus inutiles — mais seulement quand c'est justifié, jamais par défaut.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois outils et leur rôle",
        fields: [
          {
            label: "En une phrase",
            value:
              "La mémoïsation met en cache un résultat et ne le recalcule que si ses dépendances changent.",
          },
          {
            label: "`useMemo` — mémoriser une valeur",
            value:
              "`const total = useMemo(() => calculCouteux(items), [items])`. Justifié pour un calcul réellement coûteux (filtrage/tri de milliers d'éléments).",
          },
          {
            label: "`useCallback` — stabiliser une fonction",
            value:
              "`const onAjout = useCallback(() => ..., [deps])`. Utile quand la fonction est passée à un composant mémoïsé ou utilisée comme dépendance d'un effet.",
          },
          {
            label: "`React.memo` — mémoriser un composant",
            value:
              "Le composant ne se ré-affiche que si ses props changent (comparaison superficielle). Efficace sur des composants coûteux rendus souvent avec les mêmes props.",
          },
        ],
      },
      {
        kind: "text",
        text: "Pourquoi pas par défaut : chaque mémoïsation a un coût (mémoire, comparaison des dépendances, complexité du code). Sur un composant simple, `memo` coûte plus cher qu'il ne rapporte. La démarche professionnelle : mesurer d'abord avec le Profiler des React DevTools, optimiser ensuite les points chauds réels.",
      },
      {
        kind: "text",
        text: "Erreur fréquente : mémoïser un composant mais lui passer à chaque rendu un objet ou une fonction recréée (`onClick={() => ...}` inline) — la comparaison superficielle échoue toujours et `memo` ne sert à rien. La mémoïsation ne fonctionne qu'en chaîne : composant mémoïsé + props stables.",
      },
    ],
  },
  {
    id: "suspense-lazy",
    title: "Suspense et chargement différé",
    level: 3,
    intro:
      "Afficher un état de chargement pendant qu'une partie de l'application se charge.",
    blocks: [
      {
        kind: "fields",
        title: "Suspense, point par point",
        fields: [
          {
            label: "En une phrase",
            value:
              "`<Suspense fallback={<Chargement />}>` affiche un contenu de remplacement tant que ses enfants ne sont pas prêts.",
          },
          {
            label: "Cas d'usage principal : le code-splitting",
            value:
              "`React.lazy(() => import(\"./GrosComposant\"))` charge le code d'une page uniquement quand on en a besoin. Suspense affiche le fallback pendant le téléchargement.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Sans découpage, l'utilisateur télécharge toute l'application avant d'afficher quoi que ce soit. Le chargement différé réduit le bundle initial et accélère le premier affichage.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Découper le code par route",
        code: "import { lazy, Suspense } from \"react\";\n\nconst TableauDeBord = lazy(() => import(\"./pages/TableauDeBord\"));\n\nfunction App() {\n  return (\n    <Suspense fallback={<p>Chargement…</p>}>\n      <TableauDeBord />\n    </Suspense>\n  );\n}",
      },
      {
        kind: "text",
        text: "Bonne pratique : découpez au niveau des routes (chaque page = un chunk), pas au niveau de chaque petit composant — trop de chunks nuit aussi aux performances. Les frameworks comme Next.js automatisent ce découpage.",
      },
    ],
  },
  {
    id: "data-fetching",
    title: "Récupération de données",
    level: 3,
    intro:
      "Charger des données d'une API : les trois états à gérer et les outils qui simplifient.",
    blocks: [
      {
        kind: "fields",
        title: "Les fondamentaux",
        fields: [
          {
            label: "En une phrase",
            value:
              "Charger des données, c'est gérer trois états : en cours (`loading`), échec (`error`) et succès (`data`) — jamais un seul.",
          },
          {
            label: "La base : `useEffect` + `fetch`",
            value:
              "Un effet déclenche l'appel au montage, les états suivent la progression. Suffisant pour un appel isolé, mais le cache, la revalidation et la déduplication deviennent vite manuels et fragiles.",
          },
          {
            label: "TanStack Query",
            value:
              "Bibliothèque dédiée à la donnée serveur : cache, revalidation en arrière-plan, états `isLoading`/`isError`, pagination. Mention factuelle : c'est l'option la plus répandue pour ce besoin, pas la seule.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Les trois états, à la main",
        code: "function Utilisateurs() {\n  const [data, setData] = useState<User[]>([]);\n  const [chargement, setChargement] = useState(true);\n  const [erreur, setErreur] = useState<string | null>(null);\n\n  useEffect(() => {\n    fetch(\"/api/utilisateurs\")\n      .then((r) => {\n        if (!r.ok) throw new Error(\"Échec du chargement\");\n        return r.json();\n      })\n      .then(setData)\n      .catch((e) => setErreur(e.message))\n      .finally(() => setChargement(false));\n  }, []);\n\n  if (chargement) return <p>Chargement…</p>;\n  if (erreur) return <p>Erreur : {erreur}</p>;\n  return (\n    <ul>\n      {data.map((u) => (\n        <li key={u.id}>{u.nom}</li>\n      ))}\n    </ul>\n  );\n}",
      },
      {
        kind: "command",
        label: "Installer TanStack Query",
        command: "npm install @tanstack/react-query",
        why: "Fournit les hooks (`useQuery`, `useMutation`) et le cache pour la donnée serveur. À installer quand plusieurs écrans chargent des données et que le cache devient un besoin réel.",
        verify: "`@tanstack/react-query` apparaît dans les `dependencies`.",
      },
      {
        kind: "text",
        text: "Erreur fréquente : oublier l'état d'erreur — l'application reste bloquée sur « Chargement… » quand l'API échoue. Et ne mettez pas la donnée serveur dans un état global type Zustand/Redux : le cache d'une bibliothèque de fetching est fait pour ça.",
      },
    ],
  },
  {
    id: "routing",
    title: "Routing avec React Router",
    level: 3,
    intro:
      "Naviguer entre les pages d'une application monopage sans rechargement.",
    blocks: [
      {
        kind: "fields",
        title: "React Router, point par point",
        fields: [
          {
            label: "En une phrase",
            value:
              "React Router associe des URL à des composants : `/utilisateurs/42` affiche le composant `Profil` avec le paramètre `42`.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "React seul ne gère pas les URL. Sans routing, impossible d'avoir des pages partageables, un bouton retour fonctionnel ou des liens profonds.",
          },
          {
            label: "Les briques",
            value:
              "`BrowserRouter` (contexte), `Routes` + `Route path=\"...\" element={...}` (association), `Link` (navigation sans rechargement), `useParams` (paramètres d'URL), `useNavigate` (navigation programmatique).",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Routes de base",
        code: "import { BrowserRouter, Routes, Route, Link, useParams } from \"react-router-dom\";\n\nfunction Profil() {\n  const { id } = useParams(); // /profil/42 → id = \"42\"\n  return <h1>Profil de {id}</h1>;\n}\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <nav>\n        <Link to=\"/\">Accueil</Link>\n      </nav>\n      <Routes>\n        <Route path=\"/\" element={<Accueil />} />\n        <Route path=\"/profil/:id\" element={<Profil />} />\n        <Route path=\"*\" element={<p>Page introuvable</p>} />\n      </Routes>\n    </BrowserRouter>\n  );\n}",
      },
      {
        kind: "command",
        label: "Installer React Router",
        command: "npm install react-router-dom",
        why: "La bibliothèque de routing de référence pour les SPA React. À installer dès que l'application a plusieurs pages.",
        verify: "`react-router-dom` apparaît dans les `dependencies`.",
      },
      {
        kind: "text",
        text: "Note : les frameworks comme Next.js intègrent leur propre routing basé sur les fichiers — si vous utilisez Next.js, vous n'avez pas besoin de React Router.",
      },
    ],
  },
  {
    id: "styling",
    title: "Styliser : CSS, Modules, Tailwind, CSS-in-JS",
    level: 3,
    intro:
      "Quatre approches répandues pour le style, leurs différences et leurs cas d'usage.",
    blocks: [
      {
        kind: "table",
        headers: ["Approche", "Principe", "Idéal pour", "À noter"],
        rows: [
          [
            "CSS classique",
            "Feuilles de style globales importées",
            "Petits projets, styles globaux, design systems maison",
            "Risque de collisions de noms de classes à grande échelle",
          ],
          [
            "CSS Modules",
            "Fichiers `.module.css` : classes scopées automatiquement au composant",
            "Composants avec styles spécifiques, sans dépendance supplémentaire",
            "Inclus dans Vite, zéro configuration",
          ],
          [
            "Tailwind CSS",
            "Classes utilitaires dans le JSX (`flex`, `p-4`, `text-lg`)",
            "Prototypage rapide, design systems à base de tokens, équipes qui préfèrent styler dans le balisage",
            "Demande une configuration initiale et un temps d'adaptation",
          ],
          [
            "styled-components",
            "CSS écrit en JavaScript, scopé par composant",
            "Styles dynamiques dépendant des props, thèmes via JS",
            "Coût d'exécution (runtime) à mesurer sur les pages critiques",
          ],
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "CSS Modules : scopé par défaut",
        code: "// Bouton.module.css → .primaire { ... }\nimport styles from \"./Bouton.module.css\";\n\nfunction Bouton({ children }: { children: React.ReactNode }) {\n  // `styles.primaire` est une classe unique générée : pas de collision\n  return <button className={styles.primaire}>{children}</button>;\n}",
      },
      {
        kind: "text",
        text: "Aucune approche n'est universellement supérieure : le choix dépend de l'équipe, du design system et des contraintes de performance. L'essentiel est la cohérence — une seule approche principale par projet.",
      },
    ],
  },
  {
    id: "portails-fragments",
    title: "Fragments et portails",
    level: 3,
    intro:
      "Regrouper des éléments sans nœud DOM superflu, et afficher un composant ailleurs dans le DOM.",
    blocks: [
      {
        kind: "fields",
        title: "Fragments et portails, point par point",
        fields: [
          {
            label: "Fragment — en une phrase",
            value:
              "`<>...</>` regroupe plusieurs éléments sans ajouter de nœud au DOM : utile quand un `div` wrapper casserait le HTML (ex. dans un `<table>`) ou le CSS.",
          },
          {
            label: "Portail — en une phrase",
            value:
              "`createPortal(enfant, elementDOM)` affiche un composant dans un autre nœud du DOM (souvent `document.body`) tout en gardant sa place logique dans l'arbre React.",
          },
          {
            label: "Pourquoi les portails existent",
            value:
              "Une modale imbriquée profondément hérite des `overflow: hidden` et `z-index` de ses parents : elle peut être rognée ou cachée. Le portail la sort du flux DOM tout en gardant les événements, le contexte et l'état React.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Une modale avec un portail",
        code: "import { createPortal } from \"react-dom\";\n\nfunction Modale({ ouvert, onFermer, children }: ModaleProps) {\n  if (!ouvert) return null;\n  return createPortal(\n    <div className=\"overlay\" onClick={onFermer}>\n      <div className=\"fenetre\" onClick={(e) => e.stopPropagation()}>\n        {children}\n      </div>\n    </div>,\n    document.body\n  );\n}",
      },
      {
        kind: "text",
        text: "Bonne pratique : les événements continuent de se propager dans l'arbre React (pas le DOM) — un clic dans la modale remonte aux composants React parents même si le DOM est ailleurs. Pensez aussi au focus et à la touche Échap pour une modale accessible.",
      },
    ],
  },
  {
    id: "error-boundaries",
    title: "Error boundaries",
    level: 3,
    intro:
      "Empêcher une erreur dans un composant de faire écran blanc sur toute l'application.",
    blocks: [
      {
        kind: "fields",
        title: "Error boundaries, point par point",
        fields: [
          {
            label: "En une phrase",
            value:
              "Une error boundary capture les erreurs JavaScript de ses composants enfants et affiche une interface de secours au lieu de planter toute la page.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Sans boundary, une erreur de rendu (donnée inattendue, bug) démonte toute l'application : écran blanc. Avec, seule la zone fautive affiche un message et un bouton « réessayer ».",
          },
          {
            label: "La particularité",
            value:
              "C'est le seul concept moderne qui nécessite encore un composant classe (`componentDidCatch`) — ou une bibliothèque comme `react-error-boundary`, qui encapsule cette logique.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Protéger une zone avec react-error-boundary",
        code: "import { ErrorBoundary } from \"react-error-boundary\";\n\nfunction Repli({ error, resetErrorBoundary }: any) {\n  return (\n    <div role=\"alert\">\n      <p>Quelque chose s'est mal passé.</p>\n      <button onClick={resetErrorBoundary}>Réessayer</button>\n    </div>\n  );\n}\n\n<ErrorBoundary FallbackComponent={Repli}>\n  <TableauDeBord /> {/* si ça plante, seul ce bloc affiche le repli */}\n</ErrorBoundary>",
      },
      {
        kind: "command",
        label: "Installer react-error-boundary",
        command: "npm install react-error-boundary",
        why: "Petite bibliothèque de référence qui fournit un composant boundary prêt à l'emploi avec réinitialisation. À installer quand l'application affiche des données externes ou complexes.",
        verify: "`react-error-boundary` apparaît dans les `dependencies`.",
      },
      {
        kind: "text",
        text: "Bonne pratique : placez les boundaries de façon granulaire (par widget, par page) plutôt qu'une seule au sommet — une erreur dans un graphique ne doit pas masquer toute la page. Et journalisez l'erreur (service de monitoring) au lieu de la masquer silencieusement.",
      },
    ],
  },
  {
    id: "concurrent",
    title: "Rendus concurrents : useTransition",
    level: 3,
    intro:
      "Garder l'interface réactive pendant une mise à jour coûteuse.",
    blocks: [
      {
        kind: "fields",
        title: "useTransition, point par point",
        fields: [
          {
            label: "En une phrase",
            value:
              "`useTransition` marque une mise à jour d'état comme « non urgente » : React garde l'ancienne interface affichée et interactive pendant qu'il prépare la nouvelle.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Taper dans un champ de recherche qui filtre 10 000 éléments bloque la saisie : chaque frappe déclenche un rendu coûteux synchrone. La transition laisse la saisie fluide et affiche un indicateur `isPending` pendant le calcul.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Mises à jour déclenchées par l'utilisateur qui entraînent un gros rendu : recherche instantanée, changement d'onglet lourd, filtres complexes. Pas pour le code urgent (saisie elle-même, clic).",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Recherche non bloquante",
        code: "function Recherche({ elements }: { elements: string[] }) {\n  const [texte, setTexte] = useState(\"\");\n  const [estEnAttente, demarrer] = useTransition();\n  const [resultats, setResultats] = useState(elements);\n\n  function onChange(e: React.ChangeEvent<HTMLInputElement>) {\n    setTexte(e.target.value); // urgent : la saisie reste fluide\n    demarrer(() => {\n      // non urgent : le filtrage peut attendre\n      setResultats(elements.filter((el) => el.includes(e.target.value)));\n    });\n  }\n\n  return (\n    <div>\n      <input value={texte} onChange={onChange} />\n      {estEnAttente && <p>Filtrage…</p>}\n      <Liste elements={resultats} />\n    </div>\n  );\n}",
      },
      {
        kind: "text",
        text: "Concept voisin : `useDeferredValue` diffère une valeur plutôt qu'une mise à jour — utile quand c'est l'enfant qui reçoit la valeur coûteuse. Les deux relèvent du « rendu concurrent » de React : à explorer quand les problèmes de fluidité sont mesurés, pas avant.",
      },
    ],
  },
  {
    id: "typescript-react",
    title: "TypeScript avec React",
    level: 3,
    intro:
      "Typer les props, les événements et les hooks : là où TypeScript apporte le plus en React.",
    blocks: [
      {
        kind: "fields",
        title: "Les zones à typer",
        fields: [
          {
            label: "Props",
            value:
              "Une `interface` par composant : l'éditeur signale les props manquantes ou mal typées dès l'écriture. C'est le gain principal.",
          },
          {
            label: "Événements",
            value:
              "`React.ChangeEvent<HTMLInputElement>`, `React.FormEvent`, `React.MouseEvent<HTMLButtonElement>` : l'autocomplétion connaît `e.target.value` et ses types.",
          },
          {
            label: "Hooks",
            value:
              "`useState<User[]>([])` précise le contenu ; `useRef<HTMLInputElement>(null)` type l'élément DOM. Sans annotation, TypeScript infère souvent correctement — n'annotez que quand l'inférence est insuffisante.",
          },
          {
            label: "Enfants",
            value:
              "`children: React.ReactNode` accepte tout contenu affichable (éléments, texte, tableaux).",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Un composant entièrement typé",
        code: "interface ListeProps {\n  elements: string[];\n  onSelection: (element: string) => void;\n  children?: React.ReactNode;\n}\n\nfunction Liste({ elements, onSelection, children }: ListeProps) {\n  const [filtre, setFiltre] = useState(\"\");\n  const champRef = useRef<HTMLInputElement>(null);\n\n  function filtrer(e: React.ChangeEvent<HTMLInputElement>) {\n    setFiltre(e.target.value);\n  }\n\n  return (\n    <div>\n      <input ref={champRef} value={filtre} onChange={filtrer} />\n      <ul>\n        {elements\n          .filter((el) => el.includes(filtre))\n          .map((el) => (\n            <li key={el} onClick={() => onSelection(el)}>\n              {el}\n            </li>\n          ))}\n      </ul>\n      {children}\n    </div>\n  );\n}",
      },
      {
        kind: "text",
        text: "Bonne pratique : le template `react-ts` de Vite inclut déjà `@types/react` et `@types/react-dom`. Évitez `any` dans les props : un composant dont on ne connaît pas le contrat d'entrée est un composant qu'on n'ose plus modifier.",
      },
    ],
  },
  {
    id: "testing",
    title: "Tester avec Vitest et Testing Library",
    level: 3,
    intro:
      "Tester ce que fait le composant du point de vue de l'utilisateur, pas son implémentation.",
    blocks: [
      {
        kind: "fields",
        title: "La philosophie du test React moderne",
        fields: [
          {
            label: "En une phrase",
            value:
              "On rend le composant, on simule les interactions (clic, saisie) et on vérifie ce qui s'affiche — comme le ferait un utilisateur.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Les tests qui vérifient l'état interne cassent à chaque refactoring. Les tests comportementaux protègent contre les régressions tout en laissant le code évoluer.",
          },
          {
            label: "Les outils",
            value:
              "Vitest : exécuteur de tests rapide, intégré à l'écosystème Vite. Testing Library (`@testing-library/react`) : rend les composants et interroge le DOM par rôle/texte accessible. Mention factuelle : Jest est l'alternative historique.",
          },
        ],
      },
      {
        kind: "command",
        label: "Installer les outils de test",
        command: "npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom",
        why: "Vitest exécute les tests, Testing Library rend les composants, `jest-dom` ajoute des assertions lisibles (`toBeInTheDocument()`), `jsdom` simule le DOM en Node. Le `-D` les marque comme dépendances de développement.",
        verify: "Les quatre paquets apparaissent dans `devDependencies`.",
      },
      {
        kind: "code",
        language: "tsx",
        title: "Premier test : un compteur",
        code: "import { render, screen, fireEvent } from \"@testing-library/react\";\nimport { expect, test } from \"vitest\";\nimport Compteur from \"./Compteur\";\n\ntest(\"incrémente au clic\", () => {\n  render(<Compteur />);\n  const bouton = screen.getByRole(\"button\", { name: /incrémenter/i });\n  fireEvent.click(bouton);\n  expect(screen.getByText(/clics : 1/i)).toBeInTheDocument();\n});",
      },
      {
        kind: "text",
        text: "Concepts de configuration : Vitest a besoin de `environment: \"jsdom\"` et du setup `jest-dom` dans sa config pour ce type de test. Bonne pratique : interrogez par rôle accessible (`getByRole`) plutôt que par classe CSS — vos tests vérifient alors aussi l'accessibilité au passage.",
      },
    ],
  },
  {
    id: "debugging",
    title: "Debugging",
    level: 3,
    intro:
      "Inspecter, comprendre et corriger : les outils spécifiques à React.",
    blocks: [
      {
        kind: "fields",
        title: "Les outils de debug React",
        fields: [
          {
            label: "React DevTools — onglet Components",
            value:
              "Inspecte l'arbre des composants : props, état, hooks et contexte de chacun, en direct. On peut même modifier une prop ou un état pour tester un cas.",
          },
          {
            label: "React DevTools — onglet Profiler",
            value:
              "Enregistre les rendus : quels composants se sont ré-affichés, combien de temps chacun a pris. La base de toute optimisation de performance.",
          },
          {
            label: "StrictMode",
            value:
              "En développement uniquement, React monte/démonte/remonte les composants et double-invoque certains rendus pour révéler les effets impurs (effet sans nettoyage, mutation pendant le rendu). Un comportement bizarre uniquement en dev vient souvent de là — c'est voulu.",
          },
          {
            label: "Messages d'erreur React",
            value:
              "Explicites et actionnables en développement (liens vers la doc, composant fautif nommé). Lisez-les en entier avant de chercher ailleurs.",
          },
        ],
      },
      {
        kind: "text",
        text: "Méthode : reproduire avec le cas minimal, observer l'état dans DevTools au moment du bug, vérifier les hypothèses (les props reçues sont-elles celles attendues ?), puis corriger. La plupart des bugs React se résolvent en répondant à « quelle valeur a l'état au moment du rendu ? ».",
      },
    ],
  },
  {
    id: "build-vite",
    title: "Build avec Vite : dev vs production",
    level: 3,
    intro:
      "Comprendre ce qui se passe entre `npm run dev` et le site déployé.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois commandes",
        fields: [
          {
            label: "`npm run dev` — développement",
            value:
              "Serveur local avec rechargement à chaud, sans optimisation : démarrage instantané, code lisible. Jamais utilisé en production.",
          },
          {
            label: "`npm run build` — production",
            value:
              "Compile, minifie et découpe l'application en fichiers optimisés dans `dist/` : c'est le seul artefact à déployer.",
          },
          {
            label: "`npm run preview` — vérification",
            value:
              "Sert localement le contenu de `dist/` pour vérifier le build de production avant déploiement.",
          },
        ],
      },
      {
        kind: "command",
        label: "Construire puis prévisualiser la version de production",
        command: "npm run build && npm run preview",
        why: "Le build peut révéler des erreurs invisibles en dev (imports manquants, variables d'environnement absentes). La prévisualisation permet de tester le résultat réel localement.",
        verify: "`dist/index.html` existe et la prévisualisation affiche l'application sur une URL locale.",
      },
      {
        kind: "text",
        text: "Concept : les variables d'environnement exposées au navigateur doivent être préfixées `VITE_` (ex. `VITE_API_URL`) — elles sont injectées au build, jamais secrètes. Et rappelez-vous : le template Vite ne vérifie pas les types pendant le build, d'où `npx tsc --noEmit` en CI.",
      },
    ],
  },
  {
    id: "frameworks-nextjs",
    title: "Aller plus loin : Next.js",
    level: 3,
    intro:
      "Le framework React le plus répandu : quand une simple SPA ne suffit plus.",
    blocks: [
      {
        kind: "fields",
        title: "Next.js, point par point",
        fields: [
          {
            label: "En une phrase",
            value:
              "Next.js est un framework React (développé par Vercel) qui ajoute le rendu côté serveur, le routing par fichiers et des optimisations prêtes à l'emploi.",
          },
          {
            label: "SSR — Server-Side Rendering",
            value:
              "La page est générée sur le serveur à chaque requête : le navigateur reçoit du HTML complet immédiatement. Idéal pour le contenu dynamique qui doit être à jour et indexable.",
          },
          {
            label: "SSG — Static Site Generation",
            value:
              "Les pages sont générées une fois au build en HTML statique : rapidité maximale, coût d'hébergement minimal. Idéal pour blogs, documentation, landing pages.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "SEO important, performance du premier chargement critique, pages publiques. Pour une application interne derrière un login sans enjeu SEO, une SPA Vite reste souvent plus simple.",
          },
        ],
      },
      {
        kind: "text",
        text: "Note d'architecture : Next.js intègre son propre routing (dossiers = URL), son data fetching et son déploiement optimisé — React Router et une partie de cette page deviennent inutiles dans ce contexte. Apprenez d'abord React pur (cette page), le framework ensuite : les concepts se transfèrent.",
      },
    ],
  },
  {
    id: "performance",
    title: "Performance",
    level: 3,
    intro:
      "Mesurer d'abord, optimiser ensuite : les leviers réels de performance React.",
    blocks: [
      {
        kind: "fields",
        title: "Les leviers, par ordre de priorité",
        fields: [
          {
            label: "1. Mesurer avec le Profiler",
            value:
              "L'onglet Profiler des React DevTools montre quels composants se ré-affichent et leur coût. Sans mesure, on optimise à l'aveugle — et souvent au mauvais endroit.",
          },
          {
            label: "2. Réduire le bundle initial",
            value:
              "Code-splitting par route avec `React.lazy` + `Suspense` (voir section dédiée) : l'utilisateur ne télécharge que la page visitée.",
          },
          {
            label: "3. Éviter les rendus inutiles coûteux",
            value:
              "État placé au plus près de son usage, listes avec clés stables, mémoïsation ciblée (`memo`, `useMemo`) uniquement sur les points chauds mesurés.",
          },
          {
            label: "4. Listes très longues",
            value:
              "Au-delà de quelques centaines d'éléments, la virtualisation (ne rendre que les lignes visibles, via une bibliothèque dédiée) change tout.",
          },
          {
            label: "5. Images et assets",
            value:
              "Formats modernes, dimensions adaptées, chargement différé (`loading=\"lazy\"`) : souvent le plus gros du poids d'une page, avant même le JavaScript.",
          },
        ],
      },
      {
        kind: "text",
        text: "Erreur fréquente : optimiser prématurément — mémoïser chaque composant « au cas où » complexifie le code pour un gain nul voire négatif. La démarche professionnelle : un budget de performance, des mesures régulières, des optimisations ciblées.",
      },
    ],
  },
  {
    id: "securite",
    title: "Sécurité",
    level: 3,
    intro:
      "Ce que React protège par défaut, et ce qui reste de votre responsabilité.",
    blocks: [
      {
        kind: "fields",
        title: "Sécurité en React, point par point",
        fields: [
          {
            label: "XSS — protégé par défaut",
            value:
              "React échappe automatiquement les valeurs interpolées en JSX (`{donnee}`) : une chaîne contenant `<script>` s'affiche comme du texte, elle ne s'exécute pas.",
          },
          {
            label: "`dangerouslySetInnerHTML` — la porte à ne pas ouvrir sans raison",
            value:
              "Cette prop contourne l'échappement pour injecter du HTML brut. Ne l'utilisez qu'avec du contenu de confiance ou assaini (bibliothèque de sanitization), jamais avec une saisie utilisateur brute.",
          },
          {
            label: "Secrets — jamais dans le bundle",
            value:
              "Tout ce qui est dans le code client est lisible par l'utilisateur : clés API privées, mots de passe, tokens d'administration n'ont rien à y faire. Ils vivent côté serveur.",
          },
          {
            label: "Liens externes",
            value:
              "`target=\"_blank\"` s'accompagne de `rel=\"noopener noreferrer\"` pour éviter que la page ouverte ne manipule la vôtre.",
          },
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : la sécurité d'une application React se joue surtout côté serveur (validation, authentification, autorisation). Le front ne fait que ne pas aggraver les choses : échapper, ne pas exposer, ne pas faire confiance aux données affichées.",
      },
    ],
  },
  {
    id: "accessibilite",
    title: "Accessibilité",
    level: 3,
    intro:
      "Une interface utilisable par tous : ce que React ne fait pas à votre place.",
    blocks: [
      {
        kind: "fields",
        title: "Les fondamentaux",
        fields: [
          {
            label: "En une phrase",
            value:
              "L'accessibilité, c'est permettre l'usage au clavier, aux lecteurs d'écran et dans de bonnes conditions de contraste — React ne l'apporte pas automatiquement.",
          },
          {
            label: "HTML sémantique d'abord",
            value:
              "Un vrai `<button>` plutôt qu'un `<div onClick>` : focus clavier, activation à Entrée/Espace et annonce par le lecteur d'écran sont gratuits avec les bons éléments.",
          },
          {
            label: "Labels et formulaires",
            value:
              "Chaque champ a un `<label>` associé (ou `aria-label`) : sans cela, un utilisateur de lecteur d'écran ne sait pas quoi saisir.",
          },
          {
            label: "Attributs ARIA",
            value:
              "`aria-expanded`, `aria-live`, `role=\"alert\"` décrivent les états dynamiques — typiquement les zones que React met à jour sans rechargement.",
          },
          {
            label: "Le test de base",
            value:
              "Naviguez votre application au clavier seul (Tab, Entrée, Échap) : si une action est impossible, c'est un bug d'accessibilité.",
          },
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : les requêtes de Testing Library par rôle (`getByRole`) testent implicitement l'accessibilité — un bouton introuvable par son rôle est souvent un bouton inaccessible. L'a11y n'est pas une couche finale : elle se construit composant par composant.",
      },
    ],
  },
  {
    id: "storybook",
    title: "Développer en isolation avec Storybook",
    level: 3,
    intro:
      "Travailler sur un composant seul, dans tous ses états, sans lancer toute l'application.",
    blocks: [
      {
        kind: "fields",
        title: "Storybook, point par point",
        fields: [
          {
            label: "En une phrase",
            value:
              "Storybook est un atelier qui affiche chaque composant isolément, avec ses variantes (chargement, vide, erreur, données longues).",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Tester visuellement l'état « erreur » d'une carte exige normalement de reproduire tout le parcours qui y mène. En isolation, on l'affiche en un clic.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Design systems, bibliothèques de composants, équipes où designers et développeurs collaborent sur les mêmes briques.",
          },
        ],
      },
      {
        kind: "text",
        text: "Mention factuelle : c'est un outil répandu mais pas obligatoire — pour un petit projet, une page de démonstration maison suffit. Son vrai apport est organisationnel : un catalogue vivant des composants disponibles et de leurs usages.",
      },
    ],
  },
  {
    id: "ci-cd",
    title: "CI/CD pour une application React",
    level: 3,
    intro:
      "Automatiser les vérifications et le déploiement à chaque modification.",
    blocks: [
      {
        kind: "fields",
        title: "Le pipeline typique",
        fields: [
          {
            label: "En une phrase",
            value:
              "À chaque push et pull request, un serveur rejoue automatiquement : installation, lint, vérification des types, tests, build.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "« Ça marchait sur ma machine » : la CI garantit que le code fonctionne aussi sur une machine neutre, et bloque la fusion si le build casse.",
          },
          {
            label: "Les étapes",
            value:
              "`npm ci` (installation reproductible via le lockfile) → `npx tsc --noEmit` → `npx eslint` → `npx vitest run` → `npm run build`. Chaque étape doit passer pour que la suivante s'exécute.",
          },
          {
            label: "Aperçus de PR",
            value:
              "Beaucoup d'hébergeurs déploient automatiquement une URL de prévisualisation par pull request : on teste la fonctionnalité réelle avant de fusionner.",
          },
        ],
      },
      {
        kind: "text",
        text: "Concept : GitHub Actions est le service de CI le plus courant pour les projets hébergés sur GitHub (fichier YAML dans `.github/workflows/`). Le principe est identique ailleurs (GitLab CI, etc.) : un pipeline déclaratif qui rejoue vos commandes.",
      },
    ],
  },
  {
    id: "deploiement",
    title: "Déploiement",
    level: 3,
    intro:
      "Mettre l'application en ligne : ce qu'on déploie et où.",
    blocks: [
      {
        kind: "fields",
        title: "Déployer une SPA React",
        fields: [
          {
            label: "En une phrase",
            value:
              "On déploie le contenu de `dist/` — des fichiers statiques — sur n'importe quel hébergeur de fichiers statiques.",
          },
          {
            label: "Le point critique : le routing",
            value:
              "En SPA, `/profil/42` n'existe pas comme fichier : le serveur doit renvoyer `index.html` pour toutes les routes (fallback), sinon le rafraîchissement sur une page interne donne une erreur 404. Les bons hébergeurs le configurent en une option.",
          },
          {
            label: "Hébergeurs",
            value:
              "Vercel, Netlify et équivalents proposent le déploiement depuis Git en quelques clics avec prévisualisations de PR. Mention factuelle : ce sont des exemples courants, pas une recommandation exclusive — n'importe quel hébergement statique convient.",
          },
          {
            label: "Variables par environnement",
            value:
              "L'URL d'API diffère entre dev et prod : les variables `VITE_*` sont injectées au moment du build, donc un build par environnement.",
          },
        ],
      },
      {
        kind: "command",
        label: "Vérifier le build avant d'envoyer",
        command: "npm run build",
        why: "Le déploiement commence toujours par un build local réussi : un build qui échoue en CI aurait pu être détecté avant le push.",
        verify: "Le dossier `dist/` est généré sans erreur.",
      },
    ],
  },
  {
    id: "architecture-projet",
    title: "Architecture d'un projet React",
    level: 3,
    intro:
      "Organiser les fichiers pour qu'un nouveau développeur s'y retrouve en une heure.",
    blocks: [
      {
        kind: "fields",
        title: "Les principes d'organisation",
        fields: [
          {
            label: "En une phrase",
            value:
              "Regroupez par fonctionnalité quand le projet grandit, par type quand il est petit — et colocalisez ce qui change ensemble.",
          },
          {
            label: "Par type (petit projet)",
            value:
              "`components/`, `pages/`, `hooks/`, `lib/` : simple et suffisant tant que chaque dossier reste lisible.",
          },
          {
            label: "Par fonctionnalité (projet qui grandit)",
            value:
              "`features/panier/`, `features/auth/` contenant chacun composants, hooks et logique : on travaille dans un seul dossier au lieu d'en traverser cinq.",
          },
          {
            label: "Colocalisation",
            value:
              "Le test, les styles et les types d'un composant vivent à côté de lui. Ce qui change ensemble reste ensemble.",
          },
          {
            label: "Ce qu'on évite",
            value:
              "Un dossier `utils/` fourre-tout, des composants de 500 lignes, de la logique métier éparpillée dans le JSX.",
          },
        ],
      },
      {
        kind: "diagram",
        title: "Structure par fonctionnalité",
        lines: [
          "src/",
          "├── features/",
          "│   ├── panier/          (tout le panier ici)",
          "│   │   ├── Panier.tsx",
          "│   │   ├── usePanier.ts",
          "│   │   └── panier.test.ts",
          "│   └── catalogue/",
          "├── components/          (briques partagées : Bouton, Modale)",
          "├── pages/               (assemblage des features par route)",
          "└── lib/                 (client API, configuration)",
        ],
      },
      {
        kind: "text",
        text: "Mise en garde : il n'existe pas de structure universelle. Une architecture copiée d'un gros projet open source étouffe un petit projet. Commencez simple, restructurez quand la douleur apparaît — c'est le signe que vous avez grandi, pas un échec.",
      },
    ],
  },
  {
    id: "classes-note-historique",
    title: "Note historique : les composants classes",
    level: 3,
    intro:
      "Comprendre le code React écrit avant 2019 — sans apprendre à en écrire.",
    blocks: [
      {
        kind: "fields",
        title: "Les classes, en bref",
        fields: [
          {
            label: "En une phrase",
            value:
              "Avant les hooks (2019), les composants avec état s'écrivaient comme des classes JavaScript avec `this.state` et des méthodes de cycle de vie.",
          },
          {
            label: "À quoi ça ressemblait",
            value:
              "`class Compteur extends React.Component` avec `this.state = { n: 0 }`, `this.setState({ n: 1 })`, `componentDidMount` pour les effets.",
          },
          {
            label: "Pourquoi c'est de l'histoire",
            value:
              "Les hooks font la même chose avec moins de code et une meilleure réutilisation de la logique. Tout nouveau code s'écrit avec des hooks.",
          },
          {
            label: "Pourquoi en parler",
            value:
              "Beaucoup de bases de code existantes en contiennent encore, et les error boundaries s'écrivent toujours en classes. Savoir les lire suffit.",
          },
        ],
      },
      {
        kind: "text",
        text: "Si vous migrez un vieux composant : remplacez `this.state` par `useState`, `componentDidMount`/`componentDidUpdate` par `useEffect`, et les méthodes par des fonctions. Faites-le composant par composant, avec des tests.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les pièges classiques des développeurs React, et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Muter l'état directement",
            value:
              "Problem : `tableau.push(x)` puis `setTableau(tableau)` ne ré-affiche rien. Why : React compare les références — même référence = pas de changement détecté. Bad example : `etat.valeur = 5; setEtat(etat);`. Better : créer une copie (`[...t]`, `{...o}`, `.map`, `.filter`).",
          },
          {
            label: "Dépendances d'effet incorrectes",
            value:
              "Problem : boucle infinie de requêtes ou données périmées. Why : dépendance manquante (valeur obsolète) ou objet recréé à chaque rendu (boucle). Bad example : `useEffect(() => {...}, [])` qui utilise une prop. Better : suivre l'avertissement ESLint `exhaustive-deps`, stabiliser avec `useCallback`/`useMemo` si besoin.",
          },
          {
            label: "`key={index}` sur une liste dynamique",
            value:
              "Problem : après tri ou suppression, les saisies et états locaux « suivent » les mauvaises lignes. Why : React identifie les éléments par la clé. Bad example : `items.map((it, i) => <Ligne key={i} .../>)`. Better : un identifiant stable (`key={it.id}`).",
          },
          {
            label: "Oublier le nettoyage d'un effet",
            value:
              "Problem : minuteurs qui s'accumulent, listeners dupliqués, requêtes qui écrasent les nouvelles données. Why : l'effet se réexécute sans annuler le précédent. Bad example : `setInterval` sans `clearInterval`. Better : toujours retourner la fonction de nettoyage.",
          },
          {
            label: "Mettre à jour l'état pendant le rendu",
            value:
              "Problem : boucle de rendus infinie. Why : `setX` pendant le rendu déclenche un nouveau rendu qui refait `setX`. Bad example : `if (!init) { setInit(true); }` dans le corps du composant. Better : initialiser avec `useState`, ou utiliser un effet.",
          },
          {
            label: "Appeler des hooks sous condition",
            value:
              "Problem : états mélangés entre hooks, comportements erratiques. Why : React associe les hooks à l'ordre d'appel. Bad example : `if (cond) { useState(...) }`. Better : appeler toujours les hooks, conditionner leur usage.",
          },
          {
            label: "Stocker du calculable dans l'état",
            value:
              "Problem : deux sources de vérité qui se désynchronisent. Why : `nomComplet` stocké séparément de `prenom`/`nom`. Bad example : `useState(prenom + nom)`. Better : calculer pendant le rendu.",
          },
          {
            label: "Remplacer l'objet d'état au lieu de le fusionner",
            value:
              "Problem : des champs disparaissent mystérieusement. Why : contrairement au `setState` des classes, `useState` ne fusionne pas. Bad example : `setForm({ email })` écrase `motDePasse`. Better : `setForm(f => ({ ...f, email }))` ou un état par champ.",
          },
          {
            label: "Mémoïser partout par défaut",
            value:
              "Problem : code complexifié sans gain mesurable. Why : chaque `useMemo`/`useCallback` a un coût et n'aide que si les props sont stables. Bad example : `memo` sur chaque composant. Better : Profiler d'abord, optimiser les points chauds.",
          },
          {
            label: "Charger des données sans gérer l'échec",
            value:
              "Problem : « Chargement… » affiché pour toujours quand l'API échoue. Why : seul l'état de succès est géré. Bad example : pas d'état d'erreur. Better : trois états (`loading`/`error`/`data`), toujours.",
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
          "Un composant, une responsabilité : s'il fait deux choses, ce sont deux composants.",
          "État minimal : ne stockez que ce qui ne peut pas être calculé ou dérivé.",
          "État proche de son usage : remontez uniquement quand plusieurs composants le partagent vraiment.",
          "Props typées : chaque `interface` de props est une documentation exécutable.",
          "Composition plutôt que configuration : `children` plutôt que dix props booléennes.",
          "Effets pour la synchronisation externe uniquement : pas de calculs, pas de réaction aux événements.",
          "Données serveur et état UI séparés : le cache d'une bibliothèque de fetching n'est pas du state global.",
          "Accessibilité dès l'écriture : éléments sémantiques, labels, navigation clavier.",
          "Tests comportementaux : ce que voit l'utilisateur, pas l'implémentation.",
          "Mesurer avant d'optimiser : le Profiler décide, pas l'intuition.",
        ],
      },
      {
        kind: "text",
        text: "Contexte : un prototype jetable n'a pas les mêmes exigences qu'une application critique. La maturité, c'est savoir quand appliquer chaque pratique — et quand s'en dispenser consciemment.",
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 3,
    intro: "Quatre projets réalistes, du premier état partagé au front complet.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Application de notes",
        fields: [
          { label: "Objectif", value: "Maîtriser l'état local, les listes et la persistance." },
          { label: "Prérequis", value: "Composants, `useState`, formulaires contrôlés." },
          { label: "Ce que l'on construit", value: "Création, édition, suppression de notes avec recherche instantanée, tags et sauvegarde en `localStorage` (hook custom `useLocalStorage`)." },
          { label: "Concepts utilisés", value: "État, listes et clés, rendu conditionnel, hook personnalisé, composition." },
          { label: "Difficulté", value: "Débutant : un week-end, un seul dossier de composants." },
          { label: "Ensuite", value: "Le dashboard : passer aux données distantes." },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — Dashboard avec API publique",
        fields: [
          { label: "Objectif", value: "Charger, mettre en cache et présenter des données réelles." },
          { label: "Prérequis", value: "Effets, data fetching, routing." },
          { label: "Ce que l'on construit", value: "Tableau de bord consommant une API publique (météo, films, crypto) : pages par route, états chargement/erreur, cache avec TanStack Query, graphiques simples." },
          { label: "Concepts utilisés", value: "`useEffect`, trois états du fetching, React Router, cache, Suspense." },
          { label: "Difficulté", value: "Intermédiaire : gérer l'asynchrone proprement est le vrai défi." },
          { label: "Ensuite", value: "Le mini réseau social : état partagé et interactions." },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Mini réseau social",
        fields: [
          { label: "Objectif", value: "État partagé, formulaires riches, architecture par fonctionnalités." },
          { label: "Prérequis", value: "État global, formulaires, architecture." },
          { label: "Ce que l'on construit", value: "Fil de publications avec likes, commentaires, profils : store Zustand pour la session et les posts, formulaires avec validation, organisation en `features/`." },
          { label: "Concepts utilisés", value: "Zustand, Context, composition, mémoïsation ciblée, error boundaries." },
          { label: "Difficulté", value: "Avancé : la cohérence de l'état entre écrans est le cœur du sujet." },
          { label: "Ensuite", value: "L'e-commerce : le front complet façon production." },
        ],
      },
      {
        kind: "fields",
        title: "Projet 4 — Front e-commerce",
        fields: [
          { label: "Objectif", value: "Assembler tout : catalogue, panier, tunnel de commande simulé, déploiement." },
          { label: "Prérequis", value: "Tout le reste de cette page." },
          { label: "Ce que l'on construit", value: "Catalogue avec filtres et recherche (transitions), panier persistant (`useReducer` + `localStorage`), checkout simulé multi-étapes, tests des parcours critiques, CI et déploiement." },
          { label: "Concepts utilisés", value: "`useReducer`, `useTransition`, routing, tests, CI/CD, performance, accessibilité." },
          { label: "Difficulté", value: "Style production : le niveau attendu en entretien et en équipe." },
          { label: "Ensuite", value: "Next.js pour le rendu serveur, ou un backend pour de vraies données." },
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
          { label: "react.dev — Learn", value: "Le tutoriel officiel : la référence pour apprendre, du premier composant aux effets." },
          { label: "react.dev — Reference", value: "La documentation de chaque hook et API, avec exemples et pièges." },
          { label: "react.dev — Blog", value: "Les annonces de versions et les guides de migration." },
        ],
      },
      {
        kind: "list",
        items: [
          "Outillage : documentations de Vite, React Router, TanStack Query et Testing Library pour l'intégration pratique.",
          "Pratique : les quatre projets progressifs de cette page, dans l'ordre.",
          "Communauté : le dépôt GitHub facebook/react (discussions, RFC) pour comprendre les orientations du framework.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "React maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Framework : Next.js pour le rendu côté serveur, le SEO et les applications complètes.",
          "Mobile : React Native pour porter la logique composants sur iOS et Android.",
          "Backend : Node.js + Express (ou NestJS) pour construire les API que vos fronts consomment.",
          "Tests avancés : tests d'intégration et end-to-end (Playwright) des parcours critiques.",
          "Revenir à la roadmap : valider React et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

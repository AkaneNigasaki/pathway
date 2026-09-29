import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète d'Angular : de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Approche : Angular CLI d'abord ; les modules NgModule sont expliqués comme
 * contexte historique car les composants standalone sont le standard actuel.
 */
export const LEARNING_ANGULAR: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Angular, ce qu'il n'est pas, et pourquoi des équipes entières le choisissent pour des applications métier.",
    blocks: [
      {
        kind: "text",
        text: "Angular est un framework TypeScript open source, développé par Google, pour construire des applications web : applications métier, tableaux de bord, portails, applications mobiles hybrides. Il fournit une structure complète et cohérente : composants, routing, formulaires, client HTTP, injection de dépendances, outils de build et de test — le tout sous un même toit, avec une documentation officielle unique (angular.dev).",
      },
      {
        kind: "text",
        text: "Point essentiel : Angular est un framework « tout inclus » (batteries included), là où d'autres écosystèmes assemblent plusieurs bibliothèques indépendantes. Cette complétude a un prix : une courbe d'apprentissage plus raide au début (beaucoup de concepts à découvrir), mais une cohérence forte sur le long terme — les choix d'architecture sont déjà faits, les mises à jour sont guidées, et deux projets Angular se ressemblent.",
      },
      {
        kind: "text",
        text: "Angular est un framework TypeScript complet qui structure les applications web autour de composants, de services injectables et d'un outillage officiel (CLI, router, formulaires, tests).",
      },
      {
        kind: "text",
        text: "Les grandes applications web souffrent du désordre architectural : chaque équipe réinvente le routing, la gestion des formulaires, les appels HTTP. Angular impose une structure éprouvée et un outillage commun pour que le code reste maintenable à l'échelle d'une équipe.",
      },
      {
        kind: "text",
        text: "Applications métier complexes, projets d'équipe de taille moyenne à grande, contextes où la cohérence et la maintenabilité priment. Pour un site vitrine statique ou un widget isolé, c'est disproportionné.",
      },
      {
        kind: "fields",
        title: "Angular : l'essentiel",
        fields: [
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni une bibliothèque d'interface seule, ni un langage : Angular s'écrit en TypeScript, s'installe via npm, et produit des applications compilées pour le navigateur.",
          },
        ],
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : composants + services",
    level: 1,
    intro:
      "La seule idée à retenir avant tout le reste : l'interface est un arbre de composants, la logique métier vit dans des services.",
    blocks: [
      {
        kind: "diagram",
        title: "L'architecture Angular, en une image",
        lines: [
          "Application",
          "     │",
          "     ├── Composants (ce que l'utilisateur voit)",
          "     │     ├── Template (HTML enrichi : {{ }}, @if, @for)",
          "     │     ├── Classe TypeScript (données + logique d'affichage)",
          "     │     └── Styles (CSS scopé au composant)",
          "     │",
          "     ├── Services (logique métier, appels API)",
          "     │     └── injectés dans les composants (injection de dépendances)",
          "     │",
          "     ├── Router (quelle page afficher selon l'URL)",
          "     │",
          "     └── RxJS (flux de données asynchrones : Observables)",
        ],
      },
      {
        kind: "text",
        text: "En Angular, tout commence par un composant racine qui contient d'autres composants, comme des poupées russes. Chaque composant possède un template (le HTML qu'il affiche) et une classe TypeScript (ses données et son comportement). Quand les données changent, Angular met à jour l'affichage automatiquement grâce à son système de détection des changements.",
      },
      {
        kind: "text",
        text: "La logique qui n'est pas de l'affichage — appeler une API, valider des règles métier, partager un état — vit dans des services. Les services sont fournis aux composants par injection de dépendances : au lieu de créer ses dépendances lui-même, un composant les déclare et Angular les lui fournit. C'est le mécanisme central qui rend le code testable et découplé.",
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
      "Ce qu'il faut connaître avant de se lancer — et ce qu'on peut apprendre en route.",
    blocks: [
      {
        kind: "fields",
        title: "Prérequis",
        fields: [
          {
            label: "Indispensable",
            value:
              "Les bases de TypeScript (types, classes, décorateurs en notion) et de HTML/CSS. Angular s'écrit en TypeScript : sans lui, le framework est illisible.",
          },
          {
            label: "Fortement recommandé",
            value:
              "JavaScript moderne (modules, promesses, fonctions fléchées) et le fonctionnement d'une API REST/JSON, car les applications Angular consomment des API.",
          },
          {
            label: "Peut s'apprendre en route",
            value:
              "RxJS (les Observables sont introduits progressivement), le routing, les formulaires réactifs, les tests.",
          },
          {
            label: "Non requis",
            value:
              "Aucune connaissance d'un autre framework. Venir de React ou Vue aide pour les concepts généraux (composants, état), pas pour la syntaxe.",
          },
        ],
      },
    ],
  },
  {
    id: "installation",
    title: "Installation d'Angular CLI",
    level: 2,
    intro:
      "Angular CLI est l'outil officiel en ligne de commande : il crée, sert, génère et compile les projets. Une seule installation globale suffit.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier Node.js et npm (prérequis)",
        command: "node --version && npm --version",
        why: "Angular CLI s'installe via npm et exige une version récente de Node.js (voir angular.dev pour la version minimale de votre version d'Angular). Cette commande confirme que l'environnement est prêt.",
        verify: "Deux numéros de version s'affichent, sans erreur.",
      },
      {
        kind: "command",
        label: "Installer Angular CLI globalement",
        command: "npm install -g @angular/cli",
        why: "Le paquet `@angular/cli` fournit la commande `ng`. L'option `-g` l'installe globalement : `ng` devient disponible dans tous vos dossiers, pas seulement dans un projet.",
        verify: "Exécutez `ng version` : la version d'Angular CLI s'affiche.",
      },
      {
        kind: "text",
        text: "Bon à savoir : `ng version` affiche aussi les versions d'Angular, de TypeScript et de Node.js détectées dans le projet courant — c'est la première commande à lancer quand quelque chose se comporte bizarrement après une mise à jour.",
      },
    ],
  },
  {
    id: "premier-projet",
    title: "Premier projet : créer et lancer",
    level: 2,
    intro:
      "Du dossier vide à l'application qui tourne dans le navigateur, en cinq étapes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le projet",
            detail:
              "Lancez `ng new mon-app`. Le CLI pose quelques questions : feuille de style (CSS, SCSS…), activer le rendu côté serveur (SSR) ou non. Répondez simplement ; les choix par défaut conviennent pour débuter.",
          },
          {
            title: "Entrer dans le dossier",
            detail:
              "`cd mon-app` : tout se passe ensuite depuis la racine du projet.",
          },
          {
            title: "Lancer le serveur de développement",
            detail:
              "`ng serve` compile l'application et la sert sur http://localhost:4200. Le rechargement est automatique à chaque sauvegarde.",
          },
          {
            title: "Ouvrir le navigateur",
            detail:
              "Visitez http://localhost:4200 : la page d'accueil générée par le CLI s'affiche.",
          },
          {
            title: "Modifier et observer",
            detail:
              "Ouvrez `src/app/app.component.ts`, changez le titre, sauvegardez : le navigateur se met à jour sans rechargement manuel.",
          },
        ],
      },
      {
        kind: "command",
        label: "Créer un nouveau projet",
        command: "ng new mon-app",
        why: "Génère toute l'arborescence d'un projet Angular fonctionnel : configuration TypeScript, build, tests, styles et un composant d'exemple. C'est le point de départ officiel, à préférer à une configuration manuelle.",
      },
      {
        kind: "command",
        label: "Lancer le serveur de développement",
        command: "ng serve",
        why: "Compile l'application en mémoire et la sert avec rechargement à chaud. L'option `-o` (`ng serve -o`) ouvre automatiquement le navigateur.",
        verify: "Le terminal affiche « Compiled successfully » et http://localhost:4200 répond.",
      },
    ],
  },
  {
    id: "cli-commandes",
    title: "Les commandes du CLI au quotidien",
    level: 2,
    intro:
      "Cinq commandes couvrent 95 % du travail quotidien. Chacune est expliquée : objectif, exemple, quand l'utiliser.",
    blocks: [
      {
        kind: "fields",
        title: "Commandes `ng` essentielles",
        fields: [
          {
            label: "`ng new`",
            value:
              "Crée un projet complet. Exemple : `ng new boutique`. Quand : une seule fois par projet, au démarrage.",
          },
          {
            label: "`ng serve`",
            value:
              "Sert l'application en développement avec rechargement automatique. Exemple : `ng serve --port 4300` pour changer de port. Quand : pendant tout le développement.",
          },
          {
            label: "`ng generate` (alias `ng g`)",
            value:
              "Génère du code selon les conventions du projet : composant, service, pipe, garde… Exemple : `ng g component panier`. Quand : à chaque nouvel élément, pour un code homogène.",
          },
          {
            label: "`ng build`",
            value:
              "Compile l'application pour la production dans `dist/`. Exemple : `ng build`. Quand : avant chaque déploiement.",
          },
          {
            label: "`ng test`",
            value:
              "Lance les tests unitaires. Exemple : `ng test --watch=false` pour une exécution unique (utile en CI). Quand : pendant le développement et dans la CI.",
          },
        ],
      },
      {
        kind: "command",
        label: "Générer un composant",
        command: "ng g component panier",
        why: "Crée le dossier `panier/` avec les 4 fichiers du composant (classe, template, styles, test) et met à jour les imports si nécessaire. Générer plutôt que créer à la main garantit les conventions de nommage.",
        verify: "Les fichiers `panier.component.ts`, `.html`, `.css` et `.spec.ts` existent.",
      },
      {
        kind: "command",
        label: "Générer un service",
        command: "ng g service services/api",
        why: "Crée un service injectable avec le décorateur `@Injectable({ providedIn: 'root' })`. Le chemin `services/api` organise le code dès le départ.",
        verify: "Le fichier `api.service.ts` contient une classe décorée par `@Injectable`.",
      },
    ],
  },
  {
    id: "anatomie-application",
    title: "Anatomie d'une application Angular",
    level: 2,
    intro:
      "Ce que le CLI génère, fichier par fichier : savoir où mettre quoi.",
    blocks: [
      {
        kind: "diagram",
        title: "Arborescence d'un projet `ng new`",
        lines: [
          "mon-app/",
          "├── angular.json        ← configuration du CLI (build, serve, test)",
          "├── package.json        ← dépendances npm",
          "├── tsconfig.json       ← configuration TypeScript",
          "└── src/",
          "    ├── index.html      ← page hôte (contient <app-root>)",
          "    ├── main.ts         ← point d'entrée : démarre l'application",
          "    ├── styles.css      ← styles globaux",
          "    └── app/",
          "        ├── app.component.ts    ← composant racine",
          "        ├── app.component.html  ← son template",
          "        ├── app.component.css   ← ses styles (scopés)",
          "        └── app.routes.ts       ← routes de l'application",
        ],
      },
      {
        kind: "fields",
        title: "Les fichiers à connaître",
        fields: [
          {
            label: "`main.ts`",
            value:
              "Point d'entrée : il démarre l'application en « bootstrappant » le composant racine (`bootstrapApplication(AppComponent)`). On le touche rarement.",
          },
          {
            label: "`app.component.ts`",
            value:
              "Le composant racine. Son sélecteur `app-root` correspond à la balise `<app-root>` dans `index.html` : c'est là que toute l'application s'affiche.",
          },
          {
            label: "`app.routes.ts`",
            value:
              "La liste des routes (URL → composant). Le router l'utilise pour afficher la bonne page.",
          },
          {
            label: "`angular.json`",
            value:
              "La configuration du CLI : comment builder, servir, tester. On y règle par exemple les budgets de taille du bundle (voir la section build).",
          },
        ],
      },
    ],
  },
  {
    id: "editeurs",
    title: "Éditeurs et extensions",
    level: 2,
    intro:
      "Un bon éditeur avec le service de langage Angular change tout : autocomplétion dans les templates, erreurs signalées avant la compilation.",
    blocks: [
      {
        kind: "fields",
        title: "Éditeurs et outillage",
        fields: [
          {
            label: "VS Code + Angular Language Service",
            value:
              "La combinaison la plus courante. L'extension officielle « Angular Language Service » apporte l'autocomplétion, la navigation et les diagnostics dans les templates HTML. Extension associée utile : « Angular Snippets » pour les raccourcis de génération.",
          },
          {
            label: "WebStorm / IntelliJ",
            value:
              "Support Angular intégré sans extension : navigation, refactoring et inspections prêts à l'emploi. Choix fréquent dans les équipes déjà utilisatrices des IDE JetBrains.",
          },
          {
            label: "Autres éditeurs",
            value:
              "Tout éditeur avec un bon support TypeScript convient (Neovim, Zed, Sublime Text…). Le service de langage Angular fonctionne via le protocole LSP ; vérifiez que votre éditeur sait l'exploiter pour bénéficier de l'aide dans les templates.",
          },
          {
            label: "Formateur",
            value:
              "Prettier avec le plugin approprié, ou le formateur intégré de l'IDE, pour un style homogène. La mise en forme n'est pas imposée par le framework : c'est une convention d'équipe.",
          },
        ],
      },
      {
        kind: "text",
        text: "Aucun éditeur n'est universellement meilleur : le critère décisif est la qualité de l'intégration avec le service de langage Angular, car c'est lui qui comprend vos templates. Testez l'autocomplétion dans un template `*.component.html` : si elle fonctionne, l'éditeur est bien configuré.",
      },
    ],
  },
  {
    id: "devtools",
    title: "Angular DevTools : inspecter son application",
    level: 2,
    intro:
      "L'extension officielle pour comprendre ce qui se passe dans une application qui tourne.",
    blocks: [
      {
        kind: "text",
        text: "Angular DevTools est une extension de navigateur (Chrome, Edge, Firefox) développée par l'équipe Angular. Une fois installée, elle ajoute un onglet dans les outils de développement avec deux vues principales : l'arbre des composants et le profileur.",
      },
      {
        kind: "fields",
        title: "Ce que DevTools permet",
        fields: [
          {
            label: "Arbre des composants",
            value:
              "Visualise la hiérarchie réelle des composants, inspecte leurs propriétés et leur état en direct, et modifie une valeur pour voir l'effet immédiat sur l'interface.",
          },
          {
            label: "Profileur",
            value:
              "Enregistre les cycles de détection des changements et montre quels composants sont vérifiés et combien de temps cela prend — le point de départ du diagnostic de performance.",
          },
          {
            label: "Limite à connaître",
            value:
              "DevTools ne fonctionne qu'en mode développement (`ng serve`), pas sur un build de production optimisé. C'est normal : le build de production supprime les informations de debug.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow quotidien",
    level: 2,
    intro:
      "À quoi ressemble une journée de développement Angular, concrètement.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Démarrer le serveur",
            detail:
              "`ng serve` dans un terminal, laissé tourner toute la journée. Le navigateur se recharge à chaque sauvegarde.",
          },
          {
            title: "Générer les éléments",
            detail:
              "`ng g component …`, `ng g service …` pour créer les fichiers selon les conventions, plutôt que les créer à la main.",
          },
          {
            title: "Développer par composant",
            detail:
              "On travaille un composant à la fois : sa classe, son template, ses styles, en vérifiant visuellement dans le navigateur.",
          },
          {
            title: "Tester au fil de l'eau",
            detail:
              "`ng test` en mode watch pendant le développement des services et de la logique ; les tests tournent à chaque sauvegarde.",
          },
          {
            title: "Vérifier le build",
            detail:
              "Avant de pousser son code, `ng build` pour s'assurer que la compilation de production passe (elle est plus stricte que `ng serve`).",
          },
        ],
      },
    ],
  },
  {
    id: "comprendre-erreurs",
    title: "Lire ses premières erreurs",
    level: 2,
    intro:
      "Les messages d'erreur d'Angular sont verbeux mais structurés : voici comment les décoder.",
    blocks: [
      {
        kind: "fields",
        title: "Anatomie d'une erreur Angular",
        fields: [
          {
            label: "Le code d'erreur",
            value:
              "Les erreurs du compilateur portent un code comme `NG8001` (« 'app-truc' is not a known element »). Ce code est cherchable tel quel dans la documentation officielle.",
          },
          {
            label: "Le fichier et la ligne",
            value:
              "Le message indique le fichier et la position exacte. En développement, l'erreur s'affiche aussi en surimpression dans le navigateur.",
          },
          {
            label: "La suggestion",
            value:
              "Souvent, le message propose la cause probable (« Did you mean… », composant non importé, module manquant). Lisez jusqu'au bout avant de chercher ailleurs.",
          },
          {
            label: "La stack trace",
            value:
              "Pour les erreurs d'exécution, la trace indique la séquence d'appels. Les premières lignes concernent votre code ; le reste est le framework.",
          },
        ],
      },
      {
        kind: "text",
        text: "Réflexe : copier le code d'erreur (`NG…`) ou le message exact dans la documentation angular.dev ou un moteur de recherche donne presque toujours la solution, car ces erreurs sont standardisées et documentées.",
      },
    ],
  },
  {
    id: "mises-a-jour",
    title: "Mises à jour : `ng update`",
    level: 2,
    intro:
      "Angular sort des versions majeures régulièrement ; le CLI assiste la migration au lieu de vous laisser seul face au changelog.",
    blocks: [
      {
        kind: "command",
        label: "Mettre à jour Angular",
        command: "ng update @angular/core @angular/cli",
        why: "Met à jour les paquets Angular vers la dernière version compatible et exécute les migrations automatiques (renommages, changements d'API). C'est la voie officielle, bien plus sûre qu'un `npm install` manuel des nouvelles versions.",
        verify: "`ng version` affiche les nouvelles versions ; l'application compile toujours.",
      },
      {
        kind: "text",
        text: "Bonnes pratiques : mettre à jour version majeure par version majeure (ne pas sauter deux versions d'un coup), commiter avant de lancer la mise à jour, et lire le guide de mise à jour interactif sur angular.dev qui liste les changements impactants pour votre version de départ.",
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "composants",
    title: "Composants : la brique de base",
    level: 3,
    intro:
      "Tout ce qui s'affiche est un composant : une classe TypeScript décorée, un template, des styles scopés.",
    blocks: [
      {
        kind: "text",
        text: "Un composant est une classe TypeScript marquée par le décorateur `@Component`, qui lui associe un template HTML et des styles CSS.",
      },
      {
        kind: "text",
        text: "Découper l'interface en composants rend chaque morceau compréhensible, réutilisable et testable isolément, au lieu d'une page monolithique.",
      },
      {
        kind: "fields",
        title: "Anatomie d'un composant",
        fields: [          {
            label: "Quand",
            value:
              "Toujours : même la page d'accueil est un composant. On crée un composant par « chose » de l'interface (en-tête, carte produit, formulaire…).",
          },
          {
            label: "Comment",
            value:
              "Le décorateur `@Component` déclare un `selector` (le nom de la balise HTML, ex. `app-panier`), un `templateUrl` ou un `template` inline, et des `styleUrl`/`styles`.",
          },
        ],
      },
      {
        kind: "code",
        language: "ts",
        title: "Un composant minimal",
        code: "import { Component } from '@angular/core';\n\n@Component({\n  selector: 'app-bonjour',\n  standalone: true,\n  template: `<h1>Bonjour {{ nom }} !</h1>`,\n  styles: `h1 { color: darkblue; }`,\n})\nexport class BonjourComponent {\n  nom = 'Angular';\n}",
      },
      {
        kind: "fields",
        title: "À retenir",
        fields: [
          {
            label: "Erreur fréquente",
            value:
              "Oublier d'importer le composant là où on l'utilise : avec les composants standalone, chaque composant utilisé dans un template doit figurer dans le tableau `imports` du composant parent, sinon erreur `NG8001`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Un composant = une responsabilité. Si le template dépasse quelques dizaines de lignes ou mélange plusieurs sujets, découpez en sous-composants.",
          },
          {
            label: "Concepts liés",
            value:
              "Templates et interpolation, data binding, cycle de vie, composants standalone.",
          },
        ],
      },
    ],
  },
  {
    id: "standalone-vs-modules",
    title: "Standalone vs NgModule : l'état actuel",
    level: 3,
    intro:
      "Angular a changé sa façon d'organiser le code : comprendre les deux modèles pour lire n'importe quel projet.",
    blocks: [
      {
        kind: "text",
        text: "Historiquement, Angular organisait les composants en modules (`NgModule`) : chaque composant devait être déclaré dans un module, qui regroupait aussi les imports. Depuis les versions récentes, les composants standalone sont le standard : un composant déclare directement ses dépendances dans son tableau `imports`, sans module intermédiaire. Les nouveaux projets générés par le CLI utilisent les composants standalone par défaut.",
      },
      {
        kind: "fields",
        title: "Les deux modèles, factuellement",
        fields: [
          {
            label: "Composants standalone (standard actuel)",
            value:
              "`@Component({ standalone: true, imports: [...] })`. Chaque composant est autonome et déclare ce qu'il utilise. Moins de fichiers, moins d'indirection : c'est ce que le CLI génère aujourd'hui.",
          },
          {
            label: "NgModule (modèle historique)",
            value:
              "Une classe décorée par `@NgModule({ declarations: [...], imports: [...] })` qui regroupe des composants. Encore très présent dans les projets existants et une partie de la documentation ancienne.",
          },
          {
            label: "Que choisir pour un nouveau projet",
            value:
              "Les composants standalone : c'est le défaut du CLI et la direction officielle du framework. Les NgModules restent supportés pour la compatibilité.",
          },
          {
            label: "Pourquoi les deux existent",
            value:
              "Le framework a évolué sans casser l'existant : des millions de lignes de code utilisent encore les NgModules, Angular les supporte donc toujours.",
          },
        ],
      },
      {
        kind: "code",
        language: "ts",
        title: "Standalone : les dépendances sont déclarées localement",
        code: "import { Component } from '@angular/core';\nimport { CommonModule } from '@angular/common';\n\n@Component({\n  selector: 'app-liste',\n  standalone: true,\n  imports: [CommonModule], // ce que le template utilise\n  template: `<li *ngFor=\"let item of items\">{{ item }}</li>`,\n})\nexport class ListeComponent {\n  items = ['un', 'deux', 'trois'];\n}",
      },
    ],
  },
  {
    id: "templates-interpolation",
    title: "Templates et interpolation",
    level: 3,
    intro:
      "Le template est du HTML enrichi : on y affiche des données avec la syntaxe `{{ }}`.",
    blocks: [
      {
        kind: "text",
        text: "L'interpolation insère la valeur d'une expression TypeScript dans le template : `{{ titre }}` affiche le contenu de la propriété `titre`.",
      },
      {
        kind: "text",
        text: "C'est le pont entre la classe et l'affichage : les données vivent dans le TypeScript, le template les présente sans logique complexe.",
      },
      {
        kind: "fields",
        title: "L'interpolation `{{ }}`",
        fields: [          {
            label: "Exemple simple",
            value:
              "`<p>Bonjour {{ prenom }} {{ nom }}</p>` affiche « Bonjour Ada Lovelace » si les propriétés valent 'Ada' et 'Lovelace'.",
          },
          {
            label: "Exemple réel",
            value:
              "`<span>{{ produit.prix | currency:'EUR' }}</span>` : interpolation combinée à un pipe (voir la section pipes) pour formater un prix.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Mettre trop de logique dans l'interpolation (`{{ items.filter(...).map(...) }}`) : cela s'exécute à chaque détection de changement et ralentit l'application. Calculez dans la classe, exposez le résultat.",
          },
          {
            label: "Bonne pratique",
            value:
              "L'interpolation affiche, elle ne calcule pas : expressions simples uniquement (propriété, appel de méthode pure et légère).",
          },
        ],
      },
    ],
  },
  {
    id: "property-binding",
    title: "Property binding : `[propriete]`",
    level: 3,
    intro:
      "Lier une propriété du DOM à une expression : la base des interfaces dynamiques.",
    blocks: [
      {
        kind: "text",
        text: "`[src]=\"urlImage\"` assigne à la propriété DOM `src` la valeur de l'expression `urlImage`, et la met à jour quand elle change.",
      },
      {
        kind: "text",
        text: "Sans binding, les attributs HTML sont statiques. Le property binding rend l'interface réactive aux données : image, état désactivé, classe, style…",
      },
      {
        kind: "fields",
        title: "Le binding de propriété",
        fields: [          {
            label: "Quand",
            value:
              "Dès qu'une valeur du template dépend des données : `<button [disabled]=\"!formulaireValide\">`, `<img [src]=\"photo\">`.",
          },
          {
            label: "Comment",
            value:
              "Crochets autour du nom de la propriété : `[propriete]=\"expression\"`. Angular évalue l'expression et assigne le résultat.",
          },
          {
            label: "Exemple réel",
            value:
              "`<input [placeholder]=\"'Rechercher dans ' + categorie\">` : le texte d'aide s'adapte à la catégorie courante.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Confondre attribut HTML et propriété DOM (`value` sur un `<input>` par exemple) : le binding agit sur la propriété DOM, pas toujours sur l'attribut visible dans le HTML source.",
          },
          {
            label: "Bonne pratique",
            value:
              "Préférez le property binding à l'interpolation dans les attributs : `[title]=\"infobulle\"` plutôt que `title=\"{{infobulle}}\"`.",
          },
        ],
      },
    ],
  },
  {
    id: "event-binding",
    title: "Event binding : `(evenement)`",
    level: 3,
    intro:
      "Réagir aux actions de l'utilisateur : clics, saisie, soumission de formulaire.",
    blocks: [
      {
        kind: "text",
        text: "`(click)=\"ajouter()\"` exécute la méthode `ajouter()` de la classe quand l'utilisateur clique sur l'élément.",
      },
      {
        kind: "text",
        text: "Une interface est interactive : il faut un pont entre les événements du navigateur et le code applicatif.",
      },
      {
        kind: "fields",
        title: "Le binding d'événement",
        fields: [          {
            label: "Quand",
            value:
              "Clics, saisie clavier, soumission de formulaire, survol… tout événement DOM standard, plus les événements personnalisés des composants.",
          },
          {
            label: "Exemple simple",
            value:
              "`<button (click)=\"compteur = compteur + 1\">+1</button>` et `<p>{{ compteur }}</p>` : un compteur fonctionnel en deux lignes.",
          },
          {
            label: "Exemple réel",
            value:
              "`<form (ngSubmit)=\"valider()\">` : la soumission du formulaire appelle la méthode `valider()` du composant.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier les parenthèses d'appel : `(click)=\"ajouter\"` passe la référence de la méthode sans l'exécuter. Il faut `(click)=\"ajouter()\"`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Les gestionnaires délèguent aux méthodes de la classe ; le template reste déclaratif, la logique reste testable dans le TypeScript.",
          },
        ],
      },
    ],
  },
  {
    id: "two-way-binding",
    title: "Two-way binding : `[(ngModel)]`",
    level: 3,
    intro:
      "Synchroniser un champ de formulaire et une propriété dans les deux sens.",
    blocks: [
      {
        kind: "text",
        text: "`[(ngModel)]=\"nom\"` affiche la valeur de `nom` dans le champ ET met à jour `nom` quand l'utilisateur tape : la « boîte dans une boîte » (banana in a box).",
      },
      {
        kind: "text",
        text: "Pour les formulaires simples, écrire le binding dans les deux sens à la main (`[value]` + `(input)`) est verbeux ; `ngModel` le fait en une syntaxe.",
      },
      {
        kind: "fields",
        title: "La liaison bidirectionnelle",
        fields: [          {
            label: "Quand",
            value:
              "Formulaires simples et prototypes rapides (approche template-driven). Pour les formulaires complexes et validés, préférez les formulaires réactifs.",
          },
          {
            label: "Comment",
            value:
              "`ngModel` vient du `FormsModule` : il faut l'importer dans le composant (`imports: [FormsModule]`) avant de l'utiliser dans le template.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Utiliser `ngModel` sans importer `FormsModule` : erreur `NG8002` (« Can't bind to 'ngModel' »). L'import est la cause dans la quasi-totalité des cas.",
          },
          {
            label: "Bonne pratique",
            value:
              "Réservez `ngModel` aux formulaires simples ; dès que la validation devient complexe, basculez sur les formulaires réactifs.",
          },
        ],
      },
      {
        kind: "code",
        language: "ts",
        title: "ngModel en action",
        code: "import { Component } from '@angular/core';\nimport { FormsModule } from '@angular/forms';\n\n@Component({\n  selector: 'app-saisie',\n  standalone: true,\n  imports: [FormsModule], // indispensable pour ngModel\n  template: `\n    <input [(ngModel)]=\"prenom\" placeholder=\"Votre prénom\">\n    <p>Bonjour {{ prenom }} !</p>\n  `,\n})\nexport class SaisieComponent {\n  prenom = '';\n}",
      },
    ],
  },
  {
    id: "directives-structurelles",
    title: "Directives structurelles : `@if`, `@for`, `@switch`",
    level: 3,
    intro:
      "Afficher ou répéter des éléments selon les données : le contrôle de flux des templates.",
    blocks: [
      {
        kind: "text",
        text: "Angular propose une syntaxe de contrôle de flux intégrée au template : `@if` pour l'affichage conditionnel, `@for` pour les listes, `@switch` pour les cas multiples. Cette syntaxe moderne (disponible depuis la version 17) remplace les anciennes directives `*ngIf` / `*ngFor` / `*ngSwitch`, que l'on rencontre encore dans le code existant.",
      },
      {
        kind: "code",
        language: "ts",
        title: "Contrôle de flux moderne",
        code: "@Component({\n  selector: 'app-taches',\n  standalone: true,\n  template: `\n    @if (taches.length === 0) {\n      <p>Aucune tâche. Profitez-en !</p>\n    } @else {\n      <ul>\n        @for (tache of taches; track tache.id) {\n          <li>{{ tache.titre }}</li>\n        }\n      </ul>\n    }\n  `,\n})\nexport class TachesComponent {\n  taches = [{ id: 1, titre: 'Relire le rapport' }];\n}",
      },
      {
        kind: "fields",
        title: "Points clés",
        fields: [
          {
            label: "Pourquoi `track` dans `@for`",
            value:
              "`track tache.id` indique à Angular comment identifier chaque élément : quand la liste change, seuls les éléments modifiés sont mis à jour au lieu de tout reconstruire. Indispensable pour la performance des listes.",
          },
          {
            label: "Ancienne syntaxe",
            value:
              "`*ngIf=\"condition\"` et `*ngFor=\"let tache of taches\"` : l'astérisque est un sucre syntaxique historique. Fonctionne toujours, mais la syntaxe `@if`/`@for` est la voie recommandée pour le nouveau code.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `track` dans `@for` : le compilateur l'exige (erreur de compilation), car sans identifiant stable le rendu des listes est inefficace et bugué lors des mises à jour.",
          },
          {
            label: "Bonne pratique",
            value:
              "Gardez la logique hors du template : `@if (utilisateurConnecte)` plutôt que `@if (utilisateur && utilisateur.role === 'admin' && …)`. Exposez des propriétés calculées depuis la classe.",
          },
        ],
      },
    ],
  },
  {
    id: "pipes",
    title: "Pipes : transformer l'affichage",
    level: 3,
    intro:
      "Formater les données dans le template sans polluer la classe : dates, prix, texte.",
    blocks: [
      {
        kind: "text",
        text: "Un pipe transforme une valeur pour l'affichage : `{{ prix | currency:'EUR' }}` affiche « 42,00 € ».",
      },
      {
        kind: "text",
        text: "Le formatage est une préoccupation d'affichage, pas de logique métier : les pipes l'isolent dans le template, de façon réutilisable.",
      },
      {
        kind: "fields",
        title: "Les pipes",
        fields: [          {
            label: "Pipes intégrés courants",
            value:
              "`date` (formatage de dates), `currency` (monnaies), `number`/`percent`, `uppercase`/`lowercase`/`titlecase`, `json` (debug : affiche un objet), `async` (déballe un Observable — voir la section dédiée).",
          },
          {
            label: "Exemple réel",
            value:
              "`{{ commande.date | date:'dd/MM/yyyy' }}` et `{{ commande.total | currency:'EUR':'symbol':'1.2-2' }}` : une ligne de facture lisible sans une ligne de TypeScript.",
          },
          {
            label: "Pipe personnalisé",
            value:
              "`ng g pipe tempsEcoule` génère un pipe sur mesure (classe avec `transform()`). Utile pour les formatages métier récurrents (durées, références…).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Chaîner trop de pipes ou y mettre de la logique lourde : les pipes purs s'exécutent à chaque détection de changement. Un pipe doit rester une transformation légère.",
          },
          {
            label: "Bonne pratique",
            value:
              "Un pipe = une transformation d'affichage, sans effet de bord, sans appel réseau. La logique métier reste dans les services.",
          },
        ],
      },
    ],
  },
  {
    id: "input-output",
    title: "`@Input` et `@Output` : communiquer entre composants",
    level: 3,
    intro:
      "Les composants s'échangent des données : le parent donne (`@Input`), l'enfant notifie (`@Output`).",
    blocks: [
      {
        kind: "text",
        text: "`@Input()` reçoit des données du parent, `@Output()` émet des événements vers le parent : un flux de données descendant, des événements remontants.",
      },
      {
        kind: "text",
        text: "Les composants sont isolés par design : sans ce mécanisme, ils ne pourraient ni se paramétrer ni se coordonner. C'est le contrat explicite entre un composant et son parent.",
      },
      {
        kind: "fields",
        title: "La communication parent → enfant → parent",
        fields: [          {
            label: "Quand",
            value:
              "`@Input` pour configurer un composant réutilisable (une carte produit reçoit `produit`) ; `@Output` pour signaler une action (un bouton « ajouter » émet `ajoute`).",
          },
          {
            label: "Exemple réel",
            value:
              "Parent : `<app-carte-produit [produit]=\"selection\" (ajoute)=\"ajouterAuPanier($event)\">`. L'enfant déclare `@Input() produit` et `@Output() ajoute = new EventEmitter<Produit>()`.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Muter un objet reçu en `@Input` depuis l'enfant : cela contourne le flux descendant et crée des bugs de synchronisation difficiles à tracer. L'enfant émet un événement, le parent décide.",
          },
          {
            label: "Bonne pratique",
            value:
              "Les `@Input` sont en lecture seule côté enfant ; toute modification remonte via `@Output`. Pour un état partagé complexe, voir la section gestion d'état.",
          },
          {
            label: "Concepts liés",
            value:
              "Property binding, event binding, services partagés, signaux (`input()` / `output()` modernes).",
          },
        ],
      },
    ],
  },
  {
    id: "cycle-de-vie",
    title: "Cycle de vie d'un composant",
    level: 3,
    intro:
      "Naissance, mises à jour, destruction : les hooks pour agir au bon moment.",
    blocks: [
      {
        kind: "fields",
        title: "Les hooks essentiels",
        fields: [
          {
            label: "`ngOnInit`",
            value:
              "Appelé une fois après la création du composant et la réception des `@Input`. C'est ici que l'on charge les données initiales (appel API via un service), pas dans le constructeur.",
          },
          {
            label: "`ngOnChanges`",
            value:
              "Appelé à chaque changement d'un `@Input`. Utile pour réagir quand le parent fournit de nouvelles données.",
          },
          {
            label: "`ngOnDestroy`",
            value:
              "Appelé juste avant la destruction du composant. On y libère les ressources : désabonnement des Observables manuels, annulation de timers. Oublier ce hook = fuites mémoire.",
          },
          {
            label: "Constructeur vs `ngOnInit`",
            value:
              "Le constructeur sert uniquement à déclarer les dépendances injectées. Toute logique d'initialisation (surtout asynchrone) va dans `ngOnInit`, car les `@Input` n'y sont pas encore disponibles dans le constructeur.",
          },
          {
            label: "Erreur fréquente",
            value:
              "S'abonner à un Observable dans `ngOnInit` sans se désabonner dans `ngOnDestroy` : chaque visite de la page ajoute un abonnement fantôme. Solution propre : le pipe `async` dans le template (désabonnement automatique).",
          },
          {
            label: "Bonne pratique",
            value:
              "Préférez le pipe `async` aux abonnements manuels ; quand l'abonnement manuel est nécessaire, centralisez la destruction (pattern `takeUntil` + `Subject`).",
          },
        ],
      },
    ],
  },
  {
    id: "services",
    title: "Services : la logique métier",
    level: 3,
    intro:
      "Tout ce qui n'est pas de l'affichage vit dans des services : appels API, règles métier, état partagé.",
    blocks: [
      {
        kind: "text",
        text: "Un service est une classe décorée par `@Injectable()` qui encapsule une responsabilité : récupérer des données, appliquer des règles, partager un état.",
      },
      {
        kind: "text",
        text: "Mettre les appels HTTP dans les composants les rend intestables et dupliqués. Un service centralise la logique : un seul endroit à tester, à corriger, à réutiliser.",
      },
      {
        kind: "fields",
        title: "Les services",
        fields: [          {
            label: "Quand",
            value:
              "Dès qu'une logique est utilisée par deux composants, fait un appel réseau, ou doit survivre à la navigation : c'est un service.",
          },
          {
            label: "Exemple réel",
            value:
              "Un `PanierService` expose `articles$` (le contenu du panier) et `ajouter(article)` : l'en-tête affiche le compteur, la page panier affiche le détail, tous deux lisent le même service.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Instancier un service avec `new` dans un composant : on perd l'injection de dépendances (pas de singleton partagé, pas de mock en test). On déclare le service en dépendance, Angular le fournit.",
          },
          {
            label: "Bonne pratique",
            value:
              "Services fins et nommés par domaine (`ClientService`, `AuthService`) ; un service ne manipule jamais le DOM directement.",
          },
          {
            label: "Concepts liés",
            value:
              "Injection de dépendances, HttpClient, Observables, gestion d'état.",
          },
        ],
      },
      {
        kind: "code",
        language: "ts",
        title: "Un service typique",
        code: "import { Injectable } from '@angular/core';\nimport { HttpClient } from '@angular/common/http';\nimport { Observable } from 'rxjs';\n\nexport interface Produit { id: number; nom: string; prix: number; }\n\n@Injectable({ providedIn: 'root' })\nexport class ProduitService {\n  private url = '/api/produits';\n\n  constructor(private http: HttpClient) {}\n\n  lister(): Observable<Produit[]> {\n    return this.http.get<Produit[]>(this.url);\n  }\n}",
      },
    ],
  },
  {
    id: "injection-dependances",
    title: "Injection de dépendances (DI)",
    level: 3,
    intro:
      "Le mécanisme central d'Angular : déclarer ce dont on a besoin, le framework le fournit.",
    blocks: [
      {
        kind: "text",
        text: "Au lieu de créer ses dépendances (`new ProduitService()`), une classe les déclare dans son constructeur et Angular les lui injecte automatiquement.",
      },
      {
        kind: "text",
        text: "Le découplage : un composant ne sait pas comment son service est construit. En test, on peut injecter un faux service (mock) sans toucher au composant.",
      },
      {
        kind: "fields",
        title: "L'injection de dépendances",
        fields: [          {
            label: "Comment",
            value:
              "`constructor(private produitService: ProduitService)` : le type sert de clé, l'injecteur fournit l'instance. La fonction moderne `inject(ProduitService)` fait la même chose hors constructeur.",
          },
          {
            label: "`providedIn: 'root'`",
            value:
              "`@Injectable({ providedIn: 'root' })` enregistre le service à la racine : une seule instance partagée dans toute l'application (singleton), sans configuration supplémentaire.",
          },
          {
            label: "Hiérarchie des injecteurs",
            value:
              "On peut fournir un service au niveau d'un composant (`providers: [...]` dans `@Component`) : chaque instance du composant obtient alors sa propre instance du service. Utile pour un état local à une section de l'interface.",
          },
          {
            label: "Erreur fréquente",
            value:
              "« No provider for X » : le service n'est enregistré nulle part (ni `providedIn`, ni `providers`). Vérifiez le décorateur `@Injectable` du service.",
          },
          {
            label: "Bonne pratique",
            value:
              "`providedIn: 'root'` par défaut ; un scope plus restreint seulement quand l'isolation d'état est voulue et comprise.",
          },
        ],
      },
    ],
  },
  {
    id: "rxjs-observables",
    title: "RxJS et Observables : penser en flux",
    level: 3,
    intro:
      "Le concept le plus déroutant d'Angular — et l'un des plus puissants : les données asynchrones comme des flux.",
    blocks: [
      {
        kind: "text",
        text: "Un Observable est un flux de valeurs dans le temps : zéro, une ou plusieurs valeurs, puis éventuellement une fin ou une erreur.",
      },
      {
        kind: "text",
        text: "Les promesses ne gèrent qu'une valeur unique ; les callbacks s'emboîtent mal. Un Observable unifie clics, saisie clavier, réponses HTTP et timers sous un même modèle composable.",
      },
      {
        kind: "fields",
        title: "Les Observables",
        fields: [          {
            label: "Quand",
            value:
              "`HttpClient` retourne des Observables, les formulaires réactifs exposent les changements de valeur en Observable, le router expose les paramètres d'URL en Observable.",
          },
          {
            label: "Comment",
            value:
              "On ne lit pas la valeur directement : on s'abonne (`.subscribe()`) ou, mieux dans les templates, on utilise le pipe `async`. Les opérateurs (`map`, `filter`…) transforment le flux sans le consommer.",
          },
          {
            label: "Exemple simple",
            value:
              "`this.produitService.lister().subscribe(produits => this.produits = produits)` : quand la réponse HTTP arrive, le callback reçoit les produits.",
          },
          {
            label: "Exemple réel",
            value:
              "Recherche instantanée : le champ de recherche émet chaque frappe en Observable, on applique `debounceTime(300)` puis `switchMap` vers l'API — trois opérateurs, zéro état intermédiaire géré à la main.",
          },
          {
            label: "Erreur fréquente",
            value:
              "S'abonner sans se désabonner (fuite mémoire) ou s'abonner plusieurs fois au même Observable HTTP (requêtes dupliquées). Le pipe `async` règle le premier cas ; `shareReplay` le second.",
          },
          {
            label: "Bonne pratique",
            value:
              "Dans les composants, préférez exposer des Observables (`produits$`, convention du suffixe `$`) consommés par le pipe `async` plutôt que des abonnements manuels.",
          },
        ],
      },
    ],
  },
  {
    id: "operateurs-rxjs",
    title: "Opérateurs RxJS essentiels",
    level: 3,
    intro:
      "Une poignée d'opérateurs couvre la majorité des besoins : transformer, filtrer, combiner, temporiser.",
    blocks: [
      {
        kind: "fields",
        title: "Les opérateurs à connaître",
        fields: [
          {
            label: "`map`",
            value:
              "Transforme chaque valeur : `produits$.pipe(map(liste => liste.filter(p => p.prix < 50)))`. L'équivalent du `map` des tableaux, mais sur un flux.",
          },
          {
            label: "`filter`",
            value:
              "Ne laisse passer que les valeurs qui satisfont un prédicat. Souvent combiné à `map` pour façonner les données avant affichage.",
          },
          {
            label: "`switchMap`",
            value:
              "Enchaîne deux appels asynchrones en annulant le précédent : le classique de la recherche instantanée (nouvelle frappe = ancienne requête abandonnée).",
          },
          {
            label: "`debounceTime` / `distinctUntilChanged`",
            value:
              "Attend une pause de frappe (ex. 300 ms) et ignore les valeurs identiques consécutives : évite de marteler l'API à chaque touche.",
          },
          {
            label: "`catchError`",
            value:
              "Intercepte l'erreur du flux et fournit une valeur de repli ou un flux alternatif : l'application ne plante pas quand l'API répond mal.",
          },
          {
            label: "`takeUntil`",
            value:
              "Termine l'abonnement quand un second Observable émet : le pattern standard de désabonnement dans `ngOnDestroy`.",
          },
          {
            label: "`combineLatest`",
            value:
              "Combine plusieurs flux : émet dès que l'un d'eux change, avec les dernières valeurs de chacun. Utile pour croiser filtres et données.",
          },
        ],
      },
      {
        kind: "code",
        language: "ts",
        title: "Recherche instantanée : opérateurs combinés",
        code: "import { Component } from '@angular/core';\nimport { FormControl, ReactiveFormsModule } from '@angular/forms';\nimport { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';\n\n@Component({\n  selector: 'app-recherche',\n  standalone: true,\n  imports: [ReactiveFormsModule],\n  template: `<input [formControl]=\"recherche\">`,\n})\nexport class RechercheComponent {\n  recherche = new FormControl('');\n\n  resultats$ = this.recherche.valueChanges.pipe(\n    debounceTime(300),\n    distinctUntilChanged(),\n    switchMap(terme => this.produitService.chercher(terme ?? ''))\n  );\n\n  constructor(private produitService: ProduitService) {}\n}",
      },
    ],
  },
  {
    id: "async-pipe",
    title: "Le pipe `async` : consommer les flux dans le template",
    level: 3,
    intro:
      "La façon idiomatique d'afficher un Observable : souscription et désabonnement gérés par Angular.",
    blocks: [
      {
        kind: "text",
        text: "`{{ produits$ | async }}` souscrit à l'Observable, affiche chaque valeur émise, et se désabonne automatiquement à la destruction du composant.",
      },
      {
        kind: "text",
        text: "Il élimine les deux erreurs les plus fréquentes des débutants RxJS : oublier de se désabonner (fuite mémoire) et gérer manuellement les états de chargement.",
      },
      {
        kind: "fields",
        title: "Le pipe `async`",
        fields: [          {
            label: "Combiné à `@if`",
            value:
              "`@if (produits$ | async; as produits)` : déballe le flux et expose `produits` utilisable dans le bloc. Élégant et sûr contre les valeurs nulles.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Utiliser `| async` deux fois sur le même Observable dans un template : deux souscriptions, donc deux requêtes HTTP. Solution : déballer une fois avec `as` et réutiliser la variable.",
          },
          {
            label: "Bonne pratique",
            value:
              "`async` dans le template par défaut ; `.subscribe()` dans la classe seulement quand un effet de bord l'exige (navigation, notification), avec désabonnement géré.",
          },
        ],
      },
      {
        kind: "code",
        language: "ts",
        title: "async + @if : le duo standard",
        code: "@Component({\n  selector: 'app-catalogue',\n  standalone: true,\n  template: `\n    @if (produits$ | async; as produits) {\n      @for (p of produits; track p.id) {\n        <p>{{ p.nom }} — {{ p.prix | currency:'EUR' }}</p>\n      }\n    } @else {\n      <p>Chargement…</p>\n    }\n  `,\n})\nexport class CatalogueComponent {\n  produits$ = this.produitService.lister();\n  constructor(private produitService: ProduitService) {}\n}",
      },
    ],
  },
  {
    id: "signaux",
    title: "Signaux (signals) : l'état réactif moderne",
    level: 3,
    intro:
      "L'évolution récente d'Angular pour l'état local : une réactivité fine, sans RxJS pour les cas simples.",
    blocks: [
      {
        kind: "text",
        text: "Les signaux sont le système de réactivité introduit par Angular (aperçu développeur dans la version 16, stabilisés ensuite) : un signal contient une valeur, notifie ses lecteurs quand elle change, et permet de dériver des valeurs calculées. Ils coexistent avec RxJS — ils ne le remplacent pas : les signaux excellent pour l'état local synchrone, RxJS reste le roi des flux asynchrones.",
      },
      {
        kind: "code",
        language: "ts",
        title: "Signaux : les trois primitives",
        code: "import { Component, signal, computed, effect } from '@angular/core';\n\n@Component({\n  selector: 'app-compteur',\n  standalone: true,\n  template: `<button (click)=\"incrementer()\">{{ compteur() }} (double : {{ double() }})</button>`,\n})\nexport class CompteurComponent {\n  compteur = signal(0);                       // valeur réactive\n  double = computed(() => this.compteur() * 2); // valeur dérivée\n\n  constructor() {\n    effect(() => console.log('compteur =', this.compteur())); // effet de bord\n  }\n\n  incrementer() { this.compteur.update(v => v + 1); }\n}",
      },
      {
        kind: "fields",
        title: "Points clés",
        fields: [
          {
            label: "`signal()` / `.set()` / `.update()`",
            value:
              "Crée, remplace ou transforme la valeur. La lecture se fait en appelant le signal comme une fonction : `compteur()`.",
          },
          {
            label: "`computed()`",
            value:
              "Valeur dérivée recalculée uniquement quand ses dépendances changent : l'équivalent déclaratif d'un getter mis en cache.",
          },
          {
            label: "`effect()`",
            value:
              "Exécute un effet de bord (log, synchronisation externe) à chaque changement des signaux lus. À réserver aux effets, jamais à la logique métier.",
          },
          {
            label: "Signaux vs RxJS, factuellement",
            value:
              "Signaux : état local synchrone, granularité fine, détection de changement optimisée. RxJS : événements asynchrones, opérateurs de flux, interopérabilité (les deux mondes se convertissent). Le nouveau code privilégie les signaux pour l'état simple.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier les parenthèses à la lecture (`compteur` au lieu de `compteur()`) : on manipule alors le signal lui-même, pas sa valeur.",
          },
        ],
      },
    ],
  },
  {
    id: "formulaires-template-driven",
    title: "Formulaires template-driven",
    level: 3,
    intro:
      "Des formulaires simples pilotés par le template, avec `ngModel` et la validation HTML.",
    blocks: [
      {
        kind: "text",
        text: "Le formulaire est décrit dans le template avec `ngModel`, et Angular construit le modèle de formulaire en arrière-plan.",
      },
      {
        kind: "text",
        text: "Pour un formulaire de contact ou d'inscription simple, c'est la voie la plus courte : peu de TypeScript, validation via les attributs HTML (`required`, `minlength`…).",
      },
      {
        kind: "fields",
        title: "L'approche template-driven",
        fields: [          {
            label: "Quand",
            value:
              "Formulaires simples, champs indépendants, validation basique. Dès que les champs interagissent ou que la validation devient métier, passez aux formulaires réactifs.",
          },
          {
            label: "Validation",
            value:
              "Les attributs HTML (`required`, `type=\"email\"`, `minlength`) deviennent des validateurs Angular ; l'état (`valid`, `touched`, `dirty`) est accessible via une référence de template (`#f=\"ngForm\"`).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier l'attribut `name` sur un champ avec `ngModel` dans un formulaire : Angular l'exige pour enregistrer le contrôle (`If ngModel is used within a form tag…`).",
          },
          {
            label: "Bonne pratique",
            value:
              "Affichez les messages d'erreur seulement après interaction (`touched`) : un formulaire rouge dès l'affichage est une mauvaise expérience.",
          },
        ],
      },
    ],
  },
  {
    id: "formulaires-reactifs",
    title: "Formulaires réactifs",
    level: 3,
    intro:
      "Des formulaires complexes pilotés par le TypeScript : le standard des applications métier.",
    blocks: [
      {
        kind: "text",
        text: "Le formulaire est construit en TypeScript avec `FormGroup` / `FormControl`, le template ne fait que s'y lier : la source de vérité est le code.",
      },
      {
        kind: "text",
        text: "Validation dynamique, champs conditionnels, formulaires imbriqués, tests unitaires : tout ce qui est pénible en template-driven devient explicite et testable.",
      },
      {
        kind: "fields",
        title: "L'approche réactive",
        fields: [          {
            label: "Les trois classes",
            value:
              "`FormControl` (un champ : valeur + validateurs + état), `FormGroup` (un groupe de contrôles, ex. tout le formulaire), `FormArray` (une liste dynamique de contrôles, ex. lignes d'une commande).",
          },
          {
            label: "Exemple réel",
            value:
              "Un `FormArray` de lignes de devis où chaque ligne recalcule son total et le formulaire affiche la somme : la logique vit dans la classe, testable sans navigateur.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Mélanger `ngModel` et `formControl` sur le même champ : les deux approches sont incompatibles sur un même contrôle (avertissement de dépréciation puis erreur). Choisissez l'une ou l'autre.",
          },
          {
            label: "Bonne pratique",
            value:
              "Construisez avec `FormBuilder` (syntaxe concise), extrayez les validateurs métier dans des fonctions réutilisables et testez-les en unitaire.",
          },
        ],
      },
      {
        kind: "code",
        language: "ts",
        title: "Formulaire réactif avec validation",
        code: "import { Component } from '@angular/core';\nimport { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';\n\n@Component({\n  selector: 'app-inscription',\n  standalone: true,\n  imports: [ReactiveFormsModule],\n  template: `\n    <form [formGroup]=\"form\" (ngSubmit)=\"valider()\">\n      <input formControlName=\"email\" type=\"email\">\n      @if (form.controls.email.invalid && form.controls.email.touched) {\n        <p>Email invalide.</p>\n      }\n      <button [disabled]=\"form.invalid\">S'inscrire</button>\n    </form>\n  `,\n})\nexport class InscriptionComponent {\n  form = this.fb.group({\n    email: ['', [Validators.required, Validators.email]],\n  });\n  constructor(private fb: FormBuilder) {}\n  valider() { console.log(this.form.value); }\n}",
      },
    ],
  },
  {
    id: "validateurs-personnalises",
    title: "Validateurs personnalisés",
    level: 3,
    intro:
      "Quand `required` et `email` ne suffisent plus : écrire ses propres règles de validation.",
    blocks: [
      {
        kind: "text",
        text: "Un validateur est une fonction qui reçoit un contrôle et retourne `null` (valide) ou un objet d'erreur (`{ motDePasseFaible: true }`).",
      },
      {
        kind: "text",
        text: "Les règles métier (format de référence interne, mot de passe robuste, dates cohérentes entre deux champs) n'existent pas dans les validateurs intégrés.",
      },
      {
        kind: "fields",
        title: "Les validateurs sur mesure",
        fields: [          {
            label: "Validateur synchrone",
            value:
              "Fonction pure et immédiate : la majorité des cas (formats, plages, comparaisons entre champs via un validateur de groupe).",
          },
          {
            label: "Validateur asynchrone",
            value:
              "Retourne un Observable/Promise : pour les vérifications serveur (unicité d'un email, disponibilité d'un identifiant). Angular affiche l'état `pending` pendant la vérification.",
          },
          {
            label: "Bonne pratique",
            value:
              "Validateurs purs, nommés explicitement, testés en unitaire sans TestBed : ce sont de simples fonctions.",
          },
        ],
      },
      {
        kind: "code",
        language: "ts",
        title: "Un validateur personnalisé testable",
        code: "import { AbstractControl, ValidationErrors } from '@angular/forms';\n\n// Retourne null si valide, un objet d'erreur sinon.\nexport function motDePasseRobuste(controle: AbstractControl): ValidationErrors | null {\n  const valeur = String(controle.value ?? '');\n  const robuste = valeur.length >= 10 && /[0-9]/.test(valeur);\n  return robuste ? null : { motDePasseFaible: true };\n}\n\n// Utilisation : motDePasse: ['', [Validators.required, motDePasseRobuste]]",
      },
    ],
  },
  {
    id: "routing",
    title: "Routing : naviguer entre les pages",
    level: 3,
    intro:
      "Le router associe chaque URL à un composant : la navigation d'une vraie application.",
    blocks: [
      {
        kind: "text",
        text: "Le router lit l'URL, trouve la route correspondante dans `app.routes.ts` et affiche le composant associé dans `<router-outlet>`.",
      },
      {
        kind: "text",
        text: "Une application a plusieurs écrans (liste, détail, administration) : le routing donne à chacun une URL partageable, avec historique du navigateur et boutons précédent/suivant fonctionnels.",
      },
      {
        kind: "fields",
        title: "Le router Angular",
        fields: [          {
            label: "Les trois pièces",
            value:
              "`Routes` (le tableau de routes : `path` + `component`), `routerLink` (la directive de navigation dans les templates : `<a routerLink=\"/panier\">`), `router-outlet` (l'emplacement où le composant de la route s'affiche).",
          },
          {
            label: "Paramètres de route",
            value:
              "`path: 'produit/:id'` : l'identifiant est lu via `ActivatedRoute` (Observable `paramMap`). Le composant détail recharge ses données quand l'id change.",
          },
          {
            label: "Exemple réel",
            value:
              "Catalogue : `/produits` affiche la liste, `/produits/42` le détail du produit 42, `/admin` l'administration — trois routes, trois composants, une URL par écran.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `<router-outlet>` dans le template racine : la navigation change l'URL mais rien ne s'affiche. Le router a besoin de son point d'insertion.",
          },
          {
            label: "Bonne pratique",
            value:
              "Naviguez avec `routerLink` (pas de `href` classique qui recharge toute l'application) et lisez les paramètres via l'Observable, pas via un instantané, quand le composant peut être réutilisé.",
          },
        ],
      },
      {
        kind: "code",
        language: "ts",
        title: "Déclarer des routes",
        code: "import { Routes } from '@angular/router';\nimport { CatalogueComponent } from './catalogue/catalogue.component';\nimport { DetailComponent } from './detail/detail.component';\n\nexport const routes: Routes = [\n  { path: '', redirectTo: 'produits', pathMatch: 'full' },\n  { path: 'produits', component: CatalogueComponent },\n  { path: 'produits/:id', component: DetailComponent },\n  { path: '**', component: PageIntrouvableComponent }, // 404 : toujours en dernier\n];",
      },
    ],
  },
  {
    id: "guards",
    title: "Guards : protéger les routes",
    level: 3,
    intro:
      "Restreindre l'accès à certaines pages : authentification, rôles, données non sauvegardées.",
    blocks: [
      {
        kind: "text",
        text: "Un guard est une fonction exécutée avant l'activation d'une route : elle autorise ou bloque la navigation en retournant `true`, `false` ou une redirection.",
      },
      {
        kind: "text",
        text: "Certaines pages exigent d'être connecté (`/admin`, `/profil`) : le guard centralise ce contrôle au lieu de le répéter dans chaque composant.",
      },
      {
        kind: "fields",
        title: "Les guards",
        fields: [          {
            label: "`canActivate`",
            value:
              "Le guard le plus courant : `canActivate: [authGuard]` sur la route. Si l'utilisateur n'est pas connecté, on le redirige vers `/connexion`.",
          },
          {
            label: "`canDeactivate`",
            value:
              "Demande confirmation avant de quitter une page avec des modifications non sauvegardées (« Quitter sans enregistrer ? »).",
          },
          {
            label: "Exemple réel",
            value:
              "`authGuard` lit le `AuthService` : connecté → `true` ; sinon → redirection vers la page de connexion avec l'URL d'origine en paramètre pour y revenir après login.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Protéger uniquement côté interface : un guard Angular n'est qu'une UX, jamais une sécurité. L'API backend doit elle aussi vérifier les droits sur chaque requête.",
          },
          {
            label: "Bonne pratique",
            value:
              "Guards sous forme de fonctions (style moderne) plutôt que de classes ; logique d'autorisation dans un service, le guard ne fait qu'orchestrer.",
          },
        ],
      },
    ],
  },
  {
    id: "lazy-loading",
    title: "Lazy loading : charger les routes à la demande",
    level: 3,
    intro:
      "Ne charger que ce que l'utilisateur visite : la technique n°1 pour un démarrage rapide.",
    blocks: [
      {
        kind: "text",
        text: "`loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent)` : le code de la route n'est téléchargé que lors de la première visite.",
      },
      {
        kind: "text",
        text: "Sans lazy loading, tout le code part dans le bundle initial : l'utilisateur qui ne visite que l'accueil télécharge aussi l'administration. Le lazy loading découpe le bundle par route.",
      },
      {
        kind: "fields",
        title: "Le chargement différé",
        fields: [          {
            label: "Quand",
            value:
              "Toutes les routes sauf les plus critiques : l'administration, les pages rarement visitées et les fonctionnalités lourdes sont des candidates évidentes.",
          },
          {
            label: "Stratégies de préchargement",
            value:
              "Par défaut : chargement à la visite. Avec `PreloadAllModules` (ou stratégie personnalisée) : chargement en arrière-plan après le démarrage — le meilleur des deux mondes pour les connexions correctes.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Tout mettre en lazy sauf… rien : la page d'accueil elle-même en lazy retarde le premier affichage. La route initiale reste dans le bundle principal.",
          },
          {
            label: "Bonne pratique",
            value:
              "Mesurez avec les budgets de `angular.json` et l'analyseur de bundle avant d'optimiser à l'aveugle : le lazy loading se pilote aux chiffres.",
          },
        ],
      },
    ],
  },
  {
    id: "httpclient",
    title: "HttpClient : parler aux API",
    level: 3,
    intro:
      "Le client HTTP officiel : requêtes typées, intercepteurs, gestion d'erreurs centralisée.",
    blocks: [
      {
        kind: "text",
        text: "`HttpClient` (fourni via `provideHttpClient()`) expose `get`, `post`, `put`, `delete` typés qui retournent des Observables.",
      },
      {
        kind: "text",
        text: "Plutôt que `fetch` brut : typage de bout en bout, intercepteurs globaux (token d'authentification, logs), gestion d'erreur unifiée, testabilité via `HttpTestingController`.",
      },
      {
        kind: "fields",
        title: "HttpClient",
        fields: [          {
            label: "Typage",
            value:
              "`this.http.get<Produit[]>('/api/produits')` : la réponse est typée `Produit[]`, l'autocomplétion et le compilateur vérifient son usage.",
          },
          {
            label: "Intercepteurs",
            value:
              "Des middlewares qui voient passer toutes les requêtes/réponses : ajout du header `Authorization`, journalisation, transformation globale des erreurs. Déclarés une fois, actifs partout.",
          },
          {
            label: "Gestion d'erreurs",
            value:
              "`catchError` dans le service pour transformer l'erreur HTTP en message métier ; le composant affiche, le service décide. Ne jamais laisser une erreur HTTP brute arriver au template.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `provideHttpClient()` dans la configuration de l'application : « No provider for HttpClient ». C'est l'équivalent moderne de l'ancien `HttpClientModule`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Les appels HTTP vivent dans les services, jamais dans les composants ; une méthode = un endpoint, avec son type de retour explicite.",
          },
        ],
      },
    ],
  },
  {
    id: "gestion-etat",
    title: "Gestion d'état : quelle approche ?",
    level: 3,
    intro:
      "De l'état local au store global : choisir le bon niveau de sophistication, sans sur-ingénierie.",
    blocks: [
      {
        kind: "fields",
        title: "Les niveaux de gestion d'état",
        fields: [
          {
            label: "État local du composant",
            value:
              "Propriétés et signaux du composant : suffit quand l'état n'est utilisé que dans un composant et ses enfants directs. Commencez toujours ici.",
          },
          {
            label: "Service partagé",
            value:
              "Un service avec des signaux ou des `BehaviorSubject` exposés en Observable : l'état partagé par quelques composants (panier, utilisateur connecté). Couvre la grande majorité des applications.",
          },
          {
            label: "Bibliothèque de state management",
            value:
              "Des solutions dédiées (ex. NgRx, avec son store inspiré de Redux) apportent actions, reducers, effets et devtools quand l'état devient complexe et les flux d'événements difficiles à tracer.",
          },
          {
            label: "Quand passer au niveau supérieur",
            value:
              "Quand le « prop drilling » (faire transiter l'état par 4 niveaux de `@Input`) devient pénible, ou quand plusieurs écrans modifient le même état de façon concurrente.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Adopter un store global dès le premier composant : complexité cérémonielle pour un besoin local. La règle est de monter en sophistication quand la douleur apparaît, pas avant.",
          },
          {
            label: "Bonne pratique",
            value:
              "Un seul propriétaire par morceau d'état ; les autres composants le lisent (sélecteurs/Observables) et demandent des changements (méthodes/actions), ils ne le mutent pas directement.",
          },
        ],
      },
    ],
  },
  {
    id: "tests-unitaires",
    title: "Tests unitaires : Jasmine, Karma et alternatives",
    level: 3,
    intro:
      "Tester services et logique avec le harnais officiel — et connaître les alternatives factuelles.",
    blocks: [
      {
        kind: "text",
        text: "Angular génère les tests avec Jasmine (framework d'assertions : `describe`, `it`, `expect`) exécutés par Karma (lanceur qui pilote un vrai navigateur). `ng test` lance la suite en mode watch. Cette stack est le défaut historique du CLI, et c'est elle que la documentation officielle décrit en premier.",
      },
      {
        kind: "fields",
        title: "Tester en Angular",
        fields: [
          {
            label: "Ce qu'on teste en unitaire",
            value:
              "Services (logique métier, avec `HttpTestingController` pour simuler les API), validateurs, pipes, fonctions utilitaires : tout ce qui ne dépend pas du rendu.",
          },
          {
            label: "`TestBed`",
            value:
              "Le harnais qui configure un mini-module de test : déclare le composant/service, fournit les mocks, puis crée l'instance à tester. Puissant mais verbeux : réservez-le aux tests qui en ont besoin.",
          },
          {
            label: "Tester sans TestBed",
            value:
              "Services sans dépendance Angular, validateurs et pipes s'instancient directement avec `new` : des tests rapides et lisibles, sans harnais.",
          },
          {
            label: "Alternatives factuelles",
            value:
              "Jest peut remplacer le duo Jasmine/Karma via des builders communautaires (exécution plus rapide, sans navigateur). Vitest gagne du terrain dans l'écosystème frontend en général. Le choix dépend de l'équipe ; l'important est d'avoir une suite qui tourne en CI.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Tester l'implémentation plutôt que le comportement (vérifier qu'une méthode privée a été appelée) : le test casse à chaque refactoring. Testez les entrées/sorties observables.",
          },
          {
            label: "Bonne pratique",
            value:
              "Nommage explicite (« devrait rejeter un email invalide »), un concept par test, mocks aux frontières (HTTP, timers), jamais de `setTimeout` réel.",
          },
        ],
      },
      {
        kind: "command",
        label: "Lancer les tests en une fois (mode CI)",
        command: "ng test --watch=false",
        why: "Exécute toute la suite une seule fois puis quitte, au lieu de rester en écoute. C'est la forme utilisée dans l'intégration continue.",
        verify: "Le résumé affiche le nombre de tests réussis/échoués et le processus se termine.",
      },
    ],
  },
  {
    id: "tests-composants",
    title: "Tester les composants",
    level: 3,
    intro:
      "Vérifier le rendu et les interactions : ce que l'utilisateur voit et fait.",
    blocks: [
      {
        kind: "text",
        text: "On crée le composant via `TestBed`, on simule les `@Input`, on déclenche les événements et on vérifie le DOM produit.",
      },
      {
        kind: "text",
        text: "Les tests unitaires purs ne voient pas le template : un binding cassé ou un `@if` inversé ne se détecte qu'en testant le composant rendu.",
      },
      {
        kind: "fields",
        title: "Les tests de composants",
        fields: [          {
            label: "Ce qu'on vérifie",
            value:
              "Le texte affiché pour un état donné, l'émission des `@Output` au clic, l'affichage conditionnel (`@if`), la présence/absence d'éléments selon les données.",
          },
          {
            label: "Stubs vs vrais enfants",
            value:
              "Pour tester un composant isolément, on remplace ses composants enfants par des stubs légers ; pour un test d'intégration, on garde les vrais enfants. Les deux ont leur place.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `fixture.detectChanges()` après avoir modifié l'état : sans cet appel, le template n'est pas mis à jour et le test vérifie un DOM périmé.",
          },
          {
            label: "Bonne pratique",
            value:
              "Interrogez le DOM par le texte visible ou les rôles (ce que l'utilisateur perçoit), pas par les classes CSS internes qui changent souvent.",
          },
        ],
      },
    ],
  },
  {
    id: "tests-e2e",
    title: "Tests de bout en bout (E2E)",
    level: 3,
    intro:
      "Tester l'application comme un utilisateur : navigateur piloté, parcours complets.",
    blocks: [
      {
        kind: "text",
        text: "Un navigateur réel (ou émulé) exécute des scénarios utilisateur — connexion, ajout au panier, commande — contre l'application compilée.",
      },
      {
        kind: "text",
        text: "Seuls les tests E2E vérifient l'assemblage complet : routing, guards, appels API réels, formulaires. Ils attrapent les bugs d'intégration que les tests unitaires ne voient pas.",
      },
      {
        kind: "fields",
        title: "Les tests E2E",
        fields: [          {
            label: "Outils",
            value:
              "Playwright et Cypress sont les deux références actuelles pour piloter les navigateurs (le Protractor historique d'Angular est arrêté depuis 2023). Les deux s'intègrent à un projet Angular sans configuration spécifique au framework.",
          },
          {
            label: "Que tester",
            value:
              "Les parcours critiques uniquement (inscription, tunnel d'achat, connexion) : les tests E2E sont lents et fragiles, on les réserve à ce qui doit absolument fonctionner.",
          },
          {
            label: "Bonne pratique",
            value:
              "Données de test isolées, sélecteurs stables dédiés aux tests (attributs `data-testid`), exécution en CI sur chaque pull request des parcours critiques.",
          },
        ],
      },
    ],
  },
  {
    id: "build-production",
    title: "Build de production",
    level: 3,
    intro:
      "De `ng serve` à un bundle optimisé : ce que `ng build` fait vraiment.",
    blocks: [
      {
        kind: "command",
        label: "Compiler pour la production",
        command: "ng build",
        why: "Produit dans `dist/` une version optimisée : minification, tree-shaking (code inutilisé supprimé), compilation AOT (templates compilés à l'avance), découpage en chunks. C'est cette sortie que l'on déploie, jamais le mode développement.",
        verify: "Le dossier `dist/` contient les fichiers compilés et le résumé affiche la taille des bundles.",
      },
      {
        kind: "fields",
        title: "Comprendre le build",
        fields: [
          {
            label: "AOT (Ahead-of-Time)",
            value:
              "Les templates sont compilés en JavaScript pendant le build, pas dans le navigateur : démarrage plus rapide et erreurs de template détectées à la compilation.",
          },
          {
            label: "Tree-shaking",
            value:
              "Le code importé mais jamais utilisé est éliminé du bundle. D'où l'importance d'importer précisément (pas de barrel qui réexporte tout).",
          },
          {
            label: "Budgets (`angular.json`)",
            value:
              "Des seuils de taille configurables : le build échoue ou avertit si le bundle dépasse la limite. C'est le garde-fou contre l'embonpoint progressif — réglez-les dès le début du projet.",
          },
          {
            label: "Configurations",
            value:
              "`ng build --configuration production` (défaut) vs `development` : la configuration pilote l'optimisation, les source maps et le remplacement de fichiers (ex. environnements).",
          },
          {
            label: "Erreur fréquente",
            value:
              "« Ça marchait en dev » : le build de production est plus strict (AOT, optimisations). Toujours lancer `ng build` avant de merger, idéalement en CI.",
          },
        ],
      },
    ],
  },
  {
    id: "deploiement",
    title: "Déploiement",
    level: 3,
    intro:
      "Mettre l'application en ligne : le contenu de `dist/` est statique, l'hébergement est simple.",
    blocks: [
      {
        kind: "text",
        text: "Une application Angular compilée n'est qu'un ensemble de fichiers statiques (HTML, JS, CSS). N'importe quel hébergeur de fichiers statiques convient : Vercel, Netlify, GitHub Pages, un bucket S3, un serveur Nginx… Le seul point d'attention est le routing.",
      },
      {
        kind: "fields",
        title: "Points d'attention",
        fields: [
          {
            label: "Réécriture d'URL (point critique)",
            value:
              "En routing « path » (défaut), l'URL `/produits/42` n'existe pas comme fichier : le serveur doit renvoyer `index.html` pour toutes les routes, sinon rechargement = 404. Chaque hébergeur a son réglage (fichier de rewrites, règle de fallback).",
          },
          {
            label: "Variables d'environnement",
            value:
              "Les fichiers `environment.ts` / `environment.prod.ts` sont figés à la compilation. Pour une configuration vraiment dynamique (URL d'API par environnement), chargez un fichier JSON au démarrage via `APP_INITIALIZER`.",
          },
          {
            label: "Cache",
            value:
              "Les noms de fichiers incluent un hash : les navigateurs peuvent les mettre en cache agressivement, sauf `index.html` qui doit rester frais (sinon les utilisateurs gardent l'ancienne version).",
          },
          {
            label: "CI/CD typique",
            value:
              "À chaque push : `npm ci` → `ng test --watch=false` → `ng build` → déploiement du dossier `dist/` si tout est vert. GitHub Actions, GitLab CI ou le pipeline de l'hébergeur font l'affaire.",
          },
        ],
      },
    ],
  },
  {
    id: "ssr",
    title: "SSR : le rendu côté serveur (notions)",
    level: 3,
    intro:
      "Quand le HTML doit arriver déjà rempli : SEO, premier affichage, partage sur les réseaux.",
    blocks: [
      {
        kind: "text",
        text: "Le SSR (Server-Side Rendering) génère le HTML sur le serveur à chaque requête au lieu de laisser le navigateur construire la page à partir d'un JavaScript vide.",
      },
      {
        kind: "text",
        text: "Trois motifs : le SEO (les robots voient le contenu sans exécuter de JS), le premier affichage perçu (l'utilisateur voit du contenu plus vite) et les aperçus de partage (Open Graph a besoin d'un HTML complet).",
      },
      {
        kind: "fields",
        title: "Le SSR en Angular",
        fields: [          {
            label: "En Angular",
            value:
              "Le paquet officiel `@angular/ssr` ajoute le rendu serveur au projet (`ng add @angular/ssr`). L'hydratation réconcilie ensuite le HTML serveur avec l'application cliente sans reconstruire le DOM.",
          },
          {
            label: "Quand s'en passer",
            value:
              "Applications internes derrière authentification, tableaux de bord privés : le SEO n'a aucun intérêt et le SSR ajoute une complexité serveur. Le rendu client suffit.",
          },
          {
            label: "Contraintes à connaître",
            value:
              "Le code exécuté côté serveur n'a pas accès à `window`, `document` ni `localStorage` : il faut protéger ces accès (vérifier la plateforme) sous peine de plantage au rendu.",
          },
          {
            label: "Bonne pratique",
            value:
              "Ne décidez pas du SSR au feeling : si le besoin est le SEO ou le partage social, oui ; sinon, mesurez d'abord si le premier affichage est réellement un problème.",
          },
        ],
      },
    ],
  },
  {
    id: "i18n",
    title: "Internationalisation (i18n)",
    level: 3,
    intro:
      "Préparer l'application à parler plusieurs langues : le système officiel d'Angular.",
    blocks: [
      {
        kind: "text",
        text: "Le système i18n d'Angular marque les textes traduisibles dans les templates (`i18n`), extrait un catalogue, et produit un build par langue.",
      },
      {
        kind: "text",
        text: "Coder les textes en dur dans deux langues avec des `@if` est ingérable dès la troisième langue. L'i18n sépare les textes du code et confie la traduction à des fichiers dédiés.",
      },
      {
        kind: "fields",
        title: "L'i18n Angular",
        fields: [          {
            label: "Le flux",
            value:
              "Marquer (`i18n` sur les éléments) → extraire (`ng extract-i18n` produit un fichier XLIFF) → traduire (traducteurs/outils externes) → builder par locale (`ng build --localize`).",
          },
          {
            label: "Limite à connaître",
            value:
              "L'approche officielle produit un build par langue (un déploiement par locale), pas un changement de langue à chaud dans le navigateur. Pour du changement de langue dynamique, des bibliothèques tierces existent.",
          },
          {
            label: "Bonne pratique",
            value:
              "Marquez les textes dès le début si le multilinguisme est prévu : rattraper l'i18n sur une application terminée est un chantier.",
          },
        ],
      },
    ],
  },
  {
    id: "accessibilite",
    title: "Accessibilité",
    level: 3,
    intro:
      "Une application utilisable par tous : clavier, lecteurs d'écran, contrastes.",
    blocks: [
      {
        kind: "text",
        text: "Obligation légale dans de nombreux contextes (secteur public, grandes entreprises) et simple qualité : une partie des utilisateurs navigue au clavier ou avec un lecteur d'écran.",
      },
      {
        kind: "fields",
        title: "L'accessibilité en Angular",
        fields: [          {
            label: "Les bases HTML d'abord",
            value:
              "80 % de l'accessibilité est du HTML sémantique : vrais `<button>`, vrais `<label>`, hiérarchie de titres correcte. Angular ne dispense pas de ces fondamentaux.",
          },
          {
            label: "Points spécifiques à Angular",
            value:
              "Gérer le focus lors des changements de route (annoncer la nouvelle page aux lecteurs d'écran), utiliser `aria-live` pour les messages dynamiques (notifications, erreurs de formulaire), rendre les composants personnalisés clavier-navigables.",
          },
          {
            label: "CDK a11y",
            value:
              "Le Component Dev Kit d'Angular fournit des utilitaires : `LiveAnnouncer` (annoncer des messages), gestion du focus trap pour les dialogues, `ListKeyManager` pour la navigation clavier dans les listes.",
          },
          {
            label: "Tester",
            value:
              "Naviguez votre application au clavier seul (tabulation, entrée, échapper) : c'est le test le plus révélateur. Des outils d'audit automatisés (Lighthouse, axe) complètent, sans remplacer le test manuel.",
          },
        ],
      },
    ],
  },
  {
    id: "performance",
    title: "Performance : les leviers",
    level: 3,
    intro:
      "Garder une application rapide quand elle grandit : détection des changements, bundles, images.",
    blocks: [
      {
        kind: "fields",
        title: "Les leviers de performance",
        fields: [
          {
            label: "Stratégie `OnPush`",
            value:
              "Par défaut, Angular vérifie tous les composants à chaque événement. `changeDetection: ChangeDetectionStrategy.OnPush` limite la vérification aux cas où les `@Input` changent (par référence) ou un événement interne survient : le levier principal sur les applications denses.",
          },
          {
            label: "`track` dans les listes",
            value:
              "Déjà vu : sans identifiant stable, chaque mise à jour d'une liste reconstruit tout le DOM de la liste. `track` est non négociable sur les listes dynamiques.",
          },
          {
            label: "Lazy loading des routes",
            value:
              "Le découpage du bundle par route (voir la section dédiée) : le bundle initial ne contient que l'essentiel.",
          },
          {
            label: "Images",
            value:
              "La directive `NgOptimizedImage` (`ngSrc`) applique les bonnes pratiques automatiquement : dimensions, chargement différé (`loading=\"lazy\"`), priorité pour l'image principale (`priority`), tailles responsives.",
          },
          {
            label: "Mesurer d'abord",
            value:
              "Angular DevTools (profileur) et Lighthouse indiquent où est le problème réel. Optimiser sans mesurer, c'est risquer de complexifier le code pour aucun gain visible.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Mettre des appels de méthodes dans les interpolations (`{{ calculerTotal() }}`) : la méthode s'exécute à chaque cycle de détection, même sans changement. Exposez une propriété calculée (ou un `computed()` avec les signaux).",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les dix pièges que presque tous les débutants Angular rencontrent — et comment les éviter.",
    blocks: [
      {
        kind: "text",
        text: "Avec les composants standalone, chaque composant utilisé doit être importé dans le `imports` du composant parent.",
      },
      {
        kind: "fields",
        title: "Erreur 1 — `NG8001` : composant inconnu",
        fields: [          { label: "Problème", value: "`'app-panier' is not a known element` : le template utilise un composant qu'Angular ne connaît pas." },
          { label: "Mauvais", value: "Utiliser `<app-panier>` sans l'avoir importé." },
          { label: "Mieux", value: "Ajouter `PanierComponent` au tableau `imports` du composant qui l'utilise." },
        ],
      },
      {
        kind: "text",
        text: "`ngModel` appartient au `FormsModule`, qui n'est pas importé par défaut.",
      },
      {
        kind: "fields",
        title: "Erreur 2 — `NG8002` : impossible de binder",
        fields: [          { label: "Problème", value: "`Can't bind to 'ngModel' since it isn't a known property`." },
          { label: "Mauvais", value: "Utiliser `[(ngModel)]` en espérant qu'il soit disponible partout." },
          { label: "Mieux", value: "Importer `FormsModule` dans le `imports` du composant (ou utiliser les formulaires réactifs avec `ReactiveFormsModule`)." },
        ],
      },
      {
        kind: "text",
        text: "`HttpClient` n'est fourni que si `provideHttpClient()` est déclaré dans la configuration de l'application (`app.config.ts`).",
      },
      {
        kind: "fields",
        title: "Erreur 3 — « No provider for HttpClient »",
        fields: [          { label: "Problème", value: "L'injection de `HttpClient` échoue au démarrage." },
          { label: "Mauvais", value: "Injecter `HttpClient` dans un service sans jamais l'avoir fourni." },
          { label: "Mieux", value: "Ajouter `provideHttpClient()` aux `providers` de `app.config.ts`." },
        ],
      },
      {
        kind: "text",
        text: "Chaque `.subscribe()` dans `ngOnInit` sans désabonnement dans `ngOnDestroy` laisse un écouteur fantôme à chaque visite du composant.",
      },
      {
        kind: "fields",
        title: "Erreur 4 — Abonnement sans désabonnement",
        fields: [          { label: "Problème", value: "L'application ralentit au fil de la navigation ; les requêtes se multiplient." },
          { label: "Mauvais", value: "`this.service.donnees().subscribe(d => this.donnees = d)` sans gestion de la destruction." },
          { label: "Mieux", value: "Exposer `donnees$` et utiliser le pipe `async` dans le template : désabonnement automatique." },
        ],
      },
      {
        kind: "text",
        text: "L'enfant a modifié directement l'objet reçu du parent, court-circuitant le flux de données descendant.",
      },
      {
        kind: "fields",
        title: "Erreur 5 — Muter un `@Input`",
        fields: [          { label: "Problème", value: "L'interface affiche des données incohérentes après interaction avec un composant enfant." },
          { label: "Mauvais", value: "`this.produit.prix = nouveauPrix` dans l'enfant." },
          { label: "Mieux", value: "L'enfant émet `prixChange.emit(nouveauPrix)` via `@Output` ; le parent décide et met à jour." },
        ],
      },
      {
        kind: "text",
        text: "Les expressions du template (`{{ filtrer(items) }}`, appels de méthodes) s'exécutent à chaque cycle de détection des changements.",
      },
      {
        kind: "fields",
        title: "Erreur 6 — Logique lourde dans le template",
        fields: [          { label: "Problème", value: "L'application rame alors que les données sont peu nombreuses." },
          { label: "Mauvais", value: "`@for (item of trier(items); track item.id)` avec `trier()` recalculé en permanence." },
          { label: "Mieux", value: "Calculer une fois dans la classe (ou `computed()` avec les signaux) et exposer le résultat." },
        ],
      },
      {
        kind: "text",
        text: "Typiquement, un enfant modifie une valeur liée du parent pendant le cycle de rendu (effet de bord dans un hook ou un getter).",
      },
      {
        kind: "fields",
        title: "Erreur 7 — `ExpressionChangedAfterItHasBeenCheckedError`",
        fields: [          { label: "Problème", value: "Erreur en mode développement : une valeur a changé après que la détection des changements l'a vérifiée." },
          { label: "Mauvais", value: "Modifier un état lié dans `ngAfterViewInit` ou dans un getter appelé par le template." },
          { label: "Mieux", value: "Déplacer la modification avant le rendu (dans `ngOnInit`) ou la rendre asynchrone ; repenser le flux de données pour qu'il soit unidirectionnel." },
        ],
      },
      {
        kind: "text",
        text: "Sans identifiant stable, Angular ne peut pas associer les éléments avant/après : il reconstruit tout.",
      },
      {
        kind: "fields",
        title: "Erreur 8 — Oublier le `track` dans `@for`",
        fields: [          { label: "Problème", value: "Les listes se comportent bizarrement lors des mises à jour (focus perdu, animations rejouées, contre-performance)." },
          { label: "Mieux", value: "`@for (item of items; track item.id)` systématiquement, avec un identifiant métier stable." },
        ],
      },
      {
        kind: "text",
        text: "`<a href=\"/panier\">` provoque une navigation complète du navigateur, pas une navigation du router Angular.",
      },
      {
        kind: "fields",
        title: "Erreur 9 — Naviguer avec `href`",
        fields: [          { label: "Problème", value: "Chaque clic sur un lien recharge toute l'application : l'état est perdu, c'est lent." },
          { label: "Mauvais", value: "`<a href=\"/panier\">Panier</a>`." },
          { label: "Mieux", value: "`<a routerLink=\"/panier\">Panier</a>` : navigation interne, instantanée, sans rechargement." },
        ],
      },
      {
        kind: "text",
        text: "Tout le code Angular est téléchargé dans le navigateur : visible et modifiable par l'utilisateur. Un guard n'est pas une sécurité.",
      },
      {
        kind: "fields",
        title: "Erreur 10 — Secrets et logique sensible côté client",
        fields: [          { label: "Problème", value: "Clé d'API ou règle d'autorisation contournée en lisant le code." },
          { label: "Mauvais", value: "Stocker un token d'administration ou une clé privée dans `environment.ts` en pensant qu'elle est cachée." },
          { label: "Mieux", value: "Les secrets restent sur le serveur ; le backend vérifie les droits à chaque requête, le frontend ne fait que refléter l'UX." },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro:
      "Les habitudes qui distinguent un projet Angular maintenable d'un projet qui s'enlise.",
    blocks: [
      {
        kind: "list",
        items: [
          "Composants « smart » vs « dumb » : les composants conteneurs orchestrent (services, router), les composants de présentation affichent (`@Input`/`@Output` uniquement) et sont réutilisables.",
          "Un service par domaine métier, avec des méthodes nommées par l'intention (`validerCommande`, pas `postData`).",
          "Typage strict partout : pas de `any` qui traîne ; les interfaces décrivent les données de l'API.",
          "Le pipe `async` par défaut dans les templates ; les abonnements manuels sont l'exception, documentée et désabonnée.",
          "`OnPush` sur les composants de présentation : performance gratuite quand le flux de données est propre.",
          "Barrel files (`index.ts`) avec modération : pratiques pour les imports, mais ils peuvent gonfler les bundles s'ils réexportent trop large.",
          "Conventions de nommage du CLI respectées (`*.component.ts`, `*.service.ts`) : tout le monde s'y retrouve, les outils aussi.",
          "Tests sur la logique métier et les parcours critiques ; pas de course au pourcentage de couverture pour elle-même.",
          "`ng build` et `ng test --watch=false` en CI sur chaque pull request : le build de production ne doit jamais surprendre au moment du déploiement.",
          "Mises à jour régulières (`ng update`) plutôt que des sauts de plusieurs versions majeures tous les deux ans.",
        ],
      },
    ],
  },
  {
    id: "projets-realistes",
    title: "Projets réalistes et progressifs",
    level: 3,
    intro:
      "Quatre projets de difficulté croissante pour transformer la théorie en réflexes.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Liste de tâches complète",
        fields: [
          { label: "Objectif", value: "CRUD local avec composants, formulaires et signaux." },
          { label: "Compétences", value: "Composants standalone, `@if`/`@for`, formulaires (template-driven ou réactifs), signaux ou service d'état." },
          { label: "Ce qu'on apprend", value: "Découper en composants, faire circuler les données (`@Input`/`@Output`), persister en `localStorage`." },
          { label: "Difficulté", value: "Débutant — 1 à 2 jours." },
          { label: "Projet suivant", value: "Le client GitHub ci-dessous." },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — Explorateur GitHub",
        fields: [
          { label: "Objectif", value: "Rechercher des dépôts via l'API publique GitHub et afficher leurs détails." },
          { label: "Compétences", value: "HttpClient typé, RxJS (`debounceTime` + `switchMap`), pipe `async`, routing avec paramètre (`/repo/:owner/:name`)." },
          { label: "Ce qu'on apprend", value: "Consommer une API réelle, gérer chargement/erreurs, recherche instantanée, navigation par URL." },
          { label: "Difficulté", value: "Intermédiaire — 3 à 5 jours." },
          { label: "Projet suivant", value: "La boutique ci-dessous." },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Mini-boutique avec panier",
        fields: [
          { label: "Objectif", value: "Catalogue, détail produit, panier persistant, tunnel de commande simulé." },
          { label: "Compétences", value: "Routing + guards (espace admin protégé), formulaires réactifs avec validateurs, service panier partagé, lazy loading, intercepteur HTTP." },
          { label: "Ce qu'on apprend", value: "Architecturer une vraie application : état partagé, protection de routes, validation métier, découpage en fonctionnalités." },
          { label: "Difficulté", value: "Intermédiaire-avancé — 1 à 2 semaines." },
          { label: "Projet suivant", value: "Le tableau de bord temps réel." },
        ],
      },
      {
        kind: "fields",
        title: "Projet 4 — Tableau de bord temps réel",
        fields: [
          { label: "Objectif", value: "Dashboard alimenté par WebSocket ou polling : métriques, graphiques, alertes." },
          { label: "Compétences", value: "RxJS avancé (flux temps réel, `combineLatest`), `OnPush`, tests unitaires des services, build optimisé, déploiement." },
          { label: "Ce qu'on apprend", value: "Gérer des flux continus sans fuites mémoire, optimiser le rendu, tester la logique asynchrone, déployer pour de vrai." },
          { label: "Difficulté", value: "Avancé — 2 à 3 semaines." },
          { label: "Projet suivant", value: "Contribuer à un projet open source Angular ou explorer le SSR sur un cas réel." },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro:
      "Les sources officielles d'abord — la documentation Angular est l'une des meilleures du web frontend.",
    blocks: [
      {
        kind: "list",
        items: [
          "angular.dev — la documentation officielle : guides, tutoriels interactifs, référence API. Le point de départ et la référence permanente.",
          "Le tutoriel officiel « Tour of Heroes » (sur angular.dev) : l'application fil rouge qui couvre composants, services, routing et HTTP.",
          "Le guide de mise à jour interactif (sur angular.dev) : génère les étapes de migration selon vos versions de départ et d'arrivée.",
          "La chaîne YouTube officielle Angular : conférences et annonces de versions.",
          "RxJS : rxjs.dev pour la référence des opérateurs, avec leurs diagrammes (marble diagrams).",
          "La communauté : le Discord/Forum officiel et Stack Overflow (tag `angular`) pour les questions précises — avec un exemple minimal reproductible.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Angular maîtrisé dans ses fondamentaux : les directions naturelles pour continuer.",
    blocks: [
      {
        kind: "fields",
        title: "Pistes de progression",
        fields: [
          {
            label: "Approfondir TypeScript",
            value:
              "Les types avancés (génériques, utilitaires, narrowing) rendent le code Angular plus sûr : la Learning Page TypeScript couvre tout cela.",
          },
          {
            label: "State management à grande échelle",
            value:
              "Si vos applications dépassent le service partagé, explorez NgRx (store, effets, devtools) : la solution historique de l'écosystème Angular.",
          },
          {
            label: "Backend pour servir vos apps",
            value:
              "Node.js/Express, ASP.NET Core ou Django : construire l'API que votre application Angular consomme, pour devenir autonome de bout en bout.",
          },
          {
            label: "Mobile hybride",
            value:
              "Ionic + Capacitor permettent de packager une application Angular en application mobile native : une seule base de code, trois plateformes.",
          },
          {
            label: "DevOps",
            value:
              "Dockeriser le build, automatiser tests et déploiements en CI/CD : la Learning Page DevOps et la section Docker couvrent le sujet.",
          },
        ],
      },
    ],
  },
];

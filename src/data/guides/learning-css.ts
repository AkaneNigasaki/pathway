import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de CSS : de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 *
 * Particularité de CSS : il n'y a rien à installer — le navigateur EST
 * l'environnement d'exécution, et les DevTools sont l'inspecteur.
 */
export const LEARNING_CSS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est CSS, pourquoi il existe et sa place aux côtés de HTML et JavaScript.",
    blocks: [
      {
        kind: "text",
        text: "CSS (Cascading Style Sheets, feuilles de style en cascade) est le langage qui décrit la présentation d'un document HTML : couleurs, typographie, espacements, mise en page, animations. Si HTML dit « ceci est un titre », CSS dit « ce titre est grand, bleu et centré ».",
      },
      {
        kind: "text",
        text: "Pourquoi CSS existe : au début du web, la présentation était mélangée au contenu (attributs comme `bgcolor` directement dans le HTML). Résultat : pour changer la couleur de tous les titres d'un site, il fallait modifier chaque page une par une. CSS sépare le contenu (HTML) de la présentation (CSS) : un seul fichier de styles peut contrôler l'apparence de centaines de pages. Changer le design du site devient une modification à un seul endroit.",
      },
      {
        kind: "diagram",
        title: "Le trio du web",
        lines: [
          "HTML  →  STRUCTURE  (le contenu : titres, paragraphes, images)",
          "CSS   →  PRÉSENTATION (l'apparence : couleurs, mise en page)",
          "JS    →  COMPORTEMENT (l'interactivité : clics, animations dynamiques)",
        ],
      },
      {
        kind: "text",
        text: "Point important : CSS n'est pas un langage de programmation au sens classique — il n'y a ni variables d'état, ni boucles, ni conditions (même si les custom properties et les media queries s'en rapprochent). C'est un langage déclaratif : vous décrivez le résultat souhaité (« les liens sont bleus »), et le navigateur s'occupe de l'appliquer.",
      },
    ],
  },
  {
    id: "cascade-en-une-phrase",
    title: "La cascade en une phrase",
    level: 1,
    intro:
      "Le concept central de CSS, résumé avant de l'explorer en profondeur.",
    blocks: [
      {
        kind: "text",
        text: "La cascade, en une phrase : quand plusieurs règles CSS ciblent le même élément, le navigateur tranche selon l'origine, la spécificité et l'ordre d'écriture pour décider quelle déclaration s'applique.",
      },
      {
        kind: "diagram",
        title: "Le chemin d'une règle CSS jusqu'à l'écran",
        lines: [
          "Sélecteur         →  « quels éléments ? »   (ex. `.bouton`)",
          "     │",
          "     ▼",
          "Déclaration       →  « quoi changer ? »     (ex. `color: blue`)",
          "     │",
          "     ▼",
          "Cascade           →  « qui gagne ? »        (origine, spécificité, ordre)",
          "     │",
          "     ▼",
          "Rendu             →  le navigateur peint l'élément à l'écran",
        ],
      },
      {
        kind: "text",
        text: "Retenez l'image : un sélecteur choisit des éléments, des déclarations décrivent leur apparence, et la cascade arbitre les conflits. Tout le reste de CSS — Flexbox, Grid, animations — se construit sur cette base.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 2 — PRATIQUE
  // ------------------------------------------------------------------
  {
    id: "prerequis-html",
    title: "Prérequis : HTML",
    level: 2,
    intro:
      "CSS ne fonctionne que sur du HTML : il faut savoir lire et écrire une page HTML avant de la styler.",
    blocks: [
      {
        kind: "fields",
        title: "HTML — ce qu'il faut savoir",
        fields: [
          {
            label: "Structure d'un document",
            value:
              "Connaître le rôle de `<!DOCTYPE html>`, `<html>`, `<head>` et `<body>`. C'est dans `<head>` que l'on lie la feuille de style avec `<link>`.",
          },
          {
            label: "Balises et attributs",
            value:
              "Savoir écrire des balises (`<h1>`, `<p>`, `<a>`, `<img>`…) et leurs attributs. Les attributs `class` et `id` sont les crochets que CSS utilise pour cibler les éléments.",
          },
          {
            label: "Imbrication",
            value:
              "Comprendre que les éléments s'imbriquent (un `<li>` dans un `<ul>`, un `<a>` dans un `<p>`). Les sélecteurs CSS exploitent directement cette hiérarchie.",
          },
          {
            label: "HTML sémantique",
            value:
              "Utiliser `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>` plutôt que des `<div>` partout. Un HTML sémantique se style plus proprement et reste accessible.",
          },
        ],
      },
      {
        kind: "text",
        text: "Pas besoin de maîtriser tout HTML : savoir construire une page simple (titres, paragraphes, liens, images, listes, un formulaire basique) suffit pour démarrer CSS. Les deux s'apprennent d'ailleurs très bien en parallèle.",
      },
    ],
  },
  {
    id: "installation-zero",
    title: "Installation : il n'y en a pas",
    level: 2,
    intro:
      "Bonne nouvelle : CSS ne s'installe pas. Le navigateur est déjà l'environnement d'exécution.",
    blocks: [
      {
        kind: "text",
        text: "Contrairement à la plupart des technologies, CSS ne demande aucune installation : chaque navigateur sait interpréter CSS nativement. Votre « environnement de développement CSS » se résume à deux choses : un navigateur récent (Chrome, Firefox, Safari, Edge — tous conviennent) et un éditeur de texte.",
      },
      {
        kind: "fields",
        title: "Votre équipement de départ",
        fields: [
          {
            label: "Navigateur",
            value:
              "N'importe quel navigateur moderne. Les différences de rendu entre navigateurs existent mais sont bien moindres qu'il y a dix ans ; les bases de CSS fonctionnent partout de la même façon.",
          },
          {
            label: "Éditeur de texte",
            value:
              "VS Code, Zed, Sublime Text ou même le bloc-notes : un fichier `.css` n'est que du texte. Aucun compilateur, aucun serveur, aucune dépendance.",
          },
          {
            label: "DevTools",
            value:
              "Les outils de développement intégrés au navigateur (touche `F12`) : votre inspecteur, votre console d'expérimentation et votre débogueur CSS, déjà installés.",
          },
        ],
      },
      {
        kind: "command",
        label: "Servir votre dossier en local (optionnel mais pratique)",
        command: "python3 -m http.server 8000",
        why: "Ouvrir un fichier HTML en double-cliquant dessus fonctionne, mais certaines fonctionnalités (polices chargées en local, `fetch`) exigent un vrai serveur HTTP. Cette commande démarre un serveur statique dans le dossier courant, sans rien installer — Python est déjà présent sur la plupart des systèmes.",
        verify: "Ouvrez http://localhost:8000 dans le navigateur : votre page s'affiche.",
      },
    ],
  },
  {
    id: "premier-style",
    title: "Premier style : tutoriel pas à pas",
    level: 2,
    intro:
      "Écrire votre première règle CSS en six étapes, en comprenant chacune.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer une page HTML minimale",
            detail:
              "Créez un fichier `index.html` avec un titre `<h1>Bonjour</h1>` et un paragraphe `<p>Mon premier style.</p>`. Ouvrez-le dans le navigateur : c'est du HTML brut, sans style.",
          },
          {
            title: "Créer la feuille de style",
            detail:
              "Créez un fichier `style.css` dans le même dossier. C'est un simple fichier texte — l'extension `.css` indique au navigateur qu'il contient des règles de style.",
          },
          {
            title: "Lier la feuille au HTML",
            detail:
              "Dans le `<head>` de `index.html`, ajoutez `<link rel=\"stylesheet\" href=\"style.css\">`. Cette balise dit au navigateur : « va chercher ce fichier et applique ses règles à la page ».",
          },
          {
            title: "Écrire votre première règle",
            detail:
              "Dans `style.css`, écrivez `h1 { color: darkblue; }`. Lecture : le sélecteur `h1` cible tous les titres de niveau 1 ; la déclaration `color: darkblue` change leur couleur de texte.",
          },
          {
            title: "Recharger et observer",
            detail:
              "Rechargez la page (`F5`) : le titre est devenu bleu foncé. Le paragraphe, lui, n'a pas changé — le sélecteur `h1` ne le ciblait pas.",
          },
          {
            title: "Expérimenter dans les DevTools",
            detail:
              "Appuyez sur `F12`, cliquez sur l'icône d'inspection puis sur le titre. Dans le panneau Styles, modifiez `darkblue` en `crimson` : le changement est immédiat, sans recharger. Attention : ces modifications sont temporaires — recopiez celles qui vous plaisent dans `style.css`.",
          },
        ],
      },
    ],
  },
  {
    id: "lier-css-html",
    title: "Les trois façons de lier CSS et HTML",
    level: 2,
    intro:
      "Il existe trois manières d'appliquer du CSS à une page. Une seule convient à un vrai projet.",
    blocks: [
      {
        kind: "table",
        headers: ["Méthode", "Syntaxe", "Quand l'utiliser"],
        rows: [
          [
            "Feuille externe",
            "`<link rel=\"stylesheet\" href=\"style.css\">`",
            "Toujours en pratique : un fichier partagé par toutes les pages, mis en cache par le navigateur, séparation contenu/présentation respectée.",
          ],
          [
            "Balise `<style>`",
            "`<style>h1 { color: blue; }</style>` dans le `<head>`",
            "Prototypage rapide, email HTML, ou styles spécifiques à une seule page. À éviter comme base d'un site : le CSS n'est pas réutilisable entre pages.",
          ],
          [
            "Style en ligne",
            "`<h1 style=\"color: blue;\">`",
            "Quasiment jamais : impossible à réutiliser, priorité maximale qui casse la cascade, HTML illisible. Réservé à des cas générés par JavaScript.",
          ],
        ],
      },
      {
        kind: "code",
        language: "html",
        title: "La méthode recommandée : feuille externe",
        code: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>Ma page</title>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n<body>\n  <h1>Bonjour</h1>\n  <p>Mon premier style.</p>\n</body>\n</html>",
      },
    ],
  },
  {
    id: "editeurs-extensions",
    title: "Éditeurs et extensions",
    level: 2,
    intro:
      "N'importe quel éditeur convient, mais certains facilitent la vie avec CSS.",
    blocks: [
      {
        kind: "fields",
        title: "Éditeurs courants",
        fields: [
          {
            label: "VS Code",
            value:
              "Coloration syntaxique, autocomplétion des propriétés et aperçu des couleurs intégrés nativement. Extensions utiles : Prettier (formatage automatique) et, si vous utilisez Tailwind, l'extension officielle Tailwind CSS IntelliSense.",
          },
          {
            label: "WebStorm",
            value:
              "Autocomplétion CSS avancée et inspections intégrées sans extension. Adapté si vous travaillez déjà dans l'écosystème JetBrains.",
          },
          {
            label: "Zed / Sublime Text",
            value:
              "Légers et rapides, avec coloration et autocomplétion CSS de base. Un bon choix si vous voulez un éditeur minimal.",
          },
          {
            label: "Neovim / Vim",
            value:
              "Entièrement configurables ; la coloration CSS est native, l'autocomplétion vient des plugins LSP. Pour les utilisateurs déjà à l'aise au clavier.",
          },
        ],
      },
      {
        kind: "text",
        text: "Aucun de ces éditeurs n'est « le meilleur » pour CSS : le critère qui compte est l'autocomplétion des propriétés (qui évite les fautes de frappe, première source d'erreur en CSS) et un formateur automatique. Tout le reste est une question d'habitude.",
      },
      {
        kind: "fields",
        title: "Outils complémentaires",
        fields: [
          {
            label: "Prettier",
            value:
              "Formateur de code : il réindente et normalise votre CSS à chaque sauvegarde. Il ne corrige pas les erreurs, il rend le code lisible et cohérent.",
          },
          {
            label: "Stylelint",
            value:
              "Linter CSS : il signale les erreurs (propriété inconnue, sélecteur dupliqué) et les mauvaises pratiques selon des règles configurables. L'équivalent d'ESLint pour CSS.",
          },
        ],
      },
    ],
  },
  {
    id: "devtools-premiers-pas",
    title: "DevTools : votre laboratoire CSS",
    level: 2,
    intro:
      "Les outils de développement du navigateur sont l'outil CSS le plus important — apprenez à les utiliser dès le premier jour.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Ouvrir les DevTools",
            detail:
              "Appuyez sur `F12` (ou `Ctrl+Maj+I` / `Cmd+Opt+I` sur Mac). Le panneau s'ouvre, généralement ancré à droite ou en bas de la fenêtre.",
          },
          {
            title: "Inspecter un élément",
            detail:
              "Cliquez sur l'icône flèche (en haut à gauche du panneau), puis sur n'importe quel élément de la page. Son HTML est surligné dans le panneau Éléments.",
          },
          {
            title: "Lire les styles appliqués",
            detail:
              "L'onglet Styles montre toutes les règles CSS qui s'appliquent à l'élément, dans l'ordre de la cascade — les règles barrées sont celles qui ont perdu le conflit. C'est la cascade rendue visible.",
          },
          {
            title: "Modifier en direct",
            detail:
              "Cliquez sur n'importe quelle valeur dans l'onglet Styles et changez-la : la page se met à jour instantanément. Vous pouvez aussi décocher une règle pour la désactiver temporairement, ou en ajouter une en cliquant dans la zone vide.",
          },
          {
            title: "Voir le modèle de boîte",
            detail:
              "En bas de l'onglet Styles (ou dans l'onglet Calculé), un schéma montre le modèle de boîte de l'élément : content, padding, border, margin avec leurs dimensions réelles en pixels.",
          },
        ],
      },
      {
        kind: "text",
        text: "Réflexe professionnel : quand un style ne s'applique pas comme prévu, on n'essaie pas des valeurs au hasard dans l'éditeur — on inspecte l'élément, on lit quelles règles gagnent la cascade, et on expérimente dans les DevTools avant de recopier la solution dans le fichier CSS.",
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Workflow quotidien",
    level: 2,
    intro:
      "La boucle de travail typique d'un développeur qui écrit du CSS.",
    blocks: [
      {
        kind: "diagram",
        title: "Boucle de travail CSS",
        lines: [
          "Écrire dans style.css",
          "     │",
          "     ▼",
          "Recharger la page (F5)",
          "     │",
          "     ▼",
          "Inspecter dans les DevTools (F12)",
          "     │",
          "     ├── Ça marche → étape suivante",
          "     │",
          "     └── Ça ne marche pas → expérimenter dans l'onglet Styles",
          "                              → recopier la solution dans style.css",
        ],
      },
      {
        kind: "list",
        items: [
          "Organisez vos styles par section commentée (`/* En-tête */`, `/* Cartes */`) : un fichier CSS se relit comme un document.",
          "Testez tôt sur mobile : redimensionnez la fenêtre ou utilisez le mode responsive des DevTools (`Ctrl+Maj+M`).",
          "Versionnez avec Git comme tout code : un fichier CSS est du code comme un autre.",
          "Ne laissez pas de styles expérimentaux commentés s'accumuler : s'ils ne servent pas, supprimez-les.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "anatomie-regle",
    title: "Anatomie d'une règle CSS",
    level: 3,
    intro:
      "Le vocabulaire précis : sélecteur, déclaration, propriété, valeur. Tout le reste s'appuie dessus.",
    blocks: [
      {
        kind: "diagram",
        title: "Décomposition d'une règle",
        lines: [
          "  .carte {                      ← sélecteur : « quels éléments ? »",
          "    background-color: white;    ← déclaration",
          "    │                  │",
          "    │                  └── valeur : « quoi mettre ? »",
          "    └── propriété : « quoi changer ? »",
          "  }",
          "",
          "  Une règle = un sélecteur + un bloc { } contenant des déclarations.",
          "  Chaque déclaration se termine par un point-virgule.",
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Trois règles, trois sélecteurs différents",
        code: "/* Sélecteur de type : tous les paragraphes */\np {\n  line-height: 1.6;\n}\n\n/* Sélecteur de classe : les éléments portant class=\"bouton\" */\n.bouton {\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n}\n\n/* Sélecteur d'ID : l'unique élément portant id=\"menu\" */\n#menu {\n  display: flex;\n}",
      },
      {
        kind: "text",
        text: "Erreur fréquente : oublier le point-virgule entre deux déclarations. Le navigateur fusionne alors les deux déclarations en une seule invalide, et les deux sont ignorées silencieusement — sans aucun message d'erreur. CSS ne signale jamais ses erreurs : une règle invalide est simplement ignorée.",
      },
    ],
  },
  {
    id: "selecteurs-bases",
    title: "Sélecteurs de base",
    level: 3,
    intro:
      "Les quatre sélecteurs fondamentaux : ce qu'ils ciblent, quand les utiliser.",
    blocks: [
      {
        kind: "fields",
        title: "Les sélecteurs de base",
        fields: [
          {
            label: "Sélecteur de type — `p`, `h1`, `a`",
            value:
              "En une phrase : cible tous les éléments d'un type de balise donné. Pourquoi : pour définir les styles par défaut d'une page (typographie des paragraphes, couleur des liens). Quand : pour les styles globaux, jamais pour des variations spécifiques — sinon chaque exception devient un conflit de cascade.",
          },
          {
            label: "Sélecteur de classe — `.bouton`, `.carte`",
            value:
              "En une phrase : cible tous les éléments portant l'attribut `class` correspondant. Pourquoi : c'est le sélecteur de travail quotidien — réutilisable, combinable (`class=\"bouton bouton-primaire\"`), sans les problèmes de spécificité des IDs. Quand : pour tout style réutilisable, c'est-à-dire presque tout.",
          },
          {
            label: "Sélecteur d'ID — `#menu`, `#formulaire`",
            value:
              "En une phrase : cible l'unique élément portant cet `id`. Pourquoi : un ID doit être unique dans la page, ce qui le rend parfait pour JavaScript (`getElementById`) et les ancres. Quand : en CSS, avec parcimonie — sa spécificité très élevée rend les surcharges difficiles. Préférez les classes pour styler.",
          },
          {
            label: "Sélecteur universel — `*`",
            value:
              "En une phrase : cible tous les éléments. Pourquoi : pour des réinitialisations globales ciblées, typiquement `* { box-sizing: border-box; }`. Quand : uniquement pour ce genre de réglage universel — l'utiliser pour des styles visuels serait inefficace et source de conflits.",
          },
          {
            label: "Sélecteur d'attribut — `[type=\"email\"]`, `[href^=\"https\"]`",
            value:
              "En une phrase : cible les éléments selon leurs attributs et leurs valeurs. Pourquoi : pour styler selon le sens (`input[type=\"checkbox\"]` différemment de `input[type=\"text\"]`) sans ajouter de classes artificielles. Quand : formulaires, liens externes (`[target=\"_blank\"]`), états ARIA.",
          },
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Sélecteurs d'attribut en pratique",
        code: "/* Tous les champs email */\ninput[type=\"email\"] {\n  border-color: #ccc;\n}\n\n/* Les liens externes s'ouvrant dans un nouvel onglet */\na[target=\"_blank\"]::after {\n  content: \" ↗\";\n}\n\n/* Les champs marqués requis */\ninput[required] {\n  border-left: 3px solid crimson;\n}",
      },
    ],
  },
  {
    id: "selecteurs-combinateurs",
    title: "Combinateurs : exploiter la hiérarchie HTML",
    level: 3,
    intro:
      "Les sélecteurs se combinent pour exprimer des relations entre éléments : parent, enfant, voisin.",
    blocks: [
      {
        kind: "fields",
        title: "Les quatre combinateurs",
        fields: [
          {
            label: "Descendant — `article p` (espace)",
            value:
              "En une phrase : cible les `p` situés n'importe où à l'intérieur d'un `article`, à n'importe quelle profondeur. Pourquoi : pour styler un contenu selon son contexte (« les paragraphes d'un article sont plus aérés »). Attention : il traverse toute la profondeur, ce qui peut cibler plus large que prévu.",
          },
          {
            label: "Enfant direct — `ul > li` (`>`)",
            value:
              "En une phrase : cible uniquement les `li` enfants directs d'un `ul`. Pourquoi : pour éviter que le style ne s'applique aux sous-listes imbriquées. Quand : dès que le HTML peut contenir des imbrications du même type d'élément (menus, listes).",
          },
          {
            label: "Frère adjacent — `h2 + p` (`+`)",
            value:
              "En une phrase : cible le `p` qui suit immédiatement un `h2`. Pourquoi : pour des ajustements contextuels fins (« le paragraphe juste après un titre n'a pas de marge haute »). Un classique de la typographie soignée.",
          },
          {
            label: "Frères généraux — `h2 ~ p` (`~`)",
            value:
              "En une phrase : cible tous les `p` frères qui suivent un `h2` (pas seulement le premier). Pourquoi : plus large que `+`, utile quand plusieurs éléments partagent le même contexte.",
          },
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Combinateurs en pratique",
        code: "/* Les liens DANS la navigation, pas tous les liens de la page */\nnav a {\n  text-decoration: none;\n}\n\n/* Les items de premier niveau uniquement (pas les sous-menus) */\n.menu > li {\n  border-bottom: 1px solid #eee;\n}\n\n/* Pas de marge haute pour le paragraphe qui suit directement un titre */\nh2 + p {\n  margin-top: 0;\n}",
      },
      {
        kind: "text",
        text: "Bonne pratique : gardez les sélecteurs courts (2 à 3 niveaux maximum). Un sélecteur comme `body main section article div p` est fragile — le moindre changement de HTML le casse — et difficile à surcharger. Une classe bien nommée vaut mieux qu'une longue chaîne de combinateurs.",
      },
    ],
  },
  {
    id: "pseudo-classes",
    title: "Pseudo-classes : styler selon l'état",
    level: 3,
    intro:
      "Les pseudo-classes ciblent les éléments selon leur état ou leur position, sans toucher au HTML.",
    blocks: [
      {
        kind: "fields",
        title: "Pseudo-classes essentielles",
        fields: [
          {
            label: "`:hover`",
            value:
              "En une phrase : s'applique quand le pointeur survole l'élément. Pourquoi : le retour visuel au survol (bouton qui s'assombrit) est le feedback le plus basique d'une interface. Erreur fréquente : ne styler que `:hover` sur les liens et boutons — au clavier, c'est `:focus` qui compte.",
          },
          {
            label: "`:focus` et `:focus-visible`",
            value:
              "En une phrase : s'applique quand l'élément reçoit le focus clavier. Pourquoi : les utilisateurs au clavier doivent voir où ils se trouvent — supprimer `outline` sans le remplacer casse la navigation au clavier. `:focus-visible` ne montre l'indicateur que pour la navigation clavier, pas au clic souris : le meilleur des deux mondes.",
          },
          {
            label: "`:nth-child(n)`",
            value:
              "En une phrase : cible les éléments selon leur position parmi leurs frères (`:nth-child(2)`, `:nth-child(odd)`, `:nth-child(3n)`). Pourquoi : pour les motifs répétitifs (lignes de tableau alternées) sans classes numérotées. Attention : compte tous les frères, pas seulement ceux du même type — `:nth-of-type` ne compte que les frères du même type.",
          },
          {
            label: "`:not()`",
            value:
              "En une phrase : exclut les éléments correspondant au sélecteur interne (`.bouton:not(.desactive)`). Pourquoi : pour dire « tous sauf » sans dupliquer de règles. Bonne pratique : `:not()` garde une spécificité basse, il reste facile à surcharger.",
          },
          {
            label: "`:checked`, `:disabled`, `:required`",
            value:
              "En une phrase : reflètent l'état des contrôles de formulaire. Pourquoi : pour styler cases cochées, champs désactivés ou requis directement en CSS, sans JavaScript. Exemple : `input:checked + label` met en évidence le libellé d'une case cochée.",
          },
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "États d'un bouton, accessibles",
        code: ".bouton {\n  background: #1a73e8;\n  color: white;\n  transition: background 0.2s;\n}\n\n.bouton:hover {\n  background: #1558b0;\n}\n\n/* Indicateur de focus visible uniquement au clavier */\n.bouton:focus-visible {\n  outline: 3px solid #ffb300;\n  outline-offset: 2px;\n}\n\n.bouton:disabled {\n  background: #ccc;\n  cursor: not-allowed;\n}",
      },
    ],
  },
  {
    id: "pseudo-elements",
    title: "Pseudo-éléments : ::before et ::after",
    level: 3,
    intro:
      "Les pseudo-éléments créent du contenu décoratif en CSS, sans polluer le HTML.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : `::before` et `::after` insèrent un élément virtuel respectivement avant et après le contenu d'un élément, stylable comme n'importe quel élément. Pourquoi ça existe : pour la décoration pure (icônes, guillemets, séparateurs, badges) — ce qui est décoratif n'a pas sa place dans le HTML, qui doit rester sémantique.",
      },
      {
        kind: "code",
        language: "css",
        title: "Décoration sans HTML supplémentaire",
        code: "/* Guillemets décoratifs autour d'une citation */\nblockquote::before {\n  content: \"“\";\n  font-size: 3rem;\n  color: #ccc;\n}\n\n/* Flèche après les liens externes */\na[target=\"_blank\"]::after {\n  content: \" ↗\";\n  font-size: 0.8em;\n}\n\n/* Pastille de notification sur une icône */\n.icone-notif::after {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background: crimson;\n}",
      },
      {
        kind: "text",
        text: "Comment ça fonctionne : la propriété `content` est obligatoire — sans elle, le pseudo-élément n'est pas généré. `content: \"\"` (chaîne vide) crée un élément vide, parfait pour les formes décoratives. Notez la syntaxe à deux deux-points `::` pour les pseudo-éléments (les navigateurs acceptent encore `:` pour des raisons historiques, mais `::` est la forme correcte).",
      },
      {
        kind: "text",
        text: "Erreur fréquente : mettre du contenu porteur de sens dans `content` (un prix, un label important). Les lecteurs d'écran ignorent généralement les pseudo-éléments : tout contenu informatif doit rester dans le HTML.",
      },
    ],
  },
  {
    id: "specificite",
    title: "Spécificité : qui gagne vraiment",
    level: 3,
    intro:
      "Le calcul exact qui départage les règles en conflit — sans mythes.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : la spécificité est un score calculé à partir du sélecteur, qui détermine quelle règle l'emporte quand plusieurs ciblent le même élément avec la même origine. Pourquoi ça existe : sans règle de priorité déterministe, l'application des styles serait imprévisible dès qu'un projet grandit.",
      },
      {
        kind: "diagram",
        title: "Calcul de la spécificité (3 compteurs)",
        lines: [
          "  (a, b, c)",
          "",
          "  a = nombre d'ID              (#menu → a=1)",
          "  b = classes, attributs,      (.bouton, [type=email], :hover → b=1)",
          "      pseudo-classes",
          "  c = types, pseudo-éléments   (p, h1, ::before → c=1)",
          "",
          "  Comparaison de gauche à droite : (1,0,0) bat (0,99,99).",
          "  Le sélecteur universel * et les combinateurs valent 0.",
          "  :where() vaut toujours 0 — :is() prend la spécificité",
          "  de son argument le plus spécifique.",
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Spécificité en exemples",
        code: "/* (0,1,0) — gagne contre le sélecteur de type */\n.bouton { color: blue; }\n\n/* (0,0,1) — perd contre .bouton */\nbutton { color: red; }\n\n/* (1,0,0) — gagne contre les deux : à éviter pour styler */\n#envoyer { color: green; }\n\n/* (0,2,0) — deux classes battent une seule */\n.bouton.primaire { color: navy; }",
      },
      {
        kind: "fields",
        title: "Règles de départage, dans l'ordre",
        fields: [
          {
            label: "1. `!important`",
            value:
              "Écrase tout le reste (sauf un autre `!important` plus spécifique ou postérieur). À réserver aux utilitaires et aux surcharges intentionnelles — en abuser rend la cascade ingérable, car on ne peut plus raisonner en spécificité.",
          },
          {
            label: "2. Spécificité",
            value:
              "Le score (a,b,c) le plus élevé gagne. C'est le critère le plus souvent déterminant dans un projet bien structuré.",
          },
          {
            label: "3. Ordre d'écriture",
            value:
              "À spécificité égale, la règle écrite en dernier dans la feuille (ou la feuille chargée en dernier) gagne. D'où l'importance de l'ordre des `<link>` et des imports.",
          },
          {
            label: "Cas particulier : styles en ligne",
            value:
              "Un attribut `style=\"...\"` bat toutes les règles de feuille de style (sauf leur `!important`). C'est une raison de plus d'éviter les styles en ligne : ils court-circuitent toute la cascade.",
          },
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : visez une spécificité basse et uniforme — principalement des classes simples `(0,1,0)`. Quand tout est au même niveau, l'ordre d'écriture suffit à trancher, et le comportement devient prévisible. Si vous devez écrire un sélecteur de plus en plus spécifique pour « forcer » un style, c'est le signe qu'une règle trop spécifique existe en amont.",
      },
    ],
  },
  {
    id: "cascade-layers",
    title: "Cascade layers : @layer",
    level: 3,
    intro:
      "Le mécanisme moderne pour organiser la cascade par couches explicites.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : `@layer` déclare des couches nommées (ex. `base`, `composants`, `utilitaires`) dont l'ordre de priorité est explicite, indépendamment de la spécificité des sélecteurs qu'elles contiennent. Pourquoi ça existe : dans les gros projets, les bibliothèques tierces, les styles de base et les surcharges se battent dans la cascade ; les couches permettent de dire une fois pour toutes « les utilitaires gagnent toujours sur les composants », sans gonfler la spécificité.",
      },
      {
        kind: "code",
        language: "css",
        title: "Organiser la cascade en couches",
        code: "/* Ordre de priorité déclaré une fois, en haut du fichier */\n@layer base, composants, utilitaires;\n\n@layer base {\n  p { line-height: 1.6; }\n}\n\n@layer composants {\n  .carte { border: 1px solid #ddd; }\n}\n\n@layer utilitaires {\n  /* Gagne sur les couches précédentes, même avec une spécificité égale */\n  .texte-centre { text-align: center; }\n}",
      },
      {
        kind: "text",
        text: "Comment ça fonctionne : les règles hors couche battent les règles en couche ; entre couches, l'ordre déclaré dans `@layer` tranche avant même la spécificité. À l'intérieur d'une même couche, la spécificité et l'ordre habituels s'appliquent. Les styles non « layerés » (comme la plupart des CSS existants) gardent la priorité sur les couches — point à connaître lors d'une migration progressive.",
      },
    ],
  },
  {
    id: "heritage",
    title: "Héritage",
    level: 3,
    intro:
      "Pourquoi les paragraphes sont bleus quand on colore le `body` — et quand ça ne marche pas.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : certaines propriétés (typographie, couleur de texte…) se transmettent automatiquement des parents aux enfants, d'autres (marges, bordures, fonds…) ne s'héritent pas. Pourquoi ça existe : sans héritage, il faudrait répéter `font-family` sur chaque élément — l'héritage permet de définir la typographie une fois sur `body` et de la voir s'appliquer partout.",
      },
      {
        kind: "code",
        language: "css",
        title: "Héritage et mots-clés de contrôle",
        code: "body {\n  font-family: system-ui, sans-serif;  /* hérité par tout le contenu */\n  color: #222;                        /* hérité aussi */\n  margin: 0;                          /* PAS hérité : chaque élément garde sa marge */\n}\n\n/* Forcer ou bloquer l'héritage explicitement */\na {\n  color: inherit;   /* reprend la couleur du parent (les liens ont leur bleu par défaut) */\n}\n.badge {\n  all: unset;       /* réinitialise toutes les propriétés : table rase */\n}",
      },
      {
        kind: "fields",
        title: "Les mots-clés de contrôle",
        fields: [
          {
            label: "`inherit`",
            value:
              "Force la propriété à prendre la valeur calculée du parent, même si elle ne s'hérite pas normalement. Utile pour les liens (`color: inherit`) ou les `box-sizing`.",
          },
          {
            label: "`initial`",
            value:
              "Réapplique la valeur initiale définie par la spécification CSS (pas celle du navigateur ni du parent). Exemple : `display: initial` vaut `inline` pour tous les éléments.",
          },
          {
            label: "`unset`",
            value:
              "Se comporte comme `inherit` si la propriété est héritable, comme `initial` sinon. Un « reset » intelligent.",
          },
          {
            label: "`revert`",
            value:
              "Annule les styles d'auteur et revient au style du navigateur (user agent). Pratique pour « désappliquer » un framework sur une zone précise.",
          },
        ],
      },
    ],
  },
  {
    id: "modele-boite",
    title: "Le modèle de boîte",
    level: 3,
    intro:
      "Chaque élément est une boîte rectangulaire en quatre couches. Tout le dimensionnement en découle.",
    blocks: [
      {
        kind: "diagram",
        title: "Les quatre couches, de l'intérieur vers l'extérieur",
        lines: [
          "  ┌──────────────── margin ────────────────┐",
          "  │  ┌──────────── border ────────────┐  │",
          "  │  │  ┌──────── padding ─────────┐  │  │",
          "  │  │  │                          │  │  │",
          "  │  │  │        CONTENT           │  │  │",
          "  │  │  │   (texte, image…)        │  │  │",
          "  │  │  │                          │  │  │",
          "  │  │  └──────────────────────────┘  │  │",
          "  │  └────────────────────────────────┘  │",
          "  └──────────────────────────────────────┘",
          "",
          "  Largeur totale = margin + border + padding + content",
        ],
      },
      {
        kind: "fields",
        title: "Les quatre couches",
        fields: [
          {
            label: "`content` — le contenu",
            value:
              "La zone du texte ou de l'image. `width` et `height` s'appliquent à cette zone… sauf si `box-sizing` dit le contraire (voir ci-dessous).",
          },
          {
            label: "`padding` — la marge intérieure",
            value:
              "L'espace entre le contenu et la bordure, de la même couleur que le fond de l'élément. `padding: 1rem` ajoute 1rem des quatre côtés. Il augmente la taille totale de la boîte (sauf en `border-box`).",
          },
          {
            label: "`border` — la bordure",
            value:
              "Le trait autour du padding : `border: 2px solid #333`. Elle aussi augmente la taille totale en mode par défaut.",
          },
          {
            label: "`margin` — la marge extérieure",
            value:
              "L'espace entre la boîte et ses voisines, toujours transparent. `margin: 0 auto` est l'idiome classique pour centrer horizontalement un bloc de largeur fixe.",
          },
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "box-sizing : le réglage qui change tout",
        code: "/* Comportement par défaut (content-box) :\n   width: 300px + padding 20px×2 + border 2px×2 = 344px réels ! */\n.boite {\n  width: 300px;\n  padding: 20px;\n  border: 2px solid #333;\n}\n\n/* border-box : width INCLUT padding et border → 300px réels.\n   C'est le comportement intuitif : appliquez-le globalement. */\n*, *::before, *::after {\n  box-sizing: border-box;\n}",
      },
      {
        kind: "text",
        text: "Pourquoi `border-box` est devenu le standard : avec `content-box` (la valeur historique par défaut), ajouter du padding à une boîte de `width: 50%` la fait dépasser de son conteneur — source classique de débordements mystérieux. En `border-box`, la largeur déclarée est la largeur réelle, padding et bordure inclus. Presque tous les frameworks et resets modernes l'appliquent globalement.",
      },
    ],
  },
  {
    id: "fusion-marges",
    title: "La fusion des marges",
    level: 3,
    intro:
      "Le cas limite le plus surprenant du modèle de boîte : deux marges qui n'en font qu'une.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : quand deux marges verticales se touchent (entre deux blocs empilés, ou entre un parent et son premier/dernier enfant), elles fusionnent en une seule marge égale à la plus grande des deux — elles ne s'additionnent pas. Pourquoi ça existe : pour la typographie — l'espace entre deux paragraphes reste `1rem` et non `2rem`, ce qui donne un rythme vertical régulier sans calcul mental.",
      },
      {
        kind: "code",
        language: "css",
        title: "Fusion entre blocs voisins",
        code: "h2 { margin-bottom: 2rem; }\np  { margin-top: 1rem; }\n/* Distance réelle entre le h2 et le p : 2rem (la plus grande),\n   PAS 3rem. Les deux marges ont fusionné. */",
      },
      {
        kind: "code",
        language: "css",
        title: "Fusion parent-enfant (le piège classique)",
        code: "<!-- Le margin-top de l'enfant « traverse » le parent :\n     c'est le parent entier qui semble descendre. -->\n<div class=\"carte\">\n  <h3 style=\"margin-top: 2rem;\">Titre</h3>\n</div>\n\n/* Solutions : */\n.carte { overflow: auto; }      /* crée un contexte qui bloque la fusion */\n.carte { padding-top: 1px; }    /* un padding, même minuscule, sépare les marges */\n.carte { display: flow-root; }  /* la solution moderne et explicite */",
      },
      {
        kind: "text",
        text: "Quand ça ne fusionne pas : les marges des éléments en Flexbox ou Grid ne fusionnent jamais, ni celles des éléments flottants ou positionnés en absolu. Si la fusion vous gêne systématiquement, c'est souvent le signe que Flexbox ou Grid serait plus adapté que des blocs empilés avec des marges.",
      },
    ],
  },
  {
    id: "flux-block-inline",
    title: "Flux normal : block vs inline",
    level: 3,
    intro:
      "Le comportement par défaut des éléments avant toute mise en page : deux modes d'affichage fondamentaux.",
    blocks: [
      {
        kind: "fields",
        title: "Les deux modes de la propriété display",
        fields: [
          {
            label: "`block` — `div`, `p`, `h1`, `section`…",
            value:
              "En une phrase : occupe toute la largeur disponible et commence sur une nouvelle ligne. Pourquoi : c'est la structure verticale naturelle d'un document (titres, paragraphes, sections s'empilent). On peut lui donner `width`, `height`, `margin` et `padding` dans les quatre directions.",
          },
          {
            label: "`inline` — `span`, `a`, `strong`, `em`…",
            value:
              "En une phrase : s'insère dans le flux du texte, sur la même ligne. Pourquoi : pour styler des fragments à l'intérieur d'un paragraphe (un lien, un mot en gras). Limite importante : `width`, `height`, `margin-top` et `margin-bottom` sont ignorés — seule la dimension horizontale compte.",
          },
          {
            label: "`inline-block` — le compromis",
            value:
              "En une phrase : se comporte comme `inline` (reste sur la ligne) mais accepte `width`, `height` et les marges verticales comme `block`. Pourquoi : historiquement utilisé pour aligner des « blocs » horizontalement (menus, boutons) avant Flexbox. Reste utile pour des éléments en ligne dimensionnés (badges, pastilles).",
          },
          {
            label: "`none`",
            value:
              "En une phrase : l'élément est complètement retiré du rendu (il ne prend aucune place). Pourquoi : pour masquer/afficher des éléments en JavaScript ou selon le contexte. À distinguer de `visibility: hidden`, qui masque l'élément mais conserve son espace.",
          },
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Centrer un bloc, aligner des éléments en ligne",
        code: "/* Centrer horizontalement un bloc de largeur limitée */\n.conteneur {\n  width: min(60rem, 90%);  /* 60rem max, 90% sur petit écran */\n  margin-inline: auto;      /* marges auto gauche/droite → centré */\n}\n\n/* Transformer des liens en « boutons » en ligne */\nnav a {\n  display: inline-block;  /* reste sur la ligne MAIS accepte padding et height */\n  padding: 0.5rem 1rem;\n}",
      },
    ],
  },
  {
    id: "positionnement",
    title: "Positionnement",
    level: 3,
    intro:
      "Sortir un élément du flux normal pour le placer précisément : les cinq valeurs de `position`.",
    blocks: [
      {
        kind: "fields",
        title: "Les cinq positionnements",
        fields: [
          {
            label: "`static` (défaut)",
            value:
              "En une phrase : l'élément suit le flux normal, `top`/`left` sont ignorés. Pourquoi le connaître : c'est la valeur à laquelle on « revient » pour annuler un positionnement, et la référence pour comprendre les autres.",
          },
          {
            label: "`relative`",
            value:
              "En une phrase : l'élément reste dans le flux, mais est décalé visuellement de sa position normale via `top`/`right`/`bottom`/`left`. Pourquoi : deux usages — micro-ajustements visuels, et surtout servir de repère pour un enfant en `absolute` (un parent `relative` devient le cadre de référence). L'espace d'origine reste réservé.",
          },
          {
            label: "`absolute`",
            value:
              "En une phrase : l'élément sort du flux et se place par rapport à son ancêtre positionné le plus proche (le premier parent non `static`). Pourquoi : pour superposer des éléments (badge sur une icône, menu déroulant sous un bouton). S'il n'y a aucun ancêtre positionné, la référence est la page elle-même.",
          },
          {
            label: "`fixed`",
            value:
              "En une phrase : comme `absolute`, mais la référence est la fenêtre du navigateur — l'élément reste visible pendant le défilement. Pourquoi : barres de navigation persistantes, boutons « retour en haut », modales. Attention mobile : un élément fixe peut masquer du contenu sur petit écran.",
          },
          {
            label: "`sticky`",
            value:
              "En une phrase : hybride — l'élément suit le flux normal jusqu'à atteindre un seuil (`top: 0`), puis se comporte comme `fixed` à l'intérieur de son parent. Pourquoi : en-têtes de tableau ou barres d'outils qui « collent » en haut pendant le scroll, sans JavaScript. Erreur fréquente : `sticky` ne fonctionne pas si un ancêtre a `overflow: hidden`.",
          },
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Le duo classique : parent relative, enfant absolute",
        code: ".carte {\n  position: relative;  /* devient le repère de positionnement */\n}\n\n.carte .badge {\n  position: absolute;\n  top: 0.75rem;      /* 0.75rem depuis le haut DE LA CARTE */\n  right: 0.75rem;    /* 0.75rem depuis la droite DE LA CARTE */\n}",
      },
      {
        kind: "text",
        text: "Bonne pratique : utilisez le positionnement pour la superposition, pas pour la mise en page générale. Construire toute une page en `absolute` donne un layout fragile qui casse au moindre changement de contenu — Flexbox et Grid sont faits pour la mise en page, `position` pour les exceptions.",
      },
    ],
  },
  {
    id: "z-index",
    title: "z-index et contextes d'empilement",
    level: 3,
    intro:
      "Pourquoi `z-index: 9999` ne suffit parfois pas : l'ordre de superposition obéit à des règles strictes.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : `z-index` contrôle l'ordre de superposition des éléments positionnés, mais uniquement à l'intérieur de leur contexte d'empilement — un élément ne peut jamais passer devant un élément d'un contexte « supérieur », quel que soit son `z-index`. Pourquoi ça existe : sans cette règle, chaque menu déroulant ou modale d'une page complexe deviendrait un concours de `z-index` ingérable.",
      },
      {
        kind: "code",
        language: "css",
        title: "Le piège du contexte d'empilement",
        code: "/* .modale a z-index: 100, mais son parent .panneau crée un\n   contexte d'empilement avec z-index: 1 : la modale restera\n   DERRIÈRE tout élément hors du panneau avec z-index: 2. */\n.panneau {\n  position: relative;\n  z-index: 1;            /* ← crée un contexte d'empilement */\n}\n.modale {\n  position: absolute;\n  z-index: 100;          /* ← ne vaut que DANS le contexte du panneau */\n}",
      },
      {
        kind: "list",
        items: [
          "Ce qui crée un contexte d'empilement : `position` + `z-index` différent de `auto`, mais aussi `opacity` < 1, `transform`, `filter`, `will-change` — d'où des surprises quand on anime un élément.",
          "`z-index` ne s'applique qu'aux éléments positionnés (non `static`) et aux enfants directs de conteneurs flex/grid.",
          "Bonne pratique : centralisez vos `z-index` en custom properties (`--z-header`, `--z-modale`) avec une échelle documentée, plutôt que des `9999` dispersés.",
          "Règle de débogage : si un `z-index` semble ignoré, cherchez le contexte d'empilement parent dans les DevTools (l'onglet Éléments l'indique).",
        ],
      },
    ],
  },
  {
    id: "flexbox-introduction",
    title: "Flexbox : introduction",
    level: 3,
    intro:
      "Le système de mise en page unidimensionnel : aligner et répartir des éléments le long d'un axe.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : Flexbox dispose des éléments le long d'un axe (horizontal ou vertical) en gérant automatiquement leur alignement, leur répartition et leur enroulement. Pourquoi ça existe : avant Flexbox, centrer verticalement un élément ou répartir trois colonnes à égale distance demandait des astuces fragiles (tableaux détournés, `float`, marges négatives). Flexbox a été conçu exactement pour ces cas : barres de navigation, rangées de cartes, centrage.",
      },
      {
        kind: "diagram",
        title: "Les deux axes de Flexbox",
        lines: [
          "  Axe principal (main axis) ──────────────────►",
          "  ┌────────┐  ┌────────┐  ┌────────┐",
          "  │ item 1 │  │ item 2 │  │ item 3 │",
          "  └────────┘  └────────┘  └────────┘",
          "       ▲",
          "       │ Axe transversal (cross axis) : align-items",
          "       │",
          "  justify-content agit sur l'axe PRINCIPAL,",
          "  align-items sur l'axe TRANSVERSAL.",
          "  flex-direction: column inverse les deux rôles.",
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Le centrage parfait, enfin simple",
        code: ".centreur {\n  display: flex;\n  justify-content: center;  /* centre sur l'axe principal */\n  align-items: center;      /* centre sur l'axe transversal */\n  min-height: 100vh;\n}",
      },
      {
        kind: "text",
        text: "Vocabulaire : le conteneur (`display: flex`) est le parent, les items sont ses enfants directs. Les propriétés se répartissent entre les deux — mettre `justify-content` sur un item ne fait rien, erreur très fréquente chez les débutants.",
      },
    ],
  },
  {
    id: "flexbox-conteneur",
    title: "Flexbox : propriétés du conteneur",
    level: 3,
    intro:
      "Les réglages du parent : direction, alignement, répartition, enroulement.",
    blocks: [
      {
        kind: "fields",
        title: "Propriétés du conteneur flex",
        fields: [
          {
            label: "`display: flex`",
            value:
              "Transforme l'élément en conteneur flex : ses enfants directs deviennent des items flexibles disposés en ligne par défaut. `inline-flex` fait la même chose en restant dans le flux du texte.",
          },
          {
            label: "`flex-direction: row | column`",
            value:
              "Définit l'axe principal : `row` (horizontal, défaut), `column` (vertical), plus les variantes inversées `row-reverse` et `column-reverse`. Changer la direction inverse les rôles de `justify-content` et `align-items`.",
          },
          {
            label: "`justify-content`",
            value:
              "Répartit les items le long de l'axe principal : `flex-start`, `center`, `flex-end`, `space-between` (espaces entre les items), `space-around`, `space-evenly`, et `gap` pour un espacement fixe. `space-between` est l'idiome des barres de navigation (logo à gauche, liens à droite).",
          },
          {
            label: "`align-items`",
            value:
              "Aligne les items le long de l'axe transversal : `stretch` (défaut — les items remplissent la hauteur), `center`, `flex-start`, `flex-end`, `baseline` (aligne sur la ligne de base du texte, utile pour des éléments de tailles de police différentes).",
          },
          {
            label: "`flex-wrap: wrap`",
            value:
              "Autorise les items à passer à la ligne suivante quand ils débordent, au lieu de s'écraser. Indispensable pour les grilles de cartes responsives : `flex-wrap: wrap` + `gap` remplace la plupart des anciens systèmes de grille.",
          },
          {
            label: "`gap`",
            value:
              "Définit l'espacement entre les items (et entre les lignes), sans marges parasites sur les bords — contrairement aux marges, `gap` ne crée pas d'espace avant le premier ni après le dernier item. Fonctionne aussi en Grid.",
          },
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Barre de navigation et rangée de cartes",
        code: "/* Navigation : logo à gauche, liens à droite, centrés verticalement */\n.nav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem 2rem;\n}\n\n/* Rangée de cartes responsive qui s'enroule */\n.cartes {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1.5rem;\n}\n.cartes > * {\n  flex: 1 1 18rem;  /* grandit, rétrécit, base de 18rem */\n}",
      },
    ],
  },
  {
    id: "flexbox-items",
    title: "Flexbox : propriétés des items",
    level: 3,
    intro:
      "Les réglages des enfants : comment chaque item grandit, rétrécit et s'aligne.",
    blocks: [
      {
        kind: "fields",
        title: "Propriétés des items flex",
        fields: [
          {
            label: "`flex-grow`",
            value:
              "En une phrase : la part d'espace libre que l'item absorbe (`0` = n'en prend pas, `1` = en prend à parts égales avec ses frères). Pourquoi : pour dire « cet élément remplit l'espace restant » — l'idiome `flex-grow: 1` sur le contenu entre un header et un footer de hauteur fixe.",
          },
          {
            label: "`flex-shrink`",
            value:
              "En une phrase : la propension de l'item à rétrécir quand l'espace manque (`1` par défaut). Pourquoi : mettre `flex-shrink: 0` sur un logo ou une icône empêche qu'ils s'écrasent quand le conteneur est trop étroit.",
          },
          {
            label: "`flex-basis`",
            value:
              "En une phrase : la taille de départ de l'item avant répartition de l'espace libre (`auto`, une longueur, ou un pourcentage). Pourquoi : c'est la « taille idéale » à partir de laquelle grow/shrink ajustent. `flex-basis: 18rem` + `flex-wrap: wrap` = grille responsive naturelle.",
          },
          {
            label: "`flex` (raccourci)",
            value:
              "Combine les trois : `flex: <grow> <shrink> <basis>`. `flex: 1` signifie `1 1 0` — l'item grandit et rétrécit à partir de zéro, donc tous les items se partagent l'espace à égalité. Le raccourci le plus utilisé, à connaître par cœur.",
          },
          {
            label: "`align-self`",
            value:
              "Surcharge `align-items` pour un seul item (`align-self: flex-end` descend un item en bas pendant que les autres restent centrés). Utile pour les exceptions ponctuelles.",
          },
          {
            label: "`order`",
            value:
              "Change l'ordre visuel des items sans toucher au HTML (`order: -1` passe devant). Attention accessibilité : l'ordre de tabulation clavier suit toujours l'ordre du DOM, pas l'ordre visuel — un `order` qui contredit la logique de lecture désoriente les utilisateurs au clavier.",
          },
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Layout classique : sidebar + contenu fluide",
        code: ".page {\n  display: flex;\n  gap: 2rem;\n}\n.sidebar {\n  flex: 0 0 16rem;   /* ne grandit pas, ne rétrécit pas : 16rem fixes */\n}\n.contenu {\n  flex: 1;            /* prend tout l'espace restant */\n  min-width: 0;       /* permet au contenu de rétrécir (textes longs, tableaux) */\n}",
      },
      {
        kind: "text",
        text: "Erreur fréquente : un item flex qui refuse de rétrécir et fait déborder le conteneur. Cause : la taille minimale implicite des items flex (`min-width: auto`) empêche le rétrécissement sous la taille du contenu. Le remède est `min-width: 0` (ou `overflow: hidden`) sur l'item — un classique à connaître.",
      },
    ],
  },
  {
    id: "flexbox-vs-grid",
    title: "Flexbox vs Grid : que choisir",
    level: 3,
    intro:
      "Les deux systèmes se complètent : la règle simple pour choisir.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Flexbox", "Grid"],
        rows: [
          ["Dimension", "1D : une ligne OU une colonne à la fois", "2D : lignes ET colonnes simultanément"],
          ["Idéal pour", "Barres de nav, rangées de boutons, centrage, listes", "Pages complètes, galeries, tableaux de bord, holy grail"],
          ["Le contenu décide", "Oui : les items s'ajustent selon leur contenu", "Non : la grille est définie d'abord, le contenu s'y place"],
          ["Enroulement", "`flex-wrap` : les lignes suivantes sont indépendantes", "Grille explicite : les lignes/colonnes sont alignées entre elles"],
        ],
      },
      {
        kind: "text",
        text: "La règle pratique : Flexbox quand vous disposez des éléments le long d'un axe (une rangée de cartes, une barre d'outils) ; Grid quand vous avez besoin d'un alignement sur deux axes (une page avec header/sidebar/contenu, une galerie aux rangées alignées). En pratique, les deux se combinent : une page en Grid dont les cartes internes utilisent Flexbox.",
      },
    ],
  },
  {
    id: "grid-bases",
    title: "Grid : les bases",
    level: 3,
    intro:
      "Définir une grille explicite : colonnes, lignes, espacements, unités fractionnaires.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : CSS Grid définit une grille bidimensionnelle (colonnes et lignes) dans laquelle les éléments se placent, avec un alignement strict sur les deux axes. Pourquoi ça existe : les mises en page de pages complètes (en-tête, barre latérale, contenu, pied de page) étaient historiquement bricolées avec des tableaux ou des floats ; Grid les exprime directement.",
      },
      {
        kind: "fields",
        title: "Propriétés fondamentales",
        fields: [
          {
            label: "`display: grid`",
            value:
              "Transforme l'élément en conteneur de grille : ses enfants directs deviennent des items placés dans la grille.",
          },
          {
            label: "`grid-template-columns` / `grid-template-rows`",
            value:
              "Définissent les pistes (tracks) : `grid-template-columns: 16rem 1fr 16rem` crée trois colonnes (deux fixes, une flexible). L'unité `fr` (fraction) répartit l'espace restant : `1fr 2fr` donne deux fois plus d'espace à la seconde colonne.",
          },
          {
            label: "`repeat()` et `minmax()`",
            value:
              "`repeat(3, 1fr)` évite de répéter `1fr 1fr 1fr`. `minmax(12rem, 1fr)` définit une piste d'au moins 12rem et extensible : la base des grilles responsives.",
          },
          {
            label: "`gap`",
            value:
              "Espacement entre les pistes (`gap`, `row-gap`, `column-gap`). Comme en Flexbox, sans marges parasites sur les bords.",
          },
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Le « holy grail » : header, sidebar, contenu, footer",
        code: ".page {\n  display: grid;\n  grid-template-columns: 14rem 1fr;\n  grid-template-rows: auto 1fr auto;\n  grid-template-areas:\n    \"header  header\"\n    \"sidebar contenu\"\n    \"footer  footer\";\n  min-height: 100vh;\n}\n.header  { grid-area: header; }\n.sidebar { grid-area: sidebar; }\n.contenu { grid-area: contenu; }\n.footer  { grid-area: footer; }",
      },
      {
        kind: "code",
        language: "css",
        title: "Galerie responsive sans media queries",
        code: ".galerie {\n  display: grid;\n  /* Autant de colonnes de 16rem min que possible, extensibles */\n  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));\n  gap: 1rem;\n}\n/* auto-fill crée les pistes selon la largeur disponible :\n   la galerie s'adapte seule, sans aucun breakpoint. */",
      },
    ],
  },
  {
    id: "grid-placement",
    title: "Grid : placement des items",
    level: 3,
    intro:
      "Placer les éléments précisément : zones nommées, lignes numérotées, chevauchement.",
    blocks: [
      {
        kind: "fields",
        title: "Techniques de placement",
        fields: [
          {
            label: "Zones nommées (`grid-area`)",
            value:
              "En une phrase : `grid-template-areas` dessine la grille en ASCII et chaque item se place avec `grid-area: nom`. Pourquoi : c'est la forme la plus lisible — la mise en page se lit comme un plan. Quand : pour les layouts de page stables (header/sidebar/contenu).",
          },
          {
            label: "Lignes numérotées",
            value:
              "En une phrase : `grid-column: 1 / 3` place l'item de la ligne 1 à la ligne 3 (donc sur 2 colonnes). Pourquoi : pour les placements précis sans nommer toutes les zones. Les lignes peuvent aussi être nommées (`[debut] 1fr [fin]`) pour plus de clarté.",
          },
          {
            label: "`span`",
            value:
              "En une phrase : `grid-column: span 2` fait occuper deux pistes à l'item, où qu'il soit. Pourquoi : pour les éléments « vedette » (une carte deux fois plus large) dans une grille automatique.",
          },
          {
            label: "Chevauchement",
            value:
              "En une phrase : deux items placés sur les mêmes pistes se superposent (l'ordre du DOM et `z-index` tranchent). Pourquoi : pour des effets de superposition (texte sur image, badges) sans sortir du flux Grid avec `absolute`.",
          },
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Placement par lignes et chevauchement",
        code: ".grille {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n}\n\n/* La carte vedette occupe 2 colonnes */\n.vedette {\n  grid-column: span 2;\n}\n\n/* Superposition : image et légende sur la même zone */\n.figure img,\n.figure figcaption {\n  grid-column: 1 / -1;  /* -1 = dernière ligne */\n  grid-row: 1;\n}\n.figure figcaption {\n  align-self: end;      /* légende calée en bas de l'image */\n}",
      },
    ],
  },
  {
    id: "unites-mesure",
    title: "Unités de mesure",
    level: 3,
    intro:
      "Absolues ou relatives : choisir la bonne unité au bon endroit.",
    blocks: [
      {
        kind: "table",
        headers: ["Unité", "Signification", "Quand l'utiliser"],
        rows: [
          ["`px`", "Pixels CSS (indépendants de l'écran)", "Bordures, ombres, détails fins qui ne doivent pas changer d'échelle"],
          ["`rem`", "Multiple de la taille de police racine (`html`)", "Tailles de police, espacements : respecte les préférences utilisateur"],
          ["`em`", "Multiple de la taille de police de l'élément lui-même", "Espacements proportionnels au texte local (padding d'un bouton)"],
          ["`%`", "Pourcentage du parent (largeur pour width, etc.)", "Largeurs fluides (`width: 100%`, `max-width: 90%`)"],
          ["`vw` / `vh`", "1% de la largeur/hauteur de la fenêtre", "Sections plein écran (`min-height: 100vh`), typographie fluide"],
          ["`ch`", "Largeur du caractère « 0 » de la police", "Longueur de ligne lisible (`max-width: 65ch`)"],
        ],
      },
      {
        kind: "text",
        text: "En une phrase : privilégiez `rem` pour la typographie et les espacements — contrairement au `px`, ils suivent la taille de police que l'utilisateur a configurée dans son navigateur (accessibilité). Pourquoi ça existe : un utilisateur malvoyant qui agrandit la police par défaut s'attend à ce que tout le site suive ; des espacements en `px` fixes cassent cette promesse.",
      },
      {
        kind: "code",
        language: "css",
        title: "Échelle typographique en rem + clamp()",
        code: "html {\n  font-size: 100%;  /* respecte le réglage du navigateur (souvent 16px) */\n}\n\nh1 {\n  /* Taille fluide : min 1.75rem, idéale 4vw + 1rem, max 3rem */\n  font-size: clamp(1.75rem, 4vw + 1rem, 3rem);\n}\n\np {\n  max-width: 65ch;  /* ~65 caractères par ligne : confort de lecture */\n}",
      },
      {
        kind: "text",
        text: "Erreur fréquente : `font-size: 62.5%` sur `html` pour « simplifier » (`1rem = 10px`). Cette astuce casse le respect des préférences utilisateur et complique la maintenance — les navigateurs et `clamp()` offrent aujourd'hui de meilleures solutions.",
      },
    ],
  },
  {
    id: "media-queries",
    title: "Media queries",
    level: 3,
    intro:
      "Appliquer des styles selon les caractéristiques de l'appareil : la base du responsive.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : une media query applique un bloc de CSS uniquement quand une condition est vraie (largeur d'écran, préférence de contraste, orientation…). Pourquoi ça existe : un même HTML doit s'afficher sur un téléphone de 360px et un écran de 2560px — les media queries permettent d'adapter la mise en page sans dupliquer le contenu.",
      },
      {
        kind: "code",
        language: "css",
        title: "Syntaxe et breakpoints",
        code: "/* Navigation horizontale sur grand écran… */\n.nav ul {\n  display: flex;\n  gap: 2rem;\n}\n\n/* …qui devient verticale sous 48rem (768px) */\n@media (max-width: 48rem) {\n  .nav ul {\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n}\n\n/* Préférences utilisateur : contraste, mouvement, thème */\n@media (prefers-color-scheme: dark) {\n  body { background: #111; color: #eee; }\n}",
      },
      {
        kind: "fields",
        title: "Conditions utiles",
        fields: [
          {
            label: "`(max-width: …)` / `(min-width: …)`",
            value:
              "Les plus courantes : adaptent la mise en page selon la largeur. On les combine avec `and` : `@media (min-width: 48rem) and (max-width: 80rem)`. Préférez les `rem` aux `px` pour les breakpoints : ils suivent le zoom texte de l'utilisateur.",
          },
          {
            label: "`(prefers-color-scheme: dark)`",
            value:
              "Détecte le thème sombre du système : permet un mode sombre « gratuit » qui suit les réglages de l'utilisateur, sans interrupteur à coder.",
          },
          {
            label: "`(prefers-reduced-motion: reduce)`",
            value:
              "Détecte la demande de réduction des animations (accessibilité) : on y désactive les animations non essentielles. Détail dans la section dédiée.",
          },
          {
            label: "`(orientation: portrait)`",
            value:
              "Distingue portrait et paysage : utile pour les mises en page qui dépendent vraiment de l'orientation (galeries, lecteurs vidéo).",
          },
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : définissez vos breakpoints à partir du contenu (« à partir de quelle largeur cette mise en page casse-t-elle ? »), pas à partir d'appareils précis. Les tailles d'écran sont trop variées pour viser des modèles ; un breakpoint « contenu » reste valable quand les appareils changent.",
      },
    ],
  },
  {
    id: "mobile-first",
    title: "Mobile-first",
    level: 3,
    intro:
      "La stratégie d'écriture recommandée : concevoir pour le petit écran d'abord.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : le mobile-first consiste à écrire les styles de base pour les petits écrans, puis à ajouter des media queries `min-width` pour enrichir la mise en page sur les écrans plus larges. Pourquoi : le CSS de base (une colonne, navigation simplifiée) est le plus simple ; on ajoute de la complexité au lieu d'en retirer. Bonus performance : les téléphones — souvent moins puissants — ne téléchargent et n'appliquent que le CSS dont ils ont besoin.",
      },
      {
        kind: "code",
        language: "css",
        title: "Mobile-first en pratique",
        code: "/* BASE (mobile) : une seule colonne, tout s'empile */\n.cartes {\n  display: grid;\n  gap: 1rem;\n}\n\n/* Tablette : 2 colonnes */\n@media (min-width: 40rem) {\n  .cartes { grid-template-columns: repeat(2, 1fr); }\n}\n\n/* Bureau : 4 colonnes */\n@media (min-width: 64rem) {\n  .cartes { grid-template-columns: repeat(4, 1fr); }\n}",
      },
      {
        kind: "text",
        text: "L'approche inverse (desktop-first avec `max-width`) reste valide pour adapter un site existant conçu pour le bureau. Mais pour un nouveau projet, le mobile-first donne un code plus simple : les media queries n'ajoutent que des améliorations, jamais des annulations de styles complexes.",
      },
    ],
  },
  {
    id: "responsive-images",
    title: "Images responsives",
    level: 3,
    intro:
      "Empêcher les images de déborder ou de déformer la mise en page.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "La règle universelle",
        code: "img {\n  max-width: 100%;  /* ne dépasse jamais son conteneur */\n  height: auto;     /* garde les proportions d'origine */\n  display: block;   /* supprime l'espace parasite sous l'image */\n}",
      },
      {
        kind: "text",
        text: "Pourquoi ces trois lignes : une image est un élément en ligne (`inline`) par défaut — d'où un petit espace sous elle (la ligne de base du texte) que `display: block` supprime. Sans `max-width: 100%`, une image plus large que son conteneur déborde et casse la mise en page mobile. C'est l'une des premières règles à mettre dans tout projet.",
      },
      {
        kind: "fields",
        title: "Aller plus loin",
        fields: [
          {
            label: "`object-fit: cover`",
            value:
              "Remplit un cadre de dimensions fixes sans déformer l'image (recadrée si besoin) : l'équivalent CSS de « remplir le cadre » pour les vignettes et bannières aux proportions strictes.",
          },
          {
            label: "`aspect-ratio: 16 / 9`",
            value:
              "Impose un ratio largeur/hauteur à un conteneur : réserve l'espace avant le chargement de l'image et évite les sauts de mise en page (CLS).",
          },
          {
            label: "`srcset` (côté HTML)",
            value:
              "L'attribut HTML `srcset` permet au navigateur de choisir la résolution d'image adaptée à l'écran : une petite image sur téléphone, une grande sur écran haute densité. Le CSS gère l'affichage, le HTML gère le choix du fichier.",
          },
        ],
      },
    ],
  },
  {
    id: "custom-properties",
    title: "Custom properties (variables CSS)",
    level: 3,
    intro:
      "Stocker des valeurs réutilisables : couleurs, espacements, thèmes.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : les custom properties (`--ma-couleur: blue`) stockent des valeurs réutilisables via `var(--ma-couleur)`, modifiables dynamiquement et héritées en cascade. Pourquoi ça existe : pour centraliser les décisions de design (palette, espacements, rayons) en un seul endroit — changer la couleur primaire du site devient une modification d'une ligne.",
      },
      {
        kind: "code",
        language: "css",
        title: "Design tokens et thème sombre",
        code: ":root {\n  --couleur-primaire: #1a73e8;\n  --couleur-texte: #1f1f1f;\n  --fond: #ffffff;\n  --espacement: 1rem;\n  --rayon: 8px;\n}\n\n.bouton {\n  background: var(--couleur-primaire);\n  padding: calc(var(--espacement) * 0.75) var(--espacement);\n  border-radius: var(--rayon);\n}\n\n/* Thème sombre : on ne redéfinit QUE les variables */\n@media (prefers-color-scheme: dark) {\n  :root {\n    --couleur-texte: #e8e8e8;\n    --fond: #121212;\n  }\n}",
      },
      {
        kind: "fields",
        title: "Points clés",
        fields: [
          {
            label: "`var(--x, fallback)`",
            value:
              "Le second argument est une valeur de secours si la variable n'est pas définie : `color: var(--accent, blue)`. Indispensable pour des composants réutilisables dans des contextes variés.",
          },
          {
            label: "Portée et cascade",
            value:
              "Contrairement aux variables Sass (résolues à la compilation), les custom properties sont vivantes : elles suivent la cascade et l'héritage. Redéfinir `--accent` sur un composant ne change que lui et ses enfants — parfait pour les variantes.",
          },
          {
            label: "Modifiables en JavaScript",
            value:
              "`element.style.setProperty('--accent', 'red')` change la variable à l'exécution : c'est le pont entre JS et CSS pour les thèmes, les curseurs de réglage, les animations pilotées.",
          },
          {
            label: "`calc()`",
            value:
              "Permet des calculs entre unités différentes : `width: calc(100% - 2rem)`. Les espaces autour des opérateurs sont obligatoires.",
          },
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : nommez les variables par leur rôle (`--couleur-primaire`, `--texte-muted`) plutôt que par leur valeur (`--bleu`) — quand le « bleu » devient vert lors d'une refonte, le nom reste juste.",
      },
    ],
  },
  {
    id: "typographie",
    title: "Typographie",
    level: 3,
    intro:
      "Le texte est l'essentiel du web : polices, tailles, interlignes, lisibilité.",
    blocks: [
      {
        kind: "fields",
        title: "Propriétés typographiques essentielles",
        fields: [
          {
            label: "`font-family`",
            value:
              "En une phrase : la pile de polices, de la préférée au repli générique (`font-family: \"Inter\", system-ui, sans-serif`). Pourquoi : la police souhaitée n'est pas toujours installée — la pile garantit un rendu correct partout. `system-ui` utilise la police native du système : gratuite, rapide, familière à l'utilisateur.",
          },
          {
            label: "`font-size`",
            value:
              "En `rem` de préférence (voir Unités). Échelle type : base `1rem`, petit `0.875rem`, titres `1.5rem`→`3rem` avec `clamp()` pour le fluide.",
          },
          {
            label: "`line-height`",
            value:
              "En une phrase : la hauteur de ligne, sans unité de préférence (`line-height: 1.6` = 1,6× la taille de police). Pourquoi : c'est le réglage qui a le plus d'impact sur la lisibilité — un texte dense (`1.2`) fatigue, un texte aéré (`1.5`–`1.7`) se lit. Sans unité, il s'adapte automatiquement si la taille de police change.",
          },
          {
            label: "`font-weight`",
            value:
              "`400` (normal), `700` (gras), ou les valeurs intermédiaires avec les polices variables. N'utilisez que les graisses réellement chargées : demander un `600` non chargé force le navigateur à simuler le gras (faux-gras, rendu médiocre).",
          },
          {
            label: "`letter-spacing` / `text-transform`",
            value:
              "`letter-spacing` espace les lettres (titres en majuscules) ; `text-transform: uppercase` met en capitales côté présentation — le HTML garde la casse d'origine, ce qui préserve la copie et les lecteurs d'écran.",
          },
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Base typographique saine",
        code: "body {\n  font-family: system-ui, -apple-system, \"Segoe UI\", sans-serif;\n  font-size: 1rem;\n  line-height: 1.6;\n  color: #1f1f1f;\n}\n\nh1, h2, h3 {\n  line-height: 1.2;      /* titres plus resserrés que le texte courant */\n  letter-spacing: -0.01em;\n  text-wrap: balance;    /* équilibre les lignes des titres */\n}\n\np {\n  max-width: 65ch;\n  text-wrap: pretty;       /* évite les mots isolés en fin de paragraphe */\n}",
      },
      {
        kind: "text",
        text: "Charger des polices web (`@font-face` ou Google Fonts) : chaque graisse pèse des dizaines de kilo-octets — limitez-vous aux graisses utilisées et utilisez `font-display: swap` pour afficher immédiatement un repli en attendant le chargement, plutôt qu'un texte invisible.",
      },
    ],
  },
  {
    id: "couleurs",
    title: "Couleurs",
    level: 3,
    intro:
      "Les formats de couleur CSS et comment construire une palette cohérente.",
    blocks: [
      {
        kind: "fields",
        title: "Formats de couleur",
        fields: [
          {
            label: "Hexadécimal — `#1a73e8`",
            value:
              "En une phrase : trois paires de chiffres hexadécimaux pour rouge, vert, bleu. Pourquoi : le format le plus courant, compact et copié depuis tous les outils de design. `#fff` est le raccourci de `#ffffff`.",
          },
          {
            label: "`rgb()` / `rgba()`",
            value:
              "En une phrase : rouge, vert, bleu de 0 à 255, plus un canal alpha optionnel pour la transparence (`rgb(26 115 232 / 0.5)`). Pourquoi : la syntaxe moderne espace/slash rend l'alpha lisible ; c'est le format à préférer pour les couleurs semi-transparentes.",
          },
          {
            label: "`hsl()`",
            value:
              "En une phrase : teinte (0–360°), saturation, luminosité (`hsl(210 80% 55%)`). Pourquoi : c'est le format le plus intuitif pour construire une palette — pour une variante plus claire ou plus sombre, on ajuste juste la luminosité en gardant la même teinte.",
          },
          {
            label: "Mots-clés et `currentColor`",
            value:
              "`red`, `transparent`… et surtout `currentColor`, qui vaut la `color` de l'élément : `border-color: currentColor` fait suivre la bordure à la couleur du texte automatiquement.",
          },
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Palette construite en HSL",
        code: ":root {\n  --teinte: 210;  /* bleu */\n  --primaire: hsl(var(--teinte) 80% 55%);\n  --primaire-clair: hsl(var(--teinte) 80% 70%);\n  --primaire-sombre: hsl(var(--teinte) 80% 40%);\n}\n/* Changer --teinte re-teinte toute la palette :\n   la puissance de HSL + custom properties. */",
      },
      {
        kind: "text",
        text: "Accessibilité : le contraste entre texte et fond doit être suffisant pour rester lisible (les recommandations WCAG visent un ratio d'au moins 4,5:1 pour le texte courant). Vérifiez vos combinaisons avec un vérificateur de contraste — un beau gris clair sur fond blanc est souvent illisible.",
      },
    ],
  },
  {
    id: "fonds-degrades",
    title: "Fonds et dégradés",
    level: 3,
    intro:
      "Aller au-delà de la couleur unie : images de fond et dégradés en pur CSS.",
    blocks: [
      {
        kind: "fields",
        title: "Propriétés de fond",
        fields: [
          {
            label: "`background-color`",
            value:
              "La couleur de fond, peinte sous tout le reste. Toujours définir une couleur de fond même avec une image : si l'image ne charge pas, le texte reste lisible.",
          },
          {
            label: "`background-image: url(…)`",
            value:
              "Affiche une image en fond. Combinée à `background-size: cover` (remplit en recadrant) et `background-position: center`, elle crée des bannières robustes.",
          },
          {
            label: "`linear-gradient()`",
            value:
              "En une phrase : un dégradé est traité par CSS comme une image — utilisable partout où `background-image` est acceptée. Pourquoi : des dégradés sans aucun fichier image, redimensionnables et légers. `linear-gradient(135deg, #667eea, #764ba2)` va d'une couleur à l'autre en diagonale.",
          },
          {
            label: "`radial-gradient()`",
            value:
              "Dégradé circulaire ou elliptique depuis un centre : pour les halos, les vignettages, les reflets. Les deux types se superposent en les séparant par des virgules.",
          },
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Bannière avec dégradé et superposition de texte",
        code: ".hero {\n  background:\n    linear-gradient(to bottom, rgb(0 0 0 / 0.2), rgb(0 0 0 / 0.7)),\n    url(\"banniere.jpg\") center / cover;\n  color: white;\n  padding: 6rem 2rem;\n}\n/* Le dégradé sombre par-dessus l'image garantit\n   la lisibilité du texte blanc, quelle que soit la photo. */",
      },
    ],
  },
  {
    id: "bordures-ombres",
    title: "Bordures et ombres",
    level: 3,
    intro:
      "Délimiter et donner de la profondeur : les finitions visuelles.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Bordures, coins arrondis, ombres",
        code: ".carte {\n  border: 1px solid #e0e0e0;   /* largeur style couleur */\n  border-radius: 12px;          /* coins arrondis */\n  /* Ombre : décalage-x décalage-y flou étalement couleur */\n  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);\n}\n\n/* Bouton « pilule » : rayon à 50% de la hauteur */\n.bouton-rond {\n  border-radius: 999px;\n  padding: 0.75rem 2rem;\n}",
      },
      {
        kind: "fields",
        title: "À savoir",
        fields: [
          {
            label: "`border-radius`",
            value:
              "Arrondit les coins. `50%` sur un carré donne un cercle parfait (avatars, pastilles). `999px` donne une « pilule » quelle que soit la hauteur.",
          },
          {
            label: "`box-shadow`",
            value:
              "Crée une ombre portée : les quatre valeurs sont le décalage horizontal, le décalage vertical, le flou et la couleur (l'étalement est optionnel). Plusieurs ombres se séparent par des virgules. Une ombre subtile (`0 2px 8px rgb(0 0 0 / 0.08)`) donne de la profondeur ; une ombre forte attire l'attention (états surélevés).",
          },
          {
            label: "`outline`",
            value:
              "Comme une bordure, mais hors du modèle de boîte (ne décale pas la mise en page). Son usage principal : les indicateurs de focus accessibles (`:focus-visible`). Ne pas confondre avec `border`.",
          },
        ],
      },
      {
        kind: "text",
        text: "Erreur fréquente : utiliser `box-shadow` pour simuler une bordure épaisse (`0 0 0 3px blue`). Ça fonctionne visuellement, mais l'ombre ne prend pas de place dans le layout — au survol, l'élément ne « bouge » pas, ce qui est justement l'avantage. Retenez simplement que ce n'est pas une vraie bordure (elle ne suit pas `border-radius` de la même façon dans les vieux navigateurs et ignore `border-style`).",
      },
    ],
  },
  {
    id: "transitions",
    title: "Transitions",
    level: 3,
    intro:
      "Animer le passage d'un état à un autre : la porte d'entrée des animations CSS.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : une transition anime automatiquement le changement d'une propriété entre deux états (repos et `:hover`, par exemple) sur une durée donnée. Pourquoi ça existe : sans transition, un changement de couleur au survol est instantané et brutal ; avec `transition: background 0.2s`, il devient un fondu fluide qui donne une impression de qualité.",
      },
      {
        kind: "code",
        language: "css",
        title: "Transition de base",
        code: ".bouton {\n  background: #1a73e8;\n  transform: scale(1);\n  /* propriété durée courbe-de-vitesse */\n  transition: background 0.25s ease, transform 0.25s ease;\n}\n\n.bouton:hover {\n  background: #1558b0;\n  transform: scale(1.05);\n}\n/* La transition se déclare sur l'ÉTAT DE REPOS, pas sur :hover :\n   ainsi l'animation joue dans les deux sens (aller ET retour). */",
      },
      {
        kind: "fields",
        title: "Réglages",
        fields: [
          {
            label: "Durée",
            value:
              "En secondes ou millisecondes (`0.25s`, `250ms`). Repère : 150–300ms pour les micro-interactions (survols), jusqu'à 500ms pour les panneaux. Au-delà, l'interface paraît lente.",
          },
          {
            label: "Courbe (`timing-function`)",
            value:
              "`ease` (démarrage et fin en douceur, le défaut), `linear` (vitesse constante — pour les rotations continues), `ease-out` (démarrage rapide, fin douce — idéal pour les apparitions).",
          },
          {
            label: "`transition-delay`",
            value:
              "Retarde le démarrage : utile pour des animations en cascade (chaque item d'une liste démarre 50ms après le précédent).",
          },
        ],
      },
      {
        kind: "text",
        text: "Limite : les transitions ne s'appliquent qu'entre deux valeurs numériques interpolables. On ne peut pas « transitionner » vers ou depuis `display: none` ni `height: auto` — pour les ouvertures/fermetures de panneaux, on anime `max-height`, `opacity` ou `transform`, ou on utilise les animations `@keyframes`.",
      },
    ],
  },
  {
    id: "animations-keyframes",
    title: "Animations @keyframes",
    level: 3,
    intro:
      "Des animations autonomes en plusieurs étapes, sans JavaScript.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : `@keyframes` décrit les étapes d'une animation (de `from` à `to`, ou en pourcentages) que la propriété `animation` joue automatiquement, en boucle ou une fois. Pourquoi ça existe : les transitions ne gèrent que le passage entre deux états déclenchés par l'utilisateur ; les keyframes permettent des animations autonomes et multi-étapes (chargement, pulsation, entrée en scène).",
      },
      {
        kind: "code",
        language: "css",
        title: "Indicateur de chargement et apparition",
        code: "/* Rotation continue d'un spinner */\n@keyframes rotation {\n  to { transform: rotate(360deg); }\n}\n.spinner {\n  width: 2rem;\n  height: 2rem;\n  border: 3px solid #ddd;\n  border-top-color: #1a73e8;\n  border-radius: 50%;\n  animation: rotation 0.8s linear infinite;\n}\n\n/* Apparition en fondu + montée */\n@keyframes apparition {\n  from { opacity: 0; transform: translateY(1rem); }\n  to   { opacity: 1; transform: translateY(0); }\n}\n.carte {\n  animation: apparition 0.4s ease-out;\n}",
      },
      {
        kind: "fields",
        title: "Le raccourci `animation`",
        fields: [
          {
            label: "`animation-name`",
            value: "Le nom du bloc `@keyframes` à jouer.",
          },
          {
            label: "`animation-duration`",
            value: "La durée d'un cycle (`0.8s`).",
          },
          {
            label: "`animation-timing-function`",
            value: "La courbe de vitesse (`linear` pour une rotation régulière).",
          },
          {
            label: "`animation-iteration-count`",
            value: "`infinite` pour boucler sans fin, ou un nombre de cycles.",
          },
          {
            label: "`animation-fill-mode`",
            value:
              "`backwards` applique l'état `from` pendant le délai, `forwards` conserve l'état `to` à la fin — évite les « sauts » visuels.",
          },
        ],
      },
    ],
  },
  {
    id: "prefers-reduced-motion",
    title: "Respecter prefers-reduced-motion",
    level: 3,
    intro:
      "L'accessibilité des animations : une obligation professionnelle, pas une option.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : la media query `prefers-reduced-motion: reduce` détecte les utilisateurs ayant demandé la réduction des animations (vertiges, troubles vestibulaires, TDAH) et impose de désactiver les animations non essentielles. Pourquoi c'est important : une animation décorative peut provoquer nausées ou migraines — respecter ce réglage, c'est respecter l'utilisateur.",
      },
      {
        kind: "code",
        language: "css",
        title: "Le garde-fou à mettre dans chaque projet",
        code: "@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.01ms !important;\n  }\n\n  html {\n    scroll-behavior: auto;  /* pas de défilement animé */\n  }\n}\n/* Les animations deviennent quasi instantanées :\n   l'état final s'affiche sans mouvement. */",
      },
      {
        kind: "text",
        text: "Bonne pratique : concevez d'abord sans animation (le contenu doit être utilisable tel quel), puis ajoutez les animations comme une amélioration. Testez votre site avec la réduction de mouvement activée dans votre système : tout doit rester fonctionnel et lisible.",
      },
    ],
  },
  {
    id: "transform",
    title: "Transform : déplacer sans casser le layout",
    level: 3,
    intro:
      "Déplacer, pivoter, zoomer un élément sans perturber ses voisins.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : `transform` modifie la représentation visuelle d'un élément (translation, rotation, échelle) sans affecter la mise en page — l'espace d'origine reste réservé et les voisins ne bougent pas. Pourquoi c'est précieux : c'est le moyen le plus performant d'animer (le navigateur peut utiliser le GPU), contrairement à l'animation de `top`/`left`/`width` qui recalcule toute la mise en page à chaque image.",
      },
      {
        kind: "code",
        language: "css",
        title: "Les quatre transformations",
        code: ".element {\n  transform: translate(2rem, 1rem);  /* déplace de 2rem → et 1rem ↓ */\n  transform: scale(1.2);             /* agrandit ×1.2 depuis le centre */\n  transform: rotate(45deg);          /* pivote de 45 degrés */\n  transform: translateX(50%) scale(1.1);  /* combinables */\n}\n\n/* Centrage absolu robuste, sans connaître les dimensions */\n.centre-absolu {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}",
      },
      {
        kind: "fields",
        title: "Performance : quoi animer",
        fields: [
          {
            label: "À privilégier : `transform` et `opacity`",
            value:
              "Ces deux propriétés sont « compositées » : le navigateur les anime sans recalculer la mise en page ni repeindre — c'est le chemin le plus fluide, même sur mobile.",
          },
          {
            label: "À éviter en animation : `width`, `height`, `top`, `left`, `margin`",
            value:
              "Chaque image force un recalcul de la mise en page (reflow) puis un repeint (repaint) : sur une liste ou une page chargée, l'animation saccade. Si vous animez la taille, préférez `transform: scale()`.",
          },
          {
            label: "`will-change` : avec prudence",
            value:
              "Indique au navigateur qu'une propriété va être animée (`will-change: transform`) pour qu'il optimise à l'avance. À n'utiliser que sur les éléments réellement animés et à retirer après : en abuser consomme de la mémoire pour rien.",
          },
        ],
      },
    ],
  },
  {
    id: "bem",
    title: "BEM : nommer pour durer",
    level: 3,
    intro:
      "Une convention de nommage qui rend les classes explicites et les conflits rares.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : BEM (Block, Element, Modifier) est une convention de nommage où chaque classe décrit ce qu'elle est : `.menu` (bloc), `.menu__item` (élément du bloc), `.menu__item--actif` (variante). Pourquoi ça existe : dans un projet sans convention, on ne sait plus ce que fait `.titre-bleu-grand` ni où elle s'applique ; BEM rend la relation entre le HTML et le CSS lisible et les noms uniques par construction.",
      },
      {
        kind: "code",
        language: "css",
        title: "BEM en pratique",
        code: "<!-- Bloc : carte (autonome, réutilisable) -->\n<article class=\"carte carte--vedette\">\n  <!-- Éléments : parties de la carte -->\n  <h3 class=\"carte__titre\">Titre</h3>\n  <p class=\"carte__texte\">Contenu…</p>\n  <a class=\"carte__lien\" href=\"#\">Lire plus</a>\n</article>\n\n<style>\n.carte { border: 1px solid #ddd; border-radius: 8px; }\n.carte__titre { font-size: 1.25rem; margin: 0; }\n/* Modificateur : variante du bloc */\n.carte--vedette { border-color: #1a73e8; }\n</style>",
      },
      {
        kind: "fields",
        title: "Les trois concepts",
        fields: [
          {
            label: "Bloc — `.carte`",
            value:
              "Un composant autonome et réutilisable (carte, menu, bouton). Il ne dépend pas de son contexte : on peut le déplacer dans la page sans casser son style.",
          },
          {
            label: "Élément — `.carte__titre`",
            value:
              "Une partie du bloc, séparée par `__`. Un élément n'a de sens qu'à l'intérieur de son bloc — on ne réutilise pas `.carte__titre` hors d'une `.carte`.",
          },
          {
            label: "Modificateur — `.carte--vedette`",
            value:
              "Une variante, séparée par `--`. Il s'ajoute au bloc ou à l'élément (`class=\"carte carte--vedette\"`) pour en modifier l'apparence sans dupliquer le style de base.",
          },
        ],
      },
      {
        kind: "text",
        text: "Pourquoi BEM aide la cascade : chaque classe est unique et de spécificité basse `(0,1,0)` — plus besoin de sélecteurs longs pour éviter les collisions. Limite : les noms deviennent verbeux (`.formulaire__groupe-champ--erreur`), et la discipline doit être collective pour rester cohérente. C'est une convention d'équipe, pas une obligation technique.",
      },
    ],
  },
  {
    id: "architectures-comparaison",
    title: "Architectures CSS : panorama",
    level: 3,
    intro:
      "Plusieurs façons d'organiser le CSS à grande échelle — présentées factuellement, sans verdict absolu.",
    blocks: [
      {
        kind: "table",
        headers: ["Approche", "Principe", "Forces", "Limites"],
        rows: [
          [
            "BEM / conventions de nommage",
            "Classes sémantiques uniques par composant",
            "CSS pur, pas d'outil requis, prévisible",
            "Verbeux, repose sur la discipline d'équipe",
          ],
          [
            "CSS Modules",
            "Chaque fichier CSS est scopé à son composant (classes renommées automatiquement)",
            "Zéro collision, fonctionne avec tout bundler",
            "Lié à un système de build, noms illisibles en debug",
          ],
          [
            "Utilitaires (Tailwind…)",
            "Classes atomiques dans le HTML (`flex`, `p-4`, `text-lg`)",
            "Rapide à écrire, design system intégré, pas de CSS à nommer",
            "HTML verbeux, apprentissage du vocabulaire, styles dispersés",
          ],
          [
            "CSS-in-JS",
            "Styles écrits en JavaScript, scopés au composant",
            "Styles dynamiques faciles, co-localisation avec le composant",
            "Runtime JS, bundle plus lourd, hors du CSS standard",
          ],
          [
            "Cascade layers + custom properties",
            "CSS natif moderne : couches et variables",
            "Aucune dépendance, standard du web",
            "Demande de la rigueur, écosystème d'outils plus jeune",
          ],
        ],
      },
      {
        kind: "text",
        text: "Aucune de ces approches n'est universellement meilleure : le choix dépend de l'équipe, du framework, de la taille du projet et des contraintes de performance. Ce qui compte vraiment, c'est la cohérence — un projet qui mélange trois architectures sans règle est plus coûteux qu'un projet avec une architecture imparfaite mais uniforme. Pour apprendre CSS en profondeur, commencez par le CSS standard : toutes ces architectures ne sont que des organisations au-dessus des mêmes fondamentaux.",
      },
    ],
  },
  {
    id: "sass",
    title: "Sass / SCSS : le préprocesseur historique",
    level: 3,
    intro:
      "Ce qu'apporte un préprocesseur CSS — et ce que le CSS moderne a rattrapé.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : Sass est un langage qui étend CSS (imbrication, variables, mixins, fonctions) et se compile en CSS standard avant d'être servi au navigateur. Pourquoi ça existe : à une époque où CSS n'avait ni variables ni imbrication ni calculs, Sass comblait ces manques et structurait les grosses bases de code.",
      },
      {
        kind: "code",
        language: "scss",
        title: "SCSS : ce que ça apporte",
        code: "// Variables (aujourd'hui remplaçables par les custom properties)\n$couleur-primaire: #1a73e8;\n\n// Imbrication : la hiérarchie HTML se lit dans le CSS\n.carte {\n  border: 1px solid #ddd;\n\n  &__titre {           // le & reprend le sélecteur parent\n    font-size: 1.25rem;\n  }\n\n  &:hover {            // .carte:hover\n    border-color: $couleur-primaire;\n  }\n}\n\n// Mixin : bloc réutilisable avec paramètres\n@mixin texte-tronque {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.titre { @include texte-tronque; }",
      },
      {
        kind: "text",
        text: "Point important : le CSS moderne a rattrapé une grande partie de Sass — les custom properties remplacent les variables (en mieux : elles sont dynamiques), `calc()` fait les calculs, et l'imbrication native (`nesting`) est désormais supportée par les navigateurs récents. Sass reste pertinent pour ses fonctions avancées (manipulation de couleurs, boucles de génération) et l'énorme base de code existante, mais ce n'est plus un passage obligé pour un nouveau projet.",
      },
      {
        kind: "text",
        text: "Mise en garde sur l'imbrication : imbriquer trop profondément génère des sélecteurs longs et spécifiques (`.page .contenu .carte .carte__titre`), exactement ce que les bonnes pratiques déconseillent. Limitez l'imbrication à 2-3 niveaux et aux pseudo-classes/éléments (`&:hover`, `&::before`).",
      },
    ],
  },
  {
    id: "postcss",
    title: "PostCSS et Autoprefixer",
    level: 3,
    intro:
      "L'outil invisible qui rend votre CSS compatible sans effort.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : PostCSS est un outil qui transforme votre CSS via des plugins — le plus célèbre, Autoprefixer, ajoute automatiquement les préfixes vendeurs (`-webkit-`, `-moz-`) nécessaires aux navigateurs ciblés. Pourquoi ça existe : certaines propriétés récentes exigent encore des préfixes sur des navigateurs plus anciens ; les écrire à la main est fastidieux et source d'erreurs.",
      },
      {
        kind: "code",
        language: "css",
        title: "Autoprefixer : avant / après",
        code: "/* Vous écrivez : */\n.galerie {\n  display: grid;\n  user-select: none;\n}\n\n/* Autoprefixer génère selon vos navigateurs cibles : */\n.galerie {\n  display: grid;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n}",
      },
      {
        kind: "text",
        text: "Comment ça fonctionne : PostCSS s'intègre à votre bundler (Vite, webpack) et applique ses plugins à la compilation. Vous configurez une fois les navigateurs cibles (via `browserslist`, ex. « les 2 dernières versions »), et vous n'y pensez plus. La plupart des projets modernes l'utilisent sans le savoir — il est souvent inclus par défaut dans les templates Vite ou Create React App.",
      },
    ],
  },
  {
    id: "tailwind",
    title: "Tailwind CSS : l'approche utilitaire",
    level: 3,
    intro:
      "Comprendre le framework utilitaire le plus répandu — différences et cas d'usage, sans jugement.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : Tailwind est un framework qui fournit des classes utilitaires atomiques (`flex`, `p-4`, `text-center`, `bg-blue-600`) que l'on combine directement dans le HTML au lieu d'écrire du CSS personnalisé. Pourquoi ça existe : pour prototyper et construire des interfaces rapidement sans quitter le HTML, avec un design system (échelle d'espacements, palette, breakpoints) intégré et cohérent.",
      },
      {
        kind: "code",
        language: "html",
        title: "Le même bouton, en CSS classique et en Tailwind",
        code: "<!-- CSS classique : classe sémantique + feuille de style -->\n<button class=\"bouton-primaire\">Envoyer</button>\n\n<!-- Tailwind : utilitaires dans le HTML -->\n<button class=\"bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus-visible:outline-2\">\n  Envoyer\n</button>",
      },
      {
        kind: "fields",
        title: "Différences factuelles",
        fields: [
          {
            label: "Vitesse d'écriture",
            value:
              "Tailwind est rapide pour construire des interfaces standard : pas d'allers-retours entre HTML et CSS, pas de noms de classes à inventer. En contrepartie, le HTML devient verbeux et la lecture du « design » exige de connaître le vocabulaire des utilitaires.",
          },
          {
            label: "Cohérence du design",
            value:
              "L'échelle contrainte (espacements `1, 2, 4, 8…`, palette limitée) guide vers un design cohérent sans effort. En CSS classique, cette cohérence doit être construite (design tokens, custom properties).",
          },
          {
            label: "Personnalisation",
            value:
              "Les designs très sur-mesure ou les animations complexes finissent par exiger du CSS personnalisé de toute façon — Tailwind n'élimine pas le besoin de connaître CSS, il le déplace.",
          },
          {
            label: "Cas d'usage typiques",
            value:
              "Prototypes, tableaux de bord, sites marketing, équipes qui veulent une vélocité élevée avec un design system partagé. Moins adapté quand le HTML doit rester minimal (emails) ou quand le design est très artistique.",
          },
        ],
      },
      {
        kind: "text",
        text: "Point essentiel : Tailwind ne remplace pas l'apprentissage de CSS — il l'exige. Chaque utilitaire n'est qu'un nom mémorisé pour une propriété CSS (`p-4` = `padding: 1rem`). Sans comprendre le modèle de boîte, Flexbox ou la cascade, on produit du Tailwind qui « marche par accident » et casse dès que le design se complique. Apprenez CSS d'abord, Tailwind ensuite si le besoin s'en fait sentir.",
      },
    ],
  },
  {
    id: "debugging-devtools",
    title: "Déboguer du CSS avec les DevTools",
    level: 3,
    intro:
      "La méthode systématique pour comprendre pourquoi un style ne s'applique pas.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Inspecter l'élément fautif",
            detail:
              "Clic droit sur l'élément → « Inspecter ». Vérifiez d'abord que vous regardez le bon élément : avec du HTML imbriqué, on inspecte souvent le parent ou l'enfant par erreur.",
          },
          {
            title: "Lire l'onglet Styles de haut en bas",
            detail:
              "Les règles sont affichées par ordre de priorité décroissante. Les déclarations barrées ont perdu la cascade : la règle non barrée au-dessus est celle qui gagne. Si votre règle n'apparaît pas du tout, son sélecteur ne cible pas l'élément.",
          },
          {
            title: "Vérifier l'onglet Calculé",
            detail:
              "Il montre la valeur finale de chaque propriété après cascade, héritage et valeurs par défaut. Cliquez sur une propriété pour voir la chaîne complète des règles qui ont contribué — idéal pour traquer un héritage inattendu.",
          },
          {
            title: "Traquer le modèle de boîte",
            detail:
              "Le schéma box-model (dans Styles ou Calculé) affiche les dimensions réelles : un élément « trop grand » révèle souvent un padding ou une bordure oubliés, ou un `box-sizing` resté en `content-box`.",
          },
          {
            title: "Tester les états et le responsive",
            detail:
              "Le bouton `:hov` force `:hover`/`:focus` sans toucher la souris. Le mode responsive (`Ctrl+Maj+M`) teste les breakpoints. L'onglet Rendu permet de simuler `prefers-reduced-motion` et `prefers-color-scheme`.",
          },
          {
            title: "Isoler dans un cas minimal",
            detail:
              "Si le problème persiste, reproduisez-le avec le minimum de HTML/CSS (un fichier vide, quelques lignes). La moitié des bugs CSS disparaissent — et s'expliquent — pendant cette réduction.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Vérifiez les fautes de frappe en premier : `backgroud-color` est ignoré silencieusement, sans aucune erreur.",
          "Une règle qui ne s'applique « jamais » vient dans 90 % des cas d'un sélecteur qui ne cible pas le bon élément — pas d'un bug du navigateur.",
          "`!important` dans une bibliothèque tierce explique bien des résistances : l'onglet Styles l'affiche explicitement.",
          "Pensez au cache : un CSS qui « ne se met pas à jour » est souvent un fichier en cache — rechargement forcé (`Ctrl+F5`).",
        ],
      },
    ],
  },
  {
    id: "performance",
    title: "Performance CSS",
    level: 3,
    intro:
      "Ce qui coûte vraiment cher en CSS — et les mythes à oublier.",
    blocks: [
      {
        kind: "fields",
        title: "Les vrais coûts",
        fields: [
          {
            label: "Le recalcul de styles et le reflow",
            value:
              "En une phrase : chaque modification de style peut forcer le navigateur à recalculer la mise en page (reflow) puis à repeindre — le coût vient du volume et de la fréquence, pas d'un sélecteur isolé. Pourquoi : animer `width` sur 100 éléments à 60 images/seconde déclenche 6000 reflows par seconde ; animer `transform` sur les mêmes éléments n'en déclenche aucun.",
          },
          {
            label: "Les sélecteurs : le mythe à nuancer",
            value:
              "On lit parfois que les sélecteurs complexes « ralentissent » la page. En réalité, les moteurs modernes évaluent les sélecteurs de droite à gauche et très vite : sur une page normale, la différence entre `.bouton` et `nav ul li a` est négligeable. Le coût des sélecteurs ne devient mesurable que sur des documents énormes (des dizaines de milliers d'éléments). Privilégiez les sélecteurs courts pour la maintenabilité, pas pour la performance.",
          },
          {
            label: "Les propriétés coûteuses",
            value:
              "`box-shadow` avec un grand flou, `filter: blur()` et `backdrop-filter` sont coûteux à peindre — avec modération sur les éléments animés ou nombreux. `border-radius` et les dégradés sont en revanche bon marché.",
          },
          {
            label: "Le CSS bloquant le rendu",
            value:
              "Le navigateur attend la feuille de style avant d'afficher la page (pour éviter un flash de contenu non stylé). Une feuille énorme retarde donc le premier affichage : limitez le CSS critique, différez le reste, et évitez les `@import` en chaîne (chaque import est une requête séquentielle).",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Mesurez avant d'optimiser : l'onglet Performance des DevTools montre ce qui prend du temps (recalcul de styles, peinture, compositing).",
          "Évitez les `@import` dans le CSS livré : préférez plusieurs `<link>` ou un bundler qui concatène.",
          "Un fichier CSS minifié (espaces et commentaires retirés) se fait à la compilation — ne minifiez jamais à la main.",
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro:
      "Les habitudes qui distinguent un CSS maintenable d'un CSS qui pourrit.",
    blocks: [
      {
        kind: "list",
        items: [
          "`box-sizing: border-box` global dès le premier jour — le comportement intuitif par défaut.",
          "Nommez par le rôle, pas par l'apparence : `.alerte-erreur` plutôt que `.rouge-gras` — quand le design change, le nom reste juste.",
          "Une seule source de vérité pour les valeurs répétées : custom properties pour les couleurs, espacements et rayons.",
          "Spécificité basse et uniforme : des classes simples, pas d'ID pour styler, `!important` réservé aux utilitaires.",
          "Mobile-first : styles de base pour petit écran, `min-width` pour enrichir.",
          "Ne stylisez jamais sur les noms de balises seuls pour des composants — `.bouton`, pas `button` partout (sinon chaque bouton du site hérite du style, y compris ceux des formulaires tiers).",
          "Regroupez par section commentée et gardez un ordre logique : base, mise en page, composants, utilitaires.",
          "Supprimez le CSS mort : un sélecteur inutilisé est un piège pour le prochain développeur (les outils comme la couverture CSS des DevTools aident à le repérer).",
          "Testez au clavier (`:focus-visible`) et avec la réduction de mouvement dès le développement, pas à la fin.",
          "Commentez le « pourquoi », pas le « quoi » : `/* compense la hauteur du header fixe */` plutôt que `/* margin-top 80px */`.",
        ],
      },
    ],
  },
  {
    id: "erreurs-frequentes",
    title: "Erreurs fréquentes",
    level: 3,
    intro:
      "Les pièges classiques, avec le mauvais réflexe et la bonne approche.",
    blocks: [
      {
        kind: "fields",
        title: "Mauvais → Mieux",
        fields: [
          {
            label: "Centrer avec des marges magiques",
            value:
              "Mauvais : `margin-left: 237px` pour « à peu près centrer » — casse au premier changement de taille d'écran. Mieux : `margin-inline: auto` avec une largeur définie, ou Flexbox/Grid (`justify-content: center`). Le centrage doit être déclaratif, pas mesuré à l'œil.",
          },
          {
            label: "Empiler les `!important`",
            value:
              "Mauvais : ajouter `!important` à chaque règle qui « ne marche pas » — au bout de trois couches, plus rien n'est surchargeable proprement. Mieux : comprendre pourquoi la règle perd (DevTools → onglet Styles), puis réduire la spécificité adverse ou augmenter proprement la sienne avec une classe.",
          },
          {
            label: "Largeurs fixes partout",
            value:
              "Mauvais : `width: 1200px` sur le conteneur principal — barre de défilement horizontale sur mobile. Mieux : `width: min(75rem, 100% - 2rem)` — large mais jamais plus que l'écran, avec des marges de sécurité.",
          },
          {
            label: "Oublier les états interactifs",
            value:
              "Mauvais : styler uniquement l'état de repos d'un bouton. Mieux : systématiquement `:hover`, `:focus-visible` et `:disabled` — un bouton sans état de focus est inutilisable au clavier.",
          },
          {
            label: "Dupliquer au lieu de réutiliser",
            value:
              "Mauvais : copier-coller le même bloc d'ombres et de rayons dans dix classes. Mieux : une classe utilitaire (`.carte`) ou des custom properties partagées — une modification se fait en un point.",
          },
          {
            label: "Ignorer le HTML",
            value:
              "Mauvais : `<div class=\"titre\">` + `<div class=\"bouton\">` partout — aucun sens pour les lecteurs d'écran ni le SEO. Mieux : `<h2>`, `<button>`, `<nav>` : le bon élément HTML d'abord, le style ensuite. CSS ne répare pas un HTML non sémantique.",
          },
          {
            label: "Tester uniquement sur son écran",
            value:
              "Mauvais : « ça marche sur mon 27 pouces ». Mieux : mode responsive des DevTools dès le développement, test à 360px de large minimum, zoom texte à 200 % pour l'accessibilité.",
          },
        ],
      },
    ],
  },
  {
    id: "projets",
    title: "Projets réalistes",
    level: 3,
    intro:
      "Quatre projets progressifs pour pratiquer — pas de Todo App.",
    blocks: [
      {
        kind: "fields",
        title: "Progression de projets",
        fields: [
          {
            label: "1. Carte de profil responsive (débutant)",
            value:
              "Objectif : maîtriser le modèle de boîte et Flexbox. Prérequis : sélecteurs, modèle de boîte. Vous construisez : une carte avec avatar, nom, bio et boutons d'action, qui s'adapte du mobile au bureau. Concepts utilisés : `box-sizing`, Flexbox, `border-radius`, `box-shadow`, custom properties. Difficulté : faible — tout tient dans un fichier. Projet suivant : la landing page.",
          },
          {
            label: "2. Layout « holy grail » en Grid (intermédiaire)",
            value:
              "Objectif : construire une vraie structure de page. Prérequis : Grid, media queries. Vous construisez : header, navigation latérale, contenu principal, barre contextuelle et footer, avec une sidebar qui se replie en menu hamburger sur mobile. Concepts utilisés : `grid-template-areas`, `position: sticky`, media queries, mobile-first. Difficulté : moyenne — la version mobile demande de repenser la grille. Projet suivant : le clone de landing.",
          },
          {
            label: "3. Clone d'une landing page existante (intermédiaire+)",
            value:
              "Objectif : reproduire un design réel au pixel près. Prérequis : tout le niveau 2 + Flexbox/Grid. Vous construisez : la page d'accueil d'un produit que vous aimez (sans copier leurs assets : recréez les visuels en CSS pur). Concepts utilisés : tout — c'est l'exercice le plus formateur pour l'œil et la précision. Difficulté : moyenne à élevée selon la page choisie. Projet suivant : le mini design system.",
          },
          {
            label: "4. Mini design system (avancé, style production)",
            value:
              "Objectif : penser en système, pas en pages. Prérequis : custom properties, BEM ou modules, accessibilité. Vous construisez : boutons (5 variantes × 3 états), champs de formulaire avec erreurs, cartes, badges, alertes — documentés avec leurs règles d'usage, thème clair/sombre via custom properties, `prefers-reduced-motion` respecté. Concepts utilisés : architecture, design tokens, états `:focus-visible`, contraste. Difficulté : élevée — la cohérence est plus dure que le code. Compétence suivante : l'accessibilité (ARIA, navigation clavier).",
          },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro:
      "Les références fiables — documentation officielle d'abord.",
    blocks: [
      {
        kind: "list",
        items: [
          "MDN Web Docs — CSS : la référence complète et à jour, avec compatibilité navigateurs pour chaque propriété (https://developer.mozilla.org/fr/docs/Web/CSS).",
          "W3C — spécifications CSS : la source normative, pour trancher les cas limites (https://www.w3.org/Style/CSS/).",
          "web.dev — Learn CSS : cours structuré et moderne, du niveau débutant à avancé (https://web.dev/learn/css).",
          "Flexbox Froggy : jeu pour apprendre Flexbox en pratique (https://flexboxfroggy.com).",
          "Grid Garden : le pendant pour CSS Grid (https://cssgridgarden.com).",
          "CSS-Tricks — guides Flexbox et Grid : les antisèches visuelles les plus utilisées (https://css-tricks.com).",
        ],
      },
      {
        kind: "text",
        text: "Réflexe durable : pour toute propriété, le premier réflexe est la page MDN correspondante — elle indique la syntaxe exacte, les valeurs possibles et, crucialement, la compatibilité navigateurs. Les tutoriels de blog sont utiles pour les patterns, mais vérifiez toujours la syntaxe sur MDN.",
      },
    ],
  },
  {
    id: "etape-suivante",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "CSS n'est qu'une pièce du puzzle : les directions naturelles après les fondamentaux.",
    blocks: [
      {
        kind: "fields",
        title: "Prochaines étapes",
        fields: [
          {
            label: "JavaScript",
            value:
              "Le troisième pilier : manipuler les classes CSS depuis JS (`classList`), animer dynamiquement, construire des interfaces interactives. CSS décrit les états, JavaScript les déclenche.",
          },
          {
            label: "Accessibilité",
            value:
              "Aller au-delà de `:focus-visible` : contraste, navigation clavier complète, ARIA pour les composants complexes, tests aux lecteurs d'écran. Un CSS « avancé » est un CSS accessible.",
          },
          {
            label: "Responsive avancé",
            value:
              "Container queries (`@container`) : adapter un composant à la taille de son conteneur plutôt qu'à celle de la fenêtre — la prochaine étape logique après les media queries.",
          },
          {
            label: "Un framework CSS",
            value:
              "Tailwind pour l'approche utilitaire, ou approfondir Sass si vous maintenez une grosse base existante. Les deux supposent des fondamentaux CSS solides — vous les avez maintenant.",
          },
          {
            label: "Design",
            value:
              "Typographie avancée, théorie des couleurs, rythme vertical, systèmes de spacing : la frontière entre « CSS correct » et « beau site » est une compétence de design autant que de code.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le signe que vous maîtrisez CSS : vous débuggez un problème de mise en page en lisant la cascade dans les DevTools plutôt qu'en essayant des propriétés au hasard — et vos mises en page tiennent sur mobile du premier coup.",
      },
    ],
  },
];

import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du responsive design : du viewport aux container queries.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_RESPONSIVE: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est le responsive design et pourquoi c'est la façon standard de construire le web.",
    blocks: [
      {
        kind: "text",
        text: "Le responsive design adapte une interface à toutes les tailles d'écran : du mobile 360 px à l'écran 4K, via media queries, unités fluides et approche mobile-first. Une seule base de code, une seule URL, une mise en page qui se réorganise selon l'espace disponible.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est devenu la norme : une part majoritaire du trafic web est mobile, et les tailles d'écran ne cessent de se diversifier (téléphones, tablettes, pliables, desktops, TV). Maintenir une version mobile et une version desktop séparées double le travail et crée des divergences : le responsive résout le problème à la racine, dans le CSS.",
      },
      {
        kind: "text",
        text: "Une interface qui casse sur petit écran perd ses utilisateurs : le responsive n'est plus une option ni une cerise sur le gâteau, c'est la façon standard de construire — dès la première maquette, pas en rattrapage à la fin.",
      },
    ],
  },
  {
    id: "le-responsive-en-30-secondes",
    title: "Le responsive en 30 secondes",
    level: 1,
    intro:
      "Les six ingrédients, et l'ordre dans lequel ils interviennent.",
    blocks: [
      {
        kind: "diagram",
        title: "Le cycle d'adaptation d'une page",
        lines: [
          "Contenu HTML",
          "     │",
          "     ▼",
          "Viewport (meta) ── dit au mobile la vraie largeur",
          "     │",
          "     ▼",
          "Unités fluides (%, rem, vw, clamp) ── dimensions qui s'étirent",
          "     │",
          "     ▼",
          "Media queries ── règles selon la largeur",
          "     │",
          "     ▼",
          "Breakpoints ── seuils où la mise en page change",
          "     │",
          "     ▼",
          "Images adaptées (srcset) ── le bon poids par écran",
        ],
      },
      {
        kind: "text",
        text: "L'idée centrale : le contenu est fluide par défaut (il remplit l'espace), et les media queries n'interviennent qu'aux largeurs où la mise en page fluide ne suffit plus. On ne dessine pas trois sites : on dessine un continuum qui se réorganise.",
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
      "Les bases CSS sans lesquelles le responsive reste de la magie noire.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut maîtriser d'abord",
        fields: [
          {
            label: "HTML sémantique (`html`)",
            value:
              "Une structure propre (header, main, nav, sections) : le responsive réorganise le contenu, il ne le répare pas.",
          },
          {
            label: "CSS : le modèle de boîte (`css`)",
            value:
              "`box-sizing: border-box`, marges, paddings, `width` vs `max-width`. Sans ça, les débordements restent mystérieux.",
          },
          {
            label: "Flexbox (`flexbox`)",
            value:
              "L'outil principal des mises en page fluides : `flex-wrap`, `flex-grow`, alignements. La majorité des layouts responsives en dépendent.",
          },
          {
            label: "CSS Grid (`css-grid`)",
            value:
              "Les grilles bidimensionnelles : `repeat(auto-fit, minmax(...))` est la recette la plus puissante du responsive.",
          },
        ],
      },
    ],
  },
  {
    id: "meta-viewport",
    title: "La meta viewport",
    level: 2,
    intro:
      "Une ligne HTML sans laquelle rien ne fonctionne sur mobile.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "À placer dans le <head>",
        code: "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">",
      },
      {
        kind: "text",
        text: "Sans cette balise, les navigateurs mobiles simulent une fenêtre d'environ 980 px puis réduisent la page pour la faire tenir à l'écran : le site s'affiche minuscule et les media queries ne correspondent à rien d'utile. `width=device-width` dit au navigateur d'utiliser la vraie largeur de l'écran, `initial-scale=1` fixe le zoom initial à 100 %.",
      },
      {
        kind: "list",
        items: [
          "Premier diagnostic quand un site « n'est pas responsive sur mobile » : vérifier que cette balise existe.",
          "Ne jamais désactiver le zoom (`maximum-scale=1`, `user-scalable=no`) : c'est une barrière d'accessibilité pour les malvoyants.",
        ],
      },
    ],
  },
  {
    id: "unites-fluides",
    title: "Les unités fluides",
    level: 2,
    intro:
      "Remplacer les pixels fixes par des dimensions qui s'adaptent au contexte.",
    blocks: [
      {
        kind: "table",
        headers: ["Unité", "Référence", "Usage typique"],
        rows: [
          ["`%`", "L'élément parent", "Largeurs de colonnes, images qui remplissent leur conteneur"],
          ["`rem`", "La taille de police racine (`<html>`)", "Tailles de police, espacements : tout suit le réglage utilisateur"],
          ["`em`", "La taille de police de l'élément", "Espacements proportionnels au texte local"],
          ["`vw` / `vh`", "La fenêtre (viewport)", "Sections plein écran, typographie display"],
          ["`clamp()`", "Min / idéal / max", "La recette moderne : fluide mais borné"],
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Exemples",
        code: "img { max-width: 100%; height: auto; }\n.container { width: min(1100px, 90%); margin-inline: auto; }\nh1 { font-size: clamp(1.8rem, 4vw + 1rem, 3.5rem); }",
      },
      {
        kind: "text",
        text: "`max-width: 100%` sur les images est la règle la plus rentable du responsive : une image ne déborde plus jamais de son conteneur. `clamp()` mérite une attention particulière : il rend une taille fluide (`4vw`) tout en la bornant entre un minimum lisible et un maximum raisonnable.",
      },
    ],
  },
  {
    id: "media-queries",
    title: "Les media queries",
    level: 2,
    intro:
      "Appliquer des règles CSS différentes selon les caractéristiques de l'écran.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Syntaxe de base (mobile-first)",
        code: "/* Base : mobile, une colonne */\n.cards { display: grid; gap: 1rem; }\n\n/* À partir de 640px : deux colonnes */\n@media (min-width: 640px) {\n  .cards { grid-template-columns: repeat(2, 1fr); }\n}\n\n/* À partir de 1024px : trois colonnes */\n@media (min-width: 1024px) {\n  .cards { grid-template-columns: repeat(3, 1fr); }\n}",
      },
      {
        kind: "text",
        text: "En mobile-first, on écrit d'abord les styles du petit écran, puis on ajoute des règles avec `min-width` pour les écrans plus larges. Les styles se cumulent : chaque breakpoint n'ajoute que ce qui change. L'inverse (`max-width`, desktop-first) oblige à défaire des styles complexes pour le mobile — plus verbeux, plus fragile.",
      },
    ],
  },
  {
    id: "breakpoints",
    title: "Les breakpoints",
    level: 2,
    intro:
      "Choisir les largeurs où la mise en page change — selon le contenu, pas selon les appareils.",
    blocks: [
      {
        kind: "text",
        text: "Un breakpoint n'est pas « la largeur de l'iPhone » : c'est la largeur où votre mise en page commence à casser ou à respirer trop. La méthode : réduisez progressivement la fenêtre du navigateur et notez où le layout souffre — c'est là qu'un breakpoint est nécessaire.",
      },
      {
        kind: "code",
        language: "css",
        title: "Échelle de breakpoints courante",
        code: "/* Repères usuels (à ajuster selon votre contenu) */\n/* 640px  : grands mobiles / petites tablettes */\n/* 768px  : tablettes */\n/* 1024px : petits laptops */\n/* 1280px : desktops */\n/* 1536px : grands écrans */",
      },
      {
        kind: "text",
        text: "Moins de breakpoints vaut mieux que trop : chaque breakpoint est du CSS à maintenir et à tester. Trois à quatre seuils bien placés couvrent l'essentiel des cas.",
      },
    ],
  },
  {
    id: "mobile-first-en-pratique",
    title: "Mobile-first en pratique",
    level: 2,
    intro:
      "Concevoir pour la contrainte d'abord : ce que ça change concrètement.",
    blocks: [
      {
        kind: "list",
        items: [
          "Hiérarchie forcée : sur 360 px de large, on ne peut pas tout montrer — on est obligé de décider ce qui compte vraiment. Cette priorisation profite aussi au desktop.",
          "Performance par défaut : le mobile-first pousse à charger moins (images adaptées, CSS progressif), ce qui accélère aussi les connexions lentes sur desktop.",
          "CSS plus simple : on ajoute des règles en montant en largeur (`min-width`) au lieu d'annuler des règles complexes en descendant.",
          "Navigation : le menu burger n'est pas une punition mobile, c'est la reconnaissance qu'une barre de 8 liens ne tient pas sur 360 px.",
          "Tester d'abord à 360 px : si ça fonctionne là, l'élargissement est presque toujours plus facile que l'inverse.",
        ],
      },
    ],
  },
  {
    id: "images-responsives",
    title: "Les images responsives",
    level: 2,
    intro:
      "Servir la bonne taille d'image selon l'écran : performance et netteté.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "srcset + sizes",
        code: "<img\n  src=\"photo-800.jpg\"\n  srcset=\"photo-400.jpg 400w, photo-800.jpg 800w, photo-1600.jpg 1600w\"\n  sizes=\"(max-width: 640px) 100vw, 50vw\"\n  alt=\"Description de la photo\"\n  loading=\"lazy\">",
      },
      {
        kind: "text",
        text: "`srcset` propose plusieurs versions de l'image (ici par largeur en `w`), `sizes` dit au navigateur quelle largeur d'affichage prévoir selon le viewport : le navigateur choisit alors la version la plus adaptée, en tenant compte aussi de la densité de pixels. Résultat : un mobile ne télécharge pas l'image 1600 px du desktop.",
      },
      {
        kind: "list",
        items: [
          "`loading=\"lazy\"` : les images hors écran ne se chargent qu'au défilement — gain immédiat sur le temps de chargement initial.",
          "`decoding=\"async\"` : le décodage de l'image ne bloque pas le rendu.",
          "Toujours un `alt` pertinent : le responsive ne dispense pas de l'accessibilité.",
        ],
      },
    ],
  },
  {
    id: "typographie-fluide",
    title: "La typographie fluide",
    level: 2,
    intro:
      "Des tailles de texte qui grandissent avec l'écran, sans breakpoints.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Échelle fluide avec clamp()",
        code: ":root {\n  --step-0: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);\n  --step-1: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);\n  --step-2: clamp(1.75rem, 1.4rem + 1.75vw, 2.5rem);\n  --step-3: clamp(2.5rem, 1.8rem + 3.5vw, 4rem);\n}\nh1 { font-size: var(--step-3); }\np  { font-size: var(--step-0); }",
      },
      {
        kind: "text",
        text: "Chaque niveau de titre a une taille fluide bornée : lisible sur mobile, généreuse sur desktop, sans aucune media query. Les espacements suivent la même logique en `rem` : quand l'utilisateur augmente la taille de police de son navigateur, toute la mise en page suit.",
      },
    ],
  },
  {
    id: "tester-et-debugger",
    title: "Tester et debugger",
    level: 2,
    intro:
      "Vérifier le responsive sans posséder douze appareils.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Le mode responsive des DevTools",
            detail: "Dans Chrome/Firefox : `Ctrl+Maj+M` (ou Cmd+Maj+M) active la barre d'appareils. Testez 360 px, 768 px et 1280 px au minimum, plus le redimensionnement libre entre les deux.",
          },
          {
            title: "Chasser le défilement horizontal",
            detail: "Le symptôme n°1 du responsive cassé : une page qui défile horizontalement sur mobile. Cause typique : un élément plus large que le viewport (image sans `max-width: 100%`, `width: 100vw` avec scrollbar, mot trop long).",
          },
          {
            title: "Inspecter l'élément fautif",
            detail: "Dans les DevTools, survolez les éléments du DOM : celui dont la boîte dépasse du viewport est le coupable. Vérifiez sa largeur, ses marges et ses enfants.",
          },
          {
            title: "Tester sur un vrai appareil",
            detail: "L'émulateur ne reproduit ni le tactile réel, ni les performances réelles, ni les navigateurs mobiles exotiques. Au moins un test sur un vrai téléphone avant chaque mise en production.",
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
      "Intégrer le responsive au processus, pas en rattrapage.",
    blocks: [
      {
        kind: "list",
        items: [
          "Maquetter mobile d'abord : au moins un écran clé dessiné à 360 px avant de décliner le desktop.",
          "Définir les breakpoints dans des variables CSS ou un thème (pas de valeurs en dur dispersées dans le code).",
          "Tester à chaque feature, pas à la fin : le responsive cassé coûte dix fois plus cher à réparer en fin de projet.",
          "Automatiser : des captures d'écran aux largeurs clés dans la CI (Playwright, par exemple) détectent les régressions visuelles.",
          "Documenter les conventions : breakpoints, échelle typographique, grille — dans le design system de l'équipe.",
        ],
      },
    ],
  },
  {
    id: "erreurs-classiques",
    title: "Erreurs classiques",
    level: 2,
    intro:
      "Les fautes que tout le monde commet au début — et leur correction.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Oublier la meta viewport",
            value:
              "Symptôme : le site s'affiche minuscule sur mobile. Correction : ajouter la balise `meta viewport` dans le `<head>`.",
          },
          {
            label: "Pixels fixes partout",
            value:
              "Symptôme : des largeurs en `px` qui débordent sur petit écran. Correction : `%`, `rem`, `clamp()`, `max-width: 100%` sur les médias.",
          },
          {
            label: "Cacher du contenu au lieu de le réorganiser",
            value:
              "Symptôme : `display: none` massif sur mobile. Correction : réorganiser (ordre, accordéons, onglets) plutôt que supprimer — l'utilisateur mobile veut la même information.",
          },
          {
            label: "Texte illisible sans zoom",
            value:
              "Symptôme : corps de texte sous 16 px sur mobile. Correction : 16 px minimum pour le texte courant, échelle fluide pour les titres.",
          },
          {
            label: "Liens trop proches",
            value:
              "Symptôme : on tape à côté avec le pouce. Correction : zones tactiles généreuses et espacées, surtout dans les navigations.",
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
      "Trois exercices pour ancrer les réflexes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Rendre une page existante responsive",
            detail: "Prenez une page fixe : ajoutez la meta viewport, convertissez les largeurs en unités fluides, ajoutez deux breakpoints. Vérifiez qu'il n'y a plus de défilement horizontal à 360 px.",
          },
          {
            title: "Landing page mobile-first",
            detail: "Construisez une landing page en commençant par 360 px : hero, features en colonne, témoignages, footer. Ajoutez les breakpoints 768 px et 1024 px. Typographie en `clamp()`, images en `srcset`.",
          },
          {
            title: "Dashboard adaptatif",
            detail: "Un tableau de bord avec sidebar, cartes de stats et graphiques : sidebar qui devient menu burger, cartes en grille `auto-fit`, tableaux qui se transforment sur mobile.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "viewport-en-detail",
    title: "Le viewport en détail",
    level: 3,
    intro:
      "Ce que `device-width` signifie vraiment, et les subtilités mobiles.",
    blocks: [
      {
        kind: "text",
        text: "Le viewport CSS n'est pas la résolution physique de l'écran : un téléphone 1080 px de large peut avoir un viewport de 360 px CSS (ratio de 3). C'est le viewport CSS que les media queries interrogent — d'où l'importance de `width=device-width`.",
      },
      {
        kind: "text",
        text: "Subtilité : `100vh` sur mobile inclut parfois la barre d'adresse du navigateur, qui apparaît et disparaît au défilement — provoquant des sauts de mise en page. Les unités `svh` (small viewport), `lvh` (large) et `dvh` (dynamic) résolvent ce problème : `100dvh` suit la hauteur réelle visible en temps réel.",
      },
      {
        kind: "code",
        language: "css",
        title: "Hauteur plein écran fiable sur mobile",
        code: ".hero {\n  min-height: 100vh;   /* repli pour les anciens navigateurs */\n  min-height: 100dvh; /* suit la vraie hauteur visible */\n}",
      },
    ],
  },
  {
    id: "mobile-first-vs-desktop-first",
    title: "Mobile-first vs desktop-first",
    level: 3,
    intro:
      "Deux stratégies d'écriture des media queries, comparées factuellement.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Mobile-first (`min-width`)", "Desktop-first (`max-width`)"],
        rows: [
          ["Point de départ", "Le petit écran", "Le grand écran"],
          ["Ajout de règles", "On ajoute en montant en largeur", "On surcharge en descendant"],
          ["CSS mobile", "Léger par défaut", "Souvent alourdi d'annulations"],
          ["Performance mobile", "Le mobile ne charge que son CSS + les surcharges utiles", "Le mobile charge tout puis annule"],
          ["Quand l'utiliser", "Cas général, projets neufs", "Refonte d'un site desktop existant (transition)"],
        ],
      },
      {
        kind: "text",
        text: "Le mobile-first n'est pas un dogme esthétique : c'est une stratégie de cascade CSS. Partir du simple pour ajouter du complexe produit mécaniquement moins de code que partir du complexe pour le défaire.",
      },
    ],
  },
  {
    id: "syntaxe-media-queries",
    title: "Syntaxe complète des media queries",
    level: 3,
    intro:
      "Au-delà de `min-width` : la grammaire moderne.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Formes utiles",
        code: "/* Intervalle moderne (sans min-/max-) */\n@media (640px <= width <= 1024px) { ... }\n\n/* Combinaisons */\n@media (min-width: 768px) and (orientation: landscape) { ... }\n@media (min-width: 768px), (orientation: landscape) { ... }\n\n/* Négation */\n@media not (prefers-reduced-motion: reduce) { ... }",
      },
      {
        kind: "text",
        text: "La syntaxe d'intervalle (`640px <= width <= 1024px`) est plus lisible que la paire `min-width`/`max-width` et évite les erreurs de borne d'un pixel. `and` combine des conditions, la virgule exprime un « ou », `not` inverse.",
      },
    ],
  },
  {
    id: "media-features",
    title: "Les media features utiles",
    level: 3,
    intro:
      "Interroger bien plus que la largeur : orientation, densité, préférences utilisateur.",
    blocks: [
      {
        kind: "table",
        headers: ["Feature", "Ce qu'elle détecte", "Usage"],
        rows: [
          ["`width` / `height`", "Dimensions du viewport", "Le cas général des breakpoints"],
          ["`orientation`", "`portrait` ou `landscape`", "Réorganiser sur tablette pivotée"],
          ["`resolution`", "Densité de pixels (`2dppx`…)", "Servir des images haute définition"],
          ["`prefers-color-scheme`", "`light` / `dark`", "Thème sombre automatique"],
          ["`prefers-reduced-motion`", "`reduce`", "Désactiver les animations pour les utilisateurs sensibles"],
          ["`hover` / `pointer`", "Capacité de survol / finesse du pointeur", "Adapter les interactions tactiles vs souris"],
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Adapter aux capacités d'interaction",
        code: "/* Écrans tactiles : pas de survol, pointeur grossier */\n@media (hover: none) and (pointer: coarse) {\n  .tooltip:hover .tip { display: none; } /* le survol n'existe pas */\n  .btn { min-height: 48px; }              /* cibles généreuses */\n}",
      },
    ],
  },
  {
    id: "choisir-ses-breakpoints",
    title: "Choisir ses breakpoints",
    level: 3,
    intro:
      "La méthode rigoureuse : laisser le contenu décider.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Partir du contenu, pas des appareils",
            detail: "Ouvrez la page en pleine largeur desktop et réduisez lentement la fenêtre. Chaque fois que la mise en page « casse » (texte trop étiré, colonne trop étroite, chevauchement), notez la largeur : c'est un breakpoint naturel.",
          },
          {
            title: "Regrouper en 3-4 seuils",
            detail: "Les largeurs notées se regroupent généralement autour de quelques valeurs. Arrondissez à des seuils propres (640, 768, 1024, 1280) et vérifiez que chaque seuil correspond à un vrai changement de mise en page.",
          },
          {
            title: "Nommer, pas numéroter",
            detail: "Dans le code, utilisez des noms sémantiques (`--bp-tablet`, `--bp-desktop`) plutôt que des valeurs brutes : quand un seuil bouge, on le change à un seul endroit.",
          },
          {
            title: "Valider aux bornes",
            detail: "Testez juste en dessous et juste au-dessus de chaque breakpoint : c'est là que les bugs de « entre-deux » apparaissent (un pixel de trop, une règle qui ne s'applique pas).",
          },
        ],
      },
    ],
  },
  {
    id: "clamp-min-max",
    title: "`clamp()`, `min()`, `max()`",
    level: 3,
    intro:
      "Le trio qui remplace une grande partie des media queries.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Les trois fonctions",
        code: "/* clamp(MIN, IDÉAL, MAX) : fluide mais borné */\n.card { width: clamp(280px, 90%, 420px); }\n\n/* min() : la plus petite des valeurs */\n.container { width: min(1100px, 92%); }\n\n/* max() : la plus grande des valeurs */\n.hero { min-height: max(400px, 60vh); }",
      },
      {
        kind: "text",
        text: "`width: min(1100px, 92%)` signifie : 1100 px sur grand écran, 92 % du viewport sur petit — en une ligne, sans media query. Ces fonctions gèrent le dimensionnement continu ; les media queries restent pour les changements structurels (passer d'une à trois colonnes).",
      },
    ],
  },
  {
    id: "container-queries",
    title: "Les container queries",
    level: 3,
    intro:
      "Des media queries… pour un conteneur au lieu du viewport.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Un composant qui s'adapte à son parent",
        code: ".sidebar { container-type: inline-size; }\n\n.card { display: grid; gap: 1rem; }\n@container (min-width: 400px) {\n  .card { grid-template-columns: 120px 1fr; }\n}",
      },
      {
        kind: "text",
        text: "Le problème résolu : une carte affichée dans une sidebar étroite et dans un contenu large ne devrait pas dépendre de la largeur de l'écran, mais de la place dont elle dispose réellement. Avec `container-type: inline-size` sur le parent, `@container` adapte le composant à son conteneur — le composant devient vraiment réutilisable partout.",
      },
      {
        kind: "text",
        text: "Complément : les container query units (`cqw`, `cqh`) permettent des dimensions relatives au conteneur, comme `vw` mais locales. Supportées par tous les navigateurs modernes.",
      },
    ],
  },
  {
    id: "flexbox-responsive",
    title: "Flexbox responsive",
    level: 3,
    intro:
      "Le couteau suisse des mises en page fluides unidimensionnelles.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Recettes essentielles",
        code: "/* Lignes qui passent à la ligne automatiquement */\n.row { display: flex; flex-wrap: wrap; gap: 1rem; }\n\n/* Colonnes flexibles avec largeur minimale */\n.row > * { flex: 1 1 220px; } /* grandit, rétrécit, base 220px */\n\n/* Centrage robuste */\n.center { display: flex; align-items: center; justify-content: center; }",
      },
      {
        kind: "text",
        text: "`flex: 1 1 220px` est la recette la plus utile : chaque enfant fait au minimum 220 px, se partage l'espace disponible, et passe à la ligne quand il n'y a plus la place — une grille fluide sans media query. `flex-wrap: wrap` est ce qui rend flexbox responsive par nature.",
      },
    ],
  },
  {
    id: "grid-responsive",
    title: "CSS Grid responsive",
    level: 3,
    intro:
      "La recette la plus puissante du responsive : la grille qui se remplit seule.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "auto-fit + minmax : la grille magique",
        code: ".gallery {\n  display: grid;\n  gap: 1rem;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n}",
      },
      {
        kind: "text",
        text: "Cette seule déclaration crée une grille qui affiche autant de colonnes de 240 px minimum que l'espace le permet, les colonnes se partageant l'espace restant. Aucun breakpoint, aucune media query : de 1 colonne sur mobile à 5 sur grand écran, automatiquement.",
      },
      {
        kind: "text",
        text: "Variante : `auto-fill` garde des colonnes vides fantômes quand il manque d'éléments, `auto-fit` les replie. Pour des mises en page asymétriques (sidebar + contenu), combinez grid avec des media queries classiques.",
      },
    ],
  },
  {
    id: "srcset-sizes-detail",
    title: "`srcset` et `sizes` en détail",
    level: 3,
    intro:
      "Maîtriser la sélection d'image par le navigateur.",
    blocks: [
      {
        kind: "text",
        text: "Deux syntaxes de `srcset` : les descripteurs de largeur (`400w`) pour les images fluides, et les descripteurs de densité (`2x`) pour les images à taille fixe (logos, icônes). Avec `w`, `sizes` est obligatoire : il indique la largeur d'affichage prévue à chaque viewport, pour que le navigateur choisisse la bonne version avant même de connaître le CSS.",
      },
      {
        kind: "code",
        language: "html",
        title: "Image fixe haute densité",
        code: "<!-- Logo affiché à 120px : version 2x pour les écrans Retina -->\n<img src=\"logo.png\" srcset=\"logo.png 1x, logo@2x.png 2x\"\n     width=\"120\" height=\"40\" alt=\"Logo\">",
      },
      {
        kind: "text",
        text: "Piège : sans `sizes`, le navigateur suppose `100vw` et télécharge souvent une image trop grande. Et précisez toujours `width`/`height` : le navigateur réserve l'espace et évite les décalages de mise en page (CLS) pendant le chargement.",
      },
    ],
  },
  {
    id: "picture-art-direction",
    title: "`<picture>` et l'art direction",
    level: 3,
    intro:
      "Quand il ne suffit pas de redimensionner : changer d'image selon l'écran.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Recadrer selon le viewport",
        code: "<picture>\n  <source media=\"(max-width: 640px)\" srcset=\"hero-mobile.jpg\">\n  <source media=\"(max-width: 1024px)\" srcset=\"hero-tablet.jpg\">\n  <img src=\"hero-desktop.jpg\" alt=\"Paysage panoramique\">\n</picture>",
      },
      {
        kind: "text",
        text: "Différence avec `srcset` : `<picture>` permet de servir une image différente (recadrée, recomposée) selon le contexte, pas juste une version plus petite de la même. Cas typique : un panorama desktop devient un plan resserré sur mobile, où le panorama serait illisible. `<picture>` sert aussi les formats modernes (`avif`, `webp`) avec repli.",
      },
    ],
  },
  {
    id: "lazy-loading",
    title: "Chargement différé",
    level: 3,
    intro:
      "Ne charger que ce que l'utilisateur voit vraiment.",
    blocks: [
      {
        kind: "text",
        text: "`loading=\"lazy\"` sur les images et `iframe` reporte leur chargement à l'approche du viewport — le chargement initial ne paie que le contenu visible. C'est particulièrement rentable sur mobile, où chaque kilo compte et où l'utilisateur ne verra peut-être jamais le bas de page.",
      },
      {
        kind: "list",
        items: [
          "Ne jamais mettre `lazy` sur l'image principale du hero (LCP) : elle doit charger en priorité, avec `fetchpriority=\"high\"`.",
          "Combiner avec des dimensions explicites (`width`/`height`) pour éviter les sauts de mise en page.",
          "Pour un contrôle fin (animations d'apparition, préchargement), l'API `IntersectionObserver` remplace les écouteurs de scroll coûteux.",
        ],
      },
    ],
  },
  {
    id: "typographie-detail",
    title: "Typographie responsive avancée",
    level: 3,
    intro:
      "Au-delà de `clamp()` : rythme, longueur de ligne, hiérarchie.",
    blocks: [
      {
        kind: "text",
        text: "Une typographie responsive ne se résume pas à la taille : la longueur de ligne idéale se situe autour de 45 à 75 caractères — sur mobile, une colonne pleine largeur la respecte naturellement, sur desktop il faut contraindre la mesure (`max-width: 65ch` sur les paragraphes). L'interlignage augmente légèrement sur petit écran pour compenser les lignes courtes.",
      },
      {
        kind: "code",
        language: "css",
        title: "Rythme vertical fluide",
        code: "article > * + * { margin-top: clamp(1rem, 2.5vw, 1.75rem); }\n.prose { max-width: 65ch; line-height: 1.6; }",
      },
      {
        kind: "text",
        text: "Le sélecteur `* + *` (chouette lobotomisée) espace uniformément les enfants : un rythme vertical cohérent qui s'adapte à la taille d'écran via `clamp()`, sans classes utilitaires partout.",
      },
    ],
  },
  {
    id: "navigation-responsive",
    title: "Navigation responsive",
    level: 3,
    intro:
      "Le composant le plus délicat : faire tenir la navigation partout.",
    blocks: [
      {
        kind: "table",
        headers: ["Pattern", "Principe", "Quand l'utiliser"],
        rows: [
          ["Menu burger", "Navigation masquée derrière un bouton, panneau plein écran ou tiroir", "Beaucoup de liens, mobile"],
          ["Barre d'onglets basse", "Navigation principale en bas d'écran, au pouce", "Applications mobiles (3-5 destinations)"],
          ["Menu prioritaire", "Les liens excédentaires basculent dans un « Plus »", "Navigation desktop qui déborde"],
          ["Scroll horizontal", "Liens défilants horizontalement", "Peu de liens, style éditorial"],
        ],
      },
      {
        kind: "text",
        text: "Accessibilité du menu burger : le bouton doit indiquer son état (`aria-expanded`), le panneau doit être navigable au clavier, et le focus doit y entrer à l'ouverture. Un menu que les lecteurs d'écran ne voient pas n'est pas une navigation.",
      },
    ],
  },
  {
    id: "tableaux-responsive",
    title: "Tableaux responsives",
    level: 3,
    intro:
      "Le casse-tête classique : un tableau large sur un écran étroit.",
    blocks: [
      {
        kind: "table",
        headers: ["Technique", "Principe", "Limite"],
        rows: [
          ["Défilement horizontal", "Le tableau défile dans un conteneur `overflow-x: auto`", "L'utilisateur peut rater des colonnes"],
          ["Colonnes prioritaires", "On masque les colonnes secondaires sur mobile", "Information perdue — à choisir avec soin"],
          ["Cartes", "Chaque ligne devient une carte verticale (CSS ou JS)", "Plus de comparaison visuelle entre lignes"],
          ["Tableau transposé", "En-têtes en première colonne, défilement horizontal", "Complexe à mettre en œuvre"],
        ],
      },
      {
        kind: "text",
        text: "Le défilement horizontal avec un indice visuel (ombre, fade) est le compromis le plus honnête : il préserve toutes les données et la structure du tableau. La transformation en cartes convient quand chaque ligne se lit indépendamment.",
      },
    ],
  },
  {
    id: "formulaires-responsive",
    title: "Formulaires responsives",
    level: 3,
    intro:
      "Des formulaires utilisables au pouce, sans zoom forcé.",
    blocks: [
      {
        kind: "list",
        items: [
          "Taille de police ≥ 16 px sur les champs : en dessous, iOS zoome automatiquement au focus — désorientant.",
          "Un champ par ligne sur mobile : les champs côte à côte deviennent minuscules et sources d'erreurs.",
          "`inputmode` et `type` adaptés : `inputmode=\"numeric\"` pour un code, `type=\"email\"` / `type=\"tel\"` pour le bon clavier virtuel.",
          "`autocomplete` renseigné : le navigateur pré-remplit (nom, email, adresse) — un gain énorme sur mobile.",
          "Labels toujours visibles : pas de placeholder comme seul label (il disparaît à la saisie et pose des problèmes d'accessibilité).",
          "Bouton de soumission pleine largeur et bien visible, messages d'erreur proches du champ concerné.",
        ],
      },
    ],
  },
  {
    id: "zones-tactiles",
    title: "Zones tactiles",
    level: 3,
    intro:
      "Le doigt n'est pas une souris : dimensionner pour le tactile.",
    blocks: [
      {
        kind: "text",
        text: "Un pointeur de souris vise au pixel près ; un pouce couvre une zone. Les cibles tactiles doivent donc être généreuses et espacées : les recommandations usuelles tournent autour de quatre à cinq dizaines de pixels CSS de côté pour les actions principales, davantage pour les zones critiques.",
      },
      {
        kind: "code",
        language: "css",
        title: "Cibles confortables",
        code: ".btn {\n  min-height: 44px;\n  padding: 0.75rem 1.25rem;\n}\n.nav-links { display: flex; gap: 0.25rem; }\n.nav-links a { padding: 0.75rem; } /* zone cliquable élargie */",
      },
      {
        kind: "text",
        text: "Astuce : quand le visuel doit rester compact, élargissez la zone cliquable avec du padding transparent plutôt que de réduire la cible. Et testez avec le pouce, pas avec la souris — l'émulateur ne dit pas la vérité sur ce point.",
      },
    ],
  },
  {
    id: "orientation",
    title: "Orientation portrait/paysage",
    level: 3,
    intro:
      "Gérer le pivotement, surtout sur tablette.",
    blocks: [
      {
        kind: "text",
        text: "Un téléphone pivoté en paysage offre ~800 px de large pour ~360 px de haut : ni vraiment mobile, ni vraiment desktop. `@media (orientation: landscape)` permet d'ajuster : réduire la hauteur du hero, passer une navigation verticale en horizontale, ou compacter les espacements verticaux.",
      },
      {
        kind: "text",
        text: "Ne bloquez jamais l'orientation (pas de « tournez votre appareil » imposé) sauf cas très particulier (jeu, expérience immersive) : c'est une contrainte hostile pour les utilisateurs qui tiennent leur appareil fixé (support, accessibilité).",
      },
    ],
  },
  {
    id: "responsive-vs-adaptive",
    title: "Responsive vs adaptatif",
    level: 3,
    intro:
      "Deux philosophies souvent confondues, aux compromis différents.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Responsive", "Adaptatif (adaptive)"],
        rows: [
          ["Principe", "Mise en page fluide continue + breakpoints", "Plusieurs mises en page fixes, le serveur ou le JS choisit"],
          ["Entre les seuils", "S'adapte en continu", "Rien ne change (sauts brusques)"],
          ["Maintenance", "Une seule base de code", "Plusieurs variantes à maintenir"],
          ["Performance", "Le client reçoit tout le CSS", "Le serveur peut n'envoyer que la variante utile"],
          ["Cas d'usage", "Cas général", "Contenus très différents par appareil (ex. m-commerce)"],
        ],
      },
      {
        kind: "text",
        text: "En pratique, la plupart des sites « adaptatifs » modernes sont des hybrids : base responsive, avec quelques composants qui changent radicalement par breakpoint. Le pur adaptatif multi-variantes est devenu rare — son coût de maintenance l'a tué.",
      },
    ],
  },
  {
    id: "performance-mobile",
    title: "Performance et responsive",
    level: 3,
    intro:
      "Le responsive rate son but s'il envoie le poids du desktop au mobile.",
    blocks: [
      {
        kind: "list",
        items: [
          "`display: none` ne décharge pas : une image masquée en CSS est quand même téléchargée. Utilisez `<picture>`/media queries côté HTML pour ne pas l'envoyer.",
          "Images : `srcset` + formats modernes (`avif`, `webp`) + `loading=\"lazy\"` — le trio gagnant.",
          "CSS : un seul fichier responsive bien construit vaut mieux que plusieurs feuilles conditionnelles qui se battent.",
          "Polices : `font-display: swap`, sous-ensembles (`unicode-range`), pas plus de deux familles.",
          "JavaScript : ne chargez les composants lourds (carrousels, cartes) que quand ils sont visibles ou nécessaires.",
          "Mesurez sur mobile réel en 4G : les scores desktop ne disent rien de l'expérience d'un utilisateur mobile.",
        ],
      },
    ],
  },
  {
    id: "prefers-color-scheme",
    title: "`prefers-color-scheme` : thème sombre",
    level: 3,
    intro:
      "Respecter le choix d'apparence de l'utilisateur, en une media query.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Thème adaptatif avec variables",
        code: ":root { --bg: #ffffff; --text: #1a1a1a; }\n@media (prefers-color-scheme: dark) {\n  :root { --bg: #121212; --text: #f0f0f0; }\n}\nbody { background: var(--bg); color: var(--text); }",
      },
      {
        kind: "text",
        text: "Avec des variables CSS, le thème sombre devient une redéfinition de tokens — pas une duplication de styles. Prévoyez aussi un sélecteur manuel (clair/sombre/auto) : la préférence système est un défaut, pas une prison.",
      },
    ],
  },
  {
    id: "prefers-reduced-motion",
    title: "`prefers-reduced-motion`",
    level: 3,
    intro:
      "Une media query d'accessibilité que le responsive ne doit pas oublier.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Désactiver les animations non essentielles",
        code: "@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    transition-duration: 0.01ms !important;\n    scroll-behavior: auto !important;\n  }\n}",
      },
      {
        kind: "text",
        text: "Certains utilisateurs (troubles vestibulaires, migraines) demandent au système de réduire les animations : les carrousels automatiques, parallaxes et transitions doivent s'effacer devant ce réglage. C'est une media query comme les autres — intégrez-la dès le départ.",
      },
    ],
  },
  {
    id: "debugging-avance",
    title: "Debugging avancé",
    level: 3,
    intro:
      "Les techniques quand l'inspecteur visuel ne suffit plus.",
    blocks: [
      {
        kind: "fields",
        title: "Boîte à outils",
        fields: [
          {
            label: "Outline de debug",
            value:
              "`* { outline: 1px solid red; }` injecté temporairement : révèle instantanément l'élément qui déborde et la structure réelle des boîtes.",
          },
          {
            label: "Onglet « Computed »",
            value:
              "Voir la valeur finale d'une propriété et quelle règle l'a gagnée : indispensable quand plusieurs media queries se chevauchent.",
          },
          {
            label: "Émulation de media features",
            value:
              "Les DevTools permettent de forcer `prefers-color-scheme`, `prefers-reduced-motion` ou une densité de pixels sans changer les réglages système.",
          },
          {
            label: "Device réel + remote debugging",
            value:
              "Chrome DevTools via USB sur Android, Safari Web Inspector sur iOS : le seul moyen de debugger les navigateurs mobiles réels.",
          },
          {
            label: "Tests automatisés",
            value:
              "Playwright ou Cypress avec plusieurs viewports en CI : les régressions visuelles sont détectées avant les utilisateurs.",
          },
        ],
      },
    ],
  },
  {
    id: "strategie-de-test",
    title: "Stratégie de test",
    level: 3,
    intro:
      "Tester méthodiquement sans tester toutes les tailles possibles.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définir la matrice",
            detail: "Trois largeurs représentatives (ex. 360, 768, 1280) + les bornes exactes de chaque breakpoint. Inutile de tester chaque pixel : les problèmes se concentrent aux seuils.",
          },
          {
            title: "La checklist visuelle",
            detail: "À chaque largeur : pas de défilement horizontal, pas de chevauchement, texte lisible sans zoom, navigation accessible, images nettes et bien cadrées, formulaires utilisables.",
          },
          {
            title: "Le tactile",
            detail: "Sur appareil réel : cibles atteignables au pouce, pas de survol requis pour une action essentielle, clavier virtuel adapté aux champs.",
          },
          {
            title: "La performance",
            detail: "Temps de chargement et poids des images sur connexion mobile simulée (throttling réseau des DevTools) ou réelle.",
          },
          {
            title: "L'automatisation",
            detail: "Captures d'écran de référence aux largeurs clés dans la CI ; toute différence visuelle déclenche une revue humaine.",
          },
        ],
      },
    ],
  },
  {
    id: "accessibilite-responsive",
    title: "Accessibilité et responsive",
    level: 3,
    intro:
      "Le responsive qui casse l'accessibilité n'est pas du responsive.",
    blocks: [
      {
        kind: "list",
        items: [
          "Zoom texte à 200 % : la mise en page doit tenir quand l'utilisateur agrandit le texte — testez-le, c'est un critère d'accessibilité.",
          "Ordre de lecture : l'ordre visuel réorganisé doit rester cohérent avec l'ordre du DOM pour les lecteurs d'écran (`order` en flexbox peut les désynchroniser).",
          "Contrastes : vérifiés dans les deux thèmes (clair/sombre) et à toutes les tailles.",
          "Focus visible : l'indicateur de focus au clavier doit rester visible sur tous les breakpoints.",
          "Contenu masqué : ce qui est caché aux lecteurs d'écran (`aria-hidden`, `display: none`) doit l'être intentionnellement, pas comme effet de bord d'une media query.",
        ],
      },
    ],
  },
  {
    id: "contenu-prioritaire",
    title: "Prioriser le contenu sur mobile",
    level: 3,
    intro:
      "La contrainte d'espace comme outil éditorial.",
    blocks: [
      {
        kind: "text",
        text: "Sur mobile, chaque pixel vertical coûte un défilement : c'est l'occasion de se demander si chaque bloc mérite sa place. La méthode : lister les blocs par ordre d'importance pour la tâche de l'utilisateur, puis décider pour chacun — garder, compacter (accordéon, onglets), ou déplacer plus bas.",
      },
      {
        kind: "text",
        text: "Ce travail éditorial améliore aussi le desktop : une page dont chaque section a justifié sa présence est une meilleure page partout. Le responsive n'est pas qu'une affaire de CSS — c'est une discipline de priorisation du contenu.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pièges qui survivent au niveau 2.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Breakpoints par appareil",
            value:
              "Problème : des seuils « iPhone », « iPad » qui ne correspondent à aucun contenu. Solution : breakpoints issus du contenu, testés aux bornes.",
          },
          {
            label: "`100vw` et la scrollbar",
            value:
              "Problème : `100vw` inclut la largeur de la scrollbar sur certains navigateurs → défilement horizontal. Solution : `width: 100%` ou `overflow-x: clip` ciblé.",
          },
          {
            label: "Media queries qui se chevauchent",
            value:
              "Problème : deux breakpoints qui s'appliquent à la même largeur avec des règles contradictoires. Solution : intervalles disjoints, ou mobile-first strict en `min-width` croissant.",
          },
          {
            label: "Images lourdes sur mobile",
            value:
              "Problème : le mobile télécharge l'image desktop. Solution : `srcset`/`sizes` corrects, vérifiés dans l'onglet Réseau des DevTools.",
          },
          {
            label: "Tester uniquement à 360 et 1440",
            value:
              "Problème : les largeurs intermédiaires (tablettes, petits laptops) sont les plus cassées. Solution : tester aussi 768 et 1024, et redimensionner en continu.",
          },
          {
            label: "Oublier le paysage mobile",
            value:
              "Problème : un hero de `100vh` qui mange tout l'écran en paysage. Solution : tester la rotation, compacter les espacements verticaux.",
          },
          {
            label: "Survol indispensable",
            value:
              "Problème : une action accessible uniquement au `:hover` — inexistante au tactile. Solution : toute action au survol doit avoir un équivalent au tap.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro:
      "Des repères de contexte, pas des règles absolues.",
    blocks: [
      {
        kind: "list",
        items: [
          "Mobile-first : écrire pour la contrainte, enrichir en montant en largeur.",
          "Fluide par défaut : `%`, `rem`, `clamp()` avant les media queries ; media queries pour les changements structurels.",
          "Breakpoints du contenu : seuils nommés, issus de la casse réelle de la mise en page.",
          "Images : `srcset`/`sizes`, formats modernes, `lazy` sauf LCP, dimensions explicites.",
          "Typographie : échelle en `clamp()`, mesure limitée (`65ch`), 16 px minimum.",
          "Tactile : cibles généreuses, pas d'action au survol uniquement.",
          "Tester : trois largeurs + bornes + un vrai appareil, à chaque feature.",
          "Accessibilité : zoom 200 %, ordre DOM, contrastes, `prefers-reduced-motion`.",
          "Performance : le mobile ne doit pas payer le poids du desktop.",
          "Documenter : breakpoints, échelle typo et conventions dans le design system.",
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro:
      "Aller plus loin, en commençant toujours par la documentation officielle.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          {
            label: "MDN Web Docs",
            value:
              "developer.mozilla.org : la référence pour les media queries, les unités CSS, `srcset`, les container queries — avec tableaux de compatibilité navigateurs.",
          },
          {
            label: "web.dev",
            value:
              "Les guides de Google sur le responsive design et les Core Web Vitals : la dimension performance du responsive.",
          },
          {
            label: "Can I use",
            value:
              "caniuse.com : vérifier le support réel d'une propriété (container queries, `dvh`, syntaxe d'intervalle) avant de l'utiliser.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : auditer un site existant avec l'onglet Réseau (poids des images par viewport) puis le corriger.",
          "Veille : les notes de version des navigateurs — les media features et unités évoluent vite.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Le responsive maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "`css` : approfondir les moteurs de mise en page (grid, flexbox) et l’approche utilitaire (`md:`, `lg:`) — la même logique, plusieurs syntaxes.",
          "`accessibility` : l'accessibilité au-delà du responsive — ARIA, clavier, lecteurs d'écran.",
          "`performance` : la performance web systématique — le responsive n'est que le début.",
          "`css` : animer sans casser le responsive ni l'accessibilité (media query prefers-reduced-motion).",
          "Revenir à la roadmap : valider le responsive et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète des Animations CSS : transitions, keyframes,
 * easing, performance GPU et respect de prefers-reduced-motion. Du premier
 * hover aux chorégraphies pilotées par le scroll. Tous les textes
 * supportent le code inline entre backticks.
 */
export const LEARNING_CSS_ANIMATIONS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre les deux mécanismes d'animation en CSS et à quoi ils servent.",
    blocks: [
      {
        kind: "text",
        text: "CSS propose deux façons d'animer : les transitions, qui adoucissent le passage d'un état à un autre (un bouton qui change de couleur au survol), et les animations (`@keyframes`), qui décrivent une séquence d'étapes complète (un loader qui tourne en boucle). Les deux sont déclaratives — on décrit le mouvement, le navigateur l'exécute — et ne nécessitent aucun JavaScript.",
      },
      {
        kind: "text",
        text: "L'animation n'est pas de la décoration : elle guide l'attention, rend les changements d'état compréhensibles (un panneau qui glisse depuis le bord « vient » de quelque part) et donne du feedback (un bouton qui réagit au clic confirme l'action). Utilisée avec mesure, elle améliore réellement l'expérience ; utilisée à l'excès, elle distrait et peut provoquer des nausées.",
      },
      {
        kind: "text",
        text: "Deux règles d'or traversent tout ce guide : n'animer que `transform` et `opacity` pour rester fluide (le GPU s'en charge sans recalculer la mise en page), et toujours respecter `prefers-reduced-motion` pour les utilisateurs sensibles au mouvement.",
      },
    ],
  },
  {
    id: "mouvement-raisonne",
    title: "Le mouvement au service de l'UX",
    level: 1,
    intro:
      "Quand animer — et quand s'abstenir. La philosophie avant la technique.",
    blocks: [
      {
        kind: "table",
        headers: ["Bonne animation", "Mauvaise animation"],
        rows: [
          ["Explique un changement d'état (où est allé cet élément ?)", "Décore sans raison (texte qui danse au chargement)"],
          ["Donne un feedback immédiat (clic confirmé)", "Fait attendre (intro de 3 secondes non skippable)"],
          ["Guide l'attention vers l'important", "Disperse l'attention partout en même temps"],
          ["Est rapide (200-500 ms) et subtile", "Est lente, excessive ou en boucle agressive"],
          ["Se coupe si l'utilisateur réduit les animations", "Ignore les préférences de l'utilisateur"],
        ],
      },
      {
        kind: "text",
        text: "Test simple : désactivez mentalement l'animation — si l'interface reste parfaitement utilisable et compréhensible, l'animation est un bonus bienvenu. Si l'information disparaît avec elle, l'animation porte une charge qu'elle ne devrait pas porter.",
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
      "Les bases CSS indispensables avant d'animer quoi que ce soit.",
    blocks: [
      {
        kind: "fields",
        title: "CSS — ce qu'il faut maîtriser",
        fields: [
          {
            label: "Sélecteurs et pseudo-classes",
            value:
              "`:hover`, `:focus`, `:active`, `:checked` : les déclencheurs d'animations les plus courants. Sans eux, pas de transitions interactives.",
          },
          {
            label: "Le modèle de boîte",
            value:
              "Comprendre ce qui bouge quand on anime : `transform` déplace le rendu sans toucher à la boîte, contrairement à `margin` ou `width`.",
          },
          {
            label: "Positionnement",
            value:
              "`relative` / `absolute` pour placer les éléments animés (tooltips, loaders) sans casser le flux.",
          },
          {
            label: "Cascade et spécificité",
            value:
              "Une animation qui « ne marche pas » est souvent une règle écrasée par une autre : savoir inspecter les styles appliqués.",
          },
        ],
      },
    ],
  },
  {
    id: "premiere-transition",
    title: "Première transition",
    level: 2,
    intro:
      "Le cas le plus simple : adoucir un changement au survol.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Un bouton qui réagit en douceur",
        code: `.bouton {\n  background: #1a73e8;\n  color: white;\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  /* Ce qui suit dit : quand background ou transform change, anime sur 250 ms */\n  transition: background-color 250ms ease, transform 250ms ease;\n}\n\n.bouton:hover {\n  background: #1558b0;\n  transform: translateY(-2px);\n}\n\n.bouton:active {\n  transform: translateY(0) scale(0.98);\n}`,
      },
      {
        kind: "text",
        text: "Le principe : on déclare la transition sur l'état de repos (pas sur `:hover`), en listant les propriétés à animer. Quand la propriété change — au survol, au focus, via une classe ajoutée en JavaScript — le navigateur interpole au lieu de sauter brutalement.",
      },
    ],
  },
  {
    id: "transition-proprietes",
    title: "Les propriétés de transition",
    level: 2,
    intro:
      "Quatre réglages pour contrôler chaque transition.",
    blocks: [
      {
        kind: "fields",
        title: "transition : les quatre composantes",
        fields: [
          {
            label: "`transition-property`",
            value:
              "Quelle propriété animer (`background-color`, `transform`, `opacity`…). `all` existe mais est déconseillé : il anime aussi ce qu'on n'avait pas prévu.",
          },
          {
            label: "`transition-duration`",
            value:
              "La durée : `250ms`, `0.4s`. Repères : 150-250 ms pour les micro-interactions, 300-500 ms pour les panneaux.",
          },
          {
            label: "`transition-timing-function`",
            value:
              "La courbe d'accélération : `ease`, `ease-out`, `linear`, ou `cubic-bezier(...)` sur mesure. C'est elle qui rend le mouvement naturel.",
          },
          {
            label: "`transition-delay`",
            value:
              "Le délai avant démarrage : `100ms`. Utile pour les séquences en cascade (stagger).",
          },
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Syntaxe raccourcie",
        code: `/* transition: propriété durée easing délai */\n.carte {\n  transition: transform 300ms ease-out 50ms, opacity 300ms ease-out;\n}\n\n/* Plusieurs transitions séparées par des virgules */\n.carte:hover {\n  transform: translateY(-4px);\n  opacity: 0.95;\n}`,
      },
    ],
  },
  {
    id: "keyframes-bases",
    title: "Les keyframes : bases",
    level: 2,
    intro:
      "Quand la transition ne suffit pas : décrire une séquence complète.",
    blocks: [
      {
        kind: "text",
        text: "Les transitions vont d'un état A à un état B. Les animations `@keyframes` décrivent autant d'étapes qu'on veut (0 %, 50 %, 100 %), peuvent boucler, se répéter, aller-retour — et démarrent sans déclencheur (au chargement, ou via une classe). C'est l'outil des loaders, des pulsations, des entrées chorégraphiées.",
      },
      {
        kind: "code",
        language: "css",
        title: "Un loader qui tourne",
        code: `/* 1. Décrire les étapes */\n@keyframes rotation {\n  from { transform: rotate(0deg); }\n  to   { transform: rotate(360deg); }\n}\n\n/* 2. L'appliquer à un élément */\n.loader {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #e0e0e0;\n  border-top-color: #1a73e8;\n  border-radius: 50%;\n  animation: rotation 1s linear infinite;\n}`,
      },
      {
        kind: "list",
        items: [
          "`from`/`to` = `0%`/`100%` : les deux écritures sont équivalentes.",
          "Seules les propriétés listées dans les keyframes sont animées ; le reste de l'élément ne bouge pas.",
          "Une animation peut coexister avec une transition sur le même élément (propriétés différentes).",
        ],
      },
    ],
  },
  {
    id: "animation-proprietes",
    title: "Les propriétés d'animation",
    level: 2,
    intro:
      "Contrôler la lecture d'une animation comme une piste vidéo.",
    blocks: [
      {
        kind: "fields",
        title: "animation : les réglages",
        fields: [
          {
            label: "`animation-name`",
            value:
              "Le nom du `@keyframes` à jouer (`rotation`).",
          },
          {
            label: "`animation-duration`",
            value:
              "Durée d'un cycle : `1s`, `300ms`.",
          },
          {
            label: "`animation-timing-function`",
            value:
              "Easing appliqué à chaque cycle (`linear` pour une rotation continue, sinon le mouvement accélère puis stoppe à chaque tour).",
          },
          {
            label: "`animation-iteration-count`",
            value:
              "Nombre de cycles : `3`, ou `infinite` pour boucler.",
          },
          {
            label: "`animation-direction`",
            value:
              "`normal`, `reverse`, `alternate` (aller-retour fluide, idéal pour les pulsations).",
          },
          {
            label: "`animation-fill-mode`",
            value:
              "Que vaut l'élément avant/après : `backwards`, `forwards`, `both` (voir niveau 3).",
          },
          {
            label: "`animation-play-state`",
            value:
              "`running` ou `paused` : mettre en pause au survol, par exemple.",
          },
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Pulsation douce en aller-retour",
        code: `@keyframes pulsation {\n  from { transform: scale(1); opacity: 1; }\n  to   { transform: scale(1.15); opacity: 0.7; }\n}\n\n.point-notification {\n  width: 12px;\n  height: 12px;\n  border-radius: 50%;\n  background: #d93025;\n  /* aller-retour infini, easing doux */\n  animation: pulsation 1.2s ease-in-out infinite alternate;\n}`,
      },
    ],
  },
  {
    id: "easing-bases",
    title: "L'easing : le naturel du mouvement",
    level: 2,
    intro:
      "Pourquoi `ease-out` semble naturel et `linear` mécanique.",
    blocks: [
      {
        kind: "text",
        text: "L'easing (fonction de minutage) définit comment la progression se répartit dans le temps : démarrage lent puis accélération, décélération en fin, vitesse constante. Dans le monde physique, les objets accélèrent et décélèrent — un mouvement `linear` de bout en bout paraît robotique, sauf pour les rotations continues où c'est justement ce qu'on veut.",
      },
      {
        kind: "code",
        language: "css",
        title: "Les easings à connaître",
        code: `/* Sortie d'un élément : rapide puis décélération — le plus naturel */\n.sortie { transition-timing-function: ease-out; }\n\n/* Entrée discrète : démarrage doux */\n.entree { transition-timing-function: ease-in; }\n\n/* Les deux : doux aux deux bouts (mouvements amples) */\n.ample { transition-timing-function: ease-in-out; }\n\n/* Vitesse constante : rotations, défilements continus */\n.continu { animation-timing-function: linear; }\n\n/* Sur mesure : cubic-bezier(x1, y1, x2, y2) */\n.sur-mesure { transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }`,
      },
    ],
  },
  {
    id: "transform-bases",
    title: "transform : l'outil de mouvement",
    level: 2,
    intro:
      "Déplacer, agrandir, pivoter sans toucher à la mise en page.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Les quatre transformations",
        code: `/* Déplacer : x, y (et z en 3D) */\n.deplacer { transform: translate(20px, -10px); }\n.deplacer-relatif { transform: translateX(100%); } /* % de l'élément lui-même */\n\n/* Agrandir / réduire */\n.zoom { transform: scale(1.1); }       /* uniforme */\n.etirer { transform: scaleX(1.5); }    /* horizontal seul */\n\n/* Pivoter */\n.pivoter { transform: rotate(45deg); }\n\n/* Combiner : l'ordre compte (de droite à gauche) */\n.combine { transform: translateX(50px) rotate(15deg) scale(1.2); }`,
      },
      {
        kind: "list",
        items: [
          "`transform` ne modifie pas la boîte de l'élément : les voisins ne bougent pas, aucun recalcul de layout.",
          "`translate(100%)` = 100 % de la taille de l'élément lui-même : pratique pour centrer ou faire glisser des panneaux.",
          "Les transformations se combinent dans l'ordre d'écriture, appliquées de droite à gauche.",
        ],
      },
    ],
  },
  {
    id: "opacity-bases",
    title: "opacity : fondus simples et efficaces",
    level: 2,
    intro:
      "L'autre propriété « gratuite » : les fondus.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Apparition en fondu",
        code: `/* Apparition : opacity + léger déplacement = entrée élégante */\n.apparition {\n  opacity: 0;\n  transform: translateY(12px);\n  transition: opacity 300ms ease-out, transform 300ms ease-out;\n}\n\n.apparition.visible {\n  opacity: 1;\n  transform: translateY(0);\n}\n/* La classe .visible est ajoutée en JavaScript (IntersectionObserver, …) */`,
      },
      {
        kind: "text",
        text: "`opacity: 0` rend invisible mais l'élément reste cliquable et occupe sa place : combinez avec `visibility: hidden` (transitionnable avec un délai) ou `pointer-events: none` si l'élément ne doit pas intercepter les clics.",
      },
    ],
  },
  {
    id: "performance-gpu",
    title: "Performance : rester sur le GPU",
    level: 2,
    intro:
      "La règle de performance la plus importante des animations web.",
    blocks: [
      {
        kind: "text",
        text: "Animer `width`, `margin`, `top`/`left` ou `font-size` force le navigateur à recalculer la mise en page (layout) à chaque image — coûteux, saccadé sur mobile. Animer `transform` et `opacity` ne touche qu'à l'étape de composition, confiée au GPU : c'est fluide même sur des appareils modestes.",
      },
      {
        kind: "table",
        headers: ["Propriété animée", "Coût", "Verdict"],
        rows: [
          ["`transform`, `opacity`", "Composition GPU uniquement", "À privilégier, toujours fluide"],
          ["`color`, `background-color`", "Repeint (paint)", "Acceptable pour de petites zones"],
          ["`width`, `height`, `margin`, `top`", "Recalcul de layout complet", "À éviter en animation"],
          ["`box-shadow` (grand flou)", "Repeint coûteux", "À éviter ou à tricher (voir niveau 3)"],
        ],
      },
      {
        kind: "text",
        text: "Réflexe de conversion : au lieu d'animer `width: 0 → 200px`, animez `transform: scaleX(0 → 1)` ; au lieu de `top: 0 → 100px`, `transform: translateY(0 → 100px)`. Même effet visuel, coût divisé.",
      },
    ],
  },
  {
    id: "prefers-reduced-motion-pratique",
    title: "Respecter prefers-reduced-motion",
    level: 2,
    intro:
      "Couper les animations pour ceux qui le demandent : non négociable.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Désactiver les animations non essentielles",
        code: `@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.01ms !important;\n    scroll-behavior: auto !important;\n  }\n}`,
      },
      {
        kind: "text",
        text: "Ce bloc, placé à la fin de votre CSS, neutralise les animations décoratives pour les utilisateurs qui ont activé « réduire les animations » dans leur système. Les animations porteuses d'information (spinner de chargement) se remplacent par un équivalent statique (texte « Chargement… »). Testez-le : les DevTools permettent d'émuler `prefers-reduced-motion`.",
      },
    ],
  },
  {
    id: "erreurs-courantes-animations",
    title: "Les erreurs les plus courantes",
    level: 2,
    intro:
      "Les pièges classiques des débuts en animation CSS.",
    blocks: [
      {
        kind: "list",
        items: [
          "Déclarer la `transition` sur `:hover` au lieu de l'état de repos : l'aller est animé, le retour est brutal.",
          "Animer `all` : des propriétés imprévues s'animent (couleurs, ombres), avec un coût et des surprises.",
          "Animer `height: 0 → auto` : impossible à interpoler — voir l'astuce `grid-template-rows` au niveau 3.",
          "`animation` sans `infinite` qui ne se rejoue pas : normale, elle ne joue qu'une fois par défaut.",
          "Oublier `prefers-reduced-motion` : les carrousels auto et parallaxes deviennent des barrières.",
          "Durées trop longues (> 1 s) pour des micro-interactions : l'interface paraît molle.",
          "Animer `top`/`left`/`width` : saccades garanties sur mobile.",
        ],
      },
    ],
  },
  {
    id: "projet-bouton-feedback",
    title: "Projet : bouton avec feedback complet",
    level: 2,
    intro:
      "Un bouton qui réagit à chaque état : repos, survol, focus, clic, désactivé.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "État de repos",
            detail:
              "Style de base + `transition` sur `background-color`, `transform` et `box-shadow`. Durée 200 ms, `ease-out`.",
          },
          {
            title: "Survol et focus",
            detail:
              "`:hover` : assombrit légèrement + `translateY(-1px)`. `:focus-visible` : indicateur de contour visible (accessibilité).",
          },
          {
            title: "Clic",
            detail:
              "`:active` : `scale(0.97)` — un léger enfoncement qui confirme l'action, retour instantané au relâchement.",
          },
          {
            title: "État désactivé",
            detail:
              "`:disabled` : opacité réduite, pas de transition superflue, curseur `not-allowed`.",
          },
          {
            title: "Vérifier reduced-motion",
            detail:
              "Émulez `prefers-reduced-motion: reduce` : les translations disparaissent, les changements de couleur restent (ils ne sont pas du mouvement).",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "transition-detail",
    title: "Les transitions en détail",
    level: 3,
    intro:
      "Ce qui déclenche vraiment une transition — et ses limites.",
    blocks: [
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "En une phrase",
            value:
              "Une transition anime le changement d'une propriété entre deux valeurs calculées, quand ce changement est déclenché par un nouvel état (`:hover`, classe ajoutée/retirée, media query).",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Sans transition, tout changement d'état est instantané et brutal : l'œil perd le fil (« où est passé ce panneau ? »). La transition préserve la continuité visuelle avec une seule déclaration.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Changements d'état binaires : survol, focus, ouverture/fermeture, sélection, validation. Dès qu'il faut une séquence multi-étapes ou une boucle, passez aux keyframes.",
          },
          {
            label: "Comment ça fonctionne",
            value:
              "Le navigateur interpole entre l'ancienne et la nouvelle valeur calculée. Conditions : la propriété doit être animable (pas `display`), et les deux valeurs doivent être interpolables (pas `auto`, pas `none` → `block`).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Transition qui ne se joue pas à l'ajout d'une classe : souvent la classe est ajoutée avant que le navigateur ait calculé l'état initial — forcez un reflow (`element.offsetHeight`) entre les deux, ou utilisez `requestAnimationFrame`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Listez explicitement les propriétés (`transition: transform 250ms, opacity 250ms`) plutôt que `all` : prévisible, performant, maintenable.",
          },
        ],
      },
    ],
  },
  {
    id: "keyframes-detail",
    title: "Les keyframes en détail",
    level: 3,
    intro:
      "Séquences multi-étapes, boucles et chorégraphies.",
    blocks: [
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "En une phrase",
            value:
              "`@keyframes` décrit les valeurs d'une ou plusieurs propriétés à des pourcentages de progression, que le navigateur interpole dans l'ordre.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Certains mouvements ne sont pas des allers-retours A→B : rebond, vague, séquence d'apparition en plusieurs temps, boucle continue. Les keyframes expriment ces chorégraphies.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Loaders, pulsations, animations d'entrée complexes, effets en boucle, séquences à plus de deux étapes.",
          },
          {
            label: "Comment ça fonctionne",
            value:
              "Chaque keyframe ne liste que les propriétés qui changent à cette étape ; les autres gardent leur valeur courante. Les pourcentages peuvent être partiels (le navigateur interpole entre les étapes définies).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Redéfinir dans les keyframes une propriété déjà animée par une transition sur le même élément : les deux se battent, le résultat est imprévisible.",
          },
          {
            label: "Bonne pratique",
            value:
              "Nommez les keyframes par leur effet (`fade-up`, `spin`), pas par leur usage (`loader-1`) : elles sont réutilisables.",
          },
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Séquence d'apparition en trois temps",
        code: `@keyframes entree {\n  0%   { opacity: 0; transform: translateY(24px) scale(0.96); }\n  60%  { opacity: 1; transform: translateY(-4px) scale(1.01); }\n  100% { opacity: 1; transform: translateY(0) scale(1); }\n}\n\n.modal {\n  animation: entree 450ms cubic-bezier(0.22, 1, 0.36, 1) backwards;\n}\n/* backwards : l'état 0% s'applique pendant le délai éventuel */`,
      },
    ],
  },
  {
    id: "timing-functions-table",
    title: "Toutes les fonctions de minutage",
    level: 3,
    intro:
      "Le vocabulaire complet de l'easing, avec quand utiliser chacune.",
    blocks: [
      {
        kind: "table",
        headers: ["Fonction", "Comportement", "Usage typique"],
        rows: [
          ["`linear`", "Vitesse constante", "Rotations continues, défilements, barres de progression"],
          ["`ease`", "Démarrage lent, rapide au milieu, fin lente (défaut CSS)", "Valeur par défaut acceptable, rarement le meilleur choix"],
          ["`ease-in`", "Démarrage lent, accélération", "Éléments qui quittent l'écran"],
          ["`ease-out`", "Démarrage rapide, décélération", "Éléments qui entrent, micro-interactions — le plus naturel"],
          ["`ease-in-out`", "Lent aux deux bouts", "Mouvements amples, allers-retours"],
          ["`cubic-bezier(...)`", "Courbe sur mesure", "Signature motion d'un produit"],
          ["`steps(n)`", "Sauts discrets, sans interpolation", "Sprites, effets rétro, minuteurs à chiffres"],
        ],
      },
    ],
  },
  {
    id: "cubic-bezier",
    title: "Maîtriser cubic-bezier",
    level: 3,
    intro:
      "Dessiner sa propre courbe d'accélération pour une signature motion unique.",
    blocks: [
      {
        kind: "text",
        text: "`cubic-bezier(x1, y1, x2, y2)` définit une courbe avec deux points de contrôle : x1/x2 entre 0 et 1 (le temps), y1/y2 libres (la progression). Un y hors de [0,1] crée un dépassement (overshoot) : l'élément va un peu trop loin puis revient — l'effet « ressort » des interfaces premium.",
      },
      {
        kind: "code",
        language: "css",
        title: "Courbes utiles",
        code: `/* Sortie standard premium (décélération marquée) */\n.premium { transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }\n\n/* Ressort léger : dépasse puis se stabilise (y1 > 1) */\n.ressort { transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }\n\n/* Entrée rapide qui se pose */\n.pose { transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }`,
      },
      {
        kind: "text",
        text: "Les DevTools (Chrome, Firefox) proposent un éditeur visuel de courbe : cliquez sur l'icône à côté de la fonction dans l'inspecteur, dessinez, copiez la valeur. C'est la façon la plus rapide d'expérimenter.",
      },
    ],
  },
  {
    id: "steps-easing",
    title: "steps() : l'animation image par image",
    level: 3,
    intro:
      "Quand on ne veut aucune interpolation : sprites et effets mécaniques.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Sprite animé avec steps()",
        code: `/* Un sprite de 8 frames côte à côte, 800px de large au total */\n.personnage {\n  width: 100px;\n  height: 100px;\n  background: url("sprite.png") 0 0;\n  /* 8 sauts discrets, pas d'interpolation entre les frames */\n  animation: marche 0.8s steps(8) infinite;\n}\n\n@keyframes marche {\n  to { background-position: -800px 0; }\n}`,
      },
      {
        kind: "list",
        items: [
          "`steps(n)` divise la progression en n paliers : parfait pour les sprites, les minuteurs à chiffres, les effets « machine à écrire ».",
          "`steps(n, jump-start)` vs `jump-end` (défaut) : où se produit le saut dans chaque palier — à tester visuellement.",
          "Ne s'utilise quasiment jamais pour des mouvements d'interface : c'est volontairement saccadé.",
        ],
      },
    ],
  },
  {
    id: "animation-fill-mode",
    title: "animation-fill-mode",
    level: 3,
    intro:
      "Contrôler l'état de l'élément avant le démarrage et après la fin.",
    blocks: [
      {
        kind: "table",
        headers: ["Valeur", "Avant le démarrage", "Après la fin"],
        rows: [
          ["`none` (défaut)", "Style normal", "Style normal (retour brutal si différent de 100 %)"],
          ["`backwards`", "Applique la keyframe 0 % pendant le délai", "Style normal"],
          ["`forwards`", "Style normal", "Conserve la keyframe 100 %"],
          ["`both`", "Applique 0 % pendant le délai", "Conserve 100 %"],
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Apparition retardée sans flash",
        code: `/* Sans backwards : l'élément est visible pendant le délai de 300 ms, puis disparaît et rejoue */\n/* Avec backwards : il reste à l'état 0% (invisible) pendant le délai */\n.notification {\n  animation: entree 400ms ease-out 300ms backwards;\n}`,
      },
      {
        kind: "text",
        text: "Piège : `forwards` fige l'état final — si l'animation est supprimée ou rejouée, pensez à l'état de repos. Pour les apparitions retardées en cascade, `backwards` est presque toujours ce qu'on veut.",
      },
    ],
  },
  {
    id: "animation-direction",
    title: "Direction et répétitions",
    level: 3,
    intro:
      "Allers simples, allers-retours et boucles : les réglages fins.",
    blocks: [
      {
        kind: "list",
        items: [
          "`alternate` : à chaque itération, l'animation repart en sens inverse — pulsations et balancements fluides sans keyframes miroir.",
          "`alternate-reverse` : commence par le retour (utile pour déphaser deux éléments).",
          "Délais négatifs (`animation-delay: -0.5s`) : démarrer au milieu d'un cycle — indispensable pour synchroniser des éléments en boucle (vagues, loaders multi-points).",
          "`animation-iteration-count: 2.5` : les fractions sont autorisées, l'animation s'arrête en plein cycle.",
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Trois points de loader déphasés",
        code: `@keyframes rebond {\n  0%, 100% { transform: translateY(0); }\n  50%      { transform: translateY(-10px); }\n}\n\n.point { animation: rebond 0.9s ease-in-out infinite; }\n.point:nth-child(2) { animation-delay: -0.3s; } /* déjà à mi-cycle */\n.point:nth-child(3) { animation-delay: -0.6s; }`,
      },
    ],
  },
  {
    id: "animation-play-state",
    title: "Mettre en pause une animation",
    level: 3,
    intro:
      "`animation-play-state` : le bouton pause des animations CSS.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Pause au survol",
        code: `.carrousel {\n  animation: defile 20s linear infinite;\n}\n/* L'utilisateur peut figer le défilement pour lire */\n.carrousel:hover {\n  animation-play-state: paused;\n}`,
      },
      {
        kind: "list",
        items: [
          "Cas d'usage : carrousels auto (pause au survol/focus), animations pilotées par JS (play/pause via classe).",
          "La pause fige la progression sans la réinitialiser : reprise exactement où on s'était arrêté.",
          "Accessibilité : un carrousel qui défile sans contrôle est un échec WCAG — la pause au survol est un minimum, un vrai bouton pause est mieux.",
        ],
      },
    ],
  },
  {
    id: "transform-origin",
    title: "transform-origin : le point de pivot",
    level: 3,
    intro:
      "D'où partent les rotations et les mises à l'échelle.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Pivoter depuis différents points",
        code: `/* Défaut : le centre */\n.carte { transform-origin: center; }\n\n/* Rotation « porte » depuis le bord gauche */\n.porte { transform-origin: left center; }\n.porte:hover { transform: rotateY(60deg); }\n\n/* Zoom depuis le point cliqué (valeurs dynamiques via JS) */\n.zoom { transform-origin: var(--x, 50%) var(--y, 50%); }`,
      },
      {
        kind: "text",
        text: "L'origine se règle en mots-clés (`top`, `left`, `center`), pourcentages ou longueurs. Elle change radicalement la perception : un menu qui pivote depuis son point d'attache semble « accroché », le même depuis son centre semble « flottant ».",
      },
    ],
  },
  {
    id: "will-change",
    title: "will-change : à manier avec mesure",
    level: 3,
    intro:
      "Prévenir le navigateur d'une animation imminente — sans en abuser.",
    blocks: [
      {
        kind: "text",
        text: "`will-change: transform` demande au navigateur de préparer une couche GPU pour l'élément avant que l'animation démarre, évitant un à-coup à la première image. Mais chaque couche consomme de la mémoire : l'appliquer partout ralentit plus qu'il n'accélère.",
      },
      {
        kind: "list",
        items: [
          "À utiliser : sur les quelques éléments réellement animés, ajoutée juste avant l'animation (via JS ou `:hover`), retirée après.",
          "À éviter : en règle permanente sur des dizaines d'éléments — mémoire GPU saturée, pire que sans.",
          "En pratique, les navigateurs modernes anticipent bien : `will-change` n'est utile que si vous mesurez un à-coup réel à la première frame.",
        ],
      },
    ],
  },
  {
    id: "composite-layers",
    title: "Comprendre la composition GPU",
    level: 3,
    intro:
      "Pourquoi transform et opacity sont fluides : le pipeline de rendu.",
    blocks: [
      {
        kind: "diagram",
        title: "Le pipeline de rendu, de gauche à droite",
        lines: [
          "Style → Layout → Paint → Composite",
          "         (cher)    (moyen)   (pas cher, GPU)",
          "",
          "width, margin, top…  → rejoue Layout + Paint + Composite (saccadé)",
          "color, box-shadow…   → rejoue Paint + Composite (correct sur petites zones)",
          "transform, opacity   → rejoue Composite seul (fluide)",
        ],
      },
      {
        kind: "text",
        text: "Le navigateur peut « promouvoir » un élément animé en couche GPU séparée : il est alors déplacé et fondu sans toucher au reste de la page. C'est automatique pour `transform`/`opacity` animés. Les DevTools (onglet Rendu → « calques ») montrent ces couches : utile pour diagnostiquer une animation saccadée.",
      },
    ],
  },
  {
    id: "proprietes-couteuses",
    title: "Remplacer les propriétés coûteuses",
    level: 3,
    intro:
      "Les équivalences qui gardent l'effet visuel sans le coût.",
    blocks: [
      {
        kind: "table",
        headers: ["Effet voulu", "Version coûteuse", "Version GPU"],
        rows: [
          ["Élargir", "`width: 0 → 200px`", "`transform: scaleX(0 → 1)` + `transform-origin: left`"],
          ["Déplacer", "`top` / `left`", "`transform: translate(...)`"],
          ["Ombre qui grandit", "`box-shadow` animé", "Pseudo-élément avec ombre, animé en `opacity`"],
          ["Flou d'apparition", "`filter: blur()` animé", "`opacity` seule, ou blur figé + fondu"],
          ["Hauteur auto", "`height: 0 → auto` (impossible)", "Astuce `grid-template-rows: 0fr → 1fr` (voir accordéons)"],
        ],
      },
    ],
  },
  {
    id: "scroll-animations",
    title: "Animations pilotées par le scroll",
    level: 3,
    intro:
      "Lier la progression d'une animation au défilement, en CSS pur.",
    blocks: [
      {
        kind: "text",
        text: "Les animations pilotées par le scroll (`animation-timeline: scroll()`) font progresser une animation en fonction de la position de défilement plutôt que du temps : barre de progression de lecture, parallaxe, révélations au scroll. Supportées dans les navigateurs Chromium ; la standardisation se poursuit pour les autres moteurs — prévoyez un repli gracieux.",
      },
      {
        kind: "code",
        language: "css",
        title: "Barre de progression de lecture",
        code: `@keyframes progression {\n  from { transform: scaleX(0); }\n  to   { transform: scaleX(1); }\n}\n\n.barre-lecture {\n  position: fixed;\n  top: 0; left: 0; right: 0;\n  height: 4px;\n  background: #1a73e8;\n  transform-origin: left;\n  animation: progression linear;\n  animation-timeline: scroll(); /* la timeline = le scroll de la page */\n}`,
      },
      {
        kind: "list",
        items: [
          "Principe : la `animation-timeline` remplace le temps par une autre progression (scroll du document ou d'un conteneur).",
          "Repli : sans support, l'animation ne joue pas — assurez un état final acceptable par défaut.",
          "Alternative universelle : IntersectionObserver en JS qui ajoute des classes (voir apparition au scroll).",
        ],
      },
    ],
  },
  {
    id: "view-transitions",
    title: "View Transitions : les transitions de page natives",
    level: 3,
    intro:
      "Animer les changements de page ou d'état global sans framework.",
    blocks: [
      {
        kind: "text",
        text: "L'API View Transitions (`document.startViewTransition()`) capture l'état actuel de la page en image, applique le changement (navigation, filtre, tri), puis anime la transition entre l'ancien et le nouvel état — avec un fondu par défaut, personnalisable en CSS. Disponible dans les navigateurs Chromium ; les autres navigateurs appliquent le changement sans animation (repli naturel).",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Transition lors d'un changement d'état",
        code: `// Au lieu de mettre à jour directement :\n// liste.innerHTML = nouvelleListe;\n\n// Enveloppez la mise à jour : le navigateur anime l'avant/après\nif (document.startViewTransition) {\n  document.startViewTransition(() => {\n    liste.innerHTML = nouvelleListe;\n  });\n} else {\n  liste.innerHTML = nouvelleListe; // repli : changement instantané\n}`,
      },
      {
        kind: "list",
        items: [
          "Cas d'usage : navigation SPA, changement de thème, filtres de galerie, tri de tableau.",
          "Personnalisation : pseudo-éléments `::view-transition-old(root)` / `::view-transition-new(root)` pour des effets sur mesure.",
          "Respectez `prefers-reduced-motion` : désactivez l'enveloppement quand l'utilisateur réduit les animations.",
        ],
      },
    ],
  },
  {
    id: "micro-interactions",
    title: "Bibliothèque de micro-interactions",
    level: 3,
    intro:
      "Les petits feedbacks qui rendent une interface vivante : catalogue.",
    blocks: [
      {
        kind: "table",
        headers: ["Élément", "Interaction", "Réalisation"],
        rows: [
          ["Bouton", "Enfoncement au clic", "`:active { transform: scale(0.97) }`"],
          ["Toggle", "Glissement du curseur", "`transform: translateX()` sur la pastille, 200 ms ease-out"],
          ["Champ", "Label flottant", "Label en `translateY` + `scale` quand le champ est focus ou rempli"],
          ["Icône favori", "Petit rebond au clic", "Keyframes scale 1 → 1.3 → 1, 300 ms"],
          ["Lien", "Soulignement animé", "Pseudo-élément en `scaleX(0 → 1)` depuis la gauche"],
          ["Carte", "Élévation au survol", "`translateY(-4px)` + ombre via pseudo-élément en opacity"],
          ["Copie", "Confirmation « Copié ! »", "Tooltip qui apparaît en fondu 1,5 s"],
        ],
      },
      {
        kind: "text",
        text: "Règle commune : 150-250 ms, `ease-out`, `transform`/`opacity` uniquement. Une micro-interaction doit être sentie, pas remarquée : si l'utilisateur la décrit spontanément, elle est probablement trop marquée.",
      },
    ],
  },
  {
    id: "loaders",
    title: "Loaders en pur CSS",
    level: 3,
    intro:
      "Trois loaders classiques, zéro JavaScript, zéro image.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Spinner, points rebondissants, barre indéterminée",
        code: `/* 1. Spinner : bordure partielle en rotation */\n.spinner {\n  width: 32px; height: 32px;\n  border: 3px solid #e0e0e0;\n  border-top-color: #1a73e8;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}\n@keyframes spin { to { transform: rotate(360deg); } }\n\n/* 2. Barre indéterminée : va-et-vient */\n.barre { overflow: hidden; height: 4px; background: #e0e0e0; }\n.barre::after {\n  content: ""; display: block; height: 100%; width: 40%;\n  background: #1a73e8;\n  animation: va-et-vient 1.2s ease-in-out infinite;\n}\n@keyframes va-et-vient {\n  0% { transform: translateX(-100%); }\n  100% { transform: translateX(250%); }\n}`,
      },
      {
        kind: "list",
        items: [
          "Toujours accompagner d'un texte ou d'un `aria-label` (« Chargement… ») : un loader purement visuel est muet pour les lecteurs d'écran.",
          "Si le chargement dépasse quelques secondes, préférez un skeleton ou une progression déterminée : l'indéterminé angoisse.",
          "Avec `prefers-reduced-motion`, remplacez par un texte statique.",
        ],
      },
    ],
  },
  {
    id: "skeleton",
    title: "Skeleton screens",
    level: 3,
    intro:
      "Le chargement qui ressemble au contenu : moins anxiogène qu'un spinner.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Skeleton avec vague de brillance",
        code: `/* Bloc gris qui imite la forme du contenu à venir */\n.skeleton {\n  background: #e8e8e8;\n  border-radius: 6px;\n  position: relative;\n  overflow: hidden;\n}\n\n/* La vague : un dégradé qui traverse, en transform */\n.skeleton::after {\n  content: "";\n  position: absolute; inset: 0;\n  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent);\n  transform: translateX(-100%);\n  animation: vague 1.4s ease-in-out infinite;\n}\n@keyframes vague { to { transform: translateX(100%); } }`,
      },
      {
        kind: "text",
        text: "Le skeleton reproduit la structure de la page (lignes de texte, blocs d'image) en gris : l'utilisateur perçoit la forme du contenu avant son arrivée, ce qui réduit la sensation d'attente. La vague utilise `transform` sur un pseudo-élément — GPU, fluide.",
      },
    ],
  },
  {
    id: "menus-animes",
    title: "Menus et panneaux animés",
    level: 3,
    intro:
      "Ouvrir/fermer en douceur sans casser l'accessibilité.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Panneau latéral qui glisse",
        code: `/* Le panneau est translaté hors écran, pas display:none */\n.panneau {\n  position: fixed;\n  top: 0; right: 0; bottom: 0;\n  width: min(400px, 90vw);\n  transform: translateX(100%);\n  transition: transform 350ms cubic-bezier(0.22, 1, 0.36, 1);\n  visibility: hidden; /* retire du clavier quand fermé */\n}\n\n.panneau.ouvert {\n  transform: translateX(0);\n  visibility: visible;\n}\n/* visibility est transitionnable : avec un délai, elle bascule en fin de fermeture */\n.panneau {\n  transition: transform 350ms cubic-bezier(0.22, 1, 0.36, 1),\n              visibility 0ms 350ms;\n}\n.panneau.ouvert {\n  transition: transform 350ms cubic-bezier(0.22, 1, 0.36, 1),\n              visibility 0ms 0ms;\n}`,
      },
      {
        kind: "list",
        items: [
          "Ne jamais animer depuis `display: none` : l'élément n'existe pas pour la transition. Utilisez `visibility` + `transform`/`opacity`.",
          "Accessibilité : `visibility: hidden` retire l'élément du clavier et des lecteurs d'écran — l'état fermé est vraiment fermé.",
          "Le focus doit entrer dans le panneau à l'ouverture et en sortir à la fermeture (voir le guide Accessibilité).",
        ],
      },
    ],
  },
  {
    id: "tooltips",
    title: "Tooltips accessibles",
    level: 3,
    intro:
      "Une infobulle qui fonctionne au clavier, pas seulement au survol.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Tooltip au survol ET au focus",
        code: `/* Le déclencheur porte l'info via aria-describedby */\n<button aria-describedby="info-prix">Acheter</button>\n<div id="info-prix" role="tooltip" class="tooltip">\n  Paiement sécurisé, expédition sous 48 h\n</div>\n\n.tooltip {\n  position: absolute;\n  opacity: 0;\n  transform: translateY(4px);\n  transition: opacity 200ms ease-out, transform 200ms ease-out;\n  pointer-events: none;\n}\n/* Visible au survol du bouton OU quand le bouton a le focus */\nbutton:hover + .tooltip,\nbutton:focus-visible + .tooltip {\n  opacity: 1;\n  transform: translateY(0);\n}`,
      },
      {
        kind: "text",
        text: "Le point clé : `:focus-visible` en plus de `:hover`. Un tooltip visible uniquement à la souris est invisible au clavier et au tactile. Pour les tooltips riches (liens, boutons), il faut un vrai composant JS avec `Échap` et gestion du focus.",
      },
    ],
  },
  {
    id: "accordeons",
    title: "Accordéons : l'astuce grid-template-rows",
    level: 3,
    intro:
      "Animer une hauteur `auto` : la technique moderne qui remplace les hacks.",
    blocks: [
      {
        kind: "text",
        text: "On ne peut pas animer `height: 0 → auto`. L'ancienne astuce (`max-height: 0 → 999px`) produit des timings faux. La technique moderne : envelopper le contenu dans une grille à une ligne, et animer `grid-template-rows` de `0fr` à `1fr` — interpolable, timing exact, contenu de hauteur quelconque.",
      },
      {
        kind: "code",
        language: "css",
        title: "Accordéon fluide, hauteur quelconque",
        code: `.accordeon-contenu {\n  display: grid;\n  grid-template-rows: 0fr; /* ligne de hauteur nulle */\n  transition: grid-template-rows 350ms ease-out;\n}\n.accordeon-contenu > div {\n  overflow: hidden; /* masque le contenu qui dépasse */\n}\n.accordeon.ouvert .accordeon-contenu {\n  grid-template-rows: 1fr; /* la ligne prend la hauteur du contenu */\n}`,
      },
      {
        kind: "list",
        items: [
          "Fonctionne pour toute hauteur de contenu, sans valeur magique.",
          "Combinez avec `opacity` sur l'enfant pour un fondu simultané.",
          "Accessibilité : le bouton porte `aria-expanded`, le contenu `hidden` quand fermé (ou `visibility` gérée).",
        ],
      },
    ],
  },
  {
    id: "stagger",
    title: "Effets en cascade (stagger)",
    level: 3,
    intro:
      "Faire entrer les éléments les uns après les autres : la chorégraphie simple.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Liste qui entre en cascade",
        code: `@keyframes entree {\n  from { opacity: 0; transform: translateY(16px); }\n  to   { opacity: 1; transform: translateY(0); }\n}\n\n.liste-stagger > li {\n  opacity: 0; /* état initial avant animation */\n  animation: entree 400ms ease-out backwards;\n}\n/* Chaque élément démarre 70 ms après le précédent */\n.liste-stagger > li:nth-child(1) { animation-delay: 0ms; }\n.liste-stagger > li:nth-child(2) { animation-delay: 70ms; }\n.liste-stagger > li:nth-child(3) { animation-delay: 140ms; }\n.liste-stagger > li:nth-child(4) { animation-delay: 210ms; }`,
      },
      {
        kind: "list",
        items: [
          "`backwards` est essentiel : sans lui, les éléments sont visibles pendant leur délai.",
          "Gardez le décalage petit (50-80 ms) et limitez le nombre d'éléments : au-delà d'une seconde totale, c'est de l'attente.",
          "En JS, générez les délais via une variable CSS (`--i`) : `animation-delay: calc(var(--i) * 70ms)`.",
        ],
      },
    ],
  },
  {
    id: "apparition-scroll",
    title: "Apparitions au scroll (IntersectionObserver)",
    level: 3,
    intro:
      "L'approche universelle quand les scroll-driven animations ne sont pas supportées.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Révéler les sections au scroll",
        code: `// CSS : état initial + état révélé\n// .reveal { opacity: 0; transform: translateY(24px);\n//            transition: opacity 500ms ease-out, transform 500ms ease-out; }\n// .reveal.visible { opacity: 1; transform: none; }\n\nconst observer = new IntersectionObserver((entrees) => {\n  for (const entree of entrees) {\n    if (entree.isIntersecting) {\n      entree.target.classList.add("visible");\n      observer.unobserve(entree.target); // une seule fois\n    }\n  }\n}, { threshold: 0.15 });\n\ndocument.querySelectorAll(".reveal").forEach((el) => observer.observe(el));`,
      },
      {
        kind: "list",
        items: [
          "Sans JavaScript, les éléments doivent être visibles : appliquez l'état initial via JS (classe sur `<html>`), jamais en CSS pur.",
          "`unobserve` après révélation : l'animation ne se rejoue pas au scroll inverse (sauf effet voulu).",
          "Avec `prefers-reduced-motion`, n'ajoutez pas la classe initiale : tout est visible directement.",
        ],
      },
    ],
  },
  {
    id: "reduced-motion-avance",
    title: "prefers-reduced-motion en profondeur",
    level: 3,
    intro:
      "Au-delà du coupe-circuit global : des stratégies fines.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Stratégies par type d'animation",
        code: `/* 1. Supprimer : décoratif pur (parallaxe, flottement) */\n@media (prefers-reduced-motion: reduce) {\n  .decoratif { animation: none; }\n}\n\n/* 2. Raccourcir : garder l'info, enlever le mouvement */\n@media (prefers-reduced-motion: reduce) {\n  .notification {\n    animation-duration: 0.01ms; /* apparaît, sans glisser */\n  }\n}\n\n/* 3. Remplacer : spinner → texte statique */\n.spinner-texte { display: none; }\n@media (prefers-reduced-motion: reduce) {\n  .spinner { display: none; }\n  .spinner-texte { display: block; } /* \"Chargement…\" */\n}`,
      },
      {
        kind: "list",
        items: [
          "En JS : `matchMedia(\"(prefers-reduced-motion: reduce)\").matches` pour conditionner les animations pilotées par script.",
          "Testez réellement avec le réglage système, pas seulement en émulation : c'est le seul moyen de valider le ressenti.",
        ],
      },
    ],
  },
  {
    id: "devtools-animations",
    title: "Déboguer avec les DevTools",
    level: 3,
    intro:
      "Le panneau Animations de Chrome : ralentir, rejouer, inspecter.",
    blocks: [
      {
        kind: "list",
        items: [
          "Chrome DevTools → onglet « Animations » (dans le tiroir) : capture les animations de la page, permet de les rejouer au ralenti (10 %, 25 %), de mettre en pause et d'inspecter la courbe.",
          "L'inspecteur de courbe : cliquez sur l'icône à côté d'un `cubic-bezier` pour l'éditer visuellement.",
          "Onglet Rendu → « Émuler prefers-reduced-motion » et « déficience visuelle » pour tester sans changer les réglages système.",
          "Compteur FPS (onglet Rendu) : vérifiez que l'animation tient les 60 images/s sur un appareil modeste.",
          "Si une animation ne démarre pas : vérifiez que les keyframes existent (faute de frappe dans le nom = silence), que l'élément n'est pas `display: none`, et qu'une règle plus spécifique ne l'écrase pas.",
        ],
      },
    ],
  },
  {
    id: "erreurs-subtiles-animations",
    title: "Erreurs subtiles de niveau avancé",
    level: 3,
    intro:
      "Les pièges qui survivent aux premières années.",
    blocks: [
      {
        kind: "list",
        items: [
          "`animation-fill-mode: forwards` qui fige un état final puis empêche une transition ultérieure sur la même propriété.",
          "Deux animations sur le même élément qui animent la même propriété : la dernière de la liste gagne, l'autre est silencieusement ignorée.",
          "`transform` dans les keyframes qui écrase le `transform` de positionnement de l'élément (centrage via translate) : combinez les deux dans les keyframes.",
          "Transitions sur des propriétés calculées en `%` vs `px` : l'interpolation peut surprendre quand le référentiel change.",
          "Oublier `overflow: hidden` sur le parent d'un élément qui glisse depuis l'extérieur : barre de scroll horizontale parasite.",
          "`infinite` + `prefers-reduced-motion` non géré : une boucle infinie que l'utilisateur ne peut pas arrêter.",
          "Animer un élément avec `will-change` permanent : mémoire GPU gaspillée pour rien.",
        ],
      },
    ],
  },
  {
    id: "projet-micro-interactions",
    title: "Projet : bibliothèque de micro-interactions",
    level: 3,
    intro:
      "Construire un catalogue cohérent de feedbacks pour un design system.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définir les tokens de mouvement",
            detail:
              "Durées (`--d-rapide: 150ms`, `--d-moyen: 300ms`), easings (`--ease-sortie: cubic-bezier(0.22, 1, 0.36, 1)`) : toute l'équipe utilise les mêmes valeurs.",
          },
          {
            title: "Cataloguer les composants",
            detail:
              "Boutons, toggles, champs, tooltips, cartes, liens : un fichier HTML de démo par composant, avec chaque état (repos, hover, focus, actif, désactivé).",
          },
          {
            title: "Appliquer les règles de performance",
            detail:
              "`transform`/`opacity` uniquement ; vérifiez chaque animation au compteur FPS sur mobile.",
          },
          {
            title: "Ajouter le repli reduced-motion",
            detail:
              "Le bloc media query global + les remplacements spécifiques (spinners → texte).",
          },
          {
            title: "Documenter",
            detail:
              "Quand utiliser chaque micro-interaction, durées, accessibilité : la doc fait partie de la livraison.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-loader-accessible",
    title: "Projet : loader animé et accessible",
    level: 3,
    intro:
      "Un loader en pur CSS qui n'exclut personne.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir le type de loader",
            detail:
              "Spinner pour une attente courte indéterminée, skeleton pour un contenu dont on connaît la forme, barre déterminée si la progression est mesurable.",
          },
          {
            title: "Le construire en CSS pur",
            detail:
              "Keyframes sur `transform`/`opacity`, `prefers-reduced-motion` prévu dès le départ.",
          },
          {
            title: "Le rendre accessible",
            detail:
              "`role=\"status\"` + texte « Chargement… » pour les lecteurs d'écran ; équivalent statique en reduced-motion.",
          },
          {
            title: "Gérer la fin du chargement",
            detail:
              "Le loader disparaît en fondu rapide (200 ms), le contenu apparaît : pas de flash, pas de saut de layout (réservez l'espace à l'avance).",
          },
        ],
      },
    ],
  },
  {
    id: "ressources-animations",
    title: "Ressources",
    level: 3,
    intro: "Aller plus loin, en commençant toujours par les sources officielles.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          { label: "W3C — CSS Animations", value: "w3.org/TR/css-animations-1 : la spécification des keyframes et propriétés d'animation." },
          { label: "MDN — Animations CSS", value: "developer.mozilla.org/fr/docs/Web/CSS/CSS_animations : guides et références, avec exemples." },
          { label: "MDN — Transitions", value: "La référence complète des transitions et de leurs déclencheurs." },
        ],
      },
      {
        kind: "list",
        items: [
          "Guide : « Learn CSS — Animations » (web.dev/learn/css/animations), progression pédagogique de Google.",
          "Pratique : reproduire les micro-interactions de sites que vous admirez, au ralenti dans les DevTools.",
          "Référence : les easings standards du Material Design pour des courbes éprouvées.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite-animations",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Les animations maîtrisées, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Piloter en JavaScript : `javascript` puis `dom` (Web Animations API, animations déclenchées au scroll).",
          "Animer des interfaces complètes : `react` (transitions d'état, bibliothèques d'animation déclaratives).",
          "Soigner le mouvement accessible : `accessibility` (prefers-reduced-motion, troubles vestibulaires).",
          "Revenir à la roadmap : valider Animations CSS et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

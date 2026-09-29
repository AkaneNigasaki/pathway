import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de l'Accessibilité : concevoir des interfaces
 * utilisables par tout le monde, du HTML sémantique aux patterns ARIA
 * avancés. Contenu général couvrant les parcours Informatique et
 * Frontend Developer. Tous les textes supportent le code inline entre
 * backticks.
 */
export const LEARNING_ACCESSIBILITY: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est l'accessibilité web, pour qui on la construit et pourquoi elle n'est pas une option.",
    blocks: [
      {
        kind: "text",
        text: "L'accessibilité web (souvent abrégée `a11y` — a + 11 lettres + y) consiste à concevoir des interfaces utilisables par tout le monde, y compris les personnes qui naviguent au clavier seul, utilisent un lecteur d'écran, voient mal les faibles contrastes ou sont sensibles au mouvement. Ce n'est pas une fonctionnalité annexe : c'est une qualité de base de l'interface, au même titre que la performance ou la sécurité.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est incontournable : une part importante de la population vit avec un handicap permanent ou temporaire, et les situations contraignantes (plein soleil sur l'écran, bras immobilisé, connexion lente) rendent tout le monde temporairement « en situation de handicap ». Les bonnes pratiques d'accessibilité profitent donc à tous les utilisateurs. C'est aussi une exigence légale dans de nombreux pays et un critère de qualité de plus en plus demandé par les clients.",
      },
      {
        kind: "text",
        text: "Bonne nouvelle : la plus grande partie de l'accessibilité ne coûte rien de plus quand on la prévoit dès le départ. Un HTML sémantique correct, des contrastes suffisants et un focus visible couvrent l'essentiel. L'accessibilité ne se « rajoute » pas à la fin : elle se conçoit.",
      },
    ],
  },
  {
    id: "principes-pour",
    title: "Les quatre principes WCAG",
    level: 1,
    intro:
      "Le référentiel international WCAG résume l'accessibilité en quatre principes, faciles à retenir avec l'acronyme POUR.",
    blocks: [
      {
        kind: "table",
        headers: ["Principe", "Question à se poser", "Exemple concret"],
        rows: [
          ["Perceptible", "L'information est-elle perceptible par tous les sens ?", "Une image porte un texte alternatif ; une vidéo a des sous-titres."],
          ["Utilisable", "L'interface est-elle utilisable au clavier, sans limite de temps abusive ?", "Tout est atteignable avec Tab, les délais sont ajustables."],
          ["Compréhensible", "Le contenu et le fonctionnement sont-ils clairs et prévisibles ?", "Les erreurs de formulaire sont expliquées simplement."],
          ["Robuste", "Le code est-il interprétable par les technologies d'assistance ?", "HTML valide, ARIA correct quand le HTML ne suffit pas."],
        ],
      },
      {
        kind: "text",
        text: "Ces quatre principes structurent les critères WCAG (niveaux A, AA et AAA). Le niveau AA est la cible habituelle des projets professionnels. Vous n'avez pas besoin de tout mémoriser : retenez POUR, et vérifiez chaque écran contre ces quatre questions.",
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
      "L'accessibilité s'appuie sur des bases HTML et CSS solides. Voici ce qu'il faut maîtriser avant.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut savoir",
        fields: [
          {
            label: "HTML sémantique",
            value:
              "Savoir choisir la bonne balise (`button`, `nav`, `main`, `h1`…`h6`, `label`) au lieu de tout faire en `div`. La sémantique est la fondation de toute l'accessibilité : un vrai `<button>` est déjà accessible, un `<div>` cliquable ne l'est pas.",
          },
          {
            label: "CSS de base",
            value:
              "Contrastes, tailles de texte, indicateur de focus visible, media queries (`prefers-reduced-motion`). Une partie de l'accessibilité est purement visuelle.",
          },
          {
            label: "JavaScript et DOM (niveau 3)",
            value:
              "Pour les composants interactifs sur mesure (menus, dialogs, onglets) : gestion du focus, événements clavier, attributs ARIA dynamiques.",
          },
          {
            label: "React (parcours frontend)",
            value:
              "Les composants sur mesure doivent réimplémenter les comportements natifs : rôles, focus, clavier. React n'apporte aucune accessibilité automatique.",
          },
        ],
      },
      {
        kind: "text",
        text: "Si le HTML sémantique est fragile, commencez par là : c'est le levier le plus rentable de tout ce guide.",
      },
    ],
  },
  {
    id: "html-semantique",
    title: "Le HTML sémantique, fondation de tout",
    level: 2,
    intro:
      "Avant ARIA, avant les tests : choisir les bonnes balises. C'est 80 % de l'accessibilité pour 20 % d'effort.",
    blocks: [
      {
        kind: "text",
        text: "Les technologies d'assistance (lecteurs d'écran) ne « voient » pas la page : elles lisent le DOM et s'appuient sur la sémantique des balises pour annoncer « bouton », « navigation », « titre de niveau 2 ». Un `<div onclick>` n'annonce rien et n'est pas activable au clavier. Un `<button>` annonce son rôle, répond à Entrée et Espace, et reçoit le focus : gratuitement.",
      },
      {
        kind: "code",
        language: "html",
        title: "La même interface, accessible ou non",
        code: `<!-- À éviter : un div n'est ni focusable ni activable au clavier -->\n<div class="btn" onclick="envoyer()">Envoyer</div>\n\n<!-- Correct : sémantique native, accessible par défaut -->\n<button type="submit">Envoyer</button>`,
      },
      {
        kind: "list",
        items: [
          "Actions → `<button>` ; liens de navigation → `<a href>` ; jamais l'inverse.",
          "Structure → `<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>`, `<section>` avec titre.",
          "Titres → hiérarchie logique `h1` → `h2` → `h3`, un seul `h1` par page, jamais de niveau sauté.",
          "Formulaires → `<label>` associé à chaque champ, `<fieldset>` + `<legend>` pour les groupes.",
          "Listes → `<ul>` / `<ol>` pour les vraies listes, pas des `div` empilés.",
        ],
      },
    ],
  },
  {
    id: "navigation-clavier",
    title: "La navigation au clavier",
    level: 2,
    intro:
      "Le test le plus simple et le plus révélateur : débranchez la souris et utilisez uniquement le clavier.",
    blocks: [
      {
        kind: "text",
        text: "Toute action faisable à la souris doit être faisable au clavier. Les touches de base : `Tab` (élément interactif suivant), `Maj+Tab` (précédent), `Entrée` (activer un lien ou bouton), `Espace` (activer un bouton, cocher une case), `Échap` (fermer un menu ou dialogue). Si un élément est atteignable et actionnable avec ces touches, la base est saine.",
      },
      {
        kind: "steps",
        steps: [
          {
            title: "Parcourir toute la page avec Tab",
            detail:
              "Partez du haut de la page et avancez avec `Tab`. Chaque élément interactif (lien, bouton, champ) doit recevoir le focus dans un ordre logique, qui suit l'ordre visuel de lecture.",
          },
          {
            title: "Vérifier que chaque action est possible",
            detail:
              "Ouvrez les menus avec Entrée ou Espace, naviguez dans les listes, soumettez les formulaires. Tout ce qui s'ouvre à la souris doit s'ouvrir au clavier.",
          },
          {
            title: "Vérifier la sortie des composants",
            detail:
              "Un menu ouvert doit se fermer avec `Échap` et rendre le focus au bouton qui l'a ouvert. Un dialogue modal doit garder le focus à l'intérieur tant qu'il est ouvert.",
          },
          {
            title: "Repérer les pièges à focus",
            detail:
              "Si le focus « disparaît » (plus aucun indicateur visible) ou reste coincé quelque part, c'est un bug bloquant : l'utilisateur au clavier est perdu.",
          },
        ],
      },
    ],
  },
  {
    id: "focus-visible",
    title: "Un focus toujours visible",
    level: 2,
    intro:
      "L'indicateur de focus est les yeux de l'utilisateur au clavier. Le masquer, c'est le rendre aveugle.",
    blocks: [
      {
        kind: "text",
        text: "Le navigateur affiche par défaut un contour (outline) autour de l'élément qui a le focus. La règle d'or : ne jamais le supprimer avec `outline: none` sans le remplacer par un indicateur au moins aussi visible. Le sélecteur `:focus-visible` permet de n'afficher l'indicateur que pour la navigation au clavier, pas pour le clic souris.",
      },
      {
        kind: "code",
        language: "css",
        title: "Un focus visible et élégant",
        code: `/* Jamais ceci seul : outline: none; */\n\n/* Indicateur personnalisé, visible uniquement au clavier */\n:focus-visible {\n  outline: 3px solid #1a73e8;\n  outline-offset: 2px;\n  border-radius: 4px;\n}`,
      },
      {
        kind: "list",
        items: [
          "Le focus doit avoir un contraste d'au moins 3:1 avec le fond adjacent (critère WCAG 2.4.13).",
          "Ne déplacez jamais le focus automatiquement sans raison (sauf ouverture/fermeture de dialogue).",
          "Après une action qui supprime l'élément focusé, déplacez le focus vers un endroit logique.",
        ],
      },
    ],
  },
  {
    id: "contrastes",
    title: "Les contrastes de couleurs",
    level: 2,
    intro:
      "Un texte trop clair sur fond clair est illisible pour une grande partie des utilisateurs, bien au-delà des seuls malvoyants.",
    blocks: [
      {
        kind: "table",
        headers: ["Cas", "Ratio minimum (WCAG AA)", "Exemple"],
        rows: [
          ["Texte courant (< 18pt)", "4.5:1", "Paragraphes, labels, liens dans le texte."],
          ["Grand texte (≥ 18pt ou 14pt gras)", "3:1", "Titres, gros chiffres."],
          ["Éléments graphiques et focus", "3:1", "Icônes porteuses de sens, bordures de champs, indicateur de focus."],
        ],
      },
      {
        kind: "text",
        text: "Le ratio se mesure avec un outil (pipette de contraste des DevTools, ou l'onglet « Contraste » de l'inspecteur). Testez le texte sur son fond réel, pas sur un aplat théorique : les images de fond et les dégradés changent tout. Et ne transmettez jamais une information par la seule couleur — ajoutez toujours un second indice (texte, icône, motif).",
      },
      {
        kind: "code",
        language: "css",
        title: "Ne pas transmettre l'info par la seule couleur",
        code: `/* Insuffisant : seule la couleur distingue l'erreur */\n.erreur { color: red; }\n\n/* Mieux : couleur + icône + texte explicite */\n.erreur {\n  color: #b3261e;\n  border-left: 4px solid #b3261e;\n}\n/* + message d'erreur textuel : \"Erreur : le format de la date est invalide\" */`,
      },
    ],
  },
  {
    id: "images-alternatives",
    title: "Images et textes alternatifs",
    level: 2,
    intro:
      "Le lecteur d'écran ne voit pas les images : il lit leur alternative. Chaque image doit avoir une stratégie.",
    blocks: [
      {
        kind: "fields",
        title: "Choisir la bonne alternative",
        fields: [
          {
            label: "Image informative",
            value:
              "`alt` décrit la fonction ou le contenu : `alt=\"Graphique : les ventes ont doublé en 2026\"`. Court, utile, sans « image de » (le lecteur l'annonce déjà).",
          },
          {
            label: "Image décorative",
            value:
              "`alt=\"\"` (vide) : le lecteur d'écran l'ignore. En CSS de préférence si l'image est purement décorative.",
          },
          {
            label: "Image lien ou bouton",
            value:
              "`alt` décrit la destination ou l'action : `alt=\"Voir le profil d'Akane\"`, jamais `alt=\"photo\"`.",
          },
          {
            label: "Image complexe",
            value:
              "Graphique détaillé : `alt` court + description longue à proximité (légende, tableau de données, lien « description détaillée »).",
          },
        ],
      },
      {
        kind: "code",
        language: "html",
        title: "Alternatives correctes",
        code: `<!-- Informative -->\n<img src="graphique-ventes.png" alt="Graphique : les ventes ont doublé entre janvier et juin 2026">\n\n<!-- Décorative : ignorée par les lecteurs d'écran -->\n<img src="vague-decorative.svg" alt="">\n\n<!-- Icône seule dans un bouton : le bouton porte le nom -->\n<button aria-label="Fermer le menu">\n  <img src="croix.svg" alt="">\n</button>`,
      },
    ],
  },
  {
    id: "formulaires-bases",
    title: "Des formulaires utilisables par tous",
    level: 2,
    intro:
      "Les formulaires sont le premier lieu d'échec d'accessibilité. Quelques règles suffisent à les rendre robustes.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Un champ correctement étiqueté",
        code: `<!-- Le label est associé au champ : cliquer le label donne le focus -->\n<label for="email">Adresse e-mail</label>\n<input type="email" id="email" name="email" required\n       aria-describedby="email-aide">\n<p id="email-aide\">Nous ne partagerons jamais votre e-mail.</p>`,
      },
      {
        kind: "list",
        items: [
          "Chaque champ a un `<label>` visible et associé (`for` + `id`, ou champ imbriqué dans le label).",
          "Le `placeholder` n'est jamais un label : il disparaît à la saisie et n'est pas lu de façon fiable.",
          "Les aides et les erreurs sont liées au champ avec `aria-describedby`.",
          "Les erreurs sont décrites en texte clair et annoncées (voir le niveau 3 : zones live).",
          "Le bouton de soumission est un vrai `<button type=\"submit\">`, activable avec Entrée depuis n'importe quel champ.",
        ],
      },
    ],
  },
  {
    id: "aria-essentiel",
    title: "ARIA : l'essentiel sans les pièges",
    level: 2,
    intro:
      "ARIA enrichit la sémantique quand le HTML seul ne suffit pas. Mal utilisé, il aggrave les choses.",
    blocks: [
      {
        kind: "text",
        text: "Première règle d'ARIA : si un élément HTML natif fait le travail, utilisez-le plutôt qu'un rôle ARIA. Un `<nav>` vaut mieux qu'un `<div role=\"navigation\">`, et un `<button>` vaut mieux qu'un `<div role=\"button\" tabindex=\"0\">` bricolé au clavier. ARIA ne répare pas un mauvais HTML : il décrit des composants sur mesure que le HTML ne peut pas exprimer (onglets, curseurs, boîtes de dialogue personnalisées).",
      },
      {
        kind: "fields",
        title: "Les attributs ARIA les plus utiles",
        fields: [
          {
            label: "`aria-label`",
            value:
              "Donne un nom accessible à un élément qui n'en a pas en texte visible (bouton icône seule : `aria-label=\"Fermer\"`).",
          },
          {
            label: "`aria-labelledby` / `aria-describedby`",
            value:
              "Référencent l'id d'un autre élément comme nom ou description (titre de dialogue, aide de champ).",
          },
          {
            label: "`aria-expanded`",
            value:
              "`true`/`false` sur le bouton qui ouvre un menu ou un accordéon : annonce l'état au lecteur d'écran.",
          },
          {
            label: "`aria-hidden=\"true\"`",
            value:
              "Masque un élément décoratif aux technologies d'assistance. Jamais sur un élément focusable ou porteur d'information.",
          },
          {
            label: "`aria-live`",
            value:
              "Fait annoncer les mises à jour dynamiques (notifications, résultats de recherche) : `polite` ou `assertive`.",
          },
        ],
      },
      {
        kind: "code",
        language: "html",
        title: "Un bouton d'accordéon avec état",
        code: `<button aria-expanded="false" aria-controls="section-1\">\n  Questions fréquentes\n</button>\n<div id="section-1" hidden>\n  <!-- contenu révélé quand aria-expanded passe à true -->\n</div>`,
      },
    ],
  },
  {
    id: "tester-au-clavier",
    title: "Protocole de test au clavier",
    level: 2,
    intro:
      "Un protocole simple, à appliquer sur chaque page avant de considérer le travail terminé.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Tabuler toute la page",
            detail:
              "De haut en bas avec `Tab` / `Maj+Tab`. L'ordre suit la lecture visuelle, le focus est toujours visible, aucun élément interactif n'est sauté.",
          },
          {
            title: "Activer chaque contrôle",
            detail:
              "`Entrée` et `Espace` sur les boutons, flèches dans les listes et les groupes radio, `Échap` pour fermer menus et dialogues.",
          },
          {
            title: "Remplir et soumettre chaque formulaire",
            detail:
              "Labels annoncés, erreurs comprises sans la souris, soumission avec `Entrée`. Provoquez volontairement des erreurs pour vérifier leur annonce.",
          },
          {
            title: "Tester les composants dynamiques",
            detail:
              "Menus, onglets, carrousels, modales : ouverture, navigation interne, fermeture, retour du focus à l'élément d'origine.",
          },
          {
            title: "Vérifier l'absence de piège",
            detail:
              "Le focus ne doit jamais disparaître ni rester coincé. Si c'est le cas, c'est un bug bloquant, pas un détail.",
          },
        ],
      },
    ],
  },
  {
    id: "tests-automatises-intro",
    title: "Les tests automatisés : utiles mais insuffisants",
    level: 2,
    intro:
      "Les outils automatisés détectent une partie des problèmes. Ils ne remplacent ni le clavier ni le lecteur d'écran.",
    blocks: [
      {
        kind: "text",
        text: "Un audit automatisé (Lighthouse dans les DevTools, extension axe DevTools) repère les problèmes mécaniques : images sans `alt`, contrastes insuffisants, labels manquants, hiérarchie de titres incohérente. C'est un excellent filet de sécurité, à lancer régulièrement. Mais il ne voit pas l'essentiel : l'ordre de tabulation a-t-il du sens ? Le focus est-il géré dans la modale ? L'annonce du lecteur d'écran est-elle compréhensible ? Ces questions exigent un test manuel.",
      },
      {
        kind: "list",
        items: [
          "Lighthouse (onglet dédié dans les DevTools) : score d'accessibilité + liste d'erreurs concrètes.",
          "axe DevTools (extension navigateur) : analyse fine, sans quitter la page, avec explications et correctifs.",
          "Règle d'équipe : aucun code ne part avec une erreur automatisée non traitée — c'est la partie facile.",
          "Ensuite seulement : test clavier complet, puis test au lecteur d'écran sur les parcours critiques.",
        ],
      },
    ],
  },
  {
    id: "prefers-reduced-motion",
    title: "Respecter prefers-reduced-motion",
    level: 2,
    intro:
      "Certains utilisateurs sont sensibles au mouvement : la plateforme le signale, le site doit l'honorer.",
    blocks: [
      {
        kind: "text",
        text: "Les systèmes d'exploitation proposent un réglage « réduire les animations ». Le CSS peut le détecter avec la media query `prefers-reduced-motion: reduce` et, dans ce cas, désactiver ou atténuer les animations non essentielles (parallaxe, carrousels automatiques, transitions décoratives). Les animations porteuses d'information (indicateur de chargement) se remplacent par un équivalent statique.",
      },
      {
        kind: "code",
        language: "css",
        title: "Couper les animations non essentielles",
        code: `@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.01ms !important;\n    scroll-behavior: auto !important;\n  }\n}`,
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Les erreurs les plus courantes",
    level: 2,
    intro:
      "La majorité des barrières d'accessibilité vient d'une poignée d'erreurs qui se répètent partout.",
    blocks: [
      {
        kind: "list",
        items: [
          "`<div onclick>` à la place d'un `<button>` : ni focusable, ni activable au clavier, ni annoncé.",
          "`outline: none` sans indicateur de remplacement : l'utilisateur au clavier ne sait plus où il est.",
          "Le `placeholder` utilisé comme seul label : il disparaît et n'est pas fiable pour les lecteurs d'écran.",
          "Images porteuses d'information sans `alt` : le lecteur annonce juste « image » ou le nom du fichier.",
          "Contrastes insuffisants, surtout le texte gris clair sur fond blanc.",
          "Hiérarchie de titres incohérente (saut de `h1` à `h4`, plusieurs `h1`) : la « table des matières » de la page est fausse.",
          "`aria-hidden=\"true\"` sur un élément qui contient du focus ou de l'information.",
          "Vidéos sans sous-titres, podcasts sans transcription.",
          "Timeouts de session sans avertissement ni possibilité de prolonger.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "wcag-niveaux",
    title: "WCAG : niveaux A, AA, AAA",
    level: 3,
    intro:
      "Le référentiel international décrypté : ce que signifient les trois niveaux de conformité.",
    blocks: [
      {
        kind: "text",
        text: "Les WCAG (Web Content Accessibility Guidelines) du W3C définissent des critères de succès classés en trois niveaux : A (minimum vital), AA (cible standard) et AAA (exigence renforcée, rarement atteignable sur tout un site).",
      },
      {
        kind: "text",
        text: "Sans référentiel commun, « accessible » ne veut rien dire : les WCAG donnent des critères testables (contraste mesuré, présence d'alternatives, ordre du focus) sur lesquels équipes, clients et législateurs peuvent s'aligner.",
      },
      {
        kind: "text",
        text: "Visez AA sur l'ensemble du site : c'est le niveau exigé par la plupart des réglementations et des appels d'offres. AAA se vise critère par critère (ex. contraste renforcé 7:1) là où c'est pertinent.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "Chaque niveau inclut les critères des niveaux inférieurs : AA = tous les critères A + les critères AA. Un critère est soit respecté, soit non : la conformité se mesure page par page, pas « en moyenne ».",
          },
          {
            label: "Erreur fréquente",
            value:
              "Annoncer « site conforme WCAG AAA » : AAA complet est pratiquement impossible sur un site réel (il exigerait par exemple aucun minutage et un langage très simple partout). Méfiez-vous des promesses de conformité totale automatique.",
          },
          {
            label: "Bonne pratique",
            value:
              "Documentez les critères AA un par un dans votre checklist d'équipe, et faites auditer les parcours critiques par un humain, pas seulement par un outil.",
          },
        ],
      },
    ],
  },
  {
    id: "wcag-2-2-nouveautes",
    title: "Ce que WCAG 2.2 a ajouté",
    level: 3,
    intro:
      "La version 2.2 (2023) a introduit des critères très concrets, notamment sur le tactile et l'authentification.",
    blocks: [
      {
        kind: "table",
        headers: ["Critère (AA)", "Ce qu'il exige", "Conséquence pratique"],
        rows: [
          ["2.4.11 Focus non masqué", "L'élément focusé ne doit pas être entièrement caché par un autre contenu.", "Attention aux en-têtes fixes qui recouvrent le focus lors du scroll."],
          ["2.5.8 Taille de cible minimum", "Zone tactile d'au moins 24×24 px CSS (exceptions : espacement suffisant, équivalent redimensionnable).", "Les petites icônes cliquables serrées deviennent non conformes."],
          ["3.3.7 Authentification accessible", "Pas de test cognitif (résoudre un calcul, reconnaître un objet) sans alternative.", "CAPTCHA visuel seul interdit ; proposez une alternative non cognitive."],
          ["3.2.6 Aide contextuelle", "Une aide (humaine ou automatisée) disponible pour les tâches complexes.", "Documentation, chat d'aide ou exemples à proximité des formulaires complexes."],
        ],
      },
      {
        kind: "text",
        text: "Le point le plus impactant au quotidien est la taille de cible : 24×24 px CSS minimum en AA (44×44 en AAA). Sur mobile, c'est souvent déjà le cas ; sur desktop, les petites icônes d'action doivent être revues.",
      },
    ],
  },
  {
    id: "aria-regle-d-or",
    title: "La règle d'or d'ARIA",
    level: 3,
    intro:
      "Le principe qui évite 90 % des erreurs ARIA : ne pas utiliser ARIA quand le HTML suffit.",
    blocks: [
      {
        kind: "text",
        text: "La spécification WAI-ARIA elle-même l'énonce : si vous pouvez utiliser un élément HTML natif avec la sémantique et le comportement voulus, faites-le. Chaque rôle ARIA que vous ajoutez à la main est un comportement que vous devez réimplémenter : focus, clavier, états, annonces. Le HTML natif vous donne tout cela gratuitement, testé par des millions d'utilisateurs.",
      },
      {
        kind: "table",
        headers: ["Besoin", "Solution native (préférée)", "Équivalent ARIA (si vraiment nécessaire)"],
        rows: [
          ["Bouton d'action", "`<button>`", "`role=\"button\"` + tabindex + gestion Entrée/Espace"],
          ["Navigation principale", "`<nav>`", "`role=\"navigation\"`"],
          ["Titre de section", "`<h2>`", "`role=\"heading\" aria-level=\"2\"`"],
          ["Case à cocher", "`<input type=\"checkbox\">`", "`role=\"checkbox\"` + aria-checked + clavier"],
          ["Champ texte", "`<input>` + `<label>`", "`role=\"textbox\"` + nom accessible manuel"],
          ["Dialogue modal", "`<dialog>` + showModal()", "`role=\"dialog\"` + focus trap manuel"],
        ],
      },
      {
        kind: "text",
        text: "ARIA est indispensable pour les vrais composants sur mesure (onglets, sliders, grilles de données interactives, arbres). Pour le reste, c'est un aveu d'échec du HTML : corrigez le HTML d'abord.",
      },
    ],
  },
  {
    id: "roles-aria",
    title: "Les rôles ARIA courants",
    level: 3,
    intro:
      "Quand le HTML ne suffit vraiment pas : les rôles qui décrivent des composants sur mesure.",
    blocks: [
      {
        kind: "table",
        headers: ["Rôle", "Usage", "Comportement à implémenter"],
        rows: [
          ["`tablist` / `tab` / `tabpanel`", "Onglets sur mesure", "Flèches gauche/droite, aria-selected, tabpanel associé."],
          ["`dialog` / `alertdialog`", "Fenêtre modale personnalisée", "Focus trap, Échap, retour du focus."],
          ["`menu` / `menuitem`", "Menu d'application (pas la navigation du site)", "Flèches, Échap, sous-menus."],
          ["`switch`", "Interrupteur on/off", "Espace pour basculer, aria-checked."],
          ["`slider`", "Curseur de valeur", "Flèches + PageUp/PageDown, aria-valuenow/min/max."],
          ["`progressbar`", "Progression", "aria-valuenow mis à jour ; rôle informatif seul."],
          ["`status` / `alert`", "Messages dynamiques", "Zones live implicites (polite / assertive)."],
          ["`tooltip`", "Infobulle", "Associée via aria-describedby, accessible au focus pas seulement au survol."],
        ],
      },
      {
        kind: "text",
        text: "Chaque rôle du tableau implique un clavier et des états précis, documentés dans le guide des pratiques ARIA du W3C (APG). Ne créez jamais un rôle « à l'intuition » : suivez le pattern documenté, il a été testé avec les lecteurs d'écran réels.",
      },
    ],
  },
  {
    id: "etats-proprietes-aria",
    title: "États et propriétés ARIA",
    level: 3,
    intro:
      "Les rôles décrivent ce qu'est un composant ; les états et propriétés décrivent ce qu'il fait en ce moment.",
    blocks: [
      {
        kind: "fields",
        title: "Les plus utilisés",
        fields: [
          {
            label: "`aria-expanded`",
            value:
              "Le composant est-il déplié ? Boutons de menu, accordéons, arborescences. `true` / `false`.",
          },
          {
            label: "`aria-selected` / `aria-checked` / `aria-pressed`",
            value:
              "État de sélection (onglets, options), de case (checkbox sur mesure), d'appui (bouton toggle).",
          },
          {
            label: "`aria-disabled` vs `disabled`",
            value:
              "`disabled` retire l'élément du focus et de la soumission ; `aria-disabled=\"true\"` le garde focusable en annonçant l'état — utile pour expliquer pourquoi une action est indisponible.",
          },
          {
            label: "`aria-current`",
            value:
              "Marque l'élément courant : `page` pour le lien actif de navigation, `step` / `date` dans les parcours.",
          },
          {
            label: "`aria-hidden`",
            value:
              "Retire du « arbre d'accessibilité » : icônes décoratives, contenu dupliqué. Jamais sur du contenu focusable.",
          },
          {
            label: "`aria-modal=\"true\"`",
            value:
              "Indique qu'une boîte de dialogue est modale : le reste de la page est inerte pour les technologies d'assistance.",
          },
          {
            label: "`aria-keyshortcuts`",
            value:
              "Annonce les raccourcis clavier d'un élément, ex. `aria-keyshortcuts=\"Control+s\"`.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle de mise à jour : chaque fois que l'état visuel change, l'attribut ARIA correspondant doit changer en même temps, dans le même gestionnaire d'événement. Un `aria-expanded=\"false\"` sur un menu ouvert est pire que l'absence d'attribut : c'est une information fausse.",
      },
    ],
  },
  {
    id: "landmarks",
    title: "Les landmarks : la carte de la page",
    level: 3,
    intro:
      "Les régions de repère permettent aux utilisateurs de lecteurs d'écran de sauter directement à la zone voulue.",
    blocks: [
      {
        kind: "text",
        text: "Les lecteurs d'écran proposent une navigation par landmarks : l'utilisateur liste les régions (« bannière, navigation, contenu principal, pied de page ») et saute directement à celle qui l'intéresse. Les balises HTML5 créent ces landmarks nativement : `<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>`, `<section>` (avec nom accessible) et `<form>` (avec nom accessible).",
      },
      {
        kind: "code",
        language: "html",
        title: "Structure de landmarks correcte",
        code: `<header><!-- bannière --></header>\n<nav aria-label="Navigation principale"><!-- ... --></nav>\n<main id="contenu">\n  <h1>Titre de la page</h1>\n  <!-- contenu principal unique par page -->\n</main>\n<aside aria-label="Articles liés"><!-- ... --></aside>\n<footer><!-- pied de page --></footer>`,
      },
      {
        kind: "list",
        items: [
          "Un seul `<main>` par page : c'est la destination du lien d'évitement.",
          "Plusieurs `<nav>` ? Nommez-les avec `aria-label` (« principale », « fil d'Ariane », « pied de page ») pour les distinguer.",
          "Pas de landmark = page « plate » : l'utilisateur doit tout parcourir linéairement.",
          "Trop de landmarks (un `<section>` sans nom à chaque bloc) = bruit : ne balisez en landmark que les vraies régions.",
        ],
      },
    ],
  },
  {
    id: "skip-links",
    title: "Les liens d'évitement",
    level: 3,
    intro:
      "Permettre d'aller directement au contenu sans tabuler tout l'en-tête à chaque page.",
    blocks: [
      {
        kind: "text",
        text: "Sur un site avec un en-tête riche, l'utilisateur au clavier doit sinon traverser des dizaines de liens à chaque page. Le lien d'évitement (« Aller au contenu »), premier élément focusable de la page, saute directement au `<main>`. Invisible au repos, il apparaît au focus.",
      },
      {
        kind: "code",
        language: "html",
        title: "Lien d'évitement + CSS",
        code: `<!-- Tout en haut du body, premier élément focusable -->\n<a class="skip-link" href="#contenu">Aller au contenu principal</a>\n\n<main id="contenu" tabindex="-1">\n  <!-- tabindex="-1" permet de recevoir le focus programmatique -->\n</main>`,
      },
      {
        kind: "code",
        language: "css",
        title: "Visible uniquement au focus",
        code: `.skip-link {\n  position: absolute;\n  top: -100px;\n  left: 0;\n  background: #000;\n  color: #fff;\n  padding: 0.75rem 1rem;\n  z-index: 100;\n}\n.skip-link:focus {\n  top: 0;\n}`,
      },
    ],
  },
  {
    id: "ordre-tabulation",
    title: "Ordre de tabulation et tabindex",
    level: 3,
    intro:
      "L'ordre du focus suit le DOM. Le manipuler est presque toujours une erreur.",
    blocks: [
      {
        kind: "text",
        text: "Par défaut, `Tab` suit l'ordre du DOM ; `tabindex` permet d'ajuster ce comportement, mais seules les valeurs `0` et `-1` sont saines.",
      },
      {
        kind: "text",
        text: "Certains composants (dialogues, menus, widgets) doivent recevoir le focus par script sans pour autant entrer dans l'ordre naturel de tabulation. `tabindex` offre ce contrôle fin.",
      },
      {
        kind: "text",
        text: "`tabindex=\"0\"` : rendre focusable un élément qui ne l'est pas nativement (rare, ex. conteneur de dialogue). `tabindex=\"-1\"` : rendre focusable par script uniquement (cible de lien d'évitement, élément restauré après fermeture).",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "Un `tabindex` positif (> 0) fait passer l'élément avant tout l'ordre naturel, dans l'ordre des valeurs : c'est un piège qui casse la logique de lecture et doit être banni. Si l'ordre visuel ne correspond pas à l'ordre du DOM, corrigez le DOM ou le CSS, pas avec tabindex.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`tabindex=\"1\"`, `tabindex=\"2\"`… sur les champs d'un formulaire « pour forcer l'ordre » : dès qu'un élément est ajouté ou retiré, l'ordre devient incohérent et la maintenance un cauchemar.",
          },
          {
            label: "Bonne pratique",
            value:
              "Zéro `tabindex` positif dans le code. Si l'ordre de tabulation est mauvais, c'est le DOM ou le positionnement CSS qu'il faut corriger.",
          },
        ],
      },
    ],
  },
  {
    id: "focus-trap",
    title: "Le piège à focus des dialogues modaux",
    level: 3,
    intro:
      "Une modale ouverte doit garder le clavier à l'intérieur jusqu'à sa fermeture. Voici le mécanisme.",
    blocks: [
      {
        kind: "text",
        text: "Quand un dialogue modal s'ouvre : le focus va sur le dialogue (ou son premier contrôle), `Tab` boucle à l'intérieur (du dernier élément on revient au premier), `Échap` ferme, et à la fermeture le focus revient à l'élément qui a ouvert le dialogue. La balise native `<dialog>` avec `showModal()` gère tout cela gratuitement, y compris l'inertie du reste de la page.",
      },
      {
        kind: "code",
        language: "html",
        title: "Dialogue natif accessible",
        code: `<button id="ouvrir">Voir les détails</button>\n\n<dialog id="details" aria-labelledby="titre-details">\n  <h2 id="titre-details">Détails du projet</h2>\n  <p>Contenu…</p>\n  <button id="fermer">Fermer</button>\n</dialog>\n\n<script>\n  const d = document.getElementById('details');\n  document.getElementById('ouvrir').onclick = () => d.showModal();\n  document.getElementById('fermer').onclick = () => d.close();\n  // Échap ferme nativement ; le focus revient au bouton d'ouverture.\n<\/script>`,
      },
      {
        kind: "list",
        items: [
          "Préférez toujours `<dialog>` natif à une modale en `div` : le focus trap, Échap et l'inertie sont intégrés.",
          "Si vous devez coder un piège manuel : écoutez `Tab` sur le conteneur et rebouclez premier ↔ dernier élément focusable.",
          "Mémorisez l'élément qui avait le focus avant l'ouverture pour le restaurer à la fermeture.",
        ],
      },
    ],
  },
  {
    id: "aria-live",
    title: "Les zones live : annoncer le dynamique",
    level: 3,
    intro:
      "Les lecteurs d'écran ne relisent pas la page toute seule : il faut leur signaler les mises à jour.",
    blocks: [
      {
        kind: "text",
        text: "`aria-live` désigne une zone dont les changements sont annoncés automatiquement : `polite` (à la fin de la lecture en cours) ou `assertive` (interruption immédiate, réservé aux urgences).",
      },
      {
        kind: "text",
        text: "Un utilisateur voyant remarque qu'un « 3 résultats trouvés » s'affiche après sa recherche ; un utilisateur de lecteur d'écran, non — sauf si la zone est live. Sans cela, les interfaces dynamiques sont silencieuses.",
      },
      {
        kind: "text",
        text: "Notifications toast, compteurs de résultats, progression d'upload, messages de validation de formulaire, minuteur. `polite` par défaut ; `assertive` uniquement pour les erreurs bloquantes (session expirée).",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "La zone existe dans le DOM dès le chargement (même vide) avec `aria-live` ; quand son contenu change, le lecteur d'écran annonce le nouveau texte. `aria-atomic=\"true\"` fait annoncer toute la zone plutôt que le seul nœud modifié.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Créer la zone live au moment de l'annonce : certains lecteurs ne détectent pas les zones ajoutées dynamiquement. Autre piège : `assertive` pour des notifications banales, qui coupe la lecture en cours et énerve.",
          },
          {
            label: "Bonne pratique",
            value:
              "Zones live présentes dès le chargement, `polite` par défaut, messages concis et stables (pas de re-annonce à chaque frappe).",
          },
        ],
      },
      {
        kind: "code",
        language: "html",
        title: "Zone de notification live",
        code: `<!-- Présente dès le chargement, vide au départ -->\n<div id="notifications" aria-live="polite" aria-atomic="true"></div>\n\n<script>\n  // Quand le contenu change, il est annoncé poliment\n  document.getElementById('notifications').textContent =\n    'Fichier enregistré avec succès.';\n<\/script>`,
      },
    ],
  },
  {
    id: "formulaires-erreurs",
    title: "Annoncer les erreurs de formulaire",
    level: 3,
    intro:
      "Une erreur que l'utilisateur ne perçoit pas est une impasse. Le formulaire doit guider vers la correction.",
    blocks: [
      {
        kind: "text",
        text: "À la soumission invalide : déplacez le focus vers le premier champ en erreur (ou vers un résumé d'erreurs en haut du formulaire avec des liens d'ancrage vers chaque champ), marquez le champ avec `aria-invalid=\"true\"`, liez le message d'erreur avec `aria-describedby`, et décrivez le problème en texte clair avec la correction attendue (« La date doit être au format JJ/MM/AAAA »).",
      },
      {
        kind: "code",
        language: "html",
        title: "Champ en erreur correctement annoncé",
        code: `<label for="date">Date de naissance</label>\n<input type="text" id="date" name="date"\n       aria-invalid="true"\n       aria-describedby="date-erreur">\n<p id="date-erreur" role="alert\">\n  Erreur : utilisez le format JJ/MM/AAAA, par exemple 29/09/2026.\n</p>`,
      },
      {
        kind: "list",
        items: [
          "`role=\"alert\"` (= `aria-live=\"assertive\"` implicite) : l'erreur est annoncée immédiatement.",
          "Ne vous contentez pas d'une bordure rouge : le message texte est indispensable.",
          "Validez aussi côté client au fil de la saisie avec parcimonie : annoncer une erreur à chaque frappe est épuisant.",
          "Le résumé d'erreurs en haut du formulaire aide quand plusieurs champs sont concernés.",
        ],
      },
    ],
  },
  {
    id: "champs-obligatoires",
    title: "Champs obligatoires et regroupements",
    level: 3,
    intro:
      "Signaler clairement ce qui est requis, et regrouper les champs liés pour les lecteurs d'écran.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Groupe de champs avec légende",
        code: `<fieldset>\n  <legend>Adresse de livraison</legend>\n  <label for="rue">Rue</label>\n  <input type="text" id="rue" required>\n  <label for="ville">Ville</label>\n  <input type="text" id="ville" required>\n</fieldset>`,
      },
      {
        kind: "list",
        items: [
          "`required` (ou `aria-required=\"true\"`) : le lecteur annonce « obligatoire ». Indiquez-le aussi visuellement, en texte (« * obligatoire »), pas par la seule couleur ou l'astérisque isolé.",
          "`<fieldset>` + `<legend>` : le lecteur annonce la légende avant chaque champ du groupe — indispensable pour les groupes radio/checkbox.",
          "Pour les boutons radio : un seul `<fieldset>`, une `<legend>` qui pose la question, un `<label>` par option.",
          "Évitez les formulaires qui n'indiquent l'obligation qu'à la soumission : annoncez-la dès l'affichage.",
        ],
      },
    ],
  },
  {
    id: "tableaux",
    title: "Des tableaux de données lisibles",
    level: 3,
    intro:
      "Un tableau mal structuré est une suite de cellules sans repères pour le lecteur d'écran.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Tableau correctement structuré",
        code: `<table>\n  <caption>Ventes par trimestre 2026 (en k€)</caption>\n  <thead>\n    <tr>\n      <th scope="col">Trimestre</th>\n      <th scope="col">Ventes</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope="row">T1</th>\n      <td>120</td>\n    </tr>\n  </tbody>\n</table>`,
      },
      {
        kind: "list",
        items: [
          "`<caption>` : le titre du tableau, annoncé en premier.",
          "`<th scope=\"col\" | \"row\">` : associe chaque cellule d'en-tête à sa ligne ou colonne — le lecteur peut alors annoncer « T1, Ventes : 120 ».",
          "N'utilisez un `<table>` que pour des données tabulaires, jamais pour la mise en page.",
          "Tableaux complexes (en-têtes fusionnés) : `id` + `headers` sur les cellules, ou mieux, simplifiez le tableau.",
        ],
      },
    ],
  },
  {
    id: "listes-structure",
    title: "Listes et structure du contenu",
    level: 3,
    intro:
      "Les lecteurs d'écran annoncent le nombre d'éléments d'une liste : une information d'orientation précieuse.",
    blocks: [
      {
        kind: "text",
        text: "Utilisez `<ul>`, `<ol>` et `<dl>` pour les vraies listes : le lecteur annonce « liste de 5 éléments » et permet de naviguer d'élément en élément. Une suite de `<div>` ou de `<br>` ne donne aucun repère. De même, les citations vont dans `<blockquote>`, le code dans `<code>`/`<pre>`, les abréviations peuvent utiliser `<abbr title=\"...\">`.",
      },
      {
        kind: "list",
        items: [
          "Menus de navigation : `<nav>` + `<ul>` — la structure la plus robuste.",
          "Fil d'Ariane : `<nav aria-label=\"Fil d'Ariane\">` + liste ordonnée.",
          "Évitez les listes à un seul élément et les listes imbriquées trop profondes.",
        ],
      },
    ],
  },
  {
    id: "multimedia",
    title: "Multimédia : sous-titres et transcriptions",
    level: 3,
    intro:
      "Une vidéo sans sous-titres exclut les sourds ; un podcast sans transcription exclut les mêmes — et nuit au référencement.",
    blocks: [
      {
        kind: "table",
        headers: ["Contenu", "Alternative requise", "Détail"],
        rows: [
          ["Vidéo avec dialogue", "Sous-titres synchronisés", "Élément `<track kind=\"captions\">` ; les sous-titres automatiques seuls sont insuffisants s'ils sont approximatifs."],
          ["Vidéo informative", "Audio-description", "Piste qui décrit les éléments visuels importants entre les dialogues."],
          ["Audio seul (podcast)", "Transcription textuelle", "Texte intégral à proximité du lecteur, structuré avec titres."],
          ["GIF / vidéo décorative", "Aucune (ou `alt=\"\"`)", "Si elle n'apporte aucune information, elle doit être ignorable et non autoplay avec du son."],
        ],
      },
      {
        kind: "code",
        language: "html",
        title: "Vidéo avec sous-titres",
        code: `<video controls preload="metadata">\n  <source src="demo.mp4" type="video/mp4">\n  <track kind="captions" srclang="fr" label="Français"\n         src="demo-fr.vtt" default>\n  Votre navigateur ne supporte pas la vidéo.\n</video>`,
      },
      {
        kind: "list",
        items: [
          "Pas de lecture automatique avec du son : c'est désorientant et bloqué par les navigateurs.",
          "Les lecteurs vidéo personnalisés doivent être entièrement contrôlables au clavier.",
        ],
      },
    ],
  },
  {
    id: "contrastes-avances",
    title: "Contrastes : les cas avancés",
    level: 3,
    intro:
      "Au-delà du texte : icônes, bordures de champs, états et focus ont aussi des exigences.",
    blocks: [
      {
        kind: "table",
        headers: ["Élément", "Exigence AA", "Piège classique"],
        rows: [
          ["Icône porteuse de sens", "3:1 avec le fond", "Icône grise sur fond gris clair dans une barre d'outils."],
          ["Bordure de champ", "3:1 avec le fond", "Champ à bordure quasi invisible sur fond blanc."],
          ["Indicateur de focus", "3:1 avec le fond adjacent", "Focus bleu clair sur fond blanc."],
          ["Texte sur image", "4.5:1 sur la zone réelle", "Photo claire derrière un texte blanc sans voile."],
          ["État désactivé", "Exempté", "Un bouton désactivé peut être peu contrasté — mais son état doit être clair autrement."],
          ["Logos et marques", "Exemptés", "Pas d'exigence, mais la lisibilité reste souhaitable."],
        ],
      },
      {
        kind: "text",
        text: "Mesurez toujours sur le rendu réel : les DevTools affichent le ratio de contraste d'un texte sélectionné dans l'inspecteur. Pour le texte sur image, ajoutez un voile (overlay semi-transparent) ou une ombre portée suffisante, et testez sur plusieurs images si le fond varie.",
      },
    ],
  },
  {
    id: "info-couleur-seule",
    title: "Ne jamais coder l'info par la seule couleur",
    level: 3,
    intro:
      "8 % des hommes ont un trouble de la vision des couleurs : la couleur seule n'est jamais un canal fiable.",
    blocks: [
      {
        kind: "table",
        headers: ["Cas", "Insuffisant", "Accessible"],
        rows: [
          ["Champ en erreur", "Bordure rouge", "Bordure + icône + message texte explicite."],
          ["Statut (en ligne / hors ligne)", "Pastille verte / grise", "Pastille + libellé « En ligne » / « Hors ligne »."],
          ["Graphique", "Courbes distinguées par couleur", "Couleurs + motifs pointillés + légende textuelle."],
          ["Lien dans le texte", "Couleur seule", "Couleur + soulignement (ou autre distinction)."],
          ["Prix soldé", "Prix en rouge", "Prix barré + nouveau prix + mention « -30 % »."],
        ],
      },
      {
        kind: "text",
        text: "Testez vos interfaces en niveaux de gris (filtre du système ou DevTools) : si l'information reste compréhensible, le doublage est réussi.",
      },
    ],
  },
  {
    id: "daltonisme",
    title: "Concevoir pour le daltonisme",
    level: 3,
    intro:
      "Les troubles de la vision des couleurs sont fréquents et invisibles : quelques réflexes de conception.",
    blocks: [
      {
        kind: "list",
        items: [
          "Évitez les paires problématiques : rouge/vert (la plus fréquente), bleu/violet, vert/marron.",
          "Doublez toujours la couleur d'un second indice : forme, texte, motif, position.",
          "Les outils de simulation (DevTools → « émuler une déficience visuelle ») montrent votre page vue par un daltonien.",
          "Pour les graphiques : palettes testées pour le daltonisme + motifs ou étiquettes directes sur les courbes.",
          "Le mode sombre ne règle rien tout seul : les paires à risque restent à risque sur fond sombre.",
        ],
      },
    ],
  },
  {
    id: "tailles-cibles",
    title: "Tailles des zones tactiles",
    level: 3,
    intro:
      "Des cibles trop petites ou trop serrées pénalisent le tactile, les tremblements et la navigation au doigt.",
    blocks: [
      {
        kind: "text",
        text: "WCAG 2.2 exige en AA une cible d'au moins 24×24 px CSS (2.5.8), 44×44 en AAA. En pratique, visez 44×44 : c'est la recommandation des plateformes mobiles et c'est confortable pour tout le monde. L'astuce : la zone cliquable peut dépasser l'élément visuel grâce au padding ou à un pseudo-élément élargi.",
      },
      {
        kind: "code",
        language: "css",
        title: "Élargir la zone tactile sans changer le visuel",
        code: `/* Icône de 16px, zone tactile de 44px */\n.icone-btn {\n  position: relative;\n  width: 16px;\n  height: 16px;\n}\n.icone-btn::after {\n  content: "";\n  position: absolute;\n  inset: -14px; /* 16 + 2×14 = 44px de zone tactile */\n}`,
      },
      {
        kind: "list",
        items: [
          "Espacez les cibles adjacentes : deux boutons collés se touchent par erreur.",
          "Exceptions WCAG : cible espacée d'au moins son diamètre, équivalent redimensionnable, ou présentation essentielle.",
        ],
      },
    ],
  },
  {
    id: "zoom-reflow",
    title: "Zoom 200 % et reflow",
    level: 3,
    intro:
      "Beaucoup d'utilisateurs malvoyants zooment : la page doit rester utilisable à 200 %, sans scroll horizontal.",
    blocks: [
      {
        kind: "text",
        text: "Le critère 1.4.10 (Reflow) exige qu'à 400 % de zoom (équivalent 320 px CSS de large), le contenu se réorganise en une colonne sans défilement horizontal — hors cas où le scroll bidirectionnel est essentiel (tableaux de données, cartes). Concrètement : mise en page fluide, pas de largeurs fixes en pixels sur les conteneurs, texte qui ne déborde pas de ses boîtes.",
      },
      {
        kind: "steps",
        steps: [
          {
            title: "Tester à 200 % puis 400 %",
            detail:
              "Zoomez avec `Ctrl +` jusqu'à 200 % puis 400 %. Vérifiez : pas de scroll horizontal, pas de texte tronqué, pas de chevauchement, tous les contrôles restent atteignables.",
          },
          {
            title: "Corriger les largeurs fixes",
            detail:
              "Remplacez les `width: 1200px` par `max-width` + largeurs fluides. Les grilles CSS avec `auto-fit`/`minmax` se recomposent naturellement.",
          },
          {
            title: "Vérifier le texte agrandi seul",
            detail:
              "Augmentez uniquement la taille du texte (réglage navigateur) : les conteneurs à hauteur fixe qui coupent le texte sont des échecs.",
          },
        ],
      },
    ],
  },
  {
    id: "accessibilite-mobile",
    title: "Accessibilité mobile",
    level: 3,
    intro:
      "Le mobile a ses propres lecteurs d'écran, ses gestes et ses contraintes.",
    blocks: [
      {
        kind: "list",
        items: [
          "Lecteurs d'écran mobiles : VoiceOver (iOS) et TalkBack (Android) — testez sur appareil réel, pas seulement en émulation.",
          "Gestes : balayage pour naviguer, double-tap pour activer. Tout contrôle doit être atteignable par balayage dans un ordre logique.",
          "Ne désactivez jamais le zoom (`maximum-scale=1.0` ou `user-scalable=no` dans la meta viewport) : c'est un échec WCAG direct.",
          "Cibles tactiles 44×44, contrastes identiques au desktop, formulaires avec claviers adaptés (`inputmode`, `type=\"tel\"`, `autocomplete`).",
          "Orientation : ne forcez pas portrait ou paysage sauf nécessité réelle (critère 1.3.4).",
          "Mouvements : les actions au secouement ou à l'inclinaison doivent avoir une alternative bouton.",
        ],
      },
      {
        kind: "code",
        language: "html",
        title: "Meta viewport qui n'interdit pas le zoom",
        code: `<!-- Correct : largeur adaptée, zoom autorisé -->\n<meta name="viewport" content="width=device-width, initial-scale=1">\n\n<!-- Interdit : bloque le zoom, échec d'accessibilité -->\n<!-- <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"> -->`,
      },
    ],
  },
  {
    id: "lecteurs-ecran-pratique",
    title: "Tester avec un lecteur d'écran",
    level: 3,
    intro:
      "Rien ne remplace un vrai test : voici comment s'y prendre sans y passer des semaines.",
    blocks: [
      {
        kind: "fields",
        title: "Les lecteurs d'écran à connaître",
        fields: [
          {
            label: "NVDA (Windows)",
            value:
              "Gratuit et open source, le plus utilisé sur desktop Windows. Raccourci de base : `NVDA + flèches` pour naviguer, `H` pour les titres, `B` pour les boutons, `F` pour les champs.",
          },
          {
            label: "VoiceOver (macOS / iOS)",
            value:
              "Intégré Apple : `Cmd+F5` sur Mac, triple-clic du bouton latéral sur iPhone. Navigation au rotor, gestes sur mobile.",
          },
          {
            label: "TalkBack (Android)",
            value:
              "Intégré Android, dans les paramètres d'accessibilité. Balayage et double-tap.",
          },
        ],
      },
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir un parcours critique",
            detail:
              "Inscription, tunnel d'achat, recherche : testez les parcours qui rapportent, pas chaque page décorative.",
          },
          {
            title: "Naviguer sans regarder l'écran",
            detail:
              "Éteignez l'écran ou détournez le regard. Si vous ne comprenez pas où vous êtes ni quoi faire, l'utilisateur non plus.",
          },
          {
            title: "Noter les annonces",
            detail:
              "« Bouton » sans nom ? « Image » sans description ? Zone qui ne s'annonce pas ? Chaque annonce vide ou confuse est un bug à corriger.",
          },
          {
            title: "Tester les états dynamiques",
            detail:
              "Ouvrez les menus, déclenchez les erreurs, chargez plus de résultats : tout changement doit être annoncé de façon compréhensible.",
          },
        ],
      },
    ],
  },
  {
    id: "composants-tabs",
    title: "Pattern : onglets accessibles",
    level: 3,
    intro:
      "Le pattern d'onglets WAI-ARIA, décortiqué : rôles, clavier, états.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Structure d'onglets",
        code: `<div role="tablist" aria-label="Rubriques du profil">\n  <button role="tab" id="tab-1" aria-selected="true"\n          aria-controls="panel-1">Aperçu</button>\n  <button role="tab" id="tab-2" aria-selected="false"\n          aria-controls="panel-2" tabindex="-1">Activité</button>\n</div>\n<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">…</div>\n<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>…</div>`,
      },
      {
        kind: "list",
        items: [
          "Clavier : flèches gauche/droite pour passer d'onglet en onglet, `Tab` sort du composant depuis l'onglet actif.",
          "Deux variantes : activation automatique (le panneau suit le focus) ou manuelle (Entrée/Espace pour activer) — documentez votre choix.",
          "L'onglet inactif a `tabindex=\"-1\"` (roving tabindex) : un seul arrêt Tab pour tout le composant.",
          "`aria-selected` bascule, le panneau affiché perd son `hidden`, les autres le reçoivent.",
        ],
      },
    ],
  },
  {
    id: "composants-dialog",
    title: "Pattern : dialogue accessible",
    level: 3,
    intro:
      "Modale, boîte de confirmation, panneau latéral : les règles communes aux dialogues.",
    blocks: [
      {
        kind: "list",
        items: [
          "Nom accessible obligatoire : `aria-labelledby` vers le titre, ou `aria-label` explicite.",
          "Focus : à l'ouverture sur le dialogue ou son premier contrôle ; piège à focus tant qu'il est ouvert ; restauration au déclencheur à la fermeture.",
          "Fermeture : bouton visible « Fermer », `Échap`, et clic sur l'overlay (avec confirmation si des données seraient perdues).",
          "Le reste de la page est inerte : `aria-modal=\"true\"` ou l'attribut `inert` (natif) sur l'arrière-plan.",
          "Préférez `<dialog>` natif + `showModal()` : tout ce qui précède est intégré, sauf le nom accessible à fournir.",
          "`alertdialog` : variante pour les confirmations destructrices, le focus va directement sur l'action de confirmation ou d'annulation.",
        ],
      },
    ],
  },
  {
    id: "composants-menu",
    title: "Pattern : menus et accordéons",
    level: 3,
    intro:
      "Deux composants omniprésents, deux claviers différents à implémenter correctement.",
    blocks: [
      {
        kind: "table",
        headers: ["Composant", "Structure", "Clavier"],
        rows: [
          ["Menu déroulant (actions)", "Bouton `aria-expanded` + `aria-controls` ; liste `role=\"menu\"` + `menuitem`", "Entrée/Espace ouvre, flèches haut/bas naviguent, Échap ferme et rend le focus, Tab sort."],
          ["Navigation du site", "`<nav>` + liste de liens — pas de rôle menu", "Tabulation normale : ce sont des liens, pas des actions d'application."],
          ["Accordéon", "Boutons `aria-expanded` + régions associées", "Tab entre les en-têtes, Entrée/Espace déplie. Pas de flèches obligatoires (une seule dimension)."],
        ],
      },
      {
        kind: "text",
        text: "Piège classique : donner `role=\"menu\"` à la navigation principale du site. Le rôle menu est réservé aux menus d'application (type barre de menus d'un logiciel) avec leur clavier en flèches. La navigation d'un site reste des liens dans une liste : plus simple et plus robuste.",
      },
    ],
  },
  {
    id: "accessibilite-react",
    title: "Accessibilité avec React",
    level: 3,
    intro:
      "React ne rend rien accessible tout seul : les composants sur mesure doivent réimplémenter les comportements natifs.",
    blocks: [
      {
        kind: "text",
        text: "Chaque `<div onClick>` dans une app React est un bouton inaccessible en puissance. La discipline : composants bouton/lien/champ basés sur les éléments natifs, gestion du focus avec les refs (`ref.current.focus()`), titres de page mis à jour à la navigation (`document.title`), annonces des changements de route via une zone live, et focus déplacé sur le contenu principal à chaque changement de page dans une SPA.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Annoncer les changements de page (SPA)",
        code: `// À chaque changement de route : titre + focus + annonce\nuseEffect(() => {\n  document.title = "Panier — Ma boutique";\n  document.getElementById("contenu").focus();\n}, [route]);\n\n// Zone live globale pour les notifications\n<div aria-live="polite" className="sr-only" />`,
      },
      {
        kind: "list",
        items: [
          "Les bibliothèques de composants « headless » bien conçues gèrent déjà rôles, clavier et focus : préférez-les aux composants maison pour les patterns complexes.",
          "Attention aux portails (modales) : le focus trap doit tenir compte du DOM réel, pas du JSX.",
          "Testez l'app compilée, pas seulement en développement : le mode strict et les rendus répétés peuvent perturber le focus.",
        ],
      },
    ],
  },
  {
    id: "accessibilite-cognitive",
    title: "Accessibilité cognitive",
    level: 3,
    intro:
      "La forme la plus large — et la plus négligée — d'accessibilité : être compréhensible.",
    blocks: [
      {
        kind: "list",
        items: [
          "Langage simple : phrases courtes, vocabulaire courant, un terme = un sens dans toute l'interface.",
          "Prévisibilité : navigation identique sur toutes les pages, les actions font ce que leur libellé annonce.",
          "Pas de piège temporel : délais ajustables ou supprimables, pas de carrousel qui défile sans contrôle.",
          "Aide contextuelle : exemples dans les champs complexes, documentation à proximité, messages d'erreur qui expliquent la correction.",
          "Éviter les contenus qui clignotent plus de 3 fois par seconde (risque de crise d'épilepsie — critère 2.3.1).",
          "Authentification : proposer le copier-coller des mots de passe et la connexion via gestionnaire, pas de test cognitif imposé.",
        ],
      },
    ],
  },
  {
    id: "internationalisation-lang",
    title: "Langue et internationalisation",
    level: 3,
    intro:
      "Le lecteur d'écran doit savoir dans quelle langue lire : un attribut souvent oublié.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Déclarer la langue",
        code: `<!-- Langue principale du document -->\n<html lang="fr">\n\n<!-- Passage dans une autre langue : prononciation correcte -->\n<p>Son nouveau single <span lang="en">\"Midnight Drive\"</span>\n   sort vendredi.</p>`,
      },
      {
        kind: "list",
        items: [
          "Sans `lang`, le lecteur lit le français avec les règles phonétiques de la mauvaise langue.",
          "Dates, nombres, devises : formats localisés, jamais ambigus (29/09/2026 vs 09/29/2026).",
          "Sens de lecture : `dir=\"rtl\"` pour les langues de droite à gauche, pas du CSS bricolé.",
        ],
      },
    ],
  },
  {
    id: "design-inclusif",
    title: "Le design inclusif au quotidien",
    level: 3,
    intro:
      "L'accessibilité commence dans les maquettes, pas dans le code.",
    blocks: [
      {
        kind: "list",
        items: [
          "Système de design : contrastes validés pour chaque couple couleur/fond, focus visible défini une fois pour toutes, tailles de cibles dans les specs.",
          "Maquettes : états focus, hover, erreur et vide dessinés, pas découverts au développement.",
          "Contenu : niveaux de titres prévus, alternatives des images renseignées par les rédacteurs, pas les développeurs.",
          "Revues : checklist d'accessibilité dans la revue de design comme dans la revue de code.",
          "Personas : inclure des utilisateurs de clavier et de lecteur d'écran dans les tests utilisateurs, pas seulement des utilisateurs « standards ».",
        ],
      },
    ],
  },
  {
    id: "tests-axe-detail",
    title: "Automatiser avec axe-core",
    level: 3,
    intro:
      "Intégrer les tests d'accessibilité dans la chaîne : du navigateur à la CI.",
    blocks: [
      {
        kind: "text",
        text: "axe-core est le moteur d'analyse open source derrière la plupart des outils (dont l'extension axe DevTools et une partie de Lighthouse). Il s'intègre dans les tests automatisés : chaque page rendue est scannée, et le build échoue si une violation est détectée. C'est le filet de sécurité qui empêche les régressions.",
      },
      {
        kind: "fields",
        title: "Où placer les garde-fous",
        fields: [
          {
            label: "Développement",
            value:
              "Extension axe DevTools : analyse à la demande pendant le développement, avec localisation et correctif suggéré.",
          },
          {
            label: "Tests e2e",
            value:
              "Scan axe après chaque navigation dans les tests Playwright/Cypress : les violations font échouer le test.",
          },
          {
            label: "CI",
            value:
              "Job dédié qui audite les pages critiques à chaque pull request. Zéro nouvelle violation = merge possible.",
          },
          {
            label: "Limites assumées",
            value:
              "L'automatisation couvre environ un tiers des problèmes : contrastes, structure, noms accessibles. Le clavier et le lecteur d'écran restent manuels.",
          },
        ],
      },
    ],
  },
  {
    id: "audit-protocole",
    title: "Protocole d'audit complet",
    level: 3,
    intro:
      "Auditer un site existant, dans l'ordre : du plus large au plus fin.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Audit automatisé global",
            detail:
              "Lighthouse + axe DevTools sur les pages types (accueil, page contenu, formulaire, page résultats). Corrigez tout ce qui est mécanique : alt, labels, contrastes, titres.",
          },
          {
            title: "Test clavier exhaustif",
            detail:
              "Chaque page, chaque composant, chaque formulaire au clavier seul. Notez chaque ordre illogique, focus invisible ou piège.",
          },
          {
            title: "Test au lecteur d'écran",
            detail:
              "NVDA ou VoiceOver sur les parcours critiques. Notez chaque annonce absente, confuse ou fausse.",
          },
          {
            title: "Tests spécifiques",
            detail:
              "Zoom 200 %/400 %, simulation daltonisme, prefers-reduced-motion, tailles de cibles au tactile.",
          },
          {
            title: "Plan de correctifs priorisé",
            detail:
              "Bloquants (empêchent l'usage) → majeurs (gênent fortement) → mineurs. Un correctif = un test de non-régression. Documentez les choix dans la checklist d'équipe.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-composant-accessible",
    title: "Projet : un composant 100 % accessible",
    level: 3,
    intro:
      "Construire un composant sur mesure (menu, onglets ou dialogue) en appliquant tout le guide.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir le pattern WAI-ARIA",
            detail:
              "Identifiez le pattern correspondant dans le guide des pratiques ARIA du W3C (APG) : c'est votre spécification de clavier et d'états.",
          },
          {
            title: "Partir du HTML le plus natif possible",
            detail:
              "Boutons, liens, champs natifs comme base. N'ajoutez un rôle ARIA que là où le HTML ne peut pas exprimer le composant.",
          },
          {
            title: "Implémenter le clavier",
            detail:
              "Touches du pattern, focus trap si modale, Échap, retour du focus. Testez chaque touche réellement.",
          },
          {
            title: "Gérer les états ARIA",
            detail:
              "`aria-expanded`, `aria-selected`, `aria-hidden` mis à jour dans les mêmes gestionnaires que le visuel. Jamais d'état faux.",
          },
          {
            title: "Passer les trois niveaux de test",
            detail:
              "Automatisé (zéro violation), clavier (protocole complet), lecteur d'écran (parcours nominal + erreurs).",
          },
          {
            title: "Documenter l'usage",
            detail:
              "Clavier supporté, attributs requis, exemples : le prochain développeur doit pouvoir réutiliser le composant sans casser son accessibilité.",
          },
        ],
      },
    ],
  },
  {
    id: "checklist-equipe",
    title: "Checklist d'équipe",
    level: 3,
    intro:
      "Une checklist courte, affichée et appliquée à chaque livraison.",
    blocks: [
      {
        kind: "list",
        items: [
          "HTML sémantique : boutons, liens, titres hiérarchisés, landmarks nommés.",
          "Chaque image a une stratégie d'alternative (`alt` utile ou `alt=\"\"`).",
          "Contrastes AA vérifiés sur le rendu réel (texte 4.5:1, éléments 3:1).",
          "Focus visible partout, jamais supprimé sans remplacement.",
          "Navigation complète au clavier, ordre logique, aucun piège.",
          "Formulaires : labels associés, erreurs décrites et annoncées.",
          "ARIA : règle d'or respectée, états synchronisés avec le visuel.",
          "Multimédia : sous-titres, transcriptions, pas d'autoplay sonore.",
          "`prefers-reduced-motion` honoré, aucun clignotement > 3/s.",
          "Zoom 200 % sans scroll horizontal ni contenu tronqué.",
          "Audit automatisé : zéro violation sur les pages critiques.",
          "Test lecteur d'écran sur les parcours critiques.",
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Aller plus loin, en commençant toujours par les sources officielles.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          { label: "W3C WAI — Introduction", value: "w3.org/WAI/fundamentals/accessibility-intro : la porte d'entrée officielle, claire et à jour." },
          { label: "WCAG", value: "w3.org/WAI/standards-guidelines/wcag : les critères de succès, niveau par niveau." },
          { label: "WAI-ARIA", value: "w3.org/WAI/standards-guidelines/aria : la spécification des rôles, états et propriétés." },
          { label: "APG (pratiques ARIA)", value: "w3.org/WAI/ARIA/apg : les patterns de composants (onglets, menus, dialogues) avec claviers documentés." },
        ],
      },
      {
        kind: "list",
        items: [
          "Guides : « Accessibilité — MDN » (developer.mozilla.org/fr/docs/Web/Accessibility), référence pratique et francophone.",
          "Pratique : The A11y Project (a11yproject.com), checklist et patterns communautaires.",
          "Outils : axe DevTools (extension), Lighthouse (DevTools), NVDA (gratuit, Windows), VoiceOver (intégré Apple).",
          "Veille : suivre les évolutions WCAG et les retours d'utilisateurs de technologies d'assistance.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "L'accessibilité maîtrisée, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir le socle : `html` (sémantique avancée) et `css` (contrastes, focus, animations sobres).",
          "Passer aux composants : `javascript` puis `react` pour des interfaces dynamiques accessibles.",
          "Industrialiser : `testing` pour intégrer axe-core aux tests et à la CI.",
          "Élargir : `web-perf` — un site rapide est aussi plus accessible (moins d'attente, moins de timeouts).",
          "Revenir à la roadmap : valider Accessibilité et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

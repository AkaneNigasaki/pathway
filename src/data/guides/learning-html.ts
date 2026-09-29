import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de HTML : de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_HTML: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est HTML, son rôle exact dans une page web et sa relation avec CSS et JavaScript.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : HTML (HyperText Markup Language) est le langage de balisage qui décrit la structure et le contenu d'une page web — les titres, paragraphes, images, liens, listes, tableaux et formulaires.",
      },
      {
        kind: "text",
        text: "Pourquoi ça existe : le web est né du besoin de relier des documents entre eux (l'« hypertexte »). HTML fournit un vocabulaire commun — des balises comme `<p>`, `<a>`, `<img>` — que tous les navigateurs comprennent de la même façon. C'est un standard ouvert, maintenu comme « standard vivant » par le WHATWG : il évolue en continu plutôt que par versions figées.",
      },
      {
        kind: "text",
        text: "Le trio du web : HTML apporte le contenu et sa structure (le squelette et les organes), CSS apporte la présentation (couleurs, mise en page, typographie) et JavaScript apporte le comportement (interactions, logique). Sans HTML, CSS n'a rien à styliser et JavaScript rien à manipuler : tout commence ici.",
      },
      {
        kind: "list",
        items: [
          "HTML décrit le QUOI (contenu et structure), pas le COMMENT visuel — c'est le rôle de CSS.",
          "Un fichier HTML n'est que du texte : n'importe quel éditeur suffit, aucune compilation.",
          "HTML est le fondement de l'accessibilité et du SEO : un HTML propre aide les lecteurs d'écran et les moteurs de recherche.",
        ],
      },
    ],
  },
  {
    id: "navigateur-lit-page",
    title: "Comment un navigateur lit une page",
    level: 1,
    intro:
      "Ce qui se passe entre votre fichier `.html` et les pixels affichés à l'écran.",
    blocks: [
      {
        kind: "diagram",
        title: "Du fichier à l'écran",
        lines: [
          "Fichier .html (texte)",
          "     │",
          "     ▼",
          "Analyse (parsing) : le navigateur lit les balises",
          "     │",
          "     ▼",
          "DOM : arbre d'objets représentant la page",
          "     │",
          "     ├── + CSS → arbre de rendu",
          "     ├── Mise en page (positions, tailles)",
          "     └── Peinture (pixels à l'écran)",
        ],
      },
      {
        kind: "text",
        text: "Comment ça fonctionne : le navigateur lit le fichier de haut en bas et construit le DOM (Document Object Model), une représentation arborescente où chaque balise devient un « nœud » avec ses enfants. CSS et JavaScript travaillent ensuite sur cet arbre : CSS le stylise, JavaScript le modifie.",
      },
      {
        kind: "text",
        text: "Point important : les navigateurs sont très tolérants — face à du HTML mal formé (une balise non fermée, une imbrication invalide), ils « devinent » et corrigent silencieusement au lieu d'afficher une erreur. Chaque navigateur peut deviner différemment : d'où l'importance d'écrire du HTML valide, vérifié avec un validateur.",
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
      "Bonne nouvelle : HTML est le point d'entrée du développement web et ne demande aucun prérequis technique.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut (et ne faut pas) avant de commencer",
        fields: [
          {
            label: "Aucun prérequis technique",
            value:
              "Pas besoin de savoir programmer, d'utiliser un terminal ou de comprendre les réseaux. Si vous savez créer un fichier texte et ouvrir un navigateur, vous pouvez commencer.",
          },
          {
            label: "Culture web utile",
            value:
              "Savoir ce qu'est une URL, un fichier et un dossier, et avoir l'habitude de naviguer sur le web. Comprendre qu'une page web est un document aide à saisir la logique des balises.",
          },
          {
            label: "Pas besoin de JavaScript",
            value:
              "JavaScript vient après. HTML seul permet déjà de construire des pages complètes : textes structurés, images, liens, tableaux, formulaires.",
          },
          {
            label: "Pas besoin de CSS pour débuter",
            value:
              "Le navigateur applique des styles par défaut (titres en grand, liens en bleu souligné). Vous apprendrez CSS ensuite pour personnaliser l'apparence.",
          },
        ],
      },
    ],
  },
  {
    id: "installation",
    title: "Installation : il n'y en a pas",
    level: 2,
    intro:
      "HTML n'est pas un logiciel à installer : c'est un format de texte que votre navigateur sait déjà lire.",
    blocks: [
      {
        kind: "text",
        text: "Pourquoi aucune installation : contrairement à un langage comme Python ou un outil comme Docker, HTML ne s'« exécute » pas — il est lu et interprété par le navigateur que vous utilisez déjà tous les jours. Tout ce qu'il faut, c'est un éditeur pour écrire du texte et un navigateur pour voir le résultat.",
      },
      {
        kind: "table",
        headers: ["Éditeur", "Points forts", "À savoir"],
        rows: [
          [
            "VS Code",
            "Coloration, autocomplétion des balises, aperçu intégré",
            "Gratuit ; l'extension « Live Server » recharge la page à chaque sauvegarde",
          ],
          [
            "Zed",
            "Très rapide, interface épurée",
            "Gratuit ; plus récent, moins d'extensions",
          ],
          [
            "Sublime Text",
            "Léger et rapide",
            "Version d'évaluation gratuite",
          ],
          [
            "Notepad++ (Windows)",
            "Simple, déjà connu de beaucoup",
            "Windows uniquement",
          ],
        ],
      },
      {
        kind: "text",
        text: "Aucun de ces éditeurs n'est universellement meilleur : pour écrire du HTML, le critère principal est la coloration syntaxique et la fermeture automatique des balises, que tous proposent. Côté navigateur, Chrome, Firefox, Safari ou Edge conviennent — Firefox et Chrome ont des outils de développement particulièrement complets.",
      },
    ],
  },
  {
    id: "anatomie-balise",
    title: "Anatomie d'une balise",
    level: 2,
    intro:
      "Tout le HTML repose sur un seul mécanisme : des balises qui décrivent des éléments.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Un paragraphe avec un attribut",
        code: "<p class=\"intro\">Bonjour le monde</p>",
      },
      {
        kind: "fields",
        title: "Les quatre pièces d'un élément",
        fields: [
          {
            label: "Balise ouvrante",
            value:
              "`<p>` : le nom de l'élément entre chevrons. Il indique le rôle du contenu (ici : paragraphe).",
          },
          {
            label: "Attributs",
            value:
              "`class=\"intro\"` : des informations supplémentaires sous forme `nom=\"valeur\"`, toujours dans la balise ouvrante. Ils précisent le comportement ou l'identification de l'élément.",
          },
          {
            label: "Contenu",
            value:
              "`Bonjour le monde` : le texte (ou d'autres éléments imbriqués) placé entre les balises.",
          },
          {
            label: "Balise fermante",
            value:
              "`</p>` : le nom précédé d'un slash. Elle marque la fin de l'élément. Oublier de fermer est l'erreur la plus fréquente des débutants.",
          },
        ],
      },
      {
        kind: "text",
        text: "Éléments vides : certaines balises n'ont pas de contenu et ne se ferment pas — `<img>`, `<br>`, `<hr>`, `<input>`, `<meta>`. On les appelle éléments vides (ou « void elements »). Écrire `<br></br>` est invalide.",
      },
      {
        kind: "diagram",
        title: "Imbrication : les éléments forment un arbre",
        lines: [
          "<article>",
          "   ├── <h2>Titre</h2>",
          "   └── <p>",
          "         ├── Texte avec",
          "         ├── <strong>un passage fort</strong>",
          "         └── et la suite.",
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : les éléments s'imbriquent comme des poupées russes — toujours fermer dans l'ordre inverse de l'ouverture (`<p><strong>…</strong></p>`, jamais `<p><strong>…</p></strong>`). Une imbrication correcte garantit un DOM prévisible.",
      },
    ],
  },
  {
    id: "premier-document",
    title: "Premier document",
    level: 2,
    intro:
      "Créer votre première page HTML de zéro, en cinq étapes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer un dossier et un fichier",
            detail:
              "Créez un dossier `mon-site`, puis un fichier `index.html` dedans (l'extension `.html` indique au système et au navigateur qu'il s'agit d'une page web ; `index.html` est le nom conventionnel de la page d'accueil d'un dossier).",
          },
          {
            title: "Écrire le squelette minimal",
            detail:
              "Ouvrez `index.html` dans votre éditeur et écrivez : `<!DOCTYPE html>`, puis `<html lang=\"fr\">`, avec `<head>` (titre, métadonnées) et `<body>` (contenu visible). Le détail de chaque partie est expliqué dans la section « Document de base ».",
          },
          {
            title: "Ajouter du contenu",
            detail:
              "Dans le `<body>`, ajoutez un titre `<h1>Ma première page</h1>` et un paragraphe `<p>Bonjour, ceci est ma première page HTML.</p>`. Sauvegardez le fichier (`Ctrl+S` / `Cmd+S`).",
          },
          {
            title: "Ouvrir dans le navigateur",
            detail:
              "Double-cliquez sur `index.html` (ou glissez-déposez-le dans le navigateur). La page s'affiche : le navigateur a lu votre HTML et construit la page.",
          },
          {
            title: "Modifier et recharger",
            detail:
              "Changez le texte dans l'éditeur, sauvegardez, puis rechargez la page (`F5` ou `Cmd+R`). C'est la boucle de travail fondamentale : éditer → sauvegarder → recharger.",
          },
        ],
      },
      {
        kind: "code",
        language: "html",
        title: "index.html — le squelette à recopier",
        code: "<!DOCTYPE html>\n<html lang=\"fr\">\n  <head>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <title>Ma première page</title>\n  </head>\n  <body>\n    <h1>Ma première page</h1>\n    <p>Bonjour, ceci est ma première page HTML.</p>\n  </body>\n</html>",
      },
    ],
  },
  {
    id: "devtools",
    title: "Inspecter avec les DevTools",
    level: 2,
    intro:
      "Les outils de développement du navigateur : la loupe qui révèle le HTML de n'importe quelle page.",
    blocks: [
      {
        kind: "text",
        text: "Comment y accéder : touche `F12`, ou clic droit sur la page → « Inspecter » (ou « Inspecter l'élément »). Un panneau s'ouvre, généralement avec l'onglet « Éléments » (Elements) qui affiche le DOM de la page en direct.",
      },
      {
        kind: "fields",
        title: "Ce que l'onglet Éléments permet",
        fields: [
          {
            label: "Voir le DOM réel",
            value:
              "Le code affiché est le DOM construit par le navigateur, pas forcément le fichier source : il inclut les corrections automatiques et les modifications faites par JavaScript.",
          },
          {
            label: "Survoler et localiser",
            value:
              "Survolez un nœud dans le panneau : l'élément correspondant est surligné sur la page. Inversement, l'icône « sélectionner » permet de cliquer un élément de la page pour voir son HTML.",
          },
          {
            label: "Modifier en direct",
            value:
              "Double-cliquez un texte ou un attribut pour le modifier et voir le résultat immédiat. Attention : ces modifications sont temporaires — rechargez la page et tout disparaît. C'est un formidable outil d'expérimentation sans risque.",
          },
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : quand une page ne s'affiche pas comme prévu, inspectez d'abord le DOM réel plutôt que de relire votre fichier — le navigateur vous montre exactement ce qu'il a compris, y compris ses corrections silencieuses.",
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Workflow quotidien",
    level: 2,
    intro:
      "Comment organiser ses fichiers et travailler efficacement au quotidien.",
    blocks: [
      {
        kind: "text",
        text: "La boucle de travail : éditer le fichier → sauvegarder → recharger le navigateur. Avec l'extension « Live Server » de VS Code (bouton « Go Live »), le rechargement devient automatique à chaque sauvegarde.",
      },
      {
        kind: "diagram",
        title: "Arborescence typique d'un petit site statique",
        lines: [
          "mon-site/",
          "   ├── index.html      (accueil)",
          "   ├── contact.html    (page contact)",
          "   ├── styles.css      (la présentation, voir CSS)",
          "   └── images/",
          "         ├── logo.png",
          "         └── photo.jpg",
        ],
      },
      {
        kind: "list",
        items: [
          "Un fichier `index.html` par dossier : c'est la page servie par défaut.",
          "Noms de fichiers en minuscules, sans espaces ni accents (`ma-photo.jpg`, pas `Ma Photo.JPG`) : certains serveurs sont sensibles à la casse.",
          "Séparer les types de fichiers : HTML à la racine, images dans `images/`, CSS dans un fichier dédié.",
          "Les liens entre pages utilisent des chemins relatifs (`contact.html`, `images/logo.png`) pour que le site fonctionne quel que soit l'endroit où il est hébergé.",
        ],
      },
    ],
  },
  {
    id: "servir-en-local",
    title: "Servir la page en local",
    level: 2,
    intro:
      "Pour un simple fichier HTML, un double-clic suffit. Mais dès que le projet grandit, un vrai serveur local devient nécessaire.",
    blocks: [
      {
        kind: "text",
        text: "Pourquoi un serveur : ouvrir un fichier avec `file://` fonctionne pour du HTML pur, mais le navigateur applique des restrictions de sécurité à ce protocole — par exemple, charger des données avec `fetch()` ou utiliser des modules JavaScript y est bloqué. Un serveur local en `http://localhost` reproduit les conditions réelles d'hébergement.",
      },
      {
        kind: "command",
        label: "Servir le dossier courant en HTTP",
        command: "npx serve",
        why: "Le paquet `serve` démarre un serveur de fichiers statiques dans le dossier courant, sans installation permanente ni configuration. C'est le moyen le plus rapide de tester un site comme il sera réellement servi.",
        verify:
          "Le terminal affiche une adresse (souvent `http://localhost:3000`) : ouvrez-la dans le navigateur, votre `index.html` s'y affiche.",
      },
      {
        kind: "text",
        text: "Alternative sans commande : l'extension « Live Server » de VS Code fait la même chose avec un bouton, en ajoutant le rechargement automatique. Les deux approches sont équivalentes — choisissez selon votre confort.",
      },
    ],
  },
  {
    id: "valider-son-html",
    title: "Valider son HTML",
    level: 2,
    intro:
      "Le réflexe professionnel quand une page se comporte bizarrement : faire valider le code.",
    blocks: [
      {
        kind: "text",
        text: "Le validateur du W3C (validator.w3.org) analyse votre page et signale les erreurs : balises non fermées, attributs inconnus, imbrications invalides (par exemple un `<div>` dans un `<p>`), `id` dupliqués. On peut y coller une URL, téléverser un fichier ou coller du code directement.",
      },
      {
        kind: "list",
        items: [
          "À utiliser après chaque page terminée, et systématiquement quand l'affichage est inattendu.",
          "Le validateur signale aussi des avertissements (balise obsolète, attribut redondant) : à traiter comme des conseils de qualité.",
          "Un document « valide » n'est pas forcément bien conçu — mais un document invalide est toujours fragile.",
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : visez zéro erreur au validateur avant de passer à CSS. Les navigateurs corrigent les erreurs silencieusement, mais chaque correction devinée est une source potentielle de différence entre navigateurs.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "document-base",
    title: "Document de base : doctype, html, head, body",
    level: 3,
    intro:
      "Le squelette que tout document HTML doit respecter, expliqué morceau par morceau.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Squelette complet et valide",
        code: "<!DOCTYPE html>\n<html lang=\"fr\">\n  <head>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <title>Titre de la page</title>\n  </head>\n  <body>\n    <!-- Contenu visible ici -->\n  </body>\n</html>",
      },
      {
        kind: "text",
        text: "Ce squelette déclare le type de document, sa langue, son encodage et sépare les métadonnées (invisibles) du contenu (visible).",
      },
      {
        kind: "fields",
        title: "Chaque ligne, expliquée",
        fields: [          {
            label: "`<!DOCTYPE html>`",
            value:
              "Ce n'est pas une balise mais une instruction : elle place le navigateur en « mode standard » (au lieu du mode de compatibilité avec les vieux sites). Toujours en toute première ligne, sans rien avant.",
          },
          {
            label: "`<html lang=\"fr\">`",
            value:
              "L'élément racine qui contient tout le document. L'attribut `lang` déclare la langue : les lecteurs d'écran choisissent la bonne voix de synthèse et les moteurs de recherche classent mieux la page.",
          },
          {
            label: "`<head>`",
            value:
              "Les métadonnées : tout ce qui décrit la page sans s'afficher — titre de l'onglet, encodage, description pour les moteurs de recherche, liens vers CSS et scripts.",
          },
          {
            label: "`<body>`",
            value:
              "Tout le contenu visible : textes, images, liens, formulaires. Il n'y a qu'un seul `<body>` par document.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `<meta charset=\"utf-8\">` : les accents s'affichent alors sous forme de caractères bizarres (« mojibake ») sur certains navigateurs.",
          },
          {
            label: "Bonne pratique",
            value:
              "Placez `<meta charset>` en premier dans le `<head>` pour que le navigateur décode correctement le reste du document dès le début.",
          },
        ],
      },
    ],
  },
  {
    id: "head-metadonnees",
    title: "Métadonnées : title, meta, link",
    level: 3,
    intro:
      "Le contenu invisible du `<head>` : ce que voient les onglets, les moteurs de recherche et les réseaux sociaux.",
    blocks: [
      {
        kind: "fields",
        title: "Les métadonnées essentielles",
        fields: [
          {
            label: "`<title>`",
            value:
              "En une phrase : le titre affiché dans l'onglet du navigateur et comme titre cliquable dans les résultats de recherche. Pourquoi ça existe : c'est la première chose que voient les utilisateurs et les moteurs. Bonne pratique : un titre court, descriptif et unique par page (« Tarifs — MonSite », pas juste « Accueil »).",
          },
          {
            label: "`<meta charset=\"utf-8\">`",
            value:
              "Déclare l'encodage des caractères (UTF-8 couvre les accents, les emojis, presque toutes les écritures). Sans lui, risque d'accents corrompus.",
          },
          {
            label: "`<meta name=\"viewport\" …>`",
            value:
              "Indispensable sur mobile : `width=device-width, initial-scale=1` dit au navigateur d'adapter la largeur à l'écran au lieu d'afficher une version « desktop » miniature.",
          },
          {
            label: "`<meta name=\"description\" …>`",
            value:
              "Le résumé affiché sous le titre dans les résultats de recherche. Il n'influence pas directement le classement, mais un bon résumé augmente les clics.",
          },
          {
            label: "`<link rel=\"stylesheet\" href=\"styles.css\">`",
            value:
              "Attache une feuille de style CSS. L'attribut `rel` précise la relation (« stylesheet ») et `href` l'adresse du fichier.",
          },
          {
            label: "`<link rel=\"icon\" href=\"favicon.ico\">`",
            value:
              "L'icône affichée dans l'onglet et les favoris. Les formats PNG et SVG sont largement supportés aujourd'hui.",
          },
          {
            label: "`<base href=\"…\">`",
            value:
              "Définit l'URL de base pour tous les liens relatifs du document. Pratique mais piégeux : un seul `<base>` mal configuré casse tous les liens relatifs — à utiliser en connaissance de cause.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Dupliquer les balises `meta description` ou oublier le `viewport` : le premier brouille les moteurs de recherche, le second casse l'affichage mobile.",
          },
        ],
      },
    ],
  },
  {
    id: "titres",
    title: "Titres : h1 à h6",
    level: 3,
    intro:
      "La hiérarchie des titres structure le document pour les lecteurs comme pour les machines.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Hiérarchie correcte",
        code: "<h1>Guide du jardinage</h1>\n<h2>Préparer le sol</h2>\n<h3>Choisir ses outils</h3>\n<h2>Semer</h2>",
      },
      {
        kind: "text",
        text: "Les six niveaux de titres (`<h1>` le plus important → `<h6>` le plus détaillé) décrivent le plan du document.",
      },
      {
        kind: "text",
        text: "Les lecteurs d'écran permettent de naviguer de titre en titre comme dans une table des matières ; les moteurs de recherche s'en servent pour comprendre la structure du contenu.",
      },
      {
        kind: "text",
        text: "Un seul `<h1>` par page (le sujet principal), puis des `<h2>` pour les grandes parties, `<h3>` pour les sous-parties, sans sauter de niveau.",
      },
      {
        kind: "fields",
        title: "Fiche balise",
        fields: [
          {
            label: "Erreur fréquente",
            value:
              "Choisir un niveau de titre pour sa taille visuelle (« je veux du petit texte, je prends `<h4>` »). La taille se règle en CSS ; le niveau exprime l'importance dans le plan.",
          },
          {
            label: "Bonne pratique",
            value:
              "Ne jamais sauter de niveau (`<h1>` suivi directement de `<h3>`) : cela casse la table des matières perçue par les technologies d'assistance.",
          },
        ],
      },
    ],
  },
  {
    id: "paragraphes",
    title: "Paragraphes, sauts et séparateurs",
    level: 3,
    intro:
      "Structurer le texte courant avec `<p>`, `<br>` et `<hr>` — chacun avec son rôle précis.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Usage correct",
        code: "<p>Premier paragraphe : une idée complète.</p>\n<p>Deuxième paragraphe : une autre idée.</p>\n<hr>\n<p>Adresse :<br>12 rue des Lilas<br>Antananarivo</p>",
      },
      {
        kind: "fields",
        title: "Fiches balises",
        fields: [
          {
            label: "`<p>` — paragraphe",
            value:
              "En une phrase : regroupe une idée complète en un bloc de texte. Les navigateurs ajoutent automatiquement des marges entre paragraphes. Quand l'utiliser : pour tout texte courant. Erreur fréquente : mettre des blocs (`<div>`, `<ul>`) à l'intérieur d'un `<p>` — invalide, le navigateur referme le paragraphe avant.",
          },
          {
            label: "`<br>` — saut de ligne",
            value:
              "En une phrase : force un retour à la ligne sans créer un nouveau paragraphe. Quand l'utiliser : adresses postales, poèmes, signatures — des cas où le saut de ligne fait partie du contenu. Élément vide, pas de balise fermante.",
          },
          {
            label: "`<hr>` — séparation thématique",
            value:
              "En une phrase : marque un changement de thème entre deux parties (pas juste « une jolie ligne »). Pourquoi ça existe : les lecteurs d'écran l'annoncent comme une séparation, ce qu'une simple ligne décorative en CSS ne fait pas.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Empiler `<br><br><br>` pour créer de l'espace vertical : l'espacement est du ressort de CSS (marges). Des `<br>` décoratifs polluent la lecture aux lecteurs d'écran.",
          },
        ],
      },
    ],
  },
  {
    id: "liens",
    title: "Liens : a",
    level: 3,
    intro:
      "La balise qui a fait le web : l'hyperlien.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Les quatre usages courants",
        code: "<!-- Lien externe -->\n<a href=\"https://developer.mozilla.org/\">Documentation MDN</a>\n\n<!-- Lien interne (ancre) -->\n<a href=\"#tarifs\">Voir les tarifs</a>\n\n<!-- E-mail et téléphone -->\n<a href=\"mailto:contact@example.com\">Nous écrire</a>\n<a href=\"tel:+261340000000\">Appeler</a>",
      },
      {
        kind: "text",
        text: "`<a>` (anchor) crée un lien cliquable vers une autre ressource, identifiée par l'attribut `href`.",
      },
      {
        kind: "fields",
        title: "Fiche balise",
        fields: [          {
            label: "Attributs clés",
            value:
              "`href` : la destination (URL absolue, chemin relatif, `#ancre`, `mailto:`, `tel:`). `target=\"_blank\"` : ouvre dans un nouvel onglet — à réserver aux liens externes, car cela désoriente certains utilisateurs. `rel=\"noopener\"` : à ajouter systématiquement avec `target=\"_blank\"`, sinon la page liée peut manipuler votre page via `window.opener` (faille de sécurité réelle). `download` : propose le téléchargement au lieu de la navigation.",
          },
          {
            label: "Accessibilité",
            value:
              "Le texte du lien doit être explicite hors contexte : « Télécharger le rapport PDF » plutôt que « Cliquez ici ». Un lecteur d'écran peut lister tous les liens d'une page : une liste de « cliquez ici » est inutilisable.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Un `<a>` sans `href` n'est pas un lien (non cliquable au clavier, non annoncé comme lien). Pour une action qui ne navigue nulle part, utilisez `<button>`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Les ancres (`href=\"#id\"`) créent une navigation interne fluide vers n'importe quel élément possédant cet `id` — idéal pour les sommaires.",
          },
        ],
      },
    ],
  },
  {
    id: "listes",
    title: "Listes : ul, ol, li, dl",
    level: 3,
    intro:
      "Présenter des éléments en liste : choisir le bon type selon le sens.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Les trois types de listes",
        code: "<!-- Liste non ordonnée : l'ordre n'a pas d'importance -->\n<ul>\n  <li>Pommes</li>\n  <li>Poires</li>\n</ul>\n\n<!-- Liste ordonnée : l'ordre compte -->\n<ol>\n  <li>Préchauffer le four</li>\n  <li>Mélanger les ingrédients</li>\n</ol>\n\n<!-- Liste de définitions : terme / description -->\n<dl>\n  <dt>HTML</dt>\n  <dd>Langage de balisage pour structurer les pages web.</dd>\n</dl>",
      },
      {
        kind: "fields",
        title: "Fiches balises",
        fields: [
          {
            label: "`<ul>` / `<ol>` / `<li>`",
            value:
              "En une phrase : `<ul>` liste des éléments sans ordre (puces), `<ol>` des éléments ordonnés (numéros), `<li>` chaque élément. Attributs utiles sur `<ol>` : `start` (numéro de départ), `reversed` (ordre décroissant), `type` (`1`, `A`, `a`, `I`, `i`). Les listes s'imbriquent : un `<li>` peut contenir un `<ul>` pour les sous-listes.",
          },
          {
            label: "`<dl>`, `<dt>`, `<dd>`",
            value:
              "En une phrase : liste de paires terme/définition — glossaires, métadonnées (acteurs d'un film, caractéristiques produit). Pourquoi ça existe : elle exprime une relation sémantique que `<ul>` ne capture pas, et les lecteurs d'écran l'annoncent comme telle.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Mettre du texte directement dans `<ul>` sans `<li>`, ou utiliser des `<div>` à la place des listes pour des menus de navigation. Les lecteurs d'écran annoncent le nombre d'éléments d'une vraie liste (« liste de 5 éléments »), une aide précieuse à la navigation.",
          },
          {
            label: "Bonne pratique",
            value:
              "Les menus de navigation (`<nav>`) se construisent avec des `<ul>` : c'est la structure attendue par les technologies d'assistance.",
          },
        ],
      },
    ],
  },
  {
    id: "images",
    title: "Images : img et figure",
    level: 3,
    intro:
      "Afficher des images de façon performante et accessible.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Image accessible et optimisée",
        code: "<figure>\n  <img src=\"jardin.jpg\"\n       alt=\"Potager en permaculture au lever du soleil\"\n       width=\"800\" height=\"600\"\n       loading=\"lazy\">\n  <figcaption>Notre potager au printemps.</figcaption>\n</figure>",
      },
      {
        kind: "text",
        text: "`<img>` intègre une image via `src` ; l'attribut `alt` fournit son équivalent textuel pour ceux qui ne la voient pas.",
      },
      {
        kind: "fields",
        title: "Fiche balise",
        fields: [          {
            label: "`alt` — l'attribut le plus important",
            value:
              "Pourquoi ça existe : les lecteurs d'écran lisent le `alt` à la place de l'image, et il s'affiche si l'image ne charge pas. Quand l'utiliser : décrivez la fonction ou le contenu informatif (« Graphique des ventes 2024 »), jamais « image de… ». `alt=\"\"` (vide) pour les images purement décoratives : elles sont alors ignorées par les lecteurs d'écran.",
          },
          {
            label: "`width` et `height`",
            value:
              "Réservent l'espace avant le chargement : sans eux, la page « saute » quand l'image apparaît (décalage de mise en page, pénalisé en SEO et désagréable).",
          },
          {
            label: "`loading=\"lazy\"`",
            value:
              "Diffère le chargement des images hors écran jusqu'au défilement : la page initiale charge plus vite. À ne pas mettre sur l'image principale visible immédiatement.",
          },
          {
            label: "`<figure>` / `<figcaption>`",
            value:
              "Regroupent une image (ou un schéma, un extrait de code) avec sa légende, comme une unité sémantique déplaçable dans le document.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`alt=\"image\"` ou `alt=\"photo\"` : n'apporte aucune information. Autre erreur : utiliser une image pour afficher du texte (logo textuel) — le texte réel est sélectionnable, traduisible et lisible par les lecteurs d'écran.",
          },
        ],
      },
      {
        kind: "text",
        text: "Images responsives : pour servir différentes tailles d'image selon l'écran, les attributs `srcset` et `sizes` (ou l'élément `<picture>` avec `<source>`) permettent au navigateur de choisir la version adaptée — une image de 400 px sur mobile au lieu de 2000 px économise des données. C'est un perfectionnement à explorer après les bases.",
      },
    ],
  },
  {
    id: "tableaux",
    title: "Tableaux accessibles",
    level: 3,
    intro:
      "Présenter des données tabulaires — et uniquement des données tabulaires.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Tableau bien structuré",
        code: "<table>\n  <caption>Ventes trimestrielles (en k€)</caption>\n  <thead>\n    <tr>\n      <th scope=\"col\">Trimestre</th>\n      <th scope=\"col\">Ventes</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope=\"row\">T1</th>\n      <td>120</td>\n    </tr>\n  </tbody>\n</table>",
      },
      {
        kind: "text",
        text: "`<table>` organise des données en lignes (`<tr>`) et cellules ; `<th>` désigne les cellules d'en-tête, `<td>` les cellules de données.",
      },
      {
        kind: "fields",
        title: "Fiches balises",
        fields: [          {
            label: "`<caption>`",
            value:
              "Le titre du tableau, lu en premier par les lecteurs d'écran. Toujours présent sur un tableau de données : c'est son équivalent du `<h2>` pour une section.",
          },
          {
            label: "`<thead>`, `<tbody>`, `<tfoot>`",
            value:
              "Structurent le tableau en en-tête, corps et pied. Ils permettent aussi l'impression avec en-tête répété et un ciblage CSS propre.",
          },
          {
            label: "`scope=\"col\"` / `scope=\"row\"`",
            value:
              "Pourquoi ça existe : indique si un `<th>` est l'en-tête d'une colonne ou d'une ligne, pour que le lecteur d'écran annonce « Trimestre : T1, Ventes : 120 » au lieu de chiffres isolés.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Utiliser des tableaux pour la mise en page (colonnes, positionnement) : c'était la pratique des années 2000, aujourd'hui c'est le rôle de CSS. Un tableau de mise en page est un cauchemar pour les lecteurs d'écran et le responsive.",
          },
          {
            label: "Bonne pratique",
            value:
              "Un tableau doit rester lisible linéarisé (lu cellule par cellule) : si ce n'est pas le cas, la structure est trop complexe et doit être simplifiée.",
          },
        ],
      },
    ],
  },
  {
    id: "texte-en-ligne",
    title: "Mise en forme du texte en ligne",
    level: 3,
    intro:
      "Marquer le sens des passages de texte : emphase, importance, code, citations.",
    blocks: [
      {
        kind: "table",
        headers: ["Balise", "Sens", "Quand l'utiliser"],
        rows: [
          ["`<em>`", "Emphase (accent tonique)", "Un mot à accentuer à la lecture — rendu en italique par défaut"],
          ["`<strong>`", "Importance forte", "Un avertissement, une information critique — rendu en gras par défaut"],
          ["`<code>`", "Fragment de code", "Noms de fonctions, commandes, extraits — chasse fixe par défaut"],
          ["`<abbr>`", "Abréviation (+ `title`) ", "`<abbr title=\"HyperText Markup Language\">HTML</abbr>`"],
          ["`<time>`", "Date/heure (+ `datetime`)", "`<time datetime=\"2026-09-28\">28 septembre</time>` — lisible par les machines"],
          ["`<mark>`", "Surlignage pertinent", "Passage pertinent dans un contexte (résultat de recherche)"],
          ["`<small>`", "Texte secondaire", "Mentions légales, notes de bas de page"],
          ["`<sub>` / `<sup>`", "Indice / exposant", "Formules (H`<sub>`2`</sub>`O), notes (`<sup>`1`</sup>`)"],
          ["`<q>` / `<cite>`", "Citation courte / source", "`<q>` ajoute les guillemets ; `<cite>` désigne l'œuvre citée"],
          ["`<span>`", "Neutre (aucun sens)", "Crochet pour CSS ou JS quand aucune autre balise ne convient"],
        ],
      },
      {
        kind: "text",
        text: "Point clé : `<em>` et `<strong>` expriment du sens (les lecteurs d'écran peuvent changer d'intonation), tandis que `<i>`, `<b>`, `<u>` sont purement visuels — préférez CSS pour du style sans sens, et `<em>`/`<strong>` quand le sens compte.",
      },
      {
        kind: "text",
        text: "Erreur fréquente : utiliser `<b>` pour « mettre en gras » un avertissement important — visuellement identique, mais l'information d'importance est perdue pour les lecteurs d'écran. Bonne pratique : choisissez la balise pour son sens, réglez l'apparence en CSS.",
      },
    ],
  },
  {
    id: "entites-caracteres",
    title: "Entités et caractères spéciaux",
    level: 3,
    intro:
      "Afficher les caractères que le HTML interpréterait autrement.",
    blocks: [
      {
        kind: "text",
        text: "Les entités (`&nom;`) permettent d'afficher littéralement des caractères réservés par la syntaxe HTML.",
      },
      {
        kind: "fields",
        title: "Quand les entités sont nécessaires",
        fields: [          {
            label: "`&lt;` `<` et `&gt;` `>`",
            value:
              "Indispensables pour montrer du code HTML dans une page : écrire `<p>` dans le contenu serait interprété comme une vraie balise. On écrit `&lt;p&gt;`.",
          },
          {
            label: "`&amp;` `&`",
            value:
              "L'esperluette introduit les entités : pour afficher un `&` littéral (ex. « R&D »), écrivez `&amp;`. Dans les URL avec paramètres, `?a=1&b=2` devrait rigoureusement s'écrire `?a=1&amp;b=2`.",
          },
          {
            label: "`&nbsp;` (espace insécable)",
            value:
              "Empêche un saut de ligne entre deux mots (« 100&nbsp;€ »). À utiliser avec parcimonie : ce n'est pas un outil de mise en page.",
          },
          {
            label: "Accents : aucune entité nécessaire",
            value:
              "Avec `<meta charset=\"utf-8\">`, écrivez directement `é`, `è`, `« »`, `€`. Les entités comme `&eacute;` sont un héritage d'avant UTF-8 et nuisent à la lisibilité du code.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Coller du texte Word avec des guillemets typographiques sans encodage UTF-8 déclaré, ou abuser de `&nbsp;` pour aligner du contenu.",
          },
        ],
      },
    ],
  },
  {
    id: "formulaires-bases",
    title: "Formulaires : les bases",
    level: 3,
    intro:
      "Collecter des données utilisateur avec `<form>` : l'enveloppe de tout formulaire.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Formulaire de recherche minimal",
        code: "<form action=\"/recherche\" method=\"get\">\n  <label for=\"q\">Rechercher</label>\n  <input type=\"search\" id=\"q\" name=\"q\" required>\n  <button type=\"submit\">OK</button>\n</form>",
      },
      {
        kind: "text",
        text: "`<form>` regroupe des champs et définit où (`action`) et comment (`method`) leurs données sont envoyées.",
      },
      {
        kind: "fields",
        title: "Fiche balise",
        fields: [          {
            label: "`action`",
            value:
              "L'URL qui recevra les données. Si elle est absente, le formulaire est renvoyé vers la page courante.",
          },
          {
            label: "`method` : GET ou POST",
            value:
              "Pourquoi deux méthodes : `GET` place les données dans l'URL (`/recherche?q=chat`) — adapté aux recherches et filtres, avec URLs partageables. `POST` envoie les données dans le corps de la requête, invisibles dans l'URL — adapté aux inscriptions, paiements, contenus sensibles.",
          },
          {
            label: "`name` sur les champs",
            value:
              "Chaque champ doit avoir un `name` : c'est la clé sous laquelle sa valeur est envoyée (`q=chat`). Sans `name`, le champ est ignoré à l'envoi.",
          },
          {
            label: "La touche Entrée",
            value:
              "Dans un formulaire, Entrée dans un champ texte soumet automatiquement le formulaire — un comportement natif à ne pas casser. C'est une raison de plus d'utiliser de vrais formulaires plutôt que des `<div>` + JavaScript.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `name` sur les champs : le formulaire semble fonctionner mais n'envoie rien. Autre classique : imbriquer des `<form>` — invalide, les formulaires ne s'imbriquent jamais.",
          },
        ],
      },
    ],
  },
  {
    id: "champs-saisie",
    title: "Champs de saisie : input",
    level: 3,
    intro:
      "Le couteau suisse des formulaires : un élément, une douzaine de comportements selon `type`.",
    blocks: [
      {
        kind: "table",
        headers: ["Type", "Usage", "À savoir"],
        rows: [
          ["`text`", "Texte libre court", "Le défaut ; ajoutez `maxlength` si besoin"],
          ["`email`", "Adresse e-mail", "Validation native du format + clavier adapté sur mobile"],
          ["`password`", "Mot de passe", "Caractères masqués ; propose le gestionnaire de mots de passe"],
          ["`number`", "Nombre", "Flèches d'incrément ; `min`, `max`, `step`"],
          ["`tel`", "Téléphone", "Clavier numérique sur mobile (pas de validation de format)"],
          ["`url`", "Adresse web", "Validation native du format d'URL"],
          ["`date`", "Date", "Sélecteur de calendrier natif"],
          ["`checkbox`", "Case à cocher", "Choix multiples indépendants ; `checked` pour présélectionner"],
          ["`radio`", "Bouton radio", "Même `name` pour un choix exclusif dans un groupe"],
          ["`file`", "Envoi de fichier", "`accept` filtre les types (ex. `accept=\"image/*\"`)"],
          ["`hidden`", "Donnée invisible", "Valeur technique envoyée avec le formulaire"],
        ],
      },
      {
        kind: "code",
        language: "html",
        title: "Groupe de boutons radio",
        code: "<fieldset>\n  <legend>Mode de livraison</legend>\n  <label><input type=\"radio\" name=\"livraison\" value=\"standard\" checked> Standard</label>\n  <label><input type=\"radio\" name=\"livraison\" value=\"express\"> Express</label>\n</fieldset>",
      },
      {
        kind: "text",
        text: "Pourquoi autant de types : le bon `type` donne gratuitement la validation, le clavier mobile adapté et une sémantique claire pour les technologies d'assistance. Un `type=\"text\"` partout, c'est renoncer à tout cela.",
      },
      {
        kind: "text",
        text: "Erreur fréquente : des boutons radio avec des `name` différents — ils deviennent indépendants et l'utilisateur peut cocher les deux. Bonne pratique : un seul `name` par groupe de choix exclusif.",
      },
    ],
  },
  {
    id: "labels",
    title: "Labels : associer chaque champ à son libellé",
    level: 3,
    intro:
      "Un champ sans `<label>` est un champ inutilisable pour une partie des utilisateurs.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Les deux syntaxes équivalentes",
        code: "<!-- Syntaxe explicite : for = id du champ -->\n<label for=\"email\">Adresse e-mail</label>\n<input type=\"email\" id=\"email\" name=\"email\">\n\n<!-- Syntaxe enveloppante -->\n<label>Adresse e-mail\n  <input type=\"email\" name=\"email\">\n</label>",
      },
      {
        kind: "text",
        text: "`<label>` associe un libellé descriptif à un champ de formulaire, via `for`/`id` ou par enveloppement.",
      },
      {
        kind: "text",
        text: "Trois bénéfices concrets : la zone cliquable est agrandie (cliquer le libellé active le champ — précieux sur mobile), les lecteurs d'écran annoncent le libellé avec le champ, et les tests automatisés s'y retrouvent.",
      },
      {
        kind: "text",
        text: "Sur absolument chaque champ visible : texte, e-mail, cases à cocher, boutons radio, listes déroulantes, zones de texte. Sans exception.",
      },
      {
        kind: "fields",
        title: "Fiche balise",
        fields: [
          {
            label: "Erreur fréquente",
            value:
              "Utiliser le `placeholder` comme seul libellé : il disparaît dès la saisie (l'utilisateur oublie ce qu'on lui demandait), il est souvent en contraste insuffisant et mal supporté par les lecteurs d'écran. Le `placeholder` est un exemple, pas un libellé.",
          },
          {
            label: "Bonne pratique",
            value:
              "Libellé visible en permanence + `placeholder` en exemple complémentaire si utile : `<label for=\"tel\">Téléphone</label><input placeholder=\"06 12 34 56 78\">`.",
          },
        ],
      },
    ],
  },
  {
    id: "boutons",
    title: "Boutons : button",
    level: 3,
    intro:
      "Déclencher des actions : le seul élément cliquable vraiment accessible par défaut.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Les trois types",
        code: "<form action=\"/inscription\" method=\"post\">\n  <!-- ... champs ... -->\n  <button type=\"submit\">S'inscrire</button>\n  <button type=\"reset\">Effacer</button>\n</form>\n<button type=\"button\">Charger plus</button>",
      },
      {
        kind: "text",
        text: "`<button>` déclenche une action ; son `type` précise laquelle.",
      },
      {
        kind: "fields",
        title: "Fiche balise",
        fields: [          {
            label: "`type=\"submit\"`",
            value:
              "Envoie le formulaire parent. C'est la valeur par défaut quand `<button>` est dans un `<form>` — le piège classique : un bouton « Annuler » sans `type` envoie le formulaire par accident.",
          },
          {
            label: "`type=\"button\"`",
            value:
              "Ne fait rien par défaut : à utiliser pour les actions gérées en JavaScript (ouvrir un panneau, charger plus de résultats). Toujours le préciser hors formulaire.",
          },
          {
            label: "`type=\"reset\"`",
            value:
              "Réinitialise les champs du formulaire. À utiliser avec parcimonie : effacer un long formulaire par accident est frustrant.",
          },
          {
            label: "`disabled`",
            value:
              "Désactive le bouton (non cliquable, exclu de la tabulation). Attention : un bouton désactivé n'explique pas pourquoi — accompagnez-le d'un message.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Fabriquer un bouton avec `<div onclick>` : on perd la navigation au clavier (Tab/Entrée/Espace), l'annonce « bouton » aux lecteurs d'écran et les styles de focus. Un vrai `<button>` donne tout cela gratuitement.",
          },
        ],
      },
    ],
  },
  {
    id: "listes-deroulantes",
    title: "Listes déroulantes : select et datalist",
    level: 3,
    intro:
      "Proposer un choix dans une liste : fermé avec `<select>`, ouvert avec `<datalist>`.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Select avec groupes d'options",
        code: "<label for=\"pays\">Pays</label>\n<select id=\"pays\" name=\"pays\">\n  <option value=\"\">— Choisir —</option>\n  <optgroup label=\"Afrique\">\n    <option value=\"mg\">Madagascar</option>\n    <option value=\"sn\">Sénégal</option>\n  </optgroup>\n  <optgroup label=\"Europe\">\n    <option value=\"fr\">France</option>\n  </optgroup>\n</select>",
      },
      {
        kind: "fields",
        title: "Fiches balises",
        fields: [
          {
            label: "`<select>`, `<option>`, `<optgroup>`",
            value:
              "En une phrase : une liste déroulante à choix (unique par défaut, multiple avec `multiple` + `size`). `<optgroup>` regroupe les options sous un intitulé. La première option vide (« — Choisir — ») évite une sélection par défaut trompeuse.",
          },
          {
            label: "`<datalist>`",
            value:
              "En une phrase : des suggestions associées à un champ texte — l'utilisateur peut choisir une suggestion OU saisir librement. Quand l'utiliser : complétion de ville, de tag, quand la liste est indicative. Différence clé avec `<select>` : `<select>` impose un choix fermé, `<datalist>` suggère sans contraindre.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Un `<select>` de 200 pays sans option de recherche ni regroupement : pénible à utiliser. Pour les très longues listes, `<datalist>` ou un champ avec autocomplétion est plus adapté.",
          },
        ],
      },
      {
        kind: "code",
        language: "html",
        title: "Datalist : suggestions sans contrainte",
        code: "<label for=\"ville\">Ville</label>\n<input list=\"villes\" id=\"ville\" name=\"ville\">\n<datalist id=\"villes\">\n  <option value=\"Antananarivo\">\n  <option value=\"Toamasina\">\n  <option value=\"Antsirabe\">\n</datalist>",
      },
    ],
  },
  {
    id: "zones-texte",
    title: "Zones de texte : textarea",
    level: 3,
    intro:
      "La saisie de texte long, multiligne.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Zone de commentaire",
        code: "<label for=\"message\">Votre message</label>\n<textarea id=\"message\" name=\"message\" rows=\"5\" cols=\"40\" maxlength=\"1000\" placeholder=\"Décrivez votre besoin…\"></textarea>",
      },
      {
        kind: "text",
        text: "`<textarea>` crée une zone de saisie multiligne redimensionnable, pour les messages, commentaires et descriptions.",
      },
      {
        kind: "text",
        text: "Dès que la saisie dépasse quelques mots : message, adresse, description. Pour une ligne (nom, e-mail), `<input type=\"text\">` reste adapté.",
      },
      {
        kind: "fields",
        title: "Fiche balise",
        fields: [          {
            label: "Attributs clés",
            value:
              "`rows` / `cols` : dimensions initiales (indicatives, CSS peut les redéfinir). `maxlength` : limite de caractères avec compteur natif. Contrairement à `<input>`, la valeur par défaut se place entre les balises, pas dans un attribut `value`.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Utiliser `<input type=\"text\">` pour un message long : une seule ligne visible, saisie pénible. Ou l'inverse : `<textarea rows=\"1\">` pour un nom — incohérent.",
          },
        ],
      },
    ],
  },
  {
    id: "groupes-champs",
    title: "Grouper les champs : fieldset et legend",
    level: 3,
    intro:
      "Donner un titre à un groupe de champs liés.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Groupe de cases à cocher",
        code: "<fieldset>\n  <legend>Centres d'intérêt</legend>\n  <label><input type=\"checkbox\" name=\"interet\" value=\"sport\"> Sport</label>\n  <label><input type=\"checkbox\" name=\"interet\" value=\"musique\"> Musique</label>\n  <label><input type=\"checkbox\" name=\"interet\" value=\"lecture\"> Lecture</label>\n</fieldset>",
      },
      {
        kind: "text",
        text: "`<fieldset>` regroupe des champs liés et `<legend>` leur donne un titre, comme un mini-formulaire dans le formulaire.",
      },
      {
        kind: "text",
        text: "Les lecteurs d'écran annoncent la légende avec chaque champ du groupe (« Centres d'intérêt : case à cocher Sport ») — sans `<legend>`, une série de cases à cocher est incompréhensible hors contexte visuel.",
      },
      {
        kind: "text",
        text: "Groupes de boutons radio, groupes de cases à cocher, sections d'un long formulaire (coordonnées, livraison, paiement).",
      },
      {
        kind: "fields",
        title: "Fiche balises",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Un seul `<legend>` par `<fieldset>`, placé en premier enfant, formulé comme une question ou un intitulé clair.",
          },
        ],
      },
    ],
  },
  {
    id: "validation-native",
    title: "Validation native des formulaires",
    level: 3,
    intro:
      "Faire vérifier les champs par le navigateur, sans une ligne de JavaScript.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Formulaire avec validation intégrée",
        code: "<form action=\"/inscription\" method=\"post\">\n  <label for=\"email\">E-mail</label>\n  <input type=\"email\" id=\"email\" name=\"email\" required>\n\n  <label for=\"mdp\">Mot de passe (8 caractères min.)</label>\n  <input type=\"password\" id=\"mdp\" name=\"mdp\" minlength=\"8\" required>\n\n  <label for=\"code\">Code postal (5 chiffres)</label>\n  <input type=\"text\" id=\"code\" name=\"code\" pattern=\"[0-9]{5}\" title=\"5 chiffres, ex. 10100\">\n\n  <button type=\"submit\">S'inscrire</button>\n</form>",
      },
      {
        kind: "fields",
        title: "Les attributs de validation",
        fields: [
          {
            label: "`required`",
            value:
              "Le champ doit être rempli. Le navigateur bloque l'envoi et affiche un message dans la langue de l'utilisateur.",
          },
          {
            label: "`type=\"email\"`, `type=\"url\"`…",
            value:
              "Le type vérifie le format en plus de fournir le clavier adapté. Première couche de validation gratuite.",
          },
          {
            label: "`minlength` / `maxlength`",
            value:
              "Longueurs minimale et maximale du texte saisi.",
          },
          {
            label: "`min` / `max` / `step`",
            value:
              "Bornes pour les nombres et dates (`min=\"18\" max=\"99\"` sur un âge).",
          },
          {
            label: "`pattern` (+ `title`)",
            value:
              "Une expression régulière que la valeur doit respecter. L'attribut `title` explique le format attendu (« 5 chiffres ») car le message natif est générique.",
          },
          {
            label: "`novalidate` sur `<form>`",
            value:
              "Désactive toute la validation native — utile uniquement quand on la remplace par une validation JavaScript personnalisée.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Se reposer uniquement sur la validation côté client : elle est contournable en deux clics (DevTools). La validation serveur reste obligatoire ; la validation HTML n'est qu'un confort pour l'utilisateur honnête.",
          },
          {
            label: "Bonne pratique",
            value:
              "Commencez toujours par la validation native (zéro code, messages traduits, accessible), puis ajoutez du JavaScript seulement pour les règles qu'elle ne couvre pas.",
          },
        ],
      },
    ],
  },
  {
    id: "html-semantique",
    title: "HTML sémantique : les landmarks",
    level: 3,
    intro:
      "Décrire le rôle des grandes zones de la page, pas seulement leur apparence.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : le HTML sémantique utilise des balises qui décrivent le sens du contenu (`<nav>`, `<main>`, `<article>`) plutôt que des `<div>` génériques.",
      },
      {
        kind: "text",
        text: "Pourquoi ça existe : trois bénéficiaires. Les lecteurs d'écran offrent des raccourcis (« aller au contenu principal », « lister les zones de navigation ») basés sur ces repères. Les moteurs de recherche comprennent mieux la page. Et les développeurs lisent un code qui raconte sa propre structure.",
      },
      {
        kind: "table",
        headers: ["Balise", "Rôle", "Usage"],
        rows: [
          ["`<header>`", "En-tête", "Bandeau de la page ou d'une section (logo, titre)"],
          ["`<nav>`", "Navigation", "Menus de liens principaux"],
          ["`<main>`", "Contenu principal", "Un seul par page ; la cible du lien « passer au contenu »"],
          ["`<article>`", "Contenu autonome", "Billet de blog, carte produit, commentaire — redistribuable seul"],
          ["`<section>`", "Section thématique", "Regroupement avec un titre"],
          ["`<aside>`", "Complément", "Barre latérale, encadrés liés au contenu"],
          ["`<footer>`", "Pied", "Pied de page ou de section (liens, mentions)"],
          ["`<address>`", "Coordonnées", "Contact de l'auteur/du site, souvent dans le footer"],
        ],
      },
      {
        kind: "code",
        language: "html",
        title: "Structure sémantique typique",
        code: "<header>\n  <h1>Mon blog</h1>\n  <nav aria-label=\"Navigation principale\">\n    <ul><li><a href=\"/\">Accueil</a></li></ul>\n  </nav>\n</header>\n<main>\n  <article>\n    <h2>Mon premier article</h2>\n    <p>Contenu…</p>\n  </article>\n</main>\n<footer>\n  <p>© 2026 Mon blog</p>\n</footer>",
      },
    ],
  },
  {
    id: "section-article-div",
    title: "Section, article ou div : comment choisir",
    level: 3,
    intro:
      "Le dilemme le plus courant du HTML sémantique, tranché par une règle simple.",
    blocks: [
      {
        kind: "table",
        headers: ["Situation", "Balise", "Test"],
        rows: [
          ["Contenu autonome, compréhensible seul et redistribuable (flux RSS, carte)", "`<article>`", "« Est-ce que ça aurait du sens dans un lecteur RSS ? »"],
          ["Regroupement thématique de contenu avec un titre", "`<section>`", "« Est-ce que je peux lui donner un titre ? » — sinon, ce n'est pas une section"],
          ["Contenu tangentiel ou complémentaire", "`<aside>`", "Lié au contenu principal sans en faire partie"],
          ["Regroupement purement visuel ou technique (mise en page, ciblage JS)", "`<div>`", "Aucun sens particulier à exprimer"],
        ],
      },
      {
        kind: "fields",
        title: "Erreurs et bonnes pratiques",
        fields: [
          {
            label: "Erreur fréquente",
            value:
              "Une `<section>` sans titre : si le regroupement n'a pas de titre (`<h2>`–`<h6>`), c'est presque toujours un `<div>`. De même, un `<article>` qui n'est autonome dans aucun contexte est un `<section>` déguisé.",
          },
          {
            label: "Bonne pratique",
            value:
              "La « div-ite » (des `<div>` partout) n'est pas un crime en soi : `<div>` reste la bonne balise quand il n'y a aucun sens à exprimer. Le problème n'est pas `<div>`, c'est `<div>` à la place d'une balise sémantique évidente.",
          },
          {
            label: "Règle mnémotechnique",
            value:
              "`<div>` = boîte visuelle, `<section>` = chapitre avec titre, `<article>` = document autonome. En cas de doute entre `<section>` et `<div>`, demandez-vous si un titre s'impose.",
          },
        ],
      },
    ],
  },
  {
    id: "video-audio",
    title: "Vidéo et audio",
    level: 3,
    intro:
      "Intégrer des médias temporels avec contrôles et sous-titres natifs.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Vidéo accessible",
        code: "<video controls preload=\"metadata\" poster=\"apercu.jpg\" width=\"640\">\n  <source src=\"demo.mp4\" type=\"video/mp4\">\n  <source src=\"demo.webm\" type=\"video/webm\">\n  <track kind=\"subtitles\" src=\"sous-titres.fr.vtt\" srclang=\"fr\" label=\"Français\">\n  Votre navigateur ne supporte pas la vidéo.\n</video>",
      },
      {
        kind: "text",
        text: "`<video>` et `<audio>` intègrent des médias avec une interface de lecture native ; `<source>` propose plusieurs formats, `<track>` les sous-titres.",
      },
      {
        kind: "fields",
        title: "Fiche balises",
        fields: [          {
            label: "`controls`",
            value:
              "Affiche l'interface (lecture, volume, plein écran). Sans lui et sans JavaScript personnalisé, le média est invisible/injouable : toujours le fournir sauf interface sur mesure.",
          },
          {
            label: "`<source>` multiples",
            value:
              "Les navigateurs ne supportent pas tous les mêmes formats : proposer plusieurs `<source>` laisse le navigateur choisir le premier qu'il sait lire. L'attribut `type` lui évite de télécharger pour tester.",
          },
          {
            label: "`<track kind=\"subtitles\">`",
            value:
              "Pourquoi ça existe : sous-titres pour les personnes sourdes ou malentendantes, et pour le visionnage sans son. Le format WebVTT (`.vtt`) est un simple fichier texte horodaté.",
          },
          {
            label: "`preload` / `poster`",
            value:
              "`preload=\"metadata\"` ne charge que les métadonnées (durée, dimensions) au lieu de tout le fichier. `poster` affiche une image d'aperçu avant lecture.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Une vidéo en lecture automatique avec son : bloquée par les navigateurs (et désagréable). La lecture auto n'est tolérée qu'en muet (`muted`).",
          },
        ],
      },
    ],
  },
  {
    id: "iframes",
    title: "Contenu intégré : iframe",
    level: 3,
    intro:
      "Embarquer une autre page (carte, vidéo externe) en maîtrisant les risques.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Iframe sécurisée",
        code: "<iframe src=\"https://www.openstreetmap.org/export/embed.html\"\n        title=\"Carte du centre d'Antananarivo\"\n        width=\"600\" height=\"450\"\n        loading=\"lazy\"\n        sandbox=\"allow-scripts allow-same-origin\">\n</iframe>",
      },
      {
        kind: "text",
        text: "`<iframe>` affiche une page web externe dans un cadre, comme une fenêtre vers un autre site.",
      },
      {
        kind: "fields",
        title: "Fiche balise",
        fields: [          {
            label: "`title` — obligatoire",
            value:
              "Les lecteurs d'écran annoncent l'iframe par son titre : sans lui, l'utilisateur entend « cadre » sans savoir ce qu'il contient. Décrivez le contenu embarqué.",
          },
          {
            label: "`sandbox`",
            value:
              "Pourquoi ça existe : une page embarquée peut exécuter du JavaScript et tenter d'agir sur votre page. `sandbox` restreint ses capacités (formulaires, scripts, popups…) : on n'autorise que le strict nécessaire.",
          },
          {
            label: "`loading=\"lazy\"`",
            value:
              "Diffère le chargement de l'iframe hors écran — les cartes et vidéos embarquées sont souvent lourdes.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Intégrer du contenu tiers sans `sandbox` ni vérification de la source : une iframe compromise peut afficher du contenu malveillant sous votre nom de domaine apparent.",
          },
          {
            label: "Bonne pratique",
            value:
              "N'embarquez que des sources de confiance, avec `sandbox` restrictif et un `title` descriptif.",
          },
        ],
      },
    ],
  },
  {
    id: "details-dialog",
    title: "Interactif natif : details et dialog",
    level: 3,
    intro:
      "Des composants interactifs accessibles sans écrire une ligne de JavaScript.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Accordéon et boîte de dialogue natifs",
        code: "<!-- Accordéon natif : cliquable, pliable, accessible au clavier -->\n<details>\n  <summary>Quels sont les délais de livraison ?</summary>\n  <p>Comptez 3 à 5 jours ouvrés.</p>\n</details>\n\n<!-- Boîte de dialogue (nécessite un peu de JS pour l'ouvrir) -->\n<dialog id=\"panier\">\n  <h2>Votre panier</h2>\n  <form method=\"dialog\"><button>Fermer</button></form>\n</dialog>",
      },
      {
        kind: "fields",
        title: "Fiches balises",
        fields: [
          {
            label: "`<details>` / `<summary>`",
            value:
              "En une phrase : un bloc repliable dont `<summary>` est l'intitulé toujours visible. Pourquoi ça existe : FAQ, spoilers, sections optionnelles — sans JavaScript, avec la gestion clavier et l'annonce « développé/replié » offertes par le navigateur. L'attribut `open` l'affiche déplié par défaut.",
          },
          {
            label: "`<dialog>`",
            value:
              "En une phrase : une boîte de dialogue (modale) native. Quand l'utiliser : confirmations, formulaires en surcouche. La méthode `showModal()` (JavaScript) l'affiche en modale avec focus piégé et fond assombri gérés par le navigateur — deux comportements notoirement difficiles à bien implémenter à la main.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Réinventer un accordéon en `<div>` + JavaScript : on perd la sémantique, la navigation clavier et il faut réimplémenter les attributs ARIA. Le natif fait mieux en une ligne.",
          },
          {
            label: "Bonne pratique",
            value:
              "Avant de coder un composant interactif, vérifiez si HTML le propose en natif : `details`, `dialog`, `select`, validation de formulaire… Le natif est testé sur tous les navigateurs et toutes les technologies d'assistance.",
          },
        ],
      },
    ],
  },
  {
    id: "accessibilite-bases",
    title: "Accessibilité : les fondations HTML",
    level: 3,
    intro:
      "L'accessibilité se joue d'abord dans le HTML, bien avant CSS et JavaScript.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : un HTML bien structuré est accessible par défaut — la plupart des problèmes d'accessibilité viennent d'un HTML qui ne dit pas ce qu'il fait.",
      },
      {
        kind: "list",
        items: [
          "Un `alt` pertinent sur chaque image informative (`alt=\"\"` pour le décoratif).",
          "Un `<label>` sur chaque champ de formulaire, un `<legend>` par groupe.",
          "Une hiérarchie de titres logique : un seul `<h1>`, pas de niveau sauté.",
          "L'attribut `lang` correct sur `<html>` pour la synthèse vocale.",
          "Des vrais liens (`<a href>`) pour naviguer et des vrais boutons (`<button>`) pour agir.",
          "Un ordre de tabulation naturel : le focus suit l'ordre du document, ne le cassez pas.",
          "Un lien « Aller au contenu » en haut de page (`<a href=\"#contenu\">`) pour les utilisateurs au clavier : il leur évite de tabuler à travers tout le menu.",
        ],
      },
      {
        kind: "code",
        language: "html",
        title: "Lien d'évitement (skip link)",
        code: "<body>\n  <a href=\"#contenu\">Aller au contenu principal</a>\n  <header><!-- navigation --></header>\n  <main id=\"contenu\">\n    <!-- contenu -->\n  </main>\n</body>",
      },
      {
        kind: "text",
        text: "Bonne pratique : testez votre page au clavier seul (Tab pour naviguer, Entrée pour activer) : si tout est atteignable et utilisable, les fondations sont saines. Les lecteurs d'écran (NVDA, VoiceOver) viennent ensuite affiner le diagnostic.",
      },
    ],
  },
  {
    id: "aria-quand-necessaire",
    title: "ARIA : quand le HTML natif ne suffit pas",
    level: 3,
    intro:
      "Compléter la sémantique — sans jamais remplacer ce que HTML fait déjà.",
    blocks: [
      {
        kind: "fields",
        title: "L'essentiel d'ARIA en HTML",
        fields: [
          {
            label: "Règle d'or",
            value:
              "Pas d'ARIA vaut mieux que du mauvais ARIA. La première règle officielle est : utilisez l'élément HTML natif quand il existe (`<button>`, `<nav>`, `<input type=\"checkbox\">`) — il apporte déjà le rôle, le clavier et l'annonce. ARIA ne sert que pour ce que HTML ne peut pas exprimer.",
          },
          {
            label: "`role`",
            value:
              "Redéfinit le rôle annoncé d'un élément, quand aucun élément natif ne convient (ex. `role=\"tablist\"` pour un système d'onglets sur mesure). Attention : ajouter un `role` ne donne pas le comportement clavier — il faut l'implémenter en JavaScript.",
          },
          {
            label: "`aria-label` / `aria-labelledby`",
            value:
              "Donne un nom accessible à un élément qui n'en a pas en texte visible : bouton « fermer » représenté par une croix (`aria-label=\"Fermer\"`), ou région désignée par un titre (`aria-labelledby=\"titre-panier\"`).",
          },
          {
            label: "`aria-describedby`",
            value:
              "Associe une description complémentaire : un champ avec son format attendu (`aria-describedby=\"format-tel\"`).",
          },
          {
            label: "`aria-expanded`",
            value:
              "Indique l'état déplié/replié d'un bouton qui contrôle un panneau (`true`/`false`) — indispensable sur les menus « hamburger » et accordéons sur mesure.",
          },
          {
            label: "`aria-hidden=\"true\"`",
            value:
              "Masque un élément décoratif aux technologies d'assistance (icône purement visuelle à côté d'un texte explicite). Jamais sur un élément interactif ou porteur d'information.",
          },
          {
            label: "`aria-live`",
            value:
              "Annonce automatiquement les mises à jour dynamiques : `aria-live=\"polite\"` pour un message de confirmation après envoi. Sans lui, les utilisateurs de lecteurs d'écran ratent les contenus injectés en JavaScript.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`role=\"button\"` sur une `<div>` cliquable au lieu d'un vrai `<button>` : il faut alors réimplémenter Tab, Entrée, Espace et les états — pour un résultat toujours inférieur au natif.",
          },
        ],
      },
    ],
  },
  {
    id: "seo",
    title: "SEO : le HTML que lisent les moteurs",
    level: 3,
    intro:
      "Ce que les moteurs de recherche extraient de votre HTML.",
    blocks: [
      {
        kind: "text",
        text: "Les moteurs indexent d'abord votre HTML : un document clair, titré et structuré est la base du référencement.",
      },
      {
        kind: "fields",
        title: "Les leviers HTML du référencement",
        fields: [          {
            label: "`<title>` unique par page",
            value:
              "Le titre cliquable des résultats de recherche. Descriptif et spécifique à la page (« Formation HTML — niveau débutant | MonSite »), pas générique.",
          },
          {
            label: "`<meta name=\"description\">`",
            value:
              "Le texte sous le titre dans les résultats. Il n'améliore pas directement le classement, mais un résumé incitatif augmente le taux de clic.",
          },
          {
            label: "Hiérarchie de titres",
            value:
              "Un seul `<h1>` qui résume le sujet de la page, des `<h2>` pour les parties : c'est le plan que le moteur utilise pour comprendre le contenu.",
          },
          {
            label: "HTML sémantique",
            value:
              "`<article>`, `<nav>`, `<main>` aident le moteur à distinguer contenu principal, navigation et compléments.",
          },
          {
            label: "Balises Open Graph",
            value:
              "`<meta property=\"og:title\">`, `og:description`, `og:image` : contrôlent l'aperçu quand la page est partagée sur les réseaux sociaux (titre, résumé, image).",
          },
          {
            label: "`<html lang>` et URLs propres",
            value:
              "La langue déclarée aide au classement par langue ; des URLs lisibles (`/guide/html`) sont préférables aux paramètres obscurs.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Le « bourrage de mots-clés » (répéter un mot-clé artificiellement) : pénalisé par les moteurs. Ou l'inverse : une page dont le contenu principal est injecté en JavaScript sans rendu côté serveur peut être mal indexée.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro:
      "Les habitudes qui distinguent un HTML professionnel d'un HTML qui « marche à peu près ».",
    blocks: [
      {
        kind: "list",
        items: [
          "Toujours commencer par `<!DOCTYPE html>` : sans lui, le navigateur bascule en mode de compatibilité.",
          "Déclarer `lang` sur `<html>` et `<meta charset=\"utf-8\">` en premier dans le `<head>`.",
          "Écrire les balises et attributs en minuscules, les valeurs d'attributs entre guillemets.",
          "Fermer toutes les balises qui doivent l'être, dans l'ordre inverse de l'ouverture.",
          "Indenter le code de façon cohérente : l'imbrication doit se voir d'un coup d'œil.",
          "Séparer les rôles : HTML pour le contenu, CSS pour la présentation, JavaScript pour le comportement — pas de `style=\"…\"` ni de `onclick=\"…\"` en ligne dans un projet sérieux.",
          "Commenter les grandes sections (`<!-- Navigation principale -->`), pas chaque ligne.",
          "Utiliser des `id` uniques et des noms de `class` explicites.",
          "Valider chaque page au validateur du W3C avant de la considérer terminée.",
        ],
      },
      {
        kind: "text",
        text: "Principe général : écrivez le HTML pour qu'il soit compréhensible sans CSS — si la page reste claire et navigable avec les styles désactivés, la structure est saine.",
      },
    ],
  },
  {
    id: "erreurs-frequentes",
    title: "Erreurs fréquentes : le mauvais vs le mieux",
    level: 3,
    intro:
      "Les pièges classiques, avec leur correction.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue d'erreurs",
        fields: [
          {
            label: "La « div-ite » aiguë",
            value:
              "Mauvais : `<div class=\"header\">` `<div class=\"nav\">` `<div class=\"main\">`. Mieux : `<header>`, `<nav>`, `<main>` — la sémantique offerte par le navigateur.",
          },
          {
            label: "Image sans `alt`",
            value:
              "Mauvais : `<img src=\"graphique.png\">`. Mieux : `<img src=\"graphique.png\" alt=\"Chiffre d'affaires 2024 : 1,2 M€\">` — ou `alt=\"\"` si décorative.",
          },
          {
            label: "Plusieurs `<h1>`",
            value:
              "Mauvais : un `<h1>` par section pour « avoir de gros titres ». Mieux : un seul `<h1>` par page, puis `<h2>`, `<h3>`… La taille se règle en CSS.",
          },
          {
            label: "« Cliquez ici »",
            value:
              "Mauvais : `<a href=\"rapport.pdf\">Cliquez ici</a>`. Mieux : `<a href=\"rapport.pdf\">Télécharger le rapport annuel (PDF)</a>` — explicite hors contexte.",
          },
          {
            label: "Tableau de mise en page",
            value:
              "Mauvais : un `<table>` pour aligner un formulaire en colonnes. Mieux : CSS pour la mise en page, `<table>` réservé aux données tabulaires.",
          },
          {
            label: "`<br><br><br>` pour espacer",
            value:
              "Mauvais : des sauts de ligne comme outil de mise en page. Mieux : des marges en CSS, et un `<br>` uniquement quand le saut fait partie du contenu (adresse, poème).",
          },
          {
            label: "`target=\"_blank\"` sans `rel`",
            value:
              "Mauvais : `<a href=\"…\" target=\"_blank\">`. Mieux : ajouter `rel=\"noopener\"` — sinon la page liée peut contrôler votre page via `window.opener`.",
          },
          {
            label: "`id` dupliqués",
            value:
              "Mauvais : deux éléments avec `id=\"menu\"`. Mieux : des `id` uniques — les ancres, les `label for` et le JavaScript (`getElementById`) ciblent le premier trouvé, avec des résultats imprévisibles sinon.",
          },
          {
            label: "Bouton en `<div>`",
            value:
              "Mauvais : `<div onclick=\"valider()\">OK</div>`. Mieux : `<button type=\"button\">OK</button>` — clavier, focus et annonce « bouton » inclus.",
          },
        ],
      },
    ],
  },
  {
    id: "balises-obsoletes",
    title: "Balises à ne plus utiliser",
    level: 3,
    intro:
      "Le HTML a 30 ans : certaines balises sont obsolètes et doivent être remplacées.",
    blocks: [
      {
        kind: "table",
        headers: ["Balise", "Pourquoi l'éviter", "Alternative"],
        rows: [
          ["`<font>`", "Mélange contenu et présentation (couleur, taille en dur)", "CSS (`color`, `font-size`)"],
          ["`<center>`", "Centrage présentationnel", "CSS (`text-align: center`, `margin: auto`)"],
          ["`<b>` / `<i>`", "Purement visuels, sans sens transmis", "`<strong>` / `<em>` si le sens compte, CSS sinon"],
          ["`<u>`", "Le souligné évoque un lien", "CSS (`text-decoration`) si vraiment nécessaire"],
          ["`<frame>` / `<frameset>`", "Retirés du standard, incompatibles avec le web moderne", "`<iframe>` ou mise en page CSS"],
          ["`<applet>`", "Technologie Java embarquée abandonnée", "Technologies web natives"],
          ["`<big>`", "Présentationnel", "CSS (`font-size`)"],
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : face à une vieille balise ou un vieux tutoriel, vérifiez son statut sur MDN — chaque page de référence indique clairement si un élément est obsolète ou déconseillé, et propose l'alternative moderne.",
      },
    ],
  },
  {
    id: "projets",
    title: "Projets réalistes",
    level: 3,
    intro:
      "Quatre projets progressifs pour passer de la théorie à la pratique — bien au-delà du « hello world ».",
    blocks: [
      {
        kind: "fields",
        title: "Progression de projets",
        fields: [
          {
            label: "1. Page CV sémantique (débutant)",
            value:
              "Objectif : structurer un vrai document. Prérequis : bases (titres, listes, liens, images). Vous construisez : votre CV en une page — en-tête avec photo, sections expérience/formation/compétences, liens de contact. Concepts utilisés : `<header>`, `<main>`, `<section>`, listes, `mailto:`. Difficulté : accessible dès la première semaine. Ensuite : le formulaire d'inscription.",
          },
          {
            label: "2. Formulaire d'inscription accessible (intermédiaire)",
            value:
              "Objectif : maîtriser les formulaires de bout en bout. Prérequis : page CV, bases des formulaires. Vous construisez : un formulaire d'inscription complet — identité, e-mail avec validation native, mot de passe, choix multiples avec `<fieldset>`, conditions à cocher. Concepts utilisés : tous les types d'`input`, `<label>`, validation native (`required`, `pattern`), messages d'erreur. Difficulté : demande de la rigueur sur l'accessibilité. Ensuite : le clone de landing page.",
          },
          {
            label: "3. Clone d'une landing page (intermédiaire)",
            value:
              "Objectif : reproduire fidèlement une page existante. Prérequis : formulaires, sémantique. Vous construisez : le clone en HTML pur (sans CSS d'abord) d'une landing page réelle à partir d'une capture : navigation, hero, sections de fonctionnalités, tarifs en tableau, FAQ en `<details>`, footer. Concepts utilisés : landmarks, tableaux, médias, ancres de navigation. Difficulté : l'analyse de la structure d'une page complexe. Ensuite : le site multi-pages.",
          },
          {
            label: "4. Site statique multi-pages (avancé)",
            value:
              "Objectif : penser un site comme un ensemble cohérent. Prérequis : les trois projets précédents. Vous construisez : un mini-site de 4–5 pages (accueil, services, tarifs, blog, contact) avec navigation identique partout, fils d'Ariane, métadonnées SEO par page (`title`, `description`, Open Graph), servies en local avec `npx serve`. Concepts utilisés : organisation des fichiers, chemins relatifs, `<nav>` cohérente, SEO de base. Difficulté : la cohérence sur plusieurs pages. Ensuite : apprendre CSS pour styliser l'ensemble.",
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
      "Les références officielles, à consulter dans cet ordre.",
    blocks: [
      {
        kind: "list",
        items: [
          "MDN Web Docs — Référence HTML : https://developer.mozilla.org/en-US/docs/Web/HTML — la documentation la plus complète et pédagogique, avec une page par élément (syntaxe, attributs, exemples, compatibilité navigateurs). Le premier réflexe.",
          "WHATWG — Standard HTML vivant : https://html.spec.whatwg.org/ — la spécification officielle. Dense, mais c'est la source qui tranche en cas de doute.",
          "Validateur W3C : https://validator.w3.org/ — pour vérifier la validité de vos pages.",
        ],
      },
      {
        kind: "text",
        text: "Méthode : apprenez sur MDN, vérifiez votre code au validateur, et ne plongez dans la spécification WHATWG que pour trancher un point précis (comportement exact d'un attribut, imbrication autorisée).",
      },
    ],
  },
  {
    id: "etape-suivante",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "HTML est la première marche : voici la suite logique.",
    blocks: [
      {
        kind: "text",
        text: "L'ordre recommandé est HTML → CSS → JavaScript, et il n'est pas arbitraire : chaque couche s'appuie sur la précédente. CSS stylise votre HTML, JavaScript le rend interactif.",
      },
      {
        kind: "list",
        items: [
          "CSS ensuite : couleurs, typographies, mises en page (Flexbox, Grid), responsive. Vos pages sémantiques deviennent de vrais sites présentables.",
          "JavaScript après : menus mobiles, validation avancée, contenu dynamique, appels réseau. Il manipule le DOM que vous savez maintenant construire proprement.",
          "En parallèle : continuez à valider chaque page au W3C et à la tester au clavier — ces réflexes se transfèrent à toutes les technologies web.",
        ],
      },
      {
        kind: "text",
        text: "Signe que vous êtes prêt pour CSS : vous construisez une page multi-sections sémantique et valide sans hésiter sur le choix des balises — la présentation devient alors le seul manque.",
      },
    ],
  },
];

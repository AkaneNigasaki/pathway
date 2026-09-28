import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Figma : prise en main concrète (fichier,
 * frames, auto-layout, composants, variants, prototypage, handoff),
 * raccourcis essentiels et workflow professionnel. 3 niveaux
 * d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_FIGMA: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Figma : l'outil de design d'interface collaboratif de référence.",
    blocks: [
      {
        kind: "text",
        text: "Figma est l'outil de design d'interface collaboratif de référence : dessin vectoriel, composants, prototypage et transmission aux développeurs — le tout dans le navigateur, en temps réel, à plusieurs. Fini les fichiers envoyés par e-mail : une seule source de vérité, toujours à jour, commentable.",
      },
      {
        kind: "text",
        text: "Pourquoi le maîtriser : Figma est le lieu où se prennent les décisions produit visuelles — maquettes, design systems, prototypes testables. Maîtriser l'auto-layout, les variants et les composants, c'est parler couramment avec les designers comme avec les développeurs, et c'est une compétence attendue sur la plupart des postes product design.",
      },
      {
        kind: "text",
        text: "Ce qu'il faut comprendre d'emblée : Figma n'est pas un logiciel de dessin amélioré. Sa puissance vient de la logique système — composants liés, styles nommés, contraintes de redimensionnement. Dessiner un écran est facile ; construire un fichier maintenable est le vrai savoir-faire.",
      },
    ],
  },
  {
    id: "figma-en-30-secondes",
    title: "Figma en 30 secondes : le flux de travail",
    level: 1,
    intro:
      "La carte mentale du passage d'une idée à une spec développeur.",
    blocks: [
      {
        kind: "diagram",
        title: "D'un cadre au handoff",
        lines: [
          "FRAME (le canevas)",
          "     │  on dessine dedans",
          "AUTO-LAYOUT (le responsive du designer)",
          "     │  le cadre s'ajuste au contenu",
          "STYLES & VARIABLES (le système)",
          "     │  couleurs, textes nommés et réutilisables",
          "COMPOSANTS & VARIANTS (la bibliothèque)",
          "     │  maître → instances liées",
          "PROTOTYPE (le testable)",
          "     │  écrans reliés par des interactions",
          "HANDOFF (la transmission)",
          "        specs, mesures et assets pour les devs",
        ],
      },
      {
        kind: "text",
        text: "Chaque couche s'appuie sur la précédente : un prototype solide repose sur des composants propres, qui reposent sur des styles nommés. Sauter des étapes (maquetter sans composants) crée une dette qui se paie dès la deuxième itération.",
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 2 — PRATIQUE
  // ------------------------------------------------------------------
  {
    id: "creer-premier-fichier",
    title: "Créer et organiser son premier fichier",
    level: 2,
    intro:
      "La structure qui évite le chaos dès le premier projet.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le fichier",
            detail:
              "Nouveau fichier de design (`New design file`). Le nommer explicitement : `[Produit] — [Périmètre] — [Version]`. Un fichier « Sans titre (12) » est déjà perdu.",
          },
          {
            title: "Créer les pages",
            detail:
              "Panneau de gauche → Pages : `Cover`, `Wireframes`, `Design`, `Prototype`, `Archive`. Les pages séparent les étapes et les états ; tout mélanger sur une page rend le fichier illisible.",
          },
          {
            title: "Faire la page de couverture",
            detail:
              "Une frame avec le nom du projet, la date, le statut et les liens utiles. C'est la première chose que voit un visiteur — et ce qui évite les « c'est la dernière version ? ».",
          },
          {
            title: "Définir la zone de travail",
            detail:
              "Sur la page `Design` : une frame par écran ou groupe d'écrans, espacées régulièrement, nommées (`01 — Accueil`, `02 — Inscription`). L'ordre de lecture suit l'ordre des frames.",
          },
          {
            title: "Archiver, pas supprimer",
            detail:
              "Les anciennes versions vont sur la page `Archive`, pas à la poubelle : l'historique des décisions est précieux.",
          },
        ],
      },
    ],
  },
  {
    id: "frames-vs-groupes",
    title: "Frames vs groupes : la distinction fondatrice",
    level: 2,
    intro:
      "Le concept le plus mal compris par les débutants — et le plus important.",
    blocks: [
      {
        kind: "fields",
        title: "Quand utiliser quoi",
        fields: [
          {
            label: "Frame (`F`)",
            value:
              "Le conteneur par défaut : représente un écran, une carte, un bouton. A des dimensions propres, supporte l'auto-layout, les contraintes et le prototypage. Toujours préférer la frame.",
          },
          {
            label: "Groupe (`Ctrl+G`)",
            value:
              "Simple regroupement sans dimensions propres : utile pour déplacer plusieurs éléments ensemble ponctuellement. Ne supporte pas l'auto-layout.",
          },
          {
            label: "Règle pratique",
            value:
              "Si ça représente quelque chose (écran, composant, section) → frame. Si c'est juste pour déplacer ensemble → groupe temporaire.",
          },
        ],
      },
      {
        kind: "text",
        text: "Conséquence concrète : les développeurs lisent la structure des frames pour comprendre la hiérarchie. Un fichier en groupes imbriqués produit un handoff incompréhensible.",
      },
    ],
  },
  {
    id: "auto-layout-essentiel",
    title: "Auto-layout : l'essentiel",
    level: 2,
    intro:
      "Des cadres qui s'ajustent au contenu : le responsive du designer.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Activer l'auto-layout",
            detail:
              "Sélectionner une frame, `Shift+A` (ou `+ Auto layout` dans le panneau). La frame devient un conteneur flexible : son contenu définit sa taille.",
          },
          {
            title: "Choisir la direction",
            detail:
              "Verticale (liste, carte) ou horizontale (barre d'outils, bouton avec icône). C'est l'équivalent de `flex-direction` en CSS.",
          },
          {
            title: "Régler les espacements",
            detail:
              "Padding (espace intérieur) et gap (espace entre enfants) en valeurs de la grille (8, 16, 24…). Des espacements réguliers = une interface cohérente.",
          },
          {
            title: "Gérer le redimensionnement",
            detail:
              "Chaque enfant : `hug` (s'ajuste au contenu), `fill` (remplit l'espace) ou `fixed`. Un bouton = hug ; un champ de formulaire = fill.",
          },
          {
            title: "Tester",
            detail:
              "Modifier le texte, ajouter un élément : le cadre s'ajuste. Si quelque chose casse, c'est généralement un enfant en `fixed` qui devrait être en `hug`.",
          },
        ],
      },
      {
        kind: "text",
        text: "Pourquoi c'est non négociable : sans auto-layout, chaque modification de contenu exige un réajustement manuel — et les composants ne sont pas réutilisables. 90 % des fichiers Figma « cassés » viennent d'une absence d'auto-layout.",
      },
    ],
  },
  {
    id: "constraints",
    title: "Constraints : le comportement au redimensionnement",
    level: 2,
    intro:
      "Définir comment chaque élément réagit quand son parent change de taille.",
    blocks: [
      {
        kind: "text",
        text: "Les contraintes définissent l'ancrage horizontal et vertical d'un élément dans sa frame : gauche/droite/centré/étiré. Exemple : dans une carte, l'image s'étire en largeur (`left & right`), le bouton reste ancré en bas à droite.",
      },
      {
        kind: "list",
        items: [
          "Tester systématiquement : redimensionner la frame parente et observer. Ce qui bouge mal a une mauvaise contrainte.",
          "Combinaison gagnante : auto-layout pour la structure interne + contraintes pour le positionnement dans l'écran.",
          "Cas typique : une modale centrée (`center`/`center`) qui reste centrée quelle que soit la taille d'écran.",
          "Erreur fréquente : tout laisser en `top`/`left` par défaut, puis s'étonner que la mise en page mobile soit cassée.",
        ],
      },
    ],
  },
  {
    id: "styles-couleur-texte",
    title: "Styles : couleurs, textes, effets",
    level: 2,
    intro:
      "Nommer pour réutiliser : changer un style met à jour tout le produit.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer les styles de couleur",
            detail:
              "Sélectionner un remplissage → menu styles → `+`. Nommer par rôle (`brand/500`, `text/primary`), pas par valeur. Créer la palette complète avant de maquetter.",
          },
          {
            title: "Créer les styles de texte",
            detail:
              "Même principe : `heading/1`, `body/medium`, `caption`… Chaque style fige police, taille, interligne, graisse. Appliquer uniquement des styles, jamais de formatage manuel.",
          },
          {
            title: "Créer les styles d'effet",
            detail:
              "Ombres et flous nommés (`shadow/card`, `shadow/modal`) : 3 à 4 niveaux suffisent.",
          },
          {
            title: "Appliquer et maintenir",
            detail:
              "Modifier un style propage le changement partout. Un élément au formatage manuel (pastille vide dans le panneau) est une anomalie à corriger.",
          },
        ],
      },
    ],
  },
  {
    id: "components-bases",
    title: "Composants : les bases",
    level: 2,
    intro:
      "Un maître, des instances liées : modifier une fois, mettre à jour partout.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le composant",
            detail:
              "Sélectionner la frame (ex. un bouton en auto-layout) → `Ctrl+Alt+K` (Create component). Le maître vit idéalement sur une page ou une frame « Components » dédiée.",
          },
          {
            title: "Placer des instances",
            detail:
              "Glisser le composant depuis le panneau Assets (ou `Alt`+glisser) : chaque instance est liée au maître. Les modifier toutes = modifier le maître.",
          },
          {
            title: "Personnaliser les instances",
            detail:
              "Texte, couleurs d'instance, icônes : les surcharges (overrides) sont conservées même quand le maître évolue. C'est la flexibilité sans perdre le lien.",
          },
          {
            title: "Ne jamais détacher sans raison",
            detail:
              "« Detach instance » rompt le lien : l'instance ne recevra plus les mises à jour. Si une personnalisation l'exige, c'est le composant qui manque d'une propriété.",
          },
          {
            title: "Organiser",
            detail:
              "Nommer les composants par catégorie (`button/primary`, `form/input`) : l'organisation en dossiers facilite la recherche dans Assets.",
          },
        ],
      },
    ],
  },
  {
    id: "variants",
    title: "Variants : les déclinaisons propres",
    level: 2,
    intro:
      "Tailles, styles, états : un seul composant au lieu de douze.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le set de variants",
            detail:
              "Sélectionner plusieurs composants similaires → `Combine as variants`. Figma crée un set avec des propriétés (ex. `variant`, `size`).",
          },
          {
            title: "Nommer les propriétés",
            detail:
              "Propriétés explicites : `variant=primary/secondary`, `size=sm/md/lg`, `state=default/hover/disabled`. Ce sont ces noms que verront les utilisateurs du composant.",
          },
          {
            title: "Ajouter les états",
            detail:
              "Chaque combinaison légitime devient un variant : primary/md/hover, etc. Vérifier les contrastes de chaque combinaison.",
          },
          {
            title: "Simplifier avec les booléens",
            detail:
              "Propriété booléenne `has-icon` plutôt que des variants avec/sans icône : divise par deux le nombre de variants.",
          },
          {
            title: "Tester en situation",
            detail:
              "Placer des instances dans de vrais écrans et commuter les propriétés dans le panneau : si un besoin manque, ajouter la propriété au maître.",
          },
        ],
      },
    ],
  },
  {
    id: "prototypage-flows",
    title: "Prototypage : des flows cliquables",
    level: 2,
    intro:
      "Relier les écrans pour produire une maquette testable.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Passer en mode Prototype",
            detail:
              "Onglet `Prototype` dans le panneau droit. Sélectionner un élément déclencheur (bouton, lien).",
          },
          {
            title: "Créer la connexion",
            detail:
              "Glisser le nœud `+` vers la frame de destination. Choisir le déclencheur (`On click`, `On hover`…) et la transition.",
          },
          {
            title: "Régler la transition",
            detail:
              "`Instant` (changement d'état), `Dissolve` (fondu), `Smart animate` (morphing entre variants), `Move in/out` (panneaux). Durées : 200–300 ms.",
          },
          {
            title: "Définir le point de départ",
            detail:
              "Choisir la frame de démarrage du flow (menu contextuel → `Set as starting point`). Un flow = un parcours utilisateur.",
          },
          {
            title: "Présenter et tester",
            detail:
              "Bouton `Present` : le prototype est partageable par lien, testable par des utilisateurs, commentable. C'est le livrable des tests.",
          },
        ],
      },
    ],
  },
  {
    id: "smart-animate",
    title: "Smart Animate : le morphing magique",
    level: 2,
    intro:
      "Animer entre deux variants sans images clés : la fonction la plus impressionnante — à utiliser avec mesure.",
    blocks: [
      {
        kind: "text",
        text: "Smart Animate interpole automatiquement entre deux frames aux calques de même nom : un bouton qui s'agrandit, un panneau qui se déplie, un menu qui apparaît. C'est idéal pour prototyper des micro-interactions et des transitions d'état.",
      },
      {
        kind: "list",
        items: [
          "Condition : les calques doivent porter les mêmes noms dans les deux frames — nommer proprement est indispensable.",
          "Excellent pour : toggles, accordéons, états de boutons, transitions entre variants d'un composant.",
          "Limites : mouvements complexes ou chorégraphies fines — passer alors à un outil dédié (After Effects, code).",
          "Toujours prévoir la version réduite (`prefers-reduced-motion`) : le prototype doit montrer l'état final statique.",
        ],
      },
    ],
  },
  {
    id: "dev-mode-handoff",
    title: "Handoff : transmettre aux développeurs",
    level: 2,
    intro:
      "Le mode qui expose specs, mesures et assets : le pont entre la maquette et le code.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Préparer le fichier",
            detail:
              "Frames nommées, composants utilisés (pas de groupes anonymes), page « Prêt pour dev » avec les écrans finalisés. Marquer les écrans prêts (section dédiée ou statut).",
          },
          {
            title: "Basculer en mode Dev",
            detail:
              "Le mode développeur affiche mesures, styles, code CSS généré au clic sur chaque élément. Vérifier que les espacements affichés sont en multiples de 8.",
          },
          {
            title: "Exporter les assets",
            detail:
              "Icônes et images : paramètres d'export (SVG pour les icônes, 2x/3x pour le raster), nommées explicitement. Export en lot depuis le panneau.",
          },
          {
            title: "Documenter l'intention",
            detail:
              "Le CSS généré est indicatif, pas à copier tel quel : ajouter des notes sur les comportements (responsive, états, animations) que le code généré ne montre pas.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle d'or du handoff : un développeur ne doit jamais avoir à deviner. Tout ce qui n'est pas explicite dans le fichier (comportement au redimensionnement, états, cas limites) doit être noté ou dessiné.",
      },
    ],
  },
  {
    id: "raccourcis-essentiels",
    title: "Les raccourcis essentiels",
    level: 2,
    intro:
      "La douzaine de raccourcis qui change la vitesse de travail.",
    blocks: [
      {
        kind: "table",
        headers: ["Raccourci", "Action", "Usage"],
        rows: [
          ["`V`", "Déplacer", "L'outil par défaut, y revenir sans cesse"],
          ["`F`", "Frame", "Créer des écrans et conteneurs"],
          ["`R` / `O` / `T`", "Rectangle / Ellipse / Texte", "Les formes de base"],
          ["`Shift+A`", "Auto-layout", "Rendre une frame flexible"],
          ["`Ctrl+D`", "Dupliquer", "Copier en décalant intelligemment"],
          ["`Alt` + glisser", "Dupliquer par glisser", "Copie rapide à la souris"],
          ["`Ctrl+G` / `Ctrl+Shift+G`", "Grouper / Dégrouper", "Organisation temporaire"],
          ["`Ctrl+Alt+K`", "Créer un composant", "Transformer une frame en maître"],
          ["`Ctrl+/`", "Panneau des raccourcis", "Tous les autres, à portée de main"],
          ["`Shift+1`", "Zoom ajusté", "Voir tout le canevas"],
          ["`Ctrl+ molette`", "Zoom", "Naviguer dans le détail"],
        ],
      },
      {
        kind: "text",
        text: "Méthode d'apprentissage : `Ctrl+/` affiche tous les raccourcis — en apprendre un nouveau par jour. En deux semaines, la souris ne sert plus qu'à dessiner.",
      },
    ],
  },
  {
    id: "plugins-essentiels",
    title: "Les plugins essentiels",
    level: 2,
    intro:
      "Quatre plugins qui étendent Figma là où ça compte.",
    blocks: [
      {
        kind: "fields",
        title: "Plugins réels, usages réels",
        fields: [
          {
            label: "Stark",
            value:
              "Contrastes, simulation de daltonisme, vérification de l'ordre de focus : l'accessibilité sans quitter Figma.",
          },
          {
            label: "Content Reel",
            value:
              "Remplit les maquettes avec du contenu réaliste (noms, adresses, images) : fini le `lorem ipsum` qui fausse les tests.",
          },
          {
            label: "Unsplash",
            value:
              "Images libres de droits directement dans les frames : parfait pour les maquettes et les prototypes.",
          },
          {
            label: "Autoflow",
            value:
              "Dessine automatiquement les flèches de flows entre écrans : la documentation des parcours sans effort.",
          },
        ],
      },
      {
        kind: "text",
        text: "Principe : un plugin doit faire gagner du temps chaque semaine. Au-delà d'une dizaine de plugins installés, on passe plus de temps à les gérer qu'à designer.",
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "variables-figma",
    title: "Variables Figma : les tokens natifs",
    level: 3,
    intro:
      "La fonctionnalité qui rapproche Figma des design tokens du code.",
    blocks: [
      {
        kind: "text",
        text: "Les variables Figma portent les tokens directement dans l'outil : collections (couleur, espacement, typo), modes (clair/sombre), valeurs par type (color, number, string, boolean). Appliquées aux designs, elles permettent de basculer un prototype entier de thème en un clic.",
      },
      {
        kind: "list",
        items: [
          "Organiser en collections : `Colors` (modes light/dark), `Spacing`, `Typography`.",
          "Nommage identique aux tokens du code : la correspondance Figma ↔ CSS doit être évidente.",
          "Alias : une variable peut référencer une autre (`brand/default` → `blue/500`) — comme les tokens sémantiques.",
          "Publier dans la library : les variables sont partagées comme les composants.",
          "Limite : les variables ne remplacent pas un système de tokens versionné en Git — ce sont deux couches complémentaires.",
        ],
      },
    ],
  },
  {
    id: "libraries-equipe",
    title: "Libraries d'équipe : partager le système",
    level: 3,
    intro:
      "Publier et consommer des bibliothèques : le workflow multi-fichiers.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Structurer le fichier library",
            detail:
              "Un fichier dédié (ou par domaine : `Foundations`, `Components`) contenant styles, variables et composants maîtres. Page de documentation incluse.",
          },
          {
            title: "Publier",
            detail:
              "Bouton `Publish` : description des changements (changelog). Les consommateurs reçoivent une notification de mise à jour.",
          },
          {
            title: "Consommer",
            detail:
              "Dans les fichiers produit : activer la library (`Assets` → `Team library`). Utiliser uniquement les composants publiés.",
          },
          {
            title: "Mettre à jour",
            detail:
              "Accepter les mises à jour fichier par fichier, en relisant le changelog. Ne jamais mettre à jour à l'aveugle avant une livraison.",
          },
          {
            title: "Gérer les versions",
            detail:
              "Changements cassants (renommage, suppression) : communiquer à l'avance, prévoir une période de dépréciation.",
          },
        ],
      },
    ],
  },
  {
    id: "auto-layout-avance",
    title: "Auto-layout avancé",
    level: 3,
    intro:
      "Aller au-delà des bases : les options qui rendent les composants vraiment robustes.",
    blocks: [
      {
        kind: "fields",
        title: "Les options avancées",
        fields: [
          {
            label: "Wrap",
            value:
              "Les enfants passent à la ligne quand l'espace manque : indispensable pour les listes de tags, les grilles de cartes.",
          },
          {
            label: "Position absolue",
            value:
              "Sortir un enfant du flux (badge sur une carte, bouton de fermeture) tout en gardant l'auto-layout pour le reste.",
          },
          {
            label: "Min/max dimensions",
            value:
              "Contraindre la taille (largeur max d'une carte, hauteur min d'un bouton) : le composant reste flexible sans exploser.",
          },
          {
            label: "Strokes inclus",
            value:
              "`Stroke` inclus dans les dimensions : évite les décalages d'1 px entre maquette et implémentation.",
          },
          {
            label: "Imbrication",
            value:
              "Auto-layout dans auto-layout : une carte = frame verticale (image + contenu) dont le contenu est une frame verticale (titre + texte + actions). Penser en arborescence.",
          },
        ],
      },
    ],
  },
  {
    id: "composants-imbriques",
    title: "Composants imbriqués et slots",
    level: 3,
    intro:
      "Composer plutôt que dupliquer : l'architecture des composants complexes.",
    blocks: [
      {
        kind: "text",
        text: "Une carte produit = composant `card` contenant des instances de `badge`, `button`, `price`. L'imbrication propage les mises à jour à tous les niveaux : corriger le bouton corrige toutes les cartes.",
      },
      {
        kind: "list",
        items: [
          "Construire de bas en haut : atomes (icônes, boutons) → molécules (champs avec label) → organismes (cartes, headers).",
          "Slots via instance swap : exposer les zones remplaçables (icône, action) comme propriétés plutôt que créer des variants.",
          "Éviter l'imbrication trop profonde (> 3 niveaux) : chaque niveau ajoute de la complexité de maintenance.",
          "Documenter la structure : un schéma d'imbrication dans la doc du composant.",
        ],
      },
    ],
  },
  {
    id: "proprietes-avancees",
    title: "Propriétés avancées des composants",
    level: 3,
    intro:
      "Tirer le maximum du panneau de propriétés pour des composants flexibles.",
    blocks: [
      {
        kind: "fields",
        title: "Les 4 types de propriétés",
        fields: [
          {
            label: "Variant",
            value: "Déclinaisons fermées (`size=sm/md/lg`) : le choix dans une liste.",
          },
          {
            label: "Boolean",
            value: "Afficher/masquer (`has-icon`, `show-badge`) : remplace des dizaines de variants redondants.",
          },
          {
            label: "Instance swap",
            value: "Remplacer un sous-composant (`icon=search`) : la flexibilité typée, limitée aux composants compatibles.",
          },
          {
            label: "Text",
            value: "Contenu textuel éditable directement (`label=\"Envoyer\"`) : l'instance reste liée.",
          },
        ],
      },
      {
        kind: "text",
        text: "Design d'API : nommer les propriétés comme un développeur nommerait des props (`disabled`, pas `état-3`). Des valeurs par défaut sensées : l'instance par défaut doit être le cas d'usage le plus courant.",
      },
    ],
  },
  {
    id: "prototypage-avance",
    title: "Prototypage avancé : variables et conditions",
    level: 3,
    intro:
      "Des prototypes qui se comportent comme de vraies applications.",
    blocks: [
      {
        kind: "list",
        items: [
          "Variables de prototype : stocker des états (panier, favoris, étape) et les modifier par interaction — un compteur qui s'incrémente, un toggle persistant.",
          "Expressions conditionnelles : « si le panier est vide, aller à l'écran A, sinon à l'écran B » — teste la logique, pas seulement la navigation.",
          "Overlays : menus, tooltips, modales qui s'ouvrent par-dessus l'écran courant, avec positionnement manuel.",
          "Scroll : zones à défilement vertical/horizontal imbriquées (listes dans un écran fixe) pour des prototypes réalistes.",
          "Limite : un prototype n'est pas une application — dès que la logique devient complexe, c'est le signe qu'il faut coder un vrai prototype.",
        ],
      },
    ],
  },
  {
    id: "responsive-breakpoints",
    title: "Maquetter le responsive : breakpoints",
    level: 3,
    intro:
      "Du mobile au desktop : la méthode des breakpoints sans douleur.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir les breakpoints",
            detail:
              "3 suffisent généralement : mobile (375 px), tablette (768 px), desktop (1440 px). Les nommer et les figer pour tout le projet.",
          },
          {
            title: "Concevoir mobile-first",
            detail:
              "Dessiner le mobile en premier : les contraintes forcent à prioriser le contenu. Étendre ensuite, pas l'inverse.",
          },
          {
            title: "Utiliser les mêmes composants",
            detail:
              "Les composants en auto-layout s'adaptent : une carte `fill` en largeur occupe 375 px comme 1440 px. Seule la composition change.",
          },
          {
            title: "Documenter les différences",
            detail:
              "Noter ce qui change par breakpoint (navigation hamburger → barre, 1 → 3 colonnes) : le développeur implémente des règles, pas des devinettes.",
          },
          {
            title: "Prototyper les transitions",
            detail:
              "Si le produit est utilisé en redimensionnement (web), tester le passage d'un breakpoint à l'autre : rien ne doit casser entre les deux.",
          },
        ],
      },
    ],
  },
  {
    id: "grille-8pt",
    title: "La grille 8pt en pratique",
    level: 3,
    intro:
      "Le système d'espacement qui rend les interfaces nettes.",
    blocks: [
      {
        kind: "text",
        text: "Tous les espacements, tailles et paddings sont des multiples de 8 (8, 16, 24, 32…), avec 4 px en exception pour les micro-ajustements. Résultat : les éléments s'alignent naturellement, les rythmes sont réguliers, les specs sont simples.",
      },
      {
        kind: "list",
        items: [
          "Configurer la grille de mise en page (colonnes, marges, gouttières) par breakpoint.",
          "Paddings et gaps d'auto-layout en multiples de 8 : le panneau Figma les suggère.",
          "Exceptions documentées : 4 px pour les espacements intra-composant denses, jamais de 7 ou 13 px.",
          "Vérification : activer les règles et mesurer — un fichier 8pt « sonne » juste visuellement.",
        ],
      },
    ],
  },
  {
    id: "spec-handoff-propre",
    title: "Un handoff propre : la checklist",
    level: 3,
    intro:
      "Ce que le développeur doit trouver dans le fichier, sans poser de question.",
    blocks: [
      {
        kind: "list",
        items: [
          "Écrans finalisés isolés sur une page/section « Ready for dev », nommés et ordonnés.",
          "Tous les textes en styles de texte, toutes les couleurs en styles/variables (aucun formatage manuel).",
          "Composants utilisés partout (aucun élément détaché sans raison documentée).",
          "Assets d'export configurés : SVG pour les icônes, 2x/3x pour les images, noms explicites.",
          "États dessinés : hover, focus, disabled, erreur, chargement, vide.",
          "Comportements notés : responsive (breakpoints), animations (durées, easing), cas limites.",
          "Annotations d'accessibilité : niveaux de titres, alternatives d'images, ordre de lecture si non évident.",
          "Lien du prototype pour le comportement, lien du fichier pour les specs : les deux sont nécessaires.",
        ],
      },
    ],
  },
  {
    id: "collaboration-figma",
    title: "Collaborer dans Figma",
    level: 3,
    intro:
      "Le temps réel change la façon de travailler : les bonnes pratiques.",
    blocks: [
      {
        kind: "list",
        items: [
          "Commentaires contextuels : cliquer sur l'élément concerné, pas de commentaires « voir écran 3 ».",
          "Résoudre les commentaires traités : un fil de 50 commentaires ouverts est inutilisable.",
          "Mode observation (`Observe`) pour les revues : tout le monde suit le même écran.",
          "Branching : expérimenter sur une branche sans toucher au fichier principal, merger après validation.",
          "Permissions : édition pour l'équipe design, visualisation + commentaires pour les autres — protège le fichier.",
          "Historique des versions : nommer les jalons (`v1.2 — validation client`) pour retrouver les étapes clés.",
        ],
      },
    ],
  },
  {
    id: "design-review",
    title: "Mener une design review efficace",
    level: 3,
    intro:
      "La revue de design est un rituel : la structurer pour qu'elle serve.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Préparer",
            detail:
              "Partager le prototype et le contexte à l'avance. Préciser le type de feedback attendu (structure ? détails visuels ?) — pas de revue « dites-moi ce que vous en pensez ».",
          },
          {
            title: "Présenter le problème d'abord",
            detail:
              "Rappeler l'objectif et les contraintes avant de montrer les écrans : on critique une solution par rapport à un problème, pas par goût.",
          },
          {
            title: "Collecter en silence",
            detail:
              "Chacun écrit ses retours en commentaires avant de débattre : évite l'effet d'entraînement sur la première opinion exprimée.",
          },
          {
            title: "Décider",
            detail:
              "Trier : bloquant (à corriger avant livraison), à itérer, à archiver. Chaque point bloquant a un responsable et une échéance.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-figma-1",
    title: "Erreurs Figma courantes (1/2)",
    level: 3,
    intro:
      "Les défauts de fichiers qui coûtent cher — et leurs corrections.",
    blocks: [
      {
        kind: "fields",
        title: "Cinq classiques",
        fields: [
          {
            label: "Tout en groupes, rien en frames",
            value:
              "Pourquoi : habitude des logiciels de dessin. Correction : convertir en frames, activer l'auto-layout — le fichier devient structuré et le handoff lisible.",
          },
          {
            label: "Formatage manuel partout",
            value:
              "Pourquoi : « c'est plus rapide ». Correction : créer les styles d'abord, tout convertir. Le temps « gagné » se paie en maintenance.",
          },
          {
            label: "Instances détachées",
            value:
              "Pourquoi : personnalisation impossible autrement. Correction : ajouter la propriété manquante au composant maître au lieu de détacher.",
          },
          {
            label: "Fichier fourre-tout",
            value:
              "Pourquoi : tout sur une page, 200 frames. Correction : pages par étape, sections nommées, archive — navigable en 10 secondes.",
          },
          {
            label: "Prototype spaghetti",
            value:
              "Pourquoi : connexions dans tous les sens. Correction : un flow = un parcours, frames ordonnées, point de départ défini.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-figma-2",
    title: "Erreurs Figma courantes (2/2)",
    level: 3,
    intro:
      "Cinq autres défauts, plus avancés.",
    blocks: [
      {
        kind: "fields",
        title: "Cinq défauts avancés",
        fields: [
          {
            label: "Variants explosés",
            value:
              "Pourquoi : un variant par combinaison possible (48 variants). Correction : booléens et instance swap pour factoriser ; viser moins de 12 variants par set.",
          },
          {
            label: "Calques non nommés",
            value:
              "Pourquoi : `Rectangle 47`, `Frame 12`. Correction : nommer sémantiquement (`card/image`, `button/label`) — indispensable pour Smart Animate et le handoff.",
          },
          {
            label: "États manquants",
            value:
              "Pourquoi : seul l'état de repos est dessiné. Correction : variants d'états systématiques (hover, focus, disabled, erreur).",
          },
          {
            label: "Assets non préparés",
            value:
              "Pourquoi : icônes non vectorisées, images en 1x. Correction : exports configurés (SVG, 2x/3x), nommés, testés.",
          },
          {
            label: "Library jamais mise à jour",
            value:
              "Pourquoi : peur de casser les fichiers. Correction : changelog lu, mise à jour par fichier, tests après chaque mise à jour.",
          },
        ],
      },
    ],
  },
  {
    id: "audit-fichier-figma",
    title: "Auditer un fichier Figma",
    level: 3,
    intro:
      "La méthode pour reprendre en main un fichier hérité.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Cartographier",
            detail:
              "Pages, frames, composants : comprendre l'organisation (ou son absence). Compter les pages, les composants, les styles.",
          },
          {
            title: "Détecter les anomalies",
            detail:
              "Formatage manuel (pastilles vides), instances détachées, calques non nommés, groupes au lieu de frames : lister par fréquence.",
          },
          {
            title: "Évaluer les composants",
            detail:
              "Auto-layout ? Variants propres ? Propriétés suffisantes ? Chaque composant noté : garder / réparer / reconstruire.",
          },
          {
            title: "Nettoyer",
            detail:
              "Convertir en styles, re-créer les composants critiques, archiver l'obsolète. Par vagues, pas en une fois.",
          },
          {
            title: "Documenter les règles",
            detail:
              "Page de conventions dans le fichier : nommage, pages, composants — pour que le chaos ne revienne pas.",
          },
        ],
      },
    ],
  },
  {
    id: "figjam-brainstorm",
    title: "FigJam : le tableau blanc intégré",
    level: 3,
    intro:
      "L'outil d'atelier de Figma : quand l'utiliser.",
    blocks: [
      {
        kind: "text",
        text: "FigJam est le tableau blanc collaboratif intégré à Figma : post-its, schémas, votes, timers. Idéal pour les ateliers d'idéation, les affinity mappings et les rétrospectives — avec l'avantage de rester dans l'écosystème (copier un élément FigJam vers un fichier design).",
      },
      {
        kind: "list",
        items: [
          "Préparer les cadres à l'avance : zones par activité, exemples remplis.",
          "Timer intégré : timeboxer chaque activité sans outil externe.",
          "Vote par gommettes : dot voting natif pour converger.",
          "Limite : pour les tableaux complexes permanents, un outil dédié (Miro) reste plus puissant.",
        ],
      },
    ],
  },
  {
    id: "exercice-bouton-30-min",
    title: "Exercice : un bouton parfait en 30 minutes",
    level: 3,
    intro:
      "Construire un composant bouton irréprochable, de zéro.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer la base (10 min)",
            detail:
              "Frame en auto-layout horizontal (padding 16/24, gap 8), texte en style, icône optionnelle. Créer le composant (`Ctrl+Alt+K`).",
          },
          {
            title: "Décliner les variants (10 min)",
            detail:
              "Variants : primary/secondary/tertiary × sm/md/lg. Booléen `has-icon`. États : default, hover, focus, disabled. Vérifier les contrastes.",
          },
          {
            title: "Tester (10 min)",
            detail:
              "Placer des instances dans un faux écran, commuter les propriétés, tester le redimensionnement (texte long). Corriger ce qui casse.",
          },
        ],
      },
      {
        kind: "text",
        text: "Critère de réussite : le bouton s'adapte à tout contenu, tous les états sont dessinés, aucune instance n'a besoin d'être détachée.",
      },
    ],
  },
  {
    id: "projet-bibliotheque",
    title: "Projet : une bibliothèque de 10 composants",
    level: 3,
    intro:
      "Construire une mini-bibliothèque publiable.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Cadrer",
            detail:
              "10 composants : bouton, champ, select, case à cocher, radio, badge, carte, alerte, modale, tooltip. Styles de couleur/texte/effet créés d'abord.",
          },
          {
            title: "Construire",
            detail:
              "Chaque composant : auto-layout, variants, booléens, états complets, contrastes vérifiés, calques nommés.",
          },
          {
            title: "Organiser",
            detail:
              "Page Components, nommage par catégorie, documentation intégrée (usage, propriétés).",
          },
          {
            title: "Publier et tester",
            detail:
              "Publier la library, construire 3 écrans types en ne l'utilisant qu'elle, noter chaque friction et corriger.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-maquette-responsive",
    title: "Projet : maquette responsive + prototype",
    level: 3,
    intro:
      "De la maquette mobile au prototype testable multi-écrans.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Maquetter mobile-first",
            detail:
              "5 écrans d'un parcours (ex. réservation) à 375 px, avec la bibliothèque de composants, grille 8pt.",
          },
          {
            title: "Décliner desktop",
            detail:
              "Mêmes écrans à 1440 px : adapter la composition, garder les composants. Noter les règles par breakpoint.",
          },
          {
            title: "Prototyper",
            detail:
              "Connecter les écrans (mobile et desktop), transitions soignées, point de départ défini. Smart Animate pour les micro-interactions.",
          },
          {
            title: "Préparer le handoff",
            detail:
              "Page Ready for dev, assets configurés, états et comportements documentés. Checklist du handoff appliquée.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-pro",
    title: "Le workflow pro : de l'idée au handoff",
    level: 3,
    intro:
      "L'enchaînement complet tel qu'il se pratique en équipe produit.",
    blocks: [
      {
        kind: "diagram",
        title: "Le workflow",
        lines: [
          "1. Cadrer (FigJam) — problème, HMW, crazy 8s",
          "2. Wireframer — parcours en basse fidélité, test rapide",
          "3. Système — styles, variables, composants (ou réutiliser la library)",
          "4. Maquetter — écrans haute fidélité, responsive",
          "5. Prototyper — flows cliquables, micro-interactions",
          "6. Tester — 5 utilisateurs, itérer",
          "7. Review — design review structurée",
          "8. Handoff — page dev, assets, specs, prototype",
          "9. Suivi — revue de l'implémentation, ajustements",
        ],
      },
      {
        kind: "text",
        text: "Le point 9 est le plus négligé : relire l'implémentation réelle et noter les écarts évite que le produit ne dérive de la maquette en quelques sprints.",
      },
    ],
  },
  {
    id: "organisation-sections",
    title: "Sections : organiser le canevas",
    level: 3,
    intro:
      "Au-delà des pages : les sections structurent le travail à l'intérieur d'une page.",
    blocks: [
      {
        kind: "text",
        text: "Les sections (outil Section) regroupent des frames avec un titre visible : « Parcours — v2 », « Explorations », « Prêt pour dev ». Elles créent des zones logiques sans multiplier les pages.",
      },
      {
        kind: "list",
        items: [
          "Une section par état d'avancement : explorations → en cours → validé → prêt pour dev.",
          "Les prototypes peuvent démarrer depuis une section : flows isolés et nommés.",
          "Déplacer une section déplace tout son contenu : réorganisation sans casse.",
          "Convention d'équipe : mêmes noms de sections dans tous les fichiers — on s'y retrouve d'un projet à l'autre.",
        ],
      },
    ],
  },
  {
    id: "dev-mode-avance",
    title: "Dev Mode avancé : au-delà des mesures",
    level: 3,
    intro:
      "Exploiter le mode développeur comme un vrai outil de spécification.",
    blocks: [
      {
        kind: "list",
        items: [
          "Variables affichées : le mode dev montre les variables appliquées (pas seulement les valeurs), avec leur nom de token.",
          "Comparaison des changements : visualiser ce qui a changé entre deux versions d'un composant avant d'accepter une mise à jour.",
          "Plugins dev : linters de design, extracteurs de tokens — automatiser la vérification.",
          "Annotations : épingler des notes directement sur les éléments (« ce padding passe à 24 px sur desktop »).",
          "Limite assumée : le code généré est un point de départ, pas une implémentation — le préciser aux développeurs juniors.",
        ],
      },
    ],
  },
  {
    id: "performance-fichier",
    title: "Performance : garder un fichier fluide",
    level: 3,
    intro:
      "Un fichier de 500 Mo qui rame fait perdre l'équipe : les règles d'hygiène.",
    blocks: [
      {
        kind: "list",
        items: [
          "Images : compresser avant d'importer (WebP/JPEG optimisé), éviter les PNG de 10 Mo — redimensionner à la taille d'usage.",
          "Pages : répartir sur plusieurs pages plutôt qu'une page géante ; archiver les anciennes versions.",
          "Masques et effets : les flous d'arrière-plan (`background blur`) sont coûteux — les limiter aux cas nécessaires.",
          "Composants : préférer les instances aux copies — les copies alourdissent et se désynchronisent.",
          "Nettoyage régulier : styles et composants inutilisés supprimés (panneau Assets → nettoyage).",
        ],
      },
    ],
  },
  {
    id: "grilles-avancees",
    title: "Grilles et layout grids avancées",
    level: 3,
    intro:
      "Colonnes, lignes, grilles : l'outil d'alignement précis.",
    blocks: [
      {
        kind: "fields",
        title: "Les 3 types de layout grids",
        fields: [
          {
            label: "Columns",
            value:
              "La grille éditoriale : 4 colonnes mobile, 8 tablette, 12 desktop. Marges et gouttières par breakpoint.",
          },
          {
            label: "Rows",
            value: "Rythme vertical : aligne les sections sur une grille horizontale régulière.",
          },
          {
            label: "Grid (carrés)",
            value: "La grille 8pt visuelle : vérifie que tous les espacements sont des multiples de 8.",
          },
        ],
      },
      {
        kind: "text",
        text: "Bonnes pratiques : une grille par breakpoint, affichée pendant la conception, masquée à l'export. Les composants eux-mêmes n'ont pas besoin de grille — l'auto-layout suffit à l'intérieur.",
      },
    ],
  },
  {
    id: "accessibilite-dans-figma",
    title: "Préparer l'accessibilité dans Figma",
    level: 3,
    intro:
      "Ce que le fichier doit contenir pour que l'accessibilité survive au handoff.",
    blocks: [
      {
        kind: "list",
        items: [
          "Contrastes vérifiés avec Stark sur chaque combinaison — avant de présenter, pas après.",
          "Ordre des calques = ordre de lecture : vérifier que le panneau des calques suit l'ordre visuel.",
          "Annotations : niveaux de titres (`H1`, `H2`), alternatives d'images, zones de confort des icônes.",
          "États focus dessinés comme des variants : le développeur les implémente au lieu de les inventer.",
          "Tester le prototype au clavier : `Tab` dans la présentation révèle les oublis d'ordre et de focus.",
        ],
      },
    ],
  },
  {
    id: "tester-prototype-figma",
    title: "Tester un prototype Figma avec des utilisateurs",
    level: 3,
    intro:
      "Le prototype cliquable est fait pour être testé : le protocole.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Préparer le flow",
            detail:
              "Un parcours, un point de départ, pas de zones mortes : chaque élément cliquable doit mener quelque part (même vers un écran « non maquetté » explicite).",
          },
          {
            title: "Partager le lien",
            detail:
              "Lien de présentation (pas d'édition) : testable sur mobile via l'app Figma, ou en visio avec partage d'écran et contrôle à distance.",
          },
          {
            title: "Donner des tâches, pas des instructions",
            detail:
              "« Réservez une table pour vendredi » — jamais « cliquez sur le bouton Réserver ». Observer les hésitations.",
          },
          {
            title: "Itérer vite",
            detail:
              "L'avantage du prototype Figma : corriger entre deux sessions (30 minutes) et tester la correction dès la session suivante.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-prototypage",
    title: "Erreurs de prototypage",
    level: 3,
    intro:
      "Les pièges qui rendent un prototype inutilisable en test.",
    blocks: [
      {
        kind: "fields",
        title: "Cinq pièges de prototype",
        fields: [
          {
            label: "Zones mortes",
            value:
              "Des éléments qui ressemblent à des boutons mais ne mènent nulle part : l'utilisateur croit que ça ne marche pas. Tout cliquable doit réagir.",
          },
          {
            label: "Trop de fidélité, trop tôt",
            value:
              "Prototype léché pour tester un parcours : les retours portent sur les couleurs au lieu de la structure. Adapter la fidélité à la question.",
          },
          {
            label: "Flow unique imposé",
            value:
              "Un seul chemin possible : on ne voit pas où les utilisateurs voudraient aller autrement. Prévoir les chemins alternatifs probables.",
          },
          {
            label: "Transitions partout",
            value:
              "Smart Animate sur chaque écran : distrait et ralentit. Réserver le mouvement aux transitions qui portent du sens.",
          },
          {
            label: "Prototype non testé par son auteur",
            value:
              "Le créateur ne clique jamais son propre prototype avant de le partager : 5 minutes de relecture évitent les flows cassés en session.",
          },
        ],
      },
    ],
  },
  {
    id: "exercice-carte-30-min",
    title: "Exercice : une carte produit en 30 minutes",
    level: 3,
    intro:
      "Composer des composants existants : l'exercice d'imbrication.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Assembler (15 min)",
            detail:
              "Avec la bibliothèque du projet précédent (ou des composants rapides) : carte = image + badge + titre + prix + bouton. Auto-layout vertical, imbrication propre.",
          },
          {
            title: "Décliner (10 min)",
            detail:
              "Variants : avec/sans badge (booléen), avec/sans image, état chargement (skeleton). Tester le redimensionnement.",
          },
          {
            title: "Vérifier (5 min)",
            detail:
              "Contrastes, ordre des calques, nommage. La carte doit survivre à un titre très long sans casser.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-kit-onboarding",
    title: "Projet : kit d'onboarding d'équipe",
    level: 3,
    intro:
      "Créer le fichier qui accueille les nouveaux designers.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Documenter les conventions",
            detail:
              "Page Cover : nommage des fichiers, organisation des pages, règles de composants, grille, tokens — tout ce qu'un nouveau doit savoir.",
          },
          {
            title: "Créer les templates",
            detail:
              "Templates de fichiers (projet, exploration, handoff), templates de pages (cover, changelog) : dupliquer plutôt que réinventer.",
          },
          {
            title: "Faire tester",
            detail:
              "Donner le kit à quelqu'un d'extérieur et observer : construit-il un écran conforme sans aide ? Corriger les frictions.",
          },
        ],
      },
      {
        kind: "text",
        text: "Critère de réussite : un nouveau designer produit son premier écran conforme en une demi-journée, sans formation orale.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite",
    level: 3,
    intro:
      "Les compétences de la roadmap UX Designer qui prolongent Figma.",
    blocks: [
      {
        kind: "fields",
        title: "Continuer dans la roadmap ux-designer",
        fields: [
          {
            label: "Design System (`design-system`)",
            value:
              "Industrialiser : tokens, gouvernance, documentation — passer de composants à système.",
          },
          {
            label: "UI Design (`ui-design`)",
            value:
              "La rigueur visuelle : grilles, hiérarchie, états — ce qui fait la qualité des écrans.",
          },
          {
            label: "Prototypage (`prototypage`)",
            value:
              "Aller plus loin : prototypes haute fidélité et animés pour tester les détails.",
          },
          {
            label: "Motion Design (`motion-design`)",
            value:
              "Le mouvement dans Figma et au-delà : Smart Animate, principes, specs de motion.",
          },
          {
            label: "Accessibilité (`accessibilite-design`)",
            value:
              "Concevoir accessible dès la maquette : contrastes, focus, clavier, lecteurs d'écran.",
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
      "Les références officielles pour progresser.",
    blocks: [
      {
        kind: "fields",
        title: "Références réelles",
        fields: [
          {
            label: "Figma Help Center",
            value: "https://help.figma.com/ — la documentation officielle, complète et à jour.",
          },
          {
            label: "Chaîne YouTube Figma",
            value: "Tutoriels officiels : auto-layout, variants, variables — en vidéo.",
          },
          {
            label: "Figma Community",
            value: "Fichiers partagés par la communauté : design systems, kits UI à étudier (pas seulement à copier).",
          },
          {
            label: "Stark",
            value: "https://www.getstark.co/ — accessibilité intégrée à Figma.",
          },
        ],
      },
    ],
  },
];

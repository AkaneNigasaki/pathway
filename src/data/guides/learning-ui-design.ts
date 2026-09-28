import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de l'UI Design : grilles, espacements, composants,
 * états, hiérarchie et dark mode. 3 niveaux (Aperçu / Pratique / Approfondi).
 */
export const LEARNING_UI_DESIGN: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Ce qu'est l'UI design : la discipline de précision derrière les interfaces claires.",
    blocks: [
      {
        kind: "text",
        text: "L'UI design (User Interface) conçoit la couche visible et tactile des produits numériques : mise en page, composants, états, feedbacks. C'est une discipline de précision : grilles, espacements systématiques, hiérarchie lisible. Une interface claire inspire confiance ; une interface approximative la détruit.",
      },
      {
        kind: "text",
        text: "L'UI ne se résume pas à « faire beau ». Un bon UI designer rend les interfaces compréhensibles (où cliquer ? que va-t-il se passer ?), cohérentes (mêmes patterns partout) et robustes (tous les états prévus : vide, erreur, chargement). L'esthétique en découle, elle ne la précède pas.",
      },
      {
        kind: "list",
        items: [
          "L'UI répond à : est-ce clair, cohérent et prévisible ?",
          "Trois piliers : grille et espacement, hiérarchie visuelle, états exhaustifs.",
          "L'UI s'appuie sur la typographie, la couleur et les composants — jamais l'inverse.",
        ],
      },
    ],
  },
  {
    id: "bonne-interface-30s",
    title: "Une bonne interface en 30 secondes",
    level: 1,
    intro:
      "Les signaux qui distinguent une interface soignée d'une interface bricolée.",
    blocks: [
      {
        kind: "diagram",
        title: "Le test des 30 secondes",
        lines: [
          "Regardez un écran 30 secondes, puis demandez-vous :",
          "",
          "  1. Où mon œil est-il allé en premier ?  → la hiérarchie",
          "     (Si nulle part : pas de hiérarchie.)",
          "",
          "  2. Les éléments sont-ils alignés ?      → la grille",
          "     (Si ça « flotte » : pas de grille.)",
          "",
          "  3. Les espacements sont-ils réguliers ? → le rythme",
          "     (Si tout se touche ou tout s'éparpille : pas de système.)",
          "",
          "  4. Que se passe-t-il si je clique ?      → les états",
          "     (Si on ne sait pas : états manquants.)",
        ],
      },
      {
        kind: "text",
        text: "Ces quatre questions couvrent 80 % de la qualité d'une interface. La suite de cette page détaille comment y répondre systématiquement, écran après écran.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 2 — PRATIQUE
  // ------------------------------------------------------------------
  {
    id: "mise-en-place",
    title: "Mise en place",
    level: 2,
    intro:
      "L'environnement de travail pour designer des interfaces proprement.",
    blocks: [
      {
        kind: "fields",
        title: "Le kit UI",
        fields: [
          {
            label: "Figma",
            value:
              "L'outil standard : frames, auto-layout, composants, styles. Activez la grille (Layout grid) sur chaque frame.",
          },
          {
            label: "Une grille de référence",
            value:
              "12 colonnes sur desktop, 4 sur mobile, marges de 16-24 px. À définir une fois, à réutiliser partout.",
          },
          {
            label: "Échelle d'espacement",
            value:
              "Multiples de 8 px (4, 8, 16, 24, 32, 48, 64) : tous les espacements du fichier doivent appartenir à cette échelle.",
          },
          {
            label: "Bibliothèque d'icônes",
            value:
              "Lucide ou Material Symbols : un set cohérent au trait uniforme, plutôt que des icônes piochées au hasard.",
          },
        ],
      },
    ],
  },
  {
    id: "grille-8pt",
    title: "La grille 8pt",
    level: 2,
    intro:
      "Le système d'espacement qui rend les interfaces nettes : tout est multiple de 8.",
    blocks: [
      {
        kind: "text",
        text: "Le système 8pt : tous les espacements, tailles et dimensions sont des multiples de 8 px (avec 4 px comme sous-unité pour les détails). Le résultat est un rythme visuel régulier : rien ne semble « à peu près » aligné, tout l'est.",
      },
      {
        kind: "code",
        language: "css",
        title: "Échelle d'espacement 8pt",
        code: ":root {\n  --space-1: 4px;    /* détails : icône/texte */\n  --space-2: 8px;    /* resserré : éléments liés */\n  --space-4: 16px;   /* standard : paragraphes, cartes */\n  --space-6: 24px;   /* sections proches */\n  --space-8: 32px;   /* sections */\n  --space-12: 48px;  /* grandes séparations */\n  --space-16: 64px;  /* hero, ruptures majeures */\n}\n\n.card {\n  padding: var(--space-4);   /* 16px */\n  gap: var(--space-2);       /* 8px entre titre et texte */\n  margin-bottom: var(--space-6);\n}",
      },
      {
        kind: "list",
        items: [
          "Pourquoi 8 : divisible par 2 et 4, il s'aligne bien sur les écrans (la plupart des tailles d'écran sont divisibles par 8) et produit des valeurs rondes.",
          "L'exception 4 px : pour les micro-ajustements (espace icône-texte, padding de badge). Jamais de 6, 10 ou 14 px.",
          "Appliquez le système aux rayons de bordure aussi : 4, 8, 12, 16 px — pas de 7 px.",
        ],
      },
    ],
  },
  {
    id: "espacement-rythme",
    title: "Espacement et rythme",
    level: 2,
    intro:
      "L'espace est un matériau de design : comment le doser.",
    blocks: [
      {
        kind: "list",
        items: [
          "Proximité = relation : les éléments proches sont perçus comme liés. Rapprochez le label de son champ, éloignez les groupes entre eux.",
          "L'espace blanc n'est pas du vide : c'est ce qui permet à l'œil de grouper, hiérarchiser et respirer. Une interface dense n'est pas une interface riche.",
          "Doublez l'espace entre les groupes par rapport à l'espace dans les groupes : 8 px dans un groupe, 16-24 px entre les groupes.",
          "Cohérence verticale : alignez les espacements d'une section à l'autre. Un rythme irrégulier fatigue même si chaque espacement est « joli » isolément.",
          "Testez en zoom arrière : à 50 %, les problèmes de rythme (zones trop denses, zones mortes) sautent aux yeux.",
        ],
      },
    ],
  },
  {
    id: "hierarchie-visuelle",
    title: "Hiérarchie visuelle",
    level: 2,
    intro:
      "Guider l'œil : les 5 leviers, par ordre d'efficacité.",
    blocks: [
      {
        kind: "fields",
        title: "Les leviers de hiérarchie",
        fields: [
          {
            label: "1. Taille",
            value:
              "Le plus puissant : un titre 2× plus grand que le corps attire l'œil en premier. Réservez les grandes tailles aux éléments vraiment importants.",
          },
          {
            label: "2. Poids (graisse)",
            value:
              "Le bold signale l'importance sans prendre de place. À utiliser avec parcimonie : si tout est en bold, rien ne l'est.",
          },
          {
            label: "3. Couleur",
            value:
              "La couleur vive attire l'œil : réservez-la aux actions principales et aux alertes. Le reste en neutres.",
          },
          {
            label: "4. Position",
            value:
              "Haut et gauche (en lecture occidentale) sont vus en premier. Placez-y l'essentiel, pas les éléments décoratifs.",
          },
          {
            label: "5. Contraste et isolement",
            value:
              "Un élément isolé dans du blanc attire l'œil par contraste avec son environnement dense.",
          },
        ],
      },
      {
        kind: "text",
        text: "N'utilisez qu'un ou deux leviers à la fois pour signaler l'importance. Taille + graisse + couleur + encadré sur le même élément, c'est crier au lieu de parler.",
      },
    ],
  },
  {
    id: "anatomie-bouton",
    title: "Anatomie d'un bouton",
    level: 2,
    intro:
      "Le composant le plus cliqué : le construire correctement.",
    blocks: [
      {
        kind: "diagram",
        title: "Les propriétés d'un bouton",
        lines: [
          "  ┌─────────────────────────┐",
          "  │  ← 16px →  [Label]  ← 16px →  │  padding horizontal",
          "  └─────────────────────────┘",
          "       ↕ 10-12px vertical",
          "",
          "  • Hauteur : 40-48px (cible tactile confortable)",
          "  • Rayon : 8px (cohérent avec le système)",
          "  • Label : verbe d'action (« Enregistrer », pas « OK »)",
          "  • Hiérarchie : primaire (rempli) / secondaire (contour) / tertiaire (texte)",
          "  • États : repos, survol, focus, actif, désactivé, chargement",
        ],
      },
      {
        kind: "list",
        items: [
          "Un seul bouton primaire par écran (ou par groupe) : deux boutons primaires côte à côte annulent la hiérarchie.",
          "Le label dit ce qui va se passer : « Publier l'article », pas « Valider ».",
          "Largeur : le bouton s'adapte au label (auto-layout), sauf dans les formulaires mobiles où il peut prendre toute la largeur.",
        ],
      },
    ],
  },
  {
    id: "etats-composants",
    title: "Les états des composants",
    level: 2,
    intro:
      "Un composant n'existe jamais dans un seul état : la checklist.",
    blocks: [
      {
        kind: "table",
        headers: ["État", "À dessiner", "Erreur fréquente"],
        rows: [
          ["Repos (default)", "L'apparence normale", "—"],
          ["Survol (hover)", "Changement subtil (assombri, élévation)", "Oublié sur desktop"],
          ["Focus", "Contour visible au clavier", "Supprimé pour l'esthétique — critique pour l'accessibilité"],
          ["Actif (pressed)", "État enfoncé", "Confondu avec le survol"],
          ["Désactivé (disabled)", "Atténué, non cliquable", "Trop peu contrasté OU indistinguable de l'actif"],
          ["Chargement (loading)", "Spinner ou skeleton", "Bouton qui ne réagit pas au clic"],
          ["Erreur", "Bordure rouge + message", "Couleur seule, sans explication"],
        ],
      },
      {
        kind: "text",
        text: "Dessinez tous les états dès la création du composant : les découvrir pendant le développement produit des états incohérents ou oubliés.",
      },
    ],
  },
  {
    id: "formulaires-bases",
    title: "Formulaires : les bases",
    level: 2,
    intro:
      "Les formulaires sont le lieu où les interfaces échouent le plus souvent.",
    blocks: [
      {
        kind: "list",
        items: [
          "Label au-dessus du champ, toujours visible : le placeholder n'est pas un label (il disparaît à la saisie).",
          "Un champ par ligne sur mobile ; sur desktop, regroupez uniquement les champs liés (prénom + nom, code postal + ville).",
          "Indiquez les champs obligatoires (astérisque + légende), pas les optionnels un par un.",
          "Validez en temps réel quand c'est possible, mais n'affichez l'erreur qu'après la première saisie ou à la soumission.",
          "Messages d'erreur actionnables : « L'email doit contenir un @ » plutôt que « Champ invalide ».",
          "Bouton de soumission aligné avec les champs, label explicite (« Créer mon compte »).",
        ],
      },
    ],
  },
  {
    id: "navigation-bases",
    title: "Navigation : les bases",
    level: 2,
    intro:
      "L'utilisateur doit toujours savoir où il est et où aller.",
    blocks: [
      {
        kind: "list",
        items: [
          "État actif visible : l'onglet ou le lien courant doit se distinguer (couleur, soulignement, graisse).",
          "Libellés concrets : « Tarifs », « Mes commandes » plutôt que « Offres », « Espace ».",
          "7 items maximum dans une navigation principale : au-delà, regroupez ou hiérarchisez.",
          "Fil d'Ariane sur les parcours profonds (3+ niveaux) : il montre où l'on est et permet de remonter.",
          "Cohérence : la navigation ne change pas de place ni de forme d'une page à l'autre.",
        ],
      },
    ],
  },
  {
    id: "feedback-bases",
    title: "Feedback système",
    level: 2,
    intro:
      "L'interface doit répondre à chaque action : les patterns de feedback.",
    blocks: [
      {
        kind: "fields",
        title: "Les quatre feedbacks",
        fields: [
          {
            label: "Confirmation (toast/snackbar)",
            value:
              "« Modifications enregistrées » : bref, non bloquant, disparaît seul. Avec action d'annulation quand c'est pertinent.",
          },
          {
            label: "Chargement (skeleton)",
            value:
              "Des placeholders qui miment la mise en page à venir : moins anxiogène qu'un spinner générique, surtout pour le contenu.",
          },
          {
            label: "Erreur",
            value:
              "Visible, explicite, actionnable : que s'est-il passé, pourquoi, que faire. Jamais de code d'erreur brut.",
          },
          {
            label: "État vide",
            value:
              "Explique la situation + propose la première action : « Aucun projet pour l'instant — créez-en un ».",
          },
        ],
      },
    ],
  },
  {
    id: "dark-mode-bases",
    title: "Dark mode : les bases",
    level: 2,
    intro:
      "Un thème sombre n'est pas une inversion de couleurs.",
    blocks: [
      {
        kind: "list",
        items: [
          "Fond : gris très sombre (`#121212`), pas noir pur : le noir pur crée un contraste violent et des halos.",
          "Surfaces élevées plus claires : en dark mode, l'élévation s'exprime par la clarté (une carte à `#1E1E1E` sur fond `#121212`), pas par l'ombre.",
          "Texte en blanc cassé (`#E8E8E8`), jamais en blanc pur.",
          "Couleurs désaturées : les couleurs vives du light mode vibrent sur fond sombre. Réduisez la saturation.",
          "Re-vérifiez tous les contrastes : les ratios ne se transfèrent pas d'un thème à l'autre.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 2,
    intro:
      "Les défauts d'interface les plus répandus — et leurs corrections.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Pourquoi c'est un problème", "Correction"],
        rows: [
          [
            "Espacements au hasard",
            "L'interface semble « bricolée »",
            "Échelle 8pt, aucun espacement hors échelle",
          ],
          [
            "Tout a la même importance",
            "L'œil ne sait pas où aller",
            "Hiérarchie : 1 élément dominant par écran",
          ],
          [
            "Texte gris pâle",
            "Illisible pour beaucoup d'utilisateurs",
            "Contraste 4.5:1 minimum vérifié",
          ],
          [
            "États manquants",
            "Le dev improvise, l'UX se dégrade",
            "Dessiner vide, erreur, chargement, désactivé",
          ],
          [
            "Trop de couleurs",
            "Aucune ne signale plus rien",
            "1 primaire + neutres + sémantiques",
          ],
          [
            "Icônes sans labels",
            "La plupart des icônes sont ambiguës",
            "Label texte, sauf icônes universelles",
          ],
        ],
      },
    ],
  },
  {
    id: "exercice-redesign",
    title: "Exercice : redesign en 30 minutes",
    level: 2,
    intro:
      "Appliquer les bases sur un écran réel.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisissez un écran médiocre",
            detail:
              "Un formulaire d'inscription, un tableau de bord dense : capturez-le.",
          },
          {
            title: "Appliquez la grille 8pt",
            detail:
              "Realignez tout sur des multiples de 8. Comptez les espacements distincts : visez 3-4 valeurs.",
          },
          {
            title: "Rétablissez la hiérarchie",
            detail:
              "Un titre dominant, un niveau secondaire, le reste en corps. Supprimez les emphases superflues.",
          },
          {
            title: "Ajoutez les états manquants",
            detail:
              "Dessinez au moins : erreur de formulaire, état vide, chargement.",
          },
          {
            title: "Vérifiez les contrastes",
            detail:
              "Chaque texte sur chaque fond : 4.5:1 minimum. Corrigez les gris trop clairs.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "grilles-12-colonnes",
    title: "Grilles à 12 colonnes",
    level: 3,
    intro:
      "La grille de mise en page : 12 colonnes, gouttières, breakpoints.",
    blocks: [
      {
        kind: "fields",
        title: "Paramètres par breakpoint",
        fields: [
          {
            label: "Mobile (< 600 px)",
            value:
              "4 colonnes, gouttière 16 px, marges 16 px. Les composants prennent toute la largeur.",
          },
          {
            label: "Tablette (600-1024 px)",
            value:
              "8 colonnes, gouttière 16-24 px, marges 24 px.",
          },
          {
            label: "Desktop (> 1024 px)",
            value:
              "12 colonnes, gouttière 24 px, marges 24-32 px, largeur max du contenu 1200-1440 px.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "12 colonnes car divisible par 2, 3, 4, 6 : toutes les combinaisons courantes (moitiés, tiers, quarts) tombent juste.",
          "Alignez les éléments sur les colonnes, pas « à peu près » : un élément qui déborde d'une demi-gouttière se voit.",
          "La grille est un guide, pas une prison : les éléments décoratifs (fonds, images hero) peuvent la déborder volontairement.",
        ],
      },
    ],
  },
  {
    id: "rythme-vertical",
    title: "Rythme vertical",
    level: 3,
    intro:
      "L'alignement vertical régulier : la marque des interfaces soignées.",
    blocks: [
      {
        kind: "text",
        text: "Le rythme vertical, c'est la régularité des espacements de haut en bas : les sections respirent de la même façon, les titres sont à distance constante de leur contenu. Il se construit avec l'échelle 8pt et des règles de marge typographique (un titre a plus d'espace au-dessus qu'en dessous : il « appartient » à ce qui suit).",
      },
      {
        kind: "list",
        items: [
          "Règle : `margin-top` d'un titre > `margin-bottom`. Le titre introduit ce qui suit, il ne conclut pas ce qui précède.",
          "Dans les cartes : padding uniforme, espacement interne en 8/16. Jamais de padding asymétrique sans raison.",
          "Les listes : espacement entre items constant, supérieur à l'interlignage interne de chaque item.",
        ],
      },
    ],
  },
  {
    id: "gestalt-proximite",
    title: "Principes de la Gestalt",
    level: 3,
    intro:
      "La psychologie de la perception au service de la mise en page.",
    blocks: [
      {
        kind: "fields",
        title: "Les principes utiles en UI",
        fields: [
          {
            label: "Proximité",
            value:
              "Les éléments proches sont perçus comme liés : le fondement du groupement en UI (label + champ, carte + actions).",
          },
          {
            label: "Similarité",
            value:
              "Les éléments semblables sont perçus comme liés : même style = même fonction (tous les boutons primaires identiques).",
          },
          {
            label: "Continuité",
            value:
              "L'œil suit les alignements : les grilles et les lignes directrices guident le regard à travers l'écran.",
          },
          {
            label: "Figure / fond",
            value:
              "Distinguer le contenu du contenant : assez de contraste entre carte et fond, sinon tout se confond.",
          },
          {
            label: "Clôture",
            value:
              "L'esprit complète les formes : les bordures partielles et les cartes sans contour fonctionnent si l'alignement est rigoureux.",
          },
        ],
      },
    ],
  },
  {
    id: "couleur-fonctionnelle",
    title: "La couleur fonctionnelle",
    level: 3,
    intro:
      "En UI, la couleur est un langage : chaque couleur a un rôle.",
    blocks: [
      {
        kind: "table",
        headers: ["Rôle", "Usage", "Exemple"],
        rows: [
          ["Primaire", "Actions principales, éléments interactifs clés", "Bouton « Enregistrer », liens"],
          ["Neutres", "Texte, fonds, bordures, tout le reste", "Gris du texte courant au fond de page"],
          ["Succès", "Confirmations, états positifs", "Vert du message « Enregistré »"],
          ["Erreur", "Problèmes, actions destructrices", "Rouge du bouton « Supprimer »"],
          ["Avertissement", "Attentions, états intermédiaires", "Orange d'un quota presque atteint"],
          ["Information", "Messages neutres informatifs", "Bleu d'une notice"],
        ],
      },
      {
        kind: "list",
        items: [
          "Une couleur = un sens, partout : le rouge des erreurs ne sert jamais à décorer.",
          "Ne transmettez jamais une information par la seule couleur : ajoutez icône ou texte (daltonisme).",
          "Limitez la palette : 1 primaire, 4-6 neutres, 4 sémantiques. Le reste est du bruit.",
        ],
      },
    ],
  },
  {
    id: "iconographie",
    title: "Iconographie systématique",
    level: 3,
    intro:
      "Des icônes cohérentes : le set unique, les règles d'usage.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un seul set d'icônes par produit (Lucide, Material Symbols…) : mélanger les styles casse la cohérence.",
          "Taille optique uniforme : 16, 20 ou 24 px selon le contexte, jamais de 17 ou 23 px.",
          "Épaisseur de trait cohérente : toutes les icônes au même stroke (ex. 2 px à 24 px).",
          "Icône + label par défaut : seules les icônes universelles (recherche, fermer, menu) peuvent s'en passer — et encore, avec un tooltip.",
          "Zone tactile : 24×24 px minimum (WCAG 2.2 AA), 44×44 px idéal sur mobile.",
        ],
      },
    ],
  },
  {
    id: "boutons-hierarchie",
    title: "Hiérarchie des boutons",
    level: 3,
    intro:
      "Primaire, secondaire, tertiaire, destructeur : quand utiliser chacun.",
    blocks: [
      {
        kind: "table",
        headers: ["Niveau", "Apparence", "Usage"],
        rows: [
          ["Primaire", "Rempli, couleur primaire", "L'action principale de l'écran (une seule)"],
          ["Secondaire", "Contour ou fond neutre", "Actions alternatives (« Annuler », « Retour »)"],
          ["Tertiaire", "Texte seul", "Actions peu fréquentes (« Voir plus »)"],
          ["Destructeur", "Rouge (rempli ou contour)", "Suppressions, actions irréversibles"],
        ],
      },
      {
        kind: "list",
        items: [
          "Ordre : primaire à droite (ou en bas sur mobile), secondaire à gauche. L'action principale est la plus accessible.",
          "Les actions destructrices demandent confirmation : modale ou double étape, jamais de suppression en un clic.",
          "État désactivé : expliquez pourquoi (tooltip, message) plutôt que de laisser l'utilisateur deviner.",
        ],
      },
    ],
  },
  {
    id: "formulaires-avances",
    title: "Formulaires avancés",
    level: 3,
    intro:
      "Au-delà des bases : les patterns qui font des formulaires agréables.",
    blocks: [
      {
        kind: "list",
        items: [
          "Validation inline : validez à la sortie du champ (onBlur), pas à chaque frappe — valider pendant la frappe punit l'utilisateur.",
          "Formats aidés : masques de saisie pour téléphones, dates, cartes bancaires. Montrez le format attendu en placeholder.",
          "Regroupez par étapes : au-delà de 6-8 champs, découpez en étapes avec indicateur de progression et sauvegarde intermédiaire.",
          "Pré-remplissez tout ce qui est connu : rien n'énerve plus que de retaper ce que le système sait déjà.",
          "Boutons radio vs listes déroulantes : moins de 5 options → radios visibles ; plus → select. Les radios montrent les choix, le select les cache.",
        ],
      },
    ],
  },
  {
    id: "validation-erreurs",
    title: "Validation et messages d'erreur",
    level: 3,
    intro:
      "L'art de dire à l'utilisateur qu'il s'est trompé sans l'accabler.",
    blocks: [
      {
        kind: "fields",
        title: "Règles des bons messages",
        fields: [
          {
            label: "Précis",
            value:
              "« Le mot de passe doit contenir au moins 8 caractères » plutôt que « Mot de passe invalide ».",
          },
          {
            label: "Placé au bon endroit",
            value:
              "Sous le champ concerné, pas en haut du formulaire. L'utilisateur ne doit pas chercher.",
          },
          {
            label: "Non culpabilisant",
            value:
              "Ton neutre et aidant : « Cette adresse semble incomplète » plutôt que « Email incorrect ! ».",
          },
          {
            label: "Avec solution",
            value:
              "Indiquez comment corriger, pas seulement ce qui ne va pas. Idéalement, empêchez l'erreur (formats, contraintes).",
          },
          {
            label: "Résumé en haut si plusieurs",
            value:
              "Liste des erreurs avec ancres vers les champs : l'utilisateur corrige dans l'ordre sans scroller au hasard.",
          },
        ],
      },
    ],
  },
  {
    id: "tableaux-donnees",
    title: "Tableaux de données",
    level: 3,
    intro:
      "Des tableaux lisibles : densité, alignement, actions.",
    blocks: [
      {
        kind: "list",
        items: [
          "Alignement : texte à gauche, chiffres à droite, avec chiffres tabulaires (`font-variant-numeric: tabular-nums`).",
          "Densité : 3 niveaux (confortable, standard, compact) plutôt qu'un seul compromis.",
          "En-têtes fixes au scroll vertical pour les tableaux longs ; première colonne fixe au scroll horizontal.",
          "Actions : colonne d'actions à droite, icônes avec tooltips. Les actions destructrices demandent confirmation.",
          "État vide et zéro résultat : message + action (« Importer des données », « Réinitialiser les filtres »), jamais un tableau vide.",
          "Responsive : transformez en cartes sur mobile, ou scroll horizontal avec indicateur — jamais de tableau écrasé illisible.",
        ],
      },
    ],
  },
  {
    id: "etats-vides",
    title: "États vides",
    level: 3,
    intro:
      "La première impression de beaucoup d'utilisateurs : ne la gâchez pas.",
    blocks: [
      {
        kind: "list",
        items: [
          "Structure : illustration ou icône sobre + titre explicite + description courte + bouton d'action principale.",
          "Expliquez, ne constatez pas : « Vous n'avez pas encore de projet » → « Créez votre premier projet pour organiser votre travail ».",
          "Une seule action principale : l'état vide est un moment d'orientation, pas un menu.",
          "Distinguez « vide car nouveau » de « vide car filtré » : le second propose de réinitialiser les filtres.",
        ],
      },
    ],
  },
  {
    id: "etats-erreur",
    title: "États d'erreur",
    level: 3,
    intro:
      "Quand tout casse : les pages et messages d'erreur bien conçus.",
    blocks: [
      {
        kind: "list",
        items: [
          "404 : expliquez (« cette page n'existe pas ou a été déplacée »), proposez (recherche, accueil, retour). Un brin d'humour est permis, la clarté est obligatoire.",
          "Erreur serveur : ton sobre, pas de jargon technique. Proposez de réessayer + un moyen de contacter le support.",
          "Erreur réseau : distinguez « pas de connexion » (réessayer automatiquement) de « erreur serveur ».",
          "Ne perdez jamais le travail de l'utilisateur : un formulaire qui s'efface après une erreur est impardonnable.",
        ],
      },
    ],
  },
  {
    id: "etats-chargement",
    title: "États de chargement",
    level: 3,
    intro:
      "Faire patienter sans frustrer : skeletons, spinners et progressions.",
    blocks: [
      {
        kind: "table",
        headers: ["Pattern", "Quand l'utiliser", "À éviter"],
        rows: [
          ["Skeleton", "Chargement de contenu (listes, cartes)", "Skeleton qui ne ressemble pas au contenu final"],
          ["Spinner", "Action courte indéterminée", "Spinner sans contexte pendant plus de 3 s"],
          ["Barre de progression", "Processus mesurable (upload, étapes)", "Barre qui recule ou stagne à 99 %"],
          ["Optimistic UI", "Actions réversibles (like, favori)", "Sans mécanisme d'annulation en cas d'échec"],
          ["Lazy / pagination", "Listes très longues", "Scroll infini sans moyen de retrouver un élément"],
        ],
      },
      {
        kind: "list",
        items: [
          "Au-delà de 1 seconde, affichez un feedback ; au-delà de 10 secondes, l'utilisateur part : donnez une estimation ou un moyen d'attendre (contenu partiel).",
          "Les skeletons réduisent la perception du temps de chargement par rapport aux spinners génériques.",
        ],
      },
    ],
  },
  {
    id: "modales",
    title: "Modales et dialogues",
    level: 3,
    intro:
      "Interrompre l'utilisateur : à utiliser avec parcimonie, à designer avec soin.",
    blocks: [
      {
        kind: "list",
        items: [
          "Réservez les modales aux décisions importantes : confirmations destructrices, formulaires courts critiques. Le reste se fait en page.",
          "Structure : titre clair + contenu concis + actions (primaire à droite). Fermeture toujours possible (croix, Échap, clic extérieur).",
          "Focus piégé : au clavier, la tabulation reste dans la modale tant qu'elle est ouverte. Retour du focus à l'élément d'origine à la fermeture.",
          "Pas de modale dans une modale : au-delà d'un niveau, c'est un parcours, pas un dialogue.",
          "Sur mobile : bottom sheet plutôt que modale centrée — plus accessible au pouce.",
        ],
      },
    ],
  },
  {
    id: "navigation-avancee",
    title: "Navigation avancée",
    level: 3,
    intro:
      "Onglets, breadcrumbs, recherche : les patterns selon la profondeur.",
    blocks: [
      {
        kind: "fields",
        title: "Choisir le pattern",
        fields: [
          {
            label: "Onglets",
            value:
              "Vues alternatives d'un même contexte (ex. « Aperçu / Code / Paramètres »). 2 à 5 onglets, visibles d'un coup.",
          },
          {
            label: "Fil d'Ariane",
            value:
              "Parcours profonds et hiérarchiques : montre la position, permet de remonter d'un niveau.",
          },
          {
            label: "Navigation latérale",
            value:
              "Applications complexes (admin, SaaS) : sections nombreuses, possibilité de réduire.",
          },
          {
            label: "Recherche globale",
            value:
              "Indispensable au-delà de quelques dizaines de pages : `Cmd+K`, résultats instantanés, navigation au clavier.",
          },
          {
            label: "Stepper",
            value:
              "Parcours multi-étapes : montre la progression, permet de revenir en arrière sans perdre les données.",
          },
        ],
      },
    ],
  },
  {
    id: "responsive-patterns",
    title: "Patterns responsives",
    level: 3,
    intro:
      "Adapter la mise en page sans la dénaturer : les stratégies.",
    blocks: [
      {
        kind: "list",
        items: [
          "Priorisez le contenu : sur mobile, on ne « réduit » pas le desktop, on choisit ce qui compte vraiment.",
          "Navigation : hamburger ou bottom bar sur mobile (5 items max dans la bottom bar), navigation complète sur desktop.",
          "Tableaux → cartes : chaque ligne devient une carte empilée, avec les informations clés en premier.",
          "Colonnes → empilement : l'ordre d'empilement doit suivre la priorité, pas l'ordre du desktop.",
          "Tactile : cibles de 44×44 px minimum, espacements entre cibles cliquables, gestes standards (swipe, pull).",
        ],
      },
    ],
  },
  {
    id: "dark-mode-avance",
    title: "Dark mode avancé",
    level: 3,
    intro:
      "Au-delà des bases : systématiser le thème sombre.",
    blocks: [
      {
        kind: "list",
        items: [
          "Système d'élévation : 5-6 niveaux de surface (`#121212` → `#1E1E1E` → `#242424`…) correspondant à la profondeur.",
          "Overlays : les modales et menus utilisent une surface élevée + un voile semi-transparent, pas une ombre portée (invisible sur fond sombre).",
          "Images et illustrations : prévoyez des variantes ou des traitements (luminosité réduite) pour éviter les « flashs » blancs.",
          "Bascule : respectez la préférence système par défaut, avec override manuel mémorisé.",
          "Testez les deux thèmes à chaque écran : le dark mode n'est pas une option, c'est un deuxième produit à maintenir.",
        ],
      },
    ],
  },
  {
    id: "densite",
    title: "Densité d'information",
    level: 3,
    intro:
      "Confortable, standard, compact : adapter la densité au contexte.",
    blocks: [
      {
        kind: "list",
        items: [
          "Interfaces grand public : densité confortable (grands espacements, grandes cibles). La clarté prime.",
          "Outils professionnels : densité standard à compacte (dashboards, tableaux). Les utilisateurs experts préfèrent voir plus d'un coup.",
          "Proposez le choix quand c'est pertinent (Gmail, Notion) : la densité est une préférence, pas une vérité.",
          "La densité ne dispense pas du système : même compact, tout reste sur la grille 8pt.",
          "Attention : augmenter la densité ne doit jamais réduire les cibles tactiles sous 24 px ni les contrastes.",
        ],
      },
    ],
  },
  {
    id: "accessibilite-ui",
    title: "Accessibilité en UI",
    level: 3,
    intro:
      "Les exigences concrètes : ce que l'UI doit garantir.",
    blocks: [
      {
        kind: "list",
        items: [
          "Contrastes : 4.5:1 pour le texte courant, 3:1 pour les grands textes et les éléments graphiques (WCAG AA).",
          "Cibles : 24×24 px minimum (WCAG 2.2 AA), 44×44 px recommandé sur mobile.",
          "Focus visible : un indicateur de focus clair sur tous les éléments interactifs, jamais supprimé.",
          "Hiérarchie des titres logique (h1 → h2 → h3) : les lecteurs d'écran naviguent par titres.",
          "Ne pas transmettre d'information par la couleur seule : icônes, textes ou motifs en complément.",
          "Animations : respectez `prefers-reduced-motion`, évitez les clignotements (risque épileptique).",
        ],
      },
    ],
  },
  {
    id: "micro-interactions",
    title: "Micro-interactions en UI",
    level: 3,
    intro:
      "Les détails animés qui rendent l'interface vivante — sans la surcharger.",
    blocks: [
      {
        kind: "list",
        items: [
          "Chaque micro-interaction a un rôle : confirmer (cœur qui se remplit), orienter (transition d'écran), informer (badge qui s'incrémente).",
          "Durées : 100-300 ms pour les micro-feedbacks. Au-delà, c'est de la lenteur perçue.",
          "Cohérence : mêmes easings, mêmes durées dans tout le produit — documentés dans le design system.",
          "Subtilité : la bonne micro-interaction est à peine remarquée consciemment, mais son absence se ressent.",
          "Performance : privilégiez les propriétés animables à moindre coût (`transform`, `opacity`).",
        ],
      },
    ],
  },
  {
    id: "onboarding",
    title: "Onboarding et première utilisation",
    level: 3,
    intro:
      "Les patterns d'accueil : guider sans infantiliser.",
    blocks: [
      {
        kind: "fields",
        title: "Les patterns",
        fields: [
          {
            label: "Écran de valeur",
            value:
              "1 à 3 écrans qui expliquent le bénéfice avant l'inscription. Court, visuel, skippable.",
          },
          {
            label: "Inscription progressive",
            value:
              "Ne demandez que l'essentiel au départ ; le reste quand c'est nécessaire (progressive profiling).",
          },
          {
            label: "État vide guidé",
            value:
              "Le meilleur onboarding : un produit vide qui guide vers la première action réussie.",
          },
          {
            label: "Tooltips contextuels",
            value:
              "Une aide au moment précis où elle sert, pas un tutoriel de 10 étapes à la première ouverture.",
          },
          {
            label: "Checklist de démarrage",
            value:
              "Pour les produits complexes : 3-5 étapes visibles avec progression. Chaque étape complétée renforce l'engagement.",
          },
        ],
      },
      {
        kind: "text",
        text: "Mesurez l'activation (part des inscrits qui accomplissent l'action clé), pas le taux de complétion du tutoriel : un onboarding que personne ne finit mais qui active est un bon onboarding.",
      },
    ],
  },
  {
    id: "cartes-conteneurs",
    title: "Cartes et conteneurs",
    level: 3,
    intro:
      "La carte est l'atome de beaucoup d'interfaces : bien la construire.",
    blocks: [
      {
        kind: "list",
        items: [
          "Une carte = un sujet : titre, contenu, action(s). Si une carte contient trois sujets, faites trois cartes.",
          "Hiérarchie interne : titre en premier (graisse medium), métadonnées secondaires en caption, actions en bas ou au survol.",
          "Cliqueté : si toute la carte est cliquable, une seule action principale. Les actions secondaires restent des boutons distincts.",
          "Cohérence : même padding, même rayon, même ombre pour toutes les cartes d'un produit.",
          "Contenu variable : prévoyez les titres longs (tronqués proprement), les images manquantes, les états de chargement.",
        ],
      },
    ],
  },
  {
    id: "typographie-ui",
    title: "Typographie appliquée à l'UI",
    level: 3,
    intro:
      "L'échelle typographique au service des écrans : règles pratiques.",
    blocks: [
      {
        kind: "list",
        items: [
          "5 à 6 niveaux suffisent : display (hero), h1 (titre de page), h2 (section), body, caption, overline (eyebrow).",
          "Le corps à 16 px minimum ; les captions à 12-13 px pour les métadonnées uniquement, jamais pour de l'information critique.",
          "Un seul niveau de titre par écran en display : deux titres géants se neutralisent.",
          "Les boutons et labels en graisse medium (500-600) : ils se distinguent du corps sans crier.",
        ],
      },
    ],
  },
  {
    id: "ombres-elevation",
    title: "Ombres et élévation",
    level: 3,
    intro:
      "La profondeur en light mode : systématiser les ombres.",
    blocks: [
      {
        kind: "list",
        items: [
          "3 à 4 niveaux d'élévation suffisent : repos, survol, modale, menu flottant. Chaque niveau = une ombre plus marquée.",
          "Une ombre = décalage Y + flou + opacité faible (8-16 %). Les ombres dures et sombres datent l'interface.",
          "L'élévation a un sens : plus c'est élevé, plus c'est « proche » de l'utilisateur (modale > carte > fond).",
          "En dark mode, remplacez les ombres par des surfaces plus claires : les ombres sont invisibles sur fond sombre.",
        ],
      },
    ],
  },
  {
    id: "selection-controles",
    title: "Contrôles de sélection",
    level: 3,
    intro:
      "Checkbox, radio, switch, select : choisir le bon contrôle.",
    blocks: [
      {
        kind: "table",
        headers: ["Contrôle", "Usage", "À éviter"],
        rows: [
          ["Checkbox", "Choix multiples, activation d'option", "Pour un choix unique"],
          ["Radio", "Choix unique parmi 2-5 options visibles", "Pour des choix multiples"],
          ["Switch", "Activation immédiate d'un paramètre", "Dans un formulaire (préférez la checkbox)"],
          ["Select", "Plus de 5 options, place limitée", "Pour 2-3 options (utilisez des radios)"],
          ["Segmented control", "2-4 vues/modes exclusifs", "Pour des actions, ce n'est pas un bouton"],
        ],
      },
      {
        kind: "list",
        items: [
          "Labels cliquables : le texte du label active le contrôle (zone tactile élargie).",
          "États : coché, non coché, indéterminé (checkbox parent), désactivé — tous dessinés.",
        ],
      },
    ],
  },
  {
    id: "recherche-filtres",
    title: "Recherche et filtres",
    level: 3,
    intro:
      "Les patterns pour retrouver du contenu dans de grands ensembles.",
    blocks: [
      {
        kind: "list",
        items: [
          "Barre de recherche visible et persistante quand la recherche est centrale au produit (`Cmd+K` en raccourci).",
          "Résultats instantanés (as-you-type) avec surlignage des correspondances et navigation au clavier.",
          "Filtres : facettes avec compteurs (« Couleur (12) »), état actif visible, réinitialisation en un clic.",
          "Zéro résultat : expliquez pourquoi + proposez (élargir la recherche, réinitialiser les filtres), jamais une page vide.",
          "Recherche récente et suggestions : accélérez les recherches répétées.",
        ],
      },
    ],
  },
  {
    id: "design-tokens",
    title: "Design tokens en CSS",
    level: 3,
    intro:
      "Industrialiser les décisions UI : des tokens nommés, versionnés.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Tokens d'un mini design system",
        code: ":root {\n  /* Couleurs sémantiques */\n  --color-primary: #1a73e8;\n  --color-text: #1f1f1f;\n  --color-text-muted: #5f6368;\n  --color-surface: #ffffff;\n  --color-border: #dadce0;\n  --color-danger: #d93025;\n\n  /* Espacements (8pt) */\n  --space-2: 8px;\n  --space-4: 16px;\n  --space-6: 24px;\n\n  /* Rayons */\n  --radius-sm: 4px;\n  --radius-md: 8px;\n  --radius-full: 999px;\n\n  /* Élévations */\n  --shadow-card: 0 1px 2px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%);\n  --shadow-modal: 0 8px 28px rgb(0 0 0 / 16%);\n}",
      },
      {
        kind: "list",
        items: [
          "Nommez par rôle (`--color-text-muted`), jamais par valeur (`--gray-500`) : les rôles survivent aux refontes.",
          "Un token = une décision : si deux éléments partagent une valeur par hasard, ce sont deux tokens.",
          "Documentez : chaque token a un usage décrit et un exemple. Un token non documenté sera mal utilisé.",
        ],
      },
    ],
  },
  {
    id: "documentation-composants",
    title: "Documenter les composants",
    level: 3,
    intro:
      "Un composant sans documentation sera mal utilisé : que documenter.",
    blocks: [
      {
        kind: "list",
        items: [
          "Usage : quand utiliser ce composant, quand ne pas l'utiliser (avec alternatives).",
          "Anatomie : les parties du composant nommées, les propriétés configurables.",
          "États : tous les états dessinés (voir la checklist des états).",
          "Exemples et contre-exemples : « à faire / à éviter » visuels, plus parlants que des paragraphes.",
          "Accessibilité : rôles ARIA, navigation clavier, contrastes — documentés avec le composant, pas après.",
        ],
      },
    ],
  },
  {
    id: "revue-ui-checklist",
    title: "Checklist de revue UI",
    level: 3,
    intro:
      "La grille de relecture avant de considérer un écran comme terminé.",
    blocks: [
      {
        kind: "list",
        items: [
          "Grille : tout est aligné, aucun élément « à peu près » placé.",
          "Espacements : tous sur l'échelle 8pt, rythme régulier.",
          "Hiérarchie : un élément dominant, lecture en Z ou F naturelle.",
          "Typographie : niveaux cohérents, pas plus de 6 tailles.",
          "Couleur : rôles respectés, contrastes vérifiés (4.5:1).",
          "États : vide, chargement, erreur, désactivé dessinés.",
          "Cohérence : mêmes patterns que les autres écrans du produit.",
          "Responsive : 360 px et 1440 px vérifiés, pas de débordement.",
          "Accessibilité : focus visible, cibles 24 px+, textes alternatifs.",
          "Textes : orthographe, microtypographie française, pas de lorem ipsum.",
        ],
      },
    ],
  },
  {
    id: "projets",
    title: "Projets pour progresser",
    level: 3,
    intro:
      "Des exercices concrets, du plus court au plus ambitieux.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "30 minutes : audit 8pt",
            detail:
              "Prenez un de vos écrans, vérifiez chaque espacement : tout doit être multiple de 8 (ou 4). Corrigez.",
          },
          {
            title: "2 heures : bibliothèque de boutons",
            detail:
              "4 niveaux (primaire, secondaire, tertiaire, destructeur) × 7 états. Documentez l'usage de chacun.",
          },
          {
            title: "1 journée : refonte d'un écran",
            detail:
              "Choisissez un écran dense (dashboard, formulaire), appliquez grille, hiérarchie, états. Présentez avant/après.",
          },
          {
            title: "1 semaine : mini design system",
            detail:
              "Tokens CSS, 8 composants documentés (usage, états, accessibilité), 3 écrans d'exemple. Le livrable : une page de doc.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-avancees",
    title: "Erreurs avancées",
    level: 3,
    intro:
      "Les pièges qui subsistent quand les bases sont maîtrisées.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Pourquoi c'est un problème", "Correction"],
        rows: [
          [
            "Hiérarchie par la couleur seule",
            "Invisible pour les daltoniens, fragile",
            "Combiner taille/graisse/position + couleur",
          ],
          [
            "Modales pour tout",
            "Interruptions incessantes, frustration",
            "Modale = décision importante uniquement",
          ],
          [
            "États désactivés sans explication",
            "L'utilisateur ne comprend pas le blocage",
            "Expliquer la condition d'activation",
          ],
          [
            "Dark mode inversé automatiquement",
            "Contrastes cassés, couleurs criardes",
            "Thème sombre conçu séparément, tout re-vérifié",
          ],
          [
            "Densité maximale partout",
            "Charge cognitive, erreurs",
            "Densité adaptée au contexte et à l'expertise",
          ],
          [
            "Cohérence de façade",
            "Mêmes couleurs, comportements différents",
            "Cohérence des comportements, pas seulement des styles",
          ],
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro:
      "Les références pour approfondir l'UI design.",
    blocks: [
      {
        kind: "fields",
        title: "À consulter",
        fields: [
          {
            label: "Refactoring UI — Adam Wathan & Steve Schoger (refactoringui.com)",
            value:
              "Le livre et le site de référence : des tactiques concrètes pour améliorer n'importe quelle interface, avec exemples avant/après.",
          },
          {
            label: "Material Design 3 (m3.material.io)",
            value:
              "Le design system de Google : composants, tokens, motion — une spécification complète et gratuite.",
          },
          {
            label: "Apple Human Interface Guidelines (developer.apple.com)",
            value:
              "Les recommandations d'Apple : principes, composants iOS/macOS, accessibilité.",
          },
          {
            label: "Laws of UX (lawsofux.com)",
            value:
              "Les principes psychologiques (Hick, Miller, Gestalt…) expliqués avec des exemples d'interfaces.",
          },
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "L'UI design s'approfondit vers les systèmes, l'accessibilité et le motion.",
    blocks: [
      {
        kind: "list",
        items: [
          "Systématiser (`design-system`) : transformer vos composants en système documenté et gouverné.",
          "Rendre accessible (`accessibilite-design`) : WCAG, navigation clavier, tests avec utilisateurs.",
          "Animer (`motion-design`) : micro-interactions et transitions qui donnent vie aux interfaces.",
          "Prototyper (`prototypage`) : tester vos interfaces avant de les faire développer.",
        ],
      },
    ],
  },
];

import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du Prototypage : choisir la bonne fidélité,
 * construire des prototypes testables et itérer sur des preuves.
 * 3 niveaux (Aperçu / Pratique / Approfondi).
 */
export const LEARNING_PROTOTYPAGE: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Ce qu'est le prototypage, et pourquoi c'est l'outil le plus rentable du design.",
    blocks: [
      {
        kind: "text",
        text: "Prototyper, c'est matérialiser une idée juste assez pour la tester : un croquis papier, des écrans cliquables, une maquette animée. L'objectif n'est jamais le prototype lui-même, mais ce qu'il permet d'apprendre — à moindre coût, avant d'écrire la moindre ligne de code.",
      },
      {
        kind: "text",
        text: "Un prototype testé avec 5 utilisateurs révèle plus de problèmes en une journée qu'une semaine de réunions. Le prototypage transforme les débats d'opinion (« je pense que les utilisateurs préfèreront… ») en observations (« 4 utilisateurs sur 5 n'ont pas trouvé le bouton »).",
      },
      {
        kind: "list",
        items: [
          "Un prototype répond à une question précise : quelle question posez-vous ?",
          "La fidélité suit la question : papier pour explorer, cliquable pour tester un parcours, haute-fidélité pour valider le visuel.",
          "Un bon prototype se jette : s'il coûte trop cher à modifier, il est trop détaillé.",
        ],
      },
    ],
  },
  {
    id: "fidelite-30-secondes",
    title: "La fidélité en 30 secondes",
    level: 1,
    intro:
      "Le concept central du prototypage : adapter le niveau de détail à la question posée.",
    blocks: [
      {
        kind: "diagram",
        title: "Les trois niveaux de fidélité",
        lines: [
          "BASSE FIDÉLITÉ (papier, croquis)",
          "  → Question : la structure a-t-elle du sens ?",
          "  → Coût : minutes. Se jette sans regret.",
          "",
          "MOYENNE FIDÉLITÉ (wireframes cliquables)",
          "  → Question : le parcours est-il compréhensible ?",
          "  → Coût : heures. Testable par des utilisateurs.",
          "",
          "HAUTE FIDÉLITÉ (maquette finalisée, animée)",
          "  → Question : le visuel et les interactions convainquent-ils ?",
          "  → Coût : jours. Proche du produit final.",
        ],
      },
      {
        kind: "text",
        text: "L'erreur classique : monter en fidélité trop tôt. Un prototype trop détaillé trop tôt fige les discussions sur l'esthétique alors que la structure n'est pas validée — et personne n'ose le jeter après y avoir investi des jours.",
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
      "Les outils et le matériel pour prototyper dès aujourd'hui.",
    blocks: [
      {
        kind: "fields",
        title: "Le kit de prototypage",
        fields: [
          {
            label: "Papier et feutres",
            value:
              "Le moyen le plus rapide : croquis d'écrans, tests papier en 10 minutes. Aucune excuse pour ne pas prototyper.",
          },
          {
            label: "Figma (gratuit)",
            value:
              "Le standard : dessinez les écrans, reliez-les en mode Prototype, partagez un lien testable. Suffit pour 90 % des prototypes.",
          },
          {
            label: "Maze (maze.co)",
            value:
              "Tests non modérés sur prototype Figma : envoi d'un lien, résultats quantifiés (taux de réussite, temps, parcours).",
          },
          {
            label: "Téléphone + appareil photo",
            value:
              "Pour les tests papier : photographiez chaque écran dessiné, simulez les transitions en changeant de photo (méthode du « magicien d'Oz »).",
          },
        ],
      },
      {
        kind: "text",
        text: "Commencez par le papier et Figma. Les outils spécialisés (ProtoPie, Framer) ne deviennent utiles que pour des interactions complexes que Figma ne peut pas simuler.",
      },
    ],
  },
  {
    id: "quand-prototyper-quoi",
    title: "Quand prototyper quoi",
    level: 2,
    intro:
      "Choisir la bonne fidélité selon la question : le tableau de décision.",
    blocks: [
      {
        kind: "table",
        headers: ["Question posée", "Fidélité adaptée", "Format typique"],
        rows: [
          [
            "La structure de l'écran a-t-elle du sens ?",
            "Basse",
            "Croquis papier, wireframes gris",
          ],
          [
            "Les utilisateurs comprennent-ils le parcours ?",
            "Moyenne",
            "Écrans Figma reliés, cliquables",
          ],
          [
            "Le visuel inspire-t-il confiance ?",
            "Haute",
            "Maquette finalisée",
          ],
          [
            "L'interaction est-elle comprise ?",
            "Haute",
            "Prototype animé (transitions, micro-interactions)",
          ],
          [
            "Faut-il convaincre des décideurs ?",
            "Haute",
            "Démo cliquable soignée",
          ],
        ],
      },
      {
        kind: "text",
        text: "Formulez toujours la question avant de prototyper, par écrit, en une phrase. Un prototype sans question devient une maquette prématurée que l'équipe prendra pour une décision finale.",
      },
    ],
  },
  {
    id: "prototype-papier",
    title: "Prototype papier",
    level: 2,
    intro:
      "Le prototype le plus rapide : 30 minutes du croquis au test.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Dessinez les écrans clés",
            detail:
              "Un écran par feuille, au feutre épais. Boîtes grises pour les images, lignes pour le texte, boutons bien visibles. 5 à 8 écrans suffisent pour un parcours.",
          },
          {
            title: "Préparez les éléments mobiles",
            detail:
              "Menus déroulants, claviers, popups sur des petits papiers séparés : vous les poserez pendant le test pour simuler l'interaction.",
          },
          {
            title: "Définissez une tâche",
            detail:
              "Une tâche réaliste et concrète : « Vous voulez réserver une salle pour demain à 18h. Montrez-moi comment vous feriez. »",
          },
          {
            title: "Jouez l'ordinateur",
            detail:
              "Vous changez les feuilles selon les « clics » de l'utilisateur, sans expliquer ni aider. Restez neutre : c'est le test, pas une démo.",
          },
          {
            title: "Notez les blocages",
            detail:
              "Chaque hésitation, chaque erreur, chaque question (« je clique où ? ») est une donnée. Photographiez l'état final annoté.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le prototype papier a un avantage psychologique : les utilisateurs osent le critiquer, contrairement à une maquette léchée qu'ils n'osent pas « abîmer ».",
      },
    ],
  },
  {
    id: "prototype-figma-cliquable",
    title: "Prototype Figma cliquable",
    level: 2,
    intro:
      "Relier des écrans en parcours testable : le flux de travail standard.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Préparez les écrans",
            detail:
              "Un frame par écran du parcours, nommés clairement (01-Accueil, 02-Recherche…). Incluez les états importants : vide, erreur, confirmation.",
          },
          {
            title: "Passez en mode Prototype",
            detail:
              "Onglet Prototype dans le panneau de droite. Cliquez sur un élément, tirez la flèche vers l'écran de destination.",
          },
          {
            title: "Réglez les interactions",
            detail:
              "Déclencheur (clic, survol), transition (instantané, dissolve, slide), durée. Pour un test de parcours, « Navigate to » + transition instantanée suffit.",
          },
          {
            title: "Définissez le point de départ",
            detail:
              "Clic droit sur le premier écran → « Set as starting point ». Sans ça, le prototype démarre n'importe où.",
          },
          {
            title: "Partagez le lien",
            detail:
              "Bouton Share → lien en mode prototype. Testez-le vous-même en navigation privée avant de l'envoyer : les liens cassés tuent les tests.",
          },
        ],
      },
    ],
  },
  {
    id: "interactions-bases",
    title: "Interactions de base",
    level: 2,
    intro:
      "Les réglages qui rendent un prototype crédible sans y passer des heures.",
    blocks: [
      {
        kind: "list",
        items: [
          "Transitions : `Instant` pour tester la compréhension du parcours, `Dissolve` ou `Smart animate` pour tester le ressenti.",
          "Scroll : définissez les zones de défilement (overflow scroll) sur les listes et pages longues, sinon le prototype paraît cassé.",
          "États : prévoyez au moins l'état d'erreur principal (ex. formulaire invalide) — les testeurs cliqueront dessus.",
          "Limitez les chemins : un prototype de test n'a pas besoin de tous les écrans, seulement du parcours testé plus 2-3 écrans de sortie.",
          "Désactivez les zones non cliquables importantes : un testeur qui clique partout et ne déclenche rien pensera que le prototype est cassé.",
        ],
      },
    ],
  },
  {
    id: "tester-avec-5-utilisateurs",
    title: "Tester avec 5 utilisateurs",
    level: 2,
    intro:
      "Le protocole minimal qui révèle la majorité des problèmes d'utilisabilité.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Recrutez 5 personnes du public cible",
            detail:
              "Pas des collègues designers : des utilisateurs réels ou proches du profil. 5 suffisent pour révéler les problèmes majeurs d'un parcours.",
          },
          {
            title: "Préparez 2 à 3 tâches",
            detail:
              "Des objectifs, pas des instructions : « trouvez un vol pour vendredi » plutôt que « cliquez sur le bouton Rechercher ».",
          },
          {
            title: "Testez un par un, 20-30 minutes",
            detail:
              "Demandez de penser à voix haute. Observez, notez, n'aidez pas. Si l'utilisateur est bloqué plus de 2 minutes, passez à la tâche suivante.",
          },
          {
            title: "Notez succès, échecs et hésitations",
            detail:
              "Pour chaque tâche : réussite directe, réussite avec aide, échec. Plus les citations marquantes (« je ne comprends pas ce mot »).",
          },
          {
            title: "Synthétisez après les 5 sessions",
            detail:
              "Regroupez les problèmes par fréquence : un problème rencontré par 3+ utilisateurs est prioritaire. Décidez des corrections avant d'itérer.",
          },
        ],
      },
    ],
  },
  {
    id: "preparer-session-test",
    title: "Préparer une session de test",
    level: 2,
    intro:
      "La checklist avant chaque session : rien ne doit être improvisé.",
    blocks: [
      {
        kind: "list",
        items: [
          "Prototype testé de bout en bout par vous-même, la veille : tous les liens du parcours fonctionnent.",
          "Guide de session écrit : accueil, tâches dans l'ordre, questions de fin. Imprimé ou sur un second écran.",
          "Matériel : enregistreur (avec accord), chronomètre, grille de notes avec une ligne par tâche.",
          "Consentement : expliquez l'enregistrement et son usage, obtenez l'accord explicite avant de commencer.",
          "Plan B : si le prototype plante, ayez les écrans en PDF ou en images pour continuer la session.",
        ],
      },
    ],
  },
  {
    id: "observer-sans-guider",
    title: "Observer sans guider",
    level: 2,
    intro:
      "La discipline du facilitateur : se taire est un travail.",
    blocks: [
      {
        kind: "list",
        items: [
          "Ne dites jamais « cliquez ici » : si l'utilisateur ne trouve pas seul, c'est une donnée, pas un échec de l'utilisateur.",
          "Questions neutres uniquement : « que vous attendez-vous à voir ? », « que pensez-vous de cet écran ? ».",
          "Silences : laissez 5 secondes après une hésitation avant d'intervenir. L'utilisateur réfléchit, ne le sauvez pas trop vite.",
          "Ne défendez jamais le design : « c'est parce que… » invalide le test. Notez, remerciez, passez à la suite.",
          "En fin de session, demandez l'avis global : les impressions générales complètent les observations tâche par tâche.",
        ],
      },
    ],
  },
  {
    id: "iterer-documenter",
    title: "Itérer et documenter",
    level: 2,
    intro:
      "Transformer les constats en nouvelle version — en gardant la trace.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Listez les problèmes observés",
            detail:
              "Un problème = description, fréquence (x/5 utilisateurs), gravité (bloquant, gênant, cosmétique).",
          },
          {
            title: "Priorisez",
            detail:
              "Corrigez d'abord les bloquants fréquents. Les problèmes cosmétiques rares attendront.",
          },
          {
            title: "Modifiez le prototype",
            detail:
              "Dupliquez la version (V1 → V2) avant de modifier : l'historique des versions est une documentation précieuse.",
          },
          {
            title: "Notez la raison de chaque changement",
            detail:
              "« V2 : bouton déplacé en bas d'écran suite à 4/5 échecs en V1 ». Cette traçabilité nourrit vos case studies.",
          },
          {
            title: "Re-testez",
            detail:
              "3 nouveaux utilisateurs sur la V2 suffisent pour valider que le problème est résolu sans en créer de nouveau.",
          },
        ],
      },
    ],
  },
  {
    id: "handoff-bases",
    title: "Transmettre aux développeurs",
    level: 2,
    intro:
      "Le prototype comme support de transmission : les bases du handoff.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un prototype annoté vaut mieux qu'un document séparé : notes directement sur les écrans (comportements, cas limites).",
          "Précisez les interactions : durée, easing, déclencheurs. « Ça glisse joliment » n'est pas une spec.",
          "Listez les états : vide, chargement, erreur, succès — pour chaque écran qui en a besoin.",
          "Fournissez les assets exportables (icônes, images) aux bons formats, nommés clairement.",
          "Restez disponible pendant le développement : les questions surgiront, un échange de 5 minutes évite une mauvaise interprétation.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 2,
    intro:
      "Les pièges classiques du prototypage — et comment les éviter.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Pourquoi c'est un problème", "Correction"],
        rows: [
          [
            "Trop de fidélité trop tôt",
            "On débat du visuel avant de valider la structure",
            "Papier ou wireframes tant que la structure bouge",
          ],
          [
            "Prototyper sans question",
            "Le prototype devient une maquette prématurée",
            "Écrire la question testée avant de commencer",
          ],
          [
            "Tester avec des collègues",
            "Ils connaissent le produit et n'osent pas critiquer",
            "Recruter des utilisateurs réels, même 5",
          ],
          [
            "Guider l'utilisateur pendant le test",
            "Les résultats sont faussés",
            "Observer en silence, noter, ne pas aider",
          ],
          [
            "S'attacher au prototype",
            "On refuse de jeter des jours de travail",
            "Prototypes jetables : versionner, puis jeter sans regret",
          ],
          [
            "Un seul test en fin de projet",
            "Trop tard pour changer quoi que ce soit",
            "Tester tôt et souvent, à chaque itération",
          ],
        ],
      },
    ],
  },
  {
    id: "plan-30-jours",
    title: "Plan de progression en 30 jours",
    level: 2,
    intro:
      "De zéro à des prototypes testés en un mois.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Semaine 1 : papier",
            detail:
              "Croquez 3 parcours d'apps que vous utilisez. Testez un prototype papier avec 2 proches. Objectif : la vitesse d'exécution.",
          },
          {
            title: "Semaine 2 : Figma cliquable",
            detail:
              "Reproduisez un parcours simple (inscription, recherche) en 6 écrans reliés. Partagez le lien à quelqu'un et observez.",
          },
          {
            title: "Semaine 3 : test complet",
            detail:
              "Prototypage + 5 tests utilisateurs + synthèse + V2. Documentez chaque étape : c'est votre première preuve de méthode.",
          },
          {
            title: "Semaine 4 : handoff",
            detail:
              "Annotez votre prototype comme pour un développeur : interactions, états, cas limites. Demandez à un dev ce qui lui manque.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "echelle-fidelite",
    title: "L'échelle de fidélité en détail",
    level: 3,
    intro:
      "Chaque niveau de fidélité a ses usages, ses outils et ses limites.",
    blocks: [
      {
        kind: "table",
        headers: ["Niveau", "Outils", "Ce qu'il prouve", "Ce qu'il ne prouve pas"],
        rows: [
          [
            "Croquis",
            "Papier, tableau blanc",
            "Les idées existent et se discutent",
            "Rien sur l'utilisabilité",
          ],
          [
            "Wireframe statique",
            "Figma, Balsamiq",
            "La structure et la hiérarchie",
            "Ni le parcours ni le ressenti",
          ],
          [
            "Prototype cliquable",
            "Figma, liens partagés",
            "La compréhension du parcours",
            "Ni le visuel final ni la performance",
          ],
          [
            "Prototype animé",
            "Smart animate, ProtoPie",
            "Le ressenti des interactions",
            "Ni la faisabilité technique ni les edge cases",
          ],
          [
            "Prototype fonctionnel",
            "Code (HTML/CSS/JS)",
            "Le comportement réel, les données",
            "Le coût de production reste inconnu",
          ],
        ],
      },
      {
        kind: "text",
        text: "Monter d'un niveau ne valide pas le niveau précédent : un prototype haute-fidélité construit sur une structure non testée reste fragile. Validez dans l'ordre, du brut vers le raffiné.",
      },
    ],
  },
  {
    id: "prototype-jetable",
    title: "Le prototype jetable",
    level: 3,
    intro:
      "Le prototype a une durée de vie : pensez sa fin dès le début.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un prototype jetable se construit vite et sale : pas de composants parfaits, pas de design system, pas de pixel-perfect.",
          "Fixez sa question et sa date de péremption : « valider le parcours d'inscription cette semaine ». Après, on jette.",
          "Le danger : le prototype jetable qui devient la maquette de référence parce qu'il « ressemble déjà au produit ». Marquez-le visuellement (filigrane « PROTOTYPE »).",
          "À l'inverse, un prototype évolutif (design system, composants propres) se justifie quand il servira de base au produit — mais il coûte 3 à 5 fois plus cher à produire.",
        ],
      },
    ],
  },
  {
    id: "papier-avance",
    title: "Techniques papier avancées",
    level: 3,
    intro:
      "Le papier peut simuler bien plus qu'on ne croit.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le « magicien d'Oz » : un facilitateur caché simule le comportement du système (réponses, calculs) pendant que l'utilisateur interagit avec du papier.",
          "Les calques mobiles : onglets, menus, claviers sur des bouts de papier que l'on pose et retire pour simuler les états.",
          "Le test à distance : photographiez les écrans, envoyez-les un par un en visio selon les « clics » décrits par l'utilisateur.",
          "Limite assumée : le papier ne teste ni le ressenti visuel ni les interactions fines — seulement la structure et la compréhension.",
        ],
      },
    ],
  },
  {
    id: "figma-avance",
    title: "Figma avancé pour prototypes",
    level: 3,
    intro:
      "Les fonctions qui font passer un prototype de « cliquable » à « réaliste ».",
    blocks: [
      {
        kind: "fields",
        title: "Fonctions clés",
        fields: [
          {
            label: "Variants interactifs",
            value:
              "Boutons, toggles, champs qui changent d'état au clic : le prototype réagit comme le produit final.",
          },
          {
            label: "Variables",
            value:
              "Stocker des valeurs (texte saisi, étape courante) et les réutiliser : simule un formulaire qui « retient » les données.",
          },
          {
            label: "Overflow scroll",
            value:
              "Zones défilantes horizontales (carrousels) et verticales : indispensable pour les prototypes mobiles crédibles.",
          },
          {
            label: "Conditional interactions",
            value:
              "« Si le champ est vide, afficher l'erreur » : des prototypes qui réagissent aux saisies, sans code.",
          },
        ],
      },
    ],
  },
  {
    id: "smart-animate",
    title: "Smart Animate et transitions",
    level: 3,
    intro:
      "Animer les transitions entre écrans pour tester le ressenti.",
    blocks: [
      {
        kind: "list",
        items: [
          "Smart Animate interpole automatiquement les éléments communs entre deux écrans : renommez les calques à l'identique pour des transitions fluides.",
          "Testez les transitions une par une : une animation qui semble évidente au designer peut désorienter l'utilisateur.",
          "Les transitions servent l'orientation : elles montrent d'où vient un écran et où il va (tiroir latéral, modale qui monte).",
          "Attention à la performance : un prototype qui rame fausse le test du ressenti. Simplifiez les écrans lourds.",
        ],
      },
    ],
  },
  {
    id: "micro-interactions",
    title: "Micro-interactions",
    level: 3,
    intro:
      "Les détails qui font la qualité perçue : à prototyper séparément.",
    blocks: [
      {
        kind: "list",
        items: [
          "Une micro-interaction = déclencheur + règle + feedback : « au clic sur favori, le cœur se remplit avec un léger rebond et un compteur s'incrémente ».",
          "Prototypez-les isolément : un frame dédié par micro-interaction, testable en boucle.",
          "Chaque micro-interaction doit avoir un sens : confirmer une action, guider l'attention, masquer un temps de chargement. L'animation décorative lasse vite.",
          "Documentez-les pour les devs : déclencheur, durée, easing, états — sinon elles seront approximées ou oubliées.",
        ],
      },
    ],
  },
  {
    id: "easing-durees",
    title: "Easing et durées",
    level: 3,
    intro:
      "Les valeurs qui rendent les animations naturelles — transposables en CSS.",
    blocks: [
      {
        kind: "text",
        text: "Une animation linéaire paraît mécanique : l'œil attend une accélération au départ et une décélération à l'arrivée (easing). Les durées se comptent en millisecondes : trop court, l'utilisateur ne perçoit pas le changement ; trop long, l'interface paraît lente.",
      },
      {
        kind: "code",
        language: "css",
        title: "Valeurs d'easing standard (Material Design)",
        code: "/* Sortie d'écran : accélère puis s'arrête net */\n.ease-out {\n  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);\n}\n\n/* Entrée d'écran : démarrage doux */\n.ease-in-out {\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n/* Durées recommandées */\n:root {\n  --duration-instant: 100ms;  /* micro-feedback */\n  --duration-fast: 200ms;     /* petits éléments */\n  --duration-medium: 300ms;   /* transitions d'écran */\n  --duration-slow: 500ms;     /* grandes surfaces, maximum usuel */\n}",
      },
      {
        kind: "list",
        items: [
          "Règle : 200-300 ms pour la plupart des transitions d'interface. Au-delà de 500 ms, l'utilisateur perçoit de la lenteur.",
          "Les éléments qui entrent à l'écran utilisent un easing de décélération ; ceux qui sortent, d'accélération.",
          "Respectez `prefers-reduced-motion` : proposez une version sans animation pour les utilisateurs qui la désactivent.",
        ],
      },
    ],
  },
  {
    id: "prototypes-fonctionnels",
    title: "Prototypes fonctionnels en code",
    level: 3,
    intro:
      "Quand Figma ne suffit plus : un prototype HTML/CSS/JS pour tester le comportement réel.",
    blocks: [
      {
        kind: "text",
        text: "Un prototype codé se justifie pour tester des interactions complexes (drag & drop, gestes, données dynamiques) ou la performance réelle. Il reste jetable : pas de tests, pas d'architecture, du code rapide.",
      },
      {
        kind: "code",
        language: "html",
        title: "Squelette minimal d'un prototype jetable",
        code: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Prototype — tunnel d'inscription</title>\n  <style>\n    /* Styles rapides, pas de framework : le but est de tester, pas de produire */\n    .step { display: none; }\n    .step.active { display: block; }\n  </style>\n</head>\n<body>\n  <main>\n    <section class=\"step active\" id=\"step-1\"><!-- écran 1 --></section>\n    <section class=\"step\" id=\"step-2\"><!-- écran 2 --></section>\n  </main>\n  <script>\n    // Navigation minimale entre étapes\n    function goTo(id) {\n      document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));\n      document.getElementById(id).classList.add('active');\n    }\n  </script>\n</body>\n</html>",
      },
      {
        kind: "list",
        items: [
          "Un seul fichier HTML suffit souvent : pas de build, ouvrable dans n'importe quel navigateur.",
          "Simulez les données en dur dans le JS : l'utilisateur ne verra pas la différence pendant un test.",
          "Timeboxez : 2 à 4 heures maximum. Au-delà, vous construisez un produit, pas un prototype.",
        ],
      },
    ],
  },
  {
    id: "outils-avances",
    title: "Outils avancés",
    level: 3,
    intro:
      "ProtoPie, Framer et consorts : quand les franchir.",
    blocks: [
      {
        kind: "fields",
        title: "Panorama",
        fields: [
          {
            label: "ProtoPie (protopie.io)",
            value:
              "Interactions complexes sans code : capteurs du téléphone, logique conditionnelle, prototypes haute-fidélité réalistes. Le choix pour les interactions mobiles avancées.",
          },
          {
            label: "Framer (framer.com)",
            value:
              "Du design au site interactif : utile quand le prototype doit aussi servir de démo publique ou de landing page.",
          },
          {
            label: "Axure",
            value:
              "Le vétéran des prototypes à logique complexe (formulaires multi-étapes, données dynamiques), encore utilisé en entreprise.",
          },
        ],
      },
      {
        kind: "text",
        text: "N'apprenez un nouvel outil que face à un besoin réel : « Figma ne peut pas simuler ce geste » est une raison ; « cet outil a l'air puissant » n'en est pas une.",
      },
    ],
  },
  {
    id: "prototypes-mobiles",
    title: "Prototyper pour mobile",
    level: 3,
    intro:
      "Les spécificités des prototypes mobiles : gestes, tailles, contexte.",
    blocks: [
      {
        kind: "list",
        items: [
          "Testez sur un vrai téléphone : un prototype mobile vu sur écran d'ordinateur fausse toutes les perceptions de taille et de lisibilité.",
          "Simulez les gestes natifs : swipe, pull-to-refresh, bottom sheets — Figma les gère en mode prototype, ProtoPie pour les plus complexes.",
          "Prévoyez le clavier virtuel : il masque la moitié de l'écran. Vos formulaires doivent rester utilisables avec le clavier affiché.",
          "Testez dans le contexte réel : debout, en marchant, en plein soleil. Le mobile s'utilise rarement assis devant un bureau.",
        ],
      },
    ],
  },
  {
    id: "prototypes-conversationnels",
    title: "Prototypes conversationnels",
    level: 3,
    intro:
      "Chatbots, assistants vocaux : prototyper sans interface graphique.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le magicien d'Oz textuel : un humain répond manuellement derrière une interface de chat pendant le test. Zéro développement, apprentissages maximum.",
          "Scénarisez les parcours : arbre de décision des intentions, réponses types, cas d'échec (« je n'ai pas compris »).",
          "Testez la formulation : le ton, la longueur des messages et la gestion des erreurs se testent avec de simples scripts lus à voix haute.",
          "Mesurez la résolution : l'utilisateur a-t-il atteint son objectif sans abandonner ? C'est la métrique qui compte.",
        ],
      },
    ],
  },
  {
    id: "design-sprint",
    title: "Le design sprint",
    level: 3,
    intro:
      "La méthode de Jake Knapp (Google Ventures) : du problème au test en 5 jours.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Lundi : cadrer",
            detail:
              "Définir le problème, la cible et les questions à tester. Cartographier le parcours concerné.",
          },
          {
            title: "Mardi : diverger",
            detail:
              "Chaque participant esquisse des solutions individuellement (crazy 8, solution sketch). Pas de discussion pendant la production.",
          },
          {
            title: "Mercredi : décider",
            detail:
              "Vote, arbitrage du décideur : une direction est choisie. Storyboard détaillé du prototype.",
          },
          {
            title: "Jeudi : prototyper",
            detail:
              "Construction du prototype testable en une journée : réaliste en surface, simplifié en profondeur.",
          },
          {
            title: "Vendredi : tester",
            detail:
              "5 tests utilisateurs, synthèse dans la foulée, décision : itérer, pivoter ou abandonner.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le sprint ne convient pas à tout : il excelle sur les problèmes bien cadrés avec une équipe disponible à plein temps. Pour l'exploration continue, préférez des cycles hebdomadaires plus légers.",
      },
    ],
  },
  {
    id: "tests-moderes-non-moderes",
    title: "Tests modérés vs non modérés",
    level: 3,
    intro:
      "Deux formats complémentaires : quand utiliser chacun.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Modéré", "Non modéré"],
        rows: [
          [
            "Déroulé",
            "Facilitateur en direct (visio ou présentiel)",
            "L'utilisateur seul, via un lien (Maze, UserTesting)",
          ],
          [
            "Forces",
            "Questions de suivi, compréhension fine",
            "Rapide, scalable, peu coûteux",
          ],
          [
            "Limites",
            "Lent, coûteux, biais du facilitateur",
            "Pas de questions de suivi, contexte inconnu",
          ],
          [
            "Idéal pour",
            "Problèmes complexes, premières explorations",
            "Validation à grande échelle, tests A/B de parcours",
          ],
        ],
      },
      {
        kind: "text",
        text: "En pratique : commencez modéré pour comprendre (5 utilisateurs), puis non modéré pour valider à l'échelle (30-50 utilisateurs). Les deux formats se complètent, ils ne se remplacent pas.",
      },
    ],
  },
  {
    id: "recrutement-test",
    title: "Recruter des testeurs",
    level: 3,
    intro:
      "Trouver les bonnes personnes : la qualité du recrutement fait la qualité du test.",
    blocks: [
      {
        kind: "list",
        items: [
          "Définissez 3 à 5 critères de sélection : usage du produit, profil démographique, niveau technique. Ni trop stricts (impossible à recruter) ni trop larges (résultats bruités).",
          "Canaux : base clients, réseaux sociaux, panels (UserTesting, Maze), annonces ciblées. En B2B, passez par les commerciaux ou le support.",
          "Screener : un questionnaire court pour filtrer (5 questions max). Éliminez les professionnels des tests et les concurrents directs.",
          "Rémunération : prévoyez un dédommagement (carte cadeau, virement) proportionné au temps demandé. C'est la norme professionnelle.",
          "Sur-recrutez de 20 % : il y aura toujours des absents.",
        ],
      },
    ],
  },
  {
    id: "guide-session",
    title: "Écrire un guide de session",
    level: 3,
    intro:
      "Le script qui garantit des sessions comparables et exploitables.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Accueil (2 min)",
            detail:
              "Présentez-vous, expliquez le cadre : « nous testons le prototype, pas vous ». Demandez l'accord pour enregistrer.",
          },
          {
            title: "Contexte (3 min)",
            detail:
              "2-3 questions sur les habitudes de l'utilisateur : elles le mettent à l'aise et vous donnent du contexte d'interprétation.",
          },
          {
            title: "Tâches (15-20 min)",
            detail:
              "Énoncez chaque tâche comme un objectif réaliste, sans indiquer la marche à suivre. Une tâche à la fois, sans aide.",
          },
          {
            title: "Questions de fin (5 min)",
            detail:
              "Impression globale, ce qui a plu/déplu, ce qui manquerait. C'est ici que sortent les insights inattendus.",
          },
          {
            title: "Clôture",
            detail:
              "Remerciez, expliquez la suite, remettez le dédommagement. Un testeur bien traité reviendra.",
          },
        ],
      },
    ],
  },
  {
    id: "think-aloud",
    title: "Le think aloud",
    level: 3,
    intro:
      "La technique reine des tests d'utilisabilité : faire verbaliser la pensée.",
    blocks: [
      {
        kind: "list",
        items: [
          "Consigne : « dites tout ce qui vous passe par la tête pendant que vous faites la tâche ». Donnez un exemple au début.",
          "Relancez en douceur quand le silence dure : « que regardez-vous en ce moment ? », « à quoi vous attendez-vous ? ».",
          "Ne corrigez jamais : si l'utilisateur se trompe de bouton, c'est une donnée précieuse, pas une erreur à réparer.",
          "Limite : le think aloud ralentit l'utilisateur et ne convient pas pour mesurer des temps de complétion précis.",
        ],
      },
    ],
  },
  {
    id: "rainbow-sheet",
    title: "La rainbow sheet",
    level: 3,
    intro:
      "La méthode de synthèse visuelle issue des design sprints.",
    blocks: [
      {
        kind: "text",
        text: "Pendant chaque session, chaque observateur note ses constats sur des post-its de sa couleur. Après les sessions, on regroupe les post-its par thème sur un mur : les zones multicolores signalent les problèmes vus par tous — donc les plus robustes.",
      },
      {
        kind: "list",
        items: [
          "Une couleur par observateur, pas par thème : c'est la convergence des regards qui compte.",
          "Un constat par post-it, formulé comme un fait observé : « P3 a cherché le bouton pendant 40 s », pas « le bouton est mal placé ».",
          "Photographiez le mur final : c'est un livrable de synthèse lisible par toute l'équipe.",
        ],
      },
    ],
  },
  {
    id: "severite-problemes",
    title: "Évaluer la sévérité",
    level: 3,
    intro:
      "Tous les problèmes ne se valent pas : l'échelle de Nielsen pour prioriser.",
    blocks: [
      {
        kind: "fields",
        title: "Échelle de sévérité (Jakob Nielsen)",
        fields: [
          {
            label: "0 — Pas un problème",
            value:
              "Désaccord entre observateurs ou fausse alerte : on l'écarte explicitement pour ne pas y revenir.",
          },
          {
            label: "1 — Cosmétique",
            value:
              "À corriger si le temps le permet : alignement, formulation perfectible, détail visuel.",
          },
          {
            label: "2 — Mineur",
            value:
              "Gêne ponctuelle, contournement facile : à planifier dans un prochain cycle.",
          },
          {
            label: "3 — Majeur",
            value:
              "Bloque ou ralentit significativement : à corriger avant la prochaine release.",
          },
          {
            label: "4 — Catastrophique",
            value:
              "Empêche d'accomplir la tâche : correction immédiate, impératif avant toute mise en production.",
          },
        ],
      },
      {
        kind: "text",
        text: "Évaluez la sévérité en équipe après les tests, pas pendant : à chaud, tout paraît catastrophique. Croisez fréquence (combien d'utilisateurs touchés) et gravité (quel impact).",
      },
    ],
  },
  {
    id: "metriques-test",
    title: "Métriques de test",
    level: 3,
    intro:
      "Quantifier sans dénaturer : les mesures utiles en test d'utilisabilité.",
    blocks: [
      {
        kind: "fields",
        title: "Les métriques standard",
        fields: [
          {
            label: "Taux de réussite",
            value:
              "Part des utilisateurs qui accomplissent la tâche. Distinguez réussite directe et réussite avec aide : la différence est instructive.",
          },
          {
            label: "Temps de complétion",
            value:
              "Utile en comparatif (V1 vs V2), peu significatif en absolu — surtout avec le think aloud qui ralentit.",
          },
          {
            label: "SUS (System Usability Scale)",
            value:
              "Questionnaire standardisé de 10 questions, score sur 100. Permet de comparer des versions ou des produits entre eux.",
          },
          {
            label: "SEQ (Single Ease Question)",
            value:
              "Une question après chaque tâche : « cette tâche était facile » (échelle de 1 à 7). Simple et sensible aux différences.",
          },
        ],
      },
      {
        kind: "text",
        text: "Les métriques complètent l'observation, elles ne la remplacent pas : un taux de réussite de 100 % avec des hésitations partout signale quand même un problème.",
      },
    ],
  },
  {
    id: "tests-accessibilite",
    title: "Tester l'accessibilité du prototype",
    level: 3,
    intro:
      "L'accessibilité se teste dès le prototype, pas après le développement.",
    blocks: [
      {
        kind: "list",
        items: [
          "Navigation clavier : tabulez dans le prototype — l'ordre doit être logique et chaque élément interactif atteignable.",
          "Contrastes : vérifiez les textes sur fonds (4.5:1 minimum) dès la maquette, pas après l'intégration.",
          "Taille des cibles : 24×24 px minimum (WCAG 2.2 AA) pour les éléments tactiles.",
          "Reduced motion : prévoyez une version sans animation des transitions importantes.",
          "Testez avec de vrais utilisateurs en situation de handicap quand c'est possible : les checklists ne remplacent pas l'expérience vécue.",
        ],
      },
    ],
  },
  {
    id: "handoff-avance",
    title: "Handoff avancé",
    level: 3,
    intro:
      "Du prototype annoté à la spécification que les devs aiment recevoir.",
    blocks: [
      {
        kind: "list",
        items: [
          "Specs d'interaction : pour chaque transition, déclencheur, durée, easing, états de départ et d'arrivée.",
          "Cas limites documentés : que se passe-t-il si la liste est vide ? Si le réseau échoue ? Si le texte est très long ?",
          "Tokens plutôt que valeurs en dur : couleurs, espacements, typographies nommés — le prototype doit parler le langage du design system.",
          "Comportements responsive : comment le composant se comporte à chaque breakpoint, pas seulement au breakpoint dessiné.",
          "Rituel de revue : une session de walkthrough avec les devs avant le développement évite 80 % des allers-retours.",
        ],
      },
    ],
  },
  {
    id: "prototype-spec",
    title: "Le prototype comme spécification",
    level: 3,
    intro:
      "Quand le prototype devient la référence : avantages et garde-fous.",
    blocks: [
      {
        kind: "text",
        text: "Dans les équipes matures, le prototype haute-fidélité annoté remplace le cahier des charges : les développeurs implémentent ce qu'ils voient et manipulent. C'est plus précis qu'un document — à condition que le prototype soit à jour.",
      },
      {
        kind: "list",
        items: [
          "Versionnez le prototype de référence : « V3 validée le 12/03 » doit être identifiable d'un coup d'œil.",
          "Tout ce qui n'est pas dans le prototype n'existe pas : états d'erreur, textes longs, cas vides doivent y figurer.",
          "Gardez un canal de questions ouvert pendant le dev : le prototype ne répond pas à tout, l'échange si.",
        ],
      },
    ],
  },
  {
    id: "collaboration-dev",
    title: "Collaborer avec les développeurs",
    level: 3,
    intro:
      "Le prototype est un objet de collaboration, pas un ordre de mission.",
    blocks: [
      {
        kind: "list",
        items: [
          "Impliquez les devs tôt : une revue de faisabilité sur le prototype évite de designer l'impossible.",
          "Acceptez les adaptations techniques : si une animation coûte 3 jours de dev pour un gain marginal, simplifiez.",
          "Distinguez l'intention de l'implémentation : « l'utilisateur doit comprendre où il est » plutôt que « exactement cette animation ».",
          "Célébrez les écarts positifs : un dev qui améliore une interaction mérite d'être reconnu, pas rappelé à la maquette.",
        ],
      },
    ],
  },
  {
    id: "prototyper-etats",
    title: "Prototyper les états",
    level: 3,
    intro:
      "Vide, chargement, erreur, succès : les états font la robustesse d'un produit.",
    blocks: [
      {
        kind: "list",
        items: [
          "Pour chaque écran clé, dessinez au minimum : l'état vide (première utilisation), l'état de chargement et l'état d'erreur principal.",
          "L'état vide est une opportunité : expliquez, guidez vers la première action, ne laissez jamais un écran désespérément vide.",
          "Les erreurs doivent être actionnables : dire ce qui s'est passé, pourquoi, et que faire ensuite — jamais un code d'erreur brut.",
          "Testez les états : demandez à l'utilisateur « que feriez-vous si vous voyiez cet écran ? ».",
        ],
      },
    ],
  },
  {
    id: "limites-prototype",
    title: "Les limites du prototype",
    level: 3,
    intro:
      "Ce qu'un prototype ne prouve pas — pour ne pas surinterpréter les tests.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un test en labo ne reproduit pas le contexte réel : interruptions, stress, petit écran en plein soleil.",
          "Les testeurs sont polis : ils critiquent moins qu'en usage réel. Les problèmes observés sont un minimum, pas un maximum.",
          "Un prototype ne teste pas la performance, la fiabilité ni la scalabilité : 5 utilisateurs simultanés ne font pas 50 000.",
          "L'effet de nouveauté gonfle les résultats : ce qui plaît au premier test peut lasser au bout d'une semaine d'usage.",
          "Un prototype valide des hypothèses d'usage, jamais un business model : « les utilisateurs comprennent » n'est pas « les utilisateurs paieront ».",
        ],
      },
    ],
  },
  {
    id: "cas-navigation",
    title: "Étude de cas : tester une navigation",
    level: 3,
    intro:
      "Un exemple complet de cycle prototype-test-itération.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Question",
            detail:
              "« Les utilisateurs trouvent-ils les tarifs en moins d'une minute avec la nouvelle navigation ? »",
          },
          {
            title: "Prototype",
            detail:
              "Maquette cliquable en une journée : 8 écrans, navigation principale fonctionnelle, le reste statique.",
          },
          {
            title: "Test",
            detail:
              "5 utilisateurs, une tâche : trouver les tarifs. 3 échecs sur 5, tous bloqués sur le libellé « Offres ».",
          },
          {
            title: "Itération",
            detail:
              "Libellé changé en « Tarifs », position remontée. V2 testée avec 3 nouveaux utilisateurs : 3 réussites.",
          },
          {
            title: "Décision",
            detail:
              "Navigation validée, implémentation lancée. Coût total : 3 jours, zéro ligne de code gaspillée.",
          },
        ],
      },
    ],
  },
  {
    id: "cas-onboarding",
    title: "Étude de cas : tester un onboarding",
    level: 3,
    intro:
      "Valider un parcours d'inscription avant de le développer.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Question",
            detail:
              "« Les nouveaux utilisateurs comprennent-ils la valeur du produit pendant l'inscription ? »",
          },
          {
            title: "Prototype",
            detail:
              "Deux versions cliquables : onboarding en 5 écrans vs inscription directe + découverte progressive.",
          },
          {
            title: "Test",
            detail:
              "Test comparatif, 5 utilisateurs par version. La version courte gagne sur la compréhension et le temps.",
          },
          {
            title: "Itération",
            detail:
              "Version courte enrichie d'un écran de valeur. Second test : compréhension en hausse, abandon stable.",
          },
          {
            title: "Décision",
            detail:
              "Version courte adoptée. L'équipe a économisé 2 semaines de développement d'écrans inutiles.",
          },
        ],
      },
    ],
  },
  {
    id: "projets",
    title: "Projets pour progresser",
    level: 3,
    intro:
      "Des exercices concrets pour ancrer chaque niveau.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "15 minutes : prototype papier",
            detail:
              "Croquez le parcours de commande d'une app de livraison en 5 écrans. Testez avec un proche. Notez 3 problèmes.",
          },
          {
            title: "2 heures : Figma cliquable",
            detail:
              "Reproduisez un tunnel d'inscription existant en 6 écrans reliés. Faites-le tester à 2 personnes sans les aider.",
          },
          {
            title: "1 journée : cycle complet",
            detail:
              "Question → prototype → 5 tests → synthèse → V2. Documentez les versions et les raisons des changements.",
          },
          {
            title: "1 semaine : design sprint",
            detail:
              "En équipe ou seul en format compressé : 5 jours du problème au test. Présentez la synthèse comme un livrable.",
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
            "Tester pour confirmer",
            "On cherche des validations, pas des problèmes",
            "Formuler la question de façon falsifiable",
          ],
          [
            "Itérer sans re-tester",
            "La V2 peut introduire de nouveaux problèmes",
            "Re-tester chaque itération, même avec 3 utilisateurs",
          ],
          [
            "Prototype trop complet",
            "Tout tester prend des semaines, on ne teste plus",
            "Un prototype = une question = un parcours",
          ],
          [
            "Ignorer les cas limites",
            "Le produit réel vit dans les edge cases",
            "Prototyper vide, erreur, chargement dès la V1",
          ],
          [
            "Confondre test et démo",
            "Présenter le prototype biaise tous les retours",
            "Ne jamais expliquer avant que l'utilisateur agisse",
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
      "Les références pour aller plus loin dans l'art du prototype et du test.",
    blocks: [
      {
        kind: "fields",
        title: "À consulter",
        fields: [
          {
            label: "Sprint — Jake Knapp (thesprintbook.com)",
            value:
              "La méthode complète du design sprint en 5 jours : le livre de référence sur le prototypage rapide.",
          },
          {
            label: "NN/g — Testing (nngroup.com)",
            value:
              "Les guides du Nielsen Norman Group sur les tests d'utilisabilité : protocoles, nombre d'utilisateurs, analyse.",
          },
          {
            label: "Maze (maze.co)",
            value:
              "Plateforme de tests non modérés sur prototypes Figma : pour pratiquer à grande échelle.",
          },
          {
            label: "Don't Make Me Think — Steve Krug",
            value:
              "Le classique sur les tests d'utilisabilité : court, concret, à relire avant chaque session de test.",
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
      "Le prototypage ouvre vers la recherche, le motion et les systèmes.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir la recherche (`ux-research`) : des tests rigoureux reposent sur de bonnes méthodes d'observation et d'analyse.",
          "Explorer le motion (`motion-design`) : les prototypes animés sont le terrain d'entraînement idéal.",
          "Construire des systèmes (`design-system`) : prototyper avec des composants réutilisables accélère chaque itération.",
          "Montrer son travail (`portfolio`) : un cycle prototype-test-itération documenté fait une excellente case study.",
        ],
      },
    ],
  },
];

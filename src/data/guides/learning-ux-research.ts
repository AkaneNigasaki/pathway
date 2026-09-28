import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de l'UX Research : méthodes, recrutement, analyse,
 * biais et synthèse d'insights. 3 niveaux (Aperçu / Pratique / Approfondi).
 */
export const LEARNING_UX_RESEARCH: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Ce qu'est l'UX research : transformer les opinions en preuves.",
    blocks: [
      {
        kind: "text",
        text: "L'UX research étudie les utilisateurs réels — leurs besoins, comportements et frustrations — via des méthodes d'observation et d'interrogation rigoureuses. Son but : fonder les décisions produit sur des preuves plutôt que sur les opinions du designer, du manager ou du client.",
      },
      {
        kind: "text",
        text: "Sans recherche, on designe pour soi-même : on projette ses propres usages sur des utilisateurs qui ne nous ressemblent pas. Avec la recherche, les débats d'équipe se tranchent par des faits (« 4 utilisateurs sur 5 ont échoué ») au lieu de s'enliser en goûts personnels.",
      },
      {
        kind: "list",
        items: [
          "La recherche répond à des questions, elle ne « valide » pas des solutions déjà décidées.",
          "Deux grandes familles : le qualitatif (comprendre : entretiens, observations) et le quantitatif (mesurer : surveys, analytics).",
          "La recherche n'a pas besoin d'être lourde : 5 entretiens bien menés valent mieux qu'aucune donnée.",
        ],
      },
    ],
  },
  {
    id: "methodes-30s",
    title: "Les méthodes en 30 secondes",
    level: 1,
    intro:
      "Le paysage des méthodes : quand utiliser quoi.",
    blocks: [
      {
        kind: "diagram",
        title: "Choisir sa méthode",
        lines: [
          "VOUS VOULEZ COMPRENDRE (pourquoi ? comment ?)",
          "  → Entretiens utilisateurs (paroles, motivations)",
          "  → Tests d'utilisabilité (comportements observés)",
          "  → Études terrain (contexte réel d'usage)",
          "",
          "VOUS VOULEZ MESURER (combien ? lesquels ?)",
          "  → Surveys (avis à grande échelle)",
          "  → Analytics (comportements à grande échelle)",
          "  → Tests A/B (comparer deux versions)",
          "",
          "VOUS VOULEZ ORGANISER (l'architecture de l'information)",
          "  → Card sorting (modèles mentaux des utilisateurs)",
          "  → Tree testing (la navigation tient-elle ?)",
        ],
      },
      {
        kind: "text",
        text: "Règle de base : le qualitatif explore et explique, le quantitatif mesure et valide. On commence presque toujours par du qualitatif (comprendre le problème), puis on mesure (quantifier son ampleur).",
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
      "Le matériel et les réflexes pour mener une première étude.",
    blocks: [
      {
        kind: "fields",
        title: "Le kit du chercheur",
        fields: [
          {
            label: "Enregistrement",
            value:
              "Enregistreur vocal ou visio (avec accord explicite) : la mémoire est faillible, l'enregistrement ne l'est pas.",
          },
          {
            label: "Guide d'entretien",
            value:
              "Vos questions écrites à l'avance, dans l'ordre, avec des relances prévues. Jamais d'improvisation totale.",
          },
          {
            label: "Grille de notes",
            value:
              "Un tableau par session : observations factuelles d'un côté, interprétations de l'autre. Ne mélangez jamais les deux.",
          },
          {
            label: "Consentement",
            value:
              "Formulaire simple : ce qui est enregistré, dans quel but, qui y aura accès, droit de retrait. À faire signer (ou accepter oralement) avant de commencer.",
          },
        ],
      },
    ],
  },
  {
    id: "choisir-methode",
    title: "Choisir sa méthode",
    level: 2,
    intro:
      "Le tableau de décision : question → méthode.",
    blocks: [
      {
        kind: "table",
        headers: ["Question", "Méthode", "Effort"],
        rows: [
          ["Pourquoi les utilisateurs abandonnent-ils ?", "Entretiens + tests d'utilisabilité", "1-2 semaines"],
          ["Que pensent-ils de cette fonctionnalité ?", "Entretiens ou survey", "Quelques jours"],
          ["Le parcours est-il compréhensible ?", "Test d'utilisabilité (5 utilisateurs)", "1 semaine"],
          ["Combien sont concernés ?", "Survey ou analytics", "1-2 semaines"],
          ["Comment nommer ces rubriques ?", "Card sorting", "Quelques jours"],
          ["La navigation permet-elle de trouver X ?", "Tree testing", "Quelques jours"],
        ],
      },
      {
        kind: "text",
        text: "En cas de doute, commencez par 5 entretiens ou 5 tests d'utilisabilité : c'est le format le plus rentable pour débloquer une situation.",
      },
    ],
  },
  {
    id: "formuler-question",
    title: "Formuler la question de recherche",
    level: 2,
    intro:
      "Une étude sans question précise produit des données inutilisables.",
    blocks: [
      {
        kind: "list",
        items: [
          "Une bonne question est spécifique : « pourquoi les nouveaux utilisateurs n'activent-ils pas les notifications ? » plutôt que « que pensent les utilisateurs ? ».",
          "Elle est neutre : elle ne présuppose pas la réponse (« pourquoi notre onboarding est-il mauvais ? » est un verdict, pas une question).",
          "Elle est actionnable : la réponse doit pouvoir influencer une décision (« faut-il simplifier l'étape 2 ? »).",
          "Écrivez-la avant de choisir la méthode : la question détermine la méthode, jamais l'inverse.",
          "Limitez-vous à 1-3 questions par étude : au-delà, vous ne creusez rien.",
        ],
      },
    ],
  },
  {
    id: "plan-recherche-mini",
    title: "Écrire un plan de recherche",
    level: 2,
    intro:
      "Le document d'une page qui cadre l'étude avant de commencer.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Contexte et question",
            detail:
              "Pourquoi cette étude maintenant ? Quelle décision doit-elle éclairer ? Écrivez les 1-3 questions de recherche.",
          },
          {
            title: "Méthode et échantillon",
            detail:
              "Quelle méthode, pourquoi celle-là, combien de participants, quels critères de sélection.",
          },
          {
            title: "Déroulé",
            detail:
              "Calendrier : recrutement, sessions, analyse, restitution. Qui fait quoi.",
          },
          {
            title: "Livrables",
            detail:
              "Ce que l'équipe recevra : synthèse d'insights, enregistrements, recommandations priorisées. Et quand.",
          },
        ],
      },
      {
        kind: "text",
        text: "Faites valider le plan par les parties prenantes avant de recruter : un plan validé évite les « ce n'est pas ce qu'on voulait savoir » après coup.",
      },
    ],
  },
  {
    id: "entretiens-bases",
    title: "Mener des entretiens",
    level: 2,
    intro:
      "Le protocole d'un bon entretien utilisateur, étape par étape.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Accueil et cadre (5 min)",
            detail:
              "Présentez-vous, expliquez le but (« comprendre vos habitudes, il n'y a pas de bonne réponse »), demandez l'accord pour enregistrer.",
          },
          {
            title: "Contexte (10 min)",
            detail:
              "Questions larges sur les habitudes : « racontez-moi comment vous faites pour… ». Laissez parler, prenez des notes factuelles.",
          },
          {
            title: "Creusement (20-25 min)",
            detail:
              "Suivez les fils intéressants avec des « pourquoi », « racontez-moi la dernière fois que… », « qu'avez-vous fait ensuite ? ».",
          },
          {
            title: "Clôture (5 min)",
            detail:
              "« Y a-t-il quelque chose que je n'ai pas abordé et qui vous semble important ? » Les insights inattendus sortent souvent ici.",
          },
          {
            title: "Débrief immédiat",
            detail:
              "Juste après : notez vos 3 constats marquants à chaud. La mémoire des nuances s'efface en quelques heures.",
          },
        ],
      },
    ],
  },
  {
    id: "guide-entretien",
    title: "Écrire un guide d'entretien",
    level: 2,
    intro:
      "Des questions qui font parler : les règles d'écriture.",
    blocks: [
      {
        kind: "list",
        items: [
          "Questions ouvertes : « racontez-moi… », « décrivez… », « comment faites-vous pour… ». Bannissez les questions fermées (« aimez-vous… ? »).",
          "Parlez du passé, pas du futur : « la dernière fois que vous avez fait X, que s'est-il passé ? » plutôt que « feriez-vous X ? » (les gens prédisent mal leur comportement).",
          "Ne suggérez pas la réponse : « que pensez-vous de cette fonctionnalité ? » plutôt que « vous trouvez cette fonctionnalité utile, n'est-ce pas ? ».",
          "Une question = une idée : « que pensez-vous du prix et de la facilité d'utilisation ? » force un choix arbitraire.",
          "Prévoyez des relances : « pourquoi ? », « pouvez-vous me donner un exemple ? », « et ensuite ? ».",
          "Testez le guide sur un collègue avant : les questions ambiguës se révèlent à l'usage.",
        ],
      },
    ],
  },
  {
    id: "recrutement-bases",
    title: "Recruter des participants",
    level: 2,
    intro:
      "Trouver 5 bonnes personnes : les bases du recrutement.",
    blocks: [
      {
        kind: "list",
        items: [
          "Définissez 3-5 critères : qui utilise (ou utiliserait) le produit, dans quel contexte. Ni trop stricts ni trop vagues.",
          "Canaux : base d'utilisateurs, réseaux sociaux, entourage ciblé, panels. En B2B : via les commerciaux ou le support client.",
          "Screener : 5 questions max pour filtrer. Éliminez les professionnels des études et les concurrents directs.",
          "Dédommagez : carte cadeau ou virement proportionné au temps (30-60 min). C'est la norme, pas une option.",
          "Sur-recrutez de 20 % : il y aura des absents.",
          "Diversifiez : si vos 5 participants se ressemblent, vos insights seront biaisés.",
        ],
      },
    ],
  },
  {
    id: "tests-utilisabilite",
    title: "Tests d'utilisabilité",
    level: 2,
    intro:
      "Observer des utilisateurs réels sur votre produit ou prototype.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définissez 2-3 tâches",
            detail:
              "Des objectifs réalistes formulés sans indiquer la marche à suivre : « réservez une table pour 2 demain soir ».",
          },
          {
            title: "Testez un par un",
            detail:
              "5 utilisateurs, 30 minutes chacun. Demandez de penser à voix haute (« dites ce qui vous passe par la tête »).",
          },
          {
            title: "Observez sans aider",
            detail:
              "Ne guidez jamais : un utilisateur qui ne trouve pas seul révèle un problème. Notez succès, échecs, hésitations.",
          },
          {
            title: "Notez par tâche",
            detail:
              "Pour chaque tâche : réussite directe, réussite avec difficulté, échec. Plus les citations marquantes.",
          },
          {
            title: "Synthétisez",
            detail:
              "Regroupez les problèmes par fréquence et gravité. 3+ utilisateurs touchés = prioritaire.",
          },
        ],
      },
    ],
  },
  {
    id: "surveys-bases",
    title: "Surveys : les bases",
    level: 2,
    intro:
      "Des questionnaires qui mesurent au lieu de biaiser.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un survey valide à grande échelle ce que le qualitatif a révélé : jamais l'inverse. Ne commencez pas par un survey pour explorer.",
          "Court : 5-10 questions max. Au-delà, le taux d'abandon explose et les réponses se dégradent.",
          "Questions neutres et précises : « à quelle fréquence utilisez-vous X ? » plutôt que « trouvez-vous X génial ? ».",
          "Échelles cohérentes : Likert en 5 ou 7 points, même sens partout (1 = pas du tout, 5 = tout à fait).",
          "Toujours une ou deux questions ouvertes : elles expliquent les chiffres.",
          "Testez le questionnaire sur 3 personnes avant diffusion : les ambiguïtés se voient à l'usage.",
        ],
      },
    ],
  },
  {
    id: "card-sorting-bases",
    title: "Card sorting : les bases",
    level: 2,
    intro:
      "Faire classer le contenu par les utilisateurs pour révéler leur modèle mental.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Préparez 30-50 cartes",
            detail:
              "Une carte par contenu ou fonctionnalité, libellée comme dans le produit actuel (ou envisagé).",
          },
          {
            title: "Choisissez ouvert ou fermé",
            detail:
              "Ouvert : l'utilisateur crée ses catégories (pour explorer). Fermé : catégories imposées (pour valider une arborescence).",
          },
          {
            title: "Faites trier 15-20 utilisateurs",
            detail:
              "En ligne (OptimalSort, Maze) ou en présentiel avec des cartes papier. 15 participants suffisent pour des tendances stables.",
          },
          {
            title: "Analysez les regroupements",
            detail:
              "Matrice de similarité : les cartes souvent regroupées appartiennent à la même rubrique. Les cartes « voyageuses » signalent des libellés ambigus.",
          },
        ],
      },
    ],
  },
  {
    id: "analyser-donnees",
    title: "Analyser les données",
    level: 2,
    intro:
      "Des notes brutes aux insights : le processus d'analyse.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Rassemblez",
            detail:
              "Toutes les notes, transcriptions et enregistrements au même endroit. Rien ne s'analyse de mémoire.",
          },
          {
            title: "Codez",
            detail:
              "Surlignez les passages significatifs et nommez-les (« confusion sur le vocabulaire », « contournement manuel »). Un code = une idée.",
          },
          {
            title: "Regroupez",
            detail:
              "Affinity mapping : regroupez les codes similaires en thèmes. Les thèmes qui reviennent chez plusieurs participants sont robustes.",
          },
          {
            title: "Formulez des insights",
            detail:
              "Un insight = constat + signification : « les utilisateurs confondent les deux boutons (constat), car les libellés utilisent le même verbe (interprétation) ».",
          },
          {
            title: "Recommandez",
            detail:
              "Chaque insight débouche sur une recommandation actionnable et priorisée. Une étude sans recommandation est un rapport mort.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 2,
    intro:
      "Les fautes qui invalident une étude — et comment les éviter.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Pourquoi c'est un problème", "Correction"],
        rows: [
          [
            "Questions orientées",
            "Les réponses confirment ce qu'on voulait entendre",
            "Questions ouvertes et neutres, testées à l'avance",
          ],
          [
            "Échantillon biaisé",
            "On interroge ceux qui nous ressemblent",
            "Critères de recrutement explicites et diversifiés",
          ],
          [
            "Confondre avis et comportement",
            "Les gens prédisent mal ce qu'ils feront",
            "Observer le passé et le comportement réel",
          ],
          [
            "Trop de questions",
            "On survole tout, on ne creuse rien",
            "1-3 questions de recherche par étude",
          ],
          [
            "Analyser seul de mémoire",
            "Biais de confirmation maximal",
            "Enregistrer, coder, analyser à deux si possible",
          ],
          [
            "Pas de restitution",
            "L'étude meurt dans un document",
            "Synthèse courte + présentation à l'équipe",
          ],
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "qualitatif-vs-quantitatif",
    title: "Qualitatif vs quantitatif",
    level: 3,
    intro:
      "Deux logiques complémentaires : les articuler au lieu de les opposer.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Qualitatif", "Quantitatif"],
        rows: [
          ["Question", "Pourquoi ? Comment ?", "Combien ? Lesquels ?"],
          ["Données", "Paroles, observations", "Chiffres, comportements tracés"],
          ["Échantillon", "Petit (5-15), ciblé", "Grand (100+), représentatif"],
          ["Force", "Comprendre les mécanismes", "Mesurer l'ampleur"],
          ["Limite", "Non généralisable seul", "N'explique pas les causes"],
        ],
      },
      {
        kind: "text",
        text: "Le cycle vertueux : le qualitatif révèle un problème et ses causes → le quantitatif mesure son ampleur → on priorise → on corrige → on mesure l'effet. Sauter le qualitatif, c'est optimiser à l'aveugle ; sauter le quantitatif, c'est décider sur des anecdotes.",
      },
    ],
  },
  {
    id: "attitudinal-vs-comportemental",
    title: "Attitudinal vs comportemental",
    level: 3,
    intro:
      "Ce que les gens disent n'est pas ce qu'ils font : les deux axes de la recherche.",
    blocks: [
      {
        kind: "text",
        text: "Le cadre de référence (Nielsen Norman Group) croise deux axes : attitudinal (ce que les gens disent) vs comportemental (ce qu'ils font), et qualitatif vs quantitatif. Chaque quadrant a ses méthodes : entretiens (attitudinal/qualitatif), surveys (attitudinal/quantitatif), tests d'utilisabilité (comportemental/qualitatif), analytics (comportemental/quantitatif).",
      },
      {
        kind: "list",
        items: [
          "Ce que les gens disent est utile pour comprendre motivations et vocabulaire — pas pour prédire leurs actes.",
          "Ce que les gens font est la vérité du produit : observez les comportements réels dès que possible.",
          "L'écart entre les deux est lui-même une donnée : « ils disent vouloir X mais font Y » révèle un besoin non formulé.",
        ],
      },
    ],
  },
  {
    id: "catalogue-methodes",
    title: "Catalogue des méthodes",
    level: 3,
    intro:
      "Le panorama complet : quand utiliser chaque méthode.",
    blocks: [
      {
        kind: "table",
        headers: ["Méthode", "Ce qu'elle révèle", "Quand l'utiliser"],
        rows: [
          ["Entretiens", "Motivations, contexte, vocabulaire", "Explorer un problème, comprendre des usages"],
          ["Tests d'utilisabilité", "Frictions réelles d'usage", "Valider un parcours ou un prototype"],
          ["Études terrain", "Contexte réel, contraintes", "Produits utilisés en mobilité ou en équipe"],
          ["Diary studies", "Usages dans la durée", "Habitudes, évolution sur plusieurs semaines"],
          ["Surveys", "Opinions à grande échelle", "Quantifier, prioriser, segmenter"],
          ["Card sorting", "Modèles mentaux de classement", "Concevoir une arborescence"],
          ["Tree testing", "Trouvabilité dans l'arborescence", "Valider une navigation sans le visuel"],
          ["Tests A/B", "Version la plus performante", "Arbitrer entre deux designs sur une métrique"],
          ["Analytics", "Comportements à l'échelle", "Détecter où ça coince (entonnoirs, abandons)"],
        ],
      },
    ],
  },
  {
    id: "entretiens-avances",
    title: "Entretiens avancés",
    level: 3,
    intro:
      "Au-delà des bases : les techniques qui font parler en profondeur.",
    blocks: [
      {
        kind: "fields",
        title: "Techniques",
        fields: [
          {
            label: "Les 5 pourquoi",
            value:
              "Creuser chaque réponse (« pourquoi ? » répété) jusqu'à la cause racine. S'arrêter quand on atteint une motivation ou une contrainte structurelle.",
          },
          {
            label: "Incidents critiques",
            value:
              "« Racontez-moi la dernière fois où ça s'est vraiment mal passé » : les extrêmes révèlent plus que la routine.",
          },
          {
            label: "Tri par cartes (en entretien)",
            value:
              "Faire classer des fonctionnalités par importance pendant l'entretien : matérialise les priorités mieux que les paroles.",
          },
          {
            label: "Visite guidée",
            value:
              "« Montrez-moi comment vous faites » sur l'outil réel de l'utilisateur : l'observation révèle ce que l'entretien seul manque.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "80/20 : l'utilisateur parle 80 % du temps. Si vous parlez plus, vous interviewez mal.",
          "Silences : comptez 5 secondes avant de relancer. Les meilleures réponses viennent après un silence.",
          "Ne corrigez jamais une erreur d'usage pendant l'entretien : notez-la, c'est une donnée.",
        ],
      },
    ],
  },
  {
    id: "five-whys",
    title: "La règle du Mom Test",
    level: 3,
    intro:
      "Les trois règles de Rob Fitzpatrick pour des entretiens qui ne mentent pas.",
    blocks: [
      {
        kind: "text",
        text: "Dans « The Mom Test », Rob Fitzpatrick part d'un constat : les gens vous mentent par politesse (même votre mère). Trois règles pour obtenir la vérité : parlez de leur vie, pas de votre idée ; demandez des faits passés précis, pas des opinions futures ; écoutez plus que vous ne parlez.",
      },
      {
        kind: "fields",
        title: "Questions qui marchent",
        fields: [
          {
            label: "Bonnes questions",
            value:
              "« Quelle est la partie la plus pénible de… ? », « Racontez-moi la dernière fois que c'est arrivé », « Qu'avez-vous essayé pour résoudre ça ? », « Combien ça vous coûte aujourd'hui ? ».",
          },
          {
            label: "Mauvaises questions",
            value:
              "« Trouvez-vous l'idée bonne ? », « Achèteriez-vous un produit qui… ? », « Combien paieriez-vous ? » : elles produisent des compliments, pas des faits.",
          },
          {
            label: "Signaux à ignorer",
            value:
              "Les compliments (« c'est génial ! »), les promesses futures (« je l'achèterais »), les idées de fonctionnalités : du bruit, pas des preuves.",
          },
        ],
      },
    ],
  },
  {
    id: "tests-moderes",
    title: "Tests modérés avancés",
    level: 3,
    intro:
      "Tirer le maximum des sessions en direct.",
    blocks: [
      {
        kind: "list",
        items: [
          "Think aloud : faites verbaliser en continu (« dites tout ce qui vous passe par la tête »). Relancez par « que regardez-vous ? » en cas de silence.",
          "Tâches de plus en plus difficiles : commencez facile pour mettre en confiance, finissez par les cas limites.",
          "Questions de suivi ciblées : après chaque tâche, « c'était facile ou difficile ? Pourquoi ? » (SEQ informel).",
          "Observateurs silencieux : l'équipe regarde en retrait (ou en visio), note sur des post-its, ne pose ses questions qu'à la fin.",
          "Débrief à chaud après chaque session : 10 minutes pour noter les constats avant qu'ils ne s'estompent.",
        ],
      },
    ],
  },
  {
    id: "tests-non-moderes",
    title: "Tests non modérés",
    level: 3,
    intro:
      "Tester à grande échelle sans facilitateur : méthodes et limites.",
    blocks: [
      {
        kind: "list",
        items: [
          "Outils : Maze, UserTesting, Lyssna pour des tests sur prototype ou produit avec tâches guidées et enregistrement d'écran.",
          "Idéal pour : valider un parcours à 30-50 utilisateurs, comparer deux versions, tester dans plusieurs pays.",
          "Limites : pas de questions de suivi, contexte inconnu, participants parfois peu appliqués. Les résultats aberrants se repèrent aux temps anormalement courts.",
          "Rédigez des tâches ultra-claires : sans facilitateur, toute ambiguïté fausse les résultats.",
          "Combinez : non modéré pour la quantité, modéré pour comprendre les « pourquoi » derrière les chiffres.",
        ],
      },
    ],
  },
  {
    id: "recrutement-avance",
    title: "Recrutement avancé",
    level: 3,
    intro:
      "Au-delà des bases : panels, incitations, cas difficiles.",
    blocks: [
      {
        kind: "list",
        items: [
          "Panels professionnels (UserTesting, TestingTime) : rapides mais coûteux ; vérifiez la qualité via un screener exigeant.",
          "Recrutement B2B : passez par les CSM ou commerciaux, visez des utilisateurs récents. Les dirigeants sont durs à recruter : soignez l'incitation et la flexibilité horaire.",
          "Incitations : proportionnées au profil (un cadre dirigeant ne se déplace pas pour 20 €). Cartes cadeaux, virements, dons associatifs.",
          "Évitez les « professionnels des tests » : repérez-les au screener (trop de participations, réponses trop lisses).",
          "Constituez un vivier : avec l'accord des participants, gardez une liste de volontaires pour les études suivantes.",
        ],
      },
    ],
  },
  {
    id: "screener",
    title: "Écrire un screener",
    level: 3,
    intro:
      "Le questionnaire de filtrage : 5 questions qui font la qualité de l'échantillon.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Critères d'inclusion",
            detail:
              "2-3 questions factuelles : usage du produit, fréquence, contexte. Ex. « utilisez-vous une app de budget ? Laquelle ? À quelle fréquence ? ».",
          },
          {
            title: "Critères d'exclusion",
            detail:
              "Professionnels du design/research, concurrents directs, participants à une étude récente. Une question piège bien placée les repère.",
          },
          {
            title: "Diversité",
            detail:
              "1-2 questions pour varier l'échantillon : âge, niveau technique, ancienneté d'usage. Visez un mix, pas une moyenne.",
          },
          {
            title: "Logistique",
            detail:
              "Disponibilités, matériel (webcam, téléphone), accord pour l'enregistrement. Réglez ça avant, pas le jour J.",
          },
        ],
      },
    ],
  },
  {
    id: "consentement-ethique",
    title: "Consentement et éthique",
    level: 3,
    intro:
      "La recherche implique des humains : les règles non négociables.",
    blocks: [
      {
        kind: "list",
        items: [
          "Consentement éclairé : but de l'étude, ce qui est enregistré, qui y aura accès, durée de conservation, droit de retrait à tout moment.",
          "Anonymisation : pseudonymisez les transcriptions, floutez les visages si diffusion, ne citez jamais de données identifiantes.",
          "Populations vulnérables (enfants, personnes malades) : encadrement renforcé, accord parental, parfois comité d'éthique.",
          "Ne pas nuire : une question peut raviver un traumatisme (santé, finances). Prévenez les sujets sensibles, laissez la porte de sortie ouverte.",
          "Données : stockez les enregistrements en lieu sûr, limitez l'accès, supprimez après la durée annoncée (RGPD).",
        ],
      },
    ],
  },
  {
    id: "think-aloud",
    title: "Think aloud : le mode d'emploi",
    level: 3,
    intro:
      "La technique d'observation la plus rentable, bien exécutée.",
    blocks: [
      {
        kind: "list",
        items: [
          "Consigne initiale : « pendant la tâche, dites à voix haute tout ce qui vous passe par la tête : ce que vous regardez, ce que vous cherchez, ce que vous pensez ».",
          "Démonstration : faites un exemple vous-même sur un écran neutre pour montrer le niveau de détail attendu.",
          "Relances neutres : « hum hum », « que pensez-vous en ce moment ? ». Jamais « pourquoi avez-vous cliqué là ? » (accusateur).",
          "Limites : le think aloud ralentit et ne convient pas aux mesures de temps précises. Pour du quantitatif pur, faites faire la tâche en silence puis débriefez.",
        ],
      },
    ],
  },
  {
    id: "analyse-thematique",
    title: "Analyse thématique",
    level: 3,
    intro:
      "La méthode rigoureuse pour analyser des données qualitatives.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Familiarisation",
            detail:
              "Relisez/lisez tout le corpus une fois sans coder : notes, transcriptions. Imprégnez-vous.",
          },
          {
            title: "Codage initial",
            detail:
              "Étiquetez chaque passage significatif avec un code descriptif. Un passage peut avoir plusieurs codes.",
          },
          {
            title: "Regroupement en thèmes",
            detail:
              "Assemblez les codes en thèmes plus larges : un thème capture une idée récurrente et significative.",
          },
          {
            title: "Révision",
            detail:
              "Vérifiez que chaque thème est soutenu par plusieurs participants et distinct des autres. Fusionnez, scindez, renommez.",
          },
          {
            title: "Définition et rapport",
            detail:
              "Nommez chaque thème clairement, illustrez par 2-3 citations, reliez aux questions de recherche.",
          },
        ],
      },
    ],
  },
  {
    id: "affinity-mapping",
    title: "Affinity mapping",
    level: 3,
    intro:
      "La synthèse collaborative sur mur : faire émerger les thèmes en équipe.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Un fait par note",
            detail:
              "Chaque observation sur un post-it : fait observé + participant (« P3 n'a pas trouvé le bouton tarifs »). Pas d'interprétation à ce stade.",
          },
          {
            title: "Regroupement silencieux",
            detail:
              "En équipe, regroupez les notes similaires sans parler d'abord : le silence évite que les voix fortes imposent leurs catégories.",
          },
          {
            title: "Nommage des groupes",
            detail:
              "Nommez chaque groupe par son insight (« le vocabulaire métier bloque la navigation »), pas par son sujet (« navigation »).",
          },
          {
            title: "Hiérarchisation",
            detail:
              "Votez (points à répartir) sur les groupes les plus importants pour la décision à prendre.",
          },
        ],
      },
      {
        kind: "text",
        text: "L'affinity mapping a un double bénéfice : une synthèse robuste et une équipe alignée, car chacun a manipulé les données brutes.",
      },
    ],
  },
  {
    id: "journey-mapping",
    title: "Journey mapping",
    level: 3,
    intro:
      "Cartographier l'expérience dans le temps : la méthode.",
    blocks: [
      {
        kind: "list",
        items: [
          "Structure : phases (découverte, inscription, usage…), actions de l'utilisateur, pensées/émotions, points de contact, opportunités.",
          "Basée sur la recherche : chaque case s'appuie sur des données réelles, pas sur l'imagination. Une journey map inventée est un storyboard, pas une recherche.",
          "Courbe émotionnelle : visualisez les hauts et bas — les creux sont les priorités d'amélioration.",
          "Atelier de construction : l'équipe assemble la carte à partir des insights, puis la valide ou l'ajuste avec de nouvelles données.",
          "Usage : aligner les équipes sur le vécu utilisateur, prioriser les chantiers, suivre l'évolution dans le temps.",
        ],
      },
    ],
  },
  {
    id: "personas-jtbd",
    title: "Personas et JTBD",
    level: 3,
    intro:
      "Deux outils pour décider « pour qui on designe » — avec leurs limites.",
    blocks: [
      {
        kind: "fields",
        title: "Comparer",
        fields: [
          {
            label: "Personas",
            value:
              "Archétypes d'utilisateurs (nom, contexte, objectifs, frustrations) basés sur la recherche. Utiles pour l'empathie d'équipe, risqués quand ils deviennent des stéréotypes décoratifs.",
          },
          {
            label: "Jobs To Be Done",
            value:
              "« Quand [situation], je veux [motivation], pour [résultat] ». Centré sur la tâche à accomplir plutôt que sur le profil : plus actionnable pour prioriser.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Un persona sans données de recherche est une fiction : ne le créez qu'après des entretiens.",
          "Limitez à 3-4 personas principaux : au-delà, personne ne s'en souvient.",
          "Le JTBD excelle pour prioriser les fonctionnalités ; le persona excelle pour communiquer l'empathie. Les deux se complètent.",
        ],
      },
    ],
  },
  {
    id: "rainbow-sheet",
    title: "Rainbow sheet",
    level: 3,
    intro:
      "La synthèse visuelle des tests : qui a vu quoi.",
    blocks: [
      {
        kind: "text",
        text: "Chaque observateur note ses constats sur des post-its de sa couleur pendant les sessions. Ensuite, on regroupe par thème : les zones multicolores (vues par plusieurs observateurs) signalent les problèmes les plus robustes.",
      },
      {
        kind: "list",
        items: [
          "Un constat par post-it, formulé comme un fait : « P2 a abandonné à l'étape 3 », pas « l'étape 3 est nulle ».",
          "Photographiez le résultat : c'est un livrable de synthèse immédiatement lisible par les parties prenantes.",
          "Complétez par la sévérité (voir section suivante) pour prioriser.",
        ],
      },
    ],
  },
  {
    id: "severite-nielsen",
    title: "Sévérité des problèmes (Nielsen)",
    level: 3,
    intro:
      "Prioriser les constats : l'échelle de sévérité de Jakob Nielsen.",
    blocks: [
      {
        kind: "fields",
        title: "L'échelle",
        fields: [
          {
            label: "0 — Pas un problème",
            value: "Désaccord ou fausse alerte : écarté explicitement.",
          },
          {
            label: "1 — Cosmétique",
            value: "À corriger si le temps le permet.",
          },
          {
            label: "2 — Mineur",
            value: "Gêne ponctuelle, contournement facile.",
          },
          {
            label: "3 — Majeur",
            value: "Bloque ou ralentit significativement : à corriger en priorité.",
          },
          {
            label: "4 — Catastrophique",
            value: "Empêche la tâche : bloquant avant toute mise en production.",
          },
        ],
      },
      {
        kind: "text",
        text: "Évaluez en équipe après les tests, en croisant fréquence (combien d'utilisateurs) et impact. À chaud, tout paraît catastrophique : le recul affine le jugement.",
      },
    ],
  },
  {
    id: "rediger-insights",
    title: "Rédiger des insights",
    level: 3,
    intro:
      "Un insight n'est pas un constat : la formulation qui déclenche l'action.",
    blocks: [
      {
        kind: "list",
        items: [
          "Structure : observation + interprétation + implication. « Les utilisateurs zappent la bannière cookies sans la lire (observation) car elle apparaît avant qu'ils comprennent le site (interprétation) → la déplacer après la première action (implication). »",
          "Un insight par phrase, vérifiable : citez les participants concernés (« vu chez 4/5 participants »).",
          "Évitez les insights « eau tiède » (« les utilisateurs veulent que ce soit simple ») : un bon insight surprend ou précise.",
          "Reliez chaque insight à une décision produit : sans débouché actionnable, c'est de la curiosité, pas de la recherche.",
        ],
      },
    ],
  },
  {
    id: "prioriser",
    title: "Prioriser les recommandations",
    level: 3,
    intro:
      "Tout ne peut pas être corrigé : les cadres de priorisation.",
    blocks: [
      {
        kind: "fields",
        title: "Les cadres simples",
        fields: [
          {
            label: "Impact / Effort",
            value:
              "Matrice 2×2 : quick wins (fort impact, faible effort) d'abord, projets majeurs ensuite, remplissage si temps, à écarter le reste.",
          },
          {
            label: "Sévérité × Fréquence",
            value:
              "Le croisement issu des tests : les problèmes graves et fréquents passent devant.",
          },
          {
            label: "RICE",
            value:
              "Reach × Impact × Confidence / Effort : quantifie la priorisation quand les données le permettent (méthode d'Intercom).",
          },
        ],
      },
      {
        kind: "text",
        text: "Présentez toujours les recommandations par ordre de priorité avec l'effort estimé : une liste non priorisée est une liste ignorée.",
      },
    ],
  },
  {
    id: "biais-catalogue",
    title: "Catalogue des biais",
    level: 3,
    intro:
      "Les biais qui faussent la recherche — et leurs parades.",
    blocks: [
      {
        kind: "table",
        headers: ["Biais", "Manifestation", "Parade"],
        rows: [
          ["Confirmation", "On ne retient que ce qui confirme l'hypothèse", "Chercher activement les contre-exemples, coder à deux"],
          ["Questions orientées", "La formulation suggère la réponse", "Relire le guide en cherchant les présupposés"],
          ["Désirabilité sociale", "Le participant dit ce qui fait bien", "Parler du passé concret, pas d'opinions"],
          ["Hawthorne", "On se comporte différemment observé", "Mettre à l'aise, observer le plus naturellement possible"],
          ["Échantillonnage", "Participants trop homogènes", "Critères de diversité explicites"],
          ["Survivant", "On n'interroge que les utilisateurs restants", "Chercher aussi ceux qui sont partis"],
          ["Ancrage", "La première info influence tout", "Varier l'ordre des questions et des tâches"],
        ],
      },
    ],
  },
  {
    id: "surveys-avances",
    title: "Surveys avancés",
    level: 3,
    intro:
      "Au-delà des bases : échantillonnage, biais, analyse.",
    blocks: [
      {
        kind: "list",
        items: [
          "Échantillon : visez la représentativité de votre population, pas un nombre magique. 100 réponses biaisées valent moins que 30 bien ciblées.",
          "Biais de formulation : testez chaque question sur 3 personnes (« que comprenez-vous ? »). Les doubles questions (« rapide et fiable ? ») sont à bannir.",
          "Ordre : questions faciles d'abord, sensibles à la fin. Randomisez l'ordre des options quand l'ordre peut biaiser.",
          "Analyse : commencez par les distributions simples, croisez avec les segments (nouveaux vs anciens), lisez toutes les réponses ouvertes avant de conclure.",
          "Ne surinterprétez pas : un écart de 3 points sur 50 répondants n'est pas significatif. Restez humble sur les petits échantillons.",
        ],
      },
    ],
  },
  {
    id: "echelles-mesure",
    title: "Échelles de mesure",
    level: 3,
    intro:
      "Likert, SUS, NPS : choisir la bonne échelle.",
    blocks: [
      {
        kind: "fields",
        title: "Les échelles standard",
        fields: [
          {
            label: "Likert (5 ou 7 points)",
            value:
              "« Pas du tout d'accord » à « Tout à fait d'accord » : la mesure d'attitude la plus courante. Gardez le même sens et le même nombre de points dans tout le questionnaire.",
          },
          {
            label: "SUS (System Usability Scale)",
            value:
              "10 questions standardisées, score sur 100 : permet de comparer l'utilisabilité entre versions ou produits. À utiliser tel quel, sans le modifier.",
          },
          {
            label: "SEQ (Single Ease Question)",
            value:
              "« Cette tâche était facile » (1-7) après chaque tâche de test : simple et sensible aux différences entre versions.",
          },
          {
            label: "NPS",
            value:
              "« Recommanderiez-vous… ? » (0-10) : mesure la fidélité, pas l'utilisabilité. Utile en suivi longitudinal, trompeur en one-shot.",
          },
        ],
      },
    ],
  },
  {
    id: "triangulation-analytics",
    title: "Triangulation avec les analytics",
    level: 3,
    intro:
      "Croiser le qualitatif et les données d'usage : la méthode la plus robuste.",
    blocks: [
      {
        kind: "list",
        items: [
          "Les analytics disent OÙ ça coince (entonnoir d'abandon, pages de sortie) ; le qualitatif dit POURQUOI. L'un sans l'autre est incomplet.",
          "Workflow : repérez une anomalie dans les données → formulez une hypothèse → vérifiez par 5 entretiens ou tests → corrigez → mesurez l'effet.",
          "Méfiez-vous des moyennes : segmentez (nouveaux vs anciens, mobile vs desktop) avant de conclure.",
          "Corrélation n'est pas causalité : un pic d'abandon après une release suggère, ne prouve pas. Le qualitatif tranche.",
        ],
      },
    ],
  },
  {
    id: "diary-studies",
    title: "Diary studies",
    level: 3,
    intro:
      "Étudier les usages dans la durée : le journal de bord utilisateur.",
    blocks: [
      {
        kind: "list",
        items: [
          "Principe : les participants consignent leurs usages pendant 1 à 4 semaines (texte, photos, captures) via un outil dédié ou une messagerie.",
          "Idéal pour : habitudes, usages intermittents, évolution de la perception dans le temps.",
          "Cadrez : consignes claires, rappels réguliers, incitation proportionnée à la durée. Sans relance, les journaux s'essoufflent.",
          "Analyse : chronologies par participant puis thèmes transverses. Les moments de bascule (adoption, abandon) sont les pépites.",
        ],
      },
    ],
  },
  {
    id: "recherche-lean",
    title: "Recherche lean",
    level: 3,
    intro:
      "Faire de la recherche avec peu de temps et de moyens : les formats légers.",
    blocks: [
      {
        kind: "list",
        items: [
          "Guerrilla testing : 3 utilisateurs interceptés (café, coworking), 15 minutes, un prototype. Mieux que rien, infiniment mieux que rien.",
          "Tests internes ciblés : des collègues non-designers sur des tâches précises — imparfait mais rapide pour débusquer les gros problèmes.",
          "Analyse des tickets support : les verbatims du support sont une mine de problèmes réels, déjà collectés.",
          "Session d'écoute : réécoutez 3 appels clients par mois en équipe. 1 heure, des insights garantis.",
          "Règle : une recherche imparfaite faite vaut mieux qu'une recherche parfaite jamais lancée.",
        ],
      },
    ],
  },
  {
    id: "recherche-continue",
    title: "Recherche continue",
    level: 3,
    intro:
      "Installer un rythme : la recherche comme habitude d'équipe.",
    blocks: [
      {
        kind: "list",
        items: [
          "Cadence : 2-3 sessions par semaine en continu (modèle « Continuous Discovery » de Teresa Torres) plutôt qu'une grosse étude par trimestre.",
          "Rituel : même créneau, recrutement tournant, synthèse partagée systématiquement. La régularité bat l'intensité.",
          "Vivier permanent : une liste de volontaires alimentée en continu pour recruter en 48h.",
          "Restitution légère : une page d'insights par semaine, pas un rapport de 40 pages par trimestre.",
          "Mesurez l'usage : combien de décisions s'appuient sur la recherche ? C'est la métrique de maturité.",
        ],
      },
    ],
  },
  {
    id: "presenter-stakeholders",
    title: "Présenter aux parties prenantes",
    level: 3,
    intro:
      "La restitution : faire agir, pas juste informer.",
    blocks: [
      {
        kind: "list",
        items: [
          "Ouvrez par les extraits vidéo (30-60 s) : un utilisateur en difficulté convainc plus que 20 slides.",
          "3 à 5 insights maximum par présentation : au-delà, rien n'est retenu.",
          "Chaque insight = recommandation priorisée avec effort estimé. Les parties prenantes décident, la recherche éclaire.",
          "Invitez aux sessions : un stakeholder qui a observé un test n'a plus besoin d'être convaincu.",
          "Suivez les décisions : 1 mois après, vérifiez ce qui a été appliqué. La recherche non suivie ne sert à rien.",
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
            title: "1 heure : guerrilla test",
            detail:
              "Prenez une app que vous utilisez, faites tester une tâche à 2 proches en pensant à voix haute. Notez 3 frictions.",
          },
          {
            title: "1 journée : 5 entretiens",
            detail:
              "Question de recherche + guide + 5 entretiens de 30 min + synthèse en affinity mapping. Livrable : 3 insights + recommandations.",
          },
          {
            title: "1 semaine : étude complète",
            detail:
              "Plan de recherche, recrutement, 5 tests d'utilisabilité, analyse, restitution à un public (même fictif). Documentez tout : c'est une preuve de méthode.",
          },
          {
            title: "En continu : journal de recherche",
            detail:
              "Notez chaque semaine une observation d'usage (la vôtre ou celle d'autrui). Le regard de chercheur s'entretient.",
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
            "Recherche pour valider",
            "On cherche des confirmations, pas la vérité",
            "Questions falsifiables, chercher les contre-exemples",
          ],
          [
            "Insights sans recommandation",
            "L'étude n'influence aucune décision",
            "Chaque insight débouche sur une action priorisée",
          ],
          [
            "Personas décoratifs",
            "Fictions affichées au mur, jamais utilisées",
            "Basés sur la recherche, limités à 3-4, révisés",
          ],
          [
            "Sur-généralisation",
            "« Les utilisateurs veulent… » sur 5 entretiens",
            "Préciser l'échantillon, trianguler avant d'affirmer",
          ],
          [
            "Recherche en silo",
            "L'équipe ne s'approprie pas les résultats",
            "Inviter aux sessions, restituer en rituel",
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
      "Les références pour approfondir l'UX research.",
    blocks: [
      {
        kind: "fields",
        title: "À consulter",
        fields: [
          {
            label: "NN/g — Research (nngroup.com)",
            value:
              "Les guides du Nielsen Norman Group : méthodes, protocoles, analyse — la référence méthodologique.",
          },
          {
            label: "Just Enough Research — Erika Hall (abookapart.com)",
            value:
              "Le livre court et pragmatique : faire de la bonne recherche avec peu de moyens.",
          },
          {
            label: "Interviewing Users — Steve Portigal",
            value:
              "Le manuel de l'entretien utilisateur : préparation, conduite, analyse.",
          },
          {
            label: "The Mom Test — Rob Fitzpatrick (momtestbook.com)",
            value:
              "Poser des questions qui ne produisent pas de mensonges polis : indispensable avant tout entretien.",
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
      "La recherche éclaire tout le reste du processus design.",
    blocks: [
      {
        kind: "list",
        items: [
          "Structurer (`wireframing`) : transformer les insights en architecture et parcours.",
          "Prototyper et tester (`prototypage`) : boucler recherche → prototype → test.",
          "Rendre accessible (`accessibilite-design`) : inclure des utilisateurs en situation de handicap dans les études.",
          "Montrer la recherche (`portfolio`) : une étude bien menée fait une excellente case study.",
        ],
      },
    ],
  },
];

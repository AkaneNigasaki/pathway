import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du storytelling data : transformer une analyse
 * en récit qui fait décider — structure narrative, audience,
 * recommandations, présentation. 3 niveaux d'information (Aperçu /
 * Pratique / Approfondi) avec divulgation progressive. Tous les textes
 * supportent le code inline entre backticks.
 */
export const LEARNING_STORYTELLING: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est le storytelling data, pourquoi il conditionne l'impact de toute analyse, et ce qu'il n'est pas.",
    blocks: [
      {
        kind: "text",
        text: "Le storytelling data est l'art de transformer une analyse en récit qui fait décider : structurer le propos, adapter le message au public, formuler des recommandations claires. Une analyse non communiquée n'existe pas — elle dort dans un notebook que personne ne lira.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est décisif : les meilleures analyses meurent dans des notebooks illisibles ou des présentations confuses. Savoir raconter — conclusion d'abord, une idée par visuel, recommandation explicite — convertit le travail technique en décisions. C'est la compétence qui rend toutes les autres visibles.",
      },
      {
        kind: "text",
        text: "Ce que ce n'est pas : ni de la manipulation (le récit doit rester fidèle aux données), ni du « beau PowerPoint » (la forme sert le fond, jamais l'inverse), ni un talent inné — c'est une méthode qui s'apprend, avec des structures éprouvées et des exercices concrets.",
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : l'analyse répond, le récit fait décider",
    level: 1,
    intro:
      "L'idée centrale : le travail technique produit des réponses ; le récit produit des décisions.",
    blocks: [
      {
        kind: "diagram",
        title: "De l'analyse à la décision",
        lines: [
          "Données + analyse (le travail technique)",
          "     │  « que s'est-il passé ? »",
          "     ▼",
          "Insight (la découverte qui compte)",
          "     │  « qu'est-ce que ça change ? »",
          "     ▼",
          "Récit (l'insight structuré pour un public)",
          "     │  « pourquoi dois-je m'en soucier ? »",
          "     ▼",
          "Recommandation (l'action proposée, chiffrée)",
          "     │  « que dois-je faire ? »",
          "     ▼",
          "Décision (ce que le récit devait produire)",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : chaque étape répond à la question du public, pas à celle de l'analyste. L'analyste se demande « qu'ai-je trouvé ? » ; le décideur se demande « que dois-je faire ? ». Le storytelling est la traduction de l'une vers l'autre — sans trahir les données.",
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
      "Ce qu'il faut maîtriser avant de raconter des histoires avec des données.",
    blocks: [
      {
        kind: "fields",
        title: "Bases requises",
        fields: [
          {
            label: "Data visualization",
            value:
              "Produire des graphiques clairs et honnêtes : le récit s'appuie sur des visuels qui racontent déjà — voir `data-viz`.",
          },
          {
            label: "Analyse exploratoire",
            value:
              "Des insights solides issus de l'exploration : on ne raconte bien que ce qu'on a bien compris — voir `eda`.",
          },
          {
            label: "Esprit de synthèse",
            value:
              "Accepter de jeter 90 % du travail d'analyse pour ne garder que ce qui fait décider. Le plus dur du storytelling est ce qu'on ne montre pas.",
          },
        ],
      },
    ],
  },
  {
    id: "environnement-outils",
    title: "Environnement et outils",
    level: 2,
    intro:
      "Les outils du raconteur : simples, maîtrisés, au service du message.",
    blocks: [
      {
        kind: "fields",
        title: "La boîte à outils",
        fields: [
          {
            label: "Présentation (slides)",
            value:
              "L'outil standard du récit oral : un message par slide, peu de texte, des visuels qui portent. La sobriété du template compte plus que ses animations.",
          },
          {
            label: "Document écrit (mémo, rapport)",
            value:
              "Pour les décisions asynchrones : le mémo d'une page ou le rapport structuré. L'écrit reste quand la présentation s'efface.",
          },
          {
            label: "Notebook / dashboard",
            value:
              "Le support de la preuve : montrer les données et les calculs à qui veut vérifier. Le récit renvoie vers la preuve, il ne la remplace pas.",
          },
          {
            label: "Papier et tableau blanc",
            value:
              "Le premier brouillon d'un récit se fait à la main : structurer les idées avant d'ouvrir un logiciel. Un récit qui ne tient pas sur une page ne tiendra pas en slides.",
          },
        ],
      },
      {
        kind: "text",
        text: "Aucun outil ne fait le récit à votre place. La tentation est de passer des heures sur le design des slides pour éviter le travail difficile : choisir le message, ordonner les idées, formuler la recommandation. Faites ce travail d'abord, sur papier.",
      },
    ],
  },
  {
    id: "structurer-recit",
    title: "Structurer un récit",
    level: 2,
    intro:
      "La structure de base : contexte, tension, résolution.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Poser le contexte",
            detail:
              "La situation de départ, en une phrase : « Nos ventes en ligne stagnent depuis six mois malgré un trafic en hausse. » Le public doit comprendre d'où l'on part.",
          },
          {
            title: "Créer la tension",
            detail:
              "Le problème ou l'opportunité : « L'analyse montre que le taux de conversion mobile a chuté de 30 % depuis la refonte de mars. » C'est ce qui justifie qu'on écoute la suite.",
          },
          {
            title: "Révéler l'insight",
            detail:
              "La découverte clé, avec sa preuve : « Les utilisateurs mobiles abandonnent au paiement : le nouveau formulaire prend 40 secondes de plus. » Un graphique, un chiffre.",
          },
          {
            title: "Proposer la résolution",
            detail:
              "La recommandation : « Revenir à l'ancien formulaire sur mobile, puis tester une version simplifiée. Gain estimé : +12 % de conversion. »",
          },
          {
            title: "Conclure par l'action",
            detail:
              "Ce que vous attendez du public : « Je vous demande l'accord pour déployer le retour en arrière cette semaine. » Un récit sans appel à l'action est un divertissement.",
          },
        ],
      },
    ],
  },
  {
    id: "connaitre-audience",
    title: "Connaître son audience",
    level: 2,
    intro:
      "On ne raconte pas pareil à un dirigeant, à un pair technique et à un client.",
    blocks: [
      {
        kind: "table",
        headers: ["Public", "Veut savoir", "Adapter"],
        rows: [
          ["Dirigeant", "Que faire ? Quel impact ? Quel risque ?", "Conclusion d'abord, chiffres clés, recommandation nette"],
          ["Pair technique", "Comment ? Avec quelles limites ?", "Méthode, hypothèses, incertitudes, code disponible"],
          ["Équipe métier", "Qu'est-ce que ça change pour moi ?", "Exemples concrets, impacts opérationnels"],
          ["Client externe", "Pourquoi vous faire confiance ?", "Preuves, références, transparence sur les limites"],
        ],
      },
      {
        kind: "text",
        text: "Avant chaque récit, trois questions : qui décide ? que sait-il déjà ? que doit-il faire après ? Un récit qui ne fait décider personne a raté son public — ou n'avait pas de recommandation.",
      },
    ],
  },
  {
    id: "premiere-histoire",
    title: "Raconter sa première histoire",
    level: 2,
    intro:
      "Un exercice guidé : transformer une analyse en récit de cinq minutes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir une analyse réelle",
            detail:
              "Prenez une de vos explorations (voir `eda`) : un dataset que vous connaissez bien, avec au moins une découverte intéressante.",
          },
          {
            title: "Extraire l'insight unique",
            detail:
              "Formulez LA découverte en une phrase. Si vous en avez trois, choisissez la plus actionnable — les autres attendront.",
          },
          {
            title: "Écrire le résumé en 5 lignes",
            detail:
              "Contexte (1 ligne), problème (1 ligne), insight + preuve (2 lignes), recommandation (1 ligne). Si ça ne tient pas en 5 lignes, le message n'est pas clair.",
          },
          {
            title: "Choisir 2 graphiques",
            detail:
              "Un pour la preuve de l'insight, un pour l'ampleur du problème ou du gain. Titrez chacun avec sa conclusion.",
          },
          {
            title: "Raconter à voix haute",
            detail:
              "Présentez à un collègue en 5 minutes, chronométré. Notez où il décroche : c'est là que le récit doit être resserré.",
          },
        ],
      },
    ],
  },
  {
    id: "titres-conclusions",
    title: "Des titres qui concluent",
    level: 2,
    intro:
      "Le titre porte le message : le lecteur pressé ne lit que lui.",
    blocks: [
      {
        kind: "table",
        headers: ["Titre descriptif (à éviter)", "Titre conclusif (à préférer)"],
        rows: [
          ["Ventes par mois", "Les ventes reculent de 18 % depuis mars"],
          ["Répartition des clients", "70 % du CA vient de 20 % des clients"],
          ["Temps de chargement", "Le mobile met 2× plus de temps à charger : 40 % d'abandon"],
          ["Résultats du test", "Le nouveau formulaire gagne +2,1 points de conversion"],
        ],
      },
      {
        kind: "text",
        text: "Règle : après avoir lu tous les titres d'affilée, on doit comprendre l'histoire entière. Si les titres mis bout à bout ne racontent rien, ils décrivent au lieu de conclure.",
      },
    ],
  },
  {
    id: "une-idee-par-slide",
    title: "Une idée par slide",
    level: 2,
    intro:
      "La discipline qui sépare les présentations comprises de celles subies.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un slide = un message = un visuel principal. Deux graphiques sur un slide = deux messages qui se battent.",
          "Le texte se limite au titre-conclusion et à 1-2 phrases de contexte. Le reste se dit à l'oral.",
          "Si un slide a besoin d'être expliqué longuement, c'est deux slides — ou un message pas clair.",
          "Numéroter et titrer chaque slide : le public doit pouvoir dire « revenons au slide 4 ».",
          "Annexes : les détails techniques et les analyses secondaires vont en annexe, pas dans le fil principal.",
        ],
      },
    ],
  },
  {
    id: "recommandations",
    title: "Formuler des recommandations",
    level: 2,
    intro:
      "« Faire X » plutôt que « on observe Y » : la recommandation est le but du récit.",
    blocks: [
      {
        kind: "fields",
        title: "Anatomie d'une bonne recommandation",
        fields: [
          {
            label: "Action précise",
            value:
              "« Déployer le formulaire simplifié sur mobile » — pas « envisager des pistes d'amélioration ». Le décideur doit savoir exactement ce qu'on lui propose.",
          },
          {
            label: "Justification chiffrée",
            value:
              "« Gain estimé : +12 % de conversion, soit ~200k€/an » — l'ampleur justifie l'effort. Sans chiffre, la recommandation est une opinion.",
          },
          {
            label: "Risque et réversibilité",
            value:
              "« Réversible en un jour, aucun impact sur le desktop » — lever les objections avant qu'elles naissent.",
          },
          {
            label: "Prochaine étape",
            value:
              "« Si accord aujourd'hui, déploiement jeudi, mesure sur 2 semaines » — transformer la décision en calendrier.",
          },
        ],
      },
      {
        kind: "text",
        text: "Une analyse sans recommandation demande au décideur de faire votre travail. Même quand les données sont ambiguës, recommander (y compris « ne rien faire pour l'instant et retester dans 3 mois ») est plus utile que de présenter des faits sans avis.",
      },
    ],
  },
  {
    id: "chiffres-contextualises",
    title: "Contextualiser les chiffres",
    level: 2,
    intro:
      "Un chiffre seul ne signifie rien : il lui faut un point de comparaison.",
    blocks: [
      {
        kind: "list",
        items: [
          "Toujours comparer : à la période précédente, à l'objectif, à un segment de référence, à la moyenne du secteur.",
          "« +15 % » ne veut rien dire sans la base : +15 % sur 100 ou sur 100 000 ? Donner l'absolu ET le relatif.",
          "Humaniser les grands nombres : « 2 millions d'euros » parle moins que « l'équivalent de 3 mois de CA du magasin de Lyon ».",
          "Préciser le périmètre : « sur les clients actifs, France, 12 derniers mois » — un chiffre sans périmètre est invérifiable.",
          "Arrondir intelligemment : « 12 483,72 € » dans un slide = du bruit ; « ~12,5 k€ » = un message.",
        ],
      },
    ],
  },
  {
    id: "executive-summary-pratique",
    title: "L'executive summary",
    level: 2,
    intro:
      "Le résumé d'une page pour les dirigeants : conclusion d'abord, détails ensuite.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "La recommandation en premier",
            detail:
              "Première phrase = ce qu'on propose de faire. Le dirigeant pressé s'arrête parfois là — et c'est normal.",
          },
          {
            title: "Le pourquoi en 3 points",
            detail:
              "Trois arguments maximum, chacun en une phrase avec un chiffre. Pas de méthodologie ici.",
          },
          {
            title: "L'impact chiffré",
            detail:
              "Gain attendu, coût, délai : les trois chiffres qui cadrent la décision.",
          },
          {
            title: "Les risques en une ligne",
            detail:
              "Ce qui pourrait mal tourner, et la parade. L'honnêteté sur les risques construit la confiance.",
          },
          {
            title: "La demande explicite",
            detail:
              "« Décision attendue : accord pour lancer le test le 15. » Jamais de résumé qui se termine dans le vide.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-debutant",
    title: "Erreurs de débutant",
    level: 2,
    intro:
      "Les pièges classiques des premiers récits data.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Le journal de bord",
            value:
              "Problem : raconter l'analyse dans l'ordre où on l'a faite (« d'abord j'ai nettoyé, puis... »). Better : raconter dans l'ordre où on la comprend (conclusion d'abord).",
          },
          {
            label: "Le tout-technique",
            value:
              "Problem : 20 slides de méthodologie pour un dirigeant. Better : adapter au public — la méthode va en annexe.",
          },
          {
            label: "L'enterrement de la recommandation",
            value:
              "Problem : finir sur « voilà les résultats » sans dire quoi faire. Better : chaque récit se termine par une recommandation explicite.",
          },
          {
            label: "Le graphique décoratif",
            value:
              "Problem : un visuel qui n'apporte pas de preuve. Better : chaque graphique doit faire avancer le récit — sinon, le supprimer.",
          },
          {
            label: "Le jargon non traduit",
            value:
              "Problem : « le R² ajusté montre une hétéroscédasticité » devant des non-statisticiens. Better : traduire en langage métier (« nos prédictions sont moins fiables pour les gros clients »).",
          },
          {
            label: "La fausse précision",
            value:
              "Problem : « +12,483 % » qui suggère une certitude inexistante. Better : arrondir et, si pertinent, donner l'intervalle d'incertitude.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "structure-narrative",
    title: "Structures narratives",
    level: 3,
    intro:
      "Trois architectures éprouvées pour ordonner un récit data.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois structures",
        fields: [
          {
            label: "Situation – Complication – Résolution",
            value:
              "La plus universelle : poser le contexte stable, introduire la rupture (problème ou opportunité), apporter la résolution (insight + recommandation). Fonctionne pour presque tous les récits d'analyse.",
          },
          {
            label: "Pyramide inversée (journalisme)",
            value:
              "L'essentiel d'abord, les détails ensuite : conclusion, arguments clés, contexte, méthodologie. Idéale pour l'écrit à destination de dirigeants qui s'arrêtent quand ils ont décidé.",
          },
          {
            label: "Le héros et le guide",
            value:
              "Le public (ou le métier) est le héros avec un problème ; l'analyse est le guide qui apporte la solution. Utile pour embarquer une équipe : « vos clients abandonnent ici, voici comment on les retient ».",
          },
        ],
      },
      {
        kind: "text",
        text: "Choisir selon le public et le medium : pyramide inversée pour l'écrit exécutif, situation-complication-résolution pour la présentation, héros-guide pour mobiliser une équipe. L'important n'est pas la structure choisie, mais d'en avoir une — au lieu d'empiler des slides.",
      },
    ],
  },
  {
    id: "pyramid-principle",
    title: "Le principe pyramidal",
    level: 3,
    intro:
      "La méthode McKinsey : grouper les idées, conclure en haut.",
    blocks: [
      {
        kind: "text",
        text: "Le principe pyramidal (Barbara Minto) organise les idées en pyramide : en haut, LA conclusion unique ; en dessous, les 2 à 4 arguments qui la soutiennent ; sous chacun, les preuves (données, graphiques). Chaque niveau répond à la question « pourquoi ? » du niveau supérieur, et les éléments d'un même niveau sont MECE (mutuellement exclusifs, collectivement exhaustifs).",
      },
      {
        kind: "diagram",
        title: "La pyramide",
        lines: [
          "        RECOMMANDATION (1 phrase)",
          "       /        |         \\",
          " Argument 1  Argument 2  Argument 3",
          "   /  \\       /  \\        /  \\",
          "Preuve Preuve Preuve Preuve Preuve Preuve",
          "  (données, graphiques, chiffres)",
        ],
      },
      {
        kind: "text",
        text: "En pratique : avant d'ouvrir le logiciel de présentation, écrire la pyramide sur papier. Si un argument ne soutient pas la conclusion, il sort. Si deux arguments disent la même chose, ils fusionnent. C'est l'exercice de rigueur le plus rentable du storytelling.",
      },
    ],
  },
  {
    id: "scqa",
    title: "Le framework SCQA",
    level: 3,
    intro:
      "Situation, Complication, Question, Answer : l'ouverture qui accroche.",
    blocks: [
      {
        kind: "fields",
        title: "Les quatre temps",
        fields: [
          {
            label: "Situation",
            value:
              "Le contexte stable et partagé : « Nos ventes en ligne progressent de 5 % par an depuis trois ans. » Le public acquiesce.",
          },
          {
            label: "Complication",
            value:
              "La rupture : « Depuis mars, la conversion mobile chute de 30 %. » Le public s'inquiète — il veut la suite.",
          },
          {
            label: "Question",
            value:
              "La question que tout le monde se pose : « Que se passe-t-il sur mobile, et comment inverser la tendance ? » Souvent implicite, parfois posée explicitement.",
          },
          {
            label: "Answer",
            value:
              "La réponse : « Le nouveau formulaire fait fuir : revenons à l'ancien, puis testons une version simplifiée. » Le reste de la présentation prouve cette réponse.",
          },
        ],
      },
      {
        kind: "text",
        text: "SCQA tient en 60 secondes d'introduction et donne au public une raison d'écouter : il sait où on va et pourquoi ça compte. C'est l'antidote à l'ouverture classique « bonjour, aujourd'hui je vais vous présenter mon analyse de... » qui fait décrocher en dix secondes.",
      },
    ],
  },
  {
    id: "audience-mapping",
    title: "Cartographier l'audience",
    level: 3,
    intro:
      "Préparer un récit pour un public réel, pas un public moyen.",
    blocks: [
      {
        kind: "fields",
        title: "Questions préalables",
        fields: [
          {
            label: "Qui décide ?",
            value:
              "Identifier LA personne dont l'accord est nécessaire. Le récit s'adresse à elle en priorité ; les autres sont informés.",
          },
          {
            label: "Que sait-elle déjà ?",
            value:
              "Ne pas réexpliquer ce qu'elle sait, ne pas supposer ce qu'elle ignore. Une phrase de cadrage en début de récit aligne tout le monde.",
          },
          {
            label: "Qu'est-ce qui la motive ?",
            value:
              "Le dirigeant veut l'impact business, le technique veut la rigueur, le métier veut le concret. Le même insight se formule différemment pour chacun.",
          },
          {
            label: "Quelles sont ses objections probables ?",
            value:
              "« Et si c'est la saisonnalité ? », « Combien ça coûte ? » — préparer les réponses, idéalement les intégrer au récit avant qu'elles naissent.",
          },
          {
            label: "Combien de temps ai-je ?",
            value:
              "Préparer la version 5 minutes ET la version 30 minutes. Le dirigeant qui n'a que 5 minutes doit repartir avec la recommandation.",
          },
        ],
      },
    ],
  },
  {
    id: "adapter-niveau",
    title: "Adapter le niveau technique",
    level: 3,
    intro:
      "Traduire sans trahir : le même résultat, trois langages.",
    blocks: [
      {
        kind: "table",
        headers: ["Concept technique", "Version dirigeant", "Version métier"],
        rows: [
          ["Intervalle de confiance à 95 %", "Le gain est probablement entre 1 et 3 points", "On est assez sûrs du gain, entre 1 et 3 points"],
          ["p-value = 0,03", "Le résultat n'est probablement pas du hasard", "Le test est fiable"],
          ["Corrélation de 0,7", "Les deux évoluent ensemble", "Quand l'un monte, l'autre monte généralement"],
          ["Sur-apprentissage", "Le modèle mémorise au lieu de généraliser", "Il marche sur le passé, pas forcément sur le futur"],
          ["Dérive des données", "Le monde a changé depuis l'entraînement", "Les comportements ont évolué, il faut réajuster"],
        ],
      },
      {
        kind: "text",
        text: "Traduire n'est pas simplifier à l'excès : l'incertitude doit survivre à la traduction (« probablement », « de l'ordre de »). Un dirigeant à qui on cache l'incertitude prendra la prochaine décision sur une confiance excessive — et vous en voudra quand elle se révélera fausse.",
      },
    ],
  },
  {
    id: "storytelling-visuel",
    title: "Storytelling visuel",
    level: 3,
    intro:
      "Faire raconter aux graphiques : séquence narrative et mise en évidence.",
    blocks: [
      {
        kind: "text",
        text: "Un récit visuel se construit en séquence : chaque graphique est une phrase. Technique puissante : le « build » — montrer d'abord le contexte en gris (toutes les séries), puis révéler la série qui porte le message en couleur. Le public vit la découverte au lieu de la subir.",
      },
      {
        kind: "list",
        items: [
          "Ordre des visuels = ordre du récit : contexte, problème, preuve, ampleur, recommandation.",
          "Mise en évidence : UNE série en couleur, le reste en gris — l'œil va au message sans effort.",
          "Annotations narratives : flèches et textes qui expliquent le POURQUOI, pas seulement le QUOI.",
          "Cohérence : mêmes couleurs, mêmes échelles, mêmes unités dans tout le récit — voir `data-viz`.",
          "Un graphique par idée : si deux messages cohabitent, le public n'en retient aucun.",
        ],
      },
    ],
  },
  {
    id: "design-slides",
    title: "Design des slides",
    level: 3,
    intro:
      "La forme au service du fond : lisibilité, hiérarchie, sobriété.",
    blocks: [
      {
        kind: "list",
        items: [
          "Hiérarchie visuelle : le titre-conclusion en grand, le visuel au centre, les détails en petit. L'œil doit savoir où regarder en une seconde.",
          "Espace blanc : aérer — un slide dense n'est pas un slide riche, c'est un slide illisible.",
          "Typographie : une police lisible, taille suffisante pour le fond de la salle (≥ 24 pt pour le corps), contraste fort.",
          "Couleurs : palette restreinte et cohérente ; la couleur = le message, pas la décoration.",
          "Pas d'animations gratuites : chaque transition doit avoir une raison narrative (révéler, comparer).",
          "Tester en conditions réelles : projeter et lire depuis le fond de la salle avant le jour J.",
        ],
      },
    ],
  },
  {
    id: "data-ink",
    title: "Le ratio encre-données",
    level: 3,
    intro:
      "Maximiser l'information par pixel : le principe de Tufte appliqué aux slides.",
    blocks: [
      {
        kind: "text",
        text: "Le ratio encre-données (Edward Tufte) mesure la part de l'encre qui porte de l'information. L'objectif : supprimer tout ce qui ne sert pas le message — fonds en dégradé, bordures 3D, grilles trop marquées, légendes redondantes — et renforcer ce qui le sert : étiquettes directes sur les données, annotations, mise en évidence.",
      },
      {
        kind: "list",
        items: [
          "Supprimer : effets 3D, ombres, arrière-plans, bordures décoratives.",
          "Alléger : grilles fines, axes épurés, légendes intégrées au graphique.",
          "Renforcer : étiquettes de valeurs sur les points clés, titres-conclusions, annotations explicatives.",
          "Test : masquer un élément — si le message survit, l'élément était du bruit.",
        ],
      },
    ],
  },
  {
    id: "comparaisons-honnetes",
    title: "Des comparaisons honnêtes",
    level: 3,
    intro:
      "Comparer sans tromper : les règles d'or des visuels comparatifs.",
    blocks: [
      {
        kind: "list",
        items: [
          "Même échelle pour les graphiques comparés : deux courbes sur des échelles différentes fabriquent de fausses histoires.",
          "Périmètres identiques : comparer « France 2024 » à « Europe 2023 », c'est comparer des pommes et des calendriers.",
          "Base à zéro pour les barres : le rappel constant — une barre tronquée ment sur les proportions.",
          "Montrer les deux sens : si le traitement gagne en moyenne mais perd sur un segment important, le dire — la crédibilité se joue là.",
          "Éviter le cherry-picking de période : la fenêtre montrée doit être justifiée, pas choisie parce qu'elle arrange.",
        ],
      },
    ],
  },
  {
    id: "incertitude-communiquee",
    title: "Communiquer l'incertitude",
    level: 3,
    intro:
      "Dire ce qu'on ne sait pas : la marque des analystes de confiance.",
    blocks: [
      {
        kind: "fields",
        title: "Techniques",
        fields: [
          {
            label: "Fourchettes plutôt que points",
            value:
              "« Entre 150 et 250 k€ » plutôt que « 203 k€ » : la fourchette dit la vérité sur la précision. Le chiffre unique ment par excès de confiance.",
          },
          {
            label: "Scénarios",
            value:
              "Présenter 2-3 scénarios (conservateur, central, optimiste) avec leurs hypothèses : le décideur choisit son niveau de prudence en connaissance de cause.",
          },
          {
            label: "Ce qu'on ne sait pas",
            value:
              "Une slide « limites » : données manquantes, hypothèses fragiles, généralisabilité. Paradoxalement, elle augmente la confiance au lieu de la réduire.",
          },
          {
            label: "Vocabulaire de l'incertain",
            value:
              "« Suggère », « de l'ordre de », « probablement » : bannir les affirmations absolues sur des estimations. La nuance n'est pas de la faiblesse.",
          },
        ],
      },
    ],
  },
  {
    id: "recommandations-actionnables",
    title: "Recommandations actionnables",
    level: 3,
    intro:
      "Passer de l'insight à l'action : ce qui rend une recommandation applicable.",
    blocks: [
      {
        kind: "fields",
        title: "Critères",
        fields: [
          {
            label: "Spécifique",
            value:
              "Qui fait quoi, quand : « l'équipe mobile déploie le formulaire simplifié d'ici jeudi » — pas « il faudrait améliorer le mobile ».",
          },
          {
            label: "Faisable",
            value:
              "Compatible avec les contraintes réelles (budget, délais, équipes). Une recommandation infaisable discrédite l'analyse.",
          },
          {
            label: "Mesurable",
            value:
              "Succès défini à l'avance : « +2 points de conversion sur 4 semaines ». Sans critère de succès, on ne saura jamais si c'était une bonne idée.",
          },
          {
            label: "Hiérarchisée",
            value:
              "Si plusieurs recommandations : les ordonner par rapport impact/effort. Le décideur arbitre, vous l'éclairez.",
          },
          {
            label: "Réversible quand c'est possible",
            value:
              "Proposer d'abord le test ou le pilote : « testons 2 semaines sur 10 % du trafic » réduit le risque perçu et accélère la décision.",
          },
        ],
      },
    ],
  },
  {
    id: "chiffrage-impact",
    title: "Chiffrer l'impact",
    level: 3,
    intro:
      "Traduire les pourcentages en euros, en temps, en clients : le langage de la décision.",
    blocks: [
      {
        kind: "list",
        items: [
          "Toujours convertir : « +2 points de conversion » devient « ~200 k€ de CA annuel supplémentaire » — c'est ce chiffre qui figure dans le compte-rendu de direction.",
          "Montrer le calcul : base × effet × période, avec les hypothèses explicites. Un chiffrage opaque est un chiffrage suspect.",
          "Donner une fourchette : « entre 150 et 250 k€ » — l'honnêteté sur l'incertitude renforce la crédibilité du chiffre central.",
          "Comparer au coût : « 200 k€ de gain pour 2 jours de dev » — le ratio fait décider plus que le gain seul.",
          "Annualiser avec prudence : extrapoler 2 semaines sur un an suppose la stabilité — le dire explicitement.",
        ],
      },
    ],
  },
  {
    id: "objections",
    title: "Anticiper les objections",
    level: 3,
    intro:
      "Les questions qui vont arriver — et comment les désamorcer.",
    blocks: [
      {
        kind: "fields",
        title: "Objections classiques",
        fields: [
          {
            label: "« Et la saisonnalité ? »",
            value:
              "Réponse : comparer à période comparable, ou montrer que l'effet persiste hors saison. Prévoir la slide.",
          },
          {
            label: "« L'échantillon est-il suffisant ? »",
            value:
              "Réponse : donner la taille, l'intervalle de confiance, la puissance. Les chiffres rassurent plus que les adjectifs.",
          },
          {
            label: "« Ça ne marchera pas chez nous / sur ce segment »",
            value:
              "Réponse : montrer les résultats par segment, ou proposer un pilote ciblé plutôt qu'un déploiement global.",
          },
          {
            label: "« Combien ça coûte ? »",
            value:
              "Réponse : chiffrer le coût ET le gain — toujours les deux ensemble, jamais l'un sans l'autre.",
          },
          {
            label: "« On a déjà essayé »",
            value:
              "Réponse : expliquer ce qui diffère cette fois (données, méthode, contexte). Respecter l'histoire sans s'y soumettre.",
          },
        ],
      },
      {
        kind: "text",
        text: "Principe : intégrer les réponses aux objections probables DANS le récit (une slide « limites et réponses ») plutôt que de les subir en questions. Un orateur qui a prévu l'objection inspire confiance ; celui qui l'esquive la confirme.",
      },
    ],
  },
  {
    id: "presentation-orale",
    title: "Présenter à l'oral",
    level: 3,
    intro:
      "Le récit ne vit que dans la voix : techniques de présentation.",
    blocks: [
      {
        kind: "list",
        items: [
          "Ouvrir par SCQA en 60 secondes : le public sait où on va et pourquoi ça compte.",
          "Raconter, pas lire : les slides sont des repères visuels, pas un prompteur. Regarder le public, pas l'écran.",
          "Rythme : ralentir sur les chiffres clés, marquer des silences après les conclusions — le silence fait retenir.",
          "Répéter : une présentation importante se répète à voix haute au moins une fois, chronométrée.",
          "Gérer le temps : prévoir 10 minutes de questions sur 30 ; si le temps se réduit, couper dans le détail, jamais dans la recommandation.",
          "Finir sur l'appel à l'action, pas sur « merci de votre attention » : la dernière phrase doit être la décision attendue.",
        ],
      },
    ],
  },
  {
    id: "gestion-questions",
    title: "Gérer les questions",
    level: 3,
    intro:
      "Les questions sont le vrai test du récit : s'y préparer comme au récit lui-même.",
    blocks: [
      {
        kind: "list",
        items: [
          "Écouter entièrement avant de répondre : interrompre pour « deviner » la question agace et fait rater la vraie.",
          "Reformuler : « si je comprends bien, vous demandez si... » — cela clarifie et donne du temps pour réfléchir.",
          "Répondre brièvement, puis proposer d'approfondir : ne pas transformer chaque question en mini-présentation.",
          "Dire « je ne sais pas » quand c'est vrai — et proposer de vérifier : « je vous envoie ça demain ». Inventer une réponse détruit la crédibilité.",
          "Noter les questions : elles révèlent ce que le récit n'a pas clarifié — matière à améliorer la prochaine version.",
        ],
      },
    ],
  },
  {
    id: "memos-ecrits",
    title: "Écrire des mémos décisionnels",
    level: 3,
    intro:
      "Le mémo d'une page : le format le plus dense et le plus exigeant.",
    blocks: [
      {
        kind: "diagram",
        title: "Structure d'un mémo d'une page",
        lines: [
          "TITRE : la recommandation en une phrase",
          "─────────────────────────────────────────",
          "CONTEXTE (3 lignes) : d'où l'on part",
          "CONSTAT (1 paragraphe) : ce que montrent les données",
          "  └─ 1 graphique max, titré avec sa conclusion",
          "RECOMMANDATION : action précise + chiffrage",
          "RISQUES : ce qui pourrait mal tourner + parades",
          "DEMANDE : décision attendue + échéance",
          "─────────────────────────────────────────",
          "Annexe : méthode, détails, liens vers les données",
        ],
      },
      {
        kind: "text",
        text: "Le mémo se lit en 3 minutes et se décide en 1. L'écrire force une clarté que les slides permettent d'éviter : pas d'animations pour masquer un message flou, pas d'oral pour compenser. Tout analyste devrait écrire régulièrement des mémos — c'est l'exercice de synthèse ultime.",
      },
    ],
  },
  {
    id: "executive-summary-master",
    title: "Executive summary : niveau avancé",
    level: 3,
    intro:
      "Au-delà du template : les nuances qui font un résumé exécutif efficace.",
    blocks: [
      {
        kind: "list",
        items: [
          "Écrire le résumé EN DERNIER mais le placer EN PREMIER : il doit refléter le récit final, pas le plan initial.",
          "Le test des 30 secondes : un dirigeant qui ne lit que le résumé doit pouvoir décider — ou savoir exactement ce qu'il lui manque.",
          "Un chiffre par phrase maximum : au-delà, le résumé devient un tableau.",
          "Éviter les acronymes et le jargon : le résumé circule au-delà du cercle des initiés.",
          "Adapter la longueur au canal : un paragraphe pour un email, une page pour un dossier de décision.",
          "Le résumé ne doit jamais contredire le corps du document : toute nuance importante y figure, même brièvement.",
        ],
      },
    ],
  },
  {
    id: "rapports-longs",
    title: "Rapports d'analyse longs",
    level: 3,
    intro:
      "Quand le sujet exige 20 pages : structurer pour les lecteurs pressés ET les lecteurs exigeants.",
    blocks: [
      {
        kind: "list",
        items: [
          "Architecture en couches : résumé exécutif (1 p.) → findings (5 p.) → méthode et détails (le reste) → annexes.",
          "Chaque section commence par sa conclusion : le lecteur qui survole les premiers paragraphes comprend l'essentiel.",
          "Table des matières et numérotation : un long rapport se navigue, il ne se lit pas linéairement.",
          "Un fil rouge : rappeler régulièrement la question directrice — les longs rapports perdent leur lecteur au milieu.",
          "Cohérence des chiffres : le même indicateur doit avoir la même valeur partout — relire en croix.",
          "Versionner : un rapport décisionnel est un document vivant jusqu'à la décision — dater chaque version.",
        ],
      },
    ],
  },
  {
    id: "biais-cognitifs",
    title: "Biais cognitifs du public (et du raconteur)",
    level: 3,
    intro:
      "Les pièges mentaux qui déforment la réception — et la production — des récits data.",
    blocks: [
      {
        kind: "fields",
        title: "Biais à connaître",
        fields: [
          {
            label: "Biais de confirmation",
            value:
              "On retient les données qui confirment ce qu'on croit déjà. Parade du raconteur : présenter aussi les résultats qui contredisent la thèse — c'est ce qui rend le récit crédible.",
          },
          {
            label: "Ancrage",
            value:
              "Le premier chiffre entendu influence tous les suivants. Usage honnête : ancrer sur la bonne référence (l'objectif, pas un chiffre flatteur).",
          },
          {
            label: "Biais du survivant",
            value:
              "Ne voir que les succès visibles. Le raconter : « ces 3 cas ont réussi, mais 12 ont échoué » — l'histoire complète, pas la légende.",
          },
          {
            label: "Effet de cadrage",
            value:
              "« 90 % de réussite » vs « 10 % d'échec » : même fait, réception différente. Choisir le cadrage honnête, pas le plus flatteur.",
          },
          {
            label: "Biais de récit",
            value:
              "Le danger du storytelling lui-même : une belle histoire fait oublier les incertitudes. Garder la slide « limites » même quand le récit est beau.",
          },
        ],
      },
    ],
  },
  {
    id: "paradoxe-simpson",
    title: "Le paradoxe de Simpson",
    level: 3,
    intro:
      "Quand l'agrégat dit l'inverse des segments : le piège narratif par excellence.",
    blocks: [
      {
        kind: "text",
        text: "Le paradoxe de Simpson : une tendance observée dans chaque segment s'inverse quand on agrège. Exemple classique : un traitement semble moins efficace globalement, mais il est meilleur dans chaque sous-groupe — parce que les groupes n'ont pas les mêmes proportions. Pour le raconteur, c'est un avertissement : raconter l'agrégat sans vérifier les segments, c'est risquer de raconter l'inverse de la vérité.",
      },
      {
        kind: "list",
        items: [
          "Toujours désagréger par les segments pertinents avant de conclure — et avant de raconter.",
          "Si l'agrégat et les segments divergent, raconter les segments : ce sont eux qui décrivent la réalité.",
          "Expliquer le paradoxe au public avec un exemple simple : c'est un excellent moment pédagogique qui renforce la confiance.",
        ],
      },
    ],
  },
  {
    id: "ethique-storytelling",
    title: "Éthique du storytelling",
    level: 3,
    intro:
      "La frontière entre raconter et manipuler : ne jamais la franchir.",
    blocks: [
      {
        kind: "list",
        items: [
          "Ne jamais sélectionner les données pour servir le récit : le récit sert les données, pas l'inverse.",
          "Montrer l'incertitude même quand elle affaiblit le message : un récit honnête avec des zones d'ombre vaut mieux qu'un récit parfait et faux.",
          "Citer les sources et les périmètres : « d'où vient ce chiffre ? » doit toujours avoir une réponse.",
          "Ne pas utiliser les biais cognitifs comme des armes : le cadrage et l'ancrage éclairent ou manipulent selon l'intention.",
          "Refuser les demandes malhonnêtes : « peux-tu faire dire aux données que... » — la réponse est non, avec une contre-proposition honnête.",
          "La réputation d'un analyste se construit sur des années et se perd sur un graphique truqué.",
        ],
      },
    ],
  },
  {
    id: "storytelling-produit",
    title: "Storytelling produit et launch",
    level: 3,
    intro:
      "Raconter pour lancer : le récit data au service du produit.",
    blocks: [
      {
        kind: "list",
        items: [
          "Récit de lancement : problème utilisateur (preuves) → solution → impact mesuré — la même structure que l'analyse, appliquée au produit.",
          "Changelog narratif : « quoi de neuf » raconté en bénéfices, pas en features — avec les chiffres d'usage quand ils existent.",
          "Rétrospectives data : raconter ce qu'on a appris d'un trimestre (tests, échecs, insights) pour aligner l'équipe.",
          "Attention : le storytelling produit ne doit jamais promettre ce que les données ne montrent pas — la hype se paie en confiance.",
        ],
      },
    ],
  },
  {
    id: "communication-async",
    title: "Communiquer en asynchrone",
    level: 3,
    intro:
      "Quand le récit voyage sans son auteur : écrit, vidéo, documentation.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un document asynchrone doit être auto-suffisant : contexte, conclusions, limites — sans l'oral qui complète.",
          "Structure scannable : titres-conclusions, paragraphes courts, visuels légendés — on lit en diagonale d'abord.",
          "Version courte + lien vers le détail : le message tient en un écran, la preuve est à un clic.",
          "Dater et versionner : un document qui circule sans date devient une source de confusion.",
          "Prévoir les questions en commentaires : répondre par écrit enrichit le document pour les lecteurs suivants.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Le catalogue des fautes de storytelling, même chez les raconteurs confirmés.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Le récit sans recommandation",
            value:
              "Problem : finir sur les résultats. Better : toujours terminer par une action proposée et chiffrée.",
          },
          {
            label: "La pyramide inversée oubliée",
            value:
              "Problem : noyer la conclusion à la fin d'un long document. Better : conclusion d'abord, détails ensuite.",
          },
          {
            label: "Le graphique non titré",
            value:
              "Problem : « Ventes 2024 » qui n'apprend rien. Better : chaque titre conclut.",
          },
          {
            label: "L'incertitude escamotée",
            value:
              "Problem : des affirmations absolues sur des estimations. Better : fourchettes, scénarios, slide limites.",
          },
          {
            label: "Le public unique imaginaire",
            value:
              "Problem : le même récit pour la direction et les techs. Better : adapter le niveau et l'angle à qui décide.",
          },
          {
            label: "Le cherry-picking narratif",
            value:
              "Problem : ne montrer que les données qui arrangent. Better : l'histoire complète, y compris ce qui contredit.",
          },
          {
            label: "Le jargon écran",
            value:
              "Problem : se cacher derrière le vocabulaire technique. Better : traduire en langage métier, sans trahir.",
          },
          {
            label: "L'appel à l'action flou",
            value:
              "Problem : « merci » comme dernière slide. Better : finir sur la décision attendue et son échéance.",
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
          "Message unique : si on ne peut pas le formuler en une phrase, le récit n'est pas prêt.",
          "Conclusion d'abord : pyramide inversée pour l'écrit, SCQA pour l'oral.",
          "Un visuel = une idée, titré avec sa conclusion.",
          "Adapter au public : qui décide, que sait-il, que doit-il faire.",
          "Recommandation explicite, chiffrée, avec risques et prochaine étape.",
          "Incertitude assumée : fourchettes, limites, ce qu'on ne sait pas.",
          "Honnêteté totale : jamais de données sélectionnées pour arranger le récit.",
          "Sobriété visuelle : la forme sert le fond.",
          "Répéter à voix haute avant les présentations importantes.",
          "Archiver : chaque récit décisionnel est daté, versionné, retrouvé.",
        ],
      },
    ],
  },
  {
    id: "projet-memo",
    title: "Projet : mémo décisionnel",
    level: 3,
    intro:
      "Rédiger un mémo d'une page qui fait décider.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir un cas",
            detail:
              "Une analyse réelle (ou un dataset public) avec un enjeu de décision : pricing, churn, acquisition.",
          },
          {
            title: "Écrire la pyramide",
            detail:
              "Sur papier : recommandation, 3 arguments, preuves. Valider la logique avant tout visuel.",
          },
          {
            title: "Produire les preuves",
            detail:
              "2 graphiques maximum, titrés avec leurs conclusions, périmètres et sources indiqués.",
          },
          {
            title: "Rédiger le mémo",
            detail:
              "Une page selon la structure : titre-recommandation, contexte, constat, recommandation chiffrée, risques, demande.",
          },
          {
            title: "Faire relire par un non-expert",
            detail:
              "S'il comprend et peut décider en 3 minutes, le mémo est réussi. Sinon, simplifier.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-presentation",
    title: "Projet : présentation d'insights",
    level: 3,
    intro:
      "Présenter une analyse en 15 minutes devant un public.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définir le public et l'objectif",
            detail:
              "Qui écoute ? Quelle décision doit-il prendre après ? Écrire ces deux réponses en haut du brouillon.",
          },
          {
            title: "Construire le récit",
            detail:
              "SCQA en ouverture, 5 à 8 slides (une idée chacune), recommandation et appel à l'action en fin.",
          },
          {
            title: "Designer sobrement",
            detail:
              "Template simple, titres-conclusions, visuels épurés. Tester la lisibilité en projection.",
          },
          {
            title: "Répéter",
            detail:
              "À voix haute, chronométré, devant un collègue. Noter les décrochages et resserrer.",
          },
          {
            title: "Présenter et débriefer",
            detail:
              "Après : qu'a retenu le public ? La décision a-t-elle avancé ? Noter les questions pour la prochaine fois.",
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
      "Aller plus loin : les références du domaine.",
    blocks: [
      {
        kind: "fields",
        title: "Références (à privilégier)",
        fields: [
          {
            label: "« Storytelling with Data » (Cole Nussbaumer Knaflic)",
            value:
              "La référence pratique : choisir ses visuels, les épurer, les intégrer dans un récit. Le site de l'auteure prolonge le livre.",
          },
          {
            label: "« The Pyramid Principle » (Barbara Minto)",
            value:
              "La méthode de structuration des idées : la pyramide, le MECE, la rigueur du raisonnement écrit.",
          },
          {
            label: "« From Data to Viz » (data-to-viz.com)",
            value:
              "Le catalogue pour choisir la bonne forme graphique selon les données — le complément visuel du récit.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : réécrire des présentations confuses (les vôtres ou des exemples publics) en récits structurés.",
          "Exercice : résumer chaque analyse en executive summary d'une page, même quand personne ne le demande.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Le storytelling maîtrisé, voici les prolongements naturels dans la roadmap Data Scientist.",
    blocks: [
      {
        kind: "list",
        items: [
          "`deployment` : porter les analyses en production — dashboards, rapports automatisés, produits data.",
          "`data-viz` : approfondir les principes visuels qui portent les récits.",
          "`experimentation` : raconter des résultats de tests de façon à faire décider vite et bien.",
          "`eda` : revenir à l'exploration avec l'œil du raconteur — chercher l'insight qui mérite un récit.",
          "Revenir à la roadmap : valider Storytelling data et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

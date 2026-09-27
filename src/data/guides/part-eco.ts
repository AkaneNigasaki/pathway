import type { SkillGuide } from "../skill-guides";

/**
 * Guides pédagogiques — économiste.
 *
 * Conventions suivies :
 * - `prerequisiteNotes` : clés = ids EXACTS du tableau `prerequisites` du skill.
 * - `conceptDetails[].name` : reprend au plus proche le tableau `concepts` du skill.
 * - `howItWorks` : la démarche de l'économiste en étapes (question → modèle →
 *   données → test → interprétation), pas une métaphore technique.
 * - Ton : documentation premium, concret, sans marketing. Français.
 */
export const GUIDES_ECO: Record<string, SkillGuide> = {
  // ----------------------------------------------------------------- intro-eco
  "intro-eco": {
    definition:
      "L'économie est la science des choix sous contrainte : comment les individus, les entreprises et les États allouent des ressources rares entre des usages concurrents. Rareté, incitations et équilibre en sont les concepts fondateurs.",
    whyLearn:
      "Prix, salaires, impôts, taux d'intérêt : l'économie éclaire les mécanismes derrière les chiffres de l'actualité. Comprendre les incitations et les arbitrages, c'est lire le monde avec une grille d'analyse rigoureuse plutôt que par slogans.",
    conceptDetails: [
      {
        name: "Rareté & choix",
        definition:
          "Les ressources sont limitées, les besoins ne le sont pas : tout choix économique est un arbitrage entre des usages concurrents.",
      },
      {
        name: "Coût d'opportunité",
        definition:
          "Le coût réel d'un choix, c'est ce à quoi on renonce en le faisant. L'idée la plus simple — et la plus puissante — de l'économie.",
      },
      {
        name: "Incitations",
        definition:
          "Les agents réagissent aux incitations : prix, taxes, subventions. Comprendre une incitation, c'est prédire un comportement.",
      },
      {
        name: "Équilibre",
        definition:
          "La situation où les plans des agents sont compatibles : personne n'a intérêt à changer seul de comportement. Le point d'arrivée de beaucoup de modèles.",
      },
      {
        name: "Agents économiques",
        definition:
          "Ménages, entreprises, État : les trois grandes catégories d'acteurs dont les décisions interagissent dans l'économie.",
      },
    ],
    howItWorksTitle: "Raisonner en économiste",
    howItWorks: ["RARETÉ", "CHOIX", "INCITATIONS", "ÉQUILIBRE", "PRÉDICTION"],
    example: {
      title: "Pourquoi le prix du café augmente",
      steps: [
        "Sécheresse dans les pays producteurs",
        "Offre de café réduite sur le marché mondial",
        "À demande constante, le prix monte",
        "Les consommateurs ajustent leur consommation",
        "Nouvel équilibre à un prix plus élevé",
      ],
    },
    projectsDetailed: [
      {
        title: "Dossier sur un paradoxe économique",
        flow: "Paradoxe → Explication → Données → Dossier rédigé",
      },
      {
        title: "Veille sur l'actualité éco",
        flow: "Actualité → Concepts → Analyse → Note hebdo",
      },
    ],
  },

  // ---------------------------------------------------------------------- maths
  maths: {
    definition:
      "Les mathématiques sont le langage de la modélisation économique : optimisation, dérivées, algèbre linéaire. Elles transforment l'intuition (« les agents maximisent ») en modèle testable.",
    whyLearn:
      "L'économie moderne est mathématisée : sans optimisation ni dérivées, la microéconomie et l'économétrie restent inaccessibles. Les maths ne sont pas un ornement, elles sont l'outil qui rend la théorie précise et réfutable.",
    conceptDetails: [
      {
        name: "Optimisation",
        definition:
          "Trouver le meilleur choix sous contrainte : maximiser l'utilité, minimiser les coûts. Le cœur mathématique du comportement économique.",
      },
      {
        name: "Dérivées partielles",
        definition:
          "Mesurer l'effet d'une variable en gardant les autres constantes : l'outil du « toutes choses égales par ailleurs » des économistes.",
      },
      {
        name: "Algèbre linéaire",
        definition:
          "Vecteurs et matrices : le langage des systèmes à plusieurs variables, indispensable en économétrie et en macroéconomie.",
      },
      {
        name: "Suites",
        definition:
          "Des valeurs qui évoluent dans le temps : croissance, actualisation, convergence vers un équilibre de long terme.",
      },
      {
        name: "Logique",
        definition:
          "La rigueur du raisonnement : hypothèses, implications, contraposées. Ce qui rend une démonstration économique valide.",
      },
    ],
    howItWorksTitle: "Optimiser un choix",
    howItWorks: ["OBJECTIF", "CONTRAINTE", "DÉRIVÉE", "OPTIMUM", "INTERPRÉTATION"],
    example: {
      title: "Combien produire ?",
      steps: [
        "Une entreprise cherche à maximiser son profit",
        "Profit = recettes moins coûts de production",
        "Dérivée du profit par rapport à la quantité",
        "Optimum : recette marginale égale coût marginal",
        "Interprétation économique du résultat",
      ],
    },
    projectsDetailed: [
      {
        title: "Résolution de problèmes d'optimisation",
        flow: "Énoncé → Modélisation → Calcul → Interprétation",
      },
      {
        title: "Modèle simple programmé",
        flow: "Équations → Code → Simulation → Graphiques",
      },
    ],
  },

  // --------------------------------------------------------------- histoire-eco
  "histoire-eco": {
    definition:
      "L'histoire économique étudie les faits (révolutions industrielles, crises, mondialisation) et les idées (des physiocrates à Keynes) qui ont façonné les économies. Elle éclaire les débats contemporains par le précédent.",
    whyLearn:
      "Chaque crise se croit inédite ; l'histoire montre les régularités. Comprendre d'où viennent les idées — et pourquoi certaines ont échoué — évite de réinventer des erreurs et donne du recul sur les politiques actuelles.",
    conceptDetails: [
      {
        name: "Grandes écoles de pensée",
        definition:
          "Classiques, keynésiens, monétaristes… : les courants qui ont structuré la pensée économique, chacun né d'une crise de son temps.",
      },
      {
        name: "Révolutions industrielles",
        definition:
          "Les vagues de transformation technologique — vapeur, électricité, numérique — qui ont redessiné production, travail et échanges.",
      },
      {
        name: "Crises",
        definition:
          "1929, 2008 : les effondrements qui révèlent les fragilités du système et provoquent les grandes réformes.",
      },
      {
        name: "Mondialisation",
        definition:
          "L'intégration croissante des économies depuis le XIXe siècle, avec ses vagues, ses reflux et ses perdants.",
      },
      {
        name: "Institutions",
        definition:
          "Les règles du jeu — propriété, contrats, banques centrales — qui expliquent pourquoi des pays aux ressources semblables divergent.",
      },
    ],
    howItWorksTitle: "Analyser une crise historique",
    howItWorks: ["CONTEXTE", "DÉCLENCHEUR", "PROPAGATION", "RÉPONSES", "LEÇONS"],
    example: {
      title: "La crise de 1929",
      steps: [
        "Euphorie boursière et crédit facile des années 1920",
        "Krach d'octobre 1929 à Wall Street",
        "Contagion bancaire et grande dépression",
        "Réponses : New Deal, abandon de l'étalon-or",
        "Leçons pour la régulation financière moderne",
      ],
    },
    projectsDetailed: [
      {
        title: "Essai sur une crise historique",
        flow: "Crise choisie → Faits → Interprétations → Essai",
      },
      {
        title: "Comparaison de deux écoles",
        flow: "Deux courants → Contexte → Thèses → Jugement critique",
      },
    ],
  },

  // ----------------------------------------------------------------------- micro
  micro: {
    definition:
      "La microéconomie étudie le comportement des agents individuels — consommateurs, entreprises — et la formation des équilibres sur les marchés. Elle explique comment des décisions décentralisées produisent un ordre collectif.",
    whyLearn:
      "Prix, concurrence, externalités, pouvoir de marché : la microéconomie fournit les outils pour analyser n'importe quel marché, du logement aux plateformes numériques. C'est aussi le fondement de la régulation et de la politique de la concurrence.",
    prerequisiteNotes: {
      "intro-eco":
        "Les notions de rareté, d'incitations et d'équilibre sont le point de départ de l'analyse microéconomique.",
      "maths":
        "L'optimisation sous contrainte est le moteur mathématique de la microéconomie.",
    },
    conceptDetails: [
      {
        name: "Offre & demande",
        definition:
          "Les deux courbes dont l'intersection fixe prix et quantité d'équilibre : le modèle le plus utilisé de toute l'économie.",
      },
      {
        name: "Théorie du consommateur",
        definition:
          "Comment un ménage répartit son budget pour maximiser sa satisfaction : utilité, contrainte budgétaire, choix optimal.",
      },
      {
        name: "Concurrence",
        definition:
          "De la concurrence parfaite au monopole : la structure du marché détermine les prix, les quantités et les profits.",
      },
      {
        name: "Externalités",
        definition:
          "Les effets d'une activité sur des tiers non parties à l'échange — pollution, par exemple. Source classique de défaillance du marché.",
      },
      {
        name: "Théorie des jeux",
        definition:
          "L'analyse des interactions stratégiques : chaque agent anticipe les choix des autres. Incontournable pour les oligopoles et la négociation.",
      },
    ],
    howItWorksTitle: "Analyser un marché",
    howItWorks: ["AGENTS", "COMPORTEMENTS", "ÉQUILIBRE", "DÉFAILLANCE", "INTERVENTION"],
    example: {
      title: "Taxer les émissions polluantes",
      steps: [
        "La pollution est une externalité négative",
        "Le marché, laissé seul, produit trop de pollution",
        "Une taxe aligne le coût privé sur le coût social",
        "Les entreprises réduisent leurs émissions",
        "Nouvel équilibre corrigé par l'intervention",
      ],
    },
    projectsDetailed: [
      {
        title: "Modélisation d'un marché",
        flow: "Marché choisi → Courbes → Équilibre → Choc → Nouvel équilibre",
      },
      {
        title: "Analyse d'une défaillance de marché",
        flow: "Situation → Externalité → Coût social → Intervention proposée",
      },
    ],
  },

  // ----------------------------------------------------------------------- macro
  macro: {
    definition:
      "La macroéconomie étudie l'économie dans son ensemble : croissance, inflation, chômage, politiques monétaire et budgétaire. Elle manipule les grands agrégats — PIB, prix, emploi — et leurs interactions.",
    whyLearn:
      "Taux directeurs, déficits, inflation : la macroéconomie explique les décisions qui affectent tous les agents à la fois. Pour travailler en banque centrale, en conjoncture ou en politique économique, c'est le cadre indispensable.",
    prerequisiteNotes: {
      "intro-eco":
        "Les agrégats et la notion d'équilibre posés en introduction se déclinent ici à l'échelle du pays.",
      "maths":
        "Les modèles macroéconomiques reposent sur l'algèbre et l'optimisation.",
    },
    conceptDetails: [
      {
        name: "PIB & agrégats",
        definition:
          "Le produit intérieur brut mesure la production d'un pays ; consommation, investissement et commerce extérieur en sont les composantes.",
      },
      {
        name: "IS-LM",
        definition:
          "Le modèle qui articule marché des biens (IS) et marché de la monnaie (LM) : le cadre classique pour penser la politique économique.",
      },
      {
        name: "Politique monétaire",
        definition:
          "L'action de la banque centrale sur les taux d'intérêt pour stabiliser prix et activité. Son canal principal : le coût du crédit.",
      },
      {
        name: "Politique budgétaire",
        definition:
          "L'usage par l'État des dépenses et des impôts pour soutenir l'activité : relance en récession, consolidation en expansion.",
      },
      {
        name: "Change",
        definition:
          "Le prix d'une monnaie en une autre : il conditionne la compétitivité et transmet les chocs entre économies.",
      },
    ],
    howItWorksTitle: "Lire une situation macroéconomique",
    howItWorks: ["AGRÉGATS", "DIAGNOSTIC", "CANAL", "POLITIQUE", "EFFETS"],
    example: {
      title: "Face à l'inflation",
      steps: [
        "L'inflation dépasse durablement la cible de 2 %",
        "Diagnostic : une demande trop forte tire les prix",
        "La banque centrale relève ses taux directeurs",
        "Le crédit ralentit, la demande se tasse",
        "L'inflation revient progressivement vers sa cible",
      ],
    },
    projectsDetailed: [
      {
        title: "Note de conjoncture",
        flow: "Données → Diagnostic → Risques → Note rédigée",
      },
      {
        title: "Simulation de politique monétaire",
        flow: "Choc → Canal de transmission → Réponse → Effets",
      },
    ],
  },

  // ----------------------------------------------------------------- econometrie
  econometrie: {
    definition:
      "L'économétrie teste les théories économiques avec des données : régressions, variables instrumentales, méthodes quasi-expérimentales. C'est le pont entre les modèles et le monde réel — et le juge de paix des débats.",
    whyLearn:
      "Sans économétrie, l'économie reste une collection d'opinions. Savoir distinguer corrélation et causalité, c'est pouvoir répondre à des questions concrètes : cette politique a-t-elle créé des emplois ? Ce programme est-il efficace ?",
    prerequisiteNotes: {
      "maths":
        "Les régressions et l'inférence statistique exigent algèbre linéaire et probabilités.",
      "micro":
        "La théorie microéconomique fournit les modèles que l'économétrie teste.",
    },
    conceptDetails: [
      {
        name: "MCO",
        definition:
          "Les moindres carrés ordinaires : la méthode de base pour estimer la relation entre des variables. Simple, puissante, et biaisée si les hypothèses manquent.",
      },
      {
        name: "Variables instrumentales",
        definition:
          "Une technique pour isoler l'effet causal quand la variable d'intérêt est corrélée à des facteurs inobservés : on utilise une variation exogène comme levier.",
      },
      {
        name: "Diff-in-diff",
        definition:
          "Les doubles différences comparent l'évolution d'un groupe traité à celle d'un groupe témoin : la méthode reine de l'évaluation des politiques.",
      },
      {
        name: "Séries temporelles",
        definition:
          "L'analyse des données dans le temps : tendances, saisonnalité, chocs. Indispensable en macroéconomie et en finance.",
      },
      {
        name: "R / Stata",
        definition:
          "Les logiciels de l'économètre : R pour sa flexibilité et sa gratuité, Stata pour sa robustesse académique.",
      },
    ],
    howItWorksTitle: "Tester une hypothèse",
    howItWorks: ["QUESTION", "DONNÉES", "MODÈLE", "ESTIMATION", "INTERPRÉTATION"],
    example: {
      title: "Le salaire minimum détruit-il des emplois ?",
      steps: [
        "Un État augmente son salaire minimum",
        "Données d'emploi avant/après, avec un État témoin",
        "Méthode des doubles différences",
        "Estimation de l'effet causal sur l'emploi",
        "Interprétation prudente : ampleur et limites",
      ],
    },
    projectsDetailed: [
      {
        title: "Réplication d'un article empirique",
        flow: "Article → Données → Code → Résultats comparés",
      },
      {
        title: "Étude économétrique originale",
        flow: "Question → Données → Méthode → Rapport",
      },
    ],
  },

  // ---------------------------------------------------------- eco-internationale
  "eco-internationale": {
    definition:
      "L'économie internationale étudie les échanges entre pays : commerce, finance internationale, taux de change. Elle décrit le monde comme un système d'économies interdépendantes.",
    whyLearn:
      "Chaînes de valeur mondiales, tensions commerciales, crises de change : aucune économie ne vit en autarcie. Comprendre l'avantage comparatif et la balance des paiements, c'est comprendre la mondialisation au-delà des clichés.",
    prerequisiteNotes: {
      "macro":
        "La balance des paiements et les taux de change prolongent la macroéconomie à l'échelle mondiale.",
    },
    conceptDetails: [
      {
        name: "Avantage comparatif",
        definition:
          "Le principe de Ricardo : chaque pays gagne à se spécialiser là où son désavantage est le moindre, même s'il est moins efficace partout.",
      },
      {
        name: "Balance des paiements",
        definition:
          "Le compte qui enregistre toutes les transactions d'un pays avec le reste du monde : échanges, revenus, flux financiers.",
      },
      {
        name: "Taux de change",
        definition:
          "Le prix relatif des monnaies : il ajuste la compétitivité et transmet les chocs d'une économie à l'autre.",
      },
      {
        name: "OMC",
        definition:
          "L'Organisation mondiale du commerce : elle encadre les règles du commerce international et règle les différends entre États.",
      },
      {
        name: "Chaînes de valeur",
        definition:
          "La fragmentation de la production entre pays : un même bien est conçu ici, assemblé là, vendu ailleurs.",
      },
    ],
    howItWorksTitle: "Analyser un déséquilibre commercial",
    howItWorks: ["FLUX", "BALANCE", "TAUX DE CHANGE", "AJUSTEMENT", "POLITIQUE"],
    example: {
      title: "Un déficit commercial persistant",
      steps: [
        "Le pays importe durablement plus qu'il n'exporte",
        "Déficit du compte courant de la balance des paiements",
        "Pression à la baisse sur la monnaie nationale",
        "La dépréciation restaure la compétitivité-prix",
        "Ajustement progressif de la balance commerciale",
      ],
    },
    projectsDetailed: [
      {
        title: "Analyse d'un accord commercial",
        flow: "Accord → Secteurs → Gagnants/perdants → Bilan",
      },
      {
        title: "Dossier sur une crise de change",
        flow: "Pays → Déséquilibres → Attaque → Réponse → Leçons",
      },
    ],
  },

  // ------------------------------------------------------------ eco-developpement
  "eco-developpement": {
    definition:
      "L'économie du développement cherche pourquoi certains pays s'enrichissent et d'autres non : croissance, pauvreté, institutions, aide au développement. Ce sont les questions les plus importantes — et les plus difficiles — de l'économie.",
    whyLearn:
      "Des milliards de personnes vivent encore dans la pauvreté : comprendre ce qui fait décoller une économie n'est pas un exercice académique. Les méthodes d'évaluation rigoureuse, comme les essais randomisés, ont transformé la lutte contre la pauvreté.",
    prerequisiteNotes: {
      "macro":
        "Les modèles de croissance prolongent la macroéconomie sur le long terme.",
      "histoire-eco":
        "Les trajectoires historiques éclairent les divergences de développement entre pays.",
    },
    conceptDetails: [
      {
        name: "Modèles de croissance",
        definition:
          "Solow et ses successeurs : le capital, le travail et le progrès technique expliquent l'enrichissement de long terme — avec des rendements décroissants.",
      },
      {
        name: "Pauvreté & inégalités",
        definition:
          "Mesurer la pauvreté (seuils, privations) et les inégalités (Gini) : sans mesure rigoureuse, pas de politique efficace.",
      },
      {
        name: "Institutions",
        definition:
          "Droits de propriété, État de droit, stabilité : la qualité des institutions explique une grande part des écarts de développement.",
      },
      {
        name: "Aide au développement",
        definition:
          "Les transferts vers les pays pauvres : leur efficacité se discute, et se mesure — d'où l'importance de l'évaluation.",
      },
      {
        name: "RCT",
        definition:
          "Les essais randomisés contrôlés : tirer au sort les bénéficiaires d'un programme pour mesurer son effet causal. La méthode du prix Nobel 2019.",
      },
    ],
    howItWorksTitle: "Évaluer un programme de développement",
    howItWorks: ["PROGRAMME", "GROUPE TÉMOIN", "RANDOMISATION", "MESURE", "RÉSULTAT"],
    example: {
      title: "Tester un programme de microcrédit",
      steps: [
        "Une ONG veut évaluer son programme de microcrédit",
        "Tirage au sort des villages bénéficiaires",
        "Suivi des revenus et de l'activité sur deux ans",
        "Comparaison entre villages traités et témoins",
        "Décision : étendre, réformer ou abandonner",
      ],
    },
    projectsDetailed: [
      {
        title: "Évaluation d'un programme de développement",
        flow: "Programme → Protocole → Données → Résultats",
      },
      {
        title: "Dossier pays",
        flow: "Pays → Trajectoire → Institutions → Diagnostic",
      },
    ],
  },

  // --------------------------------------------------------- politiques-publiques
  "politiques-publiques": {
    definition:
      "L'évaluation des politiques publiques mesure l'efficacité de l'action de l'État : analyse coût-bénéfice, évaluation d'impact, fiscalité, protection sociale. Elle met la rigueur économique au service de la décision collective.",
    whyLearn:
      "Chaque euro public dépensé mérite d'être évalué. L'évaluation d'impact dit ce qui marche, l'analyse coût-bénéfice dit ce qui vaut le coût. C'est le métier qui relie directement l'économie à l'action publique.",
    prerequisiteNotes: {
      "macro":
        "La politique budgétaire et la conjoncture cadrent l'action de l'État.",
      "micro":
        "Les incitations individuelles déterminent l'effet réel des politiques sur le terrain.",
    },
    conceptDetails: [
      {
        name: "Évaluation d'impact",
        definition:
          "Mesurer l'effet causal d'une politique en la comparant à ce qui se serait passé sans elle : le contrefactuel est la clé.",
      },
      {
        name: "Analyse coût-bénéfice",
        definition:
          "Comparer en euros les coûts et les bénéfices d'un projet public : l'outil de la décision rationnelle, avec ses limites éthiques.",
      },
      {
        name: "Fiscalité",
        definition:
          "L'impôt comme instrument : il finance l'État mais modifie les comportements — d'où l'importance d'en mesurer les effets.",
      },
      {
        name: "Protection sociale",
        definition:
          "Retraites, santé, chômage : les grands systèmes de redistribution, leurs équilibres financiers et leurs incitations.",
      },
      {
        name: "Nudges",
        definition:
          "Les incitations douces qui orientent les comportements sans contraindre : architecture du choix au service des politiques.",
      },
    ],
    howItWorksTitle: "Évaluer une politique",
    howItWorks: ["OBJECTIF", "THÉORIE DU CHANGEMENT", "MESURE", "CONTREFACTUEL", "RECOMMANDATION"],
    example: {
      title: "Évaluer une prime à l'emploi",
      steps: [
        "L'État lance une prime à l'embauche des jeunes",
        "Objectif affiché : réduire le chômage des jeunes",
        "Comparaison avec des territoires témoins",
        "Effet mesuré : +3 points d'emploi dans les zones traitées",
        "Recommandation : reconduire en ciblant mieux",
      ],
    },
    projectsDetailed: [
      {
        title: "Évaluation d'une politique publique",
        flow: "Politique → Données → Méthode → Verdict",
      },
      {
        title: "Note au décideur",
        flow: "Question → Analyse → Options → Recommandation",
      },
    ],
  },

  // -------------------------------------------------------------------- data-eco
  "data-eco": {
    definition:
      "La data pour économistes couvre les outils modernes du traitement des données : R, nettoyage, datavisualisation, reproductibilité. C'est la matière première de l'économiste empirique.",
    whyLearn:
      "L'économétrie ne vaut que par les données qu'on lui donne. Savoir construire un pipeline propre et reproductible — de la donnée brute au graphique publiable — est devenu aussi important que la théorie.",
    prerequisiteNotes: {
      "econometrie":
        "Les méthodes économétriques définissent ce que les données doivent permettre de tester.",
    },
    conceptDetails: [
      {
        name: "R / tidyverse",
        definition:
          "Le langage statistique des économistes et sa grammaire de manipulation de données : filtrer, agréger, modéliser proprement.",
      },
      {
        name: "Nettoyage de données",
        definition:
          "Valeurs manquantes, doublons, formats incohérents : 80 % du travail empirique, invisible dans l'article final.",
      },
      {
        name: "Dataviz",
        definition:
          "Visualiser pour comprendre puis pour convaincre : un bon graphique montre le résultat avant même le tableau de régression.",
      },
      {
        name: "API & scraping",
        definition:
          "Collecter des données via les API officielles ou l'extraction web : l'accès direct à la matière première.",
      },
      {
        name: "Reproductibilité",
        definition:
          "Un script, des données versionnées, un environnement documenté : n'importe qui doit pouvoir refaire tourner l'analyse.",
      },
    ],
    howItWorksTitle: "Construire un pipeline de données",
    howItWorks: ["SOURCE", "COLLECTE", "NETTOYAGE", "ANALYSE", "RESTITUTION"],
    example: {
      title: "Suivre le chômage en temps réel",
      steps: [
        "Sources : API de l'INSEE et données publiées",
        "Collecte automatisée chaque mois",
        "Nettoyage et harmonisation des séries",
        "Graphiques et indicateurs calculés",
        "Dashboard publié, code reproductible",
      ],
    },
    projectsDetailed: [
      {
        title: "Pipeline de données reproductible",
        flow: "Source → Script → Données propres → Documentation",
      },
      {
        title: "Dashboard d'indicateurs",
        flow: "Indicateurs → Maquettes → Automatisation → Publication",
      },
    ],
  },

  // ------------------------------------------------------------------- recherche
  recherche: {
    definition:
      "La recherche en économie produit de la connaissance nouvelle : revue de littérature, question de recherche, rédaction académique, évaluation par les pairs. C'est l'aboutissement du parcours : contribuer au savoir plutôt que le consommer.",
    whyLearn:
      "Doctorat, institutions internationales, think tanks : la recherche ouvre les carrières les plus exigeantes. Elle apprend surtout une rigueur transférable partout : formuler une question, la tester honnêtement, écrire clairement.",
    prerequisiteNotes: {
      "econometrie":
        "La crédibilité d'un article repose sur l'identification causale.",
      "politiques-publiques":
        "Les questions de recherche naissent souvent de l'évaluation des politiques.",
    },
    conceptDetails: [
      {
        name: "Revue de littérature",
        definition:
          "Cartographier ce qu'on sait déjà : sans elle, on réinvente — et les rapporteurs le remarquent immédiatement.",
      },
      {
        name: "Question de recherche",
        definition:
          "Une question précise, originale et testable : le point de départ et le fil rouge de tout article.",
      },
      {
        name: "Rédaction académique",
        definition:
          "Écrire pour convaincre des pairs exigeants : structure IMRAD, résultats robustes, limites assumées.",
      },
      {
        name: "Peer review",
        definition:
          "L'évaluation anonyme par d'autres chercheurs : le filtre qualité de la science, exigeant mais formateur.",
      },
      {
        name: "Séminaires",
        definition:
          "Présenter son travail en cours devant des collègues : les critiques précoces évitent les erreurs tardives.",
      },
    ],
    howItWorksTitle: "Mener un projet de recherche",
    howItWorks: ["LITTÉRATURE", "QUESTION", "DONNÉES", "RÉSULTATS", "RÉDACTION"],
    example: {
      title: "Écrire un mémoire de recherche",
      steps: [
        "Revue de la littérature sur le sujet choisi",
        "Question originale et hypothèses de travail",
        "Données et stratégie d'identification",
        "Résultats et tests de robustesse",
        "Rédaction et présentation en séminaire",
      ],
    },
    projectsDetailed: [
      {
        title: "Mémoire de recherche",
        flow: "Question → Littérature → Données → Mémoire",
      },
      {
        title: "Présentation en séminaire",
        flow: "Résultats → Slides → Exposé → Discussion",
      },
    ],
  },
};

import type { SkillGuide } from "../skill-guides";

/**
 * Guides pédagogiques — analyste financier.
 *
 * Conventions suivies :
 * - `prerequisiteNotes` : clés = ids EXACTS du tableau `prerequisites` du skill.
 * - `conceptDetails[].name` : reprend au plus proche le tableau `concepts` du skill.
 * - `howItWorks` : la démarche d'analyse en étapes (données → calcul →
 *   interprétation → décision), pas une métaphore technique.
 * - Ton : documentation premium, concret, sans marketing. Français.
 */
export const GUIDES_FINANCE: Record<string, SkillGuide> = {
  // ------------------------------------------------------------ comptabilite
  comptabilite: {
    definition:
      "La comptabilité est le système qui enregistre, classe et synthétise les opérations d'une entreprise en états financiers : bilan, compte de résultat, tableau de flux. C'est la grammaire de la finance : sans elle, l'analyse n'est que spéculation.",
    whyLearn:
      "Tout analyste lit des états financiers. Comprendre la partie double, la différence entre résultat et trésorerie, ou ce qu'un bilan raconte vraiment, c'est la condition pour diagnostiquer, valoriser et recommander. Aucune modélisation ne compense une comptabilité mal lue.",
    conceptDetails: [
      {
        name: "Partie double",
        definition:
          "Le principe fondateur : chaque opération s'enregistre deux fois, au débit et au crédit, pour un équilibre permanent. C'est ce qui rend la comptabilité vérifiable.",
      },
      {
        name: "Bilan",
        definition:
          "La photographie du patrimoine à une date donnée : l'actif (ce que l'entreprise possède) financé par le passif (ce qu'elle doit).",
      },
      {
        name: "Compte de résultat",
        definition:
          "Le film de l'année : produits moins charges, il mesure la performance et aboutit au résultat net.",
      },
      {
        name: "Cash-flow",
        definition:
          "Les flux de trésorerie réels : une entreprise peut être bénéficiaire et manquer de cash. Le tableau de flux dit la vérité de la liquidité.",
      },
      {
        name: "PCG / IFRS",
        definition:
          "Les référentiels comptables : le Plan Comptable Général en France, les normes IFRS pour les groupes cotés. Ils fixent les règles du jeu de la présentation financière.",
      },
    ],
    howItWorksTitle: "Lire des états financiers",
    howItWorks: ["OPÉRATIONS", "ENREGISTREMENT", "ÉTATS", "LECTURE", "INTERPRÉTATION"],
    example: {
      title: "Comprendre un bilan",
      steps: [
        "Ouverture du bilan d'une entreprise cotée",
        "Actif : ce que l'entreprise possède et exploite",
        "Passif : comment tout cela est financé",
        "Compte de résultat : la performance de l'année",
        "Flux de trésorerie : la réalité du cash",
      ],
    },
    projectsDetailed: [
      {
        title: "Lecture de 3 bilans réels",
        flow: "Rapports annuels → Bilan → Compte de résultat → Comparaison",
      },
      {
        title: "Construction des états financiers",
        flow: "Opérations → Écritures → Balance → États de synthèse",
      },
    ],
  },

  // ----------------------------------------------------------------- maths-fi
  "maths-fi": {
    definition:
      "Les mathématiques financières donnent un prix au temps et au risque : actualisation, intérêts composés, probabilités. Elles sont le moteur de calcul de toute la finance, de la valorisation à la gestion du risque.",
    whyLearn:
      "Un euro aujourd'hui ne vaut pas un euro demain : l'actualisation est l'idée la plus importante de la finance. Sans ces maths, impossible de valoriser un actif, de comparer deux investissements ou de mesurer un risque.",
    conceptDetails: [
      {
        name: "Actualisation",
        definition:
          "Ramener un flux futur à sa valeur d'aujourd'hui en appliquant un taux. C'est l'opération de base de toute valorisation.",
      },
      {
        name: "Intérêts composés",
        definition:
          "Les intérêts qui produisent eux-mêmes des intérêts : le mécanisme de la croissance exponentielle du capital — et de la dette.",
      },
      {
        name: "Rentes",
        definition:
          "Des flux réguliers dans le temps : leur valeur actuelle se calcule par des formules fermées, utiles pour les emprunts comme pour les valorisations.",
      },
      {
        name: "Probabilités",
        definition:
          "Le langage de l'incertitude : espérance, variance, distributions. Indispensable pour parler de risque et de rendement attendu.",
      },
      {
        name: "Statistiques",
        definition:
          "Estimer et tester à partir de données : moyennes, écarts-types, corrélations. Le fondement empirique de la finance quantitative.",
      },
    ],
    howItWorksTitle: "Actualiser un flux futur",
    howItWorks: ["FLUX", "HORIZON", "TAUX", "ACTUALISATION", "DÉCISION"],
    example: {
      title: "Vaut-il 100 € dans 5 ans ?",
      steps: [
        "Promesse de recevoir 100 € dans 5 ans",
        "Taux d'actualisation retenu : 5 %",
        "Calcul : 100 / 1,05^5, soit environ 78 €",
        "Comparaison avec le prix demandé aujourd'hui",
        "Décision d'investir ou non",
      ],
    },
    projectsDetailed: [
      {
        title: "Calculateur de TRI",
        flow: "Flux du projet → Taux d'essai → Interpolation → TRI",
      },
      {
        title: "Tableau d'amortissement",
        flow: "Capital → Taux → Mensualité → Échéancier complet",
      },
    ],
  },

  // --------------------------------------------------------------------- excel
  excel: {
    definition:
      "Excel est l'atelier de l'analyste financier : formules, tableaux croisés dynamiques, modèles structurés. Malgré les outils modernes, il reste le standard pour modéliser, auditer et présenter des analyses.",
    whyLearn:
      "La quasi-totalité des modèles financiers du monde tournent sur Excel. Le maîtriser — formules avancées, modèles propres et auditables — c'est parler la langue de travail de la profession et éviter les erreurs de calcul qui coûtent cher.",
    conceptDetails: [
      {
        name: "Formules avancées",
        definition:
          "RECHERCHEV/X, INDEX-EQUIV, SOMMEPROD, SI imbriqués : les fonctions qui transforment un tableur en outil d'analyse.",
      },
      {
        name: "TCD",
        definition:
          "Les tableaux croisés dynamiques résument des milliers de lignes en quelques clics : le premier outil d'exploration de données.",
      },
      {
        name: "Mise en forme conditionnelle",
        definition:
          "Colorer les cellules selon leurs valeurs pour repérer d'un coup d'œil les anomalies et les tendances.",
      },
      {
        name: "Modèles structurés",
        definition:
          "Séparer hypothèses, calculs et sorties ; une formule = une logique ; pas de valeurs en dur : les règles d'un modèle professionnel.",
      },
      {
        name: "Raccourcis",
        definition:
          "La vitesse d'exécution compte : les raccourcis clavier font gagner des heures sur un modèle complexe.",
      },
    ],
    howItWorksTitle: "Construire un modèle propre",
    howItWorks: ["HYPOTHÈSES", "CALCULS", "SORTIES", "CONTRÔLES", "DOCUMENTATION"],
    example: {
      title: "Un tableau d'amortissement",
      steps: [
        "Montant emprunté, taux et durée en hypothèses",
        "Formule de la mensualité constante",
        "Tableau des échéances : intérêts et capital",
        "Vérification : le total remboursé est cohérent",
        "Mise en forme et contrôles d'erreur",
      ],
    },
    projectsDetailed: [
      {
        title: "Modèle financier propre",
        flow: "Besoin → Hypothèses → Calculs → Contrôles → Documentation",
      },
      {
        title: "Dashboard automatisé",
        flow: "Données brutes → TCD → Graphiques → Mise à jour auto",
      },
    ],
  },

  // -------------------------------------------------------- analyse-financiere
  "analyse-financiere": {
    definition:
      "L'analyse financière transforme des états financiers en diagnostic : ratios, soldes intermédiaires de gestion, besoin en fonds de roulement. Elle répond à une question simple : cette entreprise est-elle saine et performante ?",
    whyLearn:
      "Banquiers, investisseurs et dirigeants décident sur la base de diagnostics financiers. Savoir lire la rentabilité, la liquidité et l'endettement d'une entreprise — et la comparer à son secteur — est le cœur du métier d'analyste.",
    prerequisiteNotes: {
      "comptabilite":
        "Les ratios se calculent sur les états financiers : il faut savoir les lire avant de les interpréter.",
    },
    conceptDetails: [
      {
        name: "Ratios clés",
        definition:
          "Rentabilité, liquidité, endettement, rotation : des fractions qui résument la santé financière en quelques chiffres comparables.",
      },
      {
        name: "SIG",
        definition:
          "Les soldes intermédiaires de gestion décomposent la formation du résultat : marge commerciale, valeur ajoutée, EBE, résultat d'exploitation.",
      },
      {
        name: "BFR & trésorerie",
        definition:
          "Le besoin en fonds de roulement mesure le cash immobilisé par le cycle d'exploitation. Trésorerie = fonds de roulement − BFR.",
      },
      {
        name: "Benchmarks sectoriels",
        definition:
          "Un ratio ne signifie rien seul : il se juge par rapport aux concurrents et à l'historique de l'entreprise.",
      },
      {
        name: "Diagnostic",
        definition:
          "La synthèse : forces, faiblesses, risques. Un bon diagnostic tient en une page et oriente la décision.",
      },
    ],
    howItWorksTitle: "Diagnostiquer une entreprise",
    howItWorks: ["ÉTATS FINANCIERS", "RATIOS", "TENDANCES", "BENCHMARK", "DIAGNOSTIC"],
    example: {
      title: "Diagnostic d'une entreprise cotée",
      steps: [
        "Téléchargement du rapport annuel",
        "Calcul des ratios de rentabilité et de liquidité",
        "Évolution des indicateurs sur 5 ans",
        "Comparaison avec deux concurrents du secteur",
        "Diagnostic : forces et points de vigilance",
      ],
    },
    projectsDetailed: [
      {
        title: "Diagnostic complet d'une entreprise cotée",
        flow: "Rapport annuel → Ratios → Tendances → Diagnostic rédigé",
      },
      {
        title: "Comparaison sectorielle",
        flow: "Panel d'entreprises → Ratios → Classement → Enseignements",
      },
    ],
  },

  // -------------------------------------------------------------- valorisation
  valorisation: {
    definition:
      "La valorisation estime ce que vaut une entreprise : actualisation des flux futurs (DCF), multiples de comparables, actif net réévalué. C'est l'exercice central des fusions-acquisitions et de l'investissement.",
    whyLearn:
      "Tout achat, toute levée de fonds, tout investissement repose sur un prix. Savoir construire une fourchette de valorisation défendable — et expliquer ses hypothèses — distingue l'analyste qui calcule de celui qui recommande.",
    prerequisiteNotes: {
      "analyse-financiere":
        "Le diagnostic de la performance nourrit les hypothèses de croissance et de marge du modèle.",
      "excel":
        "Le DCF se construit dans un tableur : formules, scénarios et sensibilité.",
    },
    conceptDetails: [
      {
        name: "DCF",
        definition:
          "Le Discounted Cash Flow actualise les flux de trésorerie futurs : la méthode la plus rigoureuse, car elle valorise ce que l'entreprise rapportera vraiment.",
      },
      {
        name: "WACC",
        definition:
          "Le coût moyen pondéré du capital : le taux qui reflète le risque de l'entreprise et sert à actualiser ses flux.",
      },
      {
        name: "Multiples",
        definition:
          "Valoriser par comparaison : EV/EBITDA, PER… On applique à l'entreprise les multiples observés sur des sociétés comparables.",
      },
      {
        name: "Analyse de sensibilité",
        definition:
          "Tester comment la valeur bouge quand les hypothèses changent : elle révèle ce qui compte vraiment dans le modèle.",
      },
      {
        name: "Terminal value",
        definition:
          "La valeur au-delà de l'horizon de prévision, souvent calculée par croissance perpétuelle. Elle représente fréquemment plus de la moitié du DCF.",
      },
    ],
    howItWorksTitle: "Valoriser par DCF",
    howItWorks: ["FLUX FUTURS", "TAUX D'ACTUALISATION", "VALEUR TERMINALE", "SOMME", "SENSIBILITÉ"],
    example: {
      title: "Combien vaut cette PME ?",
      steps: [
        "Prévision des flux de trésorerie sur 5 ans",
        "WACC calculé à 9 %",
        "Valeur terminale par croissance perpétuelle à 2 %",
        "Actualisation et somme des flux",
        "Fourchette de valeur après analyse de sensibilité",
      ],
    },
    projectsDetailed: [
      {
        title: "DCF complet d'une entreprise",
        flow: "Hypothèses → Flux → WACC → DCF → Sensibilité",
      },
      {
        title: "Fourchette de valorisation",
        flow: "DCF → Multiples → ANR → Fourchette défendue",
      },
    ],
  },

  // --------------------------------------------------------------- modelisation
  modelisation: {
    definition:
      "La modélisation financière construit des modèles robustes et auditables : modèle à trois états, scénarios, LBO. C'est l'ingénierie du tableur : un bon modèle se lit, se vérifie et se transmet.",
    whyLearn:
      "Les décisions d'investissement de plusieurs millions se prennent sur des modèles Excel. Un modèle opaque ou bourré d'erreurs est un risque professionnel majeur. La discipline de modélisation est ce qui sépare l'amateur du professionnel.",
    prerequisiteNotes: {
      "excel":
        "Les techniques de modélisation s'appuient sur une maîtrise avancée d'Excel.",
      "analyse-financiere":
        "La logique comptable des trois états structure tout modèle financier.",
    },
    conceptDetails: [
      {
        name: "Modèle 3 états",
        definition:
          "Le compte de résultat, le bilan et le tableau de trésorerie liés entre eux : la structure de base de tout modèle d'entreprise.",
      },
      {
        name: "Scénarios",
        definition:
          "Base, optimiste, pessimiste : faire varier les hypothèses pour encadrer l'incertitude au lieu de parier sur un seul futur.",
      },
      {
        name: "Modèle LBO",
        definition:
          "Le modèle d'acquisition par effet de levier : il simule l'achat d'une entreprise financé par de la dette et calcule le TRI pour l'investisseur.",
      },
      {
        name: "Audit de modèle",
        definition:
          "Vérifier un modèle existant : traçage des formules, tests de cohérence, recherche d'erreurs. Un réflexe avant toute décision.",
      },
      {
        name: "Bonnes pratiques FAST",
        definition:
          "Le standard de modélisation : flexibilité, structure appropriée, transparence. Des conventions qui rendent les modèles lisibles par tous.",
      },
    ],
    howItWorksTitle: "Construire un modèle 3 états",
    howItWorks: ["HYPOTHÈSES", "COMPTE DE RÉSULTAT", "BILAN", "TRÉSORERIE", "BOUCLAGE"],
    example: {
      title: "Modéliser un LBO",
      steps: [
        "Prix d'acquisition et structure de financement",
        "Compte de résultat prévisionnel sur 5 ans",
        "Tableau de dette : tirages, intérêts, remboursements",
        "Sortie à 5 ans et calcul du TRI",
        "Vérification du bouclage bilan-trésorerie",
      ],
    },
    projectsDetailed: [
      {
        title: "Modèle LBO complet",
        flow: "Acquisition → Financement → Prévisions → TRI → Contrôles",
      },
      {
        title: "Audit d'un modèle existant",
        flow: "Modèle reçu → Traçage → Tests → Rapport d'erreurs",
      },
    ],
  },

  // -------------------------------------------------------------------- marches
  marches: {
    definition:
      "Les marchés financiers sont les lieux où se rencontrent l'offre et la demande de capitaux : actions, obligations, dérivés. Ils fixent les prix des actifs et financent l'économie.",
    whyLearn:
      "Taux d'intérêt, cours des actions, devises : les marchés fixent le prix du capital et influencent chaque décision d'entreprise. Les comprendre, c'est comprendre où se forme la valeur et comment elle circule.",
    prerequisiteNotes: {
      "maths-fi":
        "Le prix des obligations et des dérivés repose sur l'actualisation et les probabilités.",
    },
    conceptDetails: [
      {
        name: "Actions & obligations",
        definition:
          "L'action est une part de propriété, l'obligation une créance : les deux instruments fondamentaux du financement des entreprises.",
      },
      {
        name: "Dérivés",
        definition:
          "Options, futures, swaps : des contrats dont la valeur dérive d'un actif sous-jacent. Outils de couverture — ou de spéculation.",
      },
      {
        name: "Indices",
        definition:
          "CAC 40, S&P 500 : des paniers qui mesurent la performance d'un marché et servent de référence aux investisseurs.",
      },
      {
        name: "Microstructure",
        definition:
          "Le fonctionnement concret des échanges : carnet d'ordres, teneurs de marché, latence. C'est là que le prix se forme réellement.",
      },
      {
        name: "Politique monétaire",
        definition:
          "L'action des banques centrales sur les taux : elle irrigue tous les prix d'actifs, des obligations aux actions.",
      },
    ],
    howItWorksTitle: "Comprendre la formation d'un prix",
    howItWorks: ["ORDRES", "CARNET", "CONFRONTATION", "PRIX", "INFORMATION"],
    example: {
      title: "Une introduction en bourse",
      steps: [
        "L'entreprise prépare son dossier d'introduction",
        "Fixation d'une fourchette de prix indicative",
        "Bookbuilding : les investisseurs annoncent leurs ordres",
        "Première cotation et fixation du prix",
        "Évolution du cours pendant les premiers jours",
      ],
    },
    projectsDetailed: [
      {
        title: "Suivi d'un portefeuille fictif",
        flow: "Sélection → Cours → Performance → Arbitrages",
      },
      {
        title: "Analyse d'une introduction en bourse",
        flow: "Prospectus → Valorisation → Prix → Performance post-IPO",
      },
    ],
  },

  // ------------------------------------------------------------- gestion-risque
  "gestion-risque": {
    definition:
      "La gestion du risque mesure et encadre l'incertitude des investissements : VaR, diversification, couverture, stress tests. Le rendement ne vaut que par son risque : c'est le cœur du métier d'investisseur.",
    whyLearn:
      "Chaque crise rappelle la même leçon : le risque mal mesuré détruit de la valeur. Savoir quantifier une perte potentielle, diversifier un portefeuille et se couvrir, c'est ce qui permet de prendre des risques en connaissance de cause — et d'en répondre.",
    prerequisiteNotes: {
      "marches":
        "Il faut connaître les instruments avant de mesurer le risque qu'ils portent.",
      "maths-fi":
        "La VaR et les modèles de risque reposent sur les probabilités et les statistiques.",
    },
    conceptDetails: [
      {
        name: "VaR & CVaR",
        definition:
          "La Value at Risk estime la perte maximale probable sur un horizon donné ; la CVaR mesure la perte moyenne au-delà. Les deux chiffres de base du pilotage du risque.",
      },
      {
        name: "Diversification",
        definition:
          "Répartir les investissements pour que les risques se compensent : le seul « repas gratuit » de la finance, à condition que les actifs ne soient pas corrélés.",
      },
      {
        name: "Couverture",
        definition:
          "Neutraliser un risque précis avec un instrument adapté (dérivé, actif refuge) : on paie une prime pour dormir tranquille.",
      },
      {
        name: "Stress tests",
        definition:
          "Rejouer des crises passées ou hypothétiques sur le portefeuille : que se passe-t-il si les marchés chutent de 30 % ?",
      },
      {
        name: "Bâle III",
        definition:
          "Le cadre réglementaire qui impose aux banques des coussins de fonds propres proportionnels à leurs risques.",
      },
    ],
    howItWorksTitle: "Mesurer le risque d'un portefeuille",
    howItWorks: ["POSITIONS", "DISTRIBUTION", "VAR", "STRESS TESTS", "LIMITES"],
    example: {
      title: "La VaR d'un portefeuille",
      steps: [
        "Inventaire des positions du portefeuille",
        "Historique des rendements de chaque actif",
        "Calcul de la VaR à 99 % sur 10 jours",
        "Stress test : rejouer la crise de 2008",
        "Mise en place de limites de risque",
      ],
    },
    projectsDetailed: [
      {
        title: "Calcul de VaR d'un portefeuille",
        flow: "Positions → Rendements → VaR → Interprétation",
      },
      {
        title: "Stratégie de couverture",
        flow: "Risque identifié → Instrument → Coût → Mise en place",
      },
    ],
  },

  // ------------------------------------------------------------- python-finance
  "python-finance": {
    definition:
      "Python appliqué à la finance automatise l'analyse quand Excel atteint ses limites : récupération de données via API, calculs sur de gros volumes, backtesting de stratégies. pandas est sa bibliothèque centrale.",
    whyLearn:
      "Les données financières sont massives et les analyses se répètent : Python les traite en secondes. Pour le quantitatif, la recherche et l'automatisation du reporting, c'est devenu un prérequis aussi important qu'Excel.",
    prerequisiteNotes: {
      "excel":
        "La logique d'analyse (ratios, séries temporelles) apprise sur Excel se transpose en code.",
      "analyse-financiere":
        "Il faut savoir ce qu'on calcule avant de l'automatiser.",
    },
    conceptDetails: [
      {
        name: "pandas finance",
        definition:
          "La bibliothèque de manipulation de données : séries temporelles, rendements, statistiques glissantes en quelques lignes.",
      },
      {
        name: "API (yfinance)",
        definition:
          "Récupérer gratuitement des cours et des données financières via des API : la matière première de toute analyse automatisée.",
      },
      {
        name: "Backtesting",
        definition:
          "Tester une stratégie d'investissement sur des données passées : indispensable avant de risquer un euro, à interpréter avec prudence.",
      },
      {
        name: "Visualisation",
        definition:
          "Tracer des graphiques clairs (matplotlib, plotly) : un backtest ne convainc que s'il se voit.",
      },
      {
        name: "Notebooks",
        definition:
          "Les carnets Jupyter mêlent code, résultats et commentaires : le format standard de l'analyse exploratoire partageable.",
      },
    ],
    howItWorksTitle: "Automatiser une analyse",
    howItWorks: ["DONNÉES", "NETTOYAGE", "CALCUL", "VISUALISATION", "AUTOMATISATION"],
    example: {
      title: "Backtester une stratégie",
      steps: [
        "Téléchargement des cours via yfinance",
        "Calcul des signaux avec pandas",
        "Simulation des trades sur le passé",
        "Mesure de la performance et du risque",
        "Comparaison avec un benchmark",
      ],
    },
    projectsDetailed: [
      {
        title: "Backtest d'une stratégie",
        flow: "Idée → Données → Simulation → Performance → Verdict",
      },
      {
        title: "Screener d'actions automatisé",
        flow: "Univers → Critères → Classement → Rapport hebdo",
      },
    ],
  },

  // ------------------------------------------------------------------ reporting
  reporting: {
    definition:
      "Le reporting financier transforme l'analyse en communication : notes d'investissement, tableaux de bord, présentations aux comités. Le chiffre ne parle pas tout seul : il faut le raconter.",
    whyLearn:
      "Une analyse brillante mal communiquée ne sert à rien. Les décideurs lisent des synthèses, pas des tableurs. Savoir structurer une note, choisir ses KPI et raconter une histoire avec les données, c'est ce qui fait passer l'analyse à la décision.",
    prerequisiteNotes: {
      "comptabilite":
        "La fiabilité du reporting dépend de la qualité des chiffres sources.",
      "excel":
        "Les tableaux de bord et les graphiques se construisent sur des données bien structurées.",
    },
    conceptDetails: [
      {
        name: "Notes d'analyse",
        definition:
          "Le document écrit qui présente une analyse et sa recommandation : structuré, sourcé, actionnable. Le livrable de base de l'analyste.",
      },
      {
        name: "Data storytelling",
        definition:
          "Raconter une histoire avec les données : un fil narratif, des visuels qui prouvent, une conclusion qui décide.",
      },
      {
        name: "KPI",
        definition:
          "Les indicateurs clés choisis pour piloter : peu nombreux, pertinents, suivis dans le temps. Tout le reste est du bruit.",
      },
      {
        name: "Présentation",
        definition:
          "Défendre une analyse devant un comité : clarté des slides, anticipation des objections, gestion du temps.",
      },
      {
        name: "Synthèse exécutive",
        definition:
          "La page qui résume tout pour un dirigeant pressé : question, réponse, chiffres clés, recommandation.",
      },
    ],
    howItWorksTitle: "Rédiger une note d'analyse",
    howItWorks: ["QUESTION", "DONNÉES", "ANALYSE", "SYNTHÈSE", "RECOMMANDATION"],
    example: {
      title: "Note sur un dossier d'investissement",
      steps: [
        "Question du comité : faut-il investir ?",
        "Collecte des états financiers et données de marché",
        "Analyse des ratios et du positionnement",
        "Synthèse en une page : constats et chiffres clés",
        "Recommandation argumentée et risques résiduels",
      ],
    },
    projectsDetailed: [
      {
        title: "Note d'investissement complète",
        flow: "Dossier → Analyse → Synthèse → Recommandation",
      },
      {
        title: "Présentation au comité",
        flow: "Note → Slides → Répétition → Soutenance",
      },
    ],
  },

  // -------------------------------------------------------------- investissement
  investissement: {
    definition:
      "La stratégie d'investissement passe de l'analyse à la décision : allocation d'actifs, thèse d'investissement, gestion de portefeuille. C'est l'aboutissement du parcours d'analyste : décider avec conviction et en rendre compte.",
    whyLearn:
      "L'analyse ne crée de valeur que si elle mène à une décision. Construire une thèse, dimensionner une position, gérer un portefeuille dans la durée : c'est là que se joue la performance — et la responsabilité — de l'investisseur.",
    prerequisiteNotes: {
      "valorisation":
        "On n'investit que dans ce qu'on sait valoriser.",
      "marches":
        "La décision s'exécute sur les marchés : il faut en connaître le fonctionnement.",
    },
    conceptDetails: [
      {
        name: "Allocation d'actifs",
        definition:
          "Répartir le capital entre actions, obligations, liquidités… : la décision qui explique l'essentiel de la performance d'un portefeuille.",
      },
      {
        name: "Thèse d'investissement",
        definition:
          "L'argumentaire écrit qui justifie une position : pourquoi cet actif, pourquoi maintenant, à quel prix sortir. Sans thèse, pas de discipline.",
      },
      {
        name: "Gestion de portefeuille",
        definition:
          "Le suivi dans la durée : rééquilibrage, prise de profits, coupes des pertes. La performance se construit autant qu'elle s'analyse.",
      },
      {
        name: "ESG",
        definition:
          "Les critères environnementaux, sociaux et de gouvernance : ils filtrent de plus en plus les décisions d'investissement, par conviction comme par réglementation.",
      },
      {
        name: "Due diligence",
        definition:
          "Vérifier avant d'investir : comptes, gouvernance, risques. La discipline qui évite les mauvaises surprises.",
      },
    ],
    howItWorksTitle: "Construire une thèse d'investissement",
    howItWorks: ["OPPORTUNITÉ", "ANALYSE", "VALORISATION", "THÈSE", "SUIVI"],
    example: {
      title: "Défendre un investissement",
      steps: [
        "Repérage d'une entreprise décotée par le marché",
        "Analyse financière complète et due diligence",
        "Valorisation par DCF et multiples",
        "Rédaction de la thèse : catalyseurs et risques",
        "Présentation au comité et suivi de la position",
      ],
    },
    projectsDetailed: [
      {
        title: "Thèse d'investissement défendue",
        flow: "Idée → Analyse → Thèse écrite → Soutenance",
      },
      {
        title: "Portefeuille modèle avec reporting",
        flow: "Allocation → Positions → Suivi → Reporting mensuel",
      },
    ],
  },
};

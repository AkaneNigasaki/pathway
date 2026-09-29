import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète des Statistiques pour la data science : du réflexe
 * descriptif aux tests d'hypothèses, avec Python (NumPy, pandas, matplotlib,
 * seaborn, SciPy). 3 niveaux d'information (Aperçu / Pratique / Approfondi)
 * avec divulgation progressive. Tous les textes supportent le code inline
 * entre backticks. Les exemples numériques sont des jouets explicites ou
 * des datasets publics réels (seaborn, scikit-learn) : aucune statistique
 * inventée présentée comme un fait.
 */
export const LEARNING_STATISTICS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce que sont les statistiques, pourquoi elles sont le socle de la data science et de l'IA, et ce qu'elles ne peuvent pas faire.",
    blocks: [
      {
        kind: "text",
        text: "Les statistiques sont l'art de tirer des conclusions rigoureuses à partir de données imparfaites : résumer des milliers de valeurs en quelques nombres, quantifier l'incertitude, et décider si un effet observé est réel ou un simple hasard. En data science, chaque modèle de machine learning repose dessus ; en analyse, elles séparent l'opinion éclairée de la simple intuition.",
      },
      {
        kind: "text",
        text: "Les statistiques transforment des données brutes en réponses fiables à des questions, en mesurant ce qu'on sait et ce qu'on ignore.",
      },
      {
        kind: "text",
        text: "On ne peut jamais mesurer une population entière (tous les clients, tous les utilisateurs). Les statistiques permettent de généraliser à partir d'un échantillon, en quantifiant le risque de se tromper.",
      },
      {
        kind: "text",
        text: "Résumer un dataset, comparer deux groupes, valider qu'un changement a un effet réel (test A/B), construire ou évaluer un modèle prédictif, décider sous incertitude.",
      },
      {
        kind: "fields",
        title: "Les statistiques : l'essentiel",
        fields: [
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni une baguette magique qui rend vraies des données mauvaises, ni un oracle : une statistique calculée sur un échantillon biaisé reste biaisée, aussi sophistiqué soit le calcul.",
          },
        ],
      },
      {
        kind: "text",
        text: "Deux branches à distinguer dès le départ. Les **statistiques descriptives** résument ce qu'on observe (moyenne, médiane, graphiques) : elles décrivent l'échantillon. Les **statistiques inférentielles** vont plus loin : elles estiment ce qui est vrai pour toute la population et testent des hypothèses (intervalles de confiance, tests). Cette page couvre les deux, dans cet ordre.",
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : question → données → réponse",
    level: 1,
    intro:
      "Le réflexe central : toute analyse statistique suit le même cycle, et l'incertitude fait partie de la réponse.",
    blocks: [
      {
        kind: "diagram",
        title: "Le cycle d'une analyse",
        lines: [
          "┌──────────┐    ┌──────────┐    ┌─────────────┐    ┌──────────┐",
          "│ QUESTION │───▶│ DONNÉES  │───▶│ EXPLORATION │───▶│ RÉPONSE  │",
          "│ précise  │    │échantillon│    │ décrire,    │    │ + marge  │",
          "└──────────┘    └──────────┘    │ visualiser  │    │d'erreur  │",
          "      ▲                        └─────────────┘    └──────────┘",
          "      └──────── la réponse soulève de nouvelles questions ────┘",
        ],
      },
      {
        kind: "fields",
        title: "Les trois idées à garder",
        fields: [
          {
            label: "La variabilité est partout",
            value:
              "Deux échantillons du même phénomène donnent deux résultats différents. Une statistique sans mesure de variabilité (écart-type, intervalle) est une demi-information.",
          },
          {
            label: "L'échantillon n'est pas la population",
            value:
              "Vous mesurez 1 000 clients, vous parlez de 1 million. La généralisation n'est légitime que si l'échantillon est représentatif : c'est le point le plus fragile de toute analyse.",
          },
          {
            label: "Un nombre ne prouve rien seul",
            value:
              "« +20 % » ne veut rien dire sans contexte : 20 % de quoi, sur combien d'observations, avec quelle variabilité, comparé à quoi ? Le réflexe statistique, c'est de poser ces questions avant de conclure.",
          },
        ],
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
    intro: "Ce qu'il faut (et ne faut pas) avant de commencer.",
    blocks: [
      {
        kind: "list",
        items: [
          "Python de base : variables, listes, boucles, fonctions, `import`. Pas besoin d'être expert.",
          "Maths de collège/lycée : fractions, pourcentages, notion de fonction. Le calcul avancé n'est pas requis pour démarrer.",
          "Un tableur (Excel, Google Sheets, LibreOffice) suffit pour l'intuition, mais cette page utilise Python car c'est l'outil professionnel de référence.",
          "Curiosité pour les données réelles : les statistiques s'apprennent en manipulant, pas en lisant des formules.",
        ],
      },
      {
        kind: "text",
        text: "Bonne nouvelle : 80 % de l'analyse professionnelle utilise les statistiques descriptives et quelques graphiques. Les tests d'hypothèses et la régression viennent après, quand les bases sont solides.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation de l'environnement",
    level: 2,
    intro:
      "Un environnement Python isolé avec les cinq bibliothèques scientifiques de référence.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier Python (3.9 ou plus récent recommandé)",
        command: "python --version",
        why: "Les bibliothèques scientifiques modernes exigent un Python récent. Cette commande confirme que Python est installé et affiche sa version.",
        verify: "Le terminal affiche quelque chose comme `Python 3.12.x`.",
      },
      {
        kind: "command",
        label: "Créer un environnement virtuel isolé",
        command: "python -m venv .venv",
        why: "Un environnement virtuel isole les paquets de ce projet de ceux des autres projets. En data science, les versions des bibliothèques comptent : l'isolation évite les conflits et rend l'analyse reproductible.",
        verify: "Un dossier `.venv/` apparaît dans le répertoire courant.",
      },
      {
        kind: "command",
        label: "Activer l'environnement (Windows)",
        command: ".venv\\Scripts\\activate",
        why: "L'activation fait en sorte que `python` et `pip` utilisent l'environnement isolé plutôt que l'installation système.",
        verify: "L'invite du terminal affiche `(.venv)` au début de la ligne.",
      },
      {
        kind: "command",
        label: "Activer l'environnement (macOS / Linux)",
        command: "source .venv/bin/activate",
        why: "Même objectif que sur Windows : basculer `python` et `pip` vers l'environnement isolé.",
        verify: "L'invite du terminal affiche `(.venv)` au début de la ligne.",
      },
      {
        kind: "command",
        label: "Installer la pile scientifique Python",
        command: "pip install numpy pandas matplotlib seaborn scipy",
        why: "`numpy` : calcul numérique et tableaux. `pandas` : manipulation de données tabulaires (le tableur de Python). `matplotlib` : graphiques de base. `seaborn` : graphiques statistiques élégants construits sur matplotlib. `scipy` : fonctions statistiques avancées (tests, distributions). Ce sont les cinq bibliothèques standard du domaine, toutes open source.",
        verify:
          "La commande suivante affiche `ok` sans erreur : `python -c \"import numpy, pandas, matplotlib, seaborn, scipy; print('ok')\"`.",
      },
    ],
  },
  {
    id: "environnement-de-travail",
    title: "Environnement de travail : notebook ou script",
    level: 2,
    intro: "Deux façons de travailler, complémentaires.",
    blocks: [
      {
        kind: "fields",
        title: "Notebook ou script : quand utiliser quoi",
        fields: [
          {
            label: "Notebook Jupyter",
            value:
              "Idéal pour explorer : on exécute le code cellule par cellule et on voit les tableaux et graphiques sous le code. C'est le standard de l'analyse exploratoire. Installation : `pip install jupyterlab`, lancement : `jupyter lab`.",
          },
          {
            label: "Script .py",
            value:
              "Idéal pour le code qui doit tourner de façon reproductible (nettoyage, rapport automatisé). S'exécute d'un bloc avec `python analyse.py`. Préférable dès que l'analyse devient un livrable.",
          },
          {
            label: "La règle pratique",
            value:
              "Explorez en notebook, livrez en script (ou en notebook nettoyé et ré-exécuté de haut en bas). Un notebook dont les cellules ont été exécutées dans le désordre est une source classique de résultats non reproductibles.",
          },
        ],
      },
      {
        kind: "command",
        label: "Installer JupyterLab",
        command: "pip install jupyterlab",
        why: "JupyterLab est l'interface notebook moderne : édition de notebooks, terminal et visualiseur de données dans le navigateur. Recommandé pour suivre cette page en manipulant.",
        verify: "`jupyter lab --version` affiche un numéro de version.",
      },
    ],
  },
  {
    id: "datasets-publics",
    title: "Datasets publics pour s'entraîner",
    level: 2,
    intro:
      "Des jeux de données réels, chargés en une ligne, parfaits pour apprendre sans chercher des données.",
    blocks: [
      {
        kind: "table",
        headers: ["Dataset", "Contenu", "Chargement"],
        rows: [
          [
            "Titanic",
            "Passagers du Titanic : survie, classe, âge, sexe",
            "`seaborn.load_dataset(\"titanic\")`",
          ],
          [
            "Penguins",
            "Manchots de l'Antarctique : espèce, taille du bec, masse",
            "`seaborn.load_dataset(\"penguins\")`",
          ],
          [
            "Iris",
            "Fleurs d'iris : 4 mesures pour 3 espèces",
            "`sklearn.datasets.load_iris()`",
          ],
          [
            "California Housing",
            "Logement en Californie : prix médian par district",
            "`sklearn.datasets.fetch_california_housing()`",
          ],
        ],
      },
      {
        kind: "text",
        text: "Ce sont des datasets publics réels, maintenus par les bibliothèques elles-mêmes : aucune donnée inventée, et tout le monde peut reproduire vos analyses. Le Titanic et les manchots sont les plus pédagogiques pour débuter : peu de colonnes, des questions naturelles (« qui a survécu ? », « les espèces diffèrent-elles ? »).",
      },
      {
        kind: "code",
        language: "python",
        title: "Charger le dataset Titanic",
        code: "import seaborn as sns\n\ntitanic = sns.load_dataset(\"titanic\")\nprint(titanic.shape)      # dimensions : lignes, colonnes\nprint(titanic.columns.tolist())  # noms des colonnes",
      },
    ],
  },
  {
    id: "premier-pas-pandas",
    title: "Premiers pas avec pandas",
    level: 2,
    intro: "Les trois réflexes : regarder, résumer, questionner.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Explorer un dataset en 5 lignes",
        code: "import seaborn as sns\n\ntitanic = sns.load_dataset(\"titanic\")\n\ntitanic.head()        # les 5 premières lignes : à quoi ressemblent les données ?\ntitanic.describe()    # résumé statistique des colonnes numériques\ntitanic[\"survived\"].mean()  # taux de survie global (0/1 -> la moyenne = la proportion)",
      },
      {
        kind: "fields",
        title: "Ce que fait chaque réflexe",
        fields: [
          {
            label: "`head()` — regarder",
            value:
              "Affiche les premières lignes. Vérifie que les colonnes sont celles attendues et repère les valeurs étranges. À faire avant tout calcul.",
          },
          {
            label: "`describe()` — résumer",
            value:
              "Compte, moyenne, écart-type, min, quartiles, max pour chaque colonne numérique. En dix secondes, vous savez si une colonne contient des valeurs impossibles (âge négatif, prix à zéro).",
          },
          {
            label: "Questionner une colonne",
            value:
              "`titanic[\"survived\"].mean()` : la colonne vaut 0 (mort) ou 1 (survécu), donc la moyenne est exactement la proportion de survivants. Traduire une question métier en opération sur une colonne, c'est le cœur du métier.",
          },
        ],
      },
    ],
  },
  {
    id: "premier-graphique",
    title: "Premier graphique",
    level: 2,
    intro: "Un histogramme : la distribution d'une variable en un coup d'œil.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Distribution des âges (Titanic)",
        code: "import seaborn as sns\nimport matplotlib.pyplot as plt\n\ntitanic = sns.load_dataset(\"titanic\")\n\nsns.histplot(data=titanic, x=\"age\", bins=20)\nplt.title(\"Distribution des âges des passagers\")\nplt.xlabel(\"Âge\")\nplt.ylabel(\"Nombre de passagers\")\nplt.show()",
      },
      {
        kind: "text",
        text: "L'histogramme découpe les âges en intervalles (`bins`) et compte les passagers dans chacun : on voit immédiatement où se concentrent les données, s'il y a des valeurs extrêmes, et si la forme est symétrique ou penchée. C'est le graphique le plus rentable à maîtriser : il répond à « à quoi ressemblent mes données ? » mieux que n'importe quel tableau.",
      },
    ],
  },
  {
    id: "vocabulaire-de-base",
    title: "Vocabulaire de base",
    level: 2,
    intro: "Cinq mots qui structurent tout le raisonnement statistique.",
    blocks: [
      {
        kind: "fields",
        title: "Le vocabulaire minimal",
        fields: [
          {
            label: "Population",
            value:
              "L'ensemble complet qu'on veut comprendre (tous les clients, tous les électeurs). On ne l'observe presque jamais en entier.",
          },
          {
            label: "Échantillon",
            value:
              "Le sous-ensemble qu'on mesure réellement (1 000 clients interrogés). Toute la statistique inférentielle consiste à remonter de l'échantillon vers la population.",
          },
          {
            label: "Variable",
            value:
              "Ce qu'on mesure sur chaque individu : l'âge (quantitative), la classe du billet (qualitative / catégorielle), la survie oui/non (binaire). Le type de variable détermine les outils utilisables.",
          },
          {
            label: "Paramètre",
            value:
              "Une quantité vraie mais inconnue de la population (ex. le vrai taux de survie). On le note souvent avec des lettres grecques, comme `μ` (mu) pour la moyenne.",
          },
          {
            label: "Statistique",
            value:
              "La même quantité calculée sur l'échantillon (ex. 38 % de survivants parmi les passagers listés). C'est une estimation du paramètre, avec une marge d'erreur.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-analyse",
    title: "Le workflow d'une analyse",
    level: 2,
    intro: "La méthode en 5 étapes, du flou à la conclusion.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Formuler une question précise",
            detail:
              "« Les passagers de 1re classe ont-ils mieux survécu que ceux de 3e ? » plutôt que « analyser la survie ». Une question floue donne une analyse floue.",
          },
          {
            title: "Connaître ses données",
            detail:
              "`head()`, `describe()`, `info()`, compter les valeurs manquantes. La moitié des erreurs d'analyse viennent d'une donnée mal comprise (unité, encodage, période).",
          },
          {
            title: "Explorer visuellement",
            detail:
              "Histogrammes, boîtes à moustaches, nuages de points. L'œil détecte en secondes ce que les chiffres cachent : groupes, anomalies, tendances.",
          },
          {
            title: "Quantifier rigoureusement",
            detail:
              "Résumés numériques, comparaisons de groupes, tests si besoin. C'est ici qu'interviennent moyenne, écart-type, p-value — jamais avant l'exploration.",
          },
          {
            title: "Communiquer honnêtement",
            detail:
              "Un graphique clair, les limites de l'analyse, ce qu'on ne peut pas conclure. Une analyse dont on tait les limites est une analyse à moitié fausse.",
          },
        ],
      },
    ],
  },
  {
    id: "editeurs",
    title: "Éditeurs et outils",
    level: 2,
    intro: "Les environnements courants pour la data science Python.",
    blocks: [
      {
        kind: "fields",
        title: "Les options, sans classement",
        fields: [
          {
            label: "JupyterLab",
            value:
              "L'interface notebook de référence : code, tableaux et graphiques dans le navigateur. Idéal pour l'exploration et l'apprentissage.",
          },
          {
            label: "VS Code",
            value:
              "Éditeur polyvalent avec l'extension Python et le support natif des notebooks. Bon compromis exploration / code propre.",
          },
          {
            label: "PyCharm",
            value:
              "IDE complet avec excellent débogueur et inspections de code. Pertinent quand l'analyse devient une application.",
          },
          {
            label: "Google Colab / Kaggle",
            value:
              "Notebooks dans le cloud, gratuits, avec accès GPU. Pratiques pour s'entraîner sans rien installer, ou pour le calcul lourd.",
          },
        ],
      },
      {
        kind: "text",
        text: "Quel que soit l'outil, deux réglages comptent : que l'interpréteur Python utilisé soit celui du `.venv` du projet, et que le notebook soit ré-exécuté de haut en bas avant d'être partagé.",
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI : statistiques descriptives
  // ------------------------------------------------------------------
  {
    id: "moyenne",
    title: "La moyenne",
    level: 3,
    intro: "Le résumé le plus utilisé — et le plus trompeur quand on l'utilise seul.",
    blocks: [
      {
        kind: "text",
        text: "La moyenne est la somme des valeurs divisée par leur nombre : le « centre de gravité » des données.",
      },
      {
        kind: "text",
        text: "Elle résume un grand nombre de valeurs en un seul nombre comparable : comparer deux moyennes est plus simple que comparer deux distributions entières.",
      },
      {
        kind: "text",
        text: "Données à peu près symétriques, sans valeurs extrêmes (tailles, températures, notes d'examen).",
      },
      {
        kind: "fields",
        title: "La moyenne, en format pédagogique",
        fields: [
          {
            label: "Erreur fréquente",
            value:
              "La moyenne est très sensible aux valeurs extrêmes : un seul milliardaire fait exploser la « richesse moyenne » d'un village. Quand des extrêmes existent, la médiane est plus honnête.",
          },
          {
            label: "Bonne pratique",
            value:
              "Ne jamais présenter une moyenne sans un indicateur de dispersion (écart-type) ou un graphique. « Moyenne : 11 » ne dit rien de la répartition.",
          },
          {
            label: "Concepts liés",
            value: "Médiane, écart-type, distribution.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Moyenne sur un exemple jouet",
        code: "import numpy as np\n\n# Exemple jouet : 5 notes sur 20\nnotes = [10, 12, 8, 14, 11]\n\nmoyenne = np.mean(notes)\nprint(moyenne)  # 11.0  (somme 55 / 5)",
      },
    ],
  },
  {
    id: "mediane-et-mode",
    title: "Médiane et mode",
    level: 3,
    intro: "Les deux autres façons de dire « le centre » — plus robustes.",
    blocks: [
      {
        kind: "fields",
        title: "Médiane et mode",
        fields: [
          {
            label: "Médiane — en une phrase",
            value:
              "La valeur du milieu quand les données sont triées : la moitié des observations est en dessous, l'autre moitié au-dessus.",
          },
          {
            label: "Médiane — pourquoi",
            value:
              "Elle ignore les valeurs extrêmes : avec [10, 10, 10, 10, 50], la médiane vaut 10 (représentatif) quand la moyenne vaut 18 (trompeur). C'est pourquoi les salaires et les prix immobiliers se résument en médiane.",
          },
          {
            label: "Mode — en une phrase",
            value:
              "La valeur la plus fréquente. Le seul « centre » utilisable pour des données catégorielles (ex. la classe de billet la plus vendue).",
          },
          {
            label: "Quand utiliser quoi",
            value:
              "Distribution symétrique sans extrême → moyenne. Extrêmes ou asymétrie → médiane. Données catégorielles → mode. En cas de doute, affichez les trois : leur écart raconte une histoire.",
          },
          {
            label: "Bonne pratique",
            value:
              "Si moyenne et médiane diffèrent nettement, ne choisissez pas « la plus flatteuse » : montrez les deux et expliquez l'écart (c'est souvent là que se cache l'information intéressante).",
          },
          {
            label: "Concepts liés",
            value: "Moyenne, asymétrie, quartiles.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Médiane et mode (exemple jouet)",
        code: "import numpy as np\nfrom scipy import stats\n\nnotes = [10, 12, 8, 14, 11]\nprint(np.median(notes))            # 11.0 : valeur centrale une fois trié\nprint(stats.mode(notes).mode)     # 8 : ici chaque valeur apparaît une fois,\n                                  # le mode a peu de sens sur si peu de données",
      },
    ],
  },
  {
    id: "variance-et-ecart-type",
    title: "Variance et écart-type",
    level: 3,
    intro: "Mesurer la dispersion : à quel point les données s'étalent autour du centre.",
    blocks: [
      {
        kind: "text",
        text: "La variance est la moyenne des carrés des écarts à la moyenne ; l'écart-type est sa racine carrée, exprimée dans la même unité que les données.",
      },
      {
        kind: "text",
        text: "Deux groupes peuvent avoir la même moyenne et être radicalement différents : [10, 11, 12] et [0, 11, 22] ont la même moyenne (11) mais pas le même écart-type. Sans dispersion, la moyenne est aveugle.",
      },
      {
        kind: "fields",
        title: "Dispersion, en format pédagogique",
        fields: [          {
            label: "Comment ça fonctionne",
            value:
              "On mesure pour chaque valeur son écart à la moyenne, on met au carré (pour que les écarts positifs et négatifs ne s'annulent pas), on moyenne. La racine carrée ramène le résultat dans l'unité d'origine : un écart-type de 2 sur des notes /20 se lit directement.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Confondre variance population et variance échantillon. `numpy.std` divise par n (population) par défaut, `pandas.std` divise par n-1 (échantillon, `ddof=1`). Sur de gros échantillons la différence est négligeable, mais il faut savoir laquelle on calcule.",
          },
          {
            label: "Bonne pratique",
            value:
              "Présentez toujours « moyenne ± écart-type » ensemble, et précisez `ddof` quand la distinction compte (petits échantillons, publications).",
          },
          {
            label: "Concepts liés",
            value: "Moyenne, loi normale, intervalle de confiance.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Écart-type : population vs échantillon",
        code: "import numpy as np\n\nnotes = [10, 12, 8, 14, 11]  # exemple jouet\n\nprint(np.std(notes))             # 2.0 : divisé par n (population)\nprint(np.std(notes, ddof=1))     # 2.236... : divisé par n-1 (échantillon)\n\nimport pandas as pd\ns = pd.Series(notes)\nprint(s.std())                   # 2.236... : pandas utilise ddof=1 par défaut",
      },
    ],
  },
  {
    id: "quartiles-et-boxplot",
    title: "Quartiles et boîte à moustaches",
    level: 3,
    intro: "Découper la distribution en quatre pour voir sa structure.",
    blocks: [
      {
        kind: "text",
        text: "Les quartiles découpent les données triées en quatre parts égales : Q1 (25 % en dessous), la médiane Q2 (50 %), Q3 (75 % en dessous).",
      },
      {
        kind: "text",
        text: "Ils décrivent la forme de la distribution avec 5 nombres (min, Q1, médiane, Q3, max) : on voit où se concentrent les données et s'il y a des valeurs aberrantes, sans aucun graphique.",
      },
      {
        kind: "fields",
        title: "Quartiles, en format pédagogique",
        fields: [          {
            label: "La boîte à moustaches",
            value:
              "Le graphique qui dessine ces 5 nombres : une boîte de Q1 à Q3 (50 % des données), une ligne pour la médiane, des « moustaches » jusqu'aux valeurs non-aberrantes, et les points aberrants isolés. Idéal pour comparer plusieurs groupes d'un coup d'œil.",
          },
          {
            label: "L'écart interquartile (IQR)",
            value:
              "`IQR = Q3 - Q1` : l'étendue des 50 % centrales. Règle pratique : une valeur à plus de 1,5 × IQR de la boîte est signalée comme aberrante potentielle — potentielle, pas forcément fausse.",
          },
          {
            label: "Concepts liés",
            value: "Médiane, valeurs aberrantes, percentiles.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Quartiles et boxplot (Titanic)",
        code: "import seaborn as sns\nimport matplotlib.pyplot as plt\n\ntitanic = sns.load_dataset(\"titanic\")\n\nprint(titanic[\"age\"].quantile([0.25, 0.5, 0.75]))  # Q1, médiane, Q3\n\nsns.boxplot(data=titanic, x=\"pclass\", y=\"age\")\nplt.title(\"Âge par classe : la 3e classe voyage plus jeune\")\nplt.show()",
      },
    ],
  },
  {
    id: "forme-distribution",
    title: "Forme d'une distribution : asymétrie",
    level: 3,
    intro: "Savoir lire si les données penchent d'un côté.",
    blocks: [
      {
        kind: "text",
        text: "Une distribution est asymétrique quand une « queue » s'étire d'un côté : à droite (quelques très grandes valeurs, ex. revenus), à gauche (quelques très petites valeurs).",
      },
      {
        kind: "fields",
        title: "Asymétrie (skewness)",
        fields: [          {
            label: "Pourquoi ça compte",
            value:
              "L'asymétrie décide quel résumé est honnête : distribution très asymétrique à droite → la moyenne dépasse la médiane et surestime le « typique ». C'est le cas des revenus, des prix, des temps d'attente.",
          },
          {
            label: "Comment la voir",
            value:
              "Un histogramme suffit : la queue indique le sens. Numériquement, `scipy.stats.skew` renvoie ~0 pour une distribution symétrique, > 0 pour une queue à droite, < 0 pour une queue à gauche.",
          },
          {
            label: "Bonne pratique",
            value:
              "Sur des données très asymétriques, envisagez une transformation (souvent le logarithme) avant de modéliser : beaucoup d'outils supposent une symétrie approximative.",
          },
          {
            label: "Concepts liés",
            value: "Moyenne vs médiane, loi normale, boxplot.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Mesurer l'asymétrie (dataset jouet explicite)",
        code: "import numpy as np\nfrom scipy import stats\n\n# Jouet : revenus mensuels fictifs, un très haut revenu tire la queue à droite\nrevenus = [2000, 2200, 2100, 2300, 2050, 2150, 20000]\n\nprint(\"moyenne :\", np.mean(revenus))    # ~4642 : tirée par l'extrême\nprint(\"médiane :\", np.median(revenus))  # 2150 : le « typique »\nprint(\"skew    :\", round(stats.skew(revenus), 2))  # > 0 : queue à droite",
      },
    ],
  },
  {
    id: "matplotlib-bases",
    title: "matplotlib : les bases",
    level: 3,
    intro: "La bibliothèque de graphiques fondatrice de l'écosystème Python.",
    blocks: [
      {
        kind: "text",
        text: "`matplotlib` est la bibliothèque de visualisation historique de Python : tout l'écosystème (seaborn, pandas) dessine sur ses figures. La comprendre, c'est pouvoir personnaliser n'importe quel graphique. Le concept clé : une `Figure` contient un ou plusieurs `Axes` (les zones de tracé) ; on trace sur les axes, on règle titres et labels, on affiche ou on sauvegarde.",
      },
      {
        kind: "code",
        language: "python",
        title: "Anatomie d'une figure matplotlib",
        code: "import matplotlib.pyplot as plt\nimport numpy as np\n\nx = [1, 2, 3, 4, 5]       # exemple jouet\n\ny = [2, 4, 6, 8, 10]\n\nfig, ax = plt.subplots()    # Figure + un Axes\nax.plot(x, y, marker=\"o\")   # tracé sur l'axe\nax.set_title(\"Relation linéaire parfaite (jouet)\")\nax.set_xlabel(\"x\")\nax.set_ylabel(\"y\")\nfig.savefig(\"graphique.png\", dpi=150)  # sauvegarde pour un rapport\nplt.show()",
      },
      {
        kind: "fields",
        title: "Bonnes pratiques matplotlib",
        fields: [
          {
            label: "Toujours titrer et légender",
            value:
              "Un graphique sans titre ni labels d'axes est inutilisable dans un rapport : `set_title`, `set_xlabel`, `set_ylabel` sont non négociables.",
          },
          {
            label: "Sauvegarder en haute résolution",
            value:
              "`savefig(..., dpi=150)` minimum pour un document. Le PNG suffit pour le web et les rapports ; le PDF/SVG pour l'impression.",
          },
          {
            label: "Une figure = un message",
            value:
              "Si vous devez expliquer votre graphique plus de deux phrases, simplifiez-le. Le graphique doit parler avant le texte.",
          },
        ],
      },
    ],
  },
  {
    id: "seaborn-bases",
    title: "seaborn : graphiques statistiques",
    level: 3,
    intro: "Des graphiques statistiques expressifs en une ligne, construits sur matplotlib.",
    blocks: [
      {
        kind: "text",
        text: "`seaborn` est une surcouche de matplotlib pensée pour les statistiques : elle comprend les DataFrames pandas directement, calcule les résumés à la volée (moyennes par groupe, intervalles), et produit des graphiques propres par défaut. En analyse exploratoire, c'est l'outil le plus rentable.",
      },
      {
        kind: "code",
        language: "python",
        title: "Les trois graphiques essentiels (Titanic)",
        code: "import seaborn as sns\nimport matplotlib.pyplot as plt\n\ntitanic = sns.load_dataset(\"titanic\")\n\n# 1. Distribution d'une variable numérique\nsns.histplot(data=titanic, x=\"fare\", bins=30)\nplt.title(\"Distribution des prix du billet\")\nplt.show()\n\n# 2. Comparer des groupes : survie selon la classe\nsns.barplot(data=titanic, x=\"pclass\", y=\"survived\")\nplt.title(\"Taux de survie par classe\")\nplt.show()\n\n# 3. Relation entre deux variables numériques\nsns.scatterplot(data=titanic, x=\"age\", y=\"fare\", hue=\"survived\")\nplt.title(\"Âge vs prix, coloré par survie\")\nplt.show()",
      },
      {
        kind: "fields",
        title: "Lire ces graphiques",
        fields: [
          {
            label: "`histplot`",
            value:
              "La forme de la distribution : où sont les données, y a-t-il plusieurs bosses (plusieurs sous-populations ?), des extrêmes ?",
          },
          {
            label: "`barplot` avec une variable 0/1",
            value:
              "La hauteur des barres = la moyenne = la proportion. Ici : le taux de survie par classe, avec l'intervalle de confiance dessiné automatiquement.",
          },
          {
            label: "`scatterplot` avec `hue`",
            value:
              "Chaque point est un passager, la couleur indique la survie : on cherche visuellement si les survivants se regroupent quelque part.",
          },
        ],
      },
    ],
  },
  {
    id: "choisir-son-graphique",
    title: "Choisir le bon graphique",
    level: 3,
    intro: "Le bon graphique dépend de la question, pas des goûts.",
    blocks: [
      {
        kind: "table",
        headers: ["Question", "Graphique", "Fonction seaborn"],
        rows: [
          ["Comment se répartit une variable ?", "Histogramme", "`histplot`"],
          ["Deux groupes diffèrent-ils ?", "Boîte à moustaches", "`boxplot`"],
          ["Deux variables sont-elles liées ?", "Nuage de points", "`scatterplot`"],
          ["Une proportion par catégorie ?", "Barres", "`barplot` / `countplot`"],
          ["Une évolution dans le temps ?", "Courbe", "`lineplot`"],
          ["Toutes les corrélations d'un coup ?", "Carte de chaleur", "`heatmap`"],
          ["Deux distributions à comparer ?", "Histogrammes superposés", "`histplot(hue=...)`"],
        ],
      },
      {
        kind: "fields",
        title: "Règles de choix",
        fields: [
          {
            label: "Variable catégorielle → barres",
            value:
              "On compte par catégorie : diagramme en barres (`countplot`). Le camembert (« pie ») est à éviter : l'œil compare mal les angles.",
          },
          {
            label: "Variable numérique → histogramme ou boîte",
            value:
              "Un seul groupe : histogramme. Plusieurs groupes à comparer : boîtes à moustaches côte à côte.",
          },
          {
            label: "Deux numériques → nuage de points",
            value:
              "La forme du nuage (ligne, courbe, amas, bruit) en dit plus que le coefficient de corrélation seul.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Le graphique 3D, les doubles axes Y non justifiés et les pictogrammes proportionnels : trois façons classiques de rendre un graphique mensonger sans truquer les données.",
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI : probabilités
  // ------------------------------------------------------------------
  {
    id: "probabilites-bases",
    title: "Probabilités : les bases",
    level: 3,
    intro: "Le langage de l'incertitude : un nombre entre 0 et 1.",
    blocks: [
      {
        kind: "text",
        text: "Une probabilité mesure la plausibilité d'un événement : 0 = impossible, 1 = certain, 0,5 = une chance sur deux.",
      },
      {
        kind: "text",
        text: "Tout le raisonnement statistique est probabiliste : « ce médicament est-il efficace ? » se traduit en « quelle est la probabilité d'observer cet effet par hasard ? ». Sans probabilités, pas de tests, pas d'intervalles de confiance, pas de machine learning.",
      },
      {
        kind: "fields",
        title: "Probabilités, en format pédagogique",
        fields: [          {
            label: "Les trois règles de base",
            value:
              "Complément : P(pas A) = 1 − P(A). Addition (événements incompatibles) : P(A ou B) = P(A) + P(B). Multiplication (événements indépendants) : P(A et B) = P(A) × P(B).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Multiplier des probabilités quand les événements ne sont pas indépendants. « 1 % de risque par an pendant 10 ans » ne fait pas 10 % (les années ne sont pas disjointes) : le bon calcul est 1 − 0,99^10 ≈ 9,6 %.",
          },
          {
            label: "Concepts liés",
            value: "Probabilités conditionnelles, distributions, tests d'hypothèses.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Vérifier une probabilité par simulation (dé à 6 faces)",
        code: "import numpy as np\n\nrng = np.random.default_rng(42)  # graine fixée : simulation reproductible\n\nlancers = rng.integers(1, 7, size=100_000)  # 100 000 lancers simulés\nprob_6 = (lancers == 6).mean()\nprint(prob_6)  # ~0.1667 : on retrouve 1/6 par l'expérience",
      },
      {
        kind: "text",
        text: "La simulation Monte-Carlo ci-dessus illustre la loi des grands nombres : plus on répète l'expérience, plus la fréquence observée se rapproche de la probabilité théorique. C'est aussi une méthode pratique pour estimer des probabilités trop complexes à calculer à la main.",
      },
    ],
  },
  {
    id: "probabilites-conditionnelles",
    title: "Probabilités conditionnelles et Bayes",
    level: 3,
    intro: "Mettre à jour ses croyances quand de nouvelles informations arrivent.",
    blocks: [
      {
        kind: "text",
        text: "P(A sachant B) est la probabilité de A quand on sait déjà que B est arrivé : l'information change la probabilité.",
      },
      {
        kind: "fields",
        title: "Conditionnement, en format pédagogique",
        fields: [          {
            label: "Exemple",
            value:
              "La probabilité qu'un passager ait survécu sachant qu'il voyageait en 1re classe n'est pas le taux de survie global : la classe apporte de l'information. C'est le principe de toute prédiction.",
          },
          {
            label: "Le théorème de Bayes — en une phrase",
            value:
              "Il inverse le conditionnement : passer de « probabilité du symptôme sachant la maladie » à « probabilité de la maladie sachant le symptôme ». C'est le fondement des filtres anti-spam, du diagnostic médical et de l'IA bayésienne.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Confondre P(test positif sachant malade) avec P(malade sachant test positif). Un test fiable à 99 % sur une maladie rare (1 cas sur 10 000) donne majoritairement des faux positifs : c'est le paradoxe des faux positifs, purement mathématique.",
          },
          {
            label: "Concepts liés",
            value: "Tests d'hypothèses, classification, machine learning.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Probabilité conditionnelle (Titanic)",
        code: "import seaborn as sns\n\ntitanic = sns.load_dataset(\"titanic\")\n\n# P(survie) global vs P(survie | 1re classe)\nprint(titanic[\"survived\"].mean())\nprint(titanic[titanic[\"pclass\"] == 1][\"survived\"].mean())\n# La classe apporte de l'information : les deux nombres diffèrent nettement",
      },
    ],
  },
  {
    id: "loi-normale",
    title: "La loi normale",
    level: 3,
    intro: "La distribution en cloche : la plus célèbre, et la plus sur-utilisée.",
    blocks: [
      {
        kind: "text",
        text: "Une distribution symétrique en forme de cloche, entièrement décrite par sa moyenne et son écart-type : tailles, erreurs de mesure, et bien d'autres phénomènes s'en approchent.",
      },
      {
        kind: "fields",
        title: "Loi normale, en format pédagogique",
        fields: [          {
            label: "Pourquoi elle est partout",
            value:
              "Le théorème central limite (voir section dédiée) fait que les moyennes d'échantillons suivent approximativement une loi normale même quand les données de base ne la suivent pas. Beaucoup de tests classiques la supposent.",
          },
          {
            label: "La règle 68-95-99,7",
            value:
              "Pour une loi normale : ~68 % des valeurs sont à ±1 écart-type de la moyenne, ~95 % à ±2, ~99,7 % à ±3. C'est la base intuitive des intervalles de confiance.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Supposer la normalité sans vérifier. Revenus, prix, durées : souvent asymétriques, pas normales. Un histogramme ou un test de normalité (`scipy.stats.normaltest`) tranche en secondes.",
          },
          {
            label: "Concepts liés",
            value: "Théorème central limite, intervalles de confiance, tests.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Visualiser une loi normale",
        code: "import numpy as np\nimport matplotlib.pyplot as plt\nfrom scipy import stats\n\nx = np.linspace(-4, 4, 200)\nplt.plot(x, stats.norm.pdf(x))  # densité de la loi normale centrée réduite\nplt.title(\"Densité de la loi normale (moyenne 0, écart-type 1)\")\nplt.show()\n\n# Probabilité d'être à plus de 2 écarts-types : ~5 %\nprint(1 - stats.norm.cdf(2) + stats.norm.cdf(-2))",
      },
    ],
  },
  {
    id: "loi-binomiale",
    title: "La loi binomiale",
    level: 3,
    intro: "Compter les succès quand on répète une expérience oui/non.",
    blocks: [
      {
        kind: "text",
        text: "Si on répète n fois une expérience avec probabilité de succès p (indépendante à chaque fois), la loi binomiale donne la probabilité d'obtenir exactement k succès.",
      },
      {
        kind: "text",
        text: "Taux de conversion (« sur 1 000 visiteurs, combien achètent ? »), tests A/B, contrôle qualité, sondages : partout où l'on compte des succès parmi des essais.",
      },
      {
        kind: "fields",
        title: "Loi binomiale, en format pédagogique",
        fields: [          {
            label: "Exemple",
            value:
              "Une pièce équilibrée lancée 10 fois : la probabilité d'obtenir exactement 5 piles est ~24,6 % — pas 100 %, pas 50 %. L'intuition sous-estime systématiquement la variabilité des petits échantillons.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier la condition d'indépendance : des visiteurs qui s'influencent (bouche-à-oreille), des mesures répétées sur les mêmes personnes — la binomiale ne s'applique plus directement.",
          },
          {
            label: "Concepts liés",
            value: "Probabilités, tests de proportion, tests A/B.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Loi binomiale avec SciPy",
        code: "from scipy import stats\n\n# 10 lancers d'une pièce équilibrée : P(exactement 5 piles) ?\nprint(stats.binom.pmf(k=5, n=10, p=0.5))   # ~0.246\n\n# P(8 piles ou plus) : la queue de distribution\nprint(stats.binom.sf(k=7, n=10, p=0.5))    # P(X > 7)",
      },
    ],
  },
  {
    id: "theoreme-central-limite",
    title: "Le théorème central limite",
    level: 3,
    intro: "Pourquoi la moyenne est la statistique la mieux comprise.",
    blocks: [
      {
        kind: "text",
        text: "La moyenne d'un échantillon assez grand suit approximativement une loi normale, quelle que soit la distribution des données d'origine.",
      },
      {
        kind: "fields",
        title: "Théorème central limite, en format pédagogique",
        fields: [          {
            label: "Pourquoi c'est fondamental",
            value:
              "C'est ce théorème qui justifie les intervalles de confiance et la plupart des tests sur les moyennes : même avec des données non normales, la moyenne se comporte « normalement » dès que n est assez grand (en pratique, quelques dizaines d'observations suffisent souvent).",
          },
          {
            label: "L'intuition",
            value:
              "Chaque observation apporte du bruit dans tous les sens ; en moyennant, les bruits se compensent et il reste une fluctuation symétrique en cloche autour de la vraie moyenne. Plus n grandit, plus la cloche se resserre (écart-type divisé par √n).",
          },
          {
            label: "Limite",
            value:
              "« Assez grand » dépend de l'asymétrie des données : très asymétriques → il faut plus d'observations. Et le théorème parle de la moyenne, pas des données elles-mêmes.",
          },
          {
            label: "Concepts liés",
            value: "Loi normale, intervalles de confiance, erreur standard.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Voir le théorème à l'œuvre (simulation)",
        code: "import numpy as np\nimport matplotlib.pyplot as plt\n\nrng = np.random.default_rng(0)\n# Données d'origine TRÈS asymétriques (exponentielle, jouet)\ndonnees = rng.exponential(scale=1.0, size=100_000)\n\n# Moyennes de 1000 échantillons de taille 50\nmoyennes = [rng.choice(donnees, size=50).mean() for _ in range(1000)]\n\nplt.hist(moyennes, bins=30)\nplt.title(\"Distribution des moyennes : une cloche, malgré des données asymétriques\")\nplt.show()",
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI : corrélation et causalité
  // ------------------------------------------------------------------
  {
    id: "correlation",
    title: "La corrélation",
    level: 3,
    intro: "Mesurer si deux variables bougent ensemble — et dans quel sens.",
    blocks: [
      {
        kind: "text",
        text: "Le coefficient de corrélation (Pearson, noté r) mesure la force et le sens d'une relation linéaire entre deux variables : de −1 (opposées) à +1 (ensemble), 0 signifiant « pas de relation linéaire ».",
      },
      {
        kind: "text",
        text: "C'est le premier test d'une hypothèse de lien : avant de modéliser, on vérifie si les variables bougent ensemble. Une matrice de corrélation (`df.corr()`) est un réflexe d'exploration.",
      },
      {
        kind: "fields",
        title: "Corrélation, en format pédagogique",
        fields: [          {
            label: "Comment ça fonctionne",
            value:
              "On compare pour chaque point si les deux variables s'écartent de leur moyenne dans le même sens. Si oui systématiquement, r est proche de 1 ; si c'est aléatoire, r est proche de 0.",
          },
          {
            label: "Erreur fréquente",
            value:
              "r = 0 ne veut pas dire « aucune relation » : il veut dire « aucune relation LINÉAIRE ». Une relation en U ou en cloche donne r ≈ 0. Toujours regarder le nuage de points avant le coefficient.",
          },
          {
            label: "Concepts liés",
            value: "Nuage de points, régression, causalité.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Corrélation : coefficient + nuage de points",
        code: "import seaborn as sns\nimport matplotlib.pyplot as plt\n\ntitanic = sns.load_dataset(\"titanic\")\n\n# Matrice de corrélation des colonnes numériques\nprint(titanic[[\"age\", \"fare\", \"sibsp\", \"parch\"]].corr().round(2))\n\n# Le nuage de points correspondant : la forme avant le chiffre\nsns.scatterplot(data=titanic, x=\"age\", y=\"fare\")\nplt.show()",
      },
    ],
  },
  {
    id: "correlation-vs-causalite",
    title: "Corrélation n'est pas causalité",
    level: 3,
    intro: "Le piège central des statistiques : deux choses liées ne se causent pas forcément.",
    blocks: [
      {
        kind: "text",
        text: "C'est l'erreur d'interprétation la plus coûteuse : observer que A et B bougent ensemble et conclure que A cause B. Trois explications sont toujours possibles : A cause B, B cause A, ou une troisième variable C cause les deux (variable confondante). Sans expérience contrôlée, les données d'observation ne tranchent pas entre ces trois scénarios.",
      },
      {
        kind: "fields",
        title: "Les trois scénarios, avec un exemple illustratif",
        fields: [
          {
            label: "A cause B",
            value:
              "Fumer cause le cancer du poumon : établi par des décennies d'études convergentes, pas par une seule corrélation.",
          },
          {
            label: "B cause A (causalité inversée)",
            value:
              "Les villes avec plus de pompiers ont plus d'incendies : ce sont les incendies qui appellent les pompiers, pas l'inverse.",
          },
          {
            label: "C cause A et B (confusion)",
            value:
              "Exemple classique : les ventes de glaces et les noyades augmentent ensemble — la chaleur (C) cause les deux. Agir sur les glaces ne réduirait aucune noyade.",
          },
          {
            label: "Comment trancher",
            value:
              "L'expérience randomisée contrôlée (test A/B) : on tire au hasard qui reçoit le traitement, ce qui neutralise les variables confondantes. C'est l'étalon-or de la causalité.",
          },
          {
            label: "Bonne pratique",
            value:
              "Dans un rapport, écrivez « associé à », « lié à », jamais « cause » ni « prouve », sauf si le design de l'étude le permet (expérience contrôlée).",
          },
        ],
      },
    ],
  },
  {
    id: "paradoxe-de-simpson",
    title: "Le paradoxe de Simpson",
    level: 3,
    intro: "Quand le total raconte l'inverse des détails.",
    blocks: [
      {
        kind: "text",
        text: "Le paradoxe de Simpson : une tendance observée dans chaque sous-groupe s'inverse quand on agrège les données. Il apparaît quand les groupes ont des tailles très différentes et qu'une variable cachée influence à la fois le groupe et le résultat. Moralité : toujours regarder les données par sous-groupe avant de conclure sur le total.",
      },
      {
        kind: "fields",
        title: "Exemple fictif : deux départements universitaires",
        fields: [
          {
            label: "Département facile",
            value:
              "Candidats A : 180 admis sur 200 (90 %). Candidats B : 10 admis sur 10 (100 %). → B meilleur.",
          },
          {
            label: "Département sélectif",
            value:
              "Candidats A : 2 admis sur 10 (20 %). Candidats B : 25 admis sur 100 (25 %). → B meilleur.",
          },
          {
            label: "Total agrégé",
            value:
              "Candidats A : 182 admis sur 210 (~87 %). Candidats B : 35 admis sur 110 (~32 %). → A meilleur !",
          },
          {
            label: "L'explication",
            value:
              "Les candidats B postulent massivement au département sélectif (difficile pour tout le monde), les A au département facile. Le taux global mélange deux réalités différentes : il faut comparer à département égal.",
          },
          {
            label: "Bonne pratique",
            value:
              "Segmentez toujours vos analyses par les variables importantes (ici le département) avant de lire un taux global. Un taux agrégé sans segmentation est suspect par défaut.",
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI : inférence statistique
  // ------------------------------------------------------------------
  {
    id: "echantillonnage-et-biais",
    title: "Échantillonnage et biais",
    level: 3,
    intro: "La qualité d'une analyse se joue avant le premier calcul.",
    blocks: [
      {
        kind: "text",
        text: "Un échantillon est biaisé quand certains individus ont plus de chances d'y figurer que d'autres : les conclusions ne se généralisent plus à la population.",
      },
      {
        kind: "fields",
        title: "Biais d'échantillonnage, en format pédagogique",
        fields: [          {
            label: "Pourquoi c'est le point le plus fragile",
            value:
              "Aucune sophistication statistique ne corrige un mauvais échantillon : des calculs parfaits sur des données biaisées donnent des réponses précisément fausses. « Garbage in, garbage out ».",
          },
          {
            label: "Les biais classiques",
            value:
              "Biais de sélection (sondage en ligne = que les motivés répondent), biais de survie (on n'observe que ceux qui ont « survécu »), biais de mesure (un capteur décalé), données manquantes non aléatoires.",
          },
          {
            label: "L'anecdote historique",
            value:
              "Pendant la Seconde Guerre mondiale, les statisticiens ont étudié les impacts de balles sur les avions revenus de mission pour décider où ajouter du blindage. Le statisticien Abraham Wald a fait remarquer qu'il fallait blinder là où les avions revenus n'avaient PAS d'impacts : les avions touchés à ces endroits ne revenaient pas. C'est le biais de survie.",
          },
          {
            label: "Bonne pratique",
            value:
              "Avant toute analyse, demandez : comment ces données ont-elles été collectées ? Qui manque ? Un échantillon aléatoire de la population cible est l'idéal ; sinon, décrivez les limites explicitement.",
          },
          {
            label: "Concepts liés",
            value: "Population vs échantillon, données manquantes, tests A/B.",
          },
        ],
      },
    ],
  },
  {
    id: "intervalles-de-confiance",
    title: "Intervalles de confiance",
    level: 3,
    intro: "Donner une réponse avec sa marge d'erreur, plutôt qu'un nombre nu.",
    blocks: [
      {
        kind: "text",
        text: "Un intervalle de confiance à 95 % est une fourchette calculée sur l'échantillon qui, si on répétait l'étude un grand nombre de fois, contiendrait le vrai paramètre dans ~95 % des cas.",
      },
      {
        kind: "text",
        text: "« Taux de survie : 38 % » est incomplet ; « 38 %, IC 95 % : [35 %, 41 %] » dit aussi la précision. Deux estimations dont les intervalles se recouvrent largement ne sont probablement pas différentes.",
      },
      {
        kind: "fields",
        title: "Intervalles de confiance, en format pédagogique",
        fields: [          {
            label: "Ce que ce N'EST PAS",
            value:
              "Ce n'est pas « il y a 95 % de chances que le vrai taux soit dans cet intervalle précis » : une fois calculé, l'intervalle contient le paramètre ou non. Le 95 % concerne la méthode, pas cet intervalle particulier. C'est subtil mais c'est l'interprétation correcte.",
          },
          {
            label: "Comment ça fonctionne",
            value:
              "Estimation ± marge d'erreur. La marge dépend de la variabilité des données et rétrécit avec √n : pour diviser la marge par deux, il faut quatre fois plus d'observations.",
          },
          {
            label: "Bonne pratique",
            value:
              "Présentez systématiquement estimation + intervalle plutôt que l'estimation seule. `seaborn.barplot` les dessine automatiquement : regardez-les avant de conclure.",
          },
          {
            label: "Concepts liés",
            value: "Écart-type, théorème central limite, tests d'hypothèses.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Intervalle de confiance d'une moyenne (jouet)",
        code: "import numpy as np\nfrom scipy import stats\n\n# Jouet : 30 mesures fictives d'un temps de chargement (secondes)\nrng = np.random.default_rng(1)\nmesures = rng.normal(loc=2.5, scale=0.4, size=30)\n\nmoyenne = mesures.mean()\nerreur_std = stats.sem(mesures)  # écart-type / sqrt(n)\nic = stats.t.interval(0.95, len(mesures) - 1, loc=moyenne, scale=erreur_std)\nprint(f\"moyenne : {moyenne:.2f} s, IC 95 % : [{ic[0]:.2f}, {ic[1]:.2f}]\")",
      },
    ],
  },
  {
    id: "tests-hypotheses",
    title: "Tests d'hypothèses : la démarche",
    level: 3,
    intro: "Le cadre rigoureux pour décider si un effet est réel.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Formuler H0 et H1",
            detail:
              "H0 (hypothèse nulle) : « il n'y a pas d'effet » (les deux groupes sont identiques). H1 (alternative) : « il y a un effet ». Exemple : H0 = « le taux de survie est le même en 1re et 3e classe ».",
          },
          {
            title: "Choisir le bon test",
            detail:
              "Comparer deux moyennes → test t. Comparer des proportions → test du chi² ou test z. Le choix dépend du type de données et de la question : un mauvais test invalide la conclusion.",
          },
          {
            title: "Fixer le seuil AVANT de regarder les données",
            detail:
              "Le seuil α (souvent 0,05 par convention) est le risque d'erreur qu'on accepte. Le fixer après avoir vu les résultats, c'est tricher avec soi-même.",
          },
          {
            title: "Calculer la statistique et la p-value",
            detail:
              "Le test mesure à quel point les données s'écartent de ce que H0 prédirait. La p-value quantifie cette surprise (voir section dédiée).",
          },
          {
            title: "Décider et nuancer",
            detail:
              "p < α : on rejette H0 (l'effet est statistiquement significatif). p ≥ α : on ne peut pas rejeter H0 — ce qui ne prouve PAS que H0 est vraie, seulement qu'on manque de preuves contre elle.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Test t : deux groupes diffèrent-ils ? (jouet)",
        code: "import numpy as np\nfrom scipy import stats\n\nrng = np.random.default_rng(7)\n# Jouet : temps de chargement (s) de deux versions d'une page, données simulées\ngroupe_a = rng.normal(loc=2.5, scale=0.4, size=40)\ngroupe_b = rng.normal(loc=2.2, scale=0.4, size=40)\n\nt, p = stats.ttest_ind(groupe_a, groupe_b)\nprint(f\"t = {t:.2f}, p-value = {p:.4f}\")\nprint(\"p < 0.05 ?\", p < 0.05, \"-> on rejette H0 : les moyennes diffèrent\")",
      },
    ],
  },
  {
    id: "p-value",
    title: "La p-value, expliquée honnêtement",
    level: 3,
    intro: "Le nombre le plus mal compris des statistiques.",
    blocks: [
      {
        kind: "fields",
        title: "La p-value sans dogme",
        fields: [
          {
            label: "Ce que c'est vraiment",
            value:
              "La probabilité d'observer un résultat au moins aussi extrême que celui mesuré, SI H0 est vraie. p = 0,03 signifie : « si il n'y avait aucun effet, on verrait un résultat aussi marqué que 3 % du temps ».",
          },
          {
            label: "Ce que ce N'EST PAS",
            value:
              "Ce n'est PAS la probabilité que H0 soit vraie. Ce n'est PAS la probabilité que le résultat soit « vrai ». Ce n'est PAS la taille de l'effet : un effet minuscule peut avoir p < 0,001 avec assez de données.",
          },
          {
            label: "Le seuil de 0,05",
            value:
              "C'est une convention historique, pas une loi de la nature. p = 0,049 vs p = 0,051 ne raconte pas deux histoires différentes : traiter le seuil comme une frontière magique est une erreur répandue.",
          },
          {
            label: "Pourquoi s'en méfier",
            value:
              "En testant assez d'hypothèses, on finit toujours par trouver du « significatif » par hasard (voir l'erreur des tests multiples). Une p-value seule, sans taille d'effet ni réplication, est une preuve faible.",
          },
          {
            label: "Bonne pratique",
            value:
              "Publiez la p-value exacte (p = 0,032, pas « p < 0,05 »), accompagnez-la de la taille d'effet et d'un intervalle de confiance, et pré-enregistrez vos hypothèses quand l'enjeu est important.",
          },
          {
            label: "Concepts liés",
            value: "Tests d'hypothèses, erreurs de type 1/2, taille d'effet.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-type-1-et-2",
    title: "Erreurs de type 1 et 2, puissance",
    level: 3,
    intro: "Les deux façons de se tromper en testant — et comment les arbitrer.",
    blocks: [
      {
        kind: "table",
        headers: ["", "H0 est vraie (pas d'effet)", "H0 est fausse (effet réel)"],
        rows: [
          ["On rejette H0", "Erreur de type 1 (faux positif), prob = α", "Bonne décision (puissance = 1 − β)"],
          ["On ne rejette pas H0", "Bonne décision", "Erreur de type 2 (faux négatif), prob = β"],
        ],
      },
      {
        kind: "fields",
        title: "Comprendre l'arbitrage",
        fields: [
          {
            label: "Erreur de type 1 (α)",
            value:
              "Conclure à un effet qui n'existe pas : le faux positif. α = 0,05 signifie qu'on accepte 5 % de fausses alertes quand il n'y a rien. Grave quand la décision coûte cher (lancer un traitement inutile).",
          },
          {
            label: "Erreur de type 2 (β)",
            value:
              "Rater un effet qui existe : le faux négatif. Grave quand rater l'effet coûte cher (ne pas détecter une régression de performance, un médicament efficace).",
          },
          {
            label: "La puissance (1 − β)",
            value:
              "La probabilité de détecter un effet réel s'il existe. Elle augmente avec la taille d'échantillon et la taille de l'effet. Une étude « non significative » avec 10 observations ne prouve rien : elle manquait juste de puissance.",
          },
          {
            label: "Bonne pratique",
            value:
              "Choisissez α selon le coût de l'erreur, pas par habitude. Et dimensionnez l'échantillon à l'avance (calcul de puissance) plutôt que de tester « pour voir ».",
          },
        ],
      },
    ],
  },
  {
    id: "taille-d-effet",
    title: "Taille d'effet : significatif ≠ important",
    level: 3,
    intro: "Un effet « statistiquement significatif » peut être pratiquement négligeable.",
    blocks: [
      {
        kind: "text",
        text: "La taille d'effet mesure l'ampleur réelle d'une différence (ex. +0,2 seconde, +2 points), là où la p-value mesure seulement si elle est détectable.",
      },
      {
        kind: "text",
        text: "Avec 1 million d'observations, une différence de 0,01 % devient « significative » (p minuscule) tout en étant inutile en pratique. La significativité dit « c'est probablement réel », la taille d'effet dit « est-ce que ça compte ? ».",
      },
      {
        kind: "fields",
        title: "Taille d'effet, en format pédagogique",
        fields: [          {
            label: "Exemple",
            value:
              "Un test A/B montre +0,1 % de conversion avec p = 0,001 : statistiquement solide, mais si le coût de déploiement dépasse le gain attendu, la décision rationnelle est de ne pas déployer.",
          },
          {
            label: "Bonne pratique",
            value:
              "Toujours rapporter : estimation de l'effet + intervalle de confiance + p-value, dans cet ordre d'importance pour la décision. Définissez à l'avance le seuil « ça vaut le coup ».",
          },
          {
            label: "Concepts liés",
            value: "p-value, puissance, tests A/B.",
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI : régression et qualité des données
  // ------------------------------------------------------------------
  {
    id: "regression-lineaire",
    title: "Régression linéaire : la notion",
    level: 3,
    intro: "Prédire une variable à partir d'une autre avec une droite.",
    blocks: [
      {
        kind: "text",
        text: "La régression linéaire trouve la droite qui passe « au mieux » au milieu d'un nuage de points, pour prédire y à partir de x.",
      },
      {
        kind: "text",
        text: "C'est le modèle prédictif le plus simple et le plus interprétable : chaque coefficient se lit (« +1 an d'âge → +tant d'euros »). Il sert de référence avant tout modèle complexe : si une droite fait aussi bien qu'un réseau de neurones, gardez la droite.",
      },
      {
        kind: "fields",
        title: "Régression linéaire, en format pédagogique",
        fields: [          {
            label: "Comment ça fonctionne",
            value:
              "La méthode des moindres carrés minimise la somme des carrés des écarts entre les points et la droite. Le R² (entre 0 et 1) indique la part de la variabilité de y expliquée par le modèle.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Extrapoler hors des données : une droite ajustée sur des prix entre 50 et 150 m² ne dit rien d'un 500 m². Et rappel : la régression mesure une association, pas une causalité.",
          },
          {
            label: "Bonne pratique",
            value:
              "Vérifiez les résidus (les erreurs du modèle) : ils doivent ressembler à du bruit sans structure. Des résidus en forme de courbe signalent que la relation n'est pas linéaire.",
          },
          {
            label: "Concepts liés",
            value: "Corrélation, machine learning, causalité.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Régression linéaire simple (jouet explicite)",
        code: "import numpy as np\nimport matplotlib.pyplot as plt\nfrom scipy import stats\n\n# Jouet : surface (m²) vs prix (k€), relation à peu près linéaire + bruit\nrng = np.random.default_rng(3)\nsurface = rng.uniform(30, 120, size=60)\nprix = 2.0 * surface + 50 + rng.normal(0, 15, size=60)\n\nres = stats.linregress(surface, prix)\nprint(f\"pente : {res.slope:.2f} k€/m², R² : {res.rvalue**2:.2f}\")\n\nplt.scatter(surface, prix, alpha=0.6)\nplt.plot(surface, res.intercept + res.slope * surface, color=\"red\")\nplt.xlabel(\"Surface (m², jouet)\")\nplt.ylabel(\"Prix (k€, jouet)\")\nplt.show()",
      },
    ],
  },
  {
    id: "donnees-manquantes",
    title: "Données manquantes",
    level: 3,
    intro: "Le problème le plus courant des datasets réels.",
    blocks: [
      {
        kind: "text",
        text: "Les valeurs manquantes (`NaN`) sont inévitables : capteur en panne, question sans réponse, champ non applicable. Les ignorer aveuglément biaise l'analyse.",
      },
      {
        kind: "fields",
        title: "Données manquantes, en format pédagogique",
        fields: [          {
            label: "Pourquoi c'est délicat",
            value:
              "Supprimer les lignes incomplètes ne conserve que les cas « propres », qui ne sont pas représentatifs : les clients qui ne répondent pas au sondage sont justement ceux qu'on connaît le moins.",
          },
          {
            label: "Les stratégies",
            value:
              "Suppression (si peu de manquants et au hasard), imputation par la médiane/mode (simple, biaise la variance), imputation par modèle (plus fidèle, plus complexe). Le choix dépend du mécanisme supposé.",
          },
          {
            label: "Bonne pratique",
            value:
              "Commencez par mesurer : `df.isna().sum()` par colonne, et cherchez si les manquants se concentrent quelque part (un segment, une période). Documentez le traitement choisi : c'est une décision d'analyse, pas un détail technique.",
          },
          {
            label: "Concepts liés",
            value: "Biais d'échantillonnage, pandas, qualité des données.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Diagnostiquer les valeurs manquantes (Titanic)",
        code: "import seaborn as sns\n\ntitanic = sns.load_dataset(\"titanic\")\n\n# Où sont les trous ?\nprint(titanic.isna().sum())\n\n# Les manquants d'âge sont-ils répartis au hasard selon la classe ?\nprint(titanic.groupby(\"pclass\")[\"age\"].apply(lambda s: s.isna().mean()).round(3))",
      },
    ],
  },
  {
    id: "valeurs-aberrantes",
    title: "Valeurs aberrantes (outliers)",
    level: 3,
    intro: "Ni à supprimer aveuglément, ni à ignorer.",
    blocks: [
      {
        kind: "text",
        text: "Une valeur aberrante est une observation très éloignée des autres : erreur de saisie, cas exceptionnel réel, ou découverte en puissance.",
      },
      {
        kind: "fields",
        title: "Outliers, en format pédagogique",
        fields: [          {
            label: "Pourquoi c'est un dilemme",
            value:
              "Un outlier peut être une erreur (âge de 250 ans → corriger ou retirer) ou l'information la plus précieuse du dataset (la fraude qu'on cherche à détecter). La statistique ne tranche pas : le contexte métier tranche.",
          },
          {
            label: "Comment les détecter",
            value:
              "Visuellement : boxplot, histogramme. Numériquement : règle des 1,5 × IQR, ou score z (|z| > 3). Ce sont des signalements, pas des verdicts.",
          },
          {
            label: "Bonne pratique",
            value:
              "Ne supprimez jamais silencieusement : documentez chaque exclusion et montrez les résultats avec et sans les outliers (analyse de sensibilité). Si la conclusion change, dites-le.",
          },
          {
            label: "Concepts liés",
            value: "Boxplot, IQR, médiane (robuste), moyenne (sensible).",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Repérer les outliers avec l'IQR (jouet)",
        code: "import numpy as np\n\n# Jouet : temps de réponse (ms) d'un serveur, avec une valeur suspecte\ntemps = np.array([120, 135, 128, 140, 132, 125, 138, 130, 2100])\n\nq1, q3 = np.percentile(temps, [25, 75])\niqr = q3 - q1\nseuil = q3 + 1.5 * iqr\nprint(\"seuil :\", seuil)\nprint(\"suspects :\", temps[temps > seuil])  # 2100 : panne ou erreur de mesure ?",
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI : erreurs fréquentes d'interprétation
  // ------------------------------------------------------------------
  {
    id: "erreur-moyenne-seule",
    title: "Erreur n°1 : la moyenne seule",
    level: 3,
    intro: "Résumer une distribution par sa moyenne cache tout le reste.",
    blocks: [
      {
        kind: "text",
        text: "Exemple jouet : deux équipes ont la même note moyenne de 11/20. Équipe A : [10, 11, 12, 11, 11] — homogène. Équipe B : [0, 20, 5, 20, 10] — mêmes 11 de moyenne, mais la moitié de l'équipe est en échec. La moyenne seule rend ces deux réalités indiscernables.",
      },
      {
        kind: "fields",
        title: "Le piège et la parade",
        fields: [
          {
            label: "Ce qui se passe",
            value:
              "On communique « la moyenne est de 11 » et tout le monde imagine une distribution homogène autour de 11.",
          },
          {
            label: "Comment l'éviter",
            value:
              "Toujours accompagner : écart-type (ou IQR), et un histogramme dès que l'enjeu compte. Méfiez-vous particulièrement des moyennes sur des distributions bimodales (deux bosses).",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-axes-trompeurs",
    title: "Erreur n°2 : les axes trompeurs",
    level: 3,
    intro: "Le graphique ne ment pas, mais son cadrage si.",
    blocks: [
      {
        kind: "text",
        text: "Deux barres : 98 et 100. Avec un axe Y qui démarre à 0, elles sont quasi identiques. Avec un axe Y qui démarre à 97, la seconde paraît deux fois plus grande. Les données sont les mêmes, l'impression est opposée. C'est la manipulation visuelle la plus répandue, souvent involontaire (les outils resserrent les axes par défaut).",
      },
      {
        kind: "fields",
        title: "Le piège et la parade",
        fields: [
          {
            label: "Ce qui se passe",
            value:
              "Un axe tronqué exagère des différences négligeables ; un axe trop large les écrase. Les deux faussent la lecture.",
          },
          {
            label: "Comment l'éviter",
            value:
              "Pour des barres : axe Y à zéro, toujours. Pour des courbes : un axe resserré est acceptable SI la variation absolue est aussi donnée. En recevant un graphique : regardez les graduations avant les formes.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-echantillon-trop-petit",
    title: "Erreur n°3 : l'échantillon minuscule",
    level: 3,
    intro: "Trois observations ne prouvent rien, même si elles sont unanimes.",
    blocks: [
      {
        kind: "text",
        text: "« 100 % de nos 3 premiers clients sont satisfaits ! » : avec n = 3, l'intervalle de confiance d'une proportion va d'environ 30 % à 100 %. L'affirmation est techniquement vraie et pratiquement vide. La variabilité des petits échantillons est énorme : c'est exactement ce que quantifient les intervalles de confiance.",
      },
      {
        kind: "fields",
        title: "Le piège et la parade",
        fields: [
          {
            label: "Ce qui se passe",
            value:
              "On généralise à partir d'une poignée d'observations : les premiers utilisateurs, les 5 derniers jours, un seul magasin test.",
          },
          {
            label: "Comment l'éviter",
            value:
              "Exigez n et l'intervalle de confiance avec chaque pourcentage. Règle de pouce : en dessous de ~30 observations, toute conclusion est fragile ; en dessous de 10, c'est de l'anecdote.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-pourcentages",
    title: "Erreur n°4 : les pourcentages ambigus",
    level: 3,
    intro: "« +50 % » ne veut rien dire sans la base de départ.",
    blocks: [
      {
        kind: "text",
        text: "Exemple jouet : un taux passe de 2 % à 3 %. Dire « +50 % » (relatif) ou « +1 point » (absolu) décrit la même réalité avec un impact perçu très différent. Pire : « le risque double » (de 0,001 % à 0,002 %) fait peur pour un danger qui reste infime. Les communicants choisissent la version qui arrange ; l'analyste donne les deux.",
      },
      {
        kind: "fields",
        title: "Le piège et la parade",
        fields: [
          {
            label: "Ce qui se passe",
            value:
              "On annonce une variation relative spectaculaire en taisant la base absolue, ou on mélange points de pourcentage et pourcents.",
          },
          {
            label: "Comment l'éviter",
            value:
              "Donnez toujours les effectifs bruts avec les pourcentages (« 30 sur 1 000, soit 3 %, contre 20 sur 1 000, soit 2 % »). Distinguez « points de pourcentage » et « pour cent » explicitement.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-cherry-picking",
    title: "Erreur n°5 : le cherry-picking",
    level: 3,
    intro: "Choisir la période, le segment ou l'indicateur qui arrange.",
    blocks: [
      {
        kind: "text",
        text: "Une courbe qui baisse sur un an mais qu'on présente sur « les 3 derniers mois » en hausse : en changeant la fenêtre, on change l'histoire sans truquer un seul chiffre. Même mécanisme avec les segments (« chez les 25-34 ans ça marche ») ou les indicateurs (on publie celui qui est significatif).",
      },
      {
        kind: "fields",
        title: "Le piège et la parade",
        fields: [
          {
            label: "Ce qui se passe",
            value:
              "On sélectionne après coup la découpe des données qui confirme ce qu'on voulait montrer.",
          },
          {
            label: "Comment l'éviter",
            value:
              "Fixez période, segments et indicateurs AVANT l'analyse (pré-enregistrement). Montrez la série complète, pas juste la fenêtre flatteuse. Si quelqu'un ne montre qu'une fenêtre, demandez le reste.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-moyenne-de-moyennes",
    title: "Erreur n°6 : la moyenne des moyennes",
    level: 3,
    intro: "Moyenner des moyennes de groupes inégaux fausse le résultat.",
    blocks: [
      {
        kind: "text",
        text: "Exemple jouet : le groupe A (100 personnes) a une moyenne de 10, le groupe B (10 personnes) une moyenne de 20. La « moyenne des moyennes » (10 + 20) / 2 = 15 est fausse : la vraie moyenne globale est (100×10 + 10×20) / 110 ≈ 10,9. Il faut pondérer par les effectifs — c'est une cousine du paradoxe de Simpson.",
      },
      {
        kind: "fields",
        title: "Le piège et la parade",
        fields: [
          {
            label: "Ce qui se passe",
            value:
              "On agrège des résumés au lieu des données brutes : moyennes de moyennes, taux moyens de taux, sans pondération.",
          },
          {
            label: "Comment l'éviter",
            value:
              "Recalculez toujours sur les données brutes quand c'est possible. Si vous n'avez que des résumés, pondérez par les effectifs et signalez l'approximation.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Pondérer correctement (jouet)",
        code: "# Jouet : groupe A (n=100, moyenne 10), groupe B (n=10, moyenne 20)\nn_a, moy_a = 100, 10\nn_b, moy_b = 10, 20\n\nmauvaise = (moy_a + moy_b) / 2                       # 15.0 : faux\nbonne = (n_a * moy_a + n_b * moy_b) / (n_a + n_b)   # 10.9 : pondérée\nprint(mauvaise, \"vs\", round(bonne, 1))",
      },
    ],
  },
  {
    id: "erreur-tests-multiples",
    title: "Erreur n°7 : tester jusqu'à trouver",
    level: 3,
    intro: "À force de chercher, on trouve — du bruit.",
    blocks: [
      {
        kind: "text",
        text: "Avec un seuil α = 0,05, tester 20 hypothèses indépendantes fausses donne en moyenne une « découverte » significative par pur hasard. Tester 20 indicateurs, 10 segments et 5 périodes, puis ne publier que le significatif, c'est fabriquer des faux positifs à la chaîne. C'est le mécanisme du p-hacking, documenté dans la littérature scientifique.",
      },
      {
        kind: "fields",
        title: "Le piège et la parade",
        fields: [
          {
            label: "Ce qui se passe",
            value:
              "On multiplie les tests (indicateurs, segments, variantes) et on ne retient que ce qui « sort ».",
          },
          {
            label: "Comment l'éviter",
            value:
              "Définissez l'hypothèse principale à l'avance. Si vous explorez plusieurs pistes, corrigez le seuil (ex. correction de Bonferroni : diviser α par le nombre de tests) ou présentez l'analyse comme exploratoire, pas confirmatoire.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-conclusion-hative",
    title: "Erreur n°8 : conclure trop vite",
    level: 3,
    intro: "Transformer une association observée en décision, sans preuve causale.",
    blocks: [
      {
        kind: "text",
        text: "« Les clients qui utilisent la fonctionnalité X renouvellent plus » → « développons X pour tous ». Mais peut-être que ce sont les clients déjà engagés qui utilisent X : la causalité est inversée, et l'investissement ne changera rien. C'est la version décisionnelle de « corrélation n'est pas causalité » : avant d'agir sur une association, il faut un test (A/B) ou une analyse causale.",
      },
      {
        kind: "fields",
        title: "Le piège et la parade",
        fields: [
          {
            label: "Ce qui se passe",
            value:
              "On passe directement de l'observation à l'action, sans vérifier le sens causal ni les variables confondantes.",
          },
          {
            label: "Comment l'éviter",
            value:
              "Devant toute association : listez les explications alternatives (causalité inversée, variable cachée). Si l'enjeu est important, validez par une expérience contrôlée avant de décider.",
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI : projets
  // ------------------------------------------------------------------
  {
    id: "projet-1-analyse-exploratoire",
    title: "Projet 1 : analyse exploratoire du Titanic",
    level: 3,
    intro: "Votre première analyse complète, de la question au graphique.",
    blocks: [
      {
        kind: "fields",
        title: "Projet — analyse exploratoire",
        fields: [
          {
            label: "Objectif",
            value:
              "Répondre à « qui avait le plus de chances de survivre ? » avec le dataset Titanic (`seaborn.load_dataset(\"titanic\")`), en suivant le workflow en 5 étapes.",
          },
          {
            label: "Compétences mobilisées",
            value: "pandas (`describe`, `groupby`), histogrammes, boxplots, barplots, lecture de distributions.",
          },
          {
            label: "Livrable",
            value: "Un notebook avec : la question, l'exploration (`head`, valeurs manquantes), 3 graphiques titrés et légendés, et un résumé de 5 lignes des résultats avec leurs limites.",
          },
          {
            label: "Ce que vous apprendrez",
            value: "Traduire une question en opérations sur les données, et résister à la tentation de conclure avant d'avoir regardé.",
          },
          {
            label: "Difficulté",
            value: "Débutant — 1 semaine.",
          },
          {
            label: "Projet suivant",
            value: "Projet 2 : comparer rigoureusement les groupes.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-2-etude-comparative",
    title: "Projet 2 : étude comparative sur les manchots",
    level: 3,
    intro: "Comparer des groupes avec des intervalles de confiance.",
    blocks: [
      {
        kind: "fields",
        title: "Projet — étude comparative",
        fields: [
          {
            label: "Objectif",
            value:
              "Avec le dataset Penguins (`seaborn.load_dataset(\"penguins\")`), déterminer si les espèces diffèrent significativement en masse corporelle, avec intervalles de confiance.",
          },
          {
            label: "Compétences mobilisées",
            value: "Boxplots par groupe, moyennes ± écart-type, intervalles de confiance, test t ou ANOVA (notion), gestion des valeurs manquantes.",
          },
          {
            label: "Livrable",
            value: "Un notebook : hypothèse formulée à l'avance, graphique comparatif avec intervalles, test statistique avec p-value ET taille d'effet, conclusion nuancée.",
          },
          {
            label: "Ce que vous apprendrez",
            value: "La différence entre « les moyennes diffèrent » et « la différence est significative et importante ».",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — 2 semaines.",
          },
          {
            label: "Projet suivant",
            value: "Projet 3 : concevoir et analyser un test A/B simulé.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-3-test-ab-simule",
    title: "Projet 3 : test A/B simulé",
    level: 3,
    intro: "Le protocole causal de référence, sur données simulées explicites.",
    blocks: [
      {
        kind: "fields",
        title: "Projet — test A/B simulé",
        fields: [
          {
            label: "Objectif",
            value:
              "Simuler un test A/B (deux versions d'une page, taux de conversion) avec `numpy` (graine fixée, données explicitement simulées), puis analyser : le nouveau design convertit-il vraiment mieux ?",
          },
          {
            label: "Compétences mobilisées",
            value: "Loi binomiale, test de proportions (`scipy.stats`), p-value, intervalle de confiance d'une différence, calcul de taille d'échantillon (notion de puissance).",
          },
          {
            label: "Livrable",
            value: "Un script reproductible (`seed` fixé) : génération des données, analyse, décision argumentée (déployer ou non) avec taille d'effet et incertitude.",
          },
          {
            label: "Ce que vous apprendrez",
            value: "Pourquoi la randomisation permet de parler de causalité, et pourquoi « significatif » ne suffit pas pour décider.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — 2 semaines.",
          },
          {
            label: "Projet suivant",
            value: "Projet 4 : produire un rapport reproductible de bout en bout.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Point de départ : simuler un test A/B",
        code: "import numpy as np\nfrom scipy import stats\n\nrng = np.random.default_rng(42)  # graine fixée : tout le monde obtient les mêmes données\n\n# Données EXPLICITEMENT simulées : 2000 visiteurs par version\nconv_a = rng.binomial(1, 0.10, size=2000)  # version actuelle : 10 % de conversion\nconv_b = rng.binomial(1, 0.12, size=2000)  # nouvelle version : 12 % (effet réel simulé)\n\nres = stats.ttest_ind(conv_a, conv_b)\nprint(f\"A : {conv_a.mean():.1%}, B : {conv_b.mean():.1%}, p-value : {res.pvalue:.4f}\")\n# À vous : intervalle de confiance de la différence, taille d'effet, décision.",
      },
    ],
  },
  {
    id: "projet-4-rapport-reproductible",
    title: "Projet 4 : rapport d'analyse reproductible",
    level: 3,
    intro: "Le niveau professionnel : une analyse que n'importe qui peut relancer.",
    blocks: [
      {
        kind: "fields",
        title: "Projet — rapport reproductible",
        fields: [
          {
            label: "Objectif",
            value:
              "Reprendre l'analyse du projet 1 ou 2 et en faire un livrable professionnel : notebook nettoyé, données documentées, environnement figé.",
          },
          {
            label: "Compétences mobilisées",
            value: "`pip freeze > requirements.txt`, notebook ré-exécuté de haut en bas, README (question, données, méthode, limites), graphiques exportés en haute résolution.",
          },
          {
            label: "Livrable",
            value: "Un dossier : `analyse.ipynb` (propre), `requirements.txt`, `README.md`, `figures/`. Quelqu'un qui clone le dossier doit obtenir les mêmes résultats en 3 commandes.",
          },
          {
            label: "Ce que vous apprendrez",
            value: "La reproductibilité : la différence entre « ça marche sur ma machine » et une analyse professionnelle.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — 1 semaine.",
          },
        ],
      },
      {
        kind: "command",
        label: "Figer l'environnement du projet",
        command: "pip freeze > requirements.txt",
        why: "Enregistre les versions exactes de toutes les bibliothèques : quelqu'un d'autre (ou vous dans 6 mois) pourra recréer un environnement identique et obtenir les mêmes résultats.",
        verify: "`requirements.txt` contient des lignes comme `numpy==2.x.x` et `pandas==2.x.x`.",
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI : ressources et suite
  // ------------------------------------------------------------------
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Les références officielles et les ouvrages de référence.",
    blocks: [
      {
        kind: "table",
        headers: ["Ressource", "Type", "Lien"],
        rows: [
          ["Documentation NumPy", "Référence officielle", "https://numpy.org/doc/"],
          ["Documentation pandas", "Référence officielle", "https://pandas.pydata.org/docs/"],
          ["Documentation matplotlib", "Référence officielle", "https://matplotlib.org/"],
          ["Documentation seaborn", "Référence officielle", "https://seaborn.pydata.org/"],
          ["Documentation SciPy (stats)", "Référence officielle", "https://docs.scipy.org/doc/scipy/reference/stats.html"],
          ["Seeing Theory", "Cours visuel interactif (Brown)", "https://seeing-theory.brown.edu/"],
          ["StatQuest (YouTube)", "Vidéos pédagogiques", "https://www.youtube.com/c/joshstarmer"],
        ],
      },
      {
        kind: "fields",
        title: "Ouvrages de référence",
        fields: [
          {
            label: "Think Stats (Allen B. Downey)",
            value:
              "Les statistiques avec Python, en partant du code plutôt que des formules. La 2e édition est disponible gratuitement en ligne (Green Tea Press).",
          },
          {
            label: "An Introduction to Statistical Learning",
            value:
              "La référence pour la suite (régression, classification) : rigoureux mais accessible, avec des exemples en Python et R (statlearning.com).",
          },
          {
            label: "Naked Statistics (Charles Wheelan)",
            value:
              "L'intuition des statistiques sans les équations : idéal en complément pour comprendre le « pourquoi » avant le « comment ».",
          },
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Les prolongements naturels une fois les bases solides.",
    blocks: [
      {
        kind: "fields",
        title: "Pistes de progression",
        fields: [
          {
            label: "Machine learning",
            value:
              "La régression et la classification prolongent directement cette page : scikit-learn reprend le même vocabulaire (données, modèle, évaluation). La statistique y devient prédictive.",
          },
          {
            label: "Plans d'expérience",
            value:
              "Tests A/B avancés, plans factoriels, bandits-manchots : l'art de concevoir des expériences qui répondent vraiment à la question posée.",
          },
          {
            label: "Statistiques bayésiennes",
            value:
              "Une autre philosophie de l'incertitude, qui met à jour les croyances avec les données (théorème de Bayes en grand). Complémentaire de l'approche fréquentiste de cette page.",
          },
          {
            label: "Séries temporelles",
            value:
              "Quand les données ont un ordre chronologique (ventes, capteurs), de nouveaux outils entrent en jeu : tendance, saisonnalité, autocorrélation.",
          },
          {
            label: "Visualisation avancée",
            value:
              "Plotly et les dashboards interactifs pour communiquer les résultats : une bonne analyse mal communiquée est une analyse perdue.",
          },
        ],
      },
    ],
  },
];

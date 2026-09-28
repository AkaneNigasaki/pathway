import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Data Science : explorer, modéliser, évaluer
 * et déployer — avec Python, pandas et scikit-learn.
 */
export const LEARNING_DATA_SCIENCE: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Ce qu'est la data science : des données brutes aux décisions.",
    blocks: [
      {
        kind: "text",
        text: "La data science est la discipline qui transforme des données brutes en décisions : explorer, nettoyer, modéliser avec des statistiques et du machine learning, puis communiquer les résultats de façon actionnable.",
      },
      {
        kind: "text",
        text: "Elle combine trois métiers : l'analyse (comprendre les données), la modélisation (prédire avec le machine learning) et la communication (raconter ce que les données disent). Un profil complet, à l'interface du business et de la technique.",
      },
      {
        kind: "text",
        text: "Concrètement : prédire quels clients vont résilier, détecter les transactions frauduleuses, recommander le bon produit, optimiser un prix. Partout où une décision peut s'appuyer sur des données plutôt que sur l'intuition.",
      },
    ],
  },
  {
    id: "cycle-projet",
    title: "Le cycle d'un projet",
    level: 1,
    intro:
      "Les six étapes de tout projet data science, en 30 secondes.",
    blocks: [
      {
        kind: "diagram",
        title: "QUESTION → DONNÉES → EXPLORATION → MODÉLISATION → COMMUNICATION → DÉCISION",
        lines: [
          "QUESTION      : que cherche-t-on à prédire ou comprendre ?",
          "DONNÉES       : les collecter, vérifier leur qualité",
          "EXPLORATION   : comprendre forme, distributions, limites",
          "MODÉLISATION  : entraîner et évaluer des modèles",
          "COMMUNICATION : raconter résultats et limites",
          "DÉCISION      : agir — là où la valeur se crée",
          "     ↺ le cycle est itératif : chaque étape éclaire les autres.",
        ],
      },
      {
        kind: "list",
        items: [
          "Le projet commence par une question métier, pas par un modèle.",
          "L'exploration précède toujours la modélisation : un modèle sur des données incomprises est un pari.",
          "La valeur naît à la décision : un modèle à 95 % jamais déployé vaut zéro.",
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
    intro:
      "Les fondations : Python, SQL et statistiques intuitives.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut savoir",
        fields: [
          {
            label: "Python",
            value:
              "Manipuler des données avec pandas et NumPy : l'outillage quotidien du data scientist. Boucles, fonctions, listes et dictionnaires doivent être fluides.",
          },
          {
            label: "Statistiques de base",
            value:
              "Moyenne, médiane, variance, distributions : interpréter correctement des résultats — sans quoi les conclusions sont fausses.",
          },
          {
            label: "SQL",
            value:
              "Extraire les données des bases : la première étape de toute analyse sérieuse.",
          },
          {
            label: "Algèbre linéaire intuitive",
            value:
              "Vecteurs, matrices, produits : pas de démonstrations, mais comprendre ce que représente une matrice de données (lignes = exemples, colonnes = variables).",
          },
        ],
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "La stack data science standard : Python + Jupyter + scikit-learn.",
    blocks: [
      {
        kind: "command",
        label: "Installer la stack de base",
        command: "pip install numpy pandas matplotlib scikit-learn jupyterlab",
        why: "`numpy` pour le calcul numérique, `pandas` pour les données tabulaires, `matplotlib` pour les graphiques, `scikit-learn` pour le machine learning, `jupyterlab` pour les notebooks. L'écosystème standard, maintenu par leurs communautés.",
        verify: "python -c \"import sklearn; print(sklearn.__version__)\"",
      },
      {
        kind: "command",
        label: "Isoler dans un environnement virtuel",
        command: "python -m venv .venv && source .venv/bin/activate",
        why: "Un projet data science vit des mois : figer ses dépendances évite que « ça marchait hier » devienne un mystère. Les versions des librairies changent les résultats.",
        verify: "pip freeze > requirements.txt",
      },
      {
        kind: "command",
        label: "Enregistrer le noyau Jupyter",
        command: "python -m ipykernel install --user --name ds",
        why: "Rend l'environnement sélectionnable dans JupyterLab : le notebook utilise exactement les paquets du projet.",
        verify: "jupyter lab",
      },
    ],
  },
  {
    id: "premier-notebook",
    title: "Premier notebook",
    level: 2,
    intro:
      "Charger un dataset et le regarder : le réflexe d'ouverture.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Charger et inspecter",
        code: `import pandas as pd\n\ndf = pd.read_csv("clients.csv\")\n\nprint(df.shape)        # (lignes, colonnes) : la taille du problème\ndf.head()               # à quoi ressemblent les données ?\ndf.info()               # types, valeurs manquantes\ndf.describe()           # moyenne, min, max, quartiles des numériques\ndf["resilie\"].value_counts(normalize=True)  # distribution de la cible`,
      },
      {
        kind: "text",
        text: "Avant tout modèle : regarder. La distribution de la variable cible (`value_counts`) dit déjà si le problème est équilibré ; `info()` révèle les trous. Ces 5 lignes évitent des semaines de modélisation sur des données pourries.",
      },
    ],
  },
  {
    id: "exploration-eda",
    title: "Exploration (EDA)",
    level: 2,
    intro:
      "L'analyse exploratoire : comprendre avant de modéliser.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Explorer les relations",
        code: `import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv("clients.csv\")\n\n# La cible varie-t-elle selon une variable ?\ndf.groupby("segment\")[\"resilie\"].mean()\n\n# Corrélations entre numériques\nsns.heatmap(df.select_dtypes("number\").corr(), annot=True)\nplt.show()\n\n# Distribution d'une variable clé\nsns.histplot(df["anciennete_mois\"], bins=30)\nplt.show()`,
      },
      {
        kind: "list",
        items: [
          "Question directrice : « qu'est-ce qui distingue les positifs des négatifs ? » — comparer les distributions par classe.",
          "Chercher les anomalies : valeurs impossibles (âge négatif), distributions bimodales (deux populations mélangées).",
          "Noter les intuitions : elles deviendront des features — et les surprises deviendront des vérifications.",
          "L'EDA se termine quand on peut raconter les données en 5 phrases : qui, quoi, combien, quelles relations, quelles limites.",
        ],
      },
    ],
  },
  {
    id: "visualisation",
    title: "Visualiser pour comprendre",
    level: 2,
    intro:
      "Les graphiques de l'exploration : voir les formes.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Les 4 graphiques de l'EDA",
        code: `import seaborn as sns\nimport matplotlib.pyplot as plt\n\n# Histogramme : distribution d'une variable\nsns.histplot(df["montant\"], bins=40)\n\n# Boxplot : comparer une distribution par catégorie\nsns.boxplot(data=df, x="segment\", y="montant\")\n\n# Nuage : relation entre deux variables\nsns.scatterplot(data=df, x="anciennete_mois\", y="montant\",\n                hue="resilie\")\n\n# Barres : taux par catégorie\ndf.groupby("segment\")[\"resilie\"].mean().plot(kind="bar\")\nplt.show()`,
      },
      {
        kind: "text",
        text: "En exploration, on visualise pour soi : vite, beaucoup, sans polish. Le boxplot révèle les différences entre groupes d'un coup d'œil ; le nuage coloré par la cible montre si les classes sont séparables — donc si le problème est « apprenable ».",
      },
    ],
  },
  {
    id: "preparer-donnees",
    title: "Préparer les données",
    level: 2,
    intro:
      "Du DataFrame brut à la matrice d'apprentissage.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Nettoyage minimal avant modélisation",
        code: `import pandas as pd\n\ndf = pd.read_csv("clients.csv\")\n\n# 1. Doublons et valeurs manquantes\ndf = df.drop_duplicates()\nprint(df.isna().sum())            # où sont les trous ?\n\n# 2. Séparer features (X) et cible (y)\nX = df.drop(columns=["resilie\", \"client_id\"])\ny = df["resilie\"]\n\n# 3. Types : catégorielles vs numériques\nprint(X.dtypes)`,
      },
      {
        kind: "list",
        items: [
          "Ne jamais inclure d'identifiants (`client_id`) dans les features : le modèle apprendrait par cœur au lieu de généraliser.",
          "Ne jamais utiliser d'information postérieure à la prédiction (ex. « date de résiliation » pour prédire la résiliation) : c'est de la fuite (voir niveau 3).",
          "Garder le script de préparation rejouable : les mêmes étapes s'appliqueront aux nouvelles données en production.",
        ],
      },
    ],
  },
  {
    id: "premier-modele",
    title: "Premier modèle",
    level: 2,
    intro:
      "Entraîner et évaluer : le cycle minimal avec scikit-learn.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Régression logistique de bout en bout",
        code: `import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score\n\ndf = pd.read_csv("clients.csv\")\nX = pd.get_dummies(df.drop(columns=["resilie\", \"client_id\"]))\ny = df["resilie\"]\n\n# Séparer : entraîner sur 80 %, évaluer sur 20 % jamais vus\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42)\n\nmodele = LogisticRegression(max_iter=1000)\nmodele.fit(X_train, y_train)          # entraînement\n\npred = modele.predict(X_test)         # prédiction\nprint("Accuracy:", accuracy_score(y_test, pred))`,
      },
      {
        kind: "list",
        items: [
          "`train_test_split` : évaluer sur des données jamais vues pendant l'entraînement — sinon le score est un mensonge.",
          "`random_state=42` : figer l'aléatoire pour des résultats reproductibles.",
          "`fit` apprend, `predict` prédit : l'API uniforme de scikit-learn (`fit`/`predict`/`score`) s'applique à tous les modèles.",
          "Commencer par un modèle simple (régression logistique) : c'est la baseline — tout modèle complexe doit la battre pour justifier son coût.",
        ],
      },
    ],
  },
  {
    id: "lire-metriques",
    title: "Lire les métriques",
    level: 2,
    intro:
      "Accuracy, précision, rappel : choisir la bonne mesure.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Matrice de confusion et métriques",
        code: `from sklearn.metrics import confusion_matrix, classification_report\n\nprint(confusion_matrix(y_test, pred))\nprint(classification_report(y_test, pred))`,
      },
      {
        kind: "fields",
        title: "Les métriques essentielles",
        fields: [
          {
            label: "Accuracy",
            value:
              "Part de bonnes prédictions. Trompeuse si les classes sont déséquilibrées : 95 % d'accuracy sur 95 % de négatifs = modèle qui prédit toujours « non ».",
          },
          {
            label: "Précision",
            value:
              "Parmi les « oui » prédits, combien sont vrais. Critique quand un faux positif coûte cher (ex. accuser de fraude).",
          },
          {
            label: "Rappel (recall)",
            value:
              "Parmi les vrais « oui », combien sont détectés. Critique quand un faux négatif coûte cher (ex. rater une maladie).",
          },
          {
            label: "F1",
            value:
              "Moyenne harmonique de précision et rappel : le compromis quand les deux comptent.",
          },
        ],
      },
      {
        kind: "text",
        text: "La métrique se choisit selon le coût des erreurs métier, pas par habitude. « Quel est le pire : rater un cas ou alerter à tort ? » — la réponse donne la métrique.",
      },
    ],
  },
  {
    id: "environnement-reproductible",
    title: "Environnement reproductible",
    level: 2,
    intro:
      "Qu'une expérience se rejoue à l'identique.",
    blocks: [
      {
        kind: "command",
        label: "Figer les dépendances",
        command: "pip freeze > requirements.txt",
        why: "Les versions de numpy, pandas et scikit-learn influencent les résultats numériques. Figer les versions garantit que le modèle réentraîné dans 6 mois donne les mêmes chiffres.",
        verify: "cat requirements.txt",
      },
      {
        kind: "list",
        items: [
          "Séparer exploration et production : un notebook pour explorer, un script `train.py` pour entraîner de façon reproductible.",
          "Nettoyer les sorties des notebooks avant de committer : les notebooks versionnés doivent rester lisibles.",
          "Noter les données : source, date d'extraction, version — un modèle sans provenance est invérifiable.",
        ],
      },
    ],
  },
  {
    id: "workflow-pro",
    title: "Le flux de travail pro",
    level: 2,
    intro:
      "Du notebook brouillon au modèle suivi.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Explorer en notebook",
            detail:
              "Charger, visualiser, tester des idées vite. Le notebook est un laboratoire : on y essaie, on s'y trompe.",
          },
          {
            title: "Stabiliser en script",
            detail:
              "Le pipeline qui marche (préparation → entraînement → évaluation) devient `train.py`, paramétrable et rejouable.",
          },
          {
            title: "Évaluer honnêtement",
            detail:
              "Jeu de test mis de côté dès le début, jamais touché pendant le réglage. Le score final n'est lu qu'une fois.",
          },
          {
            title: "Tracer les expériences",
            detail:
              "Noter pour chaque essai : données, paramètres, score — dans un tableau, un fichier ou un outil de suivi. La mémoire ne suffit pas.",
          },
        ],
      },
    ],
  },
  {
    id: "premiers-projets",
    title: "Premiers projets",
    level: 2,
    intro:
      "Des projets complets : question, données, modèle, récit.",
    blocks: [
      {
        kind: "list",
        items: [
          "Prédiction de churn : dataset telecom — explorer, modéliser (régression logistique puis forêt aléatoire), comparer, expliquer les variables importantes.",
          "Prix des logements : régression sur un dataset immobilier — feature engineering (surface par pièce, ancienneté), RMSE, analyse des résidus.",
          "Classification d'avis : TF-IDF + régression logistique pour prédire le sentiment — premier contact avec le texte.",
          "Segmentation clients : k-means sur les comportements d'achat — décrire les segments trouvés en langage métier.",
        ],
      },
      {
        kind: "text",
        text: "Un bon projet tient en un notebook structuré : question, données, exploration (graphiques), modélisation (baseline puis améliorations), limites, conclusion métier. La clarté du récit compte autant que le score.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "numpy-vectorisation",
    title: "NumPy : la vectorisation",
    level: 3,
    intro:
      "Calculer sur des tableaux entiers sans boucle Python : le fondement des performances.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Boucle vs vectorisation",
        code: `import numpy as np\n\na = np.array([1.0, 2.0, 3.0])\n\n# Vectorisé : une opération sur tout le tableau (exécutée en C)\nb = a * 2 + 1            # [3, 5, 7]\nc = np.sqrt(a)           # [1, 1.41, 1.73]\n\n# Broadcasting : (3,) + scalaire, (3,1) * (3,) -> (3,3)\nm = np.array([[1, 2, 3]])\nprint((m - m.mean(axis=1, keepdims=True)))   # centrer chaque ligne`,
      },
      {
        kind: "list",
        items: [
          "Règle : dès qu'on boucle en Python sur un tableau NumPy, on peut presque toujours vectoriser — 10 à 100× plus rapide.",
          "`axis` : `axis=0` opère sur les colonnes, `axis=1` sur les lignes — à maîtriser absolument.",
          "Broadcasting : les formes compatibles s'étendent automatiquement — puissant, mais vérifier les `shape` quand le résultat surprend.",
          "pandas est construit sur NumPy : `.values` donne le tableau sous-jacent quand on veut du pur numérique.",
        ],
      },
    ],
  },
  {
    id: "pandas-avance",
    title: "pandas avancé",
    level: 3,
    intro:
      "Les opérations qui font gagner des heures : merge, pivot, apply raisonné.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Assemblage et remodelage",
        code: `import pandas as pd\n\n# Fusion (JOIN)\ndf = commandes.merge(clients, on="client_id\", how="left\")\n\n# Pivot : une ligne par mois, une colonne par segment\npivot = df.pivot_table(index="mois\", columns="segment\",\n                       values="montant\", aggfunc="sum\")\n\n# Fenêtre glissante : moyenne mobile sur 7 jours\nserie = df.set_index("date\")[\"montant\"].sort_index()\nmobile = serie.rolling("7D\").mean()`,
      },
      {
        kind: "list",
        items: [
          "Après chaque `merge`, vérifier les comptages : une clé dupliquée multiplie les lignes et fausse tous les agrégats.",
          "`groupby().transform()` : calculer une statistique de groupe tout en gardant une ligne par ligne d'origine (ex. écart à la moyenne du segment).",
          "`apply` reste une boucle déguisée : préférer les opérations vectorisées natives.",
          "Catégorielles : convertir en `category` — mémoire divisée et `groupby` plus rapides.",
        ],
      },
    ],
  },
  {
    id: "nettoyage-donnees",
    title: "Nettoyage des données",
    level: 3,
    intro:
      "Le travail invisible : 80 % d'un projet, zéro gloire, toute la valeur.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Pipeline de nettoyage type",
        code: `import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv("clients.csv\")\n\n# 1. Doublons\ndf = df.drop_duplicates()\n\n# 2. Valeurs manquantes : stratégie par colonne\nprint(df.isna().mean().sort_values(ascending=False).head())\ndf["age\"] = df["age\"].fillna(df["age\"].median())      # numérique : médiane\ndf["segment\"] = df["segment\"].fillna("inconnu\")          # catégorielle : modalité\n\n# 3. Aberrantes : signaler, pas supprimer aveuglément\nq1, q3 = df["montant\"].quantile([0.25, 0.75])\nmasque = df["montant\"] > q3 + 3 * (q3 - q1)\nprint(f"{masque.sum()} montants extrêmes à vérifier\")`,
      },
      {
        kind: "list",
        items: [
          "Chaque décision de nettoyage est une hypothèse : la documenter (pourquoi la médiane ? pourquoi ce seuil ?).",
          "Ne jamais modifier la source : le nettoyage est un script rejouable, versionné.",
          "Tracer les volumes : lignes avant/après chaque étape — une étape qui supprime 30 % des lignes doit s'expliquer.",
          "Les valeurs manquantes ont souvent un sens (champ non rempli = information) : les supprimer sans réfléchir, c'est biaiser.",
        ],
      },
    ],
  },
  {
    id: "feature-engineering",
    title: "Feature engineering",
    level: 3,
    intro:
      "Créer les variables qui font les modèles : l'étape la plus rentable.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Créer des features métier",
        code: `import pandas as pd\nimport numpy as np\n\ndf["anciennete_jours\"] = (pd.Timestamp.now() - pd.to_datetime(df["date_inscription\"])).dt.days\ndf["panier_moyen\"] = df["ca_total\"] / df["nb_commandes\"].replace(0, np.nan)\ndf["frequence\"] = df["nb_commandes\"] / df["anciennete_jours\"].clip(lower=1)\n\n# Ratios et écarts : souvent plus informatifs que les bruts\ndf["ecart_panier_segment\"] = df["panier_moyen\"] - df.groupby("segment\")[\"panier_moyen\"].transform("mean\")`,
      },
      {
        kind: "list",
        items: [
          "Les meilleures features viennent du métier : « jours depuis dernier achat », « part du panier en promo » — pas des transformations automatiques.",
          "Ratios, écarts à une référence, tendances (pente sur 3 mois) : les formes qui capturent le comportement.",
          "Règle anti-fuite : chaque feature doit être calculable au moment de la prédiction, avec les seules données disponibles alors.",
          "Tester l'apport : ajouter une feature, mesurer le gain sur validation — garder ce qui aide, jeter le reste.",
        ],
      },
    ],
  },
  {
    id: "encodage-categorielles",
    title: "Encoder les variables catégorielles",
    level: 3,
    intro:
      "Les modèles mangent des nombres : convertir le texte sans le trahir.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "One-hot vs ordinal",
        code: `import pandas as pd\nfrom sklearn.preprocessing import OneHotEncoder\n\ndf = pd.DataFrame({"segment\": [\"A\", \"B\", \"A\", \"C\"]})\n\n# One-hot : une colonne binaire par modalité (sans ordre)\nenc = OneHotEncoder(sparse_output=False, handle_unknown="ignore\")\nprint(enc.fit_transform(df[[\"segment\"]]))\n\n# Ordinal : seulement si l'ordre a un sens (faible < moyen < fort)\ndf["niveau\"] = df["segment\"].map({"A\": 0, \"B\": 1, \"C\": 2})`,
      },
      {
        kind: "fields",
        title: "Quelle méthode quand",
        fields: [
          {
            label: "One-hot",
            value:
              "Catégories sans ordre (ville, segment). Attention à la dimension : 1000 modalités = 1000 colonnes — regrouper les rares en « autre ».",
          },
          {
            label: "Ordinal",
            value:
              "Uniquement si l'ordre est réel et à peu près linéaire (niveaux, notes). Sinon, le modèle invente une hiérarchie fausse.",
          },
          {
            label: "Target encoding",
            value:
              "Remplacer par la moyenne de la cible par modalité — puissant mais fuit facilement : à calculer strictement sur le train, avec lissage.",
          },
          {
            label: "Arbres",
            value:
              "Les forêts et boostings gèrent nativement les catégories (ou via encodage ordinal) : moins de préparation qu'en linéaire.",
          },
        ],
      },
    ],
  },
  {
    id: "train-validation-test",
    title: "Train / validation / test",
    level: 3,
    intro:
      "Trois jeux, trois rôles : la discipline de l'évaluation honnête.",
    blocks: [
      {
        kind: "diagram",
        title: "Découper sans tricher",
        lines: [
          "DONNÉES",
          "  ├── TRAIN (60-70 %)      : apprend les paramètres",
          "  ├── VALIDATION (15-20 %) : règle les hyperparamètres, compare les modèles",
          "  └── TEST (15-20 %)       : verdict final, lu UNE fois",
          "",
          "Règles :",
          "• le test ne sert jamais à choisir — sinon ce n'est plus un test",
          "• même distribution dans les trois (stratifier si classes déséquilibrées)",
          "• en temporel : découper par date (passé → futur), jamais au hasard",
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Split stratifié",
        code: `from sklearn.model_selection import train_test_split\n\nX_temp, X_test, y_temp, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42, stratify=y)\nX_train, X_val, y_train, y_val = train_test_split(\n    X_temp, y_temp, test_size=0.25, random_state=42, stratify=y_temp)\n# -> 60 % train, 20 % validation, 20 % test`,
      },
    ],
  },
  {
    id: "overfitting",
    title: "Sur-apprentissage (overfitting)",
    level: 3,
    intro:
      "Apprendre par cœur au lieu de généraliser : l'ennemi n°1.",
    blocks: [
      {
        kind: "diagram",
        title: "Le diagnostic : train vs validation",
        lines: [
          "erreur │",
          "     │  ╲___                       ╲___",
          "     │      ╲___  validation  __╱           ← remonte : overfitting",
          "     │          ╲__╱",
          "     │   ──────────── train (continue de baisser)",
          "     └────────────────────────────── complexité du modèle",
          "Tant que les deux baissent : le modèle apprend.",
          "Quand la validation remonte : il mémorise — s'arrêter / simplifier / régulariser.",
        ],
      },
      {
        kind: "fields",
        title: "Les remèdes",
        fields: [
          {
            label: "Plus de données",
            value:
              "Le remède le plus fiable : un modèle complexe avec beaucoup de données sur-apprend moins qu'avec peu.",
          },
          {
            label: "Simplifier",
            value:
              "Moins de profondeur, moins de features : réduire la capacité du modèle à mémoriser.",
          },
          {
            label: "Régularisation",
            value:
              "Pénaliser les gros coefficients (L1/L2 en linéaire) : forcer le modèle à rester simple.",
          },
          {
            label: "Validation croisée",
            value:
              "Mesurer sur plusieurs découpages : un score stable sur tous les plis inspire confiance.",
          },
          {
            label: "Arrêt précoce",
            value:
              "En itératif (boosting, réseaux) : stopper quand la validation cesse de s'améliorer.",
          },
        ],
      },
    ],
  },
  {
    id: "regression-lineaire",
    title: "Régression linéaire",
    level: 3,
    intro:
      "Le modèle le plus simple : une droite (ou un hyperplan) — et la référence.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Régression linéaire et lecture des coefficients",
        code: `import pandas as pd\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_squared_error\n\nmodele = LinearRegression()\nmodele.fit(X_train, y_train)\n\npred = modele.predict(X_test)\nrmse = mean_squared_error(y_test, pred) ** 0.5\nprint("RMSE:", rmse)\n\n# Les coefficients sont interprétables : effet marginal de chaque variable\ncoefs = pd.Series(modele.coef_, index=X_train.columns).sort_values()\nprint(coefs)`,
      },
      {
        kind: "list",
        items: [
          "Hypothèse : relation linéaire — à vérifier (résidus sans structure, pas d'entonnoir).",
          "Sensible aux outliers et aux features corrélées entre elles (multicolinéarité : coefficients instables).",
          "Standardiser les features si on veut comparer les coefficients entre eux.",
          "Reste la baseline de toute régression : simple, rapide, interprétable.",
        ],
      },
    ],
  },
  {
    id: "regression-logistique",
    title: "Régression logistique",
    level: 3,
    intro:
      "Le classifieur linéaire de référence : simple, calibré, interprétable.",
    blocks: [
      {
        kind: "text",
        text: "Malgré son nom, c'est une classification : elle modélise la probabilité d'appartenir à la classe positive via une fonction sigmoïde. Les probabilités sont généralement bien calibrées — utiles quand on a besoin d'un score de risque, pas juste d'une étiquette.",
      },
      {
        kind: "list",
        items: [
          "Coefficients interprétables : signe et amplitude indiquent le sens et la force de l'effet (après standardisation).",
          "Frontière linéaire : si les classes ne sont pas linéairement séparables, elle plafonne — passer aux arbres.",
          "Régularisation `C` : le paramètre à régler — petit `C` = forte régularisation.",
          "`max_iter` : augmenter si l'optimiseur ne converge pas (message d'avertissement explicite).",
        ],
      },
    ],
  },
  {
    id: "arbres-decision",
    title: "Arbres de décision",
    level: 3,
    intro:
      "Des règles « si… alors… » apprises des données : lisibles, non linéaires.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Arbre de décision (profondeur limitée)",
        code: `from sklearn.tree import DecisionTreeClassifier, plot_tree\nimport matplotlib.pyplot as plt\n\narbre = DecisionTreeClassifier(max_depth=4, random_state=42)\narbre.fit(X_train, y_train)\nprint("Profondeur réelle:\", arbre.get_depth())\n\nplot_tree(arbre, feature_names=X_train.columns.tolist(),\n          class_names=["non\", \"oui\"], filled=True, max_depth=2)\nplt.show()`,
      },
      {
        kind: "list",
        items: [
          "`max_depth` est LE paramètre : sans limite, l'arbre mémorise (overfitting garanti).",
          "Avantages : gère le non-linéaire, les interactions, les features hétérogènes sans standardisation.",
          "Inconvénients : instable (quelques données changées = arbre différent), biaisé vers les features à nombreuses modalités.",
          "Rarement utilisé seul : c'est la brique des forêts et du boosting.",
        ],
      },
    ],
  },
  {
    id: "forets-aleatoires",
    title: "Forêts aléatoires",
    level: 3,
    intro:
      "Beaucoup d'arbres valent mieux qu'un : le bagging.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "RandomForest : le modèle « par défaut »",
        code: `from sklearn.ensemble import RandomForestClassifier\n\nforet = RandomForestClassifier(n_estimators=200, random_state=42,\n                               n_jobs=-1)\nforet.fit(X_train, y_train)\nprint("Score validation:\", foret.score(X_val, y_val))\n\n# Importance des variables : ce que le modèle utilise vraiment\nimport pandas as pd\nimp = pd.Series(foret.feature_importances_,\n                index=X_train.columns).sort_values(ascending=False)\nprint(imp.head(10))`,
      },
      {
        kind: "text",
        text: "Principe : entraîner des centaines d'arbres sur des échantillons bootstrap avec des sous-ensembles de features, puis voter. La variance des arbres individuels s'annule — le sur-apprentissage recule fortement sans réglage fin.",
      },
      {
        kind: "list",
        items: [
          "Robuste « sortie de boîte » : peu d'hyperparamètres critiques (`n_estimators`, `max_depth`).",
          "Importances des variables : un premier diagnostic métier — à interpréter avec prudence (biais vers les variables à forte cardinalité).",
          "Limites : peu interprétable globalement, lent à prédire avec beaucoup d'arbres, extrapole mal hors des données vues.",
        ],
      },
    ],
  },
  {
    id: "gradient-boosting",
    title: "Gradient boosting",
    level: 3,
    intro:
      "Corriger les erreurs des précédents : souvent le meilleur sur données tabulaires.",
    blocks: [
      {
        kind: "text",
        text: "Le boosting construit les arbres en séquence : chaque nouvel arbre apprend à corriger les erreurs des précédents. C'est la famille la plus performante sur données tabulaires (XGBoost, LightGBM, CatBoost en implémentations — HistGradientBoosting dans scikit-learn).",
      },
      {
        kind: "list",
        items: [
          "Plus puissant que la forêt, mais plus sensible aux hyperparamètres (`learning_rate`, `n_estimators`, `max_depth`) et au sur-apprentissage.",
          "Arrêt précoce (`early_stopping`) : indispensable — on surveille la validation et on stoppe quand elle stagne.",
          "En pratique : la forêt pour une baseline robuste, le boosting quand on cherche les derniers points de performance.",
          "Sur données tabulaires, le boosting bat généralement le deep learning — les réseaux de neurones brillent sur image, texte et son.",
        ],
      },
    ],
  },
  {
    id: "clustering-kmeans",
    title: "Clustering : k-means",
    level: 3,
    intro:
      "Regrouper sans étiquettes : l'apprentissage non supervisé.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "k-means et choix de k",
        code: `from sklearn.cluster import KMeans\nfrom sklearn.preprocessing import StandardScaler\n\n# Standardiser : k-means est sensible aux échelles\nXs = StandardScaler().fit_transform(X)\n\ninerties = []\nfor k in range(2, 9):\n    km = KMeans(n_clusters=k, n_init=10, random_state=42)\n    km.fit(Xs)\n    inerties.append(km.inertia_)\n# Tracer inerties : le « coude » suggère k`,
      },
      {
        kind: "list",
        items: [
          "Standardiser avant : sans cela, la variable à grande échelle écrase les autres dans les distances.",
          "Choisir `k` : méthode du coude, silhouette — mais surtout sens métier des segments obtenus.",
          "Décrire chaque cluster (moyennes par variable) : un cluster indéfinissable en langage métier ne sert à rien.",
          "`n_init=10` : relancer avec plusieurs initialisations — k-means dépend du point de départ.",
          "Limites : clusters sphériques de tailles comparables — sinon, DBSCAN ou modèles de mélange.",
        ],
      },
    ],
  },
  {
    id: "validation-croisee",
    title: "Validation croisée",
    level: 3,
    intro:
      "Évaluer sur plusieurs découpages : un score en qui on peut croire.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Validation croisée stratifiée",
        code: `from sklearn.model_selection import cross_val_score, StratifiedKFold\nfrom sklearn.ensemble import RandomForestClassifier\n\ncv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)\nscores = cross_val_score(RandomForestClassifier(random_state=42),\n                         X, y, cv=cv, scoring="f1\")\nprint(scores)                    # un score par pli\nprint(f"{scores.mean():.3f} ± {scores.std():.3f}\")`,
      },
      {
        kind: "list",
        items: [
          "5 plis : chaque exemple est testé une fois, entraîné 4 fois — on utilise toutes les données pour l'évaluation.",
          "Écart-type élevé entre plis = modèle instable ou données trop peu nombreuses.",
          "Stratifiée en classification : chaque pli garde la proportion des classes.",
          "En séries temporelles : découpage chronologique (pas de mélange) — voir la section dédiée.",
          "La CV sert à comparer des modèles et régler des hyperparamètres — le test final reste séparé.",
        ],
      },
    ],
  },
  {
    id: "hyperparametres",
    title: "Régler les hyperparamètres",
    level: 3,
    intro:
      "Chercher les bons réglages : méthodique, pas au hasard.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Recherche aléatoire (souvent meilleure que la grille)",
        code: `from sklearn.model_selection import RandomizedSearchCV\nfrom sklearn.ensemble import RandomForestClassifier\nfrom scipy.stats import randint\n\nrecherche = RandomizedSearchCV(\n    RandomForestClassifier(random_state=42),\n    param_distributions={"n_estimators\": randint(100, 500),\n                         "max_depth\": randint(3, 15),\n                         "min_samples_leaf\": randint(1, 10)},\n    n_iter=20, cv=3, scoring="f1\", random_state=42, n_jobs=-1)\nrecherche.fit(X_train, y_train)\nprint(recherche.best_params_, recherche.best_score_)`,
      },
      {
        kind: "list",
        items: [
          "Recherche aléatoire > grille exhaustive : à budget égal, elle explore mieux les paramètres importants.",
          "Régler sur la validation (ou CV interne), jamais sur le test.",
          "Ordre de grandeur : `n_estimators` et `max_depth` d'abord, le reste ensuite — 80 % du gain vient de 20 % des paramètres.",
          "Noter chaque expérience : paramètres, score, durée — sinon on tourne en rond.",
        ],
      },
    ],
  },
  {
    id: "metriques-classification",
    title: "Métriques de classification avancées",
    level: 3,
    intro:
      "Au-delà de l'accuracy : courbes ROC, précision-rappel, calibration.",
    blocks: [
      {
        kind: "fields",
        title: "Les outils d'évaluation",
        fields: [
          {
            label: "Courbe ROC / AUC",
            value:
              "Taux de vrais positifs vs faux positifs à tous les seuils. AUC = 0.5 : hasard ; 1.0 : parfait. Utile pour comparer des modèles indépendamment du seuil.",
          },
          {
            label: "Courbe précision-rappel",
            value:
              "Plus informative que ROC quand les positifs sont rares (fraude, maladie) : elle se concentre sur la classe d'intérêt.",
          },
          {
            label: "Seuil de décision",
            value:
              "Le 0.5 par défaut est arbitraire : on le déplace selon le coût des erreurs — baisser le seuil augmente le rappel au prix de la précision.",
          },
          {
            label: "Calibration",
            value:
              "« 80 % de probabilité » doit arriver 80 % du temps. À vérifier (courbe de calibration) quand le score sert à décider d'un risque.",
          },
          {
            label: "Log-loss",
            value:
              "Pénalise les probabilités confiantes et fausses : la métrique quand la qualité des probabilités compte, pas juste le classement.",
          },
        ],
      },
    ],
  },
  {
    id: "metriques-regression",
    title: "Métriques de régression",
    level: 3,
    intro:
      "Mesurer l'erreur de prédiction : MAE, RMSE, R².",
    blocks: [
      {
        kind: "fields",
        title: "Les métriques",
        fields: [
          {
            label: "MAE",
            value:
              "Erreur absolue moyenne : dans l'unité de la cible, robuste aux outliers. « En moyenne, on se trompe de X € ».",
          },
          {
            label: "RMSE",
            value:
              "Racine de l'erreur quadratique moyenne : pénalise les grosses erreurs. Sensible aux outliers — à comparer avec la MAE pour les détecter.",
          },
          {
            label: "R²",
            value:
              "Part de variance expliquée (1 = parfait, 0 = aussi bien que la moyenne). Pratique pour comparer, mais ne dit pas si l'erreur est acceptable métier.",
          },
          {
            label: "MAPE",
            value:
              "Erreur en pourcentage : intuitive, mais explose quand la cible est proche de zéro — à éviter alors.",
          },
        ],
      },
      {
        kind: "text",
        text: "Toujours comparer à une baseline : prédire la moyenne (ou la valeur précédente en temporel). Un R² de 0.7 est excellent si la baseline est à 0.1, médiocre si elle est à 0.68.",
      },
    ],
  },
  {
    id: "desequilibre-classes",
    title: "Classes déséquilibrées",
    level: 3,
    intro:
      "Quand les positifs sont rares : 1 % de fraude, 5 % de churn.",
    blocks: [
      {
        kind: "list",
        items: [
          "L'accuracy ment : prédire toujours la majorité donne 99 % — et zéro détection. Utiliser précision, rappel, F1, AUC-PR.",
          "Stratifier les splits : chaque jeu (train/val/test) doit contenir des positifs, sinon l'évaluation est vide.",
          "`class_weight='balanced'` : pénaliser davantage les erreurs sur la classe rare — le premier levier, sans toucher aux données.",
          "Seuil de décision : l'ajuster sur la courbe précision-rappel selon le coût métier des faux positifs/négatifs.",
          "Sur-échantillonnage (SMOTE) : créer des positifs synthétiques — à appliquer uniquement sur le train, jamais avant le split (fuite).",
          "En dernier recours : reformuler — détecter des anomalies plutôt que classifier, ou changer la granularité.",
        ],
      },
    ],
  },
  {
    id: "data-leakage",
    title: "Fuite de données (data leakage)",
    level: 3,
    intro:
      "Le bug le plus coûteux : des informations du futur dans l'entraînement.",
    blocks: [
      {
        kind: "list",
        items: [
          "Définition : le modèle apprend avec une information qui ne sera pas disponible au moment de prédire — score gonflé en test, nul en production.",
          "Exemples : « date de résiliation » pour prédire le churn, normalisation calculée sur tout le dataset (test inclus), imputation avec la médiane globale.",
          "Symptômes : score « trop beau » (99 %), chute brutale en production, une feature avec une importance écrasante et suspecte.",
          "Prévention : raisonner « qu'est-ce que je saurai au moment de prédire ? » pour chaque feature ; `Pipeline` scikit-learn qui encapsule prétraitement + modèle (le scaler est fité sur le train uniquement).",
          "En temporel : toute statistique calculée sur le futur (moyenne glissante centrée) est une fuite.",
        ],
      },
    ],
  },
  {
    id: "pipelines-sklearn",
    title: "Pipelines scikit-learn",
    level: 3,
    intro:
      "Encapsuler prétraitement + modèle : l'arme anti-fuite.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Pipeline + ColumnTransformer",
        code: `import pandas as pd\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.ensemble import RandomForestClassifier\n\nnum = ["age\", \"anciennete_mois\"]\ncat = ["segment\"]\n\npreprocess = ColumnTransformer([\n    ("num\", Pipeline([("imp\", SimpleImputer(strategy="median\")),\n                       ("std\", StandardScaler())]), num),\n    ("cat\", Pipeline([("imp\", SimpleImputer(strategy="constant\",\n                                                fill_value="inconnu\")),\n                       ("oh\", OneHotEncoder(handle_unknown="ignore\"))]), cat),\n])\n\npipe = Pipeline([("prep\", preprocess),\n                 ("modele\", RandomForestClassifier(random_state=42))])\npipe.fit(X_train, y_train)   # tout est fité sur le train uniquement\nprint(pipe.score(X_test, y_test))`,
      },
      {
        kind: "text",
        text: "Le Pipeline garantit que chaque transformation est apprise sur le train et appliquée au test — plus de fuite par normalisation. Bonus : un seul objet à sauvegarder et déployer (`joblib.dump(pipe)`), et la validation croisée évalue le tout honnêtement.",
      },
    ],
  },
  {
    id: "series-temporelles",
    title: "Séries temporelles",
    level: 3,
    intro:
      "Prédire dans le temps : les règles changent.",
    blocks: [
      {
        kind: "list",
        items: [
          "Découpage chronologique : le test est APRÈS le train dans le temps — jamais de mélange aléatoire (fuite du futur).",
          "Features de retard (lags) : `ventes J-7`, `moyenne 4 semaines` — le passé récent prédit le futur proche.",
          "Saisonnalité : jour de semaine, mois, jours fériés en features explicites — les modèles ne devinent pas le calendrier.",
          "Stationnarité : beaucoup de méthodes supposent une série stable — différencier (`y[t] - y[t-1]`) si tendance.",
          "Évaluation : backtesting — entraîner jusqu'en T, prédire T+1, avancer la fenêtre, répéter (validation croisée temporelle).",
          "Baseline : la valeur précédente (ou la même période l'an dernier) — difficile à battre sur des séries bruitées.",
        ],
      },
    ],
  },
  {
    id: "nlp-tfidf",
    title: "Texte : TF-IDF et classification",
    level: 3,
    intro:
      "Transformer du texte en features : la porte d'entrée du NLP.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "TF-IDF + régression logistique",
        code: `from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import Pipeline\n\npipe = Pipeline([\n    ("tfidf\", TfidfVectorizer(max_features=5000, ngram_range=(1, 2))),\n    ("clf\", LogisticRegression(max_iter=1000)),\n])\npipe.fit(textes_train, y_train)\nprint(pipe.score(textes_test, y_test))`,
      },
      {
        kind: "text",
        text: "TF-IDF pèse chaque mot par sa fréquence dans le document et sa rareté dans le corpus : les mots distinctifs ressortent. Avec des bigrammes (`ngram_range=(1, 2)`), « pas bon » se distingue de « bon ». Simple, rapide, souvent très efficace — avant de sortir les modèles de langue.",
      },
    ],
  },
  {
    id: "interpretabilite",
    title: "Interprétabilité",
    level: 3,
    intro:
      "Comprendre ce que le modèle a appris : global et local.",
    blocks: [
      {
        kind: "fields",
        title: "Les approches",
        fields: [
          {
            label: "Importance globale",
            value:
              "Quelles variables comptent en général (`feature_importances_`, permutation importance). La permutation — mélanger une colonne et mesurer la chute — est plus fiable que l'importance native.",
          },
          {
            label: "Explication locale (SHAP)",
            value:
              "Pourquoi CE client est prédit à risque : contribution de chaque variable à cette prédiction. Indispensable pour justifier une décision individuelle.",
          },
          {
            label: "Courbes de dépendance partielle",
            value:
              "Comment la prédiction varie quand une variable change, les autres fixées : révèle les seuils et les non-linéarités.",
          },
          {
            label: "Modèles interprétables",
            value:
              "Régression, petits arbres : quand l'enjeu (réglementaire, médical) exige de comprendre le modèle entier, la simplicité prime sur le score.",
          },
        ],
      },
      {
        kind: "text",
        text: "« Le modèle dit non » ne suffit jamais face à un métier ou un régulateur. L'interprétabilité n'est pas un luxe : c'est ce qui rend un modèle déployable.",
      },
    ],
  },
  {
    id: "statistiques-tests",
    title: "Statistiques : tests et incertitude",
    level: 3,
    intro:
      "Quantifier l'incertitude : p-values, intervalles, A/B testing.",
    blocks: [
      {
        kind: "list",
        items: [
          "p-value : probabilité d'observer un effet au moins aussi fort si l'hypothèse nulle était vraie — pas la probabilité que l'hypothèse soit vraie.",
          "Intervalle de confiance : la fourchette plausible du vrai paramètre — plus informatif qu'un oui/non.",
          "A/B testing : randomiser, dimensionner l'échantillon à l'avance, fixer la durée, analyser une fois — arrêter « quand c'est significatif » invalide tout.",
          "Comparaisons multiples : tester 20 variantes garantit presque un faux positif — corriger (Bonferroni) ou hiérarchiser les hypothèses.",
          "Taille d'effet : une différence « significative » peut être négligeable métier — toujours rapporter l'ampleur, pas juste la significativité.",
        ],
      },
    ],
  },
  {
    id: "biais-equite",
    title: "Biais et équité",
    level: 3,
    intro:
      "Les modèles apprennent les biais des données : les mesurer, les atténuer.",
    blocks: [
      {
        kind: "list",
        items: [
          "Les données historiques reflètent des décisions passées biaisées : un modèle de recrutement entraîné sur des embauches passées reproduit leurs biais.",
          "Mesurer par groupe : taux d'erreur, précision, rappel par segment — un score global peut cacher une catastrophe sur un sous-groupe.",
          "Variables proxy : retirer « l'origine » ne suffit pas si le code postal la révèle — auditer les corrélations.",
          "Atténuation : rééquilibrer, contraindre l'équité pendant l'entraînement, ou ajuster les seuils par groupe — chaque choix a un coût à expliciter.",
          "Documentation : noter les limites connues du modèle — pour quels groupes il est validé, pour lesquels il ne l'est pas.",
        ],
      },
    ],
  },
  {
    id: "deploiement-modele",
    title: "Déployer un modèle",
    level: 3,
    intro:
      "Du notebook à la production : sauvegarder, servir, versionner.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Sauvegarder et recharger un pipeline",
        code: `import joblib\n\n# Sauvegarder le pipeline ENTIER (prétraitement + modèle)\njoblib.dump(pipe, "modele_churn_v1.joblib\")\n\n# En production : recharger et prédire\nmodele = joblib.load("modele_churn_v1.joblib\")\nscore = modele.predict_proba(nouveau_client)[0, 1]`,
      },
      {
        kind: "list",
        items: [
          "Sauvegarder le Pipeline entier, pas juste le modèle : le prétraitement doit être identique entre entraînement et production.",
          "Versionner : `modele_churn_v1` — données, code et paramètres tracés pour chaque version. On doit pouvoir dire quel modèle a produit quelle prédiction.",
          "Servir : API (FastAPI) pour du temps réel, batch quotidien pour du scoring de masse — selon la latence requise.",
          "Valider à l'entrée : les features en production doivent passer les mêmes contrôles qu'à l'entraînement (types, plages, valeurs manquantes).",
        ],
      },
    ],
  },
  {
    id: "monitoring-derive",
    title: "Monitoring et dérive",
    level: 3,
    intro:
      "Un modèle se dégrade : détecter avant que le métier s'en aperçoive.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'on surveille",
        fields: [
          {
            label: "Dérive des données",
            value:
              "La distribution des features change (nouveaux clients, nouveau produit) : comparer les distributions prod vs entraînement (tests statistiques, PSI).",
          },
          {
            label: "Dérive du concept",
            value:
              "La relation feature→cible change (comportements post-crise) : les données sont les mêmes, mais le monde a changé. Seule la performance la révèle.",
          },
          {
            label: "Performance",
            value:
              "Quand les vrais labels arrivent (avec retard), mesurer les métriques en continu — la vérité terrain finit toujours par parler.",
          },
          {
            label: "Santé technique",
            value:
              "Latence, taux d'erreur, valeurs manquantes en entrée : un modèle qui ne reçoit plus de données ne prédit plus rien d'utile.",
          },
        ],
      },
      {
        kind: "text",
        text: "Politique de réentraînement : calendrier (mensuel), seuil (dérive détectée) ou les deux. Et toujours : garder l'ancien modèle prêt à reprendre (rollback) — un réentraînement peut dégrader.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les fautes qui coûtent cher en data science.",
    blocks: [
      {
        kind: "list",
        items: [
          "Fuite de données : la plus coûteuse — score magnifique en test, nul en production. Toujours se demander « qu'est-ce que je saurai au moment de prédire ? »",
          "Évaluer sur le train : sans jeu de test séparé, le score ne mesure que la mémorisation.",
          "Tuner sur le test : choisir le modèle sur le test, c'est en faire une validation déguisée — le « test » ne teste plus rien.",
          "Ignorer la baseline : un modèle complexe qui bat à peine la moyenne n'apporte rien.",
          "Trop de features, pas de sélection : le bruit noie le signal — la parcimonie gagne.",
          "Oublier le métier : optimiser l'accuracy quand le coût est dans les faux négatifs — la métrique doit refléter le coût réel.",
          "Sur-optimiser le score : 0.5 point de F1 gagné en 3 semaines de tuning vaut rarement le coup face à une meilleure feature.",
          "Déployer sans monitoring : le modèle se dégrade en silence jusqu'à ce que quelqu'un remarque.",
        ],
      },
    ],
  },
  {
    id: "debugging-ml",
    title: "Déboguer un modèle",
    level: 3,
    intro:
      "Quand le score est mauvais : l'analyse d'erreur méthodique.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Regarder les erreurs",
            detail:
              "Échantillonner 50 prédictions fausses et les examiner : y a-t-il un motif (un segment, un format, une période) ? Les erreurs racontent ce qui manque.",
          },
          {
            title: "Vérifier les données d'abord",
            detail:
              "Avant de toucher au modèle : labels corrects ? features calculées juste ? fuite ? 80 % des « mauvais modèles » sont des problèmes de données.",
          },
          {
            title: "Comparer train et validation",
            detail:
              "Les deux mauvais : sous-apprentissage (modèle trop simple, features insuffisantes). Train bon, validation mauvaise : sur-apprentissage.",
          },
          {
            title: "Ablation",
            detail:
              "Retirer/ajouter une feature à la fois : laquelle aide vraiment ? Les features inutiles ajoutent du bruit.",
          },
          {
            title: "Simplifier pour comprendre",
            detail:
              "Un petit arbre ou une régression sur le problème : si même le simple échoue, le problème est dans les données, pas dans le modèle.",
          },
        ],
      },
    ],
  },
  {
    id: "reproductibilite-seeds",
    title: "Reproductibilité avancée",
    level: 3,
    intro:
      "L'aléatoire partout : le domestiquer.",
    blocks: [
      {
        kind: "list",
        items: [
          "Graines partout : `random_state` dans les splits, les modèles, les recherches — chaque source d'aléatoire doit être fixée.",
          "Versions figées : `requirements.txt` exact — un changement de version de scikit-learn peut déplacer les scores.",
          "Données versionnées : hash ou snapshot du dataset d'entraînement — « le CSV de mardi » n'est pas une référence.",
          "Enregistrer l'environnement complet : versions Python, OS si critique — les différences numériques existent.",
          "Accepter une part d'aléatoire résiduel (parallélisme, GPU) : documenter la variabilité observée au lieu de prétendre l'exactitude.",
        ],
      },
    ],
  },
  {
    id: "projets-avances",
    title: "Projets avancés",
    level: 3,
    intro:
      "Des projets qui prouvent un niveau professionnel.",
    blocks: [
      {
        kind: "list",
        items: [
          "Churn de bout en bout : EDA → features → 3 modèles comparés → interprétabilité (SHAP) → API de scoring → monitoring — le projet portfolio complet.",
          "Détection de fraude : classes ultra-déséquilibrées, courbe précision-rappel, seuil calibré sur le coût métier, analyse des faux positifs.",
          "Prévision de demande : séries temporelles avec lags et saisonnalité, backtesting, comparaison à la baseline naïve.",
          "Système de recommandation simple : filtrage collaboratif ou basé sur le contenu — similarités, évaluation par rang.",
          "NLP appliqué : classification de tickets support avec TF-IDF, analyse des erreurs par catégorie, suggestions d'amélioration du routage.",
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro:
      "Les références officielles et les livres reconnus.",
    blocks: [
      {
        kind: "list",
        items: [
          "Documentation scikit-learn (scikit-learn.org) : guides utilisateurs, exemples exécutables, référence API — la première source pour tout algorithme.",
          "« Hands-On Machine Learning » (Aurélien Géron, O'Reilly) : le livre de référence pratique, avec scikit-learn puis TensorFlow.",
          "« An Introduction to Statistical Learning » (James, Witten, Hastie, Tibshirani) : la théorie claire, avec exercices — gratuit en ligne.",
          "Documentation pandas — « 10 minutes to pandas » et le cookbook.",
          "Kaggle : datasets, notebooks partagés et compétitions pour pratiquer sur des problèmes réels.",
          "Google Machine Learning Crash Course : gratuit, avec exercices, orienté pratique.",
        ],
      },
      {
        kind: "text",
        text: "Les documentations officielles sont liées depuis les pages via le bouton « Documentation officielle » ; cours et livres sont cités par leur nom exact.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "La data science maîtrisée, voici les prolongements naturels.",
    blocks: [
      {
        kind: "fields",
        title: "Pistes de progression",
        fields: [
          {
            label: "`machine-learning`",
            value:
              "Approfondir les algorithmes : théorie, SVM, méthodes à noyaux, apprentissage non supervisé avancé.",
          },
          {
            label: "`deep-learning`",
            value:
              "Réseaux de neurones avec PyTorch : indispensable pour l'image, le texte et les séquences.",
          },
          {
            label: "`statistics`",
            value:
              "Inférence, modèles linéaires généralisés, plans d'expérience : la rigueur derrière les conclusions.",
          },
          {
            label: "`data-engineering`",
            value:
              "Industrialiser : pipelines de features, orchestration, qualité — passer du notebook au système.",
          },
          {
            label: "`mlops`",
            value:
              "Déploiement, monitoring, réentraînement : transformer des expériences en produits.",
          },
          {
            label: "Prochain pas concret",
            value:
              "Mener un projet de bout en bout jusqu'au déploiement (même une API locale) : c'est le déploiement qui transforme un exercice en expérience.",
          },
        ],
      },
    ],
  },
];

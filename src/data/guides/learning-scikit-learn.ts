import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de scikit-learn : du premier modèle au ML de production.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_SCIKIT_LEARN: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est scikit-learn, sa place dans le machine learning et pourquoi c'est le point de départ standard.",
    blocks: [
      {
        kind: "text",
        text: "Scikit-learn est la bibliothèque Python de référence pour le machine learning classique : régression, classification, clustering, avec une API uniforme et une documentation exemplaire. Elle couvre tout le ML « tabulaire » — prédire à partir de tableaux de données — sans GPU ni deep learning.",
      },
      {
        kind: "text",
        text: "Pourquoi elle domine : pour la majorité des problèmes tabulaires, un modèle scikit-learn bien réglé bat des approches plus complexes — plus vite, avec moins de données, et de façon interprétable. C'est l'outil de production du ML traditionnel et le meilleur terrain d'apprentissage des fondamentaux : découpage des données, validation, métriques, overfitting.",
      },
      {
        kind: "text",
        text: "Positionnement : scikit-learn ne fait pas de deep learning (c'est PyTorch/TensorFlow), ni de manipulation de données (c'est pandas/NumPy). Elle se concentre sur une chose — apprendre des modèles à partir de données préparées — et la fait avec une cohérence d'API devenue la référence du domaine.",
      },
    ],
  },
  {
    id: "api-uniforme",
    title: "L'API uniforme : fit / predict / score",
    level: 1,
    intro:
      "Le concept central : tous les modèles se manipulent de la même façon.",
    blocks: [
      {
        kind: "diagram",
        title: "Le cycle de vie d'un estimator",
        lines: [
          "Données (X, y)",
          "     │",
          "     ▼",
          "modèle = RandomForestClassifier()   ← créer (hyperparamètres)",
          "     │",
          "     ▼",
          "modèle.fit(X_train, y_train)        ← apprendre",
          "     │",
          "     ▼",
          "modèle.predict(X_test)              ← prédire",
          "     │",
          "     ▼",
          "modèle.score(X_test, y_test)        ← évaluer",
        ],
      },
      {
        kind: "text",
        text: "Un « estimator » est tout objet avec `fit` (apprendre) et, selon le cas, `predict` (prédire), `transform` (transformer) ou `score` (évaluer). Régression logistique, forêt aléatoire, SVM, k-means : même interface. Changer de modèle, c'est changer une ligne — ce qui rend l'expérimentation et la comparaison systématiques au lieu d'artisanales.",
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
      "Scikit-learn suppose un socle Python data et des notions de ML.",
    blocks: [
      {
        kind: "fields",
        title: "Bases requises",
        fields: [
          {
            label: "Python (`python`)",
            value:
              "Manipuler des données avec pandas/NumPy et structurer du code : scikit-learn s'utilise en Python, avec des tableaux NumPy en entrée.",
          },
          {
            label: "NumPy (`numpy`)",
            value:
              "Les tableaux `ndarray` : `X` est une matrice (n_exemples, n_features), `y` un vecteur. Comprendre les formes (shapes) évite 80 % des erreurs.",
          },
          {
            label: "pandas (`pandas`)",
            value:
              "Charger, inspecter et nettoyer les données tabulaires avant de les passer au modèle.",
          },
          {
            label: "Machine learning (`machine-learning`)",
            value:
              "Comprendre entraînement/validation, overfitting et le choix d'un modèle selon le problème — sinon on applique des recettes sans comprendre les résultats.",
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
      "Installer scikit-learn et vérifier que tout fonctionne.",
    blocks: [
      {
        kind: "command",
        label: "Installer via pip",
        command: "pip install scikit-learn",
        why: "Installe scikit-learn et ses dépendances (NumPy, SciPy) automatiquement. Dans un environnement virtuel dédié au projet, jamais dans le Python système.",
        verify: "python -c \"import sklearn; print(sklearn.__version__)\"",
      },
      {
        kind: "text",
        text: "Recommandation : travaillez dans un environnement virtuel (`python -m venv .venv`) et figez les versions (`pip freeze > requirements.txt`). Un modèle entraîné avec une version et réutilisé avec une autre peut se comporter différemment.",
      },
    ],
  },
  {
    id: "premier-modele",
    title: "Premier modèle : le pipeline complet",
    level: 2,
    intro:
      "De zéro à un modèle évalué en dix lignes : le workflow que vous répéterez des centaines de fois.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Charger des données",
            detail: "`from sklearn.datasets import load_iris` : un dataset réel intégré (150 fleurs, 4 mesures, 3 espèces). Parfait pour apprendre sans chercher de données.",
          },
          {
            title: "Séparer entraînement et test",
            detail: "`train_test_split(X, y, test_size=0.2, random_state=42)` : 80 % pour apprendre, 20 % gardés de côté pour évaluer honnêtement.",
          },
          {
            title: "Choisir et entraîner",
            detail: "`clf = RandomForestClassifier(random_state=42)` puis `clf.fit(X_train, y_train)` : le modèle apprend sur les données d'entraînement.",
          },
          {
            title: "Prédire et évaluer",
            detail: "`clf.predict(X_test)` prédit, `clf.score(X_test, y_test)` donne la précision sur des données jamais vues pendant l'entraînement.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Le workflow minimal complet",
        code: "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\n\nX, y = load_iris(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)\nclf = RandomForestClassifier(random_state=42)\nclf.fit(X_train, y_train)\nprint(\"Précision :\", clf.score(X_test, y_test))",
      },
    ],
  },
  {
    id: "train-test-split",
    title: "Séparer les données : train/test",
    level: 2,
    intro:
      "La règle d'or de l'évaluation honnête : ne jamais tester sur les données d'entraînement.",
    blocks: [
      {
        kind: "text",
        text: "Évaluer un modèle sur ses données d'entraînement, c'est interroger un élève sur le corrigé qu'il a appris par cœur : le score est flatteur et ne dit rien de la performance réelle. `train_test_split` réserve un jeu de test intact, représentatif, et le `random_state` fixe le découpage pour la reproductibilité.",
      },
      {
        kind: "list",
        items: [
          "`test_size=0.2` : 20 % de test est un défaut raisonnable ; plus de données = plus de fiabilité d'évaluation.",
          "`stratify=y` en classification : conserve la proportion des classes dans chaque split — indispensable sur des classes déséquilibrées.",
          "Le jeu de test ne sert qu'à la fin : tout réglage basé sur le test est une fuite qui biaise l'évaluation.",
          "Données temporelles : pas de split aléatoire — on entraîne sur le passé, on teste sur le futur (sinon on « prédit » le passé).",
        ],
      },
    ],
  },
  {
    id: "preprocessing-base",
    title: "Prétraitement : les bases",
    level: 2,
    intro:
      "Les modèles apprennent mieux sur des données préparées : mise à l'échelle et encodage.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Standardiser et encoder",
        code: "from sklearn.preprocessing import StandardScaler, OneHotEncoder\n\n# Centrer-réduire les variables numériques\nscaler = StandardScaler()\nX_num_scaled = scaler.fit_transform(X_num)\n\n# Encoder une variable catégorielle\nenc = OneHotEncoder(sparse_output=False)\nX_cat_enc = enc.fit_transform(X_cat)",
      },
      {
        kind: "text",
        text: "Pourquoi : les modèles sensibles aux distances (SVM, k-NN, régression régularisée) sont dominés par les variables à grande échelle si on ne standardise pas. Les modèles n'acceptent que des nombres : les catégories (« rouge », « vert ») doivent être encodées — `OneHotEncoder` crée une colonne binaire par modalité, sans ordre artificiel.",
      },
      {
        kind: "text",
        text: "Règle anti-fuite : `fit` sur le train uniquement, `transform` sur train et test. Ajuster le scaler sur tout le dataset (test inclus), c'est laisser le test influencer l'entraînement.",
      },
    ],
  },
  {
    id: "pipelines",
    title: "Pipelines : enchaîner sans fuites",
    level: 2,
    intro:
      "Le prétraitement et le modèle en un seul objet : la bonne pratique n°1.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Pipeline preprocessing + modèle",
        code: "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\n\npipe = Pipeline([\n    (\"scaler\", StandardScaler()),\n    (\"modele\", LogisticRegression(max_iter=1000)),\n])\npipe.fit(X_train, y_train)\nprint(pipe.score(X_test, y_test))",
      },
      {
        kind: "text",
        text: "Le pipeline applique `fit_transform` à chaque étape sur le train et `transform` sur le test, automatiquement : impossible d'oublier d'appliquer le scaler au test, impossible de fuiter. En validation croisée, le preprocessing est réajusté proprement à chaque fold. Un modèle sans pipeline est un bug en attente.",
      },
    ],
  },
  {
    id: "cross-validation",
    title: "Validation croisée",
    level: 2,
    intro:
      "Une évaluation robuste : tester sur plusieurs découpages, pas un seul.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Validation croisée à 5 plis",
        code: "from sklearn.model_selection import cross_val_score\n\nscores = cross_val_score(pipe, X, y, cv=5)\nprint(scores)\nprint(f\"Moyenne : {scores.mean():.3f} (+/- {scores.std():.3f})\")",
      },
      {
        kind: "text",
        text: "Principe : on découpe les données en 5 plis, on entraîne 5 fois (4 plis en train, 1 en test à chaque fois) et on moyenne. La moyenne estime la performance réelle, l'écart-type sa stabilité. Un modèle à 95 % ± 8 % est moins fiable qu'un modèle à 93 % ± 1 %.",
      },
    ],
  },
  {
    id: "metriques-essentielles",
    title: "Métriques : choisir la bonne",
    level: 2,
    intro:
      "La précision ne dit pas tout : mesurer ce qui coûte vraiment.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Rapport de classification",
        code: "from sklearn.metrics import classification_report\n\ny_pred = pipe.predict(X_test)\nprint(classification_report(y_test, y_pred))",
      },
      {
        kind: "text",
        text: "Le rapport donne précision, rappel et F1 par classe : sur un détecteur de fraude où 99 % des transactions sont saines, un modèle qui prédit toujours « sain » atteint 99 % de précision en étant inutile. Le rappel (quelle part des fraudes détectée ?) est la métrique qui compte. Règle : choisissez la métrique selon le coût des erreurs, pas selon sa popularité.",
      },
    ],
  },
  {
    id: "grid-search",
    title: "Grid search : régler les hyperparamètres",
    level: 2,
    intro:
      "Explorer systématiquement les réglages au lieu de deviner.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Recherche sur grille",
        code: "from sklearn.model_selection import GridSearchCV\n\nparams = {\n    \"modele__n_estimators\": [100, 200],\n    \"modele__max_depth\": [None, 10, 20],\n}\nsearch = GridSearchCV(pipe, params, cv=3)\nsearch.fit(X_train, y_train)\nprint(\"Meilleurs params :\", search.best_params_)\nprint(\"Score :\", search.best_score_)",
      },
      {
        kind: "text",
        text: "`GridSearchCV` teste chaque combinaison avec validation croisée et garde la meilleure. La notation `modele__n_estimators` cible le paramètre `n_estimators` de l'étape `modele` du pipeline. Attention au coût : la grille grandit exponentiellement — commencez large et grossier, affinez ensuite autour du meilleur.",
      },
    ],
  },
  {
    id: "workflow-jupyter",
    title: "Workflow : Jupyter et VS Code",
    level: 2,
    intro:
      "L'environnement de travail standard pour l'expérimentation ML.",
    blocks: [
      {
        kind: "fields",
        title: "Environnement",
        fields: [
          {
            label: "Jupyter",
            value:
              "Le notebook interactif : exécuter par cellules, visualiser immédiatement, itérer vite. Idéal pour l'exploration.",
          },
          {
            label: "VS Code + extensions Python et Jupyter",
            value:
              "Les notebooks dans l'éditeur, avec autocomplétion, debug et Git intégrés : le setup professionnel courant.",
          },
          {
            label: "Environnement virtuel",
            value:
              "Un `.venv` par projet, `requirements.txt` figé : la reproductibilité commence là.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Un notebook = une expérience : nommez et datez, ne mélangez pas dix essais dans un seul fichier.",
          "Le code qui survit à l'exploration migre vers des scripts `.py` versionnés : les notebooks sont pour chercher, pas pour produire.",
          "`random_state` partout : sans graine fixée, vos résultats ne sont pas reproductibles.",
        ],
      },
    ],
  },
  {
    id: "debugging-bases",
    title: "Debugging : les bases",
    level: 2,
    intro:
      "Les erreurs que tout débutant rencontre — et leur lecture.",
    blocks: [
      {
        kind: "fields",
        title: "Erreurs fréquentes",
        fields: [
          {
            label: "`ValueError: could not convert string to float`",
            value:
              "Des catégories non encodées dans `X`. Solution : `OneHotEncoder` (ou ordinal) dans un pipeline.",
          },
          {
            label: "`ValueError: Input X contains NaN`",
            value:
              "Des valeurs manquantes. Solution : `SimpleImputer` avant le modèle — la stratégie dépend du sens des données.",
          },
          {
            label: "Shape mismatch (`(n,) vs (n,1)`)",
            value:
              "Un vecteur là où une matrice est attendue (ou l'inverse). Solution : vérifier `.shape` à chaque étape, `reshape(-1, 1)` si besoin.",
          },
          {
            label: "`ConvergenceWarning: lbfgs failed to converge`",
            value:
              "L'optimiseur n'a pas convergé. Solutions : augmenter `max_iter`, ou standardiser avec `StandardScaler` (souvent la vraie cause).",
          },
          {
            label: "Score parfait (1.0) suspect",
            value:
              "Probablement une fuite : la cible (ou un proxy) est dans les features. Solution : auditer les colonnes de `X`.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro:
      "Trois projets pour passer du tutoriel au vrai dataset.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Iris de bout en bout",
            detail: "Reproduisez le workflow complet sur `load_iris` : split, pipeline, cross-validation, rapport de classification. Comparez 3 modèles (logistique, forêt, SVM).",
          },
          {
            title: "Titanic (classification)",
            detail: "Le dataset classique de Kaggle : valeurs manquantes, catégories à encoder, feature engineering (titre, famille). Pipeline `ColumnTransformer` + modèle, avec grid search.",
          },
          {
            title: "Prix immobiliers (régression)",
            detail: "Dataset California housing (`fetch_california_housing`) : régression, métriques RMSE/MAE, analyse des résidus, interprétation des importances de features.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "estimators-api",
    title: "L'API des estimators en profondeur",
    level: 3,
    intro:
      "Les conventions qui rendent l'écosystème interopérable.",
    blocks: [
      {
        kind: "table",
        headers: ["Méthode", "Rôle", "Convention"],
        rows: [
          ["`fit(X, y)`", "Apprendre", "Retourne `self` (chaînage) ; les attributs appris finissent par `_` (`coef_`)"],
          ["`predict(X)`", "Prédire", "Supervisé : étiquettes ou valeurs"],
          ["`predict_proba(X)`", "Probabilités", "Classification : distribution par classe — préférez-la aux étiquettes brutes"],
          ["`transform(X)`", "Transformer", "Préprocesseurs : PCA, scalers"],
          ["`fit_transform(X)`", "Les deux", "Optimisé (évite un double passage)"],
          ["`score(X, y)`", "Évaluer", "Défaut raisonnable (précision, R²) — pas la métrique finale"],
          ["`get_params` / `set_params`", "Hyperparamètres", "Ce que `GridSearchCV` manipule"],
        ],
      },
      {
        kind: "text",
        text: "Convention clé : les hyperparamètres se passent au constructeur, jamais à `fit`. Et `clone` permet de dupliquer un estimator non entraîné — c'est ce qu'utilisent la validation croisée et la recherche d'hyperparamètres en interne.",
      },
    ],
  },
  {
    id: "regression-lineaire",
    title: "Régression linéaire",
    level: 3,
    intro:
      "Le modèle le plus simple — et la référence contre laquelle tout comparer.",
    blocks: [
      {
        kind: "text",
        text: "`LinearRegression` ajuste `y = w·x + b` en minimisant l'erreur quadratique. Interprétable (les coefficients `coef_` disent l'effet de chaque feature), rapide, sans hyperparamètre. Ses limites sont ses hypothèses : relation linéaire, features non colinéaires, sensibilité aux outliers.",
      },
      {
        kind: "code",
        language: "python",
        title: "Régression avec régularisation",
        code: "from sklearn.linear_model import Ridge, Lasso\n\n# Ridge (L2) : rétrécit les coefficients — défaut raisonnable\nridge = Ridge(alpha=1.0)\n# Lasso (L1) : annule les coefficients inutiles — sélection de variables\nlasso = Lasso(alpha=0.1)",
      },
      {
        kind: "text",
        text: "En pratique, on utilise presque toujours les versions régularisées : `Ridge` stabilise les coefficients quand les features sont corrélées, `Lasso` fait de la sélection de variables en annulant les coefficients inutiles. `alpha` se règle par validation croisée (`RidgeCV`).",
      },
    ],
  },
  {
    id: "regression-logistique",
    title: "Régression logistique",
    level: 3,
    intro:
      "Le classifieur linéaire de référence — malgré son nom.",
    blocks: [
      {
        kind: "text",
        text: "La régression logistique modélise la probabilité d'appartenance à une classe via la fonction sigmoïde. Rapide, interprétable, avec des probabilités calibrées : la baseline de toute classification binaire ou multiclasse.",
      },
      {
        kind: "list",
        items: [
          "Standardisez les features : l'optimiseur converge mal sinon (`ConvergenceWarning` classique).",
          "`max_iter=1000` par défaut prudent quand les données sont nombreuses ou mal conditionnées.",
          "`class_weight=\"balanced\"` quand les classes sont déséquilibrées.",
          "Les coefficients s'interprètent en log-odds : utiles pour expliquer le modèle aux métiers.",
        ],
      },
    ],
  },
  {
    id: "arbres-decision",
    title: "Arbres de décision",
    level: 3,
    intro:
      "Des règles lisibles — mais qui sur-apprennent seules.",
    blocks: [
      {
        kind: "text",
        text: "Un arbre découpe l'espace par des seuils successifs (« si surface > 100 et pièces > 3… »). Lisible (`plot_tree` le dessine), sans prétraitement requis, il capture les non-linéarités et interactions. Défaut majeur : il mémorise le bruit — un arbre profond atteint 100 % sur le train et s'effondre sur le test.",
      },
      {
        kind: "list",
        items: [
          "Limitez la profondeur (`max_depth`) ou le nombre de feuilles : c'est le réglage anti-overfitting principal.",
          "`min_samples_leaf` évite les feuilles sur un seul exemple aberrant.",
          "Instables : un petit changement de données change l'arbre — d'où les forêts (section suivante).",
          "Utilisez-les pour l'interprétabilité et l'exploration, rarement seuls en production.",
        ],
      },
    ],
  },
  {
    id: "random-forest",
    title: "Forêts aléatoires",
    level: 3,
    intro:
      "Beaucoup d'arbres imparfaits valent mieux qu'un arbre parfait.",
    blocks: [
      {
        kind: "text",
        text: "`RandomForestClassifier` entraîne des centaines d'arbres sur des sous-échantillons (bootstrap) avec des sous-ensembles de features, puis vote. La variance des arbres individuels s'annule : robuste, performant, avec peu de réglages. Le défaut solide du ML tabulaire.",
      },
      {
        kind: "code",
        language: "python",
        title: "Forêt et importance des variables",
        code: "from sklearn.ensemble import RandomForestClassifier\n\nrf = RandomForestClassifier(n_estimators=200, random_state=42)\nrf.fit(X_train, y_train)\n# Quelles features comptent le plus ?\nimportances = rf.feature_importances_",
      },
      {
        kind: "list",
        items: [
          "`n_estimators` : plus = mieux (jusqu'à saturation) — le seul paramètre qui ne sur-apprend quasiment pas.",
          "`feature_importances_` : un premier regard sur ce qui drive les prédictions (avec prudence : biaisé vers les features à forte cardinalité).",
          "Pas besoin de standardiser : les arbres sont insensibles à l'échelle.",
          "Coût : l'entraînement et la prédiction sont plus lents qu'un modèle linéaire — à mesurer sur vos volumes.",
        ],
      },
    ],
  },
  {
    id: "svm",
    title: "SVM",
    level: 3,
    intro:
      "La marge maximale : puissant sur petits datasets, exigeant en réglage.",
    blocks: [
      {
        kind: "text",
        text: "Les SVM cherchent l'hyperplan qui sépare les classes avec la plus grande marge ; le noyau RBF (`kernel=\"rbf\"`) projette implicitement dans un espace où la séparation devient linéaire. Excellents sur des datasets petits à moyens avec des frontières complexes.",
      },
      {
        kind: "list",
        items: [
          "Standardisation obligatoire : les SVM sont très sensibles à l'échelle.",
          "`C` (régularisation) et `gamma` (portée du noyau) : à régler par grid search — les défauts sont rarement optimaux.",
          "Ne passent pas à l'échelle : l'entraînement est en O(n²) à O(n³) — au-delà de ~10 000 exemples, préférez les forêts ou le gradient boosting.",
          "`SVC(probability=True)` pour des probabilités, au prix d'une calibration interne coûteuse.",
        ],
      },
    ],
  },
  {
    id: "knn",
    title: "k-NN",
    level: 3,
    intro:
      "Le plus simple des algorithmes : voter parmi les voisins.",
    blocks: [
      {
        kind: "text",
        text: "`KNeighborsClassifier` ne « apprend » rien : il mémorise le train et, à la prédiction, vote parmi les k plus proches voisins. Simple, non paramétrique, mais victime de la malédiction de la dimensionnalité (les distances perdent leur sens en haute dimension) et lent à la prédiction sur gros volumes.",
      },
      {
        kind: "text",
        text: "Usage : baseline rapide, petits datasets de faible dimension, systèmes de recommandation simples. Standardisation indispensable (les distances en dépendent), `k` impair pour éviter les égalités en binaire, réglé par validation croisée.",
      },
    ],
  },
  {
    id: "naive-bayes",
    title: "Naive Bayes",
    level: 3,
    intro:
      "Probabiliste, rapide, étonnamment efficace sur le texte.",
    blocks: [
      {
        kind: "text",
        text: "Applique le théorème de Bayes en supposant (naïvement) l'indépendance des features. `GaussianNB` pour les continues, `MultinomialNB` pour les comptages (texte). Entraînement quasi instantané, peu de données requises — une excellente baseline pour la classification de texte avant TF-IDF + modèle plus lourd.",
      },
    ],
  },
  {
    id: "kmeans",
    title: "K-means",
    level: 3,
    intro:
      "Le clustering de référence : regrouper sans étiquettes.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Clustering et méthode du coude",
        code: "from sklearn.cluster import KMeans\n\nkm = KMeans(n_clusters=4, n_init=10, random_state=42)\nclusters = km.fit_predict(X)\n# Inertie : à tracer pour k = 2..10 (méthode du coude)\nprint(\"Inertie :\", km.inertia_)",
      },
      {
        kind: "text",
        text: "K-means partitionne en k groupes en minimisant la distance aux centroïdes. Il faut choisir k (méthode du coude sur l'inertie, ou score de silhouette), standardiser (distances euclidiennes), et relancer plusieurs fois (`n_init`) car l'initialisation influence le résultat.",
      },
      {
        kind: "list",
        items: [
          "Hypothèses : clusters sphériques de tailles similaires — échoue sur des formes allongées ou des densités variables.",
          "Sensible aux outliers : un point aberrant déplace un centroïde.",
          "Évaluez avec le score de silhouette, pas seulement l'inertie (qui décroît toujours avec k).",
        ],
      },
    ],
  },
  {
    id: "clustering-avance",
    title: "Clustering avancé : DBSCAN, hiérarchique",
    level: 3,
    intro:
      "Quand k-means ne convient pas : densités et hiérarchies.",
    blocks: [
      {
        kind: "table",
        headers: ["Algorithme", "Principe", "Points forts", "Réglages"],
        rows: [
          ["K-means", "k centroïdes", "Rapide, simple", "`n_clusters`, `n_init`"],
          ["DBSCAN", "Zones denses", "Formes arbitraires, détecte les outliers (`-1`)", "`eps`, `min_samples`"],
          ["Agglomératif", "Fusion hiérarchique", "Dendrogramme, pas de k a priori", "`n_clusters` ou seuil de distance"],
          ["Gaussian Mixture", "Mélange de gaussiennes", "Clusters elliptiques, probabilités d'appartenance", "`n_components`"],
        ],
      },
      {
        kind: "text",
        text: "DBSCAN mérite une attention particulière : il trouve des clusters de forme quelconque et isole le bruit (étiquette `-1`) — idéal pour la détection d'anomalies géographiques ou de comportements. Son réglage (`eps` = rayon de voisinage) se fait en traçant la distance au k-ième voisin.",
      },
    ],
  },
  {
    id: "pca",
    title: "PCA : réduction de dimensionnalité",
    level: 3,
    intro:
      "Compresser l'information : visualiser et débruiter.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "PCA et variance expliquée",
        code: "from sklearn.decomposition import PCA\n\npca = PCA(n_components=0.95)  # garder 95 % de la variance\nX_reduit = pca.fit_transform(X_scaled)\nprint(\"Composantes :\", pca.n_components_)",
      },
      {
        kind: "text",
        text: "La PCA projette sur les directions de variance maximale : on réduit 100 features corrélées à 10 composantes en gardant l'essentiel de l'information. Usages : visualiser en 2D (`n_components=2`), débruiter avant un modèle, accélérer l'entraînement. Standardisez avant — la PCA est dominée par les grandes échelles sinon.",
      },
    ],
  },
  {
    id: "scalers",
    title: "Mise à l'échelle : quel scaler ?",
    level: 3,
    intro:
      "Quatre transformations, quatre intentions différentes.",
    blocks: [
      {
        kind: "table",
        headers: ["Scaler", "Transformation", "Quand l'utiliser"],
        rows: [
          ["`StandardScaler`", "Centrer-réduire (moyenne 0, écart-type 1)", "Défaut : SVM, régression, PCA, k-NN"],
          ["`MinMaxScaler`", "Ramener à [0, 1]", "Réseaux de neurones, quand la borne a un sens"],
          ["`RobustScaler`", "Médiane et IQR", "Données avec outliers — ne se laisse pas tirer par les extrêmes"],
          ["`Normalizer`", "Norme unitaire par ligne", "Texte (TF-IDF), quand c'est la direction qui compte, pas la magnitude"],
        ],
      },
      {
        kind: "text",
        text: "Les arbres s'en moquent (seuils relatifs), tout le reste en a besoin. Et toujours : `fit` sur le train, `transform` partout — dans un `Pipeline`, c'est automatique.",
      },
    ],
  },
  {
    id: "encodage-categoriel",
    title: "Encodage des catégories",
    level: 3,
    intro:
      "Transformer du texte en nombres sans créer de faux ordres.",
    blocks: [
      {
        kind: "table",
        headers: ["Méthode", "Principe", "Quand l'utiliser"],
        rows: [
          ["`OneHotEncoder`", "Une colonne binaire par modalité", "Défaut pour les nominales (< ~10 modalités)"],
          ["`OrdinalEncoder`", "Un entier par modalité", "Uniquement si l'ordre est réel (ex. tailles S<M<L) — et pour les arbres"],
          ["Encodage de fréquence", "Remplacer par la fréquence", "Beaucoup de modalités, arbres"],
          ["Target encoding", "Remplacer par la moyenne de la cible", "Fortes cardinalités — avec validation croisée interne (risque de fuite)"],
        ],
      },
      {
        kind: "text",
        text: "Le piège : encoder « Paris »=1, « Lyon »=2 fait croire au modèle que Lyon > Paris. Le one-hot évite tout ordre artificiel mais explose la dimensionnalité sur les fortes cardinalités (codes postaux) — d'où les alternatives.",
      },
    ],
  },
  {
    id: "imputation",
    title: "Valeurs manquantes",
    level: 3,
    intro:
      "Les trous dans les données : stratégies par type de manque.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Imputation simple et avancée",
        code: "from sklearn.impute import SimpleImputer, KNNImputer\n\n# Médiane : robuste aux outliers (défaut raisonnable)\nimp = SimpleImputer(strategy=\"median\")\n# KNN : estimer d'après les voisins similaires\nknn_imp = KNNImputer(n_neighbors=5)",
      },
      {
        kind: "text",
        text: "D'abord, comprendre pourquoi ça manque : aléatoire (imputation simple OK), lié à une autre variable (imputer par groupe), ou informatif (l'absence elle-même prédit — ajoutez une colonne indicatrice `manquant_oui_non`). `SimpleImputer(strategy=\"most_frequent\")` pour les catégories. Les modèles à base d'arbres tolèrent mal les NaN en scikit-learn : imputez toujours avant.",
      },
    ],
  },
  {
    id: "feature-selection",
    title: "Sélection de variables",
    level: 3,
    intro:
      "Moins de features, souvent de meilleurs modèles.",
    blocks: [
      {
        kind: "text",
        text: "Trop de features bruitées = overfitting et lenteur. Trois familles : les filtres (`SelectKBest` — corrélation univariée, rapide), les wrappers (`RFE` — élimination récursive avec un modèle, coûteux), les intégrées (`Lasso`, importances de forêt — la sélection pendant l'entraînement).",
      },
      {
        kind: "text",
        text: "En pratique : commencez par supprimer les constantes et quasi-constantes, puis les fortes corrélations redondantes, puis laissez un modèle régularisé (Lasso) ou les importances faire le tri. La sélection se fait dans le pipeline, jamais sur tout le dataset avant le split.",
      },
    ],
  },
  {
    id: "column-transformer",
    title: "`ColumnTransformer` : prétraitements mixtes",
    level: 3,
    intro:
      "Des pipelines différents selon le type de colonne — le standard production.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Pipeline complet mixte",
        code: "from sklearn.compose import ColumnTransformer\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nfrom sklearn.impute import SimpleImputer\n\nprepro = ColumnTransformer([\n    (\"num\", Pipeline([\n        (\"imp\", SimpleImputer(strategy=\"median\")),\n        (\"std\", StandardScaler()),\n    ]), colonnes_numeriques),\n    (\"cat\", Pipeline([\n        (\"imp\", SimpleImputer(strategy=\"most_frequent\")),\n        (\"enc\", OneHotEncoder(handle_unknown=\"ignore\")),\n    ]), colonnes_categorielles),\n])\npipe = Pipeline([(\"prepro\", prepro), (\"modele\", RandomForestClassifier())])",
      },
      {
        kind: "text",
        text: "`handle_unknown=\"ignore\"` : indispensable — une modalité inédite dans le test ne doit pas faire planter la prédiction. Ce pattern (ColumnTransformer + Pipeline + GridSearchCV) est le squelette de 90 % des projets scikit-learn sérieux.",
      },
    ],
  },
  {
    id: "cv-strategies",
    title: "Stratégies de validation croisée",
    level: 3,
    intro:
      "Choisir le découpage selon la nature des données.",
    blocks: [
      {
        kind: "table",
        headers: ["Stratégie", "Usage", "Note"],
        rows: [
          ["`KFold`", "Régression, cas général", "Mélange par défaut — à désactiver sur données ordonnées"],
          ["`StratifiedKFold`", "Classification", "Préserve la proportion des classes par pli — le défaut à utiliser"],
          ["`TimeSeriesSplit`", "Données temporelles", "Plis chronologiques croissants : jamais de futur dans le train"],
          ["`GroupKFold`", "Groupes (patient, client)", "Un groupe entier dans un seul pli — évite la fuite par groupe"],
          ["`LeaveOneOut`", "Très petits datasets", "Coûteux, variance élevée — dernier recours"],
        ],
      },
      {
        kind: "text",
        text: "La fuite par groupe est le piège subtil : si le même patient apparaît en train et en test (plusieurs lignes), le modèle « reconnaît » au lieu de généraliser. `GroupKFold` avec l'identifiant de groupe l'évite.",
      },
    ],
  },
  {
    id: "random-search",
    title: "Random search et au-delà",
    level: 3,
    intro:
      "Quand la grille exhaustive coûte trop cher.",
    blocks: [
      {
        kind: "text",
        text: "`RandomizedSearchCV` échantillonne N combinaisons au hasard dans des distributions : à budget égal, elle explore mieux les paramètres importants qu'une grille fine sur des paramètres inutiles. Pour les paramètres continus (`C`, `alpha`), définissez des distributions log-uniformes plutôt que des listes.",
      },
      {
        kind: "list",
        items: [
          "Budget : fixez `n_iter` selon le temps disponible (ex. 50) plutôt qu'une grille exhaustive de 500 combinaisons.",
          "Affinez ensuite en grille resserrée autour du meilleur trouvé — la stratégie « large puis fin ».",
          "L'optimisation bayésienne (Optuna, scikit-optimize) choisit les essais suivants intelligemment : l'étape d'après quand le random search plafonne.",
          "Ne jamais optimiser sur le jeu de test final : un split de validation dédié, ou la CV interne.",
        ],
      },
    ],
  },
  {
    id: "metriques-classification",
    title: "Métriques de classification",
    level: 3,
    intro:
      "La matrice de confusion et ce qu'on en tire.",
    blocks: [
      {
        kind: "diagram",
        title: "Matrice de confusion",
        lines: [
          "                  Prédit +        Prédit -",
          "  Réel +      vrai positif     faux négatif  → rappel = VP/(VP+FN)",
          "  Réel -      faux positif     vrai négatif  → précision = VP/(VP+FP)",
          "",
          "  F1 = moyenne harmonique précision/rappel",
          "  ROC-AUC = capacité à classer + au-dessus de - (indépendant du seuil)",
        ],
      },
      {
        kind: "text",
        text: "Le seuil de décision (0.5 par défaut sur `predict_proba`) est un paramètre : baisser le seuil augmente le rappel au prix de la précision. La courbe précision-rappel aide à choisir le seuil selon le coût métier — un choix que la « précision » seule masque complètement.",
      },
    ],
  },
  {
    id: "metriques-regression",
    title: "Métriques de régression",
    level: 3,
    intro:
      "Mesurer l'erreur de prédiction selon ce qu'on veut pénaliser.",
    blocks: [
      {
        kind: "table",
        headers: ["Métrique", "Pénalise", "Interprétation"],
        rows: [
          ["MAE", "L'erreur moyenne (linéaire)", "« En moyenne, on se trompe de X » — robuste, lisible"],
          ["RMSE", "Fortement les grosses erreurs (quadratique)", "Sensible aux outliers ; même unité que la cible"],
          ["R²", "La part de variance expliquée", "1 = parfait, 0 = aussi bon que la moyenne — peut être négatif"],
          ["MAPE", "L'erreur relative", "En % — inutilisable si la cible peut valoir 0"],
        ],
      },
      {
        kind: "text",
        text: "Choisissez selon le coût métier : une erreur de 100 € sur un bien à 1 M€ n'a pas la même gravité que sur un bien à 50 k€ (relatif vs absolu). Et tracez toujours les résidus (erreur vs prédiction) : une structure visible (entonnoir, courbe) révèle un modèle mal spécifié mieux que n'importe quel chiffre.",
      },
    ],
  },
  {
    id: "desequilibre-classes",
    title: "Classes déséquilibrées",
    level: 3,
    intro:
      "Quand une classe est rare — et que c'est elle qui compte.",
    blocks: [
      {
        kind: "list",
        items: [
          "`class_weight=\"balanced\"` : pondère les classes inversement à leur fréquence — le premier levier, sans toucher aux données.",
          "Sur/sous-échantillonnage (imblearn) : SMOTE crée des exemples synthétiques de la classe minoritaire — à appliquer dans le pipeline, uniquement sur le train.",
          "Ajuster le seuil de décision sur `predict_proba` : souvent plus efficace que de rééquilibrer les données.",
          "Métriques : précision-rappel et F1 par classe, jamais la précision globale — qui est aveugle au déséquilibre.",
          "Questionnez le problème : parfois, la rareté est le signal (détection d'anomalie — d'autres approches conviennent mieux).",
        ],
      },
    ],
  },
  {
    id: "overfitting",
    title: "Overfitting / underfitting",
    level: 3,
    intro:
      "Le diagnostic central du ML : les courbes d'apprentissage.",
    blocks: [
      {
        kind: "text",
        text: "`learning_curve` trace le score train et validation en fonction de la taille du train : un écart qui se creuse = overfitting (le modèle mémorise) ; les deux scores bas et proches = underfitting (le modèle est trop simple). `validation_curve` montre l'effet d'un hyperparamètre (ex. `max_depth`).",
      },
      {
        kind: "list",
        items: [
          "Overfitting : simplifier le modèle, régulariser (`alpha`, `max_depth`), ajouter des données, réduire les features.",
          "Underfitting : complexifier, ajouter des features pertinentes, réduire la régularisation.",
          "Plus de données aide l'overfitting, jamais l'underfitting.",
          "Le bruit irréductible existe : aucun modèle ne descend sous l'erreur bayésienne — savoir s'arrêter.",
        ],
      },
    ],
  },
  {
    id: "persistence-joblib",
    title: "Persistance : joblib",
    level: 3,
    intro:
      "Sauvegarder un modèle entraîné pour la production.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Sauvegarder et recharger",
        code: "from joblib import dump, load\n\n# Sauvegarder le PIPELINE entier (preprocessing inclus !)\ndump(pipe, \"modele_v1.joblib\")\n\n# Recharger et prédire\nmodele = load(\"modele_v1.joblib\")\nmodele.predict(X_nouveau)",
      },
      {
        kind: "text",
        text: "On persiste le pipeline entier, pas le modèle seul : le preprocessing fait partie du modèle. Versionnez les fichiers (`modele_v1.joblib`), notez la version de scikit-learn utilisée (un dump n'est pas garanti compatible entre versions majeures), et testez le rechargement avant de déployer.",
      },
    ],
  },
  {
    id: "data-leakage",
    title: "Data leakage : la fuite de données",
    level: 3,
    intro:
      "Le bug le plus coûteux du ML : des informations du futur dans l'entraînement.",
    blocks: [
      {
        kind: "fields",
        title: "Formes classiques",
        fields: [
          {
            label: "Scaler fitté sur tout le dataset",
            value:
              "Le test influence la moyenne/écart-type. Solution : pipeline — `fit` sur le train uniquement.",
          },
          {
            label: "Feature = proxy de la cible",
            value:
              "Ex. : `date_resiliation` pour prédire la résiliation. Solution : auditer chaque feature (« cette info serait-elle connue au moment de la prédiction ? »).",
          },
          {
            label: "Split aléatoire sur données temporelles",
            value:
              "Le modèle apprend le futur. Solution : `TimeSeriesSplit`, découpage chronologique.",
          },
          {
            label: "Sélection de variables avant le split",
            value:
              "Les features sont choisies avec l'info du test. Solution : sélection dans le pipeline/CV.",
          },
          {
            label: "Doublons train/test",
            value:
              "Les mêmes lignes des deux côtés. Solution : dédupliquer avant le split, `GroupKFold` si groupes.",
          },
        ],
      },
      {
        kind: "text",
        text: "Symptôme universel : un score « trop beau pour être vrai » en validation mais médiocre en production. Devant un score parfait, le premier réflexe n'est pas de célébrer — c'est de chercher la fuite.",
      },
    ],
  },
  {
    id: "convergence-warnings",
    title: "Warnings de convergence",
    level: 3,
    intro:
      "Comprendre `ConvergenceWarning` au lieu de l'ignorer.",
    blocks: [
      {
        kind: "text",
        text: "Ce warning signifie que l'optimiseur (`lbfgs`, `saga`…) n'a pas convergé en `max_iter` itérations : les coefficients ne sont pas stabilisés. Causes par ordre de fréquence : features non standardisées (de loin la n°1), `max_iter` trop bas pour la taille du problème, données mal conditionnées.",
      },
      {
        kind: "list",
        items: [
          "D'abord `StandardScaler` dans le pipeline — résout la majorité des cas.",
          "Puis augmenter `max_iter` (ex. 1000 → 5000) si le warning persiste.",
          "Jamais `warnings.filterwarnings(\"ignore\")` pour le masquer : c'est un symptôme, pas du bruit.",
          "Vérifiez que le score ne bouge plus quand vous augmentez `max_iter` : s'il bouge encore, le modèle n'était pas convergé.",
        ],
      },
    ],
  },
  {
    id: "testing-ml",
    title: "Tester les modèles",
    level: 3,
    intro:
      "Le ML se teste aussi — différemment du code classique.",
    blocks: [
      {
        kind: "list",
        items: [
          "Tests de non-régression : un jeu de test figé avec des seuils de score — la CI échoue si le modèle se dégrade.",
          "Tests d'invariants : les prédictions restent dans les bornes, les probabilités somment à 1, pas de NaN en sortie.",
          "Tests de données : schéma des features en entrée (noms, types, plages) validé avant la prédiction — un changement de format amont ne doit pas produire des prédictions silencieusement fausses.",
          "Stabilité : entraîner deux fois avec des graines différentes — des scores très variables signalent un problème.",
          "Biais : évaluer par sous-groupe (genre, tranche d'âge, région) quand le modèle impacte des personnes.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pièges qui survivent au niveau 2.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Pas de pipeline",
            value:
              "Problème : preprocessing appliqué à la main, différemment en train et en prod. Solution : `Pipeline` systématique, persisté avec le modèle.",
          },
          {
            label: "Optimiser la mauvaise métrique",
            value:
              "Problème : 99 % de précision sur un problème à 1 % de positifs. Solution : métrique alignée sur le coût métier (rappel, F1, RMSE…).",
          },
          {
            label: "Tuner sur le test",
            value:
              "Problème : le test guide les choix d'hyperparamètres et devient optimiste. Solution : validation croisée ou split de validation dédié.",
          },
          {
            label: "`random_state` oublié",
            value:
              "Problème : résultats non reproductibles, expériences incomparables. Solution : graine fixée partout (split, modèle, CV).",
          },
          {
            label: "Ignorer l'analyse d'erreur",
            value:
              "Problème : on tune les hyperparamètres alors que les erreurs viennent de données mal labellisées. Solution : regarder les exemples mal classés avant d'optimiser.",
          },
          {
            label: "Scaler fitté sur le test",
            value:
              "Problème : fuite de données subtile. Solution : tout dans le pipeline.",
          },
          {
            label: "Modèle trop complexe d'emblée",
            value:
              "Problème : on commence par du gradient boosting tuné pendant des jours. Solution : baseline simple d'abord (logistique, forêt défaut) — elle bat souvent les attentes.",
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
          "Baseline simple d'abord : un modèle simple bien évalué bat un modèle complexe mal évalué.",
          "Pipeline toujours : preprocessing + modèle en un objet, persisté ensemble.",
          "`random_state` partout : reproductibilité non négociable.",
          "Métrique métier : choisie avec les utilisateurs du modèle, pas par défaut.",
          "Validation honnête : split adapté aux données (stratifié, temporel, par groupe), jamais de fuite.",
          "Analyser les erreurs avant de tuner : les données d'abord, les hyperparamètres ensuite.",
          "Versionner données, code et modèles : une expérience doit être rejouable.",
          "Surveiller en production : la dérive des données dégrade les modèles silencieusement.",
          "Interprétabilité : un modèle qu'on ne peut pas expliquer est un risque — surtout s'il impacte des personnes.",
          "Simplicité déployable : le meilleur modèle est celui qui tourne en production de façon fiable.",
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro:
      "Aller plus loin, en commençant toujours par la documentation officielle.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          {
            label: "Documentation scikit-learn",
            value:
              "scikit-learn.org/stable/documentation.html : le guide utilisateur (théorie + exemples par algorithme) est la meilleure ressource ML généraliste qui soit — lisez-le par sujet, pas d'un bloc.",
          },
          {
            label: "Galerie d'exemples",
            value:
              "Des centaines d'exemples exécutables couvrant chaque algorithme : la façon la plus rapide de voir un modèle en action.",
          },
          {
            label: "API reference",
            value:
              "La signature exacte de chaque estimator : paramètres, attributs, notes de version.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les compétitions Kaggle « playground » — des datasets propres pour s'entraîner au workflow complet.",
          "Théorie : un cours de ML (statistiques, biais-variance) pour comprendre ce que les hyperparamètres font vraiment.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Scikit-learn maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "`python` : approfondir la manipulation de données (pandas, numpy) — 80 % du travail ML est là.",
          "`statistics` : les fondations théoriques — tests, distributions, inférence.",
          "`deep-learning` : quand les données sont images, texte ou audio — le niveau suivant.",
          "`mlops` : déployer, versionner et surveiller les modèles en production.",
          "`data-scientist` : le parcours complet — du problème métier au modèle déployé.",
          "Revenir à la roadmap : valider scikit-learn et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

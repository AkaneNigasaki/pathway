import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du Machine Learning : du concept à la mise en
 * production, avec Python, pandas et scikit-learn.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Approche : comprendre le workflow avant les algorithmes ; aucune
 * statistique ni benchmark inventé ; aucun outil présenté comme
 * universellement meilleur.
 */
export const LEARNING_ML: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est le machine learning, ce qu'il n'est pas, et quand il est pertinent.",
    blocks: [
      {
        kind: "text",
        text: "Le machine learning (apprentissage automatique) est une approche de la programmation où, au lieu d'écrire à la main les règles qui transforment une entrée en sortie, on fournit des exemples au programme et il apprend lui-même les règles. Un modèle entraîné à reconnaître des e-mails indésirables n'a jamais reçu la règle « si le mot “loterie” apparaît, c'est du spam » : il a vu des milliers d'e-mails étiquetés et a découvert seul les motifs qui distinguent le spam du reste.",
      },
      {
        kind: "text",
        text: "Point essentiel : le machine learning n'est ni de la magie ni de l'intelligence au sens humain. C'est de la statistique appliquée à grande échelle : le modèle ajuste des paramètres numériques pour minimiser ses erreurs sur les exemples fournis. Quand les exemples sont bons et représentatifs, les prédictions sont utiles ; quand les données sont biaisées ou insuffisantes, le modèle reproduit fidèlement ces défauts. La qualité des données compte davantage que la sophistication de l'algorithme.",
      },
      {
        kind: "text",
        text: "Le machine learning apprend des règles de décision à partir d'exemples, au lieu de les recevoir écrites à la main.",
      },
      {
        kind: "text",
        text: "Certains problèmes ont des règles trop complexes ou floues pour être codées explicitement : reconnaître une image, prédire une panne, recommander un contenu. Les exemples remplacent les règles.",
      },
      {
        kind: "text",
        text: "Quand vous avez beaucoup d'exemples représentatifs, que le problème tolère des erreurs occasionnelles, et que les règles explicites seraient trop complexes à écrire ou à maintenir.",
      },
      {
        kind: "fields",
        title: "Le machine learning : l'essentiel",
        fields: [
          {
            label: "Quand ne pas l'utiliser",
            value:
              "Quand le problème se résout par une règle simple et exacte (un calcul de TVA, un tri), quand vous n'avez presque pas de données, ou quand chaque erreur est inacceptable sans contrôle humain.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Croire que « plus de machine learning » compense des données de mauvaise qualité. Un modèle entraîné sur des données biaisées apprend les biais, pas la vérité.",
          },
          {
            label: "Bonne pratique",
            value:
              "Avant tout algorithme, se demander : « ai-je des exemples ? sont-ils représentatifs ? comment saurai-je que le modèle a raison ? »",
          },
          {
            label: "Concepts liés",
            value:
              "Statistiques, `pandas`, `scikit-learn`, science des données, deep learning.",
          },
        ],
      },
    ],
  },
  {
    id: "trois-paradigmes",
    title: "Les trois paradigmes",
    level: 1,
    intro:
      "Apprentissage supervisé, non supervisé et par renforcement : les trois grandes familles.",
    blocks: [
      {
        kind: "diagram",
        title: "Les trois paradigmes d'apprentissage",
        lines: [
          "Données ÉTIQUETÉES (entrée + bonne réponse connue)",
          "        │",
          "        ▼",
          "SUPERVISÉ — apprendre à prédire la réponse",
          "ex. : cet e-mail est-il un spam ? quel sera le prix ?",
          "",
          "Données NON ÉTIQUETÉES (que des entrées)",
          "        │",
          "        ▼",
          "NON SUPERVISÉ — découvrir la structure cachée",
          "ex. : regrouper les clients similaires, détecter les anomalies",
          "",
          "AGENT + ENVIRONNEMENT + RÉCOMPENSE",
          "        │",
          "        ▼",
          "RENFORCEMENT — apprendre par essai et récompense",
          "ex. : jouer à un jeu, piloter un robot",
        ],
      },
      {
        kind: "text",
        text: "Supervisé = apprendre avec les réponses ; non supervisé = trouver la structure sans réponses ; renforcement = apprendre par récompense.",
      },
      {
        kind: "fields",
        title: "Les trois paradigmes en détail",
        fields: [          {
            label: "Supervisé",
            value:
              "On fournit des exemples avec la bonne réponse (`X` les entrées, `y` les réponses). Le modèle apprend la correspondance. Deux sous-familles : la classification (réponse = catégorie : spam / non-spam) et la régression (réponse = nombre : prix, température). C'est le paradigme le plus utilisé en pratique.",
          },
          {
            label: "Non supervisé",
            value:
              "On fournit des données sans réponse attendue et le modèle cherche une structure : regrouper les points proches (clustering), réduire le nombre de dimensions, détecter les points aberrants. Utile quand étiqueter les données coûterait trop cher.",
          },
          {
            label: "Par renforcement",
            value:
              "Un agent agit dans un environnement, reçoit des récompenses ou des pénalités, et ajuste sa stratégie pour maximiser la récompense totale. Pas de « bonne réponse » fournie : l'agent découvre par essai-erreur. Utilisé en robotique et dans les jeux.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Choisir un algorithme avant de savoir à quel paradigme appartient le problème. La première question est toujours : « ai-je les réponses attendues, oui ou non ? »",
          },
          {
            label: "Concepts liés",
            value:
              "Classification, régression, clustering, `scikit-learn`.",
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
    intro: "Ce qu'il faut maîtriser avant de se lancer dans le machine learning.",
    blocks: [
      {
        kind: "list",
        items: [
          "`Python` : savoir écrire des fonctions, manipuler des listes et des dictionnaires, installer des paquets avec `pip`.",
          "`numpy` (notions) : tableaux numériques et opérations de base — la brique sous `pandas` et `scikit-learn`.",
          "Mathématiques (notions) : moyenne, médiane, écart-type, et l'idée de fonction (une entrée donne une sortie). Pas besoin d'algèbre linéaire avancée pour débuter.",
          "Ligne de commande : naviguer dans les dossiers, activer un environnement virtuel.",
        ],
      },
      {
        kind: "text",
        text: "Bonne nouvelle : on peut aller loin avec peu de mathématiques au début. Les bibliothèques modernes encapsulent les calculs ; ce qui compte d'abord, c'est de comprendre le workflow (données → entraînement → évaluation) et de savoir lire les résultats. Les mathématiques approfondies deviennent utiles quand on veut comprendre pourquoi un modèle échoue ou passer au deep learning.",
      },
      {
        kind: "fields",
        title: "Parcours conseillé",
        fields: [
          {
            label: "Étape 1",
            value: "Python solide (voir la Learning Page Python).",
          },
          {
            label: "Étape 2",
            value: "`pandas` : charger et explorer un tableau de données.",
          },
          {
            label: "Étape 3",
            value: "`scikit-learn` : entraîner et évaluer un premier modèle.",
          },
          {
            label: "Étape 4",
            value: "Projets : enchaîner analyse, modèle, évaluation, présentation.",
          },
        ],
      },
    ],
  },
  {
    id: "environnement-venv",
    title: "Environnement : le venv",
    level: 2,
    intro:
      "Isoler les paquets du projet dans un environnement virtuel, pour des installations reproductibles.",
    blocks: [
      {
        kind: "text",
        text: "Chaque projet de machine learning dépend de versions précises de paquets (`scikit-learn`, `pandas`…). Un environnement virtuel (`venv`) crée un dossier contenant son propre Python et ses propres paquets, isolé du reste du système. Deux projets peuvent ainsi utiliser deux versions différentes de la même bibliothèque sans conflit.",
      },
      {
        kind: "command",
        label: "Créer l'environnement virtuel du projet",
        command: "python -m venv .venv",
        why: "`-m venv` lance le module standard de création d'environnements ; `.venv` est le nom de dossier conventionnel, ignoré par Git.",
        verify: "Le dossier `.venv/` existe dans le projet.",
      },
      {
        kind: "command",
        label: "Activer l'environnement (macOS / Linux)",
        command: "source .venv/bin/activate",
        why: "L'activation place le Python du venv en premier dans le `PATH` : `python` et `pip` désignent alors ceux du projet.",
        verify: "L'invite du terminal affiche `(.venv)` au début de la ligne.",
      },
      {
        kind: "command",
        label: "Activer l'environnement (Windows PowerShell)",
        command: ".venv\\Scripts\\Activate.ps1",
        why: "Même effet que la commande Unix, avec le chemin des scripts Windows du venv.",
        verify: "L'invite affiche `(.venv)`.",
      },
      {
        kind: "text",
        text: "Un venv = un dossier avec son propre Python et ses propres paquets.",
      },
      {
        kind: "fields",
        title: "Réflexes venv",
        fields: [          {
            label: "Bonne pratique",
            value:
              "Ajouter `.venv/` au `.gitignore` : on versionne la liste des paquets (`requirements.txt`), jamais l'environnement lui-même.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Installer les paquets sans activer le venv : ils partent dans le Python système et le projet n'est plus reproductible.",
          },
          {
            label: "Commande utile",
            value: "`deactivate` quitte l'environnement actif.",
          },
        ],
      },
    ],
  },
  {
    id: "installation-paquets",
    title: "Installation des paquets",
    level: 2,
    intro:
      "Les quatre paquets de base : `scikit-learn`, `pandas`, `numpy`, `matplotlib`.",
    blocks: [
      {
        kind: "command",
        label: "Installer la pile de base du machine learning",
        command: "pip install scikit-learn pandas numpy matplotlib",
        why: "`pip` installe depuis PyPI ; ces quatre paquets forment le socle : calcul numérique, manipulation de données, algorithmes, graphiques.",
        verify: "`pip list` affiche les quatre paquets avec leurs versions.",
      },
      {
        kind: "text",
        text: "`numpy` calcule, `pandas` organise, `scikit-learn` apprend, `matplotlib` montre.",
      },
      {
        kind: "fields",
        title: "Les quatre paquets, rôle par rôle",
        fields: [          {
            label: "numpy",
            value:
              "Le calcul numérique : tableaux multidimensionnels rapides et opérations vectorisées. C'est la fondation sur laquelle `pandas` et `scikit-learn` sont construits.",
          },
          {
            label: "pandas",
            value:
              "La manipulation de données tabulaires : charger un CSV, filtrer, agréger, nettoyer. Son objet central est le `DataFrame` (tableau avec lignes et colonnes nommées).",
          },
          {
            label: "scikit-learn",
            value:
              "Les algorithmes de machine learning « classique » : régression, classification, clustering, avec une interface uniforme (`fit` / `predict`).",
          },
          {
            label: "matplotlib",
            value:
              "Les graphiques : histogrammes, nuages de points, courbes. Indispensable pour explorer les données visuellement avant de modéliser.",
          },
          {
            label: "Bonne pratique",
            value:
              "Figer les versions avec `pip freeze > requirements.txt` après installation, pour que le projet soit réinstallable à l'identique.",
          },
          {
            label: "Concepts liés",
            value:
              "Environnements virtuels, `jupyter`, `scipy` (calcul scientifique, dépendance de `scikit-learn`).",
          },
        ],
      },
    ],
  },
  {
    id: "jupyter-notebook",
    title: "Jupyter : le carnet de laboratoire",
    level: 2,
    intro:
      "Exécuter du Python par cellules, voir les résultats et les graphiques au fil de l'exploration.",
    blocks: [
      {
        kind: "text",
        text: "Jupyter Notebook est une application web qui permet d'écrire du Python par cellules : on exécute une cellule, on voit immédiatement son résultat (tableau, graphique, texte), puis on passe à la suivante. C'est l'outil standard de l'exploration de données, parce qu'analyser des données est un travail itératif : on regarde, on teste une idée, on regarde à nouveau.",
      },
      {
        kind: "command",
        label: "Installer Jupyter",
        command: "pip install jupyter",
        why: "Ajoute le serveur notebook et l'interface web au venv du projet.",
        verify: "`jupyter --version` affiche les versions installées.",
      },
      {
        kind: "command",
        label: "Lancer Jupyter",
        command: "jupyter notebook",
        why: "Démarre le serveur local et ouvre l'interface dans le navigateur, dans le dossier courant.",
        verify: "Le navigateur affiche l'arborescence des fichiers avec un bouton « New ».",
      },
      {
        kind: "text",
        text: "Jupyter = du Python exécuté cellule par cellule, avec résultats et graphiques intégrés au document.",
      },
      {
        kind: "text",
        text: "L'exploration de données ne suit pas un plan linéaire : le notebook garde le code, les résultats et les notes au même endroit, dans l'ordre de la réflexion.",
      },
      {
        kind: "text",
        text: "Exploration, analyse, prototypage de modèle, présentation d'une analyse. Le notebook est un brouillon de luxe.",
      },
      {
        kind: "fields",
        title: "Jupyter en pratique",
        fields: [
          {
            label: "Quand ne pas l'utiliser",
            value:
              "Code de production ou modèle déployé : on y met des scripts `.py` versionnés et testés, pas un notebook.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Exécuter les cellules dans le désordre puis partager le notebook : les résultats affichés ne correspondent plus à un ordre d'exécution logique. Toujours faire « Restart & Run All » avant de partager.",
          },
          {
            label: "Bonne pratique",
            value:
              "Un notebook = une question explorée. Les fonctions réutilisables migrent vers un module `.py` importé.",
          },
        ],
      },
    ],
  },
  {
    id: "pandas-dataframe",
    title: "pandas : le DataFrame",
    level: 2,
    intro:
      "Charger, inspecter et manipuler des données tabulaires avec `pandas`.",
    blocks: [
      {
        kind: "text",
        text: "Le `DataFrame` est le tableur de Python : des lignes (observations) et des colonnes nommées (variables). La quasi-totalité du travail de préparation des données passe par lui : charger un fichier CSV, regarder les premières lignes, filtrer, calculer des statistiques.",
      },
      {
        kind: "code",
        language: "python",
        title: "Charger et inspecter un jeu de données",
        code: "import pandas as pd\n\ndf = pd.read_csv(\"donnees.csv\")  # charge le fichier en DataFrame\nprint(df.head())      # 5 premières lignes : à quoi ressemblent les données ?\nprint(df.info())      # types des colonnes + valeurs manquantes\nprint(df.describe())  # statistiques : moyenne, min, max, quartiles",
      },
      {
        kind: "code",
        language: "python",
        title: "Sélectionner et filtrer",
        code: "ages = df[\"age\"]                    # une colonne -> Series\nextrait = df[[\"age\", \"salaire\"]]       # plusieurs colonnes -> DataFrame\nadultes = df[df[\"age\"] >= 18]          # filtre les lignes : que les adultes\nmoyenne = df[\"salaire\"].mean()         # statistique sur une colonne",
      },
      {
        kind: "text",
        text: "Un `DataFrame` est un tableau étiqueté : chaque colonne a un nom et un type, chaque ligne est une observation.",
      },
      {
        kind: "text",
        text: "Les données réelles arrivent en CSV, Excel ou base SQL : `pandas` les charge en une ligne et offre des centaines d'opérations de transformation.",
      },
      {
        kind: "fields",
        title: "Le DataFrame : l'essentiel",
        fields: [          {
            label: "Comment ça fonctionne",
            value:
              "`read_csv` parse le fichier en colonnes typées ; `head`, `info`, `describe` résument ; l'indexation booléenne (`df[condition]`) filtre les lignes.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Modifier un DataFrame filtré sans `.copy()` : `pandas` émet un avertissement `SettingWithCopyWarning` car on ne sait pas si l'on modifie l'original ou une copie.",
          },
          {
            label: "Bonne pratique",
            value:
              "Toujours inspecter (`head`, `info`, `describe`) avant de transformer : on ne nettoie bien que ce que l'on a regardé.",
          },
          {
            label: "Concepts liés",
            value: "`numpy`, valeurs manquantes, préparation des données.",
          },
        ],
      },
    ],
  },
  {
    id: "premier-modele",
    title: "Premier modèle pas à pas",
    level: 2,
    intro:
      "Entraîner un classifieur sur le jeu de données Iris, en six étapes.",
    blocks: [
      {
        kind: "text",
        text: "Le jeu de données Iris est le « hello world » du machine learning : 150 fleurs décrites par 4 mesures (longueur et largeur des pétales et sépales), réparties en 3 espèces. L'objectif : prédire l'espèce à partir des mesures. Il est inclus dans `scikit-learn`, donc aucun téléchargement n'est nécessaire.",
      },
      {
        kind: "steps",
        steps: [
          {
            title: "Charger les données",
            detail:
              "`load_iris()` renvoie les mesures (`data`, la matrice X) et les espèces (`target`, le vecteur y). X contient les entrées, y les réponses attendues.",
          },
          {
            title: "Séparer entraînement et test",
            detail:
              "`train_test_split` réserve 20 à 30 % des exemples pour l'évaluation finale. Le modèle ne verra jamais ces exemples pendant l'entraînement.",
          },
          {
            title: "Choisir un modèle",
            detail:
              "`LogisticRegression` est un classifieur simple et robuste : un bon premier choix pour un problème de classification.",
          },
          {
            title: "Entraîner avec fit",
            detail:
              "`model.fit(X_train, y_train)` : le modèle ajuste ses paramètres internes sur les exemples d'entraînement. C'est l'« apprentissage ».",
          },
          {
            title: "Prédire avec predict",
            detail:
              "`model.predict(X_test)` renvoie les espèces prédites pour les exemples de test, que le modèle n'a jamais vus.",
          },
          {
            title: "Évaluer",
            detail:
              "Comparer les prédictions aux vraies espèces avec `accuracy_score` : la proportion de bonnes réponses sur le jeu de test.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Le workflow complet en 10 lignes",
        code: "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score\n\nX, y = load_iris(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)\n\nmodele = LogisticRegression(max_iter=200)\nmodele.fit(X_train, y_train)          # apprentissage\npredictions = modele.predict(X_test)  # prédiction sur données inédites\nprint(accuracy_score(y_test, predictions))  # ex. : 0.97 = 97 % de bonnes réponses",
      },
      {
        kind: "text",
        text: "On montre des exemples étiquetés au modèle (`fit`), puis on vérifie qu'il généralise sur des exemples inédits (`predict` + métrique).",
      },
      {
        kind: "fields",
        title: "Ce que ce premier modèle enseigne",
        fields: [          {
            label: "Pourquoi ce découpage",
            value:
              "Évaluer sur les données d'entraînement serait tricher : le modèle les a déjà vues. Le jeu de test simule le monde réel.",
          },
          {
            label: "Le rôle de random_state",
            value:
              "Fixer `random_state=42` rend le découpage reproductible : relancé demain, le script donnera les mêmes résultats.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `max_iter` ou ignorer l'avertissement de non-convergence : la régression logistique itère pour trouver ses paramètres ; il faut lui laisser assez d'itérations.",
          },
          {
            label: "Bonne pratique",
            value:
              "Commencer par un modèle simple (`LogisticRegression`) avant tout modèle complexe : c'est la référence à battre.",
          },
        ],
      },
    ],
  },
  {
    id: "preparation-donnees",
    title: "Préparation des données",
    level: 2,
    intro:
      "Pourquoi le nettoyage des données est l'étape la plus importante du projet.",
    blocks: [
      {
        kind: "text",
        text: "Un modèle ne voit que des nombres : toute valeur aberrante, manquante ou mal encodée fausse son apprentissage. La préparation (nettoyage, gestion des manquants, encodage des catégories, mise à l'échelle) transforme des données brutes en une matrice X propre que les algorithmes peuvent exploiter. C'est souvent là que se joue la qualité finale, bien plus que dans le choix de l'algorithme.",
      },
      {
        kind: "code",
        language: "python",
        title: "Repérer les problèmes courants",
        code: "import pandas as pd\n\ndf = pd.read_csv(\"donnees.csv\")\nprint(df.isna().sum())      # valeurs manquantes par colonne\nprint(df.duplicated().sum())  # lignes en double\nprint(df.dtypes)            # types : une colonne numérique lue comme texte ?",
      },
      {
        kind: "text",
        text: "La préparation convertit des données brutes et imparfaites en une matrice numérique propre et cohérente.",
      },
      {
        kind: "text",
        text: "Les données réelles sont sales : capteurs en panne, saisies humaines, formats incohérents. Les algorithmes, eux, exigent des nombres propres.",
      },
      {
        kind: "fields",
        title: "La préparation : l'essentiel",
        fields: [          {
            label: "Quand s'en préoccuper",
            value:
              "Toujours, avant le premier `fit`. Un modèle entraîné sur des données sales apprend le bruit.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Nettoyer « à l'œil » sans script : impossible à reproduire et à appliquer aux nouvelles données. Tout nettoyage doit être du code réexécutable.",
          },
          {
            label: "Bonne pratique",
            value:
              "Encapsuler toute la préparation dans un `Pipeline` scikit-learn : le même traitement s'applique à l'entraînement et à la production.",
          },
          {
            label: "Concepts liés",
            value:
              "Valeurs manquantes, encodage des catégories, mise à l'échelle, `Pipeline`.",
          },
        ],
      },
    ],
  },
  {
    id: "separation-train-test",
    title: "Séparation entraînement / test",
    level: 2,
    intro:
      "Pourquoi on cache une partie des données au modèle, et comment bien le faire.",
    blocks: [
      {
        kind: "text",
        text: "Pour savoir si un modèle a vraiment appris (plutôt que mémorisé), on l'évalue sur des exemples qu'il n'a jamais vus. On sépare donc les données en deux : l'ensemble d'entraînement (généralement 70 à 80 %) pour le `fit`, et l'ensemble de test (20 à 30 %) gardé sous clé jusqu'à l'évaluation finale.",
      },
      {
        kind: "code",
        language: "python",
        title: "Séparer avec scikit-learn",
        code: "from sklearn.model_selection import train_test_split\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y,\n    test_size=0.25,      # 25 % des données réservées au test\n    random_state=42,     # découpage reproductible\n    stratify=y,          # conserve la proportion des classes dans chaque lot\n)",
      },
      {
        kind: "text",
        text: "Le jeu de test est un examen blanc : des questions inédites qui mesurent ce que le modèle a vraiment compris.",
      },
      {
        kind: "fields",
        title: "La séparation : l'essentiel",
        fields: [          {
            label: "Pourquoi stratify",
            value:
              "Sans stratification, un tirage malchanceux peut mettre presque tous les exemples d'une classe rare dans le test : les proportions seraient faussées des deux côtés.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Toucher au jeu de test pendant le développement (choisir le modèle qui y performe le mieux). À force, le test devient un deuxième entraînement déguisé et ne mesure plus rien.",
          },
          {
            label: "Bonne pratique",
            value:
              "Le jeu de test ne sert qu'une fois, à la toute fin. Pendant le développement, on utilise la validation croisée sur l'entraînement.",
          },
          {
            label: "Concepts liés",
            value: "Validation croisée, surapprentissage, data leakage.",
          },
        ],
      },
    ],
  },
  {
    id: "fit-predict-contrat",
    title: "Le contrat fit / predict",
    level: 2,
    intro:
      "L'interface uniforme de scikit-learn : deux méthodes pour tous les modèles.",
    blocks: [
      {
        kind: "text",
        text: "Tous les modèles de `scikit-learn` parlent le même langage : `fit(X, y)` apprend à partir des exemples, `predict(X)` prédit sur de nouvelles entrées. Cette uniformité permet de changer d'algorithme en changeant une seule ligne, et de comparer honnêtement plusieurs modèles sur les mêmes données.",
      },
      {
        kind: "code",
        language: "python",
        title: "Même interface, trois modèles",
        code: "from sklearn.linear_model import LogisticRegression\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.neighbors import KNeighborsClassifier\n\nfor Modele in [LogisticRegression, RandomForestClassifier, KNeighborsClassifier]:\n    m = Modele()\n    m.fit(X_train, y_train)       # apprentissage : identique pour tous\n    score = m.score(X_test, y_test)  # évaluation rapide sur le test\n    print(type(m).__name__, score)",
      },
      {
        kind: "text",
        text: "`fit` ajuste les paramètres internes du modèle sur des exemples ; `predict` applique le modèle appris à de nouvelles données.",
      },
      {
        kind: "fields",
        title: "fit / predict : l'essentiel",
        fields: [          {
            label: "Pourquoi cette uniformité",
            value:
              "Elle rend les modèles interchangeables : pipelines, validation croisée et comparaisons fonctionnent avec n'importe quel estimateur sans code spécifique.",
          },
          {
            label: "Comment ça fonctionne",
            value:
              "`fit` stocke le résultat de l'apprentissage dans des attributs terminés par `_` (ex. `coef_`) ; `predict` ne fait que calculer, sans modifier le modèle.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Appeler `fit` sur le jeu de test, ou `predict` avant `fit` : le premier fausse l'évaluation, le second lève une erreur (`NotFittedError`).",
          },
          {
            label: "Bonne pratique",
            value:
              "Séparer visuellement le code : une cellule « entraînement » (`fit` sur train uniquement), une cellule « évaluation » (`predict`/`score` sur test).",
          },
          {
            label: "Concepts liés",
            value: "`Pipeline`, validation croisée, séparation train/test.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-ml",
    title: "Le workflow d'un projet ML",
    level: 2,
    intro:
      "Les six étapes que suit tout projet de machine learning, du problème au déploiement.",
    blocks: [
      {
        kind: "diagram",
        title: "Le workflow complet",
        lines: [
          "1. CADRAGE — quel problème ? quelle décision le modèle aidera-t-il ?",
          "        │",
          "2. DONNÉES — collecter, explorer, nettoyer (pandas, matplotlib)",
          "        │",
          "3. PRÉPARATION — manquants, encodage, mise à l'échelle, split train/test",
          "        │",
          "4. MODÉLISATION — baseline simple, puis modèles plus riches (fit)",
          "        │",
          "5. ÉVALUATION — métriques sur le test, validation croisée, comparaison",
          "        │",
          "6. DÉPLOIEMENT — sauvegarder, exposer via API, surveiller",
          "        │",
          "        └─► retour à 2 : les résultats guident de nouvelles données",
        ],
      },
      {
        kind: "text",
        text: "Un projet ML est une boucle : cadrer, préparer des données, entraîner, évaluer honnêtement, déployer, puis itérer.",
      },
      {
        kind: "fields",
        title: "Le workflow : l'essentiel",
        fields: [          {
            label: "Pourquoi cet ordre",
            value:
              "Chaque étape dépend de la précédente : on ne choisit pas une métrique avant de savoir quelle décision le modèle doit aider à prendre.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Sauter le cadrage et foncer sur l'algorithme « à la mode ». Un modèle précis qui répond à la mauvaise question ne sert à rien.",
          },
          {
            label: "Bonne pratique",
            value:
              "Toujours établir une baseline simple d'abord (modèle naïf ou règle métier) : tout modèle complexe doit prouver qu'il fait mieux.",
          },
          {
            label: "Concepts liés",
            value: "Préparation des données, métriques, mise en production.",
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "regression",
    title: "La régression",
    level: 3,
    intro:
      "Prédire un nombre continu : prix, température, durée. Notions et usage.",
    blocks: [
      {
        kind: "text",
        text: "La régression répond aux questions dont la réponse est un nombre : quel sera le prix de cet appartement ? combien de vélos seront loués demain ? Le modèle apprend une fonction qui associe à chaque entrée une valeur numérique, en minimisant l'écart entre ses prédictions et les valeurs réelles observées.",
      },
      {
        kind: "code",
        language: "python",
        title: "Régression linéaire avec scikit-learn",
        code: "from sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_squared_error\n\nmodele = LinearRegression()\nmodele.fit(X_train, y_train)          # y_train contient des nombres (prix, etc.)\npredictions = modele.predict(X_test)\nprint(\"RMSE :\", mean_squared_error(y_test, predictions) ** 0.5)",
      },
      {
        kind: "text",
        text: "La régression prédit une quantité : la sortie du modèle est un nombre sur une échelle continue.",
      },
      {
        kind: "text",
        text: "Beaucoup de décisions reposent sur des estimations chiffrées : budget, stock, délai. La régression quantifie l'incertain.",
      },
      {
        kind: "text",
        text: "Quand la cible est numérique et ordonnée : prix, âge, consommation, score. Si la cible est une catégorie, c'est de la classification.",
      },
      {
        kind: "fields",
        title: "La régression : l'essentiel",
        fields: [
          {
            label: "Exemple simple",
            value:
              "Prédire le prix d'un appartement à partir de sa surface, du nombre de pièces et du quartier.",
          },
          {
            label: "Exemple réel",
            value:
              "Prévision de la demande électrique : les opérateurs estiment la consommation des prochaines heures à partir de la météo et de l'historique.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Appliquer une régression à une cible catégorielle encodée en nombres (ex. 1=chat, 2=chien) : les nombres n'ont pas de sens ordinal, le modèle apprend du bruit.",
          },
          {
            label: "Bonne pratique",
            value:
              "Regarder les résidus (erreurs = réel − prédit) : s'ils montrent une structure, le modèle rate quelque chose de systématique.",
          },
          {
            label: "Concepts liés",
            value: "Classification, métriques de régression (RMSE, MAE, R²).",
          },
        ],
      },
    ],
  },
  {
    id: "classification",
    title: "La classification",
    level: 3,
    intro:
      "Prédire une catégorie : spam ou non, malade ou sain, churn ou fidèle.",
    blocks: [
      {
        kind: "text",
        text: "La classification attribue chaque entrée à une classe parmi un ensemble fini : cet e-mail est-il un spam ? ce client va-t-il résilier ? Le modèle apprend les frontières qui séparent les classes dans l'espace des variables, à partir d'exemples étiquetés.",
      },
      {
        kind: "code",
        language: "python",
        title: "Classification binaire",
        code: "from sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import classification_report\n\nmodele = RandomForestClassifier(n_estimators=200, random_state=42)\nmodele.fit(X_train, y_train)  # y_train contient des étiquettes : 0/1, \"spam\"/\"ham\"...\nprint(classification_report(y_test, modele.predict(X_test)))",
      },
      {
        kind: "text",
        text: "La classification range chaque observation dans une case : la sortie est une étiquette, pas un nombre.",
      },
      {
        kind: "text",
        text: "Trier, filtrer, alerter : une grande partie des décisions métier sont des choix entre catégories.",
      },
      {
        kind: "text",
        text: "Quand la réponse attendue appartient à un ensemble fini et connu à l'avance : diagnostic, détection de fraude, modération.",
      },
      {
        kind: "fields",
        title: "La classification : l'essentiel",
        fields: [
          {
            label: "Exemple simple",
            value: "Classer des e-mails en « spam » ou « non-spam ».",
          },
          {
            label: "Exemple réel",
            value:
              "Détection de fraude bancaire : chaque transaction est classée « légitime » ou « suspecte » pour déclencher une vérification.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Se contenter de l'accuracy quand les classes sont déséquilibrées : 99 % de « légitime » donne 99 % d'accuracy à un modèle qui ne détecte aucune fraude.",
          },
          {
            label: "Bonne pratique",
            value:
              "Toujours regarder précision, rappel et matrice de confusion en plus de l'accuracy, surtout si les classes sont déséquilibrées.",
          },
          {
            label: "Concepts liés",
            value: "Régression, précision/rappel, matrice de confusion.",
          },
        ],
      },
    ],
  },
  {
    id: "regression-vs-classification",
    title: "Régression ou classification ?",
    level: 3,
    intro: "Le tableau de décision : le type de la cible détermine la famille.",
    blocks: [
      {
        kind: "table",
        headers: ["Question à se poser", "Régression", "Classification"],
        rows: [
          [
            "La cible est…",
            "un nombre continu (prix, durée)",
            "une étiquette (spam/ham, 0/1/2)",
          ],
          [
            "Question type",
            "« combien ? »",
            "« lequel / laquelle ? »",
          ],
          [
            "Algorithmes typiques",
            "`LinearRegression`, `RandomForestRegressor`",
            "`LogisticRegression`, `RandomForestClassifier`",
          ],
          [
            "Métriques adaptées",
            "RMSE, MAE, R²",
            "accuracy, précision, rappel, F1",
          ],
          [
            "Sortie du modèle",
            "une valeur numérique",
            "une classe (et souvent des probabilités)",
          ],
        ],
      },
      {
        kind: "text",
        text: "Le nom est trompeur : la « régression logistique » (`LogisticRegression`) est un algorithme de classification, pas de régression. Son nom vient de la fonction logistique qu'elle utilise en interne, mais sa sortie est bien une classe.",
      },
    ],
  },
  {
    id: "clustering",
    title: "Le clustering",
    level: 3,
    intro:
      "Regrouper les données similaires sans étiquettes : la principale famille du non-supervisé.",
    blocks: [
      {
        kind: "text",
        text: "Le clustering (regroupement) partitionne les observations en groupes tels que les points d'un même groupe se ressemblent. Aucune étiquette n'est fournie : l'algorithme découvre seul la structure. L'algorithme le plus connu, KMeans, cherche K centres qui minimisent la distance des points à leur centre le plus proche.",
      },
      {
        kind: "code",
        language: "python",
        title: "KMeans en 5 lignes",
        code: "from sklearn.cluster import KMeans\n\nkmeans = KMeans(n_clusters=3, random_state=42, n_init=10)\ngroupes = kmeans.fit_predict(X)  # fit + predict en une fois : pas de y !\nprint(kmeans.cluster_centers_)   # les centres des 3 groupes découverts",
      },
      {
        kind: "text",
        text: "Le clustering découvre des groupes naturels dans les données, sans qu'on lui dise à quoi ils correspondent.",
      },
      {
        kind: "text",
        text: "Étiqueter des données coûte cher ; le clustering exploite les données brutes pour segmenter, explorer ou détecter l'inhabituel.",
      },
      {
        kind: "text",
        text: "Segmentation clients, regroupement de documents par thème, détection d'anomalies (les points loin de tout groupe).",
      },
      {
        kind: "fields",
        title: "Le clustering : l'essentiel",
        fields: [
          {
            label: "Exemple réel",
            value:
              "Un site e-commerce regroupe ses clients par comportement d'achat pour adapter ses campagnes, sans catégories prédéfinies.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Choisir K au hasard. Le nombre de groupes est un hyperparamètre : on l'explore (méthode du coude, silhouette) au lieu de le deviner.",
          },
          {
            label: "Bonne pratique",
            value:
              "Standardiser les variables avant KMeans : l'algorithme raisonne en distances, une variable en milliers écraserait une variable en unités.",
          },
          {
            label: "Concepts liés",
            value: "Réduction de dimensionnalité, mise à l'échelle, non-supervisé.",
          },
        ],
      },
    ],
  },
  {
    id: "reduction-dimensionalite",
    title: "Réduction de dimensionnalité",
    level: 3,
    intro: "Compresser les variables en gardant l'essentiel : l'ACP (PCA).",
    blocks: [
      {
        kind: "text",
        text: "Quand un jeu de données a des dizaines ou centaines de variables, il devient difficile à visualiser et les algorithmes peinent (malédiction de la dimensionnalité). L'analyse en composantes principales (PCA) construit de nouvelles variables — les composantes — qui concentrent l'essentiel de la variance des données d'origine, en en perdant le moins possible.",
      },
      {
        kind: "code",
        language: "python",
        title: "PCA pour visualiser en 2D",
        code: "from sklearn.decomposition import PCA\nfrom sklearn.preprocessing import StandardScaler\n\nX_std = StandardScaler().fit_transform(X)  # PCA exige des variables centrées-réduites\npca = PCA(n_components=2)\nX_2d = pca.fit_transform(X_std)\nprint(pca.explained_variance_ratio_)  # part de variance gardée par composante",
      },
      {
        kind: "text",
        text: "La PCA remplace N variables corrélées par quelques composantes qui résument l'information.",
      },
      {
        kind: "text",
        text: "Visualiser des données en 2D/3D, débruiter, accélérer un modèle en réduisant le nombre d'entrées.",
      },
      {
        kind: "fields",
        title: "La PCA : l'essentiel",
        fields: [          {
            label: "Erreur fréquente",
            value:
              "Appliquer la PCA sans standardiser : les variables à grande amplitude domineraient les composantes.",
          },
          {
            label: "Bonne pratique",
            value:
              "Regarder `explained_variance_ratio_` : si 2 composantes n'expliquent que 30 % de la variance, la visualisation 2D est trompeuse.",
          },
          {
            label: "Concepts liés",
            value: "Clustering, mise à l'échelle, malédiction de la dimensionnalité.",
          },
        ],
      },
    ],
  },
  {
    id: "apprentissage-renforcement",
    title: "L'apprentissage par renforcement",
    level: 3,
    intro:
      "Notions : un agent qui apprend par essai, erreur et récompense.",
    blocks: [
      {
        kind: "text",
        text: "En apprentissage par renforcement, il n'y a ni exemples étiquetés ni bonne réponse fournie. Un agent observe un état de l'environnement, choisit une action, reçoit une récompense (positive ou négative), et ajuste sa politique — sa stratégie — pour maximiser la récompense cumulée. C'est ainsi que des programmes ont appris à jouer au go ou à contrôler des bras robotiques.",
      },
      {
        kind: "diagram",
        title: "La boucle agent-environnement",
        lines: [
          "  ┌─────────┐   action    ┌──────────────┐",
          "  │  AGENT  │ ──────────► │ ENVIRONNEMENT │",
          "  │(politique)│           └──────────────┘",
          "  └─────────┘   ◄────────── │",
          "       ▲          état +    │",
          "       └──────── récompense ─┘",
          "",
          "L'agent ajuste sa politique pour maximiser",
          "la récompense cumulée sur le long terme.",
        ],
      },
      {
        kind: "text",
        text: "L'agent apprend une stratégie par essai-erreur, guidé uniquement par les récompenses de l'environnement.",
      },
      {
        kind: "text",
        text: "Décisions séquentielles où chaque action influence la suite : jeux, robotique, pilotage de systèmes.",
      },
      {
        kind: "fields",
        title: "Le renforcement : l'essentiel",
        fields: [          {
            label: "Pourquoi c'est difficile",
            value:
              "La récompense est souvent retardée (un bon coup aux échecs ne paie qu'à la fin) et l'exploration coûte cher en environnement réel.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Mal définir la récompense : l'agent optimise exactement ce qu'on lui demande, y compris les failles (ex. : un robot qui tourne en rond pour accumuler des points).",
          },
          {
            label: "Concepts liés",
            value: "Supervisé, politique, exploration vs exploitation.",
          },
        ],
      },
    ],
  },
  {
    id: "qualite-donnees",
    title: "Qualité des données",
    level: 3,
    intro:
      "Le principe « garbage in, garbage out » : diagnostiquer avant de modéliser.",
    blocks: [
      {
        kind: "text",
        text: "« Garbage in, garbage out » : un modèle ne peut pas être meilleur que les données qu'on lui donne. Avant tout entraînement, on diagnostique : valeurs manquantes, doublons, types incohérents, valeurs aberrantes, distributions suspectes. Cette phase d'exploration (souvent appelée EDA, analyse exploratoire) oriente tout le reste du projet.",
      },
      {
        kind: "code",
        language: "python",
        title: "Diagnostic express d'un DataFrame",
        code: "import pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv(\"donnees.csv\")\nprint(df.shape)              # dimensions : lignes x colonnes\nprint(df.isna().sum())       # manquants par colonne\nprint(df.duplicated().sum()) # doublons\nprint(df.describe())         # un min/max absurde saute aux yeux ici\ndf[\"age\"].hist()             # visualiser la distribution\nplt.show()",
      },
      {
        kind: "text",
        text: "Diagnostiquer les données (manquants, doublons, aberrations) avant de les confier à un algorithme.",
      },
      {
        kind: "fields",
        title: "La qualité des données : l'essentiel",
        fields: [          {
            label: "Exemple simple",
            value:
              "Une colonne « âge » avec des valeurs à 999 : probablement un code pour « inconnu », pas des centenaires. À traiter, pas à apprendre.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Supprimer les lignes à valeurs aberrantes sans comprendre leur origine : on peut jeter justement les cas les plus informatifs (ex. : les fraudes).",
          },
          {
            label: "Bonne pratique",
            value:
              "Documenter chaque décision de nettoyage (quoi, pourquoi) : la préparation fait partie du modèle et doit être reproductible.",
          },
          {
            label: "Concepts liés",
            value: "Valeurs manquantes, EDA, `matplotlib`.",
          },
        ],
      },
    ],
  },
  {
    id: "valeurs-manquantes",
    title: "Valeurs manquantes",
    level: 3,
    intro: "Détecter, comprendre et traiter les trous dans les données.",
    blocks: [
      {
        kind: "text",
        text: "Les valeurs manquantes (`NaN`) bloquent la plupart des algorithmes, qui exigent des nombres. Trois stratégies : supprimer les lignes/colonnes trop trouées, imputer (remplacer par la moyenne, la médiane ou une valeur constante), ou utiliser un modèle qui les gère nativement. Le choix dépend de la proportion de manquants et de leur origine.",
      },
      {
        kind: "code",
        language: "python",
        title: "Imputer avec scikit-learn",
        code: "import pandas as pd\nfrom sklearn.impute import SimpleImputer\n\ndf = pd.read_csv(\"donnees.csv\")\nprint(df.isna().sum())  # où sont les trous ?\n\nimputer = SimpleImputer(strategy=\"median\")  # médiane : robuste aux extrêmes\nX_impute = imputer.fit_transform(df[[\"age\", \"salaire\"]])",
      },
      {
        kind: "text",
        text: "Une valeur manquante n'est pas un zéro : c'est une information absente, à traiter explicitement.",
      },
      {
        kind: "fields",
        title: "Les valeurs manquantes : l'essentiel",
        fields: [          {
            label: "Pourquoi c'est délicat",
            value:
              "L'absence peut être informative : un champ « revenu » vide n'est pas aléatoire. Imputer aveuglément peut effacer un signal.",
          },
          {
            label: "Quand supprimer",
            value:
              "Quand les manquants sont rares et semblent aléatoires. Quand une colonne est trouée à plus de la moitié, on questionne la colonne elle-même.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Imputer avec la moyenne calculée sur tout le jeu de données, test inclus : c'est une fuite (le test influence l'entraînement). Toujours `fit` sur le train, `transform` sur le test.",
          },
          {
            label: "Bonne pratique",
            value:
              "Utiliser `SimpleImputer` dans un `Pipeline` : l'imputation devient une étape reproductible du modèle.",
          },
          {
            label: "Concepts liés",
            value: "Data leakage, `Pipeline`, préparation des données.",
          },
        ],
      },
    ],
  },
  {
    id: "encodage-categories",
    title: "Encodage des catégories",
    level: 3,
    intro:
      "Convertir le texte (« rouge », « vert ») en nombres exploitables par les modèles.",
    blocks: [
      {
        kind: "text",
        text: "Les modèles manipulent des nombres, pas du texte. Une colonne catégorielle (« ville », « couleur ») doit être convertie : l'encodage one-hot crée une colonne binaire par catégorie (Paris → 1/0/0), tandis que l'encodage ordinal attribue des entiers quand les catégories ont un ordre naturel (« petit » < « moyen » < « grand »).",
      },
      {
        kind: "code",
        language: "python",
        title: "One-hot avec scikit-learn",
        code: "import pandas as pd\nfrom sklearn.preprocessing import OneHotEncoder\n\ndf = pd.DataFrame({\"couleur\": [\"rouge\", \"vert\", \"bleu\", \"rouge\"]})\nenc = OneHotEncoder(sparse_output=False, handle_unknown=\"ignore\")\nprint(enc.fit_transform(df[[\"couleur\"]]))\n# chaque couleur devient une colonne 0/1",
      },
      {
        kind: "text",
        text: "L'encodage traduit des catégories texte en vecteurs numériques sans inventer de faux ordre.",
      },
      {
        kind: "fields",
        title: "L'encodage : l'essentiel",
        fields: [          {
            label: "Pourquoi le one-hot",
            value:
              "Attribuer 1, 2, 3 à « rouge, vert, bleu » ferait croire au modèle que bleu = 3 × rouge. Le one-hot évite cette fausse hiérarchie.",
          },
          {
            label: "Quand l'éviter",
            value:
              "Avec des centaines de catégories (codes postaux, identifiants) : le one-hot explose le nombre de colonnes. On regroupe ou on utilise d'autres techniques.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `handle_unknown=\"ignore\"` : une nouvelle catégorie en production fait échouer la transformation au lieu d'être gérée.",
          },
          {
            label: "Bonne pratique",
            value:
              "Encapsuler l'encodeur dans un `ColumnTransformer` au sein d'un `Pipeline` : numériques et catégorielles sont traitées en une fois.",
          },
          {
            label: "Concepts liés",
            value: "`Pipeline`, mise à l'échelle, feature engineering.",
          },
        ],
      },
    ],
  },
  {
    id: "mise-echelle",
    title: "Mise à l'échelle",
    level: 3,
    intro:
      "Standardisation et normalisation : mettre les variables sur un pied d'égalité.",
    blocks: [
      {
        kind: "text",
        text: "Un modèle qui raisonne en distances (KMeans, KNN, régression régularisée, réseaux de neurones) est dominé par les variables à grande amplitude : un salaire en dizaines de milliers écrase un âge en dizaines. La standardisation recentre chaque variable (moyenne 0, écart-type 1), la normalisation min-max la ramène dans un intervalle fixe. Les modèles à base d'arbres, eux, s'en moquent : ils ne comparent que des seuils.",
      },
      {
        kind: "code",
        language: "python",
        title: "Standardiser correctement",
        code: "from sklearn.preprocessing import StandardScaler\n\nscaler = StandardScaler()\nX_train_std = scaler.fit_transform(X_train)  # apprend moyenne/écart-type SUR LE TRAIN\nX_test_std = scaler.transform(X_test)        # applique SANS réapprendre sur le test",
      },
      {
        kind: "text",
        text: "La mise à l'échelle donne à chaque variable un ordre de grandeur comparable pour que l'algorithme les écoute équitablement.",
      },
      {
        kind: "fields",
        title: "La mise à l'échelle : l'essentiel",
        fields: [          {
            label: "Quand c'est indispensable",
            value:
              "KMeans, KNN, régression logistique/ridge, PCA, réseaux de neurones : tous sensibles aux échelles.",
          },
          {
            label: "Quand c'est inutile",
            value:
              "Arbres de décision et forêts aléatoires : ils seuillent variable par variable, l'échelle ne change rien.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`fit_transform` sur le test : on recalcule moyenne et écart-type sur des données que le modèle n'aurait jamais dû voir. Toujours `fit` sur train, `transform` sur test.",
          },
          {
            label: "Bonne pratique",
            value:
              "Mettre le scaler dans le `Pipeline` : la règle du fit-sur-train devient automatique.",
          },
          {
            label: "Concepts liés",
            value: "Data leakage, `Pipeline`, clustering, PCA.",
          },
        ],
      },
    ],
  },
  {
    id: "feature-engineering",
    title: "Feature engineering",
    level: 3,
    intro:
      "Créer de meilleures variables : souvent plus rentable que changer d'algorithme.",
    blocks: [
      {
        kind: "text",
        text: "Le feature engineering consiste à fabriquer, à partir des variables brutes, des variables plus informatives : extraire le jour de la semaine d'une date, combiner deux mesures en un ratio, compter des occurrences. Un modèle simple sur de bonnes variables bat presque toujours un modèle complexe sur des variables brutes.",
      },
      {
        kind: "code",
        language: "python",
        title: "Créer des variables avec pandas",
        code: "import pandas as pd\n\ndf = pd.read_csv(\"transactions.csv\", parse_dates=[\"date\"])\ndf[\"jour_semaine\"] = df[\"date\"].dt.dayofweek   # 0=lundi … 6=dimanche\ndf[\"est_weekend\"] = df[\"jour_semaine\"] >= 5     # variable binaire dérivée\ndf[\"panier_moyen\"] = df[\"montant\"] / df[\"nb_articles\"]  # ratio informatif",
      },
      {
        kind: "text",
        text: "Le feature engineering traduit la connaissance du métier en variables que le modèle peut exploiter.",
      },
      {
        kind: "fields",
        title: "Le feature engineering : l'essentiel",
        fields: [          {
            label: "Pourquoi c'est puissant",
            value:
              "L'algorithme ne connaît pas le contexte : « week-end » ou « panier moyen » sont des idées humaines qu'aucune formule automatique ne devine.",
          },
          {
            label: "Exemple réel",
            value:
              "En maintenance prédictive, la variable « heures depuis la dernière révision » prédit mieux les pannes que les mesures brutes des capteurs.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Créer des variables qui utilisent de l'information future (ex. : « montant total du mois » pour prédire un événement du 5) : c'est du target leak.",
          },
          {
            label: "Bonne pratique",
            value:
              "Chaque variable créée doit être calculable au moment de la prédiction en production, avec les seules données disponibles à cet instant.",
          },
          {
            label: "Concepts liés",
            value: "Target leak, préparation des données, connaissance métier.",
          },
        ],
      },
    ],
  },
  {
    id: "metriques-classification",
    title: "Métriques de classification",
    level: 3,
    intro:
      "Accuracy, précision, rappel : définitions et pièges de chacune.",
    blocks: [
      {
        kind: "text",
        text: "L'accuracy (proportion de bonnes réponses) est intuitive mais trompeuse quand les classes sont déséquilibrées. La précision répond à « quand le modèle dit oui, a-t-il raison ? » et le rappel à « parmi tous les vrais oui, combien le modèle a-t-il trouvés ? ». Selon le coût des erreurs, on privilégie l'une ou l'autre.",
      },
      {
        kind: "code",
        language: "python",
        title: "Lire un rapport de classification",
        code: "from sklearn.metrics import accuracy_score, precision_score, recall_score\n\nprint(\"Accuracy :\", accuracy_score(y_test, predictions))\nprint(\"Précision :\", precision_score(y_test, predictions))\nprint(\"Rappel :\", recall_score(y_test, predictions))\n# Pour le multi-classe : classification_report donne le détail par classe",
      },
      {
        kind: "fields",
        title: "Les métriques : l'essentiel",
        fields: [
          {
            label: "Accuracy",
            value:
              "Bonnes prédictions ÷ total. Simple, mais inutile si une classe domine : prédire toujours la classe majoritaire donne une accuracy élevée sans rien apprendre.",
          },
          {
            label: "Précision",
            value:
              "Vrais positifs ÷ prédits positifs. « Quand le modèle alerte, a-t-il raison ? » Cruciale quand les fausses alertes coûtent cher (ex. : bloquer un compte légitime).",
          },
          {
            label: "Rappel (recall)",
            value:
              "Vrais positifs ÷ réellement positifs. « Combien de cas réels le modèle a-t-il attrapés ? » Crucial quand rater un cas coûte cher (ex. : dépistage médical).",
          },
          {
            label: "Le dilemme",
            value:
              "Être plus strict augmente la précision mais baisse le rappel, et inversement. Le seuil de décision règle ce compromis : il n'y a pas de métrique universellement « bonne ».",
          },
          {
            label: "Erreur fréquente",
            value:
              "Optimiser l'accuracy sur un problème déséquilibré, puis découvrir en production que le modèle ne détecte aucun cas de la classe rare.",
          },
          {
            label: "Bonne pratique",
            value:
              "Choisir la métrique d'après le coût métier des erreurs AVANT d'entraîner, et la garder fixe pendant tout le projet.",
          },
          {
            label: "Concepts liés",
            value: "Matrice de confusion, seuil de décision, classes déséquilibrées.",
          },
        ],
      },
    ],
  },
  {
    id: "precision-vs-rappel",
    title: "Précision vs rappel : le compromis",
    level: 3,
    intro:
      "Deux exemples métier qui montrent pourquoi on ne peut pas maximiser les deux.",
    blocks: [
      {
        kind: "table",
        headers: ["Situation", "On privilégie…", "Pourquoi"],
        rows: [
          [
            "Dépistage d'une maladie grave",
            "le rappel",
            "Rater un malade (faux négatif) est dramatique ; une fausse alerte se vérifie par un second test.",
          ],
          [
            "Filtre anti-spam agressif",
            "la précision",
            "Classer un e-mail important en spam (faux positif) fait perdre un message ; rater un spam est bénin.",
          ],
          [
            "Détection de fraude bancaire",
            "un équilibre (F1)",
            "Fausses alertes (clients bloqués) et fraudes ratées coûtent toutes les deux cher.",
          ],
        ],
      },
      {
        kind: "text",
        text: "Techniquement, la plupart des classifieurs produisent un score (probabilité) et appliquent un seuil, souvent 0,5 par défaut : au-dessus, « oui ». Baisser le seuil augmente le rappel (on dit « oui » plus souvent) au détriment de la précision. Régler ce seuil sur un jeu de validation, selon le coût métier, fait partie du travail — ce n'est pas un détail.",
      },
    ],
  },
  {
    id: "matrice-confusion",
    title: "Matrice de confusion",
    level: 3,
    intro: "Lire le tableau qui dit exactement où le modèle se trompe.",
    blocks: [
      {
        kind: "diagram",
        title: "Matrice de confusion (classification binaire)",
        lines: [
          "                      Prédit : NON        Prédit : OUI",
          "Réel : NON      │  vrais négatifs  │  faux positifs   │",
          "                │   (bien rejeté)  │ (fausse alerte)  │",
          "────────────────┼──────────────────┼──────────────────│",
          "Réel : OUI      │  faux négatifs   │  vrais positifs  │",
          "                │   (cas raté)     │ (bien détecté)   │",
          "",
          "Précision = vrais positifs / colonne « Prédit OUI »",
          "Rappel    = vrais positifs / ligne « Réel OUI »",
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Afficher la matrice",
        code: "from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay\n\ncm = confusion_matrix(y_test, predictions)\nprint(cm)  # [[vrais_négatifs, faux_positifs], [faux_négatifs, vrais_positifs]]\nConfusionMatrixDisplay(cm).plot()  # version graphique dans un notebook",
      },
      {
        kind: "text",
        text: "La matrice croise réalité et prédiction : elle montre non seulement combien d'erreurs, mais lesquelles.",
      },
      {
        kind: "fields",
        title: "La matrice de confusion : l'essentiel",
        fields: [          {
            label: "Pourquoi c'est mieux qu'un score",
            value:
              "Deux modèles à 90 % d'accuracy peuvent échouer différemment : l'un rate des cas graves, l'autre génère des fausses alertes. La matrice révèle cette différence.",
          },
          {
            label: "Bonne pratique",
            value:
              "La regarder par classe en multi-classe : elle révèle les paires de classes que le modèle confond systématiquement (ex. : « 4 » et « 9 » en chiffres manuscrits).",
          },
          {
            label: "Concepts liés",
            value: "Précision, rappel, métriques de classification.",
          },
        ],
      },
    ],
  },
  {
    id: "metriques-regression",
    title: "Métriques de régression",
    level: 3,
    intro: "MAE, RMSE, R² : mesurer l'erreur quand la cible est un nombre.",
    blocks: [
      {
        kind: "text",
        text: "MAE et RMSE mesurent l'erreur moyenne dans l'unité du problème ; R² mesure la qualité globale du modèle de 0 à 1.",
      },
      {
        kind: "fields",
        title: "Les trois métriques de référence",
        fields: [          {
            label: "MAE (erreur absolue moyenne)",
            value:
              "La moyenne des écarts absolus entre prédictions et réalité, dans l'unité de la cible (ex. : « en moyenne, le modèle se trompe de 12 000 € »). Simple à interpréter, robuste aux extrêmes.",
          },
          {
            label: "RMSE (racine de l'erreur quadratique moyenne)",
            value:
              "Même idée, mais les écarts sont mis au carré avant la moyenne : les grosses erreurs sont davantage pénalisées. Utile quand une grosse erreur coûte plus que plusieurs petites.",
          },
          {
            label: "R² (coefficient de détermination)",
            value:
              "La part de la variance de la cible expliquée par le modèle, entre 0 (aussi bon que prédire la moyenne) et 1 (parfait). Un R² négatif signifie : pire que la simple moyenne.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Comparer des RMSE entre problèmes différents : 100 € d'erreur sur des maisons et 100 € sur des baguettes n'ont rien à voir. Les métriques ne se comparent qu'à problème fixé.",
          },
          {
            label: "Bonne pratique",
            value:
              "Reporter la métrique avec son unité et une référence (baseline « prédire la moyenne ») : un RMSE seul ne dit pas si c'est bon.",
          },
          {
            label: "Concepts liés",
            value: "Régression, résidus, baseline.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Calculer les trois métriques",
        code: "from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score\n\nprint(\"MAE :\", mean_absolute_error(y_test, predictions))\nprint(\"RMSE :\", mean_squared_error(y_test, predictions) ** 0.5)\nprint(\"R² :\", r2_score(y_test, predictions))",
      },
    ],
  },
  {
    id: "validation-croisee",
    title: "Validation croisée",
    level: 3,
    intro:
      "Évaluer de façon robuste en tournant sur plusieurs découpages des données.",
    blocks: [
      {
        kind: "text",
        text: "Un unique découpage train/test peut être chanceux ou malchanceux. La validation croisée découpe les données d'entraînement en K plis : on entraîne K fois, chaque fois sur K−1 plis, en évaluant sur le pli restant. La moyenne des K scores est une estimation plus stable de la vraie performance, et l'écart-type des scores mesure sa fiabilité.",
      },
      {
        kind: "diagram",
        title: "Validation croisée à 5 plis",
        lines: [
          "pli 1 : [TEST ][ train train train train ] → score 1",
          "pli 2 : [train][TEST ][ train train train ] → score 2",
          "pli 3 : [train train][TEST ][ train train ] → score 3",
          "pli 4 : [train train train][TEST ][ train ] → score 4",
          "pli 5 : [train train train train][TEST ]    → score 5",
          "",
          "score final = moyenne des 5 scores",
          "Chaque exemple sert une fois à la validation.",
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Validation croisée avec scikit-learn",
        code: "from sklearn.model_selection import cross_val_score\nfrom sklearn.ensemble import RandomForestClassifier\n\nmodele = RandomForestClassifier(random_state=42)\nscores = cross_val_score(modele, X, y, cv=5)  # 5 plis, sur les données d'entraînement\nprint(scores)\nprint(\"moyenne :\", scores.mean(), \"±\", scores.std())",
      },
      {
        kind: "text",
        text: "La validation croisée répète l'évaluation sur plusieurs découpages pour un score moyen fiable.",
      },
      {
        kind: "text",
        text: "Pendant le développement : comparer des modèles, régler des hyperparamètres. Le jeu de test final reste intact pour la toute fin.",
      },
      {
        kind: "fields",
        title: "La validation croisée : l'essentiel",
        fields: [          {
            label: "Erreur fréquente",
            value:
              "Faire la validation croisée sur tout le jeu de données y compris le test : le test n'est plus un test. CV sur train, évaluation finale sur test.",
          },
          {
            label: "Bonne pratique",
            value:
              "Regarder l'écart-type autant que la moyenne : des scores qui varient beaucoup signalent un modèle ou des données instables.",
          },
          {
            label: "Concepts liés",
            value: "Séparation train/test, surapprentissage, hyperparamètres.",
          },
        ],
      },
    ],
  },
  {
    id: "surapprentissage-biais-variance",
    title: "Surapprentissage : biais vs variance",
    level: 3,
    intro:
      "Pourquoi un modèle parfait sur l'entraînement peut être nul en pratique.",
    blocks: [
      {
        kind: "text",
        text: "Le surapprentissage (overfitting) survient quand le modèle apprend par cœur les exemples d'entraînement, y compris leur bruit, au lieu d'apprendre la structure générale. Symptôme typique : un score excellent sur l'entraînement et médiocre sur le test. Le dilemme biais-variance l'explique : un modèle trop simple sous-apprend (biais élevé, il rate même l'entraînement), un modèle trop complexe sur-apprend (variance élevée, sensible au moindre changement de données).",
      },
      {
        kind: "diagram",
        title: "Le dilemme biais-variance",
        lines: [
          "erreur │",
          "      │  ╲ biais (sous-apprentissage)",
          "      │   ╲                ╱ variance (surapprentissage)",
          "      │    ╲              ╱",
          "      │     ╲＿＿＿＿＿＿╱",
          "      │      zone optimale",
          "      └──────────────────────────► complexité du modèle",
          "",
          "Trop simple : rate l'entraînement ET le test (biais).",
          "Trop complexe : parfait sur l'entraînement, nul sur le test (variance).",
        ],
      },
      {
        kind: "text",
        text: "Surapprendre = mémoriser les exemples au lieu de comprendre le problème ; ça se voit quand le test décroche de l'entraînement.",
      },
      {
        kind: "fields",
        title: "Le surapprentissage : l'essentiel",
        fields: [          {
            label: "Comment le détecter",
            value:
              "Comparer les scores train et test (ou les courbes de validation) : un écart qui se creuse quand la complexité augmente = surapprentissage.",
          },
          {
            label: "Comment le combattre",
            value:
              "Plus de données, modèle plus simple, régularisation, validation croisée pour choisir la complexité.",
          },
          {
            label: "Exemple simple",
            value:
              "Un polynôme de degré 15 qui passe exactement par 16 points d'entraînement mais oscille follement entre eux : parfait en train, absurde en test.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Augmenter la complexité du modèle parce que le score train est mauvais : si le modèle sous-apprend (biais), oui ; s'il surapprend déjà, c'est l'inverse qu'il faut faire.",
          },
          {
            label: "Bonne pratique",
            value:
              "Toujours tracer les courbes d'apprentissage (score train vs test en fonction de la taille des données) avant de toucher aux hyperparamètres.",
          },
          {
            label: "Concepts liés",
            value: "Régularisation, validation croisée, courbes d'apprentissage.",
          },
        ],
      },
    ],
  },
  {
    id: "regularisation",
    title: "Régularisation",
    level: 3,
    intro: "Pénaliser la complexité pour forcer le modèle à rester simple.",
    blocks: [
      {
        kind: "text",
        text: "La régularisation ajoute au critère d'entraînement une pénalité proportionnelle à la complexité du modèle (typiquement la taille de ses coefficients). Le modèle doit alors arbitrer : coller aux données d'entraînement ou garder des coefficients petits et stables. Les deux variantes classiques sont Ridge (pénalité L2 : réduit les coefficients) et Lasso (pénalité L1 : peut annuler des coefficients, donc sélectionner des variables).",
      },
      {
        kind: "code",
        language: "python",
        title: "Régression régularisée",
        code: "from sklearn.linear_model import Ridge, Lasso\n\nridge = Ridge(alpha=1.0)  # alpha règle la force de la pénalité\nridge.fit(X_train, y_train)\n\nlasso = Lasso(alpha=0.1)\nlasso.fit(X_train, y_train)\nprint(\"variables conservées par Lasso :\", (lasso.coef_ != 0).sum())",
      },
      {
        kind: "text",
        text: "La régularisation pénalise les modèles trop compliqués pour qu'ils généralisent mieux.",
      },
      {
        kind: "fields",
        title: "La régularisation : l'essentiel",
        fields: [          {
            label: "Ridge vs Lasso",
            value:
              "Ridge (L2) répartit l'importance entre variables corrélées ; Lasso (L1) en élimine, ce qui fait aussi de la sélection de variables.",
          },
          {
            label: "Le rôle d'alpha",
            value:
              "`alpha` dose la pénalité : trop faible, le modèle surapprend ; trop fort, il sous-apprend. On le règle par validation croisée.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Régulariser sans standardiser : la pénalité s'applique aux coefficients bruts, donc les variables à grande échelle sont pénalisées différemment.",
          },
          {
            label: "Concepts liés",
            value: "Surapprentissage, mise à l'échelle, hyperparamètres.",
          },
        ],
      },
    ],
  },
  {
    id: "arbres-de-decision",
    title: "Arbres de décision",
    level: 3,
    intro: "Le modèle le plus lisible : une suite de questions oui/non.",
    blocks: [
      {
        kind: "text",
        text: "Un arbre de décision prédit en posant une série de questions binaires sur les variables : « l'âge est-il supérieur à 30 ? », « le revenu dépasse-t-il X ? ». Chaque réponse oriente vers une branche, jusqu'à une feuille qui donne la prédiction. Son atout : on peut le dessiner et l'expliquer à un non-spécialiste. Sa faiblesse : seul, il surapprend facilement en créant un arbre immense qui colle au bruit.",
      },
      {
        kind: "diagram",
        title: "Un arbre de décision (exemple)",
        lines: [
          "           âge > 30 ?",
          "           ／        ＼",
          "        oui           non",
          "        ／              ＼",
          "  revenu > 50k ?     étudiant ?",
          "   ／       ＼        ／      ＼",
          " oui        non    oui       non",
          "  │          │      │         │",
          "classe A  classe B classe A classe B",
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Arbre de décision contrôlé",
        code: "from sklearn.tree import DecisionTreeClassifier\n\narbre = DecisionTreeClassifier(\n    max_depth=5,          # limite la profondeur : anti-surapprentissage\n    min_samples_leaf=10,  # chaque feuille doit contenir au moins 10 exemples\n    random_state=42,\n)\narbre.fit(X_train, y_train)",
      },
      {
        kind: "text",
        text: "Un arbre de décision est un organigramme appris des données : des questions sur les variables mènent à la prédiction.",
      },
      {
        kind: "text",
        text: "Baseline interprétable, données tabulaires avec interactions entre variables, quand l'explicabilité compte.",
      },
      {
        kind: "fields",
        title: "L'arbre de décision : l'essentiel",
        fields: [          {
            label: "Pourquoi c'est utile",
            value:
              "Interprétabilité : on peut montrer exactement pourquoi le modèle a décidé ceci pour ce cas. Précieux en médecine, finance, droit.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Laisser l'arbre pousser sans limite (`max_depth=None` par défaut) : il mémorise l'entraînement et s'effondre sur le test.",
          },
          {
            label: "Bonne pratique",
            value:
              "Limiter `max_depth` et `min_samples_leaf`, puis passer aux forêts aléatoires pour la performance.",
          },
          {
            label: "Concepts liés",
            value: "Forêts aléatoires, surapprentissage, interprétabilité.",
          },
        ],
      },
    ],
  },
  {
    id: "forets-aleatoires",
    title: "Forêts aléatoires",
    level: 3,
    intro:
      "Beaucoup d'arbres valent mieux qu'un : l'ensemble qui réduit la variance.",
    blocks: [
      {
        kind: "text",
        text: "Une forêt aléatoire (Random Forest) entraîne des centaines d'arbres de décision, chacun sur un sous-échantillon différent des données et des variables, puis fait voter les arbres. Chaque arbre surapprend un peu différemment ; le vote moyen annule ces erreurs individuelles. Résultat : un modèle robuste, performant sur données tabulaires, qui demande peu de réglages.",
      },
      {
        kind: "code",
        language: "python",
        title: "Forêt aléatoire et importance des variables",
        code: "from sklearn.ensemble import RandomForestClassifier\nimport pandas as pd\n\nforet = RandomForestClassifier(n_estimators=300, random_state=42, n_jobs=-1)\nforet.fit(X_train, y_train)\n\nimportances = pd.Series(foret.feature_importances_, index=noms_variables)\nprint(importances.sort_values(ascending=False))  # quelles variables comptent ?",
      },
      {
        kind: "text",
        text: "Une forêt aléatoire fait voter des centaines d'arbres diversifiés : la moyenne de leurs erreurs vaut mieux que chaque arbre seul.",
      },
      {
        kind: "text",
        text: "Données tabulaires, baseline robuste, quand on veut de bonnes performances sans réglages fins ni mise à l'échelle.",
      },
      {
        kind: "fields",
        title: "La forêt aléatoire : l'essentiel",
        fields: [          {
            label: "Pourquoi ça marche",
            value:
              "Les arbres sont décorrélés (données et variables tirées au hasard) : leurs erreurs se compensent au lieu de s'additionner.",
          },
          {
            label: "Exemple réel",
            value:
              "Scoring de crédit, prédiction de churn, classement de tickets de support : les forêts sont des chevaux de labour de l'industrie sur données tabulaires.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Interpréter `feature_importances_` comme des causalités : une variable « importante » est corrélée à la cible, pas forcément sa cause.",
          },
          {
            label: "Bonne pratique",
            value:
              "`n_estimators` élevé (300+) ne fait presque jamais surapprendre : le coût est seulement le temps de calcul.",
          },
          {
            label: "Concepts liés",
            value: "Arbres de décision, biais-variance, gradient boosting (notions).",
          },
        ],
      },
    ],
  },
  {
    id: "choisir-un-modele",
    title: "Choisir un modèle : repères",
    level: 3,
    intro:
      "Comparaison factuelle des grandes familles, sans « meilleur » universel.",
    blocks: [
      {
        kind: "table",
        headers: ["Famille", "Points forts", "Points de vigilance"],
        rows: [
          [
            "Modèles linéaires (`LogisticRegression`, `Ridge`)",
            "Rapides, interprétables, bonne baseline",
            "Supposent des relations linéaires ; sensibles à l'échelle",
          ],
          [
            "Arbres / forêts (`RandomForest`)",
            "Robustesse, peu de préparation, variables hétérogènes",
            "Moins interprétables en forêt ; lents à prédire si énormes",
          ],
          [
            "Gradient boosting (`HistGradientBoosting`)",
            "Souvent très performant sur tabulaire",
            "Plus d'hyperparamètres à régler ; sensible au surapprentissage",
          ],
          [
            "KNN (`KNeighborsClassifier`)",
            "Simple, aucun entraînement réel",
            "Prédiction lente sur gros volumes ; exige la mise à l'échelle",
          ],
          [
            "SVM (`SVC`)",
            "Efficace en petite dimension",
            "Coûteux sur gros jeux de données ; échelle obligatoire",
          ],
          [
            "Réseaux de neurones (`MLPClassifier`)",
            "Relations complexes non linéaires",
            "Beaucoup de données et de réglages ; le deep learning dédié va plus loin",
          ],
        ],
      },
      {
        kind: "text",
        text: "Il n'existe pas de modèle universellement meilleur : la performance dépend des données, du volume, du bruit et de la métrique. La démarche professionnelle consiste à établir une baseline simple, puis à comparer 3 à 4 familles en validation croisée sur la même métrique, avec le même découpage. Le « meilleur » est celui qui gagne sur vos données, pas dans un classement général.",
      },
    ],
  },
  {
    id: "pipelines",
    title: "Pipelines scikit-learn",
    level: 3,
    intro:
      "Enchaîner préparation et modèle en un seul objet reproductible.",
    blocks: [
      {
        kind: "text",
        text: "Un `Pipeline` enchaîne les étapes de traitement et le modèle final en un seul objet qui expose `fit`, `predict` et `score`. Conséquence majeure : la préparation (imputation, encodage, mise à l'échelle) est apprise uniquement sur l'entraînement et réappliquée à l'identique en prédiction. C'est l'antidote principal au data leakage et la forme sous laquelle un modèle doit être sauvegardé.",
      },
      {
        kind: "code",
        language: "python",
        title: "Pipeline complet : préparation + modèle",
        code: "from sklearn.compose import ColumnTransformer\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.ensemble import RandomForestClassifier\n\npreparation = ColumnTransformer([\n    (\"num\", Pipeline([\n        (\"imputer\", SimpleImputer(strategy=\"median\")),\n        (\"scaler\", StandardScaler()),\n    ]), variables_numeriques),\n    (\"cat\", Pipeline([\n        (\"imputer\", SimpleImputer(strategy=\"most_frequent\")),\n        (\"onehot\", OneHotEncoder(handle_unknown=\"ignore\")),\n    ]), variables_categorielles),\n])\n\npipeline = Pipeline([\n    (\"preparation\", preparation),\n    (\"modele\", RandomForestClassifier(random_state=42)),\n])\npipeline.fit(X_train, y_train)  # tout est appris sur le train, en une fois",
      },
      {
        kind: "text",
        text: "Un `Pipeline` est un modèle augmenté de sa recette de préparation : un seul objet du CSV brut à la prédiction.",
      },
      {
        kind: "fields",
        title: "Le Pipeline : l'essentiel",
        fields: [          {
            label: "Pourquoi c'est indispensable",
            value:
              "Sans pipeline, on prépare le train et le test à la main et on finit par faire fuiter des informations ou par oublier une étape en production.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Sauvegarder le modèle seul sans sa préparation : en production, impossible de reproduire exactement les transformations.",
          },
          {
            label: "Bonne pratique",
            value:
              "Ne jamais exposer `X_train` transformé à la main : tout passe par `pipeline.fit` / `pipeline.predict`.",
          },
          {
            label: "Concepts liés",
            value: "Data leakage, sauvegarde de modèle, mise en production.",
          },
        ],
      },
    ],
  },
  {
    id: "sauvegarde-modele",
    title: "Sauvegarder un modèle",
    level: 3,
    intro:
      "Persister le pipeline entraîné avec `joblib` pour le réutiliser sans réentraîner.",
    blocks: [
      {
        kind: "text",
        text: "Réentraîner un modèle à chaque utilisation serait absurde : on le sauvegarde une fois entraîné, puis on le recharge pour prédire. `joblib` (la bibliothèque recommandée par scikit-learn pour cet usage) sérialise l'objet Python — idéalement le `Pipeline` complet, préparation incluse — dans un fichier.",
      },
      {
        kind: "code",
        language: "python",
        title: "Sauvegarder et recharger",
        code: "import joblib\n\njoblib.dump(pipeline, \"modele_v1.joblib\")  # sauvegarde : pipeline ENTIER\n\n# ... plus tard, dans un autre script :\nmodele_charge = joblib.load(\"modele_v1.joblib\")\nprint(modele_charge.predict(nouvelles_donnees))",
      },
      {
        kind: "text",
        text: "Sauvegarder = figer le pipeline entraîné dans un fichier rechargeable tel quel.",
      },
      {
        kind: "fields",
        title: "La sauvegarde : l'essentiel",
        fields: [          {
            label: "Pourquoi joblib plutôt que pickle",
            value:
              "`joblib` est optimisé pour les gros tableaux numpy que contiennent les modèles ; `pickle` standard fonctionne aussi mais moins efficacement.",
          },
          {
            label: "Versionner",
            value:
              "Nommer explicitement les versions (`modele_v1.joblib`) et noter les données et paramètres d'entraînement : un fichier seul, sans contexte, est inexploitable.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Charger un modèle entraîné avec une autre version de scikit-learn : la désérialisation peut échouer ou se comporter différemment. Figer les versions dans `requirements.txt`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Ne jamais charger un fichier `joblib`/`pickle` d'origine inconnue : la désérialisation peut exécuter du code arbitraire.",
          },
          {
            label: "Concepts liés",
            value: "`Pipeline`, mise en production, reproductibilité.",
          },
        ],
      },
    ],
  },
  {
    id: "mise-en-production",
    title: "Mise en production : notions",
    level: 3,
    intro: "Exposer le modèle via une API : les principes, sans framework imposé.",
    blocks: [
      {
        kind: "text",
        text: "Mettre un modèle en production, c'est le rendre utilisable par d'autres programmes : typiquement, une API web reçoit des données en JSON, applique le pipeline chargé depuis le fichier, et renvoie la prédiction. Le modèle ne vit plus dans un notebook mais dans un service versionné, testé et surveillé.",
      },
      {
        kind: "diagram",
        title: "Architecture minimale d'un service de prédiction",
        lines: [
          "  client (app, site)",
          "        │  POST /predict  {\"age\": 34, \"salaire\": 42000}",
          "        ▼",
          "  ┌───────────┐   charge une fois   ┌──────────────────┐",
          "  │ API (ex.  │ ◄───────────────── │ modele_v1.joblib │",
          "  │ FastAPI)  │     au démarrage    └──────────────────┘",
          "  └───────────┘",
          "        │  pipeline.predict(donnees)",
          "        ▼",
          "  {\"prediction\": 1, \"probabilite\": 0.87}",
        ],
      },
      {
        kind: "text",
        text: "La production = le pipeline sauvegardé, chargé dans un service qui reçoit des données et renvoie des prédictions.",
      },
      {
        kind: "fields",
        title: "La mise en production : l'essentiel",
        fields: [          {
            label: "Pourquoi une API",
            value:
              "Elle découple le modèle de ses usages : le même service alimente un site, une app mobile ou un batch, et on peut changer de version sans toucher les clients.",
          },
          {
            label: "Ce qui change par rapport au notebook",
            value:
              "Validation des entrées, gestion des erreurs, logs, tests automatisés, versioning du modèle : le prototype devient un logiciel.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Réentraîner « à la main » et écraser le fichier en production sans version : impossible de revenir en arrière quand la nouvelle version se comporte mal.",
          },
          {
            label: "Bonne pratique",
            value:
              "Le service charge le modèle au démarrage (pas à chaque requête) et expose sa version (`/version`) pour tracer quelle version répond.",
          },
          {
            label: "Concepts liés",
            value: "Sauvegarde de modèle, surveillance, FastAPI (notions).",
          },
        ],
      },
    ],
  },
  {
    id: "surveillance-derive",
    title: "Surveillance et dérive",
    level: 3,
    intro:
      "Pourquoi un modèle en production se dégrade avec le temps, et comment le détecter.",
    blocks: [
      {
        kind: "text",
        text: "Un modèle apprend le passé ; le monde change. La dérive (drift) désigne ce décalage progressif : les données en production ne ressemblent plus aux données d'entraînement (nouveaux comportements clients, crise économique, changement de capteur). Sans surveillance, la performance se dégrade silencieusement. On surveille donc la distribution des entrées, le taux de prédictions par classe et, quand c'est possible, la performance sur des cas récents étiquetés.",
      },
      {
        kind: "text",
        text: "La dérive = le monde a changé depuis l'entraînement, et le modèle ne l'a pas suivi.",
      },
      {
        kind: "fields",
        title: "La dérive : l'essentiel",
        fields: [          {
            label: "Exemple simple",
            value:
              "Un modèle de recommandation entraîné avant une pandémie continue de suggérer des voyages d'affaires : les habitudes ont changé, pas le modèle.",
          },
          {
            label: "Signes d'alerte",
            value:
              "Distribution des entrées qui glisse, proportion de prédictions positives qui s'effondre ou explose, retours utilisateurs qui se dégradent.",
          },
          {
            label: "Que faire",
            value:
              "Réentraîner périodiquement sur des données récentes, avec le même pipeline versionné, puis comparer l'ancienne et la nouvelle version avant de basculer.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Déployer et oublier : sans surveillance, on découvre la dégradation par les plaintes, des mois trop tard.",
          },
          {
            label: "Bonne pratique",
            value:
              "Logger les entrées et les prédictions dès le jour un : sans historique, impossible de diagnostiquer une dérive.",
          },
          {
            label: "Concepts liés",
            value: "Mise en production, réentraînement, MLOps (notions).",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-data-leakage",
    title: "Erreur : data leakage",
    level: 3,
    intro:
      "La fuite de données : quand le futur s'invite dans l'entraînement. L'erreur la plus grave.",
    blocks: [
      {
        kind: "text",
        text: "Le data leakage (fuite de données) se produit quand des informations qui ne seraient pas disponibles au moment de la prédiction se glissent dans l'entraînement. Le modèle affiche alors des scores fantastiques… qui s'effondrent en production, car la « triche » n'y existe plus. C'est l'erreur la plus coûteuse parce qu'elle donne une fausse confiance.",
      },
      {
        kind: "code",
        language: "python",
        title: "Fuite classique : standardiser avant de séparer",
        code: "# MAL : le scaler voit le test avant le split\nX_std = StandardScaler().fit_transform(X)  # moyenne calculée sur TOUT, test inclus\nX_train, X_test = train_test_split(X_std)   # trop tard : l'info a fuité\n\n# BIEN : séparer d'abord, puis fit sur le train uniquement\nX_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)\nX_train_std = StandardScaler().fit_transform(X_train)\nX_test_std = StandardScaler().fit(X_train).transform(X_test)  # ou via un Pipeline",
      },
      {
        kind: "text",
        text: "Le leakage = entraîner avec des informations venues du futur ou du jeu de test.",
      },
      {
        kind: "fields",
        title: "Le data leakage : l'essentiel",
        fields: [          {
            label: "Formes courantes",
            value:
              "Préprocessing fitté sur tout le dataset, variable calculée à partir de la cible, lignes de test présentes dans le train (doublons), information post-événement.",
          },
          {
            label: "Exemple réel",
            value:
              "Prédire la résiliation avec une variable « date de clôture du compte » : connue après coup, indisponible au moment où la prédiction aurait été utile.",
          },
          {
            label: "Symptôme",
            value:
              "Un score test « trop beau pour être vrai », très supérieur à ce que la raison suggère : toujours suspecter une fuite avant de célébrer.",
          },
          {
            label: "Bonne pratique",
            value:
              "Le `Pipeline` (fit sur train uniquement) élimine mécaniquement la plupart des fuites de preprocessing.",
          },
          {
            label: "Concepts liés",
            value: "Target leak, séparation train/test, `Pipeline`.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-evaluer-sur-train",
    title: "Erreur : évaluer sur l'entraînement",
    level: 3,
    intro: "Le score sur les données d'apprentissage ne mesure rien d'utile.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Le piège et sa correction",
        code: "# MAL : score sur les données déjà vues -> optimiste et trompeur\nmodele.fit(X_train, y_train)\nprint(modele.score(X_train, y_train))  # le modèle « reconnaît » ses exemples\n\n# BIEN : score sur des données inédites\nprint(modele.score(X_test, y_test))",
      },
      {
        kind: "text",
        text: "Évaluer sur l'entraînement, c'est interroger un élève sur les exercices corrigés en classe.",
      },
      {
        kind: "fields",
        title: "L'erreur : l'essentiel",
        fields: [          {
            label: "Pourquoi c'est tentant",
            value:
              "Le score train est toujours disponible et toujours flatteur. Mais il mesure la mémorisation, pas l'apprentissage.",
          },
          {
            label: "Bonne pratique",
            value:
              "Le score train n'a qu'un usage : comparé au score test, il diagnostique le surapprentissage (écart) ou le sous-apprentissage (les deux bas).",
          },
          {
            label: "Concepts liés",
            value: "Surapprentissage, séparation train/test.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-preprocessing-hors-pipeline",
    title: "Erreur : preprocessing hors pipeline",
    level: 3,
    intro:
      "Transformer les données à la main casse la reproductibilité et invite les fuites.",
    blocks: [
      {
        kind: "text",
        text: "Préparer les données avec des appels `pandas` épars dans le notebook, puis entraîner le modèle sur le résultat, crée deux problèmes : à l'entraînement, on risque d'appliquer des transformations fittées sur le mauvais jeu de données ; en production, on doit réécrire toute la préparation à l'identique — et on oublie forcément une étape.",
      },
      {
        kind: "text",
        text: "La préparation manuelle éparpillée est une recette non écrite : impossible à reproduire fidèlement.",
      },
      {
        kind: "fields",
        title: "L'erreur : l'essentiel",
        fields: [          {
            label: "Symptôme",
            value:
              "Le modèle « marche dans le notebook » mais donne des résultats incohérents dès qu'on l'applique à de nouvelles données.",
          },
          {
            label: "Bonne pratique",
            value:
              "Dès que la préparation fonctionne, la transférer dans un `Pipeline`/`ColumnTransformer` : un seul objet, `fit` sur train, `predict` partout.",
          },
          {
            label: "Concepts liés",
            value: "`Pipeline`, mise en production, data leakage.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-desequilibre-classes",
    title: "Erreur : ignorer le déséquilibre des classes",
    level: 3,
    intro:
      "Quand 99 % des exemples appartiennent à une classe, l'accuracy ment.",
    blocks: [
      {
        kind: "text",
        text: "En détection de fraude, diagnostic rare ou churn, la classe intéressante est minoritaire : parfois 1 % des exemples. Un modèle qui prédit toujours « non » atteint 99 % d'accuracy sans rien détecter. Il faut alors des métriques adaptées (précision, rappel, F1, courbe PR) et souvent des techniques de rééquilibrage.",
      },
      {
        kind: "code",
        language: "python",
        title: "Donner du poids à la classe minoritaire",
        code: "from sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import classification_report\n\n# class_weight=\"balanced\" : les erreurs sur la classe rare coûtent plus cher\nmodele = RandomForestClassifier(class_weight=\"balanced\", random_state=42)\nmodele.fit(X_train, y_train)\nprint(classification_report(y_test, modele.predict(X_test)))",
      },
      {
        kind: "text",
        text: "Sur classes déséquilibrées, l'accuracy récompense le modèle paresseux qui ne prédit que la majorité.",
      },
      {
        kind: "fields",
        title: "L'erreur : l'essentiel",
        fields: [          {
            label: "Que faire",
            value:
              "`class_weight=\"balanced\"`, stratification du split, métriques par classe, et seuil de décision réglé selon le coût des erreurs.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Sur-échantillonner (dupliquer) la classe minoritaire AVANT le split : les mêmes exemples se retrouvent en train et en test — c'est une fuite.",
          },
          {
            label: "Bonne pratique",
            value:
              "Tout rééquilibrage s'applique après le split, uniquement sur l'entraînement (idéalement dans le `Pipeline`).",
          },
          {
            label: "Concepts liés",
            value: "Précision/rappel, data leakage, matrice de confusion.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-target-leak",
    title: "Erreur : target leak",
    level: 3,
    intro:
      "La variable qui contient la réponse : la fuite la plus sournoise.",
    blocks: [
      {
        kind: "text",
        text: "Le target leak est un cas particulier de fuite : une variable d'entrée contient, directement ou indirectement, la réponse à prédire. Exemple : prédire si un colis arrivera en retard avec une variable « nombre de réclamations client » enregistrée après la livraison. Le modèle atteint des scores parfaits en test… et ne sert à rien en production, où cette variable n'existe pas encore au moment de prédire.",
      },
      {
        kind: "text",
        text: "Le target leak = une entrée qui connaît déjà la sortie, parce qu'elle est mesurée après l'événement à prédire.",
      },
      {
        kind: "fields",
        title: "Le target leak : l'essentiel",
        fields: [          {
            label: "Comment le repérer",
            value:
              "Score « trop beau », ou variable avec un pouvoir prédictif écrasant et suspect : se demander pour chacune « sera-t-elle connue au moment de la prédiction ? »",
          },
          {
            label: "Bonne pratique",
            value:
              "Dater chaque variable (moment de sa disponibilité) et exclure tout ce qui est postérieur à l'instant de décision.",
          },
          {
            label: "Concepts liés",
            value: "Data leakage, feature engineering, cadrage du problème.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-reproductibilite",
    title: "Erreur : résultats non reproductibles",
    level: 3,
    intro:
      "Sans graine fixée ni versions figées, impossible de retrouver un résultat.",
    blocks: [
      {
        kind: "text",
        text: "Beaucoup d'étapes du ML sont aléatoires : le découpage train/test, l'initialisation des forêts, l'ordre du brassage. Sans `random_state` fixé, chaque exécution donne des résultats légèrement différents — impossible de savoir si une amélioration vient du modèle ou du hasard. Même problème avec les versions de paquets : un réentraînement six mois plus tard avec des versions différentes peut changer les résultats.",
      },
      {
        kind: "text",
        text: "Un résultat qu'on ne peut pas reproduire n'est pas un résultat, c'est une anecdote.",
      },
      {
        kind: "fields",
        title: "La reproductibilité : l'essentiel",
        fields: [          {
            label: "Les trois fixations",
            value:
              "`random_state` sur tous les objets aléatoires, `requirements.txt` avec versions figées, et journal des données utilisées (quelle version du dataset).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Fixer `random_state` au split mais pas au modèle : la moitié de l'aléatoire reste incontrôlée.",
          },
          {
            label: "Bonne pratique",
            value:
              "Définir une constante `RANDOM_STATE = 42` en tête du projet et l'utiliser partout.",
          },
          {
            label: "Concepts liés",
            value: "Validation croisée, sauvegarde de modèle.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-accuracy-trompeuse",
    title: "Erreur : croire un score isolé",
    level: 3,
    intro: "Un score sans baseline ni intervalle ne veut rien dire.",
    blocks: [
      {
        kind: "text",
        text: "« 87 % d'accuracy » : bien ou pas ? Sans baseline (que donnerait une règle naïve ?), sans comparaison (et la forêt aléatoire ?) et sans variabilité (87 % ± combien en validation croisée ?), ce nombre est décoratif. Pire : optimisé en boucle sur le même jeu de test, il finit par refléter le hasard des découpages plutôt que la qualité du modèle.",
      },
      {
        kind: "text",
        text: "Un score n'a de sens que comparé à une baseline, avec sa variabilité, sur des données non touchées pendant le réglage.",
      },
      {
        kind: "fields",
        title: "L'erreur : l'essentiel",
        fields: [          {
            label: "La baseline minimale",
            value:
              "Prédire la classe majoritaire (classification) ou la moyenne (régression) : tout modèle doit battre ça, sinon il n'apprend rien.",
          },
          {
            label: "Bonne pratique",
            value:
              "Toujours reporter : baseline, score en validation croisée (moyenne ± écart-type), puis score final sur le test — dans cet ordre.",
          },
          {
            label: "Concepts liés",
            value: "Validation croisée, métriques, séparation train/test.",
          },
        ],
      },
    ],
  },
  {
    id: "erreur-trop-de-variables",
    title: "Erreur : trop de variables, pas assez d'exemples",
    level: 3,
    intro:
      "La malédiction de la dimensionnalité : quand les variables noient le signal.",
    blocks: [
      {
        kind: "text",
        text: "Avec 50 variables pour 100 exemples, un modèle flexible trouve toujours des coïncidences : il « apprend » des motifs qui n'existent que dans cet échantillon. C'est la malédiction de la dimensionnalité : plus l'espace est vaste, plus les données y sont clairsemées et plus le surapprentissage guette. Les remèdes : sélectionner les variables pertinentes, réduire la dimension (PCA), régulariser, ou — le mieux — collecter plus d'exemples.",
      },
      {
        kind: "text",
        text: "Trop de variables pour trop peu d'exemples = le modèle apprend le bruit, pas le signal.",
      },
      {
        kind: "fields",
        title: "L'erreur : l'essentiel",
        fields: [          {
            label: "Ordre de grandeur",
            value:
              "Pas de règle absolue, mais avec moins d'une dizaine d'exemples par variable, la prudence s'impose et la validation croisée devient indispensable.",
          },
          {
            label: "Bonne pratique",
            value:
              "Commencer avec peu de variables métier bien choisies, n'en ajouter que si la validation croisée montre un gain réel.",
          },
          {
            label: "Concepts liés",
            value: "Surapprentissage, PCA, régularisation, feature engineering.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro: "La checklist du projet ML propre, de l'idée à la production.",
    blocks: [
      {
        kind: "list",
        items: [
          "Cadrer d'abord : quelle décision le modèle aide-t-il à prendre ? Quelle erreur coûte le plus cher ?",
          "Explorer les données avant tout modèle : distributions, manquants, aberrations (`pandas`, `matplotlib`).",
          "Établir une baseline naïve et la battre : un modèle complexe doit justifier sa complexité.",
          "Séparer train/test dès le début ; ne toucher au test qu'à la fin.",
          "Encapsuler préparation + modèle dans un `Pipeline` : reproductibilité et anti-fuite automatiques.",
          "Comparer les modèles en validation croisée, sur la même métrique métier, avec le même découpage.",
          "Fixer `random_state` partout et figer les versions (`requirements.txt`).",
          "Choisir la métrique selon le coût des erreurs, pas selon l'habitude.",
          "Versionner données, code ET modèle : un `modele_v1.joblib` sans contexte est inutilisable.",
          "Surveiller en production : distributions des entrées, taux de prédictions, retours utilisateurs.",
        ],
      },
      {
        kind: "text",
        text: "Ces pratiques ne sont pas du perfectionnisme : chacune répond à une erreur réelle et fréquente (fuite, non-reproductibilité, métrique inadaptée, dégradation silencieuse). Un projet qui les respecte est déjà au-dessus de la plupart des prototypes.",
      },
    ],
  },
  {
    id: "projet-analyse-exploratoire",
    title: "Projet 1 : analyse exploratoire",
    level: 3,
    intro:
      "Niveau débutant — explorer un jeu de données réel et raconter son histoire.",
    blocks: [
      {
        kind: "text",
        text: "Choisir un jeu de données tabulaire public (ex. : le jeu Titanic, les prix des logements, les vélos en libre-service) et produire un notebook d'analyse exploratoire : chargement, nettoyage documenté, visualisations, et une dizaine d'observations chiffrées mais honnêtes (« les passagers de 1re classe survivent davantage », avec les proportions). Aucun modèle : l'objectif est de prouver qu'on sait regarder des données.",
      },
      {
        kind: "fields",
        title: "Fiche projet",
        fields: [
          {
            label: "Compétences mobilisées",
            value: "`pandas`, `matplotlib`, Jupyter, diagnostic qualité des données.",
          },
          {
            label: "Ce que ça apprend",
            value:
              "Lire un dataset inconnu, formuler des hypothèses, les vérifier par le calcul et le graphique.",
          },
          {
            label: "Difficulté",
            value: "Débutant — 1 à 2 jours.",
          },
          {
            label: "Livrable",
            value:
              "Un notebook « Restart & Run All » propre, avec une conclusion écrite en français clair.",
          },
          {
            label: "Projet suivant",
            value: "Projet 2 : entraîner un premier modèle sur ces mêmes données.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-modele-supervise",
    title: "Projet 2 : premier modèle supervisé",
    level: 3,
    intro:
      "Niveau débutant+ — entraîner, évaluer et comparer deux modèles simples.",
    blocks: [
      {
        kind: "text",
        text: "Sur le dataset du projet 1 (ou Iris pour commencer) : split stratifié, baseline naïve, puis deux modèles (ex. : régression logistique et forêt aléatoire) comparés en validation croisée sur une métrique choisie pour de bonnes raisons. Livrer le rapport de classification et la matrice de confusion, avec un paragraphe d'interprétation : où le modèle se trompe-t-il, et pourquoi c'est plausible.",
      },
      {
        kind: "fields",
        title: "Fiche projet",
        fields: [
          {
            label: "Compétences mobilisées",
            value:
              "`train_test_split`, `fit`/`predict`, métriques, validation croisée, `random_state`.",
          },
          {
            label: "Ce que ça apprend",
            value:
              "Le workflow supervisé complet et la lecture honnête des métriques (pas seulement l'accuracy).",
          },
          {
            label: "Difficulté",
            value: "Débutant+ — 2 à 3 jours.",
          },
          {
            label: "Livrable",
            value:
              "Notebook + un court rapport : métrique choisie et pourquoi, résultats comparés, limites identifiées.",
          },
          {
            label: "Projet suivant",
            value: "Projet 3 : industrialiser avec un pipeline évalué proprement.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-pipeline-evalue",
    title: "Projet 3 : pipeline évalué de bout en bout",
    level: 3,
    intro:
      "Niveau intermédiaire — du CSV brut à un modèle sauvegardé et documenté.",
    blocks: [
      {
        kind: "text",
        text: "Reprendre un problème avec de vraies données imparfaites (manquants, catégories, échelles hétérogènes) et construire un `Pipeline` complet : imputation, encodage, mise à l'échelle, modèle. Comparer 3 familles d'algorithmes en validation croisée, régler un hyperparamètre clé, évaluer une seule fois sur le test, sauvegarder le pipeline avec `joblib`, et documenter données, versions et résultats dans un README. C'est le niveau « prêt pour un stage ».",
      },
      {
        kind: "fields",
        title: "Fiche projet",
        fields: [
          {
            label: "Compétences mobilisées",
            value:
              "`ColumnTransformer`, `Pipeline`, `cross_val_score`, `joblib`, gestion des manquants et catégories.",
          },
          {
            label: "Ce que ça apprend",
            value:
              "L'anti-fuite par construction, la comparaison rigoureuse, la reproductibilité d'un projet.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — 1 semaine.",
          },
          {
            label: "Livrable",
            value:
              "Dépôt avec `requirements.txt`, script d'entraînement, `modele_v1.joblib` et README (données, métrique, résultats, limites).",
          },
          {
            label: "Projet suivant",
            value: "Projet 4 : exposer le modèle via une API.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-mini-service",
    title: "Projet 4 : mini-service de prédiction",
    level: 3,
    intro:
      "Niveau intermédiaire+ — servir le modèle via une API et le surveiller.",
    blocks: [
      {
        kind: "text",
        text: "Charger le pipeline du projet 3 dans une petite API (FastAPI ou Flask) avec deux routes : `/predict` (reçoit du JSON, renvoie prédiction + probabilité) et `/version` (version du modèle). Ajouter la validation des entrées, des tests qui vérifient que l'API répond sur des exemples connus, et un log des prédictions. Bonus : un script qui rejoue le batch de test contre l'API pour vérifier la cohérence avec le notebook.",
      },
      {
        kind: "fields",
        title: "Fiche projet",
        fields: [
          {
            label: "Compétences mobilisées",
            value:
              "API web (notions), chargement de modèle au démarrage, validation d'entrées, tests, logging.",
          },
          {
            label: "Ce que ça apprend",
            value:
              "Le passage du notebook au service : robustesse, versioning, observabilité minimale.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire+ — 1 à 2 semaines.",
          },
          {
            label: "Livrable",
            value:
              "Service lançable en une commande, tests verts, README avec exemples de requêtes.",
          },
          {
            label: "Projet suivant",
            value:
              "Approfondir : deep learning (PyTorch), séries temporelles, ou MLOps (réentraînement automatisé).",
          },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Les références officielles et les cours reconnus pour aller plus loin.",
    blocks: [
      {
        kind: "list",
        items: [
          "`scikit-learn` — documentation officielle : guides utilisateurs, exemples exécutables et référence API. La première source pour tout algorithme du cours.",
          "`pandas` — documentation officielle : le guide « 10 minutes to pandas » et le cookbook pour la manipulation de données.",
          "`numpy` — documentation officielle : les fondamentaux des tableaux numériques.",
          "Jupyter — documentation officielle : notebooks, widgets et bonnes pratiques.",
          "Machine Learning Specialization (Stanford / DeepLearning.AI, sur Coursera) : le cours d'introduction le plus suivi, par Andrew Ng.",
          "Google Machine Learning Crash Course : cours gratuit avec exercices, orienté pratique.",
          "fast.ai — Practical Deep Learning : gratuit, approche « code d'abord », pour la suite vers le deep learning.",
          "« Hands-On Machine Learning » (Aurélien Géron, O'Reilly) : le livre de référence pratique avec scikit-learn et TensorFlow.",
          "Kaggle Learn : micro-cours gratuits et jeux de données pour s'exercer.",
        ],
      },
      {
        kind: "text",
        text: "Seules les documentations officielles sont liées depuis les pages (voir le bouton « Documentation officielle ») ; les cours et livres sont cités par leur nom exact pour être retrouvés sans ambiguïté.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Les prolongements naturels une fois les bases du ML maîtrisées.",
    blocks: [
      {
        kind: "fields",
        title: "Pistes de progression",
        fields: [
          {
            label: "Deep learning",
            value:
              "Réseaux de neurones avec PyTorch ou TensorFlow : indispensable pour l'image, le son et le texte. Le ML « classique » reste toutefois supérieur sur la plupart des données tabulaires.",
          },
          {
            label: "Séries temporelles",
            value:
              "Prévision avec dépendance au temps (ventes, capteurs) : approches spécifiques (décomposition, modèles autorégressifs) car l'hypothèse « exemples indépendants » ne tient plus.",
          },
          {
            label: "NLP (traitement du langage)",
            value:
              "Texte : classification de documents, analyse de sentiment. Aujourd'hui dominé par les modèles de type Transformer.",
          },
          {
            label: "MLOps",
            value:
              "Industrialisation : réentraînement automatisé, suivi d'expériences, déploiement et surveillance des modèles en production.",
          },
          {
            label: "Statistiques",
            value:
              "Tests d'hypothèses, intervalles de confiance, plans d'expérience : pour mesurer rigoureusement l'impact d'un modèle (A/B testing).",
          },
          {
            label: "Prochain pas concret",
            value:
              "Choisir un jeu de données qui vous concerne (sport, budget, jeu vidéo) et mener le projet 3 de bout en bout : c'est ce portfolio qui compte.",
          },
        ],
      },
    ],
  },
];

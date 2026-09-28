import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de pandas : du premier DataFrame aux pipelines de
 * données professionnels. 3 niveaux d'information (Aperçu / Pratique /
 * Approfondi) avec divulgation progressive. Tous les textes supportent le
 * code inline entre backticks.
 */
export const LEARNING_PANDAS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est pandas et pourquoi c'est l'outil quotidien de la donnée.",
    blocks: [
      {
        kind: "text",
        text: "pandas est la bibliothèque Python de manipulation de données tabulaires : elle apporte les DataFrames — des tables avec lignes et colonnes nommées — et des outils pour les nettoyer, transformer, agréger et analyser. Si vos données tiennent dans un tableur, pandas les traite mille fois plus vite et de façon reproductible.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est incontournable : les données réelles sont sales — valeurs manquantes, doublons, formats incohérents, types incorrects. Les nettoyer et les transformer représente l'essentiel du travail avant toute analyse ou modélisation, et pandas est l'outil standard pour ça, construit au-dessus de NumPy. L'apprendre, c'est passer du tableur manuel au pipeline de données fiable.",
      },
    ],
  },
  {
    id: "dataframe-en-un-coup-d-oeil",
    title: "Le DataFrame en un coup d'œil",
    level: 1,
    intro:
      "La structure centrale : une table avec des super-pouvoirs.",
    blocks: [
      {
        kind: "diagram",
        title: "Du fichier à l'analyse",
        lines: [
          "CSV / Excel / Parquet / SQL",
          "            │",
          "            ▼",
          "       DataFrame",
          "   (lignes × colonnes nommées)",
          "            │",
          "   ┌────────┼────────┐",
          "   ▼        ▼        ▼",
          "Nettoyer  Filtrer  Agréger",
          "   └────────┼────────┘",
          "            ▼",
          "   Analyse / visualisation / ML",
        ],
      },
      {
        kind: "text",
        text: "Un DataFrame, c'est une table : des colonnes nommées et typées, un index pour les lignes, et des opérations qui s'appliquent à des millions de lignes en une instruction — filtrer, grouper, joindre, agréger. Tout le reste de cette page détaille ces opérations.",
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
      "Ce qu'il faut maîtriser avant pandas, et pourquoi.",
    blocks: [
      {
        kind: "fields",
        title: "Les fondations nécessaires",
        fields: [
          {
            label: "Python",
            value:
              "Être à l'aise avec les fonctions, les compréhensions de listes et les dictionnaires : pandas s'utilise en Python et ses API les supposent.",
          },
          {
            label: "NumPy (bases)",
            value:
              "Comprendre les tableaux, les shapes et la vectorisation : un DataFrame est un assemblage de colonnes NumPy typées.",
          },
          {
            label: "Notions de tables",
            value:
              "Lignes, colonnes, clés : si vous avez utilisé un tableur ou du SQL, les concepts de pandas vous sembleront familiers.",
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
      "Installer pandas dans un environnement Python propre.",
    blocks: [
      {
        kind: "command",
        label: "Installer pandas",
        command: "pip install pandas",
        why: "Installe pandas et sa dépendance NumPy dans l'environnement actif. Utilisez toujours un environnement virtuel par projet pour isoler les versions.",
        verify: "python -c \"import pandas; print(pandas.__version__)\"",
      },
      {
        kind: "text",
        text: "Pour lire des fichiers Excel, ajoutez `openpyxl` ; pour le Parquet, `pyarrow`. pandas les utilise s'ils sont présents et lève une erreur explicite sinon — installez-les selon vos formats : `pip install pandas openpyxl pyarrow`.",
      },
    ],
  },
  {
    id: "premier-dataframe",
    title: "Premier DataFrame",
    level: 2,
    intro:
      "Charger un CSV et voir à quoi ressemble un DataFrame.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Charger et afficher",
        code: "import pandas as pd\n\ndf = pd.read_csv(\"ventes.csv\")\nprint(df.head())    # 5 premières lignes\nprint(df.shape)     # (lignes, colonnes)\nprint(df.columns)   # noms des colonnes\nprint(df.dtypes)    # type de chaque colonne",
      },
      {
        kind: "text",
        text: "`pd.read_csv` est la porte d'entrée de la plupart des projets : il devine les types, gère les en-têtes et les valeurs manquantes. `head()`, `shape`, `dtypes` : les trois premiers réflexes devant des données inconnues — à quoi ça ressemble, quelle taille, quels types.",
      },
      {
        kind: "code",
        language: "python",
        title: "Créer un DataFrame à la main",
        code: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"produit\": [\"A\", \"B\", \"A\", \"C\"],\n    \"prix\": [10.5, 20.0, 10.5, 15.0],\n    \"quantite\": [3, 1, 2, 5],\n})\nprint(df)",
      },
    ],
  },
  {
    id: "explorer-les-donnees",
    title: "Explorer les données",
    level: 2,
    intro:
      "Les commandes d'exploration : comprendre un dataset en cinq minutes.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Exploration express",
        code: "import pandas as pd\n\ndf = pd.read_csv(\"ventes.csv\")\n\ndf.head()        # aperçu des premières lignes\ndf.tail()        # dernières lignes\ndf.info()        # shape, dtypes, valeurs non-nulles par colonne\ndf.describe()    # statistiques des colonnes numériques\ndf[\"produit\"].value_counts()  # distribution d'une colonne catégorielle\ndf.isna().sum()  # valeurs manquantes par colonne",
      },
      {
        kind: "text",
        text: "`info()` révèle les vrais types et les manquants — souvent la première surprise (une colonne de nombres lue comme du texte à cause d'une valeur aberrante). `describe()` donne moyenne, quartiles et extrêmes : les valeurs impossibles (âge de 250 ans, prix négatif) y sautent aux yeux. `isna().sum()` quantifie le travail de nettoyage à venir.",
      },
    ],
  },
  {
    id: "selection-loc-iloc",
    title: "Sélection : loc et iloc",
    level: 2,
    intro:
      "Accéder aux lignes et colonnes par nom ou par position.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Sélectionner",
        code: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"produit\": [\"A\", \"B\", \"A\", \"C\"],\n    \"prix\": [10.5, 20.0, 10.5, 15.0],\n    \"quantite\": [3, 1, 2, 5],\n})\n\ndf[\"prix\"]              # une colonne -> Series\ndf[[\"produit\", \"prix\"]]  # plusieurs colonnes -> DataFrame\ndf.loc[0]               # ligne d'index 0 (par label)\ndf.iloc[0]              # ligne en position 0\ndf.loc[0:2, \"prix\"]      # lignes 0 à 2, colonne prix (loc inclut la borne !)\ndf.iloc[0:2, 1]         # lignes 0-1, colonne en position 1 (iloc exclut)",
      },
      {
        kind: "text",
        text: "La distinction clé : `loc` travaille avec les labels (noms de colonnes, valeurs d'index) et inclut la borne de fin ; `iloc` travaille avec les positions (0, 1, 2…) et l'exclut. `df[\"prix\"]` retourne une Series (une colonne), `df[[\"prix\"]]` un DataFrame à une colonne — la différence compte pour les opérations suivantes.",
      },
    ],
  },
  {
    id: "filtrage",
    title: "Filtrage",
    level: 2,
    intro:
      "Sélectionner des lignes par condition : le couteau suisse de pandas.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Filtrer par conditions",
        code: "import pandas as pd\n\ndf = pd.read_csv(\"ventes.csv\")\n\n# Une condition :\ncher = df[df[\"prix\"] > 100]\n\n# Plusieurs : & (et), | (ou), avec parenthèses\ncible = df[(df[\"prix\"] > 100) & (df[\"quantite\"] >= 2)]\n\n# Appartenance :\nselection = df[df[\"produit\"].isin([\"A\", \"C\"])]\n\n# Chaînes :\ncontient = df[df[\"client\"].str.contains(\"SARL\", na=False)]",
      },
      {
        kind: "text",
        text: "Comme en NumPy : `&` et `|` (pas `and`/`or`), parenthèses obligatoires autour de chaque condition. `.str` donne accès aux opérations sur les chaînes (contains, startswith, lower…). Le filtrage ne modifie pas le DataFrame d'origine : il retourne une sélection — pensez à l'assigner.",
      },
    ],
  },
  {
    id: "nettoyage-les-bases",
    title: "Nettoyage : les bases",
    level: 2,
    intro:
      "Valeurs manquantes, doublons, types incorrects : le triptyque du nettoyage.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Nettoyer l'essentiel",
        code: "import pandas as pd\n\ndf = pd.read_csv(\"ventes.csv\")\n\n# Doublons :\ndf = df.drop_duplicates()\n\n# Manquants : supprimer ou remplir\ndf_clean = df.dropna(subset=[\"prix\"])          # supprime les lignes sans prix\ndf[\"quantite\"] = df[\"quantite\"].fillna(0)    # 0 quand inconnu\n\n# Types :\ndf[\"date\"] = pd.to_datetime(df[\"date\"])       # texte -> date\ndf[\"prix\"] = pd.to_numeric(df[\"prix\"], errors=\"coerce\")  # force numérique",
      },
      {
        kind: "text",
        text: "Stratégie : `dropna` quand les manquants sont rares et non biaisés, `fillna` avec une valeur sensée (médiane, 0, « inconnu ») sinon — le choix se documente, car il influence les résultats. `pd.to_numeric(errors=\"coerce\")` convertit les valeurs impossibles en `NaN` au lieu de planter : idéal pour repérer les scories dans une colonne sensée être numérique.",
      },
    ],
  },
  {
    id: "groupby-les-bases",
    title: "GroupBy : les bases",
    level: 2,
    intro:
      "« Combien par catégorie ? » : regrouper puis agréger.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Regrouper et agréger",
        code: "import pandas as pd\n\ndf = pd.read_csv(\"ventes.csv\")\n\n# Chiffre d'affaires par produit :\nca = df.groupby(\"produit\")[\"prix\"].sum()\n\n# Plusieurs agrégations :\nstats = df.groupby(\"produit\").agg(\n    ca_total=(\"prix\", \"sum\"),\n    panier_moyen=(\"prix\", \"mean\"),\n    nb_ventes=(\"prix\", \"count\"),\n)\nprint(stats)",
      },
      {
        kind: "text",
        text: "Le motif split-apply-combine : pandas découpe les lignes par groupe, applique l'agrégation à chacun, puis recombine. La syntaxe nommée de `agg` produit directement des colonnes lisibles (`ca_total`, `panier_moyen`) — bien plus propre que des colonnes multi-niveaux à renommer après.",
      },
    ],
  },
  {
    id: "jointures-les-bases",
    title: "Jointures : les bases",
    level: 2,
    intro:
      "Combiner deux tables sur une clé commune avec `merge`.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Joindre deux tables",
        code: "import pandas as pd\n\nventes = pd.DataFrame({\"id_client\": [1, 2, 3], \"montant\": [50, 80, 30]})\nclients = pd.DataFrame({\"id_client\": [1, 2, 4], \"nom\": [\"A\", \"B\", \"D\"]})\n\n# Inner : uniquement les clés présentes des deux côtés\npd.merge(ventes, clients, on=\"id_client\")\n\n# Left : toutes les ventes, infos client quand elles existent\npd.merge(ventes, clients, on=\"id_client\", how=\"left\")\n\n# Empiler des tables de même structure :\npd.concat([ventes_jan, ventes_fev], ignore_index=True)",
      },
      {
        kind: "text",
        text: "`how=\"inner\"` (défaut), `\"left\"`, `\"right\"`, `\"outer\"` : comme en SQL. Avant de joindre, vérifiez l'unicité des clés (`clients[\"id_client\"].is_unique`) — une clé dupliquée multiplie les lignes silencieusement et fausse tous les totaux. `validate=\"many_to_one\"` fait cette vérification pour vous et lève une erreur si elle échoue.",
      },
    ],
  },
  {
    id: "environnement",
    title: "Environnement de travail",
    level: 2,
    intro:
      "Notebooks vs scripts : où travailler avec pandas.",
    blocks: [
      {
        kind: "fields",
        title: "Les options",
        fields: [
          {
            label: "Jupyter",
            value: "L'environnement naturel : exploration interactive, affichage HTML des DataFrames, itération rapide sur le nettoyage.",
          },
          {
            label: "Scripts",
            value: "Pour les pipelines reproductibles : un script qui lit les données brutes et produit les données propres, versionné et testé.",
          },
          {
            label: "Environnement virtuel",
            value: "Un venv par projet avec `pandas` figé dans `requirements.txt` : les comportements par défaut évoluent entre versions.",
          },
        ],
      },
    ],
  },
  {
    id: "editeurs",
    title: "Éditeurs",
    level: 2,
    intro:
      "Le support pandas dans l'éditeur.",
    blocks: [
      {
        kind: "fields",
        title: "Les options",
        fields: [
          {
            label: "VS Code",
            value: "Extensions officielles « Python » et « Jupyter » (Microsoft) : le visualiseur de DataFrame intégré (tri, filtre) est idéal pour inspecter.",
          },
          {
            label: "PyCharm",
            value: "Visualiseur de DataFrame et débogueur scientifique intégrés.",
          },
          {
            label: "JupyterLab",
            value: "Dans le navigateur, sans éditeur : l'option la plus directe pour l'exploration.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-professionnel",
    title: "Workflow professionnel",
    level: 2,
    intro:
      "Du CSV brut au résultat fiable : la discipline du pipeline.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Ne jamais modifier la source",
            detail:
              "Les données brutes sont en lecture seule. Tout nettoyage est du code rejouable, jamais des clics dans un tableur.",
          },
          {
            title: "Explorer avant de transformer",
            detail:
              "`info`, `describe`, `value_counts`, manquants : comprendre avant d'agir. Notez les hypothèses.",
          },
          {
            title: "Nettoyer par étapes vérifiées",
            detail:
              "Après chaque transformation majeure, vérifiez : shape, dtypes, quelques lignes, totaux de contrôle.",
          },
          {
            title: "Documenter les décisions",
            detail:
              "Pourquoi ces lignes supprimées, cette imputation, ce seuil ? Le futur vous (ou votre collègue) devra le savoir.",
          },
          {
            title: "Exporter proprement",
            detail:
              "`to_csv(index=False)`, `to_parquet(index=False)` : sans l'index pandas qui polluerait le fichier.",
          },
        ],
      },
    ],
  },
  {
    id: "premier-projet",
    title: "Projet : nettoyage d'un dataset",
    level: 2,
    intro:
      "Prendre un CSV sale et le rendre exploitable, de bout en bout.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Auditer",
            detail:
              "Chargez le CSV, `info()`, `describe()`, `isna().sum()` : listez tout ce qui cloche (types, manquants, doublons, aberrations).",
          },
          {
            title: "Corriger les types",
            detail:
              "Dates en `datetime`, numériques en numériques (`to_numeric(errors=\"coerce\")`), catégories en `category` si pertinent.",
          },
          {
            title: "Traiter les manquants et doublons",
            detail:
              "`drop_duplicates`, puis stratégie par colonne : suppression ou imputation documentée.",
          },
          {
            title: "Valider",
            detail:
              "Re-passez l'audit : plus de types incorrects, manquants sous contrôle, shapes cohérentes. Exportez en Parquet.",
          },
          {
            title: "Raconter",
            detail:
              "Un court résumé : lignes avant/après, décisions prises, limites restantes. Un dataset nettoyé sans documentation est un dataset suspect.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "series",
    title: "Les Series",
    level: 3,
    intro:
      "La brique de base : une colonne = une Series avec un index.",
    blocks: [
      {
        kind: "text",
        text: "Une Series est un tableau 1D étiqueté : des valeurs plus un index qui les identifie. Chaque colonne d'un DataFrame est une Series. L'index aligne automatiquement les opérations : additionner deux Series aligne sur les labels, pas sur les positions — puissant, mais source de `NaN` surprises quand les index ne correspondent pas.",
      },
      {
        kind: "code",
        language: "python",
        title: "Alignement sur l'index",
        code: "import pandas as pd\n\ns1 = pd.Series([10, 20], index=[\"a\", \"b\"])\ns2 = pd.Series([1, 2], index=[\"b\", \"c\"])\nprint(s1 + s2)\n# a     NaN   <- pas de \"a\" dans s2\n# b    21.0   <- aligné sur le label\n# c     NaN\n# dtype: float64",
      },
    ],
  },
  {
    id: "index",
    title: "L'index",
    level: 3,
    intro:
      "Comprendre l'index : l'étiquette des lignes qui aligne tout.",
    blocks: [
      {
        kind: "text",
        text: "L'index identifie chaque ligne : entier par défaut (`RangeIndex`), mais ça peut être des dates, des chaînes, ou plusieurs niveaux (`MultiIndex`). Il sert à la sélection (`loc`), à l'alignement des opérations et aux jointures. Après des filtrages en chaîne, l'index garde les numéros d'origine — `reset_index(drop=True)` le remet au propre quand l'ordre séquentiel compte.",
      },
      {
        kind: "code",
        language: "python",
        title: "Manipuler l'index",
        code: "import pandas as pd\n\ndf = pd.DataFrame({\"v\": [1, 2, 3]}, index=[\"a\", \"b\", \"c\"])\ndf.loc[\"b\"]                    # sélection par label\n\ndf2 = df.set_index(\"v\")         # une colonne devient l'index\ndf2.reset_index()               # retour à un index entier\n\ndates = pd.date_range(\"2024-01-01\", periods=3)\ndf3 = df.set_index(pd.Index(dates))\ndf3.loc[\"2024-01-02\"]          # sélection temporelle par label",
      },
    ],
  },
  {
    id: "dtypes-avances",
    title: "Dtypes avancés",
    level: 3,
    intro:
      "Au-delà de int/float/str : les types qui évitent les pièges.",
    blocks: [
      {
        kind: "fields",
        title: "Les dtypes à connaître",
        fields: [
          { label: "`Int64` (nullable)", value: "Entier qui accepte les manquants (`pd.NA`) : `int64` classique ne peut pas contenir de `NaN`. Indispensable pour les colonnes d'entiers avec des trous." },
          { label: "`string`", value: "Le dtype texte moderne, avec `pd.NA` plutôt que `None`/`nan` mélangés. Plus cohérent que le vieux `object`." },
          { label: "`boolean`", value: "Booléen nullable : `True`/`False`/`pd.NA`, là où `bool` numpy planterait sur un manquant." },
          { label: "`category`", value: "Pour les colonnes à faible cardinalité (statut, région) : divise la mémoire et accélère les groupby. Détails dans la section dédiée." },
          { label: "`datetime64[ns]`", value: "Dates/heures natives : comparaisons, différences, extraction (année, mois, jour de semaine) sans parsing manuel." },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Convertir proprement",
        code: "import pandas as pd\n\ndf = pd.DataFrame({\"qte\": [1, 2, None], \"date\": [\"2024-01-01\", \"2024-01-02\", None]})\ndf[\"qte\"] = df[\"qte\"].astype(\"Int64\")          # entier nullable\n# df[\"qte\"].astype(\"int64\")  # plantera : NaN incompatible\ndf[\"date\"] = pd.to_datetime(df[\"date\"])       # datetime64[ns]\nprint(df.dtypes)",
      },
    ],
  },
  {
    id: "donnees-manquantes",
    title: "Données manquantes en détail",
    level: 3,
    intro:
      "NaN, None, pd.NA : représenter le manque et choisir sa stratégie.",
    blocks: [
      {
        kind: "text",
        text: "pandas distingue `np.nan` (flottant, historique), `None` (objet Python) et `pd.NA` (le marqueur moderne des dtypes nullables). `isna()` les détecte tous, `notna()` l'inverse. Stratégies : supprimer (`dropna` — avec `thresh` pour exiger un minimum de valeurs), remplir (`fillna` : constante, `ffill`/`bfill` pour propager en séries temporelles, ou `interpolate`), ou modéliser le manque comme une information (une colonne « est_manquant »).",
      },
      {
        kind: "code",
        language: "python",
        title: "Stratégies de traitement",
        code: "import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\"a\": [1, np.nan, 3, np.nan], \"b\": [1, 2, 3, 4]})\n\ndf.dropna()                          # supprime les lignes avec un manquant\ndf[\"a\"].fillna(df[\"a\"].median())    # imputation par la médiane\ndf[\"a\"].ffill()                      # propage la dernière valeur connue\ndf[\"a\"].interpolate()                # interpolation linéaire",
      },
    ],
  },
  {
    id: "doublons",
    title: "Doublons en détail",
    level: 3,
    intro:
      "Détecter, comprendre et traiter les lignes dupliquées.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Gérer les doublons",
        code: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"client\": [\"A\", \"A\", \"B\", \"A\"],\n    \"montant\": [10, 10, 20, 15],\n})\n\ndf.duplicated()                          # True où la ligne est un doublon\ndf.duplicated(subset=[\"client\"])          # doublons sur certaines colonnes\ndf.drop_duplicates(subset=[\"client\"], keep=\"last\")  # garde la dernière occurrence",
      },
      {
        kind: "text",
        text: "Avant de supprimer, comprenez : un doublon exact est souvent une erreur d'ingestion, mais deux lignes identiques peuvent être deux événements réels (deux achats identiques). `keep=\"first\"/\"last\"/False` contrôle quelle occurrence survit. Sur les clés métier (`subset`), les doublons signalent un problème en amont — à remonter, pas juste à effacer.",
      },
    ],
  },
  {
    id: "groupby-avance",
    title: "GroupBy avancé",
    level: 3,
    intro:
      "Agréger par plusieurs clés, filtrer des groupes, transformer.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "GroupBy puissant",
        code: "import pandas as pd\n\ndf = pd.read_csv(\"ventes.csv\")\n\n# Plusieurs clés :\ndf.groupby([\"region\", \"produit\"])[\"montant\"].sum()\n\n# Filtrer des groupes entiers :\ndf.groupby(\"client\").filter(lambda g: g[\"montant\"].sum() > 1000)\n\n# Transformer : même shape que l'original (écart à la moyenne du groupe)\ndf[\"ecart_moyenne\"] = df.groupby(\"produit\")[\"montant\"].transform(\"mean\")\n# ... ou : df[\"montant\"] - df.groupby(\"produit\")[\"montant\"].transform(\"mean\")",
      },
      {
        kind: "text",
        text: "`transform` est sous-utilisé : il retourne une Series alignée sur l'original, parfaite pour « comparer chaque ligne à la statistique de son groupe » sans jointure. `filter` garde ou rejette des groupes entiers selon une condition. Pour les agrégations vraiment sur mesure, `apply` accepte n'importe quelle fonction — au prix de la vitesse.",
      },
    ],
  },
  {
    id: "merge-avance",
    title: "Jointures avancées",
    level: 3,
    intro:
      "Clés multiples, suffixes, validation : joindre sans se tromper.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Merge robuste",
        code: "import pandas as pd\n\n# Clés de noms différents :\n# pd.merge(a, b, left_on=\"id_client\", right_on=\"client_id\")\n\n# Colonnes homonymes : suffixes explicites\npd.merge(a, b, on=\"id\", suffixes=(\"_2023\", \"_2024\"))\n\n# Valider la cardinalité (lève une erreur si violée) :\nmerged = pd.merge(\n    ventes, clients, on=\"id_client\",\n    how=\"left\", validate=\"many_to_one\", indicator=True,\n)\nprint(merged[\"_merge\"].value_counts())  # quelles lignes ont matché ?",
      },
      {
        kind: "text",
        text: "`validate` (`one_to_one`, `one_to_many`, `many_to_one`, `many_to_many`) est le garde-fou qui transforme une explosion silencieuse de lignes en erreur explicite. `indicator=True` ajoute la colonne `_merge` (`both`, `left_only`, `right_only`) : vérifiez toujours combien de lignes ont matché après une jointure critique.",
      },
    ],
  },
  {
    id: "pivot-melt",
    title: "Pivot et melt",
    level: 3,
    intro:
      "Passer du format long au format large — et inversement.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Reshaper",
        code: "import pandas as pd\n\n# Long -> large : une ligne par (année, trimestre)\nlong = pd.DataFrame({\n    \"annee\": [2023, 2023, 2024, 2024],\n    \"trim\": [\"T1\", \"T2\", \"T1\", \"T2\"],\n    \"ca\": [10, 12, 14, 16],\n})\nwide = long.pivot(index=\"annee\", columns=\"trim\", values=\"ca\")\n\n# Large -> long :\nback = wide.reset_index().melt(id_vars=\"annee\", var_name=\"trim\", value_name=\"ca\")\n\n# Avec agrégation (doublons possibles) :\nlong.pivot_table(index=\"annee\", columns=\"trim\", values=\"ca\", aggfunc=\"sum\")",
      },
      {
        kind: "text",
        text: "Le format long (une ligne par observation) est celui de l'analyse ; le format large (une colonne par catégorie) celui des tableaux de bord. `pivot` échoue sur les doublons — `pivot_table` les agrège. `melt` fait le chemin inverse. `crosstab` est le raccourci pour les tables de contingence (fréquences croisées de deux variables catégorielles).",
      },
    ],
  },
  {
    id: "cut-qcut",
    title: "Discrétiser : cut et qcut",
    level: 3,
    intro:
      "Transformer une variable continue en tranches.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Tranches",
        code: "import pandas as pd\n\nages = pd.Series([22, 35, 47, 19, 58, 31])\n\n# Tranches à bornes fixes :\npd.cut(ages, bins=[0, 18, 35, 60, 100], labels=[\"mineur\", \"jeune\", \"adulte\", \"senior\"])\n\n# Tranches à effectifs égaux (quantiles) :\npd.qcut(ages, q=3, labels=[\"bas\", \"moyen\", \"haut\"])\n\n# Pour l'analyse :\ndf.groupby(pd.cut(df[\"age\"], bins=5))[\"montant\"].mean()",
      },
      {
        kind: "text",
        text: "`cut` découpe selon des bornes (intervalles de même largeur), `qcut` selon les quantiles (même nombre d'observations par tranche). Le résultat est une `category` ordonnée — directement utilisable en groupby. Attention aux bornes : documentez-les, elles définissent votre analyse.",
      },
    ],
  },
  {
    id: "series-temporelles",
    title: "Séries temporelles",
    level: 3,
    intro:
      "Le temps comme index : rééchantillonnage et fenêtres glissantes.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Temps",
        code: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"date\": pd.date_range(\"2024-01-01\", periods=100, freq=\"D\"),\n    \"ventes\": range(100),\n}).set_index(\"date\")\n\n# Rééchantillonner : journalier -> mensuel\ndf.resample(\"ME\").sum()\n\n# Moyenne mobile 7 jours :\ndf[\"mm7\"] = df[\"ventes\"].rolling(7).mean()\n\n# Décalage (lag) :\ndf[\"ventes_j-7\"] = df[\"ventes\"].shift(7)\n\n# Sélection par période :\ndf.loc[\"2024-02\"]",
      },
      {
        kind: "text",
        text: "Avec un `DatetimeIndex`, `resample` agrège par période (`ME` = fin de mois, `W`, `QE`…), `rolling` calcule des statistiques glissantes, `shift` décale (les lags, base de toute analyse prédictive). `asfreq` + `reindex` gèrent les trous dans les séries irrégulières. Les fuseaux horaires : travaillez en UTC, convertissez à l'affichage.",
      },
    ],
  },
  {
    id: "chaines-de-caracteres",
    title: "Chaînes de caractères",
    level: 3,
    intro:
      "L'accesseur `.str` : le traitement de texte vectorisé.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Opérations sur les chaînes",
        code: "import pandas as pd\n\ns = pd.Series([\"  Paris \", \"LYON\", \"marseille\", None])\n\ns.str.strip().str.lower()          # normalisation\ns.str.contains(\"paris\", case=False, na=False)\ns.str.split(\" \")                   # découpe -> listes\ns.str.extract(r\"(?P<ville>\\w+)\")    # capture regex nommée\ns.str.replace(r\"\\s+\", \"_\", regex=True)",
      },
      {
        kind: "text",
        text: "`.str` applique les opérations à chaque élément en ignorant proprement les `NaN` (avec `na=` pour les booléens). `extract` avec des groupes nommés transforme du texte semi-structuré en colonnes. Pour du nettoyage lourd (normalisation d'adresses…), vectorisez le maximum avec `.str` avant de recourir à `apply` + fonction Python.",
      },
    ],
  },
  {
    id: "categorical",
    title: "Le dtype categorical",
    level: 3,
    intro:
      "Colonnes à faible cardinalité : mémoire divisée, groupby accélérés.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Catégories",
        code: "import pandas as pd\n\ndf = pd.DataFrame({\"region\": [\"nord\", \"sud\", \"nord\", \"est\"] * 1000})\n\nprint(df[\"region\"].memory_usage(deep=True))  # ~32 Ko en object\ncat = df[\"region\"].astype(\"category\")\nprint(cat.memory_usage(deep=True))             # ~4 Ko : codes entiers + table\n\n# Catégorie ordonnée (niveaux de satisfaction) :\nsat = pd.Categorical([\"moyen\", \"haut\", \"bas\"],\n                     categories=[\"bas\", \"moyen\", \"haut\"], ordered=True)\nprint((sat > \"moyen\").tolist())  # comparaisons qui ont du sens",
      },
      {
        kind: "text",
        text: "En interne : des codes entiers + une table de modalités — d'où le gain mémoire et la vitesse des tris/groupby. Les catégories ordonnées permettent des comparaisons logiques (`> \"moyen\"`) impossibles avec du texte brut. À utiliser dès qu'une colonne texte a peu de valeurs distinctes.",
      },
    ],
  },
  {
    id: "apply-vs-vectorise",
    title: "apply vs vectorisé",
    level: 3,
    intro:
      "Quand `apply` est acceptable — et quand il faut s'en passer.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Trois vitesses",
        code: "import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\"a\": range(100_000), \"b\": range(100_000)})\n\n# 1. Vectorisé (le plus rapide) :\ndf[\"c\"] = df[\"a\"] + df[\"b\"]\n\n# 2. apply sur une Series (boucle Python déguisée) :\ndf[\"d\"] = df[\"a\"].apply(lambda x: x * 2)\n\n# 3. apply sur les lignes (le plus lent, à éviter) :\n# df[\"e\"] = df.apply(lambda row: row[\"a\"] + row[\"b\"], axis=1)  # LENT\n\n# Alternative vectorisée à apply : np.where, np.select\n# df[\"cat\"] = np.where(df[\"a\"] > 50000, \"grand\", \"petit\")",
      },
      {
        kind: "text",
        text: "Hiérarchie de vitesse : opérations vectorisées > `apply` sur Series > `apply(axis=1)` sur lignes (à proscrire sur gros volumes). `np.where` et `np.select` remplacent 90 % des `apply` conditionnels. Réservez `apply` aux fonctions complexes non vectorisables — et mesurez avec `%timeit` avant de conclure.",
      },
    ],
  },
  {
    id: "multi-index",
    title: "MultiIndex",
    level: 3,
    intro:
      "Des index à plusieurs niveaux pour les données hiérarchiques.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Index hiérarchique",
        code: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"region\": [\"nord\", \"nord\", \"sud\", \"sud\"],\n    \"produit\": [\"A\", \"B\", \"A\", \"B\"],\n    \"ca\": [10, 20, 30, 40],\n}).set_index([\"region\", \"produit\"])\n\nprint(df.loc[(\"nord\", \"A\")])  # sélection par tuple\ndf.xs(\"A\", level=\"produit\")     # coupe transversale : tous les A\ndf.unstack(\"produit\")           # pivote un niveau en colonnes",
      },
      {
        kind: "text",
        text: "Le MultiIndex brille après un `groupby` multi-clés ou un `pivot_table` : les données hiérarchiques restent structurées au lieu d'être aplaties. `xs` sélectionne sur un niveau, `unstack` pivote un niveau en colonnes. Si ça devient illisible, `reset_index()` pour revenir à des colonnes simples — la lisibilité prime.",
      },
    ],
  },
  {
    id: "io-avance",
    title: "Lecture/écriture avancée",
    level: 3,
    intro:
      "Lire efficacement : chunks, colonnes, types à la lecture.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Lire gros et propre",
        code: "import pandas as pd\n\n# Ne lire que le nécessaire :\ndf = pd.read_csv(\"gros.csv\", usecols=[\"date\", \"montant\"],\n                 dtype={\"montant\": \"float32\"},\n                 parse_dates=[\"date\"])\n\n# Traiter par morceaux (fichier trop gros pour la RAM) :\nfor chunk in pd.read_csv(\"gros.csv\", chunksize=100_000):\n    process(chunk)  # agréger par chunk, jamais tout en mémoire\n\n# Écrire proprement :\ndf.to_csv(\"out.csv\", index=False)\ndf.to_parquet(\"out.parquet\", index=False)",
      },
      {
        kind: "text",
        text: "`usecols` + `dtype` à la lecture : le moyen le plus simple de diviser par deux la mémoire. `chunksize` traite les fichiers qui dépassent la RAM par morceaux (agrégez par chunk). À l'écriture, `index=False` systématique sauf besoin explicite — un index pandas dans un CSV est un parasite pour le lecteur suivant.",
      },
    ],
  },
  {
    id: "parquet",
    title: "Le format Parquet",
    level: 3,
    intro:
      "Pourquoi le Parquet remplace le CSV dans les pipelines sérieux.",
    blocks: [
      {
        kind: "fields",
        title: "Parquet vs CSV",
        fields: [
          { label: "Stockage colonnaire", value: "Les colonnes sont stockées séparément : lire 2 colonnes sur 50 ne lit que ces 2 colonnes. En CSV, on lit tout." },
          { label: "Types préservés", value: "Dates, catégories, nullables : le schéma voyage avec les données, pas de devinette à la lecture." },
          { label: "Compression", value: "2 à 5 fois plus petit que le CSV équivalent, et plus rapide à lire malgré la décompression." },
          { label: "Limites", value: "Binaire (pas lisible à l'œil), nécessite `pyarrow`. Pour l'échange humain, gardez le CSV ; pour les pipelines, Parquet." },
        ],
      },
    ],
  },
  {
    id: "interop-sql",
    title: "Interopérabilité SQL",
    level: 3,
    intro:
      "pandas et les bases de données : lire et écrire via SQLAlchemy.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Lire/écrire en SQL",
        code: "import pandas as pd\nfrom sqlalchemy import create_engine\n\neng = create_engine(\"sqlite:///ma_base.db\")\n\n# Lire :\ndf = pd.read_sql(\"SELECT * FROM ventes WHERE annee = 2024\", eng)\n\n# Écrire :\ndf.to_sql(\"ventes_clean\", eng, if_exists=\"replace\", index=False)\n# if_exists : fail / replace / append",
      },
      {
        kind: "text",
        text: "Règle de partage : filtrez et agrégez côté base (`WHERE`, `GROUP BY` en SQL) quand les données sont grosses — ne rapatriez en pandas que ce que vous devez manipuler finement. `chunksize` à la lecture et à l'écriture pour les gros volumes. Et méfiez-vous des types : vérifiez les dtypes après `read_sql`, les correspondances ne sont pas toujours parfaites.",
      },
    ],
  },
  {
    id: "visualisation",
    title: "Visualisation rapide",
    level: 3,
    intro:
      "Tracer directement depuis pandas pour explorer.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Plots intégrés",
        code: "import pandas as pd\n\ndf = pd.read_csv(\"ventes.csv\", parse_dates=[\"date\"])\n\ndf.plot(x=\"date\", y=\"montant\")                 # courbe temporelle\ndf[\"produit\"].value_counts().plot(kind=\"bar\")  # barres\ndf[\"montant\"].plot(kind=\"hist\", bins=30)       # histogramme\ndf.plot(kind=\"scatter\", x=\"prix\", y=\"quantite\")  # nuage de points\n\n# Par groupe :\ndf.groupby(\"produit\")[\"montant\"].plot(legend=True)",
      },
      {
        kind: "text",
        text: "`.plot()` (basé sur matplotlib) suffit pour l'exploration : un histogramme révèle une distribution, un scatter une relation, une courbe une tendance. Pour des visualisations de présentation, passez à une bibliothèque dédiée — mais ne sautez jamais l'étape du « regarder les données » avant de modéliser.",
      },
    ],
  },
  {
    id: "method-chaining",
    title: "Chaînage de méthodes",
    level: 3,
    intro:
      "Écrire des pipelines lisibles : une transformation = une chaîne.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Pipeline chaîné",
        code: "import pandas as pd\n\nresult = (\n    pd.read_csv(\"ventes.csv\", parse_dates=[\"date\"])\n    .query(\"montant > 0\")                          # filtre lisible\n    .assign(ca=lambda d: d[\"montant\"] * d[\"quantite\"])  # nouvelle colonne\n    .groupby(\"produit\")\n    .agg(ca_total=(\"ca\", \"sum\"))\n    .sort_values(\"ca_total\", ascending=False)\n    .reset_index()\n)",
      },
      {
        kind: "text",
        text: "`query` (filtre en syntaxe expressive), `assign` (nouvelles colonnes sans `df[\"x\"] = ...` intermédiaire), les parenthèses pour le multi-ligne : le chaînage raconte l'histoire de la transformation de haut en bas. Chaque étape retourne un DataFrame — pas d'état mutable caché, un pipeline facile à relire et à tester par morceaux.",
      },
    ],
  },
  {
    id: "query-eval",
    title: "query et eval",
    level: 3,
    intro:
      "Filtrer et calculer avec des expressions textuelles.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Expressions",
        code: "import pandas as pd\n\ndf = pd.read_csv(\"ventes.csv\")\n\n# Au lieu de df[(df[\"prix\"] > 100) & (df[\"qte\"] >= 2)] :\ndf.query(\"prix > 100 and qte >= 2\")\n\n# Variables externes avec @ :\nseuil = 100\ndf.query(\"prix > @seuil\")\n\n# Calculs :\ndf.eval(\"ca = prix * qte\")",
      },
      {
        kind: "text",
        text: "`query` rend les filtres complexes lisibles (plus de forêts de parenthèses et de `&`). Limites : les noms de colonnes avec espaces ou caractères spéciaux nécessitent des backticks, et les expressions très complexes restent plus claires en syntaxe classique. `eval` calcule des colonnes via le moteur d'expressions — pratique, pas magique.",
      },
    ],
  },
  {
    id: "memoire-et-perf",
    title: "Mémoire et performance",
    level: 3,
    intro:
      "Traiter gros sans exploser la RAM : les leviers concrets.",
    blocks: [
      {
        kind: "fields",
        title: "Les leviers",
        fields: [
          { label: "Dtypes économes", value: "`float32` au lieu de `float64`, `Int32`, `category` pour le texte répété : divise la mémoire par 2 à 10. `df.memory_usage(deep=True)` pour mesurer." },
          { label: "Lire moins", value: "`usecols`, `dtype` et `parse_dates` à la lecture ; `chunksize` au-delà de la RAM." },
          { label: "Éviter les copies", value: "Chaque `df[mask]`, `merge`, `concat` copie : enchaîner 10 opérations sur 5 Go = 50 Go alloués. `inplace=True` ou réassignation raisonnée." },
          { label: "Vectoriser", value: "Pas de `iterrows` (lent), pas d'`apply(axis=1)` sur gros volumes : opérations vectorisées, `np.where`, `groupby`." },
          { label: "Parquet", value: "Lecture colonnaire : on ne charge que les colonnes utiles." },
          { label: "Au-delà", value: "Si ça ne tient toujours pas : Dask/Polars pour le parallélisme, ou traitement en base de données." },
        ],
      },
    ],
  },
  {
    id: "tests-pandas",
    title: "Tester le code pandas",
    level: 3,
    intro:
      "Des tests qui comparent des DataFrames proprement.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Assertions pandas",
        code: "import pandas as pd\nfrom pandas.testing import assert_frame_equal\n\ndef test_nettoyage():\n    df = pd.DataFrame({\"prix\": [10.0, None, 30.0]})\n    result = nettoyer(df)  # votre fonction\n    expected = pd.DataFrame({\"prix\": [10.0, 30.0]}).reset_index(drop=True)\n    assert_frame_equal(result.reset_index(drop=True), expected)\n\n# Vérifications rapides en pipeline :\nassert df[\"id\"].is_unique, \"doublons détectés\"\nassert df[\"montant\"].ge(0).all(), \"montants négatifs !\"\nassert set([\"a\", \"b\"]) <= set(df.columns), \"colonnes manquantes\"",
      },
      {
        kind: "text",
        text: "`assert_frame_equal` compare valeurs, dtypes et index — bien plus strict (et utile) qu'un `==`. En pipeline, des `assert` métier (unicité des clés, plages valides, colonnes attendues) transforment les corruptions silencieuses en erreurs explicites au bon endroit.",
      },
    ],
  },
  {
    id: "datetime-avance",
    title: "Dates et heures avancées",
    level: 3,
    intro:
      "L'accesseur `.dt` : tout extraire d'une colonne temporelle.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Manipuler les dates",
        code: "import pandas as pd\n\ndf = pd.DataFrame({\"date\": pd.to_datetime([\"2024-01-15\", \"2024-02-20\", \"2024-03-10\"])})\n\ndf[\"annee\"] = df[\"date\"].dt.year\ndf[\"mois\"] = df[\"date\"].dt.month\ndf[\"jour_sem\"] = df[\"date\"].dt.day_name()\ndf[\"trimestre\"] = df[\"date\"].dt.quarter\n\n# Différences :\ndf[\"date\"].diff()                    # Timedelta entre lignes\ndf[\"delai_j\"] = (df[\"date\"] - pd.Timestamp(\"2024-01-01\")).dt.days\n\n# Fuseaux :\ndf[\"date_utc\"] = df[\"date\"].dt.tz_localize(\"UTC\")",
      },
      {
        kind: "text",
        text: "`.dt` expose année, mois, jour, heure, jour de semaine, trimestre — la matière première des analyses temporelles (« ventes par jour de semaine »). Les différences donnent des `Timedelta`, convertibles en jours/heures avec `.dt`. Règle : stockez en UTC sans fuseau ambigu, convertissez à l'affichage.",
      },
    ],
  },
  {
    id: "fenetres-glissantes",
    title: "Fenêtres glissantes",
    level: 3,
    intro:
      "Rolling, expanding, ewm : les statistiques mobiles.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Statistiques mobiles",
        code: "import pandas as pd\n\ns = pd.Series(range(10), index=pd.date_range(\"2024-01-01\", periods=10))\n\ns.rolling(3).mean()       # moyenne sur 3 périodes glissantes\ns.expanding().mean()      # moyenne depuis le début (cumulée)\ns.ewm(span=3).mean()      # moyenne exponentielle (récent = plus de poids)\n\n# Fenêtre temporelle (pas nombre de lignes) :\ns.rolling(\"3D\").sum()      # somme sur 3 jours glissants",
      },
      {
        kind: "text",
        text: "`rolling(n)` lisse le bruit à court terme, `expanding` montre la convergence, `ewm` (exponentially weighted) réagit plus vite aux changements récents — standard en finance et en monitoring. Avec un index temporel, les fenêtres peuvent s'exprimer en durée (`\"3D\"`) plutôt qu'en nombre de lignes : indispensable sur des séries irrégulières.",
      },
    ],
  },
  {
    id: "explode",
    title: "Explode",
    level: 3,
    intro:
      "Aplatir les colonnes de listes : une valeur par ligne.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Éclater des listes",
        code: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"commande\": [1, 2],\n    \"articles\": [[\"A\", \"B\"], [\"C\"]],\n})\n\nprint(df.explode(\"articles\"))\n#    commande articles\n# 0         1        A\n# 0         1        B\n# 1         2        C\n\n# Puis analyser normalement :\ndf.explode(\"articles\").groupby(\"articles\").size()",
      },
      {
        kind: "text",
        text: "`explode` transforme chaque élément d'une liste en ligne — le pont entre les données semi-structurées (JSON aplati) et l'analyse tabulaire classique. Notez l'index dupliqué : `reset_index(drop=True)` après, si l'index séquentiel compte.",
      },
    ],
  },
  {
    id: "debugging",
    title: "Debugging",
    level: 3,
    intro:
      "Diagnostiquer un pipeline pandas : la méthode.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Vérifier shape et dtypes",
            detail:
              "`df.shape`, `df.dtypes` après chaque étape : la plupart des bugs sont une colonne au mauvais type ou des lignes perdues/gagnées.",
          },
          {
            title: "Regarder les bords",
            detail:
              "`head()`, `tail()`, mais aussi un échantillon aléatoire (`sample(10)`) : les anomalies se cachent au milieu.",
          },
          {
            title: "Isoler l'étape fautive",
            detail:
              "Exécutez le chaînage étape par étape en affichant les intermédiaires : le bug est à la première étape où le résultat dévie.",
          },
          {
            title: "Traquer les NaN",
            detail:
              "`df.isna().sum()` : d'où viennent-ils ? Une jointure qui ne matche pas, une conversion qui échoue, une division par zéro.",
          },
          {
            title: "Vérifier les jointures",
            detail:
              "`indicator=True` + `value_counts()` sur `_merge` : combien de lignes ont matché ? Un `merge` silencieux qui perd 30 % des lignes est un classique.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les fautes classiques, leurs symptômes et leurs corrections.",
    blocks: [
      {
        kind: "table",
        headers: ["Symptôme", "Cause probable", "Piste"],
        rows: [
          ["`SettingWithCopyWarning`", "Modification d'une sélection qui est peut-être une copie", "Utiliser `.loc` pour assigner, ou `.copy()` explicite"],
          ["Lignes perdues après `merge`", "Jointure `inner` par défaut, clés non matchées", "`how=\"left\"` + `indicator=True` pour diagnostiquer"],
          ["Explosion du nombre de lignes", "Clé dupliquée d'un côté de la jointure", "`validate=\"many_to_one\"`, vérifier `is_unique`"],
          ["Colonne numérique en `object`", "Une valeur texte parasite (ex. « N/A »)", "`pd.to_numeric(errors=\"coerce\")` puis traiter les NaN"],
          ["`KeyError` sur une colonne", "Espace/casse dans le nom, ou colonne multi-niveaux", "`df.columns.tolist()`, `str.strip()` sur les noms"],
          ["Résultats faux sans erreur", "Alignement silencieux sur des index différents", "Vérifier les index avant d'opérer entre Series"],
          ["Lenteur extrême", "`iterrows` ou `apply(axis=1)` sur gros volume", "Vectoriser, `groupby`, `np.where`"],
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro:
      "Les habitudes d'un code pandas propre et fiable.",
    blocks: [
      {
        kind: "list",
        items: [
          "Ne jamais modifier les données sources : tout est du code rejouable.",
          "Vérifier `shape` et `dtypes` après chaque étape importante.",
          "Préférer le vectorisé à `apply`, et `apply` à `iterrows` — dans cet ordre.",
          "Utiliser `.loc` pour les assignations conditionnelles (adieu `SettingWithCopyWarning`).",
          "Valider les jointures (`validate`, `indicator`) au lieu de les supposer.",
          "Typer consciemment : `Int64` nullable, `category`, `datetime64` — pas de `object` par défaut.",
          "Documenter les décisions de nettoyage : seuils, imputations, suppressions.",
          "Écrire des tests avec `pandas.testing` et des assertions métier dans les pipelines.",
        ],
      },
    ],
  },
  {
    id: "projet-eda",
    title: "Projet : EDA complète",
    level: 3,
    intro:
      "Analyse exploratoire d'un dataset réel, de l'ouverture aux insights.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Poser les questions",
            detail:
              "Avant d'ouvrir le fichier : que cherchez-vous ? Une EDA sans questions est une promenade.",
          },
          {
            title: "Auditer et nettoyer",
            detail:
              "Le pipeline de nettoyage complet : types, manquants, doublons, aberrations.",
          },
          {
            title: "Explorer univarié",
            detail:
              "Chaque variable : distribution (`value_counts`, histogrammes), manquants, extrêmes.",
          },
          {
            title: "Explorer bivarié",
            detail:
              "Relations : groupby croisés, corrélations, scatter plots sur les paires suspectes.",
          },
          {
            title: "Raconter",
            detail:
              "5 à 10 insights, chacun avec sa preuve (tableau ou graphique) et ses limites. Une EDA se termine par un récit, pas par 50 graphiques.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-pipeline-nettoyage",
    title: "Projet : pipeline de nettoyage",
    level: 3,
    intro:
      "Industrialiser le nettoyage : un script rejouable et testé.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Écrire les fonctions",
            detail:
              "Une fonction par étape (types, doublons, manquants, aberrations), chacune testable isolément.",
          },
          {
            title: "Chaîner",
            detail:
              "Un `main` qui enchaîne : lecture brute → étapes → Parquet propre. Paramètres (chemins, seuils) en arguments, pas en dur.",
          },
          {
            title: "Ajouter des garde-fous",
            detail:
              "Assertions métier à chaque étape : clés uniques, plages valides, taux de manquants sous seuil.",
          },
          {
            title: "Tester",
            detail:
              "Tests unitaires sur des mini-DataFrames + un jeu de données de test versionné avec le code.",
          },
          {
            title: "Journaliser",
            detail:
              "Rapport d'exécution : lignes avant/après, décisions appliquées, anomalies rencontrées.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-dashboard-temporel",
    title: "Projet : tableau de bord temporel",
    level: 3,
    intro:
      "Des séries brutes aux indicateurs mensuels automatisés.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Ingérer",
            detail:
              "Données journalières multi-sources : normalisez les dates (UTC), les noms de colonnes, les unités.",
          },
          {
            title: "Agréger",
            detail:
              "`resample` mensuel : totaux, moyennes, croissances vs mois précédent (`pct_change`).",
          },
          {
            title: "Lisseries",
            detail:
              "Moyennes mobiles pour séparer tendance et bruit ; signalez les ruptures (écarts à la tendance).",
          },
          {
            title: "Publier",
            detail:
              "Export Parquet + notebook ou script de génération des graphiques. Automatisez l'exécution (cron) avec alertes sur anomalies.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Aller plus loin, en commençant toujours par la documentation officielle.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          { label: "pandas Docs", value: "pandas.pydata.org/docs : guide utilisateur, livre de recettes, référence API complète." },
          { label: "Guide « 10 minutes to pandas »", value: "Le tour d'horizon officiel : le minimum vital en une lecture." },
          { label: "Cookbook", value: "Des recettes par problème concret : la réponse à « comment faire X ? »." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : refaites les mêmes analyses sur plusieurs datasets — les réflexes viennent de la répétition.",
          "Livre : « Python for Data Analysis » (Wes McKinney, créateur de pandas) pour la profondeur.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "pandas maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Devenir data scientist : `data-science` — le parcours complet, de l'EDA au déploiement.",
          "Analyser à l'échelle : `analytics` — l'analyse de données en contexte métier.",
          "Modéliser : `scikit-learn` — machine learning sur vos DataFrames préparés.",
          "Interroger : `sql` — la moitié du travail de données se fait en base.",
          "Revenir à la roadmap : valider pandas et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

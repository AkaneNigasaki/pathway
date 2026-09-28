import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Data Analytics : de l'exploration de données
 * aux dashboards décisionnels, avec Python, pandas et SQL.
 */
export const LEARNING_ANALYTICS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Ce qu'est la data analytics : transformer des données brutes en réponses.",
    blocks: [
      {
        kind: "text",
        text: "La data analytics consiste à examiner des données pour en tirer des conclusions utiles : pourquoi les ventes baissent, quels clients risquent de partir, quelle campagne fonctionne. On y arrive en combinant trois gestes : extraire les données (souvent en SQL), les manipuler (souvent en Python avec pandas) et les visualiser.",
      },
      {
        kind: "text",
        text: "La différence avec la data science : l'analyste répond à des questions avec les données existantes (descriptif et diagnostique) ; le data scientist construit en plus des modèles prédictifs. L'analytics est la porte d'entrée du monde data — et une discipline à part entière.",
      },
      {
        kind: "text",
        text: "Le quotidien : 80 % du temps, c'est préparer les données (les trouver, les nettoyer, les assembler). L'analyse « noble » — graphiques et conclusions — n'est que la partie visible.",
      },
    ],
  },
  {
    id: "metier-analyste",
    title: "Le métier d'analyste",
    level: 1,
    intro:
      "À quoi ressemble concrètement le travail d'un data analyst.",
    blocks: [
      {
        kind: "diagram",
        title: "Le cycle de travail d'un analyste",
        lines: [
          "QUESTION MÉTIER",
          "     │  (« pourquoi le panier moyen baisse-t-il ? »)",
          "     ▼",
          "DONNÉES",
          "     │  (SQL : extraire commandes, clients, produits)",
          "     ▼",
          "NETTOYAGE",
          "     │  (pandas : doublons, valeurs manquantes, formats)",
          "     ▼",
          "ANALYSE",
          "     │  (agrégations, comparaisons, visualisations)",
          "     ▼",
          "RÉCIT",
          "        (graphique + conclusion + recommandation)",
        ],
      },
      {
        kind: "list",
        items: [
          "L'analyste traduit des questions floues (« ça marche ? ») en mesures précises.",
          "Il travaille pour des non-techniciens : la clarté du récit compte autant que l'exactitude du calcul.",
          "Ses livrables : dashboards, rapports, notebooks partagés, présentations.",
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
      "Les fondations avant de manipuler des données pour de vrai.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut savoir",
        fields: [
          {
            label: "Python de base",
            value:
              "Variables, boucles, fonctions, listes et dictionnaires. pandas fait le gros du travail, mais il faut lire et écrire du Python autour.",
          },
          {
            label: "SQL de base",
            value:
              "`SELECT`, `WHERE`, `GROUP BY`, `JOIN` : la majorité des données d'entreprise vivent dans des bases relationnelles.",
          },
          {
            label: "Tableur (Excel / Sheets)",
            value:
              "Lire un tableau, comprendre lignes/colonnes, tris et filtres. Le DataFrame pandas en est la version programmable.",
          },
          {
            label: "Statistiques intuitives",
            value:
              "Moyenne, médiane, pourcentage, ordre de grandeur. Pas de théorie poussée : savoir ce que les nombres racontent.",
          },
        ],
      },
      {
        kind: "text",
        text: "Pas besoin d'être développeur : beaucoup d'analystes viennent du marketing, de la finance ou des opérations. La rigueur avec les données compte plus que le niveau en programmation.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "L'environnement d'analyse standard : Python + pandas + Jupyter.",
    blocks: [
      {
        kind: "command",
        label: "Installer la stack d'analyse",
        command: "pip install pandas numpy matplotlib seaborn jupyterlab",
        why: "Installe les briques de base : `pandas` pour manipuler les tableaux de données, `numpy` pour le calcul numérique, `matplotlib`/`seaborn` pour les graphiques, `jupyterlab` pour l'interface notebook. Ce sont les paquets standard, maintenus par leurs communautés respectives.",
        verify: "python -c \"import pandas; print(pandas.__version__)\"",
      },
      {
        kind: "command",
        label: "Créer un environnement virtuel dédié",
        command: "python -m venv .venv && source .venv/bin/activate",
        why: "Isole les paquets du projet : les versions installées ici n'affectent pas le reste de la machine. Indispensable dès qu'on travaille sur plusieurs projets avec des versions différentes.",
        verify: "pip freeze > requirements.txt",
      },
      {
        kind: "command",
        label: "Enregistrer l'environnement comme noyau Jupyter",
        command: "python -m ipykernel install --user --name analytics",
        why: "Rend l'environnement virtuel sélectionnable dans JupyterLab (« noyau analytics ») : le notebook utilise exactement les paquets du projet, pas ceux du système.",
        verify: "jupyter kernelspec list",
      },
      {
        kind: "text",
        text: "Sur Windows, `source .venv/bin/activate` devient `.venv\\Scripts\\activate`. L'alternative sans installation locale : Google Colab, qui fournit pandas et Jupyter dans le navigateur — pratique pour débuter, limité pour du travail sérieux.",
      },
    ],
  },
  {
    id: "premier-notebook",
    title: "Premier notebook",
    level: 2,
    intro:
      "Ouvrir JupyterLab et exécuter sa première analyse.",
    blocks: [
      {
        kind: "command",
        label: "Lancer JupyterLab",
        command: "jupyter lab",
        why: "Démarre le serveur Jupyter et ouvre l'interface dans le navigateur. Un notebook mélange cellules de code exécutables, résultats affichés et texte explicatif — idéal pour explorer des données pas à pas.",
      },
      {
        kind: "code",
        language: "python",
        title: "Première cellule : charger et regarder",
        code: `import pandas as pd\n\ndf = pd.read_csv("ventes.csv")\ndf.head()          # les 5 premières lignes : à quoi ressemblent les données ?\ndf.info()          # types des colonnes, valeurs manquantes\ndf.describe()      # statistiques : moyenne, min, max, quartiles`,
      },
      {
        kind: "text",
        text: "`head()`, `info()`, `describe()` : le trio d'ouverture de toute analyse. Avant tout calcul, on regarde les données — leur forme, leurs types, leurs trous. La moitié des erreurs d'analyse viennent d'avoir sauté cette étape.",
      },
    ],
  },
  {
    id: "pandas-essentiel",
    title: "pandas : l'essentiel",
    level: 2,
    intro:
      "Le DataFrame : sélectionner, filtrer, trier.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Sélection et filtrage",
        code: `import pandas as pd\n\ndf = pd.read_csv("ventes.csv")\n\n# Sélectionner des colonnes\ndf[["produit", "montant"]]\n\n# Filtrer des lignes : masque booléen\ngros = df[df["montant"] > 100]\n\n# Combiner des conditions (parenthèses obligatoires)\nq1 = df[(df["montant"] > 100) & (df["region"] == "Nord")]\n\n# Trier\ntop = df.sort_values("montant", ascending=False).head(10)`,
      },
      {
        kind: "list",
        items: [
          "Un DataFrame = un tableau : lignes indexées, colonnes nommées et typées.",
          "`df[condition]` filtre les lignes ; `df[[\"a\", \"b\"]]` sélectionne des colonnes.",
          "Les opérateurs logiques s'écrivent `&` (et), `|` (ou), `~` (non) — pas `and`/`or`.",
          "Chaque opération renvoie un nouveau DataFrame : on enchaîne les transformations.",
        ],
      },
    ],
  },
  {
    id: "nettoyage-base",
    title: "Nettoyer les données",
    level: 2,
    intro:
      "Les données réelles sont sales : doublons, trous, formats incohérents.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Les opérations de nettoyage courantes",
        code: `import pandas as pd\n\ndf = pd.read_csv("ventes.csv")\n\ndf.drop_duplicates()                 # supprimer les doublons\n# df = df.drop_duplicates()         # (assigner pour garder le résultat)\n\ndf.isna().sum()                      # compter les valeurs manquantes par colonne\ndf = df.dropna(subset=["montant"])   # supprimer les lignes sans montant\ndf["montant"] = df["montant\"].fillna(0)  # ou remplir par 0\n\ndf["date"] = pd.to_datetime(df["date"])   # convertir en vraies dates\ndf["produit"] = df["produit"].str.strip().str.lower()  # normaliser le texte`,
      },
      {
        kind: "text",
        text: "Règle d'or : ne jamais modifier le fichier source. Le nettoyage s'écrit en code, rejouable à l'identique — si une erreur est découverte, on corrige le script et on relance, au lieu de « réparer » un tableur à la main.",
      },
    ],
  },
  {
    id: "sql-pour-analyste",
    title: "SQL pour l'analyste",
    level: 2,
    intro:
      "Extraire et agréger : les requêtes qui couvrent 90 % des besoins.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Agrégations par groupe",
        code: `SELECT region,\n       COUNT(*) AS nb_commandes,\n       SUM(montant) AS ca_total,\n       AVG(montant) AS panier_moyen\nFROM commandes\nWHERE date >= '2026-01-01'\nGROUP BY region\nORDER BY ca_total DESC;`,
      },
      {
        kind: "code",
        language: "sql",
        title: "Jointure : enrichir les commandes avec les clients",
        code: `SELECT c.nom, c.segment, cmd.montant, cmd.date\nFROM commandes AS cmd\nJOIN clients AS c ON c.id = cmd.client_id\nWHERE cmd.montant > 100;`,
      },
      {
        kind: "list",
        items: [
          "`GROUP BY` + fonctions d'agrégat (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) : le cœur de l'analyse SQL.",
          "Filtrer avant d'agréger avec `WHERE` ; filtrer après avec `HAVING` (ex. `HAVING COUNT(*) > 5`).",
          "`JOIN` relie les tables via leurs clés ; vérifier le type de jointure (`INNER`, `LEFT`) change le résultat.",
        ],
      },
    ],
  },
  {
    id: "agregations",
    title: "Agréger avec pandas",
    level: 2,
    intro:
      "Le `GROUP BY` de pandas : `groupby`, tableaux croisés.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Grouper et agréger",
        code: `import pandas as pd\n\ndf = pd.read_csv("ventes.csv")\n\n# Chiffre d'affaires par région et par mois\nca = (df.assign(mois=df["date"].str[:7])\n        .groupby(["region", "mois"])["montant"]\n        .agg(nb="count", total="sum", panier_moyen="mean")\n        .reset_index())\n\n# Tableau croisé : régions en lignes, segments en colonnes\npd.crosstab(df["region"], df["segment"], values=df["montant"], aggfunc="sum")`,
      },
      {
        kind: "text",
        text: "`.groupby(...).agg(...)` : on découpe les lignes en groupes, on résume chaque groupe. C'est l'opération la plus puissante de l'analyste — « par région », « par mois », « par segment » sont des `groupby` déguisés.",
      },
    ],
  },
  {
    id: "visualisation-base",
    title: "Premiers graphiques",
    level: 2,
    intro:
      "Montrer les données : courbes, barres, histogrammes.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Trois graphiques de base",
        code: `import pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\ndf = pd.read_csv("ventes.csv")\n\n# Évolution du CA dans le temps (courbe)\ndf.groupby("mois")["montant"].sum().plot(kind="line")\nplt.title("CA par mois"); plt.show()\n\n# Comparaison entre régions (barres)\ndf.groupby("region")["montant"].sum().plot(kind="bar")\nplt.title("CA par région"); plt.show()\n\n# Distribution des montants (histogramme)\nsns.histplot(df["montant"], bins=30)\nplt.title("Distribution des montants"); plt.show()`,
      },
      {
        kind: "list",
        items: [
          "Courbe : évolution dans le temps. Barres : comparaison de catégories. Histogramme : distribution d'une variable.",
          "Un graphique = un message : titre explicite, axes étiquetés, pas de 3D ni d'effets.",
          "`plt.show()` affiche ; sans lui, rien ne s'affiche dans un script (en notebook, l'affichage est automatique).",
        ],
      },
    ],
  },
  {
    id: "environnement-virtuel",
    title: "Environnement et reproductibilité",
    level: 2,
    intro:
      "Qu'une analyse tourne à l'identique dans 6 mois, sur une autre machine.",
    blocks: [
      {
        kind: "command",
        label: "Figer les versions des paquets",
        command: "pip freeze > requirements.txt",
        why: "Enregistre les versions exactes installées. Quelqu'un qui clone le projet réinstalle le même environnement avec `pip install -r requirements.txt` et obtient les mêmes résultats — pas de « chez moi ça marche ».",
        verify: "cat requirements.txt",
      },
      {
        kind: "list",
        items: [
          "Un projet = un dossier avec `requirements.txt`, les données (ou un lien vers elles) et les notebooks/scripts.",
          "Ne jamais committer de mots de passe ni de clés : les connexions aux bases vont dans un fichier `.env` ignoré par Git.",
          "Noter la source et la date d'extraction des données en tête du notebook : une analyse sans provenance est invérifiable.",
        ],
      },
    ],
  },
  {
    id: "workflow-analyste",
    title: "Le flux de travail pro",
    level: 2,
    intro:
      "Du notebook d'exploration au livrable propre.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Explorer en notebook",
            detail:
              "Charger, regarder (`head`, `describe`), tester des hypothèses vite. Le notebook est un brouillon : on y essaie, on s'y trompe.",
          },
          {
            title: "Nettoyer les sorties",
            detail:
              "Avant de partager : relancer tout le notebook d'un coup (Restart & Run All) pour vérifier qu'il s'exécute dans l'ordre, sans variable fantôme.",
          },
          {
            title: "Structurer le récit",
            detail:
              "Ajouter des cellules de texte : question, méthode, résultat, limite. Un notebook partagé sans explications est illisible.",
          },
          {
            title: "Extraire le réutilisable",
            detail:
              "Le code qui mérite de vivre (nettoyage, requêtes) migre vers des scripts `.py` versionnés ; le notebook garde l'exploration et les conclusions.",
          },
        ],
      },
    ],
  },
  {
    id: "excel-sheets",
    title: "Excel et Sheets : quand les utiliser",
    level: 2,
    intro:
      "Le tableur n'est pas l'ennemi : il a sa place, à condition de connaître ses limites.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Tableur", "Python/pandas"],
        rows: [
          ["Volume", "Quelques dizaines de milliers de lignes max", "Des millions de lignes sans broncher"],
          ["Reproductibilité", "Clics manuels, difficile à rejouer", "Script rejouable à l'identique"],
          ["Partage", "Idéal : tout le monde sait l'ouvrir", "Notebook ou export nécessaire"],
          ["Exploration rapide", "Très rapide : filtres, tableaux croisés", "Plus verbeux pour un coup d'œil"],
          ["Erreurs", "Formules fragiles, copier-coller risqué", "Tests et code versionné possibles"],
        ],
      },
      {
        kind: "text",
        text: "Règle pratique : explorer et partager vite au tableur ; dès que l'analyse se répète, dépasse 100 000 lignes ou doit être auditée, passer à pandas. Les deux se complètent : `df.to_excel(\"rapport.xlsx\")` exporte proprement vers les collègues.",
      },
    ],
  },
  {
    id: "premiers-projets",
    title: "Premiers projets",
    level: 2,
    intro:
      "Des analyses complètes, de la question au récit.",
    blocks: [
      {
        kind: "list",
        items: [
          "Analyse des ventes e-commerce : charger un CSV de commandes, nettoyer, calculer le CA par mois/catégorie, identifier le top 10 produits, produire 3 graphiques avec conclusions.",
          "Étude de churn : à partir d'un export clients (abonnés, résiliés), comparer les segments, calculer les taux de résiliation par cohorte d'inscription.",
          "Dashboard hebdo : script qui lit les dernières données, génère les KPI de la semaine et exporte un rapport — le même chaque lundi, sans intervention.",
          "Analyse d'enquête : nettoyer les réponses d'un questionnaire (doublons, réponses aberrantes), croiser satisfaction par segment, rédiger une synthèse d'une page.",
        ],
      },
      {
        kind: "text",
        text: "Un bon premier projet tient en un notebook de 30 cellules : question claire en haut, données décrites, 3 à 5 graphiques, conclusions actionnables en bas. La brièveté est une qualité.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "dataframes-avances",
    title: "DataFrames avancés",
    level: 3,
    intro:
      "Fusionner, pivoter, remodeler : assembler des données venues d'ailleurs.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Merge et pivot",
        code: `import pandas as pd\n\ncommandes = pd.read_csv("commandes.csv")\nclients = pd.read_csv("clients.csv")\n\n# Fusion sur clé commune (équivalent SQL JOIN)\ndf = commandes.merge(clients, on="client_id", how="left\")\n\n# Pivot : une ligne par mois, une colonne par région\npivot = df.pivot_table(index="mois", columns="region\",\n                       values="montant", aggfunc="sum\")\n\n# Empiler / dépiler\nlong = pivot.reset_index().melt(id_vars="mois\",\n                               var_name="region", value_name="ca")`,
      },
      {
        kind: "fields",
        title: "Les types de fusion (`how`)",
        fields: [
          {
            label: "`inner`",
            value:
              "Ne garde que les clés présentes des deux côtés. Par défaut — et source de lignes « disparues » quand une clé manque d'un côté.",
          },
          {
            label: "`left`",
            value:
              "Garde toutes les lignes de gauche, `NaN` si pas de correspondance à droite. Le choix sûr pour enrichir sans perdre.",
          },
          {
            label: "`outer`",
            value:
              "Garde tout des deux côtés. Utile pour comparer deux sources (qu'est-ce qui manque où ?).",
          },
        ],
      },
      {
        kind: "text",
        text: "Après chaque `merge`, vérifier : le nombre de lignes a-t-il changé comme prévu ? Un `merge` qui multiplie les lignes signale des clés dupliquées d'un côté — le piège le plus coûteux de l'analyse.",
      },
    ],
  },
  {
    id: "dates-donnees",
    title: "Travailler avec les dates",
    level: 3,
    intro:
      "Les dates sont la dimension la plus analysée — et la plus piégeuse.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Dates avec pandas",
        code: `import pandas as pd\n\ndf = pd.read_csv("ventes.csv", parse_dates=["date\"])\n\n# Extraire des composantes\ndf["mois"] = df["date"].dt.to_period("M\")\ndf["jour_semaine"] = df["date"].dt.day_name()\n\n# Filtrer une période\ndf[df["date"].between("2026-01-01", "2026-03-31\")]\n\n# Rééchantillonner : CA par semaine\n(df.set_index("date")["montant"].resample("W\").sum())`,
      },
      {
        kind: "list",
        items: [
          "`parse_dates` à la lecture : convertir tout de suite, sinon les tris et comparaisons sont alphabétiques — donc faux.",
          "Fuseaux horaires : stocker en UTC, convertir à l'affichage. Mélanger des dates naïves et conscientes lève des erreurs.",
          "Formats ambigus (`01/02/2026`) : préciser `dayfirst=True` si les données sont européennes, et vérifier sur quelques lignes.",
          "Comparaisons mois à mois : aligner les périodes (jours ouvrés, saisonnalité) avant de conclure à une hausse ou une baisse.",
        ],
      },
    ],
  },
  {
    id: "sql-avance-fenetres",
    title: "SQL avancé : fonctions de fenêtrage",
    level: 3,
    intro:
      "Calculer sur des groupes sans écraser les lignes : `OVER`, `ROW_NUMBER`, `LAG`.",
    blocks: [
      {
        kind: "code",
        language: "sql",
        title: "Classement et évolution par partition",
        code: `SELECT region, mois, ca,\n       RANK() OVER (PARTITION BY mois ORDER BY ca DESC) AS rang_region,\n       LAG(ca) OVER (PARTITION BY region ORDER BY mois) AS ca_mois_precedent,\n       ca - LAG(ca) OVER (PARTITION BY region ORDER BY mois) AS evolution\nFROM ca_mensuel;`,
      },
      {
        kind: "fields",
        title: "Les fonctions de fenêtre essentielles",
        fields: [
          {
            label: "`ROW_NUMBER()`",
            value:
              "Numérote les lignes dans chaque partition. Idéal pour dédupliquer : garder la ligne n°1 par (`client_id`, `date`).",
          },
          {
            label: "`RANK()` / `DENSE_RANK()`",
            value:
              "Classement avec gestion des ex-aequo : `RANK` saute les rangs (1, 2, 2, 4), `DENSE_RANK` non (1, 2, 2, 3).",
          },
          {
            label: "`LAG()` / `LEAD()`",
            value:
              "Valeur de la ligne précédente / suivante dans la partition : évolutions mois à mois sans auto-jointure.",
          },
          {
            label: "`SUM() OVER (...)`",
            value:
              "Total cumulé ou par partition, en gardant une ligne par ligne d'origine — là où `GROUP BY` écraserait.",
          },
        ],
      },
      {
        kind: "text",
        text: "`PARTITION BY` découpe en groupes, `ORDER BY` ordonne dans chaque groupe : sans `ORDER BY`, `LAG` et les classements n'ont aucun sens. Les CTE (`WITH ... AS`) rendent ces requêtes lisibles en les découpant en étapes nommées.",
      },
    ],
  },
  {
    id: "jointures-pieges",
    title: "Les pièges des jointures",
    level: 3,
    intro:
      "Une jointure fausse gonfle les chiffres silencieusement : comment s'en prémunir.",
    blocks: [
      {
        kind: "list",
        items: [
          "Clés dupliquées : si la table de droite a 2 lignes pour la même clé, chaque ligne de gauche est dupliquée — les `SUM` explosent. Vérifier l'unicité des clés avant de joindre.",
          "`INNER JOIN` qui fait disparaître des lignes : les commandes sans client correspondant (ou inversement) sont exclues. Si le total change après la jointure, c'est suspect.",
          "Jointures en éventail : joindre deux tables « plusieurs » des deux côtés multiplie les lignes en croix — agréger avant de joindre.",
          "Colonnes homonymes : après un `SELECT *` sur une jointure, deux colonnes `id` coexistent et pandas les renomme en `id_x`/`id_y` — source de confusion.",
        ],
      },
      {
        kind: "code",
        language: "sql",
        title: "Auditer une jointure avant de l'utiliser",
        code: `-- Les clés sont-elles uniques à droite ?\nSELECT client_id, COUNT(*)\nFROM clients\nGROUP BY client_id\nHAVING COUNT(*) > 1;\n\n-- Combien de lignes perdues par un INNER JOIN ?\nSELECT COUNT(*) FROM commandes AS cmd\nLEFT JOIN clients AS c ON c.id = cmd.client_id\nWHERE c.id IS NULL;   -- commandes sans client : 0 attendu`,
      },
    ],
  },
  {
    id: "stats-descriptives",
    title: "Statistiques descriptives",
    level: 3,
    intro:
      "Résumer une distribution sans la trahir : au-delà de la moyenne.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Décrire une variable",
        code: `import pandas as pd\n\ndf = pd.read_csv("ventes.csv")\n\nm = df["montant\"]\nprint(m.mean(), m.median())        # moyenne vs médiane\nprint(m.quantile([0.1, 0.5, 0.9])) # déciles : où se concentrent les valeurs ?\nprint(m.std())                     # écart-type : dispersion\nprint((m > 1000).mean())           # part des gros montants`,
      },
      {
        kind: "fields",
        title: "Les indicateurs et leurs pièges",
        fields: [
          {
            label: "Moyenne",
            value:
              "Sensible aux valeurs extrêmes : un client à 1 M€ fausse le « panier moyen ». Toujours la comparer à la médiane.",
          },
          {
            label: "Médiane",
            value:
              "La valeur du milieu : robuste aux extrêmes. Si moyenne >> médiane, la distribution est tirée par quelques gros.",
          },
          {
            label: "Quantiles",
            value:
              "P10, P50, P90 : montrent où vivent les données. Plus informatifs qu'un seul chiffre résumé.",
          },
          {
            label: "Écart-type",
            value:
              "Dispersion autour de la moyenne. Une moyenne sans dispersion ne dit rien : 50 ± 1 ou 50 ± 40, ce n'est pas la même histoire.",
          },
        ],
      },
    ],
  },
  {
    id: "distributions",
    title: "Lire les distributions",
    level: 3,
    intro:
      "La forme des données : asymétrie, queues, modes.",
    blocks: [
      {
        kind: "diagram",
        title: "Trois formes typiques",
        lines: [
          "Symétrique (rare)        Asymétrique à droite (fréquent)   Bimodale",
          "     █★█                        █★                           █     █",
          "    ██████                     ████                         ███   ███",
          "  ██████████                 ████████                     █████ █████",
          " ▀▀▀▀▀▀▀▀▀▀▀▀              ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀            ▀▀▀▀▀▀▀▀▀▀▀▀▀",
          "moyenne ≈ médiane          moyenne > médiane               deux populations",
          "(tailles, erreurs)        (revenus, montants)              (deux segments mélangés)",
        ],
      },
      {
        kind: "list",
        items: [
          "La plupart des variables business sont asymétriques à droite : beaucoup de petits, quelques énormes. La moyenne ment, la médiane et les quantiles disent vrai.",
          "Une distribution bimodale signale deux populations mélangées : il faut segmenter avant d'analyser, sinon les moyennes sont fictives.",
          "Tracer l'histogramme avant tout résumé chiffré : la forme se voit en une seconde, les chiffres la cachent.",
          "Échelle logarithmique : quand les valeurs s'étalent sur plusieurs ordres de grandeur, le log rend la forme lisible.",
        ],
      },
    ],
  },
  {
    id: "correlation-causalite",
    title: "Corrélation n'est pas causalité",
    level: 3,
    intro:
      "Le slogan le plus important de l'analyse : deux variables liées ne s'expliquent pas forcément.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Matrice de corrélation",
        code: `import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv("ventes.csv\")\ncorr = df[["montant", "age_client", "anciennete\"]].corr()\nsns.heatmap(corr, annot=True, vmin=-1, vmax=1)\nplt.title("Corrélations (pas des causalités)"); plt.show()`,
      },
      {
        kind: "list",
        items: [
          "Corrélation : deux variables bougent ensemble (coefficient entre -1 et 1). Causalité : l'une provoque l'autre. La première n'implique jamais la seconde.",
          "Variable confondante : les ventes de glaces et les noyades sont corrélées — la cause commune est l'été, pas les glaces.",
          "Corrélation nulle ne veut pas dire indépendance : une relation en U (les extrêmes se ressemblent) donne une corrélation proche de 0.",
          "Avant de recommander une action (« augmentons X »), il faut une preuve causale : test A/B, expérience naturelle, ou au moins un mécanisme plausible + des contrôles.",
        ],
      },
    ],
  },
  {
    id: "tests-ab",
    title: "Tests A/B",
    level: 3,
    intro:
      "Comparer deux versions rigoureusement : le standard de la décision produit.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Formuler l'hypothèse",
            detail:
              "« Le nouveau bouton augmente le taux de clic. » Une hypothèse = une métrique principale, définie avant le test. Changer de métrique après coup, c'est tricher.",
          },
          {
            title: "Randomiser",
            detail:
              "Assigner aléatoirement les utilisateurs aux groupes A et B. La randomisation neutralise les biais : les groupes sont comparables sur tout, y compris l'inconnu.",
          },
          {
            title: "Dimensionner",
            detail:
              "Calculer la taille d'échantillon nécessaire à l'avance (selon le taux de base et l'effet minimal détectable). Arrêter le test « quand c'est significatif » invalide le résultat.",
          },
          {
            title: "Laisser tourner",
            detail:
              "Durée fixée à l'avance (au moins un cycle business complet : une semaine, pour capter les effets jour de semaine / week-end).",
          },
          {
            title: "Analyser une fois",
            detail:
              "Comparer les taux avec un test statistique (test z ou t sur les proportions). Regarder les segments après coup, c'est de l'exploration — pas une conclusion.",
          },
        ],
      },
      {
        kind: "text",
        text: "Les erreurs qui tuent un A/B : arrêter au premier signal positif, tester 20 variantes sans correction, ignorer la saisonnalité, ou mesurer un proxy au lieu de la vraie métrique business.",
      },
    ],
  },
  {
    id: "biais-donnees",
    title: "Les biais qui faussent les analyses",
    level: 3,
    intro:
      "Les données mentent quand on les collecte mal : les biais à connaître.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue des biais courants",
        fields: [
          {
            label: "Biais de sélection",
            value:
              "L'échantillon n'est pas représentatif : analyser les avis clients, c'est analyser les mécontents et les ravis — pas le client moyen.",
          },
          {
            label: "Biais de survie",
            value:
              "On n'observe que les survivants : étudier les « recettes du succès » sur des entreprises existantes ignore toutes celles qui ont échoué.",
          },
          {
            label: "Biais de confirmation",
            value:
              "Chercher dans les données ce qui confirme l'intuition du demandeur. Contre-mesure : formuler l'hypothèse contraire et la tester aussi.",
          },
          {
            label: "Effet de nouveauté",
            value:
              "Tout changement attire l'attention au début : mesurer après stabilisation, pas pendant le pic de curiosité.",
          },
          {
            label: "Données manquantes non aléatoires",
            value:
              "Les trous ont un sens : un champ « motif de résiliation » vide signifie souvent « parti sans prévenir » — une information en soi.",
          },
        ],
      },
    ],
  },
  {
    id: "choisir-graphique",
    title: "Choisir le bon graphique",
    level: 3,
    intro:
      "Chaque message a son graphique : le guide de choix.",
    blocks: [
      {
        kind: "table",
        headers: ["Message", "Graphique", "À éviter"],
        rows: [
          ["Évolution dans le temps", "Courbe (line)", "Barres par mois (illisibles au-delà de 12)"],
          ["Comparer des catégories", "Barres horizontales triées", "Camembert au-delà de 4-5 parts"],
          ["Distribution", "Histogramme", "Courbe lissée qui cache les trous"],
          ["Relation entre 2 variables", "Nuage de points (scatter)", "Double axe Y (trompeur)"],
          ["Part d'un tout", "Barres empilées à 100 %", "Camembert 3D"],
          ["Hiérarchie / composition", "Treemap ou barres", "Trop de niveaux imbriqués"],
        ],
      },
      {
        kind: "list",
        items: [
          "Le camembert est presque toujours un mauvais choix : l'œil compare mal les angles. Des barres triées font mieux.",
          "Commencer l'axe Y à zéro pour les barres : sinon les écarts sont visuellement exagérés.",
          "Un graphique, un message : si la légende a besoin d'un paragraphe, découper en deux graphiques.",
        ],
      },
    ],
  },
  {
    id: "dashboards-principes",
    title: "Concevoir des dashboards",
    level: 3,
    intro:
      "Un dashboard sert à décider, pas à exposer des données.",
    blocks: [
      {
        kind: "list",
        items: [
          "Hiérarchie : en haut les 3-5 KPI qui déclenchent l'action, en dessous les détails pour comprendre. L'œil lit en Z : le plus important en haut à gauche.",
          "Un dashboard répond à une question (« la semaine se passe-t-elle bien ? »), pas à toutes les questions possibles.",
          "Contexte : chaque KPI a besoin d'une référence — objectif, période précédente, seuil d'alerte. Un chiffre seul ne veut rien dire.",
          "Fraîcheur affichée : « données au 28/09 08:00 » — un dashboard sans date de mise à jour fait prendre des décisions sur du vieux.",
          "Moins de filtres, plus de sens : un dashboard que personne ne filtre est un dashboard réussi.",
        ],
      },
      {
        kind: "text",
        text: "L'erreur classique : le dashboard-catalogue, 40 graphiques que personne ne regarde. Mieux vaut 5 indicateurs suivis chaque semaine que 50 ignorés. Si un graphique n'a jamais déclenché d'action en 3 mois, le supprimer.",
      },
    ],
  },
  {
    id: "kpi-metriques",
    title: "KPI et métriques",
    level: 3,
    intro:
      "Définir ce qu'on mesure : la moitié du travail d'analyse.",
    blocks: [
      {
        kind: "fields",
        title: "Anatomie d'une bonne métrique",
        fields: [
          {
            label: "Définition exacte",
            value:
              "« Taux de conversion » ne veut rien dire sans : numérateur, dénominateur, période, périmètre. Écrire la formule, pas juste le nom.",
          },
          {
            label: "Actionnable",
            value:
              "Une bonne métrique suggère une action quand elle bouge. « Nombre de visites » ne dit pas quoi faire ; « taux d'abandon au paiement » oui.",
          },
          {
            label: "Résistante au jeu",
            value:
              "Toute métrique optimisée sera manipulée (loi de Goodhart) : « tickets fermés » incite à fermer vite, pas à résoudre.",
          },
          {
            label: "Comparable",
            value:
              "Dans le temps (même définition) et entre segments. Changer la définition casse l'historique : versionner les définitions.",
          },
        ],
      },
      {
        kind: "text",
        text: "North Star Metric : l'unique indicateur qui capture la valeur créée pour le client (ex. « commandes livrées à l'heure »). Tout le reste — métriques d'entrée — explique comment on l'influence.",
      },
    ],
  },
  {
    id: "data-storytelling",
    title: "Data storytelling",
    level: 3,
    intro:
      "Une analyse n'a de valeur que si elle est comprise et suivie d'effet.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Commencer par la conclusion",
            detail:
              "« Le panier moyen baisse de 12 % depuis juin, tiré par le segment mobile. » Le décideur doit comprendre en 30 secondes, détails ensuite.",
          },
          {
            title: "Montrer, pas accumuler",
            detail:
              "3 graphiques qui prouvent valent mieux que 15 qui explorent. Chaque visuel doit faire avancer le récit d'un cran.",
          },
          {
            title: "Ancrer les chiffres",
            detail:
              "« -12 % » ne parle pas ; « -12 %, soit 40 k€ par mois, l'équivalent de notre marge du T2 » oui. Comparer à un repère connu.",
          },
          {
            title: "Dire les limites",
            detail:
              "Périmètre, période, incertitudes, ce que les données ne disent pas. Une analyse honnête sur ses limites est plus crédible, pas moins.",
          },
          {
            title: "Finir par une recommandation",
            detail:
              "« Je recommande X » — l'analyse s'arrête quand la décision est éclairée, pas quand les données sont épuisées.",
          },
        ],
      },
    ],
  },
  {
    id: "nettoyage-avance",
    title: "Nettoyage avancé",
    level: 3,
    intro:
      "Valeurs aberrantes, doublons flous, texte sale : le nettoyage sérieux.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Détecter les valeurs aberrantes (IQR)",
        code: `import pandas as pd\n\ndf = pd.read_csv("ventes.csv\")\nq1, q3 = df["montant\"].quantile([0.25, 0.75])\niqr = q3 - q1\nborne_basse, borne_haute = q1 - 1.5 * iqr, q3 + 1.5 * iqr\naberrants = df[(df["montant\"] < borne_basse) | (df["montant\"] > borne_haute)]\nprint(len(aberrants), "lignes suspectes")`,
      },
      {
        kind: "list",
        items: [
          "Aberrant n'est pas forcément faux : un montant à 1 M€ peut être une vraie grosse commande. On signale, on vérifie, on ne supprime jamais aveuglément.",
          "Doublons flous (« Société X » vs « Societe X ») : normaliser (casse, accents, espaces) avant de dédupliquer.",
          "Texte : `str.strip()`, minuscules, suppression des accents — les jointures sur du texte sale échouent silencieusement.",
          "Tracer le nettoyage : compter les lignes avant/après chaque étape. Une étape qui supprime 30 % des lignes mérite une explication.",
        ],
      },
    ],
  },
  {
    id: "regex-nettoyage",
    title: "Expressions régulières pour le nettoyage",
    level: 3,
    intro:
      "Extraire et normaliser du texte : le couteau suisse du nettoyage.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Nettoyer des téléphones et extraire des motifs",
        code: `import pandas as pd\n\ns = pd.Series(["+261 34 12 345 67", "0341234567", "tel: 034-12-345-67\"])\n\n# Ne garder que les chiffres\npropre = s.str.replace(r"\\D", "", regex=True)\n\n# Extraire un code postal en début de chaîne\ndf = pd.DataFrame({"adresse": ["101 Antananarivo", "BP 200 Toamasina\"]})\ndf["cp"] = df["adresse"].str.extract(r"^(\\d{3})\")`,
      },
      {
        kind: "list",
        items: [
          "`\\D` = tout ce qui n'est pas un chiffre, `\\d{3}` = exactement 3 chiffres, `^` = début de chaîne.",
          "Toujours tester une regex sur un échantillon avant de l'appliquer à tout : `s.head(20).str.extract(...)`.",
          "En pandas, `str.replace` avec `regex=True` applique le motif à chaque valeur — vectorisé, donc rapide.",
          "Règle : une regex doit rester lisible. Au-delà de 2-3 motifs imbriqués, découper en étapes nommées.",
        ],
      },
    ],
  },
  {
    id: "ingestion-api",
    title: "Récupérer des données via API",
    level: 3,
    intro:
      "Les données ne sont pas toujours en CSV : les lire depuis une API.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Appeler une API et paginer",
        code: `import requests\nimport pandas as pd\n\nurl = "https://api.exemple.com/commandes\"\nresultats = []\npage = 1\nwhile True:\n    r = requests.get(url, params={"page\": page}, timeout=30)\n    r.raise_for_status()          # échoue vite si erreur HTTP\n    lot = r.json()["data\"]\n    if not lot:\n        break                     # plus de pages : on s'arrête\n    resultats.extend(lot)\n    page += 1\n\ndf = pd.DataFrame(resultats)`,
      },
      {
        kind: "list",
        items: [
          "`raise_for_status()` : ne jamais traiter silencieusement une réponse en erreur.",
          "Pagination : la plupart des API renvoient les données par pages — boucler jusqu'à la page vide.",
          "`timeout` : toujours en mettre un, sinon un appel bloqué fige le script indéfiniment.",
          "Limites de débit (rate limits) : lire les en-têtes de réponse, espacer les appels, mettre en cache les résultats.",
        ],
      },
    ],
  },
  {
    id: "automatiser-rapport",
    title: "Automatiser un rapport",
    level: 3,
    intro:
      "Le rapport qui se régénère tout seul : script + planification.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Écrire le rapport comme un script",
            detail:
              "Un fichier `rapport_hebdo.py` qui lit les données, calcule les KPI et exporte (Excel, HTML, images). Aucune étape manuelle : tout est en code.",
          },
          {
            title: "Le rendre paramétrable",
            detail:
              "La période en argument (`--semaine 2026-W39`), pas en dur dans le code. Le même script tourne chaque semaine sans modification.",
          },
          {
            title: "Planifier l'exécution",
            detail:
              "Tâche planifiée du système (cron sur Linux, planificateur sur Windows) qui lance le script chaque lundi à 7h. Les logs sont écrits dans un fichier.",
          },
          {
            title: "Alerter sur les anomalies",
            detail:
              "Le script vérifie la fraîcheur et la plausibilité des données (lignes > 0, totaux dans une fourchette) et envoie une alerte si quelque chose cloche — plutôt qu'un rapport faux.",
          },
        ],
      },
      {
        kind: "text",
        text: "Un rapport automatisé sans contrôles est un générateur de chiffres faux à grande vitesse. Les garde-fous (données présentes ? plausibles ? à jour ?) sont aussi importants que les calculs.",
      },
    ],
  },
  {
    id: "qualite-donnees",
    title: "Qualité des données",
    level: 3,
    intro:
      "Tester les données comme on teste le code : contrats et contrôles.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Contrôles de qualité en tête de pipeline",
        code: `import pandas as pd\n\ndf = pd.read_csv("ventes.csv\")\n\n# Contrats : ce qui doit toujours être vrai\nassert not df.empty, "fichier vide\"\nassert df["client_id\"].is_unique, "doublons de client_id\"\nassert df["montant\"].ge(0).all(), "montants négatifs\"\nassert df["date\"].notna().all(), "dates manquantes\"\n\n# Fraîcheur : les données sont-elles à jour ?\nmax_date = pd.to_datetime(df["date\"]).max()\nassert (pd.Timestamp.now() - max_date).days < 2, "données périmées\"`,
      },
      {
        kind: "text",
        text: "Chaque assertion documente une hypothèse sur les données. Quand une source change de format ou qu'un export échoue partiellement, c'est l'assertion qui hurle — pas le décideur qui lit un chiffre faux.",
      },
    ],
  },
  {
    id: "debugging-pandas",
    title: "Déboguer pandas",
    level: 3,
    intro:
      "Les erreurs pandas les plus fréquentes et comment les lire.",
    blocks: [
      {
        kind: "fields",
        title: "Erreurs classiques",
        fields: [
          {
            label: "`SettingWithCopyWarning`",
            value:
              "On modifie une tranche qui est peut-être une copie : `df[df['a'] > 1]['b'] = 0`. Solution : utiliser `.loc` — `df.loc[df['a'] > 1, 'b'] = 0` — ou `.copy()` explicite.",
          },
          {
            label: "`KeyError` sur une colonne",
            value:
              "Faute de frappe, espace invisible (`'montant '`), ou colonne renommée par un merge (`_x`/`_y`). Afficher `df.columns` pour voir les vrais noms.",
          },
          {
            label: "Résultat vide inattendu",
            value:
              "Un filtre trop strict, des types incompatibles (comparer une chaîne à un nombre), ou des `NaN` qui rendent toute comparaison fausse.",
          },
          {
            label: "`merge` qui explose les lignes",
            value:
              "Clés dupliquées d'un côté. Vérifier l'unicité avant : `df['cle'].is_unique`, et comparer les comptages avant/après.",
          },
          {
            label: "Dates triées « alphabétiquement »",
            value:
              "La colonne est restée en texte : `pd.to_datetime` n'a pas été appliqué (ou a échoué silencieusement avec `errors='coerce'`).",
          },
        ],
      },
      {
        kind: "text",
        text: "Méthode : inspecter à chaque étape (`shape`, `head`, `dtypes`). Un pipeline pandas se débogue en vérifiant ce qui entre et ce qui sort de chaque transformation — pas en relisant le code dans sa tête.",
      },
    ],
  },
  {
    id: "performance-pandas",
    title: "Performance pandas",
    level: 3,
    intro:
      "Quand les données grossissent : vectoriser au lieu de boucler.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Boucle vs vectorisation",
        code: `import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv("ventes.csv\")\n\n# À éviter : boucle Python sur les lignes (lent)\n# for i, row in df.iterrows():\n#     df.loc[i, "tva"] = row["montant\"] * 0.2\n\n# Vectorisé : l'opération s'applique à toute la colonne (rapide)\ndf["tva"] = df["montant\"] * 0.2\n\n# Conditions vectorisées\nimport numpy as np\ndf["segment"] = np.where(df["montant\"] > 500, "gros\", \"standard\")`,
      },
      {
        kind: "list",
        items: [
          "Règle n°1 : jamais de boucle Python sur les lignes d'un gros DataFrame — les opérations vectorisées sont 10 à 100 fois plus rapides.",
          "`iterrows` est lent ; si une boucle est inévitable, `itertuples` est plus rapide, et `apply` reste une boucle déguisée.",
          "Types économes : convertir les colonnes catégorielles en `category`, les entiers en `int32` si suffisant — la mémoire divisée par 2 ou 4.",
          "Lire seulement le nécessaire : `usecols=[...]` à la lecture du CSV évite de charger 50 colonnes pour en utiliser 5.",
        ],
      },
    ],
  },
  {
    id: "reproductibilite",
    title: "Reproductibilité",
    level: 3,
    intro:
      "Qu'une analyse donne le même résultat à chaque exécution.",
    blocks: [
      {
        kind: "list",
        items: [
          "Aléatoire maîtrisé : fixer la graine (`random_state=42` dans scikit-learn, `np.random.seed(42)`) pour tout échantillonnage ou split.",
          "Versions figées : `requirements.txt` avec versions exactes — pandas 2.x et 3.x ne se comportent pas toujours pareil.",
          "Données versionnées : noter la source, la date d'extraction et, si possible, un hash du fichier — « le CSV de mardi » n'est pas une référence.",
          "Notebook rejouable : « Restart & Run All » doit produire le même résultat sans intervention — pas de cellule exécutée « à la main » dans le désordre.",
          "Séparer paramètres et code : dates, seuils et chemins en variables en tête du notebook, pas dispersés dans les cellules.",
        ],
      },
    ],
  },
  {
    id: "git-analyste",
    title: "Git pour l'analyste",
    level: 3,
    intro:
      "Versionner analyses et notebooks sans se noyer.",
    blocks: [
      {
        kind: "command",
        label: "Voir ce qui a changé",
        command: "git status",
        why: "Affiche les fichiers modifiés avant de les enregistrer. Avec les notebooks, vérifier qu'on ne committe pas des sorties énormes ou des données sensibles.",
        verify: "git diff --stat",
      },
      {
        kind: "list",
        items: [
          "Ne jamais committer les données brutes volumineuses ni les fichiers `.env` : un `.gitignore` avec `*.csv`, `*.xlsx`, `.env` dès le premier commit.",
          "Nettoyer les sorties des notebooks avant de committer : les graphiques encodés en base64 gonflent le dépôt.",
          "Un commit = une analyse ou une étape : « analyse churn v1 » plutôt que « divers ».",
          "Les notebooks versionnés se relisent mal en diff : pour du code réutilisable, préférer des scripts `.py`.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les fautes d'analyse qui reviennent sans cesse — et comment les éviter.",
    blocks: [
      {
        kind: "list",
        items: [
          "Moyenner des moyennes : la moyenne des paniers moyens par région n'est pas le panier moyen global (il faut pondérer par les volumes).",
          "Double comptage après jointure : un `SUM` sur une table dont les lignes ont été dupliquées par le `JOIN` — agréger avant de joindre.",
          "Comparer des périodes non comparables : un mois de 28 jours contre un mois de 31, ou une période promo contre une période normale.",
          "Confondre corrélation et causalité : « les gros clients achètent le produit X » ne veut pas dire que X rend les clients gros.",
          "Survivor bias : analyser les clients actuels pour comprendre le churn, en oubliant ceux qui sont déjà partis.",
          "Axe Y non-zéro sur des barres : exagère visuellement des écarts minimes.",
          "Tirer des conclusions d'un échantillon minuscule : 3 réponses à une enquête ne font pas une tendance.",
          "Ignorer les valeurs manquantes : `mean()` ignore les `NaN` — si 40 % des montants manquent, la moyenne ne représente plus rien.",
        ],
      },
    ],
  },
  {
    id: "outils-bi",
    title: "Outils BI : panorama",
    level: 3,
    intro:
      "Quand sortir de pandas : les plateformes de business intelligence.",
    blocks: [
      {
        kind: "text",
        text: "Les outils BI (Tableau, Power BI, Looker, Metabase en open source) permettent de construire des dashboards interactifs sans coder, directement sur l'entrepôt de données. Ils excellent pour le reporting récurrent partagé à toute l'entreprise.",
      },
      {
        kind: "table",
        headers: ["", "pandas / notebooks", "Outil BI"],
        rows: [
          ["Exploration ad hoc", "Idéal : liberté totale", "Rigide : limité aux modèles préparés"],
          ["Dashboard partagé", "À construire soi-même", "Natif : partage, droits, actualisation"],
          ["Compétence requise", "Python + SQL", "Clics + un peu de SQL"],
          ["Coût", "Gratuit", "Licences souvent coûteuses (sauf Metabase)"],
          ["Auditabilité", "Code versionné", "Clics non versionnés"],
        ],
      },
      {
        kind: "text",
        text: "En pratique, les deux cohabitent : pandas pour l'exploration et les analyses complexes, l'outil BI pour les dashboards que le métier consulte chaque jour. L'analyste qui maîtrise les deux est autonome des deux côtés.",
      },
    ],
  },
  {
    id: "projets-avances",
    title: "Projets avancés",
    level: 3,
    intro:
      "Des projets qui ressemblent à du vrai travail d'analyste.",
    blocks: [
      {
        kind: "list",
        items: [
          "Étude de cohorte complète : taux de rétention par mois d'inscription, heatmap des cohortes, identification du point de décrochage — le classique du produit.",
          "Attribution marketing : assembler dépenses par canal et conversions, calculer le CAC par canal, comparer l'attribution « dernier clic » vs « premier clic ».",
          "Détection d'anomalies : surveiller un KPI quotidien, alerter quand il sort de sa bande normale (moyenne mobile ± écart-type) — premier pas vers le monitoring.",
          "Analyse de panier : règles d'association simples (produits achetés ensemble) avec des comptages conditionnels — le « les clients qui ont acheté X ont aussi acheté Y ».",
          "Rapport automatisé de A à Z : script planifié qui extrait, contrôle, calcule et envoie le récap hebdo par e-mail — sans intervention humaine.",
          "Dictionnaire de données : documenter toutes les métriques d'un projet (définition, formule, source, propriétaire) — le livrable le plus sous-estimé.",
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
          "Documentation pandas — le guide « 10 minutes to pandas » et le cookbook : la première source pour toute manipulation.",
          "Documentation SQL de PostgreSQL : la référence la plus complète sur les fonctions de fenêtrage et les CTE.",
          "« Storytelling with Data » (Cole Nussbaumer Knaflic) : le livre de référence sur la visualisation et la présentation.",
          "« Naked Statistics » (Charles Wheelan) : les statistiques expliquées sans équations intimidantes.",
          "Kaggle Learn : micro-cours gratuits (pandas, visualisation, SQL) avec exercices dans le navigateur.",
          "Mode SQL Tutorial : un tutoriel SQL progressif orienté analyste, avec exercices.",
        ],
      },
      {
        kind: "text",
        text: "Les documentations officielles sont liées depuis les pages via le bouton « Documentation officielle » ; cours et livres sont cités par leur nom exact pour être retrouvés sans ambiguïté.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "L'analytics maîtrisée, voici les prolongements naturels.",
    blocks: [
      {
        kind: "fields",
        title: "Pistes de progression",
        fields: [
          {
            label: "`data-science`",
            value:
              "Le prolongement direct : modélisation prédictive avec scikit-learn, feature engineering, évaluation de modèles — l'analytics plus les prédictions.",
          },
          {
            label: "`statistics`",
            value:
              "Tests d'hypothèses, intervalles de confiance, régressions : pour que les conclusions tiennent statistiquement, pas juste visuellement.",
          },
          {
            label: "`sql`",
            value:
              "Aller plus loin : optimisation de requêtes, modélisation, procédures stockées — l'analyste senior vit dans la base.",
          },
          {
            label: "`data-engineering`",
            value:
              "Comprendre les pipelines qui alimentent vos analyses : ETL, orchestration, qualité — pour ne plus dépendre des autres pour vos données.",
          },
          {
            label: "`machine-learning`",
            value:
              "Quand les règles manuelles ne suffisent plus : prédire le churn, scorer les leads, segmenter automatiquement.",
          },
          {
            label: "Prochain pas concret",
            value:
              "Publier une analyse complète sur un dataset public (Kaggle) : question, notebook propre, récit — c'est le portfolio de l'analyste.",
          },
        ],
      },
    ],
  },
];

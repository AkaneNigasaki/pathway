import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de l'analyse exploratoire (EDA) : interroger les
 * données avant de modéliser — distributions, corrélations, valeurs
 * manquantes, outliers, hypothèses. 3 niveaux d'information (Aperçu /
 * Pratique / Approfondi) avec divulgation progressive. Tous les textes
 * supportent le code inline entre backticks.
 */
export const LEARNING_EDA: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est l'analyse exploratoire, pourquoi elle précède toute modélisation et ce qu'elle produit.",
    blocks: [
      {
        kind: "text",
        text: "L'EDA (Exploratory Data Analysis) est le dialogue avec les données avant toute modélisation : regarder les distributions, chercher les corrélations, repérer les anomalies, comprendre les valeurs manquantes. C'est une démarche itérative — question, graphique, nouvelle question — pas une checklist à cocher.",
      },
      {
        kind: "text",
        text: "Pourquoi elle existe : modéliser sans explorer, c'est répondre avant d'avoir compris la question. L'EDA révèle les pièges qui invalideraient tout modèle — fuites de données, biais de collecte, erreurs de saisie — et fait émerger les insights que personne n'avait demandés. La plupart des « surprises » d'un projet data naissent ici, pas dans le modèle.",
      },
      {
        kind: "text",
        text: "Ce qu'elle produit : une compréhension du jeu de données (ce qu'il contient, ce qu'il ne contient pas, ce qui est suspect), des hypothèses testables, et des décisions de préparation (quoi nettoyer, quoi transformer, quoi écarter). Un bon rapport d'EDA se lit en dix minutes et oriente tout le reste du projet.",
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : les données ont toujours quelque chose à cacher",
    level: 1,
    intro:
      "L'attitude fondamentale de l'explorateur : ne jamais faire confiance aux données brutes.",
    blocks: [
      {
        kind: "diagram",
        title: "Le cycle d'exploration",
        lines: [
          "Question (« que s'est-il passé ? »)",
          "     │",
          "     ▼",
          "Regarder (distributions, exemples, ordres de grandeur)",
          "     │",
          "     ▼",
          "Douter (est-ce plausible ? d'où vient cette valeur ?)",
          "     │",
          "     ▼",
          "Creuser (zoomer sur l'anomalie, comparer des segments)",
          "     │",
          "     ▼",
          "Noter (hypothèse, piège détecté, décision de nettoyage)",
          "     │",
          "     └─────► nouvelle question",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : l'EDA consiste à poser des questions aux données et à vérifier que les réponses sont plausibles, jusqu'à ce que le jeu de données n'ait plus de surprises. Les trois réflexes : vérifier les ordres de grandeur (un âge de 250 ans ?), comparer les segments (les nouveaux clients se comportent-ils différemment ?), et noter chaque découverte — la mémoire ne suffit pas.",
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
      "Ce qu'il faut maîtriser avant de mener une exploration sérieuse.",
    blocks: [
      {
        kind: "fields",
        title: "Bases requises",
        fields: [
          {
            label: "Python",
            value:
              "L'EDA se fait en Python, en itérant vite dans un notebook : importer des bibliothèques, écrire des fonctions simples.",
          },
          {
            label: "pandas",
            value:
              "Le cœur de l'EDA : charger, filtrer, agréger, transformer. Sans pandas fluide, chaque question prend dix minutes au lieu de dix secondes.",
          },
          {
            label: "Statistiques de base",
            value:
              "Moyenne, médiane, écart-type, corrélation : lire ces indicateurs sans les confondre — voir la compétence `statistics`.",
          },
          {
            label: "Data visualization",
            value:
              "Tracer vite des histogrammes, boxplots et nuages de points : l'œil voit en une seconde ce que les chiffres cachent — voir `data-viz`.",
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
      "Installer la pile d'exploration : pandas, numpy, matplotlib, seaborn, Jupyter.",
    blocks: [
      {
        kind: "command",
        label: "Installer la pile EDA",
        command: "pip install pandas numpy matplotlib seaborn jupyter",
        why: "La pile standard de l'exploration : `pandas` pour manipuler, `numpy` pour le calcul numérique, `matplotlib`/`seaborn` pour visualiser, `jupyter` pour itérer. Des paquets stables, documentés, présents dans tous les environnements data.",
        verify: "python -c \"import pandas, numpy, matplotlib, seaborn; print(pandas.__version__)\"",
      },
      {
        kind: "command",
        label: "Lancer le notebook d'exploration",
        command: "jupyter notebook",
        why: "L'EDA est itérative par nature : le notebook affiche chaque résultat sous le code, ce qui rend la boucle question → réponse quasi instantanée. Créez un notebook dédié par jeu de données exploré.",
      },
    ],
  },
  {
    id: "premier-dataset",
    title: "Charger et regarder un dataset",
    level: 2,
    intro:
      "Les cinq premières minutes avec un nouveau jeu de données : un rituel à systématiser.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Charger",
            detail:
              "`pd.read_csv(\"clients.csv\")` : vérifier que le chargement réussit et noter le nombre de lignes et de colonnes affiché.",
          },
          {
            title: "Regarder le début et la fin",
            detail:
              "`df.head()` et `df.tail()` : à quoi ressemblent les lignes ? Les formats sont-ils cohérents (dates, nombres, texte) ?",
          },
          {
            title: "Vérifier les types",
            detail:
              "`df.info()` : types de colonnes, nombre de valeurs non nulles. Un nombre stocké en texte ou une date en objet sont des signaux d'alerte.",
          },
          {
            title: "Résumer les chiffres",
            detail:
              "`df.describe()` : moyenne, médiane (50 %), min, max, quartiles. Repérer immédiatement les ordres de grandeur absurdes.",
          },
          {
            title: "Compter les catégories",
            detail:
              "`df[\"segment\"].value_counts()` : quelles modalités, en quelles proportions ? Une catégorie à 99 % ou une à 3 lignes méritent investigation.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Le rituel des 5 premières minutes",
        code: `import pandas as pd

df = pd.read_csv("clients.csv")
print(df.shape)          # (lignes, colonnes)

df.head()                # à quoi ressemblent les données ?
df.info()                # types + valeurs non nulles
df.describe()            # résumé statistique des numériques
df["segment"].value_counts()  # distribution d'une catégorie`,
      },
    ],
  },
  {
    id: "distributions-rapides",
    title: "Voir les distributions",
    level: 2,
    intro:
      "La forme des variables en quelques graphiques : le réflexe visuel de l'EDA.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Distributions numériques et catégorielles",
        code: `import seaborn as sns
import matplotlib.pyplot as plt

# Numérique : la forme (asymétrie, pics, queues)
sns.histplot(data=df, x="panier_moyen", bins=30, kde=True)

# Catégorielle : les proportions
df["segment"].value_counts().plot.barh()
plt.xlabel("Nombre de clients")

# Comparer une distribution entre groupes
sns.boxplot(data=df, x="segment", y="panier_moyen")`,
      },
      {
        kind: "text",
        text: "Ce que l'on cherche : asymétrie (beaucoup de petites valeurs, quelques énormes), multimodalité (deux pics = deux populations mélangées), valeurs impossibles (négatives là où c'est impossible). Chaque forme anormale est une question à creuser, pas un détail à ignorer.",
      },
    ],
  },
  {
    id: "valeurs-manquantes",
    title: "Diagnostiquer les valeurs manquantes",
    level: 2,
    intro:
      "Compter ne suffit pas : il faut comprendre POURQUOI les données manquent.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Cartographier les manquants",
        code: `import pandas as pd

# Combien de manquants par colonne ?
manquants = df.isna().sum()
print(manquants[manquants > 0].sort_values(ascending=False))

# En proportion
print((df.isna().mean() * 100).round(1))

# Les manquants sont-ils liés à une autre variable ?
print(df[df["telephone"].isna()]["segment"].value_counts(normalize=True))
print(df[~df["telephone"].isna()]["segment"].value_counts(normalize=True))`,
      },
      {
        kind: "text",
        text: "La question clé : les manquants sont-ils aléatoires ou systématiques ? Si les clients sans téléphone sont concentrés dans un segment, supprimer ces lignes biaise l'analyse (on perd un segment entier), et les imputer naïvement masque un phénomène réel. La décision (supprimer, imputer, modéliser, garder tel quel) dépend du mécanisme, pas du pourcentage.",
      },
    ],
  },
  {
    id: "nettoyage-base",
    title: "Nettoyage de base",
    level: 2,
    intro:
      "Les opérations de nettoyage les plus fréquentes, avec leurs précautions.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Opérations courantes",
        code: `import pandas as pd

# Supprimer les doublons exacts
df = df.drop_duplicates()

# Supprimer les lignes où la cible est manquante (on ne peut rien en faire)
df = df.dropna(subset=["a_achete"])

# Imputer une numérique par la médiane (robuste aux outliers)
df["age"] = df["age"].fillna(df["age"].median())

# Imputer une catégorie par le mode
df["segment"] = df["segment"].fillna(df["segment"].mode()[0])

# Convertir les dates
df["date_inscription"] = pd.to_datetime(df["date_inscription"], errors="coerce")`,
      },
      {
        kind: "list",
        items: [
          "Ne jamais modifier le fichier source : le nettoyage se fait dans le code, de façon reproductible.",
          "`errors=\"coerce\"` convertit les dates invalides en `NaT` au lieu de planter — puis on compte les `NaT` pour mesurer le problème.",
          "La médiane plutôt que la moyenne pour imputer : un outlier ne doit pas déplacer la valeur de remplacement.",
          "Documenter chaque décision de nettoyage : « 3 % de lignes supprimées (doublons) » doit figurer dans le rapport.",
        ],
      },
    ],
  },
  {
    id: "premiers-graphiques",
    title: "Explorer les relations",
    level: 2,
    intro:
      "Passer des variables isolées aux relations : corrélations et comparaisons.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Corrélations et croisements",
        code: `import seaborn as sns
import matplotlib.pyplot as plt

# Matrice de corrélation des variables numériques
corr = df.select_dtypes("number").corr(numeric_only=True)
sns.heatmap(corr, annot=True, fmt=".2f", cmap="coolwarm", center=0)

# Croiser une catégorie avec un indicateur
print(df.groupby("segment")["panier_moyen"].agg(["mean", "median", "count"]))

# Relation entre deux numériques
sns.scatterplot(data=df, x="anciennete_mois", y="panier_moyen", hue="segment", alpha=0.5)`,
      },
      {
        kind: "text",
        text: "Lire une heatmap : chercher les blocs de variables fortement corrélées (redondance) et les corrélations surprenantes (pistes). Rappel constant : corrélation n'est pas causalité — une corrélation est une question, pas une conclusion.",
      },
    ],
  },
  {
    id: "debugging-eda",
    title: "Déboguer en EDA",
    level: 2,
    intro:
      "Les erreurs pandas les plus fréquentes pendant l'exploration.",
    blocks: [
      {
        kind: "fields",
        title: "Diagnostic rapide",
        fields: [
          {
            label: "`SettingWithCopyWarning`",
            value:
              "L'avertissement le plus célèbre de pandas : on modifie une copie au lieu de l'original (`df[df['x'] > 0]['y'] = ...`). Solution : utiliser `.loc` (`df.loc[df['x'] > 0, 'y'] = ...`) ou copier explicitement avec `.copy()`.",
          },
          {
            label: "Types inattendus après lecture",
            value:
              "Une colonne de nombres lue en `object` (texte) : souvent un symbole parasite (`€`, espace, `N/A`). Inspecter les valeurs uniques, nettoyer, puis `pd.to_numeric(errors=\"coerce\")`.",
          },
          {
            label: "Dates non reconnues",
            value:
              "`pd.to_datetime` échoue sur des formats mixtes (`01/02/2024` : jour/mois ou mois/jour ?). Préciser `dayfirst=True` ou le format exact avec `format=\"%d/%m/%Y\"`.",
          },
          {
            label: "Mémoire saturée",
            value:
              "Un CSV de quelques Go qui fait planter le notebook : lire par morceaux (`chunksize`), typer les colonnes (`dtype`), ou échantillonner pour l'exploration.",
          },
          {
            label: "Graphique vide",
            value:
              "Vérifier que le filtre ne retourne rien (`len(df_filtre)`), que les colonnes existent (fautes de frappe), et que les NaN n'ont pas tout avalé dans une agrégation.",
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
      "Les pièges classiques des premières explorations.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Explorer sans question",
            value:
              "Problem : produire 40 graphiques sans fil conducteur. Better : formuler 3 à 5 questions métier avant d'ouvrir le notebook.",
          },
          {
            label: "Confondre corrélation et causalité",
            value:
              "Problem : « les clients qui appellent le support achètent plus » → recommander d'appeler le support. Better : une corrélation est une hypothèse à tester, jamais une recommandation.",
          },
          {
            label: "Ignorer les valeurs manquantes",
            value:
              "Problem : `dropna()` silencieux qui supprime 40 % des lignes — et un segment entier avec. Better : diagnostiquer le mécanisme avant de décider.",
          },
          {
            label: "Supprimer les outliers aveuglément",
            value:
              "Problem : éliminer les points extrêmes « parce qu'ils gênent ». Better : comprendre d'abord — erreur de saisie à corriger, ou phénomène rare le plus intéressant du dataset ?",
          },
          {
            label: "Mélanger exploration et validation",
            value:
              "Problem : tester une hypothèse sur les mêmes données qui l'ont suggérée (sur-ajustement intellectuel). Better : noter les hypothèses, les valider sur des données fraîches ou un échantillon réservé.",
          },
          {
            label: "Ne rien noter",
            value:
              "Problem : retrouver trois jours plus tard un notebook incompréhensible. Better : commenter chaque découverte en une phrase, au fil de l'eau.",
          },
        ],
      },
    ],
  },
  {
    id: "profilage-automatise",
    title: "Profilage automatisé",
    level: 2,
    intro:
      "Un rapport complet en une ligne : statistiques, manquants, corrélations, alertes — le point de départ express.",
    blocks: [
      {
        kind: "command",
        label: "Installer ydata-profiling",
        command: "pip install ydata-profiling",
        why: "`ydata-profiling` (ex-pandas-profiling) génère un rapport HTML interactif complet sur un DataFrame : distributions, valeurs manquantes, corrélations, doublons, alertes de qualité. Idéal pour le premier regard sur un dataset inconnu.",
        verify: "python -c \"import ydata_profiling; print(ydata_profiling.__version__)\"",
      },
      {
        kind: "code",
        language: "python",
        title: "Générer un rapport de profilage",
        code: `import pandas as pd
from ydata_profiling import ProfileReport

df = pd.read_csv("donnees.csv")

# Rapport complet en une ligne
profile = ProfileReport(df, title="Profilage exploratoire", minimal=False)
profile.to_file("profilage.html")  # s'ouvre dans le navigateur

# En notebook Jupyter : profile.to_notebook_iframe()`,
      },
      {
        kind: "text",
        text: "Limites : le rapport est un point de départ, pas une EDA. Il ne connaît pas le métier, ne détecte pas le leakage, ne pose pas de questions. Usage pro : générer le rapport, noter les alertes (colonnes à forte cardinalité, corrélations suspectes, manquants massifs), puis explorer manuellement ce qui compte.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "types-donnees",
    title: "Types de données et leurs implications",
    level: 3,
    intro:
      "Numérique, catégorielle, temporelle, texte : chaque type appelle des analyses différentes.",
    blocks: [
      {
        kind: "table",
        headers: ["Type", "Questions typiques", "Outils"],
        rows: [
          ["Numérique continue", "Distribution ? Outliers ? Échelle ?", "Histogramme, boxplot, `describe`"],
          ["Numérique discrète (comptes)", "Distribution des fréquences ? Zéros excessifs ?", "Barres des effectifs, `value_counts`"],
          ["Catégorielle nominale", "Proportions ? Modalités rares ?", "`value_counts`, barres"],
          ["Catégorielle ordinale", "L'ordre est-il respecté dans l'analyse ?", "Barres ordonnées, attention aux encodages"],
          ["Temporelle", "Tendance ? Saisonnalité ? Trous ?", "Courbe, agrégation par période"],
          ["Texte libre", "Thèmes ? Longueurs ? Langue ?", "Longueurs, nuages de mots, échantillon lu à la main"],
          ["Géographique", "Concentration ? Biais régional ?", "Agrégation par zone, carte"],
        ],
      },
      {
        kind: "text",
        text: "Le point critique : le type stocké n'est pas toujours le vrai type. Un code postal est catégoriel (pas une quantité), un mois est ordinal cyclique, un identifiant n'est ni l'un ni l'autre. Mal typer une variable, c'est calculer des moyennes sur des étiquettes.",
      },
    ],
  },
  {
    id: "statistiques-descriptives",
    title: "Statistiques descriptives : lire `describe`",
    level: 3,
    intro:
      "Extraire le maximum d'un simple résumé statistique.",
    blocks: [
      {
        kind: "fields",
        title: "Lecture experte de `describe()`",
        fields: [
          {
            label: "`count` vs nombre de lignes",
            value:
              "L'écart = les valeurs manquantes. Une colonne à 60 % de remplissage n'a pas le même statut qu'une colonne complète.",
          },
          {
            label: "`mean` vs `50%` (médiane)",
            value:
              "Un écart important signale une asymétrie : quelques grandes valeurs tirent la moyenne. Pour les revenus, les temps d'attente, les paniers : la médiane est souvent plus honnête.",
          },
          {
            label: "`std` (écart-type)",
            value:
              "Un écart-type supérieur à la moyenne suggère une forte dispersion ou des outliers. Un écart-type nul = colonne constante = inutile pour modéliser.",
          },
          {
            label: "`min` / `max`",
            value:
              "Les bornes impossibles (âge négatif, pourcentage > 100) révèlent les erreurs de saisie. Les bornes suspectes (9999, 999999) révèlent souvent des codes d'erreur déguisés en valeurs.",
          },
          {
            label: "`25%` / `75%` (quartiles)",
            value:
              "L'intervalle interquartile = où se concentre la moitié centrale des données. Il sert aussi à détecter les outliers (méthode IQR).",
          },
        ],
      },
    ],
  },
  {
    id: "asymetrie",
    title: "Asymétrie et aplatissement",
    level: 3,
    intro:
      "Quantifier la forme d'une distribution : `skew` et `kurtosis`.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Mesurer l'asymétrie",
        code: `import pandas as pd

# skew > 0 : queue vers la droite (quelques très grandes valeurs)
# skew < 0 : queue vers la gauche
print(df["panier_moyen"].skew().round(2))

# Comparer moyenne et médiane : l'écart confirme l'asymétrie
print(df["panier_moyen"].agg(["mean", "median"]))`,
      },
      {
        kind: "text",
        text: "Pourquoi c'est important : les variables très asymétriques (revenus, montants) posent problème aux modèles sensibles à l'échelle et aux distances. La parade classique est la transformation logarithmique (`np.log1p`), qui compresse les grandes valeurs. Mais on ne transforme qu'en connaissance de cause : l'asymétrie est parfois l'information elle-même (une minorité de gros clients).",
      },
    ],
  },
  {
    id: "outliers-methodes",
    title: "Outliers : détecter et décider",
    level: 3,
    intro:
      "Méthodes de détection, et surtout : que faire une fois détectés.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Méthode IQR et z-score",
        code: `import pandas as pd
import numpy as np

s = df["panier_moyen"]

# Méthode IQR : en dehors de [Q1 - 1.5*IQR, Q3 + 1.5*IQR]
q1, q3 = s.quantile(0.25), s.quantile(0.75)
iqr = q3 - q1
outliers_iqr = df[(s < q1 - 1.5 * iqr) | (s > q3 + 1.5 * iqr)]

# Z-score : à plus de 3 écarts-types de la moyenne
z = (s - s.mean()) / s.std()
outliers_z = df[z.abs() > 3]

print(f"IQR : {len(outliers_iqr)} outliers, z-score : {len(outliers_z)}")`,
      },
      {
        kind: "fields",
        title: "Que faire des outliers",
        fields: [
          {
            label: "Erreur de saisie",
            value:
              "Âge de 250 ans, montant négatif impossible : corriger si la vraie valeur est devinable, sinon traiter comme manquant. Documenter.",
          },
          {
            label: "Phénomène réel rare",
            value:
              "Le plus gros client, la panne exceptionnelle : souvent l'information la plus précieuse. Le supprimer, c'est aveugler l'analyse. Le garder, c'est assumer son influence.",
          },
          {
            label: "Plafonner (winsorisation)",
            value:
              "Remplacer les extrêmes par un seuil (ex. 99e percentile) : compromis quand l'outlier est réel mais écrase l'analyse. À signaler explicitement.",
          },
          {
            label: "Modèles robustes",
            value:
              "Alternative à la suppression : utiliser des méthodes peu sensibles aux extrêmes (médiane, modèles robustes) et comparer les résultats avec et sans outliers.",
          },
        ],
      },
    ],
  },
  {
    id: "correlations-avancees",
    title: "Corrélations : Pearson, Spearman et leurs limites",
    level: 3,
    intro:
      "Choisir le bon coefficient et savoir ce qu'il ne voit pas.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Deux coefficients, deux lectures",
        code: `import pandas as pd

num = df.select_dtypes("number")

# Pearson : relation LINÉAIRE (sensible aux outliers)
print(num.corr(method="pearson")["panier_moyen"].sort_values(ascending=False))

# Spearman : relation MONOTONE (basée sur les rangs, robuste)
print(num.corr(method="spearman")["panier_moyen"].sort_values(ascending=False))`,
      },
      {
        kind: "text",
        text: "Pearson mesure la linéarité : une relation en U ou exponentielle lui échappe. Spearman, basé sur les rangs, détecte toute relation monotone et résiste aux outliers. En pratique : calculer les deux, et tracer le nuage de points des corrélations fortes — le graphique révèle ce que le coefficient résume (ou masque).",
      },
    ],
  },
  {
    id: "correlation-causalite",
    title: "Corrélation n'est pas causalité",
    level: 3,
    intro:
      "Les trois explications possibles d'une corrélation, et comment les départager.",
    blocks: [
      {
        kind: "fields",
        title: "Trois histoires pour une corrélation",
        fields: [
          {
            label: "X cause Y",
            value:
              "L'explication tentante. Exemple : la pluie cause les parapluies. Vérification : antériorité temporelle, mécanisme plausible, test expérimental.",
          },
          {
            label: "Y cause X (causalité inversée)",
            value:
              "Les bons élèves ont de bons manuels — ou les bons manuels font-ils les bons élèves ? Vérification : laquelle des deux variables peut logiquement précéder l'autre ?",
          },
          {
            label: "Z cause X et Y (facteur confondant)",
            value:
              "La crème glacée et les noyades augmentent ensemble : le vrai coupable est la chaleur. C'est le cas le plus fréquent et le plus dangereux. Vérification : chercher la troisième variable, contrôler par segment.",
          },
        ],
      },
      {
        kind: "text",
        text: "En EDA, la discipline consiste à noter les corrélations comme des hypothèses (« à tester »), jamais comme des conclusions. La causalité se prouve par l'expérimentation (voir la compétence `experimentation`), pas par l'observation.",
      },
    ],
  },
  {
    id: "donnees-temporelles",
    title: "Données temporelles",
    level: 3,
    intro:
      "Tendance, saisonnalité, trous : l'exploration spécifique des séries datées.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Agréger par période et lisser",
        code: `import pandas as pd

df["date"] = pd.to_datetime(df["date"])
ts = df.set_index("date").sort_index()["ventes"]

# Agrégation mensuelle
mensuel = ts.resample("ME").sum()

# Moyenne mobile 7 jours : révèle la tendance sous le bruit
tendance = ts.resample("D").sum().rolling(7, center=True).mean()

print(mensuel.head())
print("Jours sans données :", ts.resample("D").sum().isna().sum())`,
      },
      {
        kind: "list",
        items: [
          "Vérifier la continuité : des jours manquants sont-ils des zéros ou des trous de collecte ? La réponse change tout.",
          "Chercher la saisonnalité : agréger par jour de semaine, par mois — les motifs calendaires sont omniprésents (week-ends, fins de mois).",
          "Comparer à période comparable : un mois à 28 jours ne se compare pas brutalement à un mois à 31 jours.",
          "Dater les ruptures : un changement brutal coïncide-t-il avec un événement connu (lancement, incident, changement de méthode de mesure) ?",
        ],
      },
    ],
  },
  {
    id: "donnees-categorielles",
    title: "Variables catégorielles : au-delà du comptage",
    level: 3,
    intro:
      "Cardinalité, modalités rares, cohérence : ce que les catégories cachent.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Auditer une variable catégorielle",
        code: `import pandas as pd

s = df["ville"]

print("Modalités distinctes :", s.nunique())
print(s.value_counts().head(10))   # les plus fréquentes
print(s.value_counts().tail(10))   # les plus rares

# Incohérences de saisie : variantes d'une même modalité
print(sorted(s.dropna().unique())[:20])`,
      },
      {
        kind: "list",
        items: [
          "Cardinalité : 5 modalités = variable exploitable ; 50 000 modalités (ex. ville en texte libre) = variable à regrouper ou à traiter autrement.",
          "Modalités rares : en dessous d'un seuil (ex. < 30 occurrences), regrouper en « Autre » pour la modélisation — mais noter ce qu'on perd.",
          "Incohérences : « Paris », « paris », « PARIS », « Paris » avec une espace — nettoyer par normalisation (minuscules, strip) avant de compter.",
          "Catégories qui fuient : une modalité qui n'existe que pour la cible positive est souvent une fuite de données déguisée.",
        ],
      },
    ],
  },
  {
    id: "texte-dates",
    title: "Texte libre et dates",
    level: 3,
    intro:
      "Deux types particuliers qui demandent un traitement d'exploration dédié.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Explorer du texte et des dates",
        code: `import pandas as pd

# Texte : longueurs, valeurs vides, langue
df["longueur_avis"] = df["avis"].str.len()
print(df["longueur_avis"].describe())
print("Avis vides :", df["avis"].isna().sum())
print(df["avis"].dropna().iloc[:5].tolist())  # lire vraiment quelques exemples

# Dates : plage, granularité, fuseaux
d = pd.to_datetime(df["date"])
print(d.min(), "→", d.max())
print("Doublons temporels :", d.duplicated().sum())`,
      },
      {
        kind: "text",
        text: "Le texte libre ne s'explore pas qu'avec des statistiques : lire quelques dizaines d'exemples réels révèle les formats, les langues mélangées, les placeholders (« N/A », « test »). Pour les dates, vérifier la plage (des dates futures ? des années 1900 ?), la granularité réelle, et les fuseaux horaires si plusieurs sources sont mélangées.",
      },
    ],
  },
  {
    id: "doublons",
    title: "Doublons : plus subtils qu'il n'y paraît",
    level: 3,
    intro:
      "Doublons exacts, quasi-doublons, doublons métier : trois problèmes différents.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Détecter les différents doublons",
        code: `import pandas as pd

# Doublons exacts (toutes colonnes identiques)
print("Doublons exacts :", df.duplicated().sum())

# Doublons sur les identifiants : un client ne devrait apparaître qu'une fois
print("ID dupliqués :", df.duplicated(subset=["client_id"]).sum())

# Examiner un cas
douteux = df[df.duplicated(subset=["client_id"], keep=False)]
print(douteux.sort_values("client_id").head(10))`,
      },
      {
        kind: "text",
        text: "Un doublon exact est souvent un artefact d'ingestion (double import) : on le supprime. Un identifiant dupliqué avec des valeurs différentes est un problème métier (deux fiches pour un client ? une commande saisie deux fois ?) : on ne le supprime pas sans comprendre. Les quasi-doublons (même client, orthographe légèrement différente) relèvent de la déduplication — un vrai sujet en soi.",
      },
    ],
  },
  {
    id: "data-leakage",
    title: "Data leakage : le piège mortel",
    level: 3,
    intro:
      "Quand l'information du futur contamine le passé : le modèle semble parfait, puis s'effondre en production.",
    blocks: [
      {
        kind: "text",
        text: "Le data leakage (fuite de données) survient quand une variable d'entrée contient, directement ou indirectement, l'information que l'on cherche à prédire. Exemples classiques : prédire le churn avec la « date de résiliation », prédire un défaut de paiement avec le « montant des pénalités », ou calculer des statistiques d'imputation sur tout le dataset avant de séparer train/test.",
      },
      {
        kind: "list",
        items: [
          "Symptôme : une performance « trop belle pour être vraie » (99 % d'accuracy du premier coup).",
          "Audit : pour chaque variable, se demander « cette information serait-elle disponible au moment de la prédiction en production ? ».",
          "Variables suspectes : identifiants, dates postérieures à l'événement, agrégats calculés sur la période cible.",
          "Prévention : séparer train/test AVANT toute transformation, et n'ajuster (fit) les transformations que sur le train.",
          "L'EDA est le moment de la détection : une variable miraculeusement prédictive mérite une enquête, pas des félicitations.",
        ],
      },
    ],
  },
  {
    id: "echantillonnage-biais",
    title: "Échantillonnage et biais de sélection",
    level: 3,
    intro:
      "Les données ne tombent pas du ciel : comment elles ont été collectées détermine ce qu'on peut en conclure.",
    blocks: [
      {
        kind: "fields",
        title: "Questions à poser au dataset",
        fields: [
          {
            label: "Qui est dedans, qui manque ?",
            value:
              "Un sondage en ligne sur-représente les connectés ; une base clients ne contient que les clients (pas ceux qui ne sont jamais venus). Décrire la population COUVERTE, pas seulement la population visée.",
          },
          {
            label: "Biais de survie",
            value:
              "On n'observe que les survivants : les entreprises encore en activité, les clients restés. Les disparus — souvent les plus instructifs — sont invisibles. Le signaler explicitement.",
          },
          {
            label: "Période de collecte",
            value:
              "Un mois de décembre n'est pas un mois ordinaire ; une période de promotion fausse les comportements. Noter les événements qui ont marqué la collecte.",
          },
          {
            label: "Échantillonnage pour explorer",
            value:
              "Sur de gros volumes, explorer sur un échantillon aléatoire (`df.sample(frac=0.1, random_state=42)`) est légitime — à condition de vérifier qu'il est représentatif (comparer les distributions clés).",
          },
        ],
      },
    ],
  },
  {
    id: "imputation-strategies",
    title: "Stratégies d'imputation",
    level: 3,
    intro:
      "Au-delà de la médiane : choisir une stratégie selon le mécanisme de manque.",
    blocks: [
      {
        kind: "table",
        headers: ["Stratégie", "Quand", "Risque"],
        rows: [
          ["Suppression des lignes", "Manquants rares et aléatoires (< 5 %)", "Biais si le manque est systématique"],
          ["Médiane / mode", "Base rapide, distribution asymétrique", "Réduit la variance, crée un pic artificiel"],
          ["Imputation par groupe", "Le manque dépend d'un segment connu", "Mieux ciblée, mais reste une approximation"],
          ["Indicateur de manque", "Ajouter `col_manquant` (0/1)", "Capture l'information du manque lui-même — souvent prédictive"],
          ["Imputation par modèle (KNN, régression)", "Relations fortes entre variables", "Complexe, risque de fuite si mal validée"],
          ["Ne rien faire", "Modèles qui gèrent les NaN nativement", "Vérifier que c'est vraiment le cas"],
        ],
      },
      {
        kind: "text",
        text: "L'astuce la plus sous-estimée : l'indicateur de manque. Le fait qu'une donnée soit absente est souvent informatif (un client qui ne renseigne pas son revenu n'est pas un client moyen). Créer une colonne binaire `revenu_manquant` préserve cette information au lieu de la détruire.",
      },
    ],
  },
  {
    id: "transformations",
    title: "Transformations courantes",
    level: 3,
    intro:
      "Log, standardisation, discrétisation : quand et pourquoi transformer.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Transformations typiques",
        code: `import pandas as pd
import numpy as np

# Log : compresse les grandes valeurs (revenus, montants)
# log1p gère les zéros : log(1 + x)
df["log_revenu"] = np.log1p(df["revenu"])

# Discrétisation : transformer un continu en tranches lisibles
df["tranche_age"] = pd.cut(
    df["age"],
    bins=[0, 25, 40, 60, 120],
    labels=["<25", "25-40", "40-60", "60+"],
)

# Variable cyclique : le mois est circulaire (décembre proche de janvier)
df["mois_sin"] = np.sin(2 * np.pi * df["mois"] / 12)
df["mois_cos"] = np.cos(2 * np.pi * df["mois"] / 12)`,
      },
      {
        kind: "text",
        text: "Chaque transformation se justifie par un problème : le log contre l'asymétrie, la discrétisation pour la lisibilité métier, le codage sin/cos pour les cycles. Transformer sans raison ajoute de la complexité sans bénéfice — et complique l'interprétation pour les parties prenantes.",
      },
    ],
  },
  {
    id: "jointures",
    title: "Jointures : assembler les sources",
    level: 3,
    intro:
      "L'EDA multi-tables : vérifier les jointures avant de les croire.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Auditer une jointure",
        code: `import pandas as pd

# Avant de joindre : les clés sont-elles uniques ?
print("Clients uniques :", clients["client_id"].nunique(), "/", len(clients))
print("Commandes uniques :", commandes["client_id"].nunique(), "/", len(commandes))

# Jointure avec indicateur : qui matche, qui ne matche pas ?
fusion = clients.merge(commandes, on="client_id", how="left", indicator=True)
print(fusion["_merge"].value_counts())

# Combien de lignes après ? Une explosion du volume signale une clé dupliquée
print("Avant :", len(clients), "— Après :", len(fusion))`,
      },
      {
        kind: "list",
        items: [
          "`indicator=True` révèle les lignes sans correspondance des deux côtés : clients sans commandes, commandes sans clients (anomalie !).",
          "Une jointure qui multiplie les lignes par 10 signale presque toujours une clé non unique du côté « many » mal anticipé.",
          "Vérifier les types des clés des deux côtés : un `client_id` en texte d'un côté et en nombre de l'autre ne matchera jamais.",
          "Après chaque jointure : recompter, et vérifier quelques cas à la main.",
        ],
      },
    ],
  },
  {
    id: "groupby-avance",
    title: "Agrégations avancées",
    level: 3,
    intro:
      "Le `groupby` est l'instrument principal de l'EDA : l'utiliser à plein.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Agréger intelligemment",
        code: `import pandas as pd

# Plusieurs agrégats en une passe
resume = df.groupby("segment").agg(
    clients=("client_id", "nunique"),
    panier_moyen=("panier_moyen", "mean"),
    panier_mediane=("panier_moyen", "median"),
    ca_total=("ca", "sum"),
).round(1)

# Comparer chaque ligne à son groupe (sans réduire)
df["ecart_au_segment"] = df["panier_moyen"] - df.groupby("segment")["panier_moyen"].transform("median")

# Groupes multiples : segment x mois
print(df.groupby(["segment", "mois"])["ca"].sum().unstack())`,
      },
      {
        kind: "text",
        text: "`transform` est l'outil méconnu : il calcule l'agrégat par groupe mais le réinjecte à chaque ligne, permettant de comparer chaque observation à son groupe. Et la syntaxe nommée de `agg` produit directement des colonnes lisibles — fini les MultiIndex cryptiques.",
      },
    ],
  },
  {
    id: "rapport-eda",
    title: "Structurer le rapport d'EDA",
    level: 3,
    intro:
      "Une exploration sans restitution est un travail perdu : le rapport qui se lit en dix minutes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Contexte et périmètre",
            detail:
              "Source des données, période couverte, volume (lignes, colonnes), méthode de collecte connue. Une page maximum.",
          },
          {
            title: "Qualité des données",
            detail:
              "Valeurs manquantes par colonne, doublons, incohérences détectées, décisions de nettoyage prises — avec les chiffres.",
          },
          {
            title: "Portrait des variables clés",
            detail:
              "Distributions des variables importantes (graphiques), segments comparés, ordres de grandeur.",
          },
          {
            title: "Findings",
            detail:
              "Les découvertes marquantes, chacune en une phrase + un graphique : ce qui surprend, ce qui est suspect, ce qui est prometteur.",
          },
          {
            title: "Hypothèses et recommandations",
            detail:
              "Les questions à tester ensuite, les pièges à éviter pour la modélisation (fuites potentielles, biais), les données manquantes à collecter.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le rapport d'EDA n'est pas le notebook : c'est une synthèse curée, avec les impasses élaguées et les conclusions mises en avant. Le notebook reste disponible en annexe pour qui veut vérifier.",
      },
    ],
  },
  {
    id: "question-business",
    title: "Partir de la question métier",
    level: 3,
    intro:
      "L'EDA la plus efficace est guidée par le besoin, pas par la curiosité pure.",
    blocks: [
      {
        kind: "fields",
        title: "Traduire le métier en exploration",
        fields: [
          {
            label: "« Pourquoi le churn augmente ? »",
            value:
              "Comparer les distributions (partants vs fidèles), chercher les segments qui décrochent, dater le début de la hausse, croiser avec les événements (pricing, incidents).",
          },
          {
            label: "« Quel segment cibler ? »",
            value:
              "Tailles des segments, valeurs, coûts d'acquisition, taux de conversion par segment : une matrice qui se lit d'un coup d'œil.",
          },
          {
            label: "« Peut-on prédire X ? »",
            value:
              "Vérifier la disponibilité des variables AU MOMENT de la prédiction, la qualité de la cible, le volume d'exemples positifs. L'EDA répond souvent « non » — c'est une réponse précieuse.",
          },
          {
            label: "« Ces données sont-elles utilisables ? »",
            value:
              "Audit de qualité : couverture, fraîcheur, cohérence, biais. Un rapport d'audit honnête vaut mieux qu'un modèle construit sur du sable.",
          },
        ],
      },
    ],
  },
  {
    id: "hypotheses-testables",
    title: "Formuler des hypothèses testables",
    level: 3,
    intro:
      "Transformer une observation en hypothèse que l'on peut confirmer ou infirmer.",
    blocks: [
      {
        kind: "list",
        items: [
          "Observation : « le segment B a un panier plus faible ». Hypothèse : « le panier médian du segment B est inférieur de plus de 10 % à celui des autres segments ».",
          "Une bonne hypothèse est précise (quelle métrique, quel seuil), falsifiable (on peut la réfuter), et testable avec les données disponibles.",
          "Séparer la génération et le test : les hypothèses nées de l'exploration se testent sur des données fraîches ou un échantillon mis de côté — sinon on ne fait que redécouvrir ce qu'on a déjà vu.",
          "Noter aussi les hypothèses réfutées : elles évitent à l'équipe de refaire le même chemin dans six mois.",
          "Le test statistique formel (test t, chi²) appartient à la compétence `statistics` ; l'EDA produit les hypothèses, les tests les valident.",
        ],
      },
    ],
  },
  {
    id: "visualisation-systematique",
    title: "Visualisation systématique",
    level: 3,
    intro:
      "Une batterie de graphiques standard à passer sur tout nouveau dataset.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "La batterie minimale",
        code: `import seaborn as sns
import matplotlib.pyplot as plt

# 1. Distributions de toutes les numériques (boucle)
num_cols = df.select_dtypes("number").columns
for col in num_cols:
    plt.figure()
    sns.histplot(data=df, x=col, kde=True)
    plt.title(col)

# 2. Effectifs de toutes les catégories
for col in df.select_dtypes("object").columns:
    print(col, ":", df[col].nunique(), "modalités")

# 3. Heatmap des corrélations
sns.heatmap(df[num_cols].corr(numeric_only=True), cmap="coolwarm", center=0)

# 4. Cible vs variables clés (si une cible existe)
sns.boxplot(data=df, x="segment", y="a_achete")`,
      },
      {
        kind: "text",
        text: "Cette batterie prend vingt minutes et révèle 80 % des problèmes. Le reste — les graphiques sur mesure — vient des questions métier. La compétence `data-viz` détaille les principes de chaque forme.",
      },
    ],
  },
  {
    id: "performance",
    title: "Performance sur gros volumes",
    level: 3,
    intro:
      "Explorer quand le dataset ne tient pas confortablement en mémoire.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Techniques d'exploration à grande échelle",
        code: `import pandas as pd

# 1. Typer à la lecture : divise souvent la mémoire par 2 ou 3
df = pd.read_csv(
    "gros.csv",
    dtype={"client_id": "int32", "segment": "category"},
    parse_dates=["date"],
)

# 2. Ne charger que les colonnes utiles
df = pd.read_csv("gros.csv", usecols=["date", "client_id", "montant"])

# 3. Traiter par morceaux pour les agrégations
total = 0
for chunk in pd.read_csv("gros.csv", chunksize=100_000, usecols=["montant"]):
    total += chunk["montant"].sum()

# 4. Échantillonner pour l'exploration visuelle
echantillon = df.sample(n=50_000, random_state=42)`,
      },
      {
        kind: "text",
        text: "Le type `category` pour les colonnes à faible cardinalité est le gain le plus simple. Pour l'exploration visuelle, un échantillon représentatif suffit : les distributions ne changent pas entre 50 000 et 50 millions de lignes. Réserver le dataset complet aux calculs finaux.",
      },
    ],
  },
  {
    id: "eda-reproductible",
    title: "EDA reproductible",
    level: 3,
    intro:
      "Une exploration doit pouvoir être rejouée : données versionnées, aléatoire fixé, environnement figé.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois piliers de la reproductibilité",
        fields: [
          {
            label: "Données versionnées",
            value:
              "Un notebook qui lit `donnees_final_v2_DEFINITIF.csv` n'est pas reproductible. Versionner les données (DVC, ou au minimum un hash SHA du fichier noté dans le notebook) garantit qu'on analyse toujours la même chose.",
          },
          {
            label: "Aléatoire fixé",
            value:
              "`np.random.default_rng(42)`, `random_state=42` partout : l'échantillonnage, les visualisations de sous-ensembles et les splits doivent donner les mêmes résultats à chaque exécution.",
          },
          {
            label: "Environnement figé",
            value:
              "`pip freeze > requirements.txt` : une version différente de pandas peut changer un comportement (gestion des types, des NA). Noter les versions utilisées.",
          },
        ],
      },
      {
        kind: "steps",
        steps: [
          {
            title: "Noter la source et le hash des données",
            detail:
              "En tête de notebook : d'où viennent les données, date d'extraction, hash SHA-256 du fichier. Si les données changent, on le sait.",
          },
          {
            title: "Fixer toutes les graines aléatoires",
            detail:
              "Définir une constante `SEED = 42` et l'utiliser pour chaque opération aléatoire du notebook.",
          },
          {
            title: "Exécuter de haut en bas avant de conclure",
            detail:
              "« Restart & Run All » : l'ordre d'exécution réel doit correspondre à l'ordre logique, sans cellule exécutée hors séquence.",
          },
          {
            title: "Versionner notebook + requirements",
            detail:
              "Commit Git du notebook et du `requirements.txt` : l'exploration devient un artefact traçable et rejouable.",
          },
        ],
      },
    ],
  },
  {
    id: "testing-notebooks",
    title: "Fiabiliser l'exploration",
    level: 3,
    intro:
      "L'EDA n'est pas du code jetable : des garde-fous simples évitent les conclusions fausses.",
    blocks: [
      {
        kind: "list",
        items: [
          "Assertions de cohérence en tête de notebook : `assert df[\"montant\"].min() >= 0`, `assert len(df) > 0` — si les données changent, le notebook échoue vite au lieu de produire des graphiques faux.",
          "Vérifier les invariants métier après chaque transformation : les totaux sont-ils conservés ? Les effectifs par segment sont-ils plausibles ?",
          "Fixer `random_state` partout où il y a de l'aléatoire (échantillonnage) : la reproductibilité commence ici.",
          "Relancer le notebook de haut en bas avant de conclure : l'ordre d'exécution réel doit correspondre à l'ordre logique.",
          "Versionner le notebook (Git) : une exploration est un travail intellectuel qui mérite un historique.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Le catalogue des fautes d'exploration, même chez les pratiquants avancés.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Le leakage non détecté",
            value:
              "Problem : une variable miraculeusement prédictive qui contient la réponse. Better : auditer chaque variable avec la question « serait-elle disponible au moment de la prédiction ? ».",
          },
          {
            label: "L'agrégat trompeur",
            value:
              "Problem : comparer des moyennes sur des populations aux structures différentes (paradoxe de Simpson). Better : désagréger par segment avant de conclure.",
          },
          {
            label: "Le survivorship bias",
            value:
              "Problem : analyser les clients actuels pour comprendre le churn — les partants sont absents. Better : inclure explicitement les disparus dans le périmètre.",
          },
          {
            label: "La fuite du futur dans les features",
            value:
              "Problem : normaliser ou imputer sur tout le dataset avant de séparer train/test. Better : séparer d'abord, ajuster ensuite uniquement sur le train.",
          },
          {
            label: "L'over-analyse",
            value:
              "Problem : trois semaines d'exploration pour un dataset simple, par peur de rater quelque chose. Better : timeboxer l'EDA, prioriser les questions métier.",
          },
          {
            label: "Les conclusions sur échantillon biaisé",
            value:
              "Problem : généraliser à partir des données disponibles sans décrire leurs limites. Better : documenter qui est couvert, qui manque, et ce que ça implique.",
          },
          {
            label: "Ignorer la fraîcheur",
            value:
              "Problem : explorer un extract vieux de six mois comme s'il décrivait aujourd'hui. Better : vérifier la date des données en premier, pas en dernier.",
          },
          {
            label: "Le notebook cimetière",
            value:
              "Problem : 200 cellules dont la moitié obsolètes, résultats non reproductibles. Better : nettoyer au fil de l'eau, relancer de haut en bas, synthétiser dans un rapport.",
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
          "Question d'abord : 3 à 5 questions métier écrites avant d'ouvrir le notebook.",
          "Rituel systématique : head/info/describe/value_counts sur tout nouveau dataset.",
          "Douter des données : ordres de grandeur, bornes impossibles, dates suspectes.",
          "Noter au fil de l'eau : chaque découverte en une phrase, chaque décision de nettoyage chiffrée.",
          "Séparer exploration et validation : les hypothèses se testent sur des données fraîches.",
          "Auditer le leakage : chaque variable passée au crible de la disponibilité en production.",
          "Visualiser tôt : un graphique révèle ce que les chiffres cachent.",
          "Timeboxer : l'EDA a une fin — quand les questions métier ont leurs réponses.",
          "Restituer : un rapport de dix minutes, pas un notebook brut.",
          "Versionner : le code d'exploration et de nettoyage est reproductible et historisé.",
        ],
      },
    ],
  },
  {
    id: "projet-eda-kaggle",
    title: "Projet : EDA complète publiée",
    level: 3,
    intro:
      "Mener une exploration de bout en bout sur un dataset public et la publier.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir un dataset riche",
            detail:
              "Un jeu de données avec des numériques, des catégories, des dates et des manquants : c'est la variété qui fait l'exercice.",
          },
          {
            title: "Formuler les questions",
            detail:
              "Écrire 5 questions avant de toucher aux données : elles structurent toute l'exploration.",
          },
          {
            title: "Explorer et noter",
            detail:
              "Appliquer le rituel, la batterie visuelle, les croisements métier. Noter chaque finding en une phrase.",
          },
          {
            title: "Nettoyer de façon reproductible",
            detail:
              "Tout le nettoyage dans le code, avec les chiffres (lignes supprimées, valeurs imputées).",
          },
          {
            title: "Publier le notebook",
            detail:
              "Un notebook qui se relance de haut en bas, avec une introduction, des conclusions, et des visualisations soignées.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-rapport-insights",
    title: "Projet : rapport d'insights business",
    level: 3,
    intro:
      "Transformer une exploration en recommandations pour un décideur.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Cadrer avec un commanditaire fictif",
            detail:
              "« La direction veut comprendre la baisse du panier moyen » : un destinataire et une décision à éclairer.",
          },
          {
            title: "Explorer de façon ciblée",
            detail:
              "Toutes les analyses convergent vers la question : segmentation, temporalité, comparaisons.",
          },
          {
            title: "Hiérarchiser les findings",
            detail:
              "Trois insights maximum, ordonnés par impact potentiel. Le reste en annexe.",
          },
          {
            title: "Rédiger le rapport",
            detail:
              "Contexte, qualité des données, findings (un graphique chacun), hypothèses, recommandations. Dix minutes de lecture.",
          },
          {
            title: "Présenter",
            detail:
              "Défendre le rapport à l'oral : c'est l'exercice complet du data scientist — voir `storytelling`.",
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
      "Aller plus loin, en commençant toujours par la documentation officielle.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          {
            label: "pandas",
            value:
              "Le guide utilisateur (« User Guide ») : les sections sur l'indexation, le groupby et les données manquantes sont la référence.",
          },
          {
            label: "seaborn",
            value:
              "Le tutoriel : chaque type de graphique statistique illustré sur des données réelles.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les notebooks d'exploration publiés sur Kaggle — lire le code des autres est la façon la plus rapide de progresser.",
          "Référence : « Think Stats » (Allen Downey, gratuit en ligne) pour l'exploration statistique en Python.",
          "Méthode : « Exploratory Data Analysis » (John Tukey) — le livre fondateur, pour comprendre l'esprit de la démarche.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "L'EDA maîtrisée, voici les prolongements naturels dans la roadmap Data Scientist.",
    blocks: [
      {
        kind: "list",
        items: [
          "`machine-learning` : modéliser sur des données que l'on comprend — l'EDA en est le préalable.",
          "`feature-engineering` : transformer les observations de l'exploration en variables pour les modèles.",
          "`experimentation` : tester rigoureusement les hypothèses nées de l'exploration.",
          "`data-viz` : approfondir les principes des visualisations de communication.",
          "Revenir à la roadmap : valider Analyse exploratoire et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

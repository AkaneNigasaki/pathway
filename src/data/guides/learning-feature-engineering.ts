import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du Feature Engineering : créer les variables
 * d'entrée des modèles — encodages, scaling, variables temporelles,
 * sélection, pipelines. 3 niveaux d'information (Aperçu / Pratique /
 * Approfondi) avec divulgation progressive. Tous les textes supportent le
 * code inline entre backticks.
 */
export const LEARNING_FEATURE_ENGINEERING: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est le feature engineering, pourquoi il bat souvent le choix de l'algorithme, et où il se situe.",
    blocks: [
      {
        kind: "text",
        text: "Le feature engineering consiste à créer les variables d'entrée (features) d'un modèle à partir des données brutes : encoder des catégories, agréger des historiques, extraire du signal des dates, sélectionner les variables utiles. C'est la traduction du monde réel en langage de modèle.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est décisif : un modèle ne voit que ce qu'on lui donne. Des features bien conçues — l'ancienneté d'un client, son panier moyen sur 30 jours, la récence de sa dernière visite — apportent souvent plus de performance qu'un algorithme sophistiqué sur des données pauvres. Dans les compétitions comme en production, c'est là que se gagnent les points.",
      },
      {
        kind: "text",
        text: "Sa place dans le pipeline : après l'exploration (on sait ce que contiennent les données) et avant l'entraînement. Et surtout : les mêmes transformations doivent s'appliquer à l'identique à l'entraînement et en production — d'où l'importance des pipelines, pas des scripts ad hoc.",
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : le modèle ne voit que ce qu'on lui donne",
    level: 1,
    intro:
      "L'idée centrale : la qualité des entrées borne la qualité des sorties.",
    blocks: [
      {
        kind: "diagram",
        title: "Le feature engineering dans la chaîne",
        lines: [
          "Données brutes (dates, textes, catégories, montants)",
          "     │",
          "     ▼",
          "Feature engineering (traduction en signal numérique)",
          "  ├── ce qui aide : ancienneté, récence, fréquences, ratios",
          "  ├── ce qui nuit : fuite du futur, bruit, redondance",
          "  └── encapsulé dans un PIPELINE (reproductible)",
          "     │",
          "     ▼",
          "Modèle (apprend sur ces features — et seulement celles-là)",
          "     │",
          "     ▼",
          "Prédiction (aussi bonne que les features le permettent)",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : passer du temps sur les features, c'est donner au modèle les yeux pour voir ; passer du temps sur l'algorithme avec de mauvaises features, c'est optimiser un aveugle. Et la règle d'or : toute transformation apprise sur les données (moyenne, catégories, seuils) doit être apprise sur l'entraînement uniquement — sinon c'est de la fuite de données.",
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
      "Ce qu'il faut maîtriser avant de construire des features sérieuses.",
    blocks: [
      {
        kind: "fields",
        title: "Bases requises",
        fields: [
          {
            label: "Python / pandas",
            value:
              "Filtrer, agréger (`groupby`), manipuler des dates : 80 % du feature engineering est de la manipulation pandas.",
          },
          {
            label: "Machine learning (bases)",
            value:
              "Comprendre comment les modèles consomment les features (échelles, cardinalités, valeurs manquantes) — voir `machine-learning`.",
          },
          {
            label: "EDA",
            value:
              "Avoir exploré les données avant de les transformer : on ne crée de bonnes features que sur des données comprises — voir `eda`.",
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
      "Installer scikit-learn, la bibliothèque de référence des transformations.",
    blocks: [
      {
        kind: "command",
        label: "Installer scikit-learn",
        command: "pip install scikit-learn pandas numpy",
        why: "`scikit-learn` fournit les transformateurs standards (encodage, scaling, imputation, sélection) et les pipelines qui les assemblent. C'est la bibliothèque de référence du ML classique en Python, stable et massivement documentée.",
        verify: "python -c \"import sklearn; print(sklearn.__version__)\"",
      },
    ],
  },
  {
    id: "premier-pipeline",
    title: "Premier pipeline",
    level: 2,
    intro:
      "Assembler transformations et modèle dans un pipeline : le réflexe professionnel dès le premier projet.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Séparer les types de colonnes",
            detail:
              "Lister les colonnes numériques (`num`) et catégorielles (`cat`) : chaque type aura ses transformations propres.",
          },
          {
            title: "Définir les transformations par type",
            detail:
              "Numériques : imputation par la médiane + standardisation. Catégorielles : imputation par le mode + encodage one-hot. Chaque étape est un objet scikit-learn nommé.",
          },
          {
            title: "Assembler avec ColumnTransformer",
            detail:
              "`ColumnTransformer` applique chaque sous-pipeline aux bonnes colonnes et concatène le résultat : une seule matrice en sortie.",
          },
          {
            title: "Séparer train/test AVANT",
            detail:
              "`train_test_split` d'abord : le pipeline s'ajuste (`fit`) uniquement sur le train, puis se contente de transformer (`transform`) le test.",
          },
          {
            title: "Vérifier la sortie",
            detail:
              "Contrôler la forme de la matrice transformée et l'absence de NaN : un pipeline qui produit des NaN silencieux empoisonne tout le modèle.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Pipeline de prétraitement complet",
        code: `import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

num = ["age", "anciennete_mois", "panier_moyen"]
cat = ["segment", "offre"]

preprocess = ColumnTransformer([
    ("num", Pipeline([
        ("impute", SimpleImputer(strategy="median")),
        ("scale", StandardScaler()),
    ]), num),
    ("cat", Pipeline([
        ("impute", SimpleImputer(strategy="most_frequent")),
        ("encode", OneHotEncoder(handle_unknown="ignore")),
    ]), cat),
])

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
X_train_t = preprocess.fit_transform(X_train)  # apprend + transforme
X_test_t = preprocess.transform(X_test)        # transforme seulement`,
      },
      {
        kind: "text",
        text: "Le point crucial : `fit_transform` sur le train, `transform` seul sur le test. Ajuster l'imputation ou le scaling sur le test (ou sur tout le dataset avant la séparation), c'est laisser le futur contaminer l'entraînement — du data leakage.",
      },
    ],
  },
  {
    id: "encodage-categories",
    title: "Encoder les catégories",
    level: 2,
    intro:
      "Les modèles mangent des nombres : convertir les catégories sans leur inventer un ordre.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "One-hot vs ordinal",
        code: `import pandas as pd
from sklearn.preprocessing import OneHotEncoder, OrdinalEncoder

# One-hot : une colonne binaire par modalité — PAS d'ordre implicite
# segment : ["A", "B", "C"] -> 3 colonnes 0/1
ohe = OneHotEncoder(handle_unknown="ignore", sparse_output=False)
print(ohe.fit_transform(df[["segment"]]))

# Ordinal : UNIQUEMENT si un ordre réel existe
# taille : ["S", "M", "L", "XL"] -> 0, 1, 2, 3
ord_enc = OrdinalEncoder(categories=[["S", "M", "L", "XL"]])
print(ord_enc.fit_transform(df[["taille"]]))`,
      },
      {
        kind: "text",
        text: "Règle : one-hot par défaut pour les catégories nominales (segment, ville, offre). Ordinal uniquement quand l'ordre est réel et significatif (tailles, niveaux de satisfaction). Encoder une catégorie nominale en 0/1/2/3 arbitraires fait croire au modèle que « C = 3 × A » — une absurdité mathématique qui dégrade l'apprentissage.",
      },
    ],
  },
  {
    id: "scaling",
    title: "Mettre à l'échelle",
    level: 2,
    intro:
      "Pourquoi standardiser, quand c'est indispensable, et quand c'est inutile.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "StandardScaler en pratique",
        code: `from sklearn.preprocessing import StandardScaler

# Centré-réduit : moyenne 0, écart-type 1
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_train[["age", "revenu"]])

# En production : réutiliser le scaler ajusté sur le train
X_prod_scaled = scaler.transform(X_nouvelles_donnees)`,
      },
      {
        kind: "fields",
        title: "Quand scaler",
        fields: [
          {
            label: "Indispensable",
            value:
              "Modèles à distance ou à gradient : k-NN, SVM, régression logistique/ridge, réseaux de neurones, descente de gradient. Sans scaling, la variable aux grandes valeurs écrase les autres.",
          },
          {
            label: "Inutile",
            value:
              "Arbres et forêts (random forest, gradient boosting) : ils découpent par seuils, l'échelle ne change rien. Scaler ne nuit pas, mais ne sert à rien.",
          },
          {
            label: "Ne jamais scaler",
            value:
              "Les colonnes one-hot (déjà 0/1) et les variables dont l'échelle absolue a un sens métier que l'on veut préserver pour l'interprétation.",
          },
        ],
      },
    ],
  },
  {
    id: "valeurs-manquantes-pipeline",
    title: "Gérer les manquants dans le pipeline",
    level: 2,
    intro:
      "L'imputation intégrée au pipeline : mêmes règles à l'entraînement et en production.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "SimpleImputer par type",
        code: `from sklearn.impute import SimpleImputer

# Numériques : médiane (robuste aux outliers)
imp_num = SimpleImputer(strategy="median")

# Catégorielles : modalité la plus fréquente
imp_cat = SimpleImputer(strategy="most_frequent")

# Alternative : valeur constante explicite ("inconnu")
imp_const = SimpleImputer(strategy="constant", fill_value="inconnu")`,
      },
      {
        kind: "text",
        text: "Pourquoi dans le pipeline : l'imputeur apprend la médiane sur le train et la réapplique en production — la règle est figée et reproductible. Imputer « à la main » dans un notebook puis oublier la valeur en production est une source classique de dérive. Et le rappel de l'EDA : ajouter un indicateur de manque (`col_manquant`) quand l'absence elle-même est informative.",
      },
    ],
  },
  {
    id: "variables-temporelles",
    title: "Extraire le signal des dates",
    level: 2,
    intro:
      "Une date brute ne sert à rien ; ses dérivées sont des features en or.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Features temporelles de base",
        code: `import pandas as pd
import numpy as np

df["date"] = pd.to_datetime(df["date"])

# Composantes calendaires
df["annee"] = df["date"].dt.year
df["mois"] = df["date"].dt.month
df["jour_semaine"] = df["date"].dt.dayofweek  # 0 = lundi
df["est_weekend"] = (df["jour_semaine"] >= 5).astype(int)

# Ancienneté et récence : souvent les plus prédictives
aujourdhui = df["date"].max()
df["anciennete_jours"] = (aujourdhui - df["date_inscription"]).dt.days
df["recence_jours"] = (aujourdhui - df["derniere_activite"]).dt.days

# Mois cyclique : décembre (12) est proche de janvier (1)
df["mois_sin"] = np.sin(2 * np.pi * df["mois"] / 12)
df["mois_cos"] = np.cos(2 * np.pi * df["mois"] / 12)`,
      },
      {
        kind: "text",
        text: "L'ancienneté et la récence sont presque toujours parmi les features les plus prédictives (churn, crédit, marketing). Le codage sin/cos évite l'absurdité « décembre = 12 × janvier » d'un mois encodé en entier brut. Règle anti-leakage : toute feature temporelle doit n'utiliser que l'information disponible à la date de la prédiction.",
      },
    ],
  },
  {
    id: "agregations",
    title: "Agréger l'historique",
    level: 2,
    intro:
      "Transformer un historique de transactions en features par client.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Features d'agrégation",
        code: `import pandas as pd

# Par client : comportement d'achat résumé
aggs = commandes.groupby("client_id").agg(
    nb_commandes=("commande_id", "nunique"),
    ca_total=("montant", "sum"),
    panier_moyen=("montant", "mean"),
    panier_max=("montant", "max"),
    premiere_commande=("date", "min"),
    derniere_commande=("date", "max"),
).reset_index()

# Fenêtres temporelles : le récent pèse plus que l'ancien
recent = commandes[commandes["date"] >= "2024-06-01"]
aggs_90j = recent.groupby("client_id")["montant"].agg(
    ca_90j="sum", nb_90j="count"
).reset_index()

clients = clients.merge(aggs, on="client_id", how="left")
clients = clients.merge(aggs_90j, on="client_id", how="left")`,
      },
      {
        kind: "text",
        text: "Les agrégations transforment « ce qui s'est passé » en « qui est ce client » : volume, fréquence, récence, montants. Les fenêtres (7, 30, 90 jours) capturent la dynamique : un client actif il y a 90 jours n'est pas un client actif aujourd'hui. C'est le cœur du feature engineering métier.",
      },
    ],
  },
  {
    id: "interactions-simples",
    title: "Interactions et ratios",
    level: 2,
    intro:
      "Combiner les variables : les ratios racontent souvent plus que les bruts.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Ratios et interactions",
        code: `import pandas as pd
import numpy as np

# Ratios : normalisent et révèlent
df["panier_moyen"] = df["ca_total"] / df["nb_commandes"].replace(0, np.nan)
df["taux_remplissage"] = df["nb_articles"] / df["nb_visites"].replace(0, np.nan)

# Différences : l'écart au groupe
df["ecart_panier_segment"] = (
    df["panier_moyen"]
    - df.groupby("segment")["panier_moyen"].transform("median")
)

# Interaction simple : combiner deux signaux
df["anciennete_x_activite"] = df["anciennete_jours"] * df["nb_90j"]`,
      },
      {
        kind: "list",
        items: [
          "Protéger les divisions par zéro : `.replace(0, np.nan)` avant de diviser.",
          "Les ratios métier (taux de conversion, panier moyen, fréquence) sont souvent plus parlants que les totaux bruts.",
          "L'écart à la médiane du segment contextualise : « ce client dépense 40 € de plus que son segment ».",
          "Ne pas multiplier les interactions au hasard : chacune doit avoir une justification métier, sinon c'est du bruit.",
        ],
      },
    ],
  },
  {
    id: "train-test-leakage",
    title: "Séparation train/test et leakage",
    level: 2,
    intro:
      "L'erreur la plus grave du feature engineering : laisser le futur contaminer l'entraînement.",
    blocks: [
      {
        kind: "text",
        text: "Le data leakage survient quand une feature contient — directement ou via une transformation — de l'information postérieure au moment de la prédiction. Symptôme typique : 99 % de performance en validation, effondrement en production.",
      },
      {
        kind: "fields",
        title: "Règles anti-leakage",
        fields: [
          {
            label: "Séparer d'abord",
            value:
              "`train_test_split` AVANT toute transformation. Tout `fit` (imputation, scaling, encodage) se fait sur le train uniquement.",
          },
          {
            label: "Dater les features",
            value:
              "Pour chaque feature temporelle : « cette information existait-elle à la date de prédiction ? » Une feature « nombre de jours avant résiliation » calculée après coup est une fuite.",
          },
          {
            label: "Méfier les agrégats",
            value:
              "Un « panier moyen » calculé sur toute la période incluant le futur contamine. Les agrégats doivent respecter la flèche du temps.",
          },
          {
            label: "Auditer les miracles",
            value:
              "Une feature miraculeusement prédictive est suspecte par défaut : vérifier son mode de calcul avant de célébrer.",
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
      "Les pièges classiques des premiers pipelines.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Scaler les dummies",
            value:
              "Problem : standardiser les colonnes one-hot (0/1) détruit leur interprétation. Better : scaler uniquement les numériques continues.",
          },
          {
            label: "Ordinal sur du nominal",
            value:
              "Problem : encoder les segments en 0/1/2 invente un ordre. Better : one-hot, sauf ordre réel.",
          },
          {
            label: "Fit sur tout le dataset",
            value:
              "Problem : `fit_transform` sur train+test avant la séparation. Better : séparer d'abord, `fit` sur le train seul.",
          },
          {
            label: "Oublier handle_unknown",
            value:
              "Problem : une nouvelle catégorie en production fait planter `OneHotEncoder`. Better : `handle_unknown=\"ignore\"`.",
          },
          {
            label: "Trop de features",
            value:
              "Problem : 500 features pour 1000 lignes — le modèle apprend du bruit. Better : sélectionner, régulariser, ou réduire.",
          },
          {
            label: "Features non reproductibles",
            value:
              "Problem : transformations dans un notebook, jamais rejouées en production. Better : tout dans un pipeline versionné.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "types-features",
    title: "Typologie des features",
    level: 3,
    intro:
      "Cinq familles de features, cinq logiques de construction.",
    blocks: [
      {
        kind: "table",
        headers: ["Famille", "Exemples", "Point d'attention"],
        rows: [
          ["Numériques brutes", "Âge, montant, durée", "Échelle, outliers, asymétrie"],
          ["Catégorielles", "Segment, offre, ville", "Cardinalité, nouvelles modalités"],
          ["Temporelles", "Ancienneté, récence, jour de semaine", "Flèche du temps, cyclicité"],
          ["Agrégées", "CA 90j, fréquence, max", "Fenêtre, fuite du futur"],
          ["Textuelles", "Avis, description, logs", "Représentation (TF-IDF, embeddings)"],
        ],
      },
      {
        kind: "text",
        text: "Chaque famille a ses transformations naturelles et ses pièges propres. Un bon feature store organise les features par famille : cela guide la maintenance et la réutilisation entre projets.",
      },
    ],
  },
  {
    id: "encodages-categoriels",
    title: "Encodages catégoriels en profondeur",
    level: 3,
    intro:
      "One-hot, ordinal, target, hashing : choisir selon la cardinalité et le modèle.",
    blocks: [
      {
        kind: "table",
        headers: ["Encodage", "Quand", "Limite"],
        rows: [
          ["One-hot", "Cardinalité faible (< 15), tout modèle", "Explosion dimensionnelle si cardinalité élevée"],
          ["Ordinal", "Ordre réel (tailles, niveaux)", "Interdit sur du nominal"],
          ["Target encoding", "Haute cardinalité (ville, produit), modèles linéaires", "Risque de leakage — validation croisée obligatoire"],
          ["Hashing", "Très haute cardinalité, streaming", "Collisions, non interprétable"],
          ["Frequency encoding", "Baseline rapide", "Perd l'identité des modalités"],
        ],
      },
      {
        kind: "text",
        text: "Règle de cardinalité : en dessous de ~15 modalités, one-hot sans hésiter. Entre 15 et 100, selon le modèle (les arbres gèrent mieux la cardinalité que les linéaires). Au-delà, target encoding ou hashing — avec les précautions qui s'imposent.",
      },
    ],
  },
  {
    id: "target-encoding",
    title: "Target encoding : puissant mais dangereux",
    level: 3,
    intro:
      "Remplacer une catégorie par la moyenne de la cible — en évitant le leakage.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Target encoding avec validation croisée",
        code: `import pandas as pd
import numpy as np
from sklearn.model_selection import KFold

def target_encode_cv(df, col, target, n_splits=5, smoothing=10):
    """Encode par la moyenne de la cible, calculée hors du pli (anti-leakage)."""
    global_mean = df[target].mean()
    encoded = pd.Series(index=df.index, dtype=float)
    kf = KFold(n_splits=n_splits, shuffle=True, random_state=42)
    for train_idx, val_idx in kf.split(df):
        means = df.iloc[train_idx].groupby(col)[target].mean()
        counts = df.iloc[train_idx].groupby(col)[target].count()
        # Lissage : les petites catégories tendent vers la moyenne globale
        smooth = (means * counts + global_mean * smoothing) / (counts + smoothing)
        encoded.iloc[val_idx] = df.iloc[val_idx][col].map(smooth).fillna(global_mean)
    return encoded`,
      },
      {
        kind: "text",
        text: "Deux protections : le calcul hors-pli (chaque ligne est encodée avec des statistiques calculées SANS elle) et le lissage (les catégories rares sont ramenées vers la moyenne globale). Sans ces deux garde-fous, le target encoding est une machine à sur-apprendre : le modèle « reconnaît » les catégories au lieu d'apprendre.",
      },
    ],
  },
  {
    id: "hashing-binning",
    title: "Hashing trick et binning",
    level: 3,
    intro:
      "Deux techniques pour les cardinalités extrêmes et les continus rebelles.",
    blocks: [
      {
        kind: "fields",
        title: "Principes",
        fields: [
          {
            label: "Hashing trick",
            value:
              "Hacher chaque modalité vers un nombre fixe de colonnes (ex. 2^10) : dimension bornée quelle que soit la cardinalité, nouvelles modalités gérées nativement. Prix : collisions (deux modalités partagent une colonne) et perte d'interprétabilité. Réservé aux très hautes cardinalités et au streaming.",
          },
          {
            label: "Binning (discrétisation)",
            value:
              "`pd.cut` (intervalles réguliers) ou `pd.qcut` (quantiles, effectifs égaux) : transformer un continu en catégories. Utile quand la relation est non monotone (l'effet de l'âge par tranche) ou pour la lisibilité métier. Prix : perte d'information à l'intérieur des classes.",
          },
          {
            label: "Quand préférer quoi",
            value:
              "Hashing : identifiants, tokens, cardinalité > 10 000. Binning : variable continue à effet non linéaire que l'on veut rendre lisible, ou à alimenter un modèle qui préfère les catégories.",
          },
        ],
      },
    ],
  },
  {
    id: "transformations-avancees",
    title: "Transformations des distributions",
    level: 3,
    intro:
      "Log, racine, Box-Cox, quantile : rendre les distributions digestes pour les modèles.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Stabiliser une distribution asymétrique",
        code: `import numpy as np
import pandas as pd

# log1p : la transformation la plus courante (montants, revenus)
# gère les zéros, compresse les grandes valeurs
df["log_montant"] = np.log1p(df["montant"])

# Alternative : racine carrée (moins agressive que le log)
df["sqrt_montant"] = np.sqrt(df["montant"])

# Comparer avant/après : l'asymétrie doit chuter
print("skew avant :", df["montant"].skew().round(2))
print("skew après :", df["log_montant"].skew().round(2))`,
      },
      {
        kind: "text",
        text: "Quand transformer : variable très asymétrique alimentant un modèle sensible à l'échelle (linéaire, k-NN, SVM). Quand ne pas transformer : arbres (insensibles à la monotonie des transformations), ou quand l'asymétrie elle-même est informative. Toujours comparer la performance avec et sans — la transformation est une hypothèse, pas un dogme.",
      },
    ],
  },
  {
    id: "interactions-polynomiales",
    title: "Interactions polynomiales",
    level: 3,
    intro:
      "Générer systématiquement les interactions — avec parcimonie.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "PolynomialFeatures",
        code: `from sklearn.preprocessing import PolynomialFeatures

# Génère x1, x2, x1², x1*x2, x2² : interactions + non-linéarités
poly = PolynomialFeatures(degree=2, include_bias=False)
X_poly = poly.fit_transform(X_train[["age", "anciennete_mois"]])

print(poly.get_feature_names_out(["age", "anciennete_mois"]))
# ['age' 'anciennete_mois' 'age^2' 'age anciennete_mois' 'anciennete_mois^2']`,
      },
      {
        kind: "text",
        text: "Usage : donner à un modèle linéaire la capacité de capturer des interactions et des courbures. Limite : explosion combinatoire (10 variables → 65 features au degré 2) — à réserver à un petit nombre de variables présélectionnées, suivie d'une régularisation (Ridge/Lasso) ou d'une sélection. Les interactions métier manuelles (ratios ciblés) battent presque toujours les interactions automatiques aveugles.",
      },
    ],
  },
  {
    id: "texte-tfidf",
    title: "Features textuelles : TF-IDF",
    level: 3,
    intro:
      "Transformer du texte en features numériques exploitables par les modèles classiques.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "TfidfVectorizer",
        code: `from sklearn.feature_extraction.text import TfidfVectorizer

# TF-IDF : valorise les mots fréquents dans le document
# mais rares dans le corpus ("problème" dit plus que "le")
vec = TfidfVectorizer(
    max_features=1000,      # limite la dimension
    ngram_range=(1, 2),     # mots seuls + paires ("service client")
    min_df=5,               # ignore les mots trop rares
    stop_words="english",   # retire les mots vides (ou liste française)
)
X_text = vec.fit_transform(df["avis"])

print("Dimensions :", X_text.shape)
print(vec.get_feature_names_out()[:10])`,
      },
      {
        kind: "list",
        items: [
          "`fit` sur le train uniquement : le vocabulaire appris ne doit pas inclure le test.",
          "`max_features` + `min_df` : contrôler la dimension et le bruit — 1000 à 5000 features est un bon point de départ.",
          "Les n-grammes capturent des expressions (« service client », « ne fonctionne pas ») que les mots seuls ratent.",
          "Limite : TF-IDF ignore l'ordre global et le sens (synonymes = features différentes) — les embeddings vont plus loin.",
        ],
      },
    ],
  },
  {
    id: "embeddings-texte",
    title: "Embeddings : le sens en vecteurs",
    level: 3,
    intro:
      "Quand le sens des mots compte plus que leur fréquence.",
    blocks: [
      {
        kind: "text",
        text: "Les embeddings représentent chaque texte par un vecteur dense où la proximité géométrique reflète la proximité sémantique : « excellent service » et « très bon accueil » sont proches, même sans mot commun. On les obtient via des modèles pré-entraînés (sentence transformers) : une phrase devient un vecteur de quelques centaines de dimensions, utilisable directement comme features.",
      },
      {
        kind: "list",
        items: [
          "Avantage sur TF-IDF : capture les synonymes, la négation partielle, le sens global — et produit une dimension fixe et modeste.",
          "Coût : calcul plus lourd (inférence du modèle), features non interprétables individuellement.",
          "Usage typique : classifier des avis, détecter des doublons sémantiques, alimenter une recherche par similarité.",
          "Hybride courant : embeddings pour le sens + quelques features TF-IDF ciblées pour les termes métier précis.",
        ],
      },
    ],
  },
  {
    id: "variables-temporelles-avancees",
    title: "Variables temporelles avancées",
    level: 3,
    intro:
      "Lags, fenêtres glissantes, tendances : le passé comme feature.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Lags et moyennes glissantes",
        code: `import pandas as pd

# Trier par entité puis par date : indispensable
ts = df.sort_values(["client_id", "date"])

# Lag : la valeur du mois précédent (décalée, donc connue au moment t)
ts["ca_mois_precedent"] = ts.groupby("client_id")["ca_mensuel"].shift(1)

# Moyenne glissante des 3 derniers mois (excluant le mois courant)
ts["ca_moy_3m"] = (
    ts.groupby("client_id")["ca_mensuel"]
    .transform(lambda s: s.shift(1).rolling(3, min_periods=1).mean())
)

# Tendance : pente récente (différence sur 3 mois)
ts["tendance_3m"] = ts.groupby("client_id")["ca_mensuel"].transform(
    lambda s: s.shift(1).diff(3)
)`,
      },
      {
        kind: "text",
        text: "Le `shift(1)` est non négociable : sans lui, la feature inclurait le mois courant — une fuite du futur déguisée. Ces features (lags, rolling, tendances) sont le pain quotidien de la prévision de séries et du scoring comportemental. Toujours vérifier sur quelques cas à la main que le décalage est correct.",
      },
    ],
  },
  {
    id: "agregations-multiniveaux",
    title: "Agrégations multi-niveaux",
    level: 3,
    intro:
      "Agréger à plusieurs grains : client, segment, produit, période.",
    blocks: [
      {
        kind: "text",
        text: "Un client s'éclaire par ses groupes d'appartenance : son panier vs la médiane de son segment, sa fréquence vs celle de sa région, l'évolution de sa catégorie de produit. Les features « écart au groupe » (`transform`) et « rang dans le groupe » (`rank`) contextualisent chaque observation.",
      },
      {
        kind: "code",
        language: "python",
        title: "Features relatives au groupe",
        code: `import pandas as pd

g = df.groupby("segment")["panier_moyen"]

# Écart à la médiane du segment
df["ecart_segment"] = df["panier_moyen"] - g.transform("median")

# Rang dans le segment (0 = plus petit)
df["rang_segment"] = g.rank(pct=True)

# Part du client dans le CA de son segment
df["part_ca_segment"] = df["ca_total"] / g.transform("sum")`,
      },
      {
        kind: "list",
        items: [
          "Attention au leakage : les statistiques de groupe doivent être calculées sur le train (ou en temporel strict) quand elles alimentent un modèle.",
          "Les petits groupes produisent des statistiques bruitées : lisser vers la moyenne globale (comme pour le target encoding).",
          "Documenter chaque agrégation : grain, fenêtre, fonction — un feature store rend cela traçable.",
        ],
      },
    ],
  },
  {
    id: "selection-univariee",
    title: "Sélection univariée",
    level: 3,
    intro:
      "Filtrer les features une par une : rapide, simple, un bon premier tri.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "SelectKBest",
        code: `from sklearn.feature_selection import SelectKBest, f_classif, VarianceThreshold

# 1. Éliminer les constantes (variance nulle = aucune information)
vt = VarianceThreshold()
X_var = vt.fit_transform(X_train_t)

# 2. Garder les k features les plus liées à la cible (test F)
sel = SelectKBest(score_func=f_classif, k=20)
X_sel = sel.fit_transform(X_var, y_train)

# Quelles features ont survécu ?
print(sel.get_support())`,
      },
      {
        kind: "text",
        text: "Limites : l'univarié ignore les interactions (deux features inutiles seules peuvent être puissantes ensemble) et la redondance (deux features corrélées seront toutes deux gardées). C'est un dégrossissage, pas une sélection finale. `mutual_info_classif` est une alternative qui capte les relations non linéaires.",
      },
    ],
  },
  {
    id: "selection-modele",
    title: "Sélection par le modèle",
    level: 3,
    intro:
      "Laisser le modèle dire ce qui compte : importances et régularisation.",
    blocks: [
      {
        kind: "fields",
        title: "Approches",
        fields: [
          {
            label: "Importances (arbres)",
            value:
              "Les forêts aléatoires et le gradient boosting fournissent `feature_importances_` : utile pour le tri, mais biaisé vers les variables à haute cardinalité et les corrélées. À lire comme un indice, pas un verdict.",
          },
          {
            label: "Lasso (L1)",
            value:
              "La régularisation L1 annule les coefficients des features inutiles : sélection intégrée à l'apprentissage. Efficace sur les problèmes linéaires avec beaucoup de features.",
          },
          {
            label: "Permutation importance",
            value:
              "Mélanger une feature et mesurer la chute de performance : agnostique au modèle, plus fiable que les importances natives, mais coûteux à calculer.",
          },
          {
            label: "SHAP",
            value:
              "Attribution rigoureuse de la contribution de chaque feature à chaque prédiction : la référence pour l'interprétabilité, utilisable aussi pour la sélection.",
          },
        ],
      },
    ],
  },
  {
    id: "rfe",
    title: "RFE : élimination récursive",
    level: 3,
    intro:
      "Éliminer itérativement les features les moins utiles.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Recursive Feature Elimination",
        code: `from sklearn.feature_selection import RFE
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline

# RFE : entraîne, élimine la moins utile, recommence
rfe = RFE(
    estimator=LogisticRegression(max_iter=1000),
    n_features_to_select=15,
)
X_rfe = rfe.fit_transform(X_train_t, y_train)

# Intégré au pipeline pour une validation honnête
pipe = Pipeline([
    ("preprocess", preprocess),
    ("select", rfe),
    ("model", LogisticRegression(max_iter=1000)),
])`,
      },
      {
        kind: "text",
        text: "RFE tient compte des interactions (contrairement à l'univarié) mais coûte cher (un entraînement par élimination). Point crucial : la sélection doit faire partie du pipeline validé par cross-validation — sélectionner sur tout le dataset puis valider, c'est du leakage de sélection.",
      },
    ],
  },
  {
    id: "correlation-redondance",
    title: "Redondance et multicolinéarité",
    level: 3,
    intro:
      "Détecter les features qui disent deux fois la même chose.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Repérer les paires redondantes",
        code: `import pandas as pd
import numpy as np

corr = pd.DataFrame(X_train_t).corr().abs()

# Paires avec |corrélation| > 0.9 : candidates à la suppression
fortes = np.where(np.triu(corr > 0.9, k=1))
for i, j in zip(*fortes):
    print(f"Colonnes {i} et {j} : r = {corr.iloc[i, j]:.2f}")`,
      },
      {
        kind: "text",
        text: "Pourquoi c'est un problème : pour les modèles linéaires, la multicolinéarité rend les coefficients instables et ininterprétables ; pour tous les modèles, elle ajoute du bruit et du temps de calcul. Stratégie : garder la feature la plus interprétable ou la plus liée à la cible, écarter sa jumelle. Les arbres s'en moquent — mais la simplicité profite à tout le monde.",
      },
    ],
  },
  {
    id: "imputation-avancee",
    title: "Imputation avancée",
    level: 3,
    intro:
      "Au-delà de la médiane : KNN et indicateur de manque.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "KNNImputer et indicateur",
        code: `import numpy as np
import pandas as pd
from sklearn.impute import KNNImputer

# KNN : impute par les voisins les plus proches (tient compte des relations)
imp = KNNImputer(n_neighbors=5)
X_knn = imp.fit_transform(X_train[["age", "revenu", "anciennete_mois"]])

# Indicateur de manque : l'absence elle-même est une information
for col in ["revenu", "telephone"]:
    df[f"{col}_manquant"] = df[col].isna().astype(int)`,
      },
      {
        kind: "text",
        text: "KNNImputer exploite les relations entre variables — meilleur que la médiane quand les variables sont corrélées, mais plus coûteux et sensible à l'échelle (scaler d'abord). L'indicateur de manque, lui, est presque gratuit et souvent prédictif : ne jamais l'oublier dans l'arsenal.",
      },
    ],
  },
  {
    id: "echelles-robustes",
    title: "Mises à l'échelle robustes",
    level: 3,
    intro:
      "Quand StandardScaler ne suffit pas : outliers et distributions extrêmes.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "RobustScaler et alternatives",
        code: `from sklearn.preprocessing import RobustScaler, MinMaxScaler, QuantileTransformer

# RobustScaler : médiane et IQR au lieu de moyenne/écart-type
# -> insensible aux outliers
rob = RobustScaler()
X_rob = rob.fit_transform(X_train[["montant"]])

# MinMaxScaler : ramène dans [0, 1] (utile pour les réseaux de neurones)
mm = MinMaxScaler()
X_mm = mm.fit_transform(X_train[["montant"]])

# QuantileTransformer : force une distribution uniforme ou normale
# -> puissant, mais déforme les distances (à utiliser en connaissance de cause)
qt = QuantileTransformer(output_distribution="normal")
X_qt = qt.fit_transform(X_train[["montant"]])`,
      },
      {
        kind: "text",
        text: "Choisir selon les données : StandardScaler par défaut, RobustScaler si des outliers contaminent la moyenne et l'écart-type, QuantileTransformer pour les distributions très pathologiques alimentant des modèles sensibles. Comme toujours : comparer l'impact sur la validation, pas sur l'intuition.",
      },
    ],
  },
  {
    id: "leakage-deep",
    title: "Leakage : l'audit systématique",
    level: 3,
    intro:
      "Le piège le plus coûteux du feature engineering, traité en profondeur.",
    blocks: [
      {
        kind: "fields",
        title: "Sources de fuite",
        fields: [
          {
            label: "Fuite temporelle",
            value:
              "Feature calculée avec des données postérieures au moment de la prédiction (ex. « jours jusqu'à résiliation »). Défense : dater chaque feature, respecter la flèche du temps.",
          },
          {
            label: "Fuite de prétraitement",
            value:
              "Imputation, scaling, encodage ajustés sur train+test. Défense : pipeline avec `fit` sur le train uniquement.",
          },
          {
            label: "Fuite de sélection",
            value:
              "Sélection de features sur tout le dataset avant la validation croisée. Défense : sélection DANS le pipeline, donc dans chaque pli.",
          },
          {
            label: "Fuite de cible",
            value:
              "Variable dérivée de la cible (ex. « montant remboursé » pour prédire le défaut). Défense : pour chaque feature, demander « d'où vient cette information ? ».",
          },
          {
            label: "Fuite d'échantillonnage",
            value:
              "Doublons entre train et test (même client des deux côtés). Défense : séparation par entité (`GroupKFold`) quand les lignes ne sont pas indépendantes.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le test ultime : simuler la production. Prendre les données les plus récentes comme « futur », entraîner sur le passé, et vérifier que le pipeline peut tourner avec uniquement l'information disponible à l'époque. Si une feature est impossible à calculer dans ces conditions, c'est une fuite.",
      },
    ],
  },
  {
    id: "custom-transformers",
    title: "Transformateurs personnalisés",
    level: 3,
    intro:
      "Encapsuler la logique métier dans des transformateurs réutilisables.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Un transformateur sur mesure",
        code: `import numpy as np
import pandas as pd
from sklearn.base import BaseEstimator, TransformerMixin

class LogTransformer(BaseEstimator, TransformerMixin):
    """Applique log1p aux colonnes numériques : réutilisable dans un pipeline."""

    def fit(self, X, y=None):
        return self  # rien à apprendre

    def transform(self, X):
        X = X.copy()
        num_cols = X.select_dtypes("number").columns
        X[num_cols] = np.log1p(X[num_cols].clip(lower=0))
        return X

# Utilisation dans un pipeline standard
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

pipe = Pipeline([
    ("log", LogTransformer()),
    ("scale", StandardScaler()),
])`,
      },
      {
        kind: "text",
        text: "Le contrat scikit-learn : `fit` apprend (et retourne `self`), `transform` applique. En héritant de `BaseEstimator`/`TransformerMixin`, le transformateur devient compatible avec `Pipeline`, `ColumnTransformer` et `GridSearchCV` — y compris le clonage pour la validation croisée. C'est ainsi que la logique métier devient un composant industrialisable.",
      },
    ],
  },
  {
    id: "pipelines-avances",
    title: "Pipelines avancés",
    level: 3,
    intro:
      "Composer des pipelines complexes : branches, fonctions, hyperparamètres.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "FunctionTransformer et recherche",
        code: `import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import FunctionTransformer, OneHotEncoder

# Appliquer une fonction pandas arbitraire dans le pipeline
def ajouter_ratios(X):
    X = X.copy()
    X["panier_moyen"] = X["ca_total"] / X["nb_commandes"].replace(0, float("nan"))
    return X

pipe = Pipeline([
    ("ratios", FunctionTransformer(ajouter_ratios)),
    ("encode", ColumnTransformer([
        ("cat", OneHotEncoder(handle_unknown="ignore"), ["segment"]),
    ], remainder="passthrough")),
])

# Les hyperparamètres du prétraitement sont optimisables comme ceux du modèle
params = {"encode__cat__min_frequency": [1, 5, 10]}`,
      },
      {
        kind: "text",
        text: "`FunctionTransformer` intègre n'importe quelle fonction pandas dans le pipeline — la porte d'entrée pour la logique métier. `remainder=\"passthrough\"` conserve les colonnes non transformées. Et les paramètres des transformateurs (`encode__cat__min_frequency`) peuvent être optimisés par `GridSearchCV` au même titre que ceux du modèle : le prétraitement fait partie du modèle.",
      },
    ],
  },
  {
    id: "validation-croisee",
    title: "Validation croisée des features",
    level: 3,
    intro:
      "Valider le pipeline entier, pas seulement le modèle.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Cross-validation du pipeline complet",
        code: `from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score, GroupKFold
from sklearn.pipeline import Pipeline

pipe = Pipeline([
    ("preprocess", preprocess),
    ("model", LogisticRegression(max_iter=1000)),
])

# La CV rejoue TOUT le pipeline dans chaque pli :
# imputation, encodage, scaling réappris à chaque fois -> honnête
scores = cross_val_score(pipe, X, y, cv=5, scoring="roc_auc")
print(f"AUC : {scores.mean():.3f} ± {scores.std():.3f}")

# Données groupées (plusieurs lignes par client) : séparer par groupe
gkf = GroupKFold(n_splits=5)
scores_g = cross_val_score(pipe, X, y, cv=gkf.split(X, y, groups=df["client_id"]))`,
      },
      {
        kind: "text",
        text: "Le principe : tout ce qui « apprend » des données (imputation, scaling, encodage, sélection) doit être réappris dans chaque pli. `cross_val_score` sur le pipeline le garantit automatiquement. `GroupKFold` évite que le même client se retrouve des deux côtés — indispensable quand les lignes ne sont pas indépendantes.",
      },
    ],
  },
  {
    id: "feature-store",
    title: "Feature store : industrialiser",
    level: 3,
    intro:
      "Du notebook au système : centraliser les définitions de features.",
    blocks: [
      {
        kind: "text",
        text: "Un feature store est un système qui centralise la définition, le calcul, le stockage et la mise à disposition des features : les mêmes features servent à l'entraînement (batch, données historiques) et à l'inférence (temps réel ou batch), avec une garantie de cohérence. Il répond au problème du « training-serving skew » : le modèle en production ne voit pas les mêmes features qu'à l'entraînement.",
      },
      {
        kind: "list",
        items: [
          "Définition unique : chaque feature a un propriétaire, une formule, une fraîcheur documentée.",
          "Point-in-time correctness : pour l'entraînement, récupérer la valeur de la feature TELLE QU'ELLE ÉTAIT à la date de l'événement — pas sa valeur actuelle.",
          "Version minimaliste : un module Python versionné + des tables matérialisées + des tests — avant d'investir dans une plateforme dédiée.",
          "Réutilisation : les features bien conçues (ancienneté, récence, agrégats) servent à plusieurs modèles.",
        ],
      },
    ],
  },
  {
    id: "derive-donnees",
    title: "Dérive des features",
    level: 3,
    intro:
      "Les features vieillissent : détecter quand leur distribution change.",
    blocks: [
      {
        kind: "text",
        text: "La dérive (drift) survient quand la distribution d'une feature en production s'éloigne de celle de l'entraînement : changement de comportement, bug d'alimentation, évolution du produit. Conséquence : le modèle, calibré sur l'ancien monde, se trompe sur le nouveau.",
      },
      {
        kind: "list",
        items: [
          "Surveillance : comparer régulièrement les distributions (moyenne, quantiles, taux de manquants) entre référence et production.",
          "Tests statistiques : Kolmogorov-Smirnov pour les continues, chi² pour les catégories — avec des seuils d'alerte.",
          "Causes fréquentes : changement de formulaire (nouveaux manquants), modification d'un calcul amont, saisonnalité non anticipée.",
          "Réponse : investiguer la cause, réentraîner si la dérive est structurelle, corriger la source si c'est un bug.",
        ],
      },
    ],
  },
  {
    id: "curse-dimensionality",
    title: "Fléau de la dimension",
    level: 3,
    intro:
      "Pourquoi plus de features n'est pas toujours mieux.",
    blocks: [
      {
        kind: "text",
        text: "En haute dimension, les données deviennent clairsemées : les distances perdent leur sens (tous les points sont « loin » les uns des autres), et le modèle a besoin d'exponentiellement plus d'exemples pour apprendre. 1000 features pour 5000 lignes, c'est un désert où chaque point est isolé.",
      },
      {
        kind: "list",
        items: [
          "Symptôme : performance qui stagne ou baisse quand on ajoute des features.",
          "Parades : sélection (univariée, modèle, RFE), régularisation (Lasso/Ridge), réduction de dimension (PCA — avec perte d'interprétabilité).",
          "Règle empirique : viser un ratio lignes/features confortable (au minimum 10:1, idéalement 100:1) — à adapter au bruit et au modèle.",
          "Les arbres résistent mieux que les modèles à distance, mais la parcimonie profite à tous : maintenance, vitesse, interprétabilité.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Le catalogue des fautes de feature engineering.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Le leakage temporel",
            value:
              "Problem : feature calculée avec le futur. Better : dater chaque feature, `shift(1)` systématique sur les lags.",
          },
          {
            label: "Le fit sur le test",
            value:
              "Problem : imputation/scaling ajustés sur tout le dataset. Better : pipeline, `fit` sur le train uniquement.",
          },
          {
            label: "La sélection avant la CV",
            value:
              "Problem : choisir les features sur tout le dataset puis valider. Better : sélection dans le pipeline.",
          },
          {
            label: "L'encodage qui explose",
            value:
              "Problem : one-hot sur 5000 modalités → matrice géante. Better : target encoding, hashing, ou regroupement.",
          },
          {
            label: "Les features corrélées en masse",
            value:
              "Problem : 20 variantes du même signal. Better : détecter (|r| > 0,9), garder la plus interprétable.",
          },
          {
            label: "Le train-serving skew",
            value:
              "Problem : features calculées différemment en production. Better : même code (pipeline sérialisé ou feature store).",
          },
          {
            label: "L'over-engineering",
            value:
              "Problem : 200 features artisanales dont 190 inutiles. Better : commencer simple, ajouter sur la base de la validation.",
          },
          {
            label: "Ignorer la dérive",
            value:
              "Problem : features qui changent de distribution sans surveillance. Better : monitoring des distributions en production.",
          },
        ],
      },
    ],
  },
  {
    id: "testing-pipelines",
    title: "Tester ses pipelines",
    level: 3,
    intro:
      "Des tests simples qui évitent les catastrophes silencieuses.",
    blocks: [
      {
        kind: "list",
        items: [
          "Tester les transformateurs custom sur des cas limites : DataFrame vide, colonne entièrement manquante, nouvelles catégories.",
          "Assertions post-transformation : pas de NaN (`assert not np.isnan(X_t).any()` quand c'est attendu), dimensions stables, types corrects.",
          "Test de non-régression : sur un jeu figé, la sortie du pipeline doit être identique d'une version à l'autre (détecte les changements involontaires).",
          "Test d'idempotence métier : les mêmes entrées produisent les mêmes features, quel que soit l'ordre des lignes.",
          "En production : valider les features à l'inférence (bornes, types) avant de les donner au modèle — un modèle reçoit ce qu'on lui donne, même absurde.",
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
          "Pipeline dès le début : jamais de transformation hors pipeline, même en exploration avancée.",
          "Séparer avant de transformer : le `fit` ne voit que le train.",
          "Justifier chaque feature : une raison métier ou une preuve par la validation — pas les deux manquantes.",
          "Commencer simple : baseline avec features évidentes, puis itérer mesuré.",
          "Documenter : définition, grain, fenêtre, source de chaque feature.",
          "Versionner : le code des features évolue comme le code du modèle.",
          "Surveiller en production : distributions, manquants, fraîcheur.",
          "Préférer l'interprétable : à performance égale, la feature comprise gagne.",
          "Automatiser avec mesure : les interactions automatiques suivies de sélection, pas d'empilement aveugle.",
          "Revue par un pair : un regard neuf repère les leakages que l'auteur ne voit plus.",
        ],
      },
    ],
  },
  {
    id: "projet-amelioration",
    title: "Projet : amélioration mesurée d'un modèle",
    level: 3,
    intro:
      "Le projet canonique : faire gagner des points par les features, pas par l'algorithme.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Établir la baseline",
            detail:
              "Un modèle simple (régression logistique) avec les features brutes : c'est le score à battre, avec une validation croisée propre.",
          },
          {
            title: "Explorer pour générer des idées",
            detail:
              "EDA ciblée : quelles variables métier manquent ? Quels historiques ? Quelles interactions suggère le domaine ?",
          },
          {
            title: "Construire par itérations",
            detail:
              "Ajouter les features par paquets thématiques (temporelles, agrégées, interactions), mesurer le gain de chaque paquet en CV.",
          },
          {
            title: "Sélectionner",
            detail:
              "Élaguer : univarié, importances, RFE — garder le sous-ensemble parcimonieux qui conserve la performance.",
          },
          {
            title: "Figer dans un pipeline",
            detail:
              "Le pipeline final (prétraitement + sélection + modèle) sérialisé, testé, documenté : c'est le livrable, pas le score.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-feature-store",
    title: "Projet : feature store minimal",
    level: 3,
    intro:
      "Industrialiser des features réutilisables avec des moyens simples.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définir le catalogue",
            detail:
              "Lister 10 à 15 features transverses (ancienneté, récence, agrégats 30/90j) avec pour chacune : définition, grain, fenêtre, source, fraîcheur.",
          },
          {
            title: "Écrire les définitions en code",
            detail:
              "Un module Python versionné : chaque feature = une fonction testée, avec ses tests unitaires.",
          },
          {
            title: "Matérialiser",
            detail:
              "Calculer en batch et stocker (parquet, table SQL) : les consommateurs lisent, ne recalculent pas.",
          },
          {
            title: "Garantir le point-in-time",
            detail:
              "Pour l'entraînement : reconstruire les features à date passée. Documenter la méthode — c'est le point le plus délicat.",
          },
          {
            title: "Monitorer",
            detail:
              "Distributions et fraîcheur surveillées ; alertes sur dérive. Un feature store sans monitoring est une dette.",
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
            label: "scikit-learn — preprocessing",
            value:
              "Le guide utilisateur sur le prétraitement : chaque transformateur documenté avec exemples et précautions.",
          },
          {
            label: "scikit-learn — pipelines",
            value:
              "Composer les étapes, optimiser les hyperparamètres du prétraitement, valider honnêtement.",
          },
          {
            label: "scikit-learn — feature selection",
            value:
              "Le tour d'horizon des méthodes de sélection, avec leurs hypothèses.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Livre : « Feature Engineering for Machine Learning » (Zheng & Casari) — la référence sur les principes et les techniques.",
          "Pratique : les compétitions Kaggle — lire les solutions des gagnants, c'est un masterclass de feature engineering.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Le feature engineering maîtrisé, voici les prolongements naturels dans la roadmap Data Scientist.",
    blocks: [
      {
        kind: "list",
        items: [
          "`machine-learning` : exploiter les features avec des modèles bien évalués et réglés.",
          "`deployment` : mettre les pipelines en production via un feature store et du monitoring.",
          "`experimentation` : valider l'impact réel des modèles en production par des tests rigoureux.",
          "`eda` : revenir à l'exploration avec un œil de feature engineer — chaque dataset cache des features.",
          "Revenir à la roadmap : valider Feature Engineering et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

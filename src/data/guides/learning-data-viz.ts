import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de la Data Visualization : choisir la bonne
 * représentation, éviter les pièges visuels, produire des graphiques qui
 * font décider. 3 niveaux d'information (Aperçu / Pratique / Approfondi)
 * avec divulgation progressive. Tous les textes supportent le code inline
 * entre backticks.
 */
export const LEARNING_DATA_VIZ: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est la data visualization, pourquoi elle compte et où elle se situe dans le travail du data scientist.",
    blocks: [
      {
        kind: "text",
        text: "La data visualization (dataviz) transforme des données en représentations graphiques que l'œil humain interprète bien plus vite qu'un tableau de chiffres. Le cerveau détecte instantanément des motifs, des ruptures, des valeurs extrêmes sur un graphique — là où il faudrait des minutes pour lire les mêmes informations ligne par ligne.",
      },
      {
        kind: "text",
        text: "Pourquoi elle existe : un décideur ne lira jamais votre tableau de 10 000 lignes, mais il comprendra votre graphique en dix secondes. La dataviz est l'interface entre l'analyse et la décision : elle rend visible ce que les statistiques résument, et elle rend crédible ce que le texte affirme.",
      },
      {
        kind: "text",
        text: "Sa place dans le travail du data scientist : en exploration (comprendre les données avant de modéliser), en communication (présenter les résultats), et en pilotage (dashboards suivis dans le temps). La dataviz n'est pas une étape décorative à la fin — c'est un instrument de travail quotidien, dès l'analyse exploratoire.",
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : un graphique répond à une question",
    level: 1,
    intro:
      "L'idée centrale avant toute technique : on ne dessine pas des données, on répond visuellement à une question.",
    blocks: [
      {
        kind: "diagram",
        title: "Le réflexe du bon graphique",
        lines: [
          "Question précise (« les ventes baissent-elles ? »)",
          "     │",
          "     ▼",
          "Données pertinentes (les ventes, par mois, par segment)",
          "     │",
          "     ▼",
          "Forme adaptée (ligne pour le temps, barres pour comparer)",
          "     │",
          "     ▼",
          "Design sobre (un message, pas de décoration)",
          "     │",
          "     ▼",
          "Titre qui conclut (« -18 % depuis mars sur le segment B »)",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : un bon graphique fait comprendre une réponse en quelques secondes ; un mauvais graphique fait douter des données. La différence ne vient pas de l'outil (matplotlib, seaborn, Plotly font tous le travail) mais de trois choix : la bonne question, la bonne forme, et l'honnêteté du design.",
      },
      {
        kind: "fields",
        title: "Les trois questions avant de tracer",
        fields: [
          {
            label: "Quelle est la question ?",
            value:
              "« Comparer », « montrer une évolution », « révéler une distribution » : la question détermine la forme. Sans question claire, le graphique sera décoratif.",
          },
          {
            label: "Qui regarde ?",
            value:
              "Un analyste explore (graphiques denses, interactifs) ; un dirigeant décide (un message par visuel, chiffres clés). Le même jeu de données ne se présente pas pareil aux deux.",
          },
          {
            label: "Que doit-on en retenir ?",
            value:
              "Si vous ne pouvez pas formuler la conclusion en une phrase, le graphique n'est pas prêt. Le titre doit porter cette conclusion, pas décrire les axes.",
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
    intro:
      "Ce qu'il faut maîtriser avant de produire des visualisations sérieuses, et pourquoi chaque prérequis compte.",
    blocks: [
      {
        kind: "fields",
        title: "Bases requises",
        fields: [
          {
            label: "Python",
            value:
              "Manipuler des listes, des dictionnaires, importer des bibliothèques : la dataviz du data scientist se code en Python, elle ne se clique pas.",
          },
          {
            label: "pandas",
            value:
              "Charger un CSV, filtrer, agréger (`groupby`) : un graphique se trace presque toujours sur un DataFrame préparé, pas sur des données brutes.",
          },
          {
            label: "Statistiques de base",
            value:
              "Savoir ce qu'on représente (moyenne, médiane, distribution, incertitude) pour choisir des graphiques honnêtes et pertinents — voir la compétence `statistics`.",
          },
          {
            label: "Jupyter",
            value:
              "Le notebook est l'environnement naturel de l'exploration visuelle : itérer vite, voir le graphique sous le code.",
          },
        ],
      },
      {
        kind: "text",
        text: "Chaque prérequis est cliquable dans la roadmap : si un point est fragile, consolidez-le d'abord, puis revenez. Une bibliothèque graphique ne compensera jamais une mauvaise préparation des données.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Installer la pile de visualisation Python standard : matplotlib, seaborn, Plotly.",
    blocks: [
      {
        kind: "command",
        label: "Installer les bibliothèques de visualisation",
        command: "pip install matplotlib seaborn plotly pandas jupyter",
        why: "Installe en une fois la pile standard : `matplotlib` (la fondation, contrôle total), `seaborn` (graphiques statistiques élégants par-dessus matplotlib), `plotly` (graphiques interactifs), `pandas` (préparation des données) et `jupyter` (l'environnement d'exploration). Ce sont des paquets stables et massivement utilisés.",
        verify: "python -c \"import matplotlib, seaborn, plotly, pandas; print('OK')\"",
      },
      {
        kind: "text",
        text: "Astuce environnement : installez dans un environnement virtuel (`python -m venv venv`) pour isoler les dépendances du projet. Sur une machine avec peu de données mobiles, préférez une seule installation bien choisie plutôt que d'empiler les bibliothèques.",
      },
    ],
  },
  {
    id: "premier-graphique",
    title: "Premier graphique",
    level: 2,
    intro:
      "Tracer une courbe avec matplotlib en cinq minutes, et comprendre chaque ligne.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Importer matplotlib",
            detail:
              "`import matplotlib.pyplot as plt` : le module `pyplot` est l'interface de traçage la plus directe. L'alias `plt` est une convention universelle — utilisez-la.",
          },
          {
            title: "Préparer les données",
            detail:
              "Deux listes Python suffisent pour commencer : les abscisses (ex. les mois) et les ordonnées (ex. les ventes). En pratique, ces données viendront d'un DataFrame pandas.",
          },
          {
            title: "Tracer",
            detail:
              "`plt.plot(mois, ventes, marker=\"o\")` dessine la courbe ; `marker=\"o\"` ajoute un point sur chaque valeur pour les rendre lisibles.",
          },
          {
            title: "Étiqueter",
            detail:
              "`plt.xlabel`, `plt.ylabel` et `plt.title` : un graphique sans étiquettes est inutilisable par quelqu'un d'autre que vous.",
          },
          {
            title: "Afficher et sauvegarder",
            detail:
              "`plt.show()` affiche dans le notebook ; `plt.savefig(\"ventes.png\", dpi=150)` écrit le fichier. Sauvegardez toujours AVANT `plt.show()` dans un script : après l'affichage, la figure est vidée.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Premier graphique matplotlib",
        code: `import matplotlib.pyplot as plt

mois = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"]
ventes = [120, 135, 128, 150, 162, 158]

plt.figure(figsize=(8, 4))
plt.plot(mois, ventes, marker="o")
plt.xlabel("Mois")
plt.ylabel("Ventes (k€)")
plt.title("Ventes mensuelles")
plt.tight_layout()
plt.savefig("ventes.png", dpi=150)
plt.show()`,
      },
    ],
  },
  {
    id: "anatomie-matplotlib",
    title: "Anatomie d'une figure matplotlib",
    level: 2,
    intro:
      "Figure, Axes, Axis : comprendre la hiérarchie des objets pour arrêter de copier-coller du code sans le comprendre.",
    blocks: [
      {
        kind: "diagram",
        title: "La hiérarchie matplotlib",
        lines: [
          "Figure (la fenêtre / l'image entière)",
          " └── Axes (la zone de traçage : un graphique)",
          " │    ├── Axis X (l'axe horizontal : ticks, labels)",
          " │    ├── Axis Y (l'axe vertical)",
          " │    └── les artistes (courbes, barres, textes)",
          " └── éventuellement : 2e, 3e Axes (sous-graphiques)",
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Style objet : explicite et réutilisable",
        code: `import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(8, 4))  # fig = Figure, ax = Axes
ax.plot(mois, ventes, marker="o")
ax.set_xlabel("Mois")
ax.set_ylabel("Ventes (k€)")
ax.set_title("Ventes mensuelles")
ax.grid(True, alpha=0.3)
fig.tight_layout()
fig.savefig("ventes.png", dpi=150)`,
      },
      {
        kind: "text",
        text: "Deux styles coexistent : le style `pyplot` (`plt.plot(...)`, implicite, rapide) et le style objet (`ax.plot(...)`, explicite). Le style objet est préférable dès que le graphique a plus d'une courbe, plusieurs sous-graphiques, ou doit être réutilisé : tout est nommé, rien n'est magique.",
      },
    ],
  },
  {
    id: "seaborn-statistique",
    title: "Seaborn : les graphiques statistiques en une ligne",
    level: 2,
    intro:
      "Seaborn construit sur matplotlib des graphiques statistiques élégants directement depuis un DataFrame.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Trois graphiques essentiels avec seaborn",
        code: `import seaborn as sns
import pandas as pd

df = pd.read_csv("clients.csv")

# Distribution d'une variable
sns.histplot(data=df, x="age", bins=20, kde=True)

# Comparaison par catégorie
sns.boxplot(data=df, x="segment", y="panier_moyen")

# Relation entre deux variables
sns.scatterplot(data=df, x="anciennete_mois", y="panier_moyen", hue="segment")`,
      },
      {
        kind: "text",
        text: "Pourquoi seaborn plutôt que matplotlib pur : il comprend les DataFrames (`data=df, x=..., y=...`), gère les catégories automatiquement (`hue` colore par groupe) et produit des styles soignés par défaut. Règle pratique : seaborn pour explorer et communiquer vite, matplotlib pur quand il faut un contrôle total du design.",
      },
      {
        kind: "list",
        items: [
          "`histplot` : la forme d'une distribution (avec `kde=True` pour la courbe de densité).",
          "`boxplot` : comparer des distributions entre catégories (médiane, quartiles, outliers).",
          "`scatterplot` : relation entre deux variables numériques, `hue` pour un troisième axe catégoriel.",
          "`heatmap` : matrices de corrélation — le réflexe en analyse exploratoire.",
          "`pairplot` : toutes les paires de variables d'un coup, pour une première exploration.",
        ],
      },
    ],
  },
  {
    id: "plotly-interactif",
    title: "Plotly : l'interactivité",
    level: 2,
    intro:
      "Quand le graphique doit être exploré par quelqu'un d'autre : zoom, survol, filtres.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Graphique interactif avec plotly.express",
        code: `import plotly.express as px
import pandas as pd

df = pd.read_csv("ventes.csv")

fig = px.bar(
    df,
    x="segment",
    y="ca",
    color="segment",
    title="Chiffre d'affaires par segment",
    labels={"ca": "CA (k€)", "segment": "Segment"},
)
fig.show()              # interactif dans le notebook
fig.write_html("ca.html")  # fichier partageable, s'ouvre dans un navigateur`,
      },
      {
        kind: "text",
        text: "Quand choisir Plotly : pour un graphique destiné à être exploré (survol des valeurs, zoom sur une période, export autonome en HTML). Quand l'éviter : pour une figure statique dans un rapport PDF ou une publication — matplotlib y est plus précis et plus léger. `plotly.express` (`px`) couvre 90 % des besoins ; l'API `graph_objects` (`go`) sert aux assemblages complexes.",
      },
    ],
  },
  {
    id: "notebooks-environnement",
    title: "Notebooks : l'environnement de travail",
    level: 2,
    intro:
      "Jupyter est l'atelier naturel de la dataviz : écrire, voir, ajuster en boucle courte.",
    blocks: [
      {
        kind: "command",
        label: "Lancer Jupyter",
        command: "jupyter notebook",
        why: "Démarre le serveur Jupyter et ouvre l'interface dans le navigateur. Chaque cellule de code s'exécute indépendamment et le graphique s'affiche juste en dessous : la boucle « modifier → voir » prend quelques secondes, idéale pour itérer sur un design.",
        verify: "jupyter --version",
      },
      {
        kind: "list",
        items: [
          "Une cellule = une étape : chargement des données, préparation, un graphique par cellule.",
          "Nommez les notebooks par intention (`01-exploration-ventes.ipynb`), pas `untitled-3.ipynb`.",
          "Relancez tout de haut en bas avant de partager : un notebook dont les cellules ont été exécutées dans le désordre est un piège.",
          "Le notebook est un brouillon : le graphique final destiné à un rapport mérite un script propre et versionné.",
        ],
      },
    ],
  },
  {
    id: "choisir-graphique",
    title: "Choisir le bon graphique",
    level: 2,
    intro:
      "La décision la plus importante : chaque question a sa forme.",
    blocks: [
      {
        kind: "table",
        headers: ["Question", "Graphique", "Pourquoi"],
        rows: [
          ["Comparer des catégories", "Barres", "La longueur se compare d'un coup d'œil ; base à zéro obligatoire"],
          ["Évolution dans le temps", "Ligne", "La pente montre la tendance ; les points marquent les valeurs"],
          ["Distribution d'une variable", "Histogramme", "La forme (asymétrie, pics) saute aux yeux"],
          ["Relation entre deux variables", "Nuage de points", "Chaque point est une observation ; la forme du nuage parle"],
          ["Part d'un tout (peu de parts)", "Barres (pas camembert)", "Les angles se comparent mal ; les longueurs bien"],
          ["Corrélation entre variables", "Heatmap", "La matrice colorée révèle les blocs de variables liées"],
          ["Comparaison de distributions", "Boxplot / violon", "Médiane, dispersion et outliers en une image"],
        ],
      },
      {
        kind: "text",
        text: "Le camembert (pie chart) mérite son avertissement : l'œil compare très mal les angles et les aires. Au-delà de trois ou quatre parts, préférez des barres horizontales triées — la comparaison devient immédiate et honnête.",
      },
    ],
  },
  {
    id: "flux-travail",
    title: "Flux de travail professionnel",
    level: 2,
    intro:
      "De la question au graphique partagé : une méthode reproductible.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Formuler la question en une phrase",
            detail:
              "« Le panier moyen baisse-t-il depuis le changement de pricing ? » — pas « faire un graphique sur les ventes ». La question guide le choix des données et de la forme.",
          },
          {
            title: "Préparer les données dans pandas",
            detail:
              "Filtrer, agréger, calculer les indicateurs. Un graphique se trace sur des données propres et agrégées au bon niveau — jamais sur la table brute.",
          },
          {
            title: "Choisir la forme",
            detail:
              "Appliquer le tableau de correspondance question → graphique. En cas d'hésitation, tracer deux formes et garder celle qui répond le plus vite.",
          },
          {
            title: "Tracer sobrement",
            detail:
              "Supprimer tout ce qui ne sert pas le message : grilles trop marquées, légendes redondantes, 3D, bordures. Le ratio encre-données doit être maximal.",
          },
          {
            title: "Titrer avec la conclusion",
            detail:
              "Remplacer « Ventes par mois » par « Les ventes reculent de 18 % depuis mars ». Le lecteur pressé ne lit que le titre : il doit repartir avec le message.",
          },
          {
            title: "Vérifier l'honnêteté",
            detail:
              "Axe Y à zéro pour les barres ? Échelle non trompeuse ? Données manquantes signalées ? Un graphique malhonnête détruit la confiance durablement.",
          },
          {
            title: "Exporter et partager",
            detail:
              "`savefig` avec un DPI suffisant (150 pour le web, 300 pour l'impression), nom de fichier explicite, et le code versionné pour pouvoir régénérer.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-graphiques",
    title: "Déboguer ses graphiques",
    level: 2,
    intro:
      "Les problèmes les plus fréquents quand le graphique ne ressemble pas à ce qu'on voulait.",
    blocks: [
      {
        kind: "fields",
        title: "Diagnostic rapide",
        fields: [
          {
            label: "Figure vide ou blanche",
            value:
              "Vérifier que les données ne sont pas vides (`df.empty`, `len(x)`). En script, appeler `plt.savefig()` AVANT `plt.show()` : après l'affichage, la figure est réinitialisée.",
          },
          {
            label: "Graphiques qui se superposent",
            value:
              "matplotlib réutilise la figure courante : créer une nouvelle figure (`plt.figure()` ou `plt.subplots()`) avant chaque graphique, ou fermer avec `plt.close()`.",
          },
          {
            label: "Labels qui se chevauchent",
            value:
              "`plt.tight_layout()` ajuste automatiquement les marges. Pour les dates sur l'axe X : `fig.autofmt_xdate()` pivote les étiquettes.",
          },
          {
            label: "Caractères accentués affichés en carrés",
            value:
              "La police par défaut ne couvre pas certains glyphes. Changer de police via `plt.rcParams[\"font.family\"]` ou installer une police complète — jamais de texte sans accents comme contournement durable.",
          },
          {
            label: "Courbe en dents de scie",
            value:
              "`plt.plot` relie les points dans l'ordre du tableau : trier par l'axe X (`df.sort_values(\"date\")`) avant de tracer une série temporelle.",
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
      "Les pièges classiques des premières visualisations.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Le camembert à douze parts",
            value:
              "Problem : illisible, les petites parts sont indiscernables. Better : barres horizontales triées par valeur décroissante.",
          },
          {
            label: "L'axe Y des barres qui ne part pas de zéro",
            value:
              "Problem : des différences de 2 % ressemblent à un effondrement. Better : base à zéro pour les barres ; pour les courbes, signaler explicitement si l'axe est zoomé.",
          },
          {
            label: "Le double axe Y sans raison",
            value:
              "Problem : deux échelles différentes sur un même graphique invitent à comparer l'incomparable. Better : deux graphiques alignés, ou une normalisation explicite.",
          },
          {
            label: "Trop de couleurs",
            value:
              "Problem : douze couleurs = douze catégories que personne ne retient. Better : une couleur pour le message, du gris pour le contexte ; 5-6 catégories maximum par graphique.",
          },
          {
            label: "Le titre descriptif",
            value:
              "Problem : « Ventes 2024 » n'apprend rien. Better : un titre qui conclut — « Les ventes reculent de 18 % depuis mars ».",
          },
          {
            label: "Tracer avant de nettoyer",
            value:
              "Problem : les valeurs aberrantes ou manquantes déforment l'échelle et le message. Better : explorer avec `df.describe()` et `df.isna().sum()` avant le premier graphique.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "grammaire-graphiques",
    title: "La grammaire des graphiques",
    level: 3,
    intro:
      "Derrière chaque graphique : des données, des esthétiques, des géométries. Comprendre cette grammaire rend le choix de forme systématique.",
    blocks: [
      {
        kind: "text",
        text: "La « grammaire des graphiques » (Leland Wilkinson) décompose toute visualisation en couches : les données, les esthétiques (quelles variables vont sur quels canaux visuels : position, couleur, taille), les géométries (points, lignes, barres), les échelles et les facettes. seaborn et plotly.express appliquent cette idée : vous déclarez `x`, `y`, `hue`, `size` — la bibliothèque choisit la géométrie.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est utile : au lieu de mémoriser « quel graphique pour quoi », on raisonne en variables. Une variable temporelle + une numérique → position X/Y + géométrie ligne. Une catégorie + une numérique → position + barres. Une troisième variable → couleur ou facette. Le choix devient une déduction, pas une recette.",
      },
    ],
  },
  {
    id: "variables-visuelles",
    title: "Les variables visuelles",
    level: 3,
    intro:
      "Position, longueur, angle, couleur, taille : l'œil ne les décode pas avec la même précision.",
    blocks: [
      {
        kind: "table",
        headers: ["Canal visuel", "Précision de lecture", "Usage recommandé"],
        rows: [
          ["Position sur un axe", "Excellente", "Comparaisons quantitatives : barres, points, lignes"],
          ["Longueur", "Très bonne", "Barres à base commune"],
          ["Angle / pente", "Moyenne", "Camemberts (à éviter), tendances sur courbes"],
          ["Aire", "Faible", "Bulles : ordre de grandeur seulement, jamais de précision"],
          ["Couleur (teinte)", "Faible pour quantitatif", "Catégories (5-6 max), jamais pour des valeurs continues"],
          ["Couleur (intensité)", "Moyenne", "Heatmaps, cartes choroplèthes : avec une échelle légendée"],
          ["Forme", "Faible", "Distinguer 3-4 séries sur un nuage de points"],
        ],
      },
      {
        kind: "text",
        text: "Conséquence pratique : encodez l'information la plus importante avec le canal le plus précis (la position). Réservez la couleur aux catégories et l'aire aux ordres de grandeur. Chaque fois qu'un graphique demande un effort pour être lu, c'est souvent qu'une variable quantitative a été encodée avec un canal faible.",
      },
    ],
  },
  {
    id: "perception-preattentive",
    title: "La perception pré-attentive",
    level: 3,
    intro:
      "Certains attributs visuels sont détectés en moins de 200 ms, avant même l'attention consciente.",
    blocks: [
      {
        kind: "text",
        text: "La couleur vive parmi le gris, la barre plus longue, le point isolé : le système visuel repère ces différences sans effort. C'est le mécanisme à exploiter pour guider le regard — et à respecter pour ne pas le parasiter.",
      },
      {
        kind: "list",
        items: [
          "Mettre en évidence : UNE série en couleur vive, tout le reste en gris — l'œil va directement au message.",
          "Éviter les fausses alertes : une couleur vive utilisée pour décorer attire l'œil vers du vide et fatigue la lecture.",
          "La taille et l'orientation fonctionnent aussi en pré-attentif, mais la couleur reste le levier le plus simple.",
          "Limite : au-delà de 5-6 éléments mis en évidence, plus rien ne ressort — le contraste a besoin de rareté.",
        ],
      },
    ],
  },
  {
    id: "echelles-axes",
    title: "Échelles et axes",
    level: 3,
    intro:
      "Linéaire, logarithmique, base à zéro : l'échelle change le message — d'où l'importance de la choisir consciemment.",
    blocks: [
      {
        kind: "fields",
        title: "Règles d'échelle",
        fields: [
          {
            label: "Barres : base à zéro, toujours",
            value:
              "La barre encode par sa longueur : tronquer l'axe ment sur les proportions. Sans exception pour les barres.",
          },
          {
            label: "Courbes : zéro recommandé, zoom justifié",
            value:
              "La courbe encode par la position : un axe zoomé est acceptable pour montrer une variation fine, mais il doit être signalé (rupture d'axe ou annotation).",
          },
          {
            label: "Échelle logarithmique",
            value:
              "Quand les valeurs couvrent plusieurs ordres de grandeur (ex. revenus, populations) : `ax.set_yscale(\"log\")`. Elle rend lisibles les petites valeurs sans écraser les grandes — mais elle doit être annoncée, car elle change la lecture des pentes.",
          },
          {
            label: "Axes comparables",
            value:
              "Deux graphiques côte à côte doivent partager la même échelle, sinon la comparaison visuelle est fausse. Avec matplotlib : `sharey=True` dans `plt.subplots`.",
          },
        ],
      },
    ],
  },
  {
    id: "couleurs",
    title: "La couleur : choisir des palettes honnêtes",
    level: 3,
    intro:
      "Trois types de palettes pour trois types de données — et des pièges à éviter.",
    blocks: [
      {
        kind: "table",
        headers: ["Données", "Palette", "Exemple d'usage"],
        rows: [
          ["Catégories sans ordre", "Qualitative (teintes distinctes)", "Segments clients, régions"],
          ["Valeurs ordonnées (séquentiel)", "Séquentielle (clair → foncé)", "Heatmap de corrélation, intensité"],
          ["Écart à une référence", "Divergente (deux teintes + neutre)", "Évolution vs objectif, positif/négatif"],
        ],
      },
      {
        kind: "text",
        text: "Pièges classiques : l'arc-en-ciel (rainbow) pour des valeurs continues — il crée de fausses frontières là où les données sont lisses ; le rouge-vert pour coder bon/mauvais — illisible pour les daltoniens (8 % des hommes) ; trop de teintes — au-delà de six catégories, regrouper ou facetter. seaborn propose des palettes sûres (`color_palette(\"colorblind\")`, `\"viridis\"`, `\"coolwarm\"`).",
      },
    ],
  },
  {
    id: "pieges-3d",
    title: "3D et chartjunk : le bruit visuel",
    level: 3,
    intro:
      "Tout ce qui décore sans informer nuit à la lecture — et la 3D est le pire décor.",
    blocks: [
      {
        kind: "text",
        text: "Le « chartjunk » (Edward Tufte) désigne tout l'encre qui ne porte pas de données : fonds en dégradé, bordures épaisses, effets 3D, icônes décoratives. La 3D sur des graphiques 2D est doublement nocive : elle fausse la perception des proportions (la perspective déforme les aires) et elle n'ajoute aucune information.",
      },
      {
        kind: "list",
        items: [
          "Supprimer : effets 3D, ombres portées, fonds en dégradé, bordures décoratives.",
          "Alléger : grilles fines et claires (`alpha=0.3`), ou pas de grille du tout si les valeurs sont annotées.",
          "Conserver : les étiquettes de données directement sur les points/barres quand il y en a peu — cela évite les allers-retours vers l'axe.",
          "Test : si on peut supprimer un élément sans perdre le message, il devait partir.",
        ],
      },
    ],
  },
  {
    id: "axes-trompeurs",
    title: "Les axes trompeurs",
    level: 3,
    intro:
      "Comment un graphique honnête en apparence peut mentir — et comment s'en prémunir.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue des manipulations",
        fields: [
          {
            label: "Axe tronqué",
            value:
              "Zoomer l'axe Y pour amplifier une variation de 2 %. Détection : vérifier toujours le bas de l'axe. Défense : exiger la base à zéro pour les barres, ou une mention explicite du zoom.",
          },
          {
            label: "Double axe Y",
            value:
              "Deux échelles arbitraires superposées : en changeant les bornes, on fabrique n'importe quelle corrélation visuelle. Défense : deux graphiques séparés avec la même échelle temporelle.",
          },
          {
            label: "Aire vs longueur",
            value:
              "Des pictogrammes dont la taille (aire) double quand la valeur double : l'œil perçoit une multiplication par quatre. Défense : n'encoder les quantités que par la longueur ou la position.",
          },
          {
            label: "Cherry-picking temporel",
            value:
              "Choisir la fenêtre de temps qui arrange (démarrer après un creux pour montrer une hausse). Défense : montrer la série longue, ou justifier la fenêtre.",
          },
          {
            label: "Moyennes qui cachent",
            value:
              "Une moyenne stable peut masquer une distribution qui s'étale. Défense : montrer la distribution (histogramme, boxplot), pas seulement l'agrégat.",
          },
        ],
      },
    ],
  },
  {
    id: "histogrammes-binning",
    title: "Histogrammes : l'art du découpage",
    level: 3,
    intro:
      "Le même jeu de données raconte des histoires différentes selon le nombre de classes.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Tester plusieurs découpages",
        code: `import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 3, figsize=(12, 3), sharey=True)
for ax, bins in zip(axes, [5, 20, 100]):
    ax.hist(df["panier_moyen"], bins=bins)
    ax.set_title(f"{bins} classes")
fig.tight_layout()`,
      },
      {
        kind: "text",
        text: "Trop peu de classes : on lisse les détails (une distribution bimodale ressemble à une cloche). Trop de classes : le bruit domine et la forme disparaît. Il n'y a pas de nombre magique : essayez plusieurs découpages et retenez celui qui révèle la structure sans inventer de pics. La courbe de densité (`kde=True` dans seaborn) aide à juger de la forme réelle.",
      },
    ],
  },
  {
    id: "distributions-avancees",
    title: "Comparer des distributions",
    level: 3,
    intro:
      "Histogramme, densité, boxplot, violon : quatre vues complémentaires d'une même distribution.",
    blocks: [
      {
        kind: "table",
        headers: ["Vue", "Montre", "Cache", "Quand l'utiliser"],
        rows: [
          ["Histogramme", "La forme exacte, les pics", "Les valeurs individuelles", "Explorer une variable"],
          ["Densité (KDE)", "La forme lissée", "Les discontinuités réelles", "Comparer plusieurs groupes superposés"],
          ["Boxplot", "Médiane, quartiles, outliers", "La forme (uni vs bimodal)", "Comparer vite beaucoup de groupes"],
          ["Violon", "Forme + quartiles", "Peut suggérer de fausses densités", "Montrer la forme par groupe"],
        ],
      },
      {
        kind: "text",
        text: "En pratique : le boxplot pour un premier tri entre groupes, l'histogramme ou la densité pour comprendre un groupe en détail. Et toujours se méfier d'une moyenne sans sa distribution — c'est le premier réflexe du data scientist face à un agrégat.",
      },
    ],
  },
  {
    id: "series-temporelles",
    title: "Séries temporelles",
    level: 3,
    intro:
      "Le temps a ses propres règles de visualisation : ordre, régularité, saisonnalité.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Préparer et tracer une série temporelle",
        code: `import pandas as pd
import matplotlib.pyplot as plt

df["date"] = pd.to_datetime(df["date"])
serie = df.sort_values("date").set_index("date")["ventes"]

fig, ax = plt.subplots(figsize=(10, 4))
ax.plot(serie.index, serie.values)
ax.set_title("Ventes quotidiennes")
fig.autofmt_xdate()  # pivote les dates pour les rendre lisibles
fig.tight_layout()`,
      },
      {
        kind: "list",
        items: [
          "Toujours trier par date avant de tracer : une courbe relie les points dans l'ordre du tableau.",
          "Convertir en datetime (`pd.to_datetime`) : matplotlib gère alors l'axe intelligemment (mois, années).",
          "Données bruitées au quotidien : ajouter une moyenne mobile (`serie.rolling(7).mean()`) en surimpression pour révéler la tendance.",
          "Annoter les événements (lancement, rupture, promo) : une rupture inexpliquée invite aux mauvaises interprétations.",
          "Plusieurs séries : même échelle, couleurs distinctes, légende sobre — ou petits multiples si les ordres de grandeur diffèrent.",
        ],
      },
    ],
  },
  {
    id: "correlations-nuages",
    title: "Nuages de points et corrélations",
    level: 3,
    intro:
      "Voir les relations entre variables — sans confondre corrélation et causalité.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Nuage de points avec tendance",
        code: `import seaborn as sns

# Chaque point = un client ; la couleur = le segment
sns.scatterplot(
    data=df, x="anciennete_mois", y="panier_moyen",
    hue="segment", alpha=0.6,
)
# Ajouter une tendance lissée pour guider l'œil
sns.regplot(
    data=df, x="anciennete_mois", y="panier_moyen",
    scatter=False, color="black",
)`,
      },
      {
        kind: "text",
        text: "`alpha=0.6` rend les points semi-transparents : là où ils se superposent, la couleur s'intensifie et révèle la densité. Pour beaucoup de points (> 10 000), préférez un hexbin (`plt.hexbin`) ou un échantillonnage — un nuage saturé ne montre plus rien. Et le rappel constant : une corrélation visible n'est pas une causalité démontrée.",
      },
    ],
  },
  {
    id: "petits-multiples",
    title: "Les petits multiples",
    level: 3,
    intro:
      "Quand il y a trop de catégories pour un seul graphique : répéter la même vue, une fois par groupe.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Facettes avec seaborn",
        code: `import seaborn as sns

# Une courbe par région, même échelle : la comparaison est immédiate
g = sns.relplot(
    data=df, x="mois", y="ventes",
    col="region", kind="line",
    col_wrap=3, height=3,
)
g.set_titles("{col_name}")`,
      },
      {
        kind: "text",
        text: "Le principe (Edward Tufte, « small multiples ») : la même échelle et le même design répétés permettent à l'œil de comparer les formes instantanément. C'est presque toujours préférable à douze courbes superposées dans des couleurs différentes. Avec matplotlib pur : `plt.subplots(nrows, ncols, sharex=True, sharey=True)`.",
      },
    ],
  },
  {
    id: "annotations",
    title: "Annotations et titres qui concluent",
    level: 3,
    intro:
      "Le graphique montre, le texte guide : annotations ciblées et titres qui portent le message.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Annoter un point clé",
        code: `fig, ax = plt.subplots(figsize=(8, 4))
ax.plot(serie.index, serie.values)
ax.annotate(
    "Rupture de stock",
    xy=("2024-03-15", 42),          # le point à expliquer
    xytext=("2024-02-01", 120),     # où placer le texte
    arrowprops=dict(arrowstyle="->", color="gray"),
    fontsize=10, color="dimgray",
)`,
      },
      {
        kind: "list",
        items: [
          "Titre = conclusion (« -18 % depuis mars sur le segment B »), pas description (« Ventes par mois »).",
          "Annoter les ruptures, les pics, les événements : ce que le lecteur ne peut pas deviner seul.",
          "Étiqueter directement les séries (texte au bout de la courbe) plutôt qu'une légende éloignée quand il y a peu de séries.",
          "Source et périmètre en petit en bas : « Source : CRM, janvier–juin 2024, n = 12 480 » — la crédibilité se joue là.",
        ],
      },
    ],
  },
  {
    id: "typographie-matplotlib",
    title: "Typographie et style matplotlib",
    level: 3,
    intro:
      "Un style cohérent via `rcParams` : régler une fois, appliquer partout.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Définir un style de projet",
        code: `import matplotlib.pyplot as plt

plt.rcParams.update({
    "figure.figsize": (8, 4),
    "figure.dpi": 150,
    "font.size": 11,
    "axes.spines.top": False,     # supprimer les bordures inutiles
    "axes.spines.right": False,
    "axes.grid": True,
    "grid.alpha": 0.3,
    "axes.titlesize": 13,
})`,
      },
      {
        kind: "text",
        text: "`rcParams` est le registre global des réglages matplotlib : en le configurant au début d'un script ou d'un notebook, tous les graphiques du projet partagent la même typographie, les mêmes marges, la même grille. Pour aller plus loin, seaborn propose `sns.set_theme(style=\"whitegrid\")` et matplotlib des feuilles de style (`plt.style.use(\"seaborn-v0_8-whitegrid\")`).",
      },
    ],
  },
  {
    id: "export-publication",
    title: "Exporter pour chaque usage",
    level: 3,
    intro:
      "Web, slide, impression, publication : le format et la résolution changent, le code reste le même.",
    blocks: [
      {
        kind: "table",
        headers: ["Usage", "Format", "Réglage"],
        rows: [
          ["Web / notebook", "PNG", "`dpi=150`, `bbox_inches=\"tight\"` pour rogner les marges"],
          ["Présentation", "PNG", "`dpi=200`, figure plus large (`figsize=(10, 5)`)"],
          ["Impression / rapport", "PDF ou SVG", "Vectoriel : net à tous les zooms, texte sélectionnable"],
          ["Publication scientifique", "PDF", "Police intégrée, taille de police ≥ 8 pt une fois réduit"],
        ],
      },
      {
        kind: "text",
        text: "`bbox_inches=\"tight\"` dans `savefig` évite les étiquettes coupées. Pour Plotly, `fig.write_html()` produit un fichier autonome partageable par email, et `fig.write_image()` (via le moteur kaleido) exporte en PNG statique.",
      },
    ],
  },
  {
    id: "interactivite-avancee",
    title: "Interactivité avancée",
    level: 3,
    intro:
      "Au-delà du survol : filtres, sélections croisées et dashboards légers.",
    blocks: [
      {
        kind: "text",
        text: "Plotly permet des interactions riches sans serveur : menus déroulants (`updatemenus`), curseurs (`sliders`), sélections croisées entre graphiques dans un dashboard. Pour un tableau de bord interne avec des contrôles (filtres par date, seuils), Streamlit transforme un script Python en application web en quelques lignes.",
      },
      {
        kind: "command",
        label: "Installer Streamlit",
        command: "pip install streamlit",
        why: "Streamlit exécute un script Python et génère une application web interactive : chaque widget (curseur, menu) relance le script avec la nouvelle valeur. Idéal pour prototyper un dashboard interne sans écrire de HTML ni de JavaScript.",
        verify: "streamlit --version",
      },
      {
        kind: "code",
        language: "python",
        title: "app.py — dashboard minimal",
        code: `import streamlit as st
import matplotlib.pyplot as plt
import pandas as pd

st.title("Pilotage des ventes")
df = pd.read_csv("ventes.csv")

seuil = st.slider("Seuil d'alerte (k€)", 0, 200, 100)
filtre = df[df["ventes"] >= seuil]

fig, ax = plt.subplots()
ax.bar(filtre["mois"], filtre["ventes"])
ax.axhline(seuil, color="red", linestyle="--", label="Seuil")
ax.legend()
st.pyplot(fig)`,
      },
      {
        kind: "command",
        label: "Lancer le dashboard",
        command: "streamlit run app.py",
        why: "Démarre le serveur local et ouvre le dashboard dans le navigateur. Chaque interaction avec un widget (le curseur ici) ré-exécute le script et met le graphique à jour instantanément.",
      },
    ],
  },
  {
    id: "dashboards",
    title: "Concevoir un dashboard",
    level: 3,
    intro:
      "Un dashboard n'est pas une collection de graphiques : c'est un instrument de pilotage.",
    blocks: [
      {
        kind: "list",
        items: [
          "5 à 8 indicateurs maximum : au-delà, plus personne ne les surveille vraiment.",
          "Hiérarchie visuelle : le KPI principal en grand en haut, les détails en dessous — l'œil suit le même chemin à chaque visite.",
          "Contexte sur chaque indicateur : valeur actuelle, évolution vs période précédente, objectif. Un chiffre seul ne dit rien.",
          "Cohérence temporelle : mêmes périodes, mêmes définitions partout. Un dashboard dont les chiffres se contredisent est abandonné.",
          "Rafraîchissement documenté : « données d'hier 18h » affiché clairement — un dashboard dont on ignore la fraîcheur inspire la méfiance.",
          "Destinataire unique : un dashboard pour le pilotage opérationnel n'a pas la même granularité qu'un dashboard de direction.",
        ],
      },
    ],
  },
  {
    id: "storytelling-visuel",
    title: "Storytelling visuel",
    level: 3,
    intro:
      "Faire raconter au graphique : séquence, mise en évidence, conclusion.",
    blocks: [
      {
        kind: "text",
        text: "Un graphique narratif se lit comme une phrase : le titre donne la conclusion, la mise en évidence montre où regarder, les annotations expliquent le pourquoi. Technique efficace : montrer d'abord le contexte en gris (toutes les séries), puis révéler la série qui porte le message en couleur — le lecteur comprend la comparaison sans effort.",
      },
      {
        kind: "list",
        items: [
          "Ordre de lecture : titre (conclusion) → zone mise en évidence → axes → détails.",
          "Une idée par graphique : deux messages = deux graphiques, ou un message perdu.",
          "Décliner plutôt que surcharger : le même jeu de données peut donner un graphique d'exploration (dense) et un graphique de présentation (épuré).",
          "La compétence `storytelling` de cette roadmap approfondit la narration complète au-delà du visuel.",
        ],
      },
    ],
  },
  {
    id: "design-coherence",
    title: "Cohérence visuelle",
    level: 3,
    intro:
      "Des graphiques qui se ressemblent inspirent confiance ; des styles disparates suggèrent des données disparates.",
    blocks: [
      {
        kind: "list",
        items: [
          "Palette fixe par projet : les mêmes catégories gardent les mêmes couleurs partout (le segment A est toujours bleu).",
          "Typographie unique : une police pour les titres, une pour le corps, tailles cohérentes.",
          "Format standard : mêmes dimensions, mêmes marges, même style de grille sur tous les graphiques d'un rapport.",
          "Centraliser dans le code : un module `style.py` qui applique les `rcParams` et expose la palette — jamais de couleurs en dur dispersées.",
          "Documenter les conventions : un court README visuel (« nos graphiques ») suffit pour une équipe.",
        ],
      },
    ],
  },
  {
    id: "accessibilite",
    title: "Accessibilité",
    level: 3,
    intro:
      "Un graphique que 8 % des hommes ne peuvent pas lire est un graphique raté.",
    blocks: [
      {
        kind: "list",
        items: [
          "Daltonisme : éviter le couple rouge/vert pour coder une opposition ; préférer bleu/orange, ou des palettes testées (`colorblind` de seaborn, `viridis`).",
          "Ne jamais coder l'information QUE par la couleur : doubler avec la forme, la position, ou des étiquettes directes.",
          "Contraste : texte gris très clair sur fond blanc = illisible projeté en salle. Tester en niveaux de gris : si le message survit, le design est sain.",
          "Taille de police : lisible à distance de présentation (≥ 11 pt dans la figure finale).",
          "Alternative textuelle : dans un rapport, une phrase résume le message du graphique pour les lecteurs d'écran.",
        ],
      },
    ],
  },
  {
    id: "incertitude",
    title: "Montrer l'incertitude",
    level: 3,
    intro:
      "Une valeur sans son incertitude est une affirmation ; avec, c'est une information.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Barres d'erreur et intervalles",
        code: `import numpy as np

# Moyenne et intervalle de confiance à 95 % par segment
stats = df.groupby("segment")["panier_moyen"].agg(["mean", "std", "count"])
stats["ic95"] = 1.96 * stats["std"] / np.sqrt(stats["count"])

fig, ax = plt.subplots()
ax.bar(stats.index, stats["mean"], yerr=stats["ic95"], capsize=4)
ax.set_ylabel("Panier moyen (€) ± IC 95 %")`,
      },
      {
        kind: "text",
        text: "Techniques : barres d'erreur sur les barres, zones ombrées (`ax.fill_between`) autour des courbes, annotations « n = … » pour signaler les petits échantillons. Règle d'or : si deux barres d'erreur se recouvrent largement, ne pas conclure à une différence — le graphique doit empêcher les conclusions abusives, pas les suggérer.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Le catalogue des fautes qui reviennent, même chez les pratiquants confirmés.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "L'agrégat sans la distribution",
            value:
              "Problem : une moyenne qui cache une distribution bimodale. Better : toujours regarder l'histogramme avant de résumer.",
          },
          {
            label: "Le graphique 3D",
            value:
              "Problem : la perspective fausse les proportions sans ajouter d'information. Better : 2D, toujours.",
          },
          {
            label: "L'échelle logarithmique non signalée",
            value:
              "Problem : des pentes qui semblent douces alors que la croissance est explosive. Better : annoncer l'échelle dans le titre ou l'étiquette d'axe.",
          },
          {
            label: "La légende cryptique",
            value:
              "Problem : « série1 », « var_x » — le lecteur doit deviner. Better : étiquettes en langage métier, unités précisées.",
          },
          {
            label: "Le spaghetti plot",
            value:
              "Problem : douze courbes superposées, illisibles. Better : petits multiples, ou mise en évidence d'une série sur fond gris.",
          },
          {
            label: "Les données manquantes invisibles",
            value:
              "Problem : matplotlib relie les points par-dessus les trous, suggérant une continuité fictive. Better : marquer les périodes sans données (zone grisée ou rupture).",
          },
          {
            label: "Le copier-coller de code non compris",
            value:
              "Problem : un graphique qui « marche » mais qu'on ne sait pas modifier. Better : comprendre Figure/Axes et le style objet avant d'empiler les exemples.",
          },
          {
            label: "Le dashboard poubelle",
            value:
              "Problem : vingt graphiques que personne ne consulte. Better : moins d'indicateurs, un destinataire, un rythme de consultation réel.",
          },
        ],
      },
    ],
  },
  {
    id: "performance-grands-volumes",
    title: "Performance sur gros volumes",
    level: 3,
    intro:
      "Tracer un million de points : ce qui ralentit, et comment y remédier.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le goulot : le rendu de chaque point individuel. Au-delà de ~100 000 points, un nuage brut devient lent ET illisible.",
          "Agréger avant de tracer : hexbin (`plt.hexbin`), histogramme 2D, ou échantillonnage stratifié — l'œil ne distingue de toute façon pas un million de points.",
          "Échantillonner intelligemment : `df.sample(10000, random_state=42)` pour explorer, tracer sur l'agrégat complet pour communiquer.",
          "Datashader existe pour les cas extrêmes (milliards de points), mais c'est un besoin rare : l'agrégation suffit presque toujours.",
          "Côté pandas : typer les colonnes (`dtype`), éviter les boucles Python sur les lignes — voir la compétence `eda`.",
        ],
      },
    ],
  },
  {
    id: "testing-graphiques",
    title: "Tester ses visualisations",
    level: 3,
    intro:
      "On ne teste pas la beauté d'un graphique, mais on teste ce qui l'alimente.",
    blocks: [
      {
        kind: "list",
        items: [
          "Tester les données en amont : assertions sur les bornes, les valeurs manquantes, les effectifs (`assert df[\"ca\"].min() >= 0`).",
          "Tester les fonctions de préparation : une fonction qui agrège doit retourner les bonnes valeurs sur un jeu de test connu.",
          "Tests de non-régression visuelle : comparer l'image générée à une référence (bibliothèques dédiées) — utile pour des rapports générés automatiquement.",
          "Vérifier les invariants : le total des parts = 100 %, les dates couvrent la période annoncée, les catégories sont celles attendues.",
          "Revue humaine : aucun test ne remplace un regard critique sur le graphique final avant diffusion.",
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
          "Question d'abord : aucun graphique sans une question formulée en une phrase.",
          "Sobriété : supprimer tout ce qui ne sert pas le message (chartjunk).",
          "Honnêteté : axes à zéro pour les barres, échelles annoncées, incertitudes montrées.",
          "Titre qui conclut : le lecteur pressé repart avec le message.",
          "Cohérence : mêmes couleurs, mêmes échelles, même style dans tout un projet.",
          "Accessibilité : lisible en noir et blanc, sans le seul recours à la couleur.",
          "Reproductibilité : le code qui génère le graphique est versionné et relançable.",
          "Données propres : explorer (`describe`, histogrammes) avant de présenter.",
          "Public cible : adapter la densité et le vocabulaire à qui regarde.",
          "Itération : le premier jet est un brouillon — montrer, écouter, simplifier.",
        ],
      },
    ],
  },
  {
    id: "projet-dashboard",
    title: "Projet : dashboard de pilotage",
    level: 3,
    intro:
      "Construire un tableau de bord complet sur un jeu de données réel.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir le périmètre",
            detail:
              "Un jeu de données métier (ventes, trafic, support) : 5 à 8 indicateurs qui comptent vraiment pour un destinataire identifié.",
          },
          {
            title: "Définir chaque indicateur",
            detail:
              "Formule exacte, périmètre, fréquence de mise à jour. Écrire ces définitions : c'est le contrat du dashboard.",
          },
          {
            title: "Prototyper en notebook",
            detail:
              "Tracer chaque indicateur avec matplotlib/seaborn, itérer sur les formes et les échelles.",
          },
          {
            title: "Assembler avec Streamlit",
            detail:
              "Un `app.py` avec filtres (période, segment) et les graphiques validés. Lancer avec `streamlit run app.py`.",
          },
          {
            title: "Faire tester par le destinataire",
            detail:
              "Observer sans guider : ce qui n'est pas compris en 30 secondes doit être simplifié ou expliqué.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-refonte",
    title: "Projet : refonte de visualisations trompeuses",
    level: 3,
    intro:
      "Le meilleur exercice de dataviz : corriger des graphiques qui mentent.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Collecter des exemples fautifs",
            detail:
              "Presse, rapports, réseaux sociaux : camemberts illisibles, axes tronqués, 3D. Constituer une galerie de 5 à 10 cas.",
          },
          {
            title: "Diagnostiquer",
            detail:
              "Pour chacun : qu'est-ce qui trompe ? (axe, échelle, encodage, cherry-picking) et quel est le message honnête des données ?",
          },
          {
            title: "Reconstruire",
            detail:
              "Reproduire les données approximatives et tracer la version honnête : bonne forme, bonne échelle, titre qui conclut.",
          },
          {
            title: "Présenter en avant/après",
            detail:
              "Le diptyque fautif/corrigé avec l'explication du piège : c'est un excellent portfolio, et un excellent entraînement de l'œil critique.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-rapport",
    title: "Projet : rapport automatisé",
    level: 3,
    intro:
      "Générer un rapport visuel régénérable d'un script unique.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Écrire le script de génération",
            detail:
              "Un script Python qui charge les données, applique le style du projet (`rcParams`), génère les 6 à 10 figures et les sauvegarde en PNG/PDF.",
          },
          {
            title: "Paramétrer la période",
            detail:
              "Le script accepte une date de début/fin en argument : le même code produit le rapport de janvier et celui de février.",
          },
          {
            title: "Assembler",
            detail:
              "Les figures s'intègrent dans un document (notebook exporté, ou HTML simple) avec un titre-conclusion par section.",
          },
          {
            title: "Automatiser",
            detail:
              "Planifier l'exécution (tâche planifiée du système) : le rapport se régénère seul, avec des données fraîches et des définitions stables.",
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
            label: "matplotlib",
            value:
              "La galerie d'exemples de la documentation officielle : des centaines de graphiques avec leur code source, la meilleure façon d'apprendre.",
          },
          {
            label: "seaborn",
            value:
              "Le tutoriel et la galerie : chaque fonction est illustrée sur des jeux de données réels.",
          },
          {
            label: "plotly",
            value:
              "La documentation de plotly.express : exemples interactifs pour chaque type de graphique.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Références : « Storytelling with Data » (Cole Nussbaumer Knaflic) pour la communication, « The Visual Display of Quantitative Information » (Edward Tufte) pour les principes.",
          "Catalogue de formes : le site « From Data to Viz » aide à choisir un graphique selon la nature des données.",
          "Pratique : refaire des graphiques publiés (presse, rapports) en version améliorée — l'exercice le plus formateur.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "La dataviz maîtrisée, voici les prolongements naturels dans la roadmap Data Scientist.",
    blocks: [
      {
        kind: "list",
        items: [
          "`eda` : systématiser l'exploration visuelle des données avant toute modélisation.",
          "`storytelling` : transformer des graphiques en récits qui font décider.",
          "`machine-learning` : visualiser les performances et les erreurs des modèles.",
          "`deployment` : industrialiser les dashboards et les rapports automatisés.",
          "Revenir à la roadmap : valider Data Visualization et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

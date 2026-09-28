import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de NumPy : du premier tableau au calcul vectorisé
 * professionnel. 3 niveaux d'information (Aperçu / Pratique / Approfondi)
 * avec divulgation progressive. Tous les textes supportent le code inline
 * entre backticks.
 */
export const LEARNING_NUMPY: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est NumPy et pourquoi tout le calcul scientifique Python repose dessus.",
    blocks: [
      {
        kind: "text",
        text: "NumPy est la bibliothèque de calcul numérique de Python : elle apporte les tableaux n-dimensionnels (`ndarray`) et des opérations mathématiques rapides, exécutées en C sous le capot. Là où une boucle Python traite des milliers d'éléments un par un, NumPy traite des millions d'un coup.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est fondamental : NumPy est la fondation de tout le stack scientifique Python — pandas, scikit-learn, PyTorch et la plupart des outils de data science sont construits dessus ou interopèrent avec ses tableaux. Sans NumPy, le calcul sur de gros volumes de données en Python serait des dizaines à des centaines de fois trop lent. Apprendre NumPy, c'est apprendre la grammaire du calcul numérique en Python.",
      },
    ],
  },
  {
    id: "pourquoi-vectoriser",
    title: "Pourquoi vectoriser",
    level: 1,
    intro:
      "L'idée centrale : remplacer les boucles Python par des opérations sur tableaux entiers.",
    blocks: [
      {
        kind: "diagram",
        title: "Boucle Python vs opération NumPy",
        lines: [
          "Boucle Python :",
          "  pour chaque élément :",
          "    interpréteur → vérifie le type → calcule → stocke",
          "    (1 million d'allers-retours dans l'interpréteur)",
          "",
          "NumPy :",
          "  a * 2  →  UNE opération, boucle en C",
          "    (mémoire contiguë, types natifs, CPU optimisé)",
        ],
      },
      {
        kind: "text",
        text: "Python est lent dans les boucles parce que chaque itération repasse par l'interpréteur (typage dynamique, vérifications). NumPy déplace la boucle dans du code C compilé qui travaille sur des blocs mémoire contigus de nombres natifs : même opération, 10 à 100 fois plus rapide. La « vectorisation » — écrire `a * 2` au lieu d'une boucle — est le réflexe numéro un à acquérir.",
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
      "Ce qu'il faut maîtriser en Python avant NumPy, et pourquoi.",
    blocks: [
      {
        kind: "fields",
        title: "Les fondations nécessaires",
        fields: [
          {
            label: "Listes et boucles",
            value:
              "Créer des listes, itérer, comprendre les compréhensions : NumPy remplace justement ces boucles par des opérations vectorielles — il faut savoir ce qu'on remplace.",
          },
          {
            label: "Fonctions",
            value:
              "Définir et appeler des fonctions : les opérations NumPy sont des fonctions appliquées à des tableaux entiers.",
          },
          {
            label: "Notions de types",
            value:
              "Comprendre qu'un `int` et un `float` se comportent différemment (division, précision) : les `dtype` NumPy rendent ces distinctions explicites et strictes.",
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
      "Installer NumPy dans un environnement Python propre.",
    blocks: [
      {
        kind: "command",
        label: "Installer NumPy dans un venv",
        command: "python -m venv .venv && source .venv/bin/activate && pip install numpy",
        why: "Crée un environnement virtuel isolé (`.venv`), l'active, puis y installe NumPy : les dépendances du projet ne polluent pas le Python système et chaque projet a ses propres versions. C'est la base de tout projet Python sérieux.",
        verify: "python -c \"import numpy; print(numpy.__version__)\"",
      },
      {
        kind: "text",
        text: "Sur Windows, remplacez `source .venv/bin/activate` par `.venv\\Scripts\\activate`. NumPy est livré avec des binaires précompilés pour les plateformes courantes : l'installation via `pip` ne nécessite aucune compilation dans la quasi-totalité des cas.",
      },
    ],
  },
  {
    id: "premier-tableau",
    title: "Premier tableau",
    level: 2,
    intro:
      "Créer un `ndarray`, inspecter sa forme et son type.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Créer et inspecter",
        code: "import numpy as np\n\na = np.array([1, 2, 3])\nprint(a)            # [1 2 3]\nprint(a.shape)      # (3,)  : 1 dimension, 3 éléments\nprint(a.dtype)      # int64 : type des éléments\nprint(a.ndim)       # 1     : nombre de dimensions\n\nb = np.array([[1, 2], [3, 4]])\nprint(b.shape)      # (2, 2) : 2 lignes, 2 colonnes",
      },
      {
        kind: "text",
        text: "Trois attributs à connaître par cœur : `shape` (les dimensions), `dtype` (le type des éléments — tous identiques, c'est la contrainte centrale de NumPy), `ndim` (le nombre de dimensions). Tout le reste — erreurs de broadcasting, indexation, algèbre linéaire — découle de la forme et du type.",
      },
    ],
  },
  {
    id: "creation-de-tableaux",
    title: "Création de tableaux",
    level: 2,
    intro:
      "Les fabriques de tableaux : zéros, uns, plages, aléatoire.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Les constructeurs essentiels",
        code: "import numpy as np\n\nnp.zeros((3, 3))        # 3x3 rempli de 0.0\nnp.ones((2, 4))         # 2x4 rempli de 1.0\nnp.full((2, 2), 7)       # 2x2 rempli de 7\nnp.arange(10)           # [0 1 2 ... 9] (comme range)\nnp.arange(0, 1, 0.2)    # [0.  0.2 0.4 0.6 0.8]\nnp.linspace(0, 1, 5)    # 5 valeurs régulières de 0 à 1\nnp.eye(3)               # matrice identité 3x3\nnp.random.default_rng(42).random((2, 3))  # aléatoire uniforme",
      },
      {
        kind: "text",
        text: "`arange` (pas entier) vs `linspace` (nombre de points) : pour des flottants, préférez `linspace` — `arange(0, 1, 0.1)` accumule des erreurs d'arrondi sur le pas. Pour l'aléatoire, utilisez le générateur moderne `np.random.default_rng(seed)` plutôt que les anciennes fonctions globales : il est reproductible et mieux conçu.",
      },
    ],
  },
  {
    id: "indexation-et-slicing",
    title: "Indexation et slicing",
    level: 2,
    intro:
      "Accéder aux éléments, lignes, colonnes et sous-tableaux.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Sélectionner des données",
        code: "import numpy as np\n\na = np.array([[1, 2, 3],\n              [4, 5, 6],\n              [7, 8, 9]])\n\na[0, 1]      # 2 : ligne 0, colonne 1\na[1]         # [4 5 6] : ligne 1 entière\na[:, 2]      # [3 6 9] : colonne 2 (toutes les lignes)\na[0:2, 1:3]  # [[2 3], [5 6]] : sous-tableau\n\na[a > 5]     # [6 7 8 9] : masque booléen",
      },
      {
        kind: "text",
        text: "La syntaxe `a[ligne, colonne]` avec une virgule est la marque de NumPy — pas `a[ligne][colonne]`. Le slicing `0:2` suit la convention Python (borne de fin exclue). Le masque booléen `a[a > 5]` est redoutablement expressif : « donne-moi tous les éléments qui vérifient cette condition ».",
      },
    ],
  },
  {
    id: "operations-vectorisees",
    title: "Opérations vectorisées",
    level: 2,
    intro:
      "Calculer sur des tableaux entiers sans écrire une seule boucle.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Arithmétique élément par élément",
        code: "import numpy as np\n\na = np.array([1, 2, 3, 4])\n\nprint(a * 2)        # [2 4 6 8]\nprint(a ** 2)       # [ 1  4  9 16]\nprint(a + 10)       # [11 12 13 14]\nprint(np.sqrt(a))   # racine carrée de chaque élément\nprint(np.exp(a))    # exponentielle de chaque élément\n\nb = np.array([10, 20, 30, 40])\nprint(a + b)        # [11 22 33 44] : élément par élément",
      },
      {
        kind: "text",
        text: "Les opérateurs `+`, `*`, `**` et les fonctions `np.sqrt`, `np.exp` s'appliquent à chaque élément : ce sont des ufuncs (universal functions), exécutées en C. Le réflexe à développer : dès que vous écrivez `for` sur un tableau NumPy, cherchez l'opération vectorisée équivalente — elle existe presque toujours.",
      },
    ],
  },
  {
    id: "broadcasting-les-bases",
    title: "Broadcasting : les bases",
    level: 2,
    intro:
      "Opérer entre tableaux de formes différentes sans boucle ni duplication.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Broadcasting en action",
        code: "import numpy as np\n\na = np.array([[1, 2, 3],\n              [4, 5, 6]])   # shape (2, 3)\n\nprint(a + 10)              # le scalaire s'étend à tout le tableau\nprint(a + np.array([10, 20, 30]))  # shape (3,) : ajouté à chaque ligne\n\n# Centrer des données : soustraire la moyenne de chaque colonne\nmeans = a.mean(axis=0)     # shape (3,)\nprint(a - means)",
      },
      {
        kind: "text",
        text: "Le broadcasting « étire » virtuellement le plus petit tableau pour qu'il corresponde au plus grand — sans copier de données. L'exemple du centrage (`a - means`) est le motif le plus courant en data science : soustraire une statistique par colonne à tout le tableau, en une ligne. Les règles précises sont détaillées en section Approfondi.",
      },
    ],
  },
  {
    id: "agregations",
    title: "Agrégations",
    level: 2,
    intro:
      "Résumer un tableau : sommes, moyennes, min/max — globalement ou par axe.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Statistiques descriptives",
        code: "import numpy as np\n\na = np.array([[1, 2, 3],\n              [4, 5, 6]])\n\na.sum()            # 21 : tout le tableau\na.mean()           # 3.5\na.min(), a.max()   # (1, 6)\na.std()            # écart-type\n\na.sum(axis=0)      # [5 7 9]  : somme par colonne\n# (axis=0 écrase les lignes, axis=1 écrase les colonnes)\na.mean(axis=1)     # [2. 5.]  : moyenne par ligne",
      },
      {
        kind: "text",
        text: "`axis=0` opère le long des lignes (résultat par colonne), `axis=1` le long des colonnes (résultat par ligne). Mémorisez-le ainsi : l'axe indiqué est celui qui disparaît du `shape`. C'est la source de confusion numéro un — vérifiez toujours le `shape` du résultat.",
      },
    ],
  },
  {
    id: "environnement",
    title: "Environnement de travail",
    level: 2,
    intro:
      "Où manipuler des tableaux confortablement : notebooks et scripts.",
    blocks: [
      {
        kind: "fields",
        title: "Les options",
        fields: [
          {
            label: "Jupyter",
            value: "L'environnement naturel de NumPy : exécution interactive, affichage formaté des tableaux, idéal pour explorer des données.",
          },
          {
            label: "Scripts Python",
            value: "Pour le code réutilisable : fonctions qui prennent et retournent des tableaux, testables et versionnables.",
          },
          {
            label: "Environnement virtuel",
            value: "Toujours un venv par projet (`python -m venv .venv`) avec un `requirements.txt` qui fige `numpy==...`.",
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
      "Le support NumPy dans l'éditeur.",
    blocks: [
      {
        kind: "fields",
        title: "Les options",
        fields: [
          {
            label: "VS Code",
            value: "Extensions officielles « Python » et « Jupyter » (Microsoft) : exécution de notebooks, visualiseur de tableaux, débogueur.",
          },
          {
            label: "PyCharm",
            value: "Visualiseur de tableaux intégré et excellent débogueur scientifique.",
          },
          {
            label: "JupyterLab",
            value: "Directement dans le navigateur, sans éditeur : parfait pour l'exploration pure.",
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
      "Les habitudes qui rendent le code NumPy fiable et lisible.",
    blocks: [
      {
        kind: "list",
        items: [
          "Vérifiez les `shape` aux points clés : un `assert a.shape == (n, m)` coûte rien et attrape les erreurs de dimension tôt.",
          "Fixez la graine aléatoire (`default_rng(42)`) pour des expériences reproductibles.",
          "Nommez les axes dans les commentaires quand le tableau a plus de 2 dimensions (`# (batch, temps, features)`).",
          "Évitez les boucles Python sur les tableaux : cherchez d'abord la version vectorisée.",
          "Figez les versions (`requirements.txt`) : les comportements par défaut évoluent entre versions de NumPy.",
        ],
      },
    ],
  },
  {
    id: "pieges-debutant",
    title: "Pièges de débutant",
    level: 2,
    intro:
      "Les trois erreurs que tout le monde commet en commençant.",
    blocks: [
      {
        kind: "list",
        items: [
          "Vue vs copie : `b = a[0:2]` ne copie pas — modifier `b` modifie `a`. Utilisez `.copy()` quand vous voulez un tableau indépendant.",
          "Division entière : avec des `int`, `a / 2` donne des flottants mais `a // 2` tronque. Vérifiez le `dtype` avant de diviser.",
          "Broadcasting silencieux : `a + b` avec des shapes compatibles mais inattendues ne lève pas d'erreur — vérifiez les shapes, pas seulement l'absence d'exception.",
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Le piège de la vue",
        code: "import numpy as np\n\na = np.array([1, 2, 3, 4])\nb = a[0:2]   # vue, PAS une copie !\nb[0] = 99\nprint(a)     # [99  2  3  4] : a est modifié !\n\nc = a[0:2].copy()  # vraie copie indépendante\nc[0] = 0\nprint(a[0])  # 99 : a n'est plus touché",
      },
    ],
  },
  {
    id: "premier-projet",
    title: "Projet : analyse de températures",
    level: 2,
    intro:
      "Analyser un relevé de températures avec les outils du niveau Pratique.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Charger les données",
            detail:
              "`np.loadtxt(\"temperatures.csv\", delimiter=\",\")` : un tableau 2D (jours × stations). Vérifiez le `shape`.",
          },
          {
            title: "Nettoyer",
            detail:
              "Repérez les valeurs aberrantes (ex. -999 pour « capteur en panne ») avec un masque booléen et remplacez-les par `np.nan`.",
          },
          {
            title: "Résumer",
            detail:
              "`np.nanmean(axis=0)` : température moyenne par station en ignorant les manquants. Min/max par jour avec `axis=1`.",
          },
          {
            title: "Comparer",
            detail:
              "Centrez les données (`a - moyennes`) et trouvez les jours les plus chauds par station avec `argmax`.",
          },
          {
            title: "Présenter",
            detail:
              "Affichez un résumé formaté : jamais de tableau brut sans contexte — un résultat s'accompagne d'unités et d'interprétation.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "ndarray-memoire",
    title: "ndarray et mémoire",
    level: 3,
    intro:
      "Ce qu'est vraiment un tableau NumPy : un bloc mémoire contigu plus des métadonnées.",
    blocks: [
      {
        kind: "text",
        text: "Un `ndarray`, c'est trois choses : un pointeur vers un bloc de mémoire contiguë, un `dtype` (type et taille de chaque élément), et un `shape` + des `strides` (combien d'octets sauter pour passer à l'élément suivant sur chaque axe). La contiguïté est la clé de la performance : le CPU charge la mémoire par blocs (lignes de cache), et un parcours séquentiel d'un bloc contigu est l'accès le plus rapide possible.",
      },
      {
        kind: "code",
        language: "python",
        title: "Observer les strides",
        code: "import numpy as np\n\na = np.zeros((3, 4), dtype=np.float64)\nprint(a.strides)  # (32, 8) : 4 * 8 octets par ligne, 8 par élément\nprint(a.flags)    # C_CONTIGUOUS : True",
      },
    ],
  },
  {
    id: "dtype",
    title: "Les dtypes",
    level: 3,
    intro:
      "Choisir le bon type : précision, mémoire et pièges de conversion.",
    blocks: [
      {
        kind: "fields",
        title: "Les dtypes courants",
        fields: [
          { label: "`int32` / `int64`", value: "Entiers. `int64` par défaut sur la plupart des plateformes — deux fois plus de mémoire que `int32` pour rien si vos valeurs sont petites." },
          { label: "`float32` / `float64`", value: "Flottants. `float64` par défaut ; `float32` divise la mémoire par deux et suffit souvent (deep learning l'utilise massivement)." },
          { label: "`bool`", value: "Masques et conditions : 1 octet par élément." },
          { label: "`complex128`", value: "Nombres complexes — traitement du signal, FFT." },
          { label: "`<U10`, `S20`", value: "Chaînes de longueur fixe (Unicode / bytes). Peu efficaces : pour du texte, préférez les structures Python ou pandas." },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Conversions et débordements",
        code: "import numpy as np\n\na = np.array([1, 2, 3], dtype=np.int32)\nprint(a.dtype)                    # int32\nb = a.astype(np.float64)          # conversion explicite\n\nc = np.array([200], dtype=np.uint8)\nprint((c + 100)[0])               # 44 ! débordement silencieux (300 mod 256)",
      },
      {
        kind: "text",
        text: "Deux pièges : le débordement d'entiers est silencieux (pas d'exception, juste un mauvais résultat), et les opérations entre `int` et `float` promeuvent vers `float` (type promotion). Pour économiser la mémoire sur de gros tableaux, choisissez le plus petit dtype qui contient vos données — mais vérifiez les débordements.",
      },
    ],
  },
  {
    id: "broadcasting-regles",
    title: "Règles du broadcasting",
    level: 3,
    intro:
      "Les règles exactes qui décident si deux formes sont compatibles.",
    blocks: [
      {
        kind: "text",
        text: "Pour opérer sur deux tableaux, NumPy compare leurs shapes de droite à gauche : deux dimensions sont compatibles si elles sont égales ou si l'une vaut 1. Les dimensions manquantes à gauche sont traitées comme des 1. Si une paire est incompatible, `ValueError: operands could not be broadcast together`.",
      },
      {
        kind: "table",
        headers: ["Shape A", "Shape B", "Résultat"],
        rows: [
          ["`(4, 3)`", "`(3,)`", "`(4, 3)` : le vecteur s'applique à chaque ligne"],
          ["`(4, 1)`", "`(1, 3)`", "`(4, 3)` : les deux s'étirent"],
          ["`(4, 3)`", "`(4,)`", "Erreur : 3 vs 4 incompatibles"],
          ["`(5, 4, 3)`", "`(3,)`", "`(5, 4, 3)` : alignement à droite"],
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Forcer l'alignement avec newaxis",
        code: "import numpy as np\n\na = np.arange(4)          # shape (4,)\ncol = a[:, np.newaxis]    # shape (4, 1)\nrow = a[np.newaxis, :]    # shape (1, 4)\nprint((col + row).shape)  # (4, 4) : table d'addition",
      },
    ],
  },
  {
    id: "fancy-indexing",
    title: "Fancy indexing",
    level: 3,
    intro:
      "Sélectionner avec des tableaux d'indices : puissant, mais avec une copie.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Indexation par tableaux d'indices",
        code: "import numpy as np\n\na = np.array([10, 20, 30, 40, 50])\nprint(a[[0, 2, 4]])       # [10 30 50] : éléments aux positions 0, 2, 4\nprint(a[np.array([4, 3, 2, 1, 0])])  # ordre inversé\n\nm = np.array([[1, 2], [3, 4]])\nprint(m[[0, 1], [1, 0]])   # [2 3] : paires (ligne, colonne)",
      },
      {
        kind: "text",
        text: "Différence cruciale avec le slicing : le fancy indexing retourne toujours une copie, jamais une vue. Et `m[[0,1],[1,0]]` sélectionne des paires (ligne[i], colonne[i]), pas un sous-tableau rectangulaire — pour un bloc rectangulaire, utilisez `np.ix_` ou le slicing.",
      },
    ],
  },
  {
    id: "masques-booleens",
    title: "Masques booléens",
    level: 3,
    intro:
      "Le filtrage expressif : sélectionner et modifier par condition.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Filtrer et modifier par condition",
        code: "import numpy as np\n\na = np.array([3, 12, 7, 20, 5])\n\nmask = a > 10\nprint(mask)          # [False  True False  True False]\nprint(a[mask])       # [12 20]\n\n# Combiner des conditions : & (et), | (ou), ~ (non) — avec parenthèses !\nprint(a[(a > 5) & (a < 15)])  # [12 7]\n\n# Modifier en place via le masque\na[a < 6] = 0\nprint(a)  # [ 0 12  7 20  0]",
      },
      {
        kind: "text",
        text: "Attention aux opérateurs : `&` et `|`, pas `and`/`or` (qui ne fonctionnent pas sur les tableaux), et toujours des parenthèses car `&` est prioritaire sur `>`. L'assignation via masque (`a[mask] = 0`) modifie le tableau d'origine en place — très utile pour le nettoyage.",
      },
    ],
  },
  {
    id: "reshape",
    title: "Reshape",
    level: 3,
    intro:
      "Changer la forme sans changer les données : `reshape`, `ravel`, `transpose`.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Remodeler un tableau",
        code: "import numpy as np\n\na = np.arange(12)          # shape (12,)\nb = a.reshape(3, 4)       # shape (3, 4), mêmes données\nc = a.reshape(3, -1)      # -1 = dimension déduite automatiquement\nprint(b.ravel().shape)    # (12,) : aplatit (vue si possible)\nprint(b.T.shape)          # (4, 3) : transposée (vue)\n\n# 3D : (profondeur, lignes, colonnes)\nd = a.reshape(2, 2, 3)\nprint(d.shape)            # (2, 2, 3)",
      },
      {
        kind: "text",
        text: "`reshape` ne copie pas quand c'est possible (il réinterprète le même bloc mémoire) — c'est donc gratuit en performance. `ravel` aplatit en vue si possible, `flatten` copie toujours. La transposée `.T` inverse l'ordre des axes sans toucher aux données : vérifiez toujours le résultat, car l'ordre des éléments en mémoire ne change pas.",
      },
    ],
  },
  {
    id: "stacking-concat",
    title: "Concaténer et empiler",
    level: 3,
    intro:
      "Assembler des tableaux : `concatenate`, `stack`, `vstack`, `hstack`.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Assembler",
        code: "import numpy as np\n\na = np.array([1, 2])\nb = np.array([3, 4])\n\nnp.concatenate([a, b])  # [1 2 3 4]\nnp.stack([a, b])        # [[1 2], [3 4]] : nouvel axe, shape (2, 2)\nnp.vstack([a, b])       # idem, empile verticalement\nnp.hstack([a, b])       # [1 2 3 4], concatène horizontalement\n\n# Découper l'inverse :\nnp.split(np.arange(6), 3)  # [array([0,1]), array([2,3]), array([4,5])]",
      },
      {
        kind: "text",
        text: "`concatenate` joint le long d'un axe existant, `stack` crée un nouvel axe. Erreur fréquente : concaténer dans une boucle (`np.append` répété) — chaque appel copie tout le tableau, c'est quadratique. Accumulez dans une liste Python puis concaténez une fois à la fin.",
      },
    ],
  },
  {
    id: "algebre-lineaire",
    title: "Algèbre linéaire",
    level: 3,
    intro:
      "Produit matriciel, inversion, résolution : le module `linalg`.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Opérations matricielles",
        code: "import numpy as np\n\nA = np.array([[1., 2.], [3., 4.]])\nB = np.array([[5., 6.], [7., 8.]])\n\nprint(A @ B)              # produit matriciel (pas *)\nprint(np.linalg.inv(A))   # inverse\nprint(np.linalg.det(A))   # déterminant : -2.0\n\n# Résoudre A x = b (préféré à inv(A) @ b : plus stable, plus rapide)\nb = np.array([5., 11.])\nprint(np.linalg.solve(A, b))  # [1. 2.]\n\nvals, vecs = np.linalg.eig(A)  # valeurs/vecteurs propres",
      },
      {
        kind: "text",
        text: "`@` est le produit matriciel, `*` la multiplication élément par élément — les confondre est l'erreur classique. Pour résoudre un système linéaire, `solve` est toujours préférable à `inv` suivi d'une multiplication : plus rapide et numériquement plus stable. `lstsq` gère les systèmes sur-déterminés (moindres carrés), la base de la régression linéaire.",
      },
    ],
  },
  {
    id: "random",
    title: "Nombres aléatoires",
    level: 3,
    intro:
      "Le générateur moderne : `default_rng`, distributions et reproductibilité.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Générateur reproductible",
        code: "import numpy as np\n\nrng = np.random.default_rng(42)\n\nrng.random((2, 3))        # uniforme [0, 1)\nrng.integers(1, 7, size=10)  # entiers 1..6 (dé)\nrng.normal(0, 1, size=1000)  # gaussienne centrée réduite\nrng.choice([\"a\", \"b\", \"c\"], size=5)  # tirage discret\n\n# Mélanger sans toucher à l'original :\na = np.arange(10)\nrng.shuffle(a)  # en place",
      },
      {
        kind: "text",
        text: "Utilisez toujours `default_rng(seed)` plutôt que les anciennes fonctions globales (`np.random.rand`) : le générateur est explicite, son état est isolé, et la reproductibilité est garantie par la graine. Pour les simulations Monte Carlo, la graine fixée permet de rejouer exactement la même expérience.",
      },
    ],
  },
  {
    id: "ufuncs",
    title: "Ufuncs",
    level: 3,
    intro:
      "Les fonctions universelles : le moteur vectorisé de NumPy.",
    blocks: [
      {
        kind: "text",
        text: "Une ufunc applique une opération à chaque élément en C : arithmétique (`add`, `multiply`), trigonométrie (`sin`, `cos`), comparaisons (`greater`, `equal`), logiques (`logical_and`). Elles acceptent un paramètre `out` pour écrire dans un tableau existant (évite une allocation), et supportent `reduce`/`accumulate` : `np.add.reduce(a)` équivaut à `a.sum()`.",
      },
      {
        kind: "code",
        language: "python",
        title: "Ufuncs avancées",
        code: "import numpy as np\n\na = np.array([1., 2., 3., 4.])\n\nout = np.empty(4)\nnp.sqrt(a, out=out)      # écrit dans out, pas d'allocation\nprint(out)\n\nnp.add.accumulate(a)     # [ 1.  3.  6. 10.] : sommes cumulées\nnp.logical_and(a > 1, a < 4)  # [False  True  True False]",
      },
    ],
  },
  {
    id: "reductions-axe",
    title: "Réductions et axes",
    level: 3,
    intro:
      "Maîtriser `axis` : la notion qui structure tout le calcul multidimensionnel.",
    blocks: [
      {
        kind: "text",
        text: "Une réduction (`sum`, `mean`, `max`…) avec `axis=k` écrase l'axe k : le résultat a une dimension de moins. Avec `keepdims=True`, la dimension est conservée (shape `(n, 1)` au lieu de `(n,)`) — ce qui permet de rebroadcaster directement, par exemple pour normaliser : `(a - a.mean(axis=1, keepdims=True))`. Sans `keepdims`, il faudrait un `reshape` manuel.",
      },
      {
        kind: "code",
        language: "python",
        title: "keepdims et normalisation",
        code: "import numpy as np\n\na = np.array([[1., 2., 3.],\n              [4., 5., 6.]])\n\nm = a.mean(axis=1, keepdims=True)  # shape (2, 1)\nprint((a - m).mean(axis=1))        # ~[0. 0.] : centré par ligne\n\n# Arg-réductions : positions plutôt que valeurs\nprint(a.argmax(axis=1))  # [2 2] : indice du max par ligne",
      },
    ],
  },
  {
    id: "tri-et-recherche",
    title: "Tri et recherche",
    level: 3,
    intro:
      "Ordonner, partitionner et chercher efficacement.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Trier et chercher",
        code: "import numpy as np\n\na = np.array([5, 2, 8, 1, 9])\n\nnp.sort(a)              # [1 2 5 8 9] : trié (copie)\na.sort()                # en place\nnp.argsort(a)           # [3 1 0 2 4] : indices qui trieraient\n\n# Top-k sans trier tout :\nnp.argpartition(a, 2)   # les 2 plus petits sont en positions 0..1\n\n# Recherche dans un tableau trié :\ns = np.sort(a)\nnp.searchsorted(s, 6)   # 3 : position d'insertion de 6",
      },
      {
        kind: "text",
        text: "`argsort` est précieux : il donne l'ordre sans réordonner les données associées (triez les indices, appliquez-les à tous les tableaux liés). `argpartition` trouve les k plus petits en temps linéaire quand l'ordre complet est inutile. `searchsorted` fait une recherche dichotomique — logarithmique — dans un tableau trié.",
      },
    ],
  },
  {
    id: "fichiers-io",
    title: "Lecture et écriture",
    level: 3,
    intro:
      "Sauver et charger des tableaux : texte, binaire, compressé.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Formats de fichiers",
        code: "import numpy as np\n\na = np.arange(12).reshape(3, 4)\n\nnp.save(\"data.npy\", a)          # binaire, un tableau\nb = np.load(\"data.npy\")\n\nnp.savez(\"multi.npz\", x=a, y=a*2)  # plusieurs tableaux nommés\nnp.savez_compressed(\"c.npz\", x=a)  # compressé\n\nd = np.load(\"data.npy\")\nnp.savetxt(\"data.csv\", a, delimiter=\",\", fmt=\"%.2f\")\ne = np.loadtxt(\"data.csv\", delimiter=\",\")  # texte <-> tableau",
      },
      {
        kind: "text",
        text: "`.npy`/`.npz` préservent exactement shape et dtype — préférez-les au CSV pour les données intermédiaires (plus rapides, sans perte de précision). Le CSV reste le format d'échange avec le monde extérieur. Pour les gros volumes, les formats colonnaires (Parquet via pandas) sont plus efficaces que le `.npz`.",
      },
    ],
  },
  {
    id: "valeurs-manquantes",
    title: "Valeurs manquantes",
    level: 3,
    intro:
      "Représenter et traiter `NaN` : ce qui se propage et comment l'éviter.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Travailler avec NaN",
        code: "import numpy as np\n\na = np.array([1., 2., np.nan, 4.])\n\nprint(a.mean())          # nan : NaN contamine tout !\nprint(np.nanmean(a))     # 2.33 : ignore les NaN\nprint(np.isnan(a))       # [False False  True False]\n\n# Jamais == avec NaN :\nprint(np.nan == np.nan)  # False ! toujours utiliser isnan",
      },
      {
        kind: "text",
        text: "Un seul `NaN` suffit à contaminer une moyenne, une somme, une comparaison : `nan == nan` vaut `False` par définition IEEE. Les variantes `nan*` (`nanmean`, `nansum`, `nanmax`) ignorent les manquants. Stratégies : supprimer les lignes concernées, imputer (moyenne, médiane), ou modéliser explicitement le manque — le choix dépend du contexte, jamais du hasard.",
      },
    ],
  },
  {
    id: "vues-vs-copies",
    title: "Vues vs copies",
    level: 3,
    intro:
      "Savoir exactement quand NumPy copie : la règle complète.",
    blocks: [
      {
        kind: "table",
        headers: ["Opération", "Vue ou copie ?"],
        rows: [
          ["Slicing de base (`a[1:3]`, `a[:, 0]`) ", "Vue (partage la mémoire)"],
          ["Fancy indexing (`a[[0, 2]]`)", "Copie"],
          ["Masque booléen (`a[a > 0]`)", "Copie"],
          ["`reshape` (si possible)", "Vue"],
          ["`ravel` (si possible)", "Vue"],
          ["`flatten()`", "Toujours une copie"],
          ["`transpose` / `.T`", "Vue"],
          ["Opérations (`a + 1`, `np.sqrt(a)`)", "Nouveau tableau (copie)"],
          ["`a.view()`", "Vue explicite"],
          ["`a.copy()`", "Copie explicite"],
        ],
      },
      {
        kind: "text",
        text: "En cas de doute : `b.base is a` (ou `np.shares_memory(a, b)`) dit si deux tableaux partagent de la mémoire. Règle d'or : si vous modifiez un tableau dérivé d'un autre, assurez-vous de savoir si c'est une vue — sinon, `.copy()` explicite.",
      },
    ],
  },
  {
    id: "ordre-memoire",
    title: "Ordre mémoire : C vs Fortran",
    level: 3,
    intro:
      "L'ordre de stockage influence la vitesse des parcours.",
    blocks: [
      {
        kind: "text",
        text: "En ordre C (défaut, `row-major`), les éléments d'une ligne sont contigus en mémoire ; en ordre Fortran (`column-major`, `order=\"F\"`), ce sont ceux d'une colonne. Parcourir un tableau dans l'ordre de stockage est nettement plus rapide (localité de cache). Conséquence : sommer par lignes (`axis=1`) est plus rapide en ordre C, par colonnes en ordre Fortran. Pour les tableaux créés par vos soins, l'ordre C convient dans la quasi-totalité des cas — retenez juste que l'ordre de parcours compte.",
      },
    ],
  },
  {
    id: "einsum",
    title: "einsum",
    level: 3,
    intro:
      "La notation d'Einstein : exprimer des opérations tensorielles complexes en une ligne.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Contractions d'Einstein",
        code: "import numpy as np\n\nA = np.ones((3, 4))\nB = np.ones((4, 5))\n\nnp.einsum(\"ij,jk->ik\", A, B)  # produit matriciel\nnp.einsum(\"ij->ji\", A)        # transposée\nnp.einsum(\"ii->i\", np.eye(3)) # diagonale\nnp.einsum(\"ij,ij->\", A, A)    # somme des carrés (norme²)",
      },
      {
        kind: "text",
        text: "Chaque lettre nomme un axe : les axes répétés à gauche sont contractés (sommés), ceux à droite définissent la forme du résultat. `einsum` évite les tableaux intermédiaires des enchaînements d'opérations et exprime clairement l'intention mathématique. À réserver aux cas où la lisibilité y gagne — un `matmul` reste plus clair qu'un `einsum` pour un simple produit.",
      },
    ],
  },
  {
    id: "normes-et-distances",
    title: "Normes et distances",
    level: 3,
    intro:
      "Mesurer des longueurs et des écarts : `linalg.norm` et le broadcasting.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Distances vectorisées",
        code: "import numpy as np\n\na = np.array([3., 4.])\nprint(np.linalg.norm(a))       # 5.0 : norme euclidienne\n\n# Distance de chaque point à l'origine :\npts = np.array([[3., 4.], [1., 1.], [0., 5.]])\nprint(np.linalg.norm(pts, axis=1))  # [5. 1.414 5.]\n\n# Distances deux à deux via broadcasting :\ndiff = pts[:, None, :] - pts[None, :, :]  # shape (3, 3, 2)\ndists = np.linalg.norm(diff, axis=2)\nprint(dists.shape)  # (3, 3)",
      },
      {
        kind: "text",
        text: "Le motif `pts[:, None, :] - pts[None, :, :]` construit toutes les paires de points en une opération — la base des k-plus-proches-voisins naïfs et du clustering. Sur de gros volumes, cette matrice (n²) explose en mémoire : c'est là qu'interviennent les bibliothèques spécialisées.",
      },
    ],
  },
  {
    id: "statistiques-descriptives",
    title: "Statistiques descriptives",
    level: 3,
    intro:
      "Percentiles, histogrammes et corrélations : décrire une distribution.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Décrire une distribution",
        code: "import numpy as np\n\nrng = np.random.default_rng(0)\nx = rng.normal(100, 15, size=10_000)\n\nnp.percentile(x, [25, 50, 75])  # quartiles\nnp.median(x)                    # médiane (robuste aux extrêmes)\ncounts, bins = np.histogram(x, bins=20)  # histogramme\n\n# Corrélation entre deux variables :\ny = 2 * x + rng.normal(0, 5, size=10_000)\nprint(np.corrcoef(x, y))  # matrice de corrélation ~ [[1, ~1], [~1, 1]]",
      },
      {
        kind: "text",
        text: "Médiane et percentiles sont robustes aux valeurs extrêmes, contrairement à la moyenne — sur des données réelles (revenus, temps de réponse), préférez-les. `np.histogram` donne la distribution complète en une ligne. `corrcoef` mesure la corrélation linéaire : proche de ±1 = relation linéaire forte, proche de 0 = pas de relation linéaire (mais peut-être une relation non linéaire).",
      },
    ],
  },
  {
    id: "operations-ensemblistes",
    title: "Opérations ensemblistes",
    level: 3,
    intro:
      "Valeurs uniques, intersections, différences : traiter les tableaux comme des ensembles.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Ensembles",
        code: "import numpy as np\n\na = np.array([3, 1, 2, 1, 3])\n\nnp.unique(a)                        # [1 2 3] : valeurs uniques triées\nvals, counts = np.unique(a, return_counts=True)\nprint(counts)                       # [2 1 2] : occurrences\n\nb = np.array([2, 3, 4])\nnp.intersect1d(a, b)   # [2 3]\nnp.setdiff1d(a, b)     # [1] : dans a mais pas dans b\nnp.union1d(a, b)      # [1 2 3 4]",
      },
      {
        kind: "text",
        text: "`unique` avec `return_counts=True` est le compteur de fréquences le plus rapide pour des données catégorielles numériques. `return_inverse=True` donne en plus les indices pour reconstruire le tableau d'origine — utile pour encoder des catégories en entiers.",
      },
    ],
  },
  {
    id: "fenetres-glissantes",
    title: "Fenêtres glissantes",
    level: 3,
    intro:
      "Moyennes mobiles et analyse locale sans boucle, avec `sliding_window_view`.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Moyenne mobile vectorisée",
        code: "import numpy as np\nfrom numpy.lib.stride_tricks import sliding_window_view\n\ns = np.array([1., 2., 3., 4., 5., 6.])\nw = sliding_window_view(s, window_shape=3)\nprint(w.shape)          # (4, 3) : 4 fenêtres de 3 valeurs\nprint(w.mean(axis=1))   # [2. 3. 4. 5.] : moyenne mobile\n\n# Équivalent manuel avec cumsum (O(n)) :\nc = np.cumsum(np.r_[0, s])\nprint((c[3:] - c[:-3]) / 3)  # [2. 3. 4. 5.]",
      },
      {
        kind: "text",
        text: "`sliding_window_view` crée une vue (pas de copie) où chaque ligne est une fenêtre : toutes les statistiques glissantes deviennent des réductions sur l'axe des fenêtres. Pour les très longues séries, la version `cumsum` est en temps linéaire avec une mémoire constante.",
      },
    ],
  },
  {
    id: "fft",
    title: "Transformée de Fourier",
    level: 3,
    intro:
      "Passer du temps aux fréquences avec `numpy.fft`.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Analyser les fréquences d'un signal",
        code: "import numpy as np\n\nt = np.linspace(0, 1, 1000, endpoint=False)\nsignal = np.sin(2 * np.pi * 50 * t) + 0.5 * np.sin(2 * np.pi * 120 * t)\n\nspectrum = np.fft.rfft(signal)          # FFT pour signal réel\nfreqs = np.fft.rfftfreq(1000, d=1/1000) # fréquences associées\npeak = freqs[np.abs(spectrum).argmax()]\nprint(peak)  # 50.0 : fréquence dominante détectée",
      },
      {
        kind: "text",
        text: "La FFT décompose un signal en ses fréquences : indispensable en traitement du signal (audio, capteurs, vibrations). `rfft` est la variante optimisée pour les signaux réels (spectre symétrique). Retenez l'idée — le détail appartient au traitement du signal — mais sachez que NumPy le fait en une ligne.",
      },
    ],
  },
  {
    id: "gradients",
    title: "Gradients numériques",
    level: 3,
    intro:
      "Dériver des données discrètes avec `np.gradient`.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Dérivée discrète",
        code: "import numpy as np\n\nx = np.linspace(0, 2 * np.pi, 100)\ny = np.sin(x)\ndy = np.gradient(y, x)  # dy/dx par différences centrées\nprint(np.allclose(dy, np.cos(x), atol=0.01))  # True\n\n# Gradient d'un champ 2D (image, carte de hauteur) :\ngy, gx = np.gradient(np.random.default_rng(0).random((10, 10)))",
      },
      {
        kind: "text",
        text: "`gradient` utilise des différences centrées (précises au second ordre) à l'intérieur et des différences simples aux bords. En 2D, il retourne le gradient selon chaque axe — la base de la détection de contours et de l'analyse de champs.",
      },
    ],
  },
  {
    id: "polynomes",
    title: "Polynômes",
    level: 3,
    intro:
      "Ajuster et évaluer des polynômes avec `numpy.polynomial`.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Ajustement polynomial",
        code: "import numpy as np\n\nx = np.linspace(0, 10, 50)\ny = 2 * x**2 - 3 * x + 1 + np.random.default_rng(0).normal(0, 5, 50)\n\np = np.polynomial.Polynomial.fit(x, y, deg=2)  # moindres carrés\nprint(p.coef)          # coefficients dans la base adaptée\nprint(p(5.0))          # évaluation en x=5\n\n# Dérivée et racines :\nprint(p.deriv())\nprint(p.roots())",
      },
      {
        kind: "text",
        text: "`Polynomial.fit` ajuste par moindres carrés dans une base numériquement stable (contrairement à l'ancien `np.polyfit` sur les monômes bruts, instable aux degrés élevés). Utile pour lisser des courbes, interpoler, ou obtenir une forme analytique simple d'une relation.",
      },
    ],
  },
  {
    id: "performance",
    title: "Performance",
    level: 3,
    intro:
      "Écrire du NumPy rapide : les règles qui comptent vraiment.",
    blocks: [
      {
        kind: "fields",
        title: "Les règles de performance",
        fields: [
          { label: "Vectoriser d'abord", value: "Une boucle Python sur 1M d'éléments prend des secondes, l'opération NumPy des millisecondes. C'est 95 % du gain." },
          { label: "Éviter les copies inutiles", value: "Chaque opération crée un tableau : enchaîner 10 opérations sur 1 Go alloue 10 Go. Utilisez `out=` et les opérations in-place (`+=`, `*=`) sur les gros volumes." },
          { label: "Choisir le bon dtype", value: "`float32` au lieu de `float64` divise par deux la mémoire et accélère les transferts — souvent sans perte mesurable." },
          { label: "Parcourir dans l'ordre", value: "Accédez à la mémoire séquentiellement (ordre C par défaut) pour profiter du cache CPU." },
          { label: "Éviter la concaténation en boucle", value: "Accumulez dans une liste Python, concaténez une fois à la fin." },
          { label: "Mesurer", value: "`%timeit` en notebook : ne pas optimiser à l'aveugle. La plupart du temps, le goulot est une boucle Python oubliée." },
        ],
      },
    ],
  },
  {
    id: "interop-pandas",
    title: "Interopérabilité",
    level: 3,
    intro:
      "NumPy ne vit pas seul : pandas, scikit-learn et les autres parlent `ndarray`.",
    blocks: [
      {
        kind: "text",
        text: "Le `ndarray` est la monnaie d'échange du stack scientifique : `df.to_numpy()` extrait les valeurs d'un DataFrame pandas, `np.asarray()` convertit sans copier quand c'est possible, et scikit-learn accepte des tableaux NumPy en entrée de tous ses modèles. Comprendre NumPy, c'est donc parler couramment avec tout l'écosystème — et diagnostiquer les problèmes de shape qui surviennent aux frontières entre bibliothèques.",
      },
      {
        kind: "code",
        language: "python",
        title: "Passerelles",
        code: "import numpy as np\nimport pandas as pd\n\ndf = pd.DataFrame({\"a\": [1, 2, 3], \"b\": [4.0, 5.0, 6.0]})\narr = df.to_numpy()        # ndarray, shape (3, 2)\nback = pd.DataFrame(arr, columns=df.columns)\n\nlst = [1, 2, 3]\nnp.asarray(lst)            # conversion sans copie si déjà ndarray",
      },
    ],
  },
  {
    id: "tests-numpy",
    title: "Tester le code NumPy",
    level: 3,
    intro:
      "Comparer des flottants sans se piéger : `numpy.testing`.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Assertions numériques",
        code: "import numpy as np\nfrom numpy.testing import assert_allclose, assert_array_equal\n\n# Jamais == sur des flottants :\n# assert (0.1 + 0.2) == 0.3  # ÉCHOUE (0.30000000000000004)\nassert_allclose(0.1 + 0.2, 0.3)  # OK : tolérance relative\n\na = np.array([1, 2, 3])\nassert_array_equal(a, np.array([1, 2, 3]))  # égalité exacte (entiers)\n\n# Dans pytest :\ndef test_normalisation():\n    x = np.array([1.0, 2.0, 3.0])\n    xn = (x - x.mean()) / x.std()\n    assert_allclose(xn.mean(), 0.0, atol=1e-12)\n    assert_allclose(xn.std(), 1.0, atol=1e-12)",
      },
      {
        kind: "text",
        text: "`assert_allclose` compare avec une tolérance (relative + absolue) : indispensable pour les flottants. `assert_array_equal` pour les comparaisons exactes (entiers, booléens, shapes). Écrivez les tests sur des petits tableaux dont vous connaissez le résultat à la main.",
      },
    ],
  },
  {
    id: "debugging",
    title: "Debugging",
    level: 3,
    intro:
      "Diagnostiquer le code NumPy : shapes, dtypes et valeurs.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Afficher shape et dtype",
            detail:
              "Devant un résultat bizarre, `print(a.shape, a.dtype)` en premier : 90 % des bugs NumPy sont des problèmes de dimensions ou de types.",
          },
          {
            title: "Vérifier les valeurs extrêmes",
            detail:
              "`np.isnan(a).sum()`, `np.isinf(a).sum()`, `a.min(), a.max()` : repérez les NaN, infinis et débordements qui contaminent les calculs.",
          },
          {
            title: "Réduire le cas",
            detail:
              "Reproduisez avec un tableau 3x3 écrit à la main : si le bug disparaît, il venait des données ; sinon, de la logique.",
          },
          {
            title: "Lire l'erreur de broadcasting",
            detail:
              "`operands could not be broadcast together with shapes (4,3) (4,)` : comparez les shapes de droite à gauche pour trouver l'axe fautif.",
          },
          {
            title: "Désactiver les warnings un par un",
            detail:
              "`invalid value encountered`, `divide by zero` : localisez avec `np.errstate` plutôt que de les ignorer globalement.",
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
          ["`ValueError: broadcast`", "Shapes incompatibles", "Comparer les shapes de droite à gauche, ajouter `newaxis`"],
          ["Résultat `nan` partout", "NaN dans les données d'entrée", "`np.isnan(a).sum()`, utiliser les variantes `nan*`"],
          ["Modification surprise d'un autre tableau", "Vue partagée au lieu d'une copie", "`.copy()` explicite, `np.shares_memory` pour vérifier"],
          ["`0.30000000000000004`", "Arithmétique flottante, pas un bug", "Comparaisons avec tolérance (`allclose`), pas `==`"],
          ["Lenteur extrême", "Boucle Python sur un grand tableau", "Vectoriser ; `%timeit` pour confirmer"],
          ["`OverflowError` silencieux", "Débordement d'entier (uint8…)", "Choisir un dtype plus large, vérifier min/max"],
          ["`a[mask] = x` ne change rien", "Assignation sur une copie temporaire", "Assigner via le masque sur le tableau d'origine"],
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro:
      "Les habitudes d'un code NumPy propre et fiable.",
    blocks: [
      {
        kind: "list",
        items: [
          "Vérifiez les shapes aux frontières des fonctions (`assert`), surtout au-delà de 2 dimensions.",
          "Nommez les axes en commentaire : `# (batch, temps, features)` vaut mieux qu'un `(32, 100, 8)` nu.",
          "Préférez les opérations vectorisées aux boucles — toujours.",
          "Utilisez `.copy()` explicitement quand l'indépendance mémoire compte.",
          "Fixez les graines aléatoires pour la reproductibilité.",
          "Choisissez le dtype consciemment (mémoire vs précision), pas par défaut aveugle.",
          "Testez avec `numpy.testing` et des tolérances, jamais avec `==` sur des flottants.",
          "Documentez les shapes d'entrée/sortie dans les docstrings.",
        ],
      },
    ],
  },
  {
    id: "projet-images",
    title: "Projet : traitement d'images",
    level: 3,
    intro:
      "Manipuler des images comme des tableaux 3D (hauteur, largeur, canaux).",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Charger une image en tableau",
            detail:
              "Avec PIL ou imageio : une image couleur devient un tableau `(h, w, 3)` de `uint8`. Vérifiez shape et dtype.",
          },
          {
            title: "Convertir en niveaux de gris",
            detail:
              "Moyenne pondérée des canaux (0.299 R + 0.587 G + 0.114 B) via broadcasting : une ligne, pas de boucle.",
          },
          {
            title: "Appliquer des transformations",
            detail:
              "Seuillage (`img > 128`), recadrage par slicing, miroir par `[::-1]`, ajustement de luminosité par arithmétique.",
          },
          {
            title: "Détecter les contours simples",
            detail:
              "`np.gradient` sur l'image en gris : les fortes variations marquent les bords. Visualisez le résultat.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-monte-carlo",
    title: "Projet : simulation Monte Carlo",
    level: 3,
    intro:
      "Estimer π et une valeur d'option par tirage aléatoire massif.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Estimer π",
            detail:
              "Tirez N points uniformes dans le carré [0,1]², comptez ceux dans le quart de cercle : π ≈ 4 × proportion. Vectorisé, 10 millions de points prennent une seconde.",
          },
          {
            title: "Mesurer la convergence",
            detail:
              "Tracez l'estimation en fonction de N (échelle log) : l'erreur décroît en 1/√N — la signature de Monte Carlo.",
          },
          {
            title: "Simuler des trajectoires",
            detail:
              "Marche aléatoire : `cumsum` de tirages gaussiens. Simulez 10 000 trajectoires d'un coup avec un tableau 2D.",
          },
          {
            title: "Valoriser une option",
            detail:
              "Moyenne des payoffs actualisés sur les trajectoires simulées : le principe du pricing par Monte Carlo, en une dizaine de lignes.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-regression",
    title: "Projet : régression linéaire from scratch",
    level: 3,
    intro:
      "Implémenter les moindres carrés avec l'algèbre linéaire NumPy.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Générer des données",
            detail:
              "`y = 3x + 2 + bruit` avec le générateur seedé : vous connaissez la vérité terrain, donc vous pouvez valider.",
          },
          {
            title: "Résoudre avec lstsq",
            detail:
              "`np.linalg.lstsq(X, y)` : une ligne pour obtenir les coefficients. Comparez aux vraies valeurs.",
          },
          {
            title: "Implémenter la descente de gradient",
            detail:
              "Boucle d'optimisation manuelle sur le MSE : observez la convergence selon le taux d'apprentissage (trop grand = divergence).",
          },
          {
            title: "Valider",
            detail:
              "Erreur sur données de test, résidus (`y - prédiction`) : ils doivent ressembler à du bruit, pas à une structure.",
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
          { label: "NumPy Docs", value: "numpy.org/doc : guide de l'utilisateur, référence complète, tutoriels par niveau." },
          { label: "NumPy Quickstart", value: "Le tutoriel officiel pour passer des bases aux concepts clés en une lecture." },
          { label: "Référence des routines", value: "Une page par fonction avec exemples : à consulter plutôt que de deviner une signature." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : le site « 100 NumPy exercises » (exercices progressifs avec solutions) pour muscler les réflexes.",
          "Livre : « Python for Data Analysis » pour NumPy en contexte d'analyse réelle.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "NumPy maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Manipuler des données tabulaires : `pandas` — DataFrames construits sur NumPy.",
          "Calcul différentiable : `pytorch` — les tenseurs GPU pour le deep learning.",
          "Modéliser : `scikit-learn` — machine learning classique sur tableaux NumPy.",
          "Visualiser : apprendre une bibliothèque de tracés pour explorer vos tableaux.",
          "Revenir à la roadmap : valider NumPy et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

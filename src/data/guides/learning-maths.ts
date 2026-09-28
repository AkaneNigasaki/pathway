import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète des mathématiques pour l'IA : algèbre linéaire,
 * calcul différentiel, probabilités — comprendre ce que les modèles font
 * vraiment. 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec
 * divulgation progressive. Tous les textes supportent le code inline entre
 * backticks.
 */
export const LEARNING_MATHS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre quelles mathématiques servent en IA, pourquoi, et comment les apprendre efficacement.",
    blocks: [
      {
        kind: "text",
        text: "Les mathématiques de l'IA tiennent en trois piliers : l'algèbre linéaire (le langage des données et des modèles — vecteurs, matrices), le calcul différentiel (le langage de l'apprentissage — dérivées, gradients), et les probabilités (le langage de l'incertitude — distributions, inférence). Tout le reste en découle.",
      },
      {
        kind: "text",
        text: "Pourquoi les apprendre : on peut appeler `model.fit()` sans elles — jusqu'au jour où le modèle ne converge pas, où les dimensions ne correspondent pas, où il faut comprendre POURQUOI une méthode marche. Les maths transforment l'utilisateur de bibliothèques en ingénieur capable de diagnostiquer, d'adapter et d'innover.",
      },
      {
        kind: "text",
        text: "Comment les apprendre : pas comme à l'école — par le triplet concept → formule → code. Chaque notion de cette page est reliée à son application ML concrète et, quand c'est éclairant, à son implémentation numpy. Les maths abstraites sans application s'oublient ; les maths codées restent.",
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : trois langages pour trois questions",
    level: 1,
    intro:
      "L'idée centrale : chaque pilier répond à une question fondamentale du ML.",
    blocks: [
      {
        kind: "diagram",
        title: "Les trois piliers et leurs questions",
        lines: [
          "ALGÈBRE LINÉAIRE — « comment représenter ? »",
          "  vecteurs, matrices → données, transformations, embeddings",
          "  ex. une image = vecteur, une couche de neurones = matrice",
          "     │",
          "CALCUL DIFFÉRENTIEL — « comment apprendre ? »",
          "  dérivées, gradients → minimiser l'erreur pas à pas",
          "  ex. la descente de gradient ajuste les poids",
          "     │",
          "PROBABILITÉS — « comment décider sous incertitude ? »",
          "  distributions, Bayes → prédire avec confiance mesurée",
          "  ex. « 90 % de chances que ce soit un chat »",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : l'algèbre linéaire décrit le monde du modèle, le calcul différentiel le fait apprendre, les probabilités le font décider prudemment. Quand un concept mathématique semble abstrait, demandez-vous à laquelle des trois questions il répond.",
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
      "Ce qu'il faut avant d'attaquer : moins qu'on ne croit, mais solide.",
    blocks: [
      {
        kind: "fields",
        title: "Bases requises",
        fields: [
          {
            label: "Algèbre du lycée",
            value:
              "Équations, fonctions (droites, paraboles, exponentielles), manipulations algébriques de base. C'est le socle — tout le reste se construit dessus.",
          },
          {
            label: "Python / numpy (notions)",
            value:
              "Créer des tableaux, faire des opérations : numpy EST l'algèbre linéaire en code. On l'apprend en parallèle, pas avant.",
          },
          {
            label: "Logique et rigueur",
            value:
              "Suivre un raisonnement pas à pas, accepter les définitions précises. Les maths récompensent la patience, pas la vitesse.",
          },
        ],
      },
      {
        kind: "text",
        text: "Ce qu'il ne faut PAS : avoir « fait des maths supérieures ». Cette page part des fondations et monte progressivement — chaque section suppose seulement les précédentes.",
      },
    ],
  },
  {
    id: "environnement",
    title: "Environnement de travail",
    level: 2,
    intro:
      "Le laboratoire du mathématicien appliqué : Python, numpy, visualisation.",
    blocks: [
      {
        kind: "command",
        label: "Installer la pile scientifique",
        command: "pip install numpy matplotlib sympy jupyter",
        why: "`numpy` pour le calcul vectoriel et matriciel (c'est de l'algèbre linéaire exécutable), `matplotlib` pour visualiser les concepts (une courbe vaut mille formules), `sympy` pour le calcul symbolique (dériver formellement), `jupyter` pour expérimenter. Des paquets stables et incontournables du calcul scientifique.",
        verify: "python -c \"import numpy, matplotlib, sympy; print(numpy.__version__)\"",
      },
      {
        kind: "text",
        text: "Méthode de travail : pour chaque concept, lire la définition, regarder la formule, puis l'implémenter en numpy et la visualiser. Le notebook est le cahier de brouillon idéal : formules en markdown, expériences en code.",
      },
    ],
  },
  {
    id: "notation",
    title: "La notation mathématique",
    level: 2,
    intro:
      "Lire les formules du ML : le vocabulaire symbolique de base.",
    blocks: [
      {
        kind: "fields",
        title: "Symboles courants",
        fields: [
          {
            label: "Scalaires, vecteurs, matrices",
            value:
              "Minuscule (`x`, `w`) = scalaire ou vecteur selon le contexte ; majuscule (`W`, `X`) = matrice. En ML : `x` une donnée, `X` le dataset, `w` les poids, `W` la matrice de poids.",
          },
          {
            label: "Σ (sigma majuscule)",
            value:
              "Somme : `Σᵢ xᵢ` = somme de tous les xᵢ. Omniprésent (sommes sur les exemples, sur les dimensions).",
          },
          {
            label: "∂ (d rond)",
            value:
              "Dérivée partielle : `∂L/∂w` = comment la perte L varie quand le poids w varie. Le cœur de l'apprentissage.",
          },
          {
            label: "∇ (nabla)",
            value:
              "Gradient : le vecteur de toutes les dérivées partielles. Il pointe vers la plus forte montée.",
          },
          {
            label: "P(A|B)",
            value:
              "Probabilité de A sachant B. Le langage de l'inférence bayésienne.",
          },
          {
            label: "E[X], Var(X)",
            value:
              "Espérance (moyenne théorique) et variance d'une variable aléatoire.",
          },
          {
            label: "∈, ∀, ∃",
            value:
              "« appartient à », « pour tout », « il existe » : `x ∈ ℝ` = x est un réel. Le bagage ensembliste minimal.",
          },
        ],
      },
      {
        kind: "text",
        text: "Ne pas mémoriser d'un coup : revenir à ce glossaire quand une formule résiste. La notation est une langue — on l'apprend en lisant, pas en bachotant.",
      },
    ],
  },
  {
    id: "premier-vecteur",
    title: "Premier vecteur en numpy",
    level: 2,
    intro:
      "Le vecteur : l'objet de base — et déjà du code qui calcule.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Vecteurs en numpy",
        code: `import numpy as np

# Un vecteur : une liste de nombres = un point dans un espace
v = np.array([3.0, 4.0])
w = np.array([1.0, 2.0])

print("Addition :", v + w)        # [4. 6.]
print("Scaling  :", 2 * v)        # [6. 8.]

# Produit scalaire : mesure d'alignement entre deux vecteurs
print("Dot :", np.dot(v, w))       # 3*1 + 4*2 = 11

# Norme : la longueur du vecteur
print("Norme :", np.linalg.norm(v))  # 5.0 (3-4-5 !)`,
      },
      {
        kind: "text",
        text: "Ce que ce code montre : en numpy, les opérations sont vectorielles — pas de boucles. C'est exactement ainsi que les modèles manipulent les données : un exemple = un vecteur, un lot d'exemples = une matrice, et tout le calcul est de l'algèbre linéaire à grande échelle.",
      },
    ],
  },
  {
    id: "matrices-numpy",
    title: "Matrices en numpy",
    level: 2,
    intro:
      "La matrice : un tableau de nombres qui transforme des vecteurs.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Matrices : création et multiplication",
        code: `import numpy as np

# Une matrice 2x2, un vecteur
A = np.array([[2.0, 0.0],
              [0.0, 3.0]])
x = np.array([1.0, 1.0])

# Multiplication matrice-vecteur : transforme x
print(A @ x)  # [2. 3.] : étire x d'un facteur 2 en x, 3 en y

# Multiplication matrice-matrice : compose les transformations
B = np.array([[0.0, -1.0],
              [1.0, 0.0]])  # rotation de 90°
print(B @ x)  # [-1. 1.]

print("Transposée :\n", A.T)`,
      },
      {
        kind: "text",
        text: "L'idée clé : une matrice EST une transformation (rotation, étirement, projection). Une couche de réseau de neurones, c'est `y = Wx + b` : une transformation linéaire (`W`) plus un décalage (`b`), suivie d'une non-linéarité. Tout le deep learning tient dans cette phrase.",
      },
    ],
  },
  {
    id: "fonctions-derivees",
    title: "Fonctions et dérivées",
    level: 2,
    intro:
      "La dérivée : la pente locale — l'information qui permet d'optimiser.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Dériver formellement avec sympy",
        code: `import sympy as sp

x = sp.symbols("x")
f = x**2 + 3*x + 1

print("f  =", f)
print("f' =", sp.diff(f, x))   # 2*x + 3 : la pente en tout point

# Évaluer la pente en x = 2
print("pente en x=2 :", sp.diff(f, x).subs(x, 2))  # 7`,
      },
      {
        kind: "text",
        text: "Interprétation : la dérivée `f'(x)` dit comment `f` varie quand `x` bouge un peu. Si `f'(2) = 7`, augmenter x de 0,01 augmente f d'environ 0,07. En ML, `f` est la perte (l'erreur) et `x` sont les poids : la dérivée dit dans quel sens ajuster chaque poids pour réduire l'erreur. C'est toute la descente de gradient.",
      },
    ],
  },
  {
    id: "probabilites-bases",
    title: "Probabilités : les bases en code",
    level: 2,
    intro:
      "Le hasard simulé : fréquences, moyennes, et la loi des grands nombres.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Simuler pour comprendre",
        code: `import numpy as np

rng = np.random.default_rng(42)

# 10 000 lancers de dé : la fréquence tend vers 1/6 par face
lancers = rng.integers(1, 7, size=10_000)
for face in range(1, 7):
    print(face, ":", (lancers == face).mean().round(3))

# Loi des grands nombres : la moyenne empirique converge
echantillons = rng.normal(loc=100, scale=15, size=100_000)
print("Moyenne empirique :", echantillons.mean().round(2))  # ~100
print("Écart-type empirique :", echantillons.std().round(2))  # ~15`,
      },
      {
        kind: "text",
        text: "Deux idées fondamentales : la probabilité comme fréquence limite (plus on répète, plus la fréquence observée approche la vraie probabilité), et la loi normale comme modèle par défaut de beaucoup de phénomènes (tailles, erreurs de mesure). La simulation est le meilleur outil pédagogique des probabilités : quand une formule résiste, simulez.",
      },
    ],
  },
  {
    id: "statistiques-rappel",
    title: "Statistiques : le pont vers les données",
    level: 2,
    intro:
      "Espérance, variance, échantillon vs population : le vocabulaire minimal.",
    blocks: [
      {
        kind: "fields",
        title: "Concepts clés",
        fields: [
          {
            label: "Espérance E[X]",
            value:
              "La moyenne théorique : ce que vaut X « en moyenne » sur un nombre infini de tirages. La moyenne empirique l'estime.",
          },
          {
            label: "Variance Var(X)",
            value:
              "La dispersion autour de la moyenne : `E[(X - E[X])²]`. L'écart-type est sa racine carrée, dans la même unité que X.",
          },
          {
            label: "Échantillon vs population",
            value:
              "On observe un échantillon, on veut connaître la population. Toute l'inférence statistique est ce saut — avec son incertitude.",
          },
          {
            label: "Biais d'estimation",
            value:
              "Un estimateur est biaisé s'il vise systématiquement à côté. Exemple : la variance empirique avec /n est biaisée, avec /(n-1) elle ne l'est pas.",
          },
        ],
      },
      {
        kind: "text",
        text: "La compétence `statistics` de cette roadmap approfondit tout cela ; ici, l'objectif est le vocabulaire nécessaire pour lire les formules du ML sans être perdu.",
      },
    ],
  },
  {
    id: "visualiser-concepts",
    title: "Visualiser les concepts",
    level: 2,
    intro:
      "Une courbe vaut mille formules : tracer pour comprendre.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Fonctions et distributions en images",
        code: `import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-4, 4, 200)

fig, axes = plt.subplots(1, 2, figsize=(10, 3))

# Sigmoïde : la fonction d'activation historique
axes[0].plot(x, 1 / (1 + np.exp(-x)))
axes[0].set_title("Sigmoïde : 1 / (1 + exp(-x))")
axes[0].grid(True, alpha=0.3)

# Densité normale : la cloche
axes[1].plot(x, np.exp(-x**2 / 2) / np.sqrt(2 * np.pi))
axes[1].set_title("Densité de la loi normale")
axes[1].grid(True, alpha=0.3)

fig.tight_layout()`,
      },
      {
        kind: "text",
        text: "Réflexe à acquérir : devant une formule inconnue, la tracer. La forme de la sigmoïde (saturations aux extrêmes) explique à elle seule le problème de l'évanouissement du gradient ; la cloche de la normale rend concrets moyenne et écart-type.",
      },
    ],
  },
  {
    id: "workflow-apprentissage",
    title: "Méthode d'apprentissage",
    level: 2,
    intro:
      "Comment travailler chaque notion : le triplet concept → formule → code.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Lire le concept en mots",
            detail:
              "D'abord l'idée intuitive : « la dérivée, c'est la pente ». Si l'intuition ne vient pas, chercher un exemple avant la formule.",
          },
          {
            title: "Écrire la formule à la main",
            detail:
              "Recopier `f'(x) = lim(h→0) [f(x+h) - f(x)]/h` en la lisant à voix haute : « la limite du taux d'accroissement ». L'écriture manuelle ancre la notation.",
          },
          {
            title: "Implémenter en numpy",
            detail:
              "Coder la notion sur un exemple numérique : dérivée approchée par différences finies, descente de gradient sur une parabole. Le code est le test de la compréhension.",
          },
          {
            title: "Visualiser",
            detail:
              "Tracer : la fonction et sa tangente, la descente pas à pas, la distribution simulée. L'image révèle ce que la formule cache.",
          },
          {
            title: "Relier au ML",
            detail:
              "Chaque section de cette page se termine par l'application : où ce concept apparaît-il dans un vrai modèle ? C'est ce lien qui fait retenir.",
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
      "Les pièges classiques quand on (ré)apprend les maths pour l'IA.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Vouloir tout démontrer",
            value:
              "Problem : s'enliser dans les preuves au lieu de comprendre l'usage. Better : intuition + application d'abord, rigueur ensuite et seulement si nécessaire.",
          },
          {
            label: "Apprendre sans coder",
            value:
              "Problem : lire des formules passivement. Better : chaque concept = un snippet numpy qui tourne.",
          },
          {
            label: "Confondre notation et concept",
            value:
              "Problem : bloquer sur Σ, ∂, ∇. Better : les lire à voix haute (« somme sur i », « dérivée de L par rapport à w ») — la peur part avec la verbalisation.",
          },
          {
            label: "Négliger l'algèbre linéaire",
            value:
              "Problem : foncer sur les probas en sautant les vecteurs/matrices. Better : l'algèbre linéaire est le langage dans lequel TOUT le reste s'écrit.",
          },
          {
            label: "Apprendre dans le désordre",
            value:
              "Problem : attaquer le gradient sans la dérivée, Bayes sans les probabilités conditionnelles. Better : suivre la progression de cette page.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "vecteurs-espace",
    title: "Vecteurs et espaces",
    level: 3,
    intro:
      "Le vecteur comme point, comme flèche, comme donnée : trois vues complémentaires.",
    blocks: [
      {
        kind: "text",
        text: "Un vecteur `v ∈ ℝⁿ` est une liste de n nombres. Trois interprétations : un POINT dans un espace à n dimensions (la position d'une donnée), une FLÈCHE (une direction et une magnitude — comme le gradient), une DONNÉE (les features d'un exemple). En ML, ces trois vues coexistent : un embedding est à la fois une donnée, un point, et une direction de sens.",
      },
      {
        kind: "list",
        items: [
          "Addition : `v + w` — combiner (ex. analogies : roi - homme + femme ≈ reine dans les embeddings).",
          "Multiplication par un scalaire : `αv` — changer l'intensité sans changer la direction (α > 0).",
          "Combinaison linéaire : `αv + βw` — l'opération qui engendre des espaces entiers.",
          "Indépendance linéaire : des vecteurs dont aucun n'est combinaison des autres — la notion de « vraiment différentes directions ».",
          "Application ML : chaque exemple d'un dataset est un vecteur ; le dataset est un nuage de points dans ℝⁿ.",
        ],
      },
    ],
  },
  {
    id: "produit-scalaire",
    title: "Produit scalaire et similarité",
    level: 3,
    intro:
      "Le produit scalaire mesure l'alignement : c'est la similarité la plus utilisée du ML.",
    blocks: [
      {
        kind: "text",
        text: "Définition : `v·w = Σᵢ vᵢwᵢ = ||v|| ||w|| cos(θ)`, où θ est l'angle entre les vecteurs. Grand et positif : les vecteurs pointent dans le même sens (similaires). Nul : orthogonaux (sans rapport). Négatif : opposés.",
      },
      {
        kind: "code",
        language: "python",
        title: "Similarité cosinus",
        code: `import numpy as np

def cosine_sim(a: np.ndarray, b: np.ndarray) -> float:
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

# Deux "documents" en vecteurs de mots (jouet)
d1 = np.array([3.0, 2.0, 0.0])  # parle de chats
d2 = np.array([2.0, 3.0, 0.0])  # parle aussi de chats
d3 = np.array([0.0, 0.0, 5.0])  # parle de voitures

print(cosine_sim(d1, d2).round(2))  # 0.92 : proches
print(cosine_sim(d1, d3).round(2))  # 0.0  : sans rapport`,
      },
      {
        kind: "text",
        text: "Applications : similarité cosinus en recherche (RAG — voir `llm-systems`), attention dans les transformers (produits scalaires requête-clé), classification par plus proche voisin. Normaliser les vecteurs (norme 1) rend le produit scalaire égal au cosinus — pratique courante.",
      },
    ],
  },
  {
    id: "normes-distances",
    title: "Normes et distances",
    level: 3,
    intro:
      "Mesurer des longueurs et des écarts : L1, L2, et leurs usages.",
    blocks: [
      {
        kind: "fields",
        title: "Les normes",
        fields: [
          {
            label: "Norme L2 (euclidienne)",
            value:
              "`||v||₂ = √(Σᵢ vᵢ²)` : la longueur usuelle. La distance L2 mesure l'écart géométrique. Utilisée dans k-means, la régularisation Ridge, les embeddings.",
          },
          {
            label: "Norme L1 (Manhattan)",
            value:
              "`||v||₁ = Σᵢ |vᵢ|` : somme des valeurs absolues. Favorise la parcimonie (beaucoup de zéros) — d'où la régularisation Lasso qui sélectionne des features.",
          },
          {
            label: "Norme infinie",
            value:
              "`||v||∞ = max|vᵢ|` : la plus grande composante. Utile pour borner (clipping du gradient).",
          },
          {
            label: "Distance",
            value:
              "Une distance est une norme de la différence : `d(v,w) = ||v - w||`. Le choix de la norme change la notion de « proche » — et donc les résultats du clustering et du k-NN.",
          },
        ],
      },
      {
        kind: "text",
        text: "En haute dimension, les distances L2 perdent de leur sens (tous les points deviennent à peu près équidistants) : c'est une facette du fléau de la dimension, qui motive la réduction de dimension (PCA) et les similarités cosinus.",
      },
    ],
  },
  {
    id: "matrices-transformations",
    title: "Matrices et transformations",
    level: 3,
    intro:
      "Voir les matrices comme ce qu'elles sont : des transformations de l'espace.",
    blocks: [
      {
        kind: "fields",
        title: "Transformations élémentaires",
        fields: [
          {
            label: "Mise à l'échelle",
            value:
              "Matrice diagonale : étire chaque axe indépendamment. `diag(2, 3)` double les x et triple les y.",
          },
          {
            label: "Rotation",
            value:
              "Matrice orthogonale : tourne l'espace sans déformer. Les rotations préservent les normes et les angles.",
          },
          {
            label: "Projection",
            value:
              "Écrase sur un sous-espace (ex. 3D → 2D) : perd de l'information, mais de façon contrôlée. C'est l'idée de la PCA.",
          },
          {
            label: "Couche de neurones",
            value:
              "`y = Wx + b` : transformation affine (linéaire + décalage). Empiler des couches avec des non-linéarités entre elles = un réseau de neurones.",
          },
        ],
      },
      {
        kind: "text",
        text: "L'intuition géométrique change tout : au lieu de « multiplier des tableaux », on « transforme l'espace des données ». L'apprentissage, c'est chercher les transformations (les W) qui rendent les données séparables ou prédictibles.",
      },
    ],
  },
  {
    id: "multiplication-matricielle",
    title: "Multiplication matricielle",
    level: 3,
    intro:
      "Composer des transformations : les règles et leur sens.",
    blocks: [
      {
        kind: "text",
        text: "Multiplier deux matrices, c'est composer leurs transformations : `(AB)x = A(Bx)` — appliquer B puis A. D'où la non-commutativité (`AB ≠ BA` en général) : tourner puis étirer n'est pas étirer puis tourner. L'associativité `((AB)C = A(BC))` permet de regrouper les calculs efficacement.",
      },
      {
        kind: "code",
        language: "python",
        title: "Dimensions et batch",
        code: `import numpy as np

# W : (3, 4) — de 4 entrées vers 3 sorties
# X : (4, 100) — 100 exemples de 4 features (un par colonne)
W = np.random.default_rng(0).normal(size=(3, 4))
X = np.random.default_rng(1).normal(size=(4, 100))

Y = W @ X   # (3, 4) @ (4, 100) -> (3, 100) : 100 exemples transformés
print(Y.shape)  # (3, 100)

# Règle : (m, n) @ (n, p) -> (m, p). Les dimensions intérieures matchent.`,
      },
      {
        kind: "text",
        text: "La règle des dimensions `(m,n) @ (n,p) → (m,p)` est le premier diagnostic : 90 % des erreurs de shape en deep learning viennent d'une multiplication incompatible. La vectorisation (traiter 100 exemples d'un coup) est ce qui rend le calcul GPU efficace.",
      },
    ],
  },
  {
    id: "systemes-lineaires",
    title: "Systèmes linéaires et inverse",
    level: 3,
    intro:
      "Résoudre `Ax = b` : le problème fondamental, et pourquoi on évite l'inverse.",
    blocks: [
      {
        kind: "text",
        text: "Résoudre `Ax = b`, c'est trouver le vecteur x que A envoie sur b. Si A est inversible, `x = A⁻¹b`. Mais en pratique on ne calcule JAMAIS l'inverse : c'est coûteux et numériquement instable. On utilise des solveurs directs (`np.linalg.solve`) ou, en ML, des méthodes itératives.",
      },
      {
        kind: "code",
        language: "python",
        title: "Résoudre sans inverser",
        code: `import numpy as np

A = np.array([[2.0, 1.0],
              [1.0, 3.0]])
b = np.array([5.0, 6.0])

# Bien : solveur direct
x = np.linalg.solve(A, b)
print(x)  # [1.8 1.4]
print("Vérification :", A @ x)  # [5. 6.]

# À éviter : np.linalg.inv(A) @ b (plus lent, moins précis)`,
      },
      {
        kind: "text",
        text: "Lien ML : la régression linéaire par moindres carrés résout (une variante de) `Ax ≈ b`. Le déterminant (`np.linalg.det`) dit si A est inversible (det ≠ 0) ; un déterminant proche de zéro signale un système mal conditionné — les solutions deviennent ultra-sensibles au bruit.",
      },
    ],
  },
  {
    id: "valeurs-propres",
    title: "Valeurs et vecteurs propres",
    level: 3,
    intro:
      "Les directions que la matrice ne fait que dilater : la structure cachée des transformations.",
    blocks: [
      {
        kind: "text",
        text: "Un vecteur propre `v` de A vérifie `Av = λv` : la transformation ne fait que le dilater d'un facteur λ (la valeur propre), sans le tourner. Ces directions privilégiées révèlent la structure de A : axes d'étirement maximal, directions invariantes.",
      },
      {
        kind: "code",
        language: "python",
        title: "Décomposition propre",
        code: `import numpy as np

A = np.array([[2.0, 1.0],
              [1.0, 2.0]])

valeurs, vecteurs = np.linalg.eig(A)
print("Valeurs propres :", valeurs)       # [3. 1.]
print("Vecteurs propres :\n", vecteurs)   # directions (1,1) et (1,-1)

# Vérification : A @ v == lambda * v
v = vecteurs[:, 0]
print(np.allclose(A @ v, valeurs[0] * v))  # True`,
      },
      {
        kind: "text",
        text: "Application reine : la PCA. Les vecteurs propres de la matrice de covariance sont les directions de variance maximale des données ; les valeurs propres donnent la variance le long de chaque direction. Réduire la dimension = projeter sur les vecteurs propres dominants.",
      },
    ],
  },
  {
    id: "svd",
    title: "Décomposition SVD",
    level: 3,
    intro:
      "La décomposition la plus utile : toute matrice = rotation × étirement × rotation.",
    blocks: [
      {
        kind: "text",
        text: "La SVD écrit toute matrice `A = UΣVᵀ` : Vᵀ tourne, Σ étire (valeurs singulières ≥ 0 sur la diagonale), U tourne. C'est la généralisation des valeurs propres aux matrices non carrées — donc à tous les datasets (`X` est rarement carrée).",
      },
      {
        kind: "list",
        items: [
          "Valeurs singulières : l'importance de chaque « motif » dans la matrice — leur décroissance rapide signale une structure de faible rang.",
          "Approximation de rang k : garder les k plus grandes valeurs singulières = la meilleure approximation de rang k (compression, débruitage).",
          "Applications : PCA (via SVD de la matrice centrée), systèmes de recommandation (factorisation matricielle), compression d'images.",
          "En numpy : `U, s, Vt = np.linalg.svd(A)` — `s` est le vecteur des valeurs singulières.",
        ],
      },
    ],
  },
  {
    id: "derivees-profondes",
    title: "Dérivées : règles et intuition",
    level: 3,
    intro:
      "Les règles de dérivation qui reviennent partout en ML.",
    blocks: [
      {
        kind: "fields",
        title: "Règles essentielles",
        fields: [
          {
            label: "Puissances",
            value:
              "`d/dx [xⁿ] = n·xⁿ⁻¹`. Ex. `d/dx [x²] = 2x`. La base de tout.",
          },
          {
            label: "Somme",
            value:
              "La dérivée d'une somme est la somme des dérivées : on dérive terme à terme.",
          },
          {
            label: "Produit",
            value:
              "`(fg)' = f'g + fg'`. Sert dès que deux quantités variables se multiplient.",
          },
          {
            label: "Chaîne (chain rule)",
            value:
              "`d/dx [f(g(x))] = f'(g(x)) · g'(x)`. LA règle du deep learning : c'est elle qui propage l'erreur couche par couche (backprop).",
          },
          {
            label: "Exponentielle",
            value:
              "`d/dx [eˣ] = eˣ` : elle est sa propre dérivée — d'où son omniprésence (softmax, gaussiennes).",
          },
        ],
      },
      {
        kind: "text",
        text: "En pratique, on ne dérive plus à la main : la différenciation automatique (PyTorch, JAX) applique la chain rule pour nous. Mais comprendre la chain rule, c'est comprendre la backpropagation — et diagnostiquer les problèmes de gradient.",
      },
    ],
  },
  {
    id: "derivees-partielles",
    title: "Dérivées partielles",
    level: 3,
    intro:
      "Dériver par rapport à UNE variable en gelant les autres.",
    blocks: [
      {
        kind: "text",
        text: "Pour `f(x, y) = x² + 3xy + y²` : `∂f/∂x = 2x + 3y` (on traite y comme une constante), `∂f/∂y = 3x + 2y`. En ML, la perte dépend de milliers de poids : chaque dérivée partielle dit comment ajuster UN poids, les autres étant fixés.",
      },
      {
        kind: "code",
        language: "python",
        title: "Dérivées partielles avec sympy",
        code: `import sympy as sp

x, y = sp.symbols("x y")
f = x**2 + 3*x*y + y**2

print("df/dx =", sp.diff(f, x))  # 2*x + 3*y
print("df/dy =", sp.diff(f, y))  # 3*x + 2*y

# Évaluées en (1, 2) : le gradient
print("gradient en (1,2) :",
      (sp.diff(f, x).subs([(x, 1), (y, 2)]),
       sp.diff(f, y).subs([(x, 1), (y, 2)])))  # (8, 7)`,
      },
    ],
  },
  {
    id: "gradient",
    title: "Le gradient",
    level: 3,
    intro:
      "Le vecteur qui pointe vers la plus forte montée — et comment le descendre.",
    blocks: [
      {
        kind: "text",
        text: "Le gradient `∇f` rassemble toutes les dérivées partielles en un vecteur. Propriété fondamentale : il pointe dans la direction de la plus forte CROISSANCE de f. Donc `-∇f` pointe vers la plus forte DÉCROISSANCE — c'est la direction à suivre pour minimiser.",
      },
      {
        kind: "list",
        items: [
          "Norme du gradient ≈ pente : grande = loin de l'optimum (ou zone raide), petite = proche d'un point stationnaire.",
          "Gradient nul : minimum, maximum, ou point-selle — le gradient seul ne distingue pas.",
          "En ML : `∇L` où L est la perte sur tout le dataset ; en pratique on estime sur un mini-lot (gradient stochastique).",
          "Visualiser : tracer la fonction et les pas du gradient — l'intuition géométrique évite bien des erreurs.",
        ],
      },
    ],
  },
  {
    id: "descente-gradient",
    title: "Descente de gradient",
    level: 3,
    intro:
      "L'algorithme au cœur de tout l'apprentissage moderne : implémenté de zéro.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Descente de gradient sur une parabole bruitée",
        code: `import numpy as np

rng = np.random.default_rng(42)
X = rng.uniform(-3, 3, size=200)
y = 2 * X + 1 + rng.normal(0, 1, size=200)  # vrai modèle : y = 2x + 1

w, b = 0.0, 0.0   # initialisation
lr = 0.05         # pas d'apprentissage
n = len(X)

for step in range(500):
    y_pred = w * X + b
    err = y_pred - y
    # Gradients de la MSE : d/dw = (2/n) Σ err·x, d/db = (2/n) Σ err
    w -= lr * (2 / n) * np.dot(err, X)
    b -= lr * (2 / n) * err.sum()

print(f"w = {w:.3f} (vrai : 2), b = {b:.3f} (vrai : 1)")`,
      },
      {
        kind: "fields",
        title: "Les réglages qui comptent",
        fields: [
          {
            label: "Pas d'apprentissage (lr)",
            value:
              "Trop grand : ça diverge (on saute par-dessus le minimum). Trop petit : ça rampe. C'est l'hyperparamètre le plus critique — d'où les pas adaptatifs (Adam).",
          },
          {
            label: "Initialisation",
            value:
              "Partir de zéro marche ici ; sur les réseaux profonds, une mauvaise init bloque tout (voir `deep-learning`).",
          },
          {
            label: "Convexe vs non-convexe",
            value:
              "Sur une fonction convexe (un seul creux, comme ici), la descente trouve le minimum global. Sur les réseaux profonds (non convexes), elle trouve un bon minimum local — en pratique, ça suffit.",
          },
          {
            label: "Stochastique",
            value:
              "Calculer le gradient sur un mini-lot plutôt que tout le dataset : plus bruité mais bien plus rapide, et le bruit aide à échapper aux mauvais minima.",
          },
        ],
      },
    ],
  },
  {
    id: "chain-rule-backprop",
    title: "Chain rule et backpropagation",
    level: 3,
    intro:
      "Comment l'erreur traverse les couches : la mécanique de l'apprentissage profond.",
    blocks: [
      {
        kind: "text",
        text: "Un réseau est une composition : `L = perte(f₃(f₂(f₁(x))))`. La chain rule donne `∂L/∂w₁ = (∂L/∂f₃)(∂f₃/∂f₂)(∂f₂/∂f₁)(∂f₁/∂w₁)` : on propage la dérivée de la sortie vers l'entrée, couche par couche — c'est la BACKPROPAGATION. Chaque couche n'a besoin que de sa dérivée locale.",
      },
      {
        kind: "list",
        items: [
          "Efficacité : on réutilise les dérivées calculées — un seul passage avant (forward) + un seul passage arrière (backward) donne tous les gradients.",
          "Problème du gradient évanescent : multiplier beaucoup de petits nombres (< 1) fait tendre le gradient vers zéro dans les premières couches — d'où ReLU, normalisation, architectures résiduelles.",
          "Problème inverse : des gradients qui explosent — d'où le clipping (borner la norme du gradient).",
          "La différenciation automatique (autograd) implémente tout cela : comprendre le principe suffit pour diagnostiquer.",
        ],
      },
    ],
  },
  {
    id: "probabilites-axiomes",
    title: "Probabilités : fondations",
    level: 3,
    intro:
      "Les règles du jeu : axiomes, conditionnement, indépendance.",
    blocks: [
      {
        kind: "fields",
        title: "Les règles",
        fields: [
          {
            label: "Axiomes",
            value:
              "`0 ≤ P(A) ≤ 1`, `P(Ω) = 1` (le certain), `P(A∪B) = P(A) + P(B)` si A et B incompatibles. Tout le reste se démontre.",
          },
          {
            label: "Probabilité conditionnelle",
            value:
              "`P(A|B) = P(A∩B) / P(B)` : la probabilité de A sachant que B est réalisé. Le conditionnement est partout en ML (prédire Y sachant X).",
          },
          {
            label: "Indépendance",
            value:
              "`P(A∩B) = P(A)·P(B)` : savoir B n'apprend rien sur A. Hypothèse forte, souvent fausse — mais utile (naive Bayes).",
          },
          {
            label: "Probabilités totales",
            value:
              "`P(A) = Σᵢ P(A|Bᵢ)P(Bᵢ)` : décomposer selon les cas. La base du raisonnement par scénarios.",
          },
        ],
      },
      {
        kind: "text",
        text: "L'erreur classique : confondre `P(A|B)` et `P(B|A)`. « 90 % des spammeurs utilisent ce mot » (`P(mot|spam)`) n'est pas « 90 % des mails avec ce mot sont du spam » (`P(spam|mot)`) — passer de l'un à l'autre exige Bayes et la proportion de spam.",
      },
    ],
  },
  {
    id: "variables-aleatoires",
    title: "Variables aléatoires",
    level: 3,
    intro:
      "Modéliser l'incertain : distributions discrètes et continues.",
    blocks: [
      {
        kind: "fields",
        title: "Concepts",
        fields: [
          {
            label: "Variable aléatoire",
            value:
              "Une quantité dont la valeur dépend du hasard (résultat d'un dé, taille d'un individu). On la décrit par sa DISTRIBUTION, pas par une valeur.",
          },
          {
            label: "Discrète vs continue",
            value:
              "Discrète : valeurs isolées (nombre de clients) — on donne `P(X = k)`. Continue : tout intervalle (taille) — on donne une DENSITÉ `p(x)`, et `P(a ≤ X ≤ b)` est l'aire sous la courbe.",
          },
          {
            label: "Densité ≠ probabilité",
            value:
              "Une densité peut dépasser 1 — seule son INTÉGRALE vaut 1. Confusion fréquente et tenace.",
          },
          {
            label: "Fonction de répartition",
            value:
              "`F(x) = P(X ≤ x)` : la probabilité cumulée. Les quantiles (médiane = F⁻¹(0,5)) s'en déduisent.",
          },
        ],
      },
    ],
  },
  {
    id: "distributions-usuelles",
    title: "Les distributions usuelles",
    level: 3,
    intro:
      "Le bestiaire minimal : cinq distributions qui couvrent 90 % des besoins.",
    blocks: [
      {
        kind: "table",
        headers: ["Distribution", "Modélise", "Paramètres", "Usage ML"],
        rows: [
          ["Bernoulli", "Un essai oui/non", "p (prob. de succès)", "Classification binaire, cible 0/1"],
          ["Binomiale", "k succès en n essais", "n, p", "Taux de conversion, tests A/B"],
          ["Normale (gaussienne)", "Phénomène continu symétrique", "μ (moyenne), σ (écart-type)", "Erreurs, initialisation, hypothèses des tests"],
          ["Poisson", "Comptes d'événements rares", "λ (taux moyen)", "Nombre de visites, de pannes"],
          ["Exponentielle", "Temps d'attente", "λ", "Durée avant un événement (churn)"],
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Échantillonner des distributions",
        code: `import numpy as np

rng = np.random.default_rng(42)

bernoulli = rng.binomial(n=1, p=0.3, size=1000)   # 30 % de "1"
normale = rng.normal(loc=0, scale=1, size=1000)   # centrée réduite
poisson = rng.poisson(lam=4.0, size=1000)         # ~4 événements

print("Taux de 1 :", bernoulli.mean().round(2))
print("Moyenne normale :", normale.mean().round(2))`,
      },
    ],
  },
  {
    id: "esperance-variance",
    title: "Espérance et variance : les propriétés",
    level: 3,
    intro:
      "Les règles de calcul qui rendent ces notions opérationnelles.",
    blocks: [
      {
        kind: "fields",
        title: "Propriétés clés",
        fields: [
          {
            label: "Linéarité de l'espérance",
            value:
              "`E[aX + bY] = aE[X] + bE[Y]`, TOUJOURS (même si X et Y dépendants). La propriété la plus utilisée du cours.",
          },
          {
            label: "Variance d'une somme",
            value:
              "`Var(X+Y) = Var(X) + Var(Y)` seulement si X et Y INDÉPENDANTS. Sinon, ajouter `2·Cov(X,Y)`.",
          },
          {
            label: "Inégalité de Bienaymé-Tchebychev",
            value:
              "`P(|X - E[X]| ≥ kσ) ≤ 1/k²` : au moins 75 % des valeurs sont à moins de 2σ de la moyenne, quelle que soit la distribution. Une garantie universelle.",
          },
          {
            label: "Loi des grands nombres",
            value:
              "La moyenne empirique converge vers l'espérance quand n grandit. Le fondement de l'apprentissage sur données.",
          },
          {
            label: "Théorème central limite",
            value:
              "La moyenne de n variables indépendantes tend vers une NORMALE quand n grandit — d'où l'omniprésence de la cloche et la validité des intervalles de confiance.",
          },
        ],
      },
    ],
  },
  {
    id: "bayes",
    title: "Le théorème de Bayes",
    level: 3,
    intro:
      "Inverser les conditionnelles : mettre à jour ses croyances avec les données.",
    blocks: [
      {
        kind: "text",
        text: "Formule : `P(H|D) = P(D|H)·P(H) / P(D)`. En mots : la probabilité de l'hypothèse H sachant les données D = (vraisemblance des données si H est vraie × croyance a priori en H) / normalisation. C'est la mise à jour rationnelle des croyances.",
      },
      {
        kind: "code",
        language: "python",
        title: "Bayes en pratique : test médical (jouet)",
        code: `import numpy as np

# Maladie rare : 1 % de la population. Test : 99 % fiable dans les deux sens.
p_malade = 0.01
p_pos_si_malade = 0.99
p_pos_si_sain = 0.01

# P(malade | test positif) = ?
p_pos = p_pos_si_malade * p_malade + p_pos_si_sain * (1 - p_malade)
p_malade_si_pos = p_pos_si_malade * p_malade / p_pos
print(f"P(malade | +) = {p_malade_si_pos:.1%}")  # ~50 %, pas 99 % !`,
      },
      {
        kind: "text",
        text: "La leçon : même un test fiable à 99 % donne un résultat positif faux une fois sur deux quand la maladie est rare — l'a priori (1 %) domine. Applications ML : classification bayésienne, filtres anti-spam, mise à jour de modèles avec nouvelles données. Ignorer l'a priori est l'erreur bayésienne la plus coûteuse.",
      },
    ],
  },
  {
    id: "maximum-vraisemblance",
    title: "Maximum de vraisemblance",
    level: 3,
    intro:
      "Estimer les paramètres : choisir ceux qui rendent les données les plus probables.",
    blocks: [
      {
        kind: "text",
        text: "Principe : face à des données, choisir les paramètres θ qui MAXIMISENT `P(données|θ)` — la vraisemblance. Exemple : estimer le biais d'une pièce en maximisant la probabilité d'observer les lancers obtenus. On maximise souvent le LOG de la vraisemblance (sommes plutôt que produits, stabilité numérique).",
      },
      {
        kind: "list",
        items: [
          "Lien profond : minimiser l'erreur quadratique (MSE) ÉQUIVAUT au maximum de vraisemblance sous hypothèse d'erreurs gaussiennes.",
          "De même : la cross-entropy en classification = vraisemblance d'un modèle de Bernoulli.",
          "Beaucoup de « fonctions de perte » sont des log-vraisemblances négatives déguisées : les comprendre, c'est comprendre les hypothèses du modèle.",
          "Limite : le MLE peut sur-ajuster — d'où la régularisation, qui correspond à un a priori bayésien (MAP).",
        ],
      },
    ],
  },
  {
    id: "entropie",
    title: "Entropie et théorie de l'information",
    level: 3,
    intro:
      "Mesurer l'incertitude : le fondement des arbres de décision et de la cross-entropy.",
    blocks: [
      {
        kind: "text",
        text: "L'entropie `H = -Σ pᵢ log₂(pᵢ)` mesure l'incertitude d'une distribution en bits : 0 pour un événement certain, maximale quand tous les cas sont équiprobables. Une pièce équilibrée : 1 bit d'incertitude.",
      },
      {
        kind: "code",
        language: "python",
        title: "Entropie et gain d'information",
        code: `import numpy as np

def entropie(p):
    p = np.asarray(p, dtype=float)
    p = p[p > 0]
    return float(-(p * np.log2(p)).sum())

print("Pièce équilibrée :", entropie([0.5, 0.5]))  # 1.0 bit
print("Pièce truquée   :", entropie([0.9, 0.1]))  # 0.47 bit : moins incertain
print("Certain         :", entropie([1.0, 0.0]))  # 0.0`,
      },
      {
        kind: "text",
        text: "Applications : les arbres de décision choisissent la coupure qui réduit le plus l'entropie (gain d'information) ; la cross-entropy mesure l'écart entre distribution prédite et réalité — c'est la perte standard de la classification. Comprendre l'entropie, c'est comprendre pourquoi ces critères marchent.",
      },
    ],
  },
  {
    id: "regression-scratch",
    title: "Régression linéaire from scratch",
    level: 3,
    intro:
      "Le modèle le plus important, construit à la main : moindres carrés en numpy.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Moindres carrés : solution exacte",
        code: `import numpy as np

rng = np.random.default_rng(0)
X = rng.uniform(0, 10, size=(100, 1))
y = 3 * X.ravel() + 5 + rng.normal(0, 2, size=100)  # y = 3x + 5 + bruit

# Ajouter une colonne de 1 pour le biais : modèle y = Xb
Xb = np.column_stack([X, np.ones(100)])

# Solution des moindres carrés : b = (XᵀX)⁻¹ Xᵀy
b, *_ = np.linalg.lstsq(Xb, y, rcond=None)
print(f"pente = {b[0]:.2f} (vrai : 3), biais = {b[1]:.2f} (vrai : 5)")

# Erreur quadratique moyenne
mse = ((Xb @ b - y) ** 2).mean()
print(f"MSE = {mse:.2f}")`,
      },
      {
        kind: "text",
        text: "Ce que ce code enseigne : la régression linéaire a une solution EXACTE (`lstsq` résout les équations normales sans itération) ; le biais s'obtient en ajoutant une colonne de 1 ; la MSE est la perte naturelle sous hypothèse gaussienne. Tout modèle linéaire (y compris la dernière couche d'un réseau) repose sur cette mécanique.",
      },
    ],
  },
  {
    id: "biais-variance",
    title: "Biais et variance",
    level: 3,
    intro:
      "Le compromis fondamental : l'erreur se décompose.",
    blocks: [
      {
        kind: "text",
        text: "L'erreur d'un modèle se décompose en trois termes : `erreur = biais² + variance + bruit irréductible`. Le biais mesure l'écart systématique (modèle trop simple : une droite pour une courbe) ; la variance mesure la sensibilité aux données d'entraînement (modèle trop flexible : il apprend le bruit).",
      },
      {
        kind: "diagram",
        title: "Le compromis",
        lines: [
          "Complexité du modèle ──────────────────►",
          "  biais      : élevé ╲         faible",
          "                       ╲___",
          "  variance   : faible      ╲___  élevé",
          "                                    ╲",
          "  erreur totale :  ╲___╱  (minimum entre les deux)",
          "  simple                                      complexe",
        ],
      },
      {
        kind: "text",
        text: "Diagnostic : erreur élevée sur train ET test = biais (sous-apprentissage) → complexifier ou ajouter des features. Écart train/test élevé = variance (sur-apprentissage) → régulariser, plus de données, simplifier. Ce diagnostic guide tous les réglages.",
      },
    ],
  },
  {
    id: "regularisation",
    title: "Régularisation : Ridge et Lasso",
    level: 3,
    intro:
      "Contraindre les poids : la parade mathématique au sur-apprentissage.",
    blocks: [
      {
        kind: "fields",
        title: "Les deux régularisations",
        fields: [
          {
            label: "Ridge (L2)",
            value:
              "Perte = MSE + `λΣwᵢ²` : pénalise les grands poids, les réduit tous un peu. Stabilise, garde toutes les features. Correspond à un a priori gaussien sur les poids.",
          },
          {
            label: "Lasso (L1)",
            value:
              "Perte = MSE + `λΣ|wᵢ|` : annule les poids inutiles — fait de la SÉLECTION de features. Correspond à un a priori laplacien.",
          },
          {
            label: "λ (lambda)",
            value:
              "L'intensité de la pénalité, réglée par validation croisée : λ = 0 → pas de régularisation, λ énorme → modèle constant.",
          },
          {
            label: "Normaliser d'abord",
            value:
              "La pénalité dépend de l'échelle des features : toujours standardiser avant Ridge/Lasso, sinon les grandes échelles sont injustement pénalisées.",
          },
        ],
      },
    ],
  },
  {
    id: "algebre-lineaire-ml",
    title: "L'algèbre linéaire dans le ML",
    level: 3,
    intro:
      "PCA, embeddings, factorisation : les applications qui justifient toute la théorie.",
    blocks: [
      {
        kind: "fields",
        title: "Applications",
        fields: [
          {
            label: "PCA (Analyse en composantes principales)",
            value:
              "Projeter sur les vecteurs propres de la covariance (directions de variance max) : réduit la dimension en gardant l'essentiel. Visualisation, débruitage, prétraitement.",
          },
          {
            label: "Embeddings",
            value:
              "Des vecteurs denses appris (mots, utilisateurs, produits) où la géométrie encode le sens : similarité cosinus = proximité sémantique. Matrices de poids des couches d'embedding.",
          },
          {
            label: "Factorisation matricielle",
            value:
              "Décomposer la matrice utilisateurs×produits en deux matrices fines : la base des systèmes de recommandation (SVD, ALS).",
          },
          {
            label: "Attention (transformers)",
            value:
              "`softmax(QKᵀ/√d)V` : des produits scalaires (similarités requête-clé) qui pondèrent des valeurs. De l'algèbre linéaire pure au cœur des LLM.",
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
      "Le catalogue des fautes mathématiques en ML appliqué.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Inverser au lieu de résoudre",
            value:
              "Problem : `np.linalg.inv(A) @ b`. Better : `np.linalg.solve(A, b)` — plus rapide, plus stable.",
          },
          {
            label: "Oublier les dimensions",
            value:
              "Problem : `(m,n) @ (p,q)` incompatible. Better : vérifier les shapes AVANT — la règle des dimensions intérieures.",
          },
          {
            label: "Pas d'apprentissage aveugle",
            value:
              "Problem : lr par défaut, divergence ou stagnation. Better : comprendre l'effet du pas, tester plusieurs valeurs (échelle log).",
          },
          {
            label: "Confondre P(A|B) et P(B|A)",
            value:
              "Problem : lire un test à l'envers. Better : écrire Bayes explicitement avec l'a priori.",
          },
          {
            label: "Densité > 1 = impossible",
            value:
              "Problem : croire qu'une densité est une probabilité. Better : seule l'aire sous la courbe vaut une probabilité.",
          },
          {
            label: "Régulariser sans normaliser",
            value:
              "Problem : Ridge/Lasso sur features non scalées. Better : StandardScaler d'abord, toujours.",
          },
          {
            label: "Corrélation = causalité",
            value:
              "Problem : le classique. Better : une corrélation est une hypothèse, la causalité exige un design (voir `experimentation`).",
          },
          {
            label: "Ignorer le conditionnement",
            value:
              "Problem : système quasi singulier, solutions absurdes. Better : vérifier le déterminant / les valeurs singulières quand ça diverge.",
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
          "Triplet d'apprentissage : concept → formule → code numpy qui tourne.",
          "Visualiser chaque notion : une courbe, une descente pas à pas, une distribution simulée.",
          "Vérifier les dimensions : la règle `(m,n) @ (n,p)` avant chaque multiplication.",
          "Ne jamais inverser : `solve` et `lstsq` plutôt que `inv`.",
          "Simuler quand la formule résiste : le Monte-Carlo est un excellent professeur.",
          "Relier au ML : chaque concept doit trouver son application (où apparaît-il vraiment ?).",
          "Standardiser avant de régulariser ou de mesurer des distances.",
          "Douter des certitudes : intervalles, distributions — jamais de point sans incertitude.",
          "Revenir aux fondations quand ça bloque : 80 % des bugs de convergence sont des maths de base.",
          "Enseigner : expliquer un concept à quelqu'un est le test ultime de sa compréhension.",
        ],
      },
    ],
  },
  {
    id: "projet-regression",
    title: "Projet : régression linéaire from scratch",
    level: 3,
    intro:
      "Construire une régression complète sans bibliothèque ML : le projet fondateur.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Générer des données",
            detail:
              "Un jeu synthétique avec une vraie relation connue (`y = 3x + 5 + bruit`) : on sait ce que le modèle doit retrouver.",
          },
          {
            title: "Implémenter les moindres carrés",
            detail:
              "`np.linalg.lstsq` sur la matrice augmentée : retrouver pente et biais, comparer aux vraies valeurs.",
          },
          {
            title: "Implémenter la descente de gradient",
            detail:
              "La version itérative : initialiser, calculer les gradients, itérer. Comparer avec la solution exacte.",
          },
          {
            title: "Ajouter la régularisation",
            detail:
              "Ridge à la main (ajouter `λI` dans les équations) : observer l'effet sur les poids quand λ grandit.",
          },
          {
            title: "Diagnostiquer biais/variance",
            detail:
              "Faire varier la complexité (polynômes de degré croissant) et tracer les erreurs train/test : voir le compromis en action.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-descente",
    title: "Projet : descente de gradient visualisée",
    level: 3,
    intro:
      "Voir l'apprentissage : animer la descente sur des paysages variés.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir des paysages",
            detail:
              "Une parabole (convexe, facile), une fonction avec un plateau, une vallée étroite (mal conditionnée) : trois comportements très différents.",
          },
          {
            title: "Implémenter la descente générique",
            detail:
              "Une fonction qui prend f, son gradient, un point de départ et un pas — et enregistre la trajectoire.",
          },
          {
            title: "Visualiser les trajectoires",
            detail:
              "Tracer le paysage (courbes de niveau) et le chemin suivi : voir l'effet du pas — trop petit (rampe), bon (converge), trop grand (diverge ou oscille).",
          },
          {
            title: "Comparer les variantes",
            detail:
              "Descente classique vs avec momentum (inertie) : observer la différence sur la vallée étroite.",
          },
          {
            title: "Rédiger les enseignements",
            detail:
              "En une page : ce que chaque expérience apprend sur le pas, l'initialisation, le conditionnement — transférable à tout entraînement de modèle.",
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
      "Aller plus loin, en commençant toujours par les références du domaine.",
    blocks: [
      {
        kind: "fields",
        title: "Références (à privilégier)",
        fields: [
          {
            label: "« Mathematics for Machine Learning » (Deisenroth, Faisal, Ong)",
            value:
              "Le livre de référence, gratuit en ligne : algèbre linéaire, calcul, probas, puis leur usage en ML. Progressif et rigoureux.",
          },
          {
            label: "3Blue1Brown — « Essence of Linear Algebra » / « Essence of Calculus »",
            value:
              "Des visualisations animées qui donnent l'intuition géométrique : la meilleure porte d'entrée visuelle.",
          },
          {
            label: "Documentation numpy",
            value:
              "La référence des opérations implémentées ici : `linalg`, `random`, broadcasting — le manuel du laboratoire.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : refaire chaque notion en numpy avant de passer à la suivante — le code est le vrai cahier d'exercices.",
          "Ensuite : la compétence `statistics` pour l'inférence, `machine-learning` pour les modèles, `deep-learning` pour le calcul à grande échelle.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Les mathématiques maîtrisées, voici les prolongements naturels dans la roadmap AI Engineer.",
    blocks: [
      {
        kind: "list",
        items: [
          "`statistics` : l'inférence statistique — tests, régression, modèles probabilistes.",
          "`machine-learning` : les modèles classiques où ces maths s'appliquent directement.",
          "`deep-learning` : réseaux de neurones — backprop et optimisation à grande échelle.",
          "`nlp` : embeddings, attention, transformers — l'algèbre linéaire en action.",
          "Revenir à la roadmap : valider Mathématiques et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

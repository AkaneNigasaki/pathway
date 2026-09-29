import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du Deep Learning : des réseaux de neurones
 * aux applications professionnelles. 3 niveaux d'information
 * (Aperçu / Pratique / Approfondi) avec divulgation progressive.
 * Tous les textes supportent le code inline entre backticks.
 * Approche : pédagogie par le concept et la pratique (PyTorch comme
 * fil conducteur), sans mathématiques excessives, sans données inventées.
 */
export const LEARNING_DEEP_LEARNING: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est le deep learning, ce qu'il n'est pas, et pourquoi il a transformé la vision par ordinateur et le traitement du langage.",
    blocks: [
      {
        kind: "text",
        text: "Le deep learning (apprentissage profond) est une branche du machine learning qui utilise des réseaux de neurones artificiels à plusieurs couches — d'où « profond ». Au lieu de décrire à la main les caractéristiques à extraire des données (comme le ferait le ML classique), on donne au réseau des exemples bruts (images, textes, sons) et il apprend lui-même les représentations utiles, couche après couche.",
      },
      {
        kind: "text",
        text: "L'idée remonte aux années 1940-1980 (perceptron, rétropropagation), mais trois ingrédients l'ont rendue réellement puissante à partir des années 2010 : des jeux de données massifs, des processeurs graphiques (GPU) capables de calculs parallèles intensifs, et des architectures plus profondes et mieux entraînées. Résultat : des performances inédites en reconnaissance d'images, en traduction, en synthèse vocale et en génération de texte.",
      },
      {
        kind: "text",
        text: "Le deep learning apprend des représentations hiérarchiques des données grâce à des réseaux de neurones profonds entraînés sur de nombreux exemples.",
      },
      {
        kind: "text",
        text: "Certaines tâches (reconnaître un chat sur une photo, comprendre une phrase) sont impossibles à coder avec des règles explicites : il y a trop de cas particuliers. Plutôt que d'écrire les règles, on fait apprendre le comportement à partir d'exemples.",
      },
      {
        kind: "text",
        text: "Données brutes et complexes (images, audio, texte naturel), beaucoup d'exemples étiquetés disponibles, et objectif de performance élevé. Inutile pour des données tabulaires simples ou des problèmes à règles claires.",
      },
      {
        kind: "fields",
        title: "Le deep learning : l'essentiel",
        fields: [
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni de la magie, ni une intelligence générale : un réseau entraîné à reconnaître des chats ne sait rien faire d'autre. Il ne « comprend » pas, il approxime des motifs statistiques appris sur ses données d'entraînement.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Concepts liés : machine learning, réseau de neurones, GPU, données d'entraînement.",
          "Bonne pratique : avant d'envisager le deep learning, vérifiez qu'un modèle classique plus simple ne suffit pas (voir la section suivante).",
        ],
      },
    ],
  },
  {
    id: "ml-vs-deep-learning",
    title: "Deep learning ou ML classique ?",
    level: 1,
    intro:
      "La question la plus rentable à se poser avant tout projet : ai-je vraiment besoin d'un réseau de neurones ?",
    blocks: [
      {
        kind: "text",
        text: "Le machine learning « classique » (régressions, arbres de décision, forêts aléatoires, SVM) travaille sur des caractéristiques que vous définissez : pour prédire le prix d'un appartement, vous fournissez la surface, le quartier, le nombre de pièces. Le deep learning, lui, accepte des données brutes — pixels d'une image, mots d'un texte — et apprend lui-même les caractéristiques intermédiaires.",
      },
      {
        kind: "table",
        headers: ["Critère", "ML classique", "Deep learning"],
        rows: [
          [
            "Données d'entrée",
            "Caractéristiques définies à la main",
            "Données brutes (images, texte, audio)",
          ],
          [
            "Volume de données nécessaire",
            "Fonctionne avec peu d'exemples",
            "Exige beaucoup d'exemples étiquetés",
          ],
          [
            "Puissance de calcul",
            "Modeste (CPU suffit souvent)",
            "Importante (GPU recommandé)",
          ],
          [
            "Interprétabilité",
            "Relativement lisible (un arbre se lit)",
            "Boîte noire (difficile à expliquer)",
          ],
          [
            "Mise au point",
            "Rapide, peu d'hyperparamètres",
            "Longue, nombreux réglages",
          ],
          [
            "Points forts typiques",
            "Données tabulaires, petits jeux de données",
            "Vision, langage naturel, audio",
          ],
        ],
      },
      {
        kind: "text",
        text: "Choisissez le ML classique par défaut ; passez au deep learning quand les données sont brutes/complexes et nombreuses.",
      },
      {
        kind: "fields",
        title: "Fiche décision",
        fields: [          {
            label: "Erreur fréquente",
            value:
              "Lancer un réseau de neurones sur un tableau de 500 lignes : un modèle classique fera aussi bien, en quelques secondes, avec un modèle explicable.",
          },
          {
            label: "Bonne pratique",
            value:
              "Commencez toujours par une baseline simple (modèle classique ou heuristique). Elle donne un point de comparaison et révèle si le problème vaut le coût du deep learning.",
          },
          {
            label: "Concepts liés",
            value: "overfitting, données d'entraînement, transfert learning.",
          },
        ],
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : données → réseau → prédiction",
    level: 1,
    intro:
      "La seule image à garder en tête avant tout le reste : un réseau de neurones est une fonction ajustable.",
    blocks: [
      {
        kind: "diagram",
        title: "Le deep learning, en une image",
        lines: [
          "Données d'entraînement (exemples + bonnes réponses)",
          "     │",
          "     ▼",
          "Réseau de neurones (milliers de paramètres ajustables)",
          "     │  ┌── phase d'entraînement : on ajuste les paramètres",
          "     │  │   pour que les prédictions collent aux exemples",
          "     ▼  │",
          "Prédictions ◄──┘",
          "     │",
          "     ▼",
          "Nouvelles données → prédiction (phase d'utilisation)",
        ],
      },
      {
        kind: "text",
        text: "Un réseau de neurones est une fonction mathématique avec des milliers (ou millions) de paramètres réglables, appelés poids. L'entraînement consiste à ajuster ces poids pour que la fonction produise les bonnes réponses sur les exemples fournis. Une fois entraîné, on fige les poids et on utilise la fonction sur de nouvelles données : c'est l'inférence.",
      },
      {
        kind: "fields",
        title: "Vocabulaire minimal",
        fields: [
          {
            label: "Poids (weights)",
            value:
              "Les paramètres ajustables du réseau. « Entraîner », c'est trouver de bonnes valeurs pour ces poids.",
          },
          {
            label: "Entraînement (training)",
            value:
              "Phase où le réseau voit des exemples avec leurs bonnes réponses et ajuste ses poids.",
          },
          {
            label: "Inférence",
            value:
              "Phase d'utilisation : le réseau entraîné prédit sur de nouvelles données, sans apprendre.",
          },
          {
            label: "Dataset",
            value:
              "Le jeu de données : exemples d'entraînement, de validation et de test.",
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
      "Ce qu'il faut maîtriser (ou au moins découvrir) avant de se lancer sérieusement.",
    blocks: [
      {
        kind: "list",
        items: [
          "`Python` : le langage de tout l'écosystème (PyTorch, TensorFlow, scikit-learn). À l'aise avec les fonctions, les listes, les dictionnaires et `pip`.",
          "`NumPy` (notions) : les tableaux numériques et les opérations vectorisées — les tenseurs en sont l'extension.",
          "Mathématiques (notions, pas besoin d'être expert) : ce qu'est une fonction, une dérivée (pente), une matrice. L'intuition suffit pour commencer ; les détails viennent avec la pratique.",
          "Machine learning classique (notions) : savoir ce qu'est un jeu d'entraînement/test et la notion de surapprentissage rend le deep learning beaucoup plus lisible.",
          "Ligne de commande et environnement virtuel Python : pour installer proprement les bibliothèques.",
        ],
      },
      {
        kind: "text",
        text: "Bonne nouvelle : on peut écrire et entraîner un premier réseau de neurones avec quelques dizaines de lignes de Python, sans maîtriser les mathématiques sous-jacentes. Les frameworks modernes (PyTorch, Keras) cachent la complexité du calcul des gradients.",
      },
    ],
  },
  {
    id: "installation-environnement",
    title: "Préparer l'environnement Python",
    level: 2,
    intro:
      "Un environnement virtuel propre par projet : la base de tout travail sérieux en Python scientifique.",
    blocks: [
      {
        kind: "command",
        label: "Créer un environnement virtuel",
        command: "python -m venv dl-env",
        why: "Isole les dépendances du projet du Python système : les versions de `torch`, `numpy` ou `matplotlib` installées ici n'affecteront aucun autre projet.",
        verify: "Le dossier `dl-env/` est créé dans le répertoire courant.",
      },
      {
        kind: "command",
        label: "Activer l'environnement (Linux / macOS)",
        command: "source dl-env/bin/activate",
        why: "L'activation fait pointer `python` et `pip` vers l'environnement isolé. Le nom de l'environnement apparaît entre parenthèses dans le terminal.",
        verify: "Le prompt affiche `(dl-env)` au début de la ligne.",
      },
      {
        kind: "command",
        label: "Activer l'environnement (Windows)",
        command: "dl-env\\Scripts\\activate",
        why: "Équivalent Windows de l'activation : même isolation, chemins adaptés au système.",
        verify: "Le prompt affiche `(dl-env)` au début de la ligne.",
      },
      {
        kind: "text",
        text: "Erreur fréquente : installer les bibliothèques dans le Python système avec `sudo pip`. Cela casse les paquets du système et mélange les versions entre projets. Toujours un environnement virtuel par projet.",
      },
    ],
  },
  {
    id: "installation-pytorch",
    title: "Installer PyTorch",
    level: 2,
    intro:
      "PyTorch est le framework retenu comme fil conducteur de cette page : installation réelle, étape par étape.",
    blocks: [
      {
        kind: "text",
        text: "PyTorch (maintenu par la fondation PyTorch, initialement développé par Meta) s'installe comme un simple paquet Python. La version CPU suffit pour apprendre et pour les petits modèles ; la version GPU (CUDA, cartes NVIDIA) accélère fortement l'entraînement des gros réseaux. Commencez en CPU : c'est plus simple et cela suffit pour tout ce qui suit.",
      },
      {
        kind: "command",
        label: "Installer PyTorch (CPU) et les utilitaires",
        command: "pip install torch torchvision numpy matplotlib",
        why: "`torch` est le framework, `torchvision` fournit datasets et modèles de vision prêts à l'emploi, `numpy` et `matplotlib` servent à manipuler et visualiser les données.",
        verify: "L'installation se termine sans erreur (téléchargement de quelques centaines de Mo).",
      },
      {
        kind: "command",
        label: "Vérifier l'installation",
        command: "python -c \"import torch; print(torch.__version__)\"",
        why: "Importe PyTorch et affiche sa version : si l'import réussit, l'installation est fonctionnelle.",
        verify: "Un numéro de version s'affiche (par exemple `2.x.x`).",
      },
      {
        kind: "text",
        text: "Note : pour une installation GPU, le site officiel pytorch.org propose un sélecteur (OS, gestionnaire de paquets, version de CUDA) qui génère la commande exacte. N'installez la version CUDA que si vous avez une carte NVIDIA compatible et un vrai besoin d'accélération.",
      },
      {
        kind: "list",
        items: [
          "Concepts liés : tenseurs, GPU, environnement virtuel.",
          "Bonne pratique : figez vos versions avec `pip freeze > requirements.txt` pour reproduire l'environnement plus tard.",
        ],
      },
    ],
  },
  {
    id: "pytorch-vs-tensorflow",
    title: "PyTorch vs TensorFlow / Keras",
    level: 2,
    intro:
      "Les deux grands frameworks, présentés factuellement : aucun n'est « le meilleur » dans l'absolu.",
    blocks: [
      {
        kind: "table",
        headers: ["Aspect", "PyTorch", "TensorFlow / Keras"],
        rows: [
          [
            "Philosophie",
            "Style Python impératif (« eager » par défaut) : le code s'exécute ligne par ligne",
            "Keras : API de haut niveau simple ; TensorFlow : graphe optimisé pour la production",
          ],
          [
            "Prise en main",
            "Proche du Python/NumPy habituel",
            "Keras très accessible pour débuter rapidement",
          ],
          [
            "Recherche",
            "Très utilisé dans la recherche académique",
            "Présent aussi, avec un écosystème historique fort",
          ],
          [
            "Production",
            "TorchServe, export ONNX, intégrations mobiles",
            "TensorFlow Serving, TFLite (mobile), écosystème déploiement mature",
          ],
          [
            "Installation",
            "`pip install torch`",
            "`pip install tensorflow`",
          ],
        ],
      },
      {
        kind: "text",
        text: "Les deux frameworks font la même chose ; le choix dépend de votre contexte (équipe, existant, cible de déploiement).",
      },
      {
        kind: "fields",
        title: "Fiche de choix",
        fields: [          {
            label: "Pourquoi deux frameworks",
            value:
              "Histoire et philosophie différentes : PyTorch est né d'une approche « Python d'abord » appréciée en recherche, TensorFlow d'une approche « production d'abord » chez Google. Leurs capacités se sont largement rejointes.",
          },
          {
            label: "Quand choisir l'un ou l'autre",
            value:
              "PyTorch : vous suivez des tutoriels récents, visez la recherche ou voulez un code très lisible. TensorFlow/Keras : votre équipe ou votre infrastructure l'utilise déjà, ou vous ciblez du déploiement mobile/embarqué via TFLite.",
          },
          {
            label: "Bonne pratique",
            value:
              "Apprenez bien UN framework avant de comparer. Les concepts (tenseurs, loss, optimizers) sont transférables ; seule l'API change.",
          },
        ],
      },
    ],
  },
  {
    id: "premier-projet",
    title: "Premier projet : structure minimale",
    level: 2,
    intro: "L'arborescence et les étapes pour un premier projet de deep learning propre.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le dossier et l'environnement",
            detail:
              "Créez `mon-premier-reseau/`, puis un environnement virtuel dedans (`python -m venv dl-env`) et activez-le.",
          },
          {
            title: "Installer les dépendances",
            detail:
              "`pip install torch torchvision numpy matplotlib`, puis figez avec `pip freeze > requirements.txt`.",
          },
          {
            title: "Créer le script d'entraînement",
            detail:
              "Un fichier `train.py` : chargement des données, définition du modèle, boucle d'entraînement, sauvegarde des poids.",
          },
          {
            title: "Lancer et observer",
            detail:
              "`python train.py` : regardez la loss diminuer à chaque époque. Si elle ne bouge pas, quelque chose cloche (voir la section debugging).",
          },
          {
            title: "Évaluer séparément",
            detail:
              "Un second script (ou une section) `evaluate.py` qui charge les poids sauvegardés et mesure la performance sur des données jamais vues.",
          },
        ],
      },
      {
        kind: "diagram",
        title: "Arborescence recommandée",
        lines: [
          "mon-premier-reseau/",
          "├── dl-env/              # environnement virtuel (à ignorer via git)",
          "├── requirements.txt     # dépendances figées",
          "├── train.py             # entraînement + sauvegarde des poids",
          "├── evaluate.py          # évaluation sur données de test",
          "├── model.py             # définition du réseau (optionnel au début)",
          "└── data/                # jeux de données (à ignorer via git si lourds)",
        ],
      },
    ],
  },
  {
    id: "tenseurs-premiers-pas",
    title: "Les tenseurs : la matière première",
    level: 2,
    intro:
      "Tout, en deep learning, est un tenseur : comprenez cette structure et le reste suit.",
    blocks: [
      {
        kind: "text",
        text: "Un tenseur est un tableau multidimensionnel de nombres : un scalaire est un tenseur de dimension 0, un vecteur de dimension 1, une matrice de dimension 2. En deep learning, on manipule des tenseurs de dimension 3 ou 4 : une image couleur est un tenseur (hauteur, largeur, canaux), un lot d'images ajoute une dimension (lot, hauteur, largeur, canaux). Les poids du réseau sont eux aussi des tenseurs.",
      },
      {
        kind: "code",
        language: "python",
        title: "Premiers tenseurs avec PyTorch",
        code: "import torch\n\n# Scalaire, vecteur, matrice\ns = torch.tensor(3.0)\nv = torch.tensor([1.0, 2.0, 3.0])\nm = torch.tensor([[1.0, 2.0], [3.0, 4.0]])\n\nprint(s.shape)  # torch.Size([])  -> dimension 0\nprint(v.shape)  # torch.Size([3]) -> dimension 1\nprint(m.shape)  # torch.Size([2, 2]) -> dimension 2\n\n# Un \"lot\" de 32 images 28x28 en niveaux de gris : tenseur 4D\nimages = torch.randn(32, 1, 28, 28)\nprint(images.shape)  # torch.Size([32, 1, 28, 28])\n\n# Opérations élément par élément, comme NumPy\nprint((v * 2).tolist())  # [2.0, 4.0, 6.0]",
      },
      {
        kind: "text",
        text: "Un tableau de nombres à N dimensions ; la brique de base des données et des poids.",
      },
      {
        kind: "text",
        text: "Les GPU sont optimisés pour appliquer la même opération à des milliers de nombres en parallèle : le tenseur est le format qui exploite ce parallélisme.",
      },
      {
        kind: "fields",
        title: "Fiche concept : tenseur",
        fields: [          {
            label: "Erreur fréquente",
            value:
              "Se tromper de dimensions (`shape`) : la cause n°1 des erreurs de taille en deep learning. Affichez `tensor.shape` dès qu'un doute apparaît.",
          },
          {
            label: "Bonne pratique",
            value:
              "Nommez vos dimensions en commentaire (`# (lot, canaux, hauteur, largeur)`) tant que les conventions ne sont pas automatiques.",
          },
          {
            label: "Concepts liés",
            value: "NumPy, GPU, couches denses.",
          },
        ],
      },
    ],
  },
  {
    id: "premier-reseau",
    title: "Définir un premier réseau",
    level: 2,
    intro:
      "Un réseau de neurones en PyTorch : une classe qui empile des couches.",
    blocks: [
      {
        kind: "text",
        text: "En PyTorch, un modèle est une classe qui hérite de `torch.nn.Module`. On déclare les couches dans `__init__` et on décrit le passage des données dans `forward` : entrée → couche 1 → activation → couche 2 → sortie. Ci-dessous, un réseau minuscule qui classe des images 28×28 en 10 catégories (chiffres manuscrits, par exemple).",
      },
      {
        kind: "code",
        language: "python",
        title: "model.py — un réseau à deux couches",
        code: "import torch\nimport torch.nn as nn\n\nclass PetitReseau(nn.Module):\n    def __init__(self):\n        super().__init__()\n        # 28*28 pixels en entrée -> 128 neurones -> 10 sorties\n        self.couche1 = nn.Linear(28 * 28, 128)\n        self.activation = nn.ReLU()\n        self.couche2 = nn.Linear(128, 10)\n\n    def forward(self, x):\n        x = x.view(x.size(0), -1)  # aplatit l'image en vecteur\n        x = self.couche1(x)\n        x = self.activation(x)\n        return self.couche2(x)\n\nmodele = PetitReseau()\nprint(modele)  # affiche l'architecture",
      },
      {
        kind: "text",
        text: "Lisez ce code comme une recette : `nn.Linear(784, 128)` crée une couche qui transforme 784 nombres en 128, avec des poids ajustables initialisés au hasard. `nn.ReLU()` est la fonction d'activation qui introduit la non-linéarité (sans elle, empiler des couches ne servirait à rien). La sortie contient 10 nombres : un score par catégorie.",
      },
      {
        kind: "list",
        items: [
          "Erreur fréquente : oublier l'activation entre les couches — le réseau devient équivalent à une seule couche linéaire, incapable d'apprendre des motifs complexes.",
          "Bonne pratique : commencez petit (peu de couches, peu de neurones) et n'agrandissez que si le modèle sous-apprend.",
        ],
      },
    ],
  },
  {
    id: "boucle-entrainement",
    title: "La boucle d'entraînement",
    level: 2,
    intro:
      "Le cœur du deep learning : répéter « prédire, mesurer l'erreur, corriger » des milliers de fois.",
    blocks: [
      {
        kind: "text",
        text: "L'entraînement suit toujours le même cycle : (1) le réseau prédit sur un lot d'exemples (forward), (2) on mesure l'écart entre prédictions et bonnes réponses avec une fonction de perte (loss), (3) on calcule comment ajuster chaque poids pour réduire l'erreur (rétropropagation), (4) l'optimiseur applique ces ajustements. On répète sur tout le jeu de données, plusieurs fois (époques).",
      },
      {
        kind: "code",
        language: "python",
        title: "train.py — boucle d'entraînement canonique",
        code: "import torch\nimport torch.nn as nn\n\nmodele = PetitReseau()\nloss_fn = nn.CrossEntropyLoss()          # mesure l'erreur de classification\noptimizer = torch.optim.Adam(modele.parameters(), lr=0.001)\n\nfor epoque in range(5):\n    for images, etiquettes in chargeur_train:  # lot par lot\n        predictions = modele(images)           # 1. forward\n        loss = loss_fn(predictions, etiquettes)  # 2. mesure l'erreur\n        optimizer.zero_grad()                  # 3a. remet les gradients à zéro\n        loss.backward()                        # 3b. rétropropagation\n        optimizer.step()                       # 4. ajuste les poids\n    print(f\"Époque {epoque + 1}, loss = {loss.item():.4f}\")\n\ntorch.save(modele.state_dict(), \"poids.pth\")  # sauvegarde",
      },
      {
        kind: "fields",
        title: "Chaque ligne, expliquée",
        fields: [
          {
            label: "`optimizer.zero_grad()`",
            value:
              "Les gradients s'accumulent par défaut en PyTorch : il faut les remettre à zéro avant chaque lot, sinon les corrections se mélangent.",
          },
          {
            label: "`loss.backward()`",
            value:
              "Déclenche la rétropropagation : calcule, pour chaque poids, dans quel sens et de combien le modifier pour réduire l'erreur.",
          },
          {
            label: "`optimizer.step()`",
            value:
              "Applique les ajustements calculés. `Adam` avec `lr=0.001` (taux d'apprentissage) est un point de départ standard.",
          },
          {
            label: "`torch.save(...)`",
            value:
              "Sauvegarde les poids appris. Sans cela, tout l'entraînement est perdu à la fin du script.",
          },
        ],
      },
      {
        kind: "text",
        text: "Ce que vous devez observer : la loss diminue au fil des époques. Si elle stagne ou explose, c'est un signal de debugging (mauvais taux d'apprentissage, données non normalisées, bug dans le forward).",
      },
    ],
  },
  {
    id: "donnees-datasets",
    title: "Les données : carburant du modèle",
    level: 2,
    intro:
      "Un réseau ne vaut que ses données : qualité, quantité et représentativité.",
    blocks: [
      {
        kind: "text",
        text: "Chaque exemple d'entraînement est une paire (entrée, bonne réponse) : une image et son étiquette (« chat »), un texte et sa catégorie. Le réseau apprend les motifs présents dans ces exemples — y compris leurs biais. Des données mal étiquetées, déséquilibrées ou non représentatives du cas réel produisent un modèle médiocre, quelle que soit l'architecture.",
      },
      {
        kind: "list",
        items: [
          "Quantité : plus le réseau est grand, plus il faut d'exemples. Avec peu de données, préférez le transfert learning (un modèle pré-entraîné affiné sur vos données).",
          "Qualité : des étiquettes fausses ou incohérentes plafonnent la performance — le réseau apprend le bruit.",
          "Représentativité : si vos photos d'entraînement sont toutes prises en plein jour, le modèle échouera de nuit. Les données d'entraînement doivent ressembler aux données réelles.",
          "Datasets publics classiques pour apprendre : MNIST (chiffres manuscrits), CIFAR (petites images couleur), accessibles directement via `torchvision.datasets` — idéals pour s'entraîner sans collecter de données.",
        ],
      },
      {
        kind: "text",
        text: "L'ensemble des exemples étiquetés sur lesquels le réseau apprend, validé et testé.",
      },
      {
        kind: "fields",
        title: "Fiche concept : dataset",
        fields: [          {
            label: "Erreur fréquente",
            value:
              "Évaluer le modèle sur les données d'entraînement et croire à une performance excellente : c'est de la mémorisation, pas de l'apprentissage (voir train/val/test).",
          },
          {
            label: "Bonne pratique",
            value:
              "Séparez toujours les données en trois : entraînement (apprend), validation (règle les hyperparamètres), test (mesure finale, touché une seule fois).",
          },
          {
            label: "Concepts liés",
            value: "overfitting, transfert learning, biais des données.",
          },
        ],
      },
    ],
  },
  {
    id: "editeurs-outils",
    title: "Éditeurs et outils du quotidien",
    level: 2,
    intro: "Trois environnements courants, sans classement : chacun a son usage.",
    blocks: [
      {
        kind: "fields",
        title: "Environnements",
        fields: [
          {
            label: "VS Code (+ extension Python)",
            value:
              "Éditeur généraliste : scripts `train.py`, debugging pas à pas, terminal intégré. Adapté quand le projet devient un vrai code à versionner.",
          },
          {
            label: "Jupyter Notebook / JupyterLab",
            value:
              "Cellules exécutables une par une : idéal pour explorer des données, visualiser des images et itérer vite sur des expériences. Le standard de l'expérimentation.",
          },
          {
            label: "Google Colab",
            value:
              "Jupyter dans le navigateur avec accès GPU gratuit (limité). Pratique pour s'entraîner sans matériel, sans rien installer.",
          },
        ],
      },
      {
        kind: "command",
        label: "Installer Jupyter localement",
        command: "pip install jupyterlab",
        why: "Fournit l'interface JupyterLab pour créer des notebooks d'expérimentation en local.",
        verify: "La commande `jupyter lab` ouvre l'interface dans le navigateur.",
      },
      {
        kind: "text",
        text: "Règle pratique : Jupyter pour explorer et expérimenter, scripts Python versionnés (Git) pour l'entraînement reproductible et la production. Les notebooks mélangés à de la logique critique deviennent vite ingérables.",
      },
    ],
  },
  {
    id: "workflow-professionnel",
    title: "Le workflow professionnel",
    level: 2,
    intro: "À quoi ressemble un projet de deep learning mené sérieusement, de bout en bout.",
    blocks: [
      {
        kind: "diagram",
        title: "Cycle de vie d'un modèle",
        lines: [
          "1. Définir le problème",
          "   │  Quelle prédiction ? Quelle métrique de succès ?",
          "   ▼",
          "2. Collecter / préparer les données",
          "   │  Nettoyage, étiquetage, split train/val/test",
          "   ▼",
          "3. Baseline simple",
          "   │  Modèle classique ou heuristique : point de comparaison",
          "   ▼",
          "4. Expérimenter (notebooks)",
          "   │  Architecture, hyperparamètres, augmentation",
          "   ▼",
          "5. Entraîner (scripts versionnés)",
          "   │  Reproductible : code + données + seed fixés",
          "   ▼",
          "6. Évaluer sur le test",
          "   │  Une seule fois, métriques + analyse d'erreurs",
          "   ▼",
          "7. Déployer et surveiller",
          "      Inférence en production, détection de dérive",
        ],
      },
      {
        kind: "text",
        text: "Deux habitudes distinguent l'amateur du professionnel : la reproductibilité (même code + mêmes données = mêmes résultats, via versions figées et graine aléatoire fixée) et le versionnage (code dans Git, mais aussi les datasets et les poids — voir la section MLOps).",
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "neurone-detail",
    title: "Le neurone artificiel, en détail",
    level: 3,
    intro: "La brique élémentaire : une somme pondérée suivie d'une non-linéarité.",
    blocks: [
      {
        kind: "text",
        text: "Un neurone reçoit plusieurs entrées (nombres), multiplie chacune par un poids, additionne le tout, ajoute un biais, puis applique une fonction d'activation. Mathématiquement : `sortie = activation(somme(poids_i × entrée_i) + biais)`. Les poids et le biais sont les paramètres que l'entraînement ajuste.",
      },
      {
        kind: "diagram",
        title: "Anatomie d'un neurone",
        lines: [
          "entrées x1 ──(× w1)──┐",
          "entrées x2 ──(× w2)──┼──► somme ──► + biais b ──► activation ──► sortie",
          "entrées x3 ──(× w3)──┘",
          "",
          "w1, w2, w3, b : paramètres appris pendant l'entraînement",
        ],
      },
      {
        kind: "text",
        text: "Un neurone calcule une combinaison linéaire de ses entrées puis la transforme de façon non linéaire.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [          {
            label: "Pourquoi la fonction d'activation",
            value:
              "Sans elle, tout le réseau s'effondrerait en une simple fonction linéaire, incapable de modéliser des frontières complexes (un cercle, par exemple).",
          },
          {
            label: "Le biais",
            value:
              "Un décalage ajustable qui permet au neurone de s'activer même quand toutes les entrées sont nulles : sans biais, la fonction passerait toujours par zéro.",
          },
          {
            label: "Concepts liés",
            value: "fonctions d'activation, couches denses, perceptron.",
          },
        ],
      },
    ],
  },
  {
    id: "couches-denses",
    title: "Les couches : empiler les neurones",
    level: 3,
    intro: "Un réseau, c'est des couches de neurones connectées : comprendre leur rôle respectif.",
    blocks: [
      {
        kind: "text",
        text: "Une couche dense (fully connected) connecte chaque neurone d'entrée à chaque neurone de sortie. Un réseau typique empile : une couche d'entrée (les données brutes), une ou plusieurs couches cachées (les représentations intermédiaires apprises), et une couche de sortie (une valeur par catégorie, ou une valeur continue pour une régression).",
      },
      {
        kind: "diagram",
        title: "Réseau à une couche cachée",
        lines: [
          "entrée (784)      cachée (128)      sortie (10)",
          "  ○ ────────────────► ● ────────────────► ○  chat",
          "  ○ ────────────────► ● ────────────────► ○  chien",
          "  ○ ────────────────► ● ────────────────► ○  oiseau",
          "  ⋮     (poids)       ⋮      (poids)       ⋮",
          "chaque ○ d'entrée connecté à chaque ● caché,",
          "chaque ● caché connecté à chaque ○ de sortie",
        ],
      },
      {
        kind: "text",
        text: "Les couches cachées transforment progressivement les données brutes en représentations de plus en plus abstraites et utiles.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [          {
            label: "Pourquoi la profondeur",
            value:
              "Chaque couche réutilise les motifs détectés par la précédente : en vision, pixels → contours → formes → objets. Cette hiérarchie est la force du « profond ».",
          },
          {
            label: "Quand s'arrêter d'empiler",
            value:
              "Plus de couches = plus de capacité mais aussi plus de données nécessaires et plus de risque de surapprentissage. La profondeur se justifie par la complexité du problème.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Croire que « plus profond = toujours mieux » : sur un problème simple, un réseau trop grand mémorise au lieu d'apprendre.",
          },
        ],
      },
    ],
  },
  {
    id: "fonctions-activation",
    title: "Les fonctions d'activation",
    level: 3,
    intro: "La non-linéarité qui donne au réseau sa puissance : les principales, et quand les utiliser.",
    blocks: [
      {
        kind: "table",
        headers: ["Fonction", "Formule (idée)", "Usage typique"],
        rows: [
          [
            "ReLU",
            "`max(0, x)` : garde les positifs, annule le reste",
            "Couches cachées — le choix par défaut le plus courant",
          ],
          [
            "Sigmoïde",
            "Écrase vers [0, 1]",
            "Sortie binaire (probabilité d'une classe) ; évitée en couches cachées (gradients qui s'éteignent)",
          ],
          [
            "Softmax",
            "Convertit des scores en probabilités qui somment à 1",
            "Sortie de classification multi-classes",
          ],
          [
            "Tanh",
            "Écrase vers [-1, 1], centrée en zéro",
            "Couches cachées quand des valeurs centrées aident (ex. certains RNN)",
          ],
          [
            "GELU / SiLU",
            "Variantes lisses de ReLU",
            "Transformers et grands modèles récents",
          ],
        ],
      },
      {
        kind: "text",
        text: "Règle simple pour débuter : ReLU dans les couches cachées, softmax (multi-classes) ou sigmoïde (binaire) en sortie. Les autres s'apprennent quand un cas concret les exige.",
      },
      {
        kind: "list",
        items: [
          "Erreur fréquente : utiliser softmax avec une loss qui l'applique déjà (comme `CrossEntropyLoss` en PyTorch, qui attend des scores bruts) — double softmax = entraînement faussé.",
          "Concepts liés : neurone, couches denses, fonctions de perte.",
        ],
      },
    ],
  },
  {
    id: "forward-pass",
    title: "Le forward pass",
    level: 3,
    intro: "Le chemin aller des données : comment une entrée devient une prédiction.",
    blocks: [
      {
        kind: "text",
        text: "Le forward pass (propagation avant) est le calcul qui transforme une entrée en prédiction : les données traversent les couches une par une, chaque couche appliquant ses poids puis son activation. C'est ce calcul qui s'exécute aussi bien pendant l'entraînement que pendant l'inférence — la seule différence est qu'en entraînement, PyTorch mémorise les étapes intermédiaires pour pouvoir calculer les gradients ensuite.",
      },
      {
        kind: "text",
        text: "Faire passer les données à travers le réseau, de l'entrée à la sortie, pour obtenir une prédiction.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [          {
            label: "Pourquoi c'est important",
            value:
              "C'est l'opération la plus fréquente : chaque lot d'entraînement et chaque prédiction en production est un forward pass. Sa vitesse détermine le coût d'inférence.",
          },
          {
            label: "En inférence",
            value:
              "On désactive le suivi des gradients (`torch.no_grad()`) : calcul plus rapide et mémoire divisée, car on n'a pas besoin de la rétropropagation.",
          },
          {
            label: "Concepts liés",
            value: "rétropropagation, inférence, tenseurs.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Inférence : forward sans gradients",
        code: "modele.eval()  # mode évaluation (désactive dropout, fige la normalisation)\nwith torch.no_grad():\n    image = charger_image(\"photo.jpg\")\n    scores = modele(image)\n    classe = scores.argmax().item()\nprint(\"Classe prédite :\", classe)",
      },
    ],
  },
  {
    id: "loss-functions",
    title: "Les fonctions de perte (loss)",
    level: 3,
    intro: "Mesurer l'erreur : le score que l'entraînement cherche à minimiser.",
    blocks: [
      {
        kind: "text",
        text: "La fonction de perte (loss function) quantifie l'écart entre les prédictions du réseau et les bonnes réponses : un seul nombre qui résume « à quel point le modèle se trompe ». L'entraînement consiste à minimiser ce nombre. Le choix de la loss dépend du type de problème, pas de la mode.",
      },
      {
        kind: "table",
        headers: ["Fonction", "Problème", "Idée"],
        rows: [
          [
            "Cross-entropy",
            "Classification",
            "Pénalise fortement quand le modèle est sûr et a tort ; le standard de la classification",
          ],
          [
            "MSE (erreur quadratique moyenne)",
            "Régression",
            "Moyenne des carrés des écarts ; pénalise les grosses erreurs",
          ],
          [
            "MAE (erreur absolue moyenne)",
            "Régression robuste",
            "Moyenne des écarts absolus ; moins sensible aux valeurs extrêmes que la MSE",
          ],
          [
            "Binary cross-entropy",
            "Classification binaire / multi-labels",
            "Version binaire de la cross-entropy, appliquée par sortie",
          ],
        ],
      },
      {
        kind: "text",
        text: "La loss traduit « se tromper » en un nombre différentiable que l'optimiseur peut réduire.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [          {
            label: "Erreur fréquente",
            value:
              "Utiliser la MSE pour de la classification : elle fonctionne parfois, mais la cross-entropy est conçue pour ce cas et converge mieux.",
          },
          {
            label: "Bonne pratique",
            value:
              "Surveillez la loss de validation, pas seulement celle d'entraînement : c'est elle qui révèle le surapprentissage.",
          },
          {
            label: "Concepts liés",
            value: "optimizers, overfitting, métriques d'évaluation.",
          },
        ],
      },
    ],
  },
  {
    id: "descente-gradient",
    title: "La descente de gradient (intuition)",
    level: 3,
    intro: "L'algorithme au cœur de tout entraînement, expliqué sans équations.",
    blocks: [
      {
        kind: "text",
        text: "Imaginez un paysage de montagnes dans le brouillard : vous êtes quelque part sur une pente et voulez atteindre le point le plus bas (l'erreur minimale). La descente de gradient fait ceci : à chaque pas, on mesure la pente sous nos pieds (le gradient), puis on fait un petit pas dans le sens de la descente. Répété des milliers de fois, on finit dans une vallée — un bon jeu de poids.",
      },
      {
        kind: "diagram",
        title: "Descente de gradient, en une image",
        lines: [
          "erreur │        ╱╲",
          "      │       ╱  ╲    ● départ (poids initiaux aléatoires)",
          "      │      ╱    ╲  ╱",
          "      │     ╱      ╲╱",
          "      │    ╱   vallée ╲",
          "      │   ╱  (minimum)  ╲",
          "      └────────────────────── poids",
          "      à chaque pas : mesurer la pente → petit pas vers le bas",
        ],
      },
      {
        kind: "text",
        text: "Ajuster les poids petit à petit dans le sens qui fait diminuer l'erreur.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [          {
            label: "Le gradient",
            value:
              "Pour chaque poids, un nombre qui dit : « si tu augmentes ce poids un peu, l'erreur augmente ou diminue, et de combien ». C'est la pente locale.",
          },
          {
            label: "Limite",
            value:
              "On peut atterrir dans une petite vallée (minimum local) plutôt que la meilleure. En pratique, avec les grands réseaux, les minima locaux sont souvent de qualité acceptable.",
          },
          {
            label: "Concepts liés",
            value: "taux d'apprentissage, rétropropagation, optimizers.",
          },
        ],
      },
    ],
  },
  {
    id: "backpropagation",
    title: "La rétropropagation (intuition)",
    level: 3,
    intro: "Comment le réseau sait quel poids corriger : l'astuce qui rend l'entraînement possible.",
    blocks: [
      {
        kind: "text",
        text: "Un réseau a des milliers de poids : comment savoir lequel est responsable de l'erreur ? La rétropropagation (backprop) propage l'erreur à rebours, de la sortie vers l'entrée, en calculant la contribution de chaque poids grâce à la règle de dérivation en chaîne. Chaque poids reçoit ainsi son « gradient » : la direction et l'amplitude de sa correction.",
      },
      {
        kind: "text",
        text: "Bonne nouvelle : vous n'aurez (presque) jamais à coder la rétropropagation vous-même. PyTorch la fait automatiquement dès que vous appelez `loss.backward()` : il a enregistré toutes les opérations du forward pass et en déduit les gradients. Comprendre l'idée suffit : l'erreur remonte, chaque couche apprend sa part de responsabilité.",
      },
      {
        kind: "text",
        text: "Calculer, pour chaque poids du réseau, comment le modifier pour réduire l'erreur, en remontant de la sortie vers l'entrée.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [          {
            label: "Pourquoi c'est une prouesse",
            value:
              "Avant la backprop (popularisée dans les années 1980), on ne savait pas entraîner efficacement les réseaux à plusieurs couches : c'est elle qui a rendu le « profond » possible.",
          },
          {
            label: "Le gradient qui s'éteint",
            value:
              "Dans les réseaux très profonds, le signal d'erreur peut s'atténuer couche après couche jusqu'à devenir nul : les premières couches n'apprennent plus. Les activations comme ReLU et les connexions résiduelles atténuent ce problème.",
          },
          {
            label: "Concepts liés",
            value: "descente de gradient, fonctions d'activation, `loss.backward()`.",
          },
        ],
      },
    ],
  },
  {
    id: "optimizers",
    title: "Les optimiseurs",
    level: 3,
    intro: "Des variantes de la descente de gradient, plus rapides et plus stables.",
    blocks: [
      {
        kind: "table",
        headers: ["Optimiseur", "Idée", "Usage"],
        rows: [
          [
            "SGD (+ momentum)",
            "Descente de gradient stochastique : pas dans le sens de la pente, avec une « inertie » qui lisse la trajectoire",
            "La référence historique ; encore très utilisé, demande un bon réglage du taux d'apprentissage",
          ],
          [
            "Adam",
            "Adapte automatiquement la taille du pas pour chaque poids, en combinant momentum et historique des gradients",
            "Le choix par défaut le plus courant : fonctionne bien « sortie de boîte »",
          ],
          [
            "AdamW",
            "Variante d'Adam avec la régularisation (weight decay) découplée proprement",
            "Standard pour les Transformers et les grands modèles",
          ],
        ],
      },
      {
        kind: "text",
        text: "L'optimiseur décide comment appliquer les gradients : taille des pas, inertie, adaptation par poids.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [          {
            label: "Quand s'en soucier",
            value:
              "Au début : utilisez Adam avec les paramètres par défaut, cela suffit. Quand l'entraînement plafonne, l'optimiseur et le taux d'apprentissage deviennent des leviers.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Changer d'optimiseur avant d'avoir vérifié les bases (données, taux d'apprentissage, bug) : l'optimiseur compense rarement un problème fondamental.",
          },
          {
            label: "Concepts liés",
            value: "taux d'apprentissage, régularisation, descente de gradient.",
          },
        ],
      },
    ],
  },
  {
    id: "learning-rate",
    title: "Le taux d'apprentissage",
    level: 3,
    intro: "L'hyperparamètre le plus influent : la taille des pas de la descente.",
    blocks: [
      {
        kind: "text",
        text: "Le taux d'apprentissage (learning rate, `lr`) contrôle l'amplitude de chaque ajustement des poids. Trop grand : les pas sautent par-dessus la vallée, la loss oscille ou explose. Trop petit : l'entraînement rampe et peut rester bloqué. C'est le premier réglage à ajuster quand l'entraînement se comporte mal.",
      },
      {
        kind: "diagram",
        title: "Effet du taux d'apprentissage",
        lines: [
          "lr trop grand :   ●╲ ╱╲ ╱╲   la loss oscille, diverge",
          "                   ╲╱  ╲╱",
          "lr trop petit :  ●●●●●●●●●●  la loss descend trop lentement",
          "lr adapté :      ●╲",
          "                    ╲╲___  descente régulière vers le minimum",
        ],
      },
      {
        kind: "fields",
        title: "Fiche pratique",
        fields: [
          {
            label: "Point de départ",
            value:
              "Avec Adam : `lr=0.001` (ou `3e-4`). Avec SGD : `lr=0.01` à `0.1` avec momentum. Ce sont des valeurs usuelles, pas des vérités absolues.",
          },
          {
            label: "Diagnostic",
            value:
              "Loss qui explose ou devient `NaN` → baissez le lr. Loss qui stagne dès le début → essayez de l'augmenter (ou vérifiez le reste).",
          },
          {
            label: "Bonne pratique",
            value:
              "Le « learning rate finder » (tester plusieurs lr sur quelques lots et retenir celui où la loss descend le plus vite) évite de régler à l'aveugle.",
          },
          {
            label: "Concepts liés",
            value: "optimizers, debugging d'entraînement, schedulers (baisser le lr en fin d'entraînement).",
          },
        ],
      },
    ],
  },
  {
    id: "epochs-batches",
    title: "Époques, lots et itérations",
    level: 3,
    intro: "Le vocabulaire du déroulement d'un entraînement.",
    blocks: [
      {
        kind: "fields",
        title: "Définitions",
        fields: [
          {
            label: "Lot (batch)",
            value:
              "Un paquet d'exemples traités ensemble (ex. 32 ou 64 images). Le gradient est calculé sur le lot, pas sur un seul exemple : c'est plus stable et ça exploite le parallélisme du GPU.",
          },
          {
            label: "Itération",
            value: "Un passage avant + arrière sur un lot : une mise à jour des poids.",
          },
          {
            label: "Époque (epoch)",
            value:
              "Un passage complet sur tout le jeu d'entraînement. On entraîne typiquement sur plusieurs dizaines d'époques.",
          },
        ],
      },
      {
        kind: "text",
        text: "La taille du lot (batch size) est elle-même un hyperparamètre : des lots plus grands donnent des gradients plus stables et utilisent mieux le GPU, mais consomment plus de mémoire. 32, 64 ou 128 sont des points de départ usuels. Le nombre d'époques se règle en observant la loss de validation : on s'arrête quand elle cesse de s'améliorer (early stopping).",
      },
      {
        kind: "list",
        items: [
          "Erreur fréquente : confondre époques et itérations quand on lit « entraîné pendant 10 000 itérations » — ce n'est pas 10 000 passages sur les données.",
          "Concepts liés : early stopping, GPU, overfitting.",
        ],
      },
    ],
  },
  {
    id: "overfitting-underfitting",
    title: "Surapprentissage vs sous-apprentissage",
    level: 3,
    intro: "Le diagnostic central du machine learning : le modèle apprend-il ou mémorise-t-il ?",
    blocks: [
      {
        kind: "text",
        text: "Le surapprentissage (overfitting) : le réseau apprend par cœur les exemples d'entraînement, y compris leur bruit, et échoue sur de nouvelles données. Symptôme typique : la loss d'entraînement continue de baisser pendant que la loss de validation remonte. Le sous-apprentissage (underfitting) : le modèle est trop simple (ou mal entraîné) pour capturer les motifs — les deux losses stagnent à un niveau élevé.",
      },
      {
        kind: "diagram",
        title: "Lire les courbes de loss",
        lines: [
          "loss │ train ╲╲╲╲╲________",
          "     │ val       ╲___╱‾‾‾‾‾‾  ← la validation remonte :",
          "     │                      SURAPPRENTISSAGE, arrêter / régulariser",
          "     │",
          "     │ train ──────────‾‾‾‾",
          "     │ val   ──────────____  ← les deux stagnent haut :",
          "     │                      SOUS-APPRENTISSAGE, agrandir / mieux régler",
          "     └────────────────────── époques",
        ],
      },
      {
        kind: "text",
        text: "Overfitting = mémorise (écart train/val) ; underfitting = trop simple (les deux mauvais).",
      },
      {
        kind: "fields",
        title: "Fiche diagnostic",
        fields: [          {
            label: "Contre l'overfitting",
            value:
              "Plus de données, augmentation de données, dropout, early stopping, régularisation, modèle plus petit.",
          },
          {
            label: "Contre l'underfitting",
            value:
              "Modèle plus grand, entraînement plus long, meilleur taux d'apprentissage, vérifier qu'il n'y a pas de bug.",
          },
          {
            label: "Bonne pratique",
            value:
              "Tracez toujours les deux courbes (train et validation). Sans elles, vous réglez à l'aveugle.",
          },
        ],
      },
    ],
  },
  {
    id: "dropout",
    title: "Le dropout",
    level: 3,
    intro: "Une régularisation élégante : désactiver des neurones au hasard pendant l'entraînement.",
    blocks: [
      {
        kind: "text",
        text: "Le dropout désactive aléatoirement une fraction des neurones à chaque lot d'entraînement (typiquement 20 à 50 %). Le réseau ne peut plus compter sur un neurone particulier : il est forcé d'apprendre des représentations redondantes et robustes. À l'inférence, tous les neurones sont réactivés (avec une mise à l'échelle compensatrice, gérée automatiquement par le framework).",
      },
      {
        kind: "code",
        language: "python",
        title: "Dropout en PyTorch",
        code: "import torch.nn as nn\n\nmodele = nn.Sequential(\n    nn.Linear(784, 256),\n    nn.ReLU(),\n    nn.Dropout(p=0.3),   # désactive 30 % des neurones à l'entraînement\n    nn.Linear(256, 10),\n)\n\nmodele.train()  # dropout ACTIF\n# ... entraînement ...\nmodele.eval()   # dropout DÉSACTIVÉ pour l'évaluation/l'inférence",
      },
      {
        kind: "text",
        text: "Brouiller le réseau pendant l'entraînement pour l'empêcher de mémoriser.",
      },
      {
        kind: "text",
        text: "Quand les courbes montrent du surapprentissage, surtout sur les couches denses. Moins crucial si vous avez déjà beaucoup de données.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [          {
            label: "Erreur fréquente",
            value:
              "Oublier `modele.eval()` à l'inférence : le dropout reste actif, les prédictions deviennent aléatoires et non reproductibles.",
          },
          {
            label: "Concepts liés",
            value: "overfitting, régularisation, `train()` vs `eval()`.",
          },
        ],
      },
    ],
  },
  {
    id: "early-stopping",
    title: "L'early stopping",
    level: 3,
    intro: "Arrêter l'entraînement au bon moment : simple, gratuit, efficace.",
    blocks: [
      {
        kind: "text",
        text: "L'early stopping (arrêt précoce) surveille la loss de validation à chaque époque et sauvegarde les meilleurs poids. Si la validation ne s'améliore plus pendant N époques consécutives (la « patience »), on arrête l'entraînement et on restaure les meilleurs poids. C'est la régularisation la plus simple : elle ne demande aucun changement d'architecture.",
      },
      {
        kind: "text",
        text: "Garder les poids du meilleur moment au lieu de ceux de la fin.",
      },
      {
        kind: "fields",
        title: "Fiche pratique",
        fields: [          {
            label: "La patience",
            value:
              "Nombre d'époques sans amélioration avant d'arrêter (5 à 10 en général). Trop courte : on s'arrête sur un plateau temporaire. Trop longue : on perd du temps.",
          },
          {
            label: "Pourquoi ça marche",
            value:
              "Le surapprentissage apparaît progressivement : les premiers poids appris sont les plus généraux, les derniers les plus spécifiques au bruit.",
          },
          {
            label: "Bonne pratique",
            value:
              "Combinez early stopping + sauvegarde du meilleur modèle : même sans arrêt automatique, vous gardez toujours la meilleure version.",
          },
          {
            label: "Concepts liés",
            value: "overfitting, split train/val/test, courbes de loss.",
          },
        ],
      },
    ],
  },
  {
    id: "normalisation-donnees",
    title: "Normaliser les données",
    level: 3,
    intro: "Une étape de préparation sous-estimée qui change tout.",
    blocks: [
      {
        kind: "text",
        text: "Les réseaux apprennent mal quand les entrées ont des échelles très différentes (une variable entre 0 et 1, une autre entre 0 et 1 000 000) : les gradients deviennent déséquilibrés et l'entraînement est instable. La normalisation remet toutes les variables sur une échelle comparable — par exemple moyenne 0 et écart-type 1, ou valeurs entre 0 et 1 pour des pixels.",
      },
      {
        kind: "code",
        language: "python",
        title: "Normaliser des images (0-255 → 0-1)",
        code: "# Pixels 0-255 -> 0-1 : simple division\nimages = images / 255.0\n\n# Ou standardisation avec torchvision (moyenne/écart-type)\nfrom torchvision import transforms\ntransfo = transforms.Compose([\n    transforms.ToTensor(),  # 0-255 -> 0-1 + (H, W, C) -> (C, H, W)\n    transforms.Normalize(mean=[0.5], std=[0.5]),  # -> environ [-1, 1]\n])",
      },
      {
        kind: "text",
        text: "Mettre les entrées à la même échelle pour un entraînement stable et rapide.",
      },
      {
        kind: "fields",
        title: "Fiche pratique",
        fields: [          {
            label: "Erreur fréquente",
            value:
              "Calculer moyenne et écart-type sur tout le dataset (train + test) : c'est une fuite d'information. Calculez-les sur le train uniquement, puis appliquez au test.",
          },
          {
            label: "Cas particulier",
            value:
              "En transfert learning, utilisez la normalisation du modèle pré-entraîné (souvent la moyenne/écart-type d'ImageNet fournie dans sa doc) — pas la vôtre.",
          },
          {
            label: "Concepts liés",
            value: "taux d'apprentissage, transfert learning, batch normalization (normalisation à l'intérieur du réseau).",
          },
        ],
      },
    ],
  },
  {
    id: "split-train-val-test",
    title: "Découper train / validation / test",
    level: 3,
    intro: "Trois jeux de données, trois rôles : la discipline qui rend les résultats crédibles.",
    blocks: [
      {
        kind: "table",
        headers: ["Jeu", "Rôle", "Règle d'or"],
        rows: [
          [
            "Entraînement (~70-80 %)",
            "Le réseau ajuste ses poids dessus",
            "Le seul que le réseau « voit » pour apprendre",
          ],
          [
            "Validation (~10-15 %)",
            "Régler les hyperparamètres, détecter l'overfitting",
            "Ne jamais entraîner dessus ; peut servir plusieurs fois",
          ],
          [
            "Test (~10-15 %)",
            "Mesure finale, unique, de la performance réelle",
            "Ne le toucher qu'UNE fois, à la toute fin",
          ],
        ],
      },
      {
        kind: "text",
        text: "Le test simule « le monde réel » : des données que le modèle n'a jamais vues, sous aucune forme. Chaque fois que vous regardez le test pour prendre une décision (choisir un modèle, ajuster un seuil), il cesse d'être un test et devient une validation déguisée — vos résultats deviennent optimistes.",
      },
      {
        kind: "list",
        items: [
          "Erreur fréquente : régler les hyperparamètres directement sur le test, puis annoncer la performance du test comme « performance réelle ».",
          "Bonne pratique : fixez la graine aléatoire du découpage (`random_state` / `torch.manual_seed`) pour que le split soit reproductible.",
          "Concepts liés : overfitting, métriques d'évaluation, validation croisée (utile avec peu de données).",
        ],
      },
    ],
  },
  {
    id: "metriques-evaluation",
    title: "Évaluer : les bonnes métriques",
    level: 3,
    intro: "L'accuracy ne suffit pas toujours : choisir la métrique adaptée au problème.",
    blocks: [
      {
        kind: "table",
        headers: ["Métrique", "Ce qu'elle mesure", "Quand l'utiliser"],
        rows: [
          [
            "Accuracy",
            "Proportion de bonnes prédictions",
            "Classes équilibrées ; premier indicateur, jamais le seul",
          ],
          [
            "Précision",
            "Parmi les positifs prédits, combien sont vraiment positifs",
            "Quand les faux positifs coûtent cher (ex. spam légitime bloqué)",
          ],
          [
            "Rappel (recall)",
            "Parmi les vrais positifs, combien sont détectés",
            "Quand les faux négatifs coûtent cher (ex. maladie non détectée)",
          ],
          [
            "F1-score",
            "Moyenne harmonique de précision et rappel",
            "Compromis quand les deux comptent, classes déséquilibrées",
          ],
          [
            "Matrice de confusion",
            "Le détail des erreurs par classe",
            "Toujours : elle montre OÙ le modèle se trompe",
          ],
        ],
      },
      {
        kind: "text",
        text: "Exemple parlant : un modèle qui détecte une maladie rare présente dans 1 % des cas atteint 99 % d'accuracy en répondant toujours « sain » — et il est totalement inutile. Le rappel révélerait l'échec. D'où la règle : la métrique doit refléter le coût réel des erreurs dans votre cas d'usage.",
      },
      {
        kind: "list",
        items: [
          "Bonne pratique : affichez toujours la matrice de confusion — elle révèle les confusions systématiques (le modèle confond les chats et les chiens, mais jamais les oiseaux).",
          "Erreur fréquente : optimiser l'accuracy sur des classes déséquilibrées.",
          "Concepts liés : split train/val/test, analyse d'erreurs.",
        ],
      },
    ],
  },
  {
    id: "cnn-convolution",
    title: "Les CNN : la convolution",
    level: 3,
    intro: "L'architecture reine de la vision par ordinateur : comment un réseau « voit ».",
    blocks: [
      {
        kind: "text",
        text: "Un réseau de neurones convolutif (CNN) remplace les couches denses par des couches de convolution : au lieu de connecter chaque pixel à chaque neurone, on fait glisser de petits filtres (ex. 3×3) sur l'image. Chaque filtre apprend à détecter un motif local — un contour, une texture — où qu'il apparaisse dans l'image. C'est à la fois plus efficace (moins de poids) et plus pertinent pour les images, où l'information est locale.",
      },
      {
        kind: "diagram",
        title: "Convolution, en une image",
        lines: [
          "image 5×5 :        filtre 3×3 :       résultat :",
          " 1 1 1 0 0          1 0 1",
          " 0 1 1 1 0   ★      0 1 0   ═══►   une valeur par",
          " 0 0 1 1 1          1 0 1        position du filtre",
          " 0 0 1 1 0",
          " 0 1 1 0 0",
          "",
          "le filtre glisse sur toute l'image :",
          "il répond fort où le motif recherché apparaît",
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Une couche convolutive en PyTorch",
        code: "import torch.nn as nn\n\nconv = nn.Sequential(\n    nn.Conv2d(1, 16, kernel_size=3, padding=1),  # 1 canal -> 16 filtres 3x3\n    nn.ReLU(),\n    nn.MaxPool2d(2),  # réduit la taille de moitié (garde le max)\n)\n# Entrée (lot, 1, 28, 28) -> sortie (lot, 16, 14, 14)",
      },
      {
        kind: "text",
        text: "Détecter des motifs locaux partout dans l'image avec des filtres appris.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [          {
            label: "Pourquoi ça marche",
            value:
              "Un contour est un contour, qu'il soit en haut à gauche ou en bas à droite : partager les mêmes filtres sur toute l'image (invariance par translation) divise le nombre de paramètres.",
          },
          {
            label: "Le pooling",
            value:
              "Réduit la résolution (ex. `MaxPool2d(2)` divise par 2) : le réseau devient tolérant aux petits déplacements et les calculs suivants coûtent moins cher.",
          },
          {
            label: "Concepts liés",
            value: "transfert learning, vision par ordinateur, couches denses.",
          },
        ],
      },
    ],
  },
  {
    id: "cnn-architectures",
    title: "Architectures CNN : de LeNet aux ResNet",
    level: 3,
    intro: "Quelques noms à connaître — et surtout l'idée des connexions résiduelles.",
    blocks: [
      {
        kind: "text",
        text: "Les architectures CNN ont une histoire : LeNet (années 1990, chiffres manuscrits), AlexNet (2012, a relancé le deep learning moderne en vision), VGG (empilement simple de couches 3×3), puis ResNet (2015) dont l'idée des connexions résiduelles — faire « sauter » des couches au signal — a permis d'entraîner des réseaux de plus de 100 couches sans que le gradient s'éteigne.",
      },
      {
        kind: "diagram",
        title: "Bloc résiduel (ResNet), l'idée",
        lines: [
          "entrée ──┬──► [couche] ──► [couche] ──► (+) ──► sortie",
          "        │                                  ▲",
          "        └──────────────────────────────────┘",
          "              connexion résiduelle (skip connection)",
          "",
          "le réseau apprend la DIFFÉRENCE à ajouter,",
          "le gradient circule aussi par le raccourci : il ne s'éteint plus",
        ],
      },
      {
        kind: "text",
        text: "En pratique, vous n'implémenterez pas ces architectures à la main : `torchvision.models` fournit des ResNet, EfficientNet et autres pré-entraînés, prêts pour le transfert learning. Connaître leurs noms sert à lire la littérature et à choisir un point de départ.",
      },
      {
        kind: "list",
        items: [
          "Bonne pratique : partez d'une architecture éprouvée pré-entraînée plutôt que d'en inventer une — l'architecture est rarement le facteur limitant.",
          "Concepts liés : transfert learning, gradient qui s'éteint, overfitting.",
        ],
      },
    ],
  },
  {
    id: "rnn-sequences",
    title: "Les RNN : traiter des séquences",
    level: 3,
    intro: "Quand l'ordre compte : texte, séries temporelles, audio.",
    blocks: [
      {
        kind: "text",
        text: "Un réseau récurrent (RNN) traite les données élément par élément en conservant une « mémoire » (état caché) : pour prédire le mot suivant d'une phrase, il tient compte des mots précédents. Les variantes LSTM et GRU ajoutent des « portes » qui décident quoi mémoriser et quoi oublier, ce qui leur permet de gérer des dépendances plus longues qu'un RNN simple.",
      },
      {
        kind: "diagram",
        title: "RNN déroulé dans le temps",
        lines: [
          "mot1 ──► [RNN] ──► état ──► [RNN] ──► état ──► [RNN] ──► prédiction",
          "         ▲ mot2              ▲ mot3",
          "         │                   │",
          "    le même réseau, réutilisé à chaque pas,",
          "    avec un état qui transporte le contexte",
        ],
      },
      {
        kind: "text",
        text: "Un réseau avec mémoire, qui traite les séquences pas à pas.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [          {
            label: "Limite",
            value:
              "Le traitement est séquentiel (pas de parallélisation) et la mémoire s'estompe sur les très longues séquences : c'est pourquoi les Transformers les ont largement remplacés en langage naturel.",
          },
          {
            label: "Quand les utiliser encore",
            value:
              "Séries temporelles courtes, données séquentielles simples, ou quand la légèreté prime sur la performance maximale.",
          },
          {
            label: "Concepts liés",
            value: "Transformers, embeddings, séries temporelles.",
          },
        ],
      },
    ],
  },
  {
    id: "transformers-attention",
    title: "Transformers et attention",
    level: 3,
    intro: "L'architecture derrière les modèles de langage modernes : l'idée essentielle, sans les maths.",
    blocks: [
      {
        kind: "text",
        text: "Le Transformer (article « Attention Is All You Need », 2017) traite toute la séquence en parallèle au lieu de pas à pas. Son mécanisme central, l'attention, permet à chaque élément (chaque mot) de « regarder » tous les autres et de décider lesquels sont pertinents pour lui. Dans « le chat chasse la souris parce qu'il a faim », l'attention apprend que « il » se réfère au chat, pas à la souris.",
      },
      {
        kind: "text",
        text: "Chaque élément de la séquence pondère l'importance de tous les autres pour construire sa représentation.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [          {
            label: "Pourquoi c'est puissant",
            value:
              "Parallélisable (contrairement aux RNN) et capable de lier des éléments très éloignés dans la séquence : deux propriétés qui ont permis d'entraîner des modèles sur des quantités de texte inédites.",
          },
          {
            label: "Où on les trouve",
            value:
              "Modèles de langage (GPT, BERT et descendants), mais aussi vision (Vision Transformers) et audio : l'architecture est devenue généraliste.",
          },
          {
            label: "Coût",
            value:
              "L'attention compare chaque élément à tous les autres : le coût mémoire grandit avec le carré de la longueur de séquence — d'où la limite de « fenêtre de contexte » des modèles.",
          },
          {
            label: "Concepts liés",
            value: "embeddings, transfert learning, tokenisation (découper le texte en morceaux traitables).",
          },
        ],
      },
      {
        kind: "text",
        text: "Vous utiliserez les Transformers via des bibliothèques comme `transformers` (Hugging Face), qui fournissent des modèles pré-entraînés et du code d'exemple : inutile de réimplémenter l'attention pour s'en servir.",
      },
    ],
  },
  {
    id: "embeddings",
    title: "Les embeddings",
    level: 3,
    intro: "Transformer des symboles (mots, catégories) en vecteurs que le réseau peut calculer.",
    blocks: [
      {
        kind: "text",
        text: "Un réseau ne manipule que des nombres : pour lui donner des mots, on les convertit en vecteurs denses appelés embeddings. L'astuce est que ces vecteurs sont appris : des mots de sens proche obtiennent des vecteurs proches. « Roi » et « reine » finissent voisins dans l'espace, loin de « tracteur ». En PyTorch : `nn.Embedding(taille_vocabulaire, dimension)`.",
      },
      {
        kind: "text",
        text: "Une table de correspondance apprenable : chaque symbole (mot, catégorie) devient un vecteur de nombres.",
      },
      {
        kind: "text",
        text: "Texte bien sûr, mais aussi toute variable catégorielle (identifiant produit, jour de semaine) : l'embedding apprend les similarités utiles à la tâche.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [          {
            label: "Pourquoi pas du one-hot",
            value:
              "Coder chaque mot par un vecteur de 50 000 zéros et un seul 1 (one-hot) est creux et ne capture aucune similarité. L'embedding dense et appris est compact et sémantique.",
          },
          {
            label: "Concepts liés",
            value: "Transformers, RNN, tokenisation.",
          },
        ],
      },
    ],
  },
  {
    id: "transfert-learning",
    title: "Le transfert learning",
    level: 3,
    intro: "La technique la plus rentable : réutiliser un modèle entraîné par d'autres.",
    blocks: [
      {
        kind: "text",
        text: "Le transfert learning consiste à partir d'un modèle pré-entraîné sur un énorme jeu de données (par exemple un ResNet entraîné sur des millions d'images) et à l'affiner (fine-tuning) sur votre problème avec vos — souvent peu nombreuses — données. Les premières couches (détection de contours, textures) sont universelles ; seules les dernières couches, spécifiques à la tâche, ont vraiment besoin d'être réentraînées.",
      },
      {
        kind: "code",
        language: "python",
        title: "Fine-tuning d'un ResNet pré-entraîné",
        code: "from torchvision import models\nimport torch.nn as nn\n\n# 1. Charger le modèle pré-entraîné\nmodele = models.resnet18(weights=\"DEFAULT\")\n\n# 2. Geler les couches existantes (on garde leurs poids)\nfor param in modele.parameters():\n    param.requires_grad = False\n\n# 3. Remplacer la dernière couche par la nôtre (ex. 5 classes)\nmodele.fc = nn.Linear(modele.fc.in_features, 5)\n\n# 4. N'entraîner que la nouvelle couche (beaucoup plus rapide)\noptimizer = torch.optim.Adam(modele.fc.parameters(), lr=0.001)",
      },
      {
        kind: "text",
        text: "Ne pas repartir de zéro : adapter un modèle déjà entraîné à votre tâche.",
      },
      {
        kind: "text",
        text: "Presque toujours en vision et en NLP, surtout avec peu de données. Contre-indication : domaine très éloigné des données d'origine (ex. images médicales vs photos naturelles — ça marche quand même souvent, mais à vérifier).",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [          {
            label: "Pourquoi c'est crucial",
            value:
              "Entraîner un grand modèle de zéro demande des données et du calcul considérables. Le transfert learning donne souvent 90 % du résultat avec 10 % des ressources.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Fine-tuner avec un taux d'apprentissage trop élevé : on « casse » les poids pré-entraînés. Utilisez un lr plus faible que pour un entraînement de zéro.",
          },
          {
            label: "Concepts liés",
            value: "normalisation des données, CNN, overfitting.",
          },
        ],
      },
    ],
  },
  {
    id: "gpu-acceleration",
    title: "Le GPU : notions essentielles",
    level: 3,
    intro: "Pourquoi les cartes graphiques entraînent les réseaux 10 à 100 fois plus vite.",
    blocks: [
      {
        kind: "text",
        text: "Un CPU a quelques cœurs très rapides, adaptés aux tâches séquentielles. Un GPU a des milliers de cœurs plus simples, conçus pour appliquer la même opération à d'énormes tableaux en parallèle — exactement ce que fait un réseau de neurones (multiplications de matrices sur des tenseurs). D'où l'accélération massive, surtout sur les grands modèles et les gros lots.",
      },
      {
        kind: "command",
        label: "Vérifier la présence d'un GPU NVIDIA",
        command: "nvidia-smi",
        why: "Affiche les cartes NVIDIA détectées, leur mémoire et leur utilisation : le moyen le plus rapide de savoir si un GPU est disponible sur la machine.",
        verify: "Un tableau liste le(s) GPU avec la version du pilote et la mémoire.",
      },
      {
        kind: "code",
        language: "python",
        title: "Utiliser le GPU en PyTorch (quand il existe)",
        code: "import torch\n\ndevice = torch.device(\"cuda\" if torch.cuda.is_available() else \"cpu\")\nprint(\"Appareil utilisé :\", device)\n\nmodele = PetitReseau().to(device)  # envoie les poids sur le GPU\nfor images, etiquettes in chargeur_train:\n    images = images.to(device)        # chaque lot doit suivre sur le GPU\n    etiquettes = etiquettes.to(device)\n    # ... boucle d'entraînement inchangée ...",
      },
      {
        kind: "text",
        text: "Le GPU parallélise les calculs tensoriels ; indispensable au-delà des petits modèles.",
      },
      {
        kind: "fields",
        title: "Fiche pratique",
        fields: [          {
            label: "Quand le CPU suffit",
            value:
              "Apprentissage, petits réseaux, inférence de modèles légers : le CPU est plus simple (aucune installation CUDA).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Envoyer le modèle sur le GPU mais oublier les données (ou l'inverse) : PyTorch lève une erreur « tensors on different devices ». Tout doit être sur le même appareil.",
          },
          {
            label: "Bonne pratique",
            value:
              "Écrivez le code agnostique (`torch.device(...)`) : il tourne en CPU sur votre laptop et en GPU sur la machine d'entraînement, sans modification.",
          },
        ],
      },
    ],
  },
  {
    id: "hyperparametres",
    title: "Les hyperparamètres",
    level: 3,
    intro: "Tout ce qui se règle avant l'entraînement : panorama et méthode.",
    blocks: [
      {
        kind: "table",
        headers: ["Hyperparamètre", "Effet", "Point de départ usuel"],
        rows: [
          ["Taux d'apprentissage", "Vitesse et stabilité de convergence", "`1e-3` avec Adam"],
          ["Taille du lot", "Stabilité du gradient, mémoire GPU", "32 / 64 / 128"],
          ["Nombre d'époques", "Durée d'entraînement", "Early stopping plutôt qu'un nombre fixe"],
          ["Architecture", "Capacité du modèle", "Petit d'abord, agrandir si sous-apprentissage"],
          ["Dropout", "Régularisation", "0.2 – 0.5 sur les couches denses"],
          ["Weight decay", "Régularisation des poids", "`1e-4` à `1e-5`"],
        ],
      },
      {
        kind: "text",
        text: "Méthode : ne changez qu'un hyperparamètre à la fois, et jugez sur la validation — jamais sur le test. La recherche exhaustive (grid search) explose combinatoirement : la recherche aléatoire sur quelques essais, ou l'intuition guidée par les courbes de loss, est plus rentable. Des outils comme Optuna automatisent la recherche intelligente quand le budget calcul le justifie.",
      },
      {
        kind: "list",
        items: [
          "Erreur fréquente : régler les hyperparamètres sur le test — vos « résultats » deviennent optimistes et non reproductibles.",
          "Bonne pratique : notez chaque expérience (hyperparamètres + résultat validation) dans un tableau ou un outil de suivi — la mémoire ne suffit pas.",
          "Concepts liés : overfitting, early stopping, MLOps.",
        ],
      },
    ],
  },
  {
    id: "debugging-entrainement",
    title: "Debugger un entraînement",
    level: 3,
    intro: "L'entraînement ne se comporte pas comme prévu ? Une check-list de diagnostic.",
    blocks: [
      {
        kind: "table",
        headers: ["Symptôme", "Causes probables", "Que vérifier"],
        rows: [
          [
            "La loss ne diminue pas du tout",
            "Bug de code, lr trop petit, données non chargées",
            "Le forward produit-il des sorties variées ? Les étiquettes sont-elles correctes ? Essayez de surapprendre sur UN lot (test de santé)",
          ],
          [
            "La loss explose / devient NaN",
            "lr trop grand, division par zéro, log(0)",
            "Baissez le lr ; vérifiez les valeurs (pas de NaN en entrée) ; ajoutez du clipping de gradient",
          ],
          [
            "Train OK, validation mauvaise",
            "Surapprentissage",
            "Dropout, augmentation de données, early stopping, plus de données",
          ],
          [
            "Les deux stagnent haut",
            "Sous-apprentissage ou bug",
            "Modèle plus grand, lr plus élevé, normalisation des entrées, test sur un lot",
          ],
          [
            "Résultats non reproductibles",
            "Aléatoire non fixé",
            "Fixez les graines (`torch.manual_seed`, `numpy`, `random`) et notez les versions",
          ],
        ],
      },
      {
        kind: "text",
        text: "Le « test de santé » le plus utile : entraînez sur un tout petit sous-ensemble (quelques dizaines d'exemples). Un modèle sain doit être capable de les mémoriser (loss proche de zéro). S'il n'y arrive pas, le problème est dans le code ou la configuration — pas dans les données.",
      },
      {
        kind: "list",
        items: [
          "Bonne pratique : logguez la loss à chaque époque dès le premier entraînement — sans courbe, pas de diagnostic.",
          "Concepts liés : taux d'apprentissage, overfitting, normalisation.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "8 erreurs fréquentes",
    level: 3,
    intro: "Les pièges classiques, avec le mauvais réflexe et le bon.",
    blocks: [
      {
        kind: "fields",
        title: "Erreur 1 — Oublier `zero_grad()`",
        fields: [
          { label: "Problème", value: "Les gradients s'accumulent entre les lots : les mises à jour deviennent incohérentes et la loss se comporte bizarrement." },
          { label: "Mauvais réflexe", value: "Appeler `optimizer.step()` puis `loss.backward()` sans remettre à zéro." },
          { label: "Bon réflexe", value: "Toujours `optimizer.zero_grad()` avant `loss.backward()`, à chaque itération." },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 2 — Évaluer avec le dropout actif",
        fields: [
          { label: "Problème", value: "Prédictions instables et dégradées à l'évaluation." },
          { label: "Mauvais réflexe", value: "Laisser le modèle en mode `train()` pendant l'évaluation." },
          { label: "Bon réflexe", value: "`modele.eval()` + `torch.no_grad()` pour toute évaluation et inférence." },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 3 — Fuite du test",
        fields: [
          { label: "Problème", value: "Résultats artificiellement bons, qui s'effondrent en production." },
          { label: "Mauvais réflexe", value: "Normaliser avec les statistiques du dataset complet, régler les hyperparamètres sur le test." },
          { label: "Bon réflexe", value: "Toute statistique calculée sur le train uniquement ; le test n'est touché qu'une fois, à la fin." },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 4 — Données non normalisées",
        fields: [
          { label: "Problème", value: "Entraînement lent, instable, voire divergent." },
          { label: "Mauvais réflexe", value: "Donner des pixels 0-255 ou des variables aux échelles mélangées tels quels." },
          { label: "Bon réflexe", value: "Normaliser systématiquement (0-1, standardisation) avant le premier entraînement." },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 5 — Mélanger les appareils CPU/GPU",
        fields: [
          { label: "Problème", value: "Erreur « tensors on different devices » qui interrompt l'entraînement." },
          { label: "Mauvais réflexe", value: "`.to(device)` sur le modèle mais pas sur les lots (ou l'inverse)." },
          { label: "Bon réflexe", value: "Envoyer modèle ET données sur le même appareil, via une variable `device` unique." },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 6 — Softmax + CrossEntropyLoss",
        fields: [
          { label: "Problème", value: "Double application du softmax : gradients faussés, entraînement dégradé." },
          { label: "Mauvais réflexe", value: "Terminer le réseau par `nn.Softmax` puis utiliser `CrossEntropyLoss` (qui inclut déjà le softmax)." },
          { label: "Bon réflexe", value: "Sortie = scores bruts (logits) avec `CrossEntropyLoss` ; n'ajoutez le softmax qu'à l'inférence, pour interpréter les probabilités." },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 7 — Trop grand, trop tôt",
        fields: [
          { label: "Problème", value: "Surapprentissage immédiat, entraînement interminable, debugging impossible." },
          { label: "Mauvais réflexe", value: "Commencer par un réseau profond « pour être sûr »." },
          { label: "Bon réflexe", value: "Baseline minuscule d'abord ; n'agrandissez que face à du sous-apprentissage avéré." },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 8 — Ignorer la matrice de confusion",
        fields: [
          { label: "Problème", value: "Une accuracy globale correcte cache des échecs systématiques sur certaines classes." },
          { label: "Mauvais réflexe", value: "Ne regarder que l'accuracy." },
          { label: "Bon réflexe", value: "Toujours afficher la matrice de confusion : elle dit quelles classes sont confondues et oriente les corrections (données, classes déséquilibrées)." },
        ],
      },
    ],
  },
  {
    id: "deploiement-notions",
    title: "Déployer un modèle : notions",
    level: 3,
    intro: "De l'entraînement à la production : ce qui change quand le modèle sort du notebook.",
    blocks: [
      {
        kind: "text",
        text: "Déployer, c'est exposer le modèle entraîné à des requêtes réelles : une API qui reçoit une image et renvoie une prédiction, une application mobile qui tourne en local, un traitement par lot. Les enjeux changent : latence (temps de réponse), débit (requêtes par seconde), mémoire, coût — et robustesse face à des entrées inattendues.",
      },
      {
        kind: "list",
        items: [
          "Formats d'échange : ONNX est un format ouvert qui permet d'exporter un modèle PyTorch et de l'exécuter dans d'autres runtimes optimisés — utile quand la cible n'est pas Python.",
          "Optimisations d'inférence : la quantification (passer les poids en précision réduite) divise la taille et accélère le calcul, avec une légère perte de précision ; l'élagage (pruning) supprime les poids inutiles.",
          "Serving : TorchServe ou une simple API (FastAPI) qui charge les poids une fois et répond aux requêtes ; TensorFlow Serving côté TensorFlow.",
          "Versioning : un modèle déployé se versionne comme du code — pouvoir revenir à la version précédente en cas de régression est indispensable.",
        ],
      },
      {
        kind: "text",
        text: "Rendre le modèle utilisable en production, avec des contraintes de vitesse, de coût et de fiabilité.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [          {
            label: "Erreur fréquente",
            value: "Déployer le notebook d'entraînement tel quel : dépendances non figées, pas de gestion d'erreur, performances imprévisibles.",
          },
          {
            label: "Bonne pratique",
            value: "Séparez entraînement et inférence : exportez les poids, figez l'environnement, mesurez la latence sur des données réalistes avant de mettre en production.",
          },
          {
            label: "Concepts liés",
            value: "MLOps, quantification, API.",
          },
        ],
      },
    ],
  },
  {
    id: "mlops-notions",
    title: "MLOps : notions",
    level: 3,
    intro: "Industrialiser le cycle de vie des modèles : ce que recouvre le terme.",
    blocks: [
      {
        kind: "text",
        text: "Le MLOps applique au machine learning les disciplines du DevOps : versionnage, tests, déploiement automatisé, supervision. Spécificité : on versionne trois choses (le code, les données, les poids du modèle), car un résultat n'est reproductible que si les trois sont fixés.",
      },
      {
        kind: "list",
        items: [
          "Suivi d'expériences : enregistrer hyperparamètres, métriques et artefacts de chaque entraînement (MLflow, Weights & Biases, ou un simple tableur rigoureux au début).",
          "Versionnage des données : DVC (Data Version Control) versionne les datasets comme Git versionne le code.",
          "Pipelines : enchaîner préparation → entraînement → évaluation → déploiement de façon reproductible et automatisée.",
          "Supervision en production : détecter la dérive (les données réelles changent avec le temps et le modèle se dégrade) et déclencher un réentraînement.",
        ],
      },
      {
        kind: "text",
        text: "Commencez simplement : un tableur d'expériences rigoureux et des poids versionnés valent mieux qu'une usine à gaz MLOps sur un projet d'apprentissage. L'outillage se justifie quand les expériences se multiplient et que plusieurs personnes collaborent.",
      },
    ],
  },
  {
    id: "biais-limites",
    title: "Biais, limites et responsabilité",
    level: 3,
    intro: "Ce que le deep learning ne fait pas — et les risques à connaître avant de déployer.",
    blocks: [
      {
        kind: "text",
        text: "Un réseau apprend les motifs de ses données d'entraînement, y compris leurs biais : un modèle de recrutement entraîné sur des embauches passées discriminatoires reproduira la discrimination. Un modèle de reconnaissance faciale entraîné majoritairement sur un type de visage sera moins fiable sur les autres. Ces biais ne sont pas des bugs d'implémentation : ce sont des propriétés des données.",
      },
      {
        kind: "list",
        items: [
          "Biais des données : auditez la composition de vos datasets (représentativité) et mesurez la performance par sous-groupe, pas seulement en moyenne.",
          "Opacité : un réseau profond n'explique pas ses décisions — problématique dans la santé, la justice ou la finance, où l'explicabilité est exigée.",
          "Coût énergétique : entraîner de grands modèles consomme beaucoup d'électricité ; le transfert learning et les petits modèles sont aussi un choix écologique.",
          "Fausse confiance : un réseau peut être très sûr de lui et totalement faux (exemples adverses : des perturbations invisibles qui changent la prédiction). Ne traitez jamais un score comme une certitude.",
          "Données personnelles : les modèles peuvent mémoriser des données d'entraînement sensibles — encadrez juridiquement (RGPD et équivalents) tout usage de données personnelles.",
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : avant tout déploiement à impact humain, faites une revue des risques (biais, erreurs graves possibles, recours en cas d'erreur du modèle) — c'est aussi important que la métrique de performance.",
      },
    ],
  },
  {
    id: "projets-realistes",
    title: "4 projets réalistes et progressifs",
    level: 3,
    intro: "De la première classification au fine-tuning : un parcours en quatre étapes.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Classifieur de chiffres manuscrits (MNIST)",
        fields: [
          {
            label: "Objectif",
            value: "Reconnaître des chiffres manuscrits (10 classes) avec le petit réseau à deux couches de cette page.",
          },
          {
            label: "Compétences",
            value: "Tenseurs, `nn.Module`, boucle d'entraînement, split train/test, accuracy.",
          },
          {
            label: "Ce que vous apprendrez",
            value: "Le cycle complet sur un problème simple : charger des données (`torchvision.datasets.MNIST`), entraîner, évaluer, tracer les courbes de loss.",
          },
          {
            label: "Difficulté",
            value: "Débutant — réalisable en un week-end.",
          },
          {
            label: "Projet suivant",
            value: "Le projet 2, avec des images couleur plus complexes.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — Classifieur d'images avec CNN",
        fields: [
          {
            label: "Objectif",
            value: "Classifier des photos couleur (par exemple le dataset CIFAR-10, 10 catégories d'objets) avec un CNN.",
          },
          {
            label: "Compétences",
            value: "Convolutions, pooling, augmentation de données, dropout.",
          },
          {
            label: "Ce que vous apprendrez",
            value: "Pourquoi les couches denses plafonnent sur les images ; l'augmentation de données (rotations, crops) comme régularisation gratuite ; lire une matrice de confusion.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — comptez une à deux semaines, GPU recommandé.",
          },
          {
            label: "Projet suivant",
            value: "Le projet 3 : ne plus entraîner de zéro.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Fine-tuning sur vos propres images",
        fields: [
          {
            label: "Objectif",
            value: "Adapter un ResNet pré-entraîné à votre propre problème (ex. trier vos photos en catégories personnelles) avec quelques centaines d'images.",
          },
          {
            label: "Compétences",
            value: "Transfert learning, gel des couches, normalisation adaptée, évaluation rigoureuse.",
          },
          {
            label: "Ce que vous apprendrez",
            value: "Le workflow professionnel réel : collecter et étiqueter ses données, fine-tuner, comparer avec la baseline — avec peu de calcul.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — la difficulté est dans les données, pas dans le code.",
          },
          {
            label: "Projet suivant",
            value: "Le projet 4 : sortir du notebook.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 4 — API de classification déployée",
        fields: [
          {
            label: "Objectif",
            value: "Exposer votre meilleur modèle via une API (FastAPI) : envoi d'une image, réponse JSON avec la classe prédite et le score.",
          },
          {
            label: "Compétences",
            value: "Export des poids, mode `eval()`, API, gestion des erreurs, mesure de latence.",
          },
          {
            label: "Ce que vous apprendrez",
            value: "Tout ce que l'entraînement ne montre pas : prétraitement identique au train, chargement unique du modèle, robustesse aux entrées invalides, versionnage.",
          },
          {
            label: "Difficulté",
            value: "Avancé — mobilise le backend en plus du deep learning.",
          },
          {
            label: "Projet suivant",
            value: "Explorer le NLP avec un Transformer pré-entraîné (bibliothèque `transformers`), ou la détection d'objets.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources officielles",
    level: 3,
    intro: "Les sources de référence, en priorité les documentations officielles.",
    blocks: [
      {
        kind: "list",
        items: [
          "Documentation PyTorch : https://pytorch.org/docs/stable/index.html — tutoriels officiels, référence API, guides (vision, NLP, déploiement).",
          "Documentation Keras : https://keras.io/ — guides très pédagogiques, idéaux pour débuter avec TensorFlow/Keras.",
          "Documentation TensorFlow : https://www.tensorflow.org/ — guides et tutoriels officiels.",
          "DeepLearning.AI (https://www.deeplearning.ai/) — cours en ligne de référence pour les fondamentaux (notion factuelle : plateforme de formation fondée autour d'Andrew Ng).",
          "Livre « Dive into Deep Learning » (d2l.ai) — manuel gratuit et interactif, avec code PyTorch exécutable.",
          "PyTorch Forums et Stack Overflow — pour les erreurs concrètes, avec le code minimal qui reproduit le problème.",
        ],
      },
      {
        kind: "text",
        text: "Conseil de méthode : lisez la documentation du framework que vous utilisez AVANT les tutoriels tiers — elle est à jour, exacte, et les tutoriels tiers vieillissent vite dans cet écosystème.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Trois directions après les fondamentaux, selon votre objectif.",
    blocks: [
      {
        kind: "fields",
        title: "Pistes",
        fields: [
          {
            label: "Vision par ordinateur",
            value: "Détection d'objets, segmentation : partez des modèles pré-entraînés de `torchvision` et affinez-les sur vos données.",
          },
          {
            label: "Langage naturel (NLP)",
            value: "La bibliothèque `transformers` (Hugging Face) : utilisez des modèles pré-entraînés pour classification de texte, résumé, question-réponse — le fine-tuning y est la norme.",
          },
          {
            label: "Mise en production",
            value: "MLOps : suivi d'expériences (MLflow), pipelines reproductibles, supervision des modèles déployés.",
          },
        ],
      },
      {
        kind: "text",
        text: "Et surtout : construisez des projets de bout en bout avec vos propres données. C'est là — dans la collecte, le nettoyage et l'évaluation honnête — que se joue 80 % du travail réel, bien plus que dans le choix de l'architecture.",
      },
    ],
  },
];

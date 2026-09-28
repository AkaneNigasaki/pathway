import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Computer Vision : des pixels aux prédictions —
 * classification, détection, segmentation, avec OpenCV et PyTorch.
 * Couvre les roadmaps informatique et ai-engineer.
 */
export const LEARNING_COMPUTER_VISION: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Ce qu'est la vision par ordinateur : apprendre aux machines à voir.",
    blocks: [
      {
        kind: "text",
        text: "La vision par ordinateur apprend aux machines à interpréter les images et vidéos : détecter des objets, segmenter des régions, classifier des scènes. Les pixels deviennent une information structurée et exploitable.",
      },
      {
        kind: "text",
        text: "De la conduite autonome au contrôle qualité industriel en passant par l'imagerie médicale, la vision est partout où une caméra existe. C'est aussi un excellent terrain pour maîtriser le deep learning appliqué : données, augmentation, déploiement sur edge.",
      },
      {
        kind: "text",
        text: "Deux approches coexistent : la vision classique (OpenCV : contours, seuils, géométrie — précise, sans apprentissage) et la vision profonde (réseaux de neurones — puissante, gourmande en données). On les combine plus souvent qu'on les oppose.",
      },
    ],
  },
  {
    id: "pipeline-vision",
    title: "Le pipeline d'un système de vision",
    level: 1,
    intro:
      "Les six étapes entre une image brute et une décision, en 30 secondes.",
    blocks: [
      {
        kind: "diagram",
        title: "IMAGE → PREPROCESS → BACKBONE → HEAD → POST-PROCESS → PREDICTION",
        lines: [
          "IMAGE        : pixels bruts (caméra, fichier)",
          "PREPROCESS   : redimensionner, normaliser",
          "BACKBONE     : extraire des caractéristiques (CNN)",
          "HEAD         : la tâche (classifier, détecter, segmenter)",
          "POST-PROCESS : filtrer (NMS), seuiller, formater",
          "PREDICTION   : « chat, boîte (x, y, w, h), confiance 0.97 »",
        ],
      },
      {
        kind: "list",
        items: [
          "Le backbone (souvent un réseau pré-entraîné) fait le gros du travail : il transforme les pixels en représentation utile.",
          "La head est spécifique à la tâche : changer de head, c'est changer de métier sans réapprendre à voir.",
          "Le post-traitement compte autant que le modèle : un bon seuillage vaut parfois mieux qu'un meilleur réseau.",
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
      "Les fondations avant de traiter des images.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut savoir",
        fields: [
          {
            label: "Python + NumPy",
            value:
              "Une image est un tableau NumPy : l'indexer, le découper, le convertir. Sans NumPy fluide, tout est pénible.",
          },
          {
            label: "Deep learning de base",
            value:
              "CNN, fonctions de perte, entraînement : la vision moderne repose entièrement sur ces fondations (descente de gradient, overfitting).",
          },
          {
            label: "Notions d'algèbre linéaire",
            value:
              "Tenseurs, dimensions (hauteur, largeur, canaux) : lire `shape=(224, 224, 3)` sans hésiter.",
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
      "OpenCV pour le traitement, PyTorch pour le deep learning.",
    blocks: [
      {
        kind: "command",
        label: "Installer la stack vision",
        command: "pip install opencv-python numpy matplotlib torch torchvision",
        why: "`opencv-python` pour lire et transformer les images, `numpy` pour les tableaux, `matplotlib` pour afficher, `torch`/`torchvision` pour les réseaux de neurones et les modèles pré-entraînés. Paquets standard, open source.",
        verify: "python -c \"import cv2, torch; print(cv2.__version__, torch.__version__)\"",
      },
      {
        kind: "command",
        label: "Vérifier l'environnement de travail",
        command: "python -c \"import torch; print('CUDA:', torch.cuda.is_available())\"",
        why: "Indique si PyTorch peut utiliser un GPU (`True`) ou s'il tournera sur CPU (`False`). L'entraînement sur CPU est possible pour débuter, mais lent — l'inférence sur CPU suffit pour beaucoup d'usages.",
      },
    ],
  },
  {
    id: "premiere-image",
    title: "Première image",
    level: 2,
    intro:
      "Lire, afficher, comprendre : une image est un tableau.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Lire et inspecter une image",
        code: `import cv2\nimport matplotlib.pyplot as plt\n\n# OpenCV lit en BGR (bleu, vert, rouge) — pas en RGB !\nimg_bgr = cv2.imread("photo.jpg\")\nprint(img_bgr.shape)   # (hauteur, largeur, canaux) ex. (1080, 1920, 3)\n\nimg_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)\nplt.imshow(img_rgb)\nplt.axis("off\")\nplt.show()\n\n# Accéder aux pixels : img_rgb[ligne, colonne] -> [R, G, B]\nprint(img_rgb[0, 0])    # le pixel en haut à gauche`,
      },
      {
        kind: "list",
        items: [
          "Piège n°1 : OpenCV lit en BGR — convertir en RGB avant d'afficher avec matplotlib, sinon les couleurs sont inversées.",
          "`shape` donne `(hauteur, largeur, canaux)` : l'ordre est (lignes, colonnes), pas (x, y).",
          "Valeurs des pixels : entiers 0-255 en `uint8` — les réseaux veulent souvent des flottants 0-1 (normalisation, voir niveau 3).",
        ],
      },
    ],
  },
  {
    id: "preprocessing",
    title: "Prétraitement",
    level: 2,
    intro:
      "Redimensionner, convertir, normaliser : préparer les images pour le modèle.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Le prétraitement standard",
        code: `import cv2\nimport numpy as np\n\nimg = cv2.imread("photo.jpg\")\nimg = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)\n\n# 1. Redimensionner à la taille attendue par le modèle\nimg = cv2.resize(img, (224, 224))\n\n# 2. Passer en flottants 0-1\nimg = img.astype(np.float32) / 255.0\n\n# 3. Réordonner : (H, W, C) -> (C, H, W) pour PyTorch\nimg = np.transpose(img, (2, 0, 1))`,
      },
      {
        kind: "list",
        items: [
          "Le modèle attend une taille fixe : `resize` systématique — en gardant le ratio si la déformation gêne (avec padding).",
          "Normalisation : diviser par 255 (0-1), ou centrer-réduire avec moyenne/écart-type — la même qu'à l'entraînement, impérativement.",
          "Ordre des dimensions : OpenCV/NumPy en `(H, W, C)`, PyTorch en `(C, H, W)` — `transpose` ou `permute` pour convertir.",
        ],
      },
    ],
  },
  {
    id: "classification-concept",
    title: "Classification d'images",
    level: 2,
    intro:
      "La tâche la plus simple : « que montre cette image ? »",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Classifier avec un modèle pré-entraîné (torchvision)",
        code: `import torch\nfrom torchvision import models, transforms\nfrom PIL import Image\n\n# Modèle pré-entraîné : il « sait déjà voir »\nmodele = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)\nmodele.eval()\n\npreprocess = transforms.Compose([\n    transforms.Resize(256),\n    transforms.CenterCrop(224),\n    transforms.ToTensor(),          # -> (C, H, W), 0-1\n])\n\nimg = preprocess(Image.open("photo.jpg\")).unsqueeze(0)  # batch de 1\nwith torch.no_grad():\n    scores = modele(img)\nprint("classe prédite:\", scores.argmax().item())`,
      },
      {
        kind: "text",
        text: "`modele.eval()` : bascule en mode inférence (désactive dropout et fige la normalisation par batch). `torch.no_grad()` : pas de calcul de gradient — plus rapide, moins de mémoire. Oublier l'un ou l'autre fausse les prédictions ou gaspille des ressources.",
      },
    ],
  },
  {
    id: "transfer-learning",
    title: "Transfer learning",
    level: 2,
    intro:
      "Ne pas réapprendre à voir : réutiliser un réseau entraîné.",
    blocks: [
      {
        kind: "text",
        text: "Un réseau entraîné sur des millions d'images a appris des caractéristiques génériques (bords, textures, formes). Le transfer learning les réutilise : on garde le backbone, on ne réentraîne que la head sur ses propres données — avec des centaines d'images au lieu de millions.",
      },
      {
        kind: "code",
        language: "python",
        title: "Remplacer la head pour ses propres classes",
        code: `import torch.nn as nn\nfrom torchvision import models\n\nmodele = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)\n\n# Geler le backbone : on ne réentraîne que la fin\nfor param in modele.parameters():\n    param.requires_grad = False\n\n# Nouvelle head : 10 classes à nous\nmodele.fc = nn.Linear(modele.fc.in_features, 10)`,
      },
      {
        kind: "list",
        items: [
          "Deux régimes : extraction de features (backbone gelé, rapide) vs fine-tuning (tout réentraîné avec un petit taux d'apprentissage, meilleur mais plus risqué).",
          "Règle : peu de données → geler ; beaucoup de données et domaine éloigné → fine-tuner.",
          "C'est la méthode par défaut en vision appliquée : entraîner un CNN de zéro est l'exception, pas la norme.",
        ],
      },
    ],
  },
  {
    id: "detection-concept",
    title: "Détection d'objets",
    level: 2,
    intro:
      "« Quoi » et « où » : boîtes englobantes + classes.",
    blocks: [
      {
        kind: "text",
        text: "La détection localise et classifie plusieurs objets dans une image en un seul passage : chaque prédiction est une boîte englobante `(x, y, largeur, hauteur)` + une classe + un score de confiance. Les architectures de type YOLO ont popularisé la détection temps réel.",
      },
      {
        kind: "diagram",
        title: "Une prédiction de détection",
        lines: [
          "┌─────────────────────┐",
          "│ ┌───────┐           │",
          "│ │ chat  │ 0.97      │",
          "│ └───────┘           │",
          "│         ┌────────┐  │",
          "│         │ chien  │  │",
          "│         │ 0.91   │  │",
          "│         └────────┘  │",
          "└─────────────────────┘",
          "Chaque boîte : position + classe + confiance.",
        ],
      },
      {
        kind: "list",
        items: [
          "Deux familles : en deux étapes (régions proposées puis classifiées — précis, lent) et en une étape (YOLO, SSD — temps réel).",
          "Le post-traitement (NMS — suppression des non-maximums) élimine les boîtes en double sur le même objet.",
          "Métrique : mAP (mean Average Precision) — recouvrement (IoU) + précision/rappel combinés. Voir niveau 3.",
        ],
      },
    ],
  },
  {
    id: "datasets-vision",
    title: "Datasets et annotation",
    level: 2,
    intro:
      "Pas de vision sans images annotées : constituer son dataset.",
    blocks: [
      {
        kind: "list",
        items: [
          "Classification : un dossier par classe, images dedans — le format le plus simple (`ImageFolder` de torchvision le lit directement).",
          "Détection : chaque image + un fichier d'annotations (boîtes + classes) — formats COCO (JSON) ou YOLO (TXT), selon l'outil.",
          "Segmentation : chaque image + un masque (image où chaque pixel porte sa classe).",
          "Règle d'or : les ensembles train/val/test doivent être disjoints — aucune image (ni ses variantes augmentées) dans deux ensembles.",
          "Annoter est long : commencer petit (quelques centaines d'images), entraîner, analyser les erreurs, annoter ce qui manque — itératif.",
        ],
      },
      {
        kind: "text",
        text: "La qualité des annotations fait la qualité du modèle : des boîtes approximatives ou des classes ambiguës plafonnent les performances quel que soit le réseau. Définir des règles d'annotation écrites avant de commencer.",
      },
    ],
  },
  {
    id: "workflow-vision",
    title: "Le flux de travail",
    level: 2,
    intro:
      "De l'idée au modèle qui tourne : les étapes dans l'ordre.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Cadrer la tâche",
            detail:
              "Classification, détection ou segmentation ? Temps réel ou batch ? La tâche détermine tout le reste — bien la choisir évite des mois de détour.",
          },
          {
            title: "Constituer un petit dataset",
            detail:
              "Quelques centaines d'images annotées proprement. Mieux vaut 300 images bien annotées que 3000 approximatives.",
          },
          {
            title: "Baseline avec transfer learning",
            detail:
              "Modèle pré-entraîné + head réentraînée : en quelques heures, on sait si le problème est faisable et où sont les difficultés.",
          },
          {
            title: "Analyser les erreurs",
            detail:
              "Regarder les images mal prédites : quelles confusions ? quelles conditions (lumière, angle) ? C'est l'analyse d'erreur qui guide la suite.",
          },
          {
            title: "Itérer sur les données",
            detail:
              "Augmentation, nouvelles annotations ciblées, nettoyage — les gains viennent plus souvent des données que du modèle.",
          },
          {
            title: "Évaluer puis déployer",
            detail:
              "Métriques sur un test jamais vu, puis export vers la cible (serveur, edge) avec le même prétraitement qu'à l'entraînement.",
          },
        ],
      },
    ],
  },
  {
    id: "premiers-projets",
    title: "Premiers projets",
    level: 2,
    intro:
      "Des projets qui font vraiment « voir » à la machine.",
    blocks: [
      {
        kind: "list",
        items: [
          "Classifieur de chats vs chiens : transfer learning, 200 images par classe — le « hello world » de la vision.",
          "Détecteur de visage en temps réel : cascade ou modèle pré-entraîné + webcam — voir la détection tourner en direct.",
          "Trieur de photos : classifier ses propres photos (paysage, portrait, nourriture) avec un modèle réentraîné.",
          "Compteur d'objets : détecter et compter (pièces, personnes qui passent) — la détection appliquée à un besoin concret.",
          "Lecture de plaques ou de chiffres : prétraitement OpenCV + classification — combiner vision classique et profonde.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "representation-image",
    title: "L'image comme tenseur",
    level: 3,
    intro:
      "Dimensions, types, espaces couleur : lire une image comme un tableau.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Manipulations de base sur le tenseur image",
        code: `import numpy as np\n\nimg = np.random.randint(0, 256, (1080, 1920, 3), dtype=np.uint8)\nprint(img.shape, img.dtype)   # (1080, 1920, 3) uint8\n\n# Découper une région d'intérêt (y1:y2, x1:x2)\nroi = img[100:400, 200:600]\n\n# Niveaux de gris : moyenne pondérée des canaux\n# (formule standard : 0.299 R + 0.587 G + 0.114 B)\ngris = (0.299 * img[..., 0] + 0.587 * img[..., 1]\n        + 0.114 * img[..., 2]).astype(np.uint8)`,
      },
      {
        kind: "fields",
        title: "Les espaces couleur",
        fields: [
          {
            label: "RGB / BGR",
            value:
              "Rouge-vert-bleu : l'affichage. OpenCV utilise BGR par défaut — convertir avant d'afficher ou d'envoyer à un modèle entraîné en RGB.",
          },
          {
            label: "Grayscale",
            value:
              "Un seul canal : divise par 3 la donnée. Suffit quand la couleur n'informe pas (formes, texte, défauts).",
          },
          {
            label: "HSV",
            value:
              "Teinte-saturation-valeur : sépare la couleur de la luminosité — robuste aux changements d'éclairage pour la segmentation par couleur.",
          },
        ],
      },
    ],
  },
  {
    id: "convolutions",
    title: "Les convolutions",
    level: 3,
    intro:
      "L'opération au cœur de la vision profonde : filtrer localement.",
    blocks: [
      {
        kind: "diagram",
        title: "Convolution 3×3 : chaque sortie = combinaison du voisinage",
        lines: [
          "image (5×5)        filtre (3×3)       sortie (3×3)",
          "┌─┬─┬─┬─┬─┐      ┌─┬─┬─┐",
          "│a│b│c│d│e│      │1│0│-1│      chaque case = somme",
          "├─┼─┼─┼─┼─┤  *   ├─┼─┼─┤  =   (voisinage × filtre)",
          "│f│g│h│i│j│      │1│0│-1│",
          "├─┼─┼─┼─┼─┤      ├─┼─┼─┤      le filtre glisse sur",
          "│k│l│m│n│o│      │1│0│-1│      toute l'image",
          "└─┴─┴─┴─┴─┘      └─┴─┴─┘",
          "Ce filtre détecte les contours verticaux :",
          "il répond fort quand la gauche diffère de la droite.",
        ],
      },
      {
        kind: "list",
        items: [
          "Le réseau apprend les filtres : les premières couches trouvent bords et textures, les profondes des formes et des objets.",
          "Partage de poids : le même filtre s'applique partout — peu de paramètres, invariance par translation.",
          "Padding : ajouter des bords pour garder la taille ; stride : sauter des pas pour réduire.",
        ],
      },
    ],
  },
  {
    id: "cnn-architectures",
    title: "Architectures CNN",
    level: 3,
    intro:
      "De LeNet aux ResNet : les idées qui ont fait progresser la vision.",
    blocks: [
      {
        kind: "fields",
        title: "Les jalons (concepts)",
        fields: [
          {
            label: "Empilement convolution + pooling",
            value:
              "Alterner convolutions (extraire) et pooling (réduire) : la structure de base — champs récepteurs croissants, résolution décroissante.",
          },
          {
            label: "Connexions résiduelles (ResNet)",
            value:
              "Ajouter l'entrée à la sortie de chaque bloc : le gradient circule, on peut empiler des dizaines de couches sans dégradation.",
          },
          {
            label: "Backbone + head",
            value:
              "Séparer l'extraction (backbone générique, réutilisable) de la tâche (head spécifique) : le principe du transfer learning.",
          },
          {
            label: "Efficacité (MobileNet…)",
            value:
              "Convolutions séparables, modèles compacts : la vision sur mobile et edge — moins précis, bien plus rapides.",
          },
        ],
      },
      {
        kind: "text",
        text: "En pratique, on ne conçoit plus de CNN de zéro : on choisit un backbone pré-entraîné (ResNet, EfficientNet, ConvNeXt via torchvision ou timm) selon le compromis précision/vitesse, et on l'adapte.",
      },
    ],
  },
  {
    id: "fonctions-activation",
    title: "Fonctions d'activation",
    level: 3,
    intro:
      "La non-linéarité : sans elle, un réseau profond = une régression linéaire.",
    blocks: [
      {
        kind: "fields",
        title: "Les principales",
        fields: [
          {
            label: "ReLU",
            value:
              "`max(0, x)` : le défaut — simple, rapide, efficace. Risque : neurones « morts » (toujours 0) si mal initialisés.",
          },
          {
            label: "Sigmoïde",
            value:
              "Écrase vers [0, 1] : utile en sortie binaire (probabilité), à éviter en couches cachées (gradients qui s'évanouissent).",
          },
          {
            label: "Softmax",
            value:
              "En sortie multi-classes : convertit les scores en probabilités qui somment à 1.",
          },
          {
            label: "GELU / SiLU",
            value:
              "Variantes lisses utilisées dans les Transformers : légèrement meilleures, un peu plus coûteuses.",
          },
        ],
      },
    ],
  },
  {
    id: "augmentation",
    title: "Augmentation de données",
    level: 3,
    intro:
      "Créer des variantes artificielles : entraîner robuste avec moins d'images.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Augmentation avec torchvision",
        code: `from torchvision import transforms\n\ntrain_tf = transforms.Compose([\n    transforms.RandomResizedCrop(224),   # recadrage aléatoire\n    transforms.RandomHorizontalFlip(),   # miroir (pas pour du texte !)\n    transforms.ColorJitter(0.2, 0.2, 0.2),  # luminosité/contraste\n    transforms.ToTensor(),\n])\n\n# À la validation : PAS d'aléatoire — le même prétraitement fixe\nval_tf = transforms.Compose([\n    transforms.Resize(256),\n    transforms.CenterCrop(224),\n    transforms.ToTensor(),\n])`,
      },
      {
        kind: "list",
        items: [
          "Principe : chaque époque voit des variantes différentes — le modèle apprend l'invariance (position, luminosité) au lieu de mémoriser.",
          "Cohérence métier : pas de miroir sur des chiffres ou du texte, pas de rotation sur des horizons — l'augmentation doit préserver le sens.",
          "En détection : transformer les boîtes avec l'image (Albumentations le fait automatiquement) — sinon les annotations deviennent fausses.",
          "L'augmentation ne remplace pas des données réelles variées : c'est un multiplicateur, pas une source.",
        ],
      },
    ],
  },
  {
    id: "normalisation",
    title: "Normalisation des images",
    level: 3,
    intro:
      "Mettre les pixels à l'échelle du réseau : un détail qui change tout.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Normalisation ImageNet (standard)",
        code: `from torchvision import transforms\n\n# Moyenne et écart-type calculés sur ImageNet :\n# À utiliser avec les modèles pré-entraînés dessus\nnormalize = transforms.Normalize(mean=[0.485, 0.456, 0.406],\n                                 std=[0.229, 0.224, 0.225])\n\ntf = transforms.Compose([\n    transforms.Resize(256),\n    transforms.CenterCrop(224),\n    transforms.ToTensor(),   # 0-255 -> 0-1\n    normalize,               # 0-1 -> centré-réduit\n])`,
      },
      {
        kind: "text",
        text: "Règle d'or : la normalisation d'inférence doit être identique à celle d'entraînement. Un modèle pré-entraîné sur ImageNet attend la normalisation ImageNet — toute autre donne des prédictions dégradées sans message d'erreur.",
      },
    ],
  },
  {
    id: "fine-tuning-pratique",
    title: "Fine-tuning en pratique",
    level: 3,
    intro:
      "Réentraîner tout le réseau : quand et comment.",
    blocks: [
      {
        kind: "list",
        items: [
          "Quand : beaucoup de données (> quelques milliers) ou domaine éloigné des images naturelles (médical, satellite, industriel).",
          "Taux d'apprentissage petit (10× à 100× plus petit que de zéro) : on ajuste, on ne réinvente pas — un taux trop grand « oublie » le pré-entraînement.",
          "Dégel progressif : d'abord la head, puis les dernières couches, puis tout — stabilise l'entraînement.",
          "Surveiller train ET validation : le fine-tuning sur-apprend vite sur petits datasets — arrêt précoce indispensable.",
          "Sauvegarder le meilleur sur validation (`best_model`), pas le dernier : la dernière époque n'est pas la meilleure.",
        ],
      },
    ],
  },
  {
    id: "detection-avancee",
    title: "Détection : IoU et NMS",
    level: 3,
    intro:
      "Évaluer le recouvrement et dédupliquer : les deux algorithmes de la détection.",
    blocks: [
      {
        kind: "diagram",
        title: "IoU : Intersection sur Union",
        lines: [
          "boîte prédite ┌──────┐",
          "            │ ┌──┼──┐ │  vérité terrain",
          "            │ │██│  │ │",
          "            └──┼──┘  │",
          "             └──────┘",
          "IoU = aire(intersection) / aire(union)",
          "IoU > 0.5 : la détection « compte » (seuil standard).",
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "IoU en NumPy",
        code: `def iou(a, b):\n    # boîtes : (x1, y1, x2, y2)\n    ix1, iy1 = max(a[0], b[0]), max(a[1], b[1])\n    ix2, iy2 = min(a[2], b[2]), min(a[3], b[3])\n    inter = max(0, ix2 - ix1) * max(0, iy2 - iy1)\n    union = (a[2]-a[0])*(a[3]-a[1]) + (b[2]-b[0])*(b[3]-b[1]) - inter\n    return inter / union if union > 0 else 0.0`,
      },
      {
        kind: "text",
        text: "NMS (Non-Maximum Suppression) : le modèle prédit plusieurs boîtes par objet — on garde la plus confiante et on supprime celles qui la recouvrent trop (IoU > seuil). Le seuil NMS règle le compromis doublons vs objets proches manqués.",
      },
    ],
  },
  {
    id: "metriques-detection",
    title: "Métriques de détection",
    level: 3,
    intro:
      "mAP : la métrique standard, et ce qu'elle cache.",
    blocks: [
      {
        kind: "fields",
        title: "Comprendre la mAP",
        fields: [
          {
            label: "Précision / rappel par classe",
            value:
              "Pour un seuil de confiance : quelle part des détections est correcte (IoU > 0.5), quelle part des objets est trouvée. Faire varier le seuil trace la courbe.",
          },
          {
            label: "AP (Average Precision)",
            value:
              "L'aire sous la courbe précision-rappel d'une classe : résume le compromis en un chiffre.",
          },
          {
            label: "mAP",
            value:
              "La moyenne des AP sur les classes (souvent mAP@0.5, ou moyennée sur IoU 0.5-0.95 pour le COCO). Le chiffre de comparaison standard.",
          },
          {
            label: "Limites",
            value:
              "La mAP moyenne cache les disparités : une classe à 0.9 et une à 0.3 donnent 0.6 — regarder par classe, toujours.",
          },
        ],
      },
    ],
  },
  {
    id: "segmentation",
    title: "Segmentation",
    level: 3,
    intro:
      "Classifier chaque pixel : la précision au pixel près.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois segmentations",
        fields: [
          {
            label: "Sémantique",
            value:
              "Chaque pixel a une classe (« route », « piéton ») — sans distinguer les instances : deux piétons = une seule zone « piéton ».",
          },
          {
            label: "Par instances",
            value:
              "Chaque objet séparément : piéton 1, piéton 2 — détection + masque par objet (Mask R-CNN).",
          },
          {
            label: "Panoptique",
            value:
              "Les deux : chaque pixel a une classe ET un identifiant d'instance — la version complète.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Architecture type : U-Net (encodeur-décodeur avec connexions sautées) — le standard, notamment en médical.",
          "Annotation coûteuse : segmenter au pixel prend 10× plus de temps qu'une boîte — d'où les approches faiblement supervisées.",
          "Métrique : IoU moyen par classe (mIoU) — recouvrement entre masque prédit et vérité.",
        ],
      },
    ],
  },
  {
    id: "vision-transformers",
    title: "Vision Transformers (ViT)",
    level: 3,
    intro:
      "L'architecture Transformer appliquée aux images découpées en patchs.",
    blocks: [
      {
        kind: "text",
        text: "Le ViT découpe l'image en patchs (ex. 16×16), les traite comme des « mots », et applique l'attention globale : chaque patch voit tous les autres dès la première couche — là où un CNN élargit son champ progressivement.",
      },
      {
        kind: "list",
        items: [
          "Forces : excellent avec beaucoup de données, capture le contexte global, même architecture que le texte (multimodalité naturelle).",
          "Faiblesses : gourmand en données (moins de biais inductif qu'un CNN), coûteux en calcul sur hautes résolutions (attention quadratique).",
          "Hybrides : les architectures modernes mélangent convolutions (efficacité locale) et attention (contexte global).",
          "En pratique : comme les CNN, on les utilise pré-entraînés (timm, torchvision) — pas entraînés de zéro.",
        ],
      },
    ],
  },
  {
    id: "traitement-video",
    title: "Traitement vidéo",
    level: 3,
    intro:
      "Du cadre isolé au flux : le temps comme dimension.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Lire une vidéo image par image",
        code: `import cv2\n\ncap = cv2.VideoCapture(0)   # 0 = webcam ; ou "video.mp4\"\nwhile True:\n    ok, frame = cap.read()\n    if not ok:\n        break\n    # traiter frame ici (détection, affichage…)\n    cv2.imshow("flux\", frame)\n    if cv2.waitKey(1) & 0xFF == ord("q\"):\n        break\ncap.release()\ncv2.destroyAllWindows()`,
      },
      {
        kind: "list",
        items: [
          "Échantillonner : traiter 1 image sur N — le temps réel tient rarement à 30 fps avec un gros modèle.",
          "Suivi (tracking) : associer les détections entre images (SORT, DeepSORT) — donner un identifiant stable à chaque objet.",
          "Soustraction de fond : pour les scènes fixes, détecter le mouvement sans deep learning (MOG2 dans OpenCV).",
          "Latence vs débit : traiter en différé (buffer) ou en direct — le choix change l'architecture.",
        ],
      },
    ],
  },
  {
    id: "opencv-classique",
    title: "Vision classique avec OpenCV",
    level: 3,
    intro:
      "Sans deep learning : seuils, contours, morphologie — rapide et explicable.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Seuillage et contours",
        code: `import cv2\n\nimg = cv2.imread("piece.jpg\", cv2.IMREAD_GRAYSCALE)\n\n# Seuillage : séparer objet et fond\n_, binaire = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY)\n\n# Contours : les formes présentes\ncontours, _ = cv2.findContours(binaire, cv2.RETR_EXTERNAL,\n                               cv2.CHAIN_APPROX_SIMPLE)\nprint(f"{len(contours)} objets détectés\")\n\n# Boîte englobante du plus grand\nplus_grand = max(contours, key=cv2.contourArea)\nx, y, w, h = cv2.boundingRect(plus_grand)`,
      },
      {
        kind: "list",
        items: [
          "Idéal quand l'environnement est contrôlé (éclairage fixe, fond uni) : contrôle qualité industriel, lecture d'instruments.",
          "Avantages : temps réel sur CPU, aucun entraînement, résultats explicables et déterministes.",
          "Limites : fragile aux variations (lumière, angle, fond) — là où le deep learning prend le relais.",
          "En pratique : prétraitement classique AVANT le réseau (recadrage, redressement) — les deux approches se combinent.",
        ],
      },
    ],
  },
  {
    id: "annotation-qualite",
    title: "Annotation : la qualité d'abord",
    level: 3,
    intro:
      "Le modèle ne dépassera jamais durablement ses annotations.",
    blocks: [
      {
        kind: "list",
        items: [
          "Règles écrites : qu'est-ce qu'un « défaut » ? boîte serrée ou large ? objets partiellement visibles : on annote ou non ? — trancher AVANT, pas pendant.",
          "Cohérence inter-annotateurs : faire annoter les mêmes 50 images par deux personnes, mesurer l'accord — les désaccords révèlent des règles floues.",
          "Cas difficiles : les annoter en dernier, à part — ce sont eux qui feront progresser le modèle (hard mining).",
          "Versionner les annotations comme du code : un changement de règle = une version — sinon les expériences sont incomparables.",
          "Boucle active : entraîner sur peu, prédire sur beaucoup, faire corriger les erreurs par l'humain — l'annotation la plus rentable.",
        ],
      },
    ],
  },
  {
    id: "evaluation-classification",
    title: "Évaluer un classifieur",
    level: 3,
    intro:
      "Au-delà de l'accuracy : la matrice de confusion.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Matrice de confusion avec scikit-learn",
        code: `from sklearn.metrics import confusion_matrix, classification_report\n\n# y_vrai, y_pred : listes de classes (entiers ou noms)\nprint(confusion_matrix(y_vrai, y_pred))\nprint(classification_report(y_vrai, y_pred))\n# Précision, rappel, F1 par classe : révèle les classes faibles\n# que l'accuracy globale masque.`,
      },
      {
        kind: "diagram",
        title: "Lire une matrice de confusion",
        lines: [
          "            prédit : chat   chien",
          "réel : chat       92      8     ← 8 chats pris pour des chiens",
          "réel : chien      15     85     ← 15 chiens pris pour des chats",
          "Diagonale = correct. Hors diagonale = confusions.",
          "Une asymétrie (15 vs 8) indique un biais à corriger.",
        ],
      },
    ],
  },
  {
    id: "ocr",
    title: "OCR : lire le texte des images",
    level: 3,
    intro:
      "Reconnaissance optique de caractères : du scan au texte.",
    blocks: [
      {
        kind: "text",
        text: "L'OCR moderne combine détection de zones de texte et reconnaissance de séquences (CRNN, Transformers) : il lit le texte dans des images naturelles, pas seulement des documents scannés — panneaux, plaques, étiquettes.",
      },
      {
        kind: "list",
        items: [
          "Prétraitement décisif : redressement, contraste, binarisation — un bon seuillage vaut un meilleur reconnaisseur.",
          "Évaluation : taux d'erreur caractères (CER) et mots (WER) — compter ce qui est mal lu, pas juste « ça marche ».",
          "Limites : écriture manuscrite, polices exotiques, texte incliné — tester sur SES images, pas sur la démo du vendeur.",
          "Bibliothèques open source existantes (Tesseract pour le classique, EasyOCR/PaddleOCR pour le neuronal) : ne pas réinventer.",
        ],
      },
    ],
  },
  {
    id: "pose-estimation",
    title: "Estimation de pose",
    level: 3,
    intro:
      "Localiser les articulations : squelettes à partir d'images.",
    blocks: [
      {
        kind: "text",
        text: "L'estimation de pose prédit des points clés (épaules, coudes, genoux…) plutôt que des boîtes : on obtient un squelette articulé — utile pour le sport (analyse du geste), l'ergonomie, l'interaction.",
      },
      {
        kind: "list",
        items: [
          "Deux approches : top-down (détecter la personne, puis ses points) vs bottom-up (détecter les points, puis les regrouper).",
          "Métrique : distance entre points prédits et vérité, normalisée par la taille — ou PCK (pourcentage de points corrects).",
          "Les occultations (membre caché) sont le cas dur : les bons modèles « devinent » à partir du contexte corporel.",
        ],
      },
    ],
  },
  {
    id: "profondeur-stereo",
    title: "Profondeur et 3D",
    level: 3,
    intro:
      "De l'image plate à la géométrie : estimer la distance.",
    blocks: [
      {
        kind: "fields",
        title: "Les approches",
        fields: [
          {
            label: "Stéréo",
            value:
              "Deux caméras : la disparité entre les vues donne la profondeur par triangulation — précis, nécessite calibration.",
          },
          {
            label: "Profondeur monoculaire",
            value:
              "Un réseau estime la profondeur d'une seule image : pratique (un téléphone suffit), moins précis, échelle ambiguë.",
          },
          {
            label: "Capteurs actifs",
            value:
              "LiDAR, temps de vol : mesurent directement — coûteux, mais fiables (robotique, véhicules).",
          },
          {
            label: "Calibration",
            value:
              "Corriger la distorsion de l'objectif (damier + OpenCV) : indispensable dès qu'on mesure dans l'image.",
          },
        ],
      },
    ],
  },
  {
    id: "suivi-objets",
    title: "Suivi d'objets (tracking)",
    level: 3,
    intro:
      "Donner un identifiant stable à chaque objet dans la vidéo.",
    blocks: [
      {
        kind: "text",
        text: "Le tracking associe les détections d'une image à l'autre : la personne détectée à t=1 est la même qu'à t=2. Les algorithmes classiques (SORT) combinent prédiction de mouvement (filtre de Kalman) et association (IoU entre images).",
      },
      {
        kind: "list",
        items: [
          "Applications : comptage de personnes qui entrent/sortent, trajectoires, vitesse — la détection devient de l'analyse.",
          "Le cas dur : les occultations (objet caché puis réapparu) — les versions « deep » ajoutent une signature d'apparence (ré-identification).",
          "Évaluation : MOTA (précision du suivi : faux positifs, manqués, changements d'ID) — un changement d'identifiant compte comme erreur.",
        ],
      },
    ],
  },
  {
    id: "deploiement-edge",
    title: "Déploiement : serveur et edge",
    level: 3,
    intro:
      "Faire tourner le modèle là où sont les caméras.",
    blocks: [
      {
        kind: "fields",
        title: "Les cibles",
        fields: [
          {
            label: "Serveur / API",
            value:
              "Le modèle tourne sur GPU serveur, les images arrivent par API : simple à mettre à jour, mais latence réseau et bande passante.",
          },
          {
            label: "Edge (caméra, mobile, embarqué)",
            value:
              "Le modèle tourne sur l'appareil : temps réel, confidentialité, pas de réseau — mais puissance limitée, modèle compact obligatoire.",
          },
          {
            label: "Batch",
            value:
              "Traiter des images en différé (toutes les heures) : le plus simple — quand le temps réel n'est pas requis.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Le prétraitement doit être IDENTIQUE entre entraînement et déploiement : la moitié des bugs de production viennent d'ici.",
          "Versionner modèle + prétraitement ensemble : un modèle sans son pipeline est inutilisable.",
          "Tester sur le matériel cible : un modèle « rapide » sur GPU serveur peut être inutilisable sur CPU embarqué.",
        ],
      },
    ],
  },
  {
    id: "optimisation-inference",
    title: "Optimiser l'inférence",
    level: 3,
    intro:
      "Plus vite, moins de mémoire : les leviers standards.",
    blocks: [
      {
        kind: "command",
        label: "Installer ONNX",
        command: "pip install onnx",
        why: "ONNX est le format d'échange standard : exporter son modèle PyTorch vers ONNX permet de l'exécuter avec des runtimes optimisés (ONNX Runtime, TensorRT) sur diverses cibles.",
      },
      {
        kind: "fields",
        title: "Les leviers",
        fields: [
          {
            label: "Export ONNX",
            value:
              "`torch.onnx.export` : le modèle devient portable — exécuté par ONNX Runtime, souvent plus rapide que PyTorch pour l'inférence.",
          },
          {
            label: "Quantification",
            value:
              "Passer de float32 à int8 : modèle 4× plus petit, 2-4× plus rapide — avec une légère perte de précision à mesurer.",
          },
          {
            label: "Batch",
            value:
              "Traiter plusieurs images à la fois : exploite le parallélisme du GPU — débit augmenté, latence par image réduite.",
          },
          {
            label: "Modèle plus petit",
            value:
              "Un ResNet-18 bien entraîné bat un ResNet-152 mal déployé : le meilleur modèle est celui qui tient les contraintes.",
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
      "Les pièges que tout le monde rencontre en vision.",
    blocks: [
      {
        kind: "fields",
        title: "Le top des erreurs",
        fields: [
          {
            label: "BGR vs RGB",
            value:
              "OpenCV lit en BGR : afficher ou prédire sans convertir inverse les couleurs — le bug silencieux n°1.",
          },
          {
            label: "Prétraitement incohérent",
            value:
              "Normalisation différente entre train et inférence : le modèle « marche » mais mal — vérifier la chaîne complète.",
          },
          {
            label: "Fuite train/test",
            value:
              "Images (ou leurs variantes augmentées) présentes des deux côtés : des scores flatteurs, un modèle inutile.",
          },
          {
            label: "Oublier eval() / no_grad()",
            value:
              "Inférence en mode entraînement : résultats instables et mémoire gaspillée.",
          },
          {
            label: "Redimensionner sans réfléchir",
            value:
              "Écraser le ratio déforme les objets : pour la détection, préférer le padding (letterbox).",
          },
          {
            label: "Trop peu de données, trop gros modèle",
            value:
              "Sur-apprentissage garanti : commencer petit (modèle et données), augmenter progressivement.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-vision",
    title: "Déboguer un modèle de vision",
    level: 3,
    intro:
      "Quand ça ne marche pas : regarder les images, pas les chiffres.",
    blocks: [
      {
        kind: "list",
        items: [
          "Visualiser les prédictions : dessiner boîtes/masques sur les images avec OpenCV — l'œil voit en 10 secondes ce que les métriques cachent.",
          "Analyser les erreurs par cas : quelles images échouent ? (sombres, floues, petits objets) — chaque famille d'erreur a son remède.",
          "Vérifier le pipeline : afficher une image APRÈS prétraitement — la moitié des bugs sont là (mauvaise normalisation, mauvais ordre des canaux).",
          "Grad-CAM : visualiser où le modèle « regarde » — s'il regarde le fond plutôt que l'objet, le dataset a un biais.",
          "Overfitter un mini-batch : si le modèle n'apprend même pas 10 images par cœur, le bug est dans le code, pas les données.",
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Dessiner des boîtes avec OpenCV",
        code: `import cv2\n\nimg = cv2.imread("photo.jpg\")\n# boîte : (x1, y1, x2, y2), couleur en BGR, épaisseur 2\ncv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)\ncv2.putText(img, "chat 0.97\", (x1, y1 - 10),\n            cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)\ncv2.imwrite("resultat.jpg\", img)`,
      },
    ],
  },
  {
    id: "biais-donnees",
    title: "Biais et limites",
    level: 3,
    intro:
      "Un modèle de vision reflète son dataset — avec ses angles morts.",
    blocks: [
      {
        kind: "list",
        items: [
          "Biais de représentation : un dataset de visages majoritairement clairs reconnaît mal les autres — mesurer les performances PAR groupe.",
          "Biais de contexte : un modèle qui associe « cuisine » aux femmes apprend des stéréotypes du dataset — auditer les corrélations.",
          "Confidentialité : visages, plaques — flouter/anonymiser les données, limiter la conservation, informer.",
          "Ne jamais déployer sans test sur les populations réelles d'usage : le dataset d'entraînement n'est pas le monde.",
          "Documenter : d'où viennent les images, qui les a annotées, quelles limites connues — une fiche dataset (datasheet) fait partie du livrable.",
        ],
      },
    ],
  },
  {
    id: "projets-avances",
    title: "Projets avancés",
    level: 3,
    intro:
      "Des projets complets : données, modèle, déploiement.",
    blocks: [
      {
        kind: "list",
        items: [
          "Compteur de personnes temps réel : détection + tracking + ligne de comptage — de la webcam au tableau de bord.",
          "Contrôle qualité : détecter les défauts sur une chaîne (dataset annoté maison) — la vision industrielle de A à Z.",
          "Lecteur de documents : détection de zones + OCR — pipeline complet document → texte structuré.",
          "Segmentation médicale ou satellite : U-Net sur un dataset public — le niveau « recherche appliquée ».",
          "Modèle sur edge : quantifier et déployer sur Raspberry Pi ou mobile — les contraintes du réel.",
          "Portfolio : pour chaque projet, montrer images d'entrée, prédictions visualisées, métriques et limites — c'est ça qui convainc.",
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro:
      "La documentation officielle d'abord.",
    blocks: [
      {
        kind: "list",
        items: [
          "PyTorch — pytorch.org/docs : tensors, autograd, torchvision (modèles pré-entraînés et transforms).",
          "torchvision — modèles et datasets : la référence pour le transfer learning.",
          "OpenCV — docs.opencv.org : traitement d'image classique, calibration, vidéo.",
          "Ultralytics (YOLO) — docs.ultralytics.com : détection prête à l'emploi.",
          "Hugging Face — huggingface.co/docs : Vision Transformers et modèles multimodaux.",
          "Papers With Code — vision : l'état de l'art par tâche, avec code.",
        ],
      },
      {
        kind: "text",
        text: "Méthode : un tutoriel officiel (PyTorch « Transfer Learning »), un projet annoté maison, puis la documentation des outils au fil des besoins. Les papiers de recherche viennent après la pratique, pas avant.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Les compétences qui prolongent la vision par ordinateur.",
    blocks: [
      {
        kind: "list",
        items: [
          "`deep-learning` — les fondations théoriques : optimisation, régularisation, architectures.",
          "`pytorch` — maîtriser le framework : entraînement custom, DataLoader, déploiement.",
          "`tensorflow` — l'écosystème alternatif, notamment pour le mobile (TFLite) et la production.",
          "`mlops` — versionner, servir et monitorer des modèles en production.",
          "`robotics` — la vision au service des robots : perception, navigation.",
          "`python` — le langage de tout l'écosystème : l'approfondir paie partout.",
        ],
      },
    ],
  },
  {
    id: "formats-annotation",
    title: "Formats d'annotation",
    level: 3,
    intro:
      "COCO, YOLO, Pascal VOC : lire et convertir les annotations.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Lire des annotations COCO",
        code: `import json\n\nwith open("annotations.json\") as f:\n    coco = json.load(f)\n\n# images, annotations, categories : trois listes liées par id\nimg = coco["images\"][0]\nboites = [a for a in coco["annotations\"] if a["image_id\"] == img["id\"]]\n# boîte COCO : [x, y, largeur, hauteur] en pixels\nfor b in boites:\n    print(b["bbox\"], "-> classe\", b["category_id\"])`,
      },
      {
        kind: "fields",
        title: "Les formats",
        fields: [
          {
            label: "COCO (JSON)",
            value:
              "Le standard recherche : images, annotations, catégories — boîtes, masques, points clés. Verbeux mais complet.",
          },
          {
            label: "YOLO (TXT)",
            value:
              "Un fichier par image, une ligne par objet : `classe x_centre y_centre largeur hauteur` normalisés 0-1. Simple et lisible.",
          },
          {
            label: "Pascal VOC (XML)",
            value:
              "Historique : un XML par image. Encore rencontré dans d'anciens datasets.",
          },
          {
            label: "Conversion",
            value:
              "Les outils (FiftyOne, Roboflow) convertissent entre formats : choisir selon l'écosystème d'entraînement, pas par goût.",
          },
        ],
      },
    ],
  },
  {
    id: "tests-vision",
    title: "Tester un pipeline vision",
    level: 3,
    intro:
      "Des tests automatiques pour le prétraitement et l'inférence.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Tests du pipeline",
        code: `import numpy as np\n\ndef test_pretraitement():\n    img = np.random.randint(0, 256, (480, 640, 3), dtype=np.uint8)\n    sortie = pretraitement(img)\n    # Le modèle attend (C, H, W) en float32\n    assert sortie.shape == (3, 224, 224), sortie.shape\n    assert sortie.dtype == np.float32\n\ndef test_boites_dans_image():\n    for (x1, y1, x2, y2) in boites_predites:\n        assert 0 <= x1 < x2 <= largeur_image\n        assert 0 <= y1 < y2 <= hauteur_image`,
      },
      {
        kind: "list",
        items: [
          "Tester le prétraitement : dimensions, dtype, plage de valeurs — la source n°1 des bugs silencieux.",
          "Jeu de test fixe : une dizaine d'images représentatives avec résultats attendus — détecte les régressions de modèle.",
          "Tester les cas limites : image noire, image minuscule, image corrompue — le pipeline ne doit jamais crasher.",
        ],
      },
    ],
  },
];

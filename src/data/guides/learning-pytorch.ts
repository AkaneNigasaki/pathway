import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de PyTorch : de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Cohérent avec le guide existant (tenseurs, autograd, modules, DataLoaders,
 * GPU, checkpoints) et son setup (pip, CUDA, device unique).
 */
export const LEARNING_PYTORCH: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est PyTorch, pourquoi il domine la recherche en IA et comment il s'articule avec Python.",
    blocks: [
      {
        kind: "text",
        text: "PyTorch est un framework de deep learning en Python : il fournit les tenseurs (tableaux multidimensionnels calculés sur GPU), la différentiation automatique (autograd) et les briques de réseaux de neurones (`torch.nn`). On décrit un modèle en Python ordinaire, PyTorch se charge des calculs et des gradients.",
      },
      {
        kind: "text",
        text: "Pourquoi PyTorch domine la recherche : son graphe de calcul est dynamique — le réseau se construit au fil de l'exécution Python, ce qui rend le débogage naturel (print, points d'arrêt, contrôle de flux Python normal). Cette flexibilité a fait de lui l'outil standard des publications scientifiques, et donc de la plupart des modèles ouverts (LLM, diffusion, vision) que l'on fine-tune aujourd'hui.",
      },
      {
        kind: "text",
        text: "Relation avec l'écosystème : PyTorch est une bibliothèque Python, pas un langage. Il s'appuie sur NumPy pour la manipulation de tableaux (les tenseurs en sont l'extension GPU), et s'entoure d'un écosystème : `torchvision` (vision), `torchaudio` (audio), `torchtext` (texte), Hugging Face `transformers` pour les modèles pré-entraînés. Apprendre PyTorch, c'est apprendre à entraîner, évaluer et déployer des réseaux de neurones.",
      },
    ],
  },
  {
    id: "pytorch-carte-mentale",
    title: "La carte mentale de PyTorch",
    level: 1,
    intro:
      "Le schéma que tout le reste va détailler : cinq concepts, un seul flux.",
    blocks: [
      {
        kind: "diagram",
        title: "Du tenseur au modèle entraîné",
        lines: [
          "TENSEURS",
          "  (données : torch.tensor, .to(device))",
          "     │",
          "     ▼",
          "MODULE (`nn.Module`)",
          "  (le modèle : couches + forward)",
          "     │",
          "     ▼",
          "PERTE (`loss`)",
          "  (écart prédiction ↔ réalité)",
          "     │",
          "     ▼",
          "BACKWARD (`loss.backward()`)",
          "  (autograd calcule les gradients)",
          "     │",
          "     ▼",
          "OPTIMISEUR (`optimizer.step()`)",
          "  (ajuste les poids, puis zero_grad)",
        ],
      },
      {
        kind: "text",
        text: "Tout entraînement PyTorch est une répétition de cette boucle : prédire, mesurer l'erreur, calculer les gradients, corriger les poids. Les DataLoaders alimentent la boucle en lots de données, les checkpoints la rendent reprenable, le GPU l'accélère. Chaque niveau suivant de cette page zoome sur une étape.",
      },
      {
        kind: "list",
        items: [
          "Les tenseurs sont les données ; le module est le modèle ; la perte mesure l'erreur.",
          "`backward()` + `step()` + `zero_grad()` : les trois appels de toute boucle d'entraînement.",
          "Rien n'est magique : chaque concept se débogue avec du Python ordinaire.",
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
      "Ce qu'il faut maîtriser avant PyTorch, et pourquoi chaque prérequis compte.",
    blocks: [
      {
        kind: "fields",
        title: "Fondations requises",
        fields: [
          {
            label: "Python solide",
            value:
              "Classes, héritage, décorateurs, compréhensions, gestionnaires de contexte. Un modèle PyTorch est une classe Python : sans ces bases, `nn.Module` reste opaque.",
          },
          {
            label: "NumPy (`numpy`)",
            value:
              "Tableaux multidimensionnels, formes (shapes), broadcasting, indexation. Les tenseurs PyTorch en sont l'extension directe — la logique est la même, avec le GPU en plus.",
          },
          {
            label: "Machine learning (`machine-learning`)",
            value:
              "Concepts d'entraînement, fonction de perte, sur-apprentissage, ensembles train/validation/test. PyTorch implémente ces idées : il faut les connaître pour les reconnaître.",
          },
          {
            label: "Algèbre linéaire de base",
            value:
              "Vecteurs, matrices, produit matriciel. Un réseau de neurones n'est qu'une suite de transformations linéaires et de non-linéarités.",
          },
          {
            label: "Ligne de commande + environnements virtuels",
            value:
              "`pip`, `venv` ou `conda` : PyTorch s'installe par environnement, avec une variante CPU ou GPU selon la machine.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le guide de la compétence le confirme : sans les notions de loss et d'évaluation (`machine-learning`) et sans la manipulation de tableaux (`numpy`), PyTorch se réduit à du copier-coller fragile. Consolidez ces bases d'abord.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Installer PyTorch avec la bonne variante (CPU ou GPU), en comprenant chaque commande.",
    blocks: [
      {
        kind: "command",
        label: "Installer PyTorch (CPU)",
        command: "pip install torch",
        why: "Installe la variante CPU de PyTorch, suffisante pour apprendre : tenseurs, autograd, petits modèles. Pour la commande exacte selon l'OS et la version CUDA, la page officielle pytorch.org/get-started génère la ligne à copier.",
        verify: "python -c \"import torch; print(torch.__version__)\"",
      },
      {
        kind: "command",
        label: "Installer PyTorch (GPU NVIDIA)",
        command: "pip install torch --index-url https://download.pytorch.org/whl/cu121",
        why: "Récupère les binaires compilés pour CUDA 12.1 depuis l'index officiel PyTorch. Adaptez `cu121` à la version CUDA installée sur la machine (voir `nvidia-smi`). Sans GPU NVIDIA, cette variante est inutile.",
        verify: "python -c \"import torch; print(torch.cuda.is_available())\"",
      },
      {
        kind: "command",
        label: "Installer l'écosystème vision",
        command: "pip install torchvision",
        why: "Ajoute datasets (MNIST, CIFAR, ImageNet), modèles pré-entraînés (ResNet…) et transformations d'images. À installer depuis le même index CUDA que `torch` pour la variante GPU.",
        verify: "python -c \"import torchvision; print(torchvision.__version__)\"",
      },
      {
        kind: "text",
        text: "Utilisez un environnement virtuel (`python -m venv .venv`) : PyTorch est volumineux (plusieurs Go en variante GPU) et ses dépendances binaires cohabitent mal entre projets. Le `verify` CUDA doit afficher `True` : sinon, PyTorch fonctionne mais tout tourne sur CPU.",
      },
    ],
  },
  {
    id: "premier-projet",
    title: "Premier projet : régression linéaire",
    level: 2,
    intro:
      "Entraîner un premier modèle de zéro : la boucle complète en une trentaine de lignes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer l'environnement et installer PyTorch",
            detail:
              "`python -m venv .venv`, activer l'environnement, puis `pip install torch`. Vérifier l'import avec `python -c \"import torch; print(torch.__version__)\"`.",
          },
          {
            title: "Générer des données synthétiques",
            detail:
              "Créer `x = torch.randn(100, 1)` et `y = 3 * x + 0.5 + bruit` : une droite à retrouver. Travailler sur des données synthétiques permet de vérifier que le modèle converge vers la bonne solution.",
          },
          {
            title: "Définir le modèle",
            detail:
              "`model = torch.nn.Linear(1, 1)` : une couche linéaire `y = Wx + b`. C'est un `nn.Module` avec des paramètres apprenables (`weight`, `bias`).",
          },
          {
            title: "Choisir perte et optimiseur",
            detail:
              "`loss_fn = torch.nn.MSELoss()` (erreur quadratique moyenne, adaptée à la régression) et `optimizer = torch.optim.SGD(model.parameters(), lr=0.01)` (descente de gradient stochastique).",
          },
          {
            title: "Écrire la boucle d'entraînement",
            detail:
              "Pour chaque époque : prédire (`y_pred = model(x)`), calculer la perte, `optimizer.zero_grad()` (remettre les gradients à zéro), `loss.backward()` (calculer les gradients), `optimizer.step()` (mettre à jour les poids).",
          },
          {
            title: "Vérifier la convergence",
            detail:
              "La perte doit diminuer régulièrement. À la fin, `model.weight` doit valoir environ 3 et `model.bias` environ 0.5 : le modèle a retrouvé la droite d'origine.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "regression.py — boucle d'entraînement minimale",
        code: "import torch\n\n# Données : y = 3x + 0.5 + bruit\ntorch.manual_seed(0)\nx = torch.randn(100, 1)\ny = 3 * x + 0.5 + 0.2 * torch.randn(100, 1)\n\nmodel = torch.nn.Linear(1, 1)\nloss_fn = torch.nn.MSELoss()\noptimizer = torch.optim.SGD(model.parameters(), lr=0.01)\n\nfor epoch in range(200):\n    y_pred = model(x)              # forward : prédiction\n    loss = loss_fn(y_pred, y)      # mesure de l'erreur\n    optimizer.zero_grad()          # remet les gradients à zéro\n    loss.backward()                # calcule les gradients (autograd)\n    optimizer.step()               # met à jour weight et bias\n\n    if epoch % 50 == 0:\n        print(f\"epoch {epoch} — loss {loss.item():.4f}\")\n\nprint(\"weight:\", model.weight.item(), \"bias:\", model.bias.item())",
      },
    ],
  },
  {
    id: "tenseurs-fondamentaux",
    title: "Tenseurs : les fondamentaux",
    level: 2,
    intro:
      "Créer, inspecter et manipuler des tenseurs : le vocabulaire de base de tout le reste.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Création et inspection",
        code: "import torch\n\nt = torch.tensor([1., 2., 3.])   # depuis une liste Python\nz = torch.zeros(2, 3)            # 2 lignes, 3 colonnes, rempli de 0\nr = torch.randn(2, 3)            # tirage gaussien\n\nprint(t.shape)   # torch.Size([3]) : la forme\nprint(t.dtype)   # torch.float32 : le type des éléments\nprint(t.device)  # cpu : où vit le tenseur",
      },
      {
        kind: "fields",
        title: "Ce qu'il faut retenir d'un tenseur",
        fields: [
          {
            label: "`shape`",
            value:
              "Les dimensions : `(2, 3)` = 2 lignes, 3 colonnes. Toute erreur de dimension en deep learning se lit ici en premier.",
          },
          {
            label: "`dtype`",
            value:
              "Le type des éléments (`float32` par défaut). Les calculs mélangent mal les dtypes : `float32` + `int64` exige une conversion explicite.",
          },
          {
            label: "`device`",
            value:
              "`cpu` ou `cuda` : un tenseur vit à un seul endroit. Toute opération entre deux tenseurs exige le même device.",
          },
          {
            label: "`requires_grad`",
            value:
              "`True` pour les paramètres du modèle : PyTorch suit alors les opérations pour calculer les gradients.",
          },
        ],
      },
      {
        kind: "text",
        text: "Réflexe de débogage numéro un : quand une erreur de dimension apparaît, affichez les `.shape` des tenseurs impliqués. La cause est souvent visible immédiatement.",
      },
    ],
  },
  {
    id: "autograd-bases",
    title: "Autograd : les bases",
    level: 2,
    intro:
      "Comment PyTorch calcule les gradients tout seul — et ce que `backward()` fait vraiment.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Gradient automatique minimal",
        code: "import torch\n\nx = torch.tensor(2.0, requires_grad=True)  # on veut son gradient\ny = x ** 2 + 3 * x                          # y = x² + 3x\ny.backward()                                # dy/dx = 2x + 3\nprint(x.grad)  # tensor(7.) : 2*2 + 3",
      },
      {
        kind: "text",
        text: "Principe : chaque opération sur un tenseur avec `requires_grad=True` enregistre son passage dans un graphe de calcul. `backward()` parcourt ce graphe à l'envers (règle de dérivation en chaîne) et accumule le gradient dans `.grad` de chaque feuille. C'est ce mécanisme qui rend l'entraînement possible sans dériver quoi que ce soit à la main.",
      },
      {
        kind: "list",
        items: [
          "Les gradients s'accumulent : `backward()` ajoute à `.grad`, il ne remplace pas — d'où `optimizer.zero_grad()` à chaque itération.",
          "En inférence, entourez le code de `with torch.no_grad():` : pas de graphe, moins de mémoire, calculs plus rapides.",
          "Ne jamais modifier `.data` ou utiliser des opérations in-place sur des tenseurs suivis sans comprendre l'effet sur le graphe.",
        ],
      },
    ],
  },
  {
    id: "modules-bases",
    title: "nn.Module : les bases",
    level: 2,
    intro:
      "Le modèle est une classe : `forward` décrit le calcul, PyTorch gère les paramètres.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Un réseau à deux couches",
        code: "import torch\nimport torch.nn as nn\n\nclass MLP(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.fc1 = nn.Linear(784, 128)  # couche 1\n        self.relu = nn.ReLU()          # non-linéarité\n        self.fc2 = nn.Linear(128, 10)  # couche 2 (10 classes)\n\n    def forward(self, x):\n        x = self.relu(self.fc1(x))\n        return self.fc2(x)\n\nmodel = MLP()\nprint(model)  # affiche l'architecture",
      },
      {
        kind: "text",
        text: "Règles : les sous-modules s'assignent comme attributs dans `__init__` (PyTorch les enregistre automatiquement comme paramètres), et `forward` n'utilise que des opérations sur tenseurs. On appelle `model(x)` — jamais `model.forward(x)` directement — car `__call__` déclenche les hooks et la gestion des modes train/eval.",
      },
      {
        kind: "fields",
        title: "Couches à connaître en premier",
        fields: [
          {
            label: "`nn.Linear(in, out)`",
            value: "Couche dense : `y = xW + b`. La brique des MLP et des têtes de classification.",
          },
          {
            label: "`nn.Conv2d`",
            value: "Convolution 2D : la brique des réseaux de vision (images).",
          },
          {
            label: "`nn.ReLU` / `nn.GELU`",
            value: "Fonctions d'activation : introduisent la non-linéarité sans laquelle le réseau resterait linéaire.",
          },
          {
            label: "`nn.Dropout(p)`",
            value: "Régularisation : désactive aléatoirement `p` % des neurones pendant l'entraînement.",
          },
          {
            label: "`nn.Sequential`",
            value: "Empile des couches sans écrire de classe : `nn.Sequential(nn.Linear(...), nn.ReLU(), ...)` pour les architectures linéaires.",
          },
        ],
      },
    ],
  },
  {
    id: "boucle-entrainement",
    title: "La boucle d'entraînement complète",
    level: 2,
    intro:
      "Le motif canonique, avec DataLoader et suivi de la perte : à connaître par cœur.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Boucle standard sur un DataLoader",
        code: "import torch\nimport torch.nn as nn\nfrom torch.utils.data import DataLoader, TensorDataset\n\ndevice = torch.device(\"cuda\" if torch.cuda.is_available() else \"cpu\")\nmodel = MLP().to(device)  # une seule fois : modèle sur le device\n\ndataset = TensorDataset(torch.randn(1000, 784), torch.randint(0, 10, (1000,)))\nloader = DataLoader(dataset, batch_size=64, shuffle=True)\n\noptimizer = torch.optim.Adam(model.parameters(), lr=1e-3)\nloss_fn = nn.CrossEntropyLoss()\n\nmodel.train()  # active dropout & co\nfor epoch in range(5):\n    for xb, yb in loader:\n        xb, yb = xb.to(device), yb.to(device)  # données sur le device\n        pred = model(xb)\n        loss = loss_fn(pred, yb)\n        optimizer.zero_grad()\n        loss.backward()\n        optimizer.step()\n    print(f\"epoch {epoch} — loss {loss.item():.4f}\")",
      },
      {
        kind: "text",
        text: "Trois décisions prises une fois pour toutes, comme le recommande le guide : le `device` choisi au début (`cuda` si disponible sinon `cpu`), le modèle déplacé avec `.to(device)`, et chaque batch déplacé aussi. Mélanger un modèle sur GPU et des données sur CPU est l'erreur la plus fréquente des débuts — et son message d'erreur le dit explicitement.",
      },
    ],
  },
  {
    id: "dataloaders-bases",
    title: "DataLoaders : les bases",
    level: 2,
    intro:
      "Alimenter l'entraînement par lots, sans charger tout le dataset en mémoire.",
    blocks: [
      {
        kind: "text",
        text: "Un `Dataset` décrit comment accéder à un exemple (`__len__`, `__getitem__`) ; un `DataLoader` l'enveloppe pour produire des batchs : mélange (`shuffle=True`), chargement parallèle (`num_workers`), assemblage des batchs. Cette séparation est importante : le dataset ne sait rien des batchs, le DataLoader ne sait rien du contenu.",
      },
      {
        kind: "code",
        language: "python",
        title: "Dataset et DataLoader minimaux",
        code: "from torch.utils.data import Dataset, DataLoader\n\nclass SimpleDataset(Dataset):\n    def __init__(self, xs, ys):\n        self.xs, self.ys = xs, ys\n\n    def __len__(self):\n        return len(self.xs)\n\n    def __getitem__(self, i):\n        return self.xs[i], self.ys[i]\n\nloader = DataLoader(SimpleDataset(x, y), batch_size=32, shuffle=True)\nfor xb, yb in loader:\n    print(xb.shape, yb.shape)  # ([32, ...], [32, ...])",
      },
      {
        kind: "list",
        items: [
          "`shuffle=True` sur le train uniquement : mélanger la validation fausse les métriques comparables entre époques.",
          "`batch_size` : 32 ou 64 pour commencer ; trop grand = mémoire saturée, trop petit = entraînement bruité et lent.",
          "Le dernier batch peut être plus petit : le code (perte, métriques) ne doit jamais supposer une taille fixe.",
        ],
      },
    ],
  },
  {
    id: "environnement-developpement",
    title: "Environnement de développement",
    level: 2,
    intro:
      "Deux façons de travailler avec PyTorch : notebooks pour explorer, scripts pour produire.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Jupyter / notebooks", "Scripts Python"],
        rows: [
          ["Usage", "Exploration : visualiser données, tester des idées, tracer des courbes", "Entraînements reproductibles, longs, lancés en tâche de fond"],
          ["Boucle d'entraînement", "Pratique par cellules, mais l'état caché piège (variables redéfinies)", "Une fonction `train()` claire, relançable à l'identique"],
          ["GPU distant", "Pratique via Jupyter sur serveur", "Indispensable : `nohup` / tmux pour les runs de plusieurs heures"],
          ["Bon réflexe", "Prototyper, puis figer en script dès que ça marche", "Logger pertes et métriques dans un fichier, pas seulement à l'écran"],
        ],
      },
      {
        kind: "text",
        text: "Éditeurs, selon le guide : VS Code avec les extensions « Python » et « Jupyter » (Microsoft), ou PyCharm. Dans les deux cas, sélectionnez l'interpréteur de l'environnement virtuel où PyTorch est installé — la majorité des « `import torch` ne marche pas » viennent d'un mauvais interpréteur.",
      },
    ],
  },
  {
    id: "workflow-professionnel",
    title: "Comment travaillent les professionnels",
    level: 2,
    intro:
      "Le flux typique d'une expérience de deep learning, de l'idée au modèle versionné.",
    blocks: [
      {
        kind: "diagram",
        title: "Cycle de vie d'une expérience",
        lines: [
          "Idée / hypothèse",
          "     ↓",
          "Données → Dataset + DataLoader (reproductible)",
          "     ↓",
          "Baseline simple (petit modèle, peu d'époques)",
          "     ↓",
          "Boucle d'entraînement + checkpoints réguliers",
          "     ↓",
          "Suivi : pertes, métriques, TensorBoard",
          "     ↓",
          "Évaluation sur test (une fois, à la fin)",
          "     ↓",
          "Sauvegarde : state_dict + config + seed",
          "     ↓",
          "Versionnement (Git + DVC ou équivalent pour les données)",
        ],
      },
      {
        kind: "text",
        text: "La règle d'or : toujours commencer par une baseline stupide qui tourne vite. Si la baseline n'apprend rien, le problème vient des données ou du pipeline — pas de l'architecture. Les checkpoints réguliers (`torch.save`) transforment un run de 12 heures qui plante en incident mineur plutôt qu'en catastrophe.",
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro:
      "Quatre projets de difficulté croissante, alignés sur ceux du guide de la compétence.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Réseau de neurones from scratch",
        fields: [
          { label: "Compétences", value: "Tenseurs, nn.Module, boucle d'entraînement, GPU" },
          { label: "À construire", value: "Un MLP qui classifie des chiffres (MNIST via torchvision) sans copier de tutoriel" },
          { label: "Objectif", value: "Écrire la boucle complète de mémoire : forward, perte, backward, step" },
          { label: "Durée", value: "Quelques jours" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Classifieur entraîné sur GPU",
        fields: [
          { label: "Compétences", value: "CNN, DataLoader, augmentation, checkpoints" },
          { label: "À construire", value: "Un réseau convolutif sur CIFAR-10 avec suivi TensorBoard et reprise sur checkpoint" },
          { label: "Objectif", value: "Gérer un vrai dataset : prétraitements, validation, sur-apprentissage" },
          { label: "Durée", value: "Une à deux semaines" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Fine-tuner un modèle",
        fields: [
          { label: "Compétences", value: "Transfer learning, modèles pré-entraînés, évaluation rigoureuse" },
          { label: "À construire", value: "Adapter un ResNet pré-entraîné à un dataset métier, comparer avec et sans fine-tuning" },
          { label: "Objectif", value: "Comprendre quand geler des couches, quels learning rates utiliser, comment évaluer" },
          { label: "Durée", value: "Deux à trois semaines" },
        ],
      },
      {
        kind: "fields",
        title: "Professionnel — Pipeline complet versionné",
        fields: [
          { label: "Compétences", value: "Reproductibilité, experiment tracking, export ONNX, inférence" },
          { label: "À construire", value: "Un projet avec seeds fixées, configs versionnées, export ONNX et script d'inférence" },
          { label: "Objectif", value: "Livrer un modèle ré-entraînable et déployable, pas un notebook" },
          { label: "Durée", value: "Un mois" },
        ],
      },
    ],
  },
  {
    id: "ressources-essentielles",
    title: "Ressources essentielles",
    level: 2,
    intro:
      "Par où continuer, en commençant par la documentation officielle.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          {
            label: "pytorch.org/docs/stable/index.html",
            value: "La référence : chaque fonction documentée avec exemples. Le premier réflexe devant un doute d'API.",
          },
          {
            label: "pytorch.org/tutorials",
            value: "Tutoriels officiels progressifs : du tenseur au déploiement, maintenus par l'équipe PyTorch.",
          },
          {
            label: "pytorch.org/get-started",
            value: "Le sélecteur de commande d'installation selon OS, gestionnaire de paquets et version CUDA.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les quatre projets progressifs de cette page, dans l'ordre.",
          "Vidéos : les cours de deep learning qui utilisent PyTorch comme support (vérifier qu'ils ciblent une version récente).",
          "Communauté : le forum discuss.pytorch.org pour les questions pointues — les mainteneurs y répondent.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "tenseurs-avances",
    title: "Tenseurs : indexation et broadcasting",
    level: 3,
    intro:
      "Manipuler les tenseurs comme un pro : indexation avancée et règles de diffusion.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Indexation et slicing",
        code: "import torch\n\nt = torch.arange(12).reshape(3, 4)\nprint(t[0])        # première ligne : tensor([0, 1, 2, 3])\nprint(t[:, 1])     # deuxième colonne\nprint(t[1:, :2])   # sous-matrice : lignes 1-2, colonnes 0-1\n\nmask = t > 5\nprint(t[mask])     # indexation booléenne : tous les éléments > 5",
      },
      {
        kind: "text",
        text: "Broadcasting : quand deux tenseurs ont des formes compatibles, PyTorch étend virtuellement le plus petit. `(3, 1)` + `(3, 4)` fonctionne : la colonne est répliquée sur les 4 colonnes. Règle : les dimensions sont comparées de droite à gauche, et doivent être égales ou valoir 1. C'est ce mécanisme qui permet d'ajouter un biais `(10,)` à un batch `(64, 10)`.",
      },
      {
        kind: "list",
        items: [
          "Le slicing crée une vue (pas de copie) : modifier la tranche modifie l'original — utiliser `.clone()` pour une copie indépendante.",
          "`.reshape()` préfère une vue, `.view()` l'exige : si les données ne sont pas contiguës, `view` échoue et `reshape` copie.",
          "`.permute(1, 0)` transpose sans copier ; `.transpose(0, 1)` échange deux dimensions.",
        ],
      },
    ],
  },
  {
    id: "autograd-details",
    title: "Autograd en détail",
    level: 3,
    intro:
      "Le graphe de calcul, ses limites et comment le contrôler finement.",
    blocks: [
      {
        kind: "text",
        text: "Le graphe est construit dynamiquement à chaque forward : boucles Python, conditions, tout est rejoué et enregistré. Après `backward()`, le graphe est libéré par défaut — un second `backward()` sur la même perte exige `retain_graph=True`. Les nœuds intermédiaires ne conservent pas leur gradient (seules les feuilles avec `requires_grad=True` le font), sauf appel explicite à `.retain_grad()`.",
      },
      {
        kind: "code",
        language: "python",
        title: "Contrôler le graphe",
        code: "import torch\n\nx = torch.tensor(2.0, requires_grad=True)\n# torch.no_grad() : pas de graphe (inférence)\nwith torch.no_grad():\n    y = x * 2          # y ne suit aucun gradient\n\n# torch.enable_grad() : réactive localement si besoin\n# .detach() : coupe un tenseur du graphe sans changer le mode global\nz = (x ** 2).detach()  # z ne propagera pas de gradient vers x\nprint(z.requires_grad)    # False : z est hors du graphe\n\nw = x ** 2\nw.backward()            # OK : w suit le graphe -> x.grad = 2*x = 4.0",
      },
      {
        kind: "list",
        items: [
          "Opérations in-place (`add_`, `relu_`) sur des tenseurs suivis : PyTorch refuse quand cela corromprait le graphe — préférer les versions hors-place.",
          "`.grad` accumule : oublier `zero_grad()` additionne les gradients de plusieurs batchs (utile volontairement pour l'accumulation, catastrophique par accident).",
          "Pour déboguer un gradient `None` : vérifier `requires_grad`, vérifier que le tenseur est bien une feuille ou a `retain_grad()`.",
        ],
      },
    ],
  },
  {
    id: "fonctions-perte",
    title: "Fonctions de perte",
    level: 3,
    intro:
      "Choisir la bonne perte selon la tâche : le choix le plus sous-estimé du deep learning.",
    blocks: [
      {
        kind: "table",
        headers: ["Perte", "Tâche", "Sortie modèle attendue"],
        rows: [
          ["`nn.MSELoss`", "Régression", "Valeur continue (une sortie par cible)"],
          ["`nn.L1Loss`", "Régression robuste", "Valeur continue ; moins sensible aux outliers que MSE"],
          ["`nn.CrossEntropyLoss`", "Classification multi-classes", "Logits bruts (sans softmax : elle l'applique)"],
          ["`nn.BCEWithLogitsLoss`", "Classification binaire / multi-label", "Logits bruts (sans sigmoïde : elle l'applique)"],
          ["`nn.NLLLoss`", "Classification (variante)", "Log-probabilités (après `LogSoftmax`)"],
          ["`nn.KLDivLoss`", "Distillation, distributions", "Log-probabilités vs distribution cible"],
        ],
      },
      {
        kind: "text",
        text: "Erreurs classiques : appliquer `softmax` avant `CrossEntropyLoss` (double normalisation, gradients faussés — elle attend des logits), ou utiliser `MSELoss` pour de la classification. La perte doit refléter la tâche : c'est elle qui définit ce que « bien prédire » signifie pour l'optimiseur.",
      },
      {
        kind: "code",
        language: "python",
        title: "Classification : le motif correct",
        code: "import torch.nn as nn\n\n# Le modèle sort des logits (pas de softmax final)\nlogits = model(xb)                      # shape (batch, n_classes)\nloss = nn.CrossEntropyLoss()(logits, yb)  # yb : indices de classe (long)\n\n# Binaire : un logit par exemple\nlogit = model_bin(xb)                   # shape (batch, 1)\nloss = nn.BCEWithLogitsLoss()(logit, yb.float())",
      },
    ],
  },
  {
    id: "optimiseurs",
    title: "Optimiseurs",
    level: 3,
    intro:
      "SGD, Adam, AdamW : ce qu'ils font vraiment et quand les choisir.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois optimiseurs à connaître",
        fields: [
          {
            label: "SGD (`torch.optim.SGD`)",
            value:
              "Descente de gradient stochastique, éventuellement avec momentum (`momentum=0.9`). Simple, robuste, souvent le meilleur en vision avec un bon planning de LR. Exige un réglage soigneux du learning rate.",
          },
          {
            label: "Adam (`torch.optim.Adam`)",
            value:
              "Learning rates adaptatifs par paramètre (moments d'ordre 1 et 2). Converge vite, pardonne un LR approximatif. Le choix par défaut raisonnable pour prototyper.",
          },
          {
            label: "AdamW (`torch.optim.AdamW`)",
            value:
              "Adam avec weight decay découplé (la régularisation L2 est appliquée correctement, pas mélangée au gradient adaptatif). Standard actuel pour les transformers et le fine-tuning.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le learning rate compte plus que l'optimiseur : un Adam avec un LR absurde diverge, un SGD bien réglé converge. Point de départ : `1e-3` pour Adam/AdamW, `1e-1` à `1e-2` pour SGD avec momentum — puis ajuster selon les courbes. `weight_decay` (ex. `1e-4`) ajoute une régularisation L2 directement dans l'optimiseur.",
      },
      {
        kind: "code",
        language: "python",
        title: "Déclaration typique",
        code: "import torch\n\noptimizer = torch.optim.AdamW(\n    model.parameters(),\n    lr=3e-4,          # learning rate\n    weight_decay=1e-4 # régularisation L2 découplée\n)",
      },
    ],
  },
  {
    id: "learning-rate-schedules",
    title: "Planning du learning rate",
    level: 3,
    intro:
      "Faire varier le learning rate pendant l'entraînement : un levier gratuit de performance.",
    blocks: [
      {
        kind: "text",
        text: "Idée : un LR élevé explore vite au début, un LR faible affine à la fin. Les schedulers ajustent le LR à chaque époque (ou chaque batch). `StepLR` divise par `gamma` tous les `step_size` époques ; `ReduceLROnPlateau` réduit quand la métrique de validation stagne ; `OneCycleLR` monte puis descend en un cycle (efficace en pratique).",
      },
      {
        kind: "code",
        language: "python",
        title: "Scheduler sur plateau",
        code: "import torch\n\nscheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(\n    optimizer, mode=\"min\", factor=0.5, patience=3\n)\n\nfor epoch in range(epochs):\n    train_one_epoch()\n    val_loss = validate()\n    scheduler.step(val_loss)  # réduit le LR si val_loss stagne\n    print(\"lr:\", optimizer.param_groups[0][\"lr\"])",
      },
      {
        kind: "list",
        items: [
          "Ordre d'appel : `optimizer.step()` puis `scheduler.step()` — l'inverse fausse le planning.",
          "`ReduceLROnPlateau` se pilote sur la perte de validation, pas d'entraînement : c'est la généralisation qui compte.",
          "Le warmup (LR croissant sur les premières époques) stabilise les gros modèles et les gros batchs.",
        ],
      },
    ],
  },
  {
    id: "regularisation",
    title: "Régularisation",
    level: 3,
    intro:
      "Combattre le sur-apprentissage : quand le train est parfait et la validation médiocre.",
    blocks: [
      {
        kind: "fields",
        title: "Techniques par ordre d'essai",
        fields: [
          {
            label: "Plus de données / augmentation",
            value:
              "La meilleure régularisation reste des données variées. L'augmentation (rotations, crops) multiplie artificiellement le dataset.",
          },
          {
            label: "Dropout (`nn.Dropout`)",
            value:
              "Désactive aléatoirement des neurones pendant l'entraînement. N'oubliez pas `model.eval()` en validation : sinon le dropout reste actif et les métriques sont faussées.",
          },
          {
            label: "Weight decay",
            value:
              "Pénalise les gros poids via l'optimiseur (`weight_decay=1e-4`). Simple, presque gratuit, à activer par défaut.",
          },
          {
            label: "Early stopping",
            value:
              "Arrêter quand la perte de validation cesse de s'améliorer (avec `patience` de quelques époques). Sauvegarder le meilleur checkpoint, pas le dernier.",
          },
          {
            label: "Modèle plus petit",
            value:
              "Si le sur-apprentissage persiste malgré tout, le modèle a trop de capacité pour les données : réduire la taille avant d'empiler les astuces.",
          },
        ],
      },
      {
        kind: "text",
        text: "Diagnostic : tracez les deux courbes (train et validation). Écart qui se creuse = sur-apprentissage → régulariser. Les deux stagnent haut = sous-apprentissage → augmenter la capacité ou vérifier les données. Régulariser un modèle qui sous-apprend aggrave le problème.",
      },
    ],
  },
  {
    id: "gestion-appareils",
    title: "Gestion des appareils (CPU/GPU)",
    level: 3,
    intro:
      "Le device, une fois pour toutes : règles, pièges et bonnes habitudes.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Le motif standard",
        code: "import torch\n\ndevice = torch.device(\"cuda\" if torch.cuda.is_available() else \"cpu\")\nprint(\"device:\", device)\n\nmodel = MonModele().to(device)   # paramètres sur le device\nxb = xb.to(device)               # chaque batch aussi\n\n# Revenir sur CPU (ex. pour numpy / matplotlib)\narr = pred.detach().cpu().numpy()",
      },
      {
        kind: "list",
        items: [
          "`.to(device)` sur le modèle déplace aussi ses buffers (ex. les moyennes de BatchNorm) — pas seulement les poids.",
          "Créer un tenseur directement sur GPU : `torch.randn(3, 3, device=device)` évite un transfert.",
          "`.cuda()` / `.cpu()` existent mais `.to(device)` est préférable : le code reste portable CPU/GPU.",
          "En multi-GPU, `torch.cuda.set_device()` ou `CUDA_VISIBLE_DEVICES` contrôle quel GPU est `cuda:0`.",
        ],
      },
    ],
  },
  {
    id: "precision-mixte",
    title: "Précision mixte (AMP)",
    level: 3,
    intro:
      "Entraîner en float16 quand c'est sûr, en float32 quand il le faut : plus vite, moins de mémoire.",
    blocks: [
      {
        kind: "text",
        text: "L'Automatic Mixed Precision utilise `float16` pour les opérations stables (convolutions, matmuls) et garde `float32` pour les réductions et la mise à jour des poids. `torch.amp.autocast` choisit automatiquement ; `GradScaler` multiplie la perte pour éviter que les petits gradients ne deviennent zéro en `float16` (underflow).",
      },
      {
        kind: "code",
        language: "python",
        title: "Boucle avec AMP",
        code: "import torch\n\nscaler = torch.amp.GradScaler(\"cuda\")\n\nfor xb, yb in loader:\n    xb, yb = xb.to(\"cuda\"), yb.to(\"cuda\")\n    optimizer.zero_grad()\n    with torch.amp.autocast(\"cuda\"):\n        pred = model(xb)\n        loss = loss_fn(pred, yb)\n    scaler.scale(loss).backward()  # backward sur la perte mise à l'échelle\n    scaler.step(optimizer)          # step + ajustement de l'échelle\n    scaler.update()",
      },
      {
        kind: "list",
        items: [
          "AMP accélère l'entraînement et réduit la mémoire sur GPU récents — mesurer le gain sur votre propre modèle.",
          "En inférence seule, `autocast` sans scaler suffit : pas de backward, pas de risque d'underflow des gradients.",
          "Si la perte devient NaN avec AMP, premier suspect : une opération instable en float16 — tester sans AMP pour isoler.",
        ],
      },
    ],
  },
  {
    id: "memoire-gpu",
    title: "Mémoire GPU : diagnostiquer et optimiser",
    level: 3,
    intro:
      "« CUDA out of memory » : comprendre d'où vient la mémoire avant de réduire le batch.",
    blocks: [
      {
        kind: "text",
        text: "La mémoire GPU contient : les poids du modèle, les gradients, les états de l'optimiseur (Adam ≈ 2× les poids), et surtout les activations sauvegardées pour le backward (proportionnelles à `batch_size` × profondeur). C'est pourquoi réduire le batch est le premier levier : les activations dominent sur les gros modèles.",
      },
      {
        kind: "fields",
        title: "Leviers par ordre d'essai",
        fields: [
          {
            label: "Réduire le batch",
            value: "Le plus simple. Compenser avec l'accumulation de gradients (plusieurs backward avant un step) pour garder un batch effectif constant.",
          },
          {
            label: "Précision mixte",
            value: "Divise par ~2 la mémoire des activations et des poids (voir section précédente).",
          },
          {
            label: "Accumulation de gradients",
            value: "`loss.backward()` N fois puis un seul `optimizer.step()` : simule un batch N fois plus grand sans la mémoire.",
          },
          {
            label: "Gradient checkpointing",
            value: "`torch.utils.checkpoint` : recalcule les activations au backward au lieu de les stocker — échange mémoire contre calcul.",
          },
          {
            label: "Vider le cache",
            value: "`torch.cuda.empty_cache()` libère la mémoire non utilisée ; `torch.cuda.memory_summary()` montre où elle va. Rarement la vraie solution.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Accumulation de gradients",
        code: "accum_steps = 4\nfor i, (xb, yb) in enumerate(loader):\n    loss = loss_fn(model(xb), yb) / accum_steps  # normaliser !\n    loss.backward()\n    if (i + 1) % accum_steps == 0:\n        optimizer.step()\n        optimizer.zero_grad()\n# Batch effectif = batch_size × accum_steps",
      },
    ],
  },
  {
    id: "datasets-personnalises",
    title: "Datasets personnalisés",
    level: 3,
    intro:
      "Charger ses propres données : le Dataset est l'interface entre vos fichiers et l'entraînement.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Dataset d'images depuis un dossier",
        code: "from torch.utils.data import Dataset\nfrom PIL import Image\nfrom pathlib import Path\n\nclass ImageFolder(Dataset):\n    def __init__(self, root, transform=None):\n        self.paths = sorted(Path(root).rglob(\"*.jpg\"))\n        self.transform = transform\n\n    def __len__(self):\n        return len(self.paths)\n\n    def __getitem__(self, i):\n        img = Image.open(self.paths[i]).convert(\"RGB\")\n        label = 0 if \"chat\" in self.paths[i].name else 1\n        if self.transform:\n            img = self.transform(img)\n        return img, label",
      },
      {
        kind: "text",
        text: "Règles : `__getitem__` doit être rapide et sans effet de bord — il sera appelé des millions de fois, potentiellement en parallèle. Les transformations lourdes (redimensionnement, normalisation) vivent dans `transform`, pas dans le dataset. Préchargez en mémoire uniquement si le dataset tient en RAM ; sinon, lisez depuis le disque à la demande.",
      },
      {
        kind: "list",
        items: [
          "Validez le dataset seul avant l'entraînement : itérez quelques exemples et affichez-les (images, shapes, labels).",
          "Les labels doivent être des entiers `long` pour `CrossEntropyLoss` : convertir explicitement.",
          "Un `__getitem__` qui plante sur un seul fichier corrompu tue tout l'entraînement : filtrer ou gérer les erreurs en amont.",
        ],
      },
    ],
  },
  {
    id: "dataloaders-avances",
    title: "DataLoaders avancés",
    level: 3,
    intro:
      "Ne jamais laisser le GPU attendre les données : parallélisme et pré-chargement.",
    blocks: [
      {
        kind: "fields",
        title: "Options qui comptent",
        fields: [
          {
            label: "`num_workers=N`",
            value:
              "Charge les batchs en parallèle dans N processus. Règle pratique : 2 à 4 par GPU pour commencer ; trop de workers saturent le CPU et la RAM.",
          },
          {
            label: "`pin_memory=True`",
            value:
              "Alloue les batchs en mémoire épinglée : le transfert CPU → GPU devient asynchrone et plus rapide. Utile uniquement avec CUDA.",
          },
          {
            label: "`persistent_workers=True`",
            value:
              "Garde les workers en vie entre les époques : évite le coût de redémarrage à chaque époque (à combiner avec `num_workers > 0`).",
          },
          {
            label: "`collate_fn`",
            value:
              "Fonction d'assemblage personnalisée : indispensable pour les batchs de taille variable (ex. phrases de longueurs différentes → padding).",
          },
          {
            label: "`prefetch_factor`",
            value:
              "Nombre de batchs pré-chargés par worker. Augmenter si le GPU attend malgré des workers actifs.",
          },
        ],
      },
      {
        kind: "text",
        text: "Diagnostic : si l'utilisation GPU (via `nvidia-smi`) oscille entre 0 % et 100 %, le goulot est le chargement des données — augmentez `num_workers` avant de toucher au modèle. Le chargement doit être invisible : le GPU ne devrait jamais attendre.",
      },
    ],
  },
  {
    id: "augmentation-donnees",
    title: "Augmentation de données",
    level: 3,
    intro:
      "Multiplier artificiellement le dataset : la régularisation la plus rentable en vision.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Pipeline torchvision typique",
        code: "from torchvision import transforms\n\ntrain_tf = transforms.Compose([\n    transforms.RandomResizedCrop(224),  # crop aléatoire\n    transforms.RandomHorizontalFlip(),  # miroir aléatoire\n    transforms.ColorJitter(0.2, 0.2, 0.2),  # variations couleur\n    transforms.ToTensor(),\n    transforms.Normalize(mean=[0.485, 0.456, 0.406],\n                         std=[0.229, 0.224, 0.225]),\n])\n\nval_tf = transforms.Compose([\n    transforms.Resize(256),\n    transforms.CenterCrop(224),\n    transforms.ToTensor(),\n    transforms.Normalize(mean=[0.485, 0.456, 0.406],\n                         std=[0.229, 0.224, 0.225]),\n])",
      },
      {
        kind: "text",
        text: "Deux pipelines distincts : l'entraînement augmente (aléatoire), la validation ne fait que redimensionner et normaliser (déterministe). Les moyennes ImageNet ci-dessus sont le standard quand on part d'un modèle pré-entraîné — avec un modèle from scratch, on normalise selon ses propres statistiques. L'augmentation doit préserver le label : un flip vertical sur des chiffres (6 ↔ 9) est une erreur classique.",
      },
    ],
  },
  {
    id: "checkpoints-reprise",
    title: "Checkpoints : sauvegarder et reprendre",
    level: 3,
    intro:
      "Rendre tout entraînement interruptible et reprenable : le `state_dict` et ses compagnons.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Sauvegarde complète et reprise",
        code: "import torch\n\n# Sauvegarde : tout ce qu'il faut pour reprendre à l'identique\ntorch.save({\n    \"epoch\": epoch,\n    \"model\": model.state_dict(),\n    \"optimizer\": optimizer.state_dict(),\n    \"loss\": loss.item(),\n}, \"checkpoint.pt\")\n\n# Reprise\nckpt = torch.load(\"checkpoint.pt\", map_location=\"cpu\", weights_only=True)\nmodel.load_state_dict(ckpt[\"model\"])\noptimizer.load_state_dict(ckpt[\"optimizer\"])\nstart_epoch = ckpt[\"epoch\"] + 1",
      },
      {
        kind: "text",
        text: "On sauvegarde le `state_dict` (les poids), jamais le modèle entier : c'est portable entre versions et entre machines. Pour reprendre vraiment à l'identique, il faut aussi l'état de l'optimiseur (moments d'Adam) et l'époque. `map_location` permet de charger sur CPU un checkpoint entraîné sur GPU. `weights_only=True` limite le chargement aux tenseurs (sécurité contre le code arbitraire des pickles).",
      },
      {
        kind: "list",
        items: [
          "Sauvegarder le meilleur modèle selon la validation (`best.pt`), pas seulement le dernier.",
          "Inclure la config (hyperparamètres) dans le checkpoint ou à côté : un poids sans son contexte est inutilisable.",
          "Nommer avec l'époque et la métrique : `model_ep12_valacc0.87.pt` se retrouve en un coup d'œil.",
        ],
      },
    ],
  },
  {
    id: "reproductibilite",
    title: "Reproductibilité",
    level: 3,
    intro:
      "Fixer l'aléatoire pour que chaque expérience soit rejouable et comparable.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Fixer les seeds",
        code: "import random\nimport numpy as np\nimport torch\n\ndef set_seed(seed=42):\n    random.seed(seed)\n    np.random.seed(seed)\n    torch.manual_seed(seed)\n    torch.cuda.manual_seed_all(seed)\n\nset_seed(42)",
      },
      {
        kind: "text",
        text: "L'aléatoire vient de partout : initialisation des poids, mélange des batchs, dropout, augmentation. Fixer les quatre sources ci-dessus rend un run rejouable sur la même machine. Limite honnête : sur GPU, certaines opérations (ex. `atomicAdd` dans quelques kernels) restent non déterministes — `torch.use_deterministic_algorithms(True)` les interdit, au prix de performances et de compatibilité.",
      },
      {
        kind: "list",
        items: [
          "Noter la seed dans les logs de chaque expérience : « seed 42 » fait partie de la config.",
          "Comparer deux idées avec plusieurs seeds (ex. 3 runs) : une seule seed peut favoriser une méthode par hasard.",
          "Le DataLoader mélange via un générateur : pour une reproductibilité stricte, passer un `generator=torch.Generator().manual_seed(seed)` avec `worker_init_fn`.",
        ],
      },
    ],
  },
  {
    id: "evaluation-metriques",
    title: "Évaluation et métriques",
    level: 3,
    intro:
      "Mesurer ce qui compte : la perte d'entraînement ne dit pas si le modèle est bon.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Boucle d'évaluation propre",
        code: "import torch\n\nmodel.eval()              # désactive dropout & co\ncorrect, total = 0, 0\nwith torch.no_grad():     # pas de graphe : rapide, économe\n    for xb, yb in val_loader:\n        xb, yb = xb.to(device), yb.to(device)\n        pred = model(xb).argmax(dim=1)\n        correct += (pred == yb).sum().item()\n        total += yb.size(0)\nprint(f\"accuracy: {correct / total:.3f}\")\nmodel.train()             # on repasse en mode entraînement",
      },
      {
        kind: "text",
        text: "Trois oublis classiques qui faussent tout : évaluer sans `model.eval()` (dropout actif), sans `torch.no_grad()` (mémoire saturée), ou sur le set d'entraînement (mesure du sur-apprentissage, pas de la qualité). L'accuracy suffit pour commencer ; sur classes déséquilibrées, regardez aussi précision, rappel et F1 par classe via la matrice de confusion.",
      },
      {
        kind: "list",
        items: [
          "Le set de test ne sert qu'une fois, à la toute fin : chaque « jet d'œil » intermédiaire biaise les choix.",
          "Sauvegardez les prédictions, pas seulement les scores : elles permettent d'analyser les erreurs par catégorie.",
          "Une métrique métier (ex. taux de faux positifs tolérable) vaut mieux qu'une accuracy abstraite.",
        ],
      },
    ],
  },
  {
    id: "tensorboard-suivi",
    title: "Suivi avec TensorBoard",
    level: 3,
    intro:
      "Tracer pertes et métriques au fil des époques : l'œil du pilote pendant l'entraînement.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Logger l'essentiel",
        code: "from torch.utils.tensorboard import SummaryWriter\n\nwriter = SummaryWriter(\"runs/experience_1\")\n\nfor epoch in range(epochs):\n    train_loss = train_one_epoch()\n    val_loss, val_acc = validate()\n    writer.add_scalar(\"loss/train\", train_loss, epoch)\n    writer.add_scalar(\"loss/val\", val_loss, epoch)\n    writer.add_scalar(\"accuracy/val\", val_acc, epoch)\n\nwriter.close()\n# Visualiser : tensorboard --logdir runs",
      },
      {
        kind: "command",
        label: "Lancer TensorBoard",
        command: "tensorboard --logdir runs",
        why: "Démarre le serveur local de visualisation (http://localhost:6006) qui affiche les courbes loggées. Comparer les runs côte à côte est le vrai usage : une courbe seule ne dit rien, deux courbes racontent une expérience.",
        verify: "curl -s -o /dev/null -w \"%{http_code}\" http://localhost:6006",
      },
      {
        kind: "list",
        items: [
          "Un dossier par expérience (`runs/exp_lr1e-3`, `runs/exp_dropout05`) : les noms explicites valent de la documentation.",
          "Logger aussi les hyperparamètres (`add_hparams`) pour retrouver ce qui a produit chaque courbe.",
          "Alternative légère : un simple CSV des métriques, traçable avec n'importe quel outil.",
        ],
      },
    ],
  },
  {
    id: "transfer-learning",
    title: "Transfer learning",
    level: 3,
    intro:
      "Partir d'un modèle pré-entraîné plutôt que de zéro : le raccourci le plus rentable.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "ResNet pré-entraîné adapté à 10 classes",
        code: "from torchvision import models\n\nmodel = models.resnet18(weights=models.ResNet18_Weights.IMAGENET1K_V1)\n\n# Geler le backbone : on ne réentraîne que la tête\nfor p in model.parameters():\n    p.requires_grad = False\n\n# Remplacer la tête de classification\nmodel.fc = torch.nn.Linear(model.fc.in_features, 10)",
      },
      {
        kind: "text",
        text: "Principe : les premières couches d'un réseau vision apprennent des détecteurs génériques (bords, textures) réutilisables partout. On gèle le backbone, on remplace la dernière couche, on n'entraîne que la tête — quelques époques suffisent souvent. Si le dataset est grand et différent d'ImageNet, on dégèle ensuite tout le réseau avec un petit learning rate (fine-tuning complet).",
      },
      {
        kind: "list",
        items: [
          "Normaliser les images avec les moyennes ImageNet quand on utilise ces poids : le pré-entraînement les suppose.",
          "Vérifier la licence des poids pré-entraînés avant un usage commercial.",
          "Le transfer learning ne remplace pas des données de qualité : il accélère, il ne fait pas de miracles.",
        ],
      },
    ],
  },
  {
    id: "inference-optimisee",
    title: "Inférence optimisée",
    level: 3,
    intro:
      "Passer du modèle entraîné à des prédictions rapides et économes.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Le motif d'inférence",
        code: "import torch\n\nmodel.eval()                    # mode évaluation (désactive dropout)\nwith torch.no_grad():           # aucun gradient : mémoire minimale\n    with torch.amp.autocast(\"cuda\"):\n        pred = model(batch)     # prédiction en précision mixte\nlabels = pred.argmax(dim=1).cpu()  # retour sur CPU pour l'usage",
      },
      {
        kind: "text",
        text: "En production, on traite par batch (même en « temps réel » : micro-batching), on garde le modèle chargé en mémoire entre les requêtes, et on mesure la latence par percentiles (p50, p95, p99) — la moyenne cache les pics. Pour aller plus loin : TorchScript (`torch.jit.script`) fige le modèle en graphe optimisé, et l'export ONNX (section suivante) ouvre la porte aux runtimes spécialisés.",
      },
      {
        kind: "list",
        items: [
          "Ne jamais réentraîner ou appeler `backward()` dans un service d'inférence : le graphe autograd est un coût inutile.",
          "Charger le modèle une fois au démarrage du service, pas à chaque requête.",
          "Sur CPU serveur, `torch.set_num_threads()` contrôle le parallélisme : trop de threads ralentissent les petits batchs.",
        ],
      },
    ],
  },
  {
    id: "export-onnx",
    title: "Export ONNX",
    level: 3,
    intro:
      "Rendre un modèle portable hors de PyTorch : le format d'échange ONNX.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Exporter vers ONNX",
        code: "import torch\n\ndummy = torch.randn(1, 3, 224, 224)  # exemple d'entrée\ntorch.onnx.export(\n    model.eval(), dummy, \"model.onnx\",\n    input_names=[\"image\"], output_names=[\"logits\"],\n    dynamic_axes={\"image\": {0: \"batch\"}},  # batch de taille variable\n)",
      },
      {
        kind: "command",
        label: "Vérifier le modèle exporté",
        command: "python -c \"import onnx; m=onnx.load('model.onnx'); onnx.checker.check_model(m); print('OK')\"",
        why: "Valide la structure du fichier ONNX avant de l'utiliser : un export corrompu ou incomplet est détecté ici, pas en production. Nécessite le paquet `onnx` (`pip install onnx`).",
        verify: "python -c \"import onnx; print(onnx.__version__)\"",
      },
      {
        kind: "text",
        text: "ONNX décrit le graphe de calcul dans un format standard, exécutable par ONNX Runtime, TensorRT ou CoreML selon la cible. Limites honnêtes : les contrôles de flux Python dynamiques (boucles `for` sur des tenseurs, conditions data-dépendantes) s'exportent mal — un modèle pensé pour l'export reste simple et traçable.",
      },
    ],
  },
  {
    id: "debugging-gradients",
    title: "Déboguer les gradients",
    level: 3,
    intro:
      "Quand l'entraînement ne converge pas : NaN, explosion et disparition des gradients.",
    blocks: [
      {
        kind: "fields",
        title: "Symptômes et causes probables",
        fields: [
          {
            label: "Perte = NaN",
            value:
              "Souvent un learning rate trop élevé, une division par zéro (log(0)), ou des données corrompues (NaN en entrée). Vérifier les données d'abord, réduire le LR ensuite.",
          },
          {
            label: "Perte qui explose",
            value:
              "Gradients explosifs : essayer le gradient clipping (`torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)`), réduire le LR, vérifier la normalisation des entrées.",
          },
          {
            label: "Perte qui ne bouge pas",
            value:
              "Gradients qui disparaissent ou LR trop faible. Vérifier que `loss.backward()` est bien appelé, que l'optimiseur reçoit `model.parameters()`, et tester avec un LR 10× plus grand.",
          },
          {
            label: "Train OK, validation catastrophique",
            value:
              "Sur-apprentissage (voir Régularisation) ou fuite entre train et validation (mêmes exemples des deux côtés).",
          },
          {
            label: "Gradients à None",
            value:
              "Le tenseur n'est pas dans le graphe : `requires_grad=False`, opération sous `no_grad()`, ou paramètre oublié dans l'optimiseur.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Garde-fous dans la boucle",
        code: "import torch\n\ntorch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)\n\n# Détecter les NaN tôt plutôt que de les propager\nif torch.isnan(loss):\n    raise RuntimeError(f\"NaN détecté à l'époque {epoch}\")",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Le bestiaire des erreurs PyTorch : les reconnaître en un coup d'œil.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "`zero_grad()` oublié",
            value:
              "Les gradients s'accumulent d'un batch à l'autre : la perte oscille ou diverge. Symptôme typique d'un code recopié à moitié.",
          },
          {
            label: "Mélange CPU / CUDA",
            value:
              "`Expected all tensors to be on the same device` : le modèle est sur GPU, un batch est resté sur CPU. Déplacer systématiquement les deux.",
          },
          {
            label: "`model.train()` oublié après évaluation",
            value:
              "Après `model.eval()` pour la validation, repasser en `model.train()` : sinon dropout et BatchNorm restent en mode inférence pendant l'entraînement.",
          },
          {
            label: "Softmax avant CrossEntropyLoss",
            value:
              "Double normalisation : la perte attend des logits bruts. Retirer le softmax final du modèle.",
          },
          {
            label: "Mauvaise forme de cible",
            value:
              "`CrossEntropyLoss` veut des indices `(N,)` en `long`, pas du one-hot ; `MSELoss` veut la même forme que la sortie. Lire le message d'erreur : il donne les shapes.",
          },
          {
            label: "Ne pas détacher en inférence",
            value:
              "Évaluer sans `torch.no_grad()` : le graphe s'accumule en mémoire jusqu'au OOM. Toujours `no_grad()` hors entraînement.",
          },
          {
            label: "`shuffle=False` sur le train",
            value:
              "L'ordre fixe des données biaise l'entraînement (le modèle apprend l'ordre). Mélanger le train, jamais la validation.",
          },
        ],
      },
    ],
  },
  {
    id: "entrainement-distribue",
    title: "Entraînement distribué (DDP)",
    level: 3,
    intro:
      "Répartir l'entraînement sur plusieurs GPU : le principe de DistributedDataParallel.",
    blocks: [
      {
        kind: "text",
        text: "Principe du data-parallel : chaque GPU possède une copie du modèle, traite un shard du batch, puis les gradients sont moyennés entre GPU avant la mise à jour. `DistributedDataParallel` (DDP) synchronise les gradients automatiquement pendant le `backward()`. C'est le standard actuel — l'ancien `DataParallel` (un seul processus, parallélisme par threads) est déconseillé car limité par le GIL.",
      },
      {
        kind: "code",
        language: "python",
        title: "Envelopper un modèle en DDP",
        code: "import torch.distributed as dist\nfrom torch.nn.parallel import DistributedDataParallel as DDP\n\ndist.init_process_group(backend=\"nccl\")  # communication GPU\nmodel = MonModele().to(local_rank)\nmodel = DDP(model, device_ids=[local_rank])\n# Le reste (boucle, optimizer) est inchangé :\n# les gradients sont synchronisés automatiquement.",
      },
      {
        kind: "list",
        items: [
          "Le batch size par GPU reste le même : le batch effectif est multiplié par le nombre de GPU — ajuster le LR en conséquence.",
          "Chaque processus doit voir des données différentes : `DistributedSampler` répartit le dataset.",
          "Lancement multi-GPU : `torchrun --nproc_per_node=4 train.py` (le lanceur officiel).",
        ],
      },
    ],
  },
  {
    id: "profiling",
    title: "Profiler un entraînement",
    level: 3,
    intro:
      "Mesurer où va le temps avant d'optimiser : `torch.profiler`.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Profiler une époque",
        code: "import torch\n\nwith torch.profiler.profile(\n    activities=[torch.profiler.ProfilerActivity.CPU,\n                torch.profiler.ProfilerActivity.CUDA],\n    record_shapes=True,\n) as prof:\n    train_one_epoch()\n\nprint(prof.key_averages().table(sort_by=\"cuda_time_total\", row_limit=10))",
      },
      {
        kind: "text",
        text: "Le tableau montre, par opérateur, le temps CPU et CUDA : on y repère les copies mémoire inutiles, les kernels minuscules appelés des milliers de fois, ou le DataLoader qui affame le GPU. Règle : ne jamais optimiser sans profiler — l'intuition se trompe systématiquement sur les goulots d'étranglement.",
      },
      {
        kind: "list",
        items: [
          "Profiler sur quelques batchs seulement : le profiling ralentit l'exécution et produit des traces volumineuses.",
          "La trace se visualise aussi dans TensorBoard (onglet Profiler) ou Perfetto pour une vue temporelle.",
          "`torch.cuda.synchronize()` avant chaque mesure manuelle : les appels CUDA sont asynchrones, sans synchro les timings mentent.",
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro:
      "Les habitudes qui séparent un notebook qui marche d'un projet qui dure.",
    blocks: [
      {
        kind: "list",
        items: [
          "Séparer données / modèle / entraînement / évaluation en modules : un seul fichier géant devient inmaintenable dès le deuxième modèle.",
          "Mettre les hyperparamètres dans une config (fichier ou dataclass), jamais en dur dans le code : chaque expérience doit être relançable à l'identique.",
          "Logger systématiquement : pertes, métriques, hyperparamètres, seed, version du code (hash Git).",
          "Valider le pipeline de données avant le modèle : afficher des batchs réels, vérifier shapes et labels.",
          "Commencer petit : sur-apprendre volontairement un mini-batch (quelques exemples) pour vérifier que le modèle peut mémoriser — si même ça échoue, le bug est dans le code.",
          "Versionner le code (Git) et tracer les données : un modèle sans son dataset d'entraînement n'est pas reproductible.",
          "Écrire une fonction d'évaluation indépendante de l'entraînement : elle servira en validation, en test et en production.",
        ],
      },
    ],
  },
  {
    id: "checklist-mise-en-production",
    title: "Checklist de mise en production",
    level: 3,
    intro:
      "Avant de déployer un modèle : les vérifications qui évitent les incidents.",
    blocks: [
      {
        kind: "fields",
        title: "À valider",
        fields: [
          {
            label: "Évaluation finale",
            value: "Métriques sur le set de test tenu à l'écart, avec la métrique métier — pas seulement la perte.",
          },
          {
            label: "Reproductibilité",
            value: "Réentraînement possible : seed, config, code versionné, dataset identifié.",
          },
          {
            label: "Format de déploiement",
            value: "state_dict, TorchScript ou ONNX selon la cible ; tester le format exporté, pas seulement le modèle PyTorch.",
          },
          {
            label: "Latence et débit",
            value: "Mesurés en p50/p95/p99 sur du matériel représentatif, avec le batch size de production.",
          },
          {
            label: "Robustesse",
            value: "Comportement sur entrées aberrantes (image vide, texte vide) : pas de crash, une erreur propre.",
          },
          {
            label: "Monitoring",
            value: "Logger les prédictions et la distribution des entrées : détecter la dérive des données en production.",
          },
          {
            label: "Rollback",
            value: "Garder le modèle précédent déployable : un nouveau modèle peut régresser sur des cas non couverts.",
          },
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "PyTorch maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "`transformers` : utiliser et fine-tuner les modèles Hugging Face (LLM, vision, audio) construits sur PyTorch.",
          "`deep-learning` : architectures avancées (transformers, diffusion, GANs) et théorie de l'entraînement.",
          "`computer-vision` : détection, segmentation et suivi d'objets avec l'écosystème torchvision.",
          "`nlp` : traitement du langage, tokenisation et modèles de séquence.",
          "`mlops` : déploiement, serving, monitoring et versioning des modèles en production.",
          "`llms` : prompting, évaluation et systèmes autour des grands modèles de langage.",
          "Revenir à la roadmap : valider PyTorch et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
  {
    id: "ressources-avancees",
    title: "Ressources avancées",
    level: 3,
    intro:
      "Aller plus loin, en commençant toujours par la documentation officielle.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          {
            label: "pytorch.org/docs/stable/index.html",
            value: "Référence complète : autograd, nn, optim, distributed, profiler — avec notes de performance.",
          },
          {
            label: "pytorch.org/tutorials/beginner/basics/intro.html",
            value: "Le parcours « Learn the Basics » officiel : la fondation à relire après la pratique.",
          },
          {
            label: "pytorch.org/docs/stable/notes",
            value: "Les notes de conception (autograd, AMP, DDP) : comprendre le pourquoi des API.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les quatre projets progressifs de cette page, dans l'ordre.",
          "Lecture : les papiers fondateurs (ResNet, Adam, BatchNorm) — PyTorch permet de les réimplémenter en quelques dizaines de lignes.",
          "Communauté : discuss.pytorch.org et le dépôt GitHub pytorch/pytorch pour suivre les évolutions.",
        ],
      },
    ],
  },
];

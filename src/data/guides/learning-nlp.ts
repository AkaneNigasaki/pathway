import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du NLP (traitement du langage naturel) : des tokens
 * aux systèmes linguistiques modernes. 3 niveaux d'information (Aperçu /
 * Pratique / Approfondi) avec divulgation progressive. Tous les textes
 * supportent le code inline entre backticks.
 */
export const LEARNING_NLP: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est le NLP, ce qu'il permet de construire et pourquoi il est devenu central.",
    blocks: [
      {
        kind: "text",
        text: "Le NLP (Natural Language Processing, traitement du langage naturel) donne aux machines la capacité de comprendre et de générer du texte : analyser des avis clients, résumer des documents, répondre à des questions, traduire, détecter des intentions. C'est le domaine derrière les chatbots, la recherche sémantique et les assistants d'écriture.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est devenu central : l'arrivée des Transformers puis des grands modèles de langage (LLM) a fait passer le NLP du statut de spécialité académique à celui de technologie grand public. Mais sous les démos impressionnantes, les fondamentaux n'ont pas changé : découper le texte en unités (tokens), le représenter en vecteurs (embeddings), et modéliser les relations entre les mots. Comprendre ces briques permet de passer d'une utilisation naïve d'une API à la construction de systèmes linguistiques maîtrisés.",
      },
    ],
  },
  {
    id: "du-texte-a-la-prediction",
    title: "Du texte à la prédiction",
    level: 1,
    intro:
      "Le pipeline conceptuel que tout système NLP moderne suit, du texte brut à la sortie.",
    blocks: [
      {
        kind: "diagram",
        title: "Le pipeline NLP",
        lines: [
          "Texte brut",
          "     │",
          "     ▼",
          "Tokens (découpage en unités)",
          "     │",
          "     ▼",
          "Embeddings (vecteurs de sens)",
          "     │",
          "     ▼",
          "Attention (contexte entre les mots)",
          "     │",
          "     ▼",
          "Modèle (Transformer)",
          "     │",
          "     ▼",
          "Sortie (classe, résumé, réponse…)",
        ],
      },
      {
        kind: "text",
        text: "Chaque étape transforme la représentation : le texte devient des tokens (morceaux de mots), les tokens deviennent des vecteurs numériques, le mécanisme d'attention enrichit chaque vecteur avec son contexte, et le modèle produit la sortie demandée. Retenir ce pipeline, c'est avoir la carte du territoire : tout le reste de cette page en est le détail.",
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
      "Ce qu'il faut maîtriser avant le NLP moderne, et pourquoi.",
    blocks: [
      {
        kind: "fields",
        title: "Les fondations nécessaires",
        fields: [
          {
            label: "Python",
            value:
              "L'écosystème NLP (Hugging Face, PyTorch) s'utilise en Python : manipuler des listes, des dictionnaires et des tableaux NumPy est le quotidien.",
          },
          {
            label: "Deep learning",
            value:
              "Comprendre l'entraînement d'un réseau de neurones (descente de gradient, overfitting) : le NLP moderne est du deep learning appliqué au texte, avec les Transformers comme architecture dominante.",
          },
          {
            label: "Statistiques",
            value:
              "Lire une matrice de confusion, comprendre précision et rappel : l'évaluation d'un modèle NLP est statistique avant tout.",
          },
        ],
      },
      {
        kind: "text",
        text: "Pas besoin d'être chercheur en linguistique : le NLP moderne est d'abord de l'ingénierie de modèles. En revanche, sans les bases du deep learning, le fine-tuning reste de la magie noire.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Installer l'écosystème Hugging Face et PyTorch pour expérimenter.",
    blocks: [
      {
        kind: "command",
        label: "Installer les bibliothèques NLP",
        command: "pip install transformers datasets evaluate torch",
        why: "`transformers` donne accès aux modèles pré-entraînés et aux tokenizers, `datasets` au chargement des jeux de données, `evaluate` aux métriques, et `torch` (PyTorch) est le moteur de calcul sous-jacent. Ce sont les quatre briques de tout projet NLP moderne.",
        verify: "python -c \"import transformers; print(transformers.__version__)\"",
      },
      {
        kind: "command",
        label: "Vérifier l'accès GPU (optionnel)",
        command: "python -c \"import torch; print(torch.cuda.is_available())\"",
        why: "L'entraînement et l'inférence des Transformers sont massivement plus rapides sur GPU. Si cette commande répond `False`, tout fonctionne quand même — mais lentement. Pour débuter (inférence de petits modèles), le CPU suffit.",
      },
      {
        kind: "text",
        text: "Premier lancement : le téléchargement d'un modèle depuis le Hub Hugging Face peut peser plusieurs centaines de Mo — prévoyez de l'espace disque et une connexion correcte. Les modèles sont mis en cache localement dans `~/.cache/huggingface`.",
      },
    ],
  },
  {
    id: "premier-pipeline",
    title: "Premier pipeline",
    level: 2,
    intro:
      "Classifier un texte en trois lignes avec un modèle pré-entraîné.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Analyse de sentiments",
        code: "from transformers import pipeline\n\nclassifier = pipeline(\"sentiment-analysis\")\nresult = classifier(\"J'adore ce produit, il est fantastique !\")\nprint(result)\n# [{'label': 'POSITIVE', 'score': 0.99...}]",
      },
      {
        kind: "text",
        text: "Un `pipeline` Hugging Face encapsule tout : téléchargement du modèle, tokenizer adapté, prétraitement, inférence et post-traitement. C'est la porte d'entrée idéale — mais aussi un piège confortable : en production, on démonte le pipeline pour contrôler chaque étape (tokenizer, batch, device).",
      },
      {
        kind: "code",
        language: "python",
        title: "Autres pipelines prêts à l'emploi",
        code: "from transformers import pipeline\n\nner = pipeline(\"ner\", grouped_entities=True)\nqa = pipeline(\"question-answering\")\nsummary = pipeline(\"summarization\")\n\nprint(ner(\"Paris est la capitale de la France.\"))\nprint(qa(question=\"Où est Paris ?\",\n           context=\"Paris est la capitale de la France.\"))",
      },
    ],
  },
  {
    id: "tokenisation-pratique",
    title: "Tokenisation en pratique",
    level: 2,
    intro:
      "Voir concrètement comment un texte devient des tokens puis des identifiants.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Observer le découpage",
        code: "from transformers import AutoTokenizer\n\ntok = AutoTokenizer.from_pretrained(\"bert-base-uncased\")\ntokens = tok.tokenize(\"I love natural language processing!\")\nprint(tokens)\nids = tok(\"I love natural language processing!\")\nprint(ids[\"input_ids\"])",
      },
      {
        kind: "text",
        text: "Remarquez les tokens comme `##ing` ou `##s` : le découpage est en sous-mots (subwords), pas en mots entiers. Les mots rares sont découpés en morceaux connus, ce qui permet au modèle de traiter n'importe quel texte avec un vocabulaire limité (~30 000 tokens). Chaque modèle a son propre tokenizer : utiliser le mauvais tokenizer avec un modèle donne des résultats absurdes.",
      },
      {
        kind: "list",
        items: [
          "Un token n'est pas un mot : c'est une unité de sous-mot du vocabulaire du modèle.",
          "Chaque modèle exige son tokenizer apparié (`AutoTokenizer.from_pretrained` avec le même nom).",
          "Le tokenizer ajoute des tokens spéciaux (`[CLS]`, `[SEP]` pour BERT) qui structurent l'entrée.",
          "Le nombre de tokens — pas de mots — détermine le coût et la limite de contexte.",
        ],
      },
    ],
  },
  {
    id: "environnement-materiel",
    title: "Environnement matériel",
    level: 2,
    intro:
      "CPU, GPU, mémoire : ce qu'il faut pour expérimenter sans se battre avec la machine.",
    blocks: [
      {
        kind: "fields",
        title: "Les réalités matérielles",
        fields: [
          { label: "Inférence de petits modèles", value: "BERT et ses cousins (~110M paramètres) tournent correctement sur CPU pour des tests. Un GPU rend l'expérience fluide mais n'est pas obligatoire pour débuter." },
          { label: "Fine-tuning", value: "Entraîner même un petit modèle demande un GPU avec suffisamment de mémoire (8 Go minimum pour BERT en pratique). Sans GPU, limitez-vous à de tout petits jeux de données ou utilisez les notebooks cloud gratuits." },
          { label: "Grands modèles (LLM)", value: "L'inférence d'un modèle de plusieurs milliards de paramètres exige beaucoup de VRAM ou des techniques de quantification. C'est un sujet de la section Approfondi." },
          { label: "Espace disque", value: "Chaque modèle téléchargé pèse de quelques centaines de Mo à plusieurs Go, stockés dans `~/.cache/huggingface`. Nettoyez régulièrement avec `huggingface-cli` si l'espace manque." },
        ],
      },
    ],
  },
  {
    id: "datasets",
    title: "Jeux de données",
    level: 2,
    intro:
      "Charger et explorer un dataset avec la bibliothèque `datasets`.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Charger un dataset",
        code: "from datasets import load_dataset\n\nds = load_dataset(\"imdb\")\nprint(ds[\"train\"][0])\nprint(ds[\"train\"].features)",
      },
      {
        kind: "text",
        text: "`load_dataset` télécharge le jeu de données (ici des critiques de films étiquetées positif/négatif) et le met en cache. Avant tout entraînement, explorez : distribution des classes, longueur des textes, exemples aberrants. Un modèle entraîné sur des données sales apprend la saleté — l'exploration n'est pas une option.",
      },
      {
        kind: "list",
        items: [
          "Vérifiez toujours l'équilibre des classes : un dataset à 95 % positif donne un modèle qui prédit « positif » partout.",
          "Regardez la longueur des textes : au-delà de la limite du modèle (512 tokens pour BERT), le texte est tronqué.",
          "Séparez train/validation/test dès le début : évaluer sur les données d'entraînement ne prouve rien.",
        ],
      },
    ],
  },
  {
    id: "embeddings-premier-regard",
    title: "Embeddings : premier regard",
    level: 2,
    intro:
      "Comprendre l'idée des vecteurs de sens avec une expérience simple.",
    blocks: [
      {
        kind: "text",
        text: "Un embedding représente un mot (ou un token) par un vecteur de nombres — typiquement quelques centaines de dimensions. L'idée clé : dans cet espace, la proximité reflète la similarité de sens. « Roi » est proche de « reine », loin de « banane ». Ces vecteurs ne sont pas écrits à la main : ils sont appris par le modèle pendant son entraînement, en observant quels mots apparaissent dans quels contextes.",
      },
      {
        kind: "code",
        language: "python",
        title: "Extraire des embeddings",
        code: "from transformers import AutoTokenizer, AutoModel\nimport torch\n\ntok = AutoTokenizer.from_pretrained(\"bert-base-uncased\")\nmodel = AutoModel.from_pretrained(\"bert-base-uncased\")\n\ninputs = tok(\"Le chat dort sur le tapis.\", return_tensors=\"pt\")\nwith torch.no_grad():\n    out = model(**inputs)\nprint(out.last_hidden_state.shape)  # (1, nb_tokens, 768)",
      },
      {
        kind: "text",
        text: "Chaque token reçoit un vecteur de 768 nombres (pour BERT base) qui dépend de tout son contexte : le vecteur de « chat » ici n'est pas le même que dans « le chat discute ». C'est la différence entre les embeddings contextuels (Transformers) et les anciens embeddings statiques (un vecteur fixe par mot).",
      },
    ],
  },
  {
    id: "fine-tuning-guide",
    title: "Fine-tuning guidé",
    level: 2,
    intro:
      "Adapter un modèle pré-entraîné à vos propres données, étape par étape.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir un modèle de base adapté",
            detail:
              "Partez d'un modèle pré-entraîné proche de votre langue et de votre tâche (ex. un BERT multilingue pour du français). Inutile de repartir de zéro : le pré-entraînement a déjà appris la langue.",
          },
          {
            title: "Préparer les données étiquetées",
            detail:
              "Quelques centaines à quelques milliers d'exemples étiquetés suffisent pour une classification simple. Qualité avant quantité : des étiquettes incohérentes produisent un modèle incohérent.",
          },
          {
            title: "Tokeniser le dataset",
            detail:
              "Appliquez le tokenizer du modèle à tous les textes (`dataset.map`), avec troncation à la longueur maximale. Vérifiez quelques exemples tokenisés à la main.",
          },
          {
            title: "Entraîner avec le Trainer",
            detail:
              "Le `Trainer` Hugging Face gère la boucle d'entraînement : quelques époques (2 à 4), un taux d'apprentissage faible (2e-5 typiquement pour ne pas « casser » le pré-entraînement).",
          },
          {
            title: "Évaluer sur des données jamais vues",
            detail:
              "Mesurez précision, rappel et F1 sur le jeu de test. Comparez avec une baseline simple (ex. toujours prédire la classe majoritaire) pour savoir si le modèle apporte vraiment quelque chose.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le fine-tuning n'est pas magique : c'est un entraînement supervisé classique, simplement initialisé avec des poids déjà intelligents. Si les résultats stagnent, le problème est presque toujours dans les données (étiquettes, distribution, fuite entre train et test), pas dans les hyperparamètres.",
      },
    ],
  },
  {
    id: "evaluation",
    title: "Évaluation",
    level: 2,
    intro:
      "Mesurer ce que vaut vraiment un modèle : les métriques de base.",
    blocks: [
      {
        kind: "fields",
        title: "Les métriques essentielles",
        fields: [
          { label: "Accuracy (exactitude)", value: "Proportion de bonnes prédictions. Trompeuse sur données déséquilibrées : 95 % d'accuracy sur un dataset à 95 % positif ne veut rien dire." },
          { label: "Précision", value: "Parmi les exemples prédits positifs, combien le sont vraiment. Critique quand les faux positifs coûtent cher (ex. modération abusive)." },
          { label: "Rappel (recall)", value: "Parmi les vrais positifs, combien sont détectés. Critique quand les faux négatifs coûtent cher (ex. détection de fraude)." },
          { label: "F1", value: "Moyenne harmonique de précision et rappel : le compromis standard pour comparer deux modèles." },
          { label: "Matrice de confusion", value: "Le tableau qui montre où le modèle se trompe, classe par classe. Toujours la regarder avant de conclure." },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Calculer les métriques",
        code: "import evaluate\n\nmetric = evaluate.load(\"f1\")\nmetric.add_batch(predictions=[1, 0, 1], references=[1, 0, 0])\nprint(metric.compute(average=\"binary\"))",
      },
    ],
  },
  {
    id: "workflow-professionnel",
    title: "Workflow professionnel",
    level: 2,
    intro:
      "Travailler comme en production : reproductibilité et traçabilité des expériences.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Versionner données et code",
            detail:
              "Le code dans Git, les datasets avec un identifiant de version (hash, date, ou outil dédié). Une expérience non reproductible est une expérience perdue.",
          },
          {
            title: "Fixer les graines aléatoires",
            detail:
              "Graines Python, NumPy et PyTorch fixées pour que deux entraînements identiques donnent des résultats identiques.",
          },
          {
            title: "Tracer chaque expérience",
            detail:
              "Hyperparamètres, métriques, courbes de loss : journalisés dans un outil de suivi (MLflow, Weights & Biases) ou au minimum dans un fichier structuré.",
          },
          {
            title: "Évaluer sur un jeu tenu à l'écart",
            detail:
              "Le jeu de test n'est consulté qu'à la fin, une fois les choix figés. L'utiliser pour régler les hyperparamètres, c'est tricher contre soi-même.",
          },
        ],
      },
    ],
  },
  {
    id: "pieges-courants",
    title: "Pièges courants",
    level: 2,
    intro:
      "Les erreurs que presque tous les débutants commettent — et comment les éviter.",
    blocks: [
      {
        kind: "list",
        items: [
          "Mauvais tokenizer : utiliser le tokenizer d'un autre modèle. Symptôme : résultats absurdes malgré un entraînement qui semble converger.",
          "Fuite de données (data leakage) : des exemples du test présents dans le train, ou une information du futur dans les features. Symptôme : 99 % en test, catastrophe en production.",
          "Troncation silencieuse : des textes plus longs que la limite du modèle, coupés sans prévenir. Symptôme : le modèle ignore la fin des documents.",
          "Baseline oubliée : ne jamais comparer à une règle simple. Un modèle à 80 % d'accuracy est inutile si « toujours prédire la classe majoritaire » fait 82 %.",
          "Métrique inadaptée : optimiser l'accuracy sur un problème où le rappel compte. La métrique doit refléter le coût réel des erreurs.",
          "Surévaluation sur le test : régler les hyperparamètres en regardant le test set, encore et encore, jusqu'à le sur-ajuster.",
        ],
      },
    ],
  },
  {
    id: "editeurs",
    title: "Éditeurs et notebooks",
    level: 2,
    intro:
      "L'environnement de travail typique pour expérimenter en NLP.",
    blocks: [
      {
        kind: "fields",
        title: "Les options",
        fields: [
          {
            label: "Jupyter / JupyterLab",
            value: "L'outil standard d'expérimentation : exécution cellule par cellule, visualisation inline, idéal pour explorer données et modèles.",
          },
          {
            label: "VS Code + extensions Python et Jupyter",
            value: "Les extensions officielles « Python » et « Jupyter » (Microsoft) : notebooks, débogueur et terminal dans le même éditeur.",
          },
          {
            label: "Notebooks cloud",
            value: "Pour accéder à un GPU gratuit : exécuter le fine-tuning dans le cloud, développer en local. Pensez à sauvegarder modèles et données hors de la session éphémère.",
          },
        ],
      },
    ],
  },
  {
    id: "premier-projet",
    title: "Projet : classifieur de sentiments",
    level: 2,
    intro:
      "Le projet canonique : classifier des avis clients en positif/négatif.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir les données",
            detail:
              "Un dataset d'avis étiquetés (ou vos propres avis annotés à la main — 500 exemples bien étiquetés valent mieux que 10 000 douteux).",
          },
          {
            title: "Explorer",
            detail:
              "Distribution des classes, longueur des textes, exemples limites (sarcasme, avis mitigés). Notez les cas ambigus : ils définiront vos erreurs.",
          },
          {
            title: "Baseline",
            detail:
              "D'abord un pipeline zero-shot ou une règle simple, pour avoir un point de comparaison chiffré.",
          },
          {
            title: "Fine-tuner",
            detail:
              "Modèle pré-entraîné + `Trainer`, 3 époques, évaluation sur le jeu de test avec précision/rappel/F1 et matrice de confusion.",
          },
          {
            title: "Analyser les erreurs",
            detail:
              "Lisez 50 exemples mal classés à la main. C'est là que se trouvent les vraies pistes d'amélioration (données, pas hyperparamètres).",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "tokenizers-detail",
    title: "Tokenizers en détail",
    level: 3,
    intro:
      "BPE, WordPiece, SentencePiece : comment les vocabulaires de sous-mots sont construits.",
    blocks: [
      {
        kind: "text",
        text: "Les trois algorithmes dominants construisent un vocabulaire de sous-mots en fusionnant itérativement les paires de symboles les plus fréquentes dans un corpus d'entraînement. Résultat : les mots fréquents restent entiers (« le », « de »), les mots rares sont découpés (« token » + « ##isation »). Chaque modèle fige son vocabulaire au pré-entraînement — on ne peut pas le changer au fine-tuning.",
      },
      {
        kind: "fields",
        title: "Les trois familles",
        fields: [
          { label: "BPE (Byte-Pair Encoding)", value: "Utilisé par GPT et RoBERTa. Fusionne les paires les plus fréquentes ; version « byte-level » qui ne produit jamais de token inconnu." },
          { label: "WordPiece", value: "Utilisé par BERT. Proche de BPE mais choisit les fusions qui maximisent la vraisemblance du corpus, pas la simple fréquence." },
          { label: "SentencePiece", value: "Utilisé par T5, LLaMA. Traite le texte comme une séquence brute (espaces inclus comme caractère spécial) : indépendant de la langue, adapté au multilingue." },
        ],
      },
      {
        kind: "text",
        text: "Conséquence pratique : le même texte donne un nombre de tokens différent selon le tokenizer — donc un coût différent et une utilisation différente de la fenêtre de contexte. Pour les langues peu représentées au pré-entraînement, la tokenisation est moins efficace (plus de tokens par mot) : c'est une des raisons pour lesquelles les modèles sont moins bons — et plus chers — sur ces langues.",
      },
    ],
  },
  {
    id: "embeddings-detail",
    title: "Embeddings en détail",
    level: 3,
    intro:
      "Des vecteurs statiques aux représentations contextuelles.",
    blocks: [
      {
        kind: "text",
        text: "Avant les Transformers, les embeddings étaient statiques : un vecteur fixe par mot (Word2Vec, GloVe, FastText), appris en prédisant les voisins d'un mot. Limite fondamentale : « avocat » (fruit ou métier) avait un seul vecteur, mélange des deux sens. Les modèles contextuels (ELMo, puis BERT et suivants) produisent un vecteur différent par occurrence, calculé à partir de toute la phrase : le sens est désambiguïsé par le contexte.",
      },
      {
        kind: "list",
        items: [
          "Embeddings statiques : rapides, légers, un vecteur par mot — encore utiles pour la recherche simple et les systèmes contraints.",
          "Embeddings contextuels : un vecteur par token occurrence, sensible au contexte — la base de tout le NLP moderne.",
          "Embeddings de phrases : des modèles spécialisés produisent un vecteur par phrase ou document, optimisé pour la similarité — la brique de la recherche sémantique.",
          "La dimension (768, 1024…) est un compromis capacité/coût fixé à l'architecture du modèle.",
        ],
      },
    ],
  },
  {
    id: "attention-mecanisme",
    title: "Le mécanisme d'attention",
    level: 3,
    intro:
      "L'idée au cœur des Transformers : chaque mot choisit à quoi faire attention.",
    blocks: [
      {
        kind: "text",
        text: "Pour chaque token, l'attention calcule un score de pertinence avec tous les autres tokens de la séquence, puis construit une moyenne pondérée de leurs représentations. Dans « Le chat ne voulait pas manger car il n'avait pas faim », le modèle apprend que « il » se réfère à « chat » : le vecteur de « il » est enrichi avec celui de « chat ». C'est cette mise en relation à longue distance, calculée en parallèle sur toute la séquence, qui a rendu les Transformers supérieurs aux réseaux récurrents.",
      },
      {
        kind: "diagram",
        title: "Attention simplifiée",
        lines: [
          "Token « il » (requête)",
          "   │  score avec chaque token",
          "   ├── « chat » : 0.7  ◄── forte attention",
          "   ├── « manger » : 0.2",
          "   └── « car » : 0.1",
          "   ▼",
          "Vecteur de « il » enrichi du sens de « chat »",
        ],
      },
      {
        kind: "text",
        text: "La multi-tête (multi-head) applique ce mécanisme plusieurs fois en parallèle avec des projections différentes : chaque « tête » capture un type de relation différent (syntaxe, coréférence, position). Le coût est quadratique en longueur de séquence — d'où les limites de contexte et tout un champ de recherche pour les étendre.",
      },
    ],
  },
  {
    id: "architecture-transformer",
    title: "Architecture Transformer",
    level: 3,
    intro:
      "Encodeurs, décodeurs et les trois grandes familles de modèles.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois familles",
        fields: [
          { label: "Encodeurs (BERT, RoBERTa)", value: "Lis la séquence dans les deux sens, produit une représentation par token. Idéal pour la compréhension : classification, NER, question-réponse extractive. Ne génère pas de texte." },
          { label: "Décodeurs (GPT, LLaMA)", value: "Génère le texte token par token, de gauche à droite. Idéal pour la génération : chatbots, rédaction, complétion. C'est la famille des LLM." },
          { label: "Encodeur-décodeur (T5, BART)", value: "Encode l'entrée puis décode la sortie : le format naturel de la traduction, du résumé et de toute tâche séquence-vers-séquence." },
        ],
      },
      {
        kind: "text",
        text: "Le choix de la famille dépend de la tâche, pas de la mode : pour classifier des tickets de support, un encodeur comme BERT est plus rapide, moins cher et souvent meilleur qu'un LLM géant. Réservez les décodeurs génératifs aux tâches qui exigent vraiment de générer du texte libre.",
      },
    ],
  },
  {
    id: "positional-encoding",
    title: "Encodage positionnel",
    level: 3,
    intro:
      "Comment le modèle sait dans quel ordre viennent les mots.",
    blocks: [
      {
        kind: "text",
        text: "L'attention traite tous les tokens en parallèle : sans information supplémentaire, « le chien mord l'homme » et « l'homme mord le chien » seraient identiques. L'encodage positionnel ajoute à chaque embedding un signal représentant sa position dans la séquence — sinusoïdal fixe dans le Transformer originel, appris ou rotatif (RoPE) dans les modèles modernes. C'est ce qui permet au modèle de comprendre l'ordre, et c'est aussi ce qui rend l'extension de la fenêtre de contexte délicate : les positions au-delà de celles vues à l'entraînement sont mal gérées.",
      },
    ],
  },
  {
    id: "pre-training-objectifs",
    title: "Objectifs de pré-entraînement",
    level: 3,
    intro:
      "Ce que les modèles apprennent vraiment pendant le pré-entraînement.",
    blocks: [
      {
        kind: "fields",
        title: "Les objectifs classiques",
        fields: [
          { label: "Modélisation de langage masquée (MLM)", value: "BERT : masquer 15 % des tokens et les prédire à partir du contexte bidirectionnel. Apprend la compréhension fine de la langue." },
          { label: "Modélisation causale (CLM)", value: "GPT : prédire le token suivant à partir des précédents. Apprend à générer du texte cohérent." },
          { label: "Débruitage (T5, BART)", value: "Corrompre le texte (suppressions, permutations) et le reconstruire. Apprend des représentations robustes utiles en génération." },
          { label: "Prédiction de phrase suivante (NSP)", value: "BERT originel : prédire si deux phrases se suivent. Abandonné ensuite — apport jugé faible." },
        ],
      },
      {
        kind: "text",
        text: "Le point crucial : le pré-entraînement est non supervisé — il n'a besoin que de texte brut, disponible en quantité massive. C'est ce qui permet d'entraîner sur des milliards de mots, puis de spécialiser avec peu de données étiquetées au fine-tuning. La qualité et la diversité du corpus de pré-entraînement déterminent en grande partie les capacités et les biais du modèle.",
      },
    ],
  },
  {
    id: "classification-de-texte",
    title: "Classification de texte",
    level: 3,
    intro:
      "La tâche la plus rentable : assigner des catégories à des textes.",
    blocks: [
      {
        kind: "text",
        text: "Sentiments, intentions, sujets, spam, priorité de tickets : la classification consiste à choisir parmi des catégories fixes. Techniquement, on ajoute une « tête » de classification sur l'encodeur (souvent sur le token `[CLS]` qui résume la séquence) et on fine-tune l'ensemble. C'est la tâche où le rapport effort/valeur est le meilleur : des résultats de production avec quelques centaines d'exemples.",
      },
      {
        kind: "list",
        items: [
          "Binaire : deux classes (spam / non-spam). Le cas le plus simple.",
          "Multi-classe : une classe parmi N (sujet d'un article).",
          "Multi-label : plusieurs étiquettes possibles simultanément (tags d'un ticket).",
          "Hiérarchique : des catégories en arbre — à traiter avec prudence, les erreurs se propagent.",
        ],
      },
    ],
  },
  {
    id: "ner",
    title: "Reconnaissance d'entités (NER)",
    level: 3,
    intro:
      "Repérer les personnes, lieux, organisations et dates dans un texte.",
    blocks: [
      {
        kind: "text",
        text: "Le NER (Named Entity Recognition) étiquette chaque token : « [Marie Dupont]PERS travaille à [Paris]LOC depuis [2020]DATE ». C'est une classification au niveau du token, pas de la phrase — d'où des schémas d'étiquetage comme BIO (Begin/Inside/Outside) pour marquer les frontières des entités. Applications : extraction d'information, anonymisation de documents, enrichissement de recherche.",
      },
      {
        kind: "code",
        language: "python",
        title: "Schéma BIO",
        code: "# Marie Dupont travaille à Paris depuis 2020.\n# B-PER I-PER   O         O  B-LOC  O      B-DATE\n# B- = début d'entité, I- = suite, O = hors entité",
      },
    ],
  },
  {
    id: "question-reponse",
    title: "Question-réponse",
    level: 3,
    intro:
      "Deux paradigmes : extraire la réponse d'un texte, ou la générer.",
    blocks: [
      {
        kind: "fields",
        title: "Extractive vs générative",
        fields: [
          { label: "QA extractive", value: "Le modèle pointe le début et la fin de la réponse dans un document fourni. Précise et vérifiable (la réponse existe dans le texte), mais limitée à ce qui est écrit." },
          { label: "QA générative", value: "Le modèle rédige la réponse à partir de ses connaissances. Flexible, mais sujette aux hallucinations : elle peut inventer des faits avec assurance." },
          { label: "QA avec récupération (RAG)", value: "Le compromis moderne : récupérer les passages pertinents, puis générer la réponse en s'appuyant dessus. Précision + flexibilité." },
        ],
      },
    ],
  },
  {
    id: "resume-automatique",
    title: "Résumé automatique",
    level: 3,
    intro:
      "Compresser un document en gardant l'essentiel : extractif vs abstractif.",
    blocks: [
      {
        kind: "fields",
        title: "Deux approches",
        fields: [
          { label: "Résumé extractif", value: "Sélectionne les phrases les plus importantes du document original. Fidèle par construction (aucune invention), mais parfois décousu." },
          { label: "Résumé abstractif", value: "Génère un nouveau texte qui reformule l'essentiel. Plus fluide, mais risque d'halluciner des détails — à vérifier systématiquement sur des documents critiques." },
        ],
      },
      {
        kind: "text",
        text: "L'évaluation des résumés reste un problème ouvert : ROUGE mesure le recouvrement de mots avec un résumé de référence, mais un bon résumé reformulé obtient un mauvais score ROUGE. En pratique, l'évaluation humaine sur un échantillon reste la référence pour les usages sérieux.",
      },
    ],
  },
  {
    id: "traduction",
    title: "Traduction automatique",
    level: 3,
    intro:
      "La tâche historique du séquence-vers-séquence, aujourd'hui dominée par les Transformers.",
    blocks: [
      {
        kind: "text",
        text: "La traduction neuronale encode la phrase source puis décode la phrase cible token par token — l'architecture encodeur-décodeur dans son cas d'usage d'origine. Les modèles multilingues modernes traduisent entre des dizaines de langues, y compris des paires jamais vues ensemble à l'entraînement (traduction « zero-shot »). Limites persistantes : les langues peu dotées, les nuances culturelles, et la cohérence sur les longs documents.",
      },
    ],
  },
  {
    id: "generation-de-texte",
    title: "Génération de texte",
    level: 3,
    intro:
      "Comment un décodeur produit du texte, token par token.",
    blocks: [
      {
        kind: "text",
        text: "La génération est autorégressive : le modèle prédit une distribution de probabilité sur le vocabulaire, on en échantillonne un token, on l'ajoute à la séquence, et on recommence. Chaque token généré devient le contexte des suivants — d'où l'importance du début de la génération : une erreur précoce contamine toute la suite (exposure bias).",
      },
      {
        kind: "diagram",
        title: "Boucle de génération",
        lines: [
          "Contexte : « Le ciel est »",
          "   │",
          "   ▼  distribution de probabilités",
          "   ┌──────────────┐",
          "   │ bleu : 0.62  │ ◄── token choisi",
          "   │ gris : 0.21  │",
          "   │ …            │",
          "   └──────────────┘",
          "   │",
          "   ▼  « Le ciel est bleu » → on recommence",
        ],
      },
    ],
  },
  {
    id: "strategies-de-decodage",
    title: "Stratégies de décodage",
    level: 3,
    intro:
      "Greedy, beam search, sampling : choisir comment échantillonner change tout.",
    blocks: [
      {
        kind: "fields",
        title: "Les stratégies",
        fields: [
          { label: "Greedy", value: "Prend toujours le token le plus probable. Déterministe, rapide — mais produit des textes répétitifs et peut rater de meilleures séquences globales." },
          { label: "Beam search", value: "Explore plusieurs hypothèses en parallèle et garde les meilleures. Mieux pour la traduction et les tâches contraintes ; peu adapté au texte créatif." },
          { label: "Sampling + température", value: "Échantillonne selon les probabilités. La température contrôle le hasard : basse = conservateur, haute = créatif/incohérent." },
          { label: "Top-k / top-p (nucleus)", value: "Restreint l'échantillonnage aux k tokens les plus probables ou au plus petit ensemble cumulant une probabilité p. Le réglage standard pour un texte naturel." },
        ],
      },
      {
        kind: "text",
        text: "Il n'y a pas de réglage universel : la traduction veut du beam search déterministe, l'écriture créative veut du sampling à température modérée, et un chatbot de support veut une température basse pour rester factuel et cohérent.",
      },
    ],
  },
  {
    id: "zero-shot-et-few-shot",
    title: "Zero-shot et few-shot",
    level: 3,
    intro:
      "Utiliser un modèle sans entraînement, avec une simple instruction ou quelques exemples.",
    blocks: [
      {
        kind: "text",
        text: "Les grands modèles peuvent réaliser une tâche jamais vue à l'entraînement si on la décrit en langage naturel (zero-shot : « Classe cet avis : positif ou négatif ») ou en montrant quelques exemples dans le prompt (few-shot). C'est puissant pour prototyper en minutes — mais fragile : les performances varient selon la formulation exacte du prompt, et restent généralement en deçà d'un modèle fine-tuné sur la tâche.",
      },
      {
        kind: "list",
        items: [
          "Zero-shot : idéal pour explorer rapidement si une tâche est faisable.",
          "Few-shot : 3 à 10 exemples bien choisis améliorent nettement la fiabilité.",
          "Limite : le coût (chaque requête embarque les exemples) et la non-reproductibilité face aux reformulations.",
          "Règle : si la tâche est stable et critique, fine-tunez ; si elle est exploratoire, promptez.",
        ],
      },
    ],
  },
  {
    id: "evaluation-metriques",
    title: "Métriques d'évaluation avancées",
    level: 3,
    intro:
      "Au-delà de l'accuracy : perplexité, BLEU, ROUGE et leurs limites.",
    blocks: [
      {
        kind: "fields",
        title: "Les métriques par tâche",
        fields: [
          { label: "Perplexité", value: "Mesure à quel point le modèle est « surpris » par un texte : plus basse = meilleur modèle de langue. Utile pour comparer des modèles, pas pour juger une application." },
          { label: "BLEU", value: "Recouvrement de n-grammes entre traduction générée et référence. Standard historique, mais corrèle imparfaitement avec la qualité perçue." },
          { label: "ROUGE", value: "Pendant du BLEU pour le résumé : mesure ce que le résumé capture de la référence." },
          { label: "Exact Match / F1 (QA)", value: "Le span extrait correspond-il exactement (ou partiellement) à la réponse attendue." },
        ],
      },
      {
        kind: "text",
        text: "Toutes ces métriques automatiques comparent à une référence unique, alors que plusieurs bonnes réponses existent souvent. Pour les tâches génératives en production, prévoyez toujours une évaluation humaine sur échantillon — les métriques automatiques servent à itérer vite, pas à valider.",
      },
    ],
  },
  {
    id: "donnees-annotation",
    title: "Annotation des données",
    level: 3,
    intro:
      "Produire des données étiquetées de qualité : le vrai goulot d'étranglement.",
    blocks: [
      {
        kind: "list",
        items: [
          "Rédigez un guide d'annotation avec des exemples limites avant de commencer : l'ambiguïté non tranchée produit des étiquettes incohérentes.",
          "Faites annoter les mêmes exemples par deux personnes et mesurez l'accord inter-annotateurs : s'ils ne sont pas d'accord, le modèle ne pourra pas l'être.",
          "Commencez petit (200-500 exemples), entraînez, analysez les erreurs, puis annotez en ciblant les cas difficiles (active learning).",
          "Prévoyez un processus de révision : les erreurs d'étiquetage sont la première cause de contre-performance, devant les hyperparamètres.",
        ],
      },
    ],
  },
  {
    id: "qualite-des-donnees",
    title: "Qualité des données",
    level: 3,
    intro:
      "Ce qui rend un dataset bon ou mauvais, au-delà du volume.",
    blocks: [
      {
        kind: "fields",
        title: "Les dimensions de la qualité",
        fields: [
          { label: "Représentativité", value: "Le dataset ressemble-t-il aux données réelles de production ? Un modèle entraîné sur des critiques de films échoue sur des tickets de support." },
          { label: "Équilibre", value: "Les classes rares doivent être suffisamment représentées, ou le modèle apprendra à les ignorer." },
          { label: "Propreté", value: "Doublons, HTML résiduel, encodages cassés : le bruit d'étiquetage et de texte plafonne les performances." },
          { label: "Fraîcheur", value: "La langue évolue (nouveaux produits, nouveaux usages) : un dataset figé se périme." },
          { label: "Absence de fuite", value: "Aucun exemple (ni quasi-doublon) commun entre train, validation et test." },
        ],
      },
    ],
  },
  {
    id: "biais-et-limites",
    title: "Biais et limites",
    level: 3,
    intro:
      "Ce que les modèles linguistiques font mal — et pourquoi il faut le savoir.",
    blocks: [
      {
        kind: "list",
        items: [
          "Biais du corpus : le modèle reproduit les stéréotypes et les déséquilibres de ses données d'entraînement (représentation, ton, sujets).",
          "Hallucinations : un modèle génératif produit des affirmations fausses avec assurance — jamais de fait critique sans vérification.",
          "Fenêtre de contexte : au-delà de la limite, le début du document est oublié ou tronqué.",
          "Langues inégales : les performances chutent sur les langues peu représentées au pré-entraînement.",
          "Sensibilité au prompt : une reformulation change la sortie — problématique pour la reproductibilité.",
          "Pas de compréhension réelle : le modèle prédit des tokens probables, il ne « sait » pas au sens humain. Ne lui confiez pas de décision à fort enjeu sans garde-fou.",
        ],
      },
    ],
  },
  {
    id: "prompt-vs-finetuning",
    title: "Prompt vs fine-tuning",
    level: 3,
    intro:
      "Choisir la bonne stratégie d'adaptation selon le besoin.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Prompt (zero/few-shot)", "Fine-tuning"],
        rows: [
          ["Données nécessaires", "Aucune ou quelques exemples", "Centaines à milliers d'exemples étiquetés"],
          ["Coût de mise en place", "Minutes", "Heures à jours (données + entraînement)"],
          ["Coût d'inférence", "Élevé (gros modèle, longs prompts)", "Faible (petit modèle spécialisé)"],
          ["Fiabilité", "Variable selon la formulation", "Stable et mesurable"],
          ["Idéal pour", "Prototyper, tâches variées", "Tâche stable, volume important, production"],
        ],
      },
      {
        kind: "text",
        text: "En pratique, beaucoup de projets suivent le même chemin : prototype en prompt pour valider l'idée, puis fine-tuning d'un petit modèle quand le besoin se stabilise et que le volume justifie l'investissement.",
      },
    ],
  },
  {
    id: "rag-panorama",
    title: "RAG : panorama",
    level: 3,
    intro:
      "La génération augmentée par récupération : brancher un modèle sur vos documents.",
    blocks: [
      {
        kind: "text",
        text: "Le RAG (Retrieval-Augmented Generation) combine deux étapes : récupérer les passages pertinents dans une base documentaire (via des embeddings et une recherche de similarité), puis les fournir au modèle génératif avec la question. Le modèle répond en s'appuyant sur des documents réels plutôt que sur sa seule mémoire — ce qui réduit les hallucinations et permet d'interroger des données privées ou récentes.",
      },
      {
        kind: "diagram",
        title: "Pipeline RAG",
        lines: [
          "Question",
          "   │",
          "   ▼",
          "Recherche sémantique (embeddings)",
          "   │",
          "   ▼",
          "Passages pertinents récupérés",
          "   │",
          "   ▼",
          "Modèle génératif (question + passages)",
          "   │",
          "   ▼",
          "Réponse grounded",
        ],
      },
      {
        kind: "text",
        text: "La qualité d'un système RAG dépend d'abord de la récupération (chunking des documents, qualité des embeddings), pas du modèle génératif. Un mauvais découpage des documents produit des passages tronqués et des réponses médiocres, quel que soit le LLM.",
      },
    ],
  },
  {
    id: "llm-modernes",
    title: "Les LLM modernes",
    level: 3,
    intro:
      "Ce qui distingue les grands modèles de langage du NLP classique.",
    blocks: [
      {
        kind: "list",
        items: [
          "Échelle : des milliards de paramètres entraînés sur des corpus massifs — d'où des capacités émergentes (raisonnement, suivi d'instructions) absentes des petits modèles.",
          "Instruction tuning : un affinage sur des paires instruction/réponse qui apprend au modèle à suivre des consignes en langage naturel.",
          "RLHF : un affinage par feedback humain qui aligne les réponses sur les préférences (utilité, sécurité, ton).",
          "Fenêtres de contexte étendues : des dizaines à des centaines de milliers de tokens, permettant de traiter des documents entiers.",
          "Coût : l'entraînement coûte des millions, l'inférence reste chère — d'où l'importance de la quantification et des petits modèles spécialisés.",
        ],
      },
    ],
  },
  {
    id: "multilingue",
    title: "NLP multilingue",
    level: 3,
    intro:
      "Traiter plusieurs langues avec un seul modèle : promesses et réalités.",
    blocks: [
      {
        kind: "text",
        text: "Les modèles multilingues (mBERT, XLM-R) sont pré-entraînés sur une centaine de langues avec un vocabulaire partagé : ils permettent le transfert cross-lingue — fine-tuner en anglais et appliquer en français, avec des résultats souvent honorables. Mais les performances restent corrélées à la représentation de chaque langue au pré-entraînement : l'anglais domine, les langues peu dotées sont à la traîne, et les spécificités (morphologie riche, scripts non latins) sont moins bien capturées.",
      },
    ],
  },
  {
    id: "optimisation-inference",
    title: "Optimisation de l'inférence",
    level: 3,
    intro:
      "Faire tourner les modèles plus vite et moins cher en production.",
    blocks: [
      {
        kind: "fields",
        title: "Les techniques",
        fields: [
          { label: "Quantification", value: "Réduire la précision des poids (float32 → int8) : divise la mémoire par 2 à 4 avec une perte de qualité souvent négligeable. La technique la plus rentable." },
          { label: "Distillation", value: "Entraîner un petit modèle à imiter un grand : conserve une bonne partie des performances pour une fraction du coût." },
          { label: "Batching", value: "Traiter plusieurs requêtes ensemble sur GPU : le débit augmente fortement, au prix d'une latence légèrement supérieure." },
          { label: "Caching (KV-cache)", value: "En génération, réutiliser les calculs des tokens précédents au lieu de tout recalculer à chaque pas." },
          { label: "Modèles optimisés", value: "Versions compilées/optimisées pour un matériel donné (ONNX, TensorRT) : gains significatifs en latence." },
        ],
      },
    ],
  },
  {
    id: "deploiement",
    title: "Déploiement",
    level: 3,
    intro:
      "Exposer un modèle NLP comme un service fiable.",
    blocks: [
      {
        kind: "list",
        items: [
          "Encapsulez le modèle derrière une API (FastAPI typiquement) : endpoint de prédiction, validation des entrées, gestion des erreurs.",
          "Limitez la taille des entrées et le débit : un texte de 100 000 tokens peut saturer la mémoire du serveur.",
          "Versionnez les modèles comme du code : chaque déploiement doit être traçable et réversible.",
          "Surveillez en production : distribution des prédictions, temps de réponse, taux d'erreur — un modèle qui dérive se détecte sur ses sorties.",
          "Prévoyez le fallback : que se passe-t-il si le modèle est indisponible ? Une réponse dégradée vaut mieux qu'une erreur 500.",
        ],
      },
    ],
  },
  {
    id: "debugging-modele",
    title: "Debugging d'un modèle",
    level: 3,
    intro:
      "Quand le modèle ne converge pas ou performe mal : la méthode.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Vérifier les données d'abord",
            detail:
              "Affichez des exemples tokenisés, vérifiez les étiquettes, cherchez les fuites. 80 % des problèmes sont ici.",
          },
          {
            title: "Sur-apprendre un mini-batch",
            detail:
              "Entraînez sur 10 exemples : si le modèle n'atteint pas 100 %, le pipeline a un bug (labels, loss, tokenizer).",
          },
          {
            title: "Regarder les courbes",
            detail:
              "Loss de train qui ne baisse pas : taux d'apprentissage, bug de données. Écart train/validation qui se creuse : overfitting — plus de données, régularisation, arrêt précoce.",
          },
          {
            title: "Analyser les erreurs par classe",
            detail:
              "Matrice de confusion : une classe systématiquement ratée signale un problème de données ou d'annotation, pas d'architecture.",
          },
          {
            title: "Simplifier",
            detail:
              "Revenez à une baseline simple et comparez. Si la baseline fait aussi mal, le problème est dans les données ou la tâche elle-même.",
          },
        ],
      },
    ],
  },
  {
    id: "tests-regression",
    title: "Tests de non-régression",
    level: 3,
    intro:
      "Empêcher qu'une nouvelle version du modèle casse ce qui marchait.",
    blocks: [
      {
        kind: "list",
        items: [
          "Jeu de test figé : un ensemble d'exemples représentatifs, versionné, rejoué à chaque nouvelle version du modèle.",
          "Tests comportementaux : des cas ciblés par capacité (« le modèle doit détecter la négation », « … les avis mitigés ») — pas seulement une métrique globale.",
          "Seuils d'alerte : si la F1 chute de plus de X points sur le jeu figé, le déploiement est bloqué.",
          "Tests d'invariance : une faute de frappe ou une reformulation ne devrait pas inverser la prédiction sur les cas critiques.",
        ],
      },
    ],
  },
  {
    id: "cout-et-budget",
    title: "Coûts et budget",
    level: 3,
    intro:
      "Estimer le coût réel d'un projet NLP avant de s'engager.",
    blocks: [
      {
        kind: "fields",
        title: "Les postes de coût",
        fields: [
          { label: "Annotation", value: "Le poste dominant pour le fine-tuning : le temps humain d'étiquetage, proportionnel au volume et à la difficulté." },
          { label: "Calcul", value: "GPU pour l'entraînement (heures × tarif) et pour l'inférence en production (dimensionnement continu)." },
          { label: "APIs externes", value: "Facturation au token pour les modèles propriétaires : le coût croît avec l'usage, à modéliser dès le prototype." },
          { label: "Maintenance", value: "Ré-entraînements périodiques (dérive des données), supervision, mises à jour des dépendances." },
        ],
      },
      {
        kind: "text",
        text: "Règle pratique : un petit modèle fine-tuné auto-hébergé coûte cher à construire mais peu à faire tourner ; une API de LLM coûte rien à construire mais cher à l'usage. Le point de bascule dépend du volume.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les fautes classiques en NLP, leurs symptômes et leurs corrections.",
    blocks: [
      {
        kind: "table",
        headers: ["Symptôme", "Cause probable", "Piste"],
        rows: [
          ["Résultats absurdes malgré un bon entraînement", "Tokenizer non apparié au modèle", "Vérifier `AutoTokenizer.from_pretrained` avec le même identifiant"],
          ["99 % en test, nul en production", "Fuite de données train/test", "Reconstruire les splits sans chevauchement, vérifier les quasi-doublons"],
          ["Le modèle ignore la fin des textes", "Troncation silencieuse au-delà de la limite", "Mesurer les longueurs, envisager le chunking"],
          ["Stagnation des métriques", "Étiquettes incohérentes ou tâche mal définie", "Accord inter-annotateurs, redéfinir les classes"],
          ["Hallucinations en production", "Génération sans grounding", "Passer au RAG ou à l'extractif pour les faits critiques"],
          ["Latence explosive", "Séquences trop longues, pas de batch", "Troncation, batching, quantification"],
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro:
      "Les habitudes qui distinguent un projet NLP qui tient de celui qui s'effondre.",
    blocks: [
      {
        kind: "list",
        items: [
          "Commencez par une baseline simple et chiffrée avant tout modèle complexe.",
          "Investissez dans les données avant les hyperparamètres : la qualité des étiquettes plafonne tout.",
          "Séparez train/validation/test dès le premier jour et ne touchez plus au test.",
          "Versionnez données, code, graines et modèles : toute expérience doit être reproductible.",
          "Évaluez avec la métrique qui reflète le coût réel des erreurs, pas la plus flatteuse.",
          "Analysez les erreurs à la main, par dizaines : c'est là que sont les vraies pistes.",
          "Ne confiez jamais un fait critique à de la génération pure sans vérification.",
          "Documentez les limites connues du modèle pour ses utilisateurs.",
        ],
      },
    ],
  },
  {
    id: "projet-recherche-semantique",
    title: "Projet : recherche sémantique",
    level: 3,
    intro:
      "Construire un moteur qui trouve des documents par le sens, pas par les mots-clés.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Encoder le corpus",
            detail:
              "Calculez un embedding par document (ou par passage) avec un modèle de phrases, et stockez les vecteurs.",
          },
          {
            title: "Indexer",
            detail:
              "Utilisez un index de similarité pour retrouver les plus proches voisins d'un vecteur requête en temps raisonnable.",
          },
          {
            title: "Requêter",
            detail:
              "Encodez la question avec le même modèle, cherchez les passages les plus proches, affichez-les avec leur score.",
          },
          {
            title: "Évaluer",
            detail:
              "Construisez un petit jeu de questions/réponses attendues et mesurez le rappel@k : la bonne réponse est-elle dans les k premiers résultats ?",
          },
        ],
      },
    ],
  },
  {
    id: "projet-resume-documents",
    title: "Projet : résumé de documents",
    level: 3,
    intro:
      "Résumer automatiquement des documents longs avec contrôle qualité.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir l'approche",
            detail:
              "Extractif pour la fidélité (documents critiques), abstractif pour la fluidité (veille, synthèse).",
          },
          {
            title: "Gérer les longs documents",
            detail:
              "Découpez en chunks qui tiennent dans la fenêtre du modèle, résumez chaque chunk, puis fusionnez les résumés.",
          },
          {
            title: "Évaluer humainement",
            detail:
              "Sur un échantillon : le résumé est-il fidèle ? Couvre-t-il l'essentiel ? Notez les hallucinations éventuelles.",
          },
          {
            title: "Industrialiser",
            detail:
              "API de résumé avec limite de taille, file de traitement pour les gros volumes, journalisation des résumés produits.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-chatbot-faq",
    title: "Projet : chatbot FAQ d'entreprise",
    level: 3,
    intro:
      "Répondre aux questions fréquentes en s'appuyant sur la documentation interne (RAG).",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Constituer la base",
            detail:
              "Rassemblez la documentation (FAQ, guides, wiki), nettoyez-la et découpez-la en passages cohérents.",
          },
          {
            title: "Indexer",
            detail:
              "Embeddings des passages + index de recherche sémantique. Testez la récupération seule avant d'ajouter la génération.",
          },
          {
            title: "Générer avec grounding",
            detail:
              "Le modèle répond en citant les passages utilisés. S'il ne trouve rien de pertinent, il doit le dire plutôt qu'inventer.",
          },
          {
            title: "Garde-fous",
            detail:
              "Sujets interdits, escalade vers un humain, journalisation des conversations pour l'amélioration continue.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-detection-toxicite",
    title: "Projet : détection de toxicité",
    level: 3,
    intro:
      "Modérer des commentaires : un cas réel avec de vrais enjeux.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définir la politique",
            detail:
              "Qu'est-ce qui est « toxique » pour votre contexte ? Sans définition écrite et exemples, l'annotation sera incohérente.",
          },
          {
            title: "Annoter avec accord",
            detail:
              "Double annotation d'un échantillon, mesure de l'accord, résolution des désaccords dans le guide.",
          },
          {
            title: "Choisir le compromis",
            detail:
              "Faux positifs (censure abusive) vs faux négatifs (toxicité qui passe) : le seuil de décision se règle selon le coût réel, pas à 0.5 par défaut.",
          },
          {
            title: "Prévoir l'humain",
            detail:
              "File de modération humaine pour les cas limites, boucle de ré-entraînement sur les erreurs constatées.",
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
          { label: "Hugging Face Docs", value: "Documentation des bibliothèques transformers, datasets et evaluate : guides, API, exemples." },
          { label: "Hugging Face Course", value: "Le cours officiel, gratuit : du tokenizer au déploiement, avec notebooks exécutables." },
          { label: "PyTorch Docs", value: "La documentation du moteur de calcul sous-jacent, pour comprendre ce qui se passe sous les pipelines." },
        ],
      },
      {
        kind: "list",
        items: [
          "Papers fondateurs : « Attention Is All You Need » (Transformers), les papiers BERT et GPT pour comprendre les origines.",
          "Pratique : reproduire les tutoriels officiels sur vos propres données plutôt que de les lire passivement.",
          "Communauté : forums Hugging Face et dépôts d'exemples pour les cas d'usage concrets.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "NLP maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Aller vers les grands modèles : `llms` — instruction tuning, prompting avancé, agents.",
          "Approfondir l'architecture : `transformers` — le détail des modèles et de leurs variantes.",
          "Construire des systèmes RAG : `rag` — indexation, recherche vectorielle, pipelines de production.",
          "Industrialiser : `mlops` — déploiement, supervision et cycle de vie des modèles.",
          "Revenir à la roadmap : valider NLP et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

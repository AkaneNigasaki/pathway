import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète des Transformers : de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Écosystème couvert : Hugging Face transformers, tokenizers, datasets.
 */
export const LEARNING_TRANSFORMERS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce que sont les Transformers : l'architecture derrière les LLMs, la traduction moderne et l'IA générative.",
    blocks: [
      {
        kind: "text",
        text: "Les Transformers sont une architecture de réseaux de neurones introduite en 2017 par l'article « Attention Is All You Need ». Basée sur le mécanisme d'attention, elle traite des séquences (texte, mais aussi images, audio) en pondérant l'importance de chaque élément par rapport aux autres.",
      },
      {
        kind: "text",
        text: "Pourquoi les Transformers dominent : avant eux, les RNN traitaient les séquences mot à mot, lentement et en oubliant le début des longues phrases. Les Transformers traitent toute la séquence en parallèle et capturent les dépendances lointaines — ce qui a permis d'entraîner des modèles gigantesques sur d'immenses corpus.",
      },
      {
        kind: "text",
        text: "Ce qu'ils ont produit : les grands modèles de langage (LLMs), la traduction automatique moderne, les résumeurs, les assistants conversationnels. Comprendre les Transformers, c'est comprendre comment fonctionnent ces systèmes : tokens, attention, pré-entraînement.",
      },
    ],
  },
  {
    id: "attention-intuition",
    title: "L'attention, intuitivement",
    level: 1,
    intro:
      "Le mécanisme au cœur de l'architecture : comprendre l'attention sans les mathématiques.",
    blocks: [
      {
        kind: "diagram",
        title: "L'attention en une phrase",
        lines: [
          "Phrase : « Le chat dort car il est fatigué »",
          "",
          "Question : à quoi se réfère « il » ?",
          "     │",
          "     ▼",
          "Attention : le modèle pèse chaque mot",
          "   Le(0.05) chat(0.10) dort(0.05) car(0.02) il(0.08) est(0.02) fatigué(0.68)",
          "     │",
          "     ▼",
          "« il » ← « chat » (poids fort) : le sens est résolu",
        ],
      },
      {
        kind: "text",
        text: "L'attention permet à chaque position de « regarder » toutes les autres et de décider lesquelles comptent pour comprendre le contexte. Dans l'exemple, pour interpréter « il », le modèle accorde un poids fort à « chat ». Ce mécanisme, répété sur des dizaines de couches et de « têtes » d'attention, capture la grammaire, le sens et les relations lointaines.",
      },
      {
        kind: "list",
        items: [
          "Attention = pondérer l'importance relative de chaque élément de la séquence.",
          "Multi-têtes : plusieurs attentions en parallèle capturent différents types de relations.",
          "Le reste de l'architecture (embeddings, couches, normalisation) sert ce mécanisme.",
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
      "Les Transformers supposent le deep learning et Python acquis — ce sont des architectures, pas une introduction au ML.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut savoir",
        fields: [
          {
            label: "Deep learning",
            value:
              "Comprendre l'entraînement d'un réseau : loss, gradients, régularisation, sur-apprentissage. Un Transformer s'entraîne comme n'importe quel réseau.",
          },
          {
            label: "Python",
            value:
              "Écrire du Python courant, manipuler des paquets avec pip, travailler en notebooks ou scripts.",
          },
          {
            label: "PyTorch ou TensorFlow (bases)",
            value:
              "Comprendre tenseurs, `fit`/`training loop`, GPU : Hugging Face s'appuie sur l'un des deux frameworks.",
          },
          {
            label: "Ligne de commande",
            value:
              "Installer des paquets, gérer des environnements virtuels, lire une erreur de mémoire GPU.",
          },
        ],
      },
      {
        kind: "text",
        text: "Chaque prérequis est cliquable dans la roadmap. Si le deep learning est fragile, commencez par là : les Transformers n'ont de sens que si l'on comprend ce qu'est entraîner un réseau de neurones.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Installer la bibliothèque Hugging Face `transformers` et un framework backend.",
    blocks: [
      {
        kind: "command",
        label: "Installer transformers et PyTorch",
        command: "pip install transformers torch",
        why: "Installe la bibliothèque Hugging Face `transformers` (architectures, tokenizers, pipelines) et PyTorch, le backend d'exécution le plus courant. Alternative : TensorFlow à la place de PyTorch.",
        verify: "python -c \"import transformers; print(transformers.__version__)\"",
      },
      {
        kind: "command",
        label: "Installer les datasets Hugging Face",
        command: "pip install datasets",
        why: "La bibliothèque `datasets` donne accès à des milliers de jeux de données prêts à l'emploi et à `load_dataset()`, le chargeur standard pour entraîner et évaluer.",
        verify: "python -c \"import datasets; print(datasets.__version__)\"",
      },
      {
        kind: "text",
        text: "GPU : les modèles sérieux exigent un GPU avec suffisamment de mémoire — Google Colab (GPU gratuit) suffit pour expérimenter avec des modèles modestes. Vérifiez la mémoire disponible avant de charger un gros modèle : un modèle de 7B paramètres en float16 pèse ~14 Go.",
      },
    ],
  },
  {
    id: "premier-pipeline",
    title: "Premier pipeline",
    level: 2,
    intro:
      "Utiliser un modèle pré-entraîné en trois lignes : l'API `pipeline` de Hugging Face.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Importer pipeline",
            detail:
              "`from transformers import pipeline` : la fonction qui encapsule tout le workflow (tokenizer + modèle + post-traitement).",
          },
          {
            title: "Créer le pipeline",
            detail:
              "`classifier = pipeline(\"sentiment-analysis\")` : télécharge automatiquement le modèle par défaut pour la tâche depuis le Hub Hugging Face (mise en cache locale).",
          },
          {
            title: "Prédire",
            detail:
              "`classifier(\"J'adore ce framework !\")` : retourne le label et le score. Le pipeline gère la tokenisation, l'inférence et le décodage.",
          },
          {
            title: "Changer de modèle",
            detail:
              "`pipeline(\"sentiment-analysis\", model=\"distilbert-base-uncased-finetuned-sst-2-english\")` : spécifier un modèle précis du Hub par son identifiant.",
          },
          {
            title: "Choisir l'appareil",
            detail:
              "`pipeline(..., device=0)` : exécuter sur le premier GPU si disponible — sinon le CPU est utilisé par défaut.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Analyse de sentiment en trois lignes",
        code: `from transformers import pipeline\n\nclassifier = pipeline("sentiment-analysis")\nprint(classifier("J'adore ce framework !"))\n# [{'label': 'POSITIVE', 'score': 0.999...}]`,
      },
    ],
  },
  {
    id: "taches-pipeline",
    title: "Les tâches des pipelines",
    level: 2,
    intro:
      "Un même mécanisme, plusieurs tâches : les pipelines standards et leurs modèles.",
    blocks: [
      {
        kind: "table",
        headers: ["Tâche", "Identifiant pipeline", "Exemple d'usage"],
        rows: [
          ["Analyse de sentiment", "`sentiment-analysis`", "Classifier des avis clients"],
          ["Résumé", "`summarization`", "Résumer un article long"],
          ["Traduction", "`translation_en_to_fr`", "Traduire des phrases"],
          ["Question-réponse", "`question-answering`", "Répondre depuis un contexte"],
          ["Génération de texte", "`text-generation`", "Compléter un prompt"],
          ["Classification zéro-shot", "`zero-shot-classification`", "Classifier sans entraînement dédié"],
          ["Reconnaissance d'entités", "`ner`", "Extraire noms, lieux, dates"],
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Résumé et question-réponse",
        code: `resumeur = pipeline("summarization")\nprint(resumeur(article_long, max_length=130, min_length=30))\n\nqa = pipeline("question-answering")\nprint(qa(question="Qui a écrit ce livre ?", context=texte))`,
      },
    ],
  },
  {
    id: "tokenisation-bases",
    title: "Tokenisation : les bases",
    level: 2,
    intro:
      "Le modèle ne voit pas des mots mais des tokens : comprendre cette étape obligatoire.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Tokeniser un texte",
        code: `from transformers import AutoTokenizer\n\ntokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased")\ntokens = tokenizer.tokenize("J'adore les Transformers !")\nprint(tokens)\nids = tokenizer("J'adore les Transformers !")\nprint(ids["input_ids"])`,
      },
      {
        kind: "list",
        items: [
          "Token = morceau de texte (mot, sous-mot, caractère) : l'unité réelle manipulée par le modèle.",
          "Sous-mots : les mots rares sont découpés (`Transformers` → `transform` + `##ers`) — le vocabulaire reste borné.",
          "IDs : le modèle reçoit des entiers (indices du vocabulaire), pas des chaînes.",
          "Tokens spéciaux : `[CLS]`, `[SEP]`, `<s>`, `</s>` encadrent la séquence selon l'architecture.",
          "Règle d'or : toujours utiliser le tokenizer du modèle — un tokenizer d'un autre modèle produit des IDs incompatibles.",
        ],
      },
    ],
  },
  {
    id: "modeles-auto",
    title: "AutoModel : charger n'importe quel modèle",
    level: 2,
    intro:
      "Les classes `Auto*` : charger le bon modèle et le bon tokenizer depuis un identifiant.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Chargement explicite",
        code: `from transformers import AutoTokenizer, AutoModelForSequenceClassification\n\nnom = "distilbert-base-uncased"\ntokenizer = AutoTokenizer.from_pretrained(nom)\nmodel = AutoModelForSequenceClassification.from_pretrained(nom)\n\nentrees = tokenizer("Exemple de texte", return_tensors="pt")\nsorties = model(**entrees)\nprint(sorties.logits)`,
      },
      {
        kind: "list",
        items: [
          "`AutoTokenizer` / `AutoModel*` : détectent l'architecture depuis le Hub et chargent la bonne classe.",
          "`ForSequenceClassification`, `ForTokenClassification`, `ForQuestionAnswering`… : la « tête » adaptée à la tâche, ajoutée au modèle de base.",
          "`from_pretrained` : télécharge (ou lit le cache) les poids et la configuration.",
          "`return_tensors=\"pt\"` : retourne des tenseurs PyTorch (`\"tf\"` pour TensorFlow).",
        ],
      },
    ],
  },
  {
    id: "hub-huggingface",
    title: "Le Hub Hugging Face",
    level: 2,
    intro:
      "La plateforme où vivent les modèles : model cards, identifiants et téléchargement.",
    blocks: [
      {
        kind: "list",
        items: [
          "Identifiant : `organisation/nom` (ex. `distilbert-base-uncased`) — c'est l'adresse du modèle.",
          "Model card : la fiche du modèle — tâche, données d'entraînement, limites, licence. À lire avant tout usage sérieux.",
          "Cache local : les modèles téléchargés sont mis en cache (`~/.cache/huggingface`) — pas de re-téléchargement.",
          "Licences : vérifier la licence (MIT, Apache, usage restreint) avant un usage commercial.",
          "`huggingface_hub` : la bibliothèque (`pip install huggingface_hub`) pour interagir avec le Hub (login, upload) depuis Python.",
        ],
      },
      {
        kind: "text",
        text: "Réflexe professionnel : ne jamais utiliser un modèle sans lire sa model card — tâche prévue, langue, biais connus. Un modèle d'analyse de sentiment anglais appliqué à du français donnera des résultats absurdes.",
      },
    ],
  },
  {
    id: "inference-parametres",
    title: "Inférence : les paramètres qui comptent",
    level: 2,
    intro:
      "Contrôler la génération : longueur, température et échantillonnage.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Génération contrôlée",
        code: `generateur = pipeline("text-generation", model="gpt2")\nprint(generateur(\n    "L'intelligence artificielle",\n    max_new_tokens=50,\n    temperature=0.7,\n    do_sample=True,\n))`,
      },
      {
        kind: "list",
        items: [
          "`max_new_tokens` : nombre maximum de tokens générés — borne le coût et la longueur.",
          "`temperature` : créativité — basse (0.1) = déterministe et conservateur, haute (1.0+) = varié et risqué.",
          "`do_sample=True` : échantillonne parmi les probabilités ; `False` = glouton (toujours le token le plus probable).",
          "`truncation=True` : tronquer les entrées trop longues — sinon erreur de dépassement de contexte.",
        ],
      },
    ],
  },
  {
    id: "fine-tuning-bases",
    title: "Fine-tuning : les bases",
    level: 2,
    intro:
      "Adapter un modèle pré-entraîné à vos données : le principe et l'API Trainer.",
    blocks: [
      {
        kind: "diagram",
        title: "Le principe du fine-tuning",
        lines: [
          "Modèle pré-entraîné (langue générale, immense corpus)",
          "     │  + vos données étiquetées (petit dataset métier)",
          "     ▼",
          "Réentraînement léger (quelques époques, petit learning rate)",
          "     │",
          "     ▼",
          "Modèle adapté (votre tâche, votre vocabulaire)",
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Fine-tuning avec Trainer",
        code: `from transformers import TrainingArguments, Trainer\n\nargs = TrainingArguments(\n    output_dir="./resultats",\n    num_train_epochs=3,\n    per_device_train_batch_size=16,\n    evaluation_strategy="epoch",\n    save_strategy="epoch",\n)\ntrainer = Trainer(model=model, args=args, train_dataset=train_ds, eval_dataset=eval_ds)\ntrainer.train()`,
      },
      {
        kind: "text",
        text: "Le pré-entraînement a déjà appris la langue ; le fine-tuning n'ajuste que la fin du réseau sur votre tâche. D'où : peu d'époques (2-5), petit learning rate, et un dataset même modeste suffit — c'est toute l'économie du transfer learning appliquée au NLP.",
      },
    ],
  },
  {
    id: "evaluation-bases",
    title: "Évaluation : les bases",
    level: 2,
    intro:
      "Mesurer un modèle de langage : métriques par tâche et pièges classiques.",
    blocks: [
      {
        kind: "list",
        items: [
          "Classification : accuracy, F1 — les métriques classiques, sur un test jamais vu.",
          "Génération : plus délicat — BLEU/ROUGE comparent aux références, mais l'évaluation humaine reste la référence.",
          "Perplexité : mesure la « surprise » du modèle sur du texte — plus basse = meilleur modèle de langue (à architecture comparable).",
          "Fuite : le test ne doit jamais avoir servi au pré-entraînement ni au fine-tuning — sinon le score est gonflé.",
          "Baseline : comparer au modèle sans fine-tuning — pour vérifier que l'adaptation apporte vraiment quelque chose.",
        ],
      },
    ],
  },
  {
    id: "debugging-debutant",
    title: "Debugging : les pannes classiques",
    level: 2,
    intro:
      "Mémoire épuisée, tokenizer incompatible, sorties absurdes : les diagnostics de base.",
    blocks: [
      {
        kind: "fields",
        title: "Diagnostic",
        fields: [
          {
            label: "CUDA out of memory",
            value:
              "Le modèle + batch ne tient pas en VRAM. Réduire le batch size (même à 1), raccourcir `max_length`, passer en float16, ou prendre un modèle plus petit. `nvidia-smi` montre la mémoire réelle.",
          },
          {
            label: "Sorties incohérentes / langue inattendue",
            value:
              "Souvent un tokenizer qui n'est pas celui du modèle, ou un modèle prévu pour une autre langue/tâche. Vérifier l'identifiant exact et la model card.",
          },
          {
            label: "Erreur de taille d'entrée",
            value:
              "Séquence plus longue que le contexte du modèle. Tronquer (`truncation=True`, `max_length`) ou découper en chunks.",
          },
          {
            label: "Téléchargement lent / échec",
            value:
              "Premier chargement télécharge des gigaoctets. Vérifier la connexion et l'espace disque ; le cache évite de recommencer.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro:
      "Quatre projets de difficulté croissante, du premier pipeline au modèle affiné déployé.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Analyseur de sentiments",
        fields: [
          { label: "Compétences requises", value: "pipeline, tokenisation de base" },
          { label: "Ce que vous construisez", value: "Un script qui classe des avis clients en positifs/négatifs avec scores" },
          { label: "Ce que vous apprenez", value: "Charger un modèle, interpréter les sorties, gérer les batchs" },
          { label: "Difficulté attendue", value: "Faible — quelques heures" },
          { label: "Projet suivant", value: "Résumeur d'articles" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Résumeur d'articles",
        fields: [
          { label: "Compétences requises", value: "Modèles seq2seq, paramètres de génération" },
          { label: "Ce que vous construisez", value: "Un outil qui résume des articles longs, avec réglage longueur/style" },
          { label: "Ce que vous apprenez", value: "BART/T5, contrôle de la génération, évaluation de résumés" },
          { label: "Difficulté attendue", value: "Moyenne — quelques jours" },
          { label: "Projet suivant", value: "Fine-tuning métier" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Fine-tuning métier",
        fields: [
          { label: "Compétences requises", value: "Trainer, datasets, tokenisation avancée" },
          { label: "Ce que vous construisez", value: "Un classifieur affiné sur vos propres données étiquetées" },
          { label: "Ce que vous apprenez", value: "Préparer un dataset, régler l'entraînement, évaluer rigoureusement" },
          { label: "Difficulté attendue", value: "Élevée — une à deux semaines" },
          { label: "Projet suivant", value: "Chatbot avec RAG" },
        ],
      },
      {
        kind: "fields",
        title: "Professionnel — Assistant documentaire",
        fields: [
          { label: "Compétences requises", value: "Tout le programme : RAG, évaluation, déploiement" },
          { label: "Ce que vous construisez", value: "Un assistant qui répond depuis vos documents (RAG), évalué et déployé" },
          { label: "Ce que vous apprenez", value: "RAG, évaluation de la qualité, coûts d'inférence, monitoring" },
          { label: "Difficulté attendue", value: "Professionnelle — plusieurs semaines" },
          { label: "Projet suivant", value: "Contribuer à l'écosystème Hugging Face" },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "architecture-detaillee",
    title: "L'architecture en détail",
    level: 3,
    intro:
      "Anatomie d'un Transformer : embeddings, blocs encodeurs/décodeurs, têtes de tâche.",
    blocks: [
      {
        kind: "diagram",
        title: "Anatomie d'un bloc Transformer",
        lines: [
          "Tokens d'entrée",
          "     │",
          "     ▼",
          "Embeddings (tokens + positions)",
          "     │",
          "     ▼",
          "┌─ Bloc × N ─────────────────┐",
          "│ Multi-Head Attention       │",
          "│   ↓ + résiduel + norm      │",
          "│ Feed-Forward               │",
          "│   ↓ + résiduel + norm      │",
          "└────────────────────────────┘",
          "     │",
          "     ▼",
          "Tête de tâche (classification, génération…)",
        ],
      },
      {
        kind: "text",
        text: "Chaque bloc raffine la représentation : l'attention mélange l'information entre positions, le feed-forward la transforme position par position. Les connexions résiduelles (+ norm) permettent d'empiler des dizaines de couches sans que le gradient ne disparaisse. La « tête » finale dépend de la tâche.",
      },
    ],
  },
  {
    id: "attention-mathematiques",
    title: "L'attention, mathématiquement",
    level: 3,
    intro:
      "Q, K, V et le softmax : la formule de l'attention à tête unique, sans détour.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Attention à tête unique (PyTorch)",
        code: `import torch\nimport torch.nn.functional as F\n\n# Q, K, V : projections apprises des embeddings (batch, seq, dim)\nscores = Q @ K.transpose(-2, -1) / (d_k ** 0.5)  # similarités\npoids = F.softmax(scores, dim=-1)                # normalisation\nsortie = poids @ V                               # combinaison pondérée`,
      },
      {
        kind: "list",
        items: [
          "Q (query), K (key), V (value) : trois projections linéaires apprises de chaque embedding.",
          "Scores : produit scalaire Q·K — mesure la « pertinence » de chaque paire de positions.",
          "Division par √d : stabilise le softmax quand la dimension grandit.",
          "Softmax : convertit les scores en poids qui somment à 1.",
          "Sortie : combinaison des V pondérée — chaque position reçoit un mélange du contexte.",
        ],
      },
    ],
  },
  {
    id: "tokenizers-avance",
    title: "Tokenizers : BPE, WordPiece, SentencePiece",
    level: 3,
    intro:
      "Les algorithmes de sous-mots : comment le vocabulaire est construit et pourquoi ça compte.",
    blocks: [
      {
        kind: "table",
        headers: ["Algorithme", "Utilisé par", "Principe"],
        rows: [
          ["BPE (Byte-Pair Encoding)", "GPT, RoBERTa", "Fusionne itérativement les paires les plus fréquentes"],
          ["WordPiece", "BERT", "Fusionne en maximisant la vraisemblance"],
          ["SentencePiece", "T5, LLaMA", "Traite le texte brut, sans pré-tokenisation"],
          ["Unigram", "Variantes", "Élagage probabiliste d'un grand vocabulaire"],
        ],
      },
      {
        kind: "list",
        items: [
          "Compromis : vocabulaire petit = séquences longues ; vocabulaire grand = embeddings lourds.",
          "Langues : un tokenizer entraîné sur l'anglais découpe mal le français — d'où les tokenizers multilingues.",
          "Longueur : compter en tokens, pas en mots — ~0,75 mot par token en anglais, moins en français.",
          "Bibliothèque `tokenizers` (Rust) : la tokenisation rapide utilisée sous le capot.",
        ],
      },
    ],
  },
  {
    id: "embeddings-positionnels",
    title: "Embeddings et positions",
    level: 3,
    intro:
      "L'attention ignore l'ordre : comment le modèle sait où se trouve chaque token.",
    blocks: [
      {
        kind: "list",
        items: [
          "Problème : l'attention est invariante par permutation — sans position, « le chat mange » = « mange chat le ».",
          "Positions absolues : un vecteur de position additionné à chaque embedding (sinusoïdal ou appris).",
          "Positions relatives/rotatives (RoPE) : encodent les distances relatives — mieux pour les longues séquences, standard des LLMs modernes.",
          "Limite : la fenêtre de contexte (512, 4096, 128k tokens…) est fixée par l'architecture et le coût quadratique de l'attention.",
        ],
      },
    ],
  },
  {
    id: "encodeurs",
    title: "Encodeurs : BERT et famille",
    level: 3,
    intro:
      "Lire dans les deux sens : les modèles encodeurs et leurs tâches de prédilection.",
    blocks: [
      {
        kind: "list",
        items: [
          "BERT : pré-entraîné en masquant des mots (MLM) — représentation bidirectionnelle du texte.",
          "RoBERTa : BERT mieux entraîné (plus de données, plus longtemps) — souvent meilleur en pratique.",
          "DistilBERT : version distillée, ~40 % plus petite et plus rapide pour ~97 % de la performance.",
          "Tâches : classification, NER, question-réponse extractive — tout ce qui analyse plutôt que génère.",
          "Usage : `AutoModelForSequenceClassification` + fine-tuning — le workflow standard.",
        ],
      },
    ],
  },
  {
    id: "decodeurs",
    title: "Décodeurs : GPT et famille",
    level: 3,
    intro:
      "Générer token par token : les modèles décodeurs et l'attention causale.",
    blocks: [
      {
        kind: "list",
        items: [
          "Attention causale : chaque position ne voit que le passé — indispensable pour générer sans tricher.",
          "Pré-entraînement : prédire le token suivant sur d'immenses corpus — simple et scalable.",
          "GPT, LLaMA et descendants : la famille des LLMs génératifs — complétion, dialogue, code.",
          "Usage : `AutoModelForCausalLM` + `pipeline(\"text-generation\")`.",
          "Instruction tuning : affiner sur des paires instruction/réponse pour obtenir un assistant.",
        ],
      },
    ],
  },
  {
    id: "seq2seq",
    title: "Seq2seq : T5 et BART",
    level: 3,
    intro:
      "Encodeur + décodeur : lire une séquence entière puis en générer une autre.",
    blocks: [
      {
        kind: "list",
        items: [
          "Architecture : un encodeur lit l'entrée, un décodeur génère la sortie en s'y référant (attention croisée).",
          "T5 : tout est formulé comme texte-vers-texte (traduction, résumé, classification) avec des préfixes de tâche.",
          "BART : encodeur bidirectionnel + décodeur — excellent en résumé et débruitage.",
          "Tâches reines : traduction automatique, résumé abstractif — là où entrée et sortie sont deux textes.",
        ],
      },
    ],
  },
  {
    id: "strategies-generation",
    title: "Stratégies de génération",
    level: 3,
    intro:
      "Comment choisir le prochain token : glouton, faisceau, échantillonnage.",
    blocks: [
      {
        kind: "table",
        headers: ["Stratégie", "Principe", "Usage"],
        rows: [
          ["Glouton (`do_sample=False`)", "Toujours le token le plus probable", "Reproductible, mais répétitif"],
          ["Beam search", "Explore les N meilleures hypothèses", "Traduction, résumé — qualité maximale"],
          ["Top-k", "Échantillonne parmi les k meilleurs", "Génération créative contrôlée"],
          ["Top-p (nucleus)", "Échantillonne dans la masse de proba p", "Le standard des LLMs conversationnels"],
        ],
      },
      {
        kind: "text",
        text: "Le glouton maximise la probabilité locale mais produit des répétitions ; le beam search optimise la séquence entière au prix du temps de calcul ; top-p adapte le vocabulaire candidat à l'incertitude du modèle. En pratique : beam pour la traduction, top-p + température pour le dialogue.",
      },
    ],
  },
  {
    id: "parametres-generation-avance",
    title: "Paramètres de génération avancés",
    level: 3,
    intro:
      "Affiner le comportement : pénalités, contraintes et arrêt.",
    blocks: [
      {
        kind: "list",
        items: [
          "`temperature` : aplatit (haut) ou concentre (bas) la distribution — le levier principal de créativité.",
          "`repetition_penalty` : pénalise les tokens déjà générés — contre les boucles répétitives.",
          "`no_repeat_ngram_size` : interdit de répéter un n-gramme — radical contre les répétitions.",
          "`max_new_tokens` vs `max_length` : limiter ce qui est généré (recommandé) vs la séquence totale.",
          "`eos_token_id` : le token de fin — la génération s'arrête proprement quand il apparaît.",
          "`num_beams`, `num_return_sequences` : faisceau et nombre de candidats retournés.",
        ],
      },
    ],
  },
  {
    id: "trainer-avance",
    title: "Trainer avancé",
    level: 3,
    intro:
      "Exploiter `TrainingArguments` : évaluation, sauvegarde et optimisation du fine-tuning.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "TrainingArguments complet",
        code: `args = TrainingArguments(\n    output_dir="./resultats",\n    num_train_epochs=3,\n    per_device_train_batch_size=16,\n    gradient_accumulation_steps=4,  # batch effectif = 16 × 4\n    learning_rate=2e-5,\n    warmup_steps=500,\n    evaluation_strategy="epoch",\n    save_strategy="epoch",\n    load_best_model_at_end=True,\n    metric_for_best_model="f1",\n    fp16=True,  # précision mixte si GPU compatible\n)`,
      },
      {
        kind: "list",
        items: [
          "`gradient_accumulation_steps` : simule un gros batch sans la mémoire — indispensable sur petit GPU.",
          "`warmup_steps` : montée progressive du learning rate — stabilise le début du fine-tuning.",
          "`load_best_model_at_end` : recharge le meilleur checkpoint selon la métrique — ne jamais garder le dernier par défaut.",
          "`fp16=True` : précision mixte — divise par ~2 la mémoire sur GPU compatibles.",
        ],
      },
    ],
  },
  {
    id: "datasets-hf",
    title: "Datasets : charger et préparer",
    level: 3,
    intro:
      "`load_dataset`, `map` et le formatage : le pipeline de données du NLP.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Charger et tokeniser un dataset",
        code: `from datasets import load_dataset\n\nds = load_dataset("imdb")\n\ndef tokeniser(exemples):\n    return tokenizer(exemples["text"], truncation=True, padding="max_length", max_length=256)\n\nds = ds.map(tokeniser, batched=True)\nds = ds.rename_column("label", "labels")\nds.set_format("torch")`,
      },
      {
        kind: "list",
        items: [
          "`load_dataset` : des milliers de datasets versionnés, en cache local.",
          "`map(batched=True)` : applique la tokenisation par lots — rapide et parallélisable.",
          "`padding` : `max_length` (simple, gourmand) vs `longest` par batch (efficace, via data collator).",
          "`DataCollatorWithPadding` : padding dynamique par batch dans le Trainer — le réglage efficace.",
          "`train_test_split` : découper quand le dataset ne fournit pas de split.",
        ],
      },
    ],
  },
  {
    id: "peft-lora",
    title: "PEFT et LoRA : fine-tuner à moindre coût",
    level: 3,
    intro:
      "Adapter un LLM sans réentraîner tous ses poids : l'entraînement à paramètres efficaces.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "LoRA avec la bibliothèque peft",
        code: `from peft import LoraConfig, get_peft_model\n\nconfig = LoraConfig(\n    r=16,                 # rang de la décomposition\n    lora_alpha=32,\n    target_modules=["q_proj", "v_proj"],  # couches d'attention ciblées\n    lora_dropout=0.05,\n    task_type="CAUSAL_LM",\n)\nmodel = get_peft_model(model, config)  # < 1 % de paramètres entraînés`,
      },
      {
        kind: "command",
        label: "Installer peft",
        command: "pip install peft",
        why: "La bibliothèque Hugging Face du fine-tuning à paramètres efficaces (LoRA, QLoRA, adapters) : n'entraîne qu'une fraction des poids.",
        verify: "python -c \"import peft; print(peft.__version__)\"",
      },
      {
        kind: "text",
        text: "Principe de LoRA : geler le modèle et n'entraîner que de petites matrices de rang faible ajoutées aux couches d'attention. Résultat : un adaptateur de quelques mégaoctets par tâche, interchangeable sur le même modèle de base. QLoRA combine LoRA et quantification pour fine-tuner sur un GPU modeste.",
      },
    ],
  },
  {
    id: "quantification",
    title: "Quantification des LLMs",
    level: 3,
    intro:
      "Réduire la précision des poids : faire tourner des modèles lourds sur du matériel modeste.",
    blocks: [
      {
        kind: "list",
        items: [
          "Principe : stocker les poids en 8 ou 4 bits au lieu de 16/32 — divise la mémoire par 2 à 4.",
          "bitsandbytes : la bibliothèque de référence pour charger en 8/4 bits (`pip install bitsandbytes`, `load_in_8bit=True`).",
          "GGUF : le format quantifié de llama.cpp pour l'inférence CPU — l'écosystème des modèles locaux.",
          "Compromis : légère dégradation de la qualité, surtout en 4 bits — à évaluer sur votre tâche.",
          "Usage : inférence et QLoRA — rarement l'entraînement complet.",
        ],
      },
    ],
  },
  {
    id: "evaluation-avancee",
    title: "Évaluation avancée",
    level: 3,
    intro:
      "Au-delà de l'accuracy : évaluer la génération et comparer rigoureusement.",
    blocks: [
      {
        kind: "list",
        items: [
          "Perplexité : la qualité du modèle de langue pur — comparable uniquement à architecture et tokenizer fixés.",
          "BLEU / ROUGE : recouvrement de n-grammes avec des références — utiles pour traduction/résumé, imparfaits pour la créativité.",
          "Évaluation humaine : aveugle, avec grille — la référence pour la qualité perçue.",
          "LLM-juge : faire évaluer par un modèle fort — rapide, mais biaisé (préfère les réponses longues, ses propres styles).",
          "Benchmarks : MMLU, HumanEval… — des suites standardisées pour comparer les modèles entre eux.",
          "Statistique : un écart de 0,5 point sur un petit test peut être du bruit — tester la significativité.",
        ],
      },
    ],
  },
  {
    id: "inference-optimisee",
    title: "Inférence optimisée",
    level: 3,
    intro:
      "Servir vite et pas cher : batching, cache KV et stratégies de déploiement.",
    blocks: [
      {
        kind: "list",
        items: [
          "Cache KV : mémoriser les clés/valeurs d'attention des tokens passés — évite de tout recalculer à chaque token généré.",
          "Batching continu : regrouper les requêtes de plusieurs utilisateurs — le débit explose.",
          "Précision : inférence en float16/bfloat16 par défaut — quasi sans perte.",
          "Longueur : le coût est quadratique en la longueur — tronquer les contextes au nécessaire.",
          "Métriques : tokens/seconde et latence au premier token — les deux faces de l'expérience.",
        ],
      },
    ],
  },
  {
    id: "deploiement-llm",
    title: "Déployer un modèle",
    level: 3,
    intro:
      "Du notebook au service : les options pour exposer un modèle en production.",
    blocks: [
      {
        kind: "list",
        items: [
          "API managée : le plus simple — mais dépendance au fournisseur et données qui transitent.",
          "Inference Endpoints (Hugging Face) : déploiement managé d'un modèle du Hub — intermédiaire.",
          "Auto-hébergé : conteneur avec le modèle + API (FastAPI) — contrôle total, GPU à gérer.",
          "Optimisations : quantification, batching, mise en cache — avant de scaler le matériel.",
          "Versioning : épingler le commit du modèle — un modèle qui change silencieusement casse les comportements.",
        ],
      },
    ],
  },
  {
    id: "rag-liaison",
    title: "Lien avec le RAG",
    level: 3,
    intro:
      "Brancher un LLM sur vos documents : pourquoi le RAG complète le fine-tuning.",
    blocks: [
      {
        kind: "diagram",
        title: "RAG vs fine-tuning",
        lines: [
          "Question",
          "   ├── RAG : recherche les passages pertinents → LLM répond avec sources",
          "   │        (données à jour, citables, sans réentraînement)",
          "   │",
          "   └── Fine-tuning : le savoir est dans les poids",
          "            (comportement/style, pas de sources, réentraînement à chaque màj)",
        ],
      },
      {
        kind: "text",
        text: "Règle pratique : connaissances factuelles et évolutives → RAG ; style, format et comportement → fine-tuning. Les deux se combinent : un modèle affiné sur le ton, branché en RAG sur la documentation. Voir la compétence dédiée pour le RAG en profondeur.",
      },
    ],
  },
  {
    id: "agents-outils",
    title: "Agents et appels d'outils",
    level: 3,
    intro:
      "Quand le modèle ne se contente pas de répondre : function calling et boucles agentiques.",
    blocks: [
      {
        kind: "list",
        items: [
          "Function calling : le modèle émet un appel structuré (JSON) vers un outil déclaré — recherche, calcul, API métier.",
          "Boucle agentique : penser → agir (outil) → observer → répéter jusqu'à la réponse.",
          "Limites : chaque étape peut échouer — timeouts, boucles infinies, outils indisponibles à gérer.",
          "Évaluation : tester les trajectoires complètes, pas seulement les réponses finales.",
        ],
      },
    ],
  },
  {
    id: "securite-llm",
    title: "Sécurité des LLMs",
    level: 3,
    intro:
      "Les risques propres aux modèles de langage : injection de prompt et fuites.",
    blocks: [
      {
        kind: "list",
        items: [
          "Injection de prompt : des instructions cachées dans les données (page web, document) détournent le modèle — traiter tout contenu externe comme non fiable.",
          "Fuite de données : un modèle peut régurgiter son entraînement — ne jamais fine-tuner sur des secrets sans contrôle.",
          "Jailbreaks : contournement des garde-fous — défense en profondeur, pas de filtre unique.",
          "Validation des sorties : ne jamais exécuter aveuglément du code ou des actions produits par un modèle.",
        ],
      },
    ],
  },
  {
    id: "biais",
    title: "Biais et limites",
    level: 3,
    intro:
      "Ce que les modèles reflètent de leurs données : biais, hallucinations et calibration.",
    blocks: [
      {
        kind: "list",
        items: [
          "Biais : le modèle reproduit les stéréotypes de son corpus — à mesurer sur vos cas d'usage, pas en général.",
          "Hallucinations : le modèle génère du plausible, pas du vrai — d'où le RAG et les citations.",
          "Calibration : un score de 0,9 n'est pas une probabilité de 90 % — ne pas confondre confiance et certitude.",
          "Langues : la qualité chute hors des langues dominantes du pré-entraînement.",
          "Atténuation : données équilibrées, évaluation ciblée, garde-fous en production — pas de solution miracle.",
        ],
      },
    ],
  },
  {
    id: "couts",
    title: "Coûts : tokens et budget",
    level: 3,
    intro:
      "Penser en tokens : le modèle économique de l'inférence, sans chiffres inventés.",
    blocks: [
      {
        kind: "list",
        items: [
          "Unité : le token — entrée + sortie comptent ; un long contexte coûte à chaque requête.",
          "Leviers : modèle plus petit, contexte tronqué, cache, réponses concises (`max_new_tokens`).",
          "Batch vs temps réel : le batch (hors-ligne) coûte moins cher que l'interactif.",
          "Auto-hébergé : coût fixe GPU vs coût variable API — le point d'équilibre dépend du volume.",
          "Mesurer d'abord : instrumenter la consommation par cas d'usage avant d'optimiser.",
        ],
      },
    ],
  },
  {
    id: "fenetre-contexte",
    title: "Fenêtre de contexte",
    level: 3,
    intro:
      "La mémoire de travail du modèle : taille, coût et stratégies quand ça déborde.",
    blocks: [
      {
        kind: "list",
        items: [
          "Définition : le nombre max de tokens (entrée + sortie) que le modèle traite — fixé par l'architecture.",
          "Coût quadratique : doubler le contexte quadruple (environ) le calcul d'attention — d'où les limites.",
          "« Perdu au milieu » : les modèles exploitent mal le milieu des longs contextes — placer l'essentiel en début/fin.",
          "Stratégies : chunking + RAG plutôt que contexte géant ; résumé itératif pour les longs documents.",
        ],
      },
    ],
  },
  {
    id: "histoire-transformers",
    title: "Histoire : de 2017 aux LLMs",
    level: 3,
    intro:
      "Les jalons factuels : comprendre d'où vient l'architecture pour anticiper où elle va.",
    blocks: [
      {
        kind: "list",
        items: [
          "2017 : « Attention Is All You Need » — l'architecture Transformer pour la traduction.",
          "2018 : BERT (Google) — le pré-entraînement bidirectionnel démocratise le transfer learning en NLP.",
          "2018-2020 : GPT puis GPT-2/GPT-3 (OpenAI) — la génération à grande échelle.",
          "2020 : T5, BART — les seq2seq unifient les tâches.",
          "2022+ : instruction tuning et RLHF — des modèles de langue aux assistants ; LLaMA ouvre la voie aux modèles ouverts.",
          "Leçon : chaque saut est venu de l'échelle (données, paramètres, calcul) plus que d'une rupture architecturale.",
        ],
      },
    ],
  },
  {
    id: "ecosysteme-hf",
    title: "Écosystème Hugging Face",
    level: 3,
    intro:
      "Au-delà de `transformers` : les bibliothèques complémentaires.",
    blocks: [
      {
        kind: "table",
        headers: ["Bibliothèque", "Rôle"],
        rows: [
          ["`transformers`", "Architectures, tokenizers, pipelines, Trainer"],
          ["`datasets`", "Jeux de données versionnés et streaming"],
          ["`tokenizers`", "Tokenisation rapide (Rust)"],
          ["`peft`", "Fine-tuning à paramètres efficaces (LoRA…)"],
          ["`accelerate`", "Entraînement multi-GPU simplifié"],
          ["`huggingface_hub`", "Interaction avec le Hub (up/down, login)"],
        ],
      },
      {
        kind: "text",
        text: "Ces bibliothèques sont conçues pour fonctionner ensemble : `accelerate` sous le capot du Trainer, `peft` branché sur les modèles `transformers`, `datasets` alimentant le tout. Apprendre l'écosystème, pas seulement une bibliothèque.",
      },
    ],
  },
  {
    id: "debugging-avance",
    title: "Debugging avancé",
    level: 3,
    intro:
      "Quand le fine-tuning stagne : diagnostiquer comme un entraînement classique, avec les spécificités NLP.",
    blocks: [
      {
        kind: "list",
        items: [
          "Loss qui ne bouge pas : learning rate trop faible, tête mal initialisée, labels mal alignés (`-100` pour l'ignoré en token classification).",
          "Loss qui explose : learning rate trop fort — le warmup et la précision mixte aident.",
          "Sur-apprentissage éclair : trop d'époques sur un petit dataset — 2 à 3 époques suffisent souvent.",
          "Inspecter les prédictions : lire réellement des sorties du modèle — les métriques agrégées cachent les pathologies.",
          "Tokenizer : vérifier `tokenizer.decode(ids)` sur des exemples — un prétraitement cassé se voit là.",
          "Reproductibilité : fixer les graines (`set_seed`) et noter versions + hyperparamètres de chaque run.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes-avancees",
    title: "Erreurs courantes (avancé)",
    level: 3,
    intro:
      "Les pièges qui survivent aux débuts : subtils et coûteux.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Mauvais tokenizer",
            value:
              "Tokenizer d'un autre modèle ou d'une autre version : les IDs ne correspondent plus aux embeddings. Toujours `AutoTokenizer.from_pretrained(même_identifiant)`.",
          },
          {
            label: "Padding à gauche pour la génération",
            value:
              "Les modèles décodeurs attendent un padding à gauche en génération par batch — à droite, les positions sont décalées et la qualité chute.",
          },
          {
            label: "Fine-tuner trop longtemps",
            value:
              "Le modèle oublie son pré-entraînement (catastrophic forgetting). Peu d'époques, petit LR, early stopping.",
          },
          {
            label: "Évaluer sur le train",
            value:
              "Score parfait, modèle inutile : le test doit être disjoint du fine-tuning ET du pré-entraînement si possible.",
          },
          {
            label: "Ignorer la licence",
            value:
              "Un modèle à usage recherche-only en production commerciale = risque juridique. Lire la model card avant d'intégrer.",
          },
          {
            label: "Contexte bourré",
            value:
              "Remplir la fenêtre de contexte « au cas où » : coût, latence et qualité en pâtissent. RAG ciblé plutôt que contexte maximal.",
          },
        ],
      },
    ],
  },
  {
    id: "limites",
    title: "Limites fondamentales",
    level: 3,
    intro:
      "Ce que les Transformers ne font pas : garder les pieds sur terre.",
    blocks: [
      {
        kind: "list",
        items: [
          "Pas de compréhension : des régularités statistiques sophistiquées — impressionnant, pas conscient.",
          "Pas de mémoire : chaque requête repart de zéro (hors contexte fourni) — d'où le RAG.",
          "Pas de fiabilité : hallucinations possibles à tout moment — vérification humaine pour le critique.",
          "Pas de temps réel garanti : la génération token par token a une latence intrinsèque.",
          "Coût énergétique : l'entraînement et l'inférence à grande échelle consomment — à intégrer aux choix d'architecture.",
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro:
      "La checklist d'un usage professionnel des Transformers.",
    blocks: [
      {
        kind: "list",
        items: [
          "Lire la model card avant tout usage : tâche, langue, licence, limites.",
          "Tokenizer du modèle, toujours — jamais d'un autre.",
          "Commencer par le plus petit modèle qui marche, scaler ensuite.",
          "Évaluer sur des données disjointes, avec des métriques adaptées à la tâche.",
          "Tracer : identifiant + révision du modèle, graines, hyperparamètres.",
          "Penser coûts : tokens, latence, GPU — avant de mettre en production.",
          "Garde-fous : validation des entrées/sorties, surtout pour les actions automatiques.",
          "RAG pour les connaissances, fine-tuning pour le comportement.",
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
          { label: "Documentation", value: "huggingface.co/docs/transformers : guides, API, tutoriels par tâche." },
          { label: "Cours", value: "Le cours Hugging Face (gratuit) : le parcours de référence, de la tokenisation au déploiement." },
          { label: "Article fondateur", value: "« Attention Is All You Need » (2017) : l'article d'origine — dense mais éclairant après la pratique." },
          { label: "Hub", value: "huggingface.co/models : les modèles, leurs cards et leurs licences." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : reproduire les tutoriels officiels puis les adapter à vos données.",
          "Communauté : le forum Hugging Face pour les questions pointues — avec versions et code minimal.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Les Transformers maîtrisés, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir les LLMs : prompting avancé, évaluation, alignement.",
          "Construire du RAG : recherche sémantique et pipelines documentaires.",
          "Explorer le deep learning : PyTorch/TensorFlow pour les architectures hors NLP.",
          "Industrialiser : MLOps — déploiement, monitoring et coûts des modèles.",
          "Revenir à la roadmap : valider les Transformers et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

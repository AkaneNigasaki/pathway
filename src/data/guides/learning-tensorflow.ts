import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de TensorFlow : de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Version couverte : TensorFlow 2.x avec Keras intégré.
 */
export const LEARNING_TENSORFLOW: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est TensorFlow, sa place dans l'écosystème du machine learning et sa relation avec Keras.",
    blocks: [
      {
        kind: "text",
        text: "TensorFlow est la plateforme de machine learning de Google : un écosystème complet pour entraîner et déployer des modèles, du serveur au mobile. Son API haut niveau s'appelle Keras : c'est avec elle qu'on construit et entraîne un réseau de neurones en quelques lignes lisibles.",
      },
      {
        kind: "text",
        text: "Pourquoi TensorFlow existe : entraîner un modèle ne suffit pas — il faut le servir en production, le faire tourner sur mobile, le versionner, le surveiller. TensorFlow couvre toute cette chaîne : Keras pour l'entraînement, TF Serving pour le déploiement serveur, TF Lite pour le mobile et l'embarqué.",
      },
      {
        kind: "text",
        text: "Positionnement : là où PyTorch domine la recherche, TensorFlow excelle dans l'industrialisation — déploiement, mobile, pipelines de production. Les deux frameworks se valent pour apprendre le deep learning ; le choix dépend du contexte (recherche vs production, écosystème Google Cloud ou non).",
      },
    ],
  },
  {
    id: "tenseurs-et-graphes",
    title: "Tenseurs et graphes de calcul",
    level: 1,
    intro:
      "Les deux idées fondamentales : des données multidimensionnelles qui circulent dans un graphe d'opérations.",
    blocks: [
      {
        kind: "diagram",
        title: "Le modèle mental de TensorFlow",
        lines: [
          "Données (images, texte, chiffres)",
          "     │  organisées en TENSEURS",
          "     │  (tableaux n-dimensionnels : scalaire, vecteur, matrice, …)",
          "     ▼",
          "Modèle Keras (couches : Dense, Conv2D, …)",
          "     │  chaque couche = opérations mathématiques",
          "     ▼",
          "Graphe de calcul compilé",
          "     │  TensorFlow optimise et exécute (CPU / GPU / TPU)",
          "     ▼",
          "Prédictions",
        ],
      },
      {
        kind: "text",
        text: "Un tenseur est un tableau à N dimensions : une image couleur 224×224 est un tenseur de forme `(224, 224, 3)`. Le modèle est une suite de couches qui transforment ces tenseurs. TensorFlow compile l'ensemble en graphe optimisé et l'exécute sur le matériel disponible — c'est cette compilation qui donne sa vitesse d'exécution.",
      },
      {
        kind: "list",
        items: [
          "Tenseur = la donnée ; couche = la transformation ; graphe = le calcul optimisé.",
          "Keras est l'interface : on manipule des couches et des modèles, rarement des tenseurs bruts.",
          "Le même code s'exécute sur CPU ou GPU : TensorFlow gère le matériel.",
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
      "TensorFlow suppose Python, les tableaux numériques et les bases du deep learning déjà acquis.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut savoir",
        fields: [
          {
            label: "Python",
            value:
              "Écrire du Python courant : fonctions, classes, imports, environnements virtuels. Tout le workflow TensorFlow est en Python.",
          },
          {
            label: "NumPy",
            value:
              "Manipuler des tableaux : formes (`shape`), indexation, opérations vectorisées. Les tenseurs en sont l'extension directe.",
          },
          {
            label: "Deep learning (bases)",
            value:
              "Comprendre l'entraînement : loss, gradients, descente de gradient, sur-apprentissage — sinon `model.fit()` reste une boîte noire.",
          },
          {
            label: "Maths minimales",
            value:
              "Algèbre linéaire (vecteurs, matrices) et statistiques (moyenne, distributions) : le vocabulaire des couches et des métriques.",
          },
          {
            label: "Ligne de commande",
            value:
              "Installer des paquets avec `pip`, lancer des scripts Python, lire une traceback.",
          },
        ],
      },
      {
        kind: "text",
        text: "Chaque prérequis est cliquable dans la roadmap. Si le deep learning est fragile, commencez par la compétence dédiée : TensorFlow ira ensuite beaucoup plus vite, car vous comprendrez ce que chaque appel Keras fait réellement.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Installer TensorFlow, vérifier l'installation et détecter le GPU éventuel.",
    blocks: [
      {
        kind: "command",
        label: "Installer TensorFlow",
        command: "pip install tensorflow",
        why: "Installe TensorFlow 2.x avec Keras intégré. Depuis la 2.x, le même paquet gère le CPU et le GPU : pas de paquet séparé à choisir.",
        verify: "python -c \"import tensorflow as tf; print(tf.__version__)\"",
      },
      {
        kind: "command",
        label: "Vérifier la détection du GPU",
        command: "python -c \"import tensorflow as tf; print(tf.config.list_physical_devices('GPU'))\"",
        why: "Affiche la liste des GPU visibles par TensorFlow. Une liste vide signifie un entraînement sur CPU — fonctionnel mais lent pour les gros modèles. Le GPU exige pilote NVIDIA et versions CUDA/cuDNN compatibles avec la version de TensorFlow installée.",
        verify: "python -c \"import tensorflow as tf; print(tf.config.list_physical_devices())\"",
      },
      {
        kind: "text",
        text: "Environnement : travaillez dans un environnement virtuel (`python -m venv`) ou utilisez Google Colab, qui fournit des notebooks avec GPU gratuit — idéal pour débuter sans installer de pilote. Fixez les versions dans un `requirements.txt` pour la reproductibilité.",
      },
    ],
  },
  {
    id: "premier-modele",
    title: "Premier modèle",
    level: 2,
    intro:
      "Construire, compiler, entraîner et évaluer un réseau de neurones : le workflow Keras complet en quelques lignes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Importer TensorFlow",
            detail:
              "`import tensorflow as tf` : la convention universelle. `tf.keras` est l'API haut niveau intégrée.",
          },
          {
            title: "Construire le modèle",
            detail:
              "`model = tf.keras.Sequential([...])` empile des couches : `Dense(64, activation=\"relu\")` (couche dense de 64 neurones) puis `Dense(10)` (sortie). Sequential suffit quand les données traversent les couches en ligne droite.",
          },
          {
            title: "Compiler",
            detail:
              "`model.compile(optimizer=\"adam\", loss=\"mse\")` : choisir l'optimiseur (adam = bon défaut) et la fonction de perte (`mse` pour la régression, `sparse_categorical_crossentropy` pour la classification). Compiler ne lance rien : ça configure l'entraînement.",
          },
          {
            title: "Entraîner",
            detail:
              "`model.fit(X, y, epochs=10)` : le modèle voit les données 10 fois et ajuste ses poids. Surveiller la loss : elle doit diminuer.",
          },
          {
            title: "Évaluer",
            detail:
              "`model.evaluate(X_test, y_test)` : mesurer la performance sur des données jamais vues pendant l'entraînement — la seule mesure qui compte.",
          },
          {
            title: "Sauvegarder",
            detail:
              "`model.save(\"mon_modele.keras\")` : persister le modèle (architecture + poids) dans un fichier réutilisable.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Le workflow minimal complet",
        code: `import tensorflow as tf\n\nmodel = tf.keras.Sequential([\n    tf.keras.layers.Dense(64, activation="relu"),\n    tf.keras.layers.Dense(10),\n])\nmodel.compile(optimizer="adam", loss="mse")\nmodel.fit(X, y, epochs=10)\nprint(model.evaluate(X_test, y_test))\nmodel.save("mon_modele.keras")`,
      },
    ],
  },
  {
    id: "environnement-developpement",
    title: "Environnement de développement",
    level: 2,
    intro:
      "Notebooks pour expérimenter, scripts pour produire : les deux environnements du praticien TensorFlow.",
    blocks: [
      {
        kind: "diagram",
        title: "Les deux modes de travail",
        lines: [
          "EXPLORATION (notebooks)",
          "Jupyter / VS Code notebooks / Google Colab",
          "  → exécution cellule par cellule",
          "  → visualisations inline (courbes de loss)",
          "  → Colab : GPU gratuit, zéro installation",
          "",
          "PRODUCTION (scripts .py)",
          "Script Python versionné",
          "  → entraînement reproductible",
          "  → lancement en tâche de fond / CI",
          "  → mêmes appels Keras, sans les cellules",
        ],
      },
      {
        kind: "text",
        text: "Règle de travail : explorer dans le notebook, puis figer l'expérience qui marche dans un script versionné avec graine fixée. Un notebook non nettoyé (cellules exécutées dans le désordre) est la première source de résultats non reproductibles.",
      },
      {
        kind: "list",
        items: [
          "VS Code : extensions « Python » et « Jupyter » (Microsoft) pour travailler en notebooks localement.",
          "Google Colab : notebooks dans le navigateur avec GPU gratuit — parfait pour débuter.",
          "PyCharm : alternative IDE complète pour les scripts.",
        ],
      },
    ],
  },
  {
    id: "workflow-keras",
    title: "Le workflow Keras en détail",
    level: 2,
    intro:
      "Les cinq verbes de Keras — construire, compiler, entraîner, évaluer, prédire — et ce que chacun fait vraiment.",
    blocks: [
      {
        kind: "table",
        headers: ["Méthode", "Rôle", "Point d'attention"],
        rows: [
          ["`Sequential` / couches", "Définir l'architecture", "La forme d'entrée (`input_shape`) doit correspondre aux données"],
          ["`compile()`", "Choisir optimiseur, loss, métriques", "`optimizer`, `loss` et `metrics` conditionnent tout l'entraînement"],
          ["`fit()`", "Entraîner : ajuster les poids", "`epochs`, `batch_size`, `validation_split` — surveiller train vs validation"],
          ["`evaluate()`", "Mesurer sur données de test", "Jamais de données d'entraînement : sinon la mesure est biaisée"],
          ["`predict()`", "Inférer sur de nouvelles données", "Prétraiter exactement comme à l'entraînement"],
          ["`save()` / `load_model()`", "Persister / recharger", "Format `.keras` : architecture + poids + état de l'optimiseur"],
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Compiler avec métriques et validation",
        code: `model.compile(\n    optimizer="adam",\n    loss="sparse_categorical_crossentropy",\n    metrics=["accuracy"],\n)\nhistory = model.fit(X_train, y_train, epochs=20, validation_split=0.2)\nloss, accuracy = model.evaluate(X_test, y_test)`,
      },
    ],
  },
  {
    id: "donnees-tf-data",
    title: "Données avec tf.data",
    level: 2,
    intro:
      "Construire un pipeline de données efficace : `tf.data` charge et prépare les données pendant que le GPU calcule.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Pipeline tf.data typique",
        code: `dataset = tf.data.Dataset.from_tensor_slices((X, y))\ndataset = dataset.shuffle(buffer_size=1000)\ndataset = dataset.batch(32)\ndataset = dataset.prefetch(tf.data.AUTOTUNE)\n\nmodel.fit(dataset, epochs=10)`,
      },
      {
        kind: "list",
        items: [
          "`from_tensor_slices` : crée un dataset depuis des tableaux NumPy — le point de départ standard.",
          "`shuffle` : mélange les données à chaque époque — indispensable pour ne pas apprendre l'ordre.",
          "`batch` : regroupe les exemples par lots de 32 — la taille de batch influence vitesse et qualité.",
          "`prefetch(AUTOTUNE)` : prépare les lots suivants pendant le calcul — masque la latence d'I/O.",
          "`model.fit()` accepte directement un dataset : pas besoin de convertir en tableaux.",
        ],
      },
    ],
  },
  {
    id: "callbacks",
    title: "Callbacks : piloter l'entraînement",
    level: 2,
    intro:
      "Les callbacks s'exécutent à des moments clés de l'entraînement : arrêt précoce, sauvegarde, visualisation.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Les trois callbacks indispensables",
        code: `callbacks = [\n    tf.keras.callbacks.EarlyStopping(patience=5, restore_best_weights=True),\n    tf.keras.callbacks.ModelCheckpoint("best.keras", save_best_only=True),\n    tf.keras.callbacks.TensorBoard(log_dir="logs"),\n]\nmodel.fit(X_train, y_train, epochs=100, validation_data=(X_val, y_val), callbacks=callbacks)`,
      },
      {
        kind: "list",
        items: [
          "`EarlyStopping` : stoppe quand la validation ne progresse plus (`patience=5`) et restaure les meilleurs poids — l'arme anti-sur-apprentissage.",
          "`ModelCheckpoint` : sauvegarde le meilleur modèle pendant l'entraînement — on ne perd jamais une bonne époque.",
          "`TensorBoard` : enregistre les courbes pour visualisation — lancer ensuite `tensorboard --logdir logs`.",
          "Toujours passer `validation_data` (ou `validation_split`) : sans mesure de validation, les callbacks sont aveugles.",
        ],
      },
    ],
  },
  {
    id: "sauvegarde-chargement",
    title: "Sauvegarde et chargement",
    level: 2,
    intro:
      "Persister un modèle correctement : ce qui est sauvé, dans quel format, et comment recharger.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Sauver et recharger",
        code: `# Sauvegarde complète : architecture + poids + état de l'optimiseur\nmodel.save("mon_modele.keras")\n\n# Rechargement à l'identique, prêt à prédire ou à réentraîner\nrestored = tf.keras.models.load_model("mon_modele.keras")\nprint(restored.predict(X_new))`,
      },
      {
        kind: "list",
        items: [
          "Format `.keras` : le format recommandé — un seul fichier, complet.",
          "Format SavedModel : le format historique, un dossier — encore utilisé pour TF Serving.",
          "Poids seuls : `model.save_weights()` / `load_weights()` — utile pour le transfer learning (charger des poids dans une autre architecture).",
          "Versionner : nommer les fichiers avec la date ou le run (`model-2026-09-29.keras`) — jamais `model_final_v2.keras`.",
        ],
      },
    ],
  },
  {
    id: "evaluation",
    title: "Évaluation : mesurer ce qui compte",
    level: 2,
    intro:
      "Une bonne évaluation vaut mieux qu'un bon entraînement : découpage des données et métriques adaptées.",
    blocks: [
      {
        kind: "diagram",
        title: "Découpage train / validation / test",
        lines: [
          "Données totales",
          " ├── 70 % entraînement  → ajuste les poids (fit)",
          " ├── 15 % validation    → règle les hyperparamètres, early stopping",
          " └── 15 % test          → mesure finale, utilisée UNE fois",
          "",
          "Règle d'or : le test ne sert jamais à prendre une décision.",
        ],
      },
      {
        kind: "list",
        items: [
          "Loss d'entraînement qui baisse + loss de validation qui monte = sur-apprentissage — le signal à surveiller.",
          "Métrique adaptée à la tâche : `accuracy` pour la classification équilibrée, mais elle ment sur les classes déséquilibrées.",
          "`model.evaluate()` sur le test en fin de projet uniquement : chaque utilisation intermédiaire biaise la mesure.",
          "Baseline : comparer à un modèle trivial (prédire la classe majoritaire) — un modèle « à 90 % » peut être moins bon que la baseline.",
        ],
      },
    ],
  },
  {
    id: "debugging-debutant",
    title: "Debugging : les pannes classiques",
    level: 2,
    intro:
      "Les quatre symptômes qui reviennent sans arrêt chez les débutants, et comment les diagnostiquer.",
    blocks: [
      {
        kind: "fields",
        title: "Diagnostic",
        fields: [
          {
            label: "La loss ne diminue pas / reste bloquée",
            value:
              "Causes fréquentes : learning rate trop haut ou trop bas, données non normalisées, bug de prétraitement. Vérifier d'abord que le modèle sur-apprend un tout petit batch (quelques exemples) : s'il n'y arrive pas, le problème est dans le code, pas dans les hyperparamètres.",
          },
          {
            label: "Erreur de forme (shape mismatch)",
            value:
              "Le message indique les formes attendue vs reçue. Vérifier `input_shape` de la première couche et la forme réelle des données (`X.shape`). Les images doivent souvent être redimensionnées ou aplaties de façon cohérente.",
          },
          {
            label: "Loss = NaN",
            value:
              "Explosion des gradients : learning rate trop élevé, division par zéro dans une couche custom, ou données contenant des NaN/inf. Vérifier les données d'entrée en premier.",
          },
          {
            label: "Mémoire GPU épuisée (OOM)",
            value:
              "Réduire `batch_size`, simplifier le modèle, ou limiter la croissance mémoire avec `tf.config.experimental.set_memory_growth(gpu, True)`. En dernier recours : modèle plus petit ou GPU plus gros.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes-debutant",
    title: "Erreurs courantes",
    level: 2,
    intro:
      "Les pièges méthodologiques qui ruinent un projet ML avant même le code.",
    blocks: [
      {
        kind: "list",
        items: [
          "Normaliser avec les stats du train uniquement : calculer moyenne/écart-type sur l'entraînement, les appliquer au test — jamais l'inverse (fuite de données).",
          "Mélanger avant de découper : un dataset trié par classe découpé naïvement donne un test mono-classe.",
          "Évaluer sur l'entraînement : `evaluate(X_train)` donne un score flatteur et inutile.",
          "Trop d'époques sans validation : le modèle apprend par cœur — toujours un `validation_split` et `EarlyStopping`.",
          "Changer plusieurs choses à la fois : un seul changement par expérience, sinon on ne sait jamais ce qui a aidé.",
          "Ignorer la baseline : sans point de comparaison, impossible de dire si le modèle est bon.",
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro:
      "Quatre projets de difficulté croissante, du premier réseau de neurones au modèle déployé.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Régression simple",
        fields: [
          { label: "Compétences requises", value: "Sequential, Dense, compile, fit" },
          { label: "Ce que vous construisez", value: "Un réseau qui prédit une valeur numérique (ex. prix à partir de caractéristiques)" },
          { label: "Ce que vous apprenez", value: "Le workflow Keras complet, la lecture des courbes de loss" },
          { label: "Difficulté attendue", value: "Faible — quelques heures" },
          { label: "Projet suivant", value: "Classification d'images" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Classification d'images",
        fields: [
          { label: "Compétences requises", value: "Conv2D, tf.data, callbacks, augmentation" },
          { label: "Ce que vous construisez", value: "Un CNN qui classe des images, avec pipeline tf.data et TensorBoard" },
          { label: "Ce que vous apprenez", value: "Pipelines de données, callbacks, sur-apprentissage" },
          { label: "Difficulté attendue", value: "Moyenne — quelques jours" },
          { label: "Projet suivant", value: "Transfer learning" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Transfer learning",
        fields: [
          { label: "Compétences requises", value: "Modèles pré-entraînés, fine-tuning, sauvegarde" },
          { label: "Ce que vous construisez", value: "Un classifieur basé sur un modèle pré-entraîné, affiné sur vos données" },
          { label: "Ce que vous apprenez", value: "Réutilisation de modèles, gel/dégel de couches, évaluation rigoureuse" },
          { label: "Difficulté attendue", value: "Élevée — une à deux semaines" },
          { label: "Projet suivant", value: "Modèle en production" },
        ],
      },
      {
        kind: "fields",
        title: "Professionnel — Modèle en production",
        fields: [
          { label: "Compétences requises", value: "SavedModel, TF Serving ou TF Lite, monitoring" },
          { label: "Ce que vous construisez", value: "Un modèle entraîné, exporté et servi via API, avec suivi des prédictions" },
          { label: "Ce que vous apprenez", value: "Déploiement, versioning de modèles, dérive en production" },
          { label: "Difficulté attendue", value: "Professionnelle — plusieurs semaines" },
          { label: "Projet suivant", value: "Pipeline MLOps complet" },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "api-fonctionnelle",
    title: "API fonctionnelle : au-delà de Sequential",
    level: 3,
    intro:
      "Quand le modèle n'est plus une ligne droite : entrées multiples, sorties multiples, connexions résiduelles.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Modèle à deux entrées avec l'API fonctionnelle",
        code: `inputs_a = tf.keras.Input(shape=(32,))\ninputs_b = tf.keras.Input(shape=(16,))\nx = tf.keras.layers.Concatenate()([inputs_a, inputs_b])\nx = tf.keras.layers.Dense(64, activation="relu")(x)\noutputs = tf.keras.layers.Dense(1)(x)\nmodel = tf.keras.Model(inputs=[inputs_a, inputs_b], outputs=outputs)`,
      },
      {
        kind: "text",
        text: "L'API fonctionnelle traite les couches comme des fonctions : on appelle une couche sur des tenseurs et on assemble le graphe. `Sequential` reste préférable pour les empilements simples — l'API fonctionnelle sert quand l'architecture a des branches, des entrées/sorties multiples ou des connexions sautées.",
      },
    ],
  },
  {
    id: "subclassing",
    title: "Subclassing : des modèles impératifs",
    level: 3,
    intro:
      "Définir un modèle comme une classe Python avec `call()` : contrôle total, au prix de la lisibilité du graphe.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Modèle par subclassing",
        code: `class MonModele(tf.keras.Model):\n    def __init__(self):\n        super().__init__()\n        self.dense1 = tf.keras.layers.Dense(64, activation="relu")\n        self.dense2 = tf.keras.layers.Dense(10)\n\n    def call(self, inputs):\n        x = self.dense1(inputs)\n        return self.dense2(x)\n\nmodel = MonModele()`,
      },
      {
        kind: "list",
        items: [
          "Avantage : logique conditionnelle, boucles, débogage Python classique dans `call()`.",
          "Inconvénient : le modèle est moins inspectable (`model.summary()` est moins informatif) et la sérialisation plus délicate.",
          "Règle : Sequential d'abord, fonctionnelle ensuite, subclassing en dernier recours — dans cet ordre de préférence.",
        ],
      },
    ],
  },
  {
    id: "couches-personnalisees",
    title: "Couches personnalisées",
    level: 3,
    intro:
      "Créer sa propre couche en sous-classant `tf.keras.layers.Layer` : `build()`, `call()`, `add_weight()`.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Couche dense simplifiée",
        code: `class MaDense(tf.keras.layers.Layer):\n    def __init__(self, units):\n        super().__init__()\n        self.units = units\n\n    def build(self, input_shape):\n        self.w = self.add_weight(shape=(input_shape[-1], self.units))\n        self.b = self.add_weight(shape=(self.units,))\n\n    def call(self, inputs):\n        return tf.matmul(inputs, self.w) + self.b`,
      },
      {
        kind: "text",
        text: "`build()` crée les poids quand la forme d'entrée est connue (lazy), `call()` définit le calcul. `add_weight()` enregistre les variables pour que l'optimiseur les mette à jour. Les couches customs doivent être sérialisables (`get_config()`) si on veut sauvegarder le modèle complet.",
      },
    ],
  },
  {
    id: "gradient-tape",
    title: "GradientTape : boucles d'entraînement manuelles",
    level: 3,
    intro:
      "Quand `fit()` ne suffit plus : écrire sa propre boucle avec la différentiation automatique.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Une époque manuelle",
        code: `optimizer = tf.keras.optimizers.Adam()\nloss_fn = tf.keras.losses.MeanSquaredError()\n\nfor x_batch, y_batch in dataset:\n    with tf.GradientTape() as tape:\n        predictions = model(x_batch, training=True)\n        loss = loss_fn(y_batch, predictions)\n    gradients = tape.gradient(loss, model.trainable_variables)\n    optimizer.apply_gradients(zip(gradients, model.trainable_variables))`,
      },
      {
        kind: "text",
        text: "`GradientTape` enregistre les opérations pour calculer les gradients automatiquement. Cas d'usage : losses custom complexes, GANs (deux optimiseurs alternés), apprentissage par renforcement. Pour tout le reste, `fit()` reste supérieur : callbacks, distribution et logging y sont intégrés.",
      },
    ],
  },
  {
    id: "regularisation",
    title: "Régularisation : Dropout, L1/L2, BatchNorm",
    level: 3,
    intro:
      "Combattre le sur-apprentissage avec les trois techniques standard et savoir quand les utiliser.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Les trois régulariseurs en place",
        code: `model = tf.keras.Sequential([\n    tf.keras.layers.Dense(128, activation="relu",\n        kernel_regularizer=tf.keras.regularizers.l2(1e-4)),\n    tf.keras.layers.BatchNormalization(),\n    tf.keras.layers.Dropout(0.3),\n    tf.keras.layers.Dense(10),\n])`,
      },
      {
        kind: "list",
        items: [
          "`Dropout(0.3)` : désactive 30 % des neurones à chaque batch — actif uniquement à l'entraînement, inactif en inférence.",
          "`l2(1e-4)` : pénalise les gros poids dans la loss — freine le sur-ajustement.",
          "`BatchNormalization()` : normalise les activations par batch — stabilise et accélère l'entraînement.",
          "Ordre typique : Dense → BatchNorm → activation → Dropout. Et d'abord : plus de données et EarlyStopping avant de régulariser.",
        ],
      },
    ],
  },
  {
    id: "optimiseurs",
    title: "Optimiseurs",
    level: 3,
    intro:
      "Adam par défaut, SGD avec momentum pour affiner : comprendre ce que fait l'optimiseur.",
    blocks: [
      {
        kind: "table",
        headers: ["Optimiseur", "Comportement", "Quand l'utiliser"],
        rows: [
          ["Adam", "Taux d'apprentissage adaptatif par paramètre", "Défaut raisonnable pour démarrer presque tout"],
          ["SGD + momentum", "Direction lissée, taux fixe", "Fine-tuning, quand on veut un contrôle précis"],
          ["RMSprop", "Adaptatif, historique du gradient", "Réseaux récurrents, alternative à Adam"],
          ["AdamW", "Adam + weight decay découplé", "Transformers et gros modèles"],
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Instancier avec un learning rate explicite",
        code: `optimizer = tf.keras.optimizers.Adam(learning_rate=1e-3)\nmodel.compile(optimizer=optimizer, loss="mse")`,
      },
    ],
  },
  {
    id: "learning-rate-schedules",
    title: "Plannings de learning rate",
    level: 3,
    intro:
      "Diminuer le taux d'apprentissage au fil de l'entraînement : converger vite puis affiner.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Décroissance exponentielle",
        code: `schedule = tf.keras.optimizers.schedules.ExponentialDecay(\n    initial_learning_rate=1e-2, decay_steps=1000, decay_rate=0.9\n)\noptimizer = tf.keras.optimizers.Adam(learning_rate=schedule)`,
      },
      {
        kind: "text",
        text: "Principe : grand pas au début pour progresser vite, petits pas à la fin pour ne pas osciller autour du minimum. Alternatives : décroissance par paliers, warmup (montée progressive au début, standard pour les Transformers). Un schedule bien réglé bat souvent un taux fixe.",
      },
    ],
  },
  {
    id: "mixed-precision",
    title: "Précision mixte",
    level: 3,
    intro:
      "Entraîner en float16 là où c'est sûr : plus rapide, moins de mémoire, même qualité.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Activer la précision mixte",
        code: `policy = tf.keras.mixed_precision.Policy("mixed_float16")\ntf.keras.mixed_precision.set_global_policy(policy)\n# Les couches calculent en float16, les variables restent en float32`,
      },
      {
        kind: "list",
        items: [
          "Gain : jusqu'à ~2× moins de mémoire et entraînement plus rapide sur GPU récents (Tensor Cores).",
          "Keras gère le loss scaling automatiquement : pas de NaN dus à la précision réduite.",
          "La couche de sortie doit rester en float32 pour la stabilité numérique — Keras s'en charge avec la policy mixte.",
          "À activer systématiquement sur GPU moderne, sauf modèle minuscule où le gain est nul.",
        ],
      },
    ],
  },
  {
    id: "distribution",
    title: "Entraînement distribué",
    level: 3,
    intro:
      "Répartir l'entraînement sur plusieurs GPU avec `MirroredStrategy` : le cas le plus courant.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Multi-GPU sur une machine",
        code: `strategy = tf.distribute.MirroredStrategy()\nprint("GPU utilisés :", strategy.num_replicas_in_sync)\n\nwith strategy.scope():\n    model = construire_mon_modele()  # variables répliquées\n    model.compile(optimizer="adam", loss="mse")\n\nmodel.fit(dataset, epochs=10)  # batch réparti automatiquement`,
      },
      {
        kind: "list",
        items: [
          "Le modèle doit être créé dans `strategy.scope()` : les variables sont alors répliquées et synchronisées.",
          "Ajuster le batch size : il est réparti entre les GPU — le batch global = batch par GPU × nombre de GPU.",
          "`MultiWorkerMirroredStrategy` : même principe sur plusieurs machines — réseau et orchestration en plus.",
          "Règle : un seul GPU suffit jusqu'à preuve du contraire — la distribution ajoute de la complexité.",
        ],
      },
    ],
  },
  {
    id: "tf-data-avance",
    title: "tf.data avancé",
    level: 3,
    intro:
      "Le pipeline de données ne doit jamais être le goulot : cache, parallélisme et formats binaires.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Pipeline optimisé",
        code: `dataset = tf.data.Dataset.from_tensor_slices((X, y))\ndataset = dataset.cache()  # en RAM après la 1re époque\n# ou dataset = dataset.cache("cache.tfrecord") sur disque\ndataset = dataset.shuffle(10000)\ndataset = dataset.batch(64)\ndataset = dataset.prefetch(tf.data.AUTOTUNE)`,
      },
      {
        kind: "list",
        items: [
          "`cache()` : garde les données prétraitées en mémoire — rentable si le prétraitement coûte cher.",
          "`num_parallel_calls=tf.data.AUTOTUNE` sur `map()` : parallélise le prétraitement.",
          "Format TFRecord : le format binaire de TensorFlow pour les gros datasets — lecture séquentielle rapide.",
          "Diagnostiquer : si le GPU est sous-utilisé pendant que le CPU sature, le pipeline est le coupable.",
        ],
      },
    ],
  },
  {
    id: "augmentation-donnees",
    title: "Augmentation de données",
    level: 3,
    intro:
      "Créer de la diversité artificiellement : les couches de prétraitement Keras intégrées au modèle.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Augmentation dans le modèle",
        code: `augment = tf.keras.Sequential([\n    tf.keras.layers.RandomFlip("horizontal"),\n    tf.keras.layers.RandomRotation(0.1),\n    tf.keras.layers.RandomZoom(0.1),\n])\n\ninputs = tf.keras.Input(shape=(224, 224, 3))\nx = augment(inputs)  # actif seulement à l'entraînement\nx = base_cnn(x)`,
      },
      {
        kind: "text",
        text: "Intégrer l'augmentation dans le modèle (plutôt que dans le pipeline) garantit qu'elle s'applique à l'entraînement mais jamais à l'inférence, et elle suit le modèle à l'export. Choisir des transformations réalistes pour le domaine : un flip horizontal a du sens pour des photos, pas pour du texte.",
      },
    ],
  },
  {
    id: "cnns",
    title: "CNNs : la vision par ordinateur",
    level: 3,
    intro:
      "Convolution, pooling, champs récepteurs : l'architecture standard de la classification d'images.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Bloc convolutif typique",
        code: `model = tf.keras.Sequential([\n    tf.keras.layers.Conv2D(32, 3, activation="relu", input_shape=(128, 128, 3)),\n    tf.keras.layers.MaxPooling2D(),\n    tf.keras.layers.Conv2D(64, 3, activation="relu"),\n    tf.keras.layers.MaxPooling2D(),\n    tf.keras.layers.Flatten(),\n    tf.keras.layers.Dense(64, activation="relu"),\n    tf.keras.layers.Dense(10, activation="softmax"),\n])`,
      },
      {
        kind: "list",
        items: [
          "`Conv2D(32, 3)` : 32 filtres 3×3 qui détectent des motifs locaux — les poids sont partagés sur toute l'image.",
          "`MaxPooling2D()` : réduit la dimension spatiale en gardant le max — invariance à la position.",
          "Schéma : filtres croissants (32 → 64 → 128) pendant que la résolution diminue.",
          "`softmax` en sortie de classification : des probabilités qui somment à 1.",
        ],
      },
    ],
  },
  {
    id: "sequences-rnn",
    title: "Séquences : RNN, LSTM, GRU",
    level: 3,
    intro:
      "Traiter des données ordonnées (texte, séries temporelles) avec des couches à mémoire.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "LSTM pour une série temporelle",
        code: `model = tf.keras.Sequential([\n    tf.keras.layers.LSTM(64, input_shape=(60, 5)),  # 60 pas de temps, 5 variables\n    tf.keras.layers.Dense(1),\n])`,
      },
      {
        kind: "list",
        items: [
          "`LSTM` / `GRU` : des RNN avec portes qui retiennent l'information long terme — GRU plus léger, souvent équivalent.",
          "`return_sequences=True` : pour empiler plusieurs couches récurrentes ou prédire à chaque pas de temps.",
          "Padding et masking : les séquences de longueurs variables sont complétées (`pad_sequences`) et le padding masqué (`Masking`).",
          "Note : pour le texte moderne, les Transformers ont largement remplacé les RNN — les RNN restent pertinents pour les séries temporelles.",
        ],
      },
    ],
  },
  {
    id: "embeddings",
    title: "Embeddings",
    level: 3,
    intro:
      "Représenter des catégories (mots, utilisateurs, produits) par des vecteurs denses appris.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Embedding pour du texte",
        code: `model = tf.keras.Sequential([\n    tf.keras.layers.Embedding(input_dim=10000, output_dim=64),\n    tf.keras.layers.GlobalAveragePooling1D(),\n    tf.keras.layers.Dense(1, activation="sigmoid"),\n])`,
      },
      {
        kind: "text",
        text: "`Embedding(10000, 64)` : une table de 10 000 vecteurs de dimension 64, apprise pendant l'entraînement. L'entrée est une séquence d'entiers (indices de mots) : la couche les convertit en vecteurs. Les mots de sens proche finissent proches dans l'espace — c'est cette géométrie qui rend les embeddings puissants.",
      },
    ],
  },
  {
    id: "transfer-learning",
    title: "Transfer learning",
    level: 3,
    intro:
      "Partir d'un modèle pré-entraîné plutôt que de zéro : la méthode standard quand les données sont limitées.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Fine-tuning en deux temps",
        code: `base = tf.keras.applications.MobileNetV2(input_shape=(160, 160, 3), include_top=False, weights="imagenet")\nbase.trainable = False  # 1. geler la base, entraîner la tête\n\ninputs = tf.keras.Input(shape=(160, 160, 3))\nx = base(inputs, training=False)\nx = tf.keras.layers.GlobalAveragePooling2D()(x)\noutputs = tf.keras.layers.Dense(5, activation="softmax")(x)\nmodel = tf.keras.Model(inputs, outputs)\n# 2. ensuite : dégeler partiellement avec un learning rate très faible`,
      },
      {
        kind: "list",
        items: [
          "Étape 1 : base gelée, on n'entraîne que la tête de classification — rapide et stable.",
          "Étape 2 (optionnelle) : dégeler les dernières couches de la base avec un learning rate 10× plus faible.",
          "`training=False` sur la base gelée : fige aussi les BatchNorm dans leur état pré-entraîné.",
          "`tf.keras.applications` fournit les architectures classiques avec poids pré-entraînés (MobileNetV2, ResNet50…).",
        ],
      },
    ],
  },
  {
    id: "hyperparametres",
    title: "Réglage des hyperparamètres",
    level: 3,
    intro:
      "Chercher systématiquement plutôt qu'au jugé : l'outil officiel Keras Tuner.",
    blocks: [
      {
        kind: "command",
        label: "Installer Keras Tuner",
        command: "pip install keras-tuner",
        why: "Le tuner officiel de l'écosystème Keras : recherche aléatoire, bayésienne ou Hyperband des hyperparamètres (nombre de neurones, learning rate, dropout).",
        verify: "python -c \"import keras_tuner\"",
      },
      {
        kind: "code",
        language: "python",
        title: "Définir un espace de recherche",
        code: `import keras_tuner as kt\n\ndef build_model(hp):\n    model = tf.keras.Sequential([\n        tf.keras.layers.Dense(hp.Int("units", 32, 256, step=32), activation="relu"),\n        tf.keras.layers.Dropout(hp.Float("dropout", 0.0, 0.5, step=0.1)),\n        tf.keras.layers.Dense(10, activation="softmax"),\n    ])\n    model.compile(optimizer="adam", loss="sparse_categorical_crossentropy")\n    return model\n\ntuner = kt.RandomSearch(build_model, objective="val_accuracy", max_trials=10)\ntuner.search(X_train, y_train, epochs=10, validation_split=0.2)`,
      },
      {
        kind: "text",
        text: "Méthode : tuner sur un budget réduit (peu d'époques, sous-échantillon), avec EarlyStopping, puis réentraîner le meilleur modèle en grand. Le tuning ne compense jamais des données de mauvaise qualité — c'est un affinage, pas une baguette magique.",
      },
    ],
  },
  {
    id: "tensorboard",
    title: "TensorBoard",
    level: 3,
    intro:
      "Visualiser l'entraînement : courbes, graphes, embeddings — l'observabilité du ML.",
    blocks: [
      {
        kind: "command",
        label: "Lancer TensorBoard",
        command: "tensorboard --logdir logs",
        why: "Démarre le serveur web de visualisation sur http://localhost:6006 à partir des logs écrits par le callback TensorBoard pendant `fit()`.",
        verify: "tensorboard --help",
      },
      {
        kind: "list",
        items: [
          "Scalaires : courbes de loss/accuracy train vs validation — le diagnostic visuel du sur-apprentissage.",
          "Graphes : visualiser l'architecture réelle du modèle compilé.",
          "Histogrammes : distribution des poids et gradients par couche au fil des époques.",
          "Comparer les runs : superposer plusieurs expériences pour juger objectivement d'un changement.",
        ],
      },
    ],
  },
  {
    id: "reproductibilite",
    title: "Reproductibilité",
    level: 3,
    intro:
      "Refaire exactement la même expérience : graines, versions, et ce qui reste non déterministe.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Fixer les graines",
        code: `import random\nimport numpy as np\nimport tensorflow as tf\n\nrandom.seed(42)\nnp.random.seed(42)\ntf.random.set_seed(42)`,
      },
      {
        kind: "list",
        items: [
          "Trois graines : Python, NumPy, TensorFlow — l'initialisation des poids et le shuffle en dépendent.",
          "Versions figées : `pip freeze` dans un `requirements.txt` — une version de CUDA différente peut changer les résultats.",
          "Limite : certaines opérations GPU restent non déterministes — la reproductibilité bit-à-bit n'est pas toujours atteignable.",
          "Tracer : noter graine, commit Git, versions et hyperparamètres de chaque run (MLflow ou simple journal).",
        ],
      },
    ],
  },
  {
    id: "tf-function-xla",
    title: "tf.function et XLA",
    level: 3,
    intro:
      "Compiler le Python en graphe optimisé : comprendre quand TensorFlow compile et quand il interprète.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Compiler une fonction",
        code: `@tf.function\ndef ma_fonction(x):\n    return tf.nn.relu(x) @ tf.transpose(x)\n\n# Premier appel : traçage + compilation ; suivants : graphe optimisé\nprint(ma_fonction(tf.ones((4, 4))))`,
      },
      {
        kind: "list",
        items: [
          "`@tf.function` : convertit une fonction Python en graphe TensorFlow — c'est ce que Keras fait en interne pendant `fit()`.",
          "Contrainte : le code tracé doit être « traçable » — les effets de bord Python (print, listes mutées) ne se comportent pas comme en eager.",
          "`jit_compile=True` : active XLA, le compilateur qui fusionne les opérations — gains sensibles sur les gros modèles.",
          "`tf.print()` : l'équivalent de print qui fonctionne dans le graphe.",
        ],
      },
    ],
  },
  {
    id: "debugging-avance",
    title: "Debugging avancé",
    level: 3,
    intro:
      "Quand la loss est NaN et que rien n'est évident : les outils de diagnostic numérique.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Détecter les anomalies numériques",
        code: `tf.debugging.enable_check_numerics()  # lève une erreur dès qu'un NaN/inf apparaît\n\n# Dans une boucle custom :\n# tf.debugging.check_numerics(tensor, "message")`,
      },
      {
        kind: "list",
        items: [
          "`enable_check_numerics()` : instrumente le graphe et signale l'opération exacte qui produit le NaN — le point de départ du diagnostic.",
          "Réduire au minimal : reproduire sur un tiny dataset avec un tiny modèle — si ça échoue là, le bug est dans le code.",
          "Vérifier les données : `tf.reduce_min` / `tf.reduce_max` sur les batches — un inf en entrée contamine tout.",
          "Debugger pas à pas : exécuter en eager (sans `@tf.function`) pour utiliser le débogueur Python normal.",
        ],
      },
    ],
  },
  {
    id: "tf-serving",
    title: "TF Serving : servir en production",
    level: 3,
    intro:
      "Exposer un modèle entraîné via API : le serveur de déploiement de l'écosystème TensorFlow.",
    blocks: [
      {
        kind: "diagram",
        title: "Architecture TF Serving",
        lines: [
          "Modèle entraîné (.keras)",
          "     │  export SavedModel",
          "     ▼",
          "TF Serving (serveur C++, gRPC + REST)",
          "     │  versioning : plusieurs versions cohabitent",
          "     │  batching : regroupe les requêtes",
          "     ▼",
          "Clients → POST /v1/models/mon_modele:predict",
        ],
      },
      {
        kind: "list",
        items: [
          "Export : `model.export(\"export/\")` produit le SavedModel consommé par TF Serving.",
          "Versioning : chaque version dans un sous-dossier numéroté — rollback en changeant de version.",
          "API REST : prédiction via HTTP POST avec le tenseur d'entrée en JSON — simple à intégrer.",
          "Alternative légère : servir avec FastAPI + `load_model()` quand le volume ne justifie pas TF Serving.",
        ],
      },
    ],
  },
  {
    id: "tf-lite",
    title: "TF Lite : mobile et embarqué",
    level: 3,
    intro:
      "Faire tourner un modèle sur téléphone ou microcontrôleur : conversion et optimisation.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Convertir vers TF Lite",
        code: `converter = tf.lite.TFLiteConverter.from_saved_model("export/")\nconverter.optimizations = [tf.lite.Optimize.DEFAULT]  # quantification\ntflite_model = converter.convert()\nwith open("modele.tflite", "wb") as f:\n    f.write(tflite_model)`,
      },
      {
        kind: "list",
        items: [
          "Quantification : passer les poids en 8 bits — modèle ~4× plus petit, inférence plus rapide, légère perte de précision.",
          "Inférence : l'interpréteur TF Lite exécute le `.tflite` sur Android, iOS ou microcontrôleur.",
          "Contraintes : toutes les opérations ne sont pas supportées en Lite — vérifier la compatibilité avant de viser le mobile.",
          "Évaluer après conversion : mesurer la précision du modèle quantifié, pas seulement celle du modèle d'origine.",
        ],
      },
    ],
  },
  {
    id: "formats-export",
    title: "Formats d'export et interopérabilité",
    level: 3,
    intro:
      "Choisir le bon format selon la cible : `.keras`, SavedModel, TF Lite, ONNX.",
    blocks: [
      {
        kind: "table",
        headers: ["Format", "Contenu", "Cible"],
        rows: [
          ["`.keras`", "Architecture + poids + état optimiseur", "Reprise d'entraînement, partage simple"],
          ["SavedModel", "Graphe + signatures", "TF Serving, TF Lite (via conversion)"],
          ["TF Lite (`.tflite`)", "Graphe optimisé/quantifié", "Mobile, embarqué, navigateurs"],
          ["ONNX", "Graphe standard interopérable", "Exécution hors écosystème TF (ONNX Runtime)"],
        ],
      },
      {
        kind: "text",
        text: "Règle : `.keras` pour itérer, SavedModel pour servir, `.tflite` pour l'embarqué. Chaque conversion est une étape à valider : exporter puis réévaluer le modèle exporté avant de le mettre en production.",
      },
    ],
  },
  {
    id: "monitoring-derive",
    title: "Monitoring et dérive",
    level: 3,
    intro:
      "Un modèle en production se dégrade : surveiller les entrées, les prédictions et la performance.",
    blocks: [
      {
        kind: "list",
        items: [
          "Dérive des données : la distribution des entrées change (nouveaux clients, saisonnalité) — le modèle entraîné sur l'ancien monde se trompe.",
          "Signaux : distribution des prédictions, taux d'erreur métier, latence d'inférence, volume de requêtes.",
          "Stratégie : logger un échantillon des entrées/prédictions, comparer périodiquement aux données d'entraînement.",
          "Réentraînement : planifié (chaque mois) ou déclenché (seuil de dérive) — jamais « une fois pour toutes ».",
          "Rollback : garder la version précédente déployable — un nouveau modèle peut être pire que l'ancien.",
        ],
      },
    ],
  },
  {
    id: "securite-ml",
    title: "Sécurité des modèles",
    level: 3,
    intro:
      "Les risques propres au ML : entrées adverses, modèles téléchargés, exposition des données.",
    blocks: [
      {
        kind: "list",
        items: [
          "Valider les entrées : forme, plage, type — une image mal formée ne doit jamais faire crasher le service.",
          "Modèles tiers : un `.keras` téléchargé peut contenir du code arbitraire (désérialisation) — ne charger que depuis des sources de confiance.",
          "Exemples adverses : des perturbations invisibles peuvent tromper un classifieur — à connaître pour les usages sensibles.",
          "Confidentialité : un modèle peut mémoriser ses données d'entraînement — attention aux données personnelles.",
          "Rate limiting : une API de prédiction publique sans limite est une invitation au scraping et au déni de service.",
        ],
      },
    ],
  },
  {
    id: "cas-d-usage",
    title: "Cas d'usage : où TensorFlow brille",
    level: 3,
    intro:
      "Choisir TensorFlow en connaissance de cause : ses terrains de prédilection factuels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Production industrialisée : TF Serving, versioning, batching — la chaîne de déploiement la plus complète.",
          "Mobile et embarqué : TF Lite est la voie standard pour l'inférence sur appareil.",
          "Écosystème Google : intégration naturelle avec Google Cloud (TPU, Vertex AI).",
          "Pipelines : TFX pour des pipelines ML de bout en bout versionnés.",
          "Recherche exploratoire : PyTorch y est souvent plus direct — le choix dépend de l'objectif, pas d'une supériorité absolue.",
        ],
      },
    ],
  },
  {
    id: "performance-inference",
    title: "Performance d'inférence",
    level: 3,
    intro:
      "Servir vite : les leviers qui comptent vraiment en production.",
    blocks: [
      {
        kind: "list",
        items: [
          "Batching : regrouper les requêtes — le débit GPU explose avec des batchs, la latence individuelle augmente légèrement.",
          "Quantification : inférence en int8 — plus rapide, modèle plus petit.",
          "XLA : compiler le graphe d'inférence (`jit_compile`) pour fusionner les opérations.",
          "Prétraitement : souvent le vrai goulot — le profiler avant d'optimiser le modèle.",
          "Mesurer : latence p50/p99 et débit, pas des moyennes — la p99 décide de l'expérience utilisateur.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes-avancees",
    title: "Erreurs courantes (avancé)",
    level: 3,
    intro:
      "Les pièges qui survivent aux débuts : subtils, coûteux, et fréquents en production.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Fuite de données (data leakage)",
            value:
              "Des informations du test contaminent l'entraînement : normalisation sur tout le dataset, features calculées avec le futur. Le score est excellent et le modèle inutile. Audit : refaire le split strictement avant tout prétraitement.",
          },
          {
            label: "Prétraitement différent train/inférence",
            value:
              "Le modèle de production ne reçoit pas les mêmes transformations qu'à l'entraînement. Solution : intégrer le prétraitement dans le modèle (couches de prétraitement Keras) ou figer un pipeline unique.",
          },
          {
            label: "Métrique trompeuse",
            value:
              "99 % d'accuracy sur un dataset à 99 % de classe majoritaire = modèle qui prédit toujours la même chose. Choisir la métrique selon le coût des erreurs (rappel, précision, F1).",
          },
          {
            label: "Seed non fixée en production",
            value:
              "Deux entraînements « identiques » donnent deux modèles différents. Fixer les graines et versionner les données.",
          },
          {
            label: "Oublier training=False en inférence",
            value:
              "Dropout/BatchNorm en mode entraînement pendant la prédiction : des résultats instables. `model.predict()` gère ça, mais pas un appel manuel sans le flag.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro:
      "La checklist d'un projet TensorFlow professionnel, de l'expérience au déploiement.",
    blocks: [
      {
        kind: "list",
        items: [
          "Commencer simple : un petit modèle qui tourne de bout en bout avant tout raffinement.",
          "Baseline toujours : comparer chaque modèle à une référence triviale.",
          "Découpage strict : train/validation/test, test utilisé une seule fois.",
          "Tracer chaque run : hyperparamètres, graine, versions, métriques.",
          "Valider l'export : réévaluer le modèle converti (SavedModel, TFLite), pas seulement l'original.",
          "Surveiller en production : dérive, latence, erreurs — avec un plan de rollback.",
          "Versionner données et code : un modèle n'est reproductible que si ses entrées le sont.",
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
          { label: "Guides", value: "tensorflow.org : guides Keras (Sequential, fonctionnelle, subclassing), tf.data, distribution." },
          { label: "Référence API", value: "tensorflow.org/api_docs : la référence exhaustive de chaque classe et fonction." },
          { label: "Keras", value: "keras.io : guides et exemples de l'API haut niveau." },
          { label: "Dépôt", value: "Le dépôt GitHub tensorflow/tensorflow : code source, issues, exemples." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les tutoriels officiels (classification d'images, texte) exécutés puis modifiés.",
          "Communauté : forums et Stack Overflow pour les erreurs précises — avec versions exactes dans la question.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "TensorFlow maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir le deep learning : architectures avancées, théorie de l'optimisation.",
          "Découvrir PyTorch : le second framework majeur, dominant en recherche.",
          "Explorer les Transformers : l'architecture derrière les LLMs modernes.",
          "Industrialiser : MLOps — versioning, CI/CD, monitoring des modèles.",
          "Revenir à la roadmap : valider TensorFlow et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

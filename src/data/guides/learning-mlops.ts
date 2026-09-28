import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du MLOps : industrialiser le machine learning,
 * du notebook au modèle en production surveillé.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_MLOPS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est le MLOps, pourquoi il existe et ce qu'il change par rapport au machine learning classique.",
    blocks: [
      {
        kind: "text",
        text: "Le MLOps (Machine Learning Operations) applique les pratiques du DevOps au machine learning : versionner le code, les données et les modèles, automatiser les pipelines d'entraînement, déployer de façon reproductible et surveiller les modèles en production.",
      },
      {
        kind: "text",
        text: "Pourquoi le MLOps existe : un modèle entraîné dans un notebook n'est pas un produit. Entre le notebook et la production se posent des questions que le ML classique ignore : comment reproduire exactement cet entraînement dans six mois ? Quelle version du modèle tourne actuellement ? Que faire quand les données réelles changent et que les performances chutent ? Le MLOps répond à ces questions avec des processus et des outils, pas avec de la discipline individuelle.",
      },
      {
        kind: "text",
        text: "La différence avec le DevOps : le DevOps versionne du code déterministe — le même code produit le même comportement. Le ML ajoute deux dimensions non déterministes : les données (qui évoluent) et l'entraînement (aléatoire, coûteux). Le MLOps étend donc le DevOps au versionnement des données, au suivi des expériences et à la surveillance de la dérive.",
      },
    ],
  },
  {
    id: "panorama-mlops",
    title: "Le MLOps en une image",
    level: 1,
    intro:
      "Le cycle de vie complet d'un modèle, du code au réentraînement.",
    blocks: [
      {
        kind: "diagram",
        title: "Le cycle de vie MLOps",
        lines: [
          "CODE (git)",
          "   │",
          "   ▼",
          "DONNÉES versionnées (DVC) ──► ENTRAÎNEMENT suivi (MLflow)",
          "   │",
          "   ▼",
          "REGISTRY (quel modèle, quelles métriques, quels artefacts)",
          "   │",
          "   ├──► DÉPLOIEMENT (Docker, Kubernetes, API)",
          "   │",
          "   ▼",
          "MONITORING (performances, dérive des données)",
          "   │",
          "   └──► RÉENTRAÎNEMENT quand la dérive dépasse un seuil",
          "            ▲",
          "            └──────────────────────────────┘",
        ],
      },
      {
        kind: "list",
        items: [
          "Tout est versionné : code, données, hyperparamètres, artefacts, environnement.",
          "Chaque modèle en production est traçable : on sait exactement comment il a été produit.",
          "Le monitoring ferme la boucle : la production pilote le réentraînement.",
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
      "Le MLOps industrialise un savoir-faire ML : sans les bases ci-dessous, les outils n'ont rien à industrialiser.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut maîtriser avant",
        fields: [
          {
            label: "Machine learning",
            value:
              "Le cycle entraînement / validation / test, les métriques (accuracy, F1, RMSE selon le cas), le surapprentissage. Le MLOps orchestre ce cycle : il faut l'avoir pratiqué à la main d'abord.",
          },
          {
            label: "Python",
            value:
              "Écrire et lire du Python courant : les pipelines MLOps sont du code Python qui entraîne, évalue et déploie.",
          },
          {
            label: "Git",
            value:
              "Commits, branches, tags : le versionnement du code est le socle. Le MLOps ajoute le versionnement des données et des modèles par-dessus.",
          },
          {
            label: "Docker",
            value:
              "Construire une image et lancer un conteneur : c'est le format standard pour empaqueter un modèle et son environnement.",
          },
          {
            label: "Linux / terminal",
            value:
              "Naviguer, manipuler des fichiers, lire des logs : les pipelines et les serveurs vivent en ligne de commande.",
          },
        ],
      },
      {
        kind: "text",
        text: "Ordre conseillé : si le machine learning est fragile, consolidez-le d'abord (la roadmap le couvre) ; si Git ou Docker manquent, le MLOps sera une collection d'outils incompréhensibles. Chaque prérequis est cliquable dans la roadmap.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation des outils",
    level: 2,
    intro:
      "Installer le duo de base du MLOps local : MLflow (suivi d'expériences) et DVC (versionnement des données).",
    blocks: [
      {
        kind: "command",
        label: "Installer MLflow",
        command: "pip install mlflow",
        why: "MLflow est l'outil open source de référence pour suivre les expériences ML : paramètres, métriques et artefacts de chaque entraînement, avec une interface web de comparaison. L'installer via pip le rend disponible en ligne de commande (`mlflow`) et en bibliothèque Python.",
        verify: "mlflow --version",
      },
      {
        kind: "command",
        label: "Lancer l'interface MLflow",
        command: "mlflow ui --port 5000",
        why: "Démarre le serveur web MLflow sur le port 5000 : c'est là que vous comparerez les runs (courbes de métriques, paramètres, artefacts). En local, il stocke tout dans `./mlruns` — suffisant pour apprendre, à remplacer par un stockage partagé en équipe.",
        verify: "curl -s http://localhost:5000 | head -c 100",
      },
      {
        kind: "command",
        label: "Installer DVC",
        command: "pip install dvc",
        why: "DVC (Data Version Control) versionne les données et les modèles comme Git versionne le code : un petit fichier pointeur est commité dans Git, les gros fichiers partent vers un stockage distant (S3, disque, etc.). Sans lui, impossible de reproduire un entraînement dont les données ont changé.",
        verify: "dvc --version",
      },
    ],
  },
  {
    id: "dvc-premier-versionnement",
    title: "Versionner des données avec DVC",
    level: 2,
    intro:
      "Le geste fondateur du MLOps : lier une version des données à une version du code.",
    blocks: [
      {
        kind: "command",
        label: "Initialiser DVC dans un dépôt Git",
        command: "dvc init",
        why: "Crée le dossier `.dvc/` et la configuration dans un dépôt Git existant. À partir de là, DVC peut suivre des fichiers de données volumineux que Git ne doit pas contenir directement.",
        verify: "ls .dvc",
      },
      {
        kind: "command",
        label: "Ajouter un jeu de données au suivi",
        command: "dvc add data/dataset.csv",
        why: "DVC calcule l'empreinte du fichier, le déplace dans son cache et crée `data/dataset.csv.dvc` — un petit fichier texte à committer dans Git. Le CSV original devient reproductible : `dvc pull` le restaurera à l'identique.",
        verify: "ls data/dataset.csv.dvc",
      },
      {
        kind: "command",
        label: "Commiter le pointeur dans Git",
        command: "git add data/dataset.csv.dvc .gitignore && git commit -m \"Suivi du jeu de données v1\"",
        why: "Git versionne le pointeur (quelques lignes), DVC garde le contenu. Résultat : `git checkout` + `dvc checkout` restaure le couple exact code + données d'une époque donnée. C'est la reproductibilité.",
      },
      {
        kind: "text",
        text: "Retenez le schéma : Git pour le petit et le textuel (code, pointeurs), DVC pour le gros et le binaire (données, modèles). Les deux avancent ensemble, commit par commit.",
      },
    ],
  },
  {
    id: "mlflow-premier-tracking",
    title: "Suivre sa première expérience",
    level: 2,
    intro:
      "Enregistrer paramètres, métriques et modèle d'un entraînement avec MLflow, en quelques lignes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Écrire le script d'entraînement",
            detail:
              "Un script Python classique qui charge des données, entraîne un modèle scikit-learn et calcule une métrique. Rien de MLOps pour l'instant : c'est volontaire.",
          },
          {
            title: "Encadrer avec mlflow.start_run()",
            detail:
              "Le bloc `with mlflow.start_run():` ouvre un 'run' : tout ce qui est loggé entre l'entrée et la sortie lui est rattaché (horodatage, paramètres, métriques, artefacts).",
          },
          {
            title: "Logger paramètres et métriques",
            detail:
              "`mlflow.log_param('n_estimators', 100)` enregistre les hyperparamètres, `mlflow.log_metric('accuracy', 0.93)` les résultats. Chaque run devient comparable aux autres.",
          },
          {
            title: "Logger le modèle",
            detail:
              "`mlflow.sklearn.log_model(model, 'model')` sauvegarde le modèle entraîné comme artefact du run. Le modèle n'est plus un fichier perdu dans un dossier : il est attaché à son expérience.",
          },
          {
            title: "Comparer dans l'interface",
            detail:
              "Ouvrez `http://localhost:5000` : les runs s'affichent en tableau, triables par métrique. Cliquez pour voir paramètres, artefacts et code associé.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "train.py — entraînement suivi par MLflow",
        code: "import mlflow\nimport mlflow.sklearn\nfrom sklearn.datasets import load_iris\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score\n\nX, y = load_iris(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)\n\nwith mlflow.start_run():\n    mlflow.log_param(\"n_estimators\", 100)\n    mlflow.log_param(\"random_state\", 42)\n    model = RandomForestClassifier(n_estimators=100, random_state=42)\n    model.fit(X_train, y_train)\n    acc = accuracy_score(y_test, model.predict(X_test))\n    mlflow.log_metric(\"accuracy\", acc)\n    mlflow.sklearn.log_model(model, \"model\")\n    print(f\"accuracy = {acc:.3f}\")",
      },
    ],
  },
  {
    id: "environnement-developpement",
    title: "Environnement de développement",
    level: 2,
    intro:
      "Les couches d'un poste de travail MLOps et comment elles s'articulent.",
    blocks: [
      {
        kind: "diagram",
        title: "La chaîne MLOps locale",
        lines: [
          "Poste de travail (Linux/macOS/Windows + terminal)",
          "      ↓",
          "Python + venv (isoler les dépendances du projet)",
          "      ↓",
          "Git (code) + DVC (données et modèles)",
          "      ↓",
          "MLflow local (suivi des expériences, http://localhost:5000)",
          "      ↓",
          "Docker (empaqueter modèle + dépendances)",
          "      ↓",
          "Registry distant + CI (partager, tester, déployer)",
        ],
      },
      {
        kind: "text",
        text: "En local, tout tient sur une machine : venv Python, MLflow en fichier local, DVC vers un dossier. En équipe, chaque couche devient partagée : serveur MLflow avec base SQL, stockage DVC distant (S3 ou équivalent), registry de modèles central, CI qui rejoue les pipelines. La logique reste la même, seule l'échelle change.",
      },
    ],
  },
  {
    id: "outils-panorama",
    title: "Panorama des outils",
    level: 2,
    intro:
      "Les outils que vous croiserez, avec leur rôle exact — sans les confondre.",
    blocks: [
      {
        kind: "fields",
        title: "Suivi et versionnement",
        fields: [
          {
            label: "MLflow",
            value:
              "Suivi d'expériences (tracking), packaging de modèles et registre de modèles. Open source, le standard de fait pour commencer.",
          },
          {
            label: "DVC",
            value:
              "Versionnement des données et des modèles adossé à Git. Léger, fonctionne avec n'importe quel stockage.",
          },
          {
            label: "Weights & Biases",
            value:
              "Plateforme managée de suivi d'expériences, très utilisée en recherche. Alternative à MLflow quand on veut du clé en main.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Orchestration de pipelines",
        fields: [
          {
            label: "Airflow",
            value:
              "Ordonnanceur de workflows généraliste (DAGs Python) : planifier entraînement, validation, déploiement. Écosystème immense, courbe d'apprentissage réelle.",
          },
          {
            label: "Kubeflow",
            value:
              "Plateforme ML sur Kubernetes : pipelines, entraînement distribué, serving. Puissant, mais suppose déjà Kubernetes.",
          },
          {
            label: "DVC pipelines",
            value:
              "Des pipelines légers décrits dans `dvc.yaml`, versionnés avec le code. Le bon premier pas avant Airflow/Kubeflow.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Déploiement et supervision",
        fields: [
          {
            label: "Docker",
            value:
              "Empaqueter le modèle servi par une API avec ses dépendances exactes : l'unité de déploiement standard.",
          },
          {
            label: "Kubernetes",
            value:
              "Orchestrer les conteneurs en production : scaling, rolling updates, health checks. Le socle du serving à l'échelle.",
          },
          {
            label: "Prometheus + Grafana",
            value:
              "Collecter des métriques (latence, taux d'erreur, dérive) et les visualiser en dashboards avec alertes.",
          },
          {
            label: "Evidently",
            value:
              "Bibliothèque open source de calcul de dérive et de qualité des données : rapports HTML comparant données d'entraînement et données live.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Workflow quotidien",
    level: 2,
    intro:
      "À quoi ressemble une journée de travail MLOps sur un projet réel.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Synchroniser code et données",
            detail:
              "`git pull` puis `dvc pull` : récupérer la dernière version du code ET des données. Travailler sur un couple incohérent est la première source d'expériences non reproductibles.",
          },
          {
            title: "Expérimenter dans une branche",
            detail:
              "Créer une branche Git pour l'idée du jour (nouveau modèle, nouveaux hyperparamètres). Les runs MLflow sont taggés avec le commit : chaque résultat est rattaché à un état exact du code.",
          },
          {
            title: "Lancer l'entraînement suivi",
            detail:
              "Exécuter le pipeline : paramètres, métriques et artefacts partent dans MLflow. Pas de résultat noté à la main dans un tableur — le tracking est automatique ou il n'existe pas.",
          },
          {
            title: "Comparer et décider",
            detail:
              "Dans l'interface MLflow, comparer le nouveau run au modèle en production (même jeu de validation, mêmes métriques). On ne promeut que ce qui bat la référence de façon significative.",
          },
          {
            title: "Enregistrer le candidat",
            detail:
              "Le modèle retenu est enregistré dans le model registry avec un tag de version. Le déploiement (manuel d'abord, CI ensuite) le sert via l'API.",
          },
          {
            title: "Vérifier le monitoring",
            detail:
              "Consulter les dashboards : latence, taux d'erreur, dérive des features. Un modèle qui se dégrade en silence est pire qu'un modèle qui plante.",
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
      "Quatre projets de difficulté croissante pour ancrer chaque couche.",
    blocks: [
      {
        kind: "fields",
        title: "Par où commencer, dans l'ordre",
        fields: [
          {
            label: "1. Tracking d'un entraînement existant",
            value:
              "Reprendre un notebook ou script ML existant et y ajouter MLflow : params, métriques, modèle loggé. Objectif : ne plus jamais perdre un résultat.",
          },
          {
            label: "2. Données versionnées avec DVC",
            value:
              "Mettre un jeu de données sous DVC, simuler une v2 des données, montrer que l'ancien modèle se réentraîne à l'identique via `dvc checkout`. Objectif : comprendre la reproductibilité.",
          },
          {
            label: "3. API Docker du meilleur modèle",
            value:
              "Exporter le meilleur run MLflow, l'emballer dans une image Docker servant des prédictions via HTTP. Objectif : passer du fichier `.pkl` au service.",
          },
          {
            label: "4. Pipeline + monitoring simulé",
            value:
              "Chaîner entraînement → évaluation → enregistrement dans un script ou un pipeline DVC, puis simuler une dérive des données et la détecter. Objectif : boucler le cycle complet.",
          },
        ],
      },
    ],
  },
  {
    id: "glossaire-mlops",
    title: "Glossaire express",
    level: 2,
    intro:
      "Les huit termes qui reviennent partout, en une phrase chacun.",
    blocks: [
      {
        kind: "fields",
        title: "Vocabulaire",
        fields: [
          { label: "Run", value: "Une exécution d'entraînement : paramètres + métriques + artefacts, horodatés et comparables." },
          { label: "Artefact", value: "Tout fichier produit par un run : modèle sérialisé, graphiques, jeux de validation." },
          { label: "Model registry", value: "Le catalogue des versions de modèles : staging, production, archivé — avec leur lignée." },
          { label: "Drift (dérive)", value: "L'écart entre les données d'entraînement et les données réelles : quand il grandit, le modèle se trompe plus." },
          { label: "Pipeline", value: "Une séquence automatisée d'étapes (ingestion → entraînement → validation → déploiement) rejouable à l'identique." },
          { label: "Champion / challenger", value: "Le modèle en production (champion) contre son remplaçant potentiel (challenger) : on ne remplace qu'avec des preuves." },
          { label: "Serving", value: "L'action de servir des prédictions : API temps réel, batch, ou embarqué." },
          { label: "Lineage (lignée)", value: "La traçabilité complète : quelles données, quel code, quels paramètres ont produit ce modèle." },
        ],
      },
    ],
  },
  {
    id: "quand-pas-de-mlops",
    title: "Quand ne pas faire de MLOps",
    level: 2,
    intro:
      "Le MLOps a un coût : savoir quand il n'est pas rentable.",
    blocks: [
      {
        kind: "list",
        items: [
          "Prototype jetable : si le modèle ne dépassera jamais le notebook de démonstration, MLflow seul suffit — pas de pipeline ni de registry.",
          "Modèle entraîné une fois pour toujours : un modèle figé sur des données stables (ex. un classifieur entraîné une fois) n'a pas besoin de réentraînement automatisé.",
          "Équipe d'une personne, usage interne : un script versionné + un modèle loggé dans MLflow couvrent 80 % du besoin.",
          "En revanche, dès qu'il y a des utilisateurs réels, des données qui bougent ou une équipe : l'absence de MLOps se paie en incidents impossibles à diagnostiquer.",
        ],
      },
      {
        kind: "text",
        text: "Règle pratique : commencez par le tracking (MLflow), ajoutez le versionnement des données (DVC) quand la reproductibilité devient un problème, puis l'automatisation quand les déploiements manuels deviennent risqués. Le MLOps se construit par couches, pas en une fois.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "experiment-tracking-avance",
    title: "Experiment tracking avancé",
    level: 3,
    intro:
      "Bien suivre ses expériences : conventions de nommage, comparaison rigoureuse, artefacts utiles.",
    blocks: [
      {
        kind: "text",
        text: "Un tracking utile repose sur des conventions : nommer les runs (`baseline-rf-v3`, pas `run-12`), tagger le commit Git, figer le jeu de validation (mêmes données pour tous les runs comparés). Sans jeu de validation figé, comparer deux runs n'a aucun sens — on compare des chiffres calculés sur des données différentes.",
      },
      {
        kind: "list",
        items: [
          "Logger aussi l'environnement : versions des bibliothèques (`pip freeze`), seed aléatoire, commit Git.",
          "Stocker les courbes d'apprentissage et matrices de confusion en artefacts, pas seulement les métriques finales.",
          "Un run sans code versionné associé est une anecdote, pas une expérience.",
          "Comparer champion vs challenger sur le même jeu de test tenu à l'écart, jamais touché pendant l'entraînement.",
        ],
      },
    ],
  },
  {
    id: "pipelines-orchestration",
    title: "Pipelines et orchestration",
    level: 3,
    intro:
      "Transformer une suite de scripts en pipeline reproductible et planifiable.",
    blocks: [
      {
        kind: "diagram",
        title: "Un pipeline d'entraînement typique",
        lines: [
          "ingest (récupérer les données brutes)",
          "   │",
          "   ▼",
          "validate (schéma, valeurs aberrantes, volumes)",
          "   │",
          "   ▼",
          "preprocess (nettoyage, features)",
          "   │",
          "   ▼",
          "train (entraînement suivi dans MLflow)",
          "   │",
          "   ▼",
          "evaluate (métriques vs champion sur jeu figé)",
          "   │",
          "   ├──► register (si meilleur : registry, tag candidat)",
          "   │",
          "   └──► alerte (si régression : on ne déploie pas)",
        ],
      },
      {
        kind: "fields",
        title: "Trois niveaux d'orchestration",
        fields: [
          {
            label: "Scripts + DVC (`dvc.yaml`)",
            value:
              "Déclare les étapes et leurs dépendances dans un fichier versionné ; `dvc repro` ne rejoue que ce qui a changé. Idéal pour un projet solo ou une petite équipe.",
          },
          {
            label: "Airflow",
            value:
              "DAGs Python planifiés (tous les jours à 2h, par exemple), retries automatiques, interface de supervision. Le standard quand plusieurs pipelines tournent en production.",
          },
          {
            label: "Kubeflow Pipelines",
            value:
              "Pipelines conteneurisés sur Kubernetes, avec composants réutilisables et entraînement distribué. Puissant mais exigeant : à réserver aux équipes déjà sur Kubernetes.",
          },
        ],
      },
      {
        kind: "text",
        text: "Point clé : un pipeline doit être idempotent — le relancer deux fois avec les mêmes entrées produit le même résultat, sans doublons ni effets de bord. C'est ce qui permet de le planifier en confiance.",
      },
    ],
  },
  {
    id: "model-registry",
    title: "Model registry en détail",
    level: 3,
    intro:
      "Le registre est la source de vérité : quel modèle est où, avec quelles preuves.",
    blocks: [
      {
        kind: "fields",
        title: "Cycle de vie d'une version",
        fields: [
          { label: "None / staging", value: "Version candidate : enregistrée avec ses métriques, en attente de validation." },
          { label: "Production", value: "La version servie aux utilisateurs. Une seule à la fois (ou un routage explicite en cas de champion/challenger)." },
          { label: "Archived", value: "Anciennes versions : conservées pour audit et rollback, jamais servies." },
        ],
      },
      {
        kind: "text",
        text: "Chaque transition (staging → production) doit être un acte explicite et tracé : qui a promu, quand, sur la base de quelles métriques. Le registry MLflow gère ces étapes nativement. En cas d'incident, le rollback consiste à repointer le serving vers la version précédente — en minutes, pas en heures.",
      },
    ],
  },
  {
    id: "drift-donnees",
    title: "Dérive des données : data drift vs concept drift",
    level: 3,
    intro:
      "La raison d'être du monitoring : les modèles se dégradent quand le monde change.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Data drift", "Concept drift"],
        rows: [
          ["Ce qui change", "La distribution des features en entrée (ex. l'âge moyen des utilisateurs augmente)", "La relation entre features et cible (ex. ce qui prédisait l'achat ne le prédit plus)"],
          ["Détection", "Comparer les distributions : tests statistiques, rapports Evidently", "Baisse des métriques métier sur données labellisées récentes"],
          ["Exemple", "Un capteur remplacé envoie des valeurs sur une autre échelle", "Un changement de comportement d'achat après une crise"],
          ["Remède", "Souvent : réentraîner sur données récentes", "Réentraîner, voire repenser les features ou le modèle"],
        ],
      },
      {
        kind: "text",
        text: "Le data drift se détecte sans labels (on compare des distributions d'entrées), le concept drift exige des labels récents (on mesure la performance réelle). En pratique, on surveille les deux : le premier comme signal précoce, le second comme vérité terrain.",
      },
    ],
  },
  {
    id: "evaluation-avant-deploiement",
    title: "Évaluer avant de déployer",
    level: 3,
    intro:
      "La porte de sortie du pipeline : ce qui autorise (ou interdit) la mise en production.",
    blocks: [
      {
        kind: "fields",
        title: "Les contrôles d'une promotion",
        fields: [
          {
            label: "Jeu de validation figé",
            value:
              "Le challenger est évalué sur exactement les mêmes données que le champion. Changer le jeu de test entre deux comparaisons invalide la comparaison.",
          },
          {
            label: "Seuil de supériorité",
            value:
              "Exiger un gain significatif, pas un bruit statistique (+0,1 % d'accuracy sur 200 exemples ne veut rien dire). Définir le seuil à l'avance, par métrique.",
          },
          {
            label: "Tests de non-régression",
            value:
              "Un jeu de cas critiques métier (exemples sensibles, cas limites connus) que le nouveau modèle doit passer. Les métriques globales masquent les régressions locales.",
          },
          {
            label: "Validation humaine",
            value:
              "Pour les premières mises en production, une revue humaine des prédictions sur un échantillon. L'automatisation totale vient après, pas avant.",
          },
        ],
      },
    ],
  },
  {
    id: "strategies-deploiement",
    title: "Stratégies de déploiement",
    level: 3,
    intro:
      "Quatre façons de mettre un modèle en production, du plus prudent au plus direct.",
    blocks: [
      {
        kind: "table",
        headers: ["Stratégie", "Principe", "Quand l'utiliser"],
        rows: [
          ["Shadow", "Le nouveau modèle reçoit le trafic réel mais ses prédictions sont ignorées (juste loggées)", "Première exposition d'un modèle risqué : mesurer sans impacter les utilisateurs"],
          ["Canary", "Une petite fraction du trafic (1-5 %) va au nouveau modèle", "Valider en conditions réelles avec un blast radius limité"],
          ["Blue/green", "Deux environnements identiques ; on bascule tout le trafic d'un coup, rollback instantané", "Déploiements fréquents avec besoin de rollback immédiat"],
          ["Rolling", "Remplacement progressif des instances une par une", "Le défaut Kubernetes ; simple, sans infrastructure double"],
        ],
      },
      {
        kind: "text",
        text: "En ML, le shadow deployment est particulièrement précieux : il permet de mesurer la dérive et les performances du challenger sur du vrai trafic avant de lui confier la moindre décision.",
      },
    ],
  },
  {
    id: "cicd-pour-ml",
    title: "CI/CD appliqué au ML",
    level: 3,
    intro:
      "Ce que la CI teste quand l'artefact est un modèle, pas juste du code.",
    blocks: [
      {
        kind: "diagram",
        title: "Pipeline CI pour un projet ML",
        lines: [
          "push / pull request",
          "   │",
          "   ▼",
          "1. Lint + tests unitaires du code (comme en DevOps)",
          "   │",
          "   ▼",
          "2. Validation des données (schéma, volumes, valeurs)",
          "   │",
          "   ▼",
          "3. Entraînement sur échantillon (smoke train rapide)",
          "   │",
          "   ▼",
          "4. Évaluation vs baseline (pas de régression)",
          "   │",
          "   ▼",
          "5. Build de l'image Docker de serving",
          "   │",
          "   ▼",
          "merge → CD : déploiement (staging puis production)",
        ],
      },
      {
        kind: "text",
        text: "La différence avec une CI classique : les étapes 2 à 4 portent sur les données et le modèle. Le 'smoke train' (entraînement rapide sur un échantillon) vérifie que le pipeline fonctionne sans payer un entraînement complet à chaque commit — l'entraînement complet reste planifié (nuit, semaine) ou déclenché manuellement.",
      },
    ],
  },
  {
    id: "dockeriser-modele",
    title: "Dockeriser un modèle",
    level: 3,
    intro:
      "Empaqueter le modèle et son API dans une image reproductible.",
    blocks: [
      {
        kind: "code",
        language: "dockerfile",
        title: "Dockerfile — servir un modèle via une API",
        code: "FROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY app.py model.pkl ./\nEXPOSE 8000\nCMD [\"uvicorn\", \"app:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]",
      },
      {
        kind: "command",
        label: "Construire l'image de serving",
        command: "docker build -t iris-api:1.0 .",
        why: "Construit l'image `iris-api` taggée `1.0` : le tag correspond à la version du modèle du registry. L'image fige Python, les dépendances et le modèle — le même artefact tourne en dev, staging et production.",
        verify: "docker images iris-api",
      },
      {
        kind: "command",
        label: "Tester l'image en local",
        command: "docker run -p 8000:8000 iris-api:1.0",
        why: "Lance le conteneur en reliant le port 8000 : on teste exactement ce qui sera déployé, pas une approximation. Si ça répond en local, la cause d'un échec en production est ailleurs (config, réseau, données).",
        verify: "curl -s http://localhost:8000/health",
      },
    ],
  },
  {
    id: "api-serving",
    title: "Servir des prédictions via API",
    level: 3,
    intro:
      "Le contrat minimal d'une API de prédiction : charger une fois, prédire vite, échouer proprement.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "app.py — API de prédiction (FastAPI)",
        code: "from fastapi import FastAPI\nimport joblib\n\napp = FastAPI()\nmodel = joblib.load(\"model.pkl\")  # chargé une fois au démarrage\n\n@app.get(\"/health\")\ndef health():\n    return {\"status\": \"ok\", \"model_version\": \"1.0\"}\n\n@app.post(\"/predict\")\ndef predict(payload: dict):\n    features = payload[\"features\"]\n    prediction = model.predict([features])\n    return {\"prediction\": int(prediction[0])}",
      },
      {
        kind: "list",
        items: [
          "Charger le modèle au démarrage, jamais à chaque requête : le chargement est l'opération la plus coûteuse.",
          "Exposer `/health` : les orchestrateurs (Kubernetes) s'en servent pour les health checks.",
          "Valider les entrées (schéma, dimensions, types) : une feature manquante ne doit pas faire planter le service.",
          "Logger chaque prédiction (features hashées + résultat) : c'est la matière première du monitoring de dérive.",
        ],
      },
    ],
  },
  {
    id: "kubernetes-serving",
    title: "Déployer sur Kubernetes",
    level: 3,
    intro:
      "Passer du conteneur local au service scalable : le manifeste minimal.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "k8s/deployment.yaml — déploiement du modèle",
        code: "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: iris-api\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: iris-api\n  template:\n    metadata:\n      labels:\n        app: iris-api\n    spec:\n      containers:\n        - name: api\n          image: iris-api:1.0\n          ports:\n            - containerPort: 8000\n          readinessProbe:\n            httpGet:\n              path: /health\n              port: 8000\n            periodSeconds: 10",
      },
      {
        kind: "command",
        label: "Appliquer le déploiement",
        command: "kubectl apply -f k8s/",
        why: "Crée ou met à jour les ressources décrites dans les manifests. Kubernetes remplace les pods progressivement (rolling update) : le service reste disponible pendant le déploiement du nouveau modèle.",
        verify: "kubectl get pods -l app=iris-api",
      },
      {
        kind: "text",
        text: "Le `readinessProbe` sur `/health` garantit que le trafic n'arrive que sur des pods dont le modèle est chargé. Pour un rollback : `kubectl rollout undo deployment/iris-api` revient à la version précédente.",
      },
    ],
  },
  {
    id: "inference-optimisee",
    title: "Inférence optimisée",
    level: 3,
    intro:
      "Servir vite et à moindre coût : les leviers, du plus simple au plus avancé.",
    blocks: [
      {
        kind: "fields",
        title: "Leviers d'optimisation",
        fields: [
          {
            label: "Batching",
            value:
              "Regrouper plusieurs requêtes en un seul passage modèle : le GPU/CPU est bien plus efficace en batch qu'en unitaire. Le serveur d'inférence gère la file.",
          },
          {
            label: "Mise en cache",
            value:
              "Si les mêmes entrées reviennent souvent, cacher les prédictions (Redis, par exemple) évite de recalculer. Valable quand les entrées se répètent.",
          },
          {
            label: "Quantization",
            value:
              "Réduire la précision des poids (float32 → int8) : modèle plus petit, inférence plus rapide, avec une légère perte de précision à mesurer.",
          },
          {
            label: "ONNX",
            value:
              "Exporter le modèle au format ONNX (open standard) pour l'exécuter avec ONNX Runtime, souvent plus rapide que le framework d'origine en production.",
          },
          {
            label: "Bon dimensionnement",
            value:
              "Le levier le plus rentable : un modèle simple qui répond au besoin bat un gros modèle sur-qualifié en latence, coût et maintenance.",
          },
        ],
      },
      {
        kind: "text",
        text: "Ordre de priorité : d'abord le bon modèle et le bon dimensionnement, puis le batching et le cache, enfin la quantization et l'export ONNX. Optimiser prématurément un modèle qui changera dans un mois est du temps perdu.",
      },
    ],
  },
  {
    id: "batch-vs-temps-reel",
    title: "Batch vs temps réel",
    level: 3,
    intro:
      "Deux architectures de serving, deux ensembles de contraintes.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Temps réel (API)", "Batch"],
        rows: [
          ["Latence", "Millisecondes : chaque requête attend la prédiction", "Heures : les prédictions sont calculées en différé"],
          ["Exemples", "Recommandation, détection de fraude, chatbot", "Scoring nocturne, rapports, enrichissement de base"],
          ["Infra", "Service toujours allumé, scaling sur le trafic", "Job planifié (Airflow), ressources à la demande"],
          ["Monitoring", "Latence p99, taux d'erreur en direct", "Taux de succès du job, fraîcheur des sorties"],
          ["Complexité", "Plus élevée (HA, scaling, rollback rapide)", "Plus simple (rejouer un job qui échoue)"],
        ],
      },
      {
        kind: "text",
        text: "Beaucoup de besoins 'temps réel' sont en réalité du batch déguisé : si la prédiction peut attendre une heure sans impact métier, le batch est plus simple, moins cher et plus robuste. Choisir en fonction du besoin réel, pas du prestige technique.",
      },
    ],
  },
  {
    id: "monitoring-modeles",
    title: "Monitoring des modèles",
    level: 3,
    intro:
      "Ce qu'on surveille quand l'artefact est un modèle : au-delà du CPU et de la RAM.",
    blocks: [
      {
        kind: "fields",
        title: "Les quatre familles de métriques",
        fields: [
          {
            label: "Santé du service",
            value:
              "Latence (p50/p99), taux d'erreur HTTP, saturation CPU/GPU/mémoire. Le classique : si le service est down, le modèle ne sert à rien.",
          },
          {
            label: "Volume et distribution des entrées",
            value:
              "Nombre de prédictions, distribution des features : un pic ou un changement brutal de distribution signale un problème en amont (ou une dérive).",
          },
          {
            label: "Dérive (drift)",
            value:
              "Comparaison statistique entre données d'entraînement et données live (rapports Evidently, tests de distribution). Le signal précoce de dégradation.",
          },
          {
            label: "Performance métier",
            value:
              "Quand des labels arrivent (avec retard), mesurer la vraie performance : taux de conversion, défauts détectés, satisfaction. La seule métrique qui compte vraiment.",
          },
        ],
      },
      {
        kind: "text",
        text: "Instrumenter dès le premier déploiement, même minimal : un endpoint `/metrics` exposant compteurs de prédictions et latences, branché sur Prometheus + Grafana, vaut mieux qu'un monitoring 'complet' prévu pour plus tard.",
      },
    ],
  },
  {
    id: "alertes",
    title: "Alertes utiles",
    level: 3,
    intro:
      "Des alertes qui réveillent pour de bonnes raisons — pas du bruit.",
    blocks: [
      {
        kind: "list",
        items: [
          "Taux d'erreur du serving au-delà d'un seuil : le service est en panne ou les entrées sont invalides.",
          "Latence p99 dégradée : le modèle ne tient plus la charge ou une dépendance ralentit.",
          "Chute du volume de prédictions : un client ne nous appelle plus — bug d'intégration ou arrêt silencieux.",
          "Dérive d'une feature clé au-delà du seuil : les données d'entrée ont changé, le réentraînement est à envisager.",
          "Échec du pipeline de réentraînement : le job planifié n'a pas produit de candidat.",
          "Règle d'or : chaque alerte doit avoir un responsable et une action documentée. Une alerte que personne ne traite est du bruit — la supprimer ou la corriger.",
        ],
      },
    ],
  },
  {
    id: "reentrainement-automatique",
    title: "Réentraînement automatique",
    level: 3,
    intro:
      "Fermer la boucle : du signal de dérive au nouveau modèle candidat, sans intervention manuelle.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définir le déclencheur",
            detail:
              "Temporel (toutes les semaines), volumétrique (10 000 nouvelles prédictions labellisées) ou sur dérive (seuil dépassé). Le déclencheur est une décision métier, pas technique.",
          },
          {
            title: "Rejouer le pipeline",
            detail:
              "Le pipeline d'entraînement (ingest → validate → train → evaluate) se rejoue automatiquement sur les données fraîches, avec tracking MLflow complet.",
          },
          {
            title: "Comparer au champion",
            detail:
              "Le candidat est évalué sur le jeu de validation figé. Pas de gain significatif : on archive le run et on garde le champion.",
          },
          {
            title: "Valider puis promouvoir",
            detail:
              "Si le candidat gagne : enregistrement au registry, déploiement en shadow ou canary, puis promotion après validation. L'humain garde la main sur la promotion tant que le système n'a pas fait ses preuves.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le réentraînement automatique ne signifie pas déploiement automatique : la boucle sûre automatise la production de candidats, pas leur mise en production. Le déploiement auto vient en dernier, quand chaque étape est fiable.",
      },
    ],
  },
  {
    id: "tests-ml",
    title: "Tester un système ML",
    level: 3,
    intro:
      "Les tests portent sur trois couches : le code, les données, le modèle.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois couches de tests",
        fields: [
          {
            label: "Tests du code",
            value:
              "Tests unitaires classiques : le preprocessing produit-il la forme attendue ? Le code de serving gère-t-il les entrées invalides ? Rien de spécifique au ML, mais indispensable.",
          },
          {
            label: "Tests des données",
            value:
              "Validation de schéma à l'entrée du pipeline : colonnes présentes, types corrects, plages plausibles, pas de valeurs manquantes critiques. Un pipeline qui échoue vite sur des données invalides vaut mieux qu'un modèle entraîné sur du bruit.",
          },
          {
            label: "Tests du modèle",
            value:
              "Le modèle dépasse-t-il la baseline sur le jeu figé ? Passe-t-il les cas critiques métier ? Les prédictions sont-elles stables (même entrée → même sortie) ?",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-pipelines",
    title: "Debugging des pipelines",
    level: 3,
    intro:
      "Quand le pipeline échoue : une méthode pour isoler la panne.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue de pannes",
        fields: [
          {
            label: "Échec à l'ingestion",
            value:
              "Problem : les données sources ont changé (schéma, volume, disponibilité). Vérifier : logs de l'étape, contrat avec la source, échantillon brut.",
          },
          {
            label: "Échec de validation",
            value:
              "Problem : les contrôles de schéma rejettent les données. Vérifier : s'agit-il d'une vraie anomalie ou d'un contrôle trop strict ? Ajuster le bon côté.",
          },
          {
            label: "Entraînement qui diverge",
            value:
              "Problem : loss NaN ou qui explose. Vérifier : learning rate, normalisation des features, données corrompues dans le batch.",
          },
          {
            label: "Métriques incohérentes",
            value:
              "Problem : d'excellents scores en entraînement, catastrophiques en validation. Vérifier : fuite de données (leakage), jeu de validation contaminé, seed non fixé.",
          },
          {
            label: "Échec au déploiement",
            value:
              "Problem : l'image ne démarre pas ou le health check échoue. Vérifier : modèle manquant dans l'image, dépendances, variables d'environnement, mémoire.",
          },
        ],
      },
      {
        kind: "text",
        text: "Méthode générale : rejouer l'étape en échec isolément avec les mêmes entrées (le tracking MLflow et DVC rendent ça possible), comparer entrée/sortie à un run qui marchait, puis remonter la chaîne jusqu'à la divergence.",
      },
    ],
  },
  {
    id: "debugging-derive",
    title: "Debugging d'une dérive",
    level: 3,
    intro:
      "Les performances baissent en production : est-ce la dérive, et d'où vient-elle ?",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Confirmer la baisse",
            detail:
              "Vérifier sur des labels récents que la performance baisse vraiment — pas un artefact de mesure (échantillon trop petit, période atypique).",
          },
          {
            title: "Comparer les distributions",
            detail:
              "Générer un rapport de dérive (Evidently) entre données d'entraînement et données live, feature par feature. Identifier les features qui ont bougé.",
          },
          {
            title: "Remonter à la cause",
            detail:
              "Une feature qui bouge a une cause amont : capteur remplacé, changement de formulaire, nouveau segment d'utilisateurs, bug d'ingestion. Corriger la cause vaut mieux que réentraîner sur des données cassées.",
          },
          {
            title: "Décider : corriger ou réentraîner",
            detail:
              "Cause corrigible (bug, changement réversible) : corriger en amont. Monde qui a vraiment changé : réentraîner sur données récentes, en vérifiant que le gain est réel.",
          },
        ],
      },
    ],
  },
  {
    id: "couts",
    title: "Coûts et dimensionnement",
    level: 3,
    intro:
      "Le MLOps a un coût réel : entraînement, inférence, stockage. Les ordres de grandeur à avoir en tête.",
    blocks: [
      {
        kind: "text",
        text: "Trois postes : l'entraînement (GPU coûteux, mais ponctuel), l'inférence (moins cher par requête, mais continu — c'est souvent le poste dominant sur un service à fort trafic), et le stockage (données versionnées, artefacts, logs de prédictions — croît sans fin si on ne purge pas).",
      },
      {
        kind: "list",
        items: [
          "Mesurer avant d'optimiser : logger le coût par entraînement et le coût par millier de prédictions.",
          "Le batch coûte structurellement moins cher que le temps réel (pas de service allumé en permanence).",
          "Purger les vieux artefacts et runs avec une politique de rétention explicite.",
          "Un modèle plus petit et suffisant bat toujours un gros modèle sur le coût d'inférence.",
          "Les GPU partagés ou le scaling à zéro (serverless) pour les trafics intermittents.",
        ],
      },
    ],
  },
  {
    id: "securite-mlops",
    title: "Sécurité du MLOps",
    level: 3,
    intro:
      "Les surfaces d'attaque spécifiques d'une plateforme ML.",
    blocks: [
      {
        kind: "list",
        items: [
          "Secrets : clés d'API, accès stockages et registries via un gestionnaire de secrets, jamais dans le code ni les images Docker.",
          "Accès au registry : qui peut promouvoir un modèle en production ? Un accès en écriture non contrôlé permet de déployer un modèle malveillant.",
          "Supply chain : images de base et dépendances épinglées et scannées ; un paquet compromis dans le pipeline d'entraînement contamine tous les modèles.",
          "Données : les jeux d'entraînement contiennent souvent des données sensibles — chiffrement au repos, accès restreints, anonymisation quand c'est possible.",
          "API de prédiction : authentification, rate limiting, validation des entrées — une API de modèle est une API comme les autres.",
          "Logs de prédictions : ils contiennent des données utilisateurs réelles — même politique de rétention et d'accès que les données sources.",
        ],
      },
    ],
  },
  {
    id: "gouvernance",
    title: "Gouvernance et traçabilité",
    level: 3,
    intro:
      "Prouver ce qu'on a fait : audit, reproductibilité, documentation des modèles.",
    blocks: [
      {
        kind: "text",
        text: "La lignée complète (données + code + paramètres → modèle → déploiement) n'est pas un luxe : c'est ce qui permet de répondre à 'pourquoi ce modèle a pris cette décision le 14 mars ?' Pour les cas régulés (crédit, santé, recrutement), c'est une exigence.",
      },
      {
        kind: "fields",
        title: "Les artefacts de gouvernance",
        fields: [
          {
            label: "Model cards",
            value:
              "Une fiche par modèle : usage prévu, performances par segment, limites connues, données d'entraînement. Le format proposé par Google est devenu une référence.",
          },
          {
            label: "Registre des décisions",
            value:
              "Qui a promu quelle version, quand, sur quelles métriques : le journal d'audit des mises en production.",
          },
          {
            label: "Reproductibilité",
            value:
              "Pouvoir régénérer un modèle à l'identique depuis le registry : le test ultime, à vérifier périodiquement, pas le jour de l'audit.",
          },
        ],
      },
    ],
  },
  {
    id: "feature-store",
    title: "Feature stores",
    level: 3,
    intro:
      "Quand plusieurs modèles partagent les mêmes features : centraliser pour éviter les divergences.",
    blocks: [
      {
        kind: "text",
        text: "Le problème : la feature 'montant moyen sur 30 jours' calculée différemment à l'entraînement et en serving produit un modèle qui se trompe en production (training-serving skew). Le feature store centralise les définitions et les valeurs des features, avec une vue batch (entraînement) et une vue temps réel (serving) cohérentes.",
      },
      {
        kind: "list",
        items: [
          "Utile quand plusieurs équipes/modèles consomment les mêmes features.",
          "Overkill pour un premier projet : un module Python partagé entre train et serving suffit au début.",
          "La règle d'or reste : le code de calcul des features en serving doit être le même qu'à l'entraînement.",
        ],
      },
    ],
  },
  {
    id: "contrats-donnees",
    title: "Contrats de données",
    level: 3,
    intro:
      "Formaliser ce que le pipeline attend de ses sources : le garde-fou contre les changements silencieux.",
    blocks: [
      {
        kind: "text",
        text: "Un contrat de données décrit le schéma attendu (colonnes, types), les volumes (lignes par jour, dans une fourchette) et la fraîcheur (données de moins de X heures). L'étape de validation du pipeline vérifie le contrat à chaque run : en cas de violation, le pipeline échoue vite avec un message clair au lieu d'entraîner sur des données corrompues.",
      },
      {
        kind: "list",
        items: [
          "Versionner les contrats avec le code du pipeline : un changement de source = une PR qui met à jour le contrat.",
          "Alerter le producteur de données, pas seulement l'équipe ML : le contrat est un accord entre deux équipes.",
          "Commencer simple : schéma + volumes. Ajouter les contrôles statistiques (distributions) ensuite.",
        ],
      },
    ],
  },
  {
    id: "environnements",
    title: "Environnements : dev, staging, production",
    level: 3,
    intro:
      "Séparer les usages pour expérimenter sans risquer la production.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Dev", "Staging", "Production"],
        rows: [
          ["Données", "Échantillon", "Copie récente anonymisée", "Données réelles"],
          ["Modèles", "Expérimentations libres", "Candidats à valider", "Champion validé"],
          ["Coût", "Minimal", "Modéré", "Dimensionné pour la charge"],
          ["Règle", "Tout casser autorisé", "Reflète la prod", "Changements tracés uniquement"],
        ],
      },
      {
        kind: "text",
        text: "Le staging sert à valider le déploiement lui-même (l'image, la config, les health checks) avant la production. Un modèle validé en dev mais jamais testé dans des conditions proches de la prod reste un pari.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pièges classiques des équipes qui industrialisent leur ML.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Aucun tracking des expériences",
            value:
              "Problem : le 'meilleur modèle' est un fichier `model_final_v2_REAL.pkl` sans paramètres connus. Why : aller vite au début. Better : MLflow dès le premier entraînement sérieux — le coût est de quelques lignes.",
          },
          {
            label: "Données non versionnées",
            value:
              "Problem : impossible de reproduire un entraînement car les données ont changé depuis. Why : 'les données sont sur le disque partagé'. Better : DVC + pointeurs Git dès que le modèle compte.",
          },
          {
            label: "Training-serving skew",
            value:
              "Problem : les features sont calculées différemment à l'entraînement et en production. Why : deux implémentations qui divergent. Better : un seul code de features partagé, ou un feature store.",
          },
          {
            label: "Déployer sans baseline",
            value:
              "Problem : on ne sait pas si le modèle apporte quelque chose. Why : enthousiasme. Better : toujours comparer à une baseline triviale (moyenne, règle simple) — un modèle complexe doit la battre nettement.",
          },
          {
            label: "Pas de monitoring",
            value:
              "Problem : le modèle se dégrade pendant des mois sans que personne ne le remarque. Why : 'on monitorera plus tard'. Better : volume + latence + dérive dès le premier déploiement.",
          },
          {
            label: "Réentraînement aveugle",
            value:
              "Problem : réentraîner chaque semaine dégrade parfois le modèle (données bruitées). Why : automatisation sans garde-fous. Better : le réentraînement produit un candidat ; la promotion reste conditionnée à l'évaluation.",
          },
          {
            label: "Fuite de données (leakage)",
            value:
              "Problem : des informations du futur ou de la cible contaminent l'entraînement — scores superbes, production catastrophique. Why : preprocessing avant le split, features calculées sur toute la période. Better : split temporel strict, pipeline qui ne voit que le passé.",
          },
          {
            label: "Optimiser le modèle avant le système",
            value:
              "Problem : des semaines de tuning pour +0,2 % pendant que le déploiement est manuel et fragile. Why : le tuning est gratifiant, l'infra est ingrate. Better : un pipeline fiable avec un modèle simple bat un excellent modèle sans pipeline.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro: "Des repères de contexte, pas des règles absolues.",
    blocks: [
      {
        kind: "list",
        items: [
          "Reproductibilité : tout run doit pouvoir être rejoué à l'identique (code + données + seed + environnement).",
          "Automatiser les tâches répétées : ce qui est fait deux fois à la main mérite un pipeline.",
          "Versionner tout : code, données, modèles, configurations, contrats.",
          "Évaluer avant de promouvoir : aucun modèle en production sans preuve sur jeu figé.",
          "Monitorer dès le premier déploiement : la dérive ne prévient pas.",
          "Rollback rapide : pouvoir revenir en arrière en minutes, pas en jours.",
          "Documentation : model cards, décisions de promotion, architecture du pipeline.",
          "Sécurité : secrets hors du code, accès au registry contrôlés, dépendances épinglées.",
          "Simplicité : le modèle le plus simple qui répond au besoin est le meilleur modèle.",
          "Coûts : mesurer le coût par entraînement et par prédiction, purger les artefacts.",
        ],
      },
      {
        kind: "text",
        text: "Contexte : un chercheur solo n'applique pas la même rigueur qu'une équipe servant des millions de prédictions. La maturité, c'est d'ajouter chaque couche (tracking, versionnement, CI, monitoring) quand son absence devient douloureuse — pas avant, pas trop tard.",
      },
    ],
  },
  {
    id: "projets-avances",
    title: "Projets avancés",
    level: 3,
    intro:
      "Trois projets pour passer du 'ça marche en local' au 'ça tourne en production'.",
    blocks: [
      {
        kind: "fields",
        title: "À réaliser dans l'ordre",
        fields: [
          {
            label: "Pipeline complet train → deploy",
            value:
              "Chaîne DVC ou Airflow : ingestion, validation, entraînement tracké, évaluation vs champion, enregistrement au registry, build Docker. Le projet central du MLOps.",
          },
          {
            label: "Monitoring de dérive avec alertes",
            value:
              "Serving instrumenté + rapports Evidently planifiés + alertes sur seuils. Simuler une dérive et vérifier que l'alerte part.",
          },
          {
            label: "Réentraînement avec promotion conditionnelle",
            value:
              "Job planifié qui réentraîne, évalue et ne promeut que sur gain significatif, avec rollback testé. La boucle complète, de bout en bout.",
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
          { label: "MLflow", value: "mlflow.org : documentation du tracking, des modèles et du registry, avec tutoriels." },
          { label: "DVC", value: "dvc.org : guides du versionnement de données et des pipelines `dvc.yaml`." },
          { label: "Evidently", value: "Documentation des rapports de dérive et de qualité des données." },
        ],
      },
      {
        kind: "list",
        items: [
          "Cours : MLOps Zoomcamp (DataTalksClub, gratuit, sur GitHub) — le parcours structuré de référence, de l'expérimentation au déploiement.",
          "Livre/plateforme : Made With ML (madewithml.com) — un projet MLOps complet expliqué de bout en bout.",
          "Pratique : instrumenter un vrai projet ML existant plutôt que de suivre des tutoriels déconnectés.",
          "Communauté : les discussions des dépôts MLflow et DVC pour les cas limites et les retours d'expérience.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Le MLOps en place, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir l'orchestration : Kubernetes pour le serving à l'échelle, avec autoscaling et rolling updates.",
          "Industrialiser les déploiements : Docker pour des images reproductibles, puis CI/CD pour automatiser test et livraison.",
          "Monter en complexité ML : deep learning pour les modèles lourds, LLM systems pour servir des modèles de langage.",
          "Fiabiliser les systèmes IA : évaluation et fiabilité pour mesurer ce que les modèles font vraiment en production.",
          "Structurer la donnée en amont : data engineering pour des pipelines de données solides avant le ML.",
          "Revenir à la roadmap : valider MLOps et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

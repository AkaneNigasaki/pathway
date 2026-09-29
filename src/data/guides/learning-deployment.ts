import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du déploiement de modèles ML : packager un modèle,
 * l'exposer via API, le conteneuriser, le déployer avec des stratégies sûres,
 * puis le surveiller (dérive) et le maintenir en production.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_DEPLOYMENT: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce que signifie « mettre un modèle en production » : du notebook qui prédit sur votre machine au service qui prédit pour des milliers d'utilisateurs.",
    blocks: [
      {
        kind: "text",
        text: "Déployer un modèle ML, c'est le transformer en service utilisable : on le package (fichier versionné), on l'expose via une API (HTTP), on le conteneurise (Docker) pour un environnement reproductible, puis on le fait tourner sur une infrastructure avec surveillance. Le modèle passe d'un artefact de recherche à un composant logiciel avec des exigences de disponibilité, de latence et de qualité.",
      },
      {
        kind: "text",
        text: "Pourquoi ça existe : un modèle qui reste dans un notebook ne crée aucune valeur. Le déploiement est le pont entre la data science et le produit — et c'est là que les vrais problèmes apparaissent : les données de production diffèrent de l'entraînement (dérive), la latence compte, les versions doivent coexister, et le modèle doit être surveillé comme n'importe quel service.",
      },
      {
        kind: "text",
        text: "Packager un modèle entraîné, l'exposer comme service, le déployer de façon sûre et surveiller sa qualité en production.",
      },
      {
        kind: "text",
        text: "Transformer une expérience de data science en valeur produit : prédictions fiables, disponibles et mesurées.",
      },
      {
        kind: "fields",
        title: "Le déploiement ML : l'essentiel",
        fields: [          {
            label: "Quand s'en préoccuper",
            value:
              "Dès qu'un modèle doit servir hors du notebook : prototype, API interne, ou produit à grande échelle.",
          },
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni « copier le notebook sur un serveur », ni un déploiement logiciel classique : les données et la dérive ajoutent une dimension propre au ML.",
          },
        ],
      },
    ],
  },
  {
    id: "cycle-vie-modele",
    title: "Le cycle de vie d'un modèle",
    level: 1,
    intro:
      "Le déploiement n'est pas une fin : c'est une étape d'un cycle continu.",
    blocks: [
      {
        kind: "diagram",
        title: "De l'entraînement au réentraînement",
        lines: [
          "Données → Entraînement → Évaluation",
          "              │",
          "              ▼",
          "     Packaging (modèle versionné)",
          "              │",
          "              ▼",
          "     Déploiement (API / batch)",
          "              │",
          "              ▼",
          "     Monitoring (qualité, dérive, latence)",
          "              │",
          "              ├─→ tout va bien : on continue",
          "              │",
          "              └─→ dérive détectée : RÉENTRAÎNEMENT",
          "                       ↑_______________│",
          "                   (nouvelles données)",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : un modèle en production se dégrade avec le temps (les données changent) — le monitoring détecte la dérive et déclenche le réentraînement. Déployer, c'est entrer dans ce cycle, pas le terminer.",
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
      "Ce qu'il faut maîtriser avant de déployer son premier modèle.",
    blocks: [
      {
        kind: "fields",
        title: "Les fondations",
        fields: [
          {
            label: "Python",
            value:
              "Le langage de l'écosystème ML : packages, environnements virtuels, gestion des dépendances.",
          },
          {
            label: "Machine Learning (bases)",
            value:
              "Entraîner et évaluer un modèle (scikit-learn) : le déploiement suppose un modèle qui existe.",
          },
          {
            label: "HTTP / API (bases)",
            value:
              "Requêtes, JSON, codes de statut : le modèle sera exposé via HTTP.",
          },
          {
            label: "Docker (bases)",
            value:
              "Image, conteneur : l'emballage standard du déploiement reproductible.",
          },
        ],
      },
    ],
  },
  {
    id: "packager-modele",
    title: "Packager : sérialiser le modèle",
    level: 2,
    intro:
      "Transformer le modèle entraîné en fichier versionné et rechargeable.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Sauvegarder et recharger (scikit-learn)",
        code: "import joblib\nfrom sklearn.ensemble import RandomForestClassifier\n\n# Entraînement (dans le notebook)\nmodele = RandomForestClassifier()\nmodele.fit(X_train, y_train)\n\n# Sérialisation : le modèle devient un fichier\njoblib.dump(modele, \"modele_v1.joblib\")\n\n# Rechargement (dans le service)\nmodele_charge = joblib.load(\"modele_v1.joblib\")\nprint(modele_charge.predict(X_test[:5]))",
      },
      {
        kind: "text",
        text: "`joblib` (ou `pickle`) sérialise l'objet modèle en fichier binaire. Règles : versionnez le nom (`modele_v1.joblib`, jamais `modele_final_FINAL.joblib`), figez aussi le prétraitement (scaler, encodeur — souvent via un `Pipeline` scikit-learn sauvegardé ensemble), et notez les versions des bibliothèques (`scikit-learn==1.4.0`) : un modèle sauvegardé avec une version peut ne pas se recharger avec une autre.",
      },
    ],
  },
  {
    id: "api-fastapi",
    title: "Exposer : API FastAPI",
    level: 2,
    intro:
      "Le modèle devient un service HTTP : endpoint `/predict`.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "app.py",
        code: "from fastapi import FastAPI\nimport joblib\n\napp = FastAPI()\nmodele = joblib.load(\"modele_v1.joblib\")\n\n@app.get(\"/health\")\ndef health():\n    return {\"status\": \"ok\", \"modele\": \"v1\"}\n\n@app.post(\"/predict\")\ndef predict(payload: dict):\n    features = payload[\"features\"]\n    prediction = modele.predict([features])\n    return {\"prediction\": float(prediction[0])}",
      },
      {
        kind: "command",
        label: "Installer et lancer l'API",
        command: "pip install fastapi uvicorn joblib scikit-learn",
        why: "Installe FastAPI (framework d'API), uvicorn (serveur ASGI qui l'exécute), joblib et scikit-learn (chargement du modèle). FastAPI est le standard pour servir du ML en Python : rapide, avec validation et documentation auto-générée.",
        verify: "pip show fastapi",
      },
      {
        kind: "command",
        label: "Démarrer le serveur",
        command: "uvicorn app:app --host 0.0.0.0 --port 8000",
        why: "Lance l'application `app` du fichier `app.py` sur le port 8000, accessible depuis l'extérieur du conteneur (`0.0.0.0`). En développement, ajoutez `--reload` ; en production, on utilisera plusieurs workers.",
        verify: "curl -s localhost:8000/health",
      },
      {
        kind: "text",
        text: "Chargez le modèle UNE fois au démarrage (pas à chaque requête) : le chargement est coûteux. La documentation interactive est disponible sur `/docs` : testez `/predict` directement depuis le navigateur.",
      },
    ],
  },
  {
    id: "dockeriser",
    title: "Conteneuriser : Dockerfile",
    level: 2,
    intro:
      "Emballer l'API et le modèle dans une image reproductible.",
    blocks: [
      {
        kind: "code",
        language: "dockerfile",
        title: "Dockerfile",
        code: "FROM python:3.11-slim\n\nWORKDIR /app\n\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\nCOPY app.py modele_v1.joblib ./\n\nEXPOSE 8000\nCMD [\"uvicorn\", \"app:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]",
      },
      {
        kind: "command",
        label: "Construire l'image",
        command: "docker build -t mon-modele:1.0 .",
        why: "Construit l'image versionnée `mon-modele:1.0` : Python, dépendances figées, code et modèle embarqués. Le tag `1.0` correspond à la version du modèle — image et modèle évoluent ensemble, traçables.",
        verify: "docker images mon-modele",
      },
      {
        kind: "text",
        text: "Le `requirements.txt` fige les versions (`fastapi==0.109.0`, `scikit-learn==1.4.0`) : sans lui, une reconstruction installe des versions différentes et le modèle peut ne plus se charger. Copiez d'abord `requirements.txt` seul : Docker met en cache l'installation des dépendances et ne la refait que si elles changent.",
      },
    ],
  },
  {
    id: "premier-deploiement",
    title: "Premier déploiement : lancer le conteneur",
    level: 2,
    intro:
      "Faire tourner le service et vérifier qu'il prédit.",
    blocks: [
      {
        kind: "command",
        label: "Lancer le service",
        command: "docker run -d -p 8000:8000 --name modele-v1 mon-modele:1.0",
        why: "Démarre le conteneur en arrière-plan (`-d`), en exposant le port 8000. C'est le déploiement le plus simple : une commande, un service qui tourne. En production réelle on utilisera un orchestrateur, mais le principe est identique.",
        verify: "docker ps",
      },
      {
        kind: "command",
        label: "Tester une prédiction",
        command: "curl -s -X POST localhost:8000/predict -H \"Content-Type: application/json\" -d '{\"features\": [5.1, 3.5, 1.4, 0.2]}'",
        why: "Envoie une vraie requête de prédiction à l'API : c'est le test de bout en bout du déploiement (réseau → API → modèle → réponse JSON). Si la réponse contient une prédiction, toute la chaîne fonctionne.",
        verify: "curl -s localhost:8000/health",
      },
      {
        kind: "text",
        text: "Adaptez le JSON aux features réelles de votre modèle. Un test automatisé de ce type (requête + vérification de la réponse) est le smoke test à rejouer après chaque déploiement.",
      },
    ],
  },
  {
    id: "health-checks",
    title: "Health checks",
    level: 2,
    intro:
      "Le service doit dire s'il va bien : la base de tout déploiement robuste.",
    blocks: [
      {
        kind: "text",
        text: "L'endpoint `/health` (déjà dans notre API) répond 200 si le service est prêt. Les plateformes (Docker, Kubernetes, load balancers) l'interrogent pour décider : router le trafic vers cette instance ? la redémarrer si elle ne répond plus ? Un health check profond vérifie aussi que le modèle est chargé (pas seulement que le processus tourne).",
      },
      {
        kind: "list",
        items: [
          "Readiness : « suis-je prêt à recevoir du trafic ? » (modèle chargé) — sinon, pas de trafic.",
          "Liveness : « suis-je vivant ? » — sinon, redémarrage.",
          "Un health check doit être rapide et sans effet de bord : jamais de prédiction réelle dedans.",
        ],
      },
    ],
  },
  {
    id: "environnements",
    title: "Environnements : dev, staging, prod",
    level: 2,
    intro:
      "Ne jamais tester en production : la séparation des environnements.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois environnements",
        fields: [
          {
            label: "Dev",
            value:
              "La machine du data scientist : itération rapide, données d'échantillon, instabilité acceptable.",
          },
          {
            label: "Staging",
            value:
              "Réplique de la prod (données anonymisées) : on y valide le déploiement complet avant la production.",
          },
          {
            label: "Prod",
            value:
              "Les vrais utilisateurs : stable, surveillé, les changements y arrivent via des stratégies contrôlées.",
          },
        ],
      },
      {
        kind: "text",
        text: "La règle : tout déploiement passe par staging d'abord, avec les mêmes images et la même procédure qu'en prod. « Ça marchait en staging » n'est une garantie que si staging ressemble vraiment à la prod.",
      },
    ],
  },
  {
    id: "configuration-secrets",
    title: "Configuration et secrets",
    level: 2,
    intro:
      "Séparer le code de sa configuration : variables d'environnement et secrets.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Lire la configuration",
        code: "import os\n\nMODELE_PATH = os.environ.get(\"MODELE_PATH\", \"modele_v1.joblib\")\nSEUIL = float(os.environ.get(\"SEUIL_DECISION\", \"0.5\"))\nAPI_KEY = os.environ[\"API_KEY\"]  # requis : échoue si absent",
      },
      {
        kind: "command",
        label: "Passer la configuration au conteneur",
        command: "docker run -d -p 8000:8000 -e MODELE_PATH=/modeles/v2.joblib -e SEUIL_DECISION=0.7 mon-modele:1.0",
        why: "`-e` injecte des variables d'environnement : la MÊME image tourne en staging et en prod avec des configurations différentes. Les secrets (clés API) ne sont jamais dans l'image ni dans le code : variables d'environnement ou gestionnaire de secrets.",
        verify: "docker exec modele-v1 env | grep SEUIL",
      },
      {
        kind: "text",
        text: "Principe : l'image est identique partout, seule la configuration change. Un secret dans Git ou dans l'image est compromis : considérez-le comme public et faites-le tourner.",
      },
    ],
  },
  {
    id: "logs-bases",
    title: "Logs : voir ce qui se passe",
    level: 2,
    intro:
      "Les logs du service : la première source de diagnostic.",
    blocks: [
      {
        kind: "command",
        label: "Lire les logs du conteneur",
        command: "docker logs modele-v1 --tail 50",
        why: "Affiche les 50 dernières lignes de sortie du conteneur : requêtes, erreurs Python, stack traces. C'est le premier réflexe quand l'API ne répond pas ou retourne des 500.",
        verify: "docker logs modele-v1 --tail 5",
      },
      {
        kind: "text",
        text: "Loguez chaque prédiction à un niveau raisonnable : timestamp, version du modèle, latence, et un identifiant de requête — jamais les données personnelles brutes. En cas d'erreur, la stack trace complète est précieuse : ne l'avalez pas.",
      },
    ],
  },
  {
    id: "deboguer-deploiement",
    title: "Déboguer un déploiement",
    level: 2,
    intro:
      "L'API ne répond pas : la checklist de diagnostic.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Le conteneur tourne-t-il ?",
            detail:
              "`docker ps` : absent = plantage au démarrage. `docker logs` donne la cause (modèle introuvable, dépendance manquante, port occupé).",
          },
          {
            title: "Le health check répond-il ?",
            detail:
              "`curl localhost:8000/health` : si le conteneur tourne mais ne répond pas, vérifiez le port exposé et les logs.",
          },
          {
            title: "Le modèle se charge-t-il ?",
            detail:
              "Erreur `joblib.load` = version de scikit-learn différente ou fichier corrompu/manquant. Vérifiez `requirements.txt` et le COPY du Dockerfile.",
          },
          {
            title: "Les prédictions sont-elles cohérentes ?",
            detail:
              "Comparez avec le notebook : mêmes entrées → mêmes sorties ? Sinon, le prétraitement diffère (scaler oublié, ordre des features).",
          },
          {
            title: "Reproduire en local",
            detail:
              "La même image Docker tourne en local : si ça casse en prod mais pas en local, c'est la configuration (variables d'environnement) ou les données.",
          },
        ],
      },
    ],
  },
  {
    id: "rollback-simple",
    title: "Rollback : revenir en arrière",
    level: 2,
    intro:
      "Le déploiement a cassé : revenir à la version précédente, vite.",
    blocks: [
      {
        kind: "command",
        label: "Redéployer l'ancienne version",
        command: "docker stop modele-v1 && docker run -d -p 8000:8000 --name modele-v1 mon-modele:0.9",
        why: "Le rollback le plus simple : arrêter le conteneur défectueux et relancer l'image précédente (taggée et conservée). C'est pourquoi on ne supprime jamais les anciennes images taggées : ce sont les parachutes.",
        verify: "curl -s localhost:8000/health",
      },
      {
        kind: "text",
        text: "Deux conditions pour un rollback qui sauve : les anciennes versions sont conservées et identifiées (tags), et la procédure est connue à l'avance (documentée, voire automatisée). Un rollback improvisé sous pression est un second incident.",
      },
    ],
  },
  {
    id: "flux-mlops",
    title: "Le flux MLOps : automatiser le cycle",
    level: 3,
    intro:
      "Du déploiement manuel au pipeline : entraîner, valider, déployer sans intervention.",
    blocks: [
      {
        kind: "diagram",
        title: "Pipeline MLOps",
        lines: [
          "Nouvelles données",
          "     ↓",
          "Entraînement automatique",
          "     ↓",
          "Validation (métriques ≥ seuils ?)",
          "     ├─→ NON : alerte, on garde l'ancien modèle",
          "     ↓ OUI",
          "Packaging + versioning (registre de modèles)",
          "     ↓",
          "Déploiement staging → tests → production (canary)",
          "     ↓",
          "Monitoring (dérive, qualité)",
          "     ↓",
          "Dérive → nouvelles données → (boucle)",
        ],
      },
      {
        kind: "text",
        text: "Le MLOps applique au ML ce que le DevOps a fait au logiciel : le cycle entraînement → déploiement → monitoring devient un pipeline automatique. La validation automatique est la garde-fou : un modèle moins bon que l'actuel ne part jamais en production.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "strategies-deploiement",
    title: "Stratégies : rolling, blue-green, canary",
    level: 3,
    intro:
      "Comment remplacer un modèle en production sans interruption ni catastrophe.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois stratégies",
        fields: [
          {
            label: "Rolling",
            value:
              "Remplacement progressif instance par instance. Simple, sans interruption, mais pendant la transition deux versions coexistent — et un rollback est lent.",
          },
          {
            label: "Blue-green",
            value:
              "Deux environnements complets : la nouvelle version (green) est validée à côté de l'ancienne (blue), puis le trafic bascule d'un coup. Rollback instantané (rebascule), mais coûte double pendant la transition.",
          },
          {
            label: "Canary",
            value:
              "La nouvelle version reçoit d'abord 1-5 % du trafic réel : on compare ses métriques (erreurs, latence, qualité) à l'ancienne avant d'augmenter. Le plus sûr pour les modèles ML — la validation se fait sur du vrai trafic.",
          },
        ],
      },
      {
        kind: "text",
        text: "Pour les modèles ML, le canary est roi : les métriques hors-ligne (accuracy sur le jeu de test) ne garantissent pas le comportement sur les données réelles. Exposer progressivement permet de détecter la dérive avant qu'elle ne touche tous les utilisateurs.",
      },
    ],
  },
  {
    id: "batch-vs-realtime",
    title: "Batch vs temps réel",
    level: 3,
    intro:
      "Deux architectures de serving : choisir selon le besoin.",
    blocks: [
      {
        kind: "fields",
        title: "Comparaison",
        fields: [
          {
            label: "Temps réel (API)",
            value:
              "Prédiction à la demande via HTTP (notre FastAPI). Latence en millisecondes, disponibilité critique. Pour : recommandation, scoring, détection.",
          },
          {
            label: "Batch",
            value:
              "Prédictions calculées en masse, périodiquement (toutes les nuits), résultats écrits en base. Pas de contrainte de latence. Pour : scoring client quotidien, rapports, features pré-calculées.",
          },
          {
            label: "Le choix",
            value:
              "Le batch est 10× plus simple à opérer (pas d'API, pas de SLA temps réel) : ne faites du temps réel que si le besoin l'exige vraiment.",
          },
        ],
      },
    ],
  },
  {
    id: "validation-donnees",
    title: "Valider les données d'entrée",
    level: 3,
    intro:
      "Le modèle est sensible aux données : validez-les avant prédiction.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Validation avec Pydantic (FastAPI)",
        code: "from pydantic import BaseModel, Field\n\nclass RequetePrediction(BaseModel):\n    features: list[float] = Field(min_length=4, max_length=4)\n\n@app.post(\"/predict\")\ndef predict(payload: RequetePrediction):\n    prediction = modele.predict([payload.features])\n    return {\"prediction\": float(prediction[0])}",
      },
      {
        kind: "text",
        text: "Pydantic (intégré à FastAPI) rejette automatiquement les requêtes malformées (mauvais types, mauvaise taille) avec une erreur 422 explicite. Au-delà du format, surveillez la distribution : des features hors des plages d'entraînement (âge = 250) signalent un problème en amont — loguez et alertez.",
      },
    ],
  },
  {
    id: "model-registry",
    title: "Registre de modèles : MLflow",
    level: 3,
    intro:
      "Versionner proprement : le registre central des modèles.",
    blocks: [
      {
        kind: "text",
        text: "Un registre de modèles (MLflow Registry, par exemple) stocke chaque version avec ses métadonnées : métriques d'évaluation, jeu de données d'entraînement, paramètres, auteur, date. Les versions passent par des étapes (staging → production → archivé) : le déploiement référence « le modèle production v3 », pas un fichier perdu sur un disque.",
      },
      {
        kind: "list",
        items: [
          "Traçabilité : pour chaque prédiction en production, on sait quel modèle (quelle version, entraîné sur quelles données) l'a produite.",
          "Comparaison : les métriques de chaque version sont côte à côte — le choix de la version à déployer est documenté.",
          "MLflow Tracking enregistre les runs d'entraînement ; le Registry promeut les meilleurs en versions déployables.",
        ],
      },
    ],
  },
  {
    id: "versioning-donnees",
    title: "Versionner les données : DVC",
    level: 3,
    intro:
      "Le modèle dépend des données : versionnez-les aussi.",
    blocks: [
      {
        kind: "text",
        text: "DVC (Data Version Control) versionne les jeux de données comme Git versionne le code : chaque version du dataset a un hash, et on sait exactement quelles données ont entraîné quel modèle. Sans cela, « réentraîner le modèle » est non reproductible — les données ont changé entre-temps sans que personne ne le sache.",
      },
      {
        kind: "list",
        items: [
          "Reproductibilité : code (Git) + données (DVC) + paramètres = entraînement rejouable à l'identique.",
          "Le pipeline DVC (`dvc.yaml`) décrit les étapes : données → features → entraînement → évaluation.",
          "En pratique : commencez par versionner au moins les datasets d'entraînement et d'évaluation.",
        ],
      },
    ],
  },
  {
    id: "monitoring-derive",
    title: "Surveiller la dérive (drift)",
    level: 3,
    intro:
      "Le problème spécifique au ML : le monde change, le modèle se périme.",
    blocks: [
      {
        kind: "fields",
        title: "Les deux dérives",
        fields: [
          {
            label: "Data drift",
            value:
              "Les données d'entrée changent : ex. l'âge moyen des utilisateurs passe de 30 à 45 ans. Le modèle, entraîné sur l'ancienne distribution, prédit moins bien.",
          },
          {
            label: "Concept drift",
            value:
              "La relation change : ex. ce qui prédisait l'achat ne le prédit plus (nouveau comportement). Même avec des données stables, le modèle se trompe.",
          },
          {
            label: "Détection",
            value:
              "Comparer les distributions (tests statistiques : KS, PSI) entre entraînement et production, en continu. Outils : Evidently, NannyML, ou calculs maison.",
          },
          {
            label: "Réaction",
            value:
              "Alerte → investigation → réentraînement sur données récentes → validation → déploiement (le cycle MLOps).",
          },
        ],
      },
      {
        kind: "text",
        text: "Sans monitoring de dérive, un modèle peut se dégrader pendant des mois sans que personne ne s'en aperçoive — les prédictions restent « plausibles ». C'est la surveillance la plus importante et la plus négligée du ML en production.",
      },
    ],
  },
  {
    id: "monitoring-qualite",
    title: "Monitoring qualité : au-delà de la dérive",
    level: 3,
    intro:
      "Ce qu'on surveille sur un modèle en production, concrètement.",
    blocks: [
      {
        kind: "list",
        items: [
          "Performance métier : si les vrais labels arrivent (avec délai), calculez l'accuracy/précision en production et comparez à l'évaluation.",
          "Distribution des prédictions : un modèle qui prédit soudain toujours la même classe est cassé — même sans labels.",
          "Latence de prédiction (p95) : un modèle qui ralentit dégrade le produit.",
          "Taux d'erreurs et de requêtes invalides : la santé du service autour du modèle.",
          "Volume : chute brutale du nombre de prédictions = problème en amont (données non alimentées).",
          "Feedback implicite : taux de clic, de conversion — selon le cas d'usage, le signal métier ultime.",
        ],
      },
    ],
  },
  {
    id: "scalabilite",
    title: "Scalabilité : servir à grande échelle",
    level: 3,
    intro:
      "Quand une instance ne suffit plus : les leviers.",
    blocks: [
      {
        kind: "fields",
        title: "Les leviers",
        fields: [
          {
            label: "Workers multiples",
            value:
              "`uvicorn --workers 4` : plusieurs processus sur une machine. Premier levier, simple.",
          },
          {
            label: "Réplicas",
            value:
              "Plusieurs conteneurs derrière un load balancer (Kubernetes : `replicas: 3`, autoscaling sur CPU/latence).",
          },
          {
            label: "Batching",
            value:
              "Regrouper les requêtes pour une inférence groupée (GPU) : débit ×10, latence légèrement supérieure.",
          },
          {
            label: "Cache",
            value:
              "Si les mêmes entrées reviennent : cacher les prédictions (Redis) plutôt que recalculer.",
          },
          {
            label: "Optimisation du modèle",
            value:
              "Quantification, ONNX, TensorRT : réduire taille et latence — parfois ×5 sans perte notable.",
          },
        ],
      },
    ],
  },
  {
    id: "securite-api",
    title: "Sécuriser l'API",
    level: 3,
    intro:
      "Une API de prédiction exposée : les protections minimales.",
    blocks: [
      {
        kind: "list",
        items: [
          "Authentification : clé API ou token — jamais d'endpoint `/predict` public sans contrôle.",
          "Rate limiting : limiter les requêtes par client (abus, coûts d'inférence).",
          "Validation stricte des entrées (Pydantic) : le modèle ne doit jamais recevoir de données arbitraires.",
          "HTTPS partout : les features envoyées peuvent être sensibles.",
          "Ne pas exposer les détails d'erreur (stack traces) aux clients : loguez en interne, répondez générique.",
          "Journaliser qui prédit quoi : auditabilité en cas d'usage abusif.",
        ],
      },
    ],
  },
  {
    id: "ab-testing",
    title: "A/B testing de modèles",
    level: 3,
    intro:
      "Comparer deux modèles sur du vrai trafic : la validation ultime.",
    blocks: [
      {
        kind: "text",
        text: "Le principe : router aléatoirement une partie du trafic vers le modèle A (actuel) et l'autre vers le modèle B (challenger), puis comparer les métriques métier (conversion, précision avec labels différés). Contrairement à l'évaluation hors-ligne, l'A/B test mesure l'impact réel — y compris les effets inattendus.",
      },
      {
        kind: "list",
        items: [
          "Randomisation propre : un même utilisateur voit toujours le même modèle (cohérence).",
          "Durée suffisante : la significativité statistique demande du volume et du temps.",
          "Métriques décidées à l'avance : on ne choisit pas le gagnant après coup sur la métrique qui arrange.",
        ],
      },
    ],
  },
  {
    id: "shadow-deployment",
    title: "Shadow deployment",
    level: 3,
    intro:
      "Tester sans risque : le nouveau modèle prédit en silence.",
    blocks: [
      {
        kind: "text",
        text: "En shadow, le nouveau modèle reçoit une copie du trafic réel et prédit — mais ses prédictions ne sont pas servies aux utilisateurs, seulement loguées et comparées à l'ancien modèle. Zéro risque utilisateur, validation sur données réelles. Idéal avant un canary : on détecte les plantages et les divergences sans exposer personne.",
      },
    ],
  },
  {
    id: "ci-cd-modeles",
    title: "CI/CD pour les modèles",
    level: 3,
    intro:
      "Le pipeline qui entraîne, valide et déploie automatiquement.",
    blocks: [
      {
        kind: "list",
        items: [
          "CI : à chaque commit, tests unitaires (prétraitement, format), entraînement sur échantillon, évaluation vs seuils.",
          "Garde-fou : le modèle promu en production doit battre le modèle actuel sur les métriques de référence — sinon, blocage.",
          "CD : packaging → staging → tests de fumée (requêtes réelles) → canary en production.",
          "Artefacts versionnés : modèle, données (DVC), image Docker — tout est traçable.",
          "Rollback automatique : si les métriques du canary se dégradent, retour à la version précédente sans intervention.",
        ],
      },
    ],
  },
  {
    id: "tests-modeles",
    title: "Tester les modèles",
    level: 3,
    intro:
      "Au-delà de l'accuracy : les tests qu'un modèle doit passer.",
    blocks: [
      {
        kind: "list",
        items: [
          "Tests de non-régression : le nouveau modèle ne doit pas perdre sur les cas critiques (exemples golden).",
          "Tests de robustesse : entrées limites, valeurs manquantes, bruit — le modèle ne doit pas planter.",
          "Tests de biais : performance par sous-groupe (âge, genre, région) — un modèle globalement bon peut être injuste localement.",
          "Tests de latence : p95 sous le budget, sur l'infrastructure de production.",
          "Tests de sérialisation : le modèle se recharge dans l'environnement de serving (versions compatibles).",
        ],
      },
    ],
  },
  {
    id: "couts-inference",
    title: "Coûts d'inférence",
    level: 3,
    intro:
      "Servir un modèle coûte : comprendre et optimiser la facture.",
    blocks: [
      {
        kind: "text",
        text: "Les coûts : calcul (CPU/GPU par prédiction), mémoire (modèles lourds), et trafic. Les leviers : batch quand possible, cache des prédictions fréquentes, modèles distillés/quantifiés, instances spot pour le batch, et autoscaling à zéro en dehors des heures d'usage.",
      },
      {
        kind: "list",
        items: [
          "Mesurez le coût par 1000 prédictions : c'est l'unité qui permet de comparer les architectures.",
          "GPU : réservé aux modèles qui en ont besoin (deep learning) ; le classique tourne très bien sur CPU.",
          "Le surdimensionnement est la première source de gaspillage : dimensionnez sur la p95 réelle, pas sur le pic théorique.",
        ],
      },
    ],
  },
  {
    id: "kubernetes-deploiement",
    title: "Déployer sur Kubernetes",
    level: 3,
    intro:
      "L'orchestrateur standard : déploiement déclaratif du service ML.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "deployment.yaml (extrait)",
        code: "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: modele-predict\nspec:\n  replicas: 3\n  template:\n    spec:\n      containers:\n        - name: api\n          image: mon-modele:1.0\n          ports:\n            - containerPort: 8000\n          readinessProbe:\n            httpGet: {path: /health, port: 8000}\n            periodSeconds: 10",
      },
      {
        kind: "text",
        text: "Kubernetes apporte : réplicas, rolling updates natifs, health checks (`readinessProbe`), autoscaling (HPA) et service discovery. Le canary se fait avec deux Deployments et un routage pondéré (Istio, ou un ingress). Pour débuter : un seul Deployment + Service suffit.",
      },
    ],
  },
  {
    id: "serverless",
    title: "Serverless : l'alternative sans serveur",
    level: 3,
    intro:
      "Quand le trafic est irrégulier : payer seulement à l'usage.",
    blocks: [
      {
        kind: "text",
        text: "Les plateformes serverless (AWS Lambda, Cloud Run) exécutent le conteneur à la demande et scalent à zéro quand il n'y a pas de trafic : idéal pour un usage intermittent ou un prototype. Limites : démarrage à froid (cold start — le chargement du modèle prend des secondes), taille d'image limitée, et coût élevé à fort volume constant.",
      },
    ],
  },
  {
    id: "documentation-modele",
    title: "Documenter : model cards",
    level: 3,
    intro:
      "Un modèle déployé se documente : la model card.",
    blocks: [
      {
        kind: "list",
        items: [
          "Usage prévu et limites : pour quoi le modèle est fait — et pour quoi il ne l'est PAS.",
          "Données d'entraînement : sources, période, biais connus.",
          "Métriques d'évaluation : par sous-groupe, pas seulement globales.",
          "Version, auteur, date, et lien vers le registre.",
          "Considérations éthiques : risques d'usage abusif, populations impactées.",
        ],
      },
      {
        kind: "text",
        text: "La model card est le contrat entre l'équipe ML et les utilisateurs du modèle : elle dit ce qu'on peut en attendre et ce qu'il ne faut pas en attendre. Exigez-en une avant tout déploiement en production.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pièges classiques du déploiement ML, et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Le notebook en production",
            value:
              "Problem : le modèle tourne depuis un notebook sur un serveur. Why : on a « déployé » en copiant des fichiers. Better : API packagée, conteneurisée, versionnée.",
          },
          {
            label: "Prétraitement désynchronisé",
            value:
              "Problem : les prédictions sont fausses alors que le modèle est bon. Why : le scaler/encodeur de prod diffère de l'entraînement. Better : Pipeline sérialisé avec le modèle, testé de bout en bout.",
          },
          {
            label: "Pas de versioning",
            value:
              "Problem : impossible de savoir quel modèle tourne, ni de revenir en arrière. Why : fichiers nommés `modele_final.joblib`. Better : registre de modèles, tags d'images, traçabilité.",
          },
          {
            label: "Dérive ignorée",
            value:
              "Problem : la qualité se dégrade pendant des mois sans alerte. Why : aucun monitoring des distributions. Better : surveillance de la dérive dès le jour 1.",
          },
          {
            label: "Secrets dans l'image",
            value:
              "Problem : clé API dans le Dockerfile, visible par tous. Why : facilité. Better : variables d'environnement, gestionnaire de secrets.",
          },
          {
            label: "Pas de health check",
            value:
              "Problem : l'orchestrateur route vers une instance dont le modèle n'est pas chargé. Why : health check absent ou superficiel. Better : readiness qui vérifie le modèle.",
          },
          {
            label: "Latence non mesurée",
            value:
              "Problem : l'API met 3 secondes, les utilisateurs partent. Why : testé seulement en local. Better : budget de latence, p95 monitorée, optimisation si besoin.",
          },
          {
            label: "Déploiement big-bang",
            value:
              "Problem : 100 % du trafic sur le nouveau modèle, qui s'avère défectueux. Why : pas de stratégie progressive. Better : canary ou blue-green, rollback préparé.",
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
      "Les règles qui distinguent un prototype d'un service ML fiable.",
    blocks: [
      {
        kind: "list",
        items: [
          "Sérialisez le pipeline complet (prétraitement + modèle), pas le modèle seul.",
          "Versionnez tout : code (Git), données (DVC), modèle (registre), image (tags).",
          "Validez automatiquement : un modèle moins bon ne part jamais en production.",
          "Déployez progressivement (canary), avec rollback préparé et testé.",
          "Surveillez la dérive dès le premier jour, pas quand les utilisateurs se plaignent.",
          "Health checks réels, logs structurés, secrets hors du code et des images.",
          "Model card avant chaque mise en production.",
          "Préférez le batch au temps réel quand le besoin le permet : 10× plus simple à opérer.",
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 3,
    intro:
      "Quatre projets de difficulté croissante pour passer de la théorie à la pratique professionnelle.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — API locale",
        fields: [
          { label: "Compétences requises", value: "Python, scikit-learn" },
          { label: "Ce que vous construisez", value: "Modèle entraîné, API FastAPI avec /predict et /health, tests curl" },
          { label: "Ce que vous apprenez", value: "Sérialisation, serving HTTP, validation des entrées" },
          { label: "Difficulté attendue", value: "Faible — quelques heures" },
          { label: "Projet suivant", value: "Conteneurisation" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Service conteneurisé",
        fields: [
          { label: "Compétences requises", value: "Docker, environnements" },
          { label: "Ce que vous construisez", value: "Image versionnée, configuration par environnement, staging vs prod, rollback documenté" },
          { label: "Ce que vous apprenez", value: "Reproductibilité, séparation config/code, procédure de rollback" },
          { label: "Difficulté attendue", value: "Moyenne — une semaine" },
          { label: "Projet suivant", value: "Monitoring de dérive" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Monitoring et canary",
        fields: [
          { label: "Compétences requises", value: "Statistiques, stratégie de déploiement" },
          { label: "Ce que vous construisez", value: "Détection de dérive (comparaison de distributions), déploiement canary avec métriques comparées, alertes" },
          { label: "Ce que vous apprenez", value: "La surveillance spécifique au ML, le déploiement progressif" },
          { label: "Difficulté attendue", value: "Élevée — deux semaines" },
          { label: "Projet suivant", value: "Pipeline MLOps complet" },
        ],
      },
      {
        kind: "fields",
        title: "Professionnel — Pipeline MLOps",
        fields: [
          { label: "Compétences requises", value: "CI/CD, registre, Kubernetes" },
          { label: "Ce que vous construisez", value: "Pipeline : réentraînement auto, validation avec garde-fou, registre MLflow, déploiement canary sur Kubernetes, rollback auto" },
          { label: "Ce que vous apprenez", value: "Le cycle ML complet et automatisé, comme en entreprise" },
          { label: "Difficulté attendue", value: "Professionnelle — plusieurs semaines" },
          { label: "Projet suivant", value: "A/B testing et optimisation des coûts" },
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
          { label: "Documentation FastAPI", value: "API, validation Pydantic, déploiement — le guide de référence." },
          { label: "Documentation MLflow", value: "Tracking, registre de modèles, déploiement." },
          { label: "Documentation DVC", value: "Versionnement des données et pipelines reproductibles." },
          { label: "Documentation Evidently", value: "Détection de dérive et monitoring de modèles." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : déployez un vrai modèle (même simple) de bout en bout — chaque étape révèle des problèmes que la théorie cache.",
          "Référence : les guides MLOps des cloud providers pour les architectures managées.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Déploiement maîtrisé, voici les prolongements naturels dans la roadmap Data Scientist.",
    blocks: [
      {
        kind: "list",
        items: [
          "Automatiser le cycle : `experimentation` — les pratiques de test et de validation continue s'appliquent à vos modèles.",
          "Approfondir l'évaluation : `machine-learning` — améliorer le modèle lui-même avant de le redéployer.",
          "Communiquer les résultats : `storytelling` — présenter l'impact du modèle déployé.",
          "Revenir à la roadmap : valider Deployment et consolider le cycle MLOps complet.",
        ],
      },
    ],
  },
  {
    id: "feature-flags",
    title: "Feature flags pour modèles",
    level: 3,
    intro:
      "Activer un modèle sans redéployer : les drapeaux de fonctionnalités.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Routage par flag",
        code: "import os\n\nMODELE_ACTIF = os.environ.get(\"MODELE_ACTIF\", \"v1\")\n\nmodeles = {\n    \"v1\": joblib.load(\"modele_v1.joblib\"),\n    \"v2\": joblib.load(\"modele_v2.joblib\"),\n}\n\n@app.post(\"/predict\")\ndef predict(payload: dict):\n    modele = modeles[MODELE_ACTIF]\n    return {\"prediction\": float(modele.predict([payload[\"features\"]])[0]),\n            \"modele\": MODELE_ACTIF}",
      },
      {
        kind: "text",
        text: "Le flag découple le déploiement (le code et les deux modèles sont en place) de l'activation (on bascule v1 → v2 par configuration) : rollback instantané sans redéploiement, A/B test par pourcentage, activation progressive. Les plateformes de feature flags (LaunchDarkly, Unleash open source) gèrent le ciblage fin.",
      },
    ],
  },
  {
    id: "data-pipelines",
    title: "Pipelines de données : Airflow",
    level: 3,
    intro:
      "Alimenter le modèle en continu : l'orchestration des données.",
    blocks: [
      {
        kind: "text",
        text: "Un modèle en production a besoin de données fraîches : extraction, validation, features, (ré)entraînement. Apache Airflow orchestre ces pipelines en DAGs (graphes de tâches) planifiés : chaque étape est traçée, relançable, alertée en cas d'échec.",
      },
      {
        kind: "list",
        items: [
          "Idempotence : une tâche relancée produit le même résultat — indispensable quand un run échoue à mi-chemin.",
          "Validation des données en entrée du pipeline : un schéma qui change en amont ne doit pas corrompre l'entraînement en silence.",
          "Séparez features d'entraînement et d'inférence partagées (feature store) : la cohérence train/serve est la source n°1 des écarts.",
        ],
      },
    ],
  },
  {
    id: "edge-inference",
    title: "Edge : l'inférence embarquée",
    level: 3,
    intro:
      "Quand le cloud est trop loin : prédire sur l'appareil.",
    blocks: [
      {
        kind: "text",
        text: "L'inférence edge exécute le modèle sur l'appareil (téléphone, caméra, capteur) plutôt que sur un serveur : latence minimale, fonctionnement hors-ligne, données qui ne quittent pas l'appareil (vie privée). Le prix : modèles compressés (quantification, distillation) et formats portables (ONNX, TensorFlow Lite).",
      },
      {
        kind: "list",
        items: [
          "Cas typiques : détection sur caméra, clavier prédictif, maintenance sur capteurs industriels.",
          "Le déploiement devient une mise à jour d'app : versionnez le modèle comme un asset applicatif.",
          "Surveillez à distance : les modèles edge dérivent aussi — prévoyez la télémétrie et les mises à jour.",
        ],
      },
    ],
  },
  {
    id: "llm-deployment",
    title: "Déployer des LLM",
    level: 3,
    intro:
      "Le cas particulier des grands modèles de langage : servir des milliards de paramètres.",
    blocks: [
      {
        kind: "command",
        label: "Servir un LLM en local (Ollama)",
        command: "ollama run llama3.1",
        why: "Ollama télécharge et sert un LLM via une API locale compatible OpenAI : le moyen le plus rapide d'avoir un modèle de langage en service (prototypage, usage interne). La production utilise des serveurs optimisés (vLLM, TensorRT-LLM) avec batching continu.",
        verify: "curl -s localhost:11434/api/tags",
      },
      {
        kind: "list",
        items: [
          "Le coût est dominé par la mémoire GPU : quantifiez (GGUF, AWQ) pour diviser par 2-4 la VRAM.",
          "vLLM : le serveur de référence (paged attention, batching continu) pour servir des LLM en production.",
          "Évaluez les prompts versionnés : un LLM déployé se teste comme un modèle (jeux de prompts golden) et se surveille (dérive des réponses).",
          "Sécurité : filtrage des entrées/sorties, rate limiting strict — un LLM exposé est une surface d'abus.",
        ],
      },
    ],
  },
];

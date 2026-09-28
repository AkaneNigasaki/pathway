import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de la perception en robotique : vision par
 * ordinateur, LiDAR, SLAM, filtrage et fusion de capteurs. Le code Python
 * / OpenCV est minimal et n'utilise que des API standard vérifiables.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_PERCEPTION: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction : donner des sens au robot",
    level: 1,
    intro:
      "La perception transforme des signaux bruts (pixels, distances, accélérations) en une représentation du monde que le robot peut utiliser.",
    blocks: [
      {
        kind: "text",
        text: "Un robot autonome doit répondre à trois questions en permanence : où suis-je ? Qu'y a-t-il autour de moi ? Où sont les choses qui m'intéressent ? La perception y répond en traitant les capteurs : la caméra voit, le LiDAR mesure les distances, l'IMU sent les mouvements — et les algorithmes fusionnent tout cela en une carte, une position, des objets détectés.",
      },
      {
        kind: "diagram",
        title: "Le pipeline de perception",
        lines: [
          "CAPTEURS (caméra, LiDAR, IMU, odométrie)",
          "     │ données brutes",
          "     ▼",
          "PRÉTRAITEMENT (filtrage, calibration, synchronisation)",
          "     │ données propres",
          "     ▼",
          "EXTRACTION (contours, points caractéristiques, objets)",
          "     │ observations",
          "     ▼",
          "ESTIMATION (position, carte, trajectoires d'objets)",
          "     │ état du monde",
          "     ▼",
          "PLANIFICATION & CONTRÔLE (décident et agissent)",
        ],
      },
      {
        kind: "text",
        text: "Point fondamental : aucun capteur n'est parfait — la caméra est aveugle dans le noir, le LiDAR rate les vitres, l'odométrie dérive. La perception robuste ne cherche pas le capteur parfait : elle combine des capteurs imparfaits dont les faiblesses se compensent (la fusion).",
      },
    ],
  },
  {
    id: "ou-s-applique",
    title: "Où la perception s'applique",
    level: 1,
    intro:
      "De l'aspirateur au rover : les mêmes questions, des capteurs adaptés.",
    blocks: [
      {
        kind: "fields",
        title: "Les applications",
        fields: [
          {
            label: "Navigation",
            value:
              "Se localiser et cartographier (SLAM) : aspirateurs, entrepôts, voitures autonomes — savoir où l'on est pour décider où aller.",
          },
          {
            label: "Manipulation",
            value:
              "Voir l'objet à saisir : détecter, estimer sa pose 3D, guider le bras — la vision industrielle et la logistique.",
          },
          {
            label: "Interaction",
            value:
              "Détecter et suivre des humains ou des objets : robots de service, suivi de cible, évitement.",
          },
          {
            label: "Inspection",
            value:
              "Voir ce que l'humain ne voit pas (ou ne veut pas voir) : drones d'inspection, contrôle qualité — la perception comme instrument de mesure.",
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
      "La perception marie le traitement d'images, les probabilités et la géométrie.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut savoir, et pourquoi",
        fields: [
          {
            label: "Python : NumPy et traitement",
            value:
              "Manipuler images et tableaux efficacement : une image est un tableau NumPy — sans aisance avec les tableaux, pas de vision.",
          },
          {
            label: "Mathématiques : algèbre linéaire",
            value:
              "Rotations, projections, transformations : la géométrie de la vision (caméra, repères 3D) est de l'algèbre linéaire appliquée.",
          },
          {
            label: "Mathématiques : probabilités",
            value:
              "Bruit, incertitude, estimation : le filtrage (Kalman, particulaire) et le SLAM sont des raisonnements probabilistes.",
          },
          {
            label: "Linux : environnement",
            value:
              "Installer et faire tourner les bibliothèques (OpenCV), gérer caméra et flux : l'atelier du roboticien.",
          },
        ],
      },
      {
        kind: "text",
        text: "Chaque prérequis est cliquable dans la roadmap. La perception est le skill où les maths (géométrie, probas) paient le plus directement : chaque concept avancé en dépend.",
      },
    ],
  },
  {
    id: "outillage-perception",
    title: "Outillage : Python + OpenCV",
    level: 2,
    intro:
      "L'atelier de vision : installer la bibliothèque de référence et vérifier qu'elle voit.",
    blocks: [
      {
        kind: "command",
        label: "Installer OpenCV et NumPy",
        command: "pip install opencv-python numpy matplotlib",
        why: "Installe OpenCV (traitement d'image : acquisition, filtrage, détection), NumPy (les images sont des tableaux NumPy) et Matplotlib (afficher et comparer les résultats). C'est l'environnement minimal de tout travail de vision.",
        verify: "python -c \"import cv2; print(cv2.__version__)\"",
      },
      {
        kind: "text",
        text: "Vérifier la caméra : le premier programme ouvre le flux vidéo et l'affiche — si l'image s'affiche, la chaîne acquisition est validée et tout le reste peut commencer. La section « premier pipeline » ci-dessous le fait pas à pas.",
      },
    ],
  },
  {
    id: "concept-opencv",
    title: "OpenCV : la bibliothèque de vision",
    level: 2,
    intro:
      "Acquisition, filtrage, détection : les briques de tout pipeline.",
    blocks: [
      {
        kind: "fields",
        title: "Les modules utilisés en robotique",
        fields: [
          {
            label: "Acquisition (`VideoCapture`)",
            value:
              "Ouvrir une caméra ou un fichier vidéo et lire les images une par une : l'entrée de tout pipeline temps réel.",
          },
          {
            label: "Prétraitement (`cvtColor`, `GaussianBlur`)",
            value:
              "Convertir en niveaux de gris, réduire le bruit : préparer l'image avant toute détection — une détection sur image bruitée détecte du bruit.",
          },
          {
            label: "Détection (`Canny`, `findContours`)",
            value:
              "Extraire contours et formes : la base du suivi d'objets simples et de la détection de lignes/repères.",
          },
          {
            label: "Calibration (`calibrateCamera`)",
            value:
              "Estimer les paramètres de la caméra (focale, distorsion) à partir d'un damier : indispensable pour toute mesure 3D.",
          },
        ],
      },
      {
        kind: "text",
        text: "Principe d'usage : OpenCV fournit les briques, pas les solutions — un pipeline robotique assemble acquisition → prétraitement → détection → décision, avec des paramètres réglés sur les images réelles du robot, pas sur des images d'exemple.",
      },
    ],
  },
  {
    id: "concept-detection",
    title: "Détection d'objets (YOLO)",
    level: 2,
    intro:
      "Localiser et nommer les objets en temps réel : le principe des détecteurs modernes.",
    blocks: [
      {
        kind: "text",
        text: "Les détecteurs temps réel (famille YOLO) traitent l'image en une passe : un réseau de neurones prédit directement des boîtes englobantes + classes (« personne : 0,92 »). C'est ce qui permet à un robot de « voir » des objets nommés à 30 images/s.",
      },
      {
        kind: "list",
        items: [
          "Entraînement : le réseau apprend sur des milliers d'images annotées — la qualité du dataset fait la qualité du détecteur.",
          "Compromis vitesse/précision : les variantes légères tournent sur embarqué (moins précises), les lourdes exigent un GPU.",
          "Limites : objets petits, occultés ou hors du domaine d'entraînement — le détecteur se trompe avec assurance ; toujours valider sur les images du robot.",
          "En robotique : la détection donne des boîtes 2D — la profondeur (stéréo, RGB-D, LiDAR) les projette en 3D pour l'action.",
        ],
      },
    ],
  },
  {
    id: "concept-lidar-slam",
    title: "LiDAR et SLAM",
    level: 2,
    intro:
      "Mesurer le monde au laser et s'y localiser en le cartographiant.",
    blocks: [
      {
        kind: "fields",
        title: "Les concepts",
        fields: [
          {
            label: "LiDAR",
            value:
              "Émet des impulsions laser et mesure le temps de retour : chaque rayon donne une distance — des milliers par tour, un nuage de points 2D/3D précis, de jour comme de nuit.",
          },
          {
            label: "SLAM",
            value:
              "Simultaneous Localization And Mapping : construire la carte tout en s'y localisant — le problème « poule et œuf » de la navigation, résolu par filtrage probabiliste.",
          },
          {
            label: "Carte d'occupation",
            value:
              "La carte produite : une grille où chaque cellule est libre, occupée ou inconnue — c'est sur elle que planifie la navigation.",
          },
        ],
      },
      {
        kind: "text",
        text: "Forces et limites du LiDAR : précis et insensible à la lumière, mais aveugle sur les vitres et miroirs, coûteux en 3D, et sans couleur/sémantique — d'où la fusion avec la caméra.",
      },
    ],
  },
  {
    id: "concept-kalman",
    title: "Filtre de Kalman",
    level: 2,
    intro:
      "Fusionner prédiction et mesures : l'estimateur optimal linéaire.",
    blocks: [
      {
        kind: "text",
        text: "Le filtre de Kalman estime l'état (position, vitesse) en alternant prédiction (le modèle prédit où l'on devrait être) et correction (la mesure recale la prédiction). La fusion est pondérée par les incertitudes : on fait plus confiance à la source la moins bruitée — automatiquement, à chaque pas.",
      },
      {
        kind: "list",
        items: [
          "Prédiction : `x̂ ← F·x̂` (le modèle fait avancer l'état), l'incertitude grandit.",
          "Correction : on compare la mesure prédite à la mesure réelle, on corrige proportionnellement au gain de Kalman, l'incertitude diminue.",
          "Hypothèses : système linéaire, bruits gaussiens — violées en pratique, mais le filtre reste robuste si on règle bien les covariances.",
          "En robotique : localiser (GPS + IMU + odométrie), suivre des objets, estimer des vitesses à partir de positions bruitées.",
        ],
      },
    ],
  },
  {
    id: "concept-fusion",
    title: "Fusion de capteurs",
    level: 2,
    intro:
      "Aucun capteur ne suffit : combiner pour compenser.",
    blocks: [
      {
        kind: "table",
        headers: ["Capteur", "Forces", "Faiblesses"],
        rows: [
          ["Caméra", "Riche, couleur, sémantique", "Aveugle sans lumière, pas de profondeur directe"],
          ["LiDAR", "Profondeur précise, jour/nuit", "Coût, vitres/miroirs, pas de couleur"],
          ["IMU", "Haute fréquence, mouvements rapides", "Dérive vite (biais, bruit)"],
          ["Odométrie roues", "Simple, proprioceptive", "Glissement, dérive en rotation"],
          ["GPS", "Absolu, sans dérive", "Extérieur seul, précision métrique, masquages"],
        ],
      },
      {
        kind: "text",
        text: "La fusion marie les complémentaires : l'IMU donne la dynamique rapide entre deux images, la vision recale la dérive, le LiDAR donne la géométrie, le GPS ancre en absolu. Le filtre de Kalman (ou ses variantes) est l'outil standard de cette fusion.",
      },
    ],
  },
  {
    id: "premier-pipeline",
    title: "Premier pipeline : voir des contours",
    level: 2,
    intro:
      "Acquérir, convertir, détecter : le pipeline minimal qui prouve que ça marche.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Ouvrir la caméra",
            detail:
              "`cv2.VideoCapture(0)` ouvre la webcam par défaut ; vérifier que `cap.read()` retourne une image — sinon, essayer un autre index ou vérifier les permissions.",
          },
          {
            title: "Convertir en niveaux de gris",
            detail:
              "`cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)` : la plupart des détections classiques travaillent sur un seul canal — plus simple et plus rapide.",
          },
          {
            title: "Réduire le bruit",
            detail:
              "`cv2.GaussianBlur(gray, (5, 5), 0)` : lisser avant de détecter — sinon le détecteur de contours trouve du bruit partout.",
          },
          {
            title: "Détecter les contours",
            detail:
              "`cv2.Canny(blurred, 100, 200)` : extraire les contours francs. Jouer avec les deux seuils en affichant le résultat : trop bas = bruit, trop haut = contours manqués.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "pipeline_minimal.py",
        code: "import cv2\n\ncap = cv2.VideoCapture(0)\nwhile True:\n    ok, frame = cap.read()\n    if not ok:\n        break\n    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)\n    blurred = cv2.GaussianBlur(gray, (5, 5), 0)\n    edges = cv2.Canny(blurred, 100, 200)\n    cv2.imshow(\"Contours\", edges)\n    if cv2.waitKey(1) & 0xFF == ord(\"q\"):\n        break\ncap.release()\ncv2.destroyAllWindows()",
      },
    ],
  },
  {
    id: "flux-professionnel",
    title: "Flux professionnel : du dataset au déploiement",
    level: 2,
    intro:
      "Pour la perception par apprentissage : collecter, annoter, entraîner, évaluer, déployer.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Collecter sur le robot",
            detail:
              "Enregistrer les images/vidéos dans les conditions réelles (éclairage, angles du robot) : un modèle entraîné sur des images web échoue sur les images du robot.",
          },
          {
            title: "Annoter",
            detail:
              "Boîtes ou masques sur un échantillon représentatif : la qualité des annotations borne la qualité du modèle — annoter avec soin, vérifier par échantillonnage.",
          },
          {
            title: "Entraîner et évaluer",
            detail:
              "Entraîner sur une partie, évaluer sur une autre (jamais vue) : les métriques (précision, rappel) se mesurent sur des données fraîches, pas sur l'entraînement.",
          },
          {
            title: "Déployer et surveiller",
            detail:
              "Porter sur la cible embarquée (quantification, optimisation), mesurer la latence réelle, et surveiller en production : les conditions changent, les performances dérivent.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-perception",
    title: "Déboguer : quand le robot ne voit pas",
    level: 2,
    intro:
      "La méthode : visualiser chaque étape du pipeline.",
    blocks: [
      {
        kind: "fields",
        title: "Symptômes et causes",
        fields: [
          {
            label: "Image noire / figée",
            value:
              "Problème d'acquisition : caméra débranchée, mauvais index, permissions — vérifier avec l'outil le plus simple avant d'incriminer l'algorithme.",
          },
          {
            label: "Détection instable (clignote)",
            value:
              "Seuils trop agressifs ou bruit : adoucir (hystérésis temporelle, filtrage), ou passer au suivi (tracking) plutôt qu'à la détection pure image par image.",
          },
          {
            label: "Faux positifs",
            value:
              "Le détecteur voit des objets partout : seuil de confiance trop bas, ou domaine différent de l'entraînement — remonter le seuil, ré-entraîner sur les vraies images.",
          },
          {
            label: "Objets manqués",
            value:
              "Trop petits, trop loin, occultés, ou éclairage différent : vérifier la taille en pixels (un objet de 10 px est indétectable) et les conditions.",
          },
          {
            label: "Latence énorme",
            value:
              "Le pipeline ne tient pas le temps réel : profiler par étape (acquisition ? réseau de neurones ?), réduire la résolution ou le modèle.",
          },
        ],
      },
    ],
  },
  {
    id: "tester-perception",
    title: "Tester : mesurer la perception",
    level: 2,
    intro:
      "Précision, rappel, latence : chiffrer au lieu d'impressionner.",
    blocks: [
      {
        kind: "fields",
        title: "Les métriques",
        fields: [
          {
            label: "Précision",
            value:
              "Parmi les détections, la part de vraies : une précision basse = trop de faux positifs — le robot réagit à des fantômes.",
          },
          {
            label: "Rappel",
            value:
              "Parmi les vrais objets, la part détectée : un rappel bas = objets manqués — le robot ignore des obstacles réels.",
          },
          {
            label: "IoU",
            value:
              "Intersection sur Union : recouvrement entre boîte prédite et vérité terrain — le critère pour dire qu'une détection « compte » (typiquement IoU > 0,5).",
          },
          {
            label: "Latence",
            value:
              "Temps entre l'image et la décision : une détection parfaite mais vieille d'une seconde est inutile en navigation.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le compromis précision/rappel se règle par le seuil de confiance : l'augmenter réduit les faux positifs (précision ↑) mais manque plus d'objets (rappel ↓). Le bon seuil dépend de l'application — manquer un obstacle est plus grave qu'une fausse alerte.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 2,
    intro:
      "Les pièges de la vision en robotique.",
    blocks: [
      {
        kind: "list",
        items: [
          "Oublier la calibration : utiliser une caméra non calibrée pour mesurer du 3D — les distorsions faussent toutes les mesures, surtout aux bords.",
          "Ignorer l'éclairage : régler les seuils en labo et tester en extérieur — la lumière change tout, prévoir l'adaptation (exposition auto, normalisation).",
          "Tester sur les images d'entraînement : évaluer un modèle sur ses propres données d'apprentissage — le score est flatteur et faux.",
          "Résolution excessive : traiter du 4K quand du 640×480 suffit — la latence explose pour un gain nul sur la tâche.",
          "Confondre détection et suivi : re-détecter à chaque image sans suivi temporel — instable et coûteux ; le tracking lisse et prédit.",
          "Négliger la synchronisation : fusionner une image et une mesure IMU sans horodatage commun — la fusion mélange des instants différents.",
          "Croire le simulateur : un détecteur parfait en simulation échoue sur le réel — le sim-to-real gap est la règle, pas l'exception.",
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "formation-image",
    title: "Formation de l'image",
    level: 3,
    intro:
      "De la lumière aux pixels : exposition, focale, capteur.",
    blocks: [
      {
        kind: "fields",
        title: "Les paramètres",
        fields: [
          {
            label: "Exposition",
            value:
              "Temps d'intégration du capteur : trop court = image sombre et bruitée, trop long = flou de mouvement. En robotique mobile, on privilégie le temps court (netteté) quitte à monter le gain.",
          },
          {
            label: "Focale",
            value:
              "Angle de vue : grand-angle voit large mais petit (objets minuscules en pixels), téléobjectif voit loin mais étroit — choisir selon la tâche (navigation vs inspection).",
          },
          {
            label: "Profondeur de champ",
            value:
              "La plage nette : en robotique on veut souvent tout net (petite ouverture) plutôt qu'un joli flou artistique.",
          },
          {
            label: "Obturateur global vs déroulant",
            value:
              "Le rolling shutter déforme les objets en mouvement rapide (effet « gelée ») : pour un robot qui bouge vite, préférer le global shutter.",
          },
        ],
      },
    ],
  },
  {
    id: "modele-stenope",
    title: "Modèle sténopé et projection",
    level: 3,
    intro:
      "Comment un point 3D devient un pixel : les équations de la caméra.",
    blocks: [
      {
        kind: "text",
        text: "Modèle sténopé : un point 3D `(X, Y, Z)` se projette en `(u, v)` par `u = fx·X/Z + cx`, `v = fy·Y/Z + cy`. `fx, fy` sont les focales en pixels, `(cx, cy)` le centre optique — les paramètres intrinsèques obtenus par calibration. La division par `Z` explique tout : deux fois plus loin = deux fois plus petit en pixels.",
      },
      {
        kind: "list",
        items: [
          "Conséquence : une caméra seule ne donne pas la profondeur — un objet petit et proche est indiscernable d'un grand et lointain (ambiguïté d'échelle).",
          "La distorsion (radiale, tangentielle) s'ajoute au modèle : elle se calibre et se corrige — ne jamais l'ignorer pour des mesures.",
          "Les paramètres extrinsèques (position/orientation de la caméra sur le robot) placent ces projections dans le repère du robot.",
        ],
      },
    ],
  },
  {
    id: "calibration-camera",
    title: "Calibration de caméra",
    level: 3,
    intro:
      "Estimer les intrinsèques avec un damier : la procédure.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Préparer la mire",
            detail:
              "Damier imprimé proprement, collé à plat, dimensions des cases connues au dixième de mm — la calibration vaut sa mire.",
          },
          {
            title: "Capturer des vues variées",
            detail:
              "20–30 images du damier sous tous les angles, inclinaisons et positions dans l'image (surtout les bords, où la distorsion se voit).",
          },
          {
            title: "Estimer",
            detail:
              "L'algorithme (`calibrateCamera`) minimise l'erreur de reprojection : viser une erreur < 0,5 px — au-delà, recommencer avec de meilleures vues.",
          },
          {
            title: "Valider et figer",
            detail:
              "Vérifier sur des images fraîches (lignes droites qui restent droites après correction), puis ne plus toucher à la focale/zoom — tout changement invalide la calibration.",
          },
        ],
      },
    ],
  },
  {
    id: "filtrage-image",
    title: "Filtrage d'image",
    level: 3,
    intro:
      "Lisser sans détruire : les filtres et leurs compromis.",
    blocks: [
      {
        kind: "fields",
        title: "Les filtres courants",
        fields: [
          {
            label: "Flou gaussien",
            value:
              "Moyenne pondérée par une gaussienne : réduit le bruit mais floute les contours — le compromis standard avant détection.",
          },
          {
            label: "Filtre médian",
            value:
              "Remplace chaque pixel par la médiane du voisinage : excellent contre le bruit impulsionnel (pixels « poivre et sel »), préserve mieux les contours.",
          },
          {
            label: "Flou bilatéral",
            value:
              "Lisse en respectant les contours (pondère aussi par la similarité d'intensité) : plus coûteux, utile avant segmentation.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle : filtrer juste assez pour la tâche — un sur-lissage efface les petits objets qu'on cherche à détecter. Toujours comparer avant/après sur les images réelles.",
      },
    ],
  },
  {
    id: "detection-contours",
    title: "Détection de contours (Canny)",
    level: 3,
    intro:
      "Les trois étapes de Canny : gradient, suppression, hystérésis.",
    blocks: [
      {
        kind: "list",
        items: [
          "Gradient : calculer l'intensité et la direction du changement d'intensité (opérateurs de Sobel) — les contours sont les maxima du gradient.",
          "Suppression des non-maxima : ne garder que les pixels qui sont des maxima locaux dans la direction du gradient — des contours fins d'un pixel.",
          "Seuillage par hystérésis : deux seuils — les contours forts sont gardés, les faibles seulement s'ils sont connectés à des forts. D'où les deux paramètres de `Canny`.",
          "Réglage : le seuil bas ~2–3× plus petit que le haut ; adapter à la scène — il n'y a pas de valeurs universelles.",
        ],
      },
    ],
  },
  {
    id: "seuillage",
    title: "Seuillage et segmentation simple",
    level: 3,
    intro:
      "Séparer l'objet du fond : global, adaptatif, couleur.",
    blocks: [
      {
        kind: "fields",
        title: "Les méthodes",
        fields: [
          {
            label: "Seuil global",
            value:
              "Un seuil unique sur l'intensité : ne marche que si l'objet se détache nettement du fond et l'éclairage est uniforme — rare en robotique réelle.",
          },
          {
            label: "Otsu",
            value:
              "Calcule automatiquement le seuil qui sépare le mieux les deux classes d'intensités : pratique quand l'histogramme est bimodal.",
          },
          {
            label: "Seuillage adaptatif",
            value:
              "Un seuil par région de l'image : robuste aux éclairages inhomogènes — le choix par défaut en conditions variables.",
          },
          {
            label: "Espace HSV",
            value:
              "Seuiller sur la teinte plutôt que sur RGB : bien plus robuste aux variations de luminosité pour les objets colorés (lignes, balises).",
          },
        ],
      },
    ],
  },
  {
    id: "morphologie",
    title: "Morphologie mathématique",
    level: 3,
    intro:
      "Nettoyer les masques binaires : érosion, dilatation, ouverture.",
    blocks: [
      {
        kind: "text",
        text: "Après un seuillage, le masque est bruité (trous, pixels isolés). Érosion : ronge les bords (supprime les petits parasites) ; dilatation : les étend (rebouche les trous) ; ouverture = érosion puis dilatation (nettoie sans changer la taille globale). L'élément structurant (taille, forme) règle l'échelle du nettoyage.",
      },
      {
        kind: "list",
        items: [
          "Usage typique : seuillage couleur → ouverture (nettoyage) → plus grande composante connexe (l'objet) → centroïde pour l'asservissement.",
          "C'est la plomberie du suivi d'objets colorés simple — robuste et temps réel sur microcontrôleur.",
        ],
      },
    ],
  },
  {
    id: "flux-optique",
    title: "Flux optique",
    level: 3,
    intro:
      "Mesurer le mouvement dans l'image : Lucas-Kanade.",
    blocks: [
      {
        kind: "text",
        text: "Le flux optique estime le déplacement de chaque pixel (ou de points d'intérêt) entre deux images, sous l'hypothèse de conservation de la luminosité. Lucas-Kanade suit des points caractéristiques (coins) d'image en image : c'est la base de l'odométrie visuelle — estimer le mouvement du robot à partir du défilement de la scène.",
      },
      {
        kind: "list",
        items: [
          "Points à suivre : détecter des coins (Harris, Shi-Tomasi) — les zones uniformes ne donnent aucune information de mouvement (problème de l'ouverture).",
          "Pyramides : traiter à plusieurs échelles pour suivre les grands déplacements.",
          "Limites : échecs sur scènes uniformes, mouvements brusques, changements d'éclairage — d'où la fusion avec l'IMU.",
        ],
      },
    ],
  },
  {
    id: "stereo-vision",
    title: "Stéréovision",
    level: 3,
    intro:
      "Deux caméras, une profondeur : disparité et triangulation.",
    blocks: [
      {
        kind: "text",
        text: "Deux caméras séparées d'une baseline `B` voient le même point avec un décalage horizontal (disparité `d`, en pixels). Profondeur : `Z = f·B / d` — inversement proportionnelle à la disparité. Doubler la baseline double la précision, mais réduit le recouvrement des vues.",
      },
      {
        kind: "list",
        items: [
          "Rectification : les images sont redressées pour que les correspondances se cherchent sur des lignes horizontales — la calibration stéréo est critique.",
          "Précision en `Z²` : l'erreur de profondeur croît avec le carré de la distance — la stéréo est précise près, floue loin.",
          "Échec sur zones uniformes : sans texture, pas de correspondance — les caméras à projection de motif (lumière structurée) pallient en intérieur.",
        ],
      },
    ],
  },
  {
    id: "rgb-d",
    title: "Caméras RGB-D",
    level: 3,
    intro:
      "Couleur + profondeur par pixel : la perception 3D accessible.",
    blocks: [
      {
        kind: "list",
        items: [
          "Principe : lumière structurée ou temps de vol par pixel — chaque pixel a sa distance, synchronisée avec la couleur.",
          "Usage roi : manipulation (pose d'objet 3D), cartographie intérieure dense, interaction — là où le LiDAR est trop cher ou trop gros.",
          "Limites : portée courte (quelques mètres), sensible au soleil (infrarouge noyé), bruit sur surfaces réfléchissantes.",
          "Alignement : la profondeur et la couleur viennent de capteurs différents — l'étalonnage usine suffit généralement, à vérifier pour la précision.",
        ],
      },
    ],
  },
  {
    id: "lidar-detail",
    title: "LiDAR en détail",
    level: 3,
    intro:
      "Temps de vol, nuages de points, et ce que le LiDAR ne voit pas.",
    blocks: [
      {
        kind: "text",
        text: "Le LiDAR mesure `d = c·t / 2` (temps de vol aller-retour de l'impulsion, `c` vitesse de la lumière). Un LiDAR 2D balaie un plan (typiquement 360°, quelques milliers de points/tour à 5–15 Hz) ; un 3D balaie plusieurs plans et produit un nuage volumique.",
      },
      {
        kind: "fields",
        title: "Forces et angles morts",
        fields: [
          {
            label: "Précision",
            value:
              "Centimétrique, stable, insensible à la lumière ambiante : la référence pour la géométrie.",
          },
          {
            label: "Vitres et miroirs",
            value:
              "Le faisceau traverse ou se réfléchit : les surfaces vitrées sont invisibles ou fantômes — combiner avec d'autres capteurs près des vitrines.",
          },
          {
            label: "Objets fins et noirs",
            value:
              "Fils, surfaces très absorbantes : peu ou pas de retour — le LiDAR seul ne suffit pas pour les obstacles fins.",
          },
          {
            label: "Densité vs coût",
            value:
              "Plus de nappes = plus d'information = plus cher : dimensionner selon la tâche (un 2D suffit pour naviguer au sol en intérieur).",
          },
        ],
      },
    ],
  },
  {
    id: "slam-detail",
    title: "SLAM en détail",
    level: 3,
    intro:
      "Cartographier en se localisant : front-end, back-end, fermeture de boucle.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois blocs du SLAM",
        fields: [
          {
            label: "Front-end (odométrie)",
            value:
              "Estimer le mouvement relatif entre instants (scan matching LiDAR, odométrie visuelle) : précis à court terme, il dérive.",
          },
          {
            label: "Back-end (optimisation)",
            value:
              "Optimiser l'ensemble de la trajectoire et de la carte (graphe de poses) : répartir les erreurs pour une carte globalement cohérente.",
          },
          {
            label: "Fermeture de boucle",
            value:
              "Reconnaître un lieu déjà visité et corriger la dérive accumulée : sans elle, la carte « dérive » et se replie sur elle-même.",
          },
        ],
      },
      {
        kind: "text",
        text: "En pratique : pour un robot d'intérieur, un SLAM LiDAR 2D éprouvé suffit largement ; le SLAM visuel/3D dense est plus informatif mais plus lourd et plus fragile. Toujours valider la carte produite (murs droits, pas de doublons) avant de naviguer dessus.",
      },
    ],
  },
  {
    id: "cartographie-occupation",
    title: "Cartes d'occupation",
    level: 3,
    intro:
      "La carte que la navigation utilise : grilles probabilistes.",
    blocks: [
      {
        kind: "text",
        text: "Une carte d'occupation découpe l'espace en cellules, chacune avec une probabilité d'occupation mise à jour par chaque observation (un rayon LiDAR qui traverse = cellules libres, qui s'arrête = cellule occupée). Trois états en sortie : libre, occupé, inconnu — et la navigation traite l'inconnu avec prudence.",
      },
      {
        kind: "list",
        items: [
          "Résolution : 5 cm en intérieur courant — plus fin = plus précis mais plus lourd et plus bruité.",
          "Dynamique : les objets mobiles (humains) polluent la carte — couches temporelles ou filtrage pour les oublier.",
          "Couches de coûts : la navigation ajoute des marges de sécurité autour des obstacles (inflation) — voir le skill Planification.",
        ],
      },
    ],
  },
  {
    id: "localisation-particulaire",
    title: "Localisation : filtre particulaire (AMCL)",
    level: 3,
    intro:
      "Se localiser sur une carte connue avec des milliers d'hypothèses.",
    blocks: [
      {
        kind: "text",
        text: "Le filtre particulaire (AMCL) maintient un ensemble d'hypothèses de pose (particules) : chacune prédit le mouvement (odométrie + bruit), puis est pondérée par l'adéquation de la mesure (scan LiDAR vs carte). Les mauvaises hypothèses meurent (rééchantillonnage), les bonnes se multiplient — la distribution converge vers la vraie pose, y compris après un « kidnapping » (téléportation).",
      },
      {
        kind: "list",
        items: [
          "Robuste aux ambiguïtés (couloirs identiques) là où le Kalman (unimodal) se perd.",
          "Coût : des centaines de particules à évaluer à chaque pas — dimensionner selon le CPU.",
          "Initialisation : donner une pose initiale approximative accélère énormément la convergence.",
        ],
      },
    ],
  },
  {
    id: "kalman-detail",
    title: "Kalman en détail : prédiction / correction",
    level: 3,
    intro:
      "Les équations en texte : ce que fait chaque étape.",
    blocks: [
      {
        kind: "text",
        text: "État `x`, covariance `P` (incertitude). Prédiction : `x ← F·x + B·u`, `P ← F·P·F' + Q` — le modèle fait avancer, l'incertitude grandit de `Q` (bruit modèle). Correction : gain `K = P·H'·(H·P·H' + R)⁻¹`, puis `x ← x + K·(z − H·x)`, `P ← (I − K·H)·P` — la mesure `z` recale, pondérée par sa fiabilité `R` face à l'incertitude `P`.",
      },
      {
        kind: "list",
        items: [
          "Régler `Q` et `R` : ce sont les vrais paramètres — `Q` grand = on croit le modèle peu (réactif au capteur), `R` grand = on croit le capteur peu (lisse, lent).",
          "Diagnostic : l'innovation (`z − H·x`) doit être un bruit centré — un biais révèle un modèle ou un capteur faux.",
          "Variantes : EKF (linéarise autour de l'estimé, pour systèmes non linéaires), UKF (points sigma, plus robuste) — mêmes idées, plus de calcul.",
        ],
      },
    ],
  },
  {
    id: "imu-fusion",
    title: "IMU et fusion inertielle",
    level: 3,
    intro:
      "Accéléromètre + gyroscope : vite, mais ça dérive — la fusion compense.",
    blocks: [
      {
        kind: "fields",
        title: "Les deux capteurs",
        fields: [
          {
            label: "Gyroscope",
            value:
              "Vitesse angulaire : intégré, il donne l'orientation — mais le biais s'intègre en dérive (quelques °/min sur un bon MEMS, bien pire sinon).",
          },
          {
            label: "Accéléromètre",
            value:
              "Accélération + gravité : donne l'inclinaison absolue (le « bas ») en moyenne, mais bruité et pollué par les accélérations du robot.",
          },
          {
            label: "Filtre complémentaire",
            value:
              "Le plus simple : orientation = α·(gyro intégré) + (1−α)·(accéléro), α ~0,98 — le gyro pour le rapide, l'accéléro pour recaler la dérive. Suffit pour stabiliser un drone en loisir.",
          },
          {
            label: "Kalman étendu",
            value:
              "La version sérieuse : estime orientation + biais gyro en ligne — indispensable pour une navigation inertielle de qualité.",
          },
        ],
      },
    ],
  },
  {
    id: "odometrie",
    title: "Odométrie : roues et visuelle",
    level: 3,
    intro:
      "Intégrer le mouvement : simple, locale, dérivante.",
    blocks: [
      {
        kind: "text",
        text: "Odométrie roues : à partir des vitesses des roues (codeurs) et de la géométrie du châssis, intégrer pour obtenir la pose. Elle est précise à court terme et dérive — surtout en rotation (glissement). L'odométrie visuelle fait la même chose avec une caméra (flux optique / appariement) : pas de glissement, mais sensible à la texture et à la lumière.",
      },
      {
        kind: "list",
        items: [
          "Usage : l'odométrie est une excellente estimation locale (entre deux recalages) — jamais une localisation globale seule.",
          "Calibration : diamètre des roues, voie, résolution codeurs — une erreur de 1 % sur le diamètre = 1 % d'erreur de distance, qui s'accumule.",
          "Fusion : odométrie + IMU + (vision ou LiDAR) au Kalman — chaque source compense les dérives des autres.",
        ],
      },
    ],
  },
  {
    id: "yolo-detail",
    title: "Détection temps réel : le principe",
    level: 3,
    intro:
      "Comment un réseau « voit » des objets en une passe.",
    blocks: [
      {
        kind: "text",
        text: "Principe (famille YOLO) : l'image passe une fois dans un réseau convolutif qui prédit, sur une grille, des boîtes (centre, taille) + une classe + un score de confiance. Les doublons sont éliminés (suppression des non-maxima : on garde la meilleure boîte par objet). Résultat : des dizaines d'objets nommés à 30+ images/s sur GPU.",
      },
      {
        kind: "list",
        items: [
          "Ancres : des formes de boîtes a priori adaptées au dataset — le réseau affine plutôt qu'il n'invente.",
          "Petits objets : difficiles (peu de pixels) — les variantes récentes améliorent via des prédictions multi-échelles.",
          "Déploiement embarqué : quantification (INT8), élagage, moteurs d'inférence optimisés — diviser la latence par 2–5× au prix d'un peu de précision.",
        ],
      },
    ],
  },
  {
    id: "segmentation",
    title: "Segmentation d'image",
    level: 3,
    intro:
      "Au-delà des boîtes : classer chaque pixel.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois niveaux",
        fields: [
          {
            label: "Sémantique",
            value:
              "Chaque pixel a une classe (route, obstacle, ciel) : pour savoir où l'on peut rouler — la navigation tout-terrain.",
          },
          {
            label: "Instance",
            value:
              "Distinguer les objets de même classe (personne 1 vs personne 2) : suivi multi-objets, comptage.",
          },
          {
            label: "Panoptique",
            value:
              "Les deux à la fois : la scène complète étiquetée — le plus informatif, le plus coûteux.",
          },
        ],
      },
      {
        kind: "text",
        text: "Coût : la segmentation dense est bien plus lourde que la détection par boîtes — à réserver aux tâches qui en ont vraiment besoin (navigabilité fine, manipulation précise).",
      },
    ],
  },
  {
    id: "suivi-objets",
    title: "Suivi d'objets (tracking)",
    level: 3,
    intro:
      "Garder l'identité d'un objet image après image : détection + prédiction.",
    blocks: [
      {
        kind: "text",
        text: "Le tracking associe les détections entre images : prédire où l'objet devrait être (Kalman sur la boîte), associer la détection la plus proche (distance, IoU, apparence), mettre à jour. Ainsi l'objet garde son identité même s'il est brièvement occulté ou si le détecteur rate une image.",
      },
      {
        kind: "list",
        items: [
          "SORT : l'algorithme minimal (Kalman + hongrois) — simple, rapide, efficace quand la détection est bonne.",
          "DeepSORT : ajoute une signature d'apparence (réseau) pour réassocier après occultation longue.",
          "En robotique : le suivi lisse les détections et fournit vitesse/position filtrées — l'entrée propre de l'asservissement visuel.",
        ],
      },
    ],
  },
  {
    id: "estimation-pose",
    title: "Estimation de pose 3D",
    level: 3,
    intro:
      "Où est l'objet en 3D : PnP et nuages de points.",
    blocks: [
      {
        kind: "list",
        items: [
          "PnP (Perspective-n-Point) : à partir de points 3D connus de l'objet et de leurs projections 2D détectées, résoudre la pose caméra↔objet — le classique de la manipulation (prendre une pièce connue).",
          "Nuage de points : recaler le nuage mesuré (RGB-D, stéréo) sur le modèle 3D (ICP : iterative closest point) — précis, mais exige une bonne initialisation.",
          "Marqueurs fiduciels (damier, tags) : la solution pragmatique — une pose précise et robuste pour quelques centimes, quand on contrôle l'environnement.",
          "Incertitude : toute pose estimée a une incertitude — la propager (ou au moins la borner) avant de commander le bras.",
        ],
      },
    ],
  },
  {
    id: "ros-perception",
    title: "Perception sous ROS 2",
    level: 3,
    intro:
      "Brancher la vision au middleware : transport d'images et ponts.",
    blocks: [
      {
        kind: "list",
        items: [
          "Transport d'images : les images transitent par topics — compresser (JPEG) quand la bande passante est limitée, garder le brut quand la qualité prime.",
          "cv_bridge : convertir entre messages ROS (`sensor_msgs/Image`) et matrices OpenCV — le pont standard entre le middleware et le traitement.",
          "Synchronisation : apparier image + profondeur + odométrie par horodatage avant fusion — des messages désynchronisés ruinent la perception 3D.",
          "TF : exprimer chaque détection dans le repère du robot via l'arbre des transformations — une détection sans repère est inexploitable.",
        ],
      },
    ],
  },
  {
    id: "temps-reel-perception",
    title: "Perception temps réel",
    level: 3,
    intro:
      "Tenir le budget : latence, débit, et compromis.",
    blocks: [
      {
        kind: "fields",
        title: "Les leviers",
        fields: [
          {
            label: "Résolution",
            value:
              "Diviser la résolution par 2 divise les pixels par 4 — le levier le plus efficace. Traiter en basse résolution, recadrer en haute sur les zones d'intérêt.",
          },
          {
            label: "Fréquence",
            value:
              "Traiter 1 image sur 2 ou 3 quand la dynamique le permet — le suivi (léger) tourne à chaque image, la détection (lourde) moins souvent.",
          },
          {
            label: "Région d'intérêt",
            value:
              "Ne traiter que là où ça compte (bandeau bas pour la ligne au sol, zone prédite pour le suivi) — le reste est ignoré.",
          },
          {
            label: "Accélération",
            value:
              "GPU embarqué ou accélérateur neuronal pour les réseaux — mesurer la latence réelle sur la cible, pas sur le PC de développement.",
          },
        ],
      },
    ],
  },
  {
    id: "robustesse-perception",
    title: "Robustesse : l'éclairage et le réel",
    level: 3,
    intro:
      "Le monde change : concevoir une perception qui encaisse.",
    blocks: [
      {
        kind: "list",
        items: [
          "Éclairage : exposition automatique, plage dynamique (HDR), normalisation — tester à différentes heures et météos, pas qu'en labo.",
          "Occultations : le suivi prédit à travers les occultations brèves ; au-delà, réinitialiser proprement plutôt que diverger.",
          "Domaine : collecter les données d'entraînement/test dans les vraies conditions du robot — le sim-to-real et le labo-to-terrain sont les deux fossés classiques.",
          "Dégradation gracieuse : quand la perception doute (scores bas, incohérences), le signaler au superviseur — un robot qui sait qu'il ne voit pas bien est plus sûr qu'un robot aveugle et confiant.",
        ],
      },
    ],
  },
  {
    id: "projets-perception",
    title: "Projets",
    level: 3,
    intro:
      "Trois projets progressifs, du pixel au robot qui voit.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Projet 1 — Suivi d'objet coloré",
            detail:
              "Seuillage HSV + morphologie + plus grande composante : suivre une balle colorée à la webcam et afficher sa trajectoire. Mesurer la latence et la robustesse aux changements de lumière. Livrable : pipeline temps réel + mesures.",
          },
          {
            title: "Projet 2 — Odométrie visuelle ou suivi 3D",
            detail:
              "Flux optique pour estimer le mouvement de la caméra, ou PnP sur marqueur pour estimer une pose 3D. Comparer à la vérité terrain (règle, rapporteur). Livrable : estimation chiffrée avec son erreur.",
          },
          {
            title: "Projet 3 — Cartographie et localisation",
            detail:
              "Avec un LiDAR (ou en simulation) : construire une carte par SLAM, puis s'y localiser (filtre particulaire) et naviguer. Livrable : carte validée + trajectoires répétables.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources-perception",
    title: "Ressources",
    level: 3,
    intro:
      "Aller plus loin, en commençant par les références établies.",
    blocks: [
      {
        kind: "fields",
        title: "Références à privilégier",
        fields: [
          {
            label: "Documentation OpenCV",
            value:
              "Tutoriels officiels (docs.opencv.org) : de l'acquisition à la calibration — la référence pratique pour tout le traitement classique.",
          },
          {
            label: "Probabilistic Robotics (Thrun, Burgard, Fox)",
            value:
              "Le livre de référence (MIT Press) : filtres bayésiens, SLAM, localisation — la théorie derrière la perception robotique.",
          },
          {
            label: "Cours de vision robotique",
            value:
              "Les cours universitaires en ligne (géométrie multi-vues, SLAM visuel) : pour la profondeur théorique après la pratique.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : chaque algorithme de cette page se teste sur des images/vidéos réelles — la vision ne se valide pas sur des images d'exemple.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "La perception maîtrisée, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Décider avec ce qu'on voit : la planification transforme cartes et positions en trajectoires.",
          "Asservir sur la vision : le contrôle (asservissement visuel) ferme la boucle sur la caméra.",
          "Brancher sur ROS 2 : topics d'images, TF, Nav2 — la perception dans le système complet.",
          "Approfondir les maths : probabilités et optimisation pour le SLAM avancé.",
          "Revenir à la roadmap : valider Perception et attaquer la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

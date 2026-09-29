import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de l'évaluation et fiabilité des systèmes IA
 * (AI Safety) : benchmarks, red-teaming défensif, guardrails, biais,
 * hallucinations, traçabilité, gouvernance. Skill théorique et
 * méthodologique : pas de commandes terminal ici — concepts, méthodes
 * d'évaluation, processus, référentiels réels. Le « red-teaming » est
 * ici strictement DÉFENSIF : tester SES propres modèles avant déploiement
 * pour les rendre plus sûrs, jamais pour contourner les protections
 * d'autrui. 3 niveaux d'information (Aperçu / Pratique / Approfondi)
 * avec divulgation progressive. Tous les textes supportent le code
 * inline entre backticks.
 */
export const LEARNING_AI_SAFETY: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'évaluer un système IA veut dire : mesurer ses modes d'échec avant de le déployer.",
    blocks: [
      {
        kind: "text",
        text: "L'évaluation et la fiabilité des systèmes IA (AI Safety au sens opérationnel) consistent à mesurer rigoureusement comment un modèle se comporte — y compris quand on essaie de le faire échouer — puis à mettre en place des garde-fous : benchmarks, tests adversariaux sur ses propres modèles, filtres d'entrée/sortie, traçabilité, supervision humaine. Un modèle non évalué est un système dont on ignore les modes d'échec.",
      },
      {
        kind: "text",
        text: "Mesurer avant de déployer : ce que le modèle sait faire, où il se trompe, comment il peut être détourné — puis verrouiller.",
      },
      {
        kind: "text",
        text: "Les modèles actuels hallucinent (affirment du faux avec aplomb), reproduisent des biais de leurs données, et peuvent être manipulés par des entrées adversariales (prompt injection). Déployés sans évaluation, ces défauts deviennent des incidents : décision injuste, fuite de données, désinformation.",
      },
      {
        kind: "fields",
        title: "L'AI Safety opérationnelle : l'essentiel",
        fields: [          {
            label: "Quand s'en préoccuper",
            value:
              "Avant toute mise en production qui touche des utilisateurs, des décisions ou des données sensibles : l'évaluation fait partie du cycle de développement, pas un contrôle après coup.",
          },
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni de la philosophie sur l'IA générale, ni du marketing « IA de confiance » : c'est de l'ingénierie de la mesure — protocoles, jeux de test, seuils, garde-fous vérifiables.",
          },
        ],
      },
      {
        kind: "text",
        text: "Point essentiel : cette page adopte une posture strictement défensive. Le red-teaming y est pratiqué sur SES propres modèles, pour les durcir avant déploiement — jamais pour contourner les protections de systèmes tiers, ce qui est une utilisation abusive.",
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : évaluer avant de déployer",
    level: 1,
    intro:
      "La seule idée à retenir : un modèle est un système dont on doit connaître les limites mesurées, pas supposées.",
    blocks: [
      {
        kind: "diagram",
        title: "Le cycle d'évaluation",
        lines: [
          "  DÉFINIR l'usage prévu et les risques",
          "      (qui l'utilise, pour quoi, que se passe-t-il si ça échoue ?)",
          "        │",
          "        ▼",
          "  MESURER sur benchmarks et jeux de test",
          "      (capacités, mais surtout modes d'échec)",
          "        │",
          "        ▼",
          "  ATTAQUER (défensivement) ses propres modèles",
          "      (red-teaming : injections, jailbreaks, biais)",
          "        │",
          "        ▼",
          "  VERROUILLER avec des garde-fous",
          "      (filtres, validation, supervision humaine)",
          "        │",
          "        ▼",
          "  SURVEILLER en production",
          "      (dérive, incidents, retours → nouveau cycle)",
          "",
          "Aucune étape ne se saute : un garde-fou sans mesure",
          "protège contre un danger inconnu.",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : on ne déploie que ce qu'on a mesuré, on ne protège que contre ce qu'on a identifié, et on surveille parce que les usages réels surprennent toujours. Pourquoi cet ordre : chaque étape produit l'information dont la suivante a besoin — mesurer sans définir l'usage donne des chiffres hors-sol, verrouiller sans attaquer donne des garde-fous aveugles.",
      },
      {
        kind: "fields",
        title: "Les trois questions de l'évaluateur",
        fields: [
          {
            label: "Que doit-il faire — et ne pas faire ?",
            value:
              "Le périmètre d'usage prévu ET les usages à interdire : sans cette définition, impossible de dire si un comportement est un échec.",
          },
          {
            label: "Comment échoue-t-il ?",
            value:
              "Hallucinations, biais, manipulation, fuite de données : chaque mode d'échec a son protocole de mesure.",
          },
          {
            label: "Qui répond quand ça échoue ?",
            value:
              "Supervision humaine, traçabilité, plan d'incident : un système sans responsable en cas d'échec n'est pas déployable.",
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
    intro: "Ce qu'il faut déjà savoir pour tirer profit de cette page.",
    blocks: [
      {
        kind: "list",
        items: [
          "Comprendre ce qu'est un modèle de langage (LLM) : entraînement, inférence, prompts (Learning Page LLM Systems).",
          "Des bases de statistiques : moyenne, distribution, échantillon — l'évaluation est une mesure.",
          "Savoir lire un article ou une documentation technique : les benchmarks se comprennent via leurs papiers et docs.",
          "Aucune compétence en sécurité offensive requise : le red-teaming défensif s'apprend ici comme méthode d'évaluation.",
        ],
      },
      {
        kind: "text",
        text: "Si les LLM vous sont étrangers, commencez par les Learning Pages Machine Learning puis LLM Systems de Pathway : on évalue mieux un système qu'on comprend.",
      },
    ],
  },
  {
    id: "vocabulaire",
    title: "Le vocabulaire de l'évaluation",
    level: 2,
    intro:
      "Les dix mots sans lesquels on ne comprend ni un benchmark ni un rapport d'incident.",
    blocks: [
      {
        kind: "fields",
        title: "Glossaire minimal",
        fields: [
          {
            label: "Hallucination",
            value:
              "Le modèle affirme avec aplomb une information fausse ou inventée : le mode d'échec le plus courant des LLM.",
          },
          {
            label: "Benchmark",
            value:
              "Un jeu de tests standardisé avec réponses attendues : la base comparable de toute mesure.",
          },
          {
            label: "Red-teaming",
            value:
              "Tester adversarialement SES propres modèles (les pousser à échouer) pour trouver les failles avant les utilisateurs — défensif par construction ici.",
          },
          {
            label: "Jailbreak",
            value:
              "Technique qui pousse un modèle à contourner ses propres règles : on l'étudie pour s'en PROTÉGER, pas pour l'employer.",
          },
          {
            label: "Prompt injection",
            value:
              "Des instructions malveillantes glissées dans des données que le modèle traite : la faille applicative n°1 des systèmes à base de LLM.",
          },
          {
            label: "Guardrail (garde-fou)",
            value:
              "Un contrôle qui encadre le modèle : filtre d'entrée/sortie, validation, limitation de périmètre.",
          },
          {
            label: "Biais",
            value:
              "Des performances ou décisions systématiquement différentes selon un groupe : hérité des données, mesurable, à corriger.",
          },
          {
            label: "Dérive",
            value:
              "La dégradation des performances en production (données qui changent, usages imprévus) : d'où la surveillance continue.",
          },
          {
            label: "Traçabilité",
            value:
              "Pouvoir dire quelle version du modèle, avec quelles données et quels paramètres, a produit quelle décision.",
          },
          {
            label: "Supervision humaine",
            value:
              "Un humain qui valide ou peut interrompre les décisions à risque : le garde-fou ultime.",
          },
        ],
      },
    ],
  },
  {
    id: "types-risques",
    title: "Les types de risques : panorama",
    level: 2,
    intro:
      "Ce contre quoi on évalue : la carte des modes d'échec.",
    blocks: [
      {
        kind: "table",
        headers: ["Risque", "Ce qui se passe", "Exemple d'impact"],
        rows: [
          ["Hallucination", "Fausse information affirmée", "Conseil médical ou juridique erroné suivi par l'utilisateur"],
          ["Biais", "Traitement inéquitable selon le groupe", "Tri de CV qui défavorise systématiquement un profil"],
          ["Prompt injection", "Instructions cachées exécutées", "Le modèle révèle des données via un document piégé"],
          ["Fuite de données", "Mémorisation et restitution", "Données d'entraînement sensibles recrachées"],
          ["Mésusage", "Usage détourné du système", "Génération de désinformation ou d'hameçonnage ciblé"],
          ["Sur-confiance", "L'utilisateur croit le modèle infaillible", "Décision critique sans vérification humaine"],
        ],
      },
      {
        kind: "text",
        text: "En une phrase : chaque risque a son protocole d'évaluation et ses mitigations — on ne « teste pas l'IA en général », on mesure chaque mode d'échec séparément. Le niveau 3 détaille les méthodes.",
      },
    ],
  },
  {
    id: "benchmarks-apercu",
    title: "Benchmarks : l'aperçu",
    level: 2,
    intro:
      "Mesurer avec des étalons communs : ce que sont les benchmarks, ce qu'ils ne disent pas.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : un benchmark est un jeu de questions standardisé avec réponses attendues (MMLU pour les connaissances, HELM pour une évaluation holistique, BIG-bench pour les tâches difficiles) qui permet de comparer des modèles et de suivre les progrès. Pourquoi : sans étalon commun, chaque vendeur annonce « le meilleur modèle » sur ses propres tests — le benchmark indépendant est le seul chiffre comparable.",
      },
      {
        kind: "fields",
        title: "Lire un score de benchmark",
        fields: [
          {
            label: "Ce qu'il dit",
            value:
              "La performance sur LES TÂCHES DU BENCHMARK, dans ses conditions : utile pour comparer, suivre une régression, choisir un modèle.",
          },
          {
            label: "Ce qu'il ne dit pas",
            value:
              "La fiabilité sur VOTRE cas d'usage, la robustesse aux manipulations, l'équité : aucun benchmark générique ne remplace l'évaluation sur vos données.",
          },
          {
            label: "Le piège de la contamination",
            value:
              "Si le modèle a vu les questions pendant l'entraînement, le score est gonflé : d'où l'importance de jeux de test privés et de benchmarks renouvelés.",
          },
        ],
      },
      {
        kind: "text",
        text: "En pratique : utilisez les benchmarks publics pour le tri initial, puis évaluez toujours sur un jeu de test représentatif de VOTRE usage — c'est lui qui décide du déploiement.",
      },
    ],
  },
  {
    id: "eval-bases",
    title: "Conduire une évaluation : les bases",
    level: 2,
    intro:
      "Le protocole minimal : de la question au verdict.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définir l'usage et les critères",
            detail:
              "Qu'est-ce qu'une bonne réponse ICI ? Exactitude, format, refus poli des demandes hors périmètre : écrivez les critères avant de mesurer.",
          },
          {
            title: "Construire le jeu de test",
            detail:
              "50-200 cas représentatifs de l'usage réel, incluant des cas difficiles et adversariaux — jamais utilisés pour l'entraînement ni le réglage.",
          },
          {
            title: "Définir la notation",
            detail:
              "Automatique quand c'est possible (réponses fermées, formats), humaine par échantillon pour le reste : qui note, avec quelle grille.",
          },
          {
            title: "Exécuter dans des conditions fixes",
            detail:
              "Même version du modèle, mêmes paramètres, journalisation complète : une évaluation non reproductible ne vaut rien.",
          },
          {
            title: "Analyser les échecs",
            detail:
              "Classer les erreurs par type (hallucination, refus abusif, format…) : c'est l'analyse des échecs qui guide les corrections, pas le score global.",
          },
          {
            title: "Décider avec des seuils",
            detail:
              "Seuil de déploiement écrit à l'avance (« < 2 % d'hallucinations sur le jeu critique ») : on ne déplace pas le but après le tir.",
          },
        ],
      },
    ],
  },
  {
    id: "red-teaming-defensif",
    title: "Red-teaming défensif : attaquer pour protéger",
    level: 2,
    intro:
      "Tester ses propres modèles comme un adversaire le ferait — pour les durcir.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : le red-teaming défensif consiste à soumettre SES propres modèles à des tentatives de détournement (injections, jailbreaks, cas limites) AVANT déploiement, pour identifier et corriger les vulnérabilités. Pourquoi : les utilisateurs réels — et les attaquants — essaieront ; mieux vaut découvrir les failles en interne, avec un protocole, que dans un incident public.",
      },
      {
        kind: "fields",
        title: "Le cadre strict",
        fields: [
          {
            label: "Périmètre",
            value:
              "Uniquement vos modèles, vos systèmes, vos environnements de test : jamais les modèles ou API d'autrui.",
          },
          {
            label: "Objectif",
            value:
              "Trouver pour corriger : chaque faille trouvée donne lieu à une mitigation (garde-fou, réentraînement, refus) vérifiée ensuite.",
          },
          {
            label: "Documentation",
            value:
              "Techniques testées, résultats, corrections : le rapport de red-teaming est une pièce de la traçabilité du système.",
          },
          {
            label: "Interdit",
            value:
              "Publier des techniques de contournement opérationnelles, les utiliser contre des tiers, ou les partager hors du cadre de correction.",
          },
        ],
      },
      {
        kind: "text",
        text: "En pratique : commencez par les cas simples (demandes directes hors périmètre, instructions contradictoires), documentez ce qui passe, corrigez, re-testez — le cycle est identique à celui du pentest défensif.",
      },
    ],
  },
  {
    id: "guardrails-apercu",
    title: "Garde-fous : l'aperçu",
    level: 2,
    intro:
      "Encadrer le modèle : les couches de protection autour de l'IA.",
    blocks: [
      {
        kind: "diagram",
        title: "Les garde-fous en couches",
        lines: [
          "  UTILISATEUR",
          "      │",
          "      ▼",
          "  ┌─ FILTRE D'ENTRÉE ──────────────┐",
          "  │ Injection ? Hors périmètre ?   │  ← bloque avant le modèle",
          "  │ Données sensibles à masquer ?  │",
          "  └──────────────┬─────────────────┘",
          "               ▼",
          "  ┌─ MODÈLE ───────────────────────┐",
          "  │ Instructions système strictes, │",
          "  │ périmètre défini, refus polis  │",
          "  └──────────────┬─────────────────┘",
          "               ▼",
          "  ┌─ FILTRE DE SORTIE ─────────────┐",
          "  │ Données sensibles ? Format ?   │  ← vérifie après le modèle",
          "  │ Confiance suffisante ?         │",
          "  └──────────────┬─────────────────┘",
          "               ▼",
          "  ┌─ SUPERVISION HUMAINE ──────────┐",
          "  │ Validation des cas à risque,   │  ← le dernier rempart",
          "  │ journalisation, alertes        │",
          "  └────────────────────────────────┘",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : aucun garde-fou seul ne suffit — c'est leur empilement (filtrer avant, contraindre pendant, vérifier après, superviser toujours) qui rend un système déployable. Le niveau 3 détaille chaque couche.",
      },
    ],
  },
  {
    id: "biais-apercu",
    title: "Biais et équité : l'aperçu",
    level: 2,
    intro:
      "Mesurer les différences de traitement : l'équité se teste.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : un modèle peut traiter différemment des groupes (genre, origine, âge) parce que ses données d'entraînement reflètent des inégalités historiques — et le déployer sans mesurer, c'est automatiser la discrimination. Pourquoi c'est mesurable : on compare les performances et décisions du modèle entre groupes sur des cas équivalents ; un écart systématique est un biais, pas une opinion.",
      },
      {
        kind: "fields",
        title: "Les réflexes",
        fields: [
          {
            label: "Mesurer par groupe",
            value:
              "Toujours désagréger les métriques : un score global excellent peut cacher un échec sur un groupe minoritaire.",
          },
          {
            label: "Tester les cas limites",
            value:
              "Des paires de cas identiques sauf l'attribut sensible : toute différence de décision est suspecte.",
          },
          {
            label: "Corriger à la source",
            value:
              "Données d'entraînement, pondération, contraintes d'équité, puis re-mesure : le biais se traite comme un bug, avec test de non-régression.",
          },
        ],
      },
    ],
  },
  {
    id: "tracabilite-bases",
    title: "Traçabilité : savoir ce qui a décidé",
    level: 2,
    intro:
      "La condition de la responsabilité : tracer versions, données, décisions.",
    blocks: [
      {
        kind: "list",
        items: [
          "Versionner le modèle : quel checkpoint, entraîné sur quelles données, avec quels paramètres — reproductibilité exigée.",
          "Journaliser les décisions : entrée (anonymisée si besoin), sortie, version, horodatage, niveau de confiance.",
          "Documenter avec une fiche modèle (model card) : usages prévus, limites connues, résultats d'évaluation — le « mode d'emploi » du modèle.",
          "Conserver les jeux de test : ce qui a servi à valider doit pouvoir être rejoué après chaque changement.",
          "Prévoir l'audit : un tiers doit pouvoir vérifier — la traçabilité se conçoit, elle ne s'improvise pas après l'incident.",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : sans traçabilité, impossible de dire pourquoi le système a décidé ceci — et impossible de corriger. C'est aussi une exigence réglementaire croissante (voir EU AI Act au niveau 3).",
      },
    ],
  },
  {
    id: "flux-professionnel",
    title: "Le flux professionnel : l'évaluation en continu",
    level: 2,
    intro:
      "Intégrer l'évaluation au cycle de vie : pas un audit unique, une discipline.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Évaluer avant chaque release",
            detail:
              "Le jeu de test tourne comme une suite de tests logiciels : aucune mise en production sans passage au vert sur les seuils.",
          },
          {
            title: "Red-teamer régulièrement",
            detail:
              "À chaque changement significatif (nouveau modèle, nouveau périmètre) : campagne adverse sur les zones à risque.",
          },
          {
            title: "Surveiller en production",
            detail:
              "Échantillonner les interactions réelles, mesurer la dérive, collecter les signalements utilisateurs.",
          },
          {
            title: "Gérer les incidents",
            detail:
              "Échec grave : analyse, correction, communication — avec le même sérieux qu'un incident de sécurité classique.",
          },
          {
            title: "Reboucler",
            detail:
              "Chaque incident enrichit les jeux de test : le système apprend de ses échecs, pas seulement de ses succès.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 2,
    intro:
      "Les fautes qui rendent une évaluation décorative.",
    blocks: [
      {
        kind: "fields",
        title: "Les classiques",
        fields: [
          {
            label: "Évaluer sur les données d'entraînement",
            value:
              "Problème : scores gonflés, confiance illusoire. Pourquoi : facilité. Mieux : jeu de test séparé, jamais vu pendant l'entraînement.",
          },
          {
            label: "Se contenter du score global",
            value:
              "Problème : 95 % de réussite qui cache 40 % d'échec sur un groupe ou un cas critique. Pourquoi : un chiffre rassure. Mieux : métriques désagrégées + analyse des échecs.",
          },
          {
            label: "Tester une fois et oublier",
            value:
              "Problème : le modèle évolue, les usages dérivent, les attaques progressent. Pourquoi : « c'est validé ». Mieux : évaluation continue, à chaque changement.",
          },
          {
            label: "Confondre démo et évaluation",
            value:
              "Problème : « ça a bien répondu à mes 3 exemples ». Pourquoi : biais de confirmation. Mieux : protocole écrit, échantillon représentatif, seuils prédéfinis.",
          },
          {
            label: "Négliger l'humain",
            value:
              "Problème : système déployé sans supervision sur des décisions à risque. Pourquoi : coût. Mieux : l'humain reste dans la boucle là où l'erreur coûte cher.",
          },
        ],
      },
    ],
  },
  {
    id: "mini-projet",
    title: "Mini-projet : évaluer un chatbot de test",
    level: 2,
    intro:
      "Le cycle complet sur un cas simple : mesurer, attaquer (défensivement), verrouiller.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définir",
            detail:
              "Chatbot fictif de support : périmètre (questions produit), interdits (conseil juridique, données personnelles), critères de bonne réponse.",
          },
          {
            title: "Construire le jeu de test",
            detail:
              "30 cas : 20 normaux, 5 difficiles, 5 adversariaux (tentatives de sortie du périmètre, instructions cachées).",
          },
          {
            title: "Évaluer",
            detail:
              "Passer les 30 cas sur le modèle choisi, noter selon la grille, classer les échecs par type.",
          },
          {
            title: "Red-teamer",
            detail:
              "10 tentatives de détournement sur VOTRE instance de test : lesquelles passent ? Documentez.",
          },
          {
            title: "Verrouiller",
            detail:
              "Ajouter un filtre d'entrée/sortie simple et des instructions système strictes, re-tester : mesurer l'amélioration.",
          },
          {
            title: "Restituer",
            detail:
              "Fiche d'évaluation d'une page : méthode, résultats, limites, décision (déployable ? sous quelles conditions ?).",
          },
        ],
      },
      {
        kind: "text",
        text: "Concepts liés : le niveau 3 formalise les benchmarks, les méthodes de red-teaming, les garde-fous techniques et la gouvernance (EU AI Act).",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "taxonomie-risques",
    title: "Taxonomie des risques : cartographier",
    level: 3,
    intro:
      "Ordonner les risques pour les traiter : la carte complète.",
    blocks: [
      {
        kind: "table",
        headers: ["Famille", "Risques couverts", "Priorité typique"],
        rows: [
          ["Fiabilité", "Hallucinations, erreurs factuelles, incohérences", "Haute — le risque le plus fréquent"],
          ["Sécurité applicative", "Prompt injection, extraction de données, détournement", "Haute — la faille la plus exploitable"],
          ["Équité", "Biais par groupe, discrimination automatisée", "Haute si décisions sur des personnes"],
          ["Confidentialité", "Mémorisation, fuite via prompts, données d'entraînement", "Critique si données sensibles"],
          ["Mésusage", "Désinformation, hameçonnage, contournement", "Selon l'exposition du système"],
          ["Robustesse", "Dérive, cas limites, attaques adversariales", "Moyenne-haute en production"],
        ],
      },
      {
        kind: "text",
        text: "En une phrase : la taxonomie sert à ne rien oublier — chaque famille a ses métriques et ses mitigations, et le plan d'évaluation les couvre toutes proportionnellement aux enjeux. Erreur fréquente : ne mesurer que la « performance » (fiabilité) et découvrir les autres familles en incident.",
      },
    ],
  },
  {
    id: "benchmarks-detail",
    title: "Benchmarks en détail : choisir et critiquer",
    level: 3,
    intro:
      "Au-delà du score : comprendre ce que mesure chaque benchmark.",
    blocks: [
      {
        kind: "fields",
        title: "Les grandes familles",
        fields: [
          {
            label: "Connaissances (ex. MMLU)",
            value:
              "Questions à choix multiples sur 50+ sujets : mesure l'étendue des connaissances — pas le raisonnement ni la fiabilité.",
          },
          {
            label: "Évaluation holistique (ex. HELM)",
            value:
              "Multi-métriques (exactitude, robustesse, équité, efficacité) : une vision plus complète, plus coûteuse à faire tourner.",
          },
          {
            label: "Raisonnement difficile (ex. BIG-bench)",
            value:
              "Tâches jugées hors de portée des modèles précédents : mesure les frontières, pas l'usage courant.",
          },
          {
            label: "Spécifiques sécurité",
            value:
              "Benchmarks de refus des demandes dangereuses, de résistance aux injections : les plus pertinents pour cette page, à compléter par vos propres tests.",
          },
        ],
      },
      {
        kind: "text",
        text: "En une phrase : un benchmark est un instrument avec ses biais — contamination possible, tâches datées, corrélation imparfaite avec votre usage : on l'utilise en connaissance de cause, jamais comme verdict unique. Bonne pratique : 2-3 benchmarks complémentaires + votre jeu de test métier.",
      },
    ],
  },
  {
    id: "methodologie-eval",
    title: "Méthodologie d'évaluation rigoureuse",
    level: 3,
    intro:
      "La science de la mesure : protocoles qui tiennent la route.",
    blocks: [
      {
        kind: "fields",
        title: "Les piliers",
        fields: [
          {
            label: "Séparation stricte",
            value:
              "Jeux d'entraînement, de développement et de test disjoints : toute fuite gonfle artificiellement les scores.",
          },
          {
            label: "Reproductibilité",
            value:
              "Version du modèle, paramètres (température, seed), prompts exacts, code d'évaluation versionné : un tiers doit retrouver vos chiffres.",
          },
          {
            label: "Notation fiable",
            value:
              "Juges humains : grille précise, double notation, accord inter-juges mesuré. Juges automatiques (autre LLM) : validés contre l'humain d'abord.",
          },
          {
            label: "Incertitude",
            value:
              "Intervalles de confiance, taille d'échantillon : « 92 % » sur 50 cas ne veut pas dire grand-chose — la statistique fait partie du protocole.",
          },
          {
            label: "Seuils prédéfinis",
            value:
              "Critères de succès écrits AVANT la mesure : on ne choisit pas la métrique qui arrange après coup.",
          },
        ],
      },
      {
        kind: "text",
        text: "Erreur fréquente : l'évaluation « vibes » — quelques exemples impressionnants en démo. Bonne pratique : le protocole écrit tient en une page et s'applique à chaque release.",
      },
    ],
  },
  {
    id: "red-teaming-methode",
    title: "Red-teaming : la méthode",
    level: 3,
    intro:
      "Attaquer méthodiquement pour défendre efficacement.",
    blocks: [
      {
        kind: "table",
        headers: ["Phase", "Action", "Production"],
        rows: [
          ["Cadrer", "Périmètre (vos modèles), règles, objectifs", "Plan de campagne écrit"],
          ["Modéliser", "Quels détournements craindre ? (injection, jailbreak, exfiltration)", "Liste de scénarios priorisés"],
          ["Tester", "Campagnes par scénario, en environnement de test", "Résultats bruts horodatés"],
          ["Qualifier", "Qu'est-ce qui passe, avec quel impact ?", "Findings classés par gravité"],
          ["Corriger", "Garde-fous, instructions, réentraînement", "Mitigations implémentées"],
          ["Re-tester", "Vérifier que la correction tient", "Non-régression"],
        ],
      },
      {
        kind: "text",
        text: "En une phrase : le red-teaming défensif suit le même cycle que le pentest — cadrer, tester, rapporter, corriger, vérifier — appliqué à ses propres modèles. Ligne rouge permanente : les techniques découvertes servent à corriger vos systèmes, jamais à attaquer ceux d'autrui ni à être diffusées comme modes d'emploi.",
      },
    ],
  },
  {
    id: "prompt-injection-defense",
    title: "Prompt injection : comprendre pour se défendre",
    level: 3,
    intro:
      "La faille applicative des LLM : des instructions cachées dans les données.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : la prompt injection glisse des instructions malveillantes dans des contenus que le modèle traite (document, page web, e-mail) — le modèle, incapable de distinguer l'instruction légitime de la donnée, peut les exécuter. Pourquoi c'est la faille n°1 : tout système qui fait traiter au modèle des contenus externes est concerné.",
      },
      {
        kind: "fields",
        title: "Les défenses en couches",
        fields: [
          {
            label: "Séparation instruction/donnée",
            value:
              "Marquer explicitement ce qui est instruction (système) vs donnée (utilisateur) ; le modèle doit traiter la donnée comme telle, jamais comme des ordres.",
          },
          {
            label: "Filtrage d'entrée",
            value:
              "Détecter les patterns d'injection connus dans les contenus externes avant traitement — sans en faire l'unique défense.",
          },
          {
            label: "Moindre privilège",
            value:
              "Le modèle n'a accès qu'aux outils et données nécessaires : une injection réussie dans un bac à sable vide ne fait rien.",
          },
          {
            label: "Validation de sortie",
            value:
              "Vérifier que les actions proposées sont autorisées avant exécution : l'humain ou une règle valide, pas le modèle seul.",
          },
        ],
      },
      {
        kind: "text",
        text: "Posture : on étudie ces mécanismes pour blinder ses systèmes — les détails opérationnels d'injection appartiennent aux évaluations encadrées, pas à une page publique.",
      },
    ],
  },
  {
    id: "jailbreak-defense",
    title: "Jailbreaks : s'en protéger",
    level: 3,
    intro:
      "Quand le modèle contourne ses propres règles : défense en profondeur.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : un jailbreak pousse le modèle à ignorer ses instructions de sécurité (rôle fictif, encodages, fractionnement) — aucune protection unique n'est infaillible, d'où la défense en couches. Pourquoi c'est un jeu sans fin : chaque correctif inspire de nouvelles variantes ; l'objectif réaliste est de rendre le contournement difficile et détectable, pas impossible.",
      },
      {
        kind: "fields",
        title: "Les couches de protection",
        fields: [
          {
            label: "Instructions système robustes",
            value:
              "Règles claires, hiérarchie explicite (le système prime sur l'utilisateur), refus polis mais fermes.",
          },
          {
            label: "Détection de tentatives",
            value:
              "Repérer les patterns de contournement (rôles fictifs, encodages suspects) : une tentative détectée est une alerte, même bloquée.",
          },
          {
            label: "Filtrage de sortie",
            value:
              "Vérifier le contenu généré contre les politiques : le dernier rempart quand le modèle a cédé.",
          },
          {
            label: "Limitation d'impact",
            value:
              "Même contourné, le modèle ne doit pouvoir ni accéder à des données sensibles ni exécuter d'actions critiques sans validation.",
          },
        ],
      },
    ],
  },
  {
    id: "hallucinations",
    title: "Hallucinations : mesurer et réduire",
    level: 3,
    intro:
      "Le mode d'échec le plus courant : l'affirmation confiante du faux.",
    blocks: [
      {
        kind: "fields",
        title: "Comprendre et mesurer",
        fields: [
          {
            label: "Pourquoi ça arrive",
            value:
              "Le modèle prédit du texte plausible, pas du vrai : sans ancrage (données, outils), il « remplit » avec du plausible — avec aplomb.",
          },
          {
            label: "Mesurer",
            value:
              "Jeux de questions factuelles avec réponses vérifiables, taux de réponses correctes vs inventées, par domaine : l'hallucination varie énormément selon le sujet.",
          },
          {
            label: "RAG (ancrage documentaire)",
            value:
              "Faire répondre à partir de documents fournis (retrieval-augmented generation) avec citations : réduit fortement l'invention — mais il faut vérifier que les citations existent vraiment.",
          },
          {
            label: "Calibration",
            value:
              "Apprendre au modèle à dire « je ne sais pas » : un refus honnête vaut mieux qu'une invention confiante. Se mesure comme le reste.",
          },
        ],
      },
      {
        kind: "text",
        text: "En une phrase : on ne supprime pas les hallucinations, on les mesure par domaine et on les contient (ancrage, citations vérifiées, refus) là où l'erreur coûte cher.",
      },
    ],
  },
  {
    id: "biais-mesure",
    title: "Biais : mesurer et corriger",
    level: 3,
    intro:
      "L'équité comme métrique : protocoles de mesure des écarts.",
    blocks: [
      {
        kind: "table",
        headers: ["Méthode", "Principe", "Exemple"],
        rows: [
          ["Paires contrefactuelles", "Même cas, seul l'attribut sensible change", "Deux CV identiques sauf le prénom : décision différente ?"],
          ["Désagrégation", "Métriques calculées par groupe", "Taux d'erreur par tranche d'âge, par genre"],
          ["Benchmarks d'équité", "Jeux de test dédiés aux stéréotypes", "Associations automatiques métier/genre"],
          ["Audit en production", "Échantillon réel noté par groupe", "Vérifier que l'équité mesurée tient en conditions réelles"],
        ],
      },
      {
        kind: "text",
        text: "En une phrase : un écart mesuré est un bug à corriger (données, pondération, contraintes, seuils par groupe si justifié) puis à surveiller en non-régression — l'équité est une métrique comme les autres. Point juridique : dans beaucoup de juridictions, une discrimination automatisée avérée engage la responsabilité — la mesure est aussi une protection légale.",
      },
    ],
  },
  {
    id: "confidentialite",
    title: "Confidentialité : mémorisation et fuites",
    level: 3,
    intro:
      "Ce que le modèle a retenu de ses données : le risque d'extraction.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : les modèles peuvent mémoriser des fragments de leurs données d'entraînement (textes rares, données personnelles) et les restituer sous certaines sollicitations — d'où le risque de fuite. Pourquoi c'est critique : une donnée personnelle mémorisée puis extraite est une violation de confidentialité, avec conséquences légales (RGPD).",
      },
      {
        kind: "fields",
        title: "Les protections",
        fields: [
          {
            label: "Hygiène des données",
            value:
              "Ne jamais entraîner sur des données personnelles non nécessaires ; dédupliquer, anonymiser/pseudonymiser en amont.",
          },
          {
            label: "Tests d'extraction",
            value:
              "Évaluer défensivement : le modèle restitue-t-il des données sensibles connues de l'entraînement ? Si oui, corriger avant déploiement.",
          },
          {
            label: "Filtrage de sortie",
            value:
              "Détecter les patterns sensibles (numéros, adresses) dans les générations : le filet de sécurité en production.",
          },
          {
            label: "Droit à l'oubli",
            value:
              "Prévoir la suppression : réentraîner ou désapprendre est coûteux — d'où l'importance de ne pas ingérer n'importe quoi.",
          },
        ],
      },
    ],
  },
  {
    id: "securite-agents",
    title: "Sécurité des agents IA",
    level: 3,
    intro:
      "Quand le modèle agit : outils, permissions, boucles — la surface explose.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : un agent IA (modèle + outils + mémoire + boucles d'action) ne se contente pas de répondre — il exécute : chaque outil est un privilège, chaque boucle un risque d'emballement. Pourquoi c'est le sujet montant : l'injection qui faisait « dire » devient celle qui fait « faire » (envoyer, supprimer, acheter).",
      },
      {
        kind: "fields",
        title: "Les règles des agents sûrs",
        fields: [
          {
            label: "Moindre privilège par outil",
            value:
              "Chaque outil n'a que les droits nécessaires ; les actions irréversibles exigent une validation humaine explicite.",
          },
          {
            label: "Validation des plans",
            value:
              "Vérifier la séquence d'actions prévue avant exécution, surtout si elle touche des systèmes externes.",
          },
          {
            label: "Garde-fous de boucle",
            value:
              "Limites d'itérations, de coût, de temps : un agent en boucle infinie est un incident en soi.",
          },
          {
            label: "Journalisation totale",
            value:
              "Chaque action de l'agent est tracée (quoi, quand, pourquoi) : sans ça, impossible d'auditer ni de corriger.",
          },
        ],
      },
    ],
  },
  {
    id: "evals-humaines",
    title: "Évaluations humaines : quand la machine ne suffit pas",
    level: 3,
    intro:
      "La qualité, la nuance, le contexte : ce que seuls les humains jugent.",
    blocks: [
      {
        kind: "fields",
        title: "Protocoles",
        fields: [
          {
            label: "Grilles de notation",
            value:
              "Critères explicites et exemples étalons : deux évaluateurs doivent converger — sinon la grille est floue.",
          },
          {
            label: "Double notation",
            value:
              "Un échantillon noté par deux juges indépendants, accord mesuré : la fiabilité de la mesure se prouve.",
          },
          {
            label: "Comparaison par paires",
            value:
              "« Quelle réponse est meilleure ? » est souvent plus fiable que la note absolue — adapté aux préférences.",
          },
          {
            label: "Biais des juges",
            value:
              "Ordre de présentation, longueur des réponses : randomiser, anonymiser les modèles évalués.",
          },
        ],
      },
      {
        kind: "text",
        text: "En une phrase : l'évaluation humaine est coûteuse mais irremplaçable pour la qualité perçue — on l'utilise par échantillon, avec protocole, et on valide les juges automatiques contre elle.",
      },
    ],
  },
  {
    id: "monitoring-prod",
    title: "Surveillance en production",
    level: 3,
    intro:
      "Le déploiement n'est pas la fin : détecter la dérive et les incidents.",
    blocks: [
      {
        kind: "list",
        items: [
          "Échantillonner les interactions réelles : un pourcentage fixe relu régulièrement (humain ou automatique) — la fenêtre sur le réel.",
          "Mesurer la dérive : distributions des entrées/sorties, taux de refus, longueur des réponses — tout écart durable à la baseline s'investigue.",
          "Collecter les signalements : bouton de signalement visible, traitement avec délai — les utilisateurs voient ce que les métriques ratent.",
          "Surveiller les abus : volumes anormaux par utilisateur, patterns d'extraction, tentatives répétées de contournement.",
          "Alerter : seuils sur les métriques critiques (taux d'échec, incidents) avec escalade définie.",
          "Reboucler : chaque incident ou dérive enrichit les jeux de test — la surveillance alimente l'évaluation.",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : un modèle en production sans surveillance est un système dont on découvre les échecs par la presse — la surveillance est le prolongement de l'évaluation, pas une option.",
      },
    ],
  },
  {
    id: "model-cards",
    title: "Model cards et documentation",
    level: 3,
    intro:
      "Le mode d'emploi du modèle : usages, limites, résultats.",
    blocks: [
      {
        kind: "fields",
        title: "Contenu d'une fiche modèle",
        fields: [
          {
            label: "Usages prévus et hors périmètre",
            value:
              "Pour quoi le modèle est conçu ET ce qu'il ne doit pas faire : la base contractuelle de l'évaluation.",
          },
          {
            label: "Données et entraînement",
            value:
              "Sources, prétraitements, limites connues des données : ce qui explique en partie les biais.",
          },
          {
            label: "Résultats d'évaluation",
            value:
              "Benchmarks, jeux métier, red-teaming : chiffres avec protocoles, pas des slogans.",
          },
          {
            label: "Limites connues",
            value:
              "Modes d'échec identifiés, groupes à risque, domaines faibles : l'honnêteté qui permet un déploiement responsable.",
          },
          {
            label: "Considérations éthiques",
            value:
              "Impacts anticipés, mitigations, recommandations de déploiement : le pont vers la gouvernance.",
          },
        ],
      },
      {
        kind: "text",
        text: "En une phrase : la fiche modèle est le contrat de transparence — sans elle, chaque déploiement est un acte de foi. C'est aussi un livrable attendu par les régulateurs (voir EU AI Act).",
      },
    ],
  },
  {
    id: "incident-response-ia",
    title: "Réponse aux incidents IA",
    level: 3,
    intro:
      "Quand le modèle échoue en production : le plan d'action.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Détecter et qualifier",
            detail:
              "Signalement ou alerte : reproduire, mesurer l'ampleur (combien d'utilisateurs ? quelles conséquences ?), qualifier la gravité.",
          },
          {
            title: "Contenir",
            detail:
              "Désactiver la fonctionnalité, revenir à la version précédente, limiter le périmètre : stopper l'hémorragie d'abord.",
          },
          {
            title: "Analyser",
            detail:
              "Logs et traçabilité : quelle version, quelles entrées, quel mode d'échec ? L'analyse factuelle, pas les suppositions.",
          },
          {
            title: "Corriger",
            detail:
              "Garde-fou, réentraînement, restriction de périmètre : la correction est vérifiée par re-test avant redéploiement.",
          },
          {
            title: "Communiquer",
            detail:
              "Utilisateurs affectés, autorités si la réglementation l'exige : transparence proportionnée à l'impact.",
          },
          {
            title: "Apprendre",
            detail:
              "Le cas entre dans les jeux de test : l'incident d'aujourd'hui est la non-régression de demain.",
          },
        ],
      },
    ],
  },
  {
    id: "eu-ai-act",
    title: "EU AI Act : le cadre européen",
    level: 3,
    intro:
      "La réglementation européenne de l'IA : une approche par les risques.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : l'AI Act européen classe les systèmes IA par niveau de risque et impose des obligations croissantes — c'est le premier cadre juridique complet de l'IA, avec application progressive. Pourquoi il compte pour cette page : il transforme l'évaluation, la traçabilité et la supervision humaine en obligations légales pour les systèmes à risque.",
      },
      {
        kind: "table",
        headers: ["Niveau", "Exemples", "Obligations"],
        rows: [
          ["Interdit", "Notation sociale généralisée, manipulation subliminale", "Interdiction pure"],
          ["Haut risque", "Recrutement, crédit, dispositifs médicaux, infrastructures critiques", "Évaluation, traçabilité, supervision humaine, documentation"],
          ["Risque limité", "Chatbots, génération de contenu", "Transparence : l'utilisateur doit savoir qu'il parle à une IA"],
          ["Risque minimal", "Filtres anti-spam, jeux vidéo", "Aucune obligation spécifique"],
        ],
      },
      {
        kind: "text",
        text: "Point pratique : vérifiez toujours le calendrier d'application en vigueur et les actes d'exécution — le texte évolue. L'évaluation documentée de cette page est exactement ce que le « haut risque » exige.",
      },
    ],
  },
  {
    id: "gouvernance-ia",
    title: "Gouvernance des systèmes IA",
    level: 3,
    intro:
      "Qui décide, qui est responsable : l'organisation autour des modèles.",
    blocks: [
      {
        kind: "fields",
        title: "Les piliers",
        fields: [
          {
            label: "Politique d'usage",
            value:
              "Quels systèmes pour quels usages, avec quelles validations : écrit, approuvé, communiqué — comme toute politique de sécurité.",
          },
          {
            label: "Registre des systèmes",
            value:
              "Inventaire des modèles déployés : version, usage, risques, responsable — on ne gouverne que ce qu'on a listé.",
          },
          {
            label: "Validation avant déploiement",
            value:
              "Comité ou responsable qui valide l'évaluation : seuils atteints ? risques résiduels acceptés par qui ?",
          },
          {
            label: "Responsabilités",
            value:
              "Qui répond en cas d'échec : le déployeur, pas le modèle — la responsabilité est humaine et nommée.",
          },
        ],
      },
      {
        kind: "text",
        text: "Articulation : cette gouvernance s'intègre au SMSI (ISO 27001) et aux processus de la Learning Page Gouvernance — l'IA est un actif et un risque comme les autres, avec ses spécificités.",
      },
    ],
  },
  {
    id: "debugging-evals",
    title: "Debugging : quand l'évaluation coince",
    level: 3,
    intro:
      "Scores incohérents, juges en désaccord, dérive inexpliquée : diagnostiquer.",
    blocks: [
      {
        kind: "fields",
        title: "Situations classiques",
        fields: [
          {
            label: "Scores instables entre runs",
            value:
              "Température, seed, échantillon : fixer les paramètres, augmenter la taille d'échantillon, mesurer l'incertitude.",
          },
          {
            label: "Juges humains en désaccord",
            value:
              "La grille est floue : préciser les critères avec des exemples étalons, former les juges, mesurer l'accord.",
          },
          {
            label: "Amélioration sur le benchmark, régression en prod",
            value:
              "Contamination ou décalage avec l'usage réel : le benchmark ne reflète plus le terrain — revoir le jeu de test métier.",
          },
          {
            label: "Dérive sans cause évidente",
            value:
              "Données d'entrée qui changent, usages nouveaux, mise à jour du modèle : comparer les distributions, segmenter par période.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-avancees",
    title: "Erreurs avancées : les pièges des pratiquants",
    level: 3,
    intro:
      "Quand les bases sont acquises, voici ce qui piège encore.",
    blocks: [
      {
        kind: "fields",
        title: "Pièges de niveau avancé",
        fields: [
          {
            label: "Optimiser le benchmark, pas le système",
            value:
              "Problème : le score monte, l'utilité stagne. Pourquoi : la métrique devient l'objectif (loi de Goodhart). Mieux : le benchmark est un indicateur, le jeu métier est le juge.",
          },
          {
            label: "Croire qu'un garde-fou suffit",
            value:
              "Problème : « on a un filtre, on est protégés ». Pourquoi : confiance dans une couche unique. Mieux : défense en profondeur — le filtre est une couche parmi d'autres.",
          },
          {
            label: "Évaluer le modèle, pas le système",
            value:
              "Problème : le modèle seul est bon, l'agent avec outils est dangereux. Pourquoi : périmètre trop étroit. Mieux : évaluer le système complet déployé (prompts, outils, garde-fous).",
          },
          {
            label: "Négliger les coûts de l'évaluation",
            value:
              "Problème : protocole si lourd qu'on ne l'applique plus. Pourquoi : perfectionnisme. Mieux : proportionner — exhaustif pour le haut risque, léger mais réel pour le reste.",
          },
          {
            label: "Oublier l'utilisateur",
            value:
              "Problème : système « sûr » que personne n'utilise correctement. Pourquoi : la sécurité vue contre l'usage. Mieux : la sur-confiance de l'utilisateur est un risque à traiter (transparence, formation).",
          },
        ],
      },
    ],
  },
  {
    id: "projet-eval-complete",
    title: "Projet : évaluation complète d'un système",
    level: 3,
    intro:
      "Le projet fil rouge : du protocole au verdict.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Cadrer",
            detail:
              "Système choisi (chatbot, classifieur, assistant de rédaction) : usages prévus, interdits, risques, critères de succès écrits.",
          },
          {
            title: "Construire les jeux de test",
            detail:
              "Capacités (100 cas), robustesse (50 cas difficiles), sécurité (30 cas adversariaux), équité (paires contrefactuelles).",
          },
          {
            title: "Évaluer",
            detail:
              "Protocole reproductible, notation mixte (auto + humaine par échantillon), métriques désagrégées.",
          },
          {
            title: "Red-teamer",
            detail:
              "Campagne défensive sur vos instances : scénarios, findings, mitigations, re-test.",
          },
          {
            title: "Rédiger la fiche",
            detail:
              "Model card : résultats, limites, risques résiduels, conditions de déploiement. Verdict argumenté.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-guardrails",
    title: "Projet : garde-fous en couches",
    level: 3,
    intro:
      "Concevoir la défense en profondeur d'un système : l'architecture.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Cartographier",
            detail:
              "Schéma du système : entrées, modèle, outils, sorties, utilisateurs — chaque flèche est une surface.",
          },
          {
            title: "Menacer",
            detail:
              "Pour chaque surface : scénarios (injection, exfiltration, mésusage) avec STRIDE adapté à l'IA.",
          },
          {
            title: "Concevoir les couches",
            detail:
              "Filtre d'entrée, instructions système, moindre privilège des outils, filtre de sortie, supervision : chaque couche documentée (quoi, pourquoi, limites).",
          },
          {
            title: "Tester",
            detail:
              "Campagne adverse contre le système COMPLET : que reste-t-il qui passe ? Mesurer, pas supposer.",
          },
          {
            title: "Documenter",
            detail:
              "Dossier d'architecture de sécurité : schéma, menaces, couches, résultats de tests, risques résiduels.",
          },
        ],
      },
      {
        kind: "text",
        text: "Concepts liés : ce dossier est le livrable attendu par la gouvernance (validation de déploiement) et le régulateur (AI Act).",
      },
    ],
  },
  {
    id: "projet-politique-usage",
    title: "Projet : politique d'usage de l'IA",
    level: 3,
    intro:
      "Écrire les règles pour une organisation fictive : la gouvernance appliquée.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Contexte",
            detail:
              "PME fictive de 50 personnes voulant utiliser des assistants IA : inventaire des usages envisagés.",
          },
          {
            title: "Classifier",
            detail:
              "Chaque usage : niveau de risque (AI Act), données concernées, validation requise.",
          },
          {
            title: "Rédiger la politique",
            detail:
              "Usages autorisés/encadrés/interdits, règles sur les données (jamais de données clients dans un outil non validé), responsabilités.",
          },
          {
            title: "Prévoir le contrôle",
            detail:
              "Comment vérifier l'application : registre des outils, revue annuelle, sensibilisation des équipes.",
          },
        ],
      },
    ],
  },
  {
    id: "robustesse-adversariale",
    title: "Robustesse adversariale : le ML trompé",
    level: 3,
    intro: "Des perturbations invisibles qui changent la décision : mesurer la fragilité.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : en vision par ordinateur (et au-delà), des modifications imperceptibles pour l'humain peuvent faire classifier un panda en gibbon — l'évaluation de la robustesse mesure cette fragilité. Pourquoi : un système de reconnaissance ou de détection déployé sans test adversarial est contournable par qui connaît la technique.",
      },
      {
        kind: "fields",
        title: "Les approches défensives",
        fields: [
          {
            label: "Entraînement adversarial",
            value: "Inclure des exemples perturbés dans l'entraînement : le modèle apprend à résister — la défense la plus éprouvée.",
          },
          {
            label: "Certification",
            value: "Prouver mathématiquement la robustesse dans un rayon de perturbation : coûteux, mais garanti là où c'est critique.",
          },
          {
            label: "Détection d'entrées",
            value: "Repérer les entrées suspectes avant classification : une couche de plus, jamais la seule.",
          },
        ],
      },
      {
        kind: "text",
        text: "Posture : on étudie ces attaques pour durcir SES modèles — les détails opérationnels restent du domaine des évaluations encadrées.",
      },
    ],
  },
  {
    id: "interpretabilite",
    title: "Interprétabilité : expliquer les décisions",
    level: 3,
    intro: "Ouvrir la boîte noire : ce qui a pesé dans la décision.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : l'interprétabilité attribue les décisions du modèle à ses entrées (quels mots, quels pixels ont compté) — indispensable quand la décision a des conséquences. Pourquoi : « le modèle l'a décidé » n'est ni une explication ni une défense juridique ; l'explication est une exigence de responsabilité.",
      },
      {
        kind: "fields",
        title: "Les méthodes",
        fields: [
          {
            label: "Attributions locales",
            value: "SHAP, LIME : quelles features ont poussé CETTE décision — utile au cas par cas, en audit.",
          },
          {
            label: "Explications globales",
            value: "Importance des variables sur tout le jeu de données : révèle les biais structurels (la variable proxy du genre).",
          },
          {
            label: "Limites",
            value: "Une explication est une approximation : elle éclaire, ne prouve pas — à croiser avec les métriques.",
          },
        ],
      },
    ],
  },
  {
    id: "alignement",
    title: "Alignement : des modèles qui suivent l'intention",
    level: 3,
    intro: "RLHF, instructions, constitutionnel : les notions d'alignement.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : l'alignement regroupe les techniques qui font qu'un modèle poursuit l'intention de l'utilisateur (utile, honnête, inoffensif) plutôt que de simplement prédire du texte. Pourquoi c'est pertinent ici : l'évaluation mesure si l'alignement TIENT — face aux manipulations, aux cas limites, aux objectifs détournés.",
      },
      {
        kind: "fields",
        title: "Les approches en bref",
        fields: [
          {
            label: "RLHF",
            value: "Apprentissage par renforcement sur retours humains : le modèle est récompensé pour les réponses préférées — la base des assistants actuels.",
          },
          {
            label: "Instruction tuning",
            value: "Entraînement à suivre des instructions : le modèle apprend le format « consigne → réponse ».",
          },
          {
            label: "IA constitutionnelle",
            value: "Le modèle s'auto-critique selon des principes écrits : une forme d'alignement scalable, à évaluer comme le reste.",
          },
        ],
      },
      {
        kind: "text",
        text: "Point d'évaluateur : l'alignement n'est jamais acquis définitivement — jailbreaks et dérives le testent en permanence, d'où l'évaluation continue.",
      },
    ],
  },
  {
    id: "llm-as-judge",
    title: "LLM-as-judge : juger avec un modèle",
    level: 3,
    intro: "Faire noter par un LLM : rapide, mais à valider.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : utiliser un LLM comme évaluateur (noter des réponses, comparer des modèles) scale l'évaluation — à condition d'avoir validé le juge contre des juges humains. Pourquoi : sans validation, on mesure la préférence du juge (biais de longueur, d'ordre) au lieu de la qualité.",
      },
      {
        kind: "fields",
        title: "Les garde-fous du juge",
        fields: [
          {
            label: "Valider d'abord",
            value: "Corrélation juge-vs-humain sur un échantillon : en dessous d'un seuil, le juge ne sert pas.",
          },
          {
            label: "Neutraliser les biais",
            value: "Randomiser l'ordre des réponses, anonymiser les modèles, contrôler la longueur : les biais connus du juge.",
          },
          {
            label: "Juge ≠ vérité",
            value: "Le juge automatique sert au tri et à la non-régression ; les décisions de déploiement gardent une validation humaine.",
          },
        ],
      },
    ],
  },
  {
    id: "red-team-organisation",
    title: "Organiser le red-teaming IA en interne",
    level: 3,
    intro: "Institutionnaliser l'évaluation adverse : l'équipe et le rythme.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : le red-teaming défensif devient une fonction récurrente — une équipe (ou un rôle tournant) qui attaque chaque release significative selon un plan, avec des livrables. Pourquoi : l'adversarial ponctuel s'oublie ; l'institutionnalisé protège.",
      },
      {
        kind: "fields",
        title: "Mettre en place",
        fields: [
          {
            label: "Cadence",
            value: "À chaque changement significatif (nouveau modèle, nouveau périmètre, nouvel outil agent) + campagne trimestrielle de fond.",
          },
          {
            label: "Diversité des testeurs",
            value: "Profils variés (technique, métier, linguistique) : les angles d'attaque dépendent de qui regarde.",
          },
          {
            label: "Livrables",
            value: "Rapport par campagne (scénarios, findings, mitigations, re-test) versé à la traçabilité du système.",
          },
          {
            label: "Indépendance",
            value: "Les testeurs ne sont pas les développeurs du système : on ne trouve pas ses propres angles morts.",
          },
        ],
      },
      {
        kind: "text",
        text: "Rappel permanent : périmètre = vos systèmes, objectif = corriger, diffusion des techniques = encadrée. C'est ce qui distingue le red-teaming défensif de l'attaque.",
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
          "Mesurer avant de déployer : aucun système en production sans évaluation documentée sur son usage réel.",
          "Définir l'usage et les interdits : sans périmètre écrit, impossible de dire ce qu'est un échec.",
          "Évaluer le système complet : modèle + prompts + outils + garde-fous — pas le modèle seul.",
          "Red-teamer défensivement : tester ses propres modèles avant que d'autres ne le fassent.",
          "Défense en profondeur : filtrer avant, contraindre pendant, vérifier après, superviser toujours.",
          "Désagréger les métriques : un score global cache les échecs de groupe — l'équité se mesure.",
          "Tracer pour répondre : versions, données, décisions journalisées — la responsabilité exige des preuves.",
          "Surveiller en production : la dérive est inévitable, sa détection est un choix.",
          "Proportionner l'effort : l'exigence suit le risque — exhaustive pour le haut risque, légère mais réelle sinon.",
          "Rester honnête : publier les limites connues (model card) vaut mieux qu'un incident qui les révèle.",
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Aller plus loin, en commençant toujours par les sources officielles.",
    blocks: [
      {
        kind: "fields",
        title: "Sources officielles (à privilégier)",
        fields: [
          {
            label: "NIST AI Risk Management Framework",
            value: "nvlpubs.nist.gov : le cadre de gestion des risques IA — gratuit, structuré, opérationnel.",
          },
          {
            label: "EU AI Act (EUR-Lex)",
            value: "eur-lex.europa.eu : le texte officiel et ses actes d'exécution — la référence réglementaire.",
          },
          {
            label: "OWASP Top 10 for LLM",
            value: "owasp.org : les risques spécifiques aux applications à base de LLM, pendant applicatif du Top 10.",
          },
          {
            label: "Stanford HELM",
            value: "crfm.stanford.edu/helm : la méthodologie d'évaluation holistique — transparente et documentée.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les projets de cette page (évaluation complète, garde-fous, politique d'usage) constituent un portfolio.",
          "Veille : suivre les publications du NIST, de l'ANSSI et les mises à jour de l'AI Act — le domaine évolue vite.",
          "Communauté : les rapports d'incidents IA publiés (désanonymisés) pour apprendre des échecs des autres.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "L'évaluation et la fiabilité maîtrisées, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Industrialiser : MLOps — intégrer l'évaluation au pipeline de déploiement des modèles.",
          "Comprendre les systèmes : LLM Systems — l'architecture qu'on évalue (RAG, agents, outils).",
          "Approfondir les modèles : Machine Learning et Deep Learning — les fondations techniques.",
          "Côté sécurité classique : SOC & Détection et Gouvernance & Conformité — la surveillance et le cadre organisationnel s'appliquent aussi à l'IA.",
          "Revenir à la roadmap : valider Évaluation & Fiabilité et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

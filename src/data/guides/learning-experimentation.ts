import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de l'expérimentation : design d'expériences,
 * A/B testing, significativité, puissance, causalité. 3 niveaux
 * d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_EXPERIMENTATION: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est l'expérimentation, pourquoi elle est la seule preuve d'impact, et ce qu'elle n'est pas.",
    blocks: [
      {
        kind: "text",
        text: "L'expérimentation consiste à tester une hypothèse en comparant un groupe qui reçoit un changement (traitement) à un groupe qui ne le reçoit pas (contrôle), les deux groupes étant constitués par tirage aléatoire. C'est le test A/B dans sa forme la plus simple — et la méthode la plus fiable pour savoir si quelque chose marche vraiment.",
      },
      {
        kind: "text",
        text: "Pourquoi elle existe : tout le reste — corrélation, intuition, avis d'expert, « ça a marché chez le concurrent » — peut se tromper. Seule la comparaison randomisée isole l'effet du changement de tout le reste (saisonnalité, tendances, différences entre utilisateurs). Sans expérimentation, on confond ce qui coïncide avec ce qui cause.",
      },
      {
        kind: "text",
        text: "Ce qu'elle n'est pas : ni un sondage d'opinion, ni une simple comparaison avant/après (qui ne contrôle rien), ni une garantie — une expérience bien menée peut conclure « pas d'effet », et c'est un résultat précieux. L'expérimentation est une discipline de décision, pas une machine à valider des intuitions.",
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : corréler, c'est observer ; expérimenter, c'est prouver",
    level: 1,
    intro:
      "L'idée centrale : la randomisation est ce qui transforme une observation en preuve.",
    blocks: [
      {
        kind: "diagram",
        title: "Pourquoi la randomisation change tout",
        lines: [
          "Observation : « les utilisateurs de la nouvelle page achètent plus »",
          "     │",
          "     ├─► Explication 1 : la page cause l'achat  ✓ (ce qu'on espère)",
          "     ├─► Explication 2 : ce sont déjà les meilleurs clients (biais)",
          "     └─► Explication 3 : c'était la période des fêtes (contexte)",
          "                          │",
          "     Randomisation : les groupes sont identiques EN MOYENNE",
          "     (mêmes bons clients, même période, des deux côtés)",
          "                          │",
          "                          ▼",
          "     La différence observée ne peut venir que du changement",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : randomiser, c'est rendre les groupes comparables sur tout ce qu'on ne mesure pas — et c'est précisément ce qu'aucune analyse observationnelle ne peut garantir. Tout le reste (tests statistiques, tailles d'échantillon, garde-fous) sert à rendre cette comparaison rigoureuse et interprétable.",
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
      "Ce qu'il faut maîtriser avant de concevoir des expériences sérieuses.",
    blocks: [
      {
        kind: "fields",
        title: "Bases requises",
        fields: [
          {
            label: "Statistiques",
            value:
              "Moyenne, variance, distribution, intervalle de confiance : le vocabulaire de l'interprétation des résultats — voir la compétence `statistics`.",
          },
          {
            label: "Python / pandas",
            value:
              "Manipuler les données d'expérience, calculer des métriques par groupe, tracer les résultats.",
          },
          {
            label: "Esprit critique",
            value:
              "La qualité la plus importante : douter de ses propres résultats, chercher les biais avant de célébrer.",
          },
        ],
      },
    ],
  },
  {
    id: "environnement",
    title: "Environnement de travail",
    level: 2,
    intro:
      "Les outils d'analyse d'expériences : Python scientifique, pas de plateforme magique.",
    blocks: [
      {
        kind: "command",
        label: "Installer la pile d'analyse",
        command: "pip install scipy statsmodels pandas matplotlib jupyter",
        why: "`scipy` fournit les tests statistiques (test t, chi²), `statsmodels` les modèles et intervalles, `pandas`/`matplotlib` la manipulation et la visualisation. Analyser une expérience, c'est d'abord savoir calculer et représenter — les plateformes d'A/B testing ne remplacent pas cette compréhension.",
        verify: "python -c \"import scipy, statsmodels; print(scipy.__version__)\"",
      },
      {
        kind: "text",
        text: "Note importante : il n'existe pas d'outil qui « fait » une bonne expérience à votre place. Les plateformes (internes aux grandes entreprises ou open source) automatisent la randomisation et le calcul — mais le design (hypothèse, métriques, durée) reste un travail intellectuel. Cette page enseigne ce travail.",
      },
    ],
  },
  {
    id: "vocabulaire",
    title: "Le vocabulaire de l'expérimentation",
    level: 2,
    intro:
      "Les termes que tout le monde utilise — et qu'il faut employer correctement.",
    blocks: [
      {
        kind: "fields",
        title: "Glossaire",
        fields: [
          {
            label: "Hypothèse",
            value:
              "Une prédiction testable : « changer le bouton d'inscription de vert à bleu augmente le taux d'inscription de 2 points ». Sans hypothèse écrite avant, on finit par rationaliser n'importe quel résultat.",
          },
          {
            label: "Groupe contrôle / traitement",
            value:
              "Le contrôle reçoit l'existant (ou rien), le traitement reçoit le changement. On ne compare jamais un groupe à lui-même dans le temps.",
          },
          {
            label: "Randomisation",
            value:
              "L'assignation aléatoire de chaque unité (utilisateur, visite) à un groupe. C'est elle qui rend les groupes comparables.",
          },
          {
            label: "Métrique primaire",
            value:
              "L'UNIQUE indicateur qui décidera du succès, choisi avant l'expérience. Plusieurs métriques primaires = plusieurs chances de se tromper.",
          },
          {
            label: "Métriques de garde (guardrails)",
            value:
              "Les indicateurs à ne pas dégrader (temps de chargement, taux d'erreur) : un gain qui casse autre chose n'est pas un gain.",
          },
          {
            label: "Significativité statistique",
            value:
              "Le résultat est-il improbable sous l'hypothèse « pas d'effet » ? Elle ne dit pas si l'effet est grand ou utile — seulement s'il est réel.",
          },
        ],
      },
    ],
  },
  {
    id: "premiere-experience",
    title: "Concevoir sa première expérience",
    level: 2,
    intro:
      "Le protocole complet, étape par étape, avant toute ligne de calcul.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Écrire l'hypothèse",
            detail:
              "Formulation précise : « Si [changement], alors [métrique] [augmente/baisse] de [quantité] parce que [raison] ». Exemple : « Si le formulaire passe de 5 à 3 champs, alors le taux d'inscription augmente d'au moins 1 point, parce que la friction diminue. »",
          },
          {
            title: "Choisir la métrique primaire",
            detail:
              "Une seule : ici, le taux d'inscription (inscriptions / visiteurs du formulaire). Elle doit être mesurable, sensible au changement, et alignée avec l'objectif réel.",
          },
          {
            title: "Définir les garde-fous",
            detail:
              "Ce qu'on surveille pour ne pas casser : taux d'erreur du formulaire, qualité des inscriptions (les robots ?), temps de chargement.",
          },
          {
            title: "Randomiser",
            detail:
              "Chaque visiteur est assigné aléatoirement (50/50) au formulaire actuel ou au nouveau. L'unité de randomisation = le visiteur (pas la visite, pour éviter qu'une même personne voie les deux versions).",
          },
          {
            title: "Fixer la durée à l'avance",
            detail:
              "Ex. 2 semaines : assez pour atteindre la taille d'échantillon calculée et couvrir un cycle complet (week-ends inclus). On ne s'arrête pas « quand c'est significatif ».",
          },
          {
            title: "Analyser une fois",
            detail:
              "À la fin de la période : comparer les taux, calculer l'intervalle de confiance, vérifier les garde-fous, décider (déployer / itérer / abandonner).",
          },
        ],
      },
    ],
  },
  {
    id: "hypothese-nulle",
    title: "Hypothèse nulle et p-value",
    level: 2,
    intro:
      "Le raisonnement statistique de base : que signifie « significatif » ?",
    blocks: [
      {
        kind: "text",
        text: "L'hypothèse nulle (H0) affirme « il n'y a pas d'effet » : les deux groupes se comportent pareil, et toute différence observée est du bruit. La p-value est la probabilité d'observer une différence AU MOINS aussi grande que celle mesurée, SI H0 était vraie.",
      },
      {
        kind: "text",
        text: "Interprétation correcte : p = 0,03 signifie « si le changement n'avait aucun effet, on n'observerait un écart aussi grand que dans 3 % des cas ». Comme c'est improbable, on rejette H0 : l'effet est probablement réel. Le seuil conventionnel est 0,05 — mais c'est une convention, pas une loi de la nature.",
      },
      {
        kind: "list",
        items: [
          "Ce que la p-value N'EST PAS : la probabilité que l'hypothèse soit vraie, ni la taille de l'effet, ni son importance pratique.",
          "Un résultat non significatif (p > 0,05) ne prouve pas l'absence d'effet : il dit « pas assez de preuves » — peut-être l'effet existe mais l'échantillon est trop petit.",
          "Toujours accompagner la p-value d'un intervalle de confiance : il montre l'ampleur plausible de l'effet, pas seulement son existence.",
        ],
      },
    ],
  },
  {
    id: "randomisation-pratique",
    title: "Randomisation en pratique",
    level: 2,
    intro:
      "Bien randomiser : unité, méthode, vérifications.",
    blocks: [
      {
        kind: "fields",
        title: "Les décisions de randomisation",
        fields: [
          {
            label: "Unité de randomisation",
            value:
              "L'entité assignée à un groupe : utilisateur, visite, page, ville. Règle : l'unité doit correspondre à l'exposition — si un utilisateur peut voir les deux versions (deux appareils), randomiser par visite biaise.",
          },
          {
            label: "Méthode",
            value:
              "Hachage d'un identifiant stable (user_id) modulo 100 : déterministe (même utilisateur → même groupe à chaque visite) et uniforme. Jamais de randomisation basée sur l'heure ou l'ordre d'arrivée.",
          },
          {
            label: "Ratio",
            value:
              "50/50 maximise la puissance statistique. Un 90/10 se justifie pour limiter le risque d'un changement dangereux — au prix d'une durée plus longue.",
          },
          {
            label: "Vérification",
            value:
              "Avant d'analyser : les groupes ont-ils les bonnes proportions ? (test du ratio d'échantillonnage — voir niveau 3). Des groupes déséquilibrés signalent un bug de randomisation.",
          },
        ],
      },
    ],
  },
  {
    id: "choix-metriques",
    title: "Choisir ses métriques",
    level: 2,
    intro:
      "Une bonne métrique décide bien ; une mauvaise métrique décide vite et mal.",
    blocks: [
      {
        kind: "fields",
        title: "Critères d'une bonne métrique",
        fields: [
          {
            label: "Alignée avec l'objectif",
            value:
              "Si l'objectif est le revenu, mesurer le revenu — pas les clics. Les métriques intermédiaires (clics, temps passé) peuvent s'améliorer pendant que l'objectif se dégrade.",
          },
          {
            label: "Sensible",
            value:
              "Elle doit pouvoir bouger sous l'effet du changement testé. Un taux de conversion global est peu sensible à un changement de wording sur une page secondaire.",
          },
          {
            label: "Fiable",
            value:
              "Mesurée de la même façon des deux côtés, sans biais d'instrumentation. Un bug de tracking sur un seul groupe invalide tout.",
          },
          {
            label: "Interprétable",
            value:
              "« +2 points de conversion » se comprend ; un score composite obscur ne se défend pas devant une direction.",
          },
        ],
      },
      {
        kind: "text",
        text: "L'anti-pattern classique : la métrique vanity — un chiffre qui monte et fait plaisir mais ne change aucune décision (ex. nombre total d'inscrits quand on veut des clients actifs). Chaque métrique doit passer le test : « si elle bouge, que décidera-t-on ? »",
      },
    ],
  },
  {
    id: "test-t-pratique",
    title: "Analyser : le test t en pratique",
    level: 2,
    intro:
      "Comparer deux moyennes avec scipy : le calcul le plus courant de l'A/B testing.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Comparer deux groupes",
        code: `import pandas as pd
import numpy as np
from scipy import stats

# df : une ligne par utilisateur, colonnes groupe / conversion
controle = df.loc[df["groupe"] == "controle", "conversion"]
traitement = df.loc[df["groupe"] == "traitement", "conversion"]

# Différence observée
effet = traitement.mean() - controle.mean()
print(f"Taux contrôle : {controle.mean():.3f}")
print(f"Taux traitement : {traitement.mean():.3f}")
print(f"Effet : {effet:+.3f} ({effet / controle.mean():+.1%} en relatif)")

# Test t de Welch (variances potentiellement différentes)
t, p = stats.ttest_ind(traitement, controle, equal_var=False)
print(f"p-value : {p:.4f}")

# Intervalle de confiance à 95 % de la différence
diff = traitement.mean() - controle.mean()
se = np.sqrt(traitement.var() / len(traitement) + controle.var() / len(controle))
print(f"IC 95 % : [{diff - 1.96 * se:+.3f}, {diff + 1.96 * se:+.3f}]")`,
      },
      {
        kind: "text",
        text: "Lecture : si p < 0,05 ET que l'intervalle de confiance exclut zéro, l'effet est statistiquement significatif. Mais la vraie question suit : l'effet est-il PRATIQUEMENT significatif ? Un gain de +0,1 % statistiquement significatif sur un énorme échantillon ne justifie pas toujours un déploiement.",
      },
    ],
  },
  {
    id: "intervalle-confiance",
    title: "L'intervalle de confiance",
    level: 2,
    intro:
      "Plus informatif que la p-value : l'ampleur plausible de l'effet.",
    blocks: [
      {
        kind: "text",
        text: "Un intervalle de confiance à 95 % de [+0,5 %, +2,3 %] signifie : les valeurs d'effet compatibles avec les données vont de +0,5 % à +2,3 %. S'il contient zéro, l'effet pourrait être nul (non significatif). S'il est entièrement positif mais proche de zéro, l'effet est réel mais peut-être négligeable.",
      },
      {
        kind: "list",
        items: [
          "Large = incertain : l'échantillon est trop petit ou la métrique trop bruitée.",
          "Étroit = précis : même un petit effet est bien mesuré.",
          "Toujours présenter l'effet avec son intervalle, jamais seul : « +1,4 % [IC 95 % : +0,5 %, +2,3 %] ».",
          "L'intervalle se rétrécit avec la racine carrée de la taille d'échantillon : diviser l'incertitude par 2 demande 4× plus de données.",
        ],
      },
    ],
  },
  {
    id: "peeking-intro",
    title: "Le peeking : l'erreur la plus coûteuse",
    level: 2,
    intro:
      "Regarder les résultats en cours de route et s'arrêter « quand c'est significatif » invalide le test.",
    blocks: [
      {
        kind: "text",
        text: "Le peeking consiste à consulter les résultats avant la fin prévue et à arrêter l'expérience dès que p < 0,05. Le problème : en regardant 10 fois, on a 10 chances de tomber sur un faux positif — le taux d'erreur réel n'est plus 5 % mais peut dépasser 20 %. C'est comme lancer une pièce jusqu'à obtenir face, puis annoncer « la pièce est truquée ».",
      },
      {
        kind: "list",
        items: [
          "Règle d'or : fixer la durée (ou la taille d'échantillon) AVANT, analyser UNE fois à la fin.",
          "Si un suivi est nécessaire (bug, garde-fou), le faire sur les métriques de garde, pas sur la métrique primaire.",
          "Les méthodes de test séquentiel existent (voir niveau 3) mais exigent un protocole rigoureux — pas un coup d'œil improvisé.",
          "En équipe : verrouiller l'analyse dans un plan écrit avant le lancement, pour résister à la tentation.",
        ],
      },
    ],
  },
  {
    id: "erreurs-debutant",
    title: "Erreurs de débutant",
    level: 2,
    intro:
      "Les fautes classiques des premiers A/B tests.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "S'arrêter au premier signal vert",
            value:
              "Problem : peeking — arrêter dès que p < 0,05. Better : durée fixée à l'avance, analyse unique.",
          },
          {
            label: "Comparer avant/après sans contrôle",
            value:
              "Problem : « les ventes ont augmenté après le changement » — pendant les fêtes aussi. Better : toujours un groupe contrôle simultané.",
          },
          {
            label: "Changer les métriques après coup",
            value:
              "Problem : la métrique primaire ne bouge pas, on en « trouve » une qui bouge. Better : métrique primaire verrouillée avant le lancement.",
          },
          {
            label: "Tester sur trop peu de trafic",
            value:
              "Problem : 200 visiteurs ne détecteront jamais un effet de 2 %. Better : calculer la taille d'échantillon nécessaire avant (voir niveau 3).",
          },
          {
            label: "Ignorer les segments",
            value:
              "Problem : un effet global nul qui cache +10 % sur mobile et -10 % sur desktop. Better : prévoir les segments clés à l'avance.",
          },
          {
            label: "Lancer pendant une anomalie",
            value:
              "Problem : test pendant une panne, une promo, des vacances — résultats non généralisables. Better : noter le contexte, idéalement tester en période normale.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "p-value-profondeur",
    title: "La p-value en profondeur",
    level: 3,
    intro:
      "Ce que la p-value dit, ce qu'elle ne dit pas, et ses mésusages.",
    blocks: [
      {
        kind: "text",
        text: "La p-value est uniformément distribuée sous H0 : si on lance 20 expériences sans aucun effet réel, on s'attend en moyenne à 1 résultat « significatif » par pur hasard. C'est le problème des tests multiples : plus on teste d'hypothèses (ou de segments, ou de métriques), plus on trouve de faux positifs.",
      },
      {
        kind: "fields",
        title: "Mésusages fréquents",
        fields: [
          {
            label: "P-hacking",
            value:
              "Essayer plusieurs analyses jusqu'à trouver p < 0,05, puis ne rapporter que celle-là. C'est de la fraude méthodologique, même involontaire.",
          },
          {
            label: "Tests multiples non corrigés",
            value:
              "Tester 10 segments : la probabilité d'au moins un faux positif monte à ~40 %. Correction de Bonferroni (diviser le seuil par le nombre de tests) ou méthodes FDR quand c'est justifié.",
          },
          {
            label: "Confondre significatif et important",
            value:
              "Avec 10 millions d'utilisateurs, un effet de +0,01 % est « significatif » — et probablement inutile. Toujours juger l'ampleur, pas seulement la p-value.",
          },
          {
            label: "Le seuil 0,05 comme vérité",
            value:
              "C'est une convention de Fisher des années 1920. Pour des décisions coûteuses, exiger p < 0,01 ou un effet minimal pratique est plus sage.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-type",
    title: "Erreurs de type I et II",
    level: 3,
    intro:
      "Les deux façons de se tromper, et l'arbitrage entre elles.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Réalité : pas d'effet", "Réalité : effet réel"],
        rows: [
          ["On conclut « effet »", "Erreur de type I (faux positif) — prob. α", "Bonne détection — prob. 1-β (puissance)"],
          ["On conclut « pas d'effet »", "Bonne décision — prob. 1-α", "Erreur de type II (faux négatif) — prob. β"],
        ],
      },
      {
        kind: "text",
        text: "α (souvent 5 %) contrôle les faux positifs : déployer un changement inutile. β (souvent 20 %, soit 80 % de puissance) contrôle les faux négatifs : rater un vrai gain. L'arbitrage dépend du coût : un changement risqué exige un α strict ; une opportunité à faible coût accepte un β plus élevé. Le point clé : ces taux se FIXENT avant l'expérience, via la taille d'échantillon.",
      },
    ],
  },
  {
    id: "puissance",
    title: "La puissance statistique",
    level: 3,
    intro:
      "La probabilité de détecter un effet qui existe vraiment — et ce qui la détermine.",
    blocks: [
      {
        kind: "fields",
        title: "Les quatre déterminants",
        fields: [
          {
            label: "Taille d'effet (δ)",
            value:
              "Plus l'effet est grand, plus il est facile à détecter. On dimensionne pour le PLUS PETIT effet qui vaille la peine (MDE — minimum detectable effect).",
          },
          {
            label: "Variance (σ²)",
            value:
              "Plus la métrique est bruitée, plus il faut de données. Réduire la variance (voir CUPED) est souvent plus efficace qu'augmenter l'échantillon.",
          },
          {
            label: "Taille d'échantillon (n)",
            value:
              "Le levier le plus direct : la précision augmente en racine de n. Doubler la précision = quadrupler l'échantillon.",
          },
          {
            label: "Seuil α",
            value:
              "Un seuil plus strict (1 % au lieu de 5 %) exige plus de données pour la même puissance.",
          },
        ],
      },
      {
        kind: "text",
        text: "La formule (test de deux proportions, cas courant) : `n = 2σ²(z₁₋α/₂ + z₁₋β)² / δ²` par groupe. En pratique, on utilise un calculateur — mais comprendre la formule évite les erreurs d'interprétation : si l'effet espéré est petit et la variance grande, l'expérience demandera un trafic énorme, et il vaut mieux le savoir AVANT de lancer.",
      },
    ],
  },
  {
    id: "taille-echantillon",
    title: "Calculer la taille d'échantillon",
    level: 3,
    intro:
      "Dimensionner l'expérience avant de la lancer : un calcul qui évite les tests interminables.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Estimation de la taille requise",
        code: `import math

# Paramètres du dimensionnement
taux_base = 0.10   # taux de conversion actuel
mde = 0.02         # plus petit effet relatif détecté : +2 % -> 0.102
alpha = 0.05       # risque de faux positif
puissance = 0.80   # 1 - beta

# Quantiles normaux (bilatéral 5 %, puissance 80 %)
z_alpha = 1.96
z_beta = 0.84

p1 = taux_base
p2 = taux_base * (1 + mde)
p_moy = (p1 + p2) / 2

n = (
    2 * p_moy * (1 - p_moy) * (z_alpha + z_beta) ** 2
) / (p2 - p1) ** 2

print(f"~{math.ceil(n):,} utilisateurs par groupe".replace(",", " "))`,
      },
      {
        kind: "text",
        text: "Ce calcul suppose des groupes indépendants et un test bilatéral. Si le trafic disponible ne permet pas d'atteindre n dans un délai raisonnable, les options sont : accepter un MDE plus grand (ne détecter que les gros effets), réduire la variance (CUPED), allonger la durée, ou renoncer au test — lancer un test sous-dimensionné, c'est produire un résultat non conclusif en pure perte.",
      },
    ],
  },
  {
    id: "randomisation-avancee",
    title: "Randomisation avancée",
    level: 3,
    intro:
      "Stratification, clusters, switchback : quand le 50/50 simple ne suffit pas.",
    blocks: [
      {
        kind: "fields",
        title: "Techniques",
        fields: [
          {
            label: "Stratification",
            value:
              "Randomiser à l'intérieur de strates (pays, appareil, nouveaux vs anciens) : garantit l'équilibre sur les variables clés et augmente la précision. Particulièrement utile quand une strate est petite mais importante.",
          },
          {
            label: "Randomisation par cluster",
            value:
              "Quand les unités s'influencent (ville, entreprise, classe) : randomiser le cluster entier pour éviter la contamination entre groupes. Coût : moins d'unités indépendantes, donc moins de puissance.",
          },
          {
            label: "Switchback (alternance temporelle)",
            value:
              "Pour les systèmes à forte interaction (marketplace, tarification) : alterner traitement/contrôle par périodes. Permet de tester quand la randomisation par utilisateur est impossible.",
          },
          {
            label: "Géo-expériences",
            value:
              "Randomiser par zone géographique pour des changements à effet de réseau (livraison, prix). Exige des zones comparables et un appariement soigneux.",
          },
        ],
      },
    ],
  },
  {
    id: "plans-factoriels",
    title: "Plans factoriels et tests multivariés",
    level: 3,
    intro:
      "Tester plusieurs changements à la fois — et leurs interactions.",
    blocks: [
      {
        kind: "text",
        text: "Un plan factoriel 2×2 teste deux changements (A : titre, B : bouton) dans 4 groupes : contrôle, A seul, B seul, A+B. Avantage : on mesure chaque effet ET leur interaction (A+B peut être plus — ou moins — que la somme). C'est plus efficace que deux tests séquentiels, à condition d'avoir le trafic pour 4 groupes.",
      },
      {
        kind: "list",
        items: [
          "Interaction : l'effet combiné diffère de la somme des effets — c'est souvent LA découverte intéressante.",
          "Coût : chaque facteur ajouté multiplie les groupes ; la puissance par effet diminue.",
          "Ne pas confondre avec le « tout tester en même temps sans plan » : le factoriel est un design, pas du désordre.",
          "Alternative pragmatique : tester séquentiellement quand le trafic est limité, en acceptant de rater les interactions.",
        ],
      },
    ],
  },
  {
    id: "bandits",
    title: "Bandits manchots : l'alternative adaptative",
    level: 3,
    intro:
      "Quand l'objectif n'est pas de prouver mais d'optimiser en continu.",
    blocks: [
      {
        kind: "text",
        text: "Le bandit manchot (multi-armed bandit) alloue dynamiquement plus de trafic aux variantes qui performent : on apprend ET on exploite simultanément. Cas d'usage : optimisation continue (titres d'articles, recommandations), pas validation scientifique.",
      },
      {
        kind: "code",
        language: "python",
        title: "Epsilon-greedy : le plus simple des bandits",
        code: `import random

class EpsilonGreedy:
    def __init__(self, n_bras, epsilon=0.1):
        self.n = n_bras
        self.eps = epsilon
        self.succes = [0] * n_bras
        self.tirages = [0] * n_bras

    def choisir(self):
        # Exploration : bras au hasard ; exploitation : meilleur bras
        if random.random() < self.eps:
            return random.randrange(self.n)
        moyennes = [s / max(t, 1) for s, t in zip(self.succes, self.tirages)]
        return max(range(self.n), key=lambda i: moyennes[i])

    def mettre_a_jour(self, bras, recompense):
        self.tirages[bras] += 1
        self.succes[bras] += recompense`,
      },
      {
        kind: "text",
        text: "Différence fondamentale avec l'A/B test : le bandit ne produit pas de p-value valide (l'allocation adaptative biaise les estimateurs naïfs). On choisit : prouver (A/B test) ou optimiser (bandit) — rarement les deux à la fois.",
      },
    ],
  },
  {
    id: "approche-bayesienne",
    title: "L'approche bayésienne",
    level: 3,
    intro:
      "Une autre philosophie : « quelle est la probabilité que B batte A ? »",
    blocks: [
      {
        kind: "text",
        text: "L'approche bayésienne modélise directement la distribution du taux de conversion de chaque groupe (souvent une loi Beta pour les proportions) et calcule : P(B > A | données), et la perte attendue si on se trompe. Le résultat se lit intuitivement : « il y a 97 % de chances que B soit meilleur, avec un gain probable entre +1 % et +3 % ».",
      },
      {
        kind: "list",
        items: [
          "Avantage : interprétation directe, intégration d'information a priori (résultats passés), décision basée sur la perte attendue.",
          "Inconvénient : le choix du prior influence le résultat sur petits échantillons ; moins standard dans les organisations.",
          "Les deux approches convergent avec beaucoup de données : le débat est surtout philosophique sur petits échantillons.",
          "En pratique d'entreprise, le fréquentiste (p-value, IC) reste la lingua franca — le bayésien est un complément puissant pour la décision.",
        ],
      },
    ],
  },
  {
    id: "metriques-garde",
    title: "Métriques de garde et hiérarchie",
    level: 3,
    intro:
      "Protéger l'expérience contre les victoires à la Pyrrhus.",
    blocks: [
      {
        kind: "fields",
        title: "La hiérarchie des métriques",
        fields: [
          {
            label: "Primaire (1 seule)",
            value:
              "Décide du succès. Ex. taux d'inscription. Verrouillée avant le lancement.",
          },
          {
            label: "Secondaires (2-5)",
            value:
              "Éclairent le mécanisme : d'où vient l'effet ? Ex. taux par étape du formulaire. Interprétées avec prudence (tests multiples).",
          },
          {
            label: "Garde-fous",
            value:
              "À ne pas dégrader : temps de chargement, taux d'erreur, désinscriptions. Un test s'arrête si un garde-fou se dégrade significativement — c'est la seule exception au « pas d'arrêt anticipé ».",
          },
          {
            label: "Diagnostiques",
            value:
              "Vérifient la validité : proportions des groupes, couverture du tracking, distribution des appareils. On les consulte pendant, pas la primaire.",
          },
        ],
      },
    ],
  },
  {
    id: "metriques-ratio",
    title: "Métriques de ratio",
    level: 3,
    intro:
      "Panier moyen, taux de clic : des ratios dont la variance se calcule avec soin.",
    blocks: [
      {
        kind: "text",
        text: "Beaucoup de métriques métier sont des ratios (revenu / utilisateur, clics / impressions). Leur variance ne se calcule pas comme celle d'une moyenne simple : le numérateur et le dénominateur varient tous deux. La méthode delta donne une approximation de la variance du ratio, ce qui permet de construire des intervalles de confiance valides.",
      },
      {
        kind: "list",
        items: [
          "Piège : moyenner des ratios par jour puis moyenner les moyennes — cela pondère mal les jours à faible trafic.",
          "Bonne pratique : calculer le ratio sur l'ensemble de la période (somme des numérateurs / somme des dénominateurs).",
          "Alternative robuste : le bootstrap (rééchantillonner les utilisateurs, recalculer le ratio, prendre les quantiles) — simple et sans hypothèse de normalité.",
          "Les ratios à petit dénominateur sont instables : méfiance sur les segments peu fournis.",
        ],
      },
    ],
  },
  {
    id: "srm",
    title: "SRM : le test du ratio d'échantillonnage",
    level: 3,
    intro:
      "Le contrôle qualité le plus important : les groupes ont-ils les bonnes proportions ?",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Détecter un SRM",
        code: `from scipy import stats

# Attendu : 50/50. Observé : n_controle, n_traitement
n_controle, n_traitement = 48210, 51790
total = n_controle + n_traitement

# Chi² d'adéquation à la répartition attendue
chi2, p = stats.chisquare(
    [n_controle, n_traitement],
    [total / 2, total / 2],
)
print(f"p-value : {p:.4f}")  # p < 0.001 -> SRM : quelque chose cloche`,
      },
      {
        kind: "text",
        text: "Un SRM (Sample Ratio Mismatch) signifie que la randomisation est cassée : bug d'assignation, filtre appliqué à un seul groupe, bot qui pollue un bras, ou événement qui affecte différentiellement les groupes. C'est le premier test à lancer avant toute analyse — un SRM invalide tout le reste. Causes fréquentes : le tracking qui échoue plus d'un côté, une règle métier qui exclut des utilisateurs après randomisation.",
      },
    ],
  },
  {
    id: "effets-temporalite",
    title: "Novelty, primacy et saisonnalité",
    level: 3,
    intro:
      "Les effets temporels qui faussent les premières semaines d'un test.",
    blocks: [
      {
        kind: "fields",
        title: "Effets à connaître",
        fields: [
          {
            label: "Effet de nouveauté (novelty)",
            value:
              "Un changement attire l'attention par sa nouveauté : pic d'engagement les premiers jours, qui s'estompe. Un test trop court conclut sur un effet qui n'existera plus.",
          },
          {
            label: "Effet de primauté (primacy)",
            value:
              "L'inverse : les utilisateurs habitués mettent du temps à adopter le changement, l'effet réel n'apparaît qu'après plusieurs semaines. Fréquent sur les refontes d'interface.",
          },
          {
            label: "Jour de la semaine",
            value:
              "Le comportement varie fortement (week-end vs semaine). Une expérience doit couvrir des semaines complètes, jamais « 5 jours ».",
          },
          {
            label: "Parade",
            value:
              "Durée minimale de 1 à 2 cycles complets (semaines), et analyse de l'effet par semaine : un effet qui décroît chaque semaine est suspect.",
          },
        ],
      },
    ],
  },
  {
    id: "peeking-solutions",
    title: "Peeking : les solutions rigoureuses",
    level: 3,
    intro:
      "Quand on DOIT regarder en cours de route : les méthodes séquentielles.",
    blocks: [
      {
        kind: "text",
        text: "Il existe des méthodes qui autorisent les regards intermédiaires en contrôlant le taux d'erreur global : les tests séquentiels (group sequential designs) dépensent le « budget d'erreur α » au fil des analyses (fonctions d'alpha-spending), et les approches bayésiennes avec règle d'arrêt sur la perte attendue. Elles exigent un protocole écrit à l'avance : quand regarder, avec quel seuil ajusté, quand s'arrêter.",
      },
      {
        kind: "list",
        items: [
          "Principe : chaque regard intermédiaire consomme une partie du budget d'erreur ; les seuils deviennent plus stricts.",
          "Usage légitime : arrêter tôt un test dont l'effet est massif ET les garde-fous sains — avec un protocole prédéfini.",
          "Ce que ça n'autorise pas : regarder chaque matin et s'arrêter au premier p < 0,05 — c'est exactement le peeking interdit.",
          "En pratique, la plupart des équipes gagnent plus à discipliner le « une analyse à la fin » qu'à implémenter du séquentiel.",
        ],
      },
    ],
  },
  {
    id: "duree-experience",
    title: "Durée et calendrier",
    level: 3,
    intro:
      "Combien de temps faire tourner un test : le compromis vitesse/fiabilité.",
    blocks: [
      {
        kind: "list",
        items: [
          "Minimum : atteindre la taille d'échantillon calculée ET couvrir 1 à 2 cycles complets (semaines).",
          "Maximum : au-delà de 4 à 6 semaines, le monde change (saisonnalité, autres lancements) et le test mesure un passé révolu.",
          "Tests qui se chevauchent : documenter les expériences simultanées — deux tests sur la même page peuvent interagir.",
          "Périodes à éviter : lancements majeurs, pannes, vacances atypiques, campagnes marketing massives — ou les noter comme limite.",
          "Vitesse vs précision : un MDE plus grand = un test plus court. Choisir le MDE, c'est choisir le rythme d'innovation.",
        ],
      },
    ],
  },
  {
    id: "segmentation",
    title: "Segmentation des résultats",
    level: 3,
    intro:
      "L'effet global cache des effets opposés : analyser par segment — avec discipline.",
    blocks: [
      {
        kind: "text",
        text: "Un effet global de +1 % peut cacher +8 % sur mobile et -6 % sur desktop : la décision de déploiement n'est pas la même. Les segments pertinents (appareil, pays, nouveaux vs anciens, plan tarifaire) se définissent AVANT l'expérience, en fonction des hypothèses.",
      },
      {
        kind: "list",
        items: [
          "Pré-enregistrer 3 à 5 segments maximum : chaque segment supplémentaire multiplie les risques de faux positif.",
          "Un segment « significatif » parmi 20 testés après coup ne prouve rien (tests multiples).",
          "Les segments à faible trafic ont des intervalles énormes : ne pas sur-interpréter.",
          "Utilité principale : comprendre le mécanisme (« l'effet vient du mobile ») et décider d'un déploiement ciblé.",
        ],
      },
    ],
  },
  {
    id: "heterogeneite",
    title: "Hétérogénéité des effets",
    level: 3,
    intro:
      "Au-delà des segments prédéfinis : qui bénéficie vraiment du changement ?",
    blocks: [
      {
        kind: "text",
        text: "L'effet moyen (ATE) peut masquer une réalité contrastée : le changement aide certains utilisateurs et nuit à d'autres. Les méthodes d'estimation d'effets hétérogènes (uplift modeling, causal forests) identifient POUR QUI le traitement fonctionne — permettant un déploiement ciblé plutôt que global.",
      },
      {
        kind: "list",
        items: [
          "Uplift modeling : prédire l'effet individuel du traitement (différence entre « traité » et « non traité » pour chaque profil).",
          "Prudence : ces modèles sont complexes et gourmands en données ; commencer par les segments métier simples.",
          "Application typique : cibler une promotion sur ceux qu'elle convertit vraiment, pas sur ceux qui auraient acheté de toute façon.",
        ],
      },
    ],
  },
  {
    id: "cuped",
    title: "CUPED : réduire la variance",
    level: 3,
    intro:
      "La technique la plus rentable de l'expérimentation moderne : utiliser le passé pour préciser le présent.",
    blocks: [
      {
        kind: "text",
        text: "CUPED (Controlled-experiment Using Pre-Experiment Data) ajuste la métrique avec une covariable mesurée AVANT l'expérience (ex. l'activité passée de l'utilisateur). Comme le passé prédit en partie le présent, l'ajustement retire du bruit — réduisant la variance de 20 à 50 % dans les cas typiques, ce qui équivaut à augmenter l'échantillon sans attendre plus longtemps.",
      },
      {
        kind: "list",
        items: [
          "Condition : la covariable doit être antérieure à la randomisation (sinon elle peut être affectée par le traitement).",
          "En pratique : régression de la métrique sur la covariable pré-expérience, puis analyse des résidus.",
          "C'est la méthode standard dans les grandes plateformes d'expérimentation — et elle reste simple à implémenter.",
          "Limite : si le passé ne prédit pas la métrique, le gain est nul (mais la méthode reste valide).",
        ],
      },
    ],
  },
  {
    id: "quasi-experiences",
    title: "Quand on ne peut pas randomiser",
    level: 3,
    intro:
      "Pas de randomisation possible ? Les quasi-expériences exploitent les variations naturelles.",
    blocks: [
      {
        kind: "fields",
        title: "Méthodes",
        fields: [
          {
            label: "Différence-en-différences",
            value:
              "Comparer l'évolution d'un groupe traité à celle d'un groupe non traité, avant/après le changement. Hypothèse clé : sans le changement, les deux groupes auraient évolué pareillement (tendances parallèles) — à vérifier sur la période pré-changement.",
          },
          {
            label: "Régression sur discontinuité",
            value:
              "Quand un seuil décide du traitement (ex. remise au-delà d'un score) : comparer juste en dessous et juste au-dessus du seuil, où les unités sont quasi identiques. Très crédible près du seuil, non généralisable loin.",
          },
          {
            label: "Contrôle synthétique",
            value:
              "Construire un « jumeau » artificiel du groupe traité en combinant plusieurs groupes non traités (ex. une région traitée vs combinaison pondérée d'autres régions). Utile pour les tests géographiques.",
          },
          {
            label: "Variables instrumentales",
            value:
              "Exploiter une variation exogène qui affecte le traitement sans affecter directement le résultat. Puissante mais exigeante : trouver un bon instrument est difficile.",
          },
        ],
      },
      {
        kind: "text",
        text: "Hiérarchie de crédibilité : expérience randomisée > quasi-expérience bien conçue > analyse observationnelle naïve. Les quasi-expériences demandent plus d'hypothèses — les expliciter et les tester quand c'est possible.",
      },
    ],
  },
  {
    id: "instrumentation",
    title: "Instrumentation et qualité des données",
    level: 3,
    intro:
      "Une expérience repose sur des données de tracking : les valider avant de conclure.",
    blocks: [
      {
        kind: "list",
        items: [
          "Tester le tracking avant le lancement : événements émis des deux côtés, avec les bons paramètres.",
          "Vérifier la cohérence : le nombre d'utilisateurs randomisés correspond-il au trafic attendu ? Les métriques sont-elles dans les ordres de grandeur habituels ?",
          "Délai de disponibilité : les données du jour J sont-elles complètes à J+1 ou à J+3 ? Analyser trop tôt, c'est analyser du partiel.",
          "Bots et trafic non humain : filtrer selon les règles habituelles, identiques des deux côtés.",
          "Journaliser les décisions : qui a lancé quoi, quand, avec quels paramètres — la traçabilité est la base de la confiance.",
        ],
      },
    ],
  },
  {
    id: "culture-experimentation",
    title: "La culture d'expérimentation",
    level: 3,
    intro:
      "L'expérimentation est autant une culture d'équipe qu'une technique.",
    blocks: [
      {
        kind: "list",
        items: [
          "Documenter chaque expérience : hypothèse, design, résultats, décision — dans un registre partagé. La mémoire collective des tests évite de retester les mêmes idées.",
          "Célébrer les résultats négatifs : un test qui invalide une hypothèse a économisé un mauvais déploiement. Punir les « échecs », c'est encourager le p-hacking.",
          "Exiger le plan avant le lancement : hypothèse, métrique primaire, durée, segments — relu par un pair.",
          "Limiter les tests simultanés sur la même surface : trop d'expériences qui se chevauchent rendent chaque résultat ininterprétable.",
          "Revue post-test : qu'a-t-on appris, même quand le test est « non significatif » ?",
        ],
      },
    ],
  },
  {
    id: "ethique",
    title: "Éthique de l'expérimentation",
    level: 3,
    intro:
      "Tester sur des humains implique des responsabilités.",
    blocks: [
      {
        kind: "list",
        items: [
          "Ne jamais tester ce qu'on soupçonne d'être nocif : l'expérience n'est pas une excuse pour exposer des utilisateurs à un risque connu.",
          "Équité : vérifier que le changement ne dégrade pas spécifiquement un groupe vulnérable ou minoritaire.",
          "Transparence interne : les équipes concernées savent qu'un test tourne et peuvent l'arrêter via les garde-fous.",
          "Données personnelles : les analyses respectent les mêmes règles de confidentialité que le reste du produit.",
          "Domaines sensibles (santé, finance, emploi) : des garde-fous renforcés et, souvent, un cadre réglementaire s'appliquent.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Le catalogue des fautes d'expérimentation, des plus grossières aux plus subtiles.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Le peeking",
            value:
              "Problem : s'arrêter au premier p < 0,05. Better : durée fixée à l'avance, ou protocole séquentiel rigoureux.",
          },
          {
            label: "Le SRM ignoré",
            value:
              "Problem : analyser sans vérifier les proportions des groupes. Better : test du ratio d'échantillonnage en premier, toujours.",
          },
          {
            label: "La métrique qui bouge après coup",
            value:
              "Problem : choisir la métrique qui « marche » parmi dix. Better : primaire verrouillée avant.",
          },
          {
            label: "L'effet de nouveauté pris pour un effet réel",
            value:
              "Problem : test trop court sur un changement visible. Better : durée couvrant plusieurs semaines, analyse de la décroissance.",
          },
          {
            label: "La contamination",
            value:
              "Problem : des utilisateurs voient les deux versions (plusieurs appareils, partage de compte). Better : unité de randomisation adaptée, ou randomisation par cluster.",
          },
          {
            label: "Le test sous-dimensionné",
            value:
              "Problem : lancer sans calculer la taille requise, obtenir un résultat non conclusif. Better : dimensionner avant, ou renoncer proprement.",
          },
          {
            label: "L'interaction ignorée",
            value:
              "Problem : deux tests simultanés sur la même page, résultats ininterprétables. Better : registre des tests, plan factoriel si besoin.",
          },
          {
            label: "La généralisation abusive",
            value:
              "Problem : « ça marche » sur 2 semaines de décembre, déployé pour toute l'année. Better : noter le contexte, tester en période représentative.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro:
      "Des repères de contexte, pas des règles absolues.",
    blocks: [
      {
        kind: "list",
        items: [
          "Hypothèse écrite avant : si / alors / parce que, avec un effet minimal attendu.",
          "Une métrique primaire, verrouillée ; des garde-fous surveillés.",
          "Randomisation propre : unité adaptée, assignation déterministe, SRM vérifié.",
          "Durée fixée à l'avance : taille d'échantillon calculée + cycles complets.",
          "Pas de peeking sur la primaire ; protocole séquentiel si regard intermédiaire nécessaire.",
          "Résultats avec intervalles de confiance, pas seulement des p-values.",
          "Segments prédéfinis, peu nombreux ; méfiance envers les découvertes post-hoc.",
          "Contexte noté : autres tests, événements, période — tout ce qui limite la généralisation.",
          "Registre partagé : chaque test documenté, y compris les négatifs.",
          "Décision explicite : déployer / itérer / abandonner — avec les raisons.",
        ],
      },
    ],
  },
  {
    id: "projet-plan-ab",
    title: "Projet : plan d'A/B test complet",
    level: 3,
    intro:
      "Rédiger un protocole d'expérience de niveau professionnel, de bout en bout.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir un cas concret",
            detail:
              "Un changement réaliste sur un produit : refonte d'un formulaire, nouveau wording, réorganisation d'une page.",
          },
          {
            title: "Rédiger le protocole",
            detail:
              "Hypothèse, métrique primaire, secondaires, garde-fous, unité de randomisation, ratio, durée, segments prédéfinis, critères de décision.",
          },
          {
            title: "Dimensionner",
            detail:
              "Calculer la taille d'échantillon (MDE, α, puissance) et vérifier la faisabilité avec le trafic disponible.",
          },
          {
            title: "Simuler l'analyse",
            detail:
              "Générer des données fictives et écrire le script d'analyse (SRM, test, intervalles, graphiques) AVANT le lancement.",
          },
          {
            title: "Faire relire",
            detail:
              "Un pair challenge le design : biais possibles, métriques oubliées, durée réaliste. C'est la revue la plus rentable du projet.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-analyse-causale",
    title: "Projet : analyse causale d'une feature",
    level: 3,
    intro:
      "Évaluer l'impact d'un changement déjà déployé, sans randomisation.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir un changement passé",
            detail:
              "Une fonctionnalité lancée sans test : reconstituer la question « quel a été son vrai impact ? ».",
          },
          {
            title: "Chercher un contrefactuel",
            detail:
              "Groupe non exposé comparable, ou période pré-lancement : quelle méthode quasi-expérimentale s'applique (diff-in-diff, discontinuité, contrôle synthétique) ?",
          },
          {
            title: "Expliciter les hypothèses",
            detail:
              "Tendances parallèles, absence d'événement confondant : les tester quand c'est possible, les discuter sinon.",
          },
          {
            title: "Estimer avec prudence",
            detail:
              "Calculer l'effet avec intervalles, tester la robustesse (autres fenêtres, autres groupes de contrôle).",
          },
          {
            title: "Conclure honnêtement",
            detail:
              "Présenter l'estimation AVEC ses limites : c'est la marque d'une analyse causale sérieuse.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro:
      "Aller plus loin, en commençant toujours par la documentation officielle — ici, les références du domaine.",
    blocks: [
      {
        kind: "fields",
        title: "Références (à privilégier)",
        fields: [
          {
            label: "Documentation scipy.stats",
            value:
              "La référence des tests implémentés : hypothèses, paramètres, interprétations — à consulter avant chaque test utilisé.",
          },
          {
            label: "Documentation statsmodels",
            value:
              "Modèles, intervalles, puissance : la boîte à outils de l'analyse rigoureuse en Python.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Livre : « Trustworthy Online Controlled Experiments » (Kohavi, Tang, Xu) — la bible de l'A/B testing industriel.",
          "Guide : « Evan Miller — How Not to Run an A/B Test » — les erreurs classiques, expliquées clairement.",
          "Pratique : simuler des expériences en Python (générer des données, tester les méthodes) — le meilleur moyen de comprendre puissance et peeking.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "L'expérimentation maîtrisée, voici les prolongements naturels dans la roadmap Data Scientist.",
    blocks: [
      {
        kind: "list",
        items: [
          "`statistics` : approfondir les fondations (tests, régression, bayésien) qui sous-tendent chaque analyse.",
          "`machine-learning` : évaluer rigoureusement les modèles — la discipline expérimentale s'y applique directement.",
          "`deployment` : industrialiser les tests en production (feature flags, rollouts progressifs).",
          "`storytelling` : présenter des résultats d'expériences de façon à faire décider.",
          "Revenir à la roadmap : valider Expérimentation et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

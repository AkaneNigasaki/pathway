import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète des systèmes LLM : RAG, chunking, embeddings,
 * agents, évaluation — construire des applications fiables au-delà du
 * simple prompt. 3 niveaux d'information (Aperçu / Pratique / Approfondi)
 * avec divulgation progressive. Tous les textes supportent le code inline
 * entre backticks.
 */
export const LEARNING_LLM_SYSTEMS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est un système LLM, pourquoi le modèle seul ne fait pas le produit, et de quoi se compose un système fiable.",
    blocks: [
      {
        kind: "text",
        text: "Un système LLM assemble un grand modèle de langage avec des composants — base documentaire, recherche, outils, mémoire, garde-fous, évaluation — pour construire une application fiable : assistant sur documentation interne, agent qui agit via des API, recherche augmentée. Le modèle génère du texte ; le système produit de la valeur.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est nécessaire : un LLM seul hallucine (il invente avec aplomb), ignore vos données internes (son entraînement s'arrête à une date), ne peut pas agir (pas d'accès à vos outils), et oublie tout entre deux sessions. Chaque composant du système corrige une de ces limites : le RAG ancre les réponses dans vos documents, les outils permettent d'agir, l'évaluation mesure la fiabilité.",
      },
      {
        kind: "text",
        text: "Ce que cette page couvre : l'architecture RAG de bout en bout, le chunking, les embeddings, la recherche vectorielle, le prompt système, les agents et le function calling, l'évaluation — avec du code Python minimal et réel pour les parties déterministes, et des principes rigoureux pour les parties qui dépendent d'un fournisseur de modèle.",
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : le LLM est un composant, pas le système",
    level: 1,
    intro:
      "L'idée centrale : penser « système » plutôt que « prompt magique ».",
    blocks: [
      {
        kind: "diagram",
        title: "Un système RAG minimal",
        lines: [
          "Documents internes (docs, tickets, wiki)",
          "     │  découpage (chunking) + embeddings",
          "     ▼",
          "Base vectorielle (recherche par similarité)",
          "     │",
          "Question utilisateur ──► recherche des passages pertinents",
          "     │",
          "     ▼",
          "Prompt assemblé : instructions + passages + question",
          "     │",
          "     ▼",
          "LLM (génère la réponse ANCRÉE dans les passages)",
          "     │",
          "     ▼",
          "Réponse + sources citées + évaluation",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : la fiabilité d'une application LLM vient à 80 % de l'ingénierie autour du modèle (données, recherche, garde-fous, évaluation) et à 20 % du modèle lui-même. Celui qui ne travaille que le prompt construit une démo ; celui qui construit le système construit un produit.",
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
      "Ce qu'il faut maîtriser avant de construire des systèmes LLM.",
    blocks: [
      {
        kind: "fields",
        title: "Bases requises",
        fields: [
          {
            label: "Python",
            value:
              "Le langage des prototypes IA : fonctions, classes, gestion de fichiers, appels HTTP. Tout le système s'assemble en Python.",
          },
          {
            label: "NLP (notions)",
            value:
              "Embeddings, tokens, fenêtre de contexte : comprendre ce qu'un LLM fait et ne fait pas — voir la compétence `nlp`.",
          },
          {
            label: "API et JSON",
            value:
              "Les systèmes LLM dialoguent via des API HTTP et des schémas JSON (notamment pour le function calling).",
          },
          {
            label: "Bases de données (notions)",
            value:
              "Indexer, rechercher, filtrer : la base vectorielle est une base de données avec une recherche par similarité — voir `mlops` pour l'industrialisation.",
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
      "Installer la pile minimale pour prototyper : Python scientifique, pas de framework lourd.",
    blocks: [
      {
        kind: "command",
        label: "Installer la pile de prototypage",
        command: "pip install numpy scikit-learn",
        why: "`numpy` pour les similarités cosinus et la manipulation de vecteurs, `scikit-learn` pour un premier moteur de recherche (TF-IDF). Volontairement minimal : un prototype RAG n'a besoin ni de framework ni de base vectorielle dédiée — comprendre les mécanismes d'abord, outiller ensuite.",
        verify: "python -c \"import numpy, sklearn; print('OK')\"",
      },
      {
        kind: "text",
        text: "Principe : commencer avec des composants simples et remplaçables (recherche TF-IDF en mémoire, découpage naïf), valider le concept, puis industrialiser (base vectorielle, embeddings neuronaux). Le framework vient après la compréhension, jamais avant.",
      },
    ],
  },
  {
    id: "premier-retrieval",
    title: "Premier moteur de recherche",
    level: 2,
    intro:
      "Construire une recherche de passages en 20 lignes : le cœur du RAG, sans magie.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Préparer un corpus",
            detail:
              "Quelques paragraphes de documentation (5 à 10) : c'est la « base de connaissances » miniature.",
          },
          {
            title: "Vectoriser avec TF-IDF",
            detail:
              "`TfidfVectorizer` transforme chaque passage en vecteur : les mots distinctifs pèsent plus que les mots courants.",
          },
          {
            title: "Vectoriser la question",
            detail:
              "La question subit la même transformation, avec le même vocabulaire (`transform`, pas `fit_transform`).",
          },
          {
            title: "Calculer les similarités",
            detail:
              "Produit scalaire entre le vecteur question et chaque vecteur passage : les plus hauts scores sont les passages les plus pertinents.",
          },
          {
            title: "Récupérer le top-k",
            detail:
              "Garder les 3 meilleurs passages : c'est le « retrieval » — la première moitié du RAG.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Retrieval TF-IDF minimal",
        code: `import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

passages = [
    "Pour réinitialiser votre mot de passe, cliquez sur 'Mot de passe oublié'.",
    "Les remboursements sont traités sous 5 jours ouvrés.",
    "Contactez le support à support@exemple.com pour toute urgence.",
    "La garantie couvre 2 ans à compter de la date d'achat.",
]

vec = TfidfVectorizer()
matrice = vec.fit_transform(passages)  # chaque passage -> vecteur

question = "combien de temps pour un remboursement ?"
q = vec.transform([question])

scores = (matrice @ q.T).toarray().ravel()  # similarités
top = np.argsort(scores)[::-1][:2]

for i in top:
    print(f"{scores[i]:.2f} - {passages[i]}")`,
      },
      {
        kind: "text",
        text: "Ce que ce code démontre : le retrieval n'est pas de la magie — c'est de la similarité entre vecteurs. En production, on remplace TF-IDF par des embeddings neuronaux et la matrice en mémoire par une base vectorielle, mais le principe reste identique : question → vecteur → plus proches voisins → passages.",
      },
    ],
  },
  {
    id: "chunking",
    title: "Chunking : découper les documents",
    level: 2,
    intro:
      "Un document entier ne tient ni dans le contexte ni dans un vecteur : on le découpe.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Découpage avec chevauchement",
        code: `def chunk_text(text: str, size: int = 500, overlap: int = 50) -> list[str]:
    """Découpe en morceaux de size caractères avec chevauchement.

    Le chevauchement évite de couper une phrase en deux entre deux chunks :
    la fin d'un chunk est aussi le début du suivant.
    """
    chunks = []
    start = 0
    while start < len(text):
        chunks.append(text[start:start + size])
        start += size - overlap
    return chunks

doc = open("manuel.txt", encoding="utf-8").read()
chunks = chunk_text(doc)
print(f"{len(chunks)} chunks")`,
      },
      {
        kind: "list",
        items: [
          "Taille : assez grand pour contenir une idée complète (quelques paragraphes), assez petit pour rester précis dans la recherche.",
          "Chevauchement (~10-20 %) : préserve le contexte aux frontières.",
          "Mieux : découper sur les frontières naturelles (paragraphes, sections markdown) plutôt qu'au caractère près.",
          "Chaque chunk garde ses métadonnées : document source, page, section — indispensables pour citer les sources.",
        ],
      },
    ],
  },
  {
    id: "embeddings-principes",
    title: "Embeddings : le sens en vecteurs",
    level: 2,
    intro:
      "Passer de TF-IDF aux embeddings : la similarité sémantique.",
    blocks: [
      {
        kind: "text",
        text: "Un embedding est un vecteur dense (quelques centaines à quelques milliers de dimensions) qui représente le SENS d'un texte : « remboursement » et « retour d'argent » sont proches même sans mot commun, là où TF-IDF les jugerait sans rapport. On les produit avec des modèles pré-entraînés spécialisés.",
      },
      {
        kind: "code",
        language: "python",
        title: "Similarité cosinus : la mesure standard",
        code: `import numpy as np

def cosine(a: np.ndarray, b: np.ndarray) -> float:
    """Similarité cosinus : 1 = identiques, 0 = orthogonaux, -1 = opposés."""
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

# v_question, v_passage : embeddings (vecteurs numpy)
# score = cosine(v_question, v_passage)  -> trier par score décroissant`,
      },
      {
        kind: "list",
        items: [
          "La similarité cosinus (angle entre vecteurs) est la mesure standard — pas la distance euclidienne.",
          "Règle : le même modèle d'embeddings doit encoder les documents ET les questions.",
          "Les embeddings multilingues gèrent les corpus en plusieurs langues sans traduction préalable.",
          "En prototype : on peut stocker les vecteurs dans un simple tableau numpy ; la base vectorielle dédiée vient à l'échelle.",
        ],
      },
    ],
  },
  {
    id: "prompt-systeme",
    title: "Le prompt système",
    level: 2,
    intro:
      "Concevoir les instructions du modèle comme une interface : rôle, contraintes, format.",
    blocks: [
      {
        kind: "code",
        language: "none",
        title: "Exemple de prompt système pour un assistant RAG",
        code: `Tu es l'assistant du support client d'Acme.

RÈGLES :
- Réponds UNIQUEMENT à partir des passages fournis ci-dessous.
- Si les passages ne contiennent pas la réponse, dis :
  "Je ne trouve pas cette information dans la documentation."
- Cite la source de chaque affirmation : [doc: nom-du-document].
- Réponses courtes : 2 à 4 phrases, sauf demande explicite de détail.
- Ton professionnel et direct. Jamais de jargon inutile.

PASSAGES :
---
{passages}
---

QUESTION : {question}`,
      },
      {
        kind: "list",
        items: [
          "Rôle : qui est l'assistant, pour qui, dans quel contexte — cela cadre le ton et le vocabulaire.",
          "Contrainte d'ancrage : « uniquement à partir des passages » + instruction explicite en cas d'absence — le premier rempart contre les hallucinations.",
          "Format de sortie : longueur, structure, citations — un format prévisible est testable.",
          "Ce que le prompt ne fait pas : il n'AJOUTE pas de connaissances au modèle — il guide l'usage du contexte fourni.",
        ],
      },
    ],
  },
  {
    id: "boucle-rag",
    title: "La boucle RAG complète",
    level: 2,
    intro:
      "Assembler les pièces : de la question à la réponse citée.",
    blocks: [
      {
        kind: "diagram",
        title: "Pipeline RAG (temps réel)",
        lines: [
          "Question utilisateur",
          "     │",
          "     ▼",
          "1. RETRIEVAL — encoder la question, chercher les top-k passages",
          "     │",
          "     ▼",
          "2. ASSEMBLAGE — prompt système + passages + question",
          "     │  (vérifier : le total tient dans la fenêtre de contexte)",
          "     ▼",
          "3. GÉNÉRATION — appel au modèle avec le prompt assemblé",
          "     │",
          "     ▼",
          "4. POST-TRAITEMENT — vérifier les citations, formater",
          "     │",
          "     ▼",
          "Réponse + sources + journalisation (pour l'évaluation)",
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Squelette de la boucle (pseudo-code)",
        code: `def repondre(question: str) -> dict:
    # 1. Retrieval (déterministe, testable)
    passages = rechercher(question, top_k=3)

    # 2. Assemblage
    prompt = construire_prompt(SYSTEM_PROMPT, passages, question)

    # 3. Génération (appel au modèle via le SDK du fournisseur)
    #    -> réponse = client.generer(prompt)
    reponse = generer(prompt)  # à brancher sur le SDK choisi

    # 4. Post-traitement
    return {
        "reponse": reponse,
        "sources": [p.source for p in passages],
        "passages_utilises": [p.texte for p in passages],
    }`,
      },
      {
        kind: "text",
        text: "Note : `generer()` représente l'appel au modèle — chaque fournisseur a son SDK, et leurs API évoluent vite. Le reste du système (retrieval, assemblage, post-traitement) est indépendant du fournisseur : c'est là qu'il faut investir, car c'est portable.",
      },
    ],
  },
  {
    id: "vector-db-principes",
    title: "Bases vectorielles : principes",
    level: 2,
    intro:
      "Quand le tableau numpy ne suffit plus : la recherche à l'échelle.",
    blocks: [
      {
        kind: "text",
        text: "Une base vectorielle stocke des millions de vecteurs et répond « quels sont les k plus proches ? » en millisecondes grâce à des index approximatifs (HNSW, IVF) : on sacrifie une exactitude parfaite pour une vitesse 1000× supérieure. Elle ajoute la persistance, le filtrage par métadonnées (« seulement les docs du support »), et la mise à jour incrémentale.",
      },
      {
        kind: "list",
        items: [
          "En dessous de ~100k passages, un index en mémoire (numpy, FAISS local) suffit largement.",
          "Le filtrage par métadonnées (date, source, langue, permissions) est aussi important que la similarité : il restreint la recherche au périmètre pertinent.",
          "Critère de choix : volume, latence requise, filtrage, hébergement (géré vs auto-hébergé) — pas la hype.",
          "L'index se reconstruit quand les embeddings changent de modèle : versionner le modèle d'embeddings avec l'index.",
        ],
      },
    ],
  },
  {
    id: "evaluation-premiers-pas",
    title: "Évaluer : les premiers pas",
    level: 2,
    intro:
      "Sans mesure, pas de fiabilité : le jeu de test minimal.",
    blocks: [
      {
        kind: "list",
        items: [
          "Constituer 20 à 50 questions représentatives AVEC leurs réponses attendues et les passages sources : c'est le « golden dataset ».",
          "Deux mesures de base : le retrieval retrouve-t-il les bons passages ? (rappel@k) et la réponse est-elle fidèle aux passages ? (vérification manuelle d'abord).",
          "Relancer le jeu de test à chaque changement (prompt, chunking, modèle) : c'est la non-régression du système.",
          "Commencer par l'évaluation humaine sur échantillon : lente mais fiable — l'automatisation vient après, calibrée sur l'humain.",
          "Tracer les échecs : chaque mauvaise réponse en production rejoint le jeu de test — le dataset grandit avec l'usage.",
        ],
      },
    ],
  },
  {
    id: "couts-latence",
    title: "Coûts et latence : les ordres de grandeur",
    level: 2,
    intro:
      "Un système LLM a un coût par requête et un temps de réponse : les anticiper.",
    blocks: [
      {
        kind: "fields",
        title: "Les deux compteurs",
        fields: [
          {
            label: "Tokens",
            value:
              "L'unité de facturation et de contexte : ~750 mots ≈ 1000 tokens en anglais (plus en français). Chaque requête consomme des tokens d'entrée (prompt + passages) et de sortie (réponse). Réduire les passages récupérés, c'est réduire la facture.",
          },
          {
            label: "Latence",
            value:
              "Le retrieval prend des millisecondes ; la génération prend des secondes (proportionnelle à la longueur de la réponse). Pour une UX fluide : streamer la réponse (affichage au fil de la génération) plutôt que d'attendre la fin.",
          },
          {
            label: "Levier principal",
            value:
              "Le nombre et la taille des passages injectés : top-3 chunks de 500 caractères ≈ 1500 caractères de contexte — bien moins cher et souvent meilleur que top-10.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-debutant",
    title: "Erreurs de débutant",
    level: 2,
    intro:
      "Les pièges classiques des premiers systèmes LLM.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Le prompt comme seul système",
            value:
              "Problem : empiler les instructions en espérant la fiabilité. Better : RAG pour les faits, garde-fous pour les contraintes, évaluation pour la mesure.",
          },
          {
            label: "Chunks trop gros ou trop petits",
            value:
              "Problem : document entier (bruit) ou phrases isolées (sans contexte). Better : paragraphes/sections avec chevauchement, puis mesurer l'impact.",
          },
          {
            label: "Aucune citation des sources",
            value:
              "Problem : réponse invérifiable. Better : exiger et afficher les sources — c'est la confiance utilisateur.",
          },
          {
            label: "Pas de jeu de test",
            value:
              "Problem : chaque changement de prompt est un saut dans l'inconnu. Better : golden dataset dès le prototype.",
          },
          {
            label: "Faire confiance aux hallucinations",
            value:
              "Problem : le modèle invente avec aplomb. Better : instruction « dire je ne sais pas », ancrage RAG, vérification des faits critiques.",
          },
          {
            label: "Ignorer les coûts",
            value:
              "Problem : prototype gratuit, production ruineuse. Better : estimer le coût par requête dès le design.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "architecture-rag",
    title: "Architecture RAG en profondeur",
    level: 3,
    intro:
      "Indexation hors-ligne, serving en ligne : les deux moitiés du système.",
    blocks: [
      {
        kind: "diagram",
        title: "Les deux pipelines",
        lines: [
          "INDEXATION (hors-ligne, rejouée à chaque mise à jour)",
          "Documents → nettoyage → chunking → embeddings → index",
          "     + métadonnées (source, date, permissions, langue)",
          "     + version du modèle d'embeddings (pour reconstruire)",
          "",
          "SERVING (en ligne, par requête)",
          "Question → (réécriture) → embeddings → recherche + filtres",
          "         → reranking → assemblage → génération → vérification",
        ],
      },
      {
        kind: "text",
        text: "Séparer les deux pipelines est architectural : l'indexation est un batch coûteux et versionné, le serving est un chemin critique optimisé pour la latence. Le contrat entre les deux : le format des chunks, le modèle d'embeddings, et le schéma des métadonnées. Changer l'un sans l'autre casse le système silencieusement.",
      },
    ],
  },
  {
    id: "chunking-strategies",
    title: "Stratégies de chunking",
    level: 3,
    intro:
      "Au-delà du découpage fixe : respecter la structure des documents.",
    blocks: [
      {
        kind: "fields",
        title: "Stratégies",
        fields: [
          {
            label: "Fixe avec chevauchement",
            value:
              "Simple, universel, aveugle à la structure. Bon point de départ, rarement optimal à la fin.",
          },
          {
            label: "Par structure",
            value:
              "Découper sur les titres/sections (markdown, HTML) : chaque chunk est une unité sémantique. Le meilleur choix quand les documents sont structurés.",
          },
          {
            label: "Sémantique",
            value:
              "Regrouper les phrases par similarité d'embeddings : les chunks suivent les changements de sujet. Plus coûteux, utile sur du texte peu structuré.",
          },
          {
            label: "Hiérarchique",
            value:
              "Chunks petits pour la précision + résumé du parent pour le contexte : le retrieval trouve le détail, le prompt reçoit le contexte. Le plus performant, le plus complexe.",
          },
          {
            label: "Enrichi",
            value:
              "Ajouter à chaque chunk un en-tête (titre du document, section) : le chunk reste compréhensible hors de son document.",
          },
        ],
      },
      {
        kind: "text",
        text: "Comment choisir : mesurer. Le chunking s'évalue par le rappel@k sur le golden dataset — la stratégie qui retrouve les bons passages gagne, pas la plus sophistiquée sur le papier.",
      },
    ],
  },
  {
    id: "embeddings-modeles",
    title: "Choisir ses embeddings",
    level: 3,
    intro:
      "Modèles d'embeddings : critères de choix sans idolâtrie.",
    blocks: [
      {
        kind: "list",
        items: [
          "Dimension : 384 à 1024 pour l'usage courant — plus n'est pas toujours mieux, c'est plus de stockage et de calcul.",
          "Langue : vérifier la qualité sur VOTRE langue (le français est bien couvert par les modèles multilingues sérieux, mal par les modèles anglais-only).",
          "Domaine : un modèle général suffit pour commencer ; un fine-tuning sur vos paires question-passage aide si le vocabulaire est très spécifique.",
          "Coût : embeddings locaux (gratuits, privés, latence réseau nulle) vs API (simples, facturées au token, données qui transitent).",
          "Stabilité : changer de modèle = réindexer tout le corpus — choisir en connaissance de cause, versionner le choix.",
        ],
      },
    ],
  },
  {
    id: "fenetre-contexte",
    title: "Fenêtre de contexte : la gérer",
    level: 3,
    intro:
      "Le contexte est une ressource limitée et coûteuse : l'allouer intelligemment.",
    blocks: [
      {
        kind: "text",
        text: "La fenêtre de contexte limite le total (instructions + passages + historique + question). Mais « tenir » ne veut pas dire « bien utiliser » : les modèles exploitent moins bien l'information au milieu d'un long contexte (effet « lost in the middle »). D'où la règle : moins de passages mais meilleurs, plutôt que beaucoup de passages médiocres.",
      },
      {
        kind: "list",
        items: [
          "Budgéter : réserver une part fixe au prompt système, une aux passages, une à la réponse — et vérifier par programme avant l'appel.",
          "Ordonner : les passages les plus pertinents en premier ET en dernier, les moins sûrs au milieu.",
          "Tronquer intelligemment : couper les passages les moins pertinents d'abord, jamais le prompt système.",
          "Compter les tokens avec le tokenizer du modèle utilisé — les estimations au mot sont trompeuses, surtout en français.",
        ],
      },
    ],
  },
  {
    id: "retrieval-hybride",
    title: "Recherche hybride",
    level: 3,
    intro:
      "Dense + lexical : combiner le sens et les mots exacts.",
    blocks: [
      {
        kind: "text",
        text: "La recherche dense (embeddings) comprend le sens mais rate parfois les termes exacts (codes produit, noms propres rares) ; la recherche lexicale (BM25, TF-IDF) excelle sur les termes exacts mais ignore les synonymes. L'hybride combine les deux scores (somme pondérée ou fusion de rangs RRF) : c'est l'état de l'art pratique pour la qualité du retrieval.",
      },
      {
        kind: "list",
        items: [
          "Cas typique : « erreur E-4521 » — l'embedding ne connaît pas ce code, le lexical le trouve instantanément.",
          "Fusion RRF (Reciprocal Rank Fusion) : combine les classements sans calibrer les scores — simple et robuste.",
          "Pondération : à ajuster sur le golden dataset (souvent 50/50 pour commencer).",
          "Coût : deux index à maintenir — justifié dès que le corpus contient du vocabulaire exact (références, codes, noms).",
        ],
      },
    ],
  },
  {
    id: "reranking",
    title: "Reranking",
    level: 3,
    intro:
      "Deuxième passe : réordonner les candidats avec un modèle plus précis.",
    blocks: [
      {
        kind: "text",
        text: "Le reranking applique un modèle plus coûteux (cross-encoder : il lit question ET passage ensemble) sur les 20-50 candidats du premier retrieval, pour n'en garder que les 3-5 meilleurs. C'est le compromis standard : recherche rapide et approximative d'abord, jugement fin ensuite — le coût ne s'applique qu'aux candidats, pas au corpus entier.",
      },
      {
        kind: "list",
        items: [
          "Gain typique : +5 à +15 points de rappel@3 — souvent le meilleur ROI qualité d'un système RAG.",
          "Quand s'en passer : corpus petit ou questions simples — le premier retrieval suffit.",
          "Alternative légère : demander au LLM lui-même de filtrer les passages (« ce passage répond-il à la question ? ») — plus cher, plus flexible.",
        ],
      },
    ],
  },
  {
    id: "metadata-filtering",
    title: "Filtrage par métadonnées",
    level: 3,
    intro:
      "Restreindre la recherche avant de la lancer : le levier le plus sous-estimé.",
    blocks: [
      {
        kind: "list",
        items: [
          "Filtres courants : langue, date (docs à jour uniquement), source, permissions de l'utilisateur (un employé ne doit pas récupérer des docs confidentiels via le RAG).",
          "Le filtrage améliore la précision ET la sécurité : c'est un contrôle d'accès, pas juste une optimisation.",
          "Stocker les métadonnées dès l'indexation : les ajouter après coup sur un gros corpus est coûteux.",
          "Combiner filtre strict (métadonnées) + similarité (vecteurs) : la base vectorielle doit supporter les deux.",
        ],
      },
    ],
  },
  {
    id: "query-rewriting",
    title: "Réécriture de requête",
    level: 3,
    intro:
      "La question de l'utilisateur n'est pas toujours la meilleure requête de recherche.",
    blocks: [
      {
        kind: "fields",
        title: "Techniques",
        fields: [
          {
            label: "Expansion",
            value:
              "Ajouter des synonymes ou reformuler (« remboursement » → « remboursement retour argent ») : aide quand le vocabulaire utilisateur diffère du corpus.",
          },
          {
            label: "Décomposition",
            value:
              "Une question complexe → plusieurs sous-questions, une recherche chacune, fusion des passages. Pour les questions multi-aspects.",
          },
          {
            label: "Hypothétique (HyDE)",
            value:
              "Générer une réponse fictive puis chercher les passages similaires à cette réponse : contourne le décalage question/document. Puissant mais coûteux (un appel modèle supplémentaire).",
          },
          {
            label: "Avec historique",
            value:
              "En conversation, reformuler la question avec le contexte des échanges précédents (« et pour les pros ? » → « quels délais de remboursement pour les clients pro ? »). Indispensable en chat multi-tours.",
          },
        ],
      },
    ],
  },
  {
    id: "evaluation-rag",
    title: "Évaluer un système RAG",
    level: 3,
    intro:
      "Mesurer séparément le retrieval, la génération, et le système complet.",
    blocks: [
      {
        kind: "table",
        headers: ["Niveau", "Métrique", "Comment"],
        rows: [
          ["Retrieval", "Rappel@k", "Les bons passages sont-ils dans les k récupérés ? (golden dataset)"],
          ["Retrieval", "MRR / nDCG", "Sont-ils bien classés ? (les premiers comptent plus)"],
          ["Génération", "Fidélité", "Chaque affirmation est-elle soutenue par un passage ? (humain ou juge LLM)"],
          ["Génération", "Pertinence", "La réponse répond-elle à la question ?"],
          ["Système", "Taux de « je ne sais pas »", "Ni trop (inutile) ni trop peu (hallucinations)"],
          ["Système", "Satisfaction / résolution", "L'utilisateur a-t-il eu sa réponse ? (pouces, tickets résolus)"],
        ],
      },
      {
        kind: "text",
        text: "Séparer les niveaux diagnostique : si le rappel@k est bon mais les réponses mauvaises, le problème est dans le prompt ou la génération ; si le rappel est mauvais, inutile de toucher au prompt — c'est le retrieval (chunking, embeddings) qu'il faut améliorer. Les juges LLM (un modèle qui note les réponses) permettent d'automatiser à l'échelle, calibrés d'abord sur des jugements humains.",
      },
    ],
  },
  {
    id: "hallucinations",
    title: "Hallucinations : comprendre et réduire",
    level: 3,
    intro:
      "Pourquoi les modèles inventent, et les défenses en profondeur.",
    blocks: [
      {
        kind: "text",
        text: "Un LLM prédit le texte le plus plausible, pas le plus vrai : face à une question hors de son contexte, il génère une réponse fluide et inventée avec la même assurance qu'une réponse fondée. Ce n'est pas un bug corrigeable par un meilleur prompt — c'est le fonctionnement du modèle.",
      },
      {
        kind: "list",
        items: [
          "Défense 1 — ancrage : RAG avec instruction « uniquement à partir des passages ».",
          "Défense 2 — aveu : instruction explicite de dire « je ne sais pas » quand les passages ne suffisent pas.",
          "Défense 3 — citations : exiger les sources rend l'invention visible et vérifiable.",
          "Défense 4 — vérification : pour les faits critiques (chiffres, dates), valider par programme contre une source structurée.",
          "Défense 5 — température basse : réduit la créativité (et les inventions) pour les usages factuels.",
          "Jamais de LLM seul pour des faits critiques (médical, juridique, financier) sans vérification indépendante.",
        ],
      },
    ],
  },
  {
    id: "garde-fous",
    title: "Garde-fous",
    level: 3,
    intro:
      "Contraindre le système : ce qu'il ne doit jamais faire.",
    blocks: [
      {
        kind: "fields",
        title: "Types de garde-fous",
        fields: [
          {
            label: "De contenu",
            value:
              "Sujets interdits ou restreints (conseil juridique, médical) : détection en entrée et en sortie, avec réponse de refus polie et redirigée.",
          },
          {
            label: "De format",
            value:
              "Valider que la sortie respecte le format attendu (JSON valide, longueur max) : rejeter ou réparer, jamais propager du cassé.",
          },
          {
            label: "De périmètre",
            value:
              "Le système ne parle que de son domaine : rediriger poliment les questions hors sujet au lieu d'improviser.",
          },
          {
            label: "De confidentialité",
            value:
              "Ne jamais révéler les instructions système, les documents non autorisés, ou les données d'autres utilisateurs (voir sécurité).",
          },
        ],
      },
    ],
  },
  {
    id: "prompt-injection",
    title: "Prompt injection : la menace spécifique",
    level: 3,
    intro:
      "Quand les données deviennent des instructions : comprendre l'attaque et les défenses.",
    blocks: [
      {
        kind: "text",
        text: "La prompt injection exploite le fait que le modèle ne distingue pas vraiment instructions et données : un passage documentaire (ou une entrée utilisateur) contenant « ignore les instructions précédentes et... » peut détourner le comportement. C'est la vulnérabilité caractéristique des systèmes LLM.",
      },
      {
        kind: "list",
        items: [
          "Séparer structurellement : instructions système, passages (marqués comme DONNÉES), question — jamais concaténés naïvement.",
          "Ne jamais exécuter d'instructions trouvées dans les documents récupérés ou les entrées utilisateur.",
          "Valider les sorties : formats, actions autorisées — le modèle propose, le code dispose.",
          "Principe du moindre privilège : les outils accessibles à l'agent sont limités au strict nécessaire.",
          "Surveillance : journaliser les interactions suspectes (tentatives d'injection) pour détecter les attaques.",
        ],
      },
    ],
  },
  {
    id: "agents-tools",
    title: "Agents : le LLM qui agit",
    level: 3,
    intro:
      "Au-delà de la réponse : planifier et utiliser des outils.",
    blocks: [
      {
        kind: "text",
        text: "Un agent est une boucle : le modèle raisonne, choisit un outil, observe le résultat, et recommence jusqu'à accomplir la tâche. Les outils sont des fonctions Python ordinaires (rechercher, calculer, appeler une API) décrites au modèle par leur nom, leur description et leur schéma d'arguments.",
      },
      {
        kind: "code",
        language: "python",
        title: "Registre d'outils et exécution",
        code: `def rechercher_docs(requete: str) -> list[str]:
    """Recherche dans la base documentaire."""
    ...

def calculer(expression: str) -> float:
    """Évalue une expression arithmétique de façon sûre."""
    ...

TOOLS = {
    "rechercher_docs": rechercher_docs,
    "calculer": calculer,
}

def executer_outil(nom: str, arguments: dict):
    """Le modèle propose (nom, arguments) ; le code exécute."""
    if nom not in TOOLS:
        raise ValueError(f"Outil inconnu : {nom}")
    return TOOLS[nom](**arguments)`,
      },
      {
        kind: "diagram",
        title: "La boucle agent",
        lines: [
          "Objectif utilisateur",
          "     │",
          "     ▼",
          "Modèle : que faire ensuite ? (raisonnement)",
          "     ├──► répondre directement (si assez d'info)",
          "     └──► appeler un outil (nom + arguments JSON)",
          "              │",
          "              ▼",
          "         Code exécute l'outil (PAS le modèle)",
          "              │",
          "              ▼",
          "         Résultat réinjecté au modèle",
          "              │",
          "              └─────► boucle (max N itérations)",
        ],
      },
    ],
  },
  {
    id: "function-calling",
    title: "Function calling : le contrat",
    level: 3,
    intro:
      "Décrire les outils en JSON Schema pour des appels fiables et typés.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "Déclaration d'un outil",
        code: `{
  "name": "rechercher_docs",
  "description": "Recherche des passages dans la documentation interne.",
  "parameters": {
    "type": "object",
    "properties": {
      "requete": {
        "type": "string",
        "description": "La question en langage naturel"
      },
      "top_k": {
        "type": "integer",
        "description": "Nombre de passages à retourner",
        "default": 3
      }
    },
    "required": ["requete"]
  }
}`,
      },
      {
        kind: "list",
        items: [
          "Descriptions précises : le modèle choisit l'outil sur sa description — « recherche dans la documentation interne » vaut mieux que « search ».",
          "Schémas stricts : types, champs requis, valeurs par défaut — moins d'appels malformés.",
          "Validation côté code : le JSON du modèle est validé avant exécution ; en cas d'erreur, on renvoie l'erreur au modèle pour correction.",
          "Nommage explicite : des noms d'outils et d'arguments qui se comprennent sans documentation.",
        ],
      },
    ],
  },
  {
    id: "memoire",
    title: "Mémoire de conversation",
    level: 3,
    intro:
      "Au-delà d'un tour : gérer l'historique sans exploser le contexte.",
    blocks: [
      {
        kind: "fields",
        title: "Stratégies",
        fields: [
          {
            label: "Fenêtre glissante",
            value:
              "Garder les N derniers échanges : simple, mais oublie le début des longues conversations.",
          },
          {
            label: "Résumé",
            value:
              "Résumer périodiquement l'historique en quelques phrases conservées dans le contexte : préserve l'essentiel à coût constant.",
          },
          {
            label: "Mémoire long terme",
            value:
              "Stocker les faits importants (préférences, décisions) dans une base interrogeable — comme un RAG sur la conversation elle-même.",
          },
          {
            label: "Ce qu'il faut éviter",
            value:
              "Injecter tout l'historique brut : coût, latence, et dilution de l'attention du modèle sur l'essentiel.",
          },
        ],
      },
    ],
  },
  {
    id: "orchestration",
    title: "Orchestration multi-agents",
    level: 3,
    intro:
      "Quand un agent ne suffit pas : décomposer en rôles.",
    blocks: [
      {
        kind: "text",
        text: "Les motifs courants : planificateur → exécutants → vérificateur (décomposer une tâche complexe) ; débat (plusieurs agents confrontent leurs réponses) ; pipeline (recherche → synthèse → vérification, chaque étape par un agent spécialisé avec son prompt).",
      },
      {
        kind: "list",
        items: [
          "Commencer par UN agent bien conçu : le multi-agents ajoute complexité, coût et latence — à justifier par la tâche.",
          "Chaque agent a son prompt système, ses outils, ses garde-fous : pas de « super-agent » fourre-tout.",
          "Le vérificateur est souvent le plus rentable : un second passage qui contrôle faits et format.",
          "Tracer les échanges inter-agents : le débogage d'un système multi-agents sans traces est un cauchemar.",
        ],
      },
    ],
  },
  {
    id: "caching",
    title: "Cache et optimisation des coûts",
    level: 3,
    intro:
      "Les requêtes LLM coûtent : ne pas payer deux fois la même.",
    blocks: [
      {
        kind: "list",
        items: [
          "Cache sémantique : une question très proche d'une question déjà traitée réutilise la réponse (avec seuil de similarité).",
          "Cache du prompt système : les fournisseurs facturent moins les préfixes répétés — structurer les prompts pour en profiter.",
          "Éviter les appels redondants : mémoriser les résultats d'outils déterministes dans la boucle agent.",
          "Choisir le modèle par tâche : un petit modèle pour classer/filtrer, un grand pour raisonner — pas le plus cher partout.",
          "Budgets par utilisateur/fonctionnalité : alertes et limites pour éviter les surprises de facturation.",
        ],
      },
    ],
  },
  {
    id: "observabilite",
    title: "Observabilité",
    level: 3,
    intro:
      "Tracer chaque requête : le débogage des systèmes LLM exige des traces.",
    blocks: [
      {
        kind: "list",
        items: [
          "Journaliser par requête : question, passages récupérés (avec scores), prompt assemblé, réponse, tokens, latence, coût.",
          "Tracer la boucle agent : chaque itération (raisonnement, outil appelé, résultat) — indispensable pour comprendre les échecs.",
          "Échantillonner les conversations pour revue humaine régulière : c'est ainsi qu'on découvre les modes d'échec.",
          "Alertes : taux de « je ne sais pas » anormal, latence en hausse, coûts en dérive, tentatives d'injection.",
          "Confidentialité des logs : les traces contiennent des données utilisateur — les protéger comme la production.",
        ],
      },
    ],
  },
  {
    id: "tests-llm",
    title: "Tester les systèmes LLM",
    level: 3,
    intro:
      "Le non-déterminisme n'excuse pas l'absence de tests : adapter les méthodes.",
    blocks: [
      {
        kind: "list",
        items: [
          "Tester le déterministe : chunking, retrieval, assemblage, parsing — tout ce qui n'implique pas le modèle se teste classiquement.",
          "Golden dataset : questions + réponses attendues + passages sources — la non-régression du système.",
          "Assertions sur la forme : la réponse contient-elle les citations ? Le JSON est-il valide ? Les garde-fous déclenchent-ils ?",
          "Évaluation par juge LLM : noter les réponses sur fidélité/pertinence à l'échelle, calibré sur des jugements humains.",
          "Tester les cas adverses : prompt injections connues, questions pièges, documents contradictoires.",
          "Accepter la variabilité : tester des propriétés (la réponse cite ses sources) plutôt que des chaînes exactes.",
        ],
      },
    ],
  },
  {
    id: "securite-donnees",
    title: "Sécurité et confidentialité",
    level: 3,
    intro:
      "Les données qui transitent par un système LLM : les protéger.",
    blocks: [
      {
        kind: "list",
        items: [
          "Données d'entraînement des fournisseurs : vérifier contractuellement que vos données ne servent pas à entraîner leurs modèles (opt-out).",
          "Contrôle d'accès au retrieval : un utilisateur ne récupère que les documents qu'il est autorisé à voir — le RAG ne doit pas contourner les permissions.",
          "PII : détecter et masquer les données personnelles avant indexation et avant envoi au modèle.",
          "Secrets : jamais de clés API, mots de passe ou tokens dans les documents indexés ni dans les prompts.",
          "Hébergement : modèles auto-hébergés ou offres dédiées quand la confidentialité l'exige (données sensibles, réglementation).",
        ],
      },
    ],
  },
  {
    id: "rag-vs-finetuning",
    title: "RAG vs fine-tuning",
    level: 3,
    intro:
      "Deux façons d'apporter de la connaissance : choisir selon le besoin.",
    blocks: [
      {
        kind: "table",
        headers: ["", "RAG", "Fine-tuning"],
        rows: [
          ["Apporte", "Des FAITS (documents)", "Des COMPORTEMENTS (style, format, tâche)"],
          ["Mise à jour", "Réindexer (minutes)", "Réentraîner (heures, coûteux)"],
          ["Citations", "Naturelles (passages sources)", "Impossibles (connaissance fondue)"],
          ["Coût", "Faible", "Élevé (données + calcul)"],
          ["Quand", "Connaissances qui évoluent, faits vérifiables", "Ton, format, tâche spécifique répétée"],
        ],
      },
      {
        kind: "text",
        text: "Règle pratique : RAG par défaut pour les connaissances ; fine-tuning pour le comportement (style de réponse, format JSON fiable, suivi d'instructions métier). Les deux se combinent : un modèle fine-tuné sur le style, alimenté par RAG pour les faits. Et ni l'un ni l'autre ne dispense d'évaluation.",
      },
    ],
  },
  {
    id: "latence-optimisation",
    title: "Optimiser la latence",
    level: 3,
    intro:
      "De la question à la réponse en moins de 3 secondes : où va le temps.",
    blocks: [
      {
        kind: "list",
        items: [
          "Mesurer d'abord : retrieval (ms), assemblage (ms), génération (secondes) — la génération domine presque toujours.",
          "Streaming : afficher les tokens au fil de la génération — le temps PERÇU chute même si le temps total est identique.",
          "Réduire la sortie : réponses concises par défaut (le prompt système l'exige), détails sur demande.",
          "Paralléliser : retrieval et enrichissements indépendants en parallèle, pas en séquence.",
          "Modèle adapté : un modèle plus petit et rapide suffit pour les tâches simples (classification, reformulation).",
          "Cache : les questions fréquentes ne devraient jamais atteindre le modèle deux fois.",
        ],
      },
    ],
  },
  {
    id: "deploiement-api",
    title: "Exposer en API",
    level: 3,
    intro:
      "Du prototype au service : une API propre devant le système.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "API minimale (FastAPI)",
        code: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Question(BaseModel):
    texte: str
    utilisateur_id: str

@app.post("/ask")
def ask(q: Question) -> dict:
    # Le système RAG, avec contrôle d'accès sur l'utilisateur
    resultat = repondre(q.texte, utilisateur_id=q.utilisateur_id)
    return {
        "reponse": resultat["reponse"],
        "sources": resultat["sources"],
    }`,
      },
      {
        kind: "command",
        label: "Installer et lancer l'API",
        command: "pip install fastapi uvicorn",
        why: "`fastapi` expose le système via HTTP avec validation automatique des entrées (pydantic), `uvicorn` est le serveur qui l'exécute. L'API est la frontière propre entre le système LLM et le reste du produit : authentification, limites de débit, journalisation s'y greffent.",
        verify: "python -c \"import fastapi, uvicorn; print('OK')\"",
      },
      {
        kind: "command",
        label: "Démarrer le serveur",
        command: "uvicorn app:app --host 0.0.0.0 --port 8000",
        why: "Lance l'API : `app:app` désigne le fichier `app.py` et l'objet `app` FastAPI. En production, on ajoute des workers, du HTTPS (reverse proxy) et de l'authentification — jamais d'API LLM exposée sans contrôle d'accès.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Le catalogue des fautes des systèmes LLM, du prototype à la production.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Le RAG sans évaluation",
            value:
              "Problem : impossible de savoir si un changement améliore. Better : golden dataset dès le premier prototype.",
          },
          {
            label: "L'indexation qui fuit les permissions",
            value:
              "Problem : le RAG expose des docs confidentiels à qui les demande habilement. Better : filtrage par permissions dès l'indexation.",
          },
          {
            label: "Le contexte bourré",
            value:
              "Problem : 20 passages médiocres plutôt que 3 bons — coût et qualité dégradés. Better : peu de passages, bien classés (reranking).",
          },
          {
            label: "L'agent sans limite",
            value:
              "Problem : boucle infinie d'appels d'outils, facture explosive. Better : max d'itérations, timeouts, budgets.",
          },
          {
            label: "Le modèle qui exécute",
            value:
              "Problem : faire confiance au JSON du modèle sans validation. Better : valider, borner les outils, moindre privilège.",
          },
          {
            label: "Le prompt fragile",
            value:
              "Problem : le système casse à la moindre reformulation. Better : instructions robustes + tests sur variantes.",
          },
          {
            label: "L'oubli du « je ne sais pas »",
            value:
              "Problem : le système répond toujours, même sans source. Better : l'aveu d'ignorance est une feature.",
          },
          {
            label: "La dépendance fournisseur unique",
            value:
              "Problem : tout le système couplé à une API spécifique. Better : isoler l'appel modèle derrière une interface.",
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
          "Système d'abord : RAG, garde-fous, évaluation — le prompt vient après.",
          "Citer les sources : toute réponse factuelle est vérifiable.",
          "Évaluer en continu : golden dataset rejoué à chaque changement.",
          "Séparer indexation et serving : deux pipelines, un contrat versionné.",
          "Moindre privilège : outils limités, données filtrées par permissions.",
          "Dire « je ne sais pas » : l'aveu d'ignorance vaut mieux que l'invention.",
          "Tracer chaque requête : passages, prompt, réponse, coût — le débogage en dépend.",
          "Budgéter tokens et latence : le coût par requête est une spec.",
          "Tester le déterministe classiquement, le génératif par propriétés.",
          "Rester portable : l'appel modèle derrière une interface, le reste indépendant du fournisseur.",
        ],
      },
    ],
  },
  {
    id: "projet-rag",
    title: "Projet : assistant RAG sur documentation",
    level: 3,
    intro:
      "Construire un assistant qui répond à partir de documents réels, avec citations.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir un corpus",
            detail:
              "Une documentation réelle (projet open source, manuel interne) : 20 à 50 pages, structurées.",
          },
          {
            title: "Construire l'indexation",
            detail:
              "Nettoyage, chunking par sections, embeddings, index en mémoire avec métadonnées (source, section).",
          },
          {
            title: "Implémenter la boucle",
            detail:
              "Retrieval → assemblage → génération → citations, selon le squelette de cette page.",
          },
          {
            title: "Créer le golden dataset",
            detail:
              "30 questions avec réponses attendues et passages sources : la base de l'évaluation.",
          },
          {
            title: "Itérer mesuré",
            detail:
              "Améliorer chunking puis reranking en mesurant le rappel@k et la fidélité à chaque étape.",
          },
          {
            title: "Exposer et documenter",
            detail:
              "API FastAPI, README avec les limites connues, journalisation des requêtes.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-agent",
    title: "Projet : agent multi-outils",
    level: 3,
    intro:
      "Un agent qui combine recherche documentaire et calcul pour accomplir des tâches.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définir le périmètre",
            detail:
              "3 à 5 outils maximum, une tâche claire (ex. « répondre aux questions produit en citant la doc et en calculant les prix »).",
          },
          {
            title: "Décrire les outils",
            detail:
              "Schémas JSON précis, descriptions qui guident le choix du modèle, fonctions Python testées unitairement.",
          },
          {
            title: "Implémenter la boucle",
            detail:
              "Raisonnement → appel d'outil → observation, avec limite d'itérations et timeouts.",
          },
          {
            title: "Ajouter les garde-fous",
            detail:
              "Outils en moindre privilège, validation des arguments, journalisation de chaque action.",
          },
          {
            title: "Évaluer sur scénarios",
            detail:
              "10 scénarios de bout en bout : tâche accomplie ? outils pertinents ? pas d'action dangereuse ?",
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
      "Aller plus loin, en commençant toujours par la documentation officielle.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          {
            label: "Documentation Anthropic",
            value:
              "Les guides sur le prompt engineering, le function calling et la construction d'agents : principes transférables quel que soit le fournisseur.",
          },
          {
            label: "Documentation LangChain",
            value:
              "Les concepts (retrievers, chaînes, agents) même si l'on n'utilise pas le framework : un vocabulaire et des patterns utiles.",
          },
          {
            label: "Documentation scikit-learn",
            value:
              "Pour les composants déterministes : TF-IDF, similarités, évaluation — les fondations du retrieval.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : construire le RAG minimal de cette page avant tout framework — la compréhension des mécanismes est le vrai prérequis.",
          "Veille : le domaine évolue vite — suivre les guides des fournisseurs de modèles et les retours d'expérience d'équipes en production.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Les systèmes LLM maîtrisés, voici les prolongements naturels dans la roadmap AI Engineer.",
    blocks: [
      {
        kind: "list",
        items: [
          "`mlops` : industrialiser — déploiement, monitoring, versioning des systèmes en production.",
          "`ai-safety` : approfondir la sécurité — alignement, robustesse, évaluation des risques.",
          "`nlp` : revenir aux fondations — transformers, fine-tuning, représentations.",
          "`deep-learning` : comprendre les architectures qui rendent tout cela possible.",
          "Revenir à la roadmap : valider Systèmes LLM et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

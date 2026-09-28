import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du RAG (Retrieval-Augmented Generation) : de zéro
 * à un usage professionnel. 3 niveaux d'information (Aperçu / Pratique /
 * Approfondi) avec divulgation progressive. Tous les textes supportent le
 * code inline entre backticks. Cohérent avec le guide existant (embeddings,
 * bases vectorielles, chunking, recherche, évaluation, pipelines) et ses
 * prérequis (`llms`, `databases`).
 */
export const LEARNING_RAG: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est le RAG, quel problème il résout et pourquoi il est devenu standard.",
    blocks: [
      {
        kind: "text",
        text: "Le RAG (Retrieval-Augmented Generation) combine recherche d'information et génération de texte : avant de répondre, le système récupère les passages pertinents dans vos documents, puis le LLM formule sa réponse à partir de ces passages. La réponse est ancrée dans des sources réelles au lieu de la seule mémoire du modèle.",
      },
      {
        kind: "text",
        text: "Le problème résolu : un LLM seul ne connaît pas vos données privées (documentation interne, tickets, contrats) et invente parfois des réponses plausibles mais fausses (hallucinations). Réentraîner un modèle sur vos données coûte cher et fige le savoir. Le RAG contourne les deux : les documents restent dans une base interrogeable, le modèle les consulte à chaque question — les données peuvent changer sans réentraînement.",
      },
      {
        kind: "text",
        text: "Positionnement : le RAG est la technique standard pour brancher un LLM sur des données d'entreprise — assistants de documentation, support client, recherche interne. Il ne remplace ni le fine-tuning (adapter le comportement du modèle) ni les agents (enchaîner des actions) : il résout le problème précis de « répondre en s'appuyant sur nos documents ».",
      },
    ],
  },
  {
    id: "rag-carte-mentale",
    title: "La carte mentale du RAG",
    level: 1,
    intro:
      "Deux phases, un seul flux : indexer une fois, interroger à chaque question.",
    blocks: [
      {
        kind: "diagram",
        title: "De la question à la réponse sourcée",
        lines: [
          "PHASE 1 — INDEXATION (une fois)",
          "Documents ──▶ Découpage (chunks) ──▶ Embeddings",
          "                                              │",
          "                                              ▼",
          "                                     Base vectorielle",
          "                                              │",
          "PHASE 2 — REQUÊTE (à chaque question)         │",
          "Question ──▶ Embedding ──▶ Recherche ─────────┘",
          "                              │ (passages similaires)",
          "                              ▼",
          "                  Contexte + question ──▶ LLM ──▶ Réponse sourcée",
        ],
      },
      {
        kind: "text",
        text: "L'idée centrale : transformer le sens des textes en vecteurs (embeddings), puis retrouver par similarité mathématique les passages proches de la question. Le LLM ne répond jamais « de tête » : il reçoit les passages et doit s'y tenir. La qualité du système se joue surtout dans la phase 1 (chunking, embeddings) — bien plus que dans le choix du LLM.",
      },
      {
        kind: "list",
        items: [
          "Indexer = préparer le terrain ; interroger = récolter. Un mauvais découpage ne se rattrape pas.",
          "Le LLM est le dernier maillon : si les passages récupérés sont mauvais, la réponse le sera aussi.",
          "Évaluer = mesurer ce que le système récupère et ce qu'il affirme, séparément.",
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
      "Ce qu'il faut maîtriser avant le RAG, et pourquoi chaque prérequis compte.",
    blocks: [
      {
        kind: "fields",
        title: "Fondations requises",
        fields: [
          {
            label: "LLM (`llms`)",
            value:
              "Prompting, fenêtre de contexte, hallucinations, température. Le RAG orchestre un LLM : il faut comprendre ce qu'il fait bien et mal.",
          },
          {
            label: "Bases de données (`databases`)",
            value:
              "Stocker, indexer, interroger : les bases vectorielles en sont une extension. Sans cela, « index vectoriel » reste magique.",
          },
          {
            label: "Python",
            value:
              "Le langage de l'écosystème : `sentence-transformers`, clients de bases vectorielles, orchestration du pipeline.",
          },
          {
            label: "Notions d'algèbre linéaire",
            value:
              "Vecteurs et similarité cosinus : la « recherche sémantique » n'est qu'une mesure de proximité entre vecteurs.",
          },
          {
            label: "API REST / JSON",
            value:
              "Appeler un LLM via API, structurer les requêtes et parser les réponses.",
          },
        ],
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "L'outillage minimal : un modèle d'embeddings et une base vectorielle locale.",
    blocks: [
      {
        kind: "command",
        label: "Installer les bibliothèques Python",
        command: "pip install sentence-transformers qdrant-client numpy",
        why: "`sentence-transformers` calcule les embeddings en local (sans API externe), `qdrant-client` dialogue avec la base vectorielle, `numpy` sert aux calculs de similarité. Trois paquets réels et maintenus, suffisants pour un premier pipeline complet.",
        verify: "python -c \"import sentence_transformers, qdrant_client, numpy; print('OK')\"",
      },
      {
        kind: "command",
        label: "Lancer Qdrant en local",
        command: "docker run -p 6333:6333 -d qdrant/qdrant",
        why: "Démarre Qdrant, base vectorielle open source, avec son API sur le port 6333 et un tableau de bord web. Alternative sans Docker : `pip install qdrant-client` suffit pour le mode embarqué (`QdrantClient(':memory:')`) en développement.",
        verify: "curl -s http://localhost:6333/ | head -c 200",
      },
      {
        kind: "text",
        text: "Premier réflexe : tout faire tourner en local d'abord (embeddings locaux, Qdrant en mémoire ou Docker). Les API d'embeddings distantes ajoutent coût, latence et dépendance réseau — on ne les introduit qu'en connaissance de cause, quand le volume le justifie.",
      },
    ],
  },
  {
    id: "premier-projet",
    title: "Premier projet : chatbot sur une documentation",
    level: 2,
    intro:
      "Le cas d'usage canonique du guide : interroger vos propres documents.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Rassembler quelques documents",
            detail:
              "Prendre 5 à 10 pages de documentation en texte (fichiers `.txt` ou `.md`) : assez pour tester, assez peu pour itérer vite.",
          },
          {
            title: "Découper en chunks",
            detail:
              "Découper chaque document en morceaux de ~500 caractères avec un chevauchement de ~50 : assez de contexte par morceau, assez de granularité pour la recherche.",
          },
          {
            title: "Calculer les embeddings",
            detail:
              "`SentenceTransformer('all-MiniLM-L6-v2').encode(chunks)` : chaque morceau devient un vecteur de 384 dimensions, en local.",
          },
          {
            title: "Indexer dans Qdrant",
            detail:
              "Créer une collection et y insérer les vecteurs avec leur texte d'origine en payload : l'index est prêt.",
          },
          {
            title: "Interroger",
            detail:
              "Encoder la question avec le même modèle, chercher les 3 chunks les plus proches, les injecter dans le prompt du LLM avec la consigne de répondre à partir de ces passages.",
          },
          {
            title: "Tester les cas limites",
            detail:
              "Poser une question hors sujet : le système doit répondre qu'il ne sait pas, pas inventer. C'est le test de qualité numéro un.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Recherche de similarité minimale (sans base externe)",
        code: "import numpy as np\nfrom sentence_transformers import SentenceTransformer\n\nmodel = SentenceTransformer(\"all-MiniLM-L6-v2\")\nchunks = [\n    \"Les remboursements sont traités sous 14 jours.\",\n    \"La garantie couvre 2 ans pièces et main d'œuvre.\",\n    \"Les livraisons sont gratuites dès 50 euros d'achat.\",\n]\nemb = model.encode(chunks, normalize_embeddings=True)\n\nq = model.encode([\"Quel est le délai de remboursement ?\"],\n                 normalize_embeddings=True)\nscores = (emb @ q.T).flatten()  # similarité cosinus\nbest = int(np.argmax(scores))\nprint(chunks[best], \"— score\", round(float(scores[best]), 3))",
      },
    ],
  },
  {
    id: "concepts-cles",
    title: "Concepts clés",
    level: 2,
    intro:
      "Le vocabulaire minimal, aligné sur le guide de la compétence.",
    blocks: [
      {
        kind: "fields",
        title: "À connaître par cœur",
        fields: [
          {
            label: "Embeddings",
            value:
              "La représentation vectorielle du sens d'un texte : deux passages proches en sens ont des vecteurs proches.",
          },
          {
            label: "Chunking",
            value:
              "Découper les documents en morceaux de taille adaptée : trop gros, le bruit ; trop petits, le contexte manque.",
          },
          {
            label: "Base vectorielle",
            value:
              "Base optimisée pour la recherche par similarité (Qdrant, pgvector, Chroma) : retrouver les vecteurs les plus proches, vite.",
          },
          {
            label: "Recherche (retrieval)",
            value:
              "Retrouver les passages pertinents : sémantique, hybride (sémantique + mots-clés), re-ranking.",
          },
          {
            label: "Génération augmentée",
            value:
              "Le LLM rédige la réponse en s'appuyant sur les passages fournis, avec consigne de citer ses sources.",
          },
          {
            label: "Évaluation",
            value:
              "Mesurer la qualité : pertinence des passages récupérés, fidélité de la réponse aux sources, taux de refus justifié.",
          },
        ],
      },
    ],
  },
  {
    id: "embeddings-bases",
    title: "Embeddings : les bases",
    level: 2,
    intro:
      "Transformer du texte en vecteurs : ce que fait le modèle, et ce qu'il ne fait pas.",
    blocks: [
      {
        kind: "text",
        text: "Un modèle d'embeddings (ex. `all-MiniLM-L6-v2`) convertit chaque texte en vecteur de dimension fixe (384 ici). La similarité cosinus entre deux vecteurs mesure leur proximité de sens : 1 = quasi identiques, 0 = sans rapport. Le modèle ne « comprend » pas : il place les textes dans un espace où la géométrie reflète des régularités statistiques apprises.",
      },
      {
        kind: "list",
        items: [
          "Toujours le même modèle pour indexer et interroger : des vecteurs de deux modèles différents sont incomparables.",
          "Normaliser les vecteurs (`normalize_embeddings=True`) rend la similarité cosinus équivalente à un produit scalaire — plus simple et plus rapide.",
          "La dimension (384, 768, 1024…) n'est pas un score de qualité : un petit modèle bien choisi bat souvent un gros modèle générique sur un domaine précis.",
        ],
      },
    ],
  },
  {
    id: "chunking-bases",
    title: "Chunking : les bases",
    level: 2,
    intro:
      "Découper intelligemment : la décision la plus rentable du pipeline.",
    blocks: [
      {
        kind: "text",
        text: "Pourquoi découper : les modèles d'embeddings ont une limite de taille, et un document entier dilue le sens (un vecteur pour 50 pages ne représente rien de précis). Un chunk doit être une unité de sens autonome : un paragraphe ou une section, jamais une phrase coupée au milieu.",
      },
      {
        kind: "fields",
        title: "Stratégies de base",
        fields: [
          {
            label: "Taille fixe + chevauchement",
            value:
              "~500 caractères, ~50 de chevauchement. Simple, efficace en première approche. Le chevauchement évite de couper une idée entre deux chunks.",
          },
          {
            label: "Par structure",
            value:
              "Découper sur les titres/sections du document : chaque chunk correspond à une unité logique. Mieux quand les documents sont structurés.",
          },
          {
            label: "Trop gros / trop petit",
            value:
              "Trop gros : le chunk contient du bruit, la recherche devient floue. Trop petit : le passage récupéré manque de contexte pour répondre.",
          },
        ],
      },
    ],
  },
  {
    id: "recherche-bases",
    title: "Recherche : les bases",
    level: 2,
    intro:
      "De la question aux passages : la recherche par similarité en pratique.",
    blocks: [
      {
        kind: "text",
        text: "La recherche sémantique encode la question avec le même modèle que les documents, puis demande à la base vectorielle les K vecteurs les plus proches. `top_k=3` à `5` est un bon point de départ : assez de contexte pour répondre, pas assez pour noyer le LLM. La base utilise un index ANN (Approximate Nearest Neighbors, ex. HNSW) : quasi instantané même sur des millions de vecteurs, avec une approximation négligeable.",
      },
      {
        kind: "list",
        items: [
          "Filtrer par métadonnées avant ou pendant la recherche (ex. `categorie=\"tarifs\"`) : réduit le bruit bien mieux qu'un top_k plus grand.",
          "Un score de similarité bas sur tous les résultats = la base ne contient probablement pas la réponse → le système doit le dire.",
          "La recherche par mots-clés (BM25) complète la sémantique pour les références exactes (codes produit, noms propres) : voir Recherche hybride.",
        ],
      },
    ],
  },
  {
    id: "generation-bases",
    title: "Génération : les bases",
    level: 2,
    intro:
      "Le prompt qui transforme des passages en réponse fiable.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Prompt RAG canonique",
        code: "prompt = f\"\"\"Réponds à la question en te basant UNIQUEMENT sur le contexte.\nSi le contexte ne contient pas la réponse, dis « Je ne sais pas ».\nCite les sources utilisées.\n\nContexte :\n{chr(10).join('- ' + c for c in passages)}\n\nQuestion : {question}\nRéponse :\"\"\"",
      },
      {
        kind: "text",
        text: "Trois consignes, trois effets : « uniquement sur le contexte » réduit les hallucinations, « je ne sais pas » transforme l'ignorance en réponse honnête, « cite les sources » rend la réponse vérifiable. La température basse (0 à 0.3) limite la créativité : en RAG, on veut de la fidélité, pas de l'invention.",
      },
    ],
  },
  {
    id: "environnement-developpement",
    title: "Environnement de développement",
    level: 2,
    intro:
      "Outillage quotidien : Python, une base locale, des notebooks pour explorer.",
    blocks: [
      {
        kind: "fields",
        title: "Boîte à outils",
        fields: [
          {
            label: "Python + venv",
            value: "Un environnement virtuel par projet : `sentence-transformers` et les clients de bases vectorielles y vivent.",
          },
          {
            label: "Qdrant local",
            value: "Docker ou mode embarqué pour développer ; tableau de bord sur http://localhost:6333/dashboard pour inspecter les collections.",
          },
          {
            label: "Jupyter",
            value: "Idéal pour explorer : tester un chunking, visualiser les scores de similarité, itérer sur les prompts.",
          },
          {
            label: "Un LLM accessible",
            value: "API d'un fournisseur ou modèle local : le RAG fonctionne avec n'importe quel LLM instruction-following.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-professionnel",
    title: "Comment travaillent les professionnels",
    level: 2,
    intro:
      "Le flux typique : du corpus brut au pipeline évalué.",
    blocks: [
      {
        kind: "diagram",
        title: "Cycle de vie d'un pipeline RAG",
        lines: [
          "Corpus (documents sources)",
          "     ↓",
          "Nettoyage + chunking (versionné, reproductible)",
          "     ↓",
          "Embeddings + indexation (batch, traçable)",
          "     ↓",
          "Jeu de test (questions + réponses attendues)",
          "     ↓",
          "Évaluation : retrieval puis génération",
          "     ↓",
          "Itération : chunking, modèle, prompt, top_k",
          "     ↓",
          "Déploiement + logging des requêtes",
          "     ↓",
          "Feedback utilisateurs → nouvelles questions test",
        ],
      },
      {
        kind: "text",
        text: "La différence pro : le jeu de test. Sans 50 à 100 questions représentatives avec réponses attendues, chaque modification (nouveau chunking, nouveau modèle) est un pari. Avec, c'est une mesure. Le pipeline se versionne comme du code : config de chunking, nom du modèle d'embeddings, version de l'index.",
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro:
      "Trois projets de difficulté croissante, alignés sur ceux du guide de la compétence.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Chatbot sur votre documentation",
        fields: [
          { label: "À construire", value: "Docs → chunking → embeddings → Qdrant → recherche + génération" },
          { label: "Objectif", value: "Un pipeline complet qui répond en citant ses sources et dit « je ne sais pas » hors sujet" },
          { label: "Durée", value: "Quelques jours" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Moteur de recherche sémantique",
        fields: [
          { label: "À construire", value: "Recherche hybride (sémantique + BM25), filtres par métadonnées, re-ranking" },
          { label: "Objectif", value: "Dépasser la similarité naïve : mesurer le gain de chaque technique sur un jeu de test" },
          { label: "Durée", value: "Une à deux semaines" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Pipeline RAG évalué",
        fields: [
          { label: "À construire", value: "Jeu de test, métriques (fidélité, pertinence), ingestion incrémentale, logging et feedback" },
          { label: "Objectif", value: "Un système mesurable et maintenable : chaque changement est chiffré avant/après" },
          { label: "Durée", value: "Trois à quatre semaines" },
        ],
      },
    ],
  },
  {
    id: "ressources-essentielles",
    title: "Ressources essentielles",
    level: 2,
    intro:
      "Par où continuer : documentations des outils réellement utilisés ici.",
    blocks: [
      {
        kind: "fields",
        title: "Documentations officielles (à privilégier)",
        fields: [
          {
            label: "qdrant.tech/documentation",
            value: "Concepts, API, indexation : la référence pour la base vectorielle utilisée dans cette page.",
          },
          {
            label: "sbert.net",
            value: "Documentation de sentence-transformers : modèles d'embeddings, entraînement, évaluation.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les trois projets progressifs de cette page, dans l'ordre.",
          "Papier fondateur : « Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks » (Lewis et al., 2020) — court et lisible.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "embeddings-details",
    title: "Modèles d'embeddings : choisir",
    level: 3,
    intro:
      "Tous les modèles d'embeddings ne se valent pas : critères de choix factuels.",
    blocks: [
      {
        kind: "fields",
        title: "Critères",
        fields: [
          {
            label: "Langue du corpus",
            value:
              "Un modèle multilingue pour du français ; un modèle anglais pur sous-performe sur du français. Vérifier les langues supportées avant tout.",
          },
          {
            label: "Dimension",
            value:
              "384 (léger, rapide), 768 (standard), 1024+ (lourd). Plus de dimensions = plus de mémoire d'index et de latence, pas automatiquement mieux.",
          },
          {
            label: "Taille et vitesse",
            value:
              "`all-MiniLM-L6-v2` (~90 Mo) encode des milliers de phrases par seconde sur CPU : suffisant pour la plupart des usages. Les gros modèles se justifient sur des corpus exigeants.",
          },
          {
            label: "Domaine",
            value:
              "Un modèle générique sur du vocabulaire très spécialisé (juridique, médical) peut être battu par un modèle affiné sur le domaine (voir Fine-tuning des embeddings).",
          },
          {
            label: "Benchmarks publics",
            value:
              "Le classement MTEB compare les modèles sur des tâches de retrieval : un point de départ objectif, à compléter par un test sur vos propres données.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle d'or : le meilleur modèle est celui qui gagne sur votre jeu de test, pas sur un leaderboard. Changer de modèle d'embeddings impose de réindexer tout le corpus — c'est un changement structurel, pas un réglage.",
      },
    ],
  },
  {
    id: "chunking-strategies",
    title: "Stratégies de chunking avancées",
    level: 3,
    intro:
      "Au-delà de la taille fixe : découper selon le sens, pas selon le compteur.",
    blocks: [
      {
        kind: "fields",
        title: "Stratégies",
        fields: [
          {
            label: "Récursif (par séparateurs)",
            value:
              "Découper d'abord sur les doubles sauts de ligne, puis simples, puis phrases : respecte la structure naturelle. Le standard pragmatique (implémenté dans la plupart des frameworks).",
          },
          {
            label: "Sémantique",
            value:
              "Découper où le sens change (baisse de similarité entre phrases adjacentes). Plus coûteux, utile sur des documents hétérogènes.",
          },
          {
            label: "Par proposition",
            value:
              "Un chunk = une affirmation atomique. Granularité fine, excellente précision — mais chaque chunk isolé peut manquer de contexte.",
          },
          {
            label: "Fenêtre glissante + résumé",
            value:
              "Ajouter à chaque chunk un résumé du document parent : le chunk reste petit mais porte le contexte global (technique « small-to-big »).",
          },
        ],
      },
      {
        kind: "text",
        text: "Quelle que soit la stratégie, deux invariants : un chunk doit être compréhensible seul (sinon la recherche le trouve mais le LLM n'en fait rien), et le découpage doit être déterministe et versionné (même documents → mêmes chunks, sinon l'index n'est pas reproductible).",
      },
    ],
  },
  {
    id: "chunking-code",
    title: "Chunking : implémentation",
    level: 3,
    intro:
      "Un découpeur récursif simple et lisible, sans dépendance.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Découpeur récursif minimal",
        code: "def chunk_text(text, size=500, overlap=50):\n    \"\"\"Découpe sur paragraphes puis phrases, avec chevauchement.\"\"\"\n    chunks, current = [], \"\"\n    # Séparateurs par priorité : paragraphes, puis phrases\n    parts = [p for para in text.split(\"\\n\\n\")\n             for p in para.replace(\"! \", \". \").replace(\"? \", \". \").split(\". \")]\n    for part in parts:\n        part = part.strip()\n        if not part:\n            continue\n        if len(current) + len(part) > size and current:\n            chunks.append(current)\n            current = current[-overlap:]  # chevauchement\n        current = (current + \" \" + part).strip()\n    if current:\n        chunks.append(current)\n    return chunks",
      },
      {
        kind: "text",
        text: "Ce découpeur suffit pour prototyper et comprendre les arbitrages. En production, les frameworks (LangChain, LlamaIndex) fournissent des splitters testés — mais les comprendre via cette implémentation évite de les utiliser en boîte noire.",
      },
    ],
  },
  {
    id: "metadonnees",
    title: "Métadonnées : le multiplicateur",
    level: 3,
    intro:
      "Enrichir chaque chunk d'informations structurées : le levier le plus sous-estimé.",
    blocks: [
      {
        kind: "text",
        text: "Chaque chunk indexé porte des métadonnées : source (fichier, URL), date, chapitre, catégorie, langue, version du document. Elles servent à filtrer avant la recherche vectorielle (« uniquement les tarifs 2025 »), à citer précisément les sources, et à invalider proprement (supprimer tous les chunks d'un document obsolète).",
      },
      {
        kind: "code",
        language: "python",
        title: "Payload Qdrant avec métadonnées",
        code: "from qdrant_client import QdrantClient\nfrom qdrant_client.models import Distance, VectorParams, PointStruct\n\nclient = QdrantClient(\":memory:\")\nclient.create_collection(\"docs\", vectors_config=VectorParams(size=384, distance=Distance.COSINE))\n\nclient.upsert(\"docs\", [PointStruct(\n    id=1,\n    vector=emb[0].tolist(),\n    payload={\n        \"text\": chunks[0],\n        \"source\": \"tarifs-2025.md\",\n        \"categorie\": \"tarifs\",\n        \"date\": \"2025-01-15\",\n    },\n)])",
      },
      {
        kind: "list",
        items: [
          "Stocker le texte source dans le payload : la recherche retourne directement le passage, sans jointure.",
          "Les métadonnées se filtrent (`categorie == \"tarifs\"`) : c'est une recherche exacte, fiable, qui réduit le bruit avant la similarité.",
          "Versionner les documents : à la mise à jour d'un fichier, supprimer ses anciens chunks par `source` avant de réindexer.",
        ],
      },
    ],
  },
  {
    id: "bases-vectorielles",
    title: "Bases vectorielles : panorama",
    level: 3,
    intro:
      "Qdrant, pgvector, Chroma : trois options réelles, trois profils.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Qdrant", "pgvector", "Chroma"],
        rows: [
          ["Nature", "Base dédiée (Rust), serveur ou embarquée", "Extension PostgreSQL", "Base légère, embarquée d'abord"],
          ["Usage type", "Production dédiée, filtres riches", "Déjà PostgreSQL en stack : un seul système à opérer", "Prototypes, petits volumes"],
          ["Index", "HNSW", "HNSW / IVFFlat", "HNSW"],
          ["Point fort", "Performance et fonctionnalités de recherche", "Aucune infra supplémentaire, SQL + vecteurs", "Simplicité de démarrage"],
        ],
      },
      {
        kind: "text",
        text: "Le choix dépend du contexte, pas d'un classement absolu : si PostgreSQL est déjà là, pgvector évite un nouveau système ; pour un service de recherche dédié à fort volume, Qdrant est dimensionné pour ; pour explorer, Chroma démarre en deux lignes. Toutes trois parlent similarité cosinus et filtres sur métadonnées — migrer reste possible.",
      },
    ],
  },
  {
    id: "indexation-pipeline",
    title: "Pipeline d'indexation",
    level: 3,
    intro:
      "Industrialiser la phase 1 : du dossier de documents à l'index versionné.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Collecter",
            detail:
              "Lister les sources (dossiers, URLs, exports) avec leur date de récupération. Chaque document a un identifiant stable.",
          },
          {
            title: "Nettoyer",
            detail:
              "Supprimer en-têtes/pieds de page, doublons, caractères parasites. Le bruit en entrée devient du bruit dans les réponses.",
          },
          {
            title: "Découper",
            detail:
              "Appliquer la stratégie de chunking versionnée (nom + paramètres notés). Chaque chunk reçoit ses métadonnées.",
          },
          {
            title: "Encoder par batch",
            detail:
              "`model.encode(chunks, batch_size=64)` : l'encodage par batch exploite le parallélisme, indispensable au-delà de quelques milliers de chunks.",
          },
          {
            title: "Insérer",
            detail:
              "Upsert par lots dans la collection, avec le texte et les métadonnées en payload. Noter le nom du modèle d'embeddings et sa dimension.",
          },
          {
            title: "Valider",
            detail:
              "Lancer le jeu de questions test sur le nouvel index : le taux de récupération attendu est la porte de sortie.",
          },
        ],
      },
      {
        kind: "text",
        text: "L'indexation est un batch reproductible, pas un script jetable : mêmes documents + même config = même index. C'est ce qui permet de comparer deux stratégies de chunking sans biaiser la mesure.",
      },
    ],
  },
  {
    id: "recherche-hybride",
    title: "Recherche hybride",
    level: 3,
    intro:
      "Combiner sémantique et mots-clés : couvrir les deux types de questions.",
    blocks: [
      {
        kind: "text",
        text: "La recherche sémantique comprend le sens mais rate les termes exacts (« article L. 412-3 », « ERREUR_504 ») ; la recherche par mots-clés (BM25) trouve les termes exacts mais pas les paraphrases. L'hybride exécute les deux et fusionne les classements (ex. Reciprocal Rank Fusion) : chaque méthode compense l'angle mort de l'autre.",
      },
      {
        kind: "list",
        items: [
          "Questions factuelles avec références précises → BM25 domine ; questions conceptuelles → sémantique domine.",
          "Qdrant et la plupart des bases supportent le mode hybride nativement (sparse + dense).",
          "Mesurer l'apport sur le jeu de test : l'hybride ajoute de la complexité, il doit prouver son gain.",
        ],
      },
    ],
  },
  {
    id: "re-ranking",
    title: "Re-ranking",
    level: 3,
    intro:
      "Deuxième passe de précision : réordonner les candidats avec un modèle plus fin.",
    blocks: [
      {
        kind: "text",
        text: "Principe en deux temps : la base vectorielle récupère vite 50 candidats (recall), puis un cross-encoder — un modèle qui lit question et passage ensemble — les réordonne précisément pour ne garder que les 5 meilleurs (precision). Le cross-encoder est trop lent pour indexer des millions de documents, mais parfait pour réordonner 50 candidats.",
      },
      {
        kind: "list",
        items: [
          "Le re-ranking corrige le défaut principal de la similarité : confondre « parle du sujet » et « répond à la question ».",
          "Coût : un appel de modèle supplémentaire par requête — à mesurer contre le gain de qualité.",
          "Alternative sans modèle : demander au LLM de sélectionner les passages pertinents — plus cher, parfois plus précis.",
        ],
      },
    ],
  },
  {
    id: "query-rewriting",
    title: "Réécriture de requête",
    level: 3,
    intro:
      "Améliorer la question avant de chercher : la reformulation par LLM.",
    blocks: [
      {
        kind: "text",
        text: "Les questions humaines sont souvent elliptiques (« et pour les pros ? ») ou maladroites. Faire réécrire la question par le LLM — en intégrant l'historique de conversation — produit une requête autonome et mieux formulée pour la recherche. C'est particulièrement rentable dans un chatbot multi-tours, où chaque question dépend des précédentes.",
      },
      {
        kind: "list",
        items: [
          "La réécriture ne doit pas inventer de faits : elle reformule, elle n'enrichit pas.",
          "Logger questions originales et réécrites : c'est là qu'on repère les reformulations qui dérapent.",
          "Coût : un appel LLM de plus par tour — acceptable si le gain de retrieval est mesuré.",
        ],
      },
    ],
  },
  {
    id: "multi-query",
    title: "Multi-query retrieval",
    level: 3,
    intro:
      "Chercher plusieurs fois plutôt qu'une : couvrir les facettes d'une question.",
    blocks: [
      {
        kind: "text",
        text: "Une question complexe touche plusieurs aspects (« Comparez les offres et leurs délais »). Générer 3 à 4 sous-requêtes, chercher chacune, fusionner les résultats en dédupliquant : on couvre des passages qu'une requête unique aurait manqués. Le surcoût (plusieurs recherches) est faible devant le coût de génération.",
      },
      {
        kind: "list",
        items: [
          "Fusion par Reciprocal Rank Fusion : robuste sans réglage fin.",
          "Dédupliquer par identifiant de chunk avant de passer au LLM : le contexte coûte cher, pas de doublons.",
          "Inutile pour les questions simples : réserver aux questions multi-facettes détectées (ou à un mode « recherche approfondie »).",
        ],
      },
    ],
  },
  {
    id: "hyde",
    title: "HyDE : l'expansion hypothétique",
    level: 3,
    intro:
      "Une technique réelle et contre-intuitive : faire écrire une fausse réponse pour mieux chercher.",
    blocks: [
      {
        kind: "text",
        text: "HyDE (Hypothetical Document Embeddings) : le LLM génère une réponse hypothétique à la question — possiblement fausse — puis on encode cette réponse (pas la question) pour la recherche. Pourquoi ça marche : la fausse réponse ressemble stylistiquement aux vrais documents (longueur, vocabulaire), donc son vecteur est plus proche des bons passages que celui de la question courte.",
      },
      {
        kind: "list",
        items: [
          "La réponse hypothétique ne sert qu'à chercher : jamais affichée, jamais citée.",
          "Efficace quand les documents sont longs et les questions courtes (décalage de style).",
          "À évaluer : sur certains corpus, le gain est nul — c'est une technique à tester, pas un dogme.",
        ],
      },
    ],
  },
  {
    id: "fenetre-contexte",
    title: "Gérer la fenêtre de contexte",
    level: 3,
    intro:
      "Le contexte est une ressource limitée et coûteuse : l'allouer intelligemment.",
    blocks: [
      {
        kind: "text",
        text: "Chaque passage injecté consomme des tokens (coût) et dilue l'attention du modèle (qualité). Règles : `top_k` petit (3-5) par défaut, passages classés par pertinence décroissante, et troncature intelligente si le total dépasse la limite — jamais d'erreur silencieuse de dépassement.",
      },
      {
        kind: "list",
        items: [
          "« Lost in the middle » : les LLM exploitent moins bien le milieu d'un long contexte — les passages les plus importants en premier.",
          "Compter les tokens avant d'appeler : `len(encoding.encode(text))` avec le tokenizer du modèle, pas une estimation au doigt mouillé.",
          "Si 5 passages ne suffisent pas à répondre, le problème est la recherche, pas la taille du contexte.",
        ],
      },
    ],
  },
  {
    id: "prompting-rag-avance",
    title: "Prompting RAG avancé",
    level: 3,
    intro:
      "Au-delà du prompt canonique : citations, conflits et refus.",
    blocks: [
      {
        kind: "fields",
        title: "Techniques",
        fields: [
          {
            label: "Citations numérotées",
            value:
              "Numéroter les passages ([1], [2]) et exiger des citations dans la réponse : chaque affirmation devient vérifiable en un clic.",
          },
          {
            label: "Gestion des conflits",
            value:
              "Si deux passages se contredisent, consigne explicite : le signaler plutôt que choisir silencieusement. Fréquent avec des documents datés.",
          },
          {
            label: "Refus calibré",
            value:
              "« Si le contexte ne contient pas la réponse, dis-le » — mais aussi : autoriser le modèle à répondre de ses connaissances générales quand la question est générique, en le signalant.",
          },
          {
            label: "Format de sortie",
            value:
              "Imposer une structure (réponse courte + sources, ou JSON) : indispensable quand la réponse alimente un autre système.",
          },
        ],
      },
    ],
  },
  {
    id: "evaluation-rag",
    title: "Évaluer un pipeline RAG",
    level: 3,
    intro:
      "Mesurer séparément ce qui est récupéré et ce qui est affirmé.",
    blocks: [
      {
        kind: "fields",
        title: "Métriques par étape",
        fields: [
          {
            label: "Rappel de récupération",
            value:
              "Le bon passage est-il dans les K récupérés ? Se mesure avec des questions dont on connaît la source attendue. Si le rappel est faible, travailler le chunking et la recherche avant le prompt.",
          },
          {
            label: "Fidélité (faithfulness)",
            value:
              "Chaque affirmation de la réponse est-elle supportée par les passages ? L'hallucination se mesure ici, pas au « feeling ».",
          },
          {
            label: "Pertinence de la réponse",
            value:
              "La réponse répond-elle à la question posée ? Un système peut récupérer juste et répondre à côté.",
          },
          {
            label: "Taux de refus justifié",
            value:
              "Sur les questions hors corpus, le système dit-il « je ne sais pas » au lieu d'inventer ?",
          },
        ],
      },
      {
        kind: "text",
        text: "Le framework open source RAGAS implémente ces métriques (avec un LLM juge) : utile pour automatiser, à compléter par une revue humaine sur échantillon — un juge automatique a ses propres biais. Le jeu de test doit couvrir : questions normales, questions hors sujet, questions ambiguës, questions multi-documents.",
      },
    ],
  },
  {
    id: "jeu-test",
    title: "Construire le jeu de test",
    level: 3,
    intro:
      "Le jeu de questions-réponses : l'actif le plus précieux du projet.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Collecter des questions réelles",
            detail:
              "Logs du support, FAQ, questions d'utilisateurs : 50 à 100 pour commencer. Les questions synthétiques (générées par LLM) complètent, ne remplacent pas.",
          },
          {
            title: "Associer les sources attendues",
            detail:
              "Pour chaque question, noter quel(s) document(s) contiennent la réponse : c'est ce qui permet de mesurer la récupération.",
          },
          {
            title: "Rédiger les réponses de référence",
            detail:
              "Courtes et factuelles. Elles servent de comparaison, pas de vérité absolue — la fidélité aux sources prime sur la similarité textuelle.",
          },
          {
            title: "Inclure des pièges",
            detail:
              "Questions hors corpus (refus attendu), questions ambiguës, informations contradictoires entre documents.",
          },
          {
            title: "Versionner",
            detail:
              "Le jeu de test évolue avec le corpus : chaque nouveau type d'échec rencontré en production devient une question test.",
          },
        ],
      },
    ],
  },
  {
    id: "hallucinations-guardrails",
    title: "Hallucinations : garde-fous",
    level: 3,
    intro:
      "Le RAG réduit les hallucinations, il ne les élimine pas : les filets de sécurité.",
    blocks: [
      {
        kind: "list",
        items: [
          "Vérification post-génération : un second passage (LLM ou règles) contrôle que chaque affirmation chiffrée figure dans les passages.",
          "Citations obligatoires : une affirmation sans source est un signal d'alerte, pour l'utilisateur comme pour le monitoring.",
          "Température basse (0-0.3) : moins de créativité, plus de fidélité — le réglage par défaut en RAG.",
          "Ne jamais laisser le modèle « compléter » un passage manquant : mieux vaut une réponse partielle honnête qu'une réponse complète inventée.",
          "Sur les chiffres critiques (tarifs, dosages, délais légaux), exiger la citation exacte du passage source.",
        ],
      },
    ],
  },
  {
    id: "securite-donnees",
    title: "Sécurité des données",
    level: 3,
    intro:
      "Un RAG sur des documents internes expose ce que l'utilisateur ne devrait pas voir : le contrôler.",
    blocks: [
      {
        kind: "fields",
        title: "Risques et parades",
        fields: [
          {
            label: "Fuite inter-utilisateurs",
            value:
              "Le risque majeur : un utilisateur interroge des documents auxquels il n'a pas accès. Parade : filtrer par permissions (métadonnée `acl`) à chaque recherche, jamais après.",
          },
          {
            label: "Données sensibles dans l'index",
            value:
              "PII, secrets : les détecter et les masquer à l'ingestion. Un index vectoriel reste une copie des données.",
          },
          {
            label: "Injection via documents",
            value:
              "Un document malveillant peut contenir des instructions (« ignore les consignes »). Traiter le contexte comme des données, jamais comme des instructions — et le rappeler dans le prompt système.",
          },
          {
            label: "Logs",
            value:
              "Les questions des utilisateurs sont sensibles : les logger de façon pseudonymisée, avec une durée de rétention définie.",
          },
        ],
      },
    ],
  },
  {
    id: "couts-latence",
    title: "Coûts et latence",
    level: 3,
    intro:
      "Chiffrer le pipeline : chaque étape a un prix en temps et en argent.",
    blocks: [
      {
        kind: "table",
        headers: ["Étape", "Coût", "Levier"],
        rows: [
          ["Encodage de la question", "Faible (local) ou facturé (API)", "Modèle local pour les embeddings : coût fixe, pas de facturation au token"],
          ["Recherche vectorielle", "Négligeable (ms)", "Index HNSW : quasi constant même à grande échelle"],
          ["Re-ranking", "Moyen (un modèle)", "Ne réordonner que si le gain est mesuré"],
          ["Génération LLM", "Dominant (tokens de contexte + réponse)", "top_k petit, modèle adapté à la tâche, cache des questions fréquentes"],
        ],
      },
      {
        kind: "text",
        text: "La latence perçue se décompose pareil : viser < 2 s pour une recherche simple, accepter plus pour les modes « approfondis » (multi-query, re-ranking). Le streaming de la réponse (tokens affichés au fur et à mesure) divise la latence perçue sans changer la latence réelle.",
      },
    ],
  },
  {
    id: "ingestion-incrementale",
    title: "Ingestion incrémentale",
    level: 3,
    intro:
      "Les documents changent : mettre à jour l'index sans tout réindexer.",
    blocks: [
      {
        kind: "text",
        text: "Stratégie : chaque document a un hash de contenu. À chaque synchronisation, seuls les documents nouveaux ou modifiés sont réindexés (suppression des anciens chunks par `source`, insertion des nouveaux). Les suppressions se propagent de même. Un journal d'ingestion (quoi, quand, combien de chunks) rend l'opération auditable.",
      },
      {
        kind: "list",
        items: [
          "Ne jamais réindexer tout le corpus « pour être sûr » : c'est lent, coûteux, et masque les vrais problèmes de synchronisation.",
          "Le changement de modèle d'embeddings impose une réindexation complète : c'est l'exception assumée.",
          "Tester la suppression : un document retiré ne doit plus être retrouvable ni cité.",
        ],
      },
    ],
  },
  {
    id: "observabilite-rag",
    title: "Observabilité",
    level: 3,
    intro:
      "Voir ce que fait le système en production : requêtes, récupérations, feedback.",
    blocks: [
      {
        kind: "fields",
        title: "À logger par requête",
        fields: [
          {
            label: "Question (+ réécrite)",
            value: "Pour analyser les échecs et enrichir le jeu de test. Pseudonymisée.",
          },
          {
            label: "Passages récupérés",
            value: "IDs, scores, sources : permet de rejouer une requête et de diagnostiquer une mauvaise réponse.",
          },
          {
            label: "Réponse et citations",
            value: "Pour l'audit et l'évaluation continue sur échantillon.",
          },
          {
            label: "Feedback utilisateur",
            value: "Pouce haut/bas + commentaire : la source la plus précieuse d'amélioration, à intégrer au jeu de test.",
          },
          {
            label: "Latences par étape",
            value: "Encodage, recherche, génération : pour repérer les régressions de performance.",
          },
        ],
      },
    ],
  },
  {
    id: "agents-vs-rag",
    title: "RAG vs agents : comparaison factuelle",
    level: 3,
    intro:
      "Deux architectures, deux problèmes : ne pas confondre les outils.",
    blocks: [
      {
        kind: "table",
        headers: ["", "RAG", "Agent"],
        rows: [
          ["Question résolue", "« Que disent nos documents ? »", "« Accomplis cette tâche » (chercher, calculer, agir)"],
          ["Flux", "Fixe : recherche → génération", "Dynamique : le LLM choisit les outils à chaque étape"],
          ["Prédictibilité", "Élevée : pipeline déterministe", "Plus faible : boucles, coûts et latences variables"],
          ["Évaluation", "Métriques standard (fidélité, rappel)", "Plus difficile : trajectoires variées"],
        ],
      },
      {
        kind: "text",
        text: "En pratique, les deux se combinent : un agent peut appeler le RAG comme un outil parmi d'autres (« cherche dans la documentation »). Commencer par un RAG solide avant d'ajouter de l'agentique : un agent avec une mauvaise recherche reste un mauvais système, plus cher.",
      },
    ],
  },
  {
    id: "fine-tuning-embeddings",
    title: "Fine-tuner les embeddings",
    level: 3,
    intro:
      "Quand le modèle générique ne suffit plus : l'adapter à votre domaine.",
    blocks: [
      {
        kind: "text",
        text: "Le fine-tuning d'un modèle d'embeddings utilise des paires (question, passage pertinent) de votre domaine pour rapprocher ce qui doit l'être. Il faut des centaines à des milliers de paires — les logs de recherche (questions + clics) en sont la source naturelle. `sentence-transformers` supporte l'entraînement avec ces paires de façon standard.",
      },
      {
        kind: "list",
        items: [
          "À envisager seulement après avoir épuisé chunking, hybride et re-ranking : c'est l'optimisation la plus coûteuse.",
          "Le modèle affiné reste versionné comme tout artefact : son nom et son jeu d'entraînement sont notés.",
          "Réindexation complète obligatoire après changement de modèle — prévoir le coût.",
        ],
      },
    ],
  },
  {
    id: "multimodal-bref",
    title: "RAG multimodal : panorama",
    level: 3,
    intro:
      "Au-delà du texte : indexer images, tableaux et PDF complexes.",
    blocks: [
      {
        kind: "text",
        text: "Les documents réels contiennent images, tableaux, schémas. Approches : extraire le texte (OCR, parsing de PDF) et l'indexer classiquement ; ou utiliser des embeddings multimodaux (texte + image dans le même espace) pour rechercher des images par description textuelle. Les tableaux gagnent à être convertis en texte structuré (markdown) plutôt qu'aplatis.",
      },
      {
        kind: "list",
        items: [
          "La qualité d'extraction PDF conditionne tout : tester plusieurs parseurs sur vos documents réels.",
          "Stocker une miniature ou la page d'origine en métadonnée : citer « page 12 du PDF » vaut mieux qu'un chunk orphelin.",
          "Commencer par le texte : le multimodal est un chantier, pas un prérequis.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Le bestiaire des pipelines RAG qui déçoivent.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Chunks trop gros",
            value:
              "Des chunks de 2000 caractères diluent le sens : la recherche retourne du vague, le LLM répond à côté. Redécouper plus fin d'abord.",
          },
          {
            label: "Deux modèles d'embeddings mélangés",
            value:
              "Indexer avec A et interroger avec B : les similarités ne veulent rien dire. Un seul modèle, partout, versionné.",
          },
          {
            label: "Pas de « je ne sais pas »",
            value:
              "Sans consigne de refus, le LLM répond toujours — y compris en inventant. Le test hors-sujet est obligatoire.",
          },
          {
            label: "top_k trop grand",
            value:
              "20 passages noient le modèle sous le bruit : 3 à 5 bons passages battent 20 moyens.",
          },
          {
            label: "Métadonnées absentes",
            value:
              "Sans source ni date, impossible de citer, filtrer ou invalider : l'index devient une boîte noire.",
          },
          {
            label: "Évaluer au feeling",
            value:
              "« Ça a l'air mieux » n'est pas une mesure. Sans jeu de test, chaque itération est un pari.",
          },
          {
            label: "Réindexation manuelle",
            value:
              "Des documents obsolètes qui restent interrogeables : l'ingestion doit être un pipeline, pas un script lancé à la main.",
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
      "Les habitudes qui séparent une démo d'un système fiable.",
    blocks: [
      {
        kind: "list",
        items: [
          "Versionner le pipeline : config de chunking, modèle d'embeddings, prompt — tout ce qui change le comportement est noté.",
          "Construire le jeu de test avant d'optimiser : mesurer d'abord, itérer ensuite.",
          "Citer les sources systématiquement : la vérifiabilité est une fonctionnalité, pas un bonus.",
          "Filtrer par permissions à la recherche, jamais après : la sécurité ne se bricole pas en post-traitement.",
          "Logger chaque requête avec ses passages : sans trace, pas de diagnostic.",
          "Commencer simple (chunking fixe + similarité) et n'ajouter une technique que si le jeu de test prouve le gain.",
          "Traiter les documents comme des données, jamais comme des instructions.",
          "Prévoir la dérive : les documents changent, les questions changent — réévaluer régulièrement.",
        ],
      },
    ],
  },
  {
    id: "checklist-production",
    title: "Checklist de mise en production",
    level: 3,
    intro:
      "Avant d'ouvrir aux utilisateurs : les vérifications qui évitent les incidents.",
    blocks: [
      {
        kind: "fields",
        title: "À valider",
        fields: [
          {
            label: "Qualité mesurée",
            value: "Rappel de récupération, fidélité et taux de refus justifié sur le jeu de test — avec des seuils.",
          },
          {
            label: "Sécurité",
            value: "Filtrage par permissions, PII masquées, logs pseudonymisés, documents traités comme données.",
          },
          {
            label: "Fraîcheur",
            value: "Pipeline d'ingestion incrémentale en place et testé, suppressions propagées.",
          },
          {
            label: "Robustesse",
            value: "Timeouts, retries, dégradation gracieuse si la base ou le LLM est indisponible.",
          },
          {
            label: "Observabilité",
            value: "Logging des requêtes, feedback utilisateur, latences par étape, alertes.",
          },
          {
            label: "Coûts",
            value: "Budget par requête estimé et suivi ; garde-fous contre les abus (rate limiting).",
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
      "RAG maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "`llms` : prompting avancé, évaluation des modèles et systèmes multi-modèles.",
          "`nlp` : traitement du langage — tokenisation, modèles de séquence, compréhension fine.",
          "`databases` : modélisation et administration des données qui alimentent l'index.",
          "`mlops` : déploiement, monitoring et versioning des systèmes ML en production.",
          "Agents : donner au RAG des outils (calcul, actions) quand la réponse ne suffit plus.",
          "Revenir à la roadmap : valider le RAG et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
  {
    id: "ressources-avancees",
    title: "Ressources avancées",
    level: 3,
    intro:
      "Aller plus loin, en commençant par les documentations officielles.",
    blocks: [
      {
        kind: "fields",
        title: "Documentations officielles (à privilégier)",
        fields: [
          {
            label: "qdrant.tech/documentation",
            value: "Recherche hybride, filtres, indexation : les fonctionnalités avancées de la base utilisée ici.",
          },
          {
            label: "sbert.net",
            value: "Entraînement et évaluation des modèles d'embeddings.",
          },
          {
            label: "docs.ragas.io",
            value: "Documentation du framework d'évaluation RAGAS : métriques et intégration.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les trois projets progressifs de cette page, dans l'ordre.",
          "Papier fondateur : « Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks » (Lewis et al., 2020).",
          "Veille : les benchmarks MTEB pour suivre l'état de l'art des embeddings.",
        ],
      },
    ],
  },
];

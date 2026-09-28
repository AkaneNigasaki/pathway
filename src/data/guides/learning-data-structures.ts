import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète des Structures de données : organiser l'information
 * en mémoire, choisir la bonne structure, comprendre ses coûts.
 * Concepts purs : implémentations en code, aucune installation requise.
 */
export const LEARNING_DATA_STRUCTURES: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Ce que sont les structures de données, et pourquoi le choix compte.",
    blocks: [
      {
        kind: "text",
        text: "Une structure de données est une façon d'organiser l'information en mémoire : tableau, liste chaînée, arbre, table de hachage, graphe. Chacune expose des opérations (ajouter, chercher, supprimer) avec des coûts différents.",
      },
      {
        kind: "text",
        text: "Le choix change tout : chercher un élément par son nom dans une liste de un million d'entrées prend une seconde ; dans une table de hachage, quelques microsecondes. Même données, même machine — seule l'organisation diffère.",
      },
      {
        kind: "text",
        text: "Structures vs algorithmes : la structure est le contenant (comment les données sont rangées), l'algorithme est la méthode (comment on les parcourt ou les transforme). Les deux s'étudient ensemble : un bon algorithme sur la mauvaise structure reste lent.",
      },
    ],
  },
  {
    id: "pourquoi-ca-compte",
    title: "Pourquoi le choix compte",
    level: 1,
    intro:
      "Le même besoin, trois structures, trois coûts : la démonstration en 30 secondes.",
    blocks: [
      {
        kind: "table",
        headers: ["Besoin : annuaire par nom", "Liste", "Liste triée + recherche binaire", "Table de hachage"],
        rows: [
          ["Chercher un contact", "O(n) — tout parcourir", "O(log n)", "O(1) en moyenne"],
          ["Ajouter un contact", "O(1) — à la fin", "O(n) — décaler", "O(1) en moyenne"],
          ["Lister par ordre alphabétique", "O(n log n) — trier", "O(n) — déjà trié", "O(n log n) — trier"],
        ],
      },
      {
        kind: "text",
        text: "Aucune structure n'est « la meilleure » : chacune excelle sur certaines opérations et paie sur d'autres. Maîtriser les structures, c'est savoir lire ce tableau pour chaque besoin — et accepter les compromis en connaissance de cause.",
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
      "Les bases de code nécessaires avant d'implémenter des structures.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut savoir",
        fields: [
          {
            label: "Classes et objets",
            value:
              "Définir une classe, un constructeur, des méthodes. Les nœuds (listes, arbres) sont des objets qui se référencent.",
          },
          {
            label: "Références",
            value:
              "Comprendre qu'une variable objet pointe vers une donnée, pas qu'elle la contient. Essentiel pour les listes chaînées et les arbres.",
          },
          {
            label: "Récursivité",
            value:
              "Une fonction qui s'appelle elle-même : la façon naturelle d'écrire les parcours d'arbres et de graphes.",
          },
          {
            label: "Complexité (grand O)",
            value:
              "Lire `O(1)`, `O(log n)`, `O(n)` : tout le discours sur les structures s'exprime dans ce vocabulaire.",
          },
        ],
      },
      {
        kind: "text",
        text: "Les exemples sont en Python, volontairement proches du pseudocode. L'objectif n'est pas la performance du langage, mais la clarté des mécanismes.",
      },
    ],
  },
  {
    id: "tableaux",
    title: "Les tableaux",
    level: 2,
    intro:
      "La structure fondamentale : éléments contigus, accès direct par index.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Tableau : accès, parcours, limites",
        code: `notes = [12, 15, 9, 18]\n\nnotes[0]        # O(1) : accès direct par index\nnotes[2] = 10   # O(1) : modification par index\n\nlen(notes)      # O(1) : taille connue\n9 in notes      # O(n) : recherche = parcours\n\nnotes.insert(1, 14)  # O(n) : décale les éléments suivants\nnotes.pop(0)         # O(n) : décale aussi`,
      },
      {
        kind: "diagram",
        title: "Un tableau en mémoire : cases contiguës",
        lines: [
          "index :   0    1    2    3",
          "        ┌────┬────┬────┬────┐",
          "        │ 12 │ 15 │  9 │ 18 │",
          "        └────┴────┴────┴────┘",
          "adresse : 100  104  108  112   ← contigu : adresse = base + index × taille",
          "→ accès O(1) par calcul d'adresse, insertion O(n) par décalage.",
        ],
      },
      {
        kind: "list",
        items: [
          "Points forts : accès et modification par index en `O(1)`, excellente localité mémoire (rapide en pratique).",
          "Points faibles : insertion/suppression au milieu en `O(n)`, taille fixe à l'allocation (d'où les tableaux dynamiques).",
          "En Python, `list` est un tableau dynamique ; en JavaScript, `Array` aussi.",
        ],
      },
    ],
  },
  {
    id: "listes-chainees",
    title: "Les listes chaînées",
    level: 2,
    intro:
      "Des nœuds reliés par des références : insertion facile, accès séquentiel.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Liste chaînée minimale",
        code: `class Noeud:\n    def __init__(self, valeur, suivant=None):\n        self.valeur = valeur\n        self.suivant = suivant     # référence vers le nœud suivant\n\n# 1 -> 2 -> 3\ntete = Noeud(1, Noeud(2, Noeud(3)))\n\ndef parcourir(tete):\n    courant = tete\n    while courant is not None:     # accès séquentiel : O(n)\n        print(courant.valeur)\n        courant = courant.suivant\n\ndef inserer_en_tete(tete, valeur):\n    return Noeud(valeur, tete)     # O(1) : deux affectations`,
      },
      {
        kind: "diagram",
        title: "Liste chaînée : nœuds dispersés, reliés par références",
        lines: [
          "┌───┬───┐    ┌───┬───┐    ┌───┬───┐",
          "│ 1 │ •─┼───►│ 2 │ •─┼───►│ 3 │ / │",
          "└───┴───┘    └───┴───┘    └───┴───┘",
          "nœuds non contigus en mémoire : pas d'accès par index,",
          "mais insertion/suppression en O(1) si on a déjà le nœud.",
        ],
      },
      {
        kind: "list",
        items: [
          "Insertion/suppression en `O(1)` quand on possède déjà le nœud — pas de décalage.",
          "Accès au i-ème élément en `O(n)` : il faut parcourir depuis la tête.",
          "Surcoût mémoire : une référence par nœud, plus une allocation par élément.",
          "En pratique moderne, les tableaux dynamiques les remplacent souvent : la localité mémoire du tableau bat la liste chaînée sur parcours.",
        ],
      },
    ],
  },
  {
    id: "piles",
    title: "Les piles (LIFO)",
    level: 2,
    intro:
      "Dernier arrivé, premier sorti : l'ordre d'accès définit la structure.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Pile avec une liste",
        code: `pile = []\n\npile.append("a")   # empiler : O(1)\npile.append("b\")\npile.append("c\")\n\npile.pop()        # dépiler : "c" — le dernier arrivé sort premier\npile[-1]         # sommet : "b" (sans dépiler)`,
      },
      {
        kind: "list",
        items: [
          "LIFO (Last In, First Out) : on ne touche qu'au sommet.",
          "Usages : annuler/rétablir, pile d'appels des fonctions, évaluation d'expressions, parcours en profondeur.",
          "Toutes les opérations sont `O(1)` : c'est la structure la plus simple qui soit.",
          "Vérifier les parenthèses d'une expression : la pile est l'outil canonique.",
        ],
      },
    ],
  },
  {
    id: "files",
    title: "Les files (FIFO)",
    level: 2,
    intro:
      "Premier arrivé, premier sorti : la file d'attente des programmes.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "File avec deque (pas avec une liste)",
        code: `from collections import deque\n\nfile = deque()\nfile.append("a\")      # enfiler à droite : O(1)\nfile.append("b\")\nfile.popleft()       # défiler à gauche : "a" — O(1)\n\n# À éviter : list.pop(0) est O(n) (décalage de tout le tableau)`,
      },
      {
        kind: "list",
        items: [
          "FIFO (First In, First Out) : ordre d'arrivée préservé.",
          "Usages : files d'impression, tâches à traiter, parcours en largeur (BFS), buffers.",
          "En Python, `collections.deque` donne `O(1)` des deux côtés ; `list.pop(0)` est un piège en `O(n)`.",
          "File de priorité : variante où l'ordre est défini par une priorité, pas par l'arrivée (implémentée par un tas).",
        ],
      },
    ],
  },
  {
    id: "tables-hachage",
    title: "Les tables de hachage",
    level: 2,
    intro:
      "Association clé → valeur en temps quasi constant : le dictionnaire des programmes.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Dictionnaire : la table de hachage de Python",
        code: `annuaire = {}\n\nannuaire["ada"] = "0601"      # insertion : O(1) en moyenne\nannuaire["grace"] = "0602\"\n\nannuaire["ada"]               # accès par clé : O(1) en moyenne\n"ada" in annuaire             # test d'existence : O(1) en moyenne\ndel annuaire["grace\"]         # suppression : O(1) en moyenne`,
      },
      {
        kind: "diagram",
        title: "Principe : hacher la clé pour trouver la case",
        lines: [
          'clé "ada" → fonction de hachage → case 42 → valeur "0601"',
          'clé "grace" → fonction de hachage → case 17 → valeur "0602"',
          "Pas de parcours : la clé indique directement où chercher.",
          "Collision (deux clés, même case) : chaînage ou sondage — voir niveau 3.",
        ],
      },
      {
        kind: "list",
        items: [
          "Complexités en moyenne : insertion, accès, suppression en `O(1)`. Pire cas `O(n)` si tout collisionne — rarissime avec une bonne fonction.",
          "Les clés doivent être hachables et immuables (chaînes, nombres, tuples — pas de listes).",
          "Pas d'ordre : une table de hachage ne trie pas — pour de l'ordonné, voir les arbres.",
          "Usages : caches, comptages, déduplication, index, mémoïsation.",
        ],
      },
    ],
  },
  {
    id: "ensembles",
    title: "Les ensembles",
    level: 2,
    intro:
      "Des éléments uniques, sans ordre : appartenir ou pas, vite.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Set : unicité et opérations ensemblistes",
        code: `visites = {"paris", "dakar"}\nvisites.add("paris\")       # sans effet : déjà présent\n"paris" in visites          # O(1) en moyenne\n\na = {"a", "b", "c\"}\nb = {"b", "c", "d\"}\na & b   # intersection : {"b", "c"}\na | b   # union : {"a", "b", "c", "d"}\na - b   # différence : {"a"}`,
      },
      {
        kind: "list",
        items: [
          "Implémentés comme des tables de hachage sans valeurs : `O(1)` en moyenne pour ajout, test, suppression.",
          "Usages : dédupliquer (`set(liste)`), tester l'appartenance, marquer les « déjà vus » (BFS, DFS).",
          "Opérations ensemblistes (`&`, `|`, `-`) directement disponibles — très expressives.",
        ],
      },
    ],
  },
  {
    id: "arbres-intro",
    title: "Les arbres",
    level: 2,
    intro:
      "Une hiérarchie de nœuds : la structure des données imbriquées.",
    blocks: [
      {
        kind: "diagram",
        title: "Vocabulaire d'un arbre",
        lines: [
          "          A            ← racine",
          "        /   \\",
          "       B     C         ← enfants de A ; B et C sont frères",
          "      / \\     \\",
          "     D   E     F       ← D, E, F sont des feuilles (sans enfants)",
          "profondeur de F = 2 (arêtes depuis la racine)",
          "hauteur de l'arbre = 2 (profondeur maximale)",
          "sous-arbre : B avec ses descendants D, E",
        ],
      },
      {
        kind: "list",
        items: [
          "Partout : DOM d'une page web, système de fichiers, hiérarchies d'entreprise, expressions mathématiques.",
          "Arbre binaire : chaque nœud a au plus 2 enfants — le cas le plus étudié (recherche, tas).",
          "La hauteur détermine les coûts : un arbre équilibré de `n` nœuds a une hauteur en `O(log n)`.",
        ],
      },
    ],
  },
  {
    id: "graphes-intro",
    title: "Les graphes",
    level: 2,
    intro:
      "Nœuds et arêtes sans hiérarchie : réseaux, cartes, dépendances.",
    blocks: [
      {
        kind: "diagram",
        title: "Un graphe : relations quelconques",
        lines: [
          "    A ─── B",
          "    │   ╱ │",
          "    │ ╱   │",
          "    C ─── D",
          "Pas de racine, pas de sens imposé : A est relié à B et C,",
          "B à A, C et D… Les arbres sont des graphes sans cycle.",
        ],
      },
      {
        kind: "list",
        items: [
          "Modélisent : réseaux sociaux (amitiés), cartes routières (villes + routes), dépendances entre tâches.",
          "Graphe orienté : les arêtes ont un sens (A → B, pas forcément B → A) — ex. « suit » sur un réseau social.",
          "Pondéré : chaque arête a un coût — ex. distance, temps, prix. Non pondéré : seule l'existence du lien compte.",
          "Représentation standard : liste d'adjacence (voir niveau 3).",
        ],
      },
    ],
  },
  {
    id: "choisir-structure",
    title: "Choisir la bonne structure",
    level: 2,
    intro:
      "La méthode : partir des opérations, pas de la structure.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Lister les opérations",
            detail:
              "Que fera le programme le plus souvent : chercher par clé ? parcourir en ordre ? insérer au milieu ? Chaque besoin pointe vers des candidats.",
          },
          {
            title: "Identifier l'opération critique",
            detail:
              "Celle exécutée des millions de fois, ou sur des millions d'éléments. C'est elle qui doit être optimale — pas les autres.",
          },
          {
            title: "Comparer les candidats",
            detail:
              "Tableau des complexités en main : qui offre le meilleur coût sur l'opération critique, à coût acceptable sur le reste ?",
          },
          {
            title: "Commencer simple",
            detail:
              "Une liste ou un dictionnaire suffit dans 90 % des cas. N'introduire une structure sophistiquée que mesurée à l'appui.",
          },
        ],
      },
      {
        kind: "table",
        headers: ["Besoin dominant", "Structure à envisager"],
        rows: [
          ["Accès par index", "Tableau"],
          ["Recherche par clé", "Table de hachage"],
          ["Données triées + insertions", "Arbre équilibré"],
          ["Ordre d'arrivée (file d'attente)", "File (deque)"],
          ["Dernier arrivé d'abord (annulation)", "Pile"],
          ["Relations entre entités", "Graphe"],
          ["Préfixes / autocomplétion", "Trie"],
          ["Toujours le min/max", "Tas (file de priorité)"],
        ],
      },
    ],
  },
  {
    id: "premiers-projets",
    title: "Premiers projets",
    level: 2,
    intro:
      "Implémenter soi-même pour comprendre : les classiques.",
    blocks: [
      {
        kind: "list",
        items: [
          "Liste chaînée complète : insertion en tête/queue, suppression, recherche, affichage — puis comparer les performances avec une liste Python.",
          "Pile et file : les implémenter, puis résoudre le problème des parenthèses équilibrées et simuler une file d'impression.",
          "Table de hachage simplifiée : tableau + fonction de hachage naïve + chaînage pour les collisions — comprendre ce que `dict` fait pour vous.",
          "Annuaire de contacts : même besoin implémenté en liste, en liste triée et en dictionnaire ; mesurer le temps de recherche sur 100 000 entrées.",
          "Arbre généalogique : modéliser une famille en arbre, écrire les fonctions « ancêtres de X » et « descendants de X ».",
        ],
      },
      {
        kind: "text",
        text: "Le but n'est pas de réinventer la bibliothèque standard — c'est de comprendre les mécanismes. En production, on utilise les implémentations éprouvées du langage.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "tableaux-dynamiques",
    title: "Tableaux dynamiques",
    level: 3,
    intro:
      "Taille fixe en interne, taille variable en apparence : le doublement de capacité.",
    blocks: [
      {
        kind: "text",
        text: "Un tableau dynamique (`list` Python, `ArrayList` Java) alloue un tableau interne plus grand que nécessaire. Quand il est plein, il alloue un tableau deux fois plus grand et recopie. Grâce au doublement, le coût amorti d'un ajout reste `O(1)` — voir l'analyse amortie côté algorithmique.",
      },
      {
        kind: "diagram",
        title: "Ajouts successifs : capacité vs taille",
        lines: [
          "ajouts :  1  2  3  4  5  6  7  8  9",
          "taille :  1  2  3  4  5  6  7  8  9",
          "capacité: 1  2  4  4  8  8  8  8  16",
          "              ↑        ↑              ↑",
          "           recopie   recopie       recopie",
          "Chaque élément est recopié O(log n) fois → O(1) amorti par ajout.",
        ],
      },
      {
        kind: "list",
        items: [
          "Pourquoi doubler et pas +1 : avec +1, chaque ajout recopierait tout → `O(n)` par ajout, `O(n²)` au total.",
          "Surcoût mémoire : jusqu'à 2× la taille utile dans le pire cas — acceptable en pratique.",
          "Insertion au début ou au milieu : toujours `O(n)` (décalage) — le tableau dynamique ne change rien à ça.",
        ],
      },
    ],
  },
  {
    id: "listes-doublement-chainees",
    title: "Listes doublement chaînées",
    level: 3,
    intro:
      "Un pointeur vers l'avant et un vers l'arrière : suppression en `O(1)` dans les deux sens.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Nœud doublement chaîné et suppression",
        code: `class Noeud:\n    def __init__(self, valeur):\n        self.valeur = valeur\n        self.precedent = None\n        self.suivant = None\n\ndef supprimer(noeud):\n    # O(1) : on a le nœud, on recâble ses voisins\n    if noeud.precedent:\n        noeud.precedent.suivant = noeud.suivant\n    if noeud.suivant:\n        noeud.suivant.precedent = noeud.precedent`,
      },
      {
        kind: "list",
        items: [
          "Parcours dans les deux sens ; insertion/suppression en `O(1)` avec le nœud en main.",
          "Coût : deux références par nœud au lieu d'une — plus de mémoire, plus d'allocations.",
          "Usage célèbre : les caches LRU (liste doublement chaînée + table de hachage : accès `O(1)` et éviction du moins récent en `O(1)`).",
        ],
      },
    ],
  },
  {
    id: "hachage-collisions",
    title: "Collisions de hachage",
    level: 3,
    intro:
      "Quand deux clés tombent dans la même case : chaînage et adressage ouvert.",
    blocks: [
      {
        kind: "diagram",
        title: "Deux stratégies",
        lines: [
          "Chaînage (chaining) :              Adressage ouvert (open addressing) :",
          "case 5 : [k1] → [k7] → /           case 5 : [k1]",
          "case 6 : /                          case 6 : [k7]  ← sondage : case suivante",
          "chaque case = une liste             chaque case = un élément, on sonde",
          "d'éléments en collision             jusqu'à trouver une case libre",
        ],
      },
      {
        kind: "fields",
        title: "Comparer les stratégies",
        fields: [
          {
            label: "Chaînage",
            value:
              "Simple, pas de limite de remplissage stricte. Mémoire : une liste par case + allocations des nœuds. Bien quand le nombre d'éléments varie beaucoup.",
          },
          {
            label: "Adressage ouvert",
            value:
              "Meilleure localité (tout dans le tableau), pas d'allocations. Mais sensible au taux de remplissage : au-delà de ~70 %, les performances s'effondrent — il faut réhacher.",
          },
          {
            label: "Facteur de charge",
            value:
              "Éléments / cases. Le paramètre clé : quand il dépasse un seuil, la table double de taille et tout est réhaché (opération `O(n)` amortie).",
          },
        ],
      },
      {
        kind: "text",
        text: "Python utilise l'adressage ouvert pour `dict` ; Java utilise le chaînage (avec arbres pour les longues chaînes depuis Java 8). Dans les deux cas, le programmeur n'a pas à choisir — mais comprendre le mécanisme explique les pics de latence lors des réhachages.",
      },
    ],
  },
  {
    id: "fonctions-hachage",
    title: "Fonctions de hachage",
    level: 3,
    intro:
      "La qualité d'une table de hachage dépend de sa fonction : uniforme et rapide.",
    blocks: [
      {
        kind: "list",
        items: [
          "Une bonne fonction répartit uniformément les clés sur les cases : sans biais, les collisions restent rares et les opérations en `O(1)` moyen.",
          "Elle doit être déterministe (même clé → même hachage) et rapide — elle est appelée à chaque accès.",
          "Hachage non cryptographique (tables) vs cryptographique (SHA-256, intégrité, mots de passe) : des objectifs différents. Une fonction de table n'a pas besoin de résister aux attaques — sauf contre les attaques par collision (DoS par hachage), d'où les fonctions « randomized » des langages modernes.",
          "En Python, `hash()` est la fonction intégrée ; les objets mutables (listes) ne sont pas hachables par conception.",
        ],
      },
      {
        kind: "text",
        text: "Le pire cas `O(n)` d'une table de hachage survient quand toutes les clés collisionnent — avec une fonction uniforme, c'est un événement de probabilité négligeable, pas un cas à optimiser.",
      },
    ],
  },
  {
    id: "tas-file-priorite",
    title: "Tas et files de priorité",
    level: 3,
    intro:
      "Accéder au minimum (ou maximum) en `O(1)`, l'extraire en `O(log n)`.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Tas binaire stocké dans un tableau",
        code: `import heapq\n\ntas = []\nfor priorite in [5, 1, 4, 2, 3]:\n    heapq.heappush(tas, priorite)   # O(log n)\n\nheapq.heappop(tas)   # 1 — le minimum sort en premier : O(log n)\ntas[0]               # 2 — lecture du minimum : O(1)`,
      },
      {
        kind: "diagram",
        title: "Tas binaire (min) et son tableau",
        lines: [
          "        1",
          "      /   \\",
          "     2     4",
          "    / \\",
          "   5   3",
          "tableau : [1, 2, 4, 5, 3]",
          "parent(i) = (i-1)//2, enfants : 2i+1, 2i+2",
          "Propriété : chaque parent ≤ ses enfants → le min est en [0].",
        ],
      },
      {
        kind: "list",
        items: [
          "Insertion et extraction : `O(log n)` (remontée/descente dans l'arbre).",
          "Recherche d'un élément quelconque : `O(n)` — le tas n'est pas fait pour chercher, seulement pour le min/max.",
          "Usages : Dijkstra, ordonnancement, top-k, fusion de flux triés.",
        ],
      },
    ],
  },
  {
    id: "abr",
    title: "Arbres binaires de recherche",
    level: 3,
    intro:
      "Données triées et dynamiques : recherche, insertion, suppression en `O(log n)` si équilibré.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "ABR : insertion et parcours infixe",
        code: `class Noeud:\n    def __init__(self, cle):\n        self.cle = cle\n        self.gauche = self.droit = None\n\ndef inserer(racine, cle):\n    if racine is None:\n        return Noeud(cle)\n    if cle < racine.cle:\n        racine.gauche = inserer(racine.gauche, cle)\n    elif cle > racine.cle:\n        racine.droit = inserer(racine.droit, cle)\n    return racine\n\ndef infixe(racine):\n    # parcours infixe d'un ABR = clés triées\n    if racine is None:\n        return []\n    return infixe(racine.gauche) + [racine.cle] + infixe(racine.droit)`,
      },
      {
        kind: "text",
        text: "Invariant : tout le sous-arbre gauche < nœud < tout le sous-arbre droit. La recherche élimine la moitié restante à chaque étape — comme une recherche binaire, mais sur une structure qui accepte insertions et suppressions.",
      },
      {
        kind: "list",
        items: [
          "Talons d'Achille : insertions triées → arbre dégénéré en liste, `O(n)`. D'où les arbres équilibrés (AVL, rouge-noir).",
          "En pratique : utiliser les structures triées du langage (`bisect` + liste, `sortedcontainers`, `TreeMap`), pas son propre ABR.",
        ],
      },
    ],
  },
  {
    id: "parcours-arbres",
    title: "Parcours d'arbres",
    level: 3,
    intro:
      "Préfixe, infixe, postfixe, largeur : quatre ordres, quatre usages.",
    blocks: [
      {
        kind: "fields",
        title: "Les quatre parcours",
        fields: [
          {
            label: "Préfixe (nœud, gauche, droite)",
            value:
              "Copier ou sérialiser un arbre : le parent est créé avant ses enfants.",
          },
          {
            label: "Infixe (gauche, nœud, droite)",
            value:
              "Sur un ABR : les clés dans l'ordre trié. Le parcours « naturel » des données ordonnées.",
          },
          {
            label: "Postfixe (gauche, droite, nœud)",
            value:
              "Traiter les enfants avant le parent : suppression d'un arbre, évaluation d'expressions.",
          },
          {
            label: "Largeur (BFS, par niveaux)",
            value:
              "Avec une file : traite niveau par niveau. Affichage, recherche du nœud le moins profond.",
          },
        ],
      },
      {
        kind: "text",
        text: "Tous sont en `O(n)` — chaque nœud visité une fois. Les trois premiers sont naturellement récursifs ; la largeur utilise une file.",
      },
    ],
  },
  {
    id: "arbres-equilibres",
    title: "Arbres équilibrés",
    level: 3,
    intro:
      "Garantir la hauteur logarithmique : AVL, rouge-noir, B-arbres.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois familles",
        fields: [
          {
            label: "AVL",
            value:
              "Les hauteurs des deux sous-arbres diffèrent d'au plus 1. Recherches très rapides ; insertions un peu plus coûteuses (rotations fréquentes).",
          },
          {
            label: "Rouge-noir",
            value:
              "Équilibre moins strict via des règles de coloration : moins de rééquilibrages. Le compromis standard (`TreeMap` Java, `std::map` C++).",
          },
          {
            label: "B-arbres",
            value:
              "Nœuds à plusieurs clés, pensés pour le disque : un nœud = un bloc lu d'un coup. La structure des index de bases de données.",
          },
        ],
      },
      {
        kind: "text",
        text: "Mécanisme commun : des rotations locales après insertion/suppression rétablissent l'équilibre en `O(log n)`. On n'implémente (presque) jamais ces arbres soi-même : on utilise ceux des bibliothèques — mais on doit savoir quand ils servent : ensemble trié avec insertions et suppressions fréquentes.",
      },
    ],
  },
  {
    id: "tries",
    title: "Tries (arbres de préfixes)",
    level: 3,
    intro:
      "Mots rangés par préfixes communs : recherche en `O(m)`, autocomplétion naturelle.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Trie : insertion et recherche",
        code: `class Trie:\n    def __init__(self):\n        self.enfants = {}\n        self.fin_de_mot = False\n\n    def inserer(self, mot):\n        noeud = self\n        for lettre in mot:\n            noeud = noeud.enfants.setdefault(lettre, Trie())\n        noeud.fin_de_mot = True\n\n    def mots_avec_prefixe(self, prefixe):\n        noeud = self\n        for lettre in prefixe:          # descendre jusqu'au préfixe\n            noeud = noeud.enfants.get(lettre)\n            if noeud is None:\n                return []\n        return self._collecter(noeud, prefixe)\n\n    def _collecter(self, noeud, prefixe):\n        mots = [prefixe] if noeud.fin_de_mot else []\n        for lettre, enfant in noeud.enfants.items():\n            mots += self._collecter(enfant, prefixe + lettre)\n        return mots`,
      },
      {
        kind: "list",
        items: [
          "Recherche d'un mot de longueur `m` en `O(m)`, indépendante du nombre de mots stockés.",
          "Autocomplétion : descendre au préfixe, collecter le sous-arbre — l'opération est native.",
          "Coût : un nœud par préfixe distinct — gourmand en mémoire sur de gros dictionnaires (variantes compactes : radix trees).",
        ],
      },
    ],
  },
  {
    id: "graphes-representations",
    title: "Graphes : représentations",
    level: 3,
    intro:
      "Liste d'adjacence vs matrice : le bon stockage selon la densité.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Liste d'adjacence",
        code: `graphe = {\n    "A": ["B", "C"],\n    "B": ["A", "D"],\n    "C": ["A"],\n    "D": ["B"],\n}\n# Voisins de B : graphe["B"]\n# Ajouter une arête A-D : graphe["A"].append("D")`,
      },
      {
        kind: "table",
        headers: ["", "Liste d'adjacence", "Matrice d'adjacence"],
        rows: [
          ["Mémoire", "O(V + E)", "O(V²)"],
          ["Lister les voisins", "O(degré)", "O(V)"],
          ["Tester une arête", "O(degré)", "O(1)"],
          ["Idéal pour", "Graphes creux (cas général)", "Graphes denses, petits graphes"],
        ],
      },
      {
        kind: "text",
        text: "Les graphes réels sont presque toujours creux (réseaux sociaux, routage, dépendances) : la liste d'adjacence est le choix par défaut. Variante : liste d'arêtes (`[(A, B), (B, C)]`) pour Kruskal et les algorithmes qui trient les arêtes.",
      },
    ],
  },
  {
    id: "parcours-graphes",
    title: "Parcours de graphes : BFS et DFS",
    level: 3,
    intro:
      "Explorer un graphe : en largeur pour les plus courts chemins, en profondeur pour la structure.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "BFS (file) et DFS (pile/récursion)",
        code: `from collections import deque\n\ndef bfs(graphe, depart):\n    vus, file, ordre = {depart}, deque([depart]), []\n    while file:\n        n = file.popleft()\n        ordre.append(n)\n        for v in graphe[n]:\n            if v not in vus:\n                vus.add(v); file.append(v)\n    return ordre          # par vagues : plus court chemin (non pondéré)\n\ndef dfs(graphe, depart, vus=None):\n    vus = vus or {depart}\n    for v in graphe[depart]:\n        if v not in vus:\n            vus.add(v); dfs(graphe, v, vus)\n    return vus`,
      },
      {
        kind: "fields",
        title: "BFS ou DFS ?",
        fields: [
          {
            label: "BFS (file, FIFO)",
            value:
              "Explore par vagues : donne le plus court chemin en nombre d'arêtes. Usages : plus court chemin non pondéré, diffusion, niveaux.",
          },
          {
            label: "DFS (pile, LIFO)",
            value:
              "Va au fond d'abord : détecte les cycles, fait le tri topologique, trouve les composantes connexes. Plus simple en récursif.",
          },
          {
            label: "Point commun",
            value:
              "Les deux sont en O(V + E) et marquent les sommets visités — sans marquage, un cycle = boucle infinie.",
          },
        ],
      },
    ],
  },
  {
    id: "union-find",
    title: "Union-Find",
    level: 3,
    intro:
      "Tester la connectivité en temps quasi constant : l'outil des composantes.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Union-Find avec compression de chemin",
        code: `class UnionFind:\n    def __init__(self, n):\n        self.parent = list(range(n))\n\n    def trouver(self, x):\n        while self.parent[x] != x:\n            self.parent[x] = self.parent[self.parent[x]]\n            x = self.parent[x]\n        return x\n\n    def unir(self, a, b):\n        self.parent[self.trouver(a)] = self.trouver(b)`,
      },
      {
        kind: "text",
        text: "Chaque ensemble a un représentant ; la compression de chemin aplatit l'arbre à chaque recherche. Résultat : opérations en temps quasi constant — `O(α(n))`, où α est la fonction inverse d'Ackermann, inférieure à 5 pour toute entrée réaliste.",
      },
      {
        kind: "list",
        items: [
          "Usages : composantes connexes, Kruskal (arbre couvrant minimal), détection de cycles en `O(E α(V))`.",
          "Bien plus simple qu'un BFS répété pour des questions de connectivité dynamique.",
        ],
      },
    ],
  },
  {
    id: "skip-lists",
    title: "Skip lists",
    level: 3,
    intro:
      "Un arbre équilibré sans rotations : des listes à plusieurs niveaux.",
    blocks: [
      {
        kind: "diagram",
        title: "Skip list : des raccourcis probabilistes",
        lines: [
          "niveau 2 :  ──► 1 ────────────────────► 9 ──► /",
          "niveau 1 :  ──► 1 ──► 4 ──► 6 ──► 9 ──► /",
          "niveau 0 :  ──► 1 ─► 2 ─► 4 ─► 6 ─► 7 ─► 9 ──► /",
          "Recherche : descendre dès que le prochain dépasse la cible.",
          "Chaque élément monte d'un niveau avec proba 1/2 → O(log n) moyen,",
          "sans aucune rotation : implémentation bien plus simple qu'un AVL.",
        ],
      },
      {
        kind: "text",
        text: "Inventées comme alternative simple aux arbres équilibrés, les skip lists offrent recherche, insertion et suppression en `O(log n)` moyen grâce au hasard, pas à des invariants complexes. Utilisées dans Redis (sorted sets) et LevelDB (memtable).",
      },
    ],
  },
  {
    id: "structures-immuables",
    title: "Structures immuables et persistantes",
    level: 3,
    intro:
      "Ne jamais modifier : créer une nouvelle version qui partage l'ancien.",
    blocks: [
      {
        kind: "text",
        text: "Une structure persistante conserve ses versions précédentes : « modifier » crée une nouvelle version qui partage la plupart des nœuds avec l'ancienne (partage structurel). Coût : `O(log n)` nœuds recréés le long du chemin modifié, le reste est partagé.",
      },
      {
        kind: "list",
        items: [
          "Avantages : pas d'aliasing surprise, historique gratuit (annuler = revenir à l'ancienne version), thread-safety naturelle.",
          "En Python : tuples et `frozenset` ; en JavaScript : spread (`[...tab, x]`) — mais sans partage structurel optimisé.",
          "Les langages fonctionnels (Clojure, Haskell) en font leur fondation : vecteurs persistants en `O(log n)` par opération.",
          "Compromis : surcoût constant et mémoire des anciennes versions — à utiliser quand l'historique ou la sécurité valent ce prix.",
        ],
      },
    ],
  },
  {
    id: "tableau-recap-complexites",
    title: "Tableau récapitulatif des complexités",
    level: 3,
    intro:
      "La fiche mémo : opérations courantes de chaque structure.",
    blocks: [
      {
        kind: "table",
        headers: ["Structure", "Accès", "Recherche", "Insertion", "Suppression"],
        rows: [
          ["Tableau", "O(1)", "O(n)", "O(n)", "O(n)"],
          ["Tableau dynamique (fin)", "O(1)", "O(n)", "O(1) amorti", "O(1) amorti"],
          ["Liste chaînée", "O(n)", "O(n)", "O(1)*", "O(1)*"],
          ["Pile / File", "—", "—", "O(1)", "O(1)"],
          ["Table de hachage", "—", "O(1)†", "O(1)†", "O(1)†"],
          ["ABR équilibré", "—", "O(log n)", "O(log n)", "O(log n)"],
          ["Tas (min)", "O(1) (min)", "O(n)", "O(log n)", "O(log n) (min)"],
        ],
      },
      {
        kind: "text",
        text: "* avec le nœud déjà en main. † en moyenne ; pire cas `O(n)`. Ce tableau vaut d'être su par cœur : c'est lui qui guide le choix de structure en entretien comme en production.",
      },
    ],
  },
  {
    id: "localite-cache",
    title: "Localité mémoire et cache",
    level: 3,
    intro:
      "Pourquoi le `O(n)` théorique ne raconte pas toute l'histoire : le cache CPU.",
    blocks: [
      {
        kind: "text",
        text: "Le CPU lit la mémoire par blocs (lignes de cache, ~64 octets) : accéder à un élément charge ses voisins gratuitement. Un tableau contigu profite à plein de cet effet ; une liste chaînée aux nœuds dispersés subit un défaut de cache à chaque nœud.",
      },
      {
        kind: "list",
        items: [
          "Conséquence : parcourir un tableau est plusieurs fois plus rapide que parcourir une liste chaînée de même taille, à complexité `O(n)` égale.",
          "C'est pourquoi les tableaux dynamiques battent les listes chaînées en pratique sur presque tous les usages.",
          "Les B-arbres et les tables à adressage ouvert sont conçus pour la localité : regrouper ce qu'on accède ensemble.",
          "Le grand O compare les croissances ; la localité explique les constantes. Les deux comptent.",
        ],
      },
    ],
  },
  {
    id: "deque",
    title: "Deque : file à double extrémité",
    level: 3,
    intro:
      "Ajouter et retirer des deux côtés en `O(1)` : pile + file en une structure.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "deque : les quatre opérations",
        code: `from collections import deque\n\nd = deque()\nd.append("fin\")        # droite : O(1)\nd.appendleft("début\")   # gauche : O(1)\nd.pop()                 # droite : O(1)\nd.popleft()            # gauche : O(1)`,
      },
      {
        kind: "list",
        items: [
          "Implémentation : tableau de blocs chaînés — `O(1)` des deux côtés sans les défauts de la liste chaînée pure.",
          "Usages : fenêtre glissante (garder les k derniers), BFS, historique d'annulation borné (`maxlen`).",
          "`deque(maxlen=n)` : taille bornée automatique — les ajouts éjectent l'autre extrémité, parfait pour un historique.",
        ],
      },
    ],
  },
  {
    id: "generiques-types",
    title: "Structures génériques",
    level: 3,
    intro:
      "Une structure, plusieurs types : la généricité.",
    blocks: [
      {
        kind: "text",
        text: "Une pile d'entiers et une pile de chaînes partagent la même logique : les langages typés permettent d'écrire la structure une fois, paramétrée par le type des éléments (`List<int>`, `Array<string>`). En Python, le typage est dynamique ; on documente avec les annotations (`list[int]`).",
      },
      {
        kind: "list",
        items: [
          "Avantage : une seule implémentation testée, réutilisée pour tous les types — sans duplication.",
          "En Python : `def empiler(pile: list[int], x: int)` — l'annotation aide le lecteur et l'éditeur, sans coût d'exécution.",
          "En TypeScript/Java : la généricité est vérifiée à la compilation — une `Pile<string>` refuse les nombres.",
        ],
      },
    ],
  },
  {
    id: "iterateurs",
    title: "Itérateurs",
    level: 3,
    intro:
      "Parcourir sans exposer l'intérieur : le contrat de parcours.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Itérateur sur une liste chaînée",
        code: `class ListeChainee:\n    def __init__(self):\n        self.tete = None\n\n    def __iter__(self):\n        courant = self.tete\n        while courant is not None:\n            yield courant.valeur      # générateur : paresseux, O(1) mémoire\n            courant = courant.suivant\n\n# Usage : for x in ma_liste — sans savoir comment c'est stocké`,
      },
      {
        kind: "text",
        text: "L'itérateur sépare le parcours du stockage : le code client écrit `for x in structure` sans savoir s'il s'agit d'un tableau, d'une liste ou d'un arbre. En Python, les générateurs (`yield`) créent des itérateurs paresseux — chaque élément est produit à la demande, sans construire de liste intermédiaire.",
      },
    ],
  },
  {
    id: "hachage-vs-arbre",
    title: "Table de hachage ou arbre : trancher",
    level: 3,
    intro:
      "Les deux structures « associatives » : quand choisir l'une ou l'autre.",
    blocks: [
      {
        kind: "table",
        headers: ["Besoin", "Table de hachage", "Arbre équilibré"],
        rows: [
          ["Accès par clé exact", "O(1) — imbattable", "O(log n)"],
          ["Parcours trié", "Impossible (pas d'ordre)", "O(n) — naturel"],
          ["Intervalle de clés", "Non supporté", "O(log n + k)"],
          ["Min / max", "O(n)", "O(log n)"],
          ["Mémoire", "Surcoût du tableau + facteur de charge", "Un nœud par élément"],
          ["Pire cas", "O(n) (rare)", "O(log n) garanti"],
        ],
      },
      {
        kind: "text",
        text: "Règle : table de hachage par défaut pour l'accès par clé ; arbre dès que l'ordre compte (tri, intervalles, min/max). Les bases de données font exactement ce choix : index hash pour l'égalité, B-arbres pour le tri et les intervalles.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pièges classiques quand on manipule des structures.",
    blocks: [
      {
        kind: "list",
        items: [
          "Aliasing : deux variables pointent le même objet — modifier l'une modifie l'autre. Copier explicitement (`list(x)`, `copy.deepcopy`) quand l'indépendance compte.",
          "Muter pendant l'itération : supprimer d'une liste qu'on parcourt saute des éléments — itérer sur une copie ou construire une nouvelle liste.",
          "`list.pop(0)` en boucle : `O(n)` par pop, `O(n²)` au total — utiliser `deque.popleft()`.",
          "Récursion trop profonde sur une structure dégénérée (liste chaînée de 100 000 nœuds) : la pile déborde — version itérative.",
          "Oublier le cas vide : pile/file/arbre vide — tester `if not pile` avant `pop()`.",
          "Clés mutables dans un dictionnaire : une liste comme clé lève `TypeError` — utiliser un tuple.",
          "Confondre `==` (égalité de contenu) et `is` (identité) : deux nœuds égaux ne sont pas le même nœud.",
          "Supposer un ordre dans un `dict`/`set` : l'ordre d'insertion est garanti en Python 3.7+, mais ce n'est pas un tri.",
        ],
      },
    ],
  },
  {
    id: "debugging",
    title: "Déboguer des structures",
    level: 3,
    intro:
      "Quand la structure se corrompt : visualiser et vérifier les invariants.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Afficher la structure",
            detail:
              "Écrire une méthode `__repr__` ou `afficher()` : une liste chaînée qui s'imprime `1 -> 2 -> 3`, un arbre en texte indenté. L'œil repère un chaînage cassé instantanément.",
          },
          {
            title: "Vérifier les invariants",
            detail:
              "ABR : infixe trié ? Tas : parent ≤ enfants ? Liste : pas de cycle (lièvre et tortue) ? Coder ces vérifications comme fonctions de test.",
          },
          {
            title: "Réduire au plus petit cas",
            detail:
              "Reproduire avec 2-3 éléments. Un bug de suppression visible sur 3 nœuds se comprend ; sur 10 000, non.",
          },
          {
            title: "Tracer les pointeurs",
            detail:
              "Dessiner les nœuds et les flèches sur papier à chaque étape de l'opération fautive — la flèche oubliée apparaît.",
          },
        ],
      },
    ],
  },
  {
    id: "testing",
    title: "Tester les structures",
    level: 3,
    intro:
      "Les propriétés à vérifier pour chaque structure implémentée.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Tests d'une pile",
        code: `def test_pile(Pile):\n    p = Pile()\n    assert p.est_vide()\n    p.empiler(1); p.empiler(2)\n    assert not p.est_vide()\n    assert p.sommet() == 2\n    assert p.depiler() == 2     # LIFO\n    assert p.depiler() == 1\n    assert p.est_vide()\n    # Stress : 10 000 opérations contre une liste de référence\n    import random\n    p, ref = Pile(), []\n    for _ in range(10_000):\n        x = random.randint(0, 99)\n        p.empiler(x); ref.append(x)\n    while ref:\n        assert p.depiler() == ref.pop()`,
      },
      {
        kind: "list",
        items: [
          "Tester contre une implémentation de référence (souvent la structure native du langage) sur des opérations aléatoires.",
          "Cas limites : vide, un élément, doublons, alternance d'opérations.",
          "Pour les arbres : vérifier l'invariant après chaque opération (infixe trié, hauteur bornée).",
          "Pour les tables de hachage : forcer les collisions (petite table) pour tester le chaînage.",
        ],
      },
    ],
  },
  {
    id: "bibliotheque-vs-implementer",
    title: "Bibliothèque vs implémentation maison",
    level: 3,
    intro:
      "Quand réinventer la roue — et quand surtout pas.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Implémenter soi-même", "Utiliser la bibliothèque"],
        rows: [
          ["Objectif", "Apprendre, comprendre", "Produire, être fiable"],
          ["Performance", "Souvent moins bonne", "Optimisée en C, testée par des millions"],
          ["Bugs", "Vos bugs à découvrir", "Corrigés depuis des années"],
          ["Cas d'usage", "Exercice, entretien, besoin exotique", "Tout le code de production"],
        ],
      },
      {
        kind: "text",
        text: "La règle est simple : on implémente pour apprendre, on utilise les bibliothèques pour livrer. Les exceptions — structures exotiques absentes des bibliothèques, contraintes temps réel extrêmes — sont rares et se décident mesurées à l'appui.",
      },
    ],
  },
  {
    id: "projets-avances",
    title: "Projets avancés",
    level: 3,
    intro:
      "Des projets qui combinent plusieurs structures.",
    blocks: [
      {
        kind: "list",
        items: [
          "Cache LRU : table de hachage + liste doublement chaînée — `get` et `put` en `O(1)` avec éviction du moins récemment utilisé. Le classique des entretiens.",
          "Correcteur orthographique : trie des mots valides + distance d'édition pour suggérer les corrections.",
          "Index inversé : table mot → liste de documents — le cœur d'un mini moteur de recherche sur des fichiers texte.",
          "File de priorité de tâches : tas avec mise à jour de priorité — planificateur avec repriorisation.",
          "Graphe social : liste d'adjacence + BFS pour les suggestions d'amis (« amis d'amis »), Union-Find pour les communautés.",
          "Éditeur de texte simplifié : deux piles (ou liste doublement chaînée avec curseur) pour insertion/suppression/annulation efficaces.",
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro:
      "Les références pour approfondir les structures de données.",
    blocks: [
      {
        kind: "list",
        items: [
          "« Introduction to Algorithms » (Cormen, Leiserson, Rivest, Stein) : les chapitres 10 à 14 couvrent les structures fondamentales avec rigueur.",
          "« Grokking Algorithms » (Aditya Bhargava) : tableaux, listes, hachage et graphes expliqués visuellement.",
          "Visualgo : animations pas à pas des structures (listes, arbres, tas, graphes) — voir les pointeurs bouger.",
          "Documentation Python — `collections` (deque, Counter, defaultdict) et `heapq` : les structures natives à connaître par cœur.",
          "Open Data Structures (Pat Morin, livre gratuit en ligne) : un manuel complet, avec pseudocode clair, couvrant jusqu'aux structures avancées.",
        ],
      },
      {
        kind: "text",
        text: "Les livres et plateformes sont cités par leur nom exact pour être retrouvés sans ambiguïté.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Les structures maîtrisées, voici les prolongements naturels.",
    blocks: [
      {
        kind: "fields",
        title: "Pistes de progression",
        fields: [
          {
            label: "`algorithms`",
            value:
              "Le jumeau : tris, graphes, programmation dynamique — les algorithmes qui s'exécutent sur ces structures.",
          },
          {
            label: "`python`",
            value:
              "`collections`, `heapq`, `bisect`, `functools.lru_cache` : la bibliothèque standard regorge de structures prêtes à l'emploi.",
          },
          {
            label: "`databases`",
            value:
              "B-arbres, index, plans d'exécution : les bases de données sont des structures de données à l'échelle du disque.",
          },
          {
            label: "`machine-learning`",
            value:
              "Arbres de décision, k-d trees pour les plus proches voisins : le ML réutilise ces structures pour indexer et chercher.",
          },
          {
            label: "Prochain pas concret",
            value:
              "Implémenter un cache LRU de zéro, tests inclus : c'est le projet qui prouve qu'on a compris hachage + chaînage + complexité.",
          },
        ],
      },
    ],
  },
];

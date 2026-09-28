import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète d'Algorithmique : penser en algorithmes,
 * analyser la complexité, maîtriser les grandes familles d'algorithmes.
 * Concepts purs : aucun outil à installer, tout se pratique en code.
 */
export const LEARNING_ALGORITHMS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Ce qu'est un algorithme, et pourquoi c'est le cœur de l'informatique.",
    blocks: [
      {
        kind: "text",
        text: "Un algorithme est une suite finie d'instructions précises qui résout un problème : trier des noms, trouver le chemin le plus court, compresser une image. C'est une recette — sans ambiguïté, exécutable par une machine, avec un début et une fin garantis.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est central : le même problème admet des algorithmes très différents. Trier un million d'éléments prend quelques secondes avec un bon tri, et des heures avec un mauvais. Choisir le bon algorithme change l'ordre de grandeur du temps de calcul, pas juste quelques pourcents.",
      },
      {
        kind: "text",
        text: "Algorithme vs programme : l'algorithme est l'idée (le tri fusion), le programme est son implémentation dans un langage. On étudie les algorithmes indépendamment du langage : la logique compte, pas la syntaxe.",
      },
    ],
  },
  {
    id: "complexite-apercu",
    title: "La complexité en 30 secondes",
    level: 1,
    intro:
      "L'idée maîtresse de toute l'algorithmique : comment le temps de calcul grandit avec la taille des données.",
    blocks: [
      {
        kind: "diagram",
        title: "Le temps de calcul en fonction de la taille des données",
        lines: [
          "taille des données (n)",
          "     │",
          "     ├── O(1)       : constant — accéder à un élément par son index",
          "     ├── O(log n)   : logarithmique — recherche binaire",
          "     ├── O(n)       : linéaire — parcourir une fois",
          "     ├── O(n log n) : les bons tris (fusion, rapide)",
          "     ├── O(n²)      : deux boucles imbriquées",
          "     └── O(2ⁿ)      : exponentiel — impraticable dès n = 40",
          "     │",
          "     ▼",
          "Doubler n : O(n) double le temps, O(n²) le quadruple.",
        ],
      },
      {
        kind: "text",
        text: "La notation `O(...)` — dite « grand O » — décrit la croissance du temps (ou de la mémoire) quand les données grandissent. C'est elle qui permet de comparer deux algorithmes sans les exécuter : un `O(n log n)` battra toujours un `O(n²)` sur de gros volumes, quel que soit le langage.",
      },
      {
        kind: "list",
        items: [
          "La complexité se mesure en fonction de `n`, la taille de l'entrée.",
          "On s'intéresse au pire cas et à la croissance, pas aux microsecondes.",
          "Deux algorithmes corrects peuvent différer d'un facteur un million : c'est ça, l'algorithmique.",
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
      "Ce qu'il faut savoir coder avant d'étudier les algorithmes — et pourquoi.",
    blocks: [
      {
        kind: "fields",
        title: "Bases de programmation requises",
        fields: [
          {
            label: "Boucles (`for`, `while`)",
            value:
              "La plupart des algorithmes sont des boucles structurées. Il faut les écrire sans hésiter, y compris des boucles imbriquées.",
          },
          {
            label: "Fonctions",
            value:
              "Découper un traitement en fonctions, passer des paramètres, retourner des valeurs. La récursivité repose entièrement sur les appels de fonctions.",
          },
          {
            label: "Tableaux / listes",
            value:
              "Créer, parcourir, indexer, ajouter des éléments. C'est la structure de données de 80 % des algorithmes d'introduction.",
          },
          {
            label: "Conditions",
            value:
              "`if` / `else`, comparaisons, opérateurs logiques. Un algorithme de tri n'est qu'une séquence de comparaisons bien placées.",
          },
          {
            label: "Un peu de maths",
            value:
              "Puissances, logarithmes (au moins l'intuition : « combien de fois puis-je diviser par 2 »), sommes simples. Pas de maths avancées requises.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le langage importe peu : Python est idéal pour apprendre (lisible, interactif), mais JavaScript ou tout autre langage fait l'affaire. Les exemples de cette page sont en Python, volontairement simples.",
      },
    ],
  },
  {
    id: "notation-big-o",
    title: "La notation grand O",
    level: 2,
    intro:
      "Lire et écrire les complexités : le vocabulaire commun de toute l'algorithmique.",
    blocks: [
      {
        kind: "fields",
        title: "Les complexités à connaître par cœur",
        fields: [
          {
            label: "O(1) — constant",
            value:
              "Le temps ne dépend pas de `n`. Exemple : lire `tableau[i]`, ajouter en fin de liste. Le Graal, rarement atteignable.",
          },
          {
            label: "O(log n) — logarithmique",
            value:
              "Chaque étape divise le problème (souvent par 2). Exemple : recherche binaire. `log₂(1 000 000) ≈ 20` : minuscule.",
          },
          {
            label: "O(n) — linéaire",
            value:
              "Un parcours des données. Exemple : chercher un élément, calculer une somme. La borne naturelle de « lire toutes les données ».",
          },
          {
            label: "O(n log n) — quasi-linéaire",
            value:
              "La complexité des bons algorithmes de tri (fusion, rapide). Le standard de l'efficace.",
          },
          {
            label: "O(n²) — quadratique",
            value:
              "Deux boucles imbriquées sur les données. Acceptable pour quelques milliers d'éléments, catastrophique au-delà.",
          },
          {
            label: "O(2ⁿ) — exponentiel",
            value:
              "Explorer toutes les combinaisons. Impraticable dès `n ≈ 40`. Signale qu'il faut une autre approche (dynamique, glouton, approximation).",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Trois complexités en code",
        code: `def acces(tab, i):\n    return tab[i]              # O(1) : une seule opération\n\ndef somme(tab):\n    total = 0\n    for x in tab:               # O(n) : une boucle sur n éléments\n        total += x\n    return total\n\ndef paires(tab):\n    resultat = []\n    for x in tab:               # O(n²) : boucles imbriquées\n        for y in tab:\n            resultat.append((x, y))\n    return resultat`,
      },
      {
        kind: "text",
        text: "Règle de simplification : on ne garde que le terme dominant. `3n² + 10n + 5` devient `O(n²)` — les constantes et les termes faibles sont négligeables quand `n` grandit. C'est une approximation volontaire : elle compare les croissances, pas les chronomètres.",
      },
    ],
  },
  {
    id: "analyser-un-algorithme",
    title: "Analyser un algorithme",
    level: 2,
    intro:
      "La méthode pas à pas pour déterminer la complexité d'un code.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Identifier la taille de l'entrée",
            detail:
              "Nommez-la `n` : longueur d'un tableau, nombre de nœuds d'un graphe, valeur d'un entier. Toute l'analyse s'exprime en fonction de `n`.",
          },
          {
            title: "Compter les opérations par bloc",
            detail:
              "Une instruction simple coûte O(1). Une boucle `for` sur `n` éléments coûte O(n) fois le coût de son corps.",
          },
          {
            title: "Composer les blocs",
            detail:
              "Blocs séquentiels : on additionne (`O(n) + O(n²)`). Boucles imbriquées : on multiplie (`O(n)` dans `O(n)` = `O(n²)`).",
          },
          {
            title: "Garder le terme dominant",
            detail:
              "`O(n² + n)` devient `O(n²)`. Les constantes disparaissent : `O(2n)` s'écrit `O(n)`.",
          },
          {
            title: "Vérifier avec un exemple",
            detail:
              "Doublez mentalement `n` : le temps double-t-il (O(n)) ou quadruple-t-il (O(n²)) ? Si l'intuition colle, l'analyse est probablement juste.",
          },
        ],
      },
      {
        kind: "text",
        text: "Piège classique : une boucle `for x in tab` suivie d'un `tab.remove(x)` ou d'un `x in tab` cache un second parcours — la complexité réelle est souvent `O(n²)` là où on lit `O(n)`. Toujours vérifier le coût des opérations appelées dans la boucle.",
      },
    ],
  },
  {
    id: "recherche-lineaire",
    title: "Recherche linéaire",
    level: 2,
    intro:
      "Le premier algorithme : parcourir jusqu'à trouver. Simple, universel, `O(n)`.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Recherche linéaire",
        code: `def recherche_lineaire(tab, cible):\n    for i, valeur in enumerate(tab):\n        if valeur == cible:\n            return i      # trouvé : on renvoie la position\n    return -1             # absent : convention de retour`,
      },
      {
        kind: "list",
        items: [
          "Fonctionne sur n'importe quel tableau, trié ou non.",
          "Pire cas `O(n)` : l'élément est à la fin ou absent.",
          "Meilleur cas `O(1)` : l'élément est en première position.",
          "C'est la référence : tout algorithme de recherche plus malin doit justifier son surcoût face à elle.",
        ],
      },
    ],
  },
  {
    id: "recherche-binaire",
    title: "Recherche binaire",
    level: 2,
    intro:
      "Diviser le problème par deux à chaque étape : `O(log n)`, à condition que les données soient triées.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Recherche binaire (itérative)",
        code: `def recherche_binaire(tab, cible):\n    gauche, droite = 0, len(tab) - 1\n    while gauche <= droite:\n        milieu = (gauche + droite) // 2\n        if tab[milieu] == cible:\n            return milieu\n        elif tab[milieu] < cible:\n            gauche = milieu + 1   # on garde la moitié droite\n        else:\n            droite = milieu - 1   # on garde la moitié gauche\n    return -1`,
      },
      {
        kind: "diagram",
        title: "Recherche de 7 dans [1, 3, 5, 7, 9, 11, 13]",
        lines: [
          "[1, 3, 5, 7, 9, 11, 13]   milieu = 7 → trouvé en 1 étape",
          "Si on cherchait 11 :",
          "[1, 3, 5, 7, 9, 11, 13]   milieu = 7, 11 > 7 → moitié droite",
          "           [9, 11, 13]     milieu = 11 → trouvé en 2 étapes",
          "7 éléments → 3 étapes max. 1 000 000 d'éléments → 20 étapes max.",
        ],
      },
      {
        kind: "text",
        text: "Condition non négociable : le tableau doit être trié. Sur des données non triées, il faut d'abord trier (`O(n log n)`) — rentable seulement si on cherche ensuite de nombreuses fois. Erreur classique : appliquer la recherche binaire à un tableau non trié et obtenir des résultats faux.",
      },
    ],
  },
  {
    id: "tri-bulles-insertion",
    title: "Tris simples : bulles et insertion",
    level: 2,
    intro:
      "Les tris `O(n²)` : lents sur gros volumes, mais parfaits pour comprendre ce qu'est « trier ».",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Tri par insertion",
        code: `def tri_insertion(tab):\n    for i in range(1, len(tab)):\n        cle = tab[i]\n        j = i - 1\n        # décale les éléments plus grands vers la droite\n        while j >= 0 and tab[j] > cle:\n            tab[j + 1] = tab[j]\n            j -= 1\n        tab[j + 1] = cle\n    return tab`,
      },
      {
        kind: "table",
        headers: ["", "Tri à bulles", "Tri par insertion"],
        rows: [
          ["Principe", "Échange les voisins mal ordonnés, les grands « remontent »", "Insère chaque élément à sa place dans la partie déjà triée"],
          ["Complexité pire cas", "O(n²)", "O(n²)"],
          ["Meilleur cas (déjà trié)", "O(n) avec le test d'arrêt", "O(n)"],
          ["Intérêt", "Pédagogique uniquement", "Excellent sur petits tableaux ou presque triés"],
        ],
      },
      {
        kind: "text",
        text: "Ces tris ne servent quasiment jamais en production sur de gros volumes — mais le tri par insertion reste utilisé en pratique comme « finition » des tris rapides sur les petits sous-tableaux (quelques dizaines d'éléments), où sa simplicité bat les algorithmes sophistiqués.",
      },
    ],
  },
  {
    id: "tri-fusion",
    title: "Tri fusion (merge sort)",
    level: 2,
    intro:
      "Le premier tri efficace : diviser, trier, fusionner. `O(n log n)` garanti.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Tri fusion",
        code: `def tri_fusion(tab):\n    if len(tab) <= 1:\n        return tab\n    milieu = len(tab) // 2\n    gauche = tri_fusion(tab[:milieu])     # trier chaque moitié\n    droite = tri_fusion(tab[milieu:])\n    return fusionner(gauche, droite)       # puis fusionner\n\ndef fusionner(a, b):\n    resultat, i, j = [], 0, 0\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            resultat.append(a[i]); i += 1\n        else:\n            resultat.append(b[j]); j += 1\n    return resultat + a[i:] + b[j:]`,
      },
      {
        kind: "diagram",
        title: "Tri fusion sur [38, 27, 43, 3]",
        lines: [
          "        [38, 27, 43, 3]",
          "         /           \\",
          "    [38, 27]       [43, 3]",
          "     /    \\         /    \\",
          "  [38]    [27]   [43]    [3]     ← diviser jusqu'à 1 élément",
          "     \\    /         \\    /",
          "    [27, 38]       [3, 43]       ← fusionner en triant",
          "         \\           /",
          "         [3, 27, 38, 43]",
        ],
      },
      {
        kind: "list",
        items: [
          "Complexité `O(n log n)` dans tous les cas : la division est toujours équilibrée.",
          "Tri stable : l'ordre relatif des éléments égaux est préservé.",
          "Coût : mémoire supplémentaire `O(n)` pour la fusion — il n'est pas « en place ».",
        ],
      },
    ],
  },
  {
    id: "tri-rapide",
    title: "Tri rapide (quicksort)",
    level: 2,
    intro:
      "Le tri le plus utilisé en pratique : rapide en moyenne, subtil dans ses pièges.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Tri rapide (version lisible)",
        code: `def tri_rapide(tab):\n    if len(tab) <= 1:\n        return tab\n    pivot = tab[len(tab) // 2]\n    petits = [x for x in tab if x < pivot]\n    egaux = [x for x in tab if x == pivot]\n    grands = [x for x in tab if x > pivot]\n    return tri_rapide(petits) + egaux + tri_rapide(grands)`,
      },
      {
        kind: "text",
        text: "Principe : choisir un pivot, partitionner les éléments (plus petits / plus grands), trier chaque côté récursivement. En moyenne `O(n log n)` et très rapide en pratique grâce à une bonne localité mémoire — c'est le tri par défaut de nombreux langages.",
      },
      {
        kind: "list",
        items: [
          "Pire cas `O(n²)` : pivot systématiquement mal choisi (ex. tableau déjà trié + pivot = premier élément).",
          "Le choix du pivot est tout l'algorithme : médiane de trois, pivot aléatoire.",
          "Version « en place » (partition de Lomuto ou Hoare) : `O(log n)` de mémoire, mais plus délicate à écrire.",
          "Cette version lisible utilise `O(n)` de mémoire supplémentaire — pédagogique, pas optimale.",
        ],
      },
    ],
  },
  {
    id: "recursion-bases",
    title: "La récursivité",
    level: 2,
    intro:
      "Une fonction qui s'appelle elle-même : l'outil le plus puissant — et le plus piégeux — de l'algorithmique.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Factorielle récursive",
        code: `def factorielle(n):\n    if n <= 1:          # cas de base : on s'arrête ici\n        return 1\n    return n * factorielle(n - 1)   # cas récursif : problème plus petit`,
      },
      {
        kind: "diagram",
        title: "factorielle(4) : la pile d'appels",
        lines: [
          "factorielle(4)",
          "  → 4 * factorielle(3)",
          "        → 3 * factorielle(2)",
          "              → 2 * factorielle(1)",
          "                    → 1            ← cas de base",
          "              → 2 * 1 = 2",
          "        → 3 * 2 = 6",
          "  → 4 * 6 = 24",
        ],
      },
      {
        kind: "list",
        items: [
          "Tout algorithme récursif a besoin d'un cas de base, sinon la pile déborde (`RecursionError`).",
          "Chaque appel doit progresser vers le cas de base : le problème doit strictement rétrécir.",
          "La récursivité exprime naturellement : parcours d'arbres, diviser-pour-régner, backtracking.",
          "Coût caché : chaque appel consomme de la pile — une récursion profonde (n = 100 000) plante là où une boucle passe.",
        ],
      },
    ],
  },
  {
    id: "diviser-pour-regner",
    title: "Diviser pour régner",
    level: 2,
    intro:
      "Le paradigme derrière les algorithmes les plus élégants : diviser, résoudre, combiner.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Diviser",
            detail:
              "Découper le problème en sous-problèmes de même nature, plus petits. Exemple : couper le tableau en deux.",
          },
          {
            title: "Régner",
            detail:
              "Résoudre chaque sous-problème récursivement. Le cas de base (taille 0 ou 1) se résout directement.",
          },
          {
            title: "Combiner",
            detail:
              "Fusionner les solutions partielles en solution globale. C'est souvent l'étape la plus inventive (la fusion du tri fusion).",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Tri fusion, tri rapide : diviser-pour-régner appliqué au tri.",
          "Recherche binaire : diviser-pour-régner où l'on ne garde qu'une moitié.",
          "Multiplication de grands nombres (Karatsuba), transformée de Fourier rapide : le paradigme ne sert pas qu'au tri.",
          "Efficacité typique : `O(n log n)` quand la division est équilibrée et la combinaison linéaire.",
        ],
      },
    ],
  },
  {
    id: "fenetre-glissante",
    title: "Fenêtre glissante (sliding window)",
    level: 2,
    intro:
      "Transformer un `O(n²)` en `O(n)` sur les problèmes de sous-tableaux contigus.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Somme maximale d'une fenêtre de taille k",
        code: `def somme_max_fenetre(tab, k):\n    fenetre = sum(tab[:k])\n    maximum = fenetre\n    for i in range(k, len(tab)):\n        fenetre += tab[i] - tab[i - k]   # glisse : +entrant, -sortant\n        maximum = max(maximum, fenetre)\n    return maximum`,
      },
      {
        kind: "text",
        text: "L'idée : au lieu de recalculer chaque fenêtre depuis zéro (`O(n × k)`), on fait glisser la fenêtre en ajoutant l'élément entrant et en retirant le sortant. Chaque élément est traité une fois : `O(n)`.",
      },
      {
        kind: "list",
        items: [
          "S'applique aux problèmes de sous-séquences contiguës : sommes, moyennes, plus longue sous-chaîne sans répétition.",
          "Variante « taille variable » : la fenêtre s'agrandit et rétrécit selon une condition (ex. somme < cible).",
          "Réflexe : dès qu'un énoncé parle de « sous-tableau contigu » avec une contrainte, penser fenêtre glissante avant la force brute.",
        ],
      },
    ],
  },
  {
    id: "premiers-projets",
    title: "Premiers projets",
    level: 2,
    intro:
      "Mettre en pratique : des projets courts qui ancrent les fondamentaux.",
    blocks: [
      {
        kind: "list",
        items: [
          "Comparateur de tris : implémenter tri à bulles, insertion, fusion, rapide ; chronométrer sur 1 000, 10 000, 100 000 éléments et tracer les courbes.",
          "Recherche dans un dictionnaire : charger une liste de mots, comparer recherche linéaire et binaire (avec tri préalable) en nombre de comparaisons.",
          "Générateur de labyrinthe : parcours en profondeur sur une grille pour creuser des passages, puis résolution du labyrinthe.",
          "Compteur de mots : lire un texte, compter les occurrences avec un dictionnaire, afficher le top 10 — premier contact avec le hachage.",
          "Fibonacci comparé : version récursive naïve, version mémoïsée, version itérative ; mesurer l'écart sur `fib(35)`.",
        ],
      },
      {
        kind: "text",
        text: "Règle d'or : toujours vérifier le résultat sur de petits exemples à la main avant de tester en grand. Un algorithme faux mais rapide ne sert à rien — la correction d'abord, la performance ensuite.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "deux-pointeurs",
    title: "La technique des deux pointeurs",
    level: 3,
    intro:
      "Deux index qui avancent l'un vers l'autre : `O(n)` là où la force brute fait `O(n²)`.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Deux nombres dont la somme vaut la cible (tableau trié)",
        code: `def deux_somme_trie(tab, cible):\n    gauche, droite = 0, len(tab) - 1\n    while gauche < droite:\n        s = tab[gauche] + tab[droite]\n        if s == cible:\n            return (gauche, droite)\n        elif s < cible:\n            gauche += 1    # somme trop petite : on augmente le petit\n        else:\n            droite -= 1    # somme trop grande : on diminue le grand\n    return None`,
      },
      {
        kind: "list",
        items: [
          "Condition : le tableau est trié — c'est l'ordre qui rend la décision possible à chaque étape.",
          "Autres usages : détecter un palindrome, supprimer les doublons en place, fusionner deux tableaux triés.",
          "Variante « lent/rapide » : détecter un cycle dans une liste chaînée (algorithme du lièvre et de la tortue).",
        ],
      },
    ],
  },
  {
    id: "hachage-algorithmique",
    title: "Le hachage en algorithmique",
    level: 3,
    intro:
      "Échanger de la mémoire contre du temps : passer de `O(n²)` à `O(n)` avec un dictionnaire.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Deux nombres dont la somme vaut la cible — version O(n)",
        code: `def deux_somme(tab, cible):\n    vus = {}                       # valeur -> index déjà parcouru\n    for i, x in enumerate(tab):\n        complement = cible - x\n        if complement in vus:      # O(1) en moyenne\n            return (vus[complement], i)\n        vus[x] = i\n    return None`,
      },
      {
        kind: "text",
        text: "Le schéma est universel : mémoriser ce qu'on a déjà vu dans une table de hachage pour éviter de le rechercher à nouveau. Doublons, anagrammes, fréquences, compléments — dès qu'un problème demande « ai-je déjà vu… ? », le dictionnaire est la réponse.",
      },
      {
        kind: "list",
        items: [
          "Coût : `O(n)` en temps moyen, `O(n)` en mémoire supplémentaire — le compromis temps/espace typique.",
          "Le pire cas du hachage est `O(n)` par opération (collisions adverses), mais il ne se produit quasiment jamais avec une bonne fonction de hachage.",
          "En Python, `dict` et `set` sont des tables de hachage : `in`, l'insertion et l'accès sont `O(1)` en moyenne.",
        ],
      },
    ],
  },
  {
    id: "programmation-dynamique",
    title: "La programmation dynamique",
    level: 3,
    intro:
      "L'arme contre l'exponentiel : ne jamais recalculer deux fois le même sous-problème.",
    blocks: [
      {
        kind: "text",
        text: "La programmation dynamique s'applique quand un problème se décompose en sous-problèmes qui se chevauchent : la récursion naïve recalcule les mêmes valeurs des milliers de fois. En mémorisant chaque résultat, on passe typiquement de `O(2ⁿ)` à `O(n)` ou `O(n²)`.",
      },
      {
        kind: "diagram",
        title: "Fibonacci récursif naïf : fib(3) calculé 2 fois, fib(2) 3 fois…",
        lines: [
          "              fib(5)",
          "            /        \\",
          "        fib(4)        fib(3)",
          "       /      \\      /      \\",
          "   fib(3)   fib(2) fib(2)  fib(1)",
          "   /    \\",
          "fib(2) fib(1)",
          "→ fib(3) et fib(2) sont recalculés : gaspillage exponentiel.",
          "→ Solution : calculer chaque fib(k) une seule fois et le stocker.",
        ],
      },
      {
        kind: "list",
        items: [
          "Deux conditions : sous-structure optimale (la solution se construit à partir de sous-solutions optimales) et sous-problèmes qui se chevauchent.",
          "Exemples classiques : sac à dos, plus longue sous-séquence commune, distance d'édition, rendu de monnaie.",
          "Réflexe : si la récursion naïve « rame » et que les mêmes appels reviennent, c'est un candidat à la programmation dynamique.",
        ],
      },
    ],
  },
  {
    id: "memoisation-vs-tabulation",
    title: "Mémoïsation vs tabulation",
    level: 3,
    intro:
      "Les deux façons d'implémenter la programmation dynamique : par le haut ou par le bas.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Mémoïsation (top-down) : récursion + cache",
        code: `def fib_memo(n, cache=None):\n    if cache is None:\n        cache = {}\n    if n in cache:\n        return cache[n]\n    if n <= 1:\n        return n\n    cache[n] = fib_memo(n - 1, cache) + fib_memo(n - 2, cache)\n    return cache[n]`,
      },
      {
        kind: "code",
        language: "python",
        title: "Tabulation (bottom-up) : itération sur un tableau",
        code: `def fib_tab(n):\n    if n <= 1:\n        return n\n    table = [0] * (n + 1)\n    table[1] = 1\n    for i in range(2, n + 1):\n        table[i] = table[i - 1] + table[i - 2]\n    return table[n]`,
      },
      {
        kind: "table",
        headers: ["", "Mémoïsation", "Tabulation"],
        rows: [
          ["Direction", "Du problème vers les cas de base (récursif)", "Des cas de base vers le problème (itératif)"],
          ["Sous-problèmes calculés", "Seulement ceux réellement nécessaires", "Tous, même les inutiles"],
          ["Lisibilité", "Proche de la récurrence mathématique", "Demande de définir l'ordre de remplissage"],
          ["Mémoire", "Pile de récursion + cache", "Tableau (souvent optimisable à O(1))"],
        ],
      },
      {
        kind: "text",
        text: "Astuce mémoire : on n'a souvent besoin que des dernières valeurs. Pour Fibonacci, deux variables suffisent au lieu d'un tableau de taille `n` — passer de `O(n)` à `O(1)` en espace sans changer le temps.",
      },
    ],
  },
  {
    id: "glouton",
    title: "Les algorithmes gloutons",
    level: 3,
    intro:
      "Choisir le meilleur coup local à chaque étape : parfois optimal, parfois catastrophique.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Rendu de monnaie (pièces : 1, 2, 5, 10)",
        code: `def rendu_monnaie(montant, pieces=(10, 5, 2, 1)):\n    resultat = []\n    for p in pieces:                 # plus grosse pièce d'abord\n        while montant >= p:\n            resultat.append(p)\n            montant -= p\n    return resultat`,
      },
      {
        kind: "text",
        text: "Le glouton fait à chaque étape le choix localement optimal, sans jamais revenir en arrière : `O(n log n)` ou `O(n)`, d'une simplicité redoutable. Il est optimal pour le rendu de monnaie en euros — mais faux avec des pièces de 1, 3 et 4 pour un montant de 6 (glouton : 4+1+1 = 3 pièces ; optimal : 3+3 = 2 pièces).",
      },
      {
        kind: "list",
        items: [
          "Un glouton n'est correct que si le problème a la « propriété du choix glouton » : le choix local n'empêche jamais l'optimum global. Ça se prouve, ça ne se suppose pas.",
          "Succès célèbres : Huffman (compression), Kruskal et Prim (arbre couvrant minimal), ordonnancement par date de fin.",
          "Réflexe : un glouton est le premier algorithme à essayer — simple à écrire, facile à tester sur des contre-exemples.",
        ],
      },
    ],
  },
  {
    id: "backtracking",
    title: "Le backtracking",
    level: 3,
    intro:
      "Explorer les possibilités en revenant sur ses pas : la force brute intelligente.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Toutes les permutations d'une liste",
        code: `def permutations(elements):\n    if not elements:\n        return [[]]\n    resultat = []\n    for i, e in enumerate(elements):\n        reste = elements[:i] + elements[i+1:]\n        for p in permutations(reste):   # choix + récursion\n            resultat.append([e] + p)\n    return resultat                     # retour en arrière implicite`,
      },
      {
        kind: "text",
        text: "Le backtracking construit une solution pas à pas : à chaque étape, il essaie un choix, continue récursivement, et abandonne (« backtrack ») dès que le choix mène à une impasse. C'est de l'exploration systématique avec élagage précoce.",
      },
      {
        kind: "list",
        items: [
          "Applications : N-reines, Sudoku, coloriage de graphe, sac à dos en force brute.",
          "L'élagage fait toute la différence : détecter l'échec le plus tôt possible évite d'explorer des branches mortes.",
          "Complexité exponentielle dans le pire cas — acceptable pour petits `n`, à remplacer par de la dynamique dès que possible.",
        ],
      },
    ],
  },
  {
    id: "graphes-representations",
    title: "Les graphes : représentations",
    level: 3,
    intro:
      "Nœuds et arêtes : la structure des réseaux, cartes, dépendances — et comment la stocker.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Liste d'adjacence (la représentation standard)",
        code: `graphe = {\n    "A": ["B", "C"],\n    "B": ["A", "D"],\n    "C": ["A", "D"],\n    "D": ["B", "C"],\n}\n# voisins de A : graphe["A"] -> ["B", "C"]`,
      },
      {
        kind: "table",
        headers: ["", "Liste d'adjacence", "Matrice d'adjacence"],
        rows: [
          ["Mémoire", "O(V + E) — compacte", "O(V²) — lourde si peu d'arêtes"],
          ["Voisins d'un nœud", "O(degré) — direct", "O(V) — balayer une ligne"],
          ["Arête (u, v) existe ?", "O(degré) — chercher dans la liste", "O(1) — lire matrice[u][v]"],
          ["Idéal pour", "Graphes creux (la plupart des cas réels)", "Graphes denses, petits graphes"],
        ],
      },
      {
        kind: "text",
        text: "`V` = nombre de sommets, `E` = nombre d'arêtes. La plupart des graphes réels (réseaux sociaux, routage, dépendances) sont creux : la liste d'adjacence est le choix par défaut.",
      },
    ],
  },
  {
    id: "bfs",
    title: "Parcours en largeur (BFS)",
    level: 3,
    intro:
      "Explorer par vagues depuis le départ : le plus court chemin en nombre d'arêtes.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "BFS avec file",
        code: `from collections import deque\n\ndef bfs(graphe, depart):\n    visites = {depart}\n    file = deque([depart])\n    ordre = []\n    while file:\n        noeud = file.popleft()      # FIFO : on traite par vagues\n        ordre.append(noeud)\n        for voisin in graphe[noeud]:\n            if voisin not in visites:\n                visites.add(voisin)\n                file.append(voisin)\n    return ordre`,
      },
      {
        kind: "diagram",
        title: "BFS depuis A : ordre de visite",
        lines: [
          "      A",
          "     / \\",
          "    B   C",
          "    |   |",
          "    D   E",
          "Ordre : A → B, C → D, E",
          "(vague 0, puis vague 1, puis vague 2)",
        ],
      },
      {
        kind: "list",
        items: [
          "Complexité `O(V + E)` : chaque sommet et chaque arête visités une fois.",
          "Donne le plus court chemin (en nombre d'arêtes) dans un graphe non pondéré — propriété fondamentale.",
          "Structure : une file (FIFO). Marquer les sommets visités à l'ajout, pas au retrait, pour éviter les doublons.",
        ],
      },
    ],
  },
  {
    id: "dfs",
    title: "Parcours en profondeur (DFS)",
    level: 3,
    intro:
      "Aller au fond avant d'explorer en largeur : simple, récursif, partout.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "DFS récursif",
        code: `def dfs(graphe, noeud, visites=None):\n    if visites is None:\n        visites = set()\n    visites.add(noeud)\n    for voisin in graphe[noeud]:\n        if voisin not in visites:\n            dfs(graphe, voisin, visites)\n    return visites`,
      },
      {
        kind: "list",
        items: [
          "Complexité `O(V + E)`, comme BFS. Structure implicite : la pile d'appels (ou une pile explicite en itératif).",
          "Usages : détecter un cycle, tri topologique, composantes connexes, résolution de labyrinthe.",
          "Ne donne PAS le plus court chemin en général — c'est le rôle de BFS (non pondéré) ou Dijkstra (pondéré).",
          "Sur un graphe très profond, la récursion peut déborder la pile : version itérative avec pile explicite dans ce cas.",
        ],
      },
    ],
  },
  {
    id: "dijkstra",
    title: "Dijkstra : plus court chemin pondéré",
    level: 3,
    intro:
      "Quand les arêtes ont un coût : l'algorithme des GPS, en `O(E log V)`.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Dijkstra avec file de priorité",
        code: `import heapq\n\ndef dijkstra(graphe, depart):\n    dist = {depart: 0}\n    file = [(0, depart)]            # (distance, noeud)\n    while file:\n        d, noeud = heapq.heappop(file)\n        if d > dist.get(noeud, float("inf")):\n            continue                # entrée obsolète : on ignore\n        for voisin, poids in graphe[noeud]:\n            nd = d + poids\n            if nd < dist.get(voisin, float(\"inf\")):\n                dist[voisin] = nd\n                heapq.heappush(file, (nd, voisin))\n    return dist`,
      },
      {
        kind: "text",
        text: "Principe : toujours étendre le nœud non traité le plus proche du départ (glouton). La file de priorité (`heapq`) rend l'extraction du minimum efficace. Condition : poids positifs ou nuls — avec des poids négatifs, il faut Bellman-Ford.",
      },
      {
        kind: "list",
        items: [
          "Complexité `O(E log V)` avec un tas binaire.",
          "Applications : routage réseau, GPS, planification avec coûts.",
          "A* est Dijkstra + heuristique : plus rapide quand on a une estimation de la distance restante.",
        ],
      },
    ],
  },
  {
    id: "union-find",
    title: "Union-Find (ensembles disjoints)",
    level: 3,
    intro:
      "Savoir en temps quasi constant si deux éléments sont connectés.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Union-Find avec compression de chemin",
        code: `class UnionFind:\n    def __init__(self, n):\n        self.parent = list(range(n))\n\n    def trouver(self, x):\n        while self.parent[x] != x:\n            self.parent[x] = self.parent[self.parent[x]]  # compression\n            x = self.parent[x]\n        return x\n\n    def unir(self, a, b):\n        self.parent[self.trouver(a)] = self.trouver(b)\n\n    def connectes(self, a, b):\n        return self.trouver(a) == self.trouver(b)`,
      },
      {
        kind: "text",
        text: "Chaque ensemble a un représentant ; `trouver` remonte au représentant en aplatissant l'arbre au passage (compression de chemin). Avec l'union par rang, les opérations sont en temps quasi constant — `O(α(n))`, où α est la fonction inverse d'Ackermann, inférieure à 5 pour toute entrée réaliste.",
      },
      {
        kind: "list",
        items: [
          "Usages : composantes connexes, algorithme de Kruskal (arbre couvrant minimal), détection de cycles.",
          "Bien plus simple et rapide qu'un BFS répété pour des questions de connectivité dynamique.",
        ],
      },
    ],
  },
  {
    id: "tas-file-priorite",
    title: "Tas et files de priorité",
    level: 3,
    intro:
      "Toujours extraire le minimum (ou maximum) en `O(log n)` : le moteur de Dijkstra et des planificateurs.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "File de priorité avec heapq (tas min)",
        code: `import heapq\n\nfile = []\nheapq.heappush(file, (3, "tâche basse"))\nheapq.heappush(file, (1, "tâche urgente"))\nheapq.heappush(file, (2, "tâche normale\"))\n\npriorite, tache = heapq.heappop(file)   # (1, "tâche urgente")`,
      },
      {
        kind: "text",
        text: "Un tas binaire est un arbre complet stocké dans un tableau : le parent de l'indice `i` est en `(i-1)//2`. Insertion et extraction du minimum en `O(log n)`, lecture du minimum en `O(1)`.",
      },
      {
        kind: "list",
        items: [
          "Tri par tas (heapsort) : `O(n log n)` garanti, en place — mais rarement le plus rapide en pratique.",
          "Pour un tas max en Python : stocker les opposés (`-priorité`), `heapq` ne fait que des tas min.",
          "Usages : Dijkstra, ordonnancement, top-k (garder les k plus grands en `O(n log k)`), médiane glissante.",
        ],
      },
    ],
  },
  {
    id: "arbres-binaires-recherche",
    title: "Arbres binaires de recherche (ABR)",
    level: 3,
    intro:
      "Recherche, insertion, suppression en `O(log n)`… quand l'arbre reste équilibré.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "ABR : insertion et recherche",
        code: `class Noeud:\n    def __init__(self, cle):\n        self.cle = cle\n        self.gauche = self.droit = None\n\ndef inserer(racine, cle):\n    if racine is None:\n        return Noeud(cle)\n    if cle < racine.cle:\n        racine.gauche = inserer(racine.gauche, cle)\n    elif cle > racine.cle:\n        racine.droit = inserer(racine.droit, cle)\n    return racine\n\ndef chercher(racine, cle):\n    while racine is not None:\n        if cle == racine.cle:\n            return True\n        racine = racine.gauche if cle < racine.cle else racine.droit\n    return False`,
      },
      {
        kind: "text",
        text: "Propriété : tout ce qui est à gauche est plus petit, tout ce qui est à droite est plus grand. La recherche élimine la moitié de l'arbre à chaque étape — comme une recherche binaire sur une structure dynamique.",
      },
      {
        kind: "list",
        items: [
          "Le talon d'Achille : insérer des clés triées produit un arbre dégénéré (une liste) — opérations en `O(n)`. D'où les arbres équilibrés.",
          "En pratique, on utilise les implémentations équilibrées des langages (`sortedcontainers`, `bisect` sur liste triée, `TreeMap` en Java), pas son propre ABR.",
        ],
      },
    ],
  },
  {
    id: "parcours-arbres",
    title: "Parcours d'arbres",
    level: 3,
    intro:
      "Infixe, préfixe, postfixe : trois ordres de visite, trois usages.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Les trois parcours récursifs",
        code: `def prefixe(n):\n    return [n.cle] + prefixe(n.gauche) + prefixe(n.droit) if n else []\n\ndef infixe(n):\n    return infixe(n.gauche) + [n.cle] + infixe(n.droit) if n else []\n\ndef postfixe(n):\n    return postfixe(n.gauche) + postfixe(n.droit) + [n.cle] if n else []`,
      },
      {
        kind: "fields",
        title: "Quel parcours pour quoi",
        fields: [
          {
            label: "Infixe (gauche, nœud, droite)",
            value:
              "Sur un ABR, produit les clés triées. C'est le parcours « dans l'ordre ».",
          },
          {
            label: "Préfixe (nœud, gauche, droite)",
            value:
              "Copier ou sérialiser un arbre : le parent est créé avant ses enfants, la reconstruction est directe.",
          },
          {
            label: "Postfixe (gauche, droite, nœud)",
            value:
              "Supprimer un arbre ou évaluer une expression : les enfants sont traités avant le parent.",
          },
          {
            label: "En largeur (BFS)",
            value:
              "Traiter par niveaux : affichage, recherche du nœud le moins profond vérifiant une condition.",
          },
        ],
      },
    ],
  },
  {
    id: "arbres-equilibres",
    title: "Arbres équilibrés",
    level: 3,
    intro:
      "Garantir `O(log n)` en maintenant l'équilibre : AVL, rouge-noir, B-arbres.",
    blocks: [
      {
        kind: "text",
        text: "Un arbre binaire de recherche dégénère si les insertions arrivent triées. Les arbres équilibrés maintiennent une hauteur en `O(log n)` par des rotations locales après chaque insertion ou suppression : l'arbre se rééquilibre tout seul.",
      },
      {
        kind: "fields",
        title: "Les trois familles",
        fields: [
          {
            label: "AVL",
            value:
              "La hauteur des deux sous-arbres diffère d'au plus 1. Recherches très rapides, insertions un peu plus coûteuses. Idéal quand on lit beaucoup plus qu'on écrit.",
          },
          {
            label: "Rouge-noir",
            value:
              "Équilibre moins strict (règles de coloration), rééquilibrages moins fréquents. Le compromis standard : utilisé dans les `TreeMap` Java et `std::map` C++.",
          },
          {
            label: "B-arbres",
            value:
              "Nœuds à plusieurs clés, pensés pour le disque : chaque nœud = un bloc lu d'un coup. La structure des index de bases de données.",
          },
        ],
      },
      {
        kind: "text",
        text: "On n'implémente quasiment jamais ces arbres soi-même : on utilise ceux des bibliothèques standard. Ce qu'il faut retenir, c'est quand ils servent — ensemble trié avec insertions/suppressions fréquentes — et leur garantie `O(log n)`.",
      },
    ],
  },
  {
    id: "tries",
    title: "Tries (arbres préfixes)",
    level: 3,
    intro:
      "Stocker des mots par leurs préfixes : autocomplétion en `O(m)` où `m` est la longueur du mot.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Trie minimal",
        code: `class Trie:\n    def __init__(self):\n        self.enfants = {}\n        self.fin_de_mot = False\n\n    def inserer(self, mot):\n        noeud = self\n        for lettre in mot:\n            noeud = noeud.enfants.setdefault(lettre, Trie())\n        noeud.fin_de_mot = True\n\n    def contient(self, mot):\n        noeud = self\n        for lettre in mot:\n            noeud = noeud.enfants.get(lettre)\n            if noeud is None:\n                return False\n        return noeud.fin_de_mot`,
      },
      {
        kind: "text",
        text: "Chaque nœud représente un préfixe ; les mots partageant un préfixe partagent les nœuds. Rechercher un mot de longueur `m` coûte `O(m)`, indépendamment du nombre de mots stockés. Bonus : lister tous les mots avec un préfixe donné (autocomplétion) est naturel.",
      },
    ],
  },
  {
    id: "quickselect",
    title: "Quickselect : le k-ième plus petit",
    level: 3,
    intro:
      "Trouver la médiane sans trier : le partitionnement du tri rapide, en `O(n)` moyen.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Quickselect",
        code: `import random\n\ndef quickselect(tab, k):\n    if len(tab) == 1:\n        return tab[0]\n    pivot = random.choice(tab)\n    petits = [x for x in tab if x < pivot]\n    egaux = [x for x in tab if x == pivot]\n    grands = [x for x in tab if x > pivot]\n    if k < len(petits):\n        return quickselect(petits, k)\n    elif k < len(petits) + len(egaux):\n        return pivot\n    return quickselect(grands, k - len(petits) - len(egaux))`,
      },
      {
        kind: "text",
        text: "Même partitionnement que le tri rapide, mais on ne poursuit que du côté contenant le k-ième élément. En moyenne `O(n)` : trouver une médiane ou un top-k sans payer le tri complet `O(n log n)`. Le pivot aléatoire évite le pire cas `O(n²)` en pratique.",
      },
    ],
  },
  {
    id: "tri-comptage",
    title: "Tris en temps linéaire",
    level: 3,
    intro:
      "Quand les comparaisons ne sont pas la seule option : trier en `O(n)` avec des hypothèses sur les données.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Tri par comptage (entiers bornés)",
        code: `def tri_comptage(tab, valeur_max):\n    comptes = [0] * (valeur_max + 1)\n    for x in tab:\n        comptes[x] += 1          # compte les occurrences\n    resultat = []\n    for valeur, n in enumerate(comptes):\n        resultat.extend([valeur] * n)\n    return resultat`,
      },
      {
        kind: "text",
        text: "La borne `Ω(n log n)` des tris ne concerne que les tris par comparaisons. Si les clés sont des entiers dans un intervalle connu, compter les occurrences puis les réécrire tri en `O(n + k)`. Le tri radix généralise l'idée aux chaînes et grands entiers, chiffre par chiffre.",
      },
      {
        kind: "list",
        items: [
          "Condition : domaine des clés borné et connu à l'avance.",
          "Coût : `O(n + k)` en temps et mémoire, où `k` est l'étendue des valeurs — catastrophique si `k` est immense.",
          "Le tri par comptage est stable : utile comme sous-routine du tri radix.",
        ],
      },
    ],
  },
  {
    id: "tri-en-place-vs-stable",
    title: "En place, stable : le vocabulaire des tris",
    level: 3,
    intro:
      "Deux propriétés qui distinguent les tris au-delà de leur complexité.",
    blocks: [
      {
        kind: "table",
        headers: ["Tri", "Temps moyen", "En place", "Stable"],
        rows: [
          ["Insertion", "O(n²)", "Oui", "Oui"],
          ["Fusion", "O(n log n)", "Non (O(n) mémoire)", "Oui"],
          ["Rapide", "O(n log n)", "Oui (version optimisée)", "Non"],
          ["Tas (heapsort)", "O(n log n)", "Oui", "Non"],
          ["Comptage", "O(n + k)", "Non", "Oui"],
        ],
      },
      {
        kind: "fields",
        title: "Les deux propriétés",
        fields: [
          {
            label: "En place",
            value:
              "Le tri n'utilise que `O(1)` ou `O(log n)` de mémoire supplémentaire (hors le tableau lui-même). Crucial quand la mémoire est limitée.",
          },
          {
            label: "Stable",
            value:
              "Deux éléments égaux gardent leur ordre relatif d'origine. Indispensable pour trier par plusieurs critères successifs (trier par nom, puis par âge en gardant l'ordre des noms).",
          },
        ],
      },
    ],
  },
  {
    id: "complexite-spatiale",
    title: "La complexité spatiale",
    level: 3,
    intro:
      "Le temps n'est pas tout : la mémoire consommée compte aussi.",
    blocks: [
      {
        kind: "text",
        text: "La complexité spatiale mesure la mémoire supplémentaire utilisée en fonction de `n`. Le tri fusion est `O(n log n)` en temps mais `O(n)` en espace ; le tri rapide est `O(n log n)` en temps et `O(log n)` en espace (pile de récursion).",
      },
      {
        kind: "list",
        items: [
          "La récursivité consomme de la pile : une récursion de profondeur `n` coûte `O(n)` en espace, même si le temps est `O(n)`.",
          "Compromis temps/espace : la mémoïsation échange `O(n)` de mémoire contre un temps exponentiel → polynomial.",
          "En pratique, la mémoire est rarement le facteur limitant avant le temps — sauf sur systèmes embarqués ou données massives.",
        ],
      },
    ],
  },
  {
    id: "analyse-amortie",
    title: "L'analyse amortie",
    level: 3,
    intro:
      "Quand une opération coûteuse occasionnelle ne change pas le coût moyen.",
    blocks: [
      {
        kind: "text",
        text: "Ajouter un élément à un tableau dynamique coûte `O(1)`… sauf quand le tableau est plein : il faut le recopier en double, soit `O(n)`. Pourtant, sur `n` insertions, le coût total reste `O(n)` : chaque élément n'est recopié qu'un nombre logarithmique de fois. Le coût amorti par insertion est donc `O(1)`.",
      },
      {
        kind: "diagram",
        title: "Tableau dynamique : doublement de capacité",
        lines: [
          "capacité 1 → plein → recopie (1 élément), capacité 2",
          "capacité 2 → plein → recopie (2 éléments), capacité 4",
          "capacité 4 → plein → recopie (4 éléments), capacité 8",
          "…",
          "Total des recopies pour n insertions : 1 + 2 + 4 + … + n/2 < 2n",
          "→ O(n) au total, O(1) amorti par insertion.",
        ],
      },
      {
        kind: "text",
        text: "L'analyse amortie borne le coût d'une séquence d'opérations, pas d'une opération isolée. C'est elle qui justifie que les listes dynamiques (Python `list`, tableaux redimensionnables) soient efficaces malgré leurs recopies occasionnelles.",
      },
    ],
  },
  {
    id: "invariants-preuve",
    title: "Prouver qu'un algorithme est correct",
    level: 3,
    intro:
      "Au-delà des tests : raisonner avec des invariants de boucle.",
    blocks: [
      {
        kind: "text",
        text: "Un invariant de boucle est une propriété vraie avant chaque itération. Pour le tri par insertion : « les `i` premiers éléments sont triés ». Si l'invariant est vrai initialement, préservé par chaque itération, et qu'il implique le résultat voulu à la fin, l'algorithme est correct.",
      },
      {
        kind: "steps",
        steps: [
          {
            title: "Formuler l'invariant",
            detail:
              "Énoncer précisément ce qui est vrai à chaque tour de boucle. Exemple (recherche binaire) : « si la cible existe, elle est entre `gauche` et `droite` ».",
          },
          {
            title: "Vérifier l'initialisation",
            detail: "L'invariant est-il vrai avant la première itération ?",
          },
          {
            title: "Vérifier la préservation",
            detail:
              "Si l'invariant est vrai au début d'une itération, l'est-il encore à la fin ? C'est le cœur de la preuve.",
          },
          {
            title: "Conclure à la terminaison",
            detail:
              "Quand la boucle s'arrête, l'invariant implique-t-il le résultat attendu ?",
          },
        ],
      },
      {
        kind: "text",
        text: "On ne prouve pas formellement chaque algorithme au quotidien — mais formuler l'invariant est le meilleur outil de débogage : quand un algorithme échoue, c'est presque toujours l'invariant qui est violé quelque part.",
      },
    ],
  },
  {
    id: "np-completude",
    title: "P, NP et NP-complétude",
    level: 3,
    intro:
      "Pourquoi certains problèmes résistent à tout algorithme efficace connu.",
    blocks: [
      {
        kind: "text",
        text: "P : les problèmes résolubles en temps polynomial (efficacement). NP : ceux dont une solution proposée est vérifiable en temps polynomial. Tout problème de P est dans NP ; l'inverse — P = NP ? — est le plus célèbre problème ouvert de l'informatique.",
      },
      {
        kind: "text",
        text: "NP-complet : les problèmes les plus durs de NP. Si l'on trouvait un algorithme polynomial pour un seul d'entre eux, on les résoudrait tous efficacement. Exemples : voyageur de commerce, sac à dos (version décision), coloriage de graphe, Sudoku généralisé.",
      },
      {
        kind: "list",
        items: [
          "Reconnaître un problème NP-complet évite de chercher en vain un algorithme exact efficace : on passe aux approximations, heuristiques ou à la programmation dynamique sur des cas restreints.",
          "NP-difficile : au moins aussi dur que les NP-complets, sans forcément être dans NP (ex. problèmes d'optimisation).",
          "En pratique : branch-and-bound, algorithmes génétiques, recuit simulé — des méthodes qui trouvent de bonnes solutions sans garantie d'optimalité.",
        ],
      },
    ],
  },
  {
    id: "bit-manipulation",
    title: "Manipulation de bits",
    level: 3,
    intro:
      "Opérer directement sur les bits : tests et astuces en `O(1)`.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Astuces classiques",
        code: `def est_puissance_de_2(n):\n    return n > 0 and (n & (n - 1)) == 0   # un seul bit à 1\n\ndef compter_bits(n):\n    total = 0\n    while n:\n        n &= n - 1      # efface le bit à 1 le plus à droite\n        total += 1\n    return total\n\ndef parite(n):\n    return "pair" if (n & 1) == 0 else "impair"`,
      },
      {
        kind: "fields",
        title: "Les opérateurs",
        fields: [
          {
            label: "`&` (ET)",
            value: "Masquer des bits : `n & 1` teste la parité, `n & 0xFF` garde l'octet bas.",
          },
          {
            label: "`|` (OU)",
            value: "Activer des bits : combiner des drapeaux (`LECTURE | ECRITURE`).",
          },
          {
            label: "`^` (OU exclusif)",
            value: "Inverser des bits ; `a ^ a == 0` : retrouver l'élément unique d'une liste où tout est doublé.",
          },
          {
            label: "`<<` / `>>`",
            value: "Décalages : `n << k` multiplie par 2^k, rapide et exact sur les entiers.",
          },
          {
            label: "`~` (NON)",
            value: "Inverser tous les bits : attention au complément à deux sur les entiers signés.",
          },
        ],
      },
    ],
  },
  {
    id: "chaines-kmp",
    title: "Recherche de motif : KMP",
    level: 3,
    intro:
      "Chercher un motif dans un texte en `O(n + m)` sans jamais reculer.",
    blocks: [
      {
        kind: "text",
        text: "La recherche naïve d'un motif de longueur `m` dans un texte de longueur `n` coûte `O(n × m)` : à chaque échec, on recule. Knuth-Morris-Pratt précalcule, à partir du motif lui-même, « de combien on peut avancer » après un échec partiel — via le tableau des plus longs préfixes qui sont aussi suffixes.",
      },
      {
        kind: "diagram",
        title: "L'idée du précalcul KMP",
        lines: [
          "Motif : A B A B C",
          "Après avoir matché « A B A B » puis échoué sur C,",
          "le naïf recule au début. KMP sait que « A B »",
          "est à la fois préfixe et suffixe de « A B A B » :",
          "il reprend la comparaison sans reculer dans le texte.",
          "→ Chaque caractère du texte est examiné une fois : O(n + m).",
        ],
      },
      {
        kind: "text",
        text: "En pratique, on utilise les fonctions des langages (`in`, `re`) — mais KMP illustre un principe général : précalculer sur le motif (ou la requête) pour accélérer toutes les recherches suivantes. Même idée dans Boyer-Moore, qui saute par la fin.",
      },
    ],
  },
  {
    id: "erreurs-raisonnement",
    title: "Erreurs de raisonnement courantes",
    level: 3,
    intro:
      "Les pièges dans lesquels tombent même les programmeurs expérimentés.",
    blocks: [
      {
        kind: "list",
        items: [
          "Confondre meilleur cas et cas général : un tri « rapide en pratique » reste `O(n²)` au pire — l'analyse honnête porte sur le pire cas.",
          "Oublier les constantes : pour `n = 10`, un `O(n²)` avec petite constante bat un `O(n log n)` sophistiqué. L'asymptotique ne parle que des grands `n`.",
          "Récursion sans cas de base, ou cas de base jamais atteint : la pile déborde.",
          "Muter une collection pendant qu'on l'itère : éléments sautés, boucles infinies.",
          "Supposer les données triées : appliquer une recherche binaire ou un two-pointers sur du non-trié donne des résultats silencieusement faux.",
          "Débordement d'entier dans `(gauche + droite) // 2` : en C/Java, préférer `gauche + (droite - gauche) // 2` (en Python les entiers sont arbitraires).",
          "Comparer des flottants avec `==` : utiliser une tolérance (`abs(a - b) < 1e-9`).",
          "Croire qu'un algorithme testé sur 3 exemples est correct : les cas limites (vide, un élément, doublons, trié, inversé) sont là où ça casse.",
        ],
      },
    ],
  },
  {
    id: "debugging-algorithmes",
    title: "Déboguer un algorithme",
    level: 3,
    intro:
      "Quand le résultat est faux : la méthode pour localiser l'erreur de logique.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Reproduire au plus petit",
            detail:
              "Réduire l'entrée jusqu'au plus petit cas qui échoue. Un bug visible sur 3 éléments se comprend ; sur 10 000, non.",
          },
          {
            title: "Tracer à la main",
            detail:
              "Exécuter l'algorithme sur papier pour ce petit cas, étape par étape. L'écart entre la trace attendue et la trace réelle localise le bug.",
          },
          {
            title: "Vérifier l'invariant",
            detail:
              "Formuler ce qui devrait être vrai à chaque itération, et l'afficher (ou l'assert). La première itération qui le viole est le coupable.",
          },
          {
            title: "Tester les cas limites",
            detail:
              "Vide, un élément, deux éléments, doublons, déjà trié, trié à l'envers. La plupart des bugs d'algorithmes vivent là.",
          },
          {
            title: "Comparer à une référence",
            detail:
              "Confronter la sortie à une version naïve mais évidemment correcte (tri à bulles, force brute) sur des entrées aléatoires.",
          },
        ],
      },
      {
        kind: "text",
        text: "L'affichage intermédiaire (`print` des variables clés à chaque itération) reste l'outil le plus efficace pour les algorithmes : on voit la logique s'exécuter, pas juste le résultat final.",
      },
    ],
  },
  {
    id: "tester-algorithmes",
    title: "Tester les algorithmes",
    level: 3,
    intro:
      "Prouver la correction par les tests : propriétés à vérifier systématiquement.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Tests d'un tri",
        code: `import random\n\ndef test_tri(tri):\n    assert tri([]) == []                    # vide\n    assert tri([1]) == [1]                  # un élément\n    assert tri([3, 1, 2]) == [1, 2, 3]      # cas simple\n    assert tri([2, 2, 1]) == [1, 2, 2]      # doublons\n    for _ in range(100):\n        tab = [random.randint(0, 100) for _ in range(50)]\n        assert tri(tab[:]) == sorted(tab)   # contre la référence\n\ntest_tri(tri_insertion)`,
      },
      {
        kind: "list",
        items: [
          "Toujours tester contre une implémentation de référence (`sorted`, force brute) sur des entrées aléatoires.",
          "Vérifier les propriétés, pas juste des exemples : résultat trié, mêmes éléments (permutation), stabilité si promise.",
          "Pour les algorithmes randomisés (quicksort à pivot aléatoire) : répéter les tests, la première exécution peut avoir de la chance.",
          "Idempotence : trier deux fois doit donner le même résultat que trier une fois.",
        ],
      },
    ],
  },
  {
    id: "benchmark-mesure",
    title: "Mesurer au lieu de supposer",
    level: 3,
    intro:
      "La complexité prédit la croissance ; le chronomètre valide sur vos données.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Comparer deux tris",
        code: `import random, time\n\ndef chronometrer(fonction, tab):\n    debut = time.perf_counter()\n    fonction(tab)\n    return time.perf_counter() - debut\n\nfor n in (1_000, 10_000, 100_000):\n    tab = [random.randint(0, n) for _ in range(n)]\n    t1 = chronometrer(tri_insertion, tab[:])\n    t2 = chronometrer(tri_fusion, tab[:])\n    print(f"n={n} : insertion {t1:.3f}s, fusion {t2:.3f}s")`,
      },
      {
        kind: "list",
        items: [
          "Mesurer sur plusieurs tailles : c'est la courbe qui confirme la complexité, pas une mesure isolée.",
          "Chauffer avant de mesurer (une exécution à blanc) et répéter : le premier appel paie les caches froids.",
          "Comparer à données égales : même machine, mêmes entrées, même charge — sinon la comparaison ne vaut rien.",
          "`time.perf_counter()` mesure le temps écoulé avec la meilleure précision disponible ; éviter `time.time()` pour du benchmarking fin.",
        ],
      },
    ],
  },
  {
    id: "projets-avances",
    title: "Projets d'implémentation avancés",
    level: 3,
    intro:
      "Des projets qui forcent à combiner plusieurs algorithmes.",
    blocks: [
      {
        kind: "list",
        items: [
          "Visualiseur de tris : animer l'exécution des tris sur des barres, avec compteur de comparaisons et d'échanges — la complexité devient visible.",
          "Solveur de Sudoku : backtracking avec propagation de contraintes ; comparer avec et sans heuristique de choix de case.",
          "Plus court chemin sur carte : modéliser un graphe de villes, implémenter Dijkstra et A*, comparer les nœuds explorés.",
          "Compression Huffman : construire l'arbre à partir des fréquences, encoder/décoder un texte, mesurer le taux de compression.",
          "Autocomplétion : trie + parcours pour suggérer les mots, avec classement par fréquence.",
          "Détecteur de plagiat simplifié : hachage de k-grammes (winnowing) pour comparer deux textes.",
          "Planificateur de tâches : tri topologique sur un graphe de dépendances, détection de cycles.",
        ],
      },
      {
        kind: "text",
        text: "Le niveau « avancé » ne vient pas de la difficulté d'un algorithme isolé, mais de leur combinaison : un vrai projet assemble recherche, tri, graphes et hachage dans un même programme.",
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro:
      "Les références reconnues pour progresser en algorithmique.",
    blocks: [
      {
        kind: "list",
        items: [
          "« Introduction to Algorithms » (Cormen, Leiserson, Rivest, Stein) : la bible, complète et rigoureuse — exigeante, à lire par chapitres ciblés.",
          "« Grokking Algorithms » (Aditya Bhargava) : l'introduction la plus visuelle et accessible, idéale pour débuter.",
          "Visualgo : visualisations animées des algorithmes et structures de données, exécutables pas à pas dans le navigateur.",
          "CS50 (Harvard) : le cours d'introduction dont les premières semaines couvrent recherche et tri avec une excellente pédagogie.",
          "Big-O Cheat Sheet : le tableau de référence des complexités des algorithmes et structures courants.",
          "LeetCode (section « Explore ») : parcours guidés par thème (tableaux, programmation dynamique, graphes) pour pratiquer.",
        ],
      },
      {
        kind: "text",
        text: "Les livres et plateformes sont cités par leur nom exact pour être retrouvés sans ambiguïté. En algorithmique, la pratique régulière sur des problèmes variés compte plus que la lecture.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "L'algorithmique maîtrisée, voici les prolongements naturels.",
    blocks: [
      {
        kind: "fields",
        title: "Pistes de progression",
        fields: [
          {
            label: "`data-structures`",
            value:
              "Le jumeau de l'algorithmique : tableaux dynamiques, arbres équilibrés, tas, graphes — les structures sur lesquelles les algorithmes s'exécutent.",
          },
          {
            label: "`python`",
            value:
              "Approfondir le langage des exemples : `heapq`, `bisect`, `itertools`, `collections` — la bibliothèque standard regorge d'algorithmes prêts à l'emploi.",
          },
          {
            label: "`databases`",
            value:
              "Les index B-arbres, les jointures par hachage, les plans d'exécution : les bases de données sont de l'algorithmique appliquée à grande échelle.",
          },
          {
            label: "`machine-learning`",
            value:
              "Descente de gradient, arbres de décision, k-means : le ML moderne repose sur l'optimisation et les algorithmes d'approximation.",
          },
          {
            label: "Prochain pas concret",
            value:
              "Résoudre chaque semaine quelques problèmes variés (un tri, un graphe, une dynamique) : la fluidité algorithmique se construit par la répétition, pas par la lecture.",
          },
        ],
      },
    ],
  },
];

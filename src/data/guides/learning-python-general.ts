import type { LearningSection } from "../skill-guides";

/**
 * Learning Page généraliste de Python : le langage dans ses usages
 * principaux — web, data, scripting/automatisation, sécurité. Contenu
 * volontairement transversal : cette page sert cinq roadmaps
 * (backend-developer, ai-engineer, data-scientist, cybersecurity-engineer,
 * robotics-engineer). 3 niveaux d'information (Aperçu / Pratique /
 * Approfondi) avec divulgation progressive. Tous les textes supportent le
 * code inline entre backticks. Commandes toujours expliquées : label,
 * commande, pourquoi, vérification.
 */
export const LEARNING_PYTHON_GENERAL: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Python, pourquoi il est partout, et ce qui le distingue des autres langages.",
    blocks: [
      {
        kind: "text",
        text: "Python est un langage de programmation généraliste réputé pour sa lisibilité : syntaxe claire, indentation significative, typage dynamique. Le code Python se lit presque comme du pseudo-code — ce qui accélère l'apprentissage des concepts fondamentaux (fonctions, objets, asynchrone) transférables ensuite à tous les autres langages.",
      },
      {
        kind: "text",
        text: "Sa force n'est pas seulement la syntaxe : c'est l'écosystème. Des bibliothèques matures existent pour presque tout — APIs web, analyse de données, automatisation, sécurité — ce qui fait de Python le couteau suisse du développement : on prototype vite, et on va souvent jusqu'en production avec.",
      },
    ],
  },
  {
    id: "python-partout",
    title: "Un langage, quatre terrains",
    level: 1,
    intro:
      "Les quatre grands usages de Python couverts par cette page — et par vos roadmaps.",
    blocks: [
      {
        kind: "diagram",
        title: "Python et ses domaines",
        lines: [
          "                    PYTHON",
          "                       │",
          "        ┌──────────────┼──────────────┐",
          "        ▼              ▼              ▼              ▼",
          "   Web / API     Data / IA     Scripting      Sécurité",
          "   FastAPI,      pandas,       argparse,     hashlib,",
          "   Django,       numpy,        pathlib,      analyse",
          "   httpx         matplotlib    subprocess     de logs",
        ],
      },
      {
        kind: "fields",
        title: "Les quatre terrains",
        fields: [
          {
            label: "Web",
            value: "APIs et applications : FastAPI pour les APIs modernes, Django pour les applications complètes, httpx/requests pour consommer des APIs.",
          },
          {
            label: "Data / IA",
            value: "Analyse et machine learning : pandas pour les données tabulaires, numpy pour le calcul, matplotlib pour visualiser.",
          },
          {
            label: "Scripting",
            value: "Automatisation du quotidien : renommer des fichiers, traiter des CSV, appeler des outils système — le remplaçant moderne du shell pour les tâches complexes.",
          },
          {
            label: "Sécurité",
            value: "Outillage défensif : vérifier des intégrités (hash), analyser des logs, automatiser des contrôles — la boîte à outils du SOC et de l'audit.",
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
      "Python est un excellent premier langage : les prérequis sont minces, mais réels.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut avant de commencer",
        fields: [
          {
            label: "Terminal",
            value:
              "Naviguer dans les dossiers, lancer des commandes : Python s'utilise en ligne de commande, l'aisance au terminal est indispensable.",
          },
          {
            label: "Logique de base",
            value:
              "Variables, conditions, boucles — les concepts se découvrent en Python même, mais une première exposition aide.",
          },
          {
            label: "Éditeur de texte",
            value:
              "VS Code ou équivalent : écrire et exécuter des fichiers `.py`, pas seulement du code dans un navigateur.",
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
      "Installer Python proprement et vérifier que tout fonctionne.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier l'installation de Python",
        command: "python3 --version",
        why: "Affiche la version installée (visez 3.10+). Sur la plupart des systèmes, `python3` désigne l'interpréteur — `python` seul peut pointer vers une vieille version ou ne pas exister.",
        verify: "python3 -c \"print('hello')\"",
      },
      {
        kind: "text",
        text: "Si Python est absent : python.org (Windows/macOS) ou le gestionnaire de paquets du système (Linux). N'installez jamais de paquets dans le Python système — les environnements virtuels (section suivante) isolent chaque projet.",
      },
    ],
  },
  {
    id: "python-vs-python3",
    title: "python vs python3, pip vs pip3",
    level: 2,
    intro:
      "La confusion la plus fréquente des débutants, dissipée une fois pour toutes.",
    blocks: [
      {
        kind: "table",
        headers: ["Commande", "Ce que c'est", "À utiliser quand"],
        rows: [
          ["python3", "L'interpréteur Python 3 du système", "Toujours, par défaut"],
          ["python", "Souvent un alias — ou Python 2 sur vieux systèmes", "Éviter sauf si configuré explicitement"],
          ["pip", "Installe des paquets pour un Python", "Dans un venv activé uniquement"],
          ["python3 -m pip", "pip du python3 explicite", "La forme non ambiguë, à préférer"],
        ],
      },
      {
        kind: "text",
        text: "La règle : `python3 -m pip` ne ment jamais — il installe pour l'interpréteur `python3` affiché. Dans un environnement virtuel activé, `python` et `pip` pointent vers le venv : c'est le seul contexte où les formes courtes sont sûres.",
      },
    ],
  },
  {
    id: "environnements-virtuels",
    title: "Environnements virtuels",
    level: 2,
    intro:
      "Isoler les dépendances de chaque projet : le réflexe le plus important de l'écosystème Python.",
    blocks: [
      {
        kind: "command",
        label: "Créer un environnement virtuel",
        command: "python3 -m venv venv",
        why: "Crée un dossier `venv/` contenant un Python isolé : les paquets installés ensuite n'affectent que ce projet. Deux projets peuvent ainsi utiliser deux versions incompatibles d'une même bibliothèque sans conflit.",
        verify: "ls venv/bin/python*",
      },
      {
        kind: "command",
        label: "Activer l'environnement",
        command: "source venv/bin/activate",
        why: "Bascule le shell sur le Python du venv : `python` et `pip` pointent désormais vers l'environnement isolé (le prompt affiche `(venv)`). À faire dans chaque nouveau terminal avant de travailler.",
        verify: "which python",
      },
      {
        kind: "text",
        text: "Le dossier `venv/` ne se versionne jamais (ajouté au `.gitignore`) : il se recrée avec `python3 -m venv venv` + `pip install -r requirements.txt`. Pour quitter : `deactivate`. Oublier d'activer le venv avant `pip install`, c'est polluer le Python système — l'erreur classique.",
      },
    ],
  },
  {
    id: "pip",
    title: "Installer des paquets avec pip",
    level: 2,
    intro:
      "Le gestionnaire de paquets : installer, figer, reproduire.",
    blocks: [
      {
        kind: "command",
        label: "Installer un paquet",
        command: "pip install requests",
        why: "Installe `requests` (client HTTP de référence) depuis PyPI, le dépôt officiel de paquets Python, dans l'environnement actif. Toujours avec le venv activé.",
        verify: "pip show requests",
      },
      {
        kind: "command",
        label: "Figer les dépendances",
        command: "pip freeze > requirements.txt",
        why: "Écrit la liste exacte des paquets installés avec leurs versions. Ce fichier versionné permet de recréer l'environnement à l'identique : `pip install -r requirements.txt`. C'est le contrat de reproductibilité du projet.",
        verify: "cat requirements.txt",
      },
      {
        kind: "list",
        items: [
          "Installer avec le venv activé, toujours — `pip install` hors venv pollue le système.",
          "Versionner `requirements.txt`, jamais le dossier `venv/`.",
          "En cas de conflit de versions : recréer un venv propre plutôt que de rafistoler.",
        ],
      },
    ],
  },
  {
    id: "premier-script",
    title: "Premier script",
    level: 2,
    intro:
      "Écrire, exécuter et comprendre un premier programme Python.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "bonjour.py",
        code: `def saluer(nom: str) -> str:
    return f"Bonjour, {nom} !"


if __name__ == "__main__":
    prenom = input("Votre prénom ? ")
    print(saluer(prenom))`,
      },
      {
        kind: "command",
        label: "Exécuter le script",
        command: "python3 bonjour.py",
        why: "Lance l'interpréteur sur le fichier : Python lit le code de haut en bas et exécute le bloc `if __name__ == \"__main__\"` — la convention du point d'entrée d'un script.",
        verify: "echo $?",
      },
      {
        kind: "text",
        text: "Trois choses à noter : l'indentation définit les blocs (pas d'accolades), `f\"...\"` interpole les variables dans les chaînes, et les annotations `: str` / `-> str` documentent les types sans les imposer — Python reste dynamique.",
      },
    ],
  },
  {
    id: "editeurs",
    title: "Éditeurs et outils",
    level: 2,
    intro:
      "Configurer un environnement de travail productif pour Python.",
    blocks: [
      {
        kind: "fields",
        title: "Les choix courants",
        fields: [
          {
            label: "VS Code + extension Python",
            value: "Le défaut : coloration, exécution, débogueur, sélection d'interpréteur (choisir le Python du venv).",
          },
          {
            label: "PyCharm",
            value: "L'IDE dédié : refactoring, inspections avancées — plus lourd, plus assisté.",
          },
          {
            label: "Jupyter",
            value: "Le notebook interactif : cellules de code exécutables une par une — le standard de la data science.",
          },
          {
            label: "Terminal + REPL",
            value: "`python3` seul ouvre l'interpréteur interactif : tester une expression en 5 secondes, sans fichier.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le réglage qui compte : l'éditeur doit utiliser le Python du venv du projet (sélecteur d'interpréteur), sinon l'autocomplétion et l'exécution voient d'autres paquets que le terminal. Data : Jupyter ; web/scripting : VS Code ; les deux se complètent.",
      },
    ],
  },
  {
    id: "workflow-professionnel",
    title: "Workflow professionnel",
    level: 2,
    intro:
      "Les habitudes d'un développeur Python au quotidien.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un venv par projet, activé avant tout `pip install` et toute exécution.",
          "`requirements.txt` versionné et à jour : l'environnement se recrée d'une commande.",
          "Formateur + linter dès le début (voir Qualité) : le style se décide une fois, pas à chaque revue.",
          "Tests avec pytest dès que le code dépasse le script jetable — voir la section dédiée.",
          "Ne jamais committer de secrets : clés API et mots de passe en variables d'environnement.",
        ],
      },
    ],
  },
  {
    id: "debugging",
    title: "Déboguer",
    level: 2,
    intro:
      "Lire une erreur Python et inspecter un programme en cours d'exécution.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Point d'arrêt avec breakpoint()",
        code: `def moyenne(notes):
    breakpoint()  # l'exécution s'arrête ici, en console interactive
    return sum(notes) / len(notes)

moyenne([10, 20])`,
      },
      {
        kind: "list",
        items: [
          "Lire la traceback de bas en haut : la dernière ligne dit l'erreur, les lignes au-dessus disent où.",
          "`breakpoint()` ouvre un débogueur interactif : `n` (ligne suivante), `c` (continuer), `p variable` (inspecter).",
          "Dans VS Code : point d'arrêt au clic + F5 — inspection visuelle des variables.",
          "Les erreurs les plus fréquentes : `IndentationError` (mélange espaces/tabulations), `NameError` (faute de frappe), `TypeError` (mauvais type passé).",
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro:
      "Quatre projets de difficulté croissante, un par grand domaine.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Utilitaire CLI (scripting)",
        fields: [
          { label: "Ce qu'on construit", value: "Un outil en ligne de commande : renommer des fichiers en masse avec aperçu" },
          { label: "Ce qu'on apprend", value: "pathlib, argparse, boucle, gestion d'erreurs" },
          { label: "Difficulté", value: "Faible — une journée" },
          { label: "Projet suivant", value: "API ou analyse de données" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — API REST (web)",
        fields: [
          { label: "Ce qu'on construit", value: "Une API de gestion de tâches avec FastAPI : CRUD, validation, erreurs" },
          { label: "Ce qu'on apprend", value: "Routes, modèles, TestClient, documentation auto-générée" },
          { label: "Difficulté", value: "Moyenne — quelques jours" },
          { label: "Projet suivant", value: "Analyse de données" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Analyse de données (data)",
        fields: [
          { label: "Ce qu'on construit", value: "Nettoyage et visualisation d'un jeu de données CSV avec pandas" },
          { label: "Ce qu'on apprend", value: "DataFrames, filtrage, groupby, graphiques" },
          { label: "Difficulté", value: "Moyenne — quelques jours" },
          { label: "Projet suivant", value: "Outil de sécurité" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Analyseur de logs (sécurité)",
        fields: [
          { label: "Ce qu'on construit", value: "Détection d'anomalies dans des logs : tentatives répétées, pics d'erreurs" },
          { label: "Ce qu'on apprend", value: "Parsing, expressions régulières, seuils, rapports" },
          { label: "Difficulté", value: "Élevée — une à deux semaines" },
          { label: "Projet suivant", value: "Projet de la roadmap choisie" },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "syntaxe-base",
    title: "Syntaxe : variables et types",
    level: 3,
    intro:
      "Les fondations : comment Python représente les données.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Les types de base",
        code: `nom = "Ada"          # str : chaîne de caractères
age = 36             # int : entier (précision illimitée)
prix = 19.99         # float : nombre décimal
actif = True         # bool : True / False
rien = None          # None : l'absence de valeur

# Typage dynamique : la variable peut changer de type...
x = 5
x = "cinq"  # autorisé, mais déconseillé en pratique
# ... et fort : les opérations incohérentes lèvent une erreur
# "a" + 1  -> TypeError (pas de conversion implicite)`,
      },
      {
        kind: "text",
        text: "Python est dynamique (le type est attaché à la valeur, pas à la variable) mais fort (pas de conversion silencieuse abusive). L'indentation — 4 espaces par niveau — n'est pas cosmétique : elle définit les blocs. Un mélange d'espaces et de tabulations lève `IndentationError`.",
      },
    ],
  },
  {
    id: "chaines-nombres",
    title: "Chaînes et nombres",
    level: 3,
    intro:
      "Manipuler le texte et les nombres : les opérations du quotidien.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Opérations courantes",
        code: `# Chaînes
nom = "  Ada Lovelace  "
nom.strip()            # "Ada Lovelace" (sans espaces)
nom.lower()            # "  ada lovelace  "
f"{nom.strip()} ({len(nom.strip())})"  # f-string : interpolation
"ada@example.com".split("@")  # ['ada', 'example.com']

# Nombres
7 / 2      # 3.5  (division réelle)
7 // 2     # 3    (division entière)
7 % 2      # 1    (reste)
2 ** 10    # 1024 (puissance)
round(3.14159, 2)  # 3.14`,
      },
      {
        kind: "text",
        text: "Les f-strings (`f\"...{var}...\"`) sont la façon moderne d'interpoler — lisibles et rapides. Les chaînes sont immuables : chaque transformation renvoie une nouvelle chaîne. Pour les calculs monétaires, préférez `decimal.Decimal` aux floats (0.1 + 0.2 ≠ 0.3 en binaire).",
      },
    ],
  },
  {
    id: "conditions-boucles",
    title: "Conditions et boucles",
    level: 3,
    intro:
      "Contrôler le flux : les structures qui font tout le reste.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Structures de contrôle",
        code: `age = 20
if age < 13:
    categorie = "enfant"
elif age < 18:
    categorie = "ado"
else:
    categorie = "adulte"

# Boucle for : itère sur une séquence (pas de compteur manuel)
for nom in ["ada", "grace", "katherine"]:
    print(nom)

for i in range(3):      # 0, 1, 2
    print(i)

# Boucle while : tant qu'une condition est vraie
tentatives = 0
while tentatives < 3:
    tentatives += 1`,
      },
      {
        kind: "text",
        text: "En Python, on itère sur les éléments directement, pas sur des indices — `for nom in noms` plutôt que `for i in range(len(noms))`. `break` sort de la boucle, `continue` passe à l'itération suivante. Une boucle `while True` sans `break` est une boucle infinie : toujours prévoir la sortie.",
      },
    ],
  },
  {
    id: "collections",
    title: "Collections : listes, dicts, tuples, sets",
    level: 3,
    intro:
      "Les quatre conteneurs : savoir lequel choisir, c'est déjà programmer.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Les quatre conteneurs",
        code: `notes = [12, 15, 9]              # list : ordonnée, modifiable
notes.append(18)                   # [12, 15, 9, 18]
notes[0]                           # 12 (indice 0)

utilisateur = {"nom": "ada", "age": 36}  # dict : clé -> valeur
utilisateur["email"] = "a@b.c"     # ajout / modification
utilisateur.get("tel")             # None (pas d'erreur si absent)

point = (48.85, 2.35)              # tuple : ordonné, immuable
lat, lon = point                   # déballage (unpacking)

tags = {"python", "api", "python"} # set : éléments uniques
# {'python', 'api'} — les doublons disparaissent`,
      },
      {
        kind: "table",
        headers: ["Conteneur", "Ordonné", "Modifiable", "Usage typique"],
        rows: [
          ["list", "Oui", "Oui", "Séquences : résultats, lignes, files"],
          ["dict", "Oui (insertion)", "Oui", "Données nommées : JSON, configs, registres"],
          ["tuple", "Oui", "Non", "Valeurs liées : coordonnées, retours multiples"],
          ["set", "Non", "Oui", "Unicité : dédupliquer, appartenances rapides"],
        ],
      },
    ],
  },
  {
    id: "comprehensions",
    title: "Compréhensions",
    level: 3,
    intro:
      "L'idiome Python par excellence : construire des collections en une ligne lisible.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Comprehensions de listes et dicts",
        code: `notes = [12, 15, 9, 18, 7]

# Carrés des notes paires : la boucle en une ligne
pairs = [n for n in notes if n % 2 == 0]       # [12, 18]

# Transformation
libelles = [f"note: {n}/20" for n in notes]

# Dict : inverser un mapping
codes = {"fr": "France", "mg": "Madagascar"}
inverses = {v: k for k, v in codes.items()}    # {'France': 'fr', ...}

# Équivalent verbeux (à éviter) :
pairs2 = []
for n in notes:
    if n % 2 == 0:
        pairs2.append(n)`,
      },
      {
        kind: "text",
        text: "Une compréhension reste lisible tant qu'elle tient sur une ligne et n'imbrique pas plus de deux niveaux. Au-delà, la boucle explicite redevient préférable — la concision ne doit jamais sacrifier la clarté.",
      },
    ],
  },
  {
    id: "fonctions",
    title: "Fonctions",
    level: 3,
    intro:
      "Découper le code en unités nommées : paramètres, retours, portée.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Fonctions bien découpées",
        code: `def calculer_tva(prix_ht: float, taux: float = 0.20) -> float:
    """Calcule le prix TTC. taux : 0.20 par défaut."""
    return prix_ht * (1 + taux)


def resumer(notes: list[float]) -> dict:
    return {
        "min": min(notes),
        "max": max(notes),
        "moyenne": sum(notes) / len(notes),
    }

# Appels : positionnel, nommé, déballage
calculer_tva(100)                 # 120.0 (taux par défaut)
calculer_tva(100, taux=0.055)     # 105.5
args = [100, 0.20]
calculer_tva(*args)                # déballage de liste`,
      },
      {
        kind: "text",
        text: "Bonnes habitudes : une fonction fait une chose, son nom est un verbe, ses paramètres ont des valeurs par défaut sensées, et elle retourne plutôt qu'elle n'affiche. Les annotations de types (`: float`, `-> float`) documentent sans contraindre — elles deviennent précieuses avec un vérificateur comme mypy.",
      },
    ],
  },
  {
    id: "poo-classes",
    title: "POO : classes et objets",
    level: 3,
    intro:
      "Structurer le code en entités qui portent données et comportements.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Une classe complète",
        code: `class CompteBancaire:
    def __init__(self, titulaire: str, solde: float = 0.0):
        self.titulaire = titulaire
        self.solde = solde

    def deposer(self, montant: float) -> None:
        if montant <= 0:
            raise ValueError("montant positif requis")
        self.solde += montant

    def __str__(self) -> str:
        return f"{self.titulaire} : {self.solde:.2f} €"


compte = CompteBancaire("Ada", 100.0)
compte.deposer(50)
print(compte)  # Ada : 150.00 €`,
      },
      {
        kind: "text",
        text: "`__init__` initialise l'objet, `self` désigne l'instance, les méthodes `__str__` et consorts (dunder) personnalisent le comportement. Python n'a pas de vrai `private` : un attribut préfixé `_` signale « usage interne » par convention. L'héritage existe, mais la composition (un objet qui en contient d'autres) est souvent préférable.",
      },
    ],
  },
  {
    id: "modules-paquets",
    title: "Modules et paquets",
    level: 3,
    intro:
      "Organiser le code en fichiers : imports, paquets, exécution.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Découper un projet",
        code: `# maths/tva.py
TAUX_DEFAUT = 0.20

def calculer_tva(prix_ht, taux=TAUX_DEFAUT):
    return prix_ht * (1 + taux)

# main.py
from maths.tva import calculer_tva, TAUX_DEFAUT

print(calculer_tva(100))  # 120.0`,
      },
      {
        kind: "list",
        items: [
          "Un fichier `.py` = un module ; un dossier avec `__init__.py` (ou non, depuis 3.3) = un paquet.",
          "Imports absolus (`from maths.tva import ...`) : lisibles, à préférer aux relatifs.",
          "Éviter les imports circulaires (A importe B qui importe A) : signe d'un découpage à revoir.",
          "`if __name__ == \"__main__\"` : le code sous ce test ne s'exécute qu'en lancement direct, pas à l'import.",
        ],
      },
    ],
  },
  {
    id: "gestion-erreurs",
    title: "Gestion des erreurs",
    level: 3,
    intro:
      "Les exceptions : les lever, les attraper, ne pas les masquer.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "try / except bien utilisé",
        code: `def lire_config(chemin):
    try:
        with open(chemin) as f:
            return f.read()
    except FileNotFoundError:
        return None  # config absente : valeur par défaut
    except PermissionError as e:
        raise RuntimeError(f"config illisible : {chemin}") from e
    # Pas de except Exception nu : il masquerait les vrais bugs`,
      },
      {
        kind: "text",
        text: "Attraper l'exception précise (`FileNotFoundError`), pas `Exception` : un `except` trop large cache les bugs. `raise ... from e` conserve la cause d'origine dans la traceback. Et la règle d'or : ne jamais laisser un `except: pass` silencieux — une erreur ignorée est une erreur qui reviendra en production.",
      },
    ],
  },
  {
    id: "fichiers",
    title: "Fichiers avec pathlib",
    level: 3,
    intro:
      "Manipuler fichiers et dossiers de façon moderne et portable.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "pathlib : l'API moderne",
        code: `from pathlib import Path

dossier = Path("documents")
dossier.mkdir(exist_ok=True)

fichier = dossier / "notes.txt"   # / surcharge : jointure de chemins
fichier.write_text("Bonjour\\n", encoding="utf-8")
contenu = fichier.read_text(encoding="utf-8")

for txt in dossier.glob("*.txt"):  # tous les .txt du dossier
    print(txt.name, txt.stat().st_size, "octets")`,
      },
      {
        kind: "text",
        text: "`pathlib` remplace `os.path` : orienté objet, lisible, portable (Windows/Linux). `with open(...)` reste utile pour les gros fichiers lus par morceaux. Toujours préciser `encoding=\"utf-8\"` : l'encodage par défaut dépend du système, source classique de bugs entre machines.",
      },
    ],
  },
  {
    id: "stdlib-essentielle",
    title: "Bibliothèque standard essentielle",
    level: 3,
    intro:
      "La stdlib couvre énormément : connaître ces modules évite de réinventer.",
    blocks: [
      {
        kind: "fields",
        title: "Les modules à connaître",
        fields: [
          {
            label: "json",
            value: "`json.loads` / `json.dumps` : lire et écrire du JSON — le format d'échange universel des APIs.",
          },
          {
            label: "csv",
            value: "`csv.DictReader` : lire des CSV en dicts nommés par colonne — la base du traitement de données.",
          },
          {
            label: "datetime",
            value: "Dates et durées : `datetime.now(timezone.utc)` pour des timestamps non ambigus (toujours avec fuseau).",
          },
          {
            label: "argparse",
            value: "Arguments en ligne de commande : transforme un script en vrai outil CLI (voir Scripting).",
          },
          {
            label: "subprocess",
            value: "Exécuter des commandes système depuis Python et récupérer leur sortie.",
          },
          {
            label: "collections",
            value: "`Counter` (compter des occurrences), `defaultdict`, `deque` — les conteneurs spécialisés.",
          },
          {
            label: "itertools",
            value: "Itération avancée : chaînage, regroupement, combinaisons — sans charger la mémoire.",
          },
          {
            label: "logging",
            value: "Logs structurés par niveaux (DEBUG → CRITICAL) — voir la section dédiée ci-dessous.",
          },
        ],
      },
    ],
  },
  {
    id: "web-requetes",
    title: "Web : consommer des APIs",
    level: 3,
    intro:
      "Parler HTTP depuis Python : le b.a.-ba du web et de l'intégration.",
    blocks: [
      {
        kind: "command",
        label: "Installer un client HTTP",
        command: "pip install requests",
        why: "`requests` est le client HTTP le plus lisible de l'écosystème : `requests.get(url).json()` suffit dans 90 % des cas. Pour du code asynchrone, `httpx` est l'équivalent moderne.",
        verify: "python3 -c \"import requests; print(requests.__version__)\"",
      },
      {
        kind: "code",
        language: "python",
        title: "GET, POST et gestion d'erreurs",
        code: `import requests

# Lecture
r = requests.get("https://api.exemple.com/articles", timeout=10)
r.raise_for_status()          # lève une exception si statut >= 400
articles = r.json()

# Écriture
cree = requests.post(
    "https://api.exemple.com/articles",
    json={"titre": "Bonjour"},  # sérialisé en JSON automatiquement
    headers={"Authorization": "Bearer MON_TOKEN"},
    timeout=10,
)
print(cree.status_code)  # 201 attendu`,
      },
      {
        kind: "text",
        text: "Toujours un `timeout` : sans lui, une API lente bloque le programme indéfiniment. `raise_for_status()` transforme les erreurs HTTP en exceptions traitables. Le token en variable d'environnement, jamais en dur — `os.environ[\"API_TOKEN\"]`.",
      },
    ],
  },
  {
    id: "web-api-fastapi",
    title: "Web : créer une API",
    level: 3,
    intro:
      "Exposer ses propres endpoints avec FastAPI : le framework moderne de référence.",
    blocks: [
      {
        kind: "command",
        label: "Installer FastAPI et le serveur",
        command: "pip install fastapi uvicorn",
        why: "`fastapi` fournit le framework (routes, validation, documentation auto-générée) ; `uvicorn` est le serveur ASGI qui l'exécute. Le duo standard pour une API Python moderne.",
        verify: "python3 -c \"import fastapi, uvicorn; print('ok')\"",
      },
      {
        kind: "code",
        language: "python",
        title: "api.py — une API complète en 20 lignes",
        code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()
articles: dict[int, dict] = {}

class ArticleIn(BaseModel):
    titre: str
    contenu: str = ""

@app.post("/articles", status_code=201)
def creer(article: ArticleIn):
    new_id = len(articles) + 1
    articles[new_id] = {"id": new_id, **article.model_dump()}
    return articles[new_id]

@app.get("/articles/{article_id}")
def lire(article_id: int):
    if article_id not in articles:
        raise HTTPException(404, "introuvable")
    return articles[article_id]`,
      },
      {
        kind: "command",
        label: "Lancer le serveur",
        command: "uvicorn api:app --reload",
        why: "Démarre le serveur sur `http://localhost:8000` : `api` = le fichier, `app` = l'objet FastAPI. `--reload` redémarre à chaque modification — parfait en développement, à retirer en production.",
        verify: "curl -s http://localhost:8000/docs | head -c 100",
      },
      {
        kind: "text",
        text: "La documentation interactive est générée automatiquement sur `/docs` : chaque route, chaque modèle y est décrit et testable. La validation (`titre: str` requis) est automatique — un payload invalide reçoit une 422 sans une ligne de code.",
      },
    ],
  },
  {
    id: "data-numpy-pandas",
    title: "Data : numpy et pandas",
    level: 3,
    intro:
      "Le duo de l'analyse de données : calcul vectoriel et tables manipulables.",
    blocks: [
      {
        kind: "command",
        label: "Installer les bibliothèques data",
        command: "pip install pandas numpy",
        why: "`numpy` apporte les tableaux multidimensionnels et le calcul vectoriel rapide ; `pandas` construit dessus les DataFrames — des tables avec colonnes nommées, filtrables et agrégeables. Le socle de toute analyse en Python.",
        verify: "python3 -c \"import pandas, numpy; print(pandas.__version__)\"",
      },
      {
        kind: "code",
        language: "python",
        title: "Analyser un CSV en quelques lignes",
        code: `import pandas as pd

df = pd.read_csv("ventes.csv")          # charge le fichier en DataFrame
print(df.head())                        # aperçu des premières lignes
print(df.describe())                    # stats : moyenne, min, max...

# Filtrer : ventes 2026 du produit "clavier"
sel = df[(df["annee"] == 2026) & (df["produit"] == "clavier")]

# Agréger : chiffre d'affaires par mois
ca_mois = df.groupby("mois")["montant"].sum()
print(ca_mois.sort_values(ascending=False).head(3))`,
      },
      {
        kind: "text",
        text: "La mentalité pandas : on manipule des colonnes entières, pas des lignes une par une — c'est à la fois plus lisible et des ordres de grandeur plus rapide (le calcul se fait en C sous le capot). `groupby` + agrégation couvre 80 % des analyses tabulaires.",
      },
    ],
  },
  {
    id: "data-visualisation",
    title: "Data : visualiser",
    level: 3,
    intro:
      "Un graphique vaut mille lignes de `describe()` : les bases de la visualisation.",
    blocks: [
      {
        kind: "text",
        text: "`matplotlib` est la bibliothèque historique (courbes, histogrammes, nuages de points) ; `df.plot()` de pandas en est un raccourci direct. Pour des graphiques plus élégants sans effort, `seaborn` construit sur matplotlib avec des défauts soignés. En notebook Jupyter, les figures s'affichent inline — l'analyse devient narrative : code, graphique, interprétation.",
      },
      {
        kind: "code",
        language: "python",
        title: "Premier graphique depuis un DataFrame",
        code: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("ventes.csv")
ca_mois = df.groupby("mois")["montant"].sum()

ca_mois.plot(kind="bar", title="CA par mois")
plt.xlabel("Mois")
plt.ylabel("Montant (€)")
plt.tight_layout()
plt.savefig("ca_par_mois.png")  # ou plt.show() en interactif`,
      },
    ],
  },
  {
    id: "scripting-cli",
    title: "Scripting : de vrais outils CLI",
    level: 3,
    intro:
      "Transformer un script en outil : arguments, aide, codes de retour.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "renommer.py — CLI avec argparse",
        code: `import argparse
from pathlib import Path

def main():
    p = argparse.ArgumentParser(description="Renomme les fichiers en masse")
    p.add_argument("dossier", type=Path, help="dossier à traiter")
    p.add_argument("--prefixe", default="doc_", help="préfixe ajouté")
    p.add_argument("--dry-run", action="store_true",
                   help="affiche sans rien modifier")
    args = p.parse_args()

    for f in sorted(args.dossier.glob("*")):
        if f.is_file():
            cible = f.with_name(args.prefixe + f.name)
            print(f"{f.name} -> {cible.name}")
            if not args.dry_run:
                f.rename(cible)

if __name__ == "__main__":
    main()`,
      },
      {
        kind: "text",
        text: "`argparse` génère l'aide (`--help`), valide les types et rend le script utilisable par d'autres. Le `--dry-run` est une habitude de pro pour tout script qui modifie : on vérifie l'aperçu avant d'agir. Un bon CLI se termine avec un code de retour significatif (0 = succès).",
      },
    ],
  },
  {
    id: "automatisation",
    title: "Scripting : automatiser le système",
    level: 3,
    intro:
      "Piloter des commandes système depuis Python : le pont entre script et machine.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "subprocess : exécuter et capturer",
        code: `import subprocess

# Exécute une commande, capture la sortie, lève si échec
res = subprocess.run(
    ["df", "-h", "/"],
    capture_output=True, text=True, check=True,
)
print(res.stdout)

# Chaîner : lister les gros fichiers via du shell
res = subprocess.run(
    "du -sh * | sort -hr | head -5",
    shell=True, capture_output=True, text=True, cwd="/var/log",
)
print(res.stdout)`,
      },
      {
        kind: "list",
        items: [
          "`check=True` : une commande en échec lève `CalledProcessError` au lieu de continuer silencieusement.",
          "Préférer la liste d'arguments à `shell=True` : évite les injections quand des variables sont interpolées.",
          "Planification : un script fiable + cron (Linux) ou planificateur de tâches = une automatisation.",
          "Journaliser : un script automatisé écrit ses actions dans un fichier de log — muet, il est indéboguable.",
        ],
      },
    ],
  },
  {
    id: "securite-bases",
    title: "Sécurité : hachage et intégrité",
    level: 3,
    intro:
      "Vérifier que des données n'ont pas été altérées : le hachage cryptographique.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Empreinte SHA-256 d'un fichier",
        code: `import hashlib
from pathlib import Path

def sha256_fichier(chemin: Path) -> str:
    h = hashlib.sha256()
    with chemin.open("rb") as f:
        for bloc in iter(lambda: f.read(65536), b""):
            h.update(bloc)      # lecture par blocs : pas de surcharge mémoire
    return h.hexdigest()

empreinte = sha256_fichier(Path("sauvegarde.zip"))
print(empreinte)
# Comparer avec l'empreinte publiée : identique = intègre`,
      },
      {
        kind: "text",
        text: "SHA-256 produit une empreinte unique : le moindre octet modifié change totalement le résultat. Usages défensifs : vérifier un téléchargement, détecter une modification de fichier critique, stocker des mots de passe — avec un hachage adapté aux mots de passe (bcrypt/argon2, avec sel), jamais SHA-256 seul.",
      },
    ],
  },
  {
    id: "securite-logs",
    title: "Sécurité : analyser des logs",
    level: 3,
    intro:
      "Détecter les comportements suspects dans des journaux : l'outillage défensif typique.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Détecter les tentatives répétées (brute force)",
        code: `import re
from collections import Counter

MOTIF = re.compile(r"Failed password for \\S+ from (?P<ip>[0-9.]+)")

ips = Counter()
with open("/var/log/auth.log", encoding="utf-8", errors="ignore") as f:
    for ligne in f:
        m = MOTIF.search(ligne)
        if m:
            ips[m.group("ip")] += 1

for ip, n in ips.most_common(10):
    if n > 20:
        print(f"ALERTE : {n} échecs depuis {ip}")`,
      },
      {
        kind: "text",
        text: "Le pattern : parser (regex), compter (`Counter`), seuiller (plus de N événements = suspect). C'est la brique de base de la détection — les SIEM industriels font la même chose à grande échelle. En défensif, on analyse ses propres logs ; scanner des systèmes tiers sans autorisation est illégal.",
      },
    ],
  },
  {
    id: "securite-bonnes-pratiques",
    title: "Sécurité : coder sans faille",
    level: 3,
    intro:
      "Les réflexes de code qui évitent les vulnérabilités les plus courantes.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Comparaison sûre et secrets",
        code: `import hmac
import os
from hashlib import sha256

# Comparer des secrets : compare_digest (temps constant)
# == classique : vulnérable aux attaques temporelles
attendu = os.environ["API_KEY_HASH"]
reçu = sha256(os.environ.get("API_KEY", "").encode()).hexdigest()
if hmac.compare_digest(reçu, attendu):
    print("clé valide")

# Ne JAMAIS faire :
# mot_de_passe = "admin123"          # secret en dur
# subprocess.run(f"ls {nom}", shell=True)  # injection via nom`,
      },
      {
        kind: "list",
        items: [
          "Secrets en variables d'environnement, jamais dans le code ni les logs.",
          "Comparaison de secrets en temps constant (`hmac.compare_digest`).",
          "Pas d'interpolation dans les commandes shell ni les requêtes SQL : paramètres liés, listes d'arguments.",
          "Valider toute entrée externe (fichier, réseau, utilisateur) avant usage.",
          "Dépendances à jour : `pip` installe aussi les vulnérabilités — auditer avec `pip-audit` en CI.",
        ],
      },
    ],
  },
  {
    id: "asyncio-intro",
    title: "Asyncio : l'asynchrone",
    level: 3,
    intro:
      "Traiter des milliers d'attentes avec un seul thread : `async`/`await`.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Requêtes concurrentes avec asyncio",
        code: `import asyncio
import httpx

async def recuperer(client: httpx.AsyncClient, url: str) -> int:
    r = await client.get(url, timeout=10)
    return r.status_code

async def main():
    urls = ["https://api.exemple.com/a", "https://api.exemple.com/b"]
    async with httpx.AsyncClient() as client:
        # Les requêtes partent ensemble, pas l'une après l'autre
        statuts = await asyncio.gather(
            *(recuperer(client, u) for u in urls)
        )
    print(statuts)

asyncio.run(main())`,
      },
      {
        kind: "text",
        text: "`async`/`await` sert les opérations d'attente (réseau, disque), pas le calcul : pendant qu'une requête voyage, d'autres avancent. Pour du calcul lourd, ce sont les threads/processus (`concurrent.futures`) — le GIL empêche le vrai parallélisme de threads en Python pur (voir Performance).",
      },
    ],
  },
  {
    id: "tests-pytest",
    title: "Tests avec pytest",
    level: 3,
    intro:
      "Prouver que le code fonctionne : les bases du test en Python.",
    blocks: [
      {
        kind: "command",
        label: "Installer pytest",
        command: "pip install pytest",
        why: "Le framework de test standard : fonctions `test_*`, assertions natives avec `assert`, fixtures pour les contextes partagés.",
        verify: "pytest --version",
      },
      {
        kind: "code",
        language: "python",
        title: "test_tva.py",
        code: `import pytest
from tva import calculer_tva

def test_tva_20():
    assert calculer_tva(100) == 120.0

@pytest.mark.parametrize("prix,taux,attendu", [
    (100, 0.20, 120.0),
    (100, 0.055, 105.5),
    (0, 0.20, 0.0),
])
def test_tva_cas(prix, taux, attendu):
    assert calculer_tva(prix, taux) == pytest.approx(attendu)

def test_taux_invalide():
    with pytest.raises(ValueError):
        calculer_tva(100, 1.5)`,
      },
      {
        kind: "text",
        text: "`pytest.approx` compare les floats avec tolérance (0.1 + 0.2 !). `parametrize` multiplie les cas sans dupliquer le test. Pour les APIs, le TestClient de FastAPI exerce les vraies routes — voir la page Tests backend.",
      },
    ],
  },
  {
    id: "qualite-ruff",
    title: "Qualité : ruff",
    level: 3,
    intro:
      "Linter et formater : un style homogène sans y penser.",
    blocks: [
      {
        kind: "command",
        label: "Installer ruff",
        command: "pip install ruff",
        why: "`ruff` remplace flake8, black et isort en un seul outil ultra-rapide : il signale les problèmes (`ruff check`) et reformate (`ruff format`).",
        verify: "ruff --version",
      },
      {
        kind: "command",
        label: "Vérifier et formater le projet",
        command: "ruff check . && ruff format .",
        why: "`check` liste les défauts (imports inutilisés, variables mortes, erreurs courantes) ; `format` réécrit le code au style standard. Lancé avant chaque commit, il élimine les débats de style en revue.",
        verify: "ruff check . 2>&1 | tail -3",
      },
    ],
  },
  {
    id: "typage-progressif",
    title: "Typage progressif",
    level: 3,
    intro:
      "Ajouter des types quand le projet grandit : annotations et mypy.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Annotations utiles",
        code: `def trouver_utilisateur(identifiants: list[int], cible: int) -> dict | None:
    """Retourne l'utilisateur ou None : l'appelant doit gérer les deux cas."""
    for u in charger():
        if u["id"] == cible and cible in identifiants:
            return u
    return None

# Structures précises avec TypedDict / dataclass
from dataclasses import dataclass

@dataclass
class Article:
    id: int
    titre: str
    contenu: str = ""`,
      },
      {
        kind: "text",
        text: "Le typage est progressif : on annote les frontières (signatures publiques, modèles de données) et on laisse l'inférence pour l'intérieur. `mypy` vérifie ensuite la cohérence — les annotations deviennent un filet, sans changer l'exécution. `dict | None` (syntaxe 3.10+) dit explicitement « peut être absent ».",
      },
    ],
  },
  {
    id: "logging-structuré",
    title: "Logs structurés",
    level: 3,
    intro:
      "Des logs en JSON requêtables : la base du diagnostic en production.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Logger JSON avec la stdlib",
        code: `import json
import logging
import sys

handler = logging.StreamHandler(sys.stdout)
handler.setFormatter(logging.Formatter("%(message)s"))
logger = logging.getLogger("app")
logger.addHandler(handler)
logger.setLevel(logging.INFO)

def log(niveau: str, evenement: str, **champs):
    logger.log(getattr(logging, niveau),
               json.dumps({"niveau": niveau, "event": evenement, **champs}))

log("INFO", "tache_terminee", tache="export", duree_ms=420)
log("ERROR", "echec_paiement", user_id="u1", erreur="carte_refusee")`,
      },
      {
        kind: "text",
        text: "Niveaux : DEBUG (détail dev), INFO (pulsation normale), WARNING (anormal géré), ERROR (échec), CRITICAL (service KO). En JSON avec champs stables, les logs se filtrent et s'agrègent — voir la page Observabilité pour l'exploitation.",
      },
    ],
  },
  {
    id: "performance-gil",
    title: "Performance et GIL",
    level: 3,
    intro:
      "Comprendre les limites de vitesse de Python — et quand elles comptent vraiment.",
    blocks: [
      {
        kind: "text",
        text: "Le GIL (Global Interpreter Lock) n'autorise qu'un thread à exécuter du bytecode Python à la fois : les threads n'accélèrent pas le calcul pur. En pratique, c'est rarement le problème : la plupart des programmes passent leur temps à attendre (réseau, disque, base) — là, l'asynchrone et les threads excellent.",
      },
      {
        kind: "list",
        items: [
          "Attentes I/O → `asyncio` ou threads : des milliers d'opérations concurrentes, un seul cœur suffit.",
          "Calcul pur → `multiprocessing` : un processus par cœur, chacun avec son GIL — au prix de la mémoire et de la communication.",
          "Calcul numérique → numpy/pandas : le calcul se fait en C, hors GIL — vectoriser plutôt que boucler.",
          "Mesurer d'abord : `cProfile` identifie le vrai goulot — optimiser sans profiler, c'est deviner.",
        ],
      },
    ],
  },
  {
    id: "packaging",
    title: "Packaging : distribuer son code",
    level: 3,
    intro:
      "Rendre un projet installable : la structure minimale qui fonctionne.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "pyproject.toml minimal",
        code: `[project]
name = "mon-outil"
version = "0.1.0"
description = "Utilitaire de renommage"
requires-python = ">=3.10"
dependencies = ["requests>=2.0"]

[project.scripts]
mon-outil = "mon_outil.cli:main"`,
      },
      {
        kind: "command",
        label: "Installer le projet en mode développement",
        command: "pip install -e .",
        why: "Installe le projet depuis son dossier : le code reste modifiable sur place et la commande `mon-outil` devient disponible dans le terminal. Le `-e` (editable) évite de réinstaller à chaque modification.",
        verify: "mon-outil --help",
      },
      {
        kind: "text",
        text: "`pyproject.toml` est le standard moderne : métadonnées, dépendances, point d'entrée console. Pour un usage interne, `pip install -e .` ou un dépôt Git suffisent ; PyPI n'est nécessaire que pour une distribution publique.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pièges classiques des développeurs Python, et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Installer hors venv",
            value:
              "Problem : paquets dans le Python système, conflits entre projets. Why : oubli d'activer le venv. Better : `python3 -m venv venv` par projet, toujours activé.",
          },
          {
            label: "Argument mutable par défaut",
            value:
              "Problem : `def f(items=[])` partage la même liste entre appels. Why : l'objet défaut est créé une fois. Better : `def f(items=None)` puis `items = items or []`.",
          },
          {
            label: "except: pass silencieux",
            value:
              "Problem : les erreurs disparaissent, les bugs deviennent invisibles. Why : « pour que ça ne plante pas ». Better : logger l'erreur ou la laisser remonter.",
          },
          {
            label: "Comparer avec `is` au lieu de `==`",
            value:
              "Problem : `is` compare l'identité, pas la valeur — faux négatifs subtils. Why : confusion. Better : `==` pour les valeurs, `is` uniquement pour `None`.",
          },
          {
            label: "Boucler sur des indices",
            value:
              "Problem : `for i in range(len(l))` — verbeux et fragile. Why : habitude d'autres langages. Better : `for x in l`, ou `enumerate(l)` si l'indice sert.",
          },
          {
            label: "Concaténer des chemins en string",
            value:
              "Problem : `dossier + \"/\" + nom` casse sur Windows. Why : habitude shell. Better : `pathlib` et l'opérateur `/`.",
          },
          {
            label: "Secrets en dur",
            value:
              "Problem : clés API committées dans Git. Why : facilité. Better : variables d'environnement, `.env` non versionné.",
          },
          {
            label: "Ignorer l'encodage",
            value:
              "Problem : `UnicodeDecodeError` sur une machine, pas sur une autre. Why : encodage par défaut du système. Better : toujours `encoding=\"utf-8\"` explicite.",
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
      "Les habitudes qui distinguent un script jetable d'un code qui dure.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un venv par projet, des dépendances figées, un README qui dit comment installer.",
          "Des fonctions courtes au nom verbeux, des modules découpés par responsabilité.",
          "Typer les frontières (signatures, modèles), tester la logique métier avec pytest.",
          "Logger plutôt que `print` dès que le code dépasse l'expérimentation.",
          "Gérer les erreurs explicitement : l'échec est un cas nominal, pas une surprise.",
          "Relire son code comme un étranger : si ça demande un commentaire, c'est souvent le nom qui est mauvais.",
        ],
      },
    ],
  },
  {
    id: "glossaire",
    title: "Glossaire",
    level: 3,
    intro:
      "Le vocabulaire Python, en une page.",
    blocks: [
      {
        kind: "fields",
        title: "Termes essentiels",
        fields: [
          { label: "Interpréteur", value: "Le programme qui lit et exécute le code Python (`python3`)." },
          { label: "REPL", value: "Boucle interactive : lire, évaluer, afficher — pour expérimenter." },
          { label: "venv", value: "Environnement virtuel : Python isolé par projet." },
          { label: "pip", value: "Installe les paquets depuis PyPI, le dépôt officiel." },
          { label: "Module", value: "Un fichier `.py` importable." },
          { label: "Paquet", value: "Un ensemble de modules distribué ensemble." },
          { label: "Compréhension", value: "Construction compacte de collections (`[x for x in ...]`)." },
          { label: "Décorateur", value: "Fonction qui modifie une autre fonction (`@app.get`)." },
          { label: "GIL", value: "Verrou global : un seul thread exécute du Python à la fois." },
          { label: "f-string", value: "Chaîne avec interpolation : `f\"bonjour {nom}\"." },
          { label: "Dunder", value: "Méthode spéciale `__nom__` (`__init__`, `__str__`)." },
          { label: "ASGI", value: "Interface des serveurs Python asynchrones (uvicorn)." },
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
          {
            label: "Tutoriel Python",
            value: "docs.python.org/fr/3/tutorial : le tutoriel officiel, en français — la première lecture.",
          },
          {
            label: "Documentation Python",
            value: "docs.python.org : référence du langage et de la bibliothèque standard.",
          },
          {
            label: "FastAPI — documentation",
            value: "fastapi.tiangolo.com : guide de l'API moderne, du premier endpoint au déploiement.",
          },
          {
            label: "pandas — documentation",
            value: "pandas.pydata.org/docs : guide utilisateur et référence des DataFrames.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les projets progressifs de cette page, un par domaine.",
          "Ensuite : la page Python de votre roadmap pour le prolongement adapté à votre parcours.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Python maîtrisé dans ses bases : voici les prolongements par parcours.",
    blocks: [
      {
        kind: "list",
        items: [
          "Backend (`backend-developer`) : `api-rest` pour concevoir des APIs, `django` pour les applications complètes, `sql` pour la persistance.",
          "IA (`ai-engineer`) : `machine-learning` pour les modèles, `statistics` pour les fondations mathématiques.",
          "Data (`data-scientist`) : `sql` pour interroger les entrepôts, `statistics` puis `machine-learning` pour modéliser.",
          "Sécurité (`cybersecurity-engineer`) : `linux` pour le terrain d'opération, `web-security` pour les cibles, `secure-coding` pour coder sans faille.",
          "Robotique (`robotics-engineer`) : `linux` pour l'embarqué, `ros` pour le framework robotique, `systemes-embarques` pour le matériel.",
          "Revenir à la roadmap : valider `python` et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

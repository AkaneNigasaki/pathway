import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Django : de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Approche : le framework « batteries included » d'abord — comprendre ce que
 * Django fournit gratuitement (ORM, admin, auth, sécurité) avant d'ajouter
 * quoi que ce soit de tiers.
 */
export const LEARNING_DJANGO: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce que Django est, ce qu'il n'est pas, et pourquoi il reste le framework web Python de référence pour construire vite sans sacrifier la rigueur.",
    blocks: [
      {
        kind: "text",
        text: "Django est un framework web open source écrit en Python, créé en 2005 et maintenu par la Django Software Foundation. Sa philosophie tient en deux mots : « batteries included » — tout ce qu'une application web classique a besoin est fourni et intégré : ORM, migrations, interface d'administration, authentification, formulaires, sécurité. Vous n'assemblez pas une pile de bibliothèques : vous partez d'un socle cohérent.",
      },
      {
        kind: "text",
        text: "Point essentiel : Django est un framework, pas une bibliothèque. Il impose une structure — un projet contient des applications, chaque application suit l'architecture MVT (Modèle-Vue-Template) — et cette contrainte est volontaire : deux développeurs Django retrouvent leurs repères dans n'importe quel projet Django. En échange, Django convient moins aux cas très atypiques (API temps réel, microservices ultra-légers) où un micro-framework comme Flask ou FastAPI laisse plus de liberté.",
      },
      {
        kind: "text",
        text: "Django est un framework web Python « batteries included » qui structure une application en modèles (données), vues (logique) et templates (présentation).",
      },
      {
        kind: "text",
        text: "Avant Django, chaque site web réinventait l'authentification, l'accès base de données, la protection CSRF… Django mutualise ces fondations éprouvées pour que vous vous concentriez sur la logique métier.",
      },
      {
        kind: "text",
        text: "Sites avec base de données et back-office : blogs, e-commerce, intranets, SaaS, APIs. Moins adapté : temps réel pur (WebSockets — voir Channels), scripts simples, prototypes sans persistance.",
      },
      {
        kind: "fields",
        title: "Django : l'essentiel",
        fields: [
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni un CMS (comme WordPress), ni un langage, ni un serveur. Django est du Python : il s'exécute derrière un serveur d'application (Gunicorn, uWSGI…) et ne sert pas lui-même les fichiers en production.",
          },
        ],
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : requête → réponse",
    level: 1,
    intro:
      "Le seul cycle à comprendre avant tout le reste : comment une URL saisie dans un navigateur devient une page HTML.",
    blocks: [
      {
        kind: "diagram",
        title: "Le voyage d'une requête dans Django",
        lines: [
          "Navigateur : GET /articles/42/",
          "     │",
          "     ▼",
          "URLs (urls.py) : quelle vue pour ce chemin ?",
          "     │  path('articles/<int:pk>/', views.detail)",
          "     ▼",
          "Vue (views.py) : la logique",
          "     │  récupère l'article via le modèle",
          "     ▼",
          "Modèle (models.py) : l'ORM interroge la base",
          "     │  Article.objects.get(pk=42)",
          "     ▼",
          "Template (detail.html) : le HTML est rempli",
          "     │  avec les données de l'article",
          "     ▼",
          "Réponse HTTP → le navigateur affiche la page",
        ],
      },
      {
        kind: "text",
        text: "C'est l'architecture MVT — Modèle, Vue, Template — la variante Django du célèbre MVC. Le modèle décrit les données et parle à la base via l'ORM (vous n'écrivez presque jamais de SQL). La vue contient la logique : elle reçoit la requête, interroge les modèles, choisit un template. Le template est du HTML avec des marqueurs qui insèrent les données. Retenez l'ordre : URL → vue → modèle → template → réponse.",
      },
      {
        kind: "list",
        items: [
          "Une URL est un contrat : elle promet qu'un chemin mène à une vue précise.",
          "La vue ne touche jamais directement au SQL : elle passe par les modèles et l'ORM.",
          "Le template ne contient pas de logique métier : il affiche ce que la vue lui donne.",
          "Chaque couche est testable séparément : c'est tout l'intérêt de la séparation.",
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
      "Django est du Python organisé : sans bases solides en Python, le framework semblera magique — et la magie non comprise devient vite un piège.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut maîtriser avant Django",
        fields: [
          {
            label: "Python : classes et héritage",
            value:
              "Les modèles, vues et formulaires Django sont des classes qui héritent de classes du framework. Si l'héritage et les méthodes spéciales sont flous, tout semblera arbitraire.",
          },
          {
            label: "Python : modules et paquets",
            value:
              "Un projet Django est un paquet Python (`__init__.py`, imports entre applications). Comprendre `import` évite 90 % des erreurs de démarrage.",
          },
          {
            label: "Environnements virtuels",
            value:
              "`venv` + `pip` : savoir isoler les dépendances d'un projet. Django s'installe dans un venv, jamais dans le Python système.",
          },
          {
            label: "HTTP et HTML : les bases",
            value:
              "Requêtes GET/POST, codes de statut, formulaires HTML. Django parle HTTP toute la journée : ces notions doivent être acquises.",
          },
          {
            label: "SQL : notions",
            value:
              "Pas besoin d'être expert — l'ORM écrit le SQL — mais comprendre tables, clés primaires et jointures rend l'ORM limpide au lieu de magique.",
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
      "Django s'installe avec pip dans un environnement virtuel : trois commandes, deux minutes, zéro surprise.",
    blocks: [
      {
        kind: "command",
        label: "Créer l'environnement virtuel du projet",
        command: "python -m venv .venv",
        why: "Crée un dossier `.venv` contenant un Python isolé pour ce projet. Isoler chaque projet évite les conflits de versions entre dépendances : le Django du projet A ne perturbera jamais le projet B.",
        verify:
          "Un dossier `.venv` apparaît dans votre répertoire courant. Sur Windows il contient `Scripts\\`, sur macOS/Linux `bin/`.",
      },
      {
        kind: "command",
        label: "Activer l'environnement virtuel",
        command: "source .venv/bin/activate",
        why: "L'activation fait pointer `python` et `pip` vers le Python isolé du projet. Tant que le venv est actif, tout ce que vous installez va dans le projet, pas dans le système. Sur Windows : `.venv\\Scripts\\activate`.",
        verify:
          "Votre invite de terminal affiche `(.venv)` au début de la ligne.",
      },
      {
        kind: "command",
        label: "Installer Django",
        command: "pip install django",
        why: "Télécharge et installe la dernière version stable de Django (et ses dépendances : `asgiref`, `sqlparse`, `tzdata`) depuis PyPI, dans le venv actif. Django est un paquet Python comme un autre : pas d'installeur séparé.",
        verify:
          "La commande affiche `Successfully installed django-…`. Vérifiez avec `python -m django --version` : vous devez voir un numéro de version (ex. `5.x`).",
      },
      {
        kind: "text",
        text: "Quelle version ? `pip install django` installe la dernière version stable, ce qui convient pour apprendre. En entreprise, on fige la version dans un fichier `requirements.txt` (ex. `Django==5.1.*`) pour que toute l'équipe et la production utilisent exactement la même. Ne mélangez jamais plusieurs projets dans un seul venv.",
      },
    ],
  },
  {
    id: "premier-projet",
    title: "Premier projet : startproject",
    level: 2,
    intro:
      "Une commande génère le squelette d'un projet Django complet : suivez-la pas à pas et comprenez chaque fichier créé.",
    blocks: [
      {
        kind: "command",
        label: "Générer le squelette du projet",
        command: "django-admin startproject monsite",
        why: "`django-admin` est l'utilitaire en ligne de commande de Django. `startproject` crée un dossier `monsite/` contenant la configuration du projet et un script `manage.py`. C'est le point de départ officiel de tout projet Django.",
        verify:
          "Un dossier `monsite/` est créé. À l'intérieur : un autre dossier `monsite/` (la configuration) et `manage.py`.",
      },
      {
        kind: "diagram",
        title: "Ce que startproject a créé",
        lines: [
          "monsite/                  ← racine du projet",
          "├── manage.py             ← votre interface : tout passe par lui",
          "└── monsite/              ← paquet de configuration",
          "    ├── __init__.py",
          "    ├── settings.py       ← TOUTE la config : BDD, apps, clés…",
          "    ├── urls.py           ← la table des routes du projet",
          "    ├── asgi.py           ← point d'entrée asynchrone (prod)",
          "    └── wsgi.py           ← point d'entrée synchrone (prod)",
        ],
      },
      {
        kind: "fields",
        title: "Les fichiers créés, en une phrase chacun",
        fields: [
          {
            label: "manage.py",
            value:
              "Le couteau suisse : c'est par lui que vous lancerez le serveur, les migrations, la console… `python manage.py <commande>`.",
          },
          {
            label: "settings.py",
            value:
              "Le centre de contrôle : base de données, applications installées, clé secrète, fuseau horaire. Vous y reviendrez constamment.",
          },
          {
            label: "urls.py",
            value:
              "La table de routage du projet : associe chaque chemin d'URL à une vue. Au début il ne contient que la route vers l'admin.",
          },
          {
            label: "wsgi.py / asgi.py",
            value:
              "Les points d'entrée pour la production : le serveur d'application (Gunicorn, Uvicorn…) les utilisera. Vous n'y touchez presque jamais.",
          },
        ],
      },
      {
        kind: "text",
        text: "Vocabulaire crucial : dans Django, un **projet** est l'ensemble (configuration + applications), une **application** est un module réutilisable qui fait une chose précise (blog, boutique, comptes…). Un projet contient plusieurs applications ; une application peut théoriquement être réutilisée dans un autre projet. La commande suivante crée votre première application.",
      },
    ],
  },
  {
    id: "manage-py",
    title: "manage.py : les 6 commandes du quotidien",
    level: 2,
    intro:
      "Six commandes couvrent 95 % de votre usage quotidien de Django. Chacune est expliquée : ce qu'elle fait, pourquoi, quand.",
    blocks: [
      {
        kind: "command",
        label: "Créer une application",
        command: "python manage.py startapp blog",
        why: "`startapp` génère le squelette d'une application Django nommée `blog` (dossier avec `models.py`, `views.py`, `urls.py` à créer, `admin.py`, `tests.py`, dossier `migrations/`). Une application = un périmètre fonctionnel : le blog, les comptes utilisateurs, la boutique…",
        verify:
          "Un dossier `blog/` apparaît avec ses fichiers. N'oubliez pas d'ajouter `'blog'` dans `INSTALLED_APPS` de `settings.py`, sinon Django l'ignore.",
      },
      {
        kind: "command",
        label: "Lancer le serveur de développement",
        command: "python manage.py runserver",
        why: "Démarre un serveur web local (http://127.0.0.1:8000/) avec rechargement automatique à chaque modification de fichier. C'est votre boucle de travail : codez, sauvegardez, actualisez le navigateur.",
        verify:
          "Ouvrez http://127.0.0.1:8000/ : la page fusée Django « The install worked successfully! » s'affiche.",
      },
      {
        kind: "command",
        label: "Créer les fichiers de migration",
        command: "python manage.py makemigrations",
        why: "Compare vos modèles (`models.py`) à l'état actuel de la base et génère les fichiers de migration qui décrivent les différences (créer une table, ajouter une colonne…). C'est l'étape « planifier » : rien n'est encore appliqué à la base.",
        verify:
          "Django affiche `Migrations for 'blog':` suivi du nom du fichier créé dans `blog/migrations/`.",
      },
      {
        kind: "command",
        label: "Appliquer les migrations à la base",
        command: "python manage.py migrate",
        why: "Exécute les migrations en attente : crée/modifie réellement les tables dans la base de données. C'est l'étape « exécuter ». Les deux commandes sont séparées exprès : vous pouvez relire le plan avant de l'appliquer.",
        verify:
          "Django liste les migrations appliquées avec `[OK]`. Un fichier `db.sqlite3` apparaît : c'est votre base de développement.",
      },
      {
        kind: "command",
        label: "Créer un compte administrateur",
        command: "python manage.py createsuperuser",
        why: "Crée un utilisateur avec tous les droits, qui pourra se connecter à l'interface d'administration auto-générée (`/admin/`). Interactif : il demande nom d'utilisateur, email et mot de passe.",
        verify:
          "Connectez-vous sur http://127.0.0.1:8000/admin/ avec ces identifiants : le tableau de bord admin s'affiche.",
      },
      {
        kind: "command",
        label: "Ouvrir une console Django",
        command: "python manage.py shell",
        why: "Lance un interpréteur Python avec tout Django chargé : vos modèles sont importables directement. Idéal pour tester une requête ORM ou inspecter des données sans écrire de vue.",
      },
      {
        kind: "text",
        text: "Base de données par défaut : SQLite, un simple fichier `db.sqlite3`. Zéro configuration, parfait pour apprendre. En production on utilise PostgreSQL ou MySQL — l'ORM rend le changement quasi transparent, c'est tout l'intérêt de ne pas écrire de SQL à la main.",
      },
    ],
  },
  {
    id: "premiere-vue-url",
    title: "Première vue et première URL",
    level: 2,
    intro:
      "Le tutoriel minimal : afficher « Bonjour » dans le navigateur en 4 étapes, et comprendre chaque pièce du puzzle.",
    blocks: [
      {
        kind: "steps",
                steps: [
          {
            title: "Écrire la vue",
            detail:
              "Dans `blog/views.py`, définissez une fonction qui reçoit la requête et renvoie une réponse : `from django.http import HttpResponse` puis `def bonjour(request): return HttpResponse(\"Bonjour, Django !\")`. Une vue, c'est une fonction (ou classe) : requête en entrée, réponse en sortie.",
          },
          {
            title: "Créer urls.py dans l'application",
            detail:
              "Créez `blog/urls.py` : `from django.urls import path` + `from . import views`, puis `urlpatterns = [path('bonjour/', views.bonjour)]`. Ce fichier dit : le chemin `bonjour/` est géré par la vue `bonjour`.",
          },
          {
            title: "Brancher l'app dans les URLs du projet",
            detail:
              "Dans `monsite/urls.py`, ajoutez `path('blog/', include('blog.urls'))` (en important `include`). Le projet délègue tout ce qui commence par `blog/` à l'application. Sans cette ligne, Django ne connaît pas vos routes.",
          },
          {
            title: "Tester dans le navigateur",
            detail:
              "Lancez `python manage.py runserver` et ouvrez http://127.0.0.1:8000/blog/bonjour/ : « Bonjour, Django ! » s'affiche. Vous venez de traverser tout le cycle : URL → vue → réponse.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Ce que chaque étape vous a appris",
        fields: [
          {
            label: "La vue",
            value:
              "C'est elle qui décide quoi répondre. Aujourd'hui du texte brut, demain un template rempli avec des données de la base.",
          },
          {
            label: "urls.py de l'app",
            value:
              "Chaque application déclare ses propres routes : le projet reste un simple aiguillage. C'est ce qui rend les apps réutilisables.",
          },
          {
            label: "include()",
            value:
              "Délègue un préfixe d'URL à un autre fichier de routes. Sans lui, toutes les routes vivraient dans un seul fichier ingérable.",
          },
        ],
      },
    ],
  },
  {
    id: "admin-interface",
    title: "L'admin auto-générée",
    level: 2,
    intro:
      "Le super-pouvoir de Django : une interface d'administration complète, générée gratuitement à partir de vos modèles.",
    blocks: [
      {
        kind: "text",
        text: "L'admin Django (`/admin/`) permet de créer, modifier, supprimer et rechercher les objets de votre base via une interface web propre — sans écrire une ligne de HTML. C'est un outil interne pour vous et votre équipe, pas pour les visiteurs du site : elle suppose des utilisateurs de confiance.",
      },
      {
        kind: "code",
        language: "python",
        title: "blog/admin.py — exposer un modèle dans l'admin",
        code: "from django.contrib import admin\nfrom .models import Article\n\n\n@admin.register(Article)\nclass ArticleAdmin(admin.ModelAdmin):\n    list_display = (\"titre\", \"auteur\", \"date_pub\")  # colonnes visibles\n    list_filter = (\"date_pub\",)                        # filtres latéraux\n    search_fields = (\"titre\", \"contenu\")              # barre de recherche",
      },
      {
        kind: "text",
        text: "L'admin est gratuite au départ et s'enrichit au fil du projet : commencez simple avec `@admin.register`, affinez avec `ModelAdmin` quand le besoin arrive.",
      },
      {
        kind: "fields",
        title: "Personnaliser l'admin, l'essentiel",
        fields: [          {
            label: "list_display",
            value:
              "Choisit les colonnes affichées dans la liste des objets. Par défaut, seul `__str__` du modèle s'affiche.",
          },
          {
            label: "list_filter",
            value:
              "Ajoute des filtres dans la barre latérale (par date, par statut…). Transforme l'admin en vrai outil de travail.",
          },
          {
            label: "search_fields",
            value:
              "Active la barre de recherche sur les champs indiqués. Indispensable dès que la table grandit.",
          },
          
        ],
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Workflow professionnel quotidien",
    level: 2,
    intro:
      "À quoi ressemble une journée de travail Django : la boucle courte que vous répéterez des centaines de fois.",
    blocks: [
      {
        kind: "diagram",
        title: "La boucle de développement Django",
        lines: [
          "1. Activer le venv → source .venv/bin/activate",
          "2. Modifier un modèle (models.py)",
          "3. makemigrations → relire le fichier généré",
          "4. migrate → la base suit le code",
          "5. Écrire / modifier la vue + le template",
          "6. runserver tourne déjà → actualiser le navigateur",
          "7. Tester dans l'admin (/admin/) les données créées",
          "8. Écrire un test (tests.py) → python manage.py test",
          "9. git add / commit → la base (db.sqlite3) n'est JAMAIS committée",
        ],
      },
      {
        kind: "list",
        items: [
          "Le serveur de développement recharge automatiquement vos fichiers Python : pas besoin de le redémarrer à chaque modification.",
          "`db.sqlite3` est ignoré par Git (ajoutez-le au `.gitignore`) : la base se reconstruit via les migrations.",
          "Les migrations, elles, SONT committées : c'est l'historique versionné de votre schéma de base.",
          "Travaillez toujours avec le venv activé : un `pip install` hors venv pollue le Python système.",
        ],
      },
    ],
  },
  {
    id: "editeurs-outils",
    title: "Éditeurs et outils",
    level: 2,
    intro:
      "Django est du Python standard : n'importe quel bon éditeur Python convient. Comparaison factuelle, sans verdict universel.",
    blocks: [
      {
        kind: "fields",
        title: "Éditeurs courants pour Django",
        fields: [
          {
            label: "VS Code",
            value:
              "Gratuit, extensions Python et Pylance : autocomplétion, diagnostics, débogueur intégré. Le choix le plus répandu, sans obligation.",
          },
          {
            label: "PyCharm",
            value:
              "Support Django natif (édition payante) : navigation dans les templates, exécution des commandes `manage.py` depuis l'IDE, inspections spécifiques. La version Community gratuite couvre déjà bien le Python pur.",
          },
          {
            label: "Zed / Neovim / autres",
            value:
              "Fonctionnent très bien avec un serveur de langage Python (Pylance, pyright). Django n'exige aucun IDE particulier.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Deux extensions d'écosystème utiles",
        fields: [
          {
            label: "django-debug-toolbar",
            value:
              "Paquet tiers très répandu : affiche dans le navigateur les requêtes SQL exécutées, leur durée, les templates utilisés. Le meilleur allié contre les requêtes N+1 (voir section dédiée).",
          },
          {
            label: "django-extensions",
            value:
              "Paquet tiers : ajoute des commandes `manage.py` pratiques (`shell_plus` avec auto-import des modèles, `show_urls`, génération de graphes de modèles).",
          },
        ],
      },
      {
        kind: "text",
        text: "Aucun outil n'est universellement meilleur : VS Code suffit pour apprendre et pour la plupart des projets professionnels. Choisissez selon votre confort, pas selon une hiérarchie imaginaire.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "architecture-mvt",
    title: "L'architecture MVT en détail",
    level: 3,
    intro:
      "MVT n'est pas un slogan : c'est une discipline de séparation qui décide où chaque ligne de code doit vivre.",
    blocks: [
      {
        kind: "text",
        text: "MVT = Modèle (données + règles métier), Vue (logique de la requête), Template (présentation). Django appelle « vue » ce que le pattern MVC classique appelle « contrôleur ».",
      },
      {
        kind: "fields",
        title: "MVT, couche par couche",
        fields: [          {
            label: "Le Modèle",
            value:
              "Une classe Python par table (`class Article(models.Model)`). Il définit les champs, les relations, et les méthodes métier (`publier()`, `est_recent()`). C'est la seule couche qui parle à la base de données.",
          },
          {
            label: "La Vue",
            value:
              "Reçoit l'objet `request`, interroge les modèles, prépare un dictionnaire de contexte, rend un template (ou renvoie du JSON / une redirection). Elle ne contient ni SQL ni HTML.",
          },
          {
            label: "Le Template",
            value:
              "Du HTML avec des balises `{{ variable }}` et `{% tag %}`. Il affiche, il ne calcule pas : pas de requêtes base de données, pas de logique métier dans les templates.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Mettre des requêtes ORM dans le template ou du HTML dans la vue. Symptôme : code impossible à tester. Règle : si ça touche la base, c'est dans le modèle ou la vue ; si ça produit du HTML, c'est dans le template.",
          },
          {
            label: "Bonne pratique",
            value:
              "« Fat models, thin views » : la logique métier vit dans les modèles (méthodes, managers), les vues restent de simples orchestrateurs. Vos tests vous remercieront.",
          },
        ],
      },
    ],
  },
  {
    id: "modeles",
    title: "Les modèles : vos tables en Python",
    level: 3,
    intro:
      "Un modèle Django est une classe Python qui décrit une table : chaque attribut est une colonne, chaque instance est une ligne.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "blog/models.py — un modèle complet",
        code: "from django.db import models\nfrom django.utils import timezone\n\n\nclass Article(models.Model):\n    titre = models.CharField(max_length=200)\n    slug = models.SlugField(unique=True)\n    contenu = models.TextField()\n    date_pub = models.DateTimeField(default=timezone.now)\n    publie = models.BooleanField(default=False)\n    auteur = models.ForeignKey(\n        \"auth.User\", on_delete=models.CASCADE, related_name=\"articles\"\n    )\n\n    class Meta:\n        ordering = [\"-date_pub\"]  # tri par défaut : récents d'abord\n\n    def __str__(self):\n        return self.titre\n\n    def publier(self):\n        \"\"\"Logique métier : vit dans le modèle, pas dans la vue.\"\"\"\n        self.publie = True\n        self.date_pub = timezone.now()\n        self.save()",
      },
      {
        kind: "text",
        text: "`class Article(models.Model)` déclare une table `blog_article` ; chaque `models.XxxField` est une colonne typée.",
      },
      {
        kind: "fields",
        title: "Décortiquer le modèle",
        fields: [          {
            label: "Pourquoi des classes",
            value:
              "Parce que la table gagne des comportements : `__str__` pour l'affichage, `publier()` pour la logique métier, `Meta` pour les options. La base n'est plus un simple stockage.",
          },
          {
            label: "Quand définir un modèle",
            value:
              "Dès qu'une information doit persister : utilisateurs, articles, commandes, commentaires… Si ça doit survivre au redémarrage du serveur, c'est un modèle.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `__str__` : l'admin affiche alors `Article object (1)` partout, illisible. Toujours définir `__str__` en premier.",
          },
          {
            label: "Bonne pratique",
            value:
              "`default=timezone.now` (la fonction, sans parenthèses) : elle est appelée à chaque création. `default=timezone.now()` figerait l'heure du démarrage du serveur pour tous les objets — bug classique.",
          },
          {
            label: "Concepts liés",
            value:
              "Migrations (la table naît d'une migration), ORM (comment interroger), `Meta` (options : tri, nom pluriel, contraintes).",
          },
        ],
      },
    ],
  },
  {
    id: "champs-modeles",
    title: "Les champs de modèle : choisir le bon type",
    level: 3,
    intro:
      "Le type de champ décide du type de colonne SQL, de la validation et du widget de formulaire généré. Choisir juste dès le départ évite des migrations douloureuses.",
    blocks: [
      {
        kind: "table",
        headers: ["Champ", "Usage", "Détail à connaître"],
        rows: [
          [
            "CharField",
            "Chaînes courtes : titres, noms, slugs",
            "`max_length` obligatoire — c'est la taille VARCHAR en base",
          ],
          [
            "TextField",
            "Textes longs : contenu, descriptions",
            "Pas de `max_length` ; rendu en `<textarea>` dans les formulaires",
          ],
          [
            "IntegerField / FloatField / DecimalField",
            "Nombres",
            "Argent → `DecimalField(max_digits=10, decimal_places=2)` : jamais de flottant pour la monnaie",
          ],
          [
            "BooleanField",
            "Vrai/faux : publié, actif",
            "Toujours un `default` explicite pour éviter le troisième état NULL",
          ],
          [
            "DateTimeField / DateField",
            "Dates et heures",
            "`auto_now_add=True` : rempli à la création ; `auto_now=True` : mis à jour à chaque `save()`",
          ],
          [
            "ForeignKey",
            "Relation plusieurs-vers-un (l'article a un auteur)",
            "`on_delete` obligatoire : `CASCADE` supprime les articles si l'auteur est supprimé",
          ],
          [
            "ManyToManyField",
            "Relation plusieurs-vers-plusieurs (article ↔ tags)",
            "Crée automatiquement une table de liaison ; se manipule via `article.tags.add(tag)`",
          ],
          [
            "OneToOneField",
            "Relation un-vers-un (profil ↔ utilisateur)",
            "Le pattern standard pour étendre le modèle `User` sans le remplacer",
          ],
          [
            "EmailField / URLField / SlugField",
            "Chaînes avec validation intégrée",
            "La validation a lieu dans les formulaires, pas en base : ce sont des CharField améliorés",
          ],
          [
            "FileField / ImageField",
            "Fichiers téléversés",
            "`ImageField` exige le paquet Pillow ; le fichier est stocké sur disque, seul le chemin va en base",
          ],
        ],
      },
      {
        kind: "fields",
        title: "Trois décisions qui comptent",
        fields: [
          {
            label: "null=True vs blank=True",
            value:
              "`null` concerne la base (colonne NULL autorisée), `blank` concerne la validation des formulaires (champ vide autorisé). Pour une chaîne optionnelle : `blank=True` sans `null=True` (on stocke `\"\"`, pas NULL — deux valeurs « vide » différentes créent des bugs).",
          },
          {
            label: "on_delete",
            value:
              "`CASCADE` : supprime les enfants avec le parent. `PROTECT` : interdit la suppression s'il reste des enfants. `SET_NULL` : met la clé à NULL (exige `null=True`). Réfléchissez-y à chaque ForeignKey : c'est une décision métier.",
          },
          {
            label: "related_name",
            value:
              "Nomme l'accès inverse : `user.articles.all()` au lieu du `user.article_set.all()` par défaut. Toujours le définir explicitement : le code devient lisible.",
          },
        ],
      },
    ],
  },
  {
    id: "orm-requetes",
    title: "L'ORM : interroger sans SQL",
    level: 3,
    intro:
      "L'ORM traduit des appels Python en SQL. Vous écrivez `Article.objects.filter(...)`, Django écrit le `SELECT`.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Les requêtes du quotidien",
        code: "# Tous les articles publiés, des plus récents aux plus anciens\nArticle.objects.filter(publie=True).order_by(\"-date_pub\")\n\n# Un seul objet (lève Article.DoesNotExist si absent)\narticle = Article.objects.get(slug=\"mon-article\")\n\n# Raccourci sûr dans une vue : 404 automatique si absent\nfrom django.shortcuts import get_object_or_404\narticle = get_object_or_404(Article, slug=\"mon-article\")\n\n# Créer\narticle = Article.objects.create(titre=\"Hello\", contenu=\"...\", auteur=user)\n\n# Chaînage : chaque appel affine la requête (elle ne s'exécute qu'à l'usage)\nrecents = Article.objects.filter(publie=True).exclude(auteur__isnull=True)[:10]",
      },
      {
        kind: "text",
        text: "`Model.objects` est le « manager » : le point d'entrée de toutes les requêtes sur la table. Chaque méthode renvoie un QuerySet chaînable.",
      },
      {
        kind: "text",
        text: "Le SQL concaténé à la main est verbeux et dangereux (injections). L'ORM échappe tous les paramètres automatiquement et rend le code lisible et portable entre bases.",
      },
      {
        kind: "fields",
        title: "Comprendre l'ORM",
        fields: [          {
            label: "Évaluation paresseuse",
            value:
              "`filter()` ne touche pas la base : il construit la requête. Elle ne s'exécute que quand vous itérez, affichez ou découpez le QuerySet. D'où le chaînage libre et gratuit.",
          },
          {
            label: "Traverser les relations",
            value:
              "Le double underscore traverse les clés étrangères : `Article.objects.filter(auteur__username=\"akane\")` génère la jointure. Pas besoin d'écrire le JOIN.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`get()` sans objet trouvé lève `DoesNotExist` (erreur 500). Dans une vue publique, utilisez `get_object_or_404()` : une page inexistante doit renvoyer 404, pas planter.",
          },
          {
            label: "Bonne pratique",
            value:
              "Ne jamais construire de SQL avec des f-strings. Si l'ORM ne suffit vraiment pas, utilisez `raw()` avec des paramètres (`%s`), jamais par interpolation.",
          },
        ],
      },
    ],
  },
  {
    id: "migrations",
    title: "Les migrations : versionner la base",
    level: 3,
    intro:
      "Les migrations sont l'historique Git de votre schéma de base : chaque changement de modèle devient un fichier versionné, rejouable partout.",
    blocks: [
      {
        kind: "diagram",
        title: "Le cycle de vie d'un changement de schéma",
        lines: [
          "1. Vous modifiez models.py (nouveau champ, nouveau modèle)",
          "2. makemigrations → Django COMPARE modèles vs état migré",
          "3. Un fichier 0003_article_resume.py est GÉNÉRÉ",
          "   → vous le RELISEZ (c'est du Python lisible)",
          "4. migrate → Django EXÉCUTE : ALTER TABLE…",
          "5. La table django_migrations enregistre : « 0003 appliquée »",
          "6. En production : même commande, même fichier → même schéma",
        ],
      },
      {
        kind: "text",
        text: "Une migration est un fichier Python qui décrit comment passer du schéma N au schéma N+1 ; `migrate` les applique dans l'ordre, sans jamais les rejouer deux fois.",
      },
      {
        kind: "fields",
        title: "Les migrations, en profondeur",
        fields: [          {
            label: "Pourquoi deux commandes",
            value:
              "`makemigrations` planifie (génère du code relisible et modifiable), `migrate` exécute. Cette séparation permet de vérifier — voire d'ajuster — le plan avant de toucher aux données.",
          },
          {
            label: "Quand",
            value:
              "À chaque modification de `models.py`. Et en déploiement : `migrate` fait partie du script de mise en production, après chaque livraison.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Modifier ou supprimer un fichier de migration déjà appliqué (en local ou ailleurs). Résultat : l'état enregistré et les fichiers divergent, Django ne sait plus où il en est. Règle : une migration appliquée est intouchable — on crée une nouvelle migration qui corrige.",
          },
          {
            label: "Bonne pratique",
            value:
              "Commitez toujours les fichiers de migration. Et avant `migrate` sur des données précieuses : sauvegarde de la base. Les migrations sont fiables, pas infaillibles.",
          },
          {
            label: "Commande utile",
            value:
              "`python manage.py showmigrations` liste les migrations appliquées (✓) ou en attente — le premier réflexe quand « la base ne correspond pas au code ».",
          },
        ],
      },
      {
        kind: "command",
        label: "Voir l'état des migrations",
        command: "python manage.py showmigrations",
        why: "Affiche toutes les migrations avec `[X]` (appliquée) ou `[ ]` (en attente), application par application. Quand un champ manque en base ou qu'une erreur de schéma survient, c'est ici qu'on diagnostique.",
      },
      {
        kind: "command",
        label: "Voir le SQL qu'une migration va exécuter",
        command: "python manage.py sqlmigrate blog 0003",
        why: "Affiche le SQL brut correspondant à la migration `0003` de l'app `blog`, sans l'exécuter. Utile pour comprendre ce que Django fait réellement, et pour les revues de migrations sensibles (grosses tables en production).",
      },
    ],
  },
  {
    id: "vues",
    title: "Les vues : fonctions et classes",
    level: 3,
    intro:
      "Deux styles de vues coexistent : les fonctions (explicites) et les classes génériques (concises). Il faut connaître les deux.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "blog/views.py — vue fonction",
        code: "from django.shortcuts import render, get_object_or_404\nfrom .models import Article\n\n\ndef liste_articles(request):\n    articles = Article.objects.filter(publie=True)\n    return render(request, \"blog/liste.html\", {\"articles\": articles})\n\n\ndef detail_article(request, slug):\n    article = get_object_or_404(Article, slug=slug, publie=True)\n    return render(request, \"blog/detail.html\", {\"article\": article})",
      },
      {
        kind: "code",
        language: "python",
        title: "blog/views.py — vues génériques à base de classes",
        code: "from django.views.generic import ListView, DetailView\nfrom .models import Article\n\n\nclass ListeArticles(ListView):\n    model = Article\n    template_name = \"blog/liste.html\"\n    context_object_name = \"articles\"\n    queryset = Article.objects.filter(publie=True)\n\n\nclass DetailArticle(DetailView):\n    model = Article\n    template_name = \"blog/detail.html\"\n    slug_field = \"slug\"",
      },
      {
        kind: "text",
        text: "Les vues fonctions montrent chaque étape explicitement ; les vues génériques (`ListView`, `DetailView`, `CreateView`…) factorisent les cas standards liste/détail/création/édition/suppression.",
      },
      {
        kind: "fields",
        title: "Fonctions vs classes génériques",
        fields: [          {
            label: "Pourquoi les deux existent",
            value:
              "80 % des pages d'un site classique sont « liste d'objets » ou « détail d'un objet » : les classes génériques évitent de réécrire ce boilerplate. Les fonctions restent supérieures dès que la logique sort du cadre.",
          },
          {
            label: "Quand utiliser quoi",
            value:
              "Apprenez avec les fonctions (vous voyez tout). Passez aux génériques quand vous réécrivez pour la troisième fois la même liste paginée. Ne commencez jamais par les génériques : leur « magie » (méthodes `get_queryset`, `get_context_data`) est obscure sans les bases.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Combattre une vue générique quand le besoin est spécifique : surcharger 5 méthodes pour un cas tordu, au lieu d'écrire une fonction claire de 15 lignes. Si la générique résiste, écrivez une fonction.",
          },
          {
            label: "Bonne pratique",
            value:
              "`render(request, template, contexte)` est le raccourci standard : il fusionne le template avec le dictionnaire et renvoie la réponse. Le dictionnaire s'appelle le « contexte ».",
          },
        ],
      },
    ],
  },
  {
    id: "urls-avance",
    title: "URLs : routage avancé",
    level: 3,
    intro:
      "Au-delà du `path()` simple : paramètres typés, nommage des routes et organisation multi-applications.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "blog/urls.py — routes nommées et paramètres",
        code: "from django.urls import path\nfrom . import views\n\napp_name = \"blog\"  # espace de noms : évite les collisions entre apps\n\nurlpatterns = [\n    path(\"\", views.ListeArticles.as_view(), name=\"liste\"),\n    path(\"article/<slug:slug>/\", views.DetailArticle.as_view(), name=\"detail\"),\n    path(\"archives/<int:annee>/\", views.archives, name=\"archives\"),\n]",
      },
      {
        kind: "fields",
        title: "Le routage en profondeur",
        fields: [
          {
            label: "Convertisseurs de chemin",
            value:
              "`<int:annee>` ne capture que des entiers et les convertit en `int` ; `<slug:slug>` accepte lettres, chiffres, tirets. Si l'URL ne correspond pas au type, Django continue à chercher (puis 404). Disponibles : `str`, `int`, `slug`, `uuid`, `path`.",
          },
          {
            label: "Nommage des routes",
            value:
              "`name=\"detail\"` permet `{% url 'blog:detail' slug=article.slug %}` dans les templates et `reverse(\"blog:detail\", args=[slug])` en Python. Ne jamais écrire d'URL en dur : si le chemin change, un seul endroit à modifier.",
          },
          {
            label: "app_name",
            value:
              "Deux applications peuvent avoir une route nommée `detail`. `app_name = \"blog\"` + `'blog:detail'` lève l'ambiguïté. Toujours le définir.",
          },
          {
            label: "Ordre des routes",
            value:
              "Django teste les motifs dans l'ordre et s'arrête au premier qui correspond. Une route trop générale placée en premier « mange » les suivantes — les routes spécifiques d'abord.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`NoReverseMatch` : le nom de route ou les paramètres ne correspondent pas. Cause n°1 : oublier `app_name` ou passer un mauvais nom de paramètre (`slug=` vs `pk=`).",
          },
        ],
      },
    ],
  },
  {
    id: "templates",
    title: "Les templates : héritage et balises",
    level: 3,
    intro:
      "Le langage de templates Django (DTL) : de l'HTML avec des trous à remplir, un système d'héritage qui évite toute duplication.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "blog/templates/blog/base.html — le gabarit parent",
        code: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>{% block titre %}Mon blog{% endblock %}</title>\n</head>\n<body>\n  <header><h1>Mon blog</h1></header>\n  <main>{% block contenu %}{% endblock %}</main>\n  <footer>© 2026</footer>\n</body>\n</html>",
      },
      {
        kind: "code",
        language: "html",
        title: "blog/templates/blog/liste.html — le gabarit enfant",
        code: "{% extends \"blog/base.html\" %}\n\n{% block titre %}Articles{% endblock %}\n\n{% block contenu %}\n  {% for article in articles %}\n    <article>\n      <h2><a href=\"{% url 'blog:detail' slug=article.slug %}\">\n        {{ article.titre }}\n      </a></h2>\n      <p>Par {{ article.auteur.username }} le {{ article.date_pub|date:\"d/m/Y\" }}</p>\n    </article>\n  {% empty %}\n    <p>Aucun article pour le moment.</p>\n  {% endfor %}\n{% endblock %}",
      },
      {
        kind: "text",
        text: "`{{ variable }}` affiche, `{% tag %}` agit (boucle, condition, héritage), `{% extends %}` hérite d'un gabarit parent en redéfinissant ses blocs.",
      },
      {
        kind: "fields",
        title: "Le système de templates",
        fields: [          {
            label: "Pourquoi l'héritage",
            value:
              "Sans lui, chaque page dupliquerait `<head>`, header, footer. Avec `base.html` + `{% block %}`, la structure commune est définie une fois ; chaque page ne remplit que ses blocs.",
          },
          {
            label: "Filtres",
            value:
              "`{{ valeur|filtre }}` : `date:\"d/m/Y\"`, `truncatewords:30`, `linebreaks`, `default:\"—\"`. Des dizaines de filtres intégrés pour la présentation — sans logique Python dans le template.",
          },
          {
            label: "Échappement automatique",
            value:
              "`{{ contenu }}` échappe le HTML par défaut : `<script>` devient du texte inoffensif. C'est la protection XSS de base de Django, active sans rien faire.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`TemplateDoesNotExist` : Django cherche les templates dans `templates/` de chaque app (et les dossiers de `TEMPLATES['DIRS']`). Cause n°1 : mauvais sous-dossier (`blog/liste.html` vs `liste.html`).",
          },
          {
            label: "Bonne pratique",
            value:
              "Toujours namespacer : `blog/templates/blog/liste.html` (sous-dossier `blog/`). Sinon, le `liste.html` d'une autre app peut écraser le vôtre silencieusement.",
          },
          {
            label: "Concepts liés",
            value:
              "Tags personnalisés (`templatetags/`) pour les besoins récurrents, `{% include %}` pour les fragments partagés, `{% csrf_token %}` dans chaque formulaire.",
          },
        ],
      },
    ],
  },
  {
    id: "formulaires",
    title: "Les formulaires : validation intégrée",
    level: 3,
    intro:
      "Les formulaires Django valident, nettoient et réaffichent les erreurs : vous ne traitez jamais `request.POST` à la main.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "blog/forms.py + vue — le cycle complet",
        code: "from django import forms\nfrom .models import Article\n\n\nclass ArticleForm(forms.ModelForm):  # lié au modèle Article\n    class Meta:\n        model = Article\n        fields = [\"titre\", \"contenu\"]  # jamais \"__all__\" (voir sécurité)\n\n\n# blog/views.py\nfrom django.shortcuts import render, redirect\nfrom .forms import ArticleForm\n\n\ndef creer_article(request):\n    if request.method == \"POST\":\n        form = ArticleForm(request.POST)\n        if form.is_valid():            # ← la validation a lieu ici\n            article = form.save(commit=False)\n            article.auteur = request.user\n            article.save()\n            return redirect(\"blog:liste\")\n    else:\n        form = ArticleForm()           # formulaire vide (GET)\n    return render(request, \"blog/form.html\", {\"form\": form})",
      },
      {
        kind: "text",
        text: "Un formulaire Django est une classe qui déclare des champs ; `is_valid()` vérifie les données, `cleaned_data` fournit les valeurs nettoyées, `save()` persiste (pour les ModelForm).",
      },
      {
        kind: "text",
        text: "Valider à la main, c'est réécrire : champs requis, longueurs, emails, doublons, réaffichage avec erreurs… Le formulaire centralise tout et génère même le HTML.",
      },
      {
        kind: "fields",
        title: "Les formulaires, en profondeur",
        fields: [          {
            label: "Form vs ModelForm",
            value:
              "`forms.Form` : formulaire libre (contact, recherche). `forms.ModelForm` : lié à un modèle, avec `save()` intégré — le cas le plus courant pour créer/éditer des objets.",
          },
          {
            label: "Le cycle GET / POST",
            value:
              "GET → formulaire vide. POST → on lie `request.POST`, on valide ; si valide : sauvegarde + redirection (pattern Post/Redirect/Get, évite le double envoi au rafraîchissement) ; si invalide : on réaffiche le formulaire avec les erreurs.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `{% csrf_token %}` dans le `<form>` du template → erreur 403 à l'envoi. Django exige le jeton CSRF sur tous les POST : c'est une protection, pas un bug.",
          },
          {
            label: "Bonne pratique",
            value:
              "Toujours lister explicitement `fields = [...]` dans le `Meta` d'un ModelForm. `fields = \"__all__\"` expose des champs sensibles (ex. `auteur`, `est_admin`) à la manipulation par l'utilisateur.",
          },
          {
            label: "Concepts liés",
            value:
              "Widgets (personnaliser le HTML généré), `clean_<champ>()` pour les validations métier, `form.errors` dans le template.",
          },
        ],
      },
    ],
  },
  {
    id: "authentification",
    title: "Authentification fournie",
    level: 3,
    intro:
      "Inscription, connexion, mots de passe hachés, sessions : `django.contrib.auth` fournit tout, éprouvé par des millions de sites.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Protéger une vue + modèle d'inscription",
        code: "from django.contrib.auth.decorators import login_required\nfrom django.contrib.auth.forms import UserCreationForm\nfrom django.shortcuts import render, redirect\n\n\n@login_required  # redirige vers la page de login si anonyme\ndef creer_article(request):\n    ...\n\n\ndef inscription(request):\n    if request.method == \"POST\":\n        form = UserCreationForm(request.POST)\n        if form.is_valid():\n            form.save()  # mot de passe haché automatiquement (PBKDF2)\n            return redirect(\"login\")\n    else:\n        form = UserCreationForm()\n    return render(request, \"blog/inscription.html\", {\"form\": form})",
      },
      {
        kind: "text",
        text: "Le modèle `User`, les vues de login/logout, le hachage des mots de passe et les sessions sont intégrés : vous les assemblez, vous ne les réinventez pas.",
      },
      {
        kind: "fields",
        title: "L'authentification Django",
        fields: [          {
            label: "Ce qui est fourni",
            value:
              "Modèle `User` (username, email, mot de passe haché, `is_staff`, `is_superuser`), formulaires `UserCreationForm` / `AuthenticationForm`, vues `LoginView` / `LogoutView` prêtes à brancher dans `urls.py`, décorateur `@login_required`, mixin `LoginRequiredMixin` pour les classes.",
          },
          {
            label: "Mots de passe",
            value:
              "Jamais stockés en clair : hachés en PBKDF2 avec sel par défaut. `user.check_password(\"...\")` vérifie sans jamais déchiffrer (on ne déchiffre pas un hash, on compare).",
          },
          {
            label: "request.user",
            value:
              "Disponible dans chaque vue et chaque template : l'utilisateur connecté, ou un `AnonymousUser`. `user.is_authenticated` distingue les deux cas.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Comparer `request.user` à `None` pour tester la connexion. Il n'est jamais `None` : utilisez `request.user.is_authenticated`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Si vous prévoyez le moindre champ supplémentaire sur l'utilisateur (avatar, rôle…), créez un modèle utilisateur personnalisé (`AUTH_USER_MODEL`) DÈS LE DÉBUT du projet. Le changer après les premières migrations est douloureux — c'est la recommandation officielle.",
          },
          {
            label: "Concepts liés",
            value:
              "Permissions (`user.has_perm`), groupes, `OneToOneField` « Profil » pour étendre sans remplacer, sessions.",
          },
        ],
      },
    ],
  },
  {
    id: "fichiers-statiques",
    title: "Fichiers statiques : CSS, JS, images",
    level: 3,
    intro:
      "En développement Django sert vos CSS/JS tout seul ; en production, `collectstatic` les rassemble pour le vrai serveur web.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "Charger un fichier statique dans un template",
        code: "{% load static %}\n<!DOCTYPE html>\n<html>\n<head>\n  <link rel=\"stylesheet\" href=\"{% static 'blog/style.css' %}\">\n</head>",
      },
      {
        kind: "text",
        text: "Chaque app a son dossier `static/` ; `{% static 'blog/style.css' %}` génère l'URL ; en développement Django sert les fichiers, en production `collectstatic` les copie dans `STATIC_ROOT`.",
      },
      {
        kind: "fields",
        title: "Les fichiers statiques",
        fields: [          {
            label: "Pourquoi deux modes",
            value:
              "Le serveur de développement est pratique mais lent et non sécurisé pour servir des fichiers. En production, c'est le serveur web (Nginx) ou un service dédié qui sert les fichiers — Django ne fait que générer leurs URLs.",
          },
          {
            label: "Commande de déploiement",
            value:
              "`python manage.py collectstatic` : copie tous les statics (les vôtres + ceux de l'admin et des paquets tiers) dans le dossier `STATIC_ROOT`. À exécuter à chaque déploiement.",
          },
          {
            label: "Erreur fréquente",
            value:
              "En production : CSS absent, admin « nue ». Cause : `collectstatic` oublié, ou `STATIC_ROOT` non servi par le serveur web. En dev, ça marche toujours — le bug n'apparaît qu'en prod.",
          },
          {
            label: "Bonne pratique",
            value:
              "Namespacer comme les templates : `blog/static/blog/style.css`, pas `blog/static/style.css` — sinon collision entre applications.",
          },
        ],
      },
      {
        kind: "command",
        label: "Rassembler les fichiers statiques pour la production",
        command: "python manage.py collectstatic",
        why: "Copie tous les fichiers statiques du projet (vos apps, l'admin Django, les paquets tiers) dans le dossier `STATIC_ROOT` défini dans `settings.py`. C'est ce dossier unique que le serveur web (Nginx…) exposera en production.",
        verify:
          "Django affiche le nombre de fichiers copiés. Le dossier `STATIC_ROOT` contient désormais `admin/`, `blog/`, etc.",
      },
    ],
  },
  {
    id: "fichiers-media",
    title: "Fichiers téléversés (media)",
    level: 3,
    intro:
      "Les fichiers envoyés par les utilisateurs (avatars, pièces jointes) ne sont pas des « statiques » : ils vivent dans `MEDIA_ROOT` et suivent des règles différentes.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "models.py + settings.py — téléversement d'image",
        code: "# blog/models.py\nclass Profil(models.Model):\n    user = models.OneToOneField(\"auth.User\", on_delete=models.CASCADE)\n    avatar = models.ImageField(upload_to=\"avatars/\", blank=True)\n\n\n# monsite/settings.py\nMEDIA_URL = \"/media/\"          # préfixe d'URL\nMEDIA_ROOT = BASE_DIR / \"media\"  # dossier de stockage sur disque",
      },
      {
        kind: "text",
        text: "Static = fichiers du code (CSS/JS), versionnés avec le projet. Media = fichiers des utilisateurs, créés à l'exécution, jamais dans Git.",
      },
      {
        kind: "fields",
        title: "Static vs media",
        fields: [          {
            label: "Ce qui est stocké",
            value:
              "En base : uniquement le chemin (`avatars/photo.jpg`). Sur disque : le fichier lui-même, dans `MEDIA_ROOT/avatars/`. La base ne contient jamais le contenu binaire.",
          },
          {
            label: "ImageField et Pillow",
            value:
              "`ImageField` valide que le fichier est bien une image : il exige le paquet Pillow (`pip install pillow`). Sans lui, l'import du modèle échoue.",
          },
          {
            label: "Le formulaire",
            value:
              "Un formulaire avec fichier exige `enctype=\"multipart/form-data\"` dans la balise `<form>` ET `request.FILES` dans la vue : `form = ProfilForm(request.POST, request.FILES)`. Oublier l'un des deux = fichier silencieusement ignoré.",
          },
          {
            label: "En production",
            value:
              "Les medias ne sont pas servis par Django en production (comme les statics). On utilise un stockage dédié (service objet type S3 via `django-storages`, ou volume servi par Nginx).",
          },
          {
            label: "Bonne pratique sécurité",
            value:
              "Ne jamais faire confiance au nom ni au type déclaré d'un fichier téléversé : limitez les extensions, la taille (`DATA_UPLOAD_MAX_MEMORY_SIZE`), et ne servez jamais les uploads comme du HTML exécutable.",
          },
        ],
      },
    ],
  },
  {
    id: "settings",
    title: "settings.py : le centre de contrôle",
    level: 3,
    intro:
      "Un seul fichier concentre toute la configuration. Comprendre ses 6 réglages clés, et surtout comment ne jamais y mettre de secret en dur.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Les réglages à connaître (extrait commenté)",
        code: "INSTALLED_APPS = [\n    \"django.contrib.admin\",       # l'admin\n    \"django.contrib.auth\",        # authentification\n    \"django.contrib.contenttypes\",\n    \"django.contrib.sessions\",\n    \"django.contrib.messages\",\n    \"django.contrib.staticfiles\",\n    \"blog\",                      # ← VOS apps s'ajoutent ici\n]\n\nDATABASES = {\n    \"default\": {\n        \"ENGINE\": \"django.db.backends.sqlite3\",  # postgresql en prod\n        \"NAME\": BASE_DIR / \"db.sqlite3\",\n    }\n}\n\nSECRET_KEY = \"django-insecure-...\"  # ⚠ générée par startproject\nDEBUG = True                          # ⚠ True en dev, JAMAIS en prod\nALLOWED_HOSTS = []                    # domaines autorisés en prod\nLANGUAGE_CODE = \"fr-fr\"\nTIME_ZONE = \"Indian/Antananarivo\"  # ou \"Europe/Paris\", \"UTC\"…",
      },
      {
        kind: "fields",
        title: "Les réglages critiques",
        fields: [
          {
            label: "SECRET_KEY",
            value:
              "Clé de chiffrement des sessions, tokens CSRF, signatures. Celle générée par `startproject` commence par `django-insecure-` : c'est un AVERTISSEMENT, pas une clé de production. En prod : variable d'environnement, jamais committée.",
          },
          {
            label: "DEBUG",
            value:
              "`True` = pages d'erreur détaillées (avec variables locales, settings partiels) + rechargement. En production avec `DEBUG=True`, une erreur expose vos secrets au monde. Règle absolue : `DEBUG=False` en prod.",
          },
          {
            label: "ALLOWED_HOSTS",
            value:
              "Liste des noms de domaine autorisés à servir le site (protection contre l'empoisonnement d'en-tête Host). En prod : `ALLOWED_HOSTS = [\"monsite.com\"]`. Vide + `DEBUG=False` = Django refuse tout (erreur 400).",
          },
          {
            label: "Variables d'environnement",
            value:
              "Le pattern professionnel : `SECRET_KEY = os.environ[\"SECRET_KEY\"]`, `DEBUG = os.environ.get(\"DEBUG\") == \"1\"`. Le code est identique partout ; seule l'environnement change entre dev et prod.",
          },
          {
            label: "Bonne pratique",
            value:
              "Deux fichiers settings (`settings_dev.py`, `settings_prod.py`) ou un seul qui lit l'environnement : les deux approches existent. L'essentiel : aucun secret dans Git, `DEBUG=False` en prod, `ALLOWED_HOSTS` renseigné.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Lire la configuration depuis l'environnement",
        code: "import os\nfrom pathlib import Path\n\nBASE_DIR = Path(__file__).resolve().parent.parent\n\nSECRET_KEY = os.environ[\"DJANGO_SECRET_KEY\"]  # plante si absente : voulu\nDEBUG = os.environ.get(\"DJANGO_DEBUG\", \"\") == \"1\"\nALLOWED_HOSTS = os.environ.get(\"DJANGO_ALLOWED_HOSTS\", \"\").split(\",\")",
      },
    ],
  },
  {
    id: "middleware",
    title: "Le middleware : la chaîne invisible",
    level: 3,
    intro:
      "Chaque requête traverse une chaîne de middlewares avant d'atteindre votre vue — et chaque réponse la retraverse. C'est là que vivent la sécurité et les sessions.",
    blocks: [
      {
        kind: "diagram",
        title: "La traversée d'une requête",
        lines: [
          "Requête entrante",
          "     │",
          "     ▼  SecurityMiddleware (HTTPS, en-têtes)",
          "     ▼  SessionMiddleware (qui est cet utilisateur ?)",
          "     ▼  CsrfViewMiddleware (le jeton CSRF est-il valide ?)",
          "     ▼  AuthenticationMiddleware (remplit request.user)",
          "     ▼",
          "  VOTRE VUE",
          "     │",
          "     ▼  (la chaîne se remonte en sens inverse)",
          "     ▼",
          "Réponse sortante",
        ],
      },
      {
        kind: "text",
        text: "Un middleware est un plugin qui traite chaque requête/réponse : il peut modifier, enrichir ou bloquer avant que votre vue ne s'exécute.",
      },
      {
        kind: "text",
        text: "La sécurité (CSRF), les sessions, l'authentification concernent TOUTES les vues : plutôt que de les coder dans chacune, on les factorise en une chaîne exécutée systématiquement.",
      },
      {
        kind: "fields",
        title: "Comprendre le middleware",
        fields: [          {
            label: "L'ordre compte",
            value:
              "`SessionMiddleware` doit précéder `AuthenticationMiddleware` (l'authentification lit la session). L'ordre de `MIDDLEWARE` dans settings.py n'est pas décoratif.",
          },
          {
            label: "Quand écrire le vôtre",
            value:
              "Rarement au début. Cas réels : journalisation spécifique, maintenance mode, ajout d'en-têtes. Un middleware personnalisé est une classe avec `__call__` — la documentation officielle donne le patron.",
          },
        ],
      },
    ],
  },
  {
    id: "tests",
    title: "Les tests fournis",
    level: 3,
    intro:
      "Django intègre un framework de test complet : base de test éphémère, client HTTP simulé, assertions web. Aucune bibliothèque à ajouter pour commencer.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "blog/tests.py — tester modèle et vue",
        code: "from django.test import TestCase\nfrom django.urls import reverse\nfrom django.contrib.auth.models import User\nfrom .models import Article\n\n\nclass ArticleTests(TestCase):\n    def setUp(self):\n        self.user = User.objects.create_user(username=\"akane\")\n        self.article = Article.objects.create(\n            titre=\"Test\", slug=\"test\", contenu=\"...\",\n            publie=True, auteur=self.user,\n        )\n\n    def test_publier(self):\n        self.article.publier()\n        self.assertTrue(Article.objects.get(pk=self.article.pk).publie)\n\n    def test_liste_affiche_les_articles(self):\n        reponse = self.client.get(reverse(\"blog:liste\"))\n        self.assertEqual(reponse.status_code, 200)\n        self.assertContains(reponse, \"Test\")\n\n    def test_detail_inexistant_404(self):\n        reponse = self.client.get(\"/blog/article/nope/\")\n        self.assertEqual(reponse.status_code, 404)",
      },
      {
        kind: "text",
        text: "`TestCase` crée une base de test vide, y joue vos scénarios via un client HTTP simulé (`self.client`), puis la détruit : chaque test part d'un état propre.",
      },
      {
        kind: "fields",
        title: "Tester avec Django",
        fields: [          {
            label: "Pourquoi c'est intégré",
            value:
              "Parce que « fat models, thin views » ne vaut que si les modèles sont testés. Django rend le test aussi simple que la fonctionnalité elle-même : aucune excuse.",
          },
          {
            label: "self.client",
            value:
              "Simule un navigateur : `.get()`, `.post()`, `.login()`. `assertContains` vérifie le contenu de la page. On teste le comportement web réel, pas des détails d'implémentation.",
          },
          {
            label: "Que tester en priorité",
            value:
              "1. La logique métier des modèles (`publier()`). 2. Les vues critiques (liste, détail, création). 3. Les permissions (un anonyme ne doit pas créer d'article).",
          },
          {
            label: "Bonne pratique",
            value:
              "`reverse(\"blog:liste\")` plutôt que l'URL en dur dans les tests : si la route change, les tests suivent sans modification.",
          },
        ],
      },
      {
        kind: "command",
        label: "Lancer la suite de tests",
        command: "python manage.py test",
        why: "Découvre tous les `tests.py`, crée une base de test éphémère, exécute les tests, affiche les échecs, détruit la base. C'est la commande à lancer avant chaque commit.",
        verify:
          "Django affiche `Ran N tests` puis `OK` (ou la liste des échecs avec le détail).",
      },
    ],
  },
  {
    id: "securite-csrf",
    title: "Sécurité : CSRF",
    level: 3,
    intro:
      "La falsification de requête inter-sites : comment Django vous protège par défaut, et le seul geste que vous devez faire.",
    blocks: [
      {
        kind: "text",
        text: "Une attaque CSRF piège le navigateur d'un utilisateur connecté pour qu'il envoie à votre site une requête qu'il n'a pas voulue (ex. changer son email) depuis un site malveillant.",
      },
      {
        kind: "fields",
        title: "Le CSRF, mécanisme défensif",
        fields: [          {
            label: "La défense de Django",
            value:
              "Un jeton secret unique par session, exigé sur chaque requête POST : le site attaquant ne connaît pas le jeton, sa requête forgée est rejetée (403). Actif par défaut via `CsrfViewMiddleware`.",
          },
          {
            label: "Votre seul geste",
            value:
              "Ajouter `{% csrf_token %}` dans chaque `<form method=\"post\">`. Sans lui, vos propres formulaires légitimes sont rejetés — c'est le 403 le plus courant chez les débutants.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Décorer une vue de `@csrf_exempt` « pour que ça marche » (souvent avec une API ou du JavaScript). C'est désactiver l'alarme au lieu de donner la clé : transmettez le jeton dans vos appels AJAX (il est dans le cookie `csrftoken`).",
          },
          {
            label: "Bonne pratique",
            value:
              "Ne désactivez jamais la protection CSRF sans comprendre l'alternative (authentification par token pour les API, avec `djangorestframework`).",
          },
        ],
      },
    ],
  },
  {
    id: "securite-xss",
    title: "Sécurité : XSS",
    level: 3,
    intro:
      "Le cross-site scripting : injecter du JavaScript via un contenu utilisateur. Django neutralise le cas courant automatiquement.",
    blocks: [
      {
        kind: "text",
        text: "Si un commentaire contenant `<script>voler()</script>` s'affiche tel quel, le script s'exécute dans le navigateur de chaque visiteur : c'est une faille XSS.",
      },
      {
        kind: "fields",
        title: "Le XSS, mécanisme défensif",
        fields: [          {
            label: "La défense de Django",
            value:
              "L'échappement automatique des templates : `{{ commentaire.texte }}` convertit `<` en `&lt;` — le script s'affiche comme texte, il ne s'exécute pas. Protection active par défaut, sans aucun code.",
          },
          {
            label: "Le danger : |safe",
            value:
              "Le filtre `|safe` désactive l'échappement (« je garantis que ce HTML est sûr »). Sur du contenu saisi par un utilisateur, c'est ouvrir la porte au XSS. Réservé au HTML que VOUS générez et contrôlez.",
          },
          {
            label: "Erreur fréquente",
            value:
              "`{{ contenu|safe }}` pour « afficher le HTML » d'un champ utilisateur (éditeur riche…). Si le contenu n'est pas assaini en amont (bibliothèque de nettoyage), c'est une faille.",
          },
          {
            label: "Bonne pratique",
            value:
              "Par défaut, ne touchez à rien : l'échappement vous protège. Si vous devez afficher du HTML riche, assainissez-le à l'enregistrement avec une bibliothèque dédiée, jamais à l'affichage avec `|safe` seul.",
          },
        ],
      },
    ],
  },
  {
    id: "securite-sql",
    title: "Sécurité : injection SQL",
    level: 3,
    intro:
      "L'injection SQL reste une des failles les plus graves du web. L'ORM de Django est votre première ligne de défense — à condition de l'utiliser correctement.",
    blocks: [
      {
        kind: "text",
        text: "Si une entrée utilisateur est concaténée dans une requête SQL brute (`\"...\" + username`), un attaquant peut en modifier la structure et lire ou détruire la base.",
      },
      {
        kind: "fields",
        title: "L'injection SQL, mécanisme défensif",
        fields: [          {
            label: "La défense de l'ORM",
            value:
              "Chaque `filter(titre=entree_utilisateur)` passe l'entrée comme PARAMÈTRE de la requête, jamais comme fragment de SQL : la base distingue structure et données. L'injection devient impossible par construction.",
          },
          {
            label: "Les exceptions à surveiller",
            value:
              "`raw()` (SQL brut), `extra()` (déprécié), `order_by()` avec un champ venant de l'utilisateur : ce sont les seuls endroits où VOUS redevenez responsable. Avec `raw()`, utilisez toujours des paramètres : `Article.objects.raw(\"SELECT * FROM blog_article WHERE titre = %s\", [titre])`.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Une f-string dans du SQL brut : `f\"SELECT * FROM t WHERE nom = '{nom}'\"`. C'est LA faille classique. Avec l'ORM, ce cas n'existe pas.",
          },
          {
            label: "Bonne pratique",
            value:
              "Restez dans l'ORM pour 99 % des cas. Pour le 1 % restant, paramètres liés (`%s`), jamais d'interpolation. Et principe général : validez les entrées dans les formulaires AVANT qu'elles n'atteignent la base.",
          },
        ],
      },
    ],
  },
  {
    id: "permissions",
    title: "Permissions et contrôle d'accès",
    level: 3,
    intro:
      "Savoir qui peut voir ou modifier quoi : les permissions Django transforment « connecté » en « autorisé ».",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Vérifier qu'on est l'auteur avant d'éditer",
        code: "from django.contrib.auth.decorators import login_required\nfrom django.core.exceptions import PermissionDenied\nfrom django.shortcuts import get_object_or_404\n\n\n@login_required\ndef editer_article(request, slug):\n    article = get_object_or_404(Article, slug=slug)\n    if article.auteur != request.user:\n        raise PermissionDenied  # → page 403, pas 404, pas un redirect\n    ...",
      },
      {
        kind: "text",
        text: "Authentification = « qui êtes-vous ? ». Autorisation = « avez-vous le droit ? ». Django fournit l'une, vous codez l'autre à chaque vue sensible.",
      },
      {
        kind: "fields",
        title: "Le contrôle d'accès",
        fields: [          {
            label: "Les outils fournis",
            value:
              "`@login_required` (connecté requis), permissions par modèle (`user.has_perm(\"blog.change_article\")`, attribuées via l'admin ou les groupes), `PermissionDenied` → page 403 propre.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Protéger le bouton « Modifier » dans le template mais pas la vue : l'URL reste accessible directement. La sécurité se vérifie CÔTÉ SERVEUR, dans la vue — le template n'est que du confort visuel.",
          },
          {
            label: "Bonne pratique",
            value:
              "Vérifiez l'autorisation sur l'OBJET (`article.auteur == request.user`), pas seulement sur l'action. Deux utilisateurs connectés ne doivent pas pouvoir éditer les articles l'un de l'autre.",
          },
        ],
      },
    ],
  },
  {
    id: "sessions-messages",
    title: "Sessions et messages",
    level: 3,
    intro:
      "Deux outils intégrés du quotidien : mémoriser des infos entre requêtes (sessions) et afficher des confirmations (messages).",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Compter les visites + confirmer une action",
        code: "from django.contrib import messages\n\n\ndef accueil(request):\n    visites = request.session.get(\"visites\", 0) + 1\n    request.session[\"visites\"] = visites  # stocké côté serveur\n    return render(request, \"blog/accueil.html\", {\"visites\": visites})\n\n\ndef creer_article(request):\n    ...\n    messages.success(request, \"Article publié avec succès !\")\n    return redirect(\"blog:liste\")  # le message s'affiche sur la page suivante",
      },
      {
        kind: "text",
        text: "HTTP est sans mémoire : la session (`request.session`, un dictionnaire persistant côté serveur) s'en souvient à votre place ; les messages affichent une notification unique après une redirection.",
      },
      {
        kind: "fields",
        title: "Sessions et messages",
        fields: [          {
            label: "Sessions : quand",
            value:
              "Panier d'achat, préférences, « vu récemment ». Stockées en base par défaut (table `django_session`), identifiées par un cookie signé. Ne jamais y mettre de secrets ni de gros objets.",
          },
          {
            label: "Messages : le pattern",
            value:
              "`messages.success(request, \"...\")` avant un `redirect()` : le message survit à la redirection et s'affiche une fois, puis disparaît. `messages.error()` pour les échecs. Le template les affiche avec `{% for message in messages %}`.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Stocker un objet modèle entier en session (`request.session[\"article\"] = article`) : la session doit être sérialisable en JSON — stockez l'`id`, rechargez l'objet à la requête suivante.",
          },
        ],
      },
    ],
  },
  {
    id: "orm-avance",
    title: "ORM avancé : le piège N+1",
    level: 3,
    intro:
      "Le bug de performance n°1 des applications Django : une requête par objet dans une boucle. Le reconnaître, le mesurer, l'éliminer.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Le piège et sa correction",
        code: "# ❌ N+1 : 1 requête pour les articles + 1 par auteur (100 articles = 101 requêtes)\nfor article in Article.objects.filter(publie=True):\n    print(article.auteur.username)  # chaque accès = une requête SQL !\n\n# ✓ 2 requêtes au total, quel que soit le nombre d'articles\nfor article in Article.objects.filter(publie=True).select_related(\"auteur\"):\n    print(article.auteur.username)  # l'auteur est déjà chargé (JOIN)\n\n# ✓ Pour les relations inverses ou plusieurs-vers-plusieurs : prefetch_related\nfor tag in Tag.objects.prefetch_related(\"articles\"):\n    print(tag.articles.count())",
      },
      {
        kind: "text",
        text: "Accéder à une relation (`article.auteur`) dans une boucle déclenche une requête SQL par itération : N objets = N+1 requêtes. `select_related` (ForeignKey/OneToOne, via JOIN) et `prefetch_related` (ManyToMany et inverses, via requêtes groupées) chargent tout d'un coup.",
      },
      {
        kind: "fields",
        title: "Le N+1, en profondeur",
        fields: [          {
            label: "Pourquoi c'est invisible",
            value:
              "L'ORM rend l'accès `article.auteur.username` si naturel qu'on ne voit pas le SQL derrière. En développement avec 10 objets, c'est instantané ; en production avec 10 000, la page met des secondes.",
          },
          {
            label: "Comment le détecter",
            value:
              "`django-debug-toolbar` affiche le nombre de requêtes SQL par page : un nombre qui grandit avec le contenu affiché = N+1. C'est l'outil de diagnostic standard.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Mettre `select_related` partout « au cas où » : chaque JOIN a un coût. On optimise ce qu'on mesure, pas ce qu'on imagine.",
          },
          {
            label: "Bonne pratique",
            value:
              "Dans les vues liste, vérifiez systématiquement les requêtes avec la debug toolbar avant de considérer la page comme terminée.",
          },
          {
            label: "Concepts liés",
            value:
              "`annotate()` / `aggregate()` pour les calculs en base (`Count`, `Sum`, `Avg` de `django.db.models`), `.values()` pour ne charger que certaines colonnes.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Calculs en base : annotate et aggregate",
        code: "from django.db.models import Count\n\n# Nombre d'articles par auteur, calculé EN BASE (pas en Python)\nauteurs = User.objects.annotate(nb_articles=Count(\"articles\"))\nfor auteur in auteurs:\n    print(auteur.username, auteur.nb_articles)\n\n# Total global\ntotal = Article.objects.filter(publie=True).aggregate(Count(\"id\"))",
      },
    ],
  },
  {
    id: "pagination",
    title: "Pagination",
    level: 3,
    intro:
      "Afficher 10 000 articles sur une page n'est pas une option : le `Paginator` découpe les QuerySets en pages.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Paginer une liste",
        code: "from django.core.paginator import Paginator\n\n\ndef liste_articles(request):\n    articles = Article.objects.filter(publie=True)\n    paginator = Paginator(articles, 10)  # 10 par page\n    page_num = request.GET.get(\"page\")\n    page = paginator.get_page(page_num)  # gère les numéros invalides tout seul\n    return render(request, \"blog/liste.html\", {\"page\": page})",
      },
      {
        kind: "text",
        text: "`Paginator(queryset, 10)` découpe ; `get_page(numero)` renvoie la page demandée en tolérant les numéros absurdes (trop grand → dernière page, invalide → première).",
      },
      {
        kind: "text",
        text: "Charger 10 000 objets en mémoire pour n'en afficher que 10 est un gaspillage de mémoire, de temps SQL et de bande passante. La pagination ne charge que la tranche utile (`LIMIT`/`OFFSET` en SQL).",
      },
      {
        kind: "fields",
        title: "La pagination",
        fields: [          {
            label: "Dans le template",
            value:
              "`page.object_list` (les objets), `page.has_previous` / `has_next`, `page.previous_page_number`. Les vues génériques `ListView` paginent avec une seule ligne : `paginate_by = 10`.",
          },
        ],
      },
    ],
  },
  {
    id: "email",
    title: "Envoyer des emails",
    level: 3,
    intro:
      "Confirmation d'inscription, réinitialisation de mot de passe : Django envoie des emails avec deux lignes — et simule l'envoi en développement.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Envoyer un email",
        code: "from django.core.mail import send_mail\n\nsend_mail(\n    \"Bienvenue sur Mon blog\",          # sujet\n    \"Merci pour votre inscription !\",   # corps texte\n    \"noreply@monsite.com\",              # expéditeur\n    [user.email],                         # destinataires\n    fail_silently=False,\n)",
      },
      {
        kind: "fields",
        title: "Les emails Django",
        fields: [
          {
            label: "En développement",
            value:
              "`EMAIL_BACKEND = \"django.core.mail.backends.console.EmailBackend\"` dans settings : les emails s'affichent dans le terminal au lieu d'être envoyés. Zéro configuration, zéro risque d'envoyer un vrai email par erreur.",
          },
          {
            label: "En production",
            value:
              "On configure un backend SMTP (`EMAIL_HOST`, `EMAIL_PORT`, identifiants en variables d'environnement) ou un service transactionnel tiers. Les identifiants ne sont jamais dans le code.",
          },
          {
            label: "Réinitialisation de mot de passe",
            value:
              "Fournie par `django.contrib.auth` : 4 vues + templates à brancher dans `urls.py` (`PasswordResetView`…). Ne réimplémentez jamais ce flux vous-même : les tokens à usage unique et leur expiration sont des détails cryptographiques piégeux.",
          },
        ],
      },
    ],
  },
  {
    id: "dates-fuseaux",
    title: "Dates et fuseaux horaires",
    level: 3,
    intro:
      "Le temps est un bug en puissance : Django stocke en UTC et convertit à l'affichage — si vous utilisez les bons outils.",
    blocks: [
      {
        kind: "text",
        text: "Avec `USE_TZ = True` (défaut), Django stocke les `DateTimeField` en UTC en base et convertit dans `TIME_ZONE` à l'affichage.",
      },
      {
        kind: "fields",
        title: "Le temps dans Django",
        fields: [          {
            label: "La règle d'or",
            value:
              "Toujours `django.utils.timezone.now()` (conscient du fuseau), jamais `datetime.now()` (naïf). Comparer un datetime naïf et un datetime conscient lève une exception — c'est voulu, c'est une protection.",
          },
          {
            label: "TIME_ZONE",
            value:
              "Le fuseau d'affichage par défaut (`\"Indian/Antananarivo\"`, `\"Europe/Paris\"`…). La base reste en UTC dans tous les cas : seul l'affichage change.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Mélanger `datetime.now()` et `timezone.now()` dans les filtres ORM : `Article.objects.filter(date_pub__lte=datetime.now())` lève `RuntimeWarning` puis des résultats faux. Toujours `timezone.now()`.",
          },
        ],
      },
    ],
  },
  {
    id: "deploiement",
    title: "Déploiement : WSGI, ASGI et production",
    level: 3,
    intro:
      "Passer du `runserver` local à un vrai serveur : ce qui change, ce qui ne change pas, et la checklist avant mise en ligne.",
    blocks: [
      {
        kind: "diagram",
        title: "L'architecture de production typique",
        lines: [
          "Internet",
          "   │",
          "   ▼",
          "Nginx (fichiers statiques + proxy)",
          "   │  ├── /static/ → fichiers (collectstatic)",
          "   │  └── /        → proxy vers Gunicorn",
          "   ▼",
          "Gunicorn (serveur WSGI : exécute Django)",
          "   │  charge monsite/wsgi.py",
          "   ▼",
          "PostgreSQL (base de données)",
        ],
      },
      {
        kind: "text",
        text: "Django ne parle pas HTTP directement : un serveur d'application (Gunicorn en WSGI, Uvicorn/Daphne en ASGI) l'exécute, derrière un serveur web (Nginx) qui sert les fichiers statiques.",
      },
      {
        kind: "fields",
        title: "Comprendre le déploiement",
        fields: [          {
            label: "WSGI vs ASGI",
            value:
              "WSGI = l'interface synchrone historique (`wsgi.py`), suffisante pour 95 % des sites. ASGI = l'interface asynchrone (`asgi.py`), nécessaire pour les WebSockets (via Django Channels) et les vues async. `runserver` gère les deux en dev.",
          },
          {
            label: "Gunicorn",
            value:
              "Le serveur WSGI le plus répandu pour Django (`pip install gunicorn`, puis `gunicorn monsite.wsgi`). Il lance plusieurs workers : plusieurs requêtes traitées en parallèle.",
          },
          {
            label: "Pourquoi pas runserver en prod",
            value:
              "Le serveur de développement est mono-thread, non sécurisé, et sert les statics par commodité. La documentation le dit explicitement : ne l'utilisez pas en production.",
          },
        ],
      },
      {
        kind: "command",
        label: "Vérifier que le projet est prêt pour la production",
        command: "python manage.py check --deploy",
        why: "Exécute les vérifications de sécurité spécifiques au déploiement : `DEBUG=False`, `SECRET_KEY` non par défaut, `ALLOWED_HOSTS` renseigné, HTTPS forcé, en-têtes de sécurité… C'est la checklist officielle automatisée.",
        verify:
          "Des avertissements (warnings) s'affichent pour chaque point non conforme ; l'objectif est zéro warning avant la mise en ligne.",
      },
      {
        kind: "list",
        items: [
          "Checklist minimale : `DEBUG=False`, `SECRET_KEY` en variable d'environnement, `ALLOWED_HOSTS` renseigné, `collectstatic` exécuté, `migrate` exécuté, `check --deploy` sans warning.",
          "La base SQLite ne convient pas à la production multi-workers : PostgreSQL (`psycopg`, le pilote Python) est le choix standard.",
          "Les fichiers media des utilisateurs vont sur un stockage persistant (volume, service objet), jamais sur le disque éphémère du serveur d'application.",
        ],
      },
    ],
  },
  {
    id: "drf",
    title: "Django REST framework : quand exposer une API",
    level: 3,
    intro:
      "Le jour où votre frontend devient une app mobile ou un site React : DRF transforme vos modèles en API REST sans quitter l'écosystème Django.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Un sérialiseur et une vue API (DRF)",
        code: "# pip install djangorestframework  (paquet tiers, le standard de fait)\nfrom rest_framework import serializers, viewsets\nfrom .models import Article\n\n\nclass ArticleSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = Article\n        fields = [\"id\", \"titre\", \"slug\", \"contenu\", \"date_pub\"]\n\n\nclass ArticleViewSet(viewsets.ReadOnlyModelViewSet):\n    queryset = Article.objects.filter(publie=True)\n    serializer_class = ArticleSerializer\n    # → GET /api/articles/ et GET /api/articles/<id>/ générés automatiquement",
      },
      {
        kind: "text",
        text: "Django REST framework (DRF) est une bibliothèque tierce — le standard de fait — qui convertit modèles et QuerySets en API REST : sérialiseurs (modèle → JSON), vues API, pagination, authentification par token.",
      },
      {
        kind: "text",
        text: "Quand le consommateur n'est plus un template Django : application mobile, frontend React/Vue, partenaires externes. Si vos pages restent des templates, DRF est inutile.",
      },
      {
        kind: "fields",
        title: "DRF, en bref et sans hype",
        fields: [          {
            label: "Ce que ça change",
            value:
              "Les vues renvoient du JSON au lieu de HTML ; l'authentification passe par tokens ou sessions selon le client ; la documentation d'API devient un livrable (outils tiers comme drf-spectacular).",
          },
          {
            label: "Alternative légère",
            value:
              "Pour une poignée d'endpoints JSON, `JsonResponse` de Django suffit — pas besoin d'ajouter DRF. On n'adopte une bibliothèque que quand le besoin la justifie.",
          },
          {
            label: "Note d'honnêteté",
            value:
              "DRF est tiers (pas dans Django lui-même) mais quasi universel dans l'écosystème : la quasi-totalité des offres d'emploi « API Django » l'exigent. L'apprendre après les bases Django est le parcours standard.",
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
      "Les habitudes qui distinguent un projet Django qui vieillit bien d'un projet qui devient un fardeau.",
    blocks: [
      {
        kind: "list",
        items: [
          "« Fat models, thin views, stupid templates » : la logique métier dans les modèles, l'orchestration dans les vues, l'affichage dans les templates.",
          "Une application = un périmètre fonctionnel cohérent (`blog`, `comptes`, `boutique`) — ni un fourre-tout, ni un découpage en miettes.",
          "Nommez les URLs (`name=`) et utilisez `reverse` / `{% url %}` partout : aucune URL en dur, ni en Python ni dans les templates.",
          "Listez explicitement les champs des ModelForm : jamais `fields = \"__all__\"`.",
          "Testez les modèles et les vues critiques ; lancez `python manage.py test` avant chaque commit.",
          "Surveillez les requêtes SQL avec django-debug-toolbar dès que vous affichez des listes liées.",
          "Versionnez les migrations, ignorez `db.sqlite3` et `.venv` dans Git.",
          "Aucun secret dans le code : variables d'environnement, `DEBUG=False` et `ALLOWED_HOSTS` en production.",
          "Créez le modèle utilisateur personnalisé dès le début si le moindre doute existe.",
          "Lisez les avertissements de `check --deploy` avant chaque mise en production.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les dix pièges que presque tous les débutants Django rencontrent — avec le diagnostic et la correction.",
    blocks: [
      {
        kind: "fields",
        title: "Le top 10 des erreurs Django",
        fields: [
          {
            label: "1. « Table doesn't exist » après un changement de modèle",
            value:
              "Problème : vous avez modifié `models.py` sans migrer. Pourquoi : la base ne suit pas le code automatiquement. Correction : `makemigrations` puis `migrate`.",
          },
          {
            label: "2. 403 Forbidden sur tous les formulaires",
            value:
              "Problème : `{% csrf_token %}` oublié dans le `<form>`. Pourquoi : la protection CSRF rejette les POST sans jeton. Correction : ajoutez le tag — ne désactivez jamais la protection.",
          },
          {
            label: "3. `blog` inconnu : l'app oubliée dans INSTALLED_APPS",
            value:
              "Problème : `startapp` crée le dossier mais Django ignore l'application. Pourquoi : l'enregistrement est manuel. Correction : ajoutez `\"blog\"` à `INSTALLED_APPS`, puis migrez.",
          },
          {
            label: "4. N+1 : la page liste devient lente",
            value:
              "Problème : une requête SQL par objet affiché. Pourquoi : accès aux relations en boucle sans préchargement. Correction : `select_related` / `prefetch_related`, vérifié avec django-debug-toolbar.",
          },
          {
            label: "5. `__str__` oublié : l'admin illisible",
            value:
              "Problème : `Article object (1)` partout. Pourquoi : Django affiche `__str__` par défaut. Correction : définissez toujours `__str__` sur vos modèles.",
          },
          {
            label: "6. Migration éditée après application",
            value:
              "Problème : l'état de la base et les fichiers divergent, `migrate` se plaint. Pourquoi : une migration appliquée est un fait historique. Correction : ne l'éditez jamais — créez une nouvelle migration qui corrige.",
          },
          {
            label: "7. `default=timezone.now()` avec parenthèses",
            value:
              "Problème : tous les objets ont la même date (l'heure du démarrage). Pourquoi : la fonction a été APPELÉE une fois au lieu d'être passée en référence. Correction : `default=timezone.now` sans parenthèses.",
          },
          {
            label: "8. Fichiers statiques absents en production",
            value:
              "Problème : site « nu », admin sans CSS en prod mais parfait en local. Pourquoi : `collectstatic` non exécuté ou `STATIC_ROOT` non servi. Correction : `collectstatic` à chaque déploiement + serveur web configuré.",
          },
          {
            label: "9. `get()` qui lève DoesNotExist en page publique",
            value:
              "Problème : erreur 500 sur une URL inexistante. Pourquoi : `get()` lève une exception si rien n'est trouvé. Correction : `get_object_or_404()` dans les vues publiques.",
          },
          {
            label: "10. Fichier ignoré dans un formulaire d'upload",
            value:
              "Problème : le fichier n'arrive jamais. Pourquoi : il manque `enctype=\"multipart/form-data\"` dans le `<form>` OU `request.FILES` dans la vue. Correction : les deux, toujours ensemble.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-realistes",
    title: "4 projets réalistes et progressifs",
    level: 3,
    intro:
      "Quatre projets qui montent en puissance : chacun réutilise les acquis du précédent et ajoute une dimension professionnelle.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Blog personnel",
        fields: [
          {
            label: "Objectif",
            value:
              "Un blog complet : liste d'articles, page détail, admin pour écrire, formulaire de commentaire.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Modèles + migrations, vues fonctions, URLs nommées, héritage de templates, admin (`list_display`, `search_fields`), formulaires.",
          },
          {
            label: "Difficulté",
            value: "Débutant — le projet canonique pour valider tout le niveau 2.",
          },
          {
            label: "Ce que vous apprendrez vraiment",
            value:
              "Le cycle MVT complet sans aide, et l'admin comme outil de travail quotidien.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — Gestionnaire de tâches multi-utilisateurs",
        fields: [
          {
            label: "Objectif",
            value:
              "Chaque utilisateur inscrit gère ses propres listes et tâches : inscription, connexion, CRUD réservé à ses données.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Authentification (`UserCreationForm`, `LoginView`), `@login_required`, permissions par objet (`tache.proprietaire == request.user`), ModelForm, messages de confirmation, tests des permissions.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — la sécurité devient une exigence fonctionnelle.",
          },
          {
            label: "Ce que vous apprendrez vraiment",
            value:
              "Que « ça marche » ne suffit pas : il faut que chaque utilisateur ne voie QUE ses données. Les tests de permission deviennent réflexe.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Catalogue avec API REST",
        fields: [
          {
            label: "Objectif",
            value:
              "Un catalogue (films, livres, produits…) avec interface web classique ET API JSON consommable par un script ou une app mobile.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Django REST framework (sérialiseurs, viewsets, routeur), pagination API, `select_related` contre le N+1, filtres (`django-filter`, paquet tiers courant), documentation d'API.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire-avancé — premier pas hors des templates.",
          },
          {
            label: "Ce que vous apprendrez vraiment",
            value:
              "La différence entre « renvoyer du HTML » et « exposer des données » : sérialisation, statuts HTTP, authentification par token.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 4 — Plateforme complète déployée",
        fields: [
          {
            label: "Objectif",
            value:
              "Une vraie application en ligne : ex. plateforme de réservation ou petite boutique — avec paiements simulés, emails transactionnels, fichiers téléversés, et déploiement réel.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Tout le programme : modèle utilisateur personnalisé, variables d'environnement, PostgreSQL, `collectstatic`, Gunicorn + Nginx (ou plateforme PaaS), `check --deploy` sans warning, sauvegardes, monitoring basique.",
          },
          {
            label: "Difficulté",
            value: "Avancé — le projet qui fait la différence sur un CV.",
          },
          {
            label: "Ce que vous apprendrez vraiment",
            value:
              "Que 50 % du travail professionnel est invisible : configuration, sécurité, déploiement, maintenance. Un projet en ligne, même modeste, enseigne plus que dix tutoriels.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources officielles et de confiance",
    level: 3,
    intro:
      "Les sources à privilégier : la documentation officielle d'abord, puis une sélection de références établies.",
    blocks: [
      {
        kind: "list",
        items: [
          "Documentation officielle : https://docs.djangoproject.com/ — le tutoriel « Writing your first Django app » (8 parties) est la référence pour débuter ; la « Topic guides » couvre chaque sujet en profondeur.",
          "Site du projet : https://www.djangoproject.com/ — annonces de versions, notes de release (lisez-les à chaque mise à jour majeure).",
          "Tutoriel MDN « Django » : https://developer.mozilla.org/fr/docs/Learn/Server-side/Django — parcours guidé complet (local library), en français.",
          "Django Girls Tutorial : https://tutorial.djangogirls.org/ — excellent premier contact, très pédagogique.",
          "« Simple is Better Than Complex » (Vitor Freitas) : https://simpleisbetterthancomplex.com/ — des dizaines d'articles pratiques de qualité.",
          "Real Python — Django : https://realpython.com/ — tutoriels approfondis, certains payants.",
          "Livre « Two Scoops of Django » (Daniel & Audrey Feldroy) — les bonnes pratiques professionnelles, mis à jour à chaque version majeure.",
          "Code source de Django lui-même sur GitHub : quand la doc ne suffit pas, le code est la vérité finale.",
        ],
      },
      {
        kind: "text",
        text: "Règle de source : la documentation officielle tranche toujours en cas de contradiction avec un tutoriel tiers. Django évolue vite — vérifiez que tout article date de la même version majeure que la vôtre (`python -m django --version`).",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Django maîtrisé ouvre plusieurs portes : approfondir l'écosystème ou élargir vers les domaines voisins.",
    blocks: [
      {
        kind: "text",
        text: "Django est une fondation, pas une fin : il vous a appris l'architecture web, l'ORM, la sécurité et le déploiement — des compétences transférables à n'importe quel framework.",
      },
      {
        kind: "fields",
        title: "Les pistes après Django",
        fields: [          {
            label: "APIs professionnelles",
            value:
              "Approfondir Django REST framework : authentification JWT, permissions fines, versioning d'API, tests d'API.",
          },
          {
            label: "Temps réel",
            value:
              "Django Channels : WebSockets dans l'écosystème Django (chat, notifications live) — avec ASGI et un serveur comme Daphne ou Uvicorn.",
          },
          {
            label: "Tâches de fond",
            value:
              "Celery + Redis : emails lourds, génération de rapports, traitements différés hors du cycle requête/réponse.",
          },
          {
            label: "Frontend moderne",
            value:
              "Consommer votre API avec React, Vue ou un autre framework — ou rester full-Django avec des îlots d'interactivité (HTMX, Alpine.js).",
          },
          {
            label: "DevOps",
            value:
              "Dockeriser l'application, CI/CD (tests + déploiement automatiques), PostgreSQL managé, sauvegardes : le versant « mise en production » du métier.",
          },
          
        ],
      },
    ],
  },
];

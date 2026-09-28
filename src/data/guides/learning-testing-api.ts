import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète des tests backend : de zéro à une suite de tests
 * professionnelle sur API Python. 3 niveaux d'information (Aperçu /
 * Pratique / Approfondi) avec divulgation progressive. Tous les textes
 * supportent le code inline entre backticks. Commandes toujours
 * expliquées : label, commande, pourquoi, vérification.
 */
export const LEARNING_TESTING_API: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce que sont les tests backend, pourquoi ils existent et ce qu'ils garantissent.",
    blocks: [
      {
        kind: "text",
        text: "Les tests backend vérifient automatiquement que l'API se comporte comme promis : réponses correctes, données valides, erreurs gérées — à chaque modification du code. Un test est un petit programme qui exerce le code et affirme le résultat attendu : si le comportement change sans raison, le test échoue et alerte avant la production.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est non négociable : une API sans tests est une promesse sans garantie. Chaque déploiement devient un risque, chaque refactoring une angoisse. Les tests d'intégration — qui exercent les vraies routes HTTP contre une vraie base — forment le filet qui permet de modifier le code sereinement et de livrer en continu.",
      },
      {
        kind: "diagram",
        title: "Un test d'intégration, en six temps",
        lines: [
          "FIXTURE (base de test isolée, client HTTP)",
          "   │",
          "   ▼",
          "REQUÊTE (POST /articles via le client de test)",
          "   │",
          "   ▼",
          "API (le vrai code, pas un mock)",
          "   │",
          "   ▼",
          "BASE TEST (écriture réelle, isolée)",
          "   │",
          "   ▼",
          "ASSERT (statut 201 ? article en base ?)",
          "   │",
          "   ▼",
          "ROLLBACK (la base reste propre pour le test suivant)",
        ],
      },
    ],
  },
  {
    id: "pyramide-tests",
    title: "La pyramide des tests",
    level: 1,
    intro:
      "Les trois niveaux de tests, leur coût et leur valeur : savoir où investir.",
    blocks: [
      {
        kind: "table",
        headers: ["Niveau", "Ce qu'on teste", "Vitesse", "Valeur"],
        rows: [
          ["Unitaires", "Une fonction, un module, isolé", "Millisecondes, des milliers", "Localisent précisément les régressions"],
          ["Intégration", "Routes + base + services, ensemble", "Secondes, des centaines", "Valident le comportement réel de l'API"],
          ["End-to-end", "Le système complet comme un utilisateur", "Minutes, quelques dizaines", "Valident les parcours critiques"],
        ],
      },
      {
        kind: "text",
        text: "La pyramide dit : beaucoup d'unitaires (rapides, précis), moins d'intégration (plus lents, plus réalistes), peu d'e2e (coûteux, fragiles). Pour une API backend, le cœur de la pyramide ce sont les tests d'intégration : ils exercent les vraies routes contre une vraie base et attrapent les bugs que les unitaires ne voient pas (requêtes SQL fausses, sérialisation, authentification).",
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
      "Ce qu'il faut maîtriser avant d'écrire des tests backend, et pourquoi.",
    blocks: [
      {
        kind: "fields",
        title: "Bases indispensables",
        fields: [
          {
            label: "Python",
            value:
              "Pytest et les fixtures s'écrivent en Python : assertions, organisation en fonctions, bonnes pratiques de test.",
          },
          {
            label: "API REST",
            value:
              "Connaître les routes et leurs contrats : on teste ce que l'API promet à ses consommateurs — statuts, payloads, erreurs.",
          },
          {
            label: "Environnements virtuels",
            value:
              "Isoler les dépendances de test (`pytest`, `httpx`) par projet : une suite de tests doit s'installer de façon reproductible.",
          },
        ],
      },
    ],
  },
  {
    id: "installation-pytest",
    title: "Installer pytest",
    level: 2,
    intro:
      "Installer le framework de test Python de référence et ses compagnons.",
    blocks: [
      {
        kind: "command",
        label: "Installer pytest",
        command: "pip install pytest",
        why: "`pytest` est le framework de test standard de l'écosystème Python : assertions simples avec le mot-clé `assert`, découverte automatique des fichiers `test_*.py`, plugins riches. Il s'installe comme dépendance de développement du projet.",
        verify: "pytest --version",
      },
      {
        kind: "command",
        label: "Installer les outils de test d'API",
        command: "pip install fastapi httpx pytest-cov",
        why: "`fastapi` fournit l'API à tester et son `TestClient` ; `httpx` est le client HTTP sur lequel ce TestClient s'appuie ; `pytest-cov` mesure la couverture de code (quelles lignes les tests exécutent). Trois paquets, une chaîne de test complète.",
        verify: "python3 -c \"import fastapi, httpx, pytest_cov; print('ok')\"",
      },
    ],
  },
  {
    id: "premier-test",
    title: "Premier test",
    level: 2,
    intro:
      "Écrire et exécuter un premier test : la structure minimale, sans magie.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "test_remise.py",
        code: `def calculer_remise(prix: float, taux: float) -> float:
    if not 0 <= taux <= 1:
        raise ValueError("taux entre 0 et 1")
    return prix * (1 - taux)


def test_remise_20_pourcent():
    assert calculer_remise(100.0, 0.2) == 80.0


def test_remise_taux_invalide():
    import pytest
    with pytest.raises(ValueError):
        calculer_remise(100.0, 1.5)`,
      },
      {
        kind: "command",
        label: "Exécuter les tests",
        command: "pytest -v",
        why: "Lance la découverte : pytest trouve les fichiers `test_*.py`, exécute les fonctions `test_*` et affiche le résultat. Le `-v` (verbose) détaille chaque test — indispensable pour voir lesquels passent et lesquels échouent, un par un.",
        verify: "pytest -v 2>&1 | tail -5",
      },
      {
        kind: "text",
        text: "Anatomie d'un test : Arrange (préparer les données), Act (appeler le code), Assert (vérifier le résultat). Ici en trois lignes : pas de classes, pas de boilerplate — c'est la philosophie de pytest, et la raison de son adoption.",
      },
    ],
  },
  {
    id: "assertions-efficaces",
    title: "Assertions efficaces",
    level: 2,
    intro:
      "Bien affirmer : un test n'est utile que si son échec dit quelque chose.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Des assertions qui diagnostiquent",
        code: `def test_article_contient_titre():
    article = creer_article(titre="Bonjour", contenu="...")
    # Bien : l'échec affiche les deux côtés de la comparaison
    assert article["titre"] == "Bonjour"

def test_panier_total():
    panier = Panier()
    panier.ajouter("livre", 2, 15.0)
    # Bien : un message qui dit ce qui aurait dû se passer
    assert panier.total() == 30.0, f"total inattendu : {panier.total()}"

def test_statut_cree():
    reponse = client.post("/articles", json={...})
    # Bien : vérifier le statut AVANT le contenu
    assert reponse.status_code == 201
    assert reponse.json()["titre"] == "Bonjour"`,
      },
      {
        kind: "list",
        items: [
          "Un test = un comportement : si un test vérifie cinq choses, son échec ne dit pas laquelle a cassé.",
          "Vérifier le statut HTTP avant le payload : un 500 avec un beau message d'erreur reste un 500.",
          "Éviter les assertions sur des détails instables (timestamps exacts, ordre des clés JSON) — elles créent des tests fragiles.",
          "`pytest.raises` pour les erreurs : tester qu'une erreur est levée est aussi important que tester le cas nominal.",
        ],
      },
    ],
  },
  {
    id: "fixtures",
    title: "Fixtures",
    level: 2,
    intro:
      "Le mécanisme central de pytest : des contextes réutilisables injectés dans les tests.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "test_articles.py — fixture client et base",
        code: `import pytest
from fastapi.testclient import TestClient
from app import app, get_db

@pytest.fixture
def client(tmp_path):
    # Arrange partagé : base SQLite temporaire + client de test
    db_path = tmp_path / "test.db"
    app.dependency_overrides[get_db] = lambda: ouvrir_db(db_path)
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()

def test_creer_article(client):
    reponse = client.post("/articles", json={"titre": "Bonjour"})
    assert reponse.status_code == 201
    assert reponse.json()["id"] is not None

def test_lister_articles(client):
    # Chaque test repart d'une base vide : pas de pollution entre tests
    assert client.get("/articles").json() == []`,
      },
      {
        kind: "text",
        text: "Une fixture est une fonction qui prépare un contexte (client, base, utilisateur) et l'injecte par son nom en paramètre du test. Le `yield` sépare la préparation (avant) du nettoyage (après) : ici, la base temporaire est créée avant et le contournement de dépendance est retiré après. Chaque test reçoit un contexte frais — l'isolation est la propriété la plus importante d'une suite de tests.",
      },
    ],
  },
  {
    id: "organisation-tests",
    title: "Organiser les tests",
    level: 2,
    intro:
      "Où mettre les tests, comment les nommer : la structure qui passe à l'échelle.",
    blocks: [
      {
        kind: "diagram",
        title: "Arborescence recommandée",
        lines: [
          "project/",
          "├── src/",
          "│   └── app.py          (le code)",
          "├── tests/",
          "│   ├── conftest.py     (fixtures partagées)",
          "│   ├── test_articles.py",
          "│   ├── test_auth.py",
          "│   └── test_paiements.py",
          "└── pyproject.toml",
        ],
      },
      {
        kind: "list",
        items: [
          "Un fichier de test par domaine (`test_articles.py`), miroir du code — on trouve le test d'un module en un coup d'œil.",
          "`conftest.py` : les fixtures partagées à tout le dossier, découvertes automatiquement par pytest.",
          "Noms explicites : `test_creer_article_sans_titre_retourne_422` se lit comme une spécification.",
          "Séparer unitaires et intégration (`tests/unit/`, `tests/integration/`) quand la suite grandit — pour lancer les rapides seuls.",
        ],
      },
    ],
  },
  {
    id: "tests-routes",
    title: "Tester les routes",
    level: 2,
    intro:
      "Le TestClient de FastAPI : exercer les vraies routes HTTP sans lancer de serveur.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "app.py — une petite API à tester",
        code: `from fastapi import FastAPI, HTTPException

app = FastAPI()
articles = {}

@app.post("/articles", status_code=201)
def creer_article(payload: dict):
    if not payload.get("titre"):
        raise HTTPException(status_code=422, detail="titre requis")
    article_id = len(articles) + 1
    articles[article_id] = {"id": article_id, **payload}
    return articles[article_id]

@app.get("/articles/{article_id}")
def lire_article(article_id: int):
    if article_id not in articles:
        raise HTTPException(status_code=404, detail="introuvable")
    return articles[article_id]`,
      },
      {
        kind: "code",
        language: "python",
        title: "test_routes.py — cycle de vie complet",
        code: `from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_cycle_article():
    creation = client.post("/articles", json={"titre": "Bonjour"})
    assert creation.status_code == 201
    article_id = creation.json()["id"]

    lecture = client.get(f"/articles/{article_id}")
    assert lecture.status_code == 200
    assert lecture.json()["titre"] == "Bonjour"

def test_sans_titre_422():
    reponse = client.post("/articles", json={})
    assert reponse.status_code == 422

def test_introuvable_404():
    assert client.get("/articles/9999").status_code == 404`,
      },
      {
        kind: "text",
        text: "Le TestClient exécute l'application en mémoire : pas de serveur, pas de port, mais les vraies routes, la vraie validation, les vrais codes de statut. C'est ce qui rend les tests d'intégration rapides et fiables — on teste le comportement HTTP réel, pas une simulation.",
      },
    ],
  },
  {
    id: "couverture",
    title: "Mesurer la couverture",
    level: 2,
    intro:
      "Savoir quelles lignes les tests exécutent — et ne pas en faire une religion.",
    blocks: [
      {
        kind: "command",
        label: "Lancer les tests avec couverture",
        command: "pytest --cov=src --cov-report=term-missing",
        why: "`--cov=src` mesure quelles lignes du dossier `src` sont exécutées par les tests ; `term-missing` affiche les numéros de lignes non couvertes directement dans le terminal. On voit immédiatement ce qui n'est jamais testé.",
        verify: "pytest --cov=src --cov-report=term-missing 2>&1 | tail -15",
      },
      {
        kind: "text",
        text: "La couverture est un indicateur, pas un objectif : 100 % de couverture avec des tests qui n'affirment rien ne protège de rien. Ce qui compte, c'est la couverture des chemins critiques (paiement, auth, validation) et des cas limites (erreurs, entrées invalides). Viser ~80 % sur le code métier, 100 % sur les chemins critiques — et ne jamais écrire un test juste pour faire monter le chiffre.",
      },
    ],
  },
  {
    id: "workflow-professionnel",
    title: "Workflow professionnel",
    level: 2,
    intro:
      "Comment les tests s'intègrent au quotidien d'une équipe.",
    blocks: [
      {
        kind: "list",
        items: [
          "Lancer les tests avant chaque commit : `pytest` fait partie du réflexe, comme `git status`.",
          "CI obligatoire : chaque pull request exécute la suite complète — un test rouge bloque la fusion, sans exception.",
          "Écrire le test avec la feature : le test documente le comportement attendu et protège les suivants.",
          "Bug en production → test d'abord : reproduire le bug par un test qui échoue, puis corriger — le test devient une non-régression permanente.",
          "Suite rapide : si les tests prennent 20 minutes, personne ne les lance — garder les unitaires sous la minute, l'intégration sous 5.",
        ],
      },
    ],
  },
  {
    id: "debugging-tests",
    title: "Déboguer les tests",
    level: 2,
    intro:
      "Quand un test échoue : lire, isoler, comprendre — dans cet ordre.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Lire l'échec en entier",
            detail:
              "pytest affiche la valeur attendue, la valeur obtenue et la ligne fautive. 80 % des diagnostics sont dans ces trois informations — ne pas les survoler.",
          },
          {
            title: "Relancer le seul test",
            detail:
              "`pytest tests/test_articles.py::test_creer_article -v` : isole le test fautif. S'il passe seul mais échoue en suite, c'est une pollution entre tests (état partagé).",
          },
          {
            title: "Vérifier la fixture",
            detail:
              "Le contexte est-il celui qu'on croit ? Base vide ? Utilisateur connecté ? Un `print` temporaire dans la fixture révèle l'état réel.",
          },
          {
            title: "Interroger avec -x et --pdb",
            detail:
              "`pytest -x` s'arrête au premier échec ; `--pdb` ouvre le débogueur à l'échec pour inspecter les variables. Deux options qui changent la vie.",
          },
          {
            title: "Distinguer test cassé et code cassé",
            detail:
              "Le test vérifie-t-il encore le bon comportement ? Un test qui échoue après un changement volontaire de comportement doit être mis à jour, pas « réparé ».",
          },
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro:
      "Quatre projets de difficulté croissante pour passer de la théorie à la pratique professionnelle.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Suite unitaire d'un module",
        fields: [
          { label: "Ce qu'on construit", value: "Tests pytest pour un module de logique métier (calculs, validation)" },
          { label: "Ce qu'on apprend", value: "Arrange/Act/Assert, fixtures simples, pytest.raises" },
          { label: "Difficulté", value: "Faible — une journée" },
          { label: "Projet suivant", value: "Tests d'intégration d'une API" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Tests d'intégration d'une API",
        fields: [
          { label: "Ce qu'on construit", value: "Suite complète sur une API CRUD : routes, erreurs, auth" },
          { label: "Ce qu'on apprend", value: "TestClient, fixtures de base, couverture utile" },
          { label: "Difficulté", value: "Moyenne — quelques jours" },
          { label: "Projet suivant", value: "Base réelle + CI" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Base réelle et CI",
        fields: [
          { label: "Ce qu'on construit", value: "Tests contre Postgres en conteneur, suite exécutée en CI à chaque PR" },
          { label: "Ce qu'on apprend", value: "Testcontainers, rollback, pipeline GitHub Actions" },
          { label: "Difficulté", value: "Élevée — une à deux semaines" },
          { label: "Projet suivant", value: "Tests de contrat et charge" },
        ],
      },
      {
        kind: "fields",
        title: "Expert — Contrats et non-régression",
        fields: [
          { label: "Ce qu'on construit", value: "Tests de contrat OpenAPI + stratégie anti-flaky + budget de couverture" },
          { label: "Ce qu'on apprend", value: "Fiabiliser une suite à grande échelle" },
          { label: "Difficulté", value: "Élevée — deux semaines" },
          { label: "Projet suivant", value: "Tests de charge (voir System Design)" },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "bon-test",
    title: "Ce qu'est un bon test",
    level: 3,
    intro:
      "Les cinq propriétés qui distinguent un test utile d'un test décoratif.",
    blocks: [
      {
        kind: "fields",
        title: "Les cinq propriétés",
        fields: [
          {
            label: "Rapide",
            value: "Des millisecondes par test : une suite lente n'est pas lancée, donc ne protège pas.",
          },
          {
            label: "Isolé",
            value: "Aucun ordre de dépendance entre tests, aucun état partagé : chaque test passe seul ou en suite.",
          },
          {
            label: "Répétable",
            value: "Même résultat à chaque exécution : pas de dépendance à l'heure, au réseau ou au hasard non maîtrisé.",
          },
          {
            label: "Lisible",
            value: "Le test se lit comme une spécification : ce qu'on vérifie est évident sans lire le code testé.",
          },
          {
            label: "Ciblé",
            value: "Un comportement par test : l'échec désigne précisément ce qui a cassé.",
          },
        ],
      },
    ],
  },
  {
    id: "parametrize",
    title: "Paramétrer les tests",
    level: 3,
    intro:
      "Tester N cas avec un seul test : `pytest.mark.parametrize`.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Un test, six cas de validation",
        code: `import pytest

@pytest.mark.parametrize("payload,attendu", [
    ({"titre": "Ok"}, 201),                       # nominal
    ({}, 422),                                    # titre manquant
    ({"titre": ""}, 422),                         # titre vide
    ({"titre": "x" * 500}, 422),                  # trop long
    ({"titre": 123}, 422),                        # mauvais type
    ({"titre": "Ok", "inconnu": 1}, 201),         # champ ignoré
])
def test_validation_creation(client, payload, attendu):
    assert client.post("/articles", json=payload).status_code == attendu`,
      },
      {
        kind: "text",
        text: "Chaque ligne devient un test indépendant, nommé et rapporté séparément. C'est la façon la plus dense de couvrir les cas limites : la validation d'une route se teste en une table de cas, pas en six fonctions copiées-collées.",
      },
    ],
  },
  {
    id: "conftest",
    title: "conftest.py en profondeur",
    level: 3,
    intro:
      "Le fichier qui structure toute la suite : portées, organisation, bonnes pratiques.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "tests/conftest.py",
        code: `import pytest
from fastapi.testclient import TestClient
from app import app, get_db, creer_base_temporaire

@pytest.fixture(scope="session")
def base():
    # Coûteux : créé une fois pour toute la session
    return creer_base_temporaire()

@pytest.fixture
def client(base):
    # Frais par test : rollback après chaque test
    with base.transaction():
        app.dependency_overrides[get_db] = lambda: base.session()
        with TestClient(app) as c:
            yield c
        app.dependency_overrides.clear()

@pytest.fixture
def utilisateur_authentifie(client):
    reponse = client.post("/auth/token", data={"username": "ada", "password": "s3cret"})
    token = reponse.json()["access_token"]
    client.headers.update({"Authorization": f"Bearer {token}"})
    return {"username": "ada"}`,
      },
      {
        kind: "fields",
        title: "Portées de fixtures",
        fields: [
          {
            label: "function (défaut)",
            value: "Recréée à chaque test : isolation maximale. Le défaut sain pour tout ce qui a un état.",
          },
          {
            label: "session",
            value: "Créée une fois : pour les ressources coûteuses et immuables (connexion, schéma de base). Jamais pour un état mutable.",
          },
          {
            label: "module / class",
            value: "Intermédiaires : utiles quand un groupe de tests partage un contexte coûteux mais identique.",
          },
        ],
      },
    ],
  },
  {
    id: "mocks",
    title: "Mocks : simuler les dépendances",
    level: 3,
    intro:
      "Isoler le code des services externes avec `unittest.mock` : quand et comment, sans en abuser.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Mocker un appel externe",
        code: `from unittest.mock import patch

def test_inscription_envoie_bienvenue():
    with patch("app.envoyer_email") as mock_email:
        reponse = client.post("/inscription", json={"email": "a@b.c"})
        assert reponse.status_code == 201
        mock_email.assert_called_once()
        args = mock_email.call_args
        assert args[0][0] == "a@b.c"  # le destinataire

def test_paiement_echec_gere():
    with patch("app.facturer", side_effect=TimeoutError("timeout")):
        reponse = client.post("/paiement", json={"montant": 10})
        assert reponse.status_code == 502  # l'API gère le timeout proprement`,
      },
      {
        kind: "text",
        text: "Règle d'or : on mocke les frontières (APIs externes, envoi d'emails, horloge), jamais le code qu'on teste. Un test qui mocke la moitié de l'application ne teste plus rien — il vérifie que les mocks se parlent entre eux. Et chaque mock est une dette : si l'API externe change, le mock ment en silence.",
      },
    ],
  },
  {
    id: "tests-erreurs",
    title: "Tester les erreurs",
    level: 3,
    intro:
      "Les cas d'erreur sont des comportements : ils se testent comme les cas nominaux.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Catalogue d'erreurs d'une route",
        code: `def test_article_sans_titre():
    assert client.post("/articles", json={}).status_code == 422

def test_article_introuvable():
    r = client.get("/articles/99999")
    assert r.status_code == 404
    assert r.json()["detail"] == "introuvable"

def test_payload_malforme():
    r = client.post("/articles", content="pas du json",
                    headers={"Content-Type": "application/json"})
    assert r.status_code == 422

def test_methode_non_autorisee():
    assert client.delete("/articles").status_code == 405`,
      },
      {
        kind: "text",
        text: "Chaque code d'erreur documenté de l'API doit avoir son test : c'est le contrat d'erreur, aussi important que le contrat nominal. Un endpoint qui renvoie 500 là où la doc promet 404 est un bug — seul un test le garantit durablement.",
      },
    ],
  },
  {
    id: "tests-auth",
    title: "Tester l'authentification",
    level: 3,
    intro:
      "La sécurité se teste : accès refusés, tokens invalides, escalade de privilèges.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Les quatre cas d'une route protégée",
        code: `def test_sans_token_401(client):
    assert client.get("/profil").status_code == 401

def test_token_invalide_401(client):
    client.headers["Authorization"] = "Bearer faux"
    assert client.get("/profil").status_code == 401

def test_acces_profil_ok(utilisateur_authentifie, client):
    r = client.get("/profil")
    assert r.status_code == 200
    assert r.json()["username"] == "ada"

def test_admin_requis_403(utilisateur_authentifie, client):
    # ada n'est pas admin : l'accès est refusé proprement
    assert client.delete("/utilisateurs/1").status_code == 403`,
      },
      {
        kind: "text",
        text: "La matrice à couvrir : non authentifié (401), mal authentifié (401), authentifié sans droits (403), authentifié avec droits (200). Le cas le plus critique est le 403 manquant : une route d'administration accessible à tout utilisateur connecté est une faille — le test la transforme en non-régression.",
      },
    ],
  },
  {
    id: "tests-integration-db",
    title: "Tests d'intégration avec base réelle",
    level: 3,
    intro:
      "Pourquoi tester contre une vraie base, et comment le faire sans polluer.",
    blocks: [
      {
        kind: "text",
        text: "SQLite en mémoire suffit pour commencer, mais il ment sur les détails : types, contraintes, dialecte SQL diffèrent de PostgreSQL. Les bugs les plus vicieux (une requête qui passe en SQLite et échoue en Postgres, une contrainte non appliquée) ne se voient qu'avec la vraie base. D'où les conteneurs éphémères : une vraie Postgres, créée pour les tests, détruite après.",
      },
      {
        kind: "command",
        label: "Installer Testcontainers",
        command: "pip install testcontainers",
        why: "`testcontainers` démarre des conteneurs Docker éphémères (Postgres, Redis…) depuis les tests : une vraie base, sans installation locale ni état partagé entre développeurs. Le conteneur vit le temps de la session de test.",
        verify: "python3 -c \"import testcontainers; print('ok')\"",
      },
      {
        kind: "code",
        language: "python",
        title: "Fixture Postgres éphémère",
        code: `import pytest
from testcontainers.postgres import PostgresContainer

@pytest.fixture(scope="session")
def postgres():
    with PostgresContainer("postgres:16") as pg:
        yield pg.get_connection_url()
        # À la sortie : le conteneur est détruit, aucune trace`,
      },
    ],
  },
  {
    id: "transactions-rollback",
    title: "Isolation par transactions",
    level: 3,
    intro:
      "Le pattern qui rend les tests d'intégration rapides et indépendants : le rollback.",
    blocks: [
      {
        kind: "text",
        text: "Plutôt que de recréer la base à chaque test (lent), on ouvre une transaction au début du test et on l'annule (rollback) à la fin : la base retrouve son état initial en quelques millisecondes. Chaque test voit une base propre sans payer le coût d'une reconstruction.",
      },
      {
        kind: "list",
        items: [
          "Vitesse : le rollback est quasi instantané — des centaines de tests d'intégration restent sous la minute.",
          "Limite : le code testé doit participer à la même transaction (connexion partagée via la fixture).",
          "Alternative : TRUNCATE des tables entre tests — plus simple, plus lent, à réserver aux petites suites.",
          "Ne jamais tester sur une base partagée (dev, staging) : un test qui écrit peut détruire des données réelles.",
        ],
      },
    ],
  },
  {
    id: "tests-async",
    title: "Tester le code asynchrone",
    level: 3,
    intro:
      "Les routes `async` se testent avec un client async : la mécanique minimale.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Client async avec httpx",
        code: `import pytest
import asyncio
from httpx import AsyncClient, ASGITransport
from app import app

@pytest.fixture
async def async_client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as c:
        yield c

def test_route_async(async_client):
    async def _run():
        r = await async_client.get("/articles")
        assert r.status_code == 200
    asyncio.run(_run())`,
      },
      {
        kind: "text",
        text: "`ASGITransport` branche le client HTTP directement sur l'application ASGI, sans serveur : c'est l'équivalent async du TestClient. Le point d'attention : ne pas mélanger les boucles d'événements entre tests — une fixture qui crée et ferme proprement son client évite les fuites.",
      },
    ],
  },
  {
    id: "tests-contrat",
    title: "Tests de contrat",
    level: 3,
    intro:
      "Vérifier que l'API respecte son schéma OpenAPI : le contrat comme test.",
    blocks: [
      {
        kind: "text",
        text: "Un test de contrat vérifie que les réponses réelles de l'API sont conformes au schéma OpenAPI documenté : champs présents, types corrects, codes de statut déclarés. Il attrape la dérive silencieuse — le champ renommé côté code mais pas côté doc, le statut 200 devenu 201 — qui casse les consommateurs sans casser les tests fonctionnels.",
      },
      {
        kind: "list",
        items: [
          "Générer le schéma depuis le code (FastAPI le fait nativement via `/openapi.json`) : une seule source de vérité.",
          "Valider chaque réponse de test contre le schéma : toute divergence est un échec.",
          "Côté consommateur : rejouer les exemples du contrat pour vérifier qu'on sait les lire.",
          "Le contrat versionné : un changement incompatible = une version majeure, détectée par les tests avant les utilisateurs.",
        ],
      },
    ],
  },
  {
    id: "donnees-test",
    title: "Données de test",
    level: 3,
    intro:
      "Fabriquer des données réalistes : factories, jeux figés, et leurs pièges.",
    blocks: [
      {
        kind: "list",
        items: [
          "Factories : des fonctions qui créent des objets valides avec des valeurs par défaut surchargeables (`creer_utilisateur(admin=True)`). Mieux que des fixtures rigides copiées-collées.",
          "Données figées : un jeu de référence versionné pour les tests de non-régression métier (tarifs, règles) — quand il change, c'est volontaire et relu.",
          "Aléatoire maîtrisé : le hasard avec une graine fixée (`random.seed(42)`) pour des données variées mais reproductibles.",
          "Données réalistes : des emails valides, des montants plausibles — les cas limites se cachent dans le réalisme, pas dans `test/test`.",
          "Jamais de données de production : même anonymisées « à la main » — le risque de fuite ne vaut pas le réalisme.",
        ],
      },
    ],
  },
  {
    id: "flaky-tests",
    title: "Tests fragiles (flaky)",
    level: 3,
    intro:
      "Le test qui passe parfois : le cancer des suites de tests, et son traitement.",
    blocks: [
      {
        kind: "text",
        text: "Un test flaky passe ou échoue sans changement de code : dépendance au temps (`sleep(1)` puis vérification), à l'ordre d'exécution, au réseau, au hasard non graine. Le danger n'est pas le faux échec isolé — c'est la confiance perdue : quand la suite est flaky, on ignore les rouges, et les vrais bugs passent.",
      },
      {
        kind: "list",
        items: [
          "Politique zéro flaky : un test flaky est mis en quarantaine (marqué, exclu de la CI) puis corrigé ou supprimé — jamais « relancé jusqu'à ce qu'il passe ».",
          "Causes typiques : attentes temporelles arbitraires, état partagé, dépendances réseau, parallélisme non maîtrisé.",
          "Remèdes : attente active avec timeout (polling) au lieu de `sleep` fixe, isolation stricte, mocks aux frontières.",
          "Détection : relancer la suite plusieurs fois en CI et traquer les tests au taux de succès < 100 %.",
        ],
      },
    ],
  },
  {
    id: "couverture-utile",
    title: "Couverture utile",
    level: 3,
    intro:
      "Aller au-delà du pourcentage : ce que la couverture ne dit pas.",
    blocks: [
      {
        kind: "text",
        text: "La couverture de lignes ne mesure que l'exécution, pas la vérification : un test qui appelle une fonction sans rien affirmer couvre 100 % et ne protège de rien. La couverture de branches (chaque `if` pris dans les deux sens) est plus exigeante ; le mutation testing (modifier le code et vérifier qu'un test échoue) est le vrai test des tests — coûteux, réservé au code critique.",
      },
      {
        kind: "list",
        items: [
          "Exclure le code non testable par nature (scripts de migration, `if __name__ == \"__main__\"`) via la config — un chiffre honnête vaut mieux qu'un 100 % truqué.",
          "Suivre la tendance, pas le seuil : une couverture qui baisse sur une PR signale du code non testé.",
          "Prioriser : chemins critiques et cas limites d'abord, code trivial ensuite — jamais l'inverse.",
        ],
      },
    ],
  },
  {
    id: "qualite-lint",
    title: "Qualité : linter les tests",
    level: 3,
    intro:
      "Le code de test est du code : il se lit, se maintient, se linte.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier la qualité avec ruff",
        command: "pip install ruff && ruff check tests/ && ruff format --check tests/",
        why: "`ruff` est le linter/formateur Python rapide de référence : `check` signale les problèmes (imports inutilisés, variables mortes), `format --check` vérifie la mise en forme sans modifier. Appliqué aux tests, il garde la suite lisible et homogène.",
        verify: "ruff --version",
      },
      {
        kind: "text",
        text: "Les tests ont leurs propres anti-patterns de qualité : logique conditionnelle dans les tests (`if` qui change ce qu'on vérifie), tests qui ne testent rien (pas d'assertion), duplication massive entre tests (factoriser en fixtures et helpers). Un test illisible n'est pas maintenu — et un test non maintenu devient un flaky en puissance.",
      },
    ],
  },
  {
    id: "ci-tests",
    title: "Tests en CI",
    level: 3,
    intro:
      "Exécuter la suite à chaque pull request : le pipeline minimal qui protège l'équipe.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: ".github/workflows/tests.yml",
        code: `name: Tests
on: [push, pull_request]
jobs:
  tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: test
        ports: ["5432:5432"]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.12" }
      - run: pip install -r requirements.txt -r requirements-test.txt
      - run: ruff check src/ tests/
      - run: pytest --cov=src --cov-report=term-missing`,
      },
      {
        kind: "text",
        text: "Le pipeline : checkout, Python, dépendances, lint, tests avec Postgres en service. Règles : la suite doit passer pour fusionner (branche protégée), elle doit être rapide (< 10 min) sinon on la parallélise, et un échec de CI est prioritaire — on ne fusionne jamais « par-dessus un rouge ».",
      },
    ],
  },
  {
    id: "tests-performance",
    title: "Tests de performance",
    level: 3,
    intro:
      "Vérifier que l'API tient la charge : les bases du test de charge, sans outillage lourd.",
    blocks: [
      {
        kind: "list",
        items: [
          "Objectif : valider un SLO (ex. p99 < 300ms à 100 req/s), pas « voir jusqu'où ça casse » sans référence.",
          "Méthode : montée en charge progressive, mesure de la latence et des erreurs à chaque palier — le palier où ça dégrade est la capacité.",
          "Environnement : jamais en production sans garde-fous ; un environnement de charge représentatif (données, taille de base).",
          "Ce qu'on en fait : le goulot identifié (souvent la base) alimente les chantiers de performance — voir la compétence Caching.",
          "Automatiser le smoke de perf en CI : un test de charge léger qui échoue si la latence régresse de 50 %.",
        ],
      },
    ],
  },
  {
    id: "tests-securite",
    title: "Tests de sécurité de base",
    level: 3,
    intro:
      "Les vérifications automatisables qui attrapent les failles les plus courantes.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Injections et traversées : les classiques",
        code: `def test_pas_d_injection_sql(client):
    # Un ORM paramétré doit traiter ceci comme une simple chaîne
    r = client.get("/articles", params={"q": "' OR '1'='1"})
    assert r.status_code == 200  # pas d'erreur 500, pas de fuite

def test_pas_de_traversee_chemin(client):
    r = client.get("/fichiers", params={"nom": "../../etc/passwd"})
    assert r.status_code in (400, 404)  # jamais de lecture hors dossier

def test_enumeration_limitee(client):
    # Les messages d'erreur ne doivent pas distinguer
    # "utilisateur inexistant" de "mot de passe faux"
    r1 = client.post("/auth/token", data={"username": "nope", "password": "x"})
    r2 = client.post("/auth/token", data={"username": "ada", "password": "x"})
    assert r1.status_code == r2.status_code == 401`,
      },
      {
        kind: "text",
        text: "Ces tests ne remplacent pas un audit, mais ils verrouillent les bases : entrées hostiles traitées sans erreur 500, pas de traversée de chemin, pas d'énumération d'utilisateurs. Chaque faille corrigée devient un test — la sécurité se capitalise comme le reste.",
      },
    ],
  },
  {
    id: "strategie-tdd",
    title: "TDD : tester d'abord",
    level: 3,
    intro:
      "Le développement piloté par les tests : le cycle rouge-vert-refactor, sans dogme.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Rouge",
            detail:
              "Écrire le test du comportement voulu avant le code : il échoue (le code n'existe pas). Le test exprime le besoin, pas l'implémentation.",
          },
          {
            title: "Vert",
            detail:
              "Écrire le code minimal qui fait passer le test. Pas plus : la simplicité est forcée par le test.",
          },
          {
            title: "Refactor",
            detail:
              "Nettoyer le code en gardant le test vert : le filet permet d'oser la simplification.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le bénéfice réel du TDD n'est pas la couverture — c'est la conception : un code difficile à tester est souvent un code mal découpé, et écrire le test d'abord le révèle immédiatement. En pratique, le TDD brille sur la logique métier pure ; pour les couches d'intégration (routes, base), les tests écrits juste après sont tout aussi valables.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pièges classiques des tests backend, et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Tester l'implémentation, pas le comportement",
            value:
              "Problem : le test casse à chaque refactor même si le comportement est identique. Why : assertions sur des détails internes. Better : tester via l'interface publique (HTTP, retours de fonctions).",
          },
          {
            label: "Mocks abusifs",
            value:
              "Problem : des tests qui passent avec un code cassé. Why : tout est mocké sauf une ligne. Better : mocker les frontières externes uniquement.",
          },
          {
            label: "Tests dépendants de l'ordre",
            value:
              "Problem : la suite passe en local, échoue en CI. Why : état partagé entre tests. Better : isolation stricte, fixtures fraîches, rollback.",
          },
          {
            label: "Sleep arbitraires",
            value:
              "Problem : tests lents et flaky. Why : `time.sleep(2)` « pour laisser le temps ». Better : attente active avec timeout, ou design synchrone testable.",
          },
          {
            label: "Pas d'assertion",
            value:
              "Problem : le test passe toujours, ne protège de rien. Why : on vérifie « que ça ne plante pas ». Better : chaque test affirme un résultat observable.",
          },
          {
            label: "Base de dev partagée",
            value:
              "Problem : tests qui s'écrasent mutuellement, données réelles corrompues. Why : facilité. Better : base éphémère par exécution, jamais partagée.",
          },
          {
            label: "Ignorer les rouges",
            value:
              "Problem : la suite devient décorative. Why : « ce test est flaky, on le relance ». Better : quarantaine immédiate, correction prioritaire.",
          },
          {
            label: "100 % de couverture comme objectif",
            value:
              "Problem : des tests écrits pour le chiffre, sans valeur. Why : le seuil devient la cible. Better : couvrir les chemins critiques et les cas limites.",
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
      "Les habitudes d'une équipe dont la suite de tests est un atout, pas un fardeau.",
    blocks: [
      {
        kind: "list",
        items: [
          "La suite est rapide ou elle est morte : investir dans la vitesse (parallélisme, rollback, mocks aux frontières).",
          "Un bug = un test : chaque correction s'accompagne de sa non-régression.",
          "Les tests sont relus en revue comme le code : un mauvais test est pire que pas de test.",
          "CI bloquante : aucun code non testé ne fusionne — la règle ne souffre aucune exception.",
          "Nettoyer régulièrement : supprimer les tests obsolètes, fusionner les doublons, traquer les flaky.",
          "Documenter la stratégie : quels niveaux, quels outils, quels seuils — dans le README, pas dans les têtes.",
        ],
      },
    ],
  },
  {
    id: "glossaire",
    title: "Glossaire",
    level: 3,
    intro:
      "Le vocabulaire des tests backend, en une page.",
    blocks: [
      {
        kind: "fields",
        title: "Termes essentiels",
        fields: [
          { label: "Test unitaire", value: "Vérifie une unité isolée (fonction, module), sans dépendances." },
          { label: "Test d'intégration", value: "Vérifie plusieurs composants ensemble (routes + base réelle)." },
          { label: "Fixture", value: "Contexte réutilisable préparé pour les tests (client, base, utilisateur)." },
          { label: "Mock", value: "Simulacre qui remplace une dépendance externe pendant le test." },
          { label: "Assertion", value: "Vérification qu'une condition est vraie — le cœur du test." },
          { label: "Couverture", value: "Proportion du code exécutée par les tests." },
          { label: "Test flaky", value: "Test au résultat instable sans changement de code." },
          { label: "Non-régression", value: "Test qui garantit qu'un bug corrigé ne reviendra pas." },
          { label: "Test de contrat", value: "Vérifie que l'API respecte son schéma documenté." },
          { label: "TDD", value: "Test-Driven Development : écrire le test avant le code." },
          { label: "Arrange/Act/Assert", value: "Structure d'un test : préparer, agir, vérifier." },
          { label: "Rollback", value: "Annulation d'une transaction — remet la base dans son état initial." },
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
            label: "pytest — documentation",
            value: "docs.pytest.org : fixtures, paramétrisation, plugins — la référence complète.",
          },
          {
            label: "FastAPI — testing",
            value: "fastapi.tiangolo.com : le guide officiel du TestClient et des dépendances surchargées.",
          },
          {
            label: "Testcontainers — documentation",
            value: "testcontainers.com : modules par technologie, bonnes pratiques d'intégration.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les projets progressifs de cette page, sur une API réelle.",
          "Approfondissement : la compétence `observability` pour tester aussi les alertes et l'instrumentation.",
          "Méthode : la littérature sur le TDD et les tests d'intégration pour les stratégies à grande échelle.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Les tests maîtrisés, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Automatiser : `docker` — exécuter la suite en CI contre des services conteneurisés.",
          "Superviser : `observability` — tester les alertes, valider l'instrumentation en intégration.",
          "Concevoir : `system-design` — penser la testabilité dès l'architecture (contrats, isolation).",
          "Sécuriser : `auth` — approfondir les tests de sécurité (injections, contrôle d'accès).",
          "Revenir à la roadmap : valider `testing-api` et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
  {
    id: "tests-idempotence",
    title: "Tester l'idempotence",
    level: 3,
    intro:
      "Répéter une opération ne doit pas la dupliquer : le test qui protège les retries.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Rejouer une création sans doublon",
        code: `def test_creation_idempotente(client):
    payload = {"titre": "Bonjour", "idempotency_key": "k-123"}
    r1 = client.post("/articles", json=payload)
    r2 = client.post("/articles", json=payload)  # retry réseau simulé
    assert r1.status_code == 201
    assert r2.status_code == 200  # la 2e fois : ressource existante, pas d'erreur
    assert r1.json()["id"] == r2.json()["id"]
    assert len(client.get("/articles").json()) == 1  # un seul article créé`,
      },
      {
        kind: "text",
        text: "Les clients retentent les requêtes en cas de timeout : sans clé d'idempotence, chaque retry crée un doublon (double facturation, double email). Le test simule le retry et vérifie l'unicité — c'est un test métier déguisé en test technique.",
      },
    ],
  },
  {
    id: "tests-pagination",
    title: "Tester la pagination",
    level: 3,
    intro:
      "Les listes paginées ont leurs bugs propres : les traquer systématiquement.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Cohérence d'une pagination",
        code: `def test_pagination_coherente(client):
    for i in range(25):
        client.post("/articles", json={"titre": f"a{i}"})
    p1 = client.get("/articles", params={"page": 1, "taille": 10}).json()
    p2 = client.get("/articles", params={"page": 2, "taille": 10}).json()
    p3 = client.get("/articles", params={"page": 3, "taille": 10}).json()
    assert len(p1["items"]) == 10 and len(p3["items"]) == 5
    ids = [a["id"] for a in p1["items"] + p2["items"] + p3["items"]]
    assert len(set(ids)) == 25  # aucun doublon, aucun oubli
    assert p1["total"] == 25

def test_pagination_invalide(client):
    assert client.get("/articles", params={"page": 0}).status_code == 422
    assert client.get("/articles", params={"taille": 1000}).status_code == 422`,
      },
    ],
  },
  {
    id: "tests-upload",
    title: "Tester les uploads",
    level: 3,
    intro:
      "Fichiers envoyés : types, tailles, contenus — la surface d'attaque à verrouiller.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Upload valide et rejets",
        code: `def test_upload_valide(client):
    contenu = b"\\x89PNG...données..."
    r = client.post("/fichiers", files={"f": ("photo.png", contenu, "image/png")})
    assert r.status_code == 201
    assert r.json()["taille"] == len(contenu)

def test_upload_trop_lourd(client):
    gros = b"x" * (11 * 1024 * 1024)  # 11 Mo
    r = client.post("/fichiers", files={"f": ("gros.bin", gros)})
    assert r.status_code == 413  # Payload Too Large

def test_type_refuse(client):
    r = client.post("/fichiers", files={"f": ("evil.exe", b"MZ...")})
    assert r.status_code == 415  # Unsupported Media Type`,
      },
      {
        kind: "text",
        text: "Valider le type réel (signature du fichier), pas l'extension — un `.png` renommé reste un exécutable. Limiter la taille côté API avant tout traitement : un upload illimité est une porte ouverte au déni de service.",
      },
    ],
  },
  {
    id: "tests-concurrence",
    title: "Tester la concurrence",
    level: 3,
    intro:
      "Deux requêtes simultanées sur la même ressource : le bug que les tests séquentiels ne voient pas.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Double réservation simultanée",
        code: `import threading

def test_pas_de_double_reservation(client):
    # Stock initial : 1 place
    statuts = []
    def reserver():
        r = client.post("/reservations", json={"place": "A1"})
        statuts.append(r.status_code)
    t1, t2 = threading.Thread(target=reserver), threading.Thread(target=reserver)
    t1.start(); t2.start(); t1.join(); t2.join()
    # Une seule réservation doit réussir : 201 + 409, jamais 201 + 201
    assert sorted(statuts) == [201, 409]`,
      },
      {
        kind: "text",
        text: "Ce test est intrinsèquement un peu flaky (ordonnancement des threads) : on le réserve aux sections critiques (stock, places, soldes) et on le fait tourner en boucle en CI pour traquer l'instabilité. La correction passe par la base : contrainte d'unicité ou verrouillage — jamais par du code applicatif seul.",
      },
    ],
  },
  {
    id: "paralleliser-tests",
    title: "Paralléliser la suite",
    level: 3,
    intro:
      "Quand la suite devient lente : exécuter les tests sur plusieurs cœurs.",
    blocks: [
      {
        kind: "command",
        label: "Installer pytest-xdist",
        command: "pip install pytest-xdist",
        why: "`pytest-xdist` répartit les tests sur N processus workers : une suite de 5 minutes sur 8 cœurs tombe souvent sous la minute. L'option `-n auto` utilise tous les cœurs disponibles.",
        verify: "pytest -n auto --collect-only -q 2>&1 | tail -2",
      },
      {
        kind: "text",
        text: "Prérequis : des tests vraiment isolés — le parallélisme expose brutalement les états partagés. Les tests d'intégration avec base éphémère par worker fonctionnent bien ; ceux qui écrivent dans les mêmes fichiers se marchent dessus. Si la parallélisation casse des tests, c'est en général un défaut d'isolation à corriger, pas un problème d'outil.",
      },
    ],
  },
  {
    id: "tests-websockets",
    title: "Tester les websockets",
    level: 3,
    intro:
      "Les connexions persistantes se testent aussi : le pattern minimal.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Dialogue websocket de test",
        code: `from fastapi.testclient import TestClient

def test_websocket_echo():
    with TestClient(app).websocket_connect("/ws") as ws:
        ws.send_text("ping")
        assert ws.receive_text() == "pong: ping"
        ws.send_json({"action": "subscribe", "canal": "alertes"})
        msg = ws.receive_json()
        assert msg["canal"] == "alertes"`,
      },
      {
        kind: "text",
        text: "Le TestClient gère les websockets en mode context manager : la connexion se ferme proprement à la sortie du bloc. À tester : l'authentification à la connexion (token refusé = connexion refusée), la déconnexion propre, et le comportement quand le client se tait (timeout côté serveur).",
      },
    ],
  },
  {
    id: "tests-horloge",
    title: "Tester le temps",
    level: 3,
    intro:
      "Le temps est l'ennemi des tests déterministes : le figer plutôt que le subir.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Figer l'horloge avec un mock",
        code: `from datetime import datetime, timezone
from unittest.mock import patch

FIGE = datetime(2026, 9, 29, 12, 0, tzinfo=timezone.utc)

def test_token_expire():
    with patch("app.maintenant", return_value=FIGE):
        token = creer_token(duree_heures=1)   # expire à 13h
    with patch("app.maintenant", return_value=FIGE.replace(hour=14)):
        assert valider_token(token) is False  # à 14h : expiré`,
      },
      {
        kind: "text",
        text: "Règle : le code ne doit jamais appeler `datetime.now()` directement dans la logique métier, mais via une fonction injectable/mockable. Les tests d'expiration, de planification et de cache TTL deviennent alors déterministes — plus de `sleep()` ni de flaky liés à l'heure.",
      },
    ],
  },
  {
    id: "strategie-suite",
    title: "Stratégie de suite à grande échelle",
    level: 3,
    intro:
      "Quand la suite dépasse le millier de tests : l'organisation qui la garde utile.",
    blocks: [
      {
        kind: "list",
        items: [
          "Marqueurs pytest (`@pytest.mark.lent`, `@pytest.mark.integration`) : lancer les rapides par défaut, tout en CI.",
          "Temps budgeté : chaque niveau a son budget (unitaires < 1 min, intégration < 10 min) — le dépassement déclenche un chantier.",
          "Quarantaine : les flaky sont exclus automatiquement et listés — visibles, pas ignorés.",
          "Ownership : chaque dossier de tests a un responsable — un test sans propriétaire n'est jamais réparé.",
          "Nettoyage trimestriel : tests obsolètes supprimés, doublons fusionnés — une suite est un jardin, pas un musée.",
        ],
      },
    ],
  },
];


import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète d'Auth : authentification, autorisation, sessions,
 * JWT, OAuth2/OIDC, hachage des mots de passe et sécurité OWASP.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Contrainte : seules des commandes sûres et réelles (openssl, curl).
 */
export const LEARNING_AUTH: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce que l'authentification protège : deux questions distinctes, deux mécanismes distincts.",
    blocks: [
      {
        kind: "text",
        text: "L'authentification répond à « qui êtes-vous ? » (prouver son identité), l'autorisation à « que pouvez-vous faire ? » (vérifier les droits). Confondre les deux est la source de nombreuses failles : savoir qui appelle ne dit pas ce qu'il a le droit de faire.",
      },
      {
        kind: "diagram",
        title: "Les deux questions",
        lines: [
          "AUTHENTIFICATION — « Qui êtes-vous ? »",
          "  │  Mot de passe, token, OAuth : prouver son identité.",
          "  │  Résultat : une identité vérifiée (utilisateur #42).",
          "  │",
          "AUTORISATION — « Que pouvez-vous faire ? »",
          "     Rôles, permissions, propriété : contrôler l'accès.",
          "     Résultat : autorisé ou refusé (403).",
        ],
      },
      {
        kind: "text",
        text: "Concrètement : se connecter avec un mot de passe, c'est l'authentification. Pouvoir supprimer uniquement ses propres articles, c'est l'autorisation. Chaque requête authentifiée doit ensuite passer le contrôle d'autorisation — l'un ne remplace jamais l'autre.",
      },
    ],
  },
  {
    id: "menaces",
    title: "Ce que l'auth protège",
    level: 1,
    intro:
      "Les attaques courantes contre l'authentification : savoir ce qu'on affronte.",
    blocks: [
      {
        kind: "table",
        headers: ["Attaque", "Principe", "Défense"],
        rows: [
          ["Brute-force", "Essayer des mots de passe en masse", "Rate limiting, verrouillage, 2FA"],
          ["Credential stuffing", "Rejouer des fuites d'autres sites", "2FA, détection d'anomalie"],
          ["Phishing", "Voler les identifiants par tromperie", "2FA résistante (clés), éducation"],
          ["Vol de session", "Réutiliser un cookie/token volé", "HttpOnly + Secure, rotation"],
          ["Injection", "Détourner les requêtes (SQL…)", "Requêtes paramétrées, validation"],
        ],
      },
      {
        kind: "text",
        text: "Aucune défense n'est parfaite seule : la sécurité de l'auth est une superposition (mot de passe fort + 2FA + rate limiting + HTTPS). L'OWASP Top 10 documente ces risques — c'est la référence à consulter avant toute mise en production.",
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
      "Les fondations avant de toucher à l'authentification.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut maîtriser avant",
        fields: [
          {
            label: "HTTP : cookies et en-têtes",
            value:
              "Comment le navigateur stocke et renvoie les cookies, ce qu'est l'en-tête `Authorization`. L'auth repose entièrement sur ces mécanismes.",
          },
          {
            label: "API REST : routes protégées",
            value:
              "Savoir construire une API et comprendre `401` vs `403` : la base sur laquelle l'auth se branche.",
          },
          {
            label: "Bases de données",
            value:
              "Stocker des utilisateurs et des sessions : tables, requêtes, index sur les tokens.",
          },
          {
            label: "Cryptographie : notions",
            value:
              "Hachage vs chiffrement (voir section dédiée) : ne jamais les confondre avant de stocker un mot de passe.",
          },
        ],
      },
    ],
  },
  {
    id: "hachage-mots-de-passe",
    title: "Hachage des mots de passe",
    level: 2,
    intro:
      "La règle n°1 : on ne stocke jamais un mot de passe, on stocke une empreinte.",
    blocks: [
      {
        kind: "command",
        label: "Générer un secret avec openssl",
        command: "openssl rand -hex 32",
        why: "Génère 32 octets aléatoires en hexadécimal : un secret imprévisible pour signer les tokens ou chiffrer. `openssl rand` utilise le générateur cryptographique du système — bien plus sûr que n'importe quelle valeur inventée.",
        verify: "openssl rand -hex 32 | wc -c",
      },
      {
        kind: "code",
        language: "python",
        title: "Hacher et vérifier avec bcrypt",
        code: "import bcrypt\n\n# À l'inscription : on stocke le hash, jamais le mot de passe\npassword_hash = bcrypt.hashpw(b\"mot-de-passe-choisi\", bcrypt.gensalt())\n\n# À la connexion : on compare, sans jamais « dé-hacher »\nok = bcrypt.checkpw(b\"mot-de-passe-saisi\", password_hash)",
      },
      {
        kind: "text",
        text: "Le hachage est à sens unique : même avec le hash, on ne retrouve pas le mot de passe. `bcrypt` (ou Argon2) est lent volontairement — des centaines de millisecondes par essai, ce qui rend le brute-force impraticable. Le « sel » intégré rend chaque hash unique, même pour des mots de passe identiques.",
      },
    ],
  },
  {
    id: "hachage-vs-chiffrement",
    title: "Hachage vs chiffrement",
    level: 2,
    intro:
      "Deux outils, deux usages : les confondre est une faille.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Hachage", "Chiffrement"],
        rows: [
          ["Réversible", "Non (sens unique)", "Oui (avec la clé)"],
          ["Usage", "Mots de passe, intégrité", "Données à relire (PII, tokens)"],
          ["Exemples", "bcrypt, Argon2, SHA-256", "AES-256-GCM"],
          ["Si la clé/leak fuit", "Les mots de passe restent protégés*", "Les données sont lisibles"],
        ],
      },
      {
        kind: "text",
        text: "*Protégés contre la lecture directe, mais pas contre le brute-force des mots de passe faibles — d'où l'importance d'algorithmes lents (bcrypt, Argon2) et d'une politique de mots de passe robuste. Retenez : mot de passe → hachage lent ; donnée à relire → chiffrement avec clé hors du code.",
      },
    ],
  },
  {
    id: "sessions-cookies",
    title: "Sessions et cookies",
    level: 2,
    intro:
      "L'authentification classique du web : un identifiant de session opaque dans un cookie sécurisé.",
    blocks: [
      {
        kind: "text",
        text: "Après vérification du mot de passe, le serveur crée une session (un identifiant aléatoire stocké côté serveur) et l'envoie dans un cookie. À chaque requête, le navigateur renvoie le cookie ; le serveur retrouve la session. L'identifiant est opaque : il ne contient rien, il ne fait que référencer.",
      },
      {
        kind: "code",
        language: "python",
        title: "Cookie de session sécurisé (FastAPI)",
        code: "from fastapi import Response\n\n@app.post(\"/login\")\ndef login(response: Response):\n    session_id = create_session(user_id)  # stocké côté serveur\n    response.set_cookie(\n        key=\"session_id\",\n        value=session_id,\n        httponly=True,   # invisible pour JavaScript (anti-XSS)\n        secure=True,     # HTTPS uniquement\n        samesite=\"lax\", # protection CSRF de base\n        max_age=3600,\n    )\n    return {\"ok\": True}",
      },
      {
        kind: "list",
        items: [
          "`HttpOnly` : le cookie n'est pas lisible en JavaScript — un XSS ne le vole pas.",
          "`Secure` : transmis uniquement en HTTPS.",
          "`SameSite=Lax` : limite l'envoi cross-site — première barrière anti-CSRF.",
          "Révocation facile : supprimer la session côté serveur déconnecte immédiatement.",
        ],
      },
    ],
  },
  {
    id: "jwt-bases",
    title: "JWT : les bases",
    level: 2,
    intro:
      "Le token auto-porteur : l'identité vérifiable sans stockage serveur.",
    blocks: [
      {
        kind: "text",
        text: "Un JWT (JSON Web Token) contient des déclarations (claims) signées : `sub` (sujet = l'utilisateur), `exp` (expiration), `iat` (émission). Le serveur vérifie la signature à chaque requête : pas besoin de stocker les sessions. Le prix : un token volé est utilisable jusqu'à expiration — d'où des durées de vie courtes.",
      },
      {
        kind: "code",
        language: "python",
        title: "Émettre et vérifier un JWT (PyJWT)",
        code: "import jwt, datetime\n\nSECRET = \"...\"  # variable d'environnement, jamais dans le code\n\ndef create_token(user_id: int) -> str:\n    payload = {\n        \"sub\": str(user_id),\n        \"exp\": datetime.datetime.now(datetime.UTC) + datetime.timedelta(minutes=15),\n    }\n    return jwt.encode(payload, SECRET, algorithm=\"HS256\")\n\ndef verify_token(token: str) -> dict:\n    return jwt.decode(token, SECRET, algorithms=[\"HS256\"])  # lève si invalide/expiré",
      },
      {
        kind: "command",
        label: "Appeler une route protégée par JWT",
        command: "curl http://127.0.0.1:8000/me -H \"Authorization: Bearer <TOKEN>\"",
        why: "Le schéma `Bearer` dans l'en-tête `Authorization` est la convention pour présenter un token. Remplacez `<TOKEN>` par un token réellement émis par votre API.",
        verify: "curl -i http://127.0.0.1:8000/me -H \"Authorization: Bearer invalide\"",
      },
    ],
  },
  {
    id: "oauth2-principe",
    title: "OAuth 2.0 : le principe",
    level: 2,
    intro:
      "« Se connecter avec Google » : déléguer l'authentification sans partager le mot de passe.",
    blocks: [
      {
        kind: "diagram",
        title: "Authorization Code Flow (simplifié)",
        lines: [
          "UTILISATEUR      VOTRE APP           GOOGLE",
          "  │  « Se connecter »  │                │",
          "  │ ────────────────► │                │",
          "  │                   │  redirection   │",
          "  │ ◄──────────────── │ ─────────────► │  login Google",
          "  │                   │                │",
          "  │                   │  code  │       │",
          "  │                   │ ◄──────│       │",
          "  │                   │ échange code   │",
          "  │                   │ ─────────────► │",
          "  │                   │ ◄───────────── │  tokens",
          "  │  connecté ✓       │                │",
          "  │ ◄──────────────── │                │",
        ],
      },
      {
        kind: "text",
        text: "Votre application ne voit jamais le mot de passe Google : elle reçoit un code, l'échange contre des tokens côté serveur, et récupère l'identité. OIDC (OpenID Connect) ajoute une couche d'identité standardisée (`id_token`) au-dessus d'OAuth 2.0.",
      },
    ],
  },
  {
    id: "rbac",
    title: "RBAC : rôles et permissions",
    level: 2,
    intro:
      "Structurer l'autorisation : des rôles, des permissions, des vérifications.",
    blocks: [
      {
        kind: "table",
        headers: ["Rôle", "Permissions typiques"],
        rows: [
          ["Lecteur", "Lire les contenus publics"],
          ["Rédacteur", "+ créer et modifier ses propres contenus"],
          ["Modérateur", "+ modérer les contenus d'autrui"],
          ["Admin", "+ gérer utilisateurs et configuration"],
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Vérifier un rôle (FastAPI)",
        code: "from fastapi import Depends, HTTPException\n\ndef require_role(*roles: str):\n    def check(user=Depends(get_current_user)):\n        if user.role not in roles:\n            raise HTTPException(403, \"Permission insuffisante\")\n        return user\n    return check\n\n@app.delete(\"/users/{uid}\", dependencies=[Depends(require_role(\"admin\"))])\ndef delete_user(uid: int): ...",
      },
    ],
  },
  {
    id: "editeurs",
    title: "Éditeurs et outillage",
    level: 2,
    intro:
      "Peu d'outillage spécifique : la rigueur est dans le code et les en-têtes.",
    blocks: [
      {
        kind: "fields",
        title: "Configuration recommandée",
        fields: [
          {
            label: "Variables d'environnement",
            value:
              "Secrets (clés de signature, client secrets OAuth) dans `.env` / variables d'environnement — jamais dans le dépôt ni dans le code.",
          },
          {
            label: "curl",
            value:
              "Tester les routes protégées, les 401/403, l'expiration des tokens — sans interface.",
          },
          {
            label: "jwt.io (décodeur)",
            value:
              "Inspecter le contenu d'un JWT (header, payload) pour debugger — ne jamais y coller un token de production sensible.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-pro",
    title: "Workflow professionnel",
    level: 2,
    intro:
      "Les habitudes qui évitent les failles d'auth les plus coûteuses.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Hacher dès le premier jour",
            detail:
              "bcrypt/Argon2 à l'inscription, `checkpw` à la connexion. Aucun mot de passe en clair, même « temporairement ».",
          },
          {
            title: "Séparer les deux questions",
            detail:
              "Chaque route protégée : d'abord authentifier (qui ?), puis autoriser (a-t-il le droit ?).",
          },
          {
            title: "Limiter les tentatives",
            detail:
              "Rate limiting sur `/login` et `/register` : quelques essais par minute par IP.",
          },
          {
            title: "Tester les accès",
            detail:
              "Pour chaque route : sans token → 401 ; avec token d'un autre utilisateur → 403 quand il faut.",
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
      "Trois projets pour pratiquer l'auth de bout en bout.",
    blocks: [
      {
        kind: "fields",
        title: "Par niveau",
        fields: [
          {
            label: "Débutant — Login par session",
            value:
              "Inscription (hachage bcrypt), connexion (cookie HttpOnly), déconnexion (suppression de session), route `/me`.",
          },
          {
            label: "Intermédiaire — API JWT + RBAC",
            value:
              "Émission/vérification JWT, refresh tokens, rôles (admin/rédacteur), tests des 401/403 sur chaque route.",
          },
          {
            label: "Avancé — OAuth2 + durcissement",
            value:
              "Connexion via un fournisseur OIDC, 2FA TOTP, rate limiting, audit des failles OWASP API sur votre propre API.",
          },
        ],
      },
    ],
  },
  {
    id: "double-question",
    title: "Tester les deux questions",
    level: 2,
    intro:
      "Vérifier l'authentification ET l'autorisation avec curl.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier le 401 (non authentifié)",
        command: "curl -i http://127.0.0.1:8000/me",
        why: "Sans identifiant, une route protégée doit répondre `401` — pas `200` avec une erreur, pas `403`. C'est le premier test de sécurité de toute API.",
      },
      {
        kind: "command",
        label: "Vérifier le 403 (non autorisé)",
        command: "curl -i http://127.0.0.1:8000/admin/users -H \"Authorization: Bearer <TOKEN_UTILISATEUR>\"",
        why: "Avec un token valide mais sans le rôle requis, la réponse doit être `403`. Ce test détecte les routes où l'autorisation a été oubliée.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "mots-de-passe-politique",
    title: "Politique de mots de passe",
    level: 3,
    intro: "Ce qui rend vraiment un mot de passe sûr : longueur d'abord, règles absurdes jamais.",
    blocks: [
      {
        kind: "list",
        items: [
          "Longueur > complexité : 12 caractères minimum ; une phrase de passe bat `P@ssw0rd!`.",
          "Abandonnez les règles contre-productives : rotation forcée tous les 90 jours, caractères spéciaux obligatoires — elles produisent des mots de passe faibles et prévisibles.",
          "Vérifiez contre les fuites connues : refusez les mots de passe présents dans les breaches (listes publiques, API k-anonymity).",
          "Ne limitez pas la longueur par le bas de façon absurde : acceptez 64+ caractères (les gestionnaires de mots de passe en génèrent).",
          "Comptez avec bcrypt : tronqué à 72 octets — pré-hachez en SHA-256 si vous acceptez des phrases très longues.",
        ],
      },
    ],
  },
  {
    id: "argon2-bcrypt",
    title: "Argon2 vs bcrypt",
    level: 3,
    intro: "Choisir l'algorithme de hachage : lent en CPU et en mémoire.",
    blocks: [
      {
        kind: "table",
        headers: ["", "bcrypt", "Argon2id"],
        rows: [
          ["Statut", "Éprouvé depuis 1999", "Gagnant du Password Hashing Competition"],
          ["Résistance", "CPU", "CPU + mémoire (anti-GPU/ASIC)"],
          ["Limite", "72 octets d'entrée", "Aucune limite pratique"],
          ["Écosystème", "Partout", "Bibliothèques matures (argon2-cffi)"],
        ],
      },
      {
        kind: "text",
        text: "Les deux sont de bons choix ; Argon2id est la recommandation moderne (résistance mémoire). L'essentiel : un algorithme adaptatif (facteur de coût réglable), jamais MD5/SHA-1/SHA-256 seuls — trop rapides, donc brute-forçables par milliards d'essais/seconde.",
      },
    ],
  },
  {
    id: "sessions-serveur",
    title: "Sessions côté serveur",
    level: 3,
    intro: "Stocker les sessions : mémoire, base, ou Redis — avec leurs compromis.",
    blocks: [
      {
        kind: "fields",
        title: "Options de stockage",
        fields: [
          {
            label: "Mémoire applicative",
            value:
              "Simple, mais perdue au redémarrage et non partagée entre instances — inutilisable en multi-serveurs.",
          },
          {
            label: "Base de données",
            value:
              "Persistante et partagée, mais une requête par appel authentifié — acceptable avec index sur l'id.",
          },
          {
            label: "Redis",
            value:
              "Le standard : rapide, partagé, expiration native (TTL). La session expire toute seule.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Identifiant de session : 32 octets aléatoires minimum (`secrets.token_hex(32)`), imprévisible.",
          "Régénérez l'id à la connexion (anti-fixation de session) et à l'élévation de privilèges.",
          "Expiration : absolue (8 h) + glissante (30 min d'inactivité) pour les sessions sensibles.",
        ],
      },
    ],
  },
  {
    id: "csrf",
    title: "CSRF : la faille des cookies",
    level: 3,
    intro: "Le navigateur envoie les cookies tout seul : s'en protéger quand on utilise des cookies.",
    blocks: [
      {
        kind: "text",
        text: "Attaque : un site malveillant fait soumettre un formulaire vers votre API ; le navigateur joint le cookie de session — le serveur croit à une action légitime. Les tokens `Authorization` ne sont pas concernés (le navigateur ne les envoie pas tout seul).",
      },
      {
        kind: "list",
        items: [
          "`SameSite=Lax/Strict` : première barrière — le cookie n'est pas envoyé depuis un site tiers.",
          "Token anti-CSRF : valeur aléatoire en cookie + en-tête/formulaire, comparés côté serveur, pour les actions sensibles.",
          "Vérifiez `Origin`/`Referer` sur les requêtes state-changing quand SameSite ne suffit pas.",
          "Ne jamais accepter de GET qui modifie des données : le CSRF adore les liens piégés.",
        ],
      },
    ],
  },
  {
    id: "xss-impact",
    title: "XSS et vol d'identifiants",
    level: 3,
    intro: "Un script injecté dans la page : ce qu'il peut voler selon votre stockage.",
    blocks: [
      {
        kind: "table",
        headers: ["Stockage du token", "XSS peut le voler ?", "Défense"],
        rows: [
          ["Cookie HttpOnly", "Non (invisible en JS)", "HttpOnly + CSP stricte"],
          ["localStorage", "Oui, trivialement", "À éviter pour les tokens"],
          ["Mémoire JS", "Oui, mais disparaît au rechargement", "Moins pire que localStorage"],
        ],
      },
      {
        kind: "text",
        text: "Conséquence directe : préférez les cookies `HttpOnly` aux tokens en `localStorage`. Et traitez la cause : Content Security Policy stricte, échappement systématique, frameworks qui échappent par défaut.",
      },
    ],
  },
  {
    id: "jwt-structure",
    title: "Anatomie d'un JWT",
    level: 3,
    intro: "Header, payload, signature : comprendre ce qui est signé et ce qui ne l'est pas.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Décoder un JWT (sans vérifier)",
        code: "# Un JWT = base64(header).base64(payload).signature\nTOKEN=\"eyJhbGciOi...\"\necho \"$TOKEN\" | cut -d. -f2 | base64 -d 2>/dev/null | python3 -m json.tool",
      },
      {
        kind: "list",
        items: [
          "Le payload est lisible par tous (base64, pas chiffré) : jamais de donnée sensible dedans.",
          "Seule la signature garantit l'intégrité : vérifiez-la toujours, avec l'algorithme attendu explicite.",
          "Attaque `alg=none` : refusez tout token sans signature ; imposez la liste des algorithmes acceptés.",
          "Attaque par confusion de clé : ne mélangez jamais clés symétriques (HS256) et asymétriques (RS256) sur le même vérificateur.",
        ],
      },
    ],
  },
  {
    id: "jwt-avance",
    title: "JWT : durées de vie et refresh",
    level: 3,
    intro: "Concilier sécurité et UX : access courts, refresh révocables.",
    blocks: [
      {
        kind: "list",
        items: [
          "Access token court (5–15 min) : le vol a une fenêtre d'exploitation réduite.",
          "Refresh token long (jours/semaines), stocké en cookie HttpOnly, révocable (liste côté serveur).",
          "Rotation : chaque usage du refresh token en émet un nouveau et invalide l'ancien — le vol se détecte (réutilisation = alerte).",
          "Ne mettez jamais de permissions fines dans le JWT : elles changent, le token est figé jusqu'à expiration.",
        ],
      },
      {
        kind: "diagram",
        title: "Cycle de vie",
        lines: [
          "LOGIN ──► access (15 min) + refresh (7 j, HttpOnly)",
          "  │",
          "  ├──► API : Authorization: Bearer <access>",
          "  │",
          "  └──► access expiré ──► POST /refresh ──► nouvel access",
          "                         (rotation du refresh)",
        ],
      },
    ],
  },
  {
    id: "revocation",
    title: "Révocation des tokens",
    level: 3,
    intro: "Le point faible des JWT : comment déconnecter vraiment quelqu'un.",
    blocks: [
      {
        kind: "list",
        items: [
          "Problème : un JWT est valide jusqu'à son `exp`, même après « déconnexion » — le serveur ne garde rien.",
          "Solution simple : access tokens très courts + refresh révocables — la déconnexion révoque le refresh.",
          "Denylist : stocker les `jti` (identifiants de token) révoqués en Redis avec TTL = durée restante.",
          "Changement de mot de passe / élévation : invalidez tous les refresh de l'utilisateur.",
        ],
      },
    ],
  },
  {
    id: "oauth2-flows",
    title: "OAuth 2.0 : les flux",
    level: 3,
    intro: "Quel flux pour quel client : le choix détermine la sécurité.",
    blocks: [
      {
        kind: "table",
        headers: ["Flux", "Client", "Note"],
        rows: [
          ["Authorization Code + PKCE", "SPA, mobile, web", "Le standard moderne — toujours avec PKCE"],
          ["Authorization Code (secret)", "Serveur web classique", "Échange sécurisé par client_secret"],
          ["Client Credentials", "Machine à machine", "Pas d'utilisateur, scopes limités"],
          ["Implicit (déprécié)", "—", "Ne plus utiliser : token dans l'URL"],
          ["Password (déprécié)", "—", "Ne plus utiliser : voit le mot de passe"],
        ],
      },
      {
        kind: "text",
        text: "PKCE (Proof Key for Code Exchange) protège l'échange du code contre l'interception — obligatoire pour les clients publics (SPA, mobile) qui ne peuvent pas garder un secret. `state` anti-CSRF sur la redirection initiale : toujours.",
      },
    ],
  },
  {
    id: "oidc",
    title: "OpenID Connect",
    level: 3,
    intro: "OAuth 2.0 dit « puis-je accéder ? », OIDC ajoute « qui est-ce ? ».",
    blocks: [
      {
        kind: "list",
        items: [
          "`id_token` (JWT) : identité vérifiée — `sub` stable, `iss`, `aud` (votre client_id), `exp`.",
          "Vérifiez `aud` et `iss` : un token émis pour une autre application doit être rejeté.",
          "Récupérez les clés publiques via le `jwks_uri` du discovery document (`/.well-known/openid-configuration`).",
          "Ne faites jamais confiance au profil sans vérifier la signature de l'`id_token`.",
        ],
      },
      {
        kind: "command",
        label: "Découvrir la configuration OIDC d'un fournisseur",
        command: "curl https://accounts.google.com/.well-known/openid-configuration | python3 -m json.tool | head -30",
        why: "Le discovery document expose les endpoints (authorization, token, jwks) : c'est ainsi qu'un client OIDC se configure sans URL codée en dur.",
      },
    ],
  },
  {
    id: "scopes",
    title: "Scopes OAuth",
    level: 3,
    intro: "Le principe du moindre privilège appliqué aux tokens : demander peu, vérifier toujours.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un scope = une permission (`read:articles`, `write:profile`) demandée à l'utilisateur au consentement.",
          "Demandez le minimum : chaque scope élargit l'impact d'un token volé.",
          "Vérifiez les scopes côté API à chaque requête, pas seulement à l'émission.",
          "Scopes granulaires > rôle unique dans le token : ils survivent aux changements de rôle.",
        ],
      },
    ],
  },
  {
    id: "2fa-totp",
    title: "2FA avec TOTP",
    level: 3,
    intro: "Le deuxième facteur : un code à usage unique basé sur le temps.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "TOTP avec pyotp",
        code: "import pyotp\n\n# À l'activation : secret stocké chiffré, QR affiché une fois\nsecret = pyotp.random_base32()\nuri = pyotp.totp.TOTP(secret).provisioning_uri(\n    name=\"user@exemple.com\", issuer_name=\"MonApp\")\n\n# À la connexion (après le mot de passe) :\ntotp = pyotp.TOTP(secret)\nok = totp.verify(code_saisi, valid_window=1)  # ±30 s de tolérance",
      },
      {
        kind: "list",
        items: [
          "Toujours après le mot de passe : deux étapes, pas deux options.",
          "Codes de secours à usage unique (stockés hachés) pour la perte du téléphone.",
          "Limitez les essais TOTP (anti brute-force sur 6 chiffres) : quelques tentatives puis verrouillage temporaire.",
        ],
      },
    ],
  },
  {
    id: "webauthn",
    title: "WebAuthn / Passkeys",
    level: 3,
    intro: "L'authentification sans mot de passe : résistante au phishing par construction.",
    blocks: [
      {
        kind: "list",
        items: [
          "Principe : clé cryptographique liée au domaine — un faux site ne peut pas la réutiliser (anti-phishing natif).",
          "UX : empreinte, visage, ou clé de sécurité — pas de mot de passe à retenir ni à fuir.",
          "Conservez un second moyen (TOTP, codes de secours) : la perte d'appareil arrive.",
          "État de l'art : support natif navigateurs et OS — à proposer en option, pas en remplacement brutal.",
        ],
      },
    ],
  },
  {
    id: "secrets",
    title: "Gestion des secrets",
    level: 3,
    intro: "Les secrets vivent hors du code : génération, stockage, rotation.",
    blocks: [
      {
        kind: "command",
        label: "Générer tous les secrets nécessaires",
        command: "openssl rand -hex 32 && openssl rand -base64 48",
        why: "Deux formats courants : hexadécimal pour les clés de signature, base64 pour les secrets compacts. Chaque secret est unique par environnement (dev, staging, prod).",
      },
      {
        kind: "list",
        items: [
          "Variables d'environnement en local (`.env` non committé), gestionnaire de secrets en production (Vault, AWS Secrets Manager, variables de la plateforme).",
          "Jamais dans le dépôt, les logs, les URL, ou les images Docker en clair.",
          "Rotation : prévoyez-la (double clé active pendant la transition) avant la fuite, pas après.",
          "En cas de fuite : révoquez, régénérez, invalidez les tokens signés avec l'ancien secret.",
        ],
      },
    ],
  },
  {
    id: "https-tls",
    title: "HTTPS / TLS",
    level: 3,
    intro: "Sans TLS, toute l'auth est lisible : le chiffrement du transport n'est pas optionnel.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier le certificat d'un site",
        command: "openssl s_client -connect exemple.com:443 -servername exemple.com </dev/null 2>/dev/null | openssl x509 -noout -subject -dates",
        why: "Vérifie le sujet et les dates de validité du certificat présenté : un certificat expiré ou pour un autre domaine explique les erreurs TLS.",
      },
      {
        kind: "list",
        items: [
          "HSTS : force le HTTPS côté navigateur (`Strict-Transport-Security`), contre le downgrade.",
          "Cookies `Secure` : jamais transmis en clair — mais seulement si tout le site est en HTTPS.",
          "En développement : certificats locaux de confiance (mkcert) pour tester le `Secure` en conditions réelles.",
        ],
      },
    ],
  },
  {
    id: "headers-securite",
    title: "En-têtes de sécurité",
    level: 3,
    intro: "Quelques en-têtes qui ferment des classes entières d'attaques.",
    blocks: [
      {
        kind: "table",
        headers: ["En-tête", "Effet"],
        rows: [
          ["Strict-Transport-Security", "Force HTTPS (HSTS)"],
          ["Content-Security-Policy", "Limite les sources de scripts (anti-XSS)"],
          ["X-Content-Type-Options: nosniff", "Empêche le sniffing de type MIME"],
          ["Referrer-Policy", "Limite les infos envoyées dans Referer"],
          ["Permissions-Policy", "Désactive les API navigateur inutiles"],
        ],
      },
      {
        kind: "text",
        text: "Appliquez-les au niveau du reverse proxy ou via un middleware : une fois configurés, ils protègent toutes les routes. La CSP demande un réglage fin (nonce ou hashes pour les scripts inline) — commencez en mode rapport (`Content-Security-Policy-Report-Only`).",
      },
    ],
  },
  {
    id: "rate-limiting-auth",
    title: "Rate limiting sur l'auth",
    level: 3,
    intro: "Les endpoints d'auth sont la cible n°1 : les protéger spécifiquement.",
    blocks: [
      {
        kind: "list",
        items: [
          "Quotas stricts : 5–10 tentatives/minute par IP sur `/login`, `/register`, `/reset-password`.",
          "Réponse identique que l'utilisateur existe ou non (« si ce compte existe, un email a été envoyé ») — anti-énumération.",
          "Backoff progressif : délai croissant après chaque échec, verrouillage temporaire après N échecs.",
          "Ne révélez jamais « mot de passe incorrect » vs « utilisateur inconnu » : un message unique.",
        ],
      },
    ],
  },
  {
    id: "reset-password",
    title: "Réinitialisation du mot de passe",
    level: 3,
    intro: "Le flux le plus attaqué après le login : tokens à usage unique, courte durée.",
    blocks: [
      {
        kind: "list",
        items: [
          "Token aléatoire (32 octets), à usage unique, expiration courte (15–60 min), stocké haché.",
          "Lien envoyé par email ; le token n'apparaît jamais dans les logs.",
          "Après réinitialisation : invalidez toutes les sessions existantes de l'utilisateur.",
          "Message neutre : « si ce compte existe… » — comme pour l'inscription.",
          "Ne permettez pas de « deviner » l'email : le flux ne confirme ni n'infirme l'existence du compte.",
        ],
      },
    ],
  },
  {
    id: "idor",
    title: "IDOR : le contrôle d'accès oublié",
    level: 3,
    intro: "Insecure Direct Object Reference : l'attaque la plus simple, la faille la plus fréquente.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Vulnérable vs corrigé",
        code: "# ❌ VULNÉRABLE : n'importe quel utilisateur authentifié lit tout\n@app.get(\"/invoices/{invoice_id}\")\ndef get_invoice(invoice_id: int, user=Depends(get_current_user)):\n    return db.get_invoice(invoice_id)\n\n# ✅ CORRIGÉ : vérification de propriété\n@app.get(\"/invoices/{invoice_id}\")\ndef get_invoice(invoice_id: int, user=Depends(get_current_user)):\n    invoice = db.get_invoice(invoice_id)\n    if invoice.owner_id != user.id:\n        raise HTTPException(404)  # 404 plutôt que 403 : ne pas révéler l'existence\n    return invoice",
      },
      {
        kind: "text",
        text: "Test systématique : avec le token de l'utilisateur A, accédez aux ressources de l'utilisateur B (en changeant l'id dans l'URL). Chaque objet retourné doit appartenir à l'appelant ou être autorisé par son rôle.",
      },
    ],
  },
  {
    id: "permissions-fines",
    title: "Permissions fines et ABAC",
    level: 3,
    intro: "Quand les rôles ne suffisent plus : attributs et politiques.",
    blocks: [
      {
        kind: "list",
        items: [
          "RBAC : rôles → permissions. Simple, suffit à 80 % des applications.",
          "ABAC : décisions sur attributs (utilisateur, ressource, contexte : « l'auteur peut modifier si brouillon »).",
          "Ne codez pas les règles en dur dans chaque route : centralisez (dépendances, décorateurs, couche de politiques).",
          "Testez la matrice : chaque rôle × chaque action sensible — un tableau, pas de la mémoire.",
        ],
      },
    ],
  },
  {
    id: "audit-logs",
    title: "Journaux d'audit",
    level: 3,
    intro: "Qui a fait quoi, quand : la traçabilité des actions sensibles.",
    blocks: [
      {
        kind: "list",
        items: [
          "Journalisez : connexions (réussies et échouées), changements de mot de passe, élévations de rôle, accès aux données sensibles.",
          "Chaque entrée : horodatage, acteur, action, cible, IP, résultat — immuable (append-only).",
          "Séparez les logs d'audit des logs applicatifs : conservation plus longue, accès restreint.",
          "Alertez sur les anomalies : connexions depuis un pays inhabituel, pics d'échecs, élévations en cascade.",
        ],
      },
    ],
  },
  {
    id: "owasp-top10",
    title: "OWASP Top 10 appliqué à l'auth",
    level: 3,
    intro: "Les risques OWASP qui concernent directement l'authentification.",
    blocks: [
      {
        kind: "fields",
        title: "Risques clés",
        fields: [
          {
            label: "Broken Access Control",
            value:
              "N°1 du Top 10 : IDOR, élévation de privilèges, CORS permissif. Défense : vérification systématique, tests par rôle.",
          },
          {
            label: "Cryptographic Failures",
            value:
              "Mots de passe en clair, TLS absent, anciens algos. Défense : bcrypt/Argon2, HTTPS partout, secrets hors du code.",
          },
          {
            label: "Identification and Authentication Failures",
            value:
              "Brute-force, credential stuffing, sessions faibles. Défense : rate limiting, 2FA, sessions robustes.",
          },
          {
            label: "Security Logging Failures",
            value:
              "Attaques invisibles faute de logs. Défense : audit des accès, alertes sur anomalies.",
          },
        ],
      },
      {
        kind: "text",
        text: "Référence : https://owasp.org/Top10/2025/ — à parcourir avant chaque mise en production exposant de l'authentification.",
      },
    ],
  },
  {
    id: "testing-auth",
    title: "Tester l'authentification",
    level: 3,
    intro: "L'auth se teste comme le reste : scénarios nominaux et attaques simulées.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Scénarios de test",
        code: "def test_login_wrong_password():\n    res = client.post(\"/login\", json={\"email\": E, \"password\": \"faux\"})\n    assert res.status_code == 401\n\ndef test_cannot_read_other_user():\n    token_b = login_as(\"b@exemple.com\")\n    res = client.get(f\"/users/{user_a_id}\", headers=auth(token_b))\n    assert res.status_code in (403, 404)\n\ndef test_expired_token_rejected():\n    res = client.get(\"/me\", headers=auth(expired_token()))\n    assert res.status_code == 401",
      },
      {
        kind: "list",
        items: [
          "Matrice des accès : chaque route × {sans token, token valide, token d'autrui, token expiré}.",
          "Fuzzing léger : tokens malformés, signatures modifiées, `alg=none` — tous rejetés.",
          "Tests de rate limiting : N+1 tentatives rapides → 429.",
        ],
      },
    ],
  },
  {
    id: "sessions-vs-jwt",
    title: "Sessions vs JWT : décider",
    level: 3,
    intro: "Le choix dépend de l'architecture, pas de la mode.",
    blocks: [
      {
        kind: "table",
        headers: ["Critère", "Sessions (cookies)", "JWT (Bearer)"],
        rows: [
          ["Révocation", "Immédiate (suppression)", "Difficile (délais courts)"],
          ["État serveur", "Oui (stockage)", "Non (stateless)"],
          ["CSRF", "À protéger", "Non concerné"],
          ["XSS", "Protégé (HttpOnly)", "Exposé si localStorage"],
          ["Mobile / multi-clients", "Possible (cookies)", "Naturel"],
          ["Idéal pour", "Applications web classiques", "API multi-clients, microservices"],
        ],
      },
      {
        kind: "text",
        text: "Règle simple : application web monolithique → sessions ; API consommée par plusieurs clients → JWT courts + refresh. Les deux exigent HTTPS, rate limiting et une vraie politique de mots de passe.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les pièges classiques de l'authentification.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Mot de passe en clair",
            value:
              "Problem : stocké tel quel « temporairement ». Why : rapidité de dev. Better : bcrypt/Argon2 dès la première ligne — il n'y a pas de « temporaire » en sécurité.",
          },
          {
            label: "JWT sans expiration",
            value:
              "Problem : token valide à vie. Why : éviter le refresh. Better : access courts + refresh révocables.",
          },
          {
            label: "Secret dans le code",
            value:
              "Problem : clé de signature committée. Why : simplicité. Better : variable d'environnement, rotation prévue.",
          },
          {
            label: "401 vs 403 confondus",
            value:
              "Problem : 403 pour « non connecté ». Why : les deux « refusent ». Better : 401 = qui êtes-vous ? 403 = pas le droit.",
          },
          {
            label: "Autorisation oubliée",
            value:
              "Problem : route authentifiée mais sans contrôle de propriété (IDOR). Why : « l'auth suffit ». Better : vérifier les droits sur chaque objet.",
          },
          {
            label: "Token en localStorage",
            value:
              "Problem : JWT accessible en JS. Why : simplicité SPA. Better : cookie HttpOnly (avec anti-CSRF) ou mémoire + refresh.",
          },
          {
            label: "Messages d'erreur bavards",
            value:
              "Problem : « cet email n'existe pas ». Why : UX. Better : message neutre — l'énumération est une faille.",
          },
          {
            label: "Pas de rate limiting",
            value:
              "Problem : `/login` sans limite. Why : oubli. Better : quotas stricts + backoff sur les endpoints d'auth.",
          },
        ],
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
          "Hachez avec bcrypt/Argon2 : jamais de mot de passe en clair, jamais de hash rapide seul.",
          "Séparez authentification et autorisation : les deux vérifications, sur chaque requête sensible.",
          "Préférez les sessions (web) ou JWT courts + refresh révocables (API).",
          "HTTPS partout, cookies HttpOnly + Secure + SameSite.",
          "Rate limiting agressif sur login, register, reset.",
          "Messages neutres : ne révélez ni l'existence des comptes ni la cause exacte de l'échec.",
          "Journalisez et alertez : connexions, échecs, élévations.",
          "Relisez l'OWASP Top 10 avant chaque mise en production.",
        ],
      },
      {
        kind: "text",
        text: "Contexte : un prototype interne peut se contenter de sessions simples ; une application exposée publiquement exige la panoplie complète (2FA proposée, rate limiting, audit). La sécurité est proportionnée à l'exposition.",
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
            label: "OWASP Top 10",
            value:
              "owasp.org/Top10 : les dix risques critiques du web — la lecture préalable à toute auth en production.",
          },
          {
            label: "OAuth 2.0 et OIDC",
            value:
              "oauth.net/2 et openid.net : spécifications, flux, bonnes pratiques des standards.",
          },
          {
            label: "MDN — Cookies et sécurité web",
            value:
              "developer.mozilla.org : attributs des cookies, CSP, HSTS — les mécanismes navigateur.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "RFC 6749 (OAuth 2.0) et RFC 7519 (JWT) : les textes de référence quand la doc ne suffit plus.",
          "Pratique : auditez votre propre API avec la matrice des accès (chaque route × chaque rôle).",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "L'authentification maîtrisée, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Construire l'API : concevoir des routes REST propres et protégées — voir la compétence `api-rest`.",
          "Persister les utilisateurs : modélisation SQL et migrations — voir la compétence `sql`.",
          "Tester l'authentification : scénarios nominaux et attaques — voir la compétence `testing-api`.",
          "Mettre en cache les sessions : Redis pour les sessions et le rate limiting — voir la compétence `caching`.",
          "Revenir à la roadmap : valider Auth et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

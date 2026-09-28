import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de l'OWASP Top 10 : le référentiel des risques web,
 * catégorie par catégorie, de la compréhension à l'audit. 3 niveaux
 * d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Note : pas de commandes terminal ici — l'OWASP est un référentiel de
 * connaissances et de méthodologies, pas un outil.
 */
export const LEARNING_OWASP: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est l'OWASP Top 10 et pourquoi c'est la référence de la sécurité applicative.",
    blocks: [
      {
        kind: "text",
        text: "L'OWASP Top 10 est le référentiel des dix risques de sécurité les plus critiques pour les applications web, maintenu par la fondation OWASP (Open Web Application Security Project), une organisation à but non lucratif. Ce n'est pas une liste de vulnérabilités précises, mais dix catégories de risques : chacune décrit un type de faille, comment elle s'exploite et comment s'en protéger.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est la référence : l'OWASP Top 10 donne un langage commun aux développeurs, auditeurs et pentesters du monde entier — on parle de « A03 Injection » plutôt que de décrire chaque faille. C'est la checklist de tout audit de sécurité applicative, la base des exigences de conformité, et le point de départ pour apprendre la sécurité web. L'édition 2021 reste la plus citée dans la documentation et les entretiens ; une édition 2025 a depuis été publiée.",
      },
    ],
  },
  {
    id: "lire-le-top-10",
    title: "Comment lire le Top 10",
    level: 1,
    intro:
      "La structure d'une catégorie : ce que chaque fiche contient et comment l'utiliser.",
    blocks: [
      {
        kind: "diagram",
        title: "Anatomie d'une catégorie OWASP",
        lines: [
          "A0X — Nom de la catégorie",
          "   ├── Description : en quoi consiste le risque",
          "   ├── Exemples d'exploitation : comment un attaquant s'en sert",
          "   ├── Prévention : les contre-mesures recommandées",
          "   └── Références : cheatsheets et exemples de code",
        ],
      },
      {
        kind: "text",
        text: "Chaque catégorie se lit dans les deux sens : côté attaque (comment ça s'exploite — pour comprendre la gravité réelle) et côté défense (comment s'en prémunir — pour coder et configurer correctement). Le Top 10 n'est pas un classement de popularité : l'ordre reflète une combinaison de prévalence, d'exploitabilité et d'impact.",
      },
      {
        kind: "list",
        items: [
          "Le Top 10 couvre les applications web : API, sites, applications mobiles qui appellent des API.",
          "Il ne remplace pas une analyse de risques spécifique à votre contexte — c'est un socle, pas un plafond.",
          "Chaque catégorie renvoie vers des cheatsheets OWASP : des fiches pratiques directement applicables.",
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
      "Ce qu'il faut connaître avant d'étudier le Top 10, et pourquoi.",
    blocks: [
      {
        kind: "fields",
        title: "Les fondations nécessaires",
        fields: [
          {
            label: "Sécurité web (bases)",
            value:
              "Connaître les attaques web courantes dans les grandes lignes : l'OWASP les organise en référentiel actionnable, mais il faut d'abord savoir de quoi on parle.",
          },
          {
            label: "HTTP",
            value:
              "Requêtes, réponses, cookies, sessions : la plupart des failles du Top 10 s'expriment dans ce vocabulaire.",
          },
          {
            label: "Développement web",
            value:
              "Avoir écrit une application (formulaires, base de données, authentification) : les contre-mesures sont des patterns de code, il faut savoir où les placer.",
          },
        ],
      },
    ],
  },
  {
    id: "les-10-categories",
    title: "Les 10 catégories",
    level: 2,
    intro:
      "Vue d'ensemble de l'édition 2021 : les dix risques en une table.",
    blocks: [
      {
        kind: "table",
        headers: ["Code", "Catégorie", "En une phrase"],
        rows: [
          ["A01", "Broken Access Control", "Des utilisateurs accèdent à des ressources ou actions qui ne leur sont pas destinées."],
          ["A02", "Cryptographic Failures", "Des données sensibles exposées par une cryptographie absente, faible ou mal utilisée."],
          ["A03", "Injection", "Des données non fiables interprétées comme du code ou des commandes (SQL, XSS, injection de commandes)."],
          ["A04", "Insecure Design", "Des failles inscrites dans la conception même : contrôles de sécurité manquants ou inefficaces."],
          ["A05", "Security Misconfiguration", "Configurations par défaut, messages d'erreur verbeux, en-têtes permissifs, composants non patchés."],
          ["A06", "Vulnerable Components", "Des bibliothèques et frameworks utilisés avec des vulnérabilités connues."],
          ["A07", "Auth Failures", "Mécanismes d'identification et d'authentification faibles : brute-force, sessions mal gérées."],
          ["A08", "Integrity Failures", "Code et données non vérifiés : mises à jour non signées, désérialisation non sûre, CI/CD compromis."],
          ["A09", "Logging Failures", "Journalisation et supervision insuffisantes : les intrusions passent inaperçues."],
          ["A10", "SSRF", "Le serveur est piégé pour émettre des requêtes vers des cibles choisies par l'attaquant."],
        ],
      },
      {
        kind: "text",
        text: "Les sections suivantes détaillent chaque catégorie : le mécanisme, un exemple concret, et la contre-mesure principale. Lisez-les dans l'ordre — A01 est le risque numéro un pour une raison.",
      },
    ],
  },
  {
    id: "a01-broken-access-control",
    title: "A01 — Broken Access Control",
    level: 2,
    intro:
      "Le risque numéro un : le serveur ne vérifie pas que CET utilisateur peut accéder à CETTE ressource.",
    blocks: [
      {
        kind: "text",
        text: "Le contrôle d'accès cassé, c'est l'écart entre « l'utilisateur est authentifié » et « l'utilisateur a le droit ». Exemple classique (IDOR) : l'URL `/compte/123/factures` affiche les factures de l'utilisateur 123 — en changeant `123` en `124`, on voit celles d'un autre. L'authentification fonctionne, mais personne ne vérifie le « est-ce à lui ? ».",
      },
      {
        kind: "list",
        items: [
          "Vérifier l'autorisation côté serveur, sur chaque objet, à chaque requête — jamais seulement côté client.",
          "Principe du refus par défaut : interdire sauf autorisation explicite.",
          "Ne pas exposer d'identifiants prédictibles quand c'est évitable (UUID plutôt que compteur).",
          "Journaliser les échecs de contrôle d'accès : ce sont des signaux d'attaque.",
        ],
      },
    ],
  },
  {
    id: "a02-cryptographic-failures",
    title: "A02 — Cryptographic Failures",
    level: 2,
    intro:
      "Données sensibles exposées : pas de TLS, mots de passe en clair, crypto maison.",
    blocks: [
      {
        kind: "text",
        text: "Cette catégorie couvre tout ce qui expose des données sensibles par une cryptographie absente ou défaillante : mots de passe stockés en clair ou en MD5, données transmises en HTTP, vieux protocoles TLS, clés codées en dur. La règle d'or : ne jamais inventer sa propre cryptographie — utilisez des algorithmes standards (AES, bcrypt/Argon2 pour les mots de passe) via des bibliothèques éprouvées.",
      },
      {
        kind: "list",
        items: [
          "TLS partout, pas seulement sur le login : tout le trafic, y compris les API internes exposées.",
          "Mots de passe : hachage adaptatif (bcrypt, Argon2), jamais de MD5/SHA-1, jamais en clair.",
          "Chiffrer les données sensibles au repos (bases, sauvegardes).",
          "Ne pas stocker ce dont on n'a pas besoin : la donnée la plus sûre est celle qu'on ne possède pas.",
        ],
      },
    ],
  },
  {
    id: "a03-injection",
    title: "A03 — Injection",
    level: 2,
    intro:
      "La faille historique : des données utilisateur interprétées comme des instructions.",
    blocks: [
      {
        kind: "text",
        text: "L'injection survient quand des données non fiables sont envoyées à un interpréteur comme partie d'une commande : SQL (`' OR '1'='1`), commandes système, ou XSS (du JavaScript injecté dans une page vue par d'autres). Le principe de défense est unique et non négociable : séparer les données du code — requêtes paramétrées, échappement contextuel, validation des entrées.",
      },
      {
        kind: "code",
        language: "python",
        title: "Vulnérable vs corrigé (SQL)",
        code: "# VULNÉRABLE : concaténation\nquery = \"SELECT * FROM users WHERE name = '\" + nom + \"'\"\n\n# CORRIGÉ : requête paramétrée (les données ne sont jamais du code)\ncur.execute(\"SELECT * FROM users WHERE name = ?\", (nom,))",
      },
    ],
  },
  {
    id: "a04-insecure-design",
    title: "A04 — Insecure Design",
    level: 2,
    intro:
      "Quand la faille est dans la conception, pas dans le code.",
    blocks: [
      {
        kind: "text",
        text: "Un design non sûr, c'est une application correctement codée mais mal pensée : pas de limite de tentatives sur le login (brute-force trivial), un workflow de réinitialisation de mot de passe contournable, aucune vérification d'abus sur une API. On ne corrige pas ça avec un patch : il faut des contrôles conçus dès l'architecture — threat modeling, patterns de conception sûrs, limites d'usage.",
      },
      {
        kind: "list",
        items: [
          "Threat modeling : « que peut faire un attaquant avec cette fonctionnalité ? » avant de coder.",
          "Rate limiting sur les fonctions sensibles (login, envoi d'emails, API).",
          "Workflows critiques (paiement, réinitialisation) : états et transitions validés côté serveur.",
        ],
      },
    ],
  },
  {
    id: "a05-security-misconfiguration",
    title: "A05 — Security Misconfiguration",
    level: 2,
    intro:
      "Les réglages par défaut et les oublis : la faille la plus évitable.",
    blocks: [
      {
        kind: "text",
        text: "Comptes par défaut non changés (`admin/admin`), messages d'erreur qui révèlent la stack technique, en-têtes HTTP permissifs, interfaces d'administration exposées, services inutiles activés, correctifs non appliqués. C'est la catégorie du « ça marche en l'état, on verra la sécurité plus tard » — et « plus tard » n'arrive jamais.",
      },
      {
        kind: "list",
        items: [
          "Durcir les configurations : désactiver ce qui ne sert pas, changer tous les secrets par défaut.",
          "Messages d'erreur génériques côté client, détaillés uniquement dans les logs serveur.",
          "En-têtes de sécurité (HSTS, CSP, X-Content-Type-Options) déployés systématiquement.",
          "Processus de patch : inventaire des composants, correctifs appliqués rapidement.",
        ],
      },
    ],
  },
  {
    id: "a06-vulnerable-components",
    title: "A06 — Composants vulnérables",
    level: 2,
    intro:
      "Vos dépendances ont des CVE connues : les connaissez-vous ?",
    blocks: [
      {
        kind: "text",
        text: "Utiliser une bibliothèque avec une vulnérabilité connue et corrigée, c'est offrir la faille avec son mode d'emploi public. Le problème n'est pas d'avoir des dépendances — c'est de ne pas savoir lesquelles, ni dans quelle version. D'où : inventaire continu (SBOM), scan de vulnérabilités automatisé, et politique de mise à jour.",
      },
      {
        kind: "list",
        items: [
          "Scanner les dépendances en CI (`npm audit` et équivalents) avec des seuils bloquants.",
          "Mettre à jour régulièrement par petites touches, pas une fois par an.",
          "Supprimer les dépendances et fonctionnalités inutilisées : moins de surface, moins de risque.",
          "Surveiller les avis de sécurité des composants critiques de votre stack.",
        ],
      },
    ],
  },
  {
    id: "a07-auth-failures",
    title: "A07 — Identification et authentification",
    level: 2,
    intro:
      "Logins faibles, sessions mal gérées : la porte d'entrée classique.",
    blocks: [
      {
        kind: "text",
        text: "Mots de passe faibles autorisés, absence de protection contre le brute-force (credential stuffing), sessions qui n'expirent pas, tokens prévisibles, réinitialisation de mot de passe fragile. L'authentification est la fonction de sécurité la plus attaquée : elle mérite les contrôles les plus stricts.",
      },
      {
        kind: "list",
        items: [
          "MFA (multi-facteur) sur les comptes sensibles — la défense la plus efficace contre le vol d'identifiants.",
          "Rate limiting et verrouillage progressif contre le brute-force.",
          "Sessions : identifiants aléatoires, expiration, invalidation à la déconnexion et au changement de mot de passe.",
          "Politique de mots de passe réaliste : longueur plutôt que complexité absurde, vérification contre les listes de mots de passe compromis.",
        ],
      },
    ],
  },
  {
    id: "a08-integrity-failures",
    title: "A08 — Intégrité logicielle et données",
    level: 2,
    intro:
      "Faire confiance à du code ou des données sans vérifier leur intégrité.",
    blocks: [
      {
        kind: "text",
        text: "Mises à jour logicielles non signées, désérialisation d'objets non fiables (qui peut exécuter du code), pipeline CI/CD compromis qui injecte du code malveillant dans vos builds. L'attaque type : on ne pirate pas votre code, on pirate ce en quoi votre code a confiance.",
      },
      {
        kind: "list",
        items: [
          "Signer et vérifier les artefacts (releases, mises à jour, images de conteneurs).",
          "Ne jamais désérialiser des données non fiables avec des mécanismes puissants (pickle, désérialisation Java/PHP native).",
          "Sécuriser la CI/CD comme la production : c'est une cible de choix.",
          "Vérifier l'intégrité des dépendances (hashes, lockfiles).",
        ],
      },
    ],
  },
  {
    id: "a09-logging-failures",
    title: "A09 — Journalisation et supervision",
    level: 2,
    intro:
      "Sans logs, une intrusion reste invisible pendant des mois.",
    blocks: [
      {
        kind: "text",
        text: "La plupart des intrusions ne sont détectées que des mois après, faute de logs exploitables : pas de journal des connexions, des échecs d'authentification, des erreurs applicatives — ou des logs que personne ne lit. Sans visibilité, pas de détection ; sans détection, pas de réponse.",
      },
      {
        kind: "list",
        items: [
          "Journaliser : authentifications (succès/échecs), changements de privilèges, accès aux données sensibles, erreurs.",
          "Centraliser et protéger les logs : un attaquant efface les traces locales.",
          "Alerter sur les signaux forts : rafales d'échecs de login, accès anormaux, pics d'erreurs.",
          "Conserver assez longtemps pour les investigations post-incident.",
        ],
      },
    ],
  },
  {
    id: "a10-ssrf",
    title: "A10 — SSRF",
    level: 2,
    intro:
      "Piéger le serveur pour qu'il requête des cibles internes.",
    blocks: [
      {
        kind: "text",
        text: "En SSRF (Server-Side Request Forgery), l'attaquant fournit une URL que le serveur va chercher : au lieu d'une image publique, il vise `http://169.254.169.254/` (métadonnées cloud, qui peuvent livrer des credentials) ou des services internes inaccessibles depuis internet. Le serveur, lui, a accès au réseau interne — l'attaquant l'utilise comme pivot.",
      },
      {
        kind: "list",
        items: [
          "Valider et filtrer les URLs côté serveur : listes blanches de domaines, blocage des IP privées et des plages réservées.",
          "Désactiver les redirections automatiques sur les requêtes initiées par l'utilisateur.",
          "Segmenter le réseau : le serveur web ne devrait pas atteindre les métadonnées cloud ni les services internes sensibles.",
        ],
      },
    ],
  },
  {
    id: "premier-audit",
    title: "Premier audit guidé",
    level: 2,
    intro:
      "Appliquer le Top 10 sur une application : la méthode pas à pas.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Cartographier",
            detail:
              "Listez les fonctionnalités : authentification, profils, uploads, API, paiements. Chaque fonctionnalité = une surface à tester.",
          },
          {
            title: "Passer la checklist A01→A10",
            detail:
              "Pour chaque catégorie, une question : « où, dans cette app, ce risque pourrait-il se matérialiser ? » Notez les soupçons, pas encore les preuves.",
          },
          {
            title: "Tester les soupçons",
            detail:
              "Vérifiez concrètement : changer un ID dans l'URL (A01), tenter une injection simple (A03), observer les en-têtes (A05). Sur vos propres applications ou des labs prévus pour.",
          },
          {
            title: "Qualifier",
            detail:
              "Pour chaque finding : qu'est-ce qu'un attaquant en fait vraiment ? Une faille sans impact démontré est un bruit ; avec un scénario, c'est un risque.",
          },
          {
            title: "Recommander",
            detail:
              "Une correction concrète par finding, avec sa priorité. « Mettre des requêtes paramétrées » plutôt que « corriger l'injection ».",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "exploitation-a03-exemple",
    title: "A03 : anatomie d'une injection",
    level: 3,
    intro:
      "Comprendre précisément comment une injection SQL s'exploite — pour mesurer la gravité.",
    blocks: [
      {
        kind: "text",
        text: "Avec un login vulnérable qui concatène l'entrée (`... WHERE user = '<entrée>' AND pass = '<entrée>'`), saisir `' OR '1'='1` transforme la requête en `... WHERE user = '' OR '1'='1' AND ...` : la condition est toujours vraie, l'authentification est contournée sans mot de passe. Pire : avec des requêtes empilées, l'attaquant peut lire, modifier ou supprimer des tables entières.",
      },
      {
        kind: "code",
        language: "python",
        title: "Le correctif : requête paramétrée",
        code: "import sqlite3\n\n# Les paramètres (?) sont envoyés séparément : jamais interprétés comme du SQL\ncur.execute(\n    \"SELECT id FROM users WHERE name = ? AND password_hash = ?\",\n    (username, password_hash),\n)",
      },
      {
        kind: "text",
        text: "La requête paramétrée sépare strictement le code des données : la base reçoit le modèle de requête et les valeurs séparément, les valeurs ne sont jamais interprétées. Même principe pour les ORM (qui paramètrent par défaut) et pour l'échappement contextuel en XSS. Retenir : la vulnérabilité n'est pas « l'utilisateur a tapé quelque chose de méchant », c'est « le code a confondu données et instructions ».",
      },
    ],
  },
  {
    id: "xss-en-detail",
    title: "XSS en détail",
    level: 3,
    intro:
      "L'injection côté client : trois variantes, une défense par contexte.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois types de XSS",
        fields: [
          { label: "Stored (stocké)", value: "Le script est sauvegardé (commentaire, profil) puis servi à chaque visiteur. Le plus grave : il touche tous les utilisateurs, durablement." },
          { label: "Reflected (réfléchi)", value: "Le script arrive via l'URL et est renvoyé dans la page. Nécessite de piéger la victime (phishing), mais très courant." },
          { label: "DOM-based", value: "Le script est injecté par le JavaScript côté client lui-même (ex. `innerHTML` avec des données d'URL). Invisible côté serveur." },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Échappement contextuel",
        code: "import html\n\n# Dans du HTML : échapper les caractères spéciaux\nsafe = html.escape(user_input)  # < devient &lt;, etc.\n\n# Dans du JavaScript : ne jamais concaténer, utiliser les APIs sûres\n# element.textContent = userInput  (pas innerHTML)",
      },
      {
        kind: "text",
        text: "La défense dépend du contexte d'insertion : échapper pour HTML ne suffit pas dans un attribut, un style ou du JavaScript. D'où la règle : templates qui échappent par défaut, `textContent` plutôt que `innerHTML`, et Content-Security-Policy en filet de sécurité.",
      },
    ],
  },
  {
    id: "idor-et-controle-acces",
    title: "IDOR et contrôle d'accès",
    level: 3,
    intro:
      "A01 en profondeur : les motifs de contournement et les patterns de défense.",
    blocks: [
      {
        kind: "list",
        items: [
          "IDOR : changer un identifiant d'objet dans l'URL ou l'API pour accéder aux données d'autrui. Test : deux comptes, échanger les IDs.",
          "Élévation horizontale (un autre utilisateur) et verticale (un rôle supérieur) : tester les deux.",
          "Forced browsing : accéder directement à une URL « cachée » (/admin) sans passer par l'interface — l'obscurité n'est pas un contrôle.",
          "Méthodes HTTP : un contrôle appliqué sur GET mais pas sur PUT/DELETE.",
          "Défense : vérification d'autorisation au niveau objet, côté serveur, sur chaque endpoint — idéalement centralisée (middleware, voter, policy).",
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Pattern : vérification d'appartenance",
        code: "# AVANT chaque accès à une ressource :\ndef get_invoice(user, invoice_id):\n    inv = db.invoices.get(invoice_id)\n    if inv.owner_id != user.id and not user.is_admin:\n        raise Forbidden()  # 403, pas 404 (ne pas révéler l'existence)\n    return inv",
      },
    ],
  },
  {
    id: "crypto-bonnes-pratiques",
    title: "Cryptographie : bonnes pratiques",
    level: 3,
    intro:
      "A02 en pratique : ce qu'il faut faire — et ne jamais faire.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Hachage de mot de passe correct",
        code: "import hashlib, os\n\n# Dérivation avec sel aléatoire et coût paramétrable (stdlib)\nsalt = os.urandom(16)\nkey = hashlib.scrypt(password.encode(), salt=salt, n=2**14, r=8, p=1)\n# Stocker : identifiant d'algo + paramètres + sel + clé\n\n# En pratique, préférez une bibliothèque dédiée (bcrypt, argon2)\n# qui gère sel, paramètres et format de stockage pour vous.",
      },
      {
        kind: "list",
        items: [
          "Mots de passe : fonction de hachage adaptative (Argon2, bcrypt, scrypt) — jamais MD5, SHA-1 ou SHA-256 simple, trop rapides donc cassables par brute-force.",
          "Transport : TLS 1.2+ partout, HSTS, pas de contenu mixte HTTP/HTTPS.",
          "Stockage : chiffrer les données sensibles au repos (AES-256-GCM via la bibliothèque crypto de votre plateforme).",
          "Clés : jamais en dur dans le code — gestionnaire de secrets, rotation régulière.",
          "Aléatoire : générateur cryptographique (`os.urandom`, `secrets`), jamais `random` pour les tokens.",
        ],
      },
    ],
  },
  {
    id: "auth-et-sessions",
    title: "Authentification et sessions",
    level: 3,
    intro:
      "A07 en profondeur : concevoir un système de session solide.",
    blocks: [
      {
        kind: "fields",
        title: "Les règles des sessions",
        fields: [
          { label: "Identifiants imprévisibles", value: "Tokens de session aléatoires (128 bits minimum) générés par un CSPRNG. Jamais d'ID séquentiel ou dérivé de données utilisateur." },
          { label: "Côté serveur", value: "La session vit côté serveur ; le cookie ne contient qu'un identifiant opaque. Pas de données sensibles ni de rôles dans le cookie." },
          { label: "Cookies sécurisés", value: "`HttpOnly` (inaccessible en JS, anti-XSS), `Secure` (HTTPS uniquement), `SameSite=Lax/Strict` (anti-CSRF)." },
          { label: "Expiration", value: "Timeout d'inactivité + durée de vie absolue. Régénérer l'ID à la connexion (anti-fixation de session)." },
          { label: "Déconnexion réelle", value: "Invalider côté serveur. Une déconnexion qui n'efface que le cookie laisse la session réutilisable." },
        ],
      },
    ],
  },
  {
    id: "mfa",
    title: "Authentification multi-facteur",
    level: 3,
    intro:
      "Pourquoi le MFA est la défense la plus rentable contre le vol d'identifiants.",
    blocks: [
      {
        kind: "text",
        text: "Le phishing et les fuites de mots de passe rendent le seul mot de passe insuffisant : le MFA exige un second facteur (application d'authentification TOTP, clé matérielle FIDO2, SMS en dernier recours). Même avec le mot de passe volé, l'attaquant est bloqué. Hiérarchie des facteurs : clé matérielle (résiste au phishing) > application TOTP > SMS (vulnérable au SIM-swapping, à éviter si possible).",
      },
      {
        kind: "list",
        items: [
          "Imposez le MFA aux comptes à privilèges (admin, déploiement) en priorité.",
          "Prévoyez les codes de secours et une procédure de récupération — sinon le MFA devient un déni de service contre vos propres utilisateurs.",
          "Ne rendez pas le second facteur contournable par une question secrète faible.",
        ],
      },
    ],
  },
  {
    id: "csrf",
    title: "CSRF",
    level: 3,
    intro:
      "Le cousin de l'authentification : forger des requêtes au nom de la victime.",
    blocks: [
      {
        kind: "text",
        text: "En CSRF, l'attaquant fait exécuter à la victime une action sur un site où elle est connectée (un formulaire piégé qui POSTe un virement). Le navigateur envoie les cookies automatiquement — le serveur ne distingue pas la requête légitime de la forgée. Défense : tokens CSRF imprévisibles vérifiés côté serveur, cookies `SameSite`, et vérification de l'origine sur les actions sensibles.",
      },
    ],
  },
  {
    id: "csp-et-headers",
    title: "CSP et en-têtes de sécurité",
    level: 3,
    intro:
      "A05 en pratique : les en-têtes qui durcissent chaque réponse.",
    blocks: [
      {
        kind: "fields",
        title: "Les en-têtes",
        fields: [
          { label: "`Content-Security-Policy`", value: "Déclare les sources autorisées de scripts, styles, images. `script-src 'self'` bloque les scripts inline et les XSS qui en dépendent. Le plus puissant, à régler progressivement (mode report-only d'abord)." },
          { label: "`Strict-Transport-Security`", value: "Impose HTTPS au navigateur. `max-age=31536000; includeSubDomains`." },
          { label: "`X-Content-Type-Options: nosniff`", value: "Empêche le navigateur de réinterpréter les types de fichiers." },
          { label: "`X-Frame-Options` / `frame-ancestors`", value: "Anti-clickjacking : contrôle qui peut embarquer vos pages en iframe." },
          { label: "`Referrer-Policy`", value: "Limite les informations envoyées dans le Referer vers les sites tiers." },
        ],
      },
    ],
  },
  {
    id: "gestion-des-erreurs",
    title: "Gestion des erreurs",
    level: 3,
    intro:
      "Ne pas aider l'attaquant : messages génériques dehors, détails dedans.",
    blocks: [
      {
        kind: "list",
        items: [
          "Côté client : messages génériques (« une erreur est survenue », « identifiants invalides » — sans dire si c'est le login ou le mot de passe).",
          "Côté serveur : stack traces complètes dans les logs, jamais dans la réponse HTTP.",
          "Désactiver le mode debug des frameworks en production (pages d'erreur verbeuses = carte du système).",
          "Codes de statut cohérents : un 500 sur « utilisateur inexistant » vs 404 sur « existe » révèle l'existence des comptes.",
        ],
      },
    ],
  },
  {
    id: "dependances-sca",
    title: "SCA : analyser ses dépendances",
    level: 3,
    intro:
      "A06 en pratique : le Software Composition Analysis dans le pipeline.",
    blocks: [
      {
        kind: "list",
        items: [
          "Inventaire : générez un SBOM (Software Bill of Materials) — la liste exacte de tout ce qui est embarqué, dépendances transitives incluses.",
          "Scan continu : chaque build compare l'inventaire aux bases de CVE ; alerte ou blocage selon la sévérité.",
          "Politique : seuils de blocage (ex. critique = bloquant), délais de correction, exceptions documentées et temporaires.",
          "Mise à jour : automatisez les PR de montée de version (dépendances mineures/patch), revue humaine pour les majeures.",
        ],
      },
    ],
  },
  {
    id: "ci-cd-securite",
    title: "Sécuriser la CI/CD",
    level: 3,
    intro:
      "A08 en pratique : votre pipeline est une cible — traitez-le comme la production.",
    blocks: [
      {
        kind: "list",
        items: [
          "Secrets de CI dans le gestionnaire de secrets du fournisseur, jamais dans les fichiers du dépôt ni les logs.",
          "Permissions minimales des tokens de pipeline (pas de token admin global).",
          "Épingler les actions et dépendances de CI par hash, pas par tag mutable.",
          "Environnements de build isolés et éphémères ; artefacts signés avant déploiement.",
          "Revue des changements de pipeline comme du code de production.",
        ],
      },
    ],
  },
  {
    id: "threat-modeling",
    title: "Threat modeling",
    level: 3,
    intro:
      "A04 en méthode : penser comme un attaquant avant de coder.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Dessiner le système",
            detail:
              "Schéma des composants, flux de données et frontières de confiance : où les données entrent, où elles sont stockées, qui y accède.",
          },
          {
            title: "Identifier les menaces",
            detail:
              "Par composant et par flux : usurpation, falsification, répudiation, divulgation, déni de service, élévation de privilèges (mnémotechnique STRIDE).",
          },
          {
            title: "Évaluer",
            detail:
              "Pour chaque menace : probabilité × impact. Concentrez-vous sur les scénarios réalistes à fort impact.",
          },
          {
            title: "Définir les contre-mesures",
            detail:
              "Un contrôle par menace retenue, conçu dans l'architecture — pas ajouté après coup.",
          },
          {
            title: "Suivre",
            detail:
              "Le modèle vit avec le système : le mettre à jour à chaque évolution significative.",
          },
        ],
      },
    ],
  },
  {
    id: "asvs",
    title: "OWASP ASVS",
    level: 3,
    intro:
      "Le standard de vérification : des exigences testables par niveau.",
    blocks: [
      {
        kind: "text",
        text: "L'ASVS (Application Security Verification Standard) décline la sécurité applicative en exigences vérifiables, organisées en trois niveaux : L1 (toutes les applications), L2 (données sensibles — la plupart des apps métier), L3 (haute sécurité : banque, santé, infrastructures critiques). C'est l'outil pour passer du Top 10 (sensibilisation) à un cahier de tests concret : chaque exigence se vérifie par oui/non.",
      },
    ],
  },
  {
    id: "cheatsheets",
    title: "Les Cheat Sheets",
    level: 3,
    intro:
      "Les fiches pratiques OWASP : la sécurité applicable au quotidien.",
    blocks: [
      {
        kind: "text",
        text: "Les Cheat Sheet Series sont des fiches concises par sujet : authentification, gestion des sessions, prévention XSS, prévention SQLi, TLS, logging, etc. Chacune donne le « quoi faire » et le « comment » avec des exemples de code. En pratique : quand vous implémentez une fonctionnalité sensible (login, upload, paiement), ouvrez la cheatsheet correspondante avant de coder — pas après l'audit.",
      },
    ],
  },
  {
    id: "methodologie-wstg",
    title: "Méthodologie WSTG",
    level: 3,
    intro:
      "Le Web Security Testing Guide : tester méthodiquement, pas au hasard.",
    blocks: [
      {
        kind: "text",
        text: "Le WSTG (Web Security Testing Guide) est le guide de test de sécurité web de l'OWASP : il organise les tests par phase (collecte d'informations, gestion de configuration, authentification, autorisation, validation des entrées…) avec pour chacun l'objectif, la méthode et les outils. C'est la trame d'un test d'intrusion web professionnel — et un excellent plan d'auto-évaluation pour les développeurs.",
      },
    ],
  },
  {
    id: "sast",
    title: "SAST : analyse statique",
    level: 3,
    intro:
      "Trouver les failles dans le code sans l'exécuter.",
    blocks: [
      {
        kind: "fields",
        title: "Forces et limites",
        fields: [
          { label: "Ce que ça fait", value: "Analyse le code source (ou le bytecode) à la recherche de patterns vulnérables : concaténation SQL, crypto faible, secrets en dur, XSS potentiels." },
          { label: "Forces", value: "Tôt dans le cycle (dès la PR), couvre tout le code y compris les chemins jamais exécutés en test, localise la ligne fautive." },
          { label: "Limites", value: "Faux positifs (patterns suspects mais sûrs en contexte), aveugle à la configuration et au runtime, ne comprend pas la logique métier." },
          { label: "En pratique", value: "Intégré en CI avec des règles calibrées : trop de bruit et les développeurs l'ignorent. Le SAST signale, l'humain tranche." },
        ],
      },
    ],
  },
  {
    id: "dast",
    title: "DAST : analyse dynamique",
    level: 3,
    intro:
      "Tester l'application qui tourne, comme un attaquant.",
    blocks: [
      {
        kind: "fields",
        title: "Forces et limites",
        fields: [
          { label: "Ce que ça fait", value: "Envoie des requêtes à l'application déployée (staging) et analyse les réponses : injections, XSS, mauvaises configurations, en-têtes manquants." },
          { label: "Forces", value: "Teste le système réel assemblé (code + config + infra), trouve ce que le SAST ne voit pas (A05, A07 runtime)." },
          { label: "Limites", value: "Couverture partielle (ne voit que ce qu'il arrive à atteindre), lent, nécessite une cible dédiée — jamais la production." },
          { label: "En pratique", value: "SAST en CI sur chaque PR, DAST planifié sur l'environnement de staging : les deux sont complémentaires, pas interchangeables." },
        ],
      },
    ],
  },
  {
    id: "gestion-des-secrets",
    title: "Gestion des secrets",
    level: 3,
    intro:
      "Clés API, mots de passe, tokens : ne jamais les laisser traîner.",
    blocks: [
      {
        kind: "list",
        items: [
          "Jamais de secret dans le code, les fichiers de config versionnés, les logs ou les URLs.",
          "Variables d'environnement ou gestionnaire de secrets (fournisseur cloud, Vault) selon la criticité.",
          "Secrets différents par environnement ; rotation régulière, immédiate en cas de suspicion.",
          "Scanner l'historique Git : un secret commité est un secret compromis — le révoquer, pas seulement le supprimer du fichier.",
          "Principe du moindre privilège : chaque secret n'ouvre que ce qui est nécessaire.",
        ],
      },
    ],
  },
  {
    id: "strategie-de-logging",
    title: "Stratégie de journalisation",
    level: 3,
    intro:
      "A09 en pratique : quoi logger, comment, et pour qui.",
    blocks: [
      {
        kind: "table",
        headers: ["Événement", "À logger", "Pourquoi"],
        rows: [
          ["Authentification", "Succès, échecs, verrouillages, réinitialisations", "Détecter le brute-force et les compromissions"],
          ["Autorisation", "Accès refusés, élévations de privilèges", "Détecter les tentatives d'escalade"],
          ["Données sensibles", "Accès et modifications", "Traçabilité et conformité"],
          ["Erreurs", "Exceptions applicatives, 5xx", "Détecter les sondages et les dysfonctionnements"],
          ["Système", "Démarrages, changements de config", "Contexte des investigations"],
        ],
      },
      {
        kind: "text",
        text: "Ne jamais logger : mots de passe, tokens, données personnelles non nécessaires. Formatez en structuré (JSON) avec horodatage synchronisé (NTP) : c'est ce qui rend les logs exploitables par les outils d'analyse et corrélables entre systèmes.",
      },
    ],
  },
  {
    id: "reponse-aux-incidents",
    title: "Réponse aux incidents",
    level: 3,
    intro:
      "Quand la détection fonctionne : le plan avant la panique.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Préparation",
            detail:
              "Plan écrit, rôles définis, contacts (hébergeur, prestataires) à jour. Testé par exercice, pas découvert le jour J.",
          },
          {
            title: "Détection et analyse",
            detail:
              "Qualifier l'alerte : vrai incident ou faux positif ? Périmètre : quels systèmes, quelles données ?",
          },
          {
            title: "Confinement",
            detail:
              "Isoler sans détruire les preuves : couper l'accès, figer les logs, préserver les images disque si nécessaire.",
          },
          {
            title: "Éradication et reprise",
            detail:
              "Supprimer la cause (patch, credentials révoquées), restaurer depuis des sauvegardes saines, remettre en service progressivement.",
          },
          {
            title: "Retour d'expérience",
            detail:
              "Chronologie, causes racines, actions correctives. Sans blâme : l'objectif est d'apprendre, pas de punir.",
          },
        ],
      },
    ],
  },
  {
    id: "mitigation-ssrf",
    title: "Mitigation SSRF avancée",
    level: 3,
    intro:
      "A10 en profondeur : pourquoi la validation naïve ne suffit pas.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le piège DNS : valider le nom de domaine ne suffit pas si l'attaquant contrôle le DNS (résolution vers une IP interne au moment de la requête — TOCTOU). Résolvez puis validez l'IP, et utilisez l'IP validée.",
          "Bloquez les plages privées (10/8, 172.16/12, 192.168/16), loopback, link-local (169.254/16 — métadonnées cloud) et les IP « exotiques » (décimal, octal, IPv6 mappée).",
          "Désactivez les redirections sur les fetches serveur, ou re-validez chaque étape de redirection.",
          "Architecture : un proxy de sortie (egress) avec allowlist est plus robuste que des validations dispersées dans le code.",
        ],
      },
    ],
  },
  {
    id: "deserialisation",
    title: "Désérialisation non sûre",
    level: 3,
    intro:
      "A08 en exemple : quand « charger des données » exécute du code.",
    blocks: [
      {
        kind: "text",
        text: "Certains formats de sérialisation (pickle en Python, la sérialisation native Java/PHP) peuvent exécuter du code arbitraire à la désérialisation : un objet piégé devient une exécution de commande. La règle : ne désérialisez jamais des données non fiables avec ces mécanismes. Utilisez des formats données purs (JSON avec validation de schéma) et, si la sérialisation riche est indispensable, signez les payloads et vérifiez la signature avant tout traitement.",
      },
    ],
  },
  {
    id: "rate-limiting",
    title: "Rate limiting",
    level: 3,
    intro:
      "Le contrôle transversal : login, API, et A04/A07 par la même occasion.",
    blocks: [
      {
        kind: "text",
        text: "Limiter le débit des requêtes est une contre-mesure qui touche plusieurs catégories : brute-force sur l'authentification (A07), abus de fonctionnalités coûteuses (A04), scraping. Conception : limites par IP et par compte, réponses en 429 avec en-tête `Retry-After`, seuils différenciés (login strict, API souple), et journalisation des dépassements — un pic de 429 est un signal d'attaque.",
      },
    ],
  },
  {
    id: "secure-headers",
    title: "En-têtes : mise en œuvre",
    level: 3,
    intro:
      "Déployer les en-têtes de sécurité sans casser l'application.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Commencer par les faciles",
            detail:
              "`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` : aucun impact fonctionnel dans la quasi-totalité des cas.",
          },
          {
            title: "Activer HSTS",
            detail:
              "`Strict-Transport-Security` avec un `max-age` progressif (jours puis année), `includeSubDomains` quand tous les sous-domaines sont en HTTPS.",
          },
          {
            title: "CSP en mode rapport",
            detail:
              "`Content-Security-Policy-Report-Only` : collecte les violations sans bloquer. Analysez les rapports, ajustez la politique.",
          },
          {
            title: "Passer en mode bloquant",
            detail:
              "Quand les rapports sont propres, basculez en `Content-Security-Policy` stricte. Surveillez les regressions après chaque déploiement.",
          },
        ],
      },
    ],
  },
  {
    id: "revue-de-code",
    title: "Revue de code sécurité",
    level: 3,
    intro:
      "Relire le code avec des yeux d'attaquant : la checklist.",
    blocks: [
      {
        kind: "list",
        items: [
          "Entrées : toute donnée externe est suspecte — où est-elle validée, échappée, paramétrée ?",
          "Autorisation : chaque endpoint vérifie-t-il l'accès à l'objet demandé, pas seulement l'authentification ?",
          "Secrets : aucun en dur, aucune fuite dans les logs ou les réponses d'erreur ?",
          "Crypto : algorithmes standards, pas de maison, aléatoire cryptographique ?",
          "Dépendances : nouvelles dépendances justifiées, versions sans CVE connues ?",
          "Logs : événements de sécurité journalisés sans données sensibles ?",
        ],
      },
    ],
  },
  {
    id: "rediger-un-rapport",
    title: "Rédiger un rapport d'audit",
    level: 3,
    intro:
      "Une faille non comprise n'est jamais corrigée : structurer les findings.",
    blocks: [
      {
        kind: "fields",
        title: "Structure d'un finding",
        fields: [
          { label: "Titre et catégorie", value: "Ex. « IDOR sur /api/factures/{id} » — A01 Broken Access Control. Le lecteur doit comprendre en une ligne." },
          { label: "Sévérité", value: "Critique/Haute/Moyenne/Basse, justifiée par l'impact : que peut faire concrètement un attaquant ?" },
          { label: "Description", value: "Où, dans quel contexte, avec quel rôle. Suffisamment précis pour reproduire." },
          { label: "Preuve", value: "Requête/réponse, capture : la démonstration, pas l'affirmation." },
          { label: "Impact", value: "Le scénario d'exploitation réaliste : vol de données, prise de compte, déni de service." },
          { label: "Recommandation", value: "La correction concrète, avec si possible un exemple de code ou de configuration." },
        ],
      },
      {
        kind: "text",
        text: "Un bon rapport se lit à deux niveaux : le résumé exécutif (risques, priorités) pour la direction, les findings détaillés pour les développeurs. Adaptez le vocabulaire à chaque audience.",
      },
    ],
  },
  {
    id: "pentest-vs-audit",
    title: "Pentest vs audit de code",
    level: 3,
    intro:
      "Deux approches complémentaires, pas interchangeables.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Audit / revue", "Pentest"],
        rows: [
          ["Point de vue", "Boîte blanche : code et config", "Boîte noire/grise : comme un attaquant"],
          ["Trouve", "Failles logiques, crypto, patterns", "Chaînes d'exploitation réelles, config"],
          ["Prouve", "La présence de faiblesses", "L'exploitabilité concrète"],
          ["Limite", "Peut rater l'assemblage réel", "Couverture partielle, ponctuel"],
        ],
      },
      {
        kind: "text",
        text: "En pratique : revue + SAST en continu pendant le développement, pentest périodique (ou à chaque release majeure) pour valider l'ensemble. L'un sans l'autre laisse un angle mort.",
      },
    ],
  },
  {
    id: "debugging-securite",
    title: "Investiguer un finding",
    level: 3,
    intro:
      "Devant une alerte (scanner, bug bounty) : la méthode de qualification.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Reproduire",
            detail:
              "Refaites le scénario pas à pas dans un environnement de test. Une alerte non reproductible est une alerte non qualifiée.",
          },
          {
            title: "Délimiter",
            detail:
              "Le problème est-il isolé ou systémique ? Même pattern ailleurs dans le code ? Même composant dans d'autres projets ?",
          },
          {
            title: "Évaluer l'impact réel",
            detail:
              "Qu'obtient concrètement un attaquant ? Données, privilèges, persistance ? L'impact décide de la priorité, pas la catégorie.",
          },
          {
            title: "Corriger à la racine",
            detail:
              "Corrigez le pattern, pas l'instance : si une injection existe ici, cherchez les sœurs avant de fermer le ticket.",
          },
          {
            title: "Vérifier",
            detail:
              "Re-testez après correction, et ajoutez un test de non-régression : la faille ne doit pas revenir au prochain refactoring.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les fautes de raisonnement les plus fréquentes en sécurité applicative.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Pourquoi c'est faux", "À la place"],
        rows: [
          ["« C'est validé côté client »", "Le client est contrôlé par l'attaquant", "Valider côté serveur, toujours"],
          ["« L'URL n'est pas devinable »", "L'obscurité n'est pas un contrôle", "Vérifier l'autorisation sur chaque accès"],
          ["« On utilisera HTTPS plus tard »", "« Plus tard » = jamais ; les données circulent en clair entre-temps", "TLS dès le premier déploiement"],
          ["« Notre crypto maison suffit »", "La crypto s'évalue par des années d'analyse, pas par l'ingéniosité", "Algorithmes et bibliothèques standards"],
          ["« Pas de logs, pas de problème »", "Sans visibilité, les intrusions durent des mois", "Journaliser les événements de sécurité"],
          ["« On patchera au prochain sprint »", "Les CVE ont des exploits publics en heures/jours", "Processus de patch avec SLA par sévérité"],
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro:
      "Les principes qui traversent tout le Top 10.",
    blocks: [
      {
        kind: "list",
        items: [
          "Défense en profondeur : plusieurs couches (validation, autorisation, logs) — aucune n'est infaillible seule.",
          "Moindre privilège : chaque composant n'accède qu'au strict nécessaire.",
          "Refus par défaut : interdire sauf autorisation explicite.",
          "Ne jamais faire confiance aux entrées : valider, échapper, paramétrer.",
          "Échouer de manière sûre : en cas d'erreur, refuser l'accès plutôt que l'accorder.",
          "Séparer les données du code, les secrets du code, les environnements entre eux.",
          "Journaliser pour détecter, pas seulement pour déboguer.",
          "Mettre à jour vite : la fenêtre entre la CVE et l'exploit se mesure en jours.",
        ],
      },
    ],
  },
  {
    id: "projet-lab-local",
    title: "Projet : lab vulnérable local",
    level: 3,
    intro:
      "Exploiter puis corriger chaque catégorie sur une application volontairement vulnérable.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir un lab",
            detail:
              "Une application volontairement vulnérable exécutée en local (laboratoire d'entraînement) : l'environnement légal et sûr pour pratiquer.",
          },
          {
            title: "Exploiter une catégorie",
            detail:
              "Prenez A03 : trouvez l'injection, prouvez l'exploitation, documentez la requête et la réponse.",
          },
          {
            title: "Corriger",
            detail:
              "Appliquez la contre-mesure (requête paramétrée), vérifiez que l'exploitation échoue et que la fonctionnalité marche toujours.",
          },
          {
            title: "Répéter pour les 10",
            detail:
              "Une catégorie après l'autre : à la fin, vous avez vu chaque risque des deux côtés — attaque et défense.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-checklist-audit",
    title: "Projet : checklist d'audit",
    level: 3,
    intro:
      "Construire votre propre grille d'audit A01→A10 réutilisable.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Dériver des tests",
            detail:
              "Pour chaque catégorie, écrivez 3 à 5 tests concrets (« tenter X sur l'endpoint Y ») adaptés à votre stack.",
          },
          {
            title: "Tester sur un projet réel",
            detail:
              "Appliquez la grille à une de vos applications (avec autorisation) : notez les findings avec preuves.",
          },
          {
            title: "Prioriser et corriger",
            detail:
              "Classez par impact réel, corrigez, re-testez : la boucle complète.",
          },
          {
            title: "Industrialiser",
            detail:
              "Transformez les tests répétables en checks automatisés (en-têtes, TLS, dépendances) intégrés à la CI.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-pipeline-securite",
    title: "Projet : pipeline de sécurité",
    level: 3,
    intro:
      "SAST + SCA + DAST : la chaîne complète sur un projet pilote.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "SAST sur les PR",
            detail:
              "Analyse statique à chaque pull request, avec un jeu de règles calibré (peu de bruit, zéro tolérance sur le critique).",
          },
          {
            title: "SCA en continu",
            detail:
              "Scan des dépendances à chaque build + job hebdomadaire : inventaire, CVE, politique de seuils.",
          },
          {
            title: "DAST sur staging",
            detail:
              "Scan dynamique planifié contre l'environnement de staging après chaque déploiement.",
          },
          {
            title: "Tableau de bord",
            detail:
              "Centralisez les résultats, suivez la dette de sécurité comme la dette technique : backlog, SLA, responsables.",
          },
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
          { label: "OWASP Top 10", value: "owasp.org/www-project-top-ten : le référentiel, catégorie par catégorie, avec exemples et préventions." },
          { label: "Cheat Sheet Series", value: "Les fiches pratiques par sujet : la sécurité directement applicable au code." },
          { label: "WSTG", value: "owasp.org/www-project-web-security-testing-guide : la méthodologie de test complète." },
          { label: "ASVS", value: "Le standard de vérification : des exigences testables par niveau." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : labs vulnérables locaux pour voir chaque catégorie des deux côtés.",
          "Veille : suivre les publications OWASP et les bulletins de sécurité de votre stack.",
          "Communauté : chapitres OWASP locaux et conférences pour les retours d'expérience.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "OWASP maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Passer à l'offensive : `pentesting` — tester méthodiquement comme un attaquant autorisé.",
          "Approfondir le réseau : `networking` — TCP/IP, TLS, DNS, la couche sous les attaques web.",
          "Durcir les systèmes : `linux` — permissions, services, pare-feu.",
          "Coder sûr par construction : `web-security` — les attaques et défenses web en profondeur.",
          "Revenir à la roadmap : valider OWASP et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

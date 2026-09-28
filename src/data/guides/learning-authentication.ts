import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de l'authentification : vérifier une identité
 * sans introduire de faille. 3 niveaux d'information (Aperçu / Pratique /
 * Approfondi) avec divulgation progressive. Tous les textes supportent le
 * code inline entre backticks. Aucun secret réel n'apparaît dans les exemples.
 */
export const LEARNING_AUTHENTICATION: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est l'authentification, ce qu'elle n'est pas, et pourquoi elle mérite autant d'attention.",
    blocks: [
      {
        kind: "text",
        text: "L'authentification répond à la question « qui êtes-vous ? ». Avant d'accorder l'accès à un compte, à des données ou à une action, l'application doit vérifier l'identité de celui qui frappe à la porte : mot de passe, code reçu par SMS, clé matérielle, empreinte, ou délégation à un tiers de confiance (« se connecter avec Google »).",
      },
      {
        kind: "text",
        text: "Pourquoi c'est critique : la page de connexion est la porte d'entrée de toute application, et donc la première cible des attaquants. Une authentification mal conçue — mots de passe stockés en clair, sessions sans expiration, réinitialisation prévisible — transforme chaque compte utilisateur en faille ouverte. À l'inverse, bien la concevoir, c'est protéger les utilisateurs sans les faire fuir : la sécurité et l'expérience utilisateur se négocient à chaque écran.",
      },
      {
        kind: "list",
        items: [
          "Authentification = vérifier l'identité (« qui êtes-vous ? »).",
          "Autorisation = vérifier les droits (« que pouvez-vous faire ? ») — un sujet distinct qui vient après.",
          "Identification = déclarer qui on prétend être (un login, un email) — l'authentification prouve que c'est vrai.",
        ],
      },
    ],
  },
  {
    id: "authentification-vs-autorisation",
    title: "Authentification vs autorisation",
    level: 1,
    intro:
      "Les deux mots se ressemblent et se confondent souvent. Les distinguer, c'est comprendre l'ordre des opérations.",
    blocks: [
      {
        kind: "diagram",
        title: "L'ordre des vérifications",
        lines: [
          "Utilisateur anonyme",
          "     │",
          "     ▼",
          "1. IDENTIFICATION — « je suis ada@example.com »",
          "     │",
          "     ▼",
          "2. AUTHENTIFICATION — preuve (mot de passe, code, clé)",
          "     │  succès → identité vérifiée",
          "     │  échec  → accès refusé",
          "     ▼",
          "3. AUTORISATION — « que peut faire ada@example.com ? »",
          "     │  (rôles, permissions, propriété des données)",
          "     ▼",
          "Accès accordé ou refusé, action par action",
        ],
      },
      {
        kind: "text",
        text: "Concrètement : se connecter prouve qui vous êtes ; voir le panneau d'administration exige en plus le droit de le voir. Un utilisateur parfaitement authentifié peut très bien ne pas être autorisé à effectuer une action — et c'est normal. Les deux couches se testent séparément.",
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
      "Ce qu'il faut déjà maîtriser avant d'étudier l'authentification sérieusement.",
    blocks: [
      {
        kind: "fields",
        title: "Fondations nécessaires",
        fields: [
          {
            label: "HTTP",
            value:
              "Requêtes, réponses, en-têtes, codes de statut. L'authentification web voyage dans les en-têtes (`Authorization`, `Set-Cookie`) : sans HTTP, les mécanismes restent abstraits.",
          },
          {
            label: "Cookies et formulaires",
            value:
              "Comment un navigateur envoie un formulaire, stocke un cookie et le renvoie. Les sessions reposent entièrement sur ce mécanisme.",
          },
          {
            label: "Bases de données",
            value:
              "Stocker et retrouver un utilisateur, ses identifiants et ses sessions. Voir la page Bases de données.",
          },
          {
            label: "Cryptographie (bases)",
            value:
              "Hachage, chiffrement, signatures : le vocabulaire minimal pour comprendre pourquoi on ne stocke jamais un mot de passe en clair. Voir la page Cryptographie.",
          },
          {
            label: "Sécurité web (bases)",
            value:
              "XSS, CSRF, injections : les attaques classiques visent souvent le système d'authentification en premier. Voir la page Sécurité web.",
          },
        ],
      },
    ],
  },
  {
    id: "bac-a-sable",
    title: "Mettre en place un bac à sable",
    level: 2,
    intro:
      "L'authentification ne s'apprend pas en lisant : il faut un projet local pour expérimenter sans risque.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier l'environnement",
        command: "node --version",
        why: "Les exemples de cette page utilisent Node.js et son module `crypto` intégré : aucune dépendance à installer pour hacher, comparer et signer. Vérifier la version installée avant de commencer.",
        verify: "npm --version",
      },
      {
        kind: "command",
        label: "Créer le dossier de travail",
        command: "mkdir auth-lab && cd auth-lab && npm init -y",
        why: "Un dossier isolé pour tous les essais de cette page : jamais de code d'authentification expérimental dans un vrai projet. `npm init -y` crée un `package.json` par défaut.",
        verify: "ls package.json",
      },
      {
        kind: "text",
        text: "Règle d'or du bac à sable : tout ce qui est produit ici reste local. Pas de vrais mots de passe, pas de vraies clés, pas de déploiement. Les exemples utilisent des valeurs fictives évidentes (`mot-de-passe-test`, `abc123`).",
      },
    ],
  },
  {
    id: "mots-de-passe-realite",
    title: "Les mots de passe : la réalité",
    level: 2,
    intro:
      "Le facteur le plus répandu et le plus faible. Comprendre ses limites avant d'apprendre à le sécuriser.",
    blocks: [
      {
        kind: "text",
        text: "Un mot de passe est un secret partagé : l'utilisateur le connaît, le serveur doit pouvoir le vérifier. Le problème fondamental : les humains choisissent des mots de passe prévisibles, les réutilisent partout, et les bases de données finissent par fuiter. Toute la sécurité des mots de passe consiste à limiter les dégâts quand — pas si — une base fuitera.",
      },
      {
        kind: "list",
        items: [
          "Ne jamais stocker un mot de passe en clair : le stocker haché, salé, avec une fonction lente.",
          "Ne jamais l'envoyer ou le journaliser : ni dans les logs, ni dans les URLs, ni dans les rapports d'erreur.",
          "Ne jamais l'afficher : même à l'utilisateur lui-même, même au support.",
          "Limiter les tentatives : un attaquant qui peut essayer indéfiniment finira par réussir.",
        ],
      },
    ],
  },
  {
    id: "hachage-en-pratique",
    title: "Hacher un mot de passe en pratique",
    level: 2,
    intro:
      "Le geste technique central : transformer un mot de passe en empreinte invérifiable, avec un sel unique.",
    blocks: [
      {
        kind: "text",
        text: "Hacher, c'est appliquer une fonction à sens unique : facile à calculer dans un sens, infaisable à inverser. Le sel — une valeur aléatoire unique par utilisateur — empêche de pré-calculer les empreintes (tables arc-en-ciel) et fait que deux mêmes mots de passe produisent deux empreintes différentes. La fonction doit être lente (scrypt, bcrypt, Argon2) pour que le brute force coûte cher à l'attaquant.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Hachage et vérification avec le module crypto de Node.js",
        code: `import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";\n\n// À l'inscription : on stocke "sel:empreinte", jamais le mot de passe.\nfunction hashPassword(password) {\n  const salt = randomBytes(16).toString("hex");\n  const hash = scryptSync(password, salt, 64).toString("hex");\n  return salt + ":" + hash;\n}\n\n// À la connexion : on recalcule et on compare en temps constant.\nfunction verifyPassword(password, stored) {\n  const [salt, expected] = stored.split(":");\n  const candidate = scryptSync(password, salt, 64).toString("hex");\n  return timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(candidate, "hex"));\n}\n\nconst stored = hashPassword("mot-de-passe-test");\nconsole.log(verifyPassword("mot-de-passe-test", stored)); // true\nconsole.log(verifyPassword("mauvais-mot-de-passe", stored)); // false`,
      },
      {
        kind: "text",
        text: "Points à noter : `randomBytes` génère un sel imprévisible ; `timingSafeEqual` compare sans fuir d'information sur le temps de comparaison ; `scrypt` est volontairement coûteux en mémoire. En production, on utilisera une bibliothèque dédiée et auditée plutôt que d'assembler soi-même ces primitives — le principe reste identique.",
      },
    ],
  },
  {
    id: "sessions-et-cookies",
    title: "Sessions et cookies",
    level: 2,
    intro:
      "Après une connexion réussie, comment le serveur « se souvient » que l'utilisateur est connecté.",
    blocks: [
      {
        kind: "text",
        text: "HTTP est sans état : chaque requête est indépendante. La session résout ce problème : à la connexion, le serveur crée un identifiant de session opaque (aléatoire, imprévisible), le stocke côté serveur avec l'identité de l'utilisateur et une expiration, puis le confie au navigateur dans un cookie. À chaque requête suivante, le navigateur renvoie le cookie et le serveur retrouve la session.",
      },
      {
        kind: "code",
        language: "http",
        title: "Un cookie de session correctement configuré",
        code: `Set-Cookie: session_id=abc123; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=3600`,
      },
      {
        kind: "fields",
        title: "Chaque attribut a un rôle",
        fields: [
          { label: "`HttpOnly`", value: "Le cookie est invisible pour JavaScript : un script XSS volé ne peut pas le lire." },
          { label: "`Secure`", value: "Le cookie ne voyage que sur HTTPS : impossible à intercepter sur le réseau." },
          { label: "`SameSite=Lax`", value: "Le navigateur ne l'envoie pas avec les requêtes cross-site suspectes : protection de base contre le CSRF." },
          { label: "`Max-Age=3600`", value: "Expiration après une heure : une session volée a une durée de vie limitée." },
        ],
      },
    ],
  },
  {
    id: "jwt-en-pratique",
    title: "Les JWT en pratique",
    level: 2,
    intro:
      "L'alternative aux sessions : un jeton auto-porteur que le serveur n'a pas besoin de stocker.",
    blocks: [
      {
        kind: "diagram",
        title: "Anatomie d'un JWT",
        lines: [
          "eyJhbGciOi... . eyJzdWIiOi... . SflKxwRJ...",
          "      │                  │               │",
          "      ▼                  ▼               ▼",
          "  HEADER            PAYLOAD          SIGNATURE",
          "  { alg, typ }      { sub, exp, ... }  HMAC(header.payload, secret)",
          "       └──────── encodés en base64url, séparés par des points ────────┘",
          "Le serveur vérifie la signature : si elle est valide, le contenu",
          "n'a pas été modifié et le jeton est authentique.",
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Lire le contenu d'un jeton (sans le vérifier)",
        code: `// Format uniquement — ceci n'est PAS un vrai jeton.\nconst token = "header.payload.signature";\nconst [headerB64, payloadB64] = token.split(".");\nconst payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString());\nconsole.log(payload.sub); // identifiant de l'utilisateur\nconsole.log(payload.exp); // expiration (timestamp Unix)`,
      },
      {
        kind: "text",
        text: "Point crucial : le payload d'un JWT est lisible par quiconque possède le jeton (simple encodage, pas du chiffrement). On n'y met jamais de donnée sensible — seulement l'identité et les droits nécessaires. La sécurité vient de la signature, vérifiée avec un secret que seul le serveur connaît.",
      },
    ],
  },
  {
    id: "oauth2-parcours",
    title: "OAuth 2.0 : le parcours « Se connecter avec… »",
    level: 2,
    intro:
      "La délégation d'authentification : laisser un provider vérifier l'identité à votre place.",
    blocks: [
      {
        kind: "diagram",
        title: "Authorization Code Flow (le flux standard)",
        lines: [
          "Votre app                Provider (Google, GitHub...)      Utilisateur",
          "    │                              │                           │",
          "    │  1. « Se connecter avec »     │                           │",
          "    │◄─────────────────────────────┤                           │",
          "    │  2. Redirection vers le provider + client_id, scope      │",
          "    │──────────────────────────────►                           │",
          "    │                              │  3. Login + consentement  │",
          "    │                              │◄──────────────────────────┤",
          "    │  4. Redirection retour avec un CODE (usage unique)      │",
          "    │◄──────────────────────────────┤                           │",
          "    │  5. Échange du code contre des JETONS (appel serveur)   │",
          "    │──────────────────────────────►                           │",
          "    │  6. access_token (+ id_token) │                           │",
          "    │◄──────────────────────────────┤                           │",
          "    │  7. Accès aux infos autorisées par le scope             │",
        ],
      },
      {
        kind: "text",
        text: "L'idée clé : votre application ne voit jamais le mot de passe de l'utilisateur. Le provider authentifie, l'utilisateur consent à partager certaines informations (le scope : email, profil…), et votre app reçoit des jetons d'accès limités. Avec PKCE (une preuve cryptographique ajoutée par le client), ce flux est aussi sûr sur mobile et les apps monopages.",
      },
    ],
  },
  {
    id: "mfa-au-quotidien",
    title: "La MFA au quotidien",
    level: 2,
    intro:
      "Ajouter un second facteur : ce que l'utilisateur vit, et ce que le développeur doit prévoir.",
    blocks: [
      {
        kind: "fields",
        title: "Les formes courantes de second facteur",
        fields: [
          {
            label: "Code TOTP (application)",
            value:
              "Un code à 6 chiffres qui change toutes les 30 secondes, généré par une app (type authenticator) à partir d'un secret partagé. Fonctionne hors ligne, standard ouvert (RFC 6238).",
          },
          {
            label: "SMS",
            value:
              "Un code envoyé par SMS. Pratique mais le plus faible : interception possible (SIM swapping). À n'utiliser qu'en dernier recours.",
          },
          {
            label: "Clé matérielle / passkey",
            value:
              "Une clé physique ou le capteur biométrique du téléphone. Résiste au phishing : la preuve est liée au site visité.",
          },
          {
            label: "Notification push",
            value:
              "« C'est bien vous ? » sur le téléphone. Confortable, mais sensible au harcèlement d'approbations (MFA fatigue).",
          },
        ],
      },
      {
        kind: "text",
        text: "Côté développement, la MFA ajoute des états au parcours : inscription du facteur, vérification à chaque connexion (ou seulement sur appareil inconnu), et surtout des codes de secours à usage unique pour le jour où l'utilisateur perd son téléphone. Un compte dont le second facteur est perdu sans secours est un compte perdu — ou un appel au support.",
      },
    ],
  },
  {
    id: "passkeys-apercu",
    title: "Les passkeys : l'aperçu",
    level: 2,
    intro:
      "L'authentification sans mot de passe vers laquelle l'industrie se dirige.",
    blocks: [
      {
        kind: "text",
        text: "Une passkey est une paire de clés cryptographiques : la clé privée reste sur l'appareil de l'utilisateur (protégée par biométrie ou PIN), la clé publique est stockée par le serveur. À la connexion, le serveur envoie un défi, l'appareil le signe avec la clé privée, le serveur vérifie avec la clé publique. Rien à mémoriser, rien à transmettre qui puisse être rejoué.",
      },
      {
        kind: "steps",
        steps: [
          { title: "Enregistrement", detail: "L'utilisateur crée une passkey : son appareil génère la paire de clés et envoie la clé publique au serveur." },
          { title: "Connexion", detail: "Le serveur envoie un défi unique ; l'utilisateur déverrouille son appareil (empreinte, visage, PIN)." },
          { title: "Signature", detail: "L'appareil signe le défi avec la clé privée — la signature est liée au domaine du site, donc inutilisable sur un site de phishing." },
          { title: "Vérification", detail: "Le serveur vérifie la signature avec la clé publique stockée et ouvre la session." },
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro:
      "Trois projets de difficulté croissante pour pratiquer l'authentification de bout en bout.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Inscription et connexion",
        fields: [
          { label: "Objectif", value: "Formulaires d'inscription et de connexion avec mots de passe hachés (scrypt) et sessions en cookies sécurisés." },
          { label: "Compétences", value: "Hachage, sel, cookies `HttpOnly`, expiration de session, déconnexion." },
          { label: "Difficulté", value: "Faible — quelques jours" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Login avec second facteur",
        fields: [
          { label: "Objectif", value: "Ajouter le TOTP au projet précédent : QR code d'inscription, vérification du code, codes de secours." },
          { label: "Compétences", value: "Secrets TOTP, fenêtre de tolérance temporelle, parcours de secours." },
          { label: "Difficulté", value: "Moyenne — une à deux semaines" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — API avec JWT et refresh tokens",
        fields: [
          { label: "Objectif", value: "Une API qui délivre des access tokens courts et des refresh tokens à rotation, avec révocation." },
          { label: "Compétences", value: "Signature, expiration, rotation des refresh tokens, détection de réutilisation, middleware d'autorisation." },
          { label: "Difficulté", value: "Élevée — plusieurs semaines" },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "triptyque-identite",
    title: "Identification, authentification, autorisation",
    level: 3,
    intro: "Trois étapes, trois responsabilités, trois surfaces d'attaque.",
    blocks: [
      {
        kind: "fields",
        title: "Le triptyque en détail",
        fields: [
          { label: "Identification", value: "L'utilisateur déclare une identité (email, pseudo). Risque : l'énumération — une page qui dit « cet email n'existe pas » révèle quels comptes existent. Les messages d'erreur doivent rester neutres." },
          { label: "Authentification", value: "L'utilisateur prouve l'identité déclarée (mot de passe, facteur). Risque : brute force, phishing, rejeu. D'où la limitation de tentatives et les facteurs résistants au phishing." },
          { label: "Autorisation", value: "Le système décide ce que l'identité peut faire (rôles, propriété). Risque : élévation de privilèges, IDOR (accéder à la ressource d'un autre en changeant un identifiant). Chaque action sensible revérifie les droits." },
        ],
      },
    ],
  },
  {
    id: "facteurs",
    title: "Les trois familles de facteurs",
    level: 3,
    intro: "Tout mécanisme d'authentification combine ces trois familles.",
    blocks: [
      {
        kind: "table",
        headers: ["Famille", "Exemples", "Forces", "Faiblesses"],
        rows: [
          ["Ce que l'on sait", "Mot de passe, PIN, réponse secrète", "Simple, sans matériel", "Oubliable, devinable, phishable, réutilisé"],
          ["Ce que l'on possède", "Téléphone (TOTP, SMS), clé matérielle, passkey", "Vol plus difficile que deviner", "Perte possible, coût, dépendance à l'appareil"],
          ["Ce que l'on est", "Empreinte, visage", "Impossible à oublier, rapide", "Non révocable si compromis, faux positifs/négatifs"],
        ],
      },
      {
        kind: "text",
        text: "La MFA exige deux facteurs de familles différentes : mot de passe + TOTP (savoir + possession), pas mot de passe + réponse secrète (deux fois savoir). Un second facteur de la même famille n'ajoute presque rien.",
      },
    ],
  },
  {
    id: "politiques-mots-de-passe",
    title: "Politiques de mots de passe",
    level: 3,
    intro: "Ce qui protège vraiment, et les règles contre-productives à abandonner.",
    blocks: [
      {
        kind: "list",
        items: [
          "Longueur plutôt que complexité : une phrase de passe longue bat un mot court bourré de symboles, et elle est mémorisable.",
          "Listes de mots de passe compromis : refuser les mots de passe connus des fuites publiques, plutôt qu'imposer des règles de composition.",
          "Pas de rotation forcée : changer tous les 90 jours pousse à `Motdepasse1`, `Motdepasse2`… On change après un incident, pas au calendrier.",
          "Pas de questions secrètes : « nom de jeune fille de votre mère » est une information publique, pas un secret.",
          "Coller autorisé : interdire le copier-coller casse les gestionnaires de mots de passe, qui sont la bonne pratique.",
          "Longueur maximale généreuse : limiter à 16 ou 32 caractères pénalise les phrases de passe.",
        ],
      },
    ],
  },
  {
    id: "fonctions-de-hachage",
    title: "Fonctions de hachage pour mots de passe",
    level: 3,
    intro: "Toutes les fonctions de hachage ne se valent pas pour les mots de passe.",
    blocks: [
      {
        kind: "fields",
        title: "Comparatif",
        fields: [
          { label: "SHA-256 / SHA-512", value: "Conçues pour être rapides (intégrité de fichiers, signatures). Trop rapides pour les mots de passe : un attaquant teste des milliards de candidats par seconde. À ne jamais utiliser seules." },
          { label: "bcrypt", value: "Conçue pour les mots de passe : coût réglable (facteur de travail), sel intégré. Éprouvée depuis longtemps, limite la longueur à 72 octets." },
          { label: "scrypt", value: "Ajoute un coût en mémoire en plus du coût en calcul : les circuits spécialisés (ASIC) des attaquants deviennent beaucoup plus chers. Disponible dans le module crypto de Node.js." },
          { label: "Argon2", value: "Gagnante de la compétition dédiée (Password Hashing Competition) : mémoire, temps et parallélisme réglables séparément. Le choix recommandé pour les nouveaux systèmes." },
        ],
      },
      {
        kind: "text",
        text: "Le point commun des trois bonnes : un paramètre de coût qu'on augmente avec la puissance du matériel. Le hachage doit rester rapide pour un utilisateur légitime (quelques centaines de millisecondes) et ruineux pour un attaquant qui en teste des milliards.",
      },
    ],
  },
  {
    id: "sel-et-poivre",
    title: "Sel et poivre",
    level: 3,
    intro: "Deux ingrédients complémentaires, souvent confondus.",
    blocks: [
      {
        kind: "fields",
        title: "Définitions",
        fields: [
          { label: "Sel", value: "Valeur aléatoire unique par utilisateur, stockée en clair à côté de l'empreinte. Rôle : empêcher les tables pré-calculées et distinguer deux mêmes mots de passe. Non secret, mais unique." },
          { label: "Poivre", value: "Secret unique par application, stocké hors de la base (configuration, coffre de secrets), ajouté au hachage. Rôle : si seule la base fuit (sans la config), les empreintes restent inexploitables. Secret, mais partagé." },
        ],
      },
      {
        kind: "text",
        text: "Le sel protège contre le pré-calcul, le poivre protège contre la fuite de la seule base de données. Les deux se combinent ; aucun ne remplace une fonction de hachage lente.",
      },
    ],
  },
  {
    id: "attaques-mots-de-passe",
    title: "Attaques contre les mots de passe",
    level: 3,
    intro: "Connaître l'adversaire pour dimensionner les défenses.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue d'attaques",
        fields: [
          { label: "Brute force", value: "Essayer toutes les combinaisons. Défense : mots de passe longs + hachage lent + limitation de tentatives." },
          { label: "Dictionnaire", value: "Essayer les mots courants et leurs variantes. Défense : refus des mots de passe compromis et prévisibles." },
          { label: "Tables arc-en-ciel", value: "Empreintes pré-calculées pour inverser rapidement. Défense : sel unique par utilisateur — rend le pré-calcul inutile." },
          { label: "Credential stuffing", value: "Rejouer des identifiants volés ailleurs (les gens réutilisent leurs mots de passe). Défense : limitation de tentatives, détection d'anomalies, MFA." },
          { label: "Phishing", value: "Voler le mot de passe via un faux site. Défense : facteurs résistants au phishing (passkeys, clés matérielles)." },
          { label: "Keylogging / spyware", value: "Intercepter la frappe sur l'appareil. Défense : hors de portée du développeur web — d'où l'intérêt des facteurs matériels." },
        ],
      },
    ],
  },
  {
    id: "sessions-serveur",
    title: "Sessions côté serveur en détail",
    level: 3,
    intro: "L'implémentation robuste d'une session : ce que le serveur stocke et pourquoi.",
    blocks: [
      {
        kind: "fields",
        title: "Les règles d'une session saine",
        fields: [
          { label: "Identifiant opaque", value: "Une chaîne aléatoire d'au moins 128 bits d'entropie, sans signification. Jamais l'identifiant de l'utilisateur, jamais un JWT déguisé." },
          { label: "Stockage serveur", value: "En mémoire, en base ou en cache (Redis…) : la session contient l'identité, les droits au moment de la connexion, la date de création et d'expiration." },
          { label: "Expiration", value: "Absolue (durée max de la session) et d'inactivité (déconnexion après X minutes sans activité). Les deux." },
          { label: "Régénération", value: "Nouvel identifiant à chaque changement de privilège (connexion, élévation) : empêche la fixation de session." },
          { label: "Révocation", value: "Supprimer la session côté serveur déconnecte immédiatement — l'avantage décisif sur les JWT." },
        ],
      },
    ],
  },
  {
    id: "cookies-attributs",
    title: "Attributs des cookies en détail",
    level: 3,
    intro: "Chaque attribut est une barrière contre une attaque précise.",
    blocks: [
      {
        kind: "fields",
        title: "Référence des attributs",
        fields: [
          { label: "`HttpOnly`", value: "Contre le vol via XSS : JavaScript ne peut ni lire ni modifier le cookie." },
          { label: "`Secure`", value: "Contre l'interception réseau : le cookie ne part que sur HTTPS." },
          { label: "`SameSite=Strict`", value: "Contre le CSRF : le cookie n'est jamais envoyé cross-site, même en suivant un lien." },
          { label: "`SameSite=Lax`", value: "Compromis : envoyé lors d'une navigation top-level (suivre un lien), pas avec les requêtes embarquées (images, fetch cross-site)." },
          { label: "`SameSite=None; Secure`", value: "Nécessaire quand le cookie doit voyager cross-site (SSO, iframe) — toujours avec `Secure`." },
          { label: "`Path` et `Domain`", value: "Restreignent la portée : un cookie de session n'a pas besoin d'être visible par tout le domaine." },
          { label: "`Max-Age` / `Expires`", value: "Durée de vie : sans eux, le cookie meurt à la fermeture du navigateur (cookie de session)." },
          { label: "Préfixe `__Host-`", value: "Verrouille le cookie : `Secure`, `Path=/`, pas de `Domain` — le navigateur refuse de le créer sinon." },
        ],
      },
    ],
  },
  {
    id: "csrf",
    title: "CSRF : l'attaque qui exploite la confiance du navigateur",
    level: 3,
    intro: "Pourquoi les cookies seuls ne suffisent pas, et comment s'en protéger.",
    blocks: [
      {
        kind: "text",
        text: "Le CSRF (Cross-Site Request Forgery) : un site malveillant fait exécuter au navigateur de la victime une requête vers votre application — et le navigateur joint automatiquement les cookies de session. Le serveur voit une requête authentifiée légitime, alors que l'utilisateur n'a rien demandé.",
      },
      {
        kind: "list",
        items: [
          "Défense 1 — `SameSite` : `Lax` ou `Strict` bloque l'envoi du cookie dans la plupart des scénarios CSRF.",
          "Défense 2 — jeton anti-CSRF : un secret par session, transmis dans le formulaire et vérifié côté serveur ; l'attaquant cross-site ne peut pas le lire.",
          "Défense 3 — vérification d'origine : contrôler les en-têtes `Origin` / `Referer` sur les actions sensibles.",
          "Les API qui utilisent `Authorization: Bearer` plutôt que des cookies ne sont pas vulnérables au CSRF : le navigateur n'envoie pas ce jeton tout seul.",
        ],
      },
    ],
  },
  {
    id: "jwt-anatomie-detail",
    title: "Anatomie détaillée d'un JWT",
    level: 3,
    intro: "Lire un JWT champ par champ : ce que chaque claim signifie.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "Header et payload typiques",
        code: `// HEADER : comment le jeton est signé\n{\n  "alg": "HS256",\n  "typ": "JWT"\n}\n\n// PAYLOAD : les claims (affirmations)\n{\n  "sub": "user-123",\n  "name": "Exemple",\n  "iat": 1516239022,\n  "exp": 1516242622,\n  "iss": "mon-app",\n  "aud": "mon-api"\n}`,
      },
      {
        kind: "fields",
        title: "Les claims standard",
        fields: [
          { label: "`sub` (subject)", value: "Le sujet : identifiant de l'utilisateur. Le claim le plus important." },
          { label: "`exp` (expiration)", value: "Timestamp Unix après lequel le jeton est refusé. Toujours présent, toujours court." },
          { label: "`iat` (issued at)", value: "Date d'émission : permet de rejeter les jetons « du futur » ou trop vieux." },
          { label: "`nbf` (not before)", value: "Date avant laquelle le jeton n'est pas valide." },
          { label: "`iss` (issuer)", value: "Qui a émis le jeton : le vérificateur contrôle qu'il fait confiance à cet émetteur." },
          { label: "`aud` (audience)", value: "Pour qui le jeton est destiné : empêche de réutiliser un jeton prévu pour un autre service." },
          { label: "`jti` (JWT ID)", value: "Identifiant unique du jeton : utile pour la révocation ciblée." },
        ],
      },
      {
        kind: "text",
        text: "Côté signature, deux familles : HMAC (`HS256`) avec un secret partagé — simple, mais tout vérificateur peut aussi signer ; RSA/ECDSA (`RS256`/`ES256`) avec une paire de clés — le serveur signe avec la privée, n'importe qui vérifie avec la publique. En microservices, la seconde évite de distribuer le secret partout.",
      },
    ],
  },
  {
    id: "jwt-avantages-limites",
    title: "JWT : avantages et limites",
    level: 3,
    intro: "Le JWT n'est ni magique ni à bannir : il a un domaine de validité précis.",
    blocks: [
      {
        kind: "table",
        headers: ["Avantages", "Limites"],
        rows: [
          ["Sans état : pas de stockage serveur, passe à l'échelle horizontalement", "Révocation difficile : un jeton volé reste valide jusqu'à expiration"],
          ["Vérifiable par tout service possédant la clé", "Taille : chaque requête transporte le jeton, attention aux gros payloads"],
          ["Standard, interopérable entre langages", "Payload lisible : aucune donnée sensible dedans"],
          ["Expiration intégrée (`exp`)", "Si stocké en `localStorage`, vulnérable au vol via XSS"],
        ],
      },
      {
        kind: "text",
        text: "La synthèse pratique : JWT excellents pour les API stateless et le passage d'identité entre services ; sessions serveur préférables quand la révocation immédiate compte (déconnexion, bannissement, changement de droits). Beaucoup d'applications combinent les deux : access token JWT court + session/refresh révocable.",
      },
    ],
  },
  {
    id: "refresh-tokens",
    title: "Refresh tokens et rotation",
    level: 3,
    intro: "Concilier jetons courts et expérience fluide : le renouvellement sécurisé.",
    blocks: [
      {
        kind: "fields",
        title: "Le mécanisme",
        fields: [
          { label: "Access token court", value: "Quelques minutes : c'est lui qui est envoyé à chaque requête. S'il est volé, sa durée de vie est brève." },
          { label: "Refresh token long", value: "Quelques jours ou semaines, stocké en sécurité (cookie `HttpOnly`) : il sert uniquement à obtenir de nouveaux access tokens." },
          { label: "Rotation", value: "Chaque utilisation du refresh token en génère un nouveau et invalide l'ancien : un refresh token ne sert qu'une fois." },
          { label: "Détection de réutilisation", value: "Si un refresh token déjà utilisé réapparaît, c'est qu'il a été volé : on révoque toute la chaîne (tous les jetons de l'utilisateur)." },
        ],
      },
      {
        kind: "text",
        text: "Ce schéma donne le meilleur des deux mondes : des access tokens stateless et courts, et une révocation effective via les refresh tokens stockés côté serveur. Le prix : une petite machinerie de stockage et de rotation à maintenir.",
      },
    ],
  },
  {
    id: "revocation",
    title: "Stratégies de révocation",
    level: 3,
    intro: "« Déconnecter cet utilisateur maintenant » : les options selon l'architecture.",
    blocks: [
      {
        kind: "fields",
        title: "Les stratégies",
        fields: [
          { label: "Sessions serveur", value: "Supprimer la session : effet immédiat, trivial. La référence." },
          { label: "TTL court + refresh", value: "L'access token expire en minutes ; révoquer le refresh token coupe le renouvellement. Compromis standard." },
          { label: "Denylist", value: "Liste des jetons révoqués (par `jti`) vérifiée à chaque requête : efficace mais réintroduit un état serveur." },
          { label: "Version dans le jeton", value: "Un numéro de version utilisateur dans le payload, incrémenté à chaque révocation globale : les vieux jetons sont rejetés sans les stocker." },
        ],
      },
    ],
  },
  {
    id: "oauth2-roles",
    title: "OAuth 2.0 : les quatre rôles",
    level: 3,
    intro: "Le vocabulaire exact : chaque acteur a un nom et un rôle.",
    blocks: [
      {
        kind: "fields",
        title: "Les acteurs",
        fields: [
          { label: "Resource Owner", value: "L'utilisateur : c'est lui qui possède les données et qui consent à les partager." },
          { label: "Client", value: "Votre application : elle demande l'accès, elle ne voit jamais le mot de passe." },
          { label: "Authorization Server", value: "Le provider : il authentifie l'utilisateur, recueille le consentement, émet les jetons." },
          { label: "Resource Server", value: "L'API qui héberge les données : elle vérifie l'access token avant de servir." },
        ],
      },
      {
        kind: "text",
        text: "OAuth 2.0 est un protocole de délégation d'autorisation, pas d'authentification : il dit « cette app peut agir pour cet utilisateur », pas « voici qui est l'utilisateur ». L'authentification par-dessus OAuth, c'est OpenID Connect.",
      },
    ],
  },
  {
    id: "pkce-detail",
    title: "PKCE en détail",
    level: 3,
    intro: "La pièce qui sécurise OAuth sur les clients publics (mobile, SPA).",
    blocks: [
      {
        kind: "steps",
        steps: [
          { title: "Générer le verifier", detail: "Le client crée une chaîne aléatoire (code_verifier), gardée secrète en mémoire." },
          { title: "Dériver le challenge", detail: "Il calcule `code_challenge = SHA256(code_verifier)` et l'envoie avec la demande d'autorisation." },
          { title: "Recevoir le code", detail: "Le provider redirige avec le code d'autorisation, lié au challenge." },
          { title: "Prouver", detail: "Le client envoie le code + le `code_verifier` en clair au provider, qui recalcule le hash et compare." },
        ],
      },
      {
        kind: "text",
        text: "L'astuce : même si un attaquant intercepte le code d'autorisation (redirection compromise), il ne connaît pas le verifier et ne peut pas l'échanger contre des jetons. C'est aujourd'hui recommandé pour tous les clients, confidentiels ou publics.",
      },
    ],
  },
  {
    id: "scopes",
    title: "Scopes et consentement",
    level: 3,
    intro: "Le principe du moindre privilège appliqué à la délégation.",
    blocks: [
      {
        kind: "text",
        text: "Le scope définit ce que le jeton permet : `read:profile`, `write:repos`… L'utilisateur voit exactement ces scopes sur l'écran de consentement du provider avant d'accepter. Côté développement, deux règles : demander le scope minimal nécessaire (un scope trop large fait fuir et augmente l'impact d'un vol), et vérifier le scope reçu — l'utilisateur peut refuser une partie des permissions demandées.",
      },
      {
        kind: "list",
        items: [
          "Scopes fins et nommés explicitement : `read:email` plutôt que `full_access`.",
          "Consentement éclairé : l'écran du provider liste les scopes, pas votre application.",
          "Vérification côté resource server : chaque endpoint contrôle que le jeton porte le scope requis.",
          "Élévation progressive : demander un scope sensible au moment où la fonctionnalité en a besoin, pas à l'inscription.",
        ],
      },
    ],
  },
  {
    id: "openid-connect",
    title: "OpenID Connect",
    level: 3,
    intro: "La couche d'identité au-dessus d'OAuth 2.0.",
    blocks: [
      {
        kind: "fields",
        title: "Les deux jetons à ne pas confondre",
        fields: [
          { label: "`id_token`", value: "Un JWT qui dit qui est l'utilisateur (claims `sub`, `email`, `name`…). Destiné au client, jamais envoyé à l'API. C'est lui qui fait l'authentification." },
          { label: "`access_token`", value: "Le jeton qui autorise les appels à l'API (au format opaque ou JWT). Destiné au resource server. C'est lui qui fait l'autorisation." },
        ],
      },
      {
        kind: "text",
        text: "L'erreur classique : utiliser l'`access_token` comme preuve d'identité, ou envoyer l'`id_token` à l'API. Chacun a son audience (`aud`) et son destinataire. Le `/.well-known/openid-configuration` du provider publie les clés et endpoints — le client les découvre au lieu de les coder en dur.",
      },
    ],
  },
  {
    id: "totp-fonctionnement",
    title: "Fonctionnement du TOTP",
    level: 3,
    intro: "Ce qui se passe quand l'app affiche un nouveau code toutes les 30 secondes.",
    blocks: [
      {
        kind: "diagram",
        title: "Génération d'un code TOTP",
        lines: [
          "Secret partagé (échangé une fois, via QR code)",
          "        +",
          "Temps Unix / 30 secondes (compteur)",
          "        │",
          "        ▼",
          "HMAC-SHA1(secret, compteur)",
          "        │",
          "        ▼",
          "Troncature dynamique → 6 à 8 chiffres",
        ],
      },
      {
        kind: "fields",
        title: "Points d'implémentation",
        fields: [
          { label: "Secret", value: "Généré aléatoirement (au moins 160 bits), stocké chiffré côté serveur, transmis une seule fois via QR code." },
          { label: "Fenêtre de tolérance", value: "Accepter le code précédent et le suivant (±1 pas de temps) : les horloges dérivent." },
          { label: "Anti-rejeu", value: "Un code déjà utilisé dans sa fenêtre ne doit pas être réutilisable : mémoriser le dernier compteur accepté." },
          { label: "Codes de secours", value: "Une dizaine de codes à usage unique, hachés comme des mots de passe, pour le jour où le téléphone est perdu." },
        ],
      },
    ],
  },
  {
    id: "webauthn-detail",
    title: "WebAuthn en détail",
    level: 3,
    intro: "Le standard derrière les passkeys : deux cérémonies à comprendre.",
    blocks: [
      {
        kind: "steps",
        steps: [
          { title: "Cérémonie d'enregistrement", detail: "Le serveur envoie un défi + l'identifiant utilisateur ; l'appareil crée une paire de clés, stocke la privée, renvoie la publique avec l'identifiant de credential." },
          { title: "Stockage serveur", detail: "Le serveur associe l'identifiant de credential et la clé publique au compte. La clé privée ne quitte jamais l'appareil." },
          { title: "Cérémonie d'authentification", detail: "Le serveur envoie un nouveau défi ; l'appareil le signe après déverrouillage local (biométrie, PIN)." },
          { title: "Vérification", detail: "Le serveur vérifie la signature, contrôle l'origine (domaine) et le compteur anti-clonage, puis ouvre la session." },
        ],
      },
      {
        kind: "text",
        text: "La propriété décisive : la signature est liée à l'origine du site. Un faux site de phishing reçoit une signature invalide pour le vrai domaine — le phishing devient mathématiquement inopérant, pas seulement « détectable ».",
      },
    ],
  },
  {
    id: "rate-limiting",
    title: "Limitation de tentatives",
    level: 3,
    intro: "Rendre le brute force économiquement absurde.",
    blocks: [
      {
        kind: "fields",
        title: "Les stratégies",
        fields: [
          { label: "Compteur par compte", value: "Après N échecs, verrouillage temporaire croissant. Attention : un attaquant peut verrouiller les comptes des autres (déni de service) — préférer le ralentissement au blocage dur." },
          { label: "Compteur par IP", value: "Limite les attaques distribuées naïves, mais les proxys partagés et les botnets la contournent partiellement." },
          { label: "Délai progressif", value: "Chaque échec allonge l'attente avant le prochain essai : invisible pour l'utilisateur légitime, ruineux pour l'attaquant." },
          { label: "CAPTCHA ciblé", value: "Après quelques échecs, exiger une preuve d'humanité : filtre les scripts sans punir les utilisateurs." },
        ],
      },
      {
        kind: "text",
        text: "Le hachage lent (scrypt, Argon2) est déjà une forme de rate limiting : chaque essai coûte du temps CPU au serveur — et donc à l'attaquant qui rejoue hors ligne. Les deux couches se complètent.",
      },
    ],
  },
  {
    id: "enumeration-comptes",
    title: "Énumération de comptes",
    level: 3,
    intro: "La fuite d'information la plus discrète des pages de login.",
    blocks: [
      {
        kind: "text",
        text: "Si « mot de passe incorrect » s'affiche pour les emails existants et « compte inexistant » pour les autres, un attaquant peut cartographier tous vos utilisateurs email par email. La parade : un message unique et neutre (« identifiants invalides ») dans tous les cas, et un temps de réponse constant — vérifier un faux compte doit coûter aussi cher que vérifier un vrai (hachage factice).",
      },
      {
        kind: "list",
        items: [
          "Messages d'erreur identiques que le compte existe ou non.",
          "Temps de réponse constant : toujours exécuter le hachage, même si l'utilisateur n'existe pas.",
          "Même neutralité sur « mot de passe oublié » : « si ce compte existe, un email a été envoyé ».",
          "L'inscription est l'exception assumée : « cet email est déjà utilisé » y est acceptable — c'est un choix produit conscient.",
        ],
      },
    ],
  },
  {
    id: "reinitialisation-mot-de-passe",
    title: "Réinitialisation de mot de passe",
    level: 3,
    intro: "Le flux le plus attaqué après le login : le sécuriser point par point.",
    blocks: [
      {
        kind: "steps",
        steps: [
          { title: "Demande neutre", detail: "« Si ce compte existe, un email a été envoyé » — jamais de confirmation d'existence." },
          { title: "Jeton à usage unique", detail: "Aléatoire (128 bits minimum), stocké haché côté serveur, expirant vite (15-60 minutes)." },
          { title: "Lien, pas de code devinable", detail: "Un lien avec le jeton en paramètre, envoyé à l'adresse email vérifiée du compte." },
          { title: "Usage unique réel", detail: "Le jeton est invalidé dès son utilisation — et après expiration." },
          { title: "Invalider les sessions", detail: "Après changement, toutes les sessions existantes sont révoquées : l'attaquant éventuellement connecté est éjecté." },
          { title: "Notification", detail: "Email d'information « votre mot de passe a été modifié » avec un lien de recours." },
        ],
      },
    ],
  },
  {
    id: "logs-audit",
    title: "Logs et audit",
    level: 3,
    intro: "Tracer sans exposer : ce que les journaux d'authentification doivent contenir.",
    blocks: [
      {
        kind: "fields",
        title: "Journaliser / ne jamais journaliser",
        fields: [
          { label: "À journaliser", value: "Tentatives de connexion (réussies et échouées), avec horodatage, IP et identifiant de compte ; changements de mot de passe ; révocations ; inscriptions de second facteur ; anomalies (nouvel appareil, nouveau pays)." },
          { label: "À ne jamais journaliser", value: "Mots de passe (même faux), jetons, secrets TOTP, codes de secours, réponses aux questions secrètes. Un log qui contient un secret devient un secret à protéger." },
          { label: "Alertes", value: "Plusieurs échecs rapprochés, connexion depuis un contexte inhabituel, réutilisation d'un refresh token : des signaux, pas seulement des archives." },
        ],
      },
    ],
  },
  {
    id: "testing-auth",
    title: "Tester l'authentification",
    level: 3,
    intro: "Les scénarios que toute suite de tests d'authentification doit couvrir.",
    blocks: [
      {
        kind: "list",
        items: [
          "Inscription : mot de passe faible refusé, doublon d'email géré, mot de passe jamais stocké en clair en base.",
          "Connexion : bons identifiants acceptés, mauvais refusés, message neutre dans les deux cas d'échec.",
          "Sessions : cookie `HttpOnly` présent, expiration respectée, déconnexion invalide la session.",
          "JWT : jeton expiré refusé, signature invalide refusée, `aud`/`iss` vérifiés.",
          "MFA : code valide accepté, code expiré refusé, code réutilisé refusé, secours à usage unique.",
          "Réinitialisation : jeton à usage unique, expiration, invalidation des sessions après changement.",
          "Autorisation : un utilisateur authentifié ne peut pas accéder aux ressources d'un autre (tests IDOR).",
          "Limitation : le N+1e essai est ralenti ou bloqué.",
        ],
      },
    ],
  },
  {
    id: "debugging-auth",
    title: "Déboguer l'authentification",
    level: 3,
    intro: "Une méthode pour les classiques « ça ne connecte pas ».",
    blocks: [
      {
        kind: "steps",
        steps: [
          { title: "Lire le message exact", detail: "Distinguer « identifiants invalides » (données), « jeton expiré » (temps), « signature invalide » (secret/clé), « CORS » (navigateur, pas l'auth)." },
          { title: "Inspecter le transport", detail: "Onglet réseau : le cookie part-il ? L'en-tête `Authorization` est-il présent ? Le `Set-Cookie` est-il bloqué (attribut `Secure` sur HTTP local, `SameSite`) ?" },
          { title: "Décoder sans croire", detail: "Décoder le JWT pour lire `exp`, `aud`, `iss` — mais un payload lisible ne prouve rien, seule la vérification de signature compte." },
          { title: "Vérifier l'horloge", detail: "TOTP, `exp`, `nbf` : un décalage d'horloge de quelques minutes casse tout silencieusement." },
          { title: "Isoler la couche", detail: "Tester le hachage seul, la vérification de signature seule, la session seule — avant d'accuser le flux complet." },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro: "Le catalogue des fautes qui reviennent dans les audits.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Mots de passe en clair ou en MD5/SHA-1",
            value:
              "Problem : une fuite de base livre tous les comptes. Why : ignorance ou héritage. Better : fonction lente dédiée (scrypt, bcrypt, Argon2) + sel unique.",
          },
          {
            label: "JWT sans vérification de signature",
            value:
              "Problem : accepter un jeton en ne lisant que le payload permet la falsification. Why : bibliothèque mal configurée (`alg: none` accepté). Better : vérifier signature, `exp`, `aud`, `iss` systématiquement.",
          },
          {
            label: "Secrets dans le code ou le dépôt",
            value:
              "Problem : clé de signature JWT committée sur Git = compromission permanente. Why : facilité. Better : variables d'environnement, coffre de secrets, rotation.",
          },
          {
            label: "Sessions sans expiration",
            value:
              "Problem : un cookie volé reste valide indéfiniment. Why : oubli des attributs. Better : `Max-Age`, expiration absolue et d'inactivité.",
          },
          {
            label: "Messages d'erreur bavards",
            value:
              "Problem : « cet email n'existe pas » permet l'énumération. Why : vouloir aider l'utilisateur. Better : messages neutres et temps de réponse constant.",
          },
          {
            label: "Réinitialisation prévisible",
            value:
              "Problem : jeton devinable ou sans expiration = prise de compte. Why : implémentation maison. Better : aléatoire 128 bits, haché, usage unique, expiration courte.",
          },
          {
            label: "MFA contournable",
            value:
              "Problem : le second facteur est demandé mais pas vérifié sur les routes sensibles, ou le « se souvenir » dure un an. Why : UX mal calibrée. Better : vérifier à chaque élévation, secours à usage unique.",
          },
          {
            label: "Données sensibles dans le JWT",
            value:
              "Problem : le payload est lisible par tous. Why : confusion encodage/chiffrement. Better : identifiants et droits uniquement, jamais d'email sensible ni de secret.",
          },
          {
            label: "Pas de limitation de tentatives",
            value:
              "Problem : brute force en ligne illimité. Why : oublié. Better : délai progressif + compteur + CAPTCHA ciblé.",
          },
          {
            label: "Déconnexion qui ne déconnecte pas",
            value:
              "Problem : le cookie est effacé côté client mais la session/JWT reste valide. Why : pas de révocation serveur. Better : invalider côté serveur (sessions) ou révoquer le refresh token (JWT).",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro: "Les réflexes d'une authentification bien conçue.",
    blocks: [
      {
        kind: "list",
        items: [
          "Ne jamais réinventer la cryptographie : utiliser des primitives et bibliothèques éprouvées.",
          "Défense en profondeur : hachage lent + limitation + MFA + monitoring, pas une seule barrière.",
          "Moindre privilège : sessions courtes, scopes étroits, droits vérifiés à chaque action.",
          "Échec sûr : en cas de doute, refuser l'accès plutôt que l'accorder.",
          "Secrets hors du code : environnement et coffres, jamais le dépôt.",
          "Journaliser les événements, jamais les secrets.",
          "Prévoir la révocation dès la conception : déconnexion, bannissement, rotation des clés.",
          "Tester les chemins d'attaque, pas seulement le chemin nominal.",
          "Documenter les choix : pourquoi session plutôt que JWT, durée des TTL, politique de verrouillage.",
          "Suivre les guides OWASP : ils évoluent avec les attaques réelles.",
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Aller plus loin, en commençant par les références reconnues.",
    blocks: [
      {
        kind: "fields",
        title: "Références",
        fields: [
          { label: "OWASP", value: "https://owasp.org/ — guides et cheat sheets sur l'authentification, la gestion des sessions et les mots de passe." },
          { label: "RFC 6749 et 7636", value: "Les spécifications d'OAuth 2.0 et de PKCE : la source de vérité sur les flux." },
          { label: "RFC 6238", value: "La spécification du TOTP : l'algorithme exact des codes à usage unique temporels." },
          { label: "WebAuthn (W3C)", value: "La spécification du standard derrière les passkeys." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pages liées de cette plateforme : Cryptographie (hachage, signatures), Sécurité web (XSS, CSRF), JWT si détaillée dans votre parcours.",
          "Pratique : implémenter chaque projet de cette page, puis le faire relire en cherchant les failles du catalogue d'erreurs.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "L'authentification maîtrisée, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir la cryptographie : `cryptography` — hachage, signatures, TLS.",
          "Verrouiller le web : `web-security` — XSS, CSRF, en-têtes de sécurité.",
          "Pratiquer l'offensive (légalement) : `owasp` — comprendre les attaques pour mieux défendre.",
          "Construire le backend : `nodejs` — API, sessions, middleware d'authentification.",
          "Revoir le protocole : `http` — cookies, en-têtes et CORS en détail.",
        ],
      },
    ],
  },
];

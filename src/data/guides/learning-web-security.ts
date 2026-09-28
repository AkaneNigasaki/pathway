import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de la sécurité web (versant défensif) : comprendre
 * les attaques classiques pour écrire du code qui résiste.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 *
 * Note de cadrage : cette page adopte le point de vue du développeur qui
 * protège son application. Les attaques sont décrites au niveau conceptuel,
 * sans mode d'emploi offensif détaillé.
 */
export const LEARNING_WEB_SECURITY: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est la sécurité web et pourquoi elle concerne chaque développeur.",
    blocks: [
      {
        kind: "text",
        text: "La sécurité web est l'ensemble des pratiques qui protègent les applications web : prévenir les injections, le XSS, le CSRF, sécuriser les sessions et configurer correctement les en-têtes. C'est une discipline défensive : on apprend comment les applications sont attaquées pour écrire du code qui résiste.",
      },
      {
        kind: "text",
        text: "Pourquoi chaque développeur est concerné : la majorité des failles exploitées sont des failles web classiques, connues depuis vingt ans (le classement OWASP Top 10 n'a presque pas changé de nature). Ce n'est pas un spécialiste lointain qui introduit la faille — c'est le développeur qui écrit la requête SQL, affiche le commentaire, pose le cookie. Penser sécurité dès la conception coûte peu ; la rajouter après l'incident coûte très cher.",
      },
      {
        kind: "text",
        text: "Le principe fondateur : ne jamais faire confiance aux données venues de l'extérieur. Toute entrée utilisateur, tout paramètre d'URL, tout en-tête HTTP est potentiellement hostile jusqu'à preuve du contraire — validation, échappement et requêtes préparées en découlent.",
      },
    ],
  },
  {
    id: "confiance-zero",
    title: "Le modèle mental : confiance zéro",
    level: 1,
    intro: "La posture qui sous-tend toutes les défenses.",
    blocks: [
      {
        kind: "diagram",
        title: "Frontière de confiance",
        lines: [
          "Navigateur / utilisateur",
          "     │  TOUT ce qui traverse est suspect",
          "     │  (entrées, cookies, en-têtes, URLs)",
          "     ▼",
          "┌─────────────────────────┐",
          "│  FRONTIÈRE DE CONFIANCE │",
          "└─────────────────────────┘",
          "     │",
          "     ├── Valider (format attendu ?)",
          "     ├── Échapper (affichage sûr ?)",
          "     ├── Paramétrer (requêtes préparées ?)",
          "     └── Autoriser (cet utilisateur a-t-il le droit ?)",
          "     ▼",
          "Traitement sûr côté serveur",
        ],
      },
      {
        kind: "list",
        items: [
          "Le client est sous contrôle de l'attaquant : toute validation faite en JavaScript doit être refaite côté serveur.",
          "Valider en entrée (ce qui entre), échapper en sortie (ce qui s'affiche) : deux opérations différentes, aux deux bouts.",
          "Le moindre privilège : chaque composant n'accède qu'au strict nécessaire.",
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
    intro: "Les bases techniques sans lesquelles les attaques restent abstraites.",
    blocks: [
      {
        kind: "fields",
        title: "Bases nécessaires",
        fields: [
          {
            label: "HTTP",
            value:
              "Requêtes, réponses, en-têtes, cookies : le terrain où se jouent les attaques web. Savoir lire une requête dans les DevTools.",
          },
          {
            label: "JavaScript + un backend",
            value:
              "Comprendre le code qu'on protège : comment une entrée utilisateur traverse l'application jusqu'à la base ou la page.",
          },
          {
            label: "Bases de données (SQL)",
            value:
              "Lire une requête SQL simple : indispensable pour comprendre les injections et les requêtes préparées.",
          },
          {
            label: "Réseaux (bases)",
            value:
              "TCP/IP, DNS, TLS : le contexte dans lequel HTTPS protège (ou non) les échanges.",
          },
        ],
      },
    ],
  },
  {
    id: "owasp-top-10",
    title: "OWASP Top 10",
    level: 2,
    intro: "La carte de référence : les dix familles de failles les plus critiques.",
    blocks: [
      {
        kind: "text",
        text: "L'OWASP (Open Worldwide Application Security Project) publie le Top 10 des risques de sécurité des applications web : c'est la référence partagée par l'industrie pour prioriser les défenses. Version 2021 :",
      },
      {
        kind: "list",
        items: [
          "A01 — Contrôle d'accès défaillant (Broken Access Control)",
          "A02 — Défaillances cryptographiques (Cryptographic Failures)",
          "A03 — Injection",
          "A04 — Conception non sécurisée (Insecure Design)",
          "A05 — Mauvaise configuration de sécurité (Security Misconfiguration)",
          "A06 — Composants vulnérables et obsolètes",
          "A07 — Défaillances d'identification et d'authentification",
          "A08 — Défaillances d'intégrité des données et logiciels",
          "A09 — Défaillances de journalisation et de supervision",
          "A10 — Falsification de requête côté serveur (SSRF)",
        ],
      },
      {
        kind: "text",
        text: "Usage pratique : passez votre application au crible de ces dix familles, une par une. C'est un audit de premier niveau à la portée de tout développeur, avant même de parler de pentest.",
      },
    ],
  },
  {
    id: "xss",
    title: "XSS : l'injection de scripts",
    level: 2,
    intro: "La faille la plus connue : du code attaquant exécuté dans le navigateur des victimes.",
    blocks: [
      {
        kind: "text",
        text: "Le XSS (Cross-Site Scripting) se produit quand une application affiche des données utilisateur sans les échapper : le navigateur les interprète comme du code. Un commentaire contenant `<script>` peut alors voler des sessions ou défacer la page — chez tous les visiteurs, pas seulement l'attaquant.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Échapper à l'affichage",
        code: `// DANGEREUX : le HTML injecté est interprété\ncommentBox.innerHTML = userInput;\n\n// SÛR : le contenu est traité comme du texte pur\ncommentBox.textContent = userInput;`,
      },
      {
        kind: "text",
        text: "Règle : `textContent` (ou l'échappement automatique de votre framework — React, Vue échappent par défaut) pour afficher des données. `innerHTML` uniquement avec du HTML de confiance, jamais avec des entrées utilisateur. Les frameworks modernes protègent par défaut ; le danger vient du contournement manuel.",
      },
    ],
  },
  {
    id: "injections-sql",
    title: "Injections SQL",
    level: 2,
    intro: "Ne jamais concaténer des entrées utilisateur dans une requête.",
    blocks: [
      {
        kind: "text",
        text: "L'injection SQL exploite une requête construite par concaténation : l'entrée utilisateur devient du code SQL. Une entrée malveillante peut alors lire, modifier ou supprimer des données — voire prendre le contrôle de la base.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Requête préparée (paramétrée)",
        code: `// DANGEREUX : concaténation — l'entrée devient du SQL\nconst q = "SELECT * FROM users WHERE email = '" + email + "'";\n\n// SÛR : la valeur est un paramètre, jamais du code\nconst rows = await db.query(\n  "SELECT * FROM users WHERE email = ?",\n  [email]\n);`,
      },
      {
        kind: "text",
        text: "Avec une requête préparée, la valeur est envoyée séparément de la requête : la base la traite comme une donnée, jamais comme du SQL. Les ORM modernes paramètrent par défaut — la faille survient quand on écrit du SQL brut ou qu'on désactive la protection.",
      },
    ],
  },
  {
    id: "csrf",
    title: "CSRF : requêtes forgées",
    level: 2,
    intro: "Faire exécuter à votre navigateur des actions à votre insu.",
    blocks: [
      {
        kind: "text",
        text: "Le CSRF (Cross-Site Request Forgery) abuse de la confiance du navigateur : quand vous êtes connecté à un site, le navigateur joint automatiquement vos cookies à chaque requête — y compris celles déclenchées par un autre site malveillant. Un simple formulaire caché peut ainsi déclencher un transfert ou une suppression en votre nom.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Défenses côté serveur (Node/Express)",
        code: `// 1. Cookie de session avec SameSite=Lax : le navigateur\n//    ne l'envoie pas depuis un site tiers\nres.cookie("session", token, {\n  httpOnly: true,\n  secure: true,\n  sameSite: "lax",\n});\n\n// 2. Jeton anti-CSRF : valeur secrète dans le formulaire,\n//    vérifiée à chaque requête qui modifie des données\n//    (les frameworks fournissent souvent un middleware dédié)`,
      },
      {
        kind: "text",
        text: "Deux défenses complémentaires : `SameSite=Lax` sur les cookies (le navigateur refuse d'envoyer le cookie depuis un site tiers — protection moderne de base) et un jeton anti-CSRF (valeur imprévisible que seul votre site connaît, vérifiée à chaque action).",
      },
    ],
  },
  {
    id: "en-tetes-securite",
    title: "En-têtes de sécurité",
    level: 2,
    intro: "Quelques en-têtes HTTP qui activent des protections du navigateur.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier les en-têtes d'un site",
        command: "curl -I https://example.com",
        why: "Affiche les en-têtes de réponse : on y vérifie la présence de `Content-Security-Policy`, `X-Content-Type-Options`, `Strict-Transport-Security`. C'est l'audit le plus rapide — dix secondes pour savoir si les bases sont en place.",
      },
      {
        kind: "code",
        language: "text",
        title: "Les en-têtes essentiels",
        code: `Content-Security-Policy: default-src 'self'\nX-Content-Type-Options: nosniff\nReferrer-Policy: strict-origin-when-cross-origin\nStrict-Transport-Security: max-age=31536000`,
      },
      {
        kind: "fields",
        title: "Rôle de chaque en-tête",
        fields: [
          {
            label: "`Content-Security-Policy`",
            value:
              "Déclare d'où peuvent venir scripts, styles, images : `default-src 'self'` n'autorise que votre domaine. La défense la plus puissante contre le XSS.",
          },
          {
            label: "`X-Content-Type-Options: nosniff`",
            value:
              "Empêche le navigateur de « deviner » le type d'un fichier : un fichier uploadé ne sera pas exécuté comme du JS.",
          },
          {
            label: "`Strict-Transport-Security`",
            value:
              "Force HTTPS pendant un an : bloque les attaques par downgrade vers HTTP.",
          },
        ],
      },
    ],
  },
  {
    id: "authentification-bases",
    title: "Authentification : les bases",
    level: 2,
    intro: "Mots de passe, sessions : les fondations à ne pas rater.",
    blocks: [
      {
        kind: "fields",
        title: "Règles non négociables",
        fields: [
          {
            label: "Mots de passe hachés et salés",
            value:
              "Jamais en clair, jamais en MD5/SHA simple : utilisez bcrypt, argon2 ou scrypt (algorithmes lents, avec sel unique par mot de passe).",
          },
          {
            label: "Cookies de session sécurisés",
            value:
              "`HttpOnly` (inaccessible au JavaScript : protège du XSS), `Secure` (HTTPS uniquement), `SameSite=Lax` (anti-CSRF).",
          },
          {
            label: "Expiration et révocation",
            value:
              "Sessions à durée limitée, déconnexion qui invalide vraiment côté serveur, révocation possible en cas de compromission.",
          },
          {
            label: "MFA",
            value:
              "L'authentification multifacteur (mot de passe + second facteur) neutralise le vol d'identifiants — proposez-la, imposez-la aux comptes sensibles.",
          },
        ],
      },
      {
        kind: "text",
        text: "N'inventez jamais votre propre système d'authentification : utilisez des bibliothèques éprouvées et, quand c'est possible, déléguez (OAuth/OIDC via un provider reconnu). L'authentification maison est l'une des sources les plus sûres de failles.",
      },
    ],
  },
  {
    id: "https",
    title: "HTTPS et TLS",
    level: 2,
    intro: "Chiffrer le transport : obligatoire, pas optionnel.",
    blocks: [
      {
        kind: "text",
        text: "HTTPS (HTTP sur TLS) chiffre les échanges entre le navigateur et le serveur : sans lui, mots de passe et sessions transitent en clair, lisibles par n'importe quel intermédiaire réseau. Aujourd'hui, les certificats sont gratuits et automatiques (Let's Encrypt) — il n'y a plus d'excuse.",
      },
      {
        kind: "list",
        items: [
          "Tout le site en HTTPS, pas seulement le login : le mixed content (ressources HTTP sur page HTTPS) annule la protection.",
          "Rediriger HTTP → HTTPS côté serveur, et ajouter `Strict-Transport-Security` (HSTS).",
          "Cookies `Secure` : jamais transmis en clair, même par accident.",
          "Vérifier la configuration TLS (versions récentes uniquement) avec un scanner comme celui de SSL Labs — en texte, sans commande à retenir.",
        ],
      },
    ],
  },
  {
    id: "dependances",
    title: "Dépendances vulnérables",
    level: 2,
    intro: "Votre code est sûr ; vos 500 dépendances, peut-être pas.",
    blocks: [
      {
        kind: "command",
        label: "Auditer les dépendances",
        command: "npm audit",
        why: "Compare vos dépendances installées à la base de vulnérabilités connues et liste les failles avec leur sévérité. À lancer régulièrement et après chaque ajout de dépendance : la faille arrive souvent par une bibliothèque, pas par votre code.",
      },
      {
        kind: "text",
        text: "`npm audit fix` propose des mises à jour automatiques — relisez ce qu'il change avant d'accepter, car monter une version majeure peut casser du code. En CI, `npm audit --audit-level=moderate` fait échouer le pipeline au-delà d'un seuil de sévérité.",
      },
      {
        kind: "list",
        items: [
          "Moins de dépendances = moins de surface d'attaque : chaque paquet doit justifier son existence.",
          "Le lockfile (`package-lock.json`) versionné garantit que tous installent les mêmes versions auditées.",
          "Mettez à jour régulièrement : une vulnérabilité corrigée en amont ne vous protège que si vous mettez à jour.",
        ],
      },
    ],
  },
  {
    id: "validation-entrees",
    title: "Validation des entrées",
    level: 2,
    intro: "Valider en entrée : le premier filtre, côté serveur.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Validation par allowlist",
        code: `function validateUsername(input) {\n  // Allowlist : on définit ce qui est ACCEPTÉ, pas ce qui est interdit\n  if (typeof input !== "string") return null;\n  const clean = input.trim();\n  if (clean.length < 3 || clean.length > 30) return null;\n  if (!/^[a-zA-Z0-9_-]+$/.test(clean)) return null;\n  return clean;\n}`,
      },
      {
        kind: "text",
        text: "Principe de l'allowlist : définir ce qui est accepté (lettres, chiffres, longueur) plutôt que d'essayer d'interdire le mal (les blocklists sont toujours contournables). Validez le type, la longueur, le format — et validez côté serveur même si le client a déjà validé : la validation JavaScript est une aide ergonomique, pas une sécurité.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 2,
    intro: "Les fautes qui ouvrent la porte, classées par gravité.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Conséquence", "Correction"],
        rows: [
          ["Concaténer des entrées dans du SQL", "Injection SQL : lecture/écriture arbitraire", "Requêtes préparées, toujours"],
          ["`innerHTML` avec des données utilisateur", "XSS : script exécuté chez les visiteurs", "`textContent`, échappement du framework"],
          ["Mots de passe en clair ou MD5", "Vol total en cas de fuite de base", "bcrypt / argon2"],
          ["Cookie de session sans `HttpOnly`", "Session volable via XSS", "`HttpOnly; Secure; SameSite=Lax`"],
          ["Pas de validation côté serveur", "Contournement trivial de tous les contrôles", "Revalider chaque entrée côté serveur"],
          ["Dépendances jamais mises à jour", "Failles connues exploitables", "`npm audit` régulier + mises à jour"],
        ],
      },
    ],
  },
  {
    id: "checklist-securite",
    title: "Checklist sécurité minimale",
    level: 2,
    intro: "Avant chaque mise en production.",
    blocks: [
      {
        kind: "list",
        items: [
          "HTTPS partout + redirection HTTP → HTTPS + HSTS.",
          "En-têtes : CSP, `X-Content-Type-Options`, `Referrer-Policy`.",
          "Aucune concaténation d'entrée utilisateur dans du SQL (requêtes préparées / ORM).",
          "Aucun `innerHTML` avec des données non fiables.",
          "Mots de passe hachés (bcrypt/argon2), cookies `HttpOnly; Secure; SameSite`.",
          "`npm audit` propre (ou plan de correction des vulnérabilités restantes).",
          "Messages d'erreur génériques côté client (pas de stack trace en production).",
          "Fichier `security.txt` pour le signalement des failles (voir niveau 3).",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "modele-menaces",
    title: "Modèle de menaces",
    level: 3,
    intro: "Penser comme un attaquant, méthodiquement : qui, quoi, comment.",
    blocks: [
      {
        kind: "text",
        text: "Un modèle de menaces répond à trois questions avant d'écrire la première ligne de défense : quels sont les actifs à protéger (données utilisateurs, sessions, intégrité) ? Qui sont les attaquants plausibles (curieux, automatisé, ciblé) ? Quelles sont les voies d'entrée (formulaires, API, uploads, dépendances) ?",
      },
      {
        kind: "list",
        items: [
          "Listez les actifs par valeur : ce qui vaut cher mérite le plus de défenses.",
          "Listez les points d'entrée : chaque formulaire, chaque endpoint API, chaque upload est une porte.",
          "Pour chaque porte, demandez : « que se passe-t-il si l'entrée est hostile ? » — la réponse donne la défense.",
          "Refaites l'exercice à chaque fonctionnalité sensible : le modèle de menaces vit avec le produit.",
        ],
      },
    ],
  },
  {
    id: "csp-detail",
    title: "Content Security Policy en détail",
    level: 3,
    intro: "La CSP est la défense la plus puissante contre le XSS : la configurer sans se tirer une balle dans le pied.",
    blocks: [
      {
        kind: "code",
        language: "text",
        title: "Politique de départ raisonnable",
        code: `Content-Security-Policy:\n  default-src 'self';\n  script-src 'self';\n  style-src 'self';\n  img-src 'self' data:;\n  object-src 'none';\n  base-uri 'self';\n  frame-ancestors 'none'`,
      },
      {
        kind: "fields",
        title: "Directives clés",
        fields: [
          {
            label: "`script-src 'self'`",
            value:
              "Seuls vos scripts sont exécutés : un script injecté par XSS est bloqué par le navigateur. Le gain principal.",
          },
          {
            label: "`object-src 'none'`",
            value:
              "Interdit plugins et applets : vecteurs historiques d'attaques.",
          },
          {
            label: "`frame-ancestors 'none'`",
            value:
              "Votre page ne peut pas être intégrée en iframe : anti-clickjacking moderne (remplace `X-Frame-Options`).",
          },
          {
            label: "`base-uri 'self'`",
            value:
              "Empêche de redéfinir la base des URLs relatives : bloque une classe d'injections sournoises.",
          },
        ],
      },
      {
        kind: "text",
        text: "Déploiement sans casse : commencez en mode `Content-Security-Policy-Report-Only` (le navigateur signale les violations sans bloquer), corrigez les faux positifs grâce aux rapports, puis basculez en mode bloquant. `script-src 'unsafe-inline'` annule l'essentiel de la protection : bannissez-le.",
      },
    ],
  },
  {
    id: "xss-types",
    title: "Les trois types de XSS",
    level: 3,
    intro: "Stored, reflected, DOM : même nom, trois mécanismes, trois défenses.",
    blocks: [
      {
        kind: "table",
        headers: ["Type", "Mécanisme", "Exemple", "Défense"],
        rows: [
          ["Stored (stocké)", "Le script est enregistré (commentaire, profil) puis servi à tous", "Commentaire malveillant affiché aux visiteurs", "Échapper à l'affichage + CSP"],
          ["Reflected (réfléchi)", "Le script arrive dans l'URL et est renvoyé dans la page", "Page d'erreur qui réaffiche le paramètre `q`", "Échapper + valider les paramètres"],
          ["DOM-based", "Le script est construit côté client par du JS vulnérable", "`element.innerHTML = location.hash`", "Ne jamais injecter de données dans le DOM via `innerHTML`"],
        ],
      },
      {
        kind: "text",
        text: "Le DOM-based est le plus insidieux : le serveur ne voit rien, tout se joue dans le navigateur. Les frameworks (React, Vue, Angular) échappent par défaut à l'affichage — le risque vient des échappatoires manuelles (`dangerouslySetInnerHTML`, `v-html`, `innerHTML`).",
      },
    ],
  },
  {
    id: "xss-defenses-avancees",
    title: "Défenses XSS avancées",
    level: 3,
    intro: "Quand il faut vraiment afficher du HTML riche : les options sûres.",
    blocks: [
      {
        kind: "text",
        text: "Parfois le HTML riche est un besoin réel (éditeur, markdown). Options par ordre de sécurité : 1) markdown rendu côté serveur avec un renderer qui échappe par défaut ; 2) sanitizer côté client (bibliothèque de nettoyage qui ne garde que les balises sûres) ; 3) jamais de regex maison — écrire un sanitizer correct est notoirement difficile.",
      },
      {
        kind: "list",
        items: [
          "Défense en profondeur : échappement + CSP + `HttpOnly` sur les cookies — si une couche cède, les autres tiennent.",
          "Cookies `HttpOnly` : même avec un XSS, le JavaScript ne peut pas lire la session — l'impact est réduit.",
          "Auditez les dépendances front : un composant tiers vulnérable réintroduit le XSS malgré votre code propre.",
        ],
      },
    ],
  },
  {
    id: "sqli-detail",
    title: "Injections SQL : aller plus loin",
    level: 3,
    intro: "Au-delà de la concaténation évidente : les cas subtils.",
    blocks: [
      {
        kind: "text",
        text: "Les cas subtils : les clauses `ORDER BY` ou les noms de colonnes dynamiques (non paramétrables dans la plupart des drivers) — validez-les par allowlist stricte. Les procédures stockées ne protègent que si elles paramètrent elles aussi. Les ORM protègent par défaut, sauf quand on leur demande du SQL brut (`raw()` / `execute()`) : chaque usage de SQL brut doit être relu.",
      },
      {
        kind: "list",
        items: [
          "Identifiants dynamiques (table, colonne) : allowlist de valeurs autorisées, jamais d'entrée brute.",
          "Principe du moindre privilège côté base : le compte applicatif ne doit avoir que les droits nécessaires (pas de DROP, pas d'accès aux autres bases).",
          "Messages d'erreur génériques : une erreur SQL détaillée révèle la structure de la base à l'attaquant.",
        ],
      },
    ],
  },
  {
    id: "requetes-preparees-detail",
    title: "Requêtes préparées : détails",
    level: 3,
    intro: "Pourquoi ça marche, et les limites à connaître.",
    blocks: [
      {
        kind: "text",
        text: "Une requête préparée sépare le plan (la requête avec des placeholders) des données (les valeurs) : la base compile le plan une fois, puis n'y injecte que des valeurs. L'entrée utilisateur ne peut jamais devenir du code parce qu'elle arrive après la compilation.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Placeholders selon le driver",
        code: `// node-postgres (pg) : $1, $2\nawait pool.query("SELECT * FROM users WHERE email = $1", [email]);\n\n// mysql2 : ?\nawait pool.query("SELECT * FROM users WHERE email = ?", [email]);\n\n// Règle : le placeholder dépend du driver,\n// mais le principe est identique partout.`,
      },
    ],
  },
  {
    id: "csrf-tokens-detail",
    title: "Jetons anti-CSRF en détail",
    level: 3,
    intro: "Le pattern synchronizer token : comment ça protège.",
    blocks: [
      {
        kind: "text",
        text: "Principe : le serveur génère une valeur secrète et imprévisible par session, l'injecte dans chaque formulaire, et exige sa présence à chaque requête de modification. Un site attaquant ne connaît pas le jeton (il ne peut pas le lire : same-origin policy) et ne peut donc pas forger une requête valide.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Vérification côté serveur (pseudo-code)",
        code: `function handleTransfer(req, res) {\n  // Le jeton vient du corps, PAS des cookies automatiques\n  const token = req.body.csrfToken;\n  if (!token || token !== req.session.csrfToken) {\n    return res.status(403).send("Jeton CSRF invalide");\n  }\n  // ... traiter le transfert\n}`,
      },
      {
        kind: "text",
        text: "Note moderne : les API consommées en `fetch` avec `SameSite=Lax` + vérification d'origine (`Origin`/`Referer`) couvrent l'essentiel sans jeton. Le jeton reste recommandé pour les formulaires classiques et les applications sensibles.",
      },
    ],
  },
  {
    id: "samesite-detail",
    title: "SameSite en détail",
    level: 3,
    intro: "Trois valeurs, trois comportements : bien choisir.",
    blocks: [
      {
        kind: "table",
        headers: ["Valeur", "Cookie envoyé quand…", "Usage"],
        rows: [
          ["`Strict`", "Uniquement depuis votre site", "Sessions bancaires / admin : protection maximale"],
          ["`Lax`", "Depuis votre site + navigation top-level (lien cliqué)", "Défaut recommandé : bon équilibre sécurité/UX"],
          ["`None`", "Toujours (requiert `Secure`)", "Cookies tiers légitimes (embeds, SSO) — à éviter sinon"],
        ],
      },
      {
        kind: "text",
        text: "`Lax` est le défaut moderne des navigateurs, mais posez-le explicitement : c'est une documentation autant qu'une protection. `None` sans `Secure` est rejeté par les navigateurs — et `None` tout court rouvre la porte au CSRF : ne l'utilisez que pour un besoin tiers réel.",
      },
    ],
  },
  {
    id: "clickjacking",
    title: "Clickjacking",
    level: 3,
    intro: "Piéger le clic : votre page dans une iframe invisible.",
    blocks: [
      {
        kind: "text",
        text: "Le clickjacking superpose votre page (chargée dans une iframe transparente) à un contenu attractif : l'utilisateur croit cliquer sur un bouton innocent et clique en réalité sur « Supprimer mon compte ». La défense est déclarative : interdire l'intégration en iframe.",
      },
      {
        kind: "code",
        language: "text",
        title: "Interdire l'embedding",
        code: `# Moderne (via CSP) : personne ne peut intégrer la page\nContent-Security-Policy: frame-ancestors 'none'\n\n# Variante : n'autoriser que votre propre domaine\nContent-Security-Policy: frame-ancestors 'self'\n\n# Ancien (encore supporté) :\nX-Frame-Options: DENY`,
      },
    ],
  },
  {
    id: "open-redirect",
    title: "Open redirect",
    level: 3,
    intro: "Une redirection ouverte devient un hameçonnage parfait.",
    blocks: [
      {
        kind: "text",
        text: "Une URL comme `https://votre-site.com/redirect?to=https://evil.com` qui redirige sans contrôle donne à l'attaquant un lien « de confiance » vers son piège. La victime voit votre domaine, clique, atterrit sur le faux site.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Allowlist de destinations",
        code: `const ALLOWED = new Set(["/dashboard", "/profil", "/accueil"]);\n\nfunction safeRedirect(to) {\n  // Par défaut : page d'accueil. Jamais d'URL externe brute.\n  if (!to || !ALLOWED.has(to)) return "/";\n  return to;\n}`,
      },
      {
        kind: "text",
        text: "Règle : les redirections post-login n'acceptent que des chemins internes connus (allowlist), jamais des URLs arbitraires. Si un besoin externe existe, maintenez une allowlist de domaines exacts.",
      },
    ],
  },
  {
    id: "ssrf-defense",
    title: "SSRF : défense",
    level: 3,
    intro: "Empêcher le serveur de devenir le complice de l'attaquant.",
    blocks: [
      {
        kind: "text",
        text: "Le SSRF (Server-Side Request Forgery) pousse votre serveur à faire des requêtes à la place de l'attaquant : si votre code télécharge une URL fournie par l'utilisateur (avatar, webhook, prévisualisation de lien), l'attaquant peut viser des adresses internes (métadonnées cloud, services privés) inaccessibles depuis l'extérieur.",
      },
      {
        kind: "list",
        items: [
          "Ne jamais laisser l'utilisateur contrôler librement une URL fetchée côté serveur : allowlist de domaines ou validation stricte.",
          "Bloquer les plages privées (10.0.0.0/8, 169.254.169.254…) au niveau réseau : même une validation contournée ne doit pas atteindre l'interne.",
          "Désactiver les redirections automatiques sur ces fetches, ou les revalider à chaque étape.",
          "Timeouts courts : un fetch serveur ne doit jamais pendre indéfiniment.",
        ],
      },
    ],
  },
  {
    id: "jwt-securise",
    title: "JWT : usage sécurisé",
    level: 3,
    intro: "Les jetons auto-porteurs sont pratiques — et piégeux.",
    blocks: [
      {
        kind: "text",
        text: "Un JWT transporte l'identité et les droits dans le jeton lui-même (pratique pour les APIs sans état). Mais « auto-porteur » signifie : quiconque possède le jeton a les droits. Volé = usurpé, jusqu'à expiration.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Vérification stricte",
        code: `import jwt from "jsonwebtoken";\n\nconst payload = jwt.verify(token, SECRET, {\n  algorithms: ["HS256"], // allowlist d'algos : jamais "none"\n  maxAge: "15m",         // durée de vie courte\n  issuer: "mon-app",      // vérifie l'émetteur\n});`,
      },
      {
        kind: "list",
        items: [
          "Algorithme imposé côté serveur : l'attaque `alg: none` (jeton non signé accepté) vient d'une vérification laxiste.",
          "Durée de vie courte (minutes) + refresh tokens : limite la fenêtre d'usurpation.",
          "Ne jamais mettre de données sensibles dans le payload : il est signé, pas chiffré (lisible par tous).",
          "Révocation : un JWT ne se révoque pas nativement — prévoyez une blocklist ou des durées très courtes pour les cas sensibles.",
        ],
      },
    ],
  },
  {
    id: "sessions-avance",
    title: "Sessions : détails",
    level: 3,
    intro: "Le suivi de l'utilisateur connecté, sans faute.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Cookie de session correct",
        code: `res.cookie("sessionId", sessionId, {\n  httpOnly: true,  // invisible pour document.cookie (anti-XSS)\n  secure: true,    // HTTPS uniquement\n  sameSite: "lax", // anti-CSRF\n  maxAge: 1000 * 60 * 60 * 2, // 2 heures\n  path: "/",\n});`,
      },
      {
        kind: "list",
        items: [
          "Régénérez l'identifiant de session à la connexion (anti fixation de session).",
          "Stockez le minimum côté client : un identifiant opaque, les données restent serveur.",
          "Déconnexion = invalidation serveur : supprimer le cookie ne suffit pas si la session vit encore.",
          "Surveillez les sessions : nombre anormal, IPs incohérentes — journalisez (sans les secrets).",
        ],
      },
    ],
  },
  {
    id: "mots-de-passe-avance",
    title: "Mots de passe : hachage",
    level: 3,
    intro: "Stocker des mots de passe sans pouvoir les relire : bcrypt/argon2.",
    blocks: [
      {
        kind: "command",
        label: "Installer bcrypt",
        command: "npm install bcrypt",
        why: "bcrypt est un algorithme de hachage conçu pour les mots de passe : lent volontairement (résiste au brute force) avec sel intégré. Alternative moderne : argon2, gagnant du concours de hachage de mots de passe.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Hacher et vérifier",
        code: `import bcrypt from "bcrypt";\n\n// À l'inscription : on stocke le hash, jamais le mot de passe\nconst hash = await bcrypt.hash(password, 12);\nawait db.saveUser({ email, hash });\n\n// À la connexion : on compare, on ne \"déchiffre\" jamais\nconst ok = await bcrypt.compare(password, user.hash);\nif (!ok) return res.status(401).send("Identifiants invalides");`,
      },
      {
        kind: "text",
        text: "Le facteur de coût (`12` ici) règle la lenteur : augmentez-le avec la puissance des machines. Message d'erreur identique que l'email soit inconnu ou le mot de passe faux : ne révélez jamais quel compte existe.",
      },
    ],
  },
  {
    id: "rate-limiting",
    title: "Rate limiting",
    level: 3,
    intro: "Limiter les tentatives : contre le brute force et l'abus.",
    blocks: [
      {
        kind: "text",
        text: "Sans limite de débit, un attaquant peut essayer des milliers de mots de passe ou inonder votre API. Le rate limiting borne les requêtes par IP / par compte / par endpoint — c'est une défense simple contre le brute force, le scraping et le déni de service élémentaire.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Principe (logique)",
        code: `// Pseudo-code : compteur par clé, fenêtre glissante\nconst attempts = new Map(); // clé -> { count, resetAt }\n\nfunction isAllowed(key, max = 5, windowMs = 15 * 60 * 1000) {\n  const now = Date.now();\n  const entry = attempts.get(key);\n  if (!entry || now > entry.resetAt) {\n    attempts.set(key, { count: 1, resetAt: now + windowMs });\n    return true;\n  }\n  entry.count += 1;\n  return entry.count <= max;\n}\n// En production : utilisez un middleware éprouvé + stockage partagé (Redis).`,
      },
      {
        kind: "list",
        items: [
          "Login : 5 tentatives / 15 min par compte ET par IP, puis verrouillage temporaire.",
          "Réponse 429 (Too Many Requests) avec en-tête `Retry-After` : le standard.",
          "En production, préférez un middleware éprouvé et un stockage partagé (Redis) plutôt que ce pseudo-code.",
        ],
      },
    ],
  },
  {
    id: "upload-fichiers",
    title: "Upload de fichiers",
    level: 3,
    intro: "Laisser l'utilisateur envoyer des fichiers sans lui donner les clés du serveur.",
    blocks: [
      {
        kind: "list",
        items: [
          "Validez côté serveur : type MIME réel (pas l'extension), taille maximale, contenu (un « PNG » qui est un script reste un script).",
          "Renommez les fichiers (UUID) : le nom d'origine peut contenir des traversées de chemin (`../../`).",
          "Stockez hors de la racine web : un fichier uploadé ne doit jamais être exécutable comme du code.",
          "Servez avec `Content-Disposition: attachment` et le bon `Content-Type` pour les fichiers non affichables.",
          "Antivirus sur les uploads sensibles (documents partagés) : défense en profondeur.",
        ],
      },
    ],
  },
  {
    id: "secrets",
    title: "Gestion des secrets",
    level: 3,
    intro: "Clés API, mots de passe DB : jamais dans le code, jamais dans Git.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: ".env et .gitignore",
        code: `# .env (jamais commité)\nDATABASE_URL="postgres://user:pass@host/db"\nJWT_SECRET="valeur-longue-aleatoire"\nSTRIPE_SECRET_KEY="sk_live_..."\n\n# .gitignore\n.env\n.env.local`,
      },
      {
        kind: "list",
        items: [
          "Variables d'environnement en production (fournisseur, vault) : pas de `.env` sur le serveur si la plateforme offre un gestionnaire de secrets.",
          "Un secret commité est un secret compromis : le révoquer immédiatement (l'historique Git n'oublie pas).",
          "Séparez les secrets par environnement : la clé de dev ne doit pas ouvrir la prod.",
          "Rotation régulière des secrets critiques, surtout après un départ ou un incident.",
        ],
      },
    ],
  },
  {
    id: "logs-securite",
    title: "Journalisation sécurité",
    level: 3,
    intro: "Logger pour détecter, sans logger ce qui doit rester secret.",
    blocks: [
      {
        kind: "fields",
        title: "Que journaliser",
        fields: [
          {
            label: "À logger",
            value:
              "Tentatives de connexion (réussies/échouées), changements de mot de passe, élévations de privilèges, erreurs 4xx/5xx anormales, accès admin. Horodatés, avec IP et identifiant.",
          },
          {
            label: "À NE JAMAIS logger",
            value:
              "Mots de passe, jetons, secrets, numéros de carte, données de santé. Un log qui contient un secret devient un secret à protéger.",
          },
          {
            label: "Alertes",
            value:
              "Seuils sur les échecs de login, pics d'erreurs, accès hors horaires : un log que personne ne lit ne sert à rien.",
          },
        ],
      },
      {
        kind: "text",
        text: "Les logs sont aussi une obligation dans plusieurs cadres (et la famille A09 de l'OWASP Top 10 sanctionne leur absence) : sans journalisation, un incident est indétectable et inanalysable.",
      },
    ],
  },
  {
    id: "security-txt",
    title: "security.txt",
    level: 3,
    intro: "Dire aux chercheurs en sécurité comment vous contacter : le standard.",
    blocks: [
      {
        kind: "code",
        language: "text",
        title: "/.well-known/security.txt",
        code: `Contact: mailto:security@example.com\nExpires: 2026-12-31T23:59:59.000Z\nPreferred-Languages: fr, en\n# Politique complète : https://example.com/politique-securite`,
      },
      {
        kind: "text",
        text: "Le fichier `security.txt` (standard RFC 9116) placé sous `/.well-known/` indique où signaler une faille. Sans point de contact, les chercheurs bienveillants ne peuvent pas vous prévenir — et ce sont souvent eux qui trouvent les failles avant les attaquants.",
      },
    ],
  },
  {
    id: "cors",
    title: "CORS",
    level: 3,
    intro: "Contrôler quels sites peuvent appeler votre API depuis un navigateur.",
    blocks: [
      {
        kind: "text",
        text: "La same-origin policy bloque par défaut les appels cross-origin depuis un navigateur. CORS permet d'ouvrir sélectivement : votre front `https://app.example.com` peut appeler `https://api.example.com`, mais pas n'importe quel site.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Configuration stricte",
        code: `// Autoriser UNE origine exacte, jamais "*"\n// quand des identifiants sont en jeu\nres.setHeader("Access-Control-Allow-Origin", "https://app.example.com");\nres.setHeader("Access-Control-Allow-Credentials", "true");\nres.setHeader("Access-Control-Allow-Methods", "GET, POST");`,
      },
      {
        kind: "text",
        text: "Erreur classique : `Access-Control-Allow-Origin: *` avec `Allow-Credentials: true` — les navigateurs le refusent, et à raison : c'est ouvrir l'API à tout site avec les cookies de l'utilisateur. Listez explicitement vos origines.",
      },
    ],
  },
  {
    id: "idor",
    title: "IDOR : contrôle d'accès",
    level: 3,
    intro: "Vérifier que l'utilisateur a le droit — sur chaque objet.",
    blocks: [
      {
        kind: "text",
        text: "L'IDOR (Insecure Direct Object Reference, famille A01 de l'OWASP Top 10 — la plus fréquente) : l'API vérifie que l'utilisateur est connecté, mais pas qu'il possède la ressource demandée. Changer `?invoice=123` en `?invoice=124` affiche la facture d'un autre.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Vérifier la propriété",
        code: `app.get("/invoices/:id", async (req, res) => {\n  const invoice = await db.invoices.find(req.params.id);\n  // Contrôle d'accès : la facture appartient-elle à l'utilisateur ?\n  if (!invoice || invoice.ownerId !== req.user.id) {\n    return res.status(404).send("Introuvable"); // 404, pas 403 : ne pas révéler l'existence\n  }\n  res.json(invoice);\n});`,
      },
      {
        kind: "text",
        text: "Règle : chaque accès à un objet vérifie la propriété ou le rôle — pas seulement l'authentification. Retournez 404 plutôt que 403 pour ne pas révéler qu'une ressource existe.",
      },
    ],
  },
  {
    id: "mass-assignment",
    title: "Mass assignment",
    level: 3,
    intro: "Ne laissez pas l'utilisateur écrire les champs qu'il veut.",
    blocks: [
      {
        kind: "text",
        text: "Le mass assignment : `User.update(req.body)` où `req.body` contient `isAdmin: true`. Si l'ORM assigne tous les champs reçus, l'utilisateur s'octroie des privilèges en ajoutant un champ au formulaire.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Allowlist de champs",
        code: `// DANGEREUX : tous les champs du corps sont assignés\n// await user.update(req.body);\n\n// SÛR : seuls les champs autorisés sont pris en compte\nconst { name, bio } = req.body;\nawait user.update({ name, bio });`,
      },
    ],
  },
  {
    id: "dependances-avance",
    title: "Dépendances : aller plus loin",
    level: 3,
    intro: "Au-delà de `npm audit` : politique de dépendances.",
    blocks: [
      {
        kind: "list",
        items: [
          "Lockfile versionné et `npm ci` en CI : tout le monde installe exactement les versions auditées.",
          "Mises à jour planifiées (mensuelles) : les correctifs de sécurité ne s'appliquent pas tout seuls.",
          "Évaluer avant d'ajouter : maintenance active ? nombre de dépendances transitives ? Le paquet d'un inconnu pour 3 lignes de code est un mauvais pari.",
          "Dependabot / Renovate : les PR automatiques de mise à jour transforment la corvée en routine relue.",
          "Politique de retrait : une dépendance abandonnée se remplace avant de devenir une faille.",
        ],
      },
    ],
  },
  {
    id: "pentest-defensif",
    title: "Se faire auditer : pentest",
    level: 3,
    intro: "Quand et comment faire tester son application par un tiers.",
    blocks: [
      {
        kind: "text",
        text: "Un test d'intrusion (pentest) est un audit offensif encadré : un professionnel autorisé cherche les failles de votre application et vous remet un rapport avec correctifs. C'est le complément du développement sécurisé, pas son remplaçant — un pentest sur une base saine trouve les failles subtiles, pas les classiques.",
      },
      {
        kind: "list",
        items: [
          "Quand : avant un lancement sensible, après des changements majeurs, ou périodiquement (annuel) pour les applications critiques.",
          "Cadre : périmètre écrit, autorisation formelle, environnement de test — jamais de test sauvage sur la prod.",
          "Outils d'auto-évaluation : OWASP ZAP (proxy d'interception et scanner, open source) permet un premier balayage en interne.",
          "Après : corrigez par criticité, puis faites re-tester les correctifs — un rapport sans suivi ne sert à rien.",
        ],
      },
    ],
  },
  {
    id: "reponse-incident",
    title: "Réponse à incident",
    level: 3,
    intro: "Quand la faille est exploitée : le plan avant la panique.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Contenir",
            detail:
              "Isoler le système compromis (couper l'accès, révoquer les secrets et sessions) sans détruire les preuves. La priorité est d'arrêter l'hémorragie.",
          },
          {
            title: "Évaluer",
            detail:
              "Quelles données sont touchées ? Depuis quand ? Préservez les logs : ils diront l'étendue de la compromission.",
          },
          {
            title: "Éradiquer",
            detail:
              "Corriger la faille à la racine (pas seulement ses symptômes), réinitialiser les secrets compromis, forcer les changements de mots de passe si nécessaire.",
          },
          {
            title: "Notifier",
            detail:
              "Utilisateurs concernés, autorités si la réglementation l'exige (ex. RGPD : 72 h). La transparence calibrée vaut mieux que la découverte par un tiers.",
          },
          {
            title: "Apprendre",
            detail:
              "Post-mortem sans chasse aux sorcières : quelle défense a manqué, quel test l'aurait attrapée, que change-t-on dans le processus.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-avancees",
    title: "Erreurs avancées",
    level: 3,
    intro: "Les fautes subtiles qui survivent aux checklists.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Pourquoi c'est tentant", "La réalité"],
        rows: [
          ["Valider uniquement côté client", "L'UX est immédiate", "Le client est contrôlé par l'attaquant : revalider serveur"],
          ["`target=\"_blank\"` sans `rel`", "Ouvrir un lien externe", "Ajoutez `rel=\"noopener\"` : sinon la page cible pilote votre onglet"],
          ["Stack traces en production", "Debug plus facile", "Elles révèlent versions et chemins : logs serveur uniquement"],
          ["IDs séquentiels exposés", "Simple à implémenter", "Énumérables : préférez des UUID opaques pour les ressources sensibles"],
          ["« Sécurité par obscurité »", "Cacher l'endpoint", "Un secret n'est pas une défense : l'obscurité complète, ne remplace pas"],
        ],
      },
    ],
  },
  {
    id: "projets",
    title: "Projets pour pratiquer",
    level: 3,
    intro: "Trois projets défensifs progressifs.",
    blocks: [
      {
        kind: "list",
        items: [
          "Durcir une application démo : partez d'une petite app (login + commentaires), appliquez la checklist (CSP, requêtes préparées, cookies sécurisés, validation serveur) et vérifiez avec `curl -I` et un audit des dépendances.",
          "Audit d'en-têtes : auditez 3 sites (les vôtres ou des démos), notez les en-têtes manquants, proposez les corrections — l'œil se forme en auditant.",
          "Journal de bord sécurité : sur un projet réel, tenez un registre des décisions de sécurité (pourquoi ce choix, quelle menace il couvre) — la sécurité documentée se maintient.",
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Les références officielles, en priorité.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle",
        fields: [
          {
            label: "owasp.org",
            value:
              "Le site de l'OWASP : Top 10, Cheat Sheet Series (fiches pratiques par sujet), guides de test. La référence défensive.",
          },
          {
            label: "OWASP Cheat Sheet Series",
            value:
              "Des fiches concises et actionnables : authentification, XSS, injections, gestion des sessions — à garder sous la main pendant le développement.",
          },
          {
            label: "MDN — Sécurité web",
            value:
              "La documentation MDN sur les en-têtes, CORS, CSP : précise et à jour, avec la compatibilité navigateurs.",
          },
        ],
      },
      {
        kind: "text",
        text: "Réflexe : devant une question (« comment stocker un mot de passe ? »), la cheat sheet OWASP correspondante donne la réponse consensuelle de l'industrie — c'est plus fiable qu'un tutoriel au hasard.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite",
    level: 3,
    intro: "La sécurité web ouvre sur tout le spectre de la sécurité applicative.",
    blocks: [
      {
        kind: "fields",
        title: "Continuer dans la roadmap",
        fields: [
          {
            label: "authentication",
            value:
              "Approfondir : OAuth/OIDC, MFA, passkeys — l'authentification moderne au-delà des bases.",
          },
          {
            label: "cryptography",
            value:
              "Comprendre hachage, chiffrement, signatures : les fondations techniques des défenses.",
          },
          {
            label: "owasp",
            value:
              "Le projet OWASP dans son ensemble : guides, outils (ZAP), méthodologies de test.",
          },
          {
            label: "api-integration",
            value:
              "Sécuriser les APIs : authentification, quotas, validation — la surface d'attaque moderne.",
          },
          {
            label: "cybersecurity-engineer",
            value:
              "Pour aller vers le versant offensif encadré : pentest, méthodologies, réponse à incident.",
          },
        ],
      },
    ],
  },
];

import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de la cryptographie appliquée : du chiffrement
 * symétrique à TLS et à la gestion des clés, avec des exemples OpenSSL réels.
 * 3 niveaux (Aperçu / Pratique / Approfondi) avec divulgation progressive.
 * Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_CRYPTOGRAPHY: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce que la cryptographie garantit — et ce qu'elle ne garantit pas.",
    blocks: [
      {
        kind: "text",
        text: "La cryptographie est l'art de protéger l'information par les mathématiques : elle garantit la confidentialité (personne d'autre ne peut lire), l'intégrité (personne n'a modifié), l'authenticité (ça vient bien de qui on croit) et la non-répudiation (l'auteur ne peut pas nier).",
      },
      {
        kind: "text",
        text: "Idée reçue n°1 à abandonner immédiatement : la sécurité d'un système cryptographique repose sur le secret de la clé, jamais sur le secret de l'algorithme. Les algorithmes sont publics, audités par le monde entier — c'est précisément ce qui les rend dignes de confiance.",
      },
      {
        kind: "diagram",
        title: "Les quatre garanties",
        lines: [
          "CONFIDENTIALITÉ",
          "  chiffrer : rendre illisible sans la clé",
          "  ex. messages, disques, sauvegardes",
          "",
          "INTÉGRITÉ",
          "  détecter toute modification",
          "  ex. hachage, MAC, signatures",
          "",
          "AUTHENTICITÉ",
          "  prouver l'origine",
          "  ex. signatures, certificats, HMAC",
          "",
          "NON-RÉPUDIATION",
          "  l'auteur ne peut pas nier avoir signé",
          "  ex. signature avec clé privée",
        ],
      },
    ],
  },
  {
    id: "symetrique-vs-asymetrique",
    title: "Symétrique vs asymétrique",
    level: 1,
    intro:
      "Les deux familles de chiffrement, et quand utiliser chacune.",
    blocks: [
      {
        kind: "fields",
        title: "Les deux familles",
        fields: [
          {
            label: "Chiffrement symétrique",
            value:
              "Une seule clé pour chiffrer et déchiffrer. Rapide, adapté aux gros volumes (fichiers, disques, flux). Problème : comment transmettre la clé à l'autre partie sans qu'elle soit interceptée ?",
          },
          {
            label: "Chiffrement asymétrique",
            value:
              "Une paire de clés : publique (on chiffre avec, on la diffuse) et privée (on déchiffre avec, on la garde secrète). Résout le problème de distribution, mais lent — on ne chiffre jamais de gros volumes directement avec.",
          },
          {
            label: "En pratique : les deux",
            value:
              "Les protocoles réels (TLS) combinent : l'asymétrique pour s'authentifier et échanger une clé de session, puis le symétrique pour le reste de la conversation. C'est le schéma hybride.",
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
      "Le minimum pour manipuler sans se blesser.",
    blocks: [
      {
        kind: "fields",
        title: "Socle nécessaire",
        fields: [
          {
            label: "Ligne de commande",
            value:
              "Tous les exemples utilisent OpenSSL en terminal. Savoir naviguer, créer des fichiers et lire une sortie suffit.",
          },
          {
            label: "Bases des nombres",
            value:
              "Comprendre hexadécimal et base64 — les clés et empreintes s'affichent dans ces formats. Pas besoin de théorie des nombres pour l'usage courant.",
          },
          {
            label: "Modèle menace",
            value:
              "Toujours se demander : qui est l'adversaire, que peut-il voir, que doit-il ignorer ? Un chiffrement parfait avec la clé collée sur l'écran ne protège rien.",
          },
        ],
      },
    ],
  },
  {
    id: "hachage-sha256",
    title: "Hachage : SHA-256",
    level: 2,
    intro:
      "L'empreinte numérique : vérifier l'intégrité d'un fichier.",
    blocks: [
      {
        kind: "text",
        text: "Une fonction de hachage transforme des données de taille quelconque en une empreinte de taille fixe. Propriétés : déterministe (même entrée → même empreinte), irréversible (on ne retrouve pas l'entrée), sensible (un bit changé → empreinte totalement différente), résistante aux collisions.",
      },
      {
        kind: "command",
        label: "Calculer l'empreinte SHA-256 d'un fichier",
        command: "openssl dgst -sha256 document.pdf",
        why: "Affiche l'empreinte SHA-256 du fichier. En la comparant avec l'empreinte publiée par l'auteur, on vérifie que le fichier n'a pas été altéré pendant le téléchargement.",
        verify: "openssl dgst -sha256 document.pdf",
      },
      {
        kind: "list",
        items: [
          "Usage n°1 : vérifier l'intégrité des téléchargements (ISO, binaires).",
          "Usage n°2 : identifier un contenu (l'empreinte d'un fichier le désigne de façon unique en pratique).",
          "Le hachage seul ne prouve pas l'origine : un attaquant peut hacher son propre fichier piégé. L'authenticité exige une signature.",
          "Algorithmes à éviter : MD5 et SHA-1 sont cassés pour la résistance aux collisions — ne plus les utiliser pour de la sécurité.",
        ],
      },
    ],
  },
  {
    id: "mots-de-passe-hachage",
    title: "Hachage des mots de passe",
    level: 2,
    intro:
      "Pourquoi on ne stocke jamais un mot de passe — même haché simplement.",
    blocks: [
      {
        kind: "list",
        items: [
          "On ne stocke jamais le mot de passe : on stocke le résultat d'une fonction de hachage adaptée, et on compare à la connexion.",
          "SHA-256 seul ne suffit pas : il est trop rapide — un attaquant teste des milliards de candidats par seconde (attaque par dictionnaire + rainbow tables).",
          "Solution : fonctions lentes et salées — bcrypt, scrypt, Argon2. Le sel (aléatoire par utilisateur) empêche les tables précalculées ; la lenteur rend le brute-force coûteux.",
          "En pratique : utiliser la fonction de hachage de mots de passe de votre framework (jamais un hachage maison), avec les paramètres par défaut actuels.",
          "Pendant un incident, des hash volés = des mots de passe à considérer comme compromis si l'algorithme est faible.",
        ],
      },
    ],
  },
  {
    id: "chiffrement-symetrique",
    title: "Chiffrement symétrique : AES",
    level: 2,
    intro:
      "Chiffrer un fichier avec une clé — le cas d'usage le plus direct.",
    blocks: [
      {
        kind: "command",
        label: "Générer une clé aléatoire de 256 bits",
        command: "openssl rand -hex 32",
        why: "Génère 32 octets aléatoires (256 bits) affichés en hexadécimal : une clé AES-256. L'aléa vient du générateur cryptographique du système — jamais de clé inventée « à la main ».",
      },
      {
        kind: "command",
        label: "Chiffrer un fichier (mot de passe)",
        command: "openssl enc -aes-256-cbc -pbkdf2 -in secret.txt -out secret.enc",
        why: "Chiffre avec AES-256-CBC en dérivant une clé du mot de passe demandé (PBKDF2). L'option -pbkdf2 est indispensable : sans elle, la dérivation historique d'OpenSSL est faible.",
        verify: "ls -l secret.enc",
      },
      {
        kind: "command",
        label: "Déchiffrer",
        command: "openssl enc -d -aes-256-cbc -pbkdf2 -in secret.enc -out secret-clair.txt",
        why: "L'option -d inverse l'opération avec le même mot de passe. Un mauvais mot de passe produit une erreur (ou des données illisibles) — pas de « presque bon ».",
      },
      {
        kind: "text",
        text: "Note : AES-CBC chiffre mais n'authentifie pas — en production, on préfère un mode authentifié (AES-GCM) qui détecte toute modification. OpenSSL le supporte, mais sa gestion manuelle de l'IV est piégeuse : pour du code applicatif, utilisez une bibliothèque haut niveau.",
      },
    ],
  },
  {
    id: "generation-aleatoire",
    title: "Génération aléatoire",
    level: 2,
    intro:
      "L'aléa est le fondement : clés, sels, tokens.",
    blocks: [
      {
        kind: "command",
        label: "Générer des octets aléatoires",
        command: "openssl rand -base64 32",
        why: "Produit 32 octets aléatoires encodés en base64 : parfait pour un token, un sel ou un secret d'API. Le générateur d'OpenSSL utilise l'aléa cryptographique du système.",
      },
      {
        kind: "list",
        items: [
          "Règle absolue : les secrets viennent d'un générateur cryptographique (`openssl rand`, `/dev/urandom`, `secrets` en Python) — jamais de `Math.random()`, jamais de dates, jamais de « mot compliqué inventé ».",
          "Taille : 128 bits minimum pour un secret (16 octets), 256 bits par défaut (32 octets). En dessous, le brute-force devient envisageable.",
          "Un token de réinitialisation de mot de passe prévisible = une prise de contrôle de compte. L'aléa faible est une vulnérabilité critique.",
        ],
      },
    ],
  },
  {
    id: "chiffrement-asymetrique-rsa",
    title: "Asymétrique : générer une paire RSA",
    level: 2,
    intro:
      "Créer une paire de clés et comprendre les rôles.",
    blocks: [
      {
        kind: "command",
        label: "Générer une clé privée RSA 2048 bits",
        command: "openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out cle-privee.pem",
        why: "Crée la clé privée (à protéger absolument). 2048 bits est le minimum actuel ; 4096 pour une longue durée de vie. La clé privée ne quitte jamais la machine qui l'a générée.",
        verify: "ls -l cle-privee.pem",
      },
      {
        kind: "command",
        label: "Extraire la clé publique",
        command: "openssl rsa -in cle-privee.pem -pubout -out cle-publique.pem",
        why: "Dérive la clé publique depuis la privée. C'est elle qu'on diffuse : elle permet de chiffrer pour vous (seul vous déchiffrez) ou de vérifier vos signatures.",
      },
      {
        kind: "list",
        items: [
          "Permissions : `chmod 600 cle-privee.pem` — lisible uniquement par son propriétaire.",
          "La clé publique n'a pas besoin d'être secrète, mais elle doit être authentique : une fausse clé publique = un attaquant qui se fait passer pour vous.",
          "En pratique moderne, on préfère souvent les courbes elliptiques (Ed25519) : clés plus petites, plus rapides — mais RSA reste le plus universel.",
        ],
      },
    ],
  },
  {
    id: "signatures-numeriques",
    title: "Signatures numériques",
    level: 2,
    intro:
      "Prouver l'origine et l'intégrité : signer et vérifier.",
    blocks: [
      {
        kind: "command",
        label: "Signer un fichier",
        command: "openssl dgst -sha256 -sign cle-privee.pem -out document.sig document.pdf",
        why: "Produit une signature : preuve que le détenteur de la clé privée a validé ce fichier exact. La signature couvre le hachage du fichier — toute modification invalide la vérification.",
      },
      {
        kind: "command",
        label: "Vérifier une signature",
        command: "openssl dgst -sha256 -verify cle-publique.pem -signature document.sig document.pdf",
        why: "Vérifie avec la clé publique : « Verified OK » prouve origine + intégrité. C'est le mécanisme derrière les mises à jour logicielles signées et les certificats.",
      },
      {
        kind: "text",
        text: "Signer ≠ chiffrer : une signature ne rend pas le document secret, elle le rend authentique. Les deux se combinent (signer puis chiffrer) quand il faut les deux garanties.",
      },
    ],
  },
  {
    id: "cas-usage-quotidiens",
    title: "Cas d'usage quotidiens",
    level: 2,
    intro:
      "Où la cryptographie travaille déjà pour vous.",
    blocks: [
      {
        kind: "fields",
        title: "Les usages invisibles",
        fields: [
          {
            label: "HTTPS / TLS",
            value:
              "Chaque page web : chiffrement + authentification du serveur. Le cadenas du navigateur repose sur toute la chaîne décrite ici.",
          },
          {
            label: "SSH",
            value:
              "L'échange de clés à la première connexion, puis le chiffrement symétrique du terminal. L'empreinte du serveur à vérifier, c'est de l'authenticité.",
          },
          {
            label: "Chiffrement de disque",
            value:
              "AES-XTS sur les disques (BitLocker, LUKS, FileVault) : un laptop volé éteint est illisible sans la clé.",
          },
          {
            label: "Messageries chiffrées",
            value:
              "Chiffrement de bout en bout : seuls les participants lisent, pas le serveur. La vérification des clés (code de sécurité) est l'étape d'authenticité.",
          },
          {
            label: "Mots de passe",
            value:
              "Hachage salé et lent côté serveur (voir section dédiée).",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-debutant",
    title: "Erreurs de débutant",
    level: 2,
    intro:
      "Les fautes classiques — à connaître pour ne pas les commettre.",
    blocks: [
      {
        kind: "list",
        items: [
          "Inventer son propre algorithme ou protocole : la règle d'or « don't roll your own crypto ». Utiliser des standards éprouvés (TLS, libsodium, primitives des frameworks).",
          "Clé codée en dur dans le code source : visible par tous ceux qui ont le dépôt. Les clés vivent dans des gestionnaires de secrets, jamais dans Git.",
          "Aléa faible : `Math.random()` ou l'heure pour générer un token — prévisible, donc inutile.",
          "MD5/SHA-1 pour de la sécurité : cassés — SHA-256 minimum pour le hachage.",
          "Chiffrer sans authentifier : un chiffrement non authentifié peut être modifié sans détection — préférer les modes authentifiés (GCM).",
          "Ignorer la vérification du certificat (« juste pour le dev ») : ce code finit toujours en production.",
        ],
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Workflow quotidien",
    level: 2,
    intro:
      "Les réflexes crypto d'un développeur ou admin.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Vérifier avant d'exécuter",
            detail:
              "Binaire téléchargé ? Comparer son SHA-256 avec l'empreinte officielle, et vérifier la signature si elle existe.",
          },
          {
            title: "Générer proprement",
            detail:
              "Tout secret (clé, token, sel) vient d'un générateur cryptographique, avec une taille suffisante.",
          },
          {
            title: "Stocker séparément",
            detail:
              "Secrets dans le gestionnaire de secrets, jamais dans le code ni dans les logs. Permissions restrictives sur les fichiers de clés.",
          },
          {
            title: "Chiffrer les données sensibles au repos",
            detail:
              "Sauvegardes, exports, disques : si ça contient des données sensibles, c'est chiffré.",
          },
          {
            title: "Rester à jour",
            detail:
              "TLS, bibliothèques crypto et paramètres (tailles de clés) suivent les recommandations actuelles — revoir périodiquement.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "aes-modes",
    title: "AES : les modes d'opération",
    level: 3,
    intro: "Pourquoi le mode compte autant que l'algorithme.",
    blocks: [
      {
        kind: "fields",
        title: "Les modes essentiels",
        fields: [
          {
            label: "ECB (à bannir)",
            value:
              "Chiffre chaque bloc indépendamment : deux blocs identiques donnent deux chiffrés identiques — les motifs du clair transparaissent. Ne jamais utiliser (sauf contre-exemple pédagogique).",
          },
          {
            label: "CBC",
            value:
              "Chaîne les blocs via un IV (vecteur d'initialisation) : sûr si l'IV est aléatoire et unique par message. Mais n'authentifie pas — vulnérable aux modifications.",
          },
          {
            label: "GCM (recommandé)",
            value:
              "Mode authentifié : chiffrement + tag d'intégrité en une passe. Détecte toute modification. Le standard actuel pour les données et TLS.",
          },
          {
            label: "XTS",
            value:
              "Conçu pour le chiffrement de disque (accès aléatoire aux secteurs).",
          },
          {
            label: "Règle sur l'IV/nonce",
            value:
              "Jamais réutilisé avec la même clé (en GCM, une réutilisation de nonce est catastrophique). Aléatoire ou compteur unique — jamais constant.",
          },
        ],
      },
    ],
  },
  {
    id: "rsa-fondements",
    title: "RSA : fondements et limites",
    level: 3,
    intro: "Comprendre ce qui fait la sécurité de RSA.",
    blocks: [
      {
        kind: "text",
        text: "La sécurité de RSA repose sur la difficulté de factoriser de grands nombres : multiplier deux grands premiers est facile, retrouver les facteurs depuis le produit est impraticable aux tailles utilisées. La clé publique contient le produit (et l'exposant), la clé privée les facteurs.",
      },
      {
        kind: "list",
        items: [
          "Tailles : 2048 bits minimum aujourd'hui, 3072+ pour durer. En dessous, la factorisation devient envisageable.",
          "Padding obligatoire : RSA « à nu » (textbook) est vulnérable — toujours un padding sûr (OAEP pour le chiffrement, PSS pour les signatures). Les outils modernes l'appliquent par défaut.",
          "RSA est lent : on ne chiffre jamais de données volumineuses directement — uniquement des clés ou des hachages (signatures).",
          "Le vrai risque RSA n'est pas mathématique mais opérationnel : mauvaise génération d'aléa, clé trop petite, padding absent, clé privée exposée.",
        ],
      },
    ],
  },
  {
    id: "courbes-elliptiques",
    title: "Courbes elliptiques : ECDH, ECDSA, Ed25519",
    level: 3,
    intro: "La cryptographie moderne en clés compactes.",
    blocks: [
      {
        kind: "fields",
        title: "L'essentiel",
        fields: [
          {
            label: "Principe",
            value:
              "La sécurité repose sur le problème du logarithme discret sur courbe elliptique. À sécurité égale, clés bien plus petites que RSA (256 bits ≈ RSA 3072).",
          },
          {
            label: "ECDH",
            value:
              "Échange de clés : deux parties dérivent un secret partagé sans jamais le transmettre. Au cœur de TLS 1.3 (avec éphémère : secret différent à chaque session).",
          },
          {
            label: "ECDSA / Ed25519",
            value:
              "Signatures. Ed25519 est la variante moderne recommandée : rapide, sûre, sans pièges de paramétrage. C'est le défaut de SSH et de beaucoup de systèmes récents.",
          },
          {
            label: "En pratique",
            value:
              "Préférer Ed25519/X25519 quand c'est supporté ; ECDSA avec courbe P-256 sinon. Éviter les courbes exotiques ou mal supportées.",
          },
        ],
      },
      {
        kind: "command",
        label: "Générer une clé Ed25519",
        command: "openssl genpkey -algorithm ED25519 -out ed-privee.pem",
        why: "Crée une paire Ed25519 moderne en une commande. À utiliser pour SSH, signatures et tout nouveau système où RSA n'est pas imposé.",
        verify: "openssl pkey -in ed-privee.pem -noout -text | head -5",
      },
    ],
  },
  {
    id: "echange-de-cles",
    title: "Échange de clés : Diffie-Hellman",
    level: 3,
    intro: "Se mettre d'accord sur un secret sans jamais l'envoyer.",
    blocks: [
      {
        kind: "text",
        text: "Le protocole Diffie-Hellman permet à deux parties de dériver un secret partagé en échangeant uniquement des valeurs publiques — un espion qui voit tout l'échange ne peut pas retrouver le secret. C'est la brique qui résout le problème de distribution des clés symétriques.",
      },
      {
        kind: "list",
        items: [
          "Version moderne : ECDHE (éphémère) — un nouvel échange à chaque session TLS. Compromission de la clé long terme ne révèle pas les sessions passées : c'est la confidentialité persistante (forward secrecy).",
          "Diffie-Hellman seul n'authentifie pas : sans signatures/certificats, un attaquant peut s'interposer (man-in-the-middle). D'où le couplage systématique avec l'authentification.",
          "En TLS 1.3, l'échange est toujours (EC)DHE éphémère — le RSA « statique » d'échange de clés a disparu du protocole.",
        ],
      },
    ],
  },
  {
    id: "hmac",
    title: "HMAC : authentifier sans asymétrique",
    level: 3,
    intro: "Intégrité + authenticité avec une clé partagée.",
    blocks: [
      {
        kind: "text",
        text: "HMAC combine un hachage et une clé secrète partagée : il prouve que le message n'a pas été modifié ET qu'il vient de quelqu'un qui connaît la clé. Moins puissant qu'une signature (les deux parties peuvent produire le tag — pas de non-répudiation), mais simple et rapide.",
      },
      {
        kind: "command",
        label: "Calculer un HMAC-SHA256",
        command: "openssl dgst -sha256 -hmac 'ma-cle-secrete' message.txt",
        why: "Produit le tag d'authentification du fichier avec la clé. Le destinataire recalcule avec la même clé : tag identique = message authentique et intact.",
      },
      {
        kind: "list",
        items: [
          "Usages : webhooks (signature des payloads), API (clés partagées), intégrité des tokens.",
          "La comparaison des tags doit se faire en temps constant (comparaison naïve = oracle temporel). Les bibliothèques fournissent une fonction dédiée.",
          "HMAC suppose une clé partagée au préalable — même problème de distribution que le symétrique.",
        ],
      },
    ],
  },
  {
    id: "certificats-x509",
    title: "Certificats X.509",
    level: 3,
    intro: "Lier une clé publique à une identité : anatomie d'un certificat.",
    blocks: [
      {
        kind: "command",
        label: "Créer un certificat auto-signé",
        command: "openssl req -x509 -new -nodes -key cle-privee.pem -sha256 -days 365 -out cert.pem -subj \"/CN=mon-service\"",
        why: "Génère un certificat auto-signé valable un an : il lie la clé publique à l'identité « mon-service ». Auto-signé = pas de tiers de confiance — OK pour les tests, jamais pour du public.",
        verify: "openssl x509 -in cert.pem -noout -subject -dates",
      },
      {
        kind: "fields",
        title: "Contenu d'un certificat",
        fields: [
          {
            label: "Sujet (Subject)",
            value:
              "L'identité certifiée : nom de domaine (CN ou SAN), organisation…",
          },
          {
            label: "Émetteur (Issuer)",
            value:
              "L'autorité qui a signé. Si émetteur = sujet : auto-signé.",
          },
          {
            label: "Clé publique",
            value:
              "La clé du sujet, avec son algorithme.",
          },
          {
            label: "Validité",
            value:
              "Dates de début et fin. Un certificat expiré est rejeté — cause n°1 des pannes TLS « mystérieuses ».",
          },
          {
            label: "Signature",
            value:
              "La signature de l'émetteur sur tout le reste — ce qu'on vérifie.",
          },
          {
            label: "SAN",
            value:
              "Subject Alternative Names : la liste des noms couverts (domaines). C'est le SAN — pas le CN — que les navigateurs vérifient aujourd'hui.",
          },
        ],
      },
    ],
  },
  {
    id: "pki-chaine-confiance",
    title: "PKI et chaîne de confiance",
    level: 3,
    intro: "Pourquoi votre navigateur fait confiance à un site inconnu.",
    blocks: [
      {
        kind: "text",
        text: "La PKI (infrastructure à clés publiques) organise la confiance en chaîne : une autorité racine (préinstallée dans OS/navigateurs) signe des autorités intermédiaires, qui signent les certificats des sites. Vérifier un certificat = remonter la chaîne jusqu'à une racine de confiance, en contrôlant chaque signature et les dates.",
      },
      {
        kind: "list",
        items: [
          "Le serveur doit envoyer sa chaîne complète (certificat + intermédiaires) : une chaîne incomplète = erreur côté client.",
          "Révocation : un certificat compromis doit être invalidé avant expiration (CRL, OCSP). En pratique imparfaite — d'où des durées de vie de plus en plus courtes.",
          "Automatisation : Let's Encrypt / ACME a rendu les certificats gratuits et renouvelés automatiquement — plus d'excuse pour du HTTP ou des certificats expirés.",
          "Épinglage (pinning) : figer le certificat attendu côté client pour les applications sensibles — puissant mais risqué en cas de rotation.",
        ],
      },
    ],
  },
  {
    id: "tls-fonctionnement",
    title: "TLS : le handshake",
    level: 3,
    intro: "Ce qui se passe quand le navigateur affiche le cadenas.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Négociation",
            detail:
              "Client et serveur s'accordent sur la version TLS et les algorithmes (cipher suites). TLS 1.3 a supprimé les options faibles — moins de négociation, moins d'erreurs.",
          },
          {
            title: "Authentification du serveur",
            detail:
              "Le serveur présente son certificat ; le client vérifie la chaîne jusqu'à une racine de confiance, les dates et le nom (SAN).",
          },
          {
            title: "Échange de clés éphémère",
            detail:
              "ECDHE : un secret de session est dérivé sans jamais transiter. Chaque session a son secret (forward secrecy).",
          },
          {
            title: "Session chiffrée",
            detail:
              "Tout le reste (requêtes HTTP, réponses) est chiffré en symétrique authentifié (AES-GCM ou ChaCha20-Poly1305).",
          },
        ],
      },
      {
        kind: "command",
        label: "Inspecter le TLS d'un serveur",
        command: "openssl s_client -connect example.com:443 -tls1_3",
        why: "Ouvre une session TLS et affiche version négociée, cipher suite et chaîne de certificats. Le premier réflexe pour diagnostiquer un problème HTTPS côté serveur.",
        verify: "openssl s_client -connect example.com:443 -tls1_3 | head -30",
      },
    ],
  },
  {
    id: "tls-bonnes-pratiques",
    title: "TLS : configuration correcte",
    level: 3,
    intro: "Activer TLS ne suffit pas — il faut le configurer.",
    blocks: [
      {
        kind: "list",
        items: [
          "TLS 1.2 minimum, 1.3 recommandé ; désactiver SSL, TLS 1.0/1.1 et les cipher suites faibles (RC4, 3DES, export).",
          "Certificats : chaîne complète envoyée, renouvellement automatisé (ACME), surveillance de l'expiration (alerte à J-30/J-7).",
          "HSTS : forcer le HTTPS côté navigateur pour bloquer les downgrades.",
          "Rediriger tout le HTTP vers HTTPS — pas de contenu mixte.",
          "Côté client/applicatif : ne jamais désactiver la vérification du certificat, même « temporairement ».",
          "Tester avec un scanner (testssl.sh en local, ou un service d'analyse) après chaque changement.",
        ],
      },
    ],
  },
  {
    id: "gestion-des-cles",
    title: "Gestion des clés : cycle de vie",
    level: 3,
    intro: "Générer n'est que le début : stocker, utiliser, révoquer.",
    blocks: [
      {
        kind: "fields",
        title: "Le cycle de vie",
        fields: [
          {
            label: "Génération",
            value:
              "Aléa cryptographique, taille adaptée, sur la machine qui utilisera la clé. Jamais de clé « exemple » réutilisée.",
          },
          {
            label: "Stockage",
            value:
              "Permissions restrictives (600), jamais dans Git, idéalement dans un gestionnaire de secrets ou un HSM pour les clés critiques. Chiffrer les sauvegardes de clés.",
          },
          {
            label: "Distribution",
            value:
              "Clés publiques : par un canal authentifié. Clés symétriques : via un canal déjà sûr ou un échange (Diffie-Hellman).",
          },
          {
            label: "Utilisation",
            value:
              "Principe du moindre privilège : chaque service n'a que les clés dont il a besoin. Séparer les clés par usage (signature vs chiffrement).",
          },
          {
            label: "Rotation",
            value:
              "Changer les clés périodiquement et après tout incident. Une rotation doit être une procédure rodée, pas une panique.",
          },
          {
            label: "Révocation / destruction",
            value:
              "Clé compromise = clé révoquée (certificats) et remplacée partout. Destruction sûre des anciennes copies.",
          },
        ],
      },
    ],
  },
  {
    id: "gestionnaires-secrets",
    title: "Gestionnaires de secrets",
    level: 3,
    intro: "Ne plus jamais mettre un secret dans un fichier de config.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le problème : secrets dans le code, les variables d'environnement en clair, les fichiers partagés — chaque copie est une fuite potentielle.",
          "La solution : un coffre central (HashiCorp Vault, gestionnaires cloud, ou au minimum un gestionnaire chiffré) : les applications récupèrent les secrets à l'exécution, avec authentification et audit.",
          "Fonctionnalités clés : contrôle d'accès fin, rotation automatique, audit des accès, chiffrement au repos.",
          "Même sans coffre : variables d'environnement injectées au déploiement (pas commitées), fichiers avec permissions 600, jamais de secrets dans les logs ni les rapports d'erreur.",
          "Scannez les dépôts (git history incluse) à la recherche de secrets déjà commis — et révoquez ceux qu'on y trouve.",
        ],
      },
    ],
  },
  {
    id: "chiffrement-bases-donnees",
    title: "Chiffrement des données sensibles",
    level: 3,
    intro: "Protéger les données au repos, en pratique.",
    blocks: [
      {
        kind: "fields",
        title: "Les couches",
        fields: [
          {
            label: "Chiffrement disque",
            value:
              "Protège contre le vol physique (disque ou machine). Ne protège pas contre un attaquant qui a accès au système allumé.",
          },
          {
            label: "Chiffrement base de données",
            value:
              "Transparent (TDE) : protège les fichiers de la base. Ne protège pas contre un accès SQL légitime détourné.",
          },
          {
            label: "Chiffrement applicatif (au niveau colonne)",
            value:
              "L'application chiffre les champs sensibles avant stockage : protège même contre un accès à la base. Exige une gestion de clés applicative sérieuse.",
          },
          {
            label: "Sauvegardes chiffrées",
            value:
              "Des sauvegardes non chiffrées annulent tout le reste : un attaquant volera la sauvegarde plutôt que la base.",
          },
          {
            label: "Tokenisation / masquage",
            value:
              "Pour les données très sensibles (cartes bancaires) : ne pas stocker du tout, ou stocker un token — la meilleure protection est l'absence de données.",
          },
        ],
      },
    ],
  },
  {
    id: "argon2-bcrypt",
    title: "Argon2, bcrypt, scrypt",
    level: 3,
    intro: "Les fonctions de hachage de mots de passe en détail.",
    blocks: [
      {
        kind: "fields",
        title: "Comparatif",
        fields: [
          {
            label: "bcrypt",
            value:
              "L'ancien standard éprouvé : adaptatif (coût réglable), sel intégré. Limite : 72 octets de mot de passe, pas résistant aux attaques matérielles massives (GPU).",
          },
          {
            label: "scrypt",
            value:
              "Ajoute une résistance mémoire (coûteux en RAM, pas seulement en CPU) — freine les GPU/ASIC. Paramétrage plus délicat.",
          },
          {
            label: "Argon2",
            value:
              "Le gagnant du concours PHC, recommandé aujourd'hui (variante Argon2id). Résistant CPU + mémoire, paramétrable. Le choix par défaut pour un nouveau système.",
          },
          {
            label: "Paramètres",
            value:
              "Suivre les recommandations OWASP actuelles pour le coût — et les réévaluer périodiquement : ce qui est « lent » aujourd'hui sera « rapide » dans 5 ans.",
          },
          {
            label: "Migration",
            value:
              "On peut migrer sans connaître les mots de passe : ré-hacher avec le nouvel algorithme à la prochaine connexion de chaque utilisateur.",
          },
        ],
      },
    ],
  },
  {
    id: "signatures-avance",
    title: "Signatures : usages avancés",
    level: 3,
    intro: "Au-delà du fichier : où les signatures structurent la confiance.",
    blocks: [
      {
        kind: "list",
        items: [
          "Code signé : les OS vérifient la signature des binaires/drivers — une mise à jour non signée est rejetée.",
          "Commits Git signés : prouvent l'auteur d'un commit (clé GPG/SSH). Utile dans les équipes et exigé par certains projets.",
          "JWT : les tokens d'authentification sont signés (HMAC ou RSA/ECDSA) — le serveur vérifie la signature au lieu de stocker les sessions. La sécurité repose entièrement sur le secret/la clé de signature.",
          "Horodatage : un tiers de confiance signe « ce document existait à cette date » — preuve d'antériorité.",
          "Détachées vs attachées : une signature peut voyager séparément du document (`.sig`) ou être intégrée — choisir selon le workflow.",
        ],
      },
    ],
  },
  {
    id: "attaques-classiques",
    title: "Attaques classiques à connaître",
    level: 3,
    intro: "Comprendre comment la crypto échoue — pour ne pas reproduire.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Homme du milieu (MitM)",
            value:
              "Interception active : l'attaquant se place entre les parties. Contré par l'authentification (certificats vérifiés) — le chiffrement seul ne suffit pas.",
          },
          {
            label: "Rejeu (replay)",
            value:
              "Rejouer un message valide intercepté (ex. un ordre). Contré par nonces, horodatage, numéros de séquence.",
          },
          {
            label: "Oracles (padding, timing)",
            value:
              "Un serveur qui répond différemment selon l'erreur de déchiffrement fuit de l'information. D'où : modes authentifiés, comparaisons en temps constant, messages d'erreur uniformes.",
          },
          {
            label: "Downgrade",
            value:
              "Forcer la négociation vers un protocole faible. Contré par : désactiver les versions faibles côté serveur, HSTS, TLS 1.3.",
          },
          {
            label: "Collisions (MD5/SHA-1)",
            value:
              "Fabriquer deux documents avec la même empreinte — d'où l'abandon de ces algorithmes pour la sécurité.",
          },
          {
            label: "Mauvaise gestion des clés",
            value:
              "L'attaque la plus rentable : voler la clé plutôt que casser l'algorithme. La plupart des « échecs crypto » réels sont des échecs de gestion, pas de mathématiques.",
          },
        ],
      },
    ],
  },
  {
    id: "post-quantique",
    title: "Menace quantique et crypto post-quantique",
    level: 3,
    intro: "Ce qui change — et ce qui ne change pas.",
    blocks: [
      {
        kind: "text",
        text: "Un ordinateur quantique assez puissant casserait RSA et les courbes elliptiques (algorithme de Shor) — pas le symétrique ni le hachage (il faudrait doubler les tailles de clés, effet Grover). La cryptographie post-quantique (standards NIST : ML-KEM pour l'échange, ML-DSA/SLH-DSA pour les signatures) est en cours de déploiement.",
      },
      {
        kind: "list",
        items: [
          "« Récolter maintenant, déchiffrer plus tard » : des données chiffrées interceptées aujourd'hui pourraient être déchiffrées dans 10-20 ans — critique pour les secrets à longue durée de vie.",
          "En pratique aujourd'hui : inventaire crypto (où utilise-t-on RSA/ECC ?), agilité (pouvoir changer d'algorithme), suivre les standards — pas de panique, pas d'algorithmes « quantiques » maison.",
          "Le symétrique (AES-256) et SHA-256 restent sûrs dans les projections actuelles.",
        ],
      },
    ],
  },
  {
    id: "erreurs-avancees",
    title: "Erreurs avancées",
    level: 3,
    intro: "Les fautes subtiles des systèmes « qui utilisent de la crypto ».",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "IV/nonce réutilisé",
            value:
              "Problem : en GCM, réutiliser un nonce avec la même clé détruit la sécurité. Why : compteur mal géré, IV constant « pour simplifier ». Better : nonce aléatoire 96 bits ou compteur persistant unique.",
          },
          {
            label: "Comparaison non constante",
            value:
              "Problem : comparer HMAC/signatures avec == fuit le temps et permet de forger. Why : réflexe de comparaison naive. Better : fonction de comparaison en temps constant de la bibliothèque.",
          },
          {
            label: "Vérification de signature optionnelle",
            value:
              "Problem : paramètre « verify=False » qui traîne depuis le dev. Why : contournement temporaire devenu permanent. Better : la vérification est non négociable ; les exceptions sont temporaires, datées et tracées.",
          },
          {
            label: "Clés à usages multiples",
            value:
              "Problem : même clé pour chiffrer et signer, ou pour deux systèmes. Why : « simplifier » la gestion. Better : une clé = un usage — la compromission reste circonscrite.",
          },
          {
            label: "Expiration non surveillée",
            value:
              "Problem : certificat expiré = service down un dimanche. Why : pas d'alerte. Better : renouvellement automatisé + alertes d'expiration.",
          },
          {
            label: "Secrets dans les logs",
            value:
              "Problem : clés/tokens imprimés en debug, collectés par la supervision. Why : log « pour comprendre ». Better : masquage systématique, revue des logs.",
          },
          {
            label: "Crypto maison",
            value:
              "Problem : XOR avec une clé, « obscurcissement », algorithme inventé. Why : sous-estimer la difficulté. Better : standards éprouvés, bibliothèques reconnues.",
          },
          {
            label: "Mauvaise taille de clé",
            value:
              "Problem : RSA-1024 ou courbes faibles encore en service. Why : héritage jamais mis à jour. Better : inventaire et plan de migration.",
          },
        ],
      },
    ],
  },
  {
    id: "derivation-cles",
    title: "Dérivation de clés (KDF)",
    level: 3,
    intro: "D'un mot de passe ou d'un secret à une clé utilisable.",
    blocks: [
      {
        kind: "fields",
        title: "Les fonctions",
        fields: [
          {
            label: "PBKDF2",
            value:
              "Dérive une clé d'un mot de passe par itérations (ex. 600 000+ itérations SHA-256). Le standard historique, encore valable avec un coût suffisant — c'est ce qu'OpenSSL utilise avec -pbkdf2.",
          },
          {
            label: "HKDF",
            value:
              "Dérive des clés depuis un secret déjà fort (ex. le secret d'un échange Diffie-Hellman). Rapide — pas faite pour les mots de passe faibles.",
          },
          {
            label: "Sel",
            value:
              "Aléatoire et unique par dérivation : deux mêmes mots de passe donnent deux clés différentes. Stocké en clair à côté — son rôle n'est pas d'être secret.",
          },
          {
            label: "Règle",
            value:
              "Mot de passe humain → KDF lente (PBKDF2/Argon2) ; secret fort → KDF rapide (HKDF). Inverser les deux est une faute classique.",
          },
        ],
      },
    ],
  },
  {
    id: "envelope-encryption",
    title: "Chiffrement par enveloppe (envelope encryption)",
    level: 3,
    intro: "Chiffrer à grande échelle sans exposer la clé maîtresse.",
    blocks: [
      {
        kind: "text",
        text: "Le pattern : une clé de données (DEK) chiffre les données ; une clé maîtresse (KEK, dans un KMS/HSM) chiffre la DEK. On stocke données chiffrées + DEK chiffrée. Avantages : la KEK ne sort jamais du KMS, la rotation de la KEK ne ré-chiffre que les DEK (pas les données), et chaque jeu de données peut avoir sa DEK.",
      },
      {
        kind: "list",
        items: [
          "C'est le pattern standard du chiffrement cloud (disques, bases, objets) — comprendre DEK/KEK suffit à lire n'importe quelle doc de chiffrement managé.",
          "Audit : le KMS journalise chaque usage de la KEK — on sait qui a déchiffré quoi et quand.",
          "La compromission d'une DEK n'expose qu'un périmètre limité ; la compromission de la KEK est critique — d'où le HSM.",
        ],
      },
    ],
  },
  {
    id: "ssh-cles",
    title: "SSH : clés et configuration",
    level: 3,
    intro: "L'usage crypto le plus quotidien d'un ops/dev.",
    blocks: [
      {
        kind: "command",
        label: "Générer une clé SSH Ed25519",
        command: "ssh-keygen -t ed25519 -C 'prenom@machine'",
        why: "Crée une paire Ed25519 (~/.ssh/id_ed25519 + .pub). Ed25519 est le type recommandé aujourd'hui : sûr et compact. Le commentaire -C identifie la clé.",
        verify: "ssh-keygen -l -f ~/.ssh/id_ed25519.pub",
      },
      {
        kind: "list",
        items: [
          "Protéger la clé privée par une passphrase (demandée à la génération) ; l'agent SSH évite de la retaper à chaque connexion.",
          "La clé publique va dans `~/.ssh/authorized_keys` du serveur — jamais la privée.",
          "Permissions : `~/.ssh` en 700, clés privées en 600 — SSH refuse de fonctionner sinon (et il a raison).",
          "À la première connexion, vérifier l'empreinte du serveur par un canal fiable — accepter aveuglément annule l'authentification.",
          "Désactiver l'authentification par mot de passe sur les serveurs exposés quand les clés sont en place.",
        ],
      },
    ],
  },
  {
    id: "jwt",
    title: "JWT : tokens signés",
    level: 3,
    intro: "L'authentification sans session, et ses pièges.",
    blocks: [
      {
        kind: "text",
        text: "Un JWT = en-tête + payload + signature, en base64. Le serveur vérifie la signature (HMAC avec un secret, ou RSA/ECDSA avec une clé) au lieu de stocker les sessions. Stateless et scalable — mais la sécurité repose entièrement sur la clé de signature et sa vérification.",
      },
      {
        kind: "list",
        items: [
          "Algorithme : imposer la liste des algorithmes acceptés côté vérification — l'attaque `alg: none` (accepter un token non signé) a compromis des systèmes réels.",
          "Secret HMAC robuste et stocké en coffre ; en asymétrique, vérifier avec la bonne clé publique (confusion de clés = faille).",
          "Durée de vie courte (minutes/heures) + refresh tokens : un JWT volé est utilisable jusqu'à expiration — il n'y a pas de « déconnexion » native.",
          "Ne jamais mettre de données sensibles dans le payload : il est signé, pas chiffré (sauf JWE).",
          "Révocation : prévoir une blocklist pour les cas critiques (compromission), même si ça réintroduit un peu d'état.",
        ],
      },
    ],
  },
  {
    id: "chiffrement-bout-en-bout",
    title: "Chiffrement de bout en bout",
    level: 3,
    intro: "Quand même le serveur ne doit pas pouvoir lire.",
    blocks: [
      {
        kind: "text",
        text: "Le chiffrement de bout en bout (E2EE) garantit que seuls les participants lisent les messages — pas le serveur, pas l'opérateur. Le protocole de référence est celui de Signal (double ratchet) : clés éphémères renouvelées à chaque message, forward secrecy et post-compromise security.",
      },
      {
        kind: "list",
        items: [
          "Le maillon faible devient la vérification des clés : comparer les « codes de sécurité » hors bande (en personne, par un autre canal) pour écarter un MitM.",
          "E2EE ne protège pas les métadonnées (qui parle à qui, quand) ni les appareils eux-mêmes (sauvegardes non chiffrées, écran verrouillé absent).",
          "« Chiffré » ne veut pas toujours dire E2EE : beaucoup de services chiffrent en transit et au repos mais détiennent les clés — lire les conditions exactes.",
        ],
      },
    ],
  },
  {
    id: "vpn-wireguard",
    title: "VPN : WireGuard et IPsec",
    level: 3,
    intro: "Le tunnel chiffré, sans la complexité historique.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un VPN établit un tunnel chiffré entre deux points : tout le trafic qui y passe est confidentiel et authentifié.",
          "WireGuard : le standard moderne — base de code minuscule (auditable), crypto actuelle (Noise, ChaCha20, Curve25519), configuration simple par paires de clés. Le choix par défaut pour un nouveau déploiement.",
          "IPsec : le standard historique, puissant mais complexe à configurer correctement — encore dominant dans l'interconnexion d'entreprise.",
          "La sécurité d'un VPN repose sur : l'authentification mutuelle des pairs (clés/certificats), des algorithmes à jour, et la gestion des clés.",
          "Attention au modèle : un VPN protège le transport jusqu'à sa sortie — pas au-delà. « VPN = anonymat total » est un mythe marketing.",
        ],
      },
    ],
  },
  {
    id: "aleatoire-systeme",
    title: "L'aléa du système",
    level: 3,
    intro: "D'où vient le « hasard » cryptographique.",
    blocks: [
      {
        kind: "fields",
        title: "Les sources",
        fields: [
          {
            label: "/dev/urandom",
            value:
              "Le générateur du noyau Linux : sûr pour tous les usages cryptographiques une fois le système initialisé. C'est lui qu'utilisent OpenSSL et la plupart des bibliothèques.",
          },
          {
            label: "getrandom()",
            value:
              "L'appel système moderne : il bloque tant que l'entropie initiale n'est pas suffisante (au tout premier démarrage), puis ne bloque plus.",
          },
          {
            label: "Matériel",
            value:
              "Les CPU modernes fournissent un générateur matériel (RDRAND/RDSEED) que le noyau mélange à ses autres sources — défense en profondeur, pas source unique.",
          },
          {
            label: "Machines virtuelles",
            value:
              "Cas particulier : un clone de VM peut dupliquer l'état du générateur — les hyperviseurs modernes fournissent des mécanismes de réensemencement à prendre en compte.",
          },
        ],
      },
      {
        kind: "text",
        text: "En pratique : ne jamais implémenter son propre générateur — appeler l'aléa du système via la bibliothèque standard (`secrets` en Python, `crypto.getRandomValues`, `openssl rand`). Le seul cas où l'on y pense explicitement, c'est l'embarqué et le tout premier boot.",
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro: "La check-list d'une utilisation sérieuse.",
    blocks: [
      {
        kind: "list",
        items: [
          "Standards éprouvés uniquement : TLS 1.3, AES-GCM, SHA-256+, Ed25519, Argon2id — jamais de crypto maison.",
          "Clés : aléa cryptographique, taille adaptée, stockage protégé (600, coffre, HSM), jamais dans Git.",
          "Un usage par clé ; rotation procédée et testée ; révocation immédiate en cas de doute.",
          "Chiffrement authentifié partout où l'intégrité compte (GCM, pas CBC nu).",
          "Certificats : chaîne complète, renouvellement automatisé, expiration surveillée.",
          "Mots de passe : Argon2id/bcrypt salé, jamais de hachage rapide seul.",
          "Secrets hors du code, hors des logs ; dépôts scannés.",
          "Vérification des signatures et certificats toujours active, même en dev.",
          "Sauvegardes chiffrées, clés de sauvegarde protégées séparément.",
          "Veille : suivre les recommandations (ANSSI, NIST, OWASP) et planifier la migration post-quantique.",
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 3,
    intro:
      "Trois projets pour passer de la théorie à la pratique.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Coffre de fichiers chiffrés",
        fields: [
          {
            label: "Objectif",
            value:
              "Chiffrer/déchiffrer des fichiers avec OpenSSL : génération de clé, chiffrement AES, vérification d'intégrité par SHA-256, documentation du workflow.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "AES, hachage, aléa, gestion de clé locale.",
          },
          {
            label: "Réussi quand",
            value:
              "Un tiers avec le fichier chiffré mais sans la clé ne peut rien en tirer ; vous restaurez depuis le chiffré sans erreur.",
          },
          {
            label: "Difficulté",
            value: "Débutant — quelques heures.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — Mini-PKI et TLS mutuel",
        fields: [
          {
            label: "Objectif",
            value:
              "Créer une CA locale, émettre des certificats serveur et client, configurer un serveur HTTPS qui exige un certificat client, diagnostiquer avec s_client.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "X.509, chaîne de confiance, TLS, OpenSSL.",
          },
          {
            label: "Réussi quand",
            value:
              "Seuls les clients avec un certificat signé par votre CA accèdent au serveur ; un certificat expiré ou d'une autre CA est rejeté.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — deux jours.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Audit crypto d'une application",
        fields: [
          {
            label: "Objectif",
            value:
              "Auditer une petite application : stockage des mots de passe, gestion des secrets, configuration TLS, signatures des mises à jour — rapport avec criticité et remédiations.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Tout le module : lecture critique, threat modeling, remédiation.",
          },
          {
            label: "Réussi quand",
            value:
              "Le rapport identifie au moins trois faiblesses réelles avec preuves, criticité justifiée et correctifs proposés.",
          },
          {
            label: "Difficulté",
            value: "Avancé — une semaine.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources officielles",
    level: 3,
    intro:
      "Les références à privilégier.",
    blocks: [
      {
        kind: "list",
        items: [
          "`https://www.openssl.org/docs/` — la documentation officielle d'OpenSSL : la référence pour les commandes.",
          "`https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html` — l'OWASP sur le stockage cryptographique : recommandations pratiques à jour.",
          "`https://csrc.nist.gov/` — le NIST : standards (AES, SHA, post-quantique) et guides.",
          "`https://www.ssi.gouv.fr/` — l'ANSSI : guides et recommandations, en français.",
        ],
      },
      {
        kind: "text",
        text: "Pour aller plus loin en théorie : « Serious Cryptography » (Jean-Philippe Aumasson) — rigoureux sans être un manuel de maths. Et le réflexe permanent : devant un choix crypto, chercher ce que recommandent OWASP/ANSSI/NIST aujourd'hui, pas ce qu'on faisait il y a dix ans.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "La cryptographie maîtrisée, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "`cybersecurity` : intégrer la crypto dans un programme de sécurité global.",
          "`incident-response` : gérer les incidents liés aux clés et certificats compromis.",
          "`networking` : comprendre en profondeur TLS, VPN et la sécurité réseau.",
          "`linux` : chiffrement disque (LUKS), SSH avancé, gestion des secrets système.",
          "`python` ou `go` : utiliser correctement les bibliothèques crypto (cryptography, libsodium) dans du code.",
        ],
      },
    ],
  },
];

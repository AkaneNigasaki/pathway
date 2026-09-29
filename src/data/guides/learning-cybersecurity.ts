import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de la cybersécurité : protéger systèmes, réseaux et
 * applications. Posture strictement DÉFENSIVE : mécanismes de protection,
 * audit de ses propres systèmes, détection et réponse. Aucune technique
 * d'attaque exploitable — comprendre comment on se défend, pas comment on
 * attaque. 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec
 * divulgation progressive. Tous les textes supportent le code inline entre
 * backticks.
 */
export const LEARNING_CYBERSECURITY: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est la cybersécurité, ce qu'elle n'est pas, et pourquoi elle concerne tout le monde.",
    blocks: [
      {
        kind: "text",
        text: "La cybersécurité est l'ensemble des pratiques, technologies et processus qui protègent les systèmes informatiques, les réseaux, les logiciels et les données contre les accès non autorisés, les altérations, les vols et les interruptions de service. Elle ne se résume pas au « piratage » : la majeure partie du travail consiste à configurer correctement, mettre à jour, surveiller et réagir vite quand quelque chose tourne mal.",
      },
      {
        kind: "text",
        text: "Protéger la confidentialité, l'intégrité et la disponibilité des systèmes et des données — la triade « CIA ».",
      },
      {
        kind: "text",
        text: "Tout système connecté est exposé : rançongiciels, vol de données, usurpation d'identité, sabotage. Une seule faille (mot de passe faible, logiciel non patché, pièce jointe piégée) suffit à compromettre une organisation entière.",
      },
      {
        kind: "fields",
        title: "La cybersécurité : l'essentiel",
        fields: [          {
            label: "Quand s'en préoccuper",
            value:
              "Toujours, dès le premier serveur ou la première application : la sécurité se construit en amont, pas après l'incident. Pour un développeur, elle fait partie du métier au même titre que les tests.",
          },
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni du piratage offensif, ni de la magie : c'est de l'ingénierie rigoureuse (configuration, mises à jour, moindre privilège, surveillance). Et ce n'est jamais « terminé » — c'est un processus continu.",
          },
        ],
      },
      {
        kind: "text",
        text: "Point essentiel : cette page adopte une posture strictement défensive. Vous apprendrez à durcir vos systèmes, détecter les anomalies et réagir aux incidents — sur vos propres machines et avec autorisation explicite uniquement. Tester la sécurité d'un système qui ne vous appartient pas, même « pour voir », est illégal dans la plupart des pays.",
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : penser comme un défenseur",
    level: 1,
    intro:
      "La seule idée à retenir avant tout le reste : on ne sécurise pas un système, on réduit sa surface d'attaque couche par couche.",
    blocks: [
      {
        kind: "diagram",
        title: "La défense en profondeur, en une image",
        lines: [
          "Données à protéger (le « joyau » : mots de passe, données clients)",
          "     │  chiffrées, sauvegardées",
          "     ▼",
          "Application (code sûr : validation, requêtes paramétrées)",
          "     │",
          "     ▼",
          "Serveur (mises à jour, comptes limités, SSH durci)",
          "     │",
          "     ▼",
          "Réseau (pare-feu : seuls les ports nécessaires sont ouverts)",
          "     │",
          "     ▼",
          "Humain (mots de passe uniques, 2FA, vigilance phishing)",
          "     │",
          "     ▼",
          "Surveillance (journaux, alertes : détecter vite, réagir vite)",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : un attaquant n'a besoin que d'une seule faille, un défenseur doit les fermer toutes — d'où l'idée de couches successives. Pourquoi ça existe : aucune mesure n'est parfaite ; si le pare-feu laisse passer quelque chose, le durcissement du serveur limite les dégâts, et si le serveur est compromis, le chiffrement protège les données. Quand l'appliquer : à chaque nouveau service déployé, en se demandant « que se passe-t-il si cette couche tombe ? ».",
      },
      {
        kind: "fields",
        title: "Les trois questions du défenseur",
        fields: [
          {
            label: "Qu'est-ce que je protège ?",
            value:
              "Identifier les actifs : données personnelles, secrets, code source, disponibilité du service. On ne protège bien que ce qu'on a inventorié.",
          },
          {
            label: "Contre qui / contre quoi ?",
            value:
              "Le « modèle de menace » : spammeurs automatisés, concurrents, erreurs humaines internes, pannes. La plupart des attaques réelles sont automatisées et opportunistes, pas ciblées.",
          },
          {
            label: "Quel est le coût d'un échec ?",
            value:
              "Perte de données, indisponibilité, amendes réglementaires, perte de confiance. C'est ce coût qui justifie l'effort de protection — ni plus, ni moins.",
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
    intro: "Ce qu'il faut déjà savoir pour tirer profit de cette page.",
    blocks: [
      {
        kind: "list",
        items: [
          "Bases de Linux en ligne de commande : naviguer, éditer un fichier, `sudo`, permissions (`chmod`).",
          "Notions de réseaux : ce qu'est une adresse IP, un port, HTTP/HTTPS.",
          "Un ordinateur (Linux, macOS ou Windows avec WSL) et, idéalement, un serveur ou une machine virtuelle de test qui vous appartient.",
          "Aucune expérience en sécurité n'est requise : l'hygiène de base vient en premier.",
        ],
      },
      {
        kind: "text",
        text: "Si Linux vous est encore étranger, commencez par la Learning Page Linux de Pathway, puis revenez ici : 80 % du durcissement d'un serveur se fait en ligne de commande.",
      },
    ],
  },
  {
    id: "hygiene-mots-de-passe",
    title: "Hygiène n°1 : les mots de passe",
    level: 2,
    intro:
      "La première ligne de défense, et la plus négligée : des mots de passe longs, uniques, gérés par un outil.",
    blocks: [
      {
        kind: "text",
        text: "Un mot de passe doit être long et unique par service ; la complexité alambiquée compte moins que la longueur.",
      },
      {
        kind: "text",
        text: "Les attaquants ne « devinent » pas : ils rejouent automatiquement des millions de paires identifiant/mot de passe volées ailleurs (« credential stuffing »). Un mot de passe réutilisé sur deux sites tombe dès que l'un des deux fuite.",
      },
      {
        kind: "fields",
        title: "Les règles qui comptent vraiment",
        fields: [          {
            label: "Quand",
            value:
              "Partout, sans exception — et en priorité : messagerie (la clé de toutes les réinitialisations), banque, hébergeur, registrar de domaine.",
          },
          {
            label: "Comment",
            value:
              "Avec un gestionnaire de mots de passe (KeePassXC, Bitwarden) : un seul mot de passe maître fort à retenir, le reste généré et stocké chiffré. Activez le générateur intégré (20+ caractères).",
          },
        ],
      },
      {
        kind: "fields",
        title: "Erreurs fréquentes sur les mots de passe",
        fields: [
          {
            label: "Erreur",
            value:
              "Réutiliser le même mot de passe « fort » sur plusieurs sites.",
          },
          {
            label: "Bonne pratique",
            value:
              "Un mot de passe unique par service, généré par le gestionnaire. Vérifiez vos adresses sur haveibeenpwned.com pour savoir si elles ont fuité.",
          },
          {
            label: "Erreur",
            value: "Changer de mot de passe tous les 90 jours « par sécurité ».",
          },
          {
            label: "Bonne pratique",
            value:
              "Le NIST (SP 800-63) ne recommande plus la rotation forcée : elle pousse à des mots de passe prévisibles. Changez uniquement en cas de soupçon de compromission.",
          },
        ],
      },
      {
        kind: "text",
        text: "Concepts liés : hashage des mots de passe côté serveur (`bcrypt`, `argon2`), double authentification (section suivante), gestion des secrets pour les applications.",
      },
    ],
  },
  {
    id: "double-authentification",
    title: "Hygiène n°2 : la double authentification (2FA)",
    level: 2,
    intro:
      "Le multiplicateur de sécurité le plus rentable : même avec votre mot de passe, un attaquant reste bloqué.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : la 2FA exige, en plus du mot de passe, une preuve que vous possédez un second facteur — généralement un code temporaire (TOTP) généré par une application comme Aegis, 2FAS ou le gestionnaire de mots de passe. Pourquoi : un mot de passe volé (phishing, fuite de base) ne suffit plus à lui seul. Quand : sur tous les comptes sensibles, en commençant par la messagerie et l'hébergeur.",
      },
      {
        kind: "table",
        headers: ["Méthode", "Niveau", "Remarque"],
        rows: [
          ["Application TOTP (codes à 6 chiffres)", "Bon", "Gratuit, hors-ligne, standard ouvert. Sauvegardez les codes de secours."],
          ["Clé matérielle (FIDO2 / passkey)", "Excellent", "Résiste au phishing même sophistiqué. Le meilleur choix quand le service le propose."],
          ["SMS", "Faible", "Mieux que rien, mais vulnérable à l'interception et au SIM-swap. À éviter si une alternative existe."],
        ],
      },
      {
        kind: "fields",
        title: "Bonnes pratiques 2FA",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Conservez les codes de secours papier dans un lieu sûr : sans eux, un téléphone perdu peut signifier un compte perdu.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Activer la 2FA uniquement sur « les comptes importants ». Un compte secondaire compromis sert souvent de marchepied (récupération de mot de passe par e-mail).",
          },
        ],
      },
    ],
  },
  {
    id: "mises-a-jour",
    title: "Hygiène n°3 : les mises à jour",
    level: 2,
    intro:
      "La majorité des compromissions exploitent des vulnérabilités déjà corrigées. Mettre à jour, c'est fermer la porte.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : les éditeurs publient des correctifs de sécurité en continu ; un système non mis à jour reste vulnérable à des failles connues et exploitées automatiquement. Pourquoi : les attaquants industrialisent l'exploitation des CVE publiques en quelques heures. Quand : système d'exploitation, navigateur, CMS, dépendances — tout, tout le temps.",
      },
      {
        kind: "command",
        label: "Mettre à jour un serveur Debian/Ubuntu",
        command: "sudo apt update && sudo apt upgrade -y",
        why: "`apt update` recharge la liste des paquets disponibles, `apt upgrade` installe les nouvelles versions, correctifs de sécurité inclus. C'est la première commande d'un audit.",
        verify: "Relancez la commande : elle doit répondre « 0 mis à jour ».",
      },
      {
        kind: "command",
        label: "Vérifier les mises à jour de sécurité en attente",
        command: "apt list --upgradable 2>/dev/null | grep -i security",
        why: "Isole les paquets liés à la sécurité dans la liste des mises à jour, pour prioriser en cas de maintenance planifiée.",
      },
      {
        kind: "fields",
        title: "Automatiser sans risque",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Sur un serveur, activez les mises à jour de sécurité automatiques (`unattended-upgrades` sur Debian/Ubuntu) : les patchs critiques s'installent seuls, vous gardez la main sur les montées de version majeures.",
          },
          {
            label: "Erreur fréquente",
            value:
              "« Je mettrai à jour quand j'aurai le temps » sur un serveur exposé à Internet. Les robots scannent en permanence les versions vulnérables.",
          },
        ],
      },
    ],
  },
  {
    id: "sauvegardes",
    title: "Hygiène n°4 : les sauvegardes",
    level: 2,
    intro:
      "Le dernier rempart : quand tout le reste échoue (rançongiciel, erreur humaine), la sauvegarde décide de l'issue.",
    blocks: [
      {
        kind: "text",
        text: "3 copies des données, sur 2 supports différents, dont 1 hors site (déconnectée ou distante).",
      },
      {
        kind: "text",
        text: "Un rançongiciel chiffre aussi les sauvegardes accessibles depuis la machine compromise. Seule une copie hors d'atteinte (disque débranché, stockage distant immuable) garantit la restauration.",
      },
      {
        kind: "fields",
        title: "La règle 3-2-1",
        fields: [          {
            label: "Quand",
            value:
              "Avant tout changement risqué, et automatiquement pour les données critiques (quotidien minimum).",
          },
          {
            label: "Comment",
            value:
              "`rsync` pour les fichiers, `pg_dump`/`mysqldump` pour les bases, snapshots du fournisseur cloud — puis tester la restauration.",
          },
        ],
      },
      {
        kind: "command",
        label: "Sauvegarder un dossier avec rsync",
        command: "rsync -a --delete /var/www/ /mnt/backup/www/",
        why: "`-a` préserve permissions et dates, `--delete` rend la destination identique à la source (miroir fidèle). La destination doit être un support séparé.",
        verify: "Comparez : `diff -r /var/www/ /mnt/backup/www/` ne doit rien afficher.",
      },
      {
        kind: "fields",
        title: "L'erreur qui annule tout",
        fields: [
          {
            label: "Erreur",
            value: "Sauvegarder sans jamais tester la restauration.",
          },
          {
            label: "Bonne pratique",
            value:
              "Une sauvegarde non testée n'est qu'une hypothèse : restaurez-la au moins une fois sur une machine de test, et documentez la procédure.",
          },
        ],
      },
    ],
  },
  {
    id: "phishing",
    title: "Hygiène n°5 : le phishing",
    level: 2,
    intro:
      "Le maillon humain reste la cible n°1 : reconnaître une tentative d'hameçonnage vaut tous les pare-feu.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : le phishing pousse la victime à donner elle-même ses identifiants ou à exécuter un fichier piégé, en imitant un expéditeur de confiance. Pourquoi c'est efficace : il contourne toute la technique en exploitant l'urgence (« votre compte sera suspendu »), l'autorité (« votre banque », « votre direction ») et la ressemblance (domaine presque identique).",
      },
      {
        kind: "list",
        items: [
          "Vérifiez l'expéditeur réel (adresse complète, pas le nom affiché) et survolez les liens avant de cliquer.",
          "Méfiez-vous de l'urgence artificielle et des pièces jointes inattendues, même venant d'un contact connu.",
          "Ne saisissez jamais un mot de passe depuis un lien reçu par e-mail : tapez l'adresse du site vous-même.",
          "En cas de doute, contactez l'organisme par un canal indépendant (numéro officiel, pas celui du message).",
          "Signalez : la plupart des messageries et entreprises ont un bouton ou une adresse de signalement.",
        ],
      },
      {
        kind: "fields",
        title: "Le filet de sécurité",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Même vigilant, on peut se tromper : c'est exactement pour cela que la 2FA (clé matérielle de préférence) existe — un mot de passe phishé seul ne suffit plus.",
          },
          {
            label: "Erreur fréquente",
            value:
              "« Je suis trop malin pour me faire avoir. » Les campagnes modernes sont ciblées, bien écrites et visuellement parfaites.",
          },
        ],
      },
    ],
  },
  {
    id: "environnement-labo",
    title: "Préparer son laboratoire",
    level: 2,
    intro:
      "Apprendre la sécurité exige un terrain de jeu sûr : vos propres machines, jamais celles des autres.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : un labo est un environnement isolé (machine virtuelle, conteneur, vieux PC, VPS à vous) où vous pouvez auditer, durcir, casser puis réparer sans risque. Pourquoi : les manipulations de cette page (pare-feu, SSH, analyse de journaux) se testent sans danger sur un système dédié, et jamais sur une machine de production.",
      },
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir le terrain",
            detail:
              "Une VM (VirtualBox, UTM, VMware) avec Debian/Ubuntu Server, ou un petit VPS chez un hébergeur : c'est votre système, vous pouvez tout y faire.",
          },
          {
            title: "Prendre un instantané",
            detail:
              "Snapshot de la VM avant chaque manipulation : en cas de pare-feu qui vous enferme dehors, un retour en arrière prend 30 secondes.",
          },
          {
            title: "Isoler le réseau",
            detail:
              "En VM, préférez un réseau NAT ou hôte-uniquement pour les exercices : vos tests ne doivent jamais toucher le réseau de quelqu'un d'autre.",
          },
          {
            title: "Documenter",
            detail:
              "Notez chaque changement (commandes, fichiers modifiés) : c'est déjà la moitié du métier d'administrateur sécurité.",
          },
        ],
      },
      {
        kind: "text",
        text: "Concepts liés : le cadre légal et éthique (section suivante, lecture obligatoire), puis le premier audit guidé.",
      },
    ],
  },
  {
    id: "cadre-legal-ethique",
    title: "Cadre légal et éthique (obligatoire)",
    level: 2,
    intro:
      "La règle absolue de la sécurité : on ne teste que ce qu'on possède ou ce qu'on est explicitement autorisé à tester.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : accéder à un système informatique sans autorisation, même par curiosité et même sans causer de dommage, est une infraction pénale dans la plupart des pays (en France : Code pénal, articles 323-1 et suivants — accès et maintien frauduleux). Pourquoi c'est strict : la loi ne distingue pas l'intention bienveillante de l'intention malveillante au moment de l'intrusion ; seule l'autorisation préalable protège.",
      },
      {
        kind: "fields",
        title: "Les règles non négociables",
        fields: [
          {
            label: "Testez uniquement",
            value:
              "Vos propres systèmes, ou ceux pour lesquels vous avez une autorisation écrite et cadrée (périmètre, dates, interlocuteur).",
          },
          {
            label: "Programmes de bug bounty",
            value:
              "Des plateformes encadrent la recherche de vulnérabilités avec des règles précises : ne testez que dans leur cadre, jamais hors scope.",
          },
          {
            label: "Divulgation responsable",
            value:
              "Vulnérabilité découverte sur un système tiers ? Signalez-la en privé à l'éditeur/l'hébergeur, laissez un délai de correction, ne la publiez pas avant.",
          },
          {
            label: "Données",
            value:
              "Ne collectez, ne stockez et ne diffusez jamais de données personnelles croisées en audit — même « pour prouver ».",
          },
        ],
      },
      {
        kind: "text",
        text: "Erreur fréquente : « je voulais juste aider / vérifier ». Bonne pratique : l'éthique du hacker au sens noble, c'est la curiosité canalisée par l'autorisation. Tout le reste de cette page suppose ce cadre.",
      },
    ],
  },
  {
    id: "premier-audit",
    title: "Votre premier audit : la check-list 15 minutes",
    level: 2,
    intro:
      "Un tour d'horizon défensif de n'importe quel serveur Linux, en 6 étapes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Mettre à jour",
            detail:
              "`sudo apt update && sudo apt upgrade -y` : partir d'un système à jour, sinon tout le reste est décoratif.",
          },
          {
            title: "Lister ce qui écoute le réseau",
            detail:
              "`ss -tuln` : chaque port ouvert est une porte d'entrée potentielle. Pour chacun, demandez-vous : « ce service doit-il être joignable, et par qui ? »",
          },
          {
            title: "Vérifier qui peut se connecter",
            detail:
              "`last -n 20` et `grep \"Failed\" /var/log/auth.log | tail` : connexions récentes et tentatives échouées. Des centaines d'échecs = des robots qui sondent.",
          },
          {
            title: "Contrôler les comptes",
            detail:
              "`awk -F: '$3==0' /etc/passwd` : qui a l'UID 0 (root) ? Il ne devrait y en avoir qu'un. Vérifiez aussi les comptes sans mot de passe verrouillé.",
          },
          {
            title: "Activer le pare-feu",
            detail:
              "`sudo ufw default deny incoming && sudo ufw allow 22/tcp && sudo ufw enable` : tout fermé par défaut, on n'ouvre que le nécessaire.",
          },
          {
            title: "Planifier la suite",
            detail:
              "Notez ce que vous n'avez pas su interpréter : c'est votre programme d'apprentissage (sections de niveau 3).",
          },
        ],
      },
      {
        kind: "text",
        text: "Ce mini-audit ne rend pas un serveur « sécurisé », mais il élimine les fautes les plus exploitées. Le niveau 3 explique chaque étape en profondeur.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "triade-cia",
    title: "La triade CIA en détail",
    level: 3,
    intro:
      "Le vocabulaire fondamental : toute mesure de sécurité protège au moins un des trois piliers.",
    blocks: [
      {
        kind: "fields",
        title: "Confidentialité, Intégrité, Disponibilité",
        fields: [
          {
            label: "Confidentialité",
            value:
              "En une phrase : seuls les autorisés accèdent à l'information. Pourquoi : données personnelles, secrets industriels, identifiants. Comment : chiffrement, contrôle d'accès, moindre privilège. Exemple : HTTPS empêche l'écoute du trafic ; une base chiffrée reste illisible si le disque est volé.",
          },
          {
            label: "Intégrité",
            value:
              "En une phrase : les données ne sont ni altérées ni falsifiées sans détection. Pourquoi : un relevé bancaire ou un logiciel modifié en douce est pire qu'indisponible. Comment : sommes de contrôle (`sha256sum`), signatures, journaux inviolables. Exemple : vérifier le hash d'une ISO téléchargée avant installation.",
          },
          {
            label: "Disponibilité",
            value:
              "En une phrase : le système fonctionne quand on en a besoin. Pourquoi : une boutique en ligne inaccessible perd son chiffre d'affaires ; un hôpital, des vies. Comment : sauvegardes, redondance, protection anti-DDoS, mises à jour sans interruption. Exemple : le plan de reprise après rançongiciel.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Lire un incident avec la triade",
        fields: [
          {
            label: "Erreur fréquente",
            value:
              "Ne penser qu'à la confidentialité (« on ne m'a rien volé, tout va bien ») alors qu'une altération silencieuse (intégrité) ou une panne (disponibilité) peut coûter plus cher.",
          },
          {
            label: "Bonne pratique",
            value:
              "Pour chaque actif, noter quel pilier est critique : un blog vitrine craint l'indisponibilité, un dossier médical craint la fuite.",
          },
        ],
      },
      {
        kind: "text",
        text: "Concepts liés : défense en profondeur, sauvegardes (disponibilité), chiffrement (confidentialité), journalisation (intégrité des preuves).",
      },
    ],
  },
  {
    id: "metiers-cyber",
    title: "Les métiers de la cybersécurité",
    level: 3,
    intro:
      "Panorama factuel des rôles : la sécurité est une équipe, pas un héros solitaire.",
    blocks: [
      {
        kind: "table",
        headers: ["Rôle", "Mission", "Posture"],
        rows: [
          ["Analyste SOC", "Surveille les alertes en continu, qualifie les incidents, escalade.", "Défensive"],
          ["Blue team / défense", "Durcit les systèmes, détecte les intrusions, répond aux incidents.", "Défensive"],
          ["Red team / pentester", "Teste les défenses avec autorisation écrite, rapporte les failles.", "Offensive encadrée"],
          ["Réponse aux incidents (IR)", "Contient et éradique les compromissions, restaure le service.", "Défensive"],
          ["Gouvernance / RSSI", "Politiques, conformité, gestion des risques, sensibilisation.", "Organisationnelle"],
          ["Sécurité applicative (AppSec)", "Sécurise le code : revues, tests, intégration dans le CI/CD.", "Défensive"],
        ],
      },
      {
        kind: "text",
        text: "En une phrase : la plupart des postes sont défensifs (surveiller, durcir, réparer) ; l'offensif « légal » (pentest) n'existe que mandaté, cadré et documenté. Pourquoi cette distinction compte : elle rappelle que le cœur du métier, c'est la rigueur opérationnelle, pas l'exploit spectaculaire. Quand viser quel rôle : l'administration système et réseau mène naturellement au SOC et à la blue team ; le développement mène à l'AppSec.",
      },
      {
        kind: "fields",
        title: "Se former sérieusement",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Construire d'abord des bases solides (Linux, réseaux, développement) : la sécurité s'apprend par-dessus un métier technique, pas à la place.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Viser « hacker » sans savoir administrer un serveur : on ne protège bien que ce qu'on sait faire fonctionner.",
          },
        ],
      },
    ],
  },
  {
    id: "defense-en-profondeur",
    title: "Défense en profondeur",
    level: 3,
    intro:
      "Le principe d'architecture : aucune couche n'est infaillible, leur empilement rend l'attaque coûteuse.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : on superpose des contrôles indépendants (pare-feu, durcissement, chiffrement, surveillance) pour qu'une faille unique ne suffise jamais. Pourquoi : chaque couche a ses angles morts ; l'attaquant doit les franchir toutes, le défenseur n'a besoin que d'une alerte sur l'une d'elles. Exemple réel : un CMS compromis via un plugin vulnérable, mais la base reste chiffrée, les sauvegardes hors ligne permettent la restauration, et les journaux montrent le point d'entrée.",
      },
      {
        kind: "list",
        items: [
          "Politiques et sensibilisation : règles claires, formation au phishing.",
          "Périmètre : pare-feu, segmentation réseau, VPN pour l'administration.",
          "Systèmes : mises à jour, comptes à privilèges limités, SSH par clés.",
          "Applications : validation des entrées, requêtes paramétrées, en-têtes de sécurité.",
          "Données : chiffrement au repos et en transit, sauvegardes 3-2-1.",
          "Surveillance : journaux centralisés, alertes, plan de réponse testé.",
        ],
      },
      {
        kind: "fields",
        title: "Pièges classiques",
        fields: [
          {
            label: "Erreur",
            value: "« On a un pare-feu, on est protégés. »",
          },
          {
            label: "Bonne pratique",
            value:
              "Le pare-feu ne voit pas le phishing ni la faille applicative : chaque couche couvre les angles morts des autres.",
          },
        ],
      },
    ],
  },
  {
    id: "surface-attaque",
    title: "Surface d'attaque : l'inventaire avant tout",
    level: 3,
    intro:
      "On ne défend que ce qu'on connaît : cartographier tout ce qui est exposé.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : la surface d'attaque est l'ensemble des points d'entrée (ports, services, comptes, applications, DNS, certificats) qu'un attaquant peut tenter d'utiliser. Pourquoi : les oublis (vieux sous-domaine, service de test laissé ouvert, compte d'ancien employé) sont la première cause de compromission. Quand : à chaque déploiement, et en revue régulière.",
      },
      {
        kind: "command",
        label: "Lister les ports en écoute sur sa machine",
        command: "ss -tuln",
        why: "`ss` (successeur de `netstat`) affiche les sockets TCP/UDP en écoute avec adresses et ports, sans résoudre les noms (`-n`) : c'est l'inventaire brut de votre exposition réseau locale.",
        verify: "Chaque ligne `LISTEN` doit correspondre à un service que vous reconnaissez et que vous avez choisi d'exposer.",
      },
      {
        kind: "command",
        label: "Lister les services actifs",
        command: "systemctl list-units --type=service --state=running",
        why: "Un service actif inutile est une surface d'attaque gratuite : on ne garde en marche que ce qui sert.",
      },
      {
        kind: "fields",
        title: "Réduire la surface, en pratique",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Désinstaller/désactiver ce qui ne sert pas, lier les services d'administration à `localhost` ou au VPN, fermer les ports au pare-feu.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Laisser l'interface d'admin d'un outil (base de données, panel) exposée sur Internet « temporairement ».",
          },
        ],
      },
    ],
  },
  {
    id: "audit-utilisateurs-linux",
    title: "Linux : auditer utilisateurs et connexions",
    level: 3,
    intro:
      "Qui peut se connecter, qui s'est connecté, qui a échoué : les trois questions de base.",
    blocks: [
      {
        kind: "command",
        label: "Lister les comptes à privilèges root",
        command: "awk -F: '$3==0 {print $1}' /etc/passwd",
        why: "L'UID 0 donne tous les droits : il ne doit y avoir que `root`. Un second UID 0 est un signal d'alerte majeur (ou une erreur de configuration).",
        verify: "La sortie ne contient que `root`.",
      },
      {
        kind: "command",
        label: "Voir les dernières connexions réussies",
        command: "last -n 20",
        why: "`last` lit l'historique des sessions : utilisateurs, origines, horaires. Une connexion à 4h du matin depuis un pays inconnu mérite investigation.",
      },
      {
        kind: "command",
        label: "Voir les tentatives de connexion échouées",
        command: "lastb | head -n 20",
        why: "`lastb` affiche les échecs d'authentification : des centaines d'essais sur `root` ou `admin` signalent des robots en force brute — le cas d'usage typique de `fail2ban`.",
      },
      {
        kind: "command",
        label: "Vérifier l'expiration et l'état des mots de passe",
        command: "sudo chage -l nom-utilisateur",
        why: "`chage` montre l'âge et l'expiration du mot de passe d'un compte : repère les comptes dormants ou jamais renouvelés après un incident.",
      },
      {
        kind: "fields",
        title: "Hygiène des comptes",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Un compte par humain, aucun compte partagé, suppression immédiate des comptes des départs, `sudo` nominatif plutôt que mot de passe root partagé.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Laisser l'utilisateur `ubuntu`/`debian`/`admin` par défaut avec mot de passe faible : ce sont les premiers testés par les robots.",
          },
        ],
      },
    ],
  },
  {
    id: "audit-fichiers-permissions",
    title: "Linux : permissions et fichiers sensibles",
    level: 3,
    intro:
      "Des permissions trop larges transforment une petite faille en compromission totale.",
    blocks: [
      {
        kind: "command",
        label: "Trouver les binaires SUID/SGID",
        command: "find / -perm -4000 -type f 2>/dev/null",
        why: "Un binaire SUID s'exécute avec les droits de son propriétaire (souvent root) : chacun est un point d'escalade de privilèges potentiel s'il est vulnérable. On audite la liste, on ne la subit pas.",
        verify: "Chaque résultat doit être un binaire système connu (`/usr/bin/sudo`, `/usr/bin/passwd`…) — tout binaire inconnu ou dans `/tmp` est suspect.",
      },
      {
        kind: "command",
        label: "Repérer les fichiers accessibles en écriture par tous",
        command: "find /etc /var/www -type f -perm -o+w 2>/dev/null | head -n 20",
        why: "Un fichier de configuration modifiable par n'importe quel utilisateur local permet d'altérer le comportement du système ou d'y glisser du code.",
      },
      {
        kind: "command",
        label: "Vérifier les permissions du dossier SSH",
        command: "ls -la ~/.ssh",
        why: "Des clés privées lisibles par d'autres (`-rw-r--r--` au lieu de `-rw-------`) annulent toute la sécurité de l'authentification par clés.",
        verify: "Clé privée en `600`, dossier en `700`, `authorized_keys` en `600`.",
      },
      {
        kind: "text",
        text: "Chaque utilisateur, service et fichier ne reçoit que les droits strictement nécessaires — ni plus.",
      },
      {
        kind: "fields",
        title: "Le principe du moindre privilège",
        fields: [          {
            label: "Erreur fréquente",
            value:
              "`chmod 777` « pour que ça marche » : on ouvre en écriture à tout le monde au lieu de comprendre quel utilisateur a besoin d'accéder.",
          },
          {
            label: "Bonne pratique",
            value:
              "Faire tourner chaque service avec un utilisateur dédié aux droits limités : un serveur web compromis ne doit pas pouvoir lire `/etc/shadow`.",
          },
        ],
      },
    ],
  },
  {
    id: "reseaux-ports",
    title: "Réseaux : ports et services courants",
    level: 3,
    intro:
      "Savoir ce qui écoute où : le vocabulaire réseau minimal du défenseur.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : un port est un numéro (1-65535) qui désigne un service sur une machine ; les ports « well-known » (0-1023) correspondent aux services standard. Pourquoi : lire `ss -tuln` ou un rapport d'audit exige de reconnaître immédiatement ce qui est normal et ce qui ne l'est pas.",
      },
      {
        kind: "table",
        headers: ["Port", "Service", "Exposition normale"],
        rows: [
          ["22", "SSH", "Oui si administration distante — restreint au VPN ou à vos IP si possible."],
          ["80 / 443", "HTTP / HTTPS", "Oui pour un serveur web public. Le 80 ne sert qu'à rediriger vers 443."],
          ["25 / 587", "SMTP (e-mail)", "Seulement sur un serveur mail dédié ; sinon fermé."],
          ["3306 / 5432", "MySQL / PostgreSQL", "Jamais exposés à Internet : liés à localhost ou au réseau privé."],
          ["6379 / 27017", "Redis / MongoDB", "Jamais exposés : des milliers d'instances pillées pour cette erreur."],
          ["3000 / 8000 / 8080", "Applis de dev", "En développement local uniquement, jamais en production publique."],
        ],
      },
      {
        kind: "fields",
        title: "Lecture défensive",
        fields: [
          {
            label: "Erreur",
            value: "Voir un port inconnu en écoute et supposer que « c'est le système ».",
          },
          {
            label: "Bonne pratique",
            value:
              "Identifier le processus (`ss -tulnp`), vérifier le paquet d'origine, et fermer/désinstaller si illégitime. En cas de doute sur un serveur de production : isolez avant d'investiguer.",
          },
        ],
      },
      {
        kind: "text",
        text: "Concepts liés : pare-feu `ufw` (section suivante), `fail2ban` contre le scan agressif, segmentation réseau.",
      },
    ],
  },
  {
    id: "pare-feu-ufw",
    title: "Pare-feu : filtrer avec UFW",
    level: 3,
    intro:
      "Le garde-barrière du serveur : tout fermé par défaut, on n'ouvre que le nécessaire.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : un pare-feu filtre le trafic réseau selon des règles ; `ufw` (Uncomplicated Firewall) est la surcouche simple d'`iptables` sur Debian/Ubuntu. Pourquoi : même un service légitime mais non durci devient inatteignable s'il n'est pas censé être exposé. Quand : dès la mise en service, avant même d'installer l'application.",
      },
      {
        kind: "command",
        label: "Politique par défaut : tout refuser en entrée",
        command: "sudo ufw default deny incoming",
        why: "Principe du refus par défaut : seuls les flux explicitement autorisés passent. C'est l'inverse (tout autoriser sauf exceptions) qui est dangereux.",
      },
      {
        kind: "command",
        label: "Autoriser SSH puis activer",
        command: "sudo ufw allow 22/tcp && sudo ufw enable",
        why: "On ouvre le port d'administration AVANT d'activer le pare-feu — dans cet ordre, sinon on se coupe l'accès distant. `enable` active le filtrage au démarrage.",
        verify: "`sudo ufw status verbose` doit montrer `22/tcp ALLOW IN Anywhere` et `Status: active`.",
      },
      {
        kind: "command",
        label: "Limiter les tentatives SSH (anti force-brute)",
        command: "sudo ufw limit 22/tcp",
        why: "`limit` refuse les connexions au-delà d'un seuil : un robot qui mitraille les mots de passe est ralenti/bloqué au niveau réseau, avant même d'atteindre SSH.",
        verify: "Dans `ufw status`, la règle apparaît comme `22/tcp LIMIT IN`.",
      },
      {
        kind: "fields",
        title: "Règles d'or du pare-feu",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Documenter chaque règle ouverte (qui, pourquoi, jusqu'à quand) et ré-auditer tous les 6 mois : les règles temporaires deviennent vite permanentes.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Activer `ufw` en SSH sans avoir autorisé le port 22 au préalable : déconnexion immédiate, et retour par console d'urgence.",
          },
        ],
      },
    ],
  },
  {
    id: "fail2ban",
    title: "Fail2ban : bannir les robots agressifs",
    level: 3,
    intro:
      "Le vigile automatique : il lit les journaux et bannit les IP qui insistent trop.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : `fail2ban` surveille les fichiers de journaux (SSH, web…) et bannit temporairement les adresses IP qui accumulent les échecs d'authentification. Pourquoi : un serveur SSH exposé reçoit des milliers de tentatives par jour ; le bannissement automatique rend la force brute impraticable. Quand : sur tout service exposé à Internet avec authentification par mot de passe.",
      },
      {
        kind: "command",
        label: "Installer et démarrer fail2ban",
        command: "sudo apt install -y fail2ban && sudo systemctl enable --now fail2ban",
        why: "La configuration par défaut protège déjà SSH : `enable --now` l'active immédiatement et au démarrage.",
        verify: "`sudo fail2ban-client ping` doit répondre `pong`.",
      },
      {
        kind: "command",
        label: "Vérifier les bannissements SSH en cours",
        command: "sudo fail2ban-client status sshd",
        why: "Affiche la jail `sshd` : IP actuellement bannies et total historique. C'est la preuve visible que des robots attaquent votre serveur en ce moment même.",
      },
      {
        kind: "fields",
        title: "Complément, pas substitut",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Fail2ban + clés SSH + `ufw limit` : trois couches complémentaires. Fail2ban seul ne protège pas contre le vol d'identifiants valides (phishing).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Se reposer sur fail2ban en gardant l'authentification par mot de passe faible : un mot de passe deviné une fois suffit, le bannissement arrive trop tard.",
          },
        ],
      },
    ],
  },
  {
    id: "wireshark-analyse",
    title: "Wireshark : lire le trafic (analyse défensive)",
    level: 3,
    intro:
      "Voir ce qui circule vraiment sur le réseau : l'outil d'analyse du défenseur.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : Wireshark capture et décortique les paquets réseau pour comprendre ce qu'échangent les machines — trafic anormal, fuites en clair, comportements suspects. Pourquoi : quand un serveur se comporte bizarrement, le trafic ne ment pas. Quand : diagnostic d'incident, vérification qu'un service chiffre bien ses échanges, apprentissage des protocoles. Cadre : capturez uniquement sur vos propres réseaux/systèmes.",
      },
      {
        kind: "fields",
        title: "Les bases de l'analyse",
        fields: [
          {
            label: "Filtres d'affichage",
            value:
              "`http`, `tls.handshake`, `dns`, `ip.addr == 192.0.2.10` : on filtre pour ne regarder que le trafic pertinent au lieu de se noyer dans les paquets.",
          },
          {
            label: "Suivre un flux",
            value:
              "Clic droit → « Suivre le flux TCP » : reconstitue la conversation complète (requête/réponse HTTP par exemple).",
          },
          {
            label: "Ce qu'on y cherche",
            value:
              "Mots de passe ou tokens en clair (HTTP non chiffré), requêtes DNS vers des domaines suspects, volumes anormaux vers l'extérieur (exfiltration).",
          },
        ],
      },
      {
        kind: "fields",
        title: "Limites à connaître",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Le trafic chiffré (HTTPS) ne révèle que les métadonnées (IP, volumes, horaires) : c'est normal, c'est le but du chiffrement. L'analyse porte alors sur les comportements.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Capturer le trafic d'un réseau partagé (entreprise, wifi public) sans autorisation : illégal et contraire à l'éthique.",
          },
        ],
      },
      {
        kind: "text",
        text: "Ressource officielle : wireshark.org (documentation et guides d'utilisation).",
      },
    ],
  },
  {
    id: "owasp-top-10",
    title: "OWASP Top 10 : les risques web à connaître",
    level: 3,
    intro:
      "Le référentiel mondial des risques applicatifs : la check-list de tout développeur.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : l'OWASP (Open Worldwide Application Security Project) publie le Top 10 des risques de sécurité des applications web, consensus d'experts mis à jour périodiquement (édition 2021 : la référence publiée). Pourquoi : la majorité des failles applicatives appartiennent à ces 10 familles ; les connaître, c'est savoir où regarder en priorité quand on code ou quand on audite.",
      },
      {
        kind: "table",
        headers: ["Code", "Risque", "Idée de la défense"],
        rows: [
          ["A01:2021", "Contrôle d'accès défaillant", "Vérifier les droits à chaque requête, moindre privilège."],
          ["A02:2021", "Défaillances cryptographiques", "TLS partout, hashage adapté (argon2/bcrypt), pas de crypto maison."],
          ["A03:2021", "Injection", "Requêtes paramétrées, échappement, validation des entrées."],
          ["A04:2021", "Conception non sécurisée", "Menacer-modéliser dès la conception, pas après."],
          ["A05:2021", "Mauvaise configuration", "Durcir les défauts, en-têtes de sécurité, pas d'infos en debug."],
          ["A06:2021", "Composants vulnérables/obsolètes", "Inventaire des dépendances, mises à jour, `npm audit`."],
          ["A07:2021", "Échecs d'authentification", "2FA, anti force-brute, gestion de session sûre."],
          ["A08:2021", "Intégrité logicielle/données", "Signer les mises à jour, vérifier les pipelines CI/CD."],
          ["A09:2021", "Journalisation insuffisante", "Logger les événements de sécurité, alerter, conserver."],
          ["A10:2021", "SSRF", "Valider les URL côté serveur, segmenter le réseau interne."],
        ],
      },
      {
        kind: "text",
        text: "Les trois risques les plus exploités en pratique — injection, XSS (une forme d'injection) et CSRF — sont détaillés côté défense dans les sections suivantes. Référence officielle : owasp.org/www-project-top-ten et les fiches pratiques cheatsheetseries.owasp.org.",
      },
    ],
  },
  {
    id: "injection-sql-defense",
    title: "Défense : l'injection SQL",
    level: 3,
    intro:
      "Comprendre la faille pour ne jamais l'introduire : la requête paramétrée.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : l'injection SQL survient quand une entrée utilisateur est concaténée dans une requête SQL, permettant de modifier sa logique. Pourquoi c'est grave (A03:2021) : lecture, modification ou suppression de données, parfois exécution de commandes. La défense est simple et totale : ne jamais construire de SQL par concaténation.",
      },
      {
        kind: "code",
        language: "bash",
        title: "Le principe défensif (pseudo-code, valable en tout langage)",
        code: "# MAUVAIS — concaténation : l'entrée contrôle la requête\n# query = \"SELECT * FROM users WHERE name = '\" + input + \"'\"\n\n# BON — requête paramétrée : l'entrée reste une donnée, jamais du code\n# query = \"SELECT * FROM users WHERE name = ?\"\n# execute(query, [input])",
      },
      {
        kind: "fields",
        title: "La défense en couches",
        fields: [
          {
            label: "Requêtes paramétrées / ORM",
            value:
              "La mesure décisive : les paramètres sont envoyés séparément de la requête, le moteur SQL ne les interprète jamais comme du code.",
          },
          {
            label: "Moindre privilège SQL",
            value:
              "Le compte applicatif ne doit avoir que les droits nécessaires (souvent SELECT/INSERT/UPDATE, jamais DROP ni accès aux tables système).",
          },
          {
            label: "Validation des entrées",
            value:
              "Utile en complément (formats attendus, listes blanches), mais jamais comme seule défense : on ne « nettoie » pas du SQL à coups de regex.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Échapper les quotes à la main et croire le problème réglé : un seul oubli rouvre la faille. Paramétrage systématique, sans exception.",
          },
        ],
      },
    ],
  },
  {
    id: "xss-defense",
    title: "Défense : les attaques XSS (cross-site scripting)",
    level: 3,
    intro:
      "Quand votre site exécute du code à la place de l'utilisateur : l'échappement comme réflexe.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : le XSS injecte du JavaScript dans les pages vues par d'autres utilisateurs (commentaire, profil, message), qui s'exécute alors dans leur navigateur avec leurs droits. Pourquoi c'est grave : vol de session, actions à l'insu de l'utilisateur, défiguration. La défense : traiter toute donnée affichée comme du texte, jamais comme du code.",
      },
      {
        kind: "fields",
        title: "Les trois défenses complémentaires",
        fields: [
          {
            label: "Échappement en sortie",
            value:
              "La mesure de base : encoder les caractères spéciaux (`<`, `>`, `&`, quotes) au moment d'insérer des données dans le HTML. Les frameworks modernes (React, Vue, Angular) le font par défaut — le danger vient du `innerHTML` / `v-html` / `dangerouslySetInnerHTML` manuel.",
          },
          {
            label: "Content Security Policy (CSP)",
            value:
              "En-tête HTTP qui déclare d'où le navigateur peut charger/exécuter du script : même si un attaquant injecte du code, le navigateur refuse de l'exécuter s'il ne vient pas d'une source autorisée.",
          },
          {
            label: "Cookies HttpOnly + SameSite",
            value:
              "`HttpOnly` rend le cookie de session inaccessible au JavaScript (un script injecté ne peut plus le voler) ; `SameSite` limite son envoi cross-site.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Erreur classique",
        fields: [
          {
            label: "Erreur",
            value:
              "Valider côté client uniquement, ou « assainir » l'entrée à l'enregistrement mais afficher sans échapper.",
          },
          {
            label: "Bonne pratique",
            value:
              "Échapper au moment de l'affichage (contexte HTML, attribut, JS : trois contextes, trois encodages), pas au stockage.",
          },
        ],
      },
    ],
  },
  {
    id: "csrf-defense",
    title: "Défense : les attaques CSRF",
    level: 3,
    intro:
      "Quand un site tiers déclenche des actions sur votre site à l'insu de l'utilisateur connecté.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : le CSRF exploite le fait que le navigateur envoie automatiquement les cookies : un lien ou formulaire piégé sur un autre site déclenche une action (changement d'e-mail, virement, suppression) sur le site où la victime est connectée. Pourquoi : l'action est authentique côté serveur — seule l'intention est falsifiée.",
      },
      {
        kind: "fields",
        title: "Les défenses",
        fields: [
          {
            label: "Tokens anti-CSRF",
            value:
              "La défense de référence : un token secret unique par session, inclus dans chaque formulaire et vérifié côté serveur. Un site tiers ne connaît pas le token, sa requête forgée est rejetée.",
          },
          {
            label: "SameSite=Lax/Strict",
            value:
              "Attribut de cookie qui empêche son envoi lors de requêtes cross-site : simple et efficace en complément, supporté par tous les navigateurs modernes.",
          },
          {
            label: "Vérification de l'origine",
            value:
              "Contrôler les en-têtes `Origin`/`Referer` sur les actions sensibles : une défense additionnelle peu coûteuse.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Protéger les formulaires mais oublier les actions en GET (« /delete?id=42 ») : toute action à effet de bord doit exiger POST + token.",
          },
        ],
      },
    ],
  },
  {
    id: "controle-acces",
    title: "Contrôle d'accès : qui a droit à quoi",
    level: 3,
    intro:
      "Le risque n°1 de l'OWASP Top 10 : vérifier les autorisations à chaque requête, pas seulement à la connexion.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : le contrôle d'accès défaillant (A01:2021) permet d'accéder à des données ou fonctions réservées à d'autres — typiquement en manipulant un identifiant dans l'URL (`/factures/123` → `/factures/124`). Pourquoi c'est le n°1 : c'est fréquent, souvent trivial à exploiter, et les tests automatisés le ratent. Quand : sur chaque endpoint, chaque objet, chaque action.",
      },
      {
        kind: "fields",
        title: "Les règles de l'accès sûr",
        fields: [
          {
            label: "Vérifier côté serveur, à chaque fois",
            value:
              "Jamais se fier au fait que « le bouton n'est pas affiché » : l'autorisation se contrôle sur le serveur, pour chaque requête, sur l'objet demandé.",
          },
          {
            label: "Moindre privilège + refus par défaut",
            value:
              "Par défaut : rien n'est accessible. On ouvre explicitement, rôle par rôle (RBAC : admin, éditeur, lecteur…).",
          },
          {
            label: "IDs non prédictibles",
            value:
              "En complément : des identifiants non séquentiels (UUID) rendent l'énumération plus difficile — mais ce n'est pas une autorisation, juste un frein.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Vérifier le rôle au login puis faire confiance au client pour la suite : les requêtes HTTP se forgent à la main en quelques secondes.",
          },
        ],
      },
    ],
  },
  {
    id: "chiffrement-symetrique",
    title: "Chiffrement symétrique : AES",
    level: 3,
    intro:
      "Une clé pour chiffrer et déchiffrer : rapide, pour les données au repos et les flux.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : le chiffrement symétrique utilise la même clé secrète pour chiffrer et déchiffrer ; AES-256 est le standard actuel. Pourquoi ça existe : protéger la confidentialité des données stockées (disques, sauvegardes, bases) et des flux rapides. Quand l'utiliser : chiffrement de disque (LUKS, BitLocker, FileVault), sauvegardes chiffrées, données sensibles en base.",
      },
      {
        kind: "fields",
        title: "Ce qu'il faut en retenir",
        fields: [
          {
            label: "Le problème",
            value:
              "La distribution de la clé : comment la partager sans qu'elle soit interceptée ? C'est pour cela qu'on combine avec l'asymétrique (section suivante).",
          },
          {
            label: "Bonne pratique",
            value:
              "Utiliser des bibliothèques éprouvées (jamais de chiffrement « maison »), des modes modernes (GCM), des clés générées aléatoirement et stockées dans un gestionnaire de secrets.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Chiffrer avec AES mais stocker la clé en clair à côté des données : c'est un coffre-fort dont la clé est posée dessus.",
          },
        ],
      },
    ],
  },
  {
    id: "chiffrement-asymetrique",
    title: "Chiffrement asymétrique : clés publique/privée",
    level: 3,
    intro:
      "Deux clés liées : ce que l'une chiffre, seule l'autre déchiffre. La base de TLS et de SSH.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : la clé publique chiffre (ou vérifie une signature) et peut être diffusée ; la clé privée déchiffre (ou signe) et ne quitte jamais son propriétaire — RSA et ECDSA/Ed25519 sont les algorithmes courants. Pourquoi ça existe : résoudre le problème de distribution des clés du symétrique, et prouver l'identité (signatures).",
      },
      {
        kind: "diagram",
        title: "TLS simplifié : les deux chiffrements coopèrent",
        lines: [
          "Client ──clé publique du serveur──▶ chiffre une clé de session",
          "     (clé publique diffusée dans le certificat)",
          "Serveur ──clé privée──▶ déchiffre la clé de session",
          "     (clé privée jamais transmise)",
          "Puis : AES (symétrique, rapide) pour tout l'échange",
          "     avec la clé de session négociée",
        ],
      },
      {
        kind: "fields",
        title: "Usages à connaître",
        fields: [
          {
            label: "SSH",
            value:
              "Vos clés `ed25519` : la publique va dans `authorized_keys` du serveur, la privée reste sur votre machine, protégée par une phrase de passe.",
          },
          {
            label: "Signatures",
            value:
              "Prouver l'origine et l'intégrité : signatures de commits, de paquets logiciels, de documents (GPG).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Générer une clé sans phrase de passe « pour la simplicité » : quiconque copie le fichier possède votre identité.",
          },
        ],
      },
    ],
  },
  {
    id: "tls-certificats",
    title: "TLS et certificats : HTTPS partout",
    level: 3,
    intro:
      "Le cadenas du navigateur : confidentialité, intégrité et authenticité du serveur.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : TLS chiffre le trafic entre client et serveur et, via les certificats, prouve que le serveur est bien celui qu'il prétend être. Pourquoi : sans TLS, mots de passe et tokens transitent en clair, lisibles par n'importe quel intermédiaire réseau. Quand : partout — un site sans HTTPS est aujourd'hui signalé comme non sécurisé par les navigateurs.",
      },
      {
        kind: "command",
        label: "Vérifier le certificat et la chaîne TLS d'un site",
        command: "openssl s_client -connect example.com:443 -servername example.com",
        why: "`openssl s_client` ouvre une connexion TLS manuelle et affiche le certificat, sa chaîne de confiance et le protocole négocié : l'outil de diagnostic de base quand « le HTTPS ne marche pas ».",
        verify: "La sortie contient `Verify return code: 0 (ok)` et le bon nom de domaine dans le certificat.",
      },
      {
        kind: "command",
        label: "Obtenir un certificat gratuit avec Let's Encrypt",
        command: "sudo certbot --nginx -d example.com -d www.example.com",
        why: "`certbot` (Let's Encrypt, autorité gratuite et automatisée) obtient le certificat, configure le serveur web et met en place le renouvellement automatique (90 jours de validité).",
        verify: "`sudo certbot certificates` liste le certificat et sa date d'expiration ; le site répond en HTTPS.",
      },
      {
        kind: "fields",
        title: "Bonnes pratiques TLS",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Rediriger tout le HTTP vers HTTPS, activer HSTS (le navigateur n'acceptera plus que du HTTPS), renouvellement automatique surveillé.",
          },
          {
            label: "Erreur fréquente",
            value:
              "HTTPS sur la page de login mais HTTP ailleurs (« mixed content ») : la session reste interceptable.",
          },
        ],
      },
    ],
  },
  {
    id: "hashage-mots-de-passe",
    title: "Hashage des mots de passe : bcrypt et argon2",
    level: 3,
    intro:
      "Côté serveur, on ne stocke jamais un mot de passe : on stocke une empreinte coûteuse à inverser.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : une fonction de hashage transforme le mot de passe en empreinte invérifiable à l'envers ; à la connexion, on re-hash et on compare. Pourquoi des fonctions spéciales : MD5/SHA-256 sont trop rapides — des milliards d'essais par seconde avec un GPU. `bcrypt`, `scrypt` et `argon2` sont volontairement lents et paramétrables (facteur de coût), ce qui rend le craquage massif impraticable.",
      },
      {
        kind: "fields",
        title: "Les règles du hashage sûr",
        fields: [
          {
            label: "Algorithme",
            value:
              "`argon2id` (recommandation OWASP actuelle), `bcrypt` ou `scrypt`. Jamais MD5, SHA-1 ni SHA-256 seuls pour des mots de passe.",
          },
          {
            label: "Sel unique",
            value:
              "Chaque mot de passe reçoit un sel aléatoire unique : deux mêmes mots de passe donnent deux empreintes différentes, les tables pré-calculées (rainbow tables) deviennent inutiles. Les bibliothèques modernes le gèrent automatiquement.",
          },
          {
            label: "Facteur de coût",
            value:
              "Réglez la lenteur (~0,5-1 s par hash sur votre serveur) : assez lent pour l'attaquant, imperceptible pour l'utilisateur qui se connecte.",
          },
          {
            label: "Erreur fréquente",
            value:
              "« Hasher » côté client en JavaScript et stocker le hash tel quel : le hash devient alors le mot de passe. Le hashage protecteur se fait côté serveur.",
          },
        ],
      },
      {
        kind: "text",
        text: "Référence : le Password Storage Cheat Sheet sur cheatsheetseries.owasp.org détaille algorithmes et paramètres.",
      },
    ],
  },
  {
    id: "gestion-secrets",
    title: "Gestion des secrets applicatifs",
    level: 3,
    intro:
      "Clés d'API, tokens, mots de passe de base : les secrets ne vivent ni dans le code ni dans Git.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : un secret est toute valeur qui donne un pouvoir (clé API, token, mot de passe) ; sa fuite (dépôt public, logs, capture d'écran) équivaut à donner les clés. Pourquoi c'est critique : les robots scannent GitHub en permanence à la recherche de clés exposées, parfois en quelques minutes après le push.",
      },
      {
        kind: "fields",
        title: "Les règles des secrets",
        fields: [
          {
            label: "Variables d'environnement",
            value:
              "La base : les secrets vivent dans l'environnement du serveur, jamais en dur dans le code. Fichier `.env` local + `.env.example` (sans valeurs) versionné, `.env` dans `.gitignore`.",
          },
          {
            label: "Jamais dans Git",
            value:
              "Un secret poussé une fois est compromis pour toujours (l'historique Git le conserve) : il faut le révoquer et le regénérer, pas juste le supprimer du fichier.",
          },
          {
            label: "Coffres à secrets",
            value:
              "En équipe/production : gestionnaires dédiés (Vault, AWS Secrets Manager, variables chiffrées du CI) avec rotation et audit d'accès.",
          },
          {
            label: "Principe",
            value:
              "Moindre privilège : chaque secret n'ouvre que le strict nécessaire, avec une portée et une durée de vie limitées (tokens à expiration courte).",
          },
        ],
      },
      {
        kind: "command",
        label: "Vérifier qu'aucun secret ne traîne dans l'historique Git",
        command: "git log -p --all -S \"AKIA\" --pickaxe-regex | head -n 40",
        why: "Recherche dans tout l'historique les ajouts contenant un motif de clé (ici le préfixe des clés AWS) : un audit défensif avant de rendre un dépôt public ou après un doute.",
        verify: "Aucune sortie = aucun motif trouvé. En cas de fuite avérée : révoquez la clé côté fournisseur, ne vous contentez pas de la retirer.",
      },
    ],
  },
  {
    id: "durcissement-ssh",
    title: "Durcir SSH : la porte d'administration",
    level: 3,
    intro:
      "SSH est la cible n°1 des robots : clés obligatoires, root interdit, surface minimale.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : durcir SSH consiste à n'autoriser que l'authentification par clés, interdire root et restreindre qui peut se connecter. Pourquoi : le port 22 subit des attaques par force brute en continu sur tout serveur exposé.",
      },
      {
        kind: "command",
        label: "Générer une paire de clés Ed25519",
        command: "ssh-keygen -t ed25519 -C \"admin@mon-serveur\"",
        why: "Crée une clé privée (`~/.ssh/id_ed25519`, à protéger par une phrase de passe) et sa clé publique (`.pub`, à déployer). Ed25519 : moderne, rapide, clés courtes.",
        verify: "`ls -l ~/.ssh/id_ed25519*` : la privée est en `600` et vous seul la possédez.",
      },
      {
        kind: "command",
        label: "Déployer la clé publique sur le serveur",
        command: "ssh-copy-id utilisateur@serveur",
        why: "Copie la clé publique dans `~/.ssh/authorized_keys` du serveur via votre connexion actuelle : la prochaine connexion pourra se faire sans mot de passe.",
        verify: "`ssh -o PreferredAuthentications=publickey utilisateur@serveur` connecte sans demander de mot de passe.",
      },
      {
        kind: "fields",
        title: "Les 4 directives critiques de sshd_config",
        fields: [
          {
            label: "PasswordAuthentication no",
            value:
              "Désactive les mots de passe : seules les clés sont acceptées. À n'appliquer qu'APRÈS avoir vérifié que la connexion par clé fonctionne.",
          },
          {
            label: "PermitRootLogin no",
            value:
              "Interdit la connexion directe en root : on se connecte avec un utilisateur normal puis `sudo`.",
          },
          {
            label: "AllowUsers",
            value:
              "Liste blanche explicite des comptes autorisés en SSH : `AllowUsers deploy admin`. Tout le reste est refusé.",
          },
          {
            label: "Port personnalisé ?",
            value:
              "Changer le port réduit le bruit des robots mais n'est PAS une sécurité (obscurité ≠ protection). Utile en complément, jamais comme seule mesure.",
          },
        ],
      },
      {
        kind: "command",
        label: "Recharger SSH après modification (sans couper les sessions)",
        command: "sudo sshd -t && sudo systemctl reload ssh",
        why: "`sshd -t` valide la syntaxe de la configuration avant de l'appliquer : une erreur de frappe ici peut verrouiller tout accès distant. `reload` applique sans tuer les connexions existantes.",
        verify: "`sshd -t` ne doit rien afficher (silence = valide). Gardez une session ouverte pendant le test.",
      },
    ],
  },
  {
    id: "journalisation-logs",
    title: "Journalisation : les traces qui parlent",
    level: 3,
    intro:
      "Sans journaux, un incident est invisible : logger, centraliser, surveiller.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : les journaux (logs) enregistrent qui a fait quoi et quand — connexions, erreurs, accès — et constituent la matière première de la détection (A09:2021 quand elle manque). Pourquoi : la plupart des compromissions sont découvertes des semaines après via les logs, ou jamais sans eux.",
      },
      {
        kind: "command",
        label: "Lire les journaux SSH des dernières 24 h",
        command: "journalctl -u ssh --since \"24 hours ago\" --no-pager | tail -n 40",
        why: "`journalctl` interroge les journaux système : filtrer par service (`-u ssh`) et par période permet de repérer rafales de tentatives et connexions inhabituelles.",
      },
      {
        kind: "command",
        label: "Compter les tentatives SSH échouées par IP",
        command: "grep \"Failed password\" /var/log/auth.log | grep -oE \"[0-9]+\\.[0-9]+\\.[0-9]+\\.[0-9]+\" | sort | uniq -c | sort -rn | head",
        why: "Agrège les échecs d'authentification par adresse source : les IP en tête de liste sont vos « visiteurs » les plus insistants — à confronter avec `fail2ban-client status sshd`.",
      },
      {
        kind: "fields",
        title: "Logger utile",
        fields: [
          {
            label: "Quoi journaliser",
            value:
              "Authentifications (succès/échecs), changements de privilèges, accès aux données sensibles, erreurs applicatives, actions d'administration. Avec horodatage synchronisé (NTP).",
          },
          {
            label: "Bonne pratique",
            value:
              "Centraliser les logs hors de la machine surveillée : un attaquant efface d'abord les traces locales. Conserver selon vos obligations légales.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Logger les mots de passe ou tokens « pour débugger » : les logs deviennent alors un coffre de secrets en clair.",
          },
        ],
      },
    ],
  },
  {
    id: "detection-intrusion",
    title: "Détection : Lynis et les signaux faibles",
    level: 3,
    intro:
      "Auditer automatiquement la configuration : la machine qui vérifie ce que l'humain oublie.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : un auditeur comme Lynis passe en revue des centaines de points de configuration (permissions, services, pare-feu, mises à jour) et produit un score avec des recommandations priorisées. Pourquoi : l'œil humain rate les dérives lentes ; un audit régulier les rend visibles.",
      },
      {
        kind: "command",
        label: "Lancer un audit système complet avec Lynis",
        command: "sudo apt install -y lynis && sudo lynis audit system",
        why: "Lynis (open source, cisofy.com/lynis) audite la configuration sans rien modifier : chaque test affiche OK, avertissement ou suggestion avec référence.",
        verify: "En fin de rapport : le « Hardening index » et la section des suggestions à traiter par priorité.",
      },
      {
        kind: "fields",
        title: "Signaux faibles d'intrusion",
        fields: [
          {
            label: "À surveiller",
            value:
              "Fichiers modifiés récemment dans `/etc` ou `/bin`, processus inconnus, connexions sortantes vers des IP inconnues, comptes créés sans raison, tâches planifiées (`cron`) ajoutées.",
          },
          {
            label: "Intégrité des fichiers",
            value:
              "Des outils comme AIDE prennent une empreinte de référence des fichiers système et signalent toute modification ultérieure : la détection d'intégrité.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Lancer l'audit une fois puis l'oublier : la valeur est dans la répétition (après chaque changement majeur).",
          },
        ],
      },
    ],
  },
  {
    id: "reponse-incidents",
    title: "Réponse aux incidents : le plan avant la panique",
    level: 3,
    intro:
      "Quand (pas si) ça arrive : une méthode en 4 phases, préparée à froid.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : la réponse aux incidents est la procédure qui transforme une compromission en événement géré — inspirée du guide NIST SP 800-61. Pourquoi : sans plan, on improvise sous stress, on détruit des preuves et on prolonge l'indisponibilité.",
      },
      {
        kind: "steps",
        steps: [
          {
            title: "1. Détecter et qualifier",
            detail:
              "Alerte (logs, Lynis, utilisateur) → vérifier : s'agit-il d'un vrai incident ? Quelle machine, quel périmètre ? Ne pas éteindre brutalement : la mémoire et les logs sont des preuves.",
          },
          {
            title: "2. Contenir",
            detail:
              "Isoler la machine du réseau (sans l'éteindre si possible), révoquer les accès compromis, bloquer les IP malveillantes au pare-feu. Objectif : stopper la propagation.",
          },
          {
            title: "3. Éradiquer et restaurer",
            detail:
              "Identifier le point d'entrée (logs), supprimer la cause, restaurer depuis des sauvegardes saines vérifiées — jamais « nettoyer » un système compromis en place sans certitude.",
          },
          {
            title: "4. Tirer les leçons",
            detail:
              "Post-mortem écrit : chronologie, cause racine, ce qui a bien/mal fonctionné, actions correctives (patch, règle pare-feu, formation). C'est le livrable le plus précieux.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Préparer à froid",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Écrire le plan (contacts, accès d'urgence, sauvegardes) AVANT l'incident et le tester en exercice : un plan non testé est une fiction.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Payer ou négocier dans la précipitation, ou restaurer sans avoir fermé la porte d'entrée : la réinfection est quasi garantie.",
          },
        ],
      },
    ],
  },
  {
    id: "vulnerabilites-cve",
    title: "Vulnérabilités : CVE, NVD et CVSS",
    level: 3,
    intro:
      "Le langage commun des failles : identifier, évaluer, prioriser.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : quand une faille est découverte, elle reçoit un identifiant CVE (ex. `CVE-2024-1234`), est documentée dans la base NVD du NIST avec un score de gravité CVSS. Pourquoi : ce vocabulaire standard permet de savoir en minutes si votre version d'un logiciel est concernée et à quel point c'est urgent.",
      },
      {
        kind: "fields",
        title: "Lire une fiche de vulnérabilité",
        fields: [
          {
            label: "CVE",
            value:
              "L'identifiant unique (cve.mitre.org) : la référence à citer dans les rapports et les recherches.",
          },
          {
            label: "NVD / CVSS",
            value:
              "La NVD (nvd.nist.gov) enrichit chaque CVE d'un score CVSS (0-10) : criticité, vecteur d'attaque, complexité. Un 9.8 « network, low complexity, no privileges » = patcher immédiatement.",
          },
          {
            label: "En pratique",
            value:
              "`apt list --upgradable` + les bulletins de sécurité de votre distribution : la plupart des CVE vous concernent via les mises à jour, d'où l'hygiène n°3.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Prioriser sans paniquer",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Croiser le score CVSS avec votre exposition réelle : une faille critique sur un service non exposé attendra le créneau de maintenance ; la même sur un service public se patch dans l'heure.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Traiter tous les scores « high » de la même façon, ou ignorer les « medium » sur des systèmes critiques.",
          },
        ],
      },
    ],
  },
  {
    id: "dependances-obsoletes",
    title: "Composants vulnérables : dépendances et supply chain",
    level: 3,
    intro:
      "Votre application hérite des failles de ses dépendances : l'inventaire continu.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : le risque A06:2021 rappelle que le code que vous n'avez pas écrit (bibliothèques, frameworks, images Docker) apporte ses propres vulnérabilités. Pourquoi : une application moderne compte des centaines de dépendances transitives ; un seul paquet abandonné peut être la porte d'entrée.",
      },
      {
        kind: "command",
        label: "Auditer les dépendances d'un projet Node.js",
        command: "npm audit",
        why: "`npm audit` compare vos dépendances aux bases de vulnérabilités connues et propose les mises à jour correctives : l'équivalent logiciel des bulletins CVE.",
        verify: "`npm audit` doit rapporter 0 vulnérabilité, ou chaque restante doit être justifiée et suivie.",
      },
      {
        kind: "fields",
        title: "Hygiène des dépendances",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Fichier de verrouillage (`package-lock.json`, `poetry.lock`) versionné, mises à jour régulières, alertes automatiques (Dependabot/Renovate), suppression des dépendances inutilisées.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Épingler une vieille version « parce que ça marche » sans suivre ses CVE : la dette de sécurité est la plus chère des dettes techniques.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-frequentes",
    title: "Erreurs fréquentes",
    level: 3,
    intro:
      "Neuf classiques qui causent la majorité des incidents évitables.",
    blocks: [
      {
        kind: "fields",
        title: "Erreur 1/9",
        fields: [
          { label: "Problème", value: "Mot de passe réutilisé partout, dont sur la messagerie." },
          { label: "Pourquoi c'est dangereux", value: "Une seule fuite expose tous les comptes via le credential stuffing automatisé." },
          { label: "Mauvais", value: "« Mon mot de passe est compliqué, je le réutilise. »" },
          { label: "Mieux", value: "Gestionnaire de mots de passe + mot de passe unique par service + 2FA sur la messagerie." },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 2/9",
        fields: [
          { label: "Problème", value: "Serveur SSH avec authentification par mot de passe faible, root autorisé." },
          { label: "Pourquoi c'est dangereux", value: "Les robots tentent des milliers de combinaisons par jour sur le port 22." },
          { label: "Mauvais", value: "`PermitRootLogin yes` + mot de passe « admin123 »." },
          { label: "Mieux", value: "Clés Ed25519, `PasswordAuthentication no`, `PermitRootLogin no`, `ufw limit 22/tcp`." },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 3/9",
        fields: [
          { label: "Problème", value: "Base de données (MongoDB, Redis, MySQL) exposée directement sur Internet." },
          { label: "Pourquoi c'est dangereux", value: "Des dizaines de milliers d'instances sont pillées ou rançonnées chaque année pour cette raison." },
          { label: "Mauvais", value: "`bind 0.0.0.0` sans authentification « temporairement »." },
          { label: "Mieux", value: "Écoute sur `localhost`/réseau privé uniquement + authentification + pare-feu." },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 4/9",
        fields: [
          { label: "Problème", value: "Concaténer des entrées utilisateur dans du SQL." },
          { label: "Pourquoi c'est dangereux", value: "Injection SQL : lecture/modification/suppression de données (A03:2021)." },
          { label: "Mauvais", value: "`\"SELECT * FROM users WHERE name = '\" + input + \"'\"`" },
          { label: "Mieux", value: "Requêtes paramétrées systématiques + compte SQL au moindre privilège." },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 5/9",
        fields: [
          { label: "Problème", value: "Afficher des données utilisateur sans échappement (`innerHTML`, `v-html`)." },
          { label: "Pourquoi c'est dangereux", value: "XSS : exécution de JavaScript dans le navigateur des victimes, vol de session." },
          { label: "Mauvais", value: "`element.innerHTML = commentaireUtilisateur`" },
          { label: "Mieux", value: "Échappement par défaut du framework + CSP + cookies `HttpOnly`." },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 6/9",
        fields: [
          { label: "Problème", value: "Secrets (clés API, tokens) committés dans Git." },
          { label: "Pourquoi c'est dangereux", value: "Scannés en minutes par des robots ; l'historique Git les conserve pour toujours." },
          { label: "Mauvais", value: "Clé en dur dans `config.js` versionné." },
          { label: "Mieux", value: "Variables d'environnement, `.env` ignoré, secret révoqué/regénéré dès la fuite." },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 7/9",
        fields: [
          { label: "Problème", value: "Stocker les mots de passe en clair ou en MD5/SHA-1." },
          { label: "Pourquoi c'est dangereux", value: "À la première fuite de base, tous les mots de passe sont immédiatement exploitables." },
          { label: "Mauvais", value: "`md5(mot_de_passe)` en base." },
          { label: "Mieux", value: "`argon2id` ou `bcrypt` avec sel unique et facteur de coût adapté." },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 8/9",
        fields: [
          { label: "Problème", value: "Ne jamais mettre à jour « parce que ça marche »." },
          { label: "Pourquoi c'est dangereux", value: "Les CVE publiques sont exploitées automatiquement en quelques heures." },
          { label: "Mauvais", value: "Serveur non patché depuis 2 ans exposé au web." },
          { label: "Mieux", value: "Mises à jour de sécurité automatiques + revue mensuelle des versions." },
        ],
      },
      {
        kind: "fields",
        title: "Erreur 9/9",
        fields: [
          { label: "Problème", value: "Sauvegarder sans tester la restauration, sur le même disque." },
          { label: "Pourquoi c'est dangereux", value: "Le jour du rançongiciel, la « sauvegarde » est chiffrée elle aussi — ou inutilisable." },
          { label: "Mauvais", value: "Copie sur la même machine, jamais vérifiée." },
          { label: "Mieux", value: "Règle 3-2-1, copie hors ligne/hors site, restauration testée et documentée." },
        ],
      },
    ],
  },
  {
    id: "projets-realistes",
    title: "Projets réalistes et progressifs",
    level: 3,
    intro:
      "Quatre projets 100 % défensifs, sur vos propres systèmes : auditer, durcir, détecter, répondre.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Audit complet de votre serveur (débutant)",
        fields: [
          { label: "Objectif", value: "Appliquer la check-list 15 minutes puis produire un rapport d'audit écrit d'une VM ou d'un VPS à vous." },
          { label: "Compétences", value: "`ss -tuln`, `last`/`lastb`, `ufw`, lecture de `/var/log/auth.log`, inventaire des services." },
          { label: "Livrables", value: "Rapport : ports ouverts justifiés un par un, comptes listés, 5 recommandations priorisées." },
          { label: "Difficulté", value: "Débutant — 1 week-end." },
          { label: "Projet suivant", value: "Le projet 2, qui corrige tout ce que l'audit a révélé." },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — Durcissement guidé (intermédiaire)",
        fields: [
          { label: "Objectif", value: "Passer le score Lynis de votre serveur au vert : SSH par clés, pare-feu, fail2ban, mises à jour auto." },
          { label: "Compétences", value: "`sshd_config`, `ufw`, `fail2ban`, `unattended-upgrades`, permissions, moindre privilège." },
          { label: "Livrables", value: "Serveur durci + rapport Lynis avant/après + procédure écrite reproductible." },
          { label: "Difficulté", value: "Intermédiaire — 2 week-ends." },
          { label: "Projet suivant", value: "Le projet 3 : surveiller ce serveur durci." },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Détection d'intrusion maison (intermédiaire)",
        fields: [
          { label: "Objectif", value: "Mettre en place une surveillance : centralisation des logs, alertes sur tentatives SSH, audit hebdomadaire automatisé." },
          { label: "Compétences", value: "`journalctl`, script d'analyse des logs, `cron`, AIDE ou vérification d'intégrité, seuils d'alerte." },
          { label: "Livrables", value: "Rapport hebdomadaire automatique (tentatives bloquées, anomalies) + runbook « que faire si alerte »." },
          { label: "Difficulté", value: "Intermédiaire — 2 à 3 week-ends." },
          { label: "Projet suivant", value: "Le projet 4 : écrire le plan pour le jour où l'alerte est réelle." },
        ],
      },
      {
        kind: "fields",
        title: "Projet 4 — Plan de réponse aux incidents (avancé)",
        fields: [
          { label: "Objectif", value: "Rédiger et tester un plan de réponse complet pour un scénario (rançongiciel sur le serveur web), puis simuler l'exercice." },
          { label: "Compétences", value: "Méthode NIST SP 800-61, sauvegardes 3-2-1 testées, communication de crise, post-mortem." },
          { label: "Livrables", value: "Plan écrit (rôles, contacts, procédures), restauration testée chronométrée, compte-rendu d'exercice avec 3 améliorations." },
          { label: "Difficulté", value: "Avancé — 1 mois, en équipe si possible." },
          { label: "Projet suivant", value: "Spécialisation : AppSec (code), SOC (surveillance), ou gouvernance (politiques)." },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Aller plus loin, en commençant toujours par les sources officielles.",
    blocks: [
      {
        kind: "fields",
        title: "Références officielles (à privilégier)",
        fields: [
          { label: "OWASP", value: "owasp.org : Top 10 (owasp.org/www-project-top-ten) et les fiches pratiques défensives (cheatsheetseries.owasp.org)." },
          { label: "ANSSI", value: "anssi.fr : guides d'hygiène informatique et recommandations de l'agence nationale française." },
          { label: "NIST", value: "csrc.nist.gov : Cybersecurity Framework (nist.gov/cyberframework) et base de vulnérabilités NVD (nvd.nist.gov)." },
          { label: "CVE", value: "cve.mitre.org : le dictionnaire officiel des identifiants de vulnérabilités." },
        ],
      },
      {
        kind: "fields",
        title: "Outils et pratiques",
        fields: [
          { label: "Audit", value: "Lynis (cisofy.com/lynis) : audit de configuration open source." },
          { label: "Analyse réseau", value: "Wireshark (wireshark.org) : documentation et guides de capture." },
          { label: "Bannissement", value: "Fail2ban (fail2ban.org) : documentation des jails et filtres." },
          { label: "Hygiène personnelle", value: "haveibeenpwned.com : vérifier si vos comptes ont fuité ; KeePassXC/Bitwarden pour les mots de passe." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique légale : n'auditez que vos propres systèmes, ou dans le cadre écrit d'un programme de bug bounty.",
          "Communauté : les conférences (SSTIC, LeHack en France) publient leurs présentations — excellent pour rester à jour.",
          "Veille : bulletins de sécurité de votre distribution Linux + alertes du CERT-FR (ANSSI).",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "La cybersécurité maîtrisée dans ses fondamentaux, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir Linux et les réseaux : 80 % de la défense opérationnelle s'y joue.",
          "Apprendre le développement sécurisé (AppSec) : la Learning Page du langage que vous pratiquez, lue avec des yeux sécurité.",
          "Découvrir la surveillance : centralisation de logs, SIEM, analyse d'alertes — la voie SOC/blue team.",
          "Explorer la gouvernance : gestion des risques, conformité, politiques — la voie RSSI.",
          "Revenir à la roadmap : valider la compétence cybersécurité et passer à la suivante du parcours.",
        ],
      },
    ],
  },
];

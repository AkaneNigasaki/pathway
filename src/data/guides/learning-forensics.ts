import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de la forensique numérique : acquisition, analyse
 * disque et mémoire, timeline, chaîne de custody, rapport. Posture
 * strictement DÉFENSIVE et LÉGALE : on analyse ses propres images de test
 * ou des jeux de données pédagogiques, avec traçabilité complète. Aucune
 * instruction facilitant l'accès non autorisé à des données d'autrui.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_FORENSICS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est la forensique numérique : reconstituer des faits à partir de traces, avec une rigueur de laboratoire.",
    blocks: [
      {
        kind: "text",
        text: "La forensique numérique (ou investigation numérique) consiste à collecter, préserver et analyser des traces numériques — disque, mémoire, journaux, réseau — pour répondre à une question factuelle : que s'est-il réellement passé sur ce système ? Elle intervient après un incident de sécurité, mais aussi dans des contextes judiciaires, disciplinaires ou de simple diagnostic.",
      },
      {
        kind: "text",
        text: "Acquérir des copies fidèles, les analyser sans les altérer, et produire des conclusions traçables et vérifiables.",
      },
      {
        kind: "text",
        text: "Après une compromission, les questions sont factuelles : quand l'attaquant est-il entré, par où, qu'a-t-il touché, qu'a-t-il pris ? Sans méthode, on détruit les preuves en cherchant — et on accuse à tort.",
      },
      {
        kind: "fields",
        title: "La forensique : l'essentiel",
        fields: [          {
            label: "Quand s'en préoccuper",
            value:
              "Dès qu'un incident dépasse le « je réinstalle » : toute organisation qui veut comprendre, prouver ou poursuivre a besoin d'une capacité forensique minimale.",
          },
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni du piratage, ni de la récupération de données « magique » : c'est une discipline de rigueur (ne pas altérer, tout documenter, vérifier chaque affirmation) exercée sur ses propres systèmes ou avec mandat.",
          },
        ],
      },
      {
        kind: "text",
        text: "Point essentiel : cette page adopte une posture strictement défensive et légale. Vous apprendrez sur vos propres machines virtuelles et des images de test — jamais en fouillant les données d'autrui. L'analyse forensique de données ne vous appartenant pas, sans autorisation ou mandat, est illégale.",
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : l'ordre de volatilité",
    level: 1,
    intro:
      "La seule idée à retenir : certaines preuves disparaissent en secondes, d'autres survivent des années — on collecte dans le bon ordre.",
    blocks: [
      {
        kind: "diagram",
        title: "L'ordre de volatilité (du plus éphémère au plus durable)",
        lines: [
          "1. Registres CPU, cache ──────── secondes (inaccessible en pratique)",
          "2. Mémoire vive (RAM) ────────── minutes (couper l'alimentation = perdu)",
          "3. État réseau, connexions ───── minutes (tables ARP, sessions)",
          "4. Processus en cours ────────── minutes à heures",
          "5. Disque (fichiers, journaux) ─ années (même « supprimés »)",
          "6. Sauvegardes, archives ─────── années",
          "",
          "Règle : on collecte du plus volatil vers le moins volatil.",
          "Éteindre une machine suspecte détruit la mémoire :",
          "on l'isole du réseau, on ne l'éteint pas.",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : face à une machine suspecte, le premier réflexe n'est pas d'éteindre ni de « regarder ce qui se passe », c'est de préserver — isoler du réseau, capturer la mémoire, imager le disque. Pourquoi : chaque action sur le système vivant altère des preuves (horodatages, mémoire). La forensique commence par ne rien toucher.",
      },
      {
        kind: "fields",
        title: "Les trois questions du forensiste",
        fields: [
          {
            label: "Qu'est-ce qui est prouvable ?",
            value:
              "Seules les traces collectées avec intégrité vérifiée (hash) et chaîne de custody documentée ont une valeur — le reste est une opinion.",
          },
          {
            label: "Qu'est-ce que j'ai altéré ?",
            value:
              "Toute action laisse une trace : le forensiste documente ses propres manipulations pour les distinguer des faits.",
          },
          {
            label: "Quelle est l'hypothèse alternative ?",
            value:
              "Un fichier suspect peut être un malware… ou un outil d'admin légitime. On cherche aussi ce qui infirme l'hypothèse.",
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
          "Bases de Linux en ligne de commande : naviguer, `sudo`, permissions, redirections.",
          "Notions de systèmes de fichiers : ce qu'est une partition, un fichier supprimé, des métadonnées.",
          "Une machine virtuelle de test à vous (ou un vieux PC) pour créer vos propres images d'exercice.",
          "Rigueur documentaire : la forensique punit l'improvisation — tout se note.",
        ],
      },
      {
        kind: "text",
        text: "Si Linux vous est encore étranger, commencez par la Learning Page Linux de Pathway : 80 % de l'analyse forensique se fait en ligne de commande.",
      },
    ],
  },
  {
    id: "installation-outils",
    title: "Installer les outils d'analyse",
    level: 2,
    intro:
      "La trousse du forensiste : imagerie, analyse disque, analyse mémoire.",
    blocks: [
      {
        kind: "command",
        label: "Installer la boîte à outils forensique (Debian/Ubuntu)",
        command: "sudo apt install -y sleuthkit autopsy volatility3 dc3dd",
        why: "Sleuth Kit (`fls`, `ils`…) analyse les systèmes de fichiers à bas niveau, Autopsy en est l'interface graphique, Volatility analyse la mémoire vive, `dc3dd` est une version de `dd` avec hachage intégré pour l'imagerie.",
        verify: "fls -V && vol --help | head -5",
      },
      {
        kind: "fields",
        title: "Ce que fait chaque outil",
        fields: [
          {
            label: "dc3dd / dd",
            value:
              "Copie bit à bit d'un disque ou d'une partition vers un fichier image, avec calcul de hash : la base de toute acquisition.",
          },
          {
            label: "Sleuth Kit (fls, icat, ils)",
            value:
              "Explore le système de fichiers de l'image : fichiers supprimés, inodes, contenus bruts — sans monter l'image (donc sans l'altérer).",
          },
          {
            label: "Autopsy",
            value:
              "Interface graphique au-dessus de Sleuth Kit : navigation, recherche par mots-clés, timeline, étiquetage des pièces.",
          },
          {
            label: "Volatility 3",
            value:
              "Analyse les dumps de mémoire vive : processus, connexions réseau, modules chargés, artefacts d'injection.",
          },
        ],
      },
      {
        kind: "text",
        text: "Erreur fréquente : installer des dizaines d'outils « forensiques » obscurs. Bonne pratique : maîtriser ces quatre-là d'abord — ils couvrent 90 % des investigations courantes.",
      },
    ],
  },
  {
    id: "preparer-labo",
    title: "Préparer son laboratoire",
    level: 2,
    intro:
      "Un terrain d'exercice sûr : vos propres images, jamais des disques d'autrui.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer une VM de test",
            detail:
              "Une machine virtuelle Linux à vous (VirtualBox, UTM) : c'est le « suspect » sur lequel vous vous exercerez.",
          },
          {
            title: "Fabriquer des traces",
            detail:
              "Créez des fichiers, supprimez-en, installez un paquet, naviguez : vous saurez exactement ce qu'il faut retrouver — idéal pour apprendre.",
          },
          {
            title: "Prendre un instantané",
            detail:
              "Snapshot de la VM avant chaque exercice : on peut recommencer à volonté sans reconstruire le terrain.",
          },
          {
            title: "Préparer le stockage d'images",
            detail:
              "Un dossier dédié, sur un disque avec de la place (une image = la taille du disque source) : `~/forensics/cases/affaire-001/`.",
          },
          {
            title: "Ouvrir le carnet d'enquête",
            detail:
              "Un fichier texte horodaté par affaire : chaque commande, chaque observation y est notée au moment où elle a lieu.",
          },
        ],
      },
      {
        kind: "text",
        text: "Concepts liés : la chaîne de custody (section suivante) s'applique dès la première image créée — prenez l'habitude tout de suite, même en exercice.",
      },
    ],
  },
  {
    id: "chaine-de-custody",
    title: "La chaîne de custody",
    level: 2,
    intro:
      "Qui a touché quoi, quand : sans traçabilité, une preuve ne vaut rien.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : la chaîne de custody documente chaque manipulation d'une pièce (acquisition, copie, analyse, stockage) — qui, quand, quoi, pourquoi. Pourquoi : en justice comme en interne, une preuve dont on ne peut pas prouver l'intégrité et l'historique est contestable et souvent rejetée. Quand : dès la première acquisition, sans exception, même en exercice.",
      },
      {
        kind: "fields",
        title: "Le registre minimal d'une pièce",
        fields: [
          {
            label: "Identifiant",
            value:
              "Un nom unique et stable : `affaire-001-disque-sda.dd`. Jamais de `image-final-v2-definitive.dd`.",
          },
          {
            label: "Hash d'acquisition",
            value:
              "SHA-256 calculé au moment de la copie : c'est l'empreinte qui prouve que la copie est fidèle et n'a pas changé depuis.",
          },
          {
            label: "Journal",
            value:
              "Chaque accès noté : date, personne, action (« copie de travail créée », « analyse avec Autopsy »).",
          },
          {
            label: "Stockage",
            value:
              "Original en lecture seule (verrouillé), analyses sur des COPIES. On ne travaille jamais sur l'original.",
          },
        ],
      },
      {
        kind: "text",
        text: "Erreur fréquente : analyser directement le disque d'origine « pour aller plus vite ». Bonne pratique : l'original est scellé après hachage ; tout le travail se fait sur des copies vérifiées par hash.",
      },
    ],
  },
  {
    id: "imagerie-disque",
    title: "Imagerie disque : la copie bit à bit",
    level: 2,
    intro:
      "La première acquisition : copier tout, y compris l'espace « vide ».",
    blocks: [
      {
        kind: "command",
        label: "Imager une partition avec dc3dd (hash intégré)",
        command: "sudo dc3dd if=/dev/sdX1 of=affaire-001-sda1.dd hash=sha256 log=affaire-001-acquisition.log",
        why: "`dc3dd` copie chaque secteur, y compris l'espace libre et les fichiers supprimés, tout en calculant le SHA-256 et en journalisant l'opération : acquisition et preuve d'intégrité en une commande. Remplacez `/dev/sdX1` par VOTRE partition de test.",
        verify: "Comparez le hash du log avec `sha256sum affaire-001-sda1.dd` : ils doivent être identiques.",
      },
      {
        kind: "command",
        label: "Vérifier l'intégrité d'une image existante",
        command: "sha256sum affaire-001-sda1.dd",
        why: "Avant chaque session d'analyse, on re-vérifie le hash de la copie de travail contre le hash d'acquisition : toute différence signale une altération.",
      },
      {
        kind: "fields",
        title: "Règles d'or de l'acquisition",
        fields: [
          {
            label: "Bloqueur en écriture",
            value:
              "En contexte réel, on intercale un bloqueur en écriture matériel entre le disque et la station : aucune écriture accidentelle possible. En labo, imager depuis un live USB évite d'écrire sur la cible.",
          },
          {
            label: "Ne jamais monter en écriture",
            value:
              "Monter l'image (même en lecture) met à jour des métadonnées : on analyse avec Sleuth Kit/Autopsy qui lisent l'image sans la monter.",
          },
          {
            label: "Documenter",
            value:
              "Commande exacte, date, opérateur, hash : notés dans le carnet au moment de l'acquisition, pas après.",
          },
        ],
      },
    ],
  },
  {
    id: "premier-examen",
    title: "Premier examen : explorer une image avec Sleuth Kit",
    level: 2,
    intro:
      "Voir ce que contient l'image sans l'altérer : lister, extraire, identifier.",
    blocks: [
      {
        kind: "command",
        label: "Lister les fichiers (y compris supprimés)",
        command: "fls -r -p affaire-001-sda1.dd | head -n 40",
        why: "`fls` lit la table des fichiers directement dans l'image : `-r` récursif, `-p` affiche les chemins complets. Les entrées marquées `*` sont des fichiers supprimés mais récupérables.",
      },
      {
        kind: "command",
        label: "Extraire le contenu d'un fichier par son inode",
        command: "icat affaire-001-sda1.dd 12345 > fichier-recupere.bin",
        why: "`icat` extrait le contenu brut d'un inode sans passer par le système de fichiers monté : c'est ainsi qu'on récupère un fichier supprimé.",
      },
      {
        kind: "command",
        label: "Identifier le vrai type d'un fichier",
        command: "file fichier-recupere.bin",
        why: "`file` lit les signatures (magic numbers), pas l'extension : un `photo.jpg` qui est en réalité un exécutable est un signal classique.",
      },
      {
        kind: "command",
        label: "Chercher des chaînes lisibles dans une image",
        command: "strings -n 8 affaire-001-sda1.dd | grep -i -m 20 \"password\\|mot de passe\"",
        why: "`strings` extrait le texte brut du binaire : on y trouve des chemins, des URL, parfois des secrets — un premier tri rapide avant l'analyse fine.",
      },
      {
        kind: "text",
        text: "Concepts liés : Autopsy automatise tout cela en interface graphique (section niveau 3), et la timeline reconstitue la chronologie des événements.",
      },
    ],
  },
  {
    id: "cadre-legal",
    title: "Cadre légal et éthique (obligatoire)",
    level: 2,
    intro:
      "La règle absolue : on n'analyse que ce qu'on possède ou ce qu'on est mandaté à analyser.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : accéder à des données informatiques sans autorisation — y compris « juste pour regarder » ou « pour aider » — est une infraction pénale dans la plupart des pays (en France : Code pénal, articles 323-1 et suivants). Pourquoi c'est strict : la forensique donne accès à l'intime (messages, mots de passe, historique) ; seule l'autorisation ou le mandat légitime cet accès.",
      },
      {
        kind: "fields",
        title: "Les règles non négociables",
        fields: [
          {
            label: "Analysez uniquement",
            value:
              "Vos propres systèmes et images de test, ou des pièces confiées dans un cadre écrit (employeur, mandat judiciaire, client avec autorisation).",
          },
          {
            label: "Données personnelles",
            value:
              "Minimisez l'exposition : ne lisez que ce que l'enquête exige, ne copiez pas les données personnelles hors du périmètre, chiffrez le stockage des pièces.",
          },
          {
            label: "Divulgation",
            value:
              "Les conclusions se communiquent au mandant, pas publiquement. Une découverte de fait illégal se signale par les voies prévues, pas sur les réseaux.",
          },
          {
            label: "Exercices",
            value:
              "Les jeux de données pédagogiques (images d'entraînement publiques, CTF forensiques) sont le terrain légitime pour s'entraîner.",
          },
        ],
      },
    ],
  },
  {
    id: "carnet-enquete",
    title: "Tenir un carnet d'enquête",
    level: 2,
    intro:
      "La mémoire du forensiste est faillible : le carnet ne l'est pas.",
    blocks: [
      {
        kind: "list",
        items: [
          "Horodater chaque entrée : `2026-09-29 14:32 — fls sur affaire-001-sda1.dd, 3 fichiers supprimés trouvés dans /tmp`.",
          "Noter la commande EXACTE, pas un résumé : on doit pouvoir reproduire chaque résultat.",
          "Séparer faits et interprétations : « fichier X présent » (fait) vs « probablement déposé par… » (hypothèse, à vérifier).",
          "Noter les impasses : ce qu'on a cherché sans trouver est aussi une information.",
          "Versionner : un fichier texte avec horodatage suffit ; l'important est la régularité, pas l'outil.",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : un rapport forensique n'est que la mise en forme du carnet — si le carnet est vide, le rapport est une fiction. Erreur fréquente : « je m'en souviendrai ». Bonne pratique : écrire pendant l'analyse, jamais après.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 2,
    intro:
      "Les fautes qui ruinent une investigation avant même l'analyse.",
    blocks: [
      {
        kind: "fields",
        title: "Les classiques du débutant",
        fields: [
          {
            label: "Éteindre la machine suspecte",
            value:
              "Problème : la mémoire vive (processus, connexions, clés) est perdue à jamais. Pourquoi : réflexe « éteindre = arrêter le mal ». Mieux : isoler du réseau (débrancher), capturer la mémoire, puis imager.",
          },
          {
            label: "Analyser sur l'original",
            value:
              "Problème : chaque lecture/écriture altère métadonnées et hash — la preuve devient contestable. Pourquoi : aller plus vite. Mieux : original scellé, travail sur copies vérifiées.",
          },
          {
            label: "Oublier le hash",
            value:
              "Problème : impossible de prouver que l'image n'a pas changé. Pourquoi : « je le ferai après ». Mieux : hash calculé pendant l'acquisition, vérifié avant chaque session.",
          },
          {
            label: "Chercher ce qui confirme",
            value:
              "Problème : biais de confirmation — on ne voit que les traces qui accusent. Pourquoi : on a déjà une théorie. Mieux : chercher activement ce qui infirme l'hypothèse.",
          },
          {
            label: "Ne rien documenter",
            value:
              "Problème : résultats non reproductibles, rapport invérifiable. Pourquoi : « c'est évident ». Mieux : carnet horodaté en continu.",
          },
        ],
      },
    ],
  },
  {
    id: "mini-projet",
    title: "Mini-projet : votre première investigation",
    level: 2,
    intro:
      "De la VM de test au mini-rapport : le cycle complet en exercice.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Préparer la scène",
            detail:
              "Sur la VM de test : créez 3 fichiers texte avec du contenu identifiable, supprimez-en 1, renommez un exécutable en `.jpg`. Notez ce que vous avez fait (c'est la « vérité terrain »).",
          },
          {
            title: "Acquérir",
            detail:
              "`dc3dd` depuis un live USB ou snapshot : image + hash + log d'acquisition dans `affaire-001/`.",
          },
          {
            title: "Explorer",
            detail:
              "`fls -r -p` : retrouvez les 3 fichiers, le supprimé (marqué `*`), et identifiez le faux `.jpg` avec `file` après extraction par `icat`.",
          },
          {
            title: "Vérifier",
            detail:
              "Re-vérifiez le hash de l'image. Confirmez que chaque trouvaille correspond à la vérité terrain notée à l'étape 1.",
          },
          {
            title: "Rédiger",
            detail:
              "Une page : objectif, méthode (commandes), résultats (tableau : fichier, état, preuve), conclusion. Comparez au carnet : tout doit s'y retrouver.",
          },
        ],
      },
      {
        kind: "text",
        text: "Concepts liés : le niveau 3 ajoute la mémoire vive (Volatility), la timeline, les artefacts applicatifs et le rapport formel.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "acquisition-memoire",
    title: "Acquisition de la mémoire vive",
    level: 3,
    intro:
      "Capturer la RAM d'un système vivant : processus, connexions, clés — avant qu'ils ne disparaissent.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : la mémoire vive contient l'état vivant du système — processus en cours, connexions réseau, sessions déchiffrées, parfois mots de passe et clés — et disparaît à l'extinction. Pourquoi : un malware qui ne touche jamais le disque (« fileless ») n'existe QUE dans la mémoire ; sans dump RAM, il est invisible. Quand : en premier, sur machine isolée du réseau mais allumée, avec un outil d'acquisition (sur Linux : `avml`, `lime` ; l'outil dépend du système).",
      },
      {
        kind: "fields",
        title: "Règles d'acquisition mémoire",
        fields: [
          {
            label: "Ordre",
            value:
              "Toujours avant l'imagerie disque : la RAM est la plus volatile. Isoler du réseau d'abord (câble débranché), capturer ensuite.",
          },
          {
            label: "Outil externe",
            value:
              "Lancer l'acquisition depuis un support externe (USB) plutôt qu'en installant un outil sur la machine suspecte : chaque installation écrase de la mémoire.",
          },
          {
            label: "Hash",
            value:
              "Hacher le dump immédiatement après capture, comme pour le disque : même exigence d'intégrité.",
          },
          {
            label: "Documentation",
            value:
              "Heure exacte, état du système, outil et version : la mémoire est un instantané, son contexte est crucial.",
          },
        ],
      },
    ],
  },
  {
    id: "volatility-processus",
    title: "Volatility : analyser les processus",
    level: 3,
    intro:
      "Lire un dump mémoire : qui tournait, caché ou non.",
    blocks: [
      {
        kind: "command",
        label: "Identifier le profil du dump",
        command: "vol -f memoire.raw windows.info 2>/dev/null || vol -f memoire.raw linux.info",
        why: "Volatility doit connaître le système d'origine pour interpréter les structures mémoire : `windows.info`/`linux.info` l'identifient (version, build) et valident que le dump est lisible.",
      },
      {
        kind: "command",
        label: "Lister les processus",
        command: "vol -f memoire.raw windows.pslist",
        why: "`pslist` parcourt les structures du noyau pour lister les processus : PID, PPID, nom, heure de démarrage. C'est l'équivalent forensique du gestionnaire de tâches, sur un instantané figé.",
      },
      {
        kind: "command",
        label: "Détecter les processus masqués",
        command: "vol -f memoire.raw windows.psscan",
        why: "`psscan` balaye la mémoire brute à la recherche de structures de processus, y compris celles décrochées des listes officielles : un processus visible ici mais pas dans `pslist` est potentiellement masqué — signal d'alerte classique.",
      },
      {
        kind: "fields",
        title: "Lecture défensive",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Comparer `pslist` et `psscan`, vérifier les chemins d'exécutables (`C:\\Windows\\Temp\\svchost.exe` n'est pas normal), les PPID incohérents, les processus sans nom.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Conclure « malware » sur un nom étrange : vérifiez d'abord s'il s'agit d'un outil d'administration légitime — l'hypothèse alternative toujours.",
          },
        ],
      },
    ],
  },
  {
    id: "volatility-reseau",
    title: "Volatility : connexions et artefacts réseau",
    level: 3,
    intro:
      "Qui parlait à qui au moment de la capture : les connexions figées.",
    blocks: [
      {
        kind: "command",
        label: "Lister les connexions réseau",
        command: "vol -f memoire.raw windows.netscan",
        why: "`netscan` reconstitue les sockets TCP/UDP depuis la mémoire : adresses locales et distantes, ports, état, processus propriétaire. Une connexion sortante vers une IP inconnue sur un port inhabituel est un point de départ d'enquête.",
      },
      {
        kind: "text",
        text: "En une phrase : croiser les connexions (`netscan`) avec les processus (`pslist`) répond à « quel programme communiquait avec l'extérieur, et vers où ? ». Pourquoi : c'est souvent la seule trace d'une exfiltration ou d'un canal de commande — les logs réseau ne remontent pas toujours jusqu'au processus. Méthode : lister, trier par processus inconnu ou port inhabituel, vérifier la réputation des IP distantes via les sources de threat intel publiques.",
      },
      {
        kind: "fields",
        title: "Signaux à investiguer",
        fields: [
          {
            label: "Port inhabituel",
            value:
              "Un processus bureautique qui ouvre du 4444 ou du 8080 vers l'extérieur mérite vérification — mais peut aussi être une application métier légitime : vérifier avant de conclure.",
          },
          {
            label: "Processus sans nom",
            value:
              "Une connexion rattachée à un PID sans processus correspondant dans `pslist` : processus terminé ou masqué — creuser avec `psscan`.",
          },
        ],
      },
    ],
  },
  {
    id: "timeline",
    title: "Timeline : reconstituer la chronologie",
    level: 3,
    intro:
      "Mettre les événements en ordre : la timeline transforme des traces en récit.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : la timeline agrège les horodatages de toutes les sources (système de fichiers, journaux, registre, navigateur) en une chronologie unique — on voit alors la séquence : connexion à 14:02, fichier créé à 14:03, archive envoyée à 14:05. Pourquoi : un événement isolé ne prouve rien ; une séquence temporelle cohérente prouve un scénario. Outil de référence : Plaso (`log2timeline`) qui extrait et fusionne les horodatages automatiquement.",
      },
      {
        kind: "command",
        label: "Générer une timeline avec Plaso",
        command: "log2timeline.py timeline.plaso affaire-001-sda1.dd",
        why: "Plaso extrait tous les horodatages (MACB des fichiers, événements des journaux…) dans un format unique : c'est la matière première de la chronologie.",
      },
      {
        kind: "command",
        label: "Filtrer la timeline sur une période",
        command: "psort.py -o l2tcsv -w timeline.csv \"date > '2026-09-28 14:00:00' AND date < '2026-09-28 15:00:00'\" timeline.plaso",
        why: "`psort` filtre et exporte : on isole la fenêtre de l'incident suspecté au lieu de se noyer dans des millions d'événements.",
      },
      {
        kind: "fields",
        title: "Pièges des horodatages",
        fields: [
          {
            label: "Fuseaux horaires",
            value:
              "Un événement à « 14:00 » en UTC n'est pas à 14:00 locales : toujours vérifier et noter le fuseau, sinon la chronologie est fausse.",
          },
          {
            label: "Horloge modifiée",
            value:
              "Un attaquant peut changer l'heure système : des horodatages incohérents entre sources sont eux-mêmes un indice.",
          },
          {
            label: "Granularité",
            value:
              "Certains systèmes n'enregistrent qu'à la seconde : deux événements « simultanés » ne le sont pas forcément.",
          },
        ],
      },
    ],
  },
  {
    id: "artefacts-systeme",
    title: "Artefacts système : journaux et traces d'usage",
    level: 3,
    intro:
      "Le système raconte sa propre histoire : journaux, historiques, caches.",
    blocks: [
      {
        kind: "command",
        label: "Extraire les journaux système d'une image Linux",
        command: "icat affaire-001-sda1.dd $(fls -r -p affaire-001-sda1.dd | grep -m1 \"auth.log$\" | awk -F: '{print $1}' | tr -d ' *') 2>/dev/null | tail -n 30",
        why: "Les journaux d'authentification (`auth.log`) enregistrent connexions, sudo et échecs : extraits par inode depuis l'image, ils montrent qui s'est connecté et quand, sans altérer la pièce.",
      },
      {
        kind: "fields",
        title: "Artefacts clés par système",
        fields: [
          {
            label: "Linux",
            value:
              "`/var/log/auth.log` (connexions), `/var/log/syslog`, historique shell (`~/.bash_history`), `lastlog`/`wtmp` (sessions), tâches planifiées (`cron`).",
          },
          {
            label: "Windows",
            value:
              "Journal des événements (Security.evtx : ouvertures de session 4624/4625), registre (clés `Run`, USB branchés), Prefetch (programmes exécutés), `$Recycle.Bin`.",
          },
          {
            label: "Navigateurs",
            value:
              "Historique, téléchargements, cookies, cache : reconstituent l'activité web — souvent la porte d'entrée (pièce jointe, téléchargement).",
          },
          {
            label: "USB et périphériques",
            value:
              "Traces de périphériques branchés (registre Windows, logs Linux) : « une clé USB inconnue branchée à 3h du matin » est un fait d'enquête.",
          },
        ],
      },
      {
        kind: "text",
        text: "En une phrase : on ne cherche pas « le malware », on reconstitue l'activité — les artefacts d'usage légitime encadrent et datent l'anormal. Erreur fréquente : ne regarder que les fichiers suspects et rater le contexte (qui était connecté, que faisait-il à ce moment-là).",
      },
    ],
  },
  {
    id: "fichiers-supprimes",
    title: "Récupération de fichiers supprimés",
    level: 3,
    intro:
      "Supprimé n'est pas effacé : comprendre pourquoi, et jusqu'où on peut aller.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : supprimer un fichier ne fait généralement que marquer son espace comme libre — le contenu reste jusqu'à écrasement — d'où la récupération possible. Pourquoi c'est important : un attaquant qui « nettoie » ses traces laisse souvent des fichiers récupérables ; à l'inverse, l'absence de récupération ne prouve pas l'absence d'activité (écrasement, chiffrement).",
      },
      {
        kind: "command",
        label: "Lister les inodes supprimés",
        command: "fls -r -d -p affaire-001-sda1.dd | head -n 30",
        why: "L'option `-d` ne montre que les entrées supprimées : c'est l'inventaire de ce que quelqu'un a voulu faire disparaître — toujours intéressant.",
      },
      {
        kind: "command",
        label: "Extraire un fichier supprimé",
        command: "icat affaire-001-sda1.dd 23456 > recupere.txt && file recupere.txt",
        why: "Récupération par inode puis identification du type réel : la combinaison `fls -d` → `icat` → `file` est le workflow standard.",
      },
      {
        kind: "fields",
        title: "Limites à connaître",
        fields: [
          {
            label: "Écrasement partiel",
            value:
              "Un fichier partiellement réécrit donne un contenu mêlé : noter ce qui est récupéré, ne pas extrapoler le reste.",
          },
          {
            label: "SSD et TRIM",
            value:
              "Sur SSD moderne, la commande TRIM efface réellement les blocs libérés : la récupération y est bien plus difficile que sur disque mécanique.",
          },
          {
            label: "Chiffrement",
            value:
              "Sur volume chiffré sans la clé, les secteurs récupérés sont illisibles : la forensique s'arrête là où commence la cryptographie.",
          },
        ],
      },
    ],
  },
  {
    id: "analyse-statique",
    title: "Analyse statique défensive d'un fichier suspect",
    level: 3,
    intro:
      "Comprendre un fichier sans l'exécuter : triage sûr, en lecture seule.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : l'analyse statique examine un fichier suspect SANS l'exécuter — type réel, chaînes, hash, métadonnées — pour décider s'il mérite une analyse poussée, en sandbox isolée. Pourquoi sans exécution : lancer un malware, même « pour voir », c'est l'activer ; le triage statique est sans risque. Cadre : uniquement sur des fichiers issus de VOS investigations ou exercices.",
      },
      {
        kind: "command",
        label: "Hacher et identifier",
        command: "sha256sum suspect.bin && file suspect.bin",
        why: "Le hash permet de rechercher le fichier dans les bases publiques (est-il connu ?) et `file` révèle son vrai type : deux informations en dix secondes, zéro risque.",
      },
      {
        kind: "command",
        label: "Extraire les indicateurs textuels",
        command: "strings -n 6 suspect.bin | grep -E -m 30 \"https?://|[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}|\\.exe$|\\.dll$|powershell|cmd\\.exe\"",
        why: "Les chaînes révèlent les intentions : URL de contact, IP, noms d'outils système invoqués. Ce sont des indicateurs à recouper, pas des preuves d'exécution.",
      },
      {
        kind: "fields",
        title: "Règles de sécurité du triage",
        fields: [
          {
            label: "Jamais d'exécution locale",
            value:
              "Pas de double-clic « pour voir », pas d'ouverture avec l'application associée : l'analyse dynamique se fait en sandbox isolée, jamais sur la station d'analyse.",
          },
          {
            label: "Échantillon connu ?",
            value:
              "Rechercher le hash dans les bases publiques avant tout : si le fichier est un utilitaire légitime connu, l'enquête s'arrête là.",
          },
          {
            label: "Documenter",
            value:
              "Hash, origine (où trouvé, quand), observations : chaque fichier suspect est une pièce avec sa chaîne de custody.",
          },
        ],
      },
    ],
  },
  {
    id: "metadonnees",
    title: "Métadonnées : ce que les fichiers disent d'eux-mêmes",
    level: 3,
    intro:
      "Auteur, logiciel, GPS, historique : l'enveloppe parle autant que le contenu.",
    blocks: [
      {
        kind: "command",
        label: "Lire les métadonnées EXIF d'une image",
        command: "exiftool photo-suspecte.jpg | head -n 30",
        why: "`exiftool` affiche les métadonnées embarquées : appareil, date de prise, logiciel de retouche, parfois coordonnées GPS — des faits d'enquête potentiels.",
      },
      {
        kind: "command",
        label: "Métadonnées d'un document",
        command: "exiftool document.docx | grep -i -E \"author|creator|create date|modify date|software\"",
        why: "Les documents bureautiques embarquent auteur, dates et logiciel : utiles pour dater et attribuer — en gardant à l'esprit qu'elles sont modifiables.",
      },
      {
        kind: "fields",
        title: "Lecture critique",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Corroborer : une date EXIF seule ne prouve rien, mais une date EXIF + un horodatage système + un log cohérents prouvent beaucoup.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Prendre les métadonnées pour argent comptant : elles se falsifient en deux commandes — ce sont des indices, pas des preuves absolues.",
          },
        ],
      },
    ],
  },
  {
    id: "anti-forensics",
    title: "Anti-forensics : comprendre pour détecter",
    level: 3,
    intro:
      "Savoir comment on efface des traces pour reconnaître quand on a essayé.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : l'anti-forensics regroupe les techniques visant à détruire ou fausser les traces (effacement sécurisé, modification d'horodatages, chiffrement) — le forensiste les étudie pour DÉTECTER leur usage, pas pour les employer. Pourquoi : des journaux vidés, des horodatages incohérents ou un effaceur installé sont eux-mêmes des preuves d'intention ; les reconnaître fait partie de l'enquête.",
      },
      {
        kind: "fields",
        title: "Signes d'anti-forensics",
        fields: [
          {
            label: "Journaux tronqués ou vides",
            value:
              "Un `auth.log` qui s'arrête brutalement avant l'incident, ou une corbeille vidée à une heure inhabituelle : l'absence de trace EST une trace.",
          },
          {
            label: "Horodatages incohérents",
            value:
              "Fichier « créé » après sa « modification », dates futures ou groupées à la seconde près : signature d'une falsification manuelle.",
          },
          {
            label: "Outils d'effacement présents",
            value:
              "La présence d'un logiciel d'effacement sécurisé sur une machine qui n'en a pas l'usage légitime est un fait à consigner.",
          },
          {
            label: "Chiffrement opportuniste",
            value:
              "Un volume chiffré créé juste avant l'incident : protège peut-être des données légitimes — ou verrouille des preuves.",
          },
        ],
      },
      {
        kind: "text",
        text: "Posture : on documente ces observations comme des faits (« journaux absents entre le 12/03 et le 15/03 »), on n'en tire de conclusions qu'avec corroboration. Et on n'emploie jamais ces techniques pour entraver une enquête — ce serait de l'entrave.",
      },
    ],
  },
  {
    id: "rapport-forensique",
    title: "Rédiger le rapport forensique",
    level: 3,
    intro:
      "Le livrable : des faits vérifiables, une méthode reproductible, des conclusions mesurées.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Résumé exécutif",
            detail:
              "Une page, sans jargon : question posée, réponse en trois phrases, niveau de certitude. C'est ce que lira le décideur.",
          },
          {
            title: "Périmètre et méthode",
            detail:
              "Pièces analysées (identifiants + hash), outils et versions, commandes clés : un tiers doit pouvoir reproduire.",
          },
          {
            title: "Chronologie des faits",
            detail:
              "La timeline épurée : uniquement les événements prouvés, chacun sourcé (« auth.log, ligne 412 »).",
          },
          {
            title: "Constatations détaillées",
            detail:
              "Par thème (accès, fichiers, réseau) : fait, preuve, interprétation — en distinguant explicitement les trois.",
          },
          {
            title: "Limites",
            detail:
              "Ce que l'analyse n'a PAS pu établir (données chiffrées, logs absents) : l'honnêteté sur les limites fait la crédibilité.",
          },
          {
            title: "Conclusion et recommandations",
            detail:
              "Réponse à la question initiale avec degré de certitude (« établi », « probable », « indéterminé »), puis actions : techniques et organisationnelles.",
          },
        ],
      },
      {
        kind: "text",
        text: "En une phrase : le rapport forensique se relit en se demandant « un tiers pourrait-il refaire ce chemin ? » — si oui, il est bon.",
      },
    ],
  },
  {
    id: "debugging-enquete",
    title: "Debugging : quand l'enquête coince",
    level: 3,
    intro:
      "Impasse, contradiction, outil qui refuse : les réflexes de sortie.",
    blocks: [
      {
        kind: "fields",
        title: "Situations classiques",
        fields: [
          {
            label: "L'image ne se lit pas",
            value:
              "Vérifier le hash (image corrompue ?), le type (partition ou disque entier ?), essayer `mmls` pour la table des partitions avant `fls`.",
          },
          {
            label: "Volatility ne reconnaît pas le dump",
            value:
              "Mauvais profil ou dump incomplet : `windows.info` d'abord, vérifier la taille du fichier et la méthode d'acquisition.",
          },
          {
            label: "Deux sources se contredisent",
            value:
              "Ne pas choisir la plus arrangeante : chercher une troisième source, vérifier fuseaux horaires et intégrité de chaque pièce.",
          },
          {
            label: "Aucune trace de l'incident",
            value:
              "Élargir la fenêtre temporelle, vérifier qu'on analyse la bonne machine/période, envisager l'effacement (anti-forensics) comme hypothèse.",
          },
          {
            label: "Trop de données",
            value:
              "Revenir à la question initiale : filtrer par période, par utilisateur, par type d'artefact. Une enquête sans question se noie.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-investigation-disque",
    title: "Projet : investigation complète d'une image disque",
    level: 3,
    intro:
      "Le projet fil rouge : de l'acquisition au rapport.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Scénario",
            detail:
              "Sur votre VM de test, simulez un incident : créez un utilisateur, téléchargez un fichier (inoffensif), supprimez des traces, notez la vérité terrain dans une enveloppe scellée (fichier séparé).",
          },
          {
            title: "Acquisition",
            detail:
              "Image + hash + log, chaîne de custody ouverte, copie de travail vérifiée.",
          },
          {
            title: "Analyse",
            detail:
              "`fls`/`icat` pour les fichiers, journaux extraits, timeline Plaso sur la fenêtre de l'incident.",
          },
          {
            title: "Corroboration",
            detail:
              "Chaque fait prouvé par au moins deux sources indépendantes quand c'est possible.",
          },
          {
            title: "Rapport",
            detail:
              "Selon la structure de la section rapport : faits, chronologie, limites, conclusion. Comparez ensuite à la vérité terrain.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-analyse-memoire",
    title: "Projet : analyse d'un dump mémoire",
    level: 3,
    intro:
      "Le vivant figé : processus et connexions sous Volatility.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Capturer",
            detail:
              "Sur la VM de test : lancez quelques programmes identifiables, capturez la mémoire avec un outil d'acquisition, hashez le dump.",
          },
          {
            title: "Identifier",
            detail:
              "`windows.info`/`linux.info` : valider le profil et la lisibilité du dump.",
          },
          {
            title: "Inventorier",
            detail:
              "`pslist` : listez tous les processus avec PID, nom, heure de démarrage. Comparez à ce que vous aviez lancé.",
          },
          {
            title: "Chercher l'anormal",
            detail:
              "`psscan` vs `pslist`, `netscan` : y a-t-il des écarts ? Documentez chaque anomalie — même fabriquée pour l'exercice.",
          },
          {
            title: "Conclure",
            detail:
              "Tableau : processus, statut (attendu/inattendu), preuve, interprétation. C'est le format d'un finding forensique.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-timeline-incident",
    title: "Projet : timeline d'un incident simulé",
    level: 3,
    intro:
      "Raconter l'incident minute par minute, preuves à l'appui.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Scénario",
            detail:
              "Enchaînez des actions horodatées sur la VM (connexion, création de fichiers, suppressions) en notant l'heure exacte de chacune.",
          },
          {
            title: "Générer",
            detail:
              "Image disque, puis `log2timeline.py` et export filtré sur la fenêtre de l'exercice.",
          },
          {
            title: "Reconstituer",
            detail:
              "Ordonnez les événements, identifiez la séquence, rédigez le récit : « à 14:02…, à 14:03…, à 14:05… ».",
          },
          {
            title: "Vérifier",
            detail:
              "Comparez à vos notes d'actions : la timeline retrouve-t-elle tout ? Notez les écarts (fuseau, granularité) — ce sont vos leçons.",
          },
        ],
      },
      {
        kind: "text",
        text: "Concepts liés : ce projet prépare aux investigations réelles encadrées et au dialogue avec le SOC (qui fournit l'alerte initiale) et la gouvernance (qui reçoit le rapport).",
      },
    ],
  },
  {
    id: "yara",
    title: "YARA : détecter les malwares par règles",
    level: 3,
    intro: "Écrire des signatures comportementales pour trier les binaires suspects.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : YARA permet d'écrire des règles (chaînes, motifs hexadécimaux, conditions) qui identifient des familles de malwares dans des fichiers ou des dumps mémoire. Pourquoi : l'antivirus dit « sain/malveillant », YARA dit « ceci ressemble à tel ransomware » — indispensable au tri de masse.",
      },
      {
        kind: "command",
        label: "Scanner l'image avec YARA",
        command: "yara -r rules/malware.yar /mnt/image/",
        why: "Scanne récursivement le point de montage de l'image avec vos règles : chaque match donne le nom de la règle et le fichier concerné.",
        verify: "yara rules/malware.yar /bin/ls — un test négatif sur un binaire sain confirme que la règle ne fait pas de faux positifs grossiers.",
      },
      {
        kind: "fields",
        title: "Écrire de bonnes règles",
        fields: [
          {
            label: "Chaînes spécifiques",
            value: "Privilégier les chaînes uniques au malware (URLs de C2, messages d'erreur internes) plutôt que les chaînes génériques.",
          },
          {
            label: "Tester les deux sens",
            value: "Chaque règle se teste sur des échantillons positifs ET sur des binaires sains : un faux positif en enquête coûte des heures.",
          },
          {
            label: "Métadonnées",
            value: "Auteur, date, description, référence : une règle sans contexte est inutilisable par un collègue six mois plus tard.",
          },
        ],
      },
    ],
  },
  {
    id: "email-forensics",
    title: "Forensique e-mail : lire les en-têtes",
    level: 3,
    intro: "Reconstituer le trajet réel d'un message : l'arme anti-phishing.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : les en-têtes d'un e-mail (Received, Return-Path, Authentication-Results) racontent son vrai parcours — l'expéditeur affiché, lui, ment facilement. Pourquoi : 90 % des intrusions commencent par un e-mail ; savoir lire les en-têtes, c'est savoir d'où vient vraiment l'attaque.",
      },
      {
        kind: "fields",
        title: "Les en-têtes qui comptent",
        fields: [
          {
            label: "Received (du bas vers le haut)",
            value: "La chaîne des serveurs traversés, lue de bas en haut : le premier saut révèle l'origine réelle, les suivants sont falsifiables.",
          },
          {
            label: "Authentication-Results",
            value: "SPF, DKIM, DMARC : trois protocoles qui authentifient l'expéditeur — un échec ici est un drapeau rouge majeur.",
          },
          {
            label: "Return-Path vs From",
            value: "Si l'adresse de rebond diffère de l'expéditeur affiché, le message a probablement été forgé.",
          },
        ],
      },
      {
        kind: "text",
        text: "En pratique : analysez les .eml suspects dans une VM isolée, jamais sur votre poste — pièces jointes et liens restent dangereux même « pour analyse ».",
      },
    ],
  },
  {
    id: "registre-windows",
    title: "Registre Windows : la mémoire du système",
    level: 3,
    intro: "Programmes exécutés, périphériques, persistance : le registre sait tout.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : le registre Windows enregistre les programmes exécutés, les périphériques connectés et les mécanismes de démarrage — c'est le journal d'activité que l'utilisateur ne peut pas effacer d'un clic. Pourquoi : un attaquant qui s'installe laisse des traces ici même s'il supprime ses fichiers.",
      },
      {
        kind: "table",
        headers: ["Emplacement", "Ce qu'on y trouve", "Question résolue"],
        rows: [
          ["Amcache.hve", "Programmes exécutés (hash, chemin)", "Quoi a tourné sur cette machine ?"],
          ["SYSTEM\\CurrentControlSet\\Enum\\USBSTOR", "Périphériques USB branchés", "Quelle clé USB, quand ?"],
          ["SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run", "Programmes au démarrage", "Comment persiste-t-il ?"],
          ["NTUSER.DAT (par utilisateur)", "Historique, MRU, périphériques", "Qu'a fait cet utilisateur ?"],
        ],
      },
      {
        kind: "text",
        text: "En pratique : extrayez les ruches depuis l'image (pas du système vivant) et analysez-les avec RegRipper ou Registry Explorer — jamais sur la machine suspecte.",
      },
    ],
  },
  {
    id: "linux-forensics",
    title: "Forensique Linux : logs et traces",
    level: 3,
    intro: "Authentifications, planificateur, historique : les traces d'un serveur.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : sur Linux, tout passe par des fichiers texte — /var/log/auth.log pour les connexions, les cron pour la persistance, l'historique shell pour les commandes. Pourquoi : un serveur compromis se diagnostique d'abord dans ses logs, avant tout outil exotique.",
      },
      {
        kind: "command",
        label: "Échecs d'authentification",
        command: "grep -i \"failed\\|invalid\" /mnt/image/var/log/auth.log | head -20",
        why: "Extrait les échecs d'authentification de l'image montée : une vague de 'Failed password' révèle un brute-force ou une compromission de compte.",
        verify: "ls -la /mnt/image/var/log/ — vérifie quels logs existent et leurs dates : un log manquant ou tronqué est une information en soi.",
      },
      {
        kind: "fields",
        title: "Les traces à vérifier",
        fields: [
          {
            label: "Cron et systemd",
            value: "Tâches planifiées de tous les utilisateurs + timers systemd : la persistance préférée des attaquants sur Linux.",
          },
          {
            label: "Historiques shell",
            value: ".bash_history par utilisateur : les commandes tapées — souvent la preuve directe de l'intrusion.",
          },
          {
            label: "Fichiers modifiés récemment",
            value: "find avec -mtime sur les binaires système : un binaire modifié hors mise à jour est suspect.",
          },
        ],
      },
    ],
  },
  {
    id: "forensique-reseau",
    title: "Forensique réseau : les captures",
    level: 3,
    intro: "Rejouer les conversations : ce que les paquets révèlent.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : une capture réseau (pcap) enregistre les conversations réelles — avec elle, on rejoue l'exfiltration, le C2, le scan, même des mois après. Pourquoi : les logs disent « qui s'est connecté », le pcap dit « quoi s'est échangé ».",
      },
      {
        kind: "command",
        label: "Relire une capture réseau",
        command: "tcpdump -r capture.pcap -n 'tcp port 443' | head -30",
        why: "Relit une capture existante filtrée sur le HTTPS : repère les sessions longues ou volumineuses, typiques d'une exfiltration.",
        verify: "capinfos capture.pcap — affiche durée, volume, nombre de paquets : cadre l'analyse avant de plonger.",
      },
      {
        kind: "fields",
        title: "Analyser efficacement",
        fields: [
          {
            label: "Filtrer avant de lire",
            value: "Conversations triées par volume, DNS suspects, requêtes vers des IPs sans nom de domaine : on cherche l'anormal, pas tout.",
          },
          {
            label: "Extraire les objets",
            value: "Wireshark exporte les fichiers transférés (HTTP, SMB) : la preuve de ce qui est sorti.",
          },
          {
            label: "Corréler",
            value: "Horodatages pcap + timeline système : le paquet à 3h12 explique le fichier créé à 3h13.",
          },
        ],
      },
    ],
  },
  {
    id: "volatility-malware",
    title: "Volatility : chasser le malware en mémoire",
    level: 3,
    intro: "Détecter l'injection et le code caché : la mémoire ne ment pas.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : les malwares modernes vivent en mémoire sans fichier sur disque — les plugins malfind et ldrmodules de Volatility les débusquent en comparant ce que le système croit chargé et ce qui l'est vraiment. Pourquoi : c'est la seule façon fiable de voir l'invisible du disque.",
      },
      {
        kind: "command",
        label: "Détecter les injections mémoire",
        command: "vol -f memdump.raw windows.malfind --dump-dir ./injected/",
        why: "Détecte les zones mémoire exécutables non rattachées à un fichier (injection typique) et extrait le code pour analyse.",
        verify: "vol -f memdump.raw windows.ldrmodules — compare les trois listes de modules : un module présent dans une seule liste est caché, donc suspect.",
      },
      {
        kind: "fields",
        title: "Les signes d'infection",
        fields: [
          {
            label: "Processus sans parent",
            value: "Un processus dont le parent a disparu ou est incohérent : classique après injection.",
          },
          {
            label: "Hooks API",
            value: "Des fonctions système redirigées : le malware intercepte les appels pour se cacher.",
          },
          {
            label: "Connexions orphelines",
            value: "Des sockets réseau sans processus associé : un C2 qui se dissimule.",
          },
        ],
      },
    ],
  },
  {
    id: "event-logs",
    title: "Journaux d'événements Windows",
    level: 3,
    intro: "Les EventID qui racontent l'attaque : le récit chiffré.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : Windows journalise chaque connexion, chaque processus créé, chaque accès — à condition d'avoir activé l'audit : les EventID sont le langage de cette histoire. Pourquoi : sans ces logs, l'enquête Windows est aveugle ; avec eux, on reconstitue l'attaque minute par minute.",
      },
      {
        kind: "table",
        headers: ["EventID", "Journal", "Signification"],
        rows: [
          ["4624 / 4625", "Security", "Connexion réussie / échouée — le qui et le quand"],
          ["4688", "Security", "Création de processus (avec ligne de commande si activé)"],
          ["7045", "System", "Installation d'un service — persistance classique"],
          ["4104", "PowerShell", "Script PowerShell exécuté — l'arme favorite"],
        ],
      },
      {
        kind: "text",
        text: "Point crucial : 4688 sans ligne de commande et 4104 sans transcription valent dix fois moins — l'activation de l'audit avancé se décide AVANT l'incident, dans le durcissement.",
      },
    ],
  },
  {
    id: "prefetch",
    title: "Prefetch : quoi a tourné, quand",
    level: 3,
    intro: "Windows note chaque exécution : l'historique qu'on ne peut pas nier.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : Windows crée un fichier Prefetch à chaque exécution de programme, avec horodatages et compteur — même si le binaire a été supprimé depuis. Pourquoi : l'attaquant efface son malware, le Prefetch prouve qu'il a tourné, quand, et combien de fois.",
      },
      {
        kind: "command",
        label: "Lister les Prefetch Windows",
        command: "ls -lt /mnt/image/Windows/Prefetch/ | head -20",
        why: "Liste les Prefetch triés par date sur l'image montée : les exécutions récentes sautent aux yeux, y compris celles de binaires disparus.",
        verify: "Recouper un .pf suspect avec son chemin d'origine inscrit dedans : un Prefetch pointant vers un binaire absent confirme la suppression.",
      },
      {
        kind: "fields",
        title: "Lire un Prefetch",
        fields: [
          {
            label: "Nom de fichier",
            value: "NOM-HASH.pf : le hash identifie le chemin d'exécution — deux chemins différents donnent deux fichiers.",
          },
          {
            label: "Compteur",
            value: "Le nombre d'exécutions : 1 = test, 50 = persistance ou usage régulier.",
          },
          {
            label: "Limite",
            value: "128 fichiers max, les anciens sont écrasés : le Prefetch est une fenêtre récente, pas une archive.",
          },
        ],
      },
    ],
  },
  {
    id: "usb-artefacts",
    title: "Artefacts USB : qui a branché quoi",
    level: 3,
    intro: "Tracer les périphériques amovibles : le vecteur physique.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : chaque clé USB branchée laisse son numéro de série, sa marque et ses horodatages dans le registre et les logs — l'exfiltration physique laisse des traces numériques. Pourquoi : « des données sont sorties » se prouve souvent par « cette clé était branchée à cette heure-là ».",
      },
      {
        kind: "fields",
        title: "Les sources",
        fields: [
          {
            label: "USBSTOR (registre)",
            value: "Marque, modèle, numéro de série de chaque périphérique : l'inventaire des clés connues de la machine.",
          },
          {
            label: "setupapi.log",
            value: "Horodatage précis de la première installation du périphérique : le « quand » de la première connexion.",
          },
          {
            label: "LNK et Jump Lists",
            value: "Les fichiers ouverts depuis la clé laissent des raccourcis : ce qui a été lu ou copié.",
          },
        ],
      },
      {
        kind: "text",
        text: "Enquête type : USBSTOR donne le numéro de série → setupapi.log donne l'heure → les LNK donnent les fichiers touchés → la timeline donne le contexte.",
      },
    ],
  },
  {
    id: "mobile-apercu",
    title: "Forensique mobile : l'aperçu",
    level: 3,
    intro: "Smartphones : sauvegardes, extractions et limites légales.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : l'analyse d'un smartphone passe par des extractions logiques (sauvegardes) ou physiques (images), avec des outils spécialisés — et un cadre légal encore plus strict, car l'appareil est profondément personnel. Pourquoi c'est à part : chiffrement par défaut, verrouillage, diversité des modèles rendent l'acquisition plus complexe que sur PC.",
      },
      {
        kind: "fields",
        title: "Les niveaux d'extraction",
        fields: [
          {
            label: "Logique",
            value: "Sauvegarde via les outils du système (adb backup, iTunes) : accessible, mais limitée aux données exposées.",
          },
          {
            label: "Système de fichiers",
            value: "Accès complet aux fichiers (appareil déverrouillé/jailbreaké) : messages, bases SQLite des applis, géolocalisation.",
          },
          {
            label: "Physique",
            value: "Image bit à bit de la mémoire : la plus complète, la plus exigeante techniquement et juridiquement.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle d'or : ne jamais travailler sur l'original — toute manipulation modifie l'appareil. Et en labo, uniquement sur vos propres appareils ou avec autorisation écrite explicite.",
      },
    ],
  },
  {
    id: "autopsy",
    title: "Autopsy : l'atelier graphique",
    level: 3,
    intro: "Exploiter Sleuth Kit sans la ligne de commande : le workflow visuel.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : Autopsy est l'interface graphique de Sleuth Kit qui orchestre l'analyse (fichiers supprimés, timeline, mots-clés, hachage) dans un dossier d'enquête structuré. Pourquoi : il industrialise ce que les commandes font une par une — ingest modules, tri, rapports — tout en gardant la traçabilité.",
      },
      {
        kind: "command",
        label: "Lancer Autopsy",
        command: "autopsy",
        why: "Lance le serveur local d'Autopsy : l'interface web permet de créer le dossier (case), ajouter l'image disque et lancer les modules d'analyse.",
        verify: "Ouvrir http://localhost:9999 et vérifier que le dossier apparaît : l'ingestion démarre les modules (hash, fichiers supprimés, timeline).",
      },
      {
        kind: "fields",
        title: "Le workflow",
        fields: [
          {
            label: "Ingest modules",
            value: "Choisir les modules (recherche de mots-clés, correspondance de hash NSRL, extraction d'artefacts web) avant de lancer : tout relancer coûte du temps.",
          },
          {
            label: "Taguer",
            value: "Marquer les pièces (pertinent, suspect) au fil de l'analyse : le rapport se construit pendant l'enquête, pas après.",
          },
          {
            label: "Rapport",
            value: "Générer le rapport HTML/Excel depuis les tags : traçable, présentable, défendable.",
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
          "Ne jamais altérer : original scellé, travail sur copies, hash vérifié avant chaque session.",
          "Tout documenter : carnet horodaté en continu, commandes exactes, faits séparés des interprétations.",
          "Ordre de volatilité : mémoire avant disque, toujours, sur machine isolée mais allumée.",
          "Corroborer : un fait = deux sources indépendantes quand c'est possible.",
          "Chercher l'infirmation : l'hypothèse alternative n'est pas un luxe, c'est la méthode.",
          "Rester dans le mandat : périmètre écrit, données minimisées, conclusions au mandant uniquement.",
          "Connaître ses limites : chiffrement, données détruites, outils inadaptés — le dire clairement dans le rapport.",
          "Préserver la chaîne de custody : chaque manipulation tracée, chaque transfert signé.",
          "Ne pas exécuter : triage statique d'abord, sandbox isolée si exécution nécessaire.",
          "Se former en continu : les artefacts évoluent avec les OS — la veille fait partie du métier.",
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
            label: "Volatility Foundation",
            value: "volatilityfoundation.org : documentation de Volatility 3, symboles et guides d'analyse mémoire.",
          },
          {
            label: "Sleuth Kit",
            value: "sleuthkit.org : documentation des outils (`fls`, `icat`, `mmls`) et du format des systèmes de fichiers.",
          },
          {
            label: "Autopsy",
            value: "sleuthkit.org/autopsy : guides d'utilisation de l'interface d'analyse.",
          },
          {
            label: "Plaso",
            value: "plaso.readthedocs.io : documentation de `log2timeline` et `psort` pour les timelines.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Référentiels : SANS DFIR (sans.org) pour les posters et cheatsheets d'artefacts par OS.",
          "Pratique : les CTF forensiques et jeux de données d'entraînement publics pour s'exercer légalement.",
          "Cadre : le Code pénal (articles 323-1 et suivants) pour le volet légal français, les guides ANSSI pour la réponse aux incidents.",
          "Communauté : les dépôts GitHub des outils cités pour les cas concrets et les mises à jour.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "La forensique maîtrisée, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Remonter à l'alerte : SOC & Détection — comprendre comment l'incident a été détecté avant l'investigation.",
          "Élargir au cloud : Cloud Security — la forensique des journaux CloudTrail et des environnements éphémères.",
          "Structurer : Gouvernance & Conformité — le rapport forensique alimente la gestion des risques et les obligations légales.",
          "Comprendre l'attaquant (en méthode) : Pentest — la méthodologie d'évaluation cadrée éclaire les traces que vous analysez.",
          "Empêcher la récidive : Secure Coding et Cryptographie — corriger à la source ce que l'enquête a révélé.",
          "Revenir à la roadmap : valider Forensique et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

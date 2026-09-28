import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du SOC (Security Operations Center) et de la
 * détection : SIEM, triage d'alertes, règles de détection, playbooks de
 * réponse, threat intelligence, MITRE ATT&CK. Posture strictement
 * DÉFENSIVE : surveiller SES propres systèmes, détecter, qualifier,
 * répondre — jamais d'action offensive. 3 niveaux d'information
 * (Aperçu / Pratique / Approfondi) avec divulgation progressive. Tous les
 * textes supportent le code inline entre backticks.
 */
export const LEARNING_SOC: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est un SOC : le radar qui voit l'attaque quand elle arrive.",
    blocks: [
      {
        kind: "text",
        text: "Un SOC (Security Operations Center) est l'équipe — et ses outils — qui surveille en continu les systèmes d'une organisation pour détecter les activités malveillantes, qualifier les alertes et coordonner la réponse. Là où le pentest vérifie ponctuellement, le SOC regarde tout le temps : journaux, réseau, postes de travail.",
      },
      {
        kind: "fields",
        title: "Le SOC en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Collecter les signaux, détecter l'anormal, trier le vrai du faux, escalader vite quand c'est grave.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Les attaques modernes sont discrètes et rapides : sans surveillance continue, une intrusion se découvre des mois plus tard — quand les dégâts sont faits. Le SOC réduit ce délai de mois à minutes.",
          },
          {
            label: "Quand s'en préoccuper",
            value:
              "Dès qu'on exploite des systèmes exposés : même sans SOC formel, tout administrateur fait du « mini-SOC » (surveiller les logs, réagir aux anomalies).",
          },
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni de la surveillance des employés, ni du piratage inversé : on surveille ses propres systèmes avec des finalités de sécurité explicites, dans le respect du droit du travail et de la vie privée.",
          },
        ],
      },
      {
        kind: "text",
        text: "Point essentiel : cette page adopte une posture strictement défensive. Vous apprendrez à surveiller et analyser VOS propres systèmes et journaux — jamais à intercepter ou sonder ceux d'autrui.",
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : l'entonnoir du SOC",
    level: 1,
    intro:
      "La seule idée à retenir : des millions d'événements entrent, quelques incidents graves sortent — le métier, c'est le tri.",
    blocks: [
      {
        kind: "diagram",
        title: "L'entonnoir : du bruit au signal",
        lines: [
          "  Millions d'événements/jour (logs, flux réseau, télémétrie)",
          "        │  collecte et normalisation (SIEM)",
          "        ▼",
          "  Milliers d'alertes (règles de détection)",
          "        │  corrélation et déduplication",
          "        ▼",
          "  Dizaines de cas à qualifier (triage analyste)",
          "        │  enrichissement, investigation",
          "        ▼",
          "  Quelques incidents (escalade, réponse)",
          "        │  playbooks, forensique",
          "        ▼",
          "  Retour d'expérience → meilleures détections",
          "",
          "Le goulot : le triage humain. Tout le reste l'alimente.",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : un SOC transforme un volume inhumain de signaux en une poignée de décisions — détecter vite, qualifier juste, escalader à bon escient. Pourquoi le tri est central : 99 % des alertes sont des faux positifs ou du bénin ; un analyste noyé rate le vrai incident. D'où les deux disciplines reines : écrire de bonnes détections (peu de bruit) et trier vite et bien.",
      },
      {
        kind: "fields",
        title: "Les trois questions de l'analyste",
        fields: [
          {
            label: "Est-ce réel ?",
            value:
              "Vrai positif ou faux positif : corroborer par plusieurs sources avant de conclure — une alerte seule ne prouve rien.",
          },
          {
            label: "Est-ce grave ?",
            value:
              "Quel actif, quel impact potentiel : un malware sur un poste isolé n'est pas une compromission du domaine.",
          },
          {
            label: "Que fait-on maintenant ?",
            value:
              "Le playbook dit la suite : isoler, escalader, surveiller — décider vite, documenter toujours.",
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
          "Bases de Linux en ligne de commande : lire des logs, `grep`, `jq`, `ss`.",
          "Notions de réseaux : ports, protocoles, ce qu'est une connexion anormale.",
          "Comprendre les failles classiques en posture défensive (Learning Page Cybersécurité).",
          "Un système à vous à surveiller : votre labo, votre serveur, votre VM.",
        ],
      },
      {
        kind: "text",
        text: "Si l'analyse de logs vous est étrangère, commencez par la Learning Page Linux : le SOC lit des journaux toute la journée.",
      },
    ],
  },
  {
    id: "outillage",
    title: "L'outillage de l'analyste",
    level: 2,
    intro:
      "Ce qu'il faut sous la main avant la première alerte : lecture de logs et requêtes.",
    blocks: [
      {
        kind: "command",
        label: "Suivre les logs d'authentification en temps réel",
        command: "sudo tail -f /var/log/auth.log | grep -E \"Failed|failure|invalid\"",
        why: "Voir les échecs d'authentification arriver en direct : c'est le « radar » le plus simple — des vagues d'échecs sur `root` signalent des robots en force brute.",
      },
      {
        kind: "command",
        label: "Compter les échecs par adresse IP",
        command: "sudo grep \"Failed password\" /var/log/auth.log | grep -oE \"[0-9]+\\.[0-9]+\\.[0-9]+\\.[0-9]+\" | sort | uniq -c | sort -rn | head",
        why: "Agréger les échecs par IP source transforme des lignes en renseignement : une IP avec 500 échecs est un attaquant automatisé, dix IP avec 3 échecs chacune peuvent être une attaque distribuée.",
      },
      {
        kind: "command",
        label: "Lister les connexions réseau actives",
        command: "ss -tunap | head -n 30",
        why: "`ss` montre qui est connecté à quoi, avec quel processus : en cas d'alerte, c'est la première vérification — une connexion sortante inconnue est un signal fort.",
      },
      {
        kind: "fields",
        title: "La trousse minimale",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "`grep`, `jq`, `ss`, `journalctl` : 90 % du triage se fait avec ces quatre outils. Les maîtriser avant d'acheter un SIEM.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Vouloir un SIEM avant de savoir lire un log : l'outil n'apprend pas à qualifier — l'analyste, si.",
          },
        ],
      },
    ],
  },
  {
    id: "anatomie-alerte",
    title: "Anatomie d'une alerte",
    level: 2,
    intro:
      "Lire une alerte comme un analyste : ce qu'elle dit, ce qu'elle ne dit pas.",
    blocks: [
      {
        kind: "fields",
        title: "Les champs d'une alerte",
        fields: [
          {
            label: "Quoi",
            value:
              "La règle déclenchée (« 50 échecs SSH en 5 min ») : elle décrit un COMPORTEMENT, pas une certitude d'attaque.",
          },
          {
            label: "Où et qui",
            value:
              "Machine, utilisateur, IP source/destination : le contexte qui permet de juger (serveur exposé ? poste interne ?).",
          },
          {
            label: "Quand",
            value:
              "Horodatage précis : 3h du matin un dimanche n'a pas le même sens qu'un mardi à 10h.",
          },
          {
            label: "Sévérité",
            value:
              "Le niveau attribué par la règle : indicatif, jamais définitif — c'est l'analyste qui qualifie.",
          },
          {
            label: "Preuves",
            value:
              "Les événements bruts associés : sans eux, l'alerte est une affirmation invérifiable.",
          },
        ],
      },
      {
        kind: "text",
        text: "En une phrase : une alerte est une hypothèse à vérifier, pas un verdict — le triage consiste à la confirmer ou l'infirmer avec des faits. Erreur fréquente : traiter chaque alerte comme un incident (épuisement) ou ignorer les « basses » (c'est souvent là que se cachent les attaques discrètes).",
      },
    ],
  },
  {
    id: "triage",
    title: "Le triage : qualifier une alerte en 10 minutes",
    level: 2,
    intro:
      "La discipline reine : vite, avec méthode, sans rater le grave.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Lire l'alerte entière",
            detail:
              "Règle, machine, utilisateur, horaire, preuves jointes : 60 secondes pour comprendre ce qu'on vous demande de juger.",
          },
          {
            title: "Vérifier l'actif",
            detail:
              "Quelle machine ? Quel rôle (serveur critique ? poste de test ?) ? Un même comportement n'a pas la même gravité partout.",
          },
          {
            title: "Corroborer",
            detail:
              "Chercher d'autres signaux : mêmes IP/utilisateurs dans d'autres logs, alertes voisines, historique de la machine. Un fait isolé reste une hypothèse.",
          },
          {
            title: "Qualifier",
            detail:
              "Vrai positif bénin (activité légitime inhabituelle), vrai positif malveillant (incident), faux positif (règle à ajuster) : trancher et noter pourquoi.",
          },
          {
            title: "Décider",
            detail:
              "Faux positif → ajuster la règle et clore. Bénin → clore avec note. Malveillant → appliquer le playbook (isoler, escalader).",
          },
          {
            title: "Documenter",
            detail:
              "Chaque décision est notée (qui, quand, pourquoi) : le triage non documenté est un triage perdu pour l'équipe suivante.",
          },
        ],
      },
    ],
  },
  {
    id: "mitre-attack",
    title: "MITRE ATT&CK : le langage commun",
    level: 2,
    intro:
      "Nommer ce qu'on voit : la matrice des tactiques et techniques.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : MITRE ATT&CK est une base de connaissances publique qui décrit les tactiques (POURQUOI : accès initial, persistance, exfiltration…) et techniques (COMMENT : phishing, injection de processus…) réellement observées chez les attaquants. Pourquoi : elle donne un vocabulaire partagé (« on a détecté du T1059 ») et une grille pour vérifier sa couverture de détection — « détectons-nous chaque tactique ? ».",
      },
      {
        kind: "table",
        headers: ["Tactique", "Idée", "Exemple de détection"],
        rows: [
          ["Accès initial", "Comment l'attaquant entre", "Pièce jointe malveillante, identifiants volés"],
          ["Exécution", "Comment il lance du code", "Processus fils suspect d'une application bureautique"],
          ["Persistance", "Comment il reste", "Clé de registre Run, tâche planifiée inconnue"],
          ["Élévation de privilèges", "Comment il devient admin", "Exploitation locale, vol d'identifiants"],
          ["Exfiltration", "Comment il sort les données", "Volumes sortants anormaux, DNS tunneling"],
          ["Impact", "Ce qu'il casse", "Chiffrement massif (rançongiciel)"],
        ],
      },
      {
        kind: "text",
        text: "Référence officielle : attack.mitre.org — gratuite, c'est le socle du métier. Le niveau 3 montre comment cartographier ses détections dessus.",
      },
    ],
  },
  {
    id: "sources-logs",
    title: "Les sources de logs : quoi collecter",
    level: 2,
    intro:
      "On ne détecte que ce qu'on collecte : les sources indispensables.",
    blocks: [
      {
        kind: "table",
        headers: ["Source", "Ce qu'elle révèle", "Priorité"],
        rows: [
          ["Authentification (auth.log, AD)", "Qui se connecte, échecs, escalades", "Critique — la première source à centraliser"],
          ["Pare-feu / proxy", "Flux autorisés et bloqués", "Haute — la carte des communications"],
          ["Antivirus / EDR", "Fichiers et comportements suspects sur les postes", "Haute — l'œil sur les endpoints"],
          ["Serveurs web/applicatifs", "Requêtes, erreurs, accès anormaux", "Haute pour les services exposés"],
          ["DNS", "Résolutions de noms", "Moyenne-haute — révèle les infrastructures malveillantes"],
          ["Cloud (CloudTrail…)", "Appels d'API, changements IAM", "Critique si cloud utilisé"],
        ],
      },
      {
        kind: "text",
        text: "En une phrase : commencez par l'authentification et le réseau — 80 % des détections utiles en viennent — puis étendez selon les risques. Erreur fréquente : collecter « tout » sans savoir quoi en faire — chaque source doit alimenter au moins un cas de détection.",
      },
    ],
  },
  {
    id: "premier-use-case",
    title: "Premier cas de détection : la force brute SSH",
    level: 2,
    intro:
      "De l'idée à la règle : construire une détection de bout en bout.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définir le comportement",
            detail:
              "« Plus de N échecs d'authentification SSH depuis une même IP en M minutes » : précis, mesurable, lié à une tactique (accès initial / force brute).",
          },
          {
            title: "Choisir les seuils",
            detail:
              "N=10, M=5 min : assez bas pour détecter, assez haut pour ne pas alerter sur les fautes de frappe. Les seuils s'ajustent avec l'expérience.",
          },
          {
            title: "Écrire la règle",
            detail:
              "Dans le SIEM ou en script : compter les `Failed password` par IP et fenêtre de temps. Version artisanale avec les commandes de la section outillage.",
          },
          {
            title: "Tester",
            detail:
              "Simuler contre son propre serveur de test (tentatives volontaires) : l'alerte se déclenche-t-elle ? Les preuves sont-elles exploitables ?",
          },
          {
            title: "Qualifier en conditions réelles",
            detail:
              "Première semaine : trier chaque alerte, noter les faux positifs (IP légitimes ?), ajuster seuils et exclusions.",
          },
          {
            title: "Documenter",
            detail:
              "Fiche du cas : objectif, logique, seuils, procédure de triage, historique des ajustements. C'est un actif d'équipe.",
          },
        ],
      },
    ],
  },
  {
    id: "playbook-bases",
    title: "Playbooks : la réponse écrite à froid",
    level: 2,
    intro:
      "Ne pas improviser sous pression : le plan d'action par scénario.",
    blocks: [
      {
        kind: "fields",
        title: "Un playbook contient",
        fields: [
          {
            label: "Déclencheur",
            value:
              "Quelle alerte / quel constat lance le playbook : précis, pas « quand ça va mal ».",
          },
          {
            label: "Qualification",
            value:
              "Les 3-5 vérifications qui confirment ou infirment : commandes, logs à consulter, seuils.",
          },
          {
            label: "Confinement",
            value:
              "Isoler SANS détruire les preuves : débrancher du réseau, désactiver le compte, snapshot avant toute action.",
          },
          {
            label: "Escalade",
            value:
              "Qui prévenir, quand, avec quelles informations : seuils d'escalade écrits (ex. « propagation suspectée → cellule de crise »).",
          },
          {
            label: "Clôture",
            value:
              "Retour d'expérience : qu'a-t-on appris, que change-t-on (règle, contrôle, formation).",
          },
        ],
      },
      {
        kind: "text",
        text: "En une phrase : le playbook transforme la panique en procédure — écrit à froid, testé à blanc, suivi à chaud. Erreur fréquente : un playbook de 40 pages que personne n'ouvre. Bonne pratique : une page par scénario, avec les commandes prêtes à copier.",
      },
    ],
  },
  {
    id: "flux-professionnel",
    title: "Le flux professionnel : la vie d'analyste",
    level: 2,
    intro:
      "Une journée au SOC : rythme, priorités, hygiène.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Prise de poste",
            detail:
              "Relève : que s'est-il passé pendant mon absence ? Alertes en cours, incidents ouverts, notes de l'équipe précédente.",
          },
          {
            title: "Triage",
            detail:
              "La file d'alertes par priorité : les critiques d'abord, qualifier vite, escalader sans attendre quand c'est grave.",
          },
          {
            title: "Investigation",
            detail:
              "Les cas non tranchés : creuser (logs, corrélation, threat intel), avec une limite de temps — sinon on s'enlise.",
          },
          {
            title: "Amélioration",
            detail:
              "Chaque faux positif récurrent = une règle à ajuster ; chaque angle mort = un cas de détection à écrire.",
          },
          {
            title: "Passation",
            detail:
              "Notes claires pour l'équipe suivante : en-cours, décisions, points de vigilance. Le SOC ne dort jamais, les analystes si.",
          },
        ],
      },
      {
        kind: "text",
        text: "En une phrase : le SOC est un travail d'équipe en continu — la qualité de la passation et de la documentation vaut autant que la rapidité du triage.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 2,
    intro:
      "Les fautes qui font rater des incidents ou épuisent les équipes.",
    blocks: [
      {
        kind: "fields",
        title: "Les classiques",
        fields: [
          {
            label: "L'alerte sans triage",
            value:
              "Problème : des milliers d'alertes non qualifiées. Pourquoi : trop de règles, pas de priorisation. Mieux : moins de règles, mieux réglées, triées à 100 %.",
          },
          {
            label: "Le faux positif ignoré",
            value:
              "Problème : la même fausse alerte revient chaque jour. Pourquoi : « on sait que c'est faux ». Mieux : chaque faux positif récurrent = ajustement de règle immédiat.",
          },
          {
            label: "L'escalade tardive",
            value:
              "Problème : « je voulais être sûr avant de déranger ». Pourquoi : peur du faux positif. Mieux : des seuils d'escalade écrits — le doute grave escalade toujours.",
          },
          {
            label: "L'investigation sans notes",
            value:
              "Problème : conclusions non reproductibles, équipe suivante perdue. Pourquoi : urgence. Mieux : documenter pendant, pas après.",
          },
          {
            label: "Le confinement destructeur",
            value:
              "Problème : éteindre la machine « pour stopper l'attaque » — et détruire la mémoire et les preuves. Pourquoi : réflexe. Mieux : isoler du réseau, préserver, puis analyser (cf. Forensique).",
          },
        ],
      },
    ],
  },
  {
    id: "mini-projet",
    title: "Mini-projet : mini-SOC sur son labo",
    level: 2,
    intro:
      "Surveiller son propre serveur pendant une semaine : le cycle complet.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Instrumenter",
            detail:
              "Sur votre VM/serveur de test : activez la journalisation (auth, web si présent), notez l'état « normal » de référence.",
          },
          {
            title: "Définir 3 cas de détection",
            detail:
              "Force brute SSH, connexions à horaires inhabituels, nouveau port en écoute : seuils écrits, logique documentée.",
          },
          {
            title: "Simuler",
            detail:
              "Provoquez chaque cas vous-même (tentatives SSH volontaires, connexion nocturne, service lancé) : vérifiez la détection.",
          },
          {
            title: "Trier pendant une semaine",
            detail:
              "Consultez quotidiennement, qualifiez chaque alerte (vrai/faux positif), ajustez les seuils.",
          },
          {
            title: "Restituer",
            detail:
              "Bilan d'une page : détections, faux positifs, ajustements, angles morts identifiés. C'est un vrai rapport d'activité SOC.",
          },
        ],
      },
      {
        kind: "text",
        text: "Concepts liés : le niveau 3 ajoute les règles Sigma, la corrélation, le threat hunting et les métriques.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "siem-architecture",
    title: "SIEM : architecture et choix",
    level: 3,
    intro:
      "Comprendre ce que fait un SIEM avant d'en choisir un.",
    blocks: [
      {
        kind: "diagram",
        title: "Le pipeline d'un SIEM",
        lines: [
          "SOURCES ──► COLLECTE ──► NORMALISATION ──► STOCKAGE ──► DÉTECTION ──► ALERTES",
          " (logs)     (agents,      (format commun,    (indexé,      (règles,        (file de",
          "            syslog)       horodatage UTC)     rétention)    corrélation)    triage)",
          "                                                              │",
          "                                    TABLEAUX DE BORD ◄────────┘",
          "                                    INVESTIGATION (recherche)",
          "",
          "Chaque étape peut échouer : agent arrêté, horloge désynchronisée,",
          "rétention trop courte, règle mal écrite. Le SIEM se supervise.",
        ],
      },
      {
        kind: "fields",
        title: "Choisir et dimensionner",
        fields: [
          {
            label: "Volume",
            value:
              "Le coût d'un SIEM suit le volume ingéré (Go/jour) : mesurer avant de signer, filtrer le bruit à la source.",
          },
          {
            label: "Rétention",
            value:
              "90 jours en ligne est un standard pour investiguer ; au-delà, archivage froid. Une rétention trop courte rend l'enquête impossible.",
          },
          {
            label: "Open source vs commercial",
            value:
              "ELK/Wazuh/Security Onion (open source, coût d'exploitation) vs Splunk/Microsoft Sentinel (licence, intégration) : le choix dépend des compétences internes, pas du marketing.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Acheter un SIEM sans équipe pour le régler : un SIEM non tuné est une usine à bruit qui épuise les analystes.",
          },
        ],
      },
    ],
  },
  {
    id: "sigma",
    title: "Sigma : écrire des détections portables",
    level: 3,
    intro:
      "Le format universel des règles de détection : écrire une fois, déployer partout.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : Sigma est un format ouvert de description de règles de détection, convertible vers les langages des SIEM (Splunk, Elastic, Sentinel) : on écrit la logique une fois, on la déploie partout. Pourquoi : cela mutualise les détections (règles communautaires SigmaHQ) et évite l'enfermement dans un SIEM.",
      },
      {
        kind: "code",
        language: "yaml",
        title: "Règle Sigma : multiples échecs SSH (exemple)",
        code: "title: Échecs d'authentification SSH répétés\nstatus: test\nlogsource:\n  product: linux\n  service: sshd\ndetection:\n  selection:\n    EventType: 'Failed password'\n  timeframe: 5m\n  condition: selection | count() by src_ip > 10\nfields:\n  - src_ip\n  - user\nfalsepositives:\n  - Scans de sécurité autorisés\n  - Utilisateurs légitimes avec mot de passe expiré\nlevel: medium\n",
      },
      {
        kind: "fields",
        title: "Écrire une bonne règle",
        fields: [
          {
            label: "Précision",
            value:
              "Cibler le comportement malveillant, pas le bruit ambiant : chaque condition doit éliminer des faux positifs.",
          },
          {
            label: "Faux positifs documentés",
            value:
              "Lister les cas légitimes connus : le triage va dix fois plus vite quand on sait à quoi s'attendre.",
          },
          {
            label: "Test",
            value:
              "Rejouer sur des logs historiques : la règle aurait-elle alerté ? à quel volume ? On ne déploie pas à l'aveugle.",
          },
        ],
      },
    ],
  },
  {
    id: "correlation",
    title: "Corrélation : relier les signaux faibles",
    level: 3,
    intro:
      "Une alerte ne prouve rien ; trois alertes liées racontent une attaque.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : la corrélation relie des événements individuellement bénins en scénarios — échec de login SUIVI d'une connexion réussie SUIVIE d'un transfert inhabituel = compromission probable. Pourquoi : les attaquants prudents restent sous les seuils de chaque règle ; seule la séquence les trahit.",
      },
      {
        kind: "fields",
        title: "Techniques de corrélation",
        fields: [
          {
            label: "Séquentielle",
            value:
              "A puis B puis C dans un délai : le scénario d'attaque modélisé (cf. MITRE ATT&CK) devient une règle.",
          },
          {
            label: "Par entité",
            value:
              "Tout ce qui concerne un utilisateur/une machine/une IP sur une période : la « fiche » de l'entité révèle les anomalies.",
          },
          {
            label: "Statistique",
            value:
              "Écart à la normale (volumes, horaires) : puissant mais bruyant — à réserver aux actifs critiques avec baseline solide.",
          },
        ],
      },
      {
        kind: "text",
        text: "Erreur fréquente : corréler sans baseline — « anormal » suppose un « normal » mesuré. Bonne pratique : 2-4 semaines d'observation avant de fixer les seuils statistiques.",
      },
    ],
  },
  {
    id: "detection-endpoint",
    title: "Détection sur les postes (endpoint)",
    level: 3,
    intro:
      "Voir ce qui s'exécute : télémétrie des postes de travail.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : la détection endpoint collecte ce qui se passe SUR les machines — processus lancés, lignes de commande, connexions, modifications — car c'est là que l'attaquant agit concrètement. Pourquoi : les logs réseau voient les flux, pas les actes ; un ransomware se détecte à son comportement (chiffrement massif) avant de se voir sur le réseau.",
      },
      {
        kind: "fields",
        title: "Signaux endpoint classiques",
        fields: [
          {
            label: "Lignée de processus",
            value:
              "`winword.exe → powershell.exe` : une application bureautique qui lance un interpréteur de commandes est le signal n°1 des attaques par document.",
          },
          {
            label: "Lignes de commande",
            value:
              "Arguments suspects (encodage base64, téléchargement + exécution) : la télémétrie Sysmon (Windows) les capture — à activer et centraliser.",
          },
          {
            label: "Persistance",
            value:
              "Nouvelles tâches planifiées, clés Run, services inconnus : ce qui survit au redémarrage mérite vérification.",
          },
        ],
      },
      {
        kind: "text",
        text: "Cadre : la télémétrie endpoint se déploie sur les postes de L'ORGANISATION, avec information des utilisateurs et respect du cadre légal — jamais sur des machines personnelles ou tierces.",
      },
    ],
  },
  {
    id: "detection-reseau",
    title: "Détection réseau",
    level: 3,
    intro:
      "Lire les flux : ce que le réseau révèle quand les postes se taisent.",
    blocks: [
      {
        kind: "fields",
        title: "Les signaux réseau",
        fields: [
          {
            label: "DNS",
            value:
              "Domaines à forte entropie, nouvellement enregistrés, requêtes massives : le DNS est le téléphone de l'attaquant — il le consulte avant d'agir.",
          },
          {
            label: "Volumes et horaires",
            value:
              "Transferts sortants inhabituels (exfiltration), activité nocturne sur des postes bureautiques : le comportement trahit.",
          },
          {
            label: "Protocoles inhabituels",
            value:
              "DNS sur des ports non standard, ICMP avec payloads : les canaux détournés se repèrent par leur anomalie.",
          },
          {
            label: "Limites du chiffrement",
            value:
              "Le contenu HTTPS est illisible, mais les métadonnées (destinations, volumes, horaires, certificats) restent analysables — c'est sur elles que porte la détection.",
          },
        ],
      },
      {
        kind: "text",
        text: "En une phrase : la détection réseau ne lit pas le contenu, elle lit les comportements — et les comportements malveillants ont des signatures statistiques. Outils : sondes (Zeek/Suricata) sur les points de passage, journaux de pare-feu et proxy centralisés.",
      },
    ],
  },
  {
    id: "threat-intel",
    title: "Threat intelligence : le renseignement",
    level: 3,
    intro:
      "Savoir qui attaque et comment : enrichir ses détections.",
    blocks: [
      {
        kind: "fields",
        title: "Les niveaux de renseignement",
        fields: [
          {
            label: "Stratégique",
            value:
              "Qui menace notre secteur, avec quels objectifs : pour la direction, oriente les priorités.",
          },
          {
            label: "Opérationnel",
            value:
              "Campagnes en cours, TTP observées (MITRE ATT&CK) : pour les chasseurs, oriente les hypothèses.",
          },
          {
            label: "Tactique",
            value:
              "Indicateurs (IP, domaines, hash) : pour les détections, à consommer avec discernement — un indicateur seul vieillit vite.",
          },
        ],
      },
      {
        kind: "text",
        text: "En une phrase : la threat intel ne sert que si elle est ACTIONNABLE — un flux de 10 000 indicateurs non triés est du bruit ; dix indicateurs liés à votre secteur, intégrés à vos règles, sont de l'or. Sources : flux publics et communautaires d'abord, commerciaux selon les moyens — toujours avec un processus de validation avant intégration.",
      },
    ],
  },
  {
    id: "hunting",
    title: "Threat hunting : chasser au lieu d'attendre",
    level: 3,
    intro:
      "La détection proactive : partir d'une hypothèse, chercher dans les données.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Formuler une hypothèse",
            detail:
              "« Un attaquant utiliserait WMI pour se déplacer latéralement sans laisser de traces réseau évidentes » : précise, testable, liée à une technique ATT&CK.",
          },
          {
            title: "Définir les données",
            detail:
              "Quelles sources ? Quelle période ? Le hunting sans données adaptées est de la divination.",
          },
          {
            title: "Chercher",
            detail:
              "Requêtes dans le SIEM / les logs : baseline d'abord (c'est quoi, le normal ?), puis les écarts.",
          },
          {
            title: "Conclure",
            detail:
              "Trouvé : incident → playbook. Rien trouvé : hypothèse documentée comme testée — ce n'est pas un échec, c'est de la couverture.",
          },
          {
            title: "Industrialiser",
            detail:
              "Une chasse fructueuse devient une règle de détection : le hunting alimente le SOC, il ne le remplace pas.",
          },
        ],
      },
      {
        kind: "text",
        text: "En une phrase : le hunting suppose un SOC mature (bases couvertes) — c'est le niveau 2 de la détection, pas le point de départ. Erreur fréquente : chasser sans hypothèse, en « regardant les logs » : on y trouve du bruit, pas des attaquants.",
      },
    ],
  },
  {
    id: "analyse-phishing",
    title: "Analyser un e-mail suspect",
    level: 3,
    intro:
      "Le vecteur n°1 : démonter un phishing sans cliquer.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Ne pas cliquer, isoler",
            detail:
              "Signaler via le bouton prévu, ne pas transférer en chaîne : l'analyse se fait sur la pièce isolée (en-têtes complets).",
          },
          {
            title: "Lire les en-têtes",
            detail:
              "Expéditeur réel (`From` vs `Reply-To` vs `Return-Path`), serveurs traversés (`Received`), authentification (SPF/DKIM/DMARC) : l'usurpation se voit ici.",
          },
          {
            title: "Examiner sans exécuter",
            detail:
              "URL : domaine réel (pas le texte affiché), pièces jointes : type réel, hash — jamais d'ouverture sur le poste d'analyse.",
          },
          {
            title: "Qualifier",
            detail:
              "Phishing avéré : bloquer l'expéditeur/le domaine, chercher d'autres destinataires dans l'organisation, alerter.",
          },
          {
            title: "Retour d'expérience",
            detail:
              "Thème de la campagne, population ciblée : alimente la sensibilisation et les règles de filtrage.",
          },
        ],
      },
    ],
  },
  {
    id: "analyse-logs-web",
    title: "Analyser les logs d'un serveur web",
    level: 3,
    intro:
      "Lire les accès : sondes, tentatives et comportements suspects.",
    blocks: [
      {
        kind: "command",
        label: "Repérer les sondes automatisées",
        command: "grep -E \"wp-login|phpmyadmin|\\.env|\\.git\" /var/log/nginx/access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head",
        why: "Les robots scannent en permanence les chemins vulnérables connus : ces requêtes sont du bruit de fond normal sur un serveur exposé — mais leur volume et leur origine informent.",
      },
      {
        kind: "command",
        label: "Détecter les erreurs 4xx/5xx anormales",
        command: "awk '{print $9}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head",
        why: "La répartition des codes HTTP révèle l'activité : un pic de 404 = sondage, des 500 = erreurs applicatives (ou tentatives qui font planter).",
      },
      {
        kind: "fields",
        title: "Lecture défensive",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Établir la baseline du trafic normal AVANT de chercher l'anormal : sans référence, tout est suspect et rien ne l'est.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Paniquer devant les scans : ils sont permanents et automatiques — on s'en protège par le durcissement, on ne les « traite » pas un par un.",
          },
        ],
      },
    ],
  },
  {
    id: "metriques",
    title: "Métriques du SOC : MTTD, MTTR et qualité",
    level: 3,
    intro:
      "Piloter : mesurer ce qui compte vraiment.",
    blocks: [
      {
        kind: "table",
        headers: ["Métrique", "Définition", "Lecture"],
        rows: [
          ["MTTD", "Délai moyen entre compromission et détection", "En baisse = détections efficaces. L'objectif ultime du SOC."],
          ["MTTR", "Délai moyen entre détection et résolution", "En baisse = réponse rodée (playbooks, automatisation)."],
          ["Taux de faux positifs", "Alertes infirmées / alertes totales", "En baisse = règles mieux réglées. Cible < 50 % à maturité."],
          ["Couverture ATT&CK", "Tactiques/techniques avec détection", "En hausse = angles morts réduits."],
          ["Alertes non triées > 24h", "File d'attente vieillissante", "Doit tendre vers zéro : une alerte non triée est un risque."],
        ],
      },
      {
        kind: "text",
        text: "En une phrase : on pilote le SOC sur la rapidité (MTTD/MTTR) et la qualité (faux positifs, couverture) — pas sur le nombre d'alertes, qui mesure le bruit, pas la sécurité.",
      },
    ],
  },
  {
    id: "soar",
    title: "Automatisation (SOAR) : quand la machine agit",
    level: 3,
    intro:
      "Automatiser le répétitif, garder l'humain pour le jugement.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : le SOAR (orchestration et automatisation de la réponse) exécute automatiquement les actions répétitives et sûres — enrichir une alerte, isoler une machine sur critère précis, ouvrir un ticket — pour que l'analyste se concentre sur la décision. Pourquoi avec prudence : une automatisation mal calibrée isole des machines légitimes ou, pire, ne réagit pas quand il faut.",
      },
      {
        kind: "fields",
        title: "Automatiser par paliers",
        fields: [
          {
            label: "Niveau 1 — Enrichissement",
            value:
              "Ajouter automatiquement le contexte (réputation IP, historique utilisateur) : sans risque, gain de temps immédiat.",
          },
          {
            label: "Niveau 2 — Actions réversibles",
            value:
              "Isoler une machine, désactiver un compte : avec validation humaine d'abord, puis automatique sur critères stricts.",
          },
          {
            label: "Niveau 3 — Réponse complète",
            value:
              "Uniquement pour des scénarios très bien connus et testés : l'automatisation aveugle est un risque en soi.",
          },
        ],
      },
    ],
  },
  {
    id: "escalade",
    title: "Escalade et gestion d'incident",
    level: 3,
    intro:
      "Quand l'alerte devient incident : passer le relais proprement.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Décider l'escalade",
            detail:
              "Seuils écrits : compromission confirmée, propagation suspectée, actif critique touché — le doute grave escalade toujours.",
          },
          {
            title: "Constituer le dossier",
            detail:
              "Chronologie, preuves, périmètre estimé, actions déjà prises : l'équipe d'incident ne doit pas redécouvrir ce que le SOC sait.",
          },
          {
            title: "Transférer",
            detail:
              "Passation formelle (pas un message laconique) : qui prend quoi, avec quels moyens, quel canal de communication.",
          },
          {
            title: "Accompagner",
            detail:
              "Le SOC reste en surveillance renforcée pendant l'incident : nouvelles alertes liées, périmètre qui s'étend.",
          },
          {
            title: "Clore et apprendre",
            detail:
              "Retour d'expérience conjoint : la détection a-t-elle fonctionné ? Que change-t-on (règles, playbooks, contrôles) ?",
          },
        ],
      },
      {
        kind: "text",
        text: "Articulation : le SOC détecte et qualifie, la forensique établit les faits, la gouvernance décide et communique — l'escalade est le pont entre les trois.",
      },
    ],
  },
  {
    id: "debugging-detections",
    title: "Debugging : quand les détections dysfonctionnent",
    level: 3,
    intro:
      "Règle muette, alerte en boucle, SIEM aveugle : diagnostiquer.",
    blocks: [
      {
        kind: "fields",
        title: "Situations classiques",
        fields: [
          {
            label: "La règle n'alerte jamais",
            value:
              "Vérifier : les logs arrivent-ils (agent, parsing) ? La logique est-elle correcte ? Tester en rejouant des événements connus.",
          },
          {
            label: "La règle alerte en boucle",
            value:
              "Seuil trop bas ou exclusion manquante : analyser les faux positifs, ajuster, documenter le changement.",
          },
          {
            label: "Trou dans les logs",
            value:
              "Agent arrêté, horloge désynchronisée, rétention dépassée : superviser la collecte elle-même — un SIEM aveugle est pire que pas de SIEM.",
          },
          {
            label: "Alerte inqualifiable",
            value:
              "Preuves insuffisantes : enrichir la règle (plus de champs, plus de contexte) plutôt que de trier à l'aveugle.",
          },
        ],
      },
    ],
  },
  {
    id: "testing-detections",
    title: "Tester ses détections",
    level: 3,
    intro:
      "Prouver que ça détecte : simulation et validation.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : une détection non testée est une hypothèse — on la valide en simulant le comportement sur ses propres systèmes de test et en vérifiant l'alerte. Méthodes : rejouer des logs d'attaque connus, simuler le comportement en labo (dans le cadre légal), exercices « purple team » (attaque simulée + vérification de la détection en direct).",
      },
      {
        kind: "fields",
        title: "Règles du test",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Tester sur l'environnement de test d'abord, documenter le résultat (détecté ? en combien de temps ? avec quelles preuves ?), industrialiser en règle.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Tester en production sans prévenir : une simulation prise pour une vraie attaque déclenche la cellule de crise pour rien.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-avancees",
    title: "Erreurs avancées : les pièges des pratiquants",
    level: 3,
    intro:
      "Quand les bases sont acquises, voici ce qui piège encore.",
    blocks: [
      {
        kind: "fields",
        title: "Pièges de niveau avancé",
        fields: [
          {
            label: "Optimiser le volume, pas la qualité",
            value:
              "Problème : se vanter de « 10 000 alertes traitées ». Pourquoi : métrique facile. Mieux : MTTD, taux de faux positifs, couverture — la qualité, pas le volume.",
          },
          {
            label: "Négliger la baseline",
            value:
              "Problème : détecter des « anomalies » sans savoir ce qui est normal. Pourquoi : impatience. Mieux : observer 2-4 semaines avant de fixer les seuils.",
          },
          {
            label: "Laisser vieillir les règles",
            value:
              "Problème : des détections écrites pour des menaces de 2022. Pourquoi : « ça tourne ». Mieux : revue périodique du catalogue, mapping ATT&CK à jour.",
          },
          {
            label: "Surveiller sans mandat clair",
            value:
              "Problème : périmètre de surveillance flou, données personnelles exposées. Pourquoi : technique d'abord. Mieux : finalités écrites, information des utilisateurs, minimisation.",
          },
          {
            label: "Confondre outil et équipe",
            value:
              "Problème : croire que le SIEM « détecte tout seul ». Pourquoi : marketing des éditeurs. Mieux : l'outil collecte, l'humain détecte — investir dans les deux.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-siem-lab",
    title: "Projet : SIEM de labo avec attaques simulées",
    level: 3,
    intro:
      "Le projet fil rouge : de la collecte à la détection.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Collecter",
            detail:
              "Centralisez les logs de 2-3 machines de test (syslog vers un point central, horloges synchronisées NTP).",
          },
          {
            title: "Stocker et chercher",
            detail:
              "Même avec des outils simples (fichiers + `jq`/`grep`, ou une stack open source légère) : l'important est de pouvoir CHERCHER dans l'historique.",
          },
          {
            title: "Écrire 5 règles",
            detail:
              "Force brute SSH, connexion nocturne, nouveau service en écoute, pic d'erreurs web, modification sudoers : logique, seuils, faux positifs documentés.",
          },
          {
            title: "Simuler",
            detail:
              "Provoquez chaque cas : les alertes se déclenchent-elles ? Les preuves suffisent-elles au triage ?",
          },
          {
            title: "Trier une semaine",
            detail:
              "Qualifiez tout, ajustez les règles, mesurez : faux positifs, délais. Rédigez le bilan.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-regles-sigma",
    title: "Projet : bibliothèque de règles Sigma",
    level: 3,
    intro:
      "Écrire des détections portables et documentées.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir 5 techniques ATT&CK",
            detail:
              "Parmi les tactiques : accès initial, persistance, exfiltration — une technique par tactique, pertinente pour votre labo.",
          },
          {
            title: "Écrire les règles",
            detail:
              "Format Sigma : titre, logsource, détection, faux positifs documentés, niveau. Précision > couverture.",
          },
          {
            title: "Tester",
            detail:
              "Rejouer sur des logs réels du labo : volume d'alertes ? faux positifs ? Ajuster.",
          },
          {
            title: "Cartographier",
            detail:
              "Matrice : technique → règle → statut (testée, en production) : votre couverture de détection, visible.",
          },
        ],
      },
      {
        kind: "text",
        text: "Concepts liés : ces règles alimentent le playbook de réponse et le dialogue avec la gouvernance (indicateurs, couverture).",
      },
    ],
  },
  {
    id: "projet-playbooks",
    title: "Projet : trois playbooks opérationnels",
    level: 3,
    intro:
      "Écrire la réponse à froid : le livrable qui sert le jour J.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir les scénarios",
            detail:
              "Compte compromis, rançongiciel suspecté sur un poste, exfiltration de données : trois cas, trois playbooks d'une page.",
          },
          {
            title: "Rédiger",
            detail:
              "Par playbook : déclencheur, qualification (commandes), confinement (sans détruire les preuves), escalade, clôture.",
          },
          {
            title: "Tester à blanc",
            detail:
              "Exercice sur table : lire le playbook à voix haute face à un scénario simulé — chaque friction = une correction.",
          },
          {
            title: "Versionner",
            detail:
              "Date, version, responsable de la prochaine revue : un playbook non relu meurt en six mois.",
          },
        ],
      },
    ],
  },
  {
    id: "edr-detail",
    title: "EDR : l'antivirus nouvelle génération",
    level: 3,
    intro: "Comportement, télémétrie, réponse : comprendre l'endpoint moderne.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : l'EDR ne se contente pas de signatures — il enregistre le comportement des processus (télémétrie) et permet d'isoler une machine à distance. Pourquoi : le malware inconnu passe les signatures ; il ne passe pas l'analyse comportementale ni la timeline d'exécution.",
      },
      {
        kind: "fields",
        title: "Ce que l'EDR apporte au SOC",
        fields: [
          {
            label: "Télémétrie",
            value: "Processus créés, connexions, fichiers touchés : la matière première du triage et du hunting.",
          },
          {
            label: "Détection comportementale",
            value: "Word qui lance PowerShell chiffré = suspect même sans signature connue : le comportement trahit.",
          },
          {
            label: "Réponse à distance",
            value: "Isoler la machine du réseau, tuer le processus, collecter un dump : sans se déplacer.",
          },
        ],
      },
      {
        kind: "text",
        text: "Point de vigilance : un EDR mal réglé noie le SOC sous les faux positifs — le tuning (exclusions légitimes, seuils) fait partie du métier.",
      },
    ],
  },
  {
    id: "dns-detection",
    title: "Détection via le DNS",
    level: 3,
    intro: "Le DNS voit tout : en faire un capteur de détection.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : presque tout malware contacte son infrastructure via DNS — surveiller les requêtes révèle les C2, les DGA et l'exfiltration. Pourquoi : le DNS est rarement chiffré en interne et traverse tous les périmètres ; c'est le journal le plus honnête du réseau.",
      },
      {
        kind: "table",
        headers: ["Signal", "Ce qu'il indique", "Action"],
        rows: [
          ["Domaine jeune (< 30 jours)", "Infrastructure fraîche d'attaquant", "Bloquer + investiguer le poste"],
          ["Requêtes DGA (noms aléatoires)", "Malware qui génère ses C2", "Isoler, chercher le binaire"],
          ["Volume TXT anormal", "Exfiltration via DNS tunneling", "Bloquer le domaine, quantifier"],
          ["Domaine sans historique entreprise", "Premier contact suspect", "Enrichir (threat intel) puis décider"],
        ],
      },
      {
        kind: "text",
        text: "En pratique : centraliser les logs DNS au SIEM avec un délai de rétention long — l'enquête remonte souvent des semaines en arrière.",
      },
    ],
  },
  {
    id: "lateral-movement",
    title: "Mouvements latéraux : les repérer",
    level: 3,
    intro: "L'attaquant ne reste pas sur sa première victime : suivre sa progression.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : après la compromission initiale, l'attaquant rebondit de machine en machine (RDP, SMB, WinRM) vers ses cibles — ces déplacements laissent des traces d'authentification caractéristiques. Pourquoi : détecter le mouvement latéral, c'est attraper l'attaque avant l'objectif final (exfiltration, ransomware).",
      },
      {
        kind: "fields",
        title: "Les signaux",
        fields: [
          {
            label: "Connexions atypiques",
            value: "Un poste qui se connecte en RDP à 20 serveurs la nuit : le graphe des connexions révèle l'anormal.",
          },
          {
            label: "Comptes sensibles",
            value: "Usage de comptes admin ou de service depuis des postes utilisateurs : jamais légitime.",
          },
          {
            label: "Pass-the-hash",
            value: "Authentifications NTLM sans mot de passe saisi (EventID 4624 type 3) : la technique classique à chasser.",
          },
        ],
      },
    ],
  },
  {
    id: "ransomware-signaux",
    title: "Ransomware : les signaux précoces",
    level: 3,
    intro: "Détecter avant le chiffrement : les minutes qui comptent.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : un ransomware chiffre en dernier — avant, il supprime les sauvegardes, désactive les protections et se propage : chaque étape est détectable. Pourquoi : entre le premier signal et le chiffrement, il y a une fenêtre de réaction qui se mesure en minutes.",
      },
      {
        kind: "table",
        headers: ["Signal", "Étape", "Réaction"],
        rows: [
          ["Suppression des clichés (vssadmin)", "Préparation", "Alerte critique immédiate"],
          ["Désactivation EDR/antivirus", "Préparation", "Isoler le poste"],
          ["Chiffrement massif soudain", "Impact", "Isoler + couper les partages réseau"],
          ["Note de rançon déposée", "Impact", "Incident majeur : cellule de crise"],
        ],
      },
      {
        kind: "text",
        text: "Règle d'or : ces détections déclenchent l'isolement AUTOMATIQUE via SOAR — attendre un humain, c'est laisser le chiffrement se propager.",
      },
    ],
  },
  {
    id: "ueba",
    title: "UEBA : la baseline comportementale",
    level: 3,
    intro: "Détecter l'anormal sans signature : le comportement comme référence.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : l'UEBA apprend le comportement normal de chaque utilisateur et entité (heures, volumes, ressources) et alerte sur les écarts — sans règle écrite à l'avance. Pourquoi : l'insider ou le compte compromis n'utilise pas de malware ; seule la déviance comportementale le trahit.",
      },
      {
        kind: "fields",
        title: "Bien l'utiliser",
        fields: [
          {
            label: "Complément, pas remplacement",
            value: "L'UEBA ne remplace pas les règles : il couvre l'inconnu pendant que les règles couvrent le connu.",
          },
          {
            label: "Période d'apprentissage",
            value: "La baseline se construit sur des semaines : les alertes des débuts sont bruyantes, c'est normal.",
          },
          {
            label: "Contexte humain",
            value: "Un écart s'explique souvent (déplacement, nouveau projet) : l'analyste valide, le système apprend.",
          },
        ],
      },
    ],
  },
  {
    id: "detection-cloud",
    title: "Détection cloud au SOC",
    level: 3,
    intro: "Surveiller le cloud comme l'on-premise : les logs qui comptent.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : le SOC moderne ingère les logs cloud (CloudTrail, logs d'audit GCP/Azure) pour détecter les compromissions de comptes et les mauvaises configurations exploitées. Pourquoi : l'attaque ne passe plus par le VPN — elle passe par une clé AWS volée utilisée depuis un navigateur.",
      },
      {
        kind: "command",
        label: "Lister les connexions console",
        command: "aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=ConsoleLogin --max-results 20",
        why: "Liste les 20 dernières connexions console : repère les logins depuis des pays inhabituels ou sans MFA.",
        verify: "Filtrer sur les échecs et recouper avec les utilisateurs : une vague d'échecs suivie d'un succès = compromission probable.",
      },
      {
        kind: "fields",
        title: "Les cas d'usage prioritaires",
        fields: [
          {
            label: "Console sans MFA",
            value: "Connexion réussie sans second facteur : alerte immédiate, le compte est peut-être compromis.",
          },
          {
            label: "Création de ressources",
            value: "Nouvel utilisateur IAM, nouvelle clé, bucket rendu public : tout changement de contrôle se surveille.",
          },
          {
            label: "Géographie impossible",
            value: "Deux connexions à 10 000 km en 10 minutes : le voyage impossible, classique toutes plateformes.",
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
          "Trier à 100 % : aucune alerte ne reste non qualifiée — une alerte ignorée est un risque accepté aveuglément.",
          "Corroborer toujours : une alerte seule est une hypothèse, deux sources indépendantes font un fait.",
          "Documenter pendant : chaque décision de triage est notée (qui, quand, pourquoi).",
          "Ajuster en continu : chaque faux positif récurrent améliore une règle ; chaque angle mort crée un cas de détection.",
          "Escalader sans hésiter : le doute grave monte toujours — les seuils sont écrits pour ça.",
          "Préserver les preuves : isoler sans éteindre, snapshot avant d'agir, chaîne de custody.",
          "Tester les détections : une règle non testée est une hypothèse, pas une protection.",
          "Mesurer la qualité : MTTD, MTTR, faux positifs, couverture ATT&CK — pas le volume d'alertes.",
          "Passer le relais proprement : la passation écrite fait la continuité du SOC.",
          "Rester dans le mandat : surveiller ses systèmes, finalités explicites, respect de la vie privée.",
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
        title: "Sources officielles (à privilégier)",
        fields: [
          {
            label: "MITRE ATT&CK",
            value: "attack.mitre.org : la base de connaissances des tactiques et techniques — gratuite, incontournable.",
          },
          {
            label: "Sigma",
            value: "github.com/SigmaHQ/sigma : le format de règles et la bibliothèque communautaire.",
          },
          {
            label: "NIST SP 800-61",
            value: "Le guide du NIST pour la gestion des incidents : la référence du processus de réponse.",
          },
          {
            label: "ANSSI",
            value: "ssi.gouv.fr : guides de réponse aux incidents et recommandations — publics et gratuits.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : BlueTeamLabs Online (blueteamlabs.online) pour les exercices d'investigation encadrés.",
          "Outils : Wazuh, Security Onion, ELK (open source) pour le labo ; `jq`, `grep`, `ss` pour le quotidien.",
          "Communauté : les rapports publics d'incidents (désanonymisés) pour le vocabulaire des analyses bien menées.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Le SOC maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir la preuve : Forensique — quand l'alerte devient investigation, la rigueur de la preuve prend le relais.",
          "Comprendre l'attaquant (en méthode) : Pentest — savoir ce que simule une évaluation cadrée éclaire vos détections.",
          "Sécuriser le terrain : Cloud Security — les journaux CloudTrail et la détection des anomalies IAM.",
          "Prévenir à la source : Secure Coding — moins de failles applicatives, moins d'alertes.",
          "Structurer : Gouvernance & Conformité — indicateurs, gestion des incidents, obligations de notification.",
          "Revenir à la roadmap : valider SOC & Détection et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

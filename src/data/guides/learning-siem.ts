import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du SIEM : de la collecte de logs au triage d'alertes.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_SIEM: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est un SIEM et pourquoi c'est le cœur de la détection d'intrusions.",
    blocks: [
      {
        kind: "text",
        text: "Un SIEM (Security Information and Event Management) centralise les logs de toute l'infrastructure, corrèle les événements et détecte les attaques en temps réel : les yeux du SOC (Security Operations Center). Serveurs, pare-feu, applications : tout ce qui produit des logs y converge.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est indispensable : sans centralisation, une attaque passe inaperçue pendant des mois — chaque équipement voit un fragment, personne ne voit l'image. Le SIEM relie les fragments : une connexion inhabituelle suivie d'un transfert de données massif, vus par deux systèmes différents, devient une alerte unique et actionnable.",
      },
      {
        kind: "text",
        text: "Sans centralisation des logs, une attaque passe inaperçue pendant des mois. Le SIEM est le cœur de la détection : savoir écrire des règles de détection pertinentes est une compétence clé des analystes SOC.",
      },
    ],
  },
  {
    id: "pipeline-siem",
    title: "Le pipeline : du log brut à l'alerte",
    level: 1,
    intro:
      "Les six étapes que traverse chaque événement, dans l'ordre.",
    blocks: [
      {
        kind: "diagram",
        title: "Du log brut à l'alerte qualifiée",
        lines: [
          "SOURCES (serveurs, firewall, apps, cloud)",
          "     │",
          "     ▼",
          "COLLECTE (agents, syslog : rapatrier les logs)",
          "     │",
          "     ▼",
          "NORMALISATION (parser : extraire user, ip, action…)",
          "     │",
          "     ▼",
          "CORRÉLATION (relier les événements entre eux)",
          "     │",
          "     ▼",
          "RÈGLES (déclencher des alertes sur des motifs)",
          "     │",
          "     ▼",
          "TRIAGE (l'analyste qualifie : vrai/faux positif)",
        ],
      },
      {
        kind: "text",
        text: "L'idée centrale : un log isolé ne veut rien dire — c'est la mise en relation qui crée l'information. Le SIEM transforme des millions d'événements bruts en une poignée d'alertes qu'un humain peut traiter. Chaque étape peut faillir : sans collecte, pas de données ; sans normalisation, pas de corrélation ; sans triage, des alertes que personne ne lit.",
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
      "Le SIEM suppose des bases système et réseau : on ne détecte bien que ce qu'on comprend.",
    blocks: [
      {
        kind: "fields",
        title: "Bases requises",
        fields: [
          {
            label: "Linux (`linux`)",
            value:
              "Lire des logs système, gérer des services, comprendre les permissions : la majorité des sources sont des machines Linux.",
          },
          {
            label: "Réseaux (`networking`)",
            value:
              "Adresses IP, ports, TCP/UDP, DNS : pour comprendre ce que racontent les logs réseau et firewall.",
          },
          {
            label: "Logs",
            value:
              "Savoir lire un log brut (syslog, auth.log) : le SIEM ne fait que structurer ce que vous savez déjà lire.",
          },
          {
            label: "Bases de la sécurité",
            value:
              "Authentification, mots de passe, phishing : pour distinguer un comportement normal d'un comportement suspect.",
          },
        ],
      },
    ],
  },
  {
    id: "panorama-siem",
    title: "Panorama des SIEM",
    level: 2,
    intro:
      "Les plateformes de référence, comparées factuellement.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Wazuh", "Splunk", "Elastic (ELK)"],
        rows: [
          ["Modèle", "Open source, auto-hébergé", "Commercial (essai gratuit)", "Open source (base), offres commerciales"],
          ["Forces", "Gratuit, agents intégrés, conformité", "Puissance de recherche (SPL), écosystème", "Flexibilité, visualisation (Kibana)"],
          ["Courbe d'apprentissage", "Modérée", "Modérée (SPL à apprendre)", "Plus technique (à assembler)"],
          ["Pour commencer", "Le choix naturel pour apprendre sans budget", "L'essai gratuit pour découvrir le standard entreprise", "Pour construire une stack sur mesure"],
        ],
      },
      {
        kind: "text",
        text: "Pour apprendre, Wazuh est le choix pragmatique : complet, gratuit, avec des agents et des règles prêtes à l'emploi. Les concepts (collecte, corrélation, triage) sont transférables à toutes les plateformes — c'est eux qu'il faut maîtriser, pas les clics d'une interface.",
      },
    ],
  },
  {
    id: "deploiement-wazuh",
    title: "Déployer Wazuh",
    level: 2,
    intro:
      "Un SIEM fonctionnel sur une machine de test, étape par étape.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Préparer la machine",
            detail: "Une VM Ubuntu avec au moins 4 Go de RAM et 50 Go de disque : le SIEM indexe beaucoup de données. Suivez le script d'installation officiel (voir documentation wazuh.com) — ne bricolez pas l'installation manuelle au début.",
          },
          {
            title: "Installer le manager",
            detail: "Le script officiel déploie le manager, l'indexeur et le dashboard en une fois. Notez les mots de passe générés.",
          },
          {
            title: "Ouvrir le dashboard",
            detail: "Accédez à `https://<serveur>:443` : l'onglet « Discover » permet de chercher dans les logs dès que des données arrivent.",
          },
          {
            title: "Vérifier l'ingestion",
            detail: "Les logs du manager lui-même doivent apparaître : si le SIEM ne voit pas sa propre machine, la collecte est cassée avant même d'ajouter des agents.",
          },
        ],
      },
    ],
  },
  {
    id: "agents",
    title: "Les agents : surveiller les machines",
    level: 2,
    intro:
      "Déporter la collecte sur chaque machine surveillée.",
    blocks: [
      {
        kind: "text",
        text: "L'agent Wazuh s'installe sur chaque machine à surveiller : il lit les logs locaux, surveille l'intégrité des fichiers et remonte tout au manager. Installation du paquet `wazuh-agent`, puis enregistrement auprès du manager (outil `manage_agents` côté serveur) : l'agent apparaît alors dans le dashboard.",
      },
      {
        kind: "list",
        items: [
          "Commencez par 2-3 machines de test : un SIEM se règle sur du trafic réel, pas dans le vide.",
          "Vérifiez la connectivité agent → manager (port 1514) : un pare-feu local bloque souvent l'enregistrement.",
          "Les agents chiffrent leurs communications : ne contournez jamais ça « pour tester ».",
          "Surveillez la charge des agents : un agent qui scanne l'intégrité toutes les minutes sur un gros disque consomme du CPU.",
        ],
      },
    ],
  },
  {
    id: "premieres-regles",
    title: "Premières règles de détection",
    level: 2,
    intro:
      "Écrire une règle, la déclencher, voir l'alerte : la boucle fondamentale.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer une règle de test",
            detail: "Dans `/var/ossec/etc/rules/local_rules.xml`, ajoutez une règle simple : par exemple, alerter sur 5 échecs SSH en 2 minutes depuis la même IP.",
          },
          {
            title: "Recharger la configuration",
            detail: "Redémarrez le manager pour prendre en compte la règle. Une erreur de syntaxe XML bloque le chargement : validez le fichier avant.",
          },
          {
            title: "Générer l'événement",
            detail: "Provoquez volontairement 5 connexions SSH ratées depuis une machine de test vers une machine surveillée.",
          },
          {
            title: "Vérifier l'alerte",
            detail: "L'alerte doit apparaître dans le dashboard avec le bon niveau. Pas d'alerte = règle mal écrite, événement non collecté, ou seuil non atteint — vérifiez chaque maillon.",
          },
        ],
      },
      {
        kind: "text",
        text: "Cette boucle (écrire → déclencher → vérifier) est la méthode pour toutes les règles : jamais une règle en production sans l'avoir vue se déclencher en test.",
      },
    ],
  },
  {
    id: "tableaux-de-bord",
    title: "Tableaux de bord",
    level: 2,
    intro:
      "Les vues qui résument la posture sécurité au quotidien.",
    blocks: [
      {
        kind: "text",
        text: "Les dashboards agrègent les données en vues pilotables : alertes par niveau de criticité, top des sources bruyantes, évolution temporelle, carte des attaques. Un bon dashboard répond en un coup d'œil à « est-ce que ça va ? » — et permet de creuser en deux clics quand la réponse est non.",
      },
      {
        kind: "list",
        items: [
          "Commencez par les dashboards fournis : ils couvrent 80 % des besoins courants (authentification, conformité, vulnérabilités).",
          "Un dashboard par usage : le SOC opérationnel, la conformité (audit) et le pilotage (direction) ne regardent pas les mêmes indicateurs.",
          "Méfiance des dashboards « verts » : un dashboard qui n'alerte jamais signale souvent une collecte cassée, pas un réseau sain.",
        ],
      },
    ],
  },
  {
    id: "triage-quotidien",
    title: "Le triage quotidien",
    level: 2,
    intro:
      "Le travail réel de l'analyste : qualifier les alertes, une par une.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Trier par criticité",
            detail: "Commencez par les niveaux les plus élevés (7+ sur Wazuh) : ce sont les événements les plus susceptibles d'être des attaques réelles.",
          },
          {
            title: "Contextualiser",
            detail: "Pour chaque alerte : qui (utilisateur, machine), quoi (l'événement), quand, d'où (IP source). Une connexion admin à 3h du matin n'a pas le même sens qu'à 10h.",
          },
          {
            title: "Qualifier",
            detail: "Vrai positif (attaque réelle → escalader), faux positif (bénin → ajuster la règle), ou indéterminé (creuser : logs complémentaires, historique de l'utilisateur).",
          },
          {
            title: "Tracer",
            detail: "Documentez la qualification : une alerte traitée sans trace est une alerte qui reviendra hanter l'équipe dans une semaine.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-analyste",
    title: "Workflow de l'analyste",
    level: 2,
    intro:
      "Organiser sa journée et ses outils pour un triage efficace.",
    blocks: [
      {
        kind: "list",
        items: [
          "Rituel d'ouverture : état des alertes critiques de la nuit, santé de la collecte (tous les agents remontent-ils ?), dashboards de tendances.",
          "Prioriser par criticité puis par fraîcheur : une alerte critique d'il y a 2 heures passe avant un avertissement d'il y a 2 jours.",
          "Timeboxer l'investigation : 15-30 minutes par alerte au premier niveau — au-delà, on escalade avec un dossier, on ne s'enlise pas.",
          "Capitaliser : chaque faux positif récurrent = une règle à ajuster ; chaque vrai positif = un playbook à enrichir.",
          "Passation : le SOC tourne souvent en 24/7 — un journal de bord clair permet à l'équipe suivante de reprendre sans tout relire.",
        ],
      },
    ],
  },
  {
    id: "sources-logs-bases",
    title: "Sources de logs : les bases",
    level: 2,
    intro:
      "D'où viennent les données : les sources à connecter en premier.",
    blocks: [
      {
        kind: "list",
        items: [
          "Authentification : logs SSH (`/var/log/auth.log`), connexions Windows, VPN — qui se connecte, d'où, avec quel résultat.",
          "Pare-feu et réseau : connexions bloquées/autorisées, flux anormaux — le périmètre parle en premier.",
          "Système : démarrage de services, installations, modifications de fichiers critiques — la vie de la machine.",
          "Applications : logs web (accès, erreurs), bases de données — là où les utilisateurs (et les attaquants) agissent.",
          "Sécurité : antivirus/EDR, IDS — les outils de protection eux-mêmes remontent leurs détections.",
        ],
      },
      {
        kind: "command",
        label: "Lire les logs d'authentification en direct",
        command: "tail -f /var/log/auth.log",
        why: "Affiche les tentatives de connexion SSH en temps réel : c'est la matière première des règles de détection par force brute, et le premier log à savoir lire avant même d'avoir un SIEM.",
      },
    ],
  },
  {
    id: "debugging-bases",
    title: "Debugging : les bases",
    level: 2,
    intro:
      "Quand le SIEM ne voit rien — ou voit trop.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "« Je ne reçois aucun log »",
            detail: "Vérifiez dans l'ordre : l'agent tourne-t-il ? Le réseau agent→manager passe-t-il ? Le manager ingère-t-il (ses propres logs arrivent-ils) ? Les logs source existent-ils vraiment sur la machine ?",
          },
          {
            title: "« Ma règle ne se déclenche pas »",
            detail: "Le log brut arrive-t-il (onglet Discover) ? Le parsing extrait-il les bons champs ? La condition de la règle correspond-elle au log réel (casse, format) ? Le seuil est-il atteignable en test ?",
          },
          {
            title: "« Trop d'alertes »",
            detail: "Comptez par règle : souvent, 2-3 règles bruyantes produisent 90 % du volume. Ajustez les seuils ou excluez les cas bénins connus avant de toucher aux autres.",
          },
          {
            title: "Horloges désynchronisées",
            detail: "Des machines à des heures différentes rendent la corrélation temporelle fausse : NTP partout, toujours.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-classiques-debutant",
    title: "Erreurs classiques du débutant",
    level: 2,
    intro:
      "Les fautes qui font perdre des semaines — et leurs corrections.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Collecter sans normaliser",
            value:
              "Symptôme : des téraoctets de logs inrequêtables. Correction : parser/normaliser dès l'ingestion — un log non structuré est un log mort.",
          },
          {
            label: "Activer toutes les règles par défaut",
            value:
              "Symptôme : des milliers d'alertes par jour, l'équipe ne lit plus rien. Correction : activer progressivement, régler, mesurer le bruit de chaque règle.",
          },
          {
            label: "Ignorer la santé de la collecte",
            value:
              "Symptôme : un agent silencieux depuis un mois = un angle mort. Correction : alerter sur l'absence de logs (un capteur muet est une alerte en soi).",
          },
          {
            label: "Tester les règles en production",
            value:
              "Symptôme : des alertes de test qui affolent l'équipe. Correction : environnement de test, événements générés volontairement.",
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
      "Trois projets pour devenir opérationnel.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "SIEM de labo",
            detail: "Wazuh sur une VM, 2 agents, dashboards : voir ses propres logs centralisés et requêtables.",
          },
          {
            title: "Règle de détection de force brute",
            detail: "Écrire la règle, générer l'attaque (hydra ou tentatives manuelles contre une cible de test), vérifier l'alerte, ajuster le seuil.",
          },
          {
            title: "Scénario d'intrusion complet",
            detail: "Simulez une attaque en plusieurs étapes (scan, force brute, exfiltration simulée) et vérifiez que la corrélation raconte l'histoire complète — du premier scan à l'alerte finale.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "sources-logs-detail",
    title: "Sources de logs en détail",
    level: 3,
    intro:
      "Cartographier l'infrastructure : chaque source couvre un angle mort.",
    blocks: [
      {
        kind: "table",
        headers: ["Source", "Ce qu'elle révèle", "Priorité"],
        rows: [
          ["Authentification (SSH, AD, VPN)", "Qui accède, d'où, quand — les compromissions de comptes", "Critique : à connecter en premier"],
          ["Pare-feu / proxy", "Flux réseau, connexions bloquées, exfiltration", "Critique : le périmètre"],
          ["EDR / antivirus", "Malwares détectés, comportements suspects sur poste", "Haute : les postes sont la porte d'entrée"],
          ["Serveurs web / applicatifs", "Attaques web (injection, scan), erreurs", "Haute : surface exposée"],
          ["DNS", "Résolutions vers des domaines malveillants (C2)", "Haute : les malwares appellent chez eux"],
          ["Cloud (audit trails)", "Actions sur l'infrastructure cloud", "Haute si cloud : le plan de contrôle"],
          ["Bases de données", "Requêtes anormales, accès sensibles", "Moyenne : les données sont la cible"],
          ["Physique / badgeuse", "Présence réelle vs connexion à distance", "Complément : corrélation avancée"],
        ],
      },
    ],
  },
  {
    id: "formats-logs",
    title: "Formats de logs",
    level: 3,
    intro:
      "Les trois formats qu'on rencontre partout, et comment les lire.",
    blocks: [
      {
        kind: "table",
        headers: ["Format", "Exemple", "Note"],
        rows: [
          ["Syslog", "`<134>Jan 1 10:00:00 srv sshd[123]: Failed password`", "Le standard Unix : priorité, timestamp, hôte, processus, message"],
          ["JSON", "`{\"user\":\"a\",\"ip\":\"1.2.3.4\",\"action\":\"login\"}`", "Structuré nativement : le format idéal, de plus en plus courant"],
          ["CEF / LEEF", "`CEF:0|Vendor|Product|…|src=1.2.3.4`", "Formats d'échange des équipements de sécurité — verbeux mais standardisés"],
        ],
      },
      {
        kind: "text",
        text: "Le travail du SIEM commence là : transformer ces formats hétérogènes en événements normalisés (mêmes noms de champs : `user`, `src_ip`, `action`). Sans normalisation, impossible de corréler un log firewall avec un log applicatif.",
      },
    ],
  },
  {
    id: "normalisation-parsing",
    title: "Normalisation et parsing",
    level: 3,
    intro:
      "Extraire du sens des logs bruts : l'étape la plus sous-estimée.",
    blocks: [
      {
        kind: "text",
        text: "Le parsing extrait les champs (utilisateur, IP, action, résultat) via des expressions régulières ou des parseurs dédiés ; la normalisation les renomme selon un schéma commun (ECS — Elastic Common Schema — étant la référence). Un parser mal écrit rate des événements ou extrait des champs faux : pire que pas de parser, car il donne une fausse confiance.",
      },
      {
        kind: "list",
        items: [
          "Testez chaque parser sur des logs réels variés, pas sur un exemple : les formats dérivent (versions, locales).",
          "Horodatez en UTC dès l'ingestion : les fuseaux horaires mélangés rendent les timelines fausses.",
          "Enrichissez : résoudre une IP en géolocalisation/ASN, un hash en réputation — l'enrichissement transforme un log en contexte.",
          "Versionnez les parsers : un changement de format applicatif casse le parsing silencieusement — surveillez les événements non parsés.",
        ],
      },
    ],
  },
  {
    id: "agents-vs-agentless",
    title: "Agents vs agentless",
    level: 3,
    intro:
      "Deux architectures de collecte, deux compromis.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Agents", "Agentless"],
        rows: [
          ["Principe", "Un programme sur chaque machine pousse ses logs", "Le SIEM va chercher (syslog, API, WMI) sans rien installer"],
          ["Couverture", "Profonde : FIM, inventaire, commandes locales", "Limitée à ce que la source expose"],
          ["Déploiement", "À installer/maintenir partout", "Aucun déploiement"],
          ["Réseau", "Pousse (traverse les NAT)", "Tire (le SIEM doit joindre la source)"],
          ["Usage", "Serveurs et postes gérés", "Équipements réseau, cloud, SaaS"],
        ],
      },
      {
        kind: "text",
        text: "En pratique, on combine : agents sur les machines gérées (profondeur), agentless pour le réseau et le cloud (où on ne peut pas installer). Le choix se fait par source, pas par dogme.",
      },
    ],
  },
  {
    id: "correlation-types",
    title: "Types de corrélation",
    level: 3,
    intro:
      "Relier les événements : les quatre logiques de base.",
    blocks: [
      {
        kind: "fields",
        title: "Les quatre corrélations",
        fields: [
          {
            label: "Temporelle",
            value:
              "N événements en T secondes : 5 échecs SSH en 2 minutes = force brute. La plus simple et la plus utilisée.",
          },
          {
            label: "Par entité",
            value:
              "Même utilisateur/IP/machine à travers des sources : la même IP qui scanne puis se connecte avec succès = compromission probable.",
          },
          {
            label: "Séquentielle",
            value:
              "A puis B puis C dans l'ordre : reconnaissance → exploitation → persistance = kill chain détectée.",
          },
          {
            label: "Statistique / baseline",
            value:
              "Écart au comportement habituel : un utilisateur qui transfère 10 Go à 3h du matin alors qu'il n'a jamais dépassé 100 Mo = anomalie.",
          },
        ],
      },
    ],
  },
  {
    id: "anatomie-regle",
    title: "Anatomie d'une règle",
    level: 3,
    intro:
      "Ce qui fait une bonne règle de détection : condition, seuil, contexte.",
    blocks: [
      {
        kind: "code",
        language: "xml",
        title: "Squelette de règle Wazuh (local_rules.xml)",
        code: "<group name=\"local,\">\n  <rule id=\"100001\" level=\"7\">\n    <if_sid>550</if_sid>\n    <match>Failed password</match>\n    <description>Echecs d'authentification SSH (test)</description>\n  </rule>\n</group>",
      },
      {
        kind: "text",
        text: "Anatomie : un identifiant unique (`id` ≥ 100000 pour les règles locales), un niveau de sévérité (`level`), une condition (ici : s'appuyer sur la règle 550 des logs SSH + motif textuel), une description claire. Les règles composées ajoutent fréquence et fenêtre (`<frequency>5</frequency><timeframe>120</timeframe>`) pour la corrélation temporelle.",
      },
      {
        kind: "list",
        items: [
          "Une règle = une intention documentée : pourquoi elle existe, ce qu'elle détecte, que faire quand elle se déclenche.",
          "Nommez et numérotez de façon stable : les règles vivent des années et sont référencées dans les playbooks.",
          "Testez chaque règle contre du trafic bénin réel avant activation : une règle qui hurle sur l'activité normale sera ignorée — y compris quand elle aura raison.",
        ],
      },
    ],
  },
  {
    id: "seuils-baselines",
    title: "Seuils et baselines",
    level: 3,
    intro:
      "Régler la sensibilité : ni aveugle, ni paranoïaque.",
    blocks: [
      {
        kind: "text",
        text: "Un seuil trop bas noie l'équipe sous les faux positifs (fatigue d'alerte : on finit par tout ignorer) ; trop haut, il rate les attaques lentes. La méthode : mesurer le volume bénin sur 2-4 semaines (baseline), placer le seuil au-dessus du bruit normal avec de la marge, puis ajuster d'après les retours du triage.",
      },
      {
        kind: "list",
        items: [
          "Les attaquants « low and slow » passent sous les seuils fixes : complétez par des détections comportementales (baselines par utilisateur).",
          "Seuils différents par contexte : 5 échecs SSH depuis l'extérieur ≠ 5 échecs depuis le poste d'un admin qui a oublié son mot de passe.",
          "Revisitez les seuils trimestriellement : l'infrastructure et les usages changent, les seuils doivent suivre.",
        ],
      },
    ],
  },
  {
    id: "mitre-attck",
    title: "MITRE ATT&CK",
    level: 3,
    intro:
      "Le référentiel des tactiques et techniques d'attaque : parler le même langage.",
    blocks: [
      {
        kind: "text",
        text: "MITRE ATT&CK catalogue les tactiques (pourquoi : accès initial, persistance, exfiltration…) et techniques (comment : force brute T1110, phishing, exécution de scripts…) observées chez les attaquants réels. Cartographier vos règles sur ATT&CK révèle les angles morts : « nous détectons l'accès initial mais rien sur la persistance ».",
      },
      {
        kind: "list",
        items: [
          "Mappez chaque règle à une technique : la couverture se pilote, les doublons se repèrent.",
          "Utilisez ATT&CK pour concevoir des scénarios de test : simulez chaque tactique et vérifiez la détection.",
          "C'est aussi le vocabulaire des rapports : « détection de T1110 » parle à tous les professionnels.",
          "Ne cherchez pas 100 % de couverture : priorisez les techniques les plus probables contre votre contexte.",
        ],
      },
    ],
  },
  {
    id: "kill-chain",
    title: "Kill chain et modèles d'attaque",
    level: 3,
    intro:
      "Penser en campagne, pas en événement isolé.",
    blocks: [
      {
        kind: "text",
        text: "La kill chain (reconnaissance → armement → livraison → exploitation → installation → commande → action) rappelle qu'une attaque est une séquence : détecter tôt (reconnaissance, livraison) coûte moins cher que détecter à l'exfiltration. Le SIEM excelle à reconstituer la chaîne a posteriori — à condition que chaque étape ait laissé des logs.",
      },
      {
        kind: "text",
        text: "En pratique : quand une alerte se déclenche, remontez la timeline de l'entité (IP, utilisateur, machine) sur les jours précédents — l'alerte n'est souvent que la partie visible d'une activité plus ancienne. C'est le « threat hunting » réactif : chercher ce que les règles n'ont pas vu.",
      },
    ],
  },
  {
    id: "severite",
    title: "Niveaux de sévérité",
    level: 3,
    intro:
      "Calibrer la criticité : une échelle partagée par toute l'équipe.",
    blocks: [
      {
        kind: "table",
        headers: ["Niveau", "Sens", "Réponse attendue"],
        rows: [
          ["Critique", "Compromission probable ou en cours", "Investigation immédiate, escalade"],
          ["Haute", "Comportement fortement suspect", "Investigation prioritaire dans l'heure"],
          ["Moyenne", "Anomalie à qualifier", "Triage dans la journée"],
          ["Basse", "Information, bruit de fond", "Revue périodique, tuning des règles"],
        ],
      },
      {
        kind: "text",
        text: "La sévérité doit refléter le risque réel dans votre contexte, pas la gravité théorique : un scan de ports sur un honeypot n'est pas « critique ». Et une échelle où tout est critique ne sert à rien — la criticité est un budget d'attention.",
      },
    ],
  },
  {
    id: "triage-methode",
    title: "Méthode de triage",
    level: 3,
    intro:
      "Qualifier vite et bien : la discipline qui fait le SOC.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Collecter le contexte",
            detail: "Utilisateur, machine, IP source/géolocalisation, historique récent de l'entité, autres alertes corrélées : 80 % de la qualification est là.",
          },
          {
            title: "Vérifier la bénignité connue",
            detail: "Scans de vulnérabilité internes planifiés, sauvegardes nocturnes, admin en astreinte : les faux positifs récurrents doivent être documentés et exclus.",
          },
          {
            title: "Décider",
            detail: "Vrai positif → playbook d'escalade. Faux positif → ajustement de règle + documentation. Indéterminé → investigation bornée dans le temps, puis escalade avec le dossier.",
          },
          {
            title: "Boucler",
            detail: "Chaque triage alimente le système : règle affinée, liste blanche enrichie, playbook complété. Un SOC qui ne capitalise pas retraite les mêmes alertes éternellement.",
          },
        ],
      },
    ],
  },
  {
    id: "faux-positifs",
    title: "Gérer les faux positifs",
    level: 3,
    intro:
      "L'ennemi silencieux : la fatigue d'alerte tue la détection.",
    blocks: [
      {
        kind: "text",
        text: "Un faux positif n'est pas un bug anodin : chaque fausse alerte consomme du temps d'analyste et érode la confiance — jusqu'au jour où une vraie alerte est ignorée « comme les autres ». La gestion des faux positifs est une discipline, pas du bricolage.",
      },
      {
        kind: "list",
        items: [
          "Mesurez le taux de faux positifs par règle : une règle à 99 % de faux positifs est une règle à réécrire ou supprimer.",
          "Listes d'exclusion documentées : IPs des scanners internes, comptes de service bruyants — avec date et responsable, pas en vrac.",
          "Affinez plutôt que désactiver : resserrer une condition vaut mieux que couper une détection.",
          "Impliquez les métiers : le « comportement bizarre » est souvent un processus légitime inconnu du SOC.",
        ],
      },
    ],
  },
  {
    id: "playbooks",
    title: "Playbooks / runbooks",
    level: 3,
    intro:
      "Des procédures écrites pour les alertes récurrentes : répondre vite et pareil.",
    blocks: [
      {
        kind: "text",
        text: "Un playbook décrit pas à pas la réponse à un type d'alerte : vérifications, outils, critères d'escalade, actions de containment, communication. « Compte compromis suspecté » ou « ransomware détecté » ne s'improvisent pas à 3h du matin.",
      },
      {
        kind: "list",
        items: [
          "Un playbook par scénario majeur : compromission de compte, malware, exfiltration, déni de service.",
          "Testez-les en exercice (tabletop) : un playbook jamais joué est une fiction.",
          "Versionnez et datez : les contacts, les outils et l'infrastructure changent.",
          "Le playbook guide, il ne remplace pas le jugement : prévoyez les sorties (« si X, escalader »).",
        ],
      },
    ],
  },
  {
    id: "roles-soc",
    title: "Les rôles du SOC",
    level: 3,
    intro:
      "Qui fait quoi : l'organisation derrière les alertes.",
    blocks: [
      {
        kind: "table",
        headers: ["Niveau", "Rôle", "Activité typique"],
        rows: [
          ["L1", "Analyste triage", "Qualifie les alertes, applique les playbooks, escalade"],
          ["L2", "Analyste investigation", "Creuse les incidents, threat hunting, ajuste les règles"],
          ["L3", "Expert / chasseur", "Forensique, ingénierie de détection, réponse aux incidents majeurs"],
          ["SOC Manager", "Pilotage", "Métriques, process, coordination, astreintes"],
        ],
      },
      {
        kind: "text",
        text: "La progression naturelle : on commence au triage (L1) où l'on apprend les motifs d'attaque, on monte vers l'investigation puis l'ingénierie de détection. Chaque niveau suppose la maîtrise du précédent.",
      },
    ],
  },
  {
    id: "mttd-mttr",
    title: "MTTD / MTTR : mesurer la détection",
    level: 3,
    intro:
      "Deux métriques qui disent si le SOC est efficace.",
    blocks: [
      {
        kind: "fields",
        title: "Les métriques",
        fields: [
          {
            label: "MTTD (Mean Time To Detect)",
            value:
              "Temps moyen entre le début d'une activité malveillante et sa détection. Un MTTD de plusieurs mois (la norme sans SIEM bien réglé) signifie qu'on détecte par hasard ou par plainte.",
          },
          {
            label: "MTTR (Mean Time To Respond)",
            value:
              "Temps moyen entre la détection et la remédiation (compte bloqué, machine isolée). Un MTTD court avec un MTTR long = on voit l'incendie mais on n'a pas d'extincteur.",
          },
        ],
      },
      {
        kind: "text",
        text: "Ces métriques se pilotent : le MTTD s'améliore par la couverture des règles et la qualité du triage, le MTTR par les playbooks et l'automatisation (SOAR). Les suivre dans le temps est plus utile que leur valeur absolue.",
      },
    ],
  },
  {
    id: "dashboards-utiles",
    title: "Dashboards opérationnels",
    level: 3,
    intro:
      "Les vues qui servent vraiment, au-delà des démos.",
    blocks: [
      {
        kind: "fields",
        title: "Les indispensables",
        fields: [
          {
            label: "Alertes temps réel",
            value:
              "Le flux des alertes par criticité : l'écran principal du triage, avec accès direct au contexte.",
          },
          {
            label: "Santé de la collecte",
            value:
              "Agents actifs, volume de logs par source, parsers en échec : le SIEM qui se surveille lui-même.",
          },
          {
            label: "Top talkers",
            value:
              "Utilisateurs, IPs, machines les plus actifs ou les plus alertés : les comportements qui sortent du lot.",
          },
          {
            label: "Tendances",
            value:
              "Évolution sur 30 jours : une dérive lente (plus de scans, plus d'échecs) est invisible au jour le jour.",
          },
          {
            label: "Conformité",
            value:
              "Les vues exigées par les audits (qui a accédé à quoi) : un sous-produit précieux de la centralisation.",
          },
        ],
      },
    ],
  },
  {
    id: "retention-conformite",
    title: "Rétention et conformité",
    level: 3,
    intro:
      "Combien de temps garder les logs — et pourquoi c'est un sujet juridique autant que technique.",
    blocks: [
      {
        kind: "text",
        text: "La rétention équilibre trois forces : l'investigation (plus c'est long, mieux on remonte les attaques lentes), le coût (le stockage des logs est le premier poste du SIEM), et le droit (certaines données ne doivent pas être conservées trop longtemps — données personnelles, RGPD).",
      },
      {
        kind: "list",
        items: [
          "Politique de rétention écrite : durées par type de log, justifiées (ex. 1 an pour l'investigation, 3 ans pour la conformité).",
          "Stratification : logs chauds (requêtables, 30-90 jours) puis archivage froid (compressé, restaurable sur demande).",
          "Intégrité des archives : hachage/signature — un log d'audit modifiable n'a aucune valeur probante.",
          "Droit d'accès : qui peut lire quels logs — les logs contiennent des données personnelles (RGPD : minimisation, durées).",
        ],
      },
    ],
  },
  {
    id: "syslog-concepts",
    title: "Syslog : le protocole historique",
    level: 3,
    intro:
      "Comprendre le socle de la collecte Unix.",
    blocks: [
      {
        kind: "text",
        text: "Syslog transporte les logs en UDP/TCP (port 514) avec une priorité (facility × severity : `<134>` = authpriv/crit). `rsyslog` (le standard Linux) filtre, formate et relaie vers le SIEM ; la configuration par règles (`if $programname == 'sshd' then @siem:514`) route chaque flux.",
      },
      {
        kind: "list",
        items: [
          "UDP = pas de garantie de livraison : en TCP (`@@`) ou TLS pour les logs critiques.",
          "Horodatage : configurez un format avec année et fuseau — le syslog classique n'a ni l'un ni l'autre.",
          "Files d'attente disque (`rsyslog` en mode file-buffered) : les logs survivent à une coupure réseau vers le SIEM.",
          "Ne jamais logger les secrets : mots de passe et tokens dans syslog = dans le SIEM = exposés.",
        ],
      },
    ],
  },
  {
    id: "elastic-stack",
    title: "La stack Elastic",
    level: 3,
    intro:
      "L'alternative open source : comprendre l'architecture.",
    blocks: [
      {
        kind: "diagram",
        title: "Pipeline Elastic",
        lines: [
          "Beats / Agents ──▶ Logstash (parse, filtre, enrichit)",
          "                        │",
          "                        ▼",
          "                 Elasticsearch (indexe, cherche)",
          "                        │",
          "                        ▼",
          "                    Kibana (visualise, alerte)",
        ],
      },
      {
        kind: "text",
        text: "La stack Elastic décompose le SIEM en briques : collecte (Beats), traitement (Logstash), stockage/recherche (Elasticsearch), visualisation (Kibana). Plus flexible que Wazuh, mais à assembler et opérer soi-même — c'est un projet d'infrastructure autant qu'un projet sécurité.",
      },
    ],
  },
  {
    id: "splunk-spl",
    title: "Splunk et le langage SPL",
    level: 3,
    intro:
      "Le standard entreprise : chercher dans les logs comme un pro.",
    blocks: [
      {
        kind: "text",
        text: "SPL (Search Processing Language) enchaîne des commandes par pipes : `sourcetype=\"linux_secure\" \"Failed password\" | stats count by src_ip | where count > 5 | sort -count`. Cette seule requête détecte les IPs en force brute — la puissance de Splunk tient à ce langage.",
      },
      {
        kind: "list",
        items: [
          "Apprenez `stats`, `where`, `timechart`, `lookup` : 80 % des recherches de détection tiennent en ces quatre commandes.",
          "Les recherches planifiées + alertes = des règles de détection ; les dashboards = des vues.",
          "Le modèle de licence au volume ingéré rend la discipline de collecte (filtrer en amont) économiquement vitale.",
        ],
      },
    ],
  },
  {
    id: "wazuh-regles-avancees",
    title: "Règles Wazuh avancées",
    level: 3,
    intro:
      "Au-delà du motif simple : groupes, exceptions, corrélation.",
    blocks: [
      {
        kind: "list",
        items: [
          "Groupes de règles : organisez par source (`local,syslog,sshd,`) — la maintenance à 200 règles exige une structure.",
          "Règles composées : `<if_sid>` + `<frequency>` + `<timeframe>` pour la corrélation temporelle (X événements en Y secondes).",
          "Exceptions : `<if_matched_sid>` avec négation pour exclure les cas bénins connus sans dupliquer la règle.",
          "Niveaux cohérents : 0-6 information, 7-9 suspicion, 10+ attaque probable — toute l'équipe doit partager la même lecture.",
          "Testez avec `wazuh-logtest` : simulez un log et voyez quelles règles se déclenchent, avant tout déploiement.",
          "Les règles par défaut (des centaines) : activez par besoin, pas en bloc — chacune est du bruit potentiel.",
        ],
      },
    ],
  },
  {
    id: "threat-intel",
    title: "Threat intelligence",
    level: 3,
    intro:
      "Enrichir avec la connaissance du monde extérieur : IOCs et contexte.",
    blocks: [
      {
        kind: "text",
        text: "La threat intel fournit des indicateurs de compromission (IOCs : IPs, domaines, hashs malveillants connus) et du contexte (campagnes en cours, TTPs). Le SIEM croise ses logs avec ces listes : une connexion vers une IP connue comme C2 devient une alerte haute sans écrire de règle.",
      },
      {
        kind: "list",
        items: [
          "Sources : flux open source (listes communautaires) puis commerciaux — commencez gratuit, mesurez la valeur.",
          "Automatisez la mise à jour : un IOC vieux de 6 mois est du bruit, pas de l'intel.",
          "Ne bloquez pas aveuglément sur les IOCs : faux positifs possibles (IP réassignée) — corroborez avec le contexte local.",
          "Partagez en retour : les IOCs de vos incidents alimentent la communauté (formats STIX/TAXII).",
        ],
      },
    ],
  },
  {
    id: "soar",
    title: "SOAR : l'automatisation de la réponse",
    level: 3,
    intro:
      "Au-delà de la détection : répondre automatiquement.",
    blocks: [
      {
        kind: "text",
        text: "SOAR (Security Orchestration, Automation and Response) automatise les réponses répétitives : une alerte « force brute » → blocage automatique de l'IP au firewall + désactivation du compte + ticket. Le SIEM détecte, le SOAR exécute les playbooks.",
      },
      {
        kind: "text",
        text: "Prudence : automatisez d'abord les actions réversibles et sûres (blocage temporaire, ticket, notification). Les actions destructrices (suppression de compte, isolation) restent semi-automatiques (un clic humain) jusqu'à preuve de fiabilité. Un SOAR mal réglé qui bloque les admins un lundi matin est un incident en soi.",
      },
    ],
  },
  {
    id: "test-evenements",
    title: "Générer des événements de test",
    level: 3,
    intro:
      "Valider la détection : simuler l'attaquant en toute sécurité.",
    blocks: [
      {
        kind: "list",
        items: [
          "Jamais sur la production : un labo isolé (VMs dédiées) pour tous les tests offensifs.",
          "Outils : scans (nmap contre vos cibles de test), force brute (hydra), payloads web — chaque tactique ATT&CK simulée doit produire l'alerte attendue.",
          "Atomic Red Team : des tests unitaires d'attaques mappés sur ATT&CK — la batterie de tests standard pour valider la couverture.",
          "Documentez chaque test : date, technique, résultat (détecté ? en combien de temps ?) — c'est la mesure de votre MTTD.",
          "Nettoyez après : les artefacts de test (comptes, fichiers) ne doivent pas polluer la détection future.",
        ],
      },
    ],
  },
  {
    id: "chasse-menaces",
    title: "Threat hunting : chasser sans alerte",
    level: 3,
    intro:
      "Chercher proactivement ce que les règles n'ont pas vu.",
    blocks: [
      {
        kind: "text",
        text: "Le threat hunting part d'une hypothèse (« un attaquant utilise PowerShell encodé sur nos postes ») et fouille les logs pour la confirmer ou l'infirmer — sans attendre qu'une règle se déclenche. C'est le complément indispensable de la détection : les attaques nouvelles ou lentes passent sous les règles.",
      },
      {
        kind: "list",
        items: [
          "Hypothèses nourries par la threat intel, les rapports d'incidents publics et ATT&CK.",
          "Chaque chasse concluante devient une règle : le hunting alimente la détection.",
          "Chaque chasse infructueuse affine la connaissance du « normal » : c'est aussi un résultat.",
          "Timeboxé et documenté : une chasse sans rapport écrit est une chasse perdue.",
        ],
      },
    ],
  },
  {
    id: "debugging-avance",
    title: "Debugging avancé",
    level: 3,
    intro:
      "Quand les bases ne suffisent pas : instrumenter le pipeline.",
    blocks: [
      {
        kind: "fields",
        title: "Techniques",
        fields: [
          {
            label: "Tracer un événement",
            value:
              "Générez un log marqué (identifiant unique) et suivez-le : reçu par l'agent ? Parsé ? Corrélé ? Alerté ? Le maillon manquant se révèle.",
          },
          {
            label: "Compter par étape",
            value:
              "Volume en entrée (collecte) vs volume indexé vs alertes : un écart anormal localise la perte (parser qui rejette, règle qui filtre).",
          },
          {
            label: "Rejouer des logs",
            value:
              "Injectez des logs historiques dans une instance de test pour valider une nouvelle règle sur du trafic réel passé.",
          },
          {
            label: "Auditer les silences",
            value:
              "Listez les sources sans logs depuis 24 h et les règles sans déclenchement depuis 30 jours : les angles morts et les règles mortes.",
          },
          {
            label: "Corréler les horloges",
            value:
              "Un événement « avant » sa cause dans la timeline = horloges désynchronisées — vérifiez NTP sur toute la chaîne.",
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
      "Les pièges qui survivent au niveau 2.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "La fatigue d'alerte",
            value:
              "Problème : trop de bruit, l'équipe ignore tout — y compris les vraies attaques. Solution : mesurer le bruit par règle, tailler sans pitié, viser < 20 alertes/jour/analyste actionnables.",
          },
          {
            label: "Détecter sans répondre",
            value:
              "Problème : des alertes critiques sans playbook ni pouvoir d'action. Solution : chaque règle critique = un playbook + des droits d'intervention.",
          },
          {
            label: "Le SIEM comme poubelle",
            value:
              "Problème : tout ingérer sans parser ni trier — coûts explosifs, zéro valeur. Solution : collecte sélective, parsing obligatoire, rétention stratifiée.",
          },
          {
            label: "Oublier les angles morts",
            value:
              "Problème : le cloud, les SaaS ou les postes distants ne sont pas connectés. Solution : cartographier les sources, alerter sur les silences.",
          },
          {
            label: "Règles jamais retestées",
            value:
              "Problème : une règle qui marchait il y a un an ne détecte plus rien (formats changés, infra évoluée). Solution : batterie de tests périodiques (Atomic Red Team).",
          },
          {
            label: "Confondre conformité et sécurité",
            value:
              "Problème : cocher les cases d'audit sans détecter réellement. Solution : la conformité est un sous-produit d'une bonne détection, pas l'inverse.",
          },
          {
            label: "Un seul analyste",
            value:
              "Problème : le SOC repose sur une personne — vacances, départ = effondrement. Solution : documentation, playbooks, redondance minimale.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro:
      "Des repères de contexte, pas des règles absolues.",
    blocks: [
      {
        kind: "list",
        items: [
          "Collecte sélective et parsée : chaque source connectée est normalisée et justifiée.",
          "Règles testées : écrites, déclenchées en labo, mesurées en bruit avant production.",
          "Triage discipliné : criticité d'abord, timebox, capitalisation systématique.",
          "Faux positifs traités comme des bugs : mesurés, corrigés, pas subis.",
          "Playbooks pour chaque scénario critique, exercés en tabletop.",
          "Surveiller le SIEM lui-même : santé de la collecte, silences, règles mortes.",
          "Cartographier sur ATT&CK : piloter la couverture, combler les angles morts.",
          "Métriques MTTD/MTTR suivies dans le temps.",
          "Rétention documentée, archives intègres, accès contrôlés.",
          "Automatiser avec prudence : d'abord les actions réversibles.",
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro:
      "Aller plus loin, en commençant toujours par les documentations officielles.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          {
            label: "Documentation Wazuh",
            value:
              "wazuh.com : installation, agents, règles, API — la référence pour le SIEM open source (déjà citée dans le guide de la compétence).",
          },
          {
            label: "MITRE ATT&CK",
            value:
              "attack.mitre.org : le référentiel des tactiques et techniques — la carte du territoire adverse.",
          },
          {
            label: "Documentation Splunk / Elastic",
            value:
              "Les docs officielles pour SPL et la stack ELK quand on monte vers ces plateformes.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : un labo avec attaques simulées (Atomic Red Team) — la détection ne s'apprend qu'en la testant.",
          "Communauté : les rapports d'incidents publics (ANSSI, CISA) — des cas réels pour calibrer ses règles.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Le SIEM maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "`forensics` : passer de la détection à la réponse — analyse forensique, containment, remédiation.",
          "`pentest` : penser comme l'attaquant pour mieux détecter — la boucle est bouclée.",
          "`networking` : approfondir les protocoles pour lire les logs réseau comme un livre ouvert.",
          "`linux` et `scripting` : automatiser la collecte, le parsing et les investigations.",
          "`cryptography` : comprendre ce que les logs chiffrés cachent — et ce qu'ils révèlent.",
          "`python` : scripter l'analyse — parsing custom, enrichissement, automatisation SOAR.",
          "Revenir à la roadmap : valider le SIEM et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

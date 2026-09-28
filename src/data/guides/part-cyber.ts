import type { SkillGuide } from "../skill-guides";

import { LEARNING_LINUX } from "./learning-linux";
/**
 * Guides pédagogiques — cybersécurité.
 *
 * Ces entrées enrichissent les compétences de la roadmap Cybersecurity
 * Engineer (désignées par leur `id`) avec un contenu éditorial structuré :
 * définition, intérêt pédagogique, prérequis expliqués, concepts clés,
 * fonctionnement, exemple concret et projets progressifs.
 *
 * Conventions suivies :
 * - `prerequisiteNotes` : clés = ids EXACTS du tableau `prerequisites` du skill.
 * - `conceptDetails[].name` : reprend au plus proche le tableau `concepts` du skill.
 * - Ton : documentation technique premium, concret, sans marketing. Français.
 */
export const GUIDES_CYBER: Record<string, SkillGuide> = {
  // --------------------------------------------------------------- networking
  networking: {
    definition:
      "Les réseaux sont l'infrastructure par laquelle les machines communiquent : le modèle TCP/IP décrit comment les données sont découpées en paquets, adressées, routées puis réassemblées entre un émetteur et un destinataire.",
    whyLearn:
      "La plupart des attaques transitent par le réseau : interception, usurpation, exfiltration. Savoir lire une capture Wireshark, comprendre le DNS et le routage permet de repérer un trafic anormal et de comprendre concrètement comment une attaque se propage. C'est le terrain de jeu commun de l'attaquant et du défenseur.",
    conceptDetails: [
      {
        name: "TCP/IP & OSI",
        definition:
          "Le modèle en couches qui structure toute communication : l'application parle, TCP fiabilise, IP adresse et route, la couche liaison transporte les bits.",
      },
      {
        name: "DNS",
        definition:
          "Le service qui traduit les noms de domaine en adresses IP : indispensable au web, et détourné pour l'exfiltration de données ou le phishing.",
      },
      {
        name: "Wireshark",
        definition:
          "L'analyseur de paquets de référence : il capture le trafic brut et permet de disséquer chaque échange, du handshake TCP aux requêtes applicatives.",
      },
      {
        name: "Firewalls",
        definition:
          "Les filtres qui autorisent ou bloquent le trafic selon des règles : première barrière entre un réseau et l'extérieur.",
      },
      {
        name: "VPN",
        definition:
          "Un tunnel chiffré qui fait transiter le trafic par un point distant : il protège les échanges sur des réseaux non fiables.",
      },
    ],
    howItWorksTitle: "Le voyage d'un paquet",
    howItWorks: ["APPLICATION", "TCP", "IP", "ROUTAGE", "RÉCEPTION", "RÉASSEMBLAGE"],
    example: {
      title: "Charger une page web",
      steps: [
        "Navigateur",
        "Requête DNS",
        "Connexion TCP",
        "Requête HTTP",
        "Paquets IP",
        "Page affichée",
      ],
    },
    projectsDetailed: [
      {
        title: "Analyse de captures réseau",
        flow: "Capture Wireshark → Filtrage → Identification d'un scan de ports",
      },
      {
        title: "Lab réseau segmenté",
        flow: "Topologie → VLAN → Règles firewall → Test d'isolation",
      },
      {
        title: "Détection d'exfiltration DNS",
        flow: "Trafic DNS → Analyse des requêtes → Règle de détection",
      },
    ],
  },

  // -------------------------------------------------------------------- linux
  linux: {
    learning: LEARNING_LINUX,
    definition:
      "Linux est le système d'exploitation dominant sur les serveurs, les équipements réseau et les machines des attaquants comme des défenseurs. Il expose un modèle clair : utilisateurs, permissions, processus et fichiers de logs.",
    whyLearn:
      "Un serveur compromis est presque toujours un Linux mal configuré : permissions trop larges, services inutiles exposés, logs ignorés. Maîtriser le durcissement (hardening) et l'analyse des logs permet à la fois de fermer les portes et de comprendre comment elles ont été ouvertes.",
    conceptDetails: [
      {
        name: "Permissions avancées",
        definition:
          "Le modèle propriétaire/groupe/autres, les bits setuid et les ACL : qui peut lire, écrire ou exécuter quoi — la base de tout durcissement.",
      },
      {
        name: "Logs système",
        definition:
          "Journald, syslog, auditd : les journaux enregistrent connexions, erreurs et exécutions. Les lire est le premier réflexe du défenseur comme de l'investigateur.",
      },
      {
        name: "Hardening",
        definition:
          "Réduire la surface d'attaque : désactiver les services inutiles, restreindre SSH, appliquer les benchmarks CIS.",
      },
      {
        name: "Bash",
        definition:
          "Le shell et son langage de script : automatiser l'administration, enchaîner les outils, écrire des audits reproductibles.",
      },
      {
        name: "Conteneurs",
        definition:
          "Isoler des processus dans des environnements légers (namespaces, cgroups) : comprendre leur isolation — et ses limites de sécurité.",
      },
    ],
    howItWorksTitle: "Le cycle de durcissement",
    howItWorks: ["INVENTAIRE", "CONFIGURATION", "PERMISSIONS", "LOGS", "SURVEILLANCE", "AUDIT"],
    example: {
      title: "Durcir un serveur SSH",
      steps: [
        "Connexion root",
        "Clés SSH",
        "Mot de passe désactivé",
        "Fail2ban",
        "Logs vérifiés",
      ],
    },
    projectsDetailed: [
      {
        title: "Hardening CIS d'un serveur",
        flow: "Benchmark CIS → Application → Vérification",
      },
      {
        title: "Script d'audit automatisé",
        flow: "Collecte → Permissions → Services → Rapport",
      },
    ],
  },

  // ------------------------------------------------------------------- python
  python: {
    definition:
      "Python est le langage de scripting de référence en sécurité : lisible, riche en bibliothèques réseau et système, il permet d'écrire en quelques dizaines de lignes des outils d'analyse ou d'attaque.",
    whyLearn:
      "En sécurité, on écrit constamment des outils sur mesure : scanner un réseau, parser des gigaoctets de logs, automatiser des tests, prototyper un exploit. Python, avec Scapy et Requests, est le couteau suisse qui sert aux deux camps, offensif comme défensif.",
    conceptDetails: [
      {
        name: "Sockets",
        definition:
          "L'interface bas niveau pour ouvrir des connexions TCP/UDP : la brique de tout scanner, client ou serveur écrit à la main.",
      },
      {
        name: "Scapy",
        definition:
          "La bibliothèque de manipulation de paquets : forger, envoyer, capturer et décoder n'importe quel protocole, de l'ARP au DNS.",
      },
      {
        name: "Parsing & regex",
        definition:
          "Extraire du sens des logs et des sorties d'outils : expressions régulières et parsing structuré pour traiter des volumes que l'œil ne peut pas lire.",
      },
      {
        name: "Requests",
        definition:
          "Le client HTTP de facto : interroger des APIs, automatiser des requêtes web, construire des preuves de concept d'attaques applicatives.",
      },
      {
        name: "Automatisation",
        definition:
          "Enchaîner les outils et les vérifications en scripts reproductibles : un audit manuel devient un pipeline exécutable.",
      },
    ],
    howItWorksTitle: "Écrire un outil de sécurité",
    howItWorks: ["BESOIN", "SCRIPT", "PAQUETS", "ANALYSE", "RAPPORT"],
    example: {
      title: "Scanner de ports",
      steps: ["Cible", "Sockets TCP", "Ports testés", "Réponses", "Rapport"],
    },
    projectsDetailed: [
      {
        title: "Scanner de ports",
        flow: "Cible → Sockets → Multithreading → Rapport",
      },
      {
        title: "Analyseur de logs",
        flow: "Logs → Regex → Anomalies → Alertes",
      },
      {
        title: "Client de threat intel",
        flow: "API → Requêtes → Enrichissement → Score",
      },
    ],
  },

  // ------------------------------------------------------------- web-security
  "web-security": {
    definition:
      "La sécurité web étudie les vulnérabilités des applications exposées sur HTTP : injections, XSS, failles d'authentification. C'est le domaine où se concentre la majorité des incidents de sécurité.",
    whyLearn:
      "Presque chaque entreprise expose une application web, et les failles web (OWASP Top 10) dominent les compromissions. Comprendre ces attaques permet de les trouver en pentest et de les empêcher en développement. C'est la compétence offensive la plus demandée.",
    prerequisiteNotes: {
      networking:
        "Savoir comment une requête HTTP voyage : en-têtes, cookies, sessions — le support de toutes les attaques web.",
    },
    conceptDetails: [
      {
        name: "OWASP Top 10",
        definition:
          "Le classement des dix familles de failles web les plus critiques : la carte de référence de tout testeur d'applications.",
      },
      {
        name: "XSS & injections",
        definition:
          "Injecter du code ou des commandes là où l'application fait confiance aux entrées : XSS dans le navigateur, SQLi dans la base.",
      },
      {
        name: "Auth flaws",
        definition:
          "Les failles d'authentification et de session : contournement de login, fixation de session, contrôle d'accès manquant.",
      },
      {
        name: "Burp Suite",
        definition:
          "Le proxy d'interception incontournable : voir, modifier et rejouer chaque requête entre le navigateur et le serveur.",
      },
      {
        name: "SSRF",
        definition:
          "Faire exécuter par le serveur des requêtes à notre place : la faille qui transforme une application en pivot vers son réseau interne.",
      },
    ],
    howItWorksTitle: "Le cycle d'une attaque web",
    howItWorks: ["RECONNAISSANCE", "INTERCEPTION", "INJECTION", "EXPLOITATION", "IMPACT"],
    example: {
      title: "Injection SQL sur un formulaire",
      steps: [
        "Formulaire de login",
        "Proxy Burp",
        "Payload injecté",
        "Requête manipulée",
        "Base lue",
      ],
    },
    projectsDetailed: [
      {
        title: "Pentest d'une app vulnérable (DVWA)",
        flow: "Reconnaissance → OWASP Top 10 → Exploitation → Notes",
      },
      {
        title: "Write-up de 3 failles",
        flow: "Reproduction → Analyse → Correctif → Publication",
      },
    ],
  },

  // ----------------------------------------------------------- system-security
  "system-security": {
    definition:
      "La sécurité système couvre la compromission et la protection des systèmes d'exploitation : élévation de privilèges, persistance des attaquants, durcissement des machines.",
    whyLearn:
      "Après l'accès initial, tout se joue au niveau système : l'attaquant cherche à devenir administrateur et à rester invisible, le défenseur cherche à le détecter et à l'éjecter. Comprendre les deux côtés est indispensable pour durcir un parc ou répondre à un incident.",
    prerequisiteNotes: {
      linux:
        "Connaître permissions, processus et logs : l'attaquant les détourne, le défenseur les surveille.",
    },
    conceptDetails: [
      {
        name: "Privesc",
        definition:
          "L'élévation de privilèges : passer d'un accès limité à root ou SYSTEM en exploitant une mauvaise configuration ou une faille locale.",
      },
      {
        name: "Persistance",
        definition:
          "Les mécanismes qui permettent à un attaquant de survivre au redémarrage : services, tâches planifiées, clés de registre, shells.",
      },
      {
        name: "EDR",
        definition:
          "Les agents de détection sur les postes : ils surveillent processus et comportements pour bloquer les attaques en cours d'exécution.",
      },
      {
        name: "Hardening Windows/Linux",
        definition:
          "Durcir les deux systèmes : stratégies de groupe et GPO côté Windows, CIS et permissions côté Linux.",
      },
      {
        name: "AD basics",
        definition:
          "Les bases d'Active Directory : l'annuaire qui centralise identités et accès en entreprise — et la cible privilégiée des attaquants.",
      },
    ],
    howItWorksTitle: "La chaîne d'une compromission",
    howItWorks: ["ACCÈS", "ÉLÉVATION", "PERSISTANCE", "MOUVEMENT", "DÉTECTION"],
    example: {
      title: "Élévation de privilèges Linux",
      steps: ["Shell limité", "Énumération", "Binaire SUID", "Root", "Persistance"],
    },
    projectsDetailed: [
      {
        title: "Privesc sur machine vulnérable",
        flow: "Énumération → Vecteur → Exploitation → Documentation",
      },
      {
        title: "Baseline de durcissement",
        flow: "Inventaire → CIS → GPO/Ansible → Contrôle",
      },
    ],
  },

  // -------------------------------------------------------------- cryptography
  cryptography: {
    definition:
      "La cryptographie fournit les outils mathématiques de la confiance numérique : chiffrement, hachage, signatures. En sécurité, l'enjeu n'est pas d'inventer des algorithmes, mais de les utiliser correctement.",
    whyLearn:
      "TLS, mots de passe, signatures de code, VPN : la crypto protège presque tout, et la plupart des failles viennent d'un mauvais usage — clés codées en dur, hachage faible, certificats invalides. La comprendre permet d'auditer ces usages et d'éviter les erreurs classiques.",
    prerequisiteNotes: {
      python:
        "Pouvoir manipuler des octets et implémenter des algorithmes pour comprendre leur fonctionnement interne.",
      networking:
        "Savoir où la crypto s'applique sur le réseau : TLS, certificats, échanges de clés.",
    },
    conceptDetails: [
      {
        name: "AES / RSA",
        definition:
          "Les deux piliers : AES chiffre vite avec une clé partagée (symétrique), RSA échange des clés et signe avec une paire de clés (asymétrique).",
      },
      {
        name: "Hachage & signatures",
        definition:
          "Le hachage produit une empreinte unique des données ; la signature prouve l'origine et l'intégrité grâce à la clé privée du signataire.",
      },
      {
        name: "TLS",
        definition:
          "Le protocole qui sécurise le web : négociation de version, authentification du serveur par certificat, puis session chiffrée.",
      },
      {
        name: "PKI",
        definition:
          "L'infrastructure de clés publiques : autorités de certification, chaînes de confiance et révocation qui rendent les certificats fiables.",
      },
      {
        name: "Erreurs classiques",
        definition:
          "Les fautes qui tuent : ECB, IV réutilisé, MD5/SHA1, randomness faible, vérification de certificat désactivée.",
      },
    ],
    howItWorksTitle: "Établir une connexion TLS",
    howItWorks: ["CLIENT", "CERTIFICAT", "VÉRIFICATION", "ÉCHANGE DE CLÉS", "SESSION CHIFFRÉE"],
    example: {
      title: "Vérifier le TLS d'un site",
      steps: ["Connexion", "Certificat", "Chaîne PKI", "Protocole", "Verdict"],
    },
    projectsDetailed: [
      {
        title: "Implémentation pédagogique d'AES",
        flow: "Spécification → Code → Vecteurs de test → Limites",
      },
      {
        title: "Audit TLS d'un site",
        flow: "Scan → Configuration → Faiblesses → Recommandations",
      },
    ],
  },

  // ------------------------------------------------------------------- pentest
  pentest: {
    definition:
      "Le test d'intrusion (pentest) est une attaque simulée et autorisée contre un système, menée avec une méthodologie rigoureuse : reconnaissance, exploitation, post-exploitation et rapport.",
    whyLearn:
      "Le pentest est la façon la plus concrète de mesurer la sécurité réelle d'une organisation, au-delà des audits théoriques. C'est une discipline méthodique et documentée — et le rapport final, qui transforme des failles techniques en risques métier, vaut autant que l'exploitation elle-même.",
    prerequisiteNotes: {
      "web-security":
        "Exploiter les failles applicatives : la majorité des accès initiaux passent par le web.",
      "system-security":
        "Élever ses privilèges et pivoter une fois à l'intérieur du réseau.",
    },
    conceptDetails: [
      {
        name: "Méthodologie PTES",
        definition:
          "Le standard qui cadre un pentest : interactions préalables, renseignement, modélisation des menaces, exploitation, post-exploitation, rapport.",
      },
      {
        name: "Reconnaissance",
        definition:
          "Collecter passivement puis activement des informations : OSINT, scan de ports, énumération de services — sans encore attaquer.",
      },
      {
        name: "Exploitation",
        definition:
          "Transformer une vulnérabilité identifiée en accès réel, de façon contrôlée et dans le périmètre autorisé.",
      },
      {
        name: "Pivoting",
        definition:
          "Rebondir d'une machine compromise vers le reste du réseau : tunnels, proxys et mouvement latéral.",
      },
      {
        name: "Reporting",
        definition:
          "Documenter chaque finding avec preuve, criticité et remédiation : le livrable qui justifie toute la mission.",
      },
    ],
    howItWorksTitle: "Les phases d'un pentest",
    howItWorks: ["CADRAGE", "RECONNAISSANCE", "EXPLOITATION", "POST-EXPLOITATION", "RAPPORT"],
    example: {
      title: "Pentest d'une PME",
      steps: [
        "Périmètre",
        "OSINT",
        "Scan",
        "Exploitation web",
        "Pivoting",
        "Rapport",
      ],
    },
    projectsDetailed: [
      {
        title: "Pentest complet en lab",
        flow: "Cadrage → Méthodologie PTES → Exploitation → Preuves",
      },
      {
        title: "Rapport professionnel rédigé",
        flow: "Findings → Criticité → Recommandations → Relecture",
      },
    ],
  },

  // ----------------------------------------------------------------------- soc
  soc: {
    definition:
      "Le SOC (Security Operations Center) est l'équipe qui surveille en continu les systèmes d'une organisation : un SIEM centralise les logs, des règles détectent les comportements suspects, des analystes trient les alertes.",
    whyLearn:
      "Aucune prévention n'est parfaite : la question n'est pas « si » mais « quand » une attaque arrivera. Le SOC est le radar qui la voit arriver, et la qualité de la détection détermine la vitesse de réponse. C'est aussi la meilleure école pour apprendre les techniques réelles des attaquants.",
    prerequisiteNotes: {
      networking:
        "Lire le trafic réseau pour repérer scans, exfiltrations et communications malveillantes.",
      "system-security":
        "Comprendre les traces laissées sur les systèmes : processus suspects, persistance, logs.",
    },
    conceptDetails: [
      {
        name: "SIEM (Splunk, ELK)",
        definition:
          "La plateforme qui agrège les logs de toute l'organisation et permet de les corréler : le tableau de bord du SOC.",
      },
      {
        name: "Règles Sigma",
        definition:
          "Un format générique pour écrire des règles de détection portables entre SIEM : décrire une technique d'attaque en langage de logs.",
      },
      {
        name: "Triage",
        definition:
          "Qualifier une alerte : vrai positif ou bruit, criticité, périmètre — décider vite et bien sous pression.",
      },
      {
        name: "Threat intel",
        definition:
          "Le renseignement sur les menaces : IOC, TTP des groupes d'attaquants, pour enrichir et prioriser les détections.",
      },
      {
        name: "MITRE ATT&CK",
        definition:
          "La matrice qui cartographie les tactiques et techniques réelles des attaquants : le vocabulaire commun de la détection.",
      },
    ],
    howItWorksTitle: "Le traitement d'une alerte",
    howItWorks: ["COLLECTE", "CORRÉLATION", "ALERTE", "TRIAGE", "RÉPONSE"],
    example: {
      title: "Détecter un phishing",
      steps: ["Email suspect", "Log proxy", "Règle Sigma", "Alerte", "Isolation"],
    },
    projectsDetailed: [
      {
        title: "Lab SIEM avec attaques simulées",
        flow: "ELK → Sources → Attaques → Dashboards",
      },
      {
        title: "Règles de détection écrites",
        flow: "Technique ATT&CK → Log → Sigma → Test",
      },
    ],
  },

  // ------------------------------------------------------------------ forensics
  forensics: {
    definition:
      "La forensique numérique (DFIR) reconstitue ce qui s'est passé pendant un incident : on fige les preuves (disque, mémoire), on les analyse sans les altérer, on établit une chronologie.",
    whyLearn:
      "Après une intrusion, les questions sont concrètes : quelles données ont été volées, depuis quand, par quel moyen ? La forensique y répond avec une rigueur de preuve — indispensable pour la réponse à incident, le juridique et l'assurance.",
    prerequisiteNotes: {
      "system-security":
        "Savoir comment un attaquant s'installe : persistance, effacement de traces, artefacts.",
      linux:
        "Naviguer dans les systèmes de fichiers et journaux pour extraire des preuves.",
    },
    conceptDetails: [
      {
        name: "Acquisition",
        definition:
          "Copier les preuves bit à bit (image disque, dump mémoire) en garantissant leur intégrité par hachage : rien ne s'analyse sur l'original.",
      },
      {
        name: "Analyse mémoire",
        definition:
          "Examiner la RAM figée pour y trouver processus cachés, connexions actives et malwares qui n'existent que en mémoire.",
      },
      {
        name: "Timeline",
        definition:
          "Ordonner tous les événements dans le temps (fichiers, logs, registre) : la chronologie révèle le scénario de l'attaque.",
      },
      {
        name: "Chaîne de custody",
        definition:
          "Tracer qui a manipulé chaque preuve et quand : sans elle, une preuve est inutilisable en justice.",
      },
      {
        name: "Outils (Autopsy, Volatility)",
        definition:
          "Autopsy explore les images disque, Volatility dissèque la mémoire : les deux standards open source de l'investigation.",
      },
    ],
    howItWorksTitle: "Une investigation forensique",
    howItWorks: ["PRÉSERVATION", "ACQUISITION", "ANALYSE", "TIMELINE", "CONCLUSION"],
    example: {
      title: "Analyser une machine compromise",
      steps: ["Image disque", "Hash", "Autopsy", "Timeline", "IOC"],
    },
    projectsDetailed: [
      {
        title: "Investigation d'une image disque",
        flow: "Acquisition → Artefacts → Timeline → Hypothèses",
      },
      {
        title: "Rapport forensique",
        flow: "Méthode → Preuves → Chronologie → Conclusions",
      },
    ],
  },

  // -------------------------------------------------------------- secure-coding
  "secure-coding": {
    definition:
      "Le secure coding consiste à écrire du code qui ne crée pas de vulnérabilités : validation des entrées, gestion des secrets, dépendances maîtrisées, revues orientées sécurité.",
    whyLearn:
      "Corriger une faille en production coûte 10 à 100 fois plus cher que l'éviter à l'écriture. La sécurité « shift left » — intégrée dès le développement via revues, analyse statique et threat modeling — est le levier le plus rentable de toute la cybersécurité.",
    prerequisiteNotes: {
      python:
        "Lire et écrire du code pour repérer les patterns dangereux : injections, secrets, dépendances.",
      "web-security":
        "Connaître les failles applicatives pour les empêcher dès l'écriture du code.",
    },
    conceptDetails: [
      {
        name: "Validation des entrées",
        definition:
          "Ne jamais faire confiance aux données externes : typer, borner et assainir toute entrée avant usage — la défense contre les injections.",
      },
      {
        name: "Secrets management",
        definition:
          "Stocker clés d'API et mots de passe hors du code : variables d'environnement, coffres (Vault), jamais en dur dans le repo.",
      },
      {
        name: "Dépendances (SCA)",
        definition:
          "Analyser la composition logicielle : vos dépendances ont des CVE, les scanner en continu (SCA) fait partie du métier.",
      },
      {
        name: "Code review sécu",
        definition:
          "Relire le code avec une grille d'attaquant : flux de données sensibles, contrôle d'accès, gestion d'erreurs qui fuit de l'information.",
      },
      {
        name: "Threat modeling",
        definition:
          "Modéliser les menaces avant de coder (STRIDE) : identifier ce qui peut mal tourner pour concevoir les mitigations en amont.",
      },
    ],
    howItWorksTitle: "Intégrer la sécurité au développement",
    howItWorks: ["THREAT MODEL", "CODE", "REVUE", "ANALYSE", "CORRECTION"],
    example: {
      title: "Revue d'une fonction de login",
      steps: ["Code", "Entrées", "Requête SQL", "Injection ?", "Requête paramétrée"],
    },
    projectsDetailed: [
      {
        title: "Audit de code d'un projet",
        flow: "Périmètre → SAST manuel → Findings → Correctifs",
      },
      {
        title: "Threat model d'une app",
        flow: "Architecture → STRIDE → Menaces → Mitigations",
      },
    ],
  },

  // ------------------------------------------------------------- cloud-security
  "cloud-security": {
    definition:
      "La sécurité du cloud protège des infrastructures éphémères et pilotées par API : identités (IAM), configurations, conteneurs. Le modèle est la responsabilité partagée : le fournisseur sécurise le cloud, le client sécurise ce qu'il y met.",
    whyLearn:
      "La majorité des fuites de données cloud viennent de mauvaises configurations, pas de failles techniques : bucket public, clé exposée, rôle trop permissif. Auditer la posture cloud (CSPM) et verrouiller l'IAM est devenu un métier à part entière.",
    prerequisiteNotes: {
      networking:
        "Comprendre VPC, flux réseau et exposition des services dans un réseau virtuel éphémère.",
      cryptography:
        "Maîtriser IAM, chiffrement des données et gestion des clés dans le cloud.",
    },
    conceptDetails: [
      {
        name: "IAM",
        definition:
          "La gestion des identités et accès : qui peut faire quoi sur quelles ressources — le périmètre de sécurité numéro un dans le cloud.",
      },
      {
        name: "CSPM",
        definition:
          "Les outils de gestion de la posture (Prowler, Wiz) : scanner en continu les mauvaises configurations et la dérive.",
      },
      {
        name: "Sécurité conteneurs",
        definition:
          "Durcir images, registres et orchestrateurs : un conteneur mal configuré expose l'hôte et le cluster.",
      },
      {
        name: "Logs cloud",
        definition:
          "CloudTrail, journaux d'audit : tracer chaque appel d'API pour détecter les usages anormaux des identités.",
      },
      {
        name: "Zero Trust",
        definition:
          "Ne faire confiance à aucun réseau par défaut : vérifier chaque identité, chaque appareil, chaque requête.",
      },
    ],
    howItWorksTitle: "Auditer une posture cloud",
    howItWorks: ["INVENTAIRE", "IAM", "CONFIGURATIONS", "CORRECTION", "SURVEILLANCE"],
    example: {
      title: "Bucket S3 exposé",
      steps: ["Scan", "Bucket public", "Données", "Policy corrigée", "Alerte"],
    },
    projectsDetailed: [
      {
        title: "Audit IAM d'un compte",
        flow: "Prowler → Droits excessifs → Least privilege → Revérification",
      },
      {
        title: "Policy as code",
        flow: "Terraform → Sentinel/OPA → CI → Conformité",
      },
    ],
  },

  // ----------------------------------------------------------------- governance
  governance: {
    definition:
      "La gouvernance sécurité transforme la technique en organisation durable : gestion des risques, politiques, conformité (ISO 27001, NIS2), audits. Elle répond à « sommes-nous suffisamment protégés ? » au niveau de l'entreprise.",
    whyLearn:
      "La technique sans gouvernance ne passe pas à l'échelle : qui décide du niveau de risque acceptable, qui vérifie, qui rend compte au régulateur ? Avec NIS2 et DORA, la conformité est devenue une obligation légale — et un débouché majeur pour les profils qui parlent technique et métier.",
    prerequisiteNotes: {
      soc: "Connaître la détection et la réponse pour définir des processus réalistes et mesurables.",
      "secure-coding":
        "Comprendre la sécurité dès le développement pour l'intégrer aux politiques de l'entreprise.",
    },
    conceptDetails: [
      {
        name: "ISO 27001",
        definition:
          "La norme internationale du management de la sécurité : un SMSI avec 93 mesures de contrôle, auditable et certifiable.",
      },
      {
        name: "NIS2 / DORA",
        definition:
          "Les réglementations européennes qui imposent aux entités critiques et financières des obligations concrètes de cybersécurité.",
      },
      {
        name: "Gestion des risques",
        definition:
          "Identifier, évaluer et traiter les risques (EBIOS, ISO 27005) : décider où investir en sécurité de façon rationnelle.",
      },
      {
        name: "Politiques",
        definition:
          "Les règles écrites qui encadrent les usages : charte, politique de mots de passe, classification des données.",
      },
      {
        name: "Audits",
        definition:
          "Vérifier la conformité par des contrôles indépendants : internes ou de certification, ils ferment la boucle.",
      },
    ],
    howItWorksTitle: "Mettre en place un SMSI",
    howItWorks: ["PÉRIMÈTRE", "RISQUES", "POLITIQUES", "CONTRÔLES", "AUDIT"],
    example: {
      title: "Analyse de risques EBIOS",
      steps: ["Actifs", "Menaces", "Scénarios", "Risques", "Traitement"],
    },
    projectsDetailed: [
      {
        title: "Analyse de risques EBIOS",
        flow: "Ateliers → Scénarios → Cotation → Plan de traitement",
      },
      {
        title: "Plan de conformité",
        flow: "Référentiel → Écarts → Feuille de route → Suivi",
      },
    ],
  },
};

import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de la réponse aux incidents : de la préparation
 * aux retours d'expérience, en suivant le cycle de vie standard.
 * 3 niveaux (Aperçu / Pratique / Approfondi) avec divulgation progressive.
 * Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_INCIDENT_RESPONSE: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est la réponse aux incidents et pourquoi elle se prépare avant la crise.",
    blocks: [
      {
        kind: "text",
        text: "La réponse aux incidents est la gestion de crise appliquée à la sécurité des systèmes d'information : quand une attaque ou une compromission est détectée, il faut contenir la menace, l'éradiquer, récupérer les systèmes, puis tirer les leçons. Elle s'appuie sur des playbooks préparés à l'avance — pas sur l'improvisation.",
      },
      {
        kind: "text",
        text: "Le postulat de départ : la question n'est pas « si » mais « quand » un incident surviendra. Une organisation qui a répété ses procédures réagit en heures ; une organisation qui improvise réagit en jours — et chaque jour d'hésitation aggrave l'impact.",
      },
      {
        kind: "diagram",
        title: "Le cycle de vie d'un incident",
        lines: [
          "PRÉPARATION",
          "     │  playbooks, rôles, sauvegardes, exercices",
          "     ▼",
          "DÉTECTION & ANALYSE",
          "     │  triage, qualification, sévérité",
          "     ▼",
          "CONFINEMENT",
          "     │  isoler sans détruire les preuves",
          "     ▼",
          "ÉRADICATION",
          "     │  supprimer la cause (malware, accès, vulnérabilité)",
          "     ▼",
          "RÉCUPÉRATION",
          "     │  restaurer, remettre en production, surveiller",
          "     ▼",
          "RETOUR D'EXPÉRIENCE",
          "        ce qui a marché, ce qui a raté, actions correctives",
        ],
      },
    ],
  },
  {
    id: "cycle-de-vie-nist",
    title: "Le cycle de vie de référence",
    level: 1,
    intro:
      "Le cadre méthodologique que tout le monde utilise.",
    blocks: [
      {
        kind: "text",
        text: "Ce cycle en six phases vient du guide NIST SP 800-61 (Computer Security Incident Handling Guide), la référence internationale du domaine. Il n'impose aucun outil : c'est une grammaire commune qui permet à des équipes différentes de se coordonner pendant une crise.",
      },
      {
        kind: "list",
        items: [
          "Le cycle n'est pas strictement linéaire : on peut revenir de la récupération au confinement si la menace réapparaît.",
          "Chaque phase produit des livrables : la détection produit une qualification, le confinement une cartographie de l'étendue, le retour d'expérience un plan d'actions.",
          "La phase la plus rentable est la préparation : chaque heure investie avant l'incident en fait gagner dix pendant.",
          "Documenter dès la première minute : la chronologie reconstituée après coup est toujours fausse.",
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
      "Les bases techniques et humaines sans lesquelles on subit l'incident au lieu de le gérer.",
    blocks: [
      {
        kind: "fields",
        title: "Socle nécessaire",
        fields: [
          {
            label: "Systèmes et réseaux",
            value:
              "Lire des logs, comprendre TCP/IP, savoir ce qu'est un processus, un service, une connexion réseau. Pendant un incident, on n'a pas le temps d'apprendre ces notions.",
          },
          {
            label: "Logs",
            value:
              "Savoir où sont les journaux (système, applicatifs, réseau) et comment les filtrer par période. Les logs sont la matière première de l'analyse.",
          },
          {
            label: "Sauvegardes",
            value:
              "Comprendre les stratégies de sauvegarde et — surtout — avoir déjà testé une restauration. Une sauvegarde non testée est une supposition.",
          },
          {
            label: "Communication",
            value:
              "Savoir écrire un compte-rendu factuel sous pression et parler à des non-techniques (direction, juridique). La technique ne représente que la moitié du travail.",
          },
        ],
      },
    ],
  },
  {
    id: "preparation",
    title: "Préparation : le travail avant la crise",
    level: 2,
    intro:
      "Tout ce qui doit exister avant le premier incident.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Inventorier",
            detail:
              "Savoir ce qu'on protège : actifs critiques, données sensibles, dépendances. On ne peut pas défendre ce qu'on ne connaît pas.",
          },
          {
            title: "Définir les rôles",
            detail:
              "Qui décide ? Qui analyse ? Qui communique ? Un responsable d'incident (incident commander) désigné à l'avance, avec un suppléant.",
          },
          {
            title: "Écrire les playbooks",
            detail:
              "Des procédures pas-à-pas par scénario (ransomware, phishing, fuite de données) : qui fait quoi, dans quel ordre, avec quels outils et quels contacts.",
          },
          {
            title: "Préparer les accès",
            detail:
              "Comptes d'urgence, accès aux logs, aux sauvegardes, aux consoles d'administration — vérifiés régulièrement, pas découverts le jour J.",
          },
          {
            title: "Vérifier les sauvegardes",
            detail:
              "Restauration testée périodiquement, copies hors ligne pour le ransomware, durées de rétention connues.",
          },
          {
            title: "S'exercer",
            detail:
              "Exercices sur table (tabletop) réguliers : simuler un scénario en réunion et dérouler le playbook à blanc.",
          },
        ],
      },
    ],
  },
  {
    id: "roles-et-responsabilites",
    title: "Rôles et responsabilités",
    level: 2,
    intro:
      "Qui fait quoi quand l'alerte tombe.",
    blocks: [
      {
        kind: "fields",
        title: "Les rôles clés",
        fields: [
          {
            label: "Incident Commander",
            value:
              "Décide et coordonne. Une seule personne à la barre — pas un comité. Il ne fait pas l'analyse technique lui-même : il orchestre.",
          },
          {
            label: "Analystes / Répondants",
            value:
              "Investiguent, confinent, éradiquent. Ils remontent les faits au commander, qui arbitre.",
          },
          {
            label: "Communication",
            value:
              "Prépare et diffuse les messages (interne, clients, autorités). Un seul canal officiel pour éviter les versions contradictoires.",
          },
          {
            label: "Juridique / Direction",
            value:
              "Arbitrent les décisions à impact (couper un service critique, notifier les autorités, payer ou non). Impliqués tôt, pas quand c'est trop tard.",
          },
          {
            label: "Scribe",
            value:
              "Note la chronologie en temps réel : décisions, heures, actions. Ce journal est la base du retour d'expérience — et parfois d'une procédure judiciaire.",
          },
        ],
      },
    ],
  },
  {
    id: "playbooks",
    title: "Écrire un playbook",
    level: 2,
    intro:
      "La structure d'une procédure de réponse par scénario.",
    blocks: [
      {
        kind: "fields",
        title: "Contenu d'un playbook",
        fields: [
          {
            label: "Déclencheurs",
            value:
              "Ce qui active ce playbook : alerte EDR, signalement utilisateur, anomalie SIEM. Critères concrets, pas « quand on suspecte quelque chose ».",
          },
          {
            label: "Premières actions (15 minutes)",
            value:
              "Les gestes réflexes : qualifier, escalader, commencer la chronologie, préserver les preuves. Listés dans l'ordre, avec les commandes ou écrans exacts.",
          },
          {
            label: "Arbre de décision",
            value:
              "Si X alors Y : les embranchements principaux (ex. ransomware confirmé → isoler le segment ; faux positif → clore et documenter).",
          },
          {
            label: "Contacts",
            value:
              "Qui appeler, avec quels numéros — y compris hors heures ouvrées. Vérifiés trimestriellement.",
          },
          {
            label: "Critères de sortie",
            value:
              "Quand considère-t-on l'incident clos ? Menace éradiquée, systèmes restaurés, surveillance renforcée en place.",
          },
        ],
      },
      {
        kind: "text",
        text: "Un playbook se teste : un exercice tabletop révèle les étapes floues, les contacts périmés et les outils manquants. Un playbook non testé est une fiction rassurante.",
      },
    ],
  },
  {
    id: "sources-de-detection",
    title: "Sources de détection",
    level: 2,
    intro:
      "D'où viennent les alertes : savoir les lire et les recouper.",
    blocks: [
      {
        kind: "fields",
        title: "Les canaux",
        fields: [
          {
            label: "EDR / Antivirus",
            value:
              "Les agents sur les postes et serveurs : détection de malware, comportements suspects, isolation à distance. Souvent la première alerte.",
          },
          {
            label: "SIEM / Logs centralisés",
            value:
              "Corrélation d'événements : connexions impossibles, volumes anormaux, séquences suspectes. Puissant mais bruyant — le réglage est un métier.",
          },
          {
            label: "Supervision (NOC/SOC)",
            value:
              "Alertes d'infrastructure détournées : un serveur qui sature ou un service qui tombe peut être un symptôme d'attaque.",
          },
          {
            label: "Signalements humains",
            value:
              "Utilisateurs (phishing, comportement bizarre), partenaires, voire attaquants eux-mêmes (demande de rançon). À prendre au sérieux et à qualifier vite.",
          },
          {
            label: "Veille externe",
            value:
              "Alertes de vulnérabilités, IOC partagés par la communauté, notifications d'autorités. Utiles pour anticiper.",
          },
        ],
      },
    ],
  },
  {
    id: "triage-et-severite",
    title: "Triage et sévérité",
    level: 2,
    intro:
      "Qualifier vite : vrai incident ou faux positif, et quelle gravité.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Collecter les faits bruts",
            detail:
              "Quoi, où, quand, qui est affecté. Pas d'interprétation à ce stade — juste les observables.",
          },
          {
            title: "Vérifier",
            detail:
              "Recouper avec une deuxième source avant de sonner l'alerte générale : un indicateur isolé peut être un faux positif (maintenance, test, erreur de supervision).",
          },
          {
            title: "Qualifier la sévérité",
            detail:
              "Critique (données exfiltrées, ransomware actif, production à l'arrêt), Haute (compromission probable, périmètre limité), Moyenne (tentative bloquée, investigation), Basse (bruit, à surveiller).",
          },
          {
            title: "Escalader selon la sévérité",
            detail:
              "Chaque niveau déclenche un playbook et un niveau d'astreinte. Sous-escalader fait perdre du temps ; sur-escalader épuise les équipes — d'où l'importance de critères écrits.",
          },
          {
            title: "Ouvrir la chronologie",
            detail:
              "Dès la qualification : heure, faits, décisions. Le scribe commence ici.",
          },
        ],
      },
    ],
  },
  {
    id: "premiers-reflexes",
    title: "Premiers réflexes (15 premières minutes)",
    level: 2,
    intro:
      "Ce qu'on fait — et ne fait pas — quand l'incident est confirmé.",
    blocks: [
      {
        kind: "list",
        items: [
          "Ne pas éteindre les machines compromises : la mémoire vive contient des preuves (processus, connexions) qui disparaissent au reboot. Isoler du réseau, pas du courant.",
          "Préserver les logs : figer une copie des journaux pertinents avant qu'ils ne tournent (rotation) ou ne soient altérés.",
          "Élargir prudemment : vérifier si d'autres systèmes montrent les mêmes indicateurs — sans déclencher d'actions massives non validées.",
          "Photographier l'état : captures d'écran, exports — tout ce qui prouve l'état au moment de la découverte.",
          "Ne pas prévenir l'attaquant : éviter les actions visibles depuis le système compromis (changement de mots de passe depuis ce poste, par exemple) avant le confinement.",
          "Escalader : activer le playbook et le canal de crise dédié, pas le canal de discussion habituel.",
        ],
      },
    ],
  },
  {
    id: "commandes-premier-regard",
    title: "Premier regard technique",
    level: 2,
    intro:
      "Des commandes système génériques pour un premier diagnostic — pas des outils forensiques.",
    blocks: [
      {
        kind: "command",
        label: "Lister les connexions réseau actives",
        command: "ss -tlnp",
        why: "Affiche les ports en écoute et les connexions établies avec les processus associés. Un port inconnu en écoute ou une connexion vers une IP inhabituelle est un premier indice.",
        verify: "ss -tlnp | head -20",
      },
      {
        kind: "command",
        label: "Lister les processus",
        command: "ps aux --sort=-%cpu | head -20",
        why: "Repère les processus gourmands ou inconnus. En incident, on cherche l'anormal : nom étrange, chemin inhabituel, utilisateur inattendu.",
      },
      {
        kind: "command",
        label: "Vérifier les dernières connexions",
        command: "last -20",
        why: "Affiche les dernières sessions (utilisateur, origine, heure). Des connexions à des heures improbables ou depuis des IPs inconnues sont des signaux classiques.",
      },
      {
        kind: "command",
        label: "Consulter les journaux système récents",
        command: "journalctl --since '2 hours ago' --priority=warning",
        why: "Filtre les avertissements et erreurs des deux dernières heures. En incident, on resserre la fenêtre autour de l'heure présumée de compromission.",
      },
      {
        kind: "text",
        text: "Ces commandes donnent une première image — elles ne remplacent pas une analyse forensique (images disque, mémoire, timeline), qui exige des outils et une méthodologie dédiés. Leur rôle : qualifier vite, pas conclure.",
      },
    ],
  },
  {
    id: "communication",
    title: "Communication pendant l'incident",
    level: 2,
    intro:
      "Informer sans affoler, ni mentir, ni se taire.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un seul porte-parole, un seul canal officiel : les messages contradictoires détruisent la confiance plus vite que l'incident lui-même.",
          "Dire ce qu'on sait, ce qu'on ne sait pas, et quand sera la prochaine mise à jour. « Nous investiguons, prochain point à 16h » vaut mieux que le silence.",
          "Adapter le message : la direction veut l'impact métier et le délai, les clients veulent savoir si leurs données sont touchées, les équipes veulent les actions.",
          "Ne jamais spéculer par écrit sur l'attribution (« c'est sûrement X ») : ces écrits peuvent devenir publics.",
          "Préparer les modèles à l'avance (playbook) : en crise, on complète des blancs, on ne rédige pas.",
        ],
      },
    ],
  },
  {
    id: "chronologie-documentation",
    title: "Tenir la chronologie",
    level: 2,
    intro:
      "Le journal de bord qui fait la différence entre subir et piloter.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'on y note",
        fields: [
          {
            label: "Heures précises",
            value:
              "Chaque entrée est horodatée (avec le fuseau). « Vers 14h » ne suffit pas quand on reconstruira la séquence d'attaque.",
          },
          {
            label: "Faits, pas interprétations",
            value:
              "« 14:32 : alerte EDR sur SRV-DB-01 (ransomware suspecté) » — pas « 14:32 : on est attaqués ».",
          },
          {
            label: "Décisions et qui les a prises",
            value:
              "« 14:45 : IC décide l'isolement du VLAN comptabilité (validation direction) ». En cas de bilan, on saura pourquoi.",
          },
          {
            label: "Actions et résultats",
            value:
              "Ce qui a été fait et ce que ça a donné — y compris les actions qui n'ont rien donné.",
          },
        ],
      },
    ],
  },
  {
    id: "exercices-tabletop",
    title: "Exercices sur table (tabletop)",
    level: 2,
    intro:
      "Répéter la crise en réunion, sans crise.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir un scénario réaliste",
            detail:
              "Ex. : « un vendredi à 18h, l'EDR signale un ransomware sur le poste de la comptable ». Plus c'est concret, plus l'exercice est utile.",
          },
          {
            title: "Réunir les rôles",
            detail:
              "Incident commander, technique, communication, direction — les vraies personnes, pas leurs remplaçants théoriques.",
          },
          {
            title: "Injecter les événements",
            detail:
              "L'animateur déroule la situation par étapes (« 18h15 : trois autres postes montrent les mêmes symptômes ») et observe les décisions.",
          },
          {
            title: "Dérouler le playbook",
            detail:
              "L'équipe applique sa procédure à blanc : qui appelle qui, quelles décisions, dans quel ordre.",
          },
          {
            title: "Débriefer sans blâmer",
            detail:
              "Noter les frictions : contact injoignable, étape floue, outil manquant. Chaque friction devient une action corrective.",
          },
        ],
      },
      {
        kind: "text",
        text: "Fréquence : au moins deux fois par an, plus après chaque changement majeur (nouvel outil, nouvelle équipe). Un tabletop d'une demi-journée coûte moins cher qu'une heure d'incident mal géré.",
      },
    ],
  },
  {
    id: "kit-outils-minimal",
    title: "Kit d'outils minimal",
    level: 2,
    intro:
      "Ce qu'une petite structure doit avoir sous la main.",
    blocks: [
      {
        kind: "list",
        items: [
          "Playbooks imprimés (ou hors-ligne) : en cas de ransomware, le wiki interne peut être inaccessible.",
          "Accès d'urgence documentés et testés : consoles d'administration, sauvegardes, EDR.",
          "Un canal de communication de crise séparé (messagerie chiffrée, conférence) — pas le canal compromis.",
          "Supports de collecte : disques externes pour les copies de logs, clés USB bootables pour l'analyse.",
          "Contacts : prestataire de réponse aux incidents (si externalisé), assureur cyber, autorités (selon le pays et le secteur).",
          "Modèles de communication prêts : interne, clients, autorités.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "phase-preparation-detail",
    title: "Préparation avancée",
    level: 3,
    intro: "Aller au-delà des bases : la préparation comme programme continu.",
    blocks: [
      {
        kind: "list",
        items: [
          "Cartographie des chemins d'attaque probables : comment un attaquant atteindrait-il les actifs critiques ? Les scénarios de playbooks en découlent.",
          "Segmentation réseau pensée pour le confinement : pouvoir isoler un segment sans paralyser toute l'entreprise se décide à la conception, pas pendant l'incident.",
          "Journalisation calibrée : conserver les logs pertinents assez longtemps (durée alignée sur les délais de détection moyens), avec une horloge synchronisée (NTP) sur tout le parc — sans horodatage fiable, pas de chronologie.",
          "Comptes à privilèges inventoriés et justifiés : en incident, chaque compte admin est un suspect potentiel.",
          "Contrats : prestataire de réponse aux incidents (retainer), assurance cyber, conseil juridique — négociés avant, pas pendant.",
          "Métriques de préparation : délai depuis le dernier tabletop, pourcentage de playbooks testés, âge de la dernière restauration testée.",
        ],
      },
    ],
  },
  {
    id: "detection-analyse",
    title: "Détection et analyse approfondies",
    level: 3,
    intro: "De l'alerte à la compréhension : ce que l'analyse doit établir.",
    blocks: [
      {
        kind: "fields",
        title: "Les questions de l'analyse",
        fields: [
          {
            label: "Vecteur d'entrée",
            value:
              "Par où l'attaquant est-il entré ? Phishing, vulnérabilité, identifiants volés, fournisseur compromis. Sans cette réponse, l'éradication est illusoire.",
          },
          {
            label: "Étendue",
            value:
              "Quels systèmes, quels comptes, quelles données sont touchés ? L'étendue se prouve par les logs, pas par l'intuition — l'erreur classique est de sous-estimer.",
          },
          {
            label: "Chronologie",
            value:
              "Quand chaque étape s'est-elle produite ? La timeline (premier accès, mouvements latéraux, exfiltration) guide le confinement et la communication.",
          },
          {
            label: "Impact",
            value:
              "Données exfiltrées ? Systèmes altérés ? Persistance installée ? L'impact détermine la sévérité et les obligations (notifications).",
          },
          {
            label: "Attribution (avec prudence)",
            value:
              "Qui est derrière ? Utile pour anticiper la suite (un rançongiciel opportuniste n'agit pas comme une APT), mais l'attribution hâtive est dangereuse — elle biaise l'analyse.",
          },
        ],
      },
    ],
  },
  {
    id: "confinement-strategies",
    title: "Stratégies de confinement",
    level: 3,
    intro: "Isoler la menace sans détruire les preuves ni paralyser l'entreprise.",
    blocks: [
      {
        kind: "fields",
        title: "Les options, par ordre de progressivité",
        fields: [
          {
            label: "Isolation réseau ciblée",
            value:
              "Couper le système du réseau (ou le mettre en quarantaine VLAN) tout en le laissant allumé : stoppe la propagation et préserve la mémoire vive pour l'analyse.",
          },
          {
            label: "Blocage des IOC",
            value:
              "Bloquer IPs, domaines et hash connus aux pare-feu, proxy et EDR — sur tout le parc, pas seulement les systèmes touchés.",
          },
          {
            label: "Désactivation de comptes",
            value:
              "Comptes compromis ou suspects désactivés, sessions révoquées. À coordonner : désactiver le compte admin utilisé par l'attaquant peut aussi bloquer les équipes.",
          },
          {
            label: "Segmentation d'urgence",
            value:
              "Isoler un segment entier si la propagation est active. Décision lourde — elle se prépare (règles pré-écrites) et se valide avec la direction.",
          },
          {
            label: "Coupure totale (dernier recours)",
            value:
              "Éteindre ou déconnecter massivement. Coûteux et destructeur de preuves volatiles : uniquement face à une propagation incontrôlée.",
          },
        ],
      },
      {
        kind: "text",
        text: "Principe : confiner au plus juste, pas au plus large. Chaque action de confinement est notée dans la chronologie avec son heure et son motif — certaines devront être justifiées après coup.",
      },
    ],
  },
  {
    id: "eradication",
    title: "Éradication",
    level: 3,
    intro: "Supprimer la cause, pas seulement les symptômes.",
    blocks: [
      {
        kind: "list",
        items: [
          "L'éradication vise la cause racine : malware et persistance supprimés, vulnérabilité exploitée corrigée, identifiants compromis réinitialisés, portes dérobées cherchées activement.",
          "Ne pas confondre avec le confinement : un système isolé mais non nettoyé réinfecte tout dès sa reconnexion.",
          "Reconstruction vs nettoyage : pour les systèmes critiques, reconstruire depuis une source saine (image, sauvegarde antérieure à la compromission) est plus sûr que « nettoyer » un système compromis — on ne prouve jamais qu'un système est sain, on prouve qu'il est compromis.",
          "Changer les secrets : mots de passe, clés API, certificats potentiellement exposés — en supposant le pire sur ce que l'attaquant a vu.",
          "Valider : rescanner, revérifier les IOC, surveiller — l'éradication se prouve, elle ne se déclare pas.",
        ],
      },
    ],
  },
  {
    id: "recuperation",
    title: "Récupération",
    level: 3,
    intro: "Revenir en production sans réintroduire la menace.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Restaurer depuis des sources saines",
            detail:
              "Sauvegardes antérieures à la compromission (vérifiées), images reconstruites. Dater précisément le point de restauration par rapport à la chronologie d'attaque.",
          },
          {
            title: "Réintégrer progressivement",
            detail:
              "Remettre en service par vagues, en commençant par le moins exposé. Chaque vague est surveillée avant de passer à la suivante.",
          },
          {
            title: "Renforcer la surveillance",
            detail:
              "Période de surveillance renforcée post-incident : l'attaquant revient souvent par le même chemin s'il n'a pas été fermé.",
          },
          {
            title: "Valider métier",
            detail:
              "Les applications fonctionnent-elles ? Les données sont-elles intègres ? La validation est métier, pas seulement technique.",
          },
          {
            title: "Clore formellement",
            detail:
              "Critères de sortie du playbook vérifiés, chronologie finalisée, communication de clôture. Un incident ne se termine pas quand « ça remarche ».",
          },
        ],
      },
    ],
  },
  {
    id: "retour-experience",
    title: "Retour d'expérience (post-mortem)",
    level: 3,
    intro: "Transformer l'incident en progrès — sans chasse aux sorcières.",
    blocks: [
      {
        kind: "fields",
        title: "Le déroulé",
        fields: [
          {
            label: "Timing",
            value:
              "Dans les jours qui suivent la clôture, tant que les souvenirs sont frais. Pas pendant la crise (on gère), pas trois mois après (on a oublié).",
          },
          {
            label: "Participants",
            value:
              "Tous les rôles impliqués, y compris direction et communication. L'absence d'un rôle biaise les conclusions.",
          },
          {
            label: "Méthode blameless",
            value:
              "On analyse le système et les processus, pas les personnes. « Pourquoi la procédure a-t-elle permis cette erreur ? » — pas « qui a fait l'erreur ? ». Sans cela, personne ne parlera franchement la prochaine fois.",
          },
          {
            label: "Livrables",
            value:
              "Chronologie définitive, causes racines, ce qui a bien fonctionné, ce qui a échoué, et surtout : un plan d'actions avec responsables et délais.",
          },
          {
            label: "Suivi",
            value:
              "Le plan d'actions est suivi comme un projet. Un retour d'expérience sans actions implémentées est un rituel vide — et le prochain incident ressemblera au précédent.",
          },
        ],
      },
    ],
  },
  {
    id: "forensique-bases",
    title: "Forensique : les bases",
    level: 3,
    intro: "Collecter et analyser les preuves sans les contaminer.",
    blocks: [
      {
        kind: "list",
        items: [
          "Principe cardinal : ne jamais analyser l'original — travailler sur des copies (images disque bit à bit, dumps mémoire). Toute analyse altère ce qu'elle touche.",
          "Ordre de volatilité : mémoire vive, connexions réseau, processus, puis disque — on collecte du plus éphémère au plus persistant.",
          "Documenter chaque manipulation : qui, quand, quoi, avec quel outil. Une preuve non traçable est une preuve inutilisable (y compris judiciairement).",
          "La forensique a deux buts : comprendre l'attaque (technique) et établir des faits solides (juridique). Le second exige une rigueur que le premier pardonne.",
          "C'est une discipline à part entière : en cas de doute, faire appel à des spécialistes plutôt que de « bidouiller » — une mauvaise manipulation détruit des preuves irrémédiablement.",
        ],
      },
    ],
  },
  {
    id: "chaine-de-conservation",
    title: "Chaîne de conservation",
    level: 3,
    intro: "Prouver que les preuves n'ont pas été altérées.",
    blocks: [
      {
        kind: "text",
        text: "La chaîne de conservation (chain of custody) documente chaque transfert et chaque accès à une preuve : qui l'a collectée, quand, où elle est stockée, qui y a accédé. En pratique : hasher les images collectées (l'empreinte prouve l'intégrité), stocker les originaux en lecture seule, journaliser les accès.",
      },
      {
        kind: "list",
        items: [
          "À mettre en place dès qu'une action judiciaire est envisageable — pas après.",
          "Même sans visée judiciaire, la rigueur profite à l'analyse : on sait toujours sur quoi on travaille.",
          "Les outils forensiques sérieux journalisent leurs actions : préférer ceux qui le font.",
        ],
      },
    ],
  },
  {
    id: "scenario-ransomware",
    title: "Scénario : ransomware",
    level: 3,
    intro: "Le scénario le plus redouté, déroulé pas à pas.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Détecter et qualifier",
            detail:
              "Alerte EDR ou fichiers chiffrés signalés : confirmer qu'il s'agit bien d'un ransomware (note de rançon, extensions modifiées) et identifier la variante si possible.",
          },
          {
            title: "Isoler immédiatement",
            detail:
              "Déconnecter les systèmes touchés du réseau — le chiffrement se propage vite. Ne pas éteindre (preuves en mémoire), sauf propagation incontrôlée.",
          },
          {
            title: "Stopper la propagation",
            detail:
              "Identifier le patient zéro et le vecteur, bloquer les IOC, isoler les segments exposés.",
          },
          {
            title: "Évaluer les sauvegardes",
            detail:
              "Sont-elles intactes ? Antérieures à l'infection ? C'est cette réponse — préparée à l'avance — qui détermine toute la suite.",
          },
          {
            title: "Décider : payer ou restaurer",
            detail:
              "Décision direction + juridique + assurance. Payer ne garantit ni la clé, ni l'absence de double extorsion, et finance l'écosystème criminel.",
          },
          {
            title: "Éradiquer et reconstruire",
            detail:
              "Supprimer le malware et ses persistances, reconstruire depuis des sources saines, réinitialiser les identifiants.",
          },
          {
            title: "Surveiller et débriefer",
            detail:
              "Surveillance renforcée (réinfection fréquente), puis retour d'expérience complet.",
          },
        ],
      },
    ],
  },
  {
    id: "scenario-phishing",
    title: "Scénario : phishing avec compromission de compte",
    level: 3,
    intro: "Le vecteur d'entrée le plus courant.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Qualifier",
            detail:
              "Un utilisateur a cliqué et saisi ses identifiants : confirmer la compromission (connexions anormales sur le compte).",
          },
          {
            title: "Couper l'accès",
            detail:
              "Réinitialiser le mot de passe, révoquer les sessions actives, vérifier les règles de transfert/delegation ajoutées par l'attaquant (classique sur les messageries).",
          },
          {
            title: "Évaluer l'étendue",
            detail:
              "Qu'a vu le compte ? Emails lus, fichiers accédés, messages envoyés en son nom (phishing interne). Les logs de la messagerie et des accès sont clés.",
          },
          {
            title: "Chercher la propagation",
            detail:
              "Le compte a-t-il servi à viser d'autres utilisateurs ? Analyser les messages envoyés depuis le compte compromis.",
          },
          {
            title: "Alerter et former",
            detail:
              "Prévenir les destinataires des messages malveillants, rappeler les réflexes. Sans blâmer la victime — la prochaine pourrait être n'importe qui.",
          },
        ],
      },
    ],
  },
  {
    id: "scenario-fuite-donnees",
    title: "Scénario : fuite de données",
    level: 3,
    intro: "Quand des données sensibles ont quitté l'organisation.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Qualifier la fuite",
            detail:
              "Quelles données, quel volume, quelles personnes concernées ? La réponse conditionne les obligations légales.",
          },
          {
            title: "Stopper l'hémorragie",
            detail:
              "Fermer le vecteur (accès abusif, bucket public, injection) avant tout — une fuite active prime sur l'analyse.",
          },
          {
            title: "Évaluer juridiquement",
            detail:
              "Avec le juridique / DPO : obligations de notification (autorités, personnes concernées), délais, contenu. Se prépare à l'avance, s'exécute sous pression.",
          },
          {
            title: "Communiquer",
            detail:
              "Notification factuelle aux personnes concernées : ce qui a fuité, ce que ça implique pour elles, ce que l'organisation fait. Ni minimisation ni dramatisation.",
          },
          {
            title: "Traiter la cause",
            detail:
              "Corriger la vulnérabilité ou le processus défaillant, auditer les accès similaires ailleurs.",
          },
        ],
      },
    ],
  },
  {
    id: "scenario-compromission-fournisseur",
    title: "Scénario : compromission via un tiers",
    level: 3,
    intro: "Quand l'attaque vient d'un fournisseur ou partenaire.",
    blocks: [
      {
        kind: "list",
        items: [
          "Particularité : le périmètre de confiance est flou — le tiers a des accès légitimes qu'il faut révoquer sans casser les opérations.",
          "Actions : suspendre les accès du tiers, auditer ce qu'il a touché (logs d'accès fournisseur), vérifier l'intégrité de ce qu'il a livré (mises à jour, fichiers).",
          "Contractuel : le contrat devrait prévoir notification d'incident, droit d'audit et niveaux de service — à vérifier avant d'en avoir besoin.",
          "Leçon structurelle : cartographier les accès tiers et appliquer le moindre privilège en temps normal réduit drastiquement ce scénario.",
        ],
      },
    ],
  },
  {
    id: "communication-de-crise",
    title: "Communication de crise avancée",
    level: 3,
    intro: "Gérer l'information quand l'incident devient public.",
    blocks: [
      {
        kind: "list",
        items: [
          "Préparer trois niveaux de messages à l'avance : interne, clients/partenaires, public — chacun avec son niveau de détail et son ton.",
          "Ne jamais mentir ni minimiser : une minimisation démentie par les faits détruit la crédibilité pour des années. Dire « nous ne savons pas encore » est acceptable.",
          "Désigner un unique porte-parole formé ; briefer avant chaque prise de parole.",
          "Surveiller ce qui se dit (presse, réseaux) pour corriger les erreurs factuelles — sans polémiquer.",
          "Après la crise : communiquer aussi sur les leçons et les actions correctives. C'est ce qui restaure la confiance.",
        ],
      },
    ],
  },
  {
    id: "aspects-juridiques",
    title: "Aspects juridiques et conformité",
    level: 3,
    intro: "Ce que le droit attend pendant et après un incident.",
    blocks: [
      {
        kind: "list",
        items: [
          "Selon le pays et le secteur, des obligations de notification existent (autorités de protection des données, régulateurs sectoriels) avec des délais parfois courts — les connaître à l'avance, pas le jour J.",
          "Le juridique doit être impliqué tôt : certaines décisions techniques (préserver vs effacer, communiquer) ont des implications légales.",
          "Conserver les preuves selon la chaîne de conservation dès qu'une procédure est envisageable.",
          "Les contrats (clients, fournisseurs, assurance) contiennent souvent des clauses d'incident : les relire pendant la crise fait perdre un temps précieux — les synthétiser dans le playbook.",
          "Documenter les décisions : en cas de contentieux ultérieur, la chronologie et les motifs des décisions sont la meilleure défense.",
        ],
      },
    ],
  },
  {
    id: "metriques",
    title: "Métriques : MTTD, MTTR",
    level: 3,
    intro: "Mesurer la performance de la réponse, pas pour se flageller mais pour progresser.",
    blocks: [
      {
        kind: "fields",
        title: "Les indicateurs standards",
        fields: [
          {
            label: "MTTD (Mean Time To Detect)",
            value:
              "Délai moyen entre le début de l'incident et sa détection. Le réduire = meilleure détection (logs, SIEM, EDR).",
          },
          {
            label: "MTTR (Mean Time To Respond/Recover)",
            value:
              "Délai moyen entre la détection et le retour à la normale. Le réduire = meilleurs playbooks et exercices.",
          },
          {
            label: "Taux de faux positifs",
            value:
              "Proportion d'alertes qui ne sont pas des incidents. Trop élevé = équipes épuisées et vraies alertes manquées.",
          },
          {
            label: "Couverture des playbooks",
            value:
              "Part des scénarios probables couverts par un playbook testé. Un angle mort documenté vaut mieux qu'un angle mort ignoré.",
          },
        ],
      },
      {
        kind: "text",
        text: "Ces métriques se suivent dans le temps et se comparent à soi-même, pas à des benchmarks externes douteux. Une tendance à la baisse du MTTD/MTTR prouve que le programme progresse.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les fautes qui transforment un incident gérable en crise.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Éteindre les machines compromises",
            value:
              "Problem : la mémoire vive (processus, connexions, clés) est perdue. Why : réflexe « éteindre le problème ». Better : isoler du réseau, garder allumé.",
          },
          {
            label: "Négliger la chronologie",
            value:
              "Problem : impossible de reconstituer la séquence, décisions injustifiables après coup. Why : « on n'a pas le temps ». Better : un scribe dédié dès la première minute.",
          },
          {
            label: "Confondre confinement et éradication",
            value:
              "Problem : on reconnecte un système isolé mais non nettoyé — réinfection. Why : pression du retour en production. Better : valider l'éradication avant toute reconnexion.",
          },
          {
            label: "Sous-estimer l'étendue",
            value:
              "Problem : l'attaquant est encore présent ailleurs. Why : on s'arrête au premier système trouvé. Better : chercher activement les IOC sur tout le parc.",
          },
          {
            label: "Communiquer trop tard ou trop peu",
            value:
              "Problem : rumeurs, panique, perte de confiance. Why : vouloir « tout comprendre avant de parler ». Better : communiquer tôt sur les faits connus et le prochain point.",
          },
          {
            label: "Blâmer pendant le post-mortem",
            value:
              "Problem : plus personne ne parle franchement, les vraies causes restent cachées. Why : réflexe hiérarchique. Better : méthode blameless, focus processus.",
          },
          {
            label: "Ne pas tester les sauvegardes",
            value:
              "Problem : le jour du ransomware, la sauvegarde est corrompue ou trop ancienne. Why : « on fait des sauvegardes, donc ça va ». Better : restaurations testées régulièrement.",
          },
          {
            label: "Changer les mots de passe depuis le poste compromis",
            value:
              "Problem : l'attaquant (keylogger) récupère les nouveaux. Why : précipitation. Better : depuis un système sain, après confinement.",
          },
        ],
      },
    ],
  },
  {
    id: "ioc-threat-intelligence",
    title: "IOC et threat intelligence",
    level: 3,
    intro: "Partager ce qu'on sait de l'attaquant pour détecter plus vite la prochaine fois.",
    blocks: [
      {
        kind: "fields",
        title: "Les indicateurs",
        fields: [
          {
            label: "IOC (Indicators of Compromise)",
            value:
              "Les traces techniques : hash de fichiers, IPs, domaines, URLs, adresses email. Ce qu'on bloque et ce qu'on cherche ailleurs.",
          },
          {
            label: "IOA / TTP",
            value:
              "Les comportements : techniques et procédures de l'attaquant (persistance via tâche planifiée, exfiltration via DNS…). Plus durables que les IOC, qui changent vite.",
          },
          {
            label: "Partage",
            value:
              "Plateformes comme MISP pour structurer et partager les IOC ; flux de threat intelligence pour enrichir la détection. Partager aide la communauté — en retirant les données sensibles.",
          },
          {
            label: "Durée de vie",
            value:
              "Un IOC a une date de péremption : une IP d'attaque sera réattribuée. Nettoyer les IOC obsolètes des blocages, sinon on bloque des innocents.",
          },
        ],
      },
      {
        kind: "command",
        label: "Chercher un IOC dans les logs",
        command: "grep -r '203.0.113.45' /var/log/ 2>/dev/null | head -20",
        why: "Recherche brute d'une IP suspecte dans les journaux : la méthode la plus directe pour vérifier si d'autres systèmes ont communiqué avec l'attaquant. (Remplacer par l'IOC réel de l'incident.)",
      },
    ],
  },
  {
    id: "soar-automatisation",
    title: "SOAR et automatisation",
    level: 3,
    intro: "Automatiser les gestes répétitifs, garder l'humain pour les décisions.",
    blocks: [
      {
        kind: "list",
        items: [
          "SOAR (Security Orchestration, Automation and Response) : des playbooks exécutables — enrichir une alerte, isoler un poste, bloquer un IOC, ouvrir un ticket.",
          "Ce qu'on automatise : la collecte (récupérer logs et contexte), les actions réversibles et sûres (isolation EDR, blocage), les notifications.",
          "Ce qu'on n'automatise pas : les décisions irréversibles ou à fort impact (couper un segment, notifier les autorités) — validation humaine obligatoire.",
          "Commencer petit : un playbook semi-automatique (l'humain clique pour valider chaque étape) avant le tout-automatique.",
          "L'automatisation ne remplace pas les playbooks écrits : elle les exécute. Un playbook flou automatisé produit des dégâts rapides.",
        ],
      },
    ],
  },
  {
    id: "war-room",
    title: "War room : l'organisation logistique",
    level: 3,
    intro: "Le dispositif matériel et humain pendant la crise.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un canal dédié (et de secours si le principal est compromis), une conférence permanente, un tableau de suivi partagé.",
          "Rythme : points réguliers courts (15-30 min) — faits nouveaux, décisions, actions. Pas de réunions fleuves.",
          "Rôles visibles : qui est incident commander, qui est scribe — affichés en tête du canal pour les arrivants.",
          "Gestion de la fatigue : rotation des équipes sur les incidents longs. Une équipe épuisée prend de mauvaises décisions.",
          "Séparer le « bruit » du signal : un canal ops pour l'analyse, un canal commandement pour les décisions — éviter que les décisions se perdent dans le flux technique.",
        ],
      },
    ],
  },
  {
    id: "continuite-activite",
    title: "Continuité d'activité (PCA/PRA)",
    level: 3,
    intro: "Quand l'incident dure : faire tourner l'entreprise en mode dégradé.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le PRA (reprise) restaure les systèmes ; le PCA (continuité) fait fonctionner l'activité pendant l'incident — les deux se préparent avant.",
          "Identifier les processus vitaux et leurs dépendances : que faut-il absolument maintenir, même manuellement ?",
          "Modes dégradés définis à l'avance : procédures papier, systèmes de secours, priorités de restauration (quoi remettre en route en premier).",
          "Tester : un PRA non testé est une hypothèse. Les tests révèlent les dépendances oubliées (ce service « secondaire » dont tout dépend).",
          "La réponse aux incidents et la continuité se rejoignent : un ransomware long, c'est un problème de continuité autant que de sécurité.",
        ],
      },
    ],
  },
  {
    id: "parties-prenantes",
    title: "Parties prenantes externes",
    level: 3,
    intro: "Assureur, prestataires, autorités : les mobiliser sans perdre de temps.",
    blocks: [
      {
        kind: "list",
        items: [
          "Assurance cyber : déclarer tôt selon le contrat — l'assureur peut mandater des experts et couvrir des coûts. Connaître les délais et exclusions avant.",
          "Prestataire de réponse aux incidents (retainer) : un numéro à appeler, un contrat déjà signé, des intervenants qui connaissent votre environnement.",
          "Autorités : selon le pays/secteur, dépôt de plainte et notifications réglementaires — le juridique pilote, avec les faits établis par l'analyse.",
          "Fournisseurs : si un tiers est impliqué (ou impacté), le contacter via le canal prévu au contrat — pas via le commercial habituel.",
          "Coordonner les intervenants externes : ils rejoignent la war room avec un rôle défini, pas en électrons libres.",
        ],
      },
    ],
  },
  {
    id: "threat-hunting",
    title: "Threat hunting : chasse proactive",
    level: 3,
    intro: "Chercher l'attaquant avant l'alerte.",
    blocks: [
      {
        kind: "text",
        text: "Le threat hunting inverse la logique : au lieu d'attendre une alerte, on formule des hypothèses (« un attaquant persistant utiliserait les tâches planifiées ») et on fouille les données pour les confirmer ou les infirmer. C'est le prolongement naturel d'une équipe de réponse mature.",
      },
      {
        kind: "list",
        items: [
          "Prérequis : logs centralisés riches et requêtables — sans données, pas de chasse.",
          "Méthode : hypothèse → données → investigation → (nouvelle détection ou hypothèse écartée). Chaque chasse documentée enrichit la détection.",
          "Les résultats alimentent les règles SIEM : une chasse fructueuse devient une détection permanente.",
          "Cadence : régulier mais ciblé — mieux vaut une chasse par mois bien menée que du « hunting » permanent superficiel.",
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro: "Les habitudes des équipes qui gèrent bien les incidents.",
    blocks: [
      {
        kind: "list",
        items: [
          "Préparer en temps de paix : playbooks écrits, testés, à jour ; contacts vérifiés ; sauvegardes restaurées pour de vrai.",
          "Un incident commander unique, un scribe dédié, un canal de crise séparé.",
          "Chronologie dès la première minute, faits horodatés, décisions tracées.",
          "Préserver les preuves : isoler sans éteindre, copier avant d'analyser.",
          "Confiner au plus juste, éradiquer à la racine, valider avant de reconnecter.",
          "Communiquer tôt, factuellement, par un seul canal ; ne jamais spéculer par écrit.",
          "Post-mortem blameless systématique, plan d'actions suivi.",
          "Mesurer MTTD/MTTR et la couverture des playbooks ; progresser en continu.",
          "Impliquer juridique et direction tôt, pas en dernier recours.",
          "Revoir les playbooks après chaque incident et chaque changement majeur.",
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 3,
    intro:
      "Trois projets pour passer de la théorie à une vraie capacité de réponse.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Playbook ransomware",
        fields: [
          {
            label: "Objectif",
            value:
              "Rédiger un playbook complet pour un ransomware sur un poste : déclencheurs, 15 premières minutes, arbre de décision, contacts, critères de sortie.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Cycle de vie, rôles, confinement, communication.",
          },
          {
            label: "Réussi quand",
            value:
              "Un collègue qui ne connaît pas le sujet peut exécuter les 15 premières minutes en suivant le document.",
          },
          {
            label: "Difficulté",
            value: "Débutant — une journée.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — Tabletop animé",
        fields: [
          {
            label: "Objectif",
            value:
              "Préparer et animer un exercice sur table : scénario détaillé, injections planifiées, grille d'observation, débrief structuré.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Scénarisation, animation, post-mortem blameless, plan d'actions.",
          },
          {
            label: "Réussi quand",
            value:
              "L'exercice révèle au moins trois frictions réelles (contact périmé, étape floue, outil manquant) converties en actions correctives.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — une semaine de préparation.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Simulation technique en labo",
        fields: [
          {
            label: "Objectif",
            value:
              "En environnement isolé : simuler une compromission (compte, persistance simple), la détecter via les logs, dérouler confinement et éradication, produire chronologie et rapport.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Analyse de logs, triage, confinement, chronologie, rapport.",
          },
          {
            label: "Réussi quand",
            value:
              "Le rapport final établit vecteur, étendue et chronologie avec preuves, et propose des actions correctives concrètes.",
          },
          {
            label: "Difficulté",
            value: "Avancé — deux semaines.",
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
      "Les références à privilégier — la documentation officielle d'abord.",
    blocks: [
      {
        kind: "list",
        items: [
          "`https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf` — le guide NIST SP 800-61 Rev. 2 : LA référence méthodologique, gratuite et complète.",
          "`https://www.cisa.gov/` — la CISA (agence américaine) : guides, alertes et playbooks publics de réponse aux incidents.",
          "`https://www.enisa.europa.eu/` — l'ENISA (agence européenne) : rapports et guides, perspective européenne et réglementaire.",
        ],
      },
      {
        kind: "text",
        text: "Conseil : lire le NIST SP 800-61 en entier une fois — c'est dense mais c'est le socle commun du métier. Ensuite, les retours d'expérience publics d'incidents réels (rapports post-incident publiés par des entreprises) sont la meilleure école.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "La réponse aux incidents maîtrisée, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "`siem` : améliorer la détection — une bonne réponse commence par une bonne détection.",
          "`forensics` / `pentesting` : approfondir l'analyse technique et comprendre l'attaquant.",
          "`cryptography` : sauvegardes chiffrées, communications de crise confidentielles, intégrité des preuves.",
          "`cybersecurity` : structurer un programme de sécurité complet autour de la réponse.",
          "`linux` et `networking` : durcir les fondamentaux techniques qui servent en incident.",
        ],
      },
    ],
  },
];

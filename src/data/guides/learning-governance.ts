import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de la gouvernance et conformité sécurité : gestion
 * des risques, ISO 27001, NIST CSF, NIS2, DORA, RGPD, audits, politiques.
 * Skill théorique et organisationnelle : pas de commandes terminal ici —
 * concepts, référentiels réels, processus, rôles. Ton : documentation
 * technique premium, concret, sans marketing. 3 niveaux d'information
 * (Aperçu / Pratique / Approfondi) avec divulgation progressive. Tous les
 * textes supportent le code inline entre backticks.
 */
export const LEARNING_GOVERNANCE: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est la gouvernance sécurité : transformer la technique en organisation durable.",
    blocks: [
      {
        kind: "text",
        text: "La gouvernance de la sécurité de l'information, c'est l'ensemble des processus par lesquels une organisation décide de son niveau de sécurité, l'organise, le vérifie et en rend compte : gestion des risques, politiques écrites, conformité réglementaire, audits. Là où la technique répond à « comment on se protège », la gouvernance répond à « sommes-nous suffisamment protégés, et qui en décide ? ».",
      },
      {
        kind: "fields",
        title: "La gouvernance en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Décider rationnellement où investir en sécurité, l'écrire, le faire appliquer, puis le vérifier — en boucle.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "La technique seule ne passe pas à l'échelle : sans arbitrage, on sécurise au hasard (trop ici, rien là) ; sans écrit, rien n'est vérifiable ; sans conformité, l'amende ou l'interdiction d'exercer frappe — NIS2 et DORA l'ont rendu obligatoire pour des pans entiers de l'économie.",
          },
          {
            label: "Quand s'en préoccuper",
            value:
              "Dès qu'une organisation dépasse quelques personnes ou traite des données sensibles : même une petite structure a besoin d'un minimum écrit (qui décide, que protège-t-on, que fait-on en cas d'incident).",
          },
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni de la paperasse pour la paperasse, ni du juridique déconnecté : une bonne gouvernance part des risques réels et produit des décisions, pas des classeurs.",
          },
        ],
      },
      {
        kind: "text",
        text: "Point essentiel : cette page est théorique et organisationnelle — aucun outil à installer, aucune commande. Vous apprendrez les référentiels réels (ISO 27001, NIST, réglementations européennes), les processus (gestion des risques, audits) et les rôles. C'est le chaînon entre la technique (SOC, pentest, forensique) et la direction.",
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : la roue PDCA",
    level: 1,
    intro:
      "La seule idée à retenir : la sécurité gouvernée est un cycle, pas un projet.",
    blocks: [
      {
        kind: "diagram",
        title: "PDCA appliqué à la sécurité (roue de Deming)",
        lines: [
          "         ┌──────── PLAN ────────┐",
          "         │ Analyser les risques │",
          "         │ Choisir les mesures  │",
          "         │ Écrire les politiques│",
          "         └────────┬────────────┘",
          "                  ▼",
          "  ┌─────── ACT ───────┐   ┌─────── DO ────────┐",
          "  │ Corriger, ajuster │   │ Déployer, former │",
          "  │ Revoir la direction│  │ Appliquer au jour │",
          "  └───────┬───────────┘   │ le jour           │",
          "          │               └───────┬───────────┘",
          "          │                       ▼",
          "          │               ┌────── CHECK ──────┐",
          "          └───────────────│ Auditer, mesurer  │",
          "                        │ les écarts        │",
          "                        └───────────────────┘",
          "",
          "ISO 27001 est construite exactement sur ce cycle.",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : on planifie à partir des risques, on déploie, on vérifie par des audits et des indicateurs, on corrige — puis on recommence, car les risques et l'organisation changent. Pourquoi ça existe : un « projet sécurité » qui se termine meurt ; seules les organisations qui revoient en continu restent protégées. Quand l'appliquer : à chaque décision structurante (nouveau système, nouveau règlement, incident majeur).",
      },
      {
        kind: "fields",
        title: "Les trois questions du gouvernant",
        fields: [
          {
            label: "Quels sont nos risques ?",
            value:
              "Identifier ce qu'on protège, contre quoi, avec quel impact : sans analyse de risques, tout investissement sécurité est arbitraire.",
          },
          {
            label: "Qui décide et qui fait ?",
            value:
              "Rôles et responsabilités écrits : la sécurité sans responsable nommé n'a pas lieu.",
          },
          {
            label: "Comment on vérifie ?",
            value:
              "Audits, indicateurs, revues de direction : ce qui n'est pas mesuré n'est pas piloté.",
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
          "Comprendre les bases de la cybersécurité : triade CIA, défense en profondeur, hygiène (Learning Page Cybersécurité).",
          "Avoir une idée du fonctionnement d'une organisation : qui décide, qui exécute, ce qu'est un processus.",
          "Aucune compétence juridique préalable requise : les réglementations sont expliquées par leurs obligations concrètes.",
          "Savoir lire un texte normatif sans paniquer : les normes sont des check-lists exigeantes, pas de la littérature.",
        ],
      },
      {
        kind: "text",
        text: "Si la technique vous est étrangère, commencez par les Learning Pages Cybersécurité et SOC : la gouvernance crédible parle technique avec les équipes, elle ne la survole pas.",
      },
    ],
  },
  {
    id: "vocabulaire",
    title: "Le vocabulaire de la gouvernance",
    level: 2,
    intro:
      "Les dix mots sans lesquels on ne comprend ni une norme ni un audit.",
    blocks: [
      {
        kind: "fields",
        title: "Glossaire minimal",
        fields: [
          {
            label: "Actif",
            value:
              "Tout ce qui a de la valeur à protéger : données, systèmes, personnes, réputation. La gouvernance commence par l'inventaire des actifs.",
          },
          {
            label: "Menace / Vulnérabilité",
            value:
              "La menace est ce qui peut nuire (rançongiciel, erreur humaine) ; la vulnérabilité est la faille qui le permet (logiciel non patché). Le risque naît de leur rencontre.",
          },
          {
            label: "Risque",
            value:
              "La combinaison d'une menace, d'une vulnérabilité et d'un impact : « probabilité × gravité ». C'est l'unité de décision de la gouvernance.",
          },
          {
            label: "SMSI",
            value:
              "Système de Management de la Sécurité de l'Information : le cadre organisationnel complet (politiques, processus, contrôles) — le cœur d'ISO 27001.",
          },
          {
            label: "Contrôle / Mesure",
            value:
              "Une action de protection : technique (pare-feu), organisationnelle (politique), physique (badge) ou humaine (formation).",
          },
          {
            label: "Conformité",
            value:
              "Le respect d'exigences externes : lois, règlements, contrats, normes. On est conforme ou on ne l'est pas — c'est binaire.",
          },
          {
            label: "Audit",
            value:
              "La vérification indépendante et documentée de la conformité et de l'efficacité : il constate, il ne conseille pas (en principe).",
          },
          {
            label: "RSSI",
            value:
              "Responsable de la Sécurité des Systèmes d'Information : le rôle qui porte la gouvernance sécurité dans l'organisation (CISO en anglais).",
          },
          {
            label: "PSSI",
            value:
              "Politique de Sécurité des Systèmes d'Information : le document cadre qui exprime les choix de sécurité de la direction.",
          },
          {
            label: "Plan de traitement des risques",
            value:
              "Pour chaque risque : l'accepter, le réduire, le transférer (assurance) ou l'éviter — décidé, écrit, suivi.",
          },
        ],
      },
    ],
  },
  {
    id: "iso-27001-apercu",
    title: "ISO 27001 : l'aperçu",
    level: 2,
    intro:
      "La norme internationale du management de la sécurité : ce qu'elle exige, ce qu'elle ne fait pas.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : ISO/IEC 27001 définit les exigences d'un SMSI — un système de management qui identifie les risques, applique des contrôles adaptés et s'améliore en continu — et permet une certification par audit indépendant. Pourquoi elle domine : c'est la référence mondiale reconnue par les clients, les partenaires et les régulateurs pour dire « notre sécurité est gérée sérieusement ».",
      },
      {
        kind: "fields",
        title: "Ce qu'il faut en retenir à ce stade",
        fields: [
          {
            label: "Exigences, pas solutions",
            value:
              "La norme dit QUOI faire (analyser les risques, définir des politiques, auditer) pas COMMENT techniquement : elle s'adapte à toute organisation.",
          },
          {
            label: "Annexe A : 93 contrôles",
            value:
              "Le catalogue de mesures (organisationnelles, humaines, physiques, technologiques) parmi lesquelles choisir selon les risques — détaillé au niveau 3.",
          },
          {
            label: "Certifiable",
            value:
              "Un organisme accrédité audite le SMSI et délivre un certificat (3 ans, avec audits de suivi) : c'est un argument commercial et contractuel fort.",
          },
          {
            label: "Ce n'est pas",
            value:
              "Ni une garantie d'invulnérabilité, ni un produit à acheter : c'est une discipline de management. Un SMSI certifié mal vécu ne protège de rien.",
          },
        ],
      },
    ],
  },
  {
    id: "nist-csf-apercu",
    title: "NIST Cybersecurity Framework : l'aperçu",
    level: 2,
    intro:
      "Le cadre américain devenu référence mondiale : six fonctions pour tout couvrir.",
    blocks: [
      {
        kind: "diagram",
        title: "Les 6 fonctions du NIST CSF 2.0",
        lines: [
          "GOUVERNER ──► la stratégie, les rôles, la supervision",
          "    │            (nouveau dans la v2.0 : la gouvernance explicite)",
          "    ▼",
          "IDENTIFIER ─► actifs, risques, contexte métier",
          "    │",
          "    ▼",
          "PROTÉGER ──► contrôles, formation, gestion des accès",
          "    │",
          "    ▼",
          "DÉTECTER ──► surveillance, anomalies, alertes",
          "    │",
          "    ▼",
          "RÉPONDRE ──► incidents : contenir, éradiquer, communiquer",
          "    │",
          "    ▼",
          "RECOUVRER ─► restaurer, tirer les leçons, reprendre",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : le CSF organise la cybersécurité en 6 fonctions et des catégories de résultats attendus — un langage commun pour dire « où en sommes-nous » sans jargon technique. Pourquoi il compte : volontaire mais massivement adopté, il structure les programmes de sécurité des deux côtés de l'Atlantique et sert de grille de lecture aux audits. Différence avec ISO 27001 : le CSF est un cadre d'objectifs (non certifiant), ISO 27001 une norme d'exigences (certifiable) — ils se complètent.",
      },
    ],
  },
  {
    id: "gestion-risques-bases",
    title: "Gestion des risques : les bases",
    level: 2,
    intro:
      "Le cœur de la gouvernance : décider rationnellement face à l'incertitude.",
    blocks: [
      {
        kind: "table",
        headers: ["Étape", "Question", "Production"],
        rows: [
          ["Identifier", "Que protégeons-nous, contre quoi ?", "Inventaire des actifs et scénarios de menaces"],
          ["Évaluer", "Quelle probabilité, quel impact ?", "Risques cotés (probabilité × gravité)"],
          ["Traiter", "On fait quoi de chaque risque ?", "Plan : réduire, transférer, accepter, éviter"],
          ["Suivre", "Ça évolue comment ?", "Revue périodique, indicateurs"],
        ],
      },
      {
        kind: "fields",
        title: "Les quatre traitements possibles",
        fields: [
          {
            label: "Réduire",
            value:
              "Appliquer des contrôles : pare-feu, sauvegardes, formation. Le traitement le plus courant.",
          },
          {
            label: "Transférer",
            value:
              "Assurance cyber, clauses contractuelles : on ne supprime pas le risque, on en déplace la charge financière.",
          },
          {
            label: "Accepter",
            value:
              "Décision explicite et écrite : le risque résiduel est jugé tolérable. Ce n'est pas de l'inaction, c'est un choix assumé.",
          },
          {
            label: "Éviter",
            value:
              "Ne pas faire l'activité risquée : arrêter un service, refuser un traitement de données.",
          },
        ],
      },
      {
        kind: "text",
        text: "En une phrase : on ne peut pas tout sécuriser — la gestion des risques dit où mettre l'argent et l'effort pour le meilleur résultat. Erreur fréquente : traiter les risques « au feeling » sans les écrire. Bonne pratique : chaque risque a un propriétaire, une cotation, un traitement décidé et une date de revue.",
      },
    ],
  },
  {
    id: "politiques-bases",
    title: "Les politiques : écrire les règles du jeu",
    level: 2,
    intro:
      "Ce qui n'est pas écrit n'existe pas : la hiérarchie des documents de sécurité.",
    blocks: [
      {
        kind: "diagram",
        title: "La pyramide documentaire",
        lines: [
          "        ┌─────────────────────┐",
          "        │ PSSI (politique)     │  ← la direction dit POURQUOI et QUOI",
          "        ├─────────────────────┤",
          "        │ Politiques détaillées│  ← par domaine : accès, mots de passe,",
          "        │ (10-20 documents)    │    nomadisme, développement, incidents…",
          "        ├─────────────────────┤",
          "        │ Procédures           │  ← COMMENT faire, pas à pas",
          "        ├─────────────────────┤",
          "        │ Chartes / guides     │  ← ce que chacun doit savoir et signer",
          "        └─────────────────────┘",
          "  Règle : un document = un public, un objectif, un responsable.",
        ],
      },
      {
        kind: "list",
        items: [
          "Politique de contrôle d'accès : qui a accès à quoi, processus d'arrivée/départ, revue des droits.",
          "Politique de mots de passe et d'authentification : longueur, unicité, MFA obligatoire pour le sensible.",
          "Charte d'utilisation : ce que les utilisateurs peuvent/ne peuvent pas faire avec les moyens informatiques.",
          "Politique de classification : public / interne / confidentiel — chaque donnée a un niveau et des règles.",
          "Politique de gestion des incidents : qui alerter, dans quel délai, avec quel processus.",
          "Politique de sauvegarde : quoi, fréquence, test de restauration, responsabilités.",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : une politique dit qui doit faire quoi, est approuvée par la direction, communiquée à tous et revue régulièrement — sinon c'est du papier. Erreur fréquente : 80 pages que personne ne lit. Bonne pratique : court, clair, avec des exemples concrets, et une version « charte utilisateur » d'une page.",
      },
    ],
  },
  {
    id: "roles",
    title: "Les rôles : qui fait quoi",
    level: 2,
    intro:
      "La sécurité sans responsable nommé n'a pas lieu : la cartographie des rôles.",
    blocks: [
      {
        kind: "table",
        headers: ["Rôle", "Mission", "Rattachement typique"],
        rows: [
          ["Direction générale", "Arbitre les risques, alloue les moyens, assume la responsabilité légale.", "—"],
          ["RSSI / CISO", "Définit la politique, pilote le SMSI, conseille la direction, coordonne les équipes.", "Direction générale ou DSI"],
          ["DPO", "Veille à la conformité des traitements de données personnelles (RGPD).", "Indépendant, rattaché au plus haut niveau"],
          ["Équipes techniques", "Appliquent les contrôles : admin système/réseau, SOC, développeurs.", "DSI"],
          ["Utilisateurs", "Appliquent les règles (mots de passe, vigilance) : le maillon le plus nombreux.", "Tous les métiers"],
          ["Auditeur", "Vérifie indépendamment : interne (amélioration) ou externe (certification).", "Indépendant des équipes auditées"],
        ],
      },
      {
        kind: "text",
        text: "En une phrase : séparer qui définit (RSSI), qui exécute (technique), qui vérifie (audit) et qui décide (direction) — la confusion des rôles est une vulnérabilité organisationnelle. Point de vigilance : le RSSI qui dépend de la DSI qu'il doit challenger est en conflit d'intérêts structurel ; les référentiels recommandent un rattachement lui donnant l'indépendance.",
      },
    ],
  },
  {
    id: "cadre-reglementaire",
    title: "Le cadre réglementaire européen : panorama",
    level: 2,
    intro:
      "Pourquoi la conformité est devenue incontournable : les textes qui obligent.",
    blocks: [
      {
        kind: "table",
        headers: ["Texte", "Qui est concerné", "Obligation en une phrase"],
        rows: [
          ["RGPD", "Tout organisme traitant des données personnelles", "Protéger les données personnelles, notifier les violations, respecter les droits des personnes."],
          ["NIS2", "Entités essentielles et importantes (énergie, santé, numérique, transport…)", "Mesures de cybersécurité, notification d'incidents en 24h, responsabilité des dirigeants."],
          ["DORA", "Secteur financier européen", "Résilience opérationnelle numérique : tests, gestion des prestataires IT, partage d'incidents."],
        ],
      },
      {
        kind: "text",
        text: "En une phrase : ces textes transforment la sécurité en obligation légale avec sanctions — l'amende RGPD peut atteindre 4 % du chiffre d'affaires mondial, et NIS2 engage la responsabilité personnelle des dirigeants. Pourquoi c'est nouveau : la sécurité n'est plus un choix technique interne mais un sujet de conformité suivi au plus haut niveau. Le niveau 3 détaille chaque texte.",
      },
    ],
  },
  {
    id: "plan-smsi",
    title: "Plan d'action : monter un SMSI en 8 étapes",
    level: 2,
    intro:
      "Le chemin praticable : de zéro à un système de management vivant.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Obtenir le mandat",
            detail:
              "Soutien écrit de la direction : sans arbitrage au sommet, le SMSI meurt au premier conflit de moyens.",
          },
          {
            title: "Définir le périmètre",
            detail:
              "Quelle organisation, quels systèmes, quelles données : écrit et validé. Tout ce qui est hors périmètre est assumé comme tel.",
          },
          {
            title: "Inventorier les actifs",
            detail:
              "Données, systèmes, personnes, prestataires : on ne protège que ce qu'on a listé.",
          },
          {
            title: "Analyser les risques",
            detail:
              "Méthode choisie (EBIOS RM, ISO 27005) : scénarios, cotation, plan de traitement validé par la direction.",
          },
          {
            title: "Choisir et déployer les contrôles",
            detail:
              "Parmi l'Annexe A d'ISO 27001 (ou équivalent) : ceux qui traitent les risques identifiés, avec responsables et délais.",
          },
          {
            title: "Écrire les politiques",
            detail:
              "PSSI puis politiques détaillées : courtes, approuvées, communiquées, avec formation des utilisateurs.",
          },
          {
            title: "Mesurer et auditer",
            detail:
              "Indicateurs suivis, audit interne annuel : le SMSI se vérifie ou il n'existe pas.",
          },
          {
            title: "Revoir et améliorer",
            detail:
              "Revue de direction : incidents, indicateurs, évolutions → décisions → nouveau cycle PDCA.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 2,
    intro:
      "Les fautes qui tuent un programme de gouvernance avant qu'il ne vive.",
    blocks: [
      {
        kind: "fields",
        title: "Les classiques",
        fields: [
          {
            label: "La conformité « vitrine »",
            value:
              "Problème : des documents parfaits pour l'auditeur, jamais appliqués. Pourquoi : on vise le certificat, pas la sécurité. Mieux : écrire ce qu'on fait, puis faire ce qu'on écrit.",
          },
          {
            label: "Le RSSI sans moyens",
            value:
              "Problème : un responsable nommé sans budget ni autorité. Pourquoi : afficher la fonction sans l'assumer. Mieux : mandat écrit, budget, accès à la direction.",
          },
          {
            label: "L'analyse de risques jamais revue",
            value:
              "Problème : un document de 2021 pour décider en 2026. Pourquoi : « on l'a fait une fois ». Mieux : revue au moins annuelle et après chaque changement majeur.",
          },
          {
            label: "Tout miser sur la technique",
            value:
              "Problème : des outils coûteux, aucune politique, aucune formation. Pourquoi : le technique est visible et achetable. Mieux : équilibre personnes/processus/technologie.",
          },
          {
            label: "Ignorer les prestataires",
            value:
              "Problème : vos données chez un sous-traitant non évalué. Pourquoi : « c'est leur problème ». Mieux : évaluation sécurité des tiers critiques, clauses contractuelles.",
          },
        ],
      },
    ],
  },
  {
    id: "mini-projet",
    title: "Mini-projet : matrice de risques d'un cas simple",
    level: 2,
    intro:
      "Pratiquer la décision : coter et traiter 5 risques d'une petite structure fictive.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Poser le cas",
            detail:
              "Petite entreprise fictive : 15 personnes, un site e-commerce, une comptabilité en ligne, pas de RSSI. Listez 8 actifs (site, base clients, postes, sauvegardes…).",
          },
          {
            title: "Identifier 5 risques",
            detail:
              "Exemples : rançongiciel via phishing, fuite de la base clients, panne d'hébergeur, départ d'un admin avec les accès, vol d'un laptop.",
          },
          {
            title: "Coter",
            detail:
              "Pour chacun : probabilité (1-4) × gravité (1-4). Classez par criticité. Justifiez chaque note en une phrase.",
          },
          {
            title: "Traiter",
            detail:
              "Pour chaque risque : réduire (quel contrôle ?), transférer, accepter (par qui ?) ou éviter. Un risque = un propriétaire + un délai.",
          },
          {
            title: "Restituer",
            detail:
              "Un tableau d'une page + trois phrases de synthèse pour un dirigeant. C'est le format réel d'une restitution.",
          },
        ],
      },
      {
        kind: "text",
        text: "Concepts liés : le niveau 3 formalise avec EBIOS RM et ISO 27005, et détaille les contrôles de l'Annexe A.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "iso-27001-exigences",
    title: "ISO 27001 : les exigences (articles 4 à 10)",
    level: 3,
    intro:
      "Ce que la norme impose vraiment : le squelette du SMSI.",
    blocks: [
      {
        kind: "table",
        headers: ["Article", "Exigence", "En pratique"],
        rows: [
          ["4 — Contexte", "Comprendre l'organisation et les parties intéressées.", "Périmètre du SMSI écrit et justifié."],
          ["5 — Leadership", "Engagement et politique de la direction.", "PSSI signée, rôles attribués, moyens alloués."],
          ["6 — Planification", "Analyse des risques et plan de traitement.", "Méthode de risques appliquée, objectifs mesurables."],
          ["7 — Support", "Ressources, compétences, communication, documentation.", "Formations, sensibilisation, documents maîtrisés."],
          ["8 — Fonctionnement", "Mettre en œuvre les contrôles planifiés.", "Les mesures de l'Annexe A déployées et suivies."],
          ["9 — Évaluation", "Surveillance, audit interne, revue de direction.", "Indicateurs, audit annuel, revue formelle."],
          ["10 — Amélioration", "Traiter les non-conformités, s'améliorer.", "Plans d'action, leçons des incidents."],
        ],
      },
      {
        kind: "text",
        text: "En une phrase : les articles 4 à 10 sont le PDCA normatif — un auditeur de certification vérifie chacun d'eux avec des preuves. Point clé : l'article 6 (risques) est le pivot — tout le reste en découle ; un SMSI sans analyse de risques sérieuse s'effondre à l'audit.",
      },
    ],
  },
  {
    id: "annexe-a",
    title: "ISO 27001 Annexe A : les 93 contrôles",
    level: 3,
    intro:
      "Le catalogue : quatre familles de mesures à choisir selon les risques.",
    blocks: [
      {
        kind: "table",
        headers: ["Famille", "Contenu", "Exemples"],
        rows: [
          ["Organisationnels (37)", "Politiques, rôles, gestion des prestataires, incidents.", "PSSI, revue des accès, plan de réponse aux incidents."],
          ["Humains (8)", "Le facteur humain avant, pendant et après l'emploi.", "Sensibilisation phishing, confidentialité, processus disciplinaire."],
          ["Physiques (14)", "Protection des lieux et équipements.", "Contrôle d'accès badge, protection contre le vol, salles sécurisées."],
          ["Technologiques (34)", "Les contrôles techniques classiques.", "Mots de passe, chiffrement, journalisation, sauvegardes, développement sécurisé."],
        ],
      },
      {
        kind: "text",
        text: "En une phrase : on ne déploie pas les 93 contrôles — on sélectionne ceux qui traitent les risques identifiés, et on JUSTIFIE par écrit chaque contrôle écarté (la « déclaration d'applicabilité », SoA). Pourquoi : c'est ce document qui prouve à l'auditeur que le choix est rationnel, pas arbitraire. Erreur fréquente : cocher les contrôles « faciles » et ignorer ceux qui dérangent.",
      },
      {
        kind: "fields",
        title: "Lire la SoA comme un auditeur",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Pour chaque contrôle : applicable ou non, si oui comment il est mis en œuvre (preuve), si non pourquoi (justification liée aux risques).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Déclarer un contrôle « applicable » sans preuve de mise en œuvre : l'auditeur demandera la preuve, toujours.",
          },
        ],
      },
    ],
  },
  {
    id: "iso-27005",
    title: "ISO 27005 : gérer les risques en méthode",
    level: 3,
    intro:
      "Le mode d'emploi de l'article 6 : identifier, estimer, évaluer, traiter.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : ISO 27005 décrit le processus de gestion des risques — établissement du contexte, identification, estimation (probabilité × impact), évaluation (acceptable ou non), traitement, puis surveillance. Pourquoi : c'est la méthode de référence compatible ISO 27001, utilisable telle quelle par une organisation qui veut une analyse de risques auditable.",
      },
      {
        kind: "diagram",
        title: "Le processus ISO 27005",
        lines: [
          "Contexte (périmètre, critères d'acceptation)",
          "        │",
          "        ▼",
          "Identification (actifs, menaces, vulnérabilités)",
          "        │",
          "        ▼",
          "Estimation (probabilité × impact = niveau de risque)",
          "        │",
          "        ▼",
          "Évaluation (acceptable ? → oui : accepter / non : traiter)",
          "        │",
          "        ▼",
          "Traitement (réduire, transférer, éviter, accepter)",
          "        │",
          "        ▼",
          "Surveillance et revue (en continu)",
          "",
          "Les critères d'acceptation se définissent AVANT,",
          "sinon on ajuste le seuil pour faire passer les risques.",
        ],
      },
    ],
  },
  {
    id: "ebios-rm",
    title: "EBIOS RM : la méthode française",
    level: 3,
    intro:
      "La méthode de l'ANSSI : des scénarios construits en ateliers, pas des cases cochées.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : EBIOS Risk Manager (ANSSI) construit l'analyse de risques en 5 ateliers collaboratifs — du socle de sécurité aux scénarios opérationnels — en partant des missions de l'organisation et des attaquants réalistes. Pourquoi elle compte : méthode publique, gratuite, reconnue en France et en Europe, qui force à raisonner en scénarios d'attaque concrets plutôt qu'en listes génériques.",
      },
      {
        kind: "table",
        headers: ["Atelier", "Objet", "Production"],
        rows: [
          ["1 — Socle", "Cadre et biens essentiels", "Périmètre, missions, biens à protéger"],
          ["2 — Sources de risque", "Qui attaque, pourquoi", "Profils d'attaquants et leurs objectifs"],
          ["3 — Scénarios stratégiques", "Chemins d'attaque de haut niveau", "Scénarios redoutés, priorisés"],
          ["4 — Scénarios opérationnels", "Modes opératoires détaillés", "Séquences techniques d'attaque"],
          ["5 — Traitement", "Mesures et plan", "Plan de traitement, risques résiduels"],
        ],
      },
      {
        kind: "text",
        text: "En une phrase : la force d'EBIOS RM est de partir des attaquants et de leurs objectifs — on ne sécurise plus « en général », on bloque des chemins précis. Point pratique : les ateliers se font en groupe (métiers + technique), avec les guides et bases de connaissance publiés par l'ANSSI.",
      },
    ],
  },
  {
    id: "nist-csf-detail",
    title: "NIST CSF 2.0 : utiliser le cadre",
    level: 3,
    intro:
      "Du poster à la pratique : profils, niveaux et plan d'amélioration.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : le CSF 2.0 se décline en « profils » — le profil actuel (où en sommes-nous, par fonction et catégorie) et le profil cible (où voulons-nous être) — l'écart entre les deux devenant le plan d'action. Pourquoi c'est puissant : cela donne un langage commun entre technique et direction (« notre fonction Détecter est au niveau 2, l'objectif est 3 ») et un pilotage par l'écart, pas par la peur.",
      },
      {
        kind: "fields",
        title: "Mettre en œuvre",
        fields: [
          {
            label: "Niveaux (tiers)",
            value:
              "De 1 (partiel, réactif) à 4 (adaptatif, anticipatif) : on évalue la maturité de chaque fonction honnêtement, preuves à l'appui.",
          },
          {
            label: "La fonction Gouverner",
            value:
              "Nouveauté de la v2.0 : stratégie, rôles, supervision et gestion des risques fournisseurs — la gouvernance devient explicite, pas implicite.",
          },
          {
            label: "Complémentarité",
            value:
              "Le CSF dit les objectifs, ISO 27001 impose le système pour les atteindre : beaucoup d'organisations utilisent les deux.",
          },
        ],
      },
    ],
  },
  {
    id: "nis2-detail",
    title: "NIS2 : la directive européenne",
    level: 3,
    intro:
      "Quand la cybersécurité devient une obligation légale personnelle des dirigeants.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : la directive NIS2 impose aux entités « essentielles » et « importantes » de secteurs critiques (énergie, santé, eau, numérique, transports, finance…) des mesures de cybersécurité et des notifications d'incidents rapides, avec sanctions financières et responsabilité des organes de direction. Pourquoi c'est un tournant : pour la première fois à cette échelle, des dirigeants peuvent être tenus personnellement responsables d'une négligence en cybersécurité.",
      },
      {
        kind: "fields",
        title: "Les obligations clés",
        fields: [
          {
            label: "Mesures de sécurité",
            value:
              "Analyse de risques, gestion des incidents, continuité d'activité, sécurité de la chaîne d'approvisionnement, chiffrement, authentification forte — une liste minimale d'exigences.",
          },
          {
            label: "Notification en 24h",
            value:
              "Alerte précoce sous 24 heures après la détection d'un incident significatif, notification détaillée sous 72h : la rapidité est une obligation, pas une bonne pratique.",
          },
          {
            label: "Responsabilité des dirigeants",
            value:
              "Les organes de direction doivent approuver les mesures, suivre leur mise en œuvre et peuvent être tenus responsables des manquements — la sécurité monte au conseil d'administration.",
          },
          {
            label: "Chaîne d'approvisionnement",
            value:
              "Évaluer la sécurité des fournisseurs critiques : votre conformité dépend aussi de vos prestataires.",
          },
        ],
      },
      {
        kind: "text",
        text: "Point pratique : la transposition varie selon les États membres (en France, via l'ANSSI) — vérifiez toujours le texte national applicable plutôt que la seule directive.",
      },
    ],
  },
  {
    id: "dora-detail",
    title: "DORA : la résilience du secteur financier",
    level: 3,
    intro:
      "Le règlement européen qui impose aux acteurs financiers de prouver leur résilience numérique.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : DORA (Digital Operational Resilience Act) impose aux entités financières européennes un cadre complet de résilience : gestion des risques TIC, tests réguliers (dont tests d'intrusion), gestion des prestataires critiques et déclaration des incidents. Pourquoi : le secteur financier ne peut pas « juste » être sécurisé, il doit rester opérationnel — la continuité est l'objectif, la sécurité un moyen.",
      },
      {
        kind: "fields",
        title: "Les cinq piliers de DORA",
        fields: [
          {
            label: "Gestion des risques TIC",
            value:
              "Cadre documenté, complet et régulièrement revu : l'exigence de base, avec responsabilités claires.",
          },
          {
            label: "Gestion des incidents",
            value:
              "Classification, notification aux autorités selon des seuils, suivi jusqu'à résolution.",
          },
          {
            label: "Tests de résilience",
            value:
              "Tests proportionnés et réguliers — jusqu'aux tests d'intrusion encadrés (TLPT) pour les entités les plus critiques.",
          },
          {
            label: "Risque de tiers",
            value:
              "Contrats, audits et plans de sortie pour les prestataires TIC critiques : le cloud et les éditeurs sont dans le périmètre.",
          },
          {
            label: "Partage d'information",
            value:
              "Échange encadré d'informations sur les cybermenaces entre entités : la défense collective organisée.",
          },
        ],
      },
    ],
  },
  {
    id: "rgpd-detail",
    title: "RGPD : les obligations sécurité",
    level: 3,
    intro:
      "Le volet sécurité du règlement : ce que « protéger les données » impose concrètement.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : le RGPD impose de protéger les données personnelles par des mesures « appropriées » (article 32 : pseudonymisation, chiffrement, confidentialité, intégrité, disponibilité, résilience) et de notifier les violations à l'autorité sous 72h. Pourquoi il concerne la gouvernance sécurité : c'est le texte qui fait entrer la sécurité dans tous les conseils d'administration européens, avec des amendes dissuasives.",
      },
      {
        kind: "fields",
        title: "Les exigences opérationnelles",
        fields: [
          {
            label: "Article 32 — Sécurité",
            value:
              "Mesures techniques et organisationnelles proportionnées aux risques : chiffrement, tests réguliers, capacité de restauration rapide.",
          },
          {
            label: "Articles 33-34 — Violations",
            value:
              "Notification à l'autorité sous 72h, information des personnes si risque élevé : il faut un processus prêt AVANT l'incident.",
          },
          {
            label: "Article 35 — AIPD",
            value:
              "Analyse d'impact pour les traitements à risque : identifier et réduire les risques AVANT de traiter les données.",
          },
          {
            label: "Article 28 — Sous-traitants",
            value:
              "Contrat imposant les garanties de sécurité : vos prestataires sont votre périmètre.",
          },
          {
            label: "DPO",
            value:
              "Délégué à la protection des données obligatoire au-delà de certains seuils : indépendant, expert, associé en amont des projets.",
          },
        ],
      },
      {
        kind: "text",
        text: "Articulation : un SMSI ISO 27001 bien conçu couvre largement l'article 32 — la gouvernance unifie la conformité au lieu de la dupliquer par texte.",
      },
    ],
  },
  {
    id: "audits",
    title: "Les audits : vérifier sans complaisance",
    level: 3,
    intro:
      "Le contrôle indépendant : interne, externe, de certification — chacun son rôle.",
    blocks: [
      {
        kind: "table",
        headers: ["Type", "Qui", "Objectif"],
        rows: [
          ["Audit interne", "Auditeurs de l'organisation, indépendants des équipes auditées", "Amélioration continue : trouver les écarts avant les autres."],
          ["Audit de certification", "Organisme accrédité indépendant", "Délivrer (ou non) le certificat ISO 27001 : audit initial puis suivis annuels."],
          ["Audit contractuel/client", "Client ou son mandataire", "Vérifier que le prestataire tient ses engagements de sécurité."],
          ["Audit réglementaire", "Autorité ou mandaté", "Vérifier la conformité légale (NIS2, DORA, RGPD)."],
        ],
      },
      {
        kind: "fields",
        title: "Se préparer à un audit",
        fields: [
          {
            label: "Preuves, pas affirmations",
            value:
              "Chaque contrôle revendiqué doit avoir une preuve : document, enregistrement, démonstration. « On le fait » sans trace ne vaut rien.",
          },
          {
            label: "Échantillonnage",
            value:
              "L'auditeur ne vérifie pas tout : il échantillonne. Un échantillon propre suppose un système propre partout.",
          },
          {
            label: "Non-conformités",
            value:
              "Majeures (le système échoue) vs mineures (écart isolé) : chacune donne lieu à un plan d'action avec délai — suivi à l'audit suivant.",
          },
          {
            label: "Attitude",
            value:
              "Transparence : cacher un problème à l'auditeur, c'est le découvrir plus tard en incident. L'audit est un outil, pas un examen piégé.",
          },
        ],
      },
    ],
  },
  {
    id: "indicateurs",
    title: "Piloter par indicateurs",
    level: 3,
    intro:
      "Ce qui n'est pas mesuré n'est pas piloté : des KPI qui disent vrai.",
    blocks: [
      {
        kind: "table",
        headers: ["Indicateur", "Ce qu'il mesure", "Lecture"],
        rows: [
          ["Délai moyen de correction des vulnérabilités critiques", "Réactivité du patching", "En baisse = processus efficace ; en hausse = alerte."],
          ["Taux de réussite au phishing simulé (clics)", "Vigilance humaine", "En baisse après formation = la sensibilisation marche."],
          ["Couverture MFA sur les accès sensibles", "Hygiène des accès", "Doit tendre vers 100 %, tout écart est un risque nommé."],
          ["Délai de détection / réponse (MTTD/MTTR)", "Efficacité SOC et réponse", "Comparés dans le temps, pas dans l'absolu."],
          ["Taux de findings d'audit soldés à temps", "Sérieux du suivi", "Un plan d'action qui traîne est un risque accepté de fait."],
          ["Disponibilité des services critiques", "Résilience", "Liée aux objectifs de continuité (RTO)."],
        ],
      },
      {
        kind: "text",
        text: "En une phrase : un bon indicateur est mesurable, suivi dans le temps, rattaché à un objectif et présenté à la direction — le reste est de la décoration. Erreur fréquente : 40 indicateurs que personne ne regarde. Bonne pratique : 8 à 12 indicateurs, revus en revue de direction, chacun avec un responsable.",
      },
    ],
  },
  {
    id: "continuite",
    title: "Continuité d'activité : PCA et PRA",
    level: 3,
    intro:
      "Quand le système tombe : le plan qui dit comment on continue et comment on repart.",
    blocks: [
      {
        kind: "fields",
        title: "Les concepts",
        fields: [
          {
            label: "PCA — Plan de Continuité",
            value:
              "Comment l'activité CONTINUE en mode dégradé pendant la crise : procédures manuelles, sites de repli, communications. Objectif : servir les fonctions vitales.",
          },
          {
            label: "PRA — Plan de Reprise",
            value:
              "Comment on RECONSTRUIT le système d'information après : ordre de redémarrage, restaurations, tests. Objectif : revenir à la normale dans le RTO.",
          },
          {
            label: "BIA",
            value:
              "Analyse d'impact : pour chaque processus, quel coût par heure d'arrêt ? C'est le BIA qui justifie les investissements de continuité.",
          },
          {
            label: "RTO / RPO",
            value:
              "RTO : délai maximal de reprise ; RPO : perte de données maximale acceptable. Tout plan se calibre sur ces deux chiffres, validés par la direction.",
          },
        ],
      },
      {
        kind: "text",
        text: "En une phrase : un PCA/PRA non testé est une fiction — l'exercice régulier (même sur table) révèle les oublis : contacts périmés, sauvegardes inexploitables, responsabilités floues. Erreur fréquente : confier la continuité à la seule DSI alors qu'elle concerne tous les métiers.",
      },
    ],
  },
  {
    id: "gestion-incidents-gouv",
    title: "Gouvernance des incidents",
    level: 3,
    intro:
      "Le volet organisationnel de la réponse : qui décide quoi quand ça brûle.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Préparer",
            detail:
              "Cellule de crise nommée, contacts à jour, playbooks écrits, moyens (salle, communications de secours) : tout ce qui s'improvise mal sous pression.",
          },
          {
            title: "Détecter et qualifier",
            detail:
              "Du signalement à la qualification : est-ce un incident ? Quelle gravité ? La grille de criticité évite la panique comme la minimisation.",
          },
          {
            title: "Contenir",
            detail:
              "Isoler sans détruire les preuves : la coordination avec la forensique commence ici (ne pas éteindre, isoler du réseau).",
          },
          {
            title: "Décider",
            detail:
              "La cellule arbitre : couper un service ? payer ? communiquer ? Ces décisions sont de direction, pas techniques.",
          },
          {
            title: "Communiquer",
            detail:
              "En interne, aux clients, aux autorités (délais légaux : 24h/72h selon les textes) : un porte-parole unique, des messages validés.",
          },
          {
            title: "Revenir et apprendre",
            detail:
              "Retour d'expérience écrit sous 30 jours : causes, ce qui a marché, plan d'action. Sans RETEX, l'incident ne sert à rien.",
          },
        ],
      },
      {
        kind: "text",
        text: "Articulation : le SOC détecte et qualifie techniquement, la forensique établit les faits, la gouvernance décide et communique — les trois Learning Pages se rejoignent ici.",
      },
    ],
  },
  {
    id: "tiers-prestataires",
    title: "Sécurité des tiers et prestataires",
    level: 3,
    intro:
      "Votre sécurité s'arrête où commence celle de vos fournisseurs : l'évaluer, la contractualiser.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : une part croissante des incidents passe par un prestataire (éditeur compromis, sous-traitant négligent) — la gouvernance impose d'évaluer les tiers critiques avant de leur confier des données ou des accès. Pourquoi : NIS2 et DORA l'exigent explicitement ; contractuellement, c'est votre responsabilité qui reste engagée vis-à-vis de vos clients.",
      },
      {
        kind: "fields",
        title: "Le dispositif type",
        fields: [
          {
            label: "Évaluation initiale",
            value:
              "Questionnaire de sécurité, certifications (ISO 27001, SOC 2), tests : proportionnée à la criticité du tiers — on n'évalue pas le fournisseur de stylos comme l'hébergeur.",
          },
          {
            label: "Clauses contractuelles",
            value:
              "Exigences de sécurité, droit d'audit, notification d'incidents, réversibilité et plan de sortie : écrit avant de signer, pas après l'incident.",
          },
          {
            label: "Suivi continu",
            value:
              "Réévaluation périodique, surveillance des incidents publics du prestataire, revue des accès qu'on lui a donnés.",
          },
          {
            label: "Plan de sortie",
            value:
              "Comment récupérer données et service si le prestataire disparaît ou est compromis : la dépendance sans sortie est un risque majeur.",
          },
        ],
      },
    ],
  },
  {
    id: "classification-donnees",
    title: "Classification des données",
    level: 3,
    intro:
      "Tout protéger pareil, c'est ne rien protéger efficacement : classer pour doser.",
    blocks: [
      {
        kind: "table",
        headers: ["Niveau", "Exemple", "Mesures typiques"],
        rows: [
          ["Public", "Site vitrine, communiqués", "Aucune restriction, intégrité vérifiée."],
          ["Interne", "Documents de travail, organigramme", "Accès aux employés, pas de diffusion externe."],
          ["Confidentiel", "Données clients, contrats, paie", "Accès restreint nominatif, chiffrement, traçabilité."],
          ["Secret", "Secrets industriels, clés, données de santé sensibles", "Besoin d'en connaître strict, chiffrement fort, audit des accès."],
        ],
      },
      {
        kind: "text",
        text: "En une phrase : chaque donnée classée hérite automatiquement des mesures de son niveau — la classification est le commutateur qui rend les politiques applicables. Erreur fréquente : 4 niveaux théoriques dont personne ne se sert. Bonne pratique : marquage simple (en-tête de document, étiquette), formation au réflexe « quel niveau ? », et contrôle d'un échantillon.",
      },
    ],
  },
  {
    id: "sensibilisation",
    title: "Sensibilisation : le facteur humain",
    level: 3,
    intro:
      "La politique la mieux écrite échoue si personne ne la connaît : former sans infantiliser.",
    blocks: [
      {
        kind: "list",
        items: [
          "Cibler par rôle : l'accueil, les développeurs et la comptabilité n'ont pas les mêmes risques — la formation générique ennuie tout le monde.",
          "Phishing simulé : campagnes régulières avec débrief pédagogique immédiat (pas punitif) pour celui qui clique.",
          "Formats courts et répétés : 10 minutes trimestrielles valent mieux qu'une journée annuelle oubliée.",
          "Mesurer : taux de clics aux simulations, signalements spontanés — la sensibilisation se pilote comme le reste.",
          "Impliquer la direction : quand les dirigeants suivent la formation, le message passe ; sinon, c'est optionnel.",
          "Documentation accessible : la charte utilisateur en une page, les contacts sécurité visibles partout.",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : on ne forme pas à « la sécurité » en général, on entraîne à des gestes précis (vérifier l'expéditeur, signaler, verrouiller) jusqu'à ce qu'ils deviennent des réflexes. Erreur fréquente : culpabiliser les victimes de phishing simulé — on obtient du silence, pas de la vigilance.",
      },
    ],
  },
  {
    id: "soc2",
    title: "SOC 2 et autres référentiels",
    level: 3,
    intro:
      "Au-delà d'ISO : les cadres que les clients et partenaires exigent.",
    blocks: [
      {
        kind: "fields",
        title: "Panorama",
        fields: [
          {
            label: "SOC 2 (AICPA)",
            value:
              "Référentiel américain d'audit des prestataires de services, autour de 5 critères (sécurité, disponibilité, intégrité, confidentialité, vie privée). Incontournable pour vendre du SaaS aux États-Unis.",
          },
          {
            label: "SecNumCloud (ANSSI)",
            value:
              "Qualification française des prestataires cloud : exigences élevées, dont l'immunité aux lois extraterritoriales pour le niveau le plus exigeant.",
          },
          {
            label: "PCI DSS",
            value:
              "Obligatoire pour qui stocke, traite ou transmet des données de cartes bancaires : 12 exigences, audits réguliers, sanctions des réseaux de cartes.",
          },
          {
            label: "HDS (France)",
            value:
              "Certification pour l'hébergement de données de santé : s'ajoute aux exigences générales pour ce secteur sensible.",
          },
        ],
      },
      {
        kind: "text",
        text: "En une phrase : on ne collectionne pas les certifications — on choisit celles qu'exigent les clients, les contrats et la loi, et on mutualise les preuves (un bon SMSI ISO 27001 couvre une large part des autres référentiels).",
      },
    ],
  },
  {
    id: "revue-direction",
    title: "La revue de direction",
    level: 3,
    intro:
      "Le moment où la gouvernance se joue : la direction arbitre, preuves à l'appui.",
    blocks: [
      {
        kind: "list",
        items: [
          "Périodicité : au moins annuelle (exigence ISO 27001), idéalement semestrielle dans les contextes à risque.",
          "Ordre du jour type : incidents et leçons, indicateurs, résultats d'audits, état des plans d'action, évolutions des risques et de la réglementation, besoins de moyens.",
          "Participants : direction générale, RSSI, DPO, représentants métiers — pas un comité technique entre soi.",
          "Sorties : décisions écrites (arbitrages de risques, budgets, priorités), pas un compte-rendu décoratif.",
          "Suivi : chaque décision a un responsable et une échéance, vérifiés à la revue suivante.",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : la revue de direction transforme la sécurité en décisions — sans elle, le SMSI est un système sans pilote. Erreur fréquente : la réduire à une présentation PowerPoint validée en 20 minutes. Bonne pratique : préparer des arbitrages concrets (« accepte-t-on ce risque résiduel ? ») plutôt qu'un état des lieux passif.",
      },
    ],
  },
  {
    id: "assurance-cyber",
    title: "L'assurance cyber : transférer sans se leurrer",
    level: 3,
    intro:
      "Le transfert de risque a un prix et des conditions : les comprendre avant de signer.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : l'assurance cyber prend en charge une partie des coûts d'un incident (expertise, restauration, responsabilité civile) mais exige des mesures minimales et ne couvre jamais la réputation ni l'amende pénale. Pourquoi en parler en gouvernance : c'est un outil de transfert de risque légitime, à condition de ne pas le confondre avec une protection.",
      },
      {
        kind: "fields",
        title: "Ce qu'il faut savoir",
        fields: [
          {
            label: "Exigences préalables",
            value:
              "Les assureurs auditent avant de couvrir : MFA, sauvegardes testées, patching — sans hygiène, pas de contrat ou des primes prohibitives.",
          },
          {
            label: "Exclusions",
            value:
              "Lire les clauses : actes de guerre cyber, négligence grave, incidents antérieurs à la souscription sont souvent exclus.",
          },
          {
            label: "Complément, pas substitut",
            value:
              "L'assurance paie après l'incident ; elle n'empêche rien. Une organisation « assurée donc tranquille » a tout faux.",
          },
        ],
      },
    ],
  },
  {
    id: "cas-incident",
    title: "Étude de cas : anatomie d'une crise gouvernée",
    level: 3,
    intro:
      "Mettre bout à bout les processus : ce qui se passe quand tout s'enchaîne bien.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Détection (J+0, 8h12)",
            detail:
              "Le SOC qualifie une alerte en incident : rançongiciel en propagation sur le réseau bureautique. La cellule de crise est activée selon le plan.",
          },
          {
            title: "Confinement (J+0, 9h30)",
            detail:
              "Segments isolés, sauvegardes vérifiées intactes (hors ligne), forensique préserve les preuves : décisions prises par la cellule, pas improvisées.",
          },
          {
            title: "Notifications (J+0 à J+3)",
            detail:
              "Autorité notifiée sous 24h (NIS2), clients informés selon le plan de communication, assureur et prestataire de réponse activés.",
          },
          {
            title: "Reprise (J+4 à J+10)",
            detail:
              "Restauration selon le PRA, dans l'ordre de priorité du BIA : les fonctions vitales d'abord, tests avant remise en service.",
          },
          {
            title: "RETEX (J+30)",
            detail:
              "Retour d'expérience : point d'entrée identifié (phishing), mesures correctives (formation ciblée, filtrage renforcé), mise à jour de l'analyse de risques et des politiques.",
          },
        ],
      },
      {
        kind: "text",
        text: "En une phrase : rien ici n'est héroïque — c'est l'exécution disciplinée de plans écrits à froid qui fait la différence entre une crise gérée et un naufrage. Chaque étape renvoie à une section de cette page : c'est la gouvernance en action.",
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
            label: "Confondre maturité et conformité",
            value:
              "Problème : « on est certifié donc on est mûr ». Pourquoi : l'audit vérifie un instantané. Mieux : viser la maturité (tiers CSF) en continu, la conformité suivra.",
          },
          {
            label: "Gouverner sans métriques",
            value:
              "Problème : des décisions sur des impressions. Pourquoi : mesurer demande de la rigueur. Mieux : peu d'indicateurs, mais suivis et présentés.",
          },
          {
            label: "Le risque accepté par défaut",
            value:
              "Problème : ne pas traiter un risque sans décision formelle d'acceptation. Pourquoi : l'inaction est confortable. Mieux : tout risque non traité est explicitement accepté, par écrit, par un responsable.",
          },
          {
            label: "Oublier la culture",
            value:
              "Problème : des processus parfaits que personne ne suit. Pourquoi : on a écrit POUR les gens sans eux. Mieux : co-construire avec les métiers, simplifier, expliquer le pourquoi.",
          },
          {
            label: "Dupliquer les référentiels",
            value:
              "Problème : un SMSI ISO, un programme NIS2 et un suivi RGPD séparés qui se contredisent. Pourquoi : chaque texte géré en silo. Mieux : un seul système de gouvernance, des preuves mutualisées.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-smsi",
    title: "Projet : dossier SMSI miniature",
    level: 3,
    intro:
      "Le projet fil rouge : un système de management complet, à petite échelle.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Cadrer",
            detail:
              "Organisation fictive (20 personnes, SaaS B2B) : périmètre écrit, contexte, parties intéressées.",
          },
          {
            title: "Analyser les risques",
            detail:
              "Méthode au choix (ISO 27005 ou EBIOS RM simplifié) : 10 risques cotés, plan de traitement avec propriétaires.",
          },
          {
            title: "Sélectionner les contrôles",
            detail:
              "Parmi l'Annexe A : 20 contrôles justifiés + déclaration d'applicabilité (applicable/non applicable, pourquoi).",
          },
          {
            title: "Rédiger",
            detail:
              "PSSI (2 pages), 5 politiques détaillées (1 page chacune), charte utilisateur (1 page).",
          },
          {
            title: "Piloter",
            detail:
              "8 indicateurs définis, programme d'audit interne annuel, ordre du jour de revue de direction.",
          },
          {
            title: "Restituer",
            detail:
              "Dossier structuré + synthèse exécutive d'une page. Relire en se demandant : « un auditeur y croirait-il ? »",
          },
        ],
      },
    ],
  },
  {
    id: "projet-conformite",
    title: "Projet : plan de conformité NIS2",
    level: 3,
    intro:
      "Passer du texte de loi au plan d'action : la conformité opérationnelle.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Qualifier",
            detail:
              "Entité fictive du secteur énergie : est-elle « essentielle » au sens de NIS2 ? Justifier avec les critères de la directive.",
          },
          {
            title: "Cartographier les exigences",
            detail:
              "Lister les obligations (mesures, notifications, gouvernance) dans un tableau : exigence → responsable → échéance.",
          },
          {
            title: "Évaluer l'existant",
            detail:
              "Pour chaque exigence : existant, écart, criticité de l'écart. Honnêteté requise : c'est un exercice, pas un audit officiel.",
          },
          {
            title: "Planifier",
            detail:
              "Plan d'action 12 mois : quick wins (notifications, contacts), chantiers (gestion des risques, chaîne d'approvisionnement), jalons de vérification.",
          },
        ],
      },
      {
        kind: "text",
        text: "Concepts liés : ce plan alimente naturellement la revue de direction et le dialogue avec les équipes techniques (SOC, cloud, développement).",
      },
    ],
  },
  {
    id: "projet-audit-blanc",
    title: "Projet : audit blanc d'un SMSI fictif",
    level: 3,
    intro:
      "Se mettre dans la peau de l'auditeur : vérifier, échantillonner, conclure.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Préparer",
            detail:
              "Choisir 10 contrôles de l'Annexe A et écrire pour chacun : ce qu'on va vérifier, quelles preuves on attend.",
          },
          {
            title: "Auditer",
            detail:
              "Sur le dossier du projet SMSI (ou un cas fourni) : examiner les preuves, noter conformités et écarts.",
          },
          {
            title: "Qualifier",
            detail:
              "Chaque écart : non-conformité majeure, mineure ou simple opportunité d'amélioration — avec justification.",
          },
          {
            title: "Restituer",
            detail:
              "Rapport d'audit : constats factuels, non-conformités, plan d'action recommandé. Ton neutre, faits vérifiables.",
          },
        ],
      },
    ],
  },
  {
    id: "pci-dss",
    title: "PCI DSS : protéger les données cartes",
    level: 3,
    intro: "Le standard incontournable si vous touchez aux paiements par carte.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : PCI DSS impose 12 familles d'exigences à toute organisation qui stocke, traite ou transmet des données de cartes bancaires — du chiffrement au contrôle d'accès. Pourquoi il compte : un manquement prouvé après une fuite peut coûter le droit d'accepter les cartes, ce qui tue une activité e-commerce.",
      },
      {
        kind: "fields",
        title: "Les 12 exigences en bref",
        fields: [
          {
            label: "Réseau sécurisé",
            value: "Pare-feu configurés, pas de mots de passe par défaut : les deux premières exigences ferment les portes évidentes.",
          },
          {
            label: "Protéger les données",
            value: "Chiffrement des données stockées et en transit : la donnée carte ne circule ni ne dort en clair.",
          },
          {
            label: "Vulnérabilités",
            value: "Antivirus à jour, correctifs de sécurité : l'hygiène technique continue.",
          },
          {
            label: "Contrôle d'accès",
            value: "Moindre privilège, identifiants uniques, MFA pour l'admin : qui touche aux données cartes est nommé et contrôlé.",
          },
          {
            label: "Tester et surveiller",
            value: "Logs, tests d'intrusion annuels, scans trimestriels : la conformité se prouve en continu.",
          },
          {
            label: "Politique",
            value: "Politique de sécurité maintenue et communiquée : sans gouvernance, les 11 autres s'effritent.",
          },
        ],
      },
      {
        kind: "text",
        text: "Point stratégique : le plus sûr est souvent de NE PAS toucher aux données cartes — un prestataire certifié (Stripe, Adyen) réduit le périmètre PCI à presque rien.",
      },
    ],
  },
  {
    id: "iso-27701",
    title: "ISO 27701 : le SMSI de la vie privée",
    level: 3,
    intro: "Étendre l'ISO 27001 à la protection des données personnelles.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : l'ISO 27701 ajoute à l'ISO 27001 des exigences spécifiques à la vie privée (PIMS) — pour les responsables de traitement comme pour les sous-traitants. Pourquoi : elle fait le pont entre sécurité (27001) et conformité RGPD, avec un vocabulaire commun aux deux mondes.",
      },
      {
        kind: "fields",
        title: "Ce qu'elle apporte",
        fields: [
          {
            label: "Rôles vie privée",
            value: "Distinction responsable / sous-traitant avec des mesures adaptées à chacun : les obligations ne sont pas les mêmes.",
          },
          {
            label: "Droits des personnes",
            value: "Processus pour l'accès, la rectification, l'effacement : les droits RGPD deviennent des contrôles mesurables.",
          },
          {
            label: "Privacy by design",
            value: "La protection dès la conception, intégrée au cycle de vie : pas un vernis posé après.",
          },
        ],
      },
      {
        kind: "text",
        text: "Articulation : 27701 ne se certifie qu'en extension d'un SMSI 27001 existant — c'est une couche, pas un point de départ.",
      },
    ],
  },
  {
    id: "modeles-maturite",
    title: "Modèles de maturité : mesurer le progrès",
    level: 3,
    intro: "Situer l'organisation sur une échelle : d'où on part, où on va.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : un modèle de maturité (niveaux 1 à 5, de l'informel à l'optimisé) permet de dire où en est chaque domaine de sécurité et de planifier la progression. Pourquoi : « on est nuls en sécurité » ne se pilote pas ; « détection au niveau 2, objectif niveau 3 en 12 mois » si.",
      },
      {
        kind: "table",
        headers: ["Niveau", "Caractéristique", "Exemple"],
        rows: [
          ["1 — Initial", "Ad hoc, dépend des individus", "Le pare-feu est configuré « à la main » par l'admin"],
          ["2 — Géré", "Processus de base, répété", "Les correctifs sont appliqués chaque mois"],
          ["3 — Défini", "Processus documentés et suivis", "Politique de correctifs écrite, rôles définis"],
          ["4 — Maîtrisé", "Mesuré avec indicateurs", "Taux de correctifs suivis, seuils d'alerte"],
          ["5 — Optimisé", "Amélioration continue", "Automatisation, retour d'expérience systématique"],
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : viser le niveau adapté au risque, pas le niveau 5 partout — la maturité coûte cher, on l'investit là où l'enjeu le justifie.",
      },
    ],
  },
  {
    id: "budget-securite",
    title: "Budget sécurité : justifier l'investissement",
    level: 3,
    intro: "Parler le langage de la direction : risque, coût, valeur.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : un budget sécurité se justifie en comparant le coût des mesures au coût probable des incidents évités — pas en invoquant la peur. Pourquoi : la direction arbitre entre des investissements ; la sécurité gagne quand elle parle chiffres, pas quand elle parle catastrophes.",
      },
      {
        kind: "fields",
        title: "Les arguments qui marchent",
        fields: [
          {
            label: "Coût de l'incident",
            value: "Rançon, interruption, amendes RGPD, réputation : chiffrer le scénario réaliste pour l'organisation, avec l'analyse de risques.",
          },
          {
            label: "Coût de la non-conformité",
            value: "Amendes, perte de certifications, exclusion d'appels d'offres : la conformité est un prérequis commercial.",
          },
          {
            label: "Effet de levier",
            value: "Une mesure qui réduit 10 risques (MFA, sauvegardes testées) vaut mieux que 10 mesures ponctuelles : prioriser le ratio.",
          },
        ],
      },
      {
        kind: "text",
        text: "Erreur classique : demander « plus de budget sécurité » en bloc. Mieux : un plan pluriannuel lié aux niveaux de maturité visés, avec des jalons mesurables.",
      },
    ],
  },
  {
    id: "tableau-de-bord",
    title: "Tableau de bord : rapporter à la direction",
    level: 3,
    intro: "Traduire la technique en pilotage : le reporting qui décide.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : la direction ne veut pas des logs, elle veut savoir si le risque est maîtrisé et ce qu'il reste à faire — le tableau de bord traduit les indicateurs en décisions. Pourquoi : un RSSI sans reporting n'obtient ni budget ni arbitrage ; avec un bon reporting, la sécurité devient pilotable.",
      },
      {
        kind: "fields",
        title: "Un bon tableau de bord",
        fields: [
          {
            label: "Peu d'indicateurs",
            value: "5 à 8 KPI max (incidents, correctifs, conformité, formation) : au-delà, on ne lit plus.",
          },
          {
            label: "Tendances, pas instantanés",
            value: "L'évolution sur 12 mois vaut mieux qu'un chiffre isolé : c'est la trajectoire qui rassure ou alerte.",
          },
          {
            label: "Code couleur assumé",
            value: "Vert / orange / rouge avec seuils définis : la direction doit voir d'un coup d'œil où agir.",
          },
          {
            label: "Actions associées",
            value: "Chaque rouge pointe vers une action et un responsable : un indicateur sans plan n'est qu'une inquiétude.",
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
          "Partir des risques : chaque contrôle, chaque politique, chaque euro se justifie par un risque identifié.",
          "Écrire court et faire appliquer : mieux vaut 5 politiques vécues que 50 ignorées.",
          "Séparer les rôles : définir, exécuter, vérifier — jamais la même personne pour les trois.",
          "Mesurer peu mais bien : 8 à 12 indicateurs suivis valent mieux que 40 décoratifs.",
          "Auditer régulièrement : l'audit interne annuel est le pouls du SMSI.",
          "Revoir avec la direction : sans arbitrage au sommet, la gouvernance est théorique.",
          "Penser cycle, pas projet : PDCA en continu, revue des risques au moins annuelle.",
          "Impliquer les métiers : la sécurité co-construite est appliquée, la sécurité imposée est contournée.",
          "Mutualiser les preuves : un seul système de gouvernance pour ISO, NIS2, RGPD — pas trois silos.",
          "Rester honnête : une non-conformité assumée avec un plan vaut mieux qu'une conformité de façade.",
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
            label: "ISO (iso.org)",
            value: "Les textes des normes 27001, 27002, 27005 : la référence, payante mais incontournable pour un praticien.",
          },
          {
            label: "ANSSI (ssi.gouv.fr)",
            value: "Guides, méthode EBIOS RM, recommandations : public, gratuit, de haute qualité.",
          },
          {
            label: "NIST (nist.gov/cyberframework)",
            value: "Le Cybersecurity Framework 2.0 et ses ressources : gratuit, en anglais, très opérationnel.",
          },
          {
            label: "EUR-Lex (eur-lex.europa.eu)",
            value: "Les textes officiels RGPD, NIS2, DORA : toujours vérifier la version en vigueur et la transposition nationale.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Organismes : Cloud Security Alliance (cloudsecurityalliance.org) pour le volet cloud de la gouvernance.",
          "Pratique : les projets de cette page (dossier SMSI, plan NIS2, audit blanc) constituent déjà un portfolio.",
          "Veille : suivre les publications de l'ANSSI et les mises à jour des référentiels — la conformité est un texte vivant.",
          "Communauté : associations professionnelles (CLUSIF en France) pour les retours d'expérience entre praticiens.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "La gouvernance maîtrisée, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Alimenter la gouvernance par le terrain : SOC & Détection — comprendre les indicateurs et la réponse qu'on pilote.",
          "Comprendre la preuve : Forensique — ce que le rapport d'investigation apporte aux décisions et aux obligations légales.",
          "Tester les défenses : Pentest — la méthodologie d'évaluation cadrée, pour challenger les contrôles en connaissance de cause.",
          "Sécuriser le socle technique : Cloud Security et Cryptographie — les contrôles technologiques qu'on exige des équipes.",
          "Prévenir à la source : Secure Coding — intégrer la sécurité au développement via des politiques applicables.",
          "Revenir à la roadmap : valider Gouvernance & Conformité et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Platform Engineering : de zéro à la conception
 * d'une plateforme interne (IDP) qui multiplie la productivité des équipes.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Compétence conceptuelle : pas d'installation, les commandes se limitent
 * aux outils certains (kubectl, terraform, helm). Les outils comme Backstage
 * ou Argo CD sont mentionnés comme outils, jamais comme compétences.
 */
export const LEARNING_PLATFORM_ENGINEERING: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est le platform engineering et pourquoi il existe.",
    blocks: [
      {
        kind: "text",
        text: "Le platform engineering consiste à construire une plateforme interne — un ensemble d'outils, de services et de workflows — qui permet aux développeurs de livrer des applications sans devenir experts en infrastructure. Au lieu que chaque équipe réinvente le déploiement, la sécurité et l'observabilité, une équipe plateforme les fournit en self-service.",
      },
      {
        kind: "text",
        text: "Le problème résolu : à mesure qu'une organisation grandit, Kubernetes, Terraform, la sécurité et la conformité créent une charge cognitive énorme pour les développeurs. Résultat : des livraisons lentes, des configurations bricolées, des incidents. La plateforme absorbe cette complexité et expose des chemins simples et sécurisés.",
      },
      {
        kind: "text",
        text: "En pratique : un développeur crée un service depuis un template, le déploie via un portail ou une CLI, et la plateforme s'occupe du cluster, des pipelines, des secrets, du monitoring et des politiques — avec des garde-fous, pas des tickets.",
      },
    ],
  },
  {
    id: "plateforme-comme-produit",
    title: "La plateforme est un produit",
    level: 1,
    intro:
      "Le changement de paradigme : traiter les développeurs comme des utilisateurs.",
    blocks: [
      {
        kind: "diagram",
        title: "Plateforme comme produit",
        lines: [
          "Avant (chaque équipe bricole) :",
          "  Équipe A ──► son pipeline, son cluster, ses scripts",
          "  Équipe B ──► son pipeline, son cluster, ses scripts",
          "  Équipe C ──► son pipeline, son cluster, ses scripts",
          "  = 3× la complexité, 0 standard, incidents en cascade",
          "",
          "Après (plateforme produit) :",
          "  Équipe plateforme ──► IDP (portail, CLI, API, templates)",
          "       ▲                       │         │         │",
          "       │ (feedback)              ▼         ▼         ▼",
          "       └───────────── Équipe A  Équipe B  Équipe C",
          "  = 1 complexité gérée par des experts, N équipes autonomes",
        ],
      },
      {
        kind: "text",
        text: "Traiter la plateforme comme un produit signifie : des utilisateurs (les développeurs), un backlog, des retours d'expérience, des métriques d'adoption et de satisfaction. Une plateforme que personne n'utilise est un échec, même si elle est techniquement parfaite.",
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
      "Ce qu'il faut connaître avant de concevoir une plateforme.",
    blocks: [
      {
        kind: "fields",
        title: "Connaissances requises",
        fields: [
          {
            label: "Infrastructure",
            value:
              "Comprendre Kubernetes, Terraform, Docker et les pipelines CI/CD : on ne peut pas abstraire ce qu'on ne maîtrise pas (`kubernetes`, `terraform`, `docker`, `cicd`).",
          },
          {
            label: "Git et Linux",
            value:
              "La plateforme vit dans des dépôts Git et tourne sur Linux : les fondamentaux (`git`, `linux`).",
          },
          {
            label: "Culture DevOps",
            value:
              "Automatisation, infrastructure as code, responsabilité partagée : le socle culturel (`devops`, `iac`).",
          },
        ],
      },
    ],
  },
  {
    id: "ecosysteme-outils",
    title: "L'écosystème d'une plateforme",
    level: 2,
    intro:
      "Les briques techniques que la plateforme orchestre.",
    blocks: [
      {
        kind: "fields",
        title: "Les couches",
        fields: [
          {
            label: "Orchestration",
            value:
              "Kubernetes : là où tournent les applications. La plateforme masque sa complexité sans la supprimer.",
          },
          {
            label: "Infrastructure as Code",
            value:
              "Terraform (et modules) : provisionner clusters, réseaux, bases de données de façon reproductible.",
          },
          {
            label: "Livraison",
            value:
              "Pipelines CI/CD et GitOps : du commit au déploiement, automatisé et traçable.",
          },
          {
            label: "Observabilité",
            value:
              "Métriques, logs, traces : voir ce qui se passe, être alerté quand ça casse (`monitoring`, `grafana`).",
          },
          {
            label: "Interface",
            value:
              "Portail développeur (type Backstage), CLI et API : les points d'entrée self-service de la plateforme.",
          },
        ],
      },
    ],
  },
  {
    id: "premier-pas-self-service",
    title: "Le self-service en action",
    level: 2,
    intro:
      "À quoi ressemble la vie d'un développeur sur une bonne plateforme.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer un service",
            detail:
              "Depuis le portail : choisir le template « API », renseigner le nom et l'équipe. Le dépôt est créé avec pipeline, manifests et monitoring pré-câblés.",
          },
          {
            title: "Développer",
            detail:
              "Coder normalement. Chaque push déclenche le pipeline : tests, build, image, déploiement en environnement de développement.",
          },
          {
            title: "Promouvoir",
            detail:
              "Merger vers la branche principale : GitOps déploie en staging puis production, avec les politiques de sécurité vérifiées automatiquement.",
          },
          {
            title: "Opérer",
            detail:
              "Dashboards et alertes fournis par défaut. Un incident ? Le runbook est lié à l'alerte, les logs sont à un clic.",
          },
          {
            title: "Demander plus",
            detail:
              "Besoin d'une base de données ? Le catalogue propose PostgreSQL managé : un formulaire, et la plateforme provisionne avec sauvegardes et monitoring.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le contraste avec l'ancien monde : ouvrir des tickets à l'équipe infra, attendre des jours, copier-coller des YAML d'un autre projet. Le self-service supprime l'attente, pas le contrôle.",
      },
    ],
  },
  {
    id: "golden-paths",
    title: "Golden paths : les chemins pavés",
    level: 2,
    intro:
      "Le concept central : des chemins par défaut excellents, pas des obligations.",
    blocks: [
      {
        kind: "text",
        text: "Un golden path (« chemin doré ») est la façon recommandée — et la plus simple — d'accomplir une tâche sur la plateforme : déployer une API, ajouter une base de données, exposer un service. Il est pavé : templates, pipelines, sécurité et observabilité sont déjà intégrés.",
      },
      {
        kind: "fields",
        title: "Pavé, pas muré",
        fields: [
          {
            label: "Par défaut, pas obligatoire",
            value:
              "Le golden path est le choix le plus simple, mais une équipe avec un besoin exotique peut sortir du chemin — en assumant la complexité supplémentaire.",
          },
          {
            label: "Opinionated mais documenté",
            value:
              "Chaque choix du chemin est expliqué : pourquoi cette base, pourquoi ce pipeline. La confiance vient de la transparence.",
          },
          {
            label: "Évolutif",
            value:
              "Les golden paths se mettent à jour (nouvelle version de Kubernetes, nouvelle politique) : les équipes en bénéficient sans effort.",
          },
        ],
      },
    ],
  },
  {
    id: "idp-composants",
    title: "IDP : les composants",
    level: 2,
    intro:
      "Anatomie d'une Internal Developer Platform.",
    blocks: [
      {
        kind: "diagram",
        title: "Les composants d'un IDP",
        lines: [
          "┌──────── Portail développeur (catalogue, docs, actions) ────────┐",
          "│  CLI + API (mêmes actions, scriptables)                        │",
          "├────────────────────────────────────────────────────────────────┤",
          "│  Templates de services (scaffolding : nouveau service en 1 clic)│",
          "│  Catalogue d'infrastructure (BDD, files, buckets : self-service) │",
          "│  Pipelines standard (build, test, déploiement)                  │",
          "├────────────────────────────────────────────────────────────────┤",
          "│  Socle : Kubernetes + Terraform + GitOps + politiques          │",
          "│  Transverse : observabilité, secrets, sécurité, coûts           │",
          "└────────────────────────────────────────────────────────────────┘",
        ],
      },
      {
        kind: "text",
        text: "L'IDP n'est pas un produit unique à acheter : c'est un assemblage. Des portails open source comme Backstage fournissent le catalogue et les templates ; le reste (pipelines, IaC, GitOps) s'intègre autour. Construire un IDP, c'est composer, pas réinventer.",
      },
    ],
  },
  {
    id: "catalogue-services",
    title: "Catalogue de services",
    level: 2,
    intro:
      "L'inventaire vivant de tout ce qui tourne.",
    blocks: [
      {
        kind: "text",
        text: "Le catalogue recense chaque service : qui le possède, où est son code, où il tourne, sa documentation, ses dépendances, son état de santé. Fini le « à qui appartient ce service ? » pendant un incident à 3h du matin.",
      },
      {
        kind: "list",
        items: [
          "Propriété claire : chaque service a une équipe propriétaire — la base de la responsabilisation.",
          "Dépendances visibles : quel service appelle quoi, quelle base utilise qui — la carte du système.",
          "Documentation à côté du service : runbooks, ADR, contacts — pas dans un wiki oublié.",
          "Le catalogue se remplit automatiquement (découverte depuis Git et les clusters), pas à la main.",
        ],
      },
    ],
  },
  {
    id: "api-cli-plateforme",
    title: "API et CLI : la plateforme scriptable",
    level: 2,
    intro:
      "Le portail est pour les humains, l'API est pour les machines.",
    blocks: [
      {
        kind: "text",
        text: "Tout ce que fait le portail doit être faisable via API et CLI : créer un service, provisionner une base, déclencher un déploiement. C'est ce qui permet d'automatiser (scripts, ChatOps, intégrations) et de tester la plateforme elle-même.",
      },
      {
        kind: "list",
        items: [
          "Parité portail/API : aucune action « réservée au clic » — sinon l'automatisation est impossible.",
          "La CLI est l'interface des power users : rapide, scriptable, intégrable aux workflows existants.",
          "Versionner l'API : les consommateurs (scripts, outils) ne doivent pas casser à chaque évolution.",
          "Authentification unique (SSO) sur tous les points d'entrée : pas de credentials parallèles.",
        ],
      },
    ],
  },
  {
    id: "iac-plateforme",
    title: "IaC : le socle de la plateforme",
    level: 2,
    intro:
      "Toute l'infrastructure de la plateforme est du code.",
    blocks: [
      {
        kind: "command",
        label: "Valider un module Terraform",
        command: "terraform validate",
        why: "Vérifie la syntaxe et la cohérence interne d'une configuration Terraform sans l'appliquer. Les modules de la plateforme (cluster, réseau, base managée) sont validés à chaque modification, en CI.",
        verify: "terraform plan -out=plan.bin",
      },
      {
        kind: "command",
        label: "Prévisualiser les changements",
        command: "terraform plan",
        why: "Montre ce que Terraform va créer, modifier ou détruire avant de le faire. Sur la plateforme, chaque changement d'infrastructure passe par un plan relu — jamais d'apply aveugle sur le socle partagé.",
      },
      {
        kind: "text",
        text: "La plateforme elle-même est provisionnée en IaC (dogfooding) : clusters, registres, DNS, sauvegardes. Les équipes consomment des modules validés, pas du Terraform brut — l'abstraction protège des erreurs tout en gardant la traçabilité.",
      },
    ],
  },
  {
    id: "kubernetes-plateforme",
    title: "Kubernetes vu par la plateforme",
    level: 2,
    intro:
      "Le cluster est un détail d'implémentation — bien géré.",
    blocks: [
      {
        kind: "command",
        label: "Voir l'état du cluster",
        command: "kubectl get pods -A",
        why: "Liste les pods de tous les namespaces : la vue d'ensemble qu'un opérateur plateforme consulte en premier lors d'un incident. Les développeurs, eux, voient leurs services dans le portail, pas cette liste brute.",
      },
      {
        kind: "command",
        label: "Déployer un manifeste",
        command: "kubectl apply -f service.yaml",
        why: "Applique un manifeste de façon déclarative. Sur la plateforme, les développeurs ne tapent presque jamais cette commande : c'est GitOps qui l'exécute pour eux, depuis le dépôt.",
      },
      {
        kind: "text",
        text: "La plateforme fournit des abstractions au-dessus de Kubernetes (templates, namespaces par équipe, quotas, policies) : le développeur décrit son service, la plateforme génère le YAML correct et sécurisé.",
      },
    ],
  },
  {
    id: "gitops-bases",
    title: "GitOps : Git comme source de vérité",
    level: 2,
    intro:
      "L'état désiré est dans Git ; des agents le réalisent.",
    blocks: [
      {
        kind: "text",
        text: "En GitOps, tout l'état désiré (applications, infrastructure, configuration) est versionné dans Git. Des agents (comme Argo CD ou Flux) observent les dépôts et convergent les clusters vers cet état. Conséquences : historique complet, rollback par revert, dérives détectées automatiquement.",
      },
      {
        kind: "list",
        items: [
          "Déclaratif : on décrit ce que l'on veut, l'agent s'occupe du comment.",
          "Pull, pas push : c'est l'agent dans le cluster qui tire les changements — pas besoin d'ouvrir le cluster vers l'extérieur.",
          "Séparation app / infra : dépôts d'application (code) et dépôts d'état (manifestes) distincts.",
          "La plateforme expose GitOps sans l'imposer à la main : le développeur merge, la synchronisation suit.",
        ],
      },
    ],
  },
  {
    id: "securite-gouvernance",
    title: "Sécurité et gouvernance intégrées",
    level: 2,
    intro:
      "La conformité par défaut, pas par audit.",
    blocks: [
      {
        kind: "text",
        text: "Sur une plateforme, la sécurité n'est pas une étape que l'on ajoute après : elle est dans les templates et les pipelines. Images scannées, secrets jamais en clair, politiques réseau par défaut, SBOM générés — le développeur hérite de tout cela sans y penser.",
      },
      {
        kind: "list",
        items: [
          "Shift left : les contrôles s'exécutent tôt (lint de manifests, scan d'images en CI), pas au déploiement.",
          "Politiques comme code : les règles (pas de conteneur root, ressources requises) sont versionnées et testées.",
          "Garde-fous, pas blocages opaques : un refus de déploiement explique comment corriger.",
          "Traçabilité : qui a déployé quoi, quand, avec quelle approbation — pour l'audit comme pour le debug.",
        ],
      },
    ],
  },
  {
    id: "erreurs-debutants-plateforme",
    title: "Erreurs classiques des débutants",
    level: 2,
    intro:
      "Les pièges les plus fréquents quand on découvre le platform engineering.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Symptôme", "Correction"],
        rows: [
          ["Construire avant d'écouter", "Plateforme inutilisée", "Interviewer les équipes d'abord, construire ensuite"],
          ["Tout abstraire d'un coup", "Projet de 18 mois sans valeur", "Thinnest viable platform : le minimum utile d'abord"],
          ["Imposer au lieu de proposer", "Shadow IT, contournement", "Golden paths attractifs, pas obligatoires"],
          ["Copier la plateforme d'un géant", "Usine à gaz inadaptée", "S'inspirer, adapter à sa taille et ses contraintes"],
          ["Oublier le support", "Adoption qui s'effondre au 1er incident", "Équipe plateforme = support, docs, runbooks"],
          ["Pas de métriques", "Impossible de prouver la valeur", "Mesurer adoption, lead time, satisfaction dès le début"],
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "architecture-plateforme",
    title: "Architecture d'une plateforme",
    level: 3,
    intro:
      "Les couches et leurs responsabilités.",
    blocks: [
      {
        kind: "diagram",
        title: "Couches d'une plateforme",
        lines: [
          "Couche 5 — Expérience développeur",
          "  Portail, CLI, API, documentation, support",
          "",
          "Couche 4 — Self-service",
          "  Templates, catalogue, actions (BDD, envs, déploiements)",
          "",
          "Couche 3 — Livraison",
          "  Pipelines CI/CD, GitOps, progressive delivery, gestion des versions",
          "",
          "Couche 2 — Runtime",
          "  Kubernetes (namespaces, quotas, policies), service mesh, ingress",
          "",
          "Couche 1 — Fondations",
          "  IaC (Terraform), réseau, identités, secrets, observabilité, coûts",
        ],
      },
      {
        kind: "text",
        text: "Chaque couche a une API claire vers la suivante. L'erreur classique est de mélanger les couches (du Terraform dans les templates applicatifs, des secrets dans les pipelines) : la plateforme devient alors un monolithe fragile au lieu d'un assemblage maintenable.",
      },
    ],
  },
  {
    id: "thinnest-viable-platform",
    title: "Thinnest Viable Platform",
    level: 3,
    intro:
      "Commencer par le minimum qui apporte de la valeur.",
    blocks: [
      {
        kind: "text",
        text: "La Thinnest Viable Platform est la version la plus fine de la plateforme qui résout un vrai problème : par exemple, « déployer un service sur Kubernetes via un template et un pipeline standard ». Pas de catalogue parfait, pas de portail sur-mesure — juste le chemin critique, utilisé par une première équipe pilote.",
      },
      {
        kind: "list",
        items: [
          "Choisir un cas d'usage douloureux et fréquent : c'est lui qui prouve la valeur.",
          "Une équipe pilote volontaire : elle pardonne les aspérités et donne du feedback.",
          "Itérer en public : changelog, démos, écoute — la plateforme se construit avec ses utilisateurs.",
          "Résister au big bang : chaque couche ajoutée doit répondre à un besoin exprimé, pas anticipé.",
        ],
      },
    ],
  },
  {
    id: "developer-experience-dora",
    title: "DX et métriques DORA",
    level: 3,
    intro:
      "Mesurer ce que la plateforme change vraiment.",
    blocks: [
      {
        kind: "text",
        text: "La Developer Experience (DX) est la qualité de vie des développeurs sur la plateforme : temps pour créer un service, clarté des erreurs, documentation. Les métriques DORA (issues de la recherche DevOps) mesurent l'impact : fréquence de déploiement, délai de changement, temps de rétablissement, taux d'échec.",
      },
      {
        kind: "table",
        headers: ["Métrique DORA", "Question", "Levier plateforme"],
        rows: [
          ["Fréquence de déploiement", "À quelle fréquence livre-t-on ?", "Pipelines standard, GitOps"],
          ["Délai de changement", "Commit → production : combien de temps ?", "Automatisation, environnements éphémères"],
          ["Temps de rétablissement", "Incident → service restauré ?", "Rollback GitOps, runbooks, observabilité"],
          ["Taux d'échec des changements", "Combien de déploiements causent un incident ?", "Tests, progressive delivery, politiques"],
        ],
      },
      {
        kind: "text",
        text: "Ces quatre métriques sont le tableau de bord de l'équipe plateforme : si elles s'améliorent, la plateforme crée de la valeur. Les compléter par des enquêtes de satisfaction (NPS développeur) pour le qualitatif.",
      },
    ],
  },
  {
    id: "cognitive-load",
    title: "Charge cognitive : le vrai problème",
    level: 3,
    intro:
      "Le concept fondateur, issu de Team Topologies.",
    blocks: [
      {
        kind: "text",
        text: "La charge cognitive, c'est la quantité de connaissances qu'une équipe doit mobiliser pour faire son travail : Kubernetes, Terraform, sécurité, réseau, observabilité… Au-delà d'un seuil, l'équipe ralentit et fait des erreurs. Le platform engineering existe pour ramener chaque équipe sous ce seuil.",
      },
      {
        kind: "fields",
        title: "Les trois charges (Team Topologies)",
        fields: [
          {
            label: "Intrinsèque",
            value: "La complexité du métier lui-même : incompressible, c'est le travail de l'équipe.",
          },
          {
            label: "Extrinsèque",
            value: "La complexité des outils et processus : c'est elle que la plateforme doit réduire.",
          },
          {
            label: "Germanique (germane)",
            value: "L'effort d'apprentissage utile : monter en compétence sur ce qui compte vraiment.",
          },
        ],
      },
      {
        kind: "text",
        text: "Test simple : un nouveau développeur déploie-t-il en production sa première semaine sans aide ? Si non, la charge extrinsèque est trop haute — c'est le backlog de l'équipe plateforme.",
      },
    ],
  },
  {
    id: "team-topologies-modes",
    title: "Team Topologies : organiser les équipes",
    level: 3,
    intro:
      "Les types d'équipes et leurs modes d'interaction.",
    blocks: [
      {
        kind: "fields",
        title: "Les 4 types d'équipes",
        fields: [
          {
            label: "Stream-aligned",
            value: "Les équipes produit : elles livrent de la valeur aux utilisateurs, ce sont les clientes de la plateforme.",
          },
          {
            label: "Platform",
            value: "L'équipe plateforme : elle fournit les services internes en self-service. Son succès = l'autonomie des autres.",
          },
          {
            label: "Enabling",
            value: "Équipes d'accompagnement temporaire : elles aident à adopter (ex. coaching Kubernetes), puis se retirent.",
          },
          {
            label: "Complicated-subsystem",
            value: "Équipes sur les sous-systèmes complexes (moteur de recherche, trading) : la plateforme ne les absorbe pas.",
          },
        ],
      },
      {
        kind: "text",
        text: "Modes d'interaction : collaboration (projet commun temporaire), X-as-a-Service (la plateforme en self-service — le mode normal), facilitation (aide à adopter). L'anti-pattern : l'équipe plateforme qui devient un goulot (tout passe par des tickets).",
      },
    ],
  },
  {
    id: "golden-paths-detail",
    title: "Golden paths en détail",
    level: 3,
    intro:
      "Concevoir des chemins que les équipes veulent emprunter.",
    blocks: [
      {
        kind: "text",
        text: "Un bon golden path combine : un template de démarrage (code, Dockerfile, manifests, pipeline), une documentation pas-à-pas, des valeurs par défaut sensées (ressources, sondes, alertes) et une porte de sortie documentée. Exemple : « API REST Python » — de zéro à la production en une journée.",
      },
      {
        kind: "list",
        items: [
          "Un golden path par archétype : API synchrone, worker asynchrone, site statique, tâche planifiée — pas un template générique.",
          "Les templates sont du code vivant : tests, mises à jour de dépendances, revues — comme un produit.",
          "Outils de scaffolding : des générateurs comme Cookiecutter ou Copier, ou les Software Templates d'un portail type Backstage.",
          "Mesurer l'adoption : quel pourcentage de nouveaux services utilise les templates ? En dessous de 70 %, le chemin a un problème.",
        ],
      },
    ],
  },
  {
    id: "self-service-actions",
    title: "Actions self-service",
    level: 3,
    intro:
      "Au-delà des templates : les opérations du quotidien en un clic.",
    blocks: [
      {
        kind: "fields",
        title: "Les actions typiques",
        fields: [
          {
            label: "Provisionner une ressource",
            value: "Base de données, file de messages, bucket : formulaire → IaC → ressource prête avec sauvegardes et monitoring.",
          },
          {
            label: "Créer un environnement",
            value: "Environnement éphémère par branche : tester en conditions réelles sans attendre.",
          },
          {
            label: "Gérer les accès",
            value: "Demande d'accès à un service, revue par le propriétaire, traçabilité — sans ticket manuel.",
          },
          {
            label: "Opérations",
            value: "Redémarrer, scaler, rollback : les actions sûres exposées, les dangereuses gardées.",
          },
        ],
      },
      {
        kind: "text",
        text: "Chaque action self-service remplace un ticket et des jours d'attente. Règle de conception : l'action doit être sûre par construction (quotas, validations, dry-run) — l'utilisateur ne peut pas se tirer une balle dans le pied.",
      },
    ],
  },
  {
    id: "environnements-ephemeres",
    title: "Environnements éphémères",
    level: 3,
    intro:
      "Un environnement par branche : tester comme en production.",
    blocks: [
      {
        kind: "text",
        text: "À chaque pull request, la plateforme déploie l'application dans un environnement jetable, fidèle à la production (même base de données éphémère, mêmes variables). La PR est testée en conditions réelles, puis l'environnement est détruit au merge.",
      },
      {
        kind: "list",
        items: [
          "Fidélité > perfection : proche de la prod suffit, l'identique coûte trop cher.",
          "Données : jeux de données anonymisés et réduits — jamais de copie de production.",
          "Coûts sous contrôle : destruction automatique (TTL), quotas par équipe, alertes de dérive.",
          "Le gain : les bugs d'intégration sont trouvés avant le merge, pas en staging.",
        ],
      },
    ],
  },
  {
    id: "catalogue-scorecards",
    title: "Scorecards : mesurer la maturité",
    level: 3,
    intro:
      "Le catalogue ne recense pas seulement : il évalue.",
    blocks: [
      {
        kind: "text",
        text: "Les scorecards attribuent à chaque service un score sur des critères : documentation à jour, alertes configurées, runbook existant, dépendances à jour, couverture de tests. Visibles par tous, ils créent une émulation saine — sans blame.",
      },
      {
        kind: "list",
        items: [
          "Critères automatiques d'abord : ce qui se mesure sans effort (sondes, alertes, versions).",
          "Seuils progressifs : bronze, argent, or — les équipes progressent à leur rythme.",
          "Jamais punitif : un mauvais score déclenche de l'aide (enabling), pas des sanctions.",
          "Les scorecards alimentent les revues d'architecture et les plans de remédiation.",
        ],
      },
    ],
  },
  {
    id: "iac-modules-registry",
    title: "Modules IaC et registre privé",
    level: 3,
    intro:
      "L'infrastructure réutilisable : des modules, pas du copier-coller.",
    blocks: [
      {
        kind: "text",
        text: "L'équipe plateforme publie des modules Terraform validés (cluster, base managée, bucket, réseau) dans un registre privé. Les équipes les consomment avec quelques paramètres — sans écrire de Terraform complexe ni réinventer les bonnes pratiques.",
      },
      {
        kind: "list",
        items: [
          "Versionner les modules (semver) : les équipes choisissent quand migrer, pas de breaking change surprise.",
          "Tester les modules : `terraform validate`, plans sur environnements de test, tests d'intégration.",
          "Documentation avec exemples : un module sans exemple d'usage est un module inutilisé.",
          "Politiques intégrées : les modules appliquent les standards (chiffrement, tags, sauvegardes) par construction.",
        ],
      },
    ],
  },
  {
    id: "policy-as-code",
    title: "Policy as Code",
    level: 3,
    intro:
      "Des règles automatiques au lieu de revues manuelles.",
    blocks: [
      {
        kind: "text",
        text: "Les politiques (« pas de conteneur en root », « ressources CPU/mémoire obligatoires », « registre d'images approuvé ») sont écrites en code (des outils comme Open Policy Agent) et évaluées automatiquement : à l'admission dans le cluster et en CI sur les manifests.",
      },
      {
        kind: "list",
        items: [
          "Deux modes : audit (signale) puis enforce (bloque) — on commence toujours par l'audit pour mesurer l'impact.",
          "Messages d'erreur actionnables : la politique refusée explique comment se mettre en conformité.",
          "Exceptions tracées : certaines charges ont de bonnes raisons de déroger — avec expiration et approbation.",
          "Les politiques sont du code : versionnées, testées, revues comme le reste.",
        ],
      },
    ],
  },
  {
    id: "secrets-plateforme",
    title: "Gestion des secrets",
    level: 3,
    intro:
      "Jamais de secret en clair : l'architecture à mettre en place.",
    blocks: [
      {
        kind: "diagram",
        title: "Le chemin d'un secret",
        lines: [
          "Coffre central (Vault, gestionnaire cloud)",
          "   │  (les humains n'y accèdent qu'en lecture auditée)",
          "   ▼",
          "Synchronisation vers le cluster (External Secrets)",
          "   │",
          "   ▼",
          "Secret Kubernetes monté dans le pod",
          "   │  (jamais dans l'image, jamais dans Git)",
          "   ▼",
          "Application (variable d'environnement ou fichier)",
        ],
      },
      {
        kind: "list",
        items: [
          "Rotation : les secrets ont une durée de vie, la plateforme automatise leur renouvellement.",
          "Séparation : chaque équipe ne voit que ses secrets (RBAC sur le coffre).",
          "Audit : qui a lu quel secret, quand — indispensable pour la conformité.",
          "Le développeur ne manipule jamais la valeur : il référence un nom, la plateforme injecte.",
        ],
      },
    ],
  },
  {
    id: "observabilite-plateforme",
    title: "Observabilité fournie par défaut",
    level: 3,
    intro:
      "Chaque service naît observable.",
    blocks: [
      {
        kind: "text",
        text: "La plateforme câble l'observabilité dans les templates : métriques exposées et collectées, logs agrégés avec corrélation, traces distribuées, dashboards générés, alertes de base. Le développeur n'a rien à configurer pour voir son service.",
      },
      {
        kind: "fields",
        title: "Les trois piliers, offerts",
        fields: [
          {
            label: "Métriques",
            value: "Les quatre signaux d'or par service : latence, trafic, erreurs, saturation — collectés automatiquement.",
          },
          {
            label: "Logs",
            value: "Agrégation centrale, format structuré imposé par les templates, corrélation par trace ID.",
          },
          {
            label: "Traces",
            value: "Instrumentation via les SDK : suivre une requête à travers les services sans effort.",
          },
        ],
      },
      {
        kind: "text",
        text: "Standardiser les conventions (nommage, labels, champs de logs) : c'est ce qui permet des dashboards et des alertes transverses qui fonctionnent pour tous les services.",
      },
    ],
  },
  {
    id: "slo-error-budgets",
    title: "SLO et error budgets",
    level: 3,
    intro:
      "Des objectifs de fiabilité qui guident les arbitrages.",
    blocks: [
      {
        kind: "text",
        text: "Un SLO (Service Level Objective) est un objectif mesurable : « 99,9 % des requêtes réussies en 30 jours ». L'error budget est la marge d'erreur tolérée (0,1 %). Tant que le budget n'est pas épuisé, on innove vite ; épuisé, on stabilise. C'est le contrat entre produit et fiabilité.",
      },
      {
        kind: "list",
        items: [
          "La plateforme fournit les SLO types par archétype (API, worker) : les équipes les adoptent ou les ajustent.",
          "Alertes sur burn rate : être prévenu quand le budget se consomme trop vite, pas quand il est vide.",
          "Les SLO pilotent les décisions : gel des features si le budget est épuisé, jamais de débat subjectif.",
          "Commencer simple : disponibilité et latence, sur les services critiques d'abord.",
        ],
      },
    ],
  },
  {
    id: "multi-tenancy",
    title: "Multi-tenancy : isoler les équipes",
    level: 3,
    intro:
      "Partager le cluster sans partager les problèmes.",
    blocks: [
      {
        kind: "text",
        text: "Plusieurs équipes partagent les clusters : il faut isoler. Namespaces par équipe (ou par service), quotas de ressources (CPU/mémoire), NetworkPolicies (qui parle à qui), RBAC (qui peut quoi). Un service qui fuit ne doit pas affamer ses voisins.",
      },
      {
        kind: "list",
        items: [
          "Quotas : chaque namespace a ses limites — le noisy neighbor est contenu.",
          "RBAC : les équipes administrent leur namespace, pas le cluster.",
          "Politiques réseau par défaut : deny-all puis ouvertures explicites — le zero trust interne.",
          "Séparer les environnements critiques : la production peut mériter des clusters dédiés.",
        ],
      },
    ],
  },
  {
    id: "finops",
    title: "FinOps : maîtriser les coûts",
    level: 3,
    intro:
      "Le cloud facture à l'usage : la plateforme rend les coûts visibles.",
    blocks: [
      {
        kind: "text",
        text: "FinOps, c'est la gestion financière du cloud : allouer les coûts par équipe et par service, détecter le gaspillage, optimiser. La plateforme tague toutes les ressources (équipe, service, environnement) pour une facturation interne juste.",
      },
      {
        kind: "list",
        items: [
          "Visibilité : chaque équipe voit sa consommation — on n'optimise que ce que l'on mesure.",
          "Alertes de dérive : un coût qui double d'un jour à l'autre mérite une investigation.",
          "Droitsizing : les métriques d'usage guident les demandes de ressources (ni sur-, ni sous-dimensionné).",
          "Environnements éphémères à TTL : la source de gaspillage n°1, éteinte automatiquement.",
          "Showback avant chargeback : montrer les coûts d'abord, facturer ensuite — l'adhésion avant la contrainte.",
        ],
      },
    ],
  },
  {
    id: "cicd-templates-plateforme",
    title: "Pipelines standard",
    level: 3,
    intro:
      "Un pipeline par archétype, maintenu par la plateforme.",
    blocks: [
      {
        kind: "text",
        text: "Au lieu que chaque équipe écrive son pipeline, la plateforme fournit des pipelines templates : lint, tests, build, scan de sécurité, déploiement GitOps. Les équipes les consomment et ne personnalisent que les étapes métier.",
      },
      {
        kind: "list",
        items: [
          "Étapes imposées vs optionnelles : sécurité et conformité imposées, le reste configurable.",
          "Mises à jour centralisées : une faille dans une action CI se corrige une fois, pour tous.",
          "Temps de pipeline : un pipeline de 30 minutes tue l'itération — paralléliser, cacher, optimiser.",
          "Secrets de CI gérés par la plateforme : les équipes ne manipulent pas de tokens.",
        ],
      },
    ],
  },
  {
    id: "gitops-detail",
    title: "GitOps avancé",
    level: 3,
    intro:
      "Au-delà des bases : les patterns qui tiennent en production.",
    blocks: [
      {
        kind: "fields",
        title: "Patterns",
        fields: [
          {
            label: "App-of-apps",
            value:
              "Une application GitOps qui déploie les autres : le cluster se bootstrappe depuis un seul point d'entrée versionné.",
          },
          {
            label: "Dépôts séparés",
            value:
              "Code applicatif et état déployé dans des dépôts distincts : les pipelines mettent à jour les manifests sans toucher au code.",
          },
          {
            label: "Drift detection",
            value:
              "Toute modification manuelle sur le cluster est détectée et revertée (ou alertée) : plus de `kubectl edit` sauvage.",
          },
          {
            label: "Promotion par PR",
            value:
              "Passer de staging à production = une pull request sur le dépôt d'état : revue, approbation, traçabilité.",
          },
        ],
      },
      {
        kind: "text",
        text: "Outils : Argo CD et Flux sont les agents GitOps de référence pour Kubernetes. La plateforme les opère ; les développeurs voient leurs déploiements dans le portail.",
      },
    ],
  },
  {
    id: "progressive-delivery",
    title: "Progressive delivery",
    level: 3,
    intro:
      "Déployer sans tout casser : canary, blue-green, feature flags.",
    blocks: [
      {
        kind: "fields",
        title: "Les stratégies",
        fields: [
          {
            label: "Canary",
            value:
              "La nouvelle version reçoit 1 % puis 10 % puis 100 % du trafic : les métriques valident chaque étape, rollback automatique si ça dévie.",
          },
          {
            label: "Blue-green",
            value:
              "Deux environnements complets : on bascule le trafic d'un coup, avec retour instantané possible.",
          },
          {
            label: "Feature flags",
            value:
              "Activer une fonctionnalité pour un sous-ensemble d'utilisateurs sans redéployer : le découplage déploiement/release.",
          },
        ],
      },
      {
        kind: "text",
        text: "La plateforme fournit ces stratégies clés en main (des outils comme Flagger ou Argo Rollouts automatisent les canarys sur Kubernetes) : les équipes choisissent la stratégie, la mécanique est gérée.",
      },
    ],
  },
  {
    id: "portail-backstage",
    title: "Le portail développeur",
    level: 3,
    intro:
      "La vitrine de la plateforme : ce que les développeurs voient.",
    blocks: [
      {
        kind: "text",
        text: "Le portail est la page d'accueil de la plateforme : catalogue des services, documentation, création depuis les templates, actions self-service, état des déploiements. Backstage (open source, initialement Spotify) est la référence : catalogue, Software Templates et plugins en font un excellent point de départ plutôt qu'un portail sur-mesure.",
      },
      {
        kind: "list",
        items: [
          "Ne pas construire son portail from scratch : adapter un existant, investir dans les plugins métier.",
          "Le portail agrège, il ne duplique pas : il pointe vers Grafana, le CI, les logs — pas de réinvention.",
          "Recherche globale : trouver un service, une doc, un runbook en une requête.",
          "Le portail est le produit visible : son UX conditionne l'adoption de toute la plateforme.",
        ],
      },
    ],
  },
  {
    id: "dr-plan",
    title: "Reprise après sinistre",
    level: 3,
    intro:
      "La plateforme doit survivre à ses propres pannes.",
    blocks: [
      {
        kind: "text",
        text: "Le plan de reprise (DR) couvre : sauvegardes chiffrées et testées (etcd, bases, configurations), clusters dans plusieurs zones/régions, runbooks de reconstruction, exercices réguliers. Une sauvegarde jamais restaurée en exercice n'est pas une sauvegarde.",
      },
      {
        kind: "list",
        items: [
          "RPO/RTO définis : combien de données peut-on perdre, en combien de temps doit-on revenir.",
          "Git comme sauvegarde ultime : tout l'état désiré est versionné — reconstruire = réappliquer.",
          "Tester le DR : game days réguliers où l'on simule la perte d'une zone.",
          "La plateforme critique (GitOps, secrets, observabilité) est restaurée en premier : sans elle, rien d'autre ne revient.",
        ],
      },
    ],
  },
  {
    id: "debugging-plateforme",
    title: "Déboguer la plateforme",
    level: 3,
    intro:
      "Quand la plateforme elle-même est en panne : la méthode.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Qualifier",
            detail:
              "Un service impacté ou tous ? Un utilisateur ou tous ? Le périmètre détermine si c'est la plateforme ou un cas isolé.",
          },
          {
            title: "Vérifier le plan de contrôle",
            detail:
              "API Kubernetes, agents GitOps, pipelines : le plan de contrôle répond-il ? `kubectl get pods -A` sur les namespaces système.",
          },
          {
            title: "Lire les événements",
            detail:
              "Events Kubernetes, logs des contrôleurs, statut des synchronisations GitOps : la plateforme raconte ses pannes.",
          },
          {
            title: "Isoler la couche",
            detail:
              "Réseau, identités, secrets, stockage : tester chaque couche indépendamment plutôt que de tout suspecter.",
          },
          {
            title: "Communiquer",
            detail:
              "Page de statut à jour, canal d'incident, ETA honnêtes : pendant une panne de plateforme, la communication est la moitié du travail.",
          },
        ],
      },
    ],
  },
  {
    id: "tests-plateforme",
    title: "Tester la plateforme",
    level: 3,
    intro:
      "La plateforme est du logiciel : elle se teste comme tel.",
    blocks: [
      {
        kind: "fields",
        title: "Les niveaux de test",
        fields: [
          {
            label: "Templates",
            value:
              "Chaque template génère un service qui build, se déploie et passe ses tests : le scaffolding est testé en CI.",
          },
          {
            label: "Modules IaC",
            value:
              "`terraform validate` et `plan` en CI, tests d'intégration (des frameworks comme Terratest déploient vraiment les modules).",
          },
          {
            label: "Politiques",
            value:
              "Les règles de policy-as-code ont leurs propres tests : cas autorisés et interdits, avant de passer en enforce.",
          },
          {
            label: "Bout en bout",
            value:
              "Un cluster éphémère où l'on crée un service via la plateforme et vérifie qu'il tourne : le test ultime, en nightly.",
          },
        ],
      },
    ],
  },
  {
    id: "adoption-interne",
    title: "Faire adopter la plateforme",
    level: 3,
    intro:
      "La meilleure plateforme échoue sans adoption : la stratégie.",
    blocks: [
      {
        kind: "list",
        items: [
          "Commencer par les volontaires : les early adopters deviennent les ambassadeurs.",
          "Résoudre une douleur réelle en premier : l'adoption suit la valeur, pas les mémos.",
          "Documentation et support : un Slack/Teams dédié avec des réponses rapides vaut mieux qu'un wiki parfait.",
          "Champions par équipe : une personne formée qui aide ses pairs — l'adoption par capillarité.",
          "Communiquer les succès : metrics avant/après, témoignages — la preuve sociale interne.",
          "Ne jamais forcer la migration big bang : coexister avec l'ancien monde, rendre le nouveau irrésistible.",
        ],
      },
    ],
  },
  {
    id: "mesurer-succes",
    title: "Mesurer le succès",
    level: 3,
    intro:
      "Les indicateurs qui prouvent (ou pas) la valeur.",
    blocks: [
      {
        kind: "table",
        headers: ["Indicateur", "Ce qu'il mesure", "Cible indicative"],
        rows: [
          ["Adoption des templates", "% de nouveaux services via golden paths", "> 70 %"],
          ["Lead time", "Commit → production", "En baisse continue"],
          ["Tickets infra", "Demandes manuelles par mois", "En forte baisse"],
          ["Satisfaction (NPS dev)", "Les devs recommandent-ils la plateforme ?", "> 30"],
          ["MTTR", "Temps de rétablissement incident", "En baisse"],
          ["Couverture SLO", "% de services avec SLO définis", "> 80 %"],
        ],
      },
      {
        kind: "text",
        text: "Présenter ces métriques régulièrement à la direction : la plateforme est un investissement, et un investissement se justifie avec des chiffres. Sans mesure, le budget de l'équipe plateforme est le premier coupé.",
      },
    ],
  },
  {
    id: "anti-patterns",
    title: "Anti-patterns",
    level: 3,
    intro:
      "Les façons garanties de rater sa plateforme.",
    blocks: [
      {
        kind: "table",
        headers: ["Anti-pattern", "Description", "Alternative"],
        rows: [
          ["TicketOps déguisé", "Le « self-service » nécessite une approbation manuelle", "Automatiser l'approbation via politiques"],
          ["La plateforme cathédrale", "2 ans de construction sans utilisateur", "Thinnest viable platform + itérations"],
          ["Abstraction qui fuit", "Le dev doit comprendre Kubernetes quand même", "Soigner les messages d'erreur et les docs"],
          ["Snowflake par équipe", "Chaque équipe a sa variante du template", "Contribuer au template commun plutôt que forker"],
          ["Sécurité en option", "Les contrôles sont désactivables d'un flag", "Sécurité par défaut, dérogations tracées"],
          ["Pas de propriétaire", "La plateforme est un side-project de quelqu'un", "Équipe dédiée avec un backlog"],
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques-pro",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro:
      "Ce qui distingue une plateforme qui dure d'un projet qui s'essouffle.",
    blocks: [
      {
        kind: "list",
        items: [
          "Produit d'abord : utilisateurs, feedback, métriques d'adoption — pas juste de la technique.",
          "Thinnest viable platform : livrer tôt, itérer avec les utilisateurs réels.",
          "Golden paths attractifs : plus simples que le bricolage, pas imposés.",
          "Tout en code : IaC, politiques, pipelines, templates — versionné et testé.",
          "Sécurité et conformité par défaut, jamais en option.",
          "Observabilité et SLO fournis, pas à construire par chaque équipe.",
          "Documentation vivante, support réactif, champions internes.",
          "Mesurer DORA + satisfaction : prouver la valeur en continu.",
          "Dogfooding : l'équipe plateforme utilise sa propre plateforme.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes et solutions",
    level: 3,
    intro:
      "Les problèmes que l'on rencontre vraiment en platform engineering.",
    blocks: [
      {
        kind: "table",
        headers: ["Symptôme", "Cause probable", "Solution"],
        rows: [
          ["Personne n'utilise la plateforme", "Construite sans les utilisateurs", "Interviews, TVP sur une douleur réelle, itération"],
          ["Les équipes contournent les templates", "Templates trop rigides ou incomplets", "Porte de sortie documentée, templates modulaires"],
          ["Incidents en cascade", "Pas d'isolation (quotas, policies)", "Multi-tenancy : namespaces, quotas, NetworkPolicies"],
          ["Coûts qui explosent", "Pas de visibilité ni de TTL", "FinOps : tags, dashboards, destruction automatique"],
          ["Déploiements qui divergent", "Modifications manuelles sur le cluster", "GitOps strict + drift detection"],
          ["L'équipe plateforme est un goulot", "Tout passe par des tickets", "Self-service réel, X-as-a-Service"],
          ["Secrets en clair dans Git", "Pas de gestion des secrets", "Coffre + synchronisation, rotation automatique"],
        ],
      },
    ],
  },
  {
    id: "projet-idp-lite",
    title: "Projet : construire un mini-IDP",
    level: 3,
    intro:
      "Le projet canonique : une plateforme minimale mais réelle.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir le cas d'usage",
            detail:
              "« Déployer une API sur Kubernetes » : le golden path le plus demandé. Interviewer 2-3 développeurs sur leurs douleurs actuelles.",
          },
          {
            title: "Créer le template",
            detail:
              "Scaffolding : code API, Dockerfile, manifests Kubernetes, pipeline CI, dashboards — tout ce qu'un service a besoin pour naître.",
          },
          {
            title: "Automatiser la livraison",
            detail:
              "Pipeline standard + GitOps : du merge au déploiement sans intervention manuelle.",
          },
          {
            title: "Ajouter les garde-fous",
            detail:
              "Politiques (pas de root, ressources requises), scan d'images, secrets via le coffre.",
          },
          {
            title: "Câbler l'observabilité",
            detail:
              "Métriques, logs, alertes de base fournis avec chaque service créé depuis le template.",
          },
          {
            title: "Faire adopter",
            detail:
              "Une équipe pilote, documentation, canal de support — puis mesurer : lead time avant/après, satisfaction.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Aller plus loin, en commençant toujours par les références établies.",
    blocks: [
      {
        kind: "fields",
        title: "Références (à privilégier)",
        fields: [
          {
            label: "Team Topologies",
            value: "teamtopologies.com (livre de Skelton & Pais) : les fondements — types d'équipes, charge cognitive, modes d'interaction.",
          },
          {
            label: "PlatformEngineering.org",
            value: "La communauté : articles, événements, retours d'expérience d'équipes plateforme.",
          },
          {
            label: "Documentation Kubernetes",
            value: "kubernetes.io/docs : la référence du runtime sous la plateforme.",
          },
          {
            label: "Documentation Terraform",
            value: "developer.hashicorp.com/terraform : modules, bonnes pratiques IaC.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : le mini-IDP de cette page — template, pipeline, GitOps, politiques, observabilité.",
          "Compléments : les compétences `kubernetes`, `terraform`, `cicd`, `monitoring` pour les briques techniques.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Platform engineering maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir le runtime avec `kubernetes` : namespaces, RBAC, operators.",
          "Industrialiser l'IaC avec `terraform` et `iac` : modules, registres, politiques.",
          "Automatiser avec `cicd` et `github-actions` : pipelines templates, qualité gates.",
          "Superviser avec `monitoring` et `grafana` : les fondations de l'observabilité plateforme.",
          "Sécuriser avec `devsecops` : shift left, scans, conformité continue.",
          "Revenir à la roadmap : valider Platform Engineering et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

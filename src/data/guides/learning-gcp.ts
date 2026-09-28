import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de GCP : de zéro à une utilisation
 * professionnelle de Google Cloud. 3 niveaux d'information
 * (Aperçu / Pratique / Approfondi) avec divulgation progressive.
 * Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_GCP: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est GCP, ses points forts historiques et sa philosophie réseau.",
    blocks: [
      {
        kind: "text",
        text: "GCP (Google Cloud Platform) est le cloud né de l'infrastructure de Google : la même plateforme qui fait tourner la recherche, YouTube et Gmail, proposée à la demande. Ses points forts historiques : Kubernetes (GKE, créé par Google), la data à grande échelle (BigQuery) et un réseau mondial réputé pour sa simplicité.",
      },
      {
        kind: "text",
        text: "Le modèle est le même que les autres clouds publics : ressources à la demande, facturation à l'usage, élasticité. La spécificité de GCP est culturelle : facturation à la seconde, remises automatiques sur usage soutenu, et une console souvent jugée plus lisible. Les concepts (IAM, VPC, serverless) se transfèrent d'un cloud à l'autre.",
      },
      {
        kind: "diagram",
        title: "Les grandes familles de services GCP",
        lines: [
          "Calcul ......... Compute Engine (VM), Cloud Run, GKE, Cloud Functions",
          "Stockage ....... Cloud Storage, Persistent Disk, Filestore",
          "Bases .......... Cloud SQL, BigQuery, Firestore, Bigtable, AlloyDB",
          "Réseau ......... VPC global, Cloud Load Balancing, Cloud CDN, DNS",
          "Data / IA ...... BigQuery, Dataflow, Pub/Sub, Vertex AI",
          "Sécurité ....... IAM, Secret Manager, Security Command Center",
          "Observabilité .. Cloud Logging, Cloud Monitoring, Cloud Trace",
          "Déploiement .... Cloud Build, Artifact Registry, Terraform",
        ],
      },
    ],
  },
  {
    id: "projets-hierarchie",
    title: "La hiérarchie : organisation, dossiers, projets",
    level: 1,
    intro:
      "Sur GCP, tout vit dans un projet : comprendre la hiérarchie des ressources avant de cliquer.",
    blocks: [
      {
        kind: "diagram",
        title: "Hiérarchie des ressources GCP",
        lines: [
          "Organisation (ex. mon-entreprise.com)",
          "     │",
          "     ├── Dossier « production »",
          "     │        ├── Projet « api-prod »",
          "     │        └── Projet « data-prod »",
          "     │",
          "     └── Dossier « développement »",
          "              ├── Projet « api-dev »",
          "              └── Projet « sandbox-perso »",
        ],
      },
      {
        kind: "list",
        items: [
          "Le projet est l'unité de base : il contient les ressources, la facturation et les permissions. Un projet par application et par environnement.",
          "Les dossiers regroupent les projets (par équipe, par environnement) ; l'organisation est la racine.",
          "Les politiques IAM et d'organisation s'héritent vers le bas : une règle au niveau du dossier s'applique à tous ses projets.",
          "La facturation s'attache au projet via un compte de facturation : isolez les coûts par projet dès le début.",
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
      "Les fondations qui rendent GCP accessible : le cloud ne fait que déporter des concepts classiques.",
    blocks: [
      {
        kind: "fields",
        title: "Les fondations indispensables",
        fields: [
          {
            label: "Réseaux (`networks`)",
            value:
              "IP, sous-réseaux, pare-feu, DNS : le VPC de GCP reprend ces concepts avec sa particularité (un seul VPC global, sous-réseaux régionaux).",
          },
          {
            label: "Linux (`linux`)",
            value:
              "Une VM Compute Engine, c'est du Linux à distance : SSH, paquets, services. Le cloud ne change rien à l'OS.",
          },
          {
            label: "Conteneurs (`docker`)",
            value:
              "Recommandé : beaucoup de services GCP (Cloud Run, GKE) déploient des images de conteneurs. Savoir builder une image change tout.",
          },
        ],
      },
    ],
  },
  {
    id: "compte-essai",
    title: "Créer son compte",
    level: 2,
    intro:
      "L'essai gratuit, le premier projet et les réglages de sécurité initiaux.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le compte",
            detail:
              "Sur cloud.google.com : compte Google, carte bancaire (vérification d'identité), activation de l'essai gratuit avec ses crédits. Les crédits couvrent l'exploration sans risque.",
          },
          {
            title: "Créer un premier projet",
            detail:
              "Console > sélecteur de projet > Nouveau projet : donnez-lui un ID explicite (`mon-projet-dev`). L'ID est unique mondialement et immuable.",
          },
          {
            title: "Associer la facturation",
            detail:
              "Liez un compte de facturation au projet (requis même pendant l'essai). Puis créez un budget avec alertes : `Facturation > Budgets et alertes`.",
          },
          {
            title: "Sécuriser l'accès",
            detail:
              "Activez la validation en deux étapes sur le compte Google, et n'utilisez pas le compte propriétaire au quotidien : créez des identités IAM dédiées.",
          },
        ],
      },
    ],
  },
  {
    id: "installation-sdk",
    title: "Installer le Cloud SDK",
    level: 2,
    intro:
      "Le SDK fournit `gcloud`, `gsutil`/`gcloud storage` et `bq` : la boîte à outils en ligne de commande.",
    blocks: [
      {
        kind: "command",
        label: "Installer le SDK sur macOS",
        command: "brew install --cask google-cloud-sdk",
        why: "Installe le Google Cloud SDK via Homebrew (sur Linux/Windows : le programme d'installation officiel depuis cloud.google.com/sdk). Il fournit `gcloud`, la CLI principale pour piloter tous les services.",
        verify: "gcloud --version",
      },
      {
        kind: "command",
        label: "Initialiser la configuration",
        command: "gcloud init",
        why: "L'assistant interactif : authentification du compte, choix du projet par défaut, choix de la zone Compute par défaut. À relancer quand on change de contexte majeur.",
        verify: "gcloud auth login",
      },
      {
        kind: "command",
        label: "Lister les projets accessibles",
        command: "gcloud projects list",
        why: "Affiche les projets visibles par votre compte : ID, nom, numéro. La vérification « sur quel projet vais-je travailler ? » avant toute commande.",
      },
    ],
  },
  {
    id: "configuration-gcloud",
    title: "Configurer gcloud : projet et zone",
    level: 2,
    intro:
      "Deux réglages définissent le contexte de chaque commande : le projet et la zone/région par défaut.",
    blocks: [
      {
        kind: "command",
        label: "Définir le projet actif",
        command: "gcloud config set project mon-projet-dev",
        why: "Toutes les commandes suivantes ciblent ce projet. Le projet est l'unité de facturation et d'isolation : travailler sur le mauvais projet, c'est facturer au mauvais endroit.",
        verify: "gcloud config list",
      },
      {
        kind: "command",
        label: "Définir la zone Compute par défaut",
        command: "gcloud config set compute/zone europe-west1-b",
        why: "Évite de répéter `--zone` à chaque commande Compute Engine. `europe-west1` (Belgique) est la région la plus proche pour l'Europe de l'Ouest ; les zones (`-b`, `-c`...) en sont les datacenters.",
      },
      {
        kind: "list",
        items: [
          "`gcloud config list` affiche la configuration active : projet, compte, zone, région. Le réflexe avant toute commande importante.",
          "Les configurations nommées (`gcloud config configurations create prod`) permettent de basculer entre contextes (dev/prod) sans tout reconfigurer.",
          "Chaque commande accepte `--project` pour un usage ponctuel sur un autre projet.",
        ],
      },
    ],
  },
  {
    id: "regions-zones",
    title: "Régions et zones",
    level: 2,
    intro:
      "La géographie GCP : régions, zones, et pourquoi le choix impacte latence et conformité.",
    blocks: [
      {
        kind: "table",
        headers: ["Notion", "Définition", "Exemple"],
        rows: [
          ["Région", "Zone géographique avec plusieurs datacenters", "europe-west1 (Belgique), europe-west9 (Paris)"],
          ["Zone", "Datacenter isolé dans une région", "europe-west1-b, europe-west1-c"],
          ["Multi-région", "Stockage répliqué sur plusieurs régions", "EU (Union européenne) pour Cloud Storage"],
        ],
      },
      {
        kind: "list",
        items: [
          "Déployez près de vos utilisateurs : la latence se joue sur la distance réseau.",
          "Répartissez sur au moins deux zones pour la haute disponibilité.",
          "Pour le RGPD, préférez les régions européennes et les stockages multi-région `EU`.",
        ],
      },
    ],
  },
  {
    id: "console-cloudshell",
    title: "Console et Cloud Shell",
    level: 2,
    intro:
      "La console pour découvrir, Cloud Shell pour agir sans installation locale.",
    blocks: [
      {
        kind: "list",
        items: [
          "La console (console.cloud.google.com) est claire et rapide : chaque service a son assistant de création et son estimation.",
          "Cloud Shell (icône `>_` en haut) ouvre un terminal avec `gcloud` authentifié et 5 Go d'espace persistant : idéal depuis n'importe quel poste.",
          "Règle de travail : découvrir dans la console, automatiser en CLI ou Terraform. Les clics répétés deviennent des erreurs.",
          "L'éditeur Cloud Shell (VS Code dans le navigateur) permet d'éditer et de déployer sans rien installer.",
        ],
      },
    ],
  },
  {
    id: "facturation-budgets",
    title: "Facturation et budgets",
    level: 2,
    intro:
      "Le pilotage financier : budgets, alertes et rapports dès le premier jour.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer un budget",
            detail:
              "`Facturation > Budgets et alertes > Créer un budget` : sélectionnez le projet, définissez un montant, ajoutez des seuils d'alerte (50 %, 90 %, 100 %) avec notification e-mail.",
          },
          {
            title: "Consulter les rapports",
            detail:
              "`Facturation > Rapports` : coûts par projet, par service, par période. Vérifiez chaque semaine ce qui consomme.",
          },
          {
            title: "Étiqueter avec des labels",
            detail:
              "Les labels (`env: prod`, `equipe: backend`) sont l'équivalent GCP des tags : appliquez-les aux ressources et filtrez les rapports par label.",
          },
          {
            title: "Nettoyer",
            detail:
              "VM oubliées, disques non attachés, snapshots anciens, adresses IP réservées inutilisées : les fuites classiques à traquer.",
          },
        ],
      },
    ],
  },
  {
    id: "cloud-storage",
    title: "Cloud Storage : le stockage objet",
    level: 2,
    intro:
      "Le stockage de fichiers, backups et data lakes de GCP : buckets, classes et cycle de vie.",
    blocks: [
      {
        kind: "command",
        label: "Lister les buckets",
        command: "gcloud storage ls",
        why: "Affiche les buckets du projet actif. Les noms de buckets sont uniques mondialement : préfixez avec quelque chose d'unique.",
        verify: "gcloud storage buckets list --format=\"table(name,location)\"",
      },
      {
        kind: "list",
        items: [
          "Classes de stockage : Standard, Nearline (mensuel), Coldline (trimestriel), Archive (annuel) — choisissez selon la fréquence d'accès.",
          "Les règles de cycle de vie basculent automatiquement les vieux objets vers des classes moins chères, puis les suppriment.",
          "L'accès est privé par défaut : l'accès public se configure explicitement, à éviter sauf besoin réel.",
          "Le versioning d'objets protège contre les écrasements accidentels sur les buckets critiques.",
        ],
      },
    ],
  },
  {
    id: "compute-engine",
    title: "Première VM Compute Engine",
    level: 2,
    intro:
      "Créer une machine virtuelle : le service IaaS de base, parfait pour comprendre GCP.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer l'instance",
            detail:
              "`Compute Engine > Instances de VM > Créer` : nom, région/zone proches, type de machine `e2-micro` (économique, souvent couvert par l'offre gratuite), image Debian ou Ubuntu.",
          },
          {
            title: "Configurer le réseau",
            detail:
              "Autorisez HTTP/HTTPS si besoin via les tags réseau et les règles de pare-feu. Le SSH depuis la console (bouton `SSH`) fonctionne sans configuration.",
          },
          {
            title: "Se connecter et travailler",
            detail:
              "Bouton `SSH` dans la console ou `gcloud compute ssh mon-instance` : vous êtes sur un Linux normal.",
          },
          {
            title: "Arrêter quand c'est fini",
            detail:
              "Arrêtez l'instance depuis la console : une VM arrêtée ne coûte que son disque. Supprimez-la si elle ne sert plus.",
          },
        ],
      },
      {
        kind: "command",
        label: "Lister les instances",
        command: "gcloud compute instances list",
        why: "Affiche les instances du projet : nom, zone, type, état, IP. La commande d'audit « qu'est-ce qui tourne ? ».",
      },
    ],
  },
  {
    id: "iam-bases",
    title: "IAM : les bases",
    level: 2,
    intro:
      "Qui peut faire quoi, sur quelles ressources : le service à comprendre avant de donner des accès.",
    blocks: [
      {
        kind: "fields",
        title: "Les briques d'IAM",
        fields: [
          {
            label: "Principes",
            value:
              "Qui : compte Google, compte de service, groupe. Les comptes de service sont les identités des applications et scripts — pas de clés personnelles partagées.",
          },
          {
            label: "Rôles",
            value:
              "Des ensembles de permissions : rôles prédéfinis (`roles/compute.admin`), basiques (`Viewer`, `Editor` — à éviter, trop larges) ou personnalisés.",
          },
          {
            label: "Liaisons (bindings)",
            value:
              "L'attribution d'un rôle à un principe sur une ressource (projet, dossier, ressource). Le principe du moindre privilège : uniquement les permissions nécessaires.",
          },
          {
            label: "Héritage",
            value:
              "Les permissions se propagent vers le bas : un rôle au niveau du dossier s'applique à tous les projets qu'il contient.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle d'or : commencez par des rôles prédéfinis restreints, jamais `Owner` ou `Editor` par facilité. Les comptes de service des applications n'ont que les permissions de leur besoin exact.",
      },
    ],
  },
  {
    id: "cli-bases",
    title: "Bases de la CLI : formats et filtres",
    level: 2,
    intro:
      "Rendre `gcloud` lisible et scriptable.",
    blocks: [
      {
        kind: "command",
        label: "Formater la sortie en tableau",
        command: "gcloud compute instances list --format=\"table(name,zone,machineType,status)\"",
        why: "`--format` contrôle l'affichage : `table(...)` pour l'humain, `json` pour les scripts, `value(...)` pour extraire une valeur brute utilisable dans un script.",
      },
      {
        kind: "command",
        label: "Filtrer les ressources",
        command: "gcloud compute instances list --filter=\"status:RUNNING\"",
        why: "`--filter` sélectionne les ressources selon leurs attributs : ici seules les instances en cours. Combinez filtre + format pour des inventaires précis et lisibles.",
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow quotidien sur GCP",
    level: 2,
    intro:
      "Les habitudes qui rendent le travail rapide et sûr.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Vérifier le projet actif",
            detail:
              "`gcloud config list` : le projet définit la facturation et l'isolation. Vérifiez toujours avant une commande destructive.",
          },
          {
            title: "Travailler en CLI",
            detail:
              "Formats et filtres pour des sorties lisibles ; scripts pour les routines (inventaires, nettoyages).",
          },
          {
            title: "Activer les API au besoin",
            detail:
              "Chaque service nécessite l'activation de son API (`gcloud services enable ...`) : n'activez que ce que vous utilisez.",
          },
          {
            title: "Auditer chaque semaine",
            detail:
              "Rapports de facturation, instances en cours, règles de pare-feu, comptes de service inutilisés.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-debutant",
    title: "Erreurs de débutant à éviter",
    level: 2,
    intro:
      "Les pièges classiques des premiers pas.",
    blocks: [
      {
        kind: "list",
        items: [
          "Travailler sur le mauvais projet : vérifiez `gcloud config list` — surtout avec plusieurs projets.",
          "Oublier une VM allumée : facturée à la seconde tant qu'elle tourne. Arrêtez ce qui ne sert pas.",
          "Donner `Owner` ou `Editor` par facilité : préférez les rôles prédéfinis restreints.",
          "Ouvrir le pare-feu à `0.0.0.0/0` sur SSH : restreignez les règles d'entrée.",
          "Activer toutes les API « au cas où » : chaque API activée élargit la surface d'usage et de coût.",
          "Mettre des secrets dans les variables d'environnement en clair : Secret Manager est fait pour ça.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "vpc-global",
    title: "Le VPC global",
    level: 3,
    intro:
      "La particularité réseau de GCP : un seul VPC mondial, avec des sous-réseaux régionaux.",
    blocks: [
      {
        kind: "diagram",
        title: "VPC global typique",
        lines: [
          "VPC « prod » (global, un seul)",
          "     │",
          "     ├── Sous-réseau europe-west1 10.0.1.0/24",
          "     │        └── Pare-feu : 80/443 publics → load balancer",
          "     │",
          "     ├── Sous-réseau europe-west1 10.0.2.0/24",
          "     │        └── Pare-feu : trafic interne uniquement → GKE",
          "     │",
          "     └── Sous-réseau europe-west9 10.1.1.0/24",
          "              └── Pare-feu : 5432 depuis le sous-réseau GKE → Cloud SQL privé",
        ],
      },
      {
        kind: "list",
        items: [
          "Un VPC s'étend à toutes les régions : pas de peering inter-régions à configurer, les sous-réseaux sont régionaux.",
          "Les règles de pare-feu sont globales au VPC et stateful : définissez-les par tags réseau ou comptes de service, pas par IP en dur.",
          "Le mode `auto` crée un sous-réseau par région automatiquement (pratique pour tester) ; le mode `custom` donne le contrôle total (production).",
          "Le partage de VPC (Shared VPC) permet à plusieurs projets d'utiliser un réseau central géré par l'équipe réseau.",
          "Cloud NAT donne une sortie Internet aux sous-réseaux privés sans exposer les instances.",
        ],
      },
    ],
  },
  {
    id: "gke",
    title: "GKE : Kubernetes managé",
    level: 3,
    intro:
      "Google Kubernetes Engine : le Kubernetes né chez Google, en mode Standard ou Autopilot.",
    blocks: [
      {
        kind: "command",
        label: "Lister les clusters",
        command: "gcloud container clusters list",
        why: "Affiche les clusters GKE du projet : nom, zone/région, version, nombre de nœuds. Le point de départ avant toute opération sur un cluster.",
      },
      {
        kind: "fields",
        title: "Standard vs Autopilot",
        fields: [
          {
            label: "Standard",
            value:
              "Vous gérez les pools de nœuds (types de machines, autoscaling, mises à jour). Contrôle total, plus d'exploitation.",
          },
          {
            label: "Autopilot",
            value:
              "Google gère les nœuds : vous décrivez les workloads, la plateforme provisionne. Moins d'exploitation, facturation au pod.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Activez l'autoscaling du cluster et des pods (HPA) : l'élasticité est la raison d'être de Kubernetes.",
          "Les Workload Identity lient les comptes de service Kubernetes aux comptes de service GCP : les pods accèdent aux API sans clé.",
          "Private clusters : nœuds sans IP publique, API privée — la posture réseau recommandée en production.",
          "Mettez à jour régulièrement : les versions GKE ont un cycle de vie, et les vieilles versions perdent le support.",
        ],
      },
    ],
  },
  {
    id: "cloud-run",
    title: "Cloud Run : le serverless pour conteneurs",
    level: 3,
    intro:
      "Déployez une image de conteneur : elle scale à zéro puis monte en charge automatiquement. Le service le plus simple pour une API.",
    blocks: [
      {
        kind: "command",
        label: "Déployer un service",
        command: "gcloud run deploy mon-api --image europe-west1-docker.pkg.dev/mon-projet/mon-repo/mon-api:v1 --region europe-west1",
        why: "Crée (ou met à jour) le service Cloud Run depuis une image d'Artifact Registry. Chaque déploiement crée une révision ; le trafic bascule automatiquement, avec rollback en un clic.",
        verify: "gcloud run services list --region europe-west1",
      },
      {
        kind: "list",
        items: [
          "Scale à zéro : aucun trafic = aucun coût de calcul. Idéal pour les API à trafic variable.",
          "Variables d'environnement pour la config, Secret Manager pour les secrets (montés comme variables ou volumes).",
          "Le HTTPS est fourni, le domaine custom se configure dans le service.",
          "Limites : requêtes longues (timeout configurable, max 60 min), pas d'état local persistant entre instances.",
          "Les révisions permettent le déploiement progressif (canary) : 10 % du trafic sur la nouvelle version, puis bascule.",
        ],
      },
    ],
  },
  {
    id: "cloud-functions",
    title: "Cloud Functions",
    level: 3,
    intro:
      "Des fonctions déclenchées par événements : HTTP, Pub/Sub, Storage, Firestore.",
    blocks: [
      {
        kind: "list",
        items: [
          "2e génération (recommandée) : basée sur Cloud Run, avec plus de mémoire, de timeout et de concurrence.",
          "Déclencheurs typiques : webhook HTTP, message Pub/Sub, upload dans un bucket, écriture Firestore.",
          "Pour les workflows multi-étapes avec état, préférez Workflows (l'orchestrateur serverless) plutôt qu'enchaîner des fonctions à la main.",
          "Même règle que tout serverless : pas d'état local, secrets dans Secret Manager, logs structurés.",
        ],
      },
    ],
  },
  {
    id: "cloud-sql",
    title: "Cloud SQL et les bases managées",
    level: 3,
    intro:
      "PostgreSQL, MySQL et SQL Server sans administrer de serveur.",
    blocks: [
      {
        kind: "list",
        items: [
          "Haute disponibilité régionale (failover automatique), read replicas pour la lecture, sauvegardes automatiques avec restauration à un instant donné.",
          "Connectez-vous en privé (VPC) plutôt que par IP publique : l'accès public est à proscrire en production.",
          "Le proxy Cloud SQL Auth sécurise la connexion sans exposer la base : authentification IAM possible.",
          "AlloyDB (PostgreSQL haute performance) et Bigtable (NoSQL large colonne) pour les charges exigeantes ; Firestore pour le temps réel applicatif.",
          "Stockez les identifiants dans Secret Manager et faites-les tourner régulièrement.",
        ],
      },
    ],
  },
  {
    id: "bigquery",
    title: "BigQuery : l'entrepôt serverless",
    level: 3,
    intro:
      "Des requêtes SQL sur des pétaoctets en quelques secondes, sans infrastructure : la référence de l'analytique.",
    blocks: [
      {
        kind: "command",
        label: "Lancer une requête depuis la CLI",
        command: "bq query --use_legacy_sql=false 'SELECT COUNT(*) FROM `mon-projet.mon_dataset.ma_table`'",
        why: "`bq` est la CLI BigQuery : requêtes, création de datasets, chargements. Le SQL standard (`--use_legacy_sql=false`) est le dialecte moderne à utiliser.",
      },
      {
        kind: "list",
        items: [
          "Modèle : projet → dataset → table. Les datasets sont régionaux ou multi-régionaux (EU pour la conformité).",
          "Partitionnez et clustérisez les grandes tables (par date typiquement) : les requêtes scannent moins de données, donc coûtent moins cher.",
          "Le coût dépend des données scannées : estimez avec l'aperçu de requête avant d'exécuter sur des pétaoctets.",
          "Vues logiques et materialized views pour exposer des données propres ; scheduled queries pour les traitements récurrents.",
          "Chargez depuis Cloud Storage (CSV, JSON, Parquet) ou streamez en continu pour le temps réel.",
        ],
      },
    ],
  },
  {
    id: "pubsub-dataflow",
    title: "Pub/Sub et Dataflow : les pipelines data",
    level: 3,
    intro:
      "La messagerie et le traitement de flux : l'épine dorsale des architectures événementielles sur GCP.",
    blocks: [
      {
        kind: "fields",
        title: "Deux services complémentaires",
        fields: [
          {
            label: "Pub/Sub",
            value:
              "Messagerie publish/subscribe mondiale : un service publie sur un topic, plusieurs abonnements consomment indépendamment. Le découpleur universel entre services.",
          },
          {
            label: "Dataflow",
            value:
              "Traitement batch et streaming (Apache Beam managé) : ETL à grande échelle sans cluster à gérer. Lit depuis Pub/Sub, Storage, BigQuery.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Schéma typique : application → Pub/Sub → Dataflow (transformation) → BigQuery (analytique).",
          "Les abonnements avec dead-letter topic isolent les messages en échec au lieu de bloquer le flux.",
          "L'ordering et l'exactly-once ont des conditions précises : lisez la documentation avant de les supposer acquis.",
        ],
      },
    ],
  },
  {
    id: "iam-avance",
    title: "IAM avancé : comptes de service et conditions",
    level: 3,
    intro:
      "La sécurité sérieuse : comptes de service dédiés, fédération d'identité, conditions.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un compte de service par application, avec uniquement les rôles de son besoin : jamais de compte « passe-partout ».",
          "La fédération d'identité Workload (Workload Identity Federation) permet aux pipelines CI externes (GitHub Actions) d'obtenir des credentials GCP temporaires sans clé.",
          "Les conditions IAM restreignent un rôle dans le temps ou par attribut (ex. accès uniquement pendant les heures ouvrées, uniquement à certains préfixes d'objets).",
          "Désactivez les clés de compte de service quand c'est possible : chaque clé est un secret à protéger et à faire tourner.",
          "Auditez avec Policy Analyzer : qui a accès à quoi, et quelles permissions sont réellement utilisées.",
        ],
      },
    ],
  },
  {
    id: "artifact-registry",
    title: "Artifact Registry",
    level: 3,
    intro:
      "Le registre unifié : images de conteneurs, paquets (npm, Maven, Python) et modèles IA.",
    blocks: [
      {
        kind: "command",
        label: "Configurer Docker pour le registre",
        command: "gcloud auth configure-docker europe-west1-docker.pkg.dev",
        why: "Configure l'authentification Docker pour le registre régional : ensuite `docker push europe-west1-docker.pkg.dev/mon-projet/mon-repo/mon-image:tag` fonctionne avec vos credentials GCP.",
      },
      {
        kind: "list",
        items: [
          "Dépôts régionaux : stockez les images près des clusters qui les tirent.",
          "Le scan de vulnérabilités (Artifact Analysis) signale les CVE des images poussées.",
          "Le nettoyage automatisé supprime les vieilles images selon des règles (garder les N dernières, supprimer les tags temporaires).",
          "Contrôle d'accès par IAM au niveau du dépôt : qui peut pousser, qui peut tirer.",
        ],
      },
    ],
  },
  {
    id: "cloud-build",
    title: "Cloud Build : le CI serverless",
    level: 3,
    intro:
      "Build, test et déploiement déclenchés par Git, sans serveur de CI à gérer.",
    blocks: [
      {
        kind: "list",
        items: [
          "Déclencheurs GitHub/GitLab/Bitbucket : chaque push lance le fichier `cloudbuild.yaml` (étapes : build, test, push image, déployer).",
          "Les builds s'exécutent dans des conteneurs éphémères avec les permissions du compte de service du trigger : moindre privilège requis.",
          "Substitutions de variables pour paramétrer (nom d'image, tag, environnement) sans dupliquer le fichier.",
          "Les logs de build sont conservés et consultables : traçabilité complète de ce qui a été construit et déployé.",
          "Pour les pipelines complexes multi-environnements, évaluez aussi les workflows GitHub Actions/GitLab CI qui pilotent `gcloud`.",
        ],
      },
    ],
  },
  {
    id: "logging-monitoring",
    title: "Cloud Logging et Cloud Monitoring",
    level: 3,
    intro:
      "L'observabilité native : logs centralisés, métriques, alertes et dashboards.",
    blocks: [
      {
        kind: "fields",
        title: "Les briques",
        fields: [
          {
            label: "Cloud Logging",
            value:
              "Centralise les logs de tous les services, requêtables en langage de requête. Les logs structurés (JSON) sont filtrables par champ : structurez vos logs applicatifs.",
          },
          {
            label: "Cloud Monitoring",
            value:
              "Métriques, dashboards et alertes. Les politiques d'alerte combinent conditions, fenêtres et notifications (e-mail, SMS, PagerDuty, Slack).",
          },
          {
            label: "Cloud Trace / Profiler",
            value:
              "Le tracing distribué des requêtes et le profiling continu : où part la latence, quelles fonctions consomment le CPU.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Alarmez au minimum sur : taux d'erreur, latence p99, saturation (CPU/mémoire/disque), budget de coûts.",
          "Les uptime checks surveillent vos endpoints publics depuis plusieurs régions.",
          "Surveillez le volume de logs ingérés : filtrez à la source, la facturation suit le volume.",
        ],
      },
    ],
  },
  {
    id: "load-balancing",
    title: "Load Balancing et CDN",
    level: 3,
    intro:
      "Le load balancing global de Google : une seule IP anycast, routage intelligent.",
    blocks: [
      {
        kind: "list",
        items: [
          "Les load balancers externes HTTP(S) sont globaux : une IP anycast route vers le backend sain le plus proche.",
          "Backends possibles : groupes d'instances, NEG (GKE, Cloud Run, Functions) — le load balancer s'adapte à l'architecture.",
          "Cloud CDN met en cache le contenu statique et dynamique au plus près des utilisateurs ; Cloud Armor ajoute le WAF et la protection DDoS.",
          "Les certificats TLS sont gérés et renouvelés automatiquement.",
          "Pour le trafic interne, les load balancers internes (régionaux) isolent les échanges entre services du VPC.",
        ],
      },
    ],
  },
  {
    id: "apis-activation",
    title: "Activer les API : le réflexe",
    level: 3,
    intro:
      "Chaque service GCP correspond à une API à activer explicitement : un garde-fou à comprendre.",
    blocks: [
      {
        kind: "command",
        label: "Activer une API",
        command: "gcloud services enable run.googleapis.com",
        why: "Active l'API Cloud Run sur le projet. Sans activation, les commandes échouent avec une erreur explicite : c'est normal, pas un bug. N'activez que les API utilisées.",
        verify: "gcloud services list --enabled",
      },
      {
        kind: "list",
        items: [
          "L'erreur « API not enabled » est le premier diagnostic quand une commande `gcloud` échoue sur un nouveau projet.",
          "Certaines API ont des quotas par défaut bas : augmentez-les depuis `IAM & Admin > Quotas` quand c'est légitime.",
          "Désactivez les API inutilisées : moins de surface d'usage, moins de risque de coût accidentel.",
        ],
      },
    ],
  },
  {
    id: "quotas-limites",
    title: "Quotas et limites",
    level: 3,
    intro:
      "Chaque API a des quotas : les connaître évite les pannes « mystérieuses » à la montée en charge.",
    blocks: [
      {
        kind: "list",
        items: [
          "Quotas typiques : vCPU par région, requêtes API par minute, nombre d'instances, débit BigQuery. Ils protègent aussi contre les erreurs de facturation.",
          "Surveillez l'utilisation des quotas dans `IAM & Admin > Quotas` avec des alertes à 80 %.",
          "Les demandes d'augmentation se font depuis la console, avec justification : prévoyez le délai pour les charges planifiées (lancements, pics saisonniers).",
          "Concevez en tenant compte des quotas : retry avec backoff exponentiel côté client, files d'attente devant les API limitées.",
        ],
      },
    ],
  },
  {
    id: "securite-scc",
    title: "Security Command Center",
    level: 3,
    intro:
      "Le tableau de bord de sécurité : vulnérabilités, mauvaises configurations et menaces.",
    blocks: [
      {
        kind: "list",
        items: [
          "Centralise les findings : buckets publics, VM sans correctifs, clés exposées, règles de pare-feu trop permissives.",
          "Traitez par sévérité : les expositions publiques et les identités sur-privilégiées d'abord.",
          "Les sources intégrées (Security Health Analytics, Web Security Scanner) auditent en continu sans configuration.",
          "Combinez avec les contraintes d'organisation (ex. interdire les IP publiques sur les VM, exiger les logs d'audit) pour prévenir plutôt que guérir.",
          "Secret Manager centralise les secrets applicatifs : rotation, versioning et audit d'accès intégrés.",
        ],
      },
    ],
  },
  {
    id: "terraform-gcp",
    title: "Terraform sur GCP",
    level: 3,
    intro:
      "L'Infrastructure as Code de référence : le provider Google couvre l'essentiel des services.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le provider `google` gère projets, réseaux, instances, GKE, Cloud Run, IAM : la quasi-totalité de ce guide est scriptable.",
          "Stockez l'état Terraform dans un bucket GCS avec verrouillage : jamais d'état local en équipe.",
          "Structurez par environnement (dossiers `dev/`, `prod/`) avec des modules partagés pour le réseau et les bases.",
          "Alternative Google-native : Deployment Manager existe, mais l'écosystème et la communauté ont largement choisi Terraform.",
          "Le pipeline CI applique `plan` sur les PR et `apply` au merge : l'infrastructure se review comme du code.",
        ],
      },
    ],
  },
  {
    id: "erreurs-frequentes",
    title: "Erreurs fréquentes et solutions",
    level: 3,
    intro:
      "Les incidents classiques sur GCP, avec le diagnostic.",
    blocks: [
      {
        kind: "fields",
        title: "Diagnostic express",
        fields: [
          {
            label: "Mauvais projet actif",
            value:
              "`gcloud config list` : dans 90 % des cas de « ressource introuvable », la commande ciblait un autre projet. Utilisez `--project` pour lever l'ambiguïté.",
          },
          {
            label: "« API not enabled »",
            value:
              "`gcloud services enable <api>.googleapis.com` : chaque service nécessite son API. L'erreur indique exactement laquelle.",
          },
          {
            label: "Permission refusée",
            value:
              "Rôle IAM manquant sur la bonne ressource : vérifiez la liaison (`gcloud projects get-iam-policy`), et n'élargissez qu'au besoin strict.",
          },
          {
            label: "VM injoignable en SSH",
            value:
              "Pare-feu (règle d'entrée SSH ?), OS démarré (console série dans `Compute Engine > Instances > Journaux`), et métadonnées SSH correctes.",
          },
          {
            label: "Quota dépassé",
            value:
              "`IAM & Admin > Quotas` : identifiez le quota, demandez une augmentation, ou répartissez la charge (autre région/zone).",
          },
          {
            label: "Facture anormale",
            value:
              "Rapports de facturation par service et SKU : les coupables habituels sont les VM oubliées, le volume de logs et les sorties réseau inter-régions.",
          },
          {
            label: "Cloud Run : 403 ou timeout",
            value:
              "Vérifiez l'authentification (service public ou IAM ?), les variables/secrets manquants, et les logs dans Cloud Logging : l'erreur exacte s'y trouve.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-gcp",
    title: "Déboguer sur GCP",
    level: 3,
    intro:
      "Les réflexes d'investigation.",
    blocks: [
      {
        kind: "list",
        items: [
          "Cloud Logging en premier : filtrez par ressource et sévérité, cherchez l'erreur exacte plutôt que de deviner.",
          "Les journaux d'audit (Admin Activity, Data Access) montrent qui a modifié quoi : le CloudTrail de GCP.",
          "Cloud Trace relie les logs d'une même requête à travers les services : indispensable en microservices.",
          "La console série des VM (`gcloud compute instances get-serial-port-output`) révèle les problèmes de démarrage invisibles en SSH.",
          "Reproduisez en projet de test : déboguer en production reste une prise de risque.",
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques d'exploitation",
    level: 3,
    intro:
      "Les habitudes d'un projet GCP sain.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un projet par application et environnement, dossiers par équipe, organisation à la racine.",
          "IAM en moindre privilège : rôles prédéfinis restreints, comptes de service dédiés, pas de clés quand la fédération suffit.",
          "Toute ressource durable en Terraform, déployée par pipeline.",
          "Secrets dans Secret Manager, jamais en clair.",
          "Labels systématiques pour la répartition des coûts.",
          "Budgets et alertes sur chaque projet, revue hebdomadaire des rapports.",
          "Sauvegardes automatisées (snapshots, exports BigQuery) et restaurations testées.",
          "Monitoring : logs structurés, alertes avec destinataires réels, uptime checks sur les endpoints critiques.",
        ],
      },
    ],
  },
  {
    id: "projets-realistes",
    title: "Projets réalistes : 3 niveaux",
    level: 3,
    intro:
      "Trois projets progressifs pour une vraie pratique de GCP.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — App conteneurisée sur Cloud Run",
        fields: [
          {
            label: "Objectif",
            value:
              "Conteneuriser une API, la pousser dans Artifact Registry, la déployer sur Cloud Run avec domaine custom, variables et secrets, autoscaling configuré.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Docker, Artifact Registry (`gcloud auth configure-docker`), Cloud Run (`deploy`, révisions), Secret Manager, budgets.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Le déploiement serverless de bout en bout : de l'image au HTTPS public, avec un coût proche de zéro au repos.",
          },
          {
            label: "Difficulté",
            value: "Débutant — un week-end.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — Pipeline data BigQuery",
        fields: [
          {
            label: "Objectif",
            value:
              "Ingérer des données (CSV vers Cloud Storage), les charger dans BigQuery avec un schéma partitionné, créer des vues et des requêtes planifiées, exposer un dashboard.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Cloud Storage (cycle de vie), BigQuery (`bq`, partitionnement, scheduled queries), IAM (accès lecture seule), labels de coûts.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "L'analytique serverless : modéliser pour les requêtes, maîtriser le coût au Go scanné, automatiser les traitements.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — deux à trois semaines.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Cluster GKE en production",
        fields: [
          {
            label: "Objectif",
            value:
              "GKE Autopilot ou Standard : VPC dédié, cluster privé, Workload Identity, déploiement GitOps, HPA, monitoring et alertes, le tout en Terraform.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "VPC, GKE, Artifact Registry, Cloud Build, Terraform, Cloud Monitoring, IAM avancé.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Kubernetes en conditions réelles : réseau, identités, observabilité et IaC — le socle des plateformes modernes.",
          },
          {
            label: "Difficulté",
            value: "Avancé — un mois.",
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
      "Les documentations de référence — uniquement des sources officielles.",
    blocks: [
      {
        kind: "list",
        items: [
          "Documentation Google Cloud — https://cloud.google.com/docs",
          "Référence gcloud — https://cloud.google.com/sdk/gcloud/reference",
          "Documentation BigQuery — https://cloud.google.com/bigquery/docs",
          "Documentation GKE — https://cloud.google.com/kubernetes-engine/docs",
          "Documentation Cloud Run — https://cloud.google.com/run/docs",
          "Google Cloud Skills Boost (labs pratiques) — https://www.cloudskillsboost.google/",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "GCP maîtrisé dans ses fondamentaux : les prolongements naturels.",
    blocks: [
      {
        kind: "fields",
        title: "Les prochaines étapes",
        fields: [
          {
            label: "Kubernetes (`kubernetes`)",
            value:
              "Approfondir GKE : GitOps, service mesh, sécurité des workloads. GCP est historiquement le meilleur terrain pour Kubernetes.",
          },
          {
            label: "Terraform (`terraform`)",
            value:
              "Le provider `google` couvre tout : passer l'infrastructure en code versionné et déployé par pipeline.",
          },
          {
            label: "Data et ML (`data`, `ml`)",
            value:
              "BigQuery, Dataflow, Vertex AI : GCP excelle sur la data. Le prolongement naturel si les pipelines vous ont plu.",
          },
          {
            label: "Comparer avec AWS (`aws`) et Azure (`azure`)",
            value:
              "Les concepts se transfèrent : la polyvalence multi-cloud éclaire les choix d'architecture et ouvre plus d'opportunités.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le signe que vous maîtrisez GCP : vos projets sont isolés, vos coûts sont étiquetés et alertés, et vos déploiements passent par du code.",
      },
    ],
  },
  {
    id: "secret-manager",
    title: "Secret Manager : les secrets versionnés",
    level: 3,
    intro:
      "Stocker, versionner et distribuer les secrets : le coffre natif de GCP.",
    blocks: [
      {
        kind: "list",
        items: [
          "Chaque secret a des versions : ajoutez une version, désactivez les anciennes — le rollback d'un secret est possible.",
          "Accès via IAM (`secretmanager.versions.access`) : seuls les comptes de service autorisés lisent les secrets, jamais en clair dans le code.",
          "Rotation automatisée : Cloud Functions planifiées pour régénérer les secrets (clés API, mots de passe) sans intervention.",
          "Intégration native : Cloud Run, Cloud Functions, GKE et Compute Engine injectent les secrets en variables d'environnement ou volumes.",
          "Audit : qui a accédé à quel secret et quand — les journaux d'audit couvrent chaque accès.",
        ],
      },
    ],
  },
  {
    id: "cloud-armor",
    title: "Cloud Armor : le WAF de GCP",
    level: 3,
    intro:
      "Protéger les applications exposées : filtrage, rate limiting et règles managées.",
    blocks: [
      {
        kind: "list",
        items: [
          "Politiques de sécurité attachées aux load balancers : règles par IP, géographie, en-têtes, avec langage d'expression (CEL).",
          "Règles préconfigurées : signatures OWASP Top 10 maintenues par Google — la protection de base en quelques clics.",
          "Rate limiting : seuils par clé (IP, en-tête) contre le scraping et les abus.",
          "Protection DDoS : le réseau mondial de Google absorbe les attaques en couche 3/4/7 avant vos backends.",
          "Logs détaillés par requête bloquée/autorisée : réglez finement sans opérer à l'aveugle.",
        ],
      },
    ],
  },
  {
    id: "cloud-scheduler",
    title: "Cloud Scheduler : le cron serverless",
    level: 3,
    intro:
      "Planifier des tâches récurrentes sans serveur : HTTP, Pub/Sub ou App Engine.",
    blocks: [
      {
        kind: "list",
        items: [
          "Jobs cron managés : expression cron standard, fuseau horaire configurable, retry automatique avec backoff.",
          "Cibles : endpoint HTTP (avec authentification OIDC/OAuth), topic Pub/Sub (déclenche une fonction), App Engine.",
          "Cas d'usage : rapports quotidiens, nettoyage périodique, health checks, synchronisations.",
          "Alternative moderne : Workflows pour les enchaînements multi-étapes planifiés (orchestration, pas juste un déclencheur).",
          "Surveillez les exécutions dans Cloud Logging : un job silencieux en échec est un bug qui attend son heure.",
        ],
      },
    ],
  },
];

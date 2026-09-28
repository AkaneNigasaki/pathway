import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète d'Azure : de zéro à une utilisation
 * professionnelle du cloud Microsoft. 3 niveaux d'information
 * (Aperçu / Pratique / Approfondi) avec divulgation progressive.
 * Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_AZURE: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Azure, son positionnement et pourquoi l'écosystème Microsoft y est si bien intégré.",
    blocks: [
      {
        kind: "text",
        text: "Azure est la plateforme cloud de Microsoft : calcul, stockage, réseaux, bases de données et services IA, déployés dans des régions du monde entier. Sa force distinctive est l'intégration avec l'écosystème Microsoft : identités (Entra ID), suite bureautique, .NET, et le cloud hybride qui connecte le datacenter existant.",
      },
      {
        kind: "text",
        text: "Comme tout cloud public, le modèle est à l'usage : on provisionne en minutes, on paie ce qu'on consomme, on libère quand on n'a plus besoin. La contrepartie est la même que chez les concurrents : chaque ressource oubliée allumée continue de coûter, d'où l'importance des budgets et des alertes dès le premier jour.",
      },
      {
        kind: "diagram",
        title: "Les grandes familles de services Azure",
        lines: [
          "Calcul ......... Virtual Machines, App Service, Functions, AKS",
          "Stockage ....... Blob Storage, Azure Files, Disks",
          "Bases .......... Azure SQL, Cosmos DB, Database for PostgreSQL",
          "Réseau ......... Virtual Network, Load Balancer, Front Door, DNS",
          "Identité ....... Microsoft Entra ID (ex-Azure AD), Key Vault",
          "Observabilité .. Azure Monitor, Log Analytics, Application Insights",
          "Déploiement .... Bicep/ARM, Azure DevOps, GitHub Actions",
        ],
      },
    ],
  },
  {
    id: "modeles-service",
    title: "IaaS, PaaS, SaaS : choisir son niveau",
    level: 1,
    intro:
      "Azure propose les trois modèles de service : comprendre ce que chacun prend en charge change le coût et la charge d'exploitation.",
    blocks: [
      {
        kind: "table",
        headers: ["Modèle", "Exemple Azure", "Vous gérez", "Azure gère"],
        rows: [
          ["IaaS", "Virtual Machines", "OS, runtimes, applications, patchs", "Datacenter, réseau physique, hyperviseur"],
          ["PaaS", "App Service, Azure SQL", "Code et données", "OS, runtimes, patchs, haute disponibilité"],
          ["SaaS", "Microsoft 365", "Configuration et données", "Presque tout"],
        ],
      },
      {
        kind: "text",
        text: "La tendance est au PaaS : App Service pour héberger une API sans gérer de VM, Azure SQL pour une base sans administrer de serveur. On ne choisit l'IaaS (VM) que quand on a besoin du contrôle total — ou quand l'application l'exige (logiciel legacy, OS spécifique).",
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
      "Les fondations qui rendent l'apprentissage d'Azure dix fois plus rapide.",
    blocks: [
      {
        kind: "fields",
        title: "Les fondations indispensables",
        fields: [
          {
            label: "Réseaux (`networks`)",
            value:
              "IP, sous-réseaux, DNS, pare-feu : un réseau virtuel Azure (VNet) reprend exactement ces concepts. Sans eux, les NSG et le peering restent abstraits.",
          },
          {
            label: "Linux ou Windows Server",
            value:
              "Selon votre cible : administrer un OS en ligne de commande (ou PowerShell). Une VM Azure reste un serveur normal.",
          },
          {
            label: "Ligne de commande",
            value:
              "La CLI `az` est l'outil du praticien : savoir lire du JSON et enchaîner des commandes rend tout le reste plus rapide que les clics dans le portail.",
          },
        ],
      },
    ],
  },
  {
    id: "compte-gratuit",
    title: "Créer son compte",
    level: 2,
    intro:
      "Le compte gratuit, les crédits d'essai et les réglages de sécurité initiaux.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le compte",
            detail:
              "Sur azure.microsoft.com : compte Microsoft, carte bancaire (vérification d'identité, même pour l'offre gratuite), puis activation de l'abonnement d'essai avec ses crédits.",
          },
          {
            title: "Sécuriser l'accès",
            detail:
              "Activez l'authentification multifacteur sur votre compte, et créez des identités séparées pour l'administration : on ne travaille pas avec le compte propriétaire au quotidien.",
          },
          {
            title: "Créer un budget avec alerte",
            detail:
              "Portail `Cost Management > Budgets` : budget mensuel bas avec alerte e-mail. Le filet de sécurité contre les ressources oubliées.",
          },
          {
            title: "Choisir la région",
            detail:
              "Pour la France : `francecentral` (Paris) ou `westeurope` (Pays-Bas). La région se choisit à la création de chaque ressource — et les tarifs varient selon les régions.",
          },
        ],
      },
    ],
  },
  {
    id: "installation-cli",
    title: "Installer la CLI Azure",
    level: 2,
    intro:
      "La CLI `az` pilote tout Azure depuis le terminal : c'est l'interface du praticien et la base de l'automatisation.",
    blocks: [
      {
        kind: "command",
        label: "Installer la CLI",
        command: "brew install azure-cli",
        why: "Installe la CLI Azure via Homebrew (sur Linux et Windows : le programme d'installation officiel depuis learn.microsoft.com). Une fois installée, `az` donne accès à tous les services avec une syntaxe cohérente.",
        verify: "az --version",
      },
      {
        kind: "command",
        label: "Se connecter",
        command: "az login",
        why: "Ouvre le navigateur pour l'authentification Microsoft, puis mémorise le jeton localement. C'est la porte d'entrée : toutes les commandes suivantes utilisent cette session.",
        verify: "az account list",
      },
      {
        kind: "command",
        label: "Sélectionner l'abonnement actif",
        command: "az account set --subscription <id>",
        why: "Quand le compte a plusieurs abonnements, cette commande définit celui que les commandes suivantes ciblent. Remplacez `<id>` par l'ID affiché dans `az account list`. Travailler sur le mauvais abonnement est une erreur classique.",
      },
    ],
  },
  {
    id: "resource-groups",
    title: "Resource groups : l'unité d'organisation",
    level: 2,
    intro:
      "Le resource group est le conteneur logique de toutes les ressources d'un projet : il structure, isole et permet de tout supprimer d'un coup.",
    blocks: [
      {
        kind: "command",
        label: "Créer un resource group",
        command: "az group create --name rg-monprojet-dev --location francecentral",
        why: "Crée le conteneur logique dans la région Paris. Convention de nommage : préfixe `rg-`, nom du projet, environnement. Toutes les ressources du projet vivront dedans.",
        verify: "az group list --output table",
      },
      {
        kind: "list",
        items: [
          "Un resource group par projet et par environnement (`rg-monprojet-dev`, `rg-monprojet-prod`) : la séparation la plus simple et la plus efficace.",
          "Supprimer le resource group supprime tout son contenu : c'est à la fois très pratique (nettoyage) et très dangereux (production).",
          "Les locks (`CanNotDelete`) protègent les resource groups critiques contre les suppressions accidentelles.",
          "Les tags au niveau du resource group se propagent à la facturation : `Projet`, `Environnement`, `Propriétaire`.",
        ],
      },
    ],
  },
  {
    id: "premier-vm",
    title: "Première VM",
    level: 2,
    intro:
      "Créer une machine virtuelle : le service IaaS historique, et le plus pédagogique pour comprendre Azure.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer la VM depuis le portail",
            detail:
              "`Virtual machines > Create` : choisissez le resource group, une image Ubuntu ou Windows Server, une taille `B1s` ou `B2s` (série économique pour les tests), et créez une paire de clés SSH.",
          },
          {
            title: "Restreindre l'accès réseau",
            detail:
              "Dans les règles de port d'entrée, n'autorisez le SSH (22) ou RDP (3389) que depuis votre IP. Jamais ouvert à tout Internet sur un port d'administration.",
          },
          {
            title: "Se connecter",
            detail:
              "SSH avec la clé téléchargée, ou bouton `Connect` du portail qui donne la commande exacte. Vous êtes sur un serveur normal.",
          },
          {
            title: "Arrêter quand c'est fini",
            detail:
              "Stoppez (deallocate) la VM depuis le portail dès que vous n'en avez plus besoin : une VM allouée est facturée même sans activité.",
          },
        ],
      },
      {
        kind: "command",
        label: "Lister les VM depuis la CLI",
        command: "az vm list --output table",
        why: "Affiche les VM de l'abonnement actif : nom, resource group, état d'alimentation, taille. La commande d'audit « qu'est-ce qui tourne et me coûte de l'argent ? ».",
      },
    ],
  },
  {
    id: "app-service",
    title: "App Service : héberger sans gérer de serveur",
    level: 2,
    intro:
      "App Service est la plateforme PaaS d'Azure pour les applications web et API : déploiement Git, TLS intégré, scaling simple.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer l'App Service",
            detail:
              "Portail `App Services > Create` : resource group, runtime (Node, Python, .NET...), région, et surtout le plan tarifaire (commencez par un plan gratuit ou basique pour les tests).",
          },
          {
            title: "Déployer le code",
            detail:
              "`Deployment Center` : connectez le dépôt GitHub, chaque push sur la branche déclenche build et déploiement automatiques. Le TLS (HTTPS) est fourni par défaut.",
          },
          {
            title: "Configurer",
            detail:
              "`Configuration > Application settings` : variables d'environnement et chaînes de connexion, modifiables sans redéployer. Les secrets sensibles vont dans Key Vault (voir niveau 3).",
          },
          {
            title: "Vérifier",
            detail:
              "L'URL `https://monapp.azurewebsites.net` répond. Les logs en temps réel (`Log stream`) montrent la sortie de l'application.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Les slots de déploiement (staging/prod) permettent de valider une version avant de basculer le trafic, avec retour en arrière immédiat.",
          "Le scale-up (plus de puissance) et le scale-out (plus d'instances) se règlent dans le plan App Service.",
          "Pour les tests, le niveau gratuit suffit ; la production exige au minimum un plan de base (SLA).",
        ],
      },
    ],
  },
  {
    id: "blob-storage",
    title: "Blob Storage : le stockage objet",
    level: 2,
    intro:
      "Le stockage de fichiers, médias et sauvegardes d'Azure, avec des niveaux d'accès pour optimiser les coûts.",
    blocks: [
      {
        kind: "command",
        label: "Lister les comptes de stockage",
        command: "az storage account list --output table",
        why: "Affiche les comptes de stockage de l'abonnement. Sur Azure, on crée d'abord un compte de stockage, puis des conteneurs (l'équivalent des buckets) à l'intérieur.",
      },
      {
        kind: "list",
        items: [
          "Hiérarchie : compte de stockage → conteneur → blob (fichier). Les noms de comptes sont uniques mondialement.",
          "Niveaux d'accès : Hot (fréquent), Cool (peu fréquent), Archive (rare, récupération en heures) — le bon niveau divise la facture.",
          "L'accès est privé par défaut : l'accès anonyme se configure explicitement par conteneur, à éviter sauf besoin réel.",
          "Activez le versioning et la suppression réversible sur les conteneurs critiques : protection contre les écrasements accidentels.",
        ],
      },
    ],
  },
  {
    id: "portail-cloudshell",
    title: "Portail et Cloud Shell",
    level: 2,
    intro:
      "Le portail pour découvrir, Cloud Shell pour agir sans rien installer.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le portail (portal.azure.com) excelle pour découvrir : assistants de création, estimations de coût, documentation contextuelle.",
          "Cloud Shell (icône `>_` en haut du portail) fournit un terminal avec `az` préinstallé et authentifié, avec choix Bash ou PowerShell.",
          "Règle de travail : découvrir dans le portail, puis automatiser en CLI ou en Bicep/Terraform. Les clics répétés deviennent des erreurs.",
          "Épinglez vos services au tableau de bord pour naviguer vite entre VM, App Service, Stockage et Cost Management.",
        ],
      },
    ],
  },
  {
    id: "tags-locks",
    title: "Tags et verrous",
    level: 2,
    intro:
      "Étiqueter pour piloter les coûts, verrouiller pour protéger l'existant.",
    blocks: [
      {
        kind: "list",
        items: [
          "Taguez dès le premier jour : `Projet`, `Environnement`, `Propriétaire`. Activez-les dans Cost Management pour la répartition des coûts.",
          "Les verrous `CanNotDelete` sur les resource groups de production empêchent les suppressions accidentelles — y compris par vous-même.",
          "Les verrous `ReadOnly` figent une ressource en lecture seule : utile pour les infrastructures validées.",
          "Appliquez les tags obligatoires via Azure Policy quand l'équipe grandit : sans contrainte, les tags sont vite abandonnés.",
        ],
      },
    ],
  },
  {
    id: "controle-couts",
    title: "Garder les coûts sous contrôle",
    level: 2,
    intro:
      "Cost Management est le centre de pilotage financier : budgets, alertes, analyses.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer un budget",
            detail:
              "`Cost Management > Budgets > Add` : montant mensuel, alertes e-mail à 50 %, 80 % et 100 %. À faire dès la création de l'abonnement.",
          },
          {
            title: "Analyser les coûts",
            detail:
              "`Cost analysis` : coûts par resource group, par service, par tag. Vérifiez chaque semaine ce qui consomme.",
          },
          {
            title: "Repérer les fuites",
            detail:
              "Disques non attachés, adresses IP publiques inutilisées, VM allouées mais inactives, anciennes sauvegardes : les classiques.",
          },
          {
            title: "Nettoyer",
            detail:
              "Supprimez les resource groups de test complets plutôt que ressource par ressource : rien n'est oublié.",
          },
        ],
      },
    ],
  },
  {
    id: "cli-bases",
    title: "Bases de la CLI : requêtes et sorties",
    level: 2,
    intro:
      "Les deux options qui rendent `az` vraiment utilisable au quotidien.",
    blocks: [
      {
        kind: "command",
        label: "Lister les VM en tableau lisible",
        command: "az vm list --output table",
        why: "`--output table` transforme le JSON verbeux en tableau lisible. Les formats disponibles : `json` (défaut, pour les scripts), `table` (humain), `tsv` (pour `cut`/`awk`).",
      },
      {
        kind: "command",
        label: "Filtrer avec --query",
        command: "az vm list --query \"[?powerState=='VM running'].{Nom:name, Taille:hardwareProfile.vmSize}\" --output table",
        why: "`--query` (JMESPath) sélectionne et renomme les champs : ici seules les VM en cours, avec nom et taille. C'est la compétence CLI qui fait gagner le plus de temps.",
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow quotidien sur Azure",
    level: 2,
    intro:
      "Les habitudes qui rendent le travail rapide et sûr.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Vérifier l'abonnement actif",
            detail:
              "`az account show --output table` : surtout avec plusieurs abonnements, vérifiez toujours où vous travaillez avant une commande destructive.",
          },
          {
            title: "Travailler en CLI",
            detail:
              "Lister, filtrer avec `--query`, scripter les routines. La console sert à découvrir, pas à répéter.",
          },
          {
            title: "Décrire en IaC",
            detail:
              "Toute ressource durable (VNet, base, App Service) en Bicep ou Terraform, versionnée et déployée par pipeline.",
          },
          {
            title: "Auditer chaque semaine",
            detail:
              "Cost analysis, VM en cours, règles réseau ouvertes, comptes sans MFA. La routine anti-surprise.",
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
      "Les pièges classiques des premiers pas sur Azure.",
    blocks: [
      {
        kind: "list",
        items: [
          "Oublier une VM allouée : facturée même inactive. Utilisez « Stop » (deallocate), pas juste l'arrêt depuis l'OS.",
          "Ouvrir le RDP/SSH à tout Internet dans le NSG : restreignez à votre IP.",
          "Travailler sur le mauvais abonnement : vérifiez `az account show` avant toute commande.",
          "Supprimer un resource group « pour nettoyer » sans vérifier son contenu : le verrou `CanNotDelete` existe pour ça.",
          "Laisser les crédits d'essai expirer sans nettoyer : les ressources basculent en facturation normale.",
          "Mettre des secrets en clair dans les paramètres d'App Service : Key Vault est fait pour ça.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "vnet",
    title: "Virtual Network : le réseau privé",
    level: 3,
    intro:
      "Le VNet est votre réseau isolé dans Azure : sous-réseaux, NSG et routage, comme un réseau d'entreprise virtualisé.",
    blocks: [
      {
        kind: "diagram",
        title: "VNet typique",
        lines: [
          "VNet 10.0.0.0/16 (francecentral)",
          "     │",
          "     ├── Sous-réseau web 10.0.1.0/24",
          "     │        └── NSG : 80/443 publics → Application Gateway",
          "     │",
          "     ├── Sous-réseau app 10.0.2.0/24",
          "     │        └── NSG : trafic uniquement depuis le sous-réseau web",
          "     │",
          "     └── Sous-réseau db 10.0.3.0/24",
          "              └── NSG : 1433/5432 uniquement depuis le sous-réseau app",
          "              └── Azure SQL / base privée, aucun accès Internet",
        ],
      },
      {
        kind: "fields",
        title: "Les composants réseau",
        fields: [
          {
            label: "Sous-réseaux",
            value:
              "Découpent le VNet par usage (web, app, db). Chaque sous-réseau a son NSG et sa table de routage propres.",
          },
          {
            label: "NSG (Network Security Group)",
            value:
              "Le pare-feu : règles d'entrée/sortie par port, source, destination, avec priorités numérotées. Référencez des plages ou des tags de service plutôt que des IP en dur.",
          },
          {
            label: "Peering de VNet",
            value:
              "Connecte deux VNet (même région ou inter-régions) avec une latence faible : le trafic reste sur le réseau Microsoft.",
          },
          {
            label: "VPN / ExpressRoute",
            value:
              "Relient le datacenter on-premise au VNet : VPN IPsec chiffré sur Internet, ExpressRoute en liaison privée dédiée pour le modèle hybride.",
          },
          {
            label: "Azure Firewall / NAT Gateway",
            value:
              "Firewall managé pour filtrer le trafic sortant, NAT Gateway pour une sortie Internet à IP fixe et mutualisée.",
          },
        ],
      },
    ],
  },
  {
    id: "entra-id",
    title: "Microsoft Entra ID : les identités",
    level: 3,
    intro:
      "Entra ID (ex-Azure AD) est le service d'identité : utilisateurs, groupes, MFA et accès conditionnel.",
    blocks: [
      {
        kind: "list",
        items: [
          "Utilisateurs et groupes : la base. Attribuez les rôles aux groupes, jamais aux individus directement.",
          "MFA obligatoire pour les comptes privilégiés : c'est le réglage qui bloque le plus d'attaques par identifiants volés.",
          "Accès conditionnel : des politiques « si connexion depuis un pays inhabituel ou un appareil non géré, exiger MFA ou bloquer ».",
          "Rôles intégrés au lieu du propriétaire systématique : `Contributor` sur un resource group suffit dans la plupart des cas, `Reader` pour l'audit.",
          "PIM (Privileged Identity Management) : les droits d'administrateur s'activent à la demande, avec approbation et durée limitée, au lieu d'être permanents.",
          "Revue d'accès régulière : qui a encore accès à quoi ? Les départs et changements d'équipe doivent révoquer les accès.",
        ],
      },
    ],
  },
  {
    id: "key-vault",
    title: "Key Vault : les secrets centralisés",
    level: 3,
    intro:
      "Key Vault stocke secrets, clés et certificats chiffrés : les applications les récupèrent via une identité managée, jamais en clair.",
    blocks: [
      {
        kind: "list",
        items: [
          "Secrets (mots de passe, chaînes de connexion), clés (chiffrement) et certificats (TLS) : trois types d'objets, un seul coffre.",
          "Les App Service et Functions référencent les secrets via `@Microsoft.KeyVault(...)` : la valeur n'apparaît jamais dans la configuration.",
          "Les identités managées (voir section dédiée) donnent à la ressource Azure une identité Entra ID : plus de secret pour accéder au coffre.",
          "Activez la suppression réversible et la protection contre la purge : un coffre supprimé par erreur reste récupérable.",
          "Journalisez les accès (Azure Monitor) : qui a lu quel secret et quand.",
        ],
      },
    ],
  },
  {
    id: "sql-azure",
    title: "Azure SQL et les bases managées",
    level: 3,
    intro:
      "Les bases relationnelles sans administrer de serveur : Azure SQL, PostgreSQL et MySQL managés.",
    blocks: [
      {
        kind: "list",
        items: [
          "Azure SQL Database : SQL Server managé en PaaS, avec niveaux de service (DTU ou vCore) selon la charge. Le choix naturel pour les applications .NET.",
          "Azure Database for PostgreSQL / MySQL : les moteurs open source en managé, avec haute disponibilité et sauvegardes automatiques.",
          "Cosmos DB : base NoSQL multi-modèle à distribution mondiale, pour les charges à très grande échelle et faible latence.",
          "Placez les bases dans des sous-réseaux privés ou derrière des private endpoints : aucun accès public direct en production.",
          "Sauvegardes automatiques avec restauration à un instant donné (point-in-time restore) : testez la restauration, pas seulement la sauvegarde.",
          "Les identifiants vivent dans Key Vault ; préférez l'authentification Entra ID aux logins SQL quand c'est possible.",
        ],
      },
    ],
  },
  {
    id: "functions",
    title: "Azure Functions : le serverless",
    level: 3,
    intro:
      "Du code exécuté à l'événement, sans serveur : HTTP, files, timers, blobs.",
    blocks: [
      {
        kind: "fields",
        title: "Concepts clés",
        fields: [
          {
            label: "Déclencheurs (triggers)",
            value:
              "HTTP, Timer (cron), Queue Storage, Blob, Cosmos DB : la fonction ne s'exécute que sur événement, et scale automatiquement.",
          },
          {
            label: "Plans d'hébergement",
            value:
              "Consommation (facturé à l'exécution, scale à zéro) pour les charges variables ; Premium ou dédié (App Service) pour le VNet, les exécutions longues ou la latence garantie.",
          },
          {
            label: "Durable Functions",
            value:
              "Extension pour les workflows avec état (orchestration, fan-out/fan-in) : enchaîner des fonctions avec reprise sur erreur.",
          },
          {
            label: "Limites",
            value:
              "Durée d'exécution limitée selon le plan : pour les traitements longs, préférez Container Apps, AKS ou des VM.",
          },
        ],
      },
    ],
  },
  {
    id: "acr",
    title: "Azure Container Registry (ACR)",
    level: 3,
    intro:
      "Le registre de conteneurs privé d'Azure : stocker, scanner et distribuer les images.",
    blocks: [
      {
        kind: "command",
        label: "Se connecter au registre",
        command: "az acr login --name monregistre",
        why: "Authentifie Docker auprès du registre avec votre session Azure : ensuite `docker push monregistre.azurecr.io/monapp:1.0` fonctionne comme vers n'importe quel registre.",
      },
      {
        kind: "list",
        items: [
          "SKU Basic pour les tests, Standard puis Premium en production (réplication géographique, scan, Content Trust).",
          "ACR Tasks : build d'images dans le cloud à chaque commit, sans Docker local — le build devient reproductible.",
          "Géo-réplication : l'image est servie depuis la région la plus proche des clusters qui la tirent.",
          "Intégration native avec AKS : le cluster tire les images via son identité managée, sans secret à gérer.",
        ],
      },
    ],
  },
  {
    id: "aks",
    title: "AKS : Kubernetes managé",
    level: 3,
    intro:
      "Azure Kubernetes Service : Kubernetes sans gérer le plan de contrôle.",
    blocks: [
      {
        kind: "list",
        items: [
          "Azure gère l'API server, etcd et les mises à jour du plan de contrôle : vous gérez les pools de nœuds et vos workloads.",
          "Intégration Entra ID pour l'authentification au cluster : fini les certificats partagés, chaque développeur s'authentifie avec son compte.",
          "Azure Policy pour Kubernetes et Defender for Containers : garde-fous (pas d'image `latest`, ressources limitées) et scan des images.",
          "Plusieurs pools de nœuds (système vs applicatifs, spot vs on-demand) pour isoler et optimiser les coûts.",
          "Pour les charges simples, évaluez d'abord Container Apps : moins puissant qu'AKS, mais sans cluster à opérer.",
        ],
      },
    ],
  },
  {
    id: "bicep",
    title: "Bicep : l'Infrastructure as Code d'Azure",
    level: 3,
    intro:
      "Bicep est le langage déclaratif moderne pour décrire des ressources Azure : plus lisible que les templates ARM JSON.",
    blocks: [
      {
        kind: "code",
        language: "bicep",
        title: "main.bicep — compte de stockage",
        code: `param location string = 'francecentral'
param storageName string

resource storage 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: storageName
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
}`,
      },
      {
        kind: "list",
        items: [
          "Bicep compile vers ARM : tout ce que fait ARM, Bicep le fait avec une syntaxe concise (paramètres, modules, boucles).",
          "Organisez en modules réutilisables (réseau, base, app) : un module = un dossier avec son `main.bicep` et ses paramètres.",
          "Déployez avec `az deployment group create` ou depuis un pipeline : le template versionné est la source de vérité.",
          "Alternative multi-cloud : Terraform avec le provider `azurerm`, souvent préféré par les équipes déjà outillées Terraform.",
        ],
      },
    ],
  },
  {
    id: "monitor",
    title: "Azure Monitor et Log Analytics",
    level: 3,
    intro:
      "L'observabilité unifiée : métriques, logs et alertes pour toutes les ressources.",
    blocks: [
      {
        kind: "fields",
        title: "Les briques",
        fields: [
          {
            label: "Metrics",
            value:
              "CPU, mémoire, requêtes, erreurs : collectées automatiquement par ressource. Base des graphiques et des règles d'autoscaling.",
          },
          {
            label: "Log Analytics",
            value:
              "L'entrepôt de logs interrogeable en KQL (Kusto Query Language) : corréler les événements de tout l'environnement en une requête.",
          },
          {
            label: "Alertes",
            value:
              "Seuils sur métriques ou résultats de requêtes KQL, avec groupes d'actions (e-mail, SMS, webhook, runbook). Une alerte sans destinataire lu ne sert à rien.",
          },
          {
            label: "Application Insights",
            value:
              "L'APM pour le code applicatif : requêtes, dépendances, exceptions, avec cartographie des dépendances entre services.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Alarmez au minimum sur : erreurs 5xx, latence, CPU/disque, budget de coûts, expiration des certificats et secrets.",
          "Les workbooks créent des dashboards partageables : une page « santé » par application.",
          "Surveillez le coût d'ingestion des logs : filtrez à la source ce que vous envoyez à Log Analytics.",
        ],
      },
    ],
  },
  {
    id: "defender",
    title: "Defender for Cloud : la posture sécurité",
    level: 3,
    intro:
      "Le tableau de bord de sécurité : score, recommandations et protection contre les menaces.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le Secure Score quantifie votre posture : chaque recommandation appliquée (MFA, chiffrement, NSG restreints) l'améliore.",
          "Traitez les recommandations « high severity » en priorité : ports d'administration exposés, disques non chiffrés, identités sans MFA.",
          "Les plans Defender (serveurs, conteneurs, bases) ajoutent la détection de menaces comportementale : à évaluer selon la criticité.",
          "Combinez avec Azure Policy pour empêcher les configurations non conformes dès le déploiement, pas après.",
        ],
      },
    ],
  },
  {
    id: "identites-managees",
    title: "Identités managées : fini les secrets en dur",
    level: 3,
    intro:
      "Une identité managée donne à une ressource Azure une identité Entra ID : elle s'authentifie sans aucun secret stocké.",
    blocks: [
      {
        kind: "list",
        items: [
          "Affectée par le système (liée au cycle de vie de la ressource) ou par l'utilisateur (partageable entre ressources).",
          "Cas typique : une App Service lit Key Vault, une VM lit un blob, une Function appelle une API — sans mot de passe ni clé nulle part.",
          "Le code utilise `DefaultAzureCredential` (SDK Azure) : en local il prend votre compte, sur Azure l'identité managée. Zéro branchement conditionnel.",
          "C'est le mécanisme à privilégier systématiquement devant les chaînes de connexion avec secrets.",
        ],
      },
    ],
  },
  {
    id: "azure-policy",
    title: "Azure Policy : la gouvernance",
    level: 3,
    intro:
      "Des règles qui imposent ou auditent la conformité des ressources : tags obligatoires, régions autorisées, chiffrement exigé.",
    blocks: [
      {
        kind: "list",
        items: [
          "Effets : `Deny` (bloque le déploiement non conforme), `Audit` (signale), `Modify`/`DeployIfNotExists` (corrige automatiquement).",
          "Cas d'usage : imposer les tags (`Environnement` obligatoire), restreindre les régions (`francecentral` uniquement), exiger le chiffrement des disques et le TLS 1.2+.",
          "Les initiatives regroupent plusieurs politiques (ex. « conformité de base ») assignées à un abonnement ou un management group.",
          "Testez en mode `Audit` avant `Deny` : une politique trop stricte bloque des déploiements légitimes.",
        ],
      },
    ],
  },
  {
    id: "disponibilite",
    title: "Disponibilité : zones et SLA",
    level: 3,
    intro:
      "Concevoir pour la panne : zones de disponibilité, ensembles de disponibilité et objectifs de SLA.",
    blocks: [
      {
        kind: "list",
        items: [
          "Zones de disponibilité : des datacenters physiquement séparés dans une région. Répartir les VM sur 2-3 zones protège contre la perte d'un datacenter.",
          "Les services PaaS (App Service, Azure SQL) gèrent la redondance eux-mêmes selon le niveau de service choisi.",
          "Lisez les SLA : chaque service publie son engagement (souvent 99,9 % à 99,99 %) et ses conditions (ex. deux instances en zone redondante).",
          "Sauvegardes et restauration testées : la disponibilité ne vaut rien sans un plan de reprise éprouvé.",
          "Pour le multi-région actif, prévoyez la réplication des données et le bascule DNS (Traffic Manager / Front Door).",
        ],
      },
    ],
  },
  {
    id: "hybride",
    title: "Le cloud hybride : la force d'Azure",
    level: 3,
    intro:
      "Connecter l'existant on-premise au cloud : le scénario où Azure se distingue.",
    blocks: [
      {
        kind: "fields",
        title: "Les options de connexion",
        fields: [
          {
            label: "VPN site-à-site",
            value:
              "Tunnel IPsec chiffré sur Internet entre le datacenter et le VNet : rapide à mettre en place, débit variable.",
          },
          {
            label: "ExpressRoute",
            value:
              "Liaison privée dédiée via un opérateur : latence stable, débit garanti, trafic hors Internet. Pour les charges critiques et les gros volumes.",
          },
          {
            label: "Azure Arc",
            value:
              "Projette les serveurs on-premise (et d'autres clouds) dans Azure : gestion, politiques et monitoring unifiés, quel que soit l'hébergeur.",
          },
          {
            label: "Entra Connect",
            value:
              "Synchronise l'Active Directory local vers Entra ID : une seule identité pour les applis locales et cloud (SSO).",
          },
        ],
      },
    ],
  },
  {
    id: "slots-deploiement",
    title: "Slots de déploiement App Service",
    level: 3,
    intro:
      "Valider une version en conditions réelles avant de basculer le trafic : le déploiement sans stress.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer un slot staging",
            detail:
              "Dans l'App Service : `Deployment slots > Add Slot` (staging). C'est une instance séparée avec sa propre URL, partageant le plan tarifaire.",
          },
          {
            title: "Déployer sur staging",
            detail:
              "Le pipeline déploie d'abord sur le slot staging. Testez en conditions réelles (même plan, mêmes paramètres, chaîne de connexion de test).",
          },
          {
            title: "Bascule (swap)",
            detail:
              "`Swap` échange staging et production : bascule quasi instantanée, avec réchauffement (warm-up) de l'instance avant le switch.",
          },
          {
            title: "Rollback",
            detail:
              "En cas de problème, un nouveau swap remet l'ancienne version en production en quelques secondes. Le plan de rollback le plus simple qui soit.",
          },
        ],
      },
    ],
  },
  {
    id: "devops-integration",
    title: "CI/CD vers Azure",
    level: 3,
    intro:
      "Déployer sur Azure depuis un pipeline : GitHub Actions ou Azure DevOps, avec des identités fédérées.",
    blocks: [
      {
        kind: "list",
        items: [
          "GitHub Actions : l'action `azure/login` authentifie le workflow, puis les actions de déploiement (`webapps-deploy`, `aks-set-context`) ciblent les ressources.",
          "Préférez les federated credentials (OIDC) aux secrets de longue durée : GitHub s'authentifie auprès d'Entra ID sans secret stocké.",
          "Azure DevOps Pipelines : l'alternative intégrée, avec service connections vers l'abonnement et bibliothèques de variables.",
          "Les environnements (GitHub) ou les approvals (DevOps) ajoutent une validation manuelle avant la production.",
          "Le déploiement d'infrastructure (Bicep/Terraform) passe par le même pipeline que le code : `what-if` (simulation) sur les PR, application au merge.",
        ],
      },
    ],
  },
  {
    id: "erreurs-frequentes",
    title: "Erreurs fréquentes et solutions",
    level: 3,
    intro:
      "Les incidents classiques sur Azure, avec le diagnostic.",
    blocks: [
      {
        kind: "fields",
        title: "Diagnostic express",
        fields: [
          {
            label: "Commande appliquée au mauvais abonnement",
            value:
              "`az account show` avant toute action destructive. Nommez explicitement vos abonnements (dev/staging/prod) pour les distinguer d'un coup d'œil.",
          },
          {
            label: "VM injoignable",
            value:
              "Vérifiez : NSG (port ouvert depuis votre IP ?), la VM est-elle « running » (pas juste arrêtée depuis l'OS), le bon couple clé/utilisateur, et l'extension de diagnostic série (boot diagnostics) pour voir l'écran de démarrage.",
          },
          {
            label: "« AuthorizationFailed »",
            value:
              "Rôle insuffisant sur la portée visée : le rôle doit être assigné au bon niveau (abonnement, resource group, ressource). `az role assignment list` pour auditer.",
          },
          {
            label: "App Service : erreur 502/503",
            value:
              "Consultez `Log stream` et Application Insights : souvent un crash au démarrage (dépendance manquante, chaîne de connexion invalide, port d'écoute incorrect).",
          },
          {
            label: "Quota / limite de souscription atteint",
            value:
              "Les abonnements ont des quotas (vCPU par région, etc.) : `az vm list-usage --location francecentral` les affiche, et une demande d'augmentation se fait depuis le portail.",
          },
          {
            label: "Suppression accidentelle",
            value:
              "Les verrous `CanNotDelete` et la suppression réversible (Key Vault, Storage) existent pour ça. Sans eux, la suppression d'un resource group est définitive.",
          },
          {
            label: "Facture surprise",
            value:
              "Cost analysis par resource group et par service : les coupables habituels sont les VM allouées oubliées, les disques Premium inutilisés et les données sortantes.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-azure",
    title: "Déboguer sur Azure",
    level: 3,
    intro:
      "Les réflexes d'investigation.",
    blocks: [
      {
        kind: "list",
        items: [
          "Journal d'activité : qui a fait quoi, sur quelle ressource, quand. Le premier réflexe après un changement inattendu.",
          "KQL dans Log Analytics : une requête pour corréler les logs de toutes les ressources (`union * | where ...`).",
          "Network Watcher : capture de paquets, vérification des flux NSG, diagnostic VPN — quand « le réseau ne passe pas ».",
          "Resource Health : Azure signale lui-même les incidents de plateforme affectant vos ressources (à distinguer de vos propres erreurs).",
          "Reproduisez en environnement de test : déboguer en production reste une prise de risque.",
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques d'exploitation",
    level: 3,
    intro:
      "Les habitudes d'un abonnement Azure sain.",
    blocks: [
      {
        kind: "list",
        items: [
          "MFA partout, PIM pour les accès privilégiés, revues d'accès régulières.",
          "Un resource group par projet et environnement, tags obligatoires via Azure Policy.",
          "Toute ressource durable en Bicep ou Terraform, déployée par pipeline avec `what-if` sur les PR.",
          "Secrets dans Key Vault, accès via identités managées — jamais de secret en clair.",
          "Verrous `CanNotDelete` sur la production, suppression réversible activée.",
          "Budgets et alertes de coûts sur chaque abonnement, revue hebdomadaire.",
          "Sauvegardes automatisées et restaurations testées.",
          "Monitoring : métriques, logs centralisés, alertes avec destinataires réels.",
        ],
      },
    ],
  },
  {
    id: "projets-realistes",
    title: "Projets réalistes : 3 niveaux",
    level: 3,
    intro:
      "Trois projets progressifs pour une vraie pratique d'Azure.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Application web sur App Service",
        fields: [
          {
            label: "Objectif",
            value:
              "Déployer une API : App Service, base Azure Database for PostgreSQL en réseau privé, secrets dans Key Vault, domaine custom + TLS, slot staging avec swap.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "App Service (slots, paramètres), Key Vault, identités managées, Bicep ou Terraform, pipeline GitHub Actions.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Le PaaS de bout en bout : déployer sans gérer de serveur, et pourquoi les identités managées changent la gestion des secrets.",
          },
          {
            label: "Difficulté",
            value: "Débutant — un week-end.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — Fonctions serverless événementielles",
        fields: [
          {
            label: "Objectif",
            value:
              "Pipeline de traitement : Blob Storage → Function (traitement) → file → Function (notification), avec Application Insights, alertes et budgets.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Functions (triggers, bindings), Storage, Monitor, Key Vault, IaC, observabilité.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "L'architecture événementielle : découpler par les événements, scaler à zéro, et surveiller ce qui ne tourne pas en permanence.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — deux à trois semaines.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Infrastructure hybride gouvernée",
        fields: [
          {
            label: "Objectif",
            value:
              "VNet multi-sous-réseaux avec AKS, ACR privé, Azure Policy (tags, régions, chiffrement), budgets, et connexion VPN vers un réseau « on-premise » simulé.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "VNet/NSG, AKS, ACR, Policy, Bicep modulaire, pipeline avec `what-if`, Defender for Cloud.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "L'architecture d'entreprise : isolation réseau, gouvernance automatisée, et le modèle hybride qui fait la spécificité d'Azure.",
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
          "Documentation Azure — https://learn.microsoft.com/azure/",
          "Référence de la CLI Azure — https://learn.microsoft.com/cli/azure/",
          "Documentation Bicep — https://learn.microsoft.com/azure/azure-resource-manager/bicep/",
          "Microsoft Entra ID — https://learn.microsoft.com/entra/",
          "Architecture Center (architectures de référence) — https://learn.microsoft.com/azure/architecture/",
          "Microsoft Learn (parcours gratuits) — https://learn.microsoft.com/training/",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Azure maîtrisé dans ses fondamentaux : les prolongements naturels.",
    blocks: [
      {
        kind: "fields",
        title: "Les prochaines étapes",
        fields: [
          {
            label: "Terraform (`terraform`)",
            value:
              "Le provider `azurerm` décrit toute l'infrastructure en HCL : l'IaC multi-cloud qui complète ou remplace Bicep selon les équipes.",
          },
          {
            label: "Kubernetes (`kubernetes`)",
            value:
              "Approfondir AKS : GitOps, service mesh, sécurité des workloads — l'orchestration au-delà du managé de base.",
          },
          {
            label: "CI/CD (`cicd`, `github-actions`)",
            value:
              "Industrialiser les déploiements : pipelines avec `what-if`, federated credentials OIDC, promotions par environnements.",
          },
          {
            label: "Comparer avec AWS (`aws`) et GCP (`gcp`)",
            value:
              "Les concepts (IAM/Entra, VNet/VPC, serverless) se transfèrent : la polyvalence multi-cloud est un atout majeur.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le signe que vous maîtrisez Azure : vos resource groups se créent par pipeline, vos secrets vivent dans Key Vault, et votre facture n'a plus de surprises.",
      },
    ],
  },
  {
    id: "cosmos-db",
    title: "Cosmos DB : la base NoSQL globale",
    level: 3,
    intro:
      "Base multi-modèle à distribution mondiale : latence faible partout, scalabilité automatique.",
    blocks: [
      {
        kind: "list",
        items: [
          "API au choix : NoSQL (documents JSON), MongoDB, Cassandra, Table, Gremlin — même moteur, protocoles compatibles.",
          "La clé de partition décide de la distribution et des performances : un mauvais choix = requêtes coûteuses et lentes. Réfléchissez-y avant d'écrire la première donnée.",
          "Facturation en RU (request units) : chaque opération consomme des unités — dimensionnez le débit (provisionné ou serverless) selon la charge.",
          "Distribution multi-région en un clic : lectures/écritures près des utilisateurs, bascule automatique.",
          "TTL natif sur les documents : expiration automatique des données temporaires (sessions, caches).",
        ],
      },
    ],
  },
  {
    id: "service-bus",
    title: "Service Bus : la messagerie d'entreprise",
    level: 3,
    intro:
      "Files et topics pour découpler les applications : le SQS/SNS d'Azure, en plus riche.",
    blocks: [
      {
        kind: "fields",
        title: "Concepts clés",
        fields: [
          {
            label: "Queues",
            value:
              "Files point à point : un message, un consommateur. Sessions pour l'ordre, lettres mortes (dead-letter) pour les échecs.",
          },
          {
            label: "Topics et abonnements",
            value:
              "Pub/sub : un message publié sur un topic est distribué aux abonnements, chacun avec ses filtres (SQL-like). Le pattern « un événement, plusieurs consommateurs ».",
          },
          {
            label: "Transactions",
            value:
              "Support des transactions et de la déduplication : pour les flux métier où la fiabilité prime sur la vitesse brute.",
          },
          {
            label: "vs Event Grid / Event Hubs",
            value:
              "Service Bus = messagerie applicative fiable. Event Grid = routage d'événements (léger, réactif). Event Hubs = ingestion de flux massifs (télémétrie).",
          },
        ],
      },
    ],
  },
  {
    id: "front-door",
    title: "Front Door : l'entrée globale",
    level: 3,
    intro:
      "CDN, équilibrage global et WAF : le point d'entrée unique de vos applications.",
    blocks: [
      {
        kind: "list",
        items: [
          "Point d'entrée anycast mondial : les utilisateurs atteignent le PoP le plus proche, le trafic est routé vers l'origine la plus saine.",
          "Routage par règles : par chemin, en-tête, géographie — A/B testing, maintenance, routage par région.",
          "WAF intégré : règles managées OWASP, rate limiting, géo-filtrage, protection contre les bots.",
          "TLS de bout en bout avec certificats managés : HTTPS partout sans gestion manuelle.",
          "Complémentarité : Front Door (global, couche 7) devant Application Gateway (régional) ou directement App Service / Storage statique.",
        ],
      },
    ],
  },
];

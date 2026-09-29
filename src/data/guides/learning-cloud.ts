import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du Cloud : de zéro à un usage professionnel,
 * multi-fournisseurs (AWS, Azure, Google Cloud).
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Approche : concepts d'abord (modèles NIST), puis pratique via les CLI,
 * puis approfondissement par domaine (compute, stockage, réseau, sécurité,
 * facturation). Aucun fournisseur n'est présenté comme universellement
 * meilleur ; aucun prix ni part de marché n'est avancé.
 */
export const LEARNING_CLOUD: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est le cloud, d'où vient la définition officielle, et les cinq caractéristiques qui le distinguent d'un simple hébergement.",
    blocks: [
      {
        kind: "text",
        text: "Le cloud (informatique en nuage) est la mise à disposition, via le réseau, de ressources informatiques — serveurs, stockage, bases de données, réseaux, logiciels — à la demande et en libre-service. Au lieu d'acheter et d'entretenir des machines physiques, vous louez de la capacité chez un fournisseur et ne payez que ce que vous consommez.",
      },
      {
        kind: "text",
        text: "La définition de référence vient du NIST (National Institute of Standards and Technology, publication SP 800-145) : le cloud se reconnaît à cinq caractéristiques essentielles. Un hébergeur web classique qui vous loue un serveur fixe n'est pas du cloud ; un service qui provisionne des ressources en quelques secondes, accessibles par API, avec facturation au compteur, en est.",
      },
      {
        kind: "fields",
        title: "Les 5 caractéristiques essentielles (NIST)",
        fields: [
          {
            label: "Libre-service à la demande",
            value:
              "Vous provisionnez des ressources (serveur, base de données, stockage) vous-même, quand vous voulez, sans intervention humaine du fournisseur — via une console web ou une API.",
          },
          {
            label: "Accès réseau large",
            value:
              "Les ressources sont accessibles via le réseau avec des mécanismes standards (HTTPS, API REST), depuis n'importe quel terminal : ordinateur, tablette, téléphone.",
          },
          {
            label: "Mutualisation des ressources",
            value:
              "Les ressources physiques du fournisseur sont partagées entre de nombreux clients (multi-tenant), avec isolation logique. Vous ne voyez que votre part, qui semble illimitée.",
          },
          {
            label: "Élasticité rapide",
            value:
              "La capacité peut être augmentée ou réduite en quelques minutes, parfois automatiquement. C'est la différence majeure avec l'achat de serveurs : absorber un pic de trafic sans surdimensionner en permanence.",
          },
          {
            label: "Service mesuré",
            value:
              "La consommation est mesurée (heures de calcul, Go stockés, Go transférés) et facturée en conséquence. D'où la nécessité de surveiller les coûts : la mesure est précise, y compris pour les ressources oubliées.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le cloud transforme l'infrastructure informatique en service à la demande : des ressources provisionnées en minutes, accessibles par API, facturées au compteur.",
      },
      {
        kind: "text",
        text: "Acheter des serveurs impose de prévoir la capacité maximale à l'avance, d'immobiliser du capital et d'entretenir du matériel. Le cloud convertit ce coût fixe en coût variable et déplace l'exploitation vers le fournisseur.",
      },
      {
        kind: "text",
        text: "Charge variable ou imprévisible, besoin de démarrer vite, équipe petite sans administrateurs système, portée mondiale (déployer près des utilisateurs).",
      },
      {
        kind: "fields",
        title: "Le cloud : l'essentiel",
        fields: [
          {
            label: "Quand réfléchir à deux fois",
            value:
              "Charge parfaitement stable et prévisible sur des années, contraintes réglementaires strictes de localisation des données, ou latence incompatible avec un datacenter distant : le surcoût du cloud peut alors dépasser ses avantages.",
          },
          {
            label: "Concepts liés",
            value:
              "Virtualisation, centres de données, DevOps, Infrastructure as Code, Kubernetes, FinOps.",
          },
        ],
      },
    ],
  },
  {
    id: "pourquoi-le-cloud",
    title: "Pourquoi le cloud a tout changé",
    level: 1,
    intro:
      "Ce que le cloud change concrètement pour un développeur ou une équipe, et les limites honnêtes du modèle.",
    blocks: [
      {
        kind: "text",
        text: "Avant le cloud, mettre une application en ligne signifiait : commander un serveur, attendre des semaines, l'installer dans une baie, le configurer, puis le surdimensionner « au cas où ». Le cloud a réduit ce cycle à quelques minutes et à une carte bancaire. Pour un développeur, la conséquence est directe : l'infrastructure devient du code qu'on peut créer, dupliquer et détruire comme des objets logiciels.",
      },
      {
        kind: "diagram",
        title: "Avant / après, en une image",
        lines: [
          "AVANT (serveurs propres)",
          "  Acheter → attendre → installer → configurer → surveiller",
          "  Capacité : fixée à l'achat (surdimensionnée « au cas où »)",
          "  Panne matérielle : votre problème",
          "",
          "APRÈS (cloud)",
          "  CLI / console → ressource prête en minutes",
          "  Capacité : ajustable à la demande (élasticité)",
          "  Panne matérielle : problème du fournisseur (redondance incluse)",
        ],
      },
      {
        kind: "fields",
        title: "Avantages et limites, sans langue de bois",
        fields: [
          {
            label: "Avantage : vitesse",
            value:
              "Provisionner un serveur, une base de données ou un réseau prend des minutes. Expérimenter coûte peu : on crée, on teste, on détruit.",
          },
          {
            label: "Avantage : élasticité",
            value:
              "Absorber un pic de trafic x10 sans acheter 10 serveurs, puis redescendre. Idéal pour les charges variables (e-commerce, médias, événements).",
          },
          {
            label: "Avantage : portée mondiale",
            value:
              "Déployer la même application sur plusieurs continents en quelques clics, près des utilisateurs, sans construire de datacenters.",
          },
          {
            label: "Limite : les coûts surprennent",
            value:
              "La facturation au compteur est précise — y compris pour les ressources oubliées allumées. Sans surveillance, la facture grimpe. D'où la discipline FinOps.",
          },
          {
            label: "Limite : la complexité",
            value:
              "Chaque fournisseur propose des centaines de services aux noms obscurs. Le risque est de se perdre ou de s'enfermer dans des services propriétaires sans l'avoir décidé.",
          },
          {
            label: "Limite : la responsabilité partagée",
            value:
              "Le fournisseur sécurise l'infrastructure physique ; vous sécurisez ce que vous y mettez (données, accès, configurations). Une mauvaise configuration reste votre faute.",
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
    intro:
      "Ce qu'il faut déjà connaître pour aborder le cloud sans se noyer — et ce qui peut s'apprendre en route.",
    blocks: [
      {
        kind: "list",
        items: [
          "Bases réseau : adresse IP, DNS, HTTP/HTTPS, ports. Sans cela, les concepts de VPC et de groupes de sécurité resteront abstraits.",
          "Ligne de commande : naviguer dans un terminal, exécuter des commandes, lire leur sortie. Les CLI cloud sont le quotidien.",
          "Notions Linux : un serveur cloud est presque toujours une machine Linux ; savoir s'y connecter en SSH et y installer un logiciel est indispensable.",
          "Conteneurs (Docker) : pas obligatoire pour débuter, mais la moitié des déploiements modernes passent par là — à apprendre en parallèle.",
          "Pas de prérequis matériel : tout se fait depuis votre machine, avec un compte gratuit chez un fournisseur.",
        ],
      },
    ],
  },
  {
    id: "modeles-de-service",
    title: "IaaS, PaaS, SaaS, FaaS",
    level: 2,
    intro:
      "Les quatre modèles de service : qui gère quoi, de la machine nue au logiciel clé en main. C'est la grille de lecture de tout le cloud.",
    blocks: [
      {
        kind: "text",
        text: "La question centrale est : quelle part de la pile technique gérez-vous vous-même, et quelle part le fournisseur gère-t-il pour vous ? Plus vous montez dans la pile, moins vous administrez — mais moins vous contrôlez. Il n'y a pas de « meilleur » modèle : il y a le bon niveau d'abstraction pour votre besoin.",
      },
      {
        kind: "table",
        headers: ["Modèle", "Vous gérez", "Le fournisseur gère", "Exemples"],
        rows: [
          [
            "IaaS (Infrastructure as a Service)",
            "OS, applications, données, runtime",
            "Virtualisation, serveurs, stockage, réseau physique",
            "EC2 (AWS), Azure Virtual Machines, Compute Engine (GCP)",
          ],
          [
            "PaaS (Platform as a Service)",
            "Votre code et vos données",
            "OS, runtime, serveurs, mise à l'échelle, correctifs",
            "Elastic Beanstalk, Azure App Service, Cloud Run, Heroku",
          ],
          [
            "SaaS (Software as a Service)",
            "Vos données et votre paramétrage",
            "Tout le reste : l'application est livrée prête",
            "Gmail, Microsoft 365, Salesforce, Dropbox",
          ],
          [
            "FaaS (Function as a Service)",
            "Votre fonction (quelques dizaines de lignes)",
            "Tout : exécution à l'événement, mise à l'échelle à zéro",
            "AWS Lambda, Azure Functions, Cloud Functions",
          ],
        ],
      },
      {
        kind: "text",
        text: "IaaS = vous louez des machines ; PaaS = vous louez une plateforme prête ; SaaS = vous louez un logiciel fini ; FaaS = vous louez de l'exécution à l'événement.",
      },
      {
        kind: "fields",
        title: "Choisir son modèle",
        fields: [          {
            label: "Quand choisir IaaS",
            value:
              "Besoin de contrôle total (OS spécifique, réseau sur mesure, conformité), ou migration d'applications existantes telles quelles vers des VM.",
          },
          {
            label: "Quand choisir PaaS",
            value:
              "Vous voulez déployer du code sans administrer de serveurs : la plupart des applications web classiques.",
          },
          {
            label: "Quand choisir FaaS",
            value:
              "Traitements déclenchés par des événements (upload de fichier, webhook, tâche planifiée), trafic irrégulier avec de longues périodes d'inactivité.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Choisir IaaS « pour garder le contrôle » puis passer ses journées à patcher des OS — alors qu'un PaaS aurait supprimé ce travail.",
          },
          {
            label: "Bonne pratique",
            value:
              "Monter dans la pile par défaut (moins d'administration) et ne descendre vers IaaS que sur justification concrète.",
          },
        ],
      },
    ],
  },
  {
    id: "modeles-de-deploiement",
    title: "Modèles de déploiement",
    level: 2,
    intro:
      "Cloud public, privé, hybride, multi-cloud : où tournent vos ressources et pourquoi ce choix compte.",
    blocks: [
      {
        kind: "text",
        text: "Public par défaut pour démarrer. Hybride quand la réglementation ou l'existant l'impose. Multi-cloud comme stratégie d'entreprise mûrie, pas comme défaut d'architecture.",
      },
      {
        kind: "fields",
        title: "Les quatre modèles (terminologie NIST)",
        fields: [          {
            label: "Cloud public",
            value:
              "Ressources partagées entre clients, accessibles via Internet. Le modèle dominant : AWS, Azure, Google Cloud. Coût d'entrée nul, élasticité maximale.",
          },
          {
            label: "Cloud privé",
            value:
              "Infrastructure dédiée à une seule organisation, sur site ou hébergée. Contrôle total, mais on retrouve les coûts fixes du datacenter classique.",
          },
          {
            label: "Hybride",
            value:
              "Combinaison : certaines charges sur site (données sensibles, systèmes existants), d'autres dans le public (pics, nouveaux projets). Exige une bonne interconnexion.",
          },
          {
            label: "Multi-cloud",
            value:
              "Utiliser plusieurs fournisseurs publics (ex. AWS + GCP). Évite la dépendance à un seul acteur, mais multiplie la complexité : deux consoles, deux facturations, deux IAM.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Viser le multi-cloud « pour ne pas dépendre d'un fournisseur » dès le premier projet : on paie la complexité double sans en avoir les moyens humains.",
          },
        ],
      },
    ],
  },
  {
    id: "regions-et-zones",
    title: "Régions et zones de disponibilité",
    level: 2,
    intro:
      "Le cloud est mondial mais vos données ont une adresse : comprendre régions, zones et latence.",
    blocks: [
      {
        kind: "text",
        text: "Un fournisseur découpe le monde en régions (zones géographiques, ex. Europe) ; chaque région contient plusieurs zones de disponibilité (datacenters distincts, isolés les uns des autres). Déployer une application sur plusieurs zones d'une même région la protège contre la panne d'un datacenter entier.",
      },
      {
        kind: "diagram",
        title: "Géographie d'un fournisseur cloud",
        lines: [
          "Monde",
          " └── Région (ex. Europe — Paris)",
          "      ├── Zone de disponibilité A (datacenter 1)",
          "      ├── Zone de disponibilité B (datacenter 2)",
          "      └── Zone de disponibilité C (datacenter 3)",
          "",
          "Règle : vos ressources critiques sont répliquées",
          "sur AU MOINS 2 zones de la même région.",
        ],
      },
      {
        kind: "fields",
        title: "Choisir sa région",
        fields: [
          {
            label: "Latence",
            value:
              "Plus la région est proche de vos utilisateurs, plus les réponses sont rapides. Un utilisateur à Antananarivo servi depuis Paris (~150 ms) répondra moins vite que depuis une région proche — quand elle existe.",
          },
          {
            label: "Données et droit",
            value:
              "Certaines réglementations exigent que les données restent dans une juridiction (ex. Union européenne). Le choix de la région est alors une décision juridique, pas technique.",
          },
          {
            label: "Disponibilité des services",
            value:
              "Tous les services n'existent pas dans toutes les régions ; les nouveautés arrivent d'abord dans les grandes régions. Vérifiez avant d'architecturer.",
          },
          {
            label: "Exemples réels",
            value:
              "AWS : `eu-west-3` (Paris). Azure : France Centre (Paris). Google Cloud : `europe-west9` (Paris).",
          },
          {
            label: "Bonne pratique",
            value:
              "Choisir la région la plus proche de vos utilisateurs qui satisfait vos contraintes réglementaires, puis déployer sur plusieurs zones de disponibilité.",
          },
        ],
      },
    ],
  },
  {
    id: "creer-un-compte",
    title: "Créer un compte : la méthode sûre",
    level: 2,
    intro:
      "Ouvrir un compte cloud sans mauvaise surprise : identité, MFA et garde-fous budgétaires dès le premier jour.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le compte avec une adresse dédiée",
            detail:
              "Utilisez une adresse e-mail dédiée au cloud (pas votre adresse personnelle principale). Vous devrez fournir un moyen de paiement même pour l'offre gratuite — c'est normal, il sert à vérifier l'identité.",
          },
          {
            title: "Activer la MFA sur le compte racine",
            detail:
              "La première action après création : activer l'authentification multifacteur (application d'authentification) sur le compte principal. Sans MFA, quiconque récupère le mot de passe contrôle toute votre infrastructure.",
          },
          {
            title: "Créer un utilisateur quotidien, ne pas utiliser le compte racine",
            detail:
              "Le compte racine a tous les pouvoirs y compris la facturation. Créez un utilisateur IAM avec des droits d'administration pour le travail quotidien, et n'utilisez le compte racine que pour la facturation et la sécurité.",
          },
          {
            title: "Activer une alerte de budget à 0 €",
            detail:
              "Créez immédiatement une alerte qui vous prévient par e-mail dès que la dépense prévue dépasse un seuil (par ex. quelques euros). C'est gratuit et c'est ce qui évite les factures surprises.",
          },
          {
            title: "Explorer l'offre gratuite, sans carte bancaire en tête",
            detail:
              "Chaque fournisseur propose un niveau gratuit : quotas permanents sur certains services et crédit d'essai limité dans le temps. Lisez les conditions actuelles sur le site officiel — elles changent régulièrement.",
          },
        ],
      },
      {
        kind: "fields",
        title: "À retenir",
        fields: [
          {
            label: "Erreur fréquente",
            value:
              "Travailler des mois avec le compte racine sans MFA, puis voir des ressources inconnues apparaître : signe classique d'un compte compromis et utilisé pour miner des cryptomonnaies.",
          },
          {
            label: "Bonne pratique",
            value:
              "Compte racine + MFA + utilisateur quotidien + alerte budget : quatre actions, dix minutes, 90 % des catastrophes évitées.",
          },
        ],
      },
    ],
  },
  {
    id: "cli-aws",
    title: "CLI AWS : installer et premiers pas",
    level: 2,
    intro:
      "La CLI `aws` : installer, configurer, vérifier son identité et lister ses ressources.",
    blocks: [
      {
        kind: "command",
        label: "Installer la CLI AWS (macOS)",
        command: "brew install awscli",
        why: "Homebrew installe la version 2 officielle d'AWS. Sous Linux, AWS fournit un installeur ; sous Windows, un installeur MSI — tous documentés sur docs.aws.amazon.com.",
        verify: "`aws --version` doit afficher `aws-cli/2.x`.",
      },
      {
        kind: "command",
        label: "Configurer l'accès",
        command: "aws configure",
        why: "Enregistre votre clé d'accès, votre région par défaut et le format de sortie dans `~/.aws/`. Préférez ensuite les rôles IAM et la fédération d'identité aux clés permanentes quand c'est possible.",
      },
      {
        kind: "command",
        label: "Vérifier qui vous êtes",
        command: "aws sts get-caller-identity",
        why: "Interroge le service STS : il renvoie l'identifiant du compte et l'utilisateur/rôle utilisé. C'est le test de santé de toute configuration — à lancer avant toute autre commande.",
        verify: "La sortie affiche votre `Account` et votre `Arn`.",
      },
      {
        kind: "command",
        label: "Lister vos buckets S3",
        command: "aws s3 ls",
        why: "La commande la plus simple pour confirmer que l'accès fonctionne : elle liste vos espaces de stockage objet. Vide au début, c'est normal.",
      },
      {
        kind: "command",
        label: "Lister vos machines virtuelles",
        command: "aws ec2 describe-instances --query 'Reservations[].Instances[].[InstanceId,State.Name]' --output table",
        why: "`describe-instances` liste les VM EC2 ; `--query` filtre avec JMESPath pour ne garder que l'essentiel. `--output table` rend la lecture humaine.",
      },
    ],
  },
  {
    id: "cli-azure",
    title: "CLI Azure : installer et premiers pas",
    level: 2,
    intro:
      "La CLI `az` : connexion interactive, groupes de ressources et organisation.",
    blocks: [
      {
        kind: "command",
        label: "Installer la CLI Azure (macOS)",
        command: "brew install azure-cli",
        why: "Paquet officiel Microsoft via Homebrew. Sous Linux, Microsoft documente un script d'installation ; sous Windows, un installeur MSI.",
        verify: "`az --version` doit afficher la version installée.",
      },
      {
        kind: "command",
        label: "Se connecter",
        command: "az login",
        why: "Ouvre une connexion interactive dans le navigateur (ou affiche un code à saisir). Contrairement à AWS, l'authentification par défaut passe par votre compte Microsoft/Entra ID, pas par des clés à gérer.",
      },
      {
        kind: "command",
        label: "Lister vos abonnements",
        command: "az account list --output table",
        why: "Azure organise la facturation et les droits par abonnements. Cette commande montre lesquels sont accessibles et lequel est actif par défaut.",
      },
      {
        kind: "command",
        label: "Créer un groupe de ressources",
        command: "az group create --name rg-demo --location francecentral",
        why: "Le groupe de ressources est l'unité d'organisation d'Azure : tout ce que vous créez vit dans un groupe, ce qui permet de tout supprimer d'un coup à la fin d'un test. `francecentral` est la région France Centre (Paris).",
        verify: "`az group list --output table` affiche `rg-demo`.",
      },
      {
        kind: "command",
        label: "Tout nettoyer après un test",
        command: "az group delete --name rg-demo --yes --no-wait",
        why: "Supprime le groupe et TOUTES les ressources qu'il contient. C'est la raison d'être des groupes : un nettoyage fiable en une commande, sans ressource oubliée qui facture.",
      },
    ],
  },
  {
    id: "cli-gcp",
    title: "CLI Google Cloud : installer et premiers pas",
    level: 2,
    intro:
      "La CLI `gcloud` : initialisation guidée, projets et configuration.",
    blocks: [
      {
        kind: "command",
        label: "Installer le SDK Google Cloud (macOS)",
        command: "brew install --cask google-cloud-sdk",
        why: "Installe `gcloud`, `gsutil` et `bq`. Sous Linux, Google documente un script d'installation officiel ; le SDK existe aussi en paquets pour les distributions courantes.",
        verify: "`gcloud --version` doit afficher la version du SDK.",
      },
      {
        kind: "command",
        label: "Initialiser (assistant guidé)",
        command: "gcloud init",
        why: "Assistant interactif : connexion au compte Google, choix ou création du projet, choix de la région/zone par défaut. C'est la voie recommandée pour une première installation.",
      },
      {
        kind: "command",
        label: "Voir la configuration active",
        command: "gcloud config list",
        why: "Affiche le compte actif, le projet actif et la région/zone par défaut. En cas de comportement inattendu, c'est ici que l'on vérifie que l'on travaille sur le bon projet.",
      },
      {
        kind: "command",
        label: "Lister les machines virtuelles",
        command: "gcloud compute instances list",
        why: "Liste les VM Compute Engine du projet actif, toutes zones confondues. Vide au début, c'est normal.",
      },
      {
        kind: "text",
        text: "Chez Google Cloud, le projet est l'unité d'organisation : facturation, droits d'accès et ressources sont rattachés à un projet.",
      },
      {
        kind: "fields",
        title: "Le concept de « projet »",
        fields: [          {
            label: "Bonne pratique",
            value:
              "Un projet par environnement (`mon-app-dev`, `mon-app-prod`) : séparation nette des droits et de la facturation, suppression propre en fin de vie.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Tout faire dans le projet par défaut, dev et prod mélangés, puis ne plus oser supprimer quoi que ce soit.",
          },
        ],
      },
    ],
  },
  {
    id: "deployer-premiere-app",
    title: "Déployer une première application",
    level: 2,
    intro:
      "La démarche générique, valable chez les trois fournisseurs : du code local à une URL publique.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir le modèle de service",
            detail:
              "Application web classique : un PaaS (App Service, Cloud Run, Elastic Beanstalk) suffit et évite d'administrer un OS. Besoin spécifique : une VM (IaaS). Traitement ponctuel : une fonction serverless (FaaS).",
          },
          {
            title: "Préparer l'application",
            detail:
              "L'application doit écouter sur le port fourni par la plateforme (souvent via la variable d'environnement `PORT`), lire sa configuration depuis des variables d'environnement (jamais de secrets en dur) et démarrer sans intervention manuelle.",
          },
          {
            title: "Provisionner la ressource",
            detail:
              "Via la console ou la CLI : créer le service d'hébergement dans la région choisie, dans le bon groupe de ressources / projet. Noter l'URL ou l'adresse fournie.",
          },
          {
            title: "Déployer le code",
            detail:
              "Selon le service : `git push` vers le PaaS, image Docker poussée vers le registre du fournisseur puis déployée, ou archive ZIP téléversée. Le premier déploiement se fait souvent à la main ; l'automatisation vient après.",
          },
          {
            title: "Exposer et sécuriser",
            detail:
              "Vérifier que l'application répond sur HTTPS (les PaaS fournissent généralement le certificat TLS), restreindre les accès réseau au strict nécessaire, vérifier les variables d'environnement.",
          },
          {
            title: "Surveiller et nettoyer",
            detail:
              "Activer les logs et une alerte de budget, vérifier la facture après 24 h. Si c'était un test, détruire les ressources (groupe de ressources, projet, ou `terraform destroy`).",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow quotidien dans le cloud",
    level: 2,
    intro:
      "À quoi ressemble une journée de travail avec le cloud : console, CLI, code d'infrastructure.",
    blocks: [
      {
        kind: "diagram",
        title: "Les trois portes d'entrée",
        lines: [
          "Console web  →  découvrir, visualiser, dépanner",
          "     (cliquer pour comprendre, pas pour construire durablement)",
          "",
          "CLI  →  agir vite, scripter, répéter",
          "     (aws / az / gcloud : le quotidien de l'ingénieur)",
          "",
          "Infrastructure as Code  →  versionner, revoir, reproduire",
          "     (Terraform, CloudFormation, Bicep : la cible professionnelle)",
        ],
      },
      {
        kind: "list",
        items: [
          "Le matin : vérifier les alertes (budget, santé des services) avant d'écrire du code.",
          "Développer en local, tester, puis déployer via un pipeline — pas en cliquant dans la console de production.",
          "Toute ressource créée à la main en urgence est notée pour être ensuite codifiée en IaC, sinon elle devient une dette invisible.",
          "En fin de tâche : les environnements de test sont détruits ou arrêtés ; seuls dev/prod partagés restent allumés.",
          "La console sert à comprendre et à dépanner ; la CLI et l'IaC servent à construire de façon reproductible.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "compute-machines-virtuelles",
    title: "Compute : les machines virtuelles",
    level: 3,
    intro:
      "EC2, Azure Virtual Machines, Compute Engine : le IaaS historique, un serveur virtualisé que vous administrez.",
    blocks: [
      {
        kind: "text",
        text: "Une machine virtuelle est un serveur complet (OS, CPU, RAM, disque) virtualisé sur le matériel du fournisseur. Vous choisissez la taille, l'image système, le réseau ; vous administrez tout le reste : mises à jour, pare-feu, sauvegardes, applications.",
      },
      {
        kind: "text",
        text: "Une VM est un ordinateur distant que vous louez à l'heure, avec un accès administrateur complet.",
      },
      {
        kind: "text",
        text: "Premier service cloud historique (EC2, 2006) : reproduire le serveur physique en mieux — provisionné en minutes, redimensionnable, sans matériel.",
      },
      {
        kind: "text",
        text: "Migration d'applications existantes sans les modifier, besoin d'un OS ou d'un noyau spécifique, contrôle total du réseau et de la sécurité.",
      },
      {
        kind: "fields",
        title: "La VM : l'essentiel",
        fields: [
          {
            label: "Exemple réel",
            value:
              "Un serveur `t3.micro` sous Ubuntu hébergeant un site WordPress : vous installez Apache, PHP, MySQL exactement comme sur un serveur physique.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Traiter les VM comme des animaux de compagnie (snowflake servers) configurés à la main pendant des mois, impossibles à reconstruire en cas de panne.",
          },
          {
            label: "Bonne pratique",
            value:
              "Traiter les VM comme du bétail : images standardisées, configuration automatisée, remplaçables à tout moment. Ne jamais stocker de données irremplaçables uniquement sur le disque local d'une VM.",
          },
          {
            label: "Concepts liés",
            value: "Images machine (AMI), groupes auto-scaling, disques persistants, SSH, cloud-init.",
          },
        ],
      },
    ],
  },
  {
    id: "compute-conteneurs",
    title: "Compute : les conteneurs managés",
    level: 3,
    intro:
      "Embarquer son application en conteneur et laisser la plateforme gérer les serveurs : ECS, Fargate, Cloud Run, AKS/EKS/GKE.",
    blocks: [
      {
        kind: "text",
        text: "Le conteneur (Docker) embarque l'application et ses dépendances dans une image portable. Les services managés exécutent ces images sans que vous gériez les VM sous-jacentes : vous décrivez le service (image, CPU, mémoire, réplicas), la plateforme s'occupe du placement, du redémarrage et de la mise à l'échelle.",
      },
      {
        kind: "text",
        text: "Applications packagées en images Docker, besoin de portabilité entre environnements, microservices, ou équipe déjà à l'aise avec les conteneurs.",
      },
      {
        kind: "fields",
        title: "Panorama factuel",
        fields: [          {
            label: "Sans orchestrateur (simple)",
            value:
              "AWS Fargate, Google Cloud Run, Azure Container Instances : vous fournissez l'image, la plateforme l'exécute. Idéal pour des services stateless et des tâches planifiées.",
          },
          {
            label: "Avec Kubernetes managé",
            value:
              "EKS (AWS), AKS (Azure), GKE (Google Cloud) : un cluster Kubernetes dont le fournisseur gère le plan de contrôle. Puissant mais avec une courbe d'apprentissage réelle.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Adopter Kubernetes managé pour une seule petite application : on paie la complexité d'un orchestrateur pour un besoin qu'un service simple couvrirait.",
          },
          {
            label: "Bonne pratique",
            value:
              "Commencer par l'option la plus simple (Cloud Run / Fargate / App Service conteneurs) et ne passer à Kubernetes que lorsque plusieurs services et équipes le justifient.",
          },
        ],
      },
    ],
  },
  {
    id: "compute-serverless",
    title: "Compute : le serverless (FaaS)",
    level: 3,
    intro:
      "AWS Lambda, Azure Functions, Cloud Functions : du code qui s'exécute à l'événement, sans serveur à gérer — ni à payer quand il ne tourne pas.",
    blocks: [
      {
        kind: "text",
        text: "En FaaS, vous déployez une fonction (quelques dizaines de lignes) associée à un déclencheur : requête HTTP, fichier téléversé, message en file, minuteur. La plateforme l'exécute à chaque événement, la met à l'échelle automatiquement, et facture au nombre d'exécutions et à leur durée. À zéro événement, la facture est (quasiment) zéro.",
      },
      {
        kind: "code",
        language: "bash",
        title: "Déployer une fonction AWS Lambda (exemple Node.js)",
        code: "zip function.zip index.js\naws lambda create-function --function-name hello \\\n  --runtime nodejs22.x --role arn:aws:iam::123456789012:role/lambda-role \\\n  --handler index.handler --zip-file fileb://function.zip\naws lambda invoke --function-name hello /tmp/out.json && cat /tmp/out.json",
      },
      {
        kind: "text",
        text: "Le serverless exécute votre code uniquement quand un événement survient, avec une mise à l'échelle automatique et une facturation à l'usage réel.",
      },
      {
        kind: "text",
        text: "Traitements événementiels (redimensionner une image uploadée, réagir à un webhook), API à trafic irrégulier, tâches planifiées, prototypes.",
      },
      {
        kind: "fields",
        title: "Le serverless : l'essentiel",
        fields: [          {
            label: "Quand l'éviter",
            value:
              "Traitements longs (limites de durée d'exécution), besoin de connexions persistantes nombreuses (chaque exécution rouvre ses connexions), latence critique au premier appel (cold start).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Mettre toute une application monolithique dans des fonctions sans repenser l'architecture : on obtient la complexité du distribué sans ses bénéfices.",
          },
          {
            label: "Bonne pratique",
            value:
              "Fonctions petites, sans état, idempotentes (réexécutables sans effet de bord doublé) ; état et fichiers dans les services dédiés (base de données, stockage objet).",
          },
          {
            label: "Concepts liés",
            value: "Déclencheurs (triggers), cold start, API Gateway, files de messages, Step Functions / Durable Functions / Workflows.",
          },
        ],
      },
    ],
  },
  {
    id: "comparatif-compute",
    title: "Comparatif : VM, conteneurs, serverless",
    level: 3,
    intro:
      "Les trois façons d'exécuter du code dans le cloud, comparées factuellement.",
    blocks: [
      {
        kind: "table",
        headers: ["Critère", "Machines virtuelles", "Conteneurs managés", "Serverless (FaaS)"],
        rows: [
          ["Unité de déploiement", "Image OS complète", "Image conteneur", "Fonction / code"],
          ["Gestion des serveurs", "Vous", "La plateforme", "La plateforme"],
          ["Démarrage", "Minutes", "Secondes", "Millisecondes à secondes (cold start)"],
          ["Mise à l'échelle", "Manuelle ou auto-scaling", "Automatique (réplicas)", "Automatique (par événement)"],
          ["Facturation", "Au temps allumé", "Au temps alloué", "Aux exécutions"],
          ["Coût à trafic nul", "Vous payez quand même", "Souvent > 0 (réplicas min)", "Quasiment zéro"],
          ["Contrôle", "Total (OS, réseau)", "Élevé (image, orchestration)", "Limité (runtime imposé)"],
          ["Idéal pour", "Migration existant, contrôle total", "Microservices, portabilité", "Événements, trafic irrégulier"],
        ],
      },
      {
        kind: "text",
        text: "Aucune option n'est universellement meilleure : une VM convient à une migration telle quelle, les conteneurs à une architecture microservices portable, le serverless à des traitements événementiels. Beaucoup d'architectures réelles combinent les trois.",
      },
    ],
  },
  {
    id: "stockage-objet",
    title: "Stockage objet",
    level: 3,
    intro:
      "S3, Azure Blob Storage, Cloud Storage : le stockage quasi illimité du cloud, accessible par API.",
    blocks: [
      {
        kind: "text",
        text: "Le stockage objet conserve des données sous forme d'objets (fichier + métadonnées + identifiant unique) dans des conteneurs appelés buckets. Pas de hiérarchie réelle de dossiers, pas de système de fichiers : on y accède par API HTTP. C'est le service le plus utilisé du cloud : sauvegardes, images, vidéos, sites statiques, data lakes.",
      },
      {
        kind: "command",
        label: "Créer un bucket et y déposer un fichier (AWS)",
        command: "aws s3 mb s3://mon-bucket-demo-12345",
        why: "`mb` (make bucket) crée un espace de stockage. Le nom doit être globalement unique chez le fournisseur — d'où un suffixe personnel.",
        verify: "`aws s3 ls` affiche le nouveau bucket.",
      },
      {
        kind: "command",
        label: "Envoyer un fichier",
        command: "aws s3 cp ./index.html s3://mon-bucket-demo-12345/",
        why: "`cp` copie un fichier local vers le bucket (ou l'inverse). Le transfert est chiffré en transit par HTTPS.",
        verify: "`aws s3 ls s3://mon-bucket-demo-12345/` liste le fichier.",
      },
      {
        kind: "text",
        text: "Le stockage objet est un disque dur infini accessible par API, où chaque fichier a une URL et des métadonnées.",
      },
      {
        kind: "text",
        text: "Fichiers statiques (images, vidéos, assets), sauvegardes, hébergement de sites statiques, data lakes, archives.",
      },
      {
        kind: "fields",
        title: "Le stockage objet : l'essentiel",
        fields: [          {
            label: "Quand ne pas l'utiliser",
            value:
              "Base de données transactionnelle, système de fichiers partagé entre serveurs avec verrous, accès nécessitant une faible latence au niveau bloc.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Rendre un bucket public « pour tester » et l'oublier : des robots scannent en permanence les buckets exposés. Voir la section erreurs.",
          },
          {
            label: "Bonne pratique",
            value:
              "Buckets privés par défaut, chiffrement activé, versioning pour les données importantes, cycle de vie (transition vers des classes d'archivage) pour maîtriser les coûts.",
          },
        ],
      },
    ],
  },
  {
    id: "stockage-bloc",
    title: "Stockage bloc",
    level: 3,
    intro:
      "EBS, Azure Managed Disks, Persistent Disks : le « disque dur » attaché à une machine virtuelle.",
    blocks: [
      {
        kind: "text",
        text: "Le stockage bloc fournit un volume brut (comme un disque dur) que l'on attache à une VM et que l'on formate avec un système de fichiers classique. Faible latence, idéal pour les systèmes d'exploitation et les bases de données. Contrairement au stockage objet, il est lié à une zone de disponibilité : un volume ne se partage pas entre VM de zones différentes.",
      },
      {
        kind: "text",
        text: "Le stockage bloc est le disque dur virtuel d'une VM : rapide, formaté en ext4/NTFS, attaché à une seule machine.",
      },
      {
        kind: "text",
        text: "Disque système des VM, volumes de bases de données, tout besoin d'accès bloc à faible latence.",
      },
      {
        kind: "fields",
        title: "Points clés",
        fields: [          {
            label: "Sauvegarde",
            value: "Via des snapshots (instantanés) : copies incrémentales du volume, stockées de façon redondante, restaurables en un nouveau volume.",
          },
          {
            label: "Erreur fréquente",
            value: "Supprimer une VM en laissant son disque orphelin : le volume continue d'être facturé alors que plus rien ne l'utilise.",
          },
          {
            label: "Bonne pratique",
            value: "Snapshots réguliers et automatisés des volumes critiques ; supprimer les volumes détachés ; chiffrer les volumes.",
          },
        ],
      },
    ],
  },
  {
    id: "stockage-fichier",
    title: "Stockage fichier partagé",
    level: 3,
    intro:
      "EFS, Azure Files, Filestore : un système de fichiers réseau partagé entre plusieurs machines.",
    blocks: [
      {
        kind: "text",
        text: "Le stockage fichier expose un partage réseau (NFS ou SMB) monté simultanément par plusieurs VM ou conteneurs. C'est le chaînon manquant entre le disque local (une seule machine) et l'objet (pas de système de fichiers) : plusieurs serveurs lisent et écrivent les mêmes fichiers.",
      },
      {
        kind: "text",
        text: "Contenus partagés entre serveurs (ex. uploads d'un CMS derrière plusieurs VM), répertoires home partagés, migration d'applications qui attendent un système de fichiers.",
      },
      {
        kind: "fields",
        title: "Points clés",
        fields: [          {
            label: "Quand ne pas l'utiliser",
            value:
              "Haute performance en écritures concurrentes intenses, ou cas où le stockage objet avec une couche d'abstraction suffit et coûte moins.",
          },
          {
            label: "Bonne pratique",
            value:
              "Restreindre l'accès réseau au partage (VPC privé uniquement), chiffrer les données, sauvegarder via le service de backup du fournisseur.",
          },
        ],
      },
    ],
  },
  {
    id: "comparatif-stockage",
    title: "Comparatif des stockages",
    level: 3,
    intro: "Objet, bloc, fichier : trois stockages, trois usages.",
    blocks: [
      {
        kind: "table",
        headers: ["Critère", "Objet", "Bloc", "Fichier"],
        rows: [
          ["Accès", "API HTTP", "Attaché à une VM", "Partage réseau (NFS/SMB)"],
          ["Hiérarchie", "Plate (préfixe simulant des dossiers)", "Système de fichiers", "Système de fichiers partagé"],
          ["Partage entre machines", "Oui, par URL/API", "Non (1 VM)", "Oui, monté par plusieurs"],
          ["Latence typique", "Dizaines de ms", "Faible (ms)", "Faible à moyenne"],
          ["Cas d'usage", "Assets, sauvegardes, sites statiques", "OS, bases de données", "Partages multi-serveurs"],
          ["Échelle", "Quasi illimitée", "Limitée par VM", "Élastique selon l'offre"],
        ],
      },
    ],
  },
  {
    id: "reseaux-vpc",
    title: "Réseaux virtuels (VPC)",
    level: 3,
    intro:
      "VPC, sous-réseaux, tables de routage : votre réseau privé dans le cloud.",
    blocks: [
      {
        kind: "text",
        text: "Un VPC (Virtual Private Cloud) est un réseau virtuel isolé que vous définissez : plage d'adresses IP privées, sous-réseaux, routage. Les sous-réseaux publics accueillent ce qui doit parler à Internet (via une passerelle), les sous-réseaux privés ce qui ne doit pas y être exposé (bases de données), avec un accès sortant via NAT si besoin.",
      },
      {
        kind: "diagram",
        title: "Topologie VPC classique",
        lines: [
          "VPC 10.0.0.0/16",
          " ├── Sous-réseau public 10.0.1.0/24  (serveurs web)",
          " │    └── Passerelle Internet ←→ Internet",
          " └── Sous-réseau privé 10.0.2.0/24   (base de données)",
          "      └── NAT (sortie uniquement : mises à jour, pas d'entrée)",
          "",
          "Règle : rien d'exposé directement sauf le strict nécessaire.",
        ],
      },
      {
        kind: "fields",
        title: "Concepts essentiels",
        fields: [
          {
            label: "Sous-réseau public vs privé",
            value:
              "Public : route vers une passerelle Internet. Privé : pas de route entrante depuis Internet. La base de données vit toujours en privé.",
          },
          {
            label: "Groupes de sécurité",
            value:
              "Pare-feu au niveau de chaque ressource (VM, base) : on autorise explicitement les flux nécessaires (ex. HTTPS entrant, rien d'autre). Voir la section sécurité réseau.",
          },
          {
            label: "DNS privé",
            value:
              "Résolution de noms interne au VPC pour que les services se trouvent par nom plutôt que par IP.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Tout mettre dans le sous-réseau public « parce que ça marche » : la base de données devient joignable depuis Internet.",
          },
          {
            label: "Bonne pratique",
            value:
              "Segmenter public/privé dès le début, même pour un petit projet : c'est gratuit et cela rend l'architecture évolutive.",
          },
        ],
      },
    ],
  },
  {
    id: "equilibrage-charge",
    title: "Équilibrage de charge",
    level: 3,
    intro:
      "Répartir le trafic entre plusieurs serveurs : haute disponibilité et élasticité.",
    blocks: [
      {
        kind: "text",
        text: "Un équilibreur de charge (load balancer) reçoit le trafic entrant et le répartit entre plusieurs instances saines, en vérifiant leur santé en continu. Si une instance tombe, elle est écartée automatiquement. C'est la pièce qui permet à la fois la haute disponibilité et la mise à l'échelle horizontale.",
      },
      {
        kind: "diagram",
        title: "Schéma type",
        lines: [
          "        Internet",
          "           │",
          "           ▼",
          "  ┌─ Équilibreur ─┐   (point d'entrée unique, HTTPS)",
          "  │  + health     │",
          "  │    checks     │",
          "  ├───┬───┬───┐",
          "  ▼   ▼   ▼",
          " VM1 VM2 VM3      (instances interchangeables)",
          "",
          "Une instance en panne = écartée, les autres absorbent le trafic.",
        ],
      },
      {
        kind: "text",
        text: "L'équilibreur répartit les requêtes sur des instances saines et rend la panne d'un serveur invisible aux utilisateurs.",
      },
      {
        kind: "fields",
        title: "Points clés",
        fields: [          {
            label: "Health checks",
            value:
              "La plateforme interroge régulièrement un endpoint de santé (`/health`) ; une instance qui ne répond plus est retirée de la rotation.",
          },
          {
            label: "TLS",
            value:
              "Le certificat HTTPS se termine généralement à l'équilibreur : un seul endroit à gérer au lieu d'un certificat par serveur.",
          },
          {
            label: "Bonne pratique",
            value:
              "Rendre les instances interchangeables (sans état local) : sessions et fichiers dans des services partagés, pas sur le disque de la VM.",
          },
        ],
      },
    ],
  },
  {
    id: "dns-cdn",
    title: "DNS et CDN",
    level: 3,
    intro:
      "Route 53, Azure DNS, Cloud DNS et les CDN : diriger le trafic et le servir au plus près des utilisateurs.",
    blocks: [
      {
        kind: "text",
        text: "Le DNS traduit les noms de domaine en adresses IP ; les fournisseurs proposent un DNS managé avec routage intelligent (géographique, par latence, avec bascule en cas de panne). Le CDN (Content Delivery Network) met en cache vos contenus statiques sur des serveurs répartis dans le monde (points de présence) pour les servir depuis le point le plus proche de l'utilisateur.",
      },
      {
        kind: "text",
        text: "CDN dès que vous servez du contenu statique à une audience géographiquement dispersée — c'est aussi une protection basique contre les pics de trafic.",
      },
      {
        kind: "fields",
        title: "DNS managé vs CDN",
        fields: [          {
            label: "DNS managé",
            value:
              "Route 53 (AWS), Azure DNS, Cloud DNS (GCP) : haute disponibilité garantie par le fournisseur, enregistrements classiques (A, CNAME, MX…) plus routages avancés (bascule automatique vers une région saine).",
          },
          {
            label: "CDN",
            value:
              "CloudFront (AWS), Azure CDN / Front Door, Cloud CDN (GCP) : cache des images, vidéos, assets statiques au plus près des utilisateurs. Réduit la latence et la charge sur vos serveurs d'origine.",
          },
          {
            label: "Bonne pratique",
            value:
              "Servir le site statique depuis le stockage objet + CDN avec HTTPS : architecture simple, rapide, quasi gratuite à faible trafic.",
          },
        ],
      },
    ],
  },
  {
    id: "iam-moindre-privilege",
    title: "IAM et moindre privilège",
    level: 3,
    intro:
      "Identity and Access Management : qui a le droit de faire quoi. Le pilier de la sécurité cloud.",
    blocks: [
      {
        kind: "text",
        text: "Dans le cloud, tout accès passe par l'IAM : utilisateurs, groupes, rôles et politiques qui décrivent précisément quelles actions sont autorisées sur quelles ressources. Il n'y a pas de « réseau interne de confiance » : chaque appel d'API est authentifié et autorisé. Le principe cardinal est le moindre privilège : n'accorder que les droits strictement nécessaires.",
      },
      {
        kind: "code",
        language: "bash",
        title: "Créer un utilisateur avec droits limités (AWS)",
        code: "# Créer l'utilisateur\naws iam create-user --user-name dev-lecture\n\n# Attacher une politique PRÉDÉFINIE en lecture seule (pas d'admin !)\naws iam attach-user-policy --user-name dev-lecture \\\n  --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess\n\n# Vérifier\naws iam list-attached-user-policies --user-name dev-lecture",
      },
      {
        kind: "fields",
        title: "Les concepts IAM",
        fields: [
          {
            label: "Utilisateurs et groupes",
            value:
              "Comptes nominatifs pour les humains, regroupés par fonction. Jamais de compte partagé : en cas d'incident, on doit savoir qui a fait quoi.",
          },
          {
            label: "Rôles",
            value:
              "Identités temporaires assumées par un humain ou un service (ex. une VM qui doit lire un bucket). Pas de clé permanente : les identifiants sont temporaires et renouvelés automatiquement. À préférer aux clés d'accès.",
          },
          {
            label: "Politiques",
            value:
              "Documents qui autorisent ou refusent des actions sur des ressources. Par défaut tout est refusé ; on ouvre explicitement. Les politiques prédéfinies (`ReadOnlyAccess`, `PowerUserAccess`…) couvrent les cas courants.",
          },
          {
            label: "Moindre privilège",
            value:
              "Accorder le minimum nécessaire, élargir sur justification. Un développeur n'a pas besoin de supprimer des bases de production ; une application n'a pas besoin d'administrer l'IAM.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Donner `AdministratorAccess` à tout le monde « pour ne pas être bloqué » : le jour où un poste est compromis, l'attaquant hérite de tous les droits.",
          },
          {
            label: "Bonne pratique",
            value:
              "Rôles plutôt que clés, groupes plutôt qu'attachements individuels, revue régulière des droits, MFA obligatoire pour les accès sensibles.",
          },
        ],
      },
    ],
  },
  {
    id: "securite-reseau",
    title: "Sécurité réseau : groupes et pare-feu",
    level: 3,
    intro:
      "Security groups, NSG, règles de pare-feu : le filtrage fin du trafic, ressource par ressource.",
    blocks: [
      {
        kind: "text",
        text: "Chaque fournisseur propose un pare-feu distribué attaché aux ressources : security groups (AWS), NSG - network security groups (Azure), règles de pare-feu VPC (GCP). Le principe est identique : par défaut tout est fermé, on ouvre explicitement des flux (protocole, port, source).",
      },
      {
        kind: "code",
        language: "bash",
        title: "Autoriser HTTPS depuis Internet sur un groupe existant (AWS)",
        code: "# Ouvrir le port 443 (HTTPS) au monde entier — OK pour un serveur web public\naws ec2 authorize-security-group-ingress --group-id sg-0123456789abcdef0 \\\n  --protocol tcp --port 443 --cidr 0.0.0.0/0\n\n# Restreindre SSH à votre seule adresse IP — la bonne pratique\naws ec2 authorize-security-group-ingress --group-id sg-0123456789abcdef0 \\\n  --protocol tcp --port 22 --cidr 203.0.113.42/32",
      },
      {
        kind: "fields",
        title: "Règles d'or",
        fields: [
          {
            label: "`0.0.0.0/0`",
            value:
              "Signifie « tout Internet ». Acceptable pour HTTP/HTTPS d'un serveur public, jamais pour SSH, les bases de données ou les consoles d'administration.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Ouvrir le port 22 (SSH) ou 3389 (RDP) à `0.0.0.0/0` : des robots tentent des connexions en permanence. Restreindre à votre IP ou passer par un bastion / VPN.",
          },
          {
            label: "Bonne pratique",
            value:
              "Référencer des groupes plutôt que des IP quand c'est possible (ex. « les VM web peuvent joindre la base »), documenter chaque règle ouverte, auditer régulièrement.",
          },
        ],
      },
    ],
  },
  {
    id: "secrets-chiffrement",
    title: "Secrets et chiffrement",
    level: 3,
    intro:
      "Ne jamais coder un secret en dur : gestionnaires de secrets et chiffrement géré par le fournisseur.",
    blocks: [
      {
        kind: "text",
        text: "Mots de passe de bases, clés d'API, certificats : ces secrets ne doivent jamais figurer dans le code, les images Docker ou les dépôts Git. Les fournisseurs proposent des coffres dédiés (Secrets Manager / Key Vault / Secret Manager) avec chiffrement, contrôle d'accès fin et rotation automatique. Le chiffrement des données au repos est proposé — souvent activé par défaut — via un service de gestion de clés (KMS / Key Vault / Cloud KMS).",
      },
      {
        kind: "text",
        text: "Les secrets vivent dans un coffre chiffré avec contrôle d'accès, jamais dans le code ; l'application les récupère à l'exécution via son rôle IAM.",
      },
      {
        kind: "fields",
        title: "Points clés",
        fields: [          {
            label: "Rotation",
            value:
              "Les coffres peuvent changer automatiquement les mots de passe à intervalle régulier, sans intervention humaine — ce qu'aucun fichier `.env` ne fait.",
          },
          {
            label: "Chiffrement au repos",
            value:
              "Disques, buckets, bases : chiffrables avec des clés gérées par le fournisseur ou vos propres clés (apportées ou générées dans le KMS).",
          },
          {
            label: "Chiffrement en transit",
            value:
              "TLS partout : entre utilisateurs et services, et entre services quand c'est possible. Les CLI et SDK chiffrent par défaut.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Commiter un fichier `.env` contenant des clés : les robots scannent GitHub en quelques minutes et les clés sont exploitées avant même que vous vous en rendiez compte.",
          },
          {
            label: "Bonne pratique",
            value:
              "Variables d'environnement alimentées par le coffre au déploiement, jamais commitées ; clés différentes par environnement ; révocation immédiate en cas d'exposition.",
          },
        ],
      },
    ],
  },
  {
    id: "bases-de-donnees",
    title: "Bases de données managées",
    level: 3,
    intro:
      "RDS, Cloud SQL, Azure SQL, DynamoDB, Firestore, Cosmos DB : la base sans l'administration.",
    blocks: [
      {
        kind: "text",
        text: "Faire tourner une base de données soi-même, c'est gérer les sauvegardes, la réplication, les correctifs et les pannes à 3h du matin. Les offres managées prennent en charge tout cela : vous choisissez le moteur et la taille, le fournisseur assure l'exploitation. Deux familles : relationnel (SQL) et NoSQL.",
      },
      {
        kind: "table",
        headers: ["Famille", "Services", "Quand l'utiliser"],
        rows: [
          [
            "Relationnel managé",
            "RDS (AWS), Cloud SQL (GCP), Azure SQL",
            "Données structurées, transactions, intégrité référentielle : la majorité des applications métier. Moteurs connus : PostgreSQL, MySQL.",
          ],
          [
            "NoSQL clé-valeur / document",
            "DynamoDB (AWS), Firestore (GCP), Cosmos DB (Azure)",
            "Très fort volume, schéma flexible, latence faible à grande échelle ; quand le modèle relationnel n'apporte rien.",
          ],
          [
            "Entrepôt / analytique",
            "Redshift, BigQuery, Synapse",
            "Requêtes analytiques sur de gros volumes (reporting, data science), pas pour le temps réel transactionnel.",
          ],
        ],
      },
      {
        kind: "fields",
        title: "Points clés",
        fields: [
          {
            label: "Sauvegardes",
            value:
              "Sauvegardes automatiques et restauration à un instant donné incluses : testez régulièrement la restauration, une sauvegarde non testée n'est pas une sauvegarde.",
          },
          {
            label: "Haute disponibilité",
            value:
              "Option multi-zone : une réplique synchrone dans une autre zone de disponibilité avec bascule automatique en cas de panne.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Exposer la base sur Internet « temporairement » pour la déboguer : elle doit vivre dans un sous-réseau privé, joignable uniquement par l'application.",
          },
          {
            label: "Bonne pratique",
            value:
              "Choisir PostgreSQL managé par défaut sauf raison contraire, chiffrer, sauvegarder, ne jamais exposer publiquement.",
          },
        ],
      },
    ],
  },
  {
    id: "monitoring",
    title: "Monitoring et alertes",
    level: 3,
    intro:
      "CloudWatch, Azure Monitor, Cloud Monitoring : voir ce qui se passe et être prévenu avant les utilisateurs.",
    blocks: [
      {
        kind: "text",
        text: "Chaque fournisseur collecte automatiquement des métriques (CPU, mémoire, requêtes, erreurs, latence) pour vos ressources. Le travail consiste à choisir les bonnes métriques, définir des seuils d'alerte sensés et centraliser les logs pour comprendre les incidents.",
      },
      {
        kind: "fields",
        title: "Les trois piliers",
        fields: [
          {
            label: "Métriques",
            value:
              "Valeurs numériques dans le temps : CPU, requêtes/seconde, taux d'erreur, latence. Base des tableaux de bord et des alertes.",
          },
          {
            label: "Logs",
            value:
              "Journaux d'événements centralisés (CloudWatch Logs, Log Analytics, Cloud Logging). Indispensables pour diagnostiquer : une métrique dit « ça va mal », un log dit « pourquoi ».",
          },
          {
            label: "Traces",
            value:
              "Suivi d'une requête à travers les services (X-Ray, Application Insights, Cloud Trace). Utile quand l'application comporte plusieurs services.",
          },
          {
            label: "Alertes",
            value:
              "Seuils sur les métriques (ex. taux d'erreur > 1 % pendant 5 min) avec notification (e-mail, SMS, Slack, PagerDuty). Alerter sur les symptômes utilisateurs, pas sur chaque pic CPU.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Alerter sur tout : 200 alertes par jour que plus personne ne lit. Ou l'inverse : aucune alerte, et découvrir la panne par un client mécontent.",
          },
          {
            label: "Bonne pratique",
            value:
              "Quelques alertes actionnables (taux d'erreur, latence, budget), des tableaux de bord par service, et des logs structurés (JSON) requêtables.",
          },
        ],
      },
    ],
  },
  {
    id: "facturation",
    title: "Comprendre la facturation",
    level: 3,
    intro:
      "À l'usage, réservé, spot : les trois façons de payer, et pourquoi la facture est si difficile à prévoir.",
    blocks: [
      {
        kind: "text",
        text: "La facturation cloud combine des dizaines de compteurs : heures de VM, Go stockés, Go transférés, millions de requêtes, sauvegardes… Trois modèles tarifaires coexistent pour le calcul, avec un arbitrage prix/flexibilité.",
      },
      {
        kind: "table",
        headers: ["Modèle", "Principe", "Quand l'utiliser"],
        rows: [
          [
            "À la demande (on-demand)",
            "Plein tarif, sans engagement, arrêt à tout moment",
            "Par défaut : charges variables, tests, pics imprévus",
          ],
          [
            "Réservé / engagement",
            "Remise en échange d'un engagement de durée ou de consommation",
            "Charge stable et prévisible (ex. production 24/7)",
          ],
          [
            "Spot / préemptible",
            "Capacité excédentaire à prix réduit, récupérable avec préavis",
            "Traitements interruptibles : batch, CI, calculs parallélisables",
          ],
        ],
      },
      {
        kind: "fields",
        title: "Les pièges de la facture",
        fields: [
          {
            label: "Le transfert de données",
            value:
              "Souvent le poste surprise : l'entrée est généralement gratuite, la sortie vers Internet est facturée au Go. Servir des vidéos lourdes depuis le mauvais endroit coûte cher.",
          },
          {
            label: "Les ressources orphelines",
            value:
              "Disques détachés, snapshots oubliés, adresses IP réservées inutilisées, équilibreurs sans cible : chacun facture quelques euros par mois, en silence.",
          },
          {
            label: "Les mauvaises échelles",
            value:
              "Une base surdimensionnée x8 « pour être tranquille » coûte x8 en permanence. Le surdimensionnement est le premier poste d'économie.",
          },
          {
            label: "Bonne pratique",
            value:
              "Consulter la facture détaillée chaque mois, comprendre les trois premiers postes, puis optimiser dans cet ordre.",
          },
        ],
      },
    ],
  },
  {
    id: "finops",
    title: "FinOps : garder le contrôle des coûts",
    level: 3,
    intro:
      "La discipline qui évite les factures surprises : visibilité, alertes, étiquetage et droitsizing.",
    blocks: [
      {
        kind: "text",
        text: "FinOps est la pratique qui consiste à donner à chaque équipe la visibilité sur ce qu'elle dépense dans le cloud et les moyens d'agir. Ce n'est pas « dépenser moins à tout prix », c'est dépenser en connaissance de cause.",
      },
      {
        kind: "command",
        label: "Créer une alerte de budget (AWS)",
        command: "aws budgets create-budget --account-id 123456789012 --budget file://budget.json --notifications-with-subscribers file://notify.json",
        why: "Crée un budget mensuel décrit dans budget.json avec notification e-mail à 80 % de consommation réelle (notify.json). À adapter : le principe est d'être alerté AVANT de dépasser, pas après.",
        verify: "`aws budgets describe-budgets --account-id 123456789012` affiche le budget créé.",
      },
      {
        kind: "fields",
        title: "Les pratiques FinOps",
        fields: [
          {
            label: "Étiqueter (tags)",
            value:
              "Chaque ressource porte des étiquettes (`projet`, `environnement`, `propriétaire`) : sans elles, impossible de savoir qui dépense quoi. À imposer dès le début.",
          },
          {
            label: "Alertes de budget",
            value:
              "Une alerte par projet/environnement, avec seuils progressifs (50 %, 80 %, 100 %). Gratuites, elles sont la ceinture de sécurité minimale.",
          },
          {
            label: "Droitsizing",
            value:
              "Ajuster la taille des ressources à la consommation réelle observée sur les métriques, pas à l'intuition du premier jour.",
          },
          {
            label: "Arrêter l'inutile",
            value:
              "Environnements de dev éteints la nuit et le week-end (souvent automatisable), ressources de test détruites après usage.",
          },
          {
            label: "Bonne pratique",
            value:
              "Revue mensuelle de la facture en équipe : 30 minutes pour identifier les trois postes principaux et décider d'une action.",
          },
        ],
      },
    ],
  },
  {
    id: "haute-disponibilite",
    title: "Haute disponibilité : concevoir pour la panne",
    level: 3,
    intro:
      "Dans le cloud, on ne cherche pas des machines qui ne tombent jamais : on conçoit des systèmes qui survivent à leur chute.",
    blocks: [
      {
        kind: "text",
        text: "Le fournisseur garantit la disponibilité de son infrastructure via les zones de disponibilité ; c'est à vous d'en profiter. Une application mono-zone reste vulnérable à la panne d'un datacenter entier, aussi rare soit-elle.",
      },
      {
        kind: "fields",
        title: "Les principes",
        fields: [
          {
            label: "Multi-zone",
            value:
              "Répartir les instances sur au moins deux zones de disponibilité derrière un équilibreur : la panne d'une zone devient invisible.",
          },
          {
            label: "Sans état",
            value:
              "Les serveurs ne conservent rien en local (sessions, fichiers, uploads) : tout l'état vit dans des services partagés (base, cache, stockage objet). N'importe quelle instance peut alors remplacer n'importe quelle autre.",
          },
          {
            label: "Dégradation gracieuse",
            value:
              "Si un service annexe tombe (recommandations, analytics), l'essentiel continue de fonctionner. Les dépendances critiques ont des replis.",
          },
          {
            label: "Bonne pratique",
            value:
              "Tester la panne : arrêter volontairement une instance ou une zone (chaos engineering à petite échelle) pour vérifier que le système tient vraiment.",
          },
        ],
      },
    ],
  },
  {
    id: "sauvegarde-reprise",
    title: "Sauvegarde et reprise d'activité",
    level: 3,
    intro: "RPO, RTO et les outils du cloud pour revenir en arrière après un incident.",
    blocks: [
      {
        kind: "text",
        text: "RPO répond à « combien de données puis-je perdre ? », RTO à « combien de temps puis-je être en panne ? ». Tout le plan de sauvegarde en découle.",
      },
      {
        kind: "fields",
        title: "Les deux indicateurs",
        fields: [          {
            label: "RPO (Recovery Point Objective)",
            value:
              "Quantité maximale de données que l'on accepte de perdre, exprimée en temps. RPO d'une heure = sauvegardes au moins horaires.",
          },
          {
            label: "RTO (Recovery Time Objective)",
            value:
              "Durée maximale acceptable pour restaurer le service après un incident. RTO de 4 h = le service doit être revenu en 4 h.",
          },
          {
            label: "Outils cloud",
            value:
              "Snapshots automatiques des disques et bases, réplication inter-régions du stockage objet, sauvegardes managées des bases avec restauration à un instant donné.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Avoir des sauvegardes sans jamais tester la restauration : le jour de l'incident, on découvre qu'elles sont corrompues ou incomplètes.",
          },
          {
            label: "Bonne pratique",
            value:
              "Automatiser les sauvegardes, tester la restauration au moins une fois par trimestre, documenter la procédure pas à pas.",
          },
        ],
      },
    ],
  },
  {
    id: "iac",
    title: "Infrastructure as Code",
    level: 3,
    intro:
      "Décrire l'infrastructure en fichiers versionnés plutôt qu'en clics : Terraform, CloudFormation, Bicep.",
    blocks: [
      {
        kind: "text",
        text: "L'Infrastructure as Code (IaC) consiste à décrire les ressources cloud dans des fichiers texte versionnés avec le code applicatif. On obtient : reproductibilité (recréer un environnement à l'identique), revue par les pairs, historique des changements, et destruction propre.",
      },
      {
        kind: "code",
        language: "bash",
        title: "Exemple Terraform : un bucket de stockage (syntaxe HCL)",
        code: "# main.tf — description déclarative : « je veux ce bucket »\nresource \"aws_s3_bucket\" \"site\" {\n  bucket = \"mon-site-statique-12345\"\n}\n\n# Puis :\n# terraform init     → prépare le projet\n# terraform plan     → montre ce qui va changer (sans l'appliquer)\n# terraform apply    → crée réellement les ressources\n# terraform destroy  → détruit tout proprement",
      },
      {
        kind: "table",
        headers: ["Outil", "Éditeur", "Particularité"],
        rows: [
          ["Terraform", "HashiCorp (open source)", "Multi-fournisseurs : le même langage pour AWS, Azure, GCP"],
          ["CloudFormation", "AWS", "Natif AWS, intégré à la console et à l'IAM"],
          ["Bicep / ARM", "Microsoft", "Natif Azure, syntaxe moderne (Bicep) au-dessus d'ARM"],
          ["Pulumi", "Pulumi (open source)", "IaC dans de vrais langages (TypeScript, Python, Go…)"],
        ],
      },
      {
        kind: "text",
        text: "Dès qu'une infrastructure doit durer : tout ce qui est créé à la main en console devient impossible à reproduire ou à auditer.",
      },
      {
        kind: "fields",
        title: "Points clés",
        fields: [          {
            label: "Erreur fréquente",
            value:
              "Mélanger console et IaC sur les mêmes ressources : l'outil écrase les changements manuels (ou l'inverse), et plus personne ne sait quel est l'état réel.",
          },
          {
            label: "Bonne pratique",
            value:
              "Un dépôt dédié, des modules réutilisables, `plan` relu avant chaque `apply`, états distants verrouillés en équipe.",
          },
        ],
      },
    ],
  },
  {
    id: "ci-cd",
    title: "CI/CD vers le cloud",
    level: 3,
    intro:
      "Du commit au déploiement automatique : pipelines qui testent, construisent et déploient.",
    blocks: [
      {
        kind: "text",
        text: "L'intégration continue (CI) compile et teste le code à chaque commit ; le déploiement continu (CD) pousse automatiquement vers le cloud si les tests passent. Les fournisseurs proposent leurs pipelines (CodePipeline, Azure DevOps, Cloud Build), mais les outils agnostiques (GitHub Actions, GitLab CI) dominent en pratique.",
      },
      {
        kind: "diagram",
        title: "Pipeline type",
        lines: [
          "git push",
          "   │",
          "   ▼",
          "CI : tests + build (+ analyse de sécurité)",
          "   │  échec → notification, rien n'est déployé",
          "   ▼  succès",
          "Artefact (image Docker / archive)",
          "   │",
          "   ▼",
          "CD : déploiement → staging → (validation) → production",
          "   │",
          "   ▼",
          "Monitoring : vérifier que la nouvelle version se comporte bien",
        ],
      },
      {
        kind: "fields",
        title: "Points clés",
        fields: [
          {
            label: "OIDC plutôt que clés",
            value:
              "Les pipelines modernes s'authentifient au cloud via OIDC (identité fédérée temporaire) plutôt qu'avec des clés d'accès permanentes stockées en secrets — moins de secrets à gérer, moins de risques.",
          },
          {
            label: "Environnements",
            value:
              "Déployer d'abord sur un environnement de préproduction identique à la prod, valider, puis promouvoir. Jamais de déploiement direct en production depuis un poste local.",
          },
          {
            label: "Bonne pratique",
            value:
              "Pipeline en échec = déploiement bloqué, sans exception ; capacité de revenir en arrière (rollback) en un clic ou une commande.",
          },
        ],
      },
    ],
  },
  {
    id: "fournisseurs",
    title: "Les grands fournisseurs, factuellement",
    level: 3,
    intro:
      "AWS, Azure, Google Cloud : ce qui les distingue vraiment, sans classement ni verdict.",
    blocks: [
      {
        kind: "text",
        text: "Trois acteurs dominent le cloud public mondial. Leurs offres se recouvrent largement : chacun propose du calcul, du stockage, des bases, de l'IA, de l'IoT. Les différences portent sur l'historique, l'écosystème et les points forts reconnus.",
      },
      {
        kind: "table",
        headers: ["", "AWS (Amazon Web Services)", "Microsoft Azure", "Google Cloud"],
        rows: [
          ["Lancement", "2006 (S3, EC2 — pionnier)", "2010", "2008 (App Engine), GCP structuré ensuite"],
          ["Catalogue", "Le plus étendu (des centaines de services)", "Très large, fort sur l'entreprise", "Large, avec une réputation data/IA"],
          ["Écosystème naturel", "Startups, web, grand public cloud", "Entreprises Microsoft (Windows, Office, Active Directory)", "Data, analytics, Kubernetes (né chez Google)"],
          ["CLI", "`aws`", "`az`", "`gcloud`"],
          ["Organisation", "Comptes, régions, AZ", "Abonnements, groupes de ressources", "Projets"],
          ["Documentation", "docs.aws.amazon.com", "learn.microsoft.com/azure", "cloud.google.com/docs"],
        ],
      },
      {
        kind: "fields",
        title: "Choisir sans se tromper",
        fields: [
          {
            label: "Le critère entreprise",
            value:
              "Si l'organisation vit déjà dans l'écosystème Microsoft (identités Entra ID, licences, contrats), Azure s'intègre naturellement. Sinon, le choix est plus ouvert.",
          },
          {
            label: "Le critère compétences",
            value:
              "L'équipe connaît déjà un fournisseur ? La productivité immédiate bat souvent les différences techniques, qui sont réelles mais secondaires pour débuter.",
          },
          {
            label: "Le critère besoin",
            value:
              "Besoin data/ML avancé, Kubernetes, ou services spécifiques : comparer concrètement les offres sur ce besoin précis plutôt que les catalogues entiers.",
          },
          {
            label: "Bonne pratique",
            value:
              "Choisir UN fournisseur pour commencer, apprendre ses fondamentaux (IAM, réseau, facturation), et n'envisager le multi-cloud que comme une décision d'entreprise mûrie.",
          },
          {
            label: "Concepts liés",
            value: "Verrouillage fournisseur (lock-in), stratégies de sortie, cloud souverain.",
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
      "Les dix classiques du cloud : ce qui casse, ce qui coûte, et comment l'éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Clés d'accès exposées",
            value:
              "Problem : des clés commitées sur GitHub ou collées dans un forum. Why : copier-coller rapide pour « faire marcher ». Better : rôles IAM et identités temporaires ; si une clé fuite, la révoquer immédiatement et auditer son usage.",
          },
          {
            label: "Bucket de stockage public par accident",
            value:
              "Problem : des données privées accessibles à tout Internet via une URL. Why : option « public » cochée pour tester, jamais décochée. Better : buckets privés par défaut, accès via URLs signées temporaires quand un partage est nécessaire.",
          },
          {
            label: "Ports d'administration ouverts au monde",
            value:
              "Problem : SSH/RDP ou consoles de base de données joignables depuis tout Internet. Why : règle `0.0.0.0/0` mise « pour que ça marche ». Better : restreindre à votre IP, bastion ou VPN ; rien d'administratif en public.",
          },
          {
            label: "Pas de MFA sur les comptes sensibles",
            value:
              "Problem : un mot de passe volé = contrôle total. Why : « je le ferai plus tard ». Better : MFA obligatoire sur le compte racine et les administrateurs, dès le premier jour.",
          },
          {
            label: "Ressources oubliées qui facturent",
            value:
              "Problem : VM de test, disques orphelins, snapshots, IP réservées continuent de coûter des mois. Why : créées vite, jamais nettoyées. Better : nommer, étiqueter, dater les ressources de test ; alertes de budget ; nettoyage régulier.",
          },
          {
            label: "Aucune alerte de budget",
            value:
              "Problem : découvrir la facture de 800 € à la fin du mois. Why : « c'était juste un test ». Better : alerte dès la création du compte, seuils progressifs, revue mensuelle.",
          },
          {
            label: "Secrets codés en dur",
            value:
              "Problem : mots de passe et clés d'API dans le code, les images Docker ou Git. Why : plus rapide que configurer un coffre. Better : gestionnaire de secrets du fournisseur, variables d'environnement injectées au déploiement.",
          },
          {
            label: "Tout en mono-zone, sans sauvegarde",
            value:
              "Problem : la panne d'une zone = service mort et données perdues. Why : « ça n'arrive jamais ». Better : multi-zone pour le critique, sauvegardes automatiques testées.",
          },
          {
            label: "Tout cliquer en console, rien en code",
            value:
              "Problem : infrastructure impossible à reproduire, à auditer ou à détruire proprement. Why : la console est plus rapide pour commencer. Better : IaC dès que l'infrastructure doit durer ; la console reste pour explorer et dépanner.",
          },
          {
            label: "Ignorer le modèle de responsabilité partagée",
            value:
              "Problem : croire que « c'est dans le cloud donc c'est sécurisé ». Why : confusion entre sécurité DE l'infrastructure (fournisseur) et sécurité DANS le cloud (vous). Better : patcher, configurer, chiffrer, contrôler les accès — c'est votre part du contrat.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro: "La checklist qui sépare un usage amateur d'un usage professionnel du cloud.",
    blocks: [
      {
        kind: "list",
        items: [
          "Sécurité d'abord : MFA partout, moindre privilège en IAM, rien d'administratif exposé sur Internet, secrets dans un coffre.",
          "Réseau segmenté : sous-réseaux publics/privés, bases de données en privé, groupes de sécurité minimaux et documentés.",
          "Coûts sous contrôle : alerte de budget dès le jour 1, étiquetage systématique, revue mensuelle de la facture, ressources de test détruites après usage.",
          "Infrastructure en code : tout ce qui doit durer est décrit en IaC, versionné et relu avant application.",
          "Sauvegardes testées : automatiques, chiffrées, avec restauration vérifiée périodiquement ; RPO/RTO définis pour le critique.",
          "Observabilité : logs centralisés, métriques clés avec alertes actionnables, pas de « boîte noire » en production.",
          "Environnements séparés : dev, staging et prod isolés (comptes, projets ou groupes distincts), jamais de tests sur la prod.",
          "Documentation : schéma d'architecture à jour, procédure de restauration, contacts et accès en cas d'incident.",
        ],
      },
    ],
  },
  {
    id: "projets-realistes",
    title: "Projets réalistes",
    level: 3,
    intro: "Quatre projets de difficulté croissante pour passer de la théorie à la pratique professionnelle.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Site statique sur stockage objet + CDN",
        fields: [
          { label: "Compétences requises", value: "HTML/CSS, ligne de commande, notions de DNS" },
          { label: "Ce que vous construisez", value: "Un site vitrine hébergé sur du stockage objet (S3, Blob, Cloud Storage) servi via CDN en HTTPS avec votre nom de domaine" },
          { label: "Ce que vous apprenez", value: "Buckets, permissions, CDN, DNS, HTTPS, coûts quasi nuls — le déploiement cloud le plus simple qui soit" },
          { label: "Difficulté attendue", value: "Faible — un week-end" },
          { label: "Projet suivant", value: "API conteneurisée" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — API conteneurisée avec base managée",
        fields: [
          { label: "Compétences requises", value: "Docker, un langage backend, SQL de base" },
          { label: "Ce que vous construisez", value: "Une API REST conteneurisée déployée sur un service managé (Cloud Run, Fargate, App Service) avec base PostgreSQL managée en réseau privé" },
          { label: "Ce que vous apprenez", value: "Images Docker, variables d'environnement, secrets, VPC privé/public, health checks, logs centralisés" },
          { label: "Difficulté attendue", value: "Moyenne — une à deux semaines" },
          { label: "Projet suivant", value: "Architecture serverless événementielle" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Architecture serverless événementielle",
        fields: [
          { label: "Compétences requises", value: "FaaS, stockage objet, files de messages" },
          { label: "Ce que vous construisez", value: "Un pipeline : fichier déposé dans un bucket → fonction de traitement → file de messages → seconde fonction → résultat en base, avec alertes en cas d'échec" },
          { label: "Ce que vous apprenez", value: "Déclencheurs, idempotence, gestion d'erreurs et de réessais, observabilité distribuée, coûts à l'usage" },
          { label: "Difficulté attendue", value: "Élevée — deux à trois semaines" },
          { label: "Projet suivant", value: "Plateforme complète en IaC" },
        ],
      },
      {
        kind: "fields",
        title: "Professionnel — Plateforme complète en IaC avec CI/CD",
        fields: [
          { label: "Compétences requises", value: "Terraform, CI/CD, réseau, sécurité" },
          { label: "Ce que vous construisez", value: "Une plateforme multi-environnements (dev/staging/prod) entièrement décrite en Terraform : réseau, conteneurs, base, monitoring, budgets — déployée par pipeline depuis Git" },
          { label: "Ce que vous apprenez", value: "Modules IaC réutilisables, revue de `plan`, séparation des environnements, OIDC pour les pipelines, FinOps, documentation d'architecture" },
          { label: "Difficulté attendue", value: "Professionnelle — un mois et plus" },
          { label: "Projet suivant", value: "Certification cloud (AWS/Azure/GCP) ou spécialisation Kubernetes" },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources officielles",
    level: 3,
    intro: "Les documentations de référence, par fournisseur — la source à privilégier.",
    blocks: [
      {
        kind: "list",
        items: [
          "AWS : `docs.aws.amazon.com` — documentation complète par service, ateliers guidés (AWS Skill Builder pour la formation).",
          "Azure : `learn.microsoft.com/azure` — documentation et parcours d'apprentissage gratuits (Microsoft Learn).",
          "Google Cloud : `cloud.google.com/docs` — documentation et tutoriels, Cloud Skills Boost pour la pratique guidée.",
          "NIST SP 800-145 : la définition officielle du cloud computing (5 caractéristiques, 3 modèles de service, 4 modèles de déploiement) — courte et fondatrice.",
          "Terraform : `developer.hashicorp.com/terraform/docs` — documentation officielle de l'IaC multi-cloud.",
          "Well-Architected Frameworks : chaque fournisseur publie son référentiel d'architecture (AWS Well-Architected, Azure Well-Architected, Google Cloud Architecture Framework) — les bonnes pratiques officielles par pilier (sécurité, fiabilité, coûts…).",
        ],
      },
      {
        kind: "text",
        text: "Conseil : pour chaque service, la page « concepts » ou « vue d'ensemble » de la documentation officielle vaut mieux que dix tutoriels de blog — elle est à jour et décrit les limites réelles du service.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Les prolongements naturels après les fondamentaux du cloud.",
    blocks: [
      {
        kind: "fields",
        title: "Pistes",
        fields: [
          {
            label: "Kubernetes",
            value: "L'orchestrateur de conteneurs standard : EKS, AKS, GKE. La suite logique après les conteneurs managés simples.",
          },
          {
            label: "DevOps",
            value: "CI/CD avancé, GitOps, observabilité poussée : la culture et les outils qui industrialisent ce que le cloud rend possible.",
          },
          {
            label: "Terraform en profondeur",
            value: "Modules, workspaces, gestion d'état en équipe : passer de « ça marche » à « c'est industrialisé ».",
          },
          {
            label: "Sécurité cloud",
            value: "IAM avancé, détection d'intrusion, conformité : un domaine à part entière, très demandé.",
          },
          {
            label: "Certifications",
            value: "AWS Certified, Microsoft Azure, Google Cloud Certified : utiles comme cadre d'apprentissage structuré et signal sur un CV, sans remplacer la pratique.",
          },
          {
            label: "Concepts liés",
            value: "Edge computing, serverless avancé, data engineering, MLOps — des spécialisations qui partent toutes des fondamentaux couverts ici.",
          },
        ],
      },
    ],
  },
];

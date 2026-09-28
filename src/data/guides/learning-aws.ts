import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète d'AWS : de zéro à une utilisation
 * professionnelle du cloud Amazon. 3 niveaux d'information
 * (Aperçu / Pratique / Approfondi) avec divulgation progressive.
 * Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_AWS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est AWS, son modèle économique et pourquoi il structure la façon de penser le cloud.",
    blocks: [
      {
        kind: "text",
        text: "AWS (Amazon Web Services) est la plateforme cloud la plus complète du marché : des centaines de services pour calculer, stocker, mettre en réseau et déployer des applications, disponibles à la demande dans des régions du monde entier. On y loue des ressources à l'heure ou à la seconde au lieu d'acheter des serveurs.",
      },
      {
        kind: "text",
        text: "Le changement de paradigme : en informatique traditionnelle, on dimensionne pour le pic et on paie le matériel même inutilisé. Sur AWS, on provisionne en minutes, on paie à l'usage réel, et on libère les ressources quand on n'en a plus besoin. Cette élasticité est le cœur du cloud — et la source de la plupart des erreurs de facturation des débutants.",
      },
      {
        kind: "diagram",
        title: "Les grandes familles de services AWS",
        lines: [
          "Calcul ......... EC2 (VM), Lambda (serverless), ECS/EKS (conteneurs)",
          "Stockage ....... S3 (objet), EBS (disques), EFS (fichiers)",
          "Bases .......... RDS (relationnel managé), DynamoDB (NoSQL)",
          "Réseau ......... VPC, Route 53 (DNS), CloudFront (CDN)",
          "Sécurité ....... IAM (identités), KMS (chiffrement), WAF",
          "Observabilité .. CloudWatch (métriques, logs, alarmes)",
          "Déploiement .... CloudFormation, CodePipeline, Systems Manager",
        ],
      },
    ],
  },
  {
    id: "responsabilite-partagee",
    title: "Responsabilité partagée et facturation",
    level: 1,
    intro:
      "Les deux modèles mentaux à acquérir avant de cliquer quoi que ce soit : qui est responsable de quoi, et qui paie quoi.",
    blocks: [
      {
        kind: "text",
        text: "Le modèle de responsabilité partagée : AWS sécurise le cloud lui-même (datacenters, hyperviseurs, réseau physique), vous sécurisez ce que vous mettez dans le cloud (vos données, vos configurations, vos accès, votre code). Un bucket S3 public par erreur, c'est votre responsabilité — pas celle d'AWS.",
      },
      {
        kind: "text",
        text: "La facturation est à l'usage, par service et par région : chaque heure d'instance EC2, chaque Go stocké sur S3, chaque million de requêtes Lambda est compté. Il n'y a pas de « forfait » par défaut : une ressource oubliée allumée continue de coûter. D'où la règle numéro un : dès le premier jour, activez une alerte de facturation.",
      },
      {
        kind: "list",
        items: [
          "AWS = sécurité DU cloud ; vous = sécurité DANS le cloud.",
          "Chaque service se facture séparément, à l'usage : surveillez `Billing > Bills` dès le début.",
          "L'offre gratuite couvre 12 mois sur de nombreux services, avec des limites précises à connaître.",
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
      "AWS s'apprend mieux avec des fondations réseau et Linux solides : le cloud ne fait que déporter ces concepts.",
    blocks: [
      {
        kind: "fields",
        title: "Les fondations indispensables",
        fields: [
          {
            label: "Réseaux (`networks`)",
            value:
              "IP, sous-réseaux, DNS, pare-feu : un VPC est un réseau virtuel à configurer soi-même. Sans ces bases, les security groups et les tables de routage restent mystérieux.",
          },
          {
            label: "Linux (`linux`)",
            value:
              "Administrer un serveur en SSH : paquets, services, fichiers de configuration. Une instance EC2, c'est du Linux à distance — le cloud ne change rien à l'OS.",
          },
          {
            label: "Ligne de commande",
            value:
              "La CLI AWS est l'outil principal du praticien : savoir enchaîner des commandes, lire du JSON et filtrer des sorties rend tout le reste dix fois plus rapide.",
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
      "La création du compte et les trois réglages de sécurité à faire dans l'heure qui suit.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le compte",
            detail:
              "Sur aws.amazon.com : e-mail, mot de passe, carte bancaire (exigée même pour l'offre gratuite), vérification par téléphone. Choisissez un e-mail dédié que vous conserverez.",
          },
          {
            title: "Sécuriser le compte root",
            detail:
              "Activez l'authentification multifacteur (MFA) sur l'utilisateur root immédiatement, puis n'utilisez plus jamais le root au quotidien : créez un utilisateur IAM administrateur pour travailler.",
          },
          {
            title: "Activer l'alerte de facturation",
            detail:
              "Console `Billing > Budgets` : créez un budget à 0 € / 1 $ avec alerte e-mail. C'est le filet de sécurité contre les ressources oubliées.",
          },
          {
            title: "Choisir sa région",
            detail:
              "Travaillez dans une région proche de vos utilisateurs (`eu-west-3`, Paris, pour la France). La région se change en haut à droite de la console — et chaque région facture séparément.",
          },
        ],
      },
      {
        kind: "text",
        text: "L'offre gratuite (« Free Tier ») couvre 12 mois sur de nombreux services avec des quotas mensuels (heures d'EC2, Go de S3, requêtes Lambda). Lisez les limites exactes sur la page de l'offre gratuite : dépasser un quota, c'est facturé au tarif normal.",
      },
    ],
  },
  {
    id: "installation-cli",
    title: "Installer la CLI AWS",
    level: 2,
    intro:
      "La CLI transforme la console cliquable en outil scriptable : c'est l'interface du praticien.",
    blocks: [
      {
        kind: "command",
        label: "Installer la CLI",
        command: "brew install awscli",
        why: "Installe la CLI AWS v2 via Homebrew (sur Linux : le programme d'installation officiel depuis aws.amazon.com/cli). La CLI est le moyen le plus rapide d'interroger et de piloter AWS, et la base de toute automatisation.",
        verify: "aws --version",
      },
      {
        kind: "command",
        label: "Configurer l'accès",
        command: "aws configure",
        why: "Demande la clé d'accès (`Access key ID` + `Secret access key` de votre utilisateur IAM), la région par défaut et le format de sortie. Les clés sont stockées dans `~/.aws/credentials` : ne les commitez jamais, ne les partagez jamais.",
        verify: "aws sts get-caller-identity",
      },
      {
        kind: "text",
        text: "`aws sts get-caller-identity` retourne le compte et l'utilisateur réellement utilisés : c'est la vérification standard « qui suis-je sur AWS ? ». Si elle échoue, le problème vient des clés ou des permissions, pas des commandes suivantes.",
      },
    ],
  },
  {
    id: "regions-zones",
    title: "Régions et zones de disponibilité",
    level: 2,
    intro:
      "La géographie d'AWS : pourquoi le choix de la région impacte latence, conformité et facture.",
    blocks: [
      {
        kind: "table",
        headers: ["Notion", "Définition", "Exemple"],
        rows: [
          ["Région", "Zone géographique indépendante regroupant plusieurs datacenters", "eu-west-3 (Paris), us-east-1 (Virginie du Nord)"],
          ["Zone de disponibilité (AZ)", "Datacenter isolé au sein d'une région", "eu-west-3a, eu-west-3b, eu-west-3c"],
          ["Edge location", "Point de présence du CDN CloudFront", "Des centaines dans le monde"],
        ],
      },
      {
        kind: "list",
        items: [
          "Déployez dans la région la plus proche de vos utilisateurs pour minimiser la latence.",
          "Répartissez les ressources critiques sur au moins deux AZ : si un datacenter tombe, l'autre prend le relais.",
          "Les données soumises au RGPD restent de préférence dans l'UE (`eu-west-3`, `eu-central-1`, `eu-west-1`).",
          "Les tarifs varient légèrement selon les régions : vérifiez avant de choisir.",
        ],
      },
      {
        kind: "command",
        label: "Changer la région par défaut",
        command: "aws configure set region eu-west-3",
        why: "Définit la région utilisée quand une commande ne la précise pas. Chaque commande accepte aussi `--region` pour un usage ponctuel. La plupart des ressources sont régionales : une instance créée à Paris n'apparaît pas si la console est réglée sur l'Irlande.",
      },
    ],
  },
  {
    id: "iam-bases",
    title: "IAM : les bases de la sécurité",
    level: 2,
    intro:
      "IAM (Identity and Access Management) contrôle qui peut faire quoi : c'est le service à comprendre en premier, avant même de lancer une instance.",
    blocks: [
      {
        kind: "fields",
        title: "Les quatre briques d'IAM",
        fields: [
          {
            label: "Utilisateurs",
            value:
              "Les identités humaines ou techniques. Chacun a ses propres clés d'accès : jamais de clé partagée.",
          },
          {
            label: "Groupes",
            value:
              "Regroupent des utilisateurs (ex. « développeurs ») : on attache les permissions au groupe, pas à l'individu.",
          },
          {
            label: "Rôles",
            value:
              "Des identités temporaires assumées par un service ou un utilisateur (ex. une instance EC2 qui doit lire S3). Pas de clé permanente : le mécanisme le plus sûr.",
          },
          {
            label: "Policies",
            value:
              "Des documents JSON qui autorisent ou refusent des actions sur des ressources. Le principe : moindre privilège — n'autoriser que le strict nécessaire.",
          },
        ],
      },
      {
        kind: "command",
        label: "Lister les utilisateurs IAM",
        command: "aws iam list-users",
        why: "Affiche les utilisateurs IAM du compte. Un premier audit utile : tout compte inutilisé ou sans MFA est un risque. Pour un audit complet, la console IAM propose un rapport d'accès (Access Analyzer).",
      },
      {
        kind: "text",
        text: "Règle d'or : ne donnez jamais `AdministratorAccess` par facilité. Commencez avec des permissions limitées et élargissez au besoin : c'est plus long au début, mais c'est ce qui évite les incidents de sécurité.",
      },
    ],
  },
  {
    id: "s3-pratique",
    title: "S3 en pratique",
    level: 2,
    intro:
      "S3 (Simple Storage Service) est le stockage objet d'AWS : fichiers, backups, sites statiques, data lakes. Le premier service à manipuler.",
    blocks: [
      {
        kind: "command",
        label: "Lister les buckets",
        command: "aws s3 ls",
        why: "Affiche tous les buckets S3 du compte dans la région configurée. Les noms de buckets sont uniques mondialement : `mon-bucket` est probablement déjà pris, préfixez avec quelque chose d'unique.",
      },
      {
        kind: "command",
        label: "Créer un bucket",
        command: "aws s3 mb s3://mon-bucket-unique-2026",
        why: "`mb` (make bucket) crée le bucket dans la région par défaut. Choisissez un nom globalement unique et explicite : il apparaîtra dans les URLs et les logs.",
        verify: "aws s3 ls | grep mon-bucket-unique-2026",
      },
      {
        kind: "command",
        label: "Envoyer et récupérer un fichier",
        command: "aws s3 cp rapport.pdf s3://mon-bucket-unique-2026/",
        why: "`cp` copie dans les deux sens : vers le bucket pour uploader, depuis le bucket (`aws s3 cp s3://bucket/fichier .`) pour télécharger. L'option `--recursive` synchronise des dossiers entiers.",
        verify: "aws s3 ls s3://mon-bucket-unique-2026/",
      },
      {
        kind: "list",
        items: [
          "Activez le versioning sur les buckets importants : chaque écrasement conserve l'ancienne version, protection contre les suppressions accidentelles.",
          "Un bucket est privé par défaut : le rendre public est une action explicite (et à éviter sauf besoin réel, ex. site statique).",
          "Les classes de stockage (Standard, Intelligent-Tiering, Glacier) ajustent le coût selon la fréquence d'accès.",
        ],
      },
    ],
  },
  {
    id: "ec2-premier",
    title: "Première instance EC2",
    level: 2,
    intro:
      "EC2 fournit des serveurs virtuels à la demande : le service historique d'AWS, et le plus pédagogique.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Lancer l'instance depuis la console",
            detail:
              "`EC2 > Instances > Launch instances` : choisissez une AMI Amazon Linux ou Ubuntu, un type `t3.micro` (couvert par l'offre gratuite), créez une paire de clés et téléchargez le fichier `.pem`.",
          },
          {
            title: "Ouvrir le port SSH",
            detail:
              "Dans le security group, autorisez le port 22 uniquement depuis votre IP (pas `0.0.0.0/0`). C'est le réglage de sécurité le plus important de cette étape.",
          },
          {
            title: "Se connecter",
            detail:
              "`ssh -i ma-cle.pem ec2-user@<ip-publique>` (ou `ubuntu@` selon l'AMI). Vous êtes sur un Linux normal : installez, configurez, testez.",
          },
          {
            title: "Éteindre quand c'est fini",
            detail:
              "Stoppez l'instance depuis la console dès que vous n'en avez plus besoin. Une instance oubliée allumée est facturée — même l'offre gratuite a des limites.",
          },
        ],
      },
      {
        kind: "command",
        label: "Lister les instances depuis la CLI",
        command: "aws ec2 describe-instances",
        why: "Retourne le détail JSON de toutes les instances de la région : état, type, IP, tags. C'est la commande de base pour auditer « qu'est-ce qui tourne et me coûte de l'argent ? ».",
        verify: "aws ec2 describe-instances --query 'Reservations[].Instances[].[InstanceId,State.Name]' --output table",
      },
    ],
  },
  {
    id: "console-cloudshell",
    title: "Console et CloudShell",
    level: 2,
    intro:
      "La console web pour découvrir, CloudShell pour agir sans installer la CLI.",
    blocks: [
      {
        kind: "list",
        items: [
          "La console (console.aws.amazon.com) est idéale pour découvrir un service : assistants de création, valeurs par défaut raisonnables, documentation contextuelle.",
          "CloudShell (icône `>_` en haut de la console) ouvre un terminal avec la CLI AWS préinstallée et authentifiée : parfait depuis un poste sans installation.",
          "Règle de travail : découvrir dans la console, puis automatiser en CLI ou en IaC. Les clics manuels répétés deviennent des erreurs.",
          "Épinglez vos services favoris dans la barre de la console pour naviguer vite entre EC2, S3, RDS et IAM.",
        ],
      },
    ],
  },
  {
    id: "tags",
    title: "Tags : étiqueter pour piloter",
    level: 2,
    intro:
      "Les tags sont des étiquettes clé/valeur sur les ressources : sans eux, impossible de savoir qui paie quoi.",
    blocks: [
      {
        kind: "list",
        items: [
          "Taguez dès le premier jour : `Projet`, `Environnement` (prod/staging/dev), `Propriétaire`. C'est la base de la répartition des coûts par équipe ou par projet.",
          "Activez les tags de répartition des coûts dans `Billing > Cost allocation tags` : sinon ils n'apparaissent pas dans les rapports.",
          "Les tags servent aussi à l'automatisation : cibler toutes les instances `Environnement=dev` pour les éteindre le soir, par exemple.",
          "Imposez les tags obligatoires via des policies (AWS Organizations / Service Control Policies) quand l'équipe grandit.",
        ],
      },
    ],
  },
  {
    id: "couts-sous-controle",
    title: "Garder les coûts sous contrôle",
    level: 2,
    intro:
      "La discipline financière fait partie du métier cloud : les outils existent, il faut les activer.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer un budget avec alerte",
            detail:
              "`Billing > Budgets > Create budget` : budget mensuel à 0 € / 1 $ pour commencer, alerte e-mail à 80 % et 100 % du seuil. Le premier réflexe après la création du compte.",
          },
          {
            title: "Consulter Cost Explorer",
            detail:
              "`Billing > Cost Explorer` : visualisez les coûts par service, par région, par tag. Vérifiez chaque semaine les services qui consomment.",
          },
          {
            title: "Repérer les ressources orphelines",
            detail:
              "Volumes EBS non attachés, adresses IP élastiques non associées, snapshots oubliés, instances stoppées depuis des mois : ce sont les fuites classiques.",
          },
          {
            title: "Éteindre ce qui ne sert pas",
            detail:
              "Instances de dev le soir et le week-end, environnements de test après usage. L'élasticité ne sert à rien si on ne libère jamais les ressources.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow quotidien sur AWS",
    level: 2,
    intro:
      "Les habitudes qui rendent le travail sur AWS rapide et sûr.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Vérifier son identité",
            detail:
              "`aws sts get-caller-identity` en début de session, surtout si vous jonglez entre plusieurs comptes ou profils (`--profile`).",
          },
          {
            title: "Travailler en CLI avec --query",
            detail:
              "Filtrez le JSON verbeux avec `--query` (syntaxe JMESPath) et `--output table` pour des sorties lisibles et scriptables.",
          },
          {
            title: "Documenter en IaC",
            detail:
              "Toute ressource qui dure (VPC, base de données, bucket) doit être décrite en Terraform ou CloudFormation, pas créée à la main dans la console.",
          },
          {
            title: "Auditer régulièrement",
            detail:
              "Chaque semaine : Cost Explorer, instances en cours, security groups ouverts, clés d'accès anciennes. La routine qui évite les mauvaises surprises.",
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
      "Les pièges dans lesquels presque tout le monde tombe au début — autant les connaître d'avance.",
    blocks: [
      {
        kind: "list",
        items: [
          "Oublier une instance allumée : le coût continue même sans trafic. Stoppez ou terminez ce que vous n'utilisez plus.",
          "Ouvrir le port 22 ou 3389 à `0.0.0.0/0` dans un security group : restreignez toujours à votre IP.",
          "Travailler avec le compte root au quotidien : créez un utilisateur IAM avec MFA et des droits limités.",
          "Créer des ressources dans la mauvaise région puis ne plus les retrouver : vérifiez la région en haut de la console.",
          "Commiter des clés d'accès dans Git : elles doivent vivre uniquement dans `~/.aws/credentials` ou un gestionnaire de secrets.",
          "Ignorer les alertes de budget : une alerte lue trop tard, c'est une facture surprise.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "vpc",
    title: "VPC : votre réseau privé",
    level: 3,
    intro:
      "Le VPC (Virtual Private Cloud) est votre réseau isolé dans le cloud : tout le reste s'y déploie.",
    blocks: [
      {
        kind: "diagram",
        title: "Anatomie d'un VPC typique",
        lines: [
          "VPC 10.0.0.0/16 (eu-west-3)",
          "     │",
          "     ├── Sous-réseau public 10.0.1.0/24 (AZ a)",
          "     │        └── Internet Gateway → load balancer, bastion",
          "     │",
          "     ├── Sous-réseau public 10.0.2.0/24 (AZ b)",
          "     │        └── Internet Gateway → load balancer (redondance)",
          "     │",
          "     ├── Sous-réseau privé 10.0.10.0/24 (AZ a)",
          "     │        └── NAT Gateway → instances applicatives",
          "     │",
          "     └── Sous-réseau privé 10.0.11.0/24 (AZ b)",
          "              └── NAT Gateway → base RDS (aucun accès direct)",
        ],
      },
      {
        kind: "fields",
        title: "Les composants du VPC",
        fields: [
          {
            label: "Sous-réseaux publics / privés",
            value:
              "Publics : routés vers Internet via l'Internet Gateway (load balancers, bastions). Privés : sans accès Internet direct (applications, bases de données).",
          },
          {
            label: "Tables de routage",
            value:
              "Définissent où va le trafic de chaque sous-réseau : vers l'Internet Gateway, vers la NAT Gateway, ou vers un autre VPC (peering).",
          },
          {
            label: "NAT Gateway",
            value:
              "Permet aux sous-réseaux privés de sortir vers Internet (mises à jour, API) sans être joignables depuis Internet.",
          },
          {
            label: "Security groups",
            value:
              "Le pare-feu au niveau de l'instance : stateful (le retour est autorisé automatiquement), à configurer en « moindre privilège ».",
          },
          {
            label: "NACL",
            value:
              "Le pare-feu au niveau du sous-réseau : stateless, règles numérotées. Complément des security groups, rarement modifié au quotidien.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le schéma ci-dessus est le standard de l'industrie : au moins deux AZ, sous-réseaux publics pour les points d'entrée, privés pour tout le reste. Décrivez-le en Terraform dès que possible : un VPC cliqué à la main est un VPC impossible à reproduire.",
      },
    ],
  },
  {
    id: "security-groups-detail",
    title: "Security groups : le pare-feu applicatif",
    level: 3,
    intro:
      "Les security groups filtrent le trafic au niveau de chaque ressource : bien les configurer, c'est 80 % de la sécurité réseau.",
    blocks: [
      {
        kind: "list",
        items: [
          "Stateful : si vous autorisez le trafic entrant sur le port 443, la réponse sortante est automatiquement permise. Pas besoin de règle retour.",
          "Référencez d'autres security groups plutôt que des IP : « le groupe `web` accepte le port 5432 depuis le groupe `app` » survit aux changements d'IP.",
          "N'ouvrez jamais `0.0.0.0/0` sauf pour les ports publics (80/443 derrière un load balancer). Le port 22 reste réservé à votre IP.",
          "Un security group sans règle entrante bloque tout : le défaut est le refus, ce qui est la bonne posture.",
          "Auditez avec `aws ec2 describe-security-groups` : cherchez les `0.0.0.0/0` sur des ports d'administration.",
        ],
      },
    ],
  },
  {
    id: "rds",
    title: "RDS : bases de données managées",
    level: 3,
    intro:
      "RDS héberge PostgreSQL, MySQL et d'autres moteurs sans administrer de serveur : sauvegardes, patchs et réplicas gérés.",
    blocks: [
      {
        kind: "command",
        label: "Lister les instances de bases",
        command: "aws rds describe-db-instances",
        why: "Affiche les instances RDS : moteur, classe, état, endpoint, sauvegardes. Le point de départ pour auditer « quelles bases tournent et sont-elles sauvegardées ? ».",
        verify: "aws rds describe-db-instances --query 'DBInstances[].[DBInstanceIdentifier,Engine,DBInstanceStatus]' --output table",
      },
      {
        kind: "list",
        items: [
          "Déployez en Multi-AZ pour la production : bascule automatique sur un standby en cas de panne.",
          "Activez les sauvegardes automatisées avec une rétention adaptée (7 à 30 jours) et testez la restauration.",
          "Placez l'instance dans des sous-réseaux privés : seul le security group de l'application peut joindre le port de la base.",
          "Stockez le mot de passe maître dans Secrets Manager, jamais dans le code ni dans les variables d'environnement en clair.",
          "Les read replicas absorbent la charge en lecture ; pour l'écriture massive, évaluez DynamoDB ou Aurora selon le cas.",
        ],
      },
    ],
  },
  {
    id: "lambda",
    title: "Lambda : le serverless événementiel",
    level: 3,
    intro:
      "Lambda exécute du code sans serveur à gérer, déclenché par des événements, facturé à la milliseconde d'exécution.",
    blocks: [
      {
        kind: "command",
        label: "Lister les fonctions",
        command: "aws lambda list-functions",
        why: "Affiche les fonctions Lambda déployées : runtime, mémoire, dernière modification. Utile pour inventorier le serverless existant avant d'ajouter une fonction.",
        verify: "aws lambda list-functions --query 'Functions[].[FunctionName,Runtime]' --output table",
      },
      {
        kind: "fields",
        title: "Concepts clés de Lambda",
        fields: [
          {
            label: "Déclencheurs",
            value:
              "API Gateway (HTTP), S3 (upload de fichier), EventBridge (planifié), SQS (file de messages) : la fonction ne tourne que quand un événement arrive.",
          },
          {
            label: "Cold start",
            value:
              "Le premier appel après inactivité initialise l'environnement : quelques centaines de ms de latence. À anticiper pour les API sensibles à la latence.",
          },
          {
            label: "Timeout (15 min max)",
            value:
              "Lambda n'est pas fait pour les traitements longs : au-delà de quelques minutes, préférez ECS, Batch ou EC2.",
          },
          {
            label: "Mémoire = CPU",
            value:
              "La mémoire allouée détermine aussi la puissance CPU : augmenter la mémoire accélère souvent l'exécution et peut réduire le coût total.",
          },
          {
            label: "Variables d'environnement",
            value:
              "La configuration (hors secrets) passe par les variables d'environnement ; les secrets passent par Secrets Manager ou SSM Parameter Store.",
          },
        ],
      },
    ],
  },
  {
    id: "dynamodb",
    title: "DynamoDB : NoSQL managée",
    level: 3,
    intro:
      "DynamoDB est la base NoSQL clé-valeur d'AWS : latence constante à toute échelle, sans serveur à gérer.",
    blocks: [
      {
        kind: "list",
        items: [
          "Modèle : tables, clés de partition (et de tri), items sans schéma fixe. On modélise selon les requêtes, pas selon les entités — l'inverse du relationnel.",
          "Deux modes de capacité : provisionnée (débit réservé, moins cher à charge stable) et à la demande (paie à la requête, idéal pour démarrer).",
          "Les index secondaires globaux (GSI) permettent d'interroger selon d'autres clés que la clé principale.",
          "TTL natif pour expirer les données, streams pour réagir aux modifications (déclencher une Lambda à chaque écriture).",
          "Cas typiques : sessions, catalogues, compteurs, files d'événements. Contre-indiquée pour les requêtes ad hoc complexes ou les jointures.",
        ],
      },
    ],
  },
  {
    id: "elb-autoscaling",
    title: "Load balancing et Auto Scaling",
    level: 3,
    intro:
      "L'ALB répartit le trafic, l'Auto Scaling ajuste le nombre d'instances : ensemble, ils rendent une application élastique et résiliente.",
    blocks: [
      {
        kind: "diagram",
        title: "Architecture élastique classique",
        lines: [
          "Internet",
          "   │",
          "   ▼",
          "Application Load Balancer (2 AZ)",
          "   │            │",
          "   ▼            ▼",
          "EC2 (AZ a)   EC2 (AZ b)   ← Auto Scaling Group",
          "   │            │",
          "   └─────┬──────┘",
          "       ▼",
          "   RDS Multi-AZ (sous-réseaux privés)",
        ],
      },
      {
        kind: "list",
        items: [
          "L'ALB (Application Load Balancer) route en HTTP/HTTPS avec health checks : les instances en échec sont automatiquement exclues.",
          "L'Auto Scaling Group maintient le nombre d'instances désiré et scale selon des métriques (CPU, requêtes) ou un planning.",
          "Le certificat TLS se termine sur l'ALB (via ACM, gratuit) : le trafic interne peut rester en HTTP dans le VPC.",
          "Testez la panne : tuez une instance manuellement et vérifiez que l'Auto Scaling la remplace sans interruption.",
        ],
      },
    ],
  },
  {
    id: "cloudwatch",
    title: "CloudWatch : métriques, logs, alarmes",
    level: 3,
    intro:
      "CloudWatch centralise l'observabilité : sans métriques ni alarmes, vous découvrez les pannes par vos utilisateurs.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois piliers de CloudWatch",
        fields: [
          {
            label: "Metrics",
            value:
              "CPU, réseau, requêtes, erreurs : chaque service AWS publie des métriques automatiquement. Base des dashboards et du scaling.",
          },
          {
            label: "Logs",
            value:
              "Centralisez les logs applicatifs (via l'agent ou le SDK) : recherche plein texte, filtres, rétention configurable. Fini le SSH pour lire un log.",
          },
          {
            label: "Alarms",
            value:
              "Seuils sur les métriques avec actions : notifier (SNS), scaler, redémarrer. Une alarme sans destinataire ne sert à rien : branchez-la sur un canal que l'équipe lit vraiment.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Alarmez au minimum sur : CPU/erreurs 5xx en hausse, espace disque, facture (alarme de billing), certificats proches de l'expiration.",
          "Les dashboards CloudWatch donnent la vue d'ensemble « santé du système » en une page : construisez-en un par application.",
          "Attention au coût : l'ingestion de logs et les métriques custom sont facturées. Filtrez ce que vous envoyez.",
        ],
      },
    ],
  },
  {
    id: "cloudfront-route53",
    title: "CloudFront et Route 53",
    level: 3,
    intro:
      "Le CDN pour la vitesse mondiale, le DNS pour le routage : les deux services « bordure » d'AWS.",
    blocks: [
      {
        kind: "fields",
        title: "Deux services complémentaires",
        fields: [
          {
            label: "CloudFront (CDN)",
            value:
              "Met en cache votre contenu sur des centaines de points de présence : latence réduite pour les utilisateurs lointains, charge réduite sur l'origine. Incontournable devant un site statique S3 ou une API à fort trafic.",
          },
          {
            label: "Route 53 (DNS)",
            value:
              "Le DNS d'AWS : enregistrements simples, routage géolocalisé, health checks avec bascule automatique. Les enregistrements d'alias pointent nativement vers les ressources AWS (ALB, CloudFront, S3).",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Site statique type : S3 (privé) + CloudFront (origine) + certificat ACM + Route 53 : rapide, sécurisé, peu cher.",
          "Invalidez le cache CloudFront après chaque déploiement (`/*` ou chemins ciblés), sinon les utilisateurs voient l'ancienne version.",
          "Le HTTPS de bout en bout passe par ACM : certificats gratuits, renouvelés automatiquement.",
        ],
      },
    ],
  },
  {
    id: "iam-avance",
    title: "IAM avancé : rôles et moindre privilège",
    level: 3,
    intro:
      "Passer du « tout autorisé » à une sécurité sérieuse : rôles pour les services, MFA, et revue des accès.",
    blocks: [
      {
        kind: "list",
        items: [
          "Attachez des rôles IAM aux ressources (EC2, Lambda, ECS) plutôt que des clés d'accès : les credentials sont temporaires et rotatés automatiquement.",
          "Imposez le MFA pour la console, surtout sur les comptes à privilèges : c'est le réglage qui bloque le plus d'attaques par credential stuffing.",
          "Utilisez les conditions dans les policies (`aws:MultiFactorAuthPresent`, plages d'IP) pour durcir les actions sensibles.",
          "Passez en revue les accès avec IAM Access Analyzer : il signale les permissions inutilisées et les accès externes.",
          "Faites expirer les clés d'accès : rotation régulière, suppression des clés de plus de 90 jours, et alerte sur les clés anciennes.",
          "Pour le multi-comptes, centralisez les identités avec IAM Identity Center (SSO) : un seul login, des permissions par compte.",
        ],
      },
    ],
  },
  {
    id: "cli-avance",
    title: "CLI avancée : --query, profils, scripts",
    level: 3,
    intro:
      "La CLI devient vraiment puissante avec le filtrage JMESPath et les profils multiples.",
    blocks: [
      {
        kind: "command",
        label: "Filtrer avec JMESPath",
        command: "aws ec2 describe-instances --query 'Reservations[].Instances[?State.Name==`running`].[InstanceId,InstanceType,PublicIpAddress]' --output table",
        why: "La clause `[?State.Name==`running`]` ne garde que les instances en cours : `--query` transforme le JSON verbeux en tableau lisible. C'est la compétence CLI qui fait gagner le plus de temps au quotidien.",
      },
      {
        kind: "command",
        label: "Utiliser plusieurs profils",
        command: "aws sts get-caller-identity --profile prod",
        why: "`~/.aws/config` et `~/.aws/credentials` peuvent contenir plusieurs profils (`[profile dev]`, `[profile prod]`). `--profile` choisit le compte cible : indispensable pour ne pas appliquer une commande de dev sur la production.",
      },
      {
        kind: "list",
        items: [
          "`--output json` (défaut, pour les scripts), `table` (lisible humain), `text` (pour `awk`/`cut`).",
          "Combinez avec `jq` pour des transformations complexes que `--query` ne couvre pas.",
          "Scriptez les routines (inventaire, nettoyage, snapshots) en bash : la CLI est faite pour ça.",
        ],
      },
    ],
  },
  {
    id: "ssm-secrets",
    title: "SSM Parameter Store et Secrets Manager",
    level: 3,
    intro:
      "Deux services pour ne plus jamais mettre de secret dans le code ou les variables d'environnement en clair.",
    blocks: [
      {
        kind: "table",
        headers: ["Service", "Usage typique", "Particularité"],
        rows: [
          ["SSM Parameter Store", "Configuration non sensible + secrets simples (chiffrés)", "Gratuit dans les quotas, hiérarchie par chemins (/prod/db/host)"],
          ["Secrets Manager", "Secrets critiques avec rotation", "Rotation automatique des mots de passe RDS, audit d'accès"],
        ],
      },
      {
        kind: "list",
        items: [
          "Les applications récupèrent leurs secrets au démarrage via le SDK ou l'agent, avec un rôle IAM qui autorise uniquement les paramètres nécessaires.",
          "Versionnez les paramètres : chaque modification crée une version, permettant le rollback.",
          "Ne loguez jamais la valeur d'un paramètre : les sorties de debug doivent masquer les secrets.",
        ],
      },
    ],
  },
  {
    id: "ebs-ami",
    title: "EBS, snapshots et AMI",
    level: 3,
    intro:
      "Le stockage bloc des instances EC2 : persistance, sauvegardes et images réutilisables.",
    blocks: [
      {
        kind: "fields",
        title: "Trois concepts à distinguer",
        fields: [
          {
            label: "Volumes EBS",
            value:
              "Les disques persistants attachés aux instances : ils survivent au redémarrage, pas forcément à la terminaison (option `DeleteOnTermination`).",
          },
          {
            label: "Snapshots",
            value:
              "Sauvegardes incrémentales des volumes, stockées sur S3 : la base de votre plan de reprise. Automatisez-les (AWS Backup ou Data Lifecycle Manager).",
          },
          {
            label: "AMI",
            value:
              "Image complète d'une instance (OS + logiciels + config) : pour lancer des clones identiques ou figer une configuration validée.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Testez vos restaurations : un snapshot jamais restauré n'est pas une sauvegarde, c'est un espoir.",
          "Chiffrez les volumes sensibles avec KMS : le chiffrement EBS est transparent et sans impact notable.",
          "Nettoyez les snapshots obsolètes : ils s'accumulent vite et coûtent chaque mois.",
        ],
      },
    ],
  },
  {
    id: "iac-cloudformation-terraform",
    title: "Infrastructure as Code : CloudFormation vs Terraform",
    level: 3,
    intro:
      "Décrire l'infrastructure en code plutôt qu'en clics : le passage au niveau professionnel.",
    blocks: [
      {
        kind: "table",
        headers: ["Critère", "CloudFormation", "Terraform"],
        rows: [
          ["Périmètre", "AWS uniquement", "Multi-cloud et multi-fournisseurs"],
          ["Langage", "YAML/JSON (ou CDK en langage impératif)", "HCL (ou CDKTF)"],
          ["État", "Géré par AWS (stacks)", "Fichier d'état à stocker (S3 + verrou DynamoDB)"],
          ["Écosystème", "Intégré à la console et aux services AWS", "Registre de modules communautaires immense"],
        ],
      },
      {
        kind: "text",
        text: "Le choix importe moins que la discipline : toute ressource durable doit être décrite en code, versionnée et déployée via un pipeline. Commencez par Terraform si vous visez le multi-cloud, par CloudFormation/CDK si vous restez 100 % AWS.",
      },
    ],
  },
  {
    id: "multi-comptes",
    title: "Multi-comptes avec Organizations",
    level: 3,
    intro:
      "Un compte par environnement (dev, staging, prod) : l'isolation que les grandes organisations exigent.",
    blocks: [
      {
        kind: "list",
        items: [
          "AWS Organizations regroupe les comptes sous une entité de facturation unique, avec vue consolidée des coûts.",
          "Chaque environnement a son compte : une erreur en dev ne peut pas toucher la prod, et la facture est lisible par compte.",
          "Les Service Control Policies (SCP) imposent des garde-fous globaux (ex. interdire de quitter certaines régions, exiger le chiffrement).",
          "L'accès inter-comptes passe par des rôles assumés (assume role), jamais par des clés partagées.",
          "Même pour un indépendant, deux comptes (perso/pro ou dev/prod) valent le coup : la séparation est gratuite.",
        ],
      },
    ],
  },
  {
    id: "well-architected",
    title: "Le framework Well-Architected",
    level: 3,
    intro:
      "La grille de lecture officielle d'AWS pour évaluer une architecture : cinq piliers, des questions concrètes.",
    blocks: [
      {
        kind: "fields",
        title: "Les cinq piliers",
        fields: [
          {
            label: "Excellence opérationnelle",
            value:
              "Automatiser les opérations, documenter les runbooks, apprendre de chaque incident (post-mortems sans blâme).",
          },
          {
            label: "Sécurité",
            value:
              "Moindre privilège, chiffrement partout, MFA, traçabilité (CloudTrail activé sur tous les comptes).",
          },
          {
            label: "Fiabilité",
            value:
              "Multi-AZ, sauvegardes testées, reprise après sinistre documentée, capacité à encaisser la perte d'une zone.",
          },
          {
            label: "Efficacité des performances",
            value:
              "Choisir le bon type de ressource (pas de surdimensionnement systématique), CDN, cache là où ça compte.",
          },
          {
            label: "Optimisation des coûts",
            value:
              "Supprimer l'inutile, dimensionner au besoin réel, utiliser les bons modèles d'achat (on-demand, Savings Plans).",
          },
        ],
      },
      {
        kind: "text",
        text: "Faites une revue Well-Architected de votre infrastructure chaque semestre : le questionnaire officiel (gratuit dans la console) pose les bonnes questions, même sans viser une certification.",
      },
    ],
  },
  {
    id: "optimisation-couts",
    title: "Optimiser les coûts durablement",
    level: 3,
    intro:
      "Au-delà des alertes : les leviers structurels pour payer le juste prix.",
    blocks: [
      {
        kind: "list",
        items: [
          "Dimensionnez au réel : la plupart des instances sont surdimensionnées. CloudWatch montre l'utilisation CPU/mémoire réelle sur 30 jours.",
          "Éteignez les environnements non-prod en dehors des heures ouvrées (planification via Instance Scheduler ou Lambda).",
          "Pour les charges stables et prévisibles, les Savings Plans réduisent significativement le coût horaire en échange d'un engagement.",
          "Les instances Spot offrent des réductions majeures pour les charges tolérantes aux interruptions (batch, CI, calcul).",
          "Lifecycle S3 : basculez automatiquement les vieux objets vers des classes moins chères (Intelligent-Tiering, Glacier).",
          "Supprimez méthodiquement : snapshots orphelins, volumes non attachés, IP élastiques inutilisées, anciennes versions d'AMI.",
        ],
      },
    ],
  },
  {
    id: "erreurs-frequentes",
    title: "Erreurs fréquentes et solutions",
    level: 3,
    intro:
      "Les incidents classiques sur AWS, avec le diagnostic et le correctif.",
    blocks: [
      {
        kind: "fields",
        title: "Diagnostic express",
        fields: [
          {
            label: "Instance injoignable en SSH",
            value:
              "Vérifiez dans l'ordre : le security group (port 22 depuis votre IP ?), la bonne clé `.pem` et son user (`ec2-user` vs `ubuntu`), l'IP publique (a-t-elle changé après un stop/start sans IP élastique ?), et que l'instance est dans un sous-réseau public.",
          },
          {
            label: "« AccessDenied » sur une action",
            value:
              "Permission IAM manquante : identifiez l'action exacte dans le message d'erreur et ajoutez-la à la policy du rôle/utilisateur. Ne contournez jamais en donnant `*` par facilité.",
          },
          {
            label: "Facture anormalement élevée",
            value:
              "Cost Explorer > groupé par service : identifiez le service en cause, puis listez ses ressources (`describe-instances`, `s3 ls`). Les coupables habituels : instance oubliée, transfert de données inter-régions, snapshots accumulés.",
          },
          {
            label: "Bucket S3 « déjà existant »",
            value:
              "Les noms de buckets sont uniques mondialement : quelqu'un d'autre utilise déjà ce nom. Choisissez un nom plus spécifique.",
          },
          {
            label: "Lambda en timeout",
            value:
              "Augmentez le timeout et la mémoire, vérifiez que la fonction n'attend pas une ressource réseau inaccessible (VPC sans NAT, security group bloquant).",
          },
          {
            label: "Ressource introuvable dans la console",
            value:
              "Mauvaise région dans 90 % des cas : vérifiez le sélecteur en haut à droite. Les ressources sont régionales (sauf IAM, Route 53, CloudFront qui sont globaux).",
          },
          {
            label: "Changements IAM sans effet immédiat",
            value:
              "La propagation IAM peut prendre quelques minutes. Attendez avant de conclure qu'une policy ne fonctionne pas.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-aws",
    title: "Déboguer sur AWS",
    level: 3,
    intro:
      "Les réflexes d'investigation quand quelque chose ne fonctionne pas.",
    blocks: [
      {
        kind: "list",
        items: [
          "CloudTrail : qui a fait quoi et quand, sur tous les comptes. Le premier endroit où chercher après un changement inattendu ou un incident de sécurité.",
          "VPC Flow Logs : le trafic réseau accepté/refusé par vos interfaces. Indispensable quand « le réseau ne passe pas » sans raison apparente.",
          "CloudWatch Logs Insights : interrogez les logs en SQL-like pour retrouver une erreur précise parmi des millions de lignes.",
          "Les health checks de l'ALB et les codes de retour : un `5xx` vient de votre application, un `502/503` peut venir d'une cible en échec.",
          "Reproduisez en staging avec les mêmes données : déboguer directement en production est une prise de risque, pas une méthode.",
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques d'exploitation",
    level: 3,
    intro:
      "Les habitudes qui distinguent un compte AWS sain d'un champ de mines.",
    blocks: [
      {
        kind: "list",
        items: [
          "MFA sur le root et les comptes privilégiés, sans exception.",
          "Tout en IaC : aucune ressource durable créée à la main dans la console.",
          "Tags obligatoires (`Projet`, `Environnement`, `Propriétaire`) sur toutes les ressources.",
          "Sauvegardes automatisées et restaurations testées (RDS, EBS, et exports hors AWS pour le critique).",
          "Security groups en moindre privilège, audités régulièrement.",
          "Budgets et alertes de facturation sur chaque compte.",
          "CloudTrail activé partout, logs conservés et protégés.",
          "Documentation vivante : schéma d'architecture, runbooks d'incident, contacts d'astreinte.",
        ],
      },
    ],
  },
  {
    id: "projets-realistes",
    title: "Projets réalistes : 3 niveaux",
    level: 3,
    intro:
      "Trois projets progressifs pour construire une vraie pratique d'AWS.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Site statique sur S3 + CloudFront",
        fields: [
          {
            label: "Objectif",
            value:
              "Héberger un site statique : bucket S3 privé, distribution CloudFront, certificat ACM, domaine via Route 53, invalidation du cache au déploiement.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "S3 (`mb`, `cp --recursive`, `sync`), CloudFront, ACM, Route 53, tags et budget.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Le cycle complet objet → CDN → DNS → HTTPS, et le coût réel (dérisoire) d'un site statique bien architecturé.",
          },
          {
            label: "Difficulté",
            value: "Débutant — un week-end.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — API serverless avec Lambda",
        fields: [
          {
            label: "Objectif",
            value:
              "API REST : API Gateway + Lambda + DynamoDB, déployée via SAM ou Terraform, secrets dans SSM Parameter Store, logs et alarmes CloudWatch.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Lambda (déclencheurs, variables d'environnement), DynamoDB (modélisation par requêtes), IAM (rôles), IaC, observabilité.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Le serverless de bout en bout : modélisation NoSQL, permissions fines, et ce que « sans serveur » change (et ne change pas) à l'exploitation.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — deux à trois semaines.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Stack VPC complète en IaC",
        fields: [
          {
            label: "Objectif",
            value:
              "Infrastructure de production : VPC multi-AZ, ALB + Auto Scaling, RDS Multi-AZ en sous-réseaux privés, le tout en Terraform déployé par pipeline CI, avec revue Well-Architected.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "VPC (sous-réseaux, NAT, routage), security groups, ALB, Auto Scaling, RDS, Terraform, CI/CD, CloudWatch.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "L'architecture 3-tiers classique du cloud : isolation réseau, haute disponibilité, et pourquoi chaque couche existe.",
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
          "Documentation AWS — https://docs.aws.amazon.com/",
          "Guide de l'utilisateur IAM — https://docs.aws.amazon.com/iam/",
          "Guide EC2 — https://docs.aws.amazon.com/ec2/",
          "Guide S3 — https://docs.aws.amazon.com/s3/",
          "Référence de la CLI — https://docs.aws.amazon.com/cli/",
          "AWS Well-Architected Framework — https://docs.aws.amazon.com/wellarchitected/",
          "AWS Skill Builder (formations officielles) — https://skillbuilder.aws/",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "AWS maîtrisé dans ses fondamentaux : les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "fields",
        title: "Les prochaines étapes",
        fields: [
          {
            label: "Terraform (`terraform`)",
            value:
              "L'Infrastructure as Code multi-cloud : décrire VPC, EC2 et RDS en HCL versionné plutôt qu'en clics. Le passage obligé vers une pratique professionnelle.",
          },
          {
            label: "Docker (`docker`) et Kubernetes (`kubernetes`)",
            value:
              "Conteneuriser les applications (ECS, EKS) : le déploiement moderne sur AWS passe de plus en plus par les conteneurs.",
          },
          {
            label: "CI/CD (`cicd`, `github-actions`)",
            value:
              "Déployer automatiquement sur AWS depuis un pipeline : build, tests, puis déploiement via la CLI ou l'IaC.",
          },
          {
            label: "Comparer avec Azure (`azure`) et GCP (`gcp`)",
            value:
              "Les concepts (IAM, VPC, serverless) se transfèrent : comprendre les trois clouds rend polyvalent et éclaire les choix d'architecture.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le signe que vous maîtrisez AWS : vous savez estimer le coût d'une architecture avant de la déployer, et vous n'avez plus peur de la facture de fin de mois.",
      },
    ],
  },
  {
    id: "api-gateway",
    title: "API Gateway : exposer des API",
    level: 3,
    intro:
      "Devant Lambda ou des services HTTP : routage, throttling et authentification.",
    blocks: [
      {
        kind: "list",
        items: [
          "Deux saveurs : HTTP API (simple, rapide, économique) et REST API (fonctionnalités avancées : clés d'API, plans d'usage, transformations).",
          "Routes (`GET /users`) → intégrations (Lambda, URL HTTP, services AWS) : le mapping se déclare en quelques commandes.",
          "Throttling et quotas par clé d'API : protégez vos backends des pics et des abus.",
          "Authentification : IAM, Lambda authorizers (JWT custom), ou Cognito pour les utilisateurs finaux.",
          "Déploiements par stages (`dev`, `prod`) : chaque stage a son URL et ses variables.",
        ],
      },
    ],
  },
  {
    id: "sns-sqs",
    title: "SNS et SQS : découpler avec la messagerie",
    level: 3,
    intro:
      "Notifications et files d'attente : les briques du découplage asynchrone.",
    blocks: [
      {
        kind: "fields",
        title: "Les deux services",
        fields: [
          {
            label: "SNS (notifications)",
            value:
              "Pub/sub : un message publié sur un topic est distribué à tous les abonnés (Lambda, SQS, email, SMS). Le pattern « un événement, plusieurs consommateurs ».",
          },
          {
            label: "SQS (files)",
            value:
              "Files d'attente : les messages patientent jusqu'à être traités. Absorbe les pics, retry automatique, DLQ (dead-letter queue) pour les messages en échec répété.",
          },
          {
            label: "Cas d'usage combiné",
            value:
              "SNS → SQS par consommateur : chaque service a sa file, reçoit les événements qui l'intéressent (filtrage par attributs), traite à son rythme.",
          },
          {
            label: "FIFO",
            value:
              "Les files FIFO garantissent l'ordre et la déduplication : pour les flux où l'ordre compte (transactions, événements métier).",
          },
        ],
      },
    ],
  },
  {
    id: "eventbridge",
    title: "EventBridge : le bus d'événements",
    level: 3,
    intro:
      "Router les événements entre services : l'épine dorsale des architectures event-driven.",
    blocks: [
      {
        kind: "list",
        items: [
          "Bus d'événements : les services publient des événements, des règles (`rules`) les routent vers des cibles (Lambda, SQS, Step Functions...).",
          "Sources : événements AWS natifs (EC2, S3...), vos applications (SDK `PutEvents`), partenaires SaaS.",
          "Filtrage par pattern JSON : chaque règle ne reçoit que les événements qui la concernent.",
          "EventBridge Scheduler : le cron serverless moderne (planifier des appels HTTP, Lambda, etc.) — remplace les anciennes règles planifiées.",
          "Idéal pour : workflows déclenchés par événements métier, intégrations entre microservices, automatisations ops.",
        ],
      },
    ],
  },
  {
    id: "ecs-fargate",
    title: "ECS Fargate : des conteneurs sans serveurs",
    level: 3,
    intro:
      "Exécuter des conteneurs sans gérer d'instances EC2 : le serverless des conteneurs.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "Task definition (extrait)",
        code: `{
  "family": "mon-api",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "api",
      "image": "123456789012.dkr.ecr.eu-west-1.amazonaws.com/mon-api:v1.2.0",
      "portMappings": [{ "containerPort": 8080 }],
      "logConfiguration": { "logDriver": "awslogs" }
    }
  ]
}`,
      },
      {
        kind: "list",
        items: [
          "La task definition décrit le conteneur (image, CPU, mémoire, ports, logs) ; le service ECS maintient N tâches en vie et les met à jour.",
          "Fargate : pas de cluster EC2 à gérer — vous payez les ressources consommées par les tâches.",
          "Service discovery, load balancer (ALB) en frontal, autoscaling sur CPU/métriques : la stack production complète.",
          "Logs dans CloudWatch via `awslogs` : l'observabilité est native.",
          "Alternative : EKS pour Kubernetes managé, quand l'écosystème K8s (Helm, opérateurs) justifie la complexité.",
        ],
      },
    ],
  },
];

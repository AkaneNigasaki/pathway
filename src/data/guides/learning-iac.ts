import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de l'Infrastructure as Code : déclarer, versionner
 * et appliquer son infrastructure avec Terraform (HCL réel, états, plans).
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_IAC: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est l'Infrastructure as Code, pourquoi cliquer dans une console ne passe pas à l'échelle, et ce que Terraform change.",
    blocks: [
      {
        kind: "text",
        text: "L'Infrastructure as Code (IaC) consiste à décrire son infrastructure — serveurs, réseaux, bases de données, DNS — dans des fichiers versionnés plutôt que de la configurer à la main dans une console. Ces fichiers se relisent en pull request, se testent, s'appliquent automatiquement et se détruisent puis reconstruisent à volonté. Terraform (et son fork communautaire OpenTofu) est l'outil déclaratif de référence : on décrit l'état désiré, l'outil calcule et applique les changements nécessaires.",
      },
      {
        kind: "text",
        text: "Pourquoi ça existe : une infrastructure cliquée à la main ne se relit pas, ne se teste pas, ne se reproduit pas — et personne ne sait exactement ce qui tourne après six mois de modifications. L'IaC apporte au provisionnement ce que Git a apporté au code : historique, revue par les pairs, reproductibilité. C'est le passage de l'infrastructure artisanale à l'infrastructure d'équipe.",
      },
      {
        kind: "fields",
        title: "L'IaC en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Décrire l'infrastructure voulue dans du code versionné, et laisser un outil la créer, la maintenir et la faire évoluer.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Rendre l'infrastructure relisible, testable, reproductible et auditable — comme le code applicatif.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Dès qu'une infrastructure dépasse une machine : même un petit projet gagne à pouvoir reconstruire son environnement en une commande.",
          },
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni un script d'installation ad hoc, ni un export de console : c'est une source de vérité déclarative, dont l'état réel est continuellement rapproché.",
          },
        ],
      },
    ],
  },
  {
    id: "declaratif-vs-imperatif",
    title: "Déclaratif vs impératif",
    level: 1,
    intro:
      "La distinction fondamentale : dire CE QUE l'on veut, pas COMMENT l'obtenir.",
    blocks: [
      {
        kind: "diagram",
        title: "Deux philosophies",
        lines: [
          "IMPÉRATIF (script) :",
          "  « crée le serveur, puis installe nginx, puis ouvre le port 80 »",
          "  → décrit des ÉTAPES",
          "  → rejoué deux fois : installe nginx deux fois ? échoue ?",
          "  → l'état final dépend de l'historique d'exécution",
          "",
          "DÉCLARATIF (Terraform) :",
          "  « je veux un serveur avec nginx et le port 80 ouvert »",
          "  → décrit l'ÉTAT DÉSIRÉ",
          "  → l'outil compare désiré vs réel, applique la différence",
          "  → rejoué dix fois : même résultat (idempotence)",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : l'impératif dit comment faire, le déclaratif dit quoi obtenir — et c'est l'outil qui fait le lien. Conséquence pratique : avec Terraform, modifier l'infrastructure = modifier le code et ré-appliquer ; l'outil détecte lui-même ce qui doit être créé, modifié ou détruit. L'idempotence (rejouer donne le même résultat) n'est plus une discipline à maintenir à la main, c'est une propriété de l'outil.",
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
      "Ce qu'il faut connaître avant d'écrire son premier fichier Terraform.",
    blocks: [
      {
        kind: "fields",
        title: "Les fondations",
        fields: [
          {
            label: "Cloud (bases)",
            value:
              "Savoir ce qu'est une instance, un VPC, un groupe de sécurité, un bucket : Terraform modélise le cloud, il ne l'invente pas.",
          },
          {
            label: "Git",
            value:
              "L'infrastructure vit dans Git : branches, pull requests, historique. Les mêmes réflexes que pour le code.",
          },
          {
            label: "Ligne de commande",
            value:
              "`terraform plan` et `terraform apply` s'exécutent dans un terminal ; lire leurs sorties est une compétence centrale.",
          },
          {
            label: "Réseau (bases)",
            value:
              "CIDR, sous-réseaux, ports : la moitié d'un projet Terraform typique est du réseau déclaré en code.",
          },
        ],
      },
      {
        kind: "text",
        text: "Pas besoin d'être expert cloud : commencez par modéliser ce que vous savez déjà créer à la main. Le premier projet ci-dessous ne demande qu'un compte cloud et ces bases.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Installer Terraform et vérifier que tout fonctionne.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier l'installation de Terraform",
        command: "terraform version",
        why: "Affiche la version installée de Terraform. L'installation se fait via le gestionnaire de paquets de votre OS (ou le binaire officiel) ; cette commande confirme que le binaire est dans le PATH et indique la version — importante car la syntaxe évolue entre versions majeures.",
        verify: "terraform -help",
      },
      {
        kind: "text",
        text: "Note sur OpenTofu : c'est le fork communautaire open source de Terraform, né après le changement de licence de Terraform. Les commandes et la syntaxe sont quasi identiques (`tofu` au lieu de `terraform`). Les exemples de cette page utilisent Terraform, transposables à OpenTofu.",
      },
      {
        kind: "list",
        items: [
          "Épinglez la version dans le code (`required_version`) : toute l'équipe et la CI utilisent la même.",
          "Pour jongler entre versions, les gestionnaires comme `tfenv` ou `tenv` installent et commutent les versions par projet.",
          "Configurez vos identifiants cloud AVANT le premier `apply` (variables d'environnement du provider, jamais en dur dans le code).",
        ],
      },
    ],
  },
  {
    id: "premier-projet-terraform",
    title: "Premier projet Terraform",
    level: 2,
    intro:
      "Déclarer une vraie ressource cloud, voir le plan, l'appliquer, la détruire.",
    blocks: [
      {
        kind: "code",
        language: "hcl",
        title: "main.tf — un bucket de stockage",
        code: "terraform {\n  required_version = \">= 1.9\"\n  required_providers {\n    aws = {\n      source  = \"hashicorp/aws\"\n      version = \"~> 5.0\"\n    }\n  }\n}\n\nprovider \"aws\" {\n  region = \"eu-west-1\"\n}\n\nresource \"aws_s3_bucket\" \"demo\" {\n  bucket = \"mon-bucket-demo-unique-12345\"\n}",
      },
      {
        kind: "steps",
        steps: [
          {
            title: "Initialiser",
            detail:
              "`terraform init` télécharge le provider AWS et prépare le dossier de travail. À exécuter une fois par projet (et après chaque changement de provider).",
          },
          {
            title: "Voir le plan",
            detail:
              "`terraform plan` affiche ce qui serait créé/modifié/détruit, SANS rien changer. Lisez-le : c'est le moment de la revue.",
          },
          {
            title: "Appliquer",
            detail:
              "`terraform apply` exécute le plan après votre confirmation. Le bucket est créé pour de vrai.",
          },
          {
            title: "Vérifier l'état",
            detail:
              "`terraform state list` montre les ressources gérées. Un fichier `terraform.tfstate` est apparu : c'est la mémoire de Terraform.",
          },
          {
            title: "Détruire",
            detail:
              "`terraform destroy` supprime tout ce que le projet gère, après confirmation. Idéal pour nettoyer un lab.",
          },
        ],
      },
      {
        kind: "text",
        text: "Retenez le cycle : écrire → planifier → relire → appliquer. Le `plan` est le cœur de la méthode : on ne devrait jamais appliquer ce qu'on n'a pas lu.",
      },
    ],
  },
  {
    id: "la-cli-terraform",
    title: "La CLI Terraform",
    level: 2,
    intro:
      "Les commandes du quotidien, avec pour chacune son rôle exact.",
    blocks: [
      {
        kind: "fields",
        title: "Commandes principales",
        fields: [
          {
            label: "Commande — `terraform init`",
            value: "Rôle : prépare le dossier (télécharge providers et modules). Quand : une fois par projet, après chaque modification des providers/modules.",
          },
          {
            label: "Commande — `terraform plan`",
            value: "Rôle : calcule et affiche les changements sans rien appliquer. Quand : avant chaque apply, et en pull request pour revue.",
          },
          {
            label: "Commande — `terraform apply`",
            value: "Rôle : applique les changements (avec confirmation). Quand : pour créer/mettre à jour l'infrastructure réelle.",
          },
          {
            label: "Commande — `terraform destroy`",
            value: "Rôle : détruit tout ce que le projet gère. Quand : nettoyer un environnement temporaire. À manier avec précaution en production.",
          },
          {
            label: "Commande — `terraform fmt`",
            value: "Rôle : reformate les fichiers HCL (indentation canonique). Quand : avant chaque commit, comme un formateur de code.",
          },
          {
            label: "Commande — `terraform validate`",
            value: "Rôle : vérifie la syntaxe et la cohérence interne, sans accès au cloud. Quand : en CI, rapide et sans credentials.",
          },
        ],
      },
      {
        kind: "command",
        label: "Planifier en enregistrant le plan",
        command: "terraform plan -out=tfplan",
        why: "Calcule les changements et les enregistre dans le fichier `tfplan` au lieu de seulement les afficher. `terraform apply tfplan` appliquera ensuite EXACTEMENT ce plan — aucune dérive possible entre la relecture et l'exécution. C'est le workflow professionnel : plan en PR, apply du plan validé.",
        verify: "ls -la tfplan",
      },
    ],
  },
  {
    id: "variables",
    title: "Variables : paramétrer sans dupliquer",
    level: 2,
    intro:
      "Rendre le code réutilisable : les valeurs qui changent deviennent des variables.",
    blocks: [
      {
        kind: "code",
        language: "hcl",
        title: "variables.tf et usage",
        code: "variable \"region\" {\n  description = \"Région cloud de déploiement\"\n  type        = string\n  default     = \"eu-west-1\"\n}\n\nvariable \"instance_type\" {\n  description = \"Taille des instances\"\n  type        = string\n  default     = \"t3.micro\"\n}\n\n# Usage dans main.tf :\n# provider \"aws\" {\n#   region = var.region\n# }",
      },
      {
        kind: "text",
        text: "Trois façons de fournir une valeur, par priorité croissante : la valeur `default`, un fichier `terraform.tfvars`, la variable d'environnement `TF_VAR_instance_type`, le flag `-var`. En pratique : des defaults sains dans le code, les valeurs d'environnement dans `terraform.tfvars` (non versionné s'il contient du sensible) ou en variables CI.",
      },
      {
        kind: "list",
        items: [
          "Typez toujours vos variables (`string`, `number`, `bool`, `list(string)`, `map(string)`) : les erreurs de type sont détectées au plan.",
          "Décrivez chaque variable (`description`) : c'est la documentation du module.",
          "Les valeurs sensibles : `sensitive = true` — Terraform les masque dans les sorties (mais elles restent en clair dans le state : voir la section Sécurité).",
        ],
      },
    ],
  },
  {
    id: "outputs",
    title: "Outputs : exposer les résultats",
    level: 2,
    intro:
      "Récupérer les informations produites par l'infrastructure : IPs, DNS, IDs.",
    blocks: [
      {
        kind: "code",
        language: "hcl",
        title: "outputs.tf",
        code: "output \"bucket_name\" {\n  description = \"Nom du bucket créé\"\n  value       = aws_s3_bucket.demo.bucket\n}\n\noutput \"bucket_arn\" {\n  description = \"ARN du bucket, utile aux politiques IAM\"\n  value       = aws_s3_bucket.demo.arn\n}",
      },
      {
        kind: "command",
        label: "Lire un output après apply",
        command: "terraform output bucket_name",
        why: "Affiche la valeur de l'output `bucket_name` telle qu'enregistrée dans le state. Les outputs sont le pont entre Terraform et le reste du monde : scripts de déploiement, documentation, chaînage entre projets.",
        verify: "terraform output",
      },
    ],
  },
  {
    id: "organisation-fichiers",
    title: "Organiser un projet Terraform",
    level: 2,
    intro:
      "Une convention de fichiers qui passe à l'échelle, du lab au projet d'équipe.",
    blocks: [
      {
        kind: "diagram",
        title: "Structure recommandée",
        lines: [
          "mon-projet/",
          "├── main.tf          (ressources principales)",
          "├── variables.tf     (déclaration des variables)",
          "├── outputs.tf       (valeurs exposées)",
          "├── versions.tf      (terraform + providers épinglés)",
          "├── terraform.tfvars (valeurs par environnement — non versionné si sensible)",
          "└── modules/",
          "    └── reseau/      (module maison : main.tf, variables.tf, outputs.tf)",
        ],
      },
      {
        kind: "code",
        language: "hcl",
        title: "versions.tf — épingler les versions",
        code: "terraform {\n  required_version = \">= 1.9, < 2.0\"\n\n  required_providers {\n    aws = {\n      source  = \"hashicorp/aws\"\n      version = \"~> 5.0\"\n    }\n  }\n}",
      },
      {
        kind: "text",
        text: "Séparez par préoccupation, pas par type de ressource : un fichier par domaine (réseau, compute, base) plutôt qu'un fichier géant. `~> 5.0` autorise les versions 5.x (correctifs et mineurs) mais pas la 6.0 : les montées majeures se font consciemment.",
      },
    ],
  },
  {
    id: "le-state",
    title: "Le state : la mémoire de Terraform",
    level: 2,
    intro:
      "Le fichier que Terraform utilise pour relier votre code à la réalité.",
    blocks: [
      {
        kind: "text",
        text: "Le state (`terraform.tfstate`) enregistre quelles ressources réelles correspondent à quelles ressources déclarées, avec leurs identifiants et attributs. C'est grâce à lui que `terraform plan` sait ce qui existe déjà : sans state, Terraform voudrait tout recréer.",
      },
      {
        kind: "fields",
        title: "Règles vitales du state",
        fields: [
          {
            label: "Ne jamais l'éditer à la main",
            value:
              "Le state est une base de données : toute édition manuelle le corrompt. Utilisez `terraform state` (sous-commandes `list`, `mv`, `rm`) pour les manipulations.",
          },
          {
            label: "Ne jamais le versionner en clair",
            value:
              "Le state contient des secrets en clair (mots de passe générés, clés). En équipe, il vit dans un backend distant chiffré, jamais dans Git.",
          },
          {
            label: "Un seul écrivain à la fois",
            value:
              "Deux `apply` simultanés corrompent le state : le backend distant fournit un verrou (locking) qui sérialise les écritures.",
          },
        ],
      },
      {
        kind: "command",
        label: "Lister les ressources du state",
        command: "terraform state list",
        why: "Affiche toutes les ressources suivies dans le state (`aws_s3_bucket.demo`, …). C'est la commande de diagnostic n°1 quand le plan propose des changements surprenants : comparez ce que Terraform croit gérer avec la réalité.",
        verify: "terraform state list | head -20",
      },
    ],
  },
  {
    id: "terraform-vs-autres",
    title: "Terraform, Ansible, Pulumi : qui fait quoi",
    level: 2,
    intro:
      "Trois outils complémentaires, pas concurrents : chacun son terrain.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Terraform / OpenTofu", "Ansible", "Pulumi"],
        rows: [
          ["Philosophie", "Déclaratif (état désiré)", "Procédural (tâches ordonnées)", "Déclaratif en langage généraliste"],
          ["Langage", "HCL", "YAML (playbooks)", "TypeScript, Python, Go…"],
          ["Terrain fort", "Provisionner l'infrastructure cloud", "Configurer les machines (packages, fichiers, services)", "Infra + logique complexe dans un vrai langage"],
          ["State", "Oui (fichier d'état)", "Non (sans état)", "Oui"],
          ["Idéal pour", "Réseaux, instances, bases managées", "Durcissement, déploiement applicatif sur VM", "Équipes dev qui préfèrent un langage connu"],
        ],
      },
      {
        kind: "text",
        text: "Le découpage classique : Terraform provisionne (crée les serveurs, le réseau), Ansible configure (installe et paramètre ce qui tourne dessus). Beaucoup d'équipes utilisent les deux, chacun sur son terrain.",
      },
      {
        kind: "command",
        label: "Exécuter un playbook Ansible",
        command: "ansible-playbook site.yml -i inventaire.ini",
        why: "Applique le playbook `site.yml` aux machines listées dans l'inventaire. Ansible se connecte en SSH, exécute les tâches dans l'ordre, et affiche ce qui a changé. Idempotent par conception des modules (un paquet déjà installé n'est pas réinstallé).",
        verify: "ansible-playbook --check site.yml -i inventaire.ini",
      },
    ],
  },
  {
    id: "deboguer-terraform",
    title: "Déboguer Terraform",
    level: 2,
    intro:
      "Quand le plan propose n'importe quoi ou que l'apply échoue : la méthode.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Lire le plan en entier",
            detail:
              "Chaque ressource est marquée `+` (création), `~` (modification), `-` (destruction). Un `-` inattendu = danger : comprenez pourquoi avant d'appliquer.",
          },
          {
            title: "Vérifier le state",
            detail:
              "`terraform state list` : la ressource existe-t-elle dans le state ? Un plan qui veut recréer une ressource existante signale souvent un state désynchronisé.",
          },
          {
            title: "Activer les logs détaillés",
            detail:
              "`TF_LOG=DEBUG terraform plan` affiche les appels API au provider : utile quand l'erreur vient du cloud (permissions, quotas, limites).",
          },
          {
            title: "Isoler avec -target",
            detail:
              "`terraform apply -target=aws_s3_bucket.demo` n'applique qu'une ressource : pour débloquer une situation sans tout rejouer. À n'utiliser qu'en dépannage, pas en routine.",
          },
          {
            title: "Vérifier les credentials",
            detail:
              "La majorité des échecs d'apply sont des problèmes d'authentification ou de droits IAM : vérifiez l'identité utilisée et ses permissions avant d'incriminer le code.",
          },
        ],
      },
    ],
  },
  {
    id: "flux-professionnel-iac",
    title: "Le flux professionnel : plan en PR, apply en CI",
    level: 3,
    intro:
      "La règle d'or des équipes : jamais d'apply manuel depuis un laptop.",
    blocks: [
      {
        kind: "diagram",
        title: "Le workflow GitOps de l'infrastructure",
        lines: [
          "Branche de feature (modification du .tf)",
          "     ↓",
          "Pull request",
          "  └── CI : terraform fmt -check, validate, plan",
          "  └── le PLAN est posté en commentaire de la PR",
          "     ↓",
          "Revue humaine du plan (que va-t-il se passer ?)",
          "     ↓",
          "Merge sur main",
          "  └── CI : terraform apply (automatique ou sur approbation)",
          "     ↓",
          "L'infrastructure réelle = le code mergé",
        ],
      },
      {
        kind: "text",
        text: "Le plan en commentaire de PR est la revue de code de l'infrastructure : on relit non pas le HCL, mais ses effets concrets. L'apply automatique au merge (ou sur approbation pour la production) garantit que la réalité suit le code — aucun changement manuel ne survit.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "hcl-en-detail",
    title: "HCL en détail",
    level: 3,
    intro:
      "Le langage de Terraform, bloc par bloc : comprendre ce qu'on écrit vraiment.",
    blocks: [
      {
        kind: "code",
        language: "hcl",
        title: "Les blocs fondamentaux",
        code: "# Bloc terraform : versions et backend\nterraform {\n  required_version = \">= 1.9\"\n}\n\n# Bloc provider : configuration d'un fournisseur cloud\nprovider \"aws\" {\n  region = var.region\n}\n\n# Bloc resource : une ressource gérée\nresource \"aws_instance\" \"web\" {\n  ami           = data.aws_ami.ubuntu.id\n  instance_type = var.instance_type\n\n  tags = {\n    Name = \"web-01\"\n  }\n}\n\n# Bloc data : lecture d'une ressource EXISTANTE (non gérée)\n# data \"aws_ami\" \"ubuntu\" { ... }\n\n# Bloc variable / output : interface du module\n# Bloc module : appel à un module réutilisable",
      },
      {
        kind: "fields",
        title: "Les types de blocs",
        fields: [
          {
            label: "`terraform`",
            value:
              "Configuration de Terraform lui-même : versions requises, backend du state, providers requis. Un seul par projet.",
          },
          {
            label: "`provider`",
            value:
              "Paramètre un fournisseur (région, credentials via variables d'environnement). Les credentials ne sont JAMAIS en dur ici.",
          },
          {
            label: "`resource`",
            value:
              "Déclare une ressource à créer et gérer : `resource \"TYPE\" \"NOM\"`. Le type vient du provider (`aws_instance`, `azurerm_virtual_network`…).",
          },
          {
            label: "`data`",
            value:
              "Lit une ressource existante sans la gérer (ex. la dernière AMI Ubuntu, un VPC créé ailleurs). Le pont avec l'existant.",
          },
          {
            label: "`variable` / `output`",
            value:
              "L'interface : ce que le module reçoit et ce qu'il expose. Typés et documentés.",
          },
          {
            label: "`module`",
            value:
              "Appelle un ensemble réutilisable de ressources avec des paramètres. La factorisation de l'infrastructure.",
          },
        ],
      },
    ],
  },
  {
    id: "data-sources",
    title: "Data sources : lire l'existant",
    level: 3,
    intro:
      "Ne pas tout gérer : lire ce qui existe déjà et s'y brancher.",
    blocks: [
      {
        kind: "code",
        language: "hcl",
        title: "Lire la dernière AMI Ubuntu",
        code: "data \"aws_ami\" \"ubuntu\" {\n  most_recent = true\n  owners      = [\"099720109477\"] # Canonical\n\n  filter {\n    name   = \"name\"\n    values = [\"ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*\"]\n  }\n}\n\nresource \"aws_instance\" \"web\" {\n  ami           = data.aws_ami.ubuntu.id\n  instance_type = \"t3.micro\"\n}",
      },
      {
        kind: "text",
        text: "La data source lit l'AMI la plus récente au moment du plan, sans la gérer : si Canonical publie une nouvelle image, le prochain plan proposera de la prendre (ou pas, selon votre politique). Usage typique : VPC existants, zones DNS, secrets du gestionnaire de secrets, dernières AMIs.",
      },
    ],
  },
  {
    id: "count-foreach",
    title: "count vs for_each",
    level: 3,
    intro:
      "Créer plusieurs ressources similaires : deux mécanismes, un seul bon choix la plupart du temps.",
    blocks: [
      {
        kind: "code",
        language: "hcl",
        title: "for_each : la forme recommandée",
        code: "variable \"buckets\" {\n  type    = set(string)\n  default = [\"assets\", \"backups\", \"logs\"]\n}\n\nresource \"aws_s3_bucket\" \"data\" {\n  for_each = var.buckets\n  bucket   = \"mon-projet-${each.key}\"\n}",
      },
      {
        kind: "text",
        text: "`for_each` crée une instance par élément, identifiée par sa clé (`aws_s3_bucket.data[\"assets\"]`). Si vous retirez `\"logs\"` de la liste, seul ce bucket est détruit. Avec `count`, les instances sont numérotées (`[0]`, `[1]`) : retirer un élément du milieu décale les index et peut détruire/recréer les autres. Règle : `for_each` par défaut, `count` uniquement pour des réplicas vraiment interchangeables.",
      },
    ],
  },
  {
    id: "modules",
    title: "Modules : factoriser l'infrastructure",
    level: 3,
    intro:
      "Un module = un dossier de .tf réutilisable avec ses variables et outputs.",
    blocks: [
      {
        kind: "code",
        language: "hcl",
        title: "Appeler un module",
        code: "module \"reseau\" {\n  source = \"./modules/reseau\"\n\n  nom_vpc = \"production\"\n  cidr    = \"10.0.0.0/16\"\n}\n\nresource \"aws_instance\" \"web\" {\n  ami           = data.aws_ami.ubuntu.id\n  instance_type = \"t3.micro\"\n  subnet_id     = module.reseau.subnet_publique_id\n}",
      },
      {
        kind: "text",
        text: "Le module `reseau` encapsule VPC, sous-réseaux, tables de routage ; il expose `subnet_publique_id` en output. `source` peut être un chemin local, un dépôt Git (avec `?ref=v1.2.0` pour épingler) ou le registry Terraform. Épinglez toujours les modules distants par version : un module qui change sous vos pieds change votre infrastructure.",
      },
      {
        kind: "list",
        items: [
          "Un module fait UNE chose bien (un VPC, un cluster, une base) : pas de module « tout ». ",
          "Variables typées + descriptions + outputs documentés : le module se consomme sans lire son code.",
          "Versionnez les modules partagés (tags Git, registry) : les consommateurs choisissent quand monter de version.",
        ],
      },
    ],
  },
  {
    id: "backends-distants",
    title: "Backends distants : le state en équipe",
    level: 3,
    intro:
      "Le state local ne passe pas l'échelle d'une personne : le backend distant apporte partage, chiffrement et verrouillage.",
    blocks: [
      {
        kind: "code",
        language: "hcl",
        title: "Backend S3 avec verrouillage",
        code: "terraform {\n  backend \"s3\" {\n    bucket       = \"mon-terraform-state\"\n    key          = \"production/terraform.tfstate\"\n    region       = \"eu-west-1\"\n    encrypt      = true\n    use_lockfile = true\n  }\n}",
      },
      {
        kind: "text",
        text: "Le state est stocké chiffré dans un bucket S3 dédié (versionné : chaque écriture garde l'historique), et `use_lockfile` active le verrouillage natif qui empêche deux `apply` simultanés. Après avoir ajouté ce bloc : `terraform init -migrate-state` migre le state local vers le backend.",
      },
      {
        kind: "list",
        items: [
          "Un backend par environnement (`production/terraform.tfstate`, `staging/terraform.tfstate`) : les states ne se mélangent jamais.",
          "Le bucket du state : versioning activé, chiffrement, accès restreint aux seuls rôles CI/admin.",
          "Alternatives : Terraform Cloud (backend managé avec runs distants), backend `azurerm`, `gcs`, `pg` selon votre cloud.",
        ],
      },
    ],
  },
  {
    id: "workspaces-vs-dossiers",
    title: "Environnements : workspaces ou dossiers ?",
    level: 3,
    intro:
      "Deux façons de gérer dev/staging/prod avec le même code.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Dossiers séparés", "Workspaces"],
        rows: [
          ["Principe", "`envs/prod/`, `envs/staging/` appellent les mêmes modules avec des variables différentes", "Un seul dossier, `terraform workspace select prod` change le state utilisé"],
          ["Isolation", "Forte : states et configurations totalement séparés", "Faible : même code, facile de se tromper d'environnement"],
          ["Différences", "Chaque environnement peut diverger (ressources spécifiques)", "Le code est identique, seules les variables changent"],
          ["Recommandé pour", "La plupart des équipes : explicite et sûr", "Cas simples, POC, labs"],
        ],
      },
      {
        kind: "text",
        text: "La pratique d'équipe standard : des dossiers par environnement qui appellent des modules partagés. C'est plus verbeux, mais chaque environnement est explicite, revu séparément, et on ne peut pas appliquer la prod en croyant être sur staging.",
      },
    ],
  },
  {
    id: "plan-en-ci",
    title: "Le plan en CI",
    level: 3,
    intro:
      "Automatiser `fmt`, `validate` et `plan` : la revue d'infrastructure en pull request.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: ".github/workflows/terraform.yml (extrait)",
        code: "jobs:\n  plan:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: hashicorp/setup-terraform@v3\n      - run: terraform fmt -check -recursive\n      - run: terraform init\n      - run: terraform validate\n      - run: terraform plan -out=tfplan",
      },
      {
        kind: "text",
        text: "`hashicorp/setup-terraform` est l'action officielle : elle installe la version épinglée. La chaîne : format vérifié (`fmt -check`), initialisation, validation syntaxique (sans credentials cloud), puis plan. Le plan est ensuite posté en commentaire de la PR (via des actions dédiées ou un script) pour la revue humaine. L'apply, lui, ne s'exécute qu'après le merge, avec approbation pour la production.",
      },
    ],
  },
  {
    id: "drift-detection",
    title: "Drift : quand la réalité diverge du code",
    level: 3,
    intro:
      "Quelqu'un a cliqué dans la console : le détecter avant que ça ne devienne la norme.",
    blocks: [
      {
        kind: "text",
        text: "Le drift (dérive) : la réalité a changé sans passer par le code — un paramètre modifié à la main, une ressource créée hors Terraform. `terraform plan` le révèle (des `~` inattendus), mais seulement quand quelqu'un le lance. D'où la détection planifiée : un `terraform plan -detailed-exitcode` nocturne en CI, qui alerte si le code 2 (changements détectés) apparaît hors de tout changement Git.",
      },
      {
        kind: "list",
        items: [
          "Face au drift, deux options : réimporter la réalité dans le code (si le changement manuel était légitime) ou ré-appliquer pour l'écraser.",
          "Le drift récurrent signale un problème de processus : qui a accès en écriture à la console, et pourquoi ?",
          "L'IaC ne vaut que si elle reste la source de vérité : tolérez zéro drift non documenté.",
        ],
      },
    ],
  },
  {
    id: "terraform-import",
    title: "Importer l'existant",
    level: 3,
    intro:
      "Prendre sous gestion Terraform une ressource créée à la main, sans la détruire.",
    blocks: [
      {
        kind: "command",
        label: "Importer une instance existante",
        command: "terraform import aws_instance.web i-0a1b2c3d4e5f6a7b8",
        why: "Associe la ressource réelle `i-0a1b2c3d4e5f6a7b8` à la ressource déclarée `aws_instance.web` (qui doit exister dans le code, même vide). Terraform l'ajoute au state sans la recréer. Ensuite, `terraform plan` montre l'écart entre la déclaration et la réalité : ajustez le code jusqu'à un plan vide.",
        verify: "terraform state list",
      },
      {
        kind: "code",
        language: "hcl",
        title: "Bloc import (Terraform 1.5+)",
        code: "import {\n  to = aws_instance.web\n  id = \"i-0a1b2c3d4e5f6a7b8\"\n}",
      },
      {
        kind: "text",
        text: "Le bloc `import` (version moderne) se versionne dans le code : l'import devient relisible et rejouable, contrairement à la commande CLI. Workflow : écrire la ressource, écrire le bloc import, `terraform plan` (import + diff), `terraform apply`, retirer le bloc import.",
      },
    ],
  },
  {
    id: "refactoring-moved",
    title: "Refactorer sans détruire : moved",
    level: 3,
    intro:
      "Renommer ou déplacer une ressource dans le code sans la recréer pour de vrai.",
    blocks: [
      {
        kind: "code",
        language: "hcl",
        title: "Déclarer un déplacement",
        code: "moved {\n  from = aws_instance.ancien_nom\n  to   = aws_instance.nouveau_nom\n}",
      },
      {
        kind: "text",
        text: "Sans `moved`, renommer une ressource dans le code = la détruire et la recréer (avec perte de données potentielle). Le bloc `moved` dit à Terraform : « c'est la même ressource réelle, seul le nom dans le code change ». Le plan affiche alors un déplacement, pas une destruction/création. Même principe pour déplacer une ressource dans un module.",
      },
    ],
  },
  {
    id: "taint-replace",
    title: "Forcer le remplacement d'une ressource",
    level: 3,
    intro:
      "Quand une ressource est corrompue : la marquer pour recréation propre.",
    blocks: [
      {
        kind: "command",
        label: "Marquer une ressource à remplacer",
        command: "terraform apply -replace=aws_instance.web",
        why: "Force la destruction puis la recréation de `aws_instance.web` au prochain apply, même si le code n'a pas changé. Utile quand la ressource réelle est dans un état incohérent (disque corrompu, configuration manuelle impossible à réconcilier). Le remplacement respecte les dépendances : ce qui dépend de la ressource est recréé aussi.",
      },
      {
        kind: "text",
        text: "L'ancien `terraform taint` est remplacé par `-replace` : même effet, mais déclaré au moment de l'apply plutôt que comme état persistant. Réfléchissez avant : remplacer une base de données détruit ses données — vérifiez les sauvegardes.",
      },
    ],
  },
  {
    id: "provisioners-eviter",
    title: "Provisioners : à éviter",
    level: 3,
    intro:
      "L'anti-pattern officiel de Terraform : exécuter des scripts lors de la création.",
    blocks: [
      {
        kind: "text",
        text: "Les `provisioner` (local-exec, remote-exec) exécutent des commandes pendant l'apply : installer un paquet via SSH après la création d'une instance, par exemple. La documentation Terraform elle-même les déconseille comme dernier recours : ils sont impératifs dans un outil déclaratif, non rejouables proprement, et leurs échecs laissent des ressources à moitié configurées.",
      },
      {
        kind: "list",
        items: [
          "À la place : des images pré-construites (Packer) avec tout installé — l'instance démarre prête.",
          "Ou : user-data / cloud-init pour la configuration au premier démarrage (déclaratif, rejouable).",
          "Ou : Ansible après le provisionnement, chacun sur son terrain.",
          "Si vraiment indispensable : `local-exec` pour des notifications, jamais pour configurer la ressource elle-même.",
        ],
      },
    ],
  },
  {
    id: "tester-terraform",
    title: "Tester son infrastructure",
    level: 3,
    intro:
      "Valider le code Terraform avant qu'il ne touche au cloud.",
    blocks: [
      {
        kind: "fields",
        title: "Les niveaux de test",
        fields: [
          {
            label: "`terraform validate`",
            value:
              "Vérifie la syntaxe et la cohérence interne, sans credentials. Rapide, en CI sur chaque PR.",
          },
          {
            label: "`tflint`",
            value:
              "Le linter : détecte les erreurs de type, les providers dépréciés, les mauvaises pratiques. `tflint --init` installe les règles du provider.",
          },
          {
            label: "`terraform plan` (relecture)",
            value:
              "Le test le plus rentable : un humain relit les changements proposés. Aucun outil ne remplace cette étape.",
          },
          {
            label: "`terraform test`",
            value:
              "Le framework natif (1.6+) : des assertions sur les plans (`*.tftest.hcl`). Vérifie que le module produit bien ce qu'on attend, sans déployer.",
          },
          {
            label: "Environnement éphémère",
            value:
              "Appliquer sur un environnement jetable puis détruire : le seul vrai test de bout en bout. Automatisé en CI pour les modules critiques.",
          },
        ],
      },
      {
        kind: "command",
        label: "Linter un projet",
        command: "tflint --init && tflint",
        why: "`tflint --init` installe les jeux de règles (dont celui du provider utilisé), puis `tflint` analyse le projet : variables non typées, valeurs dépréciées, ressources mal configurées. C'est l'équivalent d'ESLint pour le HCL — à intégrer en CI comme n'importe quel lint.",
        verify: "tflint --version",
      },
    ],
  },
  {
    id: "checkov",
    title: "Scanner la sécurité : Checkov",
    level: 3,
    intro:
      "Le SAST de l'infrastructure : détecter les mauvaises configurations avant l'apply.",
    blocks: [
      {
        kind: "command",
        label: "Scanner un projet Terraform",
        command: "checkov -d .",
        why: "Analyse les fichiers `.tf` contre des centaines de règles de sécurité (bucket S3 public, chiffrement absent, groupe de sécurité trop ouvert…) et affiche les violations avec leur gravité. C'est le Semgrep de l'IaC : même philosophie, appliquée à l'infrastructure.",
        verify: "checkov --version",
      },
      {
        kind: "text",
        text: "En CI, Checkov devient un gate comme les autres : échec sur les violations hautes/critiques, exceptions documentées en ligne (`# checkov:skip=CKV_AWS_20:justification`). Les règles suivent les benchmarks CIS : corriger un finding Checkov, c'est souvent se rapprocher d'un standard d'audit.",
      },
    ],
  },
  {
    id: "secrets-terraform",
    title: "Secrets et Terraform",
    level: 3,
    intro:
      "Le point sensible : le state contient des secrets en clair. Le gérer proprement.",
    blocks: [
      {
        kind: "list",
        items: [
          "Jamais de secret en dur dans le `.tf` : variables d'environnement, fichiers `.tfvars` non versionnés, ou gestionnaire de secrets.",
          "`sensitive = true` masque les valeurs dans les sorties console — mais PAS dans le state : le state reste la zone à protéger.",
          "Protégez le state : backend chiffré, accès restreint, versioning — c'est le fichier le plus sensible du projet.",
          "Ne passez jamais de secret en `output` non sensible : les outputs sont lisibles via `terraform output`.",
          "Préférez les data sources vers le coffre (Vault, gestionnaire du cloud) aux variables : le secret n'existe que pendant l'apply.",
          "Les plans (`tfplan`) contiennent aussi les valeurs : ne les archivez pas sans chiffrement.",
        ],
      },
    ],
  },
  {
    id: "couts-infrastructure",
    title: "Coûts : estimer avant d'appliquer",
    level: 3,
    intro:
      "Le plan montre les changements techniques ; il devrait aussi montrer leur coût.",
    blocks: [
      {
        kind: "text",
        text: "Chaque ressource Terraform a un coût mensuel : le plan technique sans le plan financier est incomplet. Des outils comme Infracost analysent le plan et estiment le coût mensuel, posté en commentaire de PR à côté du plan technique — la revue couvre alors la technique ET le budget. À défaut d'outil, estimez à la main les ressources coûteuses (instances, bases managées, transfert de données) avant de merger.",
      },
      {
        kind: "list",
        items: [
          "Taggez tout (`Environment`, `Owner`, `Project`) : sans tags, impossible d'attribuer les coûts.",
          "Les ressources oubliées (disques orphelins, vieilles snapshots, IP élastiques) sont la principale fuite : un `plan` régulier + des politiques de nettoyage.",
          "Dimensionnez au besoin réel, pas au pire cas imaginé : l'IaC permet d'ajuster en une PR.",
        ],
      },
    ],
  },
  {
    id: "documentation-terraform",
    title: "Documenter avec terraform-docs",
    level: 3,
    intro:
      "La documentation du module générée depuis le code, jamais désynchronisée.",
    blocks: [
      {
        kind: "command",
        label: "Générer la doc du module",
        command: "terraform-docs markdown table . > README.md",
        why: "Génère un README avec les tableaux des inputs (variables : nom, type, défaut, description), outputs, providers et ressources — directement depuis le code. La documentation ne peut plus mentir : elle est régénérée à chaque changement.",
        verify: "terraform-docs --version",
      },
      {
        kind: "text",
        text: "En CI, vérifiez que le README est à jour (`terraform-docs --check`) : une PR qui modifie une variable sans régénérer la doc échoue, comme un lint. Les `description` soignées sur chaque variable deviennent alors la documentation.",
      },
    ],
  },
  {
    id: "opentofu",
    title: "OpenTofu : le fork communautaire",
    level: 3,
    intro:
      "Pourquoi il existe, ce qu'il change, et comment choisir.",
    blocks: [
      {
        kind: "text",
        text: "En 2023, HashiCorp a changé la licence de Terraform (BUSL : plus vraiment open source). La communauté a forké le code sous licence MPL-2.0 : c'est OpenTofu, aujourd'hui sous l'égide de la Linux Foundation. En pratique : mêmes concepts, même syntaxe HCL, commandes `tofu` au lieu de `terraform`, state compatible.",
      },
      {
        kind: "list",
        items: [
          "Nouveau projet sans contrainte d'écosystème : OpenTofu est le choix open source pérenne.",
          "Projet existant sous Terraform : la migration est documentée et le state est compatible — mais planifiez-la, ne la subissez pas.",
          "Les providers (`hashicorp/aws`…) restent utilisables par les deux : c'est l'outil CLI qui diffère, pas l'écosystème de providers.",
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques-iac",
    title: "Bonnes pratiques",
    level: 3,
    intro:
      "Les règles qui distinguent un projet IaC sain d'un tas de .tf.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un seul état désiré : tout ce qui est géré est dans le code, tout ce qui est dans le code est appliqué.",
          "Petits changements, plans relus : des PR d'infrastructure petites et fréquentes, comme le code.",
          "Jamais d'apply depuis un laptop en production : la CI applique, avec approbation.",
          "Épinglez tout : versions de Terraform, des providers, des modules distants.",
          "Nommez explicitement : `aws_instance.web_production` plutôt que `aws_instance.serveur1`.",
          "Taggez tout : environnement, propriétaire, projet — pour les coûts comme pour l'inventaire.",
          "Séparez les environnements : un state par environnement, jamais de partage.",
          "Testez la destruction : un environnement qu'on ne peut pas détruire proprement est un piège.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pièges classiques de Terraform, et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Appliquer sans lire le plan",
            value:
              "Problem : `terraform apply` avec `-auto-approve` en routine détruit une base de production. Why : la confiance aveugle. Better : lire chaque plan ; `-auto-approve` uniquement en CI après revue du plan en PR.",
          },
          {
            label: "State local en équipe",
            value:
              "Problem : deux personnes appliquent avec des states locaux divergents, les ressources se marchent dessus. Why : « ça marchait en solo ». Better : backend distant + verrouillage dès le deuxième contributeur.",
          },
          {
            label: "Secrets dans le state Git",
            value:
              "Problem : `terraform.tfstate` commité avec des mots de passe en clair. Why : le `.gitignore` oublié. Better : backend chiffré, `.gitignore` strict, rotation des secrets exposés.",
          },
          {
            label: "Ressources orphelines",
            value:
              "Problem : des ressources créées à la main jamais importées ni détruites, facturées pendant des mois. Why : pas d'inventaire. Better : drift detection planifiée, tags, revue régulière.",
          },
          {
            label: "Le plan qui veut tout recréer",
            value:
              "Problem : un `plan` propose de détruire/recréer 50 ressources sans raison. Why : provider mis à jour, state perdu, ou variable modifiée en cascade. Better : comprendre la cause AVANT d'appliquer — un plan surprenant ne s'applique jamais.",
          },
          {
            label: "Variables non typées",
            value:
              "Problem : une variable `instance_type` reçoit une liste, l'erreur arrive à l'apply. Why : pas de `type` déclaré. Better : typer et décrire chaque variable.",
          },
          {
            label: "Dépendances implicites fragiles",
            value:
              "Problem : l'ordre de création échoue car Terraform n'a pas deviné une dépendance. Why : référence manquante entre ressources. Better : référencer explicitement (`subnet_id = aws_subnet.main.id`) ; `depends_on` uniquement en dernier recours.",
          },
          {
            label: "Modules non épinglés",
            value:
              "Problem : un module distant change, l'infrastructure change sans PR. Why : `source` sans `?ref=`. Better : épingler chaque module distant par version.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 3,
    intro:
      "Quatre projets de difficulté croissante pour passer de la théorie à la pratique professionnelle.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Infrastructure personnelle versionnée",
        fields: [
          { label: "Compétences requises", value: "Bases cloud, Git, ligne de commande" },
          { label: "Ce que vous construisez", value: "Un projet qui provisionne un bucket + une instance + un groupe de sécurité, avec backend local puis distant" },
          { label: "Ce que vous apprenez", value: "Le cycle init/plan/apply, le state, les variables" },
          { label: "Difficulté attendue", value: "Faible — quelques jours" },
          { label: "Projet suivant", value: "Réseau complet en modules" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Réseau complet en modules",
        fields: [
          { label: "Compétences requises", value: "Réseau (VPC, sous-réseaux), modules" },
          { label: "Ce que vous construisez", value: "VPC multi-AZ, sous-réseaux publics/privés, NAT, groupes de sécurité — le tout en modules réutilisables" },
          { label: "Ce que vous apprenez", value: "La factorisation, les data sources, for_each" },
          { label: "Difficulté attendue", value: "Moyenne — une à deux semaines" },
          { label: "Projet suivant", value: "Pipeline avec plan en PR" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Pipeline Terraform avec plan en PR",
        fields: [
          { label: "Compétences requises", value: "CI/CD, backends, Checkov" },
          { label: "Ce que vous construisez", value: "Workflow complet : fmt/validate/plan en PR, apply au merge, scan Checkov, backend S3 verrouillé" },
          { label: "Ce que vous apprenez", value: "Le GitOps de l'infrastructure, la revue des plans" },
          { label: "Difficulté attendue", value: "Élevée — deux semaines" },
          { label: "Projet suivant", value: "Multi-environnements" },
        ],
      },
      {
        kind: "fields",
        title: "Professionnel — Plateforme multi-environnements",
        fields: [
          { label: "Compétences requises", value: "Tout le programme : modules versionnés, drift, coûts" },
          { label: "Ce que vous construisez", value: "Dev/staging/prod depuis les mêmes modules, drift detection planifiée, estimation de coûts en PR, documentation générée" },
          { label: "Ce que vous apprenez", value: "L'infrastructure d'équipe : gouvernance, audit, maîtrise des coûts" },
          { label: "Difficulté attendue", value: "Professionnelle — plusieurs semaines" },
          { label: "Projet suivant", value: "Policy as code avec OPA sur les plans" },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Aller plus loin, en commençant toujours par la documentation officielle.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          { label: "Documentation Terraform", value: "La référence : langage HCL, CLI, backends, modules — exhaustive et à jour." },
          { label: "Registry Terraform", value: "Providers, modules et leurs documentations : la source de vérité pour chaque ressource." },
          { label: "Documentation OpenTofu", value: "Le fork communautaire : guides de migration et différences." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : reconstruire un environnement existant en IaC, ressource par ressource avec `import`.",
          "Référence : les benchmarks CIS du cloud utilisé, pour des configurations conformes aux audits.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "IaC maîtrisée, voici les prolongements naturels dans la roadmap DevOps.",
    blocks: [
      {
        kind: "list",
        items: [
          "Automatiser l'apply : `ci-cd` — le pipeline qui planifie en PR et applique au merge.",
          "Déployer dessus : `kubernetes` — l'orchestrateur que l'IaC provisionne.",
          "Observer : `monitoring` — ce qui est provisionné doit être surveillé.",
          "Sécuriser : `devsecops` — scanner le Terraform comme du code (Checkov, policy as code).",
          "Comprendre le terrain : `cloud` — les ressources que l'IaC modélise en profondeur.",
          "Revenir à la roadmap : valider IaC et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
  {
    id: "workspaces-envs",
    title: "Environnements : workspaces vs dossiers",
    level: 3,
    intro:
      "Dev, staging, prod : deux stratégies pour isoler les states.",
    blocks: [
      {
        kind: "command",
        label: "Créer un workspace",
        command: "terraform workspace new prod && terraform workspace list",
        why: "Les workspaces isolent le state par environnement avec le même code : `terraform.workspace` dans le HCL adapte les noms et tailles. Simple pour des environnements quasi identiques.",
        verify: "terraform workspace show",
      },
      {
        kind: "fields",
        title: "Comparer les approches",
        fields: [
          {
            label: "Workspaces",
            value:
              "Un seul code, states séparés. Simple, mais les environnements divergent mal (même code = mêmes ressources).",
          },
          {
            label: "Dossiers par environnement",
            value:
              "`envs/dev/`, `envs/prod/` qui appellent les mêmes modules avec des variables différentes. Plus explicite, divergence contrôlée — l'approche recommandée à l'échelle.",
          },
          {
            label: "La règle",
            value:
              "Petit projet : workspaces. Équipe / production sérieuse : dossiers par environnement + modules partagés.",
          },
        ],
      },
    ],
  },
  {
    id: "terraform-cloud",
    title: "Terraform Cloud / HCP",
    level: 3,
    intro:
      "L'offre managée : state, runs et collaboration sans bricolage.",
    blocks: [
      {
        kind: "text",
        text: "Terraform Cloud (HCP Terraform) héberge le state (chiffré, verrouillé), exécute les runs à distance (plus de « ça marchait sur ma machine »), et apporte les revues : chaque PR affiche le plan, l'apply exige une approbation. Le versioning des states et l'historique des runs donnent l'auditabilité.",
      },
      {
        kind: "list",
        items: [
          "Remote execution : le plan s'exécute dans le cloud avec les variables centralisées — fini les credentials sur les laptops.",
          "Sentinel / policy as code intégré : les politiques bloquent les applies non conformes.",
          "Alternative auto-hébergée : backend S3 + CI — moins intégré, mais sans dépendance à un service tiers.",
        ],
      },
    ],
  },
  {
    id: "tests-terratest",
    title: "Tester : Terratest",
    level: 3,
    intro:
      "Des tests automatisés pour l'infrastructure : le framework Terratest.",
    blocks: [
      {
        kind: "code",
        language: "go",
        title: "Exemple de test (Go, Terratest)",
        code: "func TestTerraformVpc(t *testing.T) {\n\topts := &terraform.Options{\n\t\tTerraformDir: \"../modules/vpc\",\n\t}\n\tdefer terraform.Destroy(t, opts)\n\tterraform.InitAndApply(t, opts)\n\t// assertions sur les outputs...\n}",
      },
      {
        kind: "text",
        text: "Terratest (Gruntwork, Go) déploie réellement les modules dans un compte de test, vérifie les outputs et les ressources, puis détruit tout (`defer terraform.Destroy`). C'est le niveau de test le plus fort — et le plus coûteux : réservez-le aux modules critiques et partagés.",
      },
    ],
  },
  {
    id: "gitops-terraform",
    title: "GitOps : Atlantis",
    level: 3,
    intro:
      "Le workflow collaboratif : plan en PR, apply au merge, via Atlantis.",
    blocks: [
      {
        kind: "text",
        text: "Atlantis est le GitOps pour Terraform : à chaque PR, il commente automatiquement le `terraform plan` ; après approbation et merge, il applique. Plus personne ne lance `apply` depuis son laptop : tout passe par Git, tout est revu, tout est tracé.",
      },
      {
        kind: "list",
        items: [
          "Verrouillage : Atlantis lock le projet pendant la PR — pas d'applies concurrents.",
          "Workflows personnalisés : `atlantis.yaml` enchaîne plan/apply avec vos outils (conftest, checkov).",
          "Alternative : le même workflow dans GitHub Actions/GitLab CI — Atlantis apporte la collaboration PR native.",
        ],
      },
    ],
  },
];

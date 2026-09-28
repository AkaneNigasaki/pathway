import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Terraform : de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Langage couvert : HCL, workflow CLI standard.
 */
export const LEARNING_TERRAFORM: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Terraform : l'infrastructure décrite en code, versionnée et reproductible.",
    blocks: [
      {
        kind: "text",
        text: "Terraform est un outil d'infrastructure as code : on décrit l'infrastructure (serveurs, réseaux, bases de données, DNS) dans des fichiers de configuration versionnés, et Terraform crée, modifie ou détruit les ressources pour correspondre à cette description.",
      },
      {
        kind: "text",
        text: "Pourquoi Terraform existe : avant l'IaC, les serveurs étaient configurés à la main via des consoles web — impossibles à reproduire, à auditer ou à recréer après un incident. Avec Terraform, l'infrastructure devient du code : relue en pull request, testée, déployée comme une application.",
      },
      {
        kind: "text",
        text: "Positionnement : Terraform est multi-cloud (AWS, Azure, GCP…) via des providers, contrairement aux outils natifs de chaque cloud. C'est le standard de fait de l'IaC déclarative et la base du platform engineering.",
      },
    ],
  },
  {
    id: "declaratif-vs-imperatif",
    title: "Déclaratif vs impératif",
    level: 1,
    intro:
      "Le changement de mentalité central : on décrit l'état désiré, Terraform calcule comment l'atteindre.",
    blocks: [
      {
        kind: "diagram",
        title: "Le modèle mental de Terraform",
        lines: [
          "Configuration (HCL) : « je veux 2 serveurs web »",
          "     │",
          "     ├── State : « voici ce qui existe réellement »",
          "     ▼",
          "Plan : « voici la différence et ce que je vais faire »",
          "     │  (à relire par un humain avant d'appliquer)",
          "     ▼",
          "Apply : création / modification / destruction",
          "     │",
          "     ▼",
          "Infrastructure réelle = configuration",
        ],
      },
      {
        kind: "text",
        text: "En impératif, on écrirait « crée un serveur, puis installe ceci, puis ouvre ce port » — une séquence d'ordres fragile. En déclaratif, on décrit l'état final et Terraform déduit les actions : créer ce qui manque, modifier ce qui diverge, détruire ce qui est en trop. Le `plan` avant chaque `apply` est la garantie : on voit exactement ce qui va changer avant que ça change.",
      },
      {
        kind: "list",
        items: [
          "On ne dit jamais « comment » : on dit « quoi », Terraform s'occupe du comment.",
          "Le state est la mémoire : sans lui, Terraform ne saurait pas ce qui existe déjà.",
          "Le plan est la revue : aucun changement d'infrastructure ne devrait s'appliquer sans relecture.",
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
      "Terraform provisionne des systèmes : il faut comprendre ce qu'on lui demande de créer.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut savoir",
        fields: [
          {
            label: "Linux",
            value:
              "Administrer un système : SSH, processus, fichiers, permissions. C'est ce que Terraform provisionne — sans ces bases, les ressources restent abstraites.",
          },
          {
            label: "Réseau",
            value:
              "VPC, sous-réseaux, DNS, pare-feu, ports : l'essentiel de ce qu'on décrit en IaC. Impossible de déclarer un réseau qu'on ne comprend pas.",
          },
          {
            label: "Ligne de commande",
            value:
              "Terminal, variables d'environnement, lecture d'erreurs : tout le workflow Terraform est en CLI.",
          },
          {
            label: "Git",
            value:
              "Versionner la configuration : l'IaC n'a de sens que si chaque changement est tracé et relu.",
          },
          {
            label: "Un cloud (bases)",
            value:
              "Savoir ce qu'est une instance, un bucket, une base managée dans au moins un cloud — le vocabulaire des ressources.",
          },
        ],
      },
      {
        kind: "text",
        text: "Chaque prérequis est cliquable dans la roadmap. Conseil : créer d'abord une ressource à la main dans la console du cloud, puis la décrire en Terraform — on comprend mieux ce qu'on a déjà manipulé.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Installer Terraform : un binaire unique, sans dépendances.",
    blocks: [
      {
        kind: "command",
        label: "Installer Terraform",
        command: "brew install terraform",
        why: "Installe le binaire Terraform via Homebrew (macOS/Linux). Alternative : télécharger le binaire depuis developer.hashicorp.com et le placer dans le PATH. Terraform est un binaire unique sans dépendances.",
        verify: "terraform version",
      },
      {
        kind: "text",
        text: "`terraform version` affiche la version installée. Comme pour tout outil d'infrastructure, la version compte : les équipes la figent (via la contrainte `required_version` dans le code) pour que tout le monde applique avec la même version.",
      },
    ],
  },
  {
    id: "premier-projet",
    title: "Premier projet",
    level: 2,
    intro:
      "Décrire, prévisualiser et appliquer une première infrastructure, étape par étape.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le dossier et le fichier principal",
            detail:
              "`mkdir terraform-demo && cd terraform-demo`, puis créer `main.tf` : c'est le fichier de configuration principal, écrit en HCL (HashiCorp Configuration Language).",
          },
          {
            title: "Déclarer le provider",
            detail:
              "Ajouter le bloc `terraform { required_providers { ... } }` : il déclare quel provider utiliser (ex. AWS, Azure) et fige sa version. Le provider est le plugin qui traduit le HCL en appels API du cloud.",
          },
          {
            title: "Déclarer une ressource",
            detail:
              "Ajouter un bloc `resource` : `resource \"aws_instance\" \"web\" { ... }` décrit une machine virtuelle — son type, sa taille, ses tags. Rien n'est créé pour l'instant : c'est une description.",
          },
          {
            title: "Initialiser",
            detail:
              "`terraform init` : télécharge le provider et prépare le dossier de travail (`.terraform/`). À exécuter une fois par projet, et après chaque changement de provider.",
          },
          {
            title: "Formater et valider",
            detail:
              "`terraform fmt` uniformise l'indentation ; `terraform validate` vérifie la syntaxe et la cohérence interne — sans contacter le cloud.",
          },
          {
            title: "Prévisualiser puis appliquer",
            detail:
              "`terraform plan` affiche ce qui serait créé ; `terraform apply` l'applique après confirmation. `terraform destroy` détruit tout à la fin de l'exercice — ne jamais oublier cette étape sur un cloud facturé.",
          },
        ],
      },
      {
        kind: "code",
        language: "hcl",
        title: "main.tf — première ressource",
        code: `terraform {\n  required_providers {\n    aws = {\n      source  = "hashicorp/aws"\n      version = "~> 5.0"\n    }\n  }\n}\n\nresource "aws_instance" "web" {\n  ami           = var.ami_id\n  instance_type = "t3.micro"\n\n  tags = {\n    Name = "web"\n  }\n}`,
      },
    ],
  },
  {
    id: "environnement-developpement",
    title: "Environnement de développement",
    level: 2,
    intro:
      "Éditeur, terminal et cloud : les trois pôles du travail Terraform quotidien.",
    blocks: [
      {
        kind: "diagram",
        title: "La chaîne de travail",
        lines: [
          "Éditeur (HCL : main.tf, variables.tf, outputs.tf)",
          "      ↓  autocomplétion + validation via l'extension",
          "Terminal (terraform init / plan / apply)",
          "      ↓  appels API via le provider",
          "Cloud (ressources réelles)",
          "      ↓  état enregistré",
          "State (terraform.tfstate : la mémoire)",
        ],
      },
      {
        kind: "text",
        text: "Le cycle est court : éditer le HCL, `terraform plan` pour voir la différence, `apply` pour converger. L'extension d'éditeur valide la syntaxe en continu ; le `plan` valide contre le cloud. Les deux niveaux de validation sont complémentaires.",
      },
      {
        kind: "list",
        items: [
          "VS Code + extension « HashiCorp Terraform » : coloration, complétion, validation et formatage.",
          "Alternatives : JetBrains (plugin Terraform), Neovim + `terraform-ls` (le serveur de langage).",
          "Un compte cloud avec droits limités pour s'exercer — jamais les clés root/owner.",
        ],
      },
    ],
  },
  {
    id: "cycle-travail",
    title: "Le cycle de travail",
    level: 2,
    intro:
      "Les cinq commandes qui structurent toute journée Terraform, dans l'ordre.",
    blocks: [
      {
        kind: "table",
        headers: ["Commande", "Rôle", "Quand"],
        rows: [
          ["`terraform init`", "Prépare le dossier : télécharge providers et modules", "Nouveau projet, changement de provider/module"],
          ["`terraform fmt`", "Formate le HCL (indentation canonique)", "Avant chaque commit — souvent automatisé"],
          ["`terraform validate`", "Vérifie syntaxe et cohérence", "Après chaque modification, avant le plan"],
          ["`terraform plan`", "Prévisualise les changements", "Toujours avant `apply` — la relecture obligatoire"],
          ["`terraform apply`", "Applique les changements", "Après relecture du plan"],
        ],
      },
      {
        kind: "command",
        label: "Le trio de vérification",
        command: "terraform fmt && terraform validate && terraform plan",
        why: "Enchaîne formatage, validation syntaxique et prévisualisation : la séquence à exécuter avant tout `apply`. Si l'une échoue, on corrige avant de continuer.",
      },
    ],
  },
  {
    id: "hcl-bases",
    title: "HCL : les bases",
    level: 2,
    intro:
      "Le langage de Terraform : des blocs, des arguments et des types simples.",
    blocks: [
      {
        kind: "code",
        language: "hcl",
        title: "Anatomie d'un bloc",
        code: `resource "aws_instance" "web" {   # type de bloc + type + nom\n  ami           = var.ami_id      # argument : référence à une variable\n  instance_type = "t3.micro"      # argument : chaîne littérale\n  count         = 2               # argument : nombre\n\n  tags = {                        # argument : map (objet)\n    Name = "web"\n    Env  = "dev"\n  }\n}`,
      },
      {
        kind: "list",
        items: [
          "Bloc : `type \"étiquette1\" \"étiquette2\" { ... }` — ex. `resource \"aws_instance\" \"web\"`.",
          "Arguments : `clé = valeur` — chaînes, nombres, booléens, listes `[]`, maps `{}`.",
          "Références : `var.ami_id` (variable), `aws_instance.web.id` (attribut d'une autre ressource) — c'est ainsi que les ressources se connectent.",
          "Commentaires : `#` ou `//` en ligne, `/* */` en bloc.",
          "Indentation : deux espaces, imposée par `terraform fmt`.",
        ],
      },
    ],
  },
  {
    id: "providers",
    title: "Providers",
    level: 2,
    intro:
      "Le plugin qui relie Terraform à chaque plateforme : un même langage, plusieurs clouds.",
    blocks: [
      {
        kind: "code",
        language: "hcl",
        title: "Déclarer et configurer un provider",
        code: `terraform {\n  required_providers {\n    aws = {\n      source  = "hashicorp/aws"\n      version = "~> 5.0"\n    }\n  }\n}\n\nprovider "aws" {\n  region = "eu-west-1"\n}`,
      },
      {
        kind: "list",
        items: [
          "`source` : l'adresse du provider (`hashicorp/aws`, `hashicorp/azurerm`) — les providers communautaires existent aussi.",
          "`version = \"~> 5.0\"` : autorise les versions 5.x sans passer à la 6 — fige la compatibilité sans bloquer les correctifs.",
          "Le bloc `provider \"aws\"` configure la connexion (région, profil d'authentification).",
          "`terraform init` télécharge les providers dans `.terraform/` et fige les versions exactes dans `.terraform.lock.hcl`.",
          "Authentification : via variables d'environnement ou profils du cloud — jamais de clés en dur dans le HCL.",
        ],
      },
    ],
  },
  {
    id: "variables",
    title: "Variables d'entrée",
    level: 2,
    intro:
      "Paramétrer la configuration : `variables.tf` pour déclarer, `terraform.tfvars` pour valoriser.",
    blocks: [
      {
        kind: "code",
        language: "hcl",
        title: "variables.tf — déclaration",
        code: `variable "instance_type" {\n  description = "Type d'instance EC2"\n  type        = string\n  default     = "t3.micro"\n}\n\nvariable "environment" {\n  description = "Environnement cible"\n  type        = string\n\n  validation {\n    condition     = contains(["dev", "staging", "prod"], var.environment)\n    error_message = "Environnement invalide."\n  }\n}`,
      },
      {
        kind: "list",
        items: [
          "`type` : `string`, `number`, `bool`, `list(string)`, `map(string)`… — typer les variables détecte les erreurs tôt.",
          "`default` : rend la variable optionnelle ; sans défaut, Terraform la demandera interactivement.",
          "`validation` : contraint les valeurs acceptées avec un message d'erreur clair.",
          "`terraform.tfvars` : valorise les variables — non commité s'il contient des secrets.",
          "Priorité : `-var` en CLI > `terraform.tfvars` > `default` ; `TF_VAR_nom` via l'environnement.",
        ],
      },
    ],
  },
  {
    id: "outputs",
    title: "Outputs : exposer les résultats",
    level: 2,
    intro:
      "Afficher et réutiliser les valeurs produites : adresses IP, noms DNS, identifiants.",
    blocks: [
      {
        kind: "code",
        language: "hcl",
        title: "outputs.tf",
        code: `output "instance_ip" {\n  description = "Adresse IP publique du serveur web"\n  value       = aws_instance.web.public_ip\n}\n\noutput "instance_id" {\n  description = "Identifiant de l'instance"\n  value       = aws_instance.web.id\n}`,
      },
      {
        kind: "command",
        label: "Afficher les outputs",
        command: "terraform output",
        why: "Affiche les valeurs des outputs après un `apply` : l'adresse IP à tester, le nom DNS à configurer. `terraform output instance_ip` n'affiche qu'une valeur.",
        verify: "terraform output -json",
      },
    ],
  },
  {
    id: "state-bases",
    title: "Le state : la mémoire de Terraform",
    level: 2,
    intro:
      "Le fichier `terraform.tfstate` : comment Terraform sait ce qui existe réellement.",
    blocks: [
      {
        kind: "diagram",
        title: "Le rôle du state",
        lines: [
          "Configuration (ce qu'on veut)",
          "        ↕  comparaison",
          "State (ce que Terraform a créé : IDs, IPs…)",
          "        ↕  rafraîchissement",
          "Infrastructure réelle",
          "",
          "Plan = (Configuration − State) + changements détectés",
        ],
      },
      {
        kind: "list",
        items: [
          "Contenu : pour chaque ressource, son identifiant réel, ses attributs, ses dépendances.",
          "Local par défaut : `terraform.tfstate` dans le dossier — à ne jamais committer s'il contient des secrets, à ne jamais éditer à la main.",
          "En équipe : backend distant (bucket S3, Terraform Cloud) avec verrouillage — deux `apply` simultanés corrompraient le state.",
          "Perdre le state = perdre la mémoire : Terraform voudrait recréer des ressources qui existent déjà.",
        ],
      },
    ],
  },
  {
    id: "debugging-debutant",
    title: "Debugging : les pannes classiques",
    level: 2,
    intro:
      "Les quatre situations qui bloquent les débutants, et la commande qui débloque.",
    blocks: [
      {
        kind: "fields",
        title: "Diagnostic",
        fields: [
          {
            label: "`terraform init` échoue",
            value:
              "Souvent un problème réseau ou de version de provider. Relire le message : il indique quel provider pose problème. Supprimer `.terraform/` et relancer `init` résout les états incohérents.",
          },
          {
            label: "`plan` propose de tout recréer",
            value:
              "Le state ne correspond plus à la réalité (ressources supprimées à la main, state perdu). Ne jamais appliquer aveuglément : comprendre d'abord pourquoi Terraform veut recréer.",
          },
          {
            label: "Verrou du state (state lock)",
            value:
              "Un `apply` précédent a été interrompu et le verrou n'a pas été libéré. Vérifier qu'aucun apply ne tourne vraiment, puis `terraform force-unlock <ID>` — en dernier recours uniquement.",
          },
          {
            label: "Erreur d'authentification du provider",
            value:
              "Clés expirées, mauvaise région, profil inexistant. Tester l'accès avec la CLI du cloud (`aws sts get-caller-identity`) avant d'accuser Terraform.",
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
      "Quatre projets de difficulté croissante, du premier serveur à l'infrastructure multi-environnements.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Premier serveur",
        fields: [
          { label: "Compétences requises", value: "HCL, resource, init/plan/apply" },
          { label: "Ce que vous construisez", value: "Une machine virtuelle avec un serveur web, accessible via son IP publique" },
          { label: "Ce que vous apprenez", value: "Le cycle complet, les outputs, le destroy en fin d'exercice" },
          { label: "Difficulté attendue", value: "Faible — quelques heures" },
          { label: "Projet suivant", value: "Réseau complet" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Réseau complet",
        fields: [
          { label: "Compétences requises", value: "Variables, outputs, références entre ressources" },
          { label: "Ce que vous construisez", value: "VPC + sous-réseaux + serveur + base de données, paramétrés par variables" },
          { label: "Ce que vous apprenez", value: "Les dépendances implicites, la paramétrisation, le state" },
          { label: "Difficulté attendue", value: "Moyenne — quelques jours" },
          { label: "Projet suivant", value: "Module réutilisable" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Module réutilisable",
        fields: [
          { label: "Compétences requises", value: "Modules, for_each, backend distant" },
          { label: "Ce que vous construisez", value: "Un module réseau déployé sur deux environnements (dev/prod) avec state distant" },
          { label: "Ce que vous apprenez", value: "La factorisation, l'isolation des environnements, le travail en équipe" },
          { label: "Difficulté attendue", value: "Élevée — une à deux semaines" },
          { label: "Projet suivant", value: "IaC en CI/CD" },
        ],
      },
      {
        kind: "fields",
        title: "Professionnel — IaC en CI/CD",
        fields: [
          { label: "Compétences requises", value: "Tout le programme : CI/CD, tests, drift detection" },
          { label: "Ce que vous construisez", value: "Pipeline : plan automatique sur pull request, apply contrôlé, détection de dérive" },
          { label: "Ce que vous apprenez", value: "La revue d'infrastructure, la gouvernance, l'automatisation sûre" },
          { label: "Difficulté attendue", value: "Professionnelle — plusieurs semaines" },
          { label: "Projet suivant", value: "Contribuer à un module open source" },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "meta-arguments",
    title: "Méta-arguments : count, for_each, lifecycle",
    level: 3,
    intro:
      "Créer plusieurs ressources similaires et contrôler leur cycle de vie sans dupliquer de blocs.",
    blocks: [
      {
        kind: "code",
        language: "hcl",
        title: "for_each sur une map",
        code: `resource "aws_instance" "web" {\n  for_each      = var.servers  # map : { \"a\" = {...}, \"b\" = {...} }\n  ami           = each.value.ami\n  instance_type = each.value.type\n\n  tags = { Name = "web-\${each.key}" }\n\n  lifecycle {\n    prevent_destroy = true  # refuse de détruire cette ressource\n  }\n}`,
      },
      {
        kind: "list",
        items: [
          "`count = 3` : N copies indexées par `count.index` — simple, mais fragile si l'ordre change.",
          "`for_each` : une instance par clé de map/set, adressée par `each.key` — stable et préférable.",
          "`depends_on` : dépendance explicite quand aucune référence d'attribut ne l'exprime (rare).",
          "`lifecycle.prevent_destroy` : garde-fou contre la destruction accidentelle des données.",
          "`lifecycle.create_before_destroy` : pour les ressources à remplacer sans interruption.",
          "`lifecycle.ignore_changes` : ignorer les modifications hors Terraform (ex. tags posés par un autre outil).",
        ],
      },
    ],
  },
  {
    id: "expressions-fonctions",
    title: "Expressions et fonctions HCL",
    level: 3,
    intro:
      "Le langage d'expression : conditionnelles, boucles `for` et fonctions natives.",
    blocks: [
      {
        kind: "code",
        language: "hcl",
        title: "Expressions courantes",
        code: `locals {\n  # Conditionnelle\n  env_tag = var.environment == "prod" ? "production" : "dev"\n\n  # Boucle for : transformer une liste\n  upper_names = [for s in var.servers : upper(s)]\n\n  # Fonctions natives\n  merged_tags = merge(var.base_tags, { Env = var.environment })\n  first_zone  = element(var.zones, 0)\n  safe_value  = try(var.optional.value, "défaut")\n}`,
      },
      {
        kind: "list",
        items: [
          "`locals` : nommer des expressions intermédiaires — la lisibilité avant tout.",
          "Fonctions utiles : `length()`, `join()`, `format()`, `merge()`, `lookup()`, `coalesce()`, `try()`, `tolist()`, `toset()`.",
          "`try()` : tenter une expression avec valeur de repli — élégant pour les attributs optionnels.",
          "Règle : si une expression dépasse deux niveaux d'imbrication, l'extraire dans un `locals` nommé.",
        ],
      },
    ],
  },
  {
    id: "modules-creation",
    title: "Créer des modules",
    level: 3,
    intro:
      "Factoriser une architecture en module réutilisable : la structure et les conventions.",
    blocks: [
      {
        kind: "diagram",
        title: "Structure d'un module",
        lines: [
          "modules/reseau/",
          " ├── main.tf        (ressources du module)",
          " ├── variables.tf   (paramètres d'entrée)",
          " ├── outputs.tf     (valeurs exposées)",
          " └── README.md      (usage : exemple d'appel)",
        ],
      },
      {
        kind: "code",
        language: "hcl",
        title: "Appeler un module local",
        code: `module "reseau_dev" {\n  source      = "./modules/reseau"\n  environment = "dev"\n  cidr_block  = "10.0.0.0/16"\n}\n\nresource "aws_instance" "web" {\n  subnet_id = module.reseau_dev.subnet_id  # output du module\n  # ...\n}`,
      },
      {
        kind: "list",
        items: [
          "Un module = un dossier avec `variables.tf` (entrées), `outputs.tf` (sorties), `main.tf` (ressources).",
          "`source` : chemin local (`./modules/reseau`), dépôt Git ou registry.",
          "Les outputs du module sont la seule interface : `module.reseau_dev.subnet_id`.",
          "Documenter avec un exemple d'appel minimal dans le README — un module sans exemple ne sera pas utilisé.",
        ],
      },
    ],
  },
  {
    id: "modules-registry",
    title: "Registry et modules distants",
    level: 3,
    intro:
      "Réutiliser les modules de la communauté via le registry public — avec discernement.",
    blocks: [
      {
        kind: "code",
        language: "hcl",
        title: "Appeler un module du registry",
        code: `module "vpc" {\n  source  = "terraform-aws-modules/vpc/aws"\n  version = "5.0.0"\n\n  name = "mon-vpc"\n  cidr = "10.0.0.0/16"\n}`,
      },
      {
        kind: "list",
        items: [
          "Registry public : registry.terraform.io — modules versionnés, documentation, exemples.",
          "`version` figée : toujours épingler une version exacte ou contrainte — jamais de flottant en production.",
          "Évaluer avant d'adopter : maintenance active, issues traitées, périmètre du module vs besoin réel.",
          "Alternative : registry privé (Terraform Cloud) pour les modules internes d'une organisation.",
        ],
      },
    ],
  },
  {
    id: "data-sources",
    title: "Data sources : lire l'existant",
    level: 3,
    intro:
      "Référencer des ressources gérées ailleurs (ou par un autre state) sans les gérer.",
    blocks: [
      {
        kind: "code",
        language: "hcl",
        title: "Lire une AMI et un VPC existants",
        code: `data "aws_ami" "ubuntu" {\n  most_recent = true\n  owners      = ["099720109477"]  # Canonical\n\n  filter {\n    name   = "name"\n    values = ["ubuntu/images/hvm-ssd/ubuntu-*-amd64-server-*"]\n  }\n}\n\nresource "aws_instance" "web" {\n  ami = data.aws_ami.ubuntu.id\n  # ...\n}`,
      },
      {
        kind: "text",
        text: "Les data sources lisent sans gérer : AMI à jour, VPC existant, secrets dans un gestionnaire. Elles sont évaluées à chaque `plan` — une data source lente ralentit tout le workflow. Et surtout : une data source ne protège pas la ressource lue — elle peut changer ou disparaître hors de Terraform.",
      },
    ],
  },
  {
    id: "workspaces",
    title: "Workspaces : isoler les environnements",
    level: 3,
    intro:
      "Plusieurs states pour une même configuration : dev, staging, prod sans dupliquer le code.",
    blocks: [
      {
        kind: "command",
        label: "Créer et basculer de workspace",
        command: "terraform workspace new prod",
        why: "Crée un workspace `prod` avec son propre state, isolé du workspace `default`. La même configuration déploie alors une infrastructure séparée par workspace.",
        verify: "terraform workspace list",
      },
      {
        kind: "list",
        items: [
          "`terraform workspace select dev` : basculer d'environnement — vérifier toujours le workspace courant avant un `apply`.",
          "`terraform.workspace` : variable interpolable pour différencier les noms (`\"web-${terraform.workspace}\"`).",
          "Limite : les workspaces partagent la même configuration — pour des environnements très différents, des dossiers séparés sont plus clairs.",
          "En équipe : backend distant obligatoire — les workspaces locaux ne se partagent pas.",
        ],
      },
    ],
  },
  {
    id: "backends",
    title: "Backends distants",
    level: 3,
    intro:
      "Stocker le state à distance avec verrouillage : le prérequis du travail en équipe.",
    blocks: [
      {
        kind: "code",
        language: "hcl",
        title: "Backend S3 (exemple)",
        code: `terraform {\n  backend "s3" {\n    bucket = "mon-bucket-tfstate"\n    key    = "prod/terraform.tfstate"\n    region = "eu-west-1"\n  }\n}`,
      },
      {
        kind: "list",
        items: [
          "Rôle du backend : stocker le state hors des machines, le verrouiller pendant les `apply`, le chiffrer au repos.",
          "Options : S3, Terraform Cloud, Azure Blob, GCS — le choix suit le cloud principal de l'équipe.",
          "Migration : `terraform init -migrate-state` déplace un state local vers le backend — opération à faire une fois, avec sauvegarde.",
          "Le bloc `backend` n'accepte pas de variables : valeurs en dur ou fichier de config partiel via `-backend-config`.",
        ],
      },
    ],
  },
  {
    id: "state-avance",
    title: "Manipuler le state",
    level: 3,
    intro:
      "Les commandes de chirurgie du state : à utiliser avec parcimonie et sauvegarde préalable.",
    blocks: [
      {
        kind: "command",
        label: "Lister et inspecter le state",
        command: "terraform state list",
        why: "Affiche toutes les ressources suivies dans le state : l'inventaire exact de ce que Terraform gère. `terraform state show <adresse>` détaille une ressource.",
        verify: "terraform state list | head",
      },
      {
        kind: "list",
        items: [
          "`terraform state mv` : renommer/déplacer une ressource dans le state (ex. après refactor en module) — sans recréer la ressource réelle.",
          "`terraform state rm` : retirer une ressource du suivi — Terraform l'« oublie » sans la détruire.",
          "`terraform refresh` (via `plan -refresh-only`) : resynchroniser le state avec la réalité sans modifier l'infrastructure.",
          "Règle d'or : sauvegarder le state (`terraform state pull > backup.json`) avant toute manipulation.",
        ],
      },
    ],
  },
  {
    id: "import",
    title: "Importer l'existant",
    level: 3,
    intro:
      "Faire entrer une ressource créée à la main sous gestion Terraform, sans la recréer.",
    blocks: [
      {
        kind: "command",
        label: "Importer une ressource",
        command: "terraform import aws_instance.web i-1234567890abcdef0",
        why: "Associe une ressource réelle existante (ici une instance par son ID) à un bloc `resource` de la configuration. L'import ne génère pas le code : il faut écrire le bloc correspondant avant.",
        verify: "terraform plan",
      },
      {
        kind: "list",
        items: [
          "Procédure : écrire le bloc `resource` vide/approximatif, `import`, puis `plan` pour ajuster la configuration jusqu'à zéro diff.",
          "Bloc `import` (HCL) : la syntaxe déclarative moderne, versionnable et relisible — préférable à la commande.",
          "Après import : la ressource est gérée comme les autres — toute divergence future apparaîtra dans le plan.",
        ],
      },
    ],
  },
  {
    id: "replace",
    title: "Remplacer une ressource",
    level: 3,
    intro:
      "Forcer la recréation d'une ressource saine en apparence mais corrompue en réalité.",
    blocks: [
      {
        kind: "command",
        label: "Planifier un remplacement ciblé",
        command: "terraform plan -replace=\"aws_instance.web\"",
        why: "Demande à Terraform de détruire puis recréer la ressource indiquée au prochain `apply`, même si la configuration n'a pas changé. Utile quand une ressource est corrompue hors Terraform.",
        verify: "terraform plan -replace=\"aws_instance.web\"",
      },
      {
        kind: "text",
        text: "`-replace` remplace l'ancienne commande `terraform taint`, dépréciée. Le plan affiche explicitement le remplacement : le relire avant d'appliquer, car recréer peut changer des IPs ou entraîner une interruption.",
      },
    ],
  },
  {
    id: "plan-files",
    title: "Fichiers de plan",
    level: 3,
    intro:
      "Sauvegarder un plan et l'appliquer à l'identique : la base des workflows CI/CD sûrs.",
    blocks: [
      {
        kind: "command",
        label: "Sauvegarder puis appliquer un plan",
        command: "terraform plan -out=tfplan",
        why: "Enregistre le plan calculé dans `tfplan`. `terraform apply tfplan` applique exactement ce plan, sans recalcul — garantissant que ce qui a été relu est ce qui s'applique.",
        verify: "ls -la tfplan",
      },
      {
        kind: "list",
        items: [
          "Workflow CI : `plan -out` sur la pull request (le plan est commenté pour relecture), `apply` du fichier après approbation.",
          "`terraform show tfplan` : relire un plan sauvegardé en clair.",
          "Le fichier contient potentiellement des secrets : ne pas l'archiver durablement, le traiter comme sensible.",
        ],
      },
    ],
  },
  {
    id: "variables-avancees",
    title: "Variables avancées",
    level: 3,
    intro:
      "Types complexes, fichiers par environnement et variables d'environnement `TF_VAR_`.",
    blocks: [
      {
        kind: "code",
        language: "hcl",
        title: "Type objet et tfvars par environnement",
        code: `variable "database" {\n  type = object({\n    engine   = string\n    version  = string\n    replicas = number\n  })\n}`,
      },
      {
        kind: "command",
        label: "Passer des variables via l'environnement",
        command: "TF_VAR_environment=prod terraform plan",
        why: "Toute variable `TF_VAR_<nom>` valorise la variable Terraform `<nom>` : le mécanisme standard en CI/CD pour injecter des valeurs sans fichier.",
        verify: "env | grep TF_VAR",
      },
      {
        kind: "list",
        items: [
          "Types : `object({...})`, `list(object({...}))` — modéliser les structures plutôt que multiplier les variables scalaires.",
          "Fichiers par env : `dev.tfvars`, `prod.tfvars` + `terraform plan -var-file=prod.tfvars`.",
          "`sensitive = true` : masque la valeur dans les sorties — ne la protège pas dans le state.",
        ],
      },
    ],
  },
  {
    id: "secrets",
    title: "Gérer les secrets",
    level: 3,
    intro:
      "Les secrets traversent le state en clair : les stratégies pour limiter l'exposition.",
    blocks: [
      {
        kind: "list",
        items: [
          "Ne jamais committer : `terraform.tfvars`, `*.tfplan`, `.terraform/` — `.gitignore` strict dès le premier commit.",
          "`sensitive = true` : masque dans les logs et outputs — le state, lui, reste en clair.",
          "Gestionnaire de secrets : lire les secrets via data sources (Vault, AWS Secrets Manager) plutôt que les écrire en dur.",
          "State chiffré : backend distant avec chiffrement au repos + accès restreint — le state est le fichier le plus sensible du projet.",
          "Rotation : changer un secret = `apply` — prévoir la procédure avant d'en avoir besoin.",
        ],
      },
    ],
  },
  {
    id: "provisioners",
    title: "Provisioners : à éviter",
    level: 3,
    intro:
      "Exécuter des scripts sur les ressources : la porte de sortie à n'utiliser qu'en dernier recours.",
    blocks: [
      {
        kind: "text",
        text: "Les provisioners (`remote-exec`, `local-exec`) exécutent des commandes pendant le `apply`. La documentation officielle les qualifie de « dernier recours » : ils rendent le déploiement impératif, non rejouable, et leurs échecs laissent l'infrastructure à moitié configurée.",
      },
      {
        kind: "list",
        items: [
          "Alternative 1 : `user_data` / cloud-init — la configuration à la création, rejouable et déclarative.",
          "Alternative 2 : images pré-bâties (Packer) — le serveur démarre déjà configuré.",
          "Alternative 3 : outil de configuration (Ansible) après le provisionnement.",
          "`local-exec` reste acceptable pour des effets de bord locaux (notifier, générer un fichier).",
        ],
      },
    ],
  },
  {
    id: "versioning",
    title: "Versioning : Terraform et providers",
    level: 3,
    intro:
      "Figer les versions pour des `apply` reproductibles sur toutes les machines.",
    blocks: [
      {
        kind: "code",
        language: "hcl",
        title: "Contraintes de version",
        code: `terraform {\n  required_version = ">= 1.5, < 2.0"\n\n  required_providers {\n    aws = {\n      source  = "hashicorp/aws"\n      version = "~> 5.0"  # >= 5.0, < 6.0\n    }\n  }\n}`,
      },
      {
        kind: "list",
        items: [
          "`required_version` : refuse de tourner avec une version incompatible — protège l'équipe.",
          "`~> 5.0` : pessimistic constraint — accepte les mineurs/patchs, bloque les majeurs.",
          "`.terraform.lock.hcl` : fige les checksums exacts des providers — à committer, comme un lockfile.",
          "Mettre à jour : changer la contrainte, `terraform init -upgrade`, relire le plan — jamais en aveugle.",
        ],
      },
    ],
  },
  {
    id: "providers-multiples",
    title: "Providers multiples et alias",
    level: 3,
    intro:
      "Gérer plusieurs régions ou comptes dans une même configuration.",
    blocks: [
      {
        kind: "code",
        language: "hcl",
        title: "Deux régions AWS",
        code: `provider "aws" {\n  region = "eu-west-1"\n}\n\nprovider "aws" {\n  alias  = "us"\n  region = "us-east-1"\n}\n\nresource "aws_instance" "web_us" {\n  provider      = aws.us\n  ami           = var.ami_us\n  instance_type = "t3.micro"\n}`,
      },
      {
        kind: "text",
        text: "Le provider sans alias est le défaut ; chaque `alias` crée une instance nommée sélectionnée via `provider = aws.us`. Les modules acceptent un bloc `providers` pour recevoir les instances aliasées. Cas typique : multi-région, ou séparation réseau/données sur deux comptes.",
      },
    ],
  },
  {
    id: "fmt-validate-avance",
    title: "fmt et validate en profondeur",
    level: 3,
    intro:
      "Automatiser la qualité du HCL : vérification récursive et intégration CI.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier le formatage en CI",
        command: "terraform fmt -check -recursive",
        why: "Vérifie (sans modifier) que tous les fichiers HCL du projet et sous-dossiers respectent le formatage canonique. Retour non zéro si un fichier diffère : parfait pour bloquer une CI.",
        verify: "terraform fmt -check -recursive && echo OK",
      },
      {
        kind: "list",
        items: [
          "`terraform validate` : vérifie la cohérence interne (références, types) sans appeler le cloud — rapide, à lancer souvent.",
          "Pre-commit : hook `terraform fmt` automatique — le formatage ne se discute plus, il s'applique.",
          "Limite : `validate` ne détecte pas les erreurs de logique métier (mauvaise AMI, quota dépassé) — seul le `plan` les révèle.",
        ],
      },
    ],
  },
  {
    id: "console",
    title: "La console Terraform",
    level: 3,
    intro:
      "Un REPL pour tester les expressions HCL : fonctions, interpolations, références.",
    blocks: [
      {
        kind: "command",
        label: "Ouvrir la console",
        command: "terraform console",
        why: "Ouvre un interpréteur interactif évaluant les expressions HCL dans le contexte du projet (variables, locals, state). Idéal pour tester `merge()`, une boucle `for` ou une référence avant de l'écrire dans le code.",
        verify: "echo '1 + 1' | terraform console",
      },
      {
        kind: "text",
        text: "Usage typique : coller une expression complexe, vérifier son résultat, puis l'intégrer. La console lit le state : on peut y inspecter `aws_instance.web.public_ip` sans écrire de output temporaire.",
      },
    ],
  },
  {
    id: "graph",
    title: "Graphe des dépendances",
    level: 3,
    intro:
      "Visualiser l'ordre de création des ressources : comprendre les dépendances.",
    blocks: [
      {
        kind: "command",
        label: "Générer le graphe",
        command: "terraform graph",
        why: "Affiche le graphe de dépendances des ressources au format DOT (visualisable avec Graphviz). Révèle les dépendances implicites (via références) et explicites (`depends_on`).",
        verify: "terraform graph | head -20",
      },
      {
        kind: "text",
        text: "Terraform construit ce graphe pour paralléliser les créations indépendantes et ordonner les dépendantes. Un cycle dans le graphe (A dépend de B qui dépend de A) est une erreur : la visualisation aide à la localiser.",
      },
    ],
  },
  {
    id: "drift-detection",
    title: "Détection de dérive (drift)",
    level: 3,
    intro:
      "Quand la réalité diverge du code : détecter les changements faits hors Terraform.",
    blocks: [
      {
        kind: "command",
        label: "Détecter la dérive en CI",
        command: "terraform plan -detailed-exitcode",
        why: "Le flag `-detailed-exitcode` fait retourner 2 quand le plan contient des changements (au lieu de 0) : la CI peut ainsi alerter dès que l'infrastructure réelle dérive de la configuration, sans rien appliquer.",
        verify: "terraform plan -detailed-exitcode; echo $?",
      },
      {
        kind: "list",
        items: [
          "Causes : modification manuelle dans la console cloud, automation tierce, scaling automatique.",
          "Réponse : soit `apply` pour reconverger, soit `import`/ajustement si le changement manuel était légitime.",
          "`lifecycle.ignore_changes` : pour les attributs volontairement gérés hors Terraform (ex. nombre de réplicas d'un autoscaler).",
          "Planifié : un `plan` quotidien en CI avec alerte — la dérive silencieuse est la dette de l'IaC.",
        ],
      },
    ],
  },
  {
    id: "ci-cd-terraform",
    title: "Terraform en CI/CD",
    level: 3,
    intro:
      "Le pipeline standard : plan automatique sur pull request, apply contrôlé après approbation.",
    blocks: [
      {
        kind: "diagram",
        title: "Pipeline IaC",
        lines: [
          "Pull request",
          "  → fmt -check, validate",
          "  → plan -out=tfplan (commenté sur la PR)",
          "  → relecture humaine du plan",
          "Merge",
          "  → apply tfplan (manuel ou auto selon criticité)",
          "Planifié",
          "  → plan -detailed-exitcode (drift detection)",
        ],
      },
      {
        kind: "list",
        items: [
          "Le plan commenté sur la PR est la revue d'infrastructure : chaque ressource créée/mod/détruite est visible.",
          "Apply manuel pour la production (bouton après approbation), automatique acceptable pour dev.",
          "Credentials : rôles OIDC plutôt que clés statiques dans la CI.",
          "Concurrrence : verrou du backend — deux pipelines ne doivent jamais `apply` simultanément.",
        ],
      },
    ],
  },
  {
    id: "tests-terraform",
    title: "Tester avec terraform test",
    level: 3,
    intro:
      "Des tests natifs pour les modules : assertions sur le plan, sans déployer.",
    blocks: [
      {
        kind: "code",
        language: "hcl",
        title: "tests/reseau.tftest.hcl",
        code: `run "dev" {\n  command = plan\n\n  variables {\n    environment = "dev"\n    cidr_block  = "10.0.0.0/16"\n  }\n\n  assert {\n    condition     = length(aws_subnet.public) == 2\n    error_message = "Le module doit créer 2 sous-réseaux publics."\n  }\n}`,
      },
      {
        kind: "command",
        label: "Exécuter les tests",
        command: "terraform test",
        why: "Exécute les fichiers `*.tftest.hcl` : chaque bloc `run` planifie (ou applique) avec des variables données et vérifie les assertions. Le test natif des modules, sans framework externe.",
        verify: "terraform test",
      },
    ],
  },
  {
    id: "securite-terraform",
    title: "Sécurité : scanner l'IaC",
    level: 3,
    intro:
      "Le code d'infrastructure se scanne comme le code applicatif : politiques et analyseurs.",
    blocks: [
      {
        kind: "list",
        items: [
          "Analyseurs statiques : des outils open source (tfsec, checkov) détectent les mauvaises configurations — bucket public, security group ouvert, chiffrement absent.",
          "Règles typiques : pas de `0.0.0.0/0` en ingress sauf besoin justifié, chiffrement au repos activé, logs d'accès.",
          "En CI : le scan bloque la PR comme un test — la sécurité se relit avant de se déployer.",
          "Principe : l'IaC rend la sécurité auditable — chaque règle de pare-feu est dans Git, datée et signée.",
        ],
      },
    ],
  },
  {
    id: "terraform-cloud",
    title: "Terraform Cloud / HCP Terraform",
    level: 3,
    intro:
      "La plateforme managée : state distant, runs distants et gouvernance d'équipe.",
    blocks: [
      {
        kind: "list",
        items: [
          "Rôle : héberge le state (chiffré, verrouillé), exécute les plans/applies à distance, gère les variables par workspace.",
          "Runs distants : le `plan` s'exécute sur la plateforme — les credentials cloud ne sont jamais sur les postes.",
          "Sentinel / policy as code : des politiques qui bloquent les plans non conformes (ex. interdire certaines régions).",
          "Registry privé : publier les modules internes de l'organisation.",
          "Alternative : backend S3 + CI auto-hébergée — moins intégré, mais sans dépendance à la plateforme.",
        ],
      },
    ],
  },
  {
    id: "debugging-avance",
    title: "Debugging avancé",
    level: 3,
    intro:
      "Quand le message d'erreur ne suffit pas : logs détaillés et inspection des providers.",
    blocks: [
      {
        kind: "command",
        label: "Activer les logs détaillés",
        command: "TF_LOG=DEBUG terraform plan",
        why: "La variable `TF_LOG` (TRACE, DEBUG, INFO, WARN, ERROR) affiche les appels API du provider, les requêtes HTTP et les décisions internes. `TF_LOG_PATH` redirige vers un fichier.",
        verify: "TF_LOG=INFO terraform version",
      },
      {
        kind: "list",
        items: [
          "`terraform providers` : liste les providers requis et leurs versions — vérifie la résolution.",
          "Erreur de cycle : le message nomme les ressources — `terraform graph` visualise la boucle.",
          "Provider mystérieux : `TF_LOG=DEBUG` montre l'appel API exact et la réponse du cloud.",
          "Issue minimale : reproduire avec la plus petite configuration possible avant de chercher de l'aide.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes-avancees",
    title: "Erreurs courantes (avancé)",
    level: 3,
    intro:
      "Les pièges qui coûtent cher : state, dépendances et destructions.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Appliquer sans relire le plan",
            value:
              "Un `destroy` ou un remplacement massif passé inaperçu. Règle : aucun `apply` sans lecture du résumé (add/change/destroy) — en production, via fichier de plan relu.",
          },
          {
            label: "Ressources créées à la main",
            value:
              "La console cloud contourne Terraform : dérive garantie. Réponse : `import` puis interdiction processuelle des changements manuels.",
          },
          {
            label: "State local en équipe",
            value:
              "Deux applies simultanés, states divergents, ressources orphelines. Backend distant dès le deuxième contributeur.",
          },
          {
            label: "Variables sensibles en clair",
            value:
              "Secrets dans `terraform.tfvars` commité ou dans les outputs non `sensitive`. Le state les contient de toute façon : accès restreint obligatoire.",
          },
          {
            label: "count sur des listes ordonnées",
            value:
              "Supprimer un élément au milieu décale les index et recrée tout. Préférer `for_each` sur des clés stables.",
          },
          {
            label: "Dépendances implicites manquées",
            value:
              "Deux ressources sans référence entre elles mais ordonnées en réalité (ex. rôle IAM puis instance). `depends_on` explicite, ou mieux : une vraie référence.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro:
      "La checklist d'un usage professionnel de Terraform.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un dossier = un périmètre = un state : découper par environnement et par domaine.",
          "Backend distant + verrouillage dès qu'on est deux.",
          "Versions figées : `required_version`, contraintes de providers, lockfile commité.",
          "`plan` relu avant chaque `apply` ; fichier de plan en CI/CD.",
          "`fmt` automatique (pre-commit ou CI) ; `validate` systématique.",
          "Secrets hors Git ; state chiffré à accès restreint.",
          "Modules pour factoriser, pas pour tout abstraire — un module doit rester compréhensible.",
          "Drift detection planifiée ; zéro changement manuel en production.",
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
          { label: "Documentation", value: "developer.hashicorp.com/terraform/docs : guides, référence HCL, documentation de chaque provider." },
          { label: "Registry", value: "registry.terraform.io : providers et modules, avec exemples et versions." },
          { label: "Tutoriels", value: "Les tutoriels officiels HashiCorp : parcours guidés par cas d'usage." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : détruire et recréer son labo — la reproductibilité se prouve en reconstruisant.",
          "Communauté : les modules open source comme lecture — les bons comme les mauvais apprennent.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Terraform maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir le cloud : certification ou pratique avancée d'AWS, Azure ou GCP.",
          "Conteneuriser : Docker puis Kubernetes — l'IaC y prend une autre dimension.",
          "Automatiser : CI/CD (pipelines de déploiement) et Ansible pour la configuration.",
          "Industrialiser : DevOps et MLOps — l'infrastructure au service des produits.",
          "Revenir à la roadmap : valider Terraform et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

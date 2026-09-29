import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de la sécurité du cloud : IAM, posture, conteneurs,
 * journalisation, Zero Trust. Posture strictement DÉFENSIVE : auditer et
 * durcir ses propres environnements cloud (comptes de test, free tiers),
 * jamais ceux d'autrui. 3 niveaux d'information (Aperçu / Pratique /
 * Approfondi) avec divulgation progressive. Tous les textes supportent le
 * code inline entre backticks.
 */
export const LEARNING_CLOUD_SECURITY: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce que sécuriser le cloud veut dire : des identités et des configurations, pas des serveurs.",
    blocks: [
      {
        kind: "text",
        text: "La sécurité du cloud protège des infrastructures pilotées par API, éphémères et partagées : machines qui naissent et meurent en minutes, stockage objet, fonctions serverless, conteneurs. Il n'y a plus de « salle serveur » à verrouiller : le périmètre est devenu l'identité (qui peut faire quoi) et la configuration (qu'est-ce qui est exposé).",
      },
      {
        kind: "text",
        text: "Contrôler les identités (IAM), verrouiller les configurations et surveiller les appels d'API sur des infrastructures que l'on ne possède pas physiquement.",
      },
      {
        kind: "text",
        text: "La majorité des fuites de données dans le cloud viennent de mauvaises configurations — bucket de stockage public, clé d'accès exposée, rôle trop permissif — pas de failles techniques sophistiquées. Ce sont des erreurs humaines, donc évitables.",
      },
      {
        kind: "fields",
        title: "La sécurité cloud : l'essentiel",
        fields: [          {
            label: "Quand s'en préoccuper",
            value:
              "Dès le premier compte cloud : créer un utilisateur admin avec clé d'accès permanente et tout laisser par défaut, c'est déjà une faille. La sécurité cloud commence à la création du compte.",
          },
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni du piratage, ni de la magie : c'est de la rigueur opérationnelle (moindre privilège, revues de configuration, journaux). Et cela ne concerne que vos propres comptes et environnements de test.",
          },
        ],
      },
      {
        kind: "text",
        text: "Point essentiel : cette page adopte une posture strictement défensive. Vous apprendrez à auditer et durcir vos propres comptes cloud (compte personnel, free tier, organisation de test) — jamais à sonder ou exploiter l'infrastructure d'autrui, ce qui est illégal.",
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : la responsabilité partagée",
    level: 1,
    intro:
      "La seule idée à retenir : le fournisseur sécurise le cloud, vous sécurisez ce que vous y mettez.",
    blocks: [
      {
        kind: "diagram",
        title: "Le modèle de responsabilité partagée",
        lines: [
          "┌─────────────────────────────────────────────┐",
          "│  FOURNISSEUR (AWS, Azure, GCP)               │",
          "│  Sécurité DU cloud :                         │",
          "│  bâtiments, hyperviseurs, réseau physique,   │",
          "│  correctifs de l'infrastructure              │",
          "├─────────────────────────────────────────────┤",
          "│  CLIENT (vous)                               │",
          "│  Sécurité DANS le cloud :                    │",
          "│  identités et accès (IAM), configurations,   │",
          "│  données, chiffrement, applications, logs    │",
          "└─────────────────────────────────────────────┘",
          "  La ligne bouge selon le service :",
          "  IaaS (VM) → vous gérez presque tout",
          "  PaaS → le fournisseur gère l'OS",
          "  SaaS → vous ne gérez que les comptes et les données",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : plus le service est managé, moins vous avez de surface à sécuriser — mais l'IAM et les données restent toujours de votre responsabilité. Pourquoi ça existe : clarifier qui est fautif quand ça fuit. Un bucket S3 public n'est jamais « la faute d'AWS » : la configuration, c'est vous. Quand l'appliquer : à chaque nouveau service, demandez-vous « qu'est-ce que je dois encore sécuriser moi-même ici ? ».",
      },
      {
        kind: "fields",
        title: "Les trois questions du défenseur cloud",
        fields: [
          {
            label: "Qui peut faire quoi ?",
            value:
              "L'IAM est le pare-feu du cloud : chaque identité (humain, application, service) ne reçoit que les droits strictement nécessaires — le moindre privilège.",
          },
          {
            label: "Qu'est-ce qui est exposé ?",
            value:
              "Inventaire permanent : stockages publics, ports ouverts, clés d'accès actives. La dérive de configuration est l'ennemi n°1.",
          },
          {
            label: "Qui a fait quoi, quand ?",
            value:
              "Les journaux d'appels d'API (CloudTrail, Activity Log) sont la caméra de surveillance : sans eux, impossible de savoir ce qui s'est passé.",
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
          "Bases de Linux en ligne de commande : terminal, variables d'environnement, fichiers de configuration.",
          "Notions de réseaux : adresses IP, ports, ce qu'est un pare-feu.",
          "Avoir un compte cloud personnel ou de test (free tier AWS, Azure ou GCP) — c'est votre terrain d'exercice.",
          "Aucune expérience en sécurité cloud n'est requise : l'hygiène IAM vient en premier.",
        ],
      },
      {
        kind: "text",
        text: "Si le cloud vous est encore étranger, commencez par la Learning Page Cloud/DevOps de Pathway : cette page suppose que vous savez créer une ressource (VM, bucket) dans une console.",
      },
    ],
  },
  {
    id: "installation-outils",
    title: "Installer les outils d'audit",
    level: 2,
    intro:
      "La trousse du défenseur cloud : une CLI, un scanner de posture, de quoi lire les journaux.",
    blocks: [
      {
        kind: "command",
        label: "Installer la CLI AWS (v2)",
        command: "curl \"https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip\" -o \"awscliv2.zip\" && unzip awscliv2.zip && sudo ./aws/install",
        why: "La CLI AWS est l'outil d'audit n°1 : elle interroge l'API du compte (IAM, S3, CloudTrail) pour vérifier les configurations sans passer par la console.",
        verify: "aws --version",
      },
      {
        kind: "command",
        label: "Installer Prowler (scanner de posture)",
        command: "pip install prowler",
        why: "Prowler est un scanner de posture cloud open source : il exécute des centaines de contrôles (CIS Benchmarks) contre votre compte et signale les mauvaises configurations.",
        verify: "prowler --version",
      },
      {
        kind: "command",
        label: "Vérifier jq (lecture des journaux JSON)",
        command: "jq --version",
        why: "Les journaux cloud sont du JSON : `jq` permet de les filtrer et de les lire en ligne de commande, c'est l'outil d'analyse de base.",
      },
      {
        kind: "fields",
        title: "La trousse minimale",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Installez ces outils sur votre machine personnelle, jamais sur une machine de production : l'audit se fait depuis l'extérieur, avec des droits en lecture seule.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Télécharger des « scanners cloud » obscurs trouvés sur un forum : restez sur les outils maintenus et reconnus (CLI officielles, Prowler, ScoutSuite).",
          },
        ],
      },
    ],
  },
  {
    id: "configuration-cli",
    title: "Configurer l'accès en lecture seule",
    level: 2,
    intro:
      "Auditer sans pouvoir casser : un profil dédié, des droits limités, aucune clé en dur.",
    blocks: [
      {
        kind: "command",
        label: "Configurer un profil nommé",
        command: "aws configure --profile audit",
        why: "Un profil nommé sépare les identifiants d'audit des autres usages : on sait toujours avec quels droits on travaille (`--profile audit` à chaque commande).",
        verify: "aws sts get-caller-identity --profile audit",
      },
      {
        kind: "text",
        text: "En une phrase : créez dans la console un utilisateur IAM dédié à l'audit, attachez-lui uniquement la politique managée `SecurityAudit` (lecture seule sur presque tout), et utilisez ses clés uniquement via ce profil. Pourquoi : si vos clés fuient (commit accidentel, vol de laptop), l'attaquant ne peut que lire — pas créer de ressources ni exfiltrer de données. Quand : avant le premier scan, toujours.",
      },
      {
        kind: "fields",
        title: "Hygiène des clés d'accès",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Jamais de clé dans le code, le repo ou un script partagé : variables d'environnement ou gestionnaire de secrets. Rotation régulière, suppression des clés inutilisées.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Utiliser la clé du compte root ou d'un admin pour « aller plus vite » : en cas de fuite, c'est le contrôle total du compte qui part.",
          },
        ],
      },
    ],
  },
  {
    id: "premier-audit-iam",
    title: "Votre premier audit : l'IAM en 15 minutes",
    level: 2,
    intro:
      "Six vérifications qui révèlent l'état de santé d'un compte cloud.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Vérifier l'identité utilisée",
            detail:
              "`aws sts get-caller-identity --profile audit` : savoir qui vous êtes avant d'auditer, pour interpréter les résultats avec les bons droits.",
          },
          {
            title: "Lister les utilisateurs et leurs clés",
            detail:
              "`aws iam list-users` puis, par utilisateur, `aws iam list-access-keys --user-name NOM` : chaque clé active est une porte d'entrée potentielle.",
          },
          {
            title: "Repérer les clés anciennes",
            detail:
              "Dans la sortie précédente, regardez `CreateDate` : une clé de plus de 90 jours sans rotation est un finding classique.",
          },
          {
            title: "Vérifier le MFA du root",
            detail:
              "`aws iam get-account-summary` : le champ `AccountMFAEnabled` doit valoir 1. Un compte root sans MFA est une urgence.",
          },
          {
            title: "Lister les politiques attachées aux utilisateurs",
            detail:
              "`aws iam list-attached-user-policies --user-name NOM` : repérez `AdministratorAccess` attaché à un humain — c'est le premier candidat au moindre privilège.",
          },
          {
            title: "Lancer Prowler sur l'IAM",
            detail:
              "`prowler aws --profile audit -c iam` : le scanner confirme et complète vos observations manuelles avec des contrôles standardisés.",
          },
        ],
      },
      {
        kind: "text",
        text: "Ce mini-audit ne couvre que l'IAM, mais l'IAM est le périmètre n°1 : la plupart des compromissions cloud commencent par une identité trop permissive ou une clé volée. Le niveau 3 détaille chaque contrôle.",
      },
    ],
  },
  {
    id: "iam-fondamentaux",
    title: "IAM : les fondamentaux",
    level: 2,
    intro:
      "Utilisateurs, rôles, politiques : le vocabulaire sans lequel rien ne se comprend.",
    blocks: [
      {
        kind: "fields",
        title: "Les briques de l'IAM",
        fields: [
          {
            label: "Utilisateur",
            value:
              "Une identité humaine (ou technique) avec des identifiants long terme. À réserver aux humains ; les applications doivent utiliser des rôles.",
          },
          {
            label: "Rôle",
            value:
              "Une identité sans identifiants permanents, assumée temporairement (une VM, une fonction Lambda, un humain via fédération). Le mécanisme sûr par défaut.",
          },
          {
            label: "Politique",
            value:
              "Un document JSON qui dit qui peut faire quelle action sur quelle ressource. C'est là que vit le moindre privilège — ou son absence.",
          },
          {
            label: "Groupe",
            value:
              "Un conteneur d'utilisateurs pour attacher des politiques en une fois. On gère des groupes, pas des individus.",
          },
        ],
      },
      {
        kind: "text",
        text: "En une phrase : une requête cloud est autorisée si au moins une politique le permet et qu'aucune ne l'interdit explicitement (`Deny` explicite gagne toujours). Pourquoi c'est important : comprendre cette logique d'évaluation, c'est pouvoir prédire — puis corriger — qui a accès à quoi. Erreur fréquente : empiler les `Allow` sans jamais écrire de `Deny` garde-fou.",
      },
    ],
  },
  {
    id: "stockage-objet",
    title: "Stockage objet : ne jamais exposer par défaut",
    level: 2,
    intro:
      "Le bucket public : la fuite de données la plus bête et la plus fréquente du cloud.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : un bucket de stockage objet (S3, Blob Storage, Cloud Storage) mal configuré devient lisible — voire modifiable — par tout Internet, et les robots scannent en permanence les buckets exposés. Pourquoi : une case « public » cochée pour un test, une politique trop large, et des sauvegardes ou données clients sont indexées. La défense : blocage de l'accès public au niveau du compte, chiffrement par défaut, journalisation d'accès.",
      },
      {
        kind: "command",
        label: "Vérifier le blocage d'accès public (niveau compte)",
        command: "aws s3control get-public-access-block --account-id 123456789012 --profile audit",
        why: "Le blocage d'accès public au niveau du compte est le garde-fou global : même si un bucket est mal configuré individuellement, il reste privé.",
        verify: "Les quatre champs (`BlockPublicAcls`, `IgnorePublicAcls`, `BlockPublicPolicy`, `RestrictPublicBuckets`) doivent valoir `true`.",
      },
      {
        kind: "command",
        label: "Lister les buckets et leur politique",
        command: "aws s3api list-buckets --profile audit --query \"Buckets[].Name\"",
        why: "L'inventaire d'abord : on ne protège que ce qu'on connaît. Chaque bucket listé doit ensuite être vérifié individuellement (`get-bucket-policy`, `get-bucket-acl`).",
      },
      {
        kind: "fields",
        title: "Règles d'or du stockage",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Privé par défaut, chiffrement activé, versioning pour les données critiques, journalisation des accès. L'accès public n'existe que pour du contenu volontairement public (site statique), via CDN de préférence.",
          },
          {
            label: "Erreur fréquente",
            value:
              "« C'est temporaire, je remettrai en privé après le test. » Les scanners trouvent les buckets publics en quelques heures, parfois minutes.",
          },
        ],
      },
    ],
  },
  {
    id: "journalisation",
    title: "Journalisation : CloudTrail et l'audit trail",
    level: 2,
    intro:
      "Sans journaux, un incident cloud est une devinette : qui a fait quoi, quand ?",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : CloudTrail (AWS), Activity Log (Azure), Cloud Audit Logs (GCP) enregistrent chaque appel d'API — création de ressource, changement de politique, connexion à la console. Pourquoi : c'est la seule source de vérité après un incident (clé utilisée à 3h du matin ? politique modifiée par qui ?). Quand : activé dès la création du compte, avec stockage des logs dans un compte ou un bucket séparé, verrouillé.",
      },
      {
        kind: "command",
        label: "Vérifier que CloudTrail est actif",
        command: "aws cloudtrail describe-trails --profile audit --query \"trailList[].{Nom:Name,MultiRegion:IsMultiRegionTrail,Logging:Name}\"",
        why: "Un trail multi-régions avec journalisation active garantit qu'aucune région n'échappe à l'enregistrement — un attaquant ne peut pas agir « hors radar ».",
      },
      {
        kind: "command",
        label: "Chercher les appels récents d'un utilisateur",
        command: "aws cloudtrail lookup-events --profile audit --lookup-attributes AttributeKey=Username,AttributeValue=alice --max-items 10",
        why: "`lookup-events` interroge l'historique des 90 derniers jours : c'est le premier réflexe d'investigation (« qu'a fait ce compte récemment ? »).",
      },
      {
        kind: "fields",
        title: "Protéger les journaux eux-mêmes",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Bucket de logs dédié, chiffrement, suppression interdite (verrouillage d'objet / rétention), alertes sur toute tentative de désactivation du trail.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Logger dans le même compte avec les mêmes droits : un attaquant qui compromet un admin supprime les traces en premier.",
          },
        ],
      },
    ],
  },
  {
    id: "environnement-travail",
    title: "Organiser son environnement de travail",
    level: 2,
    intro:
      "Comptes, régions, tags : l'ordre avant la sécurité.",
    blocks: [
      {
        kind: "list",
        items: [
          "Séparer les environnements : un compte (ou abonnement/projet) par usage — production, staging, labo/sandbox. Jamais de tests dans le compte de production.",
          "Limiter les régions actives : désactivez celles que vous n'utilisez pas, les ressources oubliées dans une région lointaine sont invisibles aux revues.",
          "Taguer systématiquement : `env`, `owner`, `projet` sur chaque ressource — l'inventaire et l'attribution des coûts en dépendent.",
          "Verrouiller le compte root : MFA obligatoire, aucune clé d'accès root, aucune utilisation quotidienne.",
          "Documenter : un simple fichier qui dit « ce compte sert à X, administré par Y » vaut mieux qu'un compte mystère.",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : un environnement cloud propre (comptes séparés, régions limitées, ressources taguées) rend l'audit possible ; un environnement en vrac le rend illusoire. Erreur fréquente : tout mettre dans un seul compte « pour simplifier » — c'est aussi tout exposer d'un coup en cas de compromission d'une identité.",
      },
    ],
  },
  {
    id: "flux-professionnel",
    title: "Le flux professionnel : auditer en continu",
    level: 2,
    intro:
      "La posture cloud se dégrade toute seule : le métier, c'est la vérification régulière.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Scanner régulièrement",
            detail:
              "Lancez Prowler (ou l'équivalent) au moins mensuellement sur vos comptes de test, et comparez avec le run précédent : tout nouveau finding est une régression à traiter.",
          },
          {
            title: "Revoir les accès",
            detail:
              "Trimestriellement : lister les utilisateurs, rôles et clés ; supprimer ce qui ne sert plus ; vérifier que personne n'a accumulé des droits temporaires devenus permanents.",
          },
          {
            title: "Surveiller les journaux",
            detail:
              "Même sans SIEM, un coup d'œil régulier aux événements CloudTrail inhabituels (appels à des heures étranges, nouvelles régions, changements IAM) suffit à petite échelle.",
          },
          {
            title: "Corriger puis revérifier",
            detail:
              "Chaque correction (politique resserrée, bucket privatisé) est suivie d'un re-scan : une correction non vérifiée est une hypothèse.",
          },
          {
            title: "Documenter les exceptions",
            detail:
              "Un accès large justifié (migration, urgence) est noté avec une date de fin et un responsable — sinon il devient permanent par oubli.",
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
      "Les fautes qui reviennent dans presque tous les audits de comptes.",
    blocks: [
      {
        kind: "fields",
        title: "Le top des mauvaises configurations",
        fields: [
          {
            label: "Clés d'accès dans le code",
            value:
              "Problème : une clé AWS committée sur GitHub est exploitée en minutes par des robots. Pourquoi : praticité à court terme. Mieux : variables d'environnement, rôles, gestionnaire de secrets — jamais en dur.",
          },
          {
            label: "Politiques en wildcard",
            value:
              "Problème : `Action: \"*\"` sur `Resource: \"*\"` = administrateur déguisé. Pourquoi : copié-collé d'un exemple. Mieux : lister explicitement les actions et ressources nécessaires.",
          },
          {
            label: "Bucket public oublié",
            value:
              "Problème : données exposées à tout Internet. Pourquoi : test « temporaire ». Mieux : blocage public au niveau du compte + revue régulière.",
          },
          {
            label: "Pas de MFA sur les humains",
            value:
              "Problème : un mot de passe volé suffit à prendre le compte. Pourquoi : « c'est contraignant ». Mieux : MFA obligatoire par politique pour tout accès console.",
          },
          {
            label: "Logs désactivés ou locaux",
            value:
              "Problème : incident invisible, aucune preuve. Pourquoi : coût ou oubli. Mieux : trail multi-régions vers un bucket verrouillé dès le jour 1.",
          },
          {
            label: "Compte root utilisé au quotidien",
            value:
              "Problème : aucune traçabilité fine, droits illimités. Pourquoi : c'est le premier compte créé. Mieux : root verrouillé + MFA, travail via utilisateurs et rôles.",
          },
        ],
      },
    ],
  },
  {
    id: "mini-projet",
    title: "Mini-projet : audit guidé d'un compte de test",
    level: 2,
    intro:
      "Mettre bout à bout les sections précédentes sur votre propre compte.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Préparer",
            detail:
              "Compte de test à vous, profil CLI `audit` en lecture seule (`SecurityAudit`), un dossier pour les rapports.",
          },
          {
            title: "Inventaire",
            detail:
              "Lister utilisateurs, rôles, buckets, instances : `aws iam list-users`, `aws s3api list-buckets`, `aws ec2 describe-instances`. Noter tout ce que vous ne reconnaissez pas.",
          },
          {
            title: "Scanner",
            detail:
              "`prowler aws --profile audit` : laisser tourner, exporter le rapport (HTML/CSV).",
          },
          {
            title: "Trier",
            detail:
              "Classer les findings : critiques (MFA root, bucket public, clés anciennes), importants (wildcards, logs), informatifs.",
          },
          {
            title: "Corriger un finding",
            detail:
              "Choisir UN finding critique, le corriger dans la console (ex. activer le blocage public S3), puis re-scanner pour vérifier.",
          },
          {
            title: "Rédiger",
            detail:
              "Une page : périmètre, méthode, findings classés, correction appliquée, reste à faire. C'est déjà un mini-rapport d'audit.",
          },
        ],
      },
      {
        kind: "text",
        text: "Concepts liés : le niveau 3 approfondit chaque contrôle (IAM avancé, réseau, conteneurs, détection) et ajoute la policy as code.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "iam-politiques",
    title: "IAM approfondi : lire et écrire des politiques",
    level: 3,
    intro:
      "Le JSON qui décide de tout : comprendre chaque champ d'une politique.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "Anatomie d'une politique (exemple sain)",
        code: "{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Sid\": \"LectureSeuleRapports\",\n      \"Effect\": \"Allow\",\n      \"Action\": [\"s3:GetObject\", \"s3:ListBucket\"],\n      \"Resource\": [\n        \"arn:aws:s3:::rapports-mensuels\",\n        \"arn:aws:s3:::rapports-mensuels/*\"\n      ],\n      \"Condition\": { \"Bool\": { \"aws:MultiFactorAuthPresent\": \"true\" } }\n    }\n  ]\n}",
      },
      {
        kind: "fields",
        title: "Lire une politique comme un auditeur",
        fields: [
          {
            label: "Effect",
            value:
              "`Allow` autorise, `Deny` interdit — et un `Deny` explicite l'emporte toujours, même face à dix `Allow`. Les garde-fous s'écrivent en `Deny`.",
          },
          {
            label: "Action / Resource",
            value:
              "Plus c'est précis, mieux c'est : `s3:GetObject` sur un bucket nommé vaut infiniment mieux que `s3:*` sur `*`. Le wildcard est le premier signal d'alerte.",
          },
          {
            label: "Condition",
            value:
              "Le raffinement : exiger le MFA, restreindre à une plage d'IP, à une plage horaire. Une politique sans condition est une politique large.",
          },
          {
            label: "NotAction / NotResource",
            value:
              "À éviter : « tout sauf X » est fragile, X évolue et la politique ne suit pas. Préférez l'énumération positive.",
          },
        ],
      },
      {
        kind: "command",
        label: "Simuler une politique avant de l'appliquer",
        command: "aws iam simulate-principal-policy --profile audit --policy-source-arn arn:aws:iam::123456789012:user/alice --action-names s3:GetObject --resource-arns arn:aws:s3:::rapports-mensuels/fichier.pdf",
        why: "Le simulateur répond « allowed/denied » sans rien exécuter : on vérifie l'effet réel d'une politique (Allow + Deny + conditions) avant de la déployer.",
      },
    ],
  },
  {
    id: "mfa-cles",
    title: "MFA et cycle de vie des clés",
    level: 3,
    intro:
      "Le mot de passe seul ne suffit plus : durcir l'authentification humaine et technique.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : toute identité humaine doit avoir le MFA, et toute clé d'accès doit avoir une durée de vie limitée avec rotation planifiée. Pourquoi : les clés volées (phishing, fuite de repo, malware) sont la première cause de compromission cloud ; le MFA bloque l'usage d'identifiants volés, la rotation limite la fenêtre d'exploitation d'une clé.",
      },
      {
        kind: "command",
        label: "Lister les clés et leur âge",
        command: "aws iam list-access-keys --profile audit --user-name alice --query \"AccessKeyMetadata[].[AccessKeyId,Status,CreateDate]\" --output table",
        why: "L'âge d'une clé (`CreateDate`) est un indicateur direct : au-delà de 90 jours sans rotation, c'est un finding d'audit standard.",
      },
      {
        kind: "command",
        label: "Désactiver une clé suspecte (sans la supprimer)",
        command: "aws iam update-access-key --profile audit --access-key-id AKIAIOSFODNN7EXAMPLE --status Inactive --user-name alice",
        why: "En cas de soupçon de fuite, on DÉSACTIVE d'abord (effet immédiat, réversible) : la suppression vient après vérification que rien de légitime ne l'utilisait.",
        verify: "Relistez les clés : le statut doit être `Inactive`.",
      },
      {
        kind: "fields",
        title: "Règles de gestion",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "MFA matériel ou application pour les humains, aucune clé permanente pour les applications (rôles + identifiants temporaires), rotation ≤ 90 jours, suppression immédiate des clés des départs.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Créer une clé « pour un script » et l'oublier pendant deux ans : chaque clé dormante est une porte dont on a perdu la clé.",
          },
        ],
      },
    ],
  },
  {
    id: "organisations-scp",
    title: "Organisations et garde-fous (SCP)",
    level: 3,
    intro:
      "Limiter ce qui est possible avant même de parler de qui a le droit.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : dans AWS Organizations, les Service Control Policies (SCP) définissent le périmètre maximal autorisé pour tout un compte — même un administrateur du compte ne peut pas dépasser ce que la SCP interdit. Pourquoi : c'est la ceinture de sécurité organisationnelle (interdire certaines régions, interdire de désactiver CloudTrail, interdire de rendre un bucket public), indépendante des politiques IAM internes au compte.",
      },
      {
        kind: "diagram",
        title: "Les trois couches d'autorisation",
        lines: [
          "Requête autorisée si et seulement si :",
          "",
          "  1. SCP (organisation) : ne l'interdit pas",
          "        ET",
          "  2. Politique IAM (compte) : l'autorise",
          "        ET",
          "  3. Politique de ressource : ne l'interdit pas",
          "",
          "Le Deny à n'importe quel niveau bloque tout.",
        ],
      },
      {
        kind: "fields",
        title: "SCP utiles en pratique",
        fields: [
          {
            label: "Interdire la désactivation des logs",
            value:
              "Une SCP qui bloque `cloudtrail:StopLogging` et `DeleteTrail` : même un compte compromis ne peut pas effacer ses traces.",
          },
          {
            label: "Restreindre les régions",
            value:
              "N'autoriser que les régions utilisées : les ressources créées ailleurs sont impossibles, donc la surface d'oubli disparaît.",
          },
          {
            label: "Exiger le chiffrement",
            value:
              "Bloquer la création de buckets ou disques non chiffrés : la conformité devient structurelle, pas disciplinaire.",
          },
        ],
      },
    ],
  },
  {
    id: "reseau-vpc",
    title: "Réseau : VPC et groupes de sécurité",
    level: 3,
    intro:
      "Le pare-feu du cloud : qui peut joindre quoi, à l'intérieur comme depuis Internet.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : un VPC est votre réseau virtuel isolé, les groupes de sécurité sont des pare-feu attachés aux ressources (étatiques : le retour est autorisé automatiquement), les NACL des pare-feu de sous-réseau (non étatiques). Pourquoi : une base de données dans un sous-réseau privé, sans IP publique et avec un groupe de sécurité qui n'accepte que l'application, est inatteignable depuis Internet même si quelqu'un connaît son adresse.",
      },
      {
        kind: "command",
        label: "Repérer les groupes de sécurité trop ouverts",
        command: "aws ec2 describe-security-groups --profile audit --query \"SecurityGroups[?IpPermissions[?IpRanges[?CidrIp=='0.0.0.0/0']]].{Nom:GroupName,Id:GroupId}\" --output table",
        why: "Cette requête filtre les groupes qui autorisent `0.0.0.0/0` (le monde entier) : chacun doit être justifié (80/443 publics) ou resserré.",
      },
      {
        kind: "fields",
        title: "Architecture réseau défensive",
        fields: [
          {
            label: "Segmentation",
            value:
              "Sous-réseaux publics (bastion, load balancer) vs privés (applications, bases) ; les bases ne voient jamais Internet directement.",
          },
          {
            label: "Moindre exposition",
            value:
              "SSH/RDP jamais ouverts au monde : VPN ou bastion à IP restreinte. Les ports d'administration publics sont scannés en permanence.",
          },
          {
            label: "Egress contrôlé",
            value:
              "Limiter aussi le trafic sortant des ressources sensibles : une base compromise ne doit pas pouvoir exfiltrer librement.",
          },
        ],
      },
    ],
  },
  {
    id: "chiffrement-kms",
    title: "Chiffrement et gestion des clés (KMS)",
    level: 3,
    intro:
      "Chiffrer ne suffit pas : il faut gérer qui peut déchiffrer.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : le chiffrement au repos (disques, buckets, bases) et en transit (TLS) est la base ; KMS (ou équivalent) centralise les clés avec des politiques d'accès, de la rotation et de la traçabilité. Pourquoi : un disque chiffré avec une clé que tout le monde peut utiliser n'est pas vraiment chiffré. La sécurité du chiffrement vit dans la gestion des clés, pas dans l'algorithme.",
      },
      {
        kind: "fields",
        title: "Les bonnes pratiques de chiffrement cloud",
        fields: [
          {
            label: "Chiffrement par défaut",
            value:
              "Activer le chiffrement par défaut sur S3, EBS, RDS : chaque nouvelle ressource naît chiffrée, sans y penser.",
          },
          {
            label: "Clés gérées par le client (CMK)",
            value:
              "Pour les données sensibles, utilisez vos propres clés KMS plutôt que celles du fournisseur : vous contrôlez les politiques d'accès et la rotation.",
          },
          {
            label: "Séparation des droits",
            value:
              "Celui qui administre les données ne doit pas forcément administrer les clés : la politique de la clé KMS est un contrôle indépendant.",
          },
          {
            label: "TLS partout",
            value:
              "Forcer HTTPS (politiques de bucket qui refusent le HTTP, `aws:SecureTransport`), versions TLS récentes uniquement.",
          },
        ],
      },
    ],
  },
  {
    id: "conteneurs-durcissement",
    title: "Sécurité des conteneurs : durcir les images",
    level: 3,
    intro:
      "Un conteneur n'est pas une VM : sa sécurité se joue à la construction de l'image.",
    blocks: [
      {
        kind: "list",
        items: [
          "Images minimales : partez de `distroless` ou `alpine` plutôt que d'images complètes — moins de paquets = moins de CVE.",
          "Utilisateur non-root : `USER nobody` dans le Dockerfile ; un processus root dans un conteneur mal configuré peut s'échapper.",
          "Pas de secrets dans l'image : ni `ENV` avec mot de passe, ni clé copiée — montage au runtime depuis le gestionnaire de secrets.",
          "Scanner les images : `docker scout` ou Trivy (open source) avant chaque push au registre ; bloquer les CVE critiques en CI.",
          "Épingler les versions : `image:1.2.3` plutôt que `latest` — reproductibilité et traçabilité.",
          "Registre privé avec politiques : n'autoriser que les images scannées et signées.",
        ],
      },
      {
        kind: "command",
        label: "Scanner une image avec Trivy",
        command: "trivy image mon-registre/mon-app:1.2.3",
        why: "Trivy (open source, Aqua Security) liste les CVE connues dans l'image et ses dépendances : c'est le `npm audit` des conteneurs, à lancer avant chaque déploiement.",
      },
      {
        kind: "fields",
        title: "Erreur classique",
        fields: [
          {
            label: "Erreur",
            value:
              "Construire sur une image `latest` jamais mise à jour, en root, avec la clé d'API en variable d'environnement.",
          },
          {
            label: "Bonne pratique",
            value:
              "Image minimale épinglée, utilisateur non-root, secrets montés au runtime, scan en CI qui bloque les CVE critiques.",
          },
        ],
      },
    ],
  },
  {
    id: "kubernetes-rbac",
    title: "Kubernetes : RBAC et durcissement du cluster",
    level: 3,
    intro:
      "Qui peut faire quoi DANS le cluster : le RBAC est l'IAM de Kubernetes.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : le RBAC Kubernetes associe des rôles (lecture de pods, écriture de déploiements…) à des identités (utilisateurs, service accounts) dans un namespace ou tout le cluster. Pourquoi : un service account avec droits cluster-admin compromis = contrôle total du cluster ; le moindre privilège s'applique ici comme dans l'IAM cloud.",
      },
      {
        kind: "command",
        label: "Lister les liaisons de rôles d'un namespace",
        command: "kubectl get rolebindings,clusterrolebindings -A -o wide",
        why: "L'inventaire des liaisons révèle les excès : un `cluster-admin` lié à un service account applicatif est un finding majeur.",
      },
      {
        kind: "fields",
        title: "Durcissement du cluster",
        fields: [
          {
            label: "RBAC minimal",
            value:
              "Chaque application a son service account avec uniquement les droits nécessaires ; jamais de `default` avec des privilèges.",
          },
          {
            label: "NetworkPolicies",
            value:
              "Par défaut, tout pod peut joindre tout pod : les NetworkPolicies segmentent le trafic inter-pods (qui parle à la base ?).",
          },
          {
            label: "Pod Security",
            value:
              "Interdire le root, l'escalade de privilèges (`allowPrivilegeEscalation: false`), les volumes sensibles d'hôte.",
          },
          {
            label: "Secrets",
            value:
              "Les Secrets Kubernetes sont en base64, pas chiffrés par défaut : chiffrement au repos (KMS) et gestionnaire externe pour le sensible.",
          },
        ],
      },
    ],
  },
  {
    id: "cspm-prowler",
    title: "CSPM : scanner sa posture en continu",
    level: 3,
    intro:
      "De l'audit ponctuel à la surveillance continue : la posture se dégrade, le scanner veille.",
    blocks: [
      {
        kind: "command",
        label: "Lancer un scan Prowler complet",
        command: "prowler aws --profile audit",
        why: "Le scan complet exécute des centaines de contrôles alignés sur les benchmarks CIS : c'est la photographie de référence de votre posture.",
      },
      {
        kind: "command",
        label: "Scanner uniquement la criticité haute",
        command: "prowler aws --profile audit --severity critical high",
        why: "Filtrer par sévérité pour le triage quotidien : on traite d'abord ce qui est exploitable, on planifie le reste.",
      },
      {
        kind: "command",
        label: "Exporter le rapport en HTML",
        command: "prowler aws --profile audit -o rapport-audit",
        why: "L'export HTML/CSV produit un livrable partageable : findings classés, ressources concernées, remédiation suggérée — la base du rapport d'audit.",
      },
      {
        kind: "fields",
        title: "Industrialiser",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Exécuter le scan sur schedule (quotidien/hebdo), stocker les rapports versionnés, alerter sur les nouveaux findings critiques : la dérive de configuration est détectée en heures, pas en mois.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Scanner une fois, corriger, puis oublier : sans exécution régulière, la posture revient à son état initial en quelques semaines.",
          },
        ],
      },
    ],
  },
  {
    id: "policy-as-code",
    title: "Policy as Code : la conformité dans le pipeline",
    level: 3,
    intro:
      "Interdire la mauvaise configuration avant qu'elle n'existe : des règles versionnées, testées en CI.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : la Policy as Code (OPA/Conftest, Sentinel, Checkov) évalue les templates d'infrastructure (Terraform, CloudFormation) contre des règles de sécurité avant déploiement. Pourquoi : corriger une mauvaise configuration dans le code coûte cent fois moins cher qu'en production — et la règle, une fois écrite, s'applique à chaque déploiement, sans oubli humain.",
      },
      {
        kind: "code",
        language: "rego",
        title: "Règle OPA : interdire les buckets publics (exemple)",
        code: "package terraform.aws\n\n# Refuse tout bucket S3 avec ACL publique\ndeny[msg] {\n  rc := input.resource.aws_s3_bucket[_]\n  rc.acl == \"public-read\"\n  msg := sprintf(\"Bucket public interdit : %s\", [rc.name])\n}",
      },
      {
        kind: "command",
        label: "Tester un plan Terraform avec Conftest",
        command: "conftest test plan.json",
        why: "Conftest applique vos politiques OPA au plan Terraform : un `deny` bloque le pipeline avant même la création des ressources.",
      },
      {
        kind: "fields",
        title: "Mettre en place",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Commencer par 5-10 règles critiques (chiffrement, exposition publique, logs), en mode avertissement puis bloquant ; versionner les règles comme le code.",
          },
          {
            label: "Erreur fréquente",
            value:
              "200 règles bloquantes du jour au lendemain : les équipes contournent. Progressivité et pédagogie d'abord.",
          },
        ],
      },
    ],
  },
  {
    id: "detection-cloud",
    title: "Détection : surveiller les comportements anormaux",
    level: 3,
    intro:
      "L'audit dit ce qui est mal configuré ; la détection dit ce qui se passe en ce moment.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : les services de détection cloud (GuardDuty sur AWS, Defender for Cloud sur Azure, Security Command Center sur GCP) analysent en continu les logs, le trafic et les comportements pour signaler les anomalies — clé utilisée depuis un pays inhabituel, instance qui mine de la cryptomonnaie, bucket rendu public. Pourquoi : une bonne configuration n'empêche pas le vol d'identifiants ; seule la surveillance détecte l'usage anormal d'accès légitimes.",
      },
      {
        kind: "fields",
        title: "Signaux à surveiller en priorité",
        fields: [
          {
            label: "Anomalies IAM",
            value:
              "Connexions depuis des géographies inhabituelles, escalade de privilèges, création d'utilisateurs ou de clés hors processus.",
          },
          {
            label: "Exfiltration",
            value:
              "Volumes de lecture S3 anormaux, transferts vers des destinations externes inconnues.",
          },
          {
            label: "Crypto-mining",
            value:
              "Lancement d'instances coûteuses (GPU) dans des régions inhabituelles : le cas d'usage n°1 des comptes cloud compromis.",
          },
          {
            label: "Désactivation des défenses",
            value:
              "Arrêt de CloudTrail, suppression de règles d'alerte : le premier geste d'un attaquant qui veut agir discrètement.",
          },
        ],
      },
      {
        kind: "text",
        text: "Concepts liés : centraliser ces alertes dans le SIEM du SOC, définir un playbook de réponse (qui fait quoi quand GuardDuty alerte), et tester le tout en exercice.",
      },
    ],
  },
  {
    id: "secrets-cloud",
    title: "Gestion des secrets dans le cloud",
    level: 3,
    intro:
      "Ni dans le code, ni dans l'image, ni en variable en clair : les secrets ont un coffre.",
    blocks: [
      {
        kind: "fields",
        title: "La hiérarchie des solutions",
        fields: [
          {
            label: "Gestionnaire de secrets managé",
            value:
              "Secrets Manager / Key Vault / Secret Manager : chiffrement, rotation automatique, contrôle d'accès IAM fin, audit des lectures. Le choix par défaut pour les applications.",
          },
          {
            label: "Variables d'environnement (avec modération)",
            value:
              "Acceptable pour du non-critique en environnement contrôlé, mais visibles dans les dumps et les logs en cas d'erreur — jamais pour les secrets critiques.",
          },
          {
            label: "Interdit",
            value:
              "En dur dans le code, dans l'image Docker, dans le repo Git, dans un ticket ou un wiki. Chaque occurrence est un finding.",
          },
        ],
      },
      {
        kind: "command",
        label: "Créer un secret et vérifier son chiffrement",
        command: "aws secretsmanager create-secret --profile audit --name prod/db/password --secret-string '{\"user\":\"app\",\"pwd\":\"CHANGE-MOI\"}'",
        why: "Le gestionnaire chiffre le secret au repos (KMS), journalise chaque lecture dans CloudTrail et permet la rotation automatique — trois choses qu'une variable d'environnement ne fait pas.",
        verify: "aws secretsmanager describe-secret --profile audit --secret-id prod/db/password",
      },
      {
        kind: "text",
        text: "Erreur fréquente : stocker le secret dans le gestionnaire mais laisser l'ancienne copie dans le repo Git « au cas où ». Bonne pratique : rotation immédiate après migration, puis purge de l'historique exposé.",
      },
    ],
  },
  {
    id: "analyse-logs",
    title: "Analyser les journaux avec jq",
    level: 3,
    intro:
      "Lire CloudTrail comme un enquêteur : filtrer le bruit, garder le signal.",
    blocks: [
      {
        kind: "command",
        label: "Lister les actions IAM des dernières 24h",
        command: "aws cloudtrail lookup-events --profile audit --max-items 50 | jq -r '.Events[] | \"\\(.EventTime) \\(.Username) \\(.EventName)\"'",
        why: "`jq` transforme le JSON brut en lignes lisibles (heure, utilisateur, action) : c'est la lecture quotidienne des journaux, sans outil coûteux.",
      },
      {
        kind: "command",
        label: "Repérer les échecs d'accès (AccessDenied)",
        command: "aws cloudtrail lookup-events --profile audit --max-items 100 | jq -r '.Events[] | select(.CloudTrailEvent | contains(\"AccessDenied\")) | \"\\(.EventTime) \\(.Username) \\(.EventName)\"'",
        why: "Les `AccessDenied` répétés signalent soit une politique trop stricte (légitime), soit quelqu'un qui sonde les limites de ses droits (suspect) — dans les deux cas, à investiguer.",
      },
      {
        kind: "fields",
        title: "Méthode d'analyse",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Partir d'une hypothèse (« qui a touché à l'IAM cette semaine ? »), filtrer par utilisateur/action/période, élargir si besoin. L'analyse sans question se noie dans le volume.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Télécharger des gigaoctets de logs sans filtre : CloudTrail lookup couvre 90 jours, c'est largement suffisant pour commencer.",
          },
        ],
      },
    ],
  },
  {
    id: "zero-trust",
    title: "Zero Trust : ne faire confiance à aucun réseau",
    level: 3,
    intro:
      "Le modèle qui remplace le « château-fort » : chaque requête est vérifiée.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : le Zero Trust part du principe qu'aucun réseau n'est sûr par défaut — pas même le réseau interne : chaque accès est authentifié, autorisé au moindre privilège et chiffré, en continu. Pourquoi : le modèle périmétrique (« dedans = sûr ») s'effondre dès qu'un attaquant passe le pare-feu ou qu'un employé travaille depuis chez lui. Dans le cloud, où il n'y a pas de « dedans », c'est le modèle naturel.",
      },
      {
        kind: "list",
        items: [
          "Identité forte partout : MFA pour les humains, identités managées pour les charges de travail, pas de confiance implicite par IP.",
          "Micro-segmentation : chaque service n'accède qu'à ce dont il a besoin, même à l'intérieur du VPC.",
          "Moindre privilège dynamique : droits just-in-time (accès temporaire élevé, révoqué après usage) plutôt que permanents.",
          "Chiffrement de bout en bout : TLS même en interne, pas seulement vers Internet.",
          "Surveillance continue : chaque accès est journalisé et les anomalies détectées — la confiance se vérifie, elle ne se suppose pas.",
        ],
      },
      {
        kind: "text",
        text: "Concepts liés : au-delà du slogan, le Zero Trust se construit brique par brique — IAM strict, segmentation réseau, détection — exactement ce que couvrent les sections précédentes.",
      },
    ],
  },
  {
    id: "sauvegarde-dr",
    title: "Sauvegarde et reprise après sinistre",
    level: 3,
    intro:
      "Le cloud ne supprime pas le besoin de sauvegardes : il change leur forme.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : rançongiciel, suppression accidentelle, compromission de compte — sans sauvegardes testées et isolées, la restauration est impossible. Pourquoi : le cloud facilite la sauvegarde (snapshots, réplication inter-régions) mais aussi la destruction massive (une clé compromise peut tout effacer via API). La défense : sauvegardes automatiques, isolées (compte séparé, verrouillage d'objet contre la suppression), et testées.",
      },
      {
        kind: "fields",
        title: "Les piliers de la reprise",
        fields: [
          {
            label: "RPO / RTO",
            value:
              "RPO : quelle perte de données accepte-t-on (1h ? 24h ?) — détermine la fréquence des sauvegardes. RTO : en combien de temps le service doit-il repartir — détermine l'architecture (multi-région, infrastructure as code).",
          },
          {
            label: "Isolation",
            value:
              "Sauvegardes dans un compte séparé avec verrouillage (Object Lock) : même avec les clés du compte principal, l'attaquant ne peut pas les détruire.",
          },
          {
            label: "Test",
            value:
              "Une sauvegarde non restaurée n'est qu'une hypothèse : exercice de restauration régulier, chronométré contre le RTO.",
          },
          {
            label: "Infrastructure as Code",
            value:
              "L'environnement lui-même est versionné (Terraform) : on reconstruit vite, à l'identique, sans bricolage sous pression.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-iam",
    title: "Debugging : quand l'accès est refusé",
    level: 3,
    intro:
      "« AccessDenied » : diagnostiquer sans ouvrir en grand.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Lire le message exact",
            detail:
              "Le message `AccessDenied` contient souvent la raison (`explicit deny`, `no identity-based policy`) : il dit déjà quelle couche bloque.",
          },
          {
            title: "Vérifier l'identité réelle",
            detail:
              "`aws sts get-caller-identity` : on dépanne parfois avec le mauvais profil ou un rôle assumé inattendu.",
          },
          {
            title: "Simuler",
            detail:
              "`simulate-principal-policy` avec l'action et la ressource exactes : le simulateur indique quelle politique bloque.",
          },
          {
            title: "Chercher le Deny explicite",
            detail:
              "SCP, boundary de permissions, politique de ressource : un seul `Deny` quelque part suffit à tout bloquer.",
          },
          {
            title: "Corriger au plus juste",
            detail:
              "Ajouter l'action précise sur la ressource précise — jamais `*` « pour débloquer vite ». Re-simuler après correction.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Le réflexe à bannir",
        fields: [
          {
            label: "Erreur",
            value:
              "Attacher `AdministratorAccess` « temporairement pour voir si ça marche » : le temporaire devient permanent dans 90 % des cas.",
          },
          {
            label: "Bonne pratique",
            value:
              "Déboguer avec le simulateur et les logs CloudTrail, corriger au moindre privilège, documenter la politique ajoutée.",
          },
        ],
      },
    ],
  },
  {
    id: "threat-modeling-cloud",
    title: "Threat modeling appliqué au cloud",
    level: 3,
    intro:
      "Penser comme un attaquant pour concevoir comme un défenseur : STRIDE sur une architecture cloud.",
    blocks: [
      {
        kind: "table",
        headers: ["STRIDE", "Exemple cloud", "Mitigation"],
        rows: [
          ["Spoofing (usurpation)", "Clé d'accès volée utilisée depuis l'étranger", "MFA, conditions d'IP, détection d'anomalies"],
          ["Tampering (altération)", "Image Docker remplacée au registre", "Registre privé, signature d'images, scan en CI"],
          ["Repudiation", "Action malveillante sans trace", "CloudTrail verrouillé, logs immuables"],
          ["Information disclosure", "Bucket public, logs verbeux", "Blocage public, classification des données"],
          ["Denial of service", "Facture explosive via ressources", "Budgets et alertes, quotas, WAF"],
          ["Elevation of privilege", "Rôle trop permissif assumé", "Moindre privilège, revues IAM régulières"],
        ],
      },
      {
        kind: "text",
        text: "En une phrase : avant de déployer une architecture, on liste ce qui peut mal tourner (STRIDE), on évalue le risque et on conçoit les mitigations — pas après l'incident. Quand : à chaque nouvelle architecture ou changement majeur, en 1-2 heures d'atelier, avec un schéma d'architecture sous les yeux.",
      },
    ],
  },
  {
    id: "serverless-securite",
    title: "Serverless : sécuriser les fonctions",
    level: 3,
    intro:
      "Pas de serveur à patcher, mais des permissions à verrouiller et du code à protéger.",
    blocks: [
      {
        kind: "list",
        items: [
          "Rôle d'exécution minimal : chaque fonction Lambda a son rôle IAM avec uniquement les actions nécessaires — le finding n°1 du serverless est le rôle fourre-tout.",
          "Pas de secrets en variables d'environnement en clair : gestionnaire de secrets ou chiffrement KMS des variables.",
          "Valider les événements entrants : une fonction déclenchée par un bucket ou une file traite des données externes — même validation que pour une API.",
          "Timeout et mémoire limités : borne l'impact d'une boucle infinie ou d'une entrée malveillante (et la facture).",
          "Dépendances à jour : le code embarque ses bibliothèques — scanner comme n'importe quelle application.",
          "Logs structurés : chaque invocation doit être traçable (qui a déclenché, avec quoi).",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : le serverless déplace la sécurité du système vers l'identité et le code — moins d'OS à patcher, plus de politiques à écrire correctement. Erreur fréquente : croire que « managé par le fournisseur » signifie « sécurisé par défaut » pour la partie qui reste à votre charge.",
      },
    ],
  },
  {
    id: "ci-cd-securite",
    title: "Sécuriser la chaîne CI/CD",
    level: 3,
    intro:
      "Le pipeline déploie avec des droits élevés : c'en est une cible de choix.",
    blocks: [
      {
        kind: "list",
        items: [
          "Identités éphémères : OIDC entre le CI et le cloud (pas de clé d'accès long terme stockée dans les secrets du CI).",
          "Droits limités du rôle de déploiement : uniquement les actions nécessaires au déploiement, jamais `*`.",
          "Branches protégées : le déploiement en production exige une revue humaine, pas un push direct.",
          "Secrets du CI : jamais affichés dans les logs (masquage), rotation régulière, accès limité aux mainteneurs.",
          "Artefacts signés : ce qui est déployé est traçable jusqu'au commit (provenance).",
          "Scans dans le pipeline : posture (Checkov), images (Trivy), dépendances — bloquants sur le critique.",
        ],
      },
      {
        kind: "text",
        text: "Pourquoi c'est critique : compromettre le pipeline, c'est compromettre tous les déploiements futurs — l'attaquant n'a plus besoin d'attaquer la production, il s'y fait inviter. C'est le risque A08:2021 de l'OWASP Top 10 (intégrité de la chaîne logicielle).",
      },
    ],
  },
  {
    id: "testing-posture",
    title: "Testing : valider sa posture",
    level: 3,
    intro:
      "Tester ses défenses sur ses propres comptes : l'audit ne suffit pas, il faut vérifier.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : au-delà du scan de configuration, on valide que les contrôles fonctionnent vraiment — sur ses propres comptes de test uniquement. Pourquoi : une politique écrite n'est pas une politique efficace ; seul le test le prouve. Trois niveaux : re-scan après correction (le contrôle a-t-il disparu ?), test manuel ciblé (tenter l'action interdite avec un compte test — elle doit échouer), exercice de réponse (simuler une clé compromise : détection, révocation, analyse).",
      },
      {
        kind: "fields",
        title: "Cadre strict",
        fields: [
          {
            label: "Autorisé",
            value:
              "Vos comptes, vos ressources, vos identités de test. Les programmes de bug bounty des fournisseurs cloud, dans leur périmètre exact.",
          },
          {
            label: "Interdit",
            value:
              "Tester la configuration d'un tiers, même « pour l'aider », sans autorisation écrite. Scanner des plages d'IP qui ne vous appartiennent pas.",
          },
        ],
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
            label: "Confondre authentification et autorisation",
            value:
              "Problème : « il est connecté, donc il peut ». Pourquoi : le login prouve l'identité, pas le droit. Mieux : vérifier l'autorisation à chaque action sensible.",
          },
          {
            label: "Faire confiance aux tags",
            value:
              "Problème : baser une politique sur `env=prod` alors que n'importe quel créateur peut taguer. Pourquoi : les tags sont des métadonnées modifiables. Mieux : ne jamais en faire un contrôle de sécurité seul.",
          },
          {
            label: "Oublier les politiques de ressources",
            value:
              "Problème : une politique de bucket ou de clé KMS qui autorise un principal externe annule le verrouillage IAM. Pourquoi : on n'a regardé que les politiques d'identité. Mieux : auditer les deux côtés.",
          },
          {
            label: "Négliger les comptes de service",
            value:
              "Problème : les rôles assumés par les applications ont des droits larges « parce que ça doit marcher ». Pourquoi : invisibles aux revues d'utilisateurs. Mieux : les inclure dans chaque revue d'accès.",
          },
          {
            label: "Croire le dashboard vert",
            value:
              "Problème : le score du CSPM est bon donc « tout va bien ». Pourquoi : le scanner vérifie des configurations, pas des comportements. Mieux : compléter par la détection et les tests.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-audit-complet",
    title: "Projet : audit complet d'un environnement de test",
    level: 3,
    intro:
      "Le projet fil rouge : un audit professionnel de bout en bout.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Cadrer",
            detail:
              "Périmètre écrit : quel compte de test, quelles régions, quelle période. Objectif : « évaluer la posture IAM, stockage et réseau ».",
          },
          {
            title: "Inventorier",
            detail:
              "CLI : utilisateurs, rôles, politiques, buckets, groupes de sécurité, instances. Tout ce qui existe est listé.",
          },
          {
            title: "Scanner",
            detail:
              "Prowler complet + contrôles manuels ciblés (clés anciennes, wildcards, buckets). Exporter les preuves (commandes, sorties).",
          },
          {
            title: "Qualifier",
            detail:
              "Chaque finding : criticité (critique/haute/moyenne), exploitabilité, impact. Pas de liste brute — un tri argumenté.",
          },
          {
            title: "Recommander",
            detail:
              "Pour chaque finding critique : correction précise (commande ou clic console), effort estimé, risque résiduel.",
          },
          {
            title: "Restituer",
            detail:
              "Rapport : synthèse exécutive (1 page, sans jargon), détails techniques, plan d'action priorisé. Relire comme si c'était pour un client.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-policy-as-code",
    title: "Projet : garde-fous en Policy as Code",
    level: 3,
    intro:
      "Empêcher plutôt que réparer : des règles qui bloquent avant déploiement.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir le périmètre",
            detail:
              "Un repo Terraform de test (même fictif mais réaliste : bucket, instance, groupe de sécurité).",
          },
          {
            title: "Écrire 5 règles",
            detail:
              "Chiffrement obligatoire, pas de bucket public, pas de 0.0.0.0/0 sur SSH, tags requis, versioning S3 — en OPA/Rego ou Checkov.",
          },
          {
            title: "Intégrer en CI",
            detail:
              "Le pipeline échoue si une règle est violée : `conftest test` ou `checkov` dans le workflow.",
          },
          {
            title: "Tester",
            detail:
              "Introduire volontairement une violation et vérifier le blocage, puis la corriger et vérifier le passage.",
          },
          {
            title: "Documenter",
            detail:
              "README : quelles règles, pourquoi, comment en ajouter une. C'est un livrable réutilisable.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-plan-reponse",
    title: "Projet : plan de réponse à incident cloud",
    level: 3,
    intro:
      "Préparer le jour où une clé fuit : un playbook écrit à froid.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définir les scénarios",
            detail:
              "Clé d'accès exposée publiquement, bucket rendu public par erreur, instance compromise (crypto-mining), compte root suspect.",
          },
          {
            title: "Écrire les playbooks",
            detail:
              "Par scénario : détection (quel signal ?), confinement (désactiver la clé, isoler l'instance, re-privatiser), éradication, analyse (CloudTrail : qu'a fait l'attaquant ?), leçons.",
          },
          {
            title: "Préparer les commandes",
            detail:
              "Les commandes exactes prêtes à copier (désactivation de clé, révocation de sessions, snapshot avant isolation) — en incident, on n'improvise pas la syntaxe.",
          },
          {
            title: "Tester à blanc",
            detail:
              "Exercice sur le compte de test : chronométrer la réponse, noter les frictions, mettre à jour le playbook.",
          },
        ],
      },
      {
        kind: "text",
        text: "Concepts liés : ce playbook est le pont naturel vers la Learning Page SOC (triage, escalade) et Forensique (analyse post-incident).",
      },
    ],
  },
  {
    id: "sts-assume-role",
    title: "STS : des identifiants temporaires, pas des clés",
    level: 3,
    intro: "Remplacer les clés d'accès permanentes par des sessions temporaires.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : au lieu de distribuer des clés d'accès longue durée, on demande à AWS STS (Security Token Service) des identifiants temporaires via AssumeRole — ils expirent en 1 heure et ne se renouvellent pas seuls. Pourquoi : une clé permanente volée reste exploitable des mois ; une session temporaire volée meurt toute seule.",
      },
      {
        kind: "command",
        label: "Assumer un rôle IAM (STS)",
        command: "aws sts assume-role --role-arn arn:aws:iam::123456789012:role/AuditReadOnly --role-session-name session-audit",
        why: "Demande des identifiants temporaires pour le rôle cible : la réponse contient AccessKeyId, SecretAccessKey et SessionToken à durée limitée.",
        verify: "aws sts get-caller-identity — affiche l'identité assumée et confirme que la session est active.",
      },
      {
        kind: "fields",
        title: "Les bonnes pratiques STS",
        fields: [
          {
            label: "MFA obligatoire",
            value: "Conditionner l'assume-role à un MFA (condition aws:MultiFactorAuthPresent) : même avec des clés de base, pas de session sans second facteur.",
          },
          {
            label: "External ID",
            value: "Pour les rôles assumés par des tiers (prestataires) : un secret partagé qui empêche l'attaque confused deputy.",
          },
          {
            label: "Durée minimale",
            value: "Toujours la durée la plus courte compatible avec la tâche (15 min à 1 h pour un humain, plus pour un batch) : moins de temps = moins d'exposition.",
          },
        ],
      },
    ],
  },
  {
    id: "waf-protection",
    title: "WAF : le pare-feu applicatif",
    level: 3,
    intro: "Filtrer le trafic web avant qu'il n'atteigne l'application.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : AWS WAF inspecte les requêtes HTTP(S) et bloque les attaques web connues (injection SQL, XSS) et les abus (rate limiting) avant l'application. Pourquoi : c'est la première barrière contre le bruit d'Internet — les attaques automatisées meurent au WAF au lieu d'atteindre votre code.",
      },
      {
        kind: "command",
        label: "Lister les ACLs web (WAF)",
        command: "aws wafv2 list-web-acls --scope REGIONAL",
        why: "Liste les ACLs web déployées : l'audit commence par vérifier que chaque application exposée est bien protégée.",
        verify: "aws wafv2 get-web-acl --name <nom> --scope REGIONAL --id <id> — affiche les règles actives et leur ordre.",
      },
      {
        kind: "fields",
        title: "Les règles essentielles",
        fields: [
          {
            label: "Managed rules",
            value: "Les jeux de règles gérés par AWS (Core, SQLi, XSS) : une base solide sans écrire une règle — à activer en premier.",
          },
          {
            label: "Rate limiting",
            value: "Limiter les requêtes par IP : contre le scraping agressif et les floods applicatifs simples.",
          },
          {
            label: "Mode count d'abord",
            value: "Toute nouvelle règle démarre en mode comptage (log sans blocage) : on mesure les faux positifs avant de bloquer pour de vrai.",
          },
        ],
      },
    ],
  },
  {
    id: "guardduty",
    title: "GuardDuty : la détection managée",
    level: 3,
    intro: "Laisser AWS surveiller les menaces avec son threat intelligence.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : GuardDuty analyse en continu les logs (VPC Flow, DNS, CloudTrail) avec du machine learning et la threat intelligence d'AWS pour signaler les comportements suspects. Pourquoi : c'est une détection sans agent ni règle à écrire — le complément idéal d'une petite équipe.",
      },
      {
        kind: "command",
        label: "Vérifier GuardDuty",
        command: "aws guardduty list-detectors",
        why: "Vérifie si GuardDuty est activé dans la région : l'audit commence par ce qui est allumé, pas par ce qui devrait l'être.",
        verify: "aws guardduty list-findings --detector-id <id> --max-results 10 — affiche les 10 dernières détections pour juger de l'état réel.",
      },
      {
        kind: "fields",
        title: "Bien l'exploiter",
        fields: [
          {
            label: "Toutes les régions",
            value: "GuardDuty est régional : un attaquant utilisera la région oubliée — activation centralisée via Organizations.",
          },
          {
            label: "Trier les findings",
            value: "Gravité haute/moyenne en priorité, les faibles en revue hebdo : comme tout système de détection, le bruit tue l'attention.",
          },
          {
            label: "Coupler à Security Hub",
            value: "Centraliser GuardDuty + Config + Inspector dans Security Hub : une seule console pour la posture.",
          },
        ],
      },
    ],
  },
  {
    id: "config-conformite",
    title: "AWS Config : la conformité en continu",
    level: 3,
    intro: "Enregistrer les changements et vérifier les règles sans relâche.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : AWS Config enregistre chaque changement de configuration des ressources et évalue en continu des règles de conformité (ex. « tout bucket doit être chiffré »). Pourquoi : un audit ponctuel dit « c'était conforme mardi » ; Config dit « c'est conforme maintenant, et voici quand ça a dérivé ».",
      },
      {
        kind: "command",
        label: "Lister les règles AWS Config",
        command: "aws configservice describe-config-rules",
        why: "Liste les règles de conformité actives : l'audit vérifie que les règles critiques (chiffrement, logs, accès public) existent vraiment.",
        verify: "aws configservice get-compliance-details-by-config-rule --config-rule-name <nom> — détaille les ressources non conformes.",
      },
      {
        kind: "fields",
        title: "Les usages clés",
        fields: [
          {
            label: "Règles managées",
            value: "AWS fournit des dizaines de règles prêtes (s3-bucket-server-side-encryption-enabled, etc.) : à activer avant d'en écrire.",
          },
          {
            label: "Remédiation auto",
            value: "Coupler une règle non conforme à une remédiation SSM (ex. bloquer l'accès public d'un bucket) : la conformité qui se répare seule.",
          },
          {
            label: "Conformance packs",
            value: "Des packs de règles alignés sur des référentiels (CIS, PCI) : la conformité réglementaire en continu.",
          },
        ],
      },
    ],
  },
  {
    id: "console-securite",
    title: "Sécuriser la console : le compte root",
    level: 3,
    intro: "Le compte le plus puissant est aussi le plus ciblé : le verrouiller.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : le compte root peut tout faire et ne devrait presque jamais servir — MFA matériel, aucune clé d'accès, usage d'urgence uniquement. Pourquoi : la compromission du root, c'est la compromission totale du compte, irrécupérable sans AWS.",
      },
      {
        kind: "command",
        label: "Résumé du compte IAM",
        command: "aws iam get-account-summary",
        why: "Affiche le résumé du compte dont AccountMFAEnabled : vérifie en une commande que le MFA root est actif.",
        verify: "aws iam get-account-password-policy — contrôle la politique de mot de passe des utilisateurs IAM (longueur, complexité, rotation).",
      },
      {
        kind: "fields",
        title: "Les règles du root",
        fields: [
          {
            label: "MFA matériel",
            value: "Clé de sécurité physique sur le root, jamais d'appli logicielle seule : le root mérite le plus haut niveau.",
          },
          {
            label: "Zéro clé d'accès",
            value: "Le root n'a aucune clé : s'il en existe, les supprimer immédiatement — c'est un finding critique.",
          },
          {
            label: "Tâches dédiées",
            value: "Le root ne sert qu'aux rares actions qui l'exigent (fermeture de compte, changement de support) : tout le reste passe par des rôles.",
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
          "Moindre privilège partout : chaque identité, chaque rôle, chaque politique — le droit minimal qui permet le travail.",
          "Défense en profondeur : IAM strict + réseau segmenté + chiffrement + logs + détection — aucune couche seule ne suffit.",
          "Automatiser les contrôles : scan régulier, policy as code, alertes — l'humain oublie, la machine non.",
          "Séparer les environnements : prod, staging et labo dans des comptes distincts, avec des niveaux d'exigence croissants.",
          "Tracer avant d'agir : CloudTrail actif dès le jour 1, logs protégés contre la suppression.",
          "Tester les restaurations : sauvegardes et plans de reprise vérifiés, pas supposés.",
          "Documenter les exceptions : tout accès large a un responsable et une date de fin.",
          "Rester à jour : les services cloud évoluent vite — revoir les contrôles à chaque changement majeur.",
          "Former les équipes : la plupart des incidents cloud sont des erreurs humaines évitables par la sensibilisation.",
          "Penser coût : une alerte de facturation anormale est aussi un signal de sécurité (crypto-mining).",
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
          {
            label: "AWS Security Documentation",
            value: "docs.aws.amazon.com/security : guides IAM, bonnes pratiques, livres blancs sur la responsabilité partagée.",
          },
          {
            label: "Microsoft Defender for Cloud",
            value: "learn.microsoft.com : documentation de la posture et de la protection des charges de travail Azure.",
          },
          {
            label: "Google Cloud Security",
            value: "cloud.google.com/security : guides IAM, BeyondCorp (Zero Trust) et bonnes pratiques GCP.",
          },
          {
            label: "CIS Benchmarks",
            value: "cisecurity.org : les référentiels de configuration sécurisée par fournisseur, la base des contrôles Prowler.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Outils : Prowler et ScoutSuite (audit open source), Trivy (scan d'images), Checkov et OPA/Conftest (policy as code).",
          "Référentiels : Cloud Security Alliance (cloudsecurityalliance.org), MITRE ATT&CK pour la partie détection cloud.",
          "Pratique : les free tiers des fournisseurs pour un labo réel, les rapports d'audit publiés pour le vocabulaire professionnel.",
          "Communauté : les dépôts GitHub des outils cités (issues, discussions) pour les cas concrets.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "La sécurité cloud maîtrisée, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir la détection : SOC & Détection — centraliser les alertes cloud dans un SIEM et écrire des règles de détection.",
          "Aller vers la réponse : Forensique — analyser un incident cloud (timeline CloudTrail, artefacts).",
          "Structurer : Gouvernance & Conformité — transformer les contrôles techniques en politiques et en conformité (ISO 27001, NIS2).",
          "Tester en méthode : Pentest — comprendre la méthodologie d'évaluation, cadrée et autorisée, pour mieux se défendre.",
          "Sécuriser le code qui s'y déploie : Secure Coding — le pipeline et les applications qui tournent dans le cloud.",
          "Revenir à la roadmap : valider Cloud Security et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

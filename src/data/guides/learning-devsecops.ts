import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du DevSecOps : intégrer la sécurité à chaque étape
 * du pipeline — shift-left, SAST, scan d'images, secrets, supply chain.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_DEVSECOPS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est le DevSecOps, pourquoi la sécurité arrive trop tard quand on l'ajoute à la fin, et ce que « shift-left » change concrètement.",
    blocks: [
      {
        kind: "text",
        text: "Le DevSecOps intègre la sécurité à chaque étape de la livraison logicielle au lieu de la reléguer à un audit final. Scans automatiques du code et des dépendances, détection des secrets, gestion centralisée des clés, règles vérifiées automatiquement : la sécurité devient un garde-fou du pipeline, pas un frein posé après coup.",
      },
      {
        kind: "text",
        text: "Pourquoi ça existe : une vulnérabilité découverte en production coûte beaucoup plus cher à corriger qu'en développement — il faut un correctif urgent, un déploiement hors cycle, parfois une communication de crise. Le modèle classique (« on développera, la sécurité auditera à la fin ») produit des rapports que personne ne lit et des mises en production bloquées au dernier moment. Le DevSecOps déplace les contrôles vers la gauche du pipeline, là où corriger est rapide et bon marché.",
      },
      {
        kind: "text",
        text: "La sécurité intégrée au pipeline CI/CD : chaque commit est scanné, chaque build est vérifié, chaque déploiement respecte des règles automatiques.",
      },
      {
        kind: "text",
        text: "Corriger tôt coûte peu ; corriger tard coûte cher. Les contrôles automatiques rendent la sécurité continue sans ralentir les livraisons.",
      },
      {
        kind: "fields",
        title: "Le DevSecOps : l'essentiel",
        fields: [          {
            label: "Quand l'appliquer",
            value:
              "Dès qu'un pipeline CI/CD existe : on y ajoute les contrôles de sécurité comme des jobs, avec des seuils qui bloquent quand le risque est réel.",
          },
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni un produit à acheter, ni une équipe séparée qui valide : c'est une pratique d'équipe, outillée, où les développeurs corrigent eux-mêmes ce que les scans remontent.",
          },
        ],
      },
    ],
  },
  {
    id: "shift-left",
    title: "Le shift-left : la sécurité le plus tôt possible",
    level: 1,
    intro:
      "L'idée centrale du DevSecOps, en une image : plus le contrôle est à gauche, moins il coûte.",
    blocks: [
      {
        kind: "diagram",
        title: "Le coût de correction selon l'étape de découverte",
        lines: [
          "Écriture du code (éditeur, pre-commit)",
          "  → coût minimal : le développeur corrige en secondes",
          "     │",
          "     ▼",
          "Pull request (CI : SAST, scan dépendances)",
          "  → coût faible : correction avant le merge",
          "     │",
          "     ▼",
          "Build (scan d'image, SBOM)",
          "  → coût moyen : reconstruire et re-tester",
          "     │",
          "     ▼",
          "Production (incident, CVE exploitée)",
          "  → coût maximal : urgence, rollback, communication, impact",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : chaque contrôle placé plus tôt dans le pipeline divise le coût de correction. Le shift-left ne signifie pas « tout bloquer dès l'éditeur » : il signifie placer chaque contrôle là où son rapport signal/bruit est le meilleur — les secrets au pre-commit, les vulnérabilités connues en CI, la conformité au déploiement.",
      },
      {
        kind: "list",
        items: [
          "Tôt : feedback immédiat au développeur, correction dans son contexte de travail.",
          "Tard : le contexte est perdu, la correction devient un projet, la pression monte.",
          "L'objectif n'est pas zéro vulnérabilité (irréaliste), mais un délai de correction court et prévisible.",
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
      "Ce qu'il faut maîtriser avant d'ajouter des contrôles de sécurité à un pipeline.",
    blocks: [
      {
        kind: "fields",
        title: "Les fondations",
        fields: [
          {
            label: "CI/CD (pipelines)",
            value:
              "Les contrôles de sécurité s'exécutent comme des jobs du pipeline : il faut d'abord comprendre jobs, artefacts, déclencheurs et secrets de la CI.",
          },
          {
            label: "Git",
            value:
              "Branches, historique, hooks : la détection de secrets travaille sur l'historique Git, les gates bloquent les merges.",
          },
          {
            label: "Conteneurs (bases)",
            value:
              "Le scan d'images suppose de comprendre ce qu'est une image : couches, tags, registries.",
          },
          {
            label: "Bases de la sécurité applicative",
            value:
              "Vocabulaire minimal : vulnérabilité, CVE, injection, authentification. La posture défensive est détaillée dans la page Cybersécurité.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le DevSecOps n'est pas une compétence de départ : c'est une couche qu'on ajoute sur un pipeline qui fonctionne déjà. Un pipeline instable + des scans de sécurité = du bruit que personne ne lit.",
      },
    ],
  },
  {
    id: "installation-outils",
    title: "Installation des outils",
    level: 2,
    intro:
      "Installer la boîte à outils du DevSecOps : que des outils réels, open source, utilisables en local comme en CI.",
    blocks: [
      {
        kind: "command",
        label: "Installer Semgrep (SAST)",
        command: "python3 -m pip install semgrep",
        why: "Semgrep est l'analyseur statique de référence : il lit le code source et détecte des motifs vulnérables (injections, secrets en dur, mauvaises pratiques crypto). L'installation via pip fonctionne sur Linux, macOS et Windows sans droits admin.",
        verify: "semgrep --version",
      },
      {
        kind: "command",
        label: "Installer Gitleaks (détection de secrets)",
        command: "brew install gitleaks",
        why: "Gitleaks scanne l'historique Git à la recherche de secrets (clés API, tokens, mots de passe) via des motifs et l'analyse d'entropie. Sur Linux sans Homebrew, le binaire se télécharge depuis les releases du projet.",
        verify: "gitleaks version",
      },
      {
        kind: "command",
        label: "Installer Syft (génération de SBOM)",
        command: "curl -sSfL https://get.anchore.io/syft | sudo sh -s -- -b /usr/local/bin",
        why: "Syft inventorie les composants logiciels d'un projet ou d'une image (SBOM : Software Bill of Materials). Le script officiel installe le binaire dans `/usr/local/bin`. C'est l'inventaire qui permet ensuite de savoir exactement ce qui tourne en production.",
        verify: "syft version",
      },
      {
        kind: "text",
        text: "Trivy (scan de vulnérabilités) s'installe via le gestionnaire de paquets de votre OS ou depuis ses releases officielles ; vérifiez avec `trivy --version`. Tous ces outils fonctionnent en local ET en CI avec les mêmes commandes — ce qu'on teste en local se rejoue dans le pipeline.",
      },
    ],
  },
  {
    id: "anatomie-pipeline-securise",
    title: "Anatomie d'un pipeline sécurisé",
    level: 2,
    intro:
      "Où placer chaque contrôle : la carte des « gates » de sécurité.",
    blocks: [
      {
        kind: "diagram",
        title: "Les gates de sécurité le long du pipeline",
        lines: [
          "Pre-commit (local)",
          "  └── gitleaks protect : aucun secret ne part",
          "     │",
          "     ▼",
          "Pull request (CI)",
          "  ├── Semgrep (SAST) : le code source est analysé",
          "  ├── npm audit / pip-audit : les dépendances sont scannées",
          "  └── gitleaks detect : l'historique est vérifié",
          "     │",
          "     ▼",
          "Build",
          "  ├── Trivy : l'image est scannée (CVE)",
          "  └── Syft : le SBOM est généré",
          "     │",
          "     ▼",
          "Déploiement",
          "  ├── Policy as code : les manifests respectent les règles",
          "  └── Signature : l'image est signée (provenance)",
          "     │",
          "     ▼",
          "Production",
          "  └── Monitoring : détection des anomalies en continu",
        ],
      },
      {
        kind: "text",
        text: "Chaque gate a un verdict : bloquer (le build échoue), alerter (rapport sans blocage) ou informer. Au début, faites alerter sans bloquer pour mesurer le bruit ; ne bloquez que sur les sévérités hautes et critiques une fois les faux positifs maîtrisés. Un gate qui bloque à tort est pire que pas de gate : on apprend à le contourner.",
      },
    ],
  },
  {
    id: "scan-dependances",
    title: "Scanner les dépendances",
    level: 2,
    intro:
      "La plupart des vulnérabilités n'est pas dans votre code, mais dans vos dépendances : les scanner est le premier gate rentable.",
    blocks: [
      {
        kind: "command",
        label: "Auditer les dépendances npm",
        command: "npm audit",
        why: "Compare les dépendances du projet (via le lockfile) à la base de vulnérabilités connue et affiche les CVE trouvées avec leur sévérité. C'est le scan le plus simple : aucune installation, il utilise les données déjà présentes dans le projet.",
        verify: "npm audit --audit-level=high",
      },
      {
        kind: "command",
        label: "Auditer les dépendances Python",
        command: "pip-audit",
        why: "L'équivalent pour l'écosystème Python : analyse les paquets installés et leurs versions, signale les vulnérabilités connues avec les versions corrigées. S'installe via `pip install pip-audit`.",
        verify: "pip-audit --version",
      },
      {
        kind: "text",
        text: "En CI, le gate typique échoue sur les vulnérabilités hautes et critiques (`npm audit --audit-level=high`, code de sortie non nul en cas de finding). La correction standard : mettre à jour la dépendance vers la version corrigée indiquée dans le rapport. Quand aucune correction n'existe, on documente l'exception avec une date de réévaluation — on ne l'ignore pas silencieusement.",
      },
      {
        kind: "list",
        items: [
          "Scannez le lockfile, pas `package.json` : seules les versions réellement installées comptent.",
          "Les dépendances transitives (dépendances de dépendances) sont la principale source de CVE : l'outil les couvre, regardez-les.",
          "OWASP Dependency-Check est l'équivalent pour l'écosystème Java/Maven.",
        ],
      },
    ],
  },
  {
    id: "sast-semgrep",
    title: "SAST avec Semgrep",
    level: 2,
    intro:
      "Analyser le code source sans l'exécuter : détecter les motifs dangereux avant même les tests.",
    blocks: [
      {
        kind: "command",
        label: "Scanner un projet avec les règles automatiques",
        command: "semgrep --config auto .",
        why: "`--config auto` sélectionne les règles adaptées aux langages détectés dans le projet (Python, JavaScript, Go…). Semgrep parcourt le code et signale chaque motif correspondant avec le fichier, la ligne et la règle. C'est un premier scan en une commande, sans configuration.",
        verify: "semgrep --config auto --dryrun .",
      },
      {
        kind: "command",
        label: "Scanner avec le ruleset d'audit sécurité",
        command: "semgrep --config p/security-audit .",
        why: "Le ruleset `p/security-audit` regroupe les règles orientées sécurité (injections, XSS, mauvaises utilisations crypto). Plus strict que `auto`, il produit plus de findings : à utiliser quand l'équipe est prête à les traiter, typiquement en CI sur les pull requests.",
      },
      {
        kind: "text",
        text: "SAST (Static Application Security Testing) analyse le code sans l'exécuter : rapide, exécuté tôt, mais avec des faux positifs possibles — il signale des motifs suspects sans savoir s'ils sont réellement exploitables. D'où la règle : un finding SAST se vérifie avant de se corriger, et un faux positif avéré se supprime proprement (`# nosemgrep: <rule-id>` avec un commentaire expliquant pourquoi), jamais en désactivant la règle entière.",
      },
    ],
  },
  {
    id: "scan-images-trivy",
    title: "Scanner les images avec Trivy",
    level: 2,
    intro:
      "Une image de conteneur embarque un OS complet : scanner ses CVE avant de la déployer.",
    blocks: [
      {
        kind: "command",
        label: "Scanner une image (tableau lisible)",
        command: "trivy image nginx:latest",
        why: "Trivy télécharge sa base de vulnérabilités, inspecte les couches de l'image (paquets OS + bibliothèques applicatives) et affiche les CVE : paquet, version installée, version corrigée, sévérité. Le premier scan télécharge la base (quelques dizaines de Mo) ; les suivants sont rapides.",
      },
      {
        kind: "command",
        label: "Gate CI : échouer sur HIGH et CRITICAL",
        command: "trivy image --severity HIGH,CRITICAL --exit-code 1 mon-app:latest",
        why: "`--severity HIGH,CRITICAL` ne remonte que les vulnérabilités graves (moins de bruit), `--exit-code 1` fait échouer la commande si au moins une est trouvée — c'est ce code de sortie qui bloque le pipeline. C'est le gate standard pour les images.",
        verify: "trivy image --severity HIGH,CRITICAL --exit-code 0 mon-app:latest",
      },
      {
        kind: "list",
        items: [
          "`trivy fs .` scanne le système de fichiers local (dépendances du projet) sans construire d'image.",
          "`--ignore-unfixed` masque les CVE sans correctif disponible : moins de bruit, mais un risque assumé à documenter.",
          "Un fichier `.trivyignore` liste les exceptions acceptées (CVE + justification + date de réévaluation).",
        ],
      },
    ],
  },
  {
    id: "scan-secrets-gitleaks",
    title: "Détecter les secrets avec Gitleaks",
    level: 2,
    intro:
      "Un secret commité est un secret compromis : le détecter avant le push, et vérifier l'historique.",
    blocks: [
      {
        kind: "command",
        label: "Scanner l'historique du dépôt",
        command: "gitleaks detect --source . --verbose",
        why: "Parcourt tout l'historique Git (`git log -p`) à la recherche de motifs de secrets (clés AWS, tokens GitHub, clés privées…) et de chaînes à forte entropie. `--verbose` détaille la progression. À lancer au moins une fois sur chaque dépôt existant : le passé contient souvent des surprises.",
      },
      {
        kind: "command",
        label: "Protéger les commits (pre-commit)",
        command: "gitleaks protect --staged",
        why: "Analyse uniquement les changements stagés (`git add`) avant le commit : si un secret est détecté, le commit est bloqué. Installé comme hook pre-commit, c'est le garde-fou le plus tôt possible — le secret ne part jamais.",
        verify: "gitleaks protect --staged --verbose",
      },
      {
        kind: "text",
        text: "Si un scan révèle un secret dans l'historique : 1) considérez-le comme compromis et révoquez-le immédiatement (régénérez la clé côté fournisseur), 2) purgez-le de l'historique (l'historique Git garde tout, même les fichiers supprimés), 3) ajoutez le garde pre-commit pour que ça ne se reproduise pas. Révoquer d'abord, nettoyer ensuite.",
      },
    ],
  },
  {
    id: "sbom-syft",
    title: "SBOM avec Syft",
    level: 2,
    intro:
      "L'inventaire exact de ce qui compose votre logiciel : la base de la gestion des vulnérabilités.",
    blocks: [
      {
        kind: "command",
        label: "Générer le SBOM d'une image",
        command: "syft mon-app:latest -o cyclonedx-json > sbom.json",
        why: "Syft inspecte l'image et produit un inventaire machine-readable (CycloneDX JSON) : chaque paquet, sa version, sa licence, son écosystème. Ce fichier est la preuve de ce qui tourne — exigé par de plus en plus de clients et de réglementations.",
        verify: "syft mon-app:latest -o table",
      },
      {
        kind: "text",
        text: "SBOM (Software Bill of Materials) : la liste exhaustive des composants logiciels d'un artefact. Deux formats standards : CycloneDX (privilégié par les équipes sécurité, bien outillé) et SPDX (standard Linux Foundation, courant dans les contextes réglementaires). Générez le SBOM à chaque build, stockez-le avec la release (version + SHA du commit + date) : un SBOM sans contexte de release ne vaut rien lors d'un audit.",
      },
      {
        kind: "list",
        items: [
          "`syft dir:.` génère le SBOM du code source local (sans construire d'image).",
          "Le SBOM alimente ensuite les scanners : `grype sbom:sbom.json` recherche les CVE dans l'inventaire.",
          "En CI, l'action `anchore/sbom-action` génère et publie le SBOM automatiquement.",
        ],
      },
    ],
  },
  {
    id: "secrets-bases",
    title: "Gérer les secrets : les bases",
    level: 2,
    intro:
      "Jamais en clair, jamais dans Git : les règles non négociables et leurs mises en œuvre.",
    blocks: [
      {
        kind: "list",
        items: [
          "Jamais de secret dans le code, dans Git, dans les logs, dans les artefacts, dans les tickets, dans le chat.",
          "En local : fichier `.env` ignoré par Git (`.gitignore`), jamais commité, jamais partagé par message.",
          "En CI : secrets chiffrés de la plateforme (`secrets.` GitHub, variables masquées GitLab), portée minimale (secret d'environnement, pas de dépôt).",
          "En production : injection au runtime depuis un coffre (Vault, gestionnaire de secrets du cloud), jamais dans l'image.",
          "Un secret qui a fuité (log, historique Git, capture d'écran) est considéré comme compromis : on le révoque, on le régénère.",
        ],
      },
      {
        kind: "text",
        text: "Le principe du moindre privilège s'applique aux secrets : chaque secret n'est accessible qu'aux jobs et services qui en ont strictement besoin, avec une durée de vie aussi courte que possible. Les tokens longue durée sont des dettes de sécurité.",
      },
    ],
  },
  {
    id: "workflow-devsecops",
    title: "Le flux de travail DevSecOps",
    level: 3,
    intro:
      "Comment l'équipe vit avec les contrôles au quotidien : du commit au traitement des findings.",
    blocks: [
      {
        kind: "diagram",
        title: "La journée d'un développeur en DevSecOps",
        lines: [
          "Écriture du code",
          "  └── pre-commit : gitleaks bloque les secrets, le linter vérifie",
          "     │",
          "     ▼",
          "Push → pull request",
          "  └── CI : Semgrep + scan dépendances + gitleaks",
          "  └── le pipeline commente les findings DANS la PR",
          "     │",
          "     ▼",
          "Le développeur corrige (c'est lui, pas « la sécu »)",
          "  ├── vrai positif → corrige le code",
          "  ├── faux positif → suppression ciblée + justification",
          "  └── exception acceptée → documentée, datée, réévaluée",
          "     │",
          "     ▼",
          "Merge → build → scan image + SBOM → déploiement",
          "     │",
          "     ▼",
          "Production : monitoring, revue périodique des findings",
        ],
      },
      {
        kind: "text",
        text: "Le point culturel essentiel : les findings appartiennent aux développeurs qui ont écrit le code, pas à une équipe sécurité séparée. L'équipe sécurité fournit les outils, les règles et l'aide au diagnostic ; la correction reste dans le flux normal de développement. C'est ce qui rend le DevSecOps soutenable.",
      },
    ],
  },
  {
    id: "trier-findings",
    title: "Trier les findings : vrais positifs, faux positifs",
    level: 3,
    intro:
      "Un scanner qui crie au loup finit ignoré : la méthode pour traiter les résultats.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Lire le finding en entier",
            detail:
              "Règle déclenchée, fichier, ligne, sévérité, description. La plupart des outils lient vers la documentation de la règle : lisez-la avant de juger.",
          },
          {
            title: "Vérifier l'exploitabilité",
            detail:
              "Le code est-il atteignable ? Les données sont-elles contrôlées par l'utilisateur ? Un `eval()` sur une constante interne n'a pas la même gravité que sur une entrée HTTP.",
          },
          {
            title: "Corriger les vrais positifs",
            detail:
              "Corrigez à la racine (validation d'entrée, requête paramétrée, mise à jour de dépendance), pas en masquant le symptôme.",
          },
          {
            title: "Supprimer proprement les faux positifs",
            detail:
              "Suppression ciblée sur la ligne (`# nosemgrep: <rule-id>`) avec un commentaire expliquant pourquoi c'est sûr. Jamais de désactivation globale pour un cas local.",
          },
          {
            title: "Documenter les exceptions",
            detail:
              "Risque accepté consciemment : qui a décidé, pourquoi, jusqu'à quand (date de réévaluation). Une exception sans date est un oubli programmé.",
          },
        ],
      },
      {
        kind: "text",
        text: "Métrique de santé : le taux de faux positifs par ruleset. S'il dépasse ce que l'équipe peut traiter, resserrez les règles (sévérité minimale, périmètres) plutôt que de laisser les findings s'accumuler. Un backlog de 500 findings non traités vaut zéro.",
      },
    ],
  },
  {
    id: "tableau-outils",
    title: "Panorama des outils",
    level: 2,
    intro:
      "Un outil par catégorie, avec son rôle exact — sans jargon marketing.",
    blocks: [
      {
        kind: "table",
        headers: ["Catégorie", "Outil", "Ce qu'il fait", "Quand"],
        rows: [
          ["SAST", "Semgrep", "Analyse le code source (motifs vulnérables)", "CI, sur chaque PR"],
          ["Dépendances", "npm audit / pip-audit", "CVE dans les dépendances", "CI + revue régulière"],
          ["Images", "Trivy", "CVE dans les images et filesystems", "Build, gate bloquant"],
          ["Secrets", "Gitleaks", "Secrets dans Git et le code", "Pre-commit + CI (historique)"],
          ["SBOM", "Syft", "Inventaire des composants", "Build, archivé avec la release"],
          ["Vulnérabilités SBOM", "Grype", "CVE depuis un SBOM", "Revue périodique"],
          ["DAST", "OWASP ZAP", "Teste l'app en exécution", "Staging, planifié"],
          ["Policy as code", "Conftest / OPA", "Vérifie les configs contre des règles", "Pré-déploiement"],
          ["Secrets (coffre)", "Vault", "Stocke et distribue les secrets", "Runtime production"],
          ["Signature", "Cosign (Sigstore)", "Signe les images (provenance)", "Build d'images critiques"],
        ],
      },
    ],
  },
  {
    id: "dast-zap",
    title: "DAST avec OWASP ZAP",
    level: 3,
    intro:
      "Tester l'application en exécution, comme un attaquant : le complément du SAST.",
    blocks: [
      {
        kind: "text",
        text: "DAST (Dynamic Application Security Testing) : on attaque une application qui tourne (environnement de staging, jamais la production sans autorisation explicite) au lieu d'analyser son code. OWASP ZAP est la référence open source : il crawle l'application et envoie des payloads de test (injections, XSS) pour détecter les failles réellement exploitables.",
      },
      {
        kind: "command",
        label: "Scan de base d'une application de staging",
        command: "zap-baseline.py -t https://staging.example.com",
        why: "Le script `zap-baseline.py` (fourni avec ZAP) effectue un scan passif : il parcourt l'application et signale les problèmes sans payloads agressifs. Le `-t` désigne la cible — toujours un environnement de test dont vous avez l'autorisation. C'est le DAST le moins intrusif, adapté à une exécution planifiée.",
        verify: "zap-baseline.py -h",
      },
      {
        kind: "list",
        items: [
          "SAST voit le code mais pas le comportement ; DAST voit le comportement mais pas le code : les deux se complètent.",
          "Le DAST est plus lent et plus bruyant : exécution planifiée (nuit, staging), pas à chaque commit.",
          "Ne scannez que vos propres applications, avec autorisation écrite : scanner un tiers est illégal dans la plupart des pays.",
        ],
      },
    ],
  },
  {
    id: "sast-avance",
    title: "SAST avancé : règles sur mesure",
    level: 3,
    intro:
      "Écrire ses propres règles Semgrep pour les interdits spécifiques à l'équipe.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: ".semgrep/rules/no-hardcoded-secret.yml",
        code: "rules:\n  - id: no-hardcoded-password\n    languages: [python]\n    severity: ERROR\n    message: \"Mot de passe en dur : utilisez le coffre de secrets.\"\n    pattern: |\n      password = \"...\"\n    metadata:\n      category: security\n      cwe: \"CWE-798: Use of Hard-coded Credentials\"",
      },
      {
        kind: "text",
        text: "Une règle Semgrep, c'est un motif de code (`pattern`) + des métadonnées. Ici : toute affectation d'un littéral à `password` en Python est une erreur. Les règles maison codifient les interdits de l'équipe (pas de `eval`, pas de pickle sur des données externes, pas de désactivation TLS) et tournent avec les mêmes commandes que les règles publiques.",
      },
      {
        kind: "command",
        label: "Tester une règle locale",
        command: "semgrep --config .semgrep/rules/ src/",
        why: "Exécute uniquement vos règles maison sur le dossier `src/`. À lancer pendant l'écriture de la règle pour vérifier qu'elle détecte bien les cas visés — et seulement eux — avant de l'activer en CI.",
      },
    ],
  },
  {
    id: "vault-secrets",
    title: "Coffre de secrets : Vault",
    level: 3,
    intro:
      "En production, les secrets ne vivent ni dans Git ni dans les variables CI : ils vivent dans un coffre.",
    blocks: [
      {
        kind: "text",
        text: "HashiCorp Vault est le coffre de référence : il stocke les secrets chiffrés, contrôle finement qui y accède (politiques), journalise chaque lecture (audit) et surtout génère des secrets dynamiques — des identifiants de base de données créés à la demande, valables quelques heures puis révoqués automatiquement. Un secret qui n'existe que le temps d'en avoir besoin ne peut pas fuiter durablement.",
      },
      {
        kind: "command",
        label: "Stocker un secret dans Vault",
        command: "vault kv put secret/mon-app DB_PASSWORD='mot-de-passe-temporaire'",
        why: "Écrit le secret `DB_PASSWORD` dans le moteur clé-valeur à l'emplacement `secret/mon-app`. La valeur est chiffrée au repos ; l'accès est soumis aux politiques Vault de votre identité. L'application le lit au démarrage via l'API ou l'agent Vault — jamais via une variable d'environnement versionnée.",
        verify: "vault kv get secret/mon-app",
      },
      {
        kind: "list",
        items: [
          "Politiques d'accès : chaque service ne lit que ses propres secrets (moindre privilège).",
          "Rotation : les secrets dynamiques expirent seuls ; les statiques se renouvellent via des procédures planifiées.",
          "En CI, préférez les identités OIDC éphémères aux tokens Vault longue durée (voir section suivante).",
          "Alternative managée : le gestionnaire de secrets de votre cloud (mêmes principes).",
        ],
      },
    ],
  },
  {
    id: "oidc-ephemere",
    title: "Identités éphémères avec OIDC",
    level: 3,
    intro:
      "Le pipeline s'authentifie sans aucun secret stocké : la fin des tokens longue durée.",
    blocks: [
      {
        kind: "text",
        text: "Le problème : pour déployer sur le cloud, la CI a besoin d'identifiants — historiquement un token longue durée stocké en secret. Le risque : ce token dort pendant des mois et, s'il fuit, donne un accès durable. La solution OIDC : le runner demande au fournisseur d'identité de la CI (ex. GitHub) un jeton d'identité éphémère prouvant « je suis le workflow X du dépôt Y », et le cloud l'échange contre des droits temporaires (quelques minutes). Aucun secret à stocker, à tourner, à fuiter.",
      },
      {
        kind: "code",
        language: "yaml",
        title: "Permission OIDC dans un workflow",
        code: "jobs:\n  deploy:\n    runs-on: ubuntu-latest\n    permissions:\n      id-token: write   # autorise la demande de jeton OIDC\n      contents: read\n    steps:\n      - uses: aws-actions/configure-aws-credentials@v4\n        with:\n          role-to-assume: arn:aws:iam::123456789012:role/ci-deploy\n          aws-region: eu-west-1",
      },
      {
        kind: "text",
        text: "Côté cloud, le rôle n'accepte que les jetons émis pour ce dépôt et cette branche : même volé, un jeton ne sert que quelques minutes et uniquement depuis ce pipeline. C'est le standard actuel pour l'authentification CI → cloud.",
      },
    ],
  },
  {
    id: "supply-chain",
    title: "Supply chain : signer et prouver",
    level: 3,
    intro:
      "Prouver que l'image déployée est bien celle que le pipeline a construite : signatures et provenance.",
    blocks: [
      {
        kind: "command",
        label: "Signer une image avec Cosign (keyless)",
        command: "cosign sign --yes registry.example.com/mon-app:v1.2.0",
        why: "Cosign (projet Sigstore) signe l'image avec une identité éphémère vérifiée via OIDC : aucune clé à gérer. La signature est enregistrée dans le registry et dans le journal public de transparence (Rekor). `--yes` évite les invites interactives en CI.",
        verify: "cosign verify registry.example.com/mon-app:v1.2.0 --certificate-identity-regexp='.*' --certificate-oidc-issuer-regexp='.*'",
      },
      {
        kind: "text",
        text: "La chaîne de confiance complète : le SBOM dit ce que contient l'image, Trivy dit que c'est sain, Cosign prouve qui l'a construite, et une policy d'admission (Kyverno, OPA Gatekeeper) refuse au déploiement toute image non signée. Chaque maillon est vérifiable indépendamment.",
      },
      {
        kind: "list",
        items: [
          "SLSA est le framework qui formalise ces niveaux de garantie (provenance vérifiable du build).",
          "Signez toujours le digest, jamais le tag : la signature porte sur un contenu exact.",
          "Commencez par signer les images critiques ; généralisez quand le processus est rodé.",
        ],
      },
    ],
  },
  {
    id: "cve-cvss",
    title: "CVE, CVSS, EPSS : lire une vulnérabilité",
    level: 3,
    intro:
      "Les rapports de scan parlent en CVE : comprendre ce que disent (et ne disent pas) ces identifiants.",
    blocks: [
      {
        kind: "fields",
        title: "Le vocabulaire des vulnérabilités",
        fields: [
          {
            label: "CVE",
            value:
              "Common Vulnerabilities and Exposures : l'identifiant unique d'une vulnérabilité connue (ex. CVE-2024-1234). C'est la clé qui relie les scanners, les bases et les correctifs.",
          },
          {
            label: "CVSS",
            value:
              "Common Vulnerability Scoring System : un score de 0 à 10 de la gravité théorique (vecteur d'attaque, complexité, impact). Base des sévérités LOW → CRITICAL des scanners.",
          },
          {
            label: "EPSS",
            value:
              "Exploit Prediction Scoring System : la probabilité estimée qu'une CVE soit exploitée dans les 30 jours. Complète le CVSS : une CVE critique jamais exploitée n'est pas la priorité.",
          },
          {
            label: "Correctif (fix)",
            value:
              "La version qui corrige la vulnérabilité, indiquée par les scanners. Pas de correctif = décision explicite : atténuer, accepter (documenté) ou remplacer le composant.",
          },
        ],
      },
      {
        kind: "text",
        text: "Priorisation pragmatique : corrigez d'abord les CVE critiques et hautes avec un correctif disponible ET un EPSS élevé (exploitables en pratique). Le CVSS seul sur-priorise des vulnérabilités théoriques ; l'exploitabilité réelle guide l'ordre de traitement.",
      },
    ],
  },
  {
    id: "seuils-politiques",
    title: "Seuils et politiques de blocage",
    level: 3,
    intro:
      "Quand le pipeline doit-il bloquer ? La politique de seuils, écrite et assumée.",
    blocks: [
      {
        kind: "table",
        headers: ["Sévérité", "Verdict recommandé", "Délai de correction indicatif"],
        rows: [
          ["CRITICAL (exploitable)", "Bloque le pipeline", "Immédiat — correctif ou rollback"],
          ["HIGH", "Bloque le pipeline", "Quelques jours"],
          ["MEDIUM", "Alerte, ne bloque pas", "Prochain sprint"],
          ["LOW", "Rapporté, backlog", "Opportuniste"],
        ],
      },
      {
        kind: "text",
        text: "Cette politique se discute en équipe et s'écrit (dans le repo, versionnée) : elle évite les débats à chaque finding. Prévoyez une procédure d'exception : un risque accepté temporairement, avec un responsable nommé et une date de réévaluation. Sans procédure d'exception, les équipes contournent les gates — et les gates meurent.",
      },
    ],
  },
  {
    id: "durcissement-images",
    title: "Durcir les images de conteneurs",
    level: 3,
    intro:
      "Une image minimale et non-root : moins de surface d'attaque à scanner, moins à exploiter.",
    blocks: [
      {
        kind: "code",
        language: "dockerfile",
        title: "Dockerfile durci (multi-stage, non-root)",
        code: "FROM node:20-slim AS build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:20-slim\nWORKDIR /app\nCOPY --from=build /app/dist ./dist\nCOPY --from=build /app/package*.json ./\nRUN npm ci --omit=dev && npm cache clean --force\nUSER node\nEXPOSE 3000\nCMD [\"node\", \"dist/index.js\"]",
      },
      {
        kind: "text",
        text: "Les trois durcissements essentiels : build multi-stage (les outils de compilation ne partent pas en production), image de base minimale (`-slim`, voire distroless pour les binaires statiques), exécution non-root (`USER node`). Chacun réduit les CVE détectées par Trivy et limite l'impact si le conteneur est compromis.",
      },
      {
        kind: "list",
        items: [
          "Épinglez la version exacte de l'image de base (`node:20.11-slim`, pas `node:slim`) : reproductibilité.",
          "`.dockerignore` strict : le contexte de build n'embarque ni `.git`, ni `node_modules` local, ni secrets.",
          "`hadolint` (linter de Dockerfile) s'intègre en CI comme n'importe quel lint.",
        ],
      },
    ],
  },
  {
    id: "policy-as-code",
    title: "Policy as code : Conftest et OPA",
    level: 3,
    intro:
      "Vérifier automatiquement que les configurations respectent les règles de l'équipe.",
    blocks: [
      {
        kind: "text",
        text: "Policy as code : exprimer les règles (« pas de conteneur en root », « toute ressource a un label d'équipe », « pas d'image `latest` ») dans un langage vérifiable, et les tester automatiquement avant déploiement. Open Policy Agent (OPA) est le moteur, Rego son langage ; Conftest est l'outil qui applique des politiques OPA à n'importe quel fichier de configuration.",
      },
      {
        kind: "command",
        label: "Tester des manifests contre des politiques",
        command: "conftest test -p policy/ deployment.yaml",
        why: "Évalue `deployment.yaml` contre les règles Rego du dossier `policy/` et échoue (code de sortie non nul) si une règle est violée. En CI, c'est le gate pré-déploiement : une configuration non conforme ne part jamais en production.",
        verify: "conftest --version",
      },
      {
        kind: "code",
        language: "rego",
        title: "policy/no_root.rego",
        code: "package main\n\ndeny[msg] {\n  input.kind == \"Deployment\"\n  container := input.spec.template.spec.containers[_]\n  not container.securityContext.runAsNonRoot\n  msg := sprintf(\"Le conteneur %s doit définir runAsNonRoot\", [container.name])\n}",
      },
      {
        kind: "text",
        text: "Cette règle refuse tout Deployment dont un conteneur n'impose pas l'exécution non-root. Les politiques vivent dans Git, se relisent en PR comme du code, et s'appliquent aussi bien en CI qu'en admission controller (OPA Gatekeeper) côté cluster.",
      },
    ],
  },
  {
    id: "kubernetes-policies",
    title: "Politiques Kubernetes : Pod Security Standards",
    level: 3,
    intro:
      "Les garde-fous natifs de Kubernetes pour les Pods : trois niveaux, du permissif au strict.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Appliquer un niveau à un namespace",
        code: "apiVersion: v1\nkind: Namespace\nmetadata:\n  name: production\n  labels:\n    pod-security.kubernetes.io/enforce: baseline\n    pod-security.kubernetes.io/audit: restricted\n    pod-security.kubernetes.io/warn: restricted",
      },
      {
        kind: "text",
        text: "Les Pod Security Standards définissent trois niveaux : `privileged` (aucune restriction), `baseline` (interdit les pratiques dangereuses connues : conteneurs privilégiés, montage du socket Docker…), `restricted` (le plus strict : non-root obligatoire, seccomp, pas d'écriture sur le filesystem…). Ici, `enforce: baseline` bloque les Pods non conformes en production, tandis que `audit`/`warn: restricted` signalent ce qui ne passerait pas le niveau strict — la trajectoire d'amélioration est tracée.",
      },
      {
        kind: "list",
        items: [
          "Pour des règles métier plus fines, Kyverno (politiques en YAML simple) ou OPA Gatekeeper complètent les standards natifs.",
          "Les NetworkPolicies (voir section suivante) contrôlent qui parle à qui : l'autre moitié de la sécurisation du cluster.",
        ],
      },
    ],
  },
  {
    id: "network-policies",
    title: "NetworkPolicies : le pare-feu du cluster",
    level: 3,
    intro:
      "Par défaut, tous les Pods peuvent parler à tous les Pods : les NetworkPolicies appliquent le moindre privilège au réseau.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "N'autoriser que le frontend vers l'API",
        code: "apiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: api-allow-frontend\nspec:\n  podSelector:\n    matchLabels:\n      app: api\n  policyTypes: [Ingress]\n  ingress:\n    - from:\n        - podSelector:\n            matchLabels:\n              app: frontend\n      ports:\n        - port: 3000",
      },
      {
        kind: "text",
        text: "Cette politique : seuls les Pods labellisés `app: frontend` peuvent joindre le port 3000 des Pods `app: api`. Tout le reste est refusé. Sans NetworkPolicy, un Pod compromis peut scanner tout le cluster : avec, son mouvement latéral est contenu.",
      },
      {
        kind: "text",
        text: "Prérequis technique : le CNI du cluster doit supporter les NetworkPolicies (Calico, Cilium…). Stratégie de déploiement : commencez en mode audit (politiques permissives + logs), resserrez progressivement — une politique trop stricte d'un coup coupe le trafic légitime.",
      },
    ],
  },
  {
    id: "rbac-minimal",
    title: "RBAC : le moindre privilège dans le cluster",
    level: 3,
    intro:
      "Qui peut faire quoi dans Kubernetes : ni plus, ni moins.",
    blocks: [
      {
        kind: "text",
        text: "Le RBAC Kubernetes (Role-Based Access Control) associe des identités (utilisateurs, comptes de service) à des permissions (verbes : get, list, create, delete) sur des ressources, dans un namespace (Role) ou tout le cluster (ClusterRole). Le pipeline de déploiement utilise un compte de service dédié avec uniquement les droits de déployer sur ses namespaces — jamais un admin de cluster.",
      },
      {
        kind: "list",
        items: [
          "Auditez régulièrement : `kubectl auth can-i --list` montre les droits effectifs d'une identité.",
          "Interdisez les ClusterRole `cluster-admin` liés à des comptes de service applicatifs.",
          "Les tokens de comptes de service sont des secrets : rotation et durée de vie courte.",
        ],
      },
    ],
  },
  {
    id: "github-token-permissions",
    title: "Permissions minimales du GITHUB_TOKEN",
    level: 3,
    intro:
      "Le token fourni par GitHub à chaque workflow : puissant par défaut, à restreindre explicitement.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Déclarer le minimum nécessaire",
        code: "permissions:\n  contents: read\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci && npm test\n\n  publish:\n    needs: test\n    permissions:\n      contents: read\n      packages: write\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo \"publication…\"",
      },
      {
        kind: "text",
        text: "Le job `test` ne lit que le code ; seul `publish` peut écrire dans les packages. Si un workflow est compromis (action malveillante, injection via une PR), les dégâts sont limités à ses permissions déclarées. Activez aussi les réglages du dépôt qui restreignent les permissions par défaut du `GITHUB_TOKEN`.",
      },
    ],
  },
  {
    id: "pinning-actions",
    title: "Épingler les actions tierces",
    level: 3,
    intro:
      "Une action `@v4` peut changer de contenu : l'épinglage par SHA fige ce que vous exécutez.",
    blocks: [
      {
        kind: "text",
        text: "Les tags de version des actions (`@v4`) sont mobiles : le mainteneur peut les déplacer. Pour les pipelines critiques, épinglez le SHA du commit (`actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683`) avec un commentaire indiquant la version (`# v4.2.2`). Compromis pragmatique : SHA en production, tags en développement — et une tâche planifiée pour mettre à jour les épinglages (Dependabot le fait nativement).",
      },
      {
        kind: "list",
        items: [
          "N'utilisez jamais `@main` ou `@master` : c'est une branche qui peut changer à tout moment.",
          "Auditez les actions tierces avant de les adopter : mainteneur, popularité, permissions demandées.",
          "Préférez les actions officielles (`actions/`, `docker/`) aux actions obscures quand c'est possible.",
        ],
      },
    ],
  },
  {
    id: "branch-protection",
    title: "Protection des branches",
    level: 3,
    intro:
      "Empêcher techniquement ce que la convention n'empêche pas : la branche principale se protège.",
    blocks: [
      {
        kind: "list",
        items: [
          "Interdire le push direct sur `main` : tout passe par pull request.",
          "Exiger un pipeline vert avant le merge : les gates de sécurité deviennent non contournables.",
          "Exiger au moins une revue approbatrice (deux pour les zones critiques).",
          "Exiger des branches à jour avant le merge : la PR est testée avec le code actuel de `main`.",
          "Restreindre qui peut forcer un push ou contourner les règles (administrateurs uniquement, avec audit).",
          "Signer les commits (GPG/SSH) pour les dépôts sensibles : prouve l'auteur réel.",
        ],
      },
      {
        kind: "code",
        language: "text",
        title: "CODEOWNERS",
        code: "src/auth/       @equipe-securite\n.github/workflows/ @equipe-platform\n*.tf           @equipe-infra",
      },
      {
        kind: "text",
        text: "Le fichier `CODEOWNERS` désigne les relecteurs obligatoires par chemin : toute PR touchant `src/auth/` exige l'approbation de l'équipe sécurité. La protection de branche + CODEOWNERS = les bonnes personnes relisent obligatoirement les zones sensibles.",
      },
    ],
  },
  {
    id: "gestion-vulnerabilites",
    title: "Gérer les vulnérabilités dans le temps",
    level: 3,
    intro:
      "Découvrir, c'est 10 % du travail : prioriser, corriger, vérifier, c'est le reste.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Inventorier",
            detail:
              "SBOM de chaque release + scans réguliers : on ne corrige que ce qu'on connaît. Planifiez un scan complet hebdomadaire en plus des gates CI.",
          },
          {
            title: "Prioriser",
            detail:
              "Sévérité (CVSS) × exploitabilité (EPSS, exploit public ?) × exposition (internet ou interne ?). Une CVE critique sur un service exposé passe avant une CVE haute sur un outil interne.",
          },
          {
            title: "Corriger",
            detail:
              "Mettre à jour vers la version corrigée (d'abord en dev, tests, puis production). Si pas de correctif : atténuation (désactiver la fonctionnalité, filtrer au WAF, isoler le service).",
          },
          {
            title: "Vérifier",
            detail:
              "Re-scanner après correction : le finding doit disparaître du rapport. Le pipeline bloque toute régression (la dépendance vulnérable ne peut pas revenir).",
          },
          {
            title: "Documenter",
            detail:
              "Exceptions restantes : risque accepté, responsable, date de réévaluation. L'historique des décisions est auditable.",
          },
        ],
      },
    ],
  },
  {
    id: "reponse-incident",
    title: "Réponse à incident : les réflexes",
    level: 3,
    intro:
      "Quand une alerte sécurité se déclenche en production : la méthode, pas la panique.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Contenir",
            detail:
              "Isoler le système affecté (couper du réseau, révoquer les tokens suspects) sans l'éteindre si l'analyse forensique est prévue : la mémoire vive contient des preuves.",
          },
          {
            title: "Révoquer et tourner",
            detail:
              "Tous les secrets potentiellement exposés sont révoqués et régénérés : clés API, tokens CI, certificats. Dans le doute, on tourne large.",
          },
          {
            title: "Préserver les preuves",
            detail:
              "Logs, images disque, SBOM de la release : copiés et horodatés avant toute remise en service. La chaîne de conservation commence ici.",
          },
          {
            title: "Éradiquer et restaurer",
            detail:
              "Revenir à un état sain connu (artefact précédent, infrastructure re-provisionnée depuis le code), pas « nettoyer » un système compromis.",
          },
          {
            title: "Post-mortem sans blâme",
            detail:
              "Qu'est-ce qui a manqué dans le pipeline ? Quel gate aurait bloqué ? Le correctif porte sur le processus, et les leçons sont partagées.",
          },
        ],
      },
      {
        kind: "text",
        text: "Un playbook écrit à l'avance (qui fait quoi, dans quel ordre, avec quels contacts) transforme un incident en procédure. L'écrire pendant l'incident, c'est déjà avoir perdu.",
      },
    ],
  },
  {
    id: "conformite",
    title: "Conformité : SOC 2, ISO 27001, NIS2",
    level: 3,
    intro:
      "Les référentiels que les clients et régulateurs exigent : ce que le DevSecOps y apporte.",
    blocks: [
      {
        kind: "text",
        text: "SOC 2 (pratiques de sécurité des prestataires, courant aux US), ISO 27001 (management de la sécurité de l'information, international), NIS2 (directive européenne pour les secteurs critiques) : tous exigent, sous des formes différentes, les mêmes fondamentaux — contrôle des changements, gestion des vulnérabilités, traçabilité, gestion des accès. Un pipeline DevSecOps mature produit naturellement les preuves : historique Git, logs de CI, SBOM, rapports de scan, approbations de déploiement.",
      },
      {
        kind: "list",
        items: [
          "La conformité suit la pratique, pas l'inverse : un pipeline sain rend l'audit facile, pas l'inverse.",
          "Conservez les preuves (logs, SBOM, rapports) selon les durées exigées par vos obligations.",
          "Les référentiels évoluent : désignez un responsable du suivi, ne le découvrez pas la veille de l'audit.",
        ],
      },
    ],
  },
  {
    id: "audit-logs",
    title: "Journaux d'audit",
    level: 3,
    intro:
      "Qui a fait quoi, quand : la piste d'audit du pipeline et de la plateforme.",
    blocks: [
      {
        kind: "list",
        items: [
          "Git : chaque changement est signé par un auteur et horodaté — l'historique est la première piste d'audit.",
          "CI : qui a lancé quel workflow, avec quels paramètres, quel résultat — conservé par la plateforme.",
          "Déploiements : approbateur, artefact (SHA/digest), environnement cible, heure — enregistré à chaque promotion.",
          "Coffre de secrets : chaque lecture est journalisée (qui a lu quel secret, quand).",
          "Cluster : l'audit log Kubernetes trace les appels API (qui a modifié quel objet).",
          "Centralisez ces journaux (immuables, horodatés, conservés) : dispersés, ils sont inutilisables le jour d'un incident.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pièges classiques du DevSecOps, et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "La fatigue des scans",
            value:
              "Problem : des centaines de findings non triés que plus personne ne lit. Why : on a activé tous les scanners d'un coup sans politique de seuils. Better : commencer par bloquer uniquement CRITICAL/HIGH, traiter le backlog par priorité, élargir ensuite.",
          },
          {
            label: "Tout bloquer par défaut",
            value:
              "Problem : le pipeline bloque sur des findings mineurs, les équipes le contournent. Why : confondre sévérité théorique et risque réel. Better : bloquer sur le risque réel (exploitabilité × exposition), alerter sur le reste.",
          },
          {
            label: "Scanner sans corriger",
            value:
              "Problem : des rapports générés, archivés, jamais lus. Why : personne n'est responsable des findings. Better : chaque finding a un propriétaire (l'auteur du code) et un délai.",
          },
          {
            label: "Secrets dans les variables CI en clair",
            value:
              "Problem : un token collé dans une variable non chiffrée ou dans le YAML. Why : « c'est plus rapide ». Better : secrets chiffrés de la plateforme, portée minimale, rotation.",
          },
          {
            label: "Ignorer les dépendances transitives",
            value:
              "Problem : on met à jour ses dépendances directes mais la CVE est trois niveaux plus bas. Why : on ne regarde que le premier niveau. Better : les scanners couvrent le transitif — lisez leurs rapports en entier.",
          },
          {
            label: "Désactiver une règle au lieu de corriger",
            value:
              "Problem : `# nosemgrep` partout pour faire passer la CI. Why : la pression du delivery. Better : suppression ciblée + justification écrite, revue comme du code.",
          },
          {
            label: "SBOM généré mais jamais stocké",
            value:
              "Problem : le SBOM est produit puis jeté à la fin du run. Why : personne n'a défini où l'archiver. Better : archivé avec chaque release (version + SHA + date), requêtable.",
          },
          {
            label: "La sécurité comme équipe séparée",
            value:
              "Problem : « la sécu » valide à la fin, les devs subissent. Why : organisation héritée. Better : l'équipe sécurité outille et conseille, les développeurs corrigent dans leur flux.",
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
        title: "Débutant — Hygiène des secrets",
        fields: [
          { label: "Compétences requises", value: "Git, ligne de commande" },
          { label: "Ce que vous construisez", value: "Hook pre-commit Gitleaks + scan complet de l'historique de vos dépôts, `.gitignore` durci" },
          { label: "Ce que vous apprenez", value: "Le cycle de vie d'un secret, la différence entre prévenir et guérir" },
          { label: "Difficulté attendue", value: "Faible — quelques heures" },
          { label: "Projet suivant", value: "Gates de scan en CI" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Gates de sécurité en CI",
        fields: [
          { label: "Compétences requises", value: "CI/CD, Semgrep, Trivy" },
          { label: "Ce que vous construisez", value: "Pipeline avec SAST, scan de dépendances et scan d'image, seuils de blocage documentés" },
          { label: "Ce que vous apprenez", value: "L'équilibre entre sécurité et vélocité, le tri des findings" },
          { label: "Difficulté attendue", value: "Moyenne — une semaine" },
          { label: "Projet suivant", value: "Coffre de secrets" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Secrets et supply chain",
        fields: [
          { label: "Compétences requises", value: "Vault, OIDC, SBOM" },
          { label: "Ce que vous construisez", value: "Secrets dynamiques via Vault, auth CI sans secret stocké (OIDC), SBOM signé avec chaque release" },
          { label: "Ce que vous apprenez", value: "La gestion des secrets en production, la provenance" },
          { label: "Difficulté attendue", value: "Élevée — deux semaines" },
          { label: "Projet suivant", value: "Policy as code" },
        ],
      },
      {
        kind: "fields",
        title: "Professionnel — Programme DevSecOps complet",
        fields: [
          { label: "Compétences requises", value: "Tout le programme : SAST/DAST, policy as code, conformité" },
          { label: "Ce que vous construisez", value: "DAST planifié sur staging, politiques OPA en CI et en admission, gestion des vulnérabilités avec SLA, playbook d'incident" },
          { label: "Ce que vous apprenez", value: "Le DevSecOps comme programme continu, pas comme projet" },
          { label: "Difficulté attendue", value: "Professionnelle — plusieurs semaines" },
          { label: "Projet suivant", value: "Contribuer aux règles Semgrep communautaires" },
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
          { label: "OWASP DevSecOps Guideline", value: "Le guide de référence : maturité, contrôles, intégration au pipeline." },
          { label: "Documentation Trivy", value: "Tous les modes de scan (image, fs, repo, SBOM) et options de gates." },
          { label: "Documentation Semgrep", value: "Écriture de règles, rulesets, intégration CI." },
          { label: "Documentation Gitleaks", value: "Configuration, pre-commit, gestion des faux positifs." },
          { label: "Documentation Sigstore/Cosign", value: "Signature keyless, vérification, attestations." },
        ],
      },
      {
        kind: "list",
        items: [
          "Référence : les bases CVE (nomenclatures officielles) pour creuser une vulnérabilité précise.",
          "Pratique : scanner vos propres projets — les findings réels enseignent mieux que les tutoriels.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "DevSecOps maîtrisé, voici les prolongements naturels dans la roadmap DevOps.",
    blocks: [
      {
        kind: "list",
        items: [
          "Consolider la base : `ci-cd` — un pipeline solide est le socle de tous les contrôles.",
          "Sécuriser l'orchestration : `kubernetes` — RBAC, NetworkPolicies, Pod Security Standards en profondeur.",
          "Coder l'infrastructure : `iac` — scanner aussi le Terraform (Checkov, tfsec) comme du code.",
          "Détecter en production : `monitoring` — des scans aux alertes runtime, la boucle complète.",
          "Revenir à la roadmap : valider DevSecOps et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
  {
    id: "threat-modeling",
    title: "Threat modeling : penser comme un défenseur",
    level: 3,
    intro:
      "Avant d'ajouter des contrôles : identifier ce qu'on protège et contre quoi.",
    blocks: [
      {
        kind: "text",
        text: "Le threat modeling (modélisation des menaces) est un exercice d'équipe : on dessine l'architecture (données, flux, zones de confiance) et on se demande systématiquement « qu'est-ce qui peut mal tourner ici ? ». Le cadre STRIDE structure la réflexion : Spoofing (usurpation), Tampering (altération), Repudiation (répudiation), Information disclosure (fuite), Denial of service, Elevation of privilege.",
      },
      {
        kind: "list",
        items: [
          "À faire en début de projet et à chaque changement d'architecture majeur — pas après l'incident.",
          "Chaque menace identifiée devient une exigence : contrôle, test ou risque accepté (documenté).",
          "Côté pipeline : le threat model du pipeline lui-même (qui peut pousser ? qui peut modifier les secrets ?) est souvent oublié.",
          "L'outil importe moins que le rituel : un tableau blanc et STRIDE suffisent pour commencer.",
        ],
      },
    ],
  },
  {
    id: "dependances-auto",
    title: "Dépendances : mises à jour automatiques",
    level: 3,
    intro:
      "Les vulnérabilités arrivent par les dépendances : les mettre à jour sans y penser.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: ".github/dependabot.yml",
        code: "version: 2\nupdates:\n  - package-ecosystem: \"pip\"\n    directory: \"/\"\n    schedule:\n      interval: \"weekly\"\n  - package-ecosystem: \"docker\"\n    directory: \"/\"\n    schedule:\n      interval: \"weekly\"",
      },
      {
        kind: "text",
        text: "Dependabot (GitHub) ou Renovate ouvrent des PR automatiques quand une dépendance a une mise à jour : la CI les teste, un humain les fusionne. Couplé au scan SCA, le flux devient : vulnérabilité détectée → PR de mise à jour → tests → merge. Le retard de patching — la cause n°1 des compromissions — disparaît.",
      },
      {
        kind: "list",
        items: [
          "Les mises à jour de sécurité sont prioritaires : fusionnez-les vite, les autres peuvent attendre le créneau hebdo.",
          "Épinglez les versions (`==`) et laissez l'automatisation proposer les montées : reproductible ET à jour.",
          "Surveillez les PR Dependabot ignorées : une mise à jour qui traîne 3 mois est une vulnérabilité acceptée tacitement.",
        ],
      },
    ],
  },
  {
    id: "security-champions",
    title: "Culture : security champions",
    level: 3,
    intro:
      "La sécurité ne scale pas avec une équipe centrale seule : elle se diffuse.",
    blocks: [
      {
        kind: "text",
        text: "Le modèle des security champions : dans chaque équipe produit, un développeur formé à la sécurité fait le relais — il participe aux revues sensibles, diffuse les bonnes pratiques et remonte les besoins. L'équipe sécurité centrale fournit les outils et les guardrails ; les champions portent la culture au quotidien.",
      },
      {
        kind: "list",
        items: [
          "Formez les champions (bases OWASP, lecture de rapports de scan) : un relais non formé est un titre vide.",
          "Donnez-leur du temps dédié : la sécurité ne se fait pas « en plus » du delivery.",
          "Mesurez : délai de correction des vulnérabilités par équipe — ce qui se mesure s'améliore.",
          "Célébrez les corrections : la sécurité est un travail d'équipe, pas une police.",
        ],
      },
    ],
  },
];

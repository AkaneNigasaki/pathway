import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Helm : de l'installation de charts à la création
 * et l'opération de charts professionnels. 3 niveaux (Aperçu / Pratique /
 * Approfondi) avec divulgation progressive. Tous les textes supportent le
 * code inline entre backticks.
 */
export const LEARNING_HELM: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce que Helm change au déploiement d'applications sur Kubernetes.",
    blocks: [
      {
        kind: "text",
        text: "Helm est le gestionnaire de paquets de Kubernetes. Il regroupe les manifestes d'une application dans un « chart » : un paquet versionné, paramétrable et partageable. Au lieu d'appliquer des dizaines de fichiers YAML à la main, on installe, met à jour ou désinstalle une application en une commande.",
      },
      {
        kind: "text",
        text: "L'idée centrale : séparer le « quoi déployer » (les templates) du « comment le configurer » (les values). Le même chart déploie l'application en développement, en staging et en production — seules les valeurs changent.",
      },
      {
        kind: "diagram",
        title: "Helm en une image",
        lines: [
          "Chart (paquet)",
          " ├── Chart.yaml      → identité et version du paquet",
          " ├── values.yaml     → paramètres par défaut",
          " └── templates/      → manifestes avec variables",
          "         │",
          "         ▼",
          "helm install mon-app ./mon-chart -f values-prod.yaml",
          "         │",
          "         ▼",
          "Release (instance installée, versionnée, réversible)",
        ],
      },
    ],
  },
  {
    id: "pourquoi-helm",
    title: "Pourquoi Helm plutôt que du YAML à la main",
    level: 1,
    intro:
      "Le problème concret que Helm résout, et ce qu'il n'est pas.",
    blocks: [
      {
        kind: "list",
        items: [
          "Sans Helm : pour chaque environnement, il faut dupliquer ou éditer les manifestes (image, replicas, ingress). Les différences dérivent vite, et un déploiement devient une opération manuelle fragile.",
          "Avec Helm : les manifestes sont des templates paramétrés. Un seul chart, plusieurs fichiers de valeurs (`values-dev.yaml`, `values-prod.yaml`). La configuration est explicite et versionnée.",
          "Helm versionne chaque installation (« release ») : chaque `upgrade` crée une révision numérotée, et `rollback` revient en arrière en une commande.",
          "Helm n'est pas un outil de CI, ni un orchestrateur de plus haut niveau : il ne fait que rendre et appliquer des manifestes Kubernetes, de façon reproductible.",
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
      "Ce qu'il faut maîtriser avant de toucher à Helm — sinon chaque erreur semblera venir de Helm alors qu'elle vient d'en dessous.",
    blocks: [
      {
        kind: "fields",
        title: "Socle nécessaire",
        fields: [
          {
            label: "Kubernetes",
            value:
              "Savoir ce qu'est un Pod, un Deployment, un Service et un namespace, et lire un manifeste YAML. Helm ne fait que générer ces objets : si leur sémantique est floue, les erreurs de templates seront incompréhensibles.",
          },
          {
            label: "`kubectl`",
            value:
              "Appliquer, lister, décrire et supprimer des ressources (`kubectl get`, `kubectl describe`). Indispensable pour vérifier ce que Helm a réellement installé.",
          },
          {
            label: "YAML",
            value:
              "Indentation, mappings, listes. La quasi-totalité des erreurs Helm débutant sont des erreurs d'indentation YAML dans les values ou les templates.",
          },
          {
            label: "Ligne de commande",
            value:
              "Être à l'aise avec un terminal : Helm est un binaire CLI, toute son utilisation passe par des commandes.",
          },
        ],
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Installer le binaire Helm et vérifier qu'il fonctionne.",
    blocks: [
      {
        kind: "command",
        label: "Installer Helm (macOS)",
        command: "brew install helm",
        why: "Installe la dernière version stable de Helm via Homebrew. Sur Linux, le script officiel (`https://helm.sh/docs/intro/install/`) ou le gestionnaire de paquets de la distribution font le même travail : le résultat est un unique binaire `helm`.",
        verify: "helm version --short",
      },
      {
        kind: "text",
        text: "Helm 3 n'a plus de composant serveur (l'ancien Tiller de Helm 2 a disparu) : le binaire parle directement à l'API Kubernetes en utilisant votre `kubeconfig`, exactement comme `kubectl`. Si `kubectl` fonctionne, Helm fonctionnera.",
      },
    ],
  },
  {
    id: "repos-de-charts",
    title: "Dépôts de charts",
    level: 2,
    intro:
      "D'où viennent les charts publics : ajouter un dépôt, le mettre à jour, chercher un chart.",
    blocks: [
      {
        kind: "command",
        label: "Ajouter un dépôt de charts",
        command: "helm repo add bitnami https://charts.bitnami.com/bitnami",
        why: "Enregistre le catalogue Bitnami sous le nom `bitnami`. Un dépôt est simplement une URL qui expose un index de charts versionnés ; `helm` s'en sert pour résoudre `bitnami/<chart>` lors de l'installation.",
        verify: "helm repo list",
      },
      {
        kind: "command",
        label: "Mettre à jour l'index local des dépôts",
        command: "helm repo update",
        why: "Télécharge les index à jour de tous les dépôts enregistrés. Sans cette commande, `helm search` et `helm install` ne voient que les versions connues au moment du `repo add` — une cause classique de « chart introuvable ».",
        verify: "helm search repo bitnami/nginx",
      },
      {
        kind: "text",
        text: "Pour explorer ce qui existe avant d'installer quoi que ce soit, `https://artifacthub.io/` est l'annuaire public des charts (et autres artefacts cloud-native) : on y lit la documentation d'un chart, ses valeurs par défaut et ses versions.",
      },
    ],
  },
  {
    id: "premier-install",
    title: "Premier `helm install`",
    level: 2,
    intro:
      "Installer une application réelle depuis un chart public, en comprenant chaque partie de la commande.",
    blocks: [
      {
        kind: "command",
        label: "Installer nginx depuis le dépôt Bitnami",
        command: "helm install mon-nginx bitnami/nginx",
        why: "`mon-nginx` est le nom de la release (l'instance installée), `bitnami/nginx` le chart. Helm rend les templates avec les valeurs par défaut du chart et applique les manifestes sur le cluster configuré dans le `kubeconfig` courant.",
        verify: "helm status mon-nginx",
      },
      {
        kind: "text",
        text: "Trois notions à fixer dès maintenant : le **chart** est le paquet (réutilisable), la **release** est l'instance installée (nommée, versionnée), les **values** sont les paramètres injectés dans les templates. On peut installer le même chart dix fois sous dix noms de release différents.",
      },
    ],
  },
  {
    id: "helm-create",
    title: "Créer son premier chart",
    level: 2,
    intro:
      "Générer la structure d'un chart avec `helm create`, et comprendre ce qui est produit.",
    blocks: [
      {
        kind: "command",
        label: "Générer un chart vierge",
        command: "helm create mon-app",
        why: "Crée un dossier `mon-app/` avec une structure de chart fonctionnelle : `Chart.yaml`, `values.yaml`, `templates/` et un fichier de tests. C'est le point de départ standard — on adapte ensuite les templates à son application plutôt que de partir de zéro.",
        verify: "ls mon-app",
      },
      {
        kind: "diagram",
        title: "Structure générée par `helm create`",
        lines: [
          "mon-app/",
          "├── Chart.yaml            → nom, version, description du chart",
          "├── values.yaml           → valeurs par défaut",
          "├── charts/               → dépendances (sous-charts)",
          "└── templates/",
          "    ├── deployment.yaml   → template du Deployment",
          "    ├── service.yaml      → template du Service",
          "    ├── ingress.yaml      → template de l'Ingress",
          "    ├── _helpers.tpl      → fonctions réutilisables",
          "    ├── NOTES.txt         → message affiché après install",
          "    └── tests/            → tests `helm test`",
        ],
      },
    ],
  },
  {
    id: "structure-dun-chart",
    title: "Anatomie d'un chart",
    level: 2,
    intro:
      "Le rôle de chaque fichier : ce qui décrit, ce qui paramètre, ce qui se rend.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois piliers",
        fields: [
          {
            label: "`Chart.yaml`",
            value:
              "La carte d'identité du paquet : nom, version du chart, `appVersion` (version de l'application embarquée), description, dépendances. La version du chart suit semver et s'incrémente à chaque modification publiée.",
          },
          {
            label: "`values.yaml`",
            value:
              "Les paramètres par défaut : image, nombre de replicas, ressources, activation de l'ingress… C'est le seul fichier qu'un utilisateur du chart devrait avoir besoin de toucher.",
          },
          {
            label: "`templates/`",
            value:
              "Les manifestes Kubernetes avec des expressions `{{ ... }}` qui seront remplacées par les valeurs au moment du rendu. Tout fichier YAML placé ici est rendu puis appliqué.",
          },
        ],
      },
    ],
  },
  {
    id: "values-et-personnalisation",
    title: "Personnaliser avec les values",
    level: 2,
    intro:
      "Trois façons de surcharger les valeurs, par ordre de priorité croissant.",
    blocks: [
      {
        kind: "command",
        label: "Surcharger une valeur à la volée",
        command: "helm install mon-nginx bitnami/nginx --set replicaCount=3",
        why: "`--set` modifie une valeur directement depuis la ligne de commande, pratique pour un test rapide. Pour des configurations sérieuses, on préfère un fichier : `--set` devient vite illisible et n'est pas versionnable.",
      },
      {
        kind: "command",
        label: "Utiliser un fichier de valeurs dédié",
        command: "helm install mon-nginx bitnami/nginx -f values-prod.yaml",
        why: "`-f` (ou `--values`) charge un fichier YAML dont les valeurs écrasent celles du chart. C'est la pratique standard : un fichier par environnement (`values-dev.yaml`, `values-prod.yaml`), versionné dans Git à côté du chart.",
        verify: "helm get values mon-nginx",
      },
      {
        kind: "list",
        items: [
          "Ordre de priorité (le dernier gagne) : valeurs par défaut du chart < fichier `-f` < `--set`. Plusieurs `-f` se cumulent dans l'ordre donné.",
          "`helm show values bitnami/nginx` affiche toutes les valeurs par défaut d'un chart public avec leurs commentaires : c'est la documentation de configuration du chart.",
          "Ne jamais modifier les templates pour changer un paramètre : si une valeur manque, on l'ajoute aux values et on la référence dans le template.",
        ],
      },
    ],
  },
  {
    id: "upgrade-et-historique",
    title: "`upgrade` et historique des releases",
    level: 2,
    intro:
      "Mettre à jour une release, et voir l'historique des révisions.",
    blocks: [
      {
        kind: "command",
        label: "Mettre à jour une release",
        command: "helm upgrade mon-nginx bitnami/nginx -f values-prod.yaml",
        why: "Applique une nouvelle configuration (ou une nouvelle version du chart) à la release existante. Chaque upgrade crée une nouvelle révision numérotée, conservée dans l'historique — c'est ce qui rend le rollback possible.",
        verify: "helm history mon-nginx",
      },
      {
        kind: "text",
        text: "`helm history <release>` liste les révisions avec leur statut (`deployed`, `superseded`, `failed`) et une description. `helm upgrade --install` (souvent abrégé en pratique) installe la release si elle n'existe pas encore, sinon la met à jour : une seule commande idempotente pour les scripts et la CI.",
      },
    ],
  },
  {
    id: "rollback",
    title: "Rollback",
    level: 2,
    intro:
      "Revenir à une révision précédente quand un déploiement tourne mal.",
    blocks: [
      {
        kind: "command",
        label: "Revenir à la révision 1",
        command: "helm rollback mon-nginx 1",
        why: "Restaure l'état exact de la révision 1 (manifestes rendus à l'époque). Le rollback crée lui-même une nouvelle révision : l'historique reste complet et on peut encore revenir en avant.",
        verify: "helm history mon-nginx",
      },
      {
        kind: "text",
        text: "Limite à connaître : le rollback restaure les manifestes, pas les données. Si la révision 2 a migré une base de données, revenir à la révision 1 ne défait pas la migration — les changements d'état externes au chart exigent leur propre stratégie.",
      },
    ],
  },
  {
    id: "uninstall",
    title: "Désinstaller proprement",
    level: 2,
    intro:
      "Supprimer une release et comprendre ce qui reste derrière.",
    blocks: [
      {
        kind: "command",
        label: "Désinstaller une release",
        command: "helm uninstall mon-nginx",
        why: "Supprime toutes les ressources créées par la release. Par défaut, l'historique est aussi effacé ; avec `--keep-history`, l'historique est conservé (utile pour l'audit) mais la release ne peut plus être réinstallée sous le même nom sans `helm upgrade --install`.",
        verify: "helm list",
      },
      {
        kind: "text",
        text: "Attention : les ressources créées en dehors du chart (volumes persistants provisionnés, données) ne sont pas toujours supprimées. Vérifier avec `kubectl get` dans le namespace après un uninstall, surtout pour les bases de données.",
      },
    ],
  },
  {
    id: "lister-et-inspecter",
    title: "Lister et inspecter",
    level: 2,
    intro:
      "Voir ce qui est installé et auditer une release existante.",
    blocks: [
      {
        kind: "command",
        label: "Lister les releases",
        command: "helm list",
        why: "Affiche les releases du namespace courant : nom, révision déployée, statut, version du chart et de l'application. Ajouter `-A` pour tous les namespaces.",
      },
      {
        kind: "command",
        label: "Voir les valeurs effectives d'une release",
        command: "helm get values mon-nginx",
        why: "Affiche les valeurs réellement utilisées (surcharges comprises), pas les défauts du chart. Indispensable pour diagnostiquer « pourquoi la release ne ressemble pas à ce que j'ai demandé ».",
      },
      {
        kind: "command",
        label: "Voir les manifestes appliqués",
        command: "helm get manifest mon-nginx",
        why: "Affiche le YAML final rendu et appliqué sur le cluster. Quand un Pod ne démarre pas, on compare ce manifeste à ce que `kubectl describe` rapporte.",
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Workflow quotidien",
    level: 2,
    intro:
      "L'enchaînement de commandes d'une journée normale avec Helm.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Mettre à jour les dépôts",
            detail:
              "`helm repo update` en début de session pour travailler sur les dernières versions des charts publics.",
          },
          {
            title: "Rendre en local avant d'appliquer",
            detail:
              "`helm template ma-release ./mon-chart -f values-dev.yaml` pour voir le YAML généré sans toucher au cluster. Le réflexe qui évite la plupart des mauvaises surprises.",
          },
          {
            title: "Installer ou mettre à jour",
            detail:
              "`helm upgrade --install ma-release ./mon-chart -f values-dev.yaml` : une seule commande qui couvre les deux cas.",
          },
          {
            title: "Vérifier",
            detail:
              "`helm status ma-release` puis `kubectl get pods` pour confirmer que les ressources sont saines.",
          },
          {
            title: "Itérer",
            detail:
              "Modifier les values, relancer `helm upgrade`, contrôler avec `helm history`. En cas de régression : `helm rollback`.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "chart-yaml",
    title: "Chart.yaml en détail",
    level: 3,
    intro: "Chaque champ de la carte d'identité du chart, et ce qu'il implique.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Chart.yaml minimal et correct",
        code: `apiVersion: v2\nname: mon-app\ndescription: Mon application web\ntype: application\nversion: 0.1.0\nappVersion: "1.16.0"`,
      },
      {
        kind: "fields",
        title: "Champ par champ",
        fields: [
          {
            label: "`apiVersion: v2`",
            value:
              "Version du format de chart. `v2` est le format moderne (Helm 3) : les dépendances se déclarent directement dans `Chart.yaml`, sans fichier `requirements.yaml` séparé comme en v1.",
          },
          {
            label: "`name`",
            value:
              "Nom du chart, en minuscules avec tirets. Il apparaît dans les noms de ressources générés via les helpers (`{{ include \"mon-app.fullname\" . }}`).",
          },
          {
            label: "`type: application`",
            value:
              "Type de chart : `application` (déploie des ressources) ou `library` (fournit uniquement des templates réutilisables via `define`, sans rien installer lui-même).",
          },
          {
            label: "`version`",
            value:
              "Version du chart lui-même, en semver. Chaque modification publiée du chart incrémente cette version — c'est elle que les dépôts et `helm upgrade` utilisent pour détecter les mises à jour.",
          },
          {
            label: "`appVersion`",
            value:
              "Version de l'application embarquée (ex. version de l'image Docker par défaut). Changer l'image sans changer le chart n'a pas de sens pour les consommateurs : on bump généralement les deux ensemble.",
          },
        ],
      },
    ],
  },
  {
    id: "values-yaml",
    title: "Concevoir un bon values.yaml",
    level: 3,
    intro: "Le values.yaml est l'interface publique du chart : il doit être lisible, commenté et complet.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "values.yaml bien structuré",
        code: `# Nombre de replicas du Deployment\nreplicaCount: 2\n\nimage:\n  repository: nginx\n  tag: "1.27"\n  pullPolicy: IfNotPresent\n\nservice:\n  type: ClusterIP\n  port: 80\n\ningress:\n  enabled: false\n  host: mon-app.example.com\n\nresources:\n  limits:\n    cpu: 500m\n    memory: 512Mi\n  requests:\n    cpu: 100m\n    memory: 128Mi`,
      },
      {
        kind: "list",
        items: [
          "Commenter chaque bloc : un values.yaml sans commentaires oblige à lire les templates pour comprendre les paramètres.",
          "Regrouper par thème (`image.*`, `service.*`, `ingress.*`) plutôt qu'à plat : les valeurs imbriquées se surchargent avec `--set image.tag=1.28`.",
          "Fournir des défauts sensés qui permettent `helm install` sans aucun `-f` sur un cluster de dev.",
          "Ne jamais mettre de secret en clair dans `values.yaml` : voir la section dédiée.",
        ],
      },
    ],
  },
  {
    id: "templates-syntaxe",
    title: "Syntaxe des templates",
    level: 3,
    intro: "Les expressions `{{ }}` : comment les valeurs deviennent du YAML.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Template de Deployment paramétré",
        code: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: {{ .Release.Name }}-web\nspec:\n  replicas: {{ .Values.replicaCount }}\n  selector:\n    matchLabels:\n      app: {{ .Release.Name }}\n  template:\n    metadata:\n      labels:\n        app: {{ .Release.Name }}\n    spec:\n      containers:\n        - name: web\n          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"\n          ports:\n            - containerPort: 80`,
      },
      {
        kind: "text",
        text: "Le point `.` représente le contexte courant (l'objet racine du rendu). `{{ .Values.replicaCount }}` injecte la valeur ; les guillemets autour de l'image sont importants : sans eux, certaines valeurs produiraient du YAML invalide. Les espaces `{{- ... -}}` (tirets) contrôlent les sauts de ligne pour garder un YAML propre.",
      },
    ],
  },
  {
    id: "objets-integres",
    title: "Objets intégrés",
    level: 3,
    intro: "Les objets toujours disponibles dans un template, sans rien importer.",
    blocks: [
      {
        kind: "fields",
        title: "Référence",
        fields: [
          {
            label: "`.Values`",
            value:
              "Les valeurs fusionnées (défauts du chart + `-f` + `--set`). C'est l'objet le plus utilisé : `{{ .Values.service.port }}`.",
          },
          {
            label: "`.Release`",
            value:
              "Informations sur la release : `.Release.Name` (nom donné à l'install), `.Release.Namespace`, `.Release.Revision`, `.Release.Service` (toujours `Helm`).",
          },
          {
            label: "`.Chart`",
            value:
              "Contenu de `Chart.yaml` : `.Chart.Name`, `.Chart.Version`, `.Chart.AppVersion`. Utile pour les labels standard.",
          },
          {
            label: "`.Capabilities`",
            value:
              "Capacités du cluster cible : `.Capabilities.KubeVersion` permet d'adapter les templates (ex. choisir la bonne `apiVersion` d'Ingress selon la version de Kubernetes).",
          },
          {
            label: "`.Files`",
            value:
              "Accès aux fichiers non-template du chart (`.Files.Get \"config/app.conf\"`) pour injecter des fichiers de configuration dans des ConfigMaps.",
          },
        ],
      },
    ],
  },
  {
    id: "fonctions-utiles",
    title: "Fonctions de template",
    level: 3,
    intro: "Les fonctions les plus utilisées (moteur Go + Sprig) : ce qu'elles font et quand s'en servir.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue essentiel",
        fields: [
          {
            label: "`quote`",
            value:
              "`{{ .Values.image.tag | quote }}` : entoure la valeur de guillemets. Indispensable pour les valeurs qui pourraient être interprétées comme des nombres ou booléens par YAML.",
          },
          {
            label: "`default`",
            value:
              "`{{ .Values.replicaCount | default 1 }}` : utilise la valeur de droite si celle de gauche est vide. Permet des values.yaml partiels sans erreur.",
          },
          {
            label: "`required`",
            value:
              "`{{ required \"image.tag est obligatoire\" .Values.image.tag }}` : fait échouer le rendu avec un message clair si la valeur manque. Mieux qu'une erreur obscure plus tard.",
          },
          {
            label: "`toYaml` + `nindent`",
            value:
              "`{{ toYaml .Values.resources | nindent 12 }}` : convertit un bloc de valeurs en YAML indenté correctement. Le duo standard pour injecter des sous-arbres (`resources`, `nodeSelector`, `tolerations`).",
          },
          {
            label: "`include`",
            value:
              "`{{ include \"mon-app.labels\" . }}` : appelle un named template défini dans `_helpers.tpl`. À préférer à `template` car `include` permet de piper le résultat (ex. vers `nindent`).",
          },
        ],
      },
    ],
  },
  {
    id: "controle-de-flux",
    title: "Contrôle de flux : if, with, range",
    level: 3,
    intro: "Rendre des ressources conditionnellement ou en boucle.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Ressource conditionnelle et boucle",
        code: `{{- if .Values.ingress.enabled }}\napiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: {{ .Release.Name }}-ingress\nspec:\n  rules:\n    - host: {{ .Values.ingress.host | quote }}\n{{- end }}\n---\n{{- range .Values.extraEnv }}\n- name: {{ .name | quote }}\n  value: {{ .value | quote }}\n{{- end }}`,
      },
      {
        kind: "text",
        text: "`if` affiche ou non un bloc selon une valeur (le pattern standard pour les fonctionnalités optionnelles : ingress, autoscaling, serviceaccount). `with` change le contexte `.` pour éviter les répétitions. `range` itère sur une liste — attention à l'indentation du YAML généré, vérifiée avec `helm template`.",
      },
    ],
  },
  {
    id: "helpers-et-named-templates",
    title: "_helpers.tpl et named templates",
    level: 3,
    intro: "Factoriser la logique répétée (noms, labels) dans des fonctions réutilisables.",
    blocks: [
      {
        kind: "code",
        language: "text",
        title: "Extrait typique de _helpers.tpl",
        code: `{{- define "mon-app.fullname" -}}\n{{- printf "%s-%s" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" -}}\n{{- end -}}\n{{- define "mon-app.labels" -}}\napp.kubernetes.io/name: {{ .Chart.Name }}\napp.kubernetes.io/instance: {{ .Release.Name }}\napp.kubernetes.io/version: {{ .Chart.AppVersion | quote }}\n{{- end -}}`,
      },
      {
        kind: "text",
        text: "Les fichiers dont le nom commence par `_` ne sont jamais rendus comme ressources : ils ne servent qu'à définir des blocs `define`. On les appelle avec `{{ include \"mon-app.labels\" . | nindent 4 }}`. Centraliser les noms et labels ici garantit la cohérence entre tous les templates — et respecte la limite de 63 caractères des noms DNS Kubernetes (`trunc 63`).",
      },
    ],
  },
  {
    id: "helm-lint",
    title: "`helm lint`",
    level: 3,
    intro: "Le contrôle qualité statique d'un chart, avant tout rendu.",
    blocks: [
      {
        kind: "command",
        label: "Analyser un chart",
        command: "helm lint ./mon-app",
        why: "Vérifie la structure du chart, la validité du `Chart.yaml`, la syntaxe des templates et les bonnes pratiques de base. C'est le premier gate d'une CI sur un chart : rapide, sans cluster, il attrape les erreurs grossières.",
        verify: "helm lint ./mon-app --strict",
      },
      {
        kind: "text",
        text: "`--strict` transforme les avertissements en erreurs : utile en CI pour interdire les charts approximatifs. Limite : `lint` ne rend pas les templates avec de vraies valeurs — un template syntaxiquement valide mais logiquement faux passe. Compléter avec `helm template`.",
      },
    ],
  },
  {
    id: "helm-template-et-debug",
    title: "`helm template` et `--debug`",
    level: 3,
    intro: "Voir le YAML final sans toucher au cluster : l'outil de debug principal.",
    blocks: [
      {
        kind: "command",
        label: "Rendre les templates en local",
        command: "helm template ma-release ./mon-app -f values-dev.yaml",
        why: "Exécute tout le moteur de rendu et affiche les manifestes finaux sur la sortie standard, sans rien appliquer. C'est ici qu'on vérifie l'indentation générée, les conditionnelles et les valeurs injectées.",
      },
      {
        kind: "command",
        label: "Rendre avec le détail des valeurs",
        command: "helm template ma-release ./mon-app -f values-dev.yaml --debug",
        why: "`--debug` affiche en plus les valeurs fusionnées utilisées pour le rendu. Quand le YAML généré ne correspond pas à ce qu'on attend, on compare les valeurs affichées à celles du fichier : l'écart révèle la surcharge fautive.",
      },
      {
        kind: "command",
        label: "Simuler une installation complète",
        command: "helm install --dry-run --debug ma-release ./mon-app -f values-dev.yaml",
        why: "Va plus loin que `helm template` : simule tout le processus d'installation côté client, y compris les hooks et les tests, sans rien créer sur le cluster. Le dernier contrôle avant un vrai `install`.",
      },
    ],
  },
  {
    id: "hooks",
    title: "Hooks",
    level: 3,
    intro: "Exécuter des ressources à des moments précis du cycle de vie d'une release.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Job de migration en pre-upgrade",
        code: `apiVersion: batch/v1\nkind: Job\nmetadata:\n  name: {{ .Release.Name }}-migrate\n  annotations:\n    "helm.sh/hook": pre-upgrade\n    "helm.sh/hook-weight": "-5"\n    "helm.sh/hook-delete-policy": hook-succeeded\nspec:\n  template:\n    spec:\n      restartPolicy: Never\n      containers:\n        - name: migrate\n          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"\n          command: ["./migrate.sh"]`,
      },
      {
        kind: "fields",
        title: "Points d'ancrage et politiques",
        fields: [
          {
            label: "Hooks disponibles",
            value:
              "`pre-install`, `post-install`, `pre-upgrade`, `post-upgrade`, `pre-rollback`, `post-rollback`, `test`. Chacun s'exécute au moment indiqué du cycle de vie.",
          },
          {
            label: "`helm.sh/hook-weight`",
            value:
              "Ordre d'exécution entre plusieurs hooks du même type : les poids négatifs passent en premier. Indispensable quand une migration doit précéder le redémarrage des Pods.",
          },
          {
            label: "`helm.sh/hook-delete-policy`",
            value:
              "`hook-succeeded` supprime la ressource après succès (évite l'accumulation de Jobs terminés), `hook-failed` la conserve en cas d'échec pour diagnostic, `before-hook-creation` nettoie le hook précédent.",
          },
        ],
      },
      {
        kind: "text",
        text: "Avertissement : un hook qui échoue fait échouer toute l'opération (install ou upgrade). Les hooks doivent être rapides, idempotents et leur échec doit être diagnostiquable via les logs du Job.",
      },
    ],
  },
  {
    id: "tests-helm",
    title: "Tester avec `helm test`",
    level: 3,
    intro: "Des tests de fumée embarqués dans le chart, exécutés après l'installation.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Test de connectivité dans templates/tests/",
        code: `apiVersion: v1\nkind: Pod\nmetadata:\n  name: "{{ .Release.Name }}-test-connexion"\n  annotations:\n    "helm.sh/hook": test\nspec:\n  restartPolicy: Never\n  containers:\n    - name: wget\n      image: busybox\n      command: ["wget"]\n      args: ["{{ .Release.Name }}-web:80"]`,
      },
      {
        kind: "command",
        label: "Exécuter les tests d'une release",
        command: "helm test mon-nginx",
        why: "Lance tous les Pods annotés `helm.sh/hook: test` et rapporte leur succès ou échec. C'est un test de fumée post-déploiement : le service répond-il ? La base est-elle joignable ? À intégrer en fin de pipeline.",
        verify: "helm test mon-nginx --logs",
      },
    ],
  },
  {
    id: "dependances-et-subcharts",
    title: "Dépendances et subcharts",
    level: 3,
    intro: "Composer un chart à partir d'autres charts (ex. embarquer PostgreSQL).",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Déclarer une dépendance dans Chart.yaml",
        code: `dependencies:\n  - name: postgresql\n    version: "15.x.x"\n    repository: "https://charts.bitnami.com/bitnami"\n    condition: postgresql.enabled`,
      },
      {
        kind: "command",
        label: "Télécharger les dépendances",
        command: "helm dependency update ./mon-app",
        why: "Résout les dépendances déclarées et les place dans `charts/` (ou `Chart.lock` pour figer les versions exactes). Sans cette étape, `helm install` échoue sur un chart à dépendances.",
        verify: "ls mon-app/charts",
      },
      {
        kind: "text",
        text: "Les valeurs d'un subchart se configurent depuis le chart parent via le nom du subchart comme clé : `postgresql.auth.password: secret` dans le `values.yaml` parent. Le `condition: postgresql.enabled` permet de désactiver le subchart (utile pour brancher une base managée externe en production).",
      },
    ],
  },
  {
    id: "chart-bibliotheque",
    title: "Charts de type `library`",
    level: 3,
    intro: "Partager des templates entre charts sans rien installer.",
    blocks: [
      {
        kind: "text",
        text: "Un chart `type: library` ne contient que des définitions (`_helpers.tpl`) : aucune ressource n'est installée. On l'ajoute en dépendance, et ses named templates deviennent utilisables via `include`. C'est le mécanisme pour standardiser les labels, les noms ou des morceaux de Deployment dans toute une organisation — l'équivalent d'une bibliothèque partagée pour charts.",
      },
      {
        kind: "list",
        items: [
          "Cas d'usage : conventions de nommage, labels `app.kubernetes.io/*`, snippets de `securityContext` imposés par la politique interne.",
          "Un chart library se versionne et se publie comme un chart normal ; les charts consommateurs le déclarent en dépendance.",
          "Ne pas en abuser : une couche d'indirection de trop rend les charts difficiles à lire pour les nouveaux arrivants.",
        ],
      },
    ],
  },
  {
    id: "erreur-release-existe-deja",
    title: "Erreur : release déjà existante",
    level: 3,
    intro: "Le cas le plus courant en itération rapide.",
    blocks: [
      {
        kind: "text",
        text: "Message typique : `Error: INSTALLATION FAILED: cannot re-use a name that is still in use`. Helm refuse d'installer une release dont le nom existe déjà dans le namespace — même si l'installation précédente a échoué à moitié.",
      },
      {
        kind: "list",
        items: [
          "Diagnostic : `helm list -A` pour voir les releases existantes et leur statut (une release `failed` bloque toujours le nom).",
          "Solution propre : `helm upgrade --install` au lieu de `helm install` dans les scripts — idempotent dans les deux cas.",
          "Si la release est en état `failed` et irrécupérable : `helm uninstall` puis réinstaller.",
        ],
      },
    ],
  },
  {
    id: "erreur-template-nil",
    title: "Erreur : nil pointer dans un template",
    level: 3,
    intro: "L'erreur de rendu la plus déroutante pour les débutants.",
    blocks: [
      {
        kind: "text",
        text: "Message typique : `nil pointer evaluating interface {}.ingress` ou `nil pointer evaluating interface {}.host`. Cela signifie que le template accède à `.Values.ingress.host` alors que `ingress` n'existe pas dans les valeurs fusionnées — souvent parce qu'un `-f` partiel a écrasé tout le bloc parent au lieu de le fusionner.",
      },
      {
        kind: "list",
        items: [
          "Diagnostic : `helm template --debug` pour voir les valeurs réellement fusionnées.",
          "Protection : `default` (`{{ .Values.ingress.host | default \"\" }}`) ou `required` avec un message explicite.",
          "Prévention : documenter les blocs obligatoires dans le `values.yaml` et les valider en CI avec `helm lint --strict` + `helm template`.",
        ],
      },
    ],
  },
  {
    id: "erreur-parse-yaml",
    title: "Erreur : YAML invalide généré",
    level: 3,
    intro: "Quand le rendu produit du YAML que Kubernetes refuse.",
    blocks: [
      {
        kind: "text",
        text: "Symptôme : l'installation échoue avec une erreur de parsing alors que les templates « semblent » corrects. La cause est presque toujours l'indentation du YAML généré : une expression `{{ }}` qui produit du texte désaligné, ou un `toYaml` sans le bon `nindent`.",
      },
      {
        kind: "list",
        items: [
          "Diagnostic : `helm template` puis inspection visuelle du YAML autour de la ligne fautive.",
          "Règle : toute valeur injectée dans un bloc indenté passe par `nindent N` avec le bon niveau ; les chaînes douteuses passent par `quote`.",
          "Les tirets `{{-` / `-}}` mangent les sauts de ligne : les oublier ou les mettre au mauvais endroit décale tout le bloc suivant.",
        ],
      },
    ],
  },
  {
    id: "erreur-namespace",
    title: "Erreur : namespace introuvable",
    level: 3,
    intro: "Installer dans un namespace qui n'existe pas encore.",
    blocks: [
      {
        kind: "command",
        label: "Créer le namespace à l'installation",
        command: "helm install mon-app ./mon-app --namespace production --create-namespace",
        why: "Par défaut, Helm n'installe que dans des namespaces existants et échoue sinon. `--create-namespace` crée le namespace à la volée — pratique en CI et pour les environnements éphémères.",
      },
      {
        kind: "text",
        text: "Piège fréquent : `helm list` sans `-n` ne montre que le namespace courant (`default` si non configuré). Une release « disparue » est souvent simplement dans un autre namespace : `helm list -A` pour vérifier.",
      },
    ],
  },
  {
    id: "erreur-chart-introuvable",
    title: "Erreur : chart introuvable",
    level: 3,
    intro: "`Error: chart \"x\" not found` ou échec de téléchargement.",
    blocks: [
      {
        kind: "list",
        items: [
          "Cause 1 : `helm repo update` oublié — l'index local ne connaît pas encore le chart ou la version demandée.",
          "Cause 2 : faute de frappe dans le nom du dépôt (`bitnami/ngnix`) ou dépôt non ajouté (`helm repo list` pour vérifier).",
          "Cause 3 : version épinglée inexistante (`--version 99.0.0`) — `helm search repo <chart> --versions` liste les versions disponibles.",
          "Cause 4 : chart local — vérifier le chemin (`./mon-app`) et que `Chart.yaml` y est présent.",
        ],
      },
    ],
  },
  {
    id: "secrets-et-values-sensibles",
    title: "Secrets et valeurs sensibles",
    level: 3,
    intro: "Les values ne sont pas un coffre-fort : comment gérer les secrets proprement.",
    blocks: [
      {
        kind: "list",
        items: [
          "`helm get values` affiche les valeurs en clair, et les Secrets rendus sont stockés dans etcd : un mot de passe dans `values.yaml` est visible par quiconque peut lire la release.",
          "Ne jamais commiter de secret dans `values.yaml` ni le passer en `--set` (il reste dans l'historique shell et dans l'historique Helm).",
          "Pratiques saines : référencer des secrets existants (`existingSecret`), les injecter via des variables d'environnement au moment du `helm upgrade` en CI, ou utiliser un opérateur de secrets externe (External Secrets, Sealed Secrets) qui réconcilie les secrets hors Helm.",
          "Au minimum : un fichier `values-secrets.yaml` local, ignoré par Git, chargé avec `-f` uniquement au déploiement.",
        ],
      },
    ],
  },
  {
    id: "provenance-et-signature",
    title: "Provenance et signature",
    level: 3,
    intro: "Garantir l'intégrité d'un chart avec GPG.",
    blocks: [
      {
        kind: "command",
        label: "Signer un chart lors du packaging",
        command: "helm package ./mon-app --sign --key 'Mon Nom' --keyring ~/.gnupg/secring.gpg",
        why: "Produit `mon-app-0.1.0.tgz` accompagné d'un fichier `.prov` contenant la signature GPG. Les consommateurs peuvent vérifier que le chart n'a pas été altéré depuis sa publication par le mainteneur.",
        verify: "helm verify mon-app-0.1.0.tgz",
      },
      {
        kind: "text",
        text: "En pratique, la signature GPG des charts est peu utilisée au profit des registres OCI avec signatures Cosign/Sigstore dans les organisations exigeantes. L'important est le principe : un chart est du code exécuté avec des privilèges cluster — sa provenance doit être vérifiable.",
      },
    ],
  },
  {
    id: "registres-oci",
    title: "Registres OCI",
    level: 3,
    intro: "Publier des charts comme des artefacts OCI, sans serveur de charts dédié.",
    blocks: [
      {
        kind: "command",
        label: "Pousser un chart vers un registre OCI",
        command: "helm push mon-app-0.1.0.tgz oci://registry.example.com/charts",
        why: "Helm sait stocker les charts dans n'importe quel registre compatible OCI (le même type de registre que pour les images Docker). Cela unifie le stockage des images et des charts, avec les mêmes contrôles d'accès.",
        verify: "helm pull oci://registry.example.com/charts/mon-app --version 0.1.0",
      },
      {
        kind: "text",
        text: "Prérequis : `helm registry login registry.example.com` pour l'authentification. L'installation se fait ensuite directement : `helm install ma-release oci://registry.example.com/charts/mon-app --version 0.1.0`. Les dépôts classiques (`helm repo`) restent valides — les deux modes coexistent.",
      },
    ],
  },
  {
    id: "gitops-et-helm",
    title: "Helm et GitOps",
    level: 3,
    intro: "Utiliser des charts dans un flux GitOps (Argo CD, Flux).",
    blocks: [
      {
        kind: "text",
        text: "En GitOps, ce n'est plus un humain qui lance `helm upgrade` : un opérateur (Argo CD, Flux) surveille un dépôt Git et réconcilie l'état du cluster en continu. Helm reste le format de packaging, mais le rendu et l'application sont pilotés déclarativement.",
      },
      {
        kind: "list",
        items: [
          "Pattern courant : le chart et les `values-*.yaml` vivent dans Git ; l'outil GitOps rend le chart et applique le résultat, en boucle.",
          "Avantage : historique Git complet des configurations, dérive détectée automatiquement, rollback via `git revert`.",
          "Point de vigilance : les secrets ne doivent toujours pas être en clair dans Git — même en GitOps, ils viennent d'un gestionnaire externe.",
          "Helm reste utile en local pour développer le chart (`helm template`, `helm lint`) avant de le confier à l'opérateur GitOps.",
        ],
      },
    ],
  },
  {
    id: "cicd-et-helm",
    title: "Helm en CI/CD",
    level: 3,
    intro: "Les gates automatiques d'un pipeline qui publie ou déploie des charts.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Lint",
            detail:
              "`helm lint --strict ./mon-app` : refuse tout chart qui ne respecte pas les règles de base.",
          },
          {
            title: "Rendu de contrôle",
            detail:
              "`helm template` avec chaque fichier de values (`-f values-dev.yaml`, `-f values-prod.yaml`) pour valider que tous les environnements se rendent.",
          },
          {
            title: "Tests",
            detail:
              "`helm test` après déploiement sur un cluster éphémère (kind, k3d) pour le test de fumée.",
          },
          {
            title: "Packaging et publication",
            detail:
              "`helm package` puis `helm push` vers le registre OCI interne, avec version semver issue du tag Git.",
          },
          {
            title: "Déploiement",
            detail:
              "`helm upgrade --install` avec le kubeconfig du cluster cible, les values de l'environnement, et `--atomic` (rollback automatique si l'upgrade échoue) pour les déploiements critiques.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro: "Ce qui distingue un chart jetable d'un chart maintenable en équipe.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un chart doit s'installer avec ses valeurs par défaut sur un cluster de dev : zéro configuration obligatoire pour démarrer.",
          "`values.yaml` documenté : chaque paramètre a un commentaire qui explique son effet.",
          "Labels standard `app.kubernetes.io/*` sur toutes les ressources, via un helper partagé.",
          "Noms de ressources dérivés de la release (`fullname` tronqué à 63 caractères), jamais codés en dur.",
          "`required` pour les paramètres sans défaut sensé, avec un message d'erreur explicite.",
          "Semver strict sur `version` : tout changement de chart publié incrémente la version.",
          "`helm lint --strict` + `helm template` pour chaque environnement en CI.",
          "Secrets hors du chart : références ou injection externe, jamais en clair.",
          "Tests `helm test` pour les chemins critiques (connectivité, migrations).",
          "README du chart : ce qu'il déploie, les values principales, un exemple d'installation.",
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 3,
    intro:
      "Quatre projets pour passer de consommateur à auteur de charts.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Stack via charts publics",
        fields: [
          {
            label: "Objectif",
            value:
              "Déployer une application complète (ex. WordPress + MySQL ou Ghost) uniquement avec des charts publics et des fichiers de values.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "`helm repo`, `helm show values`, `-f`, `--set`, `helm list`, `helm status`.",
          },
          {
            label: "Réussi quand",
            value:
              "L'application est joignable, chaque paramètre modifié est tracé dans un fichier de values versionné, et `helm uninstall` nettoie tout.",
          },
          {
            label: "Difficulté",
            value: "Débutant — quelques heures.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — Chart pour sa propre application",
        fields: [
          {
            label: "Objectif",
            value:
              "Packager une de vos applications (API, site statique) : `helm create`, adapter les templates, values par environnement.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Templates, `values.yaml`, `if`/`range`, helpers, `helm template --debug`, `helm lint`.",
          },
          {
            label: "Réussi quand",
            value:
              "`helm upgrade --install` déploie en dev ET en prod avec deux fichiers de values, `helm rollback` fonctionne, le chart passe `lint --strict`.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — une journée.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Chart avec dépendances, hooks et tests",
        fields: [
          {
            label: "Objectif",
            value:
              "Enrichir le chart : base de données en subchart, Job de migration en `pre-upgrade`, tests `helm test`, values validées avec `required`.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Dépendances, hooks, politiques de suppression, tests, `helm dependency update`.",
          },
          {
            label: "Réussi quand",
            value:
              "Un upgrade exécute la migration avant le redémarrage, `helm test` valide le déploiement, et la base peut être désactivée via `postgresql.enabled=false`.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — deux jours.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 4 — Pipeline de publication",
        fields: [
          {
            label: "Objectif",
            value:
              "Automatiser : à chaque tag Git, `lint --strict`, rendu pour tous les environnements, `package`, `push` vers un registre OCI, déploiement avec `--atomic`.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "CI/CD, registres OCI, semver, `--atomic`, gestion des secrets de CI.",
          },
          {
            label: "Réussi quand",
            value:
              "Un tag produit un chart versionné et publié ; un déploiement raté rollback automatiquement ; aucun secret n'apparaît dans les logs.",
          },
          {
            label: "Difficulté",
            value: "Avancé — une semaine.",
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
      "Les références à privilégier — la documentation officielle d'abord.",
    blocks: [
      {
        kind: "list",
        items: [
          "`https://helm.sh/docs/` — LA référence : guide d'installation, anatomie des charts, référence des fonctions de template, bonnes pratiques.",
          "`https://helm.sh/docs/chart_template_guide/` — le guide complet d'écriture des templates, avec tous les objets intégrés et les fonctions.",
          "`https://artifacthub.io/` — annuaire public des charts : lire la documentation et les valeurs par défaut d'un chart avant de l'installer.",
          "`https://helm.sh/docs/topics/charts/` — tout sur le format des charts : dépendances, provenance, bibliothèques.",
        ],
      },
      {
        kind: "text",
        text: "Réflexe durable : avant d'écrire un template complexe, vérifier s'il existe déjà dans un chart public bien noté sur Artifact Hub — les patterns éprouvés (helpers, hooks) s'y trouvent déjà.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Helm maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "`k8s-operators` : passer du packaging au pilotage — écrire des contrôleurs qui opèrent des applications complexes.",
          "`prometheus` : superviser ce que Helm déploie — métriques, alertes, dashboards.",
          "`terraform` : provisionner l'infrastructure (clusters, registres) sur laquelle Helm déploie.",
          "`cicd` : industrialiser les pipelines qui packagent et déploient les charts.",
          "`platform-engineering` : construire une plateforme interne où les charts sont le format de livraison standard.",
        ],
      },
    ],
  },
];

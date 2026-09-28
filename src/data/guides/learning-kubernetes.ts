import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Kubernetes : de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Approche : l'orchestration d'abord (le « pourquoi »), puis kubectl au
 * quotidien, puis l'architecture interne et l'exploitation.
 */
export const LEARNING_KUBERNETES: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Kubernetes, pourquoi l'orchestration existe, et quand (ne pas) l'utiliser.",
    blocks: [
      {
        kind: "text",
        text: "Kubernetes (souvent abrégé K8s) est un orchestrateur de conteneurs open source, maintenu par la CNCF et issu de l'expérience de Google (Borg/Omega). Là où Docker exécute des conteneurs sur une machine, Kubernetes pilote des centaines de conteneurs répartis sur un parc de machines : il décide où les placer, les redémarre quand ils meurent, les met à jour sans interruption et les expose sur le réseau.",
      },
      {
        kind: "fields",
        title: "Kubernetes en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Kubernetes maintient l'état réel d'un parc de conteneurs conforme à un état désiré que vous déclarez en YAML.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Faire tourner des conteneurs « à la main » ne passe pas l'échelle : une machine tombe, un conteneur plante à 3h du matin, un déploiement doit se faire sans couper le service, le trafic double soudainement. L'orchestration automatise le placement, la réparation, les mises à jour et la montée en charge.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Applications en production composées de plusieurs services, besoin de haute disponibilité, déploiements fréquents sans interruption, équipes qui veulent un socle standard entre le développement local et le cloud.",
          },
          {
            label: "Quand ne pas l'utiliser",
            value:
              "Un simple site statique, un prototype jetable, une application monolithique sur un seul serveur : Kubernetes ajoute une complexité réelle (réseau, stockage, observabilité). Commencez par Docker seul, migrez quand le besoin apparaît.",
          },
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni un système de build d'images, ni un registre de conteneurs, ni une plateforme magique « qui fait tout ». C'est une fondation : le déploiement continu, la supervision ou la gestion des secrets se construisent par-dessus.",
          },
        ],
      },
    ],
  },
  {
    id: "architecture-vue-densemble",
    title: "L'architecture en une image",
    level: 1,
    intro:
      "Deux rôles seulement à retenir pour commencer : le plan de contrôle décide, les nœuds exécutent.",
    blocks: [
      {
        kind: "diagram",
        title: "Cluster Kubernetes simplifié",
        lines: [
          "┌───────────────────── PLAN DE CONTRÔLE ─────────────────────┐",
          "│  API Server        │  etcd            │  Scheduler        │",
          "│  (porte d'entrée,  │  (état du        │  (place les       │",
          "│   seule interface) │   cluster)       │   conteneurs)     │",
          "│                   │                  │  Controllers      │",
          "│                   │                  │  (réparent l'état) │",
          "└──────────────────────────┬──────────────────────────────┘",
          "                           │  état désiré vs état réel",
          "        ┌──────────────────┼──────────────────┐",
          "        ▼                  ▼                  ▼",
          "   ┌─────────┐        ┌─────────┐        ┌─────────┐",
          "   │ NŒUD 1  │        │ NŒUD 2  │        │ NŒUD 3  │",
          "   │ kubelet │        │ kubelet │        │ kubelet │",
          "   │ Pods    │        │ Pods    │        │ Pods    │",
          "   └─────────┘        └─────────┘        └─────────┘",
          "        Vos conteneurs tournent ici, répartis sur les nœuds",
        ],
      },
      {
        kind: "text",
        text: "Le principe central est déclaratif : vous décrivez l'état désiré (« 3 copies de mon application, version 2.4, exposée sur le port 80 ») dans des fichiers YAML, et Kubernetes boucle en permanence pour rapprocher l'état réel de cet état désiré. Un conteneur meurt ? Il est recréé. Vous demandez 5 réplicas au lieu de 3 ? Deux conteneurs démarrent. C'est cette boucle de réconciliation, et non des ordres impératifs, qui fait la robustesse du système.",
      },
      {
        kind: "list",
        items: [
          "Le plan de contrôle (control plane) ne fait tourner aucun conteneur applicatif : il décide et surveille.",
          "Les nœuds (nodes) sont les machines — physiques ou virtuelles — qui exécutent vos conteneurs regroupés en Pods.",
          "Vous ne parlez qu'au plan de contrôle, via l'outil `kubectl` : jamais directement aux nœuds.",
          "Tout est une ressource décrite en YAML : Pods, Déploiements, Services, ConfigMaps…",
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
      "Kubernetes orchestre des conteneurs : sans bases solides sur les conteneurs et Linux, chaque erreur semblera magique.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut maîtriser avant",
        fields: [
          {
            label: "Conteneurs (Docker)",
            value:
              "Construire une image (`docker build`), la lancer (`docker run`), comprendre qu'un conteneur est éphémère et isolé. Kubernetes ne fait qu'orchestrer ce que Docker sait exécuter.",
          },
          {
            label: "Ligne de commande Linux",
            value:
              "Naviguer, lire des logs, comprendre les processus et les ports. Le debugging Kubernetes se fait au terminal.",
          },
          {
            label: "Réseau : notions",
            value:
              "Adresse IP, port, DNS, HTTP. Vous manipulerez des Services, des Ingress et des politiques réseau : ces bases évitent bien des confusions.",
          },
          {
            label: "YAML",
            value:
              "Indentation stricte, listes, dictionnaires. Tout Kubernetes se déclare en YAML : une erreur d'indentation est l'erreur n°1 des débutants.",
          },
        ],
      },
      {
        kind: "text",
        text: "Bonne nouvelle : vous n'avez besoin d'aucun cloud ni d'aucun serveur pour apprendre. Un cluster local d'un seul nœud sur votre machine suffit pour 90 % de l'apprentissage.",
      },
    ],
  },
  {
    id: "cluster-local",
    title: "Un cluster local : minikube ou kind",
    level: 2,
    intro:
      "Deux outils sérieux pour faire tourner Kubernetes sur votre machine. Aucun n'est « le meilleur » : ils répondent à des besoins différents.",
    blocks: [
      {
        kind: "table",
        headers: ["", "minikube", "kind"],
        rows: [
          [
            "Principe",
            "Cluster dans une VM ou un conteneur Docker, avec addons intégrés",
            "Cluster dont chaque « nœud » est un conteneur Docker",
          ],
          [
            "Multi-nœuds",
            "Possible mais ce n'est pas son point fort",
            "Natif et simple : idéal pour tester la répartition",
          ],
          [
            "Extras",
            "`minikube dashboard`, `minikube tunnel`, addons (ingress, metrics-server…)",
            "Minimaliste : vous installez tout vous-même",
          ],
          [
            "Démarrage",
            "Un peu plus lent (VM à provisionner)",
            "Très rapide",
          ],
          [
            "Idéal pour",
            "Découvrir, suivre des tutoriels, tester des addons",
            "Développement local, tests CI, clusters éphémères",
          ],
        ],
      },
      {
        kind: "command",
        label: "Démarrer un cluster local avec minikube",
        command: "minikube start",
        why: "Crée un cluster Kubernetes fonctionnel d'un seul nœud sur votre machine (via Docker ou une VM selon le pilote). C'est la voie la plus guidée pour débuter : la commande configure aussi `kubectl` pour parler à ce cluster.",
        verify:
          "La commande se termine par « Done! kubectl is now configured to use minikube ».",
      },
      {
        kind: "command",
        label: "Créer un cluster local avec kind",
        command: "kind create cluster",
        why: "`kind` (Kubernetes IN Docker) démarre chaque nœud du cluster comme un conteneur Docker : c'est léger, rapide, et parfait pour créer puis jeter des clusters de test. Le nom par défaut du cluster est `kind`.",
        verify:
          "Le terminal affiche « Cluster creation complete » et `kubectl get nodes` répond.",
      },
      {
        kind: "text",
        text: "Les deux outils sont maintenus par la communauté Kubernetes (SIGs officielles) : ce sont des choix sûrs et documentés, pas des bidouilles. Choisissez minikube si vous voulez être guidé, kind si vous voulez de la vitesse et du multi-nœuds.",
      },
    ],
  },
  {
    id: "installer-kubectl",
    title: "Installer kubectl",
    level: 2,
    intro:
      "`kubectl` est la télécommande universelle : le même outil pilote un cluster local, un cluster cloud ou un Raspberry Pi.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier si kubectl est déjà installé",
        command: "kubectl version --client",
        why: "Affiche la version du client sans exiger de connexion à un cluster. Si la commande est inconnue, il faut l'installer ; si elle répond, vous êtes prêt.",
        verify: "Une ligne « Client Version: v1.x.x » s'affiche.",
      },
      {
        kind: "code",
        language: "bash",
        title: "Installation officielle par système",
        code: "# macOS (Homebrew)\nbrew install kubectl\n\n# Windows (winget)\nwinget install -e --id Kubernetes.kubectl\n\n# Linux : binaire officiel depuis dl.k8s.io\ncurl -LO \"https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl\"\nchmod +x kubectl\nsudo mv kubectl /usr/local/bin/",
      },
      {
        kind: "text",
        text: "Après l'installation, `kubectl` sait à quel cluster parler grâce au fichier `~/.kube/config` (le « kubeconfig ») : minikube et kind le remplissent automatiquement. La notion de contexte (`kubectl config get-contexts`) permet de basculer entre plusieurs clusters — indispensable dès que vous touchez à autre chose que votre machine.",
      },
    ],
  },
  {
    id: "kubectl-premiers-pas",
    title: "kubectl : premiers pas",
    level: 2,
    intro:
      "Trois commandes pour prendre le pouls de n'importe quel cluster.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier la connexion au cluster",
        command: "kubectl cluster-info",
        why: "Interroge le plan de contrôle et affiche son adresse : c'est le « ping » de Kubernetes. Si cette commande échoue, inutile d'aller plus loin — le problème est la connexion, pas vos manifests.",
        verify: "« Kubernetes control plane is running at https://… » s'affiche.",
      },
      {
        kind: "command",
        label: "Lister les nœuds du cluster",
        command: "kubectl get nodes",
        why: "Affiche chaque machine du cluster avec son statut (`Ready`), son rôle et sa version. Sur minikube/kind vous verrez un seul nœud ; en production, des dizaines.",
        verify: "Au moins un nœud apparaît avec le statut `Ready`.",
      },
      {
        kind: "command",
        label: "Voir les contextes disponibles",
        command: "kubectl config get-contexts",
        why: "Liste les clusters configurés dans votre kubeconfig et indique celui qui est actif (astérisque). Avant toute commande destructive, vérifiez que vous êtes sur le bon contexte : appliquer en production ce qui était prévu pour le local est une erreur classique.",
      },
    ],
  },
  {
    id: "lire-un-cluster",
    title: "Lire un cluster : get, describe, logs",
    level: 2,
    intro:
      "80 % du travail Kubernetes consiste à observer : lister les ressources, inspecter leur état, lire leurs logs.",
    blocks: [
      {
        kind: "command",
        label: "Lister les Pods de tous les namespaces",
        command: "kubectl get pods -A",
        why: "`get` est la commande d'inventaire, `pods` la ressource la plus consultée, et `-A` (all-namespaces) évite de rater ce qui tourne dans `kube-system`. Les colonnes `READY`, `STATUS` et `RESTARTS` donnent le diagnostic en un coup d'œil.",
        verify: "La liste inclut les Pods système (`coredns`, etc.) avec le statut `Running`.",
      },
      {
        kind: "command",
        label: "Inspecter une ressource en détail",
        command: "kubectl describe pod <nom-du-pod>",
        why: "`describe` affiche l'état complet : événements récents, causes d'échec, configuration effective. Quand un Pod ne démarre pas, c'est la première commande à lancer — la section « Events » en bas raconte l'histoire.",
      },
      {
        kind: "command",
        label: "Lire les logs d'un conteneur",
        command: "kubectl logs <nom-du-pod>",
        why: "Affiche la sortie standard du conteneur : c'est l'équivalent de `docker logs`. Avec `-f` on suit en continu, avec `--previous` on lit les logs du conteneur précédent après un crash — précieux pour comprendre un CrashLoopBackOff.",
      },
      {
        kind: "command",
        label: "Voir les événements récents du cluster",
        command: "kubectl get events --sort-by=.metadata.creationTimestamp",
        why: "Les événements sont le journal de bord de Kubernetes : décisions du scheduler, échecs de démarrage, problèmes d'image. Triés par date, ils montrent la séquence exacte de ce qui vient d'arriver.",
      },
    ],
  },
  {
    id: "premier-deploiement",
    title: "Premier déploiement : nginx en 5 étapes",
    level: 2,
    intro:
      "Le rituel fondamental : écrire un manifest YAML, l'appliquer, vérifier, exposer, nettoyer.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Écrire le manifest",
            detail:
              "Créez `nginx.yaml` avec un Deployment (2 réplicas de nginx) et un Service. Le Deployment décrit l'état désiré, le Service donne une adresse stable.",
          },
          {
            title: "Appliquer au cluster",
            detail:
              "`kubectl apply -f nginx.yaml` : Kubernetes compare le manifest à l'état réel et crée ce qui manque. `apply` est idempotent : relancez-le sans crainte.",
          },
          {
            title: "Vérifier",
            detail:
              "`kubectl get pods` puis `kubectl get svc` : les Pods passent à `Running`, le Service obtient une adresse.",
          },
          {
            title: "Exposer en local",
            detail:
              "`kubectl port-forward svc/nginx 8080:80`, puis ouvrez http://localhost:8080 : vous voyez la page d'accueil nginx servie par le cluster.",
          },
          {
            title: "Nettoyer",
            detail:
              "`kubectl delete -f nginx.yaml` supprime tout ce que le fichier avait créé. Un cluster de dev se nettoie aussi facilement qu'il se remplit.",
          },
        ],
      },
      {
        kind: "code",
        language: "yaml",
        title: "nginx.yaml — Deployment + Service",
        code: "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx\n  labels:\n    app: nginx\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: nginx\n  template:\n    metadata:\n      labels:\n        app: nginx\n    spec:\n      containers:\n        - name: nginx\n          image: nginx:1.27\n          ports:\n            - containerPort: 80\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: nginx\nspec:\n  selector:\n    app: nginx\n  ports:\n    - port: 80\n      targetPort: 80",
      },
      {
        kind: "text",
        text: "Notez la mécanique : le Deployment ne connaît pas les Pods par leur nom mais par le sélecteur `app: nginx`. C'est ce lien par labels — et non par nommage — qui permet à Kubernetes de remplacer les Pods à volonté sans rien casser. Le `---` sépare plusieurs ressources dans un même fichier.",
      },
    ],
  },
  {
    id: "namespaces",
    title: "Namespaces : ranger le cluster",
    level: 2,
    intro:
      "Un namespace est un dossier logique : il isole des groupes de ressources sans créer un nouveau cluster.",
    blocks: [
      {
        kind: "command",
        label: "Lister les namespaces",
        command: "kubectl get namespaces",
        why: "Tout cluster contient déjà `default`, `kube-system` (composants système — n'y touchez pas), `kube-public` et `kube-node-lease`. Vos applications iront dans des namespaces dédiés.",
        verify: "Les quatre namespaces système s'affichent.",
      },
      {
        kind: "command",
        label: "Créer et utiliser un namespace",
        command: "kubectl create namespace mon-app",
        why: "Séparer les environnements (`dev`, `staging`, `prod`) ou les équipes par namespace évite les collisions de noms et permet d'appliquer des quotas et des droits différents par périmètre.",
        verify: "`kubectl get namespaces` liste désormais `mon-app`.",
      },
      {
        kind: "command",
        label: "Travailler dans un namespace",
        command: "kubectl get pods -n mon-app",
        why: "L'option `-n` cible un namespace ; sans elle, `kubectl` utilise `default`. Oublier le namespace est la cause n°1 du « mais mon Pod a disparu ! » — il est juste ailleurs.",
      },
      {
        kind: "text",
        text: "Important : un namespace n'est pas une barrière de sécurité à lui seul — les Pods de namespaces différents peuvent communiquer par défaut. L'isolation réseau se règle avec les NetworkPolicies, et l'isolation des droits avec RBAC (niveau 3).",
      },
    ],
  },
  {
    id: "labels-selecteurs",
    title: "Labels et sélecteurs : la colle du système",
    level: 2,
    intro:
      "Les labels sont de simples étiquettes `clé: valeur`. Tout Kubernetes repose dessus : c'est ainsi que les ressources se retrouvent entre elles.",
    blocks: [
      {
        kind: "command",
        label: "Voir les labels des Pods",
        command: "kubectl get pods --show-labels",
        why: "Affiche la colonne `LABELS` : vous voyez concrètement les étiquettes (`app=nginx`, `pod-template-hash=…`) que Kubernetes utilise en coulisses pour relier Deployments, ReplicaSets et Services.",
      },
      {
        kind: "command",
        label: "Filtrer par label",
        command: "kubectl get pods -l app=nginx",
        why: "Le sélecteur `-l` ne liste que les Pods portant ce label. C'est exactement le mécanisme qu'un Service utilise avec son champ `selector` : le Service n'a pas de liste de Pods en dur, il « sélectionne » en continu ceux qui correspondent.",
      },
      {
        kind: "list",
        items: [
          "Un Service route vers les Pods dont les labels correspondent à son `selector` — d'où l'erreur classique du Service sans endpoints (section dédiée au niveau 3).",
          "Un Deployment gère les Pods via son `selector.matchLabels` : ne le modifiez jamais après création.",
          "Les labels servent aussi à organiser : `env=prod`, `team=backend`, `version=v2` — et à sélectionner pour les logs (`kubectl logs -l app=nginx`).",
          "À ne pas confondre avec les annotations : les labels servent à sélectionner, les annotations à documenter (notes, outils externes).",
        ],
      },
    ],
  },
  {
    id: "imperatif-vs-declaratif",
    title: "Impératif vs déclaratif",
    level: 2,
    intro:
      "Deux façons de commander Kubernetes. L'une pour expérimenter, l'autre pour la production.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Impératif (`kubectl create…`)", "Déclaratif (YAML + `apply`)"],
        rows: [
          ["Usage", "Essais rapides, debug, génération de manifests", "Tout ce qui vit plus d'une journée"],
          ["Traçabilité", "Aucune : la commande est perdue", "Versionné en Git, relu en revue de code"],
          ["Répétabilité", "À retaper à chaque fois", "`kubectl apply -f` rejoue à l'identique"],
          ["Exemple", "`kubectl create deployment nginx --image=nginx:1.27`", "Le fichier `nginx.yaml` de la section précédente"],
        ],
      },
      {
        kind: "command",
        label: "Générer du YAML depuis une commande impérative",
        command: "kubectl create deployment nginx --image=nginx:1.27 --dry-run=client -o yaml",
        why: "Le meilleur des deux mondes : on profite de la rapidité de l'impératif pour générer un manifest propre, qu'on sauvegarde ensuite en fichier pour le versionner. `--dry-run=client` n'envoie rien au cluster.",
        verify: "Le YAML du Deployment s'affiche dans le terminal sans rien créer.",
      },
      {
        kind: "text",
        text: "La voie déclarative mène naturellement au GitOps : le cluster converge en permanence vers ce qui est décrit dans Git. C'est le modèle d'exploitation visé en production, porté par des outils comme Argo CD ou Flux (simples mentions : leur apprentissage vient après les bases).",
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow quotidien",
    level: 2,
    intro:
      "La boucle que vous répéterez des dizaines de fois par jour.",
    blocks: [
      {
        kind: "diagram",
        title: "Boucle de développement avec Kubernetes",
        lines: [
          "Code modifié",
          "     │",
          "     ▼",
          "Image reconstruite  →  docker build -t mon-app:v2 .",
          "     │",
          "     ▼",
          "Image poussée au registre  →  docker push mon-app:v2",
          "     │",
          "     ▼",
          "Manifest mis à jour  →  image: mon-app:v2 dans le YAML",
          "     │",
          "     ▼",
          "Appliqué  →  kubectl apply -f deploy.yaml",
          "     │",
          "     ▼",
          "Suivi  →  kubectl rollout status deployment/mon-app",
          "     │",
          "     ▼",
          "Vérifié  →  kubectl logs -l app=mon-app",
        ],
      },
      {
        kind: "list",
        items: [
          "On ne modifie jamais un conteneur en place : on construit une nouvelle image et on redéploie. L'immutabilité est la règle.",
          "Utilisez des tags de version explicites (`v2`, `1.4.3`) plutôt que `latest` : `latest` est ambigu et complique les retours en arrière.",
          "En développement local, des outils comme Skaffold ou Tilt automatisent cette boucle (mention : à explorer quand la boucle manuelle devient pénible).",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "apiserver",
    title: "Le plan de contrôle : kube-apiserver",
    level: 3,
    intro:
      "La seule porte d'entrée du cluster : tout — kubectl, kubelet, scheduler — passe par lui.",
    blocks: [
      {
        kind: "fields",
        title: "kube-apiserver, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "L'API Server expose l'API REST de Kubernetes et est l'unique composant autorisé à parler à `etcd`.",
          },
          {
            label: "Pourquoi",
            value:
              "Centraliser tous les accès permet d'appliquer uniformément l'authentification, l'autorisation (RBAC) et la validation avant toute modification de l'état du cluster.",
          },
          {
            label: "Comment",
            value:
              "Il écoute par défaut sur le port 6443 en HTTPS. Chaque requête est authentifiée, autorisée, admise (admission controllers), puis l'objet est validé et persisté dans etcd.",
          },
          {
            label: "Bon à savoir",
            value:
              "Vous pouvez explorer l'API vous-même : `kubectl proxy` expose l'API en local, et `kubectl get --raw /api/v1` affiche les ressources brutes. Pratique pour comprendre ce que fait réellement `kubectl`.",
          },
          {
            label: "Erreur fréquente",
            value:
              "« Unable to connect to the server » signifie presque toujours un kubeconfig périmé ou un cluster éteint — pas un problème dans vos manifests.",
          },
        ],
      },
    ],
  },
  {
    id: "etcd",
    title: "Le plan de contrôle : etcd",
    level: 3,
    intro:
      "La mémoire du cluster : une base clé-valeur distribuée où dort tout l'état.",
    blocks: [
      {
        kind: "fields",
        title: "etcd, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "etcd stocke de façon fiable et distribuée l'intégralité de l'état du cluster : Pods, Services, Secrets, tout y est.",
          },
          {
            label: "Pourquoi",
            value:
              "Si le plan de contrôle redémarre, il doit retrouver exactement où il en était. etcd garantit cette persistance avec un consensus (Raft) entre ses membres : la majorité doit être d'accord avant toute écriture.",
          },
          {
            label: "Conséquence pratique",
            value:
              "Sauvegardez etcd régulièrement en production (`etcdctl snapshot save`) : perdre etcd, c'est perdre la description de tout le cluster. Les données applicatives, elles, vivent dans vos volumes persistants — pas dans etcd.",
          },
          {
            label: "Bon à savoir",
            value:
              "Seul l'API Server parle à etcd : vous ne l'interrogez jamais directement en usage normal. Les Secrets y sont stockés en base64 par défaut — le chiffrement au repos est une option à activer explicitement.",
          },
        ],
      },
    ],
  },
  {
    id: "scheduler-controllers",
    title: "Le plan de contrôle : scheduler et controllers",
    level: 3,
    intro:
      "Deux travailleurs infatigables : l'un place, les autres réparent.",
    blocks: [
      {
        kind: "fields",
        title: "Les deux rôles",
        fields: [
          {
            label: "kube-scheduler — En une phrase",
            value:
              "Il choisit sur quel nœud placer chaque nouveau Pod, en fonction des ressources demandées, des contraintes et des affinités.",
          },
          {
            label: "kube-scheduler — Quand il intervient",
            value:
              "Uniquement à la création du Pod. Une fois placé, un Pod ne migre jamais seul : si son nœud meurt, le controller recrée le Pod ailleurs.",
          },
          {
            label: "kube-controller-manager — En une phrase",
            value:
              "Il exécute les boucles de contrôle qui rapprochent l'état réel de l'état désiré : un controller par type de ressource.",
          },
          {
            label: "Exemples de controllers",
            value:
              "Le Deployment controller maintient le nombre de réplicas, le Node controller détecte les nœuds morts, le Job controller relance les tâches échouées, le ServiceAccount controller crée les comptes par défaut.",
          },
          {
            label: "À retenir",
            value:
              "Kubernetes n'est pas un programme monolithique qui « fait » des choses : c'est une collection de boucles indépendantes qui observent et corrigent. Comprendre ça, c'est comprendre pourquoi le système se répare tout seul.",
          },
        ],
      },
    ],
  },
  {
    id: "kubelet-runtime",
    title: "Sur les nœuds : kubelet et container runtime",
    level: 3,
    intro:
      "L'agent qui exécute les ordres du plan de contrôle sur chaque machine.",
    blocks: [
      {
        kind: "fields",
        title: "kubelet et runtime, par angle",
        fields: [
          {
            label: "kubelet — En une phrase",
            value:
              "L'agent Kubernetes présent sur chaque nœud : il reçoit les définitions de Pods et s'assure que leurs conteneurs tournent.",
          },
          {
            label: "Comment il parle aux conteneurs",
            value:
              "Via l'interface CRI (Container Runtime Interface). Le runtime par défaut est `containerd`. Note historique utile : Docker comme runtime direct (dockershim) a été retiré en Kubernetes 1.24 — vos images Docker restent compatibles, c'est seulement le moteur d'exécution qui a changé.",
          },
          {
            label: "Ce qu'il surveille",
            value:
              "Les sondes (liveness/readiness), l'usage des ressources, et il remonte l'état au plan de contrôle. C'est aussi lui qui monte les volumes et injecte les variables d'environnement.",
          },
          {
            label: "Bonne pratique",
            value:
              "Ne vous connectez jamais aux nœuds pour « arranger » un conteneur à la main : toute modification manuelle sera écrasée par la boucle de réconciliation. Corrigez le manifest, réappliquez.",
          },
        ],
      },
    ],
  },
  {
    id: "kube-proxy",
    title: "Sur les nœuds : kube-proxy et le réseau des Services",
    level: 3,
    intro:
      "Comment une adresse de Service stable peut pointer vers des Pods qui naissent et meurent.",
    blocks: [
      {
        kind: "fields",
        title: "kube-proxy, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "kube-proxy est le proxy réseau présent sur chaque nœud : il implémente la redirection des Services vers les Pods (via iptables ou IPVS).",
          },
          {
            label: "Pourquoi",
            value:
              "Les Pods sont éphémères et changent d'IP à chaque redémarrage. Le Service offre une IP virtuelle stable ; kube-proxy maintient les règles qui distribuent le trafic vers les Pods sains du moment.",
          },
          {
            label: "Modèle réseau à retenir",
            value:
              "Dans Kubernetes, chaque Pod a sa propre IP et tous les Pods peuvent se parler directement, sans NAT. C'est le plugin réseau (CNI : Calico, Cilium, Flannel…) qui réalise ce réseau plat — kube-proxy ne s'occupe que des Services.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Un Service qui ne répond pas alors que les Pods tournent : vérifiez d'abord les endpoints (`kubectl get endpoints <svc>`) avant d'accuser le réseau.",
          },
        ],
      },
    ],
  },
  {
    id: "pods-cycle-de-vie",
    title: "Les Pods : cycle de vie",
    level: 3,
    intro:
      "L'unité de base : un ou plusieurs conteneurs qui partagent réseau et stockage — et une existence éphémère assumée.",
    blocks: [
      {
        kind: "text",
        text: "Un Pod regroupe des conteneurs « colocataires » : ils partagent la même adresse IP, peuvent se parler via `localhost`, et montent les mêmes volumes. En pratique, la plupart des Pods n'ont qu'un seul conteneur ; les conteneurs additionnels servent aux motifs sidecar (proxy, collecteur de logs).",
      },
      {
        kind: "table",
        headers: ["Phase", "Signification", "Réaction"],
        rows: [
          ["Pending", "En attente : pas encore placé ou image en cours de téléchargement", "Normal au démarrage ; anormal si ça dure"],
          ["Running", "Au moins un conteneur s'exécute", "Vérifier les sondes readiness avant d'envoyer du trafic"],
          ["Succeeded", "Tous les conteneurs ont terminé avec succès (Jobs)", "État final normal pour une tâche"],
          ["Failed", "Au moins un conteneur a terminé en erreur", "Lire les logs, `--previous` si redémarré"],
          ["Unknown", "L'état du nœud est inconnu (nœud injoignable)", "Problème d'infrastructure, pas de l'application"],
        ],
      },
      {
        kind: "text",
        text: "Règle d'or : on ne crée presque jamais un Pod directement en production — on passe par un Deployment, un Job ou un StatefulSet qui le gère. Un Pod seul n'est ni réparé ni mis à l'échelle : c'est le controller parent qui apporte ces garanties.",
      },
    ],
  },
  {
    id: "init-containers",
    title: "Init containers",
    level: 3,
    intro:
      "Des conteneurs qui s'exécutent — et se terminent — avant les conteneurs applicatifs.",
    blocks: [
      {
        kind: "fields",
        title: "Init containers, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Ils préparent le terrain (attendre une base de données, lancer des migrations, générer une configuration) puis s'arrêtent ; l'application ne démarre qu'après leur succès.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Attendre qu'un service dépendant soit joignable, initialiser un volume partagé, ou exécuter un script de setup qui ne doit tourner qu'une fois par démarrage.",
          },
          {
            label: "Exemple réel",
            value:
              "Un init container qui boucle avec `nslookup` ou un petit script jusqu'à ce que le Service `postgres` réponde, évitant à l'application de crasher en boucle au démarrage du cluster.",
          },
          {
            label: "À ne pas confondre",
            value:
              "Les init containers s'exécutent séquentiellement et doivent tous réussir ; les sidecars (conteneurs applicatifs secondaires) tournent en parallèle de l'application principale.",
          },
        ],
      },
    ],
  },
  {
    id: "probes",
    title: "Sondes : liveness, readiness, startup",
    level: 3,
    intro:
      "Comment Kubernetes sait si votre application va bien — et ce qu'il fait quand ça va mal.",
    blocks: [
      {
        kind: "table",
        headers: ["Sonde", "Question posée", "Si échec"],
        rows: [
          ["livenessProbe", "L'application est-elle vivante ?", "Le conteneur est redémarré"],
          ["readinessProbe", "L'application est-elle prête à recevoir du trafic ?", "Le Pod est retiré des endpoints du Service (sans redémarrage)"],
          ["startupProbe", "L'application a-t-elle fini de démarrer ?", "Protège les démarrages lents d'un redémarrage prématuré par la liveness"],
        ],
      },
      {
        kind: "code",
        language: "yaml",
        title: "Sondes HTTP sur une API",
        code: "livenessProbe:\n  httpGet:\n    path: /healthz\n    port: 8080\n  initialDelaySeconds: 10\n  periodSeconds: 10\nreadinessProbe:\n  httpGet:\n    path: /ready\n    port: 8080\n  initialDelaySeconds: 5\n  periodSeconds: 5\nstartupProbe:\n  httpGet:\n    path: /healthz\n    port: 8080\n  failureThreshold: 30\n  periodSeconds: 10",
      },
      {
        kind: "fields",
        title: "Pièges classiques",
        fields: [
          {
            label: "Erreur fréquente",
            value:
              "Une `livenessProbe` trop agressive sur une application au démarrage lent : Kubernetes tue le conteneur en pleine initialisation, qui redémarre, qui se fait tuer… La `startupProbe` existe précisément pour ce cas.",
          },
          {
            label: "Bonne pratique",
            value:
              "La readiness doit tester les dépendances réelles (base joignable ?), la liveness doit rester légère (le processus répond-il ?). Une liveness qui dépend de la base redémarre l'application pour une panne qui n'est pas la sienne.",
          },
          {
            label: "Types de sondes",
            value:
              "`httpGet` (endpoint HTTP), `tcpSocket` (port ouvert), `exec` (commande dans le conteneur, code retour 0 = succès).",
          },
        ],
      },
    ],
  },
  {
    id: "deployments",
    title: "Deployments et ReplicaSets",
    level: 3,
    intro:
      "La ressource reine : déclarez « N copies de ce Pod », Kubernetes s'occupe du reste.",
    blocks: [
      {
        kind: "diagram",
        title: "Hiérarchie de gestion",
        lines: [
          "Deployment  (vous déclarez : image, réplicas, stratégie)",
          "     │ crée et pilote",
          "     ▼",
          "ReplicaSet  (maintient N Pods identiques)",
          "     │ crée et surveille",
          "     ▼",
          "Pods  (vos conteneurs, éphémères et remplaçables)",
        ],
      },
      {
        kind: "text",
        text: "Vous ne manipulez quasiment jamais un ReplicaSet directement : c'est le Deployment qui en crée un nouveau à chaque changement de template de Pod (nouvelle image, par exemple), ce qui permet les mises à jour progressives et les retours en arrière. Le champ `selector.matchLabels` lie le Deployment à ses Pods — il est immuable après création, d'où l'importance de le définir correctement dès le départ.",
      },
      {
        kind: "code",
        language: "yaml",
        title: "Deployment avec stratégie de rolling update",
        code: "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: mon-app\nspec:\n  replicas: 3\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 1\n      maxUnavailable: 0\n  selector:\n    matchLabels:\n      app: mon-app\n  template:\n    metadata:\n      labels:\n        app: mon-app\n    spec:\n      containers:\n        - name: app\n          image: mon-app:2.4.0",
      },
    ],
  },
  {
    id: "rolling-update",
    title: "Rolling update : le déploiement sans interruption",
    level: 3,
    intro:
      "La stratégie par défaut : remplacer les Pods un par un, sans couper le service.",
    blocks: [
      {
        kind: "fields",
        title: "Rolling update, par angle",
        fields: [
          {
            label: "Comment ça marche",
            value:
              "Kubernetes crée progressivement des Pods avec la nouvelle version tout en terminant les anciens. Le Service continue de router vers les Pods sains : à aucun moment le service n'est interrompu si les sondes readiness sont bien configurées.",
          },
          {
            label: "maxSurge",
            value:
              "Nombre de Pods supplémentaires autorisés au-dessus des réplicas désirés pendant la mise à jour (`1` = un Pod de plus). Permet de démarrer les nouveaux avant de tuer les anciens.",
          },
          {
            label: "maxUnavailable",
            value:
              "Nombre de Pods indisponibles tolérés (`0` = aucune interruption acceptée). Avec `maxSurge: 1, maxUnavailable: 0`, la capacité ne baisse jamais.",
          },
          {
            label: "Bonne pratique",
            value:
              "Toujours définir une `readinessProbe` : sans elle, Kubernetes envoie du trafic à un Pod pas encore prêt. Et surveillez avec `kubectl rollout status` — une mise à jour bloquée (nouvelle image qui crash) reste visible au lieu de basculer silencieusement.",
          },
        ],
      },
    ],
  },
  {
    id: "autres-strategies",
    title: "Autres stratégies de déploiement (notions)",
    level: 3,
    intro:
      "Le rolling update ne convient pas à tout : panorama des alternatives.",
    blocks: [
      {
        kind: "table",
        headers: ["Stratégie", "Principe", "Quand l'utiliser"],
        rows: [
          ["Recreate", "Tue tous les anciens Pods, puis démarre les nouveaux (`strategy.type: Recreate`)", "Bases de données ou apps ne supportant pas deux versions simultanées ; interruption acceptée"],
          ["Rolling", "Remplacement progressif (défaut)", "Le cas général des applications stateless"],
          ["Blue-Green", "Deux environnements complets ; on bascule le trafic d'un coup", "Bascule instantanée et retour arrière immédiat ; coûte le double en ressources"],
          ["Canary", "Une fraction du trafic vers la nouvelle version, puis généralisation", "Valider en production réelle avec un risque limité"],
        ],
      },
      {
        kind: "text",
        text: "Blue-Green et Canary ne sont pas natifs dans un Deployment simple : on les réalise en jouant avec les sélecteurs de Services, ou avec des opérateurs dédiés (Argo Rollouts, Flagger — à explorer quand le besoin se présente). L'essentiel est de connaître leur existence et leur logique avant d'en avoir besoin.",
      },
    ],
  },
  {
    id: "rollout",
    title: "Suivre et annuler un déploiement",
    level: 3,
    intro:
      "Kubernetes garde l'historique : une mise à jour ratée se répare en une commande.",
    blocks: [
      {
        kind: "command",
        label: "Suivre une mise à jour en cours",
        command: "kubectl rollout status deployment/mon-app",
        why: "Affiche la progression du rolling update en temps réel et bloque jusqu'à sa fin (ou son échec). À lancer systématiquement après un `apply` qui change l'image : c'est votre filet de sécurité.",
        verify: "Le message « deployment successfully rolled out » apparaît.",
      },
      {
        kind: "command",
        label: "Voir l'historique des révisions",
        command: "kubectl rollout history deployment/mon-app",
        why: "Liste les révisions conservées (chaque changement de template crée une révision). Indispensable pour savoir vers quoi revenir en cas de problème.",
      },
      {
        kind: "command",
        label: "Revenir à la version précédente",
        command: "kubectl rollout undo deployment/mon-app",
        why: "Annule la dernière mise à jour en restaurant le ReplicaSet précédent — sans reconstruire d'image ni réécrire de YAML. C'est la raison pour laquelle on versionne les images avec des tags explicites plutôt que `latest`.",
        verify: "`rollout status` confirme le retour à l'état précédent.",
      },
      {
        kind: "command",
        label: "Forcer le redémarrage des Pods",
        command: "kubectl rollout restart deployment/mon-app",
        why: "Recrée tous les Pods avec la configuration actuelle (utile après une rotation de Secret ou de ConfigMap, que les Pods ne rechargent pas automatiquement).",
      },
    ],
  },
  {
    id: "services-clusterip",
    title: "Services : ClusterIP",
    level: 3,
    intro:
      "Le type par défaut : une adresse stable pour parler à des Pods instables, à l'intérieur du cluster.",
    blocks: [
      {
        kind: "fields",
        title: "ClusterIP, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un Service ClusterIP expose un ensemble de Pods via une IP virtuelle stable, accessible uniquement depuis l'intérieur du cluster.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Communication interne entre services : votre API appelle la base de données, le frontend appelle l'API. C'est le type le plus courant — commencez toujours par lui.",
          },
          {
            label: "Comment ça marche",
            value:
              "Le Service sélectionne les Pods via son `selector`, surveille en continu les endpoints sains, et kube-proxy répartit le trafic (round-robin par défaut) entre eux.",
          },
          {
            label: "Exemple réel",
            value:
              "L'application se connecte à `postgres://db:5432` où `db` est le nom du Service : même si les Pods postgres sont recréés avec de nouvelles IP, le nom reste valide grâce au DNS du cluster.",
          },
        ],
      },
    ],
  },
  {
    id: "services-nodeport-loadbalancer",
    title: "Services : NodePort, LoadBalancer, ExternalName",
    level: 3,
    intro:
      "Exposer vers l'extérieur : les trois autres types de Service et leurs cas d'usage.",
    blocks: [
      {
        kind: "table",
        headers: ["Type", "Principe", "Cas d'usage"],
        rows: [
          ["ClusterIP", "IP interne stable (défaut)", "Communication entre services du cluster"],
          ["NodePort", "Ouvre un port fixe (30000–32767) sur chaque nœud", "Accès direct en dev/test, démonstrations"],
          ["LoadBalancer", "Demande un équilibreur au fournisseur cloud", "Exposition publique en production sur AWS/GCP/Azure…"],
          ["ExternalName", "Alias DNS vers un nom externe (pas de proxy)", "Pointer un nom interne vers une base managée externe"],
        ],
      },
      {
        kind: "fields",
        title: "Points d'attention",
        fields: [
          {
            label: "NodePort — limite",
            value:
              "La plage 30000–32767 est imposée par défaut : c'est un outil de développement, pas une solution d'exposition publique propre (pas de TLS, pas de routage par nom d'hôte).",
          },
          {
            label: "LoadBalancer — coût",
            value:
              "Chaque Service de ce type provisionne un équilibreur facturé par le cloud. En local (minikube), `minikube tunnel` simule ce comportement.",
          },
          {
            label: "Bonne pratique",
            value:
              "En production, on expose rarement des Services en NodePort/LoadBalancer un par un : on met un Ingress devant des Services ClusterIP (section suivante).",
          },
        ],
      },
    ],
  },
  {
    id: "dns-cluster",
    title: "DNS du cluster et découverte de services",
    level: 3,
    intro:
      "Pourquoi `http://mon-service` fonctionne depuis n'importe quel Pod.",
    blocks: [
      {
        kind: "fields",
        title: "Le DNS interne, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "CoreDNS (le serveur DNS du cluster) résout automatiquement chaque Service en son IP : `<nom-service>` suffit dans le même namespace.",
          },
          {
            label: "Nom complet",
            value:
              "`<service>.<namespace>.svc.cluster.local` : utilisez cette forme longue pour appeler un service d'un autre namespace sans ambiguïté.",
          },
          {
            label: "Exemple réel",
            value:
              "Depuis un Pod du namespace `prod`, `curl http://api:8080/health` joint le Service `api`. Depuis un autre namespace, il faudra `http://api.prod:8080/health`.",
          },
          {
            label: "Erreur fréquente",
            value:
              "« Could not resolve host » : le Service n'existe pas (faute de frappe ? mauvais namespace ?) ou le Pod est dans un namespace différent sans nom qualifié.",
          },
          {
            label: "Bon à savoir",
            value:
              "Kubernetes injecte aussi des variables d'environnement (`MON_SERVICE_SERVICE_HOST`) par compatibilité historique avec Docker links, mais le DNS est la voie moderne et recommandée.",
          },
        ],
      },
    ],
  },
  {
    id: "ingress",
    title: "Ingress : la porte d'entrée HTTP",
    level: 3,
    intro:
      "Un seul point d'entrée pour router le trafic HTTP vers vos services selon l'hôte et le chemin.",
    blocks: [
      {
        kind: "fields",
        title: "Ingress, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "L'Ingress expose les Services HTTP(S) vers l'extérieur avec un routage de niveau 7 : `app.example.com` → service A, `app.example.com/api` → service B.",
          },
          {
            label: "Point crucial",
            value:
              "La ressource Ingress seule ne fait rien : il faut un contrôleur d'Ingress qui l'implémente (par exemple `ingress-nginx`). Sans contrôleur installé, vos règles sont ignorées silencieusement.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Dès que plusieurs services doivent être exposés proprement : un seul LoadBalancer devant l'Ingress, TLS centralisé, routage par nom d'hôte.",
          },
          {
            label: "IngressClass",
            value:
              "Quand plusieurs contrôleurs coexistent, le champ `ingressClassName` indique lequel doit traiter chaque Ingress.",
          },
        ],
      },
      {
        kind: "code",
        language: "yaml",
        title: "Ingress : deux hôtes, TLS",
        code: "apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: mon-app\nspec:\n  ingressClassName: nginx\n  tls:\n    - hosts:\n        - app.example.com\n      secretName: tls-app\n  rules:\n    - host: app.example.com\n      http:\n        paths:\n          - path: /\n            pathType: Prefix\n            backend:\n              service:\n                name: frontend\n                port:\n                  number: 80\n          - path: /api\n            pathType: Prefix\n            backend:\n              service:\n                name: api\n                port:\n                  number: 8080",
      },
      {
        kind: "text",
        text: "Le TLS se termine à l'Ingress avec un Secret contenant le certificat : vos applications internes restent en HTTP simple. En production, un outil comme cert-manager automatise l'obtention et le renouvellement des certificats Let's Encrypt (mention : à découvrir après les bases).",
      },
    ],
  },
  {
    id: "configmaps",
    title: "ConfigMaps : la configuration non sensible",
    level: 3,
    intro:
      "Séparer la configuration du code : la même image tourne en dev, staging et prod avec des ConfigMaps différentes.",
    blocks: [
      {
        kind: "command",
        label: "Créer une ConfigMap depuis des paires clé/valeur",
        command: "kubectl create configmap app-config --from-literal=LOG_LEVEL=info --from-literal=API_URL=https://api.example.com",
        why: "Crée rapidement une ConfigMap sans écrire de YAML — pratique pour tester. `--from-file` permet d'embarquer un fichier de configuration complet.",
        verify: "`kubectl get configmap app-config -o yaml` affiche les données.",
      },
      {
        kind: "code",
        language: "yaml",
        title: "Consommer une ConfigMap dans un Pod",
        code: "spec:\n  containers:\n    - name: app\n      image: mon-app:2.4.0\n      envFrom:\n        - configMapRef:\n            name: app-config   # chaque clé devient une variable d'environnement\n      volumeMounts:\n        - name: config\n          mountPath: /etc/app # un fichier monté peut aussi être utilisé\n  volumes:\n    - name: config\n      configMap:\n        name: app-config",
      },
      {
        kind: "fields",
        title: "À retenir",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "12-factor app : l'image reste identique entre environnements, seule la ConfigMap change. Ne reconstruisez jamais une image pour changer une URL.",
          },
          {
            label: "Limite",
            value:
              "Les Pods ne rechargent pas automatiquement une ConfigMap modifiée (sauf volume monté, avec un délai). Après un changement : `kubectl rollout restart`.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Mettre des mots de passe dans une ConfigMap « parce que c'est pratique » : les ConfigMaps sont lisibles en clair par quiconque peut les lister. Secrets → section suivante.",
          },
        ],
      },
    ],
  },
  {
    id: "secrets",
    title: "Secrets : les données sensibles",
    level: 3,
    intro:
      "Mots de passe, tokens, certificats : comme les ConfigMaps, mais avec des garde-fous — et des limites à connaître.",
    blocks: [
      {
        kind: "command",
        label: "Créer un Secret",
        command: "kubectl create secret generic db-credentials --from-literal=username=app --from-literal=password='S3cret!ChangeMe'",
        why: "Stocke les identifiants hors du code et hors des manifests versionnés. La valeur n'apparaît jamais en clair dans le YAML appliqué via cette commande.",
        verify: "`kubectl get secret db-credentials -o yaml` montre les valeurs en base64.",
      },
      {
        kind: "fields",
        title: "Secrets, en toute honnêteté",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un Secret est une ConfigMap dont les valeurs sont encodées en base64 et dont l'accès est un peu mieux contrôlé — ce n'est PAS du chiffrement.",
          },
          {
            label: "Limite réelle",
            value:
              "Par défaut, les Secrets sont stockés en clair (base64 = encodage, pas chiffrement) dans etcd. Le chiffrement au repos s'active explicitement côté API Server, et en production on utilise un gestionnaire externe (HashiCorp Vault, gestionnaires cloud).",
          },
          {
            label: "Bonnes pratiques",
            value:
              "Ne versionnez jamais un manifest contenant un Secret en clair ; limitez l'accès via RBAC ; préférez l'injection par variable d'environnement ou volume plutôt que l'affichage en logs.",
          },
          {
            label: "Cas particulier",
            value:
              "Les identifiants de registre privé utilisent le type `dockerconfigjson` (`kubectl create secret docker-registry …`) et se référencent via `imagePullSecrets` dans le Pod.",
          },
        ],
      },
    ],
  },
  {
    id: "volumes-emptydir-hostpath",
    title: "Volumes : emptyDir et hostPath",
    level: 3,
    intro:
      "Les conteneurs sont éphémères : les volumes donnent aux données un endroit où survivre.",
    blocks: [
      {
        kind: "table",
        headers: ["Volume", "Durée de vie", "Cas d'usage / avertissement"],
        rows: [
          ["emptyDir", "Vie du Pod : supprimé avec lui", "Cache, fichiers temporaires, partage entre conteneurs d'un même Pod"],
          ["hostPath", "Vie du nœud : survit au Pod", "À éviter en production : lie le Pod à une machine précise, casse la portabilité"],
          ["configMap / secret", "Vie de la ressource source", "Injecter configuration et secrets sous forme de fichiers"],
        ],
      },
      {
        kind: "text",
        text: "Ces volumes couvrent les besoins simples, mais pas la persistance réelle : si le Pod est recréé sur un autre nœud, `emptyDir` repart vide et `hostPath` pointe vers une autre machine. Pour les données qui doivent survivre, il faut les volumes persistants (section suivante).",
      },
    ],
  },
  {
    id: "pv-pvc-storageclass",
    title: "Stockage persistant : PV, PVC, StorageClass",
    level: 3,
    intro:
      "Le trio qui donne à vos bases de données un disque qui survit aux Pods.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois rôles",
        fields: [
          {
            label: "PersistentVolume (PV) — En une phrase",
            value:
              "Un morceau de stockage provisionné dans le cluster (disque cloud, NFS…), géré par l'administrateur ou provisionné dynamiquement.",
          },
          {
            label: "PersistentVolumeClaim (PVC) — En une phrase",
            value:
              "La demande de stockage formulée par l'application : « 10 Go en lecture-écriture ». Kubernetes lie le PVC à un PV compatible.",
          },
          {
            label: "StorageClass — En une phrase",
            value:
              "Le « profil » de stockage (SSD, HDD, répliqué…) qui permet le provisionnement dynamique : le PVC est satisfait automatiquement sans PV pré-créé.",
          },
          {
            label: "Pourquoi cette séparation",
            value:
              "Le développeur demande ce dont il a besoin (PVC) sans connaître l'infrastructure ; l'administrateur fournit des classes de stockage. Chacun son métier.",
          },
        ],
      },
      {
        kind: "code",
        language: "yaml",
        title: "PVC + utilisation dans un Pod",
        code: "apiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: db-data\nspec:\n  accessModes:\n    - ReadWriteOnce\n  storageClassName: standard\n  resources:\n    requests:\n      storage: 10Gi\n---\n# Dans le Pod :\n# volumes:\n#   - name: data\n#     persistentVolumeClaim:\n#         claimName: db-data\n# volumeMounts:\n#   - name: data\n#     mountPath: /var/lib/postgresql/data",
      },
      {
        kind: "text",
        text: "En local avec minikube ou kind, une StorageClass par défaut existe généralement déjà : vos PVC sont provisionnés sans configuration. En production cloud, vérifiez les classes disponibles (`kubectl get storageclass`) — les noms varient selon le fournisseur.",
      },
    ],
  },
  {
    id: "statefulsets-notion",
    title: "StatefulSets (notion)",
    level: 3,
    intro:
      "Quand les réplicas ne sont pas interchangeables : bases de données et systèmes distribués.",
    blocks: [
      {
        kind: "fields",
        title: "StatefulSet, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Comme un Deployment, mais chaque Pod reçoit une identité stable (`db-0`, `db-1`) et un stockage stable, créés et supprimés dans l'ordre.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Bases de données, files de messages, tout système où « le réplica n°2 » a un sens (réplication maître/esclave, quorum).",
          },
          {
            label: "Différence clé avec Deployment",
            value:
              "Les Pods ne sont pas interchangeables : `db-0` retrouvera toujours son volume, même après recréation. Le déploiement se fait dans l'ordre, un Pod à la fois.",
          },
          {
            label: "Bonne pratique",
            value:
              "Opérer une base de données sur Kubernetes reste un sujet d'expert (sauvegardes, failover). En production, les bases managées du cloud sont souvent le choix le plus raisonnable.",
          },
        ],
      },
    ],
  },
  {
    id: "jobs-cronjobs-daemonsets",
    title: "Jobs, CronJobs, DaemonSets (notions)",
    level: 3,
    intro:
      "Les controllers pour tout ce qui n'est pas un service web permanent.",
    blocks: [
      {
        kind: "table",
        headers: ["Ressource", "Rôle", "Exemple réel"],
        rows: [
          ["Job", "Exécute une tâche jusqu'à son succès, puis s'arrête", "Migration de base de données, traitement batch, génération de rapport"],
          ["CronJob", "Un Job planifié dans le temps (syntaxe cron)", "Sauvegarde quotidienne à 2h, nettoyage hebdomadaire"],
          ["DaemonSet", "Un Pod sur chaque nœud (ou un sous-ensemble)", "Agent de collecte de logs, sonde de monitoring, plugin réseau"],
        ],
      },
      {
        kind: "text",
        text: "Le point commun : ce sont des abstractions au-dessus des Pods, comme le Deployment. Un Job dont le Pod échoue sera relancé selon sa politique (`backoffLimit`) ; un CronJob crée un Job à chaque échéance. Pour les tâches planifiées, vérifiez toujours le fuseau horaire et l'historique (`kubectl get jobs`).",
      },
    ],
  },
  {
    id: "requests-limits",
    title: "Resources : requests et limits",
    level: 3,
    intro:
      "Déclarer ce que votre conteneur consomme : la base d'une planification saine et d'une facturation maîtrisée.",
    blocks: [
      {
        kind: "fields",
        title: "Requests et limits, par angle",
        fields: [
          {
            label: "requests — En une phrase",
            value:
              "La quantité garantie : le scheduler ne place le Pod que sur un nœud disposant d'au moins ces ressources.",
          },
          {
            label: "limits — En une phrase",
            value:
              "Le plafond : le conteneur qui dépasse sa limite mémoire est tué (OOMKilled) ; le CPU est étranglé (throttling).",
          },
          {
            label: "Unités",
            value:
              "CPU en millicores (`500m` = un demi-cœur), mémoire en `Mi`/`Gi` (`256Mi`). Sans unité, `1` CPU = 1000m et `128` mémoire = 128 octets — précisez toujours les unités.",
          },
          {
            label: "Classes de QoS",
            value:
              "Selon que requests/limits sont définis et égaux, le Pod est classé Guaranteed, Burstable ou BestEffort. En cas de pénurie sur un nœud, les BestEffort sont évincés en premier.",
          },
        ],
      },
      {
        kind: "code",
        language: "yaml",
        title: "Resources dans un conteneur",
        code: "resources:\n  requests:\n    cpu: \"250m\"\n    memory: \"128Mi\"\n  limits:\n    cpu: \"1000m\"\n    memory: \"512Mi\"",
      },
      {
        kind: "text",
        text: "Erreur classique : ne définir ni requests ni limits. Le Pod devient BestEffort — premier évincé en cas de pression — et le scheduler place les Pods « à l'aveugle », ce qui mène aux nœuds surchargés. En production, toujours définir au minimum des requests réalistes, mesurées en observant l'usage réel.",
      },
    ],
  },
  {
    id: "hpa",
    title: "Autoscaling : HPA (notion)",
    level: 3,
    intro:
      "Faire varier le nombre de réplicas automatiquement selon la charge.",
    blocks: [
      {
        kind: "fields",
        title: "HorizontalPodAutoscaler, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Le HPA ajuste le nombre de réplicas d'un Deployment en fonction de métriques (CPU, mémoire, ou métriques personnalisées).",
          },
          {
            label: "Prérequis",
            value:
              "Le metrics-server doit être installé dans le cluster (addon minikube : `minikube addons enable metrics-server`), et les Pods doivent déclarer des requests CPU pour que le pourcentage ait un sens.",
          },
          {
            label: "Exemple",
            value:
              "`kubectl autoscale deployment mon-app --cpu-percent=70 --min=2 --max=10` : entre 2 et 10 réplicas pour maintenir ~70 % d'utilisation CPU.",
          },
          {
            label: "Limite",
            value:
              "Le HPA ne fait que changer le nombre de réplicas : sans readinessProbe et sans application capable de démarrer vite, l'autoscaling arrive trop tard. C'est un amplificateur de bonnes pratiques, pas un substitut.",
          },
        ],
      },
    ],
  },
  {
    id: "rbac",
    title: "RBAC : qui a le droit de faire quoi (notion)",
    level: 3,
    intro:
      "Le contrôle d'accès du cluster : indispensable dès qu'on n'est plus seul.",
    blocks: [
      {
        kind: "fields",
        title: "RBAC, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "RBAC associe des identités (utilisateurs, ServiceAccounts) à des permissions (verbes sur ressources) dans un périmètre (namespace ou cluster).",
          },
          {
            label: "Les quatre objets",
            value:
              "`Role` (permissions dans un namespace) et `ClusterRole` (cluster entier ou ressources non namespacées), liés aux identités via `RoleBinding` et `ClusterRoleBinding`.",
          },
          {
            label: "Principe",
            value:
              "Moindre privilège : une application n'obtient que les droits dont elle a besoin, dans son namespace. Le compte `default` de chaque namespace ne devrait presque rien pouvoir faire en production.",
          },
          {
            label: "Commande utile",
            value:
              "`kubectl auth can-i create deployments -n mon-app` répond `yes`/`no` : le moyen le plus rapide de vérifier un droit sans deviner.",
          },
          {
            label: "Erreur fréquente",
            value:
              "« Forbidden » ou « is forbidden » : ce n'est pas un bug réseau, c'est RBAC qui refuse. La solution est dans les Roles/Bindings, pas dans l'application.",
          },
        ],
      },
    ],
  },
  {
    id: "networkpolicies",
    title: "NetworkPolicies : le pare-feu entre Pods (notion)",
    level: 3,
    intro:
      "Par défaut, tout Pod peut parler à tout Pod. Les NetworkPolicies changent la donne.",
    blocks: [
      {
        kind: "fields",
        title: "NetworkPolicies, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Une NetworkPolicy déclare quel trafic est autorisé vers/depuis un ensemble de Pods sélectionnés par labels.",
          },
          {
            label: "Point crucial",
            value:
              "Par défaut, tout est autorisé. Dès qu'une policy sélectionne un Pod, celui-ci devient « isolé » : seul le trafic explicitement autorisé passe. C'est un changement de comportement radical à tester prudemment.",
          },
          {
            label: "Prérequis",
            value:
              "Le plugin réseau (CNI) doit les supporter : tous ne le font pas. Vérifiez la documentation de votre CNI avant de compter dessus.",
          },
          {
            label: "Cas d'usage typique",
            value:
              "La base de données n'accepte que le trafic du namespace `backend` ; le namespace `frontend` ne peut pas la joindre directement.",
          },
        ],
      },
    ],
  },
  {
    id: "helm",
    title: "Helm : le gestionnaire de paquets",
    level: 3,
    intro:
      "Installer des applications complexes en une commande, avec des valeurs paramétrables.",
    blocks: [
      {
        kind: "fields",
        title: "Helm, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Helm package des manifests Kubernetes en « charts » paramétrables : on installe PostgreSQL, Redis ou Prometheus avec leurs dizaines de ressources en une commande.",
          },
          {
            label: "Vocabulaire",
            value:
              "Chart = le paquet (templates + valeurs par défaut). Release = une instance installée d'un chart. `values.yaml` = le fichier qui personnalise l'installation.",
          },
          {
            label: "Pourquoi",
            value:
              "Éviter de copier-coller 500 lignes de YAML pour chaque base de données, et bénéficier des mises à jour du chart maintenu par la communauté.",
          },
          {
            label: "Limite honnête",
            value:
              "Helm ne remplace pas la compréhension des ressources : quand le chart fait quelque chose d'inattendu, il faut savoir lire les templates. Apprenez les manifests d'abord, Helm ensuite.",
          },
        ],
      },
      {
        kind: "command",
        label: "Ajouter un dépôt de charts",
        command: "helm repo add bitnami https://charts.bitnami.com/bitnami",
        why: "Enregistre un catalogue de charts maintenus par la communauté. Comme pour tout paquet tiers : vérifiez la source et la maintenance avant un usage en production.",
        verify: "`helm repo list` affiche le dépôt ajouté.",
      },
      {
        kind: "command",
        label: "Installer une application",
        command: "helm install ma-db bitnami/postgresql --set auth.password='ChangeMe123'",
        why: "Déploie PostgreSQL complet (StatefulSet, Service, Secret, PVC) avec un mot de passe personnalisé. `--set` surcharge une valeur sans éditer de fichier.",
        verify: "`helm list` montre la release, `kubectl get pods` montre les Pods démarrer.",
      },
      {
        kind: "command",
        label: "Mettre à jour et désinstaller",
        command: "helm upgrade ma-db bitnami/postgresql --set auth.password='NouveauMotDePasse'",
        why: "`upgrade` applique une nouvelle configuration en conservant l'historique des révisions (retour arrière possible avec `helm rollback`). `helm uninstall ma-db` supprime proprement la release.",
      },
    ],
  },
  {
    id: "kustomize-notion",
    title: "Kustomize (notion)",
    level: 3,
    intro:
      "Personnaliser des manifests sans les dupliquer ni apprendre un langage de templating.",
    blocks: [
      {
        kind: "fields",
        title: "Kustomize, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Kustomize part d'une base de manifests et applique des surcharges par environnement (dev/staging/prod) : même base, paramètres différents.",
          },
          {
            label: "Différence avec Helm",
            value:
              "Pas de templates ni de langage : on écrit du YAML pur, et Kustomize le patch. Intégré directement à kubectl (`kubectl apply -k`).",
          },
          {
            label: "Structure typique",
            value:
              "Un dossier `base/` avec les manifests communs et un `kustomization.yaml` par environnement dans `overlays/dev`, `overlays/prod` (suffixes de noms, nombre de réplicas, images différentes).",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Vos propres applications déployées en plusieurs environnements, quand Helm serait disproportionné.",
          },
        ],
      },
      {
        kind: "command",
        label: "Appliquer une surcouche Kustomize",
        command: "kubectl apply -k overlays/prod",
        why: "Construit les manifests finaux (base + patches de l'environnement) et les applique. Le `-k` signale à kubectl de passer par Kustomize au lieu d'un simple fichier.",
        verify: "Les ressources sont créées avec les personnalisations de l'overlay.",
      },
    ],
  },
  {
    id: "observabilite",
    title: "Observabilité : logs, événements, métriques",
    level: 3,
    intro:
      "On n'administre bien que ce qu'on observe : les trois piliers côté Kubernetes.",
    blocks: [
      {
        kind: "command",
        label: "Suivre les logs de tous les Pods d'une application",
        command: "kubectl logs -l app=mon-app -f --tail=50",
        why: "Le sélecteur `-l` agrège les logs de tous les réplicas : indispensable quand on ne sait pas quel Pod pose problème. `--tail` limite aux dernières lignes pour ne pas être noyé.",
      },
      {
        kind: "command",
        label: "Lire les logs du conteneur précédent après un crash",
        command: "kubectl logs <nom-du-pod> --previous",
        why: "Après un CrashLoopBackOff, le conteneur actuel vient de redémarrer et ses logs sont vides : `--previous` lit ceux du conteneur mort, où se trouve l'erreur fatale.",
      },
      {
        kind: "fields",
        title: "Les trois piliers",
        fields: [
          {
            label: "Logs",
            value:
              "Éphémères par nature : quand un Pod meurt, ses logs meurent avec lui. En production, on les centralise (Loki, Elasticsearch, Cloud Logging) via un agent en DaemonSet.",
          },
          {
            label: "Événements",
            value:
              "`kubectl get events` : le journal du plan de contrôle. Limités en nombre et en durée de rétention — un outil de diagnostic immédiat, pas d'audit.",
          },
          {
            label: "Métriques",
            value:
              "`kubectl top pods/nodes` (via metrics-server) pour un aperçu instantané ; Prometheus + Grafana pour l'historique, les alertes et les tableaux de bord — le standard de fait, à installer via Helm.",
          },
        ],
      },
    ],
  },
  {
    id: "securite-pod",
    title: "Sécuriser les Pods : securityContext (notion)",
    level: 3,
    intro:
      "Des réglages simples qui réduisent drastiquement la surface d'attaque.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "securityContext recommandé",
        code: "spec:\n  securityContext:\n    runAsNonRoot: true\n    runAsUser: 1000\n    seccompProfile:\n      type: RuntimeDefault\n  containers:\n    - name: app\n      image: mon-app:2.4.0\n      securityContext:\n        allowPrivilegeEscalation: false\n        readOnlyRootFilesystem: true\n        capabilities:\n          drop:\n            - ALL",
      },
      {
        kind: "fields",
        title: "Chaque réglage, expliqué",
        fields: [
          {
            label: "runAsNonRoot",
            value:
              "Interdit l'exécution en root : un conteneur compromis a alors des pouvoirs limités sur le nœud.",
          },
          {
            label: "readOnlyRootFilesystem",
            value:
              "Système de fichiers en lecture seule : un attaquant ne peut pas y écrire de malware. Les écritures nécessaires passent par des volumes dédiés.",
          },
          {
            label: "drop ALL capabilities",
            value:
              "Retire les capacités Linux héritées par défaut ; on n'ajoute ensuite que le strict nécessaire.",
          },
          {
            label: "Bonne pratique",
            value:
              "Appliquez ces réglages dès le développement : découvrir en production que l'image exige root est une mauvaise surprise. Les images officielles récentes sont de plus en plus souvent prévues pour tourner non-root.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-images",
    title: "Erreurs fréquentes : images",
    level: 3,
    intro:
      "Le Pod ne démarre même pas : dans 90 % des cas, le problème est l'image.",
    blocks: [
      {
        kind: "table",
        headers: ["Statut", "Cause probable", "Solution"],
        rows: [
          ["ImagePullBackOff / ErrImagePull", "Nom d'image ou tag inexistant, faute de frappe", "Vérifier le nom exact (`kubectl describe pod` montre l'image tentée)"],
          ["ImagePullBackOff persistant", "Registre privé sans authentification", "Créer un Secret `docker-registry` et le référencer via `imagePullSecrets`"],
          ["ImagePullBackOff intermittent", "Limite de débit du registre (rate limiting)", "Utiliser un miroir ou un registre privé en relais, éviter les pulls répétés"],
        ],
      },
      {
        kind: "command",
        label: "Diagnostiquer un échec de pull",
        command: "kubectl describe pod <nom-du-pod>",
        why: "La section Events donne l'erreur exacte du registre (« not found », « unauthorized », « rate limit exceeded ») : trois messages, trois solutions différentes. Deviner sans lire l'événement fait perdre un temps fou.",
      },
      {
        kind: "text",
        text: "Prévention : testez toujours `docker pull <image>` depuis votre machine avant d'accuser Kubernetes. Si le pull échoue en local, le problème n'est pas le cluster.",
      },
    ],
  },
  {
    id: "erreurs-crash",
    title: "Erreurs fréquentes : CrashLoopBackOff et OOMKilled",
    level: 3,
    intro:
      "Le conteneur démarre puis meurt en boucle : c'est l'application (ou ses ressources) qui parle.",
    blocks: [
      {
        kind: "table",
        headers: ["Statut", "Cause probable", "Solution"],
        rows: [
          ["CrashLoopBackOff", "L'application plante au démarrage (config invalide, dépendance injoignable, port déjà utilisé)", "`kubectl logs --previous` pour voir l'erreur fatale du conteneur mort"],
          ["CrashLoopBackOff", "Sonde liveness trop agressive sur démarrage lent", "Ajouter/ajuster une `startupProbe`"],
          ["OOMKilled", "Mémoire au-delà de la limite", "Augmenter `limits.memory` ou corriger la fuite mémoire — tuer n'est pas soigner"],
          ["Error / Completed inattendu", "La commande du conteneur se termine immédiatement", "Vérifier `command`/`args` : un conteneur doit garder un processus au premier plan"],
        ],
      },
      {
        kind: "text",
        text: "Notez le « BackOff » : Kubernetes espace de plus en plus les tentatives de redémarrage (délai exponentiel). C'est une protection, pas un bug — elle évite de marteler une dépendance en panne. Laissez le délai faire son travail pendant que vous lisez les logs.",
      },
    ],
  },
  {
    id: "erreurs-config",
    title: "Erreurs fréquentes : configuration",
    level: 3,
    intro:
      "Le manifest référence quelque chose qui n'existe pas ou mal : Kubernetes refuse de démarrer.",
    blocks: [
      {
        kind: "table",
        headers: ["Statut", "Cause probable", "Solution"],
        rows: [
          ["CreateContainerConfigError", "ConfigMap ou Secret référencé inexistant", "Vérifier le nom et le namespace de la ressource (`kubectl get configmap -A`)"],
          ["CreateContainerConfigError", "Clé manquante dans la ConfigMap/Secret", "Comparer les clés référencées (`env.valueFrom`) avec le contenu réel"],
          ["MountVolume.SetUp failed", "PVC non lié ou StorageClass absente", "`kubectl get pvc` : un PVC en `Pending` sans StorageClass par défaut ne sera jamais lié"],
        ],
      },
      {
        kind: "text",
        text: "La règle : Kubernetes ne devine jamais. Un nom approximatif, un namespace oublié, une clé renommée — et le Pod reste bloqué en erreur de configuration plutôt que de démarrer « à peu près ». C'est une qualité : mieux vaut un refus explicite qu'un démarrage silencieusement mal configuré.",
      },
    ],
  },
  {
    id: "erreurs-planification",
    title: "Erreurs fréquentes : Pod bloqué en Pending",
    level: 3,
    intro:
      "Le Pod existe mais n'est placé sur aucun nœud : le scheduler explique toujours pourquoi.",
    blocks: [
      {
        kind: "table",
        headers: ["Message dans les événements", "Signification", "Solution"],
        rows: [
          ["Insufficient cpu / memory", "Aucun nœud n'a assez de ressources libres", "Réduire les `requests`, ajouter un nœud, ou supprimer des charges inutiles"],
          ["didn't match Pod's node affinity", "Contrainte de placement impossible", "Assouplir `nodeSelector`/`affinity` ou étiqueter un nœud"],
          ["Taint / toleration", "Les nœuds portent un `taint` que le Pod ne tolère pas", "Ajouter la `toleration` correspondante si légitime"],
          ["unbound PersistentVolumeClaims", "Le PVC n'est pas lié à un volume", "Vérifier la StorageClass et les PV disponibles"],
        ],
      },
      {
        kind: "command",
        label: "Voir pourquoi un Pod n'est pas planifié",
        command: "kubectl describe pod <nom-du-pod>",
        why: "Les événements du scheduler sont explicites (« 0/3 nodes are available: 3 Insufficient cpu ») : ils disent exactement ce qui manque. C'est l'un des rares cas où le message d'erreur suffit comme diagnostic.",
      },
    ],
  },
  {
    id: "erreurs-reseau-acces",
    title: "Erreurs fréquentes : réseau et accès",
    level: 3,
    intro:
      "Les Pods tournent, mais le trafic n'arrive pas — ou l'accès est refusé.",
    blocks: [
      {
        kind: "table",
        headers: ["Symptôme", "Cause probable", "Solution"],
        rows: [
          ["Service sans endpoints (`kubectl get endpoints` vide)", "Sélecteur du Service ne correspondant à aucun Pod", "Aligner `spec.selector` du Service avec les labels réels des Pods"],
          ["Connexion refusée via le Service", "Le Pod écoute sur un autre port que `targetPort`", "Vérifier le port d'écoute réel de l'application vs le manifest"],
          ["Could not resolve host", "Nom de Service mal orthographié ou mauvais namespace", "Utiliser le FQDN `<svc>.<ns>.svc.cluster.local` pour lever le doute"],
          ["Forbidden / is forbidden", "RBAC : identité sans permission", "Vérifier avec `kubectl auth can-i`, corriger les Roles/Bindings"],
        ],
      },
      {
        kind: "command",
        label: "Tester la connectivité depuis l'intérieur",
        command: "kubectl run debug --image=busybox:1.36 --rm -it --restart=Never -- wget -qO- http://mon-service:8080/health",
        why: "Lance un Pod éphémère qui teste le Service puis se supprime (`--rm`). Cela isole le problème : si ça répond depuis ce Pod, le Service fonctionne et le problème est dans l'appelant.",
        verify: "La réponse HTTP du service s'affiche, puis le Pod est supprimé.",
      },
    ],
  },
  {
    id: "methodologie-debug",
    title: "Méthodologie de debug",
    level: 3,
    intro:
      "Un ordre précis qui résout 95 % des incidents sans deviner.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "1. Observer : `get pods`",
            detail:
              "Le statut (`Pending`, `CrashLoopBackOff`, `Running`) et la colonne `RESTARTS` orientent tout le diagnostic. Un Pod en `Running` avec des restarts élevés a un problème différent d'un Pod en `Pending`.",
          },
          {
            title: "2. Lire l'histoire : `describe`",
            detail:
              "Les événements racontent la séquence : image pull, scheduling, sondes, erreurs de montage. Toujours lire jusqu'en bas — les événements récents sont à la fin.",
          },
          {
            title: "3. Lire les logs : `logs` et `--previous`",
            detail:
              "Les logs de l'application pour les crashs, `--previous` si le conteneur a redémarré. Pas de logs du tout ? Le problème est en amont (image, config, scheduling).",
          },
          {
            title: "4. Entrer dedans : `exec`",
            detail:
              "`kubectl exec -it <pod> -- /bin/sh` pour inspecter de l'intérieur : variables d'environnement, fichiers montés, connectivité. En dernier recours, pas en premier.",
          },
          {
            title: "5. Élargir : événements du namespace",
            detail:
              "`kubectl get events --sort-by=.metadata.creationTimestamp -n <ns>` montre ce qui arrive aux voisins : un problème de nœud ou de registre affecte souvent plusieurs Pods à la fois.",
          },
        ],
      },
      {
        kind: "command",
        label: "Ouvrir un shell dans un Pod",
        command: "kubectl exec -it <nom-du-pod> -- /bin/sh",
        why: "Inspecte le conteneur de l'intérieur : vérifier les variables d'environnement (`env`), les fichiers montés (`ls /etc/app`), tester la résolution DNS. Si `/bin/sh` n'existe pas (images distroless), utilisez une image de debug éphémère à la place.",
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro:
      "Les habitudes qui séparent un cluster qui tient d'un cluster qui casse.",
    blocks: [
      {
        kind: "list",
        items: [
          "Versionnez tous vos manifests en Git : un cluster doit pouvoir être reconstruit depuis le dépôt.",
          "Bannissez le tag `latest` : utilisez des versions immuables pour des déploiements et des rollbacks prévisibles.",
          "Définissez toujours `requests` (et de préférence `limits`) : sans eux, la planification est aveugle et les évictions arbitraires.",
          "Ajoutez des sondes `readiness` (et `liveness` quand pertinent) : c'est ce qui rend les rolling updates réellement sans interruption.",
          "Un namespace par environnement ou équipe, avec des quotas (`ResourceQuota`) pour éviter qu'un namespace affame les autres.",
          "Ne stockez jamais de secret en clair dans Git : chiffrez (Sealed Secrets, SOPS) ou utilisez un gestionnaire externe.",
          "Appliquez le moindre privilège RBAC dès que le cluster est partagé, même en interne.",
          "Testez vos NetworkPolicies en staging avant la production : une policy trop stricte coupe le trafic légitime sans message d'erreur explicite côté application.",
          "Sauvegardez etcd régulièrement sur les clusters que vous administrez vous-même.",
          "Mettez à jour Kubernetes régulièrement : les versions sont supportées environ un an, et sauter trop de versions complique la migration.",
        ],
      },
    ],
  },
  {
    id: "projets-realistes",
    title: "4 projets réalistes et progressifs",
    level: 3,
    intro:
      "Quatre paliers qui construisent une vraie compétence opérationnelle, du premier Pod au cluster durci.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Application conteneurisée exposée (débutant)",
        fields: [
          {
            label: "Objectif",
            value:
              "Déployer une application web simple (ex. une page statique via nginx) avec Deployment + Service, l'exposer via Ingress en local.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Manifests YAML, `apply`, labels/sélecteurs, port-forward, installation d'un contrôleur Ingress sur minikube (`minikube addons enable ingress`).",
          },
          {
            label: "Livrable",
            value:
              "URL locale fonctionnelle, manifests versionnés en Git, procédure de redéploiement en une commande.",
          },
          {
            label: "Projet suivant",
            value: "Le projet 2 ajoute la persistance et la configuration.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — Application multi-tiers avec données (intermédiaire)",
        fields: [
          {
            label: "Objectif",
            value:
              "Déployer une API + une base PostgreSQL : l'API lit sa configuration depuis une ConfigMap, ses identifiants depuis un Secret, la base persiste sur un PVC.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Namespaces, ConfigMaps, Secrets, PVC/StorageClass, DNS interne (`postgres://db:5432`), probes sur l'API, `rollout restart` après changement de config.",
          },
          {
            label: "Difficulté réelle",
            value:
              "Faire survivre les données à la suppression des Pods (mais pas du PVC !), gérer l'ordre de démarrage avec un init container.",
          },
          {
            label: "Projet suivant",
            value: "Le projet 3 industrialise le déploiement.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Déploiement industrialisé avec Helm (avancé)",
        fields: [
          {
            label: "Objectif",
            value:
              "Packager l'application du projet 2 en chart Helm avec des valeurs par environnement (dev/prod), Ingress avec TLS, HPA sur l'API.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Charts, `values.yaml`, templates, `helm upgrade --install`, stratégie de rolling update paramétrée, autoscaling, gestion des releases.",
          },
          {
            label: "Difficulté réelle",
            value:
              "Faire cohabiter les valeurs par défaut du chart et les surcharges d'environnement sans dupliquer la logique ; tester le rollback (`helm rollback`).",
          },
          {
            label: "Projet suivant",
            value: "Le projet 4 durcit l'ensemble comme en production.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 4 — Cluster « production-like » durci (expert)",
        fields: [
          {
            label: "Objectif",
            value:
              "Sur kind multi-nœuds : RBAC par équipe, NetworkPolicies restrictives, securityContext stricts, quotas par namespace, Prometheus + Grafana via Helm, sauvegarde etcd.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Tout le niveau 3 : RBAC, NetworkPolicies, securityContext, ResourceQuota, observabilité, opérations du plan de contrôle.",
          },
          {
            label: "Difficulté réelle",
            value:
              "Chaque couche de sécurité peut casser le trafic légitime : on avance policy par policy, en vérifiant la connectivité à chaque étape. C'est exactement le travail d'un ops Kubernetes.",
          },
          {
            label: "Et après",
            value:
              "Préparation à la certification CKA, ou contribution à un cluster réel avec GitOps (Argo CD).",
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
      "La documentation Kubernetes est l'une des meilleures de l'industrie : c'est la référence première, pas un blog.",
    blocks: [
      {
        kind: "list",
        items: [
          "Documentation officielle — https://kubernetes.io/docs/ : concepts, tâches, tutoriels interactifs. Toujours vérifier la version affichée en haut de page.",
          "Aide-mémoire kubectl — https://kubernetes.io/docs/reference/kubectl/cheatsheet/ : la fiche à garder ouverte en permanence.",
          "Tutoriel « Hello Minikube » — https://kubernetes.io/docs/tutorials/hello-minikube/ : le premier pas guidé officiel.",
          "Documentation minikube — https://minikube.sigs.k8s.io/docs/ et kind — https://kind.sigs.k8s.io/docs/ : les références des outils locaux.",
          "Documentation Helm — https://helm.sh/docs/ : charts, templates, bonnes pratiques.",
          "Livre : « Kubernetes in Action » (Marko Lukša) : la référence papier la plus recommandée pour une compréhension profonde.",
          "Exercices : killer.sh (simulateur d'examen CKA payant) quand vous visez la certification.",
        ],
      },
      {
        kind: "text",
        text: "Conseil de lecture : la section « Concepts » de la doc officielle se lit comme un livre et répond à la plupart des « pourquoi ». Les blogs et vidéos viennent ensuite, pour les retours d'expérience — jamais comme source première.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Kubernetes ouvre plus de portes qu'il n'en ferme : voici les prolongements naturels.",
    blocks: [
      {
        kind: "fields",
        title: "Pistes selon votre objectif",
        fields: [
          {
            label: "Devenir opérationnel en entreprise",
            value:
              "GitOps avec Argo CD ou Flux (le cluster se synchronise depuis Git), puis la certification CKA (Certified Kubernetes Administrator) qui valide la pratique au clavier.",
          },
          {
            label: "Approfondir la plateforme",
            value:
              "Opérateurs et CRD (étendre l'API Kubernetes à vos propres ressources), service mesh (Istio, Linkerd) pour le trafic avancé, sécurité (Falco, admission controllers).",
          },
          {
            label: "Côté développement",
            value:
              "Skaffold/Tilt pour la boucle dev locale, Dapr pour les briques applicatives distribuées, Knative pour le serverless sur Kubernetes.",
          },
          {
            label: "Comprendre l'écosystème cloud",
            value:
              "Les offres managées (GKE, EKS, AKS) : ce que le fournisseur gère (plan de contrôle, etcd, mises à jour) et ce qui reste de votre responsabilité (workloads, réseau, sécurité).",
          },
        ],
      },
    ],
  },
];

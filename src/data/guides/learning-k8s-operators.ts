import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète des Operators Kubernetes : de la CRD manuelle à
 * l'écriture d'un opérateur avec Kubebuilder. 3 niveaux (Aperçu / Pratique /
 * Approfondi) avec divulgation progressive. Tous les textes supportent le
 * code inline entre backticks.
 */
export const LEARNING_K8S_OPERATORS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est un Operator et pourquoi c'est le niveau expert de Kubernetes.",
    blocks: [
      {
        kind: "text",
        text: "Un Operator est un contrôleur Kubernetes qui pilote une application complexe (base de données, file de messages, certificat) comme un expert humain le ferait : il observe en continu l'état du cluster et agit pour maintenir l'état désiré. Techniquement, c'est l'extension de l'API Kubernetes via des ressources custom (CRD) combinée à une boucle de réconciliation codée en dur.",
      },
      {
        kind: "text",
        text: "L'idée fondatrice : Kubernetes sait déjà opérer les applications stateless (un Deployment qui crash est recréé automatiquement). Mais une base de données a besoin d'opérations métier — sauvegarde, restauration, failover, montée de version sans perte. Un Operator encode ce savoir-faire opérationnel en code, au lieu de le laisser dans la tête d'un SRE ou dans un runbook.",
      },
      {
        kind: "diagram",
        title: "Operator en une image",
        lines: [
          "Utilisateur",
          "    │  kubectl apply -f postgres.yaml",
          "    ▼",
          "Custom Resource (ex. Postgres, spec: 3 replicas)",
          "    │",
          "    ▼",
          "Operator (boucle de réconciliation)",
          "    ├── compare état désiré / état réel",
          "    ├── crée StatefulSet, Services, Secrets",
          "    ├── planifie les sauvegardes",
          "    └── gère le failover en cas de panne",
          "    │",
          "    ▼",
          "Application complexe qui se pilote elle-même",
        ],
      },
    ],
  },
  {
    id: "operateurs-vs-controleurs-natifs",
    title: "Operators vs contrôleurs natifs",
    level: 1,
    intro:
      "Ce qui distingue un Operator d'un Deployment ou d'un StatefulSet.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un contrôleur natif (Deployment, StatefulSet) gère un type de ressource générique : il sait créer des Pods, pas administrer PostgreSQL.",
          "Un Operator gère un type de ressource métier (`Postgres`, `KafkaCluster`, `Certificate`) avec la logique propre à cette application : le schéma de la CR décrit l'intention métier, pas des Pods.",
          "Le contrôleur natif est écrit par l'équipe Kubernetes ; l'Operator est écrit par l'équipe qui connaît l'application — ou par sa communauté.",
          "Conséquence : installer un Operator, c'est installer de l'expertise opérationnelle exécutable. L'utiliser demande de comprendre sa CRD, pas son code.",
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
      "Le socle sans lequel les Operators restent de la magie noire.",
    blocks: [
      {
        kind: "fields",
        title: "Socle nécessaire",
        fields: [
          {
            label: "Kubernetes solide",
            value:
              "Pods, Deployments, Services, namespaces, `kubectl apply/get/describe/logs`. Un Operator ne fait que manipuler ces objets : si leur cycle de vie est flou, le debug est impossible.",
          },
          {
            label: "RBAC",
            value:
              "Comprendre `ServiceAccount`, `Role`/`ClusterRole`, `RoleBinding`. Un Operator agit avec une identité et des permissions précises — la majorité des pannes d'operators sont des problèmes de droits.",
          },
          {
            label: "Go (pour écrire un operator)",
            value:
              "Les frameworks standards (Kubebuilder, Operator SDK) génèrent du Go. Pour *utiliser* des operators, Go n'est pas requis ; pour en *écrire*, des bases (structs, interfaces, gestion d'erreurs) sont indispensables.",
          },
          {
            label: "YAML et API Kubernetes",
            value:
              "Lire une CRD et comprendre `apiVersion`, `kind`, `metadata`, `spec`, `status`. La CRD est le contrat entre l'utilisateur et l'operator.",
          },
        ],
      },
    ],
  },
  {
    id: "crd-en-cinq-minutes",
    title: "Une CRD en cinq minutes",
    level: 2,
    intro:
      "Créer une ressource custom à la main pour comprendre la brique de base, avant tout framework.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "CRD minimale : kind WebApp",
        code: `apiVersion: apiextensions.k8s.io/v1\nkind: CustomResourceDefinition\nmetadata:\n  name: webapps.example.com\nspec:\n  group: example.com\n  names:\n    kind: WebApp\n    plural: webapps\n  scope: Namespaced\n  versions:\n    - name: v1\n      served: true\n      storage: true\n      schema:\n        openAPIV3Schema:\n          type: object\n          properties:\n            spec:\n              type: object\n              properties:\n                replicas:\n                  type: integer\n                image:\n                  type: string`,
      },
      {
        kind: "command",
        label: "Appliquer la CRD et créer une ressource",
        command: "kubectl apply -f webapp-crd.yaml",
        why: "Enregistre le nouveau type `WebApp` auprès de l'API Kubernetes. Dès lors, `kubectl` accepte des objets `kind: WebApp` comme des ressources natives — mais rien ne les *pilote* encore : sans contrôleur, ce sont des données inertes.",
        verify: "kubectl get webapps",
      },
      {
        kind: "text",
        text: "Leçon clé : une CRD seule ne fait rien d'autre que stocker des objets. L'Operator est le programme qui observe ces objets et agit. Comprendre cette séparation (données vs logique) éclaire tout le reste.",
      },
    ],
  },
  {
    id: "installer-outillage",
    title: "Installer l'outillage",
    level: 2,
    intro:
      "Go, Kubebuilder et un cluster de développement.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier Go",
        command: "go version",
        why: "Kubebuilder génère du Go et `make` le compile. Une version récente de Go est requise — la documentation Kubebuilder précise la version minimale supportée.",
        verify: "go version",
      },
      {
        kind: "command",
        label: "Installer Kubebuilder",
        command: "curl -L -o kubebuilder \"https://go.kubebuilder.io/dl/latest/$(go env GOOS)/$(go env GOARCH)\"",
        why: "Télécharge le binaire Kubebuilder officiel pour votre OS/architecture. Ensuite : `chmod +x kubebuilder && sudo mv kubebuilder /usr/local/bin/`. C'est la méthode d'installation documentée par le projet.",
        verify: "kubebuilder version",
      },
      {
        kind: "text",
        text: "Pour le cluster de dev, `kind` ou `k3d` suffisent : un Kubernetes local éphémère où déployer l'operator en cours d'écriture. L'operator tourne d'abord *hors* du cluster (`make run`) pendant le développement, puis *dans* le cluster une fois packagé.",
      },
    ],
  },
  {
    id: "scaffold-kubebuilder",
    title: "Scaffolder un operator",
    level: 2,
    intro:
      "Générer la structure d'un operator avec Kubebuilder.",
    blocks: [
      {
        kind: "command",
        label: "Initialiser le projet",
        command: "kubebuilder init --domain example.com --repo example.com/mon-operator",
        why: "Crée un projet Go avec le `Makefile`, la configuration de déploiement (`config/`) et les bases du manager. Le domaine sert de suffixe aux groupes d'API (`webapp.example.com`).",
        verify: "ls",
      },
      {
        kind: "command",
        label: "Créer l'API et le contrôleur",
        command: "kubebuilder create api --group webapp --version v1 --kind WebApp",
        why: "Génère le type Go `WebApp`, la CRD correspondante, et le squelette du contrôleur avec sa fonction `Reconcile`. Répondre oui aux deux questions (ressource + contrôleur) pour un operator complet.",
        verify: "ls api/v1 internal/controller",
      },
    ],
  },
  {
    id: "boucle-reconciliation-idee",
    title: "L'idée de la réconciliation",
    level: 2,
    intro:
      "Le cœur conceptuel : une boucle qui corrige les écarts, en continu.",
    blocks: [
      {
        kind: "diagram",
        title: "Boucle de réconciliation",
        lines: [
          "Événement (création / modification / resync périodique)",
          "              │",
          "              ▼",
          "Reconcile(objet)",
          "   ├── 1. Lire l'état désiré (spec de la CR)",
          "   ├── 2. Lire l'état réel (ce qui existe sur le cluster)",
          "   ├── 3. Calculer l'écart",
          "   └── 4. Agir : créer / mettre à jour / supprimer",
          "              │",
          "              ▼",
          "   Requeue (revérifier plus tard) ou terminé",
        ],
      },
      {
        kind: "text",
        text: "Point fondamental : la réconciliation est déclenchée par niveau (level-triggered), pas par événement unique. Si un événement est perdu, le prochain resync corrige quand même l'écart. C'est ce qui rend les operators robustes : ils convergent vers l'état désiré au lieu de réagir à des événements.",
      },
    ],
  },
  {
    id: "cycle-dev-make",
    title: "Cycle de développement : make",
    level: 2,
    intro:
      "Les commandes `make` générées : installer la CRD, lancer l'operator, tester.",
    blocks: [
      {
        kind: "command",
        label: "Installer la CRD sur le cluster",
        command: "make install",
        why: "Génère les manifestes CRD depuis les types Go (`controller-gen`) et les applique. À relancer chaque fois que le schéma de la CR change.",
        verify: "kubectl get crd webapps.example.com",
      },
      {
        kind: "command",
        label: "Lancer l'operator en local",
        command: "make run",
        why: "Compile et exécute l'operator sur votre machine, connecté au cluster via le `kubeconfig`. Le cycle d'itération est rapide : modifier le code, relancer, observer. Le déploiement *dans* le cluster (`make deploy`) vient plus tard.",
      },
      {
        kind: "text",
        text: "Puis, dans un autre terminal : créer une ressource `WebApp` d'exemple (`config/samples/`) avec `kubectl apply`, et observer les logs de `make run` — la fonction `Reconcile` se déclenche à chaque changement.",
      },
    ],
  },
  {
    id: "creer-ressource-custom",
    title: "Créer et observer une ressource custom",
    level: 2,
    intro:
      "Le moment où la théorie devient visible.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "config/samples/webapp_v1_webapp.yaml",
        code: `apiVersion: webapp.example.com/v1\nkind: WebApp\nmetadata:\n  name: webapp-sample\nspec:\n  replicas: 2\n  image: nginx:1.27`,
      },
      {
        kind: "command",
        label: "Appliquer l'exemple",
        command: "kubectl apply -f config/samples/webapp_v1_webapp.yaml",
        why: "Crée une instance de votre ressource custom. L'operator (lancé via `make run`) détecte l'objet et exécute `Reconcile` : c'est ici qu'on vérifie dans les logs que la boucle se déclenche.",
        verify: "kubectl get webapp webapp-sample -o yaml",
      },
    ],
  },
  {
    id: "observer-reconciliation",
    title: "Observer la réconciliation",
    level: 2,
    intro:
      "Voir la boucle travailler : logs, événements, ressources créées.",
    blocks: [
      {
        kind: "list",
        items: [
          "Logs de l'operator (`make run` ou `kubectl logs` du Pod du manager) : chaque appel à `Reconcile` y apparaît avec le nom de l'objet traité.",
          "`kubectl get` sur les ressources gérées : si `Reconcile` crée un Deployment, il doit apparaître après l'application de la CR.",
          "`kubectl describe webapp webapp-sample` : les `Events` racontent l'histoire (création, mises à jour, erreurs).",
          "Test de convergence : modifier `spec.replicas` dans la CR, vérifier que l'operator ajuste ; supprimer à la main une ressource gérée, vérifier qu'elle est recréée.",
        ],
      },
    ],
  },
  {
    id: "rbac-minimal",
    title: "RBAC : les droits de l'operator",
    level: 2,
    intro:
      "Pourquoi un operator fraîchement codé échoue souvent avec des erreurs d'autorisation.",
    blocks: [
      {
        kind: "text",
        text: "Un operator agit via l'API Kubernetes avec l'identité de son `ServiceAccount`. Par défaut, Kubebuilder génère des rôles minimaux ; dès que `Reconcile` touche une nouvelle ressource (ex. créer des Services en plus des Deployments), il faut déclarer la permission — sinon `forbidden` dans les logs.",
      },
      {
        kind: "code",
        language: "go",
        title: "Déclarer les permissions (markers kubebuilder)",
        code: `//+kubebuilder:rbac:groups=apps,resources=deployments,verbs=get;list;watch;create;update;patch;delete\n//+kubebuilder:rbac:groups=webapp.example.com,resources=webapps,verbs=get;list;watch;create;update;patch;delete\n//+kubebuilder:rbac:groups=webapp.example.com,resources=webapps/status,verbs=get;update;patch`,
      },
      {
        kind: "text",
        text: "Ces commentaires `//+kubebuilder:rbac` au-dessus de `Reconcile` sont lus par `controller-gen` lors de `make manifests` pour générer le `ClusterRole`. Règle d'or : principe du moindre privilège — uniquement les verbes et ressources réellement utilisés.",
      },
    ],
  },
  {
    id: "debugging-de-base",
    title: "Debugger un operator",
    level: 2,
    intro:
      "Les trois sources de vérité quand ça ne marche pas.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Lire les logs du manager",
            detail:
              "`kubectl logs -n <namespace>-system deploy/<nom>-controller-manager` (ou la sortie de `make run`). Les erreurs de `Reconcile` (client API, RBAC, logique) s'y trouvent avec leur contexte.",
          },
          {
            title: "Inspecter la CR",
            detail:
              "`kubectl get webapp <nom> -o yaml` : le `status` (s'il est renseigné) dit ce que l'operator *pense* avoir fait. Un status vide ou figé signale que `Reconcile` n'écrit pas ou échoue avant.",
          },
          {
            title: "Vérifier le RBAC",
            detail:
              "`forbidden` dans les logs = permission manquante. Ajouter le marker `//+kubebuilder:rbac`, relancer `make manifests install`, redéployer.",
          },
          {
            title: "Vérifier la CRD",
            detail:
              "Après un changement de schéma : `make install` a-t-il été relancé ? `kubectl get crd` montre-t-il la nouvelle version du schéma ? Un schéma obsolète rejette les champs inconnus.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Workflow quotidien",
    level: 2,
    intro:
      "Développer un operator sans se perdre entre les terminaux.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Modifier les types ou la logique",
            detail:
              "Éditer `api/v1/*_types.go` (schéma) ou `internal/controller/*_controller.go` (logique `Reconcile`).",
          },
          {
            title: "Régénérer",
            detail:
              "`make manifests generate` : met à jour la CRD et le code généré (deepcopy) depuis les types Go.",
          },
          {
            title: "Réinstaller la CRD si le schéma a changé",
            detail:
              "`make install`, puis `make run` dans un terminal dédié.",
          },
          {
            title: "Tester avec une CR d'exemple",
            detail:
              "`kubectl apply -f config/samples/`, observer logs et ressources créées, itérer.",
          },
          {
            title: "Packager quand ça marche",
            detail:
              "`make docker-build docker-push IMG=...` puis `make deploy` pour la version in-cluster.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "anatomie-reconcile",
    title: "Anatomie d'une fonction Reconcile",
    level: 3,
    intro: "Ce que fait vraiment le code généré, ligne par ligne.",
    blocks: [
      {
        kind: "code",
        language: "go",
        title: "Squelette de Reconcile (simplifié)",
        code: `func (r *WebAppReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {\n\twebapp := &webappv1.WebApp{}\n\tif err := r.Get(ctx, req.NamespacedName, webapp); err != nil {\n\t\treturn ctrl.Result{}, client.IgnoreNotFound(err)\n\t}\n\t// 1. État désiré : lu dans webapp.Spec\n\t// 2. État réel : lister / Get les ressources gérées\n\t// 3. Créer ou mettre à jour ce qui manque\n\t// 4. Mettre à jour le status\n\treturn ctrl.Result{}, nil\n}`,
      },
      {
        kind: "fields",
        title: "Lecture guidée",
        fields: [
          {
            label: "`ctrl.Request`",
            value:
              "Contient uniquement `NamespacedName` (namespace + nom) de l'objet qui a déclenché la réconciliation. On relit toujours l'objet frais depuis l'API : jamais de cache supposé à jour.",
          },
          {
            label: "`client.IgnoreNotFound(err)`",
            value:
              "Si l'objet a été supprimé entre l'événement et la lecture, ce n'est pas une erreur : on termine silencieusement. Pattern standard à conserver.",
          },
          {
            label: "`ctrl.Result`",
            value:
              "Contrôle la suite : `{}` = terminé, `{Requeue: true}` = relancer dès que possible, `{RequeueAfter: time.Minute}` = revérifier dans une minute (utile pour les états transitoires).",
          },
          {
            label: "Retourner une erreur",
            value:
              "Déclenche un requeue avec backoff exponentiel. Réservé aux échecs transitoires (API indisponible) — pas aux erreurs de logique, qui boucleraient indéfiniment.",
          },
        ],
      },
    ],
  },
  {
    id: "controller-runtime",
    title: "controller-runtime : ce que le framework fait pour vous",
    level: 3,
    intro: "Kubebuilder s'appuie sur controller-runtime : comprendre ce qu'il abstrait.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le **manager** : démarre les contrôleurs, gère le leader election, expose les métriques et les sondes de santé.",
          "Le **cache** : chaque contrôleur lit les objets depuis un cache local synchronisé via des watchers, pas en frappant l'API à chaque fois — c'est ce qui permet de scaler.",
          "Les **watches** : déclarent quelles ressources déclenchent `Reconcile` (la CR elle-même + les ressources secondaires via `Owns`).",
          "Le **client** : `r.Get`, `r.List`, `r.Create`, `r.Update`, `r.Patch` — l'interface typée vers l'API, avec le cache en lecture.",
          "Comprendre cette couche évite deux erreurs : croire que `Get` voit toujours l'état instantané (c'est le cache), et oublier de déclarer un `Owns` (les changements de la ressource secondaire ne redéclenchent rien).",
        ],
      },
    ],
  },
  {
    id: "owns-et-secondary-resources",
    title: "Owns : suivre les ressources secondaires",
    level: 3,
    intro: "Relier les objets créés par l'operator à leur parent.",
    blocks: [
      {
        kind: "code",
        language: "go",
        title: "Déclarer la surveillance (SetupWithManager)",
        code: `func (r *WebAppReconciler) SetupWithManager(mgr ctrl.Manager) error {\n\treturn ctrl.NewControllerManagedBy(mgr).\n\t\tFor(&webappv1.WebApp{}).\n\t\tOwns(&appsv1.Deployment{}).\n\t\tOwns(&corev1.Service{}).\n\t\tComplete(r)\n}`,
      },
      {
        kind: "text",
        text: "`Owns` fait deux choses : tout changement sur un Deployment possédé par une `WebApp` redéclenche `Reconcile` de cette WebApp, et la suppression de la CR peut entraîner (selon la politique) la suppression des enfants. En créant les ressources via `controllerutil.SetControllerReference`, on établit le lien de propriété que le garbage collector Kubernetes utilise.",
      },
    ],
  },
  {
    id: "schema-openapiv3",
    title: "Schéma OpenAPI v3 : valider à l'admission",
    level: 3,
    intro: "Le schéma de la CRD n'est pas décoratif : c'est une validation exécutée par l'API.",
    blocks: [
      {
        kind: "text",
        text: "Les tags sur les champs Go (`+kubebuilder:validation:Minimum=1`, `+kubebuilder:validation:Enum=...`) génèrent des contraintes OpenAPI dans la CRD. L'API server rejette alors toute CR invalide *avant* qu'elle n'atteigne l'operator — fail fast au lieu d'une erreur obscure dans `Reconcile`.",
      },
      {
        kind: "code",
        language: "go",
        title: "Contraintes sur les types Go",
        code: `//+kubebuilder:validation:Minimum=1\n//+kubebuilder:validation:Maximum=10\nReplicas int32\n\n//+kubebuilder:validation:Enum=ClusterIP;NodePort;LoadBalancer\nServiceType string`,
      },
      {
        kind: "list",
        items: [
                    "Dans le vrai code généré, chaque champ porte aussi son tag json (entre backticks en Go) : omis ci-dessus pour la lisibilité, il ne change rien aux markers de validation.",
"Toujours contraindre ce qui est contraignable : énumérations, minimums, formats (`+kubebuilder:validation:Format=date-time`).",
          "Les champs inconnus sont élagués (pruned) par défaut : une faute de frappe dans une CR disparaît silencieusement — d'où l'importance de relire le YAML appliqué.",
          "`XPreserveUnknownFields` existe pour les blobs libres, à réserver aux cas où le schéma est vraiment ouvert.",
        ],
      },
    ],
  },
  {
    id: "status-subresource",
    title: "La subresource `status`",
    level: 3,
    intro: "Séparer l'intention (spec) de l'observation (status).",
    blocks: [
      {
        kind: "text",
        text: "Par convention, `spec` décrit l'état désiré (écrit par l'utilisateur) et `status` l'état observé (écrit par l'operator : phase, conditions, nombre de replicas prêts). Kubebuilder active la subresource `status` : les mises à jour de status passent par un endpoint dédié et ne déclenchent pas de boucle de réconciliation infinie.",
      },
      {
        kind: "code",
        language: "go",
        title: "Mettre à jour le status",
        code: `webapp.Status.Phase = \"Ready\"\nwebapp.Status.ReadyReplicas = ready\nif err := r.Status().Update(ctx, webapp); err != nil {\n\treturn ctrl.Result{}, err\n}`,
      },
      {
        kind: "list",
        items: [
          "Ne jamais écrire le status avec un `Update` classique : cela écrase potentiellement le spec et redéclenche la boucle.",
          "Utiliser des `conditions` typées (`Available`, `Progressing`, `Degraded`) : c'est le langage standard que les outils (et les humains) savent lire.",
          "Un operator qui ne renseigne pas son status est opaque : le status est son interface d'observabilité.",
        ],
      },
    ],
  },
  {
    id: "finalizers",
    title: "Finalizers : nettoyer avant suppression",
    level: 3,
    intro: "Exécuter une logique de teardown quand une CR est supprimée.",
    blocks: [
      {
        kind: "text",
        text: "Sans finalizer, supprimer une CR supprime l'objet immédiatement — les ressources externes (buckets, DNS, snapshots) créées par l'operator restent orphelines. Un finalizer bloque la suppression jusqu'à ce que l'operator ait terminé son nettoyage, puis retire le finalizer.",
      },
      {
        kind: "code",
        language: "go",
        title: "Pattern finalizer (simplifié)",
        code: `if webapp.DeletionTimestamp.IsZero() {\n\t// Ajouter le finalizer s'il est absent\n\tcontrollerutil.AddFinalizer(webapp, \"webapp.example.com/finalizer\")\n\treturn ctrl.Result{}, r.Update(ctx, webapp)\n}\n// L'objet est en cours de suppression : nettoyer\nif controllerutil.ContainsFinalizer(webapp, \"webapp.example.com/finalizer\") {\n\tif err := r.nettoyerRessourcesExternes(ctx, webapp); err != nil {\n\t\treturn ctrl.Result{}, err\n\t}\n\tcontrollerutil.RemoveFinalizer(webapp, \"webapp.example.com/finalizer\")\n\treturn ctrl.Result{}, r.Update(ctx, webapp)\n}`,
      },
      {
        kind: "list",
        items: [
          "Danger : un finalizer dont le nettoyage échoue bloque la suppression *indéfiniment* (objet coincé en `Terminating`). Toujours prévoir un chemin de sortie.",
          "Le nettoyage doit être idempotent : il peut être exécuté plusieurs fois si l'operator redémarre entre-temps.",
        ],
      },
    ],
  },
  {
    id: "events",
    title: "Émettre des Events",
    level: 3,
    intro: "Raconter ce que fait l'operator dans la timeline Kubernetes.",
    blocks: [
      {
        kind: "code",
        language: "go",
        title: "Enregistrer un événement",
        code: `r.Recorder.Event(webapp, corev1.EventTypeNormal, \"Reconciled\", \"Deployment mis à jour avec 3 replicas\")\nr.Recorder.Event(webapp, corev1.EventTypeWarning, \"Failed\", err.Error())`,
      },
      {
        kind: "text",
        text: "Les Events sont visibles via `kubectl describe` : c'est le journal d'activité que les utilisateurs consultent en premier. Émettre un event aux moments significatifs (création, mise à jour, échec) transforme un operator silencieux en operator diagnostiquable. Ne pas logger les secrets dans les events : ils sont lisibles par un large périmètre RBAC.",
      },
    ],
  },
  {
    id: "leader-election",
    title: "Leader election",
    level: 3,
    intro: "Faire tourner plusieurs replicas du manager sans double exécution.",
    blocks: [
      {
        kind: "text",
        text: "En production, l'operator tourne avec plusieurs replicas pour la haute disponibilité — mais une seule instance doit réconcilier à la fois, sinon deux boucles se marchent dessus. Le leader election (activé par défaut dans le manager Kubebuilder) utilise un Lease : une instance devient leader, les autres attendent et prennent le relais si le leader disparaît.",
      },
      {
        kind: "list",
        items: [
          "Le manager gère cela nativement : rien à coder, mais il faut le comprendre pour interpréter les logs (« became leader »).",
          "Le RBAC doit autoriser la gestion des Leases (`coordination.k8s.io`) — inclus dans les manifestes générés.",
          "Pendant le développement avec `make run`, une seule instance tourne : le leader election est sans effet visible.",
        ],
      },
    ],
  },
  {
    id: "webhooks-admission",
    title: "Webhooks d'admission",
    level: 3,
    intro: "Valider et muter les CR au-delà du schéma OpenAPI.",
    blocks: [
      {
        kind: "text",
        text: "Le schéma OpenAPI couvre les validations simples. Pour les règles complexes (« si `ha` est activé, `replicas` doit être impair »), on ajoute un webhook de validation ; pour les défauts dynamiques, un webhook de mutation (defaulting). Kubebuilder les génère avec `kubebuilder create webhook`.",
      },
      {
        kind: "list",
        items: [
          "Un webhook est un serveur HTTPS appelé par l'API server : il faut gérer les certificats (cert-manager simplifie énormément cela).",
          "Risque opérationnel : un webhook indisponible peut bloquer la création de ressources — toujours configurer `failurePolicy` consciemment.",
          "Règle de proportion : commencer par le schéma OpenAPI, n'ajouter un webhook que si la règle l'exige vraiment.",
        ],
      },
    ],
  },
  {
    id: "olm",
    title: "OLM : packager et distribuer",
    level: 3,
    intro: "L'Operator Lifecycle Manager : installer et mettre à jour des operators proprement.",
    blocks: [
      {
        kind: "text",
        text: "OLM est l'extension qui gère le cycle de vie des operators sur un cluster : installation depuis un catalogue, résolution des dépendances, mises à jour automatiques ou manuelles via des stratégies (`Approval: Automatic` ou `Manual`). C'est le standard sur OpenShift et disponible sur Kubernetes vanilla.",
      },
      {
        kind: "list",
        items: [
          "Le format de packaging OLM est le **bundle** : CRD + ClusterServiceVersion (CSV, qui décrit l'operator, ses permissions, ses CRD gérées) + métadonnées.",
          "`operator-sdk` génère les bundles (`make bundle`) ; `operator-sdk bundle validate` les vérifie.",
          "En pratique : pour un usage interne, `make deploy` suffit ; OLM devient pertinent dès qu'on distribue l'operator à plusieurs clusters ou équipes.",
        ],
      },
    ],
  },
  {
    id: "operator-sdk-vs-kubebuilder",
    title: "Operator SDK vs Kubebuilder",
    level: 3,
    intro: "Deux outils, une même fondation : comment choisir.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Kubebuilder", "Operator SDK"],
        rows: [
          ["Philosophie", "Minimaliste, proche de controller-runtime", "Boîte à outils complète (Go, Ansible, Helm)"],
          ["Langages", "Go uniquement", "Go + operators Ansible + operators Helm"],
          ["Packaging OLM", "À faire soi-même", "Intégré (`make bundle`)"],
          ["Courbe d'apprentissage", "Plus directe pour un dev Go", "Plus large, plus d'abstractions"],
        ],
      },
      {
        kind: "text",
        text: "Les deux génèrent du code basé sur controller-runtime et sont interopérables. Recommandation pratique : Kubebuilder pour écrire un operator Go sur mesure ; Operator SDK si l'on veut un operator sans écrire de Go (via Ansible ou Helm) ou viser une distribution OLM dès le départ.",
      },
    ],
  },
  {
    id: "patterns-operateurs",
    title: "Patterns éprouvés",
    level: 3,
    intro: "Les règles de conception qui séparent un bon operator d'un script déguisé.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un operator par application, un contrôleur par kind : ne pas mélanger les responsabilités.",
          "Tout l'état dans la CR : l'operator doit pouvoir redémarrer et tout reconstruire depuis les CR et le cluster — aucun état local indispensable.",
          "Actions idempotentes : `Reconcile` peut être appelé N fois sans effet de bord néfaste (créer-ou-mettre-à-jour, jamais « créer aveuglément »).",
          "Ne jamais bloquer longtemps dans `Reconcile` : pour les opérations longues (provisionnement), mettre à jour le status en `Progressing` et requeue.",
          "Préférer le déclaratif : la CR décrit l'état désiré, l'operator converge — pas de « commandes » impératives dans la spec.",
        ],
      },
    ],
  },
  {
    id: "idempotence-pratique",
    title: "Idempotence en pratique",
    level: 3,
    intro: "Le pattern create-or-update, cœur de tout `Reconcile` sain.",
    blocks: [
      {
        kind: "code",
        language: "go",
        title: "Créer ou mettre à jour un Deployment",
        code: `deploy := &appsv1.Deployment{ObjectMeta: metav1.ObjectMeta{\n\tName: webapp.Name, Namespace: webapp.Namespace}}\n_, err := controllerutil.CreateOrUpdate(ctx, r.Client, deploy, func() error {\n\t// mutateFn : décrire l'état désiré à chaque appel\n\tdeploy.Spec.Replicas = &webapp.Spec.Replicas\n\tdeploy.Spec.Template.Spec.Containers[0].Image = webapp.Spec.Image\n\treturn controllerutil.SetControllerReference(webapp, deploy, r.Scheme)\n})`,
      },
      {
        kind: "text",
        text: "`CreateOrUpdate` lit l'objet, exécute la fonction de mutation qui décrit l'état désiré, puis crée ou patch uniquement si nécessaire. Appelé dix fois de suite, le résultat est identique : c'est exactement la sémantique qu'exige la boucle de réconciliation.",
      },
    ],
  },
  {
    id: "requeue-strategies",
    title: "Stratégies de requeue",
    level: 3,
    intro: "Quand et comment demander à être rappelé.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois retours possibles",
        fields: [
          {
            label: "`ctrl.Result{}, nil`",
            value:
              "Terminé, état convergé. La boucle se rendormira jusqu'au prochain événement ou resync périodique.",
          },
          {
            label: "`ctrl.Result{Requeue: true}, nil`",
            value:
              "Relancer dès que possible. À utiliser avec parcimonie : en boucle, cela sature l'API. Préférer `RequeueAfter` sauf urgence réelle.",
          },
          {
            label: "`ctrl.Result{RequeueAfter: 30 * time.Second}, nil`",
            value:
              "Revérifier dans 30 secondes. Le pattern pour les états transitoires : déploiement en cours, ressource externe en provisioning.",
          },
          {
            label: "Retourner une erreur",
            value:
              "Requeue avec backoff exponentiel géré par le framework. Réservé aux échecs transitoires — une erreur déterministe (mauvaise logique) bouclera avec backoff sans jamais converger : la détecter via les métriques et les logs.",
          },
        ],
      },
    ],
  },
  {
    id: "tests-envtest",
    title: "Tester avec envtest",
    level: 3,
    intro: "Des tests d'intégration contre une vraie API, sans cluster complet.",
    blocks: [
      {
        kind: "command",
        label: "Lancer la suite de tests",
        command: "make test",
        why: "Exécute les tests Go avec envtest : une API server et etcd réels (binaires locaux), sans kubelet ni contrôleurs natifs. On y crée des CR, on attend la réconciliation, on assert les ressources produites. C'est le niveau de test qui attrape les vrais bugs de `Reconcile`.",
        verify: "make test",
      },
      {
        kind: "text",
        text: "Structure typique d'un test : créer la CR, attendre (avec timeout) que le Deployment apparaisse avec les bons replicas, modifier la CR, vérifier la convergence, supprimer et vérifier le nettoyage. Les tests envtest sont plus lents que l'unitaire mais infiniment plus probants pour un operator.",
      },
    ],
  },
  {
    id: "observabilite-operator",
    title: "Observabilité de l'operator",
    level: 3,
    intro: "Savoir qu'un operator va mal avant les utilisateurs.",
    blocks: [
      {
        kind: "list",
        items: [
          "Métriques : controller-runtime expose par défaut la durée et les erreurs de `Reconcile` au format Prometheus (`controller_runtime_reconcile_total`, `..._errors_total`, latences). Les scraper comme toute application.",
          "Sondes : le manager généré expose `/healthz` et `/readyz` — les brancher en liveness/readiness du Deployment du manager.",
          "Status des CR : un dashboard qui compte les CR par phase (`Ready` vs `Degraded`) donne la santé métier d'un coup d'œil.",
          "Alertes : taux d'erreurs de réconciliation élevé ou CR bloquées en `Progressing` depuis trop longtemps = paging.",
        ],
      },
    ],
  },
  {
    id: "erreur-rbac-oublie",
    title: "Erreur : RBAC oublié",
    level: 3,
    intro: "Le classique : `forbidden` dès que `Reconcile` touche une nouvelle ressource.",
    blocks: [
      {
        kind: "text",
        text: "Symptôme dans les logs : `deployments.apps \"x\" is forbidden: User \"system:serviceaccount:...\" cannot create resource`. L'operator a le droit de lire la CR mais pas de créer le Deployment qu'elle implique.",
      },
      {
        kind: "list",
        items: [
          "Correction : ajouter le marker `//+kubebuilder:rbac` correspondant au-dessus de `Reconcile`, puis `make manifests install` et redéployer.",
          "Prévention : lister dès la conception toutes les ressources touchées (primaires + secondaires + status + events + leases).",
          "En dev avec `make run`, l'operator utilise vos propres droits `kubectl` : le problème n'apparaît qu'une fois déployé avec son ServiceAccount — d'où l'importance de tester le déploiement réel.",
        ],
      },
    ],
  },
  {
    id: "erreur-boucle-infinie",
    title: "Erreur : boucle de réconciliation infinie",
    level: 3,
    intro: "Quand `Reconcile` se redéclenche sans fin.",
    blocks: [
      {
        kind: "text",
        text: "Symptôme : les logs montrent `Reconcile` appelé en boucle pour le même objet, avec des `Update` à chaque passage. Cause typique : `Reconcile` écrit quelque chose qui redéclenche un watch — par exemple mettre à jour le `spec` (au lieu du `status`), ou réécrire un champ avec une valeur sémantiquement identique mais sérialisée différemment (défauts appliqués par l'API).",
      },
      {
        kind: "list",
        items: [
          "Diagnostic : comparer l'objet avant/après dans les logs ; repérer le champ qui change à chaque tour.",
          "Correction : ne jamais toucher au spec depuis l'operator ; écrire le status uniquement si quelque chose a réellement changé.",
          "Garde-fou : `CreateOrUpdate` + mutation idempotente évite la plupart de ces boucles côté ressources secondaires.",
        ],
      },
    ],
  },
  {
    id: "erreur-finalizer-bloque",
    title: "Erreur : suppression bloquée par un finalizer",
    level: 3,
    intro: "La CR reste en `Terminating` indéfiniment.",
    blocks: [
      {
        kind: "text",
        text: "Cause : le finalizer n'est jamais retiré — soit parce que le nettoyage échoue (erreur retournée), soit parce que l'operator ne tourne plus du tout. L'objet reste coincé, et avec lui parfois tout un namespace.",
      },
      {
        kind: "list",
        items: [
          "Diagnostic : `kubectl get <cr> -o yaml` — `deletionTimestamp` renseigné + finalizer présent = nettoyage en cours ou en échec ; logs de l'operator pour l'erreur exacte.",
          "Sortie de secours : si le nettoyage est impossible ou sans objet, retirer le finalizer à la main (`kubectl patch` avec `metadata.finalizers: []`) — en assumant les ressources orphelines.",
          "Prévention : nettoyage idempotent, timeouts, et jamais de finalizer sans chemin de sortie testé.",
        ],
      },
    ],
  },
  {
    id: "erreur-schema-obsolete",
    title: "Erreur : schéma CRD obsolète",
    level: 3,
    intro: "Les nouveaux champs sont ignorés ou rejetés après un changement de types.",
    blocks: [
      {
        kind: "list",
        items: [
          "Symptôme : un champ ajouté dans `*_types.go` n'apparaît pas dans la CR, ou l'API rejette la CR avec une erreur de validation.",
          "Cause : `make install` non relancé après modification des types — la CRD sur le cluster est l'ancienne version du schéma.",
          "Correction : `make manifests generate install`, puis redéployer. Vérifier avec `kubectl get crd <nom> -o yaml`.",
          "En production : les mises à jour de CRD sont délicates (pas de rollback natif du schéma) — tester la migration sur un cluster éphémère d'abord.",
        ],
      },
    ],
  },
  {
    id: "conversion-webhooks",
    title: "Webhooks de conversion multi-versions",
    level: 3,
    intro: "Faire cohabiter v1alpha1, v1beta1 et v1 d'une même CRD.",
    blocks: [
      {
        kind: "text",
        text: "Quand une CRD évolue (champ renommé, structure changée), plusieurs versions coexistent : les objets stockés restent dans la version de stockage, mais les utilisateurs peuvent lire/écrire dans n'importe quelle version servie. Le webhook de conversion traduit entre versions à la volée.",
      },
      {
        kind: "list",
        items: [
          "Stratégie de versions : v1alpha1 (instable, peut casser), v1beta1 (stable mais perfectible), v1 (stable, engagements de compatibilité).",
          "Une seule version de stockage (`storage: true`) : c'est elle qui est persistée dans etcd ; les autres sont converties à la lecture/écriture.",
          "La conversion peut être par simple hub-and-spoke (tout passe par la version hub) — le pattern recommandé par Kubebuilder.",
          "Tester la conversion dans les deux sens : une conversion qui perd des données corrompt silencieusement les objets.",
          "Planifier la fin de vie : servir une vieille version « pour toujours » fige l'API — annoncer les dépréciations et les retraits.",
        ],
      },
    ],
  },
  {
    id: "contextes-et-timeouts",
    title: "Contextes et timeouts dans reconcile",
    level: 3,
    intro: "Ne pas laisser une réconciliation bloquer le worker.",
    blocks: [
      {
        kind: "list",
        items: [
          "Chaque appel API Kubernetes doit avoir un timeout via le contexte : un appel qui pend indéfiniment bloque le worker et retarde toutes les autres réconciliations.",
          "Règle : `ctx` avec timeout sur les opérations externes (API cloud, webhooks) ; propager l'annulation quand la réconciliation est supersédée.",
          "Une réconciliation doit rester courte (secondes, pas minutes) : les traitements longs se découpent en étapes avec requeue.",
          "Sur timeout : retourner une erreur (requeue avec backoff) plutôt que de continuer dans un état incertain.",
        ],
      },
    ],
  },
  {
    id: "scorecard",
    title: "Scorecard Operator SDK",
    level: 3,
    intro: "Valider un opérateur contre les bonnes pratiques de l'écosystème.",
    blocks: [
      {
        kind: "command",
        label: "Lancer le scorecard",
        command: "operator-sdk scorecard bundle",
        why: "Exécute une batterie de tests sur le bundle OLM : structure du bundle, bonnes pratiques des manifests, tests personnalisés. C'est la porte d'entrée vers la certification et les catalogues communautaires.",
        verify: "operator-sdk scorecard --help",
      },
      {
        kind: "text",
        text: "Le scorecard ne remplace pas vos tests métier, mais il attrape les erreurs de packaging qui feraient rejeter l'opérateur des catalogues. À intégrer dans la CI avant chaque release.",
      },
    ],
  },
  {
    id: "erreur-reconcile-lente",
    title: "Erreur : réconciliation trop lente",
    level: 3,
    intro: "Quand l'opérateur ne suit plus le rythme des changements.",
    blocks: [
      {
        kind: "list",
        items: [
          "Symptôme : les objets mettent des minutes à converger, la file de travail grandit.",
          "Cause 1 : appels API synchrones longs ou sans timeout dans reconcile — profiler et ajouter des timeouts.",
          "Cause 2 : requeue trop agressif (requeue immédiat en boucle) — utiliser RequeueAfter avec backoff.",
          "Cause 3 : trop d'objets surveillés sans filtrage — restreindre avec des prédicats et des namespaces.",
          "Cause 4 : un seul worker pour des centaines d'objets — augmenter MaxConcurrentReconciles si les réconciliations sont indépendantes.",
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques professionnelles",
    level: 3,
    intro: "Ce qui distingue un operator de démo d'un operator opérable.",
    blocks: [
      {
        kind: "list",
        items: [
          "Status toujours renseigné : phases et conditions typées, observables sans lire les logs.",
          "Events aux moments clés : création, mise à jour, échec — jamais de secrets dedans.",
          "`Reconcile` courte et idempotente : pas d'appels réseau longs bloquants, pas d'état local.",
          "RBAC au moindre privilège, déclaré via markers et régénéré, jamais édité à la main.",
          "Validation au plus tôt : schéma OpenAPI strict, webhooks seulement si nécessaire.",
          "Finalizers avec chemin de sortie testé — ou pas de finalizer.",
          "Tests envtest sur les chemins critiques : création, mise à jour, suppression.",
          "Métriques Prometheus et sondes branchées dès le premier déploiement.",
          "Documentation de la CRD : chaque champ de spec documenté, avec exemples.",
          "Versionner l'API (`v1`, `v1beta1`) et planifier les conversions avant d'en avoir besoin.",
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 3,
    intro:
      "Trois projets pour passer de l'usage à l'écriture d'operators.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Opérer avec un operator existant",
        fields: [
          {
            label: "Objectif",
            value:
              "Installer un operator mature (ex. cert-manager ou l'operator PostgreSQL de votre choix) et l'utiliser via ses CRD uniquement.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Lecture de CRD, `kubectl explain`, status, events, logs du manager.",
          },
          {
            label: "Réussi quand",
            value:
              "Vous déployez l'application via la CR sans jamais toucher aux Deployments sous-jacents, et vous diagnostiquez une CR en `Degraded` via status + events.",
          },
          {
            label: "Difficulté",
            value: "Débutant — quelques heures.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — Operator WebApp complet",
        fields: [
          {
            label: "Objectif",
            value:
              "Avec Kubebuilder : CRD `WebApp` (replicas, image), `Reconcile` qui maintient Deployment + Service, status renseigné, events, RBAC correct.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Scaffolding, `CreateOrUpdate`, `Owns`, status subresource, markers RBAC, envtest.",
          },
          {
            label: "Réussi quand",
            value:
              "Modifier la CR converge en moins d'une minute, supprimer un Pod le fait recréer, `make test` est vert, le manager tourne in-cluster.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — une semaine.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Operator avec état externe et finalizer",
        fields: [
          {
            label: "Objectif",
            value:
              "Étendre l'operator : provisionner une ressource externe simulée (bucket, entrée DNS via API fake), la nettoyer via finalizer, gérer les échecs avec requeue.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Finalizers, `RequeueAfter`, gestion d'erreurs, idempotence du nettoyage, conditions de status.",
          },
          {
            label: "Réussi quand",
            value:
              "La suppression de la CR nettoie la ressource externe même après redémarrage de l'operator mid-cleanup ; aucun objet ne reste coincé en `Terminating`.",
          },
          {
            label: "Difficulté",
            value: "Avancé — deux semaines.",
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
      "Les références à privilégier.",
    blocks: [
      {
        kind: "list",
        items: [
          "`https://kubernetes.io/docs/concepts/extend-kubernetes/operator/` — le pattern Operator expliqué par la documentation Kubernetes officielle : le point de départ conceptuel.",
          "`https://book.kubebuilder.io/` — le livre Kubebuilder : tutoriel complet, de `init` aux webhooks.",
          "`https://operatorframework.io/` — le site de l'Operator Framework : Operator SDK, OLM, catalogues.",
          "`https://pkg.go.dev/sigs.k8s.io/controller-runtime` — la référence Go de controller-runtime, indispensable quand on sort des sentiers battus.",
        ],
      },
      {
        kind: "text",
        text: "Conseil : lire le code d'un operator mature (cert-manager, par exemple) après le tutoriel — c'est là que les patterns (status, conditions, requeue) s'apprennent vraiment.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Les operators maîtrisés, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "`platform-engineering` : les operators sont la brique d'exécution des plateformes internes (IDP).",
          "`terraform` : provisionner le cluster et les dépendances que les operators consomment.",
          "`prometheus` : superviser les operators via leurs métriques et les phases des CR.",
          "`cicd` : tester et publier les bundles d'operators dans un pipeline.",
          "`helm` : packager le déploiement de l'operator lui-même (beaucoup d'operators sont distribués via charts).",
        ],
      },
    ],
  },
];

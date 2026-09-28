import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète des Container Registries : de zéro à une
 * gestion professionnelle des images. 3 niveaux d'information
 * (Aperçu / Pratique / Approfondi) avec divulgation progressive.
 * Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_CONTAINER_REGISTRY: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est un registre de conteneurs et pourquoi aucun déploiement sérieux ne s'en passe.",
    blocks: [
      {
        kind: "text",
        text: "Un container registry est un dépôt qui stocke, versionne et distribue les images de conteneurs : le point de passage obligé entre le build et le déploiement. On y pousse (`push`) les images construites, on les scanne, puis les serveurs et clusters les tirent (`pull`) pour les exécuter.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est indispensable : le registre garantit que la production exécute exactement l'image qui a été testée — pas une reconstruction approximative. Il centralise aussi la sécurité : scan de vulnérabilités, contrôle d'accès (qui peut pousser/tirer), et traçabilité des versions déployées.",
      },
      {
        kind: "diagram",
        title: "Le registre dans la chaîne de déploiement",
        lines: [
          "Code source",
          "   │  docker build",
          "   ▼",
          "Image locale (tag :1.4.2)",
          "   │  docker push",
          "   ▼",
          "REGISTRE ──┬── scan de vulnérabilités",
          "          ├── contrôle d'accès",
          "          └── signature / provenance",
          "   │  docker pull / déploiement",
          "   ▼",
          "Production (exactement l'image testée)",
        ],
      },
    ],
  },
  {
    id: "anatomie-image",
    title: "Image, tag, digest : l'anatomie",
    level: 1,
    intro:
      "Trois notions à ne jamais confondre : l'image, son étiquette (tag) et son empreinte (digest).",
    blocks: [
      {
        kind: "fields",
        title: "Les trois identifiants",
        fields: [
          {
            label: "Image",
            value:
              "Le paquet : couches (layers) + métadonnées. Nommée `registre/organisation/nom`, ex. `ghcr.io/mon-org/mon-app`.",
          },
          {
            label: "Tag",
            value:
              "Une étiquette mobile posée sur une image : `1.4.2`, `latest`, `main-abc123`. Le même tag peut pointer vers une image différente demain.",
          },
          {
            label: "Digest",
            value:
              "L'empreinte cryptographique (`sha256:...`) du contenu : immuable, elle désigne une image précise pour toujours. `image@sha256:abc...` ne changera jamais de contenu.",
          },
        ],
      },
      {
        kind: "text",
        text: "La règle qui en découle : en développement, les tags sont pratiques (`latest`, nom de branche) ; en production, on épingle le digest ou un tag semver immuable. Déployer `latest` en production, c'est déployer une cible mouvante.",
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
      "Le registre suppose Docker maîtrisé : c'est lui qui produit et consomme les images.",
    blocks: [
      {
        kind: "fields",
        title: "Les fondations indispensables",
        fields: [
          {
            label: "Docker (`docker`)",
            value:
              "Builder une image (`docker build`), la taguer, la lancer. Sans ça, le registre n'a rien à stocker.",
          },
          {
            label: "Ligne de commande",
            value:
              "La CLI `docker` (login, tag, push, pull) est l'interface principale vers les registres.",
          },
          {
            label: "Git et CI (`cicd`)",
            value:
              "Le push vers le registre se fait typiquement depuis un pipeline : comprendre les bases du CI éclaire le workflow.",
          },
        ],
      },
    ],
  },
  {
    id: "docker-hub",
    title: "Docker Hub : le registre public de référence",
    level: 2,
    intro:
      "Docker Hub héberge les images officielles et communautaires : le point de départ de presque tous les Dockerfiles.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer un compte",
            detail:
              "Sur hub.docker.com : compte gratuit avec un dépôt privé inclus. Les images officielles (`nginx`, `postgres`, `node`) sont tirées sans compte.",
          },
          {
            title: "Se connecter en local",
            detail:
              "`docker login` puis identifiants : la session est mémorisée. Pour les scripts et la CI, préférez un token d'accès (Account Settings > Security) au mot de passe.",
          },
          {
            title: "Créer un dépôt",
            detail:
              "Sur le site : `Create repository`, nom explicite (`mon-org/mon-app`), visibilité privée par défaut pour votre code.",
          },
        ],
      },
      {
        kind: "command",
        label: "Se connecter à Docker Hub",
        command: "docker login",
        why: "Authentifie la CLI Docker auprès de Docker Hub : nécessaire pour pousser des images et pour augmenter les quotas de pull. Les identifiants sont stockés chiffrés par le credential helper de l'OS.",
        verify: "docker pull hello-world",
      },
    ],
  },
  {
    id: "premier-push",
    title: "Premier push : builder, taguer, publier",
    level: 2,
    intro:
      "Le cycle complet : de l'image locale au registre, en trois commandes.",
    blocks: [
      {
        kind: "command",
        label: "Taguer l'image pour le registre",
        command: "docker tag mon-app:local mon-user/mon-app:1.0.0",
        why: "`docker tag` ne copie rien : il ajoute un alias (nom complet du registre + tag) à l'image existante. Le nom doit correspondre au dépôt de destination, sinon le push est refusé.",
      },
      {
        kind: "command",
        label: "Pousser vers le registre",
        command: "docker push mon-user/mon-app:1.0.0",
        why: "Envoie les couches manquantes vers le registre (seules les couches nouvelles sont transférées, le reste est dédupliqué). L'image devient tirable depuis n'importe quelle machine authentifiée.",
        verify: "Le dépôt affiche le tag `1.0.0` sur hub.docker.com.",
      },
      {
        kind: "command",
        label: "Tirer l'image ailleurs",
        command: "docker pull mon-user/mon-app:1.0.0",
        why: "Télécharge l'image (couches manquantes uniquement) : c'est ce que font les serveurs de production et les pipelines. Si le pull fonctionne sur une machine fraîche, l'image est correctement publiée.",
      },
    ],
  },
  {
    id: "nommage-images",
    title: "Convention de nommage",
    level: 2,
    intro:
      "Le nom complet d'une image suit un format strict : le comprendre évite les erreurs de push.",
    blocks: [
      {
        kind: "code",
        language: "text",
        title: "Format d'un nom d'image",
        code: `[registre/]organisation/nom[:tag]

Exemples :
nginx                          -> Docker Hub, image officielle, tag latest
mon-user/mon-app:1.0.0         -> Docker Hub, dépôt personnel
ghcr.io/mon-org/mon-app:1.0.0  -> GitHub Container Registry
123456789012.dkr.ecr.eu-west-3.amazonaws.com/mon-app:1.0.0
                               -> Amazon ECR (registre privé AWS)`,
      },
      {
        kind: "list",
        items: [
          "Sans registre explicite, Docker suppose Docker Hub : `nginx` = `docker.io/library/nginx`.",
          "Le registre fait partie du nom : une image taguée pour GHCR ne peut pas être poussée vers Docker Hub sans re-tag.",
          "Nommez les dépôts comme vos projets (`mon-org/api-paiement`), pas comme vos images (`image1`, `test-final-v2`).",
        ],
      },
    ],
  },
  {
    id: "ghcr",
    title: "GHCR : le registre de GitHub",
    level: 2,
    intro:
      "GitHub Container Registry (`ghcr.io`) : le registre intégré aux dépôts et aux workflows Actions.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer un token d'accès",
            detail:
              "GitHub > Settings > Developer settings > Personal access tokens : créez un token (classique) avec le scope `write:packages` (ou `read:packages` pour tirer uniquement).",
          },
          {
            title: "Se connecter",
            detail:
              "`echo $TOKEN | docker login ghcr.io -u mon-user --password-stdin` : le token passe par stdin, jamais en clair dans l'historique.",
          },
          {
            title: "Pousser",
            detail:
              "`docker tag mon-app:local ghcr.io/mon-user/mon-app:1.0.0` puis `docker push` : le paquet apparaît dans l'onglet Packages du profil ou de l'organisation.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Visibilité : public, privé ou interne (organisation). Les paquets privés sont gratuits avec les limites du forfait.",
          "Dans les workflows Actions, l'authentification utilise le `GITHUB_TOKEN` automatique : aucun secret à créer pour pousser vers GHCR depuis la CI du dépôt.",
          "Liez le paquet au dépôt source : la page du paquet affiche alors le code, les versions et les workflows associés.",
        ],
      },
    ],
  },
  {
    id: "versioning-semver",
    title: "Versionner ses images : semver",
    level: 2,
    intro:
      "Le tag est un contrat : une convention de versionnage claire rend les déploiements traçables.",
    blocks: [
      {
        kind: "table",
        headers: ["Tag", "Usage", "En production ?"],
        rows: [
          ["`1.4.2`", "Version semver précise : la référence traçable", "Oui — le standard"],
          ["`1.4` / `1`", "Version majeure/mineure flottante", "Avec prudence (évolue)"],
          ["`latest`", "Dernière construction : pratique en dev", "Non — cible mouvante"],
          ["`main-abc123`", "Branche + SHA du commit : traçabilité CI", "Oui — très courant en CI"],
          ["`2026-09-29`", "Date de build", "Possible, moins informatif que semver"],
        ],
      },
      {
        kind: "list",
        items: [
          "Poussez plusieurs tags pour un même build (`1.4.2`, `1.4`, `1`, `latest`) : chaque usage choisit son niveau de stabilité.",
          "En CI, taguez systématiquement avec le SHA du commit : chaque image est rattachée à un code précis.",
          "Ne réécrivez jamais un tag semver publié : une version publiée est immuable, sinon la traçabilité est morte.",
        ],
      },
    ],
  },
  {
    id: "inspect-images",
    title: "Inspecter les images locales",
    level: 2,
    intro:
      "Vérifier le contenu d'une image avant de la pousser ou après l'avoir tirée.",
    blocks: [
      {
        kind: "command",
        label: "Lister les images locales",
        command: "docker images",
        why: "Affiche les images locales : dépôt, tag, ID, taille, âge. Le premier diagnostic quand un push/pull ne trouve pas l'image attendue.",
      },
      {
        kind: "command",
        label: "Inspecter les métadonnées",
        command: "docker image inspect mon-user/mon-app:1.0.0",
        why: "Retourne le JSON complet : couches, variables d'environnement, point d'entrée, digest. Indispensable pour vérifier ce que contient vraiment une image avant déploiement.",
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow quotidien",
    level: 2,
    intro:
      "La boucle typique quand on travaille avec un registre.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Builder en local",
            detail:
              "`docker build -t mon-app:test .` : itérez vite en local, sans toucher au registre.",
          },
          {
            title: "Tester l'image",
            detail:
              "Lancez-la (`docker run`) et vérifiez le comportement : on ne pousse que ce qui fonctionne.",
          },
          {
            title: "Taguer versionné",
            detail:
              "`docker tag mon-app:test ghcr.io/mon-org/mon-app:1.4.2` : le tag reflète la version livrée, pas « test ».",
          },
          {
            title: "Pousser",
            detail:
              "`docker push` : en pratique, c'est la CI qui pousse après les tests, pas le poste de développement.",
          },
          {
            title: "Déployer par référence",
            detail:
              "La production tire `ghcr.io/mon-org/mon-app:1.4.2` (ou son digest) : l'image déployée est exactement l'image testée.",
          },
        ],
      },
    ],
  },
  {
    id: "nettoyage-local",
    title: "Nettoyer en local",
    level: 2,
    intro:
      "Les images s'accumulent vite : le nettoyage régulier évite le disque plein.",
    blocks: [
      {
        kind: "command",
        label: "Supprimer les images inutilisées",
        command: "docker image prune",
        why: "Supprime les images « dangling » (sans tag, résidus de builds). Avec `-a`, supprime aussi les images non utilisées par un conteneur. À lancer régulièrement sur les postes de dev et les runners CI.",
        verify: "docker images : seules les images taguées et utilisées restent.",
      },
      {
        kind: "list",
        items: [
          "`docker system df` montre l'espace occupé par images, conteneurs et volumes : le tableau de bord du ménage.",
          "En CI, nettoyez les runners éphémères ou utilisez des runners jetables : un disque plein en plein build est une panne évitable.",
        ],
      },
    ],
  },
  {
    id: "erreurs-debutant",
    title: "Erreurs de débutant à éviter",
    level: 2,
    intro:
      "Les pièges classiques des premiers push.",
    blocks: [
      {
        kind: "list",
        items: [
          "Déployer `latest` en production : le tag a peut-être changé depuis les tests. Épinglez un tag semver ou un digest.",
          "Pousser sans être logué : `denied: requested access to the resource is denied` signifie presque toujours un `docker login` manquant ou expiré.",
          "Oublier le préfixe du registre dans le tag : l'image part vers Docker Hub au lieu de GHCR/ECR.",
          "Publier une image contenant des secrets (clés, tokens dans les couches) : ils sont extractibles par quiconque tire l'image.",
          "Ne jamais nettoyer : les vieux tags s'accumulent, coûtent du stockage et brouillent la lecture des versions.",
          "Construire sur une architecture et déployer sur une autre (ARM vs x86) : l'image ne démarre pas. Voir le multi-arch au niveau 3.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "digest-immuabilite",
    title: "Digest : l'immuabilité en production",
    level: 3,
    intro:
      "Le digest est l'empreinte du contenu : l'utiliser en production élimine toute ambiguïté sur ce qui tourne.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Récupérer et utiliser un digest",
        code: `docker pull ghcr.io/mon-org/mon-app:1.4.2
docker inspect --format='{{index .RepoDigests 0}}' ghcr.io/mon-org/mon-app:1.4.2
# -> ghcr.io/mon-org/mon-app@sha256:9f3a1c...`,
      },
      {
        kind: "list",
        items: [
          "Le digest change à chaque modification du contenu : deux builds du même tag ont des digests différents.",
          "En Kubernetes, `image: mon-app@sha256:...` garantit que tous les nœuds exécutent exactement la même image.",
          "Stratégie courante : tag semver pour les humains, digest épinglé dans les manifests de déploiement.",
          "Certains registres proposent l'immuabilité des tags (interdire l'écrasement) : activez-la sur les dépôts de production.",
        ],
      },
    ],
  },
  {
    id: "scan-vulnerabilites",
    title: "Scanner les vulnérabilités",
    level: 3,
    intro:
      "Chaque image embarque un OS et des dépendances : le scan révèle les CVE connues avant le déploiement.",
    blocks: [
      {
        kind: "command",
        label: "Scanner une image avec Trivy",
        command: "trivy image ghcr.io/mon-org/mon-app:1.4.2",
        why: "Trivy (open source) analyse les couches et liste les CVE par sévérité (CRITICAL, HIGH...). À intégrer dans la CI : un scan qui échoue sur les vulnérabilités critiques bloque le déploiement.",
        verify: "Le rapport affiche 0 vulnérabilité CRITICAL avant chaque mise en production.",
      },
      {
        kind: "list",
        items: [
          "Les registres cloud scannent nativement à chaque push (ECR, ACR, Artifact Registry, GHCR via Dependabot alerts) : consultez le rapport, ne l'ignorez pas.",
          "Réduisez la surface : images de base minimales (`alpine`, `distroless`, `slim`), multi-stage builds, pas de paquets inutiles.",
          "Corrigez à la source : mettez à jour l'image de base et les dépendances, puis reconstruisez — ne patchez jamais une image à la main.",
          "Distinguez le bruit : une CVE sur un binaire non exécuté n'a pas la même urgence qu'une faille sur le serveur web exposé.",
        ],
      },
    ],
  },
  {
    id: "signature-cosign",
    title: "Signer les images avec Cosign",
    level: 3,
    intro:
      "La signature prouve qu'une image vient bien de votre pipeline : la base de la chaîne d'approvisionnement (supply chain).",
    blocks: [
      {
        kind: "command",
        label: "Signer une image",
        command: "cosign sign ghcr.io/mon-org/mon-app:1.4.2",
        why: "Cosign (projet Sigstore) attache une signature cryptographique à l'image dans le registre. Les politiques d'admission (ex. sur Kubernetes) peuvent ensuite exiger : « seules les images signées par notre CI sont déployables ».",
        verify: "cosign verify ghcr.io/mon-org/mon-app:1.4.2",
      },
      {
        kind: "list",
        items: [
          "Le mode « keyless » (OIDC) signe avec l'identité du pipeline CI : pas de clé à gérer ni à protéger.",
          "La signature seule ne suffit pas : combinez avec le scan (image saine) et le digest épinglé (image exacte).",
          "Les SBOM (nomenclature des composants) complètent la signature : savoir exactement ce que contient l'image.",
        ],
      },
    ],
  },
  {
    id: "sbom-provenance",
    title: "SBOM et provenance",
    level: 3,
    intro:
      "Savoir ce que contient une image et d'où elle vient : l'exigence croissante des environnements réglementés.",
    blocks: [
      {
        kind: "fields",
        title: "Deux documents complémentaires",
        fields: [
          {
            label: "SBOM",
            value:
              "Software Bill of Materials : l'inventaire des composants (paquets OS, dépendances) d'une image. Généré au build (ex. avec Docker Buildx ou Syft), il permet de répondre à « sommes-nous affectés par cette CVE ? » en minutes.",
          },
          {
            label: "Provenance (attestation)",
            value:
              "Le certificat de naissance : qui a construit l'image, à partir de quel commit, avec quels paramètres. Les attestations SLSA formalisent ce niveau de traçabilité.",
          },
        ],
      },
      {
        kind: "text",
        text: "Commencez simplement : générez un SBOM par image en CI et stockez-le avec l'image. C'est déjà un énorme progrès par rapport à « on ne sait pas ce qu'il y a dedans ».",
      },
    ],
  },
  {
    id: "ecr",
    title: "Amazon ECR",
    level: 3,
    intro:
      "Le registre privé d'AWS, intégré à IAM : le choix naturel sur AWS.",
    blocks: [
      {
        kind: "command",
        label: "S'authentifier auprès d'ECR",
        command: "aws ecr get-login-password --region eu-west-3 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.eu-west-3.amazonaws.com",
        why: "Récupère un token temporaire (12 h) et l'injecte dans `docker login` sans l'exposer. Remplacez l'ID de compte et la région par les vôtres. En CI, ce sont les permissions IAM du rôle qui autorisent le push.",
        verify: "docker push 123456789012.dkr.ecr.eu-west-3.amazonaws.com/mon-app:1.0.0",
      },
      {
        kind: "list",
        items: [
          "Pas de credential à long terme : l'authentification passe par IAM (utilisateur, rôle, ou rôle de tâche ECS).",
          "Le scan à l'envoi (scan on push) analyse chaque image poussée : activez-le sur les dépôts critiques.",
          "Les politiques de cycle de vie purgent automatiquement les vieux tags (ex. garder les 10 dernières images).",
          "La réplication inter-régions rapproche les images des clusters qui les consomment.",
        ],
      },
    ],
  },
  {
    id: "acr",
    title: "Azure Container Registry",
    level: 3,
    intro:
      "Le registre d'Azure, intégré à Entra ID et à AKS.",
    blocks: [
      {
        kind: "command",
        label: "Se connecter au registre Azure",
        command: "az acr login --name monregistre",
        why: "Authentifie Docker avec votre session Azure active. Ensuite, `docker push monregistre.azurecr.io/mon-app:1.0.0` fonctionne directement.",
      },
      {
        kind: "list",
        items: [
          "ACR Tasks : buildez les images dans Azure à chaque commit, sans Docker local — le build devient reproductible et auditable.",
          "Attachez AKS au registre (`--attach-acr`) : le cluster tire les images via son identité managée, aucun secret à gérer.",
          "Le SKU Premium ajoute la géo-réplication, le scan et les endpoints privés.",
          "Pour la CI externe, utilisez un principal de service ou des federated credentials plutôt que la clé d'admin du registre.",
        ],
      },
    ],
  },
  {
    id: "registre-gcp",
    title: "Artifact Registry (GCP)",
    level: 3,
    intro:
      "Le registre unifié de Google : conteneurs, paquets et modèles IA.",
    blocks: [
      {
        kind: "command",
        label: "Configurer l'authentification Docker",
        command: "gcloud auth configure-docker europe-west1-docker.pkg.dev",
        why: "Enregistre le credential helper GCP pour le registre régional : `docker push europe-west1-docker.pkg.dev/mon-projet/mon-repo/mon-app:1.0.0` utilise ensuite vos credentials GCP.",
      },
      {
        kind: "list",
        items: [
          "Dépôts régionaux : stockez les images près des clusters GKE et des services Cloud Run qui les tirent.",
          "Le scan de vulnérabilités (Artifact Analysis) s'active par dépôt.",
          "Le nettoyage automatisé supprime les images selon des règles (âge, nombre de versions conservées).",
          "L'accès se contrôle par IAM au niveau du dépôt : rôles de lecture/écriture distincts.",
        ],
      },
    ],
  },
  {
    id: "registre-gitlab",
    title: "GitLab Container Registry",
    level: 3,
    intro:
      "Le registre intégré à chaque projet GitLab : zéro configuration.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Push depuis .gitlab-ci.yml",
        code: `build:
  stage: build
  image: docker:24
  services:
    - docker:24-dind
  variables:
    IMAGE: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA
  script:
    - docker build -t $IMAGE .
    - docker login $CI_REGISTRY -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD
    - docker push $IMAGE`,
      },
      {
        kind: "list",
        items: [
          "`$CI_REGISTRY_IMAGE` est l'URL du registre du projet, fournie automatiquement : aucun secret à créer.",
          "Les variables `$CI_REGISTRY_USER` / `$CI_REGISTRY_PASSWORD` sont injectées par GitLab CI : l'authentification est native.",
          "Les politiques de nettoyage (Settings > Packages) purgent les vieux tags par regex et par âge.",
        ],
      },
    ],
  },
  {
    id: "registre-auto-heberge",
    title: "Registre auto-hébergé",
    level: 3,
    intro:
      "Héberger son propre registre : contrôle total, maintenance en plus.",
    blocks: [
      {
        kind: "command",
        label: "Lancer le registre officiel",
        command: "docker run -d -p 5000:5000 --restart always --name registry registry:2",
        why: "Démarre l'image officielle `registry:2` : un registre fonctionnel en une commande, sur le port 5000. Suffisant pour un labo ou une CI isolée ; la production exige stockage persistant, TLS et authentification.",
        verify: "curl http://localhost:5000/v2/ retourne {}.",
      },
      {
        kind: "list",
        items: [
          "Persistez `/var/lib/registry` sur un volume : sinon les images disparaissent au redémarrage du conteneur.",
          "Ajoutez TLS (reverse proxy) et une authentification (htpasswd ou tokens) avant toute exposition réseau.",
          "Pour aller plus loin : Harbor (open source) ajoute scan, signature, réplication et gestion fine des accès — le standard de l'auto-hébergé sérieux.",
          "Le pull-through cache (miroir) réduit les tirages vers Docker Hub et protège des rate limits.",
        ],
      },
    ],
  },
  {
    id: "retention",
    title: "Politiques de rétention",
    level: 3,
    intro:
      "Un registre sans nettoyage devient un cimetière coûteux : automatisez la purge.",
    blocks: [
      {
        kind: "list",
        items: [
          "Règles typiques : garder les N dernières images, supprimer les tags de branches mergées après X jours, ne jamais supprimer les tags semver de release.",
          "Tous les registres majeurs proposent des politiques de cycle de vie (ECR, ACR, Artifact Registry, GitLab, GHCR) : configurez-les dès la création du dépôt.",
          "Excluez explicitement les tags protégés (`prod-*`, semver) des règles de suppression : une purge trop agressive casse un rollback.",
          "Surveillez le stockage : c'est un poste de coût réel, surtout avec des images lourdes et des builds fréquents.",
        ],
      },
    ],
  },
  {
    id: "rate-limits",
    title: "Rate limits : les quotas de pull",
    level: 3,
    intro:
      "Docker Hub limite les tirages anonymes et gratuits : un pipeline qui pull trop échoue.",
    blocks: [
      {
        kind: "list",
        items: [
          "Symptôme : `toomanyrequests: You have reached your pull rate limit`. La CI qui rebuild souvent est la première touchée.",
          "Solutions : authentifiez les pulls (quotas supérieurs), mettez en cache les images de base dans votre propre registre, ou utilisez un miroir pull-through.",
          "En CI, préférez tirer depuis votre registre privé (où vous avez poussé l'image) plutôt que de re-tirer les bases publiques à chaque build.",
          "Surveillez la consommation : Docker Hub affiche l'usage du compte, et les en-têtes de réponse indiquent le quota restant.",
        ],
      },
    ],
  },
  {
    id: "multi-arch",
    title: "Images multi-architectures",
    level: 3,
    intro:
      "Une image construite sur ARM (Mac M1+) ne démarre pas sur un serveur x86 : le multi-arch résout ça.",
    blocks: [
      {
        kind: "command",
        label: "Builder pour plusieurs architectures",
        command: "docker buildx build --platform linux/amd64,linux/arm64 -t mon-org/mon-app:1.0.0 --push .",
        why: "Buildx construit une image par plateforme et publie un manifeste multi-arch : le client tire automatiquement la variante correspondant à son architecture. Indispensable quand dev (ARM) et prod (x86) diffèrent.",
        verify: "docker buildx imagetools inspect mon-org/mon-app:1.0.0 liste les deux plateformes.",
      },
      {
        kind: "list",
        items: [
          "Testez chaque variante : un binaire compilé pour la mauvaise arch échoue silencieusement ou bruyamment selon les cas.",
          "Les images officielles sont déjà multi-arch : le problème ne concerne que vos propres builds.",
          "En CI, le build multi-arch prend plus de temps (émulation QEMU pour l'arch non native) : prévoyez-le dans les timeouts.",
        ],
      },
    ],
  },
  {
    id: "cache-layers",
    title: "Optimiser les couches et le cache",
    level: 3,
    intro:
      "Des images légères se poussent et se tirent vite : la structure du Dockerfile compte autant que le registre.",
    blocks: [
      {
        kind: "code",
        language: "dockerfile",
        title: "Multi-stage : image finale minimale",
        code: `FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-slim
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm ci --omit=dev
CMD ["node", "dist/index.js"]`,
      },
      {
        kind: "list",
        items: [
          "Multi-stage : l'image finale ne contient que le nécessaire (pas les outils de build, pas les dépendances de dev).",
          "Ordonnez les couches du moins au plus changeant : les dépendances avant le code, pour maximiser le cache.",
          "Un `.dockerignore` soigné évite d'envoyer (et de cacher) des gigas inutiles : `node_modules`, `.git`, fichiers locaux.",
          "Moins de couches modifiées = push/pull plus rapides : seules les couches changées transitent.",
        ],
      },
    ],
  },
  {
    id: "ci-integration",
    title: "Intégration CI : builder et pousser",
    level: 3,
    intro:
      "Le pipeline type : build, scan, push — avec des tags traçables.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "GitHub Actions : build et push vers GHCR",
        code: `name: Image
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4

      - name: Connexion à GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Build et push
        uses: docker/build-push-action@v6
        with:
          push: true
          tags: ghcr.io/\${{ github.repository }}:\${{ github.sha }}`,
      },
      {
        kind: "list",
        items: [
          "Le tag = le SHA du commit : chaque image est rattachée à un code précis, sans ambiguïté.",
          "Ajoutez une étape de scan (Trivy) entre le build et le push : une image vulnérable ne doit pas atteindre le registre.",
          "Les permissions minimales (`packages: write`) suivent le moindre privilège, même dans la CI.",
        ],
      },
    ],
  },
  {
    id: "permissions-securite",
    title: "Permissions et sécurité du registre",
    level: 3,
    intro:
      "Qui peut pousser, qui peut tirer : le contrôle d'accès est la moitié de la sécurité du registre.",
    blocks: [
      {
        kind: "list",
        items: [
          "Séparez les rôles : les développeurs tirent, seule la CI pousse. Un humain qui push à la main contourne les garde-fous.",
          "Tokens à portée limitée et à durée courte pour la CI ; jamais de mot de passe personnel dans un pipeline.",
          "Dépôts privés par défaut pour le code interne ; public uniquement pour l'open source assumé.",
          "Désactivez l'écrasement des tags de release (immuabilité) : un tag publié ne change plus.",
          "Auditez les accès : qui a poussé quelle image et quand — tous les registres sérieux le journalisent.",
          "Scannez les secrets dans les images en CI : une clé dans une couche est une clé compromise.",
        ],
      },
    ],
  },
  {
    id: "oci-artifacts",
    title: "Artefacts OCI : au-delà des images",
    level: 3,
    intro:
      "Les registres stockent désormais plus que des images : charts Helm, modèles, SBOM.",
    blocks: [
      {
        kind: "list",
        items: [
          "Les charts Helm se publient comme artefacts OCI (`helm push mon-chart-1.0.0.tgz oci://ghcr.io/mon-org/charts`) : un seul registre pour images et charts.",
          "SBOM, signatures et attestations sont stockés comme artefacts liés à l'image : tout le dossier de conformité au même endroit.",
          "Le format OCI standardise tout ça : un registre compatible OCI (la plupart aujourd'hui) accepte ces artefacts.",
          "Versionnez les charts comme les images : un déploiement = une version d'image + une version de chart, traçables ensemble.",
        ],
      },
    ],
  },
  {
    id: "erreurs-frequentes",
    title: "Erreurs fréquentes et solutions",
    level: 3,
    intro:
      "Les messages d'erreur classiques, avec le diagnostic.",
    blocks: [
      {
        kind: "fields",
        title: "Diagnostic express",
        fields: [
          {
            label: "denied: requested access to the resource is denied",
            value:
              "Non authentifié ou sans permission : `docker login` (session expirée ?), vérifiez le token et ses scopes (`write:packages` pour pousser).",
          },
          {
            label: "unauthorized: authentication required",
            value:
              "Le registre exige une authentification même pour tirer (dépôt privé) : connectez-vous avant le pull.",
          },
          {
            label: "name unknown / repository does not exist",
            value:
              "Faute de frappe dans le nom, ou dépôt non créé (certains registres exigent la création préalable du dépôt).",
          },
          {
            label: "toomanyrequests: pull rate limit",
            value:
              "Quota Docker Hub atteint : authentifiez-vous, utilisez un miroir, ou tirez depuis votre registre privé.",
          },
          {
            label: "no matching manifest (architecture)",
            value:
              "L'image n'existe pas pour votre architecture : vérifiez avec `docker buildx imagetools inspect`, ou tirez avec `--platform`.",
          },
          {
            label: "L'image déployée n'est pas la bonne",
            value:
              "Tag mouvant (`latest` réécrit) ou cache : épinglez le digest en production et vérifiez `docker inspect` sur la cible.",
          },
          {
            label: "Push très lent",
            value:
              "Image trop lourde ou couches non optimisées : multi-stage build, `.dockerignore`, et registre proche géographiquement.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-registre",
    title: "Déboguer les problèmes de registre",
    level: 3,
    intro:
      "Les réflexes quand un push ou un pull échoue.",
    blocks: [
      {
        kind: "list",
        items: [
          "Lisez le message Docker en entier : il indique presque toujours la cause (auth, nom, réseau, quota).",
          "`docker logout` puis `docker login` : une session corrompue ou expirée explique bien des échecs mystérieux.",
          "Testez la connectivité réseau vers le registre (`curl -v https://ghcr.io/v2/`) : proxy d'entreprise et DNS sont des coupables fréquents.",
          "Vérifiez le tag exact avec `docker images` : un tag mal orthographié pousse vers un dépôt inexistant.",
          "Côté CI, affichez la version des actions de login/build : une action obsolète peut casser l'authentification.",
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro:
      "Les habitudes d'un usage professionnel des registres.",
    blocks: [
      {
        kind: "list",
        items: [
          "Tags semver immuables + digest épinglé en production ; `latest` réservé au développement.",
          "Un dépôt par image applicative, nommé comme le projet.",
          "Scan de vulnérabilités à chaque push, avec seuil bloquant sur les critiques.",
          "Signature des images de production (Cosign) et SBOM généré en CI.",
          "Politiques de rétention automatiques dès la création du dépôt.",
          "Permissions : la CI pousse, les humains tirent ; tokens à portée limitée.",
          "Images de base minimales, multi-stage builds, `.dockerignore` soigné.",
          "Registre proche des consommateurs (même région/cloud) pour des pulls rapides.",
        ],
      },
    ],
  },
  {
    id: "projets-realistes",
    title: "Projets réalistes : 3 niveaux",
    level: 3,
    intro:
      "Trois projets progressifs pour maîtriser les registres.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Publier une image versionnée",
        fields: [
          {
            label: "Objectif",
            value:
              "Conteneuriser une application, la pousser vers GHCR avec tags semver + SHA, documenter le cycle build → tag → push → pull.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Dockerfile multi-stage, `docker tag`/`push`/`pull`, convention semver, token d'accès GHCR.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Le cycle de vie complet d'une image et pourquoi le tag est un contrat.",
          },
          {
            label: "Difficulté",
            value: "Débutant — un week-end.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — Pipeline sécurisé avec scan et signature",
        fields: [
          {
            label: "Objectif",
            value:
              "Pipeline CI : build multi-arch, scan Trivy bloquant, push vers un registre privé, signature Cosign, SBOM attaché.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "GitHub Actions (build-push-action), Trivy, Cosign, buildx multi-arch, permissions minimales.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "La chaîne d'approvisionnement : chaque image qui atteint le registre est scannée, signée et traçable.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — deux semaines.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Stratégie de registre d'équipe",
        fields: [
          {
            label: "Objectif",
            value:
              "Définir et implémenter la politique registre d'une équipe : choix du registre, conventions de nommage et de tags, rétention, permissions CI, miroir pull-through, documentation.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Comparaison des registres (cloud vs auto-hébergé), IaC pour les dépôts, politiques de cycle de vie, audit des accès.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Le registre comme infrastructure d'équipe : gouvernance, coûts et sécurité à l'échelle.",
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
          "Docker Hub — https://docs.docker.com/docker-hub/",
          "GitHub Container Registry — https://docs.github.com/fr/packages/working-with-a-github-packages-registry/working-with-the-container-registry",
          "Amazon ECR — https://docs.aws.amazon.com/ecr/",
          "Azure Container Registry — https://learn.microsoft.com/azure/container-registry/",
          "Artifact Registry (GCP) — https://cloud.google.com/artifact-registry/docs",
          "Spécification OCI (image et distribution) — https://opencontainers.org/",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Les registres maîtrisés : les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "fields",
        title: "Les prochaines étapes",
        fields: [
          {
            label: "Docker (`docker`) en profondeur",
            value:
              "Multi-stage builds avancés, BuildKit, optimisation des couches : des images plus légères se poussent et se déploient plus vite.",
          },
          {
            label: "Kubernetes (`kubernetes`)",
            value:
              "Le consommateur principal des registres : imagePullSecrets, digest épinglés, politiques d'admission exigeant des images signées.",
          },
          {
            label: "CI/CD (`cicd`, `github-actions`, `gitlab-ci`)",
            value:
              "Automatiser build → scan → push → déploiement : le registre est le pivot entre la CI et le déploiement.",
          },
          {
            label: "Sécurité (`cybersecurity`)",
            value:
              "Supply chain security : signatures, SBOM, politiques d'admission — le prolongement naturel du scan d'images.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le signe que vous maîtrisez les registres : chaque image en production est versionnée, scannée, signée, et vous savez exactement quel commit elle contient.",
      },
    ],
  },
  {
    id: "promotion-images",
    title: "Promouvoir les images entre environnements",
    level: 3,
    intro:
      "La règle d'or : on ne rebuild pas entre staging et prod, on promeut le même digest.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le workflow : build une fois → tag `app:abc1234` → testé en staging → promu en prod par copie du digest (même image, nouveau tag).",
          "Pourquoi : un rebuild peut produire une image différente (dépendances résolues à nouveau) — la promotion garantit que la prod exécute exactement ce qui a été testé.",
          "En pratique : `docker tag` + `docker push` du même digest vers le dépôt de prod, ou copie entre registres (ECR, Harbor replication).",
          "Les tags mutables (`staging`, `prod`) pointent vers des digests immuables : l'historique de ce qui a tourné où reste traçable.",
          "Automatisez dans le pipeline : la promotion est une étape du déploiement, pas une action manuelle.",
        ],
      },
    ],
  },
  {
    id: "attestations-slsa",
    title: "Attestations et SLSA",
    level: 3,
    intro:
      "Prouver d'où vient une image : les attestations signées, au-delà du simple scan.",
    blocks: [
      {
        kind: "list",
        items: [
          "Une attestation est une déclaration signée (« cette image a été construite par ce pipeline, depuis ce commit, avec ces sources ») : vérifiable par quiconque.",
          "SLSA (Supply-chain Levels for Software Artifacts) : le framework qui définit les niveaux de garantie — du build scripté au build hermétique vérifiable.",
          "`cosign attest` génère des attestations (provenance SLSA, SBOM) liées au digest de l'image.",
          "Les politiques d'admission (Kyverno, admission controllers) peuvent exiger des attestations valides avant de déployer : rien de non prouvé n'atteint la prod.",
          "Complémentaire au scan : le scan dit « pas de vulnérabilité connue », l'attestation dit « construite par un pipeline de confiance ».",
        ],
      },
    ],
  },
  {
    id: "images-de-base",
    title: "Choisir ses images de base",
    level: 3,
    intro:
      "La sécurité d'une image commence par sa base : petites, minimales, maintenues.",
    blocks: [
      {
        kind: "fields",
        title: "Les options",
        fields: [
          {
            label: "Images minimales",
            value:
              "Alpine, Debian slim : moins de paquets = moins de surface d'attaque et de vulnérabilités à patcher. Le choix par défaut raisonnable.",
          },
          {
            label: "Distroless",
            value:
              "Images sans shell ni gestionnaire de paquets : juste le runtime et l'application. Idéal pour les binaires compilés (Go, Rust) et les runtimes JVM/Node.",
          },
          {
            label: "Builds multi-étapes",
            value:
              "Compiler dans une image complète, copier uniquement l'artefact dans l'image finale : le SDK ne voyage jamais en production.",
          },
          {
            label: "Images officielles",
            value:
              "Préférez les images officielles des éditeurs (Docker Official Images) : maintenues, scannées, avec politique de mise à jour claire.",
          },
        ],
      },
      {
        kind: "text",
        text: "Épinglez la base par digest en production : une base `latest` qui change sous vos pieds invalide vos tests de sécurité.",
      },
    ],
  },
  {
    id: "miroir-pull-through",
    title: "Miroirs et caches pull-through",
    level: 3,
    intro:
      "Accélérer les pulls et survivre aux rate limits : le registre comme cache.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un cache pull-through met en cache les images d'un registre distant (ex. Docker Hub) : le premier pull le remplit, les suivants sont locaux et rapides.",
          "Bénéfice double : vitesse (réseau local) et contournement des rate limits (un seul pull distant pour N consommateurs).",
          "ECR propose des règles de pull-through cache ; Harbor un mode proxy cache ; Artifactory des dépôts distants.",
          "Configurez vos runtimes (containerd, Docker) pour utiliser le miroir en priorité, avec fallback vers le registre d'origine.",
          "Attention à la fraîcheur : un tag mutable en cache peut être périmé — purgez ou utilisez des digests pour le critique.",
        ],
      },
    ],
  },
  {
    id: "webhooks-registre",
    title: "Webhooks : réagir aux pushes",
    level: 3,
    intro:
      "Un push d'image peut déclencher des actions : notifications, scans, déploiements.",
    blocks: [
      {
        kind: "list",
        items: [
          "La plupart des registres émettent des événements (push, suppression, scan terminé) via webhooks ou bus d'événements (ECR → EventBridge).",
          "Usages : notifier l'équipe (Slack/Teams), déclencher un pipeline de déploiement, lancer un scan approfondi, mettre à jour un catalogue.",
          "Sécurisez la réception : secret partagé / signature du payload, HTTPS uniquement, validation de la source.",
          "Alternative sans webhook : le pipeline qui pousse l'image déclenche lui-même la suite — plus simple quand un seul pipeline est concerné.",
        ],
      },
    ],
  },
  {
    id: "acces-partenaires",
    title: "Partager l'accès : tokens à portée limitée",
    level: 3,
    intro:
      "Donner accès à un registre sans partager de compte : les credentials à portée limitée.",
    blocks: [
      {
        kind: "list",
        items: [
          "Principe : jamais de compte partagé — des tokens à portée limitée (lecture seule sur tel dépôt, expiration courte).",
          "Docker Hub : access tokens personnels avec permissions limitées ; GHCR : fine-grained PAT restreints à certains dépôts.",
          "ECR : politiques IAM précises par dépôt (`ecr:BatchGetImage` sans `ecr:PutImage`) ; rôles cross-account pour les partenaires AWS.",
          "Rotation : des tokens à courte durée de vie valent mieux qu'un token « temporaire » qui dure trois ans.",
          "Pour les consommateurs externes (clients, CI de partenaires), documentez la procédure d'accès : URL, authentification, politique de rétention.",
        ],
      },
    ],
  },
];

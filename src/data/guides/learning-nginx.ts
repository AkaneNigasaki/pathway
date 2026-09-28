import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Nginx : du premier serveur web au reverse proxy
 * de production. 3 niveaux d'information (Aperçu / Pratique / Approfondi)
 * avec divulgation progressive. Tous les textes supportent le code inline
 * entre backticks.
 */
export const LEARNING_NGINX: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Nginx, où il se place dans une architecture web et pourquoi il est partout.",
    blocks: [
      {
        kind: "text",
        text: "Nginx est un serveur web open source à haute performance. Concrètement, c'est le programme qui reçoit les requêtes HTTP arrivant sur un serveur et décide quoi en faire : servir directement un fichier (une page, une image), transmettre la requête à une application (un backend Node.js, Python, PHP), ou la rediriger ailleurs. Il chiffre le trafic en TLS (HTTPS), répartit la charge entre plusieurs serveurs et met en cache les réponses fréquentes.",
      },
      {
        kind: "text",
        text: "Pourquoi Nginx est partout : il est léger, stable, et conçu dès le départ pour gérer des dizaines de milliers de connexions simultanées avec peu de ressources. Devant une immense partie des sites web, il y a un Nginx — comme serveur web direct, ou comme reverse proxy devant l'application réelle. Savoir l'utiliser, c'est savoir exposer correctement une application sur internet.",
      },
      {
        kind: "diagram",
        title: "La place de Nginx",
        lines: [
          "Navigateurs / clients",
          "        │  (HTTPS)",
          "        ▼",
          "      Nginx",
          "   ┌────┼────┐",
          "   ▼    ▼    ▼",
          "Fichiers   App 1   App 2",
          "statiques  (API)   (site)",
        ],
      },
    ],
  },
  {
    id: "serveur-et-reverse-proxy",
    title: "Serveur web et reverse proxy",
    level: 1,
    intro:
      "Les deux casquettes de Nginx : servir du contenu, ou faire l'intermédiaire.",
    blocks: [
      {
        kind: "text",
        text: "En mode serveur web, Nginx répond lui-même : il lit un fichier sur le disque (HTML, CSS, image) et le renvoie au client. C'est extrêmement rapide pour le contenu statique, et ça ne demande aucune application derrière.",
      },
      {
        kind: "text",
        text: "En mode reverse proxy, Nginx ne répond pas lui-même : il reçoit la requête du client, la transmet à une application interne (par exemple un serveur Node.js sur `localhost:3000`), récupère sa réponse et la renvoie au client. Le client ne voit jamais l'application : une seule porte d'entrée, un seul certificat TLS à gérer, un seul point de contrôle pour la sécurité et les logs.",
      },
      {
        kind: "list",
        items: [
          "Serveur web : Nginx lit des fichiers sur disque et les sert directement.",
          "Reverse proxy : Nginx transmet les requêtes à des applications internes et renvoie leurs réponses.",
          "Dans les deux cas, c'est lui qui gère le HTTPS, la compression et le cache.",
          "Une application typique en production : Nginx en frontal + une ou plusieurs applications derrière.",
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
      "Ce qu'il faut maîtriser avant d'administrer Nginx, et pourquoi chaque point compte.",
    blocks: [
      {
        kind: "fields",
        title: "Les fondations nécessaires",
        fields: [
          {
            label: "HTTP",
            value:
              "Comprendre les requêtes, les réponses, les en-têtes et les codes de statut (200, 301, 404, 502). Toute la configuration Nginx consiste à décider quoi faire de ces requêtes.",
          },
          {
            label: "Linux",
            value:
              "Éditer des fichiers de configuration, gérer les permissions, comprendre les services système (`systemctl`). Nginx s'administre en ligne de commande sur un serveur Linux.",
          },
          {
            label: "Terminal",
            value:
              "Naviguer dans l'arborescence, lire des logs avec `tail`, tester des requêtes avec `curl`. Le diagnostic Nginx passe par ces outils.",
          },
        ],
      },
      {
        kind: "text",
        text: "Chaque prérequis est cliquable dans la roadmap. Si la notion de reverse proxy est floue, commencez par HTTP : Nginx n'est qu'une application très performante de ces concepts.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Installer Nginx sur un serveur ou en local, et vérifier que tout fonctionne.",
    blocks: [
      {
        kind: "command",
        label: "Installer Nginx sur Debian / Ubuntu",
        command: "sudo apt update && sudo apt install nginx -y",
        why: "Installe Nginx depuis les dépôts officiels de la distribution : la version est testée avec le système et les mises à jour de sécurité arrivent automatiquement avec `apt upgrade`. Sur Debian/Ubuntu, le service démarre tout seul après l'installation.",
        verify: "nginx -v",
      },
      {
        kind: "command",
        label: "Installer Nginx sur macOS (développement local)",
        command: "brew install nginx",
        why: "Homebrew installe Nginx pour tester la configuration en local avant de la déployer sur un serveur. Le fichier de configuration se trouve alors dans le répertoire Homebrew, pas dans `/etc/nginx`.",
        verify: "nginx -v",
      },
      {
        kind: "command",
        label: "Lancer Nginx avec Docker (alternative)",
        command: "docker run -d -p 8080:80 --name nginx-test nginx",
        why: "L'image officielle `nginx` permet de tester sans rien installer sur la machine : le conteneur écoute sur le port 8080 de l'hôte et sert la page d'accueil par défaut. Pratique pour expérimenter la configuration en montant un volume.",
        verify: "curl -s -o /dev/null -w \"%{http_code}\" http://localhost:8080",
      },
      {
        kind: "text",
        text: "`nginx -v` affiche la version installée. Si la commande est introuvable après installation via `apt`, vérifiez que le paquet est bien installé avec `dpkg -l | grep nginx` : sur certaines images minimales, seul un paquet partiel est présent.",
      },
    ],
  },
  {
    id: "premier-demarrage",
    title: "Premier démarrage",
    level: 2,
    intro:
      "Démarrer Nginx, voir la page d'accueil par défaut et comprendre l'état du service.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier l'état du service",
        command: "sudo systemctl status nginx",
        why: "Affiche si Nginx tourne, depuis quand, et les dernières lignes de log du service. C'est le premier réflexe quand quelque chose ne répond pas : un service arrêté ou en échec s'y voit immédiatement.",
        verify: "curl -s -o /dev/null -w \"%{http_code}\" http://localhost",
      },
      {
        kind: "command",
        label: "Tester la configuration avant de recharger",
        command: "sudo nginx -t",
        why: "Vérifie la syntaxe de toute la configuration et affiche le fichier testé. À exécuter systématiquement avant chaque rechargement : une erreur de syntaxe empêcherait Nginx de redémarrer proprement.",
        verify: "echo $?",
      },
      {
        kind: "text",
        text: "Après une installation fraîche, `http://localhost` affiche la page « Welcome to nginx! ». Si elle ne s'affiche pas, vérifiez le pare-feu (`sudo ufw status`) : le port 80 doit être ouvert pour les connexions entrantes.",
      },
    ],
  },
  {
    id: "structure-configuration",
    title: "Structure de la configuration",
    level: 2,
    intro:
      "Où se trouvent les fichiers de configuration et comment ils s'organisent.",
    blocks: [
      {
        kind: "diagram",
        title: "Arborescence typique (Debian / Ubuntu)",
        lines: [
          "/etc/nginx/",
          "├── nginx.conf               (fichier principal)",
          "├── sites-available/         (déclarations de sites)",
          "│   └── default",
          "├── sites-enabled/           (liens symboliques actifs)",
          "│   └── default -> ../sites-available/default",
          "├── conf.d/                  (fragments inclus)",
          "└── snippets/                (blocs réutilisables)",
        ],
      },
      {
        kind: "text",
        text: "Le fichier principal `nginx.conf` contient les réglages globaux et inclut les autres répertoires via des directives `include`. Sur Debian/Ubuntu, la convention est de déclarer chaque site dans `sites-available/` puis d'activer un lien symbolique dans `sites-enabled/` : on voit d'un coup d'œil quels sites sont actifs, et on peut désactiver un site en supprimant le lien sans perdre sa configuration.",
      },
      {
        kind: "command",
        label: "Afficher la configuration complète effective",
        command: "sudo nginx -T",
        why: "Affiche la configuration entière telle que Nginx la voit, avec tous les `include` résolus et le nom de chaque fichier. Indispensable pour vérifier qu'un fichier est bien pris en compte — la cause la plus fréquente d'une « configuration qui ne s'applique pas » est un fichier non inclus.",
      },
    ],
  },
  {
    id: "premier-site-statique",
    title: "Premier site statique",
    level: 2,
    intro:
      "Servir un site HTML simple avec Nginx : le bloc `server` minimal.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le dossier et une page",
            detail:
              "Créez `/var/www/monsite/` puis un fichier `index.html` dedans. Nginx doit pouvoir lire ces fichiers : vérifiez les permissions du dossier.",
          },
          {
            title: "Déclarer le site",
            detail:
              "Créez `/etc/nginx/sites-available/monsite` avec un bloc `server` : `listen 80`, `server_name monsite.local`, et `root /var/www/monsite`. Le `root` indique où Nginx cherche les fichiers.",
          },
          {
            title: "Activer le site",
            detail:
              "Créez le lien symbolique : `sudo ln -s /etc/nginx/sites-available/monsite /etc/nginx/sites-enabled/` puis testez avec `sudo nginx -t`.",
          },
          {
            title: "Recharger et vérifier",
            detail:
              "Rechargez avec `sudo nginx -s reload` (ou `sudo systemctl reload nginx`), puis ouvrez `http://monsite.local` après avoir ajouté `127.0.0.1 monsite.local` dans `/etc/hosts`.",
          },
        ],
      },
      {
        kind: "code",
        language: "nginx",
        title: "Bloc server minimal",
        code: "server {\n    listen 80;\n    server_name monsite.local;\n    root /var/www/monsite;\n    index index.html;\n\n    location / {\n        try_files $uri $uri/ =404;\n    }\n}",
      },
      {
        kind: "text",
        text: "`try_files $uri $uri/ =404` dit à Nginx : cherche le fichier demandé, sinon le dossier avec son index, sinon réponds 404. C'est la base du service de fichiers statiques — la section Approfondi détaille son fonctionnement.",
      },
    ],
  },
  {
    id: "reverse-proxy-basique",
    title: "Reverse proxy basique",
    level: 2,
    intro:
      "Placer Nginx devant une application : la configuration la plus courante en production.",
    blocks: [
      {
        kind: "code",
        language: "nginx",
        title: "Proxy vers une application locale",
        code: "server {\n    listen 80;\n    server_name app.example.com;\n\n    location / {\n        proxy_pass http://localhost:3000;\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n        proxy_set_header X-Forwarded-Proto $scheme;\n    }\n}",
      },
      {
        kind: "text",
        text: "`proxy_pass` transmet la requête à l'application (ici sur le port 3000). Les quatre en-têtes `proxy_set_header` sont essentiels : sans eux, l'application ne connaît ni le vrai nom d'hôte demandé, ni l'adresse IP réelle du client, ni le protocole d'origine (HTTP ou HTTPS). Sans `X-Forwarded-Proto`, une application derrière un proxy HTTPS croit recevoir du HTTP et génère de mauvaises URLs.",
      },
      {
        kind: "command",
        label: "Vérifier que le proxy transmet bien",
        command: "curl -s -D - -o /dev/null http://app.example.com/",
        why: "Affiche les en-têtes de la réponse : on vérifie le code de statut et que les en-têtes arrivent bien. Si l'application locale ne tourne pas, Nginx répond `502 Bad Gateway` — le signe classique d'un backend injoignable.",
      },
    ],
  },
  {
    id: "https-lets-encrypt",
    title: "HTTPS avec Let's Encrypt",
    level: 2,
    intro:
      "Obtenir un certificat TLS gratuit et le brancher sur Nginx en quelques minutes.",
    blocks: [
      {
        kind: "command",
        label: "Installer Certbot et obtenir un certificat",
        command: "sudo apt install certbot python3-certbot-nginx -y",
        why: "Certbot est le client officiel de Let's Encrypt, l'autorité qui délivre des certificats TLS gratuits. Le plugin `python3-certbot-nginx` sait modifier la configuration Nginx tout seul : il demande le certificat, l'installe et configure la redirection HTTP vers HTTPS.",
        verify: "sudo certbot certificates",
      },
      {
        kind: "command",
        label: "Délivrer et installer le certificat",
        command: "sudo certbot --nginx -d app.example.com",
        why: "Vérifie que vous contrôlez le domaine (via un fichier de challenge servi par Nginx), obtient le certificat et met à jour le bloc `server` : ajout du `listen 443 ssl`, des chemins de certificats, et d'une redirection du port 80 vers le 443. Le renouvellement automatique est configuré par un timer systemd.",
        verify: "curl -s -o /dev/null -w \"%{http_code}\" https://app.example.com",
      },
      {
        kind: "text",
        text: "Les certificats Let's Encrypt durent 90 jours : le renouvellement est automatique, mais vérifiez-le avec `sudo certbot renew --dry-run`. En production, surveillez aussi l'expiration via votre supervision — un certificat expiré, c'est un site inaccessible avec un avertissement effrayant pour les visiteurs.",
      },
    ],
  },
  {
    id: "gestion-du-service",
    title: "Gestion du service",
    level: 2,
    intro:
      "Démarrer, arrêter, recharger Nginx proprement au quotidien.",
    blocks: [
      {
        kind: "command",
        label: "Recharger la configuration sans coupure",
        command: "sudo nginx -s reload",
        why: "Envoie un signal au processus maître, qui relit la configuration et démarre de nouveaux workers : les connexions en cours se terminent sur les anciens workers, les nouvelles utilisent la nouvelle configuration. Zéro interruption de service — la méthode normale pour appliquer un changement.",
        verify: "sudo nginx -t && echo \"config OK\"",
      },
      {
        kind: "command",
        label: "Redémarrer via systemd",
        command: "sudo systemctl reload nginx",
        why: "L'équivalent géré par systemd du rechargement : propre, journalisé, et c'est ce que les scripts d'automatisation utilisent. `restart` (arrêt complet puis démarrage) n'est nécessaire qu'en cas de problème grave — il coupe les connexions en cours.",
        verify: "sudo systemctl is-active nginx",
      },
      {
        kind: "fields",
        title: "Les commandes du quotidien",
        fields: [
          { label: "`sudo nginx -t`", value: "Tester la syntaxe de la configuration avant tout rechargement." },
          { label: "`sudo nginx -s reload`", value: "Appliquer une nouvelle configuration sans coupure." },
          { label: "`sudo systemctl status nginx`", value: "Voir l'état du service et ses derniers logs." },
          { label: "`sudo systemctl enable nginx`", value: "Démarrer Nginx automatiquement au boot du serveur." },
          { label: "`sudo nginx -s stop` / `quit`", value: "Arrêt brutal / arrêt gracieux (fin des connexions en cours)." },
        ],
      },
    ],
  },
  {
    id: "logs-premiers-pas",
    title: "Lire les logs",
    level: 2,
    intro:
      "Les deux fichiers de log qui répondent à 90 % des questions de diagnostic.",
    blocks: [
      {
        kind: "command",
        label: "Suivre les accès en temps réel",
        command: "sudo tail -f /var/log/nginx/access.log",
        why: "Affiche chaque requête reçue au fur et à mesure : adresse IP, date, méthode, URL, code de statut, taille de la réponse. Quand un utilisateur signale un problème, c'est ici qu'on vérifie ce que Nginx a réellement reçu et répondu.",
      },
      {
        kind: "command",
        label: "Consulter les erreurs",
        command: "sudo tail -n 50 /var/log/nginx/error.log",
        why: "Journalise les problèmes internes : fichier introuvable, permission refusée, backend injoignable, erreur de configuration au démarrage. Devant une page d'erreur Nginx, ce fichier contient presque toujours la cause exacte.",
      },
      {
        kind: "text",
        text: "Réflexe de diagnostic : reproduisez le problème, regardez `error.log` en même temps, et corrélez avec la ligne correspondante dans `access.log` (même horodatage). La section Approfondi explique comment personnaliser le format de ces logs.",
      },
    ],
  },
  {
    id: "tester-avec-curl",
    title: "Tester avec curl",
    level: 2,
    intro:
      "Vérifier le comportement de Nginx en ligne de commande, sans navigateur.",
    blocks: [
      {
        kind: "command",
        label: "Voir les en-têtes de réponse",
        command: "curl -I http://localhost/",
        why: "`-I` n'envoie qu'une requête HEAD et affiche les en-têtes : code de statut, `Server`, `Content-Type`, `Cache-Control`. Le moyen le plus rapide de vérifier qu'une redirection, un header de sécurité ou un cache se comporte comme prévu.",
      },
      {
        kind: "command",
        label: "Suivre les redirections en mode verbeux",
        command: "curl -vL http://monsite.local/ 2>&1 | head -40",
        why: "`-v` affiche la requête envoyée et les en-têtes reçus, `-L` suit les redirections : on voit toute la chaîne (HTTP → HTTPS, `www` → racine). Indispensable pour déboguer des boucles de redirection.",
        verify: "curl -s -o /dev/null -w \"%{http_code} %{redirect_url}\" http://monsite.local/",
      },
      {
        kind: "text",
        text: "Pour tester un `server_name` avant que le DNS soit configuré, utilisez `curl -H \"Host: app.example.com\" http://IP_DU_SERVEUR/` : Nginx routera la requête comme si le nom de domaine existait déjà.",
      },
    ],
  },
  {
    id: "editeurs",
    title: "Éditeurs",
    level: 2,
    intro:
      "Éditer la configuration Nginx confortablement, en local ou sur le serveur.",
    blocks: [
      {
        kind: "fields",
        title: "Les options",
        fields: [
          {
            label: "VS Code + Remote - SSH",
            value: "L'extension officielle « Remote - SSH » (Microsoft) ouvre un dossier du serveur directement dans VS Code : coloration syntaxique Nginx, édition et terminal intégrés, sans copier de fichiers.",
          },
          {
            label: "Édition directe en SSH",
            value: "`nano` ou `vim` sur le serveur pour les petites modifications. Toujours suivie de `sudo nginx -t` avant le rechargement.",
          },
          {
            label: "Gestion de configuration",
            value: "En équipe, la configuration vit dans Git et est déployée par Ansible ou un script : traçabilité des changements et retour en arrière possible.",
          },
        ],
      },
      {
        kind: "text",
        text: "Quel que soit l'éditeur, la règle d'or ne change pas : modifier, tester (`nginx -t`), puis recharger. Jamais de rechargement sans test.",
      },
    ],
  },
  {
    id: "workflow-professionnel",
    title: "Workflow professionnel",
    level: 2,
    intro:
      "La boucle de travail sûre pour modifier Nginx en production.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Tester en local ou en staging",
            detail:
              "Validez la nouvelle configuration sur un environnement de test (Docker en local, serveur de staging) avant de toucher à la production.",
          },
          {
            title: "Versionner le changement",
            detail:
              "Commitez la configuration dans Git avec un message clair. En cas de problème, le retour en arrière est immédiat.",
          },
          {
            title: "Déployer puis tester la syntaxe",
            detail:
              "Copiez les fichiers sur le serveur et exécutez `sudo nginx -t`. Ne passez à l'étape suivante que si le test réussit.",
          },
          {
            title: "Recharger sans coupure",
            detail:
              "`sudo nginx -s reload` applique la configuration. Les connexions existantes ne sont pas interrompues.",
          },
          {
            title: "Vérifier en conditions réelles",
            detail:
              "Testez avec `curl` les URLs critiques, surveillez `error.log` pendant quelques minutes, et vérifiez vos sondes de supervision.",
          },
        ],
      },
    ],
  },
  {
    id: "premier-projet",
    title: "Projet : site statique en HTTPS",
    level: 2,
    intro:
      "Mettre en ligne un petit site statique, du fichier HTML au HTTPS fonctionnel.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Préparer le contenu",
            detail:
              "Créez `/var/www/monsite/` avec un `index.html` et une feuille de style. Vérifiez que l'utilisateur `www-data` peut lire les fichiers.",
          },
          {
            title: "Déclarer le server",
            detail:
              "Écrivez le bloc `server` avec `server_name`, `root` et `try_files`, activez-le via `sites-enabled`, testez avec `nginx -t`.",
          },
          {
            title: "Recharger et tester",
            detail:
              "`sudo nginx -s reload`, puis `curl -I http://votre-domaine/` doit répondre 200 avec le bon `Content-Type`.",
          },
          {
            title: "Ajouter le HTTPS",
            detail:
              "`sudo certbot --nginx -d votre-domaine` : le certificat est installé et la redirection HTTP → HTTPS configurée automatiquement.",
          },
          {
            title: "Durcir un minimum",
            detail:
              "Ajoutez `server_tokens off;` dans le bloc `http` pour masquer la version de Nginx, rechargez, et vérifiez que l'en-tête `Server` ne fuit plus d'information.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "architecture-evenementielle",
    title: "Architecture événementielle",
    level: 3,
    intro:
      "Pourquoi Nginx tient des dizaines de milliers de connexions avec si peu de ressources.",
    blocks: [
      {
        kind: "text",
        text: "Nginx utilise un modèle événementiel asynchrone : un petit nombre de processus workers gère chacun des milliers de connexions via une boucle d'événements, sans créer un thread par connexion. Quand une connexion attend des données, le worker passe à une autre au lieu de rester bloqué. C'est l'inverse du modèle « un thread par connexion » des serveurs classiques, et c'est ce qui rend Nginx si économe en mémoire sous forte charge.",
      },
      {
        kind: "diagram",
        title: "Processus Nginx",
        lines: [
          "master (1 processus)",
          "   │  lit la config, gère les workers",
          "   ├── worker 1 ──► milliers de connexions",
          "   ├── worker 2 ──► milliers de connexions",
          "   └── cache manager / loader (si cache activé)",
        ],
      },
      {
        kind: "text",
        text: "Le processus master ne traite aucune requête : il lit la configuration, ouvre les ports et supervise les workers. Chaque worker est indépendant — si l'un plante, les autres continuent. Au rechargement (`nginx -s reload`), le master démarre de nouveaux workers avec la nouvelle configuration et demande aux anciens de finir leurs connexions avant de s'arrêter : d'où l'absence de coupure.",
      },
    ],
  },
  {
    id: "contexte-et-directives",
    title: "Contextes et directives",
    level: 3,
    intro:
      "La grammaire de la configuration : où chaque directive a le droit d'apparaître.",
    blocks: [
      {
        kind: "diagram",
        title: "Hiérarchie des contextes",
        lines: [
          "main (nginx.conf)",
          " └── events { }        (connexions : worker_connections)",
          " └── http { }          (tout le trafic HTTP)",
          "      ├── server { }    (un site / un nom de domaine)",
          "      │    └── location { }  (un préfixe d'URL)",
          "      └── upstream { }  (groupe de backends)",
        ],
      },
      {
        kind: "text",
        text: "Chaque directive n'est valide que dans certains contextes : `worker_connections` va dans `events`, `proxy_pass` dans `location`, `server_name` dans `server`. Mettre une directive au mauvais endroit est une erreur de syntaxe détectée par `nginx -t`. L'héritage suit la hiérarchie : une directive définie dans `http` s'applique à tous les `server`, sauf si un `server` ou un `location` la redéfinit.",
      },
      {
        kind: "list",
        items: [
          "`main` : réglages globaux (`user`, `worker_processes`, `error_log`, `pid`).",
          "`events` : modèle de connexions (`worker_connections`, méthode d'événements).",
          "`http` : tout le trafic web — le contexte le plus fourni.",
          "`server` : un hôte virtuel, sélectionné par le port et `server_name`.",
          "`location` : un préfixe ou motif d'URL à l'intérieur d'un `server`.",
          "`upstream` : un groupe nommé de serveurs backend pour le load balancing.",
        ],
      },
    ],
  },
  {
    id: "bloc-server",
    title: "Le bloc server",
    level: 3,
    intro:
      "Comment Nginx choisit quel `server` répond à une requête.",
    blocks: [
      {
        kind: "text",
        text: "Quand plusieurs blocs `server` écoutent sur le même port, Nginx choisit d'abord par l'en-tête `Host` : il compare avec chaque `server_name`. `server_name` accepte des noms exacts (`app.example.com`), des jokers en préfixe (`*.example.com`) et des expressions régulières (`~^api\\.`). Si aucun nom ne correspond, c'est le serveur marqué `default_server` sur ce port qui répond — sinon le premier déclaré.",
      },
      {
        kind: "code",
        language: "nginx",
        title: "Sélection du server",
        code: "server {\n    listen 80 default_server;\n    server_name _;\n    return 444;  # refuse les requêtes sans Host connu\n}\n\nserver {\n    listen 80;\n    server_name app.example.com www.app.example.com;\n    # ...\n}",
      },
      {
        kind: "text",
        text: "Le bloc `default_server` qui répond `444` (fermeture silencieuse de la connexion, spécifique à Nginx) est une bonne pratique : il empêche que des requêtes adressées directement à l'IP du serveur tombent sur votre premier site par accident.",
      },
    ],
  },
  {
    id: "bloc-location",
    title: "Le bloc location",
    level: 3,
    intro:
      "Comment Nginx choisit quel `location` traite une URL : les règles de priorité.",
    blocks: [
      {
        kind: "text",
        text: "À l'intérieur d'un `server`, le `location` gagnant se décide en deux temps : d'abord les préfixes exacts et prioritaires, puis les expressions régulières dans l'ordre de déclaration, puis le préfixe le plus long. L'ordre de priorité réel : `=` (correspondance exacte) d'abord, puis les préfixes marqués `^~` (qui court-circuitent les regex), puis les regex `~` et `~*` dans l'ordre d'écriture, puis le préfixe standard le plus long.",
      },
      {
        kind: "code",
        language: "nginx",
        title: "Priorités de location",
        code: "location = /exact { }        # 1. correspondance exacte\nlocation ^~ /static/ { }     # 2. préfixe prioritaire (ignore les regex)\nlocation ~ \\.php$ { }        # 3. regex, dans l'ordre de déclaration\nlocation ~* \\.(jpg|png)$ { } # 3b. regex insensible à la casse\nlocation / { }                # 4. préfixe le plus long en dernier recours",
      },
      {
        kind: "text",
        text: "Erreur classique : déclarer une regex `~ \\.php$` après un préfixe `^~ /` qui la court-circuite, puis s'étonner qu'elle ne s'applique jamais. En cas de doute, `nginx -T` et des tests `curl` ciblés tranchent vite.",
      },
    ],
  },
  {
    id: "proxy-pass-et-le-slash",
    title: "proxy_pass et le slash final",
    level: 3,
    intro:
      "Le détail le plus piégeux du reverse proxy : la présence ou non d'un `/` change l'URL transmise.",
    blocks: [
      {
        kind: "text",
        text: "Avec `proxy_pass http://backend;` (sans URI), Nginx transmet l'URI demandé tel quel : `/api/users` arrive comme `/api/users` au backend. Avec `proxy_pass http://backend/;` (avec un `/`), la partie du `location` est remplacée : dans `location /api/`, la requête `/api/users` devient `/users` côté backend. Un slash oublié ou ajouté par erreur, et toutes les routes du backend sont décalées.",
      },
      {
        kind: "table",
        headers: ["Configuration", "Requête client", "URL reçue par le backend"],
        rows: [
          ["`location /api/` + `proxy_pass http://b;`", "`/api/users`", "`/api/users` (inchangé)"],
          ["`location /api/` + `proxy_pass http://b/;`", "`/api/users`", "`/users` (`/api/` remplacé)"],
          ["`location /api/` + `proxy_pass http://b/v1/;`", "`/api/users`", "`/v1/users` (préfixe réécrit)"],
        ],
      },
      {
        kind: "text",
        text: "Règle pratique : si le backend s'attend à recevoir les mêmes chemins que le client demande, n'ajoutez pas de slash. Si vous voulez « monter » l'application sous un sous-chemin différent, utilisez la forme avec URI.",
      },
    ],
  },
  {
    id: "reverse-proxy-avance",
    title: "Reverse proxy avancé",
    level: 3,
    intro:
      "Les réglages qui font la différence entre un proxy qui marche et un proxy fiable.",
    blocks: [
      {
        kind: "fields",
        title: "Directives clés du proxy",
        fields: [
          {
            label: "`proxy_set_header`",
            value: "Transmet au backend l'hôte d'origine, l'IP réelle du client et le protocole (`Host`, `X-Real-IP`, `X-Forwarded-For`, `X-Forwarded-Proto`). Sans eux, l'application voit l'adresse du proxy au lieu de celle du client.",
          },
          {
            label: "`proxy_connect_timeout` / `proxy_read_timeout`",
            value: "Temps maximum pour établir la connexion au backend, puis pour attendre sa réponse. Des valeurs trop hautes transforment un backend lent en file de connexions bloquées.",
          },
          {
            label: "`proxy_buffering`",
            value: "Activé par défaut : Nginx lit toute la réponse du backend avant de la servir au client, ce qui libère le backend plus vite. À désactiver pour le streaming (SSE, réponses temps réel).",
          },
          {
            label: "`client_max_body_size`",
            value: "Taille maximale du corps d'une requête (uploads). La valeur par défaut est de 1 Mo : tout upload plus lourd répond `413` tant qu'on ne l'augmente pas.",
          },
          {
            label: "`proxy_redirect`",
            value: "Réécrit les en-têtes `Location` renvoyés par le backend pour qu'ils pointent vers l'URL publique plutôt que vers l'adresse interne.",
          },
        ],
      },
    ],
  },
  {
    id: "upstream-et-load-balancing",
    title: "Upstream et load balancing",
    level: 3,
    intro:
      "Répartir la charge entre plusieurs instances d'une application.",
    blocks: [
      {
        kind: "code",
        language: "nginx",
        title: "Groupe de backends",
        code: "upstream app_backend {\n    least_conn;\n    server 10.0.0.11:3000 weight=3;\n    server 10.0.0.12:3000;\n    server 10.0.0.13:3000 backup;\n}\n\nserver {\n    location / {\n        proxy_pass http://app_backend;\n    }\n}",
      },
      {
        kind: "fields",
        title: "Stratégies de répartition",
        fields: [
          { label: "Round-robin (défaut)", value: "Les requêtes sont distribuées à tour de rôle. Simple et efficace quand les serveurs sont équivalents." },
          { label: "`least_conn`", value: "Envoie vers le serveur avec le moins de connexions actives. Mieux adapté quand les requêtes ont des durées variables." },
          { label: "`ip_hash`", value: "Le même client va toujours vers le même serveur (basé sur son IP). Utile pour les sessions stockées en mémoire côté backend." },
          { label: "`weight`", value: "Donne plus de trafic aux serveurs les plus puissants : `weight=3` reçoit trois fois plus de requêtes." },
          { label: "`backup`", value: "Serveur de secours : utilisé uniquement si tous les autres sont injoignables." },
        ],
      },
    ],
  },
  {
    id: "sante-des-backends",
    title: "Santé des backends",
    level: 3,
    intro:
      "Comment Nginx détecte un backend en panne et l'écarte du trafic.",
    blocks: [
      {
        kind: "text",
        text: "Nginx open source fait des vérifications de santé passives : il observe les échecs réels. Avec `max_fails=3 fail_timeout=30s` sur un serveur `upstream`, après 3 échecs en 30 secondes, Nginx considère le backend comme indisponible et cesse de lui envoyer du trafic pendant 30 secondes, avant de réessayer. Aucune sonde active n'est nécessaire — la détection se fait sur le trafic réel.",
      },
      {
        kind: "code",
        language: "nginx",
        title: "Seuils de panne",
        code: "upstream app_backend {\n    server 10.0.0.11:3000 max_fails=3 fail_timeout=30s;\n    server 10.0.0.12:3000 max_fails=3 fail_timeout=30s;\n}",
      },
      {
        kind: "text",
        text: "Limite à connaître : un backend qui répond lentement mais sans erreur n'est pas écarté — seuls les échecs de connexion et les timeouts comptent. Pour une vraie surveillance proactive (sondes HTTP périodiques), il faut des outils externes ou la version commerciale.",
      },
    ],
  },
  {
    id: "cache-proxy",
    title: "Cache du reverse proxy",
    level: 3,
    intro:
      "Servir les réponses fréquentes depuis Nginx sans déranger l'application.",
    blocks: [
      {
        kind: "code",
        language: "nginx",
        title: "Cache basique",
        code: "proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=app_cache:10m max_size=1g inactive=60m;\n\nserver {\n    location /api/ {\n        proxy_pass http://app_backend;\n        proxy_cache app_cache;\n        proxy_cache_valid 200 5m;\n        proxy_cache_valid 404 1m;\n        add_header X-Cache-Status $upstream_cache_status;\n    }\n}",
      },
      {
        kind: "text",
        text: "`proxy_cache_path` définit où et comment le cache est stocké (`keys_zone` pour l'index en mémoire, `max_size` et `inactive` pour le ménage). `proxy_cache_valid` règle la durée de vie par code de statut. L'en-tête `X-Cache-Status` (`HIT`, `MISS`, `EXPIRED`) est précieux en développement pour vérifier que le cache se comporte comme prévu — à retirer ou filtrer en production si vous ne voulez pas exposer ce détail.",
      },
      {
        kind: "list",
        items: [
          "Ne mettez en cache que les réponses sûres : GET, sans données utilisateur, avec `Cache-Control` cohérent côté backend.",
          "Attention aux réponses personnalisées (panier, profil) : un cache mal configuré sert les données d'un utilisateur à un autre.",
          "Pensez à l'invalidation : une durée de vie courte (quelques minutes) est souvent plus sûre qu'un mécanisme d'invalidation complexe.",
        ],
      },
    ],
  },
  {
    id: "compression-gzip",
    title: "Compression gzip",
    level: 3,
    intro:
      "Réduire la taille des réponses textuelles pour des pages plus rapides.",
    blocks: [
      {
        kind: "code",
        language: "nginx",
        title: "Activer gzip",
        code: "http {\n    gzip on;\n    gzip_types text/css application/javascript application/json image/svg+xml;\n    gzip_min_length 1024;\n    gzip_comp_level 6;\n    gzip_vary on;\n}",
      },
      {
        kind: "text",
        text: "La compression ne s'applique qu'aux contenus textuels (HTML, CSS, JS, JSON, SVG) : compresser des images déjà compressées (JPEG, PNG) ne fait que gaspiller du CPU. `gzip_vary on` ajoute l'en-tête `Vary: Accept-Encoding` pour que les caches intermédiaires distinguent les versions compressées et non compressées. Le niveau 6 est le compromis standard entre taux de compression et charge CPU.",
      },
    ],
  },
  {
    id: "tls-en-detail",
    title: "TLS en détail",
    level: 3,
    intro:
      "Configurer le HTTPS proprement : protocoles, redirections, renouvellement.",
    blocks: [
      {
        kind: "code",
        language: "nginx",
        title: "Bloc HTTPS et redirection",
        code: "server {\n    listen 80;\n    server_name app.example.com;\n    return 301 https://$host$request_uri;\n}\n\nserver {\n    listen 443 ssl;\n    server_name app.example.com;\n\n    ssl_certificate /etc/letsencrypt/live/app.example.com/fullchain.pem;\n    ssl_certificate_key /etc/letsencrypt/live/app.example.com/privkey.pem;\n    ssl_protocols TLSv1.2 TLSv1.3;\n}",
      },
      {
        kind: "text",
        text: "`ssl_protocols TLSv1.2 TLSv1.3` exclut les vieilles versions vulnérables (TLS 1.0/1.1). La redirection `return 301` avec `$host$request_uri` préserve le chemin demandé. Certbot écrit une configuration équivalente automatiquement — comprendre ces lignes permet de la relire et de la corriger à la main quand Certbot ne fait pas exactement ce qu'on veut.",
      },
      {
        kind: "command",
        label: "Vérifier le certificat présenté",
        command: "echo | openssl s_client -connect app.example.com:443 -servername app.example.com 2>/dev/null | openssl x509 -noout -dates -issuer",
        why: "Affiche les dates de validité et l'émetteur du certificat réellement servi. Permet de détecter un certificat expiré, un mauvais certificat (mauvais `server_name`), ou un renouvellement qui n'a pas été pris en compte (Nginx doit être rechargé après le renouvellement).",
      },
    ],
  },
  {
    id: "headers-de-securite",
    title: "En-têtes de sécurité",
    level: 3,
    intro:
      "Les en-têtes HTTP que Nginx doit ajouter pour durcir les réponses.",
    blocks: [
      {
        kind: "fields",
        title: "Les en-têtes essentiels",
        fields: [
          { label: "`server_tokens off;`", value: "Masque la version de Nginx dans l'en-tête `Server` et les pages d'erreur. Ne protège de rien en soi, mais ne donne pas d'information gratuite à un attaquant." },
          { label: "`Strict-Transport-Security`", value: "`add_header Strict-Transport-Security \"max-age=31536000; includeSubDomains\" always;` : impose le HTTPS au navigateur pendant un an, même si l'utilisateur tape `http://`." },
          { label: "`X-Content-Type-Options: nosniff`", value: "Empêche le navigateur de deviner le type d'un fichier : bloque une classe d'attaques où un fichier inoffensif est interprété comme du JavaScript." },
          { label: "`X-Frame-Options: DENY`", value: "Interdit d'embarquer vos pages dans une `iframe` : protège contre le clickjacking." },
          { label: "`Content-Security-Policy`", value: "Déclare quelles sources de scripts, styles et images sont autorisées. Le plus puissant — et le plus exigeant à régler sans casser le site." },
        ],
      },
      {
        kind: "text",
        text: "Le `always` dans `add_header ... always` est important : sans lui, Nginx n'ajoute pas l'en-tête sur les réponses d'erreur (404, 50x). Testez avec `curl -I` sur plusieurs URLs, y compris une page inexistante.",
      },
    ],
  },
  {
    id: "fichiers-statiques-et-try-files",
    title: "Fichiers statiques et try_files",
    level: 3,
    intro:
      "Servir efficacement les assets : `try_files`, `expires` et `sendfile`.",
    blocks: [
      {
        kind: "code",
        language: "nginx",
        title: "Assets avec cache navigateur",
        code: "location /static/ {\n    alias /var/www/app/static/;\n    expires 30d;\n    add_header Cache-Control \"public, immutable\";\n}\n\nlocation / {\n    try_files $uri $uri/ /index.html;\n}",
      },
      {
        kind: "text",
        text: "`try_files $uri $uri/ /index.html` est le pattern des applications monopages (SPA) : si le fichier demandé n'existe pas, Nginx sert `index.html` et laisse le routeur JavaScript décider. `expires 30d` + `immutable` dit au navigateur de garder les assets versionnés un mois sans les redemander. Notez `alias` vs `root` : avec `alias`, le chemin du `location` est remplacé (pas ajouté) — l'oubli du `/` final sur `alias` est une erreur classique qui produit des 404.",
      },
    ],
  },
  {
    id: "rewrite-et-redirections",
    title: "Rewrite et redirections",
    level: 3,
    intro:
      "Rediriger proprement : `return` d'abord, `rewrite` quand il faut.",
    blocks: [
      {
        kind: "code",
        language: "nginx",
        title: "Redirections courantes",
        code: "# www vers non-www (simple et rapide)\nserver {\n    listen 80;\n    server_name www.example.com;\n    return 301 https://example.com$request_uri;\n}\n\n# Réécriture interne d'un préfixe\nlocation /old/ {\n    rewrite ^/old/(.*)$ /new/$1 permanent;\n}",
      },
      {
        kind: "text",
        text: "Préférez `return 301 ...` à `rewrite ... permanent` pour les redirections simples : plus lisible, plus rapide. `rewrite` sert aux transformations d'URL complexes (regex avec captures). `permanent` = 301 (définitif, mis en cache par les navigateurs), `redirect` = 302 (temporaire). Attention : un 301 est mémorisé par les navigateurs — une erreur de redirection 301 persiste chez les visiteurs même après correction côté serveur.",
      },
    ],
  },
  {
    id: "variables-nginx",
    title: "Variables Nginx",
    level: 3,
    intro:
      "Les variables intégrées les plus utiles dans la configuration et les logs.",
    blocks: [
      {
        kind: "fields",
        title: "Variables à connaître",
        fields: [
          { label: "`$uri`", value: "Le chemin demandé, normalisé (sans arguments)." },
          { label: "`$request_uri`", value: "L'URI complète d'origine, avec les arguments (`/page?x=1`)." },
          { label: "`$host`", value: "Le nom d'hôte de la requête (en-tête `Host`)." },
          { label: "`$remote_addr`", value: "L'adresse IP du client direct (le proxy, si proxy il y a)." },
          { label: "`$scheme`", value: "`http` ou `https`." },
          { label: "`$request_method`", value: "GET, POST, etc." },
          { label: "`$status`", value: "Le code de statut de la réponse — très utile dans les logs." },
          { label: "`$upstream_response_time`", value: "Le temps mis par le backend à répondre — la métrique de performance clé." },
          { label: "`$upstream_cache_status`", value: "HIT, MISS, EXPIRED… l'état du cache pour cette requête." },
        ],
      },
      {
        kind: "text",
        text: "On peut aussi définir ses propres variables avec `map` (par exemple pour activer un comportement selon le user-agent) ou `set`. Les variables n'existent qu'au moment du traitement de la requête : elles ne sont pas des variables d'environnement persistantes.",
      },
    ],
  },
  {
    id: "rate-limiting",
    title: "Rate limiting",
    level: 3,
    intro:
      "Limiter le débit des requêtes pour se protéger des abus et des pics.",
    blocks: [
      {
        kind: "code",
        language: "nginx",
        title: "Limiter les requêtes par IP",
        code: "http {\n    limit_req_zone $binary_remote_addr zone=login:10m rate=5r/s;\n\n    server {\n        location /login {\n            limit_req zone=login burst=10 nodelay;\n            proxy_pass http://app_backend;\n        }\n    }\n}",
      },
      {
        kind: "text",
        text: "`limit_req_zone` définit un compteur par IP (`$binary_remote_addr`, version compacte de l'adresse) : ici 5 requêtes par seconde en moyenne sur la zone `login`. `burst=10 nodelay` autorise des rafales de 10 requêtes sans délai, au-delà Nginx répond `503`. C'est la protection de base contre le brute-force sur `/login` et contre les scrapers agressifs — à compléter par une vraie protection applicative, pas à remplacer.",
      },
    ],
  },
  {
    id: "authentification-basique",
    title: "Authentification basique",
    level: 3,
    intro:
      "Protéger un espace (staging, admin) avec un login/mot de passe HTTP.",
    blocks: [
      {
        kind: "command",
        label: "Créer un fichier d'utilisateurs",
        command: "sudo htpasswd -c /etc/nginx/.htpasswd admin",
        why: "`htpasswd` (fourni par le paquet `apache2-utils` sur Debian/Ubuntu) crée un fichier avec le mot de passe haché — jamais en clair. L'option `-c` crée le fichier ; on l'omet pour ajouter d'autres utilisateurs ensuite.",
        verify: "sudo cat /etc/nginx/.htpasswd",
      },
      {
        kind: "code",
        language: "nginx",
        title: "Protéger un location",
        code: "location /admin/ {\n    auth_basic \"Zone restreinte\";\n    auth_basic_user_file /etc/nginx/.htpasswd;\n    proxy_pass http://app_backend;\n}",
      },
      {
        kind: "text",
        text: "L'authentification basique transmet le mot de passe encodé en base64 à chaque requête : elle n'est sûre que derrière HTTPS. C'est parfait pour protéger un environnement de staging ou une interface d'admin interne, pas pour authentifier de vrais utilisateurs en production.",
      },
    ],
  },
  {
    id: "logs-avances",
    title: "Logs avancés",
    level: 3,
    intro:
      "Personnaliser le format des logs pour le diagnostic et la supervision.",
    blocks: [
      {
        kind: "code",
        language: "nginx",
        title: "Format de log enrichi",
        code: "http {\n    log_format detailed '$remote_addr - $request_time \"$request\" '\n                        '$status $body_bytes_sent \"$http_referer\" '\n                        'rt=$upstream_response_time cache=$upstream_cache_status';\n\n    access_log /var/log/nginx/access.log detailed;\n}",
      },
      {
        kind: "text",
        text: "Ajouter `$request_time` (durée totale de la requête) et `$upstream_response_time` (temps backend) transforme `access.log` en outil de performance : on repère les requêtes lentes et on distingue un Nginx lent d'un backend lent. Ces logs sont aussi la matière première des outils d'analyse (GoAccess) et de la détection d'intrusion.",
      },
    ],
  },
  {
    id: "websockets",
    title: "WebSockets derrière Nginx",
    level: 3,
    intro:
      "Faire passer les connexions WebSocket à travers le reverse proxy.",
    blocks: [
      {
        kind: "code",
        language: "nginx",
        title: "Proxy WebSocket",
        code: "location /ws/ {\n    proxy_pass http://app_backend;\n    proxy_http_version 1.1;\n    proxy_set_header Upgrade $http_upgrade;\n    proxy_set_header Connection \"upgrade\";\n}",
      },
      {
        kind: "text",
        text: "WebSocket commence par une requête HTTP qui « négocie » le passage au protocole WebSocket via les en-têtes `Upgrade`. Par défaut, Nginx parle HTTP/1.0 à ses backends et ne transmet pas ces en-têtes : sans ces trois lignes, la négociation échoue et la connexion ne s'établit jamais. Pensez aussi à augmenter les timeouts : une connexion WebSocket reste ouverte des heures, contrairement à une requête HTTP classique.",
      },
    ],
  },
  {
    id: "http2",
    title: "HTTP/2",
    level: 3,
    intro:
      "Activer HTTP/2 pour des pages plus rapides sur les connexions modernes.",
    blocks: [
      {
        kind: "code",
        language: "nginx",
        title: "Activer HTTP/2",
        code: "server {\n    listen 443 ssl;\n    http2 on;\n    server_name app.example.com;\n    # ...\n}",
      },
      {
        kind: "text",
        text: "HTTP/2 multiplexe les requêtes sur une seule connexion, compresse les en-têtes et permet au serveur de « pousser » des ressources : fini la multiplication des connexions parallèles de HTTP/1.1. Sur les versions récentes de Nginx, `http2 on;` remplace l'ancien `listen 443 ssl http2`. Vérifiez avec `curl -I --http2 https://app.example.com` que la négociation ALPN a bien lieu.",
      },
    ],
  },
  {
    id: "include-et-modularite",
    title: "Modulariser avec include",
    level: 3,
    intro:
      "Organiser une grosse configuration en fichiers réutilisables.",
    blocks: [
      {
        kind: "code",
        language: "nginx",
        title: "Snippets réutilisables",
        code: "# /etc/nginx/snippets/proxy-headers.conf\nproxy_set_header Host $host;\nproxy_set_header X-Real-IP $remote_addr;\nproxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\nproxy_set_header X-Forwarded-Proto $scheme;\n\n# Dans un server :\nlocation / {\n    include snippets/proxy-headers.conf;\n    proxy_pass http://app_backend;\n}",
      },
      {
        kind: "text",
        text: "`include` insère le contenu d'un fichier à l'endroit de la directive — c'est une inclusion textuelle, pas un module. Les snippets (headers de proxy, config SSL, headers de sécurité) évitent la duplication entre sites et garantissent la cohérence. Sur Debian, `sites-enabled/*.conf` et `conf.d/*.conf` sont déjà inclus par défaut dans `nginx.conf`.",
      },
    ],
  },
  {
    id: "docker-nginx",
    title: "Nginx avec Docker",
    level: 3,
    intro:
      "Utiliser l'image officielle pour servir une app conteneurisée.",
    blocks: [
      {
        kind: "code",
        language: "dockerfile",
        title: "Image avec configuration personnalisée",
        code: "FROM nginx:alpine\nCOPY nginx.conf /etc/nginx/nginx.conf\nCOPY dist/ /usr/share/nginx/html/\nEXPOSE 80",
      },
      {
        kind: "text",
        text: "Le pattern standard : partir de l'image officielle (la variante `alpine` est légère), copier votre configuration et vos fichiers statiques, exposer le port. Pour un reverse proxy vers d'autres conteneurs, utilisez le nom du service comme hôte dans `proxy_pass` (le DNS interne de Docker le résout) et montez la configuration en volume pour itérer sans reconstruire l'image.",
      },
      {
        kind: "command",
        label: "Tester une configuration dans un conteneur",
        command: "docker run --rm -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro nginx nginx -t",
        why: "Monte votre fichier de configuration en lecture seule dans un conteneur éphémère et teste sa syntaxe : on valide la config sans installer Nginx ni toucher au système. `--rm` supprime le conteneur après le test.",
      },
    ],
  },
  {
    id: "timeouts-et-buffering",
    title: "Timeouts et buffering",
    level: 3,
    intro:
      "Régler les délais d'attente pour éviter les connexions fantômes et les 504.",
    blocks: [
      {
        kind: "fields",
        title: "Les timeouts à connaître",
        fields: [
          { label: "`proxy_connect_timeout`", value: "Délai max pour établir la connexion TCP au backend (défaut 60s — souvent trop long)." },
          { label: "`proxy_read_timeout`", value: "Délai max entre deux paquets de la réponse du backend. À augmenter pour les exports longs ou le streaming." },
          { label: "`proxy_send_timeout`", value: "Délai max pour transmettre la requête au backend." },
          { label: "`keepalive_timeout`", value: "Durée de maintien d'une connexion keep-alive côté client. 65s est une valeur courante." },
          { label: "`client_body_timeout`", value: "Délai max pour recevoir le corps de la requête du client." },
        ],
      },
      {
        kind: "text",
        text: "Un `504 Gateway Timeout` signifie presque toujours qu'un de ces timeouts a expiré côté Nginx alors que le backend travaillait encore. Avant d'augmenter les timeouts, vérifiez pourquoi le backend est lent : allonger les délais masque le problème et consomme des connexions.",
      },
    ],
  },
  {
    id: "debugging",
    title: "Debugging",
    level: 3,
    intro:
      "Diagnostiquer méthodiquement un Nginx qui ne fait pas ce qu'on attend.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Vérifier que la config est bien chargée",
            detail:
              "`sudo nginx -T | grep -A5 \"server_name\"` : la configuration affichée est-elle celle que vous croyez ? Un fichier non inclus est la cause numéro un.",
          },
          {
            title: "Lire error.log au niveau debug",
            detail:
              "Passez temporairement `error_log /var/log/nginx/error.log debug;` puis rechargez : Nginx journalise alors chaque décision (quel server, quel location, quelle réécriture). Remettez le niveau normal après diagnostic — le mode debug est très verbeux.",
          },
          {
            title: "Isoler avec curl",
            detail:
              "`curl -v` montre exactement ce qui est envoyé et reçu. Testez le backend directement (`curl http://localhost:3000/`) pour distinguer un problème Nginx d'un problème applicatif.",
          },
          {
            title: "Vérifier les permissions",
            detail:
              "Un `403 Forbidden` sur des fichiers statiques vient presque toujours des permissions : l'utilisateur `www-data` doit pouvoir traverser tous les dossiers parents jusqu'au fichier.",
          },
          {
            title: "Vérifier les ports et le pare-feu",
            detail:
              "`ss -tlnp | grep nginx` confirme les ports écoutés. Si Nginx écoute mais ne répond pas depuis l'extérieur, suspectez le pare-feu (`ufw`) ou les groupes de sécurité du cloud.",
          },
        ],
      },
    ],
  },
  {
    id: "tests-et-validation",
    title: "Tests et validation",
    level: 3,
    intro:
      "Prouver qu'une configuration fait ce qu'elle doit, avant et après déploiement.",
    blocks: [
      {
        kind: "list",
        items: [
          "`nginx -t` : valide la syntaxe. Obligatoire avant chaque rechargement, automatisable en CI.",
          "Tests `curl` scriptés : vérifiez les codes de statut des URLs critiques (200 sur `/`, 301 de HTTP vers HTTPS, 404 sur une URL inconnue) après chaque changement.",
          "Test de charge léger : `ab -n 1000 -c 50 https://app.example.com/` (ApacheBench) donne un premier ordre de grandeur avant d'investir dans un vrai outil de charge.",
          "Vérification TLS : `openssl s_client` pour les dates de certificat, un scanner en ligne pour la note globale de configuration.",
          "Rejeu de logs : rejouer un extrait d'`access.log` contre un staging pour valider une nouvelle configuration sur du trafic réaliste.",
        ],
      },
      {
        kind: "text",
        text: "En CI, testez la configuration dans un conteneur Docker avec `nginx -t` : ça ne coûte rien et ça attrape les erreurs de syntaxe avant qu'elles n'atteignent un serveur.",
      },
    ],
  },
  {
    id: "performance",
    title: "Performance",
    level: 3,
    intro:
      "Les réglages qui comptent vraiment pour servir vite sous charge.",
    blocks: [
      {
        kind: "fields",
        title: "Les leviers principaux",
        fields: [
          { label: "`worker_processes auto;`", value: "Un worker par cœur CPU : exploite tout le parallélisme disponible sans configuration manuelle." },
          { label: "`worker_connections 1024;`", value: "Nombre de connexions simultanées par worker. 1024 suffit pour la plupart des usages ; à augmenter sur les très gros trafics." },
          { label: "`sendfile on;`", value: "Envoie les fichiers directement du disque vers le réseau sans passer par l'espace utilisateur : le chemin le plus rapide pour le contenu statique." },
          { label: "`tcp_nopush` / `tcp_nodelay`", value: "Optimisent l'envoi des paquets TCP : `tcp_nopush` avec `sendfile` pour les gros fichiers, `tcp_nodelay` pour les petites réponses interactives." },
          { label: "`keepalive` vers les upstreams", value: "Réutilise les connexions vers les backends au lieu d'en ouvrir une par requête : `upstream` + `keepalive 32;` + `proxy_http_version 1.1`." },
          { label: "Cache", value: "Le gain le plus massif : une réponse servie depuis le cache ne touche ni le disque ni le backend." },
        ],
      },
      {
        kind: "text",
        text: "Mesurez avant d'optimiser : `$request_time` et `$upstream_response_time` dans les logs disent si le temps se passe dans Nginx, le réseau ou le backend. La plupart des problèmes de « lenteur Nginx » sont en réalité des backends lents.",
      },
    ],
  },
  {
    id: "securite-durcissement",
    title: "Durcissement sécurité",
    level: 3,
    intro:
      "Réduire la surface d'attaque d'un Nginx exposé sur internet.",
    blocks: [
      {
        kind: "list",
        items: [
          "`server_tokens off;` : ne pas annoncer la version exacte de Nginx.",
          "Bloc `default_server` qui répond `444` aux requêtes sans `Host` connu : ne rien exposer par accident.",
          "TLS 1.2+ uniquement, certificats renouvelés automatiquement, HSTS activé.",
          "En-têtes de sécurité : `X-Content-Type-Options`, `X-Frame-Options`, `Content-Security-Policy` adaptée.",
          "Rate limiting sur les endpoints sensibles (`/login`, `/admin`, API).",
          "Ne jamais exposer les fichiers sensibles : bloquez l'accès aux `.git`, `.env`, sauvegardes (`location ~ /\\. { deny all; }`).",
          "Principe du moindre privilège : Nginx tourne en `www-data`, les fichiers de config appartiennent à root.",
          "Mises à jour régulières : les CVE Nginx sont rares mais réelles — suivez les annonces de sécurité.",
        ],
      },
      {
        kind: "code",
        language: "nginx",
        title: "Bloquer les fichiers sensibles",
        code: "location ~ /\\. {\n    deny all;\n    access_log off;\n}\n\nlocation ~* \\.(bak|old|swp)$ {\n    deny all;\n}",
      },
    ],
  },
  {
    id: "monitoring-stub-status",
    title: "Supervision",
    level: 3,
    intro:
      "Observer l'état interne de Nginx avec `stub_status`.",
    blocks: [
      {
        kind: "code",
        language: "nginx",
        title: "Activer la page de statut",
        code: "server {\n    listen 127.0.0.1:8080;\n    location /nginx_status {\n        stub_status;\n        allow 127.0.0.1;\n        deny all;\n    }\n}",
      },
      {
        kind: "text",
        text: "`stub_status` expose les compteurs internes : connexions actives, acceptées, traitées, requêtes, et les états reading/writing/waiting. Écoutez uniquement sur localhost et restreignez l'accès : ces métriques ne doivent jamais être publiques. Les outils de supervision (Prometheus via un exporter, Datadog, Zabbix) consomment cette page pour construire des dashboards et des alertes.",
      },
      {
        kind: "command",
        label: "Lire le statut",
        command: "curl -s http://127.0.0.1:8080/nginx_status",
        why: "Affiche les compteurs bruts. `Active connections` qui grimpe sans retomber signale des connexions bloquées (backend lent, attaque lente) ; `Waiting` élevé est normal (keep-alive).",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pannes classiques, leurs symptômes et leurs causes réelles.",
    blocks: [
      {
        kind: "table",
        headers: ["Symptôme", "Cause probable", "Piste"],
        rows: [
          ["`502 Bad Gateway`", "Backend injoignable ou qui plante", "`curl` direct sur le backend, `error.log` (connection refused, timeout)"],
          ["`503 Service Unavailable`", "Rate limiting atteint ou plus aucun backend sain", "Vérifier `limit_req`, l'état des upstreams"],
          ["`504 Gateway Timeout`", "Backend trop lent, timeout Nginx expiré", "`$upstream_response_time` dans les logs, optimiser le backend"],
          ["`403 Forbidden`", "Permissions fichiers ou `deny`", "Permissions `www-data`, règles `allow/deny`"],
          ["`404` sur des fichiers existants", "`root`/`alias` mal configuré", "Vérifier le chemin résolu dans `error.log`"],
          ["Boucle de redirection", "`X-Forwarded-Proto` manquant ou double redirection HTTP→HTTPS", "`curl -vL`, vérifier les headers transmis"],
          ["`413 Payload Too Large`", "Upload plus gros que `client_max_body_size` (1 Mo par défaut)", "Augmenter `client_max_body_size`"],
          ["`emerg: bind() failed`", "Port déjà utilisé", "Un autre Nginx ou service écoute déjà : `ss -tlnp`"],
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro:
      "Les habitudes qui distinguent une configuration qui tient de celle qui casse.",
    blocks: [
      {
        kind: "list",
        items: [
          "Toujours `nginx -t` avant `nginx -s reload`. Sans exception.",
          "Versionner toute la configuration dans Git : chaque changement est tracé et réversible.",
          "Un fichier par site dans `sites-available`, activé par lien symbolique : lisible et modulaire.",
          "Factoriser les blocs répétés (headers proxy, SSL, sécurité) dans des snippets inclus.",
          "Ne jamais éditer la configuration directement en production sans passer par un test en staging.",
          "Documenter les choix non évidents en commentaires dans les fichiers (`#`).",
          "Surveiller les logs d'erreur après chaque changement, pas seulement au moment du déploiement.",
          "Automatiser le renouvellement TLS et alerter sur l'expiration des certificats.",
        ],
      },
    ],
  },
  {
    id: "projet-multi-apps",
    title: "Projet : reverse proxy multi-applications",
    level: 3,
    intro:
      "Exposer trois applications derrière un seul Nginx, avec HTTPS.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Préparer les backends",
            detail:
              "Lancez trois petites applications sur les ports 3001, 3002, 3003 (un serveur HTTP simple suffit pour l'exercice).",
          },
          {
            title: "Créer les blocs server",
            detail:
              "Un `server` par sous-domaine (`app1.example.com`…), chacun avec son `proxy_pass` et les en-têtes `proxy_set_header` via un snippet commun.",
          },
          {
            title: "Ajouter le HTTPS",
            detail:
              "Certbot pour chaque domaine, ou un certificat wildcard si vous gérez le DNS. Vérifiez la redirection HTTP → HTTPS sur les trois.",
          },
          {
            title: "Ajouter le rate limiting",
            detail:
              "Protégez un endpoint `/login` factice avec `limit_req`, puis vérifiez avec une rafale de `curl` que le `503` se déclenche.",
          },
          {
            title: "Valider",
            detail:
              "`nginx -T` pour relire la config complète, `curl -I` sur chaque domaine, lecture d'`error.log` : tout doit être propre.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-cache-api",
    title: "Projet : cache devant une API",
    level: 3,
    intro:
      "Soulager une API lente avec le cache proxy de Nginx.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer une API lente factice",
            detail:
              "Un endpoint qui attend 2 secondes avant de répondre (simule une requête coûteuse). Mesurez le temps de réponse de base avec `curl -w \"%{time_total}\"`.",
          },
          {
            title: "Configurer le cache",
            detail:
              "`proxy_cache_path`, `proxy_cache` et `proxy_cache_valid 200 1m` sur le `location` de l'API. Ajoutez `X-Cache-Status` pour observer.",
          },
          {
            title: "Mesurer le gain",
            detail:
              "Premier appel : `MISS`, ~2s. Deuxième appel : `HIT`, quelques millisecondes. Le cache fonctionne.",
          },
          {
            title: "Gérer l'invalidation",
            detail:
              "Réfléchissez : que se passe-t-il si les données changent ? Testez une durée de vie courte vs un endpoint de purge manuel.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-deploiement-complet",
    title: "Projet : déploiement complet",
    level: 3,
    intro:
      "Le scénario réel : mettre en production une application de A à Z.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Provisionner le serveur",
            detail:
              "VPS avec Ubuntu, utilisateur non-root avec sudo, pare-feu `ufw` n'autorisant que 22, 80 et 443.",
          },
          {
            title: "Installer et configurer",
            detail:
              "Nginx via `apt`, bloc `server` en reverse proxy vers l'application, configuration versionnée dans Git.",
          },
          {
            title: "Sécuriser",
            detail:
              "HTTPS avec Certbot, en-têtes de sécurité, `server_tokens off`, blocage des fichiers sensibles, rate limiting sur le login.",
          },
          {
            title: "Superviser",
            detail:
              "`stub_status` en local, format de log enrichi avec les temps de réponse, alertes sur les 5xx et l'expiration du certificat.",
          },
          {
            title: "Documenter",
            detail:
              "Procédure de déploiement, procédure de rollback (`git revert` + reload), contacts d'astreinte. Un déploiement sans documentation est un déploiement à moitié fait.",
          },
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
          { label: "Documentation Nginx", value: "nginx.org/en/docs : la référence complète, directive par directive, avec les contextes valides." },
          { label: "Beginner's Guide", value: "nginx.org/en/docs/beginners_guide.html : le guide officiel pour démarrer — structure, premier server, proxy." },
          { label: "Blog Nginx", value: "Articles approfondis de l'équipe Nginx sur l'architecture, le tuning et les cas d'usage." },
        ],
      },
      {
        kind: "list",
        items: [
          "Référence des directives : chaque directive documente ses contextes valides et sa valeur par défaut — à consulter avant d'inventer une syntaxe.",
          "Changelog : suivre les nouvelles versions pour les nouvelles directives (ex. `http2 on;`).",
          "Pratique : monter un lab Docker local et casser volontairement des configurations pour apprendre le diagnostic.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Nginx maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Conteneuriser : apprendre `docker` pour empaqueter Nginx et vos applications ensemble.",
          "Automatiser : déployer vos configurations avec Ansible au lieu de les éditer à la main.",
          "Superviser : collecter les métriques Nginx avec Prometheus et les visualiser dans Grafana.",
          "Approfondir le réseau : `networking` (TCP, DNS, TLS) pour comprendre ce qui se passe sous HTTP.",
          "Revenir à la roadmap : valider Nginx et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

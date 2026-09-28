import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète d'Ansible : de zéro à l'automatisation
 * professionnelle d'infrastructures. 3 niveaux d'information
 * (Aperçu / Pratique / Approfondi) avec divulgation progressive.
 * Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_ANSIBLE: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Ansible, pourquoi il n'a besoin d'aucun agent et ce que « idempotent » change au quotidien.",
    blocks: [
      {
        kind: "text",
        text: "Ansible est un outil d'automatisation open source édité par Red Hat : il configure des serveurs, déploie des applications et orchestre des tâches d'exploitation à partir de fichiers YAML appelés playbooks. Sa particularité : il fonctionne via SSH (ou WinRM pour Windows), sans aucun agent à installer sur les machines cibles.",
      },
      {
        kind: "text",
        text: "Le principe est déclaratif : vous décrivez l'état désiré (« Nginx doit être installé et démarré »), Ansible compare cet état à la réalité et n'applique que les changements nécessaires. Réexécuter le même playbook sur une machine déjà configurée ne change rien : c'est l'idempotence, la propriété qui rend les playbooks sûrs à relancer.",
      },
      {
        kind: "diagram",
        title: "Le modèle Ansible : sans agent",
        lines: [
          "Machine de contrôle (votre poste)",
          "     │  SSH",
          "     ▼",
          "Inventaire : web1, web2, db1",
          "     │",
          "     ▼",
          "Playbook YAML → modules Python",
          "     │  (exécutés à distance, puis supprimés)",
          "     ▼",
          "État désiré atteint (ou déjà correct → rien ne change)",
        ],
      },
      {
        kind: "list",
        items: [
          "Push : c'est la machine de contrôle qui initie la connexion, pas un agent qui interroge un serveur.",
          "Les modules sont de petits scripts Python copiés sur la cible, exécutés, puis nettoyés.",
          "Rien à installer côté cible sauf Python et un accès SSH : idéal pour des flottes hétérogènes.",
        ],
      },
    ],
  },
  {
    id: "ansible-parmi-outils",
    title: "Ansible parmi les outils d'automatisation",
    level: 1,
    intro:
      "Où se situe Ansible face aux autres outils d'infrastructure : pas de hiérarchie, des rôles différents.",
    blocks: [
      {
        kind: "table",
        headers: ["Outil", "Rôle principal", "Modèle"],
        rows: [
          [
            "Ansible",
            "Configurer des machines existantes, déployer des applications, automatiser des tâches",
            "Push via SSH, playbooks YAML impératifs-déclaratifs",
          ],
          [
            "Terraform",
            "Créer et gérer l'infrastructure elle-même (VM, réseaux, bases managées)",
            "Déclaratif, état (state) versionné",
          ],
          [
            "Scripts shell",
            "Automatiser une tâche ponctuelle sur une machine",
            "Impératif, pas d'inventaire ni d'idempotence garantie",
          ],
          [
            "Images Docker / Packer",
            "Figer un système dans une image immuable",
            "Build d'artefact, pas de configuration à chaud",
          ],
        ],
      },
      {
        kind: "text",
        text: "En pratique, ces outils se combinent : Terraform crée les serveurs, Ansible les configure, et un pipeline CI exécute les deux. Choisir Ansible seul a du sens quand les machines existent déjà (VPS, serveurs on-premise) et qu'il faut les configurer de façon reproductible.",
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
      "Ce qu'il faut maîtriser avant d'automatiser : Ansible ne fait qu'exécuter à distance ce que vous savez déjà faire à la main.",
    blocks: [
      {
        kind: "fields",
        title: "Les fondations indispensables",
        fields: [
          {
            label: "Linux en ligne de commande",
            value:
              "Installer des paquets, gérer des services (`systemctl`), éditer des fichiers de configuration, comprendre les permissions. Un playbook ne fait que reproduire ces gestes à distance.",
          },
          {
            label: "SSH et les clés",
            value:
              "Se connecter avec une clé (`ssh -i`), comprendre `~/.ssh/known_hosts` et l'agent SSH. Ansible ne fait que du SSH automatisé : si la connexion manuelle échoue, le playbook échouera aussi.",
          },
          {
            label: "YAML de base",
            value:
              "Indentation à deux espaces, listes (`-`), dictionnaires (`clé: valeur`). 90 % des erreurs de débutant sont des erreurs d'indentation YAML, pas des erreurs Ansible.",
          },
          {
            label: "Bash",
            value:
              "Comprendre ce que fait chaque commande que vous automatisez. Ansible n'est pas magique : un module `apt` équivaut à `apt install`, un module `copy` à `scp`.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle d'or : automatisez uniquement ce que vous savez déjà faire manuellement. Un playbook écrit sans comprendre la commande sous-jacente devient impossible à déboguer le jour où il échoue.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Ansible s'installe uniquement sur la machine de contrôle — jamais sur les serveurs cibles.",
    blocks: [
      {
        kind: "command",
        label: "Installer Ansible avec pip (recommandé)",
        command: "pip install ansible",
        why: "Installe le paquet `ansible` (qui inclut `ansible-core` et les collections communautaires) dans l'environnement Python courant. Utiliser un environnement virtuel évite les conflits avec le Python système.",
        verify: "ansible --version",
      },
      {
        kind: "command",
        label: "Installer sur macOS avec Homebrew",
        command: "brew install ansible",
        why: "Alternative simple sur macOS : Homebrew gère Python et les dépendances pour vous. Le résultat est identique — les mêmes commandes `ansible` et `ansible-playbook` deviennent disponibles.",
        verify: "ansible --version",
      },
      {
        kind: "text",
        text: "Sur la machine de contrôle, il faut Python 3 et un client SSH. Côté cibles : Python 3 et un compte SSH suffisent — aucune installation Ansible requise. C'est tout l'intérêt du modèle sans agent.",
      },
    ],
  },
  {
    id: "inventaire",
    title: "L'inventaire : déclarer ses serveurs",
    level: 2,
    intro:
      "L'inventaire est la liste des machines sur lesquelles Ansible travaille, organisées en groupes.",
    blocks: [
      {
        kind: "code",
        language: "ini",
        title: "inventory.ini — deux serveurs web, une base",
        code: `[web]
srv-web-1 ansible_host=203.0.113.10
srv-web-2 ansible_host=203.0.113.11

[db]
srv-db-1 ansible_host=203.0.113.20

[prod:children]
web
db`,
      },
      {
        kind: "text",
        text: "`ansible_host` est l'adresse réelle de connexion ; le nom à gauche (`srv-web-1`) est l'alias utilisé dans les playbooks. Les groupes (`[web]`, `[db]`) permettent de cibler un rôle de machines, et les groupes de groupes (`[prod:children]`) de viser un environnement entier.",
      },
      {
        kind: "command",
        label: "Vérifier que l'inventaire est bien lu",
        command: "ansible-inventory -i inventory.ini --list",
        why: "Affiche l'inventaire tel qu'Ansible le comprend, en JSON. C'est le premier réflexe quand un playbook « ne trouve pas » un hôte : le problème est presque toujours dans l'inventaire, pas dans le playbook.",
        verify: "ansible-inventory -i inventory.ini --graph",
      },
    ],
  },
  {
    id: "connexion-ssh",
    title: "Préparer la connexion SSH",
    level: 2,
    intro:
      "Ansible se connecte en SSH avec votre utilisateur courant par défaut : il faut une clé et les bons paramètres.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Générer une clé dédiée (si besoin)",
            detail:
              "Si vous n'avez pas encore de clé : `ssh-keygen -t ed25519 -f ~/.ssh/ansible`. Une clé dédiée à l'automatisation permet de la révoquer séparément de votre clé personnelle.",
          },
          {
            title: "Copier la clé sur chaque serveur",
            detail:
              "`ssh-copy-id -i ~/.ssh/ansible.pub utilisateur@serveur` : la clé publique est ajoutée au `~/.ssh/authorized_keys` du serveur. Testez ensuite `ssh -i ~/.ssh/ansible utilisateur@serveur` à la main.",
          },
          {
            title: "Déclarer la clé dans l'inventaire ou ansible.cfg",
            detail:
              "Ajoutez `ansible_user=utilisateur` et `ansible_ssh_private_key_file=~/.ssh/ansible` soit par hôte dans l'inventaire, soit globalement dans `ansible.cfg` (voir la section configuration).",
          },
        ],
      },
      {
        kind: "text",
        text: "Si la connexion manuelle `ssh` fonctionne, Ansible fonctionnera. Si elle échoue (mot de passe demandé, clé refusée, hôte inconnu), réglez d'abord SSH avant de toucher à Ansible.",
      },
    ],
  },
  {
    id: "test-ping",
    title: "Tester la connectivité avec le module ping",
    level: 2,
    intro:
      "Le module `ping` ne fait pas un ping réseau : il vérifie qu'Ansible peut se connecter en SSH et exécuter du Python sur la cible.",
    blocks: [
      {
        kind: "command",
        label: "Pinger tous les hôtes de l'inventaire",
        command: "ansible all -i inventory.ini -m ping",
        why: "`-m ping` exécute le module `ping` (pas la commande système) : il teste la connexion SSH et la présence de Python sur chaque cible. `all` signifie « tous les hôtes de l'inventaire » — remplacez par `web` pour ne cibler qu'un groupe.",
        verify: "Chaque hôte répond `SUCCESS => {\"ping\": \"pong\"}`.",
      },
      {
        kind: "command",
        label: "Exécuter une commande ad hoc sur un groupe",
        command: "ansible web -i inventory.ini -a \"uptime\"",
        why: "Les commandes ad hoc (`-a`) exécutent un module unique sans écrire de playbook — ici le module `command`. Pratique pour une vérification rapide ou une action ponctuelle sur toute une flotte.",
      },
    ],
  },
  {
    id: "premier-playbook",
    title: "Premier playbook : installer Nginx",
    level: 2,
    intro:
      "Un playbook est une liste de tâches (« plays ») appliquées à un groupe d'hôtes. Voici le plus petit playbook utile.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "site.yml — installer et démarrer Nginx",
        code: `---
- name: Installer le serveur web
  hosts: web
  become: true
  tasks:
    - name: Installer Nginx
      ansible.builtin.apt:
        name: nginx
        state: present

    - name: Démarrer Nginx
      ansible.builtin.service:
        name: nginx
        state: started
        enabled: true`,
      },
      {
        kind: "command",
        label: "Exécuter le playbook",
        command: "ansible-playbook -i inventory.ini site.yml",
        why: "`ansible-playbook` lit le playbook, se connecte à chaque hôte du groupe `web`, et exécute les tâches dans l'ordre. `become: true` demande l'élévation de privilèges (sudo) pour les tâches qui en ont besoin, comme l'installation de paquets.",
        verify: "curl http://adresse-du-serveur affiche la page d'accueil Nginx.",
      },
      {
        kind: "command",
        label: "Simuler sans rien changer (dry run)",
        command: "ansible-playbook -i inventory.ini site.yml --check",
        why: "Le mode `--check` prédit ce qui changerait sans appliquer les modifications. À utiliser systématiquement avant d'exécuter un playbook sur la production : c'est la répétition générale.",
      },
    ],
  },
  {
    id: "anatomie-playbook",
    title: "Anatomie d'un playbook",
    level: 2,
    intro:
      "Chaque mot-clé d'un playbook a un rôle précis. Les comprendre évite de copier du YAML sans savoir ce qu'il fait.",
    blocks: [
      {
        kind: "fields",
        title: "Les mots-clés essentiels",
        fields: [
          {
            label: "hosts",
            value:
              "Le groupe d'inventaire ciblé (`web`, `all`, `prod`). C'est lui qui décide « sur quelles machines ».",
          },
          {
            label: "become",
            value:
              "Élévation de privilèges (`become: true` + `become_user: root` par défaut). L'équivalent Ansible de `sudo`.",
          },
          {
            label: "tasks",
            value:
              "La liste ordonnée des tâches. Chaque tâche a un `name` (lisible dans les logs) et appelle un module.",
          },
          {
            label: "Module (ex. ansible.builtin.apt)",
            value:
              "L'action réelle : `apt` gère les paquets, `copy` copie des fichiers, `service` gère les services. Le préfixe `ansible.builtin.` désigne la collection de base.",
          },
          {
            label: "state",
            value:
              "L'état désiré : `present` (installé), `absent` (désinstallé), `started`, `restarted`. C'est le cœur du modèle déclaratif.",
          },
          {
            label: "vars",
            value:
              "Les variables du play : valeurs réutilisables dans les tâches via `{{ ma_variable }}`.",
          },
        ],
      },
      {
        kind: "command",
        label: "Consulter la documentation d'un module",
        command: "ansible-doc ansible.builtin.apt",
        why: "`ansible-doc` affiche la documentation complète d'un module : paramètres, exemples, valeurs de retour. C'est la référence exacte — à consulter avant Stack Overflow quand un paramètre se comporte bizarrement.",
      },
    ],
  },
  {
    id: "modules-essentiels",
    title: "Les modules essentiels",
    level: 2,
    intro:
      "Une dizaine de modules couvre 90 % des besoins courants. Les connaître par nom suffit à lire n'importe quel playbook.",
    blocks: [
      {
        kind: "table",
        headers: ["Module", "Usage", "Exemple d'état"],
        rows: [
          ["ansible.builtin.apt / dnf", "Gérer les paquets (Debian / Red Hat)", "`name: nginx, state: present`"],
          ["ansible.builtin.copy", "Copier un fichier local vers la cible", "`src: app.conf, dest: /etc/app/`"],
          ["ansible.builtin.template", "Copier un fichier avec variables Jinja2", "`src: nginx.conf.j2`"],
          ["ansible.builtin.file", "Créer dossiers, liens, gérer permissions", "`path: /data, state: directory`"],
          ["ansible.builtin.service", "Démarrer/arrêter/activer un service", "`name: nginx, state: started`"],
          ["ansible.builtin.user", "Créer des utilisateurs système", "`name: deploy, groups: sudo`"],
          ["ansible.builtin.git", "Cloner/mettre à jour un dépôt", "`repo: ..., dest: /srv/app`"],
          ["ansible.builtin.command / shell", "Exécuter une commande brute", "À éviter si un module existe"],
          ["ansible.builtin.lineinfile", "Modifier une ligne dans un fichier", "`regexp`, `line` pour /etc/hosts"],
          ["ansible.builtin.get_url", "Télécharger un fichier depuis une URL", "`url: ..., dest: /tmp/`"],
        ],
      },
      {
        kind: "text",
        text: "Principe : préférez toujours un module dédié à `command` ou `shell`. Les modules sont idempotents (ils ne changent rien si l'état est déjà correct) ; une commande brute s'exécute à chaque fois et casse l'idempotence.",
      },
    ],
  },
  {
    id: "variables",
    title: "Variables : paramétrer ses playbooks",
    level: 2,
    intro:
      "Les variables transforment un playbook rigide en modèle réutilisable : même playbook, valeurs différentes par environnement.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "vars + utilisation dans les tâches",
        code: `---
- name: Déployer l'application
  hosts: web
  vars:
    app_port: 8080
    app_user: deploy
  tasks:
    - name: Créer l'utilisateur applicatif
      ansible.builtin.user:
        name: "{{ app_user }}"
        shell: /bin/bash

    - name: Déployer la configuration
      ansible.builtin.template:
        src: app.conf.j2
        dest: /etc/app/app.conf`,
      },
      {
        kind: "text",
        text: "Les variables se définissent à plusieurs niveaux : dans le play (`vars:`), dans l'inventaire (par hôte ou par groupe), dans des fichiers `group_vars/` et `host_vars/`, ou en ligne de commande avec `-e`. En cas de conflit, la variable la plus spécifique gagne (la ligne de commande bat tout).",
      },
      {
        kind: "command",
        label: "Surcharger une variable à l'exécution",
        command: "ansible-playbook -i inventory.ini site.yml -e \"app_port=9090\"",
        why: "`-e` (extra vars) a la priorité la plus haute : parfait pour tester une valeur ou déployer une version spécifique sans modifier le playbook. Utile aussi en CI pour injecter des numéros de build.",
      },
    ],
  },
  {
    id: "facts",
    title: "Les facts : ce qu'Ansible sait de vos serveurs",
    level: 2,
    intro:
      "Au début de chaque exécution, Ansible collecte automatiquement des informations sur chaque cible : OS, mémoire, disques, adresses IP. Ce sont les facts.",
    blocks: [
      {
        kind: "command",
        label: "Afficher tous les facts d'un hôte",
        command: "ansible web-1 -i inventory.ini -m ansible.builtin.setup",
        why: "Le module `setup` retourne le dictionnaire complet des facts : `ansible_distribution`, `ansible_memtotal_mb`, `ansible_default_ipv4`, etc. Indispensable pour écrire des tâches qui s'adaptent à la machine.",
        verify: "Repérez `ansible_os_family` : il vaut `Debian` ou `RedHat` selon la distribution.",
      },
      {
        kind: "code",
        language: "yaml",
        title: "Utiliser les facts dans un playbook",
        code: `tasks:
  - name: Installer Nginx (Debian)
    ansible.builtin.apt:
      name: nginx
      state: present
    when: ansible_os_family == "Debian"

  - name: Installer Nginx (Red Hat)
    ansible.builtin.dnf:
      name: nginx
      state: present
    when: ansible_os_family == "RedHat"`,
      },
      {
        kind: "text",
        text: "`when:` est le conditionnel d'Ansible : la tâche ne s'exécute que si l'expression est vraie. Combiné aux facts, il permet d'écrire des playbooks multi-distributions sans dupliquer la logique.",
      },
    ],
  },
  {
    id: "idempotence-pratique",
    title: "L'idempotence en pratique",
    level: 2,
    intro:
      "L'idempotence n'est pas un slogan : c'est ce qui permet de relancer un playbook en pleine nuit sans stress.",
    blocks: [
      {
        kind: "text",
        text: "Quand Ansible exécute une tâche, chaque module compare l'état actuel à l'état désiré et ne fait quelque chose que si nécessaire. Dans le récapitulatif final, `ok` signifie « déjà conforme, rien fait », `changed` signifie « j'ai modifié quelque chose ». Un second passage du même playbook doit afficher uniquement des `ok` : c'est le test d'idempotence.",
      },
      {
        kind: "list",
        items: [
          "Relancez toujours un playbook deux fois de suite : la seconde exécution doit être 100 % `ok`.",
          "Les modules `command` et `shell` affichent toujours `changed` : ils cassent ce test. Préférez les modules dédiés, ou ajoutez `changed_when: false` quand la commande est une simple lecture.",
          "Le mode `--check` (dry run) repose sur cette logique : il prédit les `changed` sans les appliquer.",
        ],
      },
    ],
  },
  {
    id: "cibler-limit-tags",
    title: "Cibler finement : --limit et --tags",
    level: 2,
    intro:
      "Pas besoin de réexécuter tout le playbook pour tester une modification : on peut cibler un hôte ou une partie des tâches.",
    blocks: [
      {
        kind: "command",
        label: "Limiter l'exécution à un seul serveur",
        command: "ansible-playbook -i inventory.ini site.yml --limit srv-web-1",
        why: "`--limit` restreint les hôtes ciblés sans toucher au playbook. Le réflexe avant production : tester sur un seul serveur, vérifier, puis élargir au groupe entier.",
      },
      {
        kind: "command",
        label: "N'exécuter que certaines tâches",
        command: "ansible-playbook -i inventory.ini site.yml --tags \"nginx\"",
        why: "Les tâches marquées `tags: [nginx]` dans le playbook peuvent s'exécuter seules avec `--tags`, ou être exclues avec `--skip-tags`. Pratique pour itérer vite sur une partie du playbook pendant le développement.",
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Le workflow quotidien",
    level: 2,
    intro:
      "La boucle de travail typique quand on développe et maintient des playbooks.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Éditer",
            detail:
              "Modifier le playbook ou le rôle dans l'éditeur, avec l'extension Ansible (Red Hat) pour VS Code : autocomplétion des modules et validation YAML.",
          },
          {
            title: "Simuler",
            detail:
              "`ansible-playbook -i inventory.ini site.yml --check --limit srv-test-1` : dry run sur un serveur de test pour voir ce qui changerait.",
          },
          {
            title: "Appliquer sur test",
            detail:
              "Exécuter pour de vrai sur le serveur de test, vérifier le service, relancer pour confirmer l'idempotence (tout `ok`).",
          },
          {
            title: "Déployer",
            detail:
              "Élargir au groupe complet (`--limit` retiré), surveiller le récapitulatif `changed`/`failed`, vérifier les services en production.",
          },
          {
            title: "Versionner",
            detail:
              "Commiter playbooks, rôles et inventaire dans Git. L'infrastructure versionnée se relit, se review et se restaure comme du code.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "handlers",
    title: "Handlers : réagir aux changements",
    level: 3,
    intro:
      "Un handler est une tâche qui ne s'exécute que si une autre tâche a réellement changé quelque chose — typiquement, redémarrer un service après modification de sa configuration.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Notifier un handler après changement",
        code: `tasks:
  - name: Déployer la configuration Nginx
    ansible.builtin.template:
      src: nginx.conf.j2
      dest: /etc/nginx/nginx.conf
    notify: Redémarrer Nginx

handlers:
  - name: Redémarrer Nginx
    ansible.builtin.service:
      name: nginx
      state: restarted`,
      },
      {
        kind: "list",
        items: [
          "`notify` déclenche le handler uniquement si la tâche affiche `changed`. Si la configuration est déjà à jour, Nginx n'est pas redémarré inutilement.",
          "Les handlers s'exécutent à la fin du play, une seule fois même si plusieurs tâches les notifient.",
          "Règle de nommage : le nom du handler doit correspondre exactement à celui du `notify`.",
        ],
      },
    ],
  },
  {
    id: "roles",
    title: "Rôles : organiser et réutiliser",
    level: 3,
    intro:
      "Quand un playbook dépasse quelques dizaines de lignes, on le découpe en rôles : des unités réutilisables avec une structure de dossiers conventionnelle.",
    blocks: [
      {
        kind: "diagram",
        title: "Structure d'un rôle",
        lines: [
          "roles/mon_role/",
          "├── tasks/main.yml      ← les tâches",
          "├── handlers/main.yml   ← les handlers",
          "├── templates/          ← fichiers Jinja2 (.j2)",
          "├── files/              ← fichiers statiques",
          "├── vars/main.yml       ← variables internes",
          "├── defaults/main.yml   ← valeurs par défaut surchargeables",
          "└── meta/main.yml       ← description et dépendances",
        ],
      },
      {
        kind: "command",
        label: "Générer le squelette d'un rôle",
        command: "ansible-galaxy init roles/nginx",
        why: "Crée l'arborescence complète d'un rôle avec des fichiers d'exemple. Partir du squelette officiel évite les erreurs de structure et garantit les conventions de nommage.",
      },
      {
        kind: "code",
        language: "yaml",
        title: "Utiliser des rôles dans un playbook",
        code: `---
- name: Serveurs web
  hosts: web
  become: true
  roles:
    - role: nginx
      vars:
        nginx_port: 8080
    - role: monitoring`,
      },
      {
        kind: "text",
        text: "`defaults/` contient les valeurs surchargeables (priorité basse), `vars/` les valeurs internes du rôle (priorité haute). Cette distinction est le mécanisme qui rend les rôles paramétrables sans les modifier.",
      },
    ],
  },
  {
    id: "galaxy-collections",
    title: "Galaxy et les collections",
    level: 3,
    intro:
      "Ansible Galaxy est le hub de rôles et de collections communautaires : réutiliser plutôt que réécrire.",
    blocks: [
      {
        kind: "command",
        label: "Installer une collection communautaire",
        command: "ansible-galaxy collection install community.general",
        why: "Les collections regroupent modules, plugins et rôles par domaine (`community.general` couvre des centaines de cas génériques). Déclarez-les dans un fichier `requirements.yml` versionné pour des installations reproductibles.",
      },
      {
        kind: "code",
        language: "yaml",
        title: "requirements.yml — dépendances versionnées",
        code: `---
collections:
  - name: community.general
    version: ">=9.0.0"
  - name: community.docker

roles:
  - name: geerlingguy.nginx
    version: 3.2.0`,
      },
      {
        kind: "text",
        text: "Évaluez un rôle Galaxy comme une dépendance logicielle : regardez la maintenance récente, les tests, et les variables exposées. Un rôle populaire et maintenu vaut mieux qu'un rôle maison approximatif pour les briques standards (Nginx, PostgreSQL, Docker).",
      },
    ],
  },
  {
    id: "templates-jinja2",
    title: "Templates Jinja2",
    level: 3,
    intro:
      "Le module `template` génère des fichiers de configuration à partir de modèles Jinja2, en injectant variables et facts.",
    blocks: [
      {
        kind: "code",
        language: "jinja",
        title: "nginx.conf.j2 — template paramétré",
        code: `server {
    listen {{ nginx_port | default(80) }};
    server_name {{ inventory_hostname }};

    location / {
        proxy_pass http://127.0.0.1:{{ app_port }};
    }
}`,
      },
      {
        kind: "list",
        items: [
          "`{{ variable }}` injecte une valeur, `{% if %}` / `{% for %}` ajoutent de la logique : un seul template peut générer des configurations différentes par serveur.",
          "`inventory_hostname` est une variable magique : le nom de l'hôte courant dans l'inventaire.",
          "Les filtres (`| default(80)`, `| upper`) transforment les valeurs : la documentation Jinja2 liste les filtres disponibles.",
          "Testez un template avec `--check --diff` : Ansible affiche le diff exact qui serait appliqué au fichier.",
        ],
      },
    ],
  },
  {
    id: "vault",
    title: "Vault : chiffrer les secrets",
    level: 3,
    intro:
      "Jamais de mot de passe en clair dans un playbook : Ansible Vault chiffre les variables sensibles.",
    blocks: [
      {
        kind: "command",
        label: "Créer un fichier de secrets chiffré",
        command: "ansible-vault create group_vars/web/vault.yml",
        why: "Ouvre l'éditeur pour saisir des variables qui seront stockées chiffrées avec AES. Le fichier reste versionnable dans Git : son contenu est illisible sans le mot de passe du vault.",
        verify: "cat group_vars/web/vault.yml affiche `$ANSIBLE_VAULT;1.1;AES256` suivi de données chiffrées.",
      },
      {
        kind: "command",
        label: "Exécuter un playbook utilisant le vault",
        command: "ansible-playbook -i inventory.ini site.yml --ask-vault-pass",
        why: "`--ask-vault-pass` demande le mot de passe au lancement. En CI, on préfère `--vault-password-file` pointant vers un fichier protégé (jamais commité) ou un secret du pipeline.",
      },
      {
        kind: "code",
        language: "yaml",
        title: "Utilisation d'une variable chiffrée",
        code: `tasks:
  - name: Créer l'utilisateur de déploiement
    ansible.builtin.user:
      name: deploy
      password: "{{ vault_deploy_password | password_hash('sha512') }}"`,
      },
      {
        kind: "text",
        text: "Convention : nommez les variables chiffrées avec le préfixe `vault_` et gardez-les dans un fichier `vault.yml` séparé des variables en clair. Le filtre `password_hash` génère un hash compatible `/etc/shadow` à partir du secret.",
      },
    ],
  },
  {
    id: "boucles",
    title: "Boucles : répéter sans dupliquer",
    level: 3,
    intro:
      "Le mot-clé `loop` répète une tâche sur une liste : installer plusieurs paquets, créer plusieurs utilisateurs, sans copier-coller.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Boucle sur une liste de paquets",
        code: `tasks:
  - name: Installer les paquets de base
    ansible.builtin.apt:
      name: "{{ item }}"
      state: present
    loop:
      - nginx
      - certbot
      - python3-certbot-nginx

  - name: Créer les utilisateurs
    ansible.builtin.user:
      name: "{{ item.name }}"
      groups: "{{ item.groups }}"
    loop:
      - { name: alice, groups: sudo }
      - { name: bob, groups: docker }`,
      },
      {
        kind: "list",
        items: [
          "`{{ item }}` est la variable magique de boucle : l'élément courant de la liste.",
          "On peut boucler sur des dictionnaires, des résultats de requêtes, ou des plages (`query('sequence', 'start=1 end=3')`).",
          "Chaque itération reste idempotente : Ansible ne modifie que les éléments qui en ont besoin.",
        ],
      },
    ],
  },
  {
    id: "conditionnels-avances",
    title: "Conditionnels avancés",
    level: 3,
    intro:
      "Au-delà du `when` simple : combiner des conditions et tester l'existence de variables.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Conditions composées et valeurs par défaut",
        code: `tasks:
  - name: Installer l'agent de monitoring
    ansible.builtin.apt:
      name: monitoring-agent
      state: present
    when:
      - monitoring_enabled | default(false)
      - ansible_memtotal_mb > 2048

  - name: Configurer le fuseau horaire
    ansible.builtin.command:
      cmd: timedatectl set-timezone {{ timezone | default('Europe/Paris') }}
    changed_when: false`,
      },
      {
        kind: "list",
        items: [
          "`when` accepte une liste : toutes les conditions doivent être vraies (ET logique).",
          "`| default(...)` évite l'erreur « variable is undefined » quand une variable est optionnelle.",
          "`changed_when: false` déclare qu'une commande en lecture seule ne change jamais rien : elle affichera `ok` au lieu de `changed`.",
          "`failed_when` permet de définir soi-même ce qui constitue un échec, utile quand un code de retour non nul est normal.",
        ],
      },
    ],
  },
  {
    id: "register-debug",
    title: "register et debug : inspecter les résultats",
    level: 3,
    intro:
      "Chaque tâche produit un résultat structuré : `register` le capture dans une variable pour l'utiliser ou l'inspecter.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Capturer et réutiliser un résultat",
        code: `tasks:
  - name: Vérifier l'espace disque
    ansible.builtin.command:
      cmd: df -h / | tail -1
    register: disk_usage
    changed_when: false

  - name: Afficher le résultat
    ansible.builtin.debug:
      msg: "Espace disque sur {{ inventory_hostname }} : {{ disk_usage.stdout }}"

  - name: Alerter si le disque est plein
    ansible.builtin.debug:
      msg: "ATTENTION : disque presque plein"
    when: "'90%' in disk_usage.stdout"`,
      },
      {
        kind: "text",
        text: "Le résultat enregistré contient `stdout`, `stderr`, `rc` (code de retour) et, pour les modules, des champs spécifiques (`changed`, `failed`). Le module `debug` est l'équivalent d'un `console.log` : à utiliser généreusement pendant le développement d'un playbook.",
      },
    ],
  },
  {
    id: "blocks-rescue",
    title: "Blocks : try/catch en YAML",
    level: 3,
    intro:
      "Les blocs regroupent des tâches avec une gestion d'erreur commune : `rescue` en cas d'échec, `always` dans tous les cas.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Déploiement avec rollback manuel",
        code: `tasks:
  - name: Déployer la nouvelle version
    block:
      - name: Arrêter le service
        ansible.builtin.service:
          name: app
          state: stopped

      - name: Déployer les fichiers
        ansible.builtin.copy:
          src: app-v2/
          dest: /srv/app/
    rescue:
      - name: Restaurer la sauvegarde
        ansible.builtin.copy:
          src: /srv/app-backup/
          dest: /srv/app/
          remote_src: true

      - name: Redémarrer l'ancienne version
        ansible.builtin.service:
          name: app
          state: started
    always:
      - name: Vérifier l'état du service
        ansible.builtin.service:
          name: app
          state: started`,
      },
      {
        kind: "text",
        text: "`block`/`rescue`/`always` est le mécanisme de gestion d'erreur structurée d'Ansible. Il ne remplace pas un vrai plan de rollback (snapshots, blue/green), mais il rend les playbooks robustes face aux échecs prévisibles.",
      },
    ],
  },
  {
    id: "delegation",
    title: "Délégation : exécuter ailleurs que sur la cible",
    level: 3,
    intro:
      "Certaines tâches concernent la machine de contrôle ou un tiers : `delegate_to` change la machine d'exécution sans changer la cible logique.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Cas classiques de délégation",
        code: `tasks:
  - name: Générer le certificat en local
    ansible.builtin.command:
      cmd: certbot certonly --standalone -d {{ inventory_hostname }}
    delegate_to: localhost

  - name: Retirer le serveur du load balancer
    ansible.builtin.uri:
      url: "http://lb-interne/drain?host={{ inventory_hostname }}"
    delegate_to: localhost

  - name: Attendre le redémarrage (une seule fois)
    ansible.builtin.wait_for:
      port: 22
      host: "{{ inventory_hostname }}"
    delegate_to: localhost
    run_once: true`,
      },
      {
        kind: "list",
        items: [
          "`delegate_to: localhost` exécute la tâche sur la machine de contrôle : génération de certificats, appels d'API, attentes.",
          "`run_once: true` n'exécute la tâche qu'une seule fois même si plusieurs hôtes sont ciblés.",
          "La délégation ne change pas les variables : `inventory_hostname` reste l'hôte d'origine.",
        ],
      },
    ],
  },
  {
    id: "strategies-execution",
    title: "Stratégies d'exécution et parallélisme",
    level: 3,
    intro:
      "Par défaut, Ansible exécute chaque tâche sur tous les hôtes avant de passer à la suivante. On peut ajuster ce comportement.",
    blocks: [
      {
        kind: "fields",
        title: "Contrôler l'exécution",
        fields: [
          {
            label: "strategy: linear (défaut)",
            value:
              "Chaque tâche s'exécute sur tous les hôtes avant la suivante. Prévisible et sûr : le choix par défaut pour la plupart des cas.",
          },
          {
            label: "strategy: free",
            value:
              "Chaque hôte avance à son rythme, sans attendre les autres. Plus rapide sur de grandes flottes hétérogènes, mais les sorties sont entrelacées.",
          },
          {
            label: "serial: 1 (ou 25%)",
            value:
              "Traite les hôtes par lots : un seul serveur à la fois, ou 25 % de la flotte. Indispensable pour les mises à jour sans interruption de service (rolling update).",
          },
          {
            label: "forks (option -f)",
            value:
              "Nombre de connexions SSH parallèles (5 par défaut). `ansible-playbook -f 20` accélère les grandes flottes ; à ajuster selon la capacité de la machine de contrôle.",
          },
          {
            label: "async / poll",
            value:
              "Pour les tâches longues (téléchargement, compilation) : `async: 600` lance la tâche en arrière-plan, `poll: 10` vérifie périodiquement. Évite les timeouts SSH.",
          },
        ],
      },
    ],
  },
  {
    id: "ansible-config",
    title: "ansible.cfg : la configuration du projet",
    level: 3,
    intro:
      "Le fichier `ansible.cfg` à la racine du projet règle le comportement par défaut : plus besoin de répéter les options en ligne de commande.",
    blocks: [
      {
        kind: "code",
        language: "ini",
        title: "ansible.cfg typique",
        code: `[defaults]
inventory = inventory.ini
remote_user = deploy
private_key_file = ~/.ssh/ansible
host_key_checking = False
forks = 20
roles_path = roles
collections_path = collections

[privilege_escalation]
become = True
become_method = sudo
become_ask_pass = False`,
      },
      {
        kind: "list",
        items: [
          "`host_key_checking = False` désactive la vérification interactive des clés d'hôtes : pratique en automatisation, à n'utiliser que sur des réseaux de confiance.",
          "`become_ask_pass = False` suppose que sudo ne demande pas de mot de passe (sudoers configuré en NOPASSWD pour l'utilisateur Ansible).",
          "Ansible cherche `ansible.cfg` dans l'ordre : variable d'environnement `ANSIBLE_CONFIG`, répertoire courant, `~/.ansible.cfg`, `/etc/ansible/ansible.cfg`.",
        ],
      },
      {
        kind: "command",
        label: "Voir la configuration effective",
        command: "ansible-config dump --only-changed",
        why: "Affiche uniquement les options qui diffèrent des valeurs par défaut, avec le fichier source de chacune. Indispensable quand « ça marche sur ma machine mais pas en CI » : la config effective n'est pas toujours celle qu'on croit.",
      },
    ],
  },
  {
    id: "inventaires-dynamiques",
    title: "Inventaires dynamiques",
    level: 3,
    intro:
      "Sur le cloud, les serveurs naissent et meurent : un inventaire statique devient vite obsolète. Les inventaires dynamiques interrogent le fournisseur.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "aws_ec2.yml — inventaire depuis AWS",
        code: `plugin: amazon.aws.aws_ec2
regions:
  - eu-west-3
filters:
  tag:Environnement: production
keyed_groups:
  - key: tags.Role
    prefix: role`,
      },
      {
        kind: "text",
        text: "Ce fichier n'est pas un inventaire mais la configuration du plugin d'inventaire `amazon.aws.aws_ec2` : à chaque exécution, Ansible interroge l'API AWS et construit les groupes depuis les tags. Des plugins équivalents existent pour Azure (`azure_rm`), GCP (`gcp_compute`) et bien d'autres.",
      },
      {
        kind: "command",
        label: "Visualiser l'inventaire dynamique",
        command: "ansible-inventory -i aws_ec2.yml --graph",
        why: "Affiche l'arborescence des groupes construits dynamiquement. À exécuter après chaque modification des filtres ou des tags : c'est le moyen le plus rapide de vérifier que le ciblage est correct.",
      },
    ],
  },
  {
    id: "securite-ansible",
    title: "Sécurité : become, secrets et durcissement",
    level: 3,
    intro:
      "Ansible a un accès privilégié à toute la flotte : sa propre sécurité est critique.",
    blocks: [
      {
        kind: "list",
        items: [
          "Dédiez un utilisateur Ansible par environnement, avec sudo limité aux commandes nécessaires plutôt qu'un NOPASSWD total quand c'est possible.",
          "Ne loguez jamais de secrets : ajoutez `no_log: true` aux tâches qui manipulent des mots de passe ou des tokens, sinon ils apparaissent en clair dans les sorties.",
          "Chiffrez avec Vault tout ce qui est secret, et ne commitez jamais le mot de passe du vault (ni le fichier `--vault-password-file`).",
          "Limitez la portée : `--limit` et des inventaires séparés par environnement (staging vs production) évitent d'appliquer un playbook de test sur la prod.",
          "Auditez régulièrement qui peut exécuter les playbooks et depuis quelles machines : la machine de contrôle est le point le plus sensible.",
        ],
      },
      {
        kind: "code",
        language: "yaml",
        title: "Masquer les secrets dans les logs",
        code: `tasks:
  - name: Définir le mot de passe applicatif
    ansible.builtin.user:
      name: app
      password: "{{ vault_app_password | password_hash('sha512') }}"
    no_log: true`,
      },
    ],
  },
  {
    id: "ansible-lint",
    title: "ansible-lint : la qualité automatisée",
    level: 3,
    intro:
      "Comme un linter de code, `ansible-lint` vérifie les playbooks et rôles contre les bonnes pratiques.",
    blocks: [
      {
        kind: "command",
        label: "Analyser un projet",
        command: "ansible-lint site.yml",
        why: "Détecte les modules dépréciés, les noms de tâches manquants, les usages risqués de `command`/`shell`, les problèmes de nommage. À intégrer dans la CI pour empêcher la dégradation progressive des playbooks.",
        verify: "ansible-lint roles/ doit retourner 0 erreur avant chaque merge.",
      },
      {
        kind: "list",
        items: [
          "Exigez un `name` sur chaque tâche et chaque play : sans nom, les logs sont illisibles.",
          "Préférez les noms de modules fully qualified (`ansible.builtin.apt`) : c'est la convention actuelle.",
          "Corrigez les avertissements au fil de l'eau : un projet qui accumule les warnings finit par ignorer le linter.",
        ],
      },
    ],
  },
  {
    id: "molecule-tests",
    title: "Tester les rôles avec Molecule",
    level: 3,
    intro:
      "Molecule teste les rôles Ansible dans des conteneurs éphémères : converge, vérifie, détruit.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Initialiser le scénario de test",
            detail:
              "`molecule init scenario` dans le rôle crée le dossier `molecule/default/` avec `converge.yml` (applique le rôle) et `verify.yml` (les assertions).",
          },
          {
            title: "Converger",
            detail:
              "`molecule converge` démarre un conteneur Docker et applique le rôle : c'est le playbook exécuté contre une cible jetable.",
          },
          {
            title: "Vérifier",
            detail:
              "`molecule verify` exécute les tests (souvent écrits avec Testinfra ou Ansible lui-même) : le service tourne-t-il ? le port répond-il ? le fichier a-t-il le bon contenu ?",
          },
          {
            title: "Idempotence",
            detail:
              "`molecule idempotence` rejoue le rôle et exige zéro changement : le test automatisé de la propriété la plus importante d'Ansible.",
          },
          {
            title: "Nettoyer",
            detail:
              "`molecule destroy` supprime les conteneurs. `molecule test` enchaîne tout : lint, destroy, create, converge, idempotence, verify, destroy.",
          },
        ],
      },
      {
        kind: "text",
        text: "Tester les rôles critiques (base de données, reverse proxy, durcissement) avec Molecule en CI transforme « ça marchait sur mon serveur » en garantie reproductible.",
      },
    ],
  },
  {
    id: "ansible-pull",
    title: "ansible-pull : le modèle inversé",
    level: 3,
    intro:
      "Par défaut Ansible pousse depuis la machine de contrôle. `ansible-pull` inverse le modèle : chaque machine tire sa configuration depuis Git.",
    blocks: [
      {
        kind: "command",
        label: "Tirer la configuration depuis un dépôt",
        command: "ansible-pull -U https://github.com/mon-org/infra.git -i localhost, site.yml",
        why: "`ansible-pull` clone le dépôt et exécute le playbook localement sur la machine. Utile pour les parcs où ouvrir du SSH entrant est impossible, ou pour l'auto-configuration au premier démarrage (couplé à une tâche cron ou au cloud-init).",
      },
      {
        kind: "list",
        items: [
          "Adapté aux postes de travail et aux serveurs isolés ; moins adapté aux déploiements coordonnés multi-machines.",
          "Planifiez avec cron pour une convergence régulière : chaque machine se remet à l'état désiré automatiquement.",
          "Le dépôt Git devient la source de vérité : toute modification de configuration passe par un commit.",
        ],
      },
    ],
  },
  {
    id: "windows-winrm",
    title: "Gérer Windows avec WinRM",
    level: 3,
    intro:
      "Ansible gère aussi Windows : SSH est remplacé par WinRM, et les modules sont spécifiques.",
    blocks: [
      {
        kind: "code",
        language: "ini",
        title: "Inventaire Windows",
        code: `[windows]
srv-win-1 ansible_host=203.0.113.30

[windows:vars]
ansible_connection=winrm
ansible_winrm_transport=ntlm
ansible_user=administrateur
ansible_password={{ vault_win_password }}`,
      },
      {
        kind: "list",
        items: [
          "Les modules Windows ont le préfixe `ansible.windows.` (`win_copy`, `win_service`, `win_feature`) : la logique reste identique, seule l'implémentation change.",
          "Préparez la cible avec le script `ConfigureRemotingForAnsible.ps1` fourni dans la documentation Ansible.",
          "Même philosophie : décrivez l'état désiré, laissez les modules gérer les détails de l'OS.",
        ],
      },
    ],
  },
  {
    id: "erreurs-frequentes",
    title: "Erreurs fréquentes et solutions",
    level: 3,
    intro:
      "Les pièges classiques, avec le diagnostic et le correctif pour chacun.",
    blocks: [
      {
        kind: "fields",
        title: "Diagnostic express",
        fields: [
          {
            label: "UNREACHABLE — échec SSH",
            value:
              "Cause : clé non déployée, mauvais utilisateur, ou pare-feu. Testez `ssh` manuellement avec les mêmes paramètres avant tout. Vérifiez aussi `ansible_host` dans l'inventaire.",
          },
          {
            label: "« Failed to connect to the host via ssh » + mot de passe demandé",
            value:
              "L'authentification par clé ne fonctionne pas : `ssh-copy-id` n'a pas été fait, ou `ansible_ssh_private_key_file` pointe vers le mauvais fichier.",
          },
          {
            label: "« variable is undefined »",
            value:
              "Une variable `{{ ma_var }}` n'est définie nulle part. Utilisez `| default(...)` pour les variables optionnelles, ou définissez-la dans `group_vars` / `-e`.",
          },
          {
            label: "Erreur d'indentation YAML",
            value:
              "Souvent un mélange d'espaces et de tabulations, ou un niveau d'indentation incohérent. Validez le fichier avec un linter YAML ou `ansible-lint`.",
          },
          {
            label: "Permission denied sur une tâche",
            value:
              "Il manque `become: true` : la tâche nécessite des droits root (installation de paquets, écriture dans /etc).",
          },
          {
            label: "Le playbook réussit mais rien ne change (à tort)",
            value:
              "Souvent un `when` toujours faux, ou un `--limit` / `--tags` qui exclut les tâches visées. Relancez avec `-v` pour voir quelles tâches sont sautées et pourquoi.",
          },
          {
            label: "Module introuvable",
            value:
              "Collection manquante : `ansible-galaxy collection install` puis vérifiez le nom fully qualified (`community.docker.docker_container`, pas `docker_container` seul).",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-avance",
    title: "Déboguer comme un pro",
    level: 3,
    intro:
      "Les options de verbosité et d'exécution partielle transforment un playbook opaque en exécution lisible.",
    blocks: [
      {
        kind: "command",
        label: "Augmenter la verbosité",
        command: "ansible-playbook -i inventory.ini site.yml -vvv --limit srv-test-1",
        why: "Chaque `-v` ajoute un niveau de détail : `-v` montre les résultats des tâches, `-vvv` affiche les commandes SSH exactes et les réponses brutes. Le premier réflexe face à un échec incompréhensible.",
      },
      {
        kind: "command",
        label: "Reprendre à la tâche en échec",
        command: "ansible-playbook -i inventory.ini site.yml --start-at-task \"Déployer la configuration\"",
        why: "Reprend l'exécution à une tâche nommée au lieu de tout rejouer depuis le début. Précieux sur les playbooks longs ; le nom doit correspondre exactement au `name:` de la tâche.",
      },
      {
        kind: "list",
        items: [
          "`--step` demande confirmation avant chaque tâche : le mode pas-à-pas pour comprendre un playbook inconnu.",
          "`--diff` affiche les différences de fichiers avant/après pour les modules qui modifient des fichiers.",
          "Le module `debug` avec `var: ma_variable` affiche le contenu brut d'une variable à un point précis.",
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques de projet",
    level: 3,
    intro:
      "Les conventions qui distinguent un dépôt Ansible maintenable d'un tas de YAML.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un dépôt par périmètre (ou un monorepo `infra/` avec `inventories/`, `playbooks/`, `roles/`) : l'important est la structure prévisible.",
          "Séparez les inventaires par environnement : `inventories/staging/` et `inventories/production/` avec leurs `group_vars` propres.",
          "Nommez chaque tâche et chaque play : les logs d'exécution sont la documentation d'exploitation.",
          "Versionnez tout, y compris `requirements.yml` et `ansible.cfg` : un clone frais doit suffire à tout rejouer.",
          "Ne mettez jamais de secret en clair : Vault pour les variables, `no_log: true` pour les tâches sensibles.",
          "Testez les rôles critiques avec Molecule et lintze en CI avec `ansible-lint`.",
          "Documentez chaque rôle dans un `README.md` : variables d'entrée, exemple d'utilisation, prérequis.",
        ],
      },
    ],
  },
  {
    id: "projets-realistes",
    title: "Projets réalistes : 3 niveaux",
    level: 3,
    intro:
      "Trois projets progressifs pour passer de la théorie à une vraie flotte automatisée.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Provisionner un VPS complet",
        fields: [
          {
            label: "Objectif",
            value:
              "Prendre un VPS vierge et le rendre prêt pour la production : utilisateur de déploiement, clé SSH, pare-feu (UFW), fail2ban, Nginx, certificat TLS.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Inventaire, modules `user`/`apt`/`ufw`/`service`, templates Jinja2, handlers, `--check` avant application.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "Le cycle complet inventaire → playbook → idempotence, et pourquoi un serveur provisionné par playbook se reconstruit en minutes.",
          },
          {
            label: "Difficulté",
            value: "Débutant — un week-end.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — Rôle réutilisable multi-environnements",
        fields: [
          {
            label: "Objectif",
            value:
              "Transformer le playbook du projet 1 en rôle paramétré (`defaults/`, `templates/`, `handlers/`), déployé sur staging puis production avec des variables différentes.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "`ansible-galaxy init`, `group_vars` par environnement, Vault pour les secrets, `--limit` pour déployer par étapes.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "La factorisation : un seul rôle, plusieurs environnements, zéro duplication. La base du travail en équipe sur l'infrastructure.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — deux semaines.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Flotte complète avec CI",
        fields: [
          {
            label: "Objectif",
            value:
              "Automatiser une flotte réaliste (web + base + monitoring) avec inventaire dynamique, tests Molecule sur les rôles critiques, `ansible-lint` en CI, et déploiement automatisé après merge.",
          },
          {
            label: "Compétences mobilisées",
            value:
              "Inventaires dynamiques, `serial` pour les rolling updates, blocks `rescue` pour le rollback, pipeline CI qui lint, teste et déploie.",
          },
          {
            label: "Ce que vous apprenez",
            value:
              "L'exploitation à l'échelle : comment une équipe gère des dizaines de serveurs sans intervention manuelle, avec des garde-fous à chaque étape.",
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
          "Documentation Ansible — https://docs.ansible.com/",
          "Guide de l'utilisateur (playbooks, inventaires) — https://docs.ansible.com/ansible/latest/user_guide/index.html",
          "Référence des modules — https://docs.ansible.com/ansible/latest/collections/index.html",
          "Ansible Galaxy (rôles et collections) — https://galaxy.ansible.com/",
          "Bonnes pratiques officielles — https://docs.ansible.com/ansible/latest/tips_tricks/index.html",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Ansible maîtrisé dans ses fondamentaux : les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "fields",
        title: "Les prochaines étapes",
        fields: [
          {
            label: "Terraform (`terraform`)",
            value:
              "Le complément naturel : Terraform crée l'infrastructure (VM, réseaux), Ansible la configure. Les deux outils couvrent ensemble tout le cycle de vie d'une infrastructure.",
          },
          {
            label: "Docker (`docker`) et Kubernetes (`kubernetes`)",
            value:
              "Automatiser le déploiement d'applications conteneurisées : Ansible peut provisionner les nœuds pendant que Kubernetes orchestre les conteneurs.",
          },
          {
            label: "CI/CD (`cicd`, `github-actions`)",
            value:
              "Exécuter les playbooks depuis un pipeline : lint, tests Molecule et déploiement automatique après chaque merge.",
          },
          {
            label: "Linux avancé (`linux`) et scripting (`bash`)",
            value:
              "Approfondir ce qu'Ansible automatise : plus votre maîtrise système est solide, plus vos playbooks sont pertinents et sûrs.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le signe que vous maîtrisez Ansible : vous ne vous connectez plus jamais en SSH pour « juste changer un truc » — tout passe par un playbook versionné.",
      },
    ],
  },
  {
    id: "verifier-sans-changer",
    title: "Vérifier sans changer : check et diff",
    level: 3,
    intro:
      "Prédire l'effet d'un playbook sans l'appliquer : l'assurance qualité d'Ansible.",
    blocks: [
      {
        kind: "command",
        label: "Dry-run avec diff",
        command: "ansible-playbook --check --diff site.yml",
        why: "Exécute le playbook en mode simulation (`--check` : aucune modification appliquée) et affiche les différences (`--diff` : ce qui changerait). Le « qu'est-ce qui va se passer ? » avant le vrai run.",
      },
      {
        kind: "list",
        items: [
          "Combinez avec `--limit` : testez d'abord sur un hôte canari avant le parc entier.",
          "Certaines tâches ne supportent pas le check mode (commandes ad hoc) : marquez les lectures `changed_when: false` et forcez `check_mode: false` pour les sondes indispensables.",
          "Intégrez le `--check` dans la CI : tout playbook mergé doit passer le dry-run sans erreur.",
        ],
      },
    ],
  },
  {
    id: "environnements-execution",
    title: "Environnements d'exécution",
    level: 3,
    intro:
      "Isoler les dépendances d'Ansible (collections, Python) dans des conteneurs reproductibles.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un Execution Environment (EE) est une image de conteneur contenant Ansible, vos collections et leurs dépendances Python : le même playbook tourne pareil partout.",
          "`ansible-builder` construit l'image depuis un fichier `execution-environment.yml` déclaratif.",
          "`ansible-navigator` exécute les playbooks dans l'EE : `ansible-navigator run site.yml -eei mon-ee:latest`.",
          "Bénéfice : fini les « ça marchait sur ma machine » dus à des versions de collections différentes entre postes.",
          "Pour les usages simples, l'EE par défaut suffit ; construisez le vôtre quand vos rôles exigent des dépendances spécifiques.",
        ],
      },
    ],
  },
];

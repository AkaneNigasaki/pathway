import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de la sécurité système — posture STRICTEMENT
 * DÉFENSIVE : durcir, surveiller et défendre ses propres systèmes.
 * Ne couvre que des systèmes possédés ou audités avec autorisation écrite.
 * Aucune technique offensive (exploitation, élévation, persistance, attaque).
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_SYSTEM_SECURITY: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est la sécurité système défensive : protéger ses machines et ses services contre les compromissions, par le durcissement, la surveillance et la réaction.",
    blocks: [
      {
        kind: "text",
        text: "La sécurité système défensive consiste à rendre ses propres systèmes difficiles à compromettre et rapides à rétablir : mises à jour, pare-feu, accès SSH durci, moindre privilège, sauvegardes, journaux surveillés. C'est le versant « gardien » de la cybersécurité — on ne cherche pas des failles chez les autres, on ferme les portes de chez soi.",
      },
      {
        kind: "text",
        text: "Pourquoi ça existe : la majorité des compromissions n'utilisent pas des techniques sophistiquées — elles exploitent des systèmes non patchés, des mots de passe faibles, des services exposés inutilement et des sauvegardes absentes. Les bases défensives éliminent l'essentiel du risque, avec des moyens à la portée de tous.",
      },
      {
        kind: "text",
        text: "Durcir ses propres systèmes, surveiller leur état, et savoir réagir quand quelque chose cloche.",
      },
      {
        kind: "text",
        text: "Parce que les attaquants automatisent la recherche de systèmes négligés : un système maintenu n'est pas une cible rentable.",
      },
      {
        kind: "fields",
        title: "La sécurité système : l'essentiel",
        fields: [          {
            label: "Périmètre strict",
            value:
              "Uniquement vos propres systèmes, ou ceux que vous auditez avec une autorisation écrite explicite. Tout le reste est hors sujet — et illégal.",
          },
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni du piratage, ni des techniques d'intrusion : ce guide ne contient aucune procédure offensive.",
          },
        ],
      },
    ],
  },
  {
    id: "posture-defensive",
    title: "La posture défensive",
    level: 1,
    intro:
      "Le cadre : ce qu'on protège, contre quoi, et dans quelles limites.",
    blocks: [
      {
        kind: "diagram",
        title: "Défendre en couches",
        lines: [
          "Surface d'attaque (ce que voit l'attaquant)",
          "  → mises à jour, pare-feu, services minimaux",
          "     │",
          "Accès (qui entre)",
          "  → SSH par clés, sudo, mots de passe forts, 2FA",
          "     │",
          "Données (ce qu'on protège)",
          "  → permissions, chiffrement, sauvegardes 3-2-1",
          "     │",
          "Détection (voir l'anormal)",
          "  → journaux, fail2ban, monitoring, alertes",
          "     │",
          "Réaction (quand ça arrive)",
          "  → plan d'incident, isolation, restauration",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : la défense en profondeur — aucune couche n'est parfaite, mais leur superposition rend l'attaque coûteuse et la détection probable. Et la règle d'or : on ne teste la sécurité que sur ses propres systèmes.",
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
      "Ce qu'il faut connaître avant de durcir un système.",
    blocks: [
      {
        kind: "fields",
        title: "Les fondations",
        fields: [
          {
            label: "Linux (bases solides)",
            value:
              "Terminal, fichiers, permissions, services systemd : on sécurise ce qu'on comprend.",
          },
          {
            label: "Réseau (bases)",
            value:
              "Ports, TCP/UDP, pare-feu : savoir ce qui est exposé.",
          },
          {
            label: "SSH",
            value:
              "Connexion distante, clés : le principal point d'accès à sécuriser.",
          },
          {
            label: "Un système à soi",
            value:
              "VM locale ou serveur personnel : on n'applique ces mesures que sur ses propres machines.",
          },
        ],
      },
    ],
  },
  {
    id: "perimetre-autorisation",
    title: "Périmètre et autorisation",
    level: 2,
    intro:
      "La règle non négociable : où s'arrête votre droit d'agir.",
    blocks: [
      {
        kind: "list",
        items: [
          "Vos systèmes : vos machines, vos VM, vos serveurs — vous faites ce que vous voulez.",
          "Systèmes tiers : UNIQUEMENT avec une autorisation écrite explicite (périmètre, dates, méthodes autorisées).",
          "Sans autorisation, même « juste regarder » ou « tester une petite chose » est illégal dans la plupart des juridictions.",
          "En entreprise : l'autorisation vient du responsable sécurité ou de la direction, par écrit, avant toute action.",
          "Ce guide ne décrit aucune technique d'intrusion : si vous cherchez à « tester » un système qui n'est pas le vôtre, arrêtez-vous ici.",
        ],
      },
    ],
  },
  {
    id: "mises-a-jour",
    title: "Mises à jour : le patching",
    level: 2,
    intro:
      "La mesure la plus rentable : corriger les vulnérabilités connues.",
    blocks: [
      {
        kind: "command",
        label: "Mettre à jour un système Debian/Ubuntu",
        command: "sudo apt update && sudo apt upgrade -y",
        why: "`apt update` recharge la liste des paquets, `apt upgrade` installe les correctifs de sécurité. La majorité des compromissions exploitent des failles corrigées depuis des mois : un système à jour élimine cette catégorie entière d'attaques.",
        verify: "apt list --upgradable",
      },
      {
        kind: "list",
        items: [
          "Automatisez : `unattended-upgrades` applique les patchs de sécurité sans intervention.",
          "Planifiez les redémarrages après les mises à jour du noyau : un patch non appliqué (noyau en attente de reboot) ne protège pas.",
          "Mettez à jour aussi les applications (CMS, dépendances) : le système patché avec WordPress obsolète reste vulnérable.",
        ],
      },
    ],
  },
  {
    id: "pare-feu-ufw",
    title: "Pare-feu : UFW",
    level: 2,
    intro:
      "N'exposer que le nécessaire : le pare-feu par défaut qui refuse tout.",
    blocks: [
      {
        kind: "command",
        label: "Politique par défaut + SSH",
        command: "sudo ufw default deny incoming && sudo ufw allow 22/tcp",
        why: "On refuse TOUT le trafic entrant par défaut, puis on n'ouvre que le port SSH (22/tcp). C'est le principe du moindre privilège réseau : chaque port ouvert est une porte — on n'ouvre que celles dont on a besoin.",
      },
      {
        kind: "command",
        label: "Activer et vérifier",
        command: "sudo ufw enable && sudo ufw status verbose",
        why: "Active le pare-feu (attention : sur un serveur distant, ouvrez SSH AVANT d'activer, sinon vous vous enfermez dehors) et affiche les règles actives. La vérification fait partie de la mesure : une règle qu'on ne contrôle pas n'existe pas.",
        verify: "sudo ufw status numbered",
      },
      {
        kind: "text",
        text: "Ajoutez ensuite uniquement les ports nécessaires (`sudo ufw allow 80,443/tcp` pour un serveur web). Auditez régulièrement : `sudo ufw status` doit rester court et compris.",
      },
    ],
  },
  {
    id: "ssh-durcissement",
    title: "Durcir SSH",
    level: 2,
    intro:
      "Le point d'accès n°1 : le verrouiller correctement.",
    blocks: [
      {
        kind: "command",
        label: "Générer une clé moderne",
        command: "ssh-keygen -t ed25519 -C \"admin@serveur\"",
        why: "Crée une paire de clés Ed25519 (standard actuel : sûre et rapide). La clé privée reste sur votre machine, la publique va sur le serveur : plus de mot de passe à deviner pour l'attaquant.",
        verify: "ls -l ~/.ssh/id_ed25519*",
      },
      {
        kind: "code",
        language: "text",
        title: "/etc/ssh/sshd_config — durcissement",
        code: "PasswordAuthentication no\nPermitRootLogin no\nAllowUsers deploy\nMaxAuthTries 3",
      },
      {
        kind: "command",
        label: "Appliquer la configuration",
        command: "sudo sshd -t && sudo systemctl reload sshd",
        why: "`sshd -t` valide la syntaxe AVANT de recharger : une erreur de config peut vous enfermer dehors. `reload` applique sans couper les sessions existantes. Testez toujours une nouvelle connexion dans un second terminal avant de fermer l'actuelle.",
        verify: "sudo sshd -T | grep -i passwordauthentication",
      },
      {
        kind: "text",
        text: "Ce que fait chaque directive : pas d'authentification par mot de passe (clés uniquement), pas de connexion root directe (passez par un utilisateur + sudo), seuls les utilisateurs listés peuvent se connecter, 3 essais maximum. Changez aussi le port par défaut (22) : ça ne « sécurise » pas vraiment, mais ça élimine 99 % du bruit des scans automatiques dans vos logs.",
      },
    ],
  },
  {
    id: "utilisateurs-sudo",
    title: "Utilisateurs et sudo : moindre privilège",
    level: 2,
    intro:
      "Personne ne travaille en root : des comptes nominatifs avec juste ce qu'il faut.",
    blocks: [
      {
        kind: "command",
        label: "Créer un utilisateur administrateur",
        command: "sudo adduser deploy && sudo usermod -aG sudo deploy",
        why: "`adduser` crée un compte nominatif (traçabilité : on sait QUI a fait quoi), `usermod -aG sudo` lui donne le droit d'élever ses privilèges via `sudo`. Le root direct est désactivé : chaque action privilégiée est journalisée avec l'utilisateur.",
        verify: "id deploy",
      },
      {
        kind: "list",
        items: [
          "Un compte par personne : jamais de compte partagé « admin » (impossible d'attribuer une action).",
          "Désactivez les comptes inutiles, supprimez ceux des départs.",
          "`sudo` demande le mot de passe par défaut : c'est une protection, ne la désactivez pas globalement.",
          "Les comptes de service (nginx, postgres) n'ont pas de shell de connexion : ils ne servent qu'à faire tourner le service.",
        ],
      },
    ],
  },
  {
    id: "permissions",
    title: "Permissions de fichiers",
    level: 2,
    intro:
      "Qui lit quoi : les permissions qui protègent les secrets.",
    blocks: [
      {
        kind: "command",
        label: "Protéger les clés SSH",
        command: "chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys",
        why: "Le répertoire `.ssh` lisible par le seul propriétaire (700), les clés autorisées en lecture seule propriétaire (600). SSH REFUSE de fonctionner avec des permissions trop ouvertes : c'est une protection, pas un caprice.",
        verify: "ls -la ~/.ssh",
      },
      {
        kind: "list",
        items: [
          "Fichiers de secrets (clés, tokens) : toujours `600` (propriétaire seul).",
          "Scripts et configs sensibles : `640` ou `600` selon le besoin, jamais `777`.",
          "Vérifiez régulièrement : `find /etc -perm -o+w` liste les fichiers système modifiables par tous (anormal).",
        ],
      },
    ],
  },
  {
    id: "services-inutiles",
    title: "Réduire la surface : services inutiles",
    level: 2,
    intro:
      "Chaque service qui tourne est une cible potentielle : éteignez le reste.",
    blocks: [
      {
        kind: "command",
        label: "Lister les ports en écoute",
        command: "ss -tulpn",
        why: "`ss` (successeur de netstat) liste les ports en écoute avec le processus associé. Chaque ligne est une question : « ce service doit-il être exposé ? » Si la réponse est non, on le désactive.",
        verify: "ss -tlnp",
      },
      {
        kind: "command",
        label: "Désactiver un service inutile",
        command: "sudo systemctl disable --now nom-du-service",
        why: "Arrête le service immédiatement (`--now`) et l'empêche de redémarrer au boot (`disable`). Un service désinstallé vaut mieux qu'un service désactivé : `sudo apt remove` supprime aussi ses vulnérabilités.",
      },
      {
        kind: "text",
        text: "Principe : le serveur idéal n'expose que ce qu'il sert. Un serveur web n'a pas besoin d'un serveur FTP, d'une base exposée sur le réseau, ni d'un panel d'admin sur un port exotique.",
      },
    ],
  },
  {
    id: "mots-de-passe",
    title: "Mots de passe et authentification",
    level: 2,
    intro:
      "Le maillon humain : des secrets que les machines ne devinent pas.",
    blocks: [
      {
        kind: "list",
        items: [
          "Gestionnaire de mots de passe : un mot de passe unique et fort par service — le cerveau ne peut pas, le gestionnaire si.",
          "Longueur > complexité : une phrase de passe de 5 mots bat `P@ssw0rd!` et se retient.",
          "Double authentification (2FA) partout où c'est proposé : le mot de passe seul ne suffit plus.",
          "Jamais de mot de passe par défaut : premier démarrage = premier changement (routeurs, caméras, applications).",
          "Jamais de mot de passe en clair : ni dans le code, ni dans les scripts, ni dans les emails.",
        ],
      },
    ],
  },
  {
    id: "sauvegardes",
    title: "Sauvegardes : le dernier rempart",
    level: 2,
    intro:
      "Quand tout le reste échoue (rançongiciel, erreur humaine), la sauvegarde sauve.",
    blocks: [
      {
        kind: "command",
        label: "Sauvegarde avec rsync",
        command: "rsync -avz --delete /var/www/ /backup/www/",
        why: "`rsync` copie efficacement (seules les différences), `-a` préserve permissions et dates, `-z` compresse, `--delete` synchronise les suppressions. C'est la brique de base des sauvegardes locales avant d'ajouter rotation et chiffrement.",
        verify: "ls -la /backup/www/ | head",
      },
      {
        kind: "fields",
        title: "La règle 3-2-1",
        fields: [
          {
            label: "3 copies",
            value: "L'original + 2 sauvegardes. Une seule copie n'est pas une sauvegarde.",
          },
          {
            label: "2 supports différents",
            value: "Disque local + disque externe ou cloud : un incendie ne doit pas tout prendre.",
          },
          {
            label: "1 hors site",
            value: "Au moins une copie loin de la machine (cloud chiffré, autre lieu) : contre le vol et le sinistre.",
          },
          {
            label: "1 testée",
            value: "Le +1 officieux : une sauvegarde non testée est un espoir, pas une sauvegarde. Restaurez régulièrement.",
          },
        ],
      },
    ],
  },
  {
    id: "journaux",
    title: "Journaux : voir ce qui se passe",
    level: 2,
    intro:
      "Les logs sont les yeux : savoir les lire quand quelque chose cloche.",
    blocks: [
      {
        kind: "command",
        label: "Erreurs récentes du système",
        command: "journalctl -p err --since \"1 hour ago\"",
        why: "Affiche les erreurs (priorité `err` et plus grave) de la dernière heure : le premier regard en cas de comportement anormal. `journalctl` centralise les logs systemd — plus besoin de fouiller dix fichiers.",
        verify: "journalctl --disk-usage",
      },
      {
        kind: "command",
        label: "Tentatives SSH",
        command: "journalctl -u ssh --since \"1 hour ago\" | grep -i \"failed\"",
        why: "Les tentatives de connexion SSH échouées : quelques-unes = bruit de fond normal d'internet ; des centaines depuis une même IP = attaque par force brute en cours (à bloquer via fail2ban, niveau 3).",
      },
      {
        kind: "list",
        items: [
          "Conservez les logs assez longtemps (rotation configurée) : une intrusion se découvre souvent des semaines après.",
          "Les logs partent vers un serveur distant si possible : un attaquant qui compromet la machine efface les logs locaux.",
          "Ne loguez jamais de mots de passe ni de tokens, même « pour débugger ».",
        ],
      },
    ],
  },
  {
    id: "malwares-edr",
    title: "Malwares : antivirus et EDR",
    level: 2,
    intro:
      "La protection contre les logiciels malveillants, sur serveurs comme sur postes.",
    blocks: [
      {
        kind: "text",
        text: "Sur Linux serveur, les malwares sont rares mais existent (cryptomineurs via failles web, rootkits). Les mesures : antivirus (ClamAV en scan périodique des uploads), et surtout la prévention (patching, moindre exposition) qui bloque les vecteurs d'entrée. Sur les postes, un EDR moderne (détection comportementale) complète l'antivirus classique.",
      },
      {
        kind: "list",
        items: [
          "Scannez ce qui vient de l'extérieur : pièces jointes, uploads utilisateurs, fichiers téléchargés.",
          "Un comportement anormal (CPU à 100 % sans raison, trafic sortant bizarre) mérite investigation avant tout.",
          "Aucun antivirus ne remplace le patching : la plupart des malwares Linux exploitent des failles connues.",
        ],
      },
    ],
  },
  {
    id: "verifier-durcissement",
    title: "Vérifier son durcissement",
    level: 2,
    intro:
      "Un durcissement non vérifié est une supposition : la checklist.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Pare-feu actif et minimal",
            detail:
              "`sudo ufw status` : actif, politique deny, seuls les ports nécessaires ouverts.",
          },
          {
            title: "SSH verrouillé",
            detail:
              "Clés uniquement (`PasswordAuthentication no` vérifié via `sshd -T`), root désactivé, test depuis un second terminal.",
          },
          {
            title: "Système à jour",
            detail:
              "`apt list --upgradable` vide (ou avec unattended-upgrades actif), pas de reboot en attente.",
          },
          {
            title: "Surface réduite",
            detail:
              "`ss -tulpn` : chaque port en écoute est justifié et connu.",
          },
          {
            title: "Sauvegarde testée",
            detail:
              "Une restauration d'essai récente, documentée : la sauvegarde existe et fonctionne.",
          },
        ],
      },
    ],
  },
  {
    id: "flux-defense",
    title: "Le flux de défense continue",
    level: 3,
    intro:
      "Le durcissement n'est pas un projet : c'est une routine.",
    blocks: [
      {
        kind: "diagram",
        title: "La boucle défensive",
        lines: [
          "Durcir (baseline initiale)",
          "     ↓",
          "Surveiller (logs, alertes, scans)",
          "     ↓",
          "Détecter (anomalie ?)",
          "     ├─→ non : patcher, améliorer, recommencer",
          "     ↓ oui",
          "Réagir (isoler, analyser, restaurer)",
          "     ↓",
          "Apprendre (post-mortem → durcir davantage)",
          "     ↓",
          " (boucle)",
        ],
      },
      {
        kind: "text",
        text: "La sécurité est un processus, pas un état : chaque tour de boucle rend le système un peu plus résistant. L'objectif n'est pas l'invulnérabilité (impossible) mais de rendre l'attaque non rentable et la détection rapide.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "fail2ban",
    title: "Fail2ban : bannir les attaquants",
    level: 3,
    intro:
      "Bloquer automatiquement les IP qui tentent des connexions en force.",
    blocks: [
      {
        kind: "command",
        label: "Installer fail2ban",
        command: "sudo apt install -y fail2ban",
        why: "Fail2ban surveille les logs (SSH par défaut) et bannit temporairement les IP avec trop d'échecs, via le pare-feu. C'est la réponse automatique aux attaques par force brute : l'attaquant est éjecté avant d'avoir essayé assez de combinaisons.",
        verify: "sudo fail2ban-client status",
      },
      {
        kind: "command",
        label: "Vérifier la prison SSH",
        command: "sudo fail2ban-client status sshd",
        why: "Affiche les IP actuellement bannies pour SSH : la preuve que la protection fonctionne. En cas de bannissement légitime (vous-même), `sudo fail2ban-client set sshd unbanip <IP>` débloque.",
        verify: "sudo fail2ban-client get sshd banip --with-time 2>/dev/null | head",
      },
      {
        kind: "text",
        text: "Fail2ban complète (ne remplace pas) l'authentification par clés : avec `PasswordAuthentication no`, la force brute est déjà inefficace — fail2ban réduit en plus le bruit et la charge. Configurez les durées de ban dans `/etc/fail2ban/jail.local` (jamais en modifiant les fichiers par défaut).",
      },
    ],
  },
  {
    id: "lynis-audit",
    title: "Auditer avec Lynis",
    level: 3,
    intro:
      "Un audit automatisé de votre propre système : des centaines de contrôles.",
    blocks: [
      {
        kind: "command",
        label: "Auditer le système",
        command: "sudo apt install -y lynis && sudo lynis audit system",
        why: "Lynis (outil d'audit open source) passe des centaines de contrôles défensifs sur VOTRE système : permissions, configuration SSH, pare-feu, patchs, services — et produit un score avec des recommandations priorisées. C'est un regard extérieur automatisé sur votre durcissement.",
        verify: "lynis --version",
      },
      {
        kind: "text",
        text: "Lisez le rapport par priorité : corrigez d'abord les avertissements rouges (risques élevés), puis les suggestions. Relancez après corrections : le score doit monter. Lynis s'utilise uniquement sur ses propres systèmes — c'est un outil d'auto-audit.",
      },
    ],
  },
  {
    id: "sysctl-durcissement",
    title: "Durcissement noyau : sysctl",
    level: 3,
    intro:
      "Paramètres réseau du noyau : fermer les comportements à risque.",
    blocks: [
      {
        kind: "code",
        language: "text",
        title: "/etc/sysctl.d/99-durcissement.conf",
        code: "# Ignorer les redirections ICMP (évite la manipulation du routage)\nnet.ipv4.conf.all.accept_redirects = 0\nnet.ipv4.conf.default.accept_redirects = 0\n\n# Ignorer les pings broadcast (réduit la visibilité)\nnet.ipv4.icmp_echo_ignore_broadcasts = 1\n\n# Activer la protection SYN cookies (contre le SYN flood)\nnet.ipv4.tcp_syncookies = 1\n\n# Ne pas forwarder entre interfaces (sauf routeur)\nnet.ipv4.ip_forward = 0",
      },
      {
        kind: "command",
        label: "Appliquer",
        command: "sudo sysctl --system",
        why: "Recharge tous les fichiers sysctl dont le nouveau : les paramètres prennent effet immédiatement et persistent après reboot (fichier dans `/etc/sysctl.d/`). Vérifiez avec `sysctl net.ipv4.tcp_syncookies`.",
        verify: "sysctl net.ipv4.ip_forward net.ipv4.tcp_syncookies",
      },
      {
        kind: "text",
        text: "Chaque paramètre désactive un comportement réseau rarement utile et potentiellement abusé. Documentez ce que vous changez : un sysctl agressif peut casser des usages légitimes (le forwarding, par exemple, est nécessaire sur un routeur/VPN).",
      },
    ],
  },
  {
    id: "auditd",
    title: "Audit : tracer avec auditd",
    level: 3,
    intro:
      "Enregistrer qui accède aux fichiers sensibles : la piste d'audit.",
    blocks: [
      {
        kind: "text",
        text: "auditd (Linux Auditing) enregistre les événements système définis par règles : accès à `/etc/shadow`, modifications de la config SSH, exécutions suspectes. C'est la « boîte noire » : en cas d'incident, on sait qui a touché quoi et quand.",
      },
      {
        kind: "code",
        language: "text",
        title: "Règles d'audit (exemples)",
        code: "# Surveiller les accès aux secrets d'authentification\n-w /etc/shadow -p wa -k identifiants\n-w /etc/ssh/sshd_config -p wa -k ssh_config",
      },
      {
        kind: "command",
        label: "Consulter la piste d'audit",
        command: "sudo ausearch -k ssh_config --start recent",
        why: "`ausearch` interroge les logs d'audit par clé : qui a modifié la config SSH récemment ? En investigation d'incident, c'est la première source de vérité — à condition que les règles aient été en place AVANT l'incident.",
        verify: "sudo auditctl -l",
      },
    ],
  },
  {
    id: "apparmor-selinux",
    title: "Confinement : AppArmor / SELinux",
    level: 3,
    intro:
      "Limiter ce qu'un programme compromis peut faire : le confinement obligatoire.",
    blocks: [
      {
        kind: "text",
        text: "Même avec les bonnes permissions Unix, un service compromis (ex. serveur web piraté) hérite des droits de son utilisateur. AppArmor (Ubuntu/Debian) et SELinux (RHEL) ajoutent une couche : chaque programme n'a accès qu'aux fichiers et actions de son profil. Un nginx compromis ne peut pas lire `/etc/shadow` même s'il tourne en root — le profil l'interdit.",
      },
      {
        kind: "list",
        items: [
          "Sur Ubuntu, AppArmor est actif par défaut : vérifiez avec `aa-status`.",
          "Ne désactivez jamais le confinement « parce que ça bloque » : corrigez le profil, c'est lui qui vous protège.",
          "En cas de comportement bloqué, les logs (`dmesg`, `/var/log/audit/`) disent quelle règle a refusé quoi.",
        ],
      },
    ],
  },
  {
    id: "chiffrement",
    title: "Chiffrement des disques",
    level: 3,
    intro:
      "Protéger les données au repos : le vol de machine ne doit pas être un vol de données.",
    blocks: [
      {
        kind: "text",
        text: "Le chiffrement intégral du disque (LUKS sur Linux, BitLocker/FileVault sur les postes) rend les données illisibles sans la phrase de passe : un disque volé ou jeté ne fuit rien. C'est indispensable pour les portables et les serveurs physiquement accessibles.",
      },
      {
        kind: "list",
        items: [
          "Chiffrez les sauvegardes aussi : une sauvegarde non chiffrée annule le chiffrement du disque.",
          "La phrase de passe LUKS doit être forte et conservée hors de la machine (gestionnaire de mots de passe).",
          "Le chiffrement ne protège pas une machine allumée et compromise : il protège contre l'accès physique.",
        ],
      },
    ],
  },
  {
    id: "segmentation-reseau",
    title: "Segmentation réseau",
    level: 3,
    intro:
      "Compartimenter : limiter la propagation en cas de compromission.",
    blocks: [
      {
        kind: "text",
        text: "La segmentation sépare le réseau en zones (DMZ pour les services publics, réseau interne, management) avec des pare-feu entre elles : un serveur web compromis ne peut pas atteindre directement la base de données ni les postes. Le modèle « zero trust » pousse la logique plus loin : chaque connexion est authentifiée et autorisée, même en interne.",
      },
      {
        kind: "list",
        items: [
          "La base de données n'écoute que sur le réseau applicatif, jamais sur internet.",
          "L'administration (SSH) passe par un bastion ou un VPN, pas directement exposée.",
          "En cas d'incident, la segmentation contient : on isole la zone compromise sans tout couper.",
        ],
      },
    ],
  },
  {
    id: "detection-intrusion",
    title: "Détection d'intrusion : IDS",
    level: 3,
    intro:
      "Voir les attaques sur le réseau : les systèmes de détection.",
    blocks: [
      {
        kind: "text",
        text: "Un IDS (ex. Suricata, Snort) analyse le trafic réseau et alerte sur les signatures d'attaques connues et les comportements suspects : scans de ports, exploitations, exfiltrations. En mode IPS, il peut bloquer automatiquement. C'est le complément réseau de la surveillance des logs système.",
      },
      {
        kind: "list",
        items: [
          "Un IDS sans personne pour lire les alertes ne sert à rien : prévoyez le temps d'analyse.",
          "Réglez les faux positifs : un IDS qui crie au loup est désactivé en une semaine.",
          "Le chiffrement (TLS) limite la visibilité réseau : l'IDS voit les métadonnées, pas le contenu — d'où l'importance des logs applicatifs.",
        ],
      },
    ],
  },
  {
    id: "siem",
    title: "Centraliser : SIEM",
    level: 3,
    intro:
      "Quand les logs sont partout : les agréger pour corréler.",
    blocks: [
      {
        kind: "text",
        text: "Un SIEM (Security Information and Event Management) centralise les logs de tous les systèmes et y applique des règles de corrélation : « 5 échecs SSH suivis d'une connexion réussie depuis une IP inconnue » = alerte. Des solutions open source (Wazuh, Security Onion) offrent cela aux petites structures.",
      },
      {
        kind: "list",
        items: [
          "Commencez simple : centraliser les logs (syslog distant) avant de corréler.",
          "Les règles de détection se règlent sur VOS logs : les packs génériques produisent du bruit.",
          "Conservez les logs assez longtemps pour l'investigation (souvent 3-12 mois selon les obligations).",
        ],
      },
    ],
  },
  {
    id: "reponse-incident",
    title: "Réponse à incident",
    level: 3,
    intro:
      "Quand la détection sonne : le plan à suivre, écrit à l'avance.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Isoler",
            detail:
              "Déconnectez la machine compromise du réseau (pas l'éteindre : la mémoire contient des preuves). Contenir d'abord, comprendre ensuite.",
          },
          {
            title: "Préserver les preuves",
            detail:
              "Copie des logs, image disque si nécessaire — sur VOS systèmes, dans le cadre de VOTRE réponse à incident.",
          },
          {
            title: "Analyser",
            detail:
              "Point d'entrée ? Étendue ? Données touchées ? Les logs centralisés et auditd racontent l'histoire.",
          },
          {
            title: "Éradiquer et restaurer",
            detail:
              "Reconstruction depuis une source saine (image propre + sauvegarde vérifiée), pas « nettoyage » d'un système compromis — on ne fait jamais confiance à une machine compromise.",
          },
          {
            title: "Post-mortem",
            detail:
              "Comment l'attaquant est-il entré ? Quelle mesure l'aurait bloqué ? Le plan et le durcissement s'améliorent à chaque incident.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le plan d'incident s'écrit AVANT l'incident : contacts, rôles, procédures, obligations légales de notification (les violations de données personnelles se déclarent aux autorités sous des délais courts). En plein incident, on exécute — on n'improvise pas.",
      },
    ],
  },
  {
    id: "patch-management",
    title: "Gestion des patchs à l'échelle",
    level: 3,
    intro:
      "Patcher une machine c'est bien, patcher cent machines c'est un processus.",
    blocks: [
      {
        kind: "list",
        items: [
          "Inventaire : on ne patche que ce qu'on connaît — maintenez la liste des systèmes et de leurs versions.",
          "Priorisation : les vulnérabilités critiques exposées d'abord (score CVSS + exploitabilité + exposition).",
          "Fenêtres de maintenance : les patchs se testent en staging puis se déploient par vagues, avec rollback possible.",
          "Automatisation : unattended-upgrades pour les patchs de sécurité, outils de gestion de flotte au-delà.",
          "Vérification : un scan post-patch confirme que les vulnérabilités sont corrigées.",
        ],
      },
    ],
  },
  {
    id: "inventaire-actifs",
    title: "Inventaire et gestion des vulnérabilités",
    level: 3,
    intro:
      "Scanner SES propres systèmes pour trouver les failles avant les attaquants.",
    blocks: [
      {
        kind: "text",
        text: "La gestion des vulnérabilités défensive : scanner régulièrement ses propres systèmes (avec autorisation — ce sont les vôtres) pour identifier les failles connues, puis les corriger par priorité. Des scanners comme OpenVAS/Greenbone ou Nessus (sur votre périmètre) listent les CVE affectant vos versions.",
      },
      {
        kind: "list",
        items: [
          "Scannez uniquement votre périmètre autorisé : un scan hors périmètre est une agression.",
          "Priorisez par exploitabilité réelle, pas par score brut : une CVE critique sur un service non exposé attendra.",
          "Le scan ne remplace pas le patching : il le pilote. Chaque vulnérabilité confirmée devient un ticket avec échéance.",
        ],
      },
    ],
  },
  {
    id: "cis-benchmarks",
    title: "Référentiels : CIS Benchmarks",
    level: 3,
    intro:
      "Ne pas réinventer le durcissement : les guides reconnus.",
    blocks: [
      {
        kind: "text",
        text: "Les CIS Benchmarks sont des guides de durcissement consensuels, par système (Ubuntu, Debian, nginx, Docker…) : des centaines de recommandations notées par niveau (1 = essentiel, 2 = défense en profondeur). Des outils (CIS-CAT, scripts open source) auditent la conformité automatiquement.",
      },
      {
        kind: "list",
        items: [
          "Appliquez le niveau 1 en priorité : le meilleur ratio sécurité/effort.",
          "Adaptez : un benchmark générique peut casser un usage spécifique — testez avant d'appliquer en production.",
          "Les benchmarks sont aussi des arguments : « conforme CIS niveau 1 » est un standard opposable en audit.",
        ],
      },
    ],
  },
  {
    id: "securite-conteneurs",
    title: "Sécuriser les conteneurs",
    level: 3,
    intro:
      "Docker ajoute une couche : la sécuriser aussi.",
    blocks: [
      {
        kind: "list",
        items: [
          "Images minimales et officielles : moins de paquets = moins de vulnérabilités. Scannez les images (`docker scout`, Trivy) avant déploiement.",
          "Pas de root dans le conteneur : `USER` non-privilégié dans le Dockerfile.",
          "Pas de `--privileged`, montages en lecture seule quand possible (`:ro`).",
          "Secrets via variables d'environnement ou gestionnaires, jamais dans l'image.",
          "Mettez à jour les images de base : une image figée il y a un an accumule les CVE.",
        ],
      },
    ],
  },
  {
    id: "cloud-bases",
    title: "Bases de sécurité cloud",
    level: 3,
    intro:
      "Le cloud change le périmètre : les fondamentaux défensifs.",
    blocks: [
      {
        kind: "list",
        items: [
          "IAM : moindre privilège strict, pas de clés d'accès root, rotation des clés, MFA obligatoire.",
          "Stockage : buckets privés par défaut — les fuites par bucket public sont un classique.",
          "Journalisation : activez les logs d'audit du provider (CloudTrail…) dès le premier jour.",
          "Réseau : security groups restrictifs (comme UFW, mais dans le cloud), pas de 0.0.0.0/0 par paresse.",
          "Les outils du provider (Security Hub, GuardDuty) donnent une baseline — à compléter, pas à subir.",
        ],
      },
    ],
  },
  {
    id: "sensibilisation",
    title: "Le facteur humain : phishing",
    level: 3,
    intro:
      "La technique ne suffit pas : la première porte d'entrée est l'humain.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le phishing (emails frauduleux) est le vecteur n°1 : apprenez à le reconnaître (urgence artificielle, expéditeur suspect, liens piégés).",
          "Vérifiez par un second canal : un « virement urgent » demandé par email se confirme par téléphone.",
          "Signalez : un bouton de signalement et une culture sans blâme transforment chaque employé en capteur.",
          "Exercices réguliers : des simulations de phishing mesurent et améliorent la vigilance.",
          "La 2FA limite l'impact d'un mot de passe volé : même phishing réussi, l'attaquant est bloqué.",
        ],
      },
    ],
  },
  {
    id: "conformite",
    title: "Conformité et obligations",
    level: 3,
    intro:
      "La sécurité a aussi un cadre légal : l'essentiel à connaître.",
    blocks: [
      {
        kind: "text",
        text: "Selon les données manipulées et le pays, des obligations s'appliquent : protection des données personnelles (RGPD en Europe — notification des violations sous 72h), standards sectoriels (PCI-DSS pour les paiements, normes de santé), et conservation des preuves. La conformité n'est pas la sécurité, mais elle impose un plancher — et des sanctions.",
      },
      {
        kind: "list",
        items: [
          "Identifiez les réglementations de votre secteur AVANT l'incident.",
          "Documentez vos mesures : en cas de contrôle, « on fait attention » ne suffit pas.",
          "En cas de doute juridique, consultez un professionnel — pas un guide technique.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pièges classiques de la sécurité système, et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Système jamais patché",
            value:
              "Problem : des CVE critiques de 6 mois toujours présentes. Why : « si ça marche, on n'y touche pas ». Better : patchs de sécurité automatiques, reboots planifiés.",
          },
          {
            label: "SSH par mot de passe exposé",
            value:
              "Problem : le port 22 accepte les mots de passe, attaqué en permanence. Why : configuration par défaut. Better : clés uniquement, root désactivé, fail2ban.",
          },
          {
            label: "S'enfermer dehors",
            value:
              "Problem : pare-feu activé avant d'ouvrir SSH, ou `sshd_config` invalide. Why : pas de test. Better : valider (`sshd -t`, `ufw status`), garder une session ouverte pendant les changements.",
          },
          {
            label: "Ports ouverts inutiles",
            value:
              "Problem : des services exposés « au cas où ». Why : jamais audité. Better : `ss -tulpn` régulier, chaque port justifié.",
          },
          {
            label: "Sauvegarde jamais testée",
            value:
              "Problem : la restauration échoue le jour où on en a besoin. Why : on sauvegarde, on ne restaure jamais. Better : test de restauration planifié et documenté.",
          },
          {
            label: "Mot de passe réutilisé",
            value:
              "Problem : une fuite ailleurs compromet aussi vos serveurs. Why : mémoire humaine limitée. Better : gestionnaire + 2FA partout.",
          },
          {
            label: "Logs locaux uniquement",
            value:
              "Problem : l'attaquant efface ses traces avec les logs. Why : pas de centralisation. Better : envoi distant des logs, rétention suffisante.",
          },
          {
            label: "Tester hors périmètre",
            value:
              "Problem : « juste un petit scan » sur un système tiers. Why : curiosité ou bonne intention. Better : JAMAIS sans autorisation écrite — c'est illégal et ça disqualifie.",
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
      "Les règles qui distinguent un système maintenu d'une cible facile.",
    blocks: [
      {
        kind: "list",
        items: [
          "Patchez vite et automatiquement : les vulnérabilités connues sont le vecteur n°1.",
          "Moindre privilège partout : réseau (pare-feu), utilisateurs (sudo), programmes (confinement).",
          "Clés SSH uniquement, root désactivé, 2FA où possible.",
          "Sauvegardes 3-2-1 testées : le dernier rempart se vérifie.",
          "Surveillez et centralisez les logs : on ne défend pas ce qu'on ne voit pas.",
          "Un compte par personne, traçabilité des actions privilégiées.",
          "Plan d'incident écrit et répété avant le jour J.",
          "N'agissez que sur vos systèmes ou avec autorisation écrite — toujours.",
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 3,
    intro:
      "Quatre projets de difficulté croissante, sur VOS propres systèmes uniquement.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Durcir une VM",
        fields: [
          { label: "Compétences requises", value: "Linux, SSH" },
          { label: "Ce que vous construisez", value: "VM locale : patching auto, UFW, SSH par clés, utilisateurs nominatifs, sauvegarde" },
          { label: "Ce que vous apprenez", value: "Les 5 mesures qui éliminent l'essentiel du risque" },
          { label: "Difficulté attendue", value: "Faible — un week-end" },
          { label: "Projet suivant", value: "Audit et détection" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Audit et détection",
        fields: [
          { label: "Compétences requises", value: "Logs, pare-feu" },
          { label: "Ce que vous construisez", value: "Audit Lynis avec corrections, fail2ban, auditd sur fichiers sensibles, alertes" },
          { label: "Ce que vous apprenez", value: "L'auto-audit et la détection des tentatives d'intrusion" },
          { label: "Difficulté attendue", value: "Moyenne — une semaine" },
          { label: "Projet suivant", value: "Plan d'incident" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Plan d'incident",
        fields: [
          { label: "Compétences requises", value: "Sauvegardes, logs centralisés" },
          { label: "Ce que vous construisez", value: "Plan de réponse écrit, exercice sur VM (compromission simulée par VOUS sur VOTRE VM), restauration testée" },
          { label: "Ce que vous apprenez", value: "Réagir méthodiquement : isoler, analyser, restaurer" },
          { label: "Difficulté attendue", value: "Élevée — deux semaines" },
          { label: "Projet suivant", value: "Conformité CIS" },
        ],
      },
      {
        kind: "fields",
        title: "Professionnel — Conformité CIS",
        fields: [
          { label: "Compétences requises", value: "Tout le programme" },
          { label: "Ce que vous construisez", value: "Durcissement niveau 1 CIS sur un serveur, audit automatisé, documentation, revue périodique" },
          { label: "Ce que vous apprenez", value: "La sécurité comme processus d'équipe, auditable" },
          { label: "Difficulté attendue", value: "Professionnelle — plusieurs semaines" },
          { label: "Projet suivant", value: "SOC et détection avancée (compétence `soc`)" },
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
          { label: "CIS Benchmarks", value: "Guides de durcissement par système — la référence consensuelle." },
          { label: "Documentation Ubuntu Server — Sécurité", value: "Pare-feu, SSH, mises à jour : les bases officielles." },
          { label: "ANSSI — Guides", value: "L'agence française : recommandations et guides d'hygiène informatique." },
          { label: "NIST Cybersecurity Framework", value: "Le cadre de référence : identifier, protéger, détecter, répondre, récupérer." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : un laboratoire local (VM) pour appliquer chaque mesure sans risque.",
          "Rappel : n'appliquez ces techniques que sur vos propres systèmes.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Sécurité système maîtrisée, voici les prolongements naturels dans la roadmap Cybersécurité.",
    blocks: [
      {
        kind: "list",
        items: [
          "Chiffrer les échanges : `cryptography` — comprendre ce qui protège les données.",
          "Surveiller à l'échelle : `soc` — du durcissement d'une machine à la détection d'équipe.",
          "Sécuriser le code : `secure-coding` — les applications aussi se défendent.",
          "Gouverner : `governance` — politiques, conformité et gestion du risque.",
          "Revenir à la roadmap : valider System Security et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
  {
    id: "mfa-ssh",
    title: "Double authentification SSH",
    level: 3,
    intro:
      "Clé + code temporaire : deux facteurs pour l'accès distant.",
    blocks: [
      {
        kind: "text",
        text: "Même avec des clés, ajouter un second facteur (code TOTP via une app d'authentification) protège contre le vol de la clé privée : l'attaquant doit posséder la clé ET le téléphone. Sur serveur, `libpam-google-authenticator` ajoute cette étape à la connexion SSH.",
      },
      {
        kind: "list",
        items: [
          "Configurez d'abord, testez dans une session séparée : une erreur PAM peut verrouiller l'accès.",
          "Conservez les codes de secours hors du serveur (gestionnaire de mots de passe).",
          "La 2FA ne remplace pas les clés : elle s'y ajoute (ce qu'on possède × 2, pas mot de passe + 2FA).",
        ],
      },
    ],
  },
  {
    id: "honeypots",
    title: "Pots de miel : détecter les intrus",
    level: 3,
    intro:
      "Un faux service qui ne sert qu'à alerter : le piège défensif.",
    blocks: [
      {
        kind: "text",
        text: "Un honeypot est un faux service (ex. un SSH factice sur un port inhabituel) que personne de légitime ne touche : toute connexion est donc suspecte et déclenche une alerte immédiate. Déployé sur VOTRE réseau, c'est un détecteur d'intrusion à très faible bruit — les attaquants qui explorent se trahissent.",
      },
      {
        kind: "list",
        items: [
          "Isolez le honeypot : il ne doit donner accès à rien de réel (VM ou conteneur dédié, réseau cloisonné).",
          "Ne l'utilisez jamais pour « riposter » : c'est un capteur, pas une arme.",
          "Les logs du honeypot enrichissent la détection : IP, outils et méthodes observés alimentent les blocages.",
        ],
      },
    ],
  },
];

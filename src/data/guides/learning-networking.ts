import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du Networking : le réseau version praticien —
 * diagnostiquer, configurer, sécuriser. Couvre les usages infra, DevOps
 * et cybersécurité.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_NETWORKING: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est le networking praticien et pourquoi il est au centre de l'infra, du DevOps et de la sécurité.",
    blocks: [
      {
        kind: "text",
        text: "Le networking, version praticien, c'est comprendre TCP/IP, DNS et le routage — puis savoir diagnostiquer une panne, configurer un réseau et le sécuriser. La théorie (modèle OSI, adressage) ne vaut que par ce qu'elle permet de faire : isoler la couche en faute, méthodiquement.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est central : toute application moderne est distribuée, donc tout passe par le réseau. Quand une application ne répond plus, le problème est réseau une fois sur deux — DNS qui ne résout plus, firewall qui bloque, route qui a disparu. Savoir diagnostiquer fait gagner des heures, en développement comme en production.",
      },
      {
        kind: "text",
        text: "Trois usages, une base commune : l'administrateur infra configure et segmente, le DevOps débugge la connectivité entre services, le pentester analyse le trafic et les expositions. Les outils et la méthode sont les mêmes — `ping`, `traceroute`, `dig`, `tcpdump` — seule la finalité change.",
      },
    ],
  },
  {
    id: "panorama-networking",
    title: "Le networking en une image",
    level: 1,
    intro:
      "Les couches, les outils de diagnostic associés, et la méthode.",
    blocks: [
      {
        kind: "diagram",
        title: "Couches et outils de diagnostic",
        lines: [
          "Application (HTTP, DNS, SSH…)",
          "   │  → curl, dig, nslookup",
          "   ▼",
          "Transport (TCP, UDP — ports)",
          "   │  → ss, netstat, telnet/nc vers un port",
          "   ▼",
          "Réseau (IP, routage)",
          "   │  → ping, traceroute, ip route",
          "   ▼",
          "Liaison (Ethernet, Wi-Fi, VLAN)",
          "   │  → ip link, arp",
          "   ▼",
          "Physique (câbles, interfaces)",
          "      → voyants, interfaces UP/DOWN",
          "",
          "Méthode : partir du bas (le câble est-il branché ?)",
          "ou du haut (l'application répond-elle ?) — mais toujours",
          "couche par couche, sans sauter d'étape.",
        ],
      },
      {
        kind: "list",
        items: [
          "Chaque couche a ses outils : diagnostiquer, c'est tester chaque couche dans l'ordre.",
          "La plupart des pannes 'mystérieuses' sont un DNS, un firewall ou une route.",
          "Wireshark/tcpdump voient tout : l'outil ultime quand les autres ne suffisent plus.",
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
      "Les bases sans lesquelles les outils réseau restent des incantations.",
    blocks: [
      {
        kind: "fields",
        title: "Fondations",
        fields: [
          {
            label: "Réseaux (théorie)",
            value:
              "Modèle OSI, adressage IP, ce qu'est un paquet : le vocabulaire pour comprendre ce que les outils affichent.",
          },
          {
            label: "Linux / terminal",
            value:
              "Les outils réseau vivent en ligne de commande : `ping`, `ip`, `ss` s'utilisent dans un shell, avec `sudo` quand il faut.",
          },
          {
            label: "Notions d'administration",
            value:
              "Savoir ce qu'est une interface réseau, une passerelle, un service qui écoute sur un port : le contexte des diagnostics.",
          },
        ],
      },
      {
        kind: "text",
        text: "Pas besoin d'être administrateur système : un Linux de tous les jours (même en VM) suffit pour pratiquer chaque commande de cette page.",
      },
    ],
  },
  {
    id: "installation-outils",
    title: "Installer les outils",
    level: 2,
    intro:
      "L'essentiel est souvent préinstallé ; compléter ce qui manque.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier les outils de base",
        command: "command -v ping ip ss curl dig",
        why: "`ping`, `ip`, `ss` et `curl` sont préinstallés sur la plupart des Linux ; `dig` vient avec les utilitaires DNS. Cette commande liste ceux qui manquent (ligne vide = absent) avant d'installer quoi que ce soit.",
      },
      {
        kind: "command",
        label: "Installer traceroute et mtr",
        command: "sudo apt install traceroute mtr",
        why: "`traceroute` montre le chemin des paquets vers une destination, `mtr` combine ping et traceroute en continu : les deux outils du diagnostic de routage. Ils ne sont pas toujours préinstallés.",
        verify: "command -v traceroute mtr",
      },
      {
        kind: "text",
        text: "Pour `dig` manquant : le paquet s'appelle `dnsutils` (ou `bind9-dnsutils` sur les distributions récentes). Pour l'analyse poussée : Wireshark (GUI) se télécharge depuis wireshark.org.",
      },
    ],
  },
  {
    id: "premier-diagnostic",
    title: "Premier diagnostic",
    level: 2,
    intro:
      "'Internet ne marche pas' : la procédure pas à pas, couche par couche.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Tester la machine elle-même",
            detail:
              "`ping -c 4 127.0.0.1` : si même le loopback ne répond pas, la pile réseau locale est en cause (rare, mais ça élimine une hypothèse).",
          },
          {
            title: "Tester le réseau local",
            detail:
              "`ping -c 4 192.168.1.1` (l'adresse de votre passerelle/routeur) : si ça échoue, le problème est local — câble, Wi-Fi, DHCP. Inutile d'aller plus loin.",
          },
          {
            title: "Tester internet sans DNS",
            detail:
              "`ping -c 4 8.8.8.8` : si ça passe, la connectivité IP est bonne. Si l'étape précédente passait mais pas celle-ci, le routage vers internet est en cause.",
          },
          {
            title: "Tester le DNS",
            detail:
              "`dig example.com +short` : si le ping IP passait mais pas les noms, c'est le DNS. Vérifier `/etc/resolv.conf` et tester un autre résolveur.",
          },
          {
            title: "Tester l'application",
            detail:
              "`curl -I https://example.com` : si le DNS et le ping passent mais pas ça, le problème est applicatif (service arrêté, firewall sur le port, TLS).",
          },
        ],
      },
      {
        kind: "text",
        text: "La leçon : chaque étape isole une couche. 'Ça ne marche pas' devient 'le DNS ne résout pas' — et un problème nommé est à moitié résolu.",
      },
    ],
  },
  {
    id: "commandes-essentielles",
    title: "Commandes essentielles",
    level: 2,
    intro:
      "Les cinq commandes du quotidien, comprises et pas seulement recopiées.",
    blocks: [
      {
        kind: "command",
        label: "Tester la connectivité",
        command: "ping -c 4 8.8.8.8",
        why: "Envoie 4 paquets ICMP d'écho et affiche les temps de réponse. Le `-c 4` limite à 4 paquets (sans lui, ping tourne indéfiniment). Un 100 % de perte = pas de route ou hôte injoignable ; des temps élevés = latence ou congestion.",
        verify: "ping -c 1 127.0.0.1",
      },
      {
        kind: "command",
        label: "Voir ses interfaces et adresses",
        command: "ip addr show",
        why: "Affiche les interfaces réseau et leurs adresses IP : c'est le point de départ ('ai-je une adresse ? sur quelle interface ?'). Remplace l'ancien `ifconfig`.",
      },
      {
        kind: "command",
        label: "Voir la table de routage",
        command: "ip route show",
        why: "Affiche où part chaque paquet : la route par défaut (`default via …`) indique la passerelle. Une route manquante ou fausse explique les 'injoignable' mystérieux.",
      },
      {
        kind: "command",
        label: "Voir les ports en écoute",
        command: "ss -tulpn",
        why: "Liste les sockets en écoute : TCP/UDP, adresses, ports et processus (`-p` demande `sudo` pour tout voir). 'Mon service ne répond pas' → est-il vraiment en écoute, et sur quelle interface ?",
      },
    ],
  },
  {
    id: "dns-pratique",
    title: "DNS en pratique",
    level: 2,
    intro:
      "Interroger le DNS comme un pro : `dig` et les types d'enregistrements.",
    blocks: [
      {
        kind: "command",
        label: "Résoudre un nom simplement",
        command: "dig example.com +short",
        why: "Interroge le DNS pour `example.com` et n'affiche que la réponse (`+short`) : l'adresse IP. La forme courte pour 'ce nom résout vers quoi ?'.",
      },
      {
        kind: "command",
        label: "Voir les enregistrements mail",
        command: "dig MX example.com +short",
        why: "Affiche les enregistrements MX (mail exchangers) : quels serveurs reçoivent le mail pour ce domaine. Chaque type d'enregistrement (`A`, `AAAA`, `CNAME`, `MX`, `TXT`) répond à une question différente.",
      },
      {
        kind: "command",
        label: "Tracer la résolution complète",
        command: "dig example.com +trace",
        why: "Montre toute la chaîne de résolution : serveurs racine → TLD → serveur autoritaire. Inestimable quand 'ça ne résout pas' : on voit exactement où ça casse.",
      },
      {
        kind: "text",
        text: "Types à connaître : `A` (IPv4), `AAAA` (IPv6), `CNAME` (alias), `MX` (mail), `TXT` (vérifications, SPF…), `NS` (serveurs du domaine). La propagation DNS prend du temps (TTL) : après un changement, l'ancienne valeur peut persister en cache.",
      },
    ],
  },
  {
    id: "traceroute-lecture",
    title: "Lire un traceroute",
    level: 2,
    intro:
      "Suivre le chemin des paquets et repérer où ça bloque.",
    blocks: [
      {
        kind: "command",
        label: "Tracer la route vers une destination",
        command: "traceroute example.com",
        why: "Affiche chaque saut (routeur) vers la destination avec les temps. Les `* * *` indiquent un routeur qui ne répond pas aux sondes (souvent normal : beaucoup filtrent l'ICMP) — le diagnostic porte sur OÙ les temps explosent ou où tout s'arrête.",
        verify: "traceroute -m 5 8.8.8.8",
      },
      {
        kind: "list",
        items: [
          "Saut 1 = votre routeur local : temps élevé ici = problème Wi-Fi/câble local.",
          "Augmentation progressive = normal (distance). Saut brutal = congestion ou détour.",
          "Arrêt net après un saut = firewall qui bloque ou route manquante au-delà.",
          "`mtr` (my traceroute) fait la même chose en continu : idéal pour les problèmes intermittents.",
        ],
      },
    ],
  },
  {
    id: "environnement-lab",
    title: "Monter un lab réseau",
    level: 2,
    intro:
      "Pratiquer sans risquer le réseau réel : les options.",
    blocks: [
      {
        kind: "diagram",
        title: "Lab minimal avec GNS3 ou VMs",
        lines: [
          "PC hôte",
          "  ├── VM 'client' (Linux)",
          "  ├── VM 'serveur' (Linux + nginx)",
          "  └── VM 'routeur' (ou routeur virtuel GNS3)",
          "         │",
          "  Réseaux virtuels : LAN client / LAN serveur / WAN simulé",
          "         │",
          "  On y pratique : adressage, routage, firewall,",
          "  capture Wireshark, pannes provoquées",
        ],
      },
      {
        kind: "fields",
        title: "Les outils de lab",
        fields: [
          {
            label: "GNS3",
            value:
              "Émulateur réseau : routeurs, switchs, topologies complexes. La référence pour apprendre le routage et les VLAN.",
          },
          {
            label: "Machines virtuelles",
            value:
              "VirtualBox/VMware : 2-3 Linux suffisent pour client/serveur/firewall et tous les diagnostics de cette page.",
          },
          {
            label: "Docker",
            value:
              "Des conteneurs sur des réseaux Docker personnalisés : léger et rapide pour tester la connectivité entre services.",
          },
          {
            label: "Wireshark",
            value:
              "La capture sur n'importe quel lab : voir les paquets réels des protocoles étudiés.",
          },
        ],
      },
    ],
  },
  {
    id: "tcpdump-pratique",
    title: "Capturer avec tcpdump",
    level: 2,
    intro:
      "Voir les paquets réels : le premier pas vers l'analyse.",
    blocks: [
      {
        kind: "command",
        label: "Capturer du trafic web",
        command: "sudo tcpdump -i any -c 20 port 443",
        why: "Capture 20 paquets (`-c 20`) sur toutes les interfaces (`-i any`) filtrés sur le port 443 (HTTPS). `sudo` est requis pour la capture. Le contenu est chiffré (TLS), mais on voit les IPs, ports, et volumes — déjà très instructif.",
      },
      {
        kind: "command",
        label: "Capturer du DNS",
        command: "sudo tcpdump -i any -c 10 port 53",
        why: "Le port 53 en clair : on voit littéralement les questions DNS ('qui est example.com ?') et les réponses. Lancer cette capture puis un `dig` dans un autre terminal pour voir la requête partir et revenir.",
      },
      {
        kind: "text",
        text: "Règle : capturer sur ses propres machines ou avec autorisation. tcpdump voit tout ce qui passe — y compris les mots de passe des protocoles non chiffrés. En analyse poussée, on exporte vers un fichier (`-w capture.pcap`) et on l'ouvre dans Wireshark.",
      },
    ],
  },
  {
    id: "workflow-diagnostic",
    title: "Méthode de diagnostic",
    level: 2,
    intro:
      "La méthode qui ne rate jamais : isoler la couche en faute.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Qualifier le symptôme",
            detail:
              "'Rien ne marche' n'est pas un symptôme : quoi exactement ? Un site ? Tous les sites ? Depuis une machine ou toutes ? Depuis quand ? Un symptôme précis divise le problème par dix.",
          },
          {
            title: "Choisir un sens : bas-haut ou haut-bas",
            detail:
              "Bas-haut (physique → application) quand tout semble cassé ; haut-bas (application → physique) quand un seul service est touché. L'important est de ne pas sauter de couche.",
          },
          {
            title: "Tester chaque couche avec son outil",
            detail:
              "Lien : `ip link` (UP ?). IP : `ip addr` (adresse ?). Passerelle : `ping` passerelle. Internet : `ping` 8.8.8.8. DNS : `dig`. Port : `curl`/test du port. Service : logs applicatifs.",
          },
          {
            title: "Élargir ou resserrer",
            detail:
              "Le problème touche-t-il d'autres machines ? D'autres réseaux ? Si oui, remonter vers l'infrastructure commune ; si non, rester sur la machine.",
          },
          {
            title: "Documenter",
            detail:
              "Noter symptôme, tests, cause, correctif. La prochaine panne similaire se résoudra en minutes — et la documentation sert à toute l'équipe.",
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
      "Trois projets pour ancrer la pratique.",
    blocks: [
      {
        kind: "fields",
        title: "Dans l'ordre",
        fields: [
          {
            label: "1. Diagnostic de panne provoquée",
            value:
              "Un camarade casse quelque chose (mauvais DNS, firewall, route supprimée) : diagnostiquer avec la méthode couche par couche, chronométré. Objectif : le réflexe méthodique.",
          },
          {
            label: "2. Maquette réseau (GNS3 ou VMs)",
            value:
              "Plan d'adressage, deux sous-réseaux, routage inter-VLAN, tests de connectivité. Objectif : construire au lieu de subir.",
          },
          {
            label: "3. Segmentation d'un LAN",
            value:
              "Isoler des services par VLAN/sous-réseaux avec règles firewall, puis vérifier l'isolement (ce qui doit être bloqué l'est vraiment). Objectif : la sécurité par le réseau.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "tcp-ip-detail",
    title: "TCP/IP en profondeur",
    level: 3,
    intro:
      "La suite de protocoles d'Internet : ce qui se passe vraiment sur le fil.",
    blocks: [
      {
        kind: "diagram",
        title: "Encapsulation : chaque couche emballe la précédente",
        lines: [
          "Données applicatives (ex. requête HTTP)",
          "  └─► Segment TCP (ports source/dest, n° séquence)",
          "        └─► Paquet IP (IP source/dest)",
          "              └─► Trame Ethernet (MAC source/dest)",
          "                    └─► Bits sur le câble",
          "",
          "À la réception : chaque couche déballe sa partie",
          "et transmet vers le haut.",
        ],
      },
      {
        kind: "fields",
        title: "TCP vs UDP",
        fields: [
          {
            label: "TCP",
            value:
              "Fiable et ordonné : handshake en 3 temps (SYN, SYN-ACK, ACK), acquittements, retransmissions, contrôle de congestion. Prix : latence et overhead. Usage : web, mail, fichiers — tout ce qui doit arriver intact.",
          },
          {
            label: "UDP",
            value:
              "Simple et rapide : envoie sans garantie ni ordre. Prix : pertes possibles. Usage : DNS, streaming, jeux, VoIP — où la vitesse prime sur la perfection.",
          },
          {
            label: "Ports",
            value:
              "16 bits (0-65535) : identifient le service sur la machine. Bien connus : 22 SSH, 80 HTTP, 443 HTTPS, 53 DNS, 25 SMTP. `ss -tulpn` montre qui écoute où.",
          },
        ],
      },
    ],
  },
  {
    id: "handshake-tcp",
    title: "Le handshake TCP en 3 temps",
    level: 3,
    intro:
      "Comment deux machines s'accordent avant de parler : visible dans Wireshark.",
    blocks: [
      {
        kind: "diagram",
        title: "SYN → SYN-ACK → ACK",
        lines: [
          "Client                          Serveur",
          "  │  SYN (\"on se parle ?\")        │",
          "  │ ─────────────────────────────► │",
          "  │  SYN-ACK (\"ok, et toi ?\")     │",
          "  │ ◄───────────────────────────── │",
          "  │  ACK (\"c'est parti\")          │",
          "  │ ─────────────────────────────► │",
          "  │  … données …                   │",
          "  │ ◄────────────────────────────► │",
          "  │  FIN / RST (fermeture)         │",
        ],
      },
      {
        kind: "text",
        text: "À observer dans Wireshark : filtrer `tcp.flags.syn==1` pour voir les ouvertures de connexion. Un SYN sans SYN-ACK = le serveur ne répond pas (arrêté, firewall, ou route cassée). Un RST immédiat = port fermé.",
      },
    ],
  },
  {
    id: "dns-detail",
    title: "DNS en profondeur",
    level: 3,
    intro:
      "L'annuaire d'Internet : hiérarchie, cache, enregistrements.",
    blocks: [
      {
        kind: "diagram",
        title: "La hiérarchie de résolution",
        lines: [
          "Votre machine → Résolveur (FAI, 8.8.8.8, …)",
          "                    │",
          "                    ▼",
          "              Serveurs racine (.)",
          "                    │ \"qui gère .com ?\"",
          "                    ▼",
          "              Serveurs TLD (.com)",
          "                    │ \"qui gère example.com ?\"",
          "                    ▼",
          "              Serveur autoritaire (example.com)",
          "                    │ \"voici l'IP\"",
          "                    ▼",
          "              Réponse mise en cache (durée = TTL)",
        ],
      },
      {
        kind: "table",
        headers: ["Type", "Rôle", "Exemple d'usage"],
        rows: [
          ["A", "Nom → IPv4", "Le site lui-même"],
          ["AAAA", "Nom → IPv6", "Le site en IPv6"],
          ["CNAME", "Alias vers un autre nom", "`www` → domaine principal, CDN"],
          ["MX", "Serveurs mail du domaine", "Réception des emails"],
          ["TXT", "Texte libre", "SPF, DKIM, vérifications de propriété"],
          ["NS", "Serveurs autoritaires", "Délégation du domaine"],
          ["SOA", "Paramètres de la zone", "TTL, responsable, numéro de série"],
        ],
      },
    ],
  },
  {
    id: "dhcp",
    title: "DHCP",
    level: 3,
    intro:
      "L'attribution automatique des adresses : pratique, mais à comprendre pour dépanner.",
    blocks: [
      {
        kind: "diagram",
        title: "DORA : le dialogue DHCP",
        lines: [
          "Client                          Serveur DHCP",
          "  │  DISCOVER (\"qui donne des IP ?\")        │",
          "  │ ────── broadcast ──────────────────────► │",
          "  │  OFFER (\"prends 192.168.1.42\")          │",
          "  │ ◄────────────────────────────────────── │",
          "  │  REQUEST (\"je prends celle-là\")         │",
          "  │ ──────────────────────────────────────► │",
          "  │  ACK (\"c'est noté, + passerelle + DNS\") │",
          "  │ ◄────────────────────────────────────── │",
        ],
      },
      {
        kind: "text",
        text: "Le serveur fournit IP, masque, passerelle ET DNS : un DHCP mal configuré (mauvais DNS, par exemple) produit des pannes 'internet ne marche pas' alors que la connectivité IP est parfaite. Dépannage : `ip addr` (ai-je une IP ?), puis vérifier passerelle et DNS reçus.",
      },
    ],
  },
  {
    id: "vlan",
    title: "VLAN",
    level: 3,
    intro:
      "Segmenter sans multiplier les câbles : des réseaux logiques sur une infra physique.",
    blocks: [
      {
        kind: "text",
        text: "Un VLAN (802.1Q) découpe un switch physique en plusieurs réseaux logiques isolés : le trafic d'un VLAN ne voit pas celui des autres. Usage typique : séparer utilisateurs, serveurs, invités et management sur le même matériel.",
      },
      {
        kind: "fields",
        title: "Concepts",
        fields: [
          {
            label: "Tag 802.1Q",
            value:
              "Un identifiant (1-4094) inséré dans la trame : le switch sait à quel VLAN elle appartient. Les ports 'trunk' transportent plusieurs VLAN taggés.",
          },
          {
            label: "Routage inter-VLAN",
            value:
              "Pour communiquer entre VLAN, il faut un routeur (ou switch L3) avec des règles : c'est là qu'on applique la politique de sécurité.",
          },
          {
            label: "VLAN natif",
            value:
              "Le VLAN non taggé sur un trunk : à configurer consciemment, car il est une source classique de fuites entre VLAN.",
          },
        ],
      },
    ],
  },
  {
    id: "nat",
    title: "NAT",
    level: 3,
    intro:
      "Comment tout un réseau local partage une seule IP publique.",
    blocks: [
      {
        kind: "text",
        text: "Le NAT (souvent PAT/NAPT à la maison) réécrit à la volée : les paquets sortants voient leur IP source privée remplacée par l'IP publique du routeur (avec un port source unique par flux), et le routeur fait le chemin inverse au retour grâce à sa table de translation.",
      },
      {
        kind: "diagram",
        title: "Translation d'adresses",
        lines: [
          "PC (192.168.1.10:54321) ──► Routeur ──► Internet",
          "                              │",
          "   Table NAT : 192.168.1.10:54321 ↔ IP_publique:62001",
          "                              │",
          "Internet ──► Routeur ──► PC (192.168.1.10:54321)",
          "   (réponse vers IP_publique:62001, retraduite)",
        ],
      },
      {
        kind: "text",
        text: "Conséquences : les IPs privées (RFC 1918 : 10/8, 172.16/12, 192.168/16) ne sont pas routables sur internet — d'où le NAT. Et : impossible de joindre directement une machine derrière un NAT depuis l'extérieur sans redirection de port — ce qui est aussi une protection.",
      },
    ],
  },
  {
    id: "firewall",
    title: "Firewall : filtrer le trafic",
    level: 3,
    intro:
      "La première ligne de défense : des règles qui acceptent ou bloquent.",
    blocks: [
      {
        kind: "command",
        label: "Voir le statut d'UFW",
        command: "sudo ufw status verbose",
        why: "UFW (Uncomplicated Firewall) est le pare-feu simplifié d'Ubuntu : cette commande affiche les règles actives et la politique par défaut. Le point de départ avant toute modification.",
      },
      {
        kind: "command",
        label: "Autoriser SSH",
        command: "sudo ufw allow 22/tcp",
        why: "Ouvre le port 22 en TCP. Règle d'or : autoriser SSH AVANT d'activer le firewall sur une machine distante — sinon on se verrouille dehors.",
        verify: "sudo ufw status",
      },
      {
        kind: "command",
        label: "Activer le firewall",
        command: "sudo ufw enable",
        why: "Active UFW avec la politique par défaut (refuser entrant, autoriser sortant). À n'exécuter qu'après avoir autorisé son propre accès (SSH).",
      },
      {
        kind: "text",
        text: "Principes : politique par défaut restrictive (deny incoming), n'ouvrir que le nécessaire, des règles nommées et documentées. UFW n'est qu'une surcouche conviviale de netfilter/iptables/nftables — les concepts (chaînes, règles ordonnées) sont les mêmes en dessous.",
      },
    ],
  },
  {
    id: "tls-certificats",
    title: "TLS et certificats",
    level: 3,
    intro:
      "Le chiffrement du web : handshake, certificats, chaînes de confiance.",
    blocks: [
      {
        kind: "diagram",
        title: "Handshake TLS (simplifié)",
        lines: [
          "Client                          Serveur",
          "  │  ClientHello (versions, ciphers)      │",
          "  │ ────────────────────────────────────► │",
          "  │  ServerHello + Certificat             │",
          "  │ ◄──────────────────────────────────── │",
          "  │  (vérifie le certificat : émetteur,  │",
          "  │   nom de domaine, dates, révocation) │",
          "  │  Échange de clés                      │",
          "  │ ◄───────────────────────────────────► │",
          "  │  … données chiffrées …                │",
        ],
      },
      {
        kind: "command",
        label: "Inspecter le certificat d'un site",
        command: "openssl s_client -connect example.com:443 -servername example.com",
        why: "Ouvre une connexion TLS et affiche le certificat présenté : émetteur, dates de validité, chaîne. Le `-servername` (SNI) est indispensable quand plusieurs sites partagent la même IP.",
      },
      {
        kind: "list",
        items: [
          "Un certificat prouve : 'cette clé appartient à ce nom de domaine', signé par une autorité de confiance.",
          "Erreurs courantes : certificat expiré, nom ne correspondant pas, chaîne incomplète (intermédiaire manquant).",
          "Let's Encrypt fournit des certificats gratuits et automatisés : plus d'excuse pour du HTTP en production.",
        ],
      },
    ],
  },
  {
    id: "load-balancing",
    title: "Load balancing",
    level: 3,
    intro:
      "Répartir la charge : le réseau devant les serveurs.",
    blocks: [
      {
        kind: "diagram",
        title: "Répartiteur devant un pool",
        lines: [
          "Clients ──► Load Balancer (IP virtuelle)",
          "                ├──► Serveur 1",
          "                ├──► Serveur 2",
          "                └──► Serveur 3",
          "          (health checks : on ne route que vers les sains)",
        ],
      },
      {
        kind: "fields",
        title: "Algorithmes et notions",
        fields: [
          {
            label: "Round-robin",
            value:
              "Distribution à tour de rôle : simple, efficace si les serveurs sont homogènes et les requêtes équivalentes.",
          },
          {
            label: "Least connections",
            value:
              "Vers le serveur le moins chargé : mieux quand les requêtes ont des durées variables.",
          },
          {
            label: "Sticky sessions",
            value:
              "Un client toujours vers le même serveur : nécessaire si la session vit en mémoire locale (mieux : externaliser la session).",
          },
          {
            label: "Health checks",
            value:
              "Le répartiteur sonde les serveurs et exclut les défaillants : la haute disponibilité réelle.",
          },
          {
            label: "Niveau 4 vs 7",
            value:
              "L4 (TCP) : rapide, aveugle au contenu. L7 (HTTP) : routage par URL/header, TLS, plus intelligent.",
          },
        ],
      },
    ],
  },
  {
    id: "vpn",
    title: "VPN",
    level: 3,
    intro:
      "Des tunnels chiffrés : relier des réseaux à travers internet.",
    blocks: [
      {
        kind: "text",
        text: "Un VPN encapsule le trafic dans un tunnel chiffré entre deux points : tout ce qui y transite est protégé, et les deux extrémités se voient comme sur un même réseau local.",
      },
      {
        kind: "fields",
        title: "Usages et protocoles",
        fields: [
          {
            label: "Site à site",
            value:
              "Relier deux bureaux : les LAN communiquent comme s'ils étaient adjacents. Le cas d'entreprise classique.",
          },
          {
            label: "Accès distant",
            value:
              "Un télétravailleur joint le réseau de l'entreprise : accès aux ressources internes protégées.",
          },
          {
            label: "WireGuard",
            value:
              "Protocole moderne : simple, rapide, codebase réduite. Le choix par défaut pour un nouveau déploiement.",
          },
          {
            label: "OpenVPN / IPsec",
            value:
              "Les standards historiques : très répandus, plus complexes à configurer que WireGuard.",
          },
        ],
      },
    ],
  },
  {
    id: "proxy-reverse-proxy",
    title: "Proxy et reverse proxy",
    level: 3,
    intro:
      "Deux intermédiaires aux rôles opposés : ne plus les confondre.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Proxy (forward)", "Reverse proxy"],
        rows: [
          ["Position", "Devant les clients", "Devant les serveurs"],
          ["Rôle", "Les clients sortent via lui (filtrage, cache, anonymisation)", "Les clients entrent via lui (répartition, TLS, cache)"],
          ["Exemple", "Proxy d'entreprise filtrant le web", "nginx devant des applications"],
          ["Qui le configure", "Le client (ou son admin)", "L'hébergeur du service"],
        ],
      },
      {
        kind: "code",
        language: "nginx",
        title: "nginx en reverse proxy minimal",
        code: "server {\n  listen 443 ssl;\n  server_name app.example.com;\n\n  location / {\n    proxy_pass http://127.0.0.1:3000;\n    proxy_set_header Host $host;\n    proxy_set_header X-Real-IP $remote_addr;\n  }\n}",
      },
    ],
  },
  {
    id: "ipv6",
    title: "IPv6 : les bases",
    level: 3,
    intro:
      "L'adressage du futur (et du présent) : comprendre sans paniquer.",
    blocks: [
      {
        kind: "text",
        text: "IPv6 répond à l'épuisement des adresses IPv4 : 128 bits (contre 32), soit un espace immense. Notation hexadécimale en 8 groupes (`2001:db8::1`), avec `::` pour comprimer les zéros.",
      },
      {
        kind: "list",
        items: [
          "Pas de NAT nécessaire : chaque machine peut avoir une IP publique — le firewall redevient le seul garde-fou.",
          "Coexistence : les deux piles tournent en parallèle (dual-stack) pendant la transition, qui dure depuis des années.",
          "En pratique : savoir lire une adresse, comprendre le préfixe (`/64` typique en LAN), et vérifier que le firewall couvre aussi IPv6.",
        ],
      },
    ],
  },
  {
    id: "subnetting",
    title: "Subnetting et CIDR",
    level: 3,
    intro:
      "Découper un réseau : masques et notation CIDR.",
    blocks: [
      {
        kind: "text",
        text: "La notation CIDR (`192.168.1.0/24`) dit combien de bits identifient le réseau : `/24` = 256 adresses, `/16` = 65 536, `/30` = 4 (liaison point-à-point). Le masque sépare la partie réseau de la partie hôte.",
      },
      {
        kind: "table",
        headers: ["CIDR", "Masque", "Adresses", "Usage typique"],
        rows: [
          ["`/24`", "255.255.255.0", "256", "LAN standard"],
          ["`/16`", "255.255.0.0", "65 536", "Grand réseau d'entreprise"],
          ["`/30`", "255.255.255.252", "4", "Liaison entre deux routeurs"],
          ["`/32`", "255.255.255.255", "1", "Une adresse précise (route hôte)"],
        ],
      },
      {
        kind: "text",
        text: "Pour planifier : partir du besoin (combien de sous-réseaux ? combien d'hôtes chacun ?), découper du plus grand au plus petit, documenter le plan d'adressage. Un plan d'adressage documenté vaut de l'or le jour d'une extension.",
      },
    ],
  },
  {
    id: "ssh-pratique",
    title: "SSH en pratique",
    level: 3,
    intro:
      "Le protocole d'administration distante : l'utiliser proprement.",
    blocks: [
      {
        kind: "command",
        label: "Se connecter en SSH",
        command: "ssh user@serveur.example.com",
        why: "Ouvre un shell chiffré sur la machine distante. Premier réflexe d'administration : tout le reste (logs, config, diagnostic) se fait depuis cette session.",
      },
      {
        kind: "command",
        label: "Copier un fichier via SCP",
        command: "scp backup.sql user@serveur:/tmp/",
        why: "Copie `backup.sql` vers `/tmp/` du serveur via SSH (chiffré, authentifié). Pour les transferts simples ; `rsync` prend le relais pour les synchronisations.",
      },
      {
        kind: "list",
        items: [
          "Clés plutôt que mots de passe : `ssh-keygen` puis `ssh-copy-id` — plus sûr et plus pratique.",
          "Désactiver l'authentification par mot de passe et le login root direct sur tout serveur exposé.",
          "Le port 22 est la cible n°1 des scans : clés + fail2ban (ou équivalent) sur les serveurs exposés.",
        ],
      },
    ],
  },
  {
    id: "wireshark-analyse",
    title: "Analyser avec Wireshark",
    level: 3,
    intro:
      "L'analyseur de paquets : passer de la capture à la compréhension.",
    blocks: [
      {
        kind: "fields",
        title: "Prise en main",
        fields: [
          {
            label: "Filtres d'affichage",
            value:
              "`dns`, `tcp.port==443`, `ip.addr==192.168.1.10` : filtrer sans perdre la capture. Les filtres de capture (BPF) sont une autre syntaxe, plus restrictive.",
          },
          {
            label: "Suivre un flux",
            value:
              "Clic droit → 'Follow TCP Stream' : reconstituer la conversation complète (requête + réponse HTTP, par exemple).",
          },
          {
            label: "Handshake et flags",
            value:
              "Repérer SYN/SYN-ACK/ACK (ouverture), RST (refus), retransmissions (pertes) : la lecture de base d'une connexion TCP.",
          },
          {
            label: "Statistiques",
            value:
              "'Statistics → Protocol Hierarchy' : voir la répartition des protocoles d'un coup d'œil — un trafic inattendu saute aux yeux.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle d'usage : capturer sur ses propres systèmes ou avec autorisation explicite. Wireshark est aussi un outil d'attaque entre de mauvaises mains — la même raison qui en fait un outil de défense.",
      },
    ],
  },
  {
    id: "monitoring-reseau",
    title: "Superviser un réseau",
    level: 3,
    intro:
      "Détecter avant que les utilisateurs ne préviennent : les bases de la supervision.",
    blocks: [
      {
        kind: "list",
        items: [
          "Disponibilité : pings réguliers vers les équipements clés (sondes) — le premier niveau d'alerte.",
          "Latence et perte : mtr/smokeping en continu vers les destinations critiques — voir les dégradations progressives.",
          "Débit : compteurs d'interfaces (SNMP ou équivalent) — dimensionner avant la saturation.",
          "Logs centralisés : les équipements réseau logguent (syslog) — authentifications, changements d'état, erreurs.",
          "Alertes actionnables : chaque alerte dit quoi vérifier ; le bruit d'alertes fait ignorer les vraies.",
        ],
      },
    ],
  },
  {
    id: "securite-reseau",
    title: "Sécurité réseau",
    level: 3,
    intro:
      "La défense en profondeur côté réseau : les couches qui comptent.",
    blocks: [
      {
        kind: "fields",
        title: "Les mesures",
        fields: [
          {
            label: "Segmentation",
            value:
              "VLAN et sous-réseaux : limiter les mouvements latéraux. Un poste compromis ne doit pas voir les serveurs critiques.",
          },
          {
            label: "Firewall",
            value:
              "Filtrage deny-by-default, règles minimales et documentées, revues périodiquement (les règles temporaires deviennent permanentes).",
          },
          {
            label: "Durcissement des équipements",
            value:
              "Mots de passe changés, services inutiles désactivés, firmwares à jour : un routeur avec le mot de passe d'usine est une porte ouverte.",
          },
          {
            label: "Chiffrement",
            value:
              "TLS partout où c'est possible, VPN pour l'administration distante : le réseau local n'est pas une zone de confiance.",
          },
          {
            label: "Détection",
            value:
              "Surveiller l'anormal : trafic vers l'extérieur inhabituel, scans de ports, volumes suspects — les signaux d'une compromission.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-avance",
    title: "Debugging avancé",
    level: 3,
    intro:
      "Quand les outils de base ne suffisent plus : les cas tordus.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "MTU et fragmentation",
            value:
              "Symptôme : certains sites marchent, d'autres chargent partiellement. Cause : paquets trop gros bloqués (souvent via VPN/tunnel). Test : `ping -M do -s 1472` pour détecter.",
          },
          {
            label: "DNS intermittent",
            value:
              "Symptôme : ça marche, puis plus, puis ça remarche. Cause : plusieurs résolveurs dont un en panne, ou TTL courts + serveur autoritaire instable. `dig +trace` au moment de la panne.",
          },
          {
            label: "Asymétrie de routage",
            value:
              "Symptôme : la connexion s'établit mais les données ne passent pas bien. Cause : aller et retour par des chemins différents, un firewall stateful qui ne voit qu'un sens.",
          },
          {
            label: "Épuisement de ports",
            value:
              "Symptôme : 'cannot assign requested address' sous forte charge. Cause : trop de connexions sortantes, ports éphémères épuisés. Pistes : réutilisation, pooling, dimensionnement.",
          },
          {
            label: "Boucle de routage",
            value:
              "Symptôme : TTL expired dans traceroute, paquets qui tournent. Cause : routes contradictoires. Corriger le plan de routage.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les classiques qui font perdre des heures.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Oublier le DNS",
            value:
              "Problem : 'le serveur ne répond pas' alors que c'est le nom qui ne résout pas. Why : on teste le nom, pas l'IP. Better : toujours tester l'IP d'abord pour isoler le DNS.",
          },
          {
            label: "Firewall oublié",
            value:
              "Problem : service qui marche en local, injoignable à distance. Why : firewall local ou de groupe. Better : `ss -tulpn` (écoute ?) puis règles firewall, dans cet ordre.",
          },
          {
            label: "Tester depuis le mauvais endroit",
            value:
              "Problem : 'ça marche de mon poste' mais pas du serveur. Why : chemins et firewalls différents. Better : diagnostiquer depuis la machine concernée.",
          },
          {
            label: "Confondre débit et latence",
            value:
              "Problem : 'la fibre est lente' sur une appli interactive hébergée loin. Why : la latence (distance) ne se compense pas par le débit. Better : mesurer les deux (`ping` vs test de débit).",
          },
          {
            label: "Règles firewall temporaires",
            value:
              "Problem : une ouverture 'pour tester' restée en production pendant 2 ans. Why : pas de revue. Better : règles documentées, datées, revues.",
          },
          {
            label: "Un seul DNS",
            value:
              "Problem : panne du résolveur = tout s'arrête. Why : un seul serveur configuré. Better : au moins deux résolveurs, testés.",
          },
          {
            label: "Ignorer IPv6",
            value:
              "Problem : trafic IPv6 non filtré alors qu'IPv4 est verrouillé. Why : 'on n'utilise pas IPv6'. Better : le firewall couvre les deux piles, ou IPv6 est désactivé proprement.",
          },
          {
            label: "Changer plusieurs choses à la fois",
            value:
              "Problem : ça remarche mais on ne sait pas pourquoi — ni ce qui cassera la prochaine fois. Why : panique. Better : un changement, un test, noter.",
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
          "Méthode couche par couche : jamais de saut, jamais de supposition non testée.",
          "Tester l'IP avant le nom : isoler le DNS systématiquement.",
          "Diagnostiquer depuis la machine concernée, pas depuis son poste.",
          "Documenter : symptôme, tests, cause, correctif — à chaque fois.",
          "Deny by default côté firewall ; chaque règle est documentée et revue.",
          "Segmenter : les zones de confiance limitées réduisent l'impact des incidents.",
          "Chiffrer : TLS et VPN par défaut, pas par exception.",
          "Superviser avant la panne : disponibilité, latence, débit, logs.",
          "Un changement à la fois, testé, noté.",
          "Automatiser les vérifications récurrentes : un script de diagnostic vaut mieux qu'une checklist papier.",
        ],
      },
    ],
  },
  {
    id: "projets-avances",
    title: "Projets avancés",
    level: 3,
    intro:
      "Trois projets pour un niveau opérationnel.",
    blocks: [
      {
        kind: "fields",
        title: "À réaliser",
        fields: [
          {
            label: "Réseau d'entreprise simulé",
            value:
              "GNS3 : 3 sites, VLAN, routage inter-sites via VPN simulé, firewall avec règles documentées. Le projet synthèse.",
          },
          {
            label: "Supervision complète",
            value:
              "Sondes de disponibilité, graphes de latence/débit, alertes : superviser son lab comme une production.",
          },
          {
            label: "Audit de sécurité réseau",
            value:
              "Cartographier les expositions (ports ouverts vus de l'extérieur), vérifier firewall et segmentation, produire un rapport avec recommandations.",
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
        title: "Documentation et références",
        fields: [
          { label: "Practical Networking", value: "Chaîne YouTube (Practical Networking) : TCP/IP, subnetting, VLAN expliqués visuellement — la référence pédagogique citée par la roadmap." },
          { label: "TCP/IP — Wikipedia", value: "fr.wikipedia.org/wiki/Suite_des_protocoles_Internet : la vue d'ensemble structurée." },
          { label: "Wireshark Docs", value: "wireshark.org/docs : documentation officielle de l'analyseur, filtres et bonnes pratiques." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : un lab (GNS3 ou VMs) vaut tous les cours — chaque notion de cette page se vérifie en paquets réels.",
          "RFC : les textes fondateurs (ex. RFC 791 pour IP, RFC 793 pour TCP) pour les détails que les tutoriels survolent.",
          "Communauté : forums et labs partagés pour confronter ses topologies à des regards extérieurs.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Le networking praticien acquis, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Vers la sécurité : cybersecurity pour l'attaque et la défense, avec le réseau comme terrain.",
          "Vers l'infra : Docker puis Kubernetes — la connectivité entre conteneurs et services.",
          "Approfondir le web : HTTP en profondeur, puis nginx (reverse proxy, TLS, load balancing).",
          "Automatiser : Linux pour l'administration système qui va avec le réseau.",
          "Revenir à la roadmap : valider networking et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
  {
    id: "modeles-osi-tcpip",
    title: "Modèles OSI et TCP/IP",
    level: 3,
    intro:
      "La carte du réseau : 7 couches pour localiser les problèmes.",
    blocks: [
      {
        kind: "table",
        headers: ["Couche OSI", "Rôle", "Exemples"],
        rows: [
          ["7 — Application", "Services utilisés par l'utilisateur", "HTTP, DNS, SMTP"],
          ["6 — Présentation", "Format, chiffrement", "TLS, JSON"],
          ["5 — Session", "Dialogue entre machines", "Sessions, sockets"],
          ["4 — Transport", "Fiabilité de bout en bout", "TCP, UDP"],
          ["3 — Réseau", "Adressage et routage", "IP, ICMP"],
          ["2 — Liaison", "Trames sur le lien local", "Ethernet, Wi-Fi, VLAN"],
          ["1 — Physique", "Signaux, câbles", "Fibre, RJ45, radio"],
        ],
      },
      {
        kind: "text",
        text: "Usage pratique : un problème 'ça ne marche pas' se localise par couche — le câble (1), le lien (2), l'IP (3), le port (4), le TLS (6), l'application (7). Le modèle TCP/IP réel fusionne les couches hautes, mais OSI reste l'outil de diagnostic.",
      },
    ],
  },
  {
    id: "nat-avance",
    title: "NAT : partager une adresse publique",
    level: 3,
    intro:
      "Comment tout un réseau local sort avec une seule IP.",
    blocks: [
      {
        kind: "diagram",
        title: "NAT domestique / entreprise",
        lines: [
          "192.168.1.10 ─┐",
          "192.168.1.11 ─┼─► [ ROUTEUR / NAT ] ─► 203.0.113.5 ─► Internet",
          "192.168.1.12 ─┘         │",
          "                       └─ table de translation :",
          "                          192.168.1.10:54321 ↔ 203.0.113.5:60001",
          "                          192.168.1.11:54322 ↔ 203.0.113.5:60002",
        ],
      },
      {
        kind: "list",
        items: [
          "Le routeur réécrit l'adresse source et mémorise la correspondance pour router les réponses.",
          "Conséquence : depuis Internet, on ne peut pas initier une connexion vers un hôte derrière un NAT sans redirection de port.",
          "En entreprise : NAT + pare-feu sur le routeur de sortie, adressage privé RFC 1918 en interne.",
        ],
      },
    ],
  },
  {
    id: "dns-avance",
    title: "DNS en profondeur",
    level: 3,
    intro:
      "Au-delà de la résolution : les enregistrements qui font fonctionner Internet.",
    blocks: [
      {
        kind: "table",
        headers: ["Type", "Usage"],
        rows: [
          ["A / AAAA", "Nom → adresse IPv4 / IPv6"],
          ["CNAME", "Alias vers un autre nom (pas à la racine d'un domaine)"],
          ["MX", "Serveurs mail du domaine (avec priorité)"],
          ["TXT", "Textes libres : SPF, DKIM, vérifications de propriété"],
          ["NS", "Serveurs autoritaires du domaine"],
          ["PTR", "Adresse → nom (résolution inverse)"],
        ],
      },
      {
        kind: "command",
        label: "Interroger le DNS",
        command: "dig +short example.com MX",
        why: "Affiche les serveurs mail du domaine. `dig` (ou `nslookup` sous Windows) est l'outil d'inspection DNS : indispensable pour diagnostiquer les problèmes de mail, de site inaccessible ou de propagation.",
        verify: "dig +short example.com A",
      },
    ],
  },
  {
    id: "vpn-avance",
    title: "VPN : tunnels chiffrés",
    level: 3,
    intro:
      "Relier des réseaux distants comme s'ils étaient locaux.",
    blocks: [
      {
        kind: "fields",
        title: "Usages",
        fields: [
          {
            label: "Accès distant",
            value:
              "Un télétravailleur rejoint le réseau d'entreprise de façon chiffrée : il obtient une IP interne et accède aux ressources comme sur place.",
          },
          {
            label: "Site à site",
            value:
              "Deux bureaux reliés en permanence par un tunnel : un seul réseau logique sur deux sites physiques.",
          },
          {
            label: "Protocoles",
            value:
              "WireGuard (moderne, simple, rapide), OpenVPN (éprouvé, flexible), IPsec (standard entreprise). Le choix dépend du contexte, pas du marketing.",
          },
        ],
      },
      {
        kind: "text",
        text: "Un VPN ne rend pas 'anonyme' : il déplace la confiance vers l'opérateur du VPN. En entreprise, il s'intègre à l'authentification (MFA) et aux politiques d'accès.",
      },
    ],
  },
  {
    id: "zero-trust",
    title: "Zero Trust",
    level: 3,
    intro:
      "Ne faire confiance à personne : le modèle de sécurité moderne.",
    blocks: [
      {
        kind: "list",
        items: [
          "Principe : chaque requête est authentifiée et autorisée, même à l'intérieur du réseau — fini le 'périmètre de confiance'.",
          "Concrètement : identité forte (MFA), micro-segmentation, moindre privilège, chiffrement partout.",
          "Côté réseau : proxys d'accès, tunnels par application, pas de VPN 'tout ouvert' vers le LAN.",
          "Ce n'est pas un produit à acheter : c'est une architecture à construire progressivement.",
        ],
      },
    ],
  },
  {
    id: "haute-disponibilite-reseau",
    title: "Haute disponibilité réseau",
    level: 3,
    intro:
      "Pas de point unique de défaillance : la redondance.",
    blocks: [
      {
        kind: "fields",
        title: "Mécanismes",
        fields: [
          {
            label: "Redondance des liens",
            value:
              "Deux chemins physiques vers l'important : si un câble ou un opérateur tombe, le trafic bascule. Protocoles : STP (boucles commutées), routage dynamique.",
          },
          {
            label: "VRRP / HSRP",
            value:
              "Une adresse IP virtuelle partagée par deux routeurs : si le maître tombe, le second prend l'IP en quelques secondes.",
          },
          {
            label: "Load balancing",
            value:
              "Répartir la charge entre plusieurs serveurs (round-robin, least-connections) : performance ET tolérance de panne.",
          },
          {
            label: "Anycast",
            value:
              "La même IP annoncée depuis plusieurs endroits : le routage envoie vers le plus proche — utilisé par les DNS racine et les CDN.",
          },
        ],
      },
    ],
  },
];

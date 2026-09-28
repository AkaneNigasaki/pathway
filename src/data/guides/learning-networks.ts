import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète des Réseaux (networks) : les fondamentaux —
 * comprendre ce qui se passe entre le clic et la réponse du serveur.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_NETWORKS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est un réseau informatique et pourquoi chaque développeur en a besoin.",
    blocks: [
      {
        kind: "text",
        text: "Un réseau informatique relie des machines pour qu'elles échangent des données : votre téléphone au routeur, le routeur au serveur du site visité. Derrière un simple clic se cachent des protocoles (des règles de dialogue), des adresses (pour se trouver) et du routage (pour acheminer).",
      },
      {
        kind: "text",
        text: "Pourquoi l'apprendre : chaque application moderne est distribuée. DNS, TCP/IP, ports, latence — ces notions expliquent les pannes, les lenteurs et les problèmes de sécurité rencontrés au quotidien. C'est aussi le socle du DevOps et de la cybersécurité.",
      },
      {
        kind: "text",
        text: "Ce skill est la théorie fondatrice ; 'networking' (skill séparé) en est la pratique : diagnostiquer, configurer, sécuriser. Ici on comprend, là-bas on agit.",
      },
    ],
  },
  {
    id: "panorama-reseaux",
    title: "Les réseaux en une image",
    level: 1,
    intro:
      "Le voyage d'une requête, du clic à la réponse.",
    blocks: [
      {
        kind: "diagram",
        title: "Ouvrir un site web : ce qui se passe",
        lines: [
          "1. Vous saisissez une URL dans le navigateur",
          "     │",
          "     ▼",
          "2. DNS : le nom devient une adresse IP",
          "     │",
          "     ▼",
          "3. TCP : connexion au serveur sur le port 443",
          "     │",
          "     ▼",
          "4. TLS : la connexion est chiffrée (le cadenas)",
          "     │",
          "     ▼",
          "5. HTTP : la requête part, les paquets sont routés",
          "     │  à travers routeurs et câbles",
          "     ▼",
          "6. Le serveur répond : paquets, réassemblage,",
          "   déchiffrement → la page s'affiche",
        ],
      },
      {
        kind: "list",
        items: [
          "Tout échange suit ce schéma : nommer (DNS), connecter (TCP), sécuriser (TLS), dialoguer (HTTP).",
          "Les données voyagent en paquets : découpées, routées indépendamment, réassemblées à l'arrivée.",
          "Comprendre ce voyage, c'est pouvoir dire OÙ ça casse quand ça casse.",
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
      "Le minimum pour aborder sereinement.",
    blocks: [
      {
        kind: "fields",
        title: "Bases",
        fields: [
          {
            label: "Culture informatique",
            value:
              "Savoir ce qu'est un ordinateur, un programme, internet au sens large : le point de départ.",
          },
          {
            label: "Terminal (bases)",
            value:
              "Ouvrir un terminal et taper une commande : les premières manipulations réseau se font en ligne de commande.",
          },
        ],
      },
      {
        kind: "text",
        text: "Aucune programmation requise. Ce skill est volontairement accessible : c'est la porte d'entrée vers l'infrastructure.",
      },
    ],
  },
  {
    id: "premieres-commandes",
    title: "Premières commandes réseau",
    level: 2,
    intro:
      "Toucher le réseau du doigt : deux commandes, des résultats concrets.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier qu'une machine répond",
        command: "ping -c 4 8.8.8.8",
        why: "Envoie 4 paquets vers le serveur DNS de Google et mesure les allers-retours. Si ça répond, votre machine parle à internet. Le `-c 4` évite que la commande tourne indéfiniment.",
        verify: "ping -c 1 127.0.0.1",
      },
      {
        kind: "command",
        label: "Voir sa propre adresse IP",
        command: "ip addr show",
        why: "Affiche les interfaces réseau de la machine et leurs adresses : c'est votre identité sur le réseau local. Repérer l'interface principale (souvent `wlan0` en Wi-Fi, `eth0` en filaire) et son adresse `192.168.x.x`.",
      },
      {
        kind: "text",
        text: "Ces deux commandes sont 80 % du diagnostic de niveau 1 : 'ai-je une adresse ?' puis 'puis-je joindre l'extérieur ?'. Tout le reste affine.",
      },
    ],
  },
  {
    id: "modele-osi",
    title: "Le modèle OSI",
    level: 2,
    intro:
      "Les 7 couches : la carte du territoire réseau.",
    blocks: [
      {
        kind: "fields",
        title: "Les 7 couches, de bas en haut",
        fields: [
          { label: "1. Physique", value: "Les câbles, les ondes radio, les connecteurs : transporter des bits." },
          { label: "2. Liaison", value: "Ethernet, Wi-Fi : dialoguer sur un même segment, adresses MAC." },
          { label: "3. Réseau", value: "IP et routage : acheminer les paquets entre réseaux." },
          { label: "4. Transport", value: "TCP/UDP : ports, fiabilité, ordre des données." },
          { label: "5. Session", value: "Gérer les sessions de communication (souvent fusionnée avec les autres en pratique)." },
          { label: "6. Présentation", value: "Formats, chiffrement : TLS vit ici conceptuellement." },
          { label: "7. Application", value: "HTTP, DNS, SSH, FTP : les protocoles que les applications utilisent." },
        ],
      },
      {
        kind: "text",
        text: "Le modèle OSI est une grille de lecture, pas une implémentation : internet utilise en réalité la pile TCP/IP (4 couches). Mais 'à quelle couche est le problème ?' reste LA question du diagnostic — et l'OSI donne le vocabulaire pour y répondre.",
      },
    ],
  },
  {
    id: "tcp-ip",
    title: "TCP/IP : la pile d'Internet",
    level: 2,
    intro:
      "Les 4 couches réellement utilisées, simplement.",
    blocks: [
      {
        kind: "fields",
        title: "Les 4 couches",
        fields: [
          {
            label: "Accès réseau",
            value:
              "Ethernet/Wi-Fi : envoyer des trames sur le lien local (couvre OSI 1-2).",
          },
          {
            label: "Internet (IP)",
            value:
              "Adresser et router les paquets entre réseaux (OSI 3). Chaque paquet porte une IP source et destination.",
          },
          {
            label: "Transport (TCP/UDP)",
            value:
              "Ports et fiabilité (OSI 4). TCP = fiable et ordonné (web, mail) ; UDP = rapide sans garantie (DNS, streaming).",
          },
          {
            label: "Application",
            value:
              "HTTP, DNS, SSH… (OSI 5-7) : ce que les logiciels utilisent directement.",
          },
        ],
      },
      {
        kind: "diagram",
        title: "Encapsulation",
        lines: [
          "Message applicatif",
          "  └─► + en-tête TCP (ports) = segment",
          "        └─► + en-tête IP (adresses) = paquet",
          "              └─► + en-tête Ethernet (MAC) = trame",
        ],
      },
    ],
  },
  {
    id: "adressage-ip",
    title: "Adressage IP",
    level: 2,
    intro:
      "L'identifiant des machines : adresses, masques, privé vs public.",
    blocks: [
      {
        kind: "text",
        text: "Une adresse IPv4, c'est 4 nombres (`192.168.1.10`). Le masque (notation CIDR comme `/24`) sépare la partie 'réseau' de la partie 'machine'. Deux machines ne se parlent directement que si elles sont sur le même réseau — sinon, ça passe par un routeur.",
      },
      {
        kind: "table",
        headers: ["Plage", "Usage", "Exemple"],
        rows: [
          ["`10.0.0.0/8`", "Privé (entreprise)", "Réseaux internes"],
          ["`172.16.0.0/12`", "Privé", "Réseaux internes, Docker"],
          ["`192.168.0.0/16`", "Privé (maison)", "Box internet, Wi-Fi domestique"],
          ["`127.0.0.0/8`", "Loopback", "`127.0.0.1` = la machine elle-même"],
          ["Autres", "Public", "Adresses routables sur internet"],
        ],
      },
      {
        kind: "text",
        text: "Les adresses privées ne circulent pas sur internet : votre box fait la translation (NAT) entre votre `192.168.x.x` et son IP publique. C'est pour ça que deux maisons peuvent utiliser les mêmes adresses privées sans conflit.",
      },
    ],
  },
  {
    id: "dns",
    title: "DNS : l'annuaire",
    level: 2,
    intro:
      "Comment `example.com` devient une adresse IP.",
    blocks: [
      {
        kind: "text",
        text: "Le DNS traduit les noms en adresses IP via une hiérarchie : votre machine interroge un résolveur, qui interroge les serveurs racine, puis ceux du domaine (`.com`), puis le serveur autoritaire du domaine. Chaque réponse est mise en cache pour un temps (TTL).",
      },
      {
        kind: "steps",
        steps: [
          {
            title: "Saisir le nom",
            detail:
              "Vous tapez `example.com`. Le navigateur vérifie d'abord ses propres caches, puis celui du système.",
          },
          {
            title: "Interroger le résolveur",
            detail:
              "La requête part vers le résolveur configuré (box, FAI, ou 8.8.8.8/1.1.1.1) : 'quelle est l'IP de example.com ?'",
          },
          {
            title: "Remonter la hiérarchie",
            detail:
              "Racine → `.com` → serveur autoritaire : chaque niveau indique le suivant, jusqu'à la réponse.",
          },
          {
            title: "Mettre en cache et répondre",
            detail:
              "Le résolveur garde la réponse (durée = TTL) et la transmet. Les prochaines requêtes sont instantanées.",
          },
        ],
      },
      {
        kind: "text",
        text: "La moitié des 'pannes internet' sont des pannes DNS : les IPs passent, les noms ne résolvent plus. Savoir tester le DNS séparément (`ping` sur IP vs sur nom) est un réflexe fondamental.",
      },
    ],
  },
  {
    id: "ports",
    title: "Les ports",
    level: 2,
    intro:
      "Comment une machine distingue ses services : les numéros de port.",
    blocks: [
      {
        kind: "text",
        text: "Une adresse IP désigne une machine ; le port désigne le service sur cette machine (0-65535). Quand vous ouvrez un site en HTTPS, vous parlez à l'IP du serveur sur son port 443.",
      },
      {
        kind: "table",
        headers: ["Port", "Service", "Usage"],
        rows: [
          ["80", "HTTP", "Web non chiffré"],
          ["443", "HTTPS", "Web chiffré"],
          ["22", "SSH", "Administration distante"],
          ["53", "DNS", "Résolution de noms"],
          ["25 / 587", "SMTP", "Envoi d'emails"],
          ["3306", "MySQL", "Base de données"],
          ["5432", "PostgreSQL", "Base de données"],
        ],
      },
      {
        kind: "text",
        text: "'Le service ne répond pas' se décompose en : la machine est-elle joignable (ping) ? le port est-il ouvert et en écoute ? le service derrière fonctionne-t-il ? Trois questions, trois couches différentes.",
      },
    ],
  },
  {
    id: "routage",
    title: "Routage",
    level: 2,
    intro:
      "Acheminer les paquets : le rôle des routeurs.",
    blocks: [
      {
        kind: "text",
        text: "Un routeur relie des réseaux : il reçoit un paquet, lit l'IP de destination, consulte sa table de routage et le transmet au prochain saut. De proche en proche, le paquet traverse internet jusqu'à destination.",
      },
      {
        kind: "diagram",
        title: "De votre PC au serveur",
        lines: [
          "PC ──► Box/routeur ──► FAI ──► … ──► FAI distant",
          "                                            │",
          "                                            ▼",
          "                                     Serveur (datacenter)",
          "Chaque ──► est un routeur qui décide du prochain saut.",
          "La route par défaut (default gateway) : 'tout ce que",
          "je ne connais pas, je l'envoie là'.",
        ],
      },
    ],
  },
  {
    id: "observer-son-reseau",
    title: "Observer son propre réseau",
    level: 2,
    intro:
      "Mettre les notions en pratique sur son installation.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Trouver sa passerelle",
            detail:
              "`ip route show` : la ligne `default via 192.168.x.1` donne l'adresse de votre routeur. C'est lui qui vous relie à internet.",
          },
          {
            title: "Pinger la passerelle",
            detail:
              "`ping -c 4 <adresse_passerelle>` : si ça répond vite (< 5 ms en général), votre lien local est sain.",
          },
          {
            title: "Comparer local et distant",
            detail:
              "Pinger la passerelle puis `8.8.8.8` : la différence de temps montre le coût du trajet internet vs local.",
          },
          {
            title: "Voir qui écoute sur sa machine",
            detail:
              "`ss -tulpn` : découvrir quels services tournent localement et sur quels ports. Souvent une surprise instructive.",
          },
        ],
      },
    ],
  },
  {
    id: "vocabulaire",
    title: "Vocabulaire essentiel",
    level: 2,
    intro:
      "Les mots qui reviennent partout, en une phrase chacun.",
    blocks: [
      {
        kind: "fields",
        title: "Glossaire",
        fields: [
          { label: "Paquet", value: "Un morceau de données avec ses en-têtes : l'unité de transport sur IP." },
          { label: "Protocole", value: "Les règles d'un dialogue réseau (HTTP, TCP, DNS…)." },
          { label: "Adresse MAC", value: "L'identifiant physique d'une carte réseau, utilisé en local." },
          { label: "Passerelle", value: "Le routeur par lequel sort le trafic vers d'autres réseaux." },
          { label: "Latence", value: "Le temps d'aller-retour d'un paquet : la 'vitesse de réaction'." },
          { label: "Débit", value: "La quantité de données par seconde : la 'largeur du tuyau'." },
          { label: "Firewall", value: "Le filtre qui autorise ou bloque le trafic selon des règles." },
          { label: "LAN / WAN", value: "Réseau local (maison, bureau) vs réseau étendu (internet)." },
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro:
      "Trois projets pour ancrer les fondamentaux.",
    blocks: [
      {
        kind: "fields",
        title: "Dans l'ordre",
        fields: [
          {
            label: "1. Cartographier son réseau",
            value:
              "Adresses, passerelle, DNS, appareils connectés : dessiner son réseau domestique sur papier. Objectif : voir l'abstrait dans le concret.",
          },
          {
            label: "2. Analyser du trafic avec Wireshark",
            value:
              "Capturer une navigation, filtrer le DNS, suivre une connexion TCP : voir les protocoles du cours en paquets réels.",
          },
          {
            label: "3. Diagnostiquer une panne",
            value:
              "Provoquer (ou simuler) une panne — mauvais DNS, câble débranché — et appliquer la méthode couche par couche. Objectif : le réflexe diagnostic.",
          },
        ],
      },
    ],
  },
  {
    id: "limites",
    title: "Ce que ce skill ne couvre pas",
    level: 2,
    intro:
      "Situer 'networks' dans le parcours.",
    blocks: [
      {
        kind: "list",
        items: [
          "La configuration avancée (VLAN, firewall, routage dynamique) : c'est le skill 'networking'.",
          "L'attaque et la défense réseau : c'est la cybersécurité.",
          "L'administration système des serveurs : c'est Linux.",
          "Ici : comprendre. Ensuite : pratiquer avec 'networking', puis sécuriser avec 'cybersecurity'.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "paquets-trames",
    title: "Paquets, trames, segments",
    level: 3,
    intro:
      "Le bon mot à chaque couche : le vocabulaire précis.",
    blocks: [
      {
        kind: "table",
        headers: ["Unité", "Couche", "Contient"],
        rows: [
          ["Trame (frame)", "Liaison (2)", "Adresses MAC source/destination"],
          ["Paquet (packet)", "Réseau (3)", "IPs source/destination"],
          ["Segment", "Transport (4) — TCP", "Ports, numéros de séquence"],
          ["Datagramme", "Transport (4) — UDP", "Ports, sans garantie"],
          ["Message", "Application (7)", "Les données utiles (HTTP…)"],
        ],
      },
      {
        kind: "text",
        text: "Dire 'paquet TCP' est un abus courant (c'est un segment dans un paquet dans une trame). En pratique, 'paquet' est devenu le terme générique — mais connaître les distinctions aide à lire la documentation technique.",
      },
    ],
  },
  {
    id: "tcp-vs-udp",
    title: "TCP vs UDP en détail",
    level: 3,
    intro:
      "Deux philosophies du transport : choisir selon le besoin.",
    blocks: [
      {
        kind: "table",
        headers: ["", "TCP", "UDP"],
        rows: [
          ["Fiabilité", "Garantie : acquittements, retransmissions", "Aucune : les pertes sont possibles"],
          ["Ordre", "Garanti", "Non garanti"],
          ["Connexion", "Oui (handshake en 3 temps)", "Non (envoi direct)"],
          ["Vitesse", "Overhead et latence", "Minimal, rapide"],
          ["Usages", "Web, mail, fichiers, bases", "DNS, streaming, jeux, VoIP"],
        ],
      },
      {
        kind: "text",
        text: "L'intuition : TCP quand chaque octet compte (un fichier corrompu ne sert à rien), UDP quand le temps compte plus que la perfection (une image vidéo perdue se remarque à peine). Le DNS utilise UDP : une requête petite, une réponse petite — et retente en TCP si besoin.",
      },
    ],
  },
  {
    id: "handshake",
    title: "Le handshake TCP",
    level: 3,
    intro:
      "SYN, SYN-ACK, ACK : comment une connexion naît.",
    blocks: [
      {
        kind: "diagram",
        title: "Les 3 temps",
        lines: [
          "Client                           Serveur",
          "  │  SYN                           │",
          "  │ ─────────────────────────────► │",
          "  │  SYN-ACK                       │",
          "  │ ◄───────────────────────────── │",
          "  │  ACK                           │",
          "  │ ─────────────────────────────► │",
          "  │  Connexion établie : données   │",
        ],
      },
      {
        kind: "text",
        text: "Ce dialogue préalable synchronise les numéros de séquence : c'est ce qui permettra l'ordre et la fiabilité ensuite. Un serveur qui ne répond pas au SYN (port fermé, firewall, machine éteinte) = connexion impossible. Visible dans Wireshark en filtrant les flags TCP.",
      },
    ],
  },
  {
    id: "dns-enregistrements",
    title: "Les enregistrements DNS",
    level: 3,
    intro:
      "Le DNS ne fait pas que 'nom → IP' : les types d'enregistrements.",
    blocks: [
      {
        kind: "table",
        headers: ["Type", "Rôle", "Exemple"],
        rows: [
          ["A", "Nom → IPv4", "Le site web"],
          ["AAAA", "Nom → IPv6", "Le site en IPv6"],
          ["CNAME", "Alias vers un autre nom", "`www` vers le domaine principal"],
          ["MX", "Serveurs mail", "Qui reçoit les emails du domaine"],
          ["TXT", "Texte libre", "Preuves de propriété, anti-spam (SPF)"],
          ["NS", "Serveurs autoritaires", "Qui fait autorité pour le domaine"],
        ],
      },
      {
        kind: "text",
        text: "Un domaine sans MX ne reçoit pas de mail ; un CNAME en chaîne rallonge la résolution ; un TXT mal configuré fait classer les emails en spam. Le DNS est une infrastructure critique déguisée en annuaire.",
      },
    ],
  },
  {
    id: "dhcp-detail",
    title: "DHCP en détail",
    level: 3,
    intro:
      "Comment les machines obtiennent leur configuration automatiquement.",
    blocks: [
      {
        kind: "text",
        text: "Le dialogue DORA : Discover (qui peut me donner une IP ?), Offer (prends celle-ci), Request (je la prends), Ack (noté). Le serveur fournit IP, masque, passerelle et DNS — d'où l'importance d'un DHCP bien configuré : une mauvaise passerelle ou un mauvais DNS et 'internet ne marche pas'.",
      },
      {
        kind: "list",
        items: [
          "Le bail (lease) a une durée : la machine renouvelle périodiquement, d'où des IPs qui peuvent changer.",
          "IP statique vs DHCP : les serveurs et équipements d'infra ont des IPs fixes (ou réservations DHCP) ; les clients sont en dynamique.",
          "Panne typique : deux serveurs DHCP sur le même réseau distribuent des configurations contradictoires.",
        ],
      },
    ],
  },
  {
    id: "nat-detail",
    title: "NAT en détail",
    level: 3,
    intro:
      "Le partage d'une IP publique : mécanisme et conséquences.",
    blocks: [
      {
        kind: "text",
        text: "Le routeur réécrit les paquets sortants (IP privée → IP publique + port unique) et tient une table de correspondance pour le retour. C'est le PAT (Port Address Translation), le NAT domestique courant.",
      },
      {
        kind: "list",
        items: [
          "Conséquence 1 : les adresses privées sont réutilisables partout (chaque maison a son 192.168.1.x).",
          "Conséquence 2 : injoignable depuis l'extérieur sans redirection de port — une protection par défaut.",
          "Conséquence 3 : certains protocoles (jeux P2P, VoIP) peinent à traverser le NAT — d'où les techniques de 'hole punching'.",
          "IPv6 rend le NAT inutile : assez d'adresses pour tout le monde, le firewall suffit.",
        ],
      },
    ],
  },
  {
    id: "http-sur-tcp",
    title: "HTTP sur TCP : l'exemple complet",
    level: 3,
    intro:
      "Assembler les couches sur un cas réel : charger une page.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Résolution DNS",
            detail:
              "Le nom devient une IP (requête UDP vers le port 53 du résolveur, réponse mise en cache).",
          },
          {
            title: "Connexion TCP",
            detail:
              "Handshake en 3 temps vers l'IP sur le port 443 : la connexion fiable est établie.",
          },
          {
            title: "Handshake TLS",
            detail:
              "Négociation du chiffrement, vérification du certificat : le cadenas apparaît.",
          },
          {
            title: "Requête HTTP",
            detail:
              "`GET / HTTP/1.1` avec les headers (Host, User-Agent…) voyage chiffrée dans la connexion.",
          },
          {
            title: "Réponse et ressources",
            detail:
              "Le serveur répond (statut 200, HTML), puis le navigateur ouvre d'autres connexions pour images, CSS, JS — dizaines de requêtes pour une page.",
          },
          {
            title: "Fermeture",
            detail:
              "Les connexions se ferment (ou sont réutilisées en keep-alive). Chaque étape a pris des millisecondes.",
          },
        ],
      },
    ],
  },
  {
    id: "wifi-vs-ethernet",
    title: "Wi-Fi vs Ethernet",
    level: 3,
    intro:
      "Deux couches liaison, deux réalités : comparatif factuel.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Ethernet (câble)", "Wi-Fi (radio)"],
        rows: [
          ["Support", "Câble dédié, pas d'interférences", "Ondes partagées, interférences possibles"],
          ["Stabilité", "Très stable, latence constante", "Variable (distance, obstacles, voisins)"],
          ["Débit réel", "Proche du nominal", "Souvent moitié du nominal en pratique"],
          ["Sécurité", "Accès physique requis", "Chiffrement (WPA2/WPA3) indispensable"],
          ["Usage", "Postes fixes, serveurs, gaming", "Mobilité, appareils nomades"],
        ],
      },
      {
        kind: "text",
        text: "'Le Wi-Fi est lent' se diagnostique : distance de la box, canal encombré (voisins), vieux standard, ou vraie panne FAI ? Le câble reste la référence pour isoler un problème Wi-Fi.",
      },
    ],
  },
  {
    id: "latence-vs-debit",
    title: "Latence vs débit",
    level: 3,
    intro:
      "Les deux mesures de la performance réseau : ne pas les confondre.",
    blocks: [
      {
        kind: "text",
        text: "Le débit, c'est la largeur du tuyau (combien de données par seconde). La latence, c'est le temps de trajet (combien de temps pour un aller-retour). Une fibre à 1 Gb/s vers un serveur à l'autre bout du monde télécharge vite mais réagit avec 300 ms de délai.",
      },
      {
        kind: "list",
        items: [
          "Le débit sert aux gros transferts (téléchargements, streaming 4K).",
          "La latence sert à l'interactivité (jeux, visio, SSH, trading).",
          "La latence dépend surtout de la distance (vitesse de la lumière dans la fibre) : incompressible.",
          "Mesurer : `ping` pour la latence, un test de débit pour le débit. Deux outils, deux réalités.",
        ],
      },
    ],
  },
  {
    id: "ipv6-bases",
    title: "IPv6 : l'essentiel",
    level: 3,
    intro:
      "128 bits, notation hexadécimale : les bases sans panique.",
    blocks: [
      {
        kind: "text",
        text: "IPv6 répond à l'épuisement d'IPv4 : des adresses sur 128 bits en hexadécimal (`2001:db8::1`, où `::` comprime les zéros). Assez d'adresses pour chaque appareil sans NAT.",
      },
      {
        kind: "list",
        items: [
          "Coexistence : les deux protocoles tournent en parallèle (dual-stack) — la transition dure depuis des années.",
          "Sans NAT : chaque machine peut être adressable publiquement — le firewall devient le seul garde-fou.",
          "En pratique : savoir reconnaître une adresse IPv6, comprendre qu'un `ping6` existe, et vérifier que les règles de sécurité couvrent les deux piles.",
        ],
      },
    ],
  },
  {
    id: "sous-reseaux",
    title: "Sous-réseaux et CIDR",
    level: 3,
    intro:
      "Découper pour organiser : la notation CIDR.",
    blocks: [
      {
        kind: "text",
        text: "`192.168.1.0/24` signifie : les 24 premiers bits = le réseau (256 adresses). Plus le nombre après `/` est grand, plus le réseau est petit : `/16` = 65 536 adresses, `/30` = 4 (une liaison entre deux routeurs).",
      },
      {
        kind: "list",
        items: [
          "À quoi ça sert : organiser (un sous-réseau par service/étage), sécuriser (filtrer entre sous-réseaux), router.",
          "L'adresse réseau (`…0`) et l'adresse de broadcast (`…255` en /24) ne sont pas attribuables aux machines.",
          "En pratique courante : comprendre la notation suffit ; le découpage fin est du ressort du skill 'networking'.",
        ],
      },
    ],
  },
  {
    id: "firewalls-bases",
    title: "Firewalls : les bases",
    level: 3,
    intro:
      "Le filtrage : autoriser le nécessaire, bloquer le reste.",
    blocks: [
      {
        kind: "text",
        text: "Un firewall applique des règles ordonnées : autoriser ou refuser le trafic selon IP, port, protocole, direction. La politique saine est 'deny by default' : tout est bloqué sauf ce qui est explicitement ouvert.",
      },
      {
        kind: "list",
        items: [
          "Il y en a partout : sur votre PC, sur la box, sur les serveurs, dans le cloud (security groups).",
          "'Ça marche en local mais pas à distance' = suspect n°1 : un firewall sur le chemin.",
          "Un firewall mal configuré bloque le légitime ; un firewall absent expose tout. L'équilibre est dans les règles minimales et documentées.",
        ],
      },
    ],
  },
  {
    id: "vpn-bases",
    title: "VPN : les bases",
    level: 3,
    intro:
      "Des tunnels chiffrés à travers internet.",
    blocks: [
      {
        kind: "text",
        text: "Un VPN encapsule le trafic dans un tunnel chiffré entre deux points : télétravailleur ↔ entreprise, ou deux sites distants. Vu de l'intérieur, c'est comme si les machines étaient sur le même réseau local.",
      },
      {
        kind: "list",
        items: [
          "Usage pro : accéder aux ressources internes à distance, relier des sites.",
          "Le VPN chiffre le trajet jusqu'à sa sortie : au-delà, c'est le protocole final (HTTPS…) qui protège.",
          "Protocoles courants : WireGuard (moderne, simple), OpenVPN et IPsec (historiques, répandus).",
        ],
      },
    ],
  },
  {
    id: "cloud-reseaux",
    title: "Les réseaux dans le cloud",
    level: 3,
    intro:
      "VPC et compagnie : le réseau défini par logiciel.",
    blocks: [
      {
        kind: "text",
        text: "Dans le cloud, le réseau est logiciel : un VPC (Virtual Private Cloud) est votre réseau privé virtuel, découpé en sous-réseaux, avec ses tables de routage et ses groupes de sécurité (firewalls). Les mêmes concepts — adresses, sous-réseaux, routage, filtrage — s'appliquent, manipulés par API.",
      },
      {
        kind: "list",
        items: [
          "Groupes de sécurité : des firewalls par instance, en allow-list (deny by default).",
          "Sous-réseaux publics vs privés : ce qui a une IP publique et ce qui n'en a pas.",
          "Le modèle mental reste identique : ce skill s'applique tel quel au cloud.",
        ],
      },
    ],
  },
  {
    id: "debugging",
    title: "Debugging réseau",
    level: 3,
    intro:
      "La méthode couche par couche : le réflexe à garder.",
    blocks: [
      {
        kind: "fields",
        title: "La check-list",
        fields: [
          { label: "Lien", value: "Câble branché ? Wi-Fi connecté ? Interface UP (`ip link`) ?" },
          { label: "Adresse", value: "Ai-je une IP (`ip addr`) ? Vient-elle du DHCP ?" },
          { label: "Local", value: "La passerelle répond-elle (`ping`) ?" },
          { label: "Internet", value: "Une IP publique répond-elle (`ping 8.8.8.8`) ?" },
          { label: "DNS", value: "Les noms résolvent-ils (`ping` sur nom vs sur IP) ?" },
          { label: "Service", value: "Le port est-il ouvert et le service en écoute ?" },
        ],
      },
      {
        kind: "text",
        text: "S'arrêter à la première couche en échec : c'est là qu'est le problème. Cette méthode résout l'immense majorité des pannes sans aucun outil avancé.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les confusions classiques des débutants.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Confondre débit et latence",
            value:
              "Problem : 'ma fibre est lente' sur un jeu en ligne. Why : le débit est élevé mais la latence (distance au serveur) ne se compense pas. Better : mesurer les deux séparément.",
          },
          {
            label: "'Internet ne marche pas' = DNS",
            value:
              "Problem : on réinitialise la box alors que seul le DNS est en panne. Why : on ne teste pas l'IP directement. Better : `ping 8.8.8.8` avant toute chose.",
          },
          {
            label: "Croire que le Wi-Fi = internet",
            value:
              "Problem : 'connecté' mais rien ne charge. Why : le Wi-Fi n'est que le lien local ; la panne peut être au-delà. Better : distinguer lien local et connectivité internet.",
          },
          {
            label: "IP publique vs privée",
            value:
              "Problem : donner son 192.168.x.x à un ami pour 'se connecter'. Why : les privées ne sont pas routables. Better : comprendre le NAT et ce qui est joignable depuis l'extérieur.",
          },
          {
            label: "Le firewall oublié",
            value:
              "Problem : 'ça marche en local'. Why : un firewall bloque à distance. Better : vérifier l'écoute locale puis les filtrages, dans l'ordre.",
          },
          {
            label: "TCP = toujours mieux",
            value:
              "Problem : vouloir du TCP partout. Why : 'fiable = mieux'. Better : la fiabilité a un coût ; le DNS et le streaming montrent que l'imparfait rapide a sa place.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro: "Les réflexes d'un esprit réseau sain.",
    blocks: [
      {
        kind: "list",
        items: [
          "Diagnostiquer couche par couche, sans sauter d'étape.",
          "Tester l'IP avant le nom : isoler le DNS en premier.",
          "Mesurer latence ET débit : deux métriques, deux diagnostics.",
          "Documenter son réseau : plan d'adressage, équipements, mots de passe (en lieu sûr).",
          "Chiffrer : préférer les protocoles chiffrés (HTTPS, SSH) systématiquement.",
          "Firewall actif partout, règles minimales.",
          "Mettre à jour box et équipements : les firmwares corrigent des failles.",
          "Apprendre avec un lab : chaque notion se vérifie en paquets réels.",
        ],
      },
    ],
  },
  {
    id: "projets-avances",
    title: "Projets avancés",
    level: 3,
    intro:
      "Trois projets pour consolider.",
    blocks: [
      {
        kind: "fields",
        title: "À réaliser",
        fields: [
          {
            label: "Analyse Wireshark complète",
            value:
              "Capturer une session web complète et y retrouver : DNS, handshake TCP, handshake TLS, requêtes HTTP, fermeture. Annoter chaque paquet.",
          },
          {
            label: "Réseau domestique documenté",
            value:
              "Plan d'adressage, inventaire des appareils, règles de la box, sauvegardes de configuration : administrer son réseau comme un pro.",
          },
          {
            label: "Maquette multi-réseaux",
            value:
              "Deux sous-réseaux + routeur (VMs ou GNS3), routage fonctionnel, firewall entre les deux : le mini-Internet.",
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
        title: "Références (à privilégier)",
        fields: [
          { label: "Réseau informatique — Wikipedia", value: "fr.wikipedia.org/wiki/Réseau_informatique : la vue d'ensemble structurée citée par la roadmap." },
          { label: "Practical Networking", value: "Chaîne YouTube : les fondamentaux expliqués visuellement, du modèle OSI au subnetting." },
          { label: "Wireshark", value: "wireshark.org : l'analyseur de paquets gratuit — le laboratoire de ce skill." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : chaque notion de cette page se vérifie avec `ping`, `ip`, `dig` et Wireshark sur sa propre machine.",
          "Ensuite : le skill 'networking' pour la pratique professionnelle (diagnostic, VLAN, firewall).",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Les fondamentaux acquis, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Passer à la pratique : networking — diagnostiquer, configurer, sécuriser pour de vrai.",
          "Vers la sécurité : cybersecurity, où le réseau est le terrain des attaques et des défenses.",
          "Côté web : HTTP en profondeur pour comprendre le protocole applicatif n°1.",
          "Côté système : Linux, le système où vivent tous ces outils.",
          "Revenir à la roadmap : valider networks et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
  {
    id: "adresses-ip",
    title: "Adresses IP",
    level: 3,
    intro:
      "L'adresse des machines : IPv4, IPv6, public vs privé.",
    blocks: [
      {
        kind: "fields",
        title: "À retenir",
        fields: [
          {
            label: "IPv4",
            value:
              "4 nombres de 0 à 255 (ex. `192.168.1.10`) : ~4 milliards d'adresses, épuisées — d'où le NAT. Encore omniprésent.",
          },
          {
            label: "IPv6",
            value:
              "128 bits en hexadécimal (ex. `2001:db8::1`) : un espace immense, plus besoin de NAT. Adoption croissante, cohabitation avec IPv4.",
          },
          {
            label: "Privées vs publiques",
            value:
              "Plages privées (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) : utilisables librement en interne, non routables sur Internet. Tout le reste est public.",
          },
          {
            label: "Adresse de loopback",
            value:
              "`127.0.0.1` (localhost) : la machine elle-même. Pour tester un service en local sans passer par le réseau.",
          },
        ],
      },
      {
        kind: "command",
        label: "Voir ses adresses",
        command: "ip addr",
        why: "Affiche les interfaces réseau et leurs adresses IP (Linux). Sous Windows : `ipconfig`. Première commande à connaître quand 'le réseau ne marche pas'.",
        verify: "ip -brief addr",
      },
    ],
  },
  {
    id: "sous-reseaux-avance",
    title: "Sous-réseaux et masques",
    level: 3,
    intro:
      "Découper l'espace d'adressage : le CIDR.",
    blocks: [
      {
        kind: "table",
        headers: ["Notation", "Masque", "Adresses utilisables"],
        rows: [
          ["/24", "255.255.255.0", "254 (le classique du réseau local)"],
          ["/16", "255.255.0.0", "65 534"],
          ["/30", "255.255.255.252", "2 (liaison point à point)"],
          ["/32", "255.255.255.255", "1 (une seule machine)"],
        ],
      },
      {
        kind: "text",
        text: "Le nombre après le `/` = bits de réseau. Deux machines communiquent directement si elles sont dans le même sous-réseau ; sinon, le trafic passe par la passerelle (routeur). `192.168.1.10/24` : réseau `192.168.1.0`, 254 hôtes possibles.",
      },
    ],
  },
  {
    id: "routage-avance",
    title: "Routage",
    level: 3,
    intro:
      "Comment un paquet trouve son chemin vers sa destination.",
    blocks: [
      {
        kind: "diagram",
        title: "Décision de routage",
        lines: [
          "Paquet vers 203.0.113.77",
          "     │",
          "     ▼",
          "Table de routage :",
          "  192.168.1.0/24 → direct (lien local)",
          "  10.0.0.0/8     → via 192.168.1.1",
          "  0.0.0.0/0      → via 192.168.1.254 (passerelle par défaut)",
          "     │",
          "     ▼",
          "Envoi à la passerelle par défaut,",
          "qui recommence (de proche en proche).",
        ],
      },
      {
        kind: "command",
        label: "Voir la table de routage",
        command: "ip route",
        why: "Affiche les routes connues par la machine, dont la passerelle par défaut (`default via …`). Si Internet ne répond pas mais le local oui, c'est ici que ça se voit.",
        verify: "ip route show default",
      },
    ],
  },
  {
    id: "dns-fonctionnement",
    title: "DNS : le fonctionnement",
    level: 3,
    intro:
      "Comment un nom devient une adresse, étape par étape.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Le cache local",
            detail:
              "Le système vérifie d'abord son cache (et le fichier hosts) : si le nom a été résolu récemment, réponse immédiate.",
          },
          {
            title: "Le résolveur",
            detail:
              "Sinon, requête vers le serveur DNS configuré (celui du FAI, ou `1.1.1.1`, `8.8.8.8`) : il fait le travail récursif.",
          },
          {
            title: "Racine → TLD → autoritaire",
            detail:
              "Le résolveur interroge les serveurs racine, puis ceux du TLD (`.fr`, `.com`), puis le serveur autoritaire du domaine — qui donne la réponse finale.",
          },
          {
            title: "Mise en cache",
            detail:
              "La réponse est cachée selon son TTL : les résolutions suivantes sont instantanées jusqu'à expiration.",
          },
        ],
      },
    ],
  },
  {
    id: "outils-diagnostic",
    title: "Outils de diagnostic",
    level: 3,
    intro:
      "Les commandes qui disent où ça casse : ping, traceroute, et les autres.",
    blocks: [
      {
        kind: "command",
        label: "Tester la joignabilité",
        command: "ping -c 4 8.8.8.8",
        why: "Envoie des paquets ICMP et mesure les temps de réponse. Si ça répond : la connectivité IP de base fonctionne. Si non : problème réseau local, routeur ou au-delà.",
        verify: "ping -c 1 127.0.0.1",
      },
      {
        kind: "command",
        label: "Tracer le chemin",
        command: "traceroute example.com",
        why: "Affiche chaque routeur traversé (saut par saut) avec les temps : localise où les paquets se perdent. Sous Windows : `tracert`.",
        verify: "traceroute -m 5 8.8.8.8",
      },
      {
        kind: "command",
        label: "Vérifier un port",
        command: "ss -tlnp",
        why: "Liste les ports en écoute sur la machine (Linux). 'Le service ne répond pas' : vérifier d'abord qu'il écoute, et sur quelle adresse.",
        verify: "ss -tln | head -5",
      },
    ],
  },
  {
    id: "wifi",
    title: "Wi-Fi : l'essentiel",
    level: 3,
    intro:
      "Le sans-fil : bandes, sécurité, bonnes pratiques.",
    blocks: [
      {
        kind: "fields",
        title: "À savoir",
        fields: [
          {
            label: "Bandes",
            value:
              "2,4 GHz (portée, encombrée), 5 GHz (débit, portée moindre), 6 GHz (Wi-Fi 6E/7, très haut débit, courte portée). Le choix dépend de la distance et de l'encombrement.",
          },
          {
            label: "Sécurité",
            value:
              "WPA3 (actuel), WPA2 (minimum acceptable), WEP et WPA (obsolètes, cassés). Un réseau 'ouvert' expose tout le trafic non chiffré.",
          },
          {
            label: "Canaux",
            value:
              "En 2,4 GHz, seuls les canaux 1, 6, 11 ne se chevauchent pas : un mauvais canal = interférences avec les voisins.",
          },
        ],
      },
    ],
  },
  {
    id: "securite-reseau-bases",
    title: "Sécurité réseau : les bases",
    level: 3,
    intro:
      "Les réflexes avant d'aller plus loin en cybersécurité.",
    blocks: [
      {
        kind: "list",
        items: [
          "Changer les mots de passe par défaut des équipements réseau (routeur, switch, point d'accès).",
          "Désactiver les services inutiles sur chaque machine : chaque port ouvert est une surface d'attaque.",
          "Segmenter : invités, IoT et serveurs sur des réseaux séparés (VLAN ou sous-réseaux distincts).",
          "Chiffrer : préférer les protocoles chiffrés (HTTPS, SSH) — bannir Telnet, FTP non chiffré.",
          "Mettre à jour routeurs et équipements : leurs failles sont des portes d'entrée.",
          "Sauvegarder les configurations des équipements importants.",
        ],
      },
    ],
  },
];

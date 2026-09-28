import type { LearningSection } from "../skill-guides";

/**
 * Learning Page de Culture informatique : comprendre la machine, les concepts
 * et l'histoire de l'informatique. Aucune commande : 100 % texte et schémas
 * structurés, ton encyclopédique sobre.
 */
export const LEARNING_CULTURE_INFO: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Ce qu'est la culture informatique et pourquoi c'est le point de départ de tout le reste.",
    blocks: [
      {
        kind: "text",
        text: "La culture informatique rassemble les repères fondamentaux : ce qu'est un ordinateur, comment il exécute des programmes, ce qu'est un système d'exploitation, un réseau, un algorithme. C'est le socle sur lequel se construisent la programmation, les réseaux, les systèmes et la sécurité.",
      },
      {
        kind: "text",
        text: "Sans ces repères, chaque outil semble magique et chaque erreur incompréhensible. Avec eux, un message d'erreur devient un indice, une panne réseau une piste à suivre, un programme lent un problème mesurable. Comprendre la machine rend tout le reste plus rapide à apprendre et plus facile à déboguer.",
      },
      {
        kind: "text",
        text: "Cette page couvre les concepts en profondeur puis l'histoire de l'informatique : des machines à calculer du XIXe siècle à l'intelligence artificielle moderne. Aucun prérequis technique n'est nécessaire pour commencer.",
      },
    ],
  },
  {
    id: "la-grande-image",
    title: "La grande image",
    level: 1,
    intro:
      "Les six couches qui composent l'informatique, du matériel au service.",
    blocks: [
      {
        kind: "diagram",
        title: "Les couches de l'informatique",
        lines: [
          "MATÉRIEL (hardware)",
          "     │  processeurs, mémoire, stockage, réseau",
          "     ▼",
          "SYSTÈME D'EXPLOITATION",
          "     │  pilote le matériel, fournit des services",
          "     ▼",
          "PROGRAMMES",
          "     │  code compilé ou interprété, exécuté par la machine",
          "     ▼",
          "RÉSEAUX",
          "     │  relie les machines, transporte les données",
          "     ▼",
          "APPLICATIONS",
          "     │  ce que l'utilisateur voit et manipule",
          "     ▼",
          "SERVICES (cloud, IA)",
          "        serveurs distants loués à la demande",
        ],
      },
      {
        kind: "text",
        text: "Retenir ce schéma suffit pour orienter toute la suite : un problème se situe toujours quelque part dans cette pile. Lent ? Est-ce le matériel, le réseau, le programme ? Erreur ? Quel programme, quel système, quelle donnée ? Chaque compétence de la roadmap approfondit une couche.",
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
    intro: "Aucun prérequis technique. La culture informatique se construit par la compréhension, pas par l'outillage.",
    blocks: [
      {
        kind: "list",
        items: [
          "Aucun langage de programmation requis : les concepts précèdent le code.",
          "Aucun matériel spécifique : un ordinateur ordinaire suffit pour explorer.",
          "La seule exigence est la curiosité : poser « pourquoi ? » à chaque étape.",
          "Les sections de niveau 3 racontent l'histoire : elles se lisent comme un récit, dans l'ordre.",
        ],
      },
      {
        kind: "text",
        text: "Si vous programmez déjà, cette page reste utile : elle comble les angles morts que la pratique seule ne révèle pas — pourquoi le binaire, d'où viennent les systèmes d'exploitation, comment Internet s'est construit.",
      },
    ],
  },
  {
    id: "ordinateur-et-architecture",
    title: "Ce qu'est un ordinateur",
    level: 2,
    intro: "La définition minimale et l'architecture de von Neumann, toujours d'actualité.",
    blocks: [
      {
        kind: "text",
        text: "Un ordinateur est une machine qui exécute des instructions : elle lit des données en mémoire, effectue des opérations (calculs, comparaisons, déplacements) et écrit des résultats. Tout le reste — écrans, réseaux, interfaces — est construit sur cette boucle.",
      },
      {
        kind: "fields",
        title: "L'architecture de von Neumann",
        fields: [
          {
            label: "Principe",
            value: "Le programme est stocké en mémoire, comme les données. La machine lit les instructions une par une et les exécute.",
          },
          {
            label: "Unité centrale (CPU)",
            value: "Exécute les instructions : calculs arithmétiques, logique, contrôle du déroulement.",
          },
          {
            label: "Mémoire",
            value: "Contient à la fois les instructions du programme et les données qu'il manipule.",
          },
          {
            label: "Entrées / sorties",
            value: "Clavier, écran, disque, réseau : la machine échange avec l'extérieur.",
          },
          {
            label: "Pourquoi ça compte",
            value: "Votre téléphone, votre PC et un serveur cloud partagent cette même architecture de base.",
          },
        ],
      },
    ],
  },
  {
    id: "binaire-et-representation",
    title: "Le binaire : le langage des machines",
    level: 2,
    intro: "Pourquoi tout est codé en 0 et 1, et ce que ça implique.",
    blocks: [
      {
        kind: "text",
        text: "Un circuit électronique distingue facilement deux états : courant qui passe ou ne passe pas. Le binaire — 0 et 1 — est donc le langage naturel du matériel. Toute information manipulée par un ordinateur est codée en binaire : texte, nombres, images, sons, programmes.",
      },
      {
        kind: "fields",
        title: "Les unités à connaître",
        fields: [
          {
            label: "Bit",
            value: "Un chiffre binaire : 0 ou 1. L'unité d'information la plus petite.",
          },
          {
            label: "Octet (byte)",
            value: "8 bits. Avec 8 bits, on code 256 valeurs différentes (de 0 à 255) : assez pour un caractère.",
          },
          {
            label: "Kilo, méga, giga",
            value: "En informatique, les multiples sont souvent des puissances de 2 : 1 Kio = 1024 octets, 1 Mio = 1024 Kio, 1 Gio = 1024 Mio.",
          },
        ],
      },
      {
        kind: "text",
        text: "Conséquence directe : tout est représentation. La lettre « A » n'existe pas dans la machine — il y a le nombre 65, codé en binaire, que le système interprète comme « A » selon une table de correspondance. Comprendre ça, c'est comprendre pourquoi un fichier texte s'ouvre mal quand l'encodage est faux.",
      },
    ],
  },
  {
    id: "systemes-exploitation",
    title: "Les systèmes d'exploitation",
    level: 2,
    intro: "Le logiciel qui pilote le matériel et sert les programmes.",
    blocks: [
      {
        kind: "text",
        text: "Le système d'exploitation (OS) est le programme qui tourne en permanence sur une machine : il pilote le matériel (processeur, mémoire, disques, périphériques) et fournit des services aux autres programmes — fichiers, processus, réseau, affichage.",
      },
      {
        kind: "fields",
        title: "Ce que fait un OS",
        fields: [
          {
            label: "Gérer les processus",
            value: "Chaque programme en cours d'exécution est un processus. L'OS partage le processeur entre eux et les isole les uns des autres.",
          },
          {
            label: "Gérer la mémoire",
            value: "Chaque processus reçoit sa propre zone mémoire. L'OS empêche un programme de lire ou d'écraser celle des autres.",
          },
          {
            label: "Gérer les fichiers",
            value: "Le système de fichiers organise le stockage en dossiers et fichiers, avec des permissions (qui peut lire, écrire, exécuter).",
          },
          {
            label: "Piloter le matériel",
            value: "Les pilotes (drivers) traduisent les ordres génériques de l'OS en signaux compris par chaque périphérique.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Windows, macOS et Linux sont les trois grandes familles de systèmes d'exploitation pour ordinateurs.",
          "Android et iOS dominent les téléphones ; ce sont aussi des systèmes d'exploitation complets.",
          "Linux fait tourner l'immense majorité des serveurs du web : c'est le système à connaître pour l'infrastructure.",
        ],
      },
    ],
  },
  {
    id: "programmation-et-langages",
    title: "Programmes et langages",
    level: 2,
    intro: "Ce qu'est un programme, et pourquoi il existe tant de langages.",
    blocks: [
      {
        kind: "text",
        text: "Un programme est une suite d'instructions exécutées par la machine. On l'écrit dans un langage de programmation — un langage formel, précis, sans ambiguïté — puis on le transforme en instructions machine (compilation) ou on l'exécute via un intermédiaire (interprétation).",
      },
      {
        kind: "table",
        headers: ["Famille", "Idée", "Exemples"],
        rows: [
          ["Bas niveau", "Proche du matériel, contrôle fin, rapide", "Assembleur, C"],
          ["Usage général", "Équilibre entre productivité et performance", "Python, Java, C#, Go, Rust"],
          ["Web", "Interfaces et serveurs web", "JavaScript, TypeScript, PHP"],
          ["Requêtes", "Langages déclaratifs pour une tâche précise", "SQL (bases de données), HTML (structure de page)"],
        ],
      },
      {
        kind: "text",
        text: "Il n'existe pas de « meilleur » langage universel : chaque langage est un compromis entre vitesse d'exécution, vitesse d'écriture, sécurité et écosystème. Le choix dépend du problème, pas de la mode.",
      },
    ],
  },
  {
    id: "algorithmes",
    title: "Les algorithmes",
    level: 2,
    intro: "La matière première des programmes : des étapes précises qui résolvent un problème.",
    blocks: [
      {
        kind: "text",
        text: "Un algorithme est une suite d'étapes précises, non ambiguës, qui résout un problème : trier une liste, trouver le chemin le plus court, rechercher un mot dans un texte. C'est l'idée avant le code — on peut décrire un algorithme en français, en pseudocode, puis l'implémenter dans n'importe quel langage.",
      },
      {
        kind: "fields",
        title: "Trois idées à retenir",
        fields: [
          {
            label: "Correction",
            value: "L'algorithme doit donner le bon résultat dans tous les cas, y compris les cas limites (liste vide, un seul élément).",
          },
          {
            label: "Complexité",
            value: "Combien d'opérations pour N données ? Un tri naïf peut demander N² opérations là où un bon tri n'en demande que N × log(N). Sur un million de données, la différence est colossale.",
          },
          {
            label: "Structures de données",
            value: "La façon d'organiser les données (tableau, liste, arbre, table de hachage) détermine quels algorithmes sont efficaces.",
          },
        ],
      },
    ],
  },
  {
    id: "compilation-et-execution",
    title: "Compilation et exécution",
    level: 2,
    intro: "De la pensée au programme qui tourne : les étapes de transformation.",
    blocks: [
      {
        kind: "diagram",
        title: "De l'idée au résultat",
        lines: [
          "IDÉE",
          "  │  le problème à résoudre",
          "  ▼",
          "ALGORITHME",
          "  │  les étapes, en langage naturel ou pseudocode",
          "  ▼",
          "CODE SOURCE",
          "  │  l'algorithme écrit dans un langage de programmation",
          "  ▼",
          "TRADUCTION (compilation ou interprétation)",
          "  │  vers des instructions exécutables",
          "  ▼",
          "EXÉCUTION",
          "  │  la machine exécute, instruction par instruction",
          "  ▼",
          "RÉSULTAT",
        ],
      },
      {
        kind: "table",
        headers: ["", "Compilation", "Interprétation"],
        rows: [
          ["Principe", "Le code est traduit en entier avant l'exécution", "Le code est lu et exécuté ligne par ligne"],
          ["Quand les erreurs apparaissent", "Avant l'exécution, pendant la compilation", "Pendant l'exécution, quand la ligne est atteinte"],
          ["Vitesse", "En général plus rapide à l'exécution", "En général plus lente, mais démarrage immédiat"],
          ["Exemples", "C, C++, Rust, Go", "Python, JavaScript (dans le navigateur), PHP"],
        ],
      },
      {
        kind: "text",
        text: "En pratique, la frontière est floue : beaucoup de langages modernes mélangent les deux approches (Java compile vers un bytecode exécuté par une machine virtuelle, JavaScript est compilé à la volée par le navigateur). L'important est de comprendre qu'il y a toujours une étape de traduction entre le code lisible et la machine.",
      },
    ],
  },
  {
    id: "reseaux-et-internet",
    title: "Réseaux et Internet",
    level: 2,
    intro: "Des machines reliées qui échangent des données selon des protocoles.",
    blocks: [
      {
        kind: "text",
        text: "Un réseau relie des machines qui échangent des données. Internet est le réseau des réseaux : des milliards d'appareils interconnectés qui communiquent grâce à des protocoles — des règles convenues que tout le monde applique.",
      },
      {
        kind: "fields",
        title: "Les notions clés",
        fields: [
          {
            label: "Protocole",
            value: "Un ensemble de règles de communication. TCP/IP est le protocole fondamental d'Internet : il découpe les données, les transporte et les réassemble.",
          },
          {
            label: "Adresse IP",
            value: "L'identifiant d'une machine sur le réseau. Le DNS traduit les noms lisibles (exemple.com) en adresses IP.",
          },
          {
            label: "Paquets",
            value: "Les données voyagent découpées en petits paquets, qui peuvent emprunter des routes différentes avant d'être réassemblés à l'arrivée.",
          },
          {
            label: "Client / serveur",
            value: "Le modèle dominant : le client demande (votre navigateur), le serveur répond (la machine qui héberge le site).",
          },
        ],
      },
      {
        kind: "text",
        text: "Idée reçue à corriger : Internet n'est pas le Web. Internet est l'infrastructure (les câbles, les protocoles) ; le Web est un service qui tourne dessus (pages, liens, navigateurs), comme le courrier électronique en est un autre.",
      },
    ],
  },
  {
    id: "le-web",
    title: "Le Web",
    level: 2,
    intro: "Pages, liens, navigateurs : le service le plus visible d'Internet.",
    blocks: [
      {
        kind: "text",
        text: "Le Web est un système de documents reliés par des liens, consultés via un navigateur. Trois technologies le fondent : l'URL (l'adresse d'une ressource), HTTP (le protocole d'échange) et HTML (le langage de structure des pages).",
      },
      {
        kind: "diagram",
        title: "Ce qui se passe quand vous ouvrez une page",
        lines: [
          "Clic sur un lien",
          "     │",
          "     ▼",
          "Le navigateur demande l'adresse au DNS",
          "     │",
          "     ▼",
          "Requête HTTP vers le serveur",
          "     │",
          "     ▼",
          "Le serveur exécute un programme, produit du HTML",
          "     │",
          "     ▼",
          "Réponse reçue par le navigateur",
          "     │",
          "     ▼",
          "Interprétation du HTML/CSS/JS et affichage",
        ],
      },
      {
        kind: "text",
        text: "Chaque étape de ce trajet est un domaine d'étude à part entière : DNS et routage pour les réseaux, HTTP et serveurs pour le backend, HTML/CSS/JavaScript pour le frontend. La roadmap Informatique les couvre un par un.",
      },
    ],
  },
  {
    id: "donnees-et-bases",
    title: "Données et bases de données",
    level: 2,
    intro: "Stocker, retrouver et protéger l'information.",
    blocks: [
      {
        kind: "text",
        text: "Les programmes manipulent des données ; quand ces données doivent survivre à l'arrêt du programme, on les stocke. Un fichier suffit pour de petites quantités. Au-delà, on utilise une base de données : un logiciel spécialisé qui stocke, organise, recherche et protège de grandes quantités de données.",
      },
      {
        kind: "fields",
        title: "Deux grandes familles",
        fields: [
          {
            label: "Relationnelles (SQL)",
            value: "Les données sont organisées en tables liées entre elles. Le langage SQL permet de les interroger avec précision. Adaptées quand la structure est stable et la cohérence critique.",
          },
          {
            label: "Non relationnelles (NoSQL)",
            value: "Documents, clés-valeurs, graphes : des modèles plus souples, adaptés aux données massives ou à structure variable.",
          },
        ],
      },
      {
        kind: "text",
        text: "Enjeu central : la donnée est devenue un actif. La sauvegarder, la sécuriser et respecter la vie privée des personnes qu'elle concerne font partie du métier, pas des options.",
      },
    ],
  },
  {
    id: "cloud",
    title: "Le cloud",
    level: 2,
    intro: "Des serveurs distants loués à la demande.",
    blocks: [
      {
        kind: "text",
        text: "Le cloud, c'est l'informatique de quelqu'un d'autre : au lieu d'acheter et de gérer ses propres serveurs, on loue de la capacité de calcul, du stockage et des services via Internet, à la demande, facturés à l'usage.",
      },
      {
        kind: "list",
        items: [
          "Élasticité : augmenter ou réduire les ressources en quelques minutes, sans acheter de matériel.",
          "Modèle économique : on paie ce qu'on consomme, comme l'électricité — d'où l'importance de surveiller les coûts.",
          "Responsabilité partagée : le fournisseur sécurise l'infrastructure, le client sécurise ce qu'il y dépose.",
          "Le cloud ne supprime pas la complexité : il la déplace. Comprendre les systèmes reste indispensable.",
        ],
      },
    ],
  },
  {
    id: "securite-notions",
    title: "Sécurité : les notions de base",
    level: 2,
    intro: "Protéger les systèmes, les données et les personnes.",
    blocks: [
      {
        kind: "text",
        text: "La sécurité informatique protège trois choses : la confidentialité (qui peut voir ?), l'intégrité (les données sont-elles intactes ?) et la disponibilité (le service fonctionne-t-il ?). Tout le reste en découle.",
      },
      {
        kind: "fields",
        title: "Les piliers",
        fields: [
          {
            label: "Authentification",
            value: "Prouver son identité : mot de passe, double facteur, clés. Le maillon faible le plus exploité reste le mot de passe réutilisé.",
          },
          {
            label: "Chiffrement",
            value: "Rendre les données illisibles sans la clé. Il protège les échanges (HTTPS) et le stockage.",
          },
          {
            label: "Mises à jour",
            value: "La plupart des attaques exploitent des failles connues et corrigées. Mettre à jour, c'est fermer des portes déjà identifiées.",
          },
          {
            label: "Sauvegardes",
            value: "La dernière ligne de défense : pouvoir restaurer ses données après un incident.",
          },
        ],
      },
      {
        kind: "text",
        text: "Principe fondateur : aucun système n'est invulnérable. La sécurité est un processus continu — évaluer les risques, réduire la surface d'attaque, détecter, réagir — pas un produit qu'on achète une fois.",
      },
    ],
  },
  {
    id: "idees-recues",
    title: "Idées reçues",
    level: 2,
    intro: "Les malentendus les plus fréquents, corrigés.",
    blocks: [
      {
        kind: "table",
        headers: ["Idée reçue", "Réalité"],
        rows: [
          ["« L'ordinateur comprend le français »", "Il exécute des instructions binaires. Tout le reste — langage, interface — est une traduction construite par des programmes."],
          ["« Internet = le Web »", "Internet est l'infrastructure ; le Web, le mail, la visioconférence sont des services qui l'utilisent."],
          ["« Le cloud, c'est immatériel »", "Ce sont des serveurs physiques, dans des bâtiments réels, qui consomment de l'électricité."],
          ["« Supprimer un fichier l'efface »", "Le système marque l'espace comme libre ; les données restent jusqu'à écrasement. D'où l'importance de l'effacement sécurisé."],
          ["« Plus de mémoire = plus rapide »", "Pas toujours : un programme mal conçu restera lent. La mémoire n'est qu'un facteur parmi d'autres."],
          ["« L'IA comprend ce qu'elle dit »", "Les modèles actuels prédisent des suites de mots probables à partir de leurs données d'entraînement. Impressionnant ne veut pas dire conscient."],
          ["« Mac / Linux ne peuvent pas avoir de virus »", "Aucun système n'est immunisé. La part de marché et les usages expliquent les différences, pas une invulnérabilité."],
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "leibniz-et-le-binaire",
    title: "Leibniz et le binaire (1703)",
    level: 3,
    intro: "Bien avant l'électronique, le système binaire existait déjà sur le papier.",
    blocks: [
      {
        kind: "text",
        text: "En 1703, le philosophe et mathématicien Gottfried Wilhelm Leibniz publie un texte décrivant l'arithmétique binaire : compter avec seulement 0 et 1. Il y voit une élégance philosophique — la création à partir du néant et de l'unité — mais l'idée reste théorique pendant plus de deux siècles.",
      },
      {
        kind: "text",
        text: "Le binaire ne devient pratique qu'avec l'électricité : un interrupteur a deux états stables, ouvert ou fermé. Quand les ingénieurs du XXe siècle cherchent un système de numération adapté aux circuits, ils retrouvent le travail de Leibniz. Le langage des machines modernes est né trois siècles avant les machines.",
      },
    ],
  },
  {
    id: "babbage-et-lovelace",
    title: "Babbage et Lovelace : le premier programme (années 1830-1840)",
    level: 3,
    intro: "Une machine qui n'a jamais été construite, et le premier algorithme de l'histoire.",
    blocks: [
      {
        kind: "text",
        text: "Dans les années 1830, le mathématicien britannique Charles Babbage conçoit la machine analytique : un calculateur mécanique programmable, avec une mémoire, une unité de calcul et des instructions lues sur cartes perforées. Elle ne sera jamais construite de son vivant — la mécanique de l'époque ne suivait pas.",
      },
      {
        kind: "text",
        text: "Ada Lovelace, qui traduit et annote les écrits sur la machine, y ajoute en 1843 un algorithme de calcul des nombres de Bernoulli : c'est le premier programme informatique publié, écrit pour une machine qui n'existait pas encore. Elle pressent aussi que de telles machines pourraient manipuler autre chose que des nombres — de la musique, des images.",
      },
      {
        kind: "text",
        text: "Leçon durable : l'idée du programme — une suite d'instructions traitée par une machine — précède l'ordinateur électronique d'un siècle.",
      },
    ],
  },
  {
    id: "boole-et-l-algebre",
    title: "Boole : la logique devient calcul (1854)",
    level: 3,
    intro: "Transformer le raisonnement en algèbre : le fondement des circuits numériques.",
    blocks: [
      {
        kind: "text",
        text: "En 1854, George Boole publie une algèbre où les variables ne valent que vrai ou faux, combinées par des opérateurs (ET, OU, NON). À l'époque, c'est de la logique pure, sans application pratique envisagée.",
      },
      {
        kind: "text",
        text: "Un siècle plus tard, cette algèbre devient le langage de description des circuits numériques : chaque porte logique d'un processeur (ET, OU, NON) est une opération booléenne câblée. Les conditions `si ... alors` de tous les programmes sont de l'algèbre de Boole exécutée des milliards de fois par seconde.",
      },
    ],
  },
  {
    id: "mecanographie",
    title: "La mécanographie : Hollerith et le recensement (1890)",
    level: 3,
    intro: "Le premier traitement de données à grande échelle.",
    blocks: [
      {
        kind: "text",
        text: "En 1890, le recensement américain menace de prendre plus de dix ans à dépouiller — plus que l'intervalle entre deux recensements. L'ingénieur Herman Hollerith propose des machines à cartes perforées : chaque habitant est codé par des trous dans une carte, lus électriquement.",
      },
      {
        kind: "text",
        text: "Le dépouillement prend quelques années au lieu d'une décennie. La société fondée par Hollerith deviendra, par fusions successives, IBM. C'est la première démonstration qu'une machine peut traiter des données à l'échelle d'un pays — l'ancêtre conceptuel des bases de données.",
      },
    ],
  },
  {
    id: "turing-1936",
    title: "Turing : qu'est-ce qu'un calcul ? (1936)",
    level: 3,
    intro: "La définition théorique de l'ordinateur, avant son invention.",
    blocks: [
      {
        kind: "text",
        text: "En 1936, le mathématicien Alan Turing décrit une machine abstraite : un ruban infini, une tête de lecture/écriture, des règles de transition entre états. Cette « machine de Turing » n'est pas un plan de construction, mais une définition : tout ce qui est calculable peut être calculé par cette machine.",
      },
      {
        kind: "text",
        text: "Turing démontre aussi qu'il existe des problèmes qu'aucune machine ne peut résoudre — les limites théoriques du calcul. Tout ordinateur moderne est, en puissance de calcul, équivalent à cette machine abstraite de 1936. La théorie a précédé la pratique.",
      },
    ],
  },
  {
    id: "z3-et-colossus",
    title: "Z3 et Colossus : les premiers calculateurs (1941-1943)",
    level: 3,
    intro: "Les premières machines programmables, nées dans le contexte de la guerre.",
    blocks: [
      {
        kind: "text",
        text: "En 1941, l'ingénieur allemand Konrad Zuse achève le Z3 : un calculateur électromécanique programmable en binaire, à virgule flottante. C'est la première machine programmable au sens moderne, construite en grande partie seul, dans un appartement berlinois.",
      },
      {
        kind: "text",
        text: "En 1943, les Britanniques mettent en service Colossus à Bletchley Park : un calculateur électronique à lampes, conçu pour casser les chiffres allemands. Secret militaire, son existence ne sera révélée que dans les années 1970.",
      },
      {
        kind: "text",
        text: "Ces machines restent des calculateurs spécialisés : le programme est câblé ou lu sur bande, il ne réside pas en mémoire modifiable. L'étape décisive — le programme enregistré — arrive juste après la guerre.",
      },
    ],
  },
  {
    id: "eniac",
    title: "ENIAC : le géant électronique (1945)",
    level: 3,
    intro: "La première machine électronique généraliste à grande échelle.",
    blocks: [
      {
        kind: "text",
        text: "Mis en service en 1945 à l'université de Pennsylvanie, l'ENIAC occupe 167 m², pèse 30 tonnes et compte près de 18 000 tubes à vide. Il calcule en quelques secondes ce qui prenait des heures aux calculateurs mécaniques — d'abord des tables de tir pour l'artillerie.",
      },
      {
        kind: "fields",
        title: "L'ENIAC en chiffres",
        fields: [
          { label: "Technologie", value: "Tubes à vide (lampes) : fragiles, gourmands en énergie, mais bien plus rapides que les relais mécaniques." },
          { label: "Programmation", value: "Par câblage : reprogrammer la machine prenait des jours. Le programme n'était pas stocké en mémoire." },
          { label: "Leçon", value: "La vitesse brute ne suffit pas : il fallait une machine dont le programme soit une donnée modifiable. D'où l'architecture de von Neumann." },
        ],
      },
    ],
  },
  {
    id: "von-neumann-1945",
    title: "L'architecture de von Neumann (1945)",
    level: 3,
    intro: "Le programme enregistré : l'idée qui structure encore tous les ordinateurs.",
    blocks: [
      {
        kind: "text",
        text: "En 1945, le mathématicien John von Neumann rédige un rapport décrivant une architecture où le programme est stocké en mémoire sous forme de données, au même titre que les nombres à traiter. Conséquence : un programme peut en modifier un autre, ou se modifier lui-même.",
      },
      {
        kind: "text",
        text: "Cette idée — le programme enregistré — rend la machine universelle : le même matériel exécute n'importe quel programme, il suffit de changer le contenu de la mémoire. Tous les ordinateurs actuels, du microcontrôleur au supercalculateur, en sont les descendants directs.",
      },
    ],
  },
  {
    id: "manchester-baby",
    title: "Manchester Baby : le premier programme enregistré (1948)",
    level: 3,
    intro: "La première machine à exécuter un programme stocké en mémoire.",
    blocks: [
      {
        kind: "text",
        text: "En 1948, à l'université de Manchester, le « Baby » exécute le premier programme stocké en mémoire électronique : un programme de 52 minutes qui trouve le plus grand facteur d'un nombre. La mémoire utilise des tubes cathodiques — des écrans dont on lit les points lumineux.",
      },
      {
        kind: "text",
        text: "C'est la naissance de l'ordinateur au sens moderne : non plus un calculateur câblé pour une tâche, mais une machine universelle dont le comportement est défini par un programme en mémoire.",
      },
    ],
  },
  {
    id: "transistor-1947",
    title: "Le transistor (1947)",
    level: 3,
    intro: "Le composant qui a remplacé les lampes et rendu l'informatique possible à grande échelle.",
    blocks: [
      {
        kind: "text",
        text: "En 1947, aux laboratoires Bell, trois chercheurs démontrent le premier transistor : un interrupteur à semi-conducteur, sans filament chauffé, minuscule et fiable. Il remplace progressivement les tubes à vide dans les années 1950.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est décisif : un ordinateur à lampes consomme autant qu'une petite ville et tombe en panne toutes les heures. Le transistor rend les machines plus petites, plus fiables, moins gourmandes — et ouvre la voie à la miniaturisation qui n'a jamais cessé depuis.",
      },
    ],
  },
  {
    id: "circuit-integre",
    title: "Le circuit intégré (fin des années 1950)",
    level: 3,
    intro: "Des transistors interconnectés sur une seule puce.",
    blocks: [
      {
        kind: "text",
        text: "À la fin des années 1950, deux ingénieurs — Jack Kilby et Robert Noyce, indépendamment — démontrent qu'on peut fabriquer plusieurs transistors interconnectés sur un même morceau de semi-conducteur : le circuit intégré, ou « puce ».",
      },
      {
        kind: "text",
        text: "La miniaturisation devient alors un processus industriel : chaque génération grave des transistors plus petits et plus nombreux. C'est le point de départ de la loi de Moore et de toute l'électronique moderne.",
      },
    ],
  },
  {
    id: "shannon-1948",
    title: "Shannon : la théorie de l'information (1948)",
    level: 3,
    intro: "Mesurer l'information comme on mesure une distance.",
    blocks: [
      {
        kind: "text",
        text: "En 1948, l'ingénieur Claude Shannon publie la théorie mathématique de la communication : il définit le bit comme unité d'information et démontre les limites fondamentales de la transmission — combien d'information peut passer par un canal bruité, et comment la protéger par des codes correcteurs.",
      },
      {
        kind: "text",
        text: "Applications directes : la compression (rendre les fichiers plus petits), la correction d'erreurs (CD, Wi-Fi, stockage), la cryptographie moderne. Le « bit » de Shannon est devenu l'unité de mesure de l'ère numérique.",
      },
    ],
  },
  {
    id: "langages-anciens",
    title: "Les premiers langages : Fortran, Lisp, Cobol (années 1950)",
    level: 3,
    intro: "Écrire pour les humains plutôt que pour la machine.",
    blocks: [
      {
        kind: "text",
        text: "Jusqu'au milieu des années 1950, on programme en langage machine ou en assembleur — fastidieux et spécifique à chaque machine. Trois langages changent la donne : Fortran (1957) pour le calcul scientifique, Lisp (1958) pour l'intelligence artificielle naissante, Cobol (1959) pour la gestion.",
      },
      {
        kind: "text",
        text: "Leur apport commun : l'abstraction. Le programmeur décrit ce qu'il veut calculer, un compilateur traduit vers la machine. Fortran est encore utilisé aujourd'hui dans le calcul scientifique intensif — preuve qu'un bon langage survit à ses créateurs.",
      },
    ],
  },
  {
    id: "system360",
    title: "IBM System/360 : l'ordinateur comme produit (1964)",
    level: 3,
    intro: "Une famille de machines compatibles : la naissance de l'industrie informatique.",
    blocks: [
      {
        kind: "text",
        text: "En 1964, IBM lance le System/360 : une gamme d'ordinateurs de puissances différentes mais capables d'exécuter les mêmes programmes. Pour la première fois, un client peut passer à une machine plus puissante sans réécrire ses logiciels.",
      },
      {
        kind: "text",
        text: "C'est la naissance de l'informatique comme industrie : le logiciel devient un investissement durable, indépendant du matériel. Le System/360 domine le marché pendant des décennies et fait d'IBM le géant incontesté de l'époque.",
      },
    ],
  },
  {
    id: "moore-1965",
    title: "La loi de Moore (1965)",
    level: 3,
    intro: "Une prédiction devenue feuille de route de l'industrie.",
    blocks: [
      {
        kind: "text",
        text: "En 1965, l'ingénieur Gordon Moore observe que le nombre de transistors par puce double environ tous les deux ans, et prédit que la tendance continuera. Ce n'était pas une loi physique, mais une observation — qui est devenue un objectif industriel : toute la filière s'est organisée pour la vérifier.",
      },
      {
        kind: "text",
        text: "Conséquence : pendant cinquante ans, les ordinateurs sont devenus exponentiellement plus puissants à prix constant. Cette croissance a rendu possibles le PC, Internet grand public, le smartphone et l'IA moderne. Depuis les années 2010, la progression ralentit : la physique des transistors approche ses limites, et l'industrie cherche d'autres voies (architectures spécialisées, parallélisme).",
      },
    ],
  },
  {
    id: "pdp8-minis",
    title: "Les mini-ordinateurs : le PDP-8 (1965)",
    level: 3,
    intro: "L'ordinateur sort de la salle climatisée.",
    blocks: [
      {
        kind: "text",
        text: "En 1965, Digital Equipment Corporation commercialise le PDP-8 : un ordinateur de la taille d'un réfrigérateur, vendu une fraction du prix d'un mainframe. Les laboratoires, les usines et les universités peuvent enfin avoir leur propre machine.",
      },
      {
        kind: "text",
        text: "C'est la première démocratisation : l'informatique n'est plus réservée aux grandes entreprises. Les mini-ordinateurs forment toute une génération d'ingénieurs et préparent l'arrivée du micro-ordinateur.",
      },
    ],
  },
  {
    id: "microprocesseur-1971",
    title: "Le microprocesseur : Intel 4004 (1971)",
    level: 3,
    intro: "Un processeur entier sur une seule puce.",
    blocks: [
      {
        kind: "text",
        text: "En 1971, Intel commercialise le 4004 : le premier microprocesseur, un CPU complet gravé sur une puce. Il est conçu pour une calculatrice, mais l'idée est révolutionnaire : la puissance de calcul devient un composant standard, achetable et intégrable partout.",
      },
      {
        kind: "text",
        text: "Le microprocesseur fait chuter le coût d'un ordinateur de plusieurs ordres de grandeur. Sans lui, pas de micro-ordinateur, pas de PC, pas de smartphone : c'est le composant qui a mis un processeur dans chaque objet.",
      },
    ],
  },
  {
    id: "unix-1969",
    title: "Unix (1969) : le système qui a tout influencé",
    level: 3,
    intro: "Un système simple, portable, composable — et toujours vivant.",
    blocks: [
      {
        kind: "text",
        text: "En 1969, aux laboratoires Bell, Ken Thompson et Dennis Ritchie créent Unix : un système d'exploitation délibérément simple, écrit ensuite en langage C (1972), ce qui le rend portable d'une machine à l'autre — une nouveauté radicale à l'époque.",
      },
      {
        kind: "fields",
        title: "L'héritage d'Unix",
        fields: [
          { label: "Philosophie", value: "Des petits outils qui font une chose bien et se combinent (les pipes). Cette philosophie structure encore le terminal Linux." },
          { label: "Descendance", value: "Linux, macOS, Android, iOS : tous descendent directement ou indirectement d'Unix. Le système de 1969 tourne, sous une forme ou une autre, sur la majorité des appareils connectés." },
          { label: "C et Unix", value: "Le langage C a été créé pour écrire Unix. Apprendre le C, c'est toucher aux fondations de tous ces systèmes." },
        ],
      },
    ],
  },
  {
    id: "altair-et-pc",
    title: "Altair, Apple, IBM PC : la micro-informatique (1975-1981)",
    level: 3,
    intro: "L'ordinateur devient un objet personnel.",
    blocks: [
      {
        kind: "text",
        text: "En 1975, l'Altair 8800 — un kit à assembler vendu par correspondance — déclenche l'engouement des amateurs. Deux jeunes passionnés écrivent un interpréteur BASIC pour cette machine : Bill Gates et Paul Allen fondent Microsoft sur cette base.",
      },
      {
        kind: "text",
        text: "En 1976, Steve Wozniak et Steve Jobs commercialisent l'Apple I, puis l'Apple II : des ordinateurs assemblés, utilisables sans fer à souder. En 1981, IBM — le géant des mainframes — lance son PC, avec un système d'exploitation fourni par Microsoft (MS-DOS).",
      },
      {
        kind: "text",
        text: "Le PC IBM, à architecture ouverte, est cloné par des dizaines de fabricants : c'est la naissance du marché de masse. L'ordinateur quitte les entreprises pour entrer dans les foyers, puis les poches.",
      },
    ],
  },
  {
    id: "arpanet",
    title: "ARPANET : la naissance d'Internet (1969)",
    level: 3,
    intro: "Quatre ordinateurs reliés : le début du réseau des réseaux.",
    blocks: [
      {
        kind: "text",
        text: "En 1969, le département américain de la Défense finance ARPANET : quatre ordinateurs universitaires reliés entre eux. L'objectif initial est le partage de ressources de calcul ; l'usage qui explose, c'est le courrier électronique — les gens préfèrent communiquer que calculer.",
      },
      {
        kind: "text",
        text: "L'innovation technique majeure est la commutation de paquets : les données sont découpées en paquets qui voyagent indépendamment. Le réseau survit à la panne d'un nœud — une propriété pensée pour la résilience, devenue le fondement d'Internet.",
      },
    ],
  },
  {
    id: "tcp-ip-et-dns",
    title: "TCP/IP et DNS : les protocoles d'Internet (années 1970-1980)",
    level: 3,
    intro: "Les règles communes qui permettent à tous les réseaux de s'interconnecter.",
    blocks: [
      {
        kind: "text",
        text: "Dans les années 1970, Vint Cerf et Bob Kahn conçoivent TCP/IP : un protocole qui permet à des réseaux hétérogènes de communiquer entre eux. En 1983, ARPANET bascule entièrement sur TCP/IP : c'est la naissance technique d'Internet.",
      },
      {
        kind: "text",
        text: "La même année naît le DNS : le système qui traduit les noms lisibles en adresses numériques. Sans lui, il faudrait mémoriser des adresses IP pour chaque site. TCP/IP et DNS sont toujours en service aujourd'hui, quasiment inchangés dans leurs principes.",
      },
    ],
  },
  {
    id: "logiciel-libre",
    title: "Le logiciel libre : GNU et la FSF (1983-1985)",
    level: 3,
    intro: "Le logiciel comme bien commun : une idée juridique autant que technique.",
    blocks: [
      {
        kind: "text",
        text: "En 1983, Richard Stallman lance le projet GNU : recréer un système de type Unix entièrement libre. En 1985, il fonde la Free Software Foundation et rédige la licence GPL : quiconque distribue le logiciel doit en partager le code source sous les mêmes conditions.",
      },
      {
        kind: "text",
        text: "L'idée est radicale : la liberté du logiciel — l'utiliser, l'étudier, le modifier, le redistribuer — prime sur son prix. Le projet GNU fournit dans les années suivantes les outils (compilateur GCC, utilitaires) sans lesquels Linux n'aurait pas pu exister.",
      },
    ],
  },
  {
    id: "le-web-1989",
    title: "Le Web : Berners-Lee (1989-1990)",
    level: 3,
    intro: "Trois inventions simples qui ont changé le monde.",
    blocks: [
      {
        kind: "text",
        text: "En 1989, Tim Berners-Lee, chercheur au CERN, propose un système de documents reliés par des liens pour partager l'information entre physiciens. En 1990, il implémente les trois piliers : l'URL (adresser une ressource), HTTP (l'échanger) et HTML (la structurer) — plus le premier navigateur et le premier serveur.",
      },
      {
        kind: "text",
        text: "Décision décisive : le CERN rend le Web public et libre de droits en 1993. En 1993 aussi, le navigateur Mosaic apporte les images et une interface accessible : le Web passe des laboratoires au grand public en quelques années.",
      },
    ],
  },
  {
    id: "linux-1991",
    title: "Linux (1991) : le système du monde connecté",
    level: 3,
    intro: "Un projet d'étudiant devenu l'infrastructure du Web.",
    blocks: [
      {
        kind: "text",
        text: "En 1991, l'étudiant finlandais Linus Torvalds publie le noyau d'un système d'exploitation qu'il écrit « juste pour le plaisir ». Combiné aux outils du projet GNU, il forme un système complet et libre : GNU/Linux.",
      },
      {
        kind: "text",
        text: "Le développement ouvert sur Internet attire des milliers de contributeurs. Trente ans plus tard, Linux fait tourner la majorité des serveurs du Web, la totalité des supercalculateurs les plus puissants, et — via Android — des milliards de téléphones. C'est la plus grande réussite du modèle open source.",
      },
    ],
  },
  {
    id: "bulle-et-web-moderne",
    title: "Du Web 1.0 au Web participatif (années 2000)",
    level: 3,
    intro: "L'explosion, le krach et la reconstruction.",
    blocks: [
      {
        kind: "text",
        text: "À la fin des années 1990, l'engouement pour le Web attire des investissements massifs : c'est la « bulle Internet ». En 2000-2001, elle éclate : des centaines de startups disparaissent. Mais l'infrastructure reste — câbles, navigateurs, protocoles — et les survivants posent les bases du Web moderne.",
      },
      {
        kind: "text",
        text: "Dans les années 2000, le Web devient participatif : les utilisateurs publient (blogs, wikis, vidéos, réseaux sociaux) au lieu de seulement consulter. Les navigateurs deviennent des plateformes d'applications, JavaScript se professionnalise, et le « cloud » émerge comme modèle de distribution du logiciel.",
      },
    ],
  },
  {
    id: "mobile-2007",
    title: "Le mobile : l'informatique dans la poche (2007)",
    level: 3,
    intro: "Le smartphone fait de l'ordinateur un objet quotidien.",
    blocks: [
      {
        kind: "text",
        text: "En 2007, l'iPhone combine téléphone, navigateur Web et écran tactile dans un objet grand public ; Android suit en 2008. Le smartphone devient en une décennie l'ordinateur principal de milliards de personnes.",
      },
      {
        kind: "text",
        text: "Conséquences : l'informatique devient tactile et permanente, les applications se distribuent via des magasins centralisés, et de nouveaux métiers naissent (développement mobile, design d'interfaces tactiles). Pour une grande partie de l'humanité, « l'ordinateur » est aujourd'hui un téléphone.",
      },
    ],
  },
  {
    id: "ia-histoire",
    title: "L'intelligence artificielle : une brève histoire",
    level: 3,
    intro: "Des rêves des années 1950 aux modèles actuels : cycles d'enthousiasme et d'hivers.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Les fondations (années 1940-1950)",
            detail: "En 1948, Norbert Wiener fonde la cybernétique : l'étude du contrôle et de la communication chez l'animal et la machine. En 1950, Turing propose son test : une machine est-elle intelligente si on ne peut la distinguer d'un humain à l'écrit ? Le terme « intelligence artificielle » est forgé en 1956.",
          },
          {
            title: "Premiers succès et premiers hivers (1960-1980)",
            detail: "Les premiers programmes résolvent des problèmes formels, mais butent sur le monde réel : la puissance de calcul et les données manquent. Les financements s'effondrent à deux reprises — les « hivers de l'IA ».",
          },
          {
            title: "Deep Blue (1997)",
            detail: "L'ordinateur d'IBM bat le champion du monde d'échecs Garry Kasparov. C'est une victoire de la puissance de calcul et des algorithmes de recherche, pas encore de l'apprentissage.",
          },
          {
            title: "Le deep learning (années 2010)",
            detail: "La combinaison de réseaux de neurones profonds, de GPU puissants et de données massives fait décoller la reconnaissance d'images et de parole. En 2016, AlphaGo bat le champion du monde de go.",
          },
          {
            title: "Les modèles génératifs (2017-...)",
            detail: "L'architecture Transformer (2017) permet d'entraîner des modèles de langage à très grande échelle. Ils génèrent du texte, du code, des images — en prédisant des suites probables, sans « comprendre » au sens humain.",
          },
        ],
      },
      {
        kind: "text",
        text: "Leçon de cette histoire : l'IA avance par vagues, chacune portée par un trio — algorithmes, puissance de calcul, données. Les promesses excessives de chaque vague ont à chaque fois été suivies de désillusions : garder un regard critique reste la bonne attitude.",
      },
    ],
  },
  {
    id: "systemes-de-numeration",
    title: "Systèmes de numération",
    level: 3,
    intro: "Binaire, décimal, hexadécimal : la même quantité, plusieurs écritures.",
    blocks: [
      {
        kind: "table",
        headers: ["Base", "Chiffres", "Usage"],
        rows: [
          ["2 (binaire)", "0, 1", "Le langage du matériel : chaque bit est un état physique."],
          ["10 (décimal)", "0-9", "L'usage humain courant."],
          ["16 (hexadécimal)", "0-9, A-F", "La notation compacte des informaticiens : un chiffre hexa = 4 bits exactement."],
        ],
      },
      {
        kind: "text",
        text: "L'hexadécimal mérite d'être lu couramment : les adresses mémoire, les couleurs Web (`#FF0000`), les condensés cryptographiques s'écrivent en hexa. Chaque paire de chiffres représente un octet : `FF` = 255 = 11111111 en binaire.",
      },
    ],
  },
  {
    id: "encodages-texte",
    title: "Encodages : ASCII et Unicode",
    level: 3,
    intro: "Comment le texte devient des nombres, et pourquoi ça casse parfois.",
    blocks: [
      {
        kind: "text",
        text: "En 1963, la norme ASCII attribue un nombre à 128 caractères (lettres anglaises, chiffres, ponctuation) : « A » vaut 65. Suffisant pour l'anglais, inutilisable pour le reste du monde.",
      },
      {
        kind: "text",
        text: "Unicode attribue un numéro unique à chaque caractère de tous les systèmes d'écriture — plus les emojis. UTF-8 est son encodage dominant : compatible avec ASCII pour les textes anglais, capable de coder tout le reste. Quand un texte affiche des symboles bizarres, c'est presque toujours un désaccord d'encodage entre l'émetteur et le lecteur.",
      },
    ],
  },
  {
    id: "processus-et-memoire",
    title: "Processus, mémoire et fichiers",
    level: 3,
    intro: "Comment le système d'exploitation organise le travail.",
    blocks: [
      {
        kind: "fields",
        title: "Les abstractions de l'OS",
        fields: [
          {
            label: "Processus",
            value: "Un programme en cours d'exécution, avec sa mémoire privée. Si un processus plante, les autres continuent : l'isolation est la base de la stabilité.",
          },
          {
            label: "Thread",
            value: "Un fil d'exécution à l'intérieur d'un processus. Plusieurs threads partagent la mémoire du processus : plus rapide à créer, mais une erreur dans l'un peut corrompre les autres.",
          },
          {
            label: "Mémoire virtuelle",
            value: "Chaque processus voit un espace mémoire continu et privé ; l'OS le traduit vers la mémoire physique réelle. Un programme peut ainsi utiliser plus de mémoire qu'il n'y en a physiquement (via le disque).",
          },
          {
            label: "Fichier",
            value: "Une suite d'octets nommée, organisée en arborescence. Tout est fichier sous Unix : les périphériques, les informations système — une unification élégante.",
          },
          {
            label: "Permissions",
            value: "Qui peut lire, écrire, exécuter chaque fichier. La sécurité d'un système commence par des permissions correctes.",
          },
        ],
      },
    ],
  },
  {
    id: "modeles-de-programmation",
    title: "Paradigmes de programmation",
    level: 3,
    intro: "Plusieurs façons d'organiser la pensée en code.",
    blocks: [
      {
        kind: "table",
        headers: ["Paradigme", "Idée centrale", "Langages typiques"],
        rows: [
          ["Impératif", "Décrire les étapes à exécuter, dans l'ordre", "C, Pascal"],
          ["Orienté objet", "Regrouper données et comportements en objets qui interagissent", "Java, C#, Python, C++"],
          ["Fonctionnel", "Composer des fonctions pures, éviter l'état mutable", "Haskell, Lisp, et en partie JavaScript, Python"],
          ["Déclaratif", "Décrire le résultat voulu, pas les étapes", "SQL, HTML, CSS"],
        ],
      },
      {
        kind: "text",
        text: "La plupart des langages modernes sont multi-paradigmes : Python et JavaScript permettent l'impératif, l'objet et le fonctionnel. Le paradigme est un outil de pensée, pas une religion.",
      },
    ],
  },
  {
    id: "client-serveur-et-p2p",
    title: "Architectures réseau : client-serveur et pair-à-pair",
    level: 3,
    intro: "Deux façons d'organiser les échanges entre machines.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Client-serveur", "Pair-à-pair (P2P)"],
        rows: [
          ["Principe", "Des clients demandent, des serveurs répondent", "Chaque machine est à la fois cliente et serveuse"],
          ["Points forts", "Simple à administrer, contrôle centralisé", "Résilient, passe à l'échelle sans serveur central"],
          ["Points faibles", "Le serveur est un point de défaillance unique", "Plus complexe à sécuriser et à coordonner"],
          ["Exemples", "Le Web classique, les applications mobiles", "Partage de fichiers décentralisé, certaines blockchains"],
        ],
      },
      {
        kind: "text",
        text: "Le cloud a renforcé le modèle client-serveur en industrialisant le côté serveur. Mais le pair-à-pair reste pertinent quand la décentralisation compte plus que la simplicité.",
      },
    ],
  },
  {
    id: "cryptographie-notions",
    title: "Cryptographie : les notions",
    level: 3,
    intro: "Chiffrer, signer, vérifier : les briques de la confiance numérique.",
    blocks: [
      {
        kind: "fields",
        title: "Les briques de base",
        fields: [
          {
            label: "Chiffrement symétrique",
            value: "Une seule clé pour chiffrer et déchiffrer. Rapide, mais il faut transmettre la clé en secret au destinataire.",
          },
          {
            label: "Chiffrement asymétrique",
            value: "Une paire de clés : publique (pour chiffrer) et privée (pour déchiffrer). Résout le problème de l'échange de clé. Base du HTTPS.",
          },
          {
            label: "Signature numérique",
            value: "Prouver qu'un message vient bien de son auteur et n'a pas été modifié : l'inverse du chiffrement, avec la même paire de clés.",
          },
          {
            label: "Fonction de hachage",
            value: "Une empreinte unique d'une donnée. Vérifie l'intégrité (le fichier téléchargé est-il intact ?) et stocke les mots de passe sans les conserver en clair.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle d'or : ne jamais inventer son propre algorithme de chiffrement. La cryptographie sûre repose sur des algorithmes publics, éprouvés par des années d'analyse — la sécurité vient de la clé, pas du secret de la méthode.",
      },
    ],
  },
  {
    id: "modeles-cloud",
    title: "Les modèles du cloud : IaaS, PaaS, SaaS",
    level: 3,
    intro: "Trois niveaux de délégation au fournisseur.",
    blocks: [
      {
        kind: "table",
        headers: ["Modèle", "Le fournisseur gère", "Vous gérez", "Exemple d'usage"],
        rows: [
          ["IaaS", "Matériel, virtualisation, réseau", "OS, applications, données", "Louer des serveurs virtuels pour héberger ses propres systèmes"],
          ["PaaS", "+ OS, runtimes, bases de données", "Le code de l'application", "Déployer une application sans administrer de serveurs"],
          ["SaaS", "Tout, jusqu'à l'application", "L'utilisation et la configuration", "Utiliser un logiciel via le navigateur, sans rien installer"],
        ],
      },
      {
        kind: "text",
        text: "Plus on monte dans la pile, moins on administre — mais moins on contrôle. Le choix dépend du besoin : une startup ira souvent vers PaaS/SaaS pour aller vite, une infrastructure critique préférera IaaS pour garder la main.",
      },
    ],
  },
  {
    id: "open-source-licences",
    title: "Open source et licences",
    level: 3,
    intro: "« Gratuit » ne veut pas dire « sans règles ».",
    blocks: [
      {
        kind: "text",
        text: "L'open source désigne les logiciels dont le code source est public et réutilisable sous licence. Mais chaque licence a ses conditions : les ignorer dans un projet professionnel est un risque juridique réel.",
      },
      {
        kind: "table",
        headers: ["Famille de licence", "Principe", "Point d'attention"],
        rows: [
          ["Permissives (MIT, Apache, BSD)", "Utilisation libre, y compris dans du logiciel propriétaire, avec attribution", "Conserver les mentions de copyright"],
          ["Copyleft (GPL)", "Les dérivés distribués doivent rester sous la même licence", "Intégrer du GPL dans un produit fermé contamine sa licence"],
          ["Propriétaires", "Tous droits réservés, usage selon le contrat", "Lire les conditions : essai, nombre d'utilisateurs, redistribution"],
        ],
      },
      {
        kind: "text",
        text: "L'open source fait tourner le monde : la quasi-totalité de l'infrastructure du Web (Linux, serveurs, langages, frameworks) est open source. Contribuer à un projet open source est aussi l'un des meilleurs moyens d'apprendre et de se faire connaître.",
      },
    ],
  },
  {
    id: "debogage-philosophie",
    title: "Le débogage : une méthode",
    level: 3,
    intro: "Les bugs ne se devinent pas, ils s'isolent.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Reproduire",
            detail: "Un bug non reproductible n'est pas un bug compris. Trouver la séquence exacte d'actions qui le déclenche, et la réduire au cas le plus simple possible.",
          },
          {
            title: "Lire le message d'erreur",
            detail: "Vraiment le lire : il indique souvent le fichier, la ligne et la nature du problème. La tentation de l'ignorer pour « essayer des trucs » fait perdre plus de temps qu'elle n'en gagne.",
          },
          {
            title: "Former une hypothèse",
            detail: "« Le problème vient de X parce que... » — une hypothèse précise, pas « ça ne marche pas ». Puis la tester par une expérience : afficher une valeur, isoler un morceau de code.",
          },
          {
            title: "Vérifier, pas supposer",
            detail: "Le bug est presque toujours là où on est sûr qu'il n'est pas. Vérifier les hypothèses une par une, en commençant par les plus simples.",
          },
          {
            title: "Corriger la cause",
            detail: "Un correctif qui masque le symptôme sans traiter la cause reviendra sous une autre forme. Comprendre pourquoi le bug existait, puis corriger à la racine.",
          },
        ],
      },
    ],
  },
  {
    id: "ia-notions",
    title: "Intelligence artificielle : les notions",
    level: 3,
    intro: "Ce que recouvrent vraiment les termes du moment.",
    blocks: [
      {
        kind: "fields",
        title: "Le vocabulaire de l'IA",
        fields: [
          {
            label: "Machine learning",
            value: "Apprendre des règles à partir de données plutôt que les coder à la main. Le programme s'ajuste en voyant des exemples.",
          },
          {
            label: "Deep learning",
            value: "Des réseaux de neurones à nombreuses couches, efficaces sur images, parole et langage — au prix de données et de calculs massifs.",
          },
          {
            label: "Modèle génératif",
            value: "Un modèle qui produit du contenu (texte, image, code) en prédisant des suites probables apprises sur ses données d'entraînement.",
          },
          {
            label: "Biais",
            value: "Un modèle entraîné sur des données biaisées reproduit ces biais. La qualité d'une IA dépend d'abord de la qualité de ses données.",
          },
        ],
      },
      {
        kind: "text",
        text: "Garder les pieds sur terre : ces systèmes sont des outils statistiques puissants, pas des esprits. Leurs erreurs sont plausibles et confiantes — d'où l'importance de vérifier leurs productions, jamais de les croire sur parole.",
      },
    ],
  },
  {
    id: "projets",
    title: "Projets",
    level: 3,
    intro: "Mettre la culture en pratique : expliquer, cartographier, démonter.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Cartographier le trajet d'un clic",
            detail: "Choisir un site, cliquer un lien, et décrire chaque étape : DNS, requête HTTP, serveur, réponse, affichage. Dessiner le schéma complet sur une page.",
          },
          {
            title: "Expliquer la machine à un débutant",
            detail: "Rédiger une explication du binaire, du processeur et du système d'exploitation compréhensible par quelqu'un qui n'y connaît rien. Si c'est clair pour lui, c'est compris pour vous.",
          },
          {
            title: "Installer Linux sur une machine virtuelle",
            detail: "Télécharger une image ISO, l'installer dans une machine virtuelle, ouvrir un terminal et exécuter ses premières commandes. Toucher le système, pas seulement le lire.",
          },
          {
            title: "Démonter un vieil appareil",
            detail: "Ouvrir un appareil hors d'usage, identifier processeur, mémoire, alimentation. Relier le vocabulaire de cette page au matériel réel.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Aller plus loin, en commençant par les références établies.",
    blocks: [
      {
        kind: "fields",
        title: "Références",
        fields: [
          {
            label: "CS50 — Introduction à l'informatique (Harvard)",
            value: "Le cours d'introduction le plus réputé au monde : binaire, algorithmes, mémoire, Web. Exigeant mais accessible aux débutants.",
          },
          {
            label: "Wikipedia — Informatique",
            value: "Un bon point de départ encyclopédique, avec des liens vers chaque sous-domaine pour creuser.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Livres : les ouvrages de vulgarisation sérieux sur l'histoire de l'informatique complètent bien cette page.",
          "Pratique : installer Linux, bidouiller un Raspberry Pi, lire le code source d'un petit projet open source.",
          "Communauté : les forums et groupes d'entraide pour poser les questions que cette page n'a pas couvertes.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "La culture acquise, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir les fondations : `algorithms` (penser en algorithmes), `data-structures` (organiser l'information).",
          "Toucher au système : `linux` (le système des serveurs), `bash` (automatiser le terminal), `git` (versionner).",
          "Comprendre le réseau : `networks`, `http` — comment les machines communiquent.",
          "Passer au code : `python` ou `javascript` pour écrire ses premiers programmes.",
          "Explorer le matériel : `electronics` pour comprendre ce qui se passe physiquement dans la machine.",
          "Revenir à la roadmap : valider Culture informatique et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

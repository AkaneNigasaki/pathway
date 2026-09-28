import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Make (ex-Integromat) : l'automatisation visuelle,
 * du premier scénario aux architectures robustes.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Make.com est une plateforme SaaS 100 % visuelle : aucun bloc `command`,
 * uniquement du JSON minimal et vérifié dans les blocs `code`.
 */
export const LEARNING_MAKE: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Make, ce qu'est un scénario et pourquoi l'automatisation visuelle existe.",
    blocks: [
      {
        kind: "text",
        text: "Make (anciennement Integromat) est une plateforme d'automatisation visuelle en SaaS : on assemble des scénarios en reliant des modules qui représentent des applications, sans écrire de code. Chaque module encapsule un appel d'API ; le scénario décrit le flux des données entre eux, de gauche à droite.",
      },
      {
        kind: "text",
        text: "Pourquoi Make existe : connecter deux applications demande normalement de coder contre deux APIs, de gérer l'authentification, les erreurs et l'hébergement. Make mutualise tout cela : des connecteurs prêts à l'emploi pour des centaines d'applications, une exécution hébergée, une planification intégrée. La difficulté n'est pas la technique mais la conception du flux : que se passe-t-il, dans quel ordre, et que faire si ça échoue ?",
      },
      {
        kind: "text",
        text: "Où on le rencontre : synchronisation entre outils métier, qualification de leads, traitement de documents, notifications d'équipe, alimentation de tableaux de bord — partout où des applications SaaS doivent échanger des données sans équipe technique dédiée pour coder chaque intégration.",
      },
    ],
  },
  {
    id: "make-n-est-pas-du-code",
    title: "Make n'est pas du code",
    level: 1,
    intro:
      "Le changement de paradigme : on dessine un flux de données, on ne programme pas.",
    blocks: [
      {
        kind: "diagram",
        title: "Un scénario Make, visuellement",
        lines: [
          "[Déclencheur : nouveau contact]",
          "              │",
          "              ▼",
          "   [Recherche de doublon]",
          "              │",
          "         ┌────┴────┐",
          "         ▼         ▼",
          "   [Filtre :    [Fin]",
          "    email valide]",
          "         │",
          "         ▼",
          "   [Inscription newsletter]",
        ],
      },
      {
        kind: "text",
        text: "Un scénario se lit de gauche à droite : un module déclencheur produit des données, chaque module suivant les transforme ou agit dessus. Les « bundles » sont les paquets de données qui circulent entre les modules. Il n'y a pas de code à écrire, mais il y a une logique à concevoir : conditions, branches, gestion d'erreurs — les mêmes concepts que la programmation, exprimés visuellement.",
      },
      {
        kind: "list",
        items: [
          "Make est un SaaS : rien à installer, tout se passe dans le navigateur et l'exécution est hébergée.",
          "La facturation se fait en opérations — chaque exécution de module compte : un scénario sobre coûte moins cher qu'un scénario bavard.",
          "Visuel ne veut pas dire simpliste : routeurs, filtres, itérateurs, agrégateurs et routes d'erreur permettent des flux complexes.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 2 — PRATIQUE
  // ------------------------------------------------------------------
  {
    id: "creer-un-compte",
    title: "Créer un compte",
    level: 2,
    intro:
      "Make est un service web : l'inscription est le seul prérequis.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "S'inscrire sur make.com",
            detail:
              "Créer un compte sur make.com : aucune installation, le service tourne dans le navigateur. L'offre gratuite permet de découvrir la plateforme avec un quota d'opérations limité.",
          },
          {
            title: "Choisir son organisation",
            detail:
              "Make organise le travail en organisations et en équipes. Pour un usage personnel, l'organisation par défaut suffit ; pour un usage professionnel, une organisation dédiée permet d'inviter l'équipe et de séparer les scénarios.",
          },
          {
            title: "Explorer l'interface",
            detail:
              "Repérer les zones clés : Scenarios (la liste des flux), Connections (les accès aux applications), History (l'historique des exécutions), et l'éditeur visuel où l'on assemble les modules.",
          },
        ],
      },
    ],
  },
  {
    id: "premier-scenario",
    title: "Premier scénario",
    level: 2,
    intro:
      "Créer un flux minimal de deux modules et comprendre la logique d'assemblage.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer un scénario vide",
            detail:
              "Dans Scenarios, créer un nouveau scénario : l'éditeur visuel s'ouvre avec un point d'interrogation central, l'emplacement du premier module.",
          },
          {
            title: "Ajouter le module déclencheur",
            detail:
              "Cliquer sur le point d'interrogation et choisir une application puis un déclencheur — par exemple le module Webhooks « Custom webhook », qui génère une URL d'écoute. Le déclencheur est le point d'entrée : c'est lui qui démarre le scénario.",
          },
          {
            title: "Ajouter un module d'action",
            detail:
              "Cliquer sur le demi-cercle à droite du déclencheur pour chaîner un second module, par exemple un module qui envoie un message ou écrit dans un tableur. Relier les modules, c'est définir l'ordre d'exécution.",
          },
          {
            title: "Mapper les données",
            detail:
              "Dans la configuration du second module, cliquer dans un champ : la liste des données produites par le déclencheur apparaît. Sélectionner un élément crée un « mapping » — le flux de données entre modules.",
          },
          {
            title: "Tester avec Run once",
            detail:
              "Le bouton « Run once » exécute le scénario une fois, immédiatement. Chaque module affiche une pastille avec le nombre de bundles traités : cliquer dessus révèle les données d'entrée et de sortie réelles.",
          },
          {
            title: "Activer la planification",
            detail:
              "Le commutateur de scheduling en bas de l'éditeur active le scénario selon le rythme choisi (immédiat pour les webhooks, intervalles réguliers pour le polling). Un scénario inactif ne s'exécute pas tout seul.",
          },
        ],
      },
    ],
  },
  {
    id: "modules-declencheurs",
    title: "Modules déclencheurs",
    level: 2,
    intro:
      "Tout scénario commence par un déclencheur : ce qui le met en mouvement.",
    blocks: [
      {
        kind: "table",
        headers: ["Type", "Fonctionnement", "Exemple"],
        rows: [
          ["Polling (interrogation)", "Make interroge l'application à intervalles réguliers", "Vérifier les nouveaux emails toutes les 15 minutes"],
          ["Webhook (instantané)", "L'application prévient Make dès que l'événement survient", "Un formulaire est soumis → le scénario démarre aussitôt"],
          ["Planifié", "Le scénario démarre sur un rythme fixe, sans événement externe", "Rapport quotidien à heure fixe"],
          ["Manuel", "Déclenchement à la demande via Run once", "Tests et maintenance"],
        ],
      },
      {
        kind: "text",
        text: "La différence polling / webhook est structurante : le polling consomme des opérations à chaque interrogation même sans nouveauté, et introduit un délai ; le webhook est instantané et économe, mais exige que l'application source sache envoyer des webhooks. Quand les deux existent, le webhook est presque toujours préférable.",
      },
    ],
  },
  {
    id: "modules-actions",
    title: "Modules d'action",
    level: 2,
    intro:
      "Après le déclencheur : les modules qui agissent sur les applications.",
    blocks: [
      {
        kind: "fields",
        title: "Les familles de modules",
        fields: [
          {
            label: "Action",
            value:
              "Effectue une opération : créer un enregistrement, envoyer un message, ajouter une ligne. Le cœur du scénario.",
          },
          {
            label: "Search",
            value:
              "Recherche des éléments existants : retrouver un contact par email avant de décider de le créer ou de le mettre à jour.",
          },
          {
            label: "Flow Control",
            value:
              "La logique du flux : routeur, filtres, itérateur, agrégateur. Pas d'application externe, que de l'orchestration.",
          },
          {
            label: "Tools",
            value:
              "Utilitaires : variables, composition de texte, pauses, gestion d'erreurs.",
          },
          {
            label: "HTTP",
            value:
              "Le module universel : appeler n'importe quelle API REST quand aucun connecteur natif n'existe.",
          },
        ],
      },
    ],
  },
  {
    id: "executer-et-tester",
    title: "Exécuter et tester",
    level: 2,
    intro:
      "« Run once » et inspection des bundles : la boucle de mise au point.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Lancer avec Run once",
            detail:
              "Le bouton « Run once » en bas de l'éditeur exécute le scénario immédiatement, une fois. C'est le mode de test : on provoque l'événement déclencheur (ou on attend le polling) puis on observe.",
          },
          {
            title: "Lire les pastilles",
            detail:
              "Après exécution, chaque module affiche une pastille avec le nombre de bundles traités. Zéro bundle sur un module après un filtre : le filtre a tout bloqué — c'est souvent le premier diagnostic.",
          },
          {
            title: "Inspecter entrée et sortie",
            detail:
              "Cliquer sur la pastille d'un module ouvre le détail : les données reçues en entrée et produites en sortie. C'est là qu'on vérifie que le mapping transporte bien les bonnes valeurs.",
          },
          {
            title: "Itérer",
            detail:
              "Corriger le mapping ou la configuration, relancer avec Run once. Les exécutions de test consomment des opérations comme les exécutions réelles : tester avec des jeux de données réduits.",
          },
        ],
      },
    ],
  },
  {
    id: "historique",
    title: "Historique des exécutions",
    level: 2,
    intro:
      "Chaque exécution laisse une trace consultable : le journal de bord des scénarios.",
    blocks: [
      {
        kind: "text",
        text: "L'onglet History liste les exécutions passées avec leur statut : succès, avertissement ou erreur. Cliquer sur une exécution rejoue visuellement le parcours des bundles dans le scénario, module par module — le même inspecteur que pour Run once, mais sur une exécution réelle.",
      },
      {
        kind: "list",
        items: [
          "Filtrer par statut pour retrouver rapidement les échecs.",
          "Une exécution en erreur conserve les données d'entrée : on peut diagnostiquer sans reproduire.",
          "L'historique est conservé un temps limité selon l'offre : pour un audit durable, journaliser vers un stockage externe.",
          "Une exécution échouée peut être relancée depuis l'historique après correction, sans attendre le prochain déclenchement.",
        ],
      },
    ],
  },
  {
    id: "filtres",
    title: "Filtres",
    level: 2,
    intro:
      "Ne continuer que si les données correspondent : la condition visuelle.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Placer un filtre",
            detail:
              "Cliquer sur le lien entre deux modules : l'option de filtre apparaît. Le filtre s'évalue pour chaque bundle qui tente de passer.",
          },
          {
            title: "Définir la condition",
            detail:
              "Choisir un champ du bundle, un opérateur (égal, contient, supérieur à, existe…) et une valeur de comparaison. Les opérateurs textuels et numériques sont distincts : comparer un nombre avec un opérateur texte donne des surprises.",
          },
          {
            title: "Combiner des conditions",
            detail:
              "Plusieurs conditions se combinent en ET ou en OU. Pour des logiques complexes, préférer un routeur avec plusieurs branches filtrées plutôt qu'un filtre unique illisible.",
          },
          {
            title: "Vérifier le comportement",
            detail:
              "Avec Run once, les bundles bloqués s'affichent sur le filtre : on voit exactement ce qui est passé et ce qui a été arrêté, avec les valeurs évaluées.",
          },
        ],
      },
    ],
  },
  {
    id: "routeurs",
    title: "Routeurs",
    level: 2,
    intro:
      "Diviser un scénario en plusieurs chemins parallèles selon les données.",
    blocks: [
      {
        kind: "diagram",
        title: "Un routeur avec deux branches",
        lines: [
          "        [Déclencheur]",
          "              │",
          "              ▼",
          "         [Routeur]",
          "         ┌────┴────┐",
          "         ▼         ▼",
          "  [Filtre :     [Filtre :",
          "   montant        montant",
          "   > 1000]       <= 1000]",
          "         │         │",
          "         ▼         ▼",
          "  [Validation   [Traitement",
          "   manuelle]     automatique]",
        ],
      },
      {
        kind: "text",
        text: "Le routeur crée plusieurs branches évaluées pour chaque bundle : chaque branche porte son filtre, et le bundle emprunte les branches dont le filtre est vrai. Un même bundle peut donc emprunter plusieurs branches — ce n'est pas un « sinon », c'est un « pour chaque cas vrai ». Pour un vrai aiguillage exclusif, la dernière branche porte un filtre qui est la négation des précédentes.",
      },
    ],
  },
  {
    id: "planification",
    title: "Planification",
    level: 2,
    intro:
      "Définir quand le scénario s'exécute : le rythme de l'automation.",
    blocks: [
      {
        kind: "table",
        headers: ["Mode", "Comportement", "Quand l'utiliser"],
        rows: [
          ["Immédiat", "Démarre dès réception du webhook", "Déclencheurs webhook : réactivité maximale"],
          ["Intervalles réguliers", "S'exécute toutes les N minutes ou heures", "Déclencheurs polling : vérifier les nouveautés"],
          ["Jours choisis", "Exécution aux jours de la semaine sélectionnés", "Flux métier : pas d'exécution le week-end"],
          ["À la demande", "Uniquement via Run once ou API", "Maintenance, migrations ponctuelles"],
        ],
      },
      {
        kind: "text",
        text: "Le commutateur en bas de l'éditeur active ou coupe la planification : un scénario conçu mais inactif ne consomme rien. Pour les déclencheurs polling, l'intervalle se règle dans le module déclencheur lui-même — un intervalle trop court consomme des opérations pour rien, trop long retarde les traitements.",
      },
    ],
  },
  {
    id: "connexions",
    title: "Connexions",
    level: 2,
    intro:
      "Autoriser Make à agir au nom du compte sur chaque application.",
    blocks: [
      {
        kind: "text",
        text: "Chaque module lié à une application externe exige une « connexion » : généralement un flux OAuth (on se connecte au service et on autorise Make) ou une clé API à coller. La connexion est créée une fois, puis réutilisée par tous les modules du même service dans tous les scénarios.",
      },
      {
        kind: "list",
        items: [
          "Préférer OAuth aux clés API quand les deux existent : révocable proprement, périmètres limités.",
          "Une connexion expirée (mot de passe changé, token révoqué) fait échouer tous les scénarios qui l'utilisent : la renouveler dans l'onglet Connections.",
          "Nommer les connexions explicitement (compte, environnement) quand plusieurs comptes du même service coexistent.",
          "Ne jamais brancher un scénario d'équipe sur une connexion personnelle : utiliser un compte de service dédié.",
        ],
      },
    ],
  },
  {
    id: "variables",
    title: "Variables",
    level: 2,
    intro:
      "Stocker des valeurs réutilisables : éviter de répéter les constantes dans chaque module.",
    blocks: [
      {
        kind: "text",
        text: "Les modules Tools « Set variable » et « Get variable » stockent une valeur calculée une fois pour la relire en aval. La pratique courante : placer un module de variables en tête de scénario pour centraliser les constantes (seuils, adresses, identifiants) — quand elles changent, un seul endroit à modifier au lieu de chaque module.",
      },
      {
        kind: "list",
        items: [
          "Centraliser les valeurs qui changent entre environnements (test / production).",
          "Les secrets (clés API, tokens) ne sont pas des variables ordinaires : les passer par la connexion du module, jamais en texte visible dans le mapping.",
          "Documenter chaque variable : nom explicite et, si possible, une note sur son rôle.",
        ],
      },
    ],
  },
  {
    id: "sauvegarder-et-organiser",
    title: "Sauvegarder et organiser",
    level: 2,
    intro:
      "Un scénario est un actif : le nommer, le documenter, le ranger.",
    blocks: [
      {
        kind: "list",
        items: [
          "Nommer explicitement : « CRM → Newsletter (nouveaux contacts) » plutôt que « Scenario 12 ».",
          "Ajouter des notes sur les modules complexes (l'éditeur permet d'annoter) : le futur vous remerciera.",
          "Organiser en dossiers par domaine (ventes, support, marketing) dès qu'on dépasse quelques scénarios.",
          "Exporter régulièrement le blueprint (JSON) des scénarios critiques : c'est la sauvegarde versionnable.",
          "Désactiver plutôt que supprimer un scénario en pause : l'historique et la configuration sont conservés.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "bundles",
    title: "Bundles : l'unité de données",
    level: 3,
    intro:
      "Comprendre précisément ce qui circule entre les modules.",
    blocks: [
      {
        kind: "text",
        text: "Un bundle est un paquet de données produit par un module : par exemple, un déclencheur « nouveaux emails » produit un bundle par email. Chaque bundle traverse le scénario indépendamment, déclenchant l'exécution des modules suivants pour chacun. Un scénario qui traite 10 emails exécute donc 10 fois chaque module en aval.",
      },
      {
        kind: "fields",
        title: "Conséquences pratiques",
        fields: [
          {
            label: "Comptage des opérations",
            value:
              "Chaque exécution de module compte comme une opération : 10 bundles × 5 modules = 50 opérations. Le volume de données pilote directement le coût.",
          },
          {
            label: "Filtrage par bundle",
            value:
              "Un filtre s'évalue par bundle : sur 10 emails, 3 peuvent passer et 7 être bloqués. Les pastilles affichent ces chiffres après exécution.",
          },
          {
            label: "Ordre de traitement",
            value:
              "Les bundles sont traités séquentiellement dans l'ordre de production. Pour du parallélisme réel, il faut des scénarios distincts ou des appels asynchrones.",
          },
        ],
      },
    ],
  },
  {
    id: "mapping",
    title: "Mapping avancé",
    level: 3,
    intro:
      "Au-delà du glisser-déposer : composer les données d'entrée des modules.",
    blocks: [
      {
        kind: "text",
        text: "Le mapping associe à chaque champ d'un module une valeur issue des bundles précédents, du texte fixe ou une combinaison. Cliquer dans un champ ouvre le panneau des données disponibles ; on peut y mélanger plusieurs éléments et du texte libre pour construire des valeurs composites (par exemple « Prénom Nom » à partir de deux champs).",
      },
      {
        kind: "text",
        text: "Sous le capot, un mapping est une référence de la forme `{{1.email}}` : le numéro du module source, puis le chemin du champ. Cette syntaxe apparaît dans les blueprints exportés et dans les formules ; la comprendre permet de lire un scénario sans l'éditeur et de diagnostiquer un mapping cassé après une modification en amont.",
      },
      {
        kind: "list",
        items: [
          "Les champs marqués comme requis doivent être mappés, sinon le module échoue à l'exécution.",
          "Un champ mappé à une donnée absente transmet une valeur vide : vérifier avec les pastilles d'inspection.",
          "Les tableaux se mappent élément par élément ou via un itérateur : mapper un tableau entier dans un champ texte produit une représentation concaténée, rarement ce qu'on veut.",
          "Renommer les sorties intermédiaires via des variables rend les mappings longs lisibles.",
        ],
      },
    ],
  },
  {
    id: "fonctions-integrees",
    title: "Fonctions intégrées",
    level: 3,
    intro:
      "Transformer les données sans module supplémentaire : le mini-langage de Make.",
    blocks: [
      {
        kind: "text",
        text: "Make propose des fonctions utilisables directement dans les mappings : formatage de dates, manipulation de texte, opérations mathématiques, conditions. Elles évitent d'ajouter des modules Tools pour des transformations simples et gardent le scénario compact.",
      },
      {
        kind: "table",
        headers: ["Famille", "Exemples de fonctions", "Usage typique"],
        rows: [
          ["Dates", "`formatDate`, `parseDate`", "Convertir un horodatage en date lisible"],
          ["Texte", "mise en casse, découpe, remplacement", "Normaliser un email en minuscules"],
          ["Math", "arrondi, min/max, opérations", "Calculer un total TTC"],
          ["Tableaux", "longueur, jointure, accès par index", "Compter les pièces jointes"],
          ["Logique", "conditions, valeurs par défaut", "Remplacer une valeur vide par un défaut"],
        ],
      },
      {
        kind: "text",
        text: "Les fonctions s'imbriquent : on peut enchaîner plusieurs transformations dans un seul mapping. Quand la formule devient illisible, c'est le signal pour revenir à des modules intermédiaires ou à des variables nommées.",
      },
    ],
  },
  {
    id: "iterateur",
    title: "Itérateur",
    level: 3,
    intro:
      "Éclater un tableau en bundles individuels : traiter chaque élément séparément.",
    blocks: [
      {
        kind: "diagram",
        title: "L'itérateur transforme un tableau en flux",
        lines: [
          "[Module : 1 bundle contenant",
          " un tableau de 5 contacts]",
          "              │",
          "              ▼",
          "        [Itérateur]",
          "              │",
          "              ▼",
          "  5 bundles, un par contact",
          "              │",
          "              ▼",
          "  [Modules en aval : exécutés",
          "   5 fois, une par contact]",
        ],
      },
      {
        kind: "text",
        text: "L'itérateur prend un tableau dans un bundle et émet un bundle par élément. Les modules en aval s'exécutent alors une fois par élément — c'est le mécanisme standard pour traiter les lignes d'un tableur, les pièces jointes d'un email ou les résultats d'une recherche multiple.",
      },
    ],
  },
  {
    id: "agregateur",
    title: "Agrégateur",
    level: 3,
    intro:
      "L'opération inverse : regrouper plusieurs bundles en un seul.",
    blocks: [
      {
        kind: "text",
        text: "L'agrégateur collecte les bundles d'un flux et les fusionne en un seul bundle contenant un tableau — indispensable avant un module qui attend un ensemble (créer plusieurs lignes d'un coup, envoyer un récapitulatif unique au lieu d'un message par élément).",
      },
      {
        kind: "fields",
        title: "Les agrégateurs courants",
        fields: [
          {
            label: "Array aggregator",
            value:
              "Regroupe les bundles en un tableau de collections : la forme la plus générale.",
          },
          {
            label: "Text aggregator",
            value:
              "Concatène les valeurs en un texte avec séparateur : construire un email récapitulatif, une liste.",
          },
          {
            label: "Numeric aggregator",
            value:
              "Calcule somme, moyenne, min, max sur une valeur numérique des bundles.",
          },
          {
            label: "Table aggregator",
            value:
              "Construit un tableau HTML : parfait pour un rapport envoyé par email.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le motif itérateur → traitement → agrégateur est un classique : éclater un tableau, traiter chaque élément (enrichissement, filtrage), puis regrouper pour une action unique. Bien placé, l'agrégateur divise la consommation d'opérations des modules en aval.",
      },
    ],
  },
  {
    id: "module-http",
    title: "Le module HTTP",
    level: 3,
    intro:
      "Quand aucun connecteur natif n'existe : parler directement aux APIs REST.",
    blocks: [
      {
        kind: "text",
        text: "Le module HTTP « Make a request » envoie des requêtes HTTP arbitraires : méthode, URL, en-têtes, corps. C'est la porte de sortie universelle de Make — toute API documentée devient intégrable, au prix de configurer à la main ce que les connecteurs natifs font automatiquement (authentification, pagination, formats).",
      },
      {
        kind: "code",
        language: "json",
        title: "Corps JSON envoyé par « Make a request »",
        code: `{\n  "email": "ada@example.com",\n  "first_name": "Ada",\n  "tags": ["lead", "webinaire"],\n  "source": "formulaire-contact"\n}`,
      },
      {
        kind: "list",
        items: [
          "Authentification : en-tête `Authorization` (Bearer, Basic) ou clé en paramètre, selon la doc de l'API cible.",
          "Corps JSON : définir le `Content-Type` à `application/json` et construire le JSON dans le champ Body, en y mappant les valeurs des bundles.",
          "Tester la requête hors Make d'abord (avec curl ou un client HTTP) : un module HTTP qui échoue est plus long à diagnostiquer.",
          "Gérer les codes de statut : 2xx succès, 4xx erreur de la requête (à corriger), 5xx ou 429 (à réessayer — voir la gestion d'erreurs).",
          "Quand un connecteur natif propose un module « Make an API call », le préférer : la connexion et l'authentification sont déjà gérées.",
        ],
      },
    ],
  },
  {
    id: "webhook-personnalise",
    title: "Webhooks personnalisés",
    level: 3,
    intro:
      "Recevoir des événements de n'importe quel système : l'URL d'écoute de Make.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le webhook",
            detail:
              "Ajouter un module Webhooks « Custom webhook » et lui donner un nom : Make génère une URL unique. C'est cette URL qu'on enregistre côté système émetteur.",
          },
          {
            title: "Déterminer la structure des données",
            detail:
              "Cliquer sur « Redetermine data structure » puis déclencher un vrai événement : Make capture un exemple de payload et expose ses champs pour le mapping en aval.",
          },
          {
            title: "Sécuriser la réception",
            detail:
              "Une URL de webhook est publique par nature : restreindre par IP si l'émetteur a des IPs fixes, ou exiger un secret partagé vérifié dans le scénario (filtre sur un en-tête ou un champ signature).",
          },
          {
            title: "Répondre à l'émetteur",
            detail:
              "Le module « Webhook response » renvoie une réponse HTTP à l'émetteur (code, en-têtes, corps) : utile pour les accusés de réception ou les challenges de validation.",
          },
        ],
      },
      {
        kind: "code",
        language: "json",
        title: "Exemple de payload reçu par un webhook",
        code: `{\n  "event": "form.submitted",\n  "submittedAt": "2026-09-29T07:12:00Z",\n  "data": {\n    "email": "ada@example.com",\n    "firstName": "Ada",\n    "company": "Exemple SARL",\n    "consent": true\n  }\n}`,
      },
      {
        kind: "text",
        text: "Après « Redetermine data structure », chaque champ de ce payload devient mappable en aval sous la forme `{{1.data.email}}` (module 1, chemin du champ). C'est le même mécanisme que pour tous les modules : le webhook n'est qu'un déclencheur dont les données viennent de l'extérieur.",
      },
    ],
  },
  {
    id: "gestion-erreurs-avancee",
    title: "Gestion d'erreurs avancée",
    level: 3,
    intro:
      "Un scénario fiable prévoit l'échec : routes d'erreur, reprises, alertes.",
    blocks: [
      {
        kind: "text",
        text: "Par défaut, une erreur dans un module interrompt l'exécution du bundle. En ajoutant une route d'erreur (clic droit sur le module), on définit un chemin alternatif : ignorer l'erreur, la journaliser, notifier l'équipe, ou réessayer avec des paramètres différents.",
      },
      {
        kind: "fields",
        title: "Les directives de route d'erreur",
        fields: [
          {
            label: "Resume",
            value:
              "Reprend le flux comme si le module avait réussi, avec une valeur de remplacement définie : le scénario continue malgré l'échec ponctuel.",
          },
          {
            label: "Ignore",
            value:
              "Ignore silencieusement l'erreur pour ce bundle et passe au suivant. À réserver aux échecs bénins et attendus.",
          },
          {
            label: "Break",
            value:
              "Stocke les bundles en échec pour les rejouer plus tard depuis l'historique, après correction du problème.",
          },
          {
            label: "Commit / Rollback",
            value:
              "Valide ou annule les traitements partiels quand le scénario manipule des données de façon transactionnelle.",
          },
        ],
      },
      {
        kind: "text",
        text: "Deux réflexes complètent les routes d'erreur : activer le stockage des exécutions incomplètes dans les paramètres du scénario (les bundles en échec restent rejouables au lieu d'être perdus), et terminer toute route d'erreur par une notification ou une écriture dans un journal. Une erreur silencieusement ignorée sans trace est un incident qui attend son heure.",
      },
    ],
  },
  {
    id: "datastore",
    title: "Data stores",
    level: 3,
    intro:
      "Persister des données entre exécutions : la mémoire des scénarios.",
    blocks: [
      {
        kind: "text",
        text: "Les data stores sont des petites bases clé/valeur hébergées par Make : un scénario y écrit (ajout, mise à jour, suppression) et les relit aux exécutions suivantes. Cas typiques : mémoriser le dernier élément traité pour ne traiter que les nouveautés, maintenir un compteur, stocker une correspondance entre identifiants de deux systèmes.",
      },
      {
        kind: "list",
        items: [
          "Définir la structure (les champs) du data store avant la première écriture.",
          "Clé unique obligatoire : c'est elle qui permet la mise à jour idempotente (réécrire la même clé ne duplique pas).",
          "Ne pas y stocker de secrets : ce n'est pas un coffre, les valeurs sont lisibles dans l'interface.",
          "Nettoyer périodiquement : un data store qui grossit indéfiniment ralentit les recherches.",
        ],
      },
    ],
  },
  {
    id: "planification-avancee",
    title: "Planification avancée",
    level: 3,
    intro:
      "Affiner le rythme : au-delà du simple intervalle.",
    blocks: [
      {
        kind: "list",
        items: [
          "Intervalles réguliers : de quelques minutes à une fois par mois ; chaque déclenchement consomme des opérations même sans nouveauté.",
          "Jours d'exécution : restreindre le scénario aux jours ouvrés pour les flux métier (pas de notification le dimanche à 3h du matin).",
          "Déclenchement par API : l'API de Make permet de lancer un scénario depuis un système externe — le pont vers le code quand il faut.",
          "Scénarios en chaîne : un scénario peut en déclencher un autre via l'application Make intégrée, pour découper les gros flux en étapes supervisées.",
          "Éviter les chevauchements : un intervalle plus court que la durée d'exécution crée des exécutions concurrentes sur les mêmes données.",
        ],
      },
    ],
  },
  {
    id: "operations",
    title: "Opérations et quotas",
    level: 3,
    intro:
      "Comprendre l'unité de facturation pour concevoir des scénarios économes.",
    blocks: [
      {
        kind: "text",
        text: "Une opération correspond à l'exécution d'un module. Le quota dépend de l'offre : l'épuiser met les scénarios en pause jusqu'au renouvellement. Concevoir en comptant les opérations n'est pas de l'optimisation prématurée, c'est du dimensionnement.",
      },
      {
        kind: "table",
        headers: ["Levier", "Effet"],
        rows: [
          ["Préférer les webhooks au polling", "Zéro opération quand rien ne se passe"],
          ["Filtrer tôt", "Les bundles bloqués n'exécutent pas les modules en aval"],
          ["Agréger avant les actions unitaires", "Un envoi groupé au lieu de N envois"],
          ["Limiter les recherches", "Une recherche ciblée plutôt qu'un listage complet à chaque fois"],
          ["Data store pour les nouveautés", "Ne traiter que le delta, pas tout l'historique"],
          ["Intervalle de polling adapté", "Ni trop fréquent (gaspillage) ni trop rare (latence)"],
        ],
      },
    ],
  },
  {
    id: "blueprints",
    title: "Blueprints : versionner les scénarios",
    level: 3,
    intro:
      "Exporter un scénario en JSON : sauvegarde, revue et déploiement.",
    blocks: [
      {
        kind: "text",
        text: "Chaque scénario peut s'exporter en « blueprint », un fichier JSON qui décrit modules, mappings et paramètres. C'est le format d'échange et de sauvegarde : on le versionne dans Git, on le relit en revue, on l'importe pour dupliquer un scénario vers un autre environnement ou une autre organisation.",
      },
      {
        kind: "code",
        language: "json",
        title: "Extrait simplifié de blueprint",
        code: `{\n  "name": "Veille quotidienne",\n  "flow": [\n    {\n      "id": 3,\n      "module": "builtin:ArrayAggregator",\n      "version": 1,\n      "parameters": { "feeder": 2 },\n      "mapper": { "value": "{{2.title}}" },\n      "metadata": {}\n    }\n  ]\n}`,
      },
      {
        kind: "list",
        items: [
          "Versionner les blueprints des scénarios critiques : l'historique Git raconte l'évolution du flux.",
          "À l'import, les connexions ne suivent pas : les re-créer dans l'environnement cible (c'est aussi une sécurité).",
          "Les secrets ne doivent jamais figurer en clair dans un blueprint versionné : vérifier avant de committer.",
          "Documenter les changements dans les messages de commit, comme pour du code.",
        ],
      },
    ],
  },
  {
    id: "templates",
    title: "Templates",
    level: 3,
    intro:
      "Partir de scénarios prêts à l'emploi plutôt que d'une page blanche.",
    blocks: [
      {
        kind: "text",
        text: "Make propose une galerie de templates : des scénarios pré-construits pour des cas classiques (sauvegarde de pièces jointes, synchronisation d'outils, notifications). Un template s'installe en quelques clics, connexions à configurer.",
      },
      {
        kind: "list",
        items: [
          "Un template est un point de départ, pas une solution : relire chaque module et chaque mapping avant d'activer.",
          "Vérifier les hypothèses du template (champs requis, formats) contre ses propres données.",
          "Les templates communautaires varient en qualité : préférer les templates officiels pour les flux critiques.",
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques de conception",
    level: 3,
    intro:
      "Les règles qui séparent un scénario qui tourne d'un scénario qui tient dans le temps.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un scénario = un flux métier : découper les monstres en scénarios chaînés plutôt qu'un graphe illisible.",
          "Nommer chaque module selon son rôle (« Chercher le contact par email » plutôt que le nom technique du module).",
          "Filtrer tôt, agréger quand c'est possible, journaliser les erreurs : les trois réflexes d'économie et de fiabilité.",
          "Tester avec Run once sur des données réelles mais limitées avant d'activer la planification.",
          "Documenter les hypothèses : formats attendus, champs obligatoires, comportement en cas d'absence de données.",
          "Prévoir le « que se passe-t-il si » pour chaque module externe : timeout, quota dépassé, données inattendues.",
          "Revue régulière : un scénario oublié qui tourne est une dette — auditer périodiquement les scénarios actifs.",
        ],
      },
    ],
  },
  {
    id: "securite-make",
    title: "Sécurité",
    level: 3,
    intro:
      "Un scénario manipule des accès et des données : les traiter comme tels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Principe du moindre privilège : n'autoriser que les périmètres nécessaires lors de la connexion OAuth.",
          "Comptes de service dédiés pour les scénarios d'équipe, jamais de compte personnel.",
          "Secrets hors des mappings visibles : connexions, jamais de clé en clair dans un champ texte.",
          "Webhooks : valider l'origine (IP, secret partagé, signature) avant de traiter.",
          "Données personnelles : minimiser ce qui transite et ce qui est journalisé ; vérifier la conformité (RGPD) pour les flux clients.",
          "Révoquer les connexions des applications abandonnées : un accès oublié est une porte ouverte.",
        ],
      },
    ],
  },
  {
    id: "debugging-make",
    title: "Déboguer un scénario",
    level: 3,
    intro:
      "Méthode pour les flux qui ne font pas ce qu'on attend.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Reproduire avec Run once",
            detail:
              "Isoler le problème en exécution contrôlée plutôt que d'attendre la prochaine exécution planifiée.",
          },
          {
            title: "Suivre les pastilles",
            detail:
              "Repérer où les bundles s'arrêtent : un module à zéro bundle indique un filtre bloquant ou un module amont sans sortie.",
          },
          {
            title: "Inspecter entrée et sortie",
            detail:
              "Cliquer sur chaque pastille : comparer les données réellement reçues avec celles attendues. La plupart des bugs sont des mappings faux.",
          },
          {
            title: "Vérifier les filtres",
            detail:
              "Les valeurs évaluées par les filtres sont visibles : type incorrect (texte vs nombre), champ vide, opérateur inadapté.",
          },
          {
            title: "Consulter l'historique",
            detail:
              "Pour les échecs en production, l'historique conserve les données d'entrée : diagnostiquer sans reproduire.",
          },
          {
            title: "Utiliser Make DevTool",
            detail:
              "L'extension navigateur Make DevTool journalise en détail les appels et les données échangées pendant une exécution manuelle : l'équivalent d'un onglet réseau dédié au scénario.",
          },
          {
            title: "Simplifier",
            detail:
              "Désactiver temporairement des branches pour isoler le module fautif, comme on commente du code.",
          },
        ],
      },
    ],
  },
  {
    id: "cas-usage-crm",
    title: "Cas d'usage : synchronisation CRM",
    level: 3,
    intro:
      "Anatomie d'un flux classique, du déclencheur à la gestion d'erreurs.",
    blocks: [
      {
        kind: "diagram",
        title: "Nouveau contact → outil d'emailing",
        lines: [
          "[Webhook : nouveau contact]",
          "              │",
          "              ▼",
          "   [Recherche : contact existe",
          "    déjà dans l'outil ?]",
          "         ┌────┴────┐",
          "         ▼         ▼",
          "   [Oui : mise    [Non : création",
          "    à jour]        + tag source]",
          "         └────┬────┘",
          "              ▼",
          "   [Route d'erreur : log +",
          "    notification équipe]",
        ],
      },
      {
        kind: "text",
        text: "Les ingrédients du flux robuste : recherche avant création (idempotence), branches selon l'existant, route d'erreur avec notification. Le data store peut mémoriser le dernier contact traité pour ne traiter que le delta en mode polling.",
      },
    ],
  },
  {
    id: "cas-usage-factures",
    title: "Cas d'usage : traitement de factures",
    level: 3,
    intro:
      "Un flux documentaire de bout en bout, avec validation humaine.",
    blocks: [
      {
        kind: "diagram",
        title: "Email → comptabilité",
        lines: [
          "[Déclencheur : nouvel email",
          " avec pièce jointe PDF]",
          "              │",
          "              ▼",
          "[Extraction du texte / OCR]",
          "              │",
          "              ▼",
          "[Routeur : montant > seuil ?]",
          "    ┌─────────┴──────────┐",
          "    ▼                    ▼",
          "[Validation manuelle]  [Écriture directe",
          " (email au comptable)]   en comptabilité]",
          "    └─────────┬──────────┘",
          "              ▼",
          "       [Archivage + log]",
        ],
      },
      {
        kind: "text",
        text: "Ce flux illustre le « human in the loop » : l'automatisation traite le nominal, l'humain valide les exceptions. Le routeur sur le montant est l'exemple type d'une règle métier exprimée visuellement.",
      },
    ],
  },
  {
    id: "limites",
    title: "Limites : quand coder plutôt",
    level: 3,
    intro:
      "Make a un domaine de pertinence : le connaître évite les impasses.",
    blocks: [
      {
        kind: "table",
        headers: ["Make est adapté", "Mieux vaut du code"],
        rows: [
          ["Connecter des SaaS entre eux", "Logique métier complexe avec beaucoup de branches"],
          ["Prototyper vite un flux", "Traitement de gros volumes de données"],
          ["Automatiser sans équipe technique", "Latence critique (temps réel)"],
          ["Flux à logique simple et stable", "Besoins de tests automatisés poussés et de revue de code"],
          ["Intégrations ponctuelles", "Transformations de données lourdes"],
        ],
      },
      {
        kind: "text",
        text: "Le signal de sortie : quand le scénario devient un graphe illisible, que les opérations explosent, ou que la logique exige des tests unitaires — c'est qu'un script ou un service dédié (avec le module HTTP ou les webhooks comme interface) est devenu plus adapté. Les deux cohabitent bien : Make orchestre, le code calcule.",
      },
    ],
  },
  {
    id: "equipes-et-roles",
    title: "Équipes et rôles",
    level: 3,
    intro:
      "Travailler à plusieurs sur des scénarios : permissions et responsabilités.",
    blocks: [
      {
        kind: "list",
        items: [
          "Les organisations Make gèrent membres et rôles : qui peut créer, modifier, activer ou seulement consulter les scénarios.",
          "Séparer les scénarios par équipe ou par domaine dans des dossiers dédiés : la lisibilité organisationnelle suit la lisibilité technique.",
          "Un seul responsable par scénario critique : en cas d'incident, on sait qui appeler.",
          "Documenter les scénarios partagés : objectif, données manipulées, contacts en cas d'échec.",
          "Au départ d'un membre, transférer ou révoquer ses connexions personnelles utilisées par des scénarios d'équipe.",
        ],
      },
    ],
  },
  {
    id: "environnements",
    title: "Environnements : test et production",
    level: 3,
    intro:
      "Ne pas expérimenter sur le scénario qui fait tourner l'entreprise.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Dupliquer pour tester",
            detail:
              "Cloner le scénario (ou importer son blueprint) dans un dossier « Test » : les modifications s'y font sans risque.",
          },
          {
            title: "Isoler les connexions",
            detail:
              "Utiliser des connexions de test (comptes sandbox, listes de diffusion internes) dans la copie : jamais de données réelles pendant les essais.",
          },
          {
            title: "Valider avec Run once",
            detail:
              "Exécuter la copie sur des cas représentatifs, y compris les cas d'erreur (données manquantes, API en échec).",
          },
          {
            title: "Promouvoir proprement",
            detail:
              "Exporter le blueprint validé et l'importer dans le scénario de production (ou recopier les changements), puis surveiller les premières exécutions réelles dans l'historique.",
          },
        ],
      },
    ],
  },
  {
    id: "api-make",
    title: "Piloter Make par API",
    level: 3,
    intro:
      "Quand l'interface ne suffit plus : l'API de Make pour l'industrialisation.",
    blocks: [
      {
        kind: "text",
        text: "Make expose sa propre API REST : lister les scénarios, consulter l'historique, déclencher une exécution, activer ou désactiver un scénario. C'est le pont vers le code pour la supervision, les déploiements automatisés de blueprints ou l'intégration dans un portail interne.",
      },
      {
        kind: "list",
        items: [
          "Authentification par token API, avec des périmètres à limiter au nécessaire.",
          "Cas typique : un script qui vérifie chaque matin les scénarios en erreur et alerte l'équipe.",
          "Les blueprints versionnés dans Git + l'API de déploiement = un embryon de CI/CD pour l'automation.",
          "Rester sobre : l'API sert l'industrialisation, pas le contournement des bonnes pratiques de conception.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les pièges classiques des débutants sur la plateforme.",
    blocks: [
      {
        kind: "table",
        headers: ["Symptôme", "Cause probable", "Remède"],
        rows: [
          ["Le scénario ne se déclenche jamais", "Planification désactivée", "Activer le commutateur de scheduling"],
          ["Zéro bundle après un module", "Filtre trop strict ou mapping vide", "Inspecter les valeurs évaluées par le filtre"],
          ["Doublons créés à chaque exécution", "Pas de recherche d'existant avant création", "Ajouter un module Search + branche conditionnelle"],
          ["Tout échoue d'un coup", "Connexion expirée ou révoquée", "Renouveler la connexion dans l'onglet Connections"],
          ["Opérations épuisées en milieu de période", "Polling trop fréquent ou volumes non filtrés", "Webhooks, filtres tôt, intervalles adaptés"],
          ["Données au mauvais format en aval", "Mapping d'un tableau entier dans un champ simple", "Itérateur ou agrégateur selon le besoin"],
          ["Erreur 429 de l'API cible", "Quota de l'application externe dépassé", "Espacer les appels, route d'erreur avec pause et reprise"],
        ],
      },
    ],
  },
  {
    id: "projets",
    title: "Projets",
    level: 3,
    intro:
      "Trois scénarios progressifs pour ancrer les réflexes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Projet 1 — Veille automatisée",
            detail:
              "Scénario planifié quotidien : module HTTP qui interroge un flux RSS ou une API publique, filtre sur des mots-clés, agrégateur texte pour construire un digest, envoi par email. Objectifs : planification, filtres, agrégation.",
          },
          {
            title: "Projet 2 — Qualification de leads",
            detail:
              "Webhook depuis un formulaire : recherche de doublon, routeur selon le score (chaud / tiède / froid), branches différenciées (notification immédiate, ajout à une séquence, archivage), data store pour mémoriser les leads traités. Objectifs : routeur, idempotence, data store.",
          },
          {
            title: "Projet 3 — Supervision de scénarios",
            detail:
              "Méta-scénario : surveiller l'historique des autres scénarios (via l'API Make ou des notifications), agréger les erreurs du jour, envoyer un rapport quotidien avec route d'erreur et alerte immédiate en cas d'échec critique. Objectifs : gestion d'erreurs, monitoring, blueprint versionné.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro:
      "Aller plus loin, en commençant toujours par la documentation officielle.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          {
            label: "Centre d'aide Make",
            value:
              "La documentation officielle sur `help.make.com` : guides des modules, fonctions, gestion d'erreurs et API.",
          },
          {
            label: "Make Academy",
            value:
              "Les parcours de formation officiels, du premier scénario aux certifications.",
          },
          {
            label: "Galerie de templates",
            value:
              "Des scénarios pré-construits à étudier et adapter : apprendre en lisant des flux réels.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Communauté : le forum Make et les groupes d'entraide pour les cas d'usage concrets.",
          "Pratique : le module HTTP et les webhooks sont les ponts vers le monde du code — les maîtriser décuple la plateforme.",
          "Veille : suivre les nouveautés des connecteurs utilisés, les APIs évoluent et les modules suivent.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Make maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Comprendre ce que les modules encapsulent : `http` (méthodes, statuts, en-têtes), `json` (le format des bundles), puis `api-integration` (authentification, retry, pagination).",
          "Recevoir des événements : `webhooks`, l'autre moitié de l'automation.",
          "Comparer les approches : `zapier` pour le pendant concurrent, `automation` pour la vision d'ensemble.",
          "Quand les flux deviennent du code : Python ou Node.js avec des appels HTTP directs.",
          "Revenir à la roadmap : valider Make et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

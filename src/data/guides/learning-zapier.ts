import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Zapier : automatiser sans coder, du premier Zap
 * aux workflows multi-étapes maintenables.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 *
 * Note : Zapier est un SaaS (aucune installation, aucun terminal).
 * Cette page n'utilise donc que des blocs text/list/fields/table/steps/code.
 */
export const LEARNING_ZAPIER: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Zapier et ce que l'automatisation no-code permet.",
    blocks: [
      {
        kind: "text",
        text: "Zapier est une plateforme d'automatisation no-code : elle connecte des milliers d'applications via des « Zaps » — un déclencheur dans une application provoque des actions dans d'autres, sans écrire de code. Exemple : chaque nouvel email avec pièce jointe est sauvegardé dans Drive et logged dans un tableur.",
      },
      {
        kind: "text",
        text: "Pourquoi Zapier existe : la plupart des tâches répétitives (copier des données d'un outil à l'autre, notifier, classer) ne justifient pas un développement, mais coûtent cher en temps. Zapier rend ces automatisations accessibles aux non-développeurs, en quelques minutes, avec les outils qu'ils utilisent déjà (Gmail, Sheets, Slack, CRM…).",
      },
      {
        kind: "text",
        text: "Ce que vous allez construire : des Zaps fiables — bien déclenchés, filtrés, testés étape par étape, surveillés via l'historique. L'enjeu n'est pas de « connecter deux apps », c'est de construire des automatisations qu'on peut maintenir et dépanner.",
      },
    ],
  },
  {
    id: "anatomie-zap",
    title: "Anatomie d'un Zap",
    level: 1,
    intro: "Le schéma que suit toute automatisation Zapier.",
    blocks: [
      {
        kind: "diagram",
        title: "Structure d'un Zap",
        lines: [
          "ÉVÉNEMENT dans une application",
          "     │",
          "     ▼",
          "TRIGGER (déclencheur)",
          "  ex. « nouvel email reçu »",
          "     │  + données de l'événement",
          "     ▼",
          "FILTRE (optionnel)",
          "  ex. « seulement si pièce jointe »",
          "     │",
          "     ▼",
          "ACTION(S)",
          "  ex. « sauvegarder dans Drive »",
          "      « ajouter une ligne dans Sheets »",
          "     │",
          "     ▼",
          "HISTORIQUE (chaque exécution est tracée)",
        ],
      },
      {
        kind: "list",
        items: [
          "Un Zap = un trigger + une ou plusieurs actions, qui tourne en continu une fois activé.",
          "Les données circulent : chaque étape peut utiliser les champs des étapes précédentes (mapping).",
          "Chaque exécution laisse une trace dans l'historique : succès, filtré, erreur — c'est l'outil de debug principal.",
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
    intro: "Aucune compétence technique requise — mais quelques notions aident.",
    blocks: [
      {
        kind: "fields",
        title: "Ce qu'il faut avoir et comprendre",
        fields: [
          {
            label: "Un compte Zapier",
            value:
              "Inscription sur zapier.com : rien à installer, tout se passe dans le navigateur.",
          },
          {
            label: "Vos applications",
            value:
              "Les comptes des outils à connecter (Gmail, Sheets, Slack…) avec les droits pour autoriser Zapier à y accéder.",
          },
          {
            label: "La notion d'API",
            value:
              "Comprendre qu'une application expose des événements (triggers) et des opérations (actions) : c'est ce que Zapier orchestre pour vous.",
          },
          {
            label: "Un cas d'usage réel",
            value:
              "Une tâche répétitive et bien définie (« à chaque facture reçue par email, … »). Automatiser un processus flou donne un Zap flou.",
          },
        ],
      },
    ],
  },
  {
    id: "creer-compte",
    title: "Créer son compte",
    level: 2,
    intro: "Prise en main : le parcours des premières minutes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "S'inscrire sur zapier.com",
            detail:
              "Créez un compte (email ou SSO Google). Aucune installation : l'éditeur est 100 % web. Choisissez dès le départ l'adresse qui recevra les notifications d'erreur.",
          },
          {
            title: "Connecter une première application",
            detail:
              "Menu « My Apps » → « Add connection » → choisissez l'app (ex. Gmail) → autorisez via OAuth. La connexion est réutilisable par tous vos Zaps : connectez une fois, utilisez partout.",
          },
          {
            title: "Explorer le tableau de bord",
            detail:
              "Repérez : « Create » (nouveau Zap), « Zaps » (vos automatisations), « Zap History » (l'historique d'exécution), « My Apps » (vos connexions).",
          },
        ],
      },
    ],
  },
  {
    id: "premier-zap",
    title: "Premier Zap",
    level: 2,
    intro: "Le classique : sauvegarder les pièces jointes d'emails.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir le trigger",
            detail:
              "Create → Trigger : app « Gmail », événement « New Email ». Connectez votre compte Gmail si ce n'est pas fait. Le trigger définit CE QUI démarre le Zap.",
          },
          {
            title: "Configurer et tester le trigger",
            detail:
              "Précisez les paramètres (ex. libellé ou dossier à surveiller), puis « Test trigger » : Zapier récupère un email récent comme exemple. Vérifiez que les données d'exemple ressemblent à ce que vous attendez.",
          },
          {
            title: "Ajouter l'action",
            detail:
              "Action : app « Google Drive », événement « Upload File ». Mappez les champs : le fichier vient de la pièce jointe de l'étape 1 (sélection dans la liste des champs disponibles), le dossier de destination est fixe.",
          },
          {
            title: "Tester l'action puis activer",
            detail:
              "« Test step » : vérifiez que le fichier arrive bien dans Drive. Puis activez le Zap (interrupteur On). Surveillez les premières exécutions dans « Zap History ».",
          },
        ],
      },
      {
        kind: "text",
        text: "Le réflexe à acquérir : tester chaque étape avec de vraies données d'exemple AVANT d'activer. Un Zap activé sans test envoie de vraies actions (vrais emails, vraies lignes) — les erreurs se paient en données polluées.",
      },
    ],
  },
  {
    id: "triggers",
    title: "Triggers : les déclencheurs",
    level: 2,
    intro: "L'événement qui démarre tout : bien le choisir et le configurer.",
    blocks: [
      {
        kind: "fields",
        title: "Types de triggers",
        fields: [
          {
            label: "Triggers par sondage (polling)",
            value:
              "Zapier interroge l'application à intervalles réguliers (« nouveau fichier toutes les 15 minutes »). Simple et universel, mais avec un délai.",
          },
          {
            label: "Triggers instantanés",
            value:
              "L'application prévient Zapier immédiatement via webhook (« nouveau paiement »). Temps réel, mais toutes les apps ne le proposent pas.",
          },
          {
            label: "Triggers planifiés",
            value:
              "« Schedule by Zapier » : déclenche le Zap à heure fixe (tous les jours à 8h…). Pour les routines, pas les événements.",
          },
        ],
      },
      {
        kind: "text",
        text: "Configurez le trigger au plus précis : filtrer en amont (dossier, libellé, statut) plutôt qu'en aval. Un trigger trop large déclenche le Zap pour rien — chaque exécution inutile consomme des tâches et pollue l'historique.",
      },
    ],
  },
  {
    id: "actions",
    title: "Actions",
    level: 2,
    intro: "Ce que fait le Zap : créer, mettre à jour, chercher, envoyer.",
    blocks: [
      {
        kind: "fields",
        title: "Familles d'actions",
        fields: [
          {
            label: "Créer",
            value:
              "« Create Row », « Create Contact », « Send Email » : l'action la plus courante — produire quelque chose dans l'app cible.",
          },
          {
            label: "Mettre à jour",
            value:
              "« Update Row », « Update Contact » : modifier l'existant. Exige d'identifier la cible (souvent via une étape de recherche préalable).",
          },
          {
            label: "Chercher (Find)",
            value:
              "« Find Row », « Find Contact » : retrouver un élément existant pour l'utiliser ou le mettre à jour. La clé des Zaps qui synchronisent.",
          },
          {
            label: "Utilitaires Zapier",
            value:
              "Filter, Paths, Formatter, Delay, Code : les apps intégrées qui transforment et orchestrent (détaillées au niveau 3).",
          },
        ],
      },
    ],
  },
  {
    id: "mapper-donnees",
    title: "Mapper les données",
    level: 2,
    intro: "Relier les champs : le cœur du no-code.",
    blocks: [
      {
        kind: "text",
        text: "Chaque étape d'action propose des champs à remplir. Pour chacun, vous pouvez saisir une valeur fixe (« Factures 2026 ») ou insérer un champ dynamique issu d'une étape précédente (cliquez dans le champ : la liste des données disponibles s'affiche — objet email, ligne, contact…).",
      },
      {
        kind: "list",
        items: [
          "Valeurs fixes pour ce qui ne change jamais (dossier, libellé, destinataire).",
          "Champs dynamiques pour ce qui vient de l'événement (objet, montant, nom du fichier).",
          "Vérifiez le mapping avec « Test step » : les données d'exemple montrent exactement ce qui sera envoyé.",
          "Attention aux champs requis vs optionnels : un champ requis vide fait échouer l'étape.",
        ],
      },
    ],
  },
  {
    id: "tester-etapes",
    title: "Tester chaque étape",
    level: 2,
    intro: "« Test step » : l'assurance avant activation.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Tester le trigger",
            detail:
              "« Test trigger » récupère un événement réel récent. Vérifiez qu'il contient les champs dont vous aurez besoin — sinon, créez-en un (envoyez-vous l'email test) puis retestez.",
          },
          {
            title: "Tester chaque action",
            detail:
              "« Test step » exécute l'action POUR DE VRAI avec les données d'exemple : le fichier est uploadé, la ligne est créée. Vérifiez le résultat dans l'application cible.",
          },
          {
            title: "Nettoyer les tests",
            detail:
              "Supprimez les données créées par les tests (lignes, fichiers) pour partir sur une base propre. Puis activez.",
          },
        ],
      },
      {
        kind: "text",
        text: "Les données d'exemple sont figées au moment du test : si votre trigger évolue (nouveaux champs), retestez pour rafraîchir l'exemple. Un mapping construit sur un vieil exemple peut référencer des champs qui n'existent plus.",
      },
    ],
  },
  {
    id: "activer-surveiller",
    title: "Activer et surveiller",
    level: 2,
    intro: "Le Zap vit sa vie : l'historique est votre tableau de bord.",
    blocks: [
      {
        kind: "fields",
        title: "Surveillance",
        fields: [
          {
            label: "Activer / désactiver",
            value:
              "L'interrupteur On/Off du Zap. Désactivez avant toute modification importante : un Zap à moitié reconfiguré qui tourne produit des erreurs.",
          },
          {
            label: "Zap History",
            value:
              "Chaque exécution y est tracée avec son statut et le détail étape par étape. C'est là qu'on diagnostique : quelle étape a échoué, avec quelles données.",
          },
          {
            label: "Notifications d'erreur",
            value:
              "Zapier alerte par email quand un Zap échoue de façon répétée. Ne les ignorez pas : un Zap en erreur silencieuse, c'est un processus métier à l'arrêt.",
          },
        ],
      },
    ],
  },
  {
    id: "filtres",
    title: "Filtres",
    level: 2,
    intro: "Ne continuer que si les conditions sont remplies : « Filter by Zapier ».",
    blocks: [
      {
        kind: "text",
        text: "Un filtre stoppe le Zap quand les données ne correspondent pas : « continuer seulement si l'email a une pièce jointe », « seulement si le montant dépasse 100 € ». Sans filtre, le Zap agit sur tout — y compris ce qu'il ne devrait pas toucher.",
      },
      {
        kind: "fields",
        title: "Construire un bon filtre",
        fields: [
          {
            label: "Conditions",
            value:
              "Champ + opérateur + valeur : « Pièce jointe existe », « Objet contient [Facture] », « Montant supérieur à 100 ». Combinez avec ET / OU.",
          },
          {
            label: "Placement",
            value:
              "Le plus tôt possible dans le Zap : filtrer avant les actions coûteuses évite les exécutions et les effets de bord inutiles.",
          },
          {
            label: "Test",
            value:
              "Testez le filtre avec des données qui passent ET des données qui doivent être bloquées. Un filtre jamais testé dans les deux sens est un filtre incertain.",
          },
        ],
      },
    ],
  },
  {
    id: "multi-etapes",
    title: "Zaps multi-étapes",
    level: 2,
    intro: "Enchaîner plusieurs actions : l'ordre et les dépendances.",
    blocks: [
      {
        kind: "text",
        text: "Un Zap peut enchaîner autant d'actions que nécessaire : trigger → filtre → créer le contact → envoyer l'email de bienvenue → logger dans Sheets. Chaque étape voit les données de toutes les précédentes.",
      },
      {
        kind: "list",
        items: [
          "Ordonnez par dépendance : une étape qui utilise le résultat d'une autre vient après.",
          "Une étape qui échoue stoppe la suite : placez les actions critiques en premier, les « nice to have » après.",
          "Gardez les Zaps lisibles : au-delà de 5-6 étapes, envisagez de découper en plusieurs Zaps (via webhooks ou étapes intermédiaires).",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 2,
    intro: "Les pièges des premiers Zaps.",
    blocks: [
      {
        kind: "table",
        headers: ["Symptôme", "Cause probable", "Correction"],
        rows: [
          ["Le Zap ne se déclenche jamais", "Trigger mal configuré ou trop restrictif", "Retester le trigger, élargir puis filtrer en aval"],
          ["Actions avec des champs vides", "Mapping sur un champ inexistant ou exemple périmé", "Retester le trigger pour rafraîchir les données d'exemple"],
          ["Doublons créés", "Trigger qui renvoie d'anciens événements, ou Zap réactivé", "Étape de recherche « Find » avant « Create » (upsert manuel)"],
          ["Erreurs d'authentification", "Connexion expirée ou révoquée", "Reconnecter l'app dans « My Apps »"],
          ["Le Zap agit sur les mauvais éléments", "Pas de filtre", "Ajouter un filtre en début de Zap"],
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 2,
    intro: "Les habitudes qui rendent les Zaps maintenables.",
    blocks: [
      {
        kind: "list",
        items: [
          "Nommez explicitement : « [Factures] Email → Drive + Sheets » vaut mieux que « Mon Zap 3 ».",
          "Un Zap = un processus : ne mélangez pas deux automatisations dans un seul Zap.",
          "Testez chaque étape avant d'activer, avec des données réelles.",
          "Documentez dans la description du Zap : à quoi il sert, qui le maintient.",
          "Surveillez l'historique après activation : les premières 24 h révèlent les cas non prévus.",
          "Désactivez avant de modifier en profondeur.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "polling-vs-instant",
    title: "Polling vs instantané : en détail",
    level: 3,
    intro: "Comprendre la mécanique pour choisir et dépanner.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Polling", "Instantané (webhook)"],
        rows: [
          ["Mécanisme", "Zapier interroge l'app à intervalles", "L'app prévient Zapier dès l'événement"],
          ["Délai", "Quelques minutes entre l'événement et le Zap", "Quasi immédiat"],
          ["Disponibilité", "Presque toutes les apps", "Seulement si l'app le propose"],
          ["Piège", "Événements entre deux sondages regroupés ; doublons possibles au redémarrage", "Si l'app ne notifie pas (panne), l'événement est perdu"],
        ],
      },
      {
        kind: "text",
        text: "En pratique : préférez l'instantané quand il existe (notifications critiques), acceptez le polling sinon. Pour les processus où chaque événement compte (paiements), ajoutez une réconciliation périodique (un Zap planifié qui vérifie les manquants).",
      },
    ],
  },
  {
    id: "webhooks-by-zapier",
    title: "Webhooks by Zapier",
    level: 3,
    intro: "Recevoir et envoyer des webhooks : l'app la plus puissante de Zapier.",
    blocks: [
      {
        kind: "fields",
        title: "Les deux directions",
        fields: [
          {
            label: "Catch Hook (trigger)",
            value:
              "Zapier vous donne une URL : tout POST vers cette URL déclenche le Zap. Idéal pour connecter un service sans intégration native (bouton, script, autre outil).",
          },
          {
            label: "Catch Raw Hook",
            value:
              "Variante qui conserve le corps brut : utile quand le payload n'est pas du JSON standard.",
          },
          {
            label: "Custom Request (action)",
            value:
              "Envoyer une requête HTTP (GET/POST/PUT…) vers n'importe quelle API, avec en-têtes et corps personnalisés. La porte vers les services non intégrés.",
          },
        ],
      },
      {
        kind: "text",
        text: "« Webhooks by Zapier » transforme Zapier en colle universelle : trigger sur n'importe quel événement poussé, action vers n'importe quelle API. C'est aussi le pont vers vos propres systèmes (voir la Learning Page webhooks pour le versant technique).",
      },
    ],
  },
  {
    id: "paths",
    title: "Paths : les embranchements",
    level: 3,
    intro: "« Paths by Zapier » : si / sinon dans un Zap.",
    blocks: [
      {
        kind: "text",
        text: "Paths ajoute des branches conditionnelles : si le montant dépasse 1000 € → notifier le manager ; sinon → traitement standard. Chaque chemin a ses propres étapes, avec un chemin par défaut en repli.",
      },
      {
        kind: "list",
        items: [
          "Un seul niveau d'imbrication : les Paths ne se nichent pas — au-delà, découpez en plusieurs Zaps.",
          "Règles évaluées dans l'ordre : la première qui correspond gagne.",
          "Toujours un chemin par défaut : les cas non prévus doivent aller quelque part (ne serait-ce qu'un log).",
        ],
      },
    ],
  },
  {
    id: "formatter",
    title: "Formatter : transformer les données",
    level: 3,
    intro: "« Formatter by Zapier » : nettoyer et convertir sans coder.",
    blocks: [
      {
        kind: "fields",
        title: "Utilitaires principaux",
        fields: [
          {
            label: "Text",
            value:
              "Extraire (email dans un texte), remplacer, mettre en majuscules/minuscules, tronquer, diviser en lignes.",
          },
          {
            label: "Numbers",
            value:
              "Opérations arithmétiques, formatage (décimales, séparateurs), arrondis.",
          },
          {
            label: "Date / Time",
            value:
              "Reformater les dates (« 2026-09-29 » → « 29/09/2026 »), ajouter des durées, comparer.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le Formatter se place entre le trigger et l'action : « prendre la date brute de l'événement, la reformater, l'injecter dans le document ». C'est l'étape qui évite 80 % des recours au code.",
      },
    ],
  },
  {
    id: "delay",
    title: "Delay : temporiser",
    level: 3,
    intro: "« Delay by Zapier » : attendre avant de continuer.",
    blocks: [
      {
        kind: "fields",
        title: "Modes de délai",
        fields: [
          {
            label: "Delay For",
            value:
              "Attendre une durée fixe (ex. 2 heures) : relance client après un devis, rappel.",
          },
          {
            label: "Delay Until",
            value:
              "Attendre jusqu'à un moment précis (ex. lundi 9h) : ne jamais déranger le week-end.",
          },
          {
            label: "Delay After Queue",
            value:
              "Espacer les exécutions (ex. 1 par heure) : lisser la charge vers une API limitée.",
          },
        ],
      },
      {
        kind: "text",
        text: "Cas typique : « email de bienvenue immédiat, puis relance J+3 ». Attention : un Zap en attente consomme une exécution « en cours » — et si les données changent pendant l'attente, le Zap utilisera les valeurs du déclenchement, pas les nouvelles.",
      },
    ],
  },
  {
    id: "digest",
    title: "Digest : regrouper",
    level: 3,
    intro: "« Digest by Zapier » : un résumé au lieu d'un flot.",
    blocks: [
      {
        kind: "text",
        text: "Digest accumule les événements puis les envoie en un seul lot : « chaque soir à 18h, un email avec les 12 tickets du jour » au lieu de 12 emails. Indispensable quand le trigger est fréquent et l'action notifiante.",
      },
      {
        kind: "list",
        items: [
          "Définissez la fréquence d'envoi (quotidien, hebdo) : c'est elle qui rythme le digest.",
          "Formatez le contenu (liste à puces, tableau) : un digest illisible ne sera pas lu.",
          "Videz après envoi : le digest se réinitialise à chaque envoi planifié.",
        ],
      },
    ],
  },
  {
    id: "code-by-zapier",
    title: "Code by Zapier",
    level: 3,
    intro: "Quand le no-code atteint ses limites : une étape de code (Python ou JavaScript).",
    blocks: [
      {
        kind: "text",
        text: "« Code by Zapier » exécute un court script : en Python, les champs des étapes précédentes arrivent dans le dictionnaire `input_data`, et le script retourne un dictionnaire utilisable par la suite.",
      },
      {
        kind: "code",
        language: "python",
        title: "Exemple Python",
        code: `# input_data : dict des champs mappés en entrée\nnom = input_data.get("name", "")\nemail = input_data.get("email", "")\n\n# La valeur retournée devient utilisable par les étapes suivantes\nreturn {\n    "subject": "Bienvenue " + nom,\n    "to": email,\n    "slug": nom.lower().replace(" ", "-"),\n}`,
      },
      {
        kind: "list",
        items: [
          "Réservé aux transformations que Formatter ne couvre pas (logique complexe, parsing spécifique).",
          "Gardez le code court et lisible : une étape de 200 lignes est un composant à extraire (ou le signe qu'il faut passer à n8n / du code).",
          "Testez comme les autres étapes : « Test step » avec des données réelles.",
          "Pas de dépendances externes ni d'appels réseau longs : l'environnement d'exécution est contraint.",
        ],
      },
    ],
  },
  {
    id: "tables",
    title: "Tables by Zapier",
    level: 3,
    intro: "Stocker des données simples sans base externe.",
    blocks: [
      {
        kind: "text",
        text: "Tables est une mini-base intégrée : stocker des correspondances, des compteurs, des états entre deux exécutions. Exemple : table « clients → responsable » consultée par le Zap pour router les notifications.",
      },
      {
        kind: "list",
        items: [
          "Usage : petites tables de référence et états simples — pas un substitut à une vraie base.",
          "Lecture/écriture via les actions Tables (chercher, créer, mettre à jour une ligne).",
          "Pour des volumes ou des relations complexes, connectez une vraie base (Airtable, Sheets, Postgres via webhook).",
        ],
      },
    ],
  },
  {
    id: "interfaces",
    title: "Interfaces et chatbots",
    level: 3,
    intro: "Au-delà des Zaps : les autres produits Zapier.",
    blocks: [
      {
        kind: "fields",
        title: "Produits complémentaires",
        fields: [
          {
            label: "Interfaces",
            value:
              "Construire des pages/formulaires simples connectés aux Zaps : un formulaire de saisie qui déclenche un workflow, un tableau de bord interne.",
          },
          {
            label: "Chatbots",
            value:
              "Des assistants conversationnels branchés sur vos données et vos Zaps : répondre aux questions fréquentes, déclencher des actions.",
          },
          {
            label: "Transfer",
            value:
              "Migration ponctuelle de données en masse (historique) : le complément des Zaps qui traitent le flux continu.",
          },
        ],
      },
      {
        kind: "text",
        text: "Logique : les Zaps automatisent le flux, Interfaces/Chatbots donnent une porte d'entrée humaine, Transfer gère l'existant. N'empilez pas les produits sans besoin — chacun ajoute de la surface à maintenir.",
      },
    ],
  },
  {
    id: "gestion-erreurs",
    title: "Gestion des erreurs",
    level: 3,
    intro: "Un Zap qui échoue doit se voir, se comprendre et se rejouer.",
    blocks: [
      {
        kind: "fields",
        title: "Le cycle de l'erreur",
        fields: [
          {
            label: "Détecter",
            value:
              "Zap History montre chaque échec avec l'étape fautive et les données. Les notifications email signalent les échecs répétés.",
          },
          {
            label: "Comprendre",
            value:
              "Le détail d'exécution affiche l'entrée et la réponse de chaque étape : on y voit si c'est la donnée (champ vide) ou le service (API en panne).",
          },
          {
            label: "Rejouer",
            value:
              "« Replay » relance une exécution échouée après correction — sans refaire le trigger. Inestimable après une panne de l'app cible.",
          },
          {
            label: "Prévenir",
            value:
              "Étapes de garde : filtre sur les champs requis, valeurs par défaut via Formatter, alertes sur les échecs.",
          },
        ],
      },
    ],
  },
  {
    id: "statuts-historique",
    title: "Lire les statuts d'historique",
    level: 3,
    intro: "Chaque statut raconte une histoire différente.",
    blocks: [
      {
        kind: "table",
        headers: ["Statut", "Signification", "Action"],
        rows: [
          ["Success", "Le Zap a tourné jusqu'au bout", "Rien — ou vérifier le résultat si le processus est critique"],
          ["Filtered", "Stoppé par un filtre (normal)", "Normal : c'est le filtre qui fait son travail"],
          ["Errored", "Une étape a échoué", "Diagnostiquer dans le détail, corriger, rejouer"],
          ["Halted", "Stoppé (ex. tâche limite, Zap désactivé)", "Vérifier l'état du Zap et du compte"],
          ["Scheduled", "En attente (Delay)", "Normal : le Zap reprendra au moment prévu"],
        ],
      },
      {
        kind: "text",
        text: "« Filtered » n'est pas une erreur : c'est la preuve que vos filtres fonctionnent. Un historique plein de « Errored » sur un Zap critique justifie une alerte proactive, pas une vérification manuelle quotidienne.",
      },
    ],
  },
  {
    id: "taches",
    title: "Comprendre les tâches",
    level: 3,
    intro: "L'unité de facturation : ce qui compte comme une tâche.",
    blocks: [
      {
        kind: "text",
        text: "Une tâche est comptée pour chaque étape d'action exécutée avec succès (le trigger et les filtres ne comptent pas). Un Zap à 4 actions qui tourne 10 fois = 40 tâches. C'est l'unité à optimiser : chaque étape et chaque exécution inutile coûte.",
      },
      {
        kind: "list",
        items: [
          "Filtrez tôt : une exécution stoppée par un filtre ne consomme pas de tâches d'action.",
          "Évitez les triggers trop larges : 1000 exécutions pour 10 utiles = 990× le coût nécessaire.",
          "Surveillez la consommation dans le tableau de bord : une dérive signale un Zap qui s'emballe (boucle, trigger trop sensible).",
          "Les Zaps en erreur qui retentent consomment aussi : corrigez vite.",
        ],
      },
    ],
  },
  {
    id: "plans-limites",
    title: "Plans et limites",
    level: 3,
    intro: "Connaître les limites sans les subir.",
    blocks: [
      {
        kind: "text",
        text: "Zapier fonctionne par plans avec des quotas (tâches mensuelles, nombre de Zaps, fonctionnalités avancées). Les limites à connaître : le nombre d'étapes par Zap, l'accès aux apps premium, les triggers instantanés et les fonctionnalités avancées (Paths, Tables…) selon le plan.",
      },
      {
        kind: "list",
        items: [
          "Dimensionnez avant de construire : estimez tâches/mois = exécutions × actions.",
          "Les fonctionnalités avancées (multi-étapes complexes, Paths, délais longs) relèvent des plans payants : vérifiez avant de concevoir autour.",
          "Si les quotas deviennent un problème récurrent, c'est le signal pour évaluer n8n ou du code (voir alternatives).",
        ],
      },
    ],
  },
  {
    id: "securite",
    title: "Sécurité",
    level: 3,
    intro: "Vos Zaps manipulent des données réelles : les protéger.",
    blocks: [
      {
        kind: "list",
        items: [
          "Connexions OAuth : Zapier accède à vos apps avec vos droits — limitez les portées quand c'est possible, révoquez les connexions inutilisées dans « My Apps ».",
          "Clés API : jamais en clair dans les descriptions ou les noms d'étapes ; utilisez les champs dédiés.",
          "2FA sur le compte Zapier : vos Zaps peuvent envoyer des emails et déplacer des données — le compte doit être protégé.",
          "Données sensibles : évitez de faire transiter (et logger) des données personnelles non nécessaires ; le principe de minimisation s'applique.",
          "Accès équipe : partagez les Zaps avec les bonnes personnes, pas avec tout le monde.",
        ],
      },
    ],
  },
  {
    id: "organiser",
    title: "Organiser ses Zaps",
    level: 3,
    intro: "Dossiers, nommage, équipes : rester lisible à 30 Zaps.",
    blocks: [
      {
        kind: "fields",
        title: "Organisation",
        fields: [
          {
            label: "Dossiers",
            value:
              "Regroupez par domaine (Ventes, Support, Finance) : on retrouve un Zap en secondes au lieu de scroller.",
          },
          {
            label: "Nommage",
            value:
              "Convention : « [Domaine] Déclencheur → Actions ». Le nom doit dire ce que fait le Zap sans l'ouvrir.",
          },
          {
            label: "Équipes",
            value:
              "Partagez les Zaps avec l'équipe concernée : un Zap critique maintenu par une seule personne est un risque.",
          },
          {
            label: "Descriptions",
            value:
              "Quelques lignes : objectif, apps impliquées, cas limites connus. Le futur vous remerciera.",
          },
        ],
      },
    ],
  },
  {
    id: "documentation-zaps",
    title: "Documenter ses Zaps",
    level: 3,
    intro: "Un Zap non documenté est un Zap qu'on n'ose plus toucher.",
    blocks: [
      {
        kind: "list",
        items: [
          "Description du Zap : pourquoi il existe, quel processus métier il sert.",
          "Notes sur les étapes non triviales : pourquoi ce filtre, pourquoi ce Formatter.",
          "Cas limites connus : « ne gère pas les remboursements », « ignore les emails de plus de 25 Mo ».",
          "Propriétaire : qui est alerté en cas d'erreur, qui peut le modifier.",
        ],
      },
    ],
  },
  {
    id: "transfer",
    title: "Transfer : les données existantes",
    level: 3,
    intro: "Les Zaps traitent le flux ; Transfer migre le stock.",
    blocks: [
      {
        kind: "text",
        text: "Quand vous connectez un nouvel outil, l'historique n'est pas dans les Zaps (ils ne voient que le nouveau). Transfer effectue la migration ponctuelle : import en masse des contacts, tickets ou commandes existants, avec le même mapping que vos Zaps.",
      },
      {
        kind: "list",
        items: [
          "Faites Transfer AVANT d'activer les Zaps de flux : l'ordre évite les doublons.",
          "Testez sur un échantillon avant la masse.",
          "Prévoyez la déduplication : un import relancé ne doit pas dupliquer.",
        ],
      },
    ],
  },
  {
    id: "alternatives",
    title: "Alternatives et limites du no-code",
    level: 3,
    intro: "Quand Zapier suffit, quand il faut autre chose : comparaison factuelle.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Zapier", "n8n", "Code sur mesure"],
        rows: [
          ["Prise en main", "Immédiate, no-code", "Low-code, plus technique", "Développement complet"],
          ["Hébergement", "SaaS uniquement", "SaaS ou auto-hébergé", "Votre infrastructure"],
          ["Logique complexe", "Limitée (Paths, Code)", "Boucles, branches, code natif", "Illimitée"],
          ["Coût à l'échelle", "Croît avec les tâches", "Plus prévisible en auto-hébergé", "Coût de développement + maintenance"],
        ],
      },
      {
        kind: "text",
        text: "Signes qu'il faut migrer : logique que les Paths ne peuvent plus exprimer, volume qui fait exploser la facture, besoin d'auto-hébergement (données sensibles). La migration se prépare : documentez les Zaps (entrées, sorties, règles) — c'est le cahier des charges du remplaçant.",
      },
    ],
  },
  {
    id: "cas-usages",
    title: "Cas d'usage par métier",
    level: 3,
    intro: "Des idées concrètes, par fonction.",
    blocks: [
      {
        kind: "table",
        headers: ["Métier", "Zap type", "Bénéfice"],
        rows: [
          ["Ventes", "Nouveau lead (formulaire) → CRM + notification Slack + tâche", "Aucun lead perdu, suivi immédiat"],
          ["Support", "Nouveau ticket → catégorisation → assignation + SLA (Delay)", "Temps de réponse maîtrisé"],
          ["Compta", "Facture reçue (email) → Drive + ligne comptable", "Classement automatique, zéro oubli"],
          ["Marketing", "Nouvel inscrit newsletter → séquence d'emails + CRM", "Onboarding sans intervention"],
          ["RH", "Candidature reçue → dossier + notification + accusé de réception", "Processus fluide et traçable"],
        ],
      },
    ],
  },
  {
    id: "maintenance",
    title: "Maintenance",
    level: 3,
    intro: "Les Zaps vieillissent : l'audit périodique.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Revue trimestrielle",
            detail:
              "Listez tous les Zaps actifs : chacun sert-il encore ? Les processus changent, les Zaps orphelins s'accumulent — désactivez ce qui ne sert plus.",
          },
          {
            title: "Vérifier les connexions",
            detail:
              "Mots de passe changés, tokens expirés : revalidez les connexions critiques dans « My Apps » avant qu'elles cassent en production.",
          },
          {
            title: "Relire les erreurs",
            detail:
              "Parcourez l'historique d'erreurs du trimestre : les échecs récurrents signalent un Zap à corriger ou à repenser.",
          },
          {
            title: "Mettre à jour la documentation",
            detail:
              "Les descriptions suivent-elles les modifications ? Un Zap modifié sans doc redevient une boîte noire.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-avancees",
    title: "Erreurs avancées",
    level: 3,
    intro: "Les pièges qui survivent au niveau 2.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Pourquoi c'est tentant", "La réalité"],
        rows: [
          ["Boucle Zap → app → Zap", "Synchroniser dans les deux sens", "Boucle infinie : chaque mise à jour redéclenche. Prévoyez un garde (filtre sur l'origine)."],
          ["Données d'exemple périmées", "Le Zap « marchait avant »", "Retestez le trigger : les champs ont pu changer côté app."],
          ["Filtre sur un champ parfois absent", "Le champ existe « normalement »", "Un champ absent fait échouer ou biaise le filtre : prévoyez le cas vide."],
          ["Zap géant fourre-tout", "Tout centraliser", "Impossible à déboguer : découpez par processus."],
          ["Ignorer les erreurs « rares »", "Ça ne plante presque jamais", "Presque = parfois = un jour critique. Corrigez ou alertez."],
        ],
      },
    ],
  },
  {
    id: "anti-patterns",
    title: "Anti-patterns",
    level: 3,
    intro: "Ce qu'il ne faut jamais faire avec Zapier.",
    blocks: [
      {
        kind: "list",
        items: [
          "Automatiser un processus cassé : le Zap rendra le chaos plus rapide, pas meilleur. Clarifiez d'abord, automatisez ensuite.",
          "Zaps sans filtre sur des triggers larges : des milliers de tâches pour rien.",
          "Données sensibles dans les noms/descriptions : l'historique est lisible par l'équipe.",
          "Un seul compte pour tout : le départ du propriétaire bloque les Zaps — utilisez un compte d'équipe / transférez la propriété.",
          "Aucune surveillance : un Zap en erreur depuis 3 mois, c'est un processus métier mort depuis 3 mois.",
        ],
      },
    ],
  },
  {
    id: "sous-zaps",
    title: "Sub-Zaps : mutualiser",
    level: 3,
    intro: "« Sub-Zaps » : des sous-routines réutilisables entre Zaps.",
    blocks: [
      {
        kind: "text",
        text: "Quand la même séquence (ex. « créer le dossier client + notifier + logger ») revient dans dix Zaps, la dupliquer dix fois, c'est dix endroits à maintenir. Un Sub-Zap encapsule la séquence : les Zaps parents l'appellent comme une étape, avec des entrées et des sorties.",
      },
      {
        kind: "list",
        items: [
          "Définissez les entrées du Sub-Zap (ce que le parent lui envoie) et sa sortie (ce qu'il renvoie).",
          "Modifiez la logique une fois : tous les parents en bénéficient.",
          "Réservé aux séquences stables et bien testées : un Sub-Zap buggé casse tous ses parents.",
        ],
      },
    ],
  },
  {
    id: "dupliquer-partager",
    title: "Dupliquer et partager",
    level: 3,
    intro: "Ne jamais partir de zéro : duplication, modèles, partage.",
    blocks: [
      {
        kind: "list",
        items: [
          "Dupliquer : un Zap qui marche est le meilleur modèle — dupliquez puis adaptez, plutôt que de reconstruire.",
          "Partager : un lien de partage permet à un collègue d'installer une copie du Zap dans son compte (il reconnectera ses propres apps).",
          "Versionner les changements importants : dupliquez avant une refonte risquée — l'original reste activable en repli.",
        ],
      },
    ],
  },
  {
    id: "connexions-multiples",
    title: "Connexions multiples",
    level: 3,
    intro: "Gérer plusieurs comptes d'une même app dans « My Apps ».",
    blocks: [
      {
        kind: "text",
        text: "Rien n'oblige à une seule connexion par application : vous pouvez connecter le Gmail personnel ET le Gmail pro, deux comptes Slack, etc. Chaque étape choisit sa connexion — indispensable quand un Zap jongle entre périmètres.",
      },
      {
        kind: "list",
        items: [
          "Nommez les connexions sans ambiguïté (« Gmail — pro », « Gmail — perso ») : une erreur de connexion envoie des données au mauvais endroit.",
          "Revoyez périodiquement « My Apps » : supprimez les connexions obsolètes (départs, apps abandonnées).",
          "Une connexion révoquée casse tous les Zaps qui l'utilisent : l'historique d'erreurs le révèle vite.",
        ],
      },
    ],
  },
  {
    id: "projets",
    title: "Projets pour pratiquer",
    level: 3,
    intro: "Trois projets progressifs.",
    blocks: [
      {
        kind: "list",
        items: [
          "Bureau sans papier : tout email avec pièce jointe est classé dans Drive par expéditeur (filtre + Formatter pour le nommage), avec ligne de suivi dans Sheets.",
          "Pipeline commerciale : formulaire → fiche CRM → notification Slack → relance J+3 (Delay) → digest hebdo des relances (Digest).",
          "Pont technique : un service sans intégration Zapier envoie un webhook (Catch Hook) → Formatter → création multi-apps, avec gestion d'erreur et rejeu documentés.",
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Les références officielles, en priorité.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle",
        fields: [
          {
            label: "help.zapier.com",
            value:
              "Le centre d'aide officiel : guides par app, par fonctionnalité (Paths, Formatter, Webhooks…), dépannage. La référence pour chaque écran.",
          },
          {
            label: "Communauté Zapier",
            value:
              "Le forum d'entraide : des milliers de cas concrets déjà résolus, souvent avec des captures d'écran.",
          },
          {
            label: "Blog Zapier",
            value:
              "Idées d'automatisation par métier et nouveautés produits — utile pour découvrir ce qui est possible.",
          },
        ],
      },
      {
        kind: "text",
        text: "Réflexe : chaque application intégrée a sa page d'aide dédiée (triggers et actions disponibles, limites) — consultez-la avant de supposer ce qu'une intégration sait faire.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite",
    level: 3,
    intro: "L'automatisation no-code mène naturellement vers l'intégration technique.",
    blocks: [
      {
        kind: "fields",
        title: "Continuer dans la roadmap",
        fields: [
          {
            label: "n8n",
            value:
              "Le low-code auto-hébergeable : quand les Zaps deviennent trop complexes ou trop chers.",
          },
          {
            label: "automation",
            value:
              "La discipline : concevoir des processus automatisés robustes, au-delà d'un outil.",
          },
          {
            label: "webhooks",
            value:
              "Le versant technique : recevoir et émettre des webhooks, vérifier les signatures.",
          },
          {
            label: "api-integration",
            value:
              "Comprendre les APIs en profondeur : ce que Zapier orchestre pour vous.",
          },
        ],
      },
    ],
  },
];

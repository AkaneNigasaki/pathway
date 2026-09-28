import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du Portfolio designer : sélectionner des projets,
 * écrire des case studies qui montrent le raisonnement, et présenter son
 * travail pour décrocher un poste. 3 niveaux (Aperçu / Pratique / Approfondi).
 */
export const LEARNING_PORTFOLIO: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Ce qu'est un portfolio de designer, et pourquoi il décide de votre embauche.",
    blocks: [
      {
        kind: "text",
        text: "Un portfolio de designer n'est pas une galerie d'images : c'est la démonstration de votre manière de penser. Les recruteurs ne cherchent pas seulement de beaux écrans, ils cherchent des preuves que vous savez comprendre un problème, explorer des solutions, prendre des décisions justifiées et mesurer un résultat.",
      },
      {
        kind: "text",
        text: "La forme compte moins que le fond. Un site personnel, une page Notion ou un PDF bien construit peuvent tous fonctionner. Ce qui compte : 3 à 5 projets racontés en profondeur, avec le processus visible — pas 20 captures d'écran sans contexte.",
      },
      {
        kind: "list",
        items: [
          "Le portfolio répond à une question : « comment cette personne résout-elle des problèmes ? ».",
          "Chaque projet = une case study : contexte, problème, démarche, résultat.",
          "La qualité prime sur la quantité : 3 projets solides valent mieux que 12 superficiels.",
        ],
      },
    ],
  },
  {
    id: "scan-30-secondes",
    title: "Le scan de 30 secondes",
    level: 1,
    intro:
      "Ce qu'un recruteur voit vraiment lors du premier tri — et comment passer ce filtre.",
    blocks: [
      {
        kind: "text",
        text: "Au premier tri, un recruteur consacre quelques dizaines de secondes à votre portfolio. Il ne lit pas vos case studies : il survole. Ce qui se joue en 30 secondes : le positionnement (quel type de designer êtes-vous ?), la qualité visuelle globale, et la clarté de la navigation vers vos projets.",
      },
      {
        kind: "diagram",
        title: "Le parcours du recruteur pressé",
        lines: [
          "Page d'accueil",
          "     │",
          "     ├── Qui ? (titre, spécialité, localisation)",
          "     ├── Quoi ? (3-5 projets visibles d'un coup d'œil)",
          "     └── Où cliquer ? (un projet attire l'œil)",
          "     │",
          "     ▼",
          "Case study",
          "     │",
          "     ├── Le problème est-il clair en 10 secondes ?",
          "     ├── Le processus est-il visible en scrollant ?",
          "     └── Le résultat est-il mesurable ?",
          "     │",
          "     ▼",
          "Décision : entretien ou non",
        ],
      },
      {
        kind: "list",
        items: [
          "Page d'accueil : nom, spécialité, 3 à 5 projets mis en avant. Rien d'autre n'est lu au premier passage.",
          "Chaque vignette de projet doit donner envie de cliquer : un visuel fort + un titre qui annonce un problème, pas un livrable.",
          "Si le recruteur clique, la case study doit se comprendre en scrollant vite : titres de sections clairs, images annotées, résultat chiffré.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 2 — PRATIQUE
  // ------------------------------------------------------------------
  {
    id: "mise-en-place",
    title: "Mise en place",
    level: 2,
    intro:
      "Ce qu'il faut préparer concrètement avant d'écrire la première case study.",
    blocks: [
      {
        kind: "fields",
        title: "Le kit de départ",
        fields: [
          {
            label: "Inventaire de projets",
            value:
              "Listez tout ce sur quoi vous avez travaillé : projets pro, personnels, challenges, contributions. Notez pour chacun : le problème, votre rôle, les artefacts existants (maquettes, recherches, prototypes).",
          },
          {
            label: "Artefacts à rassembler",
            value:
              "Captures d'écrans haute résolution, wireframes, notes de recherche, prototypes, métriques avant/après. Sans artefacts de processus, pas de case study crédible.",
          },
          {
            label: "Nom de domaine",
            value:
              "Un domaine à votre nom (`prenomnom.com`) coûte quelques euros par an et signale le sérieux. À défaut, un sous-domaine propre (`prenom.framer.website`) suffit.",
          },
          {
            label: "Structure du site",
            value:
              "Accueil (projets mis en avant) → pages projet (case studies) → À propos → Contact. Quatre pages suffisent ; la navigation doit tenir en une ligne.",
          },
        ],
      },
      {
        kind: "text",
        text: "Travaillez dans un document texte avant de designer le site. Écrire la case study dans un éditeur de texte vous force à structurer le récit ; le design du site vient après, pour servir ce récit.",
      },
    ],
  },
  {
    id: "choisir-plateforme",
    title: "Choisir sa plateforme",
    level: 2,
    intro:
      "Site codé, builder no-code ou plateforme existante : les options réelles et leurs arbitrages.",
    blocks: [
      {
        kind: "table",
        headers: ["Option", "Avantages", "Limites"],
        rows: [
          [
            "Site personnel (Webflow, Framer)",
            "Contrôle total du design, signale vos compétences UI",
            "Demande du temps de construction et de maintenance",
          ],
          [
            "Readymag, Cargo",
            "Mise en page éditoriale soignée, rapide à produire",
            "Moins flexible, templates parfois reconnaissables",
          ],
          [
            "Behance",
            "Audience intégrée, zéro maintenance",
            "Mise en page contrainte, vous êtes un profil parmi des millions",
          ],
          [
            "Notion / PDF",
            "Gratuit, contenu roi, facile à mettre à jour",
            "Peu mémorable visuellement ; le PDF vieillit vite",
          ],
        ],
      },
      {
        kind: "text",
        text: "Règle pratique : si vous postulez comme UI designer ou designer produit, un site personnel est attendu — c'est lui-même une preuve de vos compétences. Pour un poste UX research ou junior, le contenu prime et une page Notion soignée peut suffire.",
      },
    ],
  },
  {
    id: "selection-projets",
    title: "Sélectionner 3 à 5 projets",
    level: 2,
    intro:
      "Les critères pour choisir quoi montrer — et quoi laisser de côté.",
    blocks: [
      {
        kind: "list",
        items: [
          "Montrez des problèmes variés : un projet de refonte, un projet de zéro, un projet contraint (délais, tech, réglementation). La variété prouve l'adaptabilité.",
          "Privilégiez les projets où votre contribution est claire : si vous étiez un designer parmi dix, choisissez un périmètre que vous avez réellement porté.",
          "Un projet personnel ou fictif bien cadré vaut mieux qu'un projet pro où vous n'avez fait qu'exécuter. Le récit compte plus que le logo du client.",
          "Écartez les projets que vous ne pouvez pas expliquer : si vous ne savez plus pourquoi telle décision a été prise, le recruteur le remarquera aussi.",
          "Écartez les projets sous NDA strict que vous ne pouvez pas montrer : un projet flouté ou « confidentiel » sans visuel n'apporte rien.",
        ],
      },
      {
        kind: "fields",
        title: "Grille de sélection (noter chaque projet de 1 à 3)",
        fields: [
          {
            label: "Clarté du problème",
            value:
              "Le problème de départ est-il formulable en une phrase ? Un projet sans problème clair ne fait pas une bonne case study.",
          },
          {
            label: "Visibilité du processus",
            value:
              "Avez-vous des artefacts de recherche, d'idéation, d'itération ? Plus il y en a, plus le récit sera riche.",
          },
          {
            label: "Résultat mesurable",
            value:
              "Métriques, retours utilisateurs, mise en production : un résultat concret clôt le récit.",
          },
          {
            label: "Pertinence pour la cible",
            value:
              "Ce projet ressemble-t-il au travail du poste visé ? Adaptez la sélection à chaque candidature importante.",
          },
        ],
      },
    ],
  },
  {
    id: "structure-case-study",
    title: "Structure d'une case study",
    level: 2,
    intro:
      "Le plan type qui fonctionne : les sections indispensables, dans l'ordre.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Accroche : contexte et résultat",
            detail:
              "Deux ou trois phrases : le contexte (produit, utilisateurs), le problème, et le résultat obtenu. Le lecteur pressé doit tout comprendre ici.",
          },
          {
            title: "Votre rôle et le périmètre",
            detail:
              "Ce que vous avez fait concrètement, la taille de l'équipe, la durée, les contraintes. L'honnêteté sur le rôle vaut mieux qu'un rôle gonflé.",
          },
          {
            title: "Le problème",
            detail:
              "Pourquoi ce projet existait : données, retours utilisateurs, objectifs business. Un problème bien formulé justifie tout ce qui suit.",
          },
          {
            title: "La démarche",
            detail:
              "Recherche, idéation, itérations : montrez les étapes clés avec leurs artefacts. C'est le cœur de la case study.",
          },
          {
            title: "La solution",
            detail:
              "Les écrans finaux, annotés : expliquez les décisions importantes, pas chaque pixel.",
          },
          {
            title: "Le résultat",
            detail:
              "Métriques avant/après, retours utilisateurs, mise en production. Chiffres honnêtes, sources nommées quand c'est possible.",
          },
          {
            title: "Ce que vous en retenez",
            detail:
              "Une à trois leçons : ce que vous referiez différemment. Cette section signale la maturité plus que tout le reste.",
          },
        ],
      },
    ],
  },
  {
    id: "ecrire-contexte",
    title: "Écrire le contexte",
    level: 2,
    intro:
      "Poser le décor en quelques phrases : assez pour comprendre, pas assez pour s'ennuyer.",
    blocks: [
      {
        kind: "text",
        text: "Le contexte répond à trois questions : quel produit, pour qui, dans quelle situation. Trois phrases suffisent. Le lecteur n'a pas besoin de l'historique de l'entreprise, seulement de ce qui rend le problème compréhensible.",
      },
      {
        kind: "list",
        items: [
          "Produit : « Application mobile de réservation de salles de sport, 40 000 utilisateurs actifs. »",
          "Utilisateurs : « Des citadins de 25-40 ans qui réservent à la dernière minute. »",
          "Situation : « L'équipe produit de 6 personnes, refonte du tunnel de réservation en 8 semaines. »",
          "Évitez le jargon interne et les acronymes : le recruteur ne connaît pas votre entreprise.",
          "Si le projet est fictif ou un challenge, dites-le dès le contexte. L'honnêteté n'enlève rien à la qualité du travail.",
        ],
      },
    ],
  },
  {
    id: "montrer-processus",
    title: "Montrer le processus",
    level: 2,
    intro:
      "Le processus est ce qui distingue une case study d'une galerie : comment le rendre visible.",
    blocks: [
      {
        kind: "text",
        text: "« Montrez votre processus » ne signifie pas tout montrer. Sélectionnez 3 à 5 moments décisifs : une découverte de recherche qui a changé la direction, une alternative écartée et pourquoi, une itération après un test utilisateur. Chaque moment = un artefact + une phrase d'explication.",
      },
      {
        kind: "fields",
        title: "Les artefacts qui prouvent le processus",
        fields: [
          {
            label: "Recherche",
            value:
              "Extraits d'entretiens (anonymisés), synthèse d'insights, personas : une image de votre mur d'affinité vaut mieux qu'un paragraphe.",
          },
          {
            label: "Idéation",
            value:
              "Croquis, crazy 8, explorations écartées : montrez que vous avez considéré plusieurs directions avant de choisir.",
          },
          {
            label: "Itération",
            value:
              "Avant/après d'un écran entre deux versions, avec la raison du changement : la preuve que vous testez et ajustez.",
          },
          {
            label: "Décisions",
            value:
              "Pour chaque décision importante : l'option choisie, les options écartées, le critère de choix. C'est exactement ce qu'évalue un lead designer.",
          },
        ],
      },
    ],
  },
  {
    id: "resultats-metriques",
    title: "Résultats et métriques",
    level: 2,
    intro:
      "Clore chaque case study par un résultat concret — sans inventer de chiffres.",
    blocks: [
      {
        kind: "list",
        items: [
          "Métriques produit : taux de conversion, temps de complétion, taux d'erreur, NPS — toujours en avant/après quand c'est possible.",
          "Preuves qualitatives : verbatims d'utilisateurs (anonymisés), retours de l'équipe, adoption par les parties prenantes.",
          "Mise en production : « livré et utilisé par X utilisateurs » est un résultat en soi, même sans métrique spectaculaire.",
          "Pas de métrique ? Dites ce que vous mesureriez : « si je pouvais suivre une métrique, ce serait le taux d'abandon à l'étape 2 » montre que vous pensez en termes d'impact.",
          "Ne gonflez jamais les chiffres : un recruteur expérimenté repère les métriques invraisemblables, et la confiance perdue ne se regagne pas.",
        ],
      },
      {
        kind: "text",
        text: "Pour les projets personnels sans utilisateurs réels, le « résultat » peut être : ce que vous avez appris, les retours reçus lors de tests avec 5 utilisateurs, ou la comparaison avec votre point de départ.",
      },
    ],
  },
  {
    id: "storytelling-visuel",
    title: "Storytelling visuel",
    level: 2,
    intro:
      "Images, rythme et hiérarchie : la case study se lit d'abord avec les yeux.",
    blocks: [
      {
        kind: "list",
        items: [
          "Une image forte par section : le lecteur qui scrolle doit comprendre le récit rien qu'avec les visuels et les titres.",
          "Annotez les captures : flèches, numéros, légendes courtes qui expliquent ce qu'il faut regarder. Une capture non annotée est une capture ignorée.",
          "Montrez les écrans en contexte : mockups sobres d'appareils ou captures plein écran, jamais de visuels déformés ou pixelisés.",
          "Alternez les échelles : vue d'ensemble d'un parcours, puis zoom sur un détail décisif. Le rythme visuel maintient l'attention.",
          "Légendez tout : « Test utilisateur n°3 : l'utilisateur cherche le bouton pendant 40 secondes » vaut mieux qu'une image seule.",
        ],
      },
    ],
  },
  {
    id: "page-a-propos",
    title: "La page « À propos »",
    level: 2,
    intro:
      "La deuxième page la plus visitée : qui vous êtes, en 30 secondes de lecture.",
    blocks: [
      {
        kind: "list",
        items: [
          "Une photo (ou un portrait illustré) : les recruteurs mémorisent mieux un visage qu'un logo personnel.",
          "Deux paragraphes : votre parcours et votre spécialité actuelle. Écrivez à la première personne, simplement.",
          "Vos outils et compétences en liste courte : Figma, design system, tests utilisateurs — pas une barre de « 90 % Photoshop ».",
          "Un CV téléchargeable en PDF (une page) : certains recruteurs le demandent encore, ayez-le prêt.",
          "Contact simple : email visible, LinkedIn, localisation et disponibilité. Pas de formulaire de contact compliqué.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 2,
    intro:
      "Les défauts qui reviennent dans la plupart des portfolios juniors — et comment les corriger.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Pourquoi c'est un problème", "Correction"],
        rows: [
          [
            "Trop de projets",
            "Douze projets superficiels signalent l'incapacité à prioriser",
            "Gardez 3 à 5 projets, archivez le reste",
          ],
          [
            "Que des écrans finaux",
            "Impossible d'évaluer votre raisonnement",
            "Ajoutez recherche, itérations, décisions pour chaque projet",
          ],
          [
            "Mur de texte",
            "Personne ne lit 2000 mots d'affilée",
            "Titres clairs, paragraphes courts, une idée par section",
          ],
          [
            "Rôle flou",
            "« J'ai designé l'app » dans une équipe de 8 n'est pas crédible",
            "Précisez votre périmètre exact et vos livrables",
          ],
          [
            "Templates reconnaissables",
            "Un site au template inchangé suggère un manque de soin",
            "Personnalisez : typographie, rythme, détails propres",
          ],
          [
            "Mot de passe partout",
            "Chaque friction fait perdre des lecteurs",
            "Protégez uniquement ce qui est vraiment sous NDA",
          ],
        ],
      },
    ],
  },
  {
    id: "preparation-entretien",
    title: "Préparer l'entretien portfolio",
    level: 2,
    intro:
      "Le portfolio décroche l'entretien ; la présentation orale décroche le poste.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Préparez un walkthrough de 10 minutes",
            detail:
              "Un seul projet raconté en 10 minutes : problème, démarche, résultat. Chronométrez-vous. C'est le format le plus demandé en entretien.",
          },
          {
            title: "Anticipez les questions",
            detail:
              "« Pourquoi ce choix ? », « Que changeriez-vous ? », « Quel a été votre rôle exact ? » : préparez des réponses honnêtes, avec des exemples.",
          },
          {
            title: "Préparez vos propres questions",
            detail:
              "Processus design de l'équipe, maturité UX, collaboration avec les devs : vos questions montrent votre niveau d'exigence.",
          },
          {
            title: "Testez à voix haute",
            detail:
              "Racontez votre case study à quelqu'un (ou enregistrez-vous). Les hésitations révèlent les parties du récit à retravailler.",
          },
        ],
      },
    ],
  },
  {
    id: "plan-30-jours",
    title: "Plan de construction en 30 jours",
    level: 2,
    intro:
      "Un calendrier réaliste pour passer de zéro à un portfolio présentable.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Jours 1-5 : inventaire",
            detail:
              "Listez vos projets, rassemblez les artefacts, notez les métriques et souvenirs de décisions. Choisissez 3 à 5 projets avec la grille de sélection.",
          },
          {
            title: "Jours 6-15 : rédaction",
            detail:
              "Écrivez les case studies dans un document texte, une par une. Visez 600 à 900 mots par projet : assez pour le récit, pas assez pour noyer.",
          },
          {
            title: "Jours 16-22 : construction",
            detail:
              "Choisissez la plateforme, construisez l'accueil et une première case study complète. Validez le système visuel avant de dupliquer.",
          },
          {
            title: "Jours 23-27 : complétion",
            detail:
              "Ajoutez les autres projets, la page À propos, le CV PDF. Vérifiez sur mobile : la moitié des recruteurs liront sur téléphone.",
          },
          {
            title: "Jours 28-30 : relecture externe",
            detail:
              "Faites lire par deux personnes : un designer (fond) et un non-designer (clarté). Corrigez, puis publiez. Un portfolio publié imparfait vaut mieux qu'un portfolio parfait jamais publié.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "formats-portfolio",
    title: "Les formats de portfolio",
    level: 3,
    intro:
      "Il n'y a pas un portfolio idéal : il y a des formats adaptés à des objectifs.",
    blocks: [
      {
        kind: "fields",
        title: "Quatre formats courants",
        fields: [
          {
            label: "Case studies longues",
            value:
              "Le standard pour les postes produit : 600 à 1200 mots par projet, processus détaillé. Idéal pour UX/UI designer, product designer.",
          },
          {
            label: "Galerie curatée",
            value:
              "Visuels forts, textes courts : adapté aux postes très visuels (brand, visual design) où le craft parle de lui-même.",
          },
          {
            label: "Portfolio narratif",
            value:
              "Un fil conducteur entre les projets (votre thèse de design) : mémorable, mais demande un vrai travail d'écriture.",
          },
          {
            label: "Portfolio + blog / notes",
            value:
              "Des articles qui montrent votre réflexion : excellent pour les postes seniors et le personal branding long terme.",
          },
        ],
      },
      {
        kind: "text",
        text: "Adaptez le format au poste visé : un poste de design system valorisera la documentation et la rigueur, un poste de startup valorisera la vitesse et l'autonomie. Vous pouvez maintenir deux sélections de projets selon la cible.",
      },
    ],
  },
  {
    id: "anatomie-case-study",
    title: "Anatomie détaillée d'une case study",
    level: 3,
    intro:
      "Chaque section d'une case study, avec ce qu'elle doit contenir exactement.",
    blocks: [
      {
        kind: "diagram",
        title: "Le squelette complet",
        lines: [
          "1. ACCROCHE (titre + 3 phrases : contexte, problème, résultat)",
          "2. INFOS (rôle, durée, équipe, contraintes)",
          "3. PROBLÈME (données, pourquoi c'était important)",
          "4. RECHERCHE (méthodes, insights clés)",
          "5. IDÉATION (explorations, alternatives écartées)",
          "6. ITÉRATIONS (avant/après, raisons des changements)",
          "7. SOLUTION (écrans finaux annotés)",
          "8. RÉSULTAT (métriques, retours, mise en prod)",
          "9. APPRENTISSAGES (ce que vous referiez différemment)",
        ],
      },
      {
        kind: "text",
        text: "Toutes les sections ne sont pas obligatoires pour chaque projet : un projet court peut fusionner recherche et idéation. En revanche, problème, démarche et résultat sont non négociables — sans eux, ce n'est pas une case study.",
      },
    ],
  },
  {
    id: "titre-accroche",
    title: "Titres et accroches",
    level: 3,
    intro:
      "Le titre du projet est la première phrase lue : faites-en une promesse de récit.",
    blocks: [
      {
        kind: "list",
        items: [
          "Préférez le problème au livrable : « Réduire de moitié l'abandon du tunnel d'inscription » plutôt que « Refonte du formulaire ».",
          "L'accroche (sous-titre) résume en une phrase : pour qui, quel problème, quel résultat.",
          "Évitez les titres génériques : « Projet mobile », « Application iOS » ne donnent aucune envie de cliquer.",
          "Testez vos titres : montrez la liste des projets à quelqu'un pendant 5 secondes, demandez-lui sur lequel il cliquerait et pourquoi.",
        ],
      },
    ],
  },
  {
    id: "problem-statement",
    title: "Formuler le problème",
    level: 3,
    intro:
      "Un problème bien formulé porte toute la case study : techniques de formulation.",
    blocks: [
      {
        kind: "text",
        text: "La formule « Comment pourrions-nous… » (How Might We) reste un excellent cadre : elle nomme l'utilisateur, le besoin et la contrainte sans présupposer la solution. Exemple : « Comment pourrions-nous aider les nouveaux utilisateurs à réserver en moins de 2 minutes, sans appeler le support ? »",
      },
      {
        kind: "list",
        items: [
          "Appuyez le problème sur des faits : données d'usage, verbatims, taux d'abandon. Un problème sans preuve est une opinion.",
          "Distinguez le symptôme de la cause : « les utilisateurs n'utilisent pas le filtre » est un symptôme ; « ils ne comprennent pas le vocabulaire du filtre » est le problème.",
          "Quantifiez quand c'est possible : « 68 % d'abandon à l'étape 3 » donne du poids à tout ce qui suit.",
          "Montrez pourquoi c'était important : impact business, nombre d'utilisateurs concernés, coût du problème.",
        ],
      },
    ],
  },
  {
    id: "role-equipe",
    title: "Clarifier son rôle",
    level: 3,
    intro:
      "L'honnêteté sur votre contribution réelle est un signal de maturité.",
    blocks: [
      {
        kind: "list",
        items: [
          "Nommez l'équipe : « équipe de 5 : 2 designers, 1 PM, 2 devs » situe votre travail sans l'exagérer.",
          "Distinguez ce que vous avez fait de ce que l'équipe a fait : « j'ai mené les 8 entretiens et produit les wireframes ; la direction artistique a été co-conçue avec la lead ». ",
          "Si vous avez tout fait seul (freelance, projet perso), dites-le : l'autonomie complète est une qualité, pas une faiblesse.",
          "Évitez le « nous » flou quand c'est votre portfolio : le lecteur veut savoir ce que VOUS savez faire.",
        ],
      },
    ],
  },
  {
    id: "recherche-montree",
    title: "Montrer la recherche",
    level: 3,
    intro:
      "Comment intégrer la recherche utilisateur dans le récit sans noyer le lecteur.",
    blocks: [
      {
        kind: "list",
        items: [
          "Synthétisez en insights actionnables : 3 à 5 constats clés, chacun en une phrase, chacun lié à une décision design.",
          "Montrez la méthode en une ligne : « 8 entretiens semi-directifs avec des utilisateurs réguliers » suffit ; le protocole complet n'a pas sa place ici.",
          "Utilisez des verbatims courts et anonymisés : une citation réelle (« je ne savais pas où cliquer, alors j'ai appelé ») frappe plus qu'un résumé.",
          "Liez chaque insight à son impact : « constat → décision » est la structure la plus convaincante (« les utilisateurs confondaient les deux boutons → nous avons différencié les actions par la couleur et le libellé »).",
          "Si la recherche a contredit votre hypothèse initiale, racontez-le : c'est la preuve que vous savez écouter les données plutôt que votre ego.",
        ],
      },
    ],
  },
  {
    id: "ideation-decisions",
    title: "Idéation et décisions",
    level: 3,
    intro:
      "Montrer que vous avez exploré avant de choisir — et pourquoi vous avez choisi.",
    blocks: [
      {
        kind: "list",
        items: [
          "Montrez 2 à 3 directions explorées, même sous forme de croquis : l'éventail prouve que la solution finale est un choix, pas un hasard.",
          "Pour chaque alternative écartée, une phrase de raison : « écarté car il ajoutait une étape au parcours principal ».",
          "Documentez les arbitrages : temps, technique, business. « La solution idéale demandait 3 mois de dev ; nous avons livré une version à 80 % de l'impact en 3 semaines » montre du pragmatisme.",
          "Nommez les contraintes qui ont pesé : design system existant, délais, accessibilité. Les contraintes rendent les décisions compréhensibles.",
        ],
      },
    ],
  },
  {
    id: "iterations-montrees",
    title: "Montrer les itérations",
    level: 3,
    intro:
      "L'avant/après est la figure la plus convaincante d'une case study.",
    blocks: [
      {
        kind: "text",
        text: "Présentez les versions successives d'un même écran côte à côte, avec pour chaque changement la cause (retour de test, contrainte technique, donnée) et l'effet attendu. Deux ou trois itérations bien expliquées valent mieux que dix captures sans commentaire.",
      },
      {
        kind: "list",
        items: [
          "Structure : version 1 → constat → version 2 → constat → version finale. Le lecteur suit votre raisonnement.",
          "N'ayez pas peur de montrer une première version médiocre : le contraste avec la version finale valorise votre progression.",
          "Incluez au moins une itération issue d'un test utilisateur : c'est la preuve que vous confrontez vos idées au réel.",
        ],
      },
    ],
  },
  {
    id: "wireframes-vers-final",
    title: "Du wireframe au final",
    level: 3,
    intro:
      "Raconter la montée en fidélité : la progression qui montre la rigueur.",
    blocks: [
      {
        kind: "text",
        text: "Une séquence wireframe → maquette → prototype animé raconte en images votre méthode : structure d'abord, esthétique ensuite, interactions enfin. Présentez-la sur un écran clé du parcours, pas sur tous les écrans.",
      },
    ],
  },
  {
    id: "design-system-usage",
    title: "Design system et cohérence",
    level: 3,
    intro:
      "Si vous avez travaillé avec ou sur un design system, montrez-le.",
    blocks: [
      {
        kind: "list",
        items: [
          "Montrez les composants utilisés ou créés : un bouton, une carte, un formulaire — avec leurs états.",
          "Expliquez votre contribution au système : nouveau composant, documentation, tokens. C'est un signal fort pour les postes seniors.",
          "Si le projet n'avait pas de design system, montrez comment vous avez maintenu la cohérence : styles partagés, règles d'espacement.",
        ],
      },
    ],
  },
  {
    id: "metriques-honnetes",
    title: "Des métriques honnêtes",
    level: 3,
    intro:
      "Comment parler d'impact sans données parfaites — et sans les inventer.",
    blocks: [
      {
        kind: "list",
        items: [
          "Préférez les métriques modestes et vraies aux chiffres spectaculaires : « temps de complétion passé de 4 min 30 à 2 min 10 sur 12 tests » est crédible.",
          "Précisez toujours l'échantillon et la méthode : « 5 tests utilisateurs », « données analytics sur 3 mois ».",
          "Distinguez corrélation et causalité : « après la refonte, l'abandon a baissé de 12 % » est honnête ; « grâce à la refonte » sans preuve ne l'est pas.",
          "Les métriques proxy sont acceptables si nommées comme telles : taux de clics, temps passé, retours qualitatifs.",
          "Ne présentez jamais de pourcentage sans base : « +200 % » sur 3 utilisateurs est malhonnête.",
        ],
      },
    ],
  },
  {
    id: "avant-apres",
    title: "Les refontes : avant / après",
    level: 3,
    intro:
      "Le format avant/après est puissant — à condition d'expliquer, pas juste de montrer.",
    blocks: [
      {
        kind: "list",
        items: [
          "Ne juxtaposez jamais sans commenter : chaque différence doit être expliquée (problème identifié → changement → effet attendu).",
          "Critiquez l'« avant » avec respect : c'est le travail de quelqu'un, peut-être de votre futur collègue. Parlez du contexte, pas de la qualité.",
          "Montrez que vous comprenez les contraintes de l'ancienne version : délais, legacy, décisions business de l'époque.",
          "Une refonte conceptuelle (projet perso) doit être signalée comme telle, avec le brief que vous vous êtes donné.",
        ],
      },
    ],
  },
  {
    id: "projets-fictifs",
    title: "Projets fictifs et challenges",
    level: 3,
    intro:
      "Sans expérience pro, les briefs fictifs sont votre matière première : rendez-les crédibles.",
    blocks: [
      {
        kind: "list",
        items: [
          "Donnez-vous un vrai brief écrit : contexte, utilisateurs, contraintes, livrables, délais. Un projet fictif avec un brief sérieux se lit comme un vrai projet.",
          "Ajoutez de la recherche même fictive : 5 tests utilisateurs sur votre prototype valent mieux qu'aucune confrontation au réel.",
          "Les challenges quotidiens (Daily UI) seuls ne font pas un portfolio : isolez 2 ou 3 exercices et développez-les en mini case studies.",
          "Signalez clairement le caractère fictif dès le contexte : la transparence renforce la confiance au lieu de la fragiliser.",
        ],
      },
    ],
  },
  {
    id: "side-projects",
    title: "Side projects et initiatives",
    level: 3,
    intro:
      "Les projets personnels révèlent votre curiosité : sélectionnez-les avec soin.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un side project abouti (publié, utilisé, documenté) vaut mieux que trois esquisses abandonnées.",
          "Montrez l'initiative : identifier un problème réel, le résoudre sans qu'on vous le demande, c'est exactement ce qu'attendent les startups.",
          "Les contributions open source design (icônes, design systems communautaires) sont des preuves de collaboration.",
          "Limitez à un ou deux side projects dans la sélection : le portfolio reste centré sur votre capacité à résoudre des problèmes de produit.",
        ],
      },
    ],
  },
  {
    id: "prototypes-animes",
    title: "Prototypes et motion",
    level: 3,
    intro:
      "Un prototype cliquable intégré à la case study change la perception du projet.",
    blocks: [
      {
        kind: "list",
        items: [
          "Intégrez un prototype Figma en iframe quand la plateforme le permet : le lecteur teste au lieu d'imaginer.",
          "Les micro-interactions en vidéo courte (5-10 secondes) montrent le soin apporté aux détails.",
          "Ne montrez que les interactions qui servent le récit : une transition clé, pas tout le prototype.",
          "Pensez au mobile : la plupart des lecteurs sont sur téléphone, vérifiez que les vidéos et iframes s'y affichent.",
        ],
      },
    ],
  },
  {
    id: "redaction-concise",
    title: "Rédaction concise",
    level: 3,
    intro:
      "Écrire pour être lu : les règles de la rédaction de case study.",
    blocks: [
      {
        kind: "list",
        items: [
          "Une idée par paragraphe, trois phrases maximum par paragraphe.",
          "Voix active et première personne : « j'ai testé », « nous avons décidé ». Le passif dilue la responsabilité.",
          "Supprimez les adverbes d'intensité (« vraiment », « très ») : les faits portent le propos.",
          "Relisez en cherchant le jargon : chaque terme technique doit être compris par un recruteur non designer.",
          "Faites relire par un non-designer : s'il comprend le problème et la solution, votre texte est clair.",
        ],
      },
    ],
  },
  {
    id: "annotations-captions",
    title: "Annotations et légendes",
    level: 3,
    intro:
      "Le texte qui accompagne les images fait la moitié du travail de conviction.",
    blocks: [
      {
        kind: "list",
        items: [
          "Chaque image porte une légende qui dit ce qu'il faut y voir : « Étape 2 : le récapitulatif avant paiement, ajouté après les tests ». ",
          "Numérotez les annotations sur les captures complexes et détaillez en dessous : le lecteur suit votre regard.",
          "Les légendes sont lues même par ceux qui sautent le texte : elles doivent raconter le projet à elles seules.",
          "Évitez les légendes décoratives (« Maquette finale ») : dites ce que la maquette prouve.",
        ],
      },
    ],
  },
  {
    id: "storytelling-narratif",
    title: "Le récit : tension et résolution",
    level: 3,
    intro:
      "Une bonne case study est une histoire : problème, obstacle, résolution.",
    blocks: [
      {
        kind: "text",
        text: "La structure narrative la plus efficace : une situation initiale, un problème qui résiste (première solution qui échoue, contrainte inattendue), puis la résolution. Raconter un échec intermédiaire rend le succès final crédible et montre votre ténacité.",
      },
      {
        kind: "list",
        items: [
          "Ouvrez sur le problème, pas sur vous : le lecteur s'accroche à un enjeu, pas à une biographie.",
          "Introduisez un moment de doute : « les premiers tests ont invalidé notre approche » crée de la tension narrative.",
          "Clôturez sur l'impact et l'apprentissage : le lecteur doit repartir avec une image claire de votre valeur.",
        ],
      },
    ],
  },
  {
    id: "coherence-visuelle",
    title: "Cohérence visuelle du site",
    level: 3,
    intro:
      "Votre site est lui-même un projet de design : traitez-le comme tel.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un système typographique unique sur tout le site : mêmes tailles, mêmes graisses, mêmes espacements.",
          "Une grille constante pour les case studies : le lecteur retrouve ses repères d'un projet à l'autre.",
          "Des vignettes de projets au style homogène : même cadrage, même traitement, pour une page d'accueil qui fait système.",
          "Le site doit être impeccable sur mobile : testez chaque page sur téléphone avant publication.",
        ],
      },
    ],
  },
  {
    id: "accessibilite-site",
    title: "Accessibilité du portfolio",
    level: 3,
    intro:
      "Un portfolio inaccessible contredit tout discours sur l'UX.",
    blocks: [
      {
        kind: "list",
        items: [
          "Textes alternatifs sur les images clés : un lecteur d'écran doit comprendre le récit sans les visuels.",
          "Contrastes vérifiés (4.5:1 minimum pour le texte) sur tout le site, y compris les légendes.",
          "Navigation au clavier fonctionnelle : tabulation logique, focus visible.",
          "Ne comptez pas uniquement sur la couleur pour transmettre l'information dans vos schémas.",
        ],
      },
    ],
  },
  {
    id: "performance-seo",
    title: "Performance et référencement",
    level: 3,
    intro:
      "Un portfolio lent ou invisible sur Google perd des opportunités.",
    blocks: [
      {
        kind: "list",
        items: [
          "Compressez les images (WebP, dimensions adaptées) : une page qui met 10 secondes à charger fait fuir.",
          "Un titre de page et une meta description par projet : « Refonte du tunnel d'inscription — Portfolio de [Nom] ».",
          "Votre nom + « portfolio » + spécialité doivent mener à votre site : vérifiez sur Google après publication.",
          "Évitez le 100 % image-texte : le texte réel est indexé et sélectionnable, le texte en image ne l'est pas.",
        ],
      },
    ],
  },
  {
    id: "cv-une-page",
    title: "Le CV une page",
    level: 3,
    intro:
      "Le complément du portfolio : dense, lisible, sans fioritures.",
    blocks: [
      {
        kind: "list",
        items: [
          "Une page, pas plus : expériences avec résultats (pas seulement des tâches), compétences, formation.",
          "Chaque expérience = 2 à 3 puces avec un verbe d'action et, si possible, un résultat.",
          "Pas de barres de compétences ni de notes sur 5 : listez les compétences par niveau de maîtrise en mots (« courant », « notions »).",
          "PDF propre, nom de fichier explicite : `prenom-nom-cv.pdf`, jamais `CV_final_v3.pdf`.",
        ],
      },
    ],
  },
  {
    id: "linkedin",
    title: "LinkedIn en relais",
    level: 3,
    intro:
      "Votre LinkedIn est souvent vu avant votre portfolio : alignez les deux.",
    blocks: [
      {
        kind: "list",
        items: [
          "Titre précis : « Product Designer — Fintech & Design Systems » plutôt que « Designer créatif passionné ».",
          "Section « Projets » ou posts qui renvoient vers vos case studies : chaque projet mérite un post de lancement.",
          "Recommandations : demandez-en à d'anciens collègues ou managers, elles pèsent plus que les compétences validées.",
          "Cohérence : mêmes intitulés, mêmes dates, mêmes projets que sur le portfolio.",
        ],
      },
    ],
  },
  {
    id: "presentation-orale",
    title: "La présentation orale",
    level: 3,
    intro:
      "Raconter un projet en 10 minutes à voix haute : la compétence qui fait la différence en entretien.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Structure en 3 actes",
            detail:
              "2 minutes de contexte et problème, 6 minutes de démarche (avec les moments clés), 2 minutes de résultat et apprentissages.",
          },
          {
            title: "Préparez un support léger",
            detail:
              "Votre case study suffit ; ajoutez au besoin 3 slides : problème, tournant, résultat. Pas de slideware.",
          },
          {
            title: "Racontez, ne lisez pas",
            detail:
              "Connaissez votre récit par cœur dans les grandes lignes, mais parlez naturellement. Les notes sont autorisées, la lecture ne l'est pas.",
          },
          {
            title: "Gérez les interruptions",
            detail:
              "Les questions en cours de présentation sont bon signe : répondez brièvement et reprenez le fil. Prévoyez 5 minutes de questions à la fin.",
          },
        ],
      },
    ],
  },
  {
    id: "questions-recruteurs",
    title: "Questions fréquentes des recruteurs",
    level: 3,
    intro:
      "Ce qu'on vous demandera vraiment sur vos projets — et l'esprit des bonnes réponses.",
    blocks: [
      {
        kind: "fields",
        title: "Les classiques",
        fields: [
          {
            label: "« Quel a été votre rôle exact ? »",
            value:
              "Réponse attendue : un périmètre précis et honnête. Préparez une phrase par projet avant l'entretien.",
          },
          {
            label: "« Pourquoi ce choix plutôt qu'un autre ? »",
            value:
              "Montrez le raisonnement : options considérées, critères, contraintes. « C'était le plus joli » n'est jamais une réponse.",
          },
          {
            label: "« Que feriez-vous différemment ? »",
            value:
              "Une vraie leçon, pas une pirouette. Cette question teste votre capacité d'autocritique.",
          },
          {
            label: "« Comment avez-vous géré un désaccord ? »",
            value:
              "Un exemple concret : désaccord avec un PM ou un dev, comment vous l'avez résolu, ce que ça a changé.",
          },
          {
            label: "« Comment mesurez-vous le succès ? »",
            value:
              "Les métriques que vous suivriez (ou avez suivies) : montrez que vous pensez impact, pas seulement écrans.",
          },
        ],
      },
    ],
  },
  {
    id: "design-challenge",
    title: "Les design challenges",
    level: 3,
    intro:
      "L'exercice à domicile ou en live : comment l'aborder sans y passer vos nuits.",
    blocks: [
      {
        kind: "list",
        items: [
          "Cadrez le temps : un take-home ne devrait pas dépasser 3 à 4 heures. Au-delà, c'est du travail gratuit déguisé.",
          "Montrez le processus, pas seulement le résultat : le livrable inclut vos notes, hypothèses et questions.",
          "Posez des questions avant de commencer : périmètre, utilisateurs cibles, contraintes. Un bon designer clarifie avant de produire.",
          "En live (whiteboard), pensez à voix haute : l'évaluateur note votre raisonnement, pas la beauté du dessin.",
          "Ne réutilisez pas un challenge d'entreprise sans autorisation ; en revanche, vous pouvez en parler en termes généraux.",
        ],
      },
    ],
  },
  {
    id: "feedback-avant-publication",
    title: "Faire relire avant de publier",
    level: 3,
    intro:
      "Le regard extérieur attrape ce que vous ne voyez plus.",
    blocks: [
      {
        kind: "list",
        items: [
          "Deux relecteurs minimum : un designer (pertinence du fond) et un non-designer (clarté du récit).",
          "Demandez des retours précis : « comprends-tu le problème après 30 secondes ? », « quelle section t'ennuie ? ».",
          "Testez la navigation : demandez à quelqu'un de trouver votre email et votre CV sans aide.",
          "Vérifiez sur mobile et sur un écran inconnu : les défauts invisibles sur votre écran sautent aux yeux ailleurs.",
          "Relisez les textes à voix haute : les phrases bancales s'entendent mieux qu'elles ne se voient.",
        ],
      },
    ],
  },
  {
    id: "mise-a-jour",
    title: "Maintenir son portfolio à jour",
    level: 3,
    intro:
      "Un portfolio est un document vivant : organisez sa maintenance.",
    blocks: [
      {
        kind: "list",
        items: [
          "Ajoutez chaque projet terminé tant qu'il est frais : dans 6 mois, vous aurez oublié les décisions et les chiffres.",
          "Retirez le projet le plus faible à chaque ajout : la qualité moyenne du portfolio ne doit jamais baisser.",
          "Mettez à jour les résultats quand ils arrivent : une métrique post-lancement enrichit une case study existante.",
          "Archivez plutôt que supprimez : gardez une trace de vos anciens projets, ils montrent votre progression.",
          "Planifiez une revue semestrielle : 1 heure pour vérifier liens, images, textes et actualité des projets.",
        ],
      },
    ],
  },
  {
    id: "erreurs-avancees",
    title: "Erreurs avancées",
    level: 3,
    intro:
      "Les pièges qui subsistent même quand les bases sont maîtrisées.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Pourquoi c'est un problème", "Correction"],
        rows: [
          [
            "Tout montrer au même niveau de détail",
            "Le lecteur ne sait pas où regarder en premier",
            "Un projet héros développé, les autres en format court",
          ],
          [
            "Jargon d'agence",
            "« Approche holistique centrée utilisateur » ne veut rien dire",
            "Des phrases simples, des faits, des décisions nommées",
          ],
          [
            "Aucune trace d'échec",
            "Un parcours sans accroc n'est pas crédible",
            "Racontez au moins une impasse et ce qu'elle vous a appris",
          ],
          [
            "Portfolio générique pour tous les postes",
            "Le recruteur ne se projette pas",
            "Réordonnez et adaptez la sélection selon la cible",
          ],
          [
            "Négliger le « après »",
            "Le projet semble abandonné à la livraison",
            "Ajoutez mise en production, métriques, apprentissages",
          ],
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro:
      "S'inspirer des meilleurs portfolios et apprendre à raconter son travail.",
    blocks: [
      {
        kind: "fields",
        title: "À consulter",
        fields: [
          {
            label: "Bestfolios (bestfolios.com)",
            value:
              "Galerie curatée des meilleurs portfolios de designers produit : la référence pour voir ce que « bon » veut dire.",
          },
          {
            label: "NN/g — UX Portfolios (nngroup.com)",
            value:
              "Les recommandations du Nielsen Norman Group sur le contenu et la structure des portfolios UX.",
          },
          {
            label: "Articulating Design Decisions — Tom Greever",
            value:
              "Le livre de référence pour justifier ses choix design face aux parties prenantes — directement applicable aux case studies.",
          },
          {
            label: "Behance, Dribbble",
            value:
              "Pour l'inspiration visuelle et la visibilité ; utiles en complément d'un site personnel, pas en remplacement.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : réécrivez la case study d'un de vos projets en suivant la structure de cette page, puis comparez avec un portfolio de Bestfolios.",
          "Communauté : les critiques de portfolio (design Twitter/X, communautés Discord, ADPList) offrent des retours gratuits et directs.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Le portfolio n'est jamais fini : les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Approfondir les design systems (`design-system`) : documenter un système dans votre portfolio impressionne les équipes produit.",
          "Travailler le motion (`motion-design`) : des prototypes animés rendent vos case studies mémorables.",
          "Soigner l'accessibilité (`accessibilite-design`) : un portfolio lui-même accessible est une preuve par l'exemple.",
          "Revenir à la roadmap : valider Portfolio et entretenir le site à chaque nouveau projet.",
        ],
      },
    ],
  },
];

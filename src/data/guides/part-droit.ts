import type { SkillGuide } from "../skill-guides";

/**
 * Guides pédagogiques — droit des affaires.
 *
 * Conventions suivies :
 * - `prerequisiteNotes` : clés = ids EXACTS du tableau `prerequisites` du skill.
 * - `conceptDetails[].name` : reprend au plus proche le tableau `concepts` du skill.
 * - `howItWorks` : la démarche juridique en étapes (faits → qualification →
 *   règle → application → conclusion), pas une métaphore technique.
 * - Ton : documentation premium, concret, sans marketing. Français.
 */
export const GUIDES_DROIT: Record<string, SkillGuide> = {
  // ---------------------------------------------------------- intro-droit
  "intro-droit": {
    definition:
      "Le droit est l'ensemble des règles qui organisent la vie en société et dont le respect est garanti par la contrainte publique. L'introduction au droit en présente les sources, les branches et les institutions : le cadre dans lequel tout raisonnement juridique s'inscrit.",
    whyLearn:
      "On ne raisonne pas en juriste sans connaître l'architecture du droit. La hiérarchie des normes explique pourquoi un décret ne peut pas contredire une loi, et la distinction entre droit public et droit privé oriente toute recherche. C'est le plan du bâtiment avant d'entrer dans les pièces.",
    conceptDetails: [
      {
        name: "Hiérarchie des normes",
        definition:
          "Les règles de droit sont classées par rang : Constitution, traités, lois, règlements. Une norme inférieure ne peut pas contredire une norme supérieure.",
      },
      {
        name: "Branches du droit",
        definition:
          "Le droit se divise en branches (civil, commercial, pénal, administratif…) : chacune a ses règles, ses juridictions et sa logique propre.",
      },
      {
        name: "Institutions",
        definition:
          "Parlement, gouvernement, juridictions, autorités administratives : les organes qui produisent, appliquent et contrôlent le droit.",
      },
      {
        name: "Sources du droit",
        definition:
          "La loi, la jurisprudence, la coutume et la doctrine : les origines d'où naissent les règles juridiques.",
      },
      {
        name: "Personnalité juridique",
        definition:
          "L'aptitude à être titulaire de droits et d'obligations. Les sociétés en sont dotées : c'est ce qui permet à une entreprise d'agir en justice ou de signer un contrat.",
      },
    ],
    howItWorksTitle: "Lire une règle de droit",
    howItWorks: ["SOURCE", "HIÉRARCHIE", "DOMAINE", "INTERPRÉTATION", "APPLICATION"],
    example: {
      title: "Trouver la règle applicable",
      steps: [
        "Un litige oppose deux entreprises sur une livraison",
        "Identifier la branche : droit commercial",
        "Chercher la règle dans le Code de commerce",
        "Vérifier qu'aucune norme supérieure ne la contredit",
        "Appliquer la règle aux faits du litige",
      ],
    },
    projectsDetailed: [
      {
        title: "Cartographie des juridictions",
        flow: "Juridictions → Compétences → Voies de recours → Schéma de synthèse",
      },
      {
        title: "Fiche de synthèse d'une branche",
        flow: "Branche choisie → Sources → Principes directeurs → Fiche structurée",
      },
    ],
  },

  // ---------------------------------------------------------- methodologie
  methodologie: {
    definition:
      "La méthodologie juridique est l'ensemble des techniques de raisonnement et de rédaction propres au droit : cas pratique, dissertation, commentaire d'arrêt. Elle transforme une connaissance des règles en capacité à résoudre un problème de droit.",
    whyLearn:
      "En droit, la méthode est la moitié de la compétence. Deux juristes connaissant les mêmes textes n'obtiennent pas le même résultat : celui qui qualifie les faits avec rigueur et applique la règle pas à pas convainc. La méthodologie s'apprend tôt et sert partout, des examens aux dossiers clients.",
    conceptDetails: [
      {
        name: "Syllogisme juridique",
        definition:
          "Le raisonnement de base : la règle de droit est la majeure, les faits sont la mineure, la solution est la conclusion. Tout cas pratique s'y ramène.",
      },
      {
        name: "Cas pratique",
        definition:
          "Exercice consistant à résoudre une situation de fait en qualifiant juridiquement les faits, en citant les règles applicables et en concluant.",
      },
      {
        name: "Dissertation",
        definition:
          "Exercice de réflexion structurée (problématique, plan en deux parties) qui teste la compréhension d'une notion et l'argumentation.",
      },
      {
        name: "Commentaire d'arrêt",
        definition:
          "Analyse méthodique d'une décision de justice : faits, procédure, question de droit, solution, portée critique.",
      },
      {
        name: "Recherche documentaire",
        definition:
          "Savoir trouver une règle à jour (Légifrance), une jurisprudence pertinente et la doctrine : la base de tout travail sérieux.",
      },
    ],
    howItWorksTitle: "Résoudre un cas pratique",
    howItWorks: ["FAITS", "QUALIFICATION", "RÈGLE APPLICABLE", "APPLICATION", "CONCLUSION"],
    example: {
      title: "Un cas pratique corrigé",
      steps: [
        "Lire l'énoncé et lister les faits pertinents",
        "Qualifier : contrat de vente, inexécution de l'obligation de livrer",
        "Citer l'article du Code civil applicable",
        "Appliquer la règle aux faits du cas",
        "Conclure sur la solution et les recours possibles",
      ],
    },
    projectsDetailed: [
      {
        title: "Cas pratique corrigé",
        flow: "Énoncé → Qualification → Règles → Application → Conclusion rédigée",
      },
      {
        title: "Fiche d'arrêt structurée",
        flow: "Arrêt → Faits → Question de droit → Solution → Portée",
      },
    ],
  },

  // ------------------------------------------------------------ droit-civil
  "droit-civil": {
    definition:
      "Le droit civil est la branche du droit privé qui régit les rapports entre les personnes : obligations, contrats, responsabilité, biens. C'est le socle sur lequel reposent le droit des affaires, le droit du travail et bien d'autres matières.",
    whyLearn:
      "Tout le droit des affaires est du droit civil appliqué : un contrat commercial reste un contrat, une société reste une personne morale. Maîtriser la théorie des obligations et la responsabilité civile, c'est disposer de la grammaire qui permet de lire toutes les autres matières.",
    prerequisiteNotes: {
      "intro-droit":
        "Savoir situer le droit civil parmi les branches du droit et lire la hiérarchie des normes.",
    },
    conceptDetails: [
      {
        name: "Théorie des obligations",
        definition:
          "L'obligation est le lien juridique entre deux personnes en vertu duquel l'une doit quelque chose à l'autre. Tout le droit des contrats en découle.",
      },
      {
        name: "Responsabilité civile",
        definition:
          "L'obligation de réparer le dommage causé à autrui, qu'elle naisse d'un contrat inexécuté ou d'un fait dommageable. Trois conditions : fait générateur, préjudice, lien de causalité.",
      },
      {
        name: "Contrats spéciaux",
        definition:
          "Les régimes particuliers des contrats usuels : vente, bail, entreprise, mandat. Chacun a ses règles propres au-delà du droit commun.",
      },
      {
        name: "Biens",
        definition:
          "La distinction entre meubles et immeubles, la propriété et ses démembrements : le cadre juridique de la richesse et de sa transmission.",
      },
      {
        name: "Prescription",
        definition:
          "Le délai au-delà duquel une action en justice n'est plus recevable. En matière civile, il est en principe de cinq ans.",
      },
    ],
    howItWorksTitle: "Engager une responsabilité",
    howItWorks: ["FAIT GÉNÉRATEUR", "PRÉJUDICE", "LIEN DE CAUSALITÉ", "RÉGIME APPLICABLE", "RÉPARATION"],
    example: {
      title: "Un fournisseur livre en retard",
      steps: [
        "Contrat de fourniture signé entre deux sociétés",
        "Livraison avec trois semaines de retard",
        "Préjudice : arrêt de la chaîne de production du client",
        "Mise en demeure restée sans effet, puis assignation",
        "Dommages-intérêts pour inexécution contractuelle",
      ],
    },
    projectsDetailed: [
      {
        title: "Résolution de cas complexes",
        flow: "Cas multifactoriel → Qualifications → Régimes → Solution argumentée",
      },
      {
        title: "Synthèse de la réforme des obligations",
        flow: "Ordonnance de 2016 → Apports majeurs → Jurisprudence → Fiche de synthèse",
      },
    ],
  },

  // --------------------------------------------------------- droit-contrats
  "droit-contrats": {
    definition:
      "Le droit des contrats d'affaires encadre la formation, l'exécution et la rupture des accords entre entreprises : négociation, clauses, distribution, contentieux. C'est la matière quotidienne du juriste d'entreprise.",
    whyLearn:
      "L'entreprise vit de contrats : achats, ventes, distribution, prestations. Un contrat mal rédigé coûte des litiges ; une clause bien négociée protège la marge. Savoir rédiger et relire un contrat, c'est sécuriser l'activité au quotidien.",
    prerequisiteNotes: {
      "droit-civil":
        "Maîtriser la théorie générale des obligations : formation, validité et effets du contrat.",
    },
    conceptDetails: [
      {
        name: "Négociation précontractuelle",
        definition:
          "La phase d'avant-contrat : pourparlers, lettres d'intention, devoir d'information. Les fautes commises pendant la négociation engagent déjà la responsabilité.",
      },
      {
        name: "Clauses sensibles",
        definition:
          "Les stipulations qui font gagner ou perdre un litige : résiliation, pénalités, limitation de responsabilité, force majeure, droit applicable.",
      },
      {
        name: "Distribution",
        definition:
          "Les contrats qui organisent la revente : distribution sélective, exclusive, franchise. Un régime encadré par le droit de la concurrence.",
      },
      {
        name: "Rupture",
        definition:
          "La fin du contrat : résiliation, résolution, rupture brutale des relations commerciales établies. Chaque voie a ses conditions et ses risques.",
      },
      {
        name: "Contentieux contractuel",
        definition:
          "L'exécution forcée, la résolution judiciaire et les dommages-intérêts : ce que le juge peut ordonner quand le contrat déraille.",
      },
    ],
    howItWorksTitle: "Sécuriser un contrat commercial",
    howItWorks: ["BESOINS", "NÉGOCIATION", "RÉDACTION", "EXÉCUTION", "RUPTURE"],
    example: {
      title: "Un contrat de distribution",
      steps: [
        "Un fabricant veut distribuer via un revendeur",
        "Négociation : territoire, exclusivité, objectifs de vente",
        "Rédaction des clauses sensibles (résiliation, non-concurrence)",
        "Signature puis suivi de l'exécution",
        "Rupture encadrée en fin de contrat, sans brutalité",
      ],
    },
    projectsDetailed: [
      {
        title: "Rédaction d'un contrat de distribution",
        flow: "Brief commercial → Clauses → Rédaction → Relecture critique",
      },
      {
        title: "Audit de clauses abusives",
        flow: "Contrat existant → Repérage → Qualification → Recommandations",
      },
    ],
  },

  // --------------------------------------------------------- droit-societes
  "droit-societes": {
    definition:
      "Le droit des sociétés organise la naissance, la gouvernance et la vie des entreprises : formes sociales, assemblées, dirigeants, opérations sur capital. Il donne à l'activité économique sa structure juridique.",
    whyLearn:
      "Créer une société, lever des fonds, nommer un dirigeant, voter en assemblée : chaque étape de la vie d'une entreprise est un acte de droit des sociétés. C'est aussi la matière qui mène aux opérations les plus complexes : fusions, acquisitions, gouvernance des groupes.",
    prerequisiteNotes: {
      "droit-contrats":
        "Les pactes d'associés et les cessions de titres sont des contrats : la technique contractuelle s'y applique.",
      "intro-droit":
        "La personnalité morale et les sources du droit éclairent la construction des sociétés.",
    },
    conceptDetails: [
      {
        name: "Formes sociales",
        definition:
          "SARL, SAS, SA… : chaque forme a ses règles de constitution, de gouvernance et de responsabilité. Le choix engage l'avenir de l'entreprise.",
      },
      {
        name: "Gouvernance",
        definition:
          "La répartition des pouvoirs entre associés, dirigeants et organes de contrôle : qui décide quoi, et sous quel contrôle.",
      },
      {
        name: "Assemblées générales",
        definition:
          "Les réunions où les associés votent les décisions collectives : approbation des comptes, nomination des dirigeants, modifications statutaires.",
      },
      {
        name: "Pactes d'associés",
        definition:
          "Les accords privés entre associés qui complètent les statuts : sortie, préemption, gouvernance. Le contrat au service de la société.",
      },
      {
        name: "Opérations sur capital",
        definition:
          "Augmentations, réductions, fusions : les opérations qui modifient la structure financière et l'actionnariat de la société.",
      },
    ],
    howItWorksTitle: "Créer et gouverner une société",
    howItWorks: ["FORME SOCIALE", "STATUTS", "IMMATRICULATION", "GOUVERNANCE", "DÉCISIONS COLLECTIVES"],
    example: {
      title: "Créer une SAS",
      steps: [
        "Deux associés veulent lancer une startup",
        "Choix de la SAS pour sa souplesse statutaire",
        "Rédaction des statuts et du pacte d'associés",
        "Immatriculation au registre du commerce",
        "Première assemblée : nomination du président",
      ],
    },
    projectsDetailed: [
      {
        title: "Rédaction de statuts de SAS",
        flow: "Projet des associés → Clauses statutaires → Pacte → Dossier complet",
      },
      {
        title: "PV d'assemblée générale",
        flow: "Ordre du jour → Quorum → Votes → Procès-verbal",
      },
    ],
  },

  // ------------------------------------------------------------ droit-fiscal
  "droit-fiscal": {
    definition:
      "Le droit fiscal est l'ensemble des règles qui déterminent l'impôt : son assiette, son calcul, sa déclaration et son contrôle. En droit des affaires, il est stratégique : chaque opération — cession, fusion, distribution — a un coût fiscal.",
    whyLearn:
      "Une opération juridiquement parfaite mais fiscalement mal anticipée peut coûter très cher. Comprendre l'impôt sur les sociétés, la TVA et les mécanismes de contrôle permet de sécuriser les décisions et d'optimiser en toute légalité — sans franchir la ligne de l'abus de droit.",
    prerequisiteNotes: {
      "droit-civil":
        "Les notions d'obligation et de patrimoine structurent la compréhension de l'impôt.",
    },
    conceptDetails: [
      {
        name: "Impôt sur les sociétés",
        definition:
          "L'impôt sur les bénéfices des sociétés (taux normal de 25 %). Son calcul repose sur le résultat fiscal, qui diffère du résultat comptable.",
      },
      {
        name: "TVA",
        definition:
          "La taxe sur la valeur ajoutée, collectée par les entreprises à chaque étape et supportée par le consommateur final. Un mécanisme de collecte autant qu'un impôt.",
      },
      {
        name: "Intégration fiscale",
        definition:
          "Le régime qui permet à un groupe de sociétés de compenser les résultats de ses filiales pour ne payer l'impôt que sur le résultat d'ensemble.",
      },
      {
        name: "Contrôle fiscal",
        definition:
          "La vérification par l'administration de la régularité des déclarations. Il débouche sur des rectifications, contestables devant le juge.",
      },
      {
        name: "Abus de droit",
        definition:
          "La frontière à ne pas franchir : un montage licite en apparence mais motivé exclusivement par l'évitement de l'impôt peut être requalifié et sanctionné.",
      },
    ],
    howItWorksTitle: "Traiter une question fiscale",
    howItWorks: ["OPÉRATION", "QUALIFICATION FISCALE", "RÈGLE APPLICABLE", "CALCUL", "DÉCLARATION"],
    example: {
      title: "Céder une filiale",
      steps: [
        "Un groupe veut céder sa filiale",
        "Qualification fiscale : cession de titres",
        "Régime des plus-values applicable",
        "Calcul de l'impôt dû sur la plus-value",
        "Déclaration et paiement dans les délais",
      ],
    },
    projectsDetailed: [
      {
        title: "Optimisation d'une structure",
        flow: "Situation → Options → Coût fiscal → Montage recommandé",
      },
      {
        title: "Réponse à une proposition de rectification",
        flow: "Notification → Analyse → Arguments → Réponse motivée",
      },
    ],
  },

  // -------------------------------------------------------------- compliance
  compliance: {
    definition:
      "La compliance (conformité) désigne l'ensemble des dispositifs par lesquels une entreprise prévient les risques juridiques : anticorruption, protection des données, devoir de vigilance. Elle est passée d'une contrainte à une fonction stratégique.",
    whyLearn:
      "Les sanctions sont lourdes : amendes anticorruption, sanctions RGPD, mise en cause au titre du devoir de vigilance. Mais la compliance est aussi un argument commercial : les grands donneurs d'ordre exigent des partenaires irréprochables. Le juriste compliance est au cœur de la gouvernance.",
    prerequisiteNotes: {
      "droit-societes":
        "La gouvernance d'entreprise est le cadre dans lequel s'inscrivent les programmes de conformité.",
    },
    conceptDetails: [
      {
        name: "Sapin II",
        definition:
          "La loi anticorruption française : elle impose aux grandes entreprises un programme de prévention (cartographie des risques, code de conduite, dispositif d'alerte).",
      },
      {
        name: "RGPD",
        definition:
          "Le règlement européen sur la protection des données : il encadre la collecte et le traitement des données personnelles et sanctionne lourdement les manquements.",
      },
      {
        name: "Devoir de vigilance",
        definition:
          "L'obligation pour les grandes entreprises de prévenir les atteintes graves aux droits humains et à l'environnement dans leurs chaînes de valeur.",
      },
      {
        name: "Programmes de conformité",
        definition:
          "L'ensemble structuré des mesures de prévention : cartographie des risques, procédures, formations, contrôles. Un programme effectif atténue les sanctions.",
      },
      {
        name: "Lanceurs d'alerte",
        definition:
          "Les personnes qui signalent des violations : la loi organise leur protection et impose aux entreprises un canal de signalement interne.",
      },
    ],
    howItWorksTitle: "Déployer un programme de conformité",
    howItWorks: ["CARTOGRAPHIE DES RISQUES", "PROCÉDURES", "FORMATION", "CONTRÔLES", "ALERTE"],
    example: {
      title: "Un programme anticorruption",
      steps: [
        "Cartographie des risques par pays et par activité",
        "Code de conduite et procédure cadeaux et invitations",
        "Formation des collaborateurs les plus exposés",
        "Contrôles comptables et audits internes",
        "Dispositif d'alerte interne opérationnel",
      ],
    },
    projectsDetailed: [
      {
        title: "Cartographie des risques",
        flow: "Activités → Scénarios de risque → Cotation → Plan d'action",
      },
      {
        title: "Code de conduite d'entreprise",
        flow: "Risques identifiés → Principes → Règles pratiques → Diffusion",
      },
    ],
  },

  // ---------------------------------------------------- fusions-acquisitions
  "fusions-acquisitions": {
    definition:
      "Les fusions-acquisitions (M&A) sont les opérations par lesquelles une entreprise en rachète une autre : due diligence, négociation du prix, garanties, financement. Elles concentrent toutes les expertises du droit des affaires.",
    whyLearn:
      "Le M&A est le sommet technique du droit des affaires : chaque opération mobilise droit des sociétés, fiscalité, contrats, financement et parfois droit de la concurrence. C'est aussi une matière où la valeur créée — ou détruite — se mesure en centaines de millions.",
    prerequisiteNotes: {
      "droit-societes":
        "Les mécanismes de cession de titres et de gouvernance conditionnent toute l'opération.",
      "droit-fiscal":
        "La structuration fiscale détermine une part décisive du prix et du montage.",
    },
    conceptDetails: [
      {
        name: "Due diligence",
        definition:
          "L'audit préalable de la cible : juridique, fiscal, social, financier. Elle révèle les risques avant de fixer le prix définitif.",
      },
      {
        name: "SPA & garanties",
        definition:
          "Le contrat de cession (Share Purchase Agreement) et les garanties de passif : qui paie si un risque caché se matérialise après la vente.",
      },
      {
        name: "Financement d'acquisition",
        definition:
          "La dette bancaire ou obligataire qui finance le rachat, souvent adossée aux flux futurs de la cible (LBO).",
      },
      {
        name: "Contrôle des concentrations",
        definition:
          "L'autorisation préalable des autorités de concurrence pour les opérations dépassant certains seuils de chiffre d'affaires.",
      },
      {
        name: "Closing",
        definition:
          "La réalisation finale : transfert des titres contre paiement du prix, une fois les conditions suspensives levées.",
      },
    ],
    howItWorksTitle: "Mener une acquisition",
    howItWorks: ["CIBLE", "DUE DILIGENCE", "NÉGOCIATION", "FINANCEMENT", "CLOSING"],
    example: {
      title: "Racheter un concurrent",
      steps: [
        "Lettre d'intention signée avec le vendeur",
        "Due diligence juridique, fiscale et sociale",
        "Négociation du SPA et des garanties de passif",
        "Mise en place du financement bancaire",
        "Closing : transfert des titres contre paiement",
      ],
    },
    projectsDetailed: [
      {
        title: "Due diligence simulée",
        flow: "Data room → Points d'attention → Rapport → Impact sur le prix",
      },
      {
        title: "Négociation d'une clause de garantie",
        flow: "Risque identifié → Plafond → Durée → Clause rédigée",
      },
    ],
  },

  // ---------------------------------------------------------------- arbitrage
  arbitrage: {
    definition:
      "L'arbitrage est un mode privé de résolution des litiges : les parties confient leur différend à des arbitres plutôt qu'aux tribunaux étatiques. Avec la médiation, il forme les modes alternatifs de règlement des différends, dominants dans les affaires internationales.",
    whyLearn:
      "Dans les contrats internationaux, les parties refusent souvent le juge de l'autre : l'arbitrage offre neutralité, confidentialité et exécution mondiale des sentences. Maîtriser la clause compromissoire et la procédure arbitrale est indispensable dès que l'opération dépasse les frontières.",
    prerequisiteNotes: {
      "droit-contrats":
        "La clause compromissoire est une clause du contrat : sa rédaction conditionne tout le contentieux.",
      "methodologie":
        "La rigueur du raisonnement et de la rédaction structure les mémoires en arbitrage.",
    },
    conceptDetails: [
      {
        name: "Clause compromissoire",
        definition:
          "La clause par laquelle les parties conviennent à l'avance de soumettre leurs litiges à l'arbitrage. Sa rédaction détermine le siège, la langue et les règles applicables.",
      },
      {
        name: "Procédure arbitrale",
        definition:
          "Le déroulement de l'instance : constitution du tribunal, échanges de mémoires, audience, sentence. Plus souple et confidentielle que le procès étatique.",
      },
      {
        name: "Médiation",
        definition:
          "Le processus amiable où un tiers neutre aide les parties à trouver un accord, sans pouvoir l'imposer. Rapide et préservant la relation commerciale.",
      },
      {
        name: "Exequatur",
        definition:
          "La décision du juge étatique qui rend la sentence arbitrale exécutoire. Grâce aux conventions internationales, une sentence s'exécute dans plus de 170 pays.",
      },
      {
        name: "Stratégie contentieuse",
        definition:
          "Le choix du mode de résolution, du siège et des arbitres : des décisions tactiques qui influencent l'issue autant que le fond du dossier.",
      },
    ],
    howItWorksTitle: "Résoudre un litige par arbitrage",
    howItWorks: ["CLAUSE", "DEMANDE", "TRIBUNAL ARBITRAL", "PROCÉDURE", "SENTENCE"],
    example: {
      title: "Un litige franco-allemand",
      steps: [
        "Contrat avec clause d'arbitrage CCI à Paris",
        "Différend sur la qualité des marchandises livrées",
        "Demande d'arbitrage déposée par l'acheteur",
        "Échanges de mémoires puis audience",
        "Sentence exécutoire dans les deux pays",
      ],
    },
    projectsDetailed: [
      {
        title: "Mémoire en arbitrage simulé",
        flow: "Dossier → Arguments → Mémoire demandeur → Mémoire défendeur",
      },
      {
        title: "Clause d'arbitrage rédigée",
        flow: "Opération → Risques → Choix du siège → Clause complète",
      },
    ],
  },

  // -------------------------------------------------------- anglais-juridique
  "anglais-juridique": {
    definition:
      "L'anglais juridique (Legal English) est la langue de travail des affaires internationales : contrats, négociations, arbitrage. Il ne s'agit pas d'anglais courant, mais d'un vocabulaire et de structures propres à la common law.",
    whyLearn:
      "La plupart des contrats internationaux sont rédigés en anglais, souvent sous droit anglais ou new-yorkais. Un juriste qui ne lit pas l'anglais juridique est exclu des opérations transfrontalières — et des cabinets qui les traitent.",
    prerequisiteNotes: {
      "methodologie":
        "La rigueur de rédaction acquise en français se transpose à la rédaction en anglais.",
    },
    conceptDetails: [
      {
        name: "Terminologie",
        definition:
          "Le vocabulaire précis du droit des affaires : representations, warranties, indemnities, covenants. Chaque terme a un sens technique qu'il faut maîtriser.",
      },
      {
        name: "Rédaction de contrats",
        definition:
          "Les structures types des contrats anglo-saxons : définitions, déclarations, engagements, conditions suspensives. Une architecture différente des contrats français.",
      },
      {
        name: "Négociation",
        definition:
          "Mener une discussion contractuelle en anglais : formuler des contre-propositions, défendre une clause, conclure un accord.",
      },
      {
        name: "Common law vs civil law",
        definition:
          "Les deux grandes traditions juridiques : la common law raisonne par précédents, le droit civil par codes. Les contrats n'ont pas la même logique.",
      },
      {
        name: "TOLES",
        definition:
          "Le Test of Legal English Skills : la certification reconnue qui atteste d'un niveau professionnel d'anglais juridique.",
      },
    ],
    howItWorksTitle: "Travailler un contrat en anglais",
    howItWorks: ["VOCABULAIRE", "STRUCTURES", "LECTURE", "RÉDACTION", "NÉGOCIATION"],
    example: {
      title: "Relire un NDA en anglais",
      steps: [
        "Réception du NDA transmis par la contrepartie",
        "Repérage des clauses : confidentialité, durée, exceptions",
        "Comparaison avec les standards de common law",
        "Propositions de modifications ciblées",
        "Négociation des termes finaux",
      ],
    },
    projectsDetailed: [
      {
        title: "Traduction d'un contrat",
        flow: "Contrat source → Terminologie → Traduction → Relecture juridique",
      },
      {
        title: "Négociation simulée en anglais",
        flow: "Position → Arguments → Contre-propositions → Accord",
      },
    ],
  },

  // ----------------------------------------------------------------- pratique
  pratique: {
    definition:
      "La pratique professionnelle est le passage du savoir au savoir-faire : rédaction d'actes, notes de synthèse, relation client, déontologie. Elle s'acquiert en stage, en clinique juridique et par la rédaction en conditions réelles.",
    whyLearn:
      "Un diplôme ne fait pas un praticien. Les cabinets et directions juridiques recrutent des réflexes : synthétiser vite, rédiger clair, gérer un dossier, respecter la déontologie. La pratique transforme les connaissances accumulées en valeur immédiatement utilisable.",
    prerequisiteNotes: {
      "droit-societes":
        "Les dossiers traités en stage mobilisent d'abord le droit des sociétés.",
      "compliance":
        "La conformité est devenue un réflexe quotidien du praticien.",
    },
    conceptDetails: [
      {
        name: "Rédaction d'actes",
        definition:
          "Produire des documents juridiquement solides : contrats, statuts, mises en demeure. La précision du vocabulaire y est une question de responsabilité.",
      },
      {
        name: "Notes de synthèse",
        definition:
          "Résumer un dossier complexe en quelques pages actionnables pour un dirigeant ou un client : faits, analyse, recommandations.",
      },
      {
        name: "Relation client",
        definition:
          "Écouter le besoin, gérer les attentes, expliquer sans jargon : la technique ne suffit pas, la pédagogie fait la différence.",
      },
      {
        name: "Déontologie",
        definition:
          "Les règles de la profession : secret professionnel, conflits d'intérêts, indépendance. Leur violation engage la responsabilité du praticien.",
      },
      {
        name: "Gestion de dossier",
        definition:
          "Organiser un dossier de A à Z : délais, pièces, correspondances, facturation. La rigueur administrative au service de la qualité juridique.",
      },
    ],
    howItWorksTitle: "Traiter un dossier client",
    howItWorks: ["DEMANDE", "ANALYSE", "RECHERCHE", "RÉDACTION", "SUIVI"],
    example: {
      title: "Une note pour un dirigeant",
      steps: [
        "Le dirigeant s'interroge sur un risque contractuel",
        "Analyse des faits et des textes applicables",
        "Recherche de jurisprudence pertinente",
        "Note de synthèse : risque évalué et recommandations",
        "Présentation au client et suivi du dossier",
      ],
    },
    projectsDetailed: [
      {
        title: "Dossier complet simulé",
        flow: "Cas client → Analyse → Actes rédigés → Note de synthèse",
      },
      {
        title: "Stage en entreprise ou cabinet",
        flow: "Recherche → Candidature → Missions → Bilan de compétences",
      },
    ],
  },
};

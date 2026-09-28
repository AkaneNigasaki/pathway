import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète des design systems : tokens, composants,
 * documentation, gouvernance, versioning et mesure d'adoption.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_DESIGN_SYSTEM: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est un design system : le langage visuel et interactif partagé d'une organisation.",
    blocks: [
      {
        kind: "text",
        text: "Un design system est l'ensemble des standards qui permettent de concevoir et développer un produit de façon cohérente à l'échelle : design tokens (couleurs, espacements, typographies nommés), composants réutilisables documentés, et règles d'usage qui disent quand et comment les utiliser. C'est un produit en soi, avec ses utilisateurs (designers et développeurs) et son cycle de vie.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est indispensable : dès que plusieurs équipes construisent le même produit, sans système commun chacune réinvente — 47 variations de boutons, 12 gris différents, des formulaires incohérents. Le résultat : dette visuelle, lenteur, accessibilité aléatoire. Un design system industrialise la qualité : l'accessibilité, les états et les comportements sont résolus une fois, dans le système, puis hérités partout.",
      },
      {
        kind: "text",
        text: "Ce qu'un design system n'est pas : une simple bibliothèque de composants Figma, un kit UI téléchargé, ni un projet ponctuel. Sans documentation, sans gouvernance et sans adoption mesurée, une bibliothèque de composants n'est qu'une collection d'écrans — pas un système.",
      },
    ],
  },
  {
    id: "systeme-vs-bibliotheque",
    title: "Système vs bibliothèque : la différence",
    level: 1,
    intro:
      "Le malentendu le plus courant : confondre le livrable (les composants) avec le système (les règles).",
    blocks: [
      {
        kind: "diagram",
        title: "Les couches d'un design system",
        lines: [
          "Fondations (tokens)",
          "  Couleurs, typographies, espacements, ombres, rayons",
          "     │",
          "Composants",
          "  Boutons, champs, cartes… construits sur les tokens",
          "     │",
          "Patterns",
          "  Formulaires, navigation, états vides… assemblages documentés",
          "     │",
          "Règles",
          "  Quand utiliser quoi, contre-exemples, accessibilité",
          "     │",
          "Gouvernance",
          "  Qui décide, qui contribue, comment le système évolue",
          "Sans les deux dernières couches, ce n'est pas un système.",
        ],
      },
      {
        kind: "text",
        text: "Une bibliothèque répond à « à quoi ça ressemble », un système répond aussi à « quand l'utiliser », « comment ça se comporte » et « qui décide de son évolution ». C'est cette seconde moitié qui fait toute la valeur — et tout le travail.",
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 2 — PRATIQUE
  // ------------------------------------------------------------------
  {
    id: "anatomie-design-system",
    title: "Anatomie d'un design system",
    level: 2,
    intro:
      "Les pièces concrètes qui composent un système, avec leurs livrables.",
    blocks: [
      {
        kind: "fields",
        title: "Les pièces et leurs livrables",
        fields: [
          {
            label: "Design tokens",
            value:
              "Fichier de variables (CSS, JSON) : couleurs, espacements, typos, ombres. Versionné, c'est la source de vérité partagée entre design et code.",
          },
          {
            label: "Bibliothèque Figma",
            value:
              "Composants avec variants, styles et variables, publiés en library d'équipe. C'est l'outil quotidien des designers.",
          },
          {
            label: "Bibliothèque de code",
            value:
              "Composants implémentés (React, etc.), consommant les mêmes tokens. Idéalement documentés dans Storybook.",
          },
          {
            label: "Site de documentation",
            value:
              "Règles d'usage, exemples et contre-exemples, accessibilité, tokens : la référence consultée par toute l'organisation.",
          },
          {
            label: "Gouvernance",
            value:
              "Rôles, processus de contribution, critères d'acceptation, rythme de release. Souvent un simple document, mais décisif.",
          },
        ],
      },
    ],
  },
  {
    id: "tokens-fondations",
    title: "Les tokens : fondations du système",
    level: 2,
    intro:
      "Des variables réelles et vérifiables : le contrat entre le design et le code.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Tokens de fondation (extrait réaliste)",
        code: ":root {\n  /* Couleur */\n  --color-brand-500: hsl(217, 89%, 52%);\n  --color-text-primary: hsl(220, 15%, 12%);\n  /* Espacement (échelle 4px) */\n  --space-1: 4px;\n  --space-2: 8px;\n  --space-4: 16px;\n  --space-8: 32px;\n  /* Typographie */\n  --font-family-base: 'Inter', system-ui, sans-serif;\n  --font-size-md: 16px;\n  --font-size-lg: 20px;\n  --line-height-body: 1.6;\n  /* Rayons & ombres */\n  --radius-md: 8px;\n  --shadow-card: 0 1px 3px hsl(220 15% 12% / 0.12);\n}",
      },
      {
        kind: "text",
        text: "Catégories standard d'un système : couleur, typographie, espacement, rayons, ombres, motion (durées, courbes). Chaque catégorie suit une échelle régulière (4 px, ratio typographique 1.25) — jamais des valeurs arbitraires.",
      },
      {
        kind: "list",
        items: [
          "Un token = un nom stable + une valeur versionnée + une documentation d'usage.",
          "Les composants n'utilisent que des tokens, jamais de valeurs en dur.",
          "Modifier un token propage le changement à tout le produit : c'est le pouvoir — et le danger — du système.",
        ],
      },
    ],
  },
  {
    id: "nommer-tokens-systeme",
    title: "Nommer les tokens à l'échelle du système",
    level: 2,
    intro:
      "La convention en trois niveaux qui survit à la croissance.",
    blocks: [
      {
        kind: "diagram",
        title: "Primitifs → sémantiques → composants",
        lines: [
          "--blue-500  (primitif : valeur brute)",
          "    │",
          "--color-brand-default  (sémantique : rôle)",
          "    │",
          "--button-primary-bg  (composant : surcharge éventuelle)",
          "Règle : les composants consomment des sémantiques,",
          "jamais des primitifs directement.",
        ],
      },
      {
        kind: "list",
        items: [
          "Vocabulaire partagé : `text`, `surface`, `border`, `brand`, `danger`, `success`, `warning`, `info`.",
          "Suffixes d'état : `-default`, `-hover`, `-active`, `-disabled`, `-subtle`, `-strong`, `-on-*` (texte sur fond).",
          "Le nom décrit le rôle, pas la valeur ni le contexte : `--color-text-primary`, pas `--blue` ni `--header-title`.",
          "Documenter chaque token : valeur, usage autorisé, exemple visuel.",
        ],
      },
    ],
  },
  {
    id: "anatomie-composant",
    title: "L'anatomie d'un composant de système",
    level: 2,
    intro:
      "Ce qui distingue un composant « système » d'un composant dessiné pour un écran.",
    blocks: [
      {
        kind: "fields",
        title: "Les six facettes d'un composant",
        fields: [
          {
            label: "Variants",
            value:
              "Tailles, styles (primaire/secondaire/tertiaire), états : toutes les déclinaisons légitimes, aucune de plus.",
          },
          {
            label: "États",
            value:
              "Repos, survol, focus, actif, désactivé, erreur, chargement — dessinés et spécifiés, pas improvisés.",
          },
          {
            label: "Accessibilité intégrée",
            value:
              "Contrastes vérifiés, focus visible, nommage pour lecteurs d'écran, taille de cible 44 × 44 : non négociable dès la v1.",
          },
          {
            label: "Responsive",
            value:
              "Comportement en auto-layout : comment le composant réagit au contenu long, au zoom texte, aux petits écrans.",
          },
          {
            label: "API claire",
            value:
              "Propriétés nommées de façon explicite (`size`, `variant`, `disabled`) avec valeurs par défaut sensées.",
          },
          {
            label: "Documentation",
            value:
              "Quand l'utiliser, quand ne pas l'utiliser, exemples, accessibilité : sans doc, le composant sera mal utilisé.",
          },
        ],
      },
    ],
  },
  {
    id: "construire-premier-composant",
    title: "Construire son premier composant système",
    level: 2,
    intro:
      "La méthode pas à pas sur l'exemple du bouton.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Auditer l'existant",
            detail:
              "Capturer toutes les variations de boutons du produit. Compter : c'est l'argument chiffré du système (souvent 20 à 50 variantes pour 3 besoins réels).",
          },
          {
            title: "Définir l'API",
            detail:
              "Propriétés : `variant` (primary/secondary/tertiary/danger), `size` (sm/md/lg), `disabled`, `loading`. Rien d'autre en v1 : chaque propriété doit justifier son existence par un usage réel.",
          },
          {
            title: "Construire en auto-layout",
            detail:
              "Cadre horizontal, padding en tokens (`--space-2`/`--space-4`), texte en style typographique du système. Le bouton s'ajuste au contenu.",
          },
          {
            title: "Créer les variants",
            detail:
              "Décliner variant × size × état. Vérifier les contrastes de chaque combinaison texte/fond (4.5:1).",
          },
          {
            title: "Documenter",
            detail:
              "Page de doc : anatomie, variants, états, règles d'usage (quand primary vs secondary), contre-exemples, notes d'accessibilité.",
          },
          {
            title: "Publier et annoncer",
            detail:
              "Publier la library, annoncer aux équipes avec la doc et un guide de migration depuis les anciens boutons.",
          },
        ],
      },
    ],
  },
  {
    id: "variants-figma",
    title: "Variants et propriétés dans Figma",
    level: 2,
    intro:
      "L'outillage Figma concret qui rend un composant vraiment réutilisable.",
    blocks: [
      {
        kind: "fields",
        title: "Les propriétés à maîtriser",
        fields: [
          {
            label: "Variant properties",
            value:
              "Déclinaisons nommées (`variant=primary`, `size=md`) commutables dans le panneau latéral. Un seul composant au lieu de douze.",
          },
          {
            label: "Boolean properties",
            value:
              "Afficher/masquer un élément (icône, badge) par interrupteur : évite les variants redondants.",
          },
          {
            label: "Instance swap",
            value:
              "Remplacer une icône ou un sous-composant dans une instance sans détacher : la flexibilité sans perdre le lien au système.",
          },
          {
            label: "Text properties",
            value:
              "Exposer le contenu textuel modifiable directement dans le panneau : l'instance reste liée au composant.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle : toute personnalisation qui force à « détacher l'instance » signale un composant mal conçu — il manque une propriété. Les instances détachées sont de la dette : elles ne reçoivent plus les mises à jour.",
      },
    ],
  },
  {
    id: "documenter-composant",
    title: "Documenter un composant",
    level: 2,
    intro:
      "Le template de documentation qui fait qu'un composant est réellement adopté.",
    blocks: [
      {
        kind: "fields",
        title: "Rubriques d'une page composant",
        fields: [
          {
            label: "Anatomie",
            value: "Schéma annoté : quelles parties, quels tokens utilisés.",
          },
          {
            label: "Variants & états",
            value: "Toutes les déclinaisons visuelles, avec leurs noms de propriétés.",
          },
          {
            label: "Règles d'usage",
            value: "Quand utiliser ce composant — et surtout quand utiliser un autre (avec liens).",
          },
          {
            label: "Contenu",
            value: "Règles de rédaction : longueur, ton, exemples de labels corrects et incorrects.",
          },
          {
            label: "Accessibilité",
            value: "Contrastes, clavier, lecteur d'écran, cibles : ce qui est garanti par le composant.",
          },
          {
            label: "Comportement",
            value: "Responsive, états de chargement, cas limites (texte long, contenu vide).",
          },
        ],
      },
      {
        kind: "text",
        text: "Le contre-exemple est aussi important que l'exemple : montrer le bouton primaire utilisé pour une action secondaire, barré d'une croix rouge, enseigne plus vite qu'un paragraphe.",
      },
    ],
  },
  {
    id: "outils-design-system",
    title: "Les outils du design system",
    level: 2,
    intro:
      "La chaîne d'outillage réelle, de Figma au code.",
    blocks: [
      {
        kind: "fields",
        title: "Outils réels et leur rôle",
        fields: [
          {
            label: "Figma Libraries + Variables",
            value:
              "Publication des composants et tokens côté design ; les variables Figma portent les tokens (couleurs, espacements, rayons).",
          },
          {
            label: "Tokens Studio (plugin Figma)",
            value:
              "Gère les tokens en JSON dans Figma et les synchronise vers un dépôt Git : le pont entre design et code.",
          },
          {
            label: "Storybook",
            value:
              "storybook.js.org — catalogue des composants implémentés, avec leurs variants, leur code d'usage et leurs tests.",
          },
          {
            label: "Style Dictionary",
            value:
              "Convertit un fichier de tokens unique vers tous les formats (CSS, iOS, Android) : une source, toutes les plateformes.",
          },
        ],
      },
    ],
  },
  {
    id: "audit-existant-systeme",
    title: "Auditer l'existant avant de construire",
    level: 2,
    intro:
      "On ne construit jamais un système dans le vide : l'audit de l'existant est l'étape 1.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Inventorier les composants",
            detail:
              "Capturer tous les écrans du produit et lister chaque variation de bouton, champ, carte, badge. Compter les doublons : le chiffre fait l'argumentaire.",
          },
          {
            title: "Inventorier les styles",
            detail:
              "Extraire couleurs, typographies, espacements, ombres, rayons. Repérer les quasi-doublons (5 bleus proches, 4 rayons différents).",
          },
          {
            title: "Cartographier les usages",
            detail:
              "Pour chaque variation, noter où elle est utilisée et pourquoi elle diffère : besoin réel ou accident historique ?",
          },
          {
            title: "Prioriser",
            detail:
              "Trier par fréquence d'usage × coût d'incohérence : boutons, champs de formulaire et typographie d'abord — ce sont eux qui structurent 80 % des écrans.",
          },
          {
            title: "Restituer",
            detail:
              "Rapport visuel avant/après potentiel : inventaire chiffré, composants cibles v1, dette estimée. C'est le document qui obtient le budget.",
          },
        ],
      },
    ],
  },
  {
    id: "versioning-systeme",
    title: "Versionner le système",
    level: 2,
    intro:
      "Un système vivant évolue : le versioning sémantique appliqué au design.",
    blocks: [
      {
        kind: "table",
        headers: ["Version", "Changement", "Exemple"],
        rows: [
          ["Patch (1.0.1)", "Correction sans impact visuel", "Fix d'un contraste, ajustement d'un padding interne"],
          ["Mineur (1.1.0)", "Ajout compatible", "Nouveau variant, nouveau composant, nouveau token"],
          ["Majeur (2.0.0)", "Changement cassant", "Renommage de token, suppression d'un variant, refonte d'un composant"],
        ],
      },
      {
        kind: "text",
        text: "Règles pratiques : changelog tenu à chaque release, guide de migration pour les versions majeures, préavis avant suppression (dépréciation sur une version mineure, suppression à la majeure suivante). Les équipes produit doivent pouvoir mettre à jour sans surprise.",
      },
    ],
  },
  {
    id: "gouvernance-base",
    title: "Gouvernance : les bases",
    level: 2,
    intro:
      "Qui décide de quoi : sans réponse claire, le système se fragmente.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois rôles minimaux",
        fields: [
          {
            label: "Équipe système (core team)",
            value:
              "Petite équipe (ou personnes dédiées à temps partiel) : maintient les fondations, valide les ajouts, publie les releases.",
          },
          {
            label: "Contributeurs",
            value:
              "Designers et développeurs des équipes produit : proposent des composants selon le modèle de contribution.",
          },
          {
            label: "Référent par équipe",
            value:
              "Relais qui remonte les besoins et diffuse les releases : évite que le système ne vive en vase clos.",
          },
        ],
      },
      {
        kind: "text",
        text: "Décisions à documenter dès le départ : qui peut ajouter un token, qui valide un nouveau composant, quel délai de revue, comment sont gérés les désaccords. Un document d'une page suffit — l'absence de document garantit les conflits.",
      },
    ],
  },
  {
    id: "mesure-adoption",
    title: "Mesurer l'adoption",
    level: 2,
    intro:
      "Un système non adopté est un système mort : les métriques qui comptent.",
    blocks: [
      {
        kind: "fields",
        title: "Les métriques utiles",
        fields: [
          {
            label: "Couverture composants",
            value:
              "Part des écrans construits avec les composants du système vs composants ad hoc. L'indicateur roi.",
          },
          {
            label: "Instances détachées",
            value:
              "Nombre d'instances Figma détachées : signale des composants inadaptés ou des usages hors système.",
          },
          {
            label: "Dette visuelle restante",
            value:
              "Composants legacy encore en usage : suit la progression de la migration.",
          },
          {
            label: "Contributions",
            value:
              "Propositions reçues, acceptées, délai de revue : mesure la santé du modèle de contribution.",
          },
          {
            label: "Satisfaction équipes",
            value:
              "Enquête courte semestrielle : le système fait-il gagner du temps ? Que manque-t-il ?",
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "architecture-tokens-avancee",
    title: "Architecture des tokens : les trois niveaux",
    level: 3,
    intro:
      "L'architecture qui permet le multi-thème et le multi-marque.",
    blocks: [
      {
        kind: "diagram",
        title: "Hiérarchie des tokens",
        lines: [
          "Options (primitifs)",
          "  --blue-500: #1A73E8   ← valeurs brutes, rarement changées",
          "     │",
          "Décisions (sémantiques)",
          "  --color-brand-default → --blue-500   ← rôles, par thème",
          "     │",
          "Composants (spécifiques)",
          "  --button-primary-bg → --color-brand-default",
          "Règle : on ne saute jamais un niveau vers le bas.",
        ],
      },
      {
        kind: "code",
        language: "json",
        title: "Format de tokens (structure standard, compatible Style Dictionary)",
        code: "{\n  \"color\": {\n    \"brand\": {\n      \"500\": { \"value\": \"#1A73E8\", \"type\": \"color\" },\n      \"default\": { \"value\": \"{color.brand.500}\", \"type\": \"color\" }\n    }\n  }\n}",
      },
      {
        kind: "text",
        text: "Les références (`{color.brand.500}`) créent le lien entre niveaux : changer le primitif propage automatiquement. C'est cette mécanique qui rend le changement de thème (clair/sombre, marque A/B) trivial.",
      },
    ],
  },
  {
    id: "theming-tokens",
    title: "Thématisation : clair, sombre, marques",
    level: 3,
    intro:
      "Un seul système, plusieurs thèmes : comment l'architecture le rend possible.",
    blocks: [
      {
        kind: "text",
        text: "Principe : les tokens sémantiques gardent le même nom dans tous les thèmes, seules leurs valeurs changent. `--color-text-primary` vaut un gris très sombre en thème clair, un gris très clair en thème sombre. Les composants ne changent pas — le thème si.",
      },
      {
        kind: "list",
        items: [
          "Chaque thème est un jeu complet de valeurs pour les tokens sémantiques.",
          "Valider chaque thème indépendamment : contrastes, daltonisme, focus.",
          "Cas limite : `--color-text-on-brand` (texte sur primaire) peut changer de teinte selon la marque — prévoir la surcharge par thème.",
          "Documenter le « contrat de thème » : la liste exacte des tokens qu'un nouveau thème doit fournir.",
        ],
      },
    ],
  },
  {
    id: "echelles-tokens",
    title: "Construire des échelles de tokens",
    level: 3,
    intro:
      "Espacements, typographie, rayons, ombres : des échelles régulières, pas des valeurs au hasard.",
    blocks: [
      {
        kind: "fields",
        title: "Les échelles standard",
        fields: [
          {
            label: "Espacement",
            value:
              "Base 4 px (ou 8 px) : 4, 8, 12, 16, 24, 32, 48, 64. Tout espacement de l'interface est un multiple de la base.",
          },
          {
            label: "Typographie",
            value:
              "Ratio modulaire (1.25 ou 1.333) depuis 16 px : 12, 14, 16, 20, 24, 32… Chaque taille a son interligne et sa graisse recommandée.",
          },
          {
            label: "Rayons",
            value:
              "Échelle courte : 0, 4, 8, 12, 16, plein (pill). Cohérence immédiate entre cartes, boutons, champs.",
          },
          {
            label: "Ombres",
            value:
              "3 à 4 niveaux d'élévation nommés (subtle, card, overlay, modal), pas des ombres improvisées par écran.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le bénéfice est double : cohérence visuelle automatique et décision simplifiée — le designer choisit dans l'échelle au lieu d'inventer une valeur.",
      },
    ],
  },
  {
    id: "composants-composables",
    title: "Composants composables (slots)",
    level: 3,
    intro:
      "Au-delà des variants : des composants qui s'assemblent.",
    blocks: [
      {
        kind: "text",
        text: "Un composant mature n'est pas un bloc figé mais un assemblage : une carte expose des slots (média, titre, actions) que chaque usage remplit. En Figma : instance swap et propriétés permettent cette composition sans détacher. En code : pattern `children` / slots nommés.",
      },
      {
        kind: "list",
        items: [
          "Identifier les zones variables vs fixes de chaque composant dès sa conception.",
          "Documenter ce qui peut aller dans chaque slot (et ce qui ne doit pas).",
          "Éviter l'explosion combinatoire : composer plutôt que multiplier les variants.",
          "Tester les cas limites : slot vide, contenu très long, contenu inattendu.",
        ],
      },
    ],
  },
  {
    id: "accessibilite-par-defaut",
    title: "L'accessibilité par défaut",
    level: 3,
    intro:
      "Le système est le levier le plus puissant pour l'accessibilité : la résoudre une fois pour toutes.",
    blocks: [
      {
        kind: "list",
        items: [
          "Chaque composant du système naît accessible : contrastes vérifiés, focus visible, nommage, cibles 44 × 44.",
          "Les équipes produit héritent de l'accessibilité en utilisant les composants — sans expertise supplémentaire.",
          "La documentation de chaque composant inclut sa fiche accessibilité (clavier, lecteur d'écran).",
          "Tout nouveau composant est audité avant publication : la revue d'accessibilité fait partie des critères d'acceptation.",
          "Les tokens portent l'accessibilité : une palette validée une fois protège tous les usages futurs.",
        ],
      },
      {
        kind: "text",
        text: "Argument décisif : corriger l'accessibilité dans 200 écrans coûte une fortune ; la corriger dans 30 composants du système, une fois, est rentable. C'est souvent ce calcul qui justifie le budget du design system.",
      },
    ],
  },
  {
    id: "contribution-model",
    title: "Le modèle de contribution",
    level: 3,
    intro:
      "Comment les équipes proposent des composants sans fragmenter le système.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Identifier le besoin",
            detail:
              "L'équipe documente : quel besoin non couvert, où apparaît-il, combien d'écrans sont concernés. Un composant utilisé une seule fois ne rejoint pas le système.",
          },
          {
            title: "Vérifier l'existant",
            detail:
              "Le besoin est-il couvert par composition des composants existants ? 80 % des « nouveaux composants » sont des assemblages déguisés.",
          },
          {
            title: "Proposer",
            detail:
              "Maquette du composant + cas d'usage + proposition d'API, soumis à l'équipe système (template standard).",
          },
          {
            title: "Revue",
            detail:
              "Critères : généricité, accessibilité, cohérence tokens, documentation. Délai de revue annoncé (ex. 2 semaines).",
          },
          {
            title: "Intégration",
            detail:
              "L'équipe système finalise, documente, publie dans la release suivante avec changelog et guide de migration.",
          },
        ],
      },
    ],
  },
  {
    id: "criteres-acceptation-composant",
    title: "Critères d'acceptation d'un composant",
    level: 3,
    intro:
      "La checklist qui décide si un composant entre dans le système.",
    blocks: [
      {
        kind: "list",
        items: [
          "Utilisé (ou prévu) dans au moins 3 contextes distincts : pas de composant mono-usage.",
          "Construit exclusivement sur les tokens du système, en auto-layout.",
          "Tous les états dessinés : repos, survol, focus, actif, désactivé, erreur, chargement.",
          "Accessibilité vérifiée : contrastes, clavier, lecteur d'écran, cibles.",
          "API nommée clairement, avec valeurs par défaut sensées.",
          "Documentation complète : usage, contre-exemples, contenu, accessibilité.",
          "Version code correspondante (ou planifiée) avec les mêmes propriétés.",
          "Revue par l'équipe système validée.",
        ],
      },
    ],
  },
  {
    id: "documentation-site",
    title: "Structurer le site de documentation",
    level: 3,
    intro:
      "Le site de doc est le produit visible du système : son architecture.",
    blocks: [
      {
        kind: "fields",
        title: "Rubriques types",
        fields: [
          {
            label: "Fondations",
            value: "Couleur, typographie, espacement, iconographie, motion : les tokens avec leurs règles.",
          },
          {
            label: "Composants",
            value: "Un page par composant : anatomie, variants, usage, accessibilité, code.",
          },
          {
            label: "Patterns",
            value: "Formulaires, navigation, recherche, états vides/erreur : les assemblages récurrents.",
          },
          {
            label: "Contenu",
            value: "Ton, microcopie, formats (dates, nombres), accessibilité rédactionnelle.",
          },
          {
            label: "Contribuer",
            value: "Modèle de contribution, critères d'acceptation, roadmap du système.",
          },
        ],
      },
      {
        kind: "text",
        text: "Principe : chaque page répond en 30 secondes (« quel composant pour ce besoin ? ») et en 5 minutes (« comment l'utiliser correctement »). Les exemples interactifs (Storybook intégré) valent mieux que les captures.",
      },
    ],
  },
  {
    id: "migration-produit",
    title: "Migrer un produit vers le système",
    level: 3,
    intro:
      "Adopter le système sur un produit existant sans tout casser.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Commencer par les fondations",
            detail:
              "Tokens de couleur et typographie d'abord : ils se substituent sans changer la structure des écrans et donnent un gain visuel immédiat.",
          },
          {
            title: "Migrer les composants les plus utilisés",
            detail:
              "Boutons, champs, cartes : le top 5 des composants couvre généralement 80 % des écrans. Un composant à la fois, avec tests.",
          },
          {
            title: "Geler l'ancien",
            detail:
              "Interdire la création de nouveaux écrans avec les anciens composants. Les nouveaux écrans naissent dans le système.",
          },
          {
            title: "Traiter la dette par opportunité",
            detail:
              "Chaque refonte d'écran migre vers le système. Pas de « big bang » : la migration suit le rythme produit.",
          },
          {
            title: "Suivre la couverture",
            detail:
              "Métrique de couverture publiée régulièrement : la visibilité de la progression entretient l'adhésion.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-systeme-1",
    title: "Erreurs courantes (1/2)",
    level: 3,
    intro:
      "Pourquoi tant de design systems meurent : les pièges classiques.",
    blocks: [
      {
        kind: "fields",
        title: "Cinq pièges mortels",
        fields: [
          {
            label: "Construire sans utilisateurs",
            value:
              "Pourquoi : système conçu en chambre, sans les équipes produit. Correction : impliquer les équipes dès l'audit, livrer tôt, itérer sur leurs retours.",
          },
          {
            label: "Tout systématiser d'un coup",
            value:
              "Pourquoi : vouloir couvrir 100 composants avant la première release. Correction : v1 resserrée (tokens + 10 composants), releases itératives.",
          },
          {
            label: "Documentation absente ou obsolète",
            value:
              "Pourquoi : « on documentera plus tard ». Correction : pas de composant publié sans sa page de doc ; la doc fait partie de la définition de terminé.",
          },
          {
            label: "Pas de gouvernance",
            value:
              "Pourquoi : chacun ajoute ses composants. Correction : modèle de contribution + critères d'acceptation dès le jour 1.",
          },
          {
            label: "Confondre système et refonte",
            value:
              "Pourquoi : utiliser le système comme prétexte pour tout redesigner. Correction : le système capture l'existant d'abord, la refonte est un projet séparé.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-systeme-2",
    title: "Erreurs courantes (2/2)",
    level: 3,
    intro:
      "Cinq autres échecs typiques, plus techniques.",
    blocks: [
      {
        kind: "fields",
        title: "Cinq échecs techniques",
        fields: [
          {
            label: "Tokens nommés par valeur",
            value:
              "Pourquoi : `--blue-500` dans les composants. Correction : couche sémantique ; renommer un jour coûtera une migration majeure.",
          },
          {
            label: "Figma et code désynchronisés",
            value:
              "Pourquoi : deux systèmes qui divergent. Correction : tokens en source unique (JSON), Style Dictionary pour générer les formats.",
          },
          {
            label: "Composants trop rigides",
            value:
              "Pourquoi : variants figés, impossible d'adapter sans détacher. Correction : composition par slots, propriétés bien pensées.",
          },
          {
            label: "Accessibilité ajoutée après",
            value:
              "Pourquoi : « on fera l'a11y en v2 ». Correction : critères d'acceptation incluant l'accessibilité dès le premier composant.",
          },
          {
            label: "Aucune mesure d'adoption",
            value:
              "Pourquoi : le système vit sans savoir s'il sert. Correction : couverture, instances détachées, satisfaction — publiées régulièrement.",
          },
        ],
      },
    ],
  },
  {
    id: "multi-plateformes",
    title: "Design system multi-plateformes",
    level: 3,
    intro:
      "Web, iOS, Android : un système, plusieurs implémentations.",
    blocks: [
      {
        kind: "text",
        text: "Les tokens sont partagés (via Style Dictionary : CSS, Swift, Kotlin générés depuis une source), mais les composants respectent les conventions de chaque plateforme : navigation, gestes, composants système natifs.",
      },
      {
        kind: "list",
        items: [
          "Tokens : source unique, formats générés par plateforme.",
          "Comportements : suivre les guidelines de la plateforme (Human Interface, Material) plutôt que forcer l'uniformité.",
          "Documentation : préciser les différences par plateforme sur chaque page composant.",
          "Tests : valider les contrastes et les cibles sur chaque plateforme (densités différentes).",
        ],
      },
    ],
  },
  {
    id: "design-tokens-outillage",
    title: "Outillage des tokens en pratique",
    level: 3,
    intro:
      "La chaîne complète : de Figma au code, sans ressaisie.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définir les tokens en JSON",
            detail:
              "Fichier source versionné en Git : la vérité unique. Format standard avec `value` et `type`, références entre tokens.",
          },
          {
            title: "Synchroniser avec Figma",
            detail:
              "Tokens Studio lit le JSON et applique les tokens aux styles et variables Figma : les designers travaillent avec les vraies valeurs.",
          },
          {
            title: "Générer les formats",
            detail:
              "Style Dictionary transforme le JSON en variables CSS, constantes Swift/Kotlin, etc. — automatiquement à chaque release.",
          },
          {
            title: "Consommer dans le code",
            detail:
              "Les composants code n'utilisent que les tokens générés. Aucune valeur en dur : le jour où le token change, tout suit.",
          },
        ],
      },
    ],
  },
  {
    id: "tests-visuels",
    title: "Tests visuels et non-régression",
    level: 3,
    intro:
      "Empêcher les régressions visuelles quand le système évolue.",
    blocks: [
      {
        kind: "text",
        text: "Chaque modification de token ou de composant peut impacter des centaines d'écrans. Les tests de non-régression visuelle (ex. Chromatic, intégré à Storybook) capturent les composants à chaque changement et signalent les différences pixel par pixel avant publication.",
      },
      {
        kind: "list",
        items: [
          "Captures de référence pour chaque variant de chaque composant.",
          "Revue humaine des différences détectées : intentionnelles (changelog) ou régressions.",
          "Tests d'accessibilité automatisés (axe) intégrés à Storybook : chaque story est auditée.",
          "La release n'est publiée que si les tests passent : la qualité est une porte, pas une intention.",
        ],
      },
    ],
  },
  {
    id: "design-ops",
    title: "Design Ops : faire vivre le système",
    level: 3,
    intro:
      "Le système est un produit : il a besoin d'opérations.",
    blocks: [
      {
        kind: "fields",
        title: "Les rituels qui entretiennent le système",
        fields: [
          {
            label: "Revue des contributions",
            value: "Cadence fixe (ex. bi-mensuelle) : les propositions sont examinées, acceptées ou refusées avec justification.",
          },
          {
            label: "Release notes",
            value: "Chaque version documentée : ajouts, changements, migrations — diffusée aux équipes.",
          },
          {
            label: "Office hours",
            value: "Plage régulière où les équipes posent leurs questions : réduit les usages hors système par incompréhension.",
          },
          {
            label: "Audit périodique",
            value: "Trimestriel : couverture, dette, satisfaction. Le système est re-priorisé sur données, pas sur opinions.",
          },
        ],
      },
    ],
  },
  {
    id: "checklist-maturite",
    title: "Checklist de maturité d'un design system",
    level: 3,
    intro:
      "Évaluer honnêtement où en est un système : cinq niveaux.",
    blocks: [
      {
        kind: "table",
        headers: ["Niveau", "État", "Signes"],
        rows: [
          ["1 — Inventaire", "On liste l'existant", "Bibliothèque de captures, quasi-doublons identifiés"],
          ["2 — Bibliothèque", "Composants réutilisables", "Figma library publiée, mais doc et gouvernance absentes"],
          ["3 — Système", "Règles et tokens", "Tokens versionnés, documentation d'usage, code synchronisé"],
          ["4 — Gouverné", "Le système vit", "Contributions, releases, métriques d'adoption suivies"],
          ["5 — Produit", "Le système sert la stratégie", "Multi-thèmes, multi-plateformes, adoption mesurée > 80 %"],
        ],
      },
      {
        kind: "text",
        text: "La plupart des « design systems » stagnent au niveau 2. Passer au niveau 3 exige la documentation et les tokens versionnés ; au niveau 4, la gouvernance et les métriques. Nommer son niveau réel est la première étape pour progresser.",
      },
    ],
  },
  {
    id: "exercice-tokeniser-30-min",
    title: "Exercice : tokeniser un écran en 30 minutes",
    level: 3,
    intro:
      "Extraire les tokens d'un écran existant : l'exercice fondateur.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir un écran dense (5 min)",
            detail:
              "Un écran réel avec boutons, champs, cartes, textes variés. Capturer ou ouvrir la maquette.",
          },
          {
            title: "Extraire les valeurs (10 min)",
            detail:
              "Lister toutes les couleurs, tailles de texte, espacements, rayons, ombres. Compter les quasi-doublons.",
          },
          {
            title: "Fusionner et nommer (10 min)",
            detail:
              "Regrouper les quasi-doublons, nommer en tokens sémantiques (3 niveaux : primitifs → sémantiques).",
          },
          {
            title: "Écrire le fichier (5 min)",
            detail:
              "Produire le `:root` CSS des tokens. Vérifier : chaque valeur de l'écran est-elle couverte par un token ?",
          },
        ],
      },
    ],
  },
  {
    id: "projet-mini-systeme",
    title: "Projet : un mini design system documenté",
    level: 3,
    intro:
      "Le projet complet : tokens, 10 composants, documentation, gouvernance.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Auditer et cadrer",
            detail:
              "Choisir un périmètre (ex. un produit fictif ou réel) : audit express, périmètre v1 (tokens + 10 composants prioritaires).",
          },
          {
            title: "Construire les fondations",
            detail:
              "Tokens en 3 niveaux (JSON + CSS), échelles d'espacement/typo/rayons/ombres, deux thèmes (clair/sombre).",
          },
          {
            title: "Construire les composants",
            detail:
              "10 composants : bouton, champ, select, case à cocher, radio, badge, carte, alerte, modale, tooltip. Variants, états, accessibilité.",
          },
          {
            title: "Documenter",
            detail:
              "Site ou document : fondations, page par composant (usage, contre-exemples, accessibilité), modèle de contribution.",
          },
          {
            title: "Simuler la gouvernance",
            detail:
              "Rédiger : rôles, critères d'acceptation, processus de release, métriques d'adoption. Proposer un 11e composant via le processus.",
          },
        ],
      },
      {
        kind: "text",
        text: "Critère de réussite : une personne extérieure peut construire un nouvel écran cohérent en n'utilisant que le système et sa documentation, sans poser de question.",
      },
    ],
  },
  {
    id: "patterns-vs-composants",
    title: "Patterns vs composants : la distinction",
    level: 3,
    intro:
      "Savoir quand documenter un assemblage plutôt que créer un composant.",
    blocks: [
      {
        kind: "text",
        text: "Un composant est un élément réutilisable générique (bouton, champ). Un pattern est un assemblage documenté de composants pour un besoin récurrent (formulaire de connexion, barre de recherche avec filtres, état vide). La confusion des deux produit soit des composants trop spécifiques, soit des patterns jamais documentés.",
      },
      {
        kind: "fields",
        title: "Décider : composant ou pattern ?",
        fields: [
          {
            label: "Composant",
            value:
              "Usage générique, API stable, plusieurs contextes : bouton, badge, tooltip. Il entre dans la bibliothèque et le code.",
          },
          {
            label: "Pattern",
            value:
              "Assemblage pour un besoin métier récurrent : tunnel d'inscription, tableau avec actions. Documenté avec exemples, pas forcément codé en dur.",
          },
          {
            label: "One-off",
            value:
              "Usage unique : ne rejoint ni la bibliothèque ni les patterns. Le forcer dans le système crée de la complexité inutile.",
          },
        ],
      },
      {
        kind: "text",
        text: "Test : si la « variante » ne sert qu'un écran, c'est un one-off déguisé. Le système grandit par les besoins répétés, pas par l'exhaustivité théorique.",
      },
    ],
  },
  {
    id: "iconographie-systeme",
    title: "L'iconographie dans le système",
    level: 3,
    intro:
      "Les icônes sont des composants : elles méritent les mêmes règles.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un seul style de trait (épaisseur, terminaisons, coins) pour tout le set ; une seule grille (ex. 24 × 24).",
          "Nommage sémantique (`icon-arrow-right`, pas `icon-12`) et recherche par mots-clés dans la bibliothèque.",
          "Tailles optiques : une icône à 16 px n'est pas une icône 24 px réduite — prévoir les tailles d'usage.",
          "Accessibilité : icônes décoratives marquées comme telles, icônes fonctionnelles avec nom accessible.",
          "Processus d'ajout : comme les composants (proposition, revue, documentation) — sinon le set diverge en quelques mois.",
        ],
      },
    ],
  },
  {
    id: "comportements-interactifs-spec",
    title: "Spécifier les comportements interactifs",
    level: 3,
    intro:
      "Un composant n'est pas qu'un visuel : ses comportements font partie du système.",
    blocks: [
      {
        kind: "fields",
        title: "Comportements à spécifier par composant",
        fields: [
          {
            label: "Clavier",
            value: "Touches supportées, ordre de tabulation, pièges éventuels (modales).",
          },
          {
            label: "États temporels",
            value: "Délais (tooltip après 500 ms ?), durées d'animation, comportements de chargement.",
          },
          {
            label: "Cas limites",
            value: "Texte long, contenu vide, erreur réseau : dessiner chaque cas, pas seulement le cas nominal.",
          },
          {
            label: "Responsive",
            value: "Points de rupture du composant, comportement en auto-layout, troncatures autorisées ou non.",
          },
        ],
      },
      {
        kind: "text",
        text: "Format : une section « Comportement » dans la page de documentation de chaque composant, avec prototypes Figma quand le mouvement est en jeu. Un composant dont le comportement n'est pas spécifié sera implémenté différemment par chaque développeur.",
      },
    ],
  },
  {
    id: "dark-mode-tokens-systeme",
    title: "Le mode sombre dans l'architecture des tokens",
    level: 3,
    intro:
      "Le thème sombre comme simple jeu de valeurs : mise en œuvre concrète.",
    blocks: [
      {
        kind: "text",
        text: "Grâce aux trois niveaux de tokens, le mode sombre ne touche que les valeurs des tokens sémantiques. En CSS : un sélecteur `[data-theme=\"dark\"]` qui surcharge les valeurs. En Figma : un mode de variables par thème.",
      },
      {
        kind: "code",
        language: "css",
        title: "Thème sombre par surcharge de tokens",
        code: ":root {\n  --color-surface-base: hsl(0, 0%, 100%);\n  --color-text-primary: hsl(220, 15%, 12%);\n}\n[data-theme=\"dark\"] {\n  --color-surface-base: hsl(220, 15%, 8%);\n  --color-text-primary: hsl(220, 15%, 92%);\n}",
      },
      {
        kind: "list",
        items: [
          "Ne surcharger que les sémantiques : les primitifs restent identiques.",
          "Valider chaque thème : contrastes, focus, daltonisme — indépendamment.",
          "Tester la transition : bascule instantanée ou fondu court, jamais de flash blanc.",
        ],
      },
    ],
  },
  {
    id: "dette-visuelle-tracking",
    title: "Suivre et résorber la dette visuelle",
    level: 3,
    intro:
      "La dette visuelle est mesurable : l'instrumenter comme la dette technique.",
    blocks: [
      {
        kind: "fields",
        title: "Les indicateurs de dette",
        fields: [
          {
            label: "Composants legacy",
            value: "Nombre d'écrans utilisant encore les anciens composants : la courbe doit décroître.",
          },
          {
            label: "Valeurs hors tokens",
            value: "Couleurs ou espacements en dur dans le code ou les maquettes : à extraire vers des tokens.",
          },
          {
            label: "Instances détachées",
            value: "En Figma : signale des composants inadaptés ou des contournements — à analyser, pas seulement à compter.",
          },
          {
            label: "Écrans non migrés",
            value: "Liste explicite des écrans restants : la dette nommée est une dette gérable.",
          },
        ],
      },
      {
        kind: "text",
        text: "Rituel : revue trimestrielle de la dette avec les équipes produit, priorisation partagée. Une dette invisible est une dette qui grandit ; une dette publiée se résorbe.",
      },
    ],
  },
  {
    id: "onboarding-equipes",
    title: "Onboarder les équipes sur le système",
    level: 3,
    intro:
      "L'adoption ne se décrète pas : elle se conçoit.",
    blocks: [
      {
        kind: "list",
        items: [
          "Guide de démarrage en 30 minutes : installer la library, construire un premier écran, trouver la documentation.",
          "Exemples copiables : templates d'écrans types (formulaire, liste, détail) assemblés avec le système.",
          "Canal de questions identifié (office hours, canal dédié) : une question sans réponse devient un contournement.",
          "Célébrer les migrations : montrer les avant/après, chiffrer le temps gagné — l'adhésion se nourrit de preuves.",
          "Former les nouveaux arrivants : le système fait partie de l'onboarding, pas d'une lecture optionnelle.",
        ],
      },
    ],
  },
  {
    id: "exercice-audit-systeme-30-min",
    title: "Exercice : auditer un design system en 30 minutes",
    level: 3,
    intro:
      "Évaluer un système existant avec la checklist de maturité.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Prendre un système public (5 min)",
            detail:
              "Choisir un design system open source (Material 3, Carbon, Polaris…) et ouvrir sa documentation.",
          },
          {
            title: "Évaluer les couches (10 min)",
            detail:
              "Fondations, composants, patterns, règles, gouvernance : noter ce qui existe et ce qui manque. Attribuer un niveau de maturité (1–5).",
          },
          {
            title: "Auditer un composant (10 min)",
            detail:
              "Prendre le bouton : variants, états, accessibilité, code, contre-exemples. Lister 3 points forts et 3 manques.",
          },
          {
            title: "Formuler 3 recommandations (5 min)",
            detail:
              "Si c'était votre système : les 3 actions prioritaires pour passer au niveau suivant, avec leur justification.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-audit-systeme-existant",
    title: "Projet : audit d'un design system existant",
    level: 3,
    intro:
      "Le projet d'audit : mesurer l'usage réel et recommander.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Mesurer l'usage réel",
            detail:
              "Couverture des composants, instances détachées, valeurs hors tokens : chiffrer l'adoption réelle, pas déclarée.",
          },
          {
            title: "Évaluer la documentation",
            detail:
              "Chaque composant a-t-il sa page (usage, contre-exemples, accessibilité) ? Noter les pages manquantes ou obsolètes.",
          },
          {
            title: "Interviewer les équipes",
            detail:
              "5 interviews courtes : qu'est-ce qui fait gagner du temps ? Qu'est-ce qui manque ? Quels contournements ?",
          },
          {
            title: "Restituer en recommandations",
            detail:
              "Rapport : niveau de maturité, 5 recommandations priorisées (impact × effort), roadmap proposée sur 2 trimestres.",
          },
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite",
    level: 3,
    intro:
      "Les compétences de la roadmap UX Designer qui prolongent le design system.",
    blocks: [
      {
        kind: "fields",
        title: "Continuer dans la roadmap ux-designer",
        fields: [
          {
            label: "Figma (`figma`)",
            value:
              "Maîtriser l'outillage concret : variants, variables, libraries — là où le système est construit au quotidien.",
          },
          {
            label: "Accessibilité (`accessibilite-design`)",
            value:
              "Faire de l'accessibilité une propriété du système : critères WCAG, tests, specs transmises aux développeurs.",
          },
          {
            label: "UI Design (`ui-design`)",
            value:
              "Approfondir la rigueur des composants : la qualité d'un système ne dépasse jamais celle de ses composants.",
          },
          {
            label: "Motion Design (`motion-design`)",
            value:
              "Ajouter le mouvement au système : tokens de durées et d'easing, chorégraphies documentées.",
          },
          {
            label: "Portfolio (`portfolio`)",
            value:
              "Raconter la construction d'un système en case study : audit, décisions, adoption mesurée — un sujet très valorisé.",
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
      "Les références réelles sur les design systems.",
    blocks: [
      {
        kind: "fields",
        title: "Livres et références réels",
        fields: [
          {
            label: "Design Systems (livre)",
            value:
              "Alla Kholmatova — l'approche par les patterns et le langage partagé, la référence fondatrice.",
          },
          {
            label: "Laying the Foundations (livre)",
            value: "Andrew Couldwell — la construction d'un design system en pratique, de l'audit à la gouvernance.",
          },
          {
            label: "Storybook",
            value: "https://storybook.js.org/ — catalogue et documentation des composants implémentés.",
          },
          {
            label: "Material Design 3",
            value: "https://m3.material.io/ — un design system complet et open source à étudier (tokens, composants, règles).",
          },
        ],
      },
    ],
  },
];

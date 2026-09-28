import type { LearningSection } from "../skill-guides";

/**
 * Learning Page des design systems : tokens, composants, documentation,
 * accessibilité, gouvernance — construire une source unique de vérité
 * partagée entre design et code.
 */
export const LEARNING_DESIGN_SYSTEMS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Un design system est l'ensemble des tokens, composants et règles qui garantissent la cohérence d'un produit.",
    blocks: [
      {
        kind: "text",
        text: "Sans design system, chaque équipe réinvente ses boutons, ses espacements, ses couleurs : incohérences visuelles, dette, temps perdu. Avec un design system, ces décisions sont prises une fois, nommées, versionnées, documentées — et chaque produit les consomme au lieu de les redécouvrir.",
      },
      {
        kind: "text",
        text: "Trois couches : les design tokens (les valeurs fondamentales : couleurs, espacements, typographies), les composants (boutons, champs, modales — construits sur les tokens), et les règles (quand utiliser quoi, comment contribuer, qui décide). Les outils (Storybook, tests, documentation) rendent ces couches visibles et vérifiables.",
      },
      {
        kind: "text",
        text: "Un design system n'est pas une bibliothèque de composants « jolie » : c'est un produit en soi, avec des utilisateurs (les développeurs et designers des équipes), une API (les props), une documentation, un versionnage et une gouvernance. Cette page enseigne à le construire comme tel.",
      },
    ],
  },
  {
    id: "design-system-en-30-secondes",
    title: "Un design system en 30 secondes",
    level: 1,
    intro: "Les couches et leur relation.",
    blocks: [
      {
        kind: "diagram",
        title: "Les trois couches",
        lines: [
          "Design tokens",
          "  couleurs, espacements, typos, rayons, ombres",
          "  « les valeurs, nommées et versionnées »",
          "     │",
          "     ▼",
          "Composants",
          "  Button, Input, Modal, Card… construits sur les tokens",
          "  « les briques, avec variants et états »",
          "     │",
          "     ▼",
          "Règles",
          "  usage, contribution, versionnage, gouvernance, accessibilité",
          "  « le contrat social du système »",
          "",
          "Outils : Storybook (atelier), tests (garde-fous), docs (mémoire).",
        ],
      },
      {
        kind: "text",
        text: "Retenez le flux : une décision de design devient un token, les tokens composent des composants, les composants sont documentés et versionnés, la gouvernance décide des évolutions. Chaque couche protège la précédente de l'érosion.",
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
    intro: "Ce qu'il faut maîtriser avant de construire un design system.",
    blocks: [
      {
        kind: "fields",
        title: "Fondations indispensables",
        fields: [
          {
            label: "CSS moderne",
            value:
              "Variables (`--token`), cascade, spécificité, flexbox/grid : les design tokens sont du CSS industrialisé.",
          },
          {
            label: "React — composants",
            value:
              "Props, composition, `children` : la bibliothèque vit dans le framework de l'équipe.",
          },
          {
            label: "TypeScript — props",
            value:
              "Interfaces de props, unions de littéraux pour les variants : le contrat des composants.",
          },
          {
            label: "Accessibilité — bases",
            value:
              "Contrastes, navigation clavier, labels : un composant partagé doit être accessible par construction.",
          },
          {
            label: "npm — publication",
            value:
              "Versionnage sémantique, `package.json` : le système se distribue comme un paquet.",
          },
        ],
      },
    ],
  },
  {
    id: "installation-storybook",
    title: "Installer Storybook",
    level: 2,
    intro: "L'atelier du design system : développer les composants en isolation.",
    blocks: [
      {
        kind: "command",
        label: "Initialiser Storybook dans le projet",
        command: "npx storybook@latest init",
        why: "Détecte le framework (React, Vue, Angular…), installe les dépendances nécessaires, crée le dossier `.storybook` et ajoute les scripts `storybook` / `build-storybook` au `package.json`. C'est la commande d'installation officielle : un atelier où chaque composant se développe et se documente isolément.",
        verify: "ls .storybook",
      },
      {
        kind: "command",
        label: "Lancer l'atelier",
        command: "npm run storybook",
        why: "Démarre le serveur de développement Storybook (port 6006 par défaut) : chaque composant s'affiche avec ses variants, ses contrôles et sa documentation, sans passer par l'application.",
        verify: "curl -s -o /dev/null -w \"%{http_code}\" http://localhost:6006",
      },
      {
        kind: "text",
        text: "Storybook n'est pas livré en production : c'est un outil de développement et de documentation. Le `build-storybook` produit un site statique déployable comme documentation vivante — la vitrine du système.",
      },
    ],
  },
  {
    id: "tokens-css-premiers",
    title: "Premiers design tokens",
    level: 2,
    intro: "Les variables CSS comme fondation du système.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "tokens.css",
        code: `:root {\n  /* Couleurs : nommées par intention, pas par valeur */\n  --color-primary: #1a73e8;\n  --color-primary-hover: #1558b0;\n  --color-danger: #d93025;\n  --color-text: #1f1f1f;\n  --color-text-muted: #5f6368;\n  --color-surface: #ffffff;\n  --color-border: #dadce0;\n\n  /* Espacements : échelle régulière */\n  --space-1: 4px;\n  --space-2: 8px;\n  --space-3: 12px;\n  --space-4: 16px;\n  --space-6: 24px;\n  --space-8: 32px;\n\n  /* Typographie */\n  --font-sans: "Inter", system-ui, sans-serif;\n  --text-sm: 0.875rem;\n  --text-md: 1rem;\n  --text-lg: 1.25rem;\n\n  /* Rayons et ombres */\n  --radius-sm: 4px;\n  --radius-md: 8px;\n  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.08);\n}`,
      },
      {
        kind: "list",
        items: [
          "Nommer par intention (`--color-primary`) pas par valeur (`--blue-500`) : quand la charte change, le nom reste valide.",
          "Échelle d'espacements régulière (multiples de 4) : les rythmes visuels deviennent automatiques.",
          "Un seul fichier source : toute l'équipe consomme les mêmes valeurs, une modification se propage partout.",
        ],
      },
    ],
  },
  {
    id: "premier-composant",
    title: "Premier composant : le bouton",
    level: 2,
    intro: "Le composant le plus simple — et le plus révélateur de la méthode.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définir les variants comme des littéraux",
            detail:
              "`variant?: \"primary\" | \"secondary\" | \"ghost\"`, `size?: \"sm\" | \"md\" | \"lg\"`. Les variants sont un vocabulaire fini, pas des props libres.",
          },
          {
            title: "Construire sur les tokens",
            detail:
              "Le CSS du bouton n'utilise que des variables (`var(--color-primary)`, `var(--space-3)`) : aucune valeur en dur.",
          },
          {
            title: "Étendre les props natives",
            detail:
              "`extends React.ButtonHTMLAttributes<HTMLButtonElement>` : le bouton accepte `onClick`, `disabled`, `aria-label` — tout l'écosystème natif.",
          },
          {
            title: "Gérer les états",
            detail:
              "`disabled`, `aria-disabled`, focus visible : les états font partie du composant, pas du code appelant.",
          },
          {
            title: "Écrire la story",
            detail:
              "Une story par variant dans Storybook : la matrice des états devient visible et révisable par le design.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Button.tsx",
        code: `import type { ButtonHTMLAttributes } from "react";\n\ninterface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {\n  variant?: "primary" | "secondary" | "ghost";\n  size?: "sm" | "md" | "lg";\n}\n\nexport function Button({\n  variant = "primary",\n  size = "md",\n  className = "",\n  ...rest\n}: ButtonProps) {\n  return (\n    <button\n      className={\`btn btn--\${variant} btn--\${size} \${className}\`}\n      {...rest}\n    />\n  );\n}`,
      },
    ],
  },
  {
    id: "premiere-story",
    title: "Première story",
    level: 2,
    intro: "Documenter le bouton dans Storybook : le format CSF.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Button.stories.tsx",
        code: `import type { Meta, StoryObj } from "@storybook/react";\nimport { Button } from "./Button";\n\nconst meta: Meta<typeof Button> = {\n  title: "Components/Button",\n  component: Button,\n  argTypes: {\n    variant: { control: "select", options: ["primary", "secondary", "ghost"] },\n    size: { control: "radio", options: ["sm", "md", "lg"] },\n  },\n};\nexport default meta;\n\ntype Story = StoryObj<typeof meta>;\n\nexport const Primary: Story = {\n  args: { children: "Envoyer", variant: "primary" },\n};\n\nexport const Disabled: Story = {\n  args: { children: "Envoyer", disabled: true },\n};\n\nexport const AllVariants: Story = {\n  render: () => (\n    <div style={{ display: "flex", gap: "8px" }}>\n      <Button variant="primary">Primary</Button>\n      <Button variant="secondary">Secondary</Button>\n      <Button variant="ghost">Ghost</Button>\n    </div>\n  ),\n};`,
      },
      {
        kind: "text",
        text: "Chaque story est un cas d'usage nommé et rejouable : `Primary`, `Disabled`, `AllVariants`. Les `argTypes` génèrent des contrôles interactifs — le design peut tester les combinaisons sans écrire de code. Les stories sont aussi la matière première des tests visuels.",
      },
    ],
  },
  {
    id: "documentation-usage",
    title: "Documenter l'usage",
    level: 2,
    intro: "Un composant sans documentation sera mal utilisé, aussi bon soit-il.",
    blocks: [
      {
        kind: "fields",
        title: "Ce que chaque composant documente",
        fields: [
          {
            label: "Quand l'utiliser",
            value:
              "Le cas nominal (`primary` pour l'action principale) et les cas limites : un composant a un périmètre, pas seulement des props.",
          },
          {
            label: "Quand NE PAS l'utiliser",
            value:
              "Les contre-exemples sont aussi importants : « pour une action destructive, utilisez le bouton danger, pas le ghost ».",
          },
          {
            label: "Exemples de code",
            value:
              "2-3 usages réels copiables : l'exemple vaut mieux que la description des props.",
          },
          {
            label: "Accessibilité",
            value:
              "Comportement clavier, rôles ARIA, ce que le composant garantit et ce qui reste à la charge de l'appelant.",
          },
          {
            label: "Props",
            value:
              "Générées automatiquement depuis les types TypeScript : une seule source de vérité.",
          },
        ],
      },
    ],
  },
  {
    id: "editeurs",
    title: "Éditeurs et design system",
    level: 2,
    intro: "L'outillage quotidien du développement de composants.",
    blocks: [
      {
        kind: "fields",
        title: "VS Code — réflexes composants",
        fields: [
          {
            label: "Autocomplétion des tokens",
            value:
              "Avec les variables CSS, l'éditeur propose les tokens existants : impossible d'inventer une couleur hors charte.",
          },
          {
            label: "Autocomplétion des variants",
            value:
              "Les unions de littéraux (`\"primary\" | \"secondary\"`) proposent les variants : la documentation dans l'éditeur.",
          },
          {
            label: "`F12` sur un composant",
            value:
              "Saute à sa définition : vérifiez les props et les variants avant usage plutôt que de deviner.",
          },
          {
            label: "Aperçu Storybook",
            value:
              "Gardez l'onglet Storybook ouvert à côté : chaque modification du composant s'y reflète via le rechargement à chaud.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-contribution",
    title: "Contribuer au système",
    level: 2,
    intro: "Le flux standard : de la demande au composant publié.",
    blocks: [
      {
        kind: "diagram",
        title: "Cycle de contribution",
        lines: [
          "Besoin (une équipe a besoin d'un composant)",
          "      ↓",
          "Proposition (le composant existe-t-il déjà ? peut-on composer ?)",
          "      ↓",
          "Design (maquette, variants, états, accessibilité)",
          "      ↓",
          "Implémentation (tokens, composant, stories, tests)",
          "      ↓",
          "Revue (design + code + a11y)",
          "      ↓",
          "Publication (version sémantique, changelog)",
          "      ↓",
          "Adoption (les équipes migrent à leur rythme)",
        ],
      },
      {
        kind: "text",
        text: "La première question n'est jamais « comment le construire ? » mais « existe-t-il déjà ? ». La plupart des « nouveaux composants » sont des compositions de l'existant — c'est le signe que le système fonctionne.",
      },
    ],
  },
  {
    id: "versioning",
    title: "Versionner le système",
    level: 2,
    intro: "Semver : les équipes adoptent les changements à leur rythme.",
    blocks: [
      {
        kind: "command",
        label: "Publier une version patch",
        command: "npm version patch",
        why: "Incrémente la version patch (`1.2.3` → `1.2.4`), crée le commit et le tag Git. Le versionnage sémantique est le contrat de confiance : `patch` = correction sans changement visible, `minor` = ajout compatible, `major` = changement cassant.",
        verify: "git tag --list | tail -3",
      },
      {
        kind: "table",
        headers: ["Version", "Quand", "Exemple"],
        rows: [
          ["`patch` (`1.2.3` → `1.2.4`)", "Correction de bug sans changement visible", "Contraste du bouton corrigé"],
          ["`minor` (`1.2.3` → `1.3.0`)", "Nouveau composant ou variant, compatible", "Nouveau variant `danger`"],
          ["`major` (`1.2.3` → `2.0.0`)", "Changement cassant", "Prop `type` renommée en `variant`"],
        ],
      },
      {
        kind: "text",
        text: "Chaque version s'accompagne d'un changelog : ce qui change, ce qui casse, comment migrer. Les équipes épinglent leur version et montent quand elles sont prêtes — jamais de mise à jour surprise qui casse dix applications.",
      },
    ],
  },
  {
    id: "erreurs-frequentes-debut",
    title: "Erreurs fréquentes au début",
    level: 2,
    intro: "Les trois erreurs que tout débutant commet sur un design system.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue express",
        fields: [
          {
            label: "Valeurs en dur dans les composants",
            value:
              "`color: #1a73e8` au lieu de `var(--color-primary)` : le token existe mais n'est pas utilisé. Le jour où la charte change, ce composant est oublié.",
          },
          {
            label: "Trop de props, pas de variants",
            value:
              "Un bouton à 40 props (`borderRadius`, `fontWeight`…) n'est plus un composant système : c'est une `div` déguisée. Les variants finis cadrent les usages.",
          },
          {
            label: "Documenter après coup",
            value:
              "« On documentera plus tard » = jamais. La story et la doc s'écrivent avec le composant, dans la même PR.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-progressifs",
    title: "Projets progressifs",
    level: 2,
    intro: "Quatre projets pour ancrer les design systems.",
    blocks: [
      {
        kind: "fields",
        title: "Par niveau",
        fields: [
          {
            label: "Beginner — Tokens d'un mini-site",
            value:
              "Extraire les couleurs, espacements et typos d'une page en variables CSS. Objectif : nommer par intention.",
          },
          {
            label: "Intermediate — 5 composants + Storybook",
            value:
              "Button, Input, Badge, Card, Modal avec variants, stories et tokens. Objectif : la méthode complète sur un périmètre réduit.",
          },
          {
            label: "Advanced — Thème sombre",
            value:
              "Décliner tous les tokens en thème sombre via `[data-theme=\"dark\"]`. Objectif : les tokens comme abstraction.",
          },
          {
            label: "Professional — Migration d'une app",
            value:
              "Auditer les écarts, remplacer progressivement, tests de non-régression visuelle. Objectif : l'adoption en conditions réelles.",
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "tokens-couleurs",
    title: "Tokens de couleurs",
    level: 3,
    intro: "Nommer les couleurs par rôle, organiser les échelles.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Échelle et rôles",
        code: `/* 1. Palette brute : les valeurs (rarement utilisées directement) */\n:root {\n  --blue-500: #1a73e8;\n  --blue-600: #1558b0;\n  --red-500: #d93025;\n  --grey-100: #f1f3f4;\n  --grey-900: #1f1f1f;\n}\n\n/* 2. Tokens sémantiques : les rôles (ce que les composants utilisent) */\n:root {\n  --color-primary: var(--blue-500);\n  --color-primary-hover: var(--blue-600);\n  --color-danger: var(--red-500);\n  --color-text: var(--grey-900);\n  --color-surface: #ffffff;\n}\n\n/* 3. Thème sombre : seuls les rôles changent */\n[data-theme="dark"] {\n  --color-text: #e8eaed;\n  --color-surface: #1f1f1f;\n  --color-primary: #8ab4f8;\n}`,
      },
      {
        kind: "text",
        text: "Deux niveaux : la palette (valeurs brutes) et les tokens sémantiques (rôles). Les composants n'utilisent que les rôles — le thème sombre ne redéfinit que les rôles, la palette reste intacte. C'est cette indirection qui rend le théming trivial.",
      },
    ],
  },
  {
    id: "tokens-espacements",
    title: "Tokens d'espacement",
    level: 3,
    intro: "Le rythme vertical et horizontal comme système.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Échelle d'espacement",
        code: `:root {\n  --space-0: 0;\n  --space-1: 4px; /* unité de base */\n  --space-2: 8px;\n  --space-3: 12px;\n  --space-4: 16px;\n  --space-6: 24px;\n  --space-8: 32px;\n  --space-12: 48px;\n  --space-16: 64px;\n}\n\n.card {\n  padding: var(--space-4);\n  gap: var(--space-3);\n  margin-bottom: var(--space-6);\n}`,
      },
      {
        kind: "list",
        items: [
          "Base 4px (ou 8px) : tous les espacements sont des multiples — les alignements deviennent automatiques.",
          "Échelle non linéaire : les grands sauts (`32 → 48 → 64`) évitent l'accumulation de valeurs intermédiaires inutiles.",
          "Bannir les valeurs « magiques » (`margin: 13px`) : si l'échelle ne convient pas, c'est l'échelle qu'on ajuste — une fois, pour tous.",
        ],
      },
    ],
  },
  {
    id: "tokens-typographie",
    title: "Tokens de typographie",
    level: 3,
    intro: "Échelle typographique : tailles, graisses, hauteurs de ligne.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Échelle typographique",
        code: `:root {\n  --font-sans: "Inter", system-ui, -apple-system, sans-serif;\n  --font-mono: "JetBrains Mono", ui-monospace, monospace;\n\n  --text-xs: 0.75rem; /* 12px */\n  --text-sm: 0.875rem; /* 14px */\n  --text-md: 1rem; /* 16px — corps de texte */\n  --text-lg: 1.25rem; /* 20px */\n  --text-xl: 1.5rem; /* 24px */\n  --text-2xl: 2rem; /* 32px */\n\n  --leading-tight: 1.25;\n  --leading-normal: 1.5;\n  --leading-relaxed: 1.75;\n\n  --weight-regular: 400;\n  --weight-medium: 500;\n  --weight-bold: 700;\n}\n\n/* Les composants composent, ne réinventent pas */\n.heading {\n  font: var(--weight-bold) var(--text-xl) / var(--leading-tight) var(--font-sans);\n}`,
      },
      {
        kind: "text",
        text: "Une échelle typographique limite les tailles à 6-8 paliers : chaque niveau a un rôle (titre, sous-titre, corps, légende). Les composants typographiques (`Heading`, `Text`) encapsulent ces combinaisons — personne n'écrit `font-size` à la main.",
      },
    ],
  },
  {
    id: "tokens-rayons-ombres",
    title: "Rayons, ombres et bordures",
    level: 3,
    intro: "Les tokens « d'ambiance » : ce qui fait la patte visuelle.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Profondeur et contours",
        code: `:root {\n  --radius-sm: 4px;\n  --radius-md: 8px;\n  --radius-lg: 12px;\n  --radius-full: 9999px; /* pills, avatars */\n\n  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.06);\n  --shadow-md: 0 4px 12px rgb(0 0 0 / 0.1);\n  --shadow-lg: 0 12px 32px rgb(0 0 0 / 0.16);\n\n  --border-width: 1px;\n  --color-border: #dadce0;\n}\n\n.card {\n  border-radius: var(--radius-md);\n  box-shadow: var(--shadow-sm);\n  border: var(--border-width) solid var(--color-border);\n}`,
      },
      {
        kind: "text",
        text: "Rayons et ombres portent l'identité : un système « sharp » (rayons à 0-2px) ne ressemble pas à un système « friendly » (12px+). Les figer en tokens, c'est verrouiller la patte visuelle — et pouvoir la faire évoluer globalement.",
      },
    ],
  },
  {
    id: "theming",
    title: "Théming : clair, sombre, et plus",
    level: 3,
    intro: "Plusieurs thèmes sans dupliquer les composants.",
    blocks: [
      {
        kind: "code",
        language: "css",
        title: "Thèmes par redéfinition de rôles",
        code: `/* Les composants utilisent les rôles : aucun changement ici */\n.button-primary {\n  background: var(--color-primary);\n  color: var(--color-on-primary);\n}\n\n/* Thème clair (défaut) */\n:root {\n  --color-primary: #1a73e8;\n  --color-on-primary: #ffffff;\n  --color-surface: #ffffff;\n}\n\n/* Thème sombre : on redéfinit les rôles */\n[data-theme="dark"] {\n  --color-primary: #8ab4f8;\n  --color-on-primary: #0a0a0a;\n  --color-surface: #1f1f1f;\n}\n\n/* Contraste renforcé : un troisième thème, même mécanisme */\n[data-theme="contrast"] {\n  --color-primary: #000000;\n  --color-on-primary: #ffffff;\n}`,
      },
      {
        kind: "list",
        items: [
          "Mécanisme : les composants consomment des rôles, les thèmes redéfinissent les rôles — zéro duplication de composants.",
          "Bascule : attribut `data-theme` sur `<html>`, persisté en `localStorage`, initialisé avant le rendu pour éviter le flash.",
          "Tester les trois thèmes dans Storybook : un décorateur qui bascule `data-theme` expose tous les composants aux trois ambiances.",
          "Accessibilité : chaque thème doit passer les ratios de contraste — c'est un test, pas une impression.",
        ],
      },
    ],
  },
  {
    id: "nommage-tokens",
    title: "Nommage des tokens",
    level: 3,
    intro: "La convention de nommage est une API : elle se conçoit.",
    blocks: [
      {
        kind: "table",
        headers: ["Niveau", "Format", "Exemple"],
        rows: [
          ["Palette (valeurs)", "`--<famille>-<palier>`", "`--blue-500`, `--grey-100`"],
          ["Sémantique (rôles)", "`--<propriété>-<rôle>[-<état>]`", "`--color-primary-hover`, `--color-text-muted`"],
          ["Composant (spécifique)", "`--<composant>-<propriété>-<partie>`", "`--button-padding-x`, `--card-radius`"],
        ],
      },
      {
        kind: "list",
        items: [
          "Règle d'or : nommer par intention, pas par valeur — `--color-danger` survit au changement de teinte, `--red-500` non (sauf au niveau palette).",
          "Trois niveaux max : global (palette) → sémantique (rôles) → composant (exceptions). Au-delà, c'est du bricolage.",
          "Les tokens de composant sont l'exception, pas la règle : un bouton qui a besoin de 12 tokens propres est probablement mal conçu.",
          "Documenter la convention : un nouveau contributeur doit pouvoir nommer un token sans demander.",
        ],
      },
    ],
  },
  {
    id: "anatomie-composant",
    title: "Anatomie d'un composant système",
    level: 3,
    intro: "Ce qui distingue un composant « système » d'un composant ordinaire.",
    blocks: [
      {
        kind: "fields",
        title: "Les six qualités",
        fields: [
          {
            label: "Tokens uniquement",
            value:
              "Aucune valeur en dur : couleurs, espacements, typos viennent des variables. Le composant suit la charte automatiquement.",
          },
          {
            label: "Variants finis",
            value:
              "Les variations sont un vocabulaire fermé (`variant`, `size`), pas des props libres. Fini = documentable, testable, exhaustif.",
          },
          {
            label: "Props natives héritées",
            value:
              "`extends ButtonHTMLAttributes` : le composant accepte tout ce que l'élément natif accepte — pas de réinvention.",
          },
          {
            label: "États gérés",
            value:
              "Disabled, loading, focus, erreurs : chaque état est dessiné, typé et testé dans le composant.",
          },
          {
            label: "Accessible par construction",
            value:
              "Rôles ARIA, clavier, focus visible, labels : l'appelant n'a pas à y penser — ou le moins possible.",
          },
          {
            label: "Documenté et versionné",
            value:
              "Stories, exemples, changelog : le composant est un produit avec des utilisateurs.",
          },
        ],
      },
    ],
  },
  {
    id: "composition",
    title: "Composition plutôt que configuration",
    level: 3,
    intro: "Le principe qui évite les composants à 40 props.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Composer au lieu de configurer",
        code: `// Mal : le composant connaît tous les cas\n// <Card title=\"x\" subtitle=\"y\" image=\"z\" footer=\"w\" actions={...} />\n\n// Bien : le composant fournit la structure, l'appelant compose\nfunction Card({ children }: { children: React.ReactNode }) {\n  return <article className="card">{children}</article>;\n}\n\nCard.Header = function Header({ children }: { children: React.ReactNode }) {\n  return <header className="card__header">{children}</header>;\n};\nCard.Body = function Body({ children }: { children: React.ReactNode }) {\n  return <div className="card__body">{children}</div>;\n};\n\n// Usage : composition explicite\n<Card>\n  <Card.Header>\n    <h2>Titre</h2>\n  </Card.Header>\n  <Card.Body>Contenu libre.</Card.Body>\n</Card>`,
      },
      {
        kind: "text",
        text: "Quand un composant accumule les props de contenu (`title`, `subtitle`, `imagePosition`…), c'est le signe qu'il faut le découper en parties composables. La composition déplace la flexibilité chez l'appelant sans gonfler l'API — voir les compound components ci-dessous.",
      },
    ],
  },
  {
    id: "variants",
    title: "Variants : le vocabulaire fini",
    level: 3,
    intro: "Concevoir les variants comme un langage, pas comme des options.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Variants typés et exhaustifs",
        code: `type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";\ntype ButtonSize = "sm" | "md" | "lg";\n\ninterface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {\n  variant?: ButtonVariant;\n  size?: ButtonSize;\n}\n\n// Table de styles : exhaustive par construction\nconst variantClasses: Record<ButtonVariant, string> = {\n  primary: "btn--primary",\n  secondary: "btn--secondary",\n  ghost: "btn--ghost\",\n  danger: "btn--danger\",\n};\n// Ajouter un variant au type sans l'ajouter ici → erreur de compilation`,
      },
      {
        kind: "list",
        items: [
          "Chaque variant répond à un usage : `primary` = action principale, `danger` = destruction, `ghost` = action tertiaire. Documentez le « quand ».",
          "La table `Record<Variant, string>` rend l'exhaustivité mécanique : impossible d'oublier un style.",
          "Limiter les combinaisons : `variant × size` = 12 cas testables. Si les variants se multiplient, c'est deux composants déguisés.",
          "Ne jamais exposer de props de style libre (`backgroundColor`, `fontSize`) : c'est la porte ouverte à la divergence.",
        ],
      },
    ],
  },
  {
    id: "compound-components",
    title: "Compound components",
    level: 3,
    intro: "Des composants qui se composent entre eux : le motif avancé.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Tabs en compound components",
        code: `// Chaque partie est un composant, l'état est partagé en interne\nfunction Tabs({ children, defaultValue }: { children: React.ReactNode; defaultValue: string }) {\n  const [value, setValue] = React.useState(defaultValue);\n  return (\n    <TabsContext.Provider value={{ value, setValue }}>\n      <div role="tablist">{children}</div>\n    </TabsContext.Provider>\n  );\n}\n\n// Usage : déclaratif, flexible, typé\n<Tabs defaultValue="account\">\n  <Tabs.List>\n    <Tabs.Trigger value="account\">Compte</Tabs.Trigger>\n    <Tabs.Trigger value="security\">Sécurité</Tabs.Trigger>\n  </Tabs.List>\n  <Tabs.Content value="account\">…</Tabs.Content>\n  <Tabs.Content value="security\">…</Tabs.Content>\n</Tabs>`,
      },
      {
        kind: "text",
        text: "Les compound components (`Tabs.Trigger`, `Tabs.Content`) partagent un état implicite via le contexte : l'appelant compose librement sans gérer la mécanique. C'est le motif des composants complexes (tabs, accordéons, menus) — flexible pour l'appelant, contrôlé pour le système.",
      },
    ],
  },
  {
    id: "accessibilite-fondations",
    title: "Accessibilité : fondations",
    level: 3,
    intro: "Un composant partagé multiplie son accessibilité — ou ses défauts — par chaque usage.",
    blocks: [
      {
        kind: "fields",
        title: "Les garanties du système",
        fields: [
          {
            label: "Contrastes",
            value:
              "Chaque combinaison texte/fond des tokens passe le ratio WCAG AA (4.5:1 pour le texte courant). Vérifié par test, pas à l'œil.",
          },
          {
            label: "Sémantique HTML",
            value:
              "Utiliser les bons éléments (`<button>`, pas `<div onClick>`) : 80 % de l'accessibilité vient du HTML correct.",
          },
          {
            label: "Labels",
            value:
              "Tout contrôle a un nom accessible (`label`, `aria-label`) : un champ sans label est inutilisable au lecteur d'écran.",
          },
          {
            label: "Focus visible",
            value:
              "Un style de focus distinct et systématique (`:focus-visible`) : la navigation clavier doit se voir.",
          },
          {
            label: "Pas d'info par la couleur seule",
            value:
              "Une erreur signalée uniquement en rouge est invisible aux daltoniens : icône + texte, toujours.",
          },
        ],
      },
      {
        kind: "text",
        text: "L'accessibilité d'un design system est un multiplicateur : un bouton accessible rend accessibles les mille endroits où il est utilisé — et un bouton inaccessible les rend tous inaccessibles. C'est l'argument économique le plus fort du système.",
      },
    ],
  },
  {
    id: "clavier-focus",
    title: "Clavier et focus",
    level: 3,
    intro: "Tout ce qui se fait à la souris doit se faire au clavier.",
    blocks: [
      {
        kind: "list",
        items: [
          "Ordre de tabulation logique : le DOM suit l'ordre visuel — pas de `tabindex` positif qui le perturbe.",
          "`Tab` / `Maj`+`Tab` pour naviguer, `Entrée`/`Espace` pour activer, `Échap` pour fermer : les conventions que chaque composant respecte.",
          "Focus trap dans les modales et menus : le focus reste dans le composant ouvert, `Échap` le ferme et rend le focus au déclencheur.",
          "`:focus-visible` pour le style de focus : visible au clavier, discret à la souris.",
          "Tester au clavier chaque story : 5 minutes par composant, zéro outil requis.",
        ],
      },
      {
        kind: "code",
        language: "css",
        title: "Focus visible systématique",
        code: `/* Le système fournit un focus visible cohérent */\n:root {\n  --focus-ring: 0 0 0 3px var(--color-focus-ring);\n  --color-focus-ring: rgb(26 115 232 / 0.4);\n}\n\n:focus-visible {\n  outline: none;\n  box-shadow: var(--focus-ring);\n}\n\n/* Jamais de outline: none sans remplacement */`,
      },
    ],
  },
  {
    id: "aria-patterns",
    title: "Patterns ARIA",
    level: 3,
    intro: "Les rôles et patterns standards : ne pas réinventer.",
    blocks: [
      {
        kind: "fields",
        title: "Références et règles",
        fields: [
          {
            label: "WAI-ARIA APG",
            value:
              "Le guide des patterns (w3.org/WAI/ARIA/apg) décrit les comportements attendus : tabs, dialog, combobox, menu. Implémentez ces patterns, n'inventez pas les vôtres.",
          },
          {
            label: "Règle d'or",
            value:
              "Pas de rôle ARIA si l'élément natif existe : `<button>` vaut mieux que `<div role=\"button\">`. ARIA comble les manques, ne remplace pas le HTML.",
          },
          {
            label: "`aria-expanded`, `aria-selected`",
            value:
              "Les états dynamiques s'annoncent : un accordéon ouvert l'indique via `aria-expanded`, l'onglet actif via `aria-selected`.",
          },
          {
            label: "Zones live",
            value:
              "`aria-live=\"polite\"` pour les notifications et toasts : le lecteur d'écran annonce sans interrompre.",
          },
        ],
      },
      {
        kind: "text",
        text: "Chaque composant interactif du système suit un pattern APG documenté dans sa story. L'audit accessibilité se fait par composant, une fois — puis chaque usage en hérite.",
      },
    ],
  },
  {
    id: "storybook-avance",
    title: "Storybook avancé",
    level: 3,
    intro: "Au-delà des stories de base : contrôles, docs, décorateurs.",
    blocks: [
      {
        kind: "fields",
        title: "Fonctionnalités clés",
        fields: [
          {
            label: "Controls",
            value:
              "Les `argTypes` génèrent des contrôles (select, boolean, color) : le design teste les combinaisons sans code. Les types TypeScript alimentent les contrôles automatiquement.",
          },
          {
            label: "Docs",
            value:
              "Chaque story génère une page de documentation : props (depuis les types), exemples, code source. La doc est un sous-produit, pas un effort séparé.",
          },
          {
            label: "Décorateurs",
            value:
              "Envelopper toutes les stories : bascule de thème, fond, direction RTL. Un décorateur `data-theme` teste tous les composants en sombre d'un clic.",
          },
          {
            label: "Play functions",
            value:
              "Des interactions scriptées dans la story (clic, saisie) : le composant se teste dans son état réel, pas seulement son rendu initial.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Décorateur de thème",
        code: `// .storybook/preview.tsx — appliqué à toutes les stories\nimport type { Preview } from "@storybook/react";\n\nconst preview: Preview = {\n  decorators: [\n    (Story, context) => {\n      const theme = context.globals.theme ?? "light";\n      document.documentElement.setAttribute("data-theme", theme);\n      return <Story />;\n    },\n  ],\n  globalTypes: {\n    theme: {\n      description: "Thème",\n      defaultValue: "light",\n      toolbar: {\n        icon: "paintbrush",\n        items: ["light", "dark", "contrast"],\n      },\n    },\n  },\n};\n\nexport default preview;`,
      },
    ],
  },
  {
    id: "tests-composants",
    title: "Tester les composants",
    level: 3,
    intro: "Les garde-fous : ce que chaque composant prouve par ses tests.",
    blocks: [
      {
        kind: "command",
        label: "Installer l'outillage de test",
        command: "npm install --save-dev vitest jsdom @testing-library/react",
        why: "Vitest exécute, `jsdom` simule le DOM, Testing Library rend les composants et simule l'utilisateur. Pour un design system, les tests verrouillent les comportements contractuels : clavier, états, accessibilité de base.",
        verify: "npx vitest run",
      },
      {
        kind: "code",
        language: "tsx",
        title: "Button.test.tsx — les comportements contractuels",
        code: `import { describe, it, expect, vi } from "vitest";\nimport { render, screen, fireEvent } from "@testing-library/react";\nimport { Button } from "./Button";\n\ndescribe("Button", () => {\n  it("rend le label", () => {\n    render(<Button>Envoyer</Button>);\n    expect(screen.getByRole("button", { name: "Envoyer" })).toBeDefined();\n  });\n\n  it("déclenche onClick", () => {\n    const onClick = vi.fn();\n    render(<Button onClick={onClick}>Go</Button>);\n    fireEvent.click(screen.getByRole("button"));\n    expect(onClick).toHaveBeenCalledOnce();\n  });\n\n  it("ne déclenche pas onClick quand désactivé", () => {\n    const onClick = vi.fn();\n    render(\n      <Button onClick={onClick} disabled>\n        Go\n      </Button>\n    );\n    fireEvent.click(screen.getByRole("button"));\n    expect(onClick).not.toHaveBeenCalled();\n  });\n});`,
      },
      {
        kind: "text",
        text: "Testez les comportements, pas l'implémentation : `getByRole` vérifie du même coup que le bon élément sémantique est rendu. Les styles visuels relèvent de la régression visuelle, pas des tests unitaires.",
      },
    ],
  },
  {
    id: "regression-visuelle",
    title: "Non-régression visuelle",
    level: 3,
    intro: "Détecter les changements visuels involontaires, story par story.",
    blocks: [
      {
        kind: "list",
        items: [
          "Principe : chaque story est capturée en image de référence ; à chaque PR, les nouvelles captures sont comparées pixel par pixel ; toute différence est signalée pour revue humaine.",
          "Ce que ça attrape : un token modifié qui décale 30 composants, une régression CSS involontaire, un état oublié.",
          "Ce que ça n'attrape pas : si le changement est voulu — la revue humaine valide la nouvelle référence.",
          "Workflow : la régression visuelle tourne en CI sur les stories ; le seuil de tolérance évite les faux positifs (anti-aliasing, polices).",
          "Complémentaire aux tests unitaires : les tests prouvent les comportements, la régression visuelle prouve l'apparence.",
        ],
      },
      {
        kind: "text",
        text: "Sans non-régression visuelle, chaque modification de token est un saut dans l'inconnu : « ai-je cassé un état quelque part ? ». Avec elle, la réponse est automatique à chaque PR. C'est l'assurance qui permet de faire évoluer le système sereinement.",
      },
    ],
  },
  {
    id: "documentation-composants",
    title: "Documentation des composants",
    level: 3,
    intro: "La doc comme produit : structure d'une page de composant.",
    blocks: [
      {
        kind: "diagram",
        title: "Page de documentation type",
        lines: [
          "1. Nom + description en une phrase (le « pitch »)",
          "2. Exemple principal interactif (la story)",
          "3. Quand l'utiliser / quand ne PAS l'utiliser",
          "4. Variants avec exemples (matrice visuelle)",
          "5. Accessibilité : clavier, rôles, garanties",
          "6. Props : tableau généré depuis les types",
          "7. Exemples de code copiables (2-3 cas réels)",
        ],
      },
      {
        kind: "text",
        text: "La documentation se génère autant que possible : props depuis TypeScript, exemples depuis les stories, captures depuis la régression visuelle. Le rédigé manuel se concentre sur l'irremplaçable : le « quand » et le « pourquoi », les contre-exemples, les décisions de design.",
      },
    ],
  },
  {
    id: "tokens-format",
    title: "Formats de tokens",
    level: 3,
    intro: "Au-delà du CSS : des tokens multi-plateformes.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "tokens.json — source agnostique",
        code: `{\n  "color": {\n    "primary": { "value": "#1a73e8", "type": "color" },\n    "danger": { "value": "#d93025", "type": "color" }\n  },\n  "space": {\n    "4": { "value": "16px", "type": "spacing" }\n  }\n}`,
      },
      {
        kind: "list",
        items: [
          "Principe : définir les tokens une fois dans un format neutre (JSON), générer les formats cibles (CSS, iOS, Android) par transformation.",
          "Outils de transformation (ex. Style Dictionary) : lisent le JSON source et émettent les variables par plateforme.",
          "Pertinent quand le système couvre web + mobile natif : une seule source, trois plateformes synchronisées.",
          "Pour un système web uniquement, les variables CSS suffisent : ne pas ajouter de couche sans besoin.",
        ],
      },
    ],
  },
  {
    id: "handoff-design",
    title: "Liaison avec le design",
    level: 3,
    intro: "Figma et le code : deux faces des mêmes tokens.",
    blocks: [
      {
        kind: "list",
        items: [
          "Vocabulaire commun : les noms de tokens sont identiques dans Figma et dans le code (`color/primary`, `space/4`) — les revues parlent le même langage.",
          "Variables Figma : les styles Figma portent les mêmes noms que les variables CSS ; un écart de nommage est un bug de process.",
          "Le composant Figma et le composant code ont les mêmes variants : `primary/small` existe des deux côtés, avec les mêmes états.",
          "Revue croisée : le design valide les stories, le code valide les maquettes — la story est le lieu de rencontre.",
          "Dérive inévitable : planifiez des audits réguliers (chaque trimestre) pour réaligner Figma et le code.",
        ],
      },
      {
        kind: "text",
        text: "Un design system vit à cheval sur deux outils : sans discipline de nommage partagée, les deux faces divergent en quelques mois. Le token nommé identiquement des deux côtés est le plus petit contrat qui tient l'ensemble.",
      },
    ],
  },
  {
    id: "gouvernance",
    title: "Gouvernance",
    level: 3,
    intro: "Qui décide, qui contribue, qui valide : sans gouvernance, le système se fragmente.",
    blocks: [
      {
        kind: "fields",
        title: "Les rôles",
        fields: [
          {
            label: "Équipe cœur (ou owner)",
            value:
              "Maintient les tokens, les composants fondamentaux, l'outillage. Petite, stable, avec du temps dédié — pas un « à-côté ».",
          },
          {
            label: "Contributeurs",
            value:
              "Les équipes produit proposent des composants via le cycle de contribution. Leurs PR sont revues par l'équipe cœur.",
          },
          {
            label: "Conseil / RFC",
            value:
              "Les décisions structurantes (nouveau token, changement cassant) passent par une proposition écrite, discutée, validée.",
          },
          {
            label: "Consommateurs",
            value:
              "Les équipes qui utilisent le système : elles remontent les besoins et les bugs, adoptent les versions à leur rythme.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Règle : personne ne modifie un token ou un composant partagé sans revue de l'équipe cœur.",
          "Les décisions sont écrites (ADR ou RFC) : « pourquoi ce token existe » se relit dans 2 ans.",
          "La gouvernance est proportionnelle : 2 équipes = discussion informelle ; 20 équipes = process écrit.",
        ],
      },
    ],
  },
  {
    id: "modele-contribution",
    title: "Modèle de contribution",
    level: 3,
    intro: "Le contrat entre l'équipe cœur et les contributeurs.",
    blocks: [
      {
        kind: "diagram",
        title: "Ce que la PR de contribution contient",
        lines: [
          "PR : nouveau composant",
          " ├── Composant (tokens uniquement, variants finis)",
          " ├── Stories (tous les variants + états)",
          " ├── Tests (comportements contractuels)",
          " ├── Documentation (quand / quand pas / a11y)",
          " ├── Changelog (entrée en langage utilisateur)",
          " └── Revue : design + code + accessibilité",
        ],
      },
      {
        kind: "text",
        text: "Le modèle fédéré : les équipes contribuent, l'équipe cœur valide. Chaque contribution suit le même gabarit — composant, stories, tests, doc — sinon la revue la renvoie. C'est exigeant, et c'est ce qui maintient la qualité quand le système grandit.",
      },
    ],
  },
  {
    id: "versioning-avance",
    title: "Versionnage et changelog",
    level: 3,
    intro: "Communiquer les changements : le changelog comme contrat.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Exemple de changelog",
        code: `# [1.3.0] — 2026-09-15\n\n## Ajouté\n- Nouveau composant \`Toast\` (variants info/success/error)\n- Variant \`danger\` sur \`Button\`\n\n## Modifié\n- Contraste du texte secondaire renforcé (AA sur tous les thèmes)\n\n## Déprécié\n- La prop \`type\" de \`Button\` est dépréciée, utilisez \`variant\"\n  (suppression prévue en 2.0.0)`,
      },
      {
        kind: "list",
        items: [
          "Rédigé en langage utilisateur : « nouveau variant danger » pas « refactor du module button ».",
          "Les dépréciations annoncent la suppression avec un délai (une major plus tard) et le chemin de migration.",
          "Les changements cassants sont listés avec un guide de migration : l'équipe qui monte de version sait exactement quoi changer.",
          "Automatisation : les changelogs peuvent être générés depuis les messages de commit conventionnels — à condition que l'équipe les écrive rigoureusement.",
        ],
      },
    ],
  },
  {
    id: "monorepo",
    title: "Organisation en monorepo",
    level: 3,
    intro: "Quand le système grandit : tokens, composants, docs, site.",
    blocks: [
      {
        kind: "diagram",
        title: "Structure type",
        lines: [
          "design-system/",
          "├── packages/",
          "│   ├── tokens/        (variables CSS, JSON source)",
          "│   ├── react/         (composants React)",
          "│   └── eslint-config/ (règles : pas de valeurs en dur…)",
          "├── apps/",
          "│   ├── docs/          (site de documentation)",
          "│   └── playground/    (bac à sable)",
          "└── .storybook/        (configuration partagée)",
        ],
      },
      {
        kind: "text",
        text: "Le monorepo sépare les paquets versionnés indépendamment : les tokens peuvent évoluer sans publier les composants. Les outils de monorepo (workspaces npm, Turborepo, Nx) orchestrent les builds et les dépendances internes — à introduire quand le repo unique devient confus, pas avant.",
      },
    ],
  },
  {
    id: "css-approches",
    title: "Approches CSS : choisir",
    level: 3,
    intro: "Quatre façons de styler les composants, comparées factuellement.",
    blocks: [
      {
        kind: "table",
        headers: ["Approche", "Principe", "Forces", "Limites"],
        rows: [
          ["Variables CSS + classes", "Tokens en `:root`, classes par composant", "Simple, standard, théming natif", "Nommage à discipliner"],
          ["CSS Modules", "`Button.module.css`, classes scopées", "Isolation sans outil, typable", "Composition inter-fichiers verbeuse"],
          ["Tailwind", "Classes utilitaires", "Rapidité, cohérence par contrainte", "HTML verbeux, config à maintenir"],
          ["CSS-in-JS", "Styles dans le JS", "Théming dynamique, colocalisation", "Runtime, SSR délicat"],
        ],
      },
      {
        kind: "text",
        text: "Aucune approche n'est universellement supérieure : le choix dépend de l'équipe, du SSR, des performances visées. L'essentiel est ailleurs : quelle que soit l'approche, les valeurs viennent des tokens — jamais en dur. Un système peut même mixer (tokens CSS + Tailwind configuré dessus).",
      },
    ],
  },
  {
    id: "tree-shaking",
    title: "Distribution : tree-shaking",
    level: 3,
    intro: "Ne livrer que ce qui est utilisé : la distribution propre.",
    blocks: [
      {
        kind: "list",
        items: [
          "Exports nommés par composant : `import { Button } from \"@org/ui\"` — le bundler élimine le reste (tree-shaking).",
          "Éviter les effets de bord dans les modules : un import ne doit pas injecter de CSS global surprise.",
          "CSS par composant ou CSS global du système : le premier se tree-shake, le second est plus simple — à trancher en connaissance de cause.",
          "`sideEffects: false` dans le `package.json` : déclare au bundler que les modules sont purs et élagables.",
          "Mesurer : analysez le bundle d'une app consommatrice — un design system qui pèse 500 Ko pour un bouton est un échec.",
        ],
      },
      {
        kind: "code",
        language: "json",
        title: "package.json — les champs de distribution",
        code: `{\n  "name": "@org/ui",\n  "version": "1.3.0",\n  "main": "./dist/index.js",\n  "module": "./dist/index.mjs",\n  "types": "./dist/index.d.ts",\n  "sideEffects": false,\n  "exports": {\n    ".": "./dist/index.js",\n    "./button": "./dist/button.js\"\n  }\n}`,
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro: "Les pièges classiques des design systems, et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Valeurs en dur",
            value:
              "Problem : `#1a73e8` écrit dans un composant au lieu de `var(--color-primary)`. Why : rapidité, oubli. Bad example : couleur hex dans le CSS du bouton. Better : tokens partout, règle de lint qui interdit les valeurs brutes.",
          },
          {
            label: "Composant à 40 props",
            value:
              "Problem : `Card` avec `title`, `subtitle`, `image`, `imagePosition`, `footerActions`… Why : configuration au lieu de composition. Bad example : props de contenu à rallonge. Better : compound components, `children`.",
          },
          {
            label: "Pas de documentation",
            value:
              "Problem : le composant existe mais personne ne sait quand l'utiliser. Why : « on documentera plus tard ». Bad example : story unique sans description. Better : doc écrite avec le composant, dans la même PR.",
          },
          {
            label: "Accessibilité après coup",
            value:
              "Problem : le clavier et les lecteurs d'écran découverts en audit. Why : non prévu dès la conception. Bad example : `<div onClick>` sans rôle. Better : sémantique HTML d'abord, patterns ARIA documentés.",
          },
          {
            label: "Versionnage sauvage",
            value:
              "Problem : changement cassant sans major, équipes surprises. Why : semver non respectée. Bad example : renommer une prop en `minor`. Better : dépréciation annoncée, suppression en major, guide de migration.",
          },
          {
            label: "Gouvernance absente",
            value:
              "Problem : trois boutons concurrents dans trois équipes. Why : personne ne décide. Bad example : contributions mergées sans revue. Better : équipe cœur, RFC écrites, revue obligatoire.",
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
          "Tokens d'abord : aucune valeur en dur dans les composants, jamais.",
          "Nommer par intention : `--color-primary`, pas `--blue-500` (hors palette).",
          "Variants finis : un vocabulaire fermé, exhaustif, documenté avec son « quand ».",
          "Composer, pas configurer : `children` et compound components plutôt que 40 props.",
          "Accessible par construction : sémantique HTML, clavier, focus visible, patterns ARIA.",
          "Documenter avec le code : stories, exemples, contre-exemples — dans la même PR.",
          "Tester les comportements : un test par état, par rôle accessible.",
          "Non-régression visuelle en CI : chaque token modifié est vérifié partout.",
          "Semver stricte : les équipes montent à leur rythme, les casses sont annoncées.",
          "Gouvernance écrite : qui décide, qui contribue, qui valide.",
        ],
      },
      {
        kind: "text",
        text: "Contexte : un système pour 2 équipes peut rester informel ; pour 20 équipes, chaque pratique ci-dessus devient un process. La maturité, c'est dimensionner la rigueur au nombre de consommateurs — pas d'appliquer le maximum partout.",
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
          {
            label: "Storybook",
            value:
              "storybook.js.org/docs : installation, CSF, contrôles, décorateurs, documentation générée.",
          },
          {
            label: "WAI-ARIA APG",
            value:
              "w3.org/WAI/ARIA/apg : les patterns d'accessibilité de référence pour chaque composant interactif.",
          },
          {
            label: "MDN — CSS",
            value:
              "developer.mozilla.org : variables CSS, cascade, spécificité — les fondations des tokens.",
          },
          {
            label: "WCAG",
            value:
              "w3.org/WAI/WCAG : les critères d'accessibilité, dont les ratios de contraste (AA : 4.5:1).",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : auditez un site existant — comptez les boutons différents, les espacements uniques, les couleurs proches : c'est le périmètre d'un futur système.",
          "Community : les design systems publics (documentations en ligne) sont des mines de patterns — lisez-les comme des manuels.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Design systems maîtrisés, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Accessibilité : approfondir les audits, les lecteurs d'écran, les critères WCAG.",
          "Architecture frontend : organiser les applications qui consomment le système.",
          "Tests : stratégies de test avancées, tests end-to-end des parcours critiques.",
          "State management : quand l'état partagé dépasse les props.",
          "Revenir à la roadmap : valider les design systems et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

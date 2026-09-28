import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète des formulaires React : de zéro à un usage
 * professionnel. 3 niveaux d'information (Aperçu / Pratique / Approfondi)
 * avec divulgation progressive. Tous les textes supportent le code inline
 * entre backticks. Cohérent avec le guide existant (controlled inputs,
 * validation, React Hook Form, erreurs, UX, accessibilité).
 */
export const LEARNING_REACT_FORMS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce que recouvre « les formulaires React » et pourquoi c'est un domaine à part entière.",
    blocks: [
      {
        kind: "text",
        text: "Un formulaire React, c'est la gestion de la saisie utilisateur : l'état de chaque champ, la validation des valeurs, l'affichage des erreurs, la soumission vers le serveur et le retour à l'utilisateur. React ne fournit que les briques de base (`value`, `onChange`) : tout le reste — validation, UX d'erreur, accessibilité — est à construire.",
      },
      {
        kind: "text",
        text: "Pourquoi c'est un domaine à part : les formulaires concentrent les cas limites — champs interdépendants, validation asynchrone (unicité d'un email), formats internationaux, navigation au clavier, lecteurs d'écran. Un formulaire approximatif dégrade directement la conversion et la confiance ; un formulaire soigné est souvent ce qui distingue une application professionnelle.",
      },
      {
        kind: "text",
        text: "Deux approches : les champs contrôlés (React pilote chaque valeur via l'état — contrôle total, re-rendus à chaque frappe) et les champs non contrôlés (le DOM garde la valeur, React la lit à la soumission — performant, moins réactif). La librairie de référence, React Hook Form, combine les deux : inputs non contrôlés pour la performance, API contrôlée pour la validation.",
      },
    ],
  },
  {
    id: "formulaire-carte-mentale",
    title: "La carte mentale du formulaire",
    level: 1,
    intro:
      "Six étapes, une seule boucle : de la saisie à la confirmation.",
    blocks: [
      {
        kind: "diagram",
        title: "De la saisie à la soumission",
        lines: [
          "CHAMP",
          "  (input, label, valeur)",
          "     │",
          "     ▼",
          "SAISIE",
          "  (onChange : chaque frappe)",
          "     │",
          "     ▼",
          "VALIDATION",
          "  (règles : format, requis, asynchrone)",
          "     │",
          "     ▼",
          "ERREUR",
          "  (message précis, lié au champ, annoncé)",
          "     │",
          "     ▼",
          "SOUMISSION",
          "  (vérification globale, envoi, chargement)",
          "     │",
          "     ▼",
          "CONFIRMATION",
          "  (succès visible, réinitialisation)",
        ],
      },
      {
        kind: "text",
        text: "Chaque étape a ses pièges : la saisie doit rester fluide (pas de lag à la frappe), la validation doit aider sans harceler (pas d'erreur avant que l'utilisateur ait fini), l'erreur doit être précise et accessible, la soumission doit être idempotente (pas de double envoi au double-clic).",
      },
      {
        kind: "list",
        items: [
          "Valider tôt pour aider, jamais pour punir : l'erreur apparaît quand l'utilisateur a eu sa chance.",
          "Un message d'erreur doit dire quoi corriger, pas seulement que c'est invalide.",
          "La soumission est une transaction : état de chargement, gestion d'échec, confirmation explicite.",
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
      "Ce qu'il faut maîtriser avant les formulaires avancés.",
    blocks: [
      {
        kind: "fields",
        title: "Fondations requises",
        fields: [
          {
            label: "React (`react`, `react-hooks`)",
            value:
              "Composants, `useState`, gestion d'événements : un champ contrôlé n'est qu'un `useState` branché sur un `input`.",
          },
          {
            label: "JavaScript",
            value:
              "Prévention du comportement par défaut (`preventDefault`), expressions régulières pour les formats, `async`/`await` pour la validation serveur.",
          },
          {
            label: "HTML des formulaires",
            value:
              "`form`, `input`, `label`, `required`, types (`email`, `password`) : la sémantique native fait déjà la moitié du travail d'accessibilité.",
          },
          {
            label: "TypeScript (recommandé)",
            value:
              "Typer les données du formulaire (`FormData`) : la validation et la soumission deviennent vérifiables par le compilateur.",
          },
        ],
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro:
      "Installer React Hook Form et un validateur de schémas, en comprenant chaque paquet.",
    blocks: [
      {
        kind: "command",
        label: "Installer React Hook Form",
        command: "npm install react-hook-form",
        why: "La librairie de référence : elle enregistre les inputs en non contrôlé (performance : pas de re-rendu à chaque frappe) tout en offrant validation, erreurs et soumission via une API de hooks. Zéro dépendance.",
        verify: "npm list react-hook-form",
      },
      {
        kind: "command",
        label: "Installer Zod et son connecteur",
        command: "npm install zod @hookform/resolvers",
        why: "`zod` décrit le schéma de validation en TypeScript (types inférés automatiquement) ; `@hookform/resolvers` branche ce schéma sur React Hook Form. Une seule source de vérité : le schéma valide et type à la fois.",
        verify: "npm list zod @hookform/resolvers",
      },
      {
        kind: "command",
        label: "Installer react-datepicker (exemple Controller)",
        command: "npm install react-datepicker",
        why: "Utilisé dans la section sur `Controller` : c'est un composant contrôlé tiers typique (`selected`/`onChange`) qui ne fonctionne pas avec `register`.",
        verify: "npm list react-datepicker",
      },
      {
        kind: "text",
        text: "Pas de librairie UI imposée : React Hook Form fonctionne avec des inputs natifs comme avec n'importe quel système de design. Commencez avec des inputs natifs stylés en CSS — vous verrez exactement ce que la librairie apporte.",
      },
    ],
  },
  {
    id: "premier-formulaire",
    title: "Premier formulaire",
    level: 2,
    intro:
      "Un formulaire d'inscription complet : champs, validation, erreurs, soumission.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le projet et installer les dépendances",
            detail:
              "Un projet React + TypeScript (Vite), puis `npm install react-hook-form zod @hookform/resolvers`.",
          },
          {
            title: "Définir le schéma Zod",
            detail:
              "`z.object({ email: z.string().email(), password: z.string().min(8) })` : les règles de validation, avec inférence du type `FormData`.",
          },
          {
            title: "Brancher le formulaire",
            detail:
              "`useForm({ resolver: zodResolver(schema) })` puis `{...register('email')}` sur chaque input : l'enregistrement lie le champ au formulaire.",
          },
          {
            title: "Afficher les erreurs",
            detail:
              "`formState.errors.email?.message` sous le champ, avec `aria-describedby` et `aria-invalid` pour l'accessibilité.",
          },
          {
            title: "Gérer la soumission",
            detail:
              "`handleSubmit(onSubmit)` : ne s'exécute que si la validation passe. `isSubmitting` désactive le bouton pendant l'envoi.",
          },
          {
            title: "Tester les cas limites",
            detail:
              "Email invalide, mot de passe trop court, double-clic sur Envoyer, soumission avec champs vides : chaque cas doit produire un comportement propre.",
          },
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Inscription avec React Hook Form + Zod",
        code: "import { useForm } from \"react-hook-form\";\nimport { zodResolver } from \"@hookform/resolvers/zod\";\nimport { z } from \"zod\";\n\nconst schema = z.object({\n  email: z.string().email(\"Email invalide\"),\n  password: z.string().min(8, \"8 caractères minimum\"),\n});\ntype FormData = z.infer<typeof schema>;\n\nexport function SignupForm() {\n  const { register, handleSubmit, formState: { errors, isSubmitting } } =\n    useForm<FormData>({ resolver: zodResolver(schema) });\n\n  const onSubmit = async (data: FormData) => {\n    await fetch(\"/api/signup\", {\n      method: \"POST\",\n      headers: { \"Content-Type\": \"application/json\" },\n      body: JSON.stringify(data),\n    });\n  };\n\n  return (\n    <form onSubmit={handleSubmit(onSubmit)} noValidate>\n      <label htmlFor=\"email\">Email</label>\n      <input id=\"email\" type=\"email\"\n        {...register(\"email\")}\n        aria-invalid={!!errors.email}\n        aria-describedby=\"email-error\" />\n      {errors.email && (\n        <p id=\"email-error\" role=\"alert\">{errors.email.message}</p>\n      )}\n\n      <label htmlFor=\"password\">Mot de passe</label>\n      <input id=\"password\" type=\"password\" {...register(\"password\")} />\n      {errors.password && (\n        <p role=\"alert\">{errors.password.message}</p>\n      )}\n\n      <button type=\"submit\" disabled={isSubmitting}>\n        {isSubmitting ? \"Envoi…\" : \"S'inscrire\"}\n      </button>\n    </form>\n  );\n}",
      },
    ],
  },
  {
    id: "controlled-vs-uncontrolled",
    title: "Contrôlé vs non contrôlé",
    level: 2,
    intro:
      "Les deux modèles d'inputs React, leurs coûts et leurs usages.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Contrôlé", "Non contrôlé"],
        rows: [
          ["Valeur", "Dans l'état React (`value` + `onChange`)", "Dans le DOM (lire via `ref` ou `FormData`)"],
          ["Re-rendus", "À chaque frappe", "Aucun pendant la saisie"],
          ["Validation live", "Naturelle (l'état est là)", "À la soumission ou au blur"],
          ["Cas d'usage", "Champs interdépendants, masques, formatage live", "Grands formulaires, performance"],
        ],
      },
      {
        kind: "code",
        language: "tsx",
        title: "Les deux modèles côte à côte",
        code: "// Contrôlé : React pilote la valeur\nconst [name, setName] = useState(\"\");\n<input value={name} onChange={(e) => setName(e.target.value)} />\n\n// Non contrôlé : le DOM garde la valeur\nconst ref = useRef<HTMLInputElement>(null);\n<input ref={ref} defaultValue=\"\" />\n// lecture : ref.current?.value",
      },
      {
        kind: "text",
        text: "React Hook Form utilise le modèle non contrôlé sous le capot (via `register` et des refs) : c'est ce qui le rend rapide sur les grands formulaires. Le modèle contrôlé reste pertinent quand chaque frappe doit déclencher une logique (recherche instantanée, champ qui en pilote un autre).",
      },
    ],
  },
  {
    id: "validation-bases",
    title: "Validation : les bases",
    level: 2,
    intro:
      "Quand valider, quoi valider, et avec quels outils.",
    blocks: [
      {
        kind: "fields",
        title: "Les trois moments de validation",
        fields: [
          {
            label: "À la frappe (onChange)",
            value:
              "Feedback immédiat : format d'email, force du mot de passe. À réserver aux indications douces — pas d'erreur rouge agressive avant la fin de la saisie.",
          },
          {
            label: "À la sortie du champ (onBlur)",
            value:
              "Le bon défaut pour les erreurs : l'utilisateur a terminé, on peut juger. React Hook Form : `mode: 'onBlur'`.",
          },
          {
            label: "À la soumission (onSubmit)",
            value:
              "La vérification globale et bloquante : champs requis, cohérence entre champs. Toujours présente, même avec les deux autres.",
          },
        ],
      },
      {
        kind: "text",
        text: "Deux couches : la validation synchrone (format, longueur, requis — immédiate, côté client) et la validation asynchrone (unicité d'un email — appel serveur, avec debounce et état de chargement). Et une règle absolue : le serveur revalide toujours tout — la validation client est de l'UX, pas de la sécurité.",
      },
    ],
  },
  {
    id: "messages-erreur",
    title: "Messages d'erreur",
    level: 2,
    intro:
      "Écrire des erreurs qui aident : précises, placées, annoncées.",
    blocks: [
      {
        kind: "list",
        items: [
          "Précis : « L'email doit contenir un @ » plutôt que « Champ invalide ». Dire quoi corriger, pas seulement que c'est faux.",
          "Placés : sous le champ concerné, jamais dans une alerte globale lointaine. L'utilisateur ne doit pas chercher.",
          "Liés : `aria-describedby` pointe le message depuis l'input, `aria-invalid=\"true\"` signale l'état — le lecteur d'écran annonce l'erreur.",
          "Annoncés : `role=\"alert\"` pour les erreurs importantes : elles sont lues immédiatement, sans attendre la navigation.",
          "Temporisés : pas d'erreur avant interaction (`touched`) — valider un champ que l'utilisateur n'a pas touché est du harcèlement.",
          "Un seul message à la fois par champ : la première erreur rencontrée, pas une liste.",
        ],
      },
    ],
  },
  {
    id: "accessibilite-bases",
    title: "Accessibilité : les bases",
    level: 2,
    intro:
      "Le formulaire est le test ultime de l'accessibilité : les fondamentaux.",
    blocks: [
      {
        kind: "list",
        items: [
          "Chaque input a un `<label>` associé (`htmlFor`/`id`) : cliquer le label focalise le champ, le lecteur d'écran l'annonce.",
          "Ne jamais se fier au seul `placeholder` : il disparaît à la saisie et n'est pas un label.",
          "Ordre de tabulation logique : l'ordre du DOM, sans `tabindex` positif qui le perturbe.",
          "Contraste suffisant pour les messages d'erreur : le rouge clair sur blanc est souvent illisible.",
          "Le bouton de soumission reste un vrai `<button type=\"submit\">` dans un `<form>` : la touche Entrée soumet nativement.",
          "`fieldset` + `legend` pour regrouper (boutons radio, cases à cocher liées).",
        ],
      },
    ],
  },
  {
    id: "workflow-professionnel",
    title: "Comment travaillent les professionnels",
    level: 2,
    intro:
      "Le flux typique : du schéma au formulaire testé et accessible.",
    blocks: [
      {
        kind: "diagram",
        title: "Cycle de vie d'un formulaire",
        lines: [
          "Schéma (Zod) : la source de vérité",
          "     ↓",
          "Types inférés → partagés avec l'API",
          "     ↓",
          "Formulaire : register, erreurs, soumission",
          "     ↓",
          "États : chargement, succès, échec serveur",
          "     ↓",
          "Accessibilité : labels, ARIA, clavier",
          "     ↓",
          "Tests : soumission valide, invalide, erreurs serveur",
          "     ↓",
          "Revue : messages d'erreur relus comme du copywriting",
        ],
      },
      {
        kind: "text",
        text: "Le point pro : le schéma Zod est partagé entre frontend et backend (même paquet, même validation). Une règle métier changée à un seul endroit s'applique des deux côtés — plus de divergence silencieuse entre « le front accepte » et « le back refuse ».",
      },
    ],
  },
  {
    id: "debugging-formulaires",
    title: "Déboguer : les premiers réflexes",
    level: 2,
    intro:
      "« Mon formulaire ne soumet pas » : la méthode systématique.",
    blocks: [
      {
        kind: "list",
        items: [
          "`handleSubmit` ne s'exécute pas ? La validation bloque : affichez `formState.errors` en console pour voir quelle règle échoue.",
          "Le bouton ne fait rien ? Vérifier `type=\"submit\"` et qu'il est bien dans le `<form>` — un bouton hors formulaire ne soumet pas.",
          "Les valeurs sont vides ? Chaque input doit être enregistré (`register`) : un input non enregistré n'existe pas pour le formulaire.",
          "`noValidate` : désactive la validation HTML native qui peut court-circuiter la vôtre (messages natifs incohérents avec le design).",
          "Erreurs serveur non affichées ? `setError('email', { message })` les injecte dans le même circuit que les erreurs client.",
          "Re-rendus en boucle ? Un `register` appelé avec des options recréées à chaque rendu — mémoriser les schémas et callbacks.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes-formulaires",
    title: "Erreurs courantes",
    level: 2,
    intro:
      "Les pièges classiques des formulaires React.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Validation uniquement côté client",
            value:
              "Le serveur doit revalider : la validation React est de l'UX, contournable en deux clics dans les devtools.",
          },
          {
            label: "Double soumission",
            value:
              "Double-clic = deux requêtes = deux comptes créés. Désactiver le bouton via `isSubmitting` et rendre l'API idempotente.",
          },
          {
            label: "Erreurs avant interaction",
            value:
              "Afficher « requis » au chargement du formulaire : agressif et inutile. Valider après `blur` ou à la soumission.",
          },
          {
            label: "Mot de passe en clair dans les logs",
            value:
              "Logger `data` en debug expose les mots de passe : ne jamais logger le contenu brut d'un formulaire.",
          },
          {
            label: "reset() qui efface tout sans prévenir",
            value:
              "Réinitialiser après succès est bien ; le faire sur un formulaire long sans confirmation fait perdre du travail.",
          },
          {
            label: "Oublier `defaultValues`",
            value:
              "Sans valeurs par défaut, les champs sont `undefined` : les validations `required` se comportent bizarrement et TypeScript râle.",
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
      "Trois projets de difficulté croissante, alignés sur ceux du guide de la compétence.",
    blocks: [
      {
        kind: "fields",
        title: "Débutant — Formulaire multi-étapes validé",
        fields: [
          { label: "À construire", value: "3 étapes (compte, profil, confirmation) avec validation par étape et récapitulatif" },
          { label: "Objectif", value: "État inter-étapes, navigation avant/arrière sans perdre les données, validation progressive" },
          { label: "Durée", value: "Quelques jours" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — Upload de fichiers avec progression",
        fields: [
          { label: "À construire", value: "Sélection multiple, barre de progression, nouvelle tentative en cas d'échec, validation (type, taille)" },
          { label: "Objectif", value: "Inputs file, envoi par morceaux, états asynchrones complexes" },
          { label: "Durée", value: "Une à deux semaines" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Formulaire 100 % accessible",
        fields: [
          { label: "À construire", value: "Le multi-étapes précédent, audité et corrigé : navigation clavier complète, lecteur d'écran, contraste" },
          { label: "Objectif", value: "Passer un audit d'accessibilité réel (tests manuels + automatisés)" },
          { label: "Durée", value: "Deux semaines" },
        ],
      },
    ],
  },
  {
    id: "ressources-essentielles",
    title: "Ressources essentielles",
    level: 2,
    intro:
      "Par où continuer, en commençant par les documentations officielles.",
    blocks: [
      {
        kind: "fields",
        title: "Documentations officielles (à privilégier)",
        fields: [
          {
            label: "react-hook-form.com",
            value: "Guides, API (`useForm`, `register`, `Controller`), exemples : la référence de la librairie.",
          },
          {
            label: "zod.dev",
            value: "Documentation des schémas : validation, inférence de types, messages d'erreur.",
          },
          {
            label: "react.dev/reference/react-dom/components/input",
            value: "Le comportement natif des inputs React : contrôlé, non contrôlé, avertissements.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Accessibilité : le guide W3C WAI sur les formulaires (labels, erreurs, instructions).",
          "Pratique : les trois projets progressifs de cette page, dans l'ordre.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "zod-schemas-avances",
    title: "Schémas Zod avancés",
    level: 3,
    intro:
      "Aller au-delà du format : raffinements, unions, champs conditionnels.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Schéma réaliste",
        code: "import { z } from \"zod\";\n\nconst schema = z.object({\n  email: z.string().email(\"Email invalide\"),\n  password: z.string()\n    .min(8, \"8 caractères minimum\")\n    .regex(/[A-Z]/, \"Une majuscule requise\"),\n  confirm: z.string(),\n  age: z.coerce.number().int().min(18, \"Majeur requis\"),\n  role: z.enum([\"admin\", \"user\"]),\n}).refine((d) => d.password === d.confirm, {\n  message: \"Les mots de passe ne correspondent pas\",\n  path: [\"confirm\"],\n});\n\ntype FormData = z.infer<typeof schema>;",
      },
      {
        kind: "text",
        text: "Techniques clés : `z.coerce.number()` convertit la chaîne de l'input en nombre (les inputs HTML renvoient toujours des strings), `.refine()` valide des règles inter-champs avec `path` pour rattacher l'erreur au bon champ, `z.enum()` restreint aux valeurs autorisées. Le type `FormData` inféré garantit que le code de soumission manipule exactement ce que le schéma valide.",
      },
      {
        kind: "list",
        items: [
          "Les messages d'erreur en français se définissent dans le schéma : un seul endroit pour le copywriting.",
          "`.optional()` vs `.nullable()` vs `.default()` : trois sémantiques différentes, à choisir consciemment.",
          "`z.discriminatedUnion()` pour les formulaires dont les champs dépendent d'un choix (particulier / entreprise).",
        ],
      },
    ],
  },
  {
    id: "validation-asynchrone",
    title: "Validation asynchrone",
    level: 3,
    intro:
      "Vérifier l'unicité d'un email : appeler le serveur sans spammer.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Unicité avec debounce",
        code: "import { z } from \"zod\";\n\n// Debounce explicite : React Hook Form ne le fait pas pour vous.\nlet timer: ReturnType<typeof setTimeout> | undefined;\nlet controller: AbortController | undefined;\n\nconst checkUnique = (name: string) =>\n  new Promise<boolean>((resolve) => {\n    clearTimeout(timer);\n    controller?.abort(); // annule la requête précédente\n    timer = setTimeout(async () => {\n      controller = new AbortController();\n      try {\n        const res = await fetch(`/api/users/exists?name=${encodeURIComponent(name)}`, {\n          signal: controller.signal,\n        });\n        resolve(!(await res.json()).exists);\n      } catch {\n        resolve(true); // requête annulée : ne pas bloquer\n      }\n    }, 400);\n  });\n\nconst schema = z.object({\n  username: z.string().min(3).refine(checkUnique, \"Ce pseudo est déjà pris\"),\n});",
      },
      {
        kind: "text",
        text: "Zod supporte les raffinements asynchrones, mais React Hook Form n'applique aucun debounce : chaque validation déclenche l'appel. Le debounce et l'annulation des requêtes obsolètes s'implémentent explicitement (voir l'exemple). Points d'attention : afficher un état « vérification… » pendant l'appel, et ne jamais bloquer la soumission sur une vérification réseau",
      },
      {
        kind: "list",
        items: [
          "Valider en asynchrone uniquement ce qui l'exige (unicité, disponibilité) : tout le reste est synchrone.",
          "Le race condition classique : la réponse pour « lea » arrive après celle pour « leana » — annuler via AbortController.",
          "Toujours revalider côté serveur à la soumission : la vérification client peut être contournée ou obsolète.",
        ],
      },
    ],
  },
  {
    id: "usefieldarray",
    title: "Listes dynamiques avec useFieldArray",
    level: 3,
    intro:
      "Ajouter/retirer des champs à la volée : invités, lignes de commande, tags.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Liste d'invités dynamique",
        code: "import { useForm, useFieldArray } from \"react-hook-form\";\n\nfunction Invites() {\n  const { register, control, handleSubmit } = useForm({\n    defaultValues: { invites: [{ email: \"\" }] },\n  });\n  const { fields, append, remove } = useFieldArray({\n    control, name: \"invites\",\n  });\n\n  return (\n    <form onSubmit={handleSubmit(console.log)}>\n      {fields.map((f, i) => (\n        <div key={f.id}>\n          <input {...register(`invites.${i}.email`)} placeholder=\"Email\" />\n          <button type=\"button\" onClick={() => remove(i)}>Retirer</button>\n        </div>\n      ))}\n      <button type=\"button\" onClick={() => append({ email: \"\" })}>\n        Ajouter un invité\n      </button>\n      <button type=\"submit\">Envoyer</button>\n    </form>\n  );\n}",
      },
      {
        kind: "text",
        text: "`useFieldArray` gère les identifiants stables (`f.id`) : utiliser l'index comme `key` casserait le focus et les valeurs lors des suppressions. Chaque ligne se valide comme un sous-schéma Zod (`z.array(z.object(...))`) : les erreurs sont rattachées par index (`errors.invites?.[i]?.email`).",
      },
    ],
  },
  {
    id: "controller-composants",
    title: "Controller : brancher des composants externes",
    level: 3,
    intro:
      "Quand `register` ne suffit pas : date pickers, selects custom, éditeurs riches.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Date picker contrôlé via Controller",
        code: "import { Controller, useForm } from \"react-hook-form\";\nimport DatePicker from \"react-datepicker\"; // exemple\n\nfunction EventForm() {\n  const { control, handleSubmit } = useForm({\n    defaultValues: { date: new Date() },\n  });\n  return (\n    <form onSubmit={handleSubmit(console.log)}>\n      <Controller\n        name=\"date\"\n        control={control}\n        render={({ field }) => (\n          <DatePicker\n            selected={field.value}\n            onChange={field.onChange}\n            onBlur={field.onBlur}\n          />\n        )}\n      />\n      <button type=\"submit\">Créer</button>\n    </form>\n  );\n}",
      },
      {
        kind: "text",
        text: "`Controller` fait le pont entre le monde non contrôlé de React Hook Form et les composants qui exigent `value`/`onChange` : il injecte `field` (value, onChange, onBlur, ref). Réserver aux composants externes qui ne peuvent pas recevoir une ref native — pour les inputs maison, `register` + `forwardRef` suffit et reste plus performant.",
      },
    ],
  },
  {
    id: "etats-formulaire",
    title: "États du formulaire : touched, dirty, valid",
    level: 3,
    intro:
      "Lire l'état du formulaire pour une UX intelligente.",
    blocks: [
      {
        kind: "fields",
        title: "Les indicateurs de `formState`",
        fields: [
          {
            label: "`touchedFields`",
            value:
              "Le champ a été visité (blur) : autorise l'affichage de l'erreur sans agresser l'utilisateur qui n'a rien touché.",
          },
          {
            label: "`dirtyFields` / `isDirty`",
            value:
              "La valeur diffère de `defaultValues` : permet « modifications non enregistrées » avant de quitter la page.",
          },
          {
            label: "`isValid` / `isValidating`",
            value:
              "Le formulaire passe la validation (selon le `mode`) : pour activer/désactiver le bouton de soumission en connaissance de cause.",
          },
          {
            label: "`isSubmitting` / `isSubmitSuccessful`",
            value:
              "Soumission en cours / réussie : pilote l'état de chargement et la confirmation.",
          },
          {
            label: "`submitCount`",
            value:
              "Nombre de tentatives : afficher toutes les erreurs après le premier échec de soumission, même sur les champs non touchés.",
          },
        ],
      },
      {
        kind: "text",
        text: "Le pattern UX de référence : erreurs au `blur` (touched) pendant la saisie, toutes les erreurs après un échec de soumission (`submitCount > 0`), bouton désactivé seulement si `isSubmitting` — jamais sur `!isValid` seul, car un formulaire invalide au chargement avec bouton désactivé n'explique rien.",
      },
    ],
  },
  {
    id: "formulaires-multi-etapes",
    title: "Formulaires multi-étapes",
    level: 3,
    intro:
      "Découper un long formulaire : état partagé, validation par étape.",
    blocks: [
      {
        kind: "text",
        text: "Architecture : un seul `useForm` au niveau du wizard, les étapes ne sont que de l'affichage conditionnel. La validation par étape utilise `trigger(['champ1', 'champ2'])` avant d'avancer — pas de soumission partielle. Les données survivent à la navigation car l'état vit au-dessus des étapes.",
      },
      {
        kind: "code",
        language: "tsx",
        title: "Validation par étape",
        code: "const { trigger, handleSubmit } = useForm({ resolver: zodResolver(schema) });\nconst [step, setStep] = useState(0);\nconst stepFields = [[\"email\", \"password\"], [\"firstName\", \"lastName\"], []];\n\nconst next = async () => {\n  const ok = await trigger(stepFields[step]); // valide l'étape courante\n  if (ok) setStep((s) => s + 1);\n};",
      },
      {
        kind: "list",
        items: [
          "Barre de progression + récapitulatif final : l'utilisateur sait où il en est et vérifie avant d'envoyer.",
          "Sauvegarder l'état en `localStorage` : un rechargement ne doit pas faire perdre 10 minutes de saisie.",
          "L'étape de récapitulatif permet « retour » ciblé : cliquer une section ramène à son étape.",
        ],
      },
    ],
  },
  {
    id: "upload-fichiers",
    title: "Upload de fichiers",
    level: 3,
    intro:
      "Fichiers : validation, progression, reprise — le formulaire le plus technique.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Validation de fichiers avec Zod",
        code: "import { z } from \"zod\";\n\nconst MAX = 5 * 1024 * 1024; // 5 Mo\nconst schema = z.object({\n  avatar: z.instanceof(File)\n    .refine((f) => f.size <= MAX, \"5 Mo maximum\")\n    .refine((f) => [\"image/jpeg\", \"image/png\"].includes(f.type), \"JPEG ou PNG\"),\n});",
      },
      {
        kind: "text",
        text: "Côté client : valider type et taille avant l'envoi (inutile d'uploader 2 Go pour se faire refuser). Côté envoi : `FormData` + `XMLHttpRequest` (seul à exposer `upload.onprogress`) ou `fetch` avec streaming pour la progression. Côté serveur : revalider type réel (magic bytes, pas l'extension), limiter la taille, stocker hors du webroot.",
      },
      {
        kind: "list",
        items: [
          "Prévisualisation locale via `URL.createObjectURL(file)` — révoquer avec `URL.revokeObjectURL` pour libérer la mémoire.",
          "Uploads longs : envoi par morceaux (chunks) avec reprise, plutôt qu'un seul POST fragile.",
          "Ne jamais faire confiance au `type` MIME du client : c'est déclaratif, pas vérifié.",
        ],
      },
    ],
  },
  {
    id: "performance-formulaires",
    title: "Performance des formulaires",
    level: 3,
    intro:
      "Rester fluide à 50 champs : où partent les re-rendus.",
    blocks: [
      {
        kind: "text",
        text: "Avec des champs contrôlés naïfs (`useState` par champ au niveau du formulaire), chaque frappe re-rend tout le formulaire — imperceptible à 5 champs, catastrophique à 50 avec des composants lourds. React Hook Form évite cela par construction (inputs non contrôlés : la frappe ne touche pas l'état React).",
      },
      {
        kind: "list",
        items: [
          "`watch()` réabonne le composant aux changements : l'appeler au niveau racine re-rend à chaque frappe — le confiner aux sous-composants qui en ont besoin.",
          "Isoler les champs dans des sous-composants mémorisés : une frappe ne re-rend que son champ.",
          "La validation Zod synchrone est rapide ; la validation asynchrone doit être debouncée pour ne pas spammer l'API.",
          "Mesurer avec les React DevTools (profiler) avant d'optimiser : la plupart des formulaires n'ont aucun problème de performance.",
        ],
      },
    ],
  },
  {
    id: "ux-erreurs-avancee",
    title: "UX des erreurs : niveau avancé",
    level: 3,
    intro:
      "Au-delà du message rouge : concevoir l'expérience de l'échec.",
    blocks: [
      {
        kind: "fields",
        title: "Principes",
        fields: [
          {
            label: "Résumé d'erreurs en haut",
            value:
              "Après un échec de soumission, lister les erreurs avec des liens d'ancrage vers chaque champ : l'utilisateur corrige dans l'ordre, sans chercher.",
          },
          {
            label: "Focus automatique",
            value:
              "Placer le focus sur le premier champ en erreur après soumission : l'action suivante est évidente.",
          },
          {
            label: "Erreurs serveur distinguées",
            value:
              "« Cet email est déjà utilisé » (serveur) ne se présente pas comme « Email invalide » (client) : l'utilisateur comprend que c'est sa donnée, pas sa frappe.",
          },
          {
            label: "Ton des messages",
            value:
              "« Choisissez un mot de passe plus long » plutôt que « Erreur : validation échouée ». Les messages sont du copywriting, relus comme tel.",
          },
          {
            label: "Succès explicite",
            value:
              "Confirmer visiblement (« Compte créé, vérifiez vos emails ») : le doute post-soumission génère des doubles envois.",
          },
        ],
      },
    ],
  },
  {
    id: "accessibilite-avancee",
    title: "Accessibilité avancée",
    level: 3,
    intro:
      "Au-delà des labels : les détails qui font passer un audit.",
    blocks: [
      {
        kind: "list",
        items: [
          "`aria-describedby` : lier chaque input à son message d'erreur ET à son texte d'aide (`id` multiples séparés par des espaces).",
          "`role=\"alert\"` sur les erreurs : annonce immédiate par le lecteur d'écran, sans déplacement du focus.",
          "Groupes de cases à cocher / radios : `fieldset` + `legend` — sans quoi le lecteur d'écran annonce des options orphelines.",
          "Instructions avant le champ, pas après : « Format : JJ/MM/AAAA » se lit avant la saisie, pas dans le message d'erreur.",
          "Ne pas désactiver le bouton de soumission pour cause d'invalidité seule : un bouton désactivé n'explique pas pourquoi — laisser soumettre et afficher les erreurs.",
          "Tester au clavier uniquement (Tab, Entrée, Échap) et avec un lecteur d'écran (NVDA, VoiceOver) : aucun audit automatisé ne remplace ce test.",
        ],
      },
    ],
  },
  {
    id: "tests-formulaires",
    title: "Tester les formulaires",
    level: 3,
    intro:
      "Ce qu'il faut tester : les comportements, pas l'implémentation.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Test de soumission avec Testing Library",
        code: "import { render, screen } from \"@testing-library/react\";\nimport userEvent from \"@testing-library/user-event\";\nimport { SignupForm } from \"./SignupForm\";\n\ntest(\"affiche une erreur si l'email est invalide\", async () => {\n  const user = userEvent.setup();\n  render(<SignupForm />);\n  await user.type(screen.getByLabelText(/email/i), \"pas-un-email\");\n  await user.click(screen.getByRole(\"button\", { name: /s'inscrire/i }));\n  expect(await screen.findByText(/email invalide/i)).toBeInTheDocument();\n});",
      },
      {
        kind: "text",
        text: "Tester par les rôles et labels (`getByLabelText`, `getByRole`) : si le test passe, c'est que le formulaire est utilisable au clavier et au lecteur d'écran — le test d'accessibilité est gratuit. Scénarios minimaux : soumission valide (appel API avec les bonnes données), soumission invalide (erreurs affichées, API non appelée), erreur serveur (message affiché via `setError`).",
      },
    ],
  },
  {
    id: "soumission-idempotente",
    title: "Soumission idempotente",
    level: 3,
    intro:
      "Le double-clic ne doit jamais créer deux ressources.",
    blocks: [
      {
        kind: "text",
        text: "Deux couches : côté client, `isSubmitting` désactive le bouton et ignore les soumissions concurrentes. Côté serveur, une clé d'idempotence (UUID généré à l'ouverture du formulaire, envoyé en en-tête) permet au serveur d'ignorer les doublons — indispensable car le client peut être contourné et le réseau peut rejouer.",
      },
      {
        kind: "list",
        items: [
          "Générer la clé d'idempotence au montage du formulaire, pas au clic : un re-clic après échec réseau doit réutiliser la même clé.",
          "Après succès, rediriger ou réinitialiser : un formulaire qui reste rempli invite à resoumettre.",
          "`beforeunload` : avertir si l'utilisateur quitte pendant `isSubmitting` — la requête peut être en vol.",
        ],
      },
    ],
  },
  {
    id: "champs-interdependants",
    title: "Champs interdépendants",
    level: 3,
    intro:
      "Quand la valeur d'un champ change les règles d'un autre.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Pays → indicatif téléphonique",
        code: "import { useForm, useWatch } from \"react-hook-form\";\n\nfunction PhoneForm() {\n  const { register, control } = useForm({\n    defaultValues: { country: \"FR\", phone: \"\" },\n  });\n  const country = useWatch({ control, name: \"country\" });\n  const prefix = country === \"FR\" ? \"+33\" : \"+1\";\n\n  return (\n    <>\n      <select {...register(\"country\")}>...</select>\n      <span>{prefix}</span>\n      <input {...register(\"phone\")} />\n    </>\n  );\n}",
      },
      {
        kind: "text",
        text: "`useWatch` isole la souscription : seul ce composant re-rend quand `country` change, pas tout le formulaire. Pour les règles conditionnelles (champ requis seulement si une case est cochée), Zod gère via `.refine()` ou les unions discriminées — la logique vit dans le schéma, pas dans des `if` dispersés.",
      },
    ],
  },
  {
    id: "comparaison-librairies",
    title: "Librairies : comparaison factuelle",
    level: 3,
    intro:
      "React Hook Form, Formik, TanStack Form : trois options réelles.",
    blocks: [
      {
        kind: "table",
        headers: ["", "React Hook Form", "Formik", "TanStack Form"],
        rows: [
          ["Modèle", "Inputs non contrôlés (refs)", "Champs contrôlés", "Agnostique (headless)"],
          ["Re-rendus", "Minimaux par construction", "Plus nombreux (état à chaque frappe)", "Contrôlés finement"],
          ["Validation", "Via resolvers (Zod, Yup…)", "Intégrée ou via Yup", "Via adaptateurs (Zod…)"],
          ["Écosystème", "Le plus large, standard de fait", "Historique, mature", "Jeune, prometteur"],
          ["Courbe", "Modérée (concepts : register, Controller)", "Douce", "Modérée"],
        ],
      },
      {
        kind: "text",
        text: "Pas de supériorité absolue : React Hook Form est le choix par défaut actuel (performance + écosystème), Formik reste valable sur l'existant, TanStack Form séduit pour les architectures agnostiques. Le critère décisif reste la cohérence d'équipe : une seule librairie par codebase.",
      },
    ],
  },
  {
    id: "securite-formulaires",
    title: "Sécurité des formulaires",
    level: 3,
    intro:
      "Ce que le frontend doit faire — et surtout ne pas prétendre faire.",
    blocks: [
      {
        kind: "list",
        items: [
          "La validation client est de l'UX : le serveur revalide tout, systématiquement. Aucune exception.",
          "Échapper par défaut : React le fait (`{valeur}` n'interprète pas le HTML) — ne jamais utiliser `dangerouslySetInnerHTML` sur des données de formulaire.",
          "CSRF : les cookies de session exigent un token anti-CSRF ; les tokens en `Authorization` (Bearer) y échappent par construction.",
          "Mots de passe : `type=\"password\"`, `autocomplete=\"new-password\"`/`current-password`, jamais en clair dans les logs ou les URLs.",
          "Rate limiting côté serveur sur les formulaires sensibles (login, inscription) : le frontend ne peut pas empêcher le spam.",
          "Ne pas exposer les règles métier sensibles dans les messages d'erreur (« ce compte existe » aide l'énumération — doser selon le contexte).",
        ],
      },
    ],
  },
  {
    id: "i18n-formulaires",
    title: "Internationalisation",
    level: 3,
    intro:
      "Un formulaire multilingue : messages, formats, ordre des champs.",
    blocks: [
      {
        kind: "list",
        items: [
          "Messages d'erreur traduits : les définir via des clés (`t('errors.email_invalid')`) plutôt qu'en dur dans le schéma — ou paramétrer Zod avec un dictionnaire.",
          "Formats locaux : dates, téléphones, codes postaux — les regex « universelles » n'existent pas, valider par locale.",
          "Ordre des champs : nom/prénom s'inversent selon les cultures — ne pas présumer de l'ordre occidental.",
          "Direction RTL : les formulaires en arabe/hébreu se miroitent (`dir=\"rtl\"`) — tester le layout.",
          "Ne jamais concaténer des phrases traduites : chaque langue a sa grammaire, chaque message est une unité.",
        ],
      },
    ],
  },
  {
    id: "cas-limites",
    title: "Cas limites",
    level: 3,
    intro:
      "Les détails qui distinguent un formulaire robuste : à cocher avant livraison.",
    blocks: [
      {
        kind: "fields",
        title: "Checklist des cas limites",
        fields: [
          {
            label: "Autofill du navigateur",
            value:
              "Les gestionnaires de mots de passe remplissent sans déclencher `onChange` : React Hook Form (non contrôlé) les capte, les champs contrôlés naïfs peuvent les rater.",
          },
          {
            label: "Entrée pour soumettre",
            value:
              "Dans un `<form>`, Entrée soumet depuis n'importe quel champ — sauf `textarea` (saut de ligne) : comportement à connaître, pas à casser.",
          },
          {
            label: "Valeurs extrêmes",
            value:
              "Chaînes très longues, caractères spéciaux, emoji dans le nom : la validation et l'affichage doivent tenir.",
          },
          {
            label: "Réseau lent / hors ligne",
            value:
              "Timeout visible, nouvelle tentative, pas de perte des données saisies en cas d'échec.",
          },
          {
            label: "Navigation pendant la saisie",
            value:
              "Avertir des modifications non enregistrées (`isDirty` + `beforeunload`) sur les formulaires longs.",
          },
          {
            label: "Zoom 200 %",
            value:
              "Le layout tient, les erreurs restent visibles et liées à leurs champs.",
          },
        ],
      },
    ],
  },
  {
    id: "bonnes-pratiques-formulaires",
    title: "Bonnes pratiques",
    level: 3,
    intro:
      "Les habitudes qui séparent un formulaire qui marche d'un formulaire soigné.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un schéma Zod = une source de vérité : validation, types, messages — partagé avec le backend quand c'est possible.",
          "Valider au blur, pas à la frappe ; tout valider à la soumission.",
          "Chaque erreur dit quoi corriger, est liée à son champ (`aria-describedby`) et annoncée (`role=\"alert\"`).",
          "Désactiver le bouton pendant `isSubmitting`, jamais pour masquer une invalidité.",
          "Idempotence : clé d'idempotence + bouton désactivé + redirection après succès.",
          "Tester les trois scénarios : valide, invalide, erreur serveur — avec Testing Library par les rôles.",
          "Relire les messages d'erreur comme du copywriting : ton, précision, traduction.",
          "Ne jamais logger le contenu brut d'un formulaire.",
        ],
      },
    ],
  },
  {
    id: "checklist-production-formulaires",
    title: "Checklist de mise en production",
    level: 3,
    intro:
      "Avant d'ouvrir le formulaire aux utilisateurs.",
    blocks: [
      {
        kind: "fields",
        title: "À valider",
        fields: [
          {
            label: "Validation double",
            value: "Client (UX) + serveur (sécurité) : les deux testées indépendamment.",
          },
          {
            label: "Accessibilité",
            value: "Labels, ARIA, navigation clavier, test au lecteur d'écran sur les parcours critiques.",
          },
          {
            label: "Idempotence",
            value: "Double-clic, double soumission réseau : une seule ressource créée.",
          },
          {
            label: "États",
            value: "Chargement, succès, échec réseau, échec serveur : chaque état a son UI.",
          },
          {
            label: "Données",
            value: "Aucun secret loggé, mots de passe jamais en clair, payloads minimaux.",
          },
          {
            label: "Mobile",
            value: "Claviers adaptés (`inputMode`), zoom, tactile : testé sur téléphone réel.",
          },
        ],
      },
    ],
  },
  {
    id: "selects-radios-checkboxes",
    title: "Selects, radios et cases à cocher",
    level: 3,
    intro:
      "Les inputs non textuels : leurs pièges spécifiques avec React Hook Form.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Les trois familles",
        code: "// Select : valeur unique parmi des options\n<select {...register(\"country\")}>\n  <option value=\"FR\">France</option>\n  <option value=\"US\">États-Unis</option>\n</select>\n\n// Radios : même nom, une seule valeur sélectionnée\n<input type=\"radio\" value=\"card\" {...register(\"payment\")} />\n<input type=\"radio\" value=\"cash\" {...register(\"payment\")} />\n\n// Checkbox unique : booléen\n<input type=\"checkbox\" {...register(\"newsletter\")} />\n\n// Checkboxes multiples : tableau de valeurs\n{[\"js\", \"ts\"].map((l) => (\n  <input key={l} type=\"checkbox\" value={l} {...register(\"langs\")} />\n))}",
      },
      {
        kind: "text",
        text: "Règles : les radios partagent le même `name` (via un seul `register`) pour former un groupe exclusif ; les checkboxes multiples avec le même `name` produisent un tableau. Côté Zod : `z.enum()` pour le select/radio, `z.boolean()` pour la case unique, `z.array(z.string())` pour les multiples. Accessibilité : `fieldset` + `legend` autour de chaque groupe.",
      },
    ],
  },
  {
    id: "champs-nombre-date",
    title: "Nombres et dates : les quirks",
    level: 3,
    intro:
      "Les types `number` et `date` semblent simples : ils ne le sont pas.",
    blocks: [
      {
        kind: "fields",
        title: "À savoir",
        fields: [
          {
            label: "`type=\"number\"` renvoie une chaîne",
            value:
              "Le DOM renvoie toujours une string (ou `\"\"` si vide) : `z.coerce.number()` convertit, mais `\"\"` devient `NaN` — gérer le cas vide explicitement.",
          },
          {
            label: "`type=\"date\"` : format ISO",
            value:
              "`value` vaut `\"2026-09-29\"` (AAAA-MM-JJ) quelle que soit la locale d'affichage. Valider avec `z.string().regex(/^\\d{4}-\\d{2}-\\d{2}$/)` ou `z.coerce.date()`.",
          },
          {
            label: "Spinners natifs",
            value:
              "Les flèches d'incrémentation des inputs number sont minuscules sur mobile : souvent mieux de garder `inputMode=\"numeric\"` sur un champ texte.",
          },
          {
            label: "Fuseaux horaires",
            value:
              "`new Date(\"2026-09-29\")` est minuit UTC, pas locale : pour une date de naissance c'est sans conséquence, pour un rendez-vous c'est un bug.",
          },
        ],
      },
    ],
  },
  {
    id: "masques-saisie",
    title: "Masques de saisie",
    level: 3,
    intro:
      "Formater pendant la frappe : téléphone, carte bancaire, codes.",
    blocks: [
      {
        kind: "text",
        text: "Un masque affiche `06 12 34 56 78` pendant que l'utilisateur tape `0612345678` : la valeur affichée est formatée, la valeur stockée reste brute. Deux approches : formater dans `onChange` (champ contrôlé, simple) ou utiliser une librairie de masques. Règle d'or : ne jamais empêcher la frappe — un masque qui bloque les suppressions ou les collages est pire que pas de masque.",
      },
      {
        kind: "list",
        items: [
          "Valider la valeur brute (chiffres seuls), pas la valeur formatée (avec espaces).",
          "Gérer le collage : `0612345678` collé d'un coup doit se formater correctement.",
          "Le curseur doit rester logique après formatage : tester en tapant au milieu du champ.",
          "Préférer `inputMode=\"numeric\"` au `type=\"number\"` pour les masques : pas de spinner, clavier numérique sur mobile.",
        ],
      },
    ],
  },
  {
    id: "modes-validation",
    title: "Modes de validation",
    level: 3,
    intro:
      "`onChange`, `onBlur`, `onTouched`, `onSubmit`, `all` : choisir le déclencheur.",
    blocks: [
      {
        kind: "table",
        headers: ["Mode", "Déclenchement", "Usage"],
        rows: [
          ["`onSubmit`", "À la soumission uniquement", "Défaut : simple, jamais agressif"],
          ["`onBlur`", "À la sortie du champ", "Bon compromis : feedback après saisie"],
          ["`onTouched`", "Après premier blur, puis à chaque frappe", "Le plus UX : indulgent puis réactif"],
          ["`onChange`", "À chaque frappe", "Feedback live (force du mot de passe), pas pour les erreurs bloquantes"],
          ["`all`", "Blur + change", "Contrôle total, à réserver aux cas précis"],
        ],
      },
      {
        kind: "text",
        text: "Le mode `onTouched` est le meilleur défaut pour la plupart des formulaires : pas d'erreur avant que l'utilisateur ait interagi, puis correction en temps réel. Après un échec de soumission, `reValidateMode: 'onChange'` fait réévaluer à chaque frappe — l'utilisateur voit ses corrections prises en compte immédiatement.",
      },
    ],
  },
  {
    id: "erreurs-serveur",
    title: "Erreurs serveur",
    level: 3,
    intro:
      "Quand le backend refuse : intégrer ses erreurs dans le formulaire.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Injecter les erreurs API",
        code: "const { setError } = useForm();\n\nconst onSubmit = async (data) => {\n  const res = await fetch(\"/api/signup\", { method: \"POST\", body: JSON.stringify(data) });\n  if (res.status === 422) {\n    const { errors } = await res.json();\n    // { \"email\": \"déjà utilisé\", \"password\": \"trop faible\" }\n    for (const [field, message] of Object.entries(errors)) {\n      setError(field, { type: \"server\", message });\n    }\n    return;\n  }\n  if (!res.ok) {\n    setError(\"root.server\", { message: \"Erreur inattendue, réessayez.\" });\n  }\n};",
      },
      {
        kind: "text",
        text: "`setError` injecte les erreurs serveur dans le même circuit que les erreurs client : même affichage, même accessibilité. Les erreurs globales (panne, rate limit) vont dans `errors.root` avec un message dédié en haut du formulaire. Contrat d'API : le backend renvoie un objet `{ champ: message }` structuré — à convenir une fois pour toutes.",
      },
    ],
  },
  {
    id: "valeurs-defaut-reset",
    title: "Valeurs par défaut et reset",
    level: 3,
    intro:
      "Initialiser, réinitialiser, charger en asynchrone : les subtilités de `defaultValues`.",
    blocks: [
      {
        kind: "fields",
        title: "Situations",
        fields: [
          {
            label: "Valeurs synchrones",
            value:
              "`useForm({ defaultValues: { email: \"\" } })` : toujours fournir des défauts — sans eux, les champs sont `undefined` et les comportements divergent.",
          },
          {
            label: "Valeurs asynchrones (édition)",
            value:
              "Charger un profil depuis l'API puis `reset(donnees)` : `defaultValues` ne peut pas attendre. `reset` remplace aussi la référence du « propre » pour `isDirty`.",
          },
          {
            label: "Reset après succès",
            value:
              "`reset()` vide le formulaire après une soumission réussie — mais sur un formulaire long, demander confirmation ou rediriger plutôt que d'effacer silencieusement.",
          },
          {
            label: "Valeurs par défaut dynamiques",
            value:
              "Si les défauts dépendent de props qui changent, `reset()` dans un `useEffect` : `defaultValues` n'est lu qu'à l'initialisation.",
          },
        ],
      },
    ],
  },
  {
    id: "autocomplete-attributs",
    title: "Attributs autocomplete",
    level: 3,
    intro:
      "Aider le navigateur à aider l'utilisateur : les bons tokens.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Tokens courants",
        code: "<input autoComplete=\"email\" />\n<input autoComplete=\"current-password\" type=\"password\" />\n<input autoComplete=\"new-password\" type=\"password\" />\n<input autoComplete=\"cc-number\" inputMode=\"numeric\" />\n<input autoComplete=\"postal-code\" />\n<input autoComplete=\"tel\" />",
      },
      {
        kind: "text",
        text: "Un `autocomplete` correct permet au gestionnaire de mots de passe et à l'autofill du navigateur de remplir sans erreur — c'est un gain d'UX et d'accessibilité gratuit. `new-password` vs `current-password` : le navigateur propose de générer un mot de passe sur le premier, remplit le trousseau sur le second. Les confondre casse les deux comportements.",
      },
    ],
  },
  {
    id: "gestion-focus",
    title: "Gestion du focus",
    level: 3,
    intro:
      "Guider l'attention : focus initial, focus d'erreur, focus de confirmation.",
    blocks: [
      {
        kind: "list",
        items: [
          "Focus initial : `autoFocus` sur le premier champ du formulaire — sauf si cela déclenche un clavier mobile intempestif.",
          "Après échec de soumission : focus sur le premier champ en erreur (`setFocus('email')` de React Hook Form).",
          "Après succès : déplacer le focus sur le message de confirmation (avec `tabIndex={-1}`) pour les lecteurs d'écran.",
          "Étapes d'un wizard : focus sur le titre de la nouvelle étape à chaque changement.",
          "Ne jamais déplacer le focus pendant la frappe : uniquement sur des transitions explicites (soumission, étape).",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "Formulaires maîtrisés, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "`react-hooks` : `useForm`, `useFieldArray`, `useWatch` sont des hooks — comprendre leurs règles éclaire leur comportement.",
          "`react-state` : quand l'état du formulaire dépasse le formulaire (wizard global, brouillons partagés).",
          "`react` : les fondamentaux — composants, événements, rendu — restent le socle.",
          "Backend : validation serveur, idempotence, upload — le formulaire ne vit pas seul.",
          "Accessibilité : audit complet d'un parcours, au-delà du formulaire.",
          "Revenir à la roadmap : valider les formulaires et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
  {
    id: "ressources-avancees",
    title: "Ressources avancées",
    level: 3,
    intro:
      "Aller plus loin, en commençant toujours par les documentations officielles.",
    blocks: [
      {
        kind: "fields",
        title: "Documentations officielles (à privilégier)",
        fields: [
          {
            label: "react-hook-form.com",
            value: "API avancée : `useFieldArray`, `Controller`, `useFormContext`, performance.",
          },
          {
            label: "zod.dev",
            value: "Schémas avancés : discriminated unions, transformations, messages personnalisés.",
          },
          {
            label: "w3.org/WAI/tutorials/forms",
            value: "Le tutoriel accessibilité du W3C : labels, erreurs, instructions multi-pages.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les trois projets progressifs de cette page, dans l'ordre.",
          "Testing : documentation de Testing Library (requêtes par rôles, user-event).",
        ],
      },
    ],
  },
];

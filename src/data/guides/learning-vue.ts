import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de Vue.js : de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Approche : Composition API avec `<script setup>` d'abord (style recommandé
 * par la documentation officielle) ; l'Options API est expliquée en
 * comparaison factuelle, sans dénigrement.
 */
export const LEARNING_VUE: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est Vue, ce que « progressif » veut dire, et pourquoi ce framework occupe une place à part.",
    blocks: [
      {
        kind: "text",
        text: "Vue.js est un framework JavaScript open source, créé par Evan You, pour construire des interfaces utilisateur à partir de composants réutilisables. On décrit l'interface dans un template déclaratif lié à un état réactif : quand l'état change, Vue met à jour le DOM automatiquement.",
      },
      {
        kind: "text",
        text: "Le mot clé de Vue est « progressif » : le framework s'adopte par incréments. On peut l'utiliser pour dynamiser une simple portion de page existante via un script CDN, ou construire une application complète avec routage, gestion d'état centralisée et rendu côté serveur. Entre les deux, tous les paliers sont possibles, sans réécriture.",
      },
      {
        kind: "fields",
        title: "Vue en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Vue lie un template déclaratif à un état réactif : `état → template → DOM synchronisé`.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Manipuler le DOM à la main devient vite ingérable : l'état et l'affichage se désynchronisent. Vue centralise la source de vérité dans un état réactif et se charge des mises à jour du DOM, avec une courbe d'apprentissage volontairement douce.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Interfaces interactives : tableaux de bord, applications métier, e-commerce, sites de contenu dynamiques. Son adoption incrémentale en fait aussi un bon choix pour moderniser progressivement un site existant.",
          },
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni un langage, ni un outil de backend. Vue 3 est écrit en TypeScript et s'utilise idéalement avec TypeScript, mais il fonctionne aussi en JavaScript pur.",
          },
        ],
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : réactivité",
    level: 1,
    intro:
      "La seule idée à retenir avant tout le reste : en Vue, on ne manipule pas le DOM, on déclare des données réactives.",
    blocks: [
      {
        kind: "diagram",
        title: "Le cycle de Vue, en une image",
        lines: [
          "État réactif (ref / reactive)",
          "     │  modifié",
          "     ▼",
          "Système de réactivité (proxies)",
          "     │  notifie",
          "     ▼",
          "Re-rendu du composant (template recompilé)",
          "     │",
          "     ├── comparé au DOM virtuel précédent",
          "     │",
          "     ▼",
          "DOM réel (mises à jour minimales)",
        ],
      },
      {
        kind: "text",
        text: "Concrètement : vous déclarez `const compteur = ref(0)` et vous l'affichez avec `{{ compteur }}` dans le template. Quand le code fait `compteur.value++`, Vue détecte le changement et met à jour uniquement le nœud du DOM concerné. Vous ne touchez jamais au DOM vous-même.",
      },
      {
        kind: "fields",
        title: "Les trois piliers à retenir",
        fields: [
          {
            label: "Réactivité",
            value:
              "`ref()` et `reactive()` rendent les données observables : toute modification déclenche la mise à jour de l'interface.",
          },
          {
            label: "Composants",
            value:
              "Des fichiers `.vue` autonomes (template + logique + style) que l'on compose comme des briques.",
          },
          {
            label: "Template déclaratif",
            value:
              "Du HTML enrichi de directives (`v-if`, `v-for`, `v-model`) qui décrivent le comportement sans code impératif.",
          },
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
    intro: "Ce qu'il faut déjà connaître avant d'apprendre Vue.",
    blocks: [
      {
        kind: "list",
        items: [
          "`HTML` : structure des pages, formulaires, attributs — Vue écrit ses templates en HTML enrichi.",
          "`CSS` : sélecteurs, classes, mise en page — chaque composant Vue embarque souvent son style.",
          "`JavaScript` : variables, fonctions, objets, tableaux, modules ES (`import`/`export`) — la logique des composants est du JavaScript.",
          "Optionnel mais utile : `TypeScript` pour les projets sérieux, et les bases de `Node.js`/`npm` pour l'outillage.",
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : si JavaScript vous semble encore fragile (closures, `this`, promesses), consolidez-le d'abord. Vue ne remplace pas le langage : il l'organise.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation : créer un projet",
    level: 2,
    intro:
      "La voie officielle pour démarrer un projet Vue : le générateur `create-vue`.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier Node.js",
        command: "node --version",
        why: "`create-vue` et l'outillage Vue tournent sur Node.js. Une version LTS récente est attendue ; la commande affiche la version installée.",
        verify: "Un numéro de version s'affiche, par exemple `v22.x.x`.",
      },
      {
        kind: "command",
        label: "Créer le projet",
        command: "npm create vue@latest",
        why: "C'est le générateur officiel : il pose une série de questions (TypeScript ? Router ? Pinia ? tests ?) puis génère un projet Vite + Vue configuré. Aucune configuration manuelle n'est nécessaire pour démarrer.",
        verify: "Un dossier est créé avec `package.json`, `vite.config.ts` et `src/`.",
      },
      {
        kind: "text",
        text: "Les questions du générateur correspondent à des besoins réels : répondez « non » à tout pour un premier projet d'apprentissage (vous pourrez ajouter Router ou Pinia plus tard avec `npm install`), « oui » à TypeScript si vous visez un usage professionnel.",
      },
      {
        kind: "command",
        label: "Installer les dépendances",
        command: "npm install",
        why: "À exécuter dans le dossier du projet : télécharge Vue, Vite et les outils choisis dans `node_modules` d'après `package.json`.",
        verify: "Le dossier `node_modules/` apparaît, sans erreur dans le terminal.",
      },
    ],
  },
  {
    id: "structure-projet",
    title: "Structure du projet généré",
    level: 2,
    intro: "Repérez-vous dans les fichiers créés par `create-vue`.",
    blocks: [
      {
        kind: "diagram",
        title: "Arborescence d'un projet Vue + Vite",
        lines: [
          "mon-projet/",
          "├── index.html          → point d'entrée, contient <div id=\"app\">",
          "├── package.json        → scripts npm et dépendances",
          "├── vite.config.ts      → configuration du bundler Vite",
          "└── src/",
          "    ├── main.ts         → crée l'app Vue et la monte sur #app",
          "    ├── App.vue         → composant racine",
          "    ├── assets/         → CSS global, images",
          "    └── components/     → vos composants .vue",
        ],
      },
      {
        kind: "code",
        language: "ts",
        title: "src/main.ts — le démarrage de l'application",
        code: "import { createApp } from 'vue'\nimport App from './App.vue'\n\ncreateApp(App).mount('#app')",
      },
      {
        kind: "text",
        text: "Trois lignes, trois rôles : `createApp` fabrique l'application à partir du composant racine `App`, puis `mount('#app')` l'attache au `<div id=\"app\">` de `index.html`. Les plugins (Router, Pinia) s'enregistrent ici avec `app.use(...)` avant le `mount`.",
      },
    ],
  },
  {
    id: "premier-composant",
    title: "Premier composant : tutoriel",
    level: 2,
    intro: "Votre premier composant interactif, étape par étape.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le fichier",
            detail:
              "Créez `src/components/Compteur.vue`. L'extension `.vue` signale un Single-File Component : template, logique et style dans un seul fichier.",
          },
          {
            title: "Écrire le template",
            detail:
              "Ajoutez `<template>` avec un paragraphe affichant `{{ compteur }}` et un bouton `<button @click=\"incrementer\">`. Les doubles accolades affichent une valeur réactive.",
          },
          {
            title: "Écrire la logique",
            detail:
              "Ajoutez `<script setup>` : `import { ref } from 'vue'`, déclarez `const compteur = ref(0)`, puis la fonction `incrementer()` qui fait `compteur.value++`.",
          },
          {
            title: "Utiliser le composant",
            detail:
              "Dans `App.vue`, importez-le (`import Compteur from './components/Compteur.vue'`) et placez `<Compteur />` dans le template.",
          },
          {
            title: "Lancer et vérifier",
            detail:
              "Exécutez `npm run dev`, ouvrez l'URL affichée : chaque clic incrémente le nombre sans rechargement de page.",
          },
        ],
      },
      {
        kind: "code",
        language: "vue",
        title: "src/components/Compteur.vue — version complète",
        code: "<script setup>\nimport { ref } from 'vue'\n\nconst compteur = ref(0)\n\nfunction incrementer() {\n  compteur.value++\n}\n</script>\n\n<template>\n  <p>Clics : {{ compteur }}</p>\n  <button @click=\"incrementer\">Incrémenter</button>\n</template>",
      },
    ],
  },
  {
    id: "serveur-dev",
    title: "Serveur de développement",
    level: 2,
    intro: "Les trois commandes qui rythment le quotidien.",
    blocks: [
      {
        kind: "command",
        label: "Lancer le serveur de développement",
        command: "npm run dev",
        why: "Démarre Vite en mode développement : rechargement à chaud (HMR) — chaque modification du code met à jour le navigateur instantanément, en conservant l'état de l'application quand c'est possible.",
        verify: "Le terminal affiche une URL locale, généralement `http://localhost:5173/`.",
      },
      {
        kind: "command",
        label: "Construire pour la production",
        command: "npm run build",
        why: "Compile l'application en fichiers statiques optimisés (minifiés, découpés) dans le dossier `dist/`, prêts à être déployés sur n'importe quel hébergeur de fichiers statiques.",
        verify: "Le dossier `dist/` est créé avec `index.html` et des fichiers `assets/`.",
      },
      {
        kind: "command",
        label: "Prévisualiser le build",
        command: "npm run preview",
        why: "Sert localement le contenu de `dist/` pour vérifier le comportement réel de la version de production avant déploiement.",
        verify: "L'application s'affiche sur une URL locale, sans le rechargement à chaud.",
      },
    ],
  },
  {
    id: "editeurs",
    title: "Éditeurs et extensions",
    level: 2,
    intro: "Un bon support de Vue dans l'éditeur change tout : autocomplétion du template, vérification des types, navigation.",
    blocks: [
      {
        kind: "fields",
        title: "Éditeurs courants",
        fields: [
          {
            label: "VS Code",
            value:
              "Le plus répandu pour Vue. Extension officielle : « Vue (Official) » (anciennement Volar) — coloration, autocomplétion et vérification de type dans les fichiers `.vue`.",
          },
          {
            label: "WebStorm",
            value:
              "IDE JetBrains avec support Vue intégré, sans extension à installer. Apprécié pour le refactoring et la navigation dans les gros projets.",
          },
          {
            label: "Zed / Neovim",
            value:
              "Éditeurs légers : le support Vue passe par le serveur de langage officiel (`vue_ls`), configurable via les réglages LSP.",
          },
        ],
      },
      {
        kind: "text",
        text: "Point important : l'extension officielle « Vue (Official) » remplace l'ancienne « Vetur », pensée pour Vue 2. Si les deux sont installées, désactivez Vetur pour éviter les conflits de diagnostics.",
      },
    ],
  },
  {
    id: "devtools-vue",
    title: "Vue DevTools",
    level: 2,
    intro: "L'extension de navigateur indispensable pour inspecter une application Vue.",
    blocks: [
      {
        kind: "text",
        text: "Vue DevTools (extension Chrome / Firefox / Edge) ajoute un onglet « Vue » aux outils de développement du navigateur. On y voit l'arbre des composants, l'état réactif de chacun (`ref`, props), les événements émis, les routes actives et les stores Pinia.",
      },
      {
        kind: "list",
        items: [
          "Inspecter l'état d'un composant en direct et le modifier pour tester un cas limite.",
          "Suivre les événements émis (`emit`) entre composants parent et enfant.",
          "Repérer les composants qui se re-rendent trop souvent (timeline des performances).",
          "Explorer les stores Pinia : état, getters, historique des actions.",
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : gardez DevTools ouvert dès le développement. La plupart des bugs « l'interface ne se met pas à jour » se diagnostiquent en dix secondes en regardant si la donnée réactive a réellement changé.",
      },
    ],
  },
  {
    id: "workflow-quotidien",
    title: "Workflow quotidien",
    level: 2,
    intro: "À quoi ressemble une journée de travail sur un projet Vue.",
    blocks: [
      {
        kind: "diagram",
        title: "La boucle de développement",
        lines: [
          "npm run dev  →  navigateur ouvert sur localhost",
          "     │",
          "     ├── modifier un .vue → HMR : mise à jour instantanée",
          "     │",
          "     ├── DevTools : inspecter état / props / événements",
          "     │",
          "     ├── git commit : versionner par petites étapes",
          "     │",
          "     ▼",
          "npm run build → vérifier dist/ → déployer",
        ],
      },
      {
        kind: "list",
        items: [
          "Un composant par fichier `.vue`, nommé en PascalCase (`ListeTaches.vue`).",
          "La logique métier réutilisable va dans des composables (`use...`), pas copiée entre composants.",
          "Les appels API sont centralisés (dossier `services/` ou `api/`), jamais dispersés dans les templates.",
          "On commite souvent : un composant qui fonctionne est une unité de commit naturelle.",
        ],
      },
    ],
  },
  {
    id: "template-interpolation",
    title: "Le template : interpolation et directives",
    level: 2,
    intro: "Le vocabulaire de base pour afficher des données et réagir aux actions.",
    blocks: [
      {
        kind: "code",
        language: "vue",
        title: "Les briques du template",
        code: "<script setup>\nimport { ref } from 'vue'\n\nconst message = ref('Bonjour Vue')\nconst connecte = ref(true)\nconst taches = ref(['Apprendre Vue', 'Construire une app'])\n</script>\n\n<template>\n  <p>{{ message }}</p>\n  <p v-if=\"connecte\">Bienvenue !</p>\n  <p v-else>Veuillez vous connecter.</p>\n  <ul>\n    <li v-for=\"tache in taches\" :key=\"tache\">{{ tache }}</li>\n  </ul>\n  <button @click=\"connecte = !connecte\">Basculer</button>\n</template>",
      },
      {
        kind: "fields",
        title: "Ce que fait chaque syntaxe",
        fields: [
          {
            label: "{{ ... }}",
            value:
              "Interpolation : affiche la valeur d'une expression JavaScript. Se met à jour automatiquement quand la donnée réactive change.",
          },
          {
            label: "v-if / v-else",
            value:
              "Rendu conditionnel : l'élément n'existe dans le DOM que si la condition est vraie.",
          },
          {
            label: "v-for",
            value:
              "Répète un élément pour chaque entrée d'une liste. `:key` donne à Vue un identifiant stable pour suivre chaque élément.",
          },
          {
            label: "@click",
            value:
              "Raccourci de `v-on:click` : exécute du code (ici une expression) quand l'utilisateur clique.",
          },
        ],
      },
    ],
  },
  {
    id: "premier-formulaire",
    title: "Premier formulaire avec v-model",
    level: 2,
    intro: "La liaison bidirectionnelle : la directive la plus emblématique de Vue.",
    blocks: [
      {
        kind: "code",
        language: "vue",
        title: "Un champ lié à une donnée réactive",
        code: "<script setup>\nimport { ref } from 'vue'\n\nconst nom = ref('')\n</script>\n\n<template>\n  <label>\n    Votre nom :\n    <input v-model=\"nom\" placeholder=\"Tapez votre nom\" />\n  </label>\n  <p>Bonjour, {{ nom || 'inconnu' }} !</p>\n</template>",
      },
      {
        kind: "text",
        text: "`v-model` crée une liaison dans les deux sens : quand l'utilisateur tape, `nom.value` est mis à jour ; quand le code modifie `nom.value`, le champ affiche la nouvelle valeur. C'est l'équivalent déclaratif d'écouter l'événement `input` et de mettre à jour la valeur à la main — en une directive.",
      },
      {
        kind: "text",
        text: "Erreur fréquente : oublier que `v-model` sur un `<input type=\"number\">` produit une chaîne de caractères. Ajoutez le modificateur `.number` (`v-model.number`) pour obtenir un vrai nombre.",
      },
    ],
  },

  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "anatomie-sfc",
    title: "Anatomie d'un Single-File Component",
    level: 3,
    intro: "Le fichier `.vue` : trois blocs, un seul composant.",
    blocks: [
      {
        kind: "code",
        language: "vue",
        title: "Structure canonique d'un SFC",
        code: "<script setup>\n// Logique du composant : imports, état réactif, fonctions.\n// Le code ici s'exécute une fois à la création du composant.\n</script>\n\n<template>\n  <!-- Interface : HTML enrichi de directives Vue. -->\n  <!-- Un seul élément racine n'est plus obligatoire depuis Vue 3. -->\n</template>\n\n<style scoped>\n/* Style du composant. `scoped` limite le CSS à ce composant. */\n</style>",
      },
      {
        kind: "fields",
        title: "Les trois blocs",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un SFC regroupe le template (quoi afficher), le script (les données et la logique) et le style (l'apparence) d'un composant dans un seul fichier `.vue`.",
          },
          {
            label: "Pourquoi",
            value:
              "Regrouper par composant plutôt que par type de fichier : tout ce qui concerne un bouton vit au même endroit, ce qui facilite la lecture, le déplacement et la suppression.",
          },
          {
            label: "scoped",
            value:
              "L'attribut `scoped` sur `<style>` ajoute un identifiant unique aux sélecteurs : le CSS ne fuit pas vers les autres composants. Sans `scoped`, le style est global.",
          },
          {
            label: "Variantes",
            value:
              "`<script setup>` (recommandé), `<script>` classique avec `export default`, `<style module>` pour les classes CSS Modules. On peut aussi cumuler plusieurs blocs `<style>`.",
          },
        ],
      },
    ],
  },
  {
    id: "script-setup",
    title: "<script setup> : la syntaxe recommandée",
    level: 3,
    intro: "La façon moderne d'écrire un composant Vue, recommandée par la documentation officielle.",
    blocks: [
      {
        kind: "text",
        text: "Avec `<script setup>`, tout ce qui est déclaré au niveau du script (variables, fonctions, imports) est directement utilisable dans le template, sans `return` ni objet d'options. Le code est plus court, mieux typé avec TypeScript, et légèrement plus performant à la compilation.",
      },
      {
        kind: "code",
        language: "vue",
        title: "Le même composant, avec et sans <script setup>",
        code: "<!-- Avec <script setup> (recommandé) -->\n<script setup>\nimport { ref } from 'vue'\nconst compteur = ref(0)\n</script>\n<template>\n  <button @click=\"compteur++\">{{ compteur }}</button>\n</template>",
      },
      {
        kind: "fields",
        title: "À savoir",
        fields: [
          {
            label: "Macros du compilateur",
            value:
              "`defineProps`, `defineEmits`, `defineExpose` sont des macros : utilisables sans import, elles sont traitées à la compilation, pas à l'exécution.",
          },
          {
            label: "Top-level await",
            value:
              "On peut utiliser `await` directement au niveau du `<script setup>` : le composant devient asynchrone (à combiner avec `<Suspense>`).",
          },
          {
            label: "Quand s'en passer",
            value:
              "Rare : quand on a besoin d'options non supportées par `setup` (comme `inheritAttrs: false` combiné à un nom explicite), on ajoute un bloc `<script>` classique à côté.",
          },
        ],
      },
    ],
  },
  {
    id: "composition-vs-options",
    title: "Composition API vs Options API",
    level: 3,
    intro: "Les deux styles d'écriture de Vue 3, comparés factuellement.",
    blocks: [
      {
        kind: "table",
        headers: ["Aspect", "Options API", "Composition API"],
        rows: [
          ["Style", "Objet d'options : `data`, `methods`, `computed`", "Fonctions importées : `ref`, `computed`, `watch`"],
          ["Organisation", "Par type d'option (données / méthodes / calculé)", "Par fonctionnalité (toute la logique d'un besoin au même endroit)"],
          ["Réutilisation", "Mixins (risque de collisions de noms)", "Composables : simples fonctions importables"],
          ["TypeScript", "Possible, inférence parfois laborieuse", "Excellente inférence de types"],
          ["Courbe d'apprentissage", "Plus douce pour débuter", "Demande de comprendre `ref`/`reactive`"],
        ],
      },
      {
        kind: "text",
        text: "Recommandation officielle actuelle : la documentation Vue 3 enseigne la Composition API avec `<script setup>` en premier, et la recommande pour les nouveaux projets. L'Options API reste entièrement supportée — elle n'est pas dépréciée — et reste pertinente pour migrer progressivement du code Vue 2 ou pour les développeurs qui la préfèrent.",
      },
      {
        kind: "text",
        text: "Bonne pratique : choisissez un style par projet et tenez-vous-y. Les deux styles cohabitent dans une même application, mais les mélanger composant par composant complique la lecture.",
      },
    ],
  },
  {
    id: "ref",
    title: "ref() : la brique réactive de base",
    level: 3,
    intro: "Rendre n'importe quelle valeur réactive.",
    blocks: [
      {
        kind: "fields",
        title: "ref() en détail",
        fields: [
          {
            label: "En une phrase",
            value:
              "`ref()` enveloppe une valeur dans un objet réactif : on lit et modifie la valeur via la propriété `.value` dans le script, et directement par son nom dans le template.",
          },
          {
            label: "Pourquoi",
            value:
              "JavaScript ne permet pas d'intercepter la réaffectation d'une variable primitive (`let x = 0`) : l'objet conteneur donne à Vue un point d'observation.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Pour les valeurs primitives (nombres, chaînes, booléens) et partout où l'on réaffecte la variable. C'est le choix par défaut recommandé.",
          },
          {
            label: "Exemple simple",
            value: "`const nom = ref('Ada')` puis `nom.value = 'Grace'` dans le script ; `{{ nom }}` dans le template (sans `.value`).",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `.value` dans le script (`nom = 'Grace'` remplace l'objet ref et casse la réactivité) ou l'ajouter dans le template (`{{ nom.value }}` fonctionne mais est inutile).",
          },
          {
            label: "Bonne pratique",
            value:
              "Nommez les refs comme des variables ordinaires (`compteur`, pas `compteurRef`) : le template les utilise sans `.value`, le code reste lisible.",
          },
        ],
      },
      {
        kind: "code",
        language: "vue",
        title: "ref avec un objet : déballage automatique",
        code: "<script setup>\nimport { ref } from 'vue'\n\nconst utilisateur = ref({ nom: 'Ada', age: 36 })\n\nfunction anniversaire() {\n  utilisateur.value.age++ // .value obligatoire dans le script\n}\n</script>\n\n<template>\n  <!-- .value inutile dans le template : déballage automatique -->\n  <p>{{ utilisateur.nom }} a {{ utilisateur.age }} ans</p>\n</template>",
      },
    ],
  },
  {
    id: "reactive",
    title: "reactive() : l'objet réactif",
    level: 3,
    intro: "L'alternative à `ref` pour les objets — et leurs différences réelles.",
    blocks: [
      {
        kind: "fields",
        title: "reactive() en détail",
        fields: [
          {
            label: "En une phrase",
            value:
              "`reactive()` rend un objet (ou tableau) profondément réactif via un Proxy : on accède directement à `etat.compteur`, sans `.value`.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Pour regrouper plusieurs valeurs liées (`const formulaire = reactive({ nom: '', email: '' })`). Pratique quand on ne réaffecte jamais l'objet entier.",
          },
          {
            label: "Limite importante",
            value:
              "On ne peut pas remplacer l'objet entier (`etat = {...}` casse la réactivité) ni déstructurer (`const { compteur } = etat` perd la réactivité). `ref` n'a pas ces limites.",
          },
          {
            label: "Exemple réel",
            value:
              "Un état de formulaire : `const filtres = reactive({ recherche: '', categorie: 'tous', page: 1 })` — les trois champs évoluent ensemble et le template les lit directement.",
          },
          {
            label: "Bonne pratique",
            value:
              "En cas de doute, utilisez `ref` : il fonctionne pour les primitives comme pour les objets, et la réaffectation reste possible. `reactive` est un choix d'organisation, pas une obligation.",
          },
        ],
      },
      {
        kind: "code",
        language: "vue",
        title: "Le piège de la déstructuration",
        code: "<script setup>\nimport { reactive, toRefs } from 'vue'\n\nconst etat = reactive({ compteur: 0 })\n\n// PERDU : la déstructuration casse la réactivité\n// const { compteur } = etat\n\n// CORRECT : toRefs conserve la réactivité de chaque propriété\nconst { compteur } = toRefs(etat)\n</script>",
      },
    ],
  },
  {
    id: "computed",
    title: "computed() : les valeurs dérivées",
    level: 3,
    intro: "Calculer à partir de l'état, sans recalcul inutile.",
    blocks: [
      {
        kind: "fields",
        title: "computed() en détail",
        fields: [
          {
            label: "En une phrase",
            value:
              "`computed()` définit une valeur calculée à partir de données réactives : elle se recalcule uniquement quand ses dépendances changent, et le résultat est mis en cache entre-temps.",
          },
          {
            label: "Pourquoi",
            value:
              "Éviter de dupliquer une logique de dérivation dans le template ou de la recalculer à chaque rendu. Le cache rend les calculs coûteux (filtrage, tri) gratuits quand rien n'a changé.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Dès qu'une valeur affichée dérive d'autres valeurs : totaux, listes filtrées, chaînes formatées, classes conditionnelles complexes.",
          },
          {
            label: "Exemple réel",
            value:
              "Une liste de tâches filtrable : le `computed` `tachesVisibles` refiltre uniquement quand les tâches ou le filtre changent, pas à chaque frappe dans un champ indépendant.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Mettre des effets de bord (appel API, `console.log` de debug oublié, mutation d'un ref) dans un `computed` : il doit rester une fonction pure de ses dépendances.",
          },
          {
            label: "Bonne pratique",
            value:
              "Préférez toujours `computed` à une méthode appelée dans le template pour une valeur dérivée : la méthode se réexécute à chaque rendu, le `computed` non.",
          },
        ],
      },
      {
        kind: "code",
        language: "vue",
        title: "Liste filtrée avec computed",
        code: "<script setup>\nimport { ref, computed } from 'vue'\n\nconst taches = ref([\n  { texte: 'Apprendre Vue', faite: true },\n  { texte: 'Construire une app', faite: false },\n])\nconst recherche = ref('')\n\nconst tachesVisibles = computed(() => {\n  const q = recherche.value.toLowerCase()\n  return taches.value.filter((t) => t.texte.toLowerCase().includes(q))\n})\n</script>\n\n<template>\n  <input v-model=\"recherche\" placeholder=\"Filtrer...\" />\n  <ul>\n    <li v-for=\"t in tachesVisibles\" :key=\"t.texte\">{{ t.texte }}</li>\n  </ul>\n</template>",
      },
    ],
  },
  {
    id: "watch",
    title: "watch() : réagir aux changements",
    level: 3,
    intro: "Exécuter du code quand une donnée change : la contrepartie impérative de `computed`.",
    blocks: [
      {
        kind: "fields",
        title: "watch() en détail",
        fields: [
          {
            label: "En une phrase",
            value:
              "`watch(source, callback)` exécute le callback chaque fois que la source réactive change, en donnant l'ancienne et la nouvelle valeur.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Effets de bord liés à un changement : appel API après une recherche, sauvegarde en `localStorage`, réinitialisation d'un formulaire, journalisation.",
          },
          {
            label: "watch vs watchEffect",
            value:
              "`watch` observe des sources explicites (plus précis, paresseux par défaut). `watchEffect` exécute immédiatement et suit automatiquement les dépendances utilisées (plus concis, moins explicite).",
          },
          {
            label: "Exemple réel",
            value:
              "Sauvegarder automatiquement un brouillon : `watch(contenu, (val) => localStorage.setItem('brouillon', val))` — chaque frappe persiste sans bouton « Enregistrer ».",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier `{ deep: true }` pour observer les mutations internes d'un objet réactif, ou `{ immediate: true }` quand le callback doit aussi tourner à l'initialisation.",
          },
          {
            label: "Bonne pratique",
            value:
              "Si vous hésitez entre `computed` et `watch`, c'est probablement `computed` : `watch` est réservé aux effets de bord, jamais aux valeurs dérivées.",
          },
        ],
      },
      {
        kind: "code",
        language: "vue",
        title: "Recherche avec debounce via watch",
        code: "<script setup>\nimport { ref, watch } from 'vue'\n\nconst requete = ref('')\nconst resultats = ref([])\nlet minuteur = null\n\nwatch(requete, (nouvelleRequete) => {\n  clearTimeout(minuteur)\n  minuteur = setTimeout(async () => {\n    const reponse = await fetch('/api/recherche?q=' + nouvelleRequete)\n    resultats.value = await reponse.json()\n  }, 300)\n})\n</script>",
      },
    ],
  },
  {
    id: "rendu-conditionnel",
    title: "Rendu conditionnel : v-if, v-else, v-show",
    level: 3,
    intro: "Afficher ou masquer : deux mécanismes, deux usages.",
    blocks: [
      {
        kind: "table",
        headers: ["Directive", "Comportement", "Quand l'utiliser"],
        rows: [
          ["`v-if`", "L'élément est créé ou détruit dans le DOM", "Condition qui change rarement (permissions, étapes d'un formulaire)"],
          ["`v-else` / `v-else-if`", "Branches alternatives du même `v-if`", "Aiguillages mutuellement exclusifs"],
          ["`v-show`", "L'élément reste dans le DOM, masqué en CSS (`display: none`)", "Bascule fréquente (onglets, menus déroulants)"],
        ],
      },
      {
        kind: "text",
        text: "La différence est un compromis : `v-if` coûte cher à basculer (création/destruction) mais ne coûte rien quand il est faux ; `v-show` bascule pour pas cher mais garde l'élément — et son coût d'initialisation — dans le DOM.",
      },
      {
        kind: "code",
        language: "vue",
        title: "Conditions et listes : v-if avec template",
        code: "<template>\n  <div v-if=\"utilisateur\">\n    <p>Bonjour {{ utilisateur.nom }}</p>\n    <button @click=\"deconnexion\">Se déconnecter</button>\n  </div>\n  <div v-else>\n    <button @click=\"connexion\">Se connecter</button>\n  </div>\n\n  <!-- v-if sur <template> : condition sans élément superflu -->\n  <template v-if=\"erreur\">\n    <p class=\"erreur\">{{ erreur }}</p>\n  </template>\n</template>",
      },
    ],
  },
  {
    id: "listes-v-for",
    title: "Listes avec v-for et :key",
    level: 3,
    intro: "Rendre des listes correctement : la directive la plus source de bugs subtils.",
    blocks: [
      {
        kind: "fields",
        title: "v-for en détail",
        fields: [
          {
            label: "En une phrase",
            value:
              "`v-for=\"element in liste\"` répète un élément pour chaque entrée ; `:key` fournit à Vue un identifiant stable pour suivre chaque élément entre les rendus.",
          },
          {
            label: "Pourquoi :key",
            value:
              "Sans clé stable, Vue réutilise les nœuds par position : après un tri ou une suppression, les états locaux (champ saisi, case cochée) se retrouvent sur le mauvais élément.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Toute liste dynamique : résultats de recherche, commentaires, lignes de tableau, options de formulaire.",
          },
          {
            label: "Exemple réel",
            value:
              "Une liste de tâches avec case à cocher : `:key=\"tache.id\"` garantit que cocher la 2e tâche coche toujours la bonne, même après avoir filtré la liste.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Utiliser l'index comme clé (`:key=\"index\"`) : c'est à peine mieux que pas de clé du tout dès que l'ordre change. Utilisez un identifiant métier stable (`id`).",
          },
          {
            label: "Bonne pratique",
            value:
              "Ne combinez jamais `v-if` et `v-for` sur le même élément : filtrez la liste dans un `computed` et itérez sur le résultat.",
          },
        ],
      },
      {
        kind: "code",
        language: "vue",
        title: "Liste avec clé stable et index",
        code: "<script setup>\nimport { ref } from 'vue'\n\nconst taches = ref([\n  { id: 1, texte: 'Apprendre Vue', faite: false },\n  { id: 2, texte: 'Écrire des tests', faite: false },\n])\n</script>\n\n<template>\n  <ul>\n    <li v-for=\"(tache, index) in taches\" :key=\"tache.id\">\n      {{ index + 1 }}. {{ tache.texte }}\n      <input type=\"checkbox\" v-model=\"tache.faite\" />\n    </li>\n  </ul>\n</template>",
      },
    ],
  },
  {
    id: "v-bind",
    title: "v-bind : lier les attributs",
    level: 3,
    intro: "Rendre n'importe quel attribut HTML dynamique.",
    blocks: [
      {
        kind: "fields",
        title: "v-bind en détail",
        fields: [
          {
            label: "En une phrase",
            value:
              "`v-bind` (raccourci `:`) lie un attribut HTML à une expression JavaScript : `:src=\"url\"`, `:disabled=\"enCours\"`, `:class=\"...\"`.",
          },
          {
            label: "Pourquoi",
            value:
              "Les attributs HTML sont statiques par nature ; `v-bind` les rend réactifs : l'attribut suit la donnée sans manipulation du DOM.",
          },
          {
            label: "Cas particulier",
            value:
              "Les attributs booléens (`disabled`, `checked`) : Vue retire l'attribut quand la valeur est fausse, ce qui est le comportement HTML correct.",
          },
          {
            label: "Exemple réel",
            value:
              "Un bouton de soumission `:disabled=\"formulaireInvalide || envoiEnCours\"` : impossible à activer tant que le formulaire est invalide ou l'envoi en cours.",
          },
          {
            label: "Bonne pratique",
            value:
              "Utilisez systématiquement le raccourci `:` (`:href`, `:title`) : c'est la convention universelle dans le code Vue, `v-bind:` complet est réservé à la pédagogie.",
          },
        ],
      },
      {
        kind: "code",
        language: "vue",
        title: "Attributs dynamiques et objet",
        code: "<template>\n  <img :src=\"avatarUrl\" :alt=\"'Photo de ' + nom\" />\n  <a :href=\"lien\" :title=\"infobulle\">Visiter</a>\n  <!-- Lier plusieurs attributs d'un coup avec un objet -->\n  <button v-bind=\"attributsBouton\">Envoyer</button>\n</template>",
      },
    ],
  },
  {
    id: "v-on",
    title: "v-on : écouter les événements",
    level: 3,
    intro: "Réagir aux interactions utilisateur.",
    blocks: [
      {
        kind: "fields",
        title: "v-on en détail",
        fields: [
          {
            label: "En une phrase",
            value:
              "`v-on` (raccourci `@`) attache un gestionnaire à un événement DOM : `@click=\"incrementer\"`, `@submit.prevent=\"envoyer\"`.",
          },
          {
            label: "Modificateurs",
            value:
              "Des suffixes qui remplacent le code répétitif : `.prevent` (empêche le comportement par défaut), `.stop` (stoppe la propagation), `.once`, `.enter` / `.esc` pour le clavier.",
          },
          {
            label: "Accès à l'événement",
            value:
              "Avec une méthode nommée, l'objet événement est passé automatiquement en premier argument. Avec une expression inline, utilisez la variable spéciale `$event`.",
          },
          {
            label: "Exemple réel",
            value:
              "Un formulaire : `<form @submit.prevent=\"envoyer\">` — plus besoin d'appeler `event.preventDefault()` dans le gestionnaire.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Écrire `@click=\"incrementer()\"` quand on veut passer l'événement : les parenthèses vides masquent l'argument automatique. Écrivez `@click=\"incrementer\"` ou `@click=\"(e) => incrementer(e, id)\"`.",
          },
        ],
      },
      {
        kind: "code",
        language: "vue",
        title: "Gestionnaires et modificateurs",
        code: "<script setup>\nimport { ref } from 'vue'\n\nconst message = ref('')\n\nfunction alerter(evenement) {\n  message.value = 'Clic en ' + evenement.clientX + ', ' + evenement.clientY\n}\n</script>\n\n<template>\n  <button @click=\"alerter\">Où ai-je cliqué ?</button>\n  <input @keyup.enter=\"valider\" placeholder=\"Entrée pour valider\" />\n  <div @click=\"selectionner\">\n    <button @click.stop=\"supprimer\">Supprimer</button>\n  </div>\n</template>",
      },
    ],
  },
  {
    id: "classes-styles-dynamiques",
    title: "Classes et styles dynamiques",
    level: 3,
    intro: "Le cas d'usage le plus courant de `v-bind`, détaillé.",
    blocks: [
      {
        kind: "code",
        language: "vue",
        title: "Classes conditionnelles : objet et tableau",
        code: "<script setup>\nimport { ref, computed } from 'vue'\n\nconst estActif = ref(true)\nconst aErreur = ref(false)\n\nconst classesCarte = computed(() => ({\n  active: estActif.value,\n  'text-danger': aErreur.value,\n}))\n</script>\n\n<template>\n  <!-- Syntaxe objet : la classe est appliquée si la valeur est vraie -->\n  <div :class=\"{ active: estActif, 'text-danger': aErreur }\">\n    Carte\n  </div>\n  <!-- Via un computed : lisible quand la logique grandit -->\n  <div :class=\"classesCarte\">Carte</div>\n  <!-- Styles inline dynamiques -->\n  <p :style=\"{ color: aErreur ? 'red' : 'black' }\">Statut</p>\n</template>",
      },
      {
        kind: "text",
        text: "Notez que `:class` se combine avec l'attribut `class` statique : Vue fusionne les deux. C'est ce qui permet d'avoir des classes de base fixes et des classes d'état dynamiques sur le même élément.",
      },
      {
        kind: "text",
        text: "Bonne pratique : dès que la logique de classes dépasse deux conditions, extrayez-la dans un `computed`. Le template reste déclaratif et la logique devient testable.",
      },
    ],
  },
  {
    id: "props",
    title: "Props : passer des données au composant enfant",
    level: 3,
    intro: "La communication descendante : du parent vers l'enfant.",
    blocks: [
      {
        kind: "fields",
        title: "Les props en détail",
        fields: [
          {
            label: "En une phrase",
            value:
              "Les props sont les paramètres d'un composant : le parent passe des données via des attributs (`<Carte titre=\"Bonjour\" />`), l'enfant les déclare avec `defineProps` et les lit en lecture seule.",
          },
          {
            label: "Pourquoi",
            value:
              "Rendre les composants réutilisables : le même composant `Carte` affiche des contenus différents selon les props reçues, sans dupliquer de code.",
          },
          {
            label: "Validation",
            value:
              "Déclarez le type de chaque prop (`String`, `Number`, objet de validation) : Vue avertit en console si le parent passe un mauvais type. Avec TypeScript, la validation est statique.",
          },
          {
            label: "Exemple réel",
            value:
              "Un composant `Alerte` avec les props `type` (`'info' | 'erreur'`) et `message` : la même alerte sert aux succès, aux erreurs et aux infos, le style variant selon `type`.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Modifier une prop dans l'enfant (`props.titre = 'x'`) : les props sont en lecture seule. Pour une valeur modifiable localement, copiez la prop dans un `ref`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Flux de données unidirectionnel : les données descendent par les props, les changements remontent par les événements. Jamais l'inverse.",
          },
        ],
      },
      {
        kind: "code",
        language: "vue",
        title: "Déclarer et valider des props",
        code: "<!-- Enfant : Carte.vue -->\n<script setup>\nconst props = defineProps({\n  titre: { type: String, required: true },\n  soustitre: { type: String, default: '' },\n  niveau: {\n    type: Number,\n    default: 1,\n    validator: (v) => v >= 1 && v <= 6,\n  },\n})\n</script>\n\n<template>\n  <article>\n    <h2>{{ titre }}</h2>\n    <p v-if=\"soustitre\">{{ soustitre }}</p>\n  </article>\n</template>\n\n<!-- Parent : <Carte titre=\"Vue 3\" :niveau=\"2\" /> -->",
      },
    ],
  },
  {
    id: "evenements-emits",
    title: "Événements : defineEmits, la remontée",
    level: 3,
    intro: "La communication ascendante : de l'enfant vers le parent.",
    blocks: [
      {
        kind: "fields",
        title: "defineEmits en détail",
        fields: [
          {
            label: "En une phrase",
            value:
              "L'enfant signale quelque chose au parent en émettant un événement (`emit('supprimer', id)`) ; le parent l'écoute comme un événement DOM (`@supprimer=\"retirer\"`).",
          },
          {
            label: "Pourquoi",
            value:
              "Le pendant des props : l'enfant ne modifie jamais directement l'état du parent, il annonce une intention (« l'utilisateur a cliqué supprimer ») et le parent décide quoi faire.",
          },
          {
            label: "Validation",
            value:
              "Déclarez les événements émis avec `defineEmits` (tableau de noms ou objet de validation) : la documentation du composant est explicite et les fautes de frappe sont détectées.",
          },
          {
            label: "Exemple réel",
            value:
              "Un composant `LignePanier` émet `emit('quantite-changee', { id, quantite })` ; le parent met à jour le panier et recalcule le total.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Émettre en camelCase (`emit('monEvenement')`) et écouter en camelCase dans le template : le HTML normalise les attributs en minuscules. Émettez en kebab-case ou écoutez la version normalisée.",
          },
        ],
      },
      {
        kind: "code",
        language: "vue",
        title: "Émettre un événement avec validation",
        code: "<!-- Enfant : BoutonSupprimer.vue -->\n<script setup>\nconst emit = defineEmits({\n  supprimer: (id) => typeof id === 'number', // validation du payload\n})\n\nfunction onClic() {\n  if (confirm('Supprimer cet élément ?')) {\n    emit('supprimer', 42)\n  }\n}\n</script>\n\n<template>\n  <button @click=\"onClic\">Supprimer</button>\n</template>\n\n<!-- Parent : <BoutonSupprimer @supprimer=\"retirerElement\" /> -->",
      },
    ],
  },
  {
    id: "v-model-composant",
    title: "v-model sur un composant",
    level: 3,
    intro: "La liaison bidirectionnelle entre composants : props + événement, en un seul mot-clé.",
    blocks: [
      {
        kind: "text",
        text: "`v-model` sur un composant est un sucre syntaxique : `<Champ v-model=\"nom\" />` équivaut à `<Champ :modelValue=\"nom\" @update:modelValue=\"nom = $event\" />`. Le composant enfant déclare la prop `modelValue` et émet `update:modelValue` quand la valeur change.",
      },
      {
        kind: "code",
        language: "vue",
        title: "Un champ personnalisé compatible v-model",
        code: "<!-- Enfant : ChampTexte.vue -->\n<script setup>\ndefineProps(['modelValue'])\nconst emit = defineEmits(['update:modelValue'])\n</script>\n\n<template>\n  <input\n    :value=\"modelValue\"\n    @input=\"emit('update:modelValue', $event.target.value)\"\n  />\n</template>\n\n<!-- Parent : <ChampTexte v-model=\"nom\" /> -->",
      },
      {
        kind: "fields",
        title: "À savoir",
        fields: [
          {
            label: "Arguments multiples",
            value:
              "`v-model:titre=\"titre\"` : on peut lier plusieurs valeurs en nommant l'argument. La prop devient `titre` et l'événement `update:titre`.",
          },
          {
            label: "Modificateurs personnalisés",
            value:
              "Les modificateurs (`.trim`, `.number`, `.lazy`) sont transmis via la prop `modelModifiers` : le composant peut les honorer lui-même.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Composants de formulaire réutilisables (champs, sélecteurs, interrupteurs) : le parent garde la source de vérité, l'enfant reste simple.",
          },
        ],
      },
    ],
  },
  {
    id: "slots",
    title: "Slots : composer le contenu",
    level: 3,
    intro: "Passer du HTML aux composants enfants, pas seulement des données.",
    blocks: [
      {
        kind: "fields",
        title: "Les slots en détail",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un slot est un emplacement dans le template de l'enfant où le parent injecte son propre contenu : `<Modale><p>Contenu</p></Modale>` remplit le `<slot />` de `Modale`.",
          },
          {
            label: "Pourquoi",
            value:
              "Les props transmettent des données ; les slots transmettent de la structure. C'est ce qui permet des composants conteneurs génériques (modale, carte, layout) au contenu variable.",
          },
          {
            label: "Slots nommés",
            value:
              "`<slot name=\"entete\" />` et `<template #entete>...` : plusieurs emplacements distincts dans le même composant (en-tête, corps, pied de page).",
          },
          {
            label: "Slots à portée (scoped)",
            value:
              "L'enfant expose des données au contenu du slot (`<slot :element=\"t\" />`) : le parent les récupère via `<template #default=\"{ element }\">`. Idéal pour les listes personnalisables.",
          },
          {
            label: "Exemple réel",
            value:
              "Un composant `Tableau` avec un slot à portée par ligne : chaque page parente décide comment afficher ses colonnes, le composant gère le tri et la pagination.",
          },
        ],
      },
      {
        kind: "code",
        language: "vue",
        title: "Slot nommé et slot à portée",
        code: "<!-- Enfant : Carte.vue -->\n<template>\n  <article class=\"carte\">\n    <header><slot name=\"entete\" /></header>\n    <slot /> <!-- slot par défaut -->\n  </article>\n</template>\n\n<!-- Parent -->\n<Carte>\n  <template #entete><h2>Mon titre</h2></template>\n  <p>Contenu libre de la carte.</p>\n</Carte>",
      },
    ],
  },
  {
    id: "cycle-de-vie",
    title: "Cycle de vie d'un composant",
    level: 3,
    intro: "Les étapes de la vie d'un composant et les crochets pour s'y brancher.",
    blocks: [
      {
        kind: "table",
        headers: ["Crochet", "Moment", "Usage typique"],
        rows: [
          ["`onMounted`", "Composant inséré dans le DOM", "Appel API initial, mesures DOM, abonnements"],
          ["`onUpdated`", "Après chaque re-rendu réactif", "Réagir à un changement de DOM (rare, préférez `watch`)"],
          ["`onUnmounted`", "Composant retiré du DOM", "Nettoyage : annuler minuteurs, requêtes, écouteurs globaux"],
          ["`onBeforeMount` / `onBeforeUpdate` / `onBeforeUnmount`", "Juste avant chaque étape", "Cas avancés, diagnostics"],
          ["`onErrorCaptured`", "Une erreur est levée dans un descendant", "Frontières d'erreur locales"],
        ],
      },
      {
        kind: "code",
        language: "vue",
        title: "Charger des données au montage, nettoyer à la destruction",
        code: "<script setup>\nimport { ref, onMounted, onUnmounted } from 'vue'\n\nconst articles = ref([])\nlet minuteur = null\n\nonMounted(async () => {\n  const reponse = await fetch('/api/articles')\n  articles.value = await reponse.json()\n  minuteur = setInterval(rafraichir, 60000)\n})\n\nonUnmounted(() => {\n  clearInterval(minuteur) // nettoyage obligatoire\n})\n</script>",
      },
      {
        kind: "text",
        text: "Erreur fréquente : accéder au DOM dans le `<script setup>` avant `onMounted` (le template n'est pas encore rendu), ou oublier le nettoyage dans `onUnmounted` — un `setInterval` oublié continue de tourner après la destruction du composant et fuit la mémoire.",
      },
    ],
  },
  {
    id: "composables",
    title: "Composables : la logique réutilisable",
    level: 3,
    intro: "Extraire la logique réactive dans des fonctions partageables.",
    blocks: [
      {
        kind: "fields",
        title: "Les composables en détail",
        fields: [
          {
            label: "En une phrase",
            value:
              "Un composable est une fonction (convention de nom `use...`) qui encapsule de la logique avec état réactif : `useSouris()`, `useFetch()`, `useLocalStorage()`.",
          },
          {
            label: "Pourquoi",
            value:
              "Le remède à la duplication : la même logique (suivre la souris, charger des données, gérer un formulaire) sert dans plusieurs composants sans copier-coller et sans héritage.",
          },
          {
            label: "Comment ça marche",
            value:
              "La fonction appelle `ref`/`computed`/`watch` et les crochets de cycle de vie, puis retourne ce que le composant doit utiliser. Chaque appel crée un état indépendant.",
          },
          {
            label: "Exemple réel",
            value:
              "`useTitreOnglet(titre)` : synchronise `document.title` avec un ref. Utilisé sur chaque page, en une ligne par composant.",
          },
          {
            label: "Bonne pratique",
            value:
              "Un composable fait une chose et retourne des refs (pas des valeurs brutes) pour conserver la réactivité. Placez-les dans `src/composables/`.",
          },
        ],
      },
      {
        kind: "code",
        language: "ts",
        title: "src/composables/useCompteur.ts",
        code: "import { ref } from 'vue'\n\nexport function useCompteur(initial = 0) {\n  const compteur = ref(initial)\n  const incrementer = () => compteur.value++\n  const reinitialiser = () => (compteur.value = initial)\n  return { compteur, incrementer, reinitialiser }\n}\n\n// Usage : const { compteur, incrementer } = useCompteur(10)",
      },
    ],
  },
  {
    id: "provide-inject",
    title: "provide / inject : le contexte partagé",
    level: 3,
    intro: "Transmettre des données à travers l'arbre sans les faire transiter par chaque niveau.",
    blocks: [
      {
        kind: "text",
        text: "Quand une donnée doit traverser cinq niveaux de composants qui ne l'utilisent pas (thème, utilisateur connecté, configuration), les props deviennent du bruit. `provide` (dans un ancêtre) et `inject` (dans n'importe quel descendant) créent un canal direct.",
      },
      {
        kind: "code",
        language: "vue",
        title: "Fournir un thème, l'injecter où besoin",
        code: "<!-- Ancêtre : App.vue -->\n<script setup>\nimport { ref, provide } from 'vue'\n\nconst theme = ref('clair')\nprovide('theme', theme) // clé + valeur réactive\n</script>\n\n<!-- Descendant profond -->\n<script setup>\nimport { inject } from 'vue'\n\nconst theme = inject('theme', 'clair') // valeur par défaut\n</script>\n\n<template>\n  <p>Thème actuel : {{ theme }}</p>\n</template>",
      },
      {
        kind: "text",
        text: "Bonne pratique : réservez `provide`/`inject` aux données transverses (thème, i18n, utilisateur). Pour l'état métier partagé avec logique (panier, session), Pinia est l'outil adapté : il ajoute la traçabilité et les outils de debug.",
      },
    ],
  },
  {
    id: "teleport",
    title: "<Teleport> : rendre ailleurs dans le DOM",
    level: 3,
    intro: "Le composant vit ici logiquement, mais son HTML est rendu là-bas.",
    blocks: [
      {
        kind: "text",
        text: "`<Teleport to=\"body\">` déplace le rendu de son contenu vers un autre endroit du DOM (souvent `body`), tout en gardant le composant dans l'arbre logique Vue : les props, les événements et le contexte continuent de fonctionner normalement.",
      },
      {
        kind: "fields",
        title: "Cas d'usage",
        fields: [
          {
            label: "Modales et dialogues",
            value:
              "Une modale rendue dans un conteneur avec `overflow: hidden` serait rognée : téléportée vers `body`, elle s'affiche par-dessus tout.",
          },
          {
            label: "Notifications / toasts",
            value:
              "Le conteneur de notifications vit en racine du `body`, mais chaque composant peut y téléporter ses messages.",
          },
          {
            label: "À ne pas abuser",
            value:
              "Le contenu téléporté reste lié au cycle de vie du composant d'origine : si le composant est détruit, le contenu disparaît aussi. C'est voulu, pas un bug.",
          },
        ],
      },
      {
        kind: "code",
        language: "vue",
        title: "Une modale téléportée",
        code: "<script setup>\nimport { ref } from 'vue'\nconst ouverte = ref(false)\n</script>\n\n<template>\n  <button @click=\"ouverte = true\">Ouvrir</button>\n  <Teleport to=\"body\">\n    <div v-if=\"ouverte\" class=\"modale\">\n      <p>Contenu de la modale</p>\n      <button @click=\"ouverte = false\">Fermer</button>\n    </div>\n  </Teleport>\n</template>",
      },
    ],
  },
  {
    id: "suspense",
    title: "<Suspense> : l'asynchrone déclaratif",
    level: 3,
    intro: "Gérer le chargement des composants asynchrones sans état `enChargement` manuel.",
    blocks: [
      {
        kind: "text",
        text: "Quand un composant utilise `await` au niveau du `<script setup>` (ou est chargé via `defineAsyncComponent`), il devient asynchrone. `<Suspense>` l'enveloppe et affiche un contenu de repli (`#fallback`) pendant le chargement, puis le contenu réel (`#default`) quand c'est prêt.",
      },
      {
        kind: "code",
        language: "vue",
        title: "Chargement avec état de repli",
        code: "<script setup>\nimport { defineAsyncComponent } from 'vue'\n\nconst TableauDeBord = defineAsyncComponent(() =>\n  import('./components/TableauDeBord.vue')\n)\n</script>\n\n<template>\n  <Suspense>\n    <template #default>\n      <TableauDeBord />\n    </template>\n    <template #fallback>\n      <p>Chargement du tableau de bord…</p>\n    </template>\n  </Suspense>\n</template>",
      },
      {
        kind: "text",
        text: "Erreur fréquente : oublier que les erreurs d'un composant asynchrone ne sont pas capturées par `<Suspense>` — combinez-le avec `onErrorCaptured` ou une frontière d'erreur pour les échecs réseau.",
      },
    ],
  },
  {
    id: "keep-alive",
    title: "<KeepAlive> : conserver l'état",
    level: 3,
    intro: "Ne pas détruire un composant quand on le masque.",
    blocks: [
      {
        kind: "text",
        text: "Par défaut, quand un composant disparaît (`v-if` faux, changement d'onglet), Vue le détruit : son état est perdu. `<KeepAlive>` met en cache les instances : en revenant sur l'onglet, on retrouve le formulaire à moitié rempli, la position de scroll, les données chargées.",
      },
      {
        kind: "code",
        language: "vue",
        title: "Onglets avec état préservé",
        code: "<script setup>\nimport { ref } from 'vue'\nimport OngletProfil from './OngletProfil.vue'\nimport OngletParametres from './OngletParametres.vue'\n\nconst ongletActif = ref('profil')\n</script>\n\n<template>\n  <button @click=\"ongletActif = 'profil'\">Profil</button>\n  <button @click=\"ongletActif = 'parametres'\">Paramètres</button>\n  <KeepAlive>\n    <component :is=\"ongletActif === 'profil' ? OngletProfil : OngletParametres\" />\n  </KeepAlive>\n</template>",
      },
      {
        kind: "fields",
        title: "À savoir",
        fields: [
          {
            label: "Crochets dédiés",
            value:
              "Les composants en cache utilisent `onActivated` / `onDeactivated` au lieu de `onMounted` / `onUnmounted` pour les allers-retours.",
          },
          {
            label: "Limites",
            value:
              "Props `include` / `exclude` / `max` pour choisir quels composants mettre en cache et combien. Tout mettre en cache consomme de la mémoire : réservez-le aux cas où l'état doit survivre.",
          },
        ],
      },
    ],
  },
  {
    id: "vue-router-installation",
    title: "Vue Router : installation",
    level: 3,
    intro: "Le routeur officiel : associer des URL à des composants.",
    blocks: [
      {
        kind: "command",
        label: "Installer Vue Router",
        command: "npm install vue-router",
        why: "Vue Router est le routeur officiel maintenu par l'équipe Vue. Il s'installe comme une dépendance normale puis s'enregistre sur l'application via `app.use(router)`.",
        verify: "`vue-router` apparaît dans les `dependencies` de `package.json`.",
      },
      {
        kind: "code",
        language: "ts",
        title: "src/router/index.ts — créer le routeur",
        code: "import { createRouter, createWebHistory } from 'vue-router'\nimport Accueil from '../views/Accueil.vue'\nimport APropos from '../views/APropos.vue'\n\nconst router = createRouter({\n  history: createWebHistory(), // URLs propres (/a-propos)\n  routes: [\n    { path: '/', component: Accueil },\n    { path: '/a-propos', component: APropos },\n  ],\n})\n\nexport default router",
      },
      {
        kind: "code",
        language: "ts",
        title: "src/main.ts — brancher le routeur",
        code: "import { createApp } from 'vue'\nimport App from './App.vue'\nimport router from './router'\n\ncreateApp(App).use(router).mount('#app')",
      },
      {
        kind: "text",
        text: "`createWebHistory()` produit des URLs propres (`/a-propos`) mais exige que le serveur redirige les URLs inconnues vers `index.html` en production. L'alternative `createWebHashHistory()` (`/#/a-propos`) fonctionne sans configuration serveur : pratique pour un hébergement de fichiers statiques simple.",
      },
    ],
  },
  {
    id: "vue-router-routes",
    title: "Vue Router : routes et navigation",
    level: 3,
    intro: "Déclarer des pages, naviguer entre elles, lire les paramètres.",
    blocks: [
      {
        kind: "code",
        language: "vue",
        title: "RouterLink, RouterView et paramètres",
        code: "<!-- App.vue : la navigation et le point d'affichage -->\n<template>\n  <nav>\n    <RouterLink to=\"/\">Accueil</RouterLink>\n    <RouterLink to=\"/articles\">Articles</RouterLink>\n  </nav>\n  <RouterView /> <!-- le composant de la route active s'affiche ici -->\n</template>\n\n<!-- Route avec paramètre : /articles/:id -->\n<script setup>\nimport { useRoute } from 'vue-router'\n\nconst route = useRoute()\n// route.params.id contient l'identifiant de l'URL\n</script>\n\n<template>\n  <h1>Article {{ route.params.id }}</h1>\n</template>",
      },
      {
        kind: "fields",
        title: "Concepts clés",
        fields: [
          {
            label: "Routes imbriquées",
            value:
              "`children` dans la déclaration : un layout (barre latérale, onglets) avec un `<RouterView>` interne affiche ses sous-pages. Évite de dupliquer la structure.",
          },
          {
            label: "Navigation programmatique",
            value:
              "`const router = useRouter()` puis `router.push('/connexion')` : pour rediriger après une action (formulaire envoyé, déconnexion).",
          },
          {
            label: "Chargement différé",
            value:
              "`component: () => import('../views/Admin.vue')` : la page n'est téléchargée que quand on la visite. Le bundle initial reste léger.",
          },
          {
            label: "Exemple réel",
            value:
              "Un blog : `/` (liste), `/articles/:slug` (article), `/admin` (chargé en différé, protégé par garde). Trois routes, un seul `RouterView`.",
          },
        ],
      },
    ],
  },
  {
    id: "vue-router-navigation-guards",
    title: "Vue Router : gardes de navigation",
    level: 3,
    intro: "Protéger des pages : l'exemple canonique est l'authentification.",
    blocks: [
      {
        kind: "code",
        language: "ts",
        title: "Protéger les routes privées",
        code: "import { createRouter, createWebHistory } from 'vue-router'\n\nconst router = createRouter({\n  history: createWebHistory(),\n  routes: [\n    { path: '/', component: () => import('../views/Accueil.vue') },\n    { path: '/connexion', component: () => import('../views/Connexion.vue') },\n    {\n      path: '/tableau-de-bord',\n      component: () => import('../views/TableauDeBord.vue'),\n      meta: { requiertAuth: true },\n    },\n  ],\n})\n\nrouter.beforeEach((to) => {\n  const connecte = Boolean(localStorage.getItem('jeton'))\n  if (to.meta.requiertAuth && !connecte) {\n    return '/connexion' // redirection\n  }\n})\n\nexport default router",
      },
      {
        kind: "text",
        text: "Le champ `meta` transporte des informations arbitraires sur la route ; `beforeEach` s'exécute avant chaque navigation et peut la rediriger en retournant un chemin. Note de sécurité : une garde côté client améliore l'expérience mais ne protège rien seule — l'API doit vérifier le jeton à chaque requête.",
      },
    ],
  },
  {
    id: "pinia-introduction",
    title: "Pinia : pourquoi un store",
    level: 3,
    intro: "Quand l'état dépasse le composant : la gestion d'état centralisée.",
    blocks: [
      {
        kind: "fields",
        title: "Pinia en une phrase, par angle",
        fields: [
          {
            label: "En une phrase",
            value:
              "Pinia est le store officiel de Vue : il centralise l'état partagé de l'application dans des « stores » composés d'état, de getters et d'actions.",
          },
          {
            label: "Pourquoi ça existe",
            value:
              "Faire transiter une donnée par dix niveaux de props est fragile ; dupliquer l'état entre composants crée des incohérences. Un store offre une source de vérité unique, accessible partout.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Utilisateur connecté, panier d'achat, préférences, notifications : toute donnée utilisée par plusieurs pages. Pour l'état local d'un composant, `ref` suffit.",
          },
          {
            label: "Par rapport à Vuex",
            value:
              "Pinia est le successeur officiel de Vuex pour Vue 3 : API plus simple (pas de mutations), excellent support TypeScript, stores modulaires par défaut. Vuex reste maintenu mais n'évolue plus.",
          },
        ],
      },
      {
        kind: "command",
        label: "Installer Pinia",
        command: "npm install pinia",
        why: "Ajoute Pinia comme dépendance, puis enregistrement sur l'application avec `app.use(createPinia())` dans `main.ts`, comme pour le routeur.",
        verify: "`pinia` apparaît dans les `dependencies` de `package.json`.",
      },
    ],
  },
  {
    id: "pinia-stores",
    title: "Pinia : écrire un store",
    level: 3,
    intro: "État, getters, actions : l'anatomie d'un store.",
    blocks: [
      {
        kind: "code",
        language: "ts",
        title: "src/stores/panier.ts — store « setup »",
        code: "import { defineStore } from 'pinia'\nimport { ref, computed } from 'vue'\n\nexport const usePanierStore = defineStore('panier', () => {\n  // État\n  const articles = ref([])\n\n  // Getter : valeur dérivée\n  const total = computed(() =>\n    articles.value.reduce((somme, a) => somme + a.prix * a.quantite, 0)\n  )\n  const nombreArticles = computed(() => articles.value.length)\n\n  // Actions : modifient l'état (peuvent être asynchrones)\n  function ajouter(article) {\n    articles.value.push({ ...article, quantite: 1 })\n  }\n  async function valider() {\n    await fetch('/api/commandes', {\n      method: 'POST',\n      body: JSON.stringify(articles.value),\n    })\n    articles.value = []\n  }\n\n  return { articles, total, nombreArticles, ajouter, valider }\n})",
      },
      {
        kind: "code",
        language: "vue",
        title: "Utiliser le store dans un composant",
        code: "<script setup>\nimport { usePanierStore } from '../stores/panier'\n\nconst panier = usePanierStore()\n// panier.articles, panier.total, panier.ajouter(...)\n</script>\n\n<template>\n  <p>{{ panier.nombreArticles }} articles — total : {{ panier.total }} €</p>\n  <button @click=\"panier.valider\">Commander</button>\n</template>",
      },
      {
        kind: "text",
        text: "Erreur fréquente : déstructurer le store (`const { total } = panier`) — on perd la réactivité. Utilisez `storeToRefs(panier)` si vous voulez déstructurer en gardant la réactivité ; les actions peuvent être déstructurées directement.",
      },
    ],
  },
  {
    id: "formulaires-avances",
    title: "Formulaires : validation et bonnes pratiques",
    level: 3,
    intro: "Au-delà de `v-model` : valider, structurer, gérer les erreurs.",
    blocks: [
      {
        kind: "fields",
        title: "Stratégie de validation",
        fields: [
          {
            label: "Validation native d'abord",
            value:
              "Attributs HTML (`required`, `type=\"email\"`, `minlength`, `pattern`) : gratuits, accessibles, traduits par le navigateur. Suffisent pour les formulaires simples.",
          },
          {
            label: "Validation réactive",
            value:
              "Des `computed` par champ (`emailValide`, `formulaireValide`) qui dérivent des messages d'erreur. Le bouton de soumission utilise `:disabled=\"!formulaireValide\"`.",
          },
          {
            label: "Bibliothèques",
            value:
              "Pour les formulaires complexes (étapes, champs dynamiques, règles métier), des bibliothèques comme VeeValidate apportent schémas et gestion d'état. À n'adopter que quand le besoin est réel.",
          },
          {
            label: "Exemple réel",
            value:
              "Un formulaire d'inscription : `computed` vérifie l'email (regex simple), la longueur du mot de passe et l'égalité des deux champs ; les messages d'erreur n'apparaissent qu'après le premier `blur` pour ne pas agresser l'utilisateur.",
          },
        ],
      },
      {
        kind: "code",
        language: "vue",
        title: "Validation réactive avec computed",
        code: "<script setup>\nimport { ref, computed } from 'vue'\n\nconst email = ref('')\nconst touche = ref(false)\n\nconst emailValide = computed(() => /.+@.+\\..+/.test(email.value))\nconst afficherErreur = computed(() => touche.value && !emailValide.value)\n\nfunction envoyer() {\n  if (emailValide.value) {\n    // soumission réelle ici\n  }\n}\n</script>\n\n<template>\n  <form @submit.prevent=\"envoyer\" novalidate>\n    <input v-model=\"email\" type=\"email\" @blur=\"touche = true\" />\n    <p v-if=\"afficherErreur\" class=\"erreur\">Email invalide.</p>\n    <button :disabled=\"!emailValide\">S'inscrire</button>\n  </form>\n</template>",
      },
    ],
  },
  {
    id: "typescript-avec-vue",
    title: "TypeScript avec Vue",
    level: 3,
    intro: "Vue 3 est écrit en TypeScript : l'utiliser, c'est en profiter pleinement.",
    blocks: [
      {
        kind: "code",
        language: "vue",
        title: "Typer les props et les événements",
        code: "<script setup lang=\"ts\">\nimport { ref } from 'vue'\n\ninterface Props {\n  titre: string\n  niveau?: number\n}\n\nconst props = defineProps<Props>()\n\nconst emit = defineEmits<{\n  (e: 'supprimer', id: number): void\n  (e: 'renommer', nom: string): void\n}>()\n\nconst compteur = ref<number>(0)\n</script>\n\n<template>\n  <h2>{{ props.titre }}</h2>\n  <button @click=\"emit('supprimer', 1)\">Supprimer</button>\n</template>",
      },
      {
        kind: "fields",
        title: "Points clés",
        fields: [
          {
            label: "lang=\"ts\"",
            value:
              "L'attribut `lang=\"ts\"` sur `<script setup>` active TypeScript dans le composant. Le générateur `create-vue` le propose dès la création du projet.",
          },
          {
            label: "Props typées",
            value:
              "Deux syntaxes : objet de validation runtime (`defineProps({ titre: String })`) ou type générique (`defineProps<Props>()`). La seconde donne une meilleure inférence dans le template.",
          },
          {
            label: "defineModel",
            value:
              "La macro `defineModel()` (Vue 3.4+) simplifie `v-model` typé sur les composants : `const nom = defineModel<string>()` remplace la paire prop/événement manuelle.",
          },
          {
            label: "Bonne pratique",
            value:
              "Typez les frontières (props, événements, retours d'API) en priorité : c'est là que les erreurs se produisent. Le corps du composant peut rester souple au début.",
          },
        ],
      },
    ],
  },
  {
    id: "tests-vitest",
    title: "Tests avec Vitest",
    level: 3,
    intro: "Tester les composants : la pile officielle Vue.",
    blocks: [
      {
        kind: "text",
        text: "L'écosystème de test recommandé pour Vue 3 est Vitest (exécuteur de tests, du même auteur que Vite) combiné à Vue Test Utils (montage des composants). `create-vue` propose d'ajouter Vitest dès la génération du projet.",
      },
      {
        kind: "code",
        language: "ts",
        title: "Compteur.spec.ts — premier test de composant",
        code: "import { describe, it, expect } from 'vitest'\nimport { mount } from '@vue/test-utils'\nimport Compteur from '../src/components/Compteur.vue'\n\ndescribe('Compteur', () => {\n  it('incrémente au clic', async () => {\n    const wrapper = mount(Compteur)\n    expect(wrapper.text()).toContain('Clics : 0')\n    await wrapper.find('button').trigger('click')\n    expect(wrapper.text()).toContain('Clics : 1')\n  })\n})",
      },
      {
        kind: "command",
        label: "Lancer les tests unitaires",
        command: "npm run test:unit",
        why: "Le script généré par `create-vue` quand Vitest est sélectionné : exécute les fichiers `*.spec.ts` en mode unique et rapporte les résultats.",
        verify: "Le terminal affiche le nombre de tests réussis et échoués.",
      },
      {
        kind: "fields",
        title: "Que tester, par priorité",
        fields: [
          {
            label: "Composables",
            value:
              "En premier : ce sont des fonctions pures de logique, rapides à tester, et elles portent le métier.",
          },
          {
            label: "Composants",
            value:
              "Les interactions (clic → état → affichage) et les cas limites (liste vide, erreur). Testez le comportement, pas l'implémentation.",
          },
          {
            label: "Stores Pinia",
            value:
              "Les actions et getters : créer le store, appeler l'action, vérifier l'état. Direct et très rentable.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging",
    title: "Debugging : diagnostiquer une app Vue",
    level: 3,
    intro: "Méthode systématique quand l'interface ne fait pas ce qu'on attend.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Vérifier la donnée dans DevTools",
            detail:
              "Onglet Vue des DevTools : sélectionnez le composant et regardez l'état réel des refs et props. Si la donnée est bonne, le problème est dans le template ; sinon, dans la logique.",
          },
          {
            title: "Lire les avertissements console",
            detail:
              "Vue émet des avertissements explicites : prop manquante, clé dupliquée dans v-for, mutation de prop. Ne les ignorez jamais, ils pointent presque toujours la cause.",
          },
          {
            title: "Isoler avec un cas minimal",
            detail:
              "Reproduisez le bug dans un composant seul avec des données en dur. Si le bug disparaît, réintroduisez les pièces une par une (props, watch, appel API).",
          },
          {
            title: "Tracer la réactivité",
            detail:
              "`console.log` ciblé dans le `watch` ou le `computed` suspect, ou point d'arrêt dans les sources du navigateur sur le gestionnaire d'événement.",
          },
          {
            title: "Vérifier le cycle de vie",
            detail:
              "Le code s'exécute-t-il au bon moment ? Un appel API dans le script avant `onMounted` qui dépend du DOM, ou un `watch` sans `immediate`, sont des classiques.",
          },
        ],
      },
      {
        kind: "text",
        text: "Erreur fréquente : « la page est blanche sans erreur ». Causes habituelles : une erreur JavaScript dans `main.ts` avant le `mount`, un import de composant avec un mauvais chemin (Vite échoue silencieusement en dev parfois), ou une exception dans le `<script setup>` du composant racine.",
      },
    ],
  },
  {
    id: "performance",
    title: "Performance : garder une app fluide",
    level: 3,
    intro: "Vue est rapide par défaut ; les problèmes viennent presque toujours de quelques schémas.",
    blocks: [
      {
        kind: "fields",
        title: "Leviers de performance",
        fields: [
          {
            label: "Listes longues",
            value:
              "Au-delà de quelques centaines d'éléments, virtualisez (bibliothèque de virtual scrolling) : ne rendre que les éléments visibles. `v-for` sur 10 000 lignes ralentit tout navigateur.",
          },
          {
            label: "computed vs méthodes",
            value:
              "Rappel : un `computed` est mis en cache, une méthode appelée dans le template se réexécute à chaque rendu. Pour les dérivations coûteuses, le choix est significatif.",
          },
          {
            label: "v-memo",
            value:
              "Directive avancée (`v-memo=\"[dep]\"`) : mémorise une partie du template et la saute tant que les dépendances ne changent pas. À réserver aux zones mesurées comme coûteuses.",
          },
          {
            label: "Chargement différé",
            value:
              "Routes en `import()` dynamique, composants lourds en `defineAsyncComponent` : le bundle initial ne contient que le nécessaire au premier affichage.",
          },
          {
            label: "Mesurer d'abord",
            value:
              "L'onglet Performance des DevTools navigateur + la timeline Vue DevTools : optimisez ce qui est mesuré lent, pas ce qui « semble » lent.",
          },
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : la plupart des applications n'ont jamais besoin d'optimisation manuelle. Une architecture saine (composants petits, état local par défaut, listes paginées) règle 95 % des cas.",
      },
    ],
  },
  {
    id: "build-deploiement",
    title: "Build et déploiement",
    level: 3,
    intro: "De `npm run build` au serveur : ce qui se passe vraiment.",
    blocks: [
      {
        kind: "diagram",
        title: "Le pipeline de production",
        lines: [
          "npm run build",
          "     │",
          "     ▼",
          "Vite : compile les .vue, minifie, découpe en chunks,",
          "       génère des noms de fichiers avec hash",
          "     │",
          "     ▼",
          "dist/ : index.html + assets/*.js / *.css (statiques)",
          "     │",
          "     ├── hébergeur statique (Netlify, Vercel, GitHub Pages…)",
          "     │     + redirection /* → /index.html (pour le routeur)",
          "     │",
          "     └── ou servi par votre backend / Nginx",
        ],
      },
      {
        kind: "fields",
        title: "Points d'attention",
        fields: [
          {
            label: "Variables d'environnement",
            value:
              "Préfixe `VITE_` obligatoire (`VITE_API_URL`) pour être exposées au client via `import.meta.env`. Les secrets ne vont jamais dans le bundle client.",
          },
          {
            label: "Routeur en mode history",
            value:
              "Avec `createWebHistory`, le serveur doit servir `index.html` pour toutes les routes, sinon le rafraîchissement sur `/articles/3` donne une 404.",
          },
          {
            label: "Base path",
            value:
              "Si l'app est servie depuis un sous-chemin (`/mon-app/`), réglez `base: '/mon-app/'` dans `vite.config.ts` et adaptez le routeur.",
          },
          {
            label: "Vérification",
            value:
              "`npm run build && npm run preview` en local avant chaque déploiement : c'est le comportement réel de la production.",
          },
        ],
      },
    ],
  },
  {
    id: "nuxt",
    title: "Nuxt : quand aller plus loin",
    level: 3,
    intro: "Le framework au-dessus de Vue : ce qu'il apporte et quand l'adopter.",
    blocks: [
      {
        kind: "fields",
        title: "Nuxt en bref",
        fields: [
          {
            label: "En une phrase",
            value:
              "Nuxt est un framework construit sur Vue qui ajoute le rendu côté serveur (SSR), le routage basé sur les fichiers, et des conventions de projet — l'équivalent de ce que Next.js est à React.",
          },
          {
            label: "Pourquoi",
            value:
              "Le SSR améliore le référencement et le premier affichage pour les sites de contenu ; le routage par fichiers supprime la configuration manuelle des routes.",
          },
          {
            label: "Quand l'utiliser",
            value:
              "Sites de contenu, e-commerce, blogs : quand le SEO et la performance du premier chargement comptent. Pour une application métier derrière authentification, Vue + Vite suffit souvent.",
          },
          {
            label: "Quand s'en passer",
            value:
              "Petits projets, prototypes, applications internes : Nuxt ajoute des concepts (SSR, hydratation, Nitro) qui compliquent le debug sans bénéfice si le SEO n'est pas un enjeu.",
          },
          {
            label: "Notions clés",
            value:
              "`pages/` → routes automatiques, `useAsyncData` / `useFetch` pour les données SSR, `server/` pour les API, `NuxtLink` à la place de `RouterLink`.",
          },
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : apprenez Vue d'abord, Nuxt ensuite. Comprendre les composants, la réactivité et le routeur rend l'apprentissage de Nuxt naturel ; l'inverse masque les fondamentaux.",
      },
    ],
  },
  {
    id: "bonnes-pratiques",
    title: "Bonnes pratiques",
    level: 3,
    intro: "Les habitudes qui distinguent un projet Vue sain d'un projet qui se dégrade.",
    blocks: [
      {
        kind: "list",
        items: [
          "Un composant = une responsabilité : s'il fait plus de ~200 lignes ou mélange affichage, appels API et logique métier, découpez-le.",
          "État local par défaut (`ref` dans le composant) ; Pinia uniquement pour l'état réellement partagé entre pages.",
          "Nommez les composants en PascalCase avec plusieurs mots (`ListeTaches.vue`) : évite les collisions avec les balises HTML actuelles et futures.",
          "Les appels API vivent dans des modules dédiés (`src/api/`), pas dans les composants : un seul endroit à modifier si l'URL change.",
          "Extrayez la logique réutilisable en composables (`use...`) plutôt que de copier-coller entre composants.",
          "Validez les formulaires côté client pour l'expérience, côté serveur pour la sécurité : le client ne protège jamais rien.",
          "Gardez les templates déclaratifs : pas de logique complexe entre `{{ }}`, extrayez-la en `computed`.",
          "Versionnez tôt et souvent avec Git ; un composant qui fonctionne est une unité de commit naturelle.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs fréquentes",
    level: 3,
    intro: "Les dix pièges que tous les développeurs Vue rencontrent — et comment les éviter.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue d'erreurs",
        fields: [
          {
            label: "Oublier .value dans le script",
            value:
              "Mauvais : `compteur = 5` (remplace l'objet ref, réactivité cassée). Mieux : `compteur.value = 5`. Dans le template, `{{ compteur }}` suffit.",
          },
          {
            label: "Muter une prop dans l'enfant",
            value:
              "Mauvais : `props.titre = 'x'` (avertissement Vue, comportement imprévisible). Mieux : copier dans un `ref` local ou émettre un événement vers le parent.",
          },
          {
            label: ":key avec l'index",
            value:
              "Mauvais : `:key=\"index\"` dans un `v-for` sur une liste réordonnable. Mieux : un identifiant stable (`:key=\"element.id\"`).",
          },
          {
            label: "v-if et v-for ensemble",
            value:
              "Mauvais : `<li v-for=\"t in taches\" v-if=\"t.visible\">`. Mieux : un `computed` qui filtre, puis `v-for` sur le résultat.",
          },
          {
            label: "Déstructurer un reactive",
            value:
              "Mauvais : `const { compteur } = reactive({...})` (perte de réactivité). Mieux : `toRefs()` ou restez sur `ref`.",
          },
          {
            label: "Effets de bord dans computed",
            value:
              "Mauvais : appel API ou mutation dans un `computed`. Mieux : `computed` pur pour dériver, `watch` pour les effets.",
          },
          {
            label: "Oublier le nettoyage",
            value:
              "Mauvais : `setInterval` ou écouteur global sans `onUnmounted`. Mieux : toujours nettoyer — la fuite mémoire est silencieuse.",
          },
          {
            label: "Écouter un événement en camelCase",
            value:
              "Mauvais : `@monEvenement` dans un template HTML (normalisé en minuscules). Mieux : émettre et écouter en kebab-case (`@mon-evenement`).",
          },
          {
            label: "v-model.number oublié",
            value:
              "Mauvais : `<input type=\"number\" v-model=\"age\">` donne une chaîne. Mieux : `v-model.number=\"age\"` pour un vrai nombre.",
          },
          {
            label: "État partagé via props profondes",
            value:
              "Mauvais : faire transiter une donnée par 6 niveaux de composants. Mieux : Pinia pour l'état métier partagé, `provide`/`inject` pour le contexte transverse.",
          },
        ],
      },
    ],
  },
  {
    id: "projets-realistes",
    title: "Projets réalistes progressifs",
    level: 3,
    intro: "Quatre projets qui montent en puissance, chacun réutilisant les acquis du précédent.",
    blocks: [
      {
        kind: "fields",
        title: "Projet 1 — Liste de tâches interactive",
        fields: [
          {
            label: "Objectif",
            value:
              "Ajouter, cocher, filtrer et supprimer des tâches, avec persistance en `localStorage`.",
          },
          {
            label: "Compétences",
            value: "`ref`, `computed`, `v-for` + `:key`, `v-model`, `watch` pour la sauvegarde.",
          },
          {
            label: "Difficulté",
            value: "Débutant — le « hello world » complet de la réactivité.",
          },
          {
            label: "Projet suivant",
            value: "Le quiz : on ajoute la navigation entre questions.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 2 — Quiz à choix multiples",
        fields: [
          {
            label: "Objectif",
            value:
              "Un quiz de 10 questions avec score, progression et écran de résultat.",
          },
          {
            label: "Compétences",
            value:
              "Composants (`Question.vue`, `Resultat.vue`), props/événements, rendu conditionnel, `computed` pour le score.",
          },
          {
            label: "Difficulté",
            value: "Débutant avancé — première vraie composition de composants.",
          },
          {
            label: "Projet suivant",
            value: "Le tableau de bord : on ajoute le routeur et les appels API.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 3 — Tableau de bord avec API",
        fields: [
          {
            label: "Objectif",
            value:
              "Plusieurs pages (accueil, liste, détail) alimentées par une API publique, avec états de chargement et d'erreur.",
          },
          {
            label: "Compétences",
            value:
              "Vue Router (routes, paramètres, chargement différé), `onMounted` + `fetch`, `<Suspense>`, gardes de navigation.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire — première application multi-pages réaliste.",
          },
          {
            label: "Projet suivant",
            value: "La boutique : on ajoute l'état global et les formulaires.",
          },
        ],
      },
      {
        kind: "fields",
        title: "Projet 4 — Mini-boutique complète",
        fields: [
          {
            label: "Objectif",
            value:
              "Catalogue, panier persistant, formulaire de commande validé, le tout testé.",
          },
          {
            label: "Compétences",
            value:
              "Pinia (panier, utilisateur), formulaires avec validation, TypeScript sur les frontières, tests Vitest des composables et du store, build de production.",
          },
          {
            label: "Difficulté",
            value: "Intermédiaire avancé — portfolio-ready.",
          },
          {
            label: "Projet suivant",
            value: "Déployez-la, puis explorez Nuxt pour le SSR ou un backend réel.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources officielles",
    level: 3,
    intro: "Les sources fiables, par ordre de priorité.",
    blocks: [
      {
        kind: "list",
        items: [
          "`https://vuejs.org/` — la documentation officielle : tutoriel interactif, guide complet, référence API. La première source, toujours à jour.",
          "`https://router.vuejs.org/` — documentation officielle de Vue Router.",
          "`https://pinia.vuejs.org/` — documentation officielle de Pinia.",
          "`https://nuxt.com/docs` — documentation officielle de Nuxt.",
          "`https://vitest.dev/` — documentation de Vitest pour les tests.",
          "`https://developer.mozilla.org/` (MDN) — la référence pour le JavaScript, le DOM et les API navigateur que Vue utilise.",
        ],
      },
      {
        kind: "text",
        text: "Bonne pratique : la documentation Vue propose un sélecteur « Options API / Composition API » en haut de chaque page — vérifiez qu'il est réglé sur Composition API si vous suivez cette page.",
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Vue maîtrisé dans ses fondamentaux : les directions naturelles.",
    blocks: [
      {
        kind: "fields",
        title: "Pistes de progression",
        fields: [
          {
            label: "TypeScript à fond",
            value:
              "Si vous avez appris Vue en JavaScript, repassez vos projets en `lang=\"ts\"` : les props et stores typés changent la qualité du code.",
          },
          {
            label: "Nuxt",
            value:
              "Pour le SSR, le SEO et le routage par fichiers : la suite logique pour les sites de contenu.",
          },
          {
            label: "Tests",
            value:
              "Vitest + Vue Test Utils sur vos projets : les tests de composables et de stores sont le meilleur retour sur investissement.",
          },
          {
            label: "Backend",
            value:
              "Node.js (Express, Fastify) ou un BaaS : une interface sans API réelle reste un exercice. Construisez le backend de votre mini-boutique.",
          },
          {
            label: "Écosystème",
            value:
              "Bibliothèques de composants (Vuetify, PrimeVue, Naive UI) pour accélérer les interfaces métier — en comprenant ce qu'elles abstraient.",
          },
        ],
      },
    ],
  },
];

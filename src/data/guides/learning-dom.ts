import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du DOM : l'arbre du document, la sélection, la
 * manipulation, les événements et les pièges classiques (XSS, reflow).
 * Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_DOM: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est le DOM et pourquoi JavaScript peut modifier la page.",
    blocks: [
      {
        kind: "text",
        text: "Le DOM (Document Object Model) est la représentation en mémoire de votre page HTML sous forme d'arbre d'objets. Chaque balise devient un « nœud » que JavaScript peut lire, créer, modifier ou supprimer. C'est le pont entre votre code et ce que l'utilisateur voit.",
      },
      {
        kind: "text",
        text: "Le DOM n'est pas le HTML : le HTML est le texte source, le DOM est la structure vivante construite par le navigateur à partir de ce texte. Quand JavaScript modifie le DOM, la page se met à jour sans rechargement : c'est le fondement de toute interactivité web.",
      },
      {
        kind: "text",
        text: "Ce parcours couvre la sélection d'éléments, leur manipulation, les événements (clics, saisie, formulaires), les bonnes pratiques de performance et les pièges de sécurité. Les frameworks (React, Vue) abstraient le DOM, mais le comprendre reste indispensable pour déboguer et pour tout ce que les frameworks ne couvrent pas.",
      },
    ],
  },
  {
    id: "dom-arbre-30s",
    title: "L'arbre DOM en 30 secondes",
    level: 1,
    intro:
      "Le modèle mental : un arbre de nœuds.",
    blocks: [
      {
        kind: "diagram",
        title: "Structure d'arbre",
        lines: [
          "document",
          "└── html",
          "    ├── head",
          "    │   └── title ← nœud texte : « Ma page »",
          "    └── body",
          "        ├── h1 ← élément",
          "        │   └── « Bonjour » ← nœud texte",
          "        └── button#envoyer ← élément avec attribut id",
          "",
          "Chaque nœud a : un parent, des enfants, des frères/sœurs.",
          "document.querySelector('#envoyer') → le nœud bouton.",
        ],
      },
      {
        kind: "text",
        text: "Types de nœuds à connaître : les éléments (`<div>`), les nœuds texte (le contenu), les attributs. En pratique, on manipule presque toujours des éléments via l'interface `Element`.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 2 — PRATIQUE
  // ------------------------------------------------------------------
  {
    id: "prerequis-dom",
    title: "Prérequis",
    level: 2,
    intro:
      "Les bases avant de toucher au DOM.",
    blocks: [
      {
        kind: "fields",
        title: "Fondations requises",
        fields: [
          {
            label: "JavaScript",
            value:
              "Variables, fonctions, tableaux, objets, boucles : la compétence `javascript` couvre tout cela. Les callbacks sont essentiels pour les événements.",
          },
          {
            label: "HTML",
            value:
              "La structure des balises, les attributs (`id`, `class`), les formulaires : voir `html`.",
          },
          {
            label: "CSS (utile)",
            value:
              "Les sélecteurs CSS servent aussi à sélectionner les éléments en JS (`querySelector`).",
          },
        ],
      },
    ],
  },
  {
    id: "premier-script",
    title: "Premier script DOM",
    level: 2,
    intro:
      "Sélectionner un élément et réagir à un clic.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "La page",
        code: `<!DOCTYPE html>\n<html lang="fr">\n<head><meta charset="utf-8"><title>Démo DOM</title></head>\n<body>\n  <p id="message">Texte d'origine</p>\n  <button id="bouton">Cliquer</button>\n  <script src="app.js"></script>\n</body>\n</html>`,
      },
      {
        kind: "code",
        language: "js",
        title: "Le script (app.js)",
        code: `// 1. Sélectionner les éléments\nconst message = document.querySelector("#message");\nconst bouton = document.querySelector("#bouton");\n\n// 2. Réagir au clic\nbouton.addEventListener("click", () => {\n  // 3. Modifier le DOM\n  message.textContent = "Texte modifié !";\n  message.style.color = "green";\n});`,
      },
      {
        kind: "list",
        items: [
          "Le `<script>` en fin de `<body>` garantit que les éléments existent quand le code s'exécute.",
          "Alternative moderne : `<script src=\"app.js\" defer></script>` dans le `<head>` — le script s'exécute après le parsing HTML.",
          "Les trois gestes fondamentaux : sélectionner, écouter, modifier.",
        ],
      },
    ],
  },
  {
    id: "selection",
    title: "Sélectionner des éléments",
    level: 2,
    intro:
      "`querySelector`, l'outil universel de sélection.",
    blocks: [
      {
        kind: "table",
        headers: ["Méthode", "Retourne", "Usage"],
        rows: [
          ["`querySelector(sel)`", "Le premier élément correspondant", "Le choix par défaut"],
          ["`querySelectorAll(sel)`", "Tous les correspondants (NodeList)", "Boucler sur plusieurs éléments"],
          ["`getElementById(id)`", "L'élément avec cet id", "Id unique, légèrement plus rapide"],
          ["`getElementsByClassName(cls)`", "Collection HTML (vivante)", "Héritage d'avant `querySelector`"],
        ],
      },
      {
        kind: "code",
        language: "js",
        title: "Sélections courantes",
        code: `const titre = document.querySelector("h1");\nconst email = document.querySelector("#email");        // par id\nconst boutons = document.querySelectorAll(".btn");    // tous les .btn\nconst premierLien = document.querySelector("nav a");  // sélecteur CSS complet\n\n// querySelectorAll retourne une NodeList : forEach disponible\nboutons.forEach((b) => b.classList.add("actif"));`,
      },
      {
        kind: "text",
        text: "`querySelector` accepte n'importe quel sélecteur CSS valide : `#id`, `.classe`, `[attribut]`, `div > p`, `:nth-child(2)`. Si vous savez écrire un sélecteur CSS, vous savez sélectionner en JS.",
      },
    ],
  },
  {
    id: "textcontent-innerhtml",
    title: "Modifier le contenu : textContent vs innerHTML",
    level: 2,
    intro:
      "La distinction la plus importante pour la sécurité.",
    blocks: [
      {
        kind: "table",
        headers: ["", "`textContent`", "`innerHTML`"],
        rows: [
          ["Fait", "Remplace par du texte brut", "Parse et insère du HTML"],
          ["Balises dans la valeur", "Affichées littéralement (`<b>` visible)", "Interprétées (texte en gras)"],
          ["Sécurité", "Sûr : aucun script ne s'exécute", "Dangereux avec des données utilisateur (XSS)"],
          ["Performance", "Plus rapide", "Re-parse le HTML à chaque fois"],
        ],
      },
      {
        kind: "code",
        language: "js",
        title: "Le bon réflexe",
        code: `const nom = "Marie"; // imaginons : saisi par l'utilisateur\n\n// ✅ Sûr : le texte est inséré tel quel\nelt.textContent = "Bonjour " + nom;\n\n// ❌ Dangereux si 'nom' contient <img src=x onerror=...> : XSS\nelt.innerHTML = "Bonjour " + nom;\n\n// innerHTML légitime : gabarit statique de confiance\nelt.innerHTML = "<strong>Total :</strong> 42 €";`,
      },
      {
        kind: "text",
        text: "Règle d'or : `textContent` par défaut ; `innerHTML` uniquement avec du HTML statique que vous contrôlez, jamais avec des données utilisateur non échappées. Le niveau 3 détaille les attaques XSS.",
      },
    ],
  },
  {
    id: "attributs-classes",
    title: "Attributs et classes",
    level: 2,
    intro:
      "Lire et modifier les attributs, basculer des classes.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Attributs",
        code: `const lien = document.querySelector("a");\n\nlien.getAttribute("href");          // lit l'attribut\nlien.setAttribute("href", "/nouveau"); // modifie\nlien.removeAttribute("target");        // supprime\nlien.hasAttribute("download");         // teste\n\n// Propriétés vs attributs : pour les champs de formulaire,\n// préférez les propriétés\nconst champ = document.querySelector("#nom");\nchamp.value = "Marie";        // valeur actuelle (propriété)\nchamp.disabled = true;        // désactive le champ\nchamp.checked;                // état d'une case à cocher`,
      },
      {
        kind: "code",
        language: "js",
        title: "Classes avec classList",
        code: `const carte = document.querySelector(".carte");\n\ncarte.classList.add("selectionnee");\ncarte.classList.remove("masquee");\ncarte.classList.toggle("ouvert");            // bascule on/off\ncarte.classList.toggle("sombre", isNuit);    // force selon un booléen\ncarte.classList.contains("actif");           // teste la présence`,
      },
      {
        kind: "text",
        text: "`classList` remplace toute manipulation manuelle de la chaîne `className`. Pour les états visuels (actif, ouvert, erreur), basculez des classes et laissez le CSS gérer l'apparence : c'est la séparation correcte des responsabilités.",
      },
    ],
  },
  {
    id: "styles-js",
    title: "Modifier les styles en JS",
    level: 2,
    intro:
      "Quand toucher au style directement, et quand préférer les classes.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "La propriété style",
        code: `const boite = document.querySelector(".boite");\n\n// Propriétés CSS en camelCase\nboite.style.backgroundColor = "tomato";\nboite.style.fontSize = "1.25rem";\n\n// Lire : uniquement les styles inline (pas ceux de la feuille CSS)\nboite.style.color; // "" si défini dans une feuille externe\n\n// Pour lire le style calculé réel :\ngetComputedStyle(boite).color; // "rgb(255, 99, 71)"`,
      },
      {
        kind: "list",
        items: [
          "Préférez les classes pour les états (`classList.toggle`) : le style reste dans le CSS, le JS gère la logique.",
          "Utilisez `element.style` pour les valeurs dynamiques calculées en JS (position d'un drag, largeur d'une barre de progression).",
          "Les custom properties CSS sont un pont élégant : `elt.style.setProperty(\"--x\", valeur)` lu par le CSS.",
        ],
      },
    ],
  },
  {
    id: "creer-elements",
    title: "Créer et insérer des éléments",
    level: 2,
    intro:
      "Construire du DOM dynamiquement.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Création et insertion",
        code: `// Créer\nconst li = document.createElement("li");\nli.textContent = "Nouvelle tâche";\nli.className = "tache";\n\n// Insérer\nconst liste = document.querySelector("#taches");\nliste.append(li);            // à la fin\nliste.prepend(li);           // au début\nliste.before(li);            // avant la liste elle-même\n// .after(), .replaceWith(), .remove() existent aussi\n\n// Supprimer\nli.remove();`,
      },
      {
        kind: "text",
        text: "Pour insérer beaucoup d'éléments d'un coup, construisez-les dans un `DocumentFragment` puis insérez le fragment : un seul reflow au lieu d'un par élément (détails au niveau 3).",
      },
    ],
  },
  {
    id: "events-bases",
    title: "Les événements : bases",
    level: 2,
    intro:
      "Écouter et réagir : `addEventListener`.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Écouter les événements",
        code: `const bouton = document.querySelector("#envoyer");\n\n// La forme moderne : addEventListener\nbouton.addEventListener("click", (event) => {\n  console.log("Cliqué !", event.target); // l'élément cliqué\n});\n\n// Plusieurs écouteurs possibles sur le même événement\nbouton.addEventListener("click", () => console.log("Second écouteur"));\n\n// Retirer un écouteur (fonction nommée requise)\nfunction surClic() { /* ... */ }\nbouton.addEventListener("click", surClic);\nbouton.removeEventListener("click", surClic);`,
      },
      {
        kind: "table",
        headers: ["Événement", "Déclenché quand…"],
        rows: [
          ["`click`", "Clic souris / activation clavier"],
          ["`input`", "Chaque modification d'un champ (saisie en direct)"],
          ["`change`", "Valeur validée (sortie du champ, sélection)"],
          ["`submit`", "Envoi d'un formulaire"],
          ["`keydown` / `keyup`", "Touche enfoncée / relâchée"],
          ["`DOMContentLoaded`", "Le HTML est parsé (sur `document`)"],
        ],
      },
      {
        kind: "text",
        text: "Évitez les attributs `onclick=\"...\"` dans le HTML : ils mélangent structure et logique, n'acceptent qu'un seul gestionnaire et posent des problèmes de sécurité (CSP). `addEventListener` est la voie moderne.",
      },
    ],
  },
  {
    id: "events-delegation",
    title: "La délégation d'événements",
    level: 2,
    intro:
      "Un seul écouteur pour des éléments dynamiques.",
    blocks: [
      {
        kind: "text",
        text: "Plutôt qu'attacher un écouteur à chaque élément (coûteux, et inefficace pour les éléments créés après), on écoute leur ancêtre commun : l'événement « remonte » (bubbling) jusqu'à lui, et on identifie la cible avec `event.target`.",
      },
      {
        kind: "code",
        language: "js",
        title: "Liste dynamique avec un seul écouteur",
        code: `const liste = document.querySelector("#taches");\n\n// Un seul écouteur, même pour les <li> ajoutés plus tard\nliste.addEventListener("click", (event) => {\n  // closest() remonte jusqu'au <li> parent (même si on clique un <span> dedans)\n  const item = event.target.closest("li");\n  if (!item) return; // clic hors d'un <li> : ignorer\n\n  if (event.target.matches(".supprimer")) {\n    item.remove();\n  } else {\n    item.classList.toggle("terminee");\n  }\n});`,
      },
      {
        kind: "list",
        items: [
          "`event.target` = l'élément réellement cliqué ; `event.currentTarget` = l'élément qui écoute.",
          "`closest()` et `matches()` sont les deux utilitaires clés de la délégation.",
          "Pattern indispensable pour listes, tableaux, menus dynamiques.",
        ],
      },
    ],
  },
  {
    id: "formulaires-dom",
    title: "Formulaires en JS",
    level: 2,
    intro:
      "Lire les valeurs, intercepter l'envoi, valider.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Lecture et interception",
        code: `const form = document.querySelector("#inscription");\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault(); // empêche le rechargement de la page\n\n  // FormData : lit tous les champs nommés d'un coup\n  const donnees = new FormData(form);\n  const nom = donnees.get("nom");\n  const email = donnees.get("email");\n\n  console.log({ nom, email });\n  // → envoyer avec fetch (voir la compétence fetch-api)\n});`,
      },
      {
        kind: "list",
        items: [
          "`event.preventDefault()` sur `submit` : le réflexe de base des formulaires JS.",
          "`new FormData(form)` évite de sélectionner chaque champ un par un.",
          "La validation HTML (`required`, `type=\"email\"`, `minlength`) fonctionne avant le JS : gardez-la, elle est accessible nativement.",
        ],
      },
    ],
  },
  {
    id: "devtools-dom-intro",
    title: "Explorer avec les DevTools",
    level: 2,
    intro:
      "L'onglet Éléments est votre laboratoire DOM.",
    blocks: [
      {
        kind: "list",
        items: [
          "Inspecter un élément : clic droit → Inspecter, ou `Ctrl+Maj+C` puis clic sur la page.",
          "L'élément sélectionné est disponible en console sous `$0` : testez `$0.textContent`, `$0.classList`.",
          "`$(\".ma-classe\")` et `$$(“.ma-classe\")` en console sont des raccourcis pour `querySelector` / `querySelectorAll`.",
          "Modifiez le HTML/CSS en direct dans l'onglet Éléments pour prototyper avant d'écrire le JS.",
          "L'onglet Console + `console.log` reste le débogage le plus rapide pour vérifier sélections et valeurs.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes-dom",
    title: "Les erreurs les plus courantes",
    level: 2,
    intro:
      "Les pièges classiques des débuts avec le DOM.",
    blocks: [
      {
        kind: "list",
        items: [
          "`querySelector` retourne `null` : le script s'exécute avant que l'élément existe (script dans le `<head>` sans `defer`).",
          "`Cannot read properties of null` : toujours vérifier la sélection avant de l'utiliser, ou comprendre pourquoi elle échoue.",
          "`innerHTML` avec des données utilisateur : faille XSS — utilisez `textContent`.",
          "Écouteurs dupliqués : ajouter un `addEventListener` dans une fonction appelée plusieurs fois empile les gestionnaires.",
          "Oublier `preventDefault()` sur un `submit` : la page recharge et les données semblent « perdues ».",
          "Confondre `event.target` et `event.currentTarget` dans la délégation.",
        ],
      },
    ],
  },
  {
    id: "projet-todo",
    title: "Projet : liste de tâches",
    level: 2,
    intro:
      "Le projet classique qui mobilise tout le niveau 2.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Structure HTML",
            detail:
              "Un formulaire (champ + bouton), une liste `<ul>` vide. IDs clairs pour la sélection.",
          },
          {
            title: "Ajout de tâche",
            detail:
              "`submit` + `preventDefault()` : créer un `<li>` avec `createElement`, `textContent` pour le texte (sécurité), bouton supprimer.",
          },
          {
            title: "Interactions",
            detail:
              "Délégation sur la `<ul>` : clic sur la tâche = bascule `terminee`, clic sur le bouton = suppression.",
          },
          {
            title: "Persistance",
            detail:
              "Sauvegarder le tableau des tâches en `localStorage` (JSON) et le restaurer au chargement.",
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "events-detail",
    title: "Les événements en profondeur",
    level: 3,
    intro:
      "L'objet Event, les options d'écoute, les événements personnalisés.",
    blocks: [
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "L'objet Event",
            value:
              "`type`, `target`, `currentTarget`, `timeStamp` ; selon le type : `key` (clavier), `clientX/clientY` (souris), `preventDefault()`, `stopPropagation()`.",
          },
          {
            label: "Options d'addEventListener",
            value:
              "`{ once: true }` (écouteur unique), `{ passive: true }` (promet de ne pas appeler preventDefault — crucial pour le scroll), `{ capture: true }` (phase de capture), `{ signal }` (annulation via AbortController).",
          },
          {
            label: "Nettoyage",
            value:
              "Sur les composants éphémères (SPA, modales), retirez les écouteurs ou utilisez un `AbortController` pour éviter les fuites mémoire.",
          },
        ],
      },
      {
        kind: "code",
        language: "js",
        title: "Écouteurs robustes",
        code: `// Écouteur à usage unique\nbouton.addEventListener("click", init, { once: true });\n\n// Groupe d'écouteurs annulables d'un coup\nconst controleur = new AbortController();\nmodale.addEventListener("keydown", fermerSurEchap, { signal: controleur.signal });\nmodale.addEventListener("click", fermerSurClicExterieur, { signal: controleur.signal });\n// À la fermeture :\ncontroleur.abort(); // tous les écouteurs sont retirés`,
      },
    ],
  },
  {
    id: "event-flow",
    title: "Capture, cible, bubbling",
    level: 3,
    intro:
      "Le voyage complet d'un événement dans l'arbre.",
    blocks: [
      {
        kind: "diagram",
        title: "Les trois phases",
        lines: [
          "1. CAPTURE : window → document → … → parent → cible",
          "   (écouteurs avec { capture: true })",
          "",
          "2. CIBLE : l'élément lui-même",
          "   (event.target === event.currentTarget)",
          "",
          "3. BUBBLING : cible → parent → … → document → window",
          "   (écouteurs normaux — c'est ce qui permet la délégation)",
          "",
          "stopPropagation() : arrête la propagation aux autres éléments.",
          "stopImmediatePropagation() : + bloque les autres écouteurs du même élément.",
        ],
      },
      {
        kind: "text",
        text: "La délégation repose sur le bubbling : un clic sur un bouton remonte jusqu'au conteneur qui écoute. Attention : tous les événements ne « bubblent » pas (`focus` et `blur` non, mais `focusin`/`focusout` oui).",
      },
    ],
  },
  {
    id: "preventdefault-detail",
    title: "preventDefault() : les cas d'usage",
    level: 3,
    intro:
      "Quand empêcher le comportement natif du navigateur.",
    blocks: [
      {
        kind: "table",
        headers: ["Situation", "Comportement natif empêché"],
        rows: [
          ["`submit` de formulaire", "Rechargement de la page"],
          ["Clic sur lien `<a>`", "Navigation"],
          ["`keydown` sur Espace dans un bouton", "Activation / scroll"],
          ["`dragover`", "Interdiction du drop (nécessaire pour le drag & drop)"],
          ["`contextmenu`", "Menu contextuel natif"],
        ],
      },
      {
        kind: "text",
        text: "N'empêchez que ce qui gêne : bloquer le comportement natif sans fournir d'alternative accessible (ex. empêcher le scroll, casser le zoom) dégrade l'expérience, surtout au clavier et sur mobile.",
      },
    ],
  },
  {
    id: "input-events",
    title: "Événements de saisie",
    level: 3,
    intro:
      "`input`, `change`, clavier : choisir le bon.",
    blocks: [
      {
        kind: "table",
        headers: ["Événement", "Se déclenche", "Usage typique"],
        rows: [
          ["`input`", "À chaque modification (frappe, collage, suppression)", "Recherche en direct, compteurs, validation instantanée"],
          ["`change`", "Quand la valeur est validée (blur, Entrée, sélection)", "Préférences, filtres à appliquer"],
          ["`keydown`", "Touche enfoncée (avant la saisie)", "Raccourcis, touches spéciales (Échap, Entrée)"],
          ["`beforeinput`", "Juste avant la modification", "Filtrage fin de la saisie"],
        ],
      },
      {
        kind: "code",
        language: "js",
        title: "Recherche en direct",
        code: `const champ = document.querySelector("#recherche");\nconst resultats = document.querySelector("#resultats");\n\nchamp.addEventListener("input", () => {\n  const terme = champ.value.trim().toLowerCase();\n  // filtrer et réafficher (avec debounce — voir section dédiée)\n  afficher(resultatsFiltres(donnees, terme));\n});`,
      },
    ],
  },
  {
    id: "dom-traversal",
    title: "Naviguer dans l'arbre",
    level: 3,
    intro:
      "Parent, enfants, frères : se déplacer sans re-sélectionner.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Propriétés de navigation",
        code: `const elt = document.querySelector(".actif");\n\nelt.parentElement;        // le parent (élément)\nelt.children;             // les enfants éléments (HTMLCollection)\nelt.childNodes;           // tous les nœuds (inclut le texte !)\nelt.firstElementChild;\nelt.lastElementChild;\nelt.nextElementSibling;   // le frère suivant\nelt.previousElementSibling;\n\n// Remonter jusqu'à un ancêtre précis\nelt.closest(".carte");\n// Tester\nelt.matches("button.primary");`,
      },
      {
        kind: "text",
        text: "Préférez les versions `*Element*` (`children`, `firstElementChild`) aux versions nœuds (`childNodes`) : elles ignorent les nœuds texte (espaces, retours à la ligne) qui surprennent les débutants.",
      },
    ],
  },
  {
    id: "collections-vs-arrays",
    title: "NodeList et HTMLCollection",
    level: 3,
    intro:
      "Des faux tableaux : ce qu'on peut en faire ou pas.",
    blocks: [
      {
        kind: "table",
        headers: ["", "NodeList (`querySelectorAll`)", "HTMLCollection (`children`, `getElementsBy*`)"],
        rows: [
          ["Statique ou vivante", "Statique (figée au moment de la requête)", "Vivante (suit les modifs du DOM)"],
          ["`forEach`", "Oui", "Non (convertir d'abord)"],
          ["Accès", "`liste[0]`, `.length`, itérable", "Idem"],
        ],
      },
      {
        kind: "code",
        language: "js",
        title: "Convertir en vrai tableau",
        code: `// Pour map, filter, etc. :\nconst boutons = [...document.querySelectorAll("button")];\nconst actifs = boutons.filter((b) => b.classList.contains("actif"));\n\n// Attention à la collection vivante :\nconst items = document.getElementsByClassName("item");\n// Si vous supprimez des .item en bouclant, la collection rétrécit\n// pendant la boucle → bouclez à l'envers ou convertissez d'abord.`,
      },
    ],
  },
  {
    id: "templates-fragments",
    title: "Templates et fragments",
    level: 3,
    intro:
      "Construire du DOM complexe proprement et vite.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "L'élément <template>",
        code: `<template id="modele-carte">\n  <article class="carte">\n    <h3 class="titre"></h3>\n    <p class="texte"></p>\n  </article>\n</template>`,
      },
      {
        kind: "code",
        language: "js",
        title: "Cloner et remplir",
        code: `const modele = document.querySelector("#modele-carte");\nconst conteneur = document.querySelector("#liste");\nconst fragment = document.createDocumentFragment();\n\narticles.forEach((a) => {\n  // clone profond du contenu du template\n  const carte = modele.content.cloneNode(true);\n  carte.querySelector(".titre").textContent = a.titre; // textContent : sûr\n  carte.querySelector(".texte").textContent = a.texte;\n  fragment.append(carte);\n});\n\nconteneur.append(fragment); // UNE seule insertion → un seul reflow`,
      },
      {
        kind: "text",
        text: "Le `<template>` garde le gabarit dans le HTML (lisible, maintenable) sans l'afficher ; le `DocumentFragment` regroupe les insertions. C'est la méthode recommandée pour générer des listes depuis des données.",
      },
    ],
  },
  {
    id: "dataset",
    title: "Les attributs data-*",
    level: 3,
    intro:
      "Stocker des données dans le HTML, proprement.",
    blocks: [
      {
        kind: "code",
        language: "html",
        title: "HTML",
        code: `<button class="filtre" data-categorie="livres" data-tri="prix\">Livres</button>`,
      },
      {
        kind: "code",
        language: "js",
        title: "Lecture via dataset",
        code: `document.querySelector(".filtre").addEventListener("click", (e) => {\n  const btn = e.currentTarget;\n  console.log(btn.dataset.categorie); // "livres"\n  console.log(btn.dataset.tri);        // "prix"\n  // data-mon-attribut → dataset.monAttribut (camelCase)\n});`,
      },
      {
        kind: "text",
        text: "Les `data-*` sont le canal officiel pour passer des infos du HTML au JS (ids, catégories, états). Bien plus propre que de parser des classes ou des ids. Ne jamais y mettre de données sensibles : elles sont visibles dans le code source.",
      },
    ],
  },
  {
    id: "reflow-repaint",
    title: "Reflow et repaint",
    level: 3,
    intro:
      "Comprendre ce que coûte chaque modification du DOM.",
    blocks: [
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Repaint",
            value:
              "Le navigateur redessine (couleur, ombre, visibilité). Coût modéré.",
          },
          {
            label: "Reflow (layout)",
            value:
              "Le navigateur recalcule la géométrie (positions, tailles) de tout ou partie de la page. Coût élevé, surtout en cascade.",
          },
          {
            label: "Déclencheurs de reflow",
            value:
              "Ajout/suppression d'éléments, changement de dimensions, lecture de `offsetWidth`/`getBoundingClientRect()` juste après une écriture (reflow forcé synchrone).",
          },
          {
            label: "Règle d'or",
            value:
              "Regroupez les lectures, regroupez les écritures ; ne lisez jamais une géométrie entre deux écritures dans une boucle.",
          },
        ],
      },
    ],
  },
  {
    id: "performance-dom",
    title: "Performance DOM en pratique",
    level: 3,
    intro:
      "Les techniques qui évitent les pages saccadées.",
    blocks: [
      {
        kind: "list",
        items: [
          "Insertions en masse : `DocumentFragment` ou construction d'une chaîne + une seule affectation (avec HTML de confiance uniquement).",
          "Évitez les reflows forcés synchrones : lisez toutes les géométries d'abord, écrivez ensuite.",
          "Pour les animations : animez `transform` et `opacity` (composites, pas de reflow) — voir `css-animations`.",
          "Listes longues : virtualisation (ne rendre que les éléments visibles) ou pagination ; des milliers de nœuds ralentissent tout.",
          "`content-visibility: auto` en CSS : le navigateur saute le rendu des sections hors écran.",
        ],
      },
    ],
  },
  {
    id: "virtual-dom-concept",
    title: "Le Virtual DOM (concept)",
    level: 3,
    intro:
      "Pourquoi React et Vue abstraient le DOM.",
    blocks: [
      {
        kind: "text",
        text: "Manipuler le DOM directement est verbeux et source d'incohérences (l'état de l'app vs l'état affiché). Les frameworks maintiennent une représentation légère en mémoire (le « virtual DOM »), calculent la différence avec le rendu précédent et n'appliquent au vrai DOM que les changements minimaux. Vous décrivez l'état désiré ; le framework gère les mutations.",
      },
      {
        kind: "text",
        text: "Comprendre le DOM reste indispensable : pour déboguer ce que le framework produit, pour les cas non couverts (canvas, intégrations tierces, Web Components), et pour mesurer les performances réelles.",
      },
    ],
  },
  {
    id: "mutation-observer",
    title: "MutationObserver",
    level: 3,
    intro:
      "Réagir aux changements du DOM.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Observer des mutations",
        code: `const cible = document.querySelector("#liste");\n\nconst observer = new MutationObserver((mutations) => {\n  for (const m of mutations) {\n    if (m.type === "childList") console.log("Enfants modifiés");\n    if (m.type === "attributes") console.log("Attribut modifié :", m.attributeName);\n  }\n});\n\nobserver.observe(cible, {\n  childList: true,      // ajouts/suppressions d'enfants\n  attributes: true,     // changements d'attributs\n  subtree: true,        // inclure les descendants\n});\n\n// Quand on n'en a plus besoin :\n// observer.disconnect();`,
      },
      {
        kind: "text",
        text: "Cas d'usage : intégrations tierces, éditeurs, tests, debug. Les callbacks sont asynchrones et groupés : pas de risque de boucle de reflow si vous modifiez le DOM dans le callback (mais restez prudent).",
      },
    ],
  },
  {
    id: "intersection-observer",
    title: "IntersectionObserver",
    level: 3,
    intro:
      "Savoir quand un élément entre à l'écran — sans écouter le scroll.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Lazy loading d'images",
        code: `const images = document.querySelectorAll("img[data-src]");\n\nconst io = new IntersectionObserver((entrees) => {\n  for (const entree of entrees) {\n    if (entree.isIntersecting) {\n      const img = entree.target;\n      img.src = img.dataset.src;      // charge la vraie image\n      img.removeAttribute("data-src");\n      io.unobserve(img);              // on ne l'observe plus\n    }\n  }\n});\n\nimages.forEach((img) => io.observe(img));`,
      },
      {
        kind: "list",
        items: [
          "Bien plus performant qu'un écouteur `scroll` : le navigateur optimise la détection.",
          "Autres usages : animations d'apparition au scroll, infinite scroll, suivi de visibilité.",
          "Options : `rootMargin` (marges de déclenchement), `threshold` (pourcentage visible requis).",
        ],
      },
    ],
  },
  {
    id: "resize-observer",
    title: "ResizeObserver",
    level: 3,
    intro:
      "Réagir aux changements de taille d'un élément.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Adapter un composant à son conteneur",
        code: `const panneau = document.querySelector(".panneau");\n\nnew ResizeObserver((entrees) => {\n  const { width } = entrees[0].contentRect;\n  panneau.classList.toggle("compact", width < 400);\n}).observe(panneau);`,
      },
      {
        kind: "text",
        text: "Complément JS des container queries CSS : quand la logique dépasse le style (changer de composant, recharger des données), `ResizeObserver` prend le relais. Attention à ne pas créer de boucle (observer un élément dont on change la taille dans le callback).",
      },
    ],
  },
  {
    id: "localstorage",
    title: "localStorage et sessionStorage",
    level: 3,
    intro:
      "Persister des données côté navigateur.",
    blocks: [
      {
        kind: "table",
        headers: ["", "`localStorage`", "`sessionStorage`"],
        rows: [
          ["Durée de vie", "Persistant (jusqu'à suppression)", "L'onglet courant uniquement"],
          ["Capacité", "~5 Mo", "~5 Mo"],
          ["Usage", "Préférences, brouillons, panier", "État temporaire d'un parcours"],
        ],
      },
      {
        kind: "code",
        language: "js",
        title: "Sauvegarder un objet",
        code: `// Stockage : chaînes uniquement → JSON\nconst prefs = { theme: "sombre", langue: "fr" };\nlocalStorage.setItem("prefs", JSON.stringify(prefs));\n\n// Lecture (avec valeur par défaut si absent)\nconst lues = JSON.parse(localStorage.getItem("prefs") ?? "{}");\n\n// Suppression\nlocalStorage.removeItem("prefs");`,
      },
      {
        kind: "list",
        items: [
          "Toujours `JSON.stringify` / `JSON.parse` : le stockage ne connaît que les chaînes.",
          "Peut lever des exceptions (quota dépassé, mode privé) : entourez de try/catch pour le code critique.",
          "Jamais de données sensibles (tokens, mots de passe) : le contenu est lisible en clair et accessible à tout script (XSS).",
        ],
      },
    ],
  },
  {
    id: "timers-dom",
    title: "Timers et animation",
    level: 3,
    intro:
      "`setTimeout`, `setInterval` et `requestAnimationFrame`.",
    blocks: [
      {
        kind: "table",
        headers: ["Outil", "Usage", "Note"],
        rows: [
          ["`setTimeout(fn, ms)`", "Exécuter une fois après un délai", "Retourne un id pour `clearTimeout`"],
          ["`setInterval(fn, ms)`", "Répéter à intervalle", "Préférez `setTimeout` récursif pour un rythme régulier"],
          ["`requestAnimationFrame(fn)`", "Animations JS fluides", "Synchronisé au rafraîchissement écran (~60 fps)"],
        ],
      },
      {
        kind: "code",
        language: "js",
        title: "Animation fluide",
        code: `const boite = document.querySelector(".boite");\nlet debut = null;\n\nfunction animer(temps) {\n  debut ??= temps;\n  const progres = Math.min((temps - debut) / 1000, 1); // 1 seconde\n  boite.style.transform = "translateX(" + progres * 300 + "px)";\n  if (progres < 1) requestAnimationFrame(animer);\n}\nrequestAnimationFrame(animer);\n// Note : pour les animations simples, les transitions CSS suffisent\n// (voir css-animations) — rAF est pour la logique sur mesure.`,
      },
    ],
  },
  {
    id: "debouncing",
    title: "Debounce et throttle",
    level: 3,
    intro:
      "Calmer les événements qui se déclenchent trop souvent.",
    blocks: [
      {
        kind: "table",
        headers: ["Technique", "Principe", "Usage"],
        rows: [
          ["Debounce", "N'exécute qu'après X ms d'inactivité", "Recherche en direct, validation, resize"],
          ["Throttle", "Au plus une exécution par X ms", "Scroll, mousemove, jeux"],
        ],
      },
      {
        kind: "code",
        language: "js",
        title: "Debounce maison",
        code: `function debounce(fn, delai) {\n  let minuteur;\n  return (...args) => {\n    clearTimeout(minuteur);\n    minuteur = setTimeout(() => fn(...args), delai);\n  };\n}\n\nconst recherche = debounce((terme) => {\n  // appel réseau ou filtrage coûteux\n}, 300);\n\nchamp.addEventListener("input", (e) => recherche(e.target.value));`,
      },
    ],
  },
  {
    id: "focus-management",
    title: "Gérer le focus",
    level: 3,
    intro:
      "Le focus est une partie du DOM : le piloter, c'est l'accessibilité.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Focus programmatique",
        code: `// Donner le focus\nchamp.focus();\n// Le retirer\nchamp.blur();\n\n// Savoir qui a le focus\ndocument.activeElement;\n\n// Rendre un élément focusable\nelt.tabIndex = 0;   // dans l'ordre naturel de tabulation\nelt.tabIndex = -1;  // focusable en JS, pas au clavier\n\n// À l'ouverture d'une modale : focus sur son premier contrôle,\n// à la fermeture : restaurer le focus sur le bouton d'ouverture.`,
      },
      {
        kind: "text",
        text: "Modales, menus déroulants, notifications : chaque composant dynamique doit gérer le focus (piégeage dans la modale, restauration à la fermeture). Voir `accessibility` pour les patterns complets.",
      },
    ],
  },
  {
    id: "accessible-dom",
    title: "DOM et accessibilité",
    level: 3,
    intro:
      "Les gestes DOM qui rendent (ou cassent) l'accessibilité.",
    blocks: [
      {
        kind: "list",
        items: [
          "Utilisez les bons éléments (`<button>`, pas `<div onclick>`) : le clavier et les lecteurs d'écran suivent gratuitement.",
          "Annoncez les changements dynamiques : `aria-live=\"polite\"` sur les zones de notifications et de résultats.",
          "Ne supprimez jamais le contour de focus sans le remplacer par un style visible.",
          "Formulaires : chaque champ a un `<label>` associé (`for`/`id`) ; les erreurs sont liées via `aria-describedby`.",
          "Contenu chargé dynamiquement : déplacez le focus vers le nouveau contenu pertinent (titres de page en SPA).",
        ],
      },
    ],
  },
  {
    id: "xss-dom",
    title: "XSS : la faille DOM n°1",
    level: 3,
    intro:
      "Comprendre l'injection de scripts pour ne jamais l'introduire.",
    blocks: [
      {
        kind: "text",
        text: "Une faille XSS (Cross-Site Scripting) permet à un attaquant d'exécuter du JavaScript dans la page de vos utilisateurs : vol de session, actions à leur insu. La cause la plus fréquente côté DOM : insérer des données non fiables avec `innerHTML` (ou `document.write`, `eval`).",
      },
      {
        kind: "code",
        language: "js",
        title: "Attaque et défenses",
        code: `// ❌ Vulnérable : le commentaire d'un utilisateur est injecté tel quel\ncommentaires.innerHTML = "<p>" + texteUtilisateur + "</p>";\n// Si texteUtilisateur = '<img src=x onerror="voler(document.cookie)">', le script s'exécute.\n\n// ✅ Défense 1 : textContent pour le texte\nconst p = document.createElement("p");\np.textContent = texteUtilisateur;\n\n// ✅ Défense 2 : si du HTML riche est vraiment nécessaire,\n// assainir avec une librairie dédiée (ex. DOMPurify) — jamais de regex maison.`,
      },
      {
        kind: "list",
        items: [
          "Règle : toute donnée venant de l'utilisateur, de l'URL ou d'une API est non fiable par défaut.",
          "Le `Content-Security-Policy` (en-tête HTTP) ajoute une barrière, mais ne remplace pas l'échappement.",
          "Voir aussi : `javascript:` dans les URLs, `eval()` et `new Function()` avec des données dynamiques.",
        ],
      },
    ],
  },
  {
    id: "forms-validation",
    title: "Validation de formulaires",
    level: 3,
    intro:
      "Au-delà du HTML : validation JS et messages d'erreur.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Validation avec l'API native",
        code: `const email = document.querySelector("#email");\n\nform.addEventListener("submit", (e) => {\n  // checkValidity() utilise required, type, pattern…\n  if (!form.checkValidity()) {\n    e.preventDefault();\n    // Message personnalisé sur un champ\n    email.setCustomValidity("Utilisez votre adresse professionnelle.");\n    form.reportValidity(); // affiche les erreurs nativement\n    return;\n  }\n  email.setCustomValidity(""); // réinitialiser\n});\n\n// Réinitialiser le message dès que l'utilisateur corrige\nemail.addEventListener("input", () => email.setCustomValidity(""));\n\n// Valider un champ individuellement : email.validity.valid,\n// email.validationMessage, email.willValidate…`,
      },
      {
        kind: "text",
        text: "L'API de validation native (`checkValidity`, `setCustomValidity`, `reportValidity`) donne des messages accessibles et localisés gratuitement. La validation JS ne remplace jamais la validation serveur : le client est contournable.",
      },
    ],
  },
  {
    id: "custom-events",
    title: "Événements personnalisés",
    level: 3,
    intro:
      "Faire communiquer des parties de code via le DOM.",
    blocks: [
      {
        kind: "code",
        language: "js",
        title: "Émettre et écouter",
        code: `// Émettre (avec des données dans detail)\nconst event = new CustomEvent("panier:ajout", {\n  detail: { produitId: 42, quantite: 1 },\n  bubbles: true, // remonte comme un événement natif\n});\nbouton.dispatchEvent(event);\n\n// Écouter ailleurs dans l'app\ndocument.addEventListener("panier:ajout", (e) => {\n  console.log(e.detail.produitId); // 42\n  mettreAJourLeCompteur();\n});`,
      },
      {
        kind: "text",
        text: "Les `CustomEvent` découplent les modules : le bouton « ajouter » n'a pas besoin de connaître le compteur du panier. Convention de nommage avec namespace (`domaine:action`) pour éviter les collisions.",
      },
    ],
  },
  {
    id: "shadow-dom-intro",
    title: "Shadow DOM : aperçu",
    level: 3,
    intro:
      "L'encapsulation native du DOM (Web Components).",
    blocks: [
      {
        kind: "text",
        text: "Le Shadow DOM attache à un élément un arbre DOM encapsulé : ses styles et sa structure sont isolés du document principal. C'est le mécanisme derrière les Web Components (`customElements.define`) et derrière des éléments natifs comme `<video>` ou `<input type=\"range\">`.",
      },
      {
        kind: "code",
        language: "js",
        title: "Créer un shadow root",
        code: `const hote = document.querySelector("#mon-composant");\nconst shadow = hote.attachShadow({ mode: "open" });\nshadow.innerHTML = "<style>p { color: red; }</style><p>Isolé !</p>";\n// Le style ne fuit pas vers le reste de la page, et inversement.`,
      },
      {
        kind: "text",
        text: "À connaître pour comprendre les Web Components et déboguer les composants tiers ; à utiliser quand vous créez des composants réellement réutilisables et isolés.",
      },
    ],
  },
  {
    id: "devtools-dom",
    title: "DevTools : niveau avancé",
    level: 3,
    intro:
      "Les outils d'inspection qui font gagner des heures.",
    blocks: [
      {
        kind: "list",
        items: [
          "Breakpoints sur le DOM : clic droit sur un élément → « Interrompre sur » (modification d'attribut, suppression, modification du sous-arbre) — idéal pour trouver quel script modifie un élément.",
          "`monitorEvents($0)` en console : logue tous les événements d'un élément.",
          "`getEventListeners($0)` : liste les écouteurs attachés à un élément.",
          "Onglet Performance : enregistrez une interaction pour voir les reflows et le JS coûteux.",
          "Émulation : capteurs (géolocalisation), mode responsive, limitation réseau/CPU.",
        ],
      },
    ],
  },
  {
    id: "debugging-dom",
    title: "Déboguer le DOM méthodiquement",
    level: 3,
    intro:
      "Une méthode quand « ça ne marche pas ».",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Vérifier la sélection",
            detail:
              "`console.log(monElement)` : est-ce `null` ? Le script s'exécute-t-il après le parsing (`defer`, fin de body, `DOMContentLoaded`) ?",
          },
          {
            title: "Vérifier l'écouteur",
            detail:
              "`getEventListeners($0)` : l'écouteur est-il attaché ? Au bon élément ? Le sélecteur de délégation matche-t-il (`matches`, `closest`) ?",
          },
          {
            title: "Vérifier l'événement",
            detail:
              "`monitorEvents($0)` : l'événement se déclenche-t-il ? Un `preventDefault`/`stopPropagation` en amont le bloque-t-il ?",
          },
          {
            title: "Vérifier la mutation",
            detail:
              "Le DOM est-il modifié comme prévu (onglet Éléments) ? Le CSS n'annule-t-il pas l'effet visuel (`display: none`, spécificité) ?",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-subtiles-dom",
    title: "Erreurs subtiles de niveau avancé",
    level: 3,
    intro:
      "Les pièges qui persistent après des mois de pratique.",
    blocks: [
      {
        kind: "list",
        items: [
          "Écouteurs empilés : le même `addEventListener` appelé à chaque rendu ajoute des gestionnaires en double — nettoyez ou utilisez `{ once: true }`.",
          "Fuite mémoire : écouteurs sur des éléments supprimés sans `removeEventListener` (ou `AbortController`).",
          "Collection vivante modifiée pendant la boucle (`getElementsByClassName` + suppression).",
          "`innerHTML += ...` : re-parse tout le contenu et détruit les écouteurs existants — reconstruisez proprement.",
          "Lire `offsetWidth` dans une boucle d'écriture : reflow forcé synchrone à chaque itération.",
          "`this` dans un écouteur : fonction fléchée (lexical) vs fonction classique (`this` = `currentTarget`).",
        ],
      },
    ],
  },
  {
    id: "projet-galerie-dom",
    title: "Projet : galerie interactive",
    level: 3,
    intro:
      "Le projet de synthèse DOM : données → interface.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Données et template",
            detail:
              "Un tableau d'objets (titre, image, catégorie) + un `<template>` de carte. Rendu via `cloneNode` + `DocumentFragment`.",
          },
          {
            title: "Filtres",
            detail:
              "Boutons de catégories avec `data-categorie`, délégation sur le conteneur, re-rendu filtré.",
          },
          {
            title: "Lightbox",
            detail:
              "Clic sur une image : modale avec grande image, gestion du focus, fermeture à Échap et au clic extérieur.",
          },
          {
            title: "Polish",
            detail:
              "Lazy loading (`IntersectionObserver`), `textContent` partout pour les données, états de chargement.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-spa-mini",
    title: "Projet : mini-SPA",
    level: 3,
    intro:
      "Navigation sans rechargement, routage au hash.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Routage",
            detail:
              "Écouter `hashchange` : `#/accueil`, `#/apropos` → afficher la section correspondante, masquer les autres.",
          },
          {
            title: "Rendus",
            detail:
              "Fonctions de rendu par page (template + données), titre du document mis à jour (`document.title`).",
          },
          {
            title: "Accessibilité",
            detail:
              "Focus déplacé sur le titre de la nouvelle page, `aria-current` sur le lien actif.",
          },
          {
            title: "Bilan",
            detail:
              "Vous avez recréé (en simple) ce que font les routeurs des frameworks — et compris leur valeur.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources-dom",
    title: "Ressources",
    level: 3,
    intro: "Aller plus loin, en commençant toujours par les sources officielles.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          { label: "MDN — DOM", value: "developer.mozilla.org/fr/docs/Web/API/Document_Object_Model : le guide et la référence complète des interfaces." },
          { label: "DOM Standard — WHATWG", value: "dom.spec.whatwg.org : la spécification vivante du DOM." },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les exercices DOM de javascript.info (section « Document »), progressifs et rigoureux.",
          "Sécurité : le guide XSS de l'OWASP (owasp.org/www-community/attacks/xss) pour aller plus loin.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite-dom",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Le DOM maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Asynchrone : `async-js` (promesses, async/await) puis `fetch-api` pour les données réseau.",
          "Modulariser : `js-modules` pour organiser le code en modules.",
          "Passer aux frameworks : `react` (qui abstrait le DOM via le virtual DOM).",
          "Sécuriser : `accessibility` (focus, ARIA, formulaires accessibles).",
          "Revenir à la roadmap : valider DOM et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de JavaScript asynchrone : event loop, promesses,
 * async/await et orchestration de la concurrence. De la compréhension du
 * modèle aux patterns professionnels (retry, timeout, debounce). Tous les
 * textes supportent le code inline entre backticks.
 */
export const LEARNING_ASYNC_JS: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre pourquoi JavaScript est asynchrone et ce que cela change dans l'écriture du code.",
    blocks: [
      {
        kind: "text",
        text: "JavaScript n'exécute qu'une seule chose à la fois (il est mono-thread), mais il ne bloque jamais en attendant : quand une opération prend du temps (réseau, fichier, minuteur), le programme la lance, continue à faire autre chose, et est prévenu quand le résultat arrive. C'est le modèle asynchrone : ne jamais figer l'interface ou le serveur en attendant.",
      },
      {
        kind: "text",
        text: "Trois générations d'outils expriment ce modèle : les callbacks (fonctions passées en argument, exécutées plus tard), les promesses (objets représentant une valeur future), et `async`/`await` (écrire du code asynchrone comme s'il était synchrone). Les promesses et `async`/`await` sont le standard moderne ; les callbacks restent partout en héritage.",
      },
      {
        kind: "text",
        text: "Mal comprendre l'asynchrone, c'est des bugs subtils : données utilisées avant leur arrivée, erreurs silencieuses, interfaces figées. Bien le maîtriser, c'est écrire du code fluide et prévisible — et c'est indispensable dès qu'on touche au réseau, aux fichiers ou aux timers, donc à presque tout.",
      },
    ],
  },
  {
    id: "event-loop-30s",
    title: "L'event loop en 30 secondes",
    level: 1,
    intro:
      "Le mécanisme central : une boucle qui exécute les tâches une par une.",
    blocks: [
      {
        kind: "diagram",
        title: "Le cycle de l'event loop",
        lines: [
          "Votre code s'exécute (call stack)",
          "     │",
          "     ▼",
          "Opération lente ? (réseau, timer, fichier)",
          "     │ oui",
          "     ▼",
          "L'opération part en tâche de fond",
          "Le programme CONTINUE sans attendre",
          "     │",
          "     ▼",
          "Résultat prêt → placé en file d'attente",
          "     │",
          "     ▼",
          "L'event loop le reprend quand la pile est vide",
          "     │",
          "     ▼",
          "Votre callback / .then() / suite du await s'exécute",
        ],
      },
      {
        kind: "text",
        text: "Retenez l'image : JavaScript ne fait jamais deux choses à la fois, mais il ne perd jamais de temps à attendre. Tout le reste de ce guide détaille comment écrire du code correct dans ce modèle.",
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
      "L'asynchrone s'appuie sur des bases JavaScript précises. Voici lesquelles.",
    blocks: [
      {
        kind: "fields",
        title: "JavaScript — ce qu'il faut maîtriser",
        fields: [
          {
            label: "Fonctions",
            value:
              "Déclaration, expressions, fonctions fléchées, portée. Les callbacks et les `.then()` sont des fonctions : sans elles, rien n'est compréhensible.",
          },
          {
            label: "Objets et tableaux",
            value:
              "Les résultats asynchrones sont presque toujours des objets ou des tableaux (JSON d'API, listes de fichiers). Savoir les manipuler (`map`, `filter`, déstructuration).",
          },
          {
            label: "Gestion d'erreurs synchrone",
            value:
              "`try`/`catch` classique : `async`/`await` réutilise exactement cette syntaxe pour les erreurs asynchrones.",
          },
          {
            label: "Modules (`import` / `export`)",
            value:
              "Utile pour organiser les exemples en fichiers, et pour le top-level `await` du niveau 3.",
          },
        ],
      },
    ],
  },
  {
    id: "environnement-node",
    title: "Préparer l'environnement",
    level: 2,
    intro:
      "Un terminal et Node.js suffisent pour tous les exemples de ce guide.",
    blocks: [
      {
        kind: "command",
        label: "Vérifier la version de Node.js",
        command: "node --version",
        why: "Affiche la version installée. Les exemples utilisent `fetch` global et `AbortSignal.timeout`, disponibles depuis Node 18 : il faut au moins cette version.",
        verify: "node --version",
      },
      {
        kind: "command",
        label: "Exécuter un script JavaScript",
        command: "node demo.js",
        why: "Lance le fichier `demo.js` avec Node.js. Tous les exemples de ce guide s'exécutent ainsi, sans navigateur ni outil supplémentaire. Créez le fichier avec votre éditeur, collez l'exemple, lancez la commande.",
        verify: "node -e \"console.log('Node fonctionne')\"",
      },
      {
        kind: "text",
        text: "Astuce : `node -e \"...\"` exécute directement une ligne de code sans créer de fichier — pratique pour tester une idée en dix secondes.",
      },
    ],
  },
  {
    id: "callbacks",
    title: "Les callbacks : la première génération",
    level: 2,
    intro:
      "Comprendre les callbacks, parce qu'on en croise encore partout.",
    blocks: [
      {
        kind: "text",
        text: "Un callback est une fonction passée en argument à une autre fonction, qui l'exécutera « plus tard », quand l'opération se termine. C'était la façon historique de faire de l'asynchrone en JavaScript. Le problème : enchaîner plusieurs opérations imbrique les callbacks les uns dans les autres — le fameux « callback hell », illisible et fragile pour les erreurs.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Callback et callback hell",
        code: `// Un callback simple : exécuté après 1 seconde\nsetTimeout(() => {\n  console.log("Une seconde plus tard");\n}, 1000);\n\n// Le callback hell : trois opérations enchaînées\nlireFichier("a.txt", (contenuA) => {\n  lireFichier("b.txt", (contenuB) => {\n    lireFichier("c.txt", (contenuC) => {\n      console.log(contenuA, contenuB, contenuC);\n    });\n  });\n});`,
      },
      {
        kind: "text",
        text: "On n'écrit plus de code neuf ainsi : les promesses ont été inventées précisément pour aplatir ces pyramides. Mais il faut savoir lire ce style, car les anciennes bibliothèques et beaucoup de tutoriels l'utilisent encore.",
      },
    ],
  },
  {
    id: "promesses-bases",
    title: "Les promesses : les bases",
    level: 2,
    intro:
      "L'objet central de l'asynchrone moderne : une valeur qui n'est pas encore arrivée.",
    blocks: [
      {
        kind: "text",
        text: "Une promesse (`Promise`) représente une valeur future. Elle est dans l'un des trois états : `pending` (en attente), `fulfilled` (tenue : le résultat est arrivé) ou `rejected` (rompue : une erreur s'est produite). On attache la suite avec `.then()` (résultat) et `.catch()` (erreur).",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Créer et consommer une promesse",
        code: `// Une promesse qui se résout après 1 seconde\nconst promesse = new Promise((resolve, reject) => {\n  setTimeout(() => {\n    const ok = true;\n    if (ok) resolve("Données arrivées !");\n    else reject(new Error("Échec"));\n  }, 1000);\n});\n\n// Consommer : .then() pour le succès, .catch() pour l'erreur\npromesse\n  .then((donnees) => console.log(donnees))\n  .catch((erreur) => console.error(erreur.message));`,
      },
      {
        kind: "list",
        items: [
          "`new Promise((resolve, reject) => ...)` : l'exécuteur démarre l'opération ; `resolve(valeur)` la tient, `reject(erreur)` la rompt.",
          "`.then()` retourne lui-même une promesse : on peut chaîner au lieu d'imbriquer.",
          "Toujours terminer par `.catch()` : une promesse rejetée sans gestion provoque une erreur `unhandledrejection`.",
        ],
      },
    ],
  },
  {
    id: "async-await",
    title: "async/await : l'écriture moderne",
    level: 2,
    intro:
      "La syntaxe à utiliser au quotidien : l'asynchrone qui se lit comme du synchrone.",
    blocks: [
      {
        kind: "text",
        text: "Une fonction déclarée `async` peut utiliser `await` devant une promesse : l'exécution se suspend jusqu'au résultat, puis reprend — sans bloquer le reste du programme. Le code se lit de haut en bas, comme du code synchrone. C'est la forme à privilégier pour tout code neuf.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Le même enchaînement, en async/await",
        code: `function attendre(ms) {\n  return new Promise((resolve) => setTimeout(resolve, ms));\n}\n\nasync function principal() {\n  console.log("Début");\n  await attendre(1000);      // pause d'1 s, sans bloquer\n  console.log("Une seconde plus tard");\n  await attendre(1000);\n  console.log("Deux secondes plus tard");\n}\n\nprincipal();`,
      },
      {
        kind: "list",
        items: [
          "`await` ne fonctionne que dans une fonction `async` (ou au top-level d'un module — niveau 3).",
          "Une fonction `async` retourne toujours une promesse, même si elle retourne une valeur simple.",
          "`await` sur une valeur non-promesse la retourne telle quelle : aucun piège, mais aucun intérêt.",
        ],
      },
    ],
  },
  {
    id: "try-catch-async",
    title: "Gérer les erreurs avec try/catch",
    level: 2,
    intro:
      "Avec async/await, les erreurs asynchrones se capturent comme les erreurs synchrones.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "try/catch autour d'un await",
        code: `async function chargerProfil(id) {\n  try {\n    const reponse = await fetch("https://api.github.com/users/" + id);\n    if (!reponse.ok) {\n      throw new Error("HTTP " + reponse.status);\n    }\n    const profil = await reponse.json();\n    console.log(profil.name);\n  } catch (erreur) {\n    console.error("Chargement impossible :", erreur.message);\n  }\n}\n\nchargerProfil("octocat");`,
      },
      {
        kind: "list",
        items: [
          "`await` sur une promesse rejetée lève une exception : `try`/`catch` l'intercepte exactement comme en synchrone.",
          "Les erreurs HTTP (404, 500) ne rejettent pas `fetch` : il faut tester `reponse.ok` et lever soi-même (voir la compétence `fetch-api`).",
          "En version `.then()`, l'équivalent est `.catch()` en fin de chaîne.",
        ],
      },
    ],
  },
  {
    id: "chainage-promesses",
    title: "Chaîner les promesses",
    level: 2,
    intro:
      "Enchaîner des opérations dépendantes sans retomber dans la pyramide.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Chaîne .then() vs async/await",
        code: `// Version .then() : chaque then retourne une promesse\nfetch("https://api.github.com/users/octocat")\n  .then((r) => r.json())\n  .then((profil) => fetch(profil.repos_url))\n  .then((r) => r.json())\n  .then((depots) => console.log(depots.length + " dépôts"))\n  .catch((e) => console.error(e.message));\n\n// Version async/await : équivalent, plus lisible\nasync function compterDepots(pseudo) {\n  const profil = await (await fetch("https://api.github.com/users/" + pseudo)).json();\n  const depots = await (await fetch(profil.repos_url)).json();\n  console.log(depots.length + " dépôts");\n}`,
      },
      {
        kind: "text",
        text: "Règle d'or du chaînage : toujours `return` la promesse dans un `.then()` si la suite en dépend. Oublier le `return` est l'erreur la plus fréquente : la suite reçoit `undefined` au lieu du résultat.",
      },
    ],
  },
  {
    id: "timers",
    title: "Timers : setTimeout et setInterval",
    level: 2,
    intro:
      "Les deux minuteurs natifs, leurs promesses équivalentes et leurs pièges.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Les timers en pratique",
        code: `// Une seule fois après un délai\nconst id = setTimeout(() => console.log("une fois"), 2000);\nclearTimeout(id); // annule avant exécution\n\n// Répété à intervalle régulier\nconst ticker = setInterval(() => console.log("tic"), 1000);\nclearInterval(ticker); // arrête la répétition\n\n// Version promesse, awaitable\nconst attendre = (ms) => new Promise((r) => setTimeout(r, ms));\nawait attendre(500); // pause de 500 ms dans une fonction async`,
      },
      {
        kind: "list",
        items: [
          "Les délais sont en millisecondes et approximatifs : le callback s'exécute au plus tôt après le délai, quand l'event loop est libre.",
          "`setInterval` peut chevaucher les exécutions si le traitement dépasse l'intervalle : préférez un `setTimeout` réarmé pour les tâches régulières fragiles.",
          "Toujours nettoyer (`clearTimeout`/`clearInterval`) quand le timer ne sert plus, sous peine de fuites.",
        ],
      },
    ],
  },
  {
    id: "premier-script",
    title: "Premier script : tout assembler",
    level: 2,
    intro:
      "Un script complet qui combine timers, promesses et async/await.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Créer le fichier",
            detail:
              "Créez `demo.js` dans un dossier de travail. Tout le code tient dans un seul fichier pour ce premier script.",
          },
          {
            title: "Écrire une fonction d'attente",
            detail:
              "`const attendre = (ms) => new Promise((r) => setTimeout(r, ms));` : la brique de base, une promesse qui se résout après un délai.",
          },
          {
            title: "Écrire la fonction principale async",
            detail:
              "Une fonction `async function main()` qui `await` plusieurs attentes en séquence, avec des `console.log` entre elles pour visualiser l'ordre d'exécution.",
          },
          {
            title: "Ajouter la gestion d'erreur",
            detail:
              "Enveloppez le corps de `main` dans `try`/`catch` : toute promesse rejetée sera capturée au même endroit.",
          },
          {
            title: "Lancer et observer",
            detail:
              "Commande `node demo.js`. Observez que le programme ne se fige pas : pendant les `await`, l'event loop reste disponible.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "demo.js",
        code: `const attendre = (ms) => new Promise((r) => setTimeout(r, ms));\n\nasync function main() {\n  try {\n    console.log("Début du script");\n    await attendre(800);\n    console.log("Étape 1 terminée");\n    await attendre(800);\n    console.log("Étape 2 terminée");\n  } catch (erreur) {\n    console.error("Erreur :", erreur.message);\n  }\n}\n\nmain();`,
      },
    ],
  },
  {
    id: "debugger-console",
    title: "Déboguer le code asynchrone",
    level: 2,
    intro:
      "Les outils de base pour voir ce qui se passe vraiment.",
    blocks: [
      {
        kind: "list",
        items: [
          "`console.log` horodaté : `console.log(new Date().toISOString(), \"étape\")` pour visualiser l'ordre réel d'exécution.",
          "Marquer les promesses : logguez avant chaque `await` et après, avec un libellé distinct — on repère immédiatement celle qui ne se résout jamais.",
          "DevTools / VS Code : les points d'arrêt fonctionnent dans le code async ; la pile d'appels affiche la chaîne des `await` (async stack traces).",
          "`node --inspect demo.js` : ouvre le débogueur Chrome sur un script Node pour inspecter pas à pas.",
          "Erreur `UnhandledPromiseRejection` : cherchez la promesse sans `.catch()` ni `try`/`catch` autour de son `await`.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Les erreurs les plus courantes",
    level: 2,
    intro:
      "Les pièges que tous les débutants rencontrent — et comment les éviter.",
    blocks: [
      {
        kind: "list",
        items: [
          "Oublier `await` : on manipule une promesse au lieu du résultat (`[object Promise]` dans les logs).",
          "Oublier `return` dans un `.then()` : la suite de la chaîne reçoit `undefined`.",
          "`await` hors d'une fonction `async` : erreur de syntaxe (sauf top-level d'un module).",
          "`.catch()` oublié en fin de chaîne : rejet non géré, erreur silencieuse ou crash.",
          "`forEach` avec un callback `async` : les itérations ne sont pas attendues — la boucle « se termine » avant les traitements.",
          "Mélanger callbacks et promesses sans wrapper : enveloppez les API à callbacks dans `new Promise` pour les uniformiser.",
          "Croire que `await` bloque le programme : il suspend seulement la fonction, le reste continue.",
        ],
      },
    ],
  },
  {
    id: "projet-file-taches",
    title: "Projet : file de tâches séquentielles",
    level: 2,
    intro:
      "Exécuter une liste de tâches l'une après l'autre avec une barre de progression.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Définir les tâches",
            detail:
              "Un tableau d'objets `{ nom, duree }` : chaque tâche simule un travail par `attendre(duree)`. En réel, ce serait des appels réseau ou des lectures de fichiers.",
          },
          {
            title: "Boucler avec for...of et await",
            detail:
              "`for (const tache of taches) { await executer(tache); }` : la boucle attend chaque tâche avant de passer à la suivante. C'est le pattern de la file séquentielle.",
          },
          {
            title: "Afficher la progression",
            detail:
              "Après chaque tâche, logguez `X/Y tâches terminées`. Gérez l'erreur d'une tâche en `try`/`catch` local pour décider : arrêter tout ou continuer.",
          },
          {
            title: "Tester les deux politiques d'erreur",
            detail:
              "Variante 1 : une tâche qui échoue arrête la file. Variante 2 : on loggue l'échec et on continue. Les deux sont utiles selon le contexte.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "File séquentielle avec progression",
        code: `const attendre = (ms) => new Promise((r) => setTimeout(r, ms));\n\nconst taches = [\n  { nom: "Télécharger", duree: 600 },\n  { nom: "Convertir", duree: 900 },\n  { nom: "Envoyer", duree: 400 },\n];\n\nasync function executerFile() {\n  for (let i = 0; i < taches.length; i++) {\n    const t = taches[i];\n    await attendre(t.duree); // la tâche elle-même\n    console.log("[" + (i + 1) + "/" + taches.length + "] " + t.nom + " OK");\n  }\n  console.log("File terminée");\n}\n\nexecuterFile();`,
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "event-loop-detail",
    title: "L'event loop en détail",
    level: 3,
    intro:
      "Ce qui se passe vraiment quand JavaScript « attend » : pile, files et boucle.",
    blocks: [
      {
        kind: "diagram",
        title: "Les trois acteurs",
        lines: [
          "┌─────────────┐",
          "│  Call stack │  ← le code s'exécute ici, un appel à la fois",
          "└──────┬──────┘",
          "       │ pile vide ?",
          "       ▼",
          "┌─────────────┐",
          "│ Microtasks  │  ← promesses résolues (.then, await) : PRIORITAIRES",
          "└──────┬──────┘",
          "       │ file vide ?",
          "       ▼",
          "┌─────────────┐",
          "│ Macrotasks  │  ← setTimeout, setInterval, I/O, rendu",
          "└─────────────┘",
          "       │",
          "       ▼",
          "  L'event loop recommence : stack → microtasks → UNE macrotask → …",
        ],
      },
      {
        kind: "text",
        text: "Le point crucial : quand la pile se vide, l'event loop vide d'abord entièrement la file des microtâches (callbacks de promesses) avant de prendre une seule macrotâche (timer, I/O). Conséquence : une promesse résolue s'exécute toujours avant un `setTimeout(..., 0)`, même si le timer a été programmé avant.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Ordre d'exécution réel",
        code: `console.log("1. synchrone");\n\nsetTimeout(() => console.log("2. macrotask (timer)"), 0);\n\nPromise.resolve().then(() => console.log("3. microtask (promesse)"));\n\nconsole.log("4. synchrone");\n\n// Affiche : 1, 4, 3, 2\n// Les microtâches passent avant les timers, même à 0 ms.`,
      },
    ],
  },
  {
    id: "microtasks-macrotasks",
    title: "Microtâches vs macrotâches",
    level: 3,
    intro:
      "Deux files, deux priorités : comprendre la différence évite des surprises d'ordonnancement.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Microtâches", "Macrotâches"],
        rows: [
          ["Exemples", "`.then()`, `await`, `queueMicrotask()`", "`setTimeout`, `setInterval`, I/O, événements UI"],
          ["Priorité", "Vidées entièrement avant chaque macrotâche", "Une seule par tour de boucle"],
          ["Risque", "Une chaîne infinie de microtâches affame les timers et le rendu", "Délai minimum ~4 ms après imbrications (navigateurs)"],
          ["Usage typique", "Continuations de promesses", "Travail différé, polling, animations basiques"],
        ],
      },
      {
        kind: "text",
        text: "En pratique : ne créez jamais une boucle qui enchaîne des microtâches sans fin (ex. `then` qui se ré-enregistre) — l'interface gèlerait car le rendu est une macrotâche qui n'arriverait jamais. Pour du travail découpé en morceaux, alternez avec des macrotâches (`setTimeout(..., 0)` ou `requestAnimationFrame` côté UI).",
      },
    ],
  },
  {
    id: "call-stack",
    title: "La call stack",
    level: 3,
    intro:
      "La pile d'exécution : pourquoi « bloquer » fige tout.",
    blocks: [
      {
        kind: "text",
        text: "La call stack est la pile des appels de fonctions en cours. JavaScript dépile au fur et à mesure ; tant qu'une fonction tourne (boucle `while` infinie, calcul lourd synchrone), rien d'autre ne s'exécute : ni les callbacks de timers, ni les `.then()`, ni le rendu de l'interface. C'est pour cela qu'on déporte les calculs lourds (Web Workers) et qu'on découpe le travail.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Bloquant vs non bloquant",
        code: `// BLOQUANT : fige tout pendant 3 secondes\nconst fin = Date.now() + 3000;\nwhile (Date.now() < fin) {} // ne jamais faire ça !\nconsole.log("3 s perdues, interface figée");\n\n// NON BLOQUANT : le programme reste disponible\nawait new Promise((r) => setTimeout(r, 3000));\nconsole.log("3 s écoulées, rien n'a été figé");`,
      },
    ],
  },
  {
    id: "promesses-etats",
    title: "Les trois états d'une promesse",
    level: 3,
    intro:
      "Pending, fulfilled, rejected : un cycle de vie à sens unique.",
    blocks: [
      {
        kind: "diagram",
        title: "Cycle de vie d'une promesse",
        lines: [
          "         ┌───────────┐",
          "         │  pending  │  ← état initial",
          "         └─────┬─────┘",
          "       resolve │ │ reject",
          "             ▼ ▼",
          "   ┌──────────┐ ┌──────────┐",
          "   │fulfilled │ │ rejected │  ← états finaux, irréversibles",
          "   └──────────┘ └──────────┘",
          "   (valeur)      (raison d'erreur)",
          "",
          "Une promesse ne change d'état qu'une fois.",
          "Les .then() ajoutés après coup reçoivent quand même le résultat.",
        ],
      },
      {
        kind: "text",
        text: "Une promesse naît `pending`, puis devient définitivement `fulfilled` (avec une valeur) ou `rejected` (avec une erreur) : on dit qu'elle est alors « settled ».",
      },
      {
        kind: "text",
        text: "Modéliser explicitement l'attente permet de composer les opérations (chaîner, paralléliser, gérer les erreurs) au lieu d'imbriquer des callbacks.",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [          {
            label: "Erreur fréquente",
            value:
              "Croire qu'une promesse « s'annule » : une fois lancée, l'opération sous-jacente continue même si on ignore la promesse. L'annulation passe par `AbortController` (voir niveau fetch-api).",
          },
          {
            label: "Bonne pratique",
            value:
              "Ne créez des promesses manuellement (`new Promise`) que pour envelopper des API à callbacks ; les API modernes retournent déjà des promesses.",
          },
        ],
      },
    ],
  },
  {
    id: "promise-executor",
    title: "L'exécuteur d'une promesse",
    level: 3,
    intro:
      "Anatomie du `new Promise((resolve, reject) => ...)` et ses pièges.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Envelopper une API à callbacks",
        code: `// Transformer une API à callback en promesse\nfunction lireFichierPromesse(chemin) {\n  return new Promise((resolve, reject) => {\n    lireFichier(chemin, (erreur, contenu) => {\n      if (erreur) reject(erreur);  // rompt la promesse\n      else resolve(contenu);       // tient la promesse\n    });\n  });\n}\n\n// Utilisable avec await\nconst contenu = await lireFichierPromesse("notes.txt");`,
      },
      {
        kind: "list",
        items: [
          "L'exécuteur s'exécute immédiatement et synchronement à la création de la promesse.",
          "Appeler `resolve` puis `reject` (ou deux fois `resolve`) : seul le premier appel compte, les suivants sont ignorés.",
          "Une exception levée dans l'exécuteur rejette automatiquement la promesse — pas besoin de try/catch interne.",
          "Anti-pattern : envelopper une fonction qui retourne déjà une promesse dans `new Promise` (le « promise constructor antipattern »).",
        ],
      },
    ],
  },
  {
    id: "then-catch-finally",
    title: "then, catch, finally en profondeur",
    level: 3,
    intro:
      "La sémantique exacte du chaînage : valeurs, erreurs et nettoyages.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Sémantique du chaînage",
        code: `fetch("/api/data")\n  .then((r) => r.json())          // retourne une promesse → attendue\n  .then((data) => data.items)     // retourne une valeur → enveloppée\n  .then((items) => {\n    if (!items.length) throw new Error("Vide"); // lève → rejette la suite\n  })\n  .catch((e) => console.error("Erreur :", e.message)) // attrape tout le dessus\n  .finally(() => console.log("Nettoyage")); // toujours exécuté\n\n// .finally() ne reçoit aucun argument et ne modifie pas la valeur qui transite.`,
      },
      {
        kind: "list",
        items: [
          "`.then(onSucces)` : si `onSucces` retourne une promesse, la chaîne attend sa résolution (aplatissement automatique).",
          "`.catch()` intercepte les rejets de tout ce qui le précède dans la chaîne, y compris les `throw` des `.then()`.",
          "Après un `.catch()` qui ne relève pas, la chaîne repart en succès : pour propager, faites `throw` dans le catch.",
          "`.finally()` : idéal pour masquer un spinner ou fermer une ressource, qu'il y ait eu succès ou échec.",
        ],
      },
    ],
  },
  {
    id: "async-fonctions-detail",
    title: "Les fonctions async en détail",
    level: 3,
    intro:
      "Ce que `async` change vraiment à une fonction — et ce qu'il ne change pas.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Toujours une promesse en retour",
        code: `async function f1() { return 42; }\nasync function f2() { throw new Error("boom"); }\n\nf1(); // Promise<42>, pas 42 !\nf1().then((v) => console.log(v)); // 42\n\nf2(); // Promise rejetée → à catcher, sinon unhandledrejection\nf2().catch((e) => console.error(e.message));\n\n// await déballe : dans une fonction async, await f1() vaut 42.`,
      },
      {
        kind: "list",
        items: [
          "`async` ne rend pas une fonction asynchrone par magie : son corps s'exécute de façon synchrone jusqu'au premier `await`.",
          "Oublier d'`await` l'appel d'une fonction async est une source classique de bugs : l'erreur éventuelle devient un rejet non géré.",
          "Les fonctions async sont composables : une fonction async peut `await` une autre fonction async naturellement.",
          "Équivalents : méthodes `async`, fonctions fléchées `async () =>`, mais pas de constructeurs ni de getters async.",
        ],
      },
    ],
  },
  {
    id: "sequentiel-vs-parallele",
    title: "Séquentiel ou parallèle : le bon choix",
    level: 3,
    intro:
      "Le choix qui change tout en performance : attendre l'un après l'autre, ou lancer ensemble.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "3 requêtes de 1 s : 3 s ou 1 s ?",
        code: `// SÉQUENTIEL : 3 secondes (1 + 1 + 1)\nconst a = await charger("/api/a");\nconst b = await charger("/api/b"); // attend a\nconst c = await charger("/api/c"); // attend b\n\n// PARALLÈLE : ~1 seconde (le plus lent des trois)\nconst [pa, pb, pc] = await Promise.all([\n  charger("/api/a"),\n  charger("/api/b"),\n  charger("/api/c"),\n]);\n// Les trois promesses sont CRÉÉES avant le await : elles tournent ensemble.`,
      },
      {
        kind: "table",
        headers: ["", "Séquentiel (`await` en série)", "Parallèle (`Promise.all`)"],
        rows: [
          ["Durée totale", "Somme des durées", "Durée de la plus lente"],
          ["Quand l'utiliser", "Les opérations dépendent les unes des autres", "Les opérations sont indépendantes"],
          ["Charge serveur", "Douce, étalée", "Pic simultané — à doser"],
          ["Erreur", "S'arrête à la première erreur (try/catch)", "Tout échoue si une seule échoue (sauf allSettled)"],
        ],
      },
    ],
  },
  {
    id: "promise-all",
    title: "Promise.all",
    level: 3,
    intro:
      "Le combinateur le plus utilisé : tout lancer, tout attendre.",
    blocks: [
      {
        kind: "text",
        text: "`Promise.all([p1, p2, ...])` retourne une promesse qui se résout avec le tableau des résultats quand toutes les promesses ont réussi, ou rejette dès que l'une d'elles échoue.",
      },
      {
        kind: "text",
        text: "Charger plusieurs ressources indépendantes (profil + dépôts + organisations) en une fois au lieu de les enchaîner : c'est le gain de performance le plus simple de l'asynchrone.",
      },
      {
        kind: "text",
        text: "Opérations indépendantes dont on a besoin de tous les résultats pour continuer (rendu d'un dashboard, initialisation d'une page).",
      },
      {
        kind: "fields",
        title: "Fiche concept",
        fields: [
          {
            label: "Comment ça fonctionne",
            value:
              "L'ordre des résultats suit l'ordre du tableau d'entrée, pas l'ordre d'arrivée. Les valeurs non-promesses sont acceptées et retournées telles quelles.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Oublier que le premier rejet fait rejeter tout le `all` : les autres opérations continuent en tâche de fond mais leurs résultats sont perdus. Pour une tolérance aux pannes, voir `allSettled`.",
          },
          {
            label: "Bonne pratique",
            value:
              "Limiter la concurrence quand il y a beaucoup d'éléments (voir la section file à concurrence limitée) pour ne pas saturer le serveur ou la mémoire.",
          },
        ],
      },
    ],
  },
  {
    id: "promise-allsettled",
    title: "Promise.allSettled",
    level: 3,
    intro:
      "Quand on veut tous les résultats, succès comme échecs.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Résultats détaillés par promesse",
        code: `const resultats = await Promise.allSettled([\n  charger("/api/a"),\n  charger("/api/b"), // échoue\n  charger("/api/c"),\n]);\n\n// [\n//   { status: "fulfilled", value: {...} },\n//   { status: "rejected", reason: Error },\n//   { status: "fulfilled", value: {...} }\n// ]\n\nconst reussis = resultats\n  .filter((r) => r.status === "fulfilled")\n  .map((r) => r.value);\nconst echecs = resultats.filter((r) => r.status === "rejected");\nconsole.log(reussis.length + " OK, " + echecs.length + " en échec");`,
      },
      {
        kind: "text",
        text: "Cas typiques : tableau de bord qui affiche ce qui a chargé et signale ce qui a échoué, import en masse où chaque ligne est indépendante, health-check de plusieurs services. `allSettled` ne rejette jamais (sauf erreur de programmation) : c'est l'outil de la tolérance aux pannes.",
      },
    ],
  },
  {
    id: "promise-race-any",
    title: "Promise.race et Promise.any",
    level: 3,
    intro:
      "Deux combinateurs de « premier arrivé » aux sémantiques opposées.",
    blocks: [
      {
        kind: "table",
        headers: ["", "`Promise.race`", "`Promise.any`"],
        rows: [
          ["Se résout quand", "La PREMIÈRE promesse se termine (succès ou échec)", "La PREMIÈRE promesse RÉUSSIT"],
          ["Rejette quand", "La première terminée a échoué", "TOUTES ont échoué (AggregateError)"],
          ["Usage typique", "Timeout : course entre l'opération et un minuteur", "Redondance : premier miroir qui répond gagne"],
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Timeout avec race, redondance avec any",
        code: `// TIMEOUT : l'opération ou 5 s, le premier qui finit gagne\nconst avecTimeout = (promesse, ms) =>\n  Promise.race([\n    promesse,\n    new Promise((_, reject) =>\n      setTimeout(() => reject(new Error("Timeout après " + ms + " ms")), ms)\n    ),\n  ]);\n\n// REDONDANCE : interroge 3 miroirs, garde le premier succès\nconst reponse = await Promise.any([\n  fetch("https://miroir1.example/data"),\n  fetch("https://miroir2.example/data"),\n  fetch("https://miroir3.example/data"),\n]);`,
      },
      {
        kind: "text",
        text: "Attention avec `race` pour les timeouts : la promesse perdante continue en tâche de fond (pas d'annulation automatique). Pour une vraie annulation, combinez avec `AbortController` (voir la compétence `fetch-api`).",
      },
    ],
  },
  {
    id: "combinateurs-recap",
    title: "Récapitulatif des combinateurs",
    level: 3,
    intro:
      "Choisir le bon combinateur en un coup d'œil.",
    blocks: [
      {
        kind: "table",
        headers: ["Combinateur", "Attend", "Résultat", "Échec"],
        rows: [
          ["`Promise.all`", "Toutes", "Tableau des valeurs (ordre d'entrée)", "Rejette au premier échec"],
          ["`Promise.allSettled`", "Toutes", "Tableau de `{status, value|reason}`", "Ne rejette jamais"],
          ["`Promise.race`", "La première terminée", "Sa valeur ou son erreur", "Si la première échoue"],
          ["`Promise.any`", "Le premier succès", "Sa valeur", "`AggregateError` si toutes échouent"],
        ],
      },
    ],
  },
  {
    id: "propagation-erreurs",
    title: "Propagation des erreurs",
    level: 3,
    intro:
      "Comment une erreur traverse les couches async — et où l'intercepter.",
    blocks: [
      {
        kind: "text",
        text: "Une erreur dans une chaîne async remonte jusqu'au premier `catch` rencontré : `.catch()` en version promesses, `try`/`catch` en version `await`. Stratégie saine : laissez propager (ne catchez pas à chaque étage), et traitez au niveau où vous savez quoi faire (réessayer ? afficher ? abandonner ?). Catcher trop tôt pour « faire taire » l'erreur est une source de bugs silencieux.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Laisser propager, traiter au bon niveau",
        code: `async function chargerDonnees() {\n  const r = await fetch("/api/data"); // peut lever\n  if (!r.ok) throw new Error("HTTP " + r.status);\n  return r.json(); // pas de try/catch ici : on laisse remonter\n}\n\nasync function afficher() {\n  try {\n    const data = await chargerDonnees();\n    rendre(data);\n  } catch (e) {\n    // Un seul endroit : ici on sait afficher l'erreur à l'utilisateur\n    afficherErreur("Données indisponibles : " + e.message);\n  }\n}`,
      },
    ],
  },
  {
    id: "unhandled-rejection",
    title: "Les rejets non gérés",
    level: 3,
    intro:
      "Ce qui arrive quand personne n'écoute l'échec d'une promesse.",
    blocks: [
      {
        kind: "list",
        items: [
          "Une promesse rejetée sans `.catch()` ni `try`/`catch` déclenche l'événement `unhandledrejection` (navigateur) ou fait crasher le processus (Node.js récent).",
          "Piège classique : créer la promesse maintenant et l'`await` plus tard — si elle rejette entre-temps sans gestion attachée, c'est un rejet non géré.",
          "En Node.js, écoutez `process.on(\"unhandledRejection\")` en dernier recours pour logguer avant le crash — mais corrigez la cause, pas le symptôme.",
          "Règle : chaque promesse créée doit avoir un destin explicite — `await` dans un try, `.catch()`, `Promise.allSettled`, ou `void` documenté.",
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Le piège de l'await différé",
        code: `// DANGEREUX : si p rejette avant l'await, rejet non géré\nconst p = operationRisquee();\nfaireAutreChose();\nawait p; // trop tard si le rejet est déjà survenu sans gestion\n\n// SÛR : attacher la gestion immédiatement\nconst p2 = operationRisquee();\np2.catch(() => {}); // marque comme \"gérée\"\nfaireAutreChose();\nawait p2; // l'erreur éventuelle sera levée ici, dans le try/catch`,
      },
    ],
  },
  {
    id: "retry-backoff",
    title: "Pattern : retry avec backoff",
    level: 3,
    intro:
      "Réessayer intelligemment : le pattern indispensable des appels réseau.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Retry avec délai exponentiel",
        code: `async function avecRetry(fn, tentatives = 3, delaiBase = 500) {\n  for (let essai = 1; essai <= tentatives; essai++) {\n    try {\n      return await fn(); // succès : on sort\n    } catch (erreur) {\n      if (essai === tentatives) throw erreur; // dernier essai : on abandonne\n      const delai = delaiBase * 2 ** (essai - 1); // 500, 1000, 2000…\n      console.log("Échec, nouvel essai dans " + delai + " ms");\n      await new Promise((r) => setTimeout(r, delai));\n    }\n  }\n}\n\n// Usage\nconst data = await avecRetry(() => fetch("/api/fragile").then((r) => r.json()));`,
      },
      {
        kind: "list",
        items: [
          "Backoff exponentiel : espacer les tentatives (500 ms, 1 s, 2 s…) pour ne pas marteler un serveur déjà en difficulté.",
          "Ne réessayez que les erreurs transitoires (réseau, 503, 429) : une 404 ou une 400 ne guérira pas au 3e essai.",
          "Ajoutez un jitter (délai aléatoire ±20 %) quand beaucoup de clients réessaient ensemble, pour éviter les pics synchronisés.",
          "Plafonnez le nombre de tentatives et le délai total : un retry infini est une fuite déguisée.",
        ],
      },
    ],
  },
  {
    id: "timeout-pattern",
    title: "Pattern : timeout d'opération",
    level: 3,
    intro:
      "Ne jamais attendre indéfiniment : borner toute opération asynchrone.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Timeout moderne avec AbortSignal",
        code: `// AbortSignal.timeout : le moyen natif le plus simple (Node 18+, navigateurs modernes)\nconst reponse = await fetch("/api/lent", { signal: AbortSignal.timeout(5000) });\n// Lève une erreur TimeoutError après 5 s\n\n// Version générique avec Promise.race (quand aucun signal n'est disponible)\nfunction avecTimeout(promesse, ms) {\n  const timeout = new Promise((_, reject) =>\n    setTimeout(() => reject(new Error("Timeout")), ms)\n  );\n  return Promise.race([promesse, timeout]);\n}`,
      },
      {
        kind: "text",
        text: "L'idée à retenir : `AbortSignal.timeout(ms)` crée un signal qui s'annule tout seul, et `fetch` l'honore en interrompant réellement la requête réseau. La version `Promise.race` fonctionne partout mais n'annule pas l'opération sous-jacente : la requête continue en tâche de fond.",
      },
    ],
  },
  {
    id: "debounce-throttle",
    title: "Debounce et throttle",
    level: 3,
    intro:
      "Deux techniques pour calmer les événements qui se déclenchent trop souvent.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Debounce", "Throttle"],
        rows: [
          ["Principe", "Attend la FIN d'une rafale d'événements", "Limite à UNE exécution par intervalle"],
          ["Cas typique", "Recherche auto-complétée (lancer la requête quand l'utilisateur a fini de taper)", "Scroll infini, redimensionnement (réagir régulièrement pendant l'action)"],
          ["Comportement", "Un seul appel, après le silence", "Des appels réguliers, espacés"],
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "Les deux implémentations",
        code: `// DEBOUNCE : n'exécute que 300 ms après le dernier appel\nfunction debounce(fn, delai) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delai);\n  };\n}\n\n// THROTTLE : au plus une exécution toutes les 200 ms\nfunction throttle(fn, intervalle) {\n  let dernier = 0;\n  return (...args) => {\n    const maintenant = Date.now();\n    if (maintenant - dernier >= intervalle) {\n      dernier = maintenant;\n      fn(...args);\n    }\n  };\n}\n\nchampRecherche.addEventListener("input", debounce(lancerRecherche, 300));\nwindow.addEventListener("scroll", throttle(sauvegarderPosition, 200));`,
      },
    ],
  },
  {
    id: "concurrence-limitee",
    title: "File à concurrence limitée",
    level: 3,
    intro:
      "`Promise.all` sur 1000 éléments sature tout : voici comment doser.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Traiter par lots de N",
        code: `// Traite le tableau par lots de 'tailleLot' en parallèle\nasync function parLots(elements, tailleLot, traiter) {\n  const resultats = [];\n  for (let i = 0; i < elements.length; i += tailleLot) {\n    const lot = elements.slice(i, i + tailleLot);\n    const traites = await Promise.all(lot.map(traiter));\n    resultats.push(...traites);\n    console.log("Lot " + (i / tailleLot + 1) + " terminé");\n  }\n  return resultats;\n}\n\n// 100 URLs, 5 requêtes simultanées maximum\nconst pages = await parLots(urls, 5, (u) => fetch(u).then((r) => r.text()));`,
      },
      {
        kind: "text",
        text: "Pourquoi limiter : chaque promesse en vol consomme une connexion, de la mémoire, et de la bonne volonté du serveur (rate limiting, bannissement). La taille de lot se choisit selon la cible : 3-5 pour une API externe prudente, plus pour du traitement local. Pour un contrôle fin (file continue plutôt que par lots), on utilise un sémaphore — un compteur de « places » décrémenté/incrémenté autour de chaque tâche.",
      },
    ],
  },
  {
    id: "boucle-await-piege",
    title: "Le piège du forEach async",
    level: 3,
    intro:
      "L'erreur la plus copiée-collée de l'écosystème JavaScript.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "forEach n'attend pas",
        code: `// FAUX : la fonction se termine avant les traitements !\nasync function faux() {\n  [1, 2, 3].forEach(async (n) => {\n    await attendre(100);\n    console.log(n);\n  });\n  console.log("fini ? non : les logs arrivent après");\n}\n// forEach ignore la promesse retournée par le callback.\n\n// CORRECT (séquentiel) : for...of attend chaque itération\nasync function sequentiel() {\n  for (const n of [1, 2, 3]) {\n    await attendre(100);\n    console.log(n);\n  }\n  console.log("vraiment fini");\n}\n\n// CORRECT (parallèle) : map + Promise.all\nasync function parallele() {\n  await Promise.all(\n    [1, 2, 3].map(async (n) => {\n      await attendre(100);\n      console.log(n);\n    })\n  );\n  console.log("vraiment fini");\n}`,
      },
    ],
  },
  {
    id: "for-await",
    title: "for await...of et les itérables async",
    level: 3,
    intro:
      "Boucler sur des sources qui produisent leurs valeurs au fil du temps.",
    blocks: [
      {
        kind: "text",
        text: "`for await...of` consomme un itérable asynchrone : chaque valeur peut mettre du temps à arriver (flux de données, pagination, générateur async). C'est la boucle naturelle des streams et des traitements au fil de l'eau, là où `Promise.all` voudrait tout charger d'un coup en mémoire.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Générateur async et consommation",
        code: `// Un générateur async : produit des valeurs avec des pauses\nasync function* compteurLent(max) {\n  for (let i = 1; i <= max; i++) {\n    await new Promise((r) => setTimeout(r, 300));\n    yield i; // produit une valeur, suspend jusqu'à la demande suivante\n  }\n}\n\n// Consommation : chaque tour attend la valeur suivante\nfor await (const n of compteurLent(3)) {\n  console.log("reçu :", n);\n}`,
      },
    ],
  },
  {
    id: "top-level-await",
    title: "Top-level await",
    level: 3,
    intro:
      "`await` directement à la racine d'un module : pratique, à comprendre.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "await hors fonction, dans un module",
        code: `// config.mjs — module ES : le top-level await est autorisé\nconst reponse = await fetch("https://api.github.com/zen");\nexport const message = await reponse.text();\n\nconsole.log("Config chargée :", message);`,
      },
      {
        kind: "list",
        items: [
          "Disponible uniquement dans les modules ES (`type: \"module\"` ou `.mjs`), pas dans les scripts classiques.",
          "Le module qui `await` bloque l'évaluation des modules qui l'importent : à utiliser pour l'initialisation, pas au milieu d'une bibliothèque.",
          "Alternative sans top-level await : exporter une promesse d'initialisation que l'appelant `await` explicitement.",
        ],
      },
    ],
  },
  {
    id: "workers-apercu",
    title: "Au-delà du thread unique : les Workers",
    level: 3,
    intro:
      "Quand le calcul lui-même est le problème, pas l'attente.",
    blocks: [
      {
        kind: "text",
        text: "L'asynchrone ne rend pas les calculs plus rapides : une boucle lourde bloque toujours le thread. Pour du vrai parallélisme de calcul, il faut d'autres threads : Web Workers dans le navigateur, Worker Threads dans Node.js. Chaque worker a sa propre event loop et communique par messages — pas de mémoire partagée par défaut, donc pas de race conditions classiques.",
      },
      {
        kind: "list",
        items: [
          "Cas d'usage : chiffrement, traitement d'images, parsing de gros fichiers, calculs scientifiques.",
          "Coût : créer un worker et sérialiser les messages a un prix — rentable pour des tâches longues, pas pour des micro-calculs.",
          "Règle : d'abord l'asynchrone (I/O), ensuite les workers (CPU). La plupart des lenteurs web sont de l'I/O, pas du CPU.",
        ],
      },
    ],
  },
  {
    id: "memoization-async",
    title: "Mémoriser les promesses",
    level: 3,
    intro:
      "Éviter de relancer deux fois la même opération coûteuse.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Cache de promesses",
        code: `const cache = new Map();\n\nfunction chargerProfilMemo(pseudo) {\n  if (!cache.has(pseudo)) {\n    // On stocke la PROMESSE, pas le résultat :\n    // les appels concurrents partagent la même requête en vol.\n    cache.set(pseudo, fetch("https://api.github.com/users/" + pseudo).then((r) => r.json()));\n  }\n  return cache.get(pseudo);\n}\n\n// Deux appels simultanés = une seule requête réseau\nconst [a, b] = await Promise.all([chargerProfilMemo("octocat"), chargerProfilMemo("octocat")]);`,
      },
      {
        kind: "text",
        text: "Subtilité : en cas d'échec, la promesse rejetée reste en cache et tous les appels suivants échoueront instantanément. Stratégie courante : supprimer l'entrée du cache dans un `.catch()` pour permettre un nouvel essai.",
      },
    ],
  },
  {
    id: "tester-code-async",
    title: "Tester le code asynchrone",
    level: 3,
    intro:
      "Les règles pour des tests async fiables et non flaky.",
    blocks: [
      {
        kind: "list",
        items: [
          "Tests `async` : déclarez la fonction de test `async` et `await` ce que vous vérifiez — un test qui ne wait pas est un test qui ne teste rien.",
          "Bannissez les `setTimeout` arbitraires dans les tests (« attendre 500 ms en espérant que ça suffise ») : c'est la source n°1 des tests flaky.",
          "Mockez le temps : les frameworks (Vitest, Jest) permettent de contrôler les timers (`vi.useFakeTimers()`) pour tester debounce et retry sans attendre réellement.",
          "Mockez le réseau : interceptez `fetch` pour simuler succès, erreurs HTTP et timeouts de façon déterministe.",
          "Testez les rejets : vérifiez que les erreurs sont bien levées (`expect(...).rejects.toThrow()`), pas seulement les cas nominaux.",
        ],
      },
    ],
  },
  {
    id: "stack-traces-async",
    title: "Lire une stack trace async",
    level: 3,
    intro:
      "Les piles d'appels traversent désormais les `await` : sachez les lire.",
    blocks: [
      {
        kind: "text",
        text: "Les moteurs modernes produisent des « async stack traces » : la pile montre non seulement où l'erreur a été levée, mais aussi la chaîne des `await` qui y a mené, à travers les ticks de l'event loop. Dans les DevTools ou le terminal Node, repérez les frames marquées `async` : elles racontent l'histoire de l'opération, pas seulement son dernier instant.",
      },
      {
        kind: "list",
        items: [
          "Si la trace s'arrête à une frontière (callback natif, `setTimeout`), c'est normal : l'historique avant ce point est perdu.",
          "Nommez vos fonctions (évitez les fléchées anonymes dans les chaînes complexes) : des frames nommées se lisent dix fois mieux.",
          "En production, conservez les source maps pour retrouver le code d'origine dans les traces minifiées.",
        ],
      },
    ],
  },
  {
    id: "erreurs-subtiles",
    title: "Erreurs subtiles de niveau avancé",
    level: 3,
    intro:
      "Les pièges qui survivent aux premières années de pratique.",
    blocks: [
      {
        kind: "list",
        items: [
          "Promesse flottante : créer une promesse pour son effet de bord sans jamais l'attendre ni la catcher — l'erreur éventuelle est silencieuse.",
          "`Promise.all` avec un itérable infini ou un générateur non consommé : ça ne termine jamais.",
          "Muter un tableau pendant un `Promise.all(tableau.map(...))` : les résultats suivent l'ordre du tableau au moment de l'appel.",
          "`await` dans une boucle quand c'est parallélisable : la faute de performance la plus répandue (voir séquentiel vs parallèle).",
          "Oublier que `finally` ne reçoit pas la valeur : y mettre une transformation est sans effet.",
          "Deux `await` sur la même promesse : c'est autorisé et retourne deux fois la même valeur — mais ça surprend.",
          "Abuser du `new Promise` autour de code déjà async : chaque enveloppe ajoute un tick et du bruit.",
        ],
      },
    ],
  },
  {
    id: "projet-client-api-retry",
    title: "Projet : client API avec retry",
    level: 3,
    intro:
      "Assembler retry, timeout et gestion d'erreurs dans un mini-client réutilisable.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Écrire la fonction de base",
            detail:
              "`api(url, options)` : `fetch` + vérification `reponse.ok` + parsing JSON. Toute erreur HTTP devient une exception avec le statut.",
          },
          {
            title: "Ajouter le timeout",
            detail:
              "`AbortSignal.timeout(8000)` passé en option : aucune requête ne dépasse 8 secondes.",
          },
          {
            title: "Envelopper dans le retry",
            detail:
              "Réutilisez le pattern retry/backoff du guide : 3 tentatives, uniquement sur erreurs réseau et 5xx/429.",
          },
          {
            title: "Tester les scénarios",
            detail:
              "URL valide, URL 404 (pas de retry), serveur injoignable (retry puis échec propre), réponse lente (timeout). Chaque scénario doit se comporter comme prévu.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-chargement-parallele",
    title: "Projet : chargement parallèle avec tolérance",
    level: 3,
    intro:
      "Charger plusieurs ressources en parallèle en affichant les succès partiels.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Lister les ressources",
            detail:
              "Un tableau d'URLs indépendantes (ex. plusieurs endpoints d'une API publique).",
          },
          {
            title: "Lancer avec allSettled",
            detail:
              "`Promise.allSettled(urls.map(charger))` : on veut tous les résultats, même partiels.",
          },
          {
            title: "Rendre les succès, signaler les échecs",
            detail:
              "Affichez les données reçues ; pour chaque échec, un message ciblé (« la section X n'a pas pu charger ») avec un bouton « Réessayer » qui ne relance que celle-ci.",
          },
          {
            title: "Ajouter la concurrence limitée si besoin",
            detail:
              "Si la liste grandit, passez au traitement par lots pour ne pas saturer l'API.",
          },
        ],
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
          { label: "MDN — Utiliser les promesses", value: "developer.mozilla.org : le guide de référence, des bases aux combinateurs." },
          { label: "MDN — async/await", value: "La référence de la syntaxe, avec les pièges documentés." },
          { label: "MDN — Event loop", value: "Le modèle d'exécution expliqué par la documentation du runtime." },
        ],
      },
      {
        kind: "list",
        items: [
          "Guide : « JavaScript asynchrone — javascript.info » (fr.javascript.info), progression complète avec exercices.",
          "Pratique : réécrire un script à callbacks en promesses puis en async/await, et comparer la lisibilité.",
          "Référence : la spécification des promesses (promises/A+) pour les curieux de la sémantique exacte.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "L'asynchrone maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Mettre en pratique sur le réseau : `fetch-api` (requêtes HTTP, erreurs, abort).",
          "Structurer le code : `js-modules` pour organiser les clients et utilitaires async.",
          "Passer au serveur : `nodejs` (I/O asynchrone, streams) puis `rest` (concevoir des APIs).",
          "Typer l'asynchrone : `typescript` (`Promise<T>`, génériques sur les utilitaires).",
          "Revenir à la roadmap : valider JavaScript asynchrone et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

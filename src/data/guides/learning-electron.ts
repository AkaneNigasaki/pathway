import type { LearningSection } from "../skill-guides";

/**
 * Learning Page d'Electron : applications desktop avec des technologies web.
 * Architecture main/renderer, IPC sécurisé, packaging. Commandes limitées
 * aux commandes npm/npx réelles et vérifiables ; exemples JavaScript réels.
 */
export const LEARNING_ELECTRON: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Ce qu'est Electron et pourquoi des applications comme VS Code l'utilisent.",
    blocks: [
      {
        kind: "text",
        text: "Electron emballe une application web (HTML/CSS/JS) dans un shell desktop : Chromium pour l'interface, Node.js pour le système. C'est la stack de VS Code, Discord et Slack — des applications bureautiques écrites avec des compétences web.",
      },
      {
        kind: "text",
        text: "Le principe : au lieu d'apprendre un toolkit natif par système d'exploitation, on écrit l'interface en technologies web et on accède au système (fichiers, menus, notifications) via les API d'Electron. Un seul code pour Windows, macOS et Linux.",
      },
      {
        kind: "text",
        text: "Le revers : chaque application embarque son propre Chromium — d'où un coût mémoire et une taille d'installateur à assumer. Comprendre l'architecture main/renderer avant d'adopter Electron, c'est comprendre ce compromis en connaissance de cause.",
      },
    ],
  },
  {
    id: "architecture-main-renderer",
    title: "L'architecture main / renderer",
    level: 1,
    intro: "Deux mondes séparés : le système et l'interface.",
    blocks: [
      {
        kind: "diagram",
        title: "Les deux processus d'Electron",
        lines: [
          "  ┌─────────────────────────┐      ┌─────────────────────────┐",
          "  │  PROCESSUS MAIN         │      │  PROCESSUS RENDERER     │",
          "  │  (Node.js)              │      │  (Chromium)             │",
          "  │                       │      │                         │",
          "  │  - cycle de vie de      │      │  - l'interface (HTML /  │",
          "  │    l'application        │ IPC  │    CSS / JS)            │",
          "  │  - fenêtres             │◄────►│  - pas d'accès direct   │",
          "  │  - menus, tray          │      │    au système           │",
          "  │  - accès système        │      │  - communique via le    │",
          "  │    (fichiers, OS)       │      │    preload              │",
          "  └─────────────────────────┘      └─────────────────────────┘",
          "            │                                  │",
          "            └────────── preload.js ────────────┘",
          "               (pont sécurisé : contextBridge)",
        ],
      },
      {
        kind: "text",
        text: "Le processus main (un seul) pilote l'application : il crée les fenêtres et accède au système via Node.js. Chaque fenêtre est un processus renderer (Chromium) qui affiche l'interface web. Les deux mondes ne se parlent que par IPC — et le script preload expose au renderer une API contrôlée via `contextBridge`.",
      },
      {
        kind: "text",
        text: "Cette séparation est aussi une séparation de sécurité : le renderer affiche du contenu potentiellement non fiable (comme un navigateur) sans accès direct au système. Tout l'art d'Electron consiste à concevoir ce pont proprement.",
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
    intro: "Electron suppose des bases web et Node.js.",
    blocks: [
      {
        kind: "fields",
        title: "Prérequis",
        fields: [
          {
            label: "JavaScript",
            value: "Le langage des deux processus : syntaxe moderne (modules, async/await, promesses). L'IPC repose sur des promesses.",
          },
          {
            label: "HTML / CSS",
            value: "L'interface est une page web : structure HTML, mise en forme CSS. Un framework (React, Vue) est un plus, pas un requis.",
          },
          {
            label: "Node.js et npm",
            value: "Electron s'installe via npm et le processus main utilise les API Node (fichiers, processus, chemins).",
          },
          {
            label: "Notions de processus",
            value: "Comprendre que main et renderer sont isolés : pas de variables partagées, communication par messages.",
          },
        ],
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    level: 2,
    intro: "Installer Electron dans un projet, en comprenant chaque commande.",
    blocks: [
      {
        kind: "command",
        label: "Initialiser le projet",
        command: "npm init -y",
        why: "Crée un `package.json` avec les valeurs par défaut. C'est lui qui déclarera Electron en dépendance et le point d'entrée du processus main.",
      },
      {
        kind: "command",
        label: "Installer Electron en dépendance de développement",
        command: "npm install -D electron",
        why: "Installe Electron localement au projet. C'est une dépendance de dev : elle sert à développer et à packager, elle ne fait pas partie du code distribué (le packaging embarque son propre binaire).",
        verify: "npx electron --version",
      },
      {
        kind: "text",
        text: "Prérequis système : Node.js LTS installé. Electron télécharge un binaire précompilé pour votre plateforme lors de l'installation — d'où un premier `npm install` plus long que d'habitude.",
      },
    ],
  },
  {
    id: "premier-projet",
    title: "Premier projet",
    level: 2,
    intro: "De zéro à une fenêtre qui s'affiche, en 6 étapes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Initialiser et installer",
            detail: "`npm init -y` puis `npm install -D electron`. Le projet a maintenant un `package.json` et Electron en dépendance.",
          },
          {
            title: "Déclarer le point d'entrée",
            detail: "Dans `package.json`, ajouter `\"main\": \"main.js\"` : c'est le script du processus main, exécuté au lancement.",
          },
          {
            title: "Écrire le processus main",
            detail: "Créer `main.js` (voir le bloc de code) : attendre que l'application soit prête, créer une `BrowserWindow`, y charger `index.html`.",
          },
          {
            title: "Écrire l'interface",
            detail: "Créer `index.html` : une page web ordinaire. C'est elle qui s'affichera dans la fenêtre.",
          },
          {
            title: "Ajouter le script de lancement",
            detail: "Dans `package.json`, ajouter `\"start\": \"electron .\"` aux scripts. Le `.` désigne le dossier du projet.",
          },
          {
            title: "Lancer",
            detail: "`npm start` (ou `npx electron .`) : la fenêtre s'ouvre avec votre page. Félicitations : c'est une application desktop.",
          },
        ],
      },
      {
        kind: "code",
        language: "javascript",
        title: "main.js — le processus main minimal",
        code: `const { app, BrowserWindow } = require("electron");\nconst path = require("node:path");\n\nfunction createWindow() {\n  const win = new BrowserWindow({\n    width: 1200,\n    height: 800,\n    webPreferences: {\n      preload: path.join(__dirname, "preload.js"),\n    },\n  });\n  win.loadFile("index.html");\n}\n\napp.whenReady().then(() => {\n  createWindow();\n\n  // Sur macOS, rouvrir une fenêtre quand l'icône du dock est cliquée\n  app.on("activate", () => {\n    if (BrowserWindow.getAllWindows().length === 0) createWindow();\n  });\n});\n\n// Quitter quand toutes les fenêtres sont fermées (sauf sur macOS)\napp.on("window-all-closed", () => {\n  if (process.platform !== "darwin") app.quit();\n});`,
      },
      {
        kind: "command",
        label: "Lancer l'application",
        command: "npx electron .",
        why: "Démarre Electron avec le dossier courant comme application : il lit `\"main\"` dans `package.json` et exécute le processus main. En développement, on le lance via le script `npm start`.",
      },
    ],
  },
  {
    id: "structure-d-un-projet",
    title: "Structure d'un projet",
    level: 2,
    intro: "Organiser les fichiers main, renderer et preload.",
    blocks: [
      {
        kind: "diagram",
        title: "Arborescence typique",
        lines: [
          "mon-app/",
          "├── package.json        (dépendances, scripts, config build)",
          "├── main.js             (processus main : fenêtres, système)",
          "├── preload.js          (pont sécurisé main ↔ renderer)",
          "├── index.html          (interface : le renderer)",
          "├── renderer.js         (logique de l'interface)",
          "├── styles.css          (mise en forme)",
          "└── assets/             (icônes, images)",
        ],
      },
      {
        kind: "text",
        text: "Règle d'organisation : `main.js` ne fait que du système (fenêtres, menus, fichiers), les fichiers du renderer ne font que de l'interface, et `preload.js` expose exactement l'API dont l'interface a besoin — rien de plus. Cette discipline est la base de la sécurité.",
      },
    ],
  },
  {
    id: "la-fenetre-browserwindow",
    title: "La fenêtre : BrowserWindow",
    level: 2,
    intro: "Créer et configurer les fenêtres de l'application.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Options courantes de BrowserWindow",
        code: `const win = new BrowserWindow({\n  width: 1200,\n  height: 800,\n  minWidth: 800,\n  minHeight: 600,\n  title: "Mon application",\n  backgroundColor: "#1a1a1a", // évite le flash blanc au chargement\n  webPreferences: {\n    preload: path.join(__dirname, "preload.js"),\n    contextIsolation: true, // isolation stricte (défaut et recommandé)\n  },\n});\n\nwin.loadFile("index.html"); // ou win.loadURL("https://...")\nwin.webContents.openDevTools(); // DevTools, en développement uniquement`,
      },
      {
        kind: "list",
        items: [
          "`loadFile` charge un fichier local (le cas standard) ; `loadURL` charge une adresse distante.",
          "`backgroundColor` évite le flash blanc pendant le chargement de la page.",
          "Les DevTools Chromium sont intégrés : `win.webContents.openDevTools()` les ouvre — à réserver au développement.",
          "Une application peut avoir plusieurs fenêtres (préférences, à propos) : chacune est un renderer indépendant.",
        ],
      },
    ],
  },
  {
    id: "preload-et-contextbridge",
    title: "Le preload et contextBridge",
    level: 2,
    intro: "Le seul pont autorisé entre l'interface et le système.",
    blocks: [
      {
        kind: "text",
        text: "Le script preload s'exécute avant la page, avec accès aux API Node et Electron, mais dans un contexte isolé. Via `contextBridge`, il expose à la page une API explicite et limitée — au lieu de donner au renderer un accès total à Node.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "preload.js — exposer une API minimale",
        code: `const { contextBridge, ipcRenderer } = require("electron");\n\n// Expose uniquement ce dont l'interface a besoin, rien de plus\ncontextBridge.exposeInMainWorld("api", {\n  getAppVersion: () => ipcRenderer.invoke("get-app-version"),\n  choisirFichier: () => ipcRenderer.invoke("dialog:ouvrir-fichier"),\n  onFichierChoisi: (callback) => ipcRenderer.on("fichier-choisi", callback),\n});`,
      },
      {
        kind: "text",
        text: "Côté renderer, la page appelle `window.api.getAppVersion()` comme une fonction ordinaire. Elle ne voit jamais `ipcRenderer` directement : la surface d'attaque est réduite à l'API exposée. C'est le modèle de sécurité recommandé — et celui à appliquer systématiquement.",
      },
    ],
  },
  {
    id: "ipc-les-bases",
    title: "L'IPC : les bases",
    level: 2,
    intro: "Faire communiquer le renderer et le main par messages.",
    blocks: [
      {
        kind: "text",
        text: "L'IPC (Inter-Process Communication) est le dialogue entre processus : le renderer demande, le main exécute et répond. Deux motifs : la requête-réponse (`invoke`/`handle`, basé sur des promesses) et les événements (`send`/`on`, en sens unique).",
      },
      {
        kind: "code",
        language: "javascript",
        title: "IPC requête-réponse : main.js",
        code: `const { app, BrowserWindow, ipcMain, dialog } = require("electron");\n\n// Le main expose des gestionnaires que le renderer peut invoquer\nipcMain.handle("get-app-version", () => {\n  return app.getVersion();\n});\n\nipcMain.handle("dialog:ouvrir-fichier", async () => {\n  const { canceled, filePaths } = await dialog.showOpenDialog({\n    properties: ["openFile"],\n  });\n  return canceled ? null : filePaths[0];\n});`,
      },
      {
        kind: "code",
        language: "javascript",
        title: "Côté renderer : appeler le main",
        code: `// La page utilise l'API exposée par le preload\nconst version = await window.api.getAppVersion();\ndocument.getElementById("version").textContent = version;\n\nconst fichier = await window.api.choisirFichier();\nif (fichier) {\n  console.log("Fichier choisi :", fichier);\n}`,
      },
      {
        kind: "list",
        items: [
          "`ipcRenderer.invoke` retourne une promesse : le renderer attend la réponse avec `await`.",
          "Valider les arguments côté main : le renderer est une zone non fiable, comme un client web.",
          "Pour les événements continus (progression, notifications), préférer `ipcRenderer.on` + `webContents.send` dans l'autre sens.",
        ],
      },
    ],
  },
  {
    id: "devtools-et-debogage",
    title: "Déboguer avec les DevTools",
    level: 2,
    intro: "Le navigateur est intégré : ses outils aussi.",
    blocks: [
      {
        kind: "text",
        text: "Chaque fenêtre Electron embarque les DevTools de Chromium : inspection du DOM, console, onglet réseau, debugger JavaScript avec points d'arrêt. Le débogage du renderer est identique au débogage web.",
      },
      {
        kind: "list",
        items: [
          "Ouvrir les DevTools : `win.webContents.openDevTools()` dans le main, ou le raccourci clavier en développement.",
          "Le processus main se débogue comme du Node.js : `console.log` dans le terminal, ou un débogueur Node via la configuration de lancement.",
          "L'onglet réseau montre les requêtes du renderer ; la console du main est dans le terminal de lancement.",
          "Astuce : recharger la fenêtre (`Cmd/Ctrl+R`) recharge le renderer sans relancer l'application — le cycle de développement est rapide.",
        ],
      },
    ],
  },
  {
    id: "scripts-package-json",
    title: "Les scripts npm",
    level: 2,
    intro: "Standardiser les commandes du projet.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "package.json — scripts typiques",
        code: `{\n  "name": "mon-app",\n  "version": "1.0.0",\n  "main": "main.js",\n  "scripts": {\n    "start": "electron .",\n    "dist": "electron-builder"\n  },\n  "devDependencies": {\n    "electron": "^33.0.0",\n    "electron-builder": "^25.0.0"\n  }\n}`,
      },
      {
        kind: "text",
        text: "`npm start` lance l'application en développement, `npm run dist` produit les installateurs. Des scripts nommés et versionnés : toute l'équipe (et la CI) utilise les mêmes commandes.",
      },
    ],
  },
  {
    id: "comprendre-les-processus",
    title: "Comprendre les processus",
    level: 2,
    intro: "Ce qui tourne où, et pourquoi ça compte.",
    blocks: [
      {
        kind: "table",
        headers: ["", "Processus main", "Processus renderer", "Preload"],
        rows: [
          ["Nombre", "Un seul par application", "Un par fenêtre", "Un par fenêtre"],
          ["Environnement", "Node.js complet", "Chromium (page web)", "Isolé, avec accès Node/Electron"],
          ["Peut faire", "Fenêtres, fichiers, OS, IPC", "DOM, fetch, interface", "Pont : expose une API au renderer"],
          ["Ne peut pas", "Manipuler le DOM", "Accéder au système directement", "Accéder au DOM de la page"],
        ],
      },
      {
        kind: "text",
        text: "Conséquence pratique : un calcul lourd dans le renderer bloque l'interface (comme sur le web) ; un calcul lourd dans le main bloque toute l'application. Les tâches longues vont dans des processus dédiés ou des workers.",
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 2,
    intro: "Les pièges classiques des premières applications.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Symptôme", "Correction"],
        rows: [
          ["`\"main\"` absent ou faux dans package.json", "Electron démarre sans fenêtre ou avec une erreur", "Vérifier que `\"main\"` pointe vers le script du processus main"],
          ["Node intégré dans le renderer", "Faille de sécurité majeure", "`contextIsolation: true` + preload + contextBridge, jamais `nodeIntegration: true`"],
          ["IPC sans validation", "Le renderer peut déclencher n'importe quelle action système", "Valider les arguments dans chaque `ipcMain.handle`"],
          ["Chemins en dur", "L'app packagée ne trouve plus ses fichiers", "Utiliser `app.getAppPath()` et `path.join`, tester l'app packagée"],
          ["DevTools oubliés en production", "L'utilisateur peut ouvrir la console", "N'appeler `openDevTools()` qu'en développement"],
          ["Fenêtre blanche au démarrage", "Flash blanc disgracieux", "`backgroundColor` sur la BrowserWindow + écran de chargement"],
          ["Ne tester que `npx electron .`", "Bugs découverts après distribution", "Toujours tester l'installateur packagé avant de livrer"],
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "cycle-de-vie-app",
    title: "Le cycle de vie de l'application",
    level: 3,
    intro: "Les événements qui rythment une app Electron.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Gérer le cycle de vie complet",
        code: `const { app, BrowserWindow } = require("electron");\n\n// L'application est prête : on peut créer des fenêtres\napp.whenReady().then(() => {\n  createWindow();\n});\n\n// Toutes les fenêtres fermées\napp.on("window-all-closed", () => {\n  // Sur macOS, l'app reste active sans fenêtre (convention de la plateforme)\n  if (process.platform !== "darwin") app.quit();\n});\n\n// Clic sur l'icône du dock (macOS) : rouvrir une fenêtre si besoin\napp.on("activate", () => {\n  if (BrowserWindow.getAllWindows().length === 0) createWindow();\n});\n\n// Avant de quitter : sauvegarder l'état, confirmer si travail non enregistré\napp.on("before-quit", (event) => {\n  // event.preventDefault() pour empêcher la fermeture et demander confirmation\n});`,
      },
      {
        kind: "list",
        items: [
          "Ne jamais créer de fenêtre avant `whenReady()` : les API ne sont pas initialisées.",
          "Respecter les conventions de chaque OS : sur macOS, fermer la fenêtre ne quitte pas l'application.",
          "`before-quit` permet de sauvegarder ou de demander confirmation — à utiliser avec parcimonie.",
        ],
      },
    ],
  },
  {
    id: "multi-fenetres",
    title: "Gérer plusieurs fenêtres",
    level: 3,
    intro: "Fenêtre principale, préférences, fenêtres modales.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Fenêtre secondaire modale",
        code: `function createPreferencesWindow(parent) {\n  const prefs = new BrowserWindow({\n    width: 500,\n    height: 400,\n    parent,               // fenêtre parente\n    modal: true,          // bloque la parente tant qu'ouverte\n    show: false,          // on l'affiche quand elle est prête\n    webPreferences: {\n      preload: path.join(__dirname, "preload.js"),\n    },\n  });\n  prefs.loadFile("preferences.html");\n  // Évite le flash : afficher seulement quand le contenu est prêt\n  prefs.once("ready-to-show", () => prefs.show());\n  return prefs;\n}`,
      },
      {
        kind: "list",
        items: [
          "Chaque fenêtre est un processus renderer indépendant : un plantage d'une fenêtre n'entraîne pas les autres.",
          "Les fenêtres communiquent via le main (IPC) : le main route les messages entre renderers.",
          "`ready-to-show` + `show: false` : le motif standard pour éviter tout flash au chargement.",
        ],
      },
    ],
  },
  {
    id: "menus",
    title: "Les menus natifs",
    level: 3,
    intro: "La barre de menus de chaque système d'exploitation.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Construire un menu d'application",
        code: `const { Menu } = require("electron");\n\nconst template = [\n  {\n    label: "Fichier",\n    submenu: [\n      {\n        label: "Ouvrir…",\n        accelerator: "CmdOrCtrl+O", // raccourci adapté à la plateforme\n        click: () => ouvrirFichier(),\n      },\n      { type: "separator" },\n      { role: "quit", label: "Quitter" }, // rôle natif : comportement OS\n    ],\n  },\n  {\n    label: "Édition",\n    submenu: [\n      { role: "undo", label: "Annuler" },\n      { role: "redo", label: "Rétablir" },\n      { type: "separator" },\n      { role: "copy", label: "Copier" },\n      { role: "paste", label: "Coller" },\n    ],\n  },\n];\n\nMenu.setApplicationMenu(Menu.buildFromTemplate(template));`,
      },
      {
        kind: "list",
        items: [
          "Les `role` natifs (quit, copy, paste...) adoptent automatiquement le comportement et le libellé de la plateforme.",
          "`CmdOrCtrl` s'adapte : Command sur macOS, Contrôle ailleurs.",
          "Sur macOS, le premier menu devient le menu de l'application (Préférences, À propos) : prévoir cette spécificité.",
        ],
      },
    ],
  },
  {
    id: "menus-contextuels",
    title: "Les menus contextuels",
    level: 3,
    intro: "Le clic droit natif dans l'interface.",
    blocks: [
      {
        kind: "text",
        text: "Un menu contextuel s'affiche au clic droit dans le renderer : le renderer détecte le clic, demande au main via IPC, et le main affiche le menu avec `menu.popup()`. Le contenu du menu peut dépendre de l'élément cliqué (texte sélectionné, image, lien).",
      },
      {
        kind: "list",
        items: [
          "Construire le menu côté main (il a accès à l'API Menu), déclencher son affichage sur demande du renderer.",
          "Adapter les entrées au contexte : « Copier » si du texte est sélectionné, « Enregistrer l'image » sur une image.",
          "Garder les menus courts : les actions principales, pas toutes les fonctionnalités.",
        ],
      },
    ],
  },
  {
    id: "tray",
    title: "Le tray (zone de notification)",
    level: 3,
    intro: "Une icône persistante près de l'horloge système.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Icône tray avec menu",
        code: `const { Tray, Menu, nativeImage } = require("electron");\n\nlet tray = null;\n\nfunction createTray() {\n  const icon = nativeImage.createFromPath(\n    path.join(__dirname, "assets", "tray-icon.png")\n  );\n  tray = new Tray(icon);\n  tray.setToolTip("Mon application");\n  tray.setContextMenu(\n    Menu.buildFromTemplate([\n      { label: "Ouvrir", click: () => mainWindow.show() },\n      { label: "Quitter", click: () => app.quit() },\n    ])\n  );\n  // Clic sur l'icône : afficher/masquer la fenêtre\n  tray.on("click", () => {\n    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();\n  });\n}\n\n// Empêcher le garbage collector de détruire le tray :\n// le garder dans une variable globale.\n`,
      },
      {
        kind: "text",
        text: "Piège classique : si la variable `tray` est locale, le ramasse-miettes la détruit et l'icône disparaît mystérieusement. La garder en variable globale du main.",
      },
    ],
  },
  {
    id: "notifications",
    title: "Les notifications natives",
    level: 3,
    intro: "Alerter l'utilisateur via le système.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Envoyer une notification depuis le main",
        code: `const { Notification } = require("electron");\n\nfunction notifier(titre, corps) {\n  if (!Notification.isSupported()) return;\n  const notif = new Notification({ title: titre, body: corps });\n  notif.on("click", () => {\n    // Ramener la fenêtre au premier plan quand on clique la notification\n    mainWindow.show();\n  });\n  notif.show();\n}`,
      },
      {
        kind: "list",
        items: [
          "Les notifications passent par le centre de notifications de l'OS : elles respectent le mode « ne pas déranger » de l'utilisateur.",
          "Ne notifier que l'important : une application qui notifie trop se fait couper les notifications — ou désinstaller.",
          "Sur Windows, l'ID du modèle d'application doit être configuré pour que les notifications fonctionnent dans l'app packagée.",
        ],
      },
    ],
  },
  {
    id: "dialog-shell-clipboard",
    title: "Dialog, shell et presse-papiers",
    level: 3,
    intro: "Les API natives du quotidien.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Boîtes de dialogue, shell et clipboard",
        code: `const { dialog, shell, clipboard } = require("electron");\n\n// Ouvrir un fichier : dialogue natif, toujours côté main\nconst { canceled, filePaths } = await dialog.showOpenDialog({\n  title: "Choisir un fichier",\n  filters: [{ name: "Images", extensions: ["png", "jpg"] }],\n  properties: ["openFile"],\n});\n\n// Ouvrir un lien dans le navigateur par défaut (jamais dans l'app)\nawait shell.openExternal("https://www.electronjs.org/");\n\n// Presse-papiers : lire et écrire du texte\nclipboard.writeText("copié depuis l'application");\nconst contenu = clipboard.readText();`,
      },
      {
        kind: "list",
        items: [
          "Les dialogues natifs s'ouvrent toujours depuis le main : le renderer demande via IPC.",
          "`shell.openExternal` pour les liens externes : ouvrir une URL dans le renderer donnerait à un site un accès à l'application.",
          "Le presse-papiers est partagé avec le système : ne jamais y placer de secrets sans raison.",
        ],
      },
    ],
  },
  {
    id: "auto-update",
    title: "Les mises à jour automatiques",
    level: 3,
    intro: "Livrer les nouvelles versions sans réinstallation manuelle.",
    blocks: [
      {
        kind: "text",
        text: "Le module `autoUpdater` vérifie la disponibilité d'une nouvelle version sur un serveur, la télécharge en arrière-plan et l'installe au redémarrage. Avec `electron-builder`, le flux est intégré : publier une release déclenche la distribution.",
      },
      {
        kind: "list",
        items: [
          "Principe : l'application interroge un flux (souvent les releases GitHub), télécharge la mise à jour, propose le redémarrage.",
          "Ne jamais forcer le redémarrage sans prévenir : proposer, laisser l'utilisateur choisir le moment.",
          "Signer les mises à jour : seule une version authentifiée doit pouvoir s'installer.",
          "Tester le chemin de mise à jour (ancienne → nouvelle version) avant chaque release : c'est un scénario fragile.",
        ],
      },
    ],
  },
  {
    id: "securite-modele",
    title: "Le modèle de sécurité",
    level: 3,
    intro: "Penser l'application comme un navigateur qui a des privilèges.",
    blocks: [
      {
        kind: "text",
        text: "Le renderer est un navigateur : il affiche du contenu qui peut être hostile (page distante, données utilisateur, markdown rendu). Le main a tous les privilèges. La sécurité d'Electron consiste à empêcher le premier de contrôler le second.",
      },
      {
        kind: "table",
        headers: ["Règle", "Pourquoi"],
        rows: [
          ["`contextIsolation: true` (défaut)", "Le preload et la page ne partagent pas le même monde JavaScript"],
          ["Jamais `nodeIntegration: true`", "Donner Node au renderer, c'est donner le système à la page"],
          ["API minimale via `contextBridge`", "Chaque fonction exposée est une capacité offerte : n'exposer que le nécessaire"],
          ["Valider côté main", "Le renderer est non fiable : vérifier types, plages et chemins dans chaque handler IPC"],
          ["`sandbox: true` quand possible", "Le renderer tourne sans privilèges Node du tout"],
        ],
      },
    ],
  },
  {
    id: "csp",
    title: "La Content Security Policy",
    level: 3,
    intro: "Limiter ce que la page a le droit de charger et d'exécuter.",
    blocks: [
      {
        kind: "text",
        text: "La CSP est un en-tête (ou une balise meta) qui déclare les sources autorisées : scripts, styles, images, connexions. En cas d'injection de contenu malveillant, la CSP limite les dégâts en bloquant les ressources non autorisées.",
      },
      {
        kind: "code",
        language: "html",
        title: "CSP stricte pour une app locale",
        code: `<meta\n  http-equiv="Content-Security-Policy"\n  content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'" />`,
      },
      {
        kind: "text",
        text: "Pour une application qui charge ses fichiers en local, `default-src 'self'` suffit dans la plupart des cas. Chaque exception (`https:`, `unsafe-inline`, `unsafe-eval`) doit être justifiée — ce sont des portes qu'on ouvre.",
      },
    ],
  },
  {
    id: "navigation-securisee",
    title: "Sécuriser la navigation",
    level: 3,
    intro: "Empêcher la page de s'échapper vers du contenu non contrôlé.",
    blocks: [
      {
        kind: "list",
        items: [
          "Intercepter les nouvelles fenêtres (`setWindowOpenHandler`) : décider ce qui s'ouvre dans l'app, ce qui va au navigateur externe.",
          "Bloquer la navigation vers des origines inattendues (`will-navigate`) : la page ne doit pas pouvoir charger un site arbitraire avec les privilèges de l'app.",
          "Les liens externes s'ouvrent avec `shell.openExternal`, jamais dans un renderer de l'application.",
          "Désactiver les fonctionnalités non utilisées (ex. `webview` si inutile) : moins de surface, moins de risques.",
        ],
      },
    ],
  },
  {
    id: "performance",
    title: "Performance",
    level: 3,
    intro: "Une app Electron peut être fluide : c'est une question de discipline.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le renderer est une page web : les mêmes règles s'appliquent (éviter les reflows, virtualiser les longues listes, débouncer les entrées).",
          "Ne pas bloquer le main : un main occupé fige tous les renderers. Les traitements lourds vont dans des workers ou des processus utilitaires.",
          "Charger paresseusement : une fenêtre de préférences rarement ouverte ne doit pas ralentir le démarrage.",
          "Mesurer le démarrage : l'ouverture de la première fenêtre est le moment que l'utilisateur juge. Viser un démarrage rapide avec un contenu minimal.",
          "La mémoire : chaque renderer a son propre processus — multiplier les fenêtres multiplie l'empreinte.",
        ],
      },
    ],
  },
  {
    id: "taille-et-distribution",
    title: "Taille de l'application",
    level: 3,
    intro: "Comprendre et réduire le poids des installateurs.",
    blocks: [
      {
        kind: "text",
        text: "Un installateur Electron pèse typiquement plusieurs dizaines de Mo : l'essentiel vient du binaire Chromium + Node embarqué, incompressible. Ce qu'on peut réduire, c'est le reste : dépendances npm superflues, assets non optimisés, fichiers inclus par erreur.",
      },
      {
        kind: "list",
        items: [
          "Auditer les dépendances : chaque paquet npm embarqué augmente la taille et la surface d'attaque.",
          "Configurer les fichiers inclus/exclus dans `electron-builder` : ne packager que le nécessaire.",
          "Optimiser les assets : images compressées, pas de fichiers de développement dans le paquet.",
          "Accepter le plancher : une app Electron ne pèsera jamais 5 Mo. Si la taille est critique, ce n'est pas la bonne technologie.",
        ],
      },
    ],
  },
  {
    id: "tests",
    title: "Tester une application Electron",
    level: 3,
    intro: "Trois niveaux de tests, comme pour toute application.",
    blocks: [
      {
        kind: "table",
        headers: ["Niveau", "Ce qu'on teste", "Approche"],
        rows: [
          ["Unitaire", "La logique métier (fonctions pures, utilitaires)", "Framework de test JS classique, sans Electron"],
          ["Main / IPC", "Les handlers IPC, la gestion des fenêtres", "Tests qui démarrent Electron en mode test, assertions sur les réponses IPC"],
          ["End-to-end", "Les parcours utilisateur complets", "Automatisation : lancer l'app, cliquer, vérifier — lent mais réaliste"],
        ],
      },
      {
        kind: "text",
        text: "Séparer la logique métier des API Electron rend l'unitaire facile : une fonction qui ne touche ni au DOM ni à Electron se teste comme n'importe quel module Node. C'est l'architecture qui rend le test possible.",
      },
    ],
  },
  {
    id: "electron-builder-config",
    title: "Configurer electron-builder",
    level: 3,
    intro: "Produire des installateurs pour les trois OS.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "package.json — configuration build",
        code: `{\n  "build": {\n    "appId": "com.exemple.monapp",\n    "productName": "MonApp",\n    "files": ["main.js", "preload.js", "index.html", "assets/**/*"],\n    "win": {\n      "target": "nsis"\n    },\n    "mac": {\n      "target": "dmg"\n    },\n    "linux": {\n      "target": "AppImage"\n    }\n  }\n}`,
      },
      {
        kind: "command",
        label: "Construire les installateurs",
        command: "npx electron-builder",
        why: "Lit la section `build` de `package.json` et produit les installateurs pour la plateforme courante (ou les trois avec la configuration CI adaptée). Le résultat va dans `dist/`.",
      },
      {
        kind: "list",
        items: [
          "`appId` : l'identifiant unique de l'application (format DNS inversé). Il doit être stable entre les versions pour les mises à jour.",
          "`files` : ce qui est embarqué. Tout le reste (sources de dev, tests) est exclu pour alléger l'installateur.",
          "Construire pour macOS exige macOS, pour Windows exige Windows (ou CI) : la compilation croisée a des limites, notamment pour la signature.",
        ],
      },
    ],
  },
  {
    id: "signature-code",
    title: "Signer les applications",
    level: 3,
    intro: "Prouver l'authenticité : la condition d'une distribution sérieuse.",
    blocks: [
      {
        kind: "text",
        text: "Un installateur non signé déclenche des avertissements dissuasifs sur tous les OS (« éditeur inconnu », Gatekeeper qui bloque). La signature cryptographique prouve que l'application vient bien de vous et n'a pas été modifiée.",
      },
      {
        kind: "list",
        items: [
          "Windows : certificat de signature de code (payant, avec validation d'identité). Sans lui, SmartScreen alerte.",
          "macOS : compte développeur Apple + notarisation. Sans elle, Gatekeeper bloque l'ouverture par défaut.",
          "Linux : pas de signature système équivalente ; la confiance passe par le dépôt ou la réputation.",
          "La signature s'intègre à la CI : les secrets de signature sont des secrets à protéger comme des mots de passe.",
        ],
      },
    ],
  },
  {
    id: "deep-links",
    title: "Deep links et protocoles personnalisés",
    level: 3,
    intro: "Ouvrir l'application depuis un lien.",
    blocks: [
      {
        kind: "text",
        text: "Un protocole personnalisé (`monapp://...`) permet d'ouvrir l'application depuis un navigateur ou un e-mail — pratique pour l'authentification OAuth ou les invitations. L'OS route l'URL vers l'application installée.",
      },
      {
        kind: "list",
        items: [
          "Déclarer le protocole dans la configuration du build pour chaque plateforme.",
          "Gérer le cas « application déjà ouverte » : la nouvelle URL arrive comme un événement, il faut la router vers la fenêtre existante.",
          "Valider les URL reçues : c'est une entrée externe, comme toute autre.",
        ],
      },
    ],
  },
  {
    id: "stockage-donnees",
    title: "Stocker les données",
    level: 3,
    intro: "Où mettre les préférences, les fichiers et les bases locales.",
    blocks: [
      {
        kind: "table",
        headers: ["Besoin", "Solution", "Emplacement"],
        rows: [
          ["Préférences simples", "Fichier JSON ou module de stockage clé-valeur", "`app.getPath('userData')`"],
          ["Données structurées locales", "SQLite embarqué", "`app.getPath('userData')`"],
          ["Fichiers utilisateur", "Dialogue natif + API fs de Node", "Dossier choisi par l'utilisateur"],
          ["Cache", "Fichiers temporaires", "`app.getPath('cache')`"],
        ],
      },
      {
        kind: "text",
        text: "`app.getPath()` donne les dossiers appropriés par plateforme (qui respectent les conventions de chaque OS). Ne jamais écrire en dur des chemins comme `C:\\...` ou `/home/...` : ils n'existent pas partout.",
      },
    ],
  },
  {
    id: "ipc-avance",
    title: "IPC avancé",
    level: 3,
    intro: "Au-delà de la requête-réponse : événements et canaux dédiés.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Événements main → renderer (progression)",
        code: `// main.js : notifier tous les renderers d'une progression\nfunction notifierProgression(pourcent) {\n  for (const win of BrowserWindow.getAllWindows()) {\n    win.webContents.send("progression", pourcent);\n  }\n}\n\n// preload.js : exposer l'écoute\ncontextBridge.exposeInMainWorld("api", {\n  onProgression: (callback) => ipcRenderer.on("progression", (_event, p) => callback(p)),\n});\n\n// renderer : réagir\nwindow.api.onProgression((p) => {\n  document.getElementById("barre").style.width = p + "%";\n});`,
      },
      {
        kind: "list",
        items: [
          "Motif requête-réponse (`invoke`/`handle`) : le renderer demande une action ou une donnée.",
          "Motif événement (`send`/`on`) : le main pousse des informations (progression, état, notifications).",
          "Nommer les canaux avec un préfixe par domaine (`dialog:...`, `fichier:...`) : ça évite les collisions et ça documente.",
          "Ne pas exposer de canaux génériques (« exécute cette fonction ») : chaque canal doit correspondre à une action précise et validée.",
        ],
      },
    ],
  },
  {
    id: "workers-et-processus",
    title: "Workers et processus utilitaires",
    level: 3,
    intro: "Ne jamais bloquer le main ni le renderer.",
    blocks: [
      {
        kind: "text",
        text: "Un calcul long dans le renderer fige l'interface ; dans le main, il fige toute l'application. Les tâches lourdes (traitement d'images, chiffrement, indexation) vont dans des Web Workers (côté renderer) ou des processus utilitaires Node (côté main).",
      },
      {
        kind: "list",
        items: [
          "Web Workers : pour les calculs liés à l'interface, sans accès au DOM.",
          "Processus utilitaires (`utilityProcess`) : du Node.js isolé piloté par le main, pour les tâches système lourdes.",
          "Le résultat revient par messages : l'architecture reste la même (pas de mémoire partagée), seule la charge est déplacée.",
        ],
      },
    ],
  },
  {
    id: "erreurs-natives",
    title: "Modules natifs",
    level: 3,
    intro: "Quand le JavaScript ne suffit pas.",
    blocks: [
      {
        kind: "text",
        text: "Certaines dépendances npm contiennent du code natif (C++) compilé : elles doivent être recompilées pour la version de Node embarquée par Electron (différente du Node système). L'outil standard s'appelle `electron-rebuild`.",
      },
      {
        kind: "list",
        items: [
          "Symptôme typique : `was compiled against a different Node.js version` au lancement.",
          "Préférer les dépendances 100 % JavaScript quand c'est possible : moins de friction au build et à la distribution.",
          "Les modules natifs compliquent la CI (compilation par plateforme) : à réserver aux vrais besoins (performance, accès matériel).",
        ],
      },
    ],
  },
  {
    id: "frameworks-ui",
    title: "Electron avec un framework UI",
    level: 3,
    intro: "React, Vue ou autre : le renderer reste une page web.",
    blocks: [
      {
        kind: "text",
        text: "Le renderer étant une page web ordinaire, n'importe quel framework frontend fonctionne : on construit l'interface avec son bundler habituel (Vite, par exemple), et le `loadFile` charge le HTML produit.",
      },
      {
        kind: "list",
        items: [
          "En développement : le bundler sert l'interface en local, Electron charge l'URL locale — le rechargement à chaud fonctionne.",
          "En production : on build l'interface en fichiers statiques, Electron les charge via `loadFile`.",
          "Le preload et l'IPC ne changent pas : le framework ne voit que l'API exposée par `contextBridge`.",
          "Attention à la CSP : les bundlers en mode dev utilisent parfois `eval`, à restreindre à l'environnement de développement.",
        ],
      },
    ],
  },
  {
    id: "panorama-alternatives",
    title: "Le panorama des alternatives",
    level: 3,
    intro: "Situer Electron parmi les approches desktop, factuellement.",
    blocks: [
      {
        kind: "table",
        headers: ["Approche", "Principe", "Profil"],
        rows: [
          ["Electron", "Chromium + Node, UI en web", "Équipes web, apps riches, distribution multi-OS rapide"],
          ["Tauri", "Webview système + backend Rust", "Apps légères où la taille et la mémoire comptent"],
          ["Frameworks natifs", "API de chaque OS (Cocoa, WinUI, Qt...)", "Intégration OS maximale, code par plateforme"],
          ["Flutter desktop", "Moteur de rendu propre, Dart", "Équipes déjà sur Flutter mobile"],
          ["PWA", "Application web installable", "Quand le hors-ligne et l'accès système limité suffisent"],
        ],
      },
      {
        kind: "text",
        text: "Aucune approche n'est universellement supérieure : Electron maximise la réutilisation des compétences web et la vitesse de développement multi-OS, au prix de l'empreinte. Le choix dépend des contraintes du projet : taille, performance, intégration OS, équipe.",
      },
    ],
  },
  {
    id: "distribution-ci",
    title: "Distribuer via CI",
    level: 3,
    intro: "Automatiser les builds multi-OS.",
    blocks: [
      {
        kind: "list",
        items: [
          "Une matrice CI avec un job par OS (Windows, macOS, Linux) : chaque plateforme produit son installateur natif.",
          "Les secrets de signature sont stockés dans les secrets de la CI, jamais dans le dépôt.",
          "Versionner via les tags Git : un tag déclenche le build, la signature et la publication de la release.",
          "Publier les artefacts (installateurs) sur les releases : c'est ce flux qu'`autoUpdater` consommera.",
          "Tester l'installateur produit par la CI, pas seulement le build local : les environnements diffèrent.",
        ],
      },
    ],
  },
  {
    id: "debogage-production",
    title: "Déboguer en production",
    level: 3,
    intro: "Comprendre les pannes chez l'utilisateur.",
    blocks: [
      {
        kind: "list",
        items: [
          "Journaliser dans un fichier (`app.getPath('logs')`) : en production, il n'y a pas de terminal pour voir les `console.log`.",
          "Capturer les erreurs non gérées dans le main et le renderer, avec le contexte (version, OS, action en cours).",
          "Les rapports de plantage (crashReporter) donnent les plantages natifs — à activer explicitement.",
          "Reproduire avec l'installateur exact de l'utilisateur : les bugs de chemins et de permissions n'apparaissent qu'en version packagée.",
          "Prévoir un moyen pour l'utilisateur d'exporter ses logs : le support commence par « envoyez-moi le fichier de log ».",
        ],
      },
    ],
  },
  {
    id: "projets",
    title: "Projets",
    level: 3,
    intro: "Progresser par la pratique, du minimal au distribué.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Fenêtre Hello World",
            detail: "Le projet du niveau 2 : main, preload, renderer, IPC de base. Comprendre la séparation des processus.",
          },
          {
            title: "Bloc-notes avec fichiers",
            detail: "Ouvrir, modifier, enregistrer des fichiers texte via dialog + fs côté main, IPC sécurisé. Le premier vrai usage du main.",
          },
          {
            title: "Application avec tray et notifications",
            detail: "Ajouter une icône tray persistante, des notifications natives, un menu d'application : l'intégration OS.",
          },
          {
            title: "Packaging multi-OS",
            detail: "Configurer electron-builder, produire les installateurs, les tester sur chaque OS, signer.",
          },
          {
            title: "Application complète avec auto-update",
            detail: "Stockage local, préférences, mises à jour automatiques, CI de release : le cycle de vie professionnel complet.",
          },
        ],
      },
    ],
  },
  {
    id: "ressources",
    title: "Ressources",
    level: 3,
    intro: "Aller plus loin, en commençant par la documentation officielle.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          {
            label: "Documentation Electron",
            value: "La référence complète : guides, API main/renderer, sécurité. Le point de départ et d'arrivée.",
          },
          {
            label: "Tutoriel officiel",
            value: "Construire sa première application pas à pas, avec les bonnes pratiques de sécurité.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Code source : le dépôt Electron sur GitHub pour comprendre les comportements limites et suivre les évolutions.",
          "Pratique : lire le code d'applications Electron open source pour voir les patterns réels (structure, IPC, packaging).",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Electron maîtrisé, voici les prolongements naturels dans la roadmap.",
    blocks: [
      {
        kind: "list",
        items: [
          "Renforcer l'interface : `react` ou `vue` pour des UI complexes, `typescript` pour fiabiliser le code.",
          "Approfondir le système : `nodejs` (le main est du Node.js), `testing` et `vitest`/`playwright` pour les tests.",
          "Explorer les alternatives : comparer factuellement avec d'autres approches selon les contraintes du projet.",
          "Revenir à la roadmap : valider Electron et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

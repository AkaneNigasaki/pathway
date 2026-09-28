import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de React Native : de zéro à un usage professionnel.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 * Cohérent avec le guide existant (composants natifs, Expo, navigation,
 * StyleSheet, Hermes, nouvelle architecture).
 */
export const LEARNING_REACT_NATIVE: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est React Native, ce qu'il n'est pas, et quand le choisir.",
    blocks: [
      {
        kind: "text",
        text: "React Native permet d'écrire des applications mobiles iOS et Android en React : même langage, mêmes hooks, mêmes outils de pensée. Mais le rendu n'est pas du HTML — ce sont de vrais composants natifs (`UIView` sur iOS, `View` Android) pilotés par JavaScript. L'app obtenue est une vraie app native, pas une page web emballée.",
      },
      {
        kind: "text",
        text: "Le compromis : une seule base de code pour deux plateformes, au prix d'apprendre les spécificités mobiles — navigation par piles d'écrans, permissions, cycle de vie, publication sur les stores, différences iOS/Android. Pour une équipe web React, c'est le chemin le plus court vers le mobile ; pour des besoins très natifs (jeux 3D, traitement temps réel), le natif pur reste pertinent.",
      },
      {
        kind: "text",
        text: "L'écosystème moderne s'articule autour d'Expo : outillage, build cloud (EAS), mises à jour OTA. On démarre avec Expo, on n'en sort que si un besoin natif spécifique l'exige — la grande majorité des apps n'en sort jamais.",
      },
    ],
  },
  {
    id: "rn-carte-mentale",
    title: "La carte mentale de React Native",
    level: 1,
    intro:
      "Le pont entre React et le natif, en un schéma.",
    blocks: [
      {
        kind: "diagram",
        title: "Comment React Native fonctionne",
        lines: [
          "Votre code : React (composants, hooks, TS)",
          "     │  JSX",
          "     ▼",
          "Composants RN : <View> <Text> <FlatList> …",
          "     │  nouvelle architecture (Fabric / TurboModules)",
          "     ▼",
          "Composants NATIFS : UIView (iOS) / android.View",
          "     │",
          "     ├─ Expo : caméra, notifications, capteurs, build",
          "     ├─ Navigation : piles, onglets, deep links",
          "     └─ JS : moteur Hermes",
          "",
          "Écrire une fois → compiler en apps iOS + Android",
        ],
      },
      {
        kind: "text",
        text: "Trois couches à comprendre : React (la logique, identique au web), les composants React Native (l'alphabet visuel mobile : `View`, `Text`, `Pressable`, `FlatList`), et la couche native (permissions, build, stores). Les bugs viennent presque toujours d'une confusion entre ces couches — par exemple styler comme sur le web un composant qui n'est pas du HTML.",
      },
      {
        kind: "list",
        items: [
          "Mêmes hooks et patterns que React web : l'investissement React est réutilisé.",
          "Pas de DOM, pas de CSS : `StyleSheet` + Flexbox, unités sans `px`.",
          "Expo d'abord : ne configurer du natif (Xcode/Android Studio) que si nécessaire.",
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
      "Ce qu'il faut maîtriser avant React Native, et pourquoi.",
    blocks: [
      {
        kind: "fields",
        title: "Fondations requises",
        fields: [
          {
            label: "React (`react`, `react-hooks`)",
            value:
              "Composants, props, hooks : React Native est React, seule la couche de rendu change.",
          },
          {
            label: "TypeScript",
            value:
              "Les projets Expo sont typés par défaut : props de navigation, styles et données d'API s'y vérifient.",
          },
          {
            label: "Flexbox",
            value:
              "Le seul système de layout : `flexDirection: \"column\"` par défaut (inverse du web). À pratiquer avant.",
          },
          {
            label: "Async / API REST",
            value:
              "Les apps mobiles consomment des API : `fetch`, états de chargement, gestion d'erreur.",
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
      "Créer un projet Expo et le lancer sur un téléphone.",
    blocks: [
      {
        kind: "command",
        label: "Créer un projet Expo",
        command: "npx create-expo-app@latest mon-app --template blank-typescript",
        why: "Crée un projet React Native + TypeScript géré par Expo : pas de Xcode ni d'Android Studio requis pour commencer. Le template `blank-typescript` donne une base propre et typée.",
        verify: "npx expo --version",
      },
      {
        kind: "command",
        label: "Lancer le serveur de développement",
        command: "npx expo start",
        why: "Démarre Metro (le bundler) et affiche un QR code : le scanner avec l'app Expo Go (iOS/Android) lance l'app sur un vrai téléphone, avec rechargement à chaud.",
        verify: "curl -s -o /dev/null -w \"%{http_code}\" http://localhost:8081",
      },
    ],
  },
  {
    id: "expo-vs-cli",
    title: "Expo vs React Native CLI",
    level: 2,
    intro:
      "Choisir son outillage en connaissance de cause.",
    blocks: [
      {
        kind: "table",
        headers: ["Aspect", "Expo (recommandé)", "React Native CLI"],
        rows: [
          ["Démarrage", "QR code + Expo Go, sans SDK natifs", "Xcode + Android Studio requis"],
          ["API natives", "Modules Expo (caméra, notifs…)", "Librairies tierces + code natif"],
          ["Build", "EAS Build (cloud)", "Local, configuration manuelle"],
          ["Sortie possible", "Oui : `npx expo prebuild`", "N/A (natif dès le départ)"],
          ["Cas d'usage", "La grande majorité des apps", "Modules natifs très spécifiques"],
        ],
      },
      {
        kind: "text",
        text: "Règle : commencer avec Expo, toujours. Si un besoin natif non couvert apparaît, `expo prebuild` génère les projets iOS/Android tout en gardant l'outillage Expo — on ne « quitte » plus vraiment Expo comme avant. Le CLI pur ne se justifie que pour des équipes natives déjà équipées.",
      },
    ],
  },
  {
    id: "premier-ecran",
    title: "Premier écran",
    level: 2,
    intro:
      "Le composant de base : `View`, `Text`, `Pressable`, état local.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Écran compteur",
        code: "import { useState } from \"react\";\nimport { Pressable, StyleSheet, Text, View } from \"react-native\";\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <View style={styles.container}>\n      <Text style={styles.title}>Compteur : {count}</Text>\n      <Pressable style={styles.button} onPress={() => setCount((c) => c + 1)}>\n        <Text style={styles.label}>+1</Text>\n      </Pressable>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, alignItems: \"center\", justifyContent: \"center\" },\n  title: { fontSize: 24, marginBottom: 16 },\n  button: { backgroundColor: \"#1A73E8\", padding: 12, borderRadius: 8 },\n  label: { color: \"white\", fontWeight: \"bold\" },\n});",
      },
      {
        kind: "text",
        text: "À noter : pas de `div` ni de `button` — `View` (conteneur), `Text` (tout texte doit être dans un `Text`), `Pressable` (interactions). Les styles sont des objets (`StyleSheet.create`), les nombres sont en points indépendants de la densité (`fontSize: 24`, pas `\"24px\"`). Les hooks fonctionnent exactement comme sur le web.",
      },
    ],
  },
  {
    id: "composants-natifs",
    title: "Les composants essentiels",
    level: 2,
    intro:
      "L'alphabet visuel : les dix composants qui couvrent 90 % des écrans.",
    blocks: [
      {
        kind: "fields",
        title: "Référence rapide",
        fields: [
          {
            label: "`View`",
            value:
              "Le conteneur universel (l'équivalent du `div`). Tout layout passe par lui.",
          },
          {
            label: "`Text`",
            value:
              "Tout texte affiché doit être dans un `Text` — y compris le texte dans un bouton.",
          },
          {
            label: "`Pressable`",
            value:
              "Zone tactile avec états (`pressed`) : boutons, cartes cliquables. Remplace `TouchableOpacity` dans le code moderne.",
          },
          {
            label: "`TextInput`",
            value:
              "Champ de saisie : `value`/`onChangeText`, `keyboardType`, `secureTextEntry` pour les mots de passe.",
          },
          {
            label: "`ScrollView`",
            value:
              "Contenu défilant court. Pour les longues listes : `FlatList`.",
          },
          {
            label: "`FlatList`",
            value:
              "Liste virtualisée : ne rend que les éléments visibles. `data`, `renderItem`, `keyExtractor` — obligatoire dès que ça défile beaucoup.",
          },
          {
            label: "`Image`",
            value:
              "Image locale (`require`) ou distante (`{ uri }`) : toujours préciser les dimensions pour le distant.",
          },
          {
            label: "`Modal` / `ActivityIndicator`",
            value:
              "Fenêtre modale native et indicateur de chargement.",
          },
          {
            label: "`SafeAreaView`",
            value:
              "Respecte les encoches et barres système (iPhone à encoche, gestes Android).",
          },
          {
            label: "`StatusBar`",
            value:
              "Contrôle la barre de statut (style clair/sombre, couleur de fond Android).",
          },
        ],
      },
    ],
  },
  {
    id: "navigation-bases",
    title: "Navigation : les bases",
    level: 2,
    intro:
      "Piles d'écrans et onglets avec React Navigation.",
    blocks: [
      {
        kind: "command",
        label: "Installer React Navigation",
        command: "npx expo install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context",
        why: "React Navigation est le routeur standard : `native-stack` pour les piles d'écrans, les deux derniers paquets sont ses dépendances natives requises.",
        verify: "npm list @react-navigation/native",
      },
      {
        kind: "code",
        language: "tsx",
        title: "Pile de navigation typée",
        code: "import { NavigationContainer } from \"@react-navigation/native\";\nimport { createNativeStackNavigator } from \"@react-navigation/native-stack\";\n\ntype RootStack = {\n  Accueil: undefined;\n  Détail: { id: string }; // paramètres typés\n};\n\nconst Stack = createNativeStackNavigator<RootStack>();\n\nexport default function App() {\n  return (\n    <NavigationContainer>\n      <Stack.Navigator>\n        <Stack.Screen name=\"Accueil\" component={Home} />\n        <Stack.Screen name=\"Détail\" component={Detail} />\n      </Stack.Navigator>\n    </NavigationContainer>\n  );\n}\n\n// Naviguer : navigation.navigate(\"Détail\", { id: \"42\" });",
      },
      {
        kind: "text",
        text: "Le pattern : un `Navigator` par structure (pile, onglets, tiroir), des `Screen` typés, navigation par nom + paramètres. Les onglets (`@react-navigation/bottom-tabs`) se combinent avec des piles imbriquées — un onglet = une pile. Alternative moderne : Expo Router (routage par fichiers, comme Next.js).",
      },
    ],
  },
  {
    id: "styles-flexbox",
    title: "Styles et Flexbox mobile",
    level: 2,
    intro:
      "Le layout mobile : Flexbox partout, quelques réflexes.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Carte responsive",
        code: "import { StyleSheet, useWindowDimensions } from \"react-native\";\n\nconst styles = StyleSheet.create({\n  card: {\n    flexDirection: \"row\", // horizontal (\"column\" par défaut)\n    alignItems: \"center\",\n    padding: 16,\n    marginHorizontal: 16,\n    borderRadius: 12,\n    backgroundColor: \"#fff\",\n    // Ombres : iOS et Android diffèrent\n    shadowColor: \"#000\", shadowOpacity: 0.1, shadowRadius: 8, // iOS\n    elevation: 3, // Android\n  },\n});\n\n// Dimensions réactives (rotation d'écran)\nconst { width } = useWindowDimensions();",
      },
      {
        kind: "text",
        text: "Différences web : `flexDirection: \"column\"` par défaut ; pas d'unités (`16`, pas `\"16px\"`) ; pas de cascade ni d'héritage (le style ne traverse pas les composants) ; ombres séparées iOS (`shadow*`) / Android (`elevation`) ; `useWindowDimensions` pour réagir à la rotation. Pour du style utilitaire façon Tailwind, NativeWind existe — mais maîtriser `StyleSheet` d'abord.",
      },
    ],
  },
  {
    id: "donnees-api",
    title: "Données : appeler une API",
    level: 2,
    intro:
      "Liste distante avec chargement et erreur : le motif de base.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "FlatList alimentée par fetch",
        code: "import { useEffect, useState } from \"react\";\nimport { ActivityIndicator, FlatList, Text, View } from \"react-native\";\n\ntype User = { id: number; name: string };\n\nexport function UserList() {\n  const [users, setUsers] = useState<User[]>([]);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    fetch(\"https://jsonplaceholder.typicode.com/users\")\n      .then((r) => r.json())\n      .then(setUsers)\n      .finally(() => setLoading(false));\n  }, []);\n\n  if (loading) return <ActivityIndicator size=\"large\" />;\n\n  return (\n    <FlatList\n      data={users}\n      keyExtractor={(u) => String(u.id)}\n      renderItem={({ item }) => (\n        <View style={{ padding: 16 }}>\n          <Text>{item.name}</Text>\n        </View>\n      )}\n    />\n  );\n}",
      },
      {
        kind: "text",
        text: "`fetch` fonctionne comme sur le web (attention : iOS exige HTTPS par défaut — App Transport Security). `FlatList` virtualise : seules les lignes visibles sont rendues, indispensable pour les longues listes. En production, TanStack Query apporte cache et états — le `useState`/`useEffect` ci-dessus est le point de départ pédagogique.",
      },
    ],
  },
  {
    id: "environnement-developpement",
    title: "Environnement de développement",
    level: 2,
    intro:
      "Tester sur téléphone et émulateur : le quotidien.",
    blocks: [
      {
        kind: "fields",
        title: "Boîte à outils",
        fields: [
          {
            label: "Expo Go",
            value:
              "App iOS/Android : scanne le QR de `npx expo start`, rechargement instantané. Idéal pour itérer sur l'UI.",
          },
          {
            label: "Émulateurs",
            value:
              "Android Studio (émulateur Android) et Xcode (simulateur iOS, Mac uniquement) : pour tester sans téléphone ou automatiser.",
          },
          {
            label: "Dev Menu",
            value:
              "Secouer le téléphone (ou `m` dans le terminal) : recharger, activer le fast refresh, ouvrir les DevTools.",
          },
          {
            label: "React DevTools",
            value:
              "Inspection des composants et de l'état, comme sur le web — via le dev menu.",
          },
          {
            label: "TypeScript strict",
            value:
              "Props de navigation, paramètres d'écrans, formes d'API : le typage attrape les erreurs avant le téléphone.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-professionnel",
    title: "Comment travaillent les professionnels",
    level: 2,
    intro:
      "Du code au store : le pipeline d'une app Expo.",
    blocks: [
      {
        kind: "diagram",
        title: "Cycle de vie d'une fonctionnalité mobile",
        lines: [
          "Maquette / spec",
          "     ↓",
          "Développement : Expo Go, fast refresh",
          "     ↓",
          "Build de dev : EAS (profil development)",
          "     ↓",
          "Tests : TestFlight (iOS) / Internal testing (Android)",
          "     ↓",
          "Build de prod : EAS Build → .aab / .ipa",
          "     ↓",
          "Publication : Play Store / App Store (+ review)",
          "     ↓",
          "Correctifs rapides : OTA (expo-updates), sans review",
        ],
      },
      {
        kind: "text",
        text: "La discipline mobile : tester tôt sur vrai téléphone (les émulateurs masquent les problèmes de perf et de tactile), versionner les builds, et réserver les mises à jour OTA au JavaScript — tout changement natif (permissions, modules) exige un nouveau build soumis aux stores.",
      },
    ],
  },
  {
    id: "debugging-rn",
    title: "Déboguer : les premiers réflexes",
    level: 2,
    intro:
      "Écran rouge, app qui freeze : la méthode.",
    blocks: [
      {
        kind: "list",
        items: [
          "Écran rouge (RedBox) ? Lire l'erreur en entier : la stack trace pointe le fichier et la ligne — 80 % des cas se règlent là.",
          "Changements invisibles ? Vérifier que le bundler Metro tourne et que le téléphone est sur le même réseau (ou tunnel `expo start --tunnel`).",
          "Erreur « Network request failed » ? iOS bloque HTTP non sécurisé : passer en HTTPS ou configurer ATS en dev.",
          "App lente sur téléphone mais fluide sur émulateur ? Tester en mode release : le mode dev est significativement plus lent.",
          "Comportement différent iOS/Android ? Chercher `Platform.OS` et les notes « iOS only » / « Android only » de la doc du composant.",
          "Cache Metro corrompu ? `npx expo start -c` vide le cache — le « redémarrage » du monde RN.",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes-rn",
    title: "Erreurs courantes",
    level: 2,
    intro:
      "Les pièges que tous les débutants rencontrent.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Texte hors `Text`",
            value:
              "« Text strings must be rendered within a `<Text>` component » : tout texte, même un espace conditionnel, doit être enveloppé.",
          },
          {
            label: "`ScrollView` pour une longue liste",
            value:
              "Rend tous les éléments d'un coup : mémoire saturée, scroll saccadé. `FlatList` dès que ça dépasse un écran.",
          },
          {
            label: "Dimensions en string",
            value:
              "`width: \"100%\"` fonctionne, mais `fontSize: \"16px\"` casse : les styles prennent des nombres, pas des CSS strings.",
          },
          {
            label: "Oublier `keyExtractor`",
            value:
              "Warning + réconciliation inefficace : toujours une clé stable (`String(item.id)`), jamais l'index.",
          },
          {
            label: "Tester uniquement sur émulateur",
            value:
              "Perfs, clavier, permissions, taille d'écran réelle : le téléphone révèle ce que l'émulateur cache.",
          },
          {
            label: "HTTP en production iOS",
            value:
              "App Transport Security bloque le HTTP : HTTPS obligatoire (sauf exception déclarée, à éviter).",
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
        title: "Débutant — Liste de tâches locale",
        fields: [
          { label: "À construire", value: "CRUD de todos avec persistance AsyncStorage, un écran, styles propres" },
          { label: "Objectif", value: "Composants de base, état local, persistance, FlatList" },
          { label: "Durée", value: "Quelques jours" },
        ],
      },
      {
        kind: "fields",
        title: "Intermédiaire — App météo multi-écrans",
        fields: [
          { label: "À construire", value: "Navigation (pile + onglets), appel API, géolocalisation, pull-to-refresh" },
          { label: "Objectif", value: "Navigation typée, données distantes, permissions" },
          { label: "Durée", value: "Une à deux semaines" },
        ],
      },
      {
        kind: "fields",
        title: "Avancé — Publication sur les stores",
        fields: [
          { label: "À construire", value: "App complète : EAS Build, notifications push, OTA, soumission TestFlight/Play" },
          { label: "Objectif", value: "Le pipeline professionnel de bout en bout" },
          { label: "Durée", value: "Trois semaines" },
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
            label: "reactnative.dev/docs",
            value: "La documentation officielle : composants, API, guides par plateforme.",
          },
          {
            label: "docs.expo.dev",
            value: "Documentation Expo : tutoriels, modules, EAS Build, soumission aux stores.",
          },
          {
            label: "reactnavigation.org",
            value: "Documentation React Navigation : piles, onglets, deep linking.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les trois projets progressifs de cette page, dans l'ordre.",
          "Réflexe : tester chaque écran sur un vrai téléphone, pas seulement l'émulateur.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "nouvelle-architecture",
    title: "La nouvelle architecture",
    level: 3,
    intro:
      "Fabric, TurboModules, Hermes : ce qui a changé sous le capot.",
    blocks: [
      {
        kind: "text",
        text: "L'ancienne architecture communiquait entre JS et natif via un pont asynchrone sérialisé (JSON) : chaque appel traversait une file, source de latence. La nouvelle architecture, activée par défaut depuis React Native 0.76 : Fabric (rendu avec un graphe de vues partagé C++, synchrone quand nécessaire), TurboModules (modules natifs typés, chargés à la demande via JSI), et Hermes comme moteur JS.",
      },
      {
        kind: "list",
        items: [
          "Conséquence pratique : les librairies doivent supporter la nouvelle architecture — vérifier la compatibilité avant d'ajouter une dépendance native.",
          "Codegen : les specs TypeScript des modules natifs génèrent le code d'interface — moins de code natif manuel.",
          "Le pont historique reste compris par compatibilité, mais le nouveau code doit viser Fabric/TurboModules.",
        ],
      },
    ],
  },
  {
    id: "hermes-moteur",
    title: "Hermes : le moteur JavaScript",
    level: 3,
    intro:
      "Le moteur pensé pour le mobile : démarrage rapide, mémoire contenue.",
    blocks: [
      {
        kind: "text",
        text: "Hermes est le moteur JS par défaut de React Native : il compile le JavaScript en bytecode à l'avance (au build), ce qui réduit le temps de démarrage (pas de parsing à froid) et la mémoire. Il implémente le standard ECMAScript moderne — l'essentiel y est, avec quelques différences documentées par rapport à V8/JSC.",
      },
      {
        kind: "list",
        items: [
          "En dev, Metro sert du JS non optimisé : toujours mesurer les perfs en build release.",
          "Les `console.log` en production Hermes sont silencieux sans configuration — utiliser un vrai système de logs distant (Sentry).",
          "Sentry et les outils de crash reporting symbolisent les stack traces Hermes via les sourcemaps du build.",
        ],
      },
    ],
  },
  {
    id: "flatlist-performance",
    title: "FlatList : performance",
    level: 3,
    intro:
      "La virtualisation bien réglée : le composant le plus critique des apps.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "FlatList optimisée",
        code: "import { FlatList } from \"react-native\";\n\n<FlatList\n  data={items}\n  keyExtractor={(item) => item.id}\n  renderItem={renderItem}          // fonction mémorisée (useCallback)\n  getItemLayout={(_, index) => (   // hauteur fixe connue -> scroll précis\n    { length: 72, offset: 72 * index, index }\n  )}\n  initialNumToRender={10}\n  maxToRenderPerBatch={10}\n  windowSize={5}                   // fenêtres rendues autour du viewport\n  removeClippedSubviews           // démonte hors écran (Android)\n  onEndReached={loadMore}          // pagination infinie\n  onEndReachedThreshold={0.5}\n/>\n",
      },
      {
        kind: "text",
        text: "`getItemLayout` est le réglage le plus rentable pour les lignes de hauteur fixe : scroll vers un index instantané, indicateur précis. `renderItem` doit être stable (`useCallback`) et la ligne mémorisée (`React.memo`) — sinon chaque scroll re-rend tout. Pour des layouts hétérogènes complexes, FlashList (Shopify) pousse la virtualisation plus loin.",
      },
    ],
  },
  {
    id: "navigation-avancee",
    title: "Navigation avancée",
    level: 3,
    intro:
      "Deep linking, état de navigation, gardes : la navigation pro.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Deep linking",
        code: "import { NavigationContainer } from \"@react-navigation/native\";\n\nconst linking = {\n  prefixes: [\"monapp://\", \"https://monapp.com\"],\n  config: {\n    screens: {\n      Accueil: \"accueil\",\n      Détail: \"detail/:id\", // monapp://detail/42\n    },\n  },\n};\n\n<NavigationContainer linking={linking}>{/* … */}</NavigationContainer>;",
      },
      {
        kind: "text",
        text: "Le `linking` mappe URLs ↔ écrans : un lien `monapp://detail/42` ouvre l'app sur le bon écran avec le bon paramètre — indispensable pour les notifications push et le partage. À configurer aussi côté natif (schéma d'URL iOS, intent-filter Android ; Expo le fait via `app.json`). Autres sujets : persister l'état de navigation (`onStateChange` + restore), gardes d'authentification (pile conditionnelle selon la session), et typage global des paramètres.",
      },
    ],
  },
  {
    id: "animations-reanimated",
    title: "Animations (Reanimated)",
    level: 3,
    intro:
      "60 fps : les animations sur le thread UI avec Reanimated.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Animation d'entrée",
        code: "import Animated, {\n  useAnimatedStyle,\n  useSharedValue,\n  withSpring,\n} from \"react-native-reanimated\";\n\nfunction Card() {\n  const scale = useSharedValue(0.8); // valeur partagée (thread UI)\n\n  const style = useAnimatedStyle(() => ({\n    transform: [{ scale: withSpring(scale.value) }],\n  }));\n\n  return (\n    <Animated.View style={style}>\n      <Pressable onPress={() => { scale.value = 1; }} />\n    </Animated.View>\n  );\n}",
      },
      {
        kind: "text",
        text: "Reanimated exécute les animations sur le thread UI : même si le JS est occupé, l'animation reste fluide. Concepts : `useSharedValue` (valeur lue/écrite des deux threads), `useAnimatedStyle` (style réactif), `withSpring`/`withTiming` (physique). L'API `Animated` de base suffit pour les fondus simples ; Reanimated s'impose pour les gestes et les interactions (voir Gestes).",
      },
    ],
  },
  {
    id: "gestes",
    title: "Gestes tactiles",
    level: 3,
    intro:
      "Swipe, drag, pinch : la gestuelle avec Gesture Handler.",
    blocks: [
      {
        kind: "text",
        text: "Les gestes complexes (glisser une carte, pincer une image) dépassent `Pressable` : `react-native-gesture-handler` fournit des reconnaisseurs (`Pan`, `Pinch`, `Tap`) qui tournent sur le thread UI et se composent avec Reanimated. Le pattern : `Gesture.Pan().onUpdate(e => { x.value = e.translationX })` + style animé — le suivi de doigt est à 60 fps sans passer par le JS.",
      },
      {
        kind: "list",
        items: [
          "En Expo, le paquet est pré-intégré : l'installer suffit, pas de config native.",
          "Composer les gestes : `Gesture.Race(pan, tap)` ou `Gesture.Simultaneous` pour les interactions riches.",
          "Toujours prévoir le retour haptique (`expo-haptics`) sur les gestes validés : le tactile se « sent ».",
        ],
      },
    ],
  },
  {
    id: "images-medias",
    title: "Images et médias",
    level: 3,
    intro:
      "Chargement, cache, tailles : les images sont le premier poste de perf.",
    blocks: [
      {
        kind: "fields",
        title: "Bonnes pratiques",
        fields: [
          {
            label: "Dimensions obligatoires",
            value:
              "Une image distante sans `width`/`height` ne s'affiche pas (taille 0). Les déclarer ou les mesurer.",
          },
          {
            label: "Tailles adaptées",
            value:
              "Servir des images à la taille d'affichage (pas du 4000px pour une vignette 80px) : `resizeMode`, URLs avec paramètres de taille.",
          },
          {
            label: "Cache",
            value:
              "`expo-image` (recommandé) : cache disque/mémoire, transitions de chargement, formats modernes — remplace avantageusement `Image` de base.",
          },
          {
            label: "Assets locaux",
            value:
              "`require(\"./img/logo.png\")` avec déclinaisons `@2x`/`@3x` : le bundler choisit la densité.",
          },
        ],
      },
    ],
  },
  {
    id: "permissions",
    title: "Permissions",
    level: 3,
    intro:
      "Caméra, localisation, notifications : demander au bon moment.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Demande de permission (Expo)",
        code: "import * as Location from \"expo-location\";\n\nasync function enableLocation() {\n  // 1. Expliquer POURQUOI avant de demander (écran dédié)\n  // 2. Demander\n  const { status } = await Location.requestForegroundPermissionsAsync();\n  if (status !== \"granted\") {\n    // 3. Dégrader gracieusement : mode sans localisation\n    return null;\n  }\n  return await Location.getCurrentPositionAsync({});\n}",
      },
      {
        kind: "text",
        text: "Règles : déclarer les permissions dans `app.json` (sinon refusées silencieusement), demander en contexte (quand l'utilisateur touche la fonctionnalité, pas au lancement), expliquer le pourquoi avant le dialogue système, et toujours prévoir le refus (mode dégradé). Sur iOS, les clés `NS*UsageDescription` sont obligatoires — sans texte, l'app est rejetée à la review.",
      },
    ],
  },
  {
    id: "persistance-locale",
    title: "Persistance locale",
    level: 3,
    intro:
      "AsyncStorage, SecureStore, MMKV : choisir son stockage.",
    blocks: [
      {
        kind: "table",
        headers: ["Solution", "Usage", "Notes"],
        rows: [
          ["AsyncStorage", "Préférences, caches simples", "Asynchrone, non chiffré, ~6 Mo conseillés max"],
          ["expo-secure-store", "Tokens, secrets", "Chiffré (Keychain/Keystore), petites valeurs"],
          ["react-native-mmkv", "État fréquent, caches", "Synchrone, très rapide, chiffré en option"],
          ["expo-sqlite", "Données relationnelles", "Vraie base locale, requêtes SQL"],
        ],
      },
      {
        kind: "text",
        text: "Règle : jamais de secret dans AsyncStorage (lisible en clair) — `expo-secure-store` pour les tokens. MMKV remplace avantageusement AsyncStorage quand les lectures sont fréquentes (synchrone = pas de `await`). Pour du relationnel offline (catalogue, historique), `expo-sqlite` évite de réinventer une base.",
      },
    ],
  },
  {
    id: "reseau-rn",
    title: "Réseau avancé",
    level: 3,
    intro:
      "Timeouts, retries, uploads : le réseau mobile est hostile.",
    blocks: [
      {
        kind: "list",
        items: [
          "`fetch` n'a pas de timeout : l'envelopper avec `AbortController` (timeout 15-30 s) pour ne pas pendre indéfiniment.",
          "Retries avec backoff exponentiel sur les erreurs réseau (pas sur les 4xx) : TanStack Query le fait nativement.",
          "Détecter la connectivité (`@react-native-community/netinfo`) : file d'attente offline, bannière « hors ligne », reprise auto.",
          "Uploads : `expo-file-system` avec reprise (`uploadAsync`, sessions) pour les gros fichiers — pas de `fetch` avec un blob de 200 Mo.",
          "HTTPS partout ; certificate pinning pour les apps sensibles (bancaire, santé).",
        ],
      },
    ],
  },
  {
    id: "push-notifications",
    title: "Notifications push",
    level: 3,
    intro:
      "Expo Push : de la permission au deep link.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Demander la permission",
            detail:
              "`expo-notifications` : `requestPermissionsAsync()` — en contexte, avec explication préalable.",
          },
          {
            title: "Obtenir le token",
            detail:
              "`getExpoPushTokenAsync()` : identifiant de l'appareil, à envoyer au backend.",
          },
          {
            title: "Envoyer depuis le serveur",
            detail:
              "Le backend appelle l'API Expo Push (ou FCM/APNs en direct) avec le token.",
          },
          {
            title: "Gérer le tap",
            detail:
              "`addNotificationResponseReceivedListener` : deep link vers l'écran concerné (voir Navigation avancée).",
          },
          {
            title: "Canaux Android",
            detail:
              "Définir les canaux (`setNotificationChannelAsync`) : importance, son, vibration — sans canal, pas de notification sur Android 8+.",
          },
        ],
      },
    ],
  },
  {
    id: "ota-updates",
    title: "Mises à jour OTA",
    level: 3,
    intro:
      "Corriger sans passer par les stores : `expo-updates`.",
    blocks: [
      {
        kind: "text",
        text: "Les mises à jour Over-The-Air poussent du JavaScript (et des assets) sans nouvelle soumission aux stores : idéal pour corriger un bug ou un texte. Limites strictes : uniquement le JS — tout changement natif (nouvelle permission, nouveau module natif, bump de SDK) exige un build. Stratégie : canal `production` stable, déploiement progressif, rollback possible depuis le dashboard Expo.",
      },
      {
        kind: "list",
        items: [
          "Ne jamais OTA-iser un changement qui exige du natif : l'app planterait sur l'ancien binaire.",
          "Tester l'OTA sur un build release réel, pas sur Expo Go.",
          "Informer l'utilisateur d'un redémarrage si la mise à jour est critique (`reloadAsync`).",
        ],
      },
    ],
  },
  {
    id: "build-publication",
    title: "Build et publication",
    level: 3,
    intro:
      "EAS Build → stores : le pipeline de sortie.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Profils EAS",
        code: "# eas.json : development (Expo Go custom), preview (APK partageable), production\nnpx eas-cli build --profile preview --platform android  # APK de test\nnpx eas-cli build --profile production --platform all  # .aab + .ipa\nnpx eas-cli submit --platform ios                      # envoi App Store Connect",
      },
      {
        kind: "text",
        text: "EAS Build compile dans le cloud : pas besoin de Mac pour produire un `.ipa` (compilé sur infra Expo). Soumission : `eas submit` envoie vers Play Console / App Store Connect. Prévoir les délais de review Apple (1-2 jours typiquement, plus au premier envoi), les captures d'écran par taille d'appareil, et la politique de confidentialité (obligatoire).",
      },
    ],
  },
  {
    id: "etat-rn",
    title: "État global côté mobile",
    level: 3,
    intro:
      "Zustand + MMKV : le duo standard des apps RN.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Store persistant avec MMKV",
        code: "import { create } from \"zustand\";\nimport { createJSONStorage, persist } from \"zustand/middleware\";\nimport { MMKV } from \"react-native-mmkv\";\n\nconst storage = new MMKV();\n\ntype Session = { token: string | null; login: (t: string) => void };\n\nexport const useSession = create<Session>()(\n  persist(\n    (set) => ({\n      token: null,\n      login: (token) => set({ token }),\n    }),\n    {\n      name: \"session\",\n      storage: createJSONStorage(() => ({\n        getItem: (k) => storage.getString(k) ?? null,\n        setItem: (k, v) => storage.set(k, v),\n        removeItem: (k) => storage.delete(k),\n      })),\n    }\n  )\n);",
      },
      {
        kind: "text",
        text: "Le token de session illustre la règle : état global (Zustand) + persistance synchrone (MMKV) — pas d'AsyncStorage pour ce qui est lu à chaque démarrage. Attention : le token lui-même irait plutôt dans `expo-secure-store` (chiffré) ; MMKV ne chiffre que si configuré. Voir `react-state` pour les patterns (sélecteurs, middlewares).",
      },
    ],
  },
  {
    id: "offline-first",
    title: "Offline-first",
    level: 3,
    intro:
      "L'app qui marche dans le métro : stratégie hors ligne.",
    blocks: [
      {
        kind: "fields",
        title: "Stratégie",
        fields: [
          {
            label: "Lecture",
            value:
              "Cache persistant (TanStack Query + persister, ou SQLite) : afficher les dernières données connues avec un indicateur « hors ligne ».",
          },
          {
            label: "Écriture",
            value:
              "File d'attente locale des mutations : stocker l'intention, rejouer à la reconnexion (`NetInfo` + `onlineManager`).",
          },
          {
            label: "Conflits",
            value:
              "Définir la politique : dernier écrivain gagne (simple), ou merge serveur (robuste). L'ignorer, c'est perdre des données.",
          },
          {
            label: "UX",
            value:
              "Toujours indiquer l'état : bannière offline, badge « en attente de synchro », jamais de spinner infini.",
          },
        ],
      },
    ],
  },
  {
    id: "securite-rn",
    title: "Sécurité mobile",
    level: 3,
    intro:
      "Le téléphone est un environnement hostile : les règles minimales.",
    blocks: [
      {
        kind: "list",
        items: [
          "Secrets dans `expo-secure-store` (Keychain/Keystore), jamais en AsyncStorage ni en dur dans le JS.",
          "Le JS bundle est lisible : aucune clé API secrète côté client — passer par un backend.",
          "Biométrie (`expo-local-authentication`) pour déverrouiller les zones sensibles, pas pour « chiffrer ».",
          "Certificate pinning sur les apps sensibles ; à défaut, HTTPS strict partout.",
          "Ne pas logger de données personnelles ; configurer Sentry pour expurger les champs sensibles.",
          "Root/jailbreak : détecter (`expo-device` + librairies) et dégrader, pas bloquer naïvement.",
        ],
      },
    ],
  },
  {
    id: "modules-natifs-panorama",
    title: "Modules natifs : panorama",
    level: 3,
    intro:
      "Quand Expo ne suffit pas : écrire du pont natif.",
    blocks: [
      {
        kind: "text",
        text: "Un module natif expose du code Swift/Kotlin à JavaScript (capteur propriétaire, SDK tiers sans wrapper). Avec Expo : `expo prebuild` puis module local, ou config plugin. Avec la nouvelle architecture, les TurboModules se déclarent via Codegen (spec TypeScript → interfaces natives générées). C'est du développement natif — à réserver aux cas où aucune librairie n'existe, car chaque module natif est une dette de maintenance (deux plateformes, mises à jour RN).",
      },
    ],
  },
  {
    id: "testing-rn",
    title: "Tester une app mobile",
    level: 3,
    intro:
      "Trois niveaux : unitaire, composants, end-to-end.",
    blocks: [
      {
        kind: "fields",
        title: "Pyramide de tests",
        fields: [
          {
            label: "Unitaire (Jest)",
            value:
              "Logique pure : stores, formatage, validation. Jest est préconfiguré dans le template Expo.",
          },
          {
            label: "Composants",
            value:
              "`@testing-library/react-native` : rendre un écran, simuler `fireEvent.press`, vérifier le texte affiché. Mocker les modules natifs.",
          },
          {
            label: "E2E (Maestro/Detox)",
            value:
              "Maestro (simple, YAML) ou Detox : piloter l'app réelle sur émulateur — parcours critiques (onboarding, achat).",
          },
        ],
      },
      {
        kind: "text",
        text: "Spécificité mobile : mocker les modules natifs en tests composants (permissions, capteurs), et réserver l'E2E aux parcours qui rapportent (un test E2E coûte cher à maintenir). Les tests de navigation (deep links) se font au niveau E2E.",
      },
    ],
  },
  {
    id: "typescript-rn",
    title: "TypeScript en React Native",
    level: 3,
    intro:
      "Typer la navigation, les assets et les modules natifs.",
    blocks: [
      {
        kind: "code",
        language: "tsx",
        title: "Navigation typée de bout en bout",
        code: "import type { NativeStackScreenProps } from \"@react-navigation/native-stack\";\n\ntype RootStack = {\n  Accueil: undefined;\n  Détail: { id: string };\n};\n\ntype Props = NativeStackScreenProps<RootStack, \"Détail\">;\n\nfunction Detail({ route, navigation }: Props) {\n  const { id } = route.params; // string, typé\n  // navigation.navigate(\"Accueil\") : les noms sont vérifiés\n  return null;\n}",
      },
      {
        kind: "text",
        text: "Le typage de la navigation (`RootStack` global) élimine les erreurs de nom d'écran et de paramètres — la source n°1 de crashs en navigation. Autres points : déclarer les assets (`declare module \"*.png\"`), typer les réponses d'API (zod côté client), et les thèmes de style.",
      },
    ],
  },
  {
    id: "performance-rn",
    title: "Performance mobile",
    level: 3,
    intro:
      "Le téléphone pardonne moins : mesurer en release, optimiser ciblé.",
    blocks: [
      {
        kind: "fields",
        title: "Leviers",
        fields: [
          {
            label: "Mesurer en release",
            value:
              "Le mode dev est 2-5× plus lent : tout benchmark se fait sur un build release, sur un vrai appareil milieu de gamme.",
          },
          {
            label: "Listes",
            value:
              "FlatList réglée (voir section dédiée) : c'est le premier poste de jank.",
          },
          {
            label: "Images",
            value:
              "Tailles adaptées + `expo-image` : le second poste.",
          },
          {
            label: "Re-rendus",
            value:
              "Mêmes règles que le web (sélecteurs fins, état bas) — mais le budget frame est plus serré (16 ms).",
          },
          {
            label: "Bundle",
            value:
              "Analyser avec `npx expo export` + visualiseur : les librairies lourdes se voient au démarrage (Hermes compile tout).",
          },
          {
            label: "Animations",
            value:
              "Thread UI (Reanimated) : jamais d'animation pilotée par `setState` à 60 Hz.",
          },
        ],
      },
    ],
  },
  {
    id: "debugging-avance",
    title: "Débogage avancé",
    level: 3,
    intro:
      "Au-delà de l'écran rouge : profiler et tracer.",
    blocks: [
      {
        kind: "list",
        items: [
          "Flipper (Meta) : inspecter le réseau, les bases locales, les logs — le DevTools système des apps RN.",
          "Sentry : crash reporting avec sourcemaps Hermes — indispensable dès la première version TestFlight.",
          "Profiler Hermes : `npx expo start` + profilage CPU pour les lenteurs JS ; Xcode Instruments / Android Profiler pour le natif.",
          "Bissecter : reproduire sur iOS ET Android, en dev ET en release — le quadrant isole la couche fautive.",
          "`npx expo start -c` (cache), `npx expo prebuild --clean` (natif régénéré) : les deux niveaux de « tout réinitialiser ».",
        ],
      },
    ],
  },
  {
    id: "anti-patterns-rn",
    title: "Anti-patterns",
    level: 3,
    intro:
      "Les mauvais réflexes mobile — et par quoi les remplacer.",
    blocks: [
      {
        kind: "fields",
        title: "Catalogue",
        fields: [
          {
            label: "Penser web",
            value:
              "`div`, `px`, `:hover`, `window` : le réflexe web produit du code qui casse. Penser composants natifs.",
          },
          {
            label: "ScrollView fourre-tout",
            value:
              "Listes longues non virtualisées : jank et OOM. FlatList/FlashList.",
          },
          {
            label: "Clavier non géré",
            value:
              "Le clavier recouvre les champs : `KeyboardAvoidingView` (iOS) + `android:windowSoftInputMode` — à tester sur vrai téléphone.",
          },
          {
            label: "Permissions au lancement",
            value:
              "Demander localisation + notifs + caméra d'emblée : refus massif. En contexte, avec explication.",
          },
          {
            label: "État global pour tout",
            value:
              "Mêmes règles que le web : local d'abord (voir `react-state`).",
          },
          {
            label: "Tester sur un seul OS",
            value:
              "Les différences iOS/Android sont réelles (ombres, permissions, back button) : tester les deux avant chaque release.",
          },
        ],
      },
    ],
  },
  {
    id: "checklist-rn",
    title: "Checklist de revue",
    level: 3,
    intro:
      "Avant de merger : les questions à se poser sur chaque écran.",
    blocks: [
      {
        kind: "list",
        items: [
          "Tout texte est-il dans un `<Text>` ?",
          "Les listes défilantes utilisent-elles `FlatList` avec `keyExtractor` ?",
          "Les images distantes ont-elles des dimensions et des tailles adaptées ?",
          "Le clavier ne recouvre-t-il aucun champ (testé sur téléphone) ?",
          "Les permissions sont-elles demandées en contexte, avec mode dégradé ?",
          "La navigation est-elle typée (noms d'écrans, paramètres) ?",
          "Les secrets sont-ils dans SecureStore, pas en dur ?",
          "Testé sur iOS ET Android, en mode release ?",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro:
      "React Native maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "`react-hooks` : les fondations — effets, refs et custom hooks, identiques sur mobile.",
          "`react-state` : l'état global (Zustand, TanStack Query) structure les apps multi-écrans.",
          "`react` : le modèle de rendu — comprendre ce que chaque état déclenche.",
          "Expo Router : le routage par fichiers, l'alternative moderne à React Navigation.",
          "Revenir à la roadmap : valider React Native et passer à la compétence suivante du parcours.",
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
            label: "reactnative.dev/docs/new-architecture",
            value: "La nouvelle architecture : concepts et migration.",
          },
          {
            label: "docs.expo.dev/eas",
            value: "EAS Build, Submit, Updates : le pipeline complet.",
          },
          {
            label: "docs.swmansion.com/react-native-reanimated",
            value: "Documentation Reanimated : animations et gestes.",
          },
          {
            label: "reactnative.dev/docs/performance",
            value: "Le guide officiel des performances.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : les trois projets progressifs de cette page, dans l'ordre.",
          "Réflexe durable : chaque écran testé sur un vrai téléphone, sur les deux OS.",
        ],
      },
    ],
  },
];

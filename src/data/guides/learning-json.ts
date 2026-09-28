import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète de JSON : du premier objet aux schémas,
 * en passant par jq et les pièges du format.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_JSON: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est JSON, d'où il vient et pourquoi il est partout.",
    blocks: [
      {
        kind: "text",
        text: "JSON (JavaScript Object Notation) est un format texte pour représenter des données structurées : objets, tableaux, chaînes, nombres, booléens et null. Lisible par les humains, directement exploitable par les machines — ce double lectorat fait son succès.",
      },
      {
        kind: "text",
        text: "Pourquoi JSON existe : échanger des données entre systèmes exige un format commun, lisible et simple à produire comme à parser. JSON a gagné parce qu'il est minimal (six types, une grammaire minuscule), dérivé d'une syntaxe que les développeurs connaissaient déjà, et supporté nativement par quasiment tous les langages.",
      },
      {
        kind: "text",
        text: "Où on le rencontre : réponses d'API REST, fichiers de configuration (`package.json`, `tsconfig.json`), stockage de documents (MongoDB et cousins), échanges entre services, exports de données. Savoir le lire, le valider et le manipuler est un prérequis à presque tout le développement moderne.",
      },
    ],
  },
  {
    id: "json-n-est-pas-javascript",
    title: "JSON n'est pas JavaScript",
    level: 1,
    intro:
      "La syntaxe ressemble à du JavaScript, mais les règles sont plus strictes.",
    blocks: [
      {
        kind: "diagram",
        title: "Objet JavaScript vs JSON",
        lines: [
          "JavaScript (souple)",
          "     │",
          "     ├── { nom: 'Akane', }   ← quotes simples OK",
          "     ├── { age: 25, }        ← virgule finale OK",
          "     └── { // commentaire }  ← commentaires OK",
          "     │",
          "JSON (strict)",
          "     │",
          "     ├── { \"nom\": \"Akane\" }  ← doubles quotes obligatoires",
          "     ├── { \"age\": 25 }       ← pas de virgule finale",
          "     └── pas de commentaires, pas de fonctions",
        ],
      },
      {
        kind: "text",
        text: "Concrètement : tout JSON valide est une valeur JavaScript valide, mais l'inverse est faux. Les clés sont toujours entre doubles quotes, les virgules finales interdites, les commentaires interdits, et seuls six types existent. Un « JSON » qui ne respecte pas ces règles n'est pas du JSON — c'est la cause la plus fréquente d'erreurs de parsing.",
      },
      {
        kind: "list",
        items: [
          "JSON = format de données, pas langage : pas de fonctions, pas de variables, pas de logique.",
          "Le nom vient de JavaScript, mais tous les langages le lisent et l'écrivent.",
          "La spécification tient en quelques pages : c'est volontaire, la simplicité est le produit.",
        ],
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 2 — PRATIQUE
  // ------------------------------------------------------------------
  {
    id: "syntaxe-de-base",
    title: "Syntaxe de base",
    level: 2,
    intro:
      "Le premier document JSON, décortiqué.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "utilisateur.json",
        code: `{\n  "nom": "Akane",\n  "age": 25,\n  "actif": true,\n  "tags": ["dev", "gaming"],\n  "adresse": {\n    "ville": "Paris",\n    "code": "75001"\n  },\n  "surnom": null\n}`,
      },
      {
        kind: "text",
        text: "Lecture : un objet entre accolades contient des paires `clé: valeur`, séparées par des virgules. Les valeurs peuvent être des chaînes, nombres, booléens, `null`, tableaux ou objets imbriqués. L'indentation est libre — elle ne sert qu'à la lisibilité humaine.",
      },
    ],
  },
  {
    id: "les-six-types",
    title: "Les six types",
    level: 2,
    intro:
      "Tout JSON se construit avec six types, pas un de plus.",
    blocks: [
      {
        kind: "table",
        headers: ["Type", "Exemple", "Note"],
        rows: [
          ["Chaîne", `"bonjour"`, "Toujours entre doubles quotes"],
          ["Nombre", `42`, `-3.14`, "Pas de NaN, pas d'Infinity, pas d'hexadécimal"],
          ["Booléen", "`true` / `false`", "Minuscules, comme en JavaScript"],
          ["Null", "`null`", "L'absence de valeur explicite"],
          ["Tableau", `[1, "deux"]`, "Ordonné, hétérogène autorisé"],
          ["Objet", `{"a": 1}`, "Paires clé/valeur, clés toujours en chaînes"],
        ],
      },
      {
        kind: "text",
        text: "Pas de dates, pas d'undefined, pas de fonctions : ces notions n'existent pas en JSON. Une date se représente comme une chaîne (en ISO 8601, voir le niveau 3), une valeur absente comme `null` ou par l'omission de la clé — deux choix aux sens différents.",
      },
    ],
  },
  {
    id: "objets",
    title: "Objets",
    level: 2,
    intro:
      "La structure de base : des paires clé/valeur pour représenter une entité.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "Un objet bien formé",
        code: `{\n  "id": 42,\n  "email": "akane@exemple.com",\n  "roles": ["admin", "dev"],\n  "preferences": {\n    "theme": "sombre",\n    "notifications": false\n  }\n}`,
      },
      {
        kind: "list",
        items: [
          "Les clés sont des chaînes entre doubles quotes, uniques dans l'objet.",
          "L'ordre des clés n'a pas de signification : ne jamais dépendre de l'ordre d'un objet.",
          "Imbrication libre : un objet peut contenir des objets, qui contiennent des tableaux…",
          "Convention de nommage : `camelCase` ou `snake_case` selon l'écosystème — l'essentiel est la cohérence (voir niveau 3).",
        ],
      },
    ],
  },
  {
    id: "tableaux",
    title: "Tableaux",
    level: 2,
    intro:
      "Des listes ordonnées entre crochets : pour les collections.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "Tableau d'objets : le cas typique d'une API",
        code: `[\n  { "id": 1, "nom": "Alice" },\n  { "id": 2, "nom": "Bruno" },\n  { "id": 3, "nom": "Chloé" }\n]`,
      },
      {
        kind: "text",
        text: "Un tableau est ordonné : l'ordre des éléments a un sens (contrairement aux clés d'objet). Le cas dominant en pratique : un tableau d'objets de même forme — c'est ce que renvoient les API pour les listes. L'hétérogénéité est autorisée par le format mais rare dans les API bien conçues.",
      },
    ],
  },
  {
    id: "regles-strictes",
    title: "Les règles strictes",
    level: 2,
    intro:
      "Ce que JSON interdit — et que les débutants écrivent quand même.",
    blocks: [
      {
        kind: "table",
        headers: ["Interdit", "Exemple fautif", "Correction"],
        rows: [
          ["Virgule finale", "`{\"a\": 1,}`", "Retirer la virgule"],
          ["Quotes simples", "`{'a': 1}`", "Doubles quotes : `{\"a\": 1}`"],
          ["Commentaires", "`{\"a\": 1 // id}`", "Supprimer le commentaire"],
          ["Clés non quotées", "`{a: 1}`", "Quoter : `{\"a\": 1}`"],
          ["Nombres spéciaux", "`NaN`, `Infinity`", "`null` ou chaîne"],
        ],
      },
      {
        kind: "text",
        text: "Ces règles sont la raison d'être des validateurs : un œil humain rate facilement une virgule finale sur un fichier de 500 lignes. Les éditeurs modernes signalent ces erreurs en direct ; en cas de doute, un validateur tranche.",
      },
    ],
  },
  {
    id: "lire-json",
    title: "Lire : JSON.parse",
    level: 2,
    intro:
      "Convertir une chaîne JSON en objet manipulable dans le code.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Parser une réponse",
        code: `const texte = '{"nom": "Akane", "age": 25}';\nconst user = JSON.parse(texte);\n\nconsole.log(user.nom); // Akane\nconsole.log(user.age + 1); // 26 : c'est un vrai nombre`,
      },
      {
        kind: "code",
        language: "javascript",
        title: "Parser en sécurité",
        code: `let config;\ntry {\n  config = JSON.parse(contenuFichier);\n} catch (erreur) {\n  console.error("JSON invalide :", erreur.message);\n  process.exit(1);\n}`,
      },
      {
        kind: "text",
        text: "`JSON.parse` lève une exception sur du JSON invalide : toujours l'appeler dans un `try/catch` quand la source n'est pas fiable (fichier utilisateur, réponse réseau). Le message d'erreur indique la position du problème — précieux pour déboguer.",
      },
    ],
  },
  {
    id: "ecrire-json",
    title: "Écrire : JSON.stringify",
    level: 2,
    intro:
      "Convertir un objet en chaîne JSON pour le transmettre ou le stocker.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Sérialiser un objet",
        code: `const user = { nom: "Akane", age: 25, admin: true };\n\nconst texte = JSON.stringify(user);\n// '{"nom":"Akane","age":25,"admin":true}' : compact, une ligne.\n\n// Ce qui est ignoré : fonctions, undefined, symboles.\nconst melange = { a: 1, f: () => {}, b: undefined };\nJSON.stringify(melange); // '{"a":1}'`,
      },
      {
        kind: "text",
        text: "La sérialisation est à sens unique pour certains types : les fonctions et `undefined` sont silencieusement ignorés (dans les objets) ou convertis en `null` (dans les tableaux). Pour envoyer des données à une API, `JSON.stringify` est l'étape standard avant le `fetch`.",
      },
    ],
  },
  {
    id: "pretty-print",
    title: "Pretty-print",
    level: 2,
    intro:
      "Rendre le JSON lisible par les humains : l'indentation.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Les arguments de JSON.stringify",
        code: `JSON.stringify(user, null, 2);\n// Le 3e argument = nombre d'espaces d'indentation.\n// Résultat :\n// {\n//   "nom": "Akane",\n//   "age": 25\n// }`,
      },
      {
        kind: "command",
        label: "Formater un fichier JSON",
        command: "python3 -m json.tool config.json",
        why: "Le module `json.tool` de Python lit le JSON sur l'entrée standard ou depuis un fichier et le ré-affiche indenté. Vérifie au passage la validité : un JSON malformé produit une erreur explicite au lieu d'un affichage.",
        verify: "python3 -m json.tool config.json > /dev/null && echo OK",
      },
      {
        kind: "text",
        text: "Règle pratique : compact pour les machines (réseau, stockage), indenté pour les humains (fichiers de config versionnés, debug). Les fichiers de configuration versionnés en JSON sont toujours pretty-printés : les diffs Git deviennent lisibles.",
      },
    ],
  },
  {
    id: "valider",
    title: "Valider un document",
    level: 2,
    intro:
      "S'assurer qu'un JSON est bien formé avant de l'utiliser.",
    blocks: [
      {
        kind: "command",
        label: "Valider avec Node.js",
        command: "node -e \"JSON.parse(require('fs').readFileSync('config.json','utf8')); console.log('JSON valide')\"",
        why: "Parse le fichier avec le parseur JavaScript de référence : s'il est valide, aucun message d'erreur. Rapide et sans dépendance sur toute machine avec Node.js.",
      },
      {
        kind: "command",
        label: "Valider et inspecter avec jq",
        command: "jq . config.json",
        why: "`jq` est l'outil en ligne de commande dédié au JSON : il valide, formate et permet d'extraire des champs (voir la section jq). S'il affiche le document, il est valide ; sinon, l'erreur pointe le problème.",
        verify: "jq --version",
      },
      {
        kind: "text",
        text: "Valider ≠ vérifier le sens : ces outils confirment la syntaxe, pas que les champs attendus sont présents avec les bons types. Pour le sens, ce sont les schémas (niveau 3).",
      },
    ],
  },
  {
    id: "jq-bases",
    title: "jq : les bases",
    level: 2,
    intro:
      "Extraire et transformer du JSON dans le terminal.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Filtres essentiels",
        code: `jq . config.json\n# Affiche tout, joliment indenté.\n\njq '.nom' user.json\n# "Akane" : extrait un champ.\n\njq '.users[0].email' data.json\n# Premier utilisateur, son email.\n\njq '.users[].nom' data.json\n# Le nom de CHAQUE utilisateur, un par ligne.\n\njq '.actif' user.json\n# true : les booléens passent tels quels.`,
      },
      {
        kind: "text",
        text: "`jq` prend un filtre et un document : le filtre décrit ce qu'on veut extraire. `.champ` accède à un champ, `[0]` à un élément, `[]` éclate un tableau. C'est l'équivalent pour JSON de `grep`/`awk` pour le texte — indispensable pour explorer une réponse d'API sans écrire de code.",
      },
    ],
  },
  {
    id: "json-dans-configs",
    title: "JSON dans les fichiers de config",
    level: 2,
    intro:
      "Les fichiers de configuration que tout développeur croise.",
    blocks: [
      {
        kind: "fields",
        title: "Les configs JSON courantes",
        fields: [
          {
            label: "package.json",
            value:
              "Le manifeste d'un projet Node.js : dépendances, scripts, métadonnées. Le fichier JSON le plus édité au quotidien.",
          },
          {
            label: "tsconfig.json",
            value:
              "La configuration du compilateur TypeScript : options strictes, cibles, inclusions.",
          },
          {
            label: ".vscode/settings.json",
            value:
              "Les réglages d'éditeur par projet : formatage, extensions recommandées.",
          },
          {
            label: "Fichiers de données",
            value:
              "Jeux de test, traductions (i18n), contenus statiques : le JSON comme petite base de données lisible.",
          },
        ],
      },
      {
        kind: "text",
        text: "Ces fichiers sont versionnés : toujours pretty-printés, jamais de secrets dedans (les secrets vont dans des variables d'environnement ou des fichiers exclus du versionnage). Une erreur de syntaxe dans `package.json` casse `npm` : valider après chaque édition manuelle.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "json-schema",
    title: "JSON Schema",
    level: 3,
    intro:
      "Décrire la forme attendue des données : le contrat formel.",
    blocks: [
      {
        kind: "text",
        text: "JSON Schema est un vocabulaire (lui-même en JSON) pour décrire ce qu'un document JSON doit contenir : types des champs, champs requis, formats, valeurs autorisées. Un schéma transforme « j'espère que l'API renvoie ça » en contrat vérifiable automatiquement.",
      },
      {
        kind: "code",
        language: "json",
        title: "Schéma pour un utilisateur",
        code: `{\n  "$schema": "https://json-schema.org/draft/2020-12/schema",\n  "type": "object",\n  "required": ["nom", "email"],\n  "properties": {\n    "nom": { "type": "string", "minLength": 1 },\n    "email": { "type": "string", "format": "email" },\n    "age": { "type": "integer", "minimum": 0 }\n  },\n  "additionalProperties": false\n}`,
      },
      {
        kind: "text",
        text: "Lecture : l'objet doit avoir `nom` et `email` (requis), `nom` est une chaîne non vide, `email` suit le format email, `age` est un entier positif optionnel, et aucun autre champ n'est accepté. Des validateurs existent dans tous les langages (ajv en JavaScript, entre autres).",
      },
    ],
  },
  {
    id: "valider-avec-schema",
    title: "Valider avec un schéma",
    level: 3,
    intro:
      "Passer de la validation syntaxique à la validation sémantique.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Validation avec ajv",
        code: `import Ajv from "ajv";\n\nconst ajv = new Ajv();\nconst valider = ajv.compile(schema);\n\nif (valider(donnees)) {\n  console.log("Données conformes");\n} else {\n  console.log("Erreurs :", valider.errors);\n  // Chaque erreur : champ concerné, règle violée, message.\n}`,
      },
      {
        kind: "text",
        text: "`ajv` (Another JSON Validator) est le validateur de référence en JavaScript : on compile le schéma une fois, puis on valide autant de documents qu'on veut. Les erreurs sont structurées — parfaites pour renvoyer des messages clairs à l'appelant d'une API. Valider en entrée d'API, c'est refuser les données pourries à la porte plutôt que de les découvrir en base.",
      },
    ],
  },
  {
    id: "reviver-replacer",
    title: "Reviver et replacer",
    level: 3,
    intro:
      "Personnaliser la conversion dans les deux sens.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "Convertir les dates au parsing",
        code: `const data = JSON.parse(texte, (cle, valeur) => {\n  // Reviver : transforme chaque valeur pendant le parsing.\n  if (typeof valeur === "string" && /^\\d{4}-\\d{2}-\\d{2}/.test(valeur)) {\n    return new Date(valeur);\n  }\n  return valeur;\n});\n\nconst propre = JSON.stringify(objet, (cle, valeur) => {\n  // Replacer : filtre ou transforme à la sérialisation.\n  if (cle === "motDePasse") return undefined; // exclu du JSON\n  return valeur;\n});`,
      },
      {
        kind: "text",
        text: "Le reviver (2e argument de `parse`) reconstruit les types perdus — typiquement les dates. Le replacer (2e argument de `stringify`) filtre ou transforme — typiquement exclure les secrets ou les champs internes. Les deux reçoivent chaque paire clé/valeur, du plus profond vers la racine.",
      },
    ],
  },
  {
    id: "dates-en-json",
    title: "Les dates en JSON",
    level: 3,
    intro:
      "Pas de type date en JSON : la convention ISO 8601.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "Format canonique",
        code: `{\n  "creeLe": "2026-09-29T10:30:00Z",\n  "anniversaire": "2001-05-14"\n}`,
      },
      {
        kind: "list",
        items: [
          "Format : `AAAA-MM-JJTHH:MM:SSZ` — le `Z` indique UTC. Toujours stocker et échanger en UTC, convertir en fuseau local à l'affichage.",
          "Côté JavaScript : `new Date(\"2026-09-29T10:30:00Z\")` parse ce format nativement ; `date.toISOString()` produit ce format.",
          "Ne jamais utiliser de formats locaux ambigus (`29/09/2026` vs `09/29/2026`) dans les échanges.",
          "Alternative : timestamp Unix (nombre de secondes) — compact mais illisible pour un humain.",
        ],
      },
    ],
  },
  {
    id: "nombres",
    title: "Nombres : précision et limites",
    level: 3,
    intro:
      "Le piège silencieux : JSON ne connaît que les flottants double précision.",
    blocks: [
      {
        kind: "text",
        text: "La spécification ne précise pas la précision des nombres ; en pratique, JavaScript les parse en flottants 64 bits. Conséquence : les entiers au-delà de 2^53 (≈ 9 × 10^15) perdent en précision. Un identifiant comme `9007199254740993` peut arriver arrondi.",
      },
      {
        kind: "list",
        items: [
          "Identifiants 64 bits (bases de données, APIs) : les transmettre en chaînes, pas en nombres.",
          "Montants monétaires : en centimes (entiers) ou en chaînes décimales — jamais en flottants (`0.1 + 0.2 ≠ 0.3`).",
          "Pas de `NaN` ni `Infinity` : les APIs les remplacent par `null` ou des chaînes.",
          "Zéros non significatifs interdits : `01` n'est pas du JSON valide.",
        ],
      },
    ],
  },
  {
    id: "unicode",
    title: "Unicode et échappement",
    level: 3,
    intro:
      "JSON est Unicode par nature : ce qu'il faut savoir sur l'encodage.",
    blocks: [
      {
        kind: "list",
        items: [
          "JSON est UTF-8 par défaut : les accents et emojis passent tels quels, sans échappement nécessaire.",
          "Échappements disponibles : `\\\"`, `\\\\`, `\\/`, `\\b`, `\\f`, `\\n`, `\\r`, `\\t` et `\\uXXXX` pour tout caractère Unicode.",
          "Les caractères de contrôle (retours à la ligne bruts dans une chaîne) doivent être échappés : `\\n`.",
          "Côté HTTP, l'en-tête `Content-Type: application/json; charset=utf-8` déclare l'encodage.",
        ],
      },
    ],
  },
  {
    id: "jsonc",
    title: "JSONC : JSON avec commentaires",
    level: 3,
    intro:
      "La variante pragmatique pour les fichiers de configuration humains.",
    blocks: [
      {
        kind: "text",
        text: "JSONC (JSON with Comments) autorise commentaires et virgules finales : c'est ce qu'utilise VS Code pour ses fichiers de configuration. Ce n'est pas du JSON standard — un parseur strict le rejettera — mais c'est un compromis assumé pour les fichiers édités à la main.",
      },
      {
        kind: "list",
        items: [
          "Usage : configs d'éditeur, réglages locaux — jamais pour des échanges entre systèmes.",
          "Les parseurs doivent explicitement supporter JSONC (`jsonc-parser` en JS).",
          "Si un fichier doit être lu par un outil inconnu, rester en JSON strict.",
        ],
      },
    ],
  },
  {
    id: "jsonl",
    title: "JSONL : un objet par ligne",
    level: 3,
    intro:
      "Le format des gros volumes : JSON Lines.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "events.jsonl",
        code: `{"event": "click", "user": 1, "at": "2026-09-29T10:00:00Z"}\n{"event": "view", "user": 2, "at": "2026-09-29T10:00:01Z"}\n{"event": "click", "user": 1, "at": "2026-09-29T10:00:02Z"}`,
      },
      {
        kind: "text",
        text: "JSONL (ou NDJSON) : une valeur JSON complète par ligne, sans tableau englobant. Chaque ligne se parse indépendamment — on peut traiter un fichier de plusieurs Go en streaming, ligne par ligne, sans tout charger en mémoire. C'est le format standard des logs structurés et des exports de données massifs.",
      },
    ],
  },
  {
    id: "streaming",
    title: "Parser en streaming",
    level: 3,
    intro:
      "Quand le document ne tient pas en mémoire.",
    blocks: [
      {
        kind: "text",
        text: "`JSON.parse` exige le document entier en mémoire : impraticable pour des fichiers de plusieurs centaines de Mo. Les parseurs en streaming (événementiels) lisent le flux morceau par morceau et émettent des événements (début d'objet, clé, valeur…), avec une empreinte mémoire constante.",
      },
      {
        kind: "list",
        items: [
          "Cas typique : traiter un export JSONL ou un énorme tableau d'objets sans exploser la RAM.",
          "En Node.js : lire le fichier en flux et parser ligne par ligne pour du JSONL.",
          "Compromis : le streaming est plus verbeux à coder — réservé aux cas où la taille le justifie.",
        ],
      },
    ],
  },
  {
    id: "jq-avance",
    title: "jq avancé",
    level: 3,
    intro:
      "Filtrer, transformer, agréger : jq comme langage de requête.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Filtres puissants",
        code: `jq '.users | length' data.json\n# Nombre d'utilisateurs.\n\njq '.users[] | select(.age >= 18) | .email' data.json\n# Emails des majeurs uniquement.\n\njq '[.users[].age] | add / length' data.json\n# Âge moyen : tableau des âges, somme, division.\n\njq '{nom: .nom, email: .contact.email}' user.json\n# Reconstruit un objet avec une sélection de champs.\n\njq -c '.users[]' data.json\n# -c : sortie compacte, un objet par ligne (pratique pour les pipes).`,
      },
      {
        kind: "text",
        text: "`select()` filtre, les pipes `|` enchaînent les transformations, `{...}` reconstruit des objets : jq est un vrai langage fonctionnel pour JSON. Pour les explorations complexes d'API, il remplace avantageusement un script ad hoc — et son manuel (`man jq`) est la référence.",
      },
    ],
  },
  {
    id: "curl-jq",
    title: "curl + jq : explorer une API",
    level: 3,
    intro:
      "Le duo inséparable pour interroger une API depuis le terminal.",
    blocks: [
      {
        kind: "command",
        label: "Interroger une API publique et extraire un champ",
        command: "curl -s https://api.github.com/users/octocat | jq .login",
        why: "Récupère le profil public de l'utilisateur `octocat` sur l'API GitHub (sans authentification pour les endpoints publics) et en extrait le champ `login`. Le motif `curl -s … | jq …` est le réflexe d'exploration d'API.",
        verify: "curl -s https://api.github.com/users/octocat | jq empty && echo JSON_OK",
      },
      {
        kind: "list",
        items: [
          "`-s` (silencieux) évite la barre de progression de curl dans le pipe.",
          "`jq empty` valide sans afficher : parfait pour un check rapide.",
          "Pour les API avec pagination, boucler sur les pages en incrémentant le paramètre.",
        ],
      },
    ],
  },
  {
    id: "securite-json",
    title: "Sécurité",
    level: 3,
    intro:
      "Parser du JSON venu de l'extérieur sans ouvrir de brèche.",
    blocks: [
      {
        kind: "list",
        items: [
          "Toujours `JSON.parse`, jamais `eval` : `eval` exécute du code arbitraire contenu dans la chaîne.",
          "Prototype pollution : un objet JSON contenant `__proto__` peut polluer les prototypes en JavaScript lors d'une fusion naïve — les bibliothèques de merge sérieuses s'en protègent, et `Object.create(null)` évite le problème.",
          "Valider avec un schéma avant d'utiliser : ne jamais faire confiance à la forme des données entrantes.",
          "Limiter la taille acceptée : un JSON de plusieurs Mo en entrée d'API est un vecteur de déni de service.",
          "Ne jamais logger des payloads contenant des secrets ; filtrer avant (replacer).",
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 3,
    intro:
      "Les messages d'erreur du parsing, décodés.",
    blocks: [
      {
        kind: "table",
        headers: ["Erreur", "Cause", "Remède"],
        rows: [
          ["`Unexpected token }`", "Virgule finale avant `}` ou `]`", "Retirer la virgule"],
          ["`Unexpected token '`", "Quotes simples au lieu de doubles", "Doubles quotes partout"],
          ["`Unexpected end of JSON input`", "Chaîne vide ou tronquée", "Vérifier la source (réponse vide ?)"],
          ["`Unexpected token /`", "Commentaire dans du JSON strict", "Passer en JSONC ou retirer"],
          ["Clés dupliquées silencieuses", "Même clé deux fois : la dernière gagne", "Dédupliquer, activer la détection si possible"],
          ["Nombres arrondis", "Entiers > 2^53", "Transmettre en chaînes"],
        ],
      },
    ],
  },
  {
    id: "performance",
    title: "Performance",
    level: 3,
    intro:
      "Quand le JSON devient gros : les ordres de grandeur.",
    blocks: [
      {
        kind: "list",
        items: [
          "`JSON.parse`/`stringify` natifs sont très rapides : des Mo par seconde — le parsing est rarement le goulot.",
          "Le coût réel est souvent mémoire : un document de 100 Mo en mémoire vive, plus sa représentation objet.",
          "Au-delà de quelques dizaines de Mo : JSONL + streaming, ou pagination côté API.",
          "Côté réseau : compression (gzip/br) gérée par HTTP, champs minimaux (ne pas renvoyer ce que le client n'affiche pas).",
          "Mesurer avant d'optimiser : la plupart des lenteurs « JSON » sont des lenteurs réseau ou base de données.",
        ],
      },
    ],
  },
  {
    id: "alternatives",
    title: "Alternatives à JSON",
    level: 3,
    intro:
      "JSON n'est pas le seul format : choisir en connaissance de cause.",
    blocks: [
      {
        kind: "table",
        headers: ["Format", "Forces", "Faiblesses", "Usage typique"],
        rows: [
          ["JSON", "Universel, simple, natif au web", "Verbeux, pas de commentaires", "APIs, configs"],
          ["YAML", "Lisible, commentaires, ancres", "Syntaxe piégeuse (indentation)", "CI, Kubernetes, configs humaines"],
          ["TOML", "Simple et non ambigu pour la config", "Moins adapté aux données imbriquées", "Cargo, pyproject"],
          ["XML", "Schémas matures, namespaces", "Très verbeux", "Legacy, SOAP, formats documentaires"],
          ["Protocol Buffers", "Compact, typé, rapide", "Binaire, schéma requis", "Communication inter-services à haute performance"],
          ["CSV", "Minimal pour les tableaux plats", "Pas de hiérarchie, dialectes", "Exports tableur, data"],
        ],
      },
      {
        kind: "text",
        text: "Aucun format n'est universellement supérieur : JSON gagne par défaut pour les API web (écosystème, outillage), les autres se justifient par des contraintes précises (lisibilité humaine, performance, typage fort).",
      },
    ],
  },
  {
    id: "conventions-api",
    title: "Conventions dans les APIs",
    level: 3,
    intro:
      "Au-delà de la syntaxe : concevoir des payloads prévisibles.",
    blocks: [
      {
        kind: "list",
        items: [
          "Nommage cohérent : `camelCase` (écosystème JS) ou `snake_case` (Python/Ruby) — choisir une fois, partout.",
          "Dates en ISO 8601 UTC, jamais en format local.",
          "Collections : tableau d'objets de même forme ; objet vide `{}` plutôt que `null` pour « aucun résultat structuré ».",
          "`null` = valeur explicitement absente ; clé omise = non renseigné — documenter la distinction.",
          "Pagination : enveloppe avec `data`, `total`, `page`/`cursor` plutôt qu'un tableau nu.",
          "Erreurs : structure stable (`code`, `message`, détails) plutôt que du texte libre.",
        ],
      },
    ],
  },
  {
    id: "json-patch",
    title: "JSON Patch",
    level: 3,
    intro:
      "Modifier un document par opérations : le standard RFC 6902.",
    blocks: [
      {
        kind: "text",
        text: "JSON Patch décrit des modifications sous forme d'opérations (`add`, `remove`, `replace`, `move`, `copy`, `test`) appliquées à des chemins (JSON Pointer). Plutôt que de renvoyer tout le document, le client envoie la liste des changements — précis et économe.",
      },
      {
        kind: "code",
        language: "json",
        title: "Exemple de patch",
        code: `[\n  { "op": "replace", "path": "/nom", "value": "Bruno" },\n  { "op": "add", "path": "/tags/-", "value": "dev" },\n  { "op": "remove", "path": "/surnom" }\n]`,
      },
      {
        kind: "text",
        text: "L'opération `test` vérifie une valeur avant d'appliquer le reste : les modifications deviennent conditionnelles, ce qui évite les écrasements concurrents. Le Content-Type dédié est `application/json-patch+json`.",
      },
    ],
  },
  {
    id: "merge-patch",
    title: "JSON Merge Patch",
    level: 3,
    intro:
      "La mise à jour partielle simple : RFC 7386.",
    blocks: [
      {
        kind: "text",
        text: "JSON Merge Patch est plus simple que JSON Patch : on envoie un document partiel, les clés présentes remplacent ou ajoutent, les clés à `null` suppriment. Pas d'opérations explicites — le format est le message.",
      },
      {
        kind: "code",
        language: "json",
        title: "Document puis merge patch",
        code: `// Document : {"nom": "Akane", "age": 25, "ville": "Paris"}\n// Patch    : {"age": 26, "ville": null}\n// Résultat : {"nom": "Akane", "age": 26}`,
      },
      {
        kind: "text",
        text: "Limite : impossible de distinguer « mettre à null » de « supprimer » — pour les APIs où cette distinction compte, JSON Patch est nécessaire. Le Content-Type est `application/merge-patch+json`.",
      },
    ],
  },
  {
    id: "schema-avance",
    title: "Schémas avancés",
    level: 3,
    intro:
      "Composition et références : les schémas qui passent à l'échelle.",
    blocks: [
      {
        kind: "fields",
        title: "Les combinateurs",
        fields: [
          {
            label: "`$ref`",
            value:
              "Référence un sous-schéma (local ou distant) : factorise les définitions répétées (adresse, utilisateur…).",
          },
          {
            label: "`$defs`",
            value:
              "Le registre des sous-schémas réutilisables du document.",
          },
          {
            label: "`allOf`",
            value:
              "Le document doit valider tous les sous-schémas : composition par cumul.",
          },
          {
            label: "`anyOf` / `oneOf`",
            value:
              "Au moins un / exactement un des sous-schémas : modélise les variantes (unions de types).",
          },
          {
            label: "`if` / `then` / `else`",
            value:
              "Validation conditionnelle : si le champ `type` vaut X, alors ces règles s'appliquent.",
          },
        ],
      },
    ],
  },
  {
    id: "evolution-schemas",
    title: "Faire évoluer un schéma",
    level: 3,
    intro:
      "Les données changent : gérer la compatibilité sans casser les consommateurs.",
    blocks: [
      {
        kind: "list",
        items: [
          "Ajouter un champ optionnel : compatible — les anciens consommateurs l'ignorent.",
          "Rendre un champ requis : incompatible — les anciens producteurs ne l'envoient pas.",
          "Renommer : incompatible — préférer ajouter le nouveau nom, déprécier l'ancien, puis retirer.",
          "Versionner le schéma (`$id` avec version) et documenter les changements comme une API.",
          "En base de données : migrer les documents existants ou valider en lecture avec tolérance.",
        ],
      },
    ],
  },
  {
    id: "jsonpath",
    title: "JSONPath",
    level: 3,
    intro:
      "Interroger un document comme on interroge une base : la syntaxe JSONPath.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Expressions courantes",
        code: `$.users[0].email\n# Premier email : $ = racine.\n\n$.users[?(@.age >= 18)].nom\n# Noms des majeurs : filtre sur le tableau.\n\n$..email\n# Tous les champs email, à n'importe quelle profondeur.\n\n$.users[-1:]\n# Dernier élément (slice).`,
      },
      {
        kind: "text",
        text: "JSONPath est le « XPath du JSON » : des expressions pour adresser des fragments de document, supportées par de nombreuses bibliothèques et outils. Moins puissant que jq pour transformer, mais standard pour désigner — notamment dans JSON Patch (`path`) et les schémas.",
      },
    ],
  },
  {
    id: "geojson",
    title: "GeoJSON : un format concret",
    level: 3,
    intro:
      "Étude de cas : comment un format sérieux structure ses données.",
    blocks: [
      {
        kind: "code",
        language: "json",
        title: "Un point GeoJSON",
        code: `{\n  "type": "Feature",\n  "geometry": {\n    "type": "Point",\n    "coordinates": [2.3522, 48.8566]\n  },\n  "properties": {\n    "nom": "Paris"\n  }\n}`,
      },
      {
        kind: "text",
        text: "GeoJSON (RFC 7946) illustre les bonnes pratiques : un champ `type` discriminant, une structure géométrie/propriétés séparée, des coordonnées en `[longitude, latitude]`. Étudier un format standardisé apprend plus sur la conception de payloads que dix tutoriels.",
      },
    ],
  },
  {
    id: "package-json-anatomie",
    title: "Anatomie de package.json",
    level: 3,
    intro:
      "Le fichier JSON le plus important de l'écosystème JavaScript, décortiqué.",
    blocks: [
      {
        kind: "fields",
        title: "Les champs clés",
        fields: [
          {
            label: "`name`, `version`",
            value:
              "L'identité du paquet ; la version suit semver.",
          },
          {
            label: "`scripts`",
            value:
              "Les commandes du projet (`dev`, `build`, `test`, `lint`) : l'interface du projet.",
          },
          {
            label: "`dependencies` / `devDependencies`",
            value:
              "Dépendances de production vs d'outillage, avec plages de versions.",
          },
          {
            label: "`type: module`",
            value:
              "Déclare les `.js` comme modules ES (`import`) plutôt que CommonJS.",
          },
          {
            label: "`exports`",
            value:
              "Les points d'entrée publics du paquet : contrôle fin de ce qui est importable.",
          },
          {
            label: "`engines`",
            value:
              "Les versions de Node/npm requises : documentation exécutable des prérequis.",
          },
        ],
      },
    ],
  },
  {
    id: "jq-recettes",
    title: "Recettes jq",
    level: 3,
    intro:
      "Les one-liners qui reviennent sans cesse.",
    blocks: [
      {
        kind: "code",
        language: "bash",
        title: "Carnet de recettes",
        code: `jq -s 'add' a.json b.json\n# Fusionne deux fichiers (tableaux concaténés, objets fusionnés avec -s).\n\njq '.users | sort_by(.age) | reverse' data.json\n# Trie les utilisateurs par âge décroissant.\n\njq -r '.users[].email' data.json\n# -r : sortie brute, sans guillemets (pratique pour les scripts).\n\njq 'del(.motDePasse)' user.json\n# Supprime un champ sensible avant de partager.\n\njq --arg v 2 '.version = $v' config.json\n# Injecte une variable shell dans le filtre, sans concaténation.`,
      },
      {
        kind: "text",
        text: "`--arg` mérite d'être un réflexe : il passe une variable shell proprement, sans concaténation de chaînes — la version jq de l'injection évitée. Les recettes se construisent par composition : chaque filtre fait une chose, les pipes assemblent.",
      },
    ],
  },
  {
    id: "tableaux-ou-objets",
    title: "Tableaux ou objets : modéliser",
    level: 3,
    intro:
      "Le choix de structure qui conditionne toute la consommation.",
    blocks: [
      {
        kind: "table",
        headers: ["Structure", "Choisir quand", "Exemple"],
        rows: [
          ["Tableau d'objets", "Collection homogène, ordre significatif", "`[{\"id\": 1}, {\"id\": 2}]`"],
          ["Objet indexé par id", "Accès direct par clé, unicité garantie", "`{\"1\": {...}, \"2\": {...}}`"],
          ["Objet plat", "Entité unique aux champs connus", "`{\"nom\": \"x\", \"age\": 1}`"],
          ["Tableau de tableaux", "Données tabulaires denses (CSV-like)", "`[[\"a\", 1], [\"b\", 2]]`"],
        ],
      },
      {
        kind: "text",
        text: "Règle générale : les API exposent des tableaux (ordre, pagination naturelle), les indexations par id se font côté client. Un objet indexé par id dans une API fige le format et complique la pagination — à réserver aux cas où l'accès par clé est vraiment le besoin dominant.",
      },
    ],
  },
  {
    id: "normalisation",
    title: "Normalisation des données",
    level: 3,
    intro:
      "Éviter les duplications : la leçon des bases de données appliquée au JSON.",
    blocks: [
      {
        kind: "text",
        text: "Un document JSON qui répète la même entité à dix endroits (le nom du client dans chaque commande) pose les mêmes problèmes qu'une base dénormalisée : mise à jour en dix endroits, incohérences. Les API REST résolvent cela par les liens (`/clients/42` plutôt que l'objet client embarqué) ou par des structures normalisées côté client.",
      },
      {
        kind: "list",
        items: [
          "Embarquer pour la lecture (pratique), référencer par id pour l'écriture (sûr) : le compromis classique.",
          "Côté frontend, les stores normalisés (entités par id) évitent les doublons en mémoire.",
          "Documenter quand une donnée est une copie (snapshot) ou une référence vivante.",
        ],
      },
    ],
  },
  {
    id: "projets",
    title: "Projets",
    level: 3,
    intro:
      "Trois projets progressifs pour ancrer les réflexes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Projet 1 — Explorateur d'API",
            detail:
              "Script shell qui interroge une API publique paginée avec `curl`, agrège les pages avec `jq` (filtres `select`, reconstruction d'objets) et produit un rapport. Objectif : le duo curl+jq en conditions réelles.",
          },
          {
            title: "Projet 2 — Validateur de configuration",
            detail:
              "Écrire un JSON Schema pour un format de config maison, puis un script Node.js qui valide les fichiers avec ajv et produit des messages d'erreur lisibles par champ. Objectif : le contrat formel.",
          },
          {
            title: "Projet 3 — Pipeline JSONL",
            detail:
              "Générer un gros fichier JSONL (logs simulés), le traiter en streaming (comptages, agrégations par clé avec `jq` ou un script), sans jamais tout charger en mémoire. Objectif : les volumes.",
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
      "Aller plus loin, en commençant toujours par la documentation officielle.",
    blocks: [
      {
        kind: "fields",
        title: "Documentation officielle (à privilégier)",
        fields: [
          {
            label: "json.org",
            value:
              "La spécification : grammaire complète sur une page, avec les diagrammes de syntaxe.",
          },
          {
            label: "MDN — JSON",
            value:
              "developer.mozilla.org : la référence pratique de JSON.parse et JSON.stringify en JavaScript.",
          },
          {
            label: "JSON Schema",
            value:
              "json-schema.org : la spécification des schémas et la liste des validateurs par langage.",
          },
          {
            label: "Manuel jq",
            value:
              "jqlang.github.io/jq/manual : la référence complète des filtres jq.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Pratique : valider chaque JSON écrit à la main avant de l'utiliser — le réflexe qui évite 90 % des erreurs.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "JSON maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Le transport : `http` (requêtes, en-têtes, statuts) — comment le JSON voyage.",
          "L'usage : `api-integration` (authentification, pagination, retry) — consommer des APIs proprement.",
          "La conception : `api-rest` pour dessiner des APIs dont les payloads sont prévisibles.",
          "Le langage : `javascript` pour manipuler les objets parsés avec aisance.",
          "Revenir à la roadmap : valider JSON et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

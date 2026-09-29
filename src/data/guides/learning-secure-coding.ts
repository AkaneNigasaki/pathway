import type { LearningSection } from "../skill-guides";

/**
 * Learning Page complète du secure coding : écrire du code qui ne crée pas
 * de vulnérabilités. Posture strictement DÉFENSIVE : validation des entrées,
 * exemples vulnérable → corrigé pour APPRENDRE À NE PAS INTRODUIRE la
 * faille, gestion des secrets, dépendances, revues, threat modeling.
 * Les exemples « vulnérables » sont des illustrations pédagogiques
 * minimales du mécanisme à éviter — jamais des recettes d'exploitation.
 * 3 niveaux d'information (Aperçu / Pratique / Approfondi) avec divulgation
 * progressive. Tous les textes supportent le code inline entre backticks.
 */
export const LEARNING_SECURE_CODING: LearningSection[] = [
  // ------------------------------------------------------------------
  // NIVEAU 1 — APERÇU
  // ------------------------------------------------------------------
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    intro:
      "Comprendre ce qu'est le secure coding : la sécurité commence au clavier, pas au pare-feu.",
    blocks: [
      {
        kind: "text",
        text: "Le secure coding consiste à écrire du code qui ne crée pas de vulnérabilités : valider les entrées, ne jamais faire confiance aux données externes, gérer les secrets hors du code, maîtriser ses dépendances, relire avec une grille sécurité. La plupart des failles exploitées (injections, XSS, fuites de secrets) naissent d'une ligne de code ordinaire écrite sans ces réflexes.",
      },
      {
        kind: "text",
        text: "Ne jamais faire confiance aux entrées, coder les contrôles par défaut, et vérifier (revues, analyse statique, tests).",
      },
      {
        kind: "text",
        text: "Corriger une faille en production coûte 10 à 100 fois plus cher que l'éviter à l'écriture — et certaines failles (fuite de données) ne se « corrigent » jamais vraiment une fois exploitées.",
      },
      {
        kind: "fields",
        title: "Le secure coding : l'essentiel",
        fields: [          {
            label: "Quand s'en préoccuper",
            value:
              "Dès la première ligne : la sécurité « shift left » — intégrée au développement via revues et analyse statique — est le levier le plus rentable de toute la cybersécurité.",
          },
          {
            label: "Ce que ce n'est pas",
            value:
              "Ni de la paranoïa qui ralentit tout, ni un plugin magique : c'est un petit nombre de réflexes appliqués systématiquement, vérifiés par des outils.",
          },
        ],
      },
      {
        kind: "text",
        text: "Point essentiel : cette page adopte une posture strictement défensive. Les exemples de code « vulnérable » illustrent le mécanisme à NE PAS reproduire — comprendre la faille pour ne jamais l'introduire, pas pour l'exploiter.",
      },
    ],
  },
  {
    id: "modele-mental",
    title: "Le modèle mental : ne jamais faire confiance aux entrées",
    level: 1,
    intro:
      "La seule idée à retenir : toute donnée externe est hostile jusqu'à preuve du contraire.",
    blocks: [
      {
        kind: "diagram",
        title: "Le flux de la donnée : valider à la frontière",
        lines: [
          "  EXTERIEUR (hostile par défaut)",
          "  formulaire, URL, API, fichier, en-tête…",
          "        │",
          "        ▼",
          "  ┌─ FRONTIÈRE DE CONFIANCE ─────────┐",
          "  │ 1. Valider : type, format, bornes │",
          "  │ 2. Assainir : encoder en sortie  │",
          "  │ 3. Paramétrer : jamais concaténé │",
          "  └─────────────────────────────────┘",
          "        │",
          "        ▼",
          "  INTÉRIEUR (digne de confiance)",
          "  base de données, commandes, pages HTML",
          "",
          "Règle : aucun chemin ne contourne la frontière.",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : chaque faille d'injection (SQL, XSS, commandes) est une donnée externe qui a traversé la frontière sans contrôle et a été interprétée comme du code. Pourquoi ça existe : les développeurs pensent « l'utilisateur saisira un nom » — l'attaquant saisit autre chose. Quand l'appliquer : à chaque fois que du code touche une donnée qui ne vient pas de lui.",
      },
      {
        kind: "fields",
        title: "Les trois questions du développeur sécurisé",
        fields: [
          {
            label: "D'où vient cette donnée ?",
            value:
              "Si elle vient de l'extérieur (même d'une « API de confiance »), elle est suspecte jusqu'à validation.",
          },
          {
            label: "Où va-t-elle être interprétée ?",
            value:
              "SQL, HTML, shell, URL : chaque destination a son encodage et ses pièges — on protège au point d'usage.",
          },
          {
            label: "Que se passe-t-il si elle est malveillante ?",
            value:
              "Le pire cas réaliste guide l'effort : une faille sur la page de login n'a pas le même impact que sur un champ de commentaire.",
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
    intro: "Ce qu'il faut déjà savoir pour tirer profit de cette page.",
    blocks: [
      {
        kind: "list",
        items: [
          "Savoir programmer dans au moins un langage (Python ou JavaScript/TypeScript — les exemples utilisent les deux).",
          "Bases du web : requêtes HTTP, formulaires, ce qu'est une base de données.",
          "Notions de Git : les secrets et l'historique y jouent un rôle central.",
          "Aucune expérience en sécurité requise : les réflexes se construisent ici.",
        ],
      },
      {
        kind: "text",
        text: "Si le développement web vous est étranger, commencez par les Learning Pages Python ou JavaScript de Pathway : on sécurise mieux un code qu'on sait écrire.",
      },
    ],
  },
  {
    id: "environnement",
    title: "Configurer son environnement",
    level: 2,
    intro:
      "L'outillage qui attrape les fautes avant vous : linters et analyseurs.",
    blocks: [
      {
        kind: "command",
        label: "Auditer les dépendances d'un projet Node",
        command: "npm audit",
        why: "`npm audit` compare vos dépendances aux vulnérabilités connues : c'est le premier contrôle de la chaîne logicielle, à lancer avant chaque mise en production.",
      },
      {
        kind: "command",
        label: "Auditer les dépendances Python",
        command: "pip install pip-audit && pip-audit",
        why: "`pip-audit` (outil officiel de la Python Packaging Authority) fait la même chose pour l'écosystème Python : inventaire des paquets, CVE connues, versions à corriger.",
      },
      {
        kind: "command",
        label: "Analyser le code avec Semgrep",
        command: "pip install semgrep && semgrep --config auto .",
        why: "Semgrep est un analyseur statique qui détecte des patterns dangereux (concaténation SQL, `eval`, secrets) avec des règles prêtes à l'emploi (`--config auto`).",
      },
      {
        kind: "fields",
        title: "L'éditeur comme allié",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Activez les linters de sécurité dans l'éditeur (ESLint avec règles de sécurité, Ruff/Bandit pour Python) : la faille signalée pendant l'écriture coûte zéro.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Installer les outils mais ignorer leurs alertes « parce que ça marche » : un avertissement ignoré systématiquement est un outil désactivé.",
          },
        ],
      },
    ],
  },
  {
    id: "owasp-apercu",
    title: "OWASP Top 10 : la carte des risques",
    level: 2,
    intro:
      "Les dix familles de failles à connaître : le vocabulaire commun.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : l'OWASP Top 10 (édition 2021, référence publiée) liste les dix risques applicatifs les plus critiques selon un consensus d'experts — la check-list que tout développeur doit connaître. Pourquoi : la majorité des failles réelles appartiennent à ces familles ; les reconnaître par nom, c'est savoir où regarder en revue de code.",
      },
      {
        kind: "table",
        headers: ["Code", "Risque", "Réflexe défensif"],
        rows: [
          ["A01", "Contrôle d'accès défaillant", "Vérifier les droits à chaque requête, par défaut refuser."],
          ["A02", "Défaillances cryptographiques", "TLS, hashage adapté (argon2/bcrypt), jamais de crypto maison."],
          ["A03", "Injection", "Requêtes paramétrées, validation des entrées."],
          ["A04", "Conception non sécurisée", "Threat modeling avant de coder."],
          ["A05", "Mauvaise configuration", "Durcir les défauts, pas d'infos en mode debug."],
          ["A06", "Composants vulnérables", "`npm audit` / `pip-audit`, mises à jour."],
          ["A07", "Échecs d'authentification", "MFA, anti force-brute, sessions sûres."],
          ["A08", "Intégrité de la chaîne logicielle", "Signer, vérifier le CI/CD."],
          ["A09", "Journalisation insuffisante", "Logger les événements de sécurité, alerter."],
          ["A10", "SSRF", "Valider les URL côté serveur."],
        ],
      },
      {
        kind: "text",
        text: "Référence officielle : owasp.org (Top 10) et cheatsheetseries.owasp.org (fiches pratiques par sujet). Le niveau 3 détaille les plus fréquentes avec exemples corrigés.",
      },
    ],
  },
  {
    id: "validation-entrees",
    title: "Valider les entrées : le réflexe n°1",
    level: 2,
    intro:
      "Typer, borner, blanchir : la validation en trois gestes.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Validation d'entrée (FastAPI + Pydantic)",
        code: "from pydantic import BaseModel, Field\n\nclass Inscription(BaseModel):\n    # Type + bornes + format : la validation est déclarative\n    nom: str = Field(min_length=1, max_length=100)\n    age: int = Field(ge=0, le=150)\n    email: str = Field(pattern=r\"^[^@]+@[^@]+\\.[^@]+$\")\n\n# Toute donnée non conforme est rejetée AVANT votre code métier\n",
      },
      {
        kind: "fields",
        title: "Les trois gestes",
        fields: [
          {
            label: "Typer",
            value:
              "Un âge est un entier, pas une chaîne : le typage (Pydantic, Zod, types TypeScript) rejette l'absurde avant toute logique.",
          },
          {
            label: "Borner",
            value:
              "Longueurs maximales, plages numériques, formats (regex) : « ce champ accepte X » se définit positivement.",
          },
          {
            label: "Blanchir (liste blanche)",
            value:
              "Autoriser l'attendu plutôt qu'interdire le dangereux : les listes noires (« bloquer <script> ») se contournent toujours.",
          },
        ],
      },
      {
        kind: "text",
        text: "Erreur fréquente : valider uniquement côté client (JavaScript) — contournable en une requête `curl`. Bonne pratique : la validation serveur est l'autorité, la validation cliente n'est que du confort.",
      },
    ],
  },
  {
    id: "secrets",
    title: "Les secrets hors du code",
    level: 2,
    intro:
      "Clés d'API, mots de passe : jamais en dur, jamais dans Git.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Secret via variable d'environnement (pas en dur)",
        code: "import os\n\n# MAUVAIS : clé en dur dans le code (visible dans Git, les logs, les dumps)\n# API_KEY = \"sk-live-xxxx\"\n\n# BON : lu depuis l'environnement, jamais committé\nAPI_KEY = os.environ[\"API_KEY\"]  # échoue explicitement si absent\n",
      },
      {
        kind: "command",
        label: "Vérifier qu'aucun secret ne traîne dans l'historique Git",
        command: "git log -p --all -S \"sk-live\" -- . | head -n 20",
        why: "Cette recherche dans tout l'historique détecte si une chaîne sensible a déjà été committée : si oui, la clé est considérée comme compromise — il faut la révoquer, pas juste la retirer.",
      },
      {
        kind: "fields",
        title: "Règles des secrets",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Variables d'environnement en développement, gestionnaire de secrets en production (Vault, Secrets Manager), `.env` dans le `.gitignore`, rotation après toute exposition.",
          },
          {
            label: "Erreur fréquente",
            value:
              "« Je retirerai la clé avant de pusher » : l'historique Git n'oublie jamais — une clé committée est une clé compromise, on la révoque.",
          },
        ],
      },
    ],
  },
  {
    id: "premier-audit",
    title: "Votre premier audit de code",
    level: 2,
    intro:
      "Relire un code avec une grille d'attaquant : la méthode en 6 étapes.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Cartographier les entrées",
            detail:
              "Listez tous les points où des données externes entrent : formulaires, paramètres, API, fichiers, variables d'environnement.",
          },
          {
            title: "Suivre les données sensibles",
            detail:
              "Mots de passe, tokens, données personnelles : où sont-ils lus, stockés, affichés, loggés ? Chaque étape est un point de contrôle.",
          },
          {
            title: "Vérifier les contrôles d'accès",
            detail:
              "Chaque fonction sensible vérifie-t-elle l'autorisation ? Cherchez les oublis, pas les protections.",
          },
          {
            title: "Inspecter les sorties",
            detail:
              "Données affichées (échappées ?), erreurs (verbeuses ?), logs (secrets dedans ?) : ce qui sort est aussi critique que ce qui entre.",
          },
          {
            title: "Passer les outils",
            detail:
              "`npm audit`, `pip-audit`, Semgrep : les findings automatiques complètent la revue manuelle, sans la remplacer.",
          },
          {
            title: "Rédiger les findings",
            detail:
              "Par finding : où (fichier:ligne), quoi (mécanisme), gravité, correction précise. Un finding sans correction est un reproche inutile.",
          },
        ],
      },
    ],
  },
  {
    id: "dependances",
    title: "Dépendances : la chaîne logicielle",
    level: 2,
    intro:
      "Votre code est sûr ; vos 200 dépendances ? L'inventaire permanent.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : une application moderne est à 90 % du code écrit par d'autres — chaque dépendance est une surface d'attaque que vous importez volontairement. Pourquoi : les CVE dans les bibliothèques populaires (log4shell et consorts) montrent qu'une dépendance négligée compromet toute l'application. La défense : inventaire (lockfile), scans réguliers, mises à jour planifiées.",
      },
      {
        kind: "fields",
        title: "Hygiène des dépendances",
        fields: [
          {
            label: "Verrouiller",
            value:
              "`package-lock.json`, `poetry.lock` : des versions exactes et reproductibles — pas de « dernière version surprise » en production.",
          },
          {
            label: "Scanner",
            value:
              "`npm audit` / `pip-audit` en CI : le pipeline échoue sur les vulnérabilités critiques.",
          },
          {
            label: "Minimiser",
            value:
              "Chaque dépendance doit justifier son existence : moins de dépendances = moins de surface, moins de mises à jour.",
          },
          {
            label: "Mettre à jour",
            value:
              "Dépendabot/Renovate pour les PR automatiques, fenêtre de mise à jour régulière : le retard s'accumule et devient un mur.",
          },
        ],
      },
    ],
  },
  {
    id: "en-tetes-securite",
    title: "En-têtes de sécurité HTTP",
    level: 2,
    intro:
      "Quelques lignes de configuration qui durcissent tout le site.",
    blocks: [
      {
        kind: "code",
        language: "javascript",
        title: "En-têtes de sécurité (exemple Express)",
        code: "// À adapter selon le framework ; l'idée est identique partout\napp.use((req, res, next) => {\n  // Empêche le navigateur d'interpréter les fichiers autrement que déclaré\n  res.setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  // Interdit l'affichage du site dans une iframe (contre le clickjacking)\n  res.setHeader(\"X-Frame-Options\", \"DENY\");\n  // Ne transmet le referrer qu'en HTTPS vers HTTPS\n  res.setHeader(\"Referrer-Policy\", \"strict-origin-when-cross-origin\");\n  next();\n});\n// En production : ajouter HSTS (HTTPS forcé) et une Content Security Policy\n",
      },
      {
        kind: "text",
        text: "En une phrase : ces en-têtes disent au navigateur comment se comporter — ils coûtent trois lignes et bloquent des classes entières d'attaques (clickjacking, MIME-sniffing). Erreur fréquente : les oublier parce que « l'application est déjà sûre » — la défense en profondeur ne fait pas d'économie de trois lignes.",
      },
    ],
  },
  {
    id: "flux-professionnel",
    title: "Le flux professionnel : la sécurité dans le quotidien",
    level: 2,
    intro:
      "Intégrer sans ralentir : les habitudes d'équipe qui tiennent.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Écrire avec les réflexes",
            detail:
              "Validation des entrées, requêtes paramétrées, secrets hors code : les gestes de cette page, appliqués par défaut.",
          },
          {
            title: "Relire en binôme",
            detail:
              "Chaque PR relue avec la grille sécurité (section revue au niveau 3) : deux paires d'yeux voient ce qu'une seule rate.",
          },
          {
            title: "Analyser automatiquement",
            detail:
              "Semgrep + audit de dépendances en CI : le pipeline bloque les patterns dangereux connus.",
          },
          {
            title: "Tester",
            detail:
              "Tests des contrôles (accès refusé quand il faut, validation qui rejette) : la sécurité se teste comme le fonctionnel.",
          },
          {
            title: "Corriger vite",
            detail:
              "CVE critique sur une dépendance = patch en jours, pas en mois : le délai de correction est une métrique suivie.",
          },
        ],
      },
    ],
  },
  {
    id: "erreurs-courantes",
    title: "Erreurs courantes",
    level: 2,
    intro:
      "Les fautes que tout développeur commet une fois — et que les bons ne répètent pas.",
    blocks: [
      {
        kind: "fields",
        title: "Les classiques",
        fields: [
          {
            label: "Concaténer du SQL",
            value:
              "Problème : `query = \"SELECT ...\" + input` — l'entrée contrôle la requête. Pourquoi : ça marche et c'est simple. Mieux : requêtes paramétrées, toujours (section niveau 3).",
          },
          {
            label: "Valider côté client uniquement",
            value:
              "Problème : la validation JavaScript se contourne en une requête directe. Pourquoi : confort utilisateur confondu avec sécurité. Mieux : validation serveur = autorité.",
          },
          {
            label: "Secrets dans Git",
            value:
              "Problème : clé committée = clé compromise. Pourquoi : « je l'enlèverai après ». Mieux : variables d'environnement + `.gitignore` dès le premier commit.",
          },
          {
            label: "Messages d'erreur verbeux",
            value:
              "Problème : la stack trace en production révèle versions et chemins. Pourquoi : debug oublié. Mieux : erreurs génériques en prod, détails en logs internes.",
          },
          {
            label: "Dépendances jamais mises à jour",
            value:
              "Problème : CVE connues depuis des mois dans le lockfile. Pourquoi : « si ça marche, on n'y touche pas ». Mieux : mises à jour planifiées + scans en CI.",
          },
        ],
      },
    ],
  },
  {
    id: "mini-projet",
    title: "Mini-projet : auditer une petite application",
    level: 2,
    intro:
      "Appliquer la grille sur un code réel : trouver, qualifier, corriger.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir la cible",
            detail:
              "Un de vos propres projets (ou un exemple pédagogique) : petit, avec formulaires et base de données.",
          },
          {
            title: "Passer les outils",
            detail:
              "`npm audit` ou `pip-audit`, Semgrep `--config auto` : notez chaque finding avec fichier et ligne.",
          },
          {
            title: "Revue manuelle",
            detail:
              "Grille des 6 étapes (section premier audit) : entrées, données sensibles, contrôles d'accès, sorties.",
          },
          {
            title: "Corriger un finding",
            detail:
              "Choisissez le plus critique, corrigez-le (requête paramétrée, validation, secret déplacé), re-passez l'outil pour vérifier.",
          },
          {
            title: "Rédiger",
            detail:
              "Une page : findings classés, correction appliquée, reste à faire. C'est déjà un mini-rapport d'audit de code.",
          },
        ],
      },
      {
        kind: "text",
        text: "Concepts liés : le niveau 3 détaille chaque famille de failles avec exemples corrigés, le threat modeling et la revue de code systématique.",
      },
    ],
  },
  // ------------------------------------------------------------------
  // NIVEAU 3 — APPROFONDI
  // ------------------------------------------------------------------
  {
    id: "injection-sql",
    title: "Injection SQL : le paramétrage",
    level: 3,
    intro:
      "La faille historique : comprendre le mécanisme pour ne jamais l'introduire.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : l'injection SQL survient quand une entrée utilisateur est concaténée dans une requête — le moteur SQL ne distingue plus la donnée du code. L'exemple ci-dessous montre le mécanisme (à reconnaître pour l'ÉVITER) puis la correction (à appliquer systématiquement).",
      },
      {
        kind: "code",
        language: "python",
        title: "Vulnérable → corrigé (mécanisme illustré, ne jamais écrire la version vulnérable)",
        code: "import sqlite3\nconn = sqlite3.connect(\"app.db\")\n\n# VULNÉRABLE — NE PAS ÉCRIRE : l'entrée est concaténée dans le SQL\n# cur = conn.execute(\"SELECT * FROM users WHERE name = '\" + nom + \"'\")\n\n# CORRIGÉ : requête paramétrée — l'entrée reste une donnée, jamais du code\ncur = conn.execute(\"SELECT * FROM users WHERE name = ?\", (nom,))\n",
      },
      {
        kind: "fields",
        title: "La défense en couches",
        fields: [
          {
            label: "Paramétrage systématique",
            value:
              "La mesure décisive : placeholders (`?`, `%s`, `:nom` selon le driver), jamais de concaténation — sans exception.",
          },
          {
            label: "ORM correctement utilisé",
            value:
              "Les ORM paramètrent par défaut, mais leurs requêtes brutes (`raw`) réintroduisent le risque : les relire avec attention.",
          },
          {
            label: "Moindre privilège SQL",
            value:
              "Le compte applicatif n'a que les droits nécessaires (pas de DROP, pas d'accès aux tables système) : limite l'impact résiduel.",
          },
          {
            label: "Erreur fréquente",
            value:
              "« Nettoyer » avec des regex au lieu de paramétrer : un seul oubli rouvre la faille. Le paramétrage n'est pas une option.",
          },
        ],
      },
    ],
  },
  {
    id: "xss",
    title: "XSS : l'échappement en sortie",
    level: 3,
    intro:
      "Quand votre page exécute du code à la place de l'utilisateur.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : le XSS (cross-site scripting) injecte du JavaScript dans les pages vues par d'autres utilisateurs — via un commentaire, un profil, un message — qui s'exécute alors dans leur navigateur. La défense : traiter toute donnée affichée comme du texte, jamais comme du code.",
      },
      {
        kind: "code",
        language: "tsx",
        title: "React échappe par défaut — le danger est le contournement",
        code: "// SÛR : React échappe automatiquement les données interpolées\nfunction Commentaire({ texte }: { texte: string }) {\n  return <p>{texte}</p>; // <script> s'affiche en texte, ne s'exécute pas\n}\n\n// DANGEREUX — NE PAS ÉCRIRE : contourne l'échappement\n// function Commentaire({ html }: { html: string }) {\n//   return <p dangerouslySetInnerHTML={{ __html: html }} />;\n// }\n",
      },
      {
        kind: "fields",
        title: "Les trois défenses complémentaires",
        fields: [
          {
            label: "Échappement en sortie",
            value:
              "Encoder `<`, `>`, `&`, quotes au moment d'insérer des données dans le HTML. Les frameworks modernes le font par défaut.",
          },
          {
            label: "Content Security Policy",
            value:
              "En-tête HTTP qui limite les sources de script autorisées : même en cas d'injection, le navigateur refuse d'exécuter le code non autorisé.",
          },
          {
            label: "Cookies HttpOnly + SameSite",
            value:
              "Le cookie de session inaccessible au JavaScript (`HttpOnly`) limite le vol de session même si un XSS passe.",
          },
        ],
      },
    ],
  },
  {
    id: "csrf",
    title: "CSRF : les actions à l'insu de l'utilisateur",
    level: 3,
    intro:
      "Forger une requête avec les droits de quelqu'un d'autre : le token anti-CSRF.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : le CSRF (cross-site request forgery) pousse le navigateur d'une victime connectée à envoyer une requête (transfert, suppression) à votre application — avec ses cookies, donc ses droits. La défense : exiger un secret que seul votre site connaît (token anti-CSRF) sur toute action qui modifie des données.",
      },
      {
        kind: "code",
        language: "javascript",
        title: "Token anti-CSRF (principe, Express)",
        code: "// 1. À la connexion : générer un token secret, le stocker en session\n//    ET le transmettre au client (cookie séparé ou champ du formulaire)\n// 2. Sur chaque action (POST/PUT/DELETE) : comparer le token reçu\n//    avec celui de la session — requête rejetée si différent/absent\n// 3. En API moderne : SameSite=Lax/Strict sur les cookies + vérification\n//    d'origine (Origin/Referer) complètent la protection\n",
      },
      {
        kind: "fields",
        title: "Règles",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Token unique par session, transmis hors cookie automatique, vérifié côté serveur sur toute mutation. GET/HEAD ne modifient jamais de données.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Protéger le formulaire mais oublier l'API JSON : toute route qui mute des données est concernée, pas seulement le HTML.",
          },
        ],
      },
    ],
  },
  {
    id: "controle-acces",
    title: "Contrôle d'accès : vérifier à chaque requête",
    level: 3,
    intro:
      "La faille logique n°1 (A01:2021) : l'autorisation oubliée.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Vérification d'autorisation côté serveur",
        code: "# VULNÉRABLE — NE PAS ÉCRIRE : aucune vérification que le document\n# appartient à l'utilisateur connecté\n# @app.get(\"/documents/{doc_id}\")\n# def lire(doc_id: int):\n#     return db.documents.find_one(doc_id)\n\n# CORRIGÉ : le propriétaire est vérifié à chaque requête\nfrom fastapi import HTTPException\n\n@app.get(\"/documents/{doc_id}\")\ndef lire(doc_id: int, utilisateur=utilisateur_courant()):\n    doc = db.documents.find_one(doc_id)\n    if doc is None or doc.proprietaire != utilisateur.id:\n        raise HTTPException(404)  # 404 plutôt que 403 : ne pas révéler l'existence\n    return doc\n",
      },
      {
        kind: "fields",
        title: "Principes",
        fields: [
          {
            label: "Deny by default",
            value:
              "Refuser sauf autorisation explicite : l'oubli d'un contrôle doit bloquer, pas ouvrir.",
          },
          {
            label: "Côté serveur",
            value:
              "Masquer un bouton ne protège pas la route : le contrôle vit dans le backend, jamais dans l'UI.",
          },
          {
            label: "Centraliser",
            value:
              "Un middleware/décorateur unique plutôt que des vérifications dispersées : un seul endroit à auditer.",
          },
        ],
      },
    ],
  },
  {
    id: "authentification",
    title: "Authentification : hacher, pas chiffrer",
    level: 3,
    intro:
      "Stocker des mots de passe : la règle absolue du hachage adapté.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Hachage avec bcrypt (ne jamais stocker en clair ni en MD5/SHA)",
        code: "import bcrypt\n\n# À l'inscription : hacher avec un coût de calcul (sel intégré)\nmot_de_passe_hash = bcrypt.hashpw(\n    mot_de_passe.encode(), bcrypt.gensalt()\n)\n# → stocker mot_de_passe_hash en base (jamais le mot de passe)\n\n# À la connexion : vérifier (comparaison en temps constant)\nif bcrypt.checkpw(tentative.encode(), mot_de_passe_hash):\n    ouvrir_la_session()\n",
      },
      {
        kind: "fields",
        title: "Règles du stockage des mots de passe",
        fields: [
          {
            label: "Algorithme adapté",
            value:
              "`bcrypt`, `argon2` ou `scrypt` : lents volontairement, avec sel unique par mot de passe. Jamais MD5/SHA-1/SHA-256 seuls (trop rapides, cassés par force brute).",
          },
          {
            label: "Jamais réversible",
            value:
              "On hache (sens unique), on ne chiffre pas : même l'administrateur ne doit pas pouvoir retrouver le mot de passe.",
          },
          {
            label: "Politique moderne",
            value:
              "Longueur minimale (12+), vérification contre les mots de passe compromis connus, pas de rotation forcée arbitraire (recommandation NIST SP 800-63).",
          },
        ],
      },
    ],
  },
  {
    id: "sessions-jwt",
    title: "Sessions et JWT : les pièges",
    level: 3,
    intro:
      "Garder l'utilisateur connecté sans ouvrir de porte.",
    blocks: [
      {
        kind: "fields",
        title: "Sessions classiques vs JWT",
        fields: [
          {
            label: "Session serveur",
            value:
              "Jeton opaque en cookie, données côté serveur : révocable à tout moment (déconnexion, compromission). Le choix le plus sûr par défaut.",
          },
          {
            label: "JWT : les pièges",
            value:
              "Signature à vérifier TOUJOURS (algorithme imposé côté serveur, jamais `none`), durées de vie courtes, pas de données sensibles dans le payload (il est lisible), révocation difficile — prévoir une liste de révocation ou des durées courtes + refresh.",
          },
          {
            label: "Cookies",
            value:
              "`HttpOnly` (inaccessible au JS), `Secure` (HTTPS uniquement), `SameSite=Lax/Strict` : les trois attributs, sans exception, pour les cookies de session.",
          },
        ],
      },
      {
        kind: "text",
        text: "Erreur fréquente : stocker le JWT dans `localStorage` « pour simplifier » — accessible à tout XSS. Bonne pratique : cookie `HttpOnly` + `SameSite`, ou session serveur.",
      },
    ],
  },
  {
    id: "command-injection",
    title: "Injection de commandes : ne jamais passer par le shell",
    level: 3,
    intro:
      "Le piège des appels système : préférer les API aux commandes.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Éviter le shell (subprocess sans shell=True)",
        code: "import subprocess, shlex\n\n# VULNÉRABLE — NE PAS ÉCRIRE : shell=True + entrée concaténée\n# subprocess.run(\"convert \" + nom_fichier + \" sortie.png\", shell=True)\n\n# CORRIGÉ : arguments en liste, pas de shell — l'entrée ne peut pas\n# devenir une commande, même si elle contient des métacaractères\nsubprocess.run([\"convert\", nom_fichier, \"sortie.png\"], shell=False)\n\n# MIEUX ENCORE : utiliser une bibliothèque (Pillow) plutôt qu'un binaire\n",
      },
      {
        kind: "fields",
        title: "Règles",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Jamais `shell=True` avec des données externes ; arguments en liste ; mieux : bibliothèque native plutôt qu'appel système.",
          },
          {
            label: "Erreur fréquente",
            value:
              "« Assainir » avec une regex qui bloque `;` et `|` : les contournements sont légion — l'absence de shell est la seule vraie protection.",
          },
        ],
      },
    ],
  },
  {
    id: "path-traversal",
    title: "Path traversal : rester dans le dossier prévu",
    level: 3,
    intro:
      "`../../etc/passwd` : quand un nom de fichier devient un chemin.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Confinement du chemin (résolution + vérification)",
        code: "from pathlib import Path\n\nRACINE = Path(\"/srv/fichiers\").resolve()\n\n# VULNÉRABLE — NE PAS ÉCRIRE : jointure naive\n# chemin = RACINE / nom_demande  # \"../../etc/passwd\" s'échappe !\n\n# CORRIGÉ : résoudre puis vérifier que le résultat reste dans la racine\nchemin = (RACINE / nom_demande).resolve()\nif RACINE not in chemin.parents and chemin != RACINE:\n    raise ValueError(\"Chemin hors périmètre\")\n",
      },
      {
        kind: "text",
        text: "En une phrase : tout nom de fichier venant de l'extérieur est résolu puis vérifié contre la racine autorisée — ou remplacé par un identifiant interne (stockage par ID, pas par nom). Variante : les uploads sont stockés hors de la racine web, avec un nom généré, jamais le nom d'origine.",
      },
    ],
  },
  {
    id: "ssrf",
    title: "SSRF : valider les URL côté serveur",
    level: 3,
    intro:
      "Quand votre serveur fait des requêtes à la place de l'attaquant (A10:2021).",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : le SSRF (server-side request forgery) survient quand l'application récupère une URL fournie par l'utilisateur — l'attaquant lui fait alors interroger le réseau interne (métadonnées cloud, services internes). La défense : liste blanche de domaines, blocage des IP privées/réservées après résolution DNS, pas de redirection suivie aveuglément.",
      },
      {
        kind: "code",
        language: "python",
        title: "Validation d'URL anti-SSRF (principe)",
        code: "import ipaddress, socket\nfrom urllib.parse import urlparse\n\ndef url_autorisee(url: str) -> bool:\n    p = urlparse(url)\n    if p.scheme not in (\"https\",):  # HTTPS uniquement\n        return False\n    ip = ipaddress.ip_address(socket.gethostbyname(p.hostname))\n    # Refuse le réseau interne, le localhost, les métadonnées cloud\n    if ip.is_private or ip.is_loopback or ip.is_link_local:\n        return False\n    return True\n",
      },
    ],
  },
  {
    id: "deserialisation",
    title: "Désérialisation : ne pas exécuter des données",
    level: 3,
    intro:
      "`pickle.loads` sur des données externes : l'exécution de code déguisée.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Formats sûrs vs dangereux",
        code: "import json\n\n# DANGEREUX — NE PAS ÉCRIRE : pickle exécute du code à la désérialisation\n# import pickle\n# objet = pickle.loads(donnees_utilisateur)\n\n# SÛR : JSON ne construit que des données (dict, list, str, nombres)\nobjet = json.loads(donnees_utilisateur)\n# Puis valider la structure (schéma, types) avant usage\n",
      },
      {
        kind: "text",
        text: "En une phrase : n'utilisez que des formats de sérialisation « données seules » (JSON, avec validation de schéma) pour tout ce qui vient de l'extérieur — les formats qui reconstruisent des objets arbitraires (`pickle`, désérialisation Java/PHP native) sont des exécutions de code déguisées. Même règle en Node : `eval` et `new Function` sur des données externes sont proscrits.",
      },
    ],
  },
  {
    id: "crypto-pratique",
    title: "Cryptographie pratique : les règles",
    level: 3,
    intro:
      "Utiliser la crypto sans la réinventer : quatre règles.",
    blocks: [
      {
        kind: "fields",
        title: "Les règles d'or",
        fields: [
          {
            label: "Bibliothèques éprouvées",
            value:
              "Uniquement des libs reconnues (cryptography, libsodium, WebCrypto) : jamais de « petit chiffrement maison » — il sera cassé.",
          },
          {
            label: "Aléatoire cryptographique",
            value:
              "`secrets` (Python), `crypto.randomBytes` (Node) : jamais `random`/`Math.random` pour tokens, sels, clés.",
          },
          {
            label: "TLS correct",
            value:
              "HTTPS partout, versions récentes, certificats valides : la crypto la plus rentable est celle du transport.",
          },
          {
            label: "Comparaisons en temps constant",
            value:
              "`hmac.compare_digest` pour tokens et signatures : les comparaisons naïves fuient de l'information par le temps de réponse.",
          },
        ],
      },
      {
        kind: "code",
        language: "python",
        title: "Générer un token sûr",
        code: "import secrets\n\n# Token URL-safe de 256 bits : imprévisible, adapté aux sessions, liens de réinitialisation, clés temporaires\ntoken = secrets.token_urlsafe(32)\n",
      },
    ],
  },
  {
    id: "gestion-erreurs",
    title: "Gestion d'erreurs et journalisation",
    level: 3,
    intro:
      "Échouer sans fuir : messages sobres dehors, détails dedans.",
    blocks: [
      {
        kind: "fields",
        title: "Les deux faces",
        fields: [
          {
            label: "Côté utilisateur",
            value:
              "Messages génériques (« une erreur est survenue », « identifiants invalides ») : jamais de stack trace, de requête SQL ou de chemin de fichier en production.",
          },
          {
            label: "Côté logs",
            value:
              "Détails complets en interne (avec identifiant de corrélation) : on débugue avec les logs, pas avec l'écran de l'utilisateur.",
          },
          {
            label: "Événements de sécurité",
            value:
              "Logger les échecs de login, les accès refusés, les validations rejetées : ce sont les signaux du SOC (A09:2021).",
          },
          {
            label: "Données sensibles",
            value:
              "Jamais de mot de passe, token ou donnée personnelle dans les logs : masquer ou hacher avant d'écrire.",
          },
        ],
      },
    ],
  },
  {
    id: "threat-modeling",
    title: "Threat modeling : penser avant de coder",
    level: 3,
    intro:
      "STRIDE en 30 minutes : identifier les menaces avant la première ligne.",
    blocks: [
      {
        kind: "table",
        headers: ["STRIDE", "Question à se poser", "Exemple de mitigation"],
        rows: [
          ["Spoofing", "Peut-on usurper une identité ?", "Authentification forte, MFA"],
          ["Tampering", "Peut-on modifier les données ?", "Validation, signatures, contrôles"],
          ["Repudiation", "Peut-on agir sans trace ?", "Journalisation des actions sensibles"],
          ["Information disclosure", "Que peut-on lire indûment ?", "Contrôle d'accès, chiffrement"],
          ["Denial of service", "Peut-on épuiser une ressource ?", "Limites, quotas, files d'attente"],
          ["Elevation of privilege", "Peut-on devenir admin ?", "Moindre privilège, vérifications"],
        ],
      },
      {
        kind: "text",
        text: "En une phrase : avant de coder une fonctionnalité sensible, on dessine le flux de données et on se pose ces six questions — les mitigations conçues ici coûtent dix fois moins cher qu'après. Quand : à chaque nouvelle fonctionnalité qui touche authentification, argent, données personnelles ou administration.",
      },
    ],
  },
  {
    id: "code-review-secu",
    title: "Code review orientée sécurité",
    level: 3,
    intro:
      "La grille de relecture : ce que le reviewer cherche en priorité.",
    blocks: [
      {
        kind: "list",
        items: [
          "Entrées : toute donnée externe est-elle validée (type, bornes, format) avant usage ?",
          "Requêtes : aucune concaténation SQL/commande/shell avec des données variables ?",
          "Sorties : données affichées échappées, erreurs génériques, pas de secrets en logs ?",
          "Accès : chaque route sensible vérifie-t-elle l'autorisation côté serveur ?",
          "Secrets : aucune clé en dur, variables d'environnement, pas de secret dans les tests committés ?",
          "Dépendances : nouvelle dépendance justifiée, version épinglée, pas de CVE connue ?",
          "Crypto : pas de crypto maison, aléatoire sûr, hachage adapté pour les mots de passe ?",
          "Logique : les cas d'erreur échouent-ils en mode sûr (refus par défaut) ?",
        ],
      },
      {
        kind: "text",
        text: "En une phrase : la revue sécurité ne relit pas tout — elle suit les données sensibles et les frontières de confiance, là où naissent les failles. Erreur fréquente : approuver parce que « les tests passent » — les tests vérifient le fonctionnel, pas la sécurité.",
      },
    ],
  },
  {
    id: "testing-securite",
    title: "Tester la sécurité",
    level: 3,
    intro:
      "Des tests qui prouvent que les contrôles tiennent.",
    blocks: [
      {
        kind: "code",
        language: "python",
        title: "Tester un contrôle d'accès (exemple)",
        code: "def test_un_utilisateur_ne_lit_pas_les_documents_d_un_autre(client):\n    # Alice crée un document, Bob tente de le lire\n    doc_id = creer_document_comme(alice)\n    reponse = client.get(f\"/documents/{doc_id}\", utilisateur=bob)\n    # Le contrôle doit refuser : 403/404, jamais 200\n    assert reponse.status_code in (403, 404)\n",
      },
      {
        kind: "list",
        items: [
          "Tester les refus : accès croisé, validation rejetée, session expirée — les tests de sécurité vérifient que « non » reste « non ».",
          "Tester les limites : entrées trop longues, types inattendus, valeurs extrêmes (fuzzing léger).",
          "Automatiser en CI : les tests de contrôles critiques tournent à chaque commit, comme les tests fonctionnels.",
          "Ne pas tester la sécurité uniquement à la main avant la release : c'est trop tard et non reproductible.",
        ],
      },
    ],
  },
  {
    id: "ci-securite",
    title: "Sécurité dans le CI/CD",
    level: 3,
    intro:
      "Le pipeline comme garde-fou : bloquer avant de déployer.",
    blocks: [
      {
        kind: "code",
        language: "yaml",
        title: "Pipeline minimal (GitHub Actions, principe)",
        code: "# À chaque push : audit des dépendances + analyse statique\n# Les étapes échouent (donc bloquent) en cas de finding critique\njobs:\n  securite:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm audit --audit-level=high   # ou pip-audit\n      - run: semgrep --config auto --error .  # bloque sur findings\n",
      },
      {
        kind: "fields",
        title: "Règles du pipeline",
        fields: [
          {
            label: "Bonne pratique",
            value:
              "Bloquer sur le critique/haut, alerter sur le reste ; secrets du CI masqués et limités ; branches protégées avec revue obligatoire.",
          },
          {
            label: "Erreur fréquente",
            value:
              "Pipeline « informatif » que personne ne regarde : un contrôle non bloquant est un contrôle décoratif.",
          },
        ],
      },
    ],
  },
  {
    id: "trufflehog",
    title: "Détecter les secrets égarés",
    level: 3,
    intro:
      "Chercher les clés dans l'historique : TruffleHog et git-secrets.",
    blocks: [
      {
        kind: "command",
        label: "Scanner un repo avec TruffleHog",
        command: "trufflehog git file://. --only-verified",
        why: "TruffleHog détecte les secrets dans tout l'historique Git (pas seulement HEAD) : `--only-verified` ne retient que ceux encore valides — les urgences à révoquer.",
      },
      {
        kind: "command",
        label: "Bloquer les commits contenant des secrets (git-secrets)",
        command: "git secrets --install && git secrets --register-aws",
        why: "`git-secrets` (AWS Labs) installe un hook qui refuse le commit si un pattern de secret est détecté : la prévention plutôt que la détection.",
      },
      {
        kind: "text",
        text: "En une phrase : on scanne l'existant (TruffleHog) ET on bloque l'avenir (hooks de pre-commit) — et tout secret trouvé est révoqué, car l'historique ne s'efface pas vraiment.",
      },
    ],
  },
  {
    id: "debugging-secu",
    title: "Debugging : quand la sécurité casse le fonctionnel",
    level: 3,
    intro:
      "La validation qui rejette tout, le token qui expire : débugger sans ouvrir en grand.",
    blocks: [
      {
        kind: "fields",
        title: "Situations classiques",
        fields: [
          {
            label: "Validation trop stricte",
            value:
              "Des utilisateurs légitimes rejetés : assouplir la règle précise (pas supprimer la validation), ajouter des tests sur les cas réels.",
          },
          {
            label: "Session qui expire trop vite",
            value:
              "Allonger progressivement avec mesure, jamais « infini pour débugger » : chaque assouplissement est documenté et revu.",
          },
          {
            label: "CSP qui bloque des ressources",
            value:
              "Lire les rapports de violation CSP, autoriser précisément les sources légitimes — pas `*`.",
          },
          {
            label: "Test qui échoue après durcissement",
            value:
              "Le test utilisait un comportement dangereux (accès sans auth) : corriger le test, pas le contrôle.",
          },
        ],
      },
      {
        kind: "text",
        text: "Règle d'or : on ne débugge jamais en désactivant la sécurité « temporairement » en production — on reproduit en local, on corrige la cause, on re-teste le contrôle.",
      },
    ],
  },
  {
    id: "erreurs-avancees",
    title: "Erreurs avancées : les pièges des pratiquants",
    level: 3,
    intro:
      "Quand les bases sont acquises, voici ce qui piège encore.",
    blocks: [
      {
        kind: "fields",
        title: "Pièges de niveau avancé",
        fields: [
          {
            label: "Confondre chiffrement et hachage",
            value:
              "Problème : « chiffrer » les mots de passe (réversible) au lieu de les hacher. Pourquoi : vocabulaire flou. Mieux : mots de passe = hachage adapté, toujours.",
          },
          {
            label: "Faire confiance au client",
            value:
              "Problème : le frontend envoie `role: \"admin\"` et le backend l'accepte. Pourquoi : « c'est notre application ». Mieux : le serveur recalcule les droits, jamais depuis le client.",
          },
          {
            label: "Logger trop",
            value:
              "Problème : tokens et données personnelles dans les logs « pour débugger ». Pourquoi : praticité. Mieux : masquage systématique, revue des logs comme du code.",
          },
          {
            label: "Désactiver la sécurité en dev et oublier",
            value:
              "Problème : `verify=False`, CORS `*`, debug activé qui partent en prod. Pourquoi : configuration par environnement mal gérée. Mieux : défauts sûrs, surcharges explicites par env.",
          },
          {
            label: "Croire l'outil exhaustif",
            value:
              "Problème : « Semgrep ne dit rien, donc c'est sûr ». Pourquoi : confiance aveugle. Mieux : l'analyse statique attrape les patterns connus, la revue humaine le reste.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-audit-code",
    title: "Projet : audit de code complet",
    level: 3,
    intro:
      "Le projet fil rouge : auditer, qualifier, corriger, vérifier.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Choisir la cible",
            detail:
              "Une application réelle de taille moyenne (votre projet ou un open source) : avec auth, base de données, uploads si possible.",
          },
          {
            title: "Outiller",
            detail:
              "Semgrep + audit de dépendances + scan de secrets (TruffleHog) : findings automatiques classés.",
          },
          {
            title: "Revue manuelle",
            detail:
              "Grille des 8 points (section code review) : suivre les données sensibles de bout en bout.",
          },
          {
            title: "Qualifier",
            detail:
              "Chaque finding : criticité, exploitabilité, preuve (fichier:ligne). Trier : critique → planifié.",
          },
          {
            title: "Corriger et vérifier",
            detail:
              "Corriger les 3 plus critiques, re-passer les outils, ajouter des tests de non-régression sécurité.",
          },
          {
            title: "Rédiger",
            detail:
              "Rapport d'audit : méthode, findings avec remédiations, plan d'action. Relire : actionnable par un développeur ?",
          },
        ],
      },
    ],
  },
  {
    id: "projet-threat-model",
    title: "Projet : threat model d'une application",
    level: 3,
    intro:
      "Modéliser avant de coder : le livrable d'architecture.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Dessiner",
            detail:
              "Schéma des flux de données de l'application : utilisateurs, API, base, services externes, frontières de confiance.",
          },
          {
            title: "Appliquer STRIDE",
            detail:
              "Pour chaque flux et composant : les 6 questions, menaces listées et cotées.",
          },
          {
            title: "Mitiger",
            detail:
              "Pour chaque menace retenue : mitigation conçue (contrôle précis), responsable, priorité.",
          },
          {
            title: "Restituer",
            detail:
              "Document : schéma, tableau menaces/mitigations, risques résiduels assumés. C'est un livrable d'architecte.",
          },
        ],
      },
    ],
  },
  {
    id: "projet-pipeline",
    title: "Projet : pipeline sécurisé de bout en bout",
    level: 3,
    intro:
      "Industrialiser : la sécurité qui tourne sans y penser.",
    blocks: [
      {
        kind: "steps",
        steps: [
          {
            title: "Base",
            detail:
              "Repo avec CI : audit de dépendances + Semgrep bloquants sur le critique.",
          },
          {
            title: "Secrets",
            detail:
              "Hook pre-commit anti-secrets, scan TruffleHog de l'historique, variables d'environnement documentées.",
          },
          {
            title: "Tests",
            detail:
              "Tests de contrôles (accès refusé, validation) intégrés à la suite de tests.",
          },
          {
            title: "En-têtes",
            detail:
              "En-têtes de sécurité + CSP de base, vérifiés par un test automatisé.",
          },
          {
            title: "Documentation",
            detail:
              "README sécurité : comment signaler une faille, politique de mise à jour des dépendances, contacts.",
          },
        ],
      },
      {
        kind: "text",
        text: "Concepts liés : ce pipeline est le pont vers la Learning Page DevOps/Cloud (sécuriser la chaîne) et Gouvernance (prouver la conformité).",
      },
    ],
  },
  {
    id: "xxe",
    title: "XXE : les entités XML externes",
    level: 3,
    intro: "Un parser XML mal configuré lit vos fichiers : le verrouiller.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : une attaque XXE injecte dans un document XML une entité qui pointe vers un fichier local ou une URL — si le parser résout les entités externes, le fichier est lu ou la requête est émise. Pourquoi : les parsers XML résolvent les entités externes par défaut dans beaucoup de langages.",
      },
      {
        kind: "code",
        language: "python",
        code: "from lxml import etree\n# VULNÉRABLE : résout les entités externes par défaut\nparser = etree.XMLParser()\ntree = etree.fromstring(xml_data, parser)\n\n# CORRIGÉ : entités externes désactivées\nparser = etree.XMLParser(resolve_entities=False, no_network=True)\ntree = etree.fromstring(xml_data, parser)",
      },
      {
          kind: "text",
          text: "Deux options changent tout : resolve_entities=False et no_network=True neutralisent l'XXE à la source, dans le parser lui-même.",
      },
      {
        kind: "fields",
        title: "Les réflexes",
        fields: [
          {
            label: "Désactiver par défaut",
            value: "Tout parser XML (lxml, Java SAX/DOM, .NET) se configure sans entités externes : c'est le premier réglage à vérifier.",
          },
          {
            label: "Préférer JSON",
            value: "Si le format est libre, JSON n'a pas d'entités : le problème disparaît par conception.",
          },
        ],
      },
    ],
  },
  {
    id: "open-redirect",
    title: "Redirections ouvertes : ne pas servir de tremplin",
    level: 3,
    intro: "Un paramètre next mal validé envoie vos utilisateurs au phishing.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : une redirection ouverte utilise votre domaine de confiance pour envoyer l'utilisateur vers un site malveillant (https://votre-site.com/redirect?next=https://evil.com) — le phishing parfait. Pourquoi : l'utilisateur voit votre URL, clique en confiance, atterrit chez l'attaquant.",
      },
      {
        kind: "code",
        language: "python",
        code: "from urllib.parse import urlparse\n\n# VULNÉRABLE : redirige vers n'importe où\nreturn redirect(request.args.get(\"next\", \"/\"))\n\n# CORRIGÉ : allowlist de destinations internes\nALLOWED = {\"/dashboard\", \"/profil\", \"/\"}\ndest = request.args.get(\"next\", \"/\")\nif dest not in ALLOWED:\n    dest = \"/\"\nreturn redirect(dest)",
      },
      {
          kind: "text",
          text: "L'allowlist de chemins internes supprime toute ambiguïté : seules les destinations connues sont autorisées, le reste retombe sur l'accueil.",
      },
    ],
  },
  {
    id: "mass-assignment",
    title: "Affectation de masse : filtrer les champs",
    level: 3,
    intro: "Ne jamais laisser le client choisir quels champs il modifie.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : l'affectation de masse survient quand on mappe directement le JSON reçu sur l'objet métier — l'attaquant ajoute {\"role\": \"admin\"} et devient administrateur. Pourquoi : les frameworks qui bindent automatiquement sont pratiques et dangereux sans allowlist.",
      },
      {
        kind: "code",
        language: "python",
        code: "# VULNÉRABLE : tout le JSON est appliqué à l'utilisateur\nuser.update(request.json)  # role, is_admin... modifiables !\n\n# CORRIGÉ : seuls les champs autorisés passent\nEDITABLE = {\"name\", \"email\", \"bio\"}\nfor key, value in request.json.items():\n    if key in EDITABLE:\n        setattr(user, key, value)",
      },
      {
          kind: "text",
          text: "L'allowlist explicite des champs modifiables rend l'attaque impossible : les champs sensibles ne sont jamais assignés depuis l'entrée utilisateur.",
      },
      {
        kind: "fields",
        title: "Les réflexes",
        fields: [
          {
            label: "DTO dédiés",
            value: "Un objet de transfert par opération (UpdateProfileDTO) plutôt que l'entité complète : la structure impose la sécurité.",
          },
          {
            label: "Jamais de bind aveugle",
            value: "Object.assign, spread, update() sur entrée brute : à bannir sans allowlist — en revue de code, c'est un drapeau rouge.",
          },
        ],
      },
    ],
  },
  {
    id: "nosql-injection",
    title: "Injection NoSQL : MongoDB n'est pas à l'abri",
    level: 3,
    intro: "Les opérateurs MongoDB sont injectables comme le SQL.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : si une requête MongoDB est construite à partir d'entrées utilisateur non validées, un attaquant peut injecter des opérateurs ($ne, $gt) et contourner l'authentification. Pourquoi : {\"password\": {\"$ne\": null}} est vrai pour tout mot de passe — le login passe sans connaître le secret.",
      },
      {
        kind: "code",
        language: "javascript",
        code: "// VULNÉRABLE : l'entrée utilisateur devient opérateur\nconst user = await db.users.findOne({\n  username: req.body.username,\n  password: req.body.password // {\"$ne\": null} => bypass !\n});\n\n// CORRIGÉ : forcer le type chaîne, jamais d'objet\nif (typeof req.body.password !== \"string\") throw new Error(\"invalid\");\nconst user = await db.users.findOne({\n  username: String(req.body.username),\n  passwordHash: hash(String(req.body.password)),\n});",
      },
      {
          kind: "text",
          text: "Forcer le type string empêche l'injection d'opérateurs : un objet $ne ne passe plus la validation et la comparaison se fait sur des hash, jamais en clair.",
      },
    ],
  },
  {
    id: "jwt-attaques",
    title: "Attaques JWT : s'en défendre",
    level: 3,
    intro: "Algorithme none, clés confondues : les pièges des tokens.",
    blocks: [
      {
        kind: "text",
        text: "En une phrase : un JWT mal validé s'attaque via son en-tête (alg=none accepté), la confusion de clés (RSA vérifié en HMAC avec la clé publique) ou l'absence de contrôle d'audience. Pourquoi : le JWT est une promesse signée — si la vérification est laxiste, la promesse ne vaut rien.",
      },
      {
        kind: "fields",
        title: "Les défenses",
        fields: [
          {
            label: "Algorithme imposé",
            value: "Whitelister l'algorithme attendu côté serveur (ex. RS256 uniquement) : jamais de lecture de l'en-tête pour choisir.",
          },
          {
            label: "Vérifier aud et iss",
            value: "Audience et émetteur contrôlés : un token d'un autre service ne doit pas passer.",
          },
          {
            label: "Expiration courte",
            value: "exp court + refresh tokens : un token volé a une durée de vie limitée.",
          },
          {
            label: "Bibliothèque éprouvée",
            value: "Ne jamais implémenter JWT soi-même : les librairies maintenues gèrent les cas pièges.",
          },
        ],
      },
      {
        kind: "text",
        text: "En revue : chercher jwt.verify sans options, les algos lus depuis le token, les secrets en dur — les trois classiques.",
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
          "Ne jamais faire confiance aux entrées : valider (type, bornes, format) côté serveur, systématiquement.",
          "Paramétrer, jamais concaténer : SQL, commandes, HTML — la donnée ne devient jamais du code.",
          "Moindre privilège partout : comptes SQL, rôles, tokens — le droit minimal qui permet le travail.",
          "Secrets hors du code : environnement, coffres, jamais Git — et rotation après exposition.",
          "Échouer en mode sûr : refus par défaut, erreurs génériques dehors, détails dans les logs internes.",
          "Défense en profondeur : validation + paramétrage + CSP + en-têtes — aucune couche seule ne suffit.",
          "Dépendances suivies : inventaire, scans en CI, mises à jour planifiées.",
          "Revue systématique : la grille sécurité sur chaque PR qui touche auth, données ou argent.",
          "Tester les contrôles : les refus et les rejets se testent comme le fonctionnel.",
          "Threat modeling en amont : 30 minutes de STRIDE valent des semaines de correctifs.",
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
          {
            label: "OWASP",
            value: "owasp.org : Top 10, Cheat Sheet Series, Testing Guide, SAMM — la référence applicative.",
          },
          {
            label: "MDN Web Docs",
            value: "developer.mozilla.org : documentation des en-têtes de sécurité, CSP, cookies — précise et à jour.",
          },
          {
            label: "Semgrep",
            value: "semgrep.dev/docs : règles et écriture de règles personnalisées pour l'analyse statique.",
          },
          {
            label: "NIST SP 800-63",
            value: "Les recommandations sur l'authentification (mots de passe, MFA) : la fin des mythes.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Outils : Semgrep, TruffleHog, git-secrets, `npm audit`, `pip-audit` — tous open source.",
          "Pratique : OWASP Juice Shop (en labo) pour observer les mécanismes, vos propres projets pour l'audit.",
          "Communauté : les guides de remédiation des CVE publiées — lire comment les autres corrigent est très formateur.",
        ],
      },
    ],
  },
  {
    id: "que-faire-ensuite",
    title: "Que faire ensuite ?",
    level: 3,
    intro: "Le secure coding maîtrisé, voici les prolongements naturels.",
    blocks: [
      {
        kind: "list",
        items: [
          "Tester en méthode : Pentest — comprendre l'évaluation cadrée des applications que vous sécurisez.",
          "Voir l'exploitation des failles : SOC & Détection — comment les attaques contre vos applications apparaissent dans les journaux.",
          "Prouver : Forensique — analyser une compromission applicative avec rigueur.",
          "Déployer sûr : Cloud Security — le pipeline et l'infrastructure qui hébergent votre code.",
          "Structurer : Gouvernance & Conformité — transformer les bonnes pratiques en politiques d'équipe.",
          "Revenir à la roadmap : valider Secure Coding et passer à la compétence suivante du parcours.",
        ],
      },
    ],
  },
];

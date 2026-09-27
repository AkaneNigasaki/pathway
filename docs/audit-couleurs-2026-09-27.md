# Audit statique — couleurs & backgrounds invisibles/masqués

Projet `~/workspace/pathway` — 2026-09-27. Aucun fichier modifié par l'audit.
Méthode : lecture intégrale de `tokens.css`, `globals.css`, `Illustration.module.css`,
grep de toutes les couleurs en dur / `var(--…)` / `color-mix` / styles inline,
et calcul des ratios de contraste réels (script Python).

Déjà corrigé dans le commit `7f0aebd` (2026-09-27) :
- accents de filière éclaircis en dark mode via `--field-accent` + `color-mix`
  (`globals.css`), utilitaire `.fieldAccent`, `--accent-solid` pour les fonds
  pleins à texte blanc, token `--danger` adapté au thème
  (`ProgressPage.module.css:177` corrigé au passage)
- `var()` en attribut de présentation SVG corrigé (`FlowPulse.tsx`,
  `BranchBanner.tsx`) via classes CSS

Reste à corriger (priorisé) :

## 1. BLOQUANT — `color: var(--border-strong)` en texte
`#d6d6d6` sur fond clair = 1.45:1 ; `#313947` sur fond sombre = 1.59:1.
Illisible dans les deux thèmes.
- `components/CommandPalette/CommandPalette.module.css:160` (`.itemCrumb`)
- `pages/Explore/Explore.module.css:232` (`.resultCrumb`)
- `components/RoadmapGraph/RoadmapMap.module.css:181` (`.caption span`)
- `components/Hero/Hero.module.css:147` (`.sep`, décoratif → mineur)
→ Remplacer par `var(--muted)`.

## 2. MAJEUR (systémique) — `var(--faint)` en texte
`#9a9a9a` sur `#ffffff` = 2.81:1 (light) ; `#6b7280` sur `#0a0c10` = 4.05:1 (dark).
~30 occurrences dans 17 fichiers (`.blockTitle`, `.resourceProvider`,
`.projectFlow`, `.count`, `.stageNum`/`.stagePct`, `.kbd`, `.hints`,
`.fieldLink`, métas des cartes, chevrons, compteurs…).
→ Durcir `--faint` (`#9a9a9a` → ~`#737373` en light, `#6b7280` → ~`#9aa3af`
en dark) **ou** basculer les usages texte vers `var(--muted)`.

## 3. MAJEUR — texte `var(--accent)` global en dark mode
`--accent` reste `#2563eb` en dark → 3.57:1 sur surface sombre.
Occurrences : `SkillPanel.module.css:126` (`.badgeDone`), `:225`
(`.chipAccent`), `:581`+ (`.accChevronOpen`, compteurs), `SkillNode.module.css:189`
(`.nextBadge`), `RoadmapDetail.module.css:186` (`.stageDone`), `:197`
(`.stageActive .stageNum/.stagePct`), `FieldDetail.module.css:185`
(`.pathIcon`), `:210` (`.pathEntry`), `CareerCard.module.css:33,43`,
`RoadmapCard.module.css:39`, `FieldCard.module.css:60`.
→ Introduire `--accent-text` (ex. `#5b8cff` en dark, déjà utilisé comme
fallback dans les illustrations) pour les usages texte. Ne PAS éclaircir
`--accent` globalement (casserait le contraste du texte blanc sur
`.completeCta`).

## 4. Mineurs
- `--illus-fg` / `--illus-box` (`Illustration.module.css:24,28`) : utilisées
  mais jamais définies ; fallbacks OK (`currentColor`, `transparent`) →
  nettoyer l'indirection ou les définir dans `tokens.css`.
- `Explore.module.css:110` : chevron du `<select>` en dur dans une data-URI
  (`stroke='%23999'`) → ne suit pas le thème (décoratif, acceptable).
- `SkillNode.module.css:172` `.dimmed { opacity: 0.28 }` (focus `?stage=`) :
  intentionnel par design, limite connue.

## Vérifié OK (faux positifs)
- `::selection` blanc sur `--accent` : 5.17:1.
- `.completeCta` blanc sur accent : 5.17:1.
- `SkillNode` check `color: var(--background)` : rendu seulement si `done`
  (fond `var(--accent)`) → intentionnel.
- Fonds `color-mix` faibles : subtils mais bordés et intentionnels.
- SVG : `currentColor`/classes CSS, adaptatifs au dark mode.
- Navbar effet verre : voulu. `.reveal { opacity: 0 }` : fallback hook OK.
- Aucun `rgb()/rgba()` en dur ni `white`/`black` en texte ; boutons inversés
  (`background: var(--foreground)` / `color: var(--background)`) corrects.

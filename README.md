# Pathway — Construisez votre parcours

Plateforme interactive de découverte, d'exploration et de suivi de **roadmaps d'apprentissage** par filière et par métier.

## Stack

- **React 19 + TypeScript + Vite**
- **CSS moderne** : variables CSS, CSS Modules, `clamp()`, `@starting-style`
- **Lucide React** pour les icônes
- **Aucune bibliothèque d'animation** — uniquement les capacités natives :
  CSS transitions/keyframes, `IntersectionObserver`, `ResizeObserver`,
  `requestAnimationFrame`, `animation-timeline: scroll()` avec fallback,
  `prefers-reduced-motion`

## Démarrer

```bash
npm install
npm run dev
```

## Contenu

| Données | Contenu |
|---|---|
| `src/data/fields.ts` | 11 filières (nom, description, accent) |
| `src/data/roadmaps/` | 11 roadmaps : frontend, backend, devops, IA, data science, cybersécurité, droit des affaires, finance, économie, UX design, robotique |
| `src/data/careers.ts` | 13 métiers reliés à leurs roadmaps |
| `src/data/search.ts` | Index de recherche global |

**Ajouter une roadmap** : créez un module `src/data/roadmaps/ma-roadmap.ts`
exportant un objet `Roadmap`, puis ajoutez-le à `src/data/roadmaps/index.ts`.
L'interface (listes, graphe, recherche, progression) s'adapte automatiquement.

## Fonctionnalités

- Graphe de roadmap visuel avec connexions SVG animées (`stroke-dashoffset`)
- Panneau de compétence : drawer desktop / bottom sheet mobile
- Progression persistée en `localStorage`, calculée automatiquement
- Command palette (`Ctrl/⌘ + K`), recherche instantanée avec filtres
- Dark mode (`data-theme`), navbar sticky qui se compacte au scroll
- Responsive : roadmap verticale sur mobile, nodes tactiles généreux
- Accessibilité : clavier, focus visible, ARIA, `prefers-reduced-motion`

## Design

Direction inspirée des interfaces professionnelles (Google/Linear/Vercel) :
monochrome + accent discret par filière, typographie Inter avec hiérarchie
en `clamp()`, beaucoup d'espace, micro-interactions sobres.

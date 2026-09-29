import type { SearchItem } from "../types";

/**
 * Index de recherche global, préconstruit au build
 * (scripts/build-search-index.ts → public/search-index.json).
 * Chargé à la demande uniquement (palette Ctrl+K, page Explorer),
 * jamais inclus dans le bundle initial.
 */
let cached: SearchItem[] | null = null;
let pending: Promise<SearchItem[]> | null = null;

export function getSearchIndex(): Promise<SearchItem[]> {
  if (cached) return Promise.resolve(cached);
  if (!pending) {
    pending = fetch(`${import.meta.env.BASE_URL}search-index.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`Index de recherche indisponible (${r.status})`);
        return r.json() as Promise<SearchItem[]>;
      })
      .then((items) => {
        cached = items;
        return items;
      })
      .catch((err) => {
        pending = null;
        throw err;
      });
  }
  return pending;
}

export function searchItems(query: string, items: SearchItem[]): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return items
    .map((item) => {
      let score = 0;
      const title = item.title.toLowerCase();
      for (const t of terms) {
        if (title.startsWith(t)) score += 3;
        else if (title.includes(t)) score += 2;
        else if (item.keywords.includes(t)) score += 1;
        else return null;
      }
      return { item, score };
    })
    .filter((x): x is { item: SearchItem; score: number } => x !== null)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .map((x) => x.item);
}

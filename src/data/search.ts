import type { SearchItem } from "../types";
import { FIELDS } from "./fields";
import { ROADMAPS } from "./roadmaps";
import { CAREERS } from "./careers";
import { SKILL_LEVEL_LABEL } from "../types";

/** Index de recherche global : roadmaps, filières, métiers, compétences. */
export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  for (const f of FIELDS) {
    items.push({
      type: "field",
      id: f.id,
      title: f.name,
      subtitle: f.tagline,
      keywords: `${f.name} ${f.tagline} ${f.description} filière domaine`.toLowerCase(),
      url: `/fields/${f.id}`,
      accent: f.accent,
      fieldId: f.id,
    });
  }

  for (const r of ROADMAPS) {
    items.push({
      type: "roadmap",
      id: r.slug,
      title: r.title,
      subtitle: r.tagline,
      keywords: `${r.title} ${r.tagline} ${r.description} roadmap parcours`.toLowerCase(),
      url: `/roadmaps/${r.slug}`,
      fieldId: r.fieldId,
    });
    for (const s of r.skills) {
      items.push({
        type: "skill",
        id: `${r.slug}:${s.id}`,
        title: s.name,
        subtitle: `${r.title} · ${SKILL_LEVEL_LABEL[s.level]}`,
        keywords: `${s.name} ${s.tagline} ${s.description} ${s.concepts.join(" ")} compétence`.toLowerCase(),
        url: `/roadmaps/${r.slug}?skill=${s.id}`,
        level: s.level,
        fieldId: r.fieldId,
        roadmapSlug: r.slug,
      });
    }
  }

  for (const c of CAREERS) {
    items.push({
      type: "career",
      id: `career:${c.slug}`,
      title: c.title,
      subtitle: c.tagline,
      keywords: `${c.title} ${c.tagline} ${c.description} métier carrière job`.toLowerCase(),
      url: `/careers/${c.slug}`,
      fieldId: c.fieldId,
    });
  }

  return items;
}

export const SEARCH_INDEX: SearchItem[] = buildSearchIndex();

export function searchItems(query: string, items: SearchItem[] = SEARCH_INDEX): SearchItem[] {
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

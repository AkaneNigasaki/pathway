import type { SearchItem } from "../types";
import { FIELDS } from "./fields";
import { ROADMAPS } from "./roadmaps";
import { CAREERS } from "./careers";
import { getSkillGuide } from "./skill-guides";
import type { LearningBlock } from "./skill-guides";

/** Texte indexable d'un bloc de Learning Page (concepts, commandes, erreurs, projets…). */
function blockKeywords(b: LearningBlock): string {
  switch (b.kind) {
    case "text":
      return b.text;
    case "command":
      return `${b.label} ${b.command} ${b.why} ${b.verify ?? ""}`;
    case "code":
      return `${b.title ?? ""} ${b.code}`.slice(0, 500);
    case "list":
      return b.items.join(" ");
    case "fields":
      return `${b.title ?? ""} ${b.fields.map((f) => `${f.label} ${f.value}`).join(" ")}`;
    case "table":
      return `${b.headers.join(" ")} ${b.rows.map((r) => r.join(" ")).join(" ")}`;
    case "diagram":
      return `${b.title ?? ""} ${b.lines.join(" ")}`;
    case "steps":
      return b.steps.map((s) => `${s.title} ${s.detail}`).join(" ");
  }
}

/** Index de recherche global : roadmaps, filières, métiers, compétences, sections de guides. */
export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];
  const fieldName = (id: string) => FIELDS.find((f) => f.id === id)?.name ?? id;

  for (const f of FIELDS) {
    items.push({
      type: "field",
      id: `field:${f.id}`,
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
      id: `roadmap:${r.slug}`,
      title: r.title,
      subtitle: r.tagline,
      breadcrumb: fieldName(r.fieldId),
      keywords: `${r.title} ${r.tagline} ${r.description} roadmap parcours carte`.toLowerCase(),
      url: `/roadmaps/${r.slug}`,
      fieldId: r.fieldId,
    });
    const stageLabel = (stageId: string) =>
      r.stages.find((st) => st.id === stageId)?.label ?? stageId;
    for (const s of r.skills) {
      items.push({
        type: "skill",
        id: `${r.slug}:${s.id}`,
        title: s.name,
        subtitle: s.tagline,
        breadcrumb: `${fieldName(r.fieldId)} → ${stageLabel(s.stage)}`,
        keywords: `${s.name} ${s.tagline} ${s.description} ${s.concepts.join(" ")} ${(s.type ?? "")} compétence outil technologie`.toLowerCase(),
        url: `/roadmaps/${r.slug}?skill=${s.id}`,
        level: s.level,
        fieldId: r.fieldId,
        roadmapSlug: r.slug,
      });
    }
    // Sections des Learning Pages : concepts, commandes, erreurs, projets, outils.
    for (const s of r.skills) {
      const guide = getSkillGuide(r.slug, s.id);
      const learning = guide?.learning;
      if (!learning?.length) continue;
      for (const section of learning) {
        const keywords = [section.title, section.intro ?? "", ...section.blocks.map(blockKeywords)]
          .join(" ")
          .toLowerCase()
          .slice(0, 2500);
        items.push({
          type: "learning",
          id: `learning:${r.slug}:${s.id}:${section.id}`,
          title: section.title,
          subtitle: s.name,
          breadcrumb: `${r.title} → ${s.name}`,
          keywords,
          url: `/docs/${r.slug}/${s.id}#learn-${section.id}`,
          level: s.level,
          fieldId: r.fieldId,
          roadmapSlug: r.slug,
        });
      }
    }
  }

  for (const c of CAREERS) {
    items.push({
      type: "career",
      id: `career:${c.slug}`,
      title: c.title,
      subtitle: c.tagline,
      breadcrumb: fieldName(c.fieldId),
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

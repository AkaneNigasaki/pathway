/**
 * Construit l'index de recherche global et l'écrit dans
 * `public/search-index.json` (chargé à la demande par l'app, jamais bundlé).
 *
 * Exécuté pendant `npm run build`, avant `vite build` pour que le JSON
 * soit copié dans `dist/`.
 *
 * Usage : npx tsx scripts/build-search-index.ts
 */
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { SearchItem } from "../src/types";
import { FIELDS } from "../src/data/fields";
import { ROADMAPS } from "../src/data/roadmaps";
import { CAREERS } from "../src/data/careers";
import { SKILL_GUIDES } from "../src/data/skill-guides";
import type { LearningBlock } from "../src/data/skill-guides";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "..", "public", "search-index.json");

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

/** Mots vides français/anglais exclus des mots-clés de recherche. */
const STOP_WORDS = new Set(
  "le la les de des du un une et est en dans que qui pour pas sur au aux il elle ils elles nous vous je tu ce cette ces son sa ses leur leurs mon ma mes ton ta tes notre votre nos vos avec comme plus tout toute tous toutes aussi entre dont ou quand comment pourquoi parce contre sans sous vers chez pendant depuis jusqu jusque donc car ainsi alors apres avant sont font faire fait faire peut peux peuvent doit doivent avoir être the and for with from this that these those are was were have has had will would can could should then than into over under".split(
    " "
  )
);

/**
 * Mots-clés compacts d'une section : termes distinctifs (≥ 4 lettres,
 * dédupliqués, sans mots vides), pour un index léger mais efficace.
 */
function sectionKeywords(
  title: string,
  intro: string | undefined,
  blocks: LearningBlock[]
): string {
  const raw = [title, intro ?? "", ...blocks.map(blockKeywords)]
    .join(" ")
    .toLowerCase();
  const seen = new Set<string>();
  const out: string[] = [];
  let len = 0;
  for (const w of raw.split(/[^a-zàâäéèêëîïôöùûüç0-9_+#.-]+/)) {
    if (w.length < 4 || STOP_WORDS.has(w) || seen.has(w)) continue;
    seen.add(w);
    out.push(w);
    len += w.length + 1;
    if (len > 400) break;
  }
  return out.join(" ");
}
/** Index de recherche global : roadmaps, filières, métiers, compétences, sections de guides. */
export async function buildSearchIndexData(): Promise<SearchItem[]> {
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
      const guide = SKILL_GUIDES[r.slug]?.[s.id];
      const learning = guide?.learning ? await guide.learning() : [];
      if (!learning.length) continue;
      for (const section of learning) {
        items.push({
          type: "learning",
          id: `learning:${r.slug}:${s.id}:${section.id}`,
          title: section.title,
          subtitle: s.name,
          breadcrumb: `${r.title} → ${s.name}`,
          keywords: sectionKeywords(section.title, section.intro, section.blocks),
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

// Exécution directe : écrit le JSON.
const isMain = process.argv[1]?.endsWith("build-search-index.ts");
if (isMain) {
  const items = await buildSearchIndexData();
  writeFileSync(OUT, JSON.stringify(items));
  console.log(`Index de recherche : ${items.length} entrées → public/search-index.json`);
}

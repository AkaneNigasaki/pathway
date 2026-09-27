/* Validation d'intégrité des données Pathway (à lancer avec tsx). */
import { ROADMAPS } from "../src/data/roadmaps";
import { FIELDS } from "../src/data/fields";
import { CAREERS } from "../src/data/careers";
import { SEARCH_INDEX } from "../src/data/search";
import { NODE_TYPE_LABEL } from "../src/types";

let errors = 0;
const fail = (msg: string) => {
  errors++;
  console.error("  ✗", msg);
};

const fieldIds = new Set(FIELDS.map((f) => f.id));
const roadmapSlugs = new Set(ROADMAPS.map((r) => r.slug));

for (const r of ROADMAPS) {
  if (!fieldIds.has(r.fieldId)) fail(`${r.slug}: fieldId inconnu "${r.fieldId}"`);
  const skillIds = new Set(r.skills.map((s) => s.id));
  const stageIds = new Set(r.stages.map((s) => s.id));
  const seen = new Set<string>();
  for (const s of r.skills) {
    if (seen.has(s.id)) fail(`${r.slug}: compétence dupliquée "${s.id}"`);
    seen.add(s.id);
    if (!stageIds.has(s.stage)) fail(`${r.slug}: "${s.id}" référence une étape inconnue "${s.stage}"`);
    for (const dep of s.prerequisites) {
      if (!skillIds.has(dep)) fail(`${r.slug}: "${s.id}" dépend d'une compétence inconnue "${dep}"`);
      if (dep === s.id) fail(`${r.slug}: "${s.id}" dépend d'elle-même`);
    }
    for (const rel of s.relatedSkills ?? []) {
      if (!skillIds.has(rel)) fail(`${r.slug}: "${s.id}" liée à une compétence inconnue "${rel}"`);
      if (rel === s.id) fail(`${r.slug}: "${s.id}" liée à elle-même`);
    }
    if (s.type && !(s.type in NODE_TYPE_LABEL)) fail(`${r.slug}: "${s.id}" type inconnu "${s.type}"`);
    for (const proj of s.projects) {
      if (typeof proj !== "string" || !proj.trim())
        fail(`${r.slug}: projet invalide dans "${s.id}" → ${JSON.stringify(proj)}`);
    }
    for (const res of s.resources) {
      if (!res.title.trim() || !res.url.startsWith("http")) fail(`${r.slug}: ressource invalide dans "${s.id}"`);
    }
  }
  for (const c of r.careerSlugs) {
    if (!CAREERS.some((x) => x.slug === c)) fail(`${r.slug}: careerSlug inconnu "${c}"`);
  }
}

for (const c of CAREERS) {
  if (!fieldIds.has(c.fieldId)) fail(`métier ${c.slug}: fieldId inconnu "${c.fieldId}"`);
  if (!roadmapSlugs.has(c.roadmapSlug)) fail(`métier ${c.slug}: roadmapSlug inconnu "${c.roadmapSlug}"`);
}

const ids = new Set<string>();
for (const item of SEARCH_INDEX) {
  if (ids.has(item.id)) fail(`index de recherche: id dupliqué "${item.id}"`);
  ids.add(item.id);
}

const totalSkills = ROADMAPS.reduce((n, r) => n + r.skills.length, 0);
console.log(`Roadmaps: ${ROADMAPS.length} · Compétences: ${totalSkills} · Métiers: ${CAREERS.length} · Filières: ${FIELDS.length} · Index: ${SEARCH_INDEX.length}`);
if (errors === 0) {
  console.log("✓ Données valides");
} else {
  console.log(`${errors} erreur(s) détectée(s)`);
  process.exit(1);
}

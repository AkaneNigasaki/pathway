import { SKILL_GUIDES } from "../src/data/skill-guides";
import { ROADMAPS, skillMap } from "../src/data/roadmaps";

const BANNED = [
  "découvrez le futur",
  "révolutionnaire",
  "libérez votre potentiel",
  "liberez votre potentiel",
  "expérience révolutionnaire",
];

let errors = 0;
let warnings = 0;
const err = (m: string) => { errors++; console.error("ERREUR:", m); };
const warn = (m: string) => { warnings++; console.warn("avertissement:", m); };

for (const rm of ROADMAPS) {
  const map = skillMap(rm);
  const guides = SKILL_GUIDES[rm.slug] ?? {};
  const missing: string[] = [];
  for (const s of rm.skills) {
    const g = guides[s.id];
    if (!g) { missing.push(s.id); continue; }
    if (!g.definition || g.definition.length < 20)
      err(`${rm.slug}/${s.id} : definition absente ou trop courte`);
    if (!g.whyLearn || g.whyLearn.length < 20)
      err(`${rm.slug}/${s.id} : whyLearn absent ou trop court`);
    const concepts = g.conceptDetails ?? [];
    if (concepts.length < 3)
      err(`${rm.slug}/${s.id} : conceptDetails < 3 (${concepts.length})`);
    for (const c of concepts)
      if (!c.definition || c.definition.length < 15)
        err(`${rm.slug}/${s.id} : concept "${c.name}" sans définition`);
    if (!g.howItWorks || g.howItWorks.length < 3)
      err(`${rm.slug}/${s.id} : howItWorks < 3 étapes`);
    if (!g.example || !g.example.steps || g.example.steps.length < 3)
      err(`${rm.slug}/${s.id} : example.steps < 3`);
    const projs = g.projectsDetailed ?? [];
    if (projs.length < 2)
      err(`${rm.slug}/${s.id} : projectsDetailed < 2`);
    // prerequisiteNotes : clés ⊆ prerequisites du skill
    const notes = g.prerequisiteNotes ?? {};
    for (const k of Object.keys(notes)) {
      if (!s.prerequisites.includes(k))
        err(`${rm.slug}/${s.id} : prerequisiteNotes["${k}"] n'est pas un prérequis du skill (${JSON.stringify(s.prerequisites)})`);
      if (!map[k]) err(`${rm.slug}/${s.id} : prérequis "${k}" inexistant dans la roadmap`);
    }
    // Ton : phrases marketing interdites
    const blob = [g.definition, g.whyLearn].filter(Boolean).join(" ").toLowerCase();
    for (const b of BANNED)
      if (blob.includes(b)) warn(`${rm.slug}/${s.id} : tournure marketing suspecte (« ${b} »)`);
  }
  if (missing.length > 0)
    err(`${rm.slug} : ${missing.length} skills sans guide : ${JSON.stringify(missing)}`);
}

console.log(
  `\nguides: ${Object.values(SKILL_GUIDES).reduce((n, g) => n + Object.keys(g).length, 0)} | erreurs: ${errors} | avertissements: ${warnings}`
);
process.exit(errors > 0 ? 1 : 0);

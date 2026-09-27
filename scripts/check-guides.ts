import { getRoadmap } from "../src/data/roadmaps";
import { GUIDES_A } from "../src/data/guides/part-a";
import { GUIDES_B } from "../src/data/guides/part-b";
import { BRANCH_GUIDES_B } from "../src/data/guides/part-branches";

const rm = getRoadmap("informatique")!;
const skillById = new Map(rm.skills.map((s) => [s.id, s]));
const stageIds = new Set(rm.stages.map((s) => s.id));
const ILLUS = ["api", "n8n", "devops", "ml", "cybersecurity", "informatique"];
let errors = 0;

const checkGuides = (G: Record<string, any>, name: string) => {
  for (const [id, g] of Object.entries(G)) {
    const skill = skillById.get(id);
    if (!skill) {
      console.log(`[${name}] guide '${id}' : skill INCONNU`);
      errors++;
      continue;
    }
    for (const pid of Object.keys(g.prerequisiteNotes ?? {})) {
      if (!skill.prerequisites.includes(pid)) {
        console.log(
          `[${name}] '${id}' : prerequisiteNotes clé '${pid}' pas dans prerequisites [${skill.prerequisites.join(",")}]`
        );
        errors++;
      }
    }
    for (const p of g.projectsDetailed ?? []) {
      if (p.after && !skillById.has(p.after)) {
        console.log(`[${name}] '${id}' : project.after '${p.after}' inconnu`);
        errors++;
      }
    }
    if (g.illustration && !ILLUS.includes(g.illustration)) {
      console.log(`[${name}] '${id}' : illustration '${g.illustration}' inconnue`);
      errors++;
    }
  }
};
checkGuides(GUIDES_A, "A");
checkGuides(GUIDES_B, "B");
for (const [sid, b] of Object.entries(BRANCH_GUIDES_B)) {
  if (!stageIds.has(sid)) {
    console.log(`[branches] clé '${sid}' : stage INCONNU`);
    errors++;
  }
  if ((b as any).stageId !== sid) {
    console.log(`[branches] clé '${sid}' : stageId='${(b as any).stageId}' incohérent`);
    errors++;
  }
  if (!skillById.has((b as any).entrySkillId)) {
    console.log(`[branches] '${sid}' : entrySkillId '${(b as any).entrySkillId}' inconnu`);
    errors++;
  }
}
for (const id of Object.keys(GUIDES_A))
  if ((GUIDES_B as any)[id]) {
    console.log(`[collision] '${id}' dans A et B`);
    errors++;
  }
console.log(
  "guides A:",
  Object.keys(GUIDES_A).length,
  "| B:",
  Object.keys(GUIDES_B).length,
  "| branches:",
  Object.keys(BRANCH_GUIDES_B).length,
  "| erreurs:",
  errors
);

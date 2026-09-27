import { SKILL_GUIDES } from "../src/data/skill-guides";
import { BRANCH_GUIDES } from "../src/data/branch-guides";
import { ROADMAPS, getRoadmap } from "../src/data/roadmaps";

let totalSkills = 0;
let totalGuides = 0;
const allMissing: string[] = [];
for (const rm of ROADMAPS) {
  const guides = SKILL_GUIDES[rm.slug] ?? {};
  totalSkills += rm.skills.length;
  totalGuides += Object.keys(guides).length;
  const missing = rm.skills.map((s) => s.id).filter((id) => !guides[id]);
  if (missing.length > 0)
    allMissing.push(`${rm.slug}: ${JSON.stringify(missing)}`);
}
console.log(
  `skills: ${totalSkills} | guides: ${totalGuides} | sans guide: ${allMissing.length === 0 ? "[]" : ""}`
);
for (const m of allMissing) console.log("  -", m);

const rm = getRoadmap("informatique")!;
console.log("branches:", Object.keys(BRANCH_GUIDES).length, "/", rm.stages.length);

let withExample = 0;
let withIllus = 0;
for (const guides of Object.values(SKILL_GUIDES)) {
  for (const g of Object.values(guides)) {
    if ((g as any).example) withExample++;
    if ((g as any).illustration) withIllus++;
  }
}
console.log("avec exemple:", withExample, "| avec illustration:", withIllus);

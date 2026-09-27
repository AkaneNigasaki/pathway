import { SKILL_GUIDES } from "../src/data/skill-guides";
import { BRANCH_GUIDES } from "../src/data/branch-guides";
import { getRoadmap } from "../src/data/roadmaps";

const rm = getRoadmap("informatique")!;
const ids = new Set(rm.skills.map((s) => s.id));
const missing = [...ids].filter((id) => !SKILL_GUIDES[id]);
console.log(
  "skills:",
  ids.size,
  "| guides:",
  Object.keys(SKILL_GUIDES).length,
  "| sans guide:",
  JSON.stringify(missing)
);
console.log("branches:", Object.keys(BRANCH_GUIDES).length, "/", rm.stages.length);
// Qualité : compter les guides avec exemple et illustration
let withExample = 0;
let withIllus = 0;
for (const g of Object.values(SKILL_GUIDES)) {
  if ((g as any).example) withExample++;
  if ((g as any).illustration) withIllus++;
}
console.log("avec exemple:", withExample, "| avec illustration:", withIllus);

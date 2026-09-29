/**
 * Convertit les câblages statiques `learning: LEARNING_X` en loaders
 * dynamiques `learning: () => import("./learning-x").then((m) => m.LEARNING_X)`
 * pour que Vite découpe chaque Learning Page dans son propre chunk,
 * chargé uniquement à la visite de la page doc correspondante.
 *
 * Usage : npx tsx scripts/lazy-learning.ts [--apply]
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const GUIDES_DIR = join(HERE, "..", "src", "data", "guides");
const SKILL_GUIDES = join(HERE, "..", "src", "data", "skill-guides.ts");
const APPLY = process.argv.includes("--apply");

const files = readdirSync(GUIDES_DIR)
  .filter((f) => f.startsWith("part-") && f.endsWith(".ts"))
  .map((f) => join(GUIDES_DIR, f));
files.push(SKILL_GUIDES);

let totalConverted = 0;
let totalImportsRemoved = 0;

for (const file of files) {
  const isSkillGuides = file.endsWith("skill-guides.ts");
  const importPrefix = isSkillGuides ? "./guides/learning-" : "./learning-";
  let src = readFileSync(file, "utf8");
  const convertedConsts = new Set<string>();

  // 1) learning: LEARNING_X  ->  learning: () => import(...).then((m) => m.LEARNING_X)
  src = src.replace(
    /^([ \t]*)learning:[ \t]*([A-Z][A-Z0-9_]*)(,?)[ \t]*$/gm,
    (_m, indent: string, constName: string, comma: string) => {
      // Déjà un loader : ne pas toucher.
      if (constName === "()") return _m;
      const fileBase = constName
        .replace(/^LEARNING_/, "")
        .toLowerCase()
        .replace(/_/g, "-");
      convertedConsts.add(constName);
      totalConverted++;
      return (
        `${indent}learning: () => import("${importPrefix}${fileBase}")` +
        `.then((m) => m.${constName})${comma}`
      );
    }
  );

  // 2) Supprimer les imports statiques devenus inutiles.
  for (const c of convertedConsts) {
    const importRe = new RegExp(
      `^import \\{ ${c} \\} from "[^"]*";?\\r?$\\n?`,
      "gm"
    );
    const before = src.length;
    src = src.replace(importRe, "");
    if (src.length !== before) totalImportsRemoved++;
  }

  if (APPLY) writeFileSync(file, src);
}

console.log(
  `${totalConverted} câblages convertis en loaders, ${totalImportsRemoved} imports statiques supprimés` +
    (APPLY ? " (écrits)." : " (dry-run).")
);

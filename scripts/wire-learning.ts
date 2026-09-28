/**
 * Câblage automatique des Learning Pages dans les fichiers part-*.ts.
 * Pour chaque entrée de guide sans champ `learning:`, si un fichier
 * learning-<key>.ts existe, ajoute l'import + `learning: LEARNING_X,`.
 * Usage: npx tsx scripts/wire-learning.ts [--apply]
 * Sans --apply : dry-run (affiche seulement ce qui serait fait).
 */
import * as fs from "fs";
import * as path from "path";

const GUIDES_DIR = "/home/hatch/workspace/pathway/src/data/guides";
const APPLY = process.argv.includes("--apply");

// Exceptions : même skill id dans deux roadmaps, pages distinctes.
// "part-fichier:skill" -> clé du fichier learning-*.ts à utiliser.
const OVERRIDES: Record<string, string> = {
  "part-backend.ts:python": "python-general", // backend (informatique garde learning-python.ts)
  "part-frontend.ts:typescript": "typescript-frontend", // frontend (informatique garde learning-typescript.ts)
};

// 1. Carte fileKey -> nom d'export
const learningMap = new Map<string, string>();
for (const f of fs.readdirSync(GUIDES_DIR)) {
  if (!f.startsWith("learning-") || !f.endsWith(".ts")) continue;
  const key = f.slice("learning-".length, -3);
  const src = fs.readFileSync(path.join(GUIDES_DIR, f), "utf8");
  const m = src.match(/export const (LEARNING_[A-Z0-9_]+)/);
  if (m) learningMap.set(key, m[1]);
  else console.log(`!! pas d'export LEARNING_* dans ${f}`);
}
console.log(`${learningMap.size} fichiers learning.`);

const stripStrings = (line: string) =>
  line
    .replace(/"(?:[^"\\]|\\.)*"/g, '""')
    .replace(/'(?:[^'\\]|\\.)*'/g, "''")
    .replace(/`(?:[^`\\]|\\.)*`/g, "``");

const count = (s: string, ch: string) =>
  [...s].filter((c) => c === ch).length;

interface Wiring {
  file: string;
  key: string;
  fileKey: string; // clé du fichier learning (diffère de key si OVERRIDES)
  exportName: string;
  keyLine: number;
  fieldIndent: string;
}

const wirings: Wiring[] = [];
const skipped: string[] = [];

for (const f of fs.readdirSync(GUIDES_DIR)) {
  if (!f.startsWith("part-") || !f.endsWith(".ts")) continue;
  const full = path.join(GUIDES_DIR, f);
  const lines = fs.readFileSync(full, "utf8").split("\n");

  let inRecord = false;
  let depth = 0;
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!inRecord) {
      if (/(export )?const \w+\s*:\s*Record<string,\s*SkillGuide>/.test(line)) {
        inRecord = true;
        depth = count(stripStrings(line), "{") - count(stripStrings(line), "}");
      }
      i++;
      continue;
    }
    const stripped = stripStrings(line);
    const keyMatch = line.match(/^  ("?)([A-Za-z0-9_-]+)\1: \{$/);
    if (depth === 1 && keyMatch) {
      const key = keyMatch[2];
      // corps de l'entrée : jusqu'au retour à depth 1
      let d = depth + count(stripped, "{") - count(stripped, "}");
      let j = i + 1;
      const bodyLines: string[] = [];
      while (j < lines.length && d > 1) {
        bodyLines.push(lines[j]);
        const s = stripStrings(lines[j]);
        d += count(s, "{") - count(s, "}");
        j++;
      }
      const body = bodyLines.join("\n");
      const hasLearning = /^\s*learning\s*:/m.test(body);
      const fileKey = OVERRIDES[`${f}:${key}`] ?? key;
      if (!hasLearning && learningMap.has(fileKey)) {
        // indentation des champs = celle du premier champ existant
        const fieldLine = bodyLines.find((l) => /^\s*[A-Za-z0-9_"]+\s*:/.test(l));
        const indent = fieldLine ? fieldLine.match(/^(\s*)/)![1] : "    ";
        wirings.push({
          file: f,
          key,
          fileKey,
          exportName: learningMap.get(fileKey)!,
          keyLine: i,
          fieldIndent: indent,
        });
      } else if (!hasLearning) {
        skipped.push(`${f}:${key} (pas de fichier learning)`);
      }
      // avance i à la fin de l'entrée ; recalcule depth
      i = j;
      depth = 1;
      continue;
    }
    depth += count(stripped, "{") - count(stripped, "}");
    if (depth <= 0) inRecord = false;
    i++;
  }
}

console.log(`\n${wirings.length} câblages à faire, ${skipped.length} sans fichier.`);

// grouper par fichier
const byFile = new Map<string, Wiring[]>();
for (const w of wirings) {
  if (!byFile.has(w.file)) byFile.set(w.file, []);
  byFile.get(w.file)!.push(w);
}

for (const [file, ws] of [...byFile.entries()].sort()) {
  console.log(`\n${file}: ${ws.map((w) => (w.fileKey === w.key ? w.key : `${w.key}=>${w.fileKey}`)).join(", ")}`);
  if (!APPLY) continue;
  const full = path.join(GUIDES_DIR, file);
  const lines = fs.readFileSync(full, "utf8").split("\n");

  // 1. imports : après le dernier import learning-*, sinon après le dernier import
  let lastLearningImport = -1;
  let lastImport = -1;
  lines.forEach((l, idx) => {
    if (/^import .* from "\.\/learning-[^"]+";$/.test(l)) lastLearningImport = idx;
    if (/^import .*;$/.test(l)) lastImport = idx;
  });
  const anchor = lastLearningImport >= 0 ? lastLearningImport : lastImport;
  const newImports = [...ws]
    .sort((a, b) => a.fileKey.localeCompare(b.fileKey))
    .map((w) => `import { ${w.exportName} } from "./learning-${w.fileKey}";`);
  lines.splice(anchor + 1, 0, ...newImports);

  // 2. champs learning: (du bas vers le haut pour ne pas décaler les index)
  const sorted = [...ws].sort((a, b) => b.keyLine - a.keyLine);
  for (const w of sorted) {
    const idx = w.keyLine + newImports.length;
    lines.splice(
      idx + 1,
      0,
      `${w.fieldIndent}learning: ${w.exportName},`
    );
  }
  fs.writeFileSync(full, lines.join("\n"));
  console.log(`  -> ${newImports.length} imports + ${ws.length} champs écrits`);
}

if (!APPLY) console.log("\nDry-run : relancer avec --apply pour écrire.");

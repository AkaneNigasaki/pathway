import type { Roadmap, Skill } from "../../types";
import { skillDepth } from "../../data/roadmaps";

/** Dimensions fixes : le layout est 100% calculé, aucune mesure DOM. */
export const NODE_W = 216;
export const NODE_H = 96;
export const GAP_X = 84;
export const GAP_Y = 16;
export const GROUP_GAP = 30;
export const CAPTION_H = 22;
export const PAD = 44;

export interface ColumnGroup {
  stageId: string;
  stageLabel: string;
  count: string;
  /** Position Y de l'intitulé du groupe. */
  captionY: number;
  skills: Skill[];
}

export interface LayoutColumn {
  depth: number;
  x: number;
  groups: ColumnGroup[];
}

export interface GraphLayout {
  columns: LayoutColumn[];
  positions: Map<string, { x: number; y: number }>;
  width: number;
  height: number;
}

/**
 * Layout en couches topologiques : chaque colonne = une profondeur de
 * dépendances. Dans une colonne, les nœuds sont regroupés par branche
 * (stage) avec un intitulé. Les branches (ex. JS → React / Node.js)
 * deviennent visuellement évidentes.
 */
export function layoutGraph(roadmap: Roadmap): GraphLayout {
  const stageIndex = new Map(roadmap.stages.map((s, i) => [s.id, i]));
  const depths = new Map<string, number>();
  let maxDepth = 0;
  for (const s of roadmap.skills) {
    const d = skillDepth(roadmap, s.id);
    depths.set(s.id, d);
    if (d > maxDepth) maxDepth = d;
  }

  const columns: LayoutColumn[] = [];
  const positions = new Map<string, { x: number; y: number }>();
  let maxBottom = 0;

  for (let d = 0; d <= maxDepth; d++) {
    const at = roadmap.skills
      .filter((s) => depths.get(s.id) === d)
      .sort((a, b) => {
        const sa = stageIndex.get(a.stage) ?? 99;
        const sb = stageIndex.get(b.stage) ?? 99;
        return sa - sb || a.name.localeCompare(b.name, "fr");
      });
    if (at.length === 0) continue;

    const x = PAD + d * (NODE_W + GAP_X);
    const groups: ColumnGroup[] = [];
    let y = PAD;
    let currentStage = "";

    for (const s of at) {
      if (s.stage !== currentStage) {
        currentStage = s.stage;
        const stage = roadmap.stages.find((st) => st.id === s.stage);
        if (groups.length > 0) y += GROUP_GAP;
        const captionY = y;
        groups.push({
          stageId: s.stage,
          stageLabel: stage?.label ?? s.stage,
          count: "",
          captionY,
          skills: [],
        });
        y += CAPTION_H + 10;
      }
      positions.set(s.id, { x, y });
      groups[groups.length - 1].skills.push(s);
      y += NODE_H + GAP_Y;
    }
    // Compteurs par groupe
    for (const g of groups) g.count = `${g.skills.length}`;
    columns.push({ depth: d, x, groups });
    if (y > maxBottom) maxBottom = y;
  }

  return {
    columns,
    positions,
    width: PAD + (maxDepth + 1) * (NODE_W + GAP_X) - GAP_X + PAD,
    height: Math.max(maxBottom - GAP_Y + PAD, 320),
  };
}

/** Courbe de Bézier horizontale entre deux nœuds (gauche → droite). */
export function edgePath(
  from: { x: number; y: number },
  to: { x: number; y: number }
): string {
  const x1 = from.x + NODE_W;
  const y1 = from.y + NODE_H / 2;
  const x2 = to.x;
  const y2 = to.y + NODE_H / 2;
  const dx = Math.max(x2 - x1, 24);
  const c = Math.min(dx * 0.55, 90);
  return `M ${x1} ${y1} C ${x1 + c} ${y1}, ${x2 - c} ${y2}, ${x2} ${y2}`;
}

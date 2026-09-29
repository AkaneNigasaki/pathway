import { useEffect, useMemo, useRef, useState } from "react";
import { LuLightbulb as Lightbulb } from "react-icons/lu";
import type { Roadmap, RoadmapStage, Skill } from "../../types";
import type { ProgressMap } from "../../hooks/useProgress";
import { skillDepth } from "../../data/roadmaps";
import { SkillIcon } from "../SkillIcon/SkillIcon";
import styles from "./RoadmapJourney.module.css";

const CHIP_H = 48;
const CHIP_GAP = 10;
const MILE_W = 200;
const MILE_H = 58;
const STAGE_GAP = 72;
const TOP_PAD = 132;
const BOTTOM_PAD = 64;
const MOBILE_BP = 680;

type Direction = "colonne" | "ligne";

interface PlacedChip {
  skill: Skill;
  x: number;
  y: number;
  w: number;
}

interface PlacedStage {
  stage: RoadmapStage;
  index: number;
  mileX: number;
  mileY: number;
  side: "left" | "right" | "center";
  chips: PlacedChip[];
}

interface RoadmapJourneyProps {
  roadmap: Roadmap;
  status: ProgressMap;
  selectedId: string | null;
  onSelect: (skill: Skill) => void;
  /** Branche mise en évidence (les autres sont estompées). */
  highlightStage?: string | null;
}

/** Courbe lissée (Catmull-Rom → Bézier) passant par les points. */
function smoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

/**
 * Carte « voyage » : une route sinueuse verticale relie les jalons d'étapes,
 * les compétences s'embranchement de chaque côté avec leurs vraies icônes.
 * Inspirée des roadmaps Softaims, sans mesure DOM (mise en page déterministe).
 */
export function RoadmapJourney({
  roadmap,
  status,
  selectedId,
  onSelect,
  highlightStage = null,
}: RoadmapJourneyProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [direction, setDirection] = useState<Direction>("colonne");

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      if (w > 0) setWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const stages = useMemo(() => {
    return roadmap.stages
      .map((stage) => ({
        stage,
        skills: roadmap.skills
          .filter((s) => s.stage === stage.id)
          .sort(
            (a, b) =>
              skillDepth(roadmap, a.id) - skillDepth(roadmap, b.id) ||
              a.name.localeCompare(b.name)
          ),
      }))
      .filter((g) => g.skills.length > 0);
  }, [roadmap]);

  /** Mise en page déterministe (aucune mesure DOM). */
  const layout = useMemo(() => {
    if (width <= 0 || stages.length === 0) return null;
    const mobile = width < MOBILE_BP;
    const placed: PlacedStage[] = [];
    let y = TOP_PAD;

    stages.forEach((g, i) => {
      const n = g.skills.length;
      const stackH = n * CHIP_H + (n - 1) * CHIP_GAP;
      const chips: PlacedChip[] = [];

      if (mobile) {
        const chipW = Math.min(width - 56, 330);
        const chipX = (width - chipW) / 2;
        const mileX = width / 2;
        const mileY = y + MILE_H / 2;
        const stackTop = y + MILE_H + 30;
        g.skills.forEach((skill, k) => {
          chips.push({ skill, x: chipX, y: stackTop + k * (CHIP_H + CHIP_GAP), w: chipW });
        });
        const blockH = MILE_H + 30 + stackH;
        placed.push({ stage: g.stage, index: i, mileX, mileY, side: "center", chips });
        y += blockH + STAGE_GAP;
      } else {
        const chipW = Math.min(Math.max(width * 0.3, 180), 300);
        const margin = Math.max(20, width * 0.05);
        const side: "left" | "right" = i % 2 === 0 ? "right" : "left";
        const windAmp = Math.min(56, width * 0.07);
        const mileX = width / 2 + (side === "right" ? -windAmp : windAmp);
        const blockH = Math.max(MILE_H, stackH) + 12;
        const mileY = y + blockH / 2;
        const chipX = side === "left" ? margin : width - margin - chipW;
        const stackTop = y + (blockH - stackH) / 2;
        g.skills.forEach((skill, k) => {
          chips.push({ skill, x: chipX, y: stackTop + k * (CHIP_H + CHIP_GAP), w: chipW });
        });
        placed.push({ stage: g.stage, index: i, mileX, mileY, side, chips });
        y += blockH + STAGE_GAP;
      }
    });

    const totalH = y - STAGE_GAP + BOTTOM_PAD;
    const roadPts = [
      { x: width / 2, y: 52 },
      ...placed.map((p) => ({ x: p.mileX, y: p.mileY })),
      { x: placed[placed.length - 1].mileX, y: totalH - 28 },
    ];
    return { placed, totalH, road: smoothPath(roadPts), mobile };
  }, [width, stages]);

  const dimmed = (stageId: string) =>
    highlightStage !== null && highlightStage !== stageId;

  return (
    <div className={styles.journey} ref={wrapRef}>
      <div className={styles.dirBar}>
        <p className={styles.dirLabel}>Disposition des compétences</p>
        <div className={styles.dirToggle} role="group" aria-label="Disposition des compétences">
          <button
            type="button"
            className={`${styles.dirBtn} ${direction === "colonne" ? styles.dirOn : ""}`}
            aria-pressed={direction === "colonne"}
            onClick={() => setDirection("colonne")}
          >
            Colonne
          </button>
          <button
            type="button"
            className={`${styles.dirBtn} ${direction === "ligne" ? styles.dirOn : ""}`}
            aria-pressed={direction === "ligne"}
            onClick={() => setDirection("ligne")}
          >
            Ligne
          </button>
        </div>
      </div>

      {direction === "ligne" ? (
        <div className={styles.rows}>
          {stages.map((g, i) => (
            <section
              key={g.stage.id}
              className={`${styles.rowStage} ${dimmed(g.stage.id) ? styles.dimmed : ""}`}
              aria-label={`Étape ${i + 1} : ${g.stage.label}`}
            >
              <div className={styles.rowMile}>
                <span className={`${styles.rowNum} mono`}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.rowMileLabel}>{g.stage.label}</span>
                <span className={`${styles.rowCount} mono`}>{g.skills.length}</span>
              </div>
              <div className={styles.rowChips} role="list">
                {g.skills.map((s) => (
                  <JourneyChip
                    key={s.id}
                    skill={s}
                    status={status[s.id] ?? null}
                    selected={selectedId === s.id}
                    onSelect={onSelect}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div
          className={styles.canvas}
          style={layout ? { height: layout.totalH } : undefined}
          role="list"
          aria-label={`Parcours ${roadmap.title}, ${stages.length} étapes`}
        >
          {layout && (
            <svg
              className={styles.road}
              width={width}
              height={layout.totalH}
              viewBox={`0 0 ${width} ${layout.totalH}`}
              aria-hidden="true"
            >
              <path d={layout.road} className={styles.roadPath} />
              {!layout.mobile &&
                layout.placed.flatMap((p) =>
                  p.chips.map((c) => {
                    const cy = c.y + CHIP_H / 2;
                    const x1 = p.side === "left" ? c.x + c.w : c.x;
                    const x2 = p.side === "left" ? p.mileX - MILE_W / 2 : p.mileX + MILE_W / 2;
                    const mx = (x1 + x2) / 2;
                    return (
                      <path
                        key={`${p.stage.id}:${c.skill.id}`}
                        d={`M ${x1} ${cy} Q ${mx} ${cy}, ${mx} ${(cy + p.mileY) / 2} T ${x2} ${p.mileY}`}
                        className={styles.branch}
                        opacity={dimmed(p.stage.id) ? 0.15 : undefined}
                      />
                    );
                  })
                )}
            </svg>
          )}

          {layout && (
            <div
              className={styles.startNode}
              style={{ left: width / 2, top: 52 }}
              aria-hidden="true"
            >
              <Lightbulb size={22} />
            </div>
          )}

          {layout?.placed.map((p) => (
            <div key={p.stage.id} className={dimmed(p.stage.id) ? styles.dimmed : ""}>
              <div
                className={styles.milestone}
                style={{ left: p.mileX, top: p.mileY }}
                role="listitem"
                aria-label={`Étape ${p.index + 1} : ${p.stage.label}, ${p.chips.length} compétences`}
              >
                <span className={`${styles.mileNum} mono`}>{String(p.index + 1).padStart(2, "0")}</span>
                <span className={styles.mileLabel}>{p.stage.label}</span>
                <span className={`${styles.mileCount} mono`}>{p.chips.length}</span>
              </div>
              {p.chips.map((c) => (
                <div
                  key={c.skill.id}
                  className={styles.chipSlot}
                  style={{ left: c.x, top: c.y, width: c.w }}
                  role="listitem"
                >
                  <JourneyChip
                    skill={c.skill}
                    status={status[c.skill.id] ?? null}
                    selected={selectedId === c.skill.id}
                    onSelect={onSelect}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className={styles.legend} aria-hidden="true">
        <span className={styles.legendItem}>
          <i className={`${styles.dot} ${styles.dotTodo}`} /> Non commencé
        </span>
        <span className={styles.legendItem}>
          <i className={`${styles.dot} ${styles.dotActive}`} /> En cours
        </span>
        <span className={styles.legendItem}>
          <i className={`${styles.dot} ${styles.dotDone}`} /> Terminé
        </span>
      </div>
    </div>
  );
}

function JourneyChip({
  skill,
  status,
  selected,
  onSelect,
}: {
  skill: Skill;
  status: "in-progress" | "done" | null;
  selected: boolean;
  onSelect: (skill: Skill) => void;
}) {
  return (
    <button
      type="button"
      role="listitem"
      className={`${styles.chip} ${status === "done" ? styles.chipDone : ""} ${
        status === "in-progress" ? styles.chipActive : ""
      } ${selected ? styles.chipSelected : ""}`}
      onClick={() => onSelect(skill)}
      aria-label={`${skill.name}${status === "done" ? " (terminée)" : status === "in-progress" ? " (en cours)" : ""}`}
      title={skill.name}
    >
      <SkillIcon
        skillId={skill.id}
        nodeType={skill.type ?? "concept"}
        label={skill.name}
        size={22}
        decorative
      />
      <span className={styles.chipName}>{skill.name}</span>
      <span
        className={`${styles.chipDot} ${
          status === "done" ? styles.dotDone : status === "in-progress" ? styles.dotActive : styles.dotTodo
        }`}
        aria-hidden="true"
      />
    </button>
  );
}

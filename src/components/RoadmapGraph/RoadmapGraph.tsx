import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Roadmap, Skill } from "../../types";
import { SkillNode } from "../SkillNode/SkillNode";
import styles from "./RoadmapGraph.module.css";

interface Edge {
  key: string;
  d: string;
  active: boolean;
  from: string;
  to: string;
}

interface RoadmapGraphProps {
  roadmap: Roadmap;
  completed: Set<string>;
  selectedId: string | null;
  onSelect: (skill: Skill) => void;
  onToggle: (skillId: string) => void;
}

/**
 * Graphe de roadmap : les nodes sont positionnés en grille par étape,
 * les dépendances sont dessinées en SVG (courbes de Bézier) mesurées
 * depuis le DOM réel. Les connexions se dessinent progressivement
 * (stroke-dashoffset) et s'activent quand le prérequis est terminé.
 */
export function RoadmapGraph({
  roadmap,
  completed,
  selectedId,
  onSelect,
  onToggle,
}: RoadmapGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLDivElement>());
  const [edges, setEdges] = useState<Edge[]>([]);
  const [drawn, setDrawn] = useState(false);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    const pos = new Map<string, { x: number; y: number; w: number; h: number }>();

    for (const s of roadmap.skills) {
      const el = nodeRefs.current.get(s.id);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      pos.set(s.id, {
        x: r.left - cRect.left,
        y: r.top - cRect.top,
        w: r.width,
        h: r.height,
      });
    }

    const next: Edge[] = [];
    for (const s of roadmap.skills) {
      const t = pos.get(s.id);
      if (!t) continue;
      for (const pid of s.prerequisites) {
        const p = pos.get(pid);
        if (!p) continue;
        const d = buildPath(p, t);
        if (!d) continue;
        next.push({
          key: `${pid}→${s.id}:${completed.has(pid) ? "1" : "0"}`,
          d,
          active: completed.has(pid),
          from: pid,
          to: s.id,
        });
      }
    }
    setEdges(next);
  }, [roadmap, completed]);

  // Mesure initiale après le layout.
  useLayoutEffect(() => {
    measure();
    setDrawn(false);
    const raf = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(raf);
  }, [measure]);

  // Re-mesure au redimensionnement (throttle via rAF) — pas de listener scroll.
  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;
    let raf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    });
    ro.observe(container);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [measure]);

  const isUnlocked = (skill: Skill) =>
    !completed.has(skill.id) &&
    skill.prerequisites.length > 0 &&
    skill.prerequisites.every((p) => completed.has(p));

  return (
    <div ref={containerRef} className={styles.graph}>
      <svg className={styles.edges} aria-hidden="true">
        {edges.map((e, i) => (
          <path
            key={e.key}
            d={e.d}
            pathLength={1}
            className={`${styles.edge} ${e.active ? styles.active : ""} ${
              drawn ? styles.drawn : ""
            }`}
            style={{ animationDelay: `${Math.min(i * 55, 1200)}ms` }}
          />
        ))}
      </svg>

      {roadmap.stages.map((stage, si) => {
        const skills = roadmap.skills.filter((s) => s.stage === stage.id);
        if (skills.length === 0) return null;
        const doneCount = skills.filter((s) => completed.has(s.id)).length;
        return (
          <section key={stage.id} id={`stage-${stage.id}`} className={styles.stage}>
            <header className={styles.stageHead}>
              <span className={`${styles.stageIndex} mono`} aria-hidden="true">
                {String(si + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className={styles.stageLabel}>{stage.label}</h3>
                <p className={styles.stageDesc}>{stage.description}</p>
              </div>
              <span className={`${styles.stageCount} mono`} aria-label={`${doneCount} sur ${skills.length} terminées`}>
                {doneCount}/{skills.length}
              </span>
            </header>
            <div className={styles.nodes}>
              {skills.map((skill) => (
                <SkillNode
                  key={skill.id}
                  ref={(el) => {
                    if (el) nodeRefs.current.set(skill.id, el);
                    else nodeRefs.current.delete(skill.id);
                  }}
                  skill={skill}
                  completed={completed.has(skill.id)}
                  selected={selectedId === skill.id}
                  unlocked={isUnlocked(skill)}
                  onSelect={onSelect}
                  onToggle={onToggle}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

/** Courbe de Bézier entre deux nodes (coordonnées relatives au conteneur). */
function buildPath(
  p: { x: number; y: number; w: number; h: number },
  t: { x: number; y: number; w: number; h: number }
): string | null {
  const GAP = 7;
  const pBottom = p.y + p.h;
  const tTop = t.y;

  if (tTop >= pBottom + 4) {
    // Cible en dessous : courbe verticale.
    const x1 = p.x + p.w / 2;
    const y1 = pBottom + GAP;
    const x2 = t.x + t.w / 2;
    const y2 = tTop - GAP;
    const h = Math.max(y2 - y1, 1);
    const c = Math.min(h * 0.5, 60);
    return `M ${x1} ${y1} C ${x1} ${y1 + c}, ${x2} ${y2 - c}, ${x2} ${y2}`;
  }
  if (p.y >= t.y + t.h + 4) {
    // Cible au-dessus (rare) : courbe verticale inversée.
    const x1 = p.x + p.w / 2;
    const y1 = p.y - GAP;
    const x2 = t.x + t.w / 2;
    const y2 = t.y + t.h + GAP;
    const h = Math.max(y1 - y2, 1);
    const c = Math.min(h * 0.5, 60);
    return `M ${x1} ${y1} C ${x1} ${y1 - c}, ${x2} ${y2 + c}, ${x2} ${y2}`;
  }
  // Côte à côte : courbe horizontale.
  const pRight = p.x + p.w;
  const tLeft = t.x;
  const leftToRight = pRight <= tLeft;
  const x1 = leftToRight ? pRight + GAP : p.x - GAP;
  const y1 = p.y + p.h / 2;
  const x2 = leftToRight ? tLeft - GAP : t.x + t.w + GAP;
  const y2 = t.y + t.h / 2;
  const w = Math.max(Math.abs(x2 - x1), 1);
  const c = Math.min(w * 0.5, 60);
  const dir = leftToRight ? 1 : -1;
  return `M ${x1} ${y1} C ${x1 + dir * c} ${y1}, ${x2 - dir * c} ${y2}, ${x2} ${y2}`;
}

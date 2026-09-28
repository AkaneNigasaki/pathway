import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LuCrosshair as Crosshair, LuExpand as Expand, LuMinus as Minus, LuPlus as Plus, LuRotateCcw as RotateCcw } from "react-icons/lu";
import type { Roadmap, Skill } from "../../types";
import type { ProgressMap } from "../../hooks/useProgress";
import {
  getAncestors,
  getDescendants,
  getNextSkills,
  skillMap,
} from "../../data/roadmaps";
import { SkillNode } from "../SkillNode/SkillNode";
import { Minimap } from "./Minimap";
import { layoutGraph, edgePath, NODE_W, NODE_H, PAD } from "./layout";
import styles from "./RoadmapMap.module.css";

const MIN_Z = 0.3;
const MAX_Z = 2.2;

interface View {
  x: number;
  y: number;
  z: number;
}

interface RoadmapMapProps {
  roadmap: Roadmap;
  status: ProgressMap;
  selectedId: string | null;
  onSelect: (skill: Skill) => void;
  onCycle: (skillId: string) => void;
  /** Plein écran (overlay mobile). */
  fullscreen?: boolean;
  /** Branche mise en évidence (les autres sont estompées). */
  highlightStage?: string | null;
}

/**
 * Carte interactive des connaissances : canvas pannable et zoomable.
 * - Glisser : déplacer (souris + tactile), pincer : zoomer
 * - Ctrl+molette : zoomer sans hijacker le scroll naturel
 * - Sélection : met en évidence prérequis + dépendances
 * - Focus : isole la chaîne d'une compétence
 */
export function RoadmapMap({
  roadmap,
  status,
  selectedId,
  onSelect,
  onCycle,
  fullscreen = false,
  highlightStage = null,
}: RoadmapMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const layout = useMemo(() => layoutGraph(roadmap), [roadmap]);
  const byId = useMemo(() => skillMap(roadmap), [roadmap]);

  const [view, setView] = useState<View>({ x: PAD, y: 28, z: 1 });
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [focus, setFocus] = useState(false);
  const [panning, setPanning] = useState(false);

  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const movedRef = useRef(0);
  const pinchRef = useRef(0);

  const clampZ = (z: number) => Math.min(MAX_Z, Math.max(MIN_Z, z));

  const zoomAt = useCallback((factor: number, cx: number, cy: number) => {
    setView((v) => {
      const z = clampZ(v.z * factor);
      const k = z / v.z;
      return { z, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k };
    });
  }, []);

  const zoomCenter = useCallback(
    (factor: number) => {
      const el = viewportRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      zoomAt(factor, r.width / 2, r.height / 2);
    },
    [zoomAt]
  );

  const resetView = useCallback(() => setView({ x: PAD, y: 28, z: 1 }), []);

  const centerOn = useCallback((wx: number, wy: number) => {
    const el = viewportRef.current;
    if (!el) return;
    const cw = el.clientWidth;
    const ch = el.clientHeight;
    setView((v) => ({ ...v, x: cw / 2 - wx * v.z, y: ch / 2 - wy * v.z }));
  }, []);

  const fitView = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const z = clampZ(Math.min(r.width / layout.width, r.height / layout.height, 1.15));
    setView({
      z,
      x: (r.width - layout.width * z) / 2,
      y: Math.max((r.height - layout.height * z) / 2, 20),
    });
  }, [layout]);

  // Zoom Ctrl+molette (listener non-passif) : ne hijack jamais le scroll naturel.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const r = el.getBoundingClientRect();
      zoomAt(Math.exp(-e.deltaY * 0.0022), e.clientX - r.left, e.clientY - r.top);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  // ── Pan (souris + tactile) & pinch ──
  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("[data-node]")) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    movedRef.current = 0;
    setPanning(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 1) {
      const dx = e.clientX - prev.x;
      const dy = e.clientY - prev.y;
      movedRef.current += Math.abs(dx) + Math.abs(dy);
      setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }));
    } else if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const rect = viewportRef.current?.getBoundingClientRect();
      if (pinchRef.current > 0 && rect && dist > 0) {
        zoomAt(dist / pinchRef.current, (a.x + b.x) / 2 - rect.left, (a.y + b.y) / 2 - rect.top);
      }
      pinchRef.current = dist;
      movedRef.current += 10;
    }
  };

  const endPointer = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchRef.current = 0;
    if (pointers.current.size === 0) setPanning(false);
  };

  // Un drag n'est jamais un clic sur un nœud.
  const onClickCapture = (e: React.SyntheticEvent) => {
    if (movedRef.current > 6) {
      e.stopPropagation();
      e.preventDefault();
      movedRef.current = 0;
    }
  };

  // ── Sélection : prérequis + dépendances mis en évidence ──
  const kept = useMemo(() => {
    if (!selectedId || !byId[selectedId]) return null;
    const anc = getAncestors(roadmap, selectedId);
    if (focus) {
      const direct = new Set(getNextSkills(roadmap, selectedId).map((s) => s.id));
      const related = new Set(
        (byId[selectedId].relatedSkills ?? []).filter((id) => byId[id])
      );
      return new Set([selectedId, ...anc, ...direct, ...related]);
    }
    const desc = getDescendants(roadmap, selectedId);
    return new Set([selectedId, ...anc, ...desc]);
  }, [roadmap, selectedId, focus, byId]);

  // ── Branche mise en évidence (?stage=, chips d'étapes) ──
  const stageSet = useMemo(() => {
    if (!highlightStage) return null;
    const ids = roadmap.skills
      .filter((s) => s.stage === highlightStage)
      .map((s) => s.id);
    return ids.length > 0 ? new Set(ids) : null;
  }, [roadmap, highlightStage]);

  // La sélection prime sur la mise en évidence de branche.
  const activeSet = kept ?? stageSet;

  const edges = useMemo(() => {
    const list: { key: string; d: string; from: string; to: string }[] = [];
    for (const s of roadmap.skills) {
      const to = layout.positions.get(s.id);
      if (!to) continue;
      for (const pid of s.prerequisites) {
        const from = layout.positions.get(pid);
        if (!from) continue;
        list.push({ key: `${pid}→${s.id}`, d: edgePath(from, to), from: pid, to: s.id });
      }
    }
    return list;
  }, [roadmap, layout]);

  const isDone = (id: string) => status[id] === "done";
  const isUnlocked = (s: Skill) =>
    !status[s.id] &&
    s.prerequisites.length > 0 &&
    s.prerequisites.every((p) => status[p] === "done");

  return (
    <div
      ref={containerRef}
      className={`${styles.map} ${fullscreen ? styles.fullscreen : ""}`}
    >
      {/* Barre d'outils */}
      <div className={styles.toolbar} role="toolbar" aria-label="Contrôles de la carte">
        <button type="button" onClick={() => zoomCenter(1 / 1.25)} aria-label="Zoom arrière" title="Zoom arrière">
          <Minus size={16} />
        </button>
        <button type="button" onClick={() => zoomCenter(1.25)} aria-label="Zoom avant" title="Zoom avant">
          <Plus size={16} />
        </button>
        <span className={styles.sep} aria-hidden="true" />
        <button type="button" onClick={resetView} aria-label="Réinitialiser la vue" title="Réinitialiser la vue">
          <RotateCcw size={15} />
        </button>
        <button type="button" onClick={fitView} aria-label="Ajuster à l'écran" title="Ajuster à l'écran">
          <Expand size={15} />
        </button>
        <span className={styles.sep} aria-hidden="true" />
        <button
          type="button"
          onClick={() => setFocus((f) => !f)}
          aria-pressed={focus}
          aria-label="Mode focus : isoler la chaîne de la compétence sélectionnée"
          title="Mode focus"
          className={focus ? styles.focusOn : ""}
        >
          <Crosshair size={15} />
          <span className={styles.focusLabel}>Focus</span>
        </button>
      </div>

      {/* Canvas */}
      <div
        ref={viewportRef}
        className={`${styles.viewport} ${panning ? styles.panning : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onClickCapture={onClickCapture}
        role="application"
        aria-label="Carte des connaissances. Glissez pour déplacer, Ctrl+molette pour zoomer."
      >
        <div
          className={styles.canvas}
          style={{
            width: layout.width,
            height: layout.height,
            transform: `translate(${view.x}px, ${view.y}px) scale(${view.z})`,
          }}
        >
          <svg
            className={styles.edges}
            width={layout.width}
            height={layout.height}
            aria-hidden="true"
          >
            {edges.map((e) => {
              const hot = hoverId !== null && (e.from === hoverId || e.to === hoverId);
              const inKept = activeSet !== null && activeSet.has(e.from) && activeSet.has(e.to);
              const faded = activeSet !== null && !inKept;
              return (
                <path
                  key={e.key}
                  d={e.d}
                  pathLength={1}
                  className={`${styles.edge} ${isDone(e.from) ? styles.edgeDone : ""} ${
                    inKept ? styles.edgeKept : ""
                  } ${faded ? styles.edgeFaded : ""} ${hot ? styles.edgeHot : ""}`}
                />
              );
            })}
          </svg>

          {layout.columns.map((col) => (
            <div key={col.depth}>
              {col.groups.map((g) => (
                <div key={g.stageId}>
                  <p
                    className={styles.caption}
                    style={{ left: col.x, top: g.captionY }}
                    aria-hidden="true"
                  >
                    {g.stageLabel}
                    <span className="mono">{g.count}</span>
                  </p>
                  {g.skills.map((s) => {
                    const p = layout.positions.get(s.id)!;
                    return (
                      <div
                        key={s.id}
                        className={styles.nodeSlot}
                        style={{ left: p.x, top: p.y, width: NODE_W, height: NODE_H }}
                      >
                        <SkillNode
                          skill={s}
                          status={status[s.id] ?? null}
                          selected={selectedId === s.id}
                          dimmed={activeSet !== null && !activeSet.has(s.id)}
                          unlocked={isUnlocked(s)}
                          onSelect={onSelect}
                          onCycle={onCycle}
                          onHover={setHoverId}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Légende */}
      <div className={styles.legend} aria-hidden="true">
        <span className={styles.legendItem}>
          <i className={`${styles.legendDot} ${styles.lgTodo}`} /> Non commencé
        </span>
        <span className={styles.legendItem}>
          <i className={`${styles.legendDot} ${styles.lgActive}`} /> En cours
        </span>
        <span className={styles.legendItem}>
          <i className={`${styles.legendDot} ${styles.lgDone}`} /> Terminé
        </span>
        <span className={styles.legendHint}>Glisser · Ctrl+molette</span>
      </div>

      <Minimap
        layout={layout}
        view={view}
        viewportRef={viewportRef}
        status={status}
        selectedId={selectedId}
        onCenter={centerOn}
      />
    </div>
  );
}

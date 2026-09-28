import { useEffect, useRef, useState } from "react";
import type { GraphLayout } from "./layout";
import { NODE_W, NODE_H } from "./layout";
import type { ProgressMap } from "../../hooks/useProgress";
import styles from "./Minimap.module.css";

interface MinimapProps {
  layout: GraphLayout;
  view: { x: number; y: number; z: number };
  viewportRef: React.RefObject<HTMLDivElement | null>;
  status: ProgressMap;
  selectedId: string | null;
  onCenter: (worldX: number, worldY: number) => void;
}

const MM_W = 152;

/**
 * Minimap de la roadmap : aperçu global des nœuds + rectangle du viewport.
 * Un clic recentre la carte sur le point visé. Masquée sur petit écran.
 */
export function Minimap({ layout, view, viewportRef, status, selectedId, onCenter }: MinimapProps) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [viewportRef]);

  if (layout.width <= 0 || size.w === 0) return null;

  const scale = MM_W / layout.width;
  const mmH = Math.max(60, layout.height * scale);

  // Rectangle du viewport exprimé en coordonnées monde.
  const wx = -view.x / view.z;
  const wy = -view.y / view.z;
  const ww = size.w / view.z;
  const wh = size.h / view.z;

  const toWorld = (e: React.MouseEvent | React.KeyboardEvent) => {
    const svg = boxRef.current?.querySelector("svg");
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    let cx = 0;
    let cy = 0;
    if ("clientX" in e) {
      cx = e.clientX - rect.left;
      cy = e.clientY - rect.top;
    } else {
      cx = rect.width / 2;
      cy = rect.height / 2;
    }
    onCenter((cx / rect.width) * layout.width, (cy / rect.height) * layout.height);
  };

  const nodes: { x: number; y: number; id: string }[] = [];
  layout.positions.forEach((p, id) => nodes.push({ x: p.x, y: p.y, id }));

  return (
    <div
      ref={boxRef}
      className={styles.minimap}
      role="button"
      tabIndex={0}
      aria-label="Mini-carte : activer puis cliquer pour recentrer la roadmap"
      onClick={toWorld}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toWorld(e);
        }
      }}
    >
      <svg width={MM_W} height={mmH} viewBox={`0 0 ${layout.width} ${layout.height}`} aria-hidden="true">
        {nodes.map((n) => {
          const st = status[n.id];
          return (
            <rect
              key={n.id}
              x={n.x}
              y={n.y}
              width={NODE_W}
              height={NODE_H}
              rx={8}
              className={`${styles.node} ${st === "done" ? styles.done : st === "in-progress" ? styles.wip : ""} ${
                n.id === selectedId ? styles.selected : ""
              }`}
            />
          );
        })}
        <rect
          x={Math.max(0, wx)}
          y={Math.max(0, wy)}
          width={Math.min(ww, layout.width)}
          height={Math.min(wh, layout.height)}
          className={styles.viewport}
        />
      </svg>
    </div>
  );
}

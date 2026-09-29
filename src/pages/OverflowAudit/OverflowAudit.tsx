import { useEffect, useRef, useState } from "react";
import { RoadmapJourney } from "../../components/RoadmapGraph/RoadmapJourney";
import { getRoadmap } from "../../data/roadmaps";
import type { ProgressMap } from "../../hooks/useProgress";

const WIDTHS = [320, 360, 375, 390, 414, 430, 768];

interface AuditResult {
  width: number;
  wrapperScroll: number;
  wrapperClient: number;
  docScroll: number;
  docClient: number;
  offenders: string[];
}

/**
 * Page de test TEMPORAIRE (à supprimer) : rend le vrai RoadmapJourney
 * à largeurs fixes et audite les débordements réels dans le DOM.
 */
export function OverflowAudit() {
  const roadmap = getRoadmap("informatique");
  const [results, setResults] = useState<AuditResult[]>([]);
  const [runId, setRunId] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const status: ProgressMap = {};

  useEffect(() => {
    // Laisse le layout se stabiliser (ResizeObserver + paint).
    const t = window.setTimeout(() => {
      const docEl = document.documentElement;
      const out: AuditResult[] = WIDTHS.map((w, i) => {
        const wrap = refs.current[i];
        const offenders: string[] = [];
        if (wrap) {
          const wrapRect = wrap.getBoundingClientRect();
          // Éléments dont le bord droit dépasse le wrapper.
          wrap.querySelectorAll("*").forEach((el) => {
            const r = (el as HTMLElement).getBoundingClientRect();
            if (r.right > wrapRect.right + 1 && r.width > 0) {
              const cls =
                (el as HTMLElement).className?.toString?.().slice(0, 60) ?? "?";
              if (offenders.length < 5) offenders.push(`${el.tagName}.${cls}→${Math.round(r.right - wrapRect.right)}px`);
            }
          });
          return {
            width: w,
            wrapperScroll: wrap.scrollWidth,
            wrapperClient: wrap.clientWidth,
            docScroll: docEl.scrollWidth,
            docClient: docEl.clientWidth,
            offenders,
          };
        }
        return {
          width: w,
          wrapperScroll: -1,
          wrapperClient: -1,
          docScroll: docEl.scrollWidth,
          docClient: docEl.clientWidth,
          offenders: ["no-ref"],
        };
      });
      setResults(out);
    }, 800);
    return () => window.clearTimeout(t);
  }, [runId]);

  if (!roadmap) return <p>Roadmap introuvable</p>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Audit overflow — RoadmapJourney (informatique)</h1>
      <p>
        Document : scrollWidth=<b id="doc-sw">{document.documentElement?.scrollWidth}</b> —
        chaque wrapper simule un viewport. Cliquez « Ligne » dans chaque carte puis
        « Relancer l'audit » pour tester le mode Ligne.
      </p>
      <button
        type="button"
        onClick={() => setRunId((n) => n + 1)}
        style={{ padding: "12px 24px", fontSize: 16, marginBottom: 16 }}
      >
        Relancer l'audit
      </button>
      {results.length > 0 && (
        <table border={1} cellPadding={6} style={{ marginBottom: 24, borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Largeur</th>
              <th>wrapper scrollW</th>
              <th>wrapper clientW</th>
              <th>OK ?</th>
              <th>Coupables (dépassement)</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.width} style={{ background: r.wrapperScroll <= r.wrapperClient + 1 ? "#dfd" : "#fdd" }}>
                <td>{r.width}px</td>
                <td>{r.wrapperScroll}</td>
                <td>{r.wrapperClient}</td>
                <td>{r.wrapperScroll <= r.wrapperClient + 1 ? "PASS" : "FAIL"}</td>
                <td style={{ fontSize: 12 }}>{r.offenders.join(" | ") || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {WIDTHS.map((w, i) => (
        <section key={w} style={{ marginBottom: 48 }}>
          <h2 style={{ position: "sticky", top: 0, background: "#fff", padding: "8px 0" }}>
            Viewport simulé : {w}px
          </h2>
          <div
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-audit-width={w}
            style={{
              width: `${w}px`,
              maxWidth: "100%",
              border: "2px dashed red",
              overflow: "visible",
            }}
          >
            <RoadmapJourney
              roadmap={roadmap}
              status={status}
              selectedId={null}
              onSelect={() => {}}
            />
          </div>
        </section>
      ))}
    </div>
  );
}

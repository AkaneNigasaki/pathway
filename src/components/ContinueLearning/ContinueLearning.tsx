import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ROADMAPS, skillDepth } from "../../data/roadmaps";
import { getField } from "../../data/fields";
import { countDone, progressPercent, useAllProgress } from "../../hooks/useProgress";
import styles from "./ContinueLearning.module.css";

/**
 * « Continue learning » : si l'utilisateur a des parcours en cours,
 * affiche immédiatement où il s'était arrêté — sans recherche manuelle.
 */
export function ContinueLearning() {
  const { store } = useAllProgress();

  const items = useMemo(() => {
    const out: {
      slug: string;
      title: string;
      accent?: string;
      nextName: string;
      nextId: string;
      done: number;
      total: number;
      percent: number;
    }[] = [];
    for (const r of ROADMAPS) {
      const st = store[r.id];
      if (!st) continue;
      const done = countDone(st);
      if (done === 0 || done >= r.skills.length) continue;
      const ready = r.skills
        .filter(
          (s) => !st[s.id] && s.prerequisites.every((p) => st[p] === "done")
        )
        .sort((a, b) => skillDepth(r, a.id) - skillDepth(r, b.id));
      const next = ready[0] ?? r.skills.find((s) => !st[s.id]);
      if (!next) continue;
      out.push({
        slug: r.slug,
        title: r.title,
        accent: getField(r.fieldId)?.accent,
        nextName: next.name,
        nextId: next.id,
        done,
        total: r.skills.length,
        percent: progressPercent(done, r.skills.length),
      });
    }
    return out.slice(0, 3);
  }, [store]);

  if (items.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="continue-title">
      <div className="container">
        <p className="eyebrow">Continue learning</p>
        <h2 className={styles.title} id="continue-title">
          Reprenez où vous étiez.
        </h2>
        <div className={styles.grid}>
          {items.map((it) => (
            <Link
              key={it.slug}
              to={`/roadmaps/${it.slug}?skill=${it.nextId}`}
              className={styles.card}
            >
              <span
                className={styles.dot}
                style={it.accent ? ({ "--field-accent": it.accent } as React.CSSProperties) : undefined}
                aria-hidden="true"
              />
              <span className={styles.roadmap}>{it.title}</span>
              <span className={styles.next}>
                {it.nextName}
                <span className={styles.go}>
                  Continue <ArrowRight size={15} aria-hidden="true" />
                </span>
              </span>
              <span className={styles.meta}>
                <span className={`${styles.bar} mono`} aria-hidden="true">
                  <span style={{ width: `${it.percent}%` }} />
                </span>
                <span className="mono">
                  {it.done}/{it.total}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

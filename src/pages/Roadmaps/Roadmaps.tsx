import { useMemo, useState } from "react";
import { Reveal } from "../../components/Reveal/Reveal";
import { RoadmapCard } from "../../components/RoadmapCard/RoadmapCard";
import { FIELDS } from "../../data/fields";
import { ROADMAPS } from "../../data/roadmaps";
import { useAllProgress, progressPercent, countDone } from "../../hooks/useProgress";
import styles from "./Roadmaps.module.css";

export function Roadmaps() {
  const [fieldFilter, setFieldFilter] = useState<string>("all");
  const { store } = useAllProgress();

  const fieldsWithRoadmaps = useMemo(
    () => FIELDS.filter((f) => ROADMAPS.some((r) => r.fieldId === f.id)),
    []
  );

  const list = useMemo(
    () =>
      fieldFilter === "all"
        ? ROADMAPS
        : ROADMAPS.filter((r) => r.fieldId === fieldFilter),
    [fieldFilter]
  );

  const progressOf = (roadmapId: string, total: number) =>
    progressPercent(countDone(store[roadmapId]), total);

  return (
    <div className={styles.page}>
      <div className="container">
        <Reveal className={styles.head}>
          <p className="eyebrow">Roadmaps</p>
          <h1 className={styles.title}>Des parcours,
            <br />
            pas des listes.</h1>
          <p className="section-lead">
            Chaque roadmap est un graphe vivant : suivez les dépendances,
            validez vos compétences, mesurez votre progression.
          </p>
        </Reveal>

        <Reveal className={styles.filters} delay={100}>
          <div className={styles.chips} role="group" aria-label="Filtrer par filière">
            <button
              type="button"
              className={`${styles.chip} ${fieldFilter === "all" ? styles.on : ""}`}
              onClick={() => setFieldFilter("all")}
              aria-pressed={fieldFilter === "all"}
            >
              Toutes
            </button>
            {fieldsWithRoadmaps.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`${styles.chip} ${fieldFilter === f.id ? styles.on : ""}`}
                onClick={() => setFieldFilter(f.id)}
                aria-pressed={fieldFilter === f.id}
                style={fieldFilter === f.id ? { "--field-accent": f.accent } as React.CSSProperties : undefined}
              >
                <span
                  className={styles.dot}
                  style={{ "--field-accent": f.accent } as React.CSSProperties}
                  aria-hidden="true"
                />
                {f.name}
              </button>
            ))}
          </div>
        </Reveal>

        <div className={styles.grid} aria-live="polite">
          {list.map((r, i) => (
            <Reveal key={r.slug} delay={Math.min(i * 50, 300)}>
              <RoadmapCard roadmap={r} progress={progressOf(r.id, r.skills.length)} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LuArrowRight as ArrowRight, LuSearch as Search } from "react-icons/lu";
import { Reveal } from "../../components/Reveal/Reveal";
import { RoadmapCard } from "../../components/RoadmapCard/RoadmapCard";
import { FIELDS, getField } from "../../data/fields";
import { ROADMAPS } from "../../data/roadmaps";
import { CAREERS } from "../../data/careers";
import { useAllProgress, progressPercent, countDone } from "../../hooks/useProgress";
import styles from "./Roadmaps.module.css";

/** « Explore by skills » — paires (roadmap, skill) vérifiées. */
const SKILL_CHIPS: { name: string; url: string }[] = [
  { name: "Python", url: "/roadmaps/data-scientist?skill=python" },
  { name: "React", url: "/roadmaps/frontend-developer?skill=react" },
  { name: "Docker", url: "/roadmaps/devops-engineer?skill=docker" },
  { name: "Kubernetes", url: "/roadmaps/devops-engineer?skill=kubernetes" },
  { name: "n8n", url: "/roadmaps/informatique?skill=n8n" },
  { name: "TypeScript", url: "/roadmaps/frontend-developer?skill=typescript" },
];

export function Roadmaps() {
  const [fieldFilter, setFieldFilter] = useState<string>("all");
  const [query, setQuery] = useState("");
  const { store } = useAllProgress();

  const fieldsWithRoadmaps = useMemo(
    () => FIELDS.filter((f) => ROADMAPS.some((r) => r.fieldId === f.id)),
    []
  );

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ROADMAPS.filter((r) => {
      if (fieldFilter !== "all" && r.fieldId !== fieldFilter) return false;
      if (q && !`${r.title} ${r.tagline}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [fieldFilter, query]);

  const progressOf = (roadmapId: string, total: number) =>
    progressPercent(countDone(store[roadmapId]), total);

  return (
    <div className={styles.page}>
      <div className="container">
        <Reveal className={styles.head}>
          <p className="eyebrow">Roadmaps</p>
          <h1 className={styles.title}>Roadmaps</h1>
          <p className="section-lead">
            Des parcours structurés : définitions, prérequis, projets,
            progression et dépendances.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className={styles.searchBar} role="search">
            <Search size={19} aria-hidden="true" className={styles.searchIcon} />
            <label htmlFor="roadmaps-search" className={styles.srOnly}>
              Search roadmaps
            </label>
            <input
              id="roadmaps-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search roadmaps..."
              autoComplete="off"
            />
          </div>
        </Reveal>

        {/* ── Explore by category ── */}
        <Reveal className={styles.exploreBlock}>
          <h2 className={styles.exploreTitle}>Explore by category</h2>
          <ul className={styles.chipList} aria-label="Roadmaps par métier">
            {CAREERS.map((c) => {
              const field = getField(c.fieldId);
              return (
                <li key={c.slug}>
                  <Link to={`/careers/${c.slug}`} className={styles.tag}>
                    <span
                      className={styles.chipDot}
                      style={field ? ({ "--field-accent": field.accent } as React.CSSProperties) : undefined}
                      aria-hidden="true"
                    />
                    {c.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>

        {/* ── Explore by skills ── */}
        <Reveal className={styles.exploreBlock}>
          <h2 className={styles.exploreTitle}>Explore by skills</h2>
          <ul className={styles.chipList} aria-label="Roadmaps par compétence">
            {SKILL_CHIPS.map((s) => (
              <li key={s.url}>
                <Link to={s.url} className={`${styles.tag} mono`}>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/skills" className={styles.skillsLink}>
            Toutes les compétences <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </Reveal>

        {/* ── Toutes les roadmaps ── */}
        <Reveal className={styles.filters} delay={60}>
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

        {list.length === 0 && (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>No roadmap found.</p>
            <p>Essayez un autre mot-clé ou réinitialisez le filtre.</p>
            <button
              type="button"
              className={styles.resetBtn}
              onClick={() => {
                setQuery("");
                setFieldFilter("all");
              }}
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpRight, Briefcase, LayoutGrid, Map, Search, X, Zap } from "lucide-react";
import { Reveal } from "../../components/Reveal/Reveal";
import type { SearchItem, SearchItemType } from "../../types";
import { SEARCH_INDEX, searchItems } from "../../data/search";
import { FIELDS } from "../../data/fields";
import { SKILL_LEVEL_LABEL } from "../../types";
import styles from "./Explore.module.css";

const TYPE_META: Record<SearchItemType, { label: string; icon: typeof Map }> = {
  roadmap: { label: "Roadmaps", icon: Map },
  skill: { label: "Compétences", icon: Zap },
  career: { label: "Métiers", icon: Briefcase },
  field: { label: "Filières", icon: LayoutGrid },
};

const TYPE_ORDER: SearchItemType[] = ["roadmap", "skill", "career", "field"];

export function Explore() {
  const [params, setParams] = useSearchParams();
  const initialQ = params.get("q") ?? "";
  const [query, setQuery] = useState(initialQ);
  const [fieldFilter, setFieldFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");

  const results = useMemo(() => {
    let items: SearchItem[] = query.trim()
      ? searchItems(query)
      : [...SEARCH_INDEX].sort((a, b) => a.title.localeCompare(b.title));
    if (fieldFilter !== "all") items = items.filter((i) => i.fieldId === fieldFilter);
    if (typeFilter !== "all") items = items.filter((i) => i.type === typeFilter);
    if (levelFilter !== "all") items = items.filter((i) => i.level === levelFilter);
    return items.slice(0, 60);
  }, [query, fieldFilter, typeFilter, levelFilter]);

  const grouped = useMemo(
    () =>
      TYPE_ORDER.map((t) => ({
        type: t,
        items: results.filter((r) => r.type === t),
      })).filter((g) => g.items.length > 0),
    [results]
  );

  const clearQuery = () => {
    setQuery("");
    setParams({}, { replace: true });
  };

  const hasFilters = fieldFilter !== "all" || typeFilter !== "all" || levelFilter !== "all";

  return (
    <div className={styles.page}>
      <div className="container">
        <Reveal className={styles.head}>
          <p className="eyebrow">Explore</p>
          <h1 className={styles.title}>Rechercher une compétence,
            <br />
            une filière ou un métier.</h1>
        </Reveal>

        <Reveal delay={80}>
          <div className={styles.searchBar} role="search">
            <Search size={19} strokeWidth={1.8} aria-hidden="true" className={styles.searchIcon} />
            <label htmlFor="explore-search" className={styles.srOnly}>
              Rechercher
            </label>
            <input
              id="explore-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Essayez « TypeScript », « Droit fiscal », « DevOps »…"
              autoComplete="off"
              autoFocus
            />
            {query && (
              <button type="button" className={styles.clear} onClick={clearQuery} aria-label="Effacer la recherche">
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </div>
        </Reveal>

        <Reveal delay={140} className={styles.filters}>
          <label className={styles.filter}>
            <span>Filière</span>
            <select value={fieldFilter} onChange={(e) => setFieldFilter(e.target.value)}>
              <option value="all">Toutes</option>
              {FIELDS.map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </label>
          <label className={styles.filter}>
            <span>Type</span>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="all">Tous</option>
              {TYPE_ORDER.map((t) => (
                <option key={t} value={t}>{TYPE_META[t].label}</option>
              ))}
            </select>
          </label>
          <label className={styles.filter}>
            <span>Niveau</span>
            <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
              <option value="all">Tous</option>
              <option value="beginner">{SKILL_LEVEL_LABEL.beginner}</option>
              <option value="intermediate">{SKILL_LEVEL_LABEL.intermediate}</option>
              <option value="advanced">{SKILL_LEVEL_LABEL.advanced}</option>
            </select>
          </label>
          {hasFilters && (
            <button
              type="button"
              className={styles.reset}
              onClick={() => {
                setFieldFilter("all");
                setTypeFilter("all");
                setLevelFilter("all");
              }}
            >
              Réinitialiser
            </button>
          )}
        </Reveal>

        <div aria-live="polite">
          <p className={styles.count}>
            <span className="mono">{results.length}</span> résultat{results.length > 1 ? "s" : ""}
            {query.trim() && <> pour «&nbsp;{query.trim()}&nbsp;»</>}
          </p>

          {grouped.length === 0 ? (
            <div className={styles.empty}>
              <p>Aucun résultat. Essayez un autre mot-clé ou réinitialisez les filtres.</p>
            </div>
          ) : (
            grouped.map((g) => {
              const Icon = TYPE_META[g.type].icon;
              return (
                <section key={g.type} className={styles.group} aria-label={TYPE_META[g.type].label}>
                  <h2 className={styles.groupTitle}>
                    <Icon size={15} aria-hidden="true" /> {TYPE_META[g.type].label}
                    <span className={`${styles.groupCount} mono`}>{g.items.length}</span>
                  </h2>
                  <ul className={styles.results}>
                    {g.items.map((item) => (
                      <li key={item.id}>
                        <Link to={item.url} className={styles.result}>
                          <span className={styles.resultText}>
                            <span className={styles.resultTitle}>
                              {item.title}
                              {item.level && (
                                <em className={styles.level}>{SKILL_LEVEL_LABEL[item.level]}</em>
                              )}
                            </span>
                            <span className={styles.resultSub}>{item.subtitle}</span>
                          </span>
                          <ArrowUpRight size={16} aria-hidden="true" className={styles.resultArrow} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

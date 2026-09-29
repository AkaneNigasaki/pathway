import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuArrowDown as ArrowDown, LuSearch as Search } from "react-icons/lu";
import styles from "./Hero.module.css";

const EXPLORE_BY = [
  { id: "field", label: "Filière", to: "/fields" },
  { id: "career", label: "Métier", to: "/careers" },
  { id: "skill", label: "Compétence", to: "/skills" },
  { id: "tech", label: "Technologie", to: "/explore?type=skill" },
];

/**
 * Hero : la recherche est l'élément principal. Le contenu est visible par
 * défaut ; l'apparition en cascade est un pur rehaussement CSS via
 * @starting-style — aucune dépendance JS, aucun état "loaded".
 */
export function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/explore?q=${encodeURIComponent(q)}` : "/explore");
  };

  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.inner}>
          <p className={styles.kicker} style={{ "--d": "0ms" } as React.CSSProperties}>
            <span className={styles.kickerDot} aria-hidden="true" />
            Pathway
          </p>
          <h1 className={styles.title} style={{ "--d": "90ms" } as React.CSSProperties}>
            Tracez votre chemin.
          </h1>
          <p className={styles.lead} style={{ "--d": "200ms" } as React.CSSProperties}>
            Explorez les carrières, les domaines et les compétences
            <br />
           grâce à des feuilles de route d’apprentissage structurées.

          </p>

          <form
            className={styles.searchForm}
            style={{ "--d": "320ms" } as React.CSSProperties}
            onSubmit={submit}
            role="search"
            aria-label="Recherche globale"
          >
            <Search size={20} aria-hidden="true" className={styles.searchIcon} />
            <label htmlFor="hero-search" className={styles.srOnly}>
              Rechercher une roadmap, une compétence, une technologie
            </label>
            <input
              id="hero-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une roadmap…"
              autoComplete="off"
              aria-describedby="hero-search-hint"
            />
            <kbd className={styles.kbd} id="hero-search-hint" title="Command palette">
              ⌘K
            </kbd>
          </form>

          <nav
            className={styles.exploreBy}
            aria-label="Explorer par"
            style={{ "--d": "430ms" } as React.CSSProperties}
          >
            <span className={styles.exploreByLabel}>Explore by</span>
            <ul className={styles.exploreByList}>
              {EXPLORE_BY.map((e) => (
                <li key={e.id}>
                  <Link to={e.to} className={styles.exploreByLink}>
                    {e.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className={styles.hintWrap} aria-hidden="true">
        <a href="#explore-fields" className={styles.hint} tabIndex={-1}>
          <span className={styles.hintText}>Scroll to explore</span>
          <ArrowDown size={14} className={styles.hintArrow} />
        </a>
      </div>
    </section>
  );
}

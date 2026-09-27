import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import styles from "./Hero.module.css";

const PLACEHOLDERS = [
  "Développement Web",
  "Intelligence artificielle",
  "Droit des affaires",
  "Finance",
  "Robotique",
  "Économie",
];

const SUGGESTIONS = [
  { label: "Frontend Developer", to: "/roadmaps/frontend-developer" },
  { label: "AI Engineer", to: "/roadmaps/ai-engineer" },
  { label: "DevOps", to: "/roadmaps/devops-engineer" },
  { label: "Droit des affaires", to: "/roadmaps/droit-des-affaires" },
];

export function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [phIndex, setPhIndex] = useState(0);
  const [phVisible, setPhVisible] = useState(true);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Séquence d'apparition : une classe, des animation-delay. 100% CSS.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Placeholder dynamique avec fondu.
  useEffect(() => {
    const id = window.setInterval(() => {
      setPhVisible(false);
      window.setTimeout(() => {
        setPhIndex((i) => (i + 1) % PLACEHOLDERS.length);
        setPhVisible(true);
      }, 320);
    }, 3200);
    return () => window.clearInterval(id);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(query.trim() ? `/explore?q=${encodeURIComponent(query.trim())}` : "/explore");
  };

  return (
    <section className={`${styles.hero} ${loaded ? styles.loaded : ""}`}>
      <div className="container">
        <div className={styles.inner}>
          <p className={`${styles.item} ${styles.label}`}>
            <span className={styles.labelDot} aria-hidden="true" />
            Plateforme d'apprentissage
          </p>
          <h1 className={`${styles.item} ${styles.title}`}>
            Construisez
            <br />
            votre parcours.
          </h1>
          <p className={`${styles.item} ${styles.subtitle}`}>
            Explorez les compétences, les métiers et les connaissances
            nécessaires pour transformer votre objectif en parcours concret.
          </p>

          <form
            className={`${styles.item} ${styles.searchWrap}`}
            onSubmit={submit}
            role="search"
            aria-label="Recherche Pathway"
          >
            <div className={styles.searchBar}>
              <Search size={20} strokeWidth={1.8} className={styles.searchIcon} aria-hidden="true" />
              <label htmlFor="hero-search" className={styles.srOnly}>
                Que souhaitez-vous apprendre ?
              </label>
              <input
                id="hero-search"
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder=""
                aria-label="Que souhaitez-vous apprendre ?"
                autoComplete="off"
              />
              {!query && (
                <span
                  className={`${styles.fakePlaceholder} ${phVisible ? styles.phVisible : ""}`}
                  aria-hidden="true"
                >
                  Que souhaitez-vous apprendre ? <em>{PLACEHOLDERS[phIndex]}</em>
                </span>
              )}
              <button type="submit" className={styles.searchCta} aria-label="Lancer la recherche">
                <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          </form>

          <div className={`${styles.item} ${styles.suggestions}`}>
            <span className={styles.suggLabel}>Populaire :</span>
            {SUGGESTIONS.map((s) => (
              <button
                key={s.label}
                type="button"
                className={styles.chip}
                onClick={() => navigate(s.to)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

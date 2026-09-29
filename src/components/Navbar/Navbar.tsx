import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { LuArrowRight as ArrowRight, LuList as List, LuMoon as Moon, LuSearch as Search, LuSun as Sun, LuUser as User, LuX as X } from "react-icons/lu";
import type { Theme } from "../../types";
import { ROADMAPS } from "../../data/roadmaps";
import { getField } from "../../data/fields";
import styles from "./Navbar.module.css";

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
  onOpenPalette: () => void;
}

const LINKS = [
  { to: "/explore", label: "Explore" },
  { to: "/roadmaps", label: "Roadmaps" },
  { to: "/skills", label: "Skills" },
  { to: "/careers", label: "Métiers" },
  { to: "/progression", label: "Progression" },
];

export function Navbar({ theme, onToggleTheme, onOpenPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // La navbar devient compacte via IntersectionObserver — aucun listener scroll.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Ferme le menu mobile à chaque navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Verrouille le scroll quand le menu mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />
      <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <nav className={styles.inner} aria-label="Navigation principale">
          <Link to="/" className={styles.logo} aria-label="Pathway — accueil">
            <span className={styles.logoMark} aria-hidden="true">
              <svg viewBox="0 0 32 32" width="22" height="22">
                <rect width="32" height="32" rx="8" fill="currentColor" />
                <path
                  d="M9 23V9h6.5a5.5 5.5 0 0 1 0 11H12v3H9zm3-5.5h3.5a3 3 0 0 0 0-6H12v6z"
                  fill="var(--background)"
                />
                <circle cx="22.5" cy="21.5" r="2.5" fill="var(--accent)" />
              </svg>
            </span>
            <span className={styles.logoText}>Pathway</span>
          </Link>

          <ul className={styles.links}>
            {LINKS.map((l) =>
              l.to === "/roadmaps" ? (
                <li
                  key={l.to}
                  className={styles.hasDrop}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      (e.currentTarget.querySelector("a") as HTMLAnchorElement)?.focus();
                      e.currentTarget.blur();
                    }
                  }}
                >
                  <NavLink
                    to={l.to}
                    aria-haspopup="true"
                    className={({ isActive }) =>
                      `${styles.link} ${isActive ? styles.active : ""}`
                    }
                  >
                    {l.label}
                  </NavLink>
                  <div className={styles.drop} role="menu" aria-label="Toutes les roadmaps">
                    <div className={styles.dropHead}>
                      <span>Toutes les roadmaps</span>
                      <Link to="/roadmaps">
                        Voir tout <ArrowRight size={12} aria-hidden="true" />
                      </Link>
                    </div>
                    <ul className={styles.dropGrid}>
                      {ROADMAPS.map((r) => {
                        const field = getField(r.fieldId);
                        return (
                          <li key={r.slug} role="none">
                            <Link
                              to={`/roadmaps/${r.slug}`}
                              className={styles.dropItem}
                              role="menuitem"
                            >
                              <span className={styles.dropTitle}>{r.title}</span>
                              <span className={styles.dropMeta}>
                                {field ? field.name : ""} · {r.skills.length} compétences
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `${styles.link} ${isActive ? styles.active : ""}`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.searchBtn}
              onClick={onOpenPalette}
              aria-label="Rechercher (Ctrl+K)"
            >
              <Search size={16} aria-hidden="true" />
              <span className={styles.searchLabel}>Rechercher</span>
              <kbd className={styles.kbd} aria-hidden="true">
                ⌘ K
              </kbd>
            </button>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={onToggleTheme}
              aria-label={theme === "light" ? "Activer le mode sombre" : "Activer le mode clair"}
            >
              {theme === "light" ? (
                <Moon size={17} aria-hidden="true" />
              ) : (
                <Sun size={17} aria-hidden="true" />
              )}
            </button>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => navigate("/progression")}
              aria-label="Mon profil et ma progression"
            >
              <User size={17} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`${styles.iconBtn} ${styles.menuBtn}`}
              onClick={() => setMenuOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={menuOpen}
            >
              <List size={18} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {/* Menu mobile plein écran */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileHead}>
          <span className={styles.logoText}>Pathway</span>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => setMenuOpen(false)}
            aria-label="Fermer le menu"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Navigation mobile">
          <ul className={styles.mobileLinks}>
            {[{ to: "/", label: "Accueil" }, ...LINKS].map((l, i) => (
              <li key={l.to} style={{ "--d": `${60 + i * 50}ms` } as React.CSSProperties}>
                <NavLink to={l.to} className={styles.mobileLink}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.mobileFoot}>
          <button type="button" className={styles.mobileAction} onClick={onOpenPalette}>
            <Search size={16} aria-hidden="true" /> Rechercher
          </button>
          <button type="button" className={styles.mobileAction} onClick={onToggleTheme}>
            {theme === "light" ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}
            {theme === "light" ? "Mode sombre" : "Mode clair"}
          </button>
        </div>
      </div>
    </>
  );
}

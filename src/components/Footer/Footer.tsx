import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const COLUMNS: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Explorer",
    links: [
      { label: "Recherche", to: "/explore" },
      { label: "Roadmaps", to: "/roadmaps" },
    ],
  },
  {
    title: "Parcours",
    links: [
      { label: "Métiers", to: "/careers" },
      { label: "Ma progression", to: "/progression" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Documentation", to: "/explore" },
      { label: "GitHub", to: "/roadmaps" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Privacy", to: "/" },
      { label: "Terms", to: "/" },
    ],
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <span className={styles.logo}>Pathway</span>
            <p className={styles.tagline}>
              Plan your knowledge. Build your future.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className={styles.colTitle}>{col.title}</h3>
              <ul className={styles.colLinks}>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className={styles.bottom}>
          <span>© 2026 Pathway</span>
          <span className={styles.made}>Conçu pour les curieux.</span>
          <span className={styles.made}>
            Icônes des concepts : Flat Color Icons (MIT), via Iconify.
          </span>
        </div>
        <div className={styles.wordmark} aria-hidden="true">
          <span>pathway</span>
        </div>
      </div>
    </footer>
  );
}

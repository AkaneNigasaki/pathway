import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";
import styles from "./Hero.module.css";

const FIELDS = [
  { id: "informatique", label: "Informatique" },
  { id: "droit", label: "Droit" },
  { id: "economie", label: "Économie" },
  { id: "finance", label: "Finance" },
  { id: "design", label: "Design" },
  { id: "sciences", label: "Sciences" },
];

/**
 * Hero : le contenu est visible par défaut. L'apparition en cascade est un
 * pur rehaussement CSS via @starting-style — aucune dépendance JS, aucun
 * état "loaded". Si les animations sont désactivées ou non supportées,
 * le contenu reste visible immédiatement.
 */
export function Hero() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.inner}>
          <p className={styles.kicker} style={{ "--d": "0ms" } as React.CSSProperties}>
            <span className={styles.kickerDot} aria-hidden="true" />
            Pathway
          </p>
          <h1 className={styles.title} style={{ "--d": "90ms" } as React.CSSProperties}>
            Construisez
            <br />
            votre parcours.
          </h1>
          <p className={styles.lead} style={{ "--d": "200ms" } as React.CSSProperties}>
            Découvrez les compétences, les outils et les connaissances
            qui composent votre futur métier.
          </p>
          <div className={styles.actions} style={{ "--d": "320ms" } as React.CSSProperties}>
            <Link to="/roadmaps" className={styles.primary}>
              Explorer les roadmaps <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/fields" className={styles.secondary}>
              Explorer les filières
            </Link>
          </div>
          <nav
            className={styles.fieldNav}
            aria-label="Filières populaires"
            style={{ "--d": "430ms" } as React.CSSProperties}
          >
            {FIELDS.map((f, i) => (
              <span key={f.id} className={styles.fieldLinkWrap}>
                {i > 0 && <span className={styles.sep} aria-hidden="true">·</span>}
                <Link to={`/fields/${f.id}`} className={styles.fieldLink}>
                  {f.label}
                </Link>
              </span>
            ))}
          </nav>
        </div>
      </div>

      <div className={styles.hintWrap} aria-hidden="true">
        <a href="#domaines" className={styles.hint} tabIndex={-1}>
          <span className={styles.hintText}>Scroll to explore</span>
          <ArrowDown size={14} className={styles.hintArrow} />
        </a>
      </div>
    </section>
  );
}

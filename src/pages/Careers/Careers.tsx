import { useMemo, useState } from "react";
import { Reveal } from "../../components/Reveal/Reveal";
import { CareerCard } from "../../components/CareerCard/CareerCard";
import { FIELDS } from "../../data/fields";
import { CAREERS } from "../../data/careers";
import styles from "./Careers.module.css";

export function Careers() {
  const [fieldFilter, setFieldFilter] = useState<string>("all");

  const fields = useMemo(
    () => FIELDS.filter((f) => CAREERS.some((c) => c.fieldId === f.id)),
    []
  );

  const list = useMemo(
    () => (fieldFilter === "all" ? CAREERS : CAREERS.filter((c) => c.fieldId === fieldFilter)),
    [fieldFilter]
  );

  return (
    <div className={styles.page}>
      <div className="container">
        <Reveal className={styles.head}>
          <p className="eyebrow">Métiers</p>
          <h1 className={styles.title}>Quel métier
            <br />
            souhaitez-vous exercer ?</h1>
          <p className="section-lead">
            Chaque métier est relié à sa roadmap recommandée : compétences
            principales, compétences complémentaires et projets pour construire
            un portfolio qui parle.
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
              Tous
            </button>
            {fields.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`${styles.chip} ${fieldFilter === f.id ? styles.on : ""}`}
                onClick={() => setFieldFilter(f.id)}
                aria-pressed={fieldFilter === f.id}
              >
                <span className={styles.dot} style={{ background: f.accent }} aria-hidden="true" />
                {f.name}
              </button>
            ))}
          </div>
        </Reveal>

        <div className={styles.grid} aria-live="polite">
          {list.map((c, i) => (
            <Reveal key={c.slug} delay={Math.min(i * 50, 300)}>
              <CareerCard career={c} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { LuArrowRight as ArrowRight } from "react-icons/lu";
import { Hero } from "../../components/Hero/Hero";
import { Reveal } from "../../components/Reveal/Reveal";
import { ContinueLearning } from "../../components/ContinueLearning/ContinueLearning";
import { ROADMAPS, totalSkills } from "../../data/roadmaps";
import { CAREERS } from "../../data/careers";
import { getField } from "../../data/fields";
import { useCountUp } from "../../hooks/useCountUp";
import styles from "./Home.module.css";

/** Aperçu « Explore by skills » — paires (roadmap, skill) vérifiées. */
const SKILL_PREVIEW: { name: string; url: string }[] = [
  { name: "React", url: "/roadmaps/frontend-developer?skill=react" },
  { name: "TypeScript", url: "/roadmaps/frontend-developer?skill=typescript" },
  { name: "JavaScript", url: "/roadmaps/frontend-developer?skill=javascript" },
  { name: "Python", url: "/roadmaps/data-scientist?skill=python" },
  { name: "Docker", url: "/roadmaps/devops-engineer?skill=docker" },
  { name: "Kubernetes", url: "/roadmaps/devops-engineer?skill=kubernetes" },
  { name: "Git", url: "/roadmaps/devops-engineer?skill=git" },
  { name: "n8n", url: "/roadmaps/informatique?skill=n8n" },
];

function Stat({ target, suffix, label }: { target: number; suffix?: string; label: string }) {
  const { value, ref } = useCountUp(target);
  return (
    <div className={styles.stat} ref={ref}>
      <span className={`${styles.statValue} mono`}>
        {value}
        {suffix}
      </span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export function Home() {
  return (
    <>
      <Hero />

      <ContinueLearning />

      {/* ── Explore by career ── */}
      <section className={`section ${styles.alt}`} aria-labelledby="careers-title">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Explore by career</p>
            <h2 className="section-title" id="careers-title">Vous connaissez le métier ?</h2>
            <p className="section-lead">
              Chaque métier est relié à sa roadmap, ses compétences clés
              et des projets concrets.
            </p>
          </Reveal>
          <Reveal>
            <ul className={styles.chipList} aria-label="Métiers">
              {CAREERS.map((c) => {
                const field = getField(c.fieldId);
                return (
                  <li key={c.slug}>
                    <Link to={`/careers/${c.slug}`} className={styles.chip}>
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
          <Reveal className={styles.center}>
            <Link to="/careers" className={styles.moreLink}>
              Tous les métiers <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Explore by skills ── */}
      <section className="section" aria-labelledby="skills-title">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Explorer par compétence</p>
            <h2 className="section-title" id="skills-title">Vous connaissez la technologie ?</h2>
            <p className="section-lead">
              Trouvez immédiatement le parcours d'une technologie —
              définition, prérequis, projets.
            </p>
          </Reveal>
          <Reveal>
            <ul className={styles.chipList} aria-label="Compétences populaires">
              {SKILL_PREVIEW.map((s) => (
                <li key={s.url}>
                  <Link to={s.url} className={`${styles.chip} mono`}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className={styles.center}>
            <Link to="/skills" className={styles.moreLink}>
              Explorer toutes les compétences <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Chiffres réels ── */}
      <section className={styles.stats} aria-label="Pathway en chiffres">
        <div className="container">
          <div className={styles.statGrid}>
            <Stat target={ROADMAPS.length} label="Roadmaps détaillées" />
            <Stat target={totalSkills()} suffix="+" label="Compétences cartographiées" />
            <Stat target={CAREERS.length} label="Métiers documentés" />
          </div>
        </div>
      </section>
    </>
  );
}

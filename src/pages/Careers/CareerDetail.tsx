import { Link, useParams } from "react-router-dom";
import {ArrowLeft, ArrowUpRight, CheckCircle, PlusCircle, Rocket} from "@phosphor-icons/react";
import { Reveal } from "../../components/Reveal/Reveal";
import { getCareer } from "../../data/careers";
import { getField } from "../../data/fields";
import { getRoadmap } from "../../data/roadmaps";
import { NotFound } from "../NotFound/NotFound";
import styles from "./CareerDetail.module.css";

export function CareerDetail() {
  const { slug } = useParams<{ slug: string }>();
  const career = slug ? getCareer(slug) : undefined;

  if (!career) return <NotFound />;

  const field = getField(career.fieldId);
  const roadmap = getRoadmap(career.roadmapSlug);

  return (
    <div className={styles.page} style={{ "--field-accent": field?.accent } as React.CSSProperties}>
      <div className="container">
        <Reveal>
          <Link to="/careers" className={styles.back}>
            <ArrowLeft size={15} aria-hidden="true" /> Tous les métiers
          </Link>
        </Reveal>

        <div className={styles.layout}>
          <div>
            <Reveal>
              <p className={`${styles.kicker} fieldAccent`}>
                {field?.name.toUpperCase()} · {career.demand.toUpperCase()}
              </p>
              <h1 className={styles.title}>{career.title}</h1>
              <p className={styles.tagline}>{career.tagline}</p>
              <p className={styles.desc}>{career.description}</p>

              <div className={styles.salary}>
                <span className={styles.salaryLabel}>Rémunération indicative</span>
                <span className={`${styles.salaryValue} mono`}>{career.salaryRange}</span>
              </div>
            </Reveal>

            <Reveal className={styles.block}>
              <h2 className={styles.blockTitle}>
                <CheckCircle size={16} aria-hidden="true" /> Compétences principales
              </h2>
              <ul className={styles.skillList}>
                {career.coreSkills.map((s) => (
                  <li key={s}><code className="mono">{s}</code></li>
                ))}
              </ul>
            </Reveal>

            <Reveal className={styles.block}>
              <h2 className={styles.blockTitle}>
                <PlusCircle size={16} aria-hidden="true" /> Compétences complémentaires
              </h2>
              <ul className={styles.skillList}>
                {career.complementarySkills.map((s) => (
                  <li key={s}><code className="mono">{s}</code></li>
                ))}
              </ul>
            </Reveal>

            <Reveal className={styles.block}>
              <h2 className={styles.blockTitle}>
                <Rocket size={16} aria-hidden="true" /> Projets recommandés
              </h2>
              <ol className={styles.projectList}>
                {career.projects.map((p, i) => (
                  <li key={p}>
                    <span className={`${styles.projectNum} mono`}>{String(i + 1).padStart(2, "0")}</span>
                    {p}
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <Reveal className={styles.aside} delay={120}>
            <div className={styles.roadmapCard}>
              <p className={styles.roadmapKicker}>Roadmap recommandée</p>
              {roadmap ? (
                <>
                  <h3>{roadmap.title}</h3>
                  <p>{roadmap.tagline}</p>
                  <dl className={styles.roadmapMeta}>
                    <div><dt>Compétences</dt><dd className="mono">{roadmap.skills.length}</dd></div>
                    <div><dt>Durée</dt><dd>{roadmap.duration}</dd></div>
                    <div><dt>Niveau</dt><dd>{roadmap.levelLabel}</dd></div>
                  </dl>
                  <Link to={`/roadmaps/${roadmap.slug}`} className={styles.cta}>
                    Commencer le parcours <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </>
              ) : (
                <p>Roadmap en préparation.</p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

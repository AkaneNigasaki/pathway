import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Briefcase, CircleCheck, CirclePlus, FolderKanban, Layers } from "lucide-react";
import { Reveal } from "../../components/Reveal/Reveal";
import { CAREERS, getCareer } from "../../data/careers";
import { getField } from "../../data/fields";
import { getRoadmap, skillDepth } from "../../data/roadmaps";
import { NotFound } from "../NotFound/NotFound";
import styles from "./CareerDetail.module.css";

/** Types de nœuds considérés comme des technologies. */
const TECH_TYPES = ["tool", "framework", "platform", "language"];

export function CareerDetail() {
  const { slug } = useParams<{ slug: string }>();
  const career = slug ? getCareer(slug) : undefined;

  if (!career) return <NotFound />;

  const field = getField(career.fieldId);
  const roadmap = getRoadmap(career.roadmapSlug);

  /** Technologies : outils, frameworks, plateformes et langages de la roadmap. */
  const technologies = roadmap
    ? roadmap.skills
        .filter((s) => TECH_TYPES.includes(s.type ?? ""))
        .sort((a, b) => skillDepth(roadmap, a.id) - skillDepth(roadmap, b.id))
        .slice(0, 10)
    : [];

  /** Métiers liés : même filière, hors métier courant. */
  const related = CAREERS.filter(
    (c) => c.fieldId === career.fieldId && c.slug !== career.slug
  ).slice(0, 4);

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
                <CircleCheck size={16} aria-hidden="true" /> Compétences principales
              </h2>
              <ul className={styles.skillList}>
                {career.coreSkills.map((s) => (
                  <li key={s}><code className="mono">{s}</code></li>
                ))}
              </ul>
            </Reveal>

            <Reveal className={styles.block}>
              <h2 className={styles.blockTitle}>
                <CirclePlus size={16} aria-hidden="true" /> Compétences complémentaires
              </h2>
              <ul className={styles.skillList}>
                {career.complementarySkills.map((s) => (
                  <li key={s}><code className="mono">{s}</code></li>
                ))}
              </ul>
            </Reveal>

            <Reveal className={styles.block}>
              <h2 className={styles.blockTitle}>
                <FolderKanban size={16} aria-hidden="true" /> Projets recommandés
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

            {technologies.length > 0 && roadmap && (
              <Reveal className={styles.block}>
                <h2 className={styles.blockTitle}>
                  <Layers size={16} aria-hidden="true" /> Technologies
                </h2>
                <ul className={styles.techList}>
                  {technologies.map((t) => (
                    <li key={t.id}>
                      <Link
                        to={`/roadmaps/${roadmap.slug}?skill=${t.id}`}
                        className={styles.techChip}
                      >
                        {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {related.length > 0 && (
              <Reveal className={styles.block}>
                <h2 className={styles.blockTitle}>
                  <Briefcase size={16} aria-hidden="true" /> Métiers liés
                </h2>
                <ul className={styles.relatedList}>
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link to={`/careers/${r.slug}`} className={styles.relatedLink}>
                        <span>
                          <strong>{r.title}</strong>
                          <small>{r.tagline}</small>
                        </span>
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
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

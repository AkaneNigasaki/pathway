import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Reveal } from "../../components/Reveal/Reveal";
import { RoadmapCard } from "../../components/RoadmapCard/RoadmapCard";
import { CareerCard } from "../../components/CareerCard/CareerCard";
import { getField } from "../../data/fields";
import { getRoadmapsByField } from "../../data/roadmaps";
import { CAREERS } from "../../data/careers";
import { useAllProgress, progressPercent } from "../../hooks/useProgress";
import { NotFound } from "../NotFound/NotFound";
import styles from "./FieldDetail.module.css";

export function FieldDetail() {
  const { id } = useParams<{ id: string }>();
  const field = id ? getField(id) : undefined;
  const { store } = useAllProgress();

  const roadmaps = useMemo(() => (field ? getRoadmapsByField(field.id) : []), [field]);
  const careers = useMemo(
    () => (field ? CAREERS.filter((c) => c.fieldId === field.id) : []),
    [field]
  );

  if (!field) return <NotFound />;

  const skillCount = roadmaps.reduce((n, r) => n + r.skills.length, 0);
  const progressOf = (roadmapId: string, total: number) =>
    progressPercent((store[roadmapId] ?? []).length, total);

  return (
    <div className={styles.page} style={{ "--accent": field.accent } as React.CSSProperties}>
      <div className="container">
        <Reveal>
          <Link to="/fields" className={styles.back}>
            <ArrowLeft size={15} aria-hidden="true" /> Toutes les filières
          </Link>
        </Reveal>

        <Reveal className={styles.hero}>
          <p className={styles.kicker}>{field.tagline}</p>
          <h1 className={styles.title}>{field.name}</h1>
          <p className={styles.desc}>{field.description}</p>
          <dl className={styles.stats}>
            <div>
              <dt>Roadmaps</dt>
              <dd className="mono">{roadmaps.length}</dd>
            </div>
            <div>
              <dt>Compétences</dt>
              <dd className="mono">{skillCount}</dd>
            </div>
            <div>
              <dt>Métiers</dt>
              <dd className="mono">{careers.length}</dd>
            </div>
          </dl>
        </Reveal>

        {roadmaps.length > 0 ? (
          <section aria-label={`Roadmaps ${field.name}`}>
            <Reveal className="section-head">
              <h2 className={styles.sectionTitle}>Roadmaps</h2>
            </Reveal>
            <div className={styles.grid}>
              {roadmaps.map((r, i) => (
                <Reveal key={r.slug} delay={Math.min(i * 60, 300)}>
                  <RoadmapCard roadmap={r} progress={progressOf(r.id, r.skills.length)} />
                </Reveal>
              ))}
            </div>
          </section>
        ) : (
          <Reveal className={styles.empty}>
            <h2 className={styles.sectionTitle}>Roadmaps à venir</h2>
            <p>
              Nous préparons les parcours de la filière {field.name}.
              En attendant, explorez les autres domaines.
            </p>
            <Link to="/roadmaps" className={styles.cta}>
              Voir les roadmaps <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </Reveal>
        )}

        {careers.length > 0 && (
          <section aria-label={`Métiers ${field.name}`} className={styles.careersSection}>
            <Reveal className="section-head">
              <h2 className={styles.sectionTitle}>Métiers associés</h2>
            </Reveal>
            <div className={styles.careerRail}>
              {careers.map((c) => (
                <CareerCard key={c.slug} career={c} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

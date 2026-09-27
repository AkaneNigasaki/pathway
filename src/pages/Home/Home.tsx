import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Hero } from "../../components/Hero/Hero";
import { Reveal } from "../../components/Reveal/Reveal";
import { FieldCard } from "../../components/FieldCard/FieldCard";
import { RoadmapCard } from "../../components/RoadmapCard/RoadmapCard";
import { CareerCard } from "../../components/CareerCard/CareerCard";
import { FIELDS } from "../../data/fields";
import { ROADMAPS, totalSkills } from "../../data/roadmaps";
import { CAREERS } from "../../data/careers";
import { useCountUp } from "../../hooks/useCountUp";
import { countDone, useAllProgress } from "../../hooks/useProgress";
import { progressPercent } from "../../hooks/useProgress";
import styles from "./Home.module.css";

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
  const { store } = useAllProgress();

  const fieldStats = useMemo(() => {
    return FIELDS.map((f) => {
      const rms = ROADMAPS.filter((r) => r.fieldId === f.id);
      return {
        field: f,
        roadmapCount: rms.length,
        skillCount: rms.reduce((n, r) => n + r.skills.length, 0),
        careerCount: CAREERS.filter((c) => c.fieldId === f.id).length,
      };
    });
  }, []);

  const featured = useMemo(() => ROADMAPS.slice(0, 6), []);

  const progressOf = (slug: string) => {
    const r = ROADMAPS.find((x) => x.slug === slug);
    if (!r) return 0;
    return progressPercent(countDone(store[r.id]), r.skills.length);
  };

  return (
    <>
      <Hero />

      {/* ── Filières ── */}
      <section className="section" id="domaines" aria-labelledby="fields-title">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Domaines</p>
            <h2 className="section-title" id="fields-title">Explorez votre domaine</h2>
            <p className="section-lead">
              Onze filières, des dizaines de parcours. Choisissez un point de départ,
              Pathway trace la suite.
            </p>
          </Reveal>
          <div className={styles.fieldGrid}>
            {fieldStats.map(({ field, roadmapCount, skillCount, careerCount }, i) => (
              <Reveal key={field.id} delay={Math.min(i * 60, 420)}>
                <FieldCard
                  field={field}
                  roadmapCount={roadmapCount}
                  skillCount={skillCount}
                  careerCount={careerCount}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roadmaps populaires ── */}
      <section className={`section ${styles.alt}`} aria-labelledby="roadmaps-title">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Parcours</p>
            <h2 className="section-title" id="roadmaps-title">Des roadmaps qui se suivent vraiment</h2>
            <p className="section-lead">
              Chaque roadmap est un graphe de compétences : prérequis, progression,
              projets. Validez les étapes, la suite se débloque.
            </p>
          </Reveal>
          <div className={styles.cardGrid}>
            {featured.map((r, i) => (
              <Reveal key={r.slug} delay={Math.min(i * 60, 360)}>
                <RoadmapCard roadmap={r} progress={progressOf(r.slug)} />
              </Reveal>
            ))}
          </div>
          <Reveal className={styles.center}>
            <Link to="/roadmaps" className={styles.moreLink}>
              Toutes les roadmaps <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Métiers ── */}
      <section className="section" aria-labelledby="careers-title">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Orientation</p>
            <h2 className="section-title" id="careers-title">Quel métier souhaitez-vous exercer ?</h2>
            <p className="section-lead">
              Chaque métier est relié à sa roadmap recommandée, ses compétences
              clés et des projets concrets.
            </p>
          </Reveal>
        </div>
        <div className="container-wide">
          <Reveal>
            <div className={styles.careerRail} role="list">
              {CAREERS.map((c) => (
                <div key={c.slug} role="listitem">
                  <CareerCard career={c} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Chiffres ── */}
      <section className={styles.stats} aria-label="Pathway en chiffres">
        <div className="container">
          <div className={styles.statGrid}>
            <Stat target={ROADMAPS.length} label="Roadmaps détaillées" />
            <Stat target={totalSkills()} suffix="+" label="Compétences cartographiées" />
            <Stat target={CAREERS.length} label="Métiers documentés" />
            <Stat target={FIELDS.length} label="Filières couvertes" />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section" aria-labelledby="cta-title">
        <div className="container">
          <Reveal className={styles.cta}>
            <p className="eyebrow" style={{ justifyContent: "center" }}>Commencer</p>
            <h2 className={styles.ctaTitle} id="cta-title">
              Votre objectif mérite
              <br />
              un plan.
            </h2>
            <p className={styles.ctaLead}>
              Choisissez une roadmap, validez vos compétences une par une,
              et regardez votre parcours prendre forme.
            </p>
            <div className={styles.ctaActions}>
              <Link to="/explore" className={styles.ctaPrimary}>
                Explorer les parcours <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/fields" className={styles.ctaSecondary}>
                Voir les filières
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

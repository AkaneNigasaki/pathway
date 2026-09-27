import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, RotateCcw, Trophy } from "lucide-react";
import { Reveal } from "../../components/Reveal/Reveal";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { ROADMAPS } from "../../data/roadmaps";
import { getField } from "../../data/fields";
import { countDone, countInProgress, useAllProgress, progressPercent } from "../../hooks/useProgress";
import styles from "./ProgressPage.module.css";

export function ProgressPage() {
  const { store, resetRoadmap } = useAllProgress();

  const entries = useMemo(() => {
    return ROADMAPS.map((r) => {
      const done = countDone(store[r.id]);
      const active = countInProgress(store[r.id]);
      return { roadmap: r, done, active, percent: progressPercent(done, r.skills.length) };
    })
      .filter((e) => e.done > 0 || e.active > 0)
      .sort((a, b) => b.percent - a.percent);
  }, [store]);

  const totalDone = entries.reduce((n, e) => n + e.done, 0);
  const totalSkills = ROADMAPS.reduce((n, r) => n + r.skills.length, 0);
  const overall = progressPercent(totalDone, totalSkills);

  return (
    <div className={styles.page}>
      <div className="container">
        <Reveal className={styles.head}>
          <p className="eyebrow">Progression</p>
          <h1 className={styles.title}>Votre parcours,
            <br />
            en chiffres.</h1>
          <p className="section-lead">
            Chaque compétence validée vous rapproche de votre objectif.
            Votre progression est sauvegardée localement, dans votre navigateur.
          </p>
        </Reveal>

        {entries.length === 0 ? (
          <Reveal className={styles.empty}>
            <Trophy size={40} strokeWidth={1.2} aria-hidden="true" className={styles.emptyIcon} />
            <h2>Aucune progression pour le moment</h2>
            <p>
              Choisissez une roadmap et validez votre première compétence
              pour commencer à tracer votre parcours.
            </p>
            <Link to="/roadmaps" className={styles.cta}>
              Choisir une roadmap <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </Reveal>
        ) : (
          <>
            <Reveal className={styles.summary}>
              <div className={styles.summaryStat}>
                <span className={`${styles.summaryValue} mono`}>{overall}%</span>
                <span className={styles.summaryLabel}>Progression globale</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={`${styles.summaryValue} mono`}>{totalDone}</span>
                <span className={styles.summaryLabel}>Compétences validées</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={`${styles.summaryValue} mono`}>{entries.length}</span>
                <span className={styles.summaryLabel}>Parcours en cours</span>
              </div>
            </Reveal>

            <div className={styles.list}>
              {entries.map(({ roadmap, done, active, percent }, i) => {
                const field = getField(roadmap.fieldId);
                return (
                  <Reveal key={roadmap.slug} delay={Math.min(i * 60, 300)}>
                    <article
                      className={styles.row}
                      style={{ "--accent": field?.accent } as React.CSSProperties}
                    >
                      <div className={styles.rowMain}>
                        <p className={styles.rowField} style={{ color: field?.accent }}>
                          {field?.name.toUpperCase()}
                        </p>
                        <h2 className={styles.rowTitle}>
                          <Link to={`/roadmaps/${roadmap.slug}`}>{roadmap.title}</Link>
                        </h2>
                        <p className={styles.rowMeta}>
                          <span className="mono">{done}</span> / {roadmap.skills.length} compétences
                          {active > 0 && (
                            <> · <span className="mono">{active}</span> en cours</>
                          )}
                        </p>
                        <ProgressBar value={percent} size="sm" />
                      </div>
                      <div className={styles.rowActions}>
                        <Link to={`/roadmaps/${roadmap.slug}`} className={styles.continue}>
                          Continuer <ArrowRight size={14} aria-hidden="true" />
                        </Link>
                        <button
                          type="button"
                          className={styles.reset}
                          onClick={() => resetRoadmap(roadmap.id)}
                          aria-label={`Réinitialiser la progression ${roadmap.title}`}
                        >
                          <RotateCcw size={14} aria-hidden="true" /> Réinitialiser
                        </button>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

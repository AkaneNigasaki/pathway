import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../../components/Reveal/Reveal";
import { InformatiqueDiagram, ExplorePaths } from "../../components/illustrations";
import { getRoadmap, getSkill } from "../../data/roadmaps";
import { getBranchGuide, INFORMATIQUE_INTRO } from "../../data/branch-guides";
import styles from "./FieldDetail.module.css";

/**
 * Introduction éditoriale de la filière Informatique :
 * - bandeau illustration + texte (composition éditoriale)
 * - « Choisissez votre spécialisation » : les 8 branches avec leur
 *   introduction et ce qu'on y apprend, chacune menant à la roadmap
 *   pré-positionnée sur la branche (?stage=)
 * - respiration éditoriale abstraite
 */
export function InformatiqueIntro() {
  const roadmap = getRoadmap("informatique");
  if (!roadmap) return null;

  return (
    <>
      <section aria-label="Introduction à l'informatique" className={styles.introBand}>
        <Reveal className={styles.introText}>
          <p className={styles.kicker}>La filière</p>
          <h2 className={styles.sectionTitle}>{INFORMATIQUE_INTRO.title}</h2>
          <p className={styles.introLead}>{INFORMATIQUE_INTRO.intro}</p>
        </Reveal>
        <Reveal className={styles.introIllus} delay={120}>
          <InformatiqueDiagram />
        </Reveal>
      </section>

      <section aria-label="Choisissez votre spécialisation" className={styles.branchesSection}>
        <Reveal className="section-head">
          <h2 className={styles.sectionTitle}>{INFORMATIQUE_INTRO.heading}</h2>
          <p className={styles.sectionHint}>{INFORMATIQUE_INTRO.subheading}</p>
        </Reveal>
        <div className={styles.branchGrid}>
          {roadmap.stages.map((stage, i) => {
            const guide = getBranchGuide(stage.id);
            const entry = guide ? getSkill(roadmap, guide.entrySkillId) : undefined;
            return (
              <Reveal key={stage.id} delay={Math.min(i * 60, 300)}>
                <Link
                  to={`/roadmaps/informatique?stage=${stage.id}`}
                  className={styles.branchCard}
                >
                  <span className={`${styles.branchNum} mono`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className={styles.branchTitle}>{stage.label}</h3>
                  <p className={styles.branchIntro}>{guide?.intro ?? stage.description}</p>
                  {guide && guide.learnItems.length > 0 && (
                    <>
                      <p className={styles.learnLabel}>Ce que vous allez apprendre</p>
                      <ul className={styles.learnChips}>
                        {guide.learnItems.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  <span className={styles.branchEntry}>
                    {entry ? `Départ : ${entry.name}` : "Explorer la branche"}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Reveal className={styles.editorialBand}>
        <ExplorePaths />
        <p className={styles.editorialCaption}>
          Chaque branche mène à plusieurs métiers, et les chemins se croisent :
          suivez les dépendances de la carte pour construire votre parcours.
        </p>
      </Reveal>
    </>
  );
}

import { useMemo } from "react";
import { Reveal } from "../../components/Reveal/Reveal";
import { FieldCard } from "../../components/FieldCard/FieldCard";
import { FIELDS } from "../../data/fields";
import { ROADMAPS } from "../../data/roadmaps";
import { CAREERS } from "../../data/careers";
import styles from "./Fields.module.css";

export function Fields() {
  const stats = useMemo(
    () =>
      FIELDS.map((f) => {
        const rms = ROADMAPS.filter((r) => r.fieldId === f.id);
        return {
          field: f,
          roadmapCount: rms.length,
          skillCount: rms.reduce((n, r) => n + r.skills.length, 0),
          careerCount: CAREERS.filter((c) => c.fieldId === f.id).length,
        };
      }),
    []
  );

  return (
    <div className={styles.page}>
      <div className="container">
        <Reveal className={styles.head}>
          <p className="eyebrow">Filières</p>
          <h1 className={styles.title}>Onze domaines,
            <br />
            une infinité de parcours.</h1>
          <p className="section-lead">
            Chaque filière regroupe des roadmaps structurées, des compétences
            cartographiées et les métiers qui en découlent.
          </p>
        </Reveal>
        <div className={styles.grid}>
          {stats.map(({ field, roadmapCount, skillCount, careerCount }, i) => (
            <Reveal key={field.id} delay={Math.min(i * 50, 400)}>
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
    </div>
  );
}

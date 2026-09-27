import { Fragment } from "react";
import { useIntersectionReveal } from "../../hooks/useIntersectionReveal";
import styles from "./Illustration.module.css";

interface FlowDiagramProps {
  steps: string[];
  /** Met en évidence la première et la dernière étape. */
  accentEnds?: boolean;
  label: string;
}

/**
 * Diagramme de flux vertical générique : une suite d'étapes reliées par
 * des connecteurs qui se dessinent en cascade au scroll.
 * Utilisé pour « Comment ça fonctionne » et les exemples concrets.
 */
export function FlowDiagram({ steps, accentEnds = false, label }: FlowDiagramProps) {
  const ref = useIntersectionReveal<HTMLDivElement>({ threshold: 0.15 });
  return (
    <div ref={ref} className={styles.flow} role="img" aria-label={label}>
      {steps.map((step, i) => {
        const accent = accentEnds && (i === 0 || i === steps.length - 1);
        return (
          <Fragment key={`${i}-${step}`}>
            {i > 0 && <div className={styles.flowLink} aria-hidden="true" />}
            <div
              className={`${styles.flowStep} ${accent ? styles.flowStepAccent : ""} mono`}
              style={{ transitionDelay: `${i * 130}ms` }}
            >
              {step}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

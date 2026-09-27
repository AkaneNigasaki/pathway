import { useMediaQuery } from "../../hooks/useMediaQuery";
import styles from "./Illustration.module.css";

interface FlowPulseProps {
  /** Tracé SVG suivi par le point (attribut `path` de animateMotion). */
  path: string;
  dur?: number;
}

/**
 * Point lumineux qui parcourt un tracé en boucle : suggère le sens du
 * flux de façon très subtile. Désactivé sous `prefers-reduced-motion`.
 */
export function FlowPulse({ path, dur = 2.6 }: FlowPulseProps) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  if (reduceMotion) return null;
  return (
    <circle r="4" className={styles.pulseDot} aria-hidden="true">
      <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={path} />
    </circle>
  );
}

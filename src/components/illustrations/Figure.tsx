import type { ReactNode } from "react";
import { useIntersectionReveal } from "../../hooks/useIntersectionReveal";
import styles from "./Illustration.module.css";

interface FigureProps {
  /** Libellé accessible de l'illustration. */
  label: string;
  children: ReactNode;
  className?: string;
}

/**
 * Conteneur d'illustration : ajoute `.is-visible` à l'entrée dans le
 * viewport, ce qui déclenche les animations CSS des enfants
 * (`.node`, `.draw`, `.flowStep`, `.flowLink`).
 */
export function Figure({ label, children, className }: FigureProps) {
  const ref = useIntersectionReveal<HTMLElement>({ threshold: 0.18 });
  return (
    <figure
      ref={ref}
      role="img"
      aria-label={label}
      className={`${styles.figure} ${className ?? ""}`}
    >
      {children}
    </figure>
  );
}

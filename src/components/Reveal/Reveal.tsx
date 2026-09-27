import type { CSSProperties, ReactNode } from "react";
import { useIntersectionReveal } from "../../hooks/useIntersectionReveal";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}

/** Révèle son contenu quand il entre dans le viewport (CSS transition). */
export function Reveal({ children, delay = 0, className = "", as = "div" }: RevealProps) {
  const ref = useIntersectionReveal<HTMLDivElement>();
  const Tag = as as "div";
  const style = { "--reveal-delay": `${delay}ms` } as CSSProperties;

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  );
}

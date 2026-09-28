import { useMemo } from "react";
import { highlight } from "./tokenize";
import styles from "./CodeHighlight.module.css";

interface CodeHighlightProps {
  code: string;
  language: string;
  /** Classe du <code> parent (ex. styles.commandCode) : fusionnée. */
  className?: string;
}

/**
 * Affiche du code source avec une coloration syntaxique façon VS Code
 * (thème Dark+), sans dépendance externe. Le texte est rendu via React,
 * aucun HTML n'est injecté.
 */
export function CodeHighlight({ code, language, className }: CodeHighlightProps) {
  const tokens = useMemo(() => highlight(code, language), [code, language]);
  return (
    <code className={className ? `${styles.code} ${className}` : styles.code}>
      {tokens.map((t, i) =>
        t.type === "plain" ? (
          <span key={i}>{t.text}</span>
        ) : (
          <span key={i} className={styles[t.type]}>
            {t.text}
          </span>
        )
      )}
    </code>
  );
}

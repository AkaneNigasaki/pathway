import { Fragment, type ReactNode } from "react";

/**
 * Interprète le code inline délimité par des backticks dans les textes
 * éditoriaux des guides : `npm install` → <code>npm install</code>.
 * Le reste du texte est rendu tel quel (aucun HTML injecté, pas de
 * dangerouslySetInnerHTML).
 *
 * Usage : <p>{renderRichText(step)}</p>
 */
export function renderRichText(text: string): ReactNode {
  const parts = text.split("`");
  if (parts.length < 3) return text;
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <code key={i} className="mono">
            {part}
          </code>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

import { useEffect } from "react";

/** Déclenche `handler` sur Ctrl/Cmd+K (ou une autre combinaison). */
export function useKeyboardShortcut(
  key: string,
  handler: () => void,
  opts?: { ctrl?: boolean; shift?: boolean }
) {
  const { ctrl = true, shift = false } = opts ?? {};

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (e.key.toLowerCase() !== key.toLowerCase()) return;
      if (ctrl && !mod) return;
      if (!ctrl && mod) return;
      if (shift !== e.shiftKey) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA") && !ctrl) return;
      e.preventDefault();
      handler();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [key, ctrl, shift, handler]);
}

import { useEffect, useState } from "react";

/**
 * Compte de 0 à `target` quand l'élément devient visible.
 * requestAnimationFrame uniquement — aucun timer permanent.
 */
export function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    let raf = 0;
    let started = false;

    const tick = (t0: number) => (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick(t0));
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          raf = requestAnimationFrame(tick(performance.now()));
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(ref);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ref, target, duration]);

  return { value, ref: setRef };
}

import { useCallback, useEffect, useRef, useState } from "react";

const KEY = "pathway:progress:v1";

type ProgressStore = Record<string, string[]>;

function readStore(): ProgressStore {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as ProgressStore;
  } catch {
    /* ignore */
  }
  return {};
}

function writeStore(store: ProgressStore) {
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    /* ignore */
  }
}

/**
 * Progression persistée par roadmap. Écoute les changements cross-onglets
 * et expose un compteur pour forcer le rafraîchissement.
 */
let listeners = 0;

export function useProgress(roadmapId: string) {
  const [completed, setCompleted] = useState<Set<string>>(() => {
    const store = readStore();
    return new Set(store[roadmapId] ?? []);
  });
  const [, setTick] = useState(0);
  const idRef = useRef(roadmapId);
  idRef.current = roadmapId;

  // Sync cross-onglets + cross-instances
  useEffect(() => {
    listeners += 1;
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) {
        const store = readStore();
        setCompleted(new Set(store[idRef.current] ?? []));
      }
    };
    const onCustom = () => setTick((t) => t + 1);
    window.addEventListener("storage", onStorage);
    window.addEventListener("pathway:progress", onCustom);
    return () => {
      listeners -= 1;
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("pathway:progress", onCustom);
    };
  }, []);

  const persist = useCallback((next: Set<string>) => {
    const store = readStore();
    store[roadmapId] = [...next];
    writeStore(store);
    window.dispatchEvent(new Event("pathway:progress"));
  }, [roadmapId]);

  const toggle = useCallback(
    (skillId: string) => {
      setCompleted((prev) => {
        const next = new Set(prev);
        if (next.has(skillId)) next.delete(skillId);
        else next.add(skillId);
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const reset = useCallback(() => {
    const store = readStore();
    delete store[roadmapId];
    writeStore(store);
    setCompleted(new Set());
    window.dispatchEvent(new Event("pathway:progress"));
  }, [roadmapId, persist]);

  return { completed, toggle, reset, isComplete: (id: string) => completed.has(id) };
}

/** Progression agrégée de toutes les roadmaps (page Progression). */
export function useAllProgress() {
  const [store, setStore] = useState<ProgressStore>(readStore);

  useEffect(() => {
    const sync = () => setStore(readStore());
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) sync();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("pathway:progress", sync);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("pathway:progress", sync);
    };
  }, []);

  const resetRoadmap = useCallback((roadmapId: string) => {
    const next = readStore();
    delete next[roadmapId];
    writeStore(next);
    setStore(next);
    window.dispatchEvent(new Event("pathway:progress"));
  }, []);

  return { store, resetRoadmap };
}

export function progressPercent(completedCount: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completedCount / total) * 100);
}

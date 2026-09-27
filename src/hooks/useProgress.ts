import { useCallback, useEffect, useRef, useState } from "react";
import type { SkillStatus } from "../types";

const KEY = "pathway:progress:v1";

/** skillId -> statut ("in-progress" | "done"). Absent = non commencé. */
export type ProgressMap = Record<string, SkillStatus>;
type ProgressStore = Record<string, ProgressMap>;

/**
 * Migration : l'ancien format stockait un tableau d'ids terminés.
 * Converti en { id: "done" } à la lecture.
 */
function normalize(value: unknown): ProgressMap {
  if (Array.isArray(value)) {
    const map: ProgressMap = {};
    for (const id of value) {
      if (typeof id === "string") map[id] = "done";
    }
    return map;
  }
  if (value && typeof value === "object") {
    const map: ProgressMap = {};
    for (const [id, s] of Object.entries(value as Record<string, unknown>)) {
      if (s === "done" || s === "in-progress") map[id] = s;
    }
    return map;
  }
  return {};
}

function readStore(): ProgressStore {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      const store: ProgressStore = {};
      for (const [k, v] of Object.entries(parsed)) store[k] = normalize(v);
      return store;
    }
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

function countBy(map: ProgressMap, s: SkillStatus): number {
  let n = 0;
  for (const v of Object.values(map)) if (v === s) n++;
  return n;
}

export function countDone(map: ProgressMap | undefined): number {
  return map ? countBy(map, "done") : 0;
}

export function countInProgress(map: ProgressMap | undefined): number {
  return map ? countBy(map, "in-progress") : 0;
}

let listeners = 0;

/**
 * Progression à 3 états par roadmap : non commencé / en cours / terminé.
 * Persistée en localStorage, synchronisée entre onglets et instances.
 */
export function useProgress(roadmapId: string) {
  const [status, setStatusState] = useState<ProgressMap>(() => {
    return readStore()[roadmapId] ?? {};
  });
  const [, setTick] = useState(0);
  const idRef = useRef(roadmapId);
  idRef.current = roadmapId;

  useEffect(() => {
    listeners += 1;
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setStatusState(readStore()[idRef.current] ?? {});
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

  const persist = useCallback(
    (next: ProgressMap) => {
      const store = readStore();
      if (Object.keys(next).length === 0) delete store[roadmapId];
      else store[roadmapId] = next;
      writeStore(store);
      window.dispatchEvent(new Event("pathway:progress"));
    },
    [roadmapId]
  );

  const setStatus = useCallback(
    (skillId: string, s: SkillStatus | null) => {
      setStatusState((prev) => {
        const next = { ...prev };
        if (s === null) delete next[skillId];
        else next[skillId] = s;
        persist(next);
        return next;
      });
    },
    [persist]
  );

  /** Cycle : non commencé → en cours → terminé → non commencé. */
  const cycle = useCallback(
    (skillId: string) => {
      const cur = status[skillId] ?? null;
      const next: SkillStatus | null =
        cur === null ? "in-progress" : cur === "in-progress" ? "done" : null;
      setStatus(skillId, next);
    },
    [status, setStatus]
  );

  const reset = useCallback(() => {
    const store = readStore();
    delete store[roadmapId];
    writeStore(store);
    setStatusState({});
    window.dispatchEvent(new Event("pathway:progress"));
  }, [roadmapId]);

  return {
    status,
    statusOf: (id: string): SkillStatus | null => status[id] ?? null,
    setStatus,
    cycle,
    reset,
    doneCount: countBy(status, "done"),
    inProgressCount: countBy(status, "in-progress"),
    isDone: (id: string) => status[id] === "done",
  };
}

/** Progression agrégée de toutes les roadmaps (page Progression, accueil). */
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

export function progressPercent(doneCount: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((doneCount / total) * 100);
}

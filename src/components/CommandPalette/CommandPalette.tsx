import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuBriefcase as Briefcase, LuCornerDownLeft as CornerDownLeft, LuLayoutGrid as LayoutGrid, LuMap as Map, LuSearch as Search, LuZap as Zap } from "react-icons/lu";
import type { SearchItem, SearchItemType } from "../../types";
import { SEARCH_INDEX, searchItems } from "../../data/search";
import { getField } from "../../data/fields";
import { BrandIcon, searchItemBrandIcon } from "../BrandIcon/BrandIcon";
import styles from "./CommandPalette.module.css";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const TYPE_META: Record<SearchItemType, { label: string; icon: typeof Map }> = {
  roadmap: { label: "Roadmaps", icon: Map },
  field: { label: "Filières", icon: LayoutGrid },
  career: { label: "Métiers", icon: Briefcase },
  skill: { label: "Compétences", icon: Zap },
};

const TYPE_ORDER: SearchItemType[] = ["roadmap", "field", "career", "skill"];

function suggestions(): SearchItem[] {
  // Quand la recherche est vide : un aperçu rapide par catégorie.
  const out: SearchItem[] = [];
  for (const t of TYPE_ORDER) {
    out.push(...SEARCH_INDEX.filter((i) => i.type === t).slice(0, 2));
  }
  return out;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(
    () => (query.trim() ? searchItems(query).slice(0, 24) : suggestions()),
    [query]
  );

  // Ouverture / fermeture animée.
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      const raf = requestAnimationFrame(() => setVisible(true));
      window.setTimeout(() => inputRef.current?.focus(), 30);
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        cancelAnimationFrame(raf);
        document.body.style.overflow = prev;
      };
    } else {
      setVisible(false);
    }
  }, [open ]);

  useEffect(() => setActive(0), [query]);

  // L'élément actif reste visible dans la liste.
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  const go = (item: SearchItem) => {
    onClose();
    // Laisse la fermeture s'amorcer avant de naviguer.
    window.setTimeout(() => navigate(item.url), 60);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[active];
      if (item) go(item);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const grouped = TYPE_ORDER.map((t) => ({
    type: t,
    items: results
      .map((item, i) => ({ item, i }))
      .filter(({ item }) => item.type === t),
  })).filter((g) => g.items.length > 0);

  return (
    <div className={styles.root} role="presentation">
      <div
        className={`${styles.overlay} ${visible ? styles.show : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`${styles.palette} ${visible ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Recherche globale"
      >
        <div className={styles.inputRow}>
          <Search size={18} aria-hidden="true" className={styles.inputIcon} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKey}
            placeholder="Rechercher une compétence, une filière, un métier…"
            aria-label="Recherche globale"
            autoComplete="off"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[active] ? `palette-item-${active}` : undefined}
          />
          <kbd className={styles.esc} aria-hidden="true">Échap</kbd>
        </div>

        <div ref={listRef} className={styles.list} id="palette-list" role="listbox">
          {results.length === 0 ? (
            <p className={styles.empty}>
              Aucun résultat pour « {query} ».
            </p>
          ) : (
            grouped.map((g) => {
              const Icon = TYPE_META[g.type].icon;
              return (
                <div key={g.type} className={styles.group}>
                  <p className={styles.groupLabel}>{TYPE_META[g.type].label}</p>
                  {g.items.map(({ item, i }) => {
                    const field = item.fieldId ? getField(item.fieldId) : undefined;
                    return (
                      <button
                        key={item.id}
                        id={`palette-item-${i}`}
                        data-index={i}
                        type="button"
                        role="option"
                        aria-selected={i === active}
                        className={`${styles.item} ${i === active ? styles.active : ""}`}
                        onMouseEnter={() => setActive(i)}
                        onClick={() => go(item)}
                      >
                        <span
                          className={`${styles.itemIcon} ${field ? "fieldAccent" : ""}`}
                          style={field ? ({ "--field-accent": field.accent } as React.CSSProperties) : undefined}
                          aria-hidden="true"
                        >
                          <Icon size={16} />
                        </span>
                        <span className={styles.itemText}>
                          <span className={styles.itemTitle}>
                            {(() => {
                              const iconId = searchItemBrandIcon(item);
                              return iconId ? (
                                <BrandIcon skillId={iconId} label={item.title} size={18} />
                              ) : null;
                            })()}
                            {item.title}
                          </span>
                          <span className={styles.itemSub}>
                            {item.subtitle}
                            {item.breadcrumb && (
                              <span className={styles.itemCrumb}>{item.breadcrumb}</span>
                            )}
                          </span>
                        </span>
                        {i === active && (
                          <CornerDownLeft size={14} aria-hidden="true" className={styles.enterIcon} />
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        <div className={styles.hints} aria-hidden="true">
          <span><kbd>↑↓</kbd> naviguer</span>
          <span><kbd>↵</kbd> ouvrir</span>
          <span><kbd>esc</kbd> fermer</span>
        </div>
      </div>
    </div>
  );
}

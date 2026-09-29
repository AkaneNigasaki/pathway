import { useCallback, useEffect, useId, useRef, useState } from "react";
import { LuCheck as Check, LuChevronDown as ChevronDown } from "react-icons/lu";
import styles from "./CustomSelect.module.css";

export interface CustomSelectOption {
  value: string;
  label: string;
  /** Petit compteur affiché à droite (ex. nombre de résultats). */
  count?: number;
}

interface CustomSelectProps {
  /** Étiquette visible au-dessus du contrôle (ex. « Filière »). */
  label: string;
  value: string;
  options: CustomSelectOption[];
  onChange: (value: string) => void;
  /** Texte de l'option « tout » quand value === "all" et qu'aucune option ne matche. */
  allLabel?: string;
}

const CLOSE_MS = 140;

/**
 * Liste déroulante entièrement contrôlée par React, sans <select> natif.
 * Accessible : role="listbox"/"option", aria-expanded/selected/activedescendant,
 * navigation complète au clavier, fermeture au clic extérieur et à Escape,
 * retour du focus sur le bouton.
 */
export function CustomSelect({ label, value, options, onChange, allLabel }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openUp, setOpenUp] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const closeTimer = useRef<number | null>(null);
  const baseId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const labelId = `${baseId}-label`;
  const menuId = `${baseId}-menu`;

  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = selectedIndex >= 0 ? options[selectedIndex] : null;
  const buttonLabel = selected ? selected.label : (allLabel ?? label);

  const close = useCallback(
    (refocus: boolean) => {
      if (!open || closing) return;
      setClosing(true);
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
      closeTimer.current = window.setTimeout(() => {
        setOpen(false);
        setClosing(false);
        if (refocus) buttonRef.current?.focus();
      }, CLOSE_MS);
    },
    [open, closing]
  );

  const doOpen = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setClosing(false);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    // Bascule vers le haut si peu de place en dessous.
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setOpenUp(spaceBelow < 260 && spaceAbove > spaceBelow);
    }
    setOpen(true);
  }, [selectedIndex]);

  const toggle = useCallback(() => {
    if (open) close(false);
    else doOpen();
  }, [open, close, doOpen]);

  const choose = useCallback(
    (index: number) => {
      const opt = options[index];
      if (!opt) return;
      onChange(opt.value);
      close(true);
    },
    [options, onChange, close]
  );

  // Clic à l'extérieur → fermer.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        close(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, close]);

  useEffect(
    () => () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    },
    []
  );

  // Fait défiler l'option active dans le menu.
  useEffect(() => {
    if (!open) return;
    menuRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        doOpen();
      }
      return;
    }
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        close(true);
        break;
      case "Tab":
        close(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % options.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + options.length) % options.length);
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(activeIndex);
        break;
    }
  };

  return (
    <div ref={rootRef} className={styles.root} onKeyDown={onKeyDown}>
      <span id={labelId} className={styles.label}>
        {label}
      </span>
      <button
        ref={buttonRef}
        type="button"
        className={`${styles.button} ${open ? styles.buttonOpen : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${labelId} ${baseId}-value`}
        onClick={toggle}
      >
        <span id={`${baseId}-value`} className={styles.value}>
          {buttonLabel}
        </span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
        />
      </button>
      {open && (
        <ul
          ref={menuRef}
          id={menuId}
          role="listbox"
          aria-labelledby={labelId}
          aria-activedescendant={`${baseId}-opt-${activeIndex}`}
          tabIndex={-1}
          className={`${styles.menu} ${openUp ? styles.menuUp : ""} ${
            closing ? styles.menuClosing : ""
          }`}
        >
          {options.map((opt, i) => {
            const isSelected = opt.value === value;
            const isActive = i === activeIndex;
            return (
              <li
                key={opt.value}
                id={`${baseId}-opt-${i}`}
                data-index={i}
                role="option"
                aria-selected={isSelected}
                data-active={isActive}
                className={`${styles.option} ${isSelected ? styles.optionSelected : ""} ${
                  isActive ? styles.optionActive : ""
                }`}
                onClick={() => choose(i)}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <span className={styles.optionLabel}>{opt.label}</span>
                {typeof opt.count === "number" && (
                  <span className={`${styles.optionCount} mono`}>{opt.count}</span>
                )}
                {isSelected && (
                  <Check size={15} aria-hidden="true" className={styles.optionCheck} />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

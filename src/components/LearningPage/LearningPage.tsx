import { useEffect, useState } from "react";
import {
  LuCheck as Check,
  LuChevronDown as ChevronDown,
  LuCopy as Copy,
  LuTerminal as Terminal,
} from "react-icons/lu";
import type {
  LearningBlock,
  LearningLevel,
  LearningSection,
} from "../../data/skill-guides";
import { useProgress } from "../../hooks/useProgress";
import { renderRichText } from "../RichText/RichText";
import styles from "./LearningPage.module.css";

const LEVELS: { value: LearningLevel; label: string; hint: string }[] = [
  { value: 1, label: "Aperçu", hint: "30 secondes" },
  { value: 2, label: "Pratique", hint: "5 à 15 minutes" },
  { value: 3, label: "Approfondi", hint: "En profondeur" },
];

const LEVEL_LABEL = ["", "Aperçu", "Pratique", "Approfondi"];

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      className={styles.copy}
      onClick={copy}
      aria-label={label ?? (copied ? "Copié !" : "Copier")}
      title={copied ? "Copié !" : "Copier"}
    >
      {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
      {copied && <span className={styles.copiedHint}>Copié</span>}
    </button>
  );
}

function CommandBlock({ block }: { block: Extract<LearningBlock, { kind: "command" }> }) {
  return (
    <div className={styles.command}>
      <p className={styles.commandLabel}>{renderRichText(block.label)}</p>
      <div className={styles.commandRow}>
        <code className={styles.commandCode}>{block.command}</code>
        <CopyButton text={block.command} />
      </div>
      <p className={styles.commandWhy}>
        <strong>Pourquoi ?</strong> {renderRichText(block.why)}
      </p>
      {block.verify && (
        <div className={styles.commandRow}>
          <span className={styles.verifyLabel}>Vérifier :</span>
          <code className={styles.commandCode}>{block.verify}</code>
          <CopyButton text={block.verify} />
        </div>
      )}
    </div>
  );
}

function CodeBlock({ block }: { block: Extract<LearningBlock, { kind: "code" }> }) {
  return (
    <figure className={styles.codeBlock}>
      <figcaption className={styles.codeHead}>
        <span className={styles.codeLang}>{block.language}</span>
        {block.title && <span className={styles.codeTitle}>{renderRichText(block.title)}</span>}
        <span className={styles.codeCopy}>
          <CopyButton text={block.code} />
        </span>
      </figcaption>
      <pre className={styles.codePre}>
        <code>{block.code}</code>
      </pre>
    </figure>
  );
}

function BlockView({ block }: { block: LearningBlock }) {
  switch (block.kind) {
    case "text":
      return <p className={styles.text}>{renderRichText(block.text)}</p>;
    case "command":
      return <CommandBlock block={block} />;
    case "code":
      return <CodeBlock block={block} />;
    case "list":
      return (
        <ul className={styles.list}>
          {block.items.map((item, i) => (
            <li key={i}>{renderRichText(item)}</li>
          ))}
        </ul>
      );
    case "fields":
      return (
        <div className={styles.fields}>
          {block.title && <p className={styles.fieldsTitle}>{renderRichText(block.title)}</p>}
          <dl>
            {block.fields.map((f, i) => (
              <div key={i} className={styles.field}>
                <dt>{renderRichText(f.label)}</dt>
                <dd>{renderRichText(f.value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      );
    case "table":
      return (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {block.headers.map((h, i) => (
                  <th key={i} scope="col">
                    {renderRichText(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{renderRichText(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "diagram":
      return (
        <figure className={styles.diagram}>
          {block.title && <figcaption>{renderRichText(block.title)}</figcaption>}
          <pre>{block.lines.join("\n")}</pre>
        </figure>
      );
    case "steps":
      return (
        <ol className={styles.steps}>
          {block.steps.map((s, i) => (
            <li key={i}>
              <p className={styles.stepTitle}>{renderRichText(s.title)}</p>
              <p className={styles.stepDetail}>{renderRichText(s.detail)}</p>
            </li>
          ))}
        </ol>
      );
  }
}

function SectionView({ section, defaultOpen }: { section: LearningSection; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  // Arrivée via une ancre (#learn-xxx, recherche ou sommaire) : déplier et cadrer.
  useEffect(() => {
    if (window.location.hash !== `#learn-${section.id}`) return;
    setOpen(true);
    window.setTimeout(() => {
      document
        .getElementById(`learn-${section.id}`)
        ?.scrollIntoView({ block: "start" });
    }, 60);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div id={`learn-${section.id}`} className={styles.section}>
      <button
        type="button"
        className={styles.sectionHead}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={styles.sectionTitle}>{section.title}</span>
        <span className={styles.levelBadge} data-level={section.level}>
          {LEVEL_LABEL[section.level]}
        </span>
        <ChevronDown
          size={17}
          aria-hidden="true"
          className={`${styles.chev} ${open ? styles.chevOpen : ""}`}
        />
      </button>
      <div className={`${styles.sectionBody} ${open ? styles.bodyOpen : ""}`} aria-hidden={!open}>
        <div className={styles.sectionInner}>
          {section.intro && <p className={styles.intro}>{renderRichText(section.intro)}</p>}
          {section.blocks.map((b, i) => (
            <BlockView key={i} block={b} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface LearningPageProps {
  sections: LearningSection[];
  roadmapSlug: string;
  skillId: string;
  skillName: string;
  /** Niveau contrôlé par le parent (SkillDoc, pour synchroniser le sommaire). */
  level?: LearningLevel;
  onLevelChange?: (level: LearningLevel) => void;
}

export function LearningPage({
  sections,
  roadmapSlug,
  skillId,
  skillName,
  level: controlledLevel,
  onLevelChange,
}: LearningPageProps) {
  const [innerLevel, setInnerLevel] = useState<LearningLevel>(1);
  const level = controlledLevel ?? innerLevel;
  const setLevel = (l: LearningLevel) => {
    onLevelChange?.(l);
    setInnerLevel(l);
  };
  const { statusOf, setStatus } = useProgress(roadmapSlug);
  const done = statusOf(skillId) === "done";
  const visible = sections.filter((s) => s.level <= level);

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <div className={styles.levels} role="tablist" aria-label="Niveau d'information">
          {LEVELS.map((l) => (
            <button
              key={l.value}
              type="button"
              role="tab"
              aria-selected={level === l.value}
              className={`${styles.levelTab} ${level === l.value ? styles.levelActive : ""}`}
              onClick={() => setLevel(l.value)}
            >
              <span className={styles.levelName}>{l.label}</span>
              <span className={styles.levelHint}>{l.hint}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          className={`${styles.learned} ${done ? styles.learnedDone : ""}`}
          onClick={() => setStatus(skillId, done ? null : "done")}
          aria-pressed={done}
        >
          <Check size={15} aria-hidden="true" />
          {done ? "Appris" : "Marquer comme appris"}
        </button>
      </div>

      <p className={styles.count} role="status">
        <Terminal size={13} aria-hidden="true" /> {visible.length} section
        {visible.length > 1 ? "s" : ""} · niveau {LEVELS[level - 1].label.toLowerCase()}
      </p>

      <div className={styles.sections}>
        {visible.map((s, i) => (
          <SectionView key={s.id} section={s} defaultOpen={i === 0} />
        ))}
      </div>

      <p className={styles.next}>
        {done
          ? `Vous maîtrisez ${skillName} : continuez votre parcours.`
          : `Terminez ce guide puis marquez ${skillName} comme appris.`}
      </p>
    </div>
  );
}

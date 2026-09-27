import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LuChevronRight as ChevronRight, LuSearch as Search, LuX as X } from "react-icons/lu";
import { Reveal } from "../../components/Reveal/Reveal";
import { getRoadmap, getSkill } from "../../data/roadmaps";
import { NODE_TYPE_LABEL, SKILL_LEVEL_LABEL } from "../../types";
import type { NodeType, SkillLevel } from "../../types";
import styles from "./Skills.module.css";

interface SkillEntry {
  label: string;
  category: string;
  roadmap: string;
  id: string;
  /** Type utilisé pour le filtre quand la donnée ne définit pas de type. */
  fallbackType?: NodeType;
}

const CATEGORIES = [
  "Langages",
  "DevOps",
  "Bases de données",
  "Cloud",
  "IA & Data",
  "Automation",
] as const;

/**
 * Roadmap canonique par compétence (vérifiée par scripts/verify-skills-pairs).
 * Chaque lien /roadmaps/{slug}?skill={id} ouvre le panneau de détail.
 */
const ENTRIES: SkillEntry[] = [
  // Langages
  { label: "TypeScript", category: "Langages", roadmap: "frontend-developer", id: "typescript", fallbackType: "language" },
  { label: "JavaScript", category: "Langages", roadmap: "frontend-developer", id: "javascript", fallbackType: "language" },
  { label: "Python", category: "Langages", roadmap: "data-scientist", id: "python", fallbackType: "language" },
  { label: "C++", category: "Langages", roadmap: "informatique", id: "cpp" },
  // DevOps
  { label: "Docker", category: "DevOps", roadmap: "devops-engineer", id: "docker", fallbackType: "tool" },
  { label: "Kubernetes", category: "DevOps", roadmap: "devops-engineer", id: "kubernetes", fallbackType: "platform" },
  { label: "Terraform", category: "DevOps", roadmap: "informatique", id: "terraform" },
  { label: "Git", category: "DevOps", roadmap: "devops-engineer", id: "git", fallbackType: "tool" },
  { label: "Linux", category: "DevOps", roadmap: "devops-engineer", id: "linux", fallbackType: "tool" },
  // Bases de données
  { label: "PostgreSQL", category: "Bases de données", roadmap: "informatique", id: "postgresql" },
  { label: "MySQL", category: "Bases de données", roadmap: "informatique", id: "mysql" },
  { label: "MongoDB", category: "Bases de données", roadmap: "informatique", id: "mongodb" },
  { label: "Redis", category: "Bases de données", roadmap: "informatique", id: "redis" },
  // Cloud
  { label: "AWS", category: "Cloud", roadmap: "informatique", id: "aws" },
  { label: "Azure", category: "Cloud", roadmap: "informatique", id: "azure" },
  { label: "Google Cloud", category: "Cloud", roadmap: "informatique", id: "gcp" },
  // IA & Data
  { label: "Machine Learning", category: "IA & Data", roadmap: "ai-engineer", id: "machine-learning", fallbackType: "specialization" },
  { label: "Deep Learning", category: "IA & Data", roadmap: "ai-engineer", id: "deep-learning", fallbackType: "specialization" },
  { label: "NLP", category: "IA & Data", roadmap: "ai-engineer", id: "nlp", fallbackType: "specialization" },
  { label: "Computer Vision", category: "IA & Data", roadmap: "ai-engineer", id: "computer-vision", fallbackType: "specialization" },
  { label: "LLM", category: "IA & Data", roadmap: "ai-engineer", id: "llm-systems", fallbackType: "specialization" },
  // Automation
  { label: "n8n", category: "Automation", roadmap: "informatique", id: "n8n" },
  { label: "APIs", category: "Automation", roadmap: "informatique", id: "rest" },
  { label: "Webhooks", category: "Automation", roadmap: "informatique", id: "webhooks" },
  { label: "JSON", category: "Automation", roadmap: "informatique", id: "json" },
];

interface ResolvedSkill {
  label: string;
  category: string;
  roadmap: string;
  roadmapName: string;
  id: string;
  level: SkillLevel;
  type: NodeType;
}

/** Résout les données (niveau, type, roadmap) depuis les roadmaps. Ignore toute entrée invalide. */
const SKILLS: ResolvedSkill[] = ENTRIES.flatMap((e) => {
  const rm = getRoadmap(e.roadmap);
  const skill = rm ? getSkill(rm, e.id) : undefined;
  if (!rm || !skill) return [];
  return [
    {
      label: e.label,
      category: e.category,
      roadmap: e.roadmap,
      roadmapName: rm.title,
      id: e.id,
      level: skill.level,
      type: skill.type ?? e.fallbackType ?? "concept",
    },
  ];
});

const LEVEL_OPTIONS: Array<"all" | SkillLevel> = ["all", "beginner", "intermediate", "advanced"];
const TYPE_OPTIONS: Array<"all" | NodeType> = [
  "all",
  "concept",
  "language",
  "framework",
  "tool",
  "platform",
  "specialization",
];

const SUGGESTIONS = [
  { label: "React", to: "/roadmaps/frontend-developer?skill=react" },
  { label: "DevOps", to: "/roadmaps/devops-engineer" },
  { label: "Python", to: "/roadmaps/data-scientist?skill=python" },
  { label: "n8n", to: "/roadmaps/informatique?skill=n8n" },
];

export function Skills() {
  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<"all" | SkillLevel>("all");
  const [typeFilter, setTypeFilter] = useState<"all" | NodeType>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SKILLS.filter((s) => {
      if (levelFilter !== "all" && s.level !== levelFilter) return false;
      if (typeFilter !== "all" && s.type !== typeFilter) return false;
      if (q && !`${s.label} ${s.roadmapName}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, levelFilter, typeFilter]);

  const grouped = useMemo(
    () =>
      CATEGORIES.map((category) => ({
        category,
        items: filtered.filter((s) => s.category === category),
      })).filter((g) => g.items.length > 0),
    [filtered]
  );

  const reset = () => {
    setQuery("");
    setLevelFilter("all");
    setTypeFilter("all");
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <Reveal className={styles.head}>
          <p className="eyebrow">Compétences</p>
          <h1 className={styles.title}>Explorer par compétence</h1>
          <p className="section-lead">
            Vous connaissez déjà une technologie ? Ouvrez-la directement :
            définition, prérequis, projets et ce qu&apos;apprendre ensuite.
          </p>
          <div className={styles.searchBar} role="search">
            <Search size={19} aria-hidden="true" className={styles.searchIcon} />
            <label htmlFor="skills-search" className={styles.srOnly}>
              Rechercher une compétence
            </label>
            <input
              id="skills-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filtrer : React, Docker, Python, n8n…"
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                className={styles.clearSearch}
                onClick={() => setQuery("")}
                aria-label="Effacer la recherche"
              >
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </div>
        </Reveal>

        <Reveal className={styles.controls} delay={80}>
          <div className={styles.filterRows}>
            <div className={styles.filterRow}>
              <span className={styles.filterLabel} id="skills-level-label">
                Niveau
              </span>
              <div className={styles.chips} role="group" aria-labelledby="skills-level-label">
                {LEVEL_OPTIONS.map((level) => (
                  <button
                    key={level}
                    type="button"
                    className={`${styles.chip} ${levelFilter === level ? styles.on : ""}`}
                    onClick={() => setLevelFilter(level)}
                    aria-pressed={levelFilter === level}
                  >
                    {level === "all" ? "Tous" : SKILL_LEVEL_LABEL[level]}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.filterRow}>
              <span className={styles.filterLabel} id="skills-type-label">
                Type
              </span>
              <div className={styles.chips} role="group" aria-labelledby="skills-type-label">
                {TYPE_OPTIONS.map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`${styles.chip} ${typeFilter === type ? styles.on : ""}`}
                    onClick={() => setTypeFilter(type)}
                    aria-pressed={typeFilter === type}
                  >
                    {type === "all" ? "Tous" : NODE_TYPE_LABEL[type]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {grouped.length > 0 ? (
          <div aria-live="polite">
            {grouped.map((group) => (
              <section key={group.category} className={styles.group} aria-label={group.category}>
                <h2 className={styles.groupTitle}>{group.category}</h2>
                <ul className={styles.grid}>
                  {group.items.map((s) => (
                    <li key={`${s.roadmap}:${s.id}`}>
                      <Link
                        className={styles.card}
                        to={`/roadmaps/${s.roadmap}?skill=${s.id}`}
                        aria-label={`${s.label} — ${s.roadmapName}`}
                      >
                        <span className={styles.cardMain}>
                          <span className={styles.name}>{s.label}</span>
                          <span className={styles.meta}>
                            <span
                              className={`${styles.levelDot} ${styles[s.level]}`}
                              aria-hidden="true"
                            />
                            {SKILL_LEVEL_LABEL[s.level]}
                            <span aria-hidden="true">·</span>
                            {NODE_TYPE_LABEL[s.type]}
                          </span>
                        </span>
                        <ChevronRight
                          size={16}
                          aria-hidden="true"
                          className={styles.chevron}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <div className={styles.empty} role="status">
            <p className={styles.emptyTitle}>Aucune compétence trouvée.</p>
            <p className={styles.emptyHint}>Essayez par exemple :</p>
            <div className={styles.suggestions}>
              {SUGGESTIONS.map((sug) => (
                <Link key={sug.label} to={sug.to} className={styles.suggestion}>
                  {sug.label}
                </Link>
              ))}
            </div>
            <button type="button" className={styles.reset} onClick={reset}>
              Effacer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

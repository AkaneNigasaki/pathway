import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  LuArrowUpRight as ArrowUpRight,
  LuSearch as Search,
  LuX as X,
} from "react-icons/lu";
import { Reveal } from "../../components/Reveal/Reveal";
import { CustomSelect } from "../../components/CustomSelect/CustomSelect";
import { FieldCard } from "../../components/FieldCard/FieldCard";
import { CareerCard } from "../../components/CareerCard/CareerCard";
import { RoadmapCard } from "../../components/RoadmapCard/RoadmapCard";
import { SkillIcon } from "../../components/SkillIcon/SkillIcon";
import {
  getExploreSkills,
  getTechnologies,
  getExploreRoadmaps,
  getExploreCareers,
  getExploreFields,
  getFieldStats,
  searchExplore,
  skillMatchesCareer,
  type ExploreHit,
  type ExploreKind,
  type ExploreSkill,
} from "../../data/explore";
import { CAREERS, getCareer } from "../../data/careers";
import { NODE_TYPE_LABEL, SKILL_LEVEL_LABEL } from "../../types";
import type { NodeType, SkillLevel } from "../../types";
import { ExploreSkillCard } from "./ExploreSkillCard";
import styles from "./Explore.module.css";

type Tab = "all" | ExploreKind;

const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "Tout" },
  { id: "field", label: "Filières" },
  { id: "career", label: "Métiers" },
  { id: "skill", label: "Compétences" },
  { id: "technology", label: "Technologies" },
  { id: "roadmap", label: "Roadmaps" },
];

const KIND_SECTION: Record<ExploreKind, string> = {
  field: "Filières",
  career: "Métiers",
  skill: "Compétences",
  technology: "Technologies",
  roadmap: "Roadmaps",
};

const SUGGESTIONS = ["React", "Python", "DevOps", "Kubernetes", "Machine Learning"];

export function Explore() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [tab, setTab] = useState<Tab>("all");
  const [fieldFilter, setFieldFilter] = useState("all");
  const [careerFilter, setCareerFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [techTypeFilter, setTechTypeFilter] = useState("all");

  const skills = useMemo(() => getExploreSkills(), []);
  const technologies = useMemo(() => getTechnologies(), []);
  const roadmaps = useMemo(() => getExploreRoadmaps(), []);
  const careers = useMemo(() => getExploreCareers(), []);
  const fields = useMemo(() => getExploreFields(), []);
  const skillById = useMemo(() => new Map(skills.map((s) => [s.id, s])), [skills]);

  const searching = query.trim().length > 0;
  const searchResults = useMemo(
    () => (searching ? searchExplore(query.trim()) : null),
    [query, searching]
  );

  const careerObj = useMemo(
    () => (careerFilter === "all" ? null : getCareer(careerFilter)),
    [careerFilter]
  );

  const filteredSkills = useMemo(() => {
    let list = skills;
    if (fieldFilter !== "all") list = list.filter((s) => s.fieldId === fieldFilter);
    if (careerObj) list = list.filter((s) => skillMatchesCareer(s, careerObj));
    if (levelFilter !== "all") list = list.filter((s) => s.level === levelFilter);
    return list;
  }, [skills, fieldFilter, careerObj, levelFilter]);

  const filteredTechnologies = useMemo(() => {
    let list = technologies;
    if (fieldFilter !== "all") list = list.filter((s) => s.fieldId === fieldFilter);
    if (careerObj) list = list.filter((s) => skillMatchesCareer(s, careerObj));
    if (levelFilter !== "all") list = list.filter((s) => s.level === levelFilter);
    if (techTypeFilter !== "all") list = list.filter((s) => s.type === techTypeFilter);
    return list;
  }, [technologies, fieldFilter, careerObj, levelFilter, techTypeFilter]);

  const filteredCareers = useMemo(
    () =>
      fieldFilter === "all"
        ? careers
        : careers.filter((c) => c.fieldId === fieldFilter),
    [careers, fieldFilter]
  );

  const filteredRoadmaps = useMemo(
    () =>
      fieldFilter === "all"
        ? roadmaps
        : roadmaps.filter((r) => r.fieldId === fieldFilter),
    [roadmaps, fieldFilter]
  );

  const hasFilters =
    fieldFilter !== "all" ||
    careerFilter !== "all" ||
    levelFilter !== "all" ||
    techTypeFilter !== "all";

  const resetFilters = () => {
    setFieldFilter("all");
    setCareerFilter("all");
    setLevelFilter("all");
    setTechTypeFilter("all");
  };

  const onQueryChange = (v: string) => {
    setQuery(v);
    setParams(v.trim() ? { q: v.trim() } : {}, { replace: true });
  };

  const fieldOptions = useMemo(
    () => [
      { value: "all", label: "Toutes les filières" },
      ...fields.map((f) => ({ value: f.id, label: f.name })),
    ],
    [fields]
  );
  const careerOptions = useMemo(
    () => [
      { value: "all", label: "Tous les métiers" },
      ...CAREERS.map((c) => ({ value: c.slug, label: c.title })),
    ],
    []
  );
  const levelOptions = useMemo(
    () => [
      { value: "all", label: "Tous les niveaux" },
      ...(["beginner", "intermediate", "advanced"] as SkillLevel[]).map((l) => ({
        value: l,
        label: SKILL_LEVEL_LABEL[l],
      })),
    ],
    []
  );
  const techTypeOptions = useMemo(
    () => [
      { value: "all", label: "Tous les types" },
      ...(["language", "framework", "tool", "platform"] as NodeType[]).map((t) => ({
        value: t,
        label: NODE_TYPE_LABEL[t],
      })),
    ],
    []
  );

  const showFilters =
    !searching &&
    (tab === "career" || tab === "skill" || tab === "technology" || tab === "roadmap");

  return (
    <div className={styles.page}>
      <div className="container">
        {/* ---- Hero ---- */}
        <Reveal className={`${styles.hero} header-card`}>
          <p className="eyebrow">Explore</p>
          <h1 className={styles.title}>Explorez votre parcours</h1>
          <p className={styles.lead}>
            Découvrez les filières, métiers, compétences, technologies et roadmaps
            disponibles sur Pathway.
          </p>
          <div className={styles.searchBar} role="search">
            <Search size={19} aria-hidden="true" className={styles.searchIcon} />
            <label htmlFor="explore-search" className={styles.srOnly}>
              Rechercher une filière, un métier, une compétence…
            </label>
            <input
              id="explore-search"
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Rechercher une filière, un métier, une compétence…"
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                className={styles.clear}
                onClick={() => onQueryChange("")}
                aria-label="Effacer la recherche"
              >
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </div>
        </Reveal>

        {/* ---- Onglets ---- */}
        <Reveal delay={80}>
          <div className={styles.tabs} role="group" aria-label="Catégories d'exploration">
            {TABS.map((t) => {
              const count =
                t.id === "all"
                  ? null
                  : t.id === "field"
                    ? fields.length
                    : t.id === "career"
                      ? careers.length
                      : t.id === "skill"
                        ? skills.length
                        : t.id === "technology"
                          ? technologies.length
                          : roadmaps.length;
              return (
                <button
                  key={t.id}
                  type="button"
                  className={`${styles.tab} ${tab === t.id ? styles.tabActive : ""}`}
                  aria-pressed={tab === t.id}
                  onClick={() => setTab(t.id)}
                >
                  {t.label}
                  {count !== null && (
                    <span className={`${styles.tabCount} mono`}>{count}</span>
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ---- Filtres ---- */}
        {showFilters && (
          <Reveal delay={120} className={styles.filters}>
            <CustomSelect
              label="Filière"
              value={fieldFilter}
              options={fieldOptions}
              onChange={setFieldFilter}
              allLabel="Toutes les filières"
            />
            {(tab === "skill" || tab === "technology") && (
              <CustomSelect
                label="Métier"
                value={careerFilter}
                options={careerOptions}
                onChange={setCareerFilter}
                allLabel="Tous les métiers"
              />
            )}
            {(tab === "skill" || tab === "technology") && (
              <CustomSelect
                label="Niveau"
                value={levelFilter}
                options={levelOptions}
                onChange={setLevelFilter}
                allLabel="Tous les niveaux"
              />
            )}
            {tab === "technology" && (
              <CustomSelect
                label="Type"
                value={techTypeFilter}
                options={techTypeOptions}
                onChange={setTechTypeFilter}
                allLabel="Tous les types"
              />
            )}
            {hasFilters && (
              <button type="button" className={styles.reset} onClick={resetFilters}>
                Réinitialiser
              </button>
            )}
          </Reveal>
        )}

        {/* ---- Contenu ---- */}
        <div aria-live="polite">
          {searching && searchResults ? (
            <SearchResultsView
              results={searchResults}
              tab={tab}
              query={query.trim()}
              skillById={skillById}
            />
          ) : tab === "all" ? (
            <HubView fields={fields} careers={careers} roadmaps={roadmaps} />
          ) : tab === "field" ? (
            <section aria-label="Filières">
              <SectionHead
                title="Filières"
                count={fields.length}
                hint="Les grands domaines couverts par Pathway."
              />
              <div className={styles.grid}>
                {fields.map((f) => {
                  const stats = getFieldStats(f.id);
                  return (
                    <FieldCard
                      key={f.id}
                      field={f}
                      roadmapCount={stats.roadmaps}
                      skillCount={stats.skills}
                      careerCount={stats.careers}
                    />
                  );
                })}
              </div>
            </section>
          ) : tab === "career" ? (
            <section aria-label="Métiers">
              <SectionHead
                title="Métiers"
                count={filteredCareers.length}
                hint="Chaque métier est relié à sa roadmap."
              />
              {filteredCareers.length === 0 ? (
                <EmptyState onReset={resetFilters} />
              ) : (
                <div className={styles.grid}>
                  {filteredCareers.map((c) => (
                    <CareerCard key={c.id} career={c} />
                  ))}
                </div>
              )}
            </section>
          ) : tab === "skill" ? (
            <section aria-label="Compétences">
              <SectionHead
                title="Compétences"
                count={filteredSkills.length}
                hint="Cliquez sur une compétence pour l'ouvrir dans sa roadmap."
              />
              {filteredSkills.length === 0 ? (
                <EmptyState onReset={resetFilters} />
              ) : (
                <div className={styles.grid}>
                  {filteredSkills.map((s) => (
                    <ExploreSkillCard key={s.id} skill={s} />
                  ))}
                </div>
              )}
            </section>
          ) : tab === "technology" ? (
            <section aria-label="Technologies">
              <SectionHead
                title="Technologies"
                count={filteredTechnologies.length}
                hint="Langages, frameworks, outils et plateformes."
              />
              {filteredTechnologies.length === 0 ? (
                <EmptyState onReset={resetFilters} />
              ) : (
                <div className={styles.grid}>
                  {filteredTechnologies.map((s) => (
                    <ExploreSkillCard key={s.id} skill={s} />
                  ))}
                </div>
              )}
            </section>
          ) : (
            <section aria-label="Roadmaps">
              <SectionHead
                title="Roadmaps"
                count={filteredRoadmaps.length}
                hint="Des parcours complets, étape par étape."
              />
              {filteredRoadmaps.length === 0 ? (
                <EmptyState onReset={resetFilters} />
              ) : (
                <div className={styles.roadmaps}>
                  {filteredRoadmaps.map((r) => (
                    <RoadmapCard key={r.slug} roadmap={r} />
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function SectionHead({
  title,
  count,
  hint,
}: {
  title: string;
  count: number;
  hint: string;
}) {
  return (
    <div className={styles.sectionHead}>
      <h2 className={styles.sectionTitle}>
        {title} <span className={`${styles.sectionCount} mono`}>{count}</span>
      </h2>
      {hint && <p className={styles.sectionHint}>{hint}</p>}
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className={styles.empty}>
      <p className={styles.emptyTitle}>Aucun résultat.</p>
      <p className={styles.emptyHint}>Essayez d'élargir les filtres :</p>
      <button type="button" className={styles.reset} onClick={onReset}>
        Réinitialiser les filtres
      </button>
    </div>
  );
}

/* ------------------------- Vue « hub » ------------------------- */

function HubView({
  fields,
  careers,
  roadmaps,
}: {
  fields: ReturnType<typeof getExploreFields>;
  careers: ReturnType<typeof getExploreCareers>;
  roadmaps: ReturnType<typeof getExploreRoadmaps>;
}) {
  return (
    <>
      <section aria-label="Filières">
        <SectionHead
          title="Filières"
          count={fields.length}
          hint="Les grands domaines couverts par Pathway."
        />
        <div className={styles.grid}>
          {fields.map((f) => {
            const stats = getFieldStats(f.id);
            return (
              <FieldCard
                key={f.id}
                field={f}
                roadmapCount={stats.roadmaps}
                skillCount={stats.skills}
                careerCount={stats.careers}
              />
            );
          })}
        </div>
      </section>

      <section aria-label="Métiers">
        <SectionHead
          title="Métiers"
          count={careers.length}
          hint="Choisissez un métier pour voir sa roadmap."
        />
        <div className={styles.grid}>
          {careers.map((c) => (
            <CareerCard key={c.id} career={c} />
          ))}
        </div>
      </section>

      <section aria-label="Roadmaps">
        <SectionHead
          title="Roadmaps"
          count={roadmaps.length}
          hint="Des parcours complets, étape par étape."
        />
        <div className={styles.roadmaps}>
          {roadmaps.map((r) => (
            <RoadmapCard key={r.slug} roadmap={r} />
          ))}
        </div>
      </section>
    </>
  );
}

/* ------------------------- Résultats de recherche ------------------------- */

const KIND_ORDER: ExploreKind[] = ["field", "career", "skill", "technology", "roadmap"];

const KIND_KEY: Record<ExploreKind, keyof ReturnType<typeof searchExplore>> = {
  field: "fields",
  career: "careers",
  skill: "skills",
  technology: "technologies",
  roadmap: "roadmaps",
};

function SearchResultsView({
  results,
  tab,
  query,
  skillById,
}: {
  results: ReturnType<typeof searchExplore>;
  tab: Tab;
  query: string;
  skillById: Map<string, ExploreSkill>;
}) {
  const groups = KIND_ORDER.map((kind) => ({ kind, hits: results[KIND_KEY[kind]] })).filter(
    (g) => (tab === "all" || tab === g.kind) && g.hits.length > 0
  );
  const total = groups.reduce((n, g) => n + g.hits.length, 0);

  if (total === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>Aucun résultat pour «&nbsp;{query}&nbsp;».</p>
        <p className={styles.emptyHint}>Essayez :</p>
        <ul className={styles.suggestions}>
          {SUGGESTIONS.map((s) => (
            <li key={s}>
              <span className={styles.suggestion}>{s}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <>
      <p className={styles.count}>
        <span className="mono">{total}</span> résultat{total > 1 ? "s" : ""} pour
        «&nbsp;{query}&nbsp;»
      </p>
      {groups.map(({ kind, hits }) => (
        <section key={kind} aria-label={KIND_SECTION[kind]}>
          <SectionHead title={KIND_SECTION[kind]} count={hits.length} hint="" />
          {kind === "field" ? (
            <div className={styles.grid}>
              {hits.map((h) => (
                <FieldHit key={h.url} hit={h} />
              ))}
            </div>
          ) : kind === "career" ? (
            <div className={styles.grid}>
              {hits.map((h) => (
                <CareerHit key={h.url} hit={h} />
              ))}
            </div>
          ) : kind === "roadmap" ? (
            <div className={styles.roadmaps}>
              {hits.map((h) => (
                <RoadmapHit key={h.url} hit={h} />
              ))}
            </div>
          ) : (
            <div className={styles.grid}>
              {hits.map((h) => {
                const skill = skillById.get(skillIdFromUrl(h.url));
                return skill ? (
                  <ExploreSkillCard key={h.url} skill={skill} />
                ) : (
                  <HitRow key={h.url} hit={h} />
                );
              })}
            </div>
          )}
        </section>
      ))}
    </>
  );
}

function skillIdFromUrl(url: string): string {
  const m = url.match(/skill=([^&]+)/);
  return m ? decodeURIComponent(m[1]) : "";
}

function FieldHit({ hit }: { hit: ExploreHit }) {
  const field = getExploreFields().find((f) => `/fields/${f.id}` === hit.url);
  if (!field) return <HitRow hit={hit} />;
  const stats = getFieldStats(field.id);
  return (
    <FieldCard
      field={field}
      roadmapCount={stats.roadmaps}
      skillCount={stats.skills}
      careerCount={stats.careers}
    />
  );
}

function CareerHit({ hit }: { hit: ExploreHit }) {
  const career = getExploreCareers().find((c) => `/careers/${c.slug}` === hit.url);
  return career ? <CareerCard career={career} /> : <HitRow hit={hit} />;
}

function RoadmapHit({ hit }: { hit: ExploreHit }) {
  const roadmap = getExploreRoadmaps().find((r) => `/roadmaps/${r.slug}` === hit.url);
  return roadmap ? <RoadmapCard roadmap={roadmap} /> : <HitRow hit={hit} />;
}

function HitRow({ hit }: { hit: ExploreHit }) {
  return (
    <Link to={hit.url} className={styles.hitRow}>
      <span className={styles.hitText}>
        <span className={styles.hitTitle}>
          {hit.type && (
            <SkillIcon
              skillId={skillIdFromUrl(hit.url)}
              nodeType={hit.type}
              label={hit.title}
              size={20}
              decorative
            />
          )}
          {hit.title}
          {hit.level && <em className={styles.level}>{SKILL_LEVEL_LABEL[hit.level]}</em>}
        </span>
        <span className={styles.hitSub}>{hit.subtitle}</span>
      </span>
      <ArrowUpRight size={16} aria-hidden="true" className={styles.hitArrow} />
    </Link>
  );
}

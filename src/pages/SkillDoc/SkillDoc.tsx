import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LuArrowRight as ArrowRight,
  LuArrowUpRight as ArrowUpRight,
  LuBookOpen as BookOpen,
  LuCheck as Check,
  LuChevronRight as ChevronRight,
  LuClock as Clock,
  LuDownload as Download,
  LuLaptop as Laptop,
  LuListChecks as ListChecks,
  LuSettings as Settings,
  LuTable as Table,
  LuTerminal as Terminal,
  LuWrench as Wrench,
} from "react-icons/lu";
import { Reveal } from "../../components/Reveal/Reveal";
import { renderRichText } from "../../components/RichText/RichText";
import { LearningPage, BlockView } from "../../components/LearningPage/LearningPage";
import { DocJourney } from "../../components/DocJourney/DocJourney";
import type { MapSection } from "../../components/SectionMap/SectionMap";
import { SkillIcon } from "../../components/SkillIcon/SkillIcon";
import { NotFound } from "../NotFound/NotFound";
import { getRoadmap, skillMap } from "../../data/roadmaps";
import { getSkillGuide } from "../../data/skill-guides";
import { getEnvironment } from "../../data/doc-environment";
import { NODE_TYPE_LABEL, SKILL_LEVEL_LABEL } from "../../types";
import type { SkillProject } from "../../types";
import type { LearningLevel, LearningSection } from "../../data/skill-guides";
import styles from "./SkillDoc.module.css";

export function SkillDoc() {
  const { roadmapSlug = "", skillId = "" } = useParams();
  const roadmap = getRoadmap(roadmapSlug);
  const skill = roadmap?.skills.find((s) => s.id === skillId);
  const guide = getSkillGuide(roadmapSlug, skillId);
  const [level, setLevel] = useState<LearningLevel>(1);
  const { hash } = useLocation();
  const navigate = useNavigate();
  // Section visée par l'ancre (recherche, sommaire, lien partagé).
  const focusId = hash.replace(/^#/, "") || null;

  // Sections de la Learning Page, chargées à la demande (chunk séparé).
  const [learningSectionsState, setLearningSections] = useState<LearningSection[] | null>(null);
  useEffect(() => {
    let alive = true;
    setLearningSections(null);
    const loader = guide?.learning;
    if (loader) {
      loader().then(
        (sections) => {
          if (alive) setLearningSections(sections);
        },
        () => {
          if (alive) setLearningSections([]);
        }
      );
    } else if (alive) {
      setLearningSections([]);
    }
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roadmapSlug, skillId]);

  // L'ancre peut arriver après le montage (navigation interne) : monter au
  // niveau requis pour que la section ciblée existe dans le DOM.
  useEffect(() => {
    if (!learningSectionsState) return;
    const target = learningSectionsState.find((s) => `learn-${s.id}` === focusId);
    if (target && target.level > level) setLevel(target.level);
    // Fait défiler jusqu'à la section visée (clic sommaire, recherche, lien partagé).
    if (focusId) {
      // Attend que le niveau se soit appliqué et la section dépliée.
      const t = setTimeout(() => {
        const el = document.getElementById(focusId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusId, learningSectionsState]);

  if (!roadmap || !skill) {
    return <NotFound />;
  }

  const environment = getEnvironment(skill, guide);
  const concepts = guide?.conceptDetails ?? [];
  const projects: SkillProject[] =
    guide?.projectsDetailed ?? skill.projects.map((p) => ({ title: p }));
  const prereqs = skill.prerequisites.map((id) => ({
    id,
    skill: skillMap(roadmap)[id],
    note: guide?.prerequisiteNotes?.[id],
  }));

  const learningSections = learningSectionsState ?? [];
  const learningReady = learningSectionsState !== null;
  const hasLearning = learningReady && learningSections.length > 0;

  const sections: MapSection[] = !learningReady
    ? []
    : hasLearning
      ? [
        ...learningSections.map((s) => ({
          id: `learn-${s.id}`,
          label: s.title,
          level: s.level,
        })),
        ...(prereqs.length ? [{ id: "prerequis", label: "Prérequis" }] : []),
        ...(skill.resources.length ? [{ id: "ressources", label: "Ressources" }] : []),
      ]
    : [
        { id: "definition", label: "Définition" },
        ...(guide?.whyLearn ? [{ id: "pourquoi", label: "Pourquoi l'apprendre" }] : []),
        { id: "environnement", label: "Environnement" },
        ...(guide?.setup ? [{ id: "mise-en-place", label: "Mise en place" }] : []),
        ...(guide?.howItWorks?.length
          ? [{ id: "fonctionnement", label: guide.howItWorksTitle ?? "Comment ça fonctionne" }]
          : []),
        ...(concepts.length || skill.concepts.length
          ? [{ id: "concepts", label: "Concepts clés" }]
          : []),
        ...(guide?.example ? [{ id: "exemple", label: "Exemple concret" }] : []),
        ...(projects.length ? [{ id: "projets", label: "Projets pour pratiquer" }] : []),
        ...(prereqs.length ? [{ id: "prerequis", label: "Prérequis" }] : []),
        ...(skill.resources.length ? [{ id: "ressources", label: "Ressources" }] : []),
      ];

  return (
    <div className={styles.page}>
      <div className="container">
        <nav className={styles.crumb} aria-label="Fil d'Ariane">
          <Link to="/">Accueil</Link>
          <ChevronRight size={13} aria-hidden="true" />
          <Link to={`/roadmaps/${roadmap.slug}`}>{roadmap.title}</Link>
          <ChevronRight size={13} aria-hidden="true" />
          <span aria-current="page">Documentation</span>
        </nav>

        <Reveal className={`${styles.head} header-card`}>
          <p className="eyebrow">
            <BookOpen size={13} aria-hidden="true" /> Documentation
          </p>
          <h1 className={styles.title}>
            <SkillIcon
              skillId={skill.id}
              nodeType={skill.type ?? "concept"}
              label={skill.name}
              size={40}
              className={styles.titleIcon}
              decorative
            />
            {skill.name}
          </h1>
          <p className="section-lead">{skill.tagline}</p>
          <ul className={styles.meta} aria-label="Informations">
            <li>{SKILL_LEVEL_LABEL[skill.level]}</li>
            <li>{NODE_TYPE_LABEL[skill.type ?? "concept"]}</li>
            <li>
              <Clock size={13} aria-hidden="true" /> {skill.duration}
            </li>
            <li>{roadmap.title}</li>
          </ul>
          {guide?.docsUrl && (
            <a
              href={guide.docsUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.docsLink}
            >
              <BookOpen size={14} aria-hidden="true" /> Documentation officielle
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          )}
        </Reveal>

        <DocJourney
          sections={sections}
          activeId={focusId}
          onSelect={(s) => {
            if (s.level && s.level > level) setLevel(s.level);
            navigate({ hash: s.id });
          }}
          renderContent={(s) => {
            // Retrouve la section d'apprentissage complète pour afficher
            // son contenu de façon naturelle, comme écrit par un humain.
            const ls = learningSections.find((x) => `learn-${x.id}` === s.id);
            if (!ls) {
              // Sections spéciales (prérequis, ressources, etc.)
              if (s.id === "prerequis") {
                return (
                  <div>
                    <p>Avant de plonger, assurez-vous de maîtriser ces bases — elles vous éviteront bien des détours.</p>
                    <ul>
                      {prereqs.map(({ id, skill: pre, note }) => (
                        <li key={id}>
                          <strong>{pre?.name ?? id}</strong>
                          {note ? ` — ${note}` : ""}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              if (s.id === "ressources") {
                return (
                  <div>
                    <p>Pour creuser plus loin, voici des sources fiables choisies avec soin.</p>
                    <ul>
                      {skill.resources.map((r) => (
                        <li key={r.url}>
                          <a href={r.url} target="_blank" rel="noreferrer">{r.title}</a>
                          {r.provider ? ` — ${r.provider}` : ""}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return <p>{s.label}</p>;
            }
            return (
              <div className={styles.panelNatural}>
                {ls.intro && <p className={styles.panelLead}>{ls.intro}</p>}
                {ls.blocks.map((b, i) => (
                  <BlockView key={i} block={b} />
                ))}
              </div>
            );
          }}
        />

        <article className={styles.doc} hidden>
            {!learningReady ? (
              <div className={styles.loading} aria-live="polite" aria-busy="true">
                <p className={styles.loadingTitle}>Chargement du guide…</p>
                <p className={styles.loadingHint}>Les sections arrivent dans un instant.</p>
              </div>
            ) : hasLearning ? (
              <LearningPage
                sections={learningSections}
                roadmapSlug={roadmap.slug}
                skillId={skill.id}
                skillName={skill.name}
                level={level}
                onLevelChange={setLevel}
                focusSectionId={focusId}
              />
            ) : (
              <>
            <Reveal>
              <section id="definition" className={styles.section} aria-label="Définition">
                <h2 className={styles.h2}>Définition</h2>
                <p className={styles.lead}>{renderRichText(guide?.definition ?? skill.description)}</p>
              </section>
            </Reveal>

            {guide?.whyLearn && (
              <Reveal>
                <section id="pourquoi" className={styles.section} aria-label="Pourquoi l'apprendre">
                  <h2 className={styles.h2}>Pourquoi l'apprendre</h2>
                  <p>{renderRichText(guide.whyLearn)}</p>
                </section>
              </Reveal>
            )}

            <Reveal>
              <section id="environnement" className={styles.section} aria-label="Environnement">
                <h2 className={styles.h2}>
                  <Wrench size={18} aria-hidden="true" /> Environnement
                </h2>
                <p className={styles.hint}>
                  Tout ce qu'il faut installer et configurer avant de pratiquer.
                </p>
                <ul className={styles.checklist}>
                  {environment.map((step, i) => (
                    <li key={i}>
                      <span className={styles.check} aria-hidden="true">
                        <Check size={14} />
                      </span>
                      <span>{renderRichText(step)}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            {guide?.setup && (
              <Reveal>
                <section id="mise-en-place" className={styles.section} aria-label="Mise en place">
                  <h2 className={styles.h2}>
                    <Download size={18} aria-hidden="true" /> Mise en place
                  </h2>
                  <p className={styles.hint}>
                    Installer, configurer et travailler avec {skill.name} au quotidien :
                    commandes concrètes, configuration essentielle et éditeurs recommandés.
                  </p>
                  {guide.setup.install && guide.setup.install.length > 0 && (
                    <>
                      <h3 className={styles.subhead}>
                        <Download size={15} aria-hidden="true" /> Installation
                      </h3>
                      <ul className={styles.checklist}>
                        {guide.setup.install.map((step, i) => (
                          <li key={i}>
                            <span className={styles.check} aria-hidden="true">
                              <Check size={14} />
                            </span>
                            <span>{renderRichText(step)}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {guide.setup.configure && guide.setup.configure.length > 0 && (
                    <>
                      <h3 className={styles.subhead}>
                        <Settings size={15} aria-hidden="true" /> Configuration
                      </h3>
                      <ul className={styles.checklist}>
                        {guide.setup.configure.map((step, i) => (
                          <li key={i}>
                            <span className={styles.check} aria-hidden="true">
                              <Check size={14} />
                            </span>
                            <span>{renderRichText(step)}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {guide.setup.workflow && guide.setup.workflow.length > 0 && (
                    <>
                      <h3 className={styles.subhead}>
                        <Terminal size={15} aria-hidden="true" /> Travail quotidien
                      </h3>
                      <ul className={styles.checklist}>
                        {guide.setup.workflow.map((step, i) => (
                          <li key={i}>
                            <span className={styles.check} aria-hidden="true">
                              <Check size={14} />
                            </span>
                            <span>{renderRichText(step)}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {guide.setup.editors && guide.setup.editors.length > 0 && (
                    <>
                      <h3 className={styles.subhead}>
                        <Laptop size={15} aria-hidden="true" /> Éditeurs recommandés
                      </h3>
                      <ul className={styles.checklist}>
                        {guide.setup.editors.map((step, i) => (
                          <li key={i}>
                            <span className={styles.check} aria-hidden="true">
                              <Check size={14} />
                            </span>
                            <span>{renderRichText(step)}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </section>
              </Reveal>
            )}

            {guide?.howItWorks && guide.howItWorks.length > 0 && (
              <Reveal>
                <section
                  id="fonctionnement"
                  className={styles.section}
                  aria-label={guide.howItWorksTitle ?? "Comment ça fonctionne"}
                >
                  <h2 className={styles.h2}>{guide.howItWorksTitle ?? "Comment ça fonctionne"}</h2>
                  <ol className={styles.steps}>
                    {guide.howItWorks.map((step, i) => (
                      <li key={i}>
                        <span className={styles.stepNum} aria-hidden="true">
                          {i + 1}
                        </span>
                        <span>{renderRichText(step)}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              </Reveal>
            )}

            {(concepts.length > 0 || skill.concepts.length > 0) && (
              <Reveal>
                <section id="concepts" className={styles.section} aria-label="Concepts clés">
                  <h2 className={styles.h2}>
                    <Table size={18} aria-hidden="true" /> Concepts clés
                  </h2>
                  <div className={styles.tableWrap}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th scope="col">Concept</th>
                          <th scope="col">Définition</th>
                        </tr>
                      </thead>
                      <tbody>
                        {concepts.length > 0
                          ? concepts.map((c) => (
                              <tr key={c.name}>
                                <th scope="row">{c.name}</th>
                                <td>{renderRichText(c.definition)}</td>
                              </tr>
                            ))
                          : skill.concepts.map((c) => (
                              <tr key={c}>
                                <th scope="row">{c}</th>
                                <td className={styles.muted}>À explorer dans le guide du panneau.</td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </Reveal>
            )}

            {guide?.example && (
              <Reveal>
                <section id="exemple" className={styles.section} aria-label="Exemple concret">
                  <h2 className={styles.h2}>Exemple concret</h2>
                  <p className={styles.exampleTitle}>{renderRichText(guide.example.title)}</p>
                  <ol className={styles.flow} aria-label={`Flux : ${guide.example.title}`}>
                    {guide.example.steps.map((s, i) => (
                      <li key={i}>
                        <span>{renderRichText(s)}</span>
                        {i < guide.example!.steps.length - 1 && (
                          <ArrowRight size={14} aria-hidden="true" className={styles.flowArrow} />
                        )}
                      </li>
                    ))}
                  </ol>
                </section>
              </Reveal>
            )}

            {projects.length > 0 && (
              <Reveal>
                <section id="projets" className={styles.section} aria-label="Projets pour pratiquer">
                  <h2 className={styles.h2}>
                    <ListChecks size={18} aria-hidden="true" /> Projets pour pratiquer
                  </h2>
                  <ol className={styles.projects}>
                    {projects.map((p, i) => (
                      <li key={i} className={styles.project}>
                        <span className={styles.projectNum} aria-hidden="true">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className={styles.projectTitle}>{renderRichText(p.title)}</p>
                          {p.flow && <p className={styles.projectFlow}>{renderRichText(p.flow)}</p>}
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              </Reveal>
            )}

              </>
            )}

            {prereqs.length > 0 && (
              <Reveal>
                <section id="prerequis" className={styles.section} aria-label="Prérequis">
                  <h2 className={styles.h2}>Prérequis</h2>
                  <ul className={styles.prereqs}>
                    {prereqs.map(({ id, skill: pre, note }) => (
                      <li key={id}>
                        {pre ? (
                          <Link to={`/docs/${roadmapSlug}/${id}`} className={styles.prereqLink}>
                            {pre.name}
                            <ArrowUpRight size={13} aria-hidden="true" />
                          </Link>
                        ) : (
                          <span className={styles.prereqName}>{id}</span>
                        )}
                        {note && <p className={styles.prereqNote}>{renderRichText(note)}</p>}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            )}

            {skill.resources.length > 0 && (
              <Reveal>
                <section id="ressources" className={styles.section} aria-label="Ressources">
                  <h2 className={styles.h2}>Ressources</h2>
                  <ul className={styles.resources}>
                    {skill.resources.map((r) => (
                      <li key={r.url}>
                        <a href={r.url} target="_blank" rel="noreferrer">
                          <span className={styles.resTitle}>{r.title}</span>
                          <span className={styles.resProvider}>{r.provider}</span>
                          <ArrowUpRight size={13} aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            )}

            <Reveal>
              <div className={styles.next}>
                <p>Maîtrisez {skill.name} ? Validez-le et continuez votre parcours.</p>
                <Link to={`/roadmaps/${roadmap.slug}`} className={styles.nextCta}>
                  Ouvrir la roadmap {roadmap.title}
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </article>
      </div>
    </div>
  );
}

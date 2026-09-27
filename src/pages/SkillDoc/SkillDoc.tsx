import { Link, useParams } from "react-router-dom";
import {
  LuArrowLeft as ArrowLeft,
  LuArrowRight as ArrowRight,
  LuArrowUpRight as ArrowUpRight,
  LuBookOpen as BookOpen,
  LuCheck as Check,
  LuChevronRight as ChevronRight,
  LuClock as Clock,
  LuListChecks as ListChecks,
  LuTable as Table,
  LuWrench as Wrench,
} from "react-icons/lu";
import { Reveal } from "../../components/Reveal/Reveal";
import { SkillIcon } from "../../components/SkillIcon/SkillIcon";
import { NotFound } from "../NotFound/NotFound";
import { getRoadmap, skillMap } from "../../data/roadmaps";
import { getSkillGuide } from "../../data/skill-guides";
import { getEnvironment } from "../../data/doc-environment";
import { NODE_TYPE_LABEL, SKILL_LEVEL_LABEL } from "../../types";
import type { SkillProject } from "../../types";
import styles from "./SkillDoc.module.css";

interface DocSection {
  id: string;
  label: string;
}

export function SkillDoc() {
  const { roadmapSlug = "", skillId = "" } = useParams();
  const roadmap = getRoadmap(roadmapSlug);
  const skill = roadmap?.skills.find((s) => s.id === skillId);
  const guide = getSkillGuide(roadmapSlug, skillId);

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

  const sections: DocSection[] = [
    { id: "definition", label: "Définition" },
    ...(guide?.whyLearn ? [{ id: "pourquoi", label: "Pourquoi l'apprendre" }] : []),
    { id: "environnement", label: "Environnement" },
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
        </Reveal>

        <div className={styles.layout}>
          <aside className={styles.toc} aria-label="Sommaire">
            <p className={styles.tocTitle}>Sommaire</p>
            <ol>
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>
                    <span className={styles.tocNum}>{String(i + 1).padStart(2, "0")}</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
            <Link to={`/roadmaps/${roadmap.slug}`} className={styles.backLink}>
              <ArrowLeft size={14} aria-hidden="true" /> Retour à la roadmap
            </Link>
          </aside>

          <article className={styles.doc}>
            <Reveal>
              <section id="definition" className={styles.section} aria-label="Définition">
                <h2 className={styles.h2}>Définition</h2>
                <p className={styles.lead}>{guide?.definition ?? skill.description}</p>
              </section>
            </Reveal>

            {guide?.whyLearn && (
              <Reveal>
                <section id="pourquoi" className={styles.section} aria-label="Pourquoi l'apprendre">
                  <h2 className={styles.h2}>Pourquoi l'apprendre</h2>
                  <p>{guide.whyLearn}</p>
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
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

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
                        <span>{step}</span>
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
                                <td>{c.definition}</td>
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
                  <p className={styles.exampleTitle}>{guide.example.title}</p>
                  <ol className={styles.flow} aria-label={`Flux : ${guide.example.title}`}>
                    {guide.example.steps.map((s, i) => (
                      <li key={i}>
                        <span>{s}</span>
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
                          <p className={styles.projectTitle}>{p.title}</p>
                          {p.flow && <p className={styles.projectFlow}>{p.flow}</p>}
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              </Reveal>
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
                        {note && <p className={styles.prereqNote}>{note}</p>}
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
    </div>
  );
}

import { Link } from "react-router-dom";
import {ArrowUpRight} from "@phosphor-icons/react";
import type { Career } from "../../types";
import { getField } from "../../data/fields";
import styles from "./CareerCard.module.css";

const DEMAND_LABEL: Record<Career["demand"], string> = {
  "Très forte": "Demande très forte",
  Forte: "Forte demande",
  Stable: "Demande stable",
  Émergente: "Domaine émergent",
};

export function CareerCard({ career }: { career: Career }) {
  const field = getField(career.fieldId);

  return (
    <Link
      to={`/careers/${career.slug}`}
      className={styles.card}
      style={{ "--field-accent": field?.accent } as React.CSSProperties}
    >
      <div className={styles.head}>
        <span className={styles.demand}>{DEMAND_LABEL[career.demand]}</span>
        <ArrowUpRight size={16} className={styles.arrow} aria-hidden="true" />
      </div>
      <h3 className={styles.title}>{career.title}</h3>
      <p className={styles.tagline}>{career.tagline}</p>
      <div className={styles.foot}>
        <span className={`${styles.salary} mono`}>{career.salaryRange}</span>
        <span className={styles.roadmap}>Voir la roadmap →</span>
      </div>
    </Link>
  );
}

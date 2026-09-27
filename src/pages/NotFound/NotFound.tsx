import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import styles from "./NotFound.module.css";

export function NotFound() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.inner}>
          <Compass size={44} strokeWidth={1.2} aria-hidden="true" className={styles.icon} />
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>Ce parcours n'existe pas.</h1>
          <p className={styles.lead}>
            La page que vous cherchez a peut-être été déplacée, ou n'a jamais existé.
          </p>
          <Link to="/" className={styles.cta}>
            <ArrowLeft size={15} aria-hidden="true" /> Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

import type { CSSProperties } from "react";
import typescriptSvg from "../../assets/tech-icons/typescript.svg";
import javascriptSvg from "../../assets/tech-icons/javascript.svg";
import pythonSvg from "../../assets/tech-icons/python.svg";
import cppSvg from "../../assets/tech-icons/cpp.svg";
import htmlSvg from "../../assets/tech-icons/html.svg";
import cssSvg from "../../assets/tech-icons/css.svg";
import bashSvg from "../../assets/tech-icons/bash.svg";
import bashDarkSvg from "../../assets/tech-icons/bash-dark.svg";
import linuxSvg from "../../assets/tech-icons/linux.svg";
import gitSvg from "../../assets/tech-icons/git.svg";
import jsonSvg from "../../assets/tech-icons/json.svg";
import npmSvg from "../../assets/tech-icons/npm.svg";
import pnpmSvg from "../../assets/tech-icons/pnpm.svg";
import viteSvg from "../../assets/tech-icons/vite.svg";
import eslintSvg from "../../assets/tech-icons/eslint.svg";
import prettierSvg from "../../assets/tech-icons/prettier.svg";
import reactSvg from "../../assets/tech-icons/react.svg";
import reactDarkSvg from "../../assets/tech-icons/react-dark.svg";
import nextjsSvg from "../../assets/tech-icons/nextjs.svg";
import tailwindSvg from "../../assets/tech-icons/tailwind.svg";
import vitestSvg from "../../assets/tech-icons/vitest.svg";
import playwrightSvg from "../../assets/tech-icons/playwright.svg";
import nodejsSvg from "../../assets/tech-icons/nodejs.svg";
import githubSvg from "../../assets/tech-icons/github.svg";
import githubDarkSvg from "../../assets/tech-icons/github-dark.svg";
import postmanSvg from "../../assets/tech-icons/postman.svg";
import flutterSvg from "../../assets/tech-icons/flutter.svg";
import electronSvg from "../../assets/tech-icons/electron.svg";
import tensorflowSvg from "../../assets/tech-icons/tensorflow.svg";
import dockerSvg from "../../assets/tech-icons/docker.svg";
import kubernetesSvg from "../../assets/tech-icons/kubernetes.svg";
import terraformSvg from "../../assets/tech-icons/terraform.svg";
import nginxSvg from "../../assets/tech-icons/nginx.svg";
import grafanaSvg from "../../assets/tech-icons/grafana.svg";
import postgresqlSvg from "../../assets/tech-icons/postgresql.svg";
import mysqlSvg from "../../assets/tech-icons/mysql.svg";
import mysqlDarkSvg from "../../assets/tech-icons/mysql-dark.svg";
import mongodbSvg from "../../assets/tech-icons/mongodb.svg";
import mongodbDarkSvg from "../../assets/tech-icons/mongodb-dark.svg";
import redisSvg from "../../assets/tech-icons/redis.svg";
import n8nSvg from "../../assets/tech-icons/n8n.svg";
import figmaSvg from "../../assets/tech-icons/figma.svg";
import kafkaSvg from "../../assets/tech-icons/kafka.svg";
import kafkaDarkSvg from "../../assets/tech-icons/kafka-dark.svg";
import gitlabCiSvg from "../../assets/tech-icons/gitlab-ci.svg";
import awsSvg from "../../assets/tech-icons/aws.svg";
import gcpSvg from "../../assets/tech-icons/gcp.svg";
import azureSvg from "../../assets/tech-icons/azure.svg";
import styles from "./BrandIcon.module.css";

/**
 * Vrais logos des technologies (source : svgl.app), affichés à côté du nom
 * de la compétence partout où elle apparaît : nœuds de la roadmap/carte,
 * panneau de compétence, résultats Explore et palette Ctrl+K.
 *
 * Les compétences qui sont des concepts génériques (Algorithmique, HTTP,
 * Réseaux…) n'ont pas de logo de marque : elles gardent leur icône générique.
 */
const BRAND_ICONS: Record<string, string> = {
  typescript: typescriptSvg,
  javascript: javascriptSvg,
  python: pythonSvg,
  cpp: cppSvg,
  html: htmlSvg,
  css: cssSvg,
  bash: bashSvg,
  linux: linuxSvg,
  git: gitSvg,
  json: jsonSvg,
  npm: npmSvg,
  pnpm: pnpmSvg,
  vite: viteSvg,
  eslint: eslintSvg,
  prettier: prettierSvg,
  react: reactSvg,
  nextjs: nextjsSvg,
  tailwind: tailwindSvg,
  vitest: vitestSvg,
  playwright: playwrightSvg,
  nodejs: nodejsSvg,
  github: githubSvg,
  postman: postmanSvg,
  flutter: flutterSvg,
  electron: electronSvg,
  tensorflow: tensorflowSvg,
  docker: dockerSvg,
  kubernetes: kubernetesSvg,
  terraform: terraformSvg,
  nginx: nginxSvg,
  grafana: grafanaSvg,
  postgresql: postgresqlSvg,
  mysql: mysqlSvg,
  mongodb: mongodbSvg,
  redis: redisSvg,
  n8n: n8nSvg,
  figma: figmaSvg,
  kafka: kafkaSvg,
  "gitlab-ci": gitlabCiSvg,
  aws: awsSvg,
  gcp: gcpSvg,
  azure: azureSvg,
};

/** Variantes officielles pour fonds sombres (svgl.app). */
const BRAND_ICONS_DARK: Partial<Record<string, string>> = {
  bash: bashDarkSvg,
  react: reactDarkSvg,
  github: githubDarkSvg,
  kafka: kafkaDarkSvg,
  mysql: mysqlDarkSvg,
  mongodb: mongodbDarkSvg,
};

/**
 * Logos monochromes sombres sans variante officielle : rendus blancs
 * en thème sombre (traitement standard, comme le logo Next.js officiel).
 */
const WHITE_IN_DARK = new Set(["nextjs"]);

export function hasBrandIcon(skillId: string): boolean {
  return skillId in BRAND_ICONS;
}

/**
 * Extrait l'id brut d'une compétence depuis un SearchItem
 * (format « roadmapSlug:skillId »), ou null si pas de logo.
 */
export function searchItemBrandIcon(item: { type: string; id: string }): string | null {
  if (item.type !== "skill") return null;
  const skillId = item.id.split(":").pop() ?? "";
  return hasBrandIcon(skillId) ? skillId : null;
}

interface BrandIconProps {
  skillId: string;
  /** Nom de la technologie, pour l'accessibilité. */
  label: string;
  size?: number;
  className?: string;
}

export function BrandIcon({ skillId, label, size = 18, className = "" }: BrandIconProps) {
  const src = BRAND_ICONS[skillId];
  if (!src) return null;
  const darkSrc = BRAND_ICONS_DARK[skillId];
  const style = { width: size, height: size } as CSSProperties;
  const classes = [styles.icon];
  if (WHITE_IN_DARK.has(skillId)) classes.push(styles.whiteInDark);
  if (className) classes.push(className);
  return (
    <span className={classes.join(" ")} style={style} role="img" aria-label={label}>
      <img className={styles.light} src={src} alt="" aria-hidden="true" draggable={false} />
      {darkSrc && (
        <img className={styles.dark} src={darkSrc} alt="" aria-hidden="true" draggable={false} />
      )}
    </span>
  );
}

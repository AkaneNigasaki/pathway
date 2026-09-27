import type { ComponentType } from "react";
import type { SkillIllustration } from "../../types";
import { Figure } from "./Figure";
import { FlowDiagram } from "./FlowDiagram";
import { FlowPulse } from "./FlowPulse";
import { ApiDiagram } from "./ApiDiagram";
import { N8nDiagram } from "./N8nDiagram";
import { DevOpsDiagram } from "./DevOpsDiagram";
import { MlDiagram } from "./MlDiagram";
import { CybersecurityDiagram } from "./CybersecurityDiagram";
import { InformatiqueDiagram } from "./InformatiqueDiagram";
import { ExplorePaths } from "./ExplorePaths";
import { BranchBanner } from "./BranchBanner";

/** Illustration dédiée associée à une compétence ou une branche. */
export const SKILL_ILLUSTRATIONS: Record<SkillIllustration, ComponentType> = {
  api: ApiDiagram,
  n8n: N8nDiagram,
  devops: DevOpsDiagram,
  ml: MlDiagram,
  cybersecurity: CybersecurityDiagram,
  informatique: InformatiqueDiagram,
};

export {
  Figure,
  FlowDiagram,
  FlowPulse,
  ApiDiagram,
  N8nDiagram,
  DevOpsDiagram,
  MlDiagram,
  CybersecurityDiagram,
  InformatiqueDiagram,
  ExplorePaths,
  BranchBanner,
};

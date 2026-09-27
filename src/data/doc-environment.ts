import type { Skill } from "../types";
import type { SkillGuide } from "./skill-guides";

/**
 * Section « Environnement » de la page documentation.
 * Si le guide rédigé contient une section `environment`, elle est utilisée.
 * Sinon, une checklist d'installation honnête est générée selon le type
 * de nœud — générique mais exacte, sans invention d'outil spécifique.
 */
export function getEnvironment(skill: Skill, guide?: SkillGuide): string[] {
  if (guide?.environment && guide.environment.length > 0) {
    return guide.environment;
  }
  const name = skill.name;
  switch (skill.type ?? "concept") {
    case "language":
      return [
        `Installer l'outillage officiel de ${name} depuis le site de l'éditeur (compilateur ou interpréteur).`,
        "Choisir un éditeur de code (VS Code recommandé) et installer l'extension officielle du langage.",
        "Écrire un premier programme minimal et l'exécuter en local.",
        "Apprendre à lire les messages d'erreur du compilateur / de l'interpréteur : c'est 50 % du travail.",
      ];
    case "framework":
      return [
        "Installer d'abord le langage / runtime parent s'il n'est pas présent.",
        "Créer un projet avec l'outil officiel (CLI ou générateur) plutôt qu'à la main.",
        "Lancer le serveur de développement et ouvrir la page d'accueil générée.",
        "Explorer la structure des dossiers créée : comprendre où vit chaque responsabilité.",
      ];
    case "tool":
      return [
        `Installer ${name} via le gestionnaire de paquets du système ou le site officiel.`,
        "Vérifier l'installation en ligne de commande (version, aide).",
        "Configurer l'intégration à l'éditeur si elle existe.",
        "Automatiser une première tâche réelle, même minuscule, avant d'aller plus loin.",
      ];
    case "platform":
      return [
        "Créer un compte sur la plateforme (offre gratuite suffisante pour apprendre).",
        "Suivre le guide de démarrage officiel : premier déploiement / premier projet.",
        "Comprendre le modèle de facturation pour ne jamais avoir de surprise.",
        "Stocker les clés d'accès hors du code (variables d'environnement).",
      ];
    case "specialization":
      return [
        "Consolider les prérequis listés ci-dessous avant de plonger dans la spécialisation.",
        "Se doter d'un jeu de données ou d'un cas d'étude réel pour pratiquer.",
        "Choisir un outil de référence du domaine et maîtriser son flux de base.",
        "Documenter chaque expérience : la spécialisation se prouve par des cas concrets.",
      ];
    case "concept":
    default:
      return [
        "Aucune installation requise : ce concept se comprend en lisant et se maîtrise en pratiquant.",
        "Prendre des notes avec ses propres mots après chaque sous-notion.",
        "Relier le concept à un outil ou un langage déjà connu.",
        "Valider la compréhension en l'expliquant à voix haute, sans notes.",
      ];
  }
}

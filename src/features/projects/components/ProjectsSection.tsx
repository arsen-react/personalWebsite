import { sectionLabel } from "@/config/navigation";
import { projects } from "@/content/profile";
import { ExternalLink } from "@/shared/ui/atoms";
import { SectionHeading } from "@/shared/ui/molecules";
import { EntryCard } from "@/shared/ui/organisms";
import { Section } from "@/shared/ui/templates";
import styles from "./ProjectsSection.module.css";

export function ProjectsSection() {
  return (
    <Section id="projects">
      <SectionHeading label={sectionLabel("projects")}>
        Built on <em>the side</em>
      </SectionHeading>

      <div className={styles.projects}>
        {projects.map((project) => (
          <EntryCard
            key={project.name}
            className="reveal"
            title={<ExternalLink href={project.href}>{project.name}</ExternalLink>}
            subtitle={project.stack}
            badge={{ label: "View on GitHub ↗", href: project.href }}
            items={project.highlights}
          />
        ))}
      </div>
    </Section>
  );
}

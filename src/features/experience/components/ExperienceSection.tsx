import { sectionLabel } from "@/config/navigation";
import { experience } from "@/content/profile";
import { SectionHeading } from "@/shared/ui/molecules";
import { EntryCard } from "@/shared/ui/organisms";
import { Section } from "@/shared/ui/templates";
import styles from "./ExperienceSection.module.css";

export function ExperienceSection() {
  return (
    <Section id="experience" tone="tinted">
      <SectionHeading label={sectionLabel("experience")}>
        Where I&apos;ve <em>built</em>
      </SectionHeading>

      <div className={styles.jobs}>
        {experience.map((job) => (
          <EntryCard
            key={`${job.company}-${job.period}`}
            className="reveal"
            title={job.company}
            subtitle={`${job.location} — ${job.role}`}
            badge={{ label: job.period }}
            items={job.highlights}
          />
        ))}
      </div>
    </Section>
  );
}

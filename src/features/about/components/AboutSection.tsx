import { sectionLabel } from "@/config/navigation";
import { about } from "@/content/profile";
import { cn } from "@/shared/lib/cn";
import { SectionHeading, StatCard } from "@/shared/ui/molecules";
import { Section } from "@/shared/ui/templates";
import styles from "./AboutSection.module.css";

export function AboutSection() {
  return (
    <Section id="about">
      <SectionHeading label={sectionLabel("about")}>
        Building systems
        <br />
        that <em>scale</em>
      </SectionHeading>

      <div className={styles.grid}>
        <div className={cn(styles.text, "reveal")}>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className={cn(styles.stats, "reveal-stagger")}>
          {about.stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </Section>
  );
}

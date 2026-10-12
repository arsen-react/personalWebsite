import { sectionLabel } from "@/config/navigation";
import { education, languages } from "@/content/profile";
import { cn } from "@/shared/lib/cn";
import { LanguageItem, SectionHeading } from "@/shared/ui/molecules";
import { Timeline } from "@/shared/ui/organisms";
import { Section } from "@/shared/ui/templates";
import styles from "./EducationSection.module.css";

export function EducationSection() {
  const schools = education.map(({ period, school, detail }) => ({
    period,
    title: school,
    subtitle: detail,
  }));

  return (
    <Section id="education">
      <SectionHeading label={sectionLabel("education", "Education & Languages")}>
        Background &amp; <em>foundations</em>
      </SectionHeading>

      <div className={styles.grid}>
        <Timeline className="reveal-stagger" items={schools} />

        <div className={cn(styles.languages, "reveal-stagger")}>
          {languages.map((language) => (
            <LanguageItem key={language.name} {...language} />
          ))}
        </div>
      </div>
    </Section>
  );
}

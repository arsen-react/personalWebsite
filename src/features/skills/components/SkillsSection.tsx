import { sectionLabel } from "@/config/navigation";
import { skills, softSkills } from "@/content/profile";
import { cn } from "@/shared/lib/cn";
import { SectionHeading, SkillCard } from "@/shared/ui/molecules";
import { Marquee } from "@/shared/ui/organisms";
import { Section } from "@/shared/ui/templates";
import styles from "./SkillsSection.module.css";

export function SkillsSection() {
  return (
    <Section id="skills">
      <SectionHeading label={sectionLabel("skills", "Expertise")}>
        Tools of <em>the craft</em>
      </SectionHeading>

      <div className={cn(styles.grid, "reveal-stagger")}>
        {skills.map((group) => (
          <SkillCard key={group.title} {...group} />
        ))}
      </div>

      <Marquee items={softSkills} label="Soft skills" />
    </Section>
  );
}

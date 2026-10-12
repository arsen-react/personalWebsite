import { sectionLabel } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/shared/lib/cn";
import { mailHref, telHref } from "@/shared/lib/links";
import { ContactPill, SectionHeading } from "@/shared/ui/molecules";
import { Section } from "@/shared/ui/templates";
import styles from "./ContactSection.module.css";

export function ContactSection() {
  const { email, phone, github, linkedin } = siteConfig.contact;

  return (
    <Section id="contact" width="narrow" align="center">
      <SectionHeading label={sectionLabel("contact")} align="center" variant="display">
        Let&apos;s build
        <br />
        something <em>great</em>
      </SectionHeading>

      <p className={cn(styles.subtitle, "reveal")}>
        Currently open to new opportunities and interesting projects. Let&apos;s talk.
      </p>

      <div className={cn(styles.links, "reveal-stagger")}>
        <ContactPill href={mailHref(email)} icon="mail">
          {email}
        </ContactPill>
        <ContactPill href={telHref(phone)} icon="phone">
          {phone}
        </ContactPill>
        <ContactPill href={github} icon="github">
          GitHub
        </ContactPill>
        <ContactPill href={linkedin} icon="linkedin">
          LinkedIn
        </ContactPill>
      </div>
    </Section>
  );
}

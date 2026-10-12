import { sections } from "@/config/navigation";
import { fullName, siteConfig } from "@/config/site";
import { AboutSection } from "@/features/about";
import { ContactSection } from "@/features/contact";
import { EducationSection } from "@/features/education";
import { ExperienceSection } from "@/features/experience";
import { HeroSection } from "@/features/hero";
import { SiteHeader } from "@/features/navigation";
import { ProjectsSection } from "@/features/projects";
import { SkillsSection } from "@/features/skills";
import { ThemeToggle } from "@/features/theme";
import { Footer } from "@/shared/ui/organisms";
import { PageLayout } from "@/shared/ui/templates";

/** Composition root: wires the features into the page layout. Sections follow the nav order. */
export default function HomePage() {
  return (
    <PageLayout
      header={<SiteHeader brand={siteConfig.brand} items={sections} actions={<ThemeToggle />} />}
      footer={<Footer name={fullName} city={siteConfig.person.city} />}
    >
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
    </PageLayout>
  );
}

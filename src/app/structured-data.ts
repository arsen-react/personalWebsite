import { fullName, siteConfig } from "@/config/site";
import { education, skills } from "@/content/profile";

/** schema.org Person data, so search engines can show a knowledge panel for the site owner. */
export function personStructuredData() {
  const { person, contact, url } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: fullName,
    jobTitle: person.role,
    url,
    email: `mailto:${contact.email}`,
    address: { "@type": "PostalAddress", addressLocality: person.city, addressCountry: "AM" },
    worksFor: { "@type": "Organization", name: person.employer },
    alumniOf: education.slice(0, 1).map((item) => ({
      "@type": "CollegeOrUniversity",
      name: item.school,
    })),
    knowsAbout: [...new Set(skills.flatMap((group) => group.tags))],
    sameAs: [contact.github, contact.linkedin],
  };
}

/** Serialises JSON for an inline <script>, escaping "<" so the data cannot close the tag. */
export function toJsonScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

/**
 * The eyebrow label above a section heading, numbered by the section's place in the
 * navigation: sectionLabel("skills", "Expertise") -> "04 — Expertise".
 */
export function sectionLabel(id: SectionId, title?: string): string {
  const index = sections.findIndex((section) => section.id === id);
  const number = String(index + 1).padStart(2, "0");
  return `${number} — ${title ?? sections[index].label}`;
}

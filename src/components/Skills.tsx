import { SectionHeading } from "@/components/SectionHeading";
import { profile } from "@/content/profile";

export function Skills() {
  // The marquee scrolls a doubled list so the loop is seamless.
  const marqueeItems = [...profile.softSkills, ...profile.softSkills];

  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeading label="04 — Expertise">
          Tools of <em>the craft</em>
        </SectionHeading>

        <div className="skills-grid reveal-stagger">
          {profile.skills.map((skill) => (
            <div className="skill-card" key={skill.title}>
              <div className="skill-icon" aria-hidden="true">
                {skill.icon}
              </div>
              <h3>{skill.title}</h3>
              <div className="skill-tags">
                {skill.tags.map((tag) => (
                  <span className="skill-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="soft-skills-strip" aria-label="Soft skills">
          <div className="marquee-track">
            {marqueeItems.map((item, index) => (
              <span
                className="marquee-item"
                key={`${item}-${index}`}
                aria-hidden={index >= profile.softSkills.length}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

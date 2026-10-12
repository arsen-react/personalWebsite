import { SectionHeading } from "@/components/SectionHeading";
import { profile } from "@/content/profile";

export function Education() {
  return (
    <section className="section" id="education">
      <div className="container">
        <SectionHeading label="05 — Education & Languages">
          Background &amp; <em>foundations</em>
        </SectionHeading>

        <div className="edu-lang-grid">
          <div className="timeline reveal-stagger">
            {profile.education.map((item) => (
              <div className="timeline-item" key={item.school}>
                <div className="timeline-date">{item.period}</div>
                <div className="timeline-title">{item.school}</div>
                <div className="timeline-subtitle">{item.detail}</div>
              </div>
            ))}
          </div>

          <div className="lang-list reveal-stagger">
            {profile.languages.map((language) => (
              <div className="lang-item" key={language.name}>
                <span className="lang-name">{language.name}</span>
                <span className="lang-level">{language.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

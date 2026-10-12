import { SectionHeading } from "@/components/SectionHeading";
import { profile } from "@/content/profile";

export function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHeading label="01 — About">
          Building systems
          <br />
          that <em>scale</em>
        </SectionHeading>

        <div className="about-grid">
          <div className="about-text reveal">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="about-stats reveal-stagger">
            {profile.stats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <div className="stat-number">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

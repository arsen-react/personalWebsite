import { SectionHeading } from "@/components/SectionHeading";
import { profile } from "@/content/profile";

export function Experience() {
  return (
    <section className="section experience-section" id="experience">
      <div className="container">
        <SectionHeading label="02 — Experience">
          Where I&apos;ve <em>built</em>
        </SectionHeading>

        {profile.experience.map((job) => (
          <article className="exp-card reveal" key={job.company}>
            <div className="exp-header">
              <div className="exp-company">
                {job.company}
                <span>
                  {job.location} — {job.role}
                </span>
              </div>
              <span className="exp-date">{job.period}</span>
            </div>

            <ul className="exp-items">
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

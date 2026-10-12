import { SectionHeading } from "@/components/SectionHeading";
import { profile } from "@/content/profile";

export function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHeading label="03 — Projects">
          Built on <em>the side</em>
        </SectionHeading>

        {profile.projects.map((project) => (
          <article className="exp-card reveal" key={project.name}>
            <div className="exp-header">
              <div className="exp-company">
                <a href={project.href} target="_blank" rel="noopener noreferrer">
                  {project.name}
                </a>
                <span>{project.stack}</span>
              </div>
              <a className="exp-date" href={project.href} target="_blank" rel="noopener noreferrer">
                View on GitHub ↗
              </a>
            </div>

            <ul className="exp-items">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

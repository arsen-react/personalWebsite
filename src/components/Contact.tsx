import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "@/components/icons";
import { phoneHref, profile } from "@/content/profile";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export function Contact() {
  const { email, phone, github, linkedin } = profile.contact;

  return (
    <section className="section contact-section" id="contact">
      <div className="container-narrow">
        <div className="reveal">
          <span className="section-label" style={{ justifyContent: "center" }}>
            06 — Contact
          </span>
          <h2 className="contact-title">
            Let&apos;s build
            <br />
            something <em>great</em>
          </h2>
          <p className="contact-subtitle">
            Currently open to new opportunities and interesting projects. Let&apos;s talk.
          </p>
        </div>

        <div className="contact-links reveal-stagger">
          <a href={`mailto:${email}`} className="contact-pill">
            <MailIcon />
            {email}
          </a>
          <a href={phoneHref(phone)} className="contact-pill">
            <PhoneIcon />
            {phone}
          </a>
          <a href={github} className="contact-pill" {...external}>
            <GitHubIcon />
            GitHub
          </a>
          <a href={linkedin} className="contact-pill" {...external}>
            <LinkedInIcon />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

import { location, siteConfig } from "@/config/site";
import { tagline } from "@/content/profile";
import { Button, Icon } from "@/shared/ui/atoms";
import { CodeSample } from "./CodeSample";
import { HeroCanvas } from "./HeroCanvas";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  const { firstName, lastName, role } = siteConfig.person;

  return (
    <section className={styles.hero} id="hero" aria-labelledby="hero-title">
      <div className={styles.canvasWrap} aria-hidden="true">
        <HeroCanvas />
      </div>

      <div className={styles.content}>
        <div className={styles.textCol}>
          <p className={styles.eyebrow}>
            {role} — {location}
          </p>

          <h1 className={styles.name} id="hero-title">
            <span className={styles.nameLine}>
              <span className={styles.lineInner}>{firstName}</span>
            </span>
            <span className={styles.nameLine}>
              <span className={styles.lineInner}>
                <em>{lastName}</em>
              </span>
            </span>
          </h1>

          <p className={styles.tagline}>{tagline}</p>

          <div className={styles.actions}>
            <Button href="#contact">
              Get in Touch
              <Icon name="arrowRight" size={14} strokeWidth={2} />
            </Button>
            <Button href="#experience" variant="ghost">
              View Experience
            </Button>
          </div>
        </div>

        <div className={styles.visualCol} aria-hidden="true">
          <CodeSample className={styles.codeSample} />
        </div>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <div className={styles.scrollLine} />
        <span className={styles.scrollText}>Scroll</span>
      </div>
    </section>
  );
}

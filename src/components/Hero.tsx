import { HeroCanvas } from "@/components/HeroCanvas";
import { ArrowRightIcon } from "@/components/icons";
import { profile } from "@/content/profile";

export function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-canvas-wrap" aria-hidden="true">
        <HeroCanvas />
      </div>

      <div className="hero-content">
        <div className="hero-text-col">
          <p className="hero-eyebrow">
            {profile.role} — {profile.location}
          </p>

          <h1 className="hero-name">
            <span className="hero-name-line">
              <span className="hero-line-inner">{profile.firstName}</span>
            </span>
            <span className="hero-name-line">
              <span className="hero-line-inner">
                <em>{profile.lastName}</em>
              </span>
            </span>
          </h1>

          <p className="hero-tagline">{profile.tagline}</p>

          <div className="hero-cta-group">
            <a href="#contact" className="btn-primary">
              Get in Touch
              <ArrowRightIcon />
            </a>
            <a href="#experience" className="btn-ghost">
              View Experience
            </a>
          </div>
        </div>

        {/* The block uses white-space: pre, so the newlines and indents below are what shows. */}
        <div className="hero-visual-col">
          <div className="hero-code-block">
            <span className="code-comment">{"// architecture.ts"}</span>
            {"\n"}
            <span className="code-keyword">const</span> <span className="code-fn">buildSystem</span>
            {" = () => {\n  "}
            <span className="code-keyword">return</span>
            {" {\n    framework: "}
            <span className="code-str">&quot;React&quot;</span>
            {",\n    state: "}
            <span className="code-str">&quot;Redux Toolkit&quot;</span>
            {",\n    quality: "}
            <span className="code-str">&quot;production&quot;</span>
            {",\n    scale: "}
            <span className="code-keyword">Infinity</span>
            {"\n  };\n};"}
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <div className="hero-scroll-line" />
        <span className="hero-scroll-text">Scroll</span>
      </div>
    </section>
  );
}

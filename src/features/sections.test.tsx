import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { siteConfig } from "@/config/site";
import { experience, languages, projects } from "@/content/profile";
import { telHref } from "@/shared/lib/links";
import { ContactSection } from "./contact";
import { EducationSection } from "./education";
import { ExperienceSection } from "./experience";
import { ProjectsSection } from "./projects";

describe("ExperienceSection", () => {
  it("shows each job's role, period and every highlight", () => {
    render(<ExperienceSection />);
    for (const job of experience) {
      expect(screen.getByText(`${job.location} — ${job.role}`)).toBeInTheDocument();
      expect(screen.getByText(job.period)).toBeInTheDocument();
      for (const highlight of job.highlights) {
        expect(screen.getByText(highlight)).toBeInTheDocument();
      }
    }
  });
});

describe("ProjectsSection", () => {
  it("links each project title to its repository in a new tab", () => {
    render(<ProjectsSection />);
    for (const project of projects) {
      const title = screen.getByRole("link", { name: project.name });
      expect(title).toHaveAttribute("href", project.href);
      expect(title).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
});

describe("EducationSection", () => {
  it("lists every language with its level", () => {
    render(<EducationSection />);
    for (const language of languages) {
      expect(screen.getByText(language.name)).toBeInTheDocument();
    }
    expect(screen.getAllByText("Professional")).toHaveLength(2);
  });
});

describe("ContactSection", () => {
  it("links e-mail, phone, GitHub and LinkedIn from the site config", () => {
    render(<ContactSection />);
    const { email, phone, github, linkedin } = siteConfig.contact;

    expect(screen.getByRole("link", { name: email })).toHaveAttribute("href", `mailto:${email}`);
    expect(screen.getByRole("link", { name: phone })).toHaveAttribute("href", telHref(phone));
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", github);
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", linkedin);
  });

  it("shows the phone number from the CV", () => {
    render(<ContactSection />);
    expect(screen.getByRole("link", { name: "+374 44 18 11 61" })).toBeInTheDocument();
  });
});

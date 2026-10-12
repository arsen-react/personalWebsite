import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { phoneHref, profile } from "@/content/profile";
import { Contact } from "./Contact";
import { Experience } from "./Experience";
import { Projects } from "./Projects";

describe("Experience", () => {
  it("shows each job's role and every bullet", () => {
    render(<Experience />);
    for (const job of profile.experience) {
      expect(screen.getByText(`${job.location} — ${job.role}`)).toBeInTheDocument();
      for (const bullet of job.bullets) {
        expect(screen.getByText(bullet)).toBeInTheDocument();
      }
    }
  });
});

describe("Projects", () => {
  it("links each project to its repository in a new tab", () => {
    render(<Projects />);
    for (const project of profile.projects) {
      const link = screen.getByRole("link", { name: project.name });
      expect(link).toHaveAttribute("href", project.href);
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
});

describe("Contact", () => {
  it("links e-mail, phone, GitHub and LinkedIn", () => {
    render(<Contact />);
    const { email, phone, github, linkedin } = profile.contact;

    expect(screen.getByRole("link", { name: email })).toHaveAttribute("href", `mailto:${email}`);
    expect(screen.getByRole("link", { name: phone })).toHaveAttribute("href", phoneHref(phone));
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", github);
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", linkedin);
  });

  it("builds a dialable phone link", () => {
    expect(phoneHref("+374 98 068 038")).toBe("tel:+37498068038");
  });
});

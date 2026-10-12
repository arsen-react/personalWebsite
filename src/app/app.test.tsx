import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";
import { sections } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import HomePage from "./page";
import robots from "./robots";
import sitemap from "./sitemap";
import { personStructuredData, toJsonScript } from "./structured-data";

describe("Home page", () => {
  it("renders a section for every navigation link, in the same order", () => {
    const { container } = render(<HomePage />);
    const ids = Array.from(container.querySelectorAll("main section[id]"))
      .map((section) => section.id)
      .filter((id) => id !== "hero");

    expect(ids).toEqual(sections.map((section) => section.id));
  });

  it("has exactly one h1: the owner's name", () => {
    const { container } = render(<HomePage />);
    const headings = container.querySelectorAll("h1");

    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent("ArsenMelqonyan");
  });

  it("has no accessibility violations axe can detect without a layout engine", async () => {
    const { container } = render(<HomePage />);
    const results = await axe.run(container, {
      // jsdom does not compute layout or colours, so contrast cannot be checked here.
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results.violations.map(({ id, nodes }) => `${id} (${nodes.length})`)).toEqual([]);
  });
});

describe("SEO", () => {
  it("lists the home page in the sitemap", () => {
    expect(sitemap().map((entry) => entry.url)).toEqual([siteConfig.url]);
  });

  it("allows crawling and points to the sitemap", () => {
    expect(robots()).toMatchObject({
      rules: { userAgent: "*", allow: "/" },
      sitemap: `${siteConfig.url}/sitemap.xml`,
    });
  });

  it("describes the owner as a schema.org Person with profile links", () => {
    expect(personStructuredData()).toMatchObject({
      "@type": "Person",
      name: "Arsen Melqonyan",
      url: siteConfig.url,
      sameAs: [siteConfig.contact.github, siteConfig.contact.linkedin],
    });
  });

  it("escapes < so the JSON cannot close its script tag", () => {
    expect(toJsonScript({ note: "</script>" })).toBe('{"note":"\\u003c/script>"}');
  });
});

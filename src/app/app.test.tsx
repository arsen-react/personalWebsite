import { render } from "@testing-library/react";
import axe from "axe-core";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { sections } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import RootLayout, { metadata } from "./layout";
import HomePage from "./page";
import robots from "./robots";
import sitemap from "./sitemap";
import { personStructuredData, toJsonScript } from "./structured-data";

// next/font only works inside the Next.js compiler.
vi.mock("./fonts", () => ({ fontVariables: "font-sans font-serif font-mono" }));

const renderDocument = () =>
  new DOMParser().parseFromString(
    renderToStaticMarkup(
      <RootLayout>
        <main>Page content</main>
      </RootLayout>,
    ),
    "text/html",
  );

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

  it("sets the canonical URL and the profile card used when the page is shared", () => {
    expect(String(metadata.metadataBase)).toBe(`${siteConfig.url}/`);
    expect(metadata.alternates).toEqual({ canonical: "/" });
    expect(metadata.openGraph).toMatchObject({
      type: "profile",
      url: "/",
      siteName: siteConfig.brand,
    });
    expect(metadata.robots).toEqual({ index: true, follow: true });
  });
});

describe("Root layout", () => {
  it("applies the saved theme from <head>, before the page paints", () => {
    const { documentElement: html, head } = renderDocument();

    expect(html.getAttribute("lang")).toBe("en");
    expect(html.className).toBe("font-sans font-serif font-mono");
    expect(head.querySelector("script")?.textContent).toContain("data-theme");
  });

  it("embeds the schema.org data and renders the page inside <body>", () => {
    const { body } = renderDocument();
    const jsonLd = body.querySelector('script[type="application/ld+json"]');

    expect(JSON.parse(jsonLd?.textContent ?? "null")).toEqual(personStructuredData());
    expect(body.querySelector("main")?.textContent).toBe("Page content");
  });
});

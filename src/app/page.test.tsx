import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { navSections } from "@/content/profile";
import Home from "./page";

describe("Home page", () => {
  it("renders a section for every navigation link, in the same order", () => {
    const { container } = render(<Home />);
    const sectionIds = Array.from(container.querySelectorAll("main section[id]"))
      .map((section) => section.id)
      .filter((id) => id !== "hero");

    expect(sectionIds).toEqual(navSections.map((section) => section.id));
  });

  it("renders the hero name as the only h1", () => {
    const { container } = render(<Home />);
    const headings = container.querySelectorAll("h1");

    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent("ArsenMelqonyan");
  });
});

import { describe, expect, it } from "vitest";
import { sectionLabel, sections } from "./navigation";

describe("sectionLabel", () => {
  it("numbers a section by its place in the navigation", () => {
    expect(sectionLabel("about")).toBe("01 — About");
    expect(sectionLabel("contact")).toBe(`0${sections.length} — Contact`);
  });

  it("accepts a custom title", () => {
    expect(sectionLabel("skills", "Expertise")).toBe("04 — Expertise");
  });

  it("has unique section ids", () => {
    const ids = sections.map((section) => section.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

import { describe, expect, it } from "vitest";
import { nextTheme, parseTheme, themeInitScript } from "./theme";

const runInitScript = () => new Function(themeInitScript)();

describe("theme", () => {
  it("accepts only dark or light", () => {
    expect(parseTheme("light")).toBe("light");
    expect(parseTheme("dark")).toBe("dark");
    expect(parseTheme("blue")).toBeNull();
    expect(parseTheme(null)).toBeNull();
  });

  it("treats a page with no theme as dark, so the first toggle switches to light", () => {
    expect(nextTheme(null)).toBe("light");
    expect(nextTheme("dark")).toBe("light");
    expect(nextTheme("light")).toBe("dark");
  });

  it("restores a saved theme before first paint", () => {
    localStorage.setItem("theme", "light");
    runInitScript();
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
  });

  it("ignores an invalid saved theme", () => {
    localStorage.setItem("theme", "<script>");
    runInitScript();
    expect(document.documentElement).not.toHaveAttribute("data-theme");
  });
});

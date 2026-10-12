import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ThemeScript } from "./components/ThemeScript";
import { ThemeToggle } from "./components/ThemeToggle";
import { nextTheme, parseTheme, themeInitScript } from "./lib/theme";

const runInitScript = () => new Function(themeInitScript)();

describe("theme helpers", () => {
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

  it("inlines the init script through ThemeScript", () => {
    const { container } = render(<ThemeScript />);
    expect(container.querySelector("script")?.textContent).toBe(themeInitScript);
  });
});

describe("ThemeToggle", () => {
  it("switches to light on the first click, then back to dark, and remembers the choice", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole("button", { name: "Switch to light theme" }));
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(localStorage.getItem("theme")).toBe("light");

    await user.click(await screen.findByRole("button", { name: "Switch to dark theme" }));
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });
});

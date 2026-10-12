import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { navSections } from "@/content/profile";
import { Nav } from "./Nav";

describe("Nav", () => {
  it("links to every section", () => {
    render(<Nav />);
    for (const { id, label } of navSections) {
      expect(screen.getByRole("link", { name: label })).toHaveAttribute("href", `#${id}`);
    }
  });

  it("switches to light on the first toggle, then back, and remembers the choice", async () => {
    const user = userEvent.setup();
    render(<Nav />);
    const toggle = screen.getByRole("button", { name: "Toggle dark/light theme" });

    await user.click(toggle);
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(localStorage.getItem("theme")).toBe("light");

    await user.click(toggle);
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("opens the mobile menu, locks page scroll, and closes after a link click", async () => {
    const user = userEvent.setup();
    render(<Nav />);
    const burger = screen.getByRole("button", { name: "Toggle navigation menu" });

    await user.click(burger);
    expect(burger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("list")).toHaveClass("open");
    expect(document.body.style.overflow).toBe("hidden");

    await user.click(screen.getByRole("link", { name: "Experience" }));
    expect(burger).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("list")).not.toHaveClass("open");
    expect(document.body.style.overflow).toBe("");
  });
});

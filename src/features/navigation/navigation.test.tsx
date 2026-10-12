import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "./components/SiteHeader";

const items = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const renderHeader = () =>
  render(<SiteHeader brand="arsen.dev" items={items} actions={<button>Theme</button>} />);

describe("SiteHeader", () => {
  it("shows the brand and links to every section", () => {
    renderHeader();
    expect(screen.getByText("arsen.dev")).toBeInTheDocument();
    for (const { id, label } of items) {
      expect(screen.getByRole("link", { name: label })).toHaveAttribute("href", `#${id}`);
    }
  });

  it("renders the actions slot inside the navigation", () => {
    renderHeader();
    expect(screen.getByRole("navigation")).toContainElement(
      screen.getByRole("button", { name: "Theme" }),
    );
  });

  it("opens the mobile menu, locks page scroll, and closes after a link click", async () => {
    const user = userEvent.setup();
    renderHeader();
    const menuButton = screen.getByRole("button", { name: "Toggle navigation menu" });

    await user.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(document.body.style.overflow).toBe("hidden");

    await user.click(screen.getByRole("link", { name: "Experience" }));
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(document.body.style.overflow).toBe("");
  });

  it("closes the mobile menu on Escape", async () => {
    const user = userEvent.setup();
    renderHeader();
    const menuButton = screen.getByRole("button", { name: "Toggle navigation menu" });

    await user.click(menuButton);
    await user.keyboard("{Escape}");
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("connects the menu button to the list it controls", () => {
    renderHeader();
    const menuButton = screen.getByRole("button", { name: "Toggle navigation menu" });
    const list = screen.getByRole("list");
    expect(menuButton).toHaveAttribute("aria-controls", list.id);
  });
});

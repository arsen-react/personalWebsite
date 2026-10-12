import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Badge, Button, Icon, IconButton, MenuButton, iconNames } from "./index";

describe("Button", () => {
  it("renders a link when given an href", () => {
    render(<Button href="#contact">Get in Touch</Button>);
    expect(screen.getByRole("link", { name: "Get in Touch" })).toHaveAttribute("href", "#contact");
  });

  it("renders a native button otherwise, defaulting to type=button", () => {
    const onClick = vi.fn();
    render(
      <Button variant="ghost" onClick={onClick}>
        Send
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Send" });

    expect(button).toHaveAttribute("type", "button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe("Badge", () => {
  it("is plain text without an href", () => {
    render(<Badge>2023 — Present</Badge>);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("2023 — Present")).toBeInTheDocument();
  });

  it("opens external links in a new tab", () => {
    render(<Badge href="https://github.com/arsen-react">GitHub</Badge>);
    const link = screen.getByRole("link", { name: "GitHub" });

    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("keeps in-page links in the same tab", () => {
    render(<Badge href="#contact">Contact</Badge>);
    const link = screen.getByRole("link", { name: "Contact" });

    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });
});

describe("Icon", () => {
  it.each(iconNames)("renders %s as a decorative svg by default", (name) => {
    const { container } = render(<Icon name={name} />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("is announced when it has a title", () => {
    render(<Icon name="github" title="GitHub" />);
    expect(screen.getByRole("img", { name: "GitHub" })).toBeInTheDocument();
  });
});

describe("IconButton", () => {
  it("uses its label as the accessible name", () => {
    render(
      <IconButton label="Switch to light theme">
        <Icon name="sun" />
      </IconButton>,
    );
    expect(screen.getByRole("button", { name: "Switch to light theme" })).toBeInTheDocument();
  });
});

describe("MenuButton", () => {
  it("reports whether the menu is open", () => {
    const { rerender } = render(<MenuButton open={false} />);
    const button = screen.getByRole("button", { name: "Toggle navigation menu" });
    expect(button).toHaveAttribute("aria-expanded", "false");

    rerender(<MenuButton open />);
    expect(button).toHaveAttribute("aria-expanded", "true");
  });
});

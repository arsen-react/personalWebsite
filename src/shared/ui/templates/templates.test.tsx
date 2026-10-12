import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PageLayout, Section } from "./index";

describe("Section", () => {
  it("renders a section landmark with its id and content", () => {
    const { container } = render(
      <Section id="about">
        <p>Body</p>
      </Section>,
    );
    expect(container.querySelector("section#about")).toHaveTextContent("Body");
  });
});

describe("PageLayout", () => {
  it("puts a skip link first that targets the main content", () => {
    render(
      <PageLayout header={<header>Header</header>} footer={<footer>Footer</footer>}>
        <p>Content</p>
      </PageLayout>,
    );

    const skipLink = screen.getByRole("link", { name: "Skip to content" });
    expect(skipLink).toHaveAttribute("href", "#main");
    expect(screen.getByRole("main")).toHaveAttribute("id", "main");
    expect(screen.getByRole("main")).toHaveTextContent("Content");
  });
});

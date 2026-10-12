import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BulletList, ContactPill, SectionHeading, SkillCard } from "./index";

describe("SectionHeading", () => {
  it("renders the eyebrow label and an h2 with the accent words", () => {
    render(
      <SectionHeading label="02 — Experience">
        Where I&apos;ve <em>built</em>
      </SectionHeading>,
    );

    expect(screen.getByText("02 — Experience")).toBeInTheDocument();
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Where I've built");
    expect(within(heading).getByText("built").tagName).toBe("EM");
  });
});

describe("ContactPill", () => {
  it("keeps mail links in the same tab", () => {
    render(
      <ContactPill href="mailto:arsen.front@gmail.com" icon="mail">
        arsen.front@gmail.com
      </ContactPill>,
    );
    expect(screen.getByRole("link", { name: "arsen.front@gmail.com" })).not.toHaveAttribute(
      "target",
    );
  });

  it("opens profile links in a new tab", () => {
    render(
      <ContactPill href="https://www.linkedin.com/in/arsen-melkonyan" icon="linkedin">
        LinkedIn
      </ContactPill>,
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("target", "_blank");
  });
});

describe("SkillCard", () => {
  it("renders the title as an h3 and every tag", () => {
    render(<SkillCard icon="⚙" title="State & Data" tags={["Redux Toolkit", "RTK Query"]} />);

    expect(screen.getByRole("heading", { level: 3, name: "State & Data" })).toBeInTheDocument();
    expect(screen.getByText("Redux Toolkit")).toBeInTheDocument();
    expect(screen.getByText("RTK Query")).toBeInTheDocument();
  });
});

describe("BulletList", () => {
  it("renders one list item per entry", () => {
    render(<BulletList items={["First", "Second", "Third"]} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });
});

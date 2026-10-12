import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EntryCard, Footer, Marquee, Timeline } from "./index";

describe("EntryCard", () => {
  it("shows the title, subtitle, badge and highlights", () => {
    render(
      <EntryCard
        title="PandaTech"
        subtitle="Yerevan, Armenia — Frontend Engineer"
        badge={{ label: "2023 — Present" }}
        items={["Built the payment core", "Mentored two developers"]}
      />,
    );

    expect(screen.getByRole("article")).toHaveTextContent("PandaTech");
    expect(screen.getByText("Yerevan, Armenia — Frontend Engineer")).toBeInTheDocument();
    expect(screen.getByText("2023 — Present")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("omits the badge when none is given", () => {
    render(<EntryCard title="Project" subtitle="React" items={["One"]} />);
    expect(screen.queryByText("2023 — Present")).not.toBeInTheDocument();
  });
});

describe("Marquee", () => {
  it("doubles the items for a seamless loop but hides the copy from screen readers", () => {
    const { container } = render(
      <Marquee items={["Mentoring", "Communication"]} label="Soft skills" />,
    );

    expect(screen.getByRole("group", { name: "Soft skills" })).toBeInTheDocument();
    expect(screen.getAllByText("Mentoring")).toHaveLength(2);
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2);
  });
});

describe("Timeline", () => {
  it("renders an entry per item", () => {
    render(
      <Timeline
        items={[
          { period: "2014 — 2018", title: "University", subtitle: "Bachelor's degree" },
          { period: "2003 — 2014", title: "School", subtitle: "General education" },
        ]}
      />,
    );
    expect(screen.getByText("University")).toBeInTheDocument();
    expect(screen.getByText("2003 — 2014")).toBeInTheDocument();
  });
});

describe("Footer", () => {
  it("credits the owner with the given year and city", () => {
    render(<Footer name="Arsen Melqonyan" city="Yerevan" year={2026} />);
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      "© 2026 Arsen Melqonyan. Crafted with ♥ in Yerevan.",
    );
  });
});

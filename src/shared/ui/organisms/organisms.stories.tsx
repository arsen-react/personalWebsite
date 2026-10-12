import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ExternalLink } from "@/shared/ui/atoms";
import { EntryCard, Footer, Marquee, Timeline } from "./index";

const meta = {
  title: "Organisms/Gallery",
  parameters: { controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Job: Story = {
  name: "EntryCard — job",
  render: () => (
    <EntryCard
      title="PandaTech"
      subtitle="Yerevan, Armenia — Frontend Engineer"
      badge={{ label: "2023 — Present" }}
      items={[
        "Main frontend engineer on two fintech admin consoles",
        "Designed a drag-and-drop editor for terminal payment menus",
        "Built account security and role-based access control",
        "Mentored two developers and run most releases for two products",
      ]}
    />
  ),
};

export const Project: Story = {
  name: "EntryCard — project",
  render: () => (
    <EntryCard
      title={
        <ExternalLink href="https://github.com/arsen-react/CryptoLiveDash">
          CryptoLiveDash
        </ExternalLink>
      }
      subtitle="React 19 · TypeScript · RTK Query · WebSocket"
      badge={{ label: "View on GitHub ↗", href: "https://github.com/arsen-react/CryptoLiveDash" }}
      items={["Real-time crypto dashboard with live Binance data", "83 Vitest tests"]}
    />
  ),
};

export const SoftSkills: Story = {
  name: "Marquee",
  render: () => (
    <Marquee
      label="Soft skills"
      items={["Mentoring", "Team Collaboration", "Problem-Solving", "Communication"]}
    />
  ),
};

export const Education: Story = {
  name: "Timeline",
  render: () => (
    <Timeline
      items={[
        {
          period: "2014 — 2018",
          title: "University",
          subtitle: "Information and Computer Science",
        },
        { period: "2003 — 2014", title: "Shavarsh Simonyan School", subtitle: "General Education" },
      ]}
    />
  ),
};

export const PageFooter: Story = {
  name: "Footer",
  render: () => <Footer name="Arsen Melqonyan" city="Yerevan" year={2026} />,
};

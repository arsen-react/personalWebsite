import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  BulletList,
  ContactPill,
  LanguageItem,
  Logo,
  SectionHeading,
  SkillCard,
  StatCard,
  TimelineItem,
} from "./index";

const meta = {
  title: "Molecules/Gallery",
  parameters: { controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading: Story = {
  name: "SectionHeading",
  render: () => (
    <SectionHeading label="02 — Experience">
      Where I&apos;ve <em>built</em>
    </SectionHeading>
  ),
};

export const Brand: Story = {
  name: "Logo",
  render: () => <Logo brand="arsen.dev" />,
};

export const Stats: Story = {
  name: "StatCard",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 240px)", gap: 24 }}>
      <StatCard value="4,200+" label="Payment Terminals" />
      <StatCard value="React" label="Core Specialization" />
    </div>
  ),
};

export const Skill: Story = {
  name: "SkillCard",
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <SkillCard
        icon="⚙"
        title="State & Data"
        tags={["Redux Toolkit", "RTK Query", "TanStack Query"]}
      />
    </div>
  ),
};

export const Contacts: Story = {
  name: "ContactPill",
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <ContactPill href="mailto:arsen.front@gmail.com" icon="mail">
        arsen.front@gmail.com
      </ContactPill>
      <ContactPill href="https://github.com/arsen-react" icon="github">
        GitHub
      </ContactPill>
    </div>
  ),
};

export const TimelineEntry: Story = {
  name: "TimelineItem",
  render: () => (
    <div style={{ paddingLeft: 32 }}>
      <TimelineItem
        period="2014 — 2018"
        title="National University of Architecture and Construction of Armenia"
        subtitle="Bachelor's Degree in Information and Computer Science"
      />
    </div>
  ),
};

export const Language: Story = {
  name: "LanguageItem",
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <LanguageItem name="English" level="Professional" />
    </div>
  ),
};

export const Bullets: Story = {
  name: "BulletList",
  render: () => (
    <BulletList
      items={[
        "Built payment and sales workflows end to end",
        "Designed a drag-and-drop editor for terminal menus",
        "Co-developed the shared data grid behind 69 screens",
      ]}
    />
  ),
};

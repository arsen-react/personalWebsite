import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Badge, Eyebrow, Heading, Icon, IconButton, MenuButton, PulseDot, Tag } from "./index";

/** The smaller atoms, one story each. Button and Icon have their own files. */
const meta = {
  title: "Atoms/Gallery",
  parameters: { controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const EyebrowLabel: Story = {
  name: "Eyebrow",
  render: () => <Eyebrow>02 — Experience</Eyebrow>,
};

export const Headings: Story = {
  render: () => (
    <>
      <Heading>
        Where I&apos;ve <em>built</em>
      </Heading>
      <Heading variant="display">
        Let&apos;s build something <em>great</em>
      </Heading>
    </>
  ),
};

export const TagsAndBadges: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Tag>Redux Toolkit</Tag>
      <Tag>RTK Query</Tag>
      <Badge>2023 — Present</Badge>
      <Badge href="https://github.com/arsen-react">View on GitHub ↗</Badge>
    </div>
  ),
};

export const IconButtons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <IconButton label="Switch to light theme">
        <Icon name="sun" />
      </IconButton>
      <IconButton label="Switch to dark theme">
        <Icon name="moon" />
      </IconButton>
    </div>
  ),
};

function MenuButtonDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: "grid", gap: 8 }}>
      {/* Hidden above 768px by its own CSS; resize the canvas to see it. */}
      <MenuButton open={open} onClick={() => setOpen((value) => !value)} />
      <small style={{ color: "var(--text-tertiary)" }}>
        Visible below 768px · open: {String(open)}
      </small>
    </div>
  );
}

export const MenuToggle: Story = {
  name: "MenuButton",
  render: () => <MenuButtonDemo />,
  globals: { viewport: { value: "mobile1" } },
};

export const Dot: Story = {
  name: "PulseDot",
  render: () => <PulseDot />,
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Icon, iconNames } from "./Icon";

const meta = {
  title: "Atoms/Icon",
  component: Icon,
  args: { name: "github", size: 24 },
  argTypes: { name: { control: "select", options: iconNames } },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {};

export const Gallery: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 24, color: "var(--text-secondary)" }}>
      {iconNames.map((name) => (
        <figure key={name} style={{ display: "grid", justifyItems: "center", gap: 8 }}>
          <Icon {...args} name={name} />
          <figcaption style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>{name}</figcaption>
        </figure>
      ))}
    </div>
  ),
};

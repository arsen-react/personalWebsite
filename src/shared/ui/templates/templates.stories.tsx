import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionHeading, StatCard } from "@/shared/ui/molecules";
import { Section } from "./index";

const meta = {
  title: "Templates/Section",
  component: Section,
  args: { id: "demo", width: "default", tone: "plain", align: "start", children: null },
  argTypes: {
    width: { control: "inline-radio", options: ["default", "narrow"] },
    tone: { control: "inline-radio", options: ["plain", "tinted"] },
    align: { control: "inline-radio", options: ["start", "center"] },
  },
  render: (args) => (
    <Section {...args}>
      <SectionHeading label="01 — About" align={args.align}>
        Building systems that <em>scale</em>
      </SectionHeading>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
        <StatCard value="3+" label="Years Experience" />
        <StatCard value="Fintech" label="Industry Focus" />
      </div>
    </Section>
  ),
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TintedNarrowCentered: Story = {
  args: { tone: "tinted", width: "narrow", align: "center" },
};

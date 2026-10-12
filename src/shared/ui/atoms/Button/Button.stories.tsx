import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Icon } from "../Icon/Icon";
import { Button } from "./Button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  args: { href: "#contact", children: "Get in Touch", variant: "primary" },
  argTypes: { variant: { control: "inline-radio", options: ["primary", "ghost"] } },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Ghost: Story = { args: { variant: "ghost", children: "View Experience" } };

export const WithIcon: Story = {
  args: {
    children: (
      <>
        Get in Touch
        <Icon name="arrowRight" size={14} strokeWidth={2} />
      </>
    ),
  },
};

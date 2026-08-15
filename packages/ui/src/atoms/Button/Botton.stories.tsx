import { Button } from ".";
import { type Meta, type StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Button",
  component: Button,
  args: {
    children: "Login",
    variant: "default",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Loading: Story = {
  args: {
    children: "Loading...",
  },
};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

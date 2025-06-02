import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import "../../globals.css";
import { Header } from "@/components/ui/layout/header";

const meta: Meta = {
  title: "Layout/Header",
  component: Header,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    companyName: { type: "string", defaultValue: "Name" },
    companyLogo: { type: "string", defaultValue: undefined },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const navigationItems = [
  { name: "Home", href: "#", selected: true },
  { name: "About", href: "#", selected: false },
  { name: "Services", href: "#", selected: false },
  { name: "Contact", href: "#", selected: false },
];

export const WithNavigation: Story = {
  args: {
    navigation: navigationItems,
  },
};
export const WithNavigationAndCompany: Story = {
  args: {
    navigation: navigationItems,
    companyName: "ACME Corp",
  },
};

export const WithNavigationAndImage: Story = {
  args: {
    navigation: navigationItems,
    companyLogo: "/public/duck.png",
  },
};

export const WithNavigationAndImageAndCompany: Story = {
  args: {
    navigation: navigationItems,
    companyName: "ACME Corp",
    companyLogo: "/public/duck.png",
  },
};

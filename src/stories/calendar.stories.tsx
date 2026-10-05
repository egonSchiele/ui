import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDemo, CalendarRangeDemo } from "./CalendarDemo";
import "../../globals.css";

const meta = {
  title: "UI/Calendar",
  component: Calendar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <CalendarDemo /> };

export const DateRange: Story = { render: () => <CalendarRangeDemo /> };

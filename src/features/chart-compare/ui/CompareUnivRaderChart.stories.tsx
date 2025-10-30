import type { Meta, StoryObj } from "@storybook/react-vite";

import type { University } from "@/entities/university/model/university-compare.domain";

import { CompareUnivRaderChart } from "./CompareUnivRaderChart";

const meta: Meta<typeof CompareUnivRaderChart> = {
  title: "Charts/CompareUnivRaderChart",
  component: CompareUnivRaderChart,
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<typeof CompareUnivRaderChart>;

const U1: University = {
  id: 1,
  name: "Alpha University",
  address: "-",
  tel: "-",
  rating: 4.2,
  food: 4.2,
  dorm: 3.8,
  campus: 4.5,
  conv: 4.0,
  welfare: 3.6,
};

const U2: University = {
  id: 2,
  name: "Beta University",
  address: "-",
  tel: "-",
  rating: 4.0,
  food: 3.7,
  dorm: 4.3,
  campus: 3.9,
  conv: 3.5,
  welfare: 4.1,
};

export const Default: Story = {
  args: { universities: [U1, U2] },
};

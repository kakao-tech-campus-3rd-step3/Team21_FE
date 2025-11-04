import type { Meta, StoryObj } from "@storybook/react-vite";

import type { University } from "@/entities/university/model/university-compare.domain";

import { CompareUnivBarChart } from "./CompareUnivBarChart";

const meta: Meta<typeof CompareUnivBarChart> = {
  title: "Features/CompareUnivBarChart",
  component: CompareUnivBarChart,
  decorators: [
    (S) => (
      <div
        style={{
          width: 900,
          maxWidth: "95vw",
          height: 420,
          margin: "40px auto",
          background: "#0b0f1a",
        }}
      >
        <S />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof CompareUnivBarChart>;

const universities: Array<Partial<University>> = [
  { id: 1, name: "충남대학교", address: "대전", tel: "042-000-0000", rating: 4.2 },
  { id: 2, name: "부산대학교", address: "부산", tel: "051-000-0000", rating: 4.0 },
];

const rows: Array<{ year: string; u1: number; u2: number }> = [
  { year: "2019", u1: 1200, u2: 900 },
  { year: "2020", u1: 1350, u2: 1100 },
  { year: "2021", u1: 1500, u2: 1400 },
  { year: "2022", u1: 1600, u2: 1550 },
  { year: "2023", u1: 1700, u2: 1650 },
];

export const OneUniversity: Story = {
  args: {
    universities: universities as unknown as University[],
    rows: rows.map((r) => ({ year: r.year, u1: r.u1 })) as Array<{ year: string; u1: number }>,
  },
};

export const TwoUniversities: Story = {
  args: {
    universities: universities as unknown as University[],
    rows,
  },
};

export const TightContainer: Story = {
  args: {
    universities: universities as unknown as University[],
    rows,
  },
  decorators: [
    (S) => (
      <div
        style={{
          width: 420,
          height: 360,
          margin: "0 auto",
          background: "#0b0f1a",
          padding: 16,
        }}
      >
        <S />
      </div>
    ),
  ],
};

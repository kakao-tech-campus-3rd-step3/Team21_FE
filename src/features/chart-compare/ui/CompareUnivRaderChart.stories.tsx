import type { Meta, StoryObj } from "@storybook/react-vite";

import type { University } from "@/entities/university/model/university";

import { CompareUnivRaderChart } from "./CompareUnivRaderChart";

const makeUniv = (
  id: number,
  name: string,
  scores?: Partial<Pick<University, "food" | "dorm" | "campus" | "conv" | "welfare">>,
) =>
  ({
    id,
    name,
    food: 3,
    dorm: 3,
    campus: 3,
    conv: 3,
    welfare: 3,
    ...scores,
  }) as unknown as University;

const meta: Meta<typeof CompareUnivRaderChart> = {
  title: "Features/ChartCompare/CompareUnivRaderChart",
  id: "features-chartcompare-compareunivraderchart",
  component: CompareUnivRaderChart,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark" },
    docs: {
      description: {
        component:
          "두 대학의 생활/캠퍼스 지표를 레이더 차트로 비교 점수 범위는 0~5로, 이름은 범례/툴팁에 사용",
      },
    },
  },
  args: {
    universities: [
      makeUniv(1, "충남대학교", { food: 4.5, dorm: 4, campus: 3.5, conv: 4, welfare: 4 }),
      makeUniv(2, "경북대학교", { food: 3.5, dorm: 3, campus: 4.5, conv: 3, welfare: 3.5 }),
    ],
  },
  decorators: [
    (Story) => (
      <div
        id="a11y-root"
        className="w-[520px] h-[520px] max-w-[92vw] rounded-lg bg-black text-white p-3"
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CompareUnivRaderChart>;

export const Playground: Story = {};
Playground.parameters = {
  backgrounds: { disable: true },
  a11y: {
    context: {
      include: [["#a11y-root"]],
      exclude: [["#a11y-root svg text"], ["#a11y-root svg tspan"]],
    },
  },
};

export const SingleUniversity: Story = {
  args: {
    universities: [makeUniv(1, "충남대학교", { food: 4, dorm: 4, campus: 3, conv: 5, welfare: 4 })],
  },
  parameters: Playground.parameters,
};

export const EmptyUniversities: Story = {
  args: { universities: [] },
  parameters: Playground.parameters,
};

export const LongNames: Story = {
  args: {
    universities: [
      makeUniv(1, "국립충남대학교-대전광역시유성구대학로-미래융합캠퍼스-아주매우긴이름테스트", {
        food: 5,
        dorm: 4,
        campus: 3,
        conv: 5,
        welfare: 4,
      }),
      makeUniv(2, "경북대학교-글로벌캠퍼스-초지능·초연결·초융합연구단-엄청긴이름테스트", {
        food: 3,
        dorm: 3,
        campus: 4,
        conv: 2,
        welfare: 3,
      }),
    ],
  },
  parameters: Playground.parameters,
};

export const EdgeValues: Story = {
  args: {
    universities: [
      makeUniv(1, "All Max (5)", { food: 5, dorm: 5, campus: 5, conv: 5, welfare: 5 }),
      makeUniv(2, "All Min (0)", { food: 0, dorm: 0, campus: 0, conv: 0, welfare: 0 }),
    ],
  },
  parameters: Playground.parameters,
};

export const NarrowContainer: Story = {
  decorators: [
    (Story) => (
      <div
        id="a11y-root"
        className="w-[360px] h-[360px] max-w-[92vw] rounded-lg bg-black text-white p-2"
      >
        <Story />
      </div>
    ),
  ],
  parameters: Playground.parameters,
};

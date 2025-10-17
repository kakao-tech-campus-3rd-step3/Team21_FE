/*
import type { Meta, StoryObj } from "@storybook/react-vite";

import type { University } from "@/entities/university/model/university";

import { CompareUnivBarChart } from "./CompareUnivBarChart";

const makeUniv = (name: string) => ({ name }) as unknown as University;

const meta: Meta<typeof CompareUnivBarChart> = {
  title: "Features/ChartCompare/CompareUnivBarChart",
  component: CompareUnivBarChart,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark" },
    docs: {
      description: {
        component:
          "두 대학의 연도별 지표를 세로 스택형 막대(bar)로 비교하는 차트 universities 배열의 앞 1~2개의 이름을 범례/툴팁 라벨로 사용, 내부 데이터는 `univChartData`를 사용",
      },
    },
  },
  args: {
    universities: [makeUniv("충남대학교"), makeUniv("경북대학교")],
  },
  decorators: [
    (Story) => (
      <div
        id="a11y-root"
        className="w-[860px] h-[360px] max-w-[92vw] rounded-lg bg-black text-white p-4"
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CompareUnivBarChart>;

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
  args: { universities: [makeUniv("충남대학교")] },
  parameters: Playground.parameters,
};

export const EmptyUniversities: Story = {
  args: { universities: [] },
  parameters: Playground.parameters,
};

export const LongNames: Story = {
  args: {
    universities: [
      makeUniv("국립충남대학교-대전광역시유성구대학로-미래융합캠퍼스-매우매우긴대학명테스트"),
      makeUniv("경북대학교-글로벌캠퍼스-초지능·초연결·초융합연구단-엄청긴이름테스트"),
    ],
  },
  parameters: Playground.parameters,
};

export const NarrowContainer: Story = {
  decorators: [
    (Story) => (
      <div
        id="a11y-root"
        className="w-[420px] h-[300px] max-w-[92vw] rounded-lg bg-black text-white p-4"
      >
        <Story />
      </div>
    ),
  ],
  parameters: Playground.parameters,
};*/

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: "Disabled/CompareUnivBarChart",
  parameters: {
    layout: "centered",
    docs: { description: { component: "이 스토리는 임시 비활성화 상태입니다." } },
  },
};
export default meta;

type Story = StoryObj<Record<string, unknown>>;
export const Disabled: Story = {};

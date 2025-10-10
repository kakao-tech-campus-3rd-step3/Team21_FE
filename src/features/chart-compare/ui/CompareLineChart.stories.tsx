import type { Meta, StoryObj } from "@storybook/react-vite";

import { chartData } from "@/__MOCK__/mockData";
import type { Professor } from "@/entities/professor/model/professors";

import { CompareLineChart } from "./CompareLineChart";

const seriesKeys = Object.keys(chartData?.[0] ?? {}).filter((k) => k !== "year");
const makeProf = (id: number, name: string) => ({ id, name }) as unknown as Professor;

const meta: Meta<typeof CompareLineChart> = {
  title: "Features/ChartCompare/CompareLineChart",
  component: CompareLineChart,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark" },
    docs: {
      description: {
        component:
          "여러 교수의 연도별 지표를 차트로 비교 컴포넌트는 Line dataKey={prof.name}를 사용 ->, prof.name은 chartData의 필드명과 동일해야 선이 그려짐.",
      },
    },
  },
  args: {
    professors: seriesKeys.slice(0, 2).map((k, i) => makeProf(i + 1, k)),
  },
  decorators: [
    (Story) => (
      <div id="a11y-root" className="w-[860px] max-w-[92vw] rounded-lg bg-black p-6 text-white">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CompareLineChart>;

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

export const SingleProfessor: Story = {
  args: { professors: seriesKeys.slice(0, 1).map((k) => makeProf(1, k)) },
  parameters: Playground.parameters,
};

export const EmptyProfessors: Story = {
  args: { professors: [] },
  parameters: Playground.parameters,
};

export const ThreeOrMore: Story = {
  args: { professors: seriesKeys.slice(0, 4).map((k, i) => makeProf(i + 1, k)) },
  parameters: Playground.parameters,
};

export const NarrowContainer: Story = {
  decorators: [
    (Story) => (
      <div id="a11y-root" className="w-[420px] max-w-[92vw] rounded-lg bg-black p-4 text-white">
        <Story />
      </div>
    ),
  ],
  parameters: Playground.parameters,
};

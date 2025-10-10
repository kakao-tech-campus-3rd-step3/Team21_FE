import type { Meta, StoryObj } from "@storybook/react-vite";

import type { Professor } from "@/entities/professor/model/professors";

import { CompareRaderChart } from "./CompareRaderChart";

type ScoreFields = Pick<
  Professor,
  "homework" | "lecDifficulty" | "examDifficulty" | "gradeDistribution" | "researchPerf"
>;

const makeProf = (id: number, name: string, scores?: Partial<ScoreFields>) =>
  ({
    id,
    name,
    homework: 3,
    lecDifficulty: 3,
    examDifficulty: 3,
    gradeDistribution: 3,
    researchPerf: 3,
    ...scores,
  }) as unknown as Professor;

const meta: Meta<typeof CompareRaderChart> = {
  title: "Features/ChartCompare/CompareRaderChart",
  component: CompareRaderChart,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark" },
    docs: {
      description: {
        component:
          "교수들의 과제량/강의난이도/시험난이도/학점분포/연구성과 지표를 레이더 차트로 비교 professors의 name이 데이터 시리즈 키로 사용됨 값 범위는 0~5로 가정",
      },
    },
  },
  args: {
    professors: [
      makeProf(1, "Professor A", {
        homework: 4.5,
        lecDifficulty: 3.5,
        examDifficulty: 4,
        gradeDistribution: 2.5,
        researchPerf: 4,
      }),
      makeProf(2, "Professor B", {
        homework: 2.5,
        lecDifficulty: 4,
        examDifficulty: 3,
        gradeDistribution: 4.5,
        researchPerf: 3.5,
      }),
    ],
  },
  decorators: [
    (Story) => (
      <div
        id="a11y-root"
        className="w-[520px] h-[520px] max-w-[92vw] rounded-lg bg-black text-white p-4"
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CompareRaderChart>;

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
  args: {
    professors: [
      makeProf(1, "Professor A", {
        homework: 4,
        lecDifficulty: 4,
        examDifficulty: 3,
        gradeDistribution: 5,
        researchPerf: 4,
      }),
    ],
  },
  parameters: Playground.parameters,
};

export const EmptyProfessors: Story = {
  args: { professors: [] },
  parameters: Playground.parameters,
};

export const LongNames: Story = {
  args: {
    professors: [
      makeProf(1, "데이터사이언스·인공지능연구센터-김알고리즘교수(아주긴이름확인)", {
        homework: 5,
        lecDifficulty: 4,
        examDifficulty: 3,
        gradeDistribution: 2,
        researchPerf: 5,
      }),
      makeProf(2, "고성능컴퓨팅-분산시스템-박분산교수(초장문테스트)", {
        homework: 2,
        lecDifficulty: 3,
        examDifficulty: 4,
        gradeDistribution: 5,
        researchPerf: 3,
      }),
    ],
  },
  parameters: Playground.parameters,
};

export const EdgeValues: Story = {
  args: {
    professors: [
      makeProf(1, "All Max (5)", {
        homework: 5,
        lecDifficulty: 5,
        examDifficulty: 5,
        gradeDistribution: 5,
        researchPerf: 5,
      }),
      makeProf(2, "All Min (0)", {
        homework: 0,
        lecDifficulty: 0,
        examDifficulty: 0,
        gradeDistribution: 0,
        researchPerf: 0,
      }),
    ],
  },
  parameters: Playground.parameters,
};

export const NarrowContainer: Story = {
  decorators: [
    (Story) => (
      <div
        id="a11y-root"
        className="w-[360px] h-[360px] max-w-[92vw] rounded-lg bg-black text-white p-4"
      >
        <Story />
      </div>
    ),
  ],
  parameters: Playground.parameters,
};

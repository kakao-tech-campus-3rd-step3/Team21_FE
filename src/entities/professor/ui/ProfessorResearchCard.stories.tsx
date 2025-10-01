import { profResearch } from "@/__MOCK__/mockData";
import type { Meta, StoryObj } from "@storybook/react";
import { ProfessorResearchCard } from "./ProfessorResearchCard";

const meta: Meta<typeof ProfessorResearchCard> = {
  title: "Entities/Professor/ProfessorResearchCard",
  component: ProfessorResearchCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "교수의 학력, 주요 연구 분야, 개설 강의 정보를 보여주는 카드 컴포넌트.",
      },
    },
  },
  args: {
    profId: profResearch[0]?.id ?? 100,
  },
  decorators: [
    (Story) => (
      <div className="w-[860px] max-w-[92vw]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProfessorResearchCard>;

export const Playground: Story = {};

// 해당 교수의 연구 정보가 없는 경우
export const NoData: Story = {
  args: { profId: -1 },
};

// 연구분야가 비어있는 경우
export const NoResearchAreas: Story = {
  args: {
    profId: profResearch[0]?.id ?? 100,
  },
};

// 강의가 여러 개 있을 때 스크롤 확인
export const ManyCourses: Story = {
  args: {
    profId: 100,
  },
};

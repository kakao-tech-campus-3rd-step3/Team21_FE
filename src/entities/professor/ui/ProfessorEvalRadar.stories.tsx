import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProfessorEvalCard } from "@/entities/professor/ui/ProfessorEvalRadar";

const meta: Meta<typeof ProfessorEvalCard> = {
  title: "Entities/Professor/ProfessorEvalCard",
  component: ProfessorEvalCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
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
type Story = StoryObj<typeof ProfessorEvalCard>;

const mockRatingBreakdown = {
  thesisPerformance: 4.0,
  researchPerformance: 4.5,
  homework: 3.0,
  lectureDifficulty: 3.5,
  examDifficulty: 3.25,
};

const mockDepartmentAverage = {
  thesisPerformance: 3.5,
  researchPerformance: 3.8,
  homework: 3.2,
  lectureDifficulty: 3.0,
  examDifficulty: 3.1,
};

export const Playground: Story = {
  args: {
    ratingBreakdown: mockRatingBreakdown,
    departmentAverage: mockDepartmentAverage,
  },
};

// 교수 평가 데이터가 있는 경우
export const WithData: Story = {
  args: {
    ratingBreakdown: mockRatingBreakdown,
    departmentAverage: mockDepartmentAverage,
  },
};

// 데이터가 없는 경우
export const NoData: Story = {
  args: {
    ratingBreakdown: undefined,
    departmentAverage: undefined,
  },
};

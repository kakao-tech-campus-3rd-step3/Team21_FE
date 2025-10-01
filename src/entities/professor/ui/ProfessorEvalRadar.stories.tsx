import { profEvals } from "@/__MOCK__/mockData";
import { ProfessorEvalCard } from "@/entities/professor/ui/ProfessorEvalRadar";
import type { Meta, StoryObj } from "@storybook/react";

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

export const Playground: Story = {
  args: {
    profId: profEvals.profId,
  },
};

// 교수 평가 데이터가 있는 경우
export const WithData: Story = {
  args: {
    profId: profEvals.profId,
  },
};

// 데이터가 없는 경우
export const NoData: Story = {
  args: {
    profId: -1,
  },
};

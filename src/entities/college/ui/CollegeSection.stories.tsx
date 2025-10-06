import type { Meta, StoryObj } from "@storybook/react-vite";

import { CollegeSection } from "./CollegeSection";

const meta: Meta<typeof CollegeSection> = {
  title: "Entities/College/CollegeSection",
  component: CollegeSection,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "대학 상세 화면에서 단과대학 리스트를 보여주는 Section 컴포넌트. 내부적으로 CollegeGrid를 사용합니다.",
      },
    },
  },
  args: {
    univId: 100,
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
type Story = StoryObj<typeof CollegeSection>;

export const Playground: Story = {};

// 매칭되는 단과대학이 없을 때
export const Empty: Story = {
  args: {
    univId: 999,
  },
};

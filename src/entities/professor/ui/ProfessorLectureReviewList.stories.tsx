import type { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, within } from "@storybook/testing-library";

import { ProfessorLectureReviewList } from "./ProfessorLectureReviewList";

const meta: Meta<typeof ProfessorLectureReviewList> = {
  title: "Entities/Professor/ProfessorLectureReviewList",
  component: ProfessorLectureReviewList,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "교수 상세 페이지의 최근 강의평 리스트. 과목명, 학기, 평점, 요약, 특성 칩(팀플/학점분포/시험난이도) 표시. '더보기'로 전체 펼침.",
      },
    },
  },
  args: {
    profId: 1,
  },
  decorators: [
    (Story) => (
      <div className="w-[820px] max-w-[92vw]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProfessorLectureReviewList>;

export const Playground: Story = {};

// 더보기
export const ShowAll: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const moreBtn = await canvas.findByRole("button", { name: "더보기" });
    await userEvent.click(moreBtn);
  },
};

// 좁은 폭
export const TightContainer: Story = {
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
};

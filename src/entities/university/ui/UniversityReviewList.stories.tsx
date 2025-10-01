import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { UniversityReviewList } from "./UniversityReviewList";

const meta: Meta<typeof UniversityReviewList> = {
  title: "Entities/University/UniversityReviewList",
  component: UniversityReviewList,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "대학교 학생 평가(리뷰) 리스트 컴포넌트입니다. 상단에는 총 개수, 각 항목에는 평점/작성일/내용/태그가 표시되며, 더보기 버튼으로 모든 리뷰를 펼칠 수 있습니다.",
      },
    },
  },
  argTypes: {
    univSeq: {
      control: { type: "number" },
      description: "목 데이터에 존재하는 대학교 식별자.",
    },
  },
};
export default meta;

type Story = StoryObj<typeof UniversityReviewList>;

export const Playground: Story = {
  args: { univSeq: 100 },
  parameters: {
    docs: {
      description: {
        story: "해당 학교의 리뷰가 표시됩니다.",
      },
    },
  },
};

export const LoadMore: Story = {
  name: "Load More",
  args: { univSeq: 1 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = await canvas.queryByRole("button", { name: "더보기" });
    if (btn) {
      await userEvent.click(btn);
    }
  },
  parameters: {
    docs: {
      description: {
        story:
          "리뷰가 4개 이상인 경우에만 '더보기' 버튼이 나타납니다. 존재하면 자동 클릭하여 모두 펼칩니다.",
      },
    },
  },
};

export const Empty: Story = {
  name: "Empty",
  args: { univSeq: 999999 },
  parameters: {
    docs: {
      description: {
        story: "0개인 상태를 확인합니다.",
      },
    },
  },
};

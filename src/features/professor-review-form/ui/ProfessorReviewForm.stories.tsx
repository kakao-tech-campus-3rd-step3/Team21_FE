import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

import { ProfessorReviewForm } from "@/features/professor-review-form/ui/ProfessorReviewForm";

function DisableBackNav({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const originalGo = window.history.go;
    window.history.go = () => {};
    return () => {
      window.history.go = originalGo;
    };
  }, []);
  return <>{children}</>;
}

const TEXT = {
  title: "교수 평가",
  paperEval: "교수님의 논문을 평가해 주세요.",
  paperComment: "논문에 대한 의견을 남겨 주세요. (선택)",
  paperPlaceholder: "논문에 대한 생각을 자유롭게 작성해주세요",
  labEval: "교수님의 연구실을 평가해 주세요.",
  validate: { requiredStar: "별점을 선택해주세요." },
} as const;

const withQueryClient = (Story: React.ComponentType) => {
  const qc = new QueryClient();
  return (
    <QueryClientProvider client={qc}>
      <Story />
    </QueryClientProvider>
  );
};

const withDisableBackNav = (Story: React.ComponentType) => (
  <DisableBackNav>
    <Story />
  </DisableBackNav>
);

const meta: Meta<typeof ProfessorReviewForm> = {
  title: "Features/Professor-Review-Form/ProfessorReviewForm",
  component: ProfessorReviewForm,
  decorators: [withQueryClient, withDisableBackNav],
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "교수 리뷰를 위한 Star Rating Field, 텍스트 에리어를 포함한 폼을 표시합니다.",
      },
    },
  },
  args: {
    profSeq: 1234,
    profName: "홍길동",
    text: TEXT,
    onSubmitted: (data) => {
      console.log("[ProfessorReviewForm] submit", data);
      alert("제출 성공 (mock)");
    },
  },
  argTypes: {
    profSeq: { control: { type: "number" } },
    profName: { control: { type: "text" } },
    text: { control: false },
    onSubmitted: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof ProfessorReviewForm>;
export const Playground: Story = {};

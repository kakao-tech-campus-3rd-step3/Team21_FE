import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

import { UniversityReviewForm } from "@/features/university-review-form/ui/UniversityReviewForm";

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
  title: "학교 평가",
  categories: [
    "학식을 평가해 주세요.",
    "기숙사를 평가해 주세요.",
    "편의시설을 평가해 주세요.",
    "캠퍼스 전반을 평가해 주세요.",
    "학생 복지를 평가해 주세요.",
  ] as string[],
  totalComment: "학교 총평을 작성해 주세요. (선택)",
  commentPlaceholder: "학교에 대한 총평을 작성해주세요",
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

const meta: Meta<typeof UniversityReviewForm> = {
  title: "Features/University-Review-Form/UniversityReviewForm",
  component: UniversityReviewForm,
  tags: ["autodocs"],
  decorators: [withQueryClient, withDisableBackNav],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "대학교 리뷰를 위한 Star Rating Field, 텍스트 에리어를 포함한 폼을 표시합니다.",
      },
    },
  },

  args: {
    univSeq: 1001,
    univName: "충남대학교",
    text: TEXT,
    onSubmitted: (data) => {
      console.log("[UniversityReviewForm] submit", data);
      alert("제출 성공 (mock)");
    },
  },
  argTypes: {
    univSeq: { control: { type: "number" } },
    univName: { control: { type: "text" } },
    text: { control: false },
    onSubmitted: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof UniversityReviewForm>;
export const Playground: Story = {};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

import { CourseReviewForm } from "@/features/course-review-form/ui/CourseReviewForm";

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
  title: "강의 평가",
  semesterLabel: "수강 학기를 입력해 주세요",
  yearSuffix: "년",
  termSuffix: "학기",
  yearPlaceholder: "2025",
  termPlaceholder: "1 또는 2",

  gradeKindness: "성적은 얼마나 잘 주나요? 평가해 주세요.",
  examDifficulty: "시험 난이도를 평가해 주세요.",
  lectureSkill: "교수의 강의력을 평가해 주세요.",

  taskAmount: "과제량을 선택해 주세요.",
  teamProject: "팀플 여부를 선택해 주세요.",

  taskAmountOptions: [
    { label: "매우 적음", value: "very-few" },
    { label: "적음", value: "few" },
    { label: "보통", value: "normal" },
    { label: "많음", value: "many" },
    { label: "매우 많음", value: "very-many" },
  ],
  teamProjectOptions: [
    { label: "없음", value: "none" },
    { label: "있음", value: "yes" },
  ],

  totalComment: "강의 총평을 작성해 주세요. (선택)",
  commentPlaceholder: "강의에 대한 총평을 작성해 주세요.",

  validate: {
    yearRequired: "연도를 입력해주세요.",
    yearInvalid: "연도는 정수여야 합니다.",
    yearRange: "연도는 1900~2100 사이여야 합니다.",
    termRequired: "학기를 입력해주세요.",
    termInvalid: "학기는 1 또는 2만 가능합니다.",
    requiredStar: "별점을 선택해주세요.",
    selectRequired: "옵션을 선택해주세요.",
  },
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

const meta: Meta<typeof CourseReviewForm> = {
  title: "Features/Course-Review-Form/CourseReviewForm",
  component: CourseReviewForm,
  decorators: [withQueryClient, withDisableBackNav],
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "강의 리뷰를 위한 Star Rating Field, 텍스트 에리어를 포함한 폼을 표시합니다.",
      },
    },
  },

  args: {
    lecSeq: 101,
    lecName: "자료구조",
    text: TEXT,
    onSubmitted: (data) => {
      console.log("[CourseReviewForm] submit", data);
      alert("제출 성공 (mock)");
    },
  },
  argTypes: {
    lecSeq: { control: { type: "number" } },
    lecName: { control: { type: "text" } },
    text: { control: false },
    onSubmitted: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof CourseReviewForm>;
export const Playground: Story = {};

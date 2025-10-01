import type { Meta, StoryObj } from "@storybook/react";
import { CollegeFeatureCard } from "./CollegeFeatureCard";

const meta: Meta<typeof CollegeFeatureCard> = {
  title: "Entities/College/CollegeFeatureCard",
  component: CollegeFeatureCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "단과대학의 주요 특징을 체크 아이콘과 함께 보여주는 카드 컴포넌트.",
      },
    },
  },
  args: {
    title: "단과대학 특징",
    features: ["풍부한 장학 제도", "산학 협력 프로그램", "국제 교환학생 기회"],
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CollegeFeatureCard>;

export const Playground: Story = {};

// 특징이 많은 경우 스크롤/줄바꿈
export const ManyFeatures: Story = {
  args: {
    features: Array.from({ length: 10 }).map((_, i) => `특징 항목 ${i + 1}`),
  },
};

// 배열이 비어있을 때
export const NoFeatures: Story = {
  args: {
    features: [],
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProfessorCard } from "@/entities/professor/ui/ProfessorCard";

const meta: Meta<typeof ProfessorCard> = {
  title: "Entities/Professor/ProfessorCard",
  component: ProfessorCard,
  parameters: {
    docs: {
      description: {
        component: "교수 요약 카드. 이름, 직급, 학위, 연구분야 태그, 이메일/오피스 표시.",
      },
    },
    layout: "centered",
  },
  argTypes: {
    researchAreas: {
      control: "object",
      description: "연구 분야 태그 배열",
    },
    className: { control: false },
  },
  args: {
    name: "이영석",
    rankLabel: "부교수",
    degree: "Ph.D. in Computer Science (SNU)",
    researchAreas: ["Distributed Systems", "Edge Computing", "Databases"],
    email: "yslee@example.ac.kr",
    office: "공대 5호관 401호",
  },
};
export default meta;

type Story = StoryObj<typeof ProfessorCard>;

export const Playground: Story = {};

// 태그가 많은 경우
export const ManyTags: Story = {
  args: {
    researchAreas: [
      "Operating Systems",
      "Distributed Systems",
      "Edge Computing",
      "Databases",
      "Storage",
      "Performance",
      "Reliability",
      "Cloud Native",
      "Concurrency",
      "eBPF",
    ],
  },
};

// 태그가 없는 경우
export const NoTags: Story = {
  args: { researchAreas: [] },
};

// 긴 이름/학위 텍스트 처리 확인
export const LongTexts: Story = {
  args: {
    name: "이영석 이름 긴거-테스트-매우매우매우매우매우매우매우매우매우매우매우매우길게",
    degree:
      "Ph.D. in Electrical and Computer Engineering, Massachusetts Institute of Technology, Minor in Applied Mathematics (2010)",
  },
};

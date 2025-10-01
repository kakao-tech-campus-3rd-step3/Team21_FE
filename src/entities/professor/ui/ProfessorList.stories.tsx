import type { Meta, StoryObj } from "@storybook/react";
import { ProfessorList } from "./ProfessorList";

const meta: Meta<typeof ProfessorList> = {
  title: "Entities/Professor/ProfessorList",
  component: ProfessorList,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "교수 요약 카드들을 묶어 리스트로 보여주는 컴포넌트. 제목과 교수 카드 배열을 렌더링.",
      },
    },
  },
  args: {
    title: "추천 교수진",
    items: [
      {
        name: "이영석",
        rankLabel: "부교수",
        degree: "Ph.D. in Computer Science (SNU)",
        researchAreas: ["Distributed Systems", "Edge Computing", "Databases"],
        email: "yslee@example.ac.kr",
        office: "공대 5호관 401호",
      },
      {
        name: "김민수",
        rankLabel: "조교수",
        degree: "Ph.D. in Artificial Intelligence (KAIST)",
        researchAreas: ["Machine Learning", "Natural Language Processing"],
        email: "mskim@example.ac.kr",
        office: "공대 2호관 204호",
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof ProfessorList>;

// Playground: 기본 리스트
export const Playground: Story = {};

// EmptyList: 데이터 없는 경우
export const EmptyList: Story = {
  args: {
    title: "빈 리스트",
    items: [],
  },
};

// ManyItems: 긴 리스트
export const ManyItems: Story = {
  args: {
    title: "많은 교수진",
    items: Array.from({ length: 8 }).map((_, i) => ({
      name: `홍길동 ${i + 1}`,
      rankLabel: "교수",
      degree: `Ph.D. in Engineering ${i + 1}`,
      researchAreas: ["AI", "Cloud", "Networks"],
      email: `hong${i + 1}@example.ac.kr`,
      office: `공대 ${i + 1}호관 ${i + 100}호`,
    })),
  },
};

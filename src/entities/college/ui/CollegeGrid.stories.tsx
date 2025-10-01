import type { CollegeCard } from "@/entities/college/model/college-card.vm";
import type { Meta, StoryObj } from "@storybook/react";
import { CollegeGrid } from "./CollegeGrid";

const sampleColleges: CollegeCard[] = [
  {
    collegeSeq: 1,
    name: "공과대학",
    description: "엔지니어링 및 컴퓨터 관련 학문",
    departmentCount: 12,
  },
  {
    collegeSeq: 2,
    name: "자연과학대학",
    description: "수학, 물리학, 화학 등 기초과학",
    departmentCount: 8,
  },
  {
    collegeSeq: 3,
    name: "사회과학대학",
    description: "정치, 경제, 행정, 사회학",
    departmentCount: 10,
  },
  {
    collegeSeq: 4,
    name: "인문대학",
    description: "국어국문학, 영어영문학, 역사학",
    departmentCount: 9,
  },
];

const meta: Meta<typeof CollegeGrid> = {
  title: "Entities/College/CollegeGrid",
  component: CollegeGrid,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "단과대학 리스트를 그리드 형태로 보여주는 컴포넌트. 이름, 설명, 학과 수를 카드로 렌더링합니다.",
      },
    },
  },
  args: {
    colleges: sampleColleges,
  },
  decorators: [
    (Story) => (
      <div className="w-[720px] max-w-[92vw]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CollegeGrid>;

export const Playground: Story = {};

// 데이터가 없을 때 메시지
export const Empty: Story = {
  args: {
    colleges: [],
  },
};

// 카드가 많을 때 그리드
export const ManyItems: Story = {
  args: {
    colleges: Array.from({ length: 10 }).map((_, i) => ({
      collegeSeq: i + 1,
      name: `테스트 단과대학 ${i + 1}`,
      description: `이것은 단과대학 ${i + 1} 설명입니다.`,
      departmentCount: Math.floor(Math.random() * 15),
    })),
  },
};

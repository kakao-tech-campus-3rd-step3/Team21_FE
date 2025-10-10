import type { Meta, StoryObj } from "@storybook/react-vite";

import type { Professor } from "@/entities/professor/model/professors";

import { ProfessorCard } from "./ProfessorCard";

const makeProf = (over?: Partial<Professor>): Professor =>
  ({
    id: 1,
    name: "김데이터",
    university: "충남대학교",
    department: "컴퓨터공학과",
    rating: 4.3,
    tags: ["과제 적당", "강의 깔끔", "피드백 빠름"],
    ...over,
  }) as Professor;

const meta: Meta<typeof ProfessorCard> = {
  title: "Features/ProfessorCompare/ProfessorCard",
  id: "features-professor-compare-professorcard",
  component: ProfessorCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark" },
    docs: {
      description: {
        component: "교수 정보 카드-> 이름/대학/학과/평점/태그를 표시, 우상단 X 버튼으로 제거",
      },
    },
  },
  argTypes: {
    onRemove: { action: "remove" },
  },
  args: {
    professor: makeProf(),
  },
  decorators: [
    (Story) => (
      <div className="w-[360px] h-[300px] max-w-[92vw]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProfessorCard>;

export const Playground: Story = {};

export const NoTags: Story = {
  args: {
    professor: makeProf({ tags: [] }),
  },
};

export const ManyTags: Story = {
  args: {
    professor: makeProf({
      tags: [
        "출결 엄격",
        "과제 多",
        "시험 난이도 보통",
        "실습 중심",
        "자료 풍부",
        "팀프로젝트",
        "피드백 빠름",
        "오픈북",
      ],
    }),
  },
};

export const LowRating: Story = {
  args: {
    professor: makeProf({ rating: 1.7, tags: ["난이도 높음", "평가 깐깐"] }),
  },
};

export const PerfectRating: Story = {
  args: {
    professor: makeProf({ rating: 5.0, tags: ["명강의", "피드백 최고", "추천"] }),
  },
};

export const LongTexts: Story = {
  args: {
    professor: makeProf({
      name: "데이터사이언스·인공지능연구센터-초장문이름교수",
      university: "국립충남대학교-대전광역시유성구대학로-미래융합캠퍼스",
      department: "고성능컴퓨팅·분산시스템·소프트웨어공학융합전공",
      tags: ["아주 긴 태그 내용으로 줄바꿈 확인"],
    }),
  },
};

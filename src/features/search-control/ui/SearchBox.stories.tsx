import type { Meta, StoryObj } from "@storybook/react-vite";

import type { UnivSearchResult } from "@/entities/university/model/univ-search.domain";
import type { ProfessorSearch } from "@/features/professor-search/model/professor-search.domain";

import { SearchBox } from "./SearchBox";

const profPool: ProfessorSearch[] = [
  { id: "p1", name: "김데이터", initials: "김", univ: "충남대학교", dept: "컴퓨터공학과" },
  { id: "p2", name: "박분산", initials: "박", univ: "경북대학교", dept: "소프트웨어공학과" },
  { id: "p3", name: "이알고", initials: "이", univ: "충남대학교", dept: "데이터사이언스학과" },
  { id: "p4", name: "정시각", initials: "정", univ: "경북대학교", dept: "시각지능학과" },
  { id: "p5", name: "한연구", initials: "한", univ: "충남대학교", dept: "인공지능학과" },
];

const longProfPool: ProfessorSearch[] = [
  {
    id: "lp1",
    name: "데이터사이언스·인공지능연구센터-초장문이름교수",
    initials: "데",
    univ: "국립충남대학교-미래융합캠퍼스",
    dept: "고성능컴퓨팅·분산시스템·소프트웨어공학융합전공",
  },
  {
    id: "lp2",
    name: "고성능컴퓨팅-분산시스템-박분산교수(라벨 줄바꿈 확인)",
    initials: "고",
    univ: "경북대학교-글로벌캠퍼스",
    dept: "시각지능·클라우드·로보틱스융합전공",
  },
];

const dummyUniv: UnivSearchResult = {
  id: "u1",
  name: "충남대학교",
  address: "",
  rating: 0,
  reviewCount: 0,
};

const meta: Meta<typeof SearchBox> = {
  title: "Features/SearchControl/SearchBox",
  component: SearchBox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark" },
    docs: {
      description: {
        component:
          "대학/교수 통합 검색 박스-> 상단 토글로 모드 전환 후 입력하면 자동완성 결과, 선택 시 onSelectUniv/onSelectProf 콜백 호출",
      },
    },
  },
  argTypes: {
    onSelectUniv: { action: "select-university" },
    onSelectProf: { action: "select-professor" },
  },
  args: {
    placeholder: "대학 또는 교수명을 입력하세요",
    professors: profPool,
    onSelectUniv: () => {
      console.log("select-university:", dummyUniv);
    },
    onSelectProf: (p) => {
      console.log("select-professor:", p);
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[640px] max-w-[92vw]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SearchBox>;

export const Playground: Story = {};

export const LongTexts: Story = {
  args: {
    professors: longProfPool,
  },
};

export const EmptyProfessorPool: Story = {
  args: {
    professors: [],
  },
};

export const ManyResults: Story = {
  args: {
    professors: Array.from({ length: 20 }).map((_, i) => ({
      id: `m${i}`,
      name: `테스트 교수 ${i + 1} - 데이터사이언스·인공지능연구센터`,
      initials: String.fromCharCode(65 + (i % 26)),
      univ: i % 2 ? "경북대학교" : "충남대학교",
      dept: i % 3 ? "컴퓨터공학과" : "데이터사이언스학과",
    })),
  },
};

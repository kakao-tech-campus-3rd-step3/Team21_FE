import type { Meta, StoryObj } from "@storybook/react-vite";

import type { ProfessorSearch } from "@/features/professor-search/model/professor-search.domain";

import { ProfessorResultList } from "./ProfessorResultList";

const make = (over?: Partial<ProfessorSearch>): ProfessorSearch =>
  ({
    id: Math.random().toString(36).slice(2),
    name: "김데이터",
    initials: "김",
    univ: "충남대학교",
    dept: "컴퓨터공학과",
    ...over,
  }) as ProfessorSearch;

const baseResults: ProfessorSearch[] = [
  make({ name: "김데이터", initials: "김", dept: "컴퓨터공학과" }),
  make({ name: "박분산", initials: "박", dept: "소프트웨어공학과" }),
  make({ name: "이알고", initials: "이", dept: "데이터사이언스학과" }),
  make({ name: "정시각", initials: "정", dept: "시각지능학과" }),
  make({ name: "한연구", initials: "한", dept: "인공지능학과" }),
];

const meta: Meta<typeof ProfessorResultList> = {
  title: "Features/ProfessorSearch/ProfessorResultList",
  component: ProfessorResultList,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark" },
    docs: {
      description: {
        component:
          "교수 검색 자동완성 결과 리스트-> 항목 클릭 시 onPick 콜백이 호출, absolute로 떠서 부모에 relative 컨테이너가 필요",
      },
    },
  },
  argTypes: {
    onPick: { action: "pick" },
  },
  args: {
    results: baseResults,
  },
  decorators: [
    (Story) => (
      <div className="relative w-[420px] max-w-[92vw]">
        <input
          className="w-full rounded-lg border border-white/30 bg-black/30 text-white px-3 py-2 placeholder:text-white/50"
          placeholder="교수명 검색…"
        />
        <div className="mt-0">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProfessorResultList>;

export const Playground: Story = {};

export const EmptyResults: Story = {
  args: { results: [] },
};

export const ManyResults: Story = {
  args: {
    results: Array.from({ length: 12 }).map((_, i) =>
      make({
        name: `테스트 교수 ${i + 1}`,
        initials: String.fromCharCode(65 + (i % 26)),
        univ: i % 2 ? "경북대학교" : "충남대학교",
        dept: i % 3 ? "컴퓨터공학과" : "데이터사이언스학과",
      }),
    ),
  },
  decorators: [
    (Story) => (
      <div className="relative w-[420px] max-w-[92vw] pb-64">
        <input
          className="w-full rounded-lg border border-white/30 bg-black/30 text-white px-3 py-2 placeholder:text-white/50"
          placeholder="교수명 검색…"
        />
        <Story />
      </div>
    ),
  ],
};

export const LongTexts: Story = {
  args: {
    results: [
      make({
        name: "데이터사이언스·인공지능연구센터-초장문이름교수",
        univ: "국립충남대학교-대전광역시유성구대학로-미래융합캠퍼스",
        dept: "고성능컴퓨팅·분산시스템·소프트웨어공학융합전공",
        initials: "데",
      }),
      make({
        name: "고성능컴퓨팅-분산시스템-박분산교수(라벨 줄바꿈 확인)",
        univ: "경북대학교-글로벌캠퍼스",
        dept: "시각지능·클라우드·로보틱스융합전공",
        initials: "고",
      }),
    ],
  },
};

export const MissingInitials: Story = {
  args: {
    results: [
      make({ name: "유니버설", initials: undefined }),
      make({ name: "언디파인드", initials: undefined }),
    ],
  },
};

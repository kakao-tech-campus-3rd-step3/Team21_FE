import type { Meta, StoryObj } from "@storybook/react-vite";

import type { UniversitySearch } from "@/features/university-search/model/universitysearch";

import { UniversityResultList } from "./UniversityResultList";

const make = (over?: Partial<UniversitySearch>): UniversitySearch =>
  ({
    id: Math.random().toString(36).slice(2),
    name: "충남대학교",
    address: "대전광역시 유성구 대학로 99",
    initials: "충",
    ...over,
  }) as UniversitySearch;

const baseResults: UniversitySearch[] = [
  make({ name: "충남대학교", address: "대전 유성구 대학로 99", initials: "충" }),
  make({ name: "경북대학교", address: "대구 북구 대학로 80", initials: "경" }),
  make({ name: "전남대학교", address: "서울 관악구 관악로 1", initials: "서" }),
  make({ name: "부산대학교", address: "부산 금정구 부산대학로 63번길 2", initials: "부" }),
  make({ name: "강원대학교", address: "서울 성동구 왕십리로 222", initials: "한" }),
];

const meta: Meta<typeof UniversityResultList> = {
  title: "Features/UniversitySearch/UniversityResultList",
  component: UniversityResultList,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "대학 검색 자동완성 결과 리스트-> 항목 클릭 시 onPick 호출, 리스트는 absolute로 렌더링되므로 부모 컨테이너에 relative가 필요",
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
          placeholder="대학명 검색…"
        />
        <div className="mt-0">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UniversityResultList>;

export const Playground: Story = {};

export const EmptyResults: Story = {
  args: { results: [] },
};

export const ManyResults: Story = {
  args: {
    results: Array.from({ length: 12 }).map((_, i) =>
      make({
        name: `테스트대학교 ${i + 1}`,
        address: `테스트시 캠퍼스로 ${100 + i}`,
        initials: String.fromCharCode(65 + (i % 26)),
      }),
    ),
  },
};

export const LongTexts: Story = {
  args: {
    results: [
      make({
        name: "국립충남대학교-대전광역시유성구대학로-미래융합캠퍼스(아주긴이름테스트)",
        address:
          "대전광역시 유성구 대학로 99, 공학관 A동 101호, 우편번호 34134 (주소 줄바꿈/클램핑 확인용 매우 긴 텍스트)",
        initials: "국",
      }),
      make({
        name: "경북대학교-글로벌캠퍼스-초지능·초연결·초융합연구단",
        address: "대구광역시 북구 대학로 80 (테스트 주소가 길 때 표시 확인)",
        initials: "경",
      }),
    ],
  },
};

export const MissingInitials: Story = {
  args: {
    results: [make({ initials: undefined }), make({ initials: undefined, name: "무초성대" })],
  },
};

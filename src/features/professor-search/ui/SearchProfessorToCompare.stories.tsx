import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo, useState } from "react";

import type { ProfessorSearch } from "@/features/professor-search/model/professor-search.domain";

import { SearchProfessorToCompare } from "./SearchProfessorToCompare";

const pool: ProfessorSearch[] = [
  { id: "k1", name: "김데이터", initials: "김", univ: "충남대학교", dept: "컴퓨터공학과" },
  { id: "p1", name: "박분산", initials: "박", univ: "경북대학교", dept: "소프트웨어공학과" },
  { id: "l1", name: "이알고", initials: "이", univ: "충남대학교", dept: "데이터사이언스학과" },
  { id: "j1", name: "정시각", initials: "정", univ: "경북대학교", dept: "시각지능학과" },
  { id: "h1", name: "한연구", initials: "한", univ: "충남대학교", dept: "인공지능학과" },
];

const filterByQuery = (q: string, base: ProfessorSearch[]) => {
  const qq = q.trim();
  if (!qq) return [];
  return base.filter(
    (p) =>
      p.name.includes(qq) ||
      p.univ.includes(qq) ||
      p.dept.includes(qq) ||
      (p.initials?.includes(qq) ?? false),
  );
};

const meta: Meta<typeof SearchProfessorToCompare> = {
  title: "Features/ProfessorSearch/SearchProfessorToCompare",
  component: SearchProfessorToCompare,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark" },
    docs: {
      description: {
        component:
          "비교 대상 교수 검색 카드-> 입력값에 따라 자동완성 리스트를 보여주고, 항목 선택 시 onPick 호출",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[520px] max-w-[92vw]">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof SearchProfessorToCompare>;

export const Playground: Story = {
  render: (args) => {
    const Wrapper = () => {
      const [query, setQuery] = useState("");
      const [open, setOpen] = useState(false);
      const results = useMemo(() => filterByQuery(query, pool), [query]);

      return (
        <SearchProfessorToCompare
          {...args}
          query={query}
          setQuery={setQuery}
          resultsOpen={open}
          setResultsOpen={setOpen}
          results={results}
          onPick={(p) => {
            setQuery(p.name);
            setOpen(false);
            console.log("picked:", p);
          }}
        />
      );
    };
    return <Wrapper />;
  },
};

export const NoResults: Story = {
  render: (args) => {
    const Wrapper = () => {
      const [query, setQuery] = useState("없는교수");
      const [open, setOpen] = useState(true);
      const results = useMemo(() => filterByQuery(query, pool), [query]);

      return (
        <SearchProfessorToCompare
          {...args}
          query={query}
          setQuery={setQuery}
          resultsOpen={open}
          setResultsOpen={setOpen}
          results={results}
          onPick={() => {}}
        />
      );
    };
    return <Wrapper />;
  },
};

export const ClosedDropdown: Story = {
  render: (args) => {
    const Wrapper = () => {
      const [query, setQuery] = useState("김");
      const [open, setOpen] = useState(false);
      const results = useMemo(() => filterByQuery(query, pool), [query]);

      return (
        <SearchProfessorToCompare
          {...args}
          query={query}
          setQuery={setQuery}
          resultsOpen={open}
          setResultsOpen={setOpen}
          results={results}
          onPick={() => {}}
        />
      );
    };
    return <Wrapper />;
  },
};

export const ManyResults: Story = {
  render: (args) => {
    const bigPool = useMemo<ProfessorSearch[]>(
      () =>
        Array.from({ length: 20 }).map((_, i) => ({
          id: `m${i}`,
          name: `테스트 교수 ${i + 1} - 데이터사이언스·인공지능연구센터`,
          initials: String.fromCharCode(65 + (i % 26)),
          univ: i % 2 ? "경북대학교-글로벌캠퍼스" : "국립충남대학교-미래융합캠퍼스",
          dept: i % 3 ? "고성능컴퓨팅·분산시스템·소프트웨어공학융합전공" : "데이터사이언스학과",
        })),
      [],
    );

    const Wrapper = () => {
      const [query, setQuery] = useState("테스트");
      const [open, setOpen] = useState(true);
      const results = useMemo(() => filterByQuery(query, bigPool), [query]);

      return (
        <div className="pb-64">
          <SearchProfessorToCompare
            {...args}
            query={query}
            setQuery={setQuery}
            resultsOpen={open}
            setResultsOpen={setOpen}
            results={results}
            onPick={() => {}}
          />
        </div>
      );
    };
    return <Wrapper />;
  },
};

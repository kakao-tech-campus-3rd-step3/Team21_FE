import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo, useState } from "react";

import type { UniversitySearch } from "@/features/university-search/model/universitysearch";

import { SearchUniversityToCompare } from "./SearchUniversityToCompare";

const pool: UniversitySearch[] = [
  { id: "u1", name: "충남대학교", address: "대전광역시 유성구 대학로 99" },
  { id: "u2", name: "경북대학교", address: "대구광역시 북구 대학로 80" },
  { id: "u3", name: "서울대학교", address: "서울특별시 관악구 관악로 1" },
  { id: "u4", name: "부산대학교", address: "부산광역시 금정구 부산대학로 63번길 2" },
  { id: "u5", name: "한양대학교", address: "서울특별시 성동구 왕십리로 222" },
];

const filterByQuery = (q: string, base: UniversitySearch[]) => {
  const qq = q.trim();
  if (!qq) return [];
  return base.filter((u) => u.name.includes(qq) || u.address.includes(qq));
};

const meta: Meta<typeof SearchUniversityToCompare> = {
  title: "Features/UniversitySearch/SearchUniversityToCompare",
  component: SearchUniversityToCompare,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark" },
    docs: {
      description: {
        component:
          "대학 비교용 검색 카드-> 입력값에 따라 자동완성 리스트를 보여주고, 항목 선택 시 onPick 호출",
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

type Story = StoryObj<typeof SearchUniversityToCompare>;

export const Playground: Story = {
  render: (args) => {
    const Wrapper = () => {
      const [query, setQuery] = useState("");
      const [open, setOpen] = useState(false);
      const results = useMemo(() => filterByQuery(query, pool), [query]);

      return (
        <SearchUniversityToCompare
          {...args}
          query={query}
          setQuery={setQuery}
          resultsOpen={open}
          setResultsOpen={setOpen}
          results={results}
          onPick={(u) => {
            setQuery(u.name);
            setOpen(false);
            console.log("picked:", u);
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
      const [query, setQuery] = useState("없는대학");
      const [open, setOpen] = useState(true);
      const results = useMemo(() => filterByQuery(query, pool), [query]);

      return (
        <SearchUniversityToCompare
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
      const [query, setQuery] = useState("충남");
      const [open, setOpen] = useState(false);
      const results = useMemo(() => filterByQuery(query, pool), [query]);

      return (
        <SearchUniversityToCompare
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
    const bigPool = useMemo<UniversitySearch[]>(
      () =>
        Array.from({ length: 24 }).map((_, i) => ({
          id: `m${i}`,
          name: `테스트대학교 ${i + 1}`,
          address: `테스트시 테스트구 캠퍼스로 ${100 + i}`,
        })),
      [],
    );

    const Wrapper = () => {
      const [query, setQuery] = useState("테스트");
      const [open, setOpen] = useState(true);
      const results = useMemo(() => filterByQuery(query, bigPool), [query]);

      return (
        <div className="pb-64">
          <SearchUniversityToCompare
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

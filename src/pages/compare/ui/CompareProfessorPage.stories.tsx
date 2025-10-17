import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo, useState } from "react";

import { chartData } from "@/__MOCK__/mockData";
import type { Professor } from "@/entities/professor/model/professors.domain";
import { CompareLineChart } from "@/features/chart-compare/ui/CompareLineChart";
import { CompareRaderChart } from "@/features/chart-compare/ui/CompareRaderChart";
import { ProfessorCard } from "@/features/professor-compare/ui/ProfessorCard";
import type { ProfessorSearch } from "@/features/professor-search/model/professor-search.domain";
import { SearchProfessorToCompare } from "@/features/professor-search/ui/SearchProfessorToCompare";
import { COMPARE_PROFESSOR_TEXTS } from "@/pages/compare/text";

const seriesKeys = Object.keys(chartData?.[0] ?? {}).filter((k) => k !== "year");
const p1: Professor = {
  id: 1,
  name: seriesKeys[0] ?? "Professor A",
  university: "충남대학교",
  department: "컴퓨터공학과",
  rating: 4.3,
  tags: ["과제 적당", "강의 깔끔", "피드백 빠름"],
  homework: 4,
  lecDifficulty: 3.5,
  examDifficulty: 3,
  gradeDistribution: 4,
  researchPerf: 4.5,
} as Professor;

const p2: Professor = {
  id: 2,
  name: seriesKeys[1] ?? "Professor B",
  university: "경북대학교",
  department: "소프트웨어공학과",
  rating: 3.8,
  tags: ["팀프로젝트", "자료 풍부"],
  homework: 2.5,
  lecDifficulty: 4,
  examDifficulty: 4,
  gradeDistribution: 3,
  researchPerf: 3.5,
} as Professor;

const pool: ProfessorSearch[] = [
  { id: "k1", name: "김데이터", initials: "김", univ: "충남대학교", dept: "컴퓨터공학과" },
  { id: "p1", name: "박분산", initials: "박", univ: "경북대학교", dept: "소프트웨어공학과" },
  { id: "l1", name: "이알고", initials: "이", univ: "충남대학교", dept: "데이터사이언스학과" },
];

function MockedCompareProfessorPage() {
  const [compared, setCompared] = useState<Professor[]>([p1, p2]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(
    () =>
      query.trim()
        ? pool.filter(
            (p) =>
              p.name.includes(query) ||
              p.univ.includes(query) ||
              p.dept.includes(query) ||
              (p.initials?.includes(query) ?? false),
          )
        : [],
    [query],
  );

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-8 bg-slate-900 text-white min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
          {COMPARE_PROFESSOR_TEXTS.pageTitle}
        </h1>
        <p className="mt-2 text-slate-300">{COMPARE_PROFESSOR_TEXTS.pageSubtitle}</p>
      </header>

      <div className="mt-16 space-y-8">
        <SearchProfessorToCompare
          query={query}
          setQuery={(v) => {
            setQuery(v);
            setOpen(true);
          }}
          results={results}
          resultsOpen={open}
          setResultsOpen={setOpen}
          onPick={() => setOpen(false)}
        />

        {compared.length > 0 && (
          <>
            <div className="relative grid items-start gap-8 sm:grid-cols-2">
              {compared.map((prof) => (
                <ProfessorCard
                  key={prof.id}
                  professor={prof}
                  onRemove={() => setCompared((prev) => prev.filter((p) => p.id !== prof.id))}
                />
              ))}
            </div>

            <div aria-hidden="true" role="presentation" inert>
              <CompareRaderChart professors={compared} />
            </div>
            <div aria-hidden="true" role="presentation" inert>
              <CompareLineChart professors={compared} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const meta: Meta<typeof MockedCompareProfessorPage> = {
  title: "Pages/CompareProfessorPage",
  component: MockedCompareProfessorPage,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark" },
    a11y: {
      config: {
        rules: [{ id: "color-contrast", enabled: false }],
      },
    },
    docs: {
      description: {
        component: "교수 비교 페이지-> 카드/레이더/라인 차트를 즉시 확인",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[1100px] max-w-[95vw] bg-slate-900 p-8 rounded-xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MockedCompareProfessorPage>;

export const Playground: Story = {
  parameters: {
    a11y: {
      config: {
        rules: [{ id: "color-contrast", enabled: false }],
      },
    },
  },
};

export const EmptyState: Story = {
  render: () => {
    return (
      <div className="mx-auto max-w-4xl p-4 sm:p-8 bg-slate-900 text-white min-h-screen">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
            {COMPARE_PROFESSOR_TEXTS.pageTitle}
          </h1>
          <p className="mt-2 text-slate-300">{COMPARE_PROFESSOR_TEXTS.pageSubtitle}</p>
        </header>

        <div className="mt-16">
          <SearchProfessorToCompare
            query=""
            setQuery={() => {}}
            results={[]}
            resultsOpen={false}
            setResultsOpen={() => {}}
            onPick={() => {}}
          />
        </div>
      </div>
    );
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: "color-contrast", enabled: false }],
      },
    },
  },
};

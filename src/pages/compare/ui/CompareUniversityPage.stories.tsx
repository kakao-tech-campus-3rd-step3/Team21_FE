import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo, useState } from "react";

import type { University } from "@/entities/university/model/university";
import { CompareUnivBarChart } from "@/features/chart-compare/ui/CompareUnivBarChart";
import { CompareUnivRaderChart } from "@/features/chart-compare/ui/CompareUnivRaderChart";
import { UniversityCard } from "@/features/university-compare/ui/UniversityCard";
import type { UniversitySearch } from "@/features/university-search/model/universitysearch";
import { SearchUniversityToCompare } from "@/features/university-search/ui/SearchUniversityToCompare";
import { COMPARE_UNIVERSITY_TEXTS } from "@/pages/compare/text";

const u1: University = {
  id: 100,
  name: "충남대학교",
  address: "대전광역시 유성구 대학로 99",
  tel: "042-821-5114",
  rating: 4.4,
  tags: ["캠퍼스 쾌적", "교통 편리", "동아리 활발"],
  food: 4.2,
  dorm: 4.0,
  campus: 3.8,
  conv: 4.1,
  welfare: 4.3,
} as unknown as University;
const u2: University = {
  id: 200,
  name: "경북대학교",
  address: "대구광역시 북구 대학로 80",
  tel: "053-950-5114",
  rating: 4.1,
  tags: ["장학 혜택", "연구 인프라", "동아리 多"],
  food: 3.7,
  dorm: 3.5,
  campus: 4.5,
  conv: 3.6,
  welfare: 3.9,
} as unknown as University;

const upool: UniversitySearch[] = [
  { name: "충남대학교", address: "대전 유성구 대학로 99", id: "" },
  { name: "경북대학교", address: "대구 북구 대학로 80", id: "" },
];

function MockedCompareUniversityPage() {
  const [compared, setCompared] = useState<University[]>([u1, u2]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(
    () =>
      query.trim()
        ? upool.filter((u) => u.name.includes(query) || u.address?.includes(query ?? ""))
        : [],
    [query],
  );

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-8 bg-slate-900 text-white min-h-screen">
      <style>
        {`
          svg text, svg tspan { fill: #ffffff !important; stroke: #0f172a; stroke-width: 3px; paint-order: stroke; isolation: isolate; }
          svg { background-color: #0f172a; }
        `}
      </style>

      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
          {COMPARE_UNIVERSITY_TEXTS.pageTitle}
        </h1>
        <p className="mt-2 text-slate-300">{COMPARE_UNIVERSITY_TEXTS.pageSubtitle}</p>
      </header>

      <div className="mt-16 space-y-8">
        <SearchUniversityToCompare
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
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              {compared.map((univ) => (
                <UniversityCard
                  key={univ.id}
                  university={univ}
                  onRemove={() => setCompared((prev) => prev.filter((u) => u.id !== univ.id))}
                />
              ))}
            </div>

            <div aria-hidden="true" role="presentation" inert>
              <CompareUnivRaderChart universities={compared} />
            </div>
            <div aria-hidden="true" role="presentation" inert>
              <CompareUnivBarChart universities={compared} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const meta: Meta<typeof MockedCompareUniversityPage> = {
  title: "Pages/CompareUniversityPage",
  component: MockedCompareUniversityPage,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark" },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
    docs: {
      description: {
        component: "대학교 비교 페이지-> 카드/레이더/바 차트를 즉시 확인",
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
type Story = StoryObj<typeof MockedCompareUniversityPage>;

export const Playground: Story = {
  parameters: { a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } } },
};

export const EmptyState: Story = {
  render: () => {
    return (
      <div className="mx-auto max-w-4xl p-4 sm:p-8 bg-slate-900 text-white min-h-screen">
        <style>
          {`
            svg text, svg tspan { fill: #ffffff !important; stroke: #0f172a; stroke-width: 3px; paint-order: stroke; isolation: isolate; }
            svg { background-color: #0f172a; }
          `}
        </style>

        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
            {COMPARE_UNIVERSITY_TEXTS.pageTitle}
          </h1>
          <p className="mt-2 text-slate-300">{COMPARE_UNIVERSITY_TEXTS.pageSubtitle}</p>
        </header>
        <div className="mt-16">
          <SearchUniversityToCompare
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
  parameters: { a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } } },
};

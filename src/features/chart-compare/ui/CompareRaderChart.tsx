import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import type { Professor } from "@/entities/professor/model/professors.domain";
import { COMPARE_RADER_CHART_TEXTS } from "@/features/chart-compare/ui/text";
import { ChartContainer } from "@/shared/ui/chart";
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardFooter,
  GlassCardHeader,
  GlassCardTitle,
} from "@/shared/ui/GlassCard";

type props = {
  professors: Professor[];
};

type ProfessorStatKey =
  | "homework"
  | "lecDifficulty"
  | "examDifficulty"
  | "thesisPerf"
  | "researchPerf";

export const CompareRaderChart = ({ professors }: props) => {
  const categories = [
    { key: "homework", label: COMPARE_RADER_CHART_TEXTS.categories.homework },
    { key: "lecDifficulty", label: COMPARE_RADER_CHART_TEXTS.categories.lecDifficulty },
    { key: "examDifficulty", label: COMPARE_RADER_CHART_TEXTS.categories.examDifficulty },
    { key: "thesisPerf", label: COMPARE_RADER_CHART_TEXTS.categories.thesisPerf },
    { key: "researchPerf", label: COMPARE_RADER_CHART_TEXTS.categories.researchPerf },
  ];

  const chartData = categories.map((cat) => {
    const row: Record<string, string | number> = { category: cat.label };
    professors.forEach((prof) => {
      row[prof.name] = prof[cat.key as ProfessorStatKey] ?? 0;
    });
    return row;
  });

  const colors = ["#3b82f6", "#ef4444", "#22c55e"];

  return (
    <GlassCard shine={false}>
      <GlassCardHeader className="items-center pb-4 relative z-10">
        <GlassCardTitle className="inline-block rounded-md px-3 py-1.5 text-white">
          {COMPARE_RADER_CHART_TEXTS.title}
        </GlassCardTitle>
        <GlassCardDescription className="mt-2 inline-block rounded-md px-3 py-1 text-slate-200">
          {COMPARE_RADER_CHART_TEXTS.description}
        </GlassCardDescription>
      </GlassCardHeader>

      <GlassCardContent className="pb-0">
        <ChartContainer className="mx-auto aspect-square max-h-[500px] w-full bg-black" config={{}}>
          <ResponsiveContainer width="100%" height="100%" className="bg-black rounded-lg">
            <RadarChart data={chartData}>
              <rect width="100%" height="100%" fill="#000000" />
              <Tooltip
                cursor={false}
                contentStyle={{
                  background: "#000000",
                  border: "1px solid #262626",
                  borderRadius: 10,
                  color: "#ffffff",
                }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 5]}
                tickCount={6}
                stroke="#52525b"
                tick={{ fill: "#e4e4e7", fontSize: 11, dy: 5 }}
              />
              <PolarAngleAxis dataKey="category" tick={{ fill: "#ffffff", fontSize: 15 }} />
              <PolarGrid strokeWidth={1} stroke="#525252" />
              {professors.map((prof, index) => (
                <Radar
                  key={prof.id}
                  dataKey={prof.name}
                  name={prof.name}
                  stroke={colors[index % colors.length]}
                  fill={colors[index % colors.length]}
                  fillOpacity={0.4}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </GlassCardContent>

      <GlassCardFooter className="relative z-10 flex-col items-start gap-2 text-sm rounded-md px-3 py-2">
        <div className="flex items-center gap-4 flex-wrap">
          {professors.map((prof, index) => (
            <div key={prof.id} className="flex items-center gap-1.5">
              <div
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span>{prof.name}</span>
            </div>
          ))}
        </div>
      </GlassCardFooter>
    </GlassCard>
  );
};

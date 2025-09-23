import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import type { Professor } from "@/entities/professor/model/professors";
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
  | "gradeDistribution"
  | "researchPerf";

export const CompareRaderChart = ({ professors }: props) => {
  const categories = [
    { key: "homework", label: COMPARE_RADER_CHART_TEXTS.categories.homework },
    { key: "lecDifficulty", label: COMPARE_RADER_CHART_TEXTS.categories.lecDifficulty },
    { key: "examDifficulty", label: COMPARE_RADER_CHART_TEXTS.categories.examDifficulty },
    { key: "gradeDistribution", label: COMPARE_RADER_CHART_TEXTS.categories.gradeDistribution },
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
      <GlassCardHeader className="items-center pb-4">
        <GlassCardTitle>{COMPARE_RADER_CHART_TEXTS.title}</GlassCardTitle>
        <GlassCardDescription>{COMPARE_RADER_CHART_TEXTS.description}</GlassCardDescription>
      </GlassCardHeader>

      <GlassCardContent className="pb-0">
        <ChartContainer
          className="mx-auto aspect-square max-h-[500px] w-full bg-transparent"
          config={{}}
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              data={chartData}
              outerRadius="100%"
              margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
            >
              <Tooltip
                cursor={false}
                contentStyle={{
                  background: "rgba(24,24,27,0.9)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 10,
                  color: "#fff",
                }}
              />
              <PolarAngleAxis dataKey="category" />
              <PolarGrid strokeWidth={1} />

              {/* 교수별 Radar */}
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

      <GlassCardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-4">
          {professors.map((prof, index) => (
            <div key={prof.id} className="flex items-center gap-1.5">
              <div
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{
                  backgroundColor: colors[index % colors.length],
                }}
              />
              <span>{prof.name}</span>
            </div>
          ))}
        </div>
      </GlassCardFooter>
    </GlassCard>
  );
};

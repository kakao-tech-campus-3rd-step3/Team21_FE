import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts";

import type { Professor } from "@/entities/professor/model/professors";
import { compareRaderChartTexts } from "@/features/chart-compare/texts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/ui/chart";
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardFooter,
  GlassCardHeader,
  GlassCardTitle,
} from "@/shared/ui/GlassCard";

type CompareRaderChartProps = {
  professors: Professor[];
};

export const CompareRaderChart = ({ professors }: CompareRaderChartProps) => {
  const chartData = [
    {
      category: compareRaderChartTexts.categories.homework,
      p1: professors[0]?.homework ?? 0,
      p2: professors[1]?.homework ?? 0,
    },
    {
      category: compareRaderChartTexts.categories.lecDifficulty,
      p1: professors[0]?.lecDifficulty ?? 0,
      p2: professors[1]?.lecDifficulty ?? 0,
    },
    {
      category: compareRaderChartTexts.categories.examDifficulty,
      p1: professors[0]?.examDifficulty ?? 0,
      p2: professors[1]?.examDifficulty ?? 0,
    },
    {
      category: compareRaderChartTexts.categories.gradeDistribution,
      p1: professors[0]?.gradeDistribution ?? 0,
      p2: professors[1]?.gradeDistribution ?? 0,
    },
    {
      category: compareRaderChartTexts.categories.researchPerf,
      p1: professors[0]?.researchPerf ?? 0,
      p2: professors[1]?.researchPerf ?? 0,
    },
  ];

  return (
    <GlassCard>
      <GlassCardHeader className="items-center pb-4">
        <GlassCardTitle>{compareRaderChartTexts.title}</GlassCardTitle>
        <GlassCardDescription>{compareRaderChartTexts.description}</GlassCardDescription>
      </GlassCardHeader>

      <GlassCardContent className="pb-0">
        <ChartContainer className="mx-auto aspect-square max-h-[400px] w-full" config={{}}>
          <ResponsiveContainer width="100%" height="80%">
            <RadarChart
              data={chartData}
              outerRadius="70%"
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

              <PolarAngleAxis dataKey="category" />
              <PolarGrid />

              {/* 교수별 Radar */}
              {professors.map((prof, index) => (
                <Radar
                  key={prof.id}
                  dataKey={`p${index + 1}`}
                  name={prof.name}
                  stroke={`var(--chart-${index + 1})`}
                  fill={`var(--chart-${index + 1})`}
                  fillOpacity={0.3}
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
                style={{ backgroundColor: `var(--chart-${index + 1})` }}
              />
              <span>{prof.name}</span>
            </div>
          ))}
        </div>
      </GlassCardFooter>
    </GlassCard>
  );
};

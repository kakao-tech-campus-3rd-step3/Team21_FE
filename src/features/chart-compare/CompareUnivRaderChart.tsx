import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts";

import type { University } from "@/entities/university/model/university";
import { COMPARE_UNIV_RADER_CHART_TEXTS } from "@/features/chart-compare/ui/text";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/ui/chart";
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardFooter,
  GlassCardHeader,
  GlassCardTitle,
} from "@/shared/ui/GlassCard";

type Props = {
  universities: University[];
};

export const CompareUnivRaderChart = ({ universities }: Props) => {
  const chartData = [
    {
      category: COMPARE_UNIV_RADER_CHART_TEXTS.categories.research,
      u1: universities[0]?.research ?? 0,
      u2: universities[1]?.research ?? 0,
    },
    {
      category: COMPARE_UNIV_RADER_CHART_TEXTS.categories.employment,
      u1: universities[0]?.employment ?? 0,
      u2: universities[1]?.employment ?? 0,
    },
    {
      category: COMPARE_UNIV_RADER_CHART_TEXTS.categories.facilities,
      u1: universities[0]?.facilities ?? 0,
      u2: universities[1]?.facilities ?? 0,
    },
    {
      category: COMPARE_UNIV_RADER_CHART_TEXTS.categories.studentSupport,
      u1: universities[0]?.studentSupport ?? 0,
      u2: universities[1]?.studentSupport ?? 0,
    },
    {
      category: COMPARE_UNIV_RADER_CHART_TEXTS.categories.globalization,
      u1: universities[0]?.globalization ?? 0,
      u2: universities[1]?.globalization ?? 0,
    },
  ];

  return (
    <GlassCard shine={false}>
      <GlassCardHeader className="items-center pb-4">
        <GlassCardTitle>{COMPARE_UNIV_RADER_CHART_TEXTS.title}</GlassCardTitle>
        <GlassCardDescription>{COMPARE_UNIV_RADER_CHART_TEXTS.description}</GlassCardDescription>
      </GlassCardHeader>

      <GlassCardContent className="pb-0">
        <ChartContainer
          className="mx-auto aspect-square max-h-[500px] w-full bg-transparent"
          config={{}}
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              data={chartData}
              outerRadius="80%"
              margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
            >
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis dataKey="category" />
              <PolarGrid radialLines={false} polarRadius={[160]} strokeWidth={1} />

              {/* 대학별 Radar */}
              {universities.map((univ, index) => (
                <Radar
                  key={univ.id}
                  dataKey={`u${index + 1}`}
                  name={univ.name}
                  stroke={index === 0 ? "var(--chart-2)" : "oklch(0.627 0.265 303.9)"}
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
          {universities.map((univ, index) => (
            <div key={univ.id} className="flex items-center gap-1.5">
              <div
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{
                  backgroundColor: index === 0 ? "var(--chart-2)" : "oklch(0.627 0.265 303.9)",
                }}
              />
              <span>{univ.name}</span>
            </div>
          ))}
        </div>
      </GlassCardFooter>
    </GlassCard>
  );
};

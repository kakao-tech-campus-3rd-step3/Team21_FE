import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

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
  const colors = ["#3b82f6", "#ef4444", "#22c55e"];
  const u1Color = colors[0];
  const u2Color = colors[1];
  const u1Name = universities[0]?.name ?? "University 1";
  const u2Name = universities[1]?.name ?? "University 2";
  const chartConfig = {
    u1: { label: u1Name, color: u1Color },
    u2: { label: u2Name, color: u2Color },
  } as const;
  const chartData = [
    {
      category: COMPARE_UNIV_RADER_CHART_TEXTS.categories.food,
      u1: universities[0]?.food ?? 0,
      u2: universities[1]?.food ?? 0,
    },
    {
      category: COMPARE_UNIV_RADER_CHART_TEXTS.categories.dorm,
      u1: universities[0]?.dorm ?? 0,
      u2: universities[1]?.dorm ?? 0,
    },
    {
      category: COMPARE_UNIV_RADER_CHART_TEXTS.categories.campus,
      u1: universities[0]?.campus ?? 0,
      u2: universities[1]?.campus ?? 0,
    },
    {
      category: COMPARE_UNIV_RADER_CHART_TEXTS.categories.conv,
      u1: universities[0]?.conv ?? 0,
      u2: universities[1]?.conv ?? 0,
    },
    {
      category: COMPARE_UNIV_RADER_CHART_TEXTS.categories.welfare,
      u1: universities[0]?.welfare ?? 0,
      u2: universities[1]?.welfare ?? 0,
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
          config={chartConfig}
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData} outerRadius={160}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis dataKey="category" tick={{ dy: -10 }} />
              <PolarGrid strokeWidth={1} />
              <PolarRadiusAxis angle={90} domain={[0, 5]} tickCount={6} />

              {/* 대학별 Radar */}
              {universities.map((univ, index) => (
                <Radar
                  key={univ.id}
                  dataKey={`u${index + 1}`}
                  name={univ.name}
                  stroke={index === 0 ? u1Color : u2Color}
                  fill={index === 0 ? u1Color : u2Color}
                  fillOpacity={0.5}
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
                  backgroundColor: index === 0 ? u1Color : u2Color,
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

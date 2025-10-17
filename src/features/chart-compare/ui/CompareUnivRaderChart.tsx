import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import type { University } from "@/entities/university/model/university";
import { COMPARE_UNIV_RADER_CHART_TEXTS } from "@/features/chart-compare/ui/text";
import { ChartContainer } from "@/shared/ui/chart";
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
      <GlassCardHeader className="items-center pb-4 relative z-30">
        <GlassCardTitle>{COMPARE_UNIV_RADER_CHART_TEXTS.title}</GlassCardTitle>
        <GlassCardDescription>{COMPARE_UNIV_RADER_CHART_TEXTS.description}</GlassCardDescription>
      </GlassCardHeader>

      <GlassCardContent className="pb-0">
        <ChartContainer
          className="mx-auto aspect-square max-h-[500px] w-full rounded-lg bg-black p-3"
          config={chartConfig}
        >
          <ResponsiveContainer width="100%" height="100%">
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
                tick={{ fill: "#e4e4e7", fontSize: 11, dy: 6 }}
              />
              <PolarAngleAxis dataKey="category" tick={{ fill: "#ffffff", fontSize: 15 }} />
              <PolarGrid strokeWidth={1} stroke="#3f3f46" />

              {universities.slice(0, 2).map((univ, index) => (
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

      <GlassCardFooter className="relative z-30 flex-col items-start gap-2 text-sm px-3 py-2">
        <div className="flex items-center gap-4 flex-wrap">
          {universities.slice(0, 2).map((univ, index) => (
            <div key={univ.id} className="flex items-center gap-1.5">
              <div
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: index === 0 ? u1Color : u2Color }}
              />
              <span className="inline-block rounded-md px-1.5 py-0.5 text-white leading-tight">
                {univ.name}
              </span>
            </div>
          ))}
        </div>
      </GlassCardFooter>
    </GlassCard>
  );
};

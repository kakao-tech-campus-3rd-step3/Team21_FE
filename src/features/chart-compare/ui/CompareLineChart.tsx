import { Legend, Line, LineChart, ResponsiveContainer, XAxis } from "recharts";

import type { Professor } from "@/entities/professor/model/professors";
import { COMPARE_LINE_CHART_TEXTS } from "@/features/chart-compare/ui/text";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/ui/chart";
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/shared/ui/GlassCard";
type CompareLineChartProps = {
  professors: Professor[];
};

const chartData = [
  { year: 2020, p1: 186, p2: 80 },
  { year: 2021, p1: 305, p2: 200 },
  { year: 2022, p1: 237, p2: 120 },
  { year: 2023, p1: 73, p2: 190 },
  { year: 2024, p1: 209, p2: 130 },
  { year: 2025, p1: 214, p2: 140 },
];

export const CompareLineChart = ({ professors }: CompareLineChartProps) => (
  <GlassCard shine={false}>
    <GlassCardHeader>
      <GlassCardTitle className="text-center">{COMPARE_LINE_CHART_TEXTS.title}</GlassCardTitle>
      <GlassCardDescription className="text-center">
        {COMPARE_LINE_CHART_TEXTS.description}
      </GlassCardDescription>
    </GlassCardHeader>

    <GlassCardContent className="h-80">
      <ChartContainer config={{}} className="h-full bg-transparent">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
            <XAxis
              dataKey="year"
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--foreground)", fontSize: 12 }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            {professors.map((prof, index) => (
              <Line
                key={prof.id}
                dataKey={index === 0 ? "p1" : "p2"}
                name={prof.name}
                type="monotone"
                stroke={index === 0 ? "var(--chart-2)" : "oklch(0.627 0.265 303.9)"}
                strokeWidth={2}
                dot={false}
              />
            ))}

            <Legend verticalAlign="top" align="right" />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </GlassCardContent>
  </GlassCard>
);

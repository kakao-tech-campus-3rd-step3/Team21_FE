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
  { year: "1학년 1학기", p1: 186, p2: 80 },
  { year: "1학년 2학기", p1: 305, p2: 200 },
  { year: "2학년 1학기", p1: 237, p2: 120 },
  { year: "2학년 2학기", p1: 73, p2: 190 },
  { year: "3학년 1학기", p1: 209, p2: 130 },
  { year: "3학년 2학기", p1: 214, p2: 140 },
  { year: "4학년 1학기", p1: 29, p2: 130 },
  { year: "4학년 2학기", p1: 214, p2: 14 },
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
              scale="point"
              tickLine={false}
              axisLine={false}
              interval={0}
              tick={{ fill: "var(--foreground)", fontSize: 12 }}
              padding={{ left: 20, right: 20 }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            {professors.map((prof, index) => (
              <Line
                key={prof.id}
                dataKey={index === 0 ? "p1" : "p2"}
                name={prof.name}
                type="linear"
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

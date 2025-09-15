import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { chartData } from "@/__MOCK__/mockData";
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
            <YAxis
              tickCount={6}
              tickFormatter={(_, index) => String(index)}
              tick={{ fill: "var(--foreground)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <CartesianGrid stroke="rgb(233, 230, 230)" strokeDasharray="0" vertical={false} />

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

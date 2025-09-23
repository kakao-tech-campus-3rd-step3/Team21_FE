import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { chartData } from "@/__MOCK__/mockData";
import type { Professor } from "@/entities/professor/model/professors";
import { COMPARE_LINE_CHART_TEXTS } from "@/features/chart-compare/ui/text";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/ui/chart";
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardFooter,
  GlassCardHeader,
  GlassCardTitle,
} from "@/shared/ui/GlassCard";
type CompareLineChartProps = {
  professors: Professor[];
};

export const CompareLineChart = ({ professors }: CompareLineChartProps) => {
  const colors = ["#3b82f6", "#ef4444", "#22c55e"];
  return (
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

              {professors.map((prof, index) => {
                return (
                  <Line
                    key={prof.id}
                    dataKey={prof.name}
                    name={prof.name}
                    type="linear"
                    stroke={colors[index % colors.length]}
                    strokeWidth={2}
                    dot={false}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </GlassCardContent>

      <GlassCardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-4">
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

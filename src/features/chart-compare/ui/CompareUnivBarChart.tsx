import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { univChartData } from "@/__MOCK__/mockData";
import type { University } from "@/entities/university/model/university";
import { COMPARE_UNIV_LINE_CHART_TEXTS as TEXTS } from "@/features/chart-compare/ui/text";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart";
import {
  GlassCard,
  GlassCardContent,
  GlassCardFooter,
  GlassCardHeader,
  GlassCardTitle,
} from "@/shared/ui/GlassCard";

type Props = { universities: University[] };

export function CompareUnivBarChart({ universities }: Props) {
  const hasU2 = universities.length > 1;
  const u1Name = universities[0]?.name ?? "University 1";
  const u2Name = hasU2 ? (universities[1]?.name ?? "University 2") : undefined;

  const chartData = univChartData.map((d) => ({
    year: String(d.year),
    u1: d.u1 ?? 0,
    u2: d.u2 ?? 0,
  }));

  const colors = ["#3b82f6", "#ef4444", "#22c55e"];
  const u1Color = colors[0];
  const u2Color = colors[1];

  const chartConfig: ChartConfig = hasU2
    ? { u1: { label: u1Name, color: u1Color }, u2: { label: u2Name!, color: u2Color } }
    : { u1: { label: u1Name, color: u1Color } };

  const isTwo = hasU2;

  return (
    <GlassCard shine={false}>
      <GlassCardHeader>
        <GlassCardTitle className="text-center">{TEXTS.title}</GlassCardTitle>
      </GlassCardHeader>

      <GlassCardContent className="h-100">
        <ChartContainer
          config={chartConfig}
          className="h-full bg-transparent"
          style={
            {
              ["--color-u1"]: u1Color,
              ["--color-u2"]: u2Color,
            } as React.CSSProperties
          }
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              stackOffset={isTwo ? "expand" : undefined}
              margin={{ left: 12, right: 0, top: 8, bottom: 8 }}
              barCategoryGap="20%"
              barGap={4}
            >
              <CartesianGrid vertical={false} />
              <XAxis type="number" hide />
              <YAxis
                dataKey="year"
                type="category"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                width={64}
                interval={0}
              />
              <ChartTooltip
                cursor={false}
                labelFormatter={(label) => `Year: ${label}`}
                formatter={(value, name) => [`${value}`, String(name)]}
                content={<ChartTooltipContent />}
              />
              <Bar
                dataKey="u1"
                name={u1Name}
                stackId={hasU2 ? "a" : undefined}
                fill="var(--color-u1)"
                radius={[0, 0, 4, 4]}
              />
              {hasU2 && (
                <Bar
                  dataKey="u2"
                  name={u2Name}
                  stackId="a"
                  fill="var(--color-u2)"
                  radius={[4, 4, 0, 0]}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </GlassCardContent>

      <GlassCardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: u1Color }} />
            <span>{u1Name}</span>
          </div>
          {hasU2 && (
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: u2Color }} />
              <span>{u2Name}</span>
            </div>
          )}
        </div>
      </GlassCardFooter>
    </GlassCard>
  );
}

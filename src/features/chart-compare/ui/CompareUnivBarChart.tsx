import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import type {
  University,
  UniversityTrendRow,
} from "@/entities/university/model/university-compare.domain";
import { COMPARE_UNIV_LINE_CHART_TEXTS as TEXTS } from "@/features/chart-compare/ui/text";
import { type ChartConfig, ChartContainer } from "@/shared/ui/chart";
import {
  GlassCard,
  GlassCardContent,
  GlassCardFooter,
  GlassCardHeader,
  GlassCardTitle,
} from "@/shared/ui/GlassCard";

type Props = { universities: University[]; rows: UniversityTrendRow[] };

export function CompareUnivBarChart({ universities, rows }: Props) {
  const hasU2 = universities.length > 1;
  const u1Name = universities[0]?.name ?? "University 1";
  const u2Name = hasU2 ? (universities[1]?.name ?? "University 2") : undefined;

  const chartData = rows.map((r) => ({
    year: r.year,
    u1: r.u1 ?? 0,
    u2: r.u2 ?? 0,
  }));

  const colors = ["#3b82f6", "#ef4444"];
  const u1Color = colors[0];
  const u2Color = colors[1];

  const chartConfig: ChartConfig = hasU2
    ? { u1: { label: u1Name, color: u1Color }, u2: { label: u2Name!, color: u2Color } }
    : { u1: { label: u1Name, color: u1Color } };

  return (
    <GlassCard shine={false}>
      <GlassCardHeader className="relative z-10">
        <GlassCardTitle className="text-center">{TEXTS.title}</GlassCardTitle>
      </GlassCardHeader>

      <GlassCardContent className="relative z-0 h-100">
        <ChartContainer
          config={chartConfig}
          className="h-full rounded-lg bg-black p-3"
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
              stackOffset={hasU2 ? "expand" : undefined}
              margin={{ left: 12, right: 0, top: 8, bottom: 8 }}
              barCategoryGap="20%"
              barGap={4}
            >
              <CartesianGrid
                vertical={false}
                stroke="#000000"
                strokeDasharray="0"
                strokeWidth={1}
              />
              <XAxis type="number" hide />
              <YAxis
                dataKey="year"
                type="category"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                width={64}
                interval={0}
                tick={{ fill: "#ffffff", fontSize: 12 }}
              />
              <Tooltip
                cursor={false}
                contentStyle={{
                  background: "#000000",
                  border: "1px solid #262626",
                  borderRadius: 10,
                  color: "#ffffff",
                }}
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

      <GlassCardFooter className="relative z-10 flex-col items-start gap-2 text-sm">
        <div className="relatice z-10 flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: u1Color }} />
            <span className="relative z-20 inline-block rounded-md px-1.5 py-0.5 text-white">
              {u1Name}
            </span>
          </div>
          {hasU2 && (
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: u2Color }} />
              <span className="relative z-20 inline-block rounded-md px-1.5 py-0.5 text-white">
                {u2Name}
              </span>
            </div>
          )}
        </div>
      </GlassCardFooter>
    </GlassCard>
  );
}

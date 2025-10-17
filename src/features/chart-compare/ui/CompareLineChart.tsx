import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { buildSemesterLineChartData } from "@/entities/professor/model/prof-compare.map";
import type { Professor } from "@/entities/professor/model/professors.domain";
import { COMPARE_LINE_CHART_TEXTS } from "@/features/chart-compare/ui/text";
import { ChartContainer } from "@/shared/ui/chart";
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
  console.log(
    "semesters",
    professors.map((p) => ({ name: p.name, len: p.semesters?.length })),
  );

  const colors = ["#3b82f6", "#ef4444", "#22c55e"];

  const data = useMemo(() => buildSemesterLineChartData(professors), [professors]);
  return (
    <GlassCard shine={false}>
      <GlassCardHeader>
        <GlassCardTitle className="relative z-10 isolate inline-block rounded-md px-3 py-1.5 text-lg font-semibold text-white">
          {COMPARE_LINE_CHART_TEXTS.title}
        </GlassCardTitle>
        <GlassCardDescription className="relative z-10 mt-2 inline-block rounded-md px-3 py-1 text-sm text-slate-200">
          {COMPARE_LINE_CHART_TEXTS.description}
        </GlassCardDescription>
      </GlassCardHeader>

      <GlassCardContent className="h-80">
        <ChartContainer config={{}} className="h-full rounded-lg bg-black p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ left: 12, right: 12 }}
              aria-hidden="true"
              role="presentation"
              tabIndex={-1}
            >
              <XAxis
                dataKey="semester"
                allowDecimals={false}
                scale="point"
                tickLine={false}
                axisLine={false}
                interval={0}
                tick={{ fill: "#ffffff", fontSize: 12 }}
                padding={{ left: 20, right: 20 }}
              />
              <YAxis
                domain={[0, 5]}
                ticks={[0, 1, 2, 3, 4, 5]}
                tick={{ fill: "#ffffff", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              {/* 대비 강화 */}
              <CartesianGrid stroke="#525252" strokeDasharray="0" vertical={false} />

              <Tooltip
                cursor={false}
                contentStyle={{
                  background: "#000000",
                  border: "1px solid #262626",
                  borderRadius: 10,
                  color: "#ffffff",
                }}
              />

              {professors.map((prof, index) => (
                <Line
                  key={prof.id}
                  dataKey={prof.name}
                  name={prof.name}
                  type="linear"
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </GlassCardContent>

      <GlassCardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-4">
          {professors.map((prof, index) => (
            <div key={prof.id} className="relative z-10 flex items-center gap-1.5">
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

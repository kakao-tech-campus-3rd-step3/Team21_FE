import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { univChartData } from "@/__MOCK__/mockData";
import type { Professor } from "@/entities/professor/model/professors";
import type { University } from "@/entities/university/model/university";
import {
  COMPARE_LINE_CHART_TEXTS,
  COMPARE_UNIV_LINE_CHART_TEXTS,
} from "@/features/chart-compare/ui/text";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/ui/chart";
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/shared/ui/GlassCard";

//공통 제네릭
type GenericCompareLineChartProps<T> = {
  items: T[];
  getName: (item: T) => string;
  dataKeys: string[];
  title: string;
  description: string;
};

function GenericCompareLineChart<T>({
  items,
  getName,
  dataKeys,
  title,
  description,
}: GenericCompareLineChartProps<T>) {
  return (
    <GlassCard shine={false}>
      <GlassCardHeader>
        <GlassCardTitle className="text-center">{title}</GlassCardTitle>
        <GlassCardDescription className="text-center">{description}</GlassCardDescription>
      </GlassCardHeader>

      <GlassCardContent className="h-80">
        <ChartContainer config={{}} className="h-full bg-transparent">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={univChartData} margin={{ left: 12, right: 12 }}>
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

              {items.map((item, index) => (
                <Line
                  key={getName(item)}
                  dataKey={dataKeys[index]}
                  name={getName(item)}
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
}
//교수
type CompareProfessorLineChartProps = {
  professors: Professor[];
};

export const CompareLineChart = ({ professors }: CompareProfessorLineChartProps) => (
  <GenericCompareLineChart
    items={professors}
    getName={(p) => p.name}
    dataKeys={["p1", "p2"]}
    title={COMPARE_LINE_CHART_TEXTS.title}
    description={COMPARE_LINE_CHART_TEXTS.description}
  />
);

//대학
type CompareUniversityLineChartProps = {
  universities: University[];
};

export const CompareUniversityLineChart = ({ universities }: CompareUniversityLineChartProps) => (
  <GenericCompareLineChart
    items={universities}
    getName={(u) => u.name}
    dataKeys={["u1", "u2"]}
    title={COMPARE_UNIV_LINE_CHART_TEXTS.title}
    description={COMPARE_UNIV_LINE_CHART_TEXTS.description}
  />
);

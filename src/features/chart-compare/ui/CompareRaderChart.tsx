import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts";

import type { Professor } from "@/entities/professor/model/professors";
import type { University } from "@/entities/university/model/university";
import {
  COMPARE_RADER_CHART_TEXTS,
  COMPARE_UNIV_RADER_CHART_TEXTS,
} from "@/features/chart-compare/ui/text";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/ui/chart";
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardFooter,
  GlassCardHeader,
  GlassCardTitle,
} from "@/shared/ui/GlassCard";

type GenericCompareRadarChartProps<T> = {
  items: T[];
  categories: { [key: string]: string };
  getName: (item: T) => string;
  getValues: (item: T) => Record<string, number | undefined>;
  title: string;
  description: string;
};

function GenericCompareRaderChart<T>({
  items,
  categories,
  getName,
  getValues,
  title,
  description,
}: GenericCompareRadarChartProps<T>) {
  // chartData 구성
  const chartData = Object.entries(categories).map(([key, label]) => {
    const values: Record<string, number> = {};
    items.forEach((item, index) => {
      const value = getValues(item)[key] ?? 0;
      values[`p${index + 1}`] = value;
    });
    return {
      category: label,
      ...values,
    };
  });

  return (
    <GlassCard shine={false}>
      <GlassCardHeader className="items-center pb-4">
        <GlassCardTitle>{title}</GlassCardTitle>
        <GlassCardDescription>{description}</GlassCardDescription>
      </GlassCardHeader>

      <GlassCardContent className="pb-0">
        <ChartContainer
          className="mx-auto aspect-square max-h-[400px] w-full bg-transparent"
          config={{}}
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData} outerRadius="90%">
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis dataKey="category" />
              <PolarGrid radialLines={false} polarRadius={[155]} strokeWidth={1} />
              {items.map((item, index) => (
                <Radar
                  key={getName(item)}
                  dataKey={`p${index + 1}`}
                  name={getName(item)}
                  stroke={index === 0 ? "var(--chart-2)" : "oklch(0.627 0.265 303.9)"}
                  fill={`var(--chart-${index + 1})`}
                  fillOpacity={0.3}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </GlassCardContent>

      <GlassCardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-4">
          {items.map((item, index) => (
            <div key={getName(item)} className="flex items-center gap-1.5">
              <div
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{
                  backgroundColor: index === 0 ? "var(--chart-2)" : "oklch(0.627 0.265 303.9)",
                }}
              />
              <span>{getName(item)}</span>
            </div>
          ))}
        </div>
      </GlassCardFooter>
    </GlassCard>
  );
}

//교수
type CompareProfessorRadarChartProps = {
  professors: Professor[];
};

export const CompareRaderChart = ({ professors }: CompareProfessorRadarChartProps) => (
  <GenericCompareRaderChart
    items={professors}
    categories={COMPARE_RADER_CHART_TEXTS.categories}
    getName={(p) => p.name}
    getValues={(p) => ({
      homework: p.homework,
      lecDifficulty: p.lecDifficulty,
      examDifficulty: p.examDifficulty,
      gradeDistribution: p.gradeDistribution,
      researchPerf: p.researchPerf,
    })}
    title={COMPARE_RADER_CHART_TEXTS.title}
    description={COMPARE_RADER_CHART_TEXTS.description}
  />
);

//학교
type CompareUniversityRadarChartProps = {
  universities: University[];
};

export const CompareUniversityRaderChart = ({ universities }: CompareUniversityRadarChartProps) => (
  <GenericCompareRaderChart
    items={universities}
    categories={COMPARE_UNIV_RADER_CHART_TEXTS.categories}
    getName={(u) => u.name}
    getValues={(u) => ({
      food: u.food,
      dorm: u.dorm,
      conv: u.conv,
      campus: u.campus,
      welfare: u.welfare,
    })}
    title={COMPARE_UNIV_RADER_CHART_TEXTS.title}
    description={COMPARE_UNIV_RADER_CHART_TEXTS.description}
  />
);

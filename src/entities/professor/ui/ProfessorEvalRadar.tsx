import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { ValueType } from "recharts/types/component/DefaultTooltipContent";

import { profEvalAvg, profEvals } from "@/__MOCK__/mockData";
import { PROFESSOR_EVAL_AXES, type ProfessorEvalRow } from "@/entities/professor/model/eval.vm";
import { PROFESSOR_EVAL_TEXT } from "@/entities/professor/text";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type Props = { profId: number };

export function ProfessorEvalCard({ profId }: Props) {
  // TODO: api hook
  const src: Record<string, number> | undefined =
    profEvals.profId === profId ? profEvals : undefined;

  const avgSrc: Record<string, number> = profEvalAvg;

  const data: ProfessorEvalRow[] = PROFESSOR_EVAL_AXES.map(({ key, label }) => ({
    axis: label,
    value: Number(src?.[key] ?? 0),
    avg: Number(avgSrc?.[key] ?? 0),
  }));

  return (
    <Card className="relative overflow-hidden bg-zinc-900/60 border-zinc-800 backdrop-blur">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_80%_at_70%_50%,rgba(99,102,241,0.08),transparent_60%)]" />
      <CardHeader>
        <CardTitle className="text-base">{PROFESSOR_EVAL_TEXT.title}</CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="h-[460px] md:h-[540px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              data={data}
              margin={{ top: 48, right: 80, bottom: 56, left: 80 }}
              outerRadius="100%"
            >
              <PolarGrid gridType="polygon" stroke="rgba(255,255,255,0.16)" radialLines />
              <PolarAngleAxis
                dataKey="axis"
                tick={{ fill: "rgba(255,255,255,0.85)", fontSize: 13, dy: -12 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 10]}
                tickCount={6}
                axisLine={false}
                tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }}
                tickFormatter={(v: number | string) => (Number(v) % 2 === 0 ? String(v) : "")}
              />

              <Radar
                name={PROFESSOR_EVAL_TEXT.legend.average}
                dataKey="avg"
                stroke="#3b82f6"
                fill="rgba(59,130,246,0.22)"
                strokeWidth={2}
                dot={{ r: 3 }}
                isAnimationActive={false}
              />
              <Radar
                name={PROFESSOR_EVAL_TEXT.legend.professor}
                dataKey="value"
                stroke="#ef4444"
                fill="rgba(239,68,68,0.28)"
                strokeWidth={2}
                dot={{ r: 3 }}
                isAnimationActive={false}
              />

              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                iconSize={10}
                wrapperStyle={{ paddingTop: 10, color: "rgba(255,255,255,0.9)", fontSize: 13 }}
              />
              <Tooltip
                cursor={false}
                formatter={(v: ValueType) => [Number(v), PROFESSOR_EVAL_TEXT.tooltipUnit]}
                contentStyle={{
                  background: "rgba(24,24,27,0.9)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 10,
                  color: "#fff",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

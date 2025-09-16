import type { UniversityMainInfo } from "@/entities/university/model/university-maininfo.vm";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export function UniversityMainInfoSide({ data }: { data: UniversityMainInfo }) {
  const items = [
    { label: "캠퍼스 수", value: data.campuses },
    { label: "단과대학 수", value: data.colleges },
    { label: "학과 수", value: data.departments },
    { label: "재학생", value: data.students },
  ];

  return (
    <Card className="bg-zinc-900/60 border-zinc-800 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-base">주요 정보</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {items.map((it) => (
          <div
            key={it.label}
            className="rounded-lg border border-zinc-800 px-3 py-2 bg-zinc-950/40"
          >
            <div className="text-xs text-muted-foreground">{it.label}</div>
            <div className="mt-1 text-lg font-semibold">
              {typeof it.value === "number" ? it.value.toLocaleString() : it.value}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

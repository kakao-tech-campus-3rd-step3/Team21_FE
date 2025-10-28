import { Building2, GraduationCap, School, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type UniversityMainInfo = {
  campuses: number;
  colleges: number;
  departments: number;
  students: number;
};

export function UniversityMainInfoSide({ data }: { data: UniversityMainInfo }) {
  const items = [
    { label: "캠퍼스 수", value: data.campuses, icon: Building2 },
    { label: "단과대학 수", value: data.colleges, icon: School },
    { label: "학과 수", value: data.departments, icon: GraduationCap },
    { label: "재학생", value: data.students, icon: Users },
  ];

  return (
    <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">주요 정보</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <div key={it.label} className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-indigo-500" />
              <span>
                {it.label}: {typeof it.value === "number" ? it.value.toLocaleString() : it.value}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

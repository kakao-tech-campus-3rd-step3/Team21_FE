import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type Props = {
  collegeName: string;
  departmentName: string;
  intro: string;
  students: number;
  professors: number;
  foundedYear: number;
  logoUrl?: string;
};

export function DepartmentHero({
  collegeName,
  departmentName,
  intro,
  students,
  professors,
  foundedYear,
  logoUrl,
}: Props) {
  return (
    <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur shadow-md">
      <CardHeader className="pb-3 flex flex-row items-start gap-4">
        {logoUrl && (
          <img
            src={logoUrl}
            alt={`${departmentName} 로고`}
            className="h-10 w-10 rounded-md border border-zinc-700 bg-zinc-950 object-contain p-1"
          />
        )}
        <div className="flex-1">
          <div className="text-xs text-zinc-400">{collegeName}</div>
          <CardTitle className="text-2xl font-bold tracking-tight">{departmentName}</CardTitle>
          <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{intro}</p>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4 pt-0 text-center">
        <Stat label="재학생" value={`${students.toLocaleString()}명`} />
        <Stat label="교수진" value={`${professors}명`} />
        <Stat label="설립" value={`${foundedYear}년`} />
      </CardContent>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-600/60 bg-zinc-950/50 p-3">
      <div className="text-[11px] text-zinc-400">{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  );
}

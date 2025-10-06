import { CollegeGrid } from "@/entities/college";
import { useCollegesByUniversity } from "@/entities/college/hooks/useCollegesByUniversity";
import type { CollegeCard } from "@/entities/college/model/college-card.vm";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type Props = { univId: number };

export function CollegeSection({ univId }: Props) {
  const { data, isLoading, isError } = useCollegesByUniversity(univId);

  const items: CollegeCard[] = (data ?? []).map((c) => ({
    collegeSeq: c.id,
    name: c.name,
    description: c.intro,
    departmentCount: c.departmentCount,
  }));

  return (
    <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-xl">단과대학</CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-2">
        {isLoading && <div className="text-sm text-zinc-300">불러오는 중…</div>}
        {isError && (
          <div className="text-sm text-red-400">단과대학 정보를 불러오지 못했습니다.</div>
        )}
        {!isLoading && !isError && <CollegeGrid colleges={items} />}
      </CardContent>
    </Card>
  );
}

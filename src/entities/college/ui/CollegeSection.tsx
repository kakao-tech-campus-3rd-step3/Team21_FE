import { colleges } from "@/__MOCK__/mockData";
import { CollegeGrid } from "@/entities/college";
import type { CollegeCard } from "@/entities/college/model/college-card.vm";
import { Card, CardContent } from "@/shared/ui/card";

type Props = { univId: number };

export function CollegeSection({ univId }: Props) {
  // TODO: api hook 호출로 교체
  const items: CollegeCard[] = colleges
    .filter((c) => c.univSeq === univId)
    .map((c) => ({
      collegeSeq: c.collegeSeq,
      name: c.collegeName,
      description: c.description,
      departmentCount: c.departmentCnt,
    }));

  return (
    <Card className="bg-zinc-900/60 border-zinc-800 backdrop-blur">
      <CardContent className="px-4 py-2">
        <CollegeGrid colleges={items} />
      </CardContent>
    </Card>
  );
}

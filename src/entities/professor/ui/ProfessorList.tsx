import { Link } from "react-router-dom";

import { ProfessorCard } from "@/entities/professor/ui/ProfessorCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type Item = {
  id: number;
  name: string;
  rankLabel?: string;
  degree?: string;
  researchAreas?: string[];
  email?: string;
  office?: string;
  imageUrl?: string;
};

type Props = {
  title: string;
  items: Item[];
};

export function ProfessorList({ title, items }: Props) {
  const safeItems = Array.isArray(items) ? items : [];

  if (safeItems.length === 0) {
    return (
      <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-400">등록된 교수진이 없습니다.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {safeItems.map((p) => {
          const to = p.id > 0 ? `/professor/${p.id}` : undefined;
          const key = `prof-${p.id}`;

          return (
            <div key={key} className="relative">
              <ProfessorCard
                name={p.name}
                rankLabel={p.rankLabel ?? ""}
                degree={p.degree ?? ""}
                researchAreas={p.researchAreas ?? []}
                email={p.email}
                office={p.office}
              />
              {to && (
                <Link to={to} aria-label={`${p.name} 상세보기`} className="absolute inset-0" />
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

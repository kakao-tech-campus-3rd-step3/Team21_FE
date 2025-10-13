import { Link } from "react-router-dom";

import { ProfessorCard } from "@/entities/professor/ui/ProfessorCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type Item = {
  seq: number;
  name: string;
  rankLabel?: string;
  degree?: string;
  researchAreas?: string[];
  email?: string;
  office?: string;
};

type Props = {
  title: string;
  items: Item[];
};

export function ProfessorList({ title, items }: Props) {
  if (!items?.length) {
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
        {items.map((p) => (
          <Link
            key={p.seq}
            to={`/professor/${p.seq}`}
            className="block transition hover:opacity-90"
          >
            <ProfessorCard
              name={p.name}
              rankLabel={p.rankLabel ?? ""}
              degree={p.degree ?? ""}
              researchAreas={p.researchAreas ?? []}
              email={p.email ?? ""}
              office={p.office ?? ""}
            />
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

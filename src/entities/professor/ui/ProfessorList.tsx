import { Link } from "react-router-dom";

import { ProfessorCard } from "@/entities/professor/ui/ProfessorCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type Item = {
  name: string;
  rankLabel: string;
  degree: string;
  researchAreas: string[];
  email: string;
  office: string;
};

type Props = {
  title: string;
  items: Item[];
};

export function ProfessorList({ title, items }: Props) {
  return (
    <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((p) => (
          // TODO: api 호출로 교체
          <Link
            key={`${100}`}
            to={`/professor/${100}`}
            className="block transition hover:opacity-90"
          >
            <ProfessorCard
              name={p.name}
              rankLabel={p.rankLabel}
              degree={p.degree}
              researchAreas={p.researchAreas}
              email={p.email}
              office={p.office}
            />
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

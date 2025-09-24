import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { ProfessorCard } from "./ProfessorCard";

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
          <ProfessorCard
            key={`${p.name}-${p.email}`}
            name={p.name}
            rankLabel={p.rankLabel}
            degree={p.degree}
            researchAreas={p.researchAreas}
            email={p.email}
            office={p.office}
          />
        ))}
      </CardContent>
    </Card>
  );
}

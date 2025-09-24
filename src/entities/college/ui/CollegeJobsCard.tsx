import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type Props = { title: string; tags: string[] };

export function CollegeJobsCard({ title, tags }: Props) {
  return (
    <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span
            key={t}
            className="inline-flex items-center rounded-full border border-zinc-700 px-2 py-0.5 text-xs text-zinc-300"
          >
            {t}
          </span>
        ))}
      </CardContent>
    </Card>
  );
}

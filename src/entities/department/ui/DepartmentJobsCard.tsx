import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export function DepartmentJobsCard({ title, tags }: { title: string; tags: string[] }) {
  return (
    <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800/60 px-2.5 py-1 text-[11px] font-medium text-zinc-300"
          >
            {t}
          </span>
        ))}
      </CardContent>
    </Card>
  );
}

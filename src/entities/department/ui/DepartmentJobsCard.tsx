import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export function DepartmentJobsCard({ title, tags }: { title: string; tags: string[] }) {
  const validTags = tags.filter((t) => t && t.trim().length > 0);

  return (
    <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-2 text-sm">
        {validTags.length > 0 ? (
          validTags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800/60 px-2.5 py-1 text-[11px] font-medium text-zinc-300"
            >
              {t}
            </span>
          ))
        ) : (
          <p className="text-zinc-400 text-sm">등록된 키워드가 없습니다.</p>
        )}
      </CardContent>
    </Card>
  );
}

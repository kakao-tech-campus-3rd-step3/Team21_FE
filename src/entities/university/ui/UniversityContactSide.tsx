import type { UniversitySideContact } from "@/entities/university/model/university-contact.vm";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export function UniversityContactSide({ data }: { data: UniversitySideContact }) {
  const rows = [
    { label: "전화", value: data.tel },
    { label: "웹사이트", value: data.web },
    { label: "이메일", value: data.email },
  ].filter((r) => r.value);

  return (
    <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-xl">연락처</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-3 text-sm">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-3">
            <div className="text-xs text-muted-foreground">{r.label}</div>
            <div className="mt-1 font-medium truncate">
              {r.label === "웹사이트" ? (
                <a
                  href={String(r.value)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 hover:underline truncate"
                  title={String(r.value)}
                >
                  {r.value}
                </a>
              ) : (
                r.value
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

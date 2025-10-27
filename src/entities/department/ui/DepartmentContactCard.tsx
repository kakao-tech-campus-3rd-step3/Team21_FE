import { Mail, MapPin, Phone } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type Props = {
  tel?: string;
  email?: string;
  address?: string;
};

export function DepartmentContactCard({ tel, email, address }: Props) {
  const rows = [
    { icon: <Phone className="h-4 w-4 text-indigo-500 shrink-0" />, value: tel },
    { icon: <Mail className="h-4 w-4 text-indigo-500 shrink-0" />, value: email },
    { icon: <MapPin className="h-4 w-4 text-indigo-500 shrink-0" />, value: address },
  ].filter((r) => !!r.value && r.value.trim().length > 0);

  return (
    <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">연락처</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-2 text-sm">
        {rows.length > 0 ? (
          rows.map((r, idx) => (
            <div key={idx} className="flex items-start gap-2 text-zinc-300">
              {r.icon}
              <div className="font-medium truncate max-w-[360px]" title={r.value ?? ""}>
                {r.value?.startsWith("http") ? (
                  <a
                    href={r.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {r.value}
                  </a>
                ) : r.value?.includes("@") ? (
                  <a href={`mailto:${r.value}`} className="hover:underline">
                    {r.value}
                  </a>
                ) : (
                  r.value
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-zinc-400 text-sm">등록된 연락처 정보가 없습니다.</p>
        )}
      </CardContent>
    </Card>
  );
}

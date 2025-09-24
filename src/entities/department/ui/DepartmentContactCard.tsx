import { Mail, MapPin, Phone } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type Props = { tel?: string; email?: string; address?: string };

export function DepartmentContactCard({ tel, email, address }: Props) {
  const rows = [
    { icon: <Phone className="h-4 w-4 text-indigo-500" />, label: "전화", value: tel },
    { icon: <Mail className="h-4 w-4 text-indigo-500" />, label: "이메일", value: email },
    { icon: <MapPin className="h-4 w-4 text-indigo-500" />, label: "주소", value: address },
  ].filter((r) => r.value);

  return (
    <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">연락처</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 text-sm">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-zinc-400">
              {r.icon}
              <span className="text-xs">{r.label}</span>
            </div>
            <div className="mt-1 font-medium truncate">
              {r.label === "이메일" ? (
                <a className="hover:underline" href={`mailto:${r.value}`}>
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

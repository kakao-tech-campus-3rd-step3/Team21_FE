import { Globe, Mail, Phone } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type UniversitySideContact = {
  tel?: string;
  web?: string;
  email?: string;
};

export function UniversityContactSide({ data }: { data: UniversitySideContact }) {
  const rows = [
    { label: "전화", value: data.tel, icon: Phone },
    { label: "웹사이트", value: data.web, icon: Globe },
    { label: "이메일", value: data.email, icon: Mail },
  ].filter((r) => r.value);

  return (
    <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">문의하기</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {rows.length > 0 ? (
          rows.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-indigo-500" />
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
                  <span>{r.value}</span>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-zinc-400 text-sm">등록된 연락처 정보가 없습니다.</p>
        )}
      </CardContent>
    </Card>
  );
}

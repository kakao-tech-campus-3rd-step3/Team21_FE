import { Mail, MapPin, Phone } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type Props = {
  tel?: string;
  email?: string;
  address?: string;
};

export function CollegeContactCard({ tel, email, address }: Props) {
  const items = [
    { icon: Phone, label: tel },
    { icon: Mail, label: email },
    { icon: MapPin, label: address },
  ].filter((item) => !!item.label && item.label.trim().length > 0);

  return (
    <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">문의하기</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        {items.length > 0 ? (
          items.map(({ icon: Icon, label }, i) => (
            <div key={i} className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-indigo-500" />
              <span>{label}</span>
            </div>
          ))
        ) : (
          <p className="text-zinc-400 text-sm">등록된 연락처 정보가 없습니다.</p>
        )}
      </CardContent>
    </Card>
  );
}

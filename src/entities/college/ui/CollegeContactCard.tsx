import { Mail, MapPin, Phone } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type Props = { tel?: string; email?: string; address?: string };

export function CollegeContactCard({ tel, email, address }: Props) {
  return (
    <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">문의하기</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-indigo-500" />
          <span>{tel ?? "-"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-indigo-500" />
          <span>{email ?? "-"}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-indigo-500" />
          <span>{address ?? "-"}</span>
        </div>
      </CardContent>
    </Card>
  );
}

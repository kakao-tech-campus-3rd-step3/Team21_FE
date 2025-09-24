import { Check } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type Props = { title: string; features: string[] };

export function CollegeFeatureCard({ title, features }: Props) {
  return (
    <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {features.map((f) => (
          <div key={f} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-indigo-500" />
            <span>{f}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

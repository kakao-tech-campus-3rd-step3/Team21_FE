import { type PropsWithChildren } from "react";

import { cn } from "@/shared/lib/utils";
import { GlassCard } from "@/shared/ui/GlassCard";

type EvalCardProps = PropsWithChildren<{
  title: string;
  description?: string;
  className?: string;
  center?: boolean;
}>;

export function EvalCard({ title, description, center, className, children }: EvalCardProps) {
  return (
    <GlassCard shine={false} className={className} contentClassName="p-4 space-y-3">
      <div>
        <p className="font-medium">{title}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>

      <div className={cn(center ? "flex justify-center" : "")}>{children}</div>
    </GlassCard>
  );
}

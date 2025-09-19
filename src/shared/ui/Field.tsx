import * as React from "react";

import { cn } from "@/shared/lib/utils";

type Props = {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
};

export function Field({ label, error, className, children }: Props) {
  return (
    <label className={cn("block text-left", className)}>
      <span className="mb-1 block text-xs font-medium text-white/80">{label}</span>
      {children}
      {error && <p className="mt-1 text-[11px] text-rose-300">{error}</p>}
    </label>
  );
}

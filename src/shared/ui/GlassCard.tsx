import * as React from "react";

import { cn } from "@/shared/lib/utils";

function GlassCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="glass-card"
      className={cn(
        // 글라스 효과 스타일
        "bg-white/10 backdrop-blur-md border-2 border-white/20 shadow-lg",
        "rounded-xl flex flex-col gap-6 py-6 px-6",
        className,
      )}
      {...props}
    />
  );
}

function GlassCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="glass-card-header" className={cn("px-6 pb-4", className)} {...props} />;
}

function GlassCardTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="glass-card-title"
      className={cn("text-lg font-semibold text-white leading-none", className)}
      {...props}
    />
  );
}

function GlassCardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="glass-card-description"
      className={cn("text-sm text-slate-200", className)}
      {...props}
    />
  );
}

function GlassCardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="glass-card-content" className={cn("px-6", className)} {...props} />;
}

function GlassCardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="glass-card-footer"
      className={cn("px-6 pt-4 border-t border-white/20", className)}
      {...props}
    />
  );
}

export {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardFooter,
  GlassCardHeader,
  GlassCardTitle,
};

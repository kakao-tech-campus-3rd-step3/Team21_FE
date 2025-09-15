import * as React from "react";

import { cn } from "@/shared/lib/utils";
import { Card, CardContent } from "@/shared/ui/card";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string; // 카드 컨테이너 추가 클래스
  contentClassName?: string; // CardContent 추가 클래스
  shine?: boolean; // 사선 반짝임 on/off
  elevated?: boolean; // 그림자 강도 선택
  transparent?: boolean; // 더 투명하게
};

export function GlassCard({
  children,
  className,
  contentClassName,
  shine = true,
  elevated = true,
  transparent = true,
}: GlassCardProps) {
  const base =
    "relative overflow-hidden rounded-2xl border backdrop-blur-3xl backdrop-saturate-200";
  const surface = transparent ? "bg-white/2 border-white/40" : "bg-white/10 border-white/30";
  const shadow = elevated
    ? "shadow-[0_15px_50px_rgba(0,0,0,0.55)]"
    : "shadow-[0_8px_24px_rgba(0,0,0,0.35)]";
  const topHighlight =
    "before:absolute before:inset-0 before:pointer-events-none before:shadow-[inset_0_2px_2px_rgba(255,255,255,0.6)]";
  const shineLayer = shine
    ? "after:absolute after:-left-1/2 after:-top-1/3 after:h-[200%] after:w-[45%] after:skew-x-12 after:bg-gradient-to-r after:from-white/5 after:via-white/80 after:to-white/5 after:blur-lg after:opacity-80 after:rounded-xl hover:after:translate-x-[260%] after:translate-x-0 after:transition-transform after:duration-700"
    : "";

  return (
    <Card className={cn(base, surface, shadow, topHighlight, shineLayer, className)}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%224%22 height=%224%22 viewBox=%220 0 4 4%22><path fill=%22%23fff%22 fill-opacity=%220.8%22 d=%22M0 0h1v1H0zM2 2h1v1H2z%22/></svg>']" />
      <CardContent className={cn("relative p-6", contentClassName)}>{children}</CardContent>
    </Card>
  );
}

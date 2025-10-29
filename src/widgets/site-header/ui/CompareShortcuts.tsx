import { cn } from "@/shared/lib/utils";
import { HeaderLink } from "@/shared/ui/HeaderLink";

export function CompareShortcuts({ className }: { className?: string }) {
  return (
    <nav className={cn("flex items-center gap-3", className)}>
      <HeaderLink to="/compare/professor">교수 비교하기</HeaderLink>
      <HeaderLink to="/compare/university">대학 비교하기</HeaderLink>
    </nav>
  );
}

import { Link } from "react-router-dom";

import { cn } from "@/shared/lib/utils";

export type HeaderLinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
};

export function HeaderLink({ to, children, className }: HeaderLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "text-la text-zinc-50 font-bold",
        "hover:text-cyan-300 transition-colors duration-150",
        "focus:outline-none focus:ring-2 focus:ring-cyan-300/60 rounded-md px-2 py-1",
        className,
      )}
    >
      {children}
    </Link>
  );
}

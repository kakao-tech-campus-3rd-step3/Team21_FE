import { Link } from "react-router-dom";

import logo from "@/assets/uniscope-logo.png";
import { AuthGate } from "@/features/auth-login";
import { SearchToggle } from "@/features/search-control";
import { cn } from "@/shared/lib/utils";

export default function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 inset-x-0 z-50 relative",
        "bg-transparent text-foreground",
        className,
      )}
    >
      <div className="w-full px-4 py-3 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="UniScope" className="h-7 w-auto" />
          <span className="sr-only">UniScope 홈</span>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <SearchToggle />
          <AuthGate isAuthed={false} />
        </div>
      </div>
    </header>
  );
}

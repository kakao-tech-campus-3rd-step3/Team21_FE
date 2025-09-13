import { FaSearch } from "react-icons/fa";

import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";

interface SearchBoxProps {
  placeholder: string;
}

export function SearchBox({ placeholder }: SearchBoxProps) {
  return (
    <Card
      className={[
        "relative overflow-hidden rounded-2xl",
        "bg-white/2 border border-white/40",
        "backdrop-blur-3xl backdrop-saturate-200",
        "shadow-[0_15px_50px_rgba(0,0,0,0.55)]",
        "before:absolute before:inset-0 before:pointer-events-none",
        "before:shadow-[inset_0_2px_2px_rgba(255,255,255,0.6)]",
      ].join(" ")}
    >
      <CardContent className="relative p-6 md:p-8">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <FaSearch
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/75 drop-shadow"
              aria-hidden
            />
            <input
              type="text"
              placeholder={placeholder}
              className={[
                "w-full rounded-lg",
                "border border-white/30 bg-white/10 px-10 py-3",
                "text-white placeholder-white/70 outline-none",
                "focus:border-white/60 focus:bg-white/15 transition",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]",
              ].join(" ")}
              disabled
            />
          </div>

          <Button
            type="button"
            className={[
              "relative inline-flex items-center justify-center rounded-lg",
              "h-12 w-12",
              "bg-gradient-to-b from-white/25 via-white/10 to-white/5",
              "backdrop-blur-md backdrop-saturate-150",
              "border border-white/50",
              "shadow-[0_8px_20px_rgba(0,0,0,0.35)]",
              "before:pointer-events-none before:absolute before:inset-0",
              "before:rounded-[inherit]",
              "before:bg-[radial-gradient(120%_80%_at_20%_10%,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.15)_35%,transparent_70%)]",
              "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit]",
              "after:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]",
              "hover:shadow-[0_10px_24px_rgba(0,0,0,0.45)]",
              "active:translate-y-[1px] active:shadow-[0_6px_16px_rgba(0,0,0,0.35)]",
              "transition-transform duration-200",
              "text-white",
            ].join(" ")}
            disabled
          >
            <FaSearch className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

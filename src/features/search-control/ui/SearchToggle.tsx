import { IoClose, IoSearch } from "react-icons/io5";

import { useSearchControl } from "@/features/search-control";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

type Props = { className?: string; onSearch?: (q: string) => void };

export default function SearchToggle({ className, onSearch }: Props) {
  const { open, setOpen, q, setQ, inputRef, submit } = useSearchControl(onSearch);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <form
        onSubmit={submit}
        className={cn(
          "relative transition-all duration-200",
          open ? "w-72 sm:w-96 opacity-100" : "w-0 opacity-0 pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="대학·학과·교수·강의 검색…"
          className={cn(
            "w-full h-10 rounded-xl px-4 pr-10",
            "bg-white/10 placeholder:zinc-300",
            "border border-white/20 focus:border-cyan-300/60 outline-none",
            "backdrop-blur-md text-zinc-50",
          )}
        />
        <button
          type="submit"
          className="absolute right-2 top-1.5 p-1 rounded-md hover:bg-white/10"
          aria-label="검색"
        >
          <IoSearch className="h-6 w-6" />
        </button>
      </form>
      {open ? (
        <Button
          variant="ghost"
          className="text-zinc-50 hover:bg-white/10"
          onClick={() => setOpen(false)}
          aria-label="검색 닫기"
        >
          <IoClose className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          className="text-zinc-50 hover:bg-white/10"
          onClick={() => setOpen(true)}
          aria-label="검색 열기"
        >
          <IoSearch className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}

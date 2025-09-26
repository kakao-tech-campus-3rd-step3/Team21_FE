import { IoClose, IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import { useSearchControl } from "@/features/search-control";
import { SEARCH_CONTROL_TEXT } from "@/features/search-control/text";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

type Props = { className?: string; onSearch?: (q: string) => void };

export default function SearchToggle({ className, onSearch }: Props) {
  const { open, setOpen, q, setQ, inputRef } = useSearchControl(onSearch);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = q.trim();

    if (text === "충남대학교") {
      navigate("/university/100");
    } else if (text === "이영석") {
      navigate("/professor/100");
    } else {
      navigate(`/search?q=${encodeURIComponent(text)}`);
    }

    setOpen(false);
    setQ("");
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <form
        onSubmit={handleSubmit}
        className={cn(
          "absolute top-full left-10 right-10 mt-2 transition-all duration-200",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={SEARCH_CONTROL_TEXT.placeholder}
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

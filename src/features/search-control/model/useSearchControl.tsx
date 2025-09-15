import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

export function useSearchControl(onSearch?: (q: string) => void) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const nav = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !open) {
        e.preventDefault();
        setOpen(true);
        requestAnimationFrame(() => inputRef.current?.focus());
      }
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const keyword = q.trim();
    if (!keyword) return;
    onSearch?.(keyword);
    nav(`/search?q=${encodeURIComponent(keyword)}`);
    setOpen(false);
  };

  return { open, setOpen, q, setQ, inputRef, submit };
}

import { Star, StarHalf } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/shared/lib/utils";

type StarInputProps = {
  value?: number;
  onChange?: (v: number) => void;
  max?: number;
  step?: 0.5 | 1;
  size?: number;
  className?: string;
  readOnly?: boolean;
  "aria-label"?: string;
};

export const StarInput = ({
  value = 0,
  onChange,
  max = 5,
  step = 0.5,
  size = 24,
  className,
  readOnly = false,
  "aria-label": ariaLabel = "별점 입력",
}: StarInputProps) => {
  const [hover, setHover] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const display = hover ?? value;

  const pieces = useMemo(() => {
    return Array.from({ length: max }, (_, i) => {
      const starIndex = i + 1; // 1~max
      if (display >= starIndex) return "full" as const;
      if (display >= starIndex - 0.5) return "half" as const;
      return "empty" as const;
    });
  }, [display, max]);

  const setValue = (v: number) => {
    if (readOnly) return;
    const clamped = Math.max(0, Math.min(max, step === 1 ? Math.round(v) : Math.round(v * 2) / 2));
    onChange?.(clamped);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (readOnly) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setValue(value - step);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setValue(value + step);
    } else if (e.key === "Home") {
      e.preventDefault();
      setValue(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setValue(max);
    }
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const leave = () => setHover(null);
    el.addEventListener("mouseleave", leave);
    return () => el.removeEventListener("mouseleave", leave);
  }, []);

  return (
    <div
      ref={rootRef}
      role="slider"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      tabIndex={readOnly ? -1 : 0}
      onKeyDown={onKeyDown}
      className={cn("inline-flex items-center gap-1 select-none", className)}
    >
      {Array.from({ length: max }, (_, i) => {
        const starNumber = i + 1;

        return (
          <div key={starNumber} className="relative" style={{ width: size, height: size }}>
            {pieces[i] === "full" && (
              <Star size={size} className="text-yellow-400" fill="currentColor" />
            )}
            {pieces[i] === "half" && (
              <StarHalf size={size} className="text-yellow-400" fill="currentColor" />
            )}
            {pieces[i] === "empty" && (
              <Star size={size} className="text-gray-300" fill="currentColor" />
            )}

            {!readOnly && (
              <>
                <button
                  type="button"
                  aria-label={`${starNumber - 0.5}점`}
                  className="absolute left-0 top-0 h-full w-1/2 opacity-0"
                  onMouseEnter={() => setHover(starNumber - 0.5)}
                  onFocus={() => setHover(starNumber - 0.5)}
                  onClick={() => setValue(starNumber - 0.5)}
                />
                <button
                  type="button"
                  aria-label={`${starNumber}점`}
                  className="absolute right-0 top-0 h-full w-1/2 opacity-0"
                  onMouseEnter={() => setHover(starNumber)}
                  onFocus={() => setHover(starNumber)}
                  onClick={() => setValue(starNumber)}
                />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

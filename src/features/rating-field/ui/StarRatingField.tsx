import { type Control, Controller, type FieldValues, type Path } from "react-hook-form";

import StarRating_Fractions from "@/shared/ui/star-rating-fractions";

const DEFAULT_STAR_SIZE = 32; // 별점의 화면 점유율을 고려한 최소 크기 32
const DEFAULT_MAX_RATING = 5; // 별점 5점 체계
const DEFAULT_DECIMAL_PLACES = 2; // 소수점 둘째 자리까지 표시 (ex: 3.25)

type StarRatingFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  size?: number;
  error?: string;
  className?: string;
  showValue?: boolean;
  max?: number;
  "aria-label"?: string;
};

export function StarRatingField<T extends FieldValues>({
  control,
  name,
  size = DEFAULT_STAR_SIZE,
  error,
  className,
  showValue = true,
  max = DEFAULT_MAX_RATING,
}: StarRatingFieldProps<T>) {
  return (
    <div className={className}>
      <Controller<T>
        control={control}
        name={name}
        render={({ field }) => {
          const numericValue = Number(field.value ?? 0);
          const display = Number(numericValue.toFixed(DEFAULT_DECIMAL_PLACES)).toString();

          return (
            <>
              <StarRating_Fractions
                iconSize={size}
                value={numericValue}
                onChange={(v: number) => field.onChange(v)}
                className="justify-center"
              />
              {showValue && (
                <div className="mt-1 text-sm text-center text-muted-foreground">
                  {display}/{max}
                </div>
              )}
            </>
          );
        }}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

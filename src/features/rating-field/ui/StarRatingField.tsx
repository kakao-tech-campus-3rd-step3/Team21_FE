import { type Control, Controller, type FieldValues, type Path } from "react-hook-form";

import StarRating_Fractions from "@/shared/ui/star-rating-fractions";

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
  size = 32,
  error,
  className,
  showValue = true,
  max = 5,
}: StarRatingFieldProps<T>) {
  return (
    <div className={className}>
      <Controller<T>
        control={control}
        name={name}
        render={({ field }) => {
          const numericValue = Number(field.value ?? 0);
          const display = Number(numericValue.toFixed(2)).toString();

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

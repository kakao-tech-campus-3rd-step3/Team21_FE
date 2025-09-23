import { type Control, Controller, type FieldValues, type Path } from "react-hook-form";

import { StarInput } from "@/shared/ui/StarInput";

type StarRatingFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  size?: number;
  error?: string;
  className?: string;
  "aria-label"?: string;
};

export function StarRatingField<T extends FieldValues>({
  control,
  name,
  size = 32,
  error,
  className,
  "aria-label": ariaLabel,
}: StarRatingFieldProps<T>) {
  return (
    <div className={className}>
      <Controller<T>
        control={control}
        name={name}
        render={({ field }) => (
          <StarInput
            size={size}
            aria-label={ariaLabel}
            value={Number(field.value ?? 0)}
            onChange={(v) => field.onChange(v)}
            className="justify-center"
          />
        )}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

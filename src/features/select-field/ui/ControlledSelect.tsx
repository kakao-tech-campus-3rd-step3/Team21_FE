import { type Control, Controller, type FieldValues, type Path } from "react-hook-form";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";

type Option = Readonly<{ value: string; label: string }>;

type ControlledSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  options: ReadonlyArray<Option>;
  placeholder?: string;
  error?: string;
  className?: string;
};

export function ControlledSelect<T extends FieldValues>({
  control,
  name,
  options,
  placeholder = "선택",
  error,
  className,
}: ControlledSelectProps<T>) {
  return (
    <div className={className}>
      <Controller<T>
        control={control}
        name={name}
        render={({ field }) => (
          <Select value={field.value ?? ""} onValueChange={field.onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

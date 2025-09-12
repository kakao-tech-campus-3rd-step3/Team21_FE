import { createContext, type CSSProperties, type HTMLAttributes, useContext, useMemo } from "react";
import { Tooltip as RTooltip, type TooltipProps } from "recharts";

import { cn } from "@/shared/lib/utils";

export type ChartConfig = {
  [seriesKey: string]: { label: string; color: string };
};

type ChartContextValue = { config: ChartConfig };

const ChartContext = createContext<ChartContextValue | undefined>(undefined);

export function useChartContext() {
  const ctx = useContext(ChartContext);
  if (!ctx) {
    throw new Error("useChartContext must be used within a ChartContainer");
  }
  return ctx;
}

export function ChartContainer({
  className,
  style,
  config,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { config: ChartConfig }) {
  const cssVars = useMemo(() => {
    return Object.fromEntries(
      Object.entries(config).map(([key, def]) => [`--color-${key}`, def.color]),
    ) as CSSProperties;
  }, [config]);

  const chartContextValue = useMemo(() => ({ config }), [config]);

  return (
    <ChartContext.Provider value={chartContextValue}>
      <div
        data-slot="chart"
        className={cn(
          "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
          className,
        )}
        style={{ ...style, ...cssVars }}
        {...props}
      >
        {children}
      </div>
    </ChartContext.Provider>
  );
}

export function ChartTooltip(props: TooltipProps<number, string>) {
  return (
    <RTooltip
      wrapperStyle={{ outline: "none" }}
      contentStyle={{
        background: "hsl(var(--popover))",
        color: "hsl(var(--popover-foreground))",
        border: "1px solid hsl(var(--border))",
        borderRadius: "0.5rem",
        boxShadow: "var(--shadow, 0 1px 2px rgba(0,0,0,0.06))",
      }}
      {...props}
    />
  );
}
type TooltipContentProps = {
  active?: boolean;
  label?: string;
  payload?: {
    dataKey?: string | number;
    value?: string | number;
    name?: string | number;
    color?: string;
  }[];
};

export function ChartTooltipContent({ active, payload, label }: TooltipContentProps) {
  const { config } = useChartContext();
  if (!active || !payload?.length) return null;

  return (
    <div className="grid gap-1.5 p-2">
      {label != null && <div className="text-xs font-medium text-muted-foreground">{label}</div>}
      <div className="flex flex-col gap-1">
        {payload.map((p, i) => {
          const key = String(p.dataKey ?? p.name ?? i);
          const conf = config[key];
          return (
            <div key={key} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ background: `var(--color-${key})` }}
                  aria-hidden
                />
                <span className="text-sm leading-none truncate">{conf?.label ?? key}</span>
              </div>
              <span className="tabular-nums text-sm">{p.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ChartLegend({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { config } = useChartContext();

  return (
    <div className={cn("mt-3 flex flex-wrap items-center gap-4", className)} {...props}>
      {Object.entries(config).map(([key, v]) => (
        <div key={key} className="flex items-center gap-1.5">
          <span
            className="h-3 w-3 rounded-full"
            style={{ background: `var(--color-${key})` }}
            aria-hidden
          />
          <span className="text-xs">{v.label}</span>
        </div>
      ))}
    </div>
  );
}

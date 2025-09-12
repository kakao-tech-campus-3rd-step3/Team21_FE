import { FEATURE_ICONS, FEATURE_ITEMS } from "@/pages/home/model";
import { GlassCard } from "@/shared/ui/GlassCard";

export function HomeFeatureCards() {
  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
      {FEATURE_ITEMS.map((f) => (
        <GlassCard key={f.key} contentClassName="p-6">
          <div className="flex justify-center mb-4">
            {FEATURE_ICONS[f.key as keyof typeof FEATURE_ICONS]}
          </div>
          <h3 className="text-lg font-semibold text-white text-center">{f.title}</h3>
          <p className="mt-2 text-sm text-white/75 text-center">{f.desc}</p>
        </GlassCard>
      ))}
    </div>
  );
}

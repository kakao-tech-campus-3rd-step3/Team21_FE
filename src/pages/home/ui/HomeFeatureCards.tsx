import { FaBook, FaChalkboardTeacher, FaUniversity } from "react-icons/fa";

import { HOME_TEXT } from "@/pages/home/text";
import { GlassCard } from "@/shared/ui/GlassCard";

export function HomeFeatureCards() {
  const FEATURE_ICONS = {
    univ: <FaUniversity className="h-6 w-6 text-indigo-400" />,
    prof: <FaChalkboardTeacher className="h-6 w-6 text-green-400" />,
    major: <FaBook className="h-6 w-6 text-purple-400" />,
  } as const;

  const FEATURE_ITEMS = [
    { key: "univ", ...HOME_TEXT.features.univ },
    { key: "prof", ...HOME_TEXT.features.prof },
    { key: "major", ...HOME_TEXT.features.major },
  ] as const;

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

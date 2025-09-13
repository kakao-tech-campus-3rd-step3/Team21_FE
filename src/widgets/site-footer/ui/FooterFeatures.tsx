import { FOOTER_TEXT } from "@/widgets/site-footer/text";

export function FooterFeatures() {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-zinc-50">주요 기능</h3>
      <ul className="space-y-2">
        {FOOTER_TEXT.features.map((feature) => (
          <li key={feature.label} className="flex items-center gap-3 text-sm">
            <span className={`h-2.5 w-2.5 rounded-full ${feature.dotClass}`} />
            <span className="text-zinc-300">{feature.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

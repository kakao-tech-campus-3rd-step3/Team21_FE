import { FaSearch } from "react-icons/fa";

import { FOOTER_TEXT } from "@/widgets/site-footer/text";

export function FooterBrand() {
  const { title, desc } = FOOTER_TEXT.brand;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {/* TODO: UniScope 로고로 변경 */}
        <FaSearch className="h-6 w-6 text-zinc-50" aria-hidden />
        <h3 className="text-lg font-semibold text-zinc-50">{title}</h3>
      </div>

      <p className="text-sm leading-relaxed text-zinc-400">{desc}</p>
    </div>
  );
}

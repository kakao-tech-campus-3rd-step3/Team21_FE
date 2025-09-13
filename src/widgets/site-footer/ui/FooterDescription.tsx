import { FOOTER_TEXT } from "@/widgets/site-footer/text";

export function FooterDescription() {
  const { copyright, disclaimer } = FOOTER_TEXT.bottom;

  return (
    <div className="space-y-1 text-sm">
      <p className="text-zinc-300">{copyright}</p>
      <p className="text-zinc-500">{disclaimer}</p>
    </div>
  );
}

import { FOOTER_TEXT } from "@/widgets/site-footer/text";

export function FooterSocialLinks() {
  return (
    <nav aria-label="footer policies" className="shrink-0">
      <ul className="flex items-center gap-6 text-sm">
        {FOOTER_TEXT.bottom.links.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="text-zinc-300 hover:text-zinc-100 hover:underline underline-offset-4 focus:outline-none focus:underline"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

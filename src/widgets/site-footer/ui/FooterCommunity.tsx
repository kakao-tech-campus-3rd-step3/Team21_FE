import { FaDiscord, FaGithub } from "react-icons/fa";

import { FOOTER_TEXT } from "@/widgets/site-footer/text";

function CommunityIcon({ type }: { type: "github" | "discord" }) {
  if (type === "github") return <FaGithub className="h-5 w-5 text-zinc-400" aria-hidden />;
  if (type === "discord") return <FaDiscord className="h-5 w-5 text-zinc-400" aria-hidden />;
  return null;
}

export function FooterCommunity() {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-zinc-50">{FOOTER_TEXT.community.title}</h3>
      <ul className="space-y-2">
        {FOOTER_TEXT.community.items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-zinc-100 hover:underline underline-offset-4 focus:outline-none focus:underline"
              aria-label={item.label}
            >
              <span className="transition-colors group-hover:text-zinc-200">
                <CommunityIcon type={item.type} />
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

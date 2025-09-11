import { useState } from "react";

import { FOOTER_TEXT } from "@/widgets/site-footer/text";
import PolicyDialog, { type PolicyKey } from "@/widgets/site-footer/ui/PolicyDialog";

export function FooterSocialLinks() {
  const [dialogType, setDialogType] = useState<PolicyKey | null>(null);

  return (
    <nav aria-label="footer policies" className="shrink-0">
      <ul className="flex items-center gap-6 text-sm">
        {FOOTER_TEXT.bottom.links.map((item) => (
          <li key={item.label}>
            {"dialog" in item ? (
              <button
                onClick={() => setDialogType(item.dialog as PolicyKey)}
                className="text-zinc-300 hover:text-zinc-100 hover:underline underline-offset-4 focus:outline-none focus:underline"
              >
                {item.label}
              </button>
            ) : (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-300 hover:text-zinc-100 hover:underline underline-offset-4 focus:outline-none focus:underline"
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>

      <PolicyDialog
        type={dialogType}
        open={dialogType !== null}
        onOpenChange={(open) => {
          if (!open) setDialogType(null);
        }}
      />
    </nav>
  );
}

import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { AuthDialog } from "./AuthDialog";

const withQueryProvider: Decorator = (Story) => {
  const qc = new QueryClient();
  return (
    <QueryClientProvider client={qc}>
      <Story />
    </QueryClientProvider>
  );
};

function Demo({ open: controlledOpen = false }: { open?: boolean }) {
  const [open, setOpen] = useState(controlledOpen);
  useEffect(() => setOpen(!!controlledOpen), [controlledOpen]);

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <button onClick={() => setOpen(true)}>외부에서 열기</button>
      <AuthDialog open={open} onOpenChange={setOpen} onGoSignup={() => console.log("onGoSignup")} />
    </div>
  );
}

const meta: Meta<typeof Demo> = {
  title: "features/auth-login/AuthDialog",
  component: Demo,
  tags: ["autodocs"],
  decorators: [withQueryProvider],
  parameters: { layout: "centered" },
  args: { open: false },
  argTypes: { open: { control: "boolean" } },
};
export default meta;

type Story = StoryObj<typeof Demo>;
export const Default: Story = {};
export const Opened: Story = { args: { open: true } };

import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { SignupDialog } from "./SignupDialog";

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
      <SignupDialog open={open} onOpenChange={setOpen} onGoLogin={() => console.log("onGoLogin")} />
    </div>
  );
}

const meta: Meta<typeof Demo> = {
  title: "Features/Auth-Signup/SignupDialog",
  component: Demo,
  tags: ["autodocs"],
  decorators: [withQueryProvider],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "회원가입을 위한 텍스트 에리어, 유효성 검증을 포함한 다이얼로그를 표시합니다",
      },
    },
  },
  args: { open: false },
  argTypes: { open: { control: "boolean" } },
};
export default meta;

type Story = StoryObj<typeof Demo>;
export const Default: Story = {};
export const Opened: Story = { args: { open: true } };

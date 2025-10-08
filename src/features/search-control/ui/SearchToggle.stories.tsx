import type { Meta, StoryObj } from "@storybook/react-vite";
import { useLocation } from "react-router-dom";

import SearchToggle from "./SearchToggle";

function LocationBadge() {
  const loc = useLocation();
  return (
    <div className="absolute -top-8 right-0 rounded-md bg-black/70 text-white text-xs px-2 py-1 border border-white/20">
      path: <span className="font-mono">{loc.pathname + (loc.search ?? "")}</span>
    </div>
  );
}

const meta: Meta<typeof SearchToggle> = {
  title: "Features/SearchControl/SearchToggle",
  component: SearchToggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark" },
    docs: {
      description: {
        component:
          "헤더에 붙는 검색 토글 버튼-> 클릭 시 입력창 펼치고, 제출 시시 라우팅 규칙에 따라 navigate (충남대/이영석은 데모용 특수 라우팅)",
      },
    },
  },
  argTypes: {
    onSearch: { action: "onSearch" },
  },
  args: {
    className: "",
  },
  decorators: [
    (Story) => (
      <div className="relative w-[640px] h-[120px] max-w-[92vw] border border-white/20 rounded-xl p-4 bg-gradient-to-b from-zinc-900 to-black text-white">
        <LocationBadge />
        <div className="flex justify-end">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SearchToggle>;

export const Playground: Story = {};

export const WithOnSearch: Story = {
  args: {
    onSearch: (q: string) => {
      console.log("[onSearch] query:", q);
    },
  },
};

export const DarkSurface: Story = {
  decorators: [
    (Story) => (
      <div className="relative w-[640px] h-[140px] max-w-[92vw] rounded-2xl p-6 bg-[radial-gradient(1200px_600px_at_80%_-10%,rgba(56,189,248,0.35),transparent),linear-gradient(180deg,#0b0f1a_0%,#000_100%)] text-white border border-cyan-200/20">
        <LocationBadge />
        <div className="flex justify-end">
          <Story />
        </div>
      </div>
    ),
  ],
};

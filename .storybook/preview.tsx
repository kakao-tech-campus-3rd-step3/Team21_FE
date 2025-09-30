// .storybook/preview.tsx
import "@/app/styles/global.css";
import type { Preview } from "@storybook/react";
import React from "react";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#0a0a0a" },
        { name: "light", value: "#ffffff" },
      ],
    },
    controls: {
      expanded: true,
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    a11y: { test: "todo" },
  },
  decorators: [
    (Story, context) => {
      // iframe 문서에 dark 클래스 부여
      const doc = context.canvasElement?.ownerDocument ?? document;
      doc.documentElement.classList.add("dark");

      // JSX를 반드시 return!
      return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
          <Story />
        </div>
      );
    },
  ],
};

export default preview;

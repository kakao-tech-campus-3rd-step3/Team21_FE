import "@/app/styles/global.css";

import type { Preview } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Providers } from "../src/app/providers/providers";

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ["Pages", "Widgets", "Features", "Entities", "Shared", "Example"],
      },
    },
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
      const doc = context.canvasElement?.ownerDocument ?? document;
      doc.documentElement.classList.add("dark");

      return (
        <MemoryRouter initialEntries={["/"]}>
          <Providers>
            <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
              <Story />
            </div>
          </Providers>
        </MemoryRouter>
      );
    },
  ],
};

export default preview;

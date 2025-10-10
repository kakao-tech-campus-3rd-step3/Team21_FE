import type { StorybookConfig } from "@storybook/react-vite";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (baseConfig) => {
    baseConfig.plugins = baseConfig.plugins || [];
    baseConfig.plugins.push(tsconfigPaths());

    baseConfig.resolve = {
      ...(baseConfig.resolve || {}),
      alias: {
        ...(baseConfig.resolve?.alias || {}),
        "@": resolve(__dirname, "../src"),
      },
    };

    return baseConfig;
  },
};

export default config;

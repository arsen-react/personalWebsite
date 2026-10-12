import type { Preview } from "@storybook/nextjs-vite";
import "../src/styles/tokens.css";
import "../src/styles/base.css";
import "../src/styles/utilities.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Colour theme",
      toolbar: { title: "Theme", icon: "mirror", items: ["dark", "light"], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: "dark" },
  decorators: [
    (Story, context) => {
      // Same switch the site uses: the theme lives in <html data-theme>.
      document.documentElement.setAttribute("data-theme", String(context.globals.theme));
      return (
        <div style={{ padding: 32 }}>
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
    a11y: { test: "error" },
  },
};

export default preview;

import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    darkMode: {
      current: "dark",
      darkClass: "dark",
      classTarget: "html",
      stylePreview: true,
    },
    backgrounds: {
      values: [
        { name: "dark", value: "#000" },
        { name: "light", value: "#fff" },
      ],
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    /*   decorators: [
      (story, context) => {
        const bgNameDefault = "dark";
        const bgName = context.parameters.backgrounds.default || bgNameDefault;
        console.log({ bgName });
        if (bgName === bgNameDefault) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        return story();
      },
    ], */
  },
};

export default preview;

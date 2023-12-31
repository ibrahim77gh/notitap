import { defineConfig, UserConfigExport } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// eslint-disable-next-line import/no-unresolved
import Unocss from "unocss/vite";

import { presetIcons } from "unocss";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config: UserConfigExport = {
    plugins: [
      react(),
      Unocss({
        presets: [
          presetIcons({
            extraProperties: {
              display: "inline-block",
              "vertical-align": "middle",
            },
          }),
        ],
      }),
    ],
    base: mode === "production" ? "/notitap/" : "/",
    server: {
      host: '0.0.0.0',
      port: 4173,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };

  return config;
});

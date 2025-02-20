import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const __dirname = import.meta.dirname;

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "lib"),
    },
  },
});

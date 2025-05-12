import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    proxy: {
      "/api": process.env.API_URL ?? "http://localhost:4000/graphql",
    },
    hmr: { path: "hmr" },
  },
});

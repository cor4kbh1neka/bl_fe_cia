import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/users": {
        target: "https://jvr5gan.ciawgag.com",
        changeOrigin: true,
        secure: true,
        credentials: "omit",
      },
      "/authentications": {
        target: "https://jvr5gan.ciawgag.com",
        changeOrigin: true,
        secure: true,
        credentials: "omit",
      },
      "/api": {
        target: "https://jvr5gan.ciawgag.com",
        changeOrigin: true,
        secure: true,
        credentials: "omit",
      },
      "/prx": {
        target: "https://jvr5gan.ciawgag.com",
        changeOrigin: true,
        secure: true,
        credentials: "omit",
      },
      "/memo": {
        target: "https://jvr5gan.ciawgag.com",
        changeOrigin: true,
        secure: true,
        credentials: "omit",
      },
      "/banks": {
        target: "https://jvr5gan.ciawgag.com",
        changeOrigin: true,
        secure: true,
        credentials: "omit",
      },
      "/content": {
        target: "https://jvr5gan.ciawgag.com",
        changeOrigin: true,
        secure: true,
        credentials: "omit",
      },
    },
  },
});

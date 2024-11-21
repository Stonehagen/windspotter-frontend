import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

const manifestForPlugin = {
  registerType: "prompt",
  manifest: {
    name: "Windmate",
    short_name: "Windmate",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    description: "An App to get you the best Windforecast.",
    icons: [
      {
        src: "/windmate192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/windmate512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  workbox: {
    dontCacheBustURLsMatching: /.\.(?:png|jpg|jpeg|svg)$/,
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), VitePWA(manifestForPlugin)],
})

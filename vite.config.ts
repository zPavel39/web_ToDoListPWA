import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";

const vitePWA = VitePWA({
  registerType: 'prompt',
  injectRegister: 'auto',
  workbox: {
    sourcemap: true,
    globDirectory: 'build/',
    globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
  },
  manifest: {
    name: "ToDoList",
    short_name: "ToDo",
    description: "List You Tasks",
    theme_color: "#ffffff",
    icons: [
      {
        src: 'assets/images/android-chrome-192x192.png',
        sizes: "192x192",
        type: 'image/png',
      },
      {
        src: 'assets/images/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },],
  },
})
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePWA],
})
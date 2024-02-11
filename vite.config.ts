import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import type { VitePWAOptions } from 'vite-plugin-pwa'
import {VitePWA} from "vite-plugin-pwa";


const vitePWA: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  devOptions: {
    enabled: true
  },
  workbox: {
    sourcemap: true,
    globDirectory: '/',
    globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
  },
  manifest: {
    name: "ToDoList",
    short_name: "ToDo",
    description: "List You Tasks",
    theme_color: "#ffffff",
    icons: [
      {
        src: '/assets/images/android-chrome-192x192.png',
        sizes: "192x192",
        type: 'image/png',
      },
      {
        src: '/assets/images/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },],
  },
}

export default defineConfig({
  plugins: [react(), VitePWA(vitePWA)],
})
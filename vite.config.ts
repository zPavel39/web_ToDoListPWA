import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import type { ManifestOptions, VitePWAOptions } from 'vite-plugin-pwa'
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
}
const replaceOptions = { __DATE__: new Date().toISOString() }
const claims = process.env.CLAIMS === 'true'
const reload = process.env.RELOAD_SW === 'true'
const selfDestroying = process.env.SW_DESTROY === 'true'

if (process.env.SW === 'true') {
  vitePWA.srcDir = 'src'
  vitePWA.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts'
  vitePWA.strategies = 'injectManifest'
  ;(vitePWA.manifest as Partial<ManifestOptions>).name = 'PWA Inject Manifest'
  ;(vitePWA.manifest as Partial<ManifestOptions>).short_name = 'PWA Inject'
}

if (claims)
  vitePWA.registerType = 'autoUpdate'

if (reload) {
  // @ts-expect-error just ignore
  replaceOptions.__RELOAD_SW__ = 'true'
}

if (selfDestroying)
  vitePWA.selfDestroying = selfDestroying
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(vitePWA)],
})
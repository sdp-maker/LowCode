import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import react from '@vitejs/plugin-react'
import vueDevTools from 'vite-plugin-vue-devtools'
// @ts-expect-error - veaury 没有类型声明
import veauryVitePlugins from 'veaury/vite/esm/index.mjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    veauryVitePlugins({
      type: 'vue',
      vueOptions: vue,
      vueJsxOptions: vueJsx,
      reactOptions: react,
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})

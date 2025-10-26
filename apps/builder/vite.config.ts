/*
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 19:53:39
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-24 22:15:52
 * @FilePath: \LowCode\apps\builder\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
  optimizeDeps: {
    include: [
      '@glideapps/glide-data-grid'
    ]
  },
  build: {
    commonjsOptions: {
      include: [/@glideapps\/glide-data-grid/, /node_modules/]
    }
  },
  define: {
    global: 'globalThis'
  }
})

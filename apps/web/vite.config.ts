import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tsconfigPaths(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
  ],
  optimizeDeps: {
    // 告诉 vite 这个不是依赖，不要预构建，否则第一次启动可能会出现别名解析还没来得及的报错
    exclude: ['@internal/utils', '@internal/constants', '@internal/types'],
  },
})

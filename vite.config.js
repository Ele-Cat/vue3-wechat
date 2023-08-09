import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path"
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteCompression({
      threshold: 1024000
    })
  ],
  resolve: {
    // ↓路径别名，主要是这部分
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  server: {
    host: 'localhost',
    open: true,
    port: 9527,
  },
  // base: "https://ele-cat.gitee.io/vue3-wechat"
});

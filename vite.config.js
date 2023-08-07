import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  publicDir: 'https://ele-cat.gitee.io/vue3-wechat',
  server: {
    host: 'localhost',
    open: true,
    port: 9527,
  },
});

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_BASE_PATH } = loadEnv(mode, process.cwd());
  return {
    plugins: [vue()],
    resolve: {
      // ↓路径别名，主要是这部分
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    server: {
      host: "localhost",
      open: true,
      port: 9527,
    },
    base: VITE_BASE_PATH,
  };
});

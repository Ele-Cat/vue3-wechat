import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig((mode) => {
  const root = process.cwd();
  const env = loadEnv(mode, root)
  console.log('mode: ', mode);
  console.log('env1: ', env);
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
      open: env.VITE_OPEN,
      port: env.VITE_PORT,
    },
    base: env.VITE_PUBLIC_PATH
  }
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import dts from "vite-plugin-dts";

export default defineConfig(({ command }) => {
  const isDev = command === "serve";
  return {
    plugins: [
      react(),
      dts({
        outDirs: path.resolve(import.meta.dirname, "dist"),
        insertTypesEntry: true, //这是dts插件的配置，用于生成类型文件
        include: ["packages/**/*.ts", "packages/**/*.tsx"],
        bundleTypes: true,
      }),
    ],
    root: isDev ? path.resolve(import.meta.dirname, "example") : undefined,
    server: {
      port: 3000,
      open: true,
    },
    build: {
      outDir: path.resolve(import.meta.dirname, "dist"),
      lib: {
        entry: path.resolve(import.meta.dirname, "packages/index.ts"),
        name: "ui",
        formats: ["es", "umd", "cjs", "iife"],
        fileName: (format) => `ui.${format}.js`,
      },
      emptyOutDir: false,
      rollupOptions: {
        external: ["react", "react-dom"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
    },
  };
});

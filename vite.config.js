/*
 * @Author: aFei
 * @Date: 2022-07-27 14:00:00
*/
/*
 * @LastEditors: aFei
 * @LastEditTime: 2023-02-20 14:49:53
*/
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoImport from "unplugin-auto-import/vite";
import * as path from 'path';

export default defineConfig(({ command, mode }) => ({
  esbuild: {
    drop: ['console', 'debugger']
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: path.resolve(__dirname, "./lib/index.js"),
      name: "vuePermissionBreadsPlus",
      fileName: "vue-permission-breads-plus",
    },
    rollupOptions: {
      external: ["vue", "vue-router"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [vue(), autoImport({ imports: ['vue', 'vue-router'], dts: false })],
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true
      }
    }
  }
}));

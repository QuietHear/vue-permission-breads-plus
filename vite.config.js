/*
 * @Author: aFei
 * @Date: 2022-07-27 14:00:00
*/
/*
 * @LastEditors: aFei
 * @LastEditTime: 2023-01-18 16:45:12
*/
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

export default defineConfig(({ command, mode }) => ({
  esbuild: {
    drop: ['console', 'debugger']
  },
  build: {
    // 打包输出的目录路径
    outDir: 'dist',
    lib: {
      entry: path.resolve(__dirname, "./lib/index.js"), //指定组件编译入口文件
      name: "vuePermissionBreadsPlus",
      fileName: "vue-permission-breads-plus",
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue", "vueRouter"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    }, // rollup打包配置
  },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true
      }
    }
  }
}));

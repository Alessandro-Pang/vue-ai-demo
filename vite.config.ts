/*
 * @Author: zi.yang
 * @Date: 2024-12-10 09:15:22
 * @LastEditors: zi.yang
 * @LastEditTime: 2025-04-21 16:50:40
 * @Description: 
 * @FilePath: /vue-app/vite.config.ts
 */
import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  return {
    base: isProd ? '/vue-ai-demo' : './',
    plugins: [vue()],
  }
})

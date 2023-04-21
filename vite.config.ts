/// <reference types="vitest" />

import path from 'node:path';
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import UnoCSS from 'unocss/vite';
import VueMacros from 'unplugin-vue-macros/vite';

export default defineConfig({
 resolve: {
  alias: {
   '~/': `${path.resolve(__dirname, 'src')}/`,
  },
 },
 plugins: [
  VueMacros({
   plugins: {
    vue: Vue({
     reactivityTransform: true,
    }),
   },
  }),

  // https://github.com/hannoeru/vite-plugin-pages
  Pages({
   exclude: ['**/components/**'],
  }),

  // https://github.com/antfu/unplugin-auto-import
  AutoImport({
   imports: ['vue', 'vue/macros', 'vue-router', '@vueuse/core', 'pinia'],
   dts: true,
   dirs: ['./src/composables'],
   vueTemplate: true,
  }),

  // https://github.com/antfu/vite-plugin-components
  Components({
   dts: true,
   resolvers: [HeadlessUiResolver({ prefix: 'H' })],
  }),

  // https://github.com/antfu/unocss
  // see uno.config.ts for config
  UnoCSS(),
 ],

 // https://github.com/vitest-dev/vitest
 test: {
  environment: 'jsdom',
 },

 preview: {
  port: 4444,
 },
});

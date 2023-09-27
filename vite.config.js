import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

const ASSET_URL = process.env.ASSET_URL || '';

// https://vitejs.dev/config/
export default defineConfig({
  env: {
    base: ASSET_URL,
  },
  plugins: [vue()],
});

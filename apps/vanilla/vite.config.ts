import { resolve } from 'path';

import { defineConfig } from 'vite';

const root = resolve(__dirname, 'src/pages');
const outDir = resolve(__dirname, '../../dist/apps/vanilla');

console.log(outDir)

// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: [
        resolve(root, 'index.html'),
        resolve(root, 'example', 'index.html'),
        resolve(root, 'example', 'nested', 'index.html'),
      ],
    },
  },
});

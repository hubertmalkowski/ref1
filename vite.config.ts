import { defineConfig } from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';
import ffmpeg from '@motion-canvas/ffmpeg';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  publicDir: false,
  plugins: [
    motionCanvas(),
    ffmpeg(),
    viteStaticCopy({
      targets: [
        { src: 'public/*', dest: 'public' },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
      },
      output: {
        dir: 'dist/',
        entryFileNames: '[name].js',
      },
    },
  },
});

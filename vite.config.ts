import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';
import ffmpeg from '@motion-canvas/ffmpeg';

export default defineConfig({
  plugins: [
    motionCanvas(),
    ffmpeg(),
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

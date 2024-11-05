import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  dts: true,
  format: ['cjs', 'esm'],
  target: 'esnext',
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
  banner: {
    js: '/* Nyro */',
    css: '/* Nyro */',
  },
  footer: {
    js: '/* Nyro */',
    css: '/* Nyro */',
  },
  ignoreWatch: ['**/dist', '**/node_modules'],
  metafile: true,
  bundle: true,
  config: 'tsup.config.ts',
});
import { defineConfig } from 'tsup';

export default defineConfig({
    shims: true,
    outDir: './dist',
    entryPoints: ['src/**/*'],
    format: ['cjs', 'esm'],
    /* experimentalDts: true, */
    cjsInterop: true,
    dts: true,
    tsconfig: 'tsconfig.json',
    sourcemap: true,
    clean: true,
    keepNames: true,
    minify: false,
    skipNodeModulesBundle: true,
    target: 'node16',
    external: [],
    splitting: false,
    treeshake: true,
    ignoreWatch: ['**/dist', '**/node_modules'],
    /* watch: ['src'], */
    banner: {
        js: '/* Package */',
        css: '/* Package */',
    },
    footer: {
        js: '/* Package */',
        css: '/* Package */',
    },
    metafile: true,
    bundle: true,
    config: 'tsup.config.ts',
});
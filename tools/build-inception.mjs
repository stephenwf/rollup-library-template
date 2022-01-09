import { createRollupConfig, createTypeConfig } from 'rollup-library-template';

const baseConfig = {
  external: ['react'],
  externalNode: ['uuid'],
  filesize: true,
  minify: true,
};

export default [
  createTypeConfig({
    source: './dist/types/inception.d.ts',
    dist: './dist/inception/index.d.ts',
  }),

  // UMD bundle
  createRollupConfig({
    ...baseConfig,
    dist: 'dist/inception',
    inlineDynamicImports: true,
    input: './src/inception.ts',
    distPreset: 'umd',
    distOptions: {
      globalName: 'BuildToolsLibrary',
      globals: {
        react: 'React',
        crypto: 'crypto',
      }
    },
  }),

  // ESM
  createRollupConfig({
    ...baseConfig,
    dist: 'dist/inception',
    input: './src/inception.ts',
    distPreset: 'esm',
  }),

  // ESM node
  createRollupConfig({
    ...baseConfig,
    dist: 'dist/inception',
    input: './src/inception.ts',
    node: true,
    esmExtension: true,
    distPreset: 'esm',
  }),

  // CJS
  createRollupConfig({
    ...baseConfig,
    dist: 'dist/inception',
    input: './src/inception.ts',
    distPreset: 'cjs'
  }),

  // CJS node
  createRollupConfig({
    ...baseConfig,
    dist: 'dist/inception',
    input: './src/inception.ts',
    node: true,
    distPreset: 'cjs'
  }),

];

import { createRollupConfig, createTypeConfig } from 'rollup-library-template';

const baseConfig = {
  external: ['react'],
  externalNode: ['uuid'],
  filesize: true,
  minify: true,
  esbuildOptions: {
    define: {
      'process.env.NODE_ENV': 'true'
    }
  }
};

export default [
  createTypeConfig(),

  // UMD bundle
  createRollupConfig({
    ...baseConfig,
    inlineDynamicImports: true,
    input: './src/index.ts',
    distPreset: 'umd',
    distOptions: {
      globalName: 'BuildToolsLibrary',
      globals: {
        react: 'React',
      }
    },
  }),

  // ESM
  createRollupConfig({
    ...baseConfig,
    input: './src/index.ts',
    distPreset: 'esm',
  }),

  // ESM node
  createRollupConfig({
    ...baseConfig,
    input: './src/index.ts',
    node: true,
    esmExtension: true,
    distPreset: 'esm',
  }),

  // CJS
  createRollupConfig({
    ...baseConfig,
    input: './src/index.ts',
    distPreset: 'cjs'
  }),

  // CJS node
  createRollupConfig({
    ...baseConfig,
    input: './src/index.ts',
    node: true,
    distPreset: 'cjs'
  }),

];

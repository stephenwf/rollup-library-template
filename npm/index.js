const nodeResolve = require("@rollup/plugin-node-resolve").default;
const renameExtensions = require('@betit/rollup-plugin-rename-extensions').default;
const filesize = require('rollup-plugin-sizes');
const esbuild = require('rollup-plugin-esbuild').default;
const json = require("@rollup/plugin-json");
const dts = require("rollup-plugin-dts").default;

function createDistPreset(type, dist, options) {
  switch (type) {
    case 'umd':
      return {
        name: options.globalName,
        file: `${dist}/index.umd.js`,
        format: 'umd',
        globals: options.globals,
      };

    case 'esm':
      return {
        dir: `${dist}/esm${options.node ? '-node' : ''}`,
        format: 'es',
      };

    case 'cjs':
      return {
        dir: `${dist}/cjs${options.node ? '-node' : ''}`,
        format: 'cjs',
      };
  }
}

function createTypeConfig(options) {
  return {
    input: options && options.source ? options.source : `./dist/types/index.d.ts`,
    output: [{file: options && options.dist ? options.dist : 'dist/index.d.ts', format: 'es'}],
    plugins: [dts()],
  }
}

function createRollupConfig(options) {
  const typescript = typeof options.typescript === 'undefined' ? true : options.typescript;
  const extensions = options.extensions || (typescript ? ['ts', 'tsx', 'js', 'jsx', 'json'] : ['js', 'jsx', 'json']);
  const ext = [
    ...(options.external || []),
    ...(options.node ? options.externalNode || [] : options.externalBrowser || []),
  ];
  const dist = options.dist || 'dist';
  const esmExtension = typeof options.esmExtension === 'undefined' ? options.distPreset === 'esm' : true;
  const nodeResolveOptions = options.nodeResolve;
  const jsonOptions = options.jsonOptions;
  const esuildOptions = options.esuildOptions;

  const finalConfig = {
    input: options.input || (typescript ? './src/index.ts' : './src/index.js'),
    external: ext,
    inlineDynamicImports: options.inlineDynamicImports,
    plugins: [
      nodeResolve(nodeResolveOptions ? nodeResolveOptions : options.node ? {
        browser: false,
        preferBuiltins: true,
        exportConditions: ['node'],
        extensions,
      } : {
        browser: true,
        extensions,
      }),
      json(jsonOptions ? jsonOptions : {
        compact: options.minify,
      }),
      esbuild(esuildOptions ? esbuildOptions : {
        minify: options.minify,
        platform: options.node ? 'node' : undefined,
        target: options.target ? options.target : options.node ? ['node14'] : undefined,
        external: ext,
      }),
      esmExtension ? renameExtensions({
        include: typescript ? ['**/*.ts', '**/*.js', '**/*.mjs'] : ['**/*.js', '**/*.mjs'],
        mappings: {
          '.js': '.mjs',
        }
      }) : false,
      options.filesize ? filesize() : false,
    ].filter(Boolean),
    output: options.output || (options.distPreset ? [
      createDistPreset(options.distPreset, dist, { node: options.node, ...(options.distOptions || {})})
    ] : undefined),
    ...(options.extra || {}),
  };

  if (options.postProcess) {
    return options.postProcess(finalConfig);
  }
  return finalConfig;
}

module.exports = {
  createDistPreset,
  createRollupConfig,
  createTypeConfig,
};

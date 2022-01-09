# `rollup-library-template`
This is an experimental set of build tools working together. It aims to create a single set of dependencies and a 
single rollup config that will work for simple typescript projects that aim to publish NPM modules.

#### Environments + bundlers

- Node cjs
- Node esm
- Browser UMD bundles
- Browser ESM imports
- Bundlers importing (web / node)

#### Features

- Async
- Generators
- Dynamic imports*
- React/JSX
- Easy module bundling/global configuration
- Node specific bundles/code

*Including dynamic imports inside dependencies

_The rollup config is available at `./npm/index.mjs` if you would rather copy it. The dependencies are in `./npm/package.json`._

## Usage

You need rollup, and this preset.
```
yarn add rollup rollup-library-template
```

Then you can create your `rollup.config.js`:
```js
import { createRollupConfig } from 'rollup-library-template';

// Roll up configs
export default [
  createRollupConfig({
    input: './src/index.js',
    distPreset: 'esm',
    minify: true,
  }),
  createRollupConfig({
    input: './src/index.js',
    distPreset: 'cjs',
    minify: true,
  }),
];
```

Lastly you can add exports/main/module to your `package.json`
```json
{
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
  "exports": {
    ".": {
      "require": "./dist/cjs/index.js",
      "import": "./dist/esm/index.js",
      "default": "./dist/cjs/index.js"
    }
  }
}
```

This repository contains a more comprehensive example covering node-specific and web-specific bundles, using typescript
and specifying external dependencies. By default, nothing is included in your bundle unless you specify it.

### Node specific builds

`rollup.config.js`:
```js
import { createRollupConfig } from 'rollup-library-template';

// Roll up configs
export default [
  createRollupConfig({ /*... SAME AS ABOVE */ }),
  createRollupConfig({ /*... SAME AS ABOVE */ }),
  
  // New configs.
  createRollupConfig({
    input: './src/index.js',
    distPreset: 'esm',
    node: true, // <-- same as above, but with node
    esmExtension: true, // <-- This will change file extensions from .js to .mjs.
    minify: true,
  }),
  createRollupConfig({
    input: './src/index.js',
    distPreset: 'cjs',
    node: true, // <-- same as above, but with node
    minify: true,
  }),
];
```

When you create a node specific bundle, the dist directory will change. So `./dist/esm` will become `./dist/esm-node`.

With these extra bundles, you can configure your `package.json` to use them.

```json
{
  "exports": {
    ".": {
      "node": {
        "require": "./dist/cjs-node/index.js",
        "import": "./dist/esm-node/index.mjs",
        "default": "./dist/cjs-node/index.js"
      },
      "browser": {
        "require": "./dist/cjs/index.js",
        "import": "./dist/esm/index.js",
        "default": "./dist/index.umd.js"
      }
    }
  }
}
```

## Validating locally

Installing
```
yarn install
```

Building
```
yarn build
```

Test (node)
```
yarn test-node
```

Test (web)
```
yarn test-web
```
and open browser to [http://localhost:3050/test](http://localhost:3050/test). 

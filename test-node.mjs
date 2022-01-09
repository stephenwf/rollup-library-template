import { helloWorld, testAsync, testBundles, testGenerator, ReactTest, generateId } from 'build-tools';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server.js';

helloWorld('test');
testAsync();
testBundles()
testGenerator();

generateId().then(t => console.log('mjs', t));

import 'build-tools/inception';


console.log(
  renderToString(createElement(ReactTest, {}, []))
);

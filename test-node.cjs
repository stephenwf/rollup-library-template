const { helloWorld, testAsync, testBundles, testGenerator, ReactTest, generateId } = require('build-tools');

helloWorld('test');
testAsync();
testBundles()
testGenerator();

console.log('Success');

require('build-tools/inception');

generateId().then(t => console.log('cjs', t));


// React bit
const { createElement } = require('react');
const { renderToString } = require('react-dom/server');

console.log(
  renderToString(createElement(ReactTest, {}, []))
);

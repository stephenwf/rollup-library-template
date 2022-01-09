import './test-json';
import {toBundle} from "./to-bundle";

export function *testGenerator(): any {
  yield 1;
  const three = yield 2;
  if (three) {
    yield 4;
  }
  return 0;
}

export async function testAsync() {
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  })
}

export function helloWorld(test: string): { hello: string } {
  console.log(`hello ${test}!`);
  return { hello: test }
}

export async function testBundles() {
  return [
    toBundle(),
    (await import('./to-split')).toSplit(),
  ]
}

export * from './react-test';


export function generateId() {
  return import('./test-dependency').then(r => r.generateId());
}

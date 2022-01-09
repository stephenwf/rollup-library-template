// @ts-ignore
import { helloWorld, testAsync, testBundles, testGenerator, generateId } from 'build-tools';

helloWorld('test');
testAsync();
testBundles()
testGenerator();

generateId().then((t: any) => console.log('inception -> ', t));

console.log('Success');

export const t = { test: 'a string' };

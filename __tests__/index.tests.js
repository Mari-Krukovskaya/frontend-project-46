import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'node:path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const tree = [
  ['file1.json', 'file2.json', 'expectedStylish_result.txt'],
  ['file1.json', 'file2.json', 'expectedStylish_result.txt', 'stylish'],
  ['file1.yml', 'file2.yml', 'expectedStylish_result.txt', 'stylish'],
  ['file1.json', 'file2.json', 'expectedPlain_result.txt', 'plain'],
  ['file1.json', 'file2.json', 'expectedJson_result.txt', 'json'],
];

describe.each(tree)('compare check', (file1, file2, expected, format) => {
  const data1 = getFixturePath(file1);
  const data2 = getFixturePath(file2);
  const actual = genDiff(data1, data2, format);
  const expetedResult = readFile(expected);
  test(` test ${file1} && ${file2} with ${format} format to ${expected}`, () => {
    expect(actual).toEqual(expetedResult);
  });
});

test('empty File', () => {
  const emptyFile = () => {
    throw new TypeError();
  };
  expect(emptyFile).toThrow(TypeError);
});

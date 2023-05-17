import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'node:path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const fileJson1 = getFixturePath('file1.json');
const fileJson2 = getFixturePath('file2.json');
const fileYml1 = getFixturePath('file1.yml');
const fileYml2 = getFixturePath('file2.yml');
const expectedStylish = readFile('file.Stylish_result.txt');
const expectedPlain = readFile('file.FormatPlain_result.txt');

test('format stylish file json && yml', () => {
  const actual1 = genDiff(fileJson1, fileJson2);
  const actual2 = genDiff(fileYml1, fileYml2);
  expect(actual1).toEqual(expectedStylish);
  expect(actual2).toEqual(expectedStylish);
});
test('format plain file json && yml', () => {
  const actual3 = genDiff(fileJson1, fileJson2);
  const actual4 = genDiff(fileYml1, fileYml2);
  expect(actual3).toEqual(expectedPlain);
  expect(actual4).toEqual(expectedPlain);
});

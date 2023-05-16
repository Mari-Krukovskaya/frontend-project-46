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
const expectedStylishJson = readFile('file.StylishJson_result.txt');
const fileYml1 = getFixturePath('file1.yml');
const fileYml2 = getFixturePath('file2.yml');
const expectedStylishYml = readFile('file.StylishYml_result.txt');


// test.each([
// { file1: fileJson1, file2: fileJson2, format: 'stylish', expected: expectedStylishJson },
// { file1: fileYml1, file2: fileYml2, format: 'stylish', expected: expectedStylishYml },
// ])('difference calculator JSON && YML file in different formats', ({ file1, file2, format, expected }) => {
//   expect(genDiff(file1, file2, format)).toEqual(expected);
// });

test('gendiff', () => {
  const actual1 = genDiff(fileJson1, fileJson2);
  const actual2 = genDiff(fileYml1, fileYml2);
  expect(actual1).toEqual(expectedStylishJson);
  expect(actual2).toEqual(expectedStylishYml); 
});

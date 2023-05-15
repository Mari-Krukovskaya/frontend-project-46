import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'node:path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const fileJson1 = getFixturePath('fileNested1.json');
const fileJson2 = getFixturePath('fileNested2.json');
const expectedStylishJson = readFile('file.StylishJson_result.txt').trim();
const fileYml1 = getFixturePath('fileNested1.yml');
const fileYml2 = getFixturePath('fileNested2.yml');
const expectedStylishYml = readFile('file.StylishYml_result.txt').trim();

test('gendiff', () => {
  const actual1 = genDiff(fileJson1, fileJson2);
  const actual2 = genDiff(fileYml1, fileYml2);
  expect(actual1).toEqual(expectedStylishJson);
  expect(actual2).toEqual(expectedStylishYml);
});

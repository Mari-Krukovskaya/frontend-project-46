import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'node:path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedStylish = fs.readFileSync(getFixturePath('expectedStylish_result.txt'), 'utf-8');
const expectedPlain = fs.readFileSync(getFixturePath('expectedPlain_result.txt'), 'utf-8');
const expectedJson = fs.readFileSync(getFixturePath('expectedJson_result.txt'), 'utf-8');

const tests = ['json', 'yml'];

describe('Gendiff', () => {
  test.each([
    tests,
  ])('Should be work with %s format', (format) => {
    const filepath1 = getFixturePath(`file1.${format}`);
    const filepath2 = getFixturePath(`file2.${format}`);
    expect(genDiff(filepath1, filepath2)).toEqual(expectedStylish);
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectedStylish);
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectedJson);
  });
  test('Should be empty File', () => {
    const emptyFile = () => {
      throw new TypeError();
    };
    expect(emptyFile).toThrow(TypeError);
  });
});

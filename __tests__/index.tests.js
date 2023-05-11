import { test, expect } from "@jest/globals";
import { fileURLToPath } from 'url';
import path, { dirname } from "node:path";
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const fileJson1 = getFixturePath('file1.json');
const fileJson2 = getFixturePath('file.json');
const expectedJson = readFile('file.json_result.txt').trim();
const fileYml1 = getFixturePath('file1.yml');
const fileYml2 = getFixturePath('file2.yml');
const expectedYml = readFile('file.yml_result.txt').trim();

test('Comparison of flat files Json and Yml', () => {
    const actual1 = genDiff(fileJson1, fileJson2);
    const actual2 = genDiff(fileYml1, fileYml2);
    expect(actual1).toEqual(expectedJson);
    expect(actual2).toEqual(expectedYml);
});


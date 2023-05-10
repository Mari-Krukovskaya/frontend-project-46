import { test, expect } from "@jest/globals";
import { fileURLToPath } from 'url';
import path, { dirname } from "node:path";
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readfFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('check file.json', ()=> {
const expected = readfFile('file_result.txt');
const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
expect(actual).toBe(expected);
});


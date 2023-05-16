import { readFileSync } from 'fs';
import path from 'path';
import parseData from './parsers.js';
import compare from './genDiff.js';
import getFormatters from './formatters/index.js';

const getFormat = (filepath) => path.extname(filepath).slice(1);

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => readFileSync(getAbsolutePath(filepath, 'utf-8'));

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const file1 = parseData(data1, getFormat(filepath1));
  const file2 = parseData(data2, getFormat(filepath2));
  const diff = compare(file1, file2);
  return getFormatters(diff, formatName);
};

export default genDiff;

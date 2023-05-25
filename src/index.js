import fs from 'fs';
import path from 'path';
import diffGenerator from './genDiff.js';
import parseData from './parsers.js';
import getFormatters from './formatters/index.js';

const readFile = (filepath) => {
  const file = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(file, 'utf-8');
};

const getData = (filepath) => {
  const data = readFile(filepath);
  const extension = path.extname(filepath).slice(1);
  return parseData(data, extension);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const diff = diffGenerator(data1, data2);
  return getFormatters(diff, formatName);
};

export default genDiff;

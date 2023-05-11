import fs from 'fs';
import path from 'path';
import parseData from './parsers.js';
import compare from './genDiff.js';

const getData = (filepath) => path.extname(filepath).slice(1);

const getObject = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const readFile = fs.readFileSync(absolutePath, 'utf-8');
  const typeFile = getData(absolutePath);
  return parseData(readFile, typeFile);
};

export default (filepath1, filepath2) => {
  const data1 = getObject(filepath1);
  const data2 = getObject(filepath2);
  
  return compare(data1, data2);
}
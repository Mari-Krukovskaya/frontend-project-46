import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'node:process';
import parseData from './parsers.js';
import compare from './genDiff.js';

const getAbsolutePath = (filepath) => path.resolve(cwd(), filepath);

export default (filepath1, filepath2) => {
  const data1 = readFileSync(getAbsolutePath(filepath1), 'utf-8');
  const data2 = readFileSync(getAbsolutePath(filepath2), 'utf-8');

  const dataParse1 = JSON.parse(data1);
  const dataParse2 = JSON.parse(data2);
  //console.log(compare(dataParse1, dataParse2));
  return compare(dataParse1, dataParse2);
}
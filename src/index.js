import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'node:process';
import _  from 'lodash'

const compare = (data1, data2) => {
  const keysObj = _.union(_.keys(data1), _.keys(data2));
  const sortKeys = _.sortBy(keysObj);
  const result = sortKeys.map((key) => {
    if(!_.has(data1, key)) {
        return ` + ${key}: ${data2[key]}`;

    } else if (!_.has(data2, key)) {
        return ` - ${key}: ${data1[key]}`;

    } else if (data1[key] === data2[key]) {
        return `   ${key}: ${data1[key]}`;
    }
    return [` - ${key}: ${data1[key]}`,
` + ${key}: ${data2[key]}`];
  });
  const out = ['{', ...result, '}'].flat().join('\n ');
  console.log(out);
  return `${out}`
};

const getAbsolutePath = (filepath) => path.resolve(cwd(), filepath);

export default (filepath1, filepath2) => {
const data1 = readFileSync(getAbsolutePath(filepath1), 'utf-8');
const data2 = readFileSync(getAbsolutePath(filepath2), 'utf-8');

  const dataParse1 = JSON.parse(data1);
  const dataParse2 = JSON.parse(data2);
  //console.log(compare(dataParse1, dataParse2));
  return compare(dataParse1, dataParse2);
}
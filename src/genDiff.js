import _ from 'lodash';

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
    return `${out}`
  };
  export default compare;
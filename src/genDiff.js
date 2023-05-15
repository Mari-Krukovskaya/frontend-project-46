import _ from 'lodash';

const compare = (data1, data2) => {
  const keysObj = _.union(_.keys(data1), _.keys(data2));
  const sortKeys = _.sortBy(keysObj);
  return sortKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, value: data2[key], type: 'added' };
    }
    if (!_.has(data2, key)) {
      return { key, value: data1[key], type: 'deleted' };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      const children = compare(data1[key], data2[key]);
      return { key, children, type: 'nested' };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return { key, value: data1[key], type: 'unchanged' };
    }
    return {
      key, value1: data1[key], value2: data2[key], type: 'changed',
    };
  });
};

export default compare;

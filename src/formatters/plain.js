import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const formatPlain = (tree) => {
  const iter = (node, parent) => node
    .flatMap((data) => {
      const path = parent ? `${parent}.${data.key}` : data.key;
      switch (data.type) {
        case 'added':
          return `Property '${path}' was added with value: ${getValue(data.value)}`;
        case 'deleted':
          return `Property '${path}' was removed`;
        case 'changed':
          return `Property '${path}' was updated. From ${getValue(data.value1)} to ${getValue(data.value2)}`;
        case 'nested':
          return `${iter(data.children, `${path}`)}`;
        case 'unchanged':
          return [];
        default:
          throw new Error(`Uknown type ${data.type}`);
      }
        }).join('\n');
  return iter(tree);
};

export default formatPlain;

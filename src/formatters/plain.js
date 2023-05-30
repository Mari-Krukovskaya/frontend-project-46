import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};
const getPath = (path, key) => [path, key].filter(Boolean).join('.');

const formatPlain = (tree, path) => tree.flatMap((data) => {
  const line = getPath(path, data.key);
  switch (data.type) {
    case 'added':
      return `Property '${line}' was added with value: ${stringify(data.value)}`;
    case 'deleted':
      return `Property '${line}' was removed`;
    case 'changed':
      return `Property '${line}' was updated. From ${stringify(data.value1)} to ${stringify(data.value2)}`;
    case 'nested':
      return `${formatPlain(data.children, line)}`;
    case 'unchanged':
      return [];
    default: 
      throw new Error(`Uknown data.type: '${data.type}'!`);
  }
}).join('\n');

export default formatPlain;

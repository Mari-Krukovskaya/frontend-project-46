import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;
const getIndent = (depth) => replacer.repeat((depth * spacesCount) - 2);
const getCloseBracket = (depth) => replacer.repeat((depth * spacesCount) - spacesCount);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const entries = Object.entries(data);
  const result = entries.map(([key, value]) => `${getIndent(depth)}  ${key}: ${stringify(value, depth + 1)}`);
  const out = ['{', ...result, `${getCloseBracket(depth)}}`].join('\n');
  return out;
};

const formatStylish = (tree) => {
  const iter = (node, depth) => {
    const result = node.flatMap((data) => {
      switch (data.type) {
        case 'nested':
          return `${getIndent(depth)}   ${data.key}: ${iter(data.children, depth + 1)}`;
        case 'added':
          return `${getIndent(depth)} + ${data.key}: ${stringify(data.value, depth + 1)}`;
        case 'deleted':
          return `${getIndent(depth)} - ${data.key}: ${stringify(data.value, depth + 1)}`;
        case 'changed':
          return [
            `${getIndent(depth)} - ${data.key}: ${stringify(data.value1, depth + 1)}\n${getIndent(depth)} + ${data.key}: ${stringify(data.value2, depth + 1)}`,
          ];
        case 'unchanged':
          return `${getIndent(depth)}   ${data.key}: ${stringify(data.value, depth + 1)}`;
        default:
          throw new Error(`Uknown type ${data.type}`);
      }
    });

    return ['{', ...result, `${getCloseBracket(depth)}}`].join('\n');
  };

  return iter(tree, 1);
};

export default formatStylish;

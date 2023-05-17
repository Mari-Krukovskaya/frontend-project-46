import _ from 'lodash';

// const replacer = ' ';
// const spacesCount = 4;
const getIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(spacesCount * depth - 2);
// const getCloseBracket = (depth) => replacer.repeat(depth  * spacesCount - spacesCount);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const entries = Object.entries(data);
  const lines = entries.map(([key, value]) => `${getIndent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
  const out = [`{\n${lines.join('\n')}\n  ${getIndent(depth)}}`];
  return out;
};

const formatStylish = (tree) => {
  const iter = (node, depth = 1) => {
    const result = node.map((data) => {
      switch (data.type) {
        case 'unchanged':
          return `${getIndent(depth)}  ${data.key}: ${stringify(data.value, depth)}`;
        case 'changed':
          return [
            `${getIndent(depth)}- ${data.key}: ${stringify(data.value1, depth)}\n${getIndent(depth)}+ ${data.key}: ${stringify(data.value2, depth)}`,
          ];
        case 'added':
          return `${getIndent(depth)}+ ${data.key}: ${stringify(data.value, depth)}`;
        case 'deleted':
          return `${getIndent(depth)}- ${data.key}: ${stringify(data.value, depth)}`;
        case 'nested':
          return `${getIndent(depth)}  ${data.key}: {\n${iter(data.children, depth + 1)}\n${getIndent(depth)}  }`;
        default:
          throw new Error(`Uknown type ${data.type}`);
      }
    });
    return result.join('\n');
  };

  return `{\n${iter(tree)}\n}`;
};

export default formatStylish;

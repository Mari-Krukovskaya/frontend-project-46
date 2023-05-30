import _ from 'lodash';

const getIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(spacesCount * depth - 2);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const entries = Object.entries(data);
  const lines = entries.map(([key, value]) => `${getIndent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
  return `{\n${lines.join('\n')}\n${getIndent(depth)}  }`;
};

const iter = (node, depth = 1) => node.map((data) => {
  switch (data.type) {
    case 'added':
      return `${getIndent(depth)}+ ${data.key}: ${stringify(data.value, depth)}`;
    case 'deleted':
      return `${getIndent(depth)}- ${data.key}: ${stringify(data.value, depth)}`;
    case 'unchanged':
      return `${getIndent(depth)}  ${data.key}: ${stringify(data.value, depth)}`;
    case 'changed': {
      const line1 = `${getIndent(depth)}- ${data.key}: ${stringify(data.value1, depth)}`;
      const line2 = `${getIndent(depth)}+ ${data.key}: ${stringify(data.value2, depth)}`;
      return `${line1}\n${line2}`;
    }
    case 'nested': {
      const children = iter(data.children, depth + 1);
      return `${getIndent(depth)}  ${data.key}: {\n${children.join('\n')}\n${getIndent(depth)}  }`;
    }
    default: 
      throw new Error(`Uknown data.type: '${data.type}'!`);
    
  }
});
const formatStylish = (tree, depth = 1) => `{\n${iter(tree, depth).join('\n')}\n}`;

export default formatStylish;

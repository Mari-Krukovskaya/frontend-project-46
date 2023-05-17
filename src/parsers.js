import yaml from 'js-yaml';

const parseData = (content, format) => {
  switch (format) {
    case 'yaml':
    case 'yml':
      return yaml.load(content);
    default:
      throw new Error(`invalid format: '${format}'!`);
  }
};

export default parseData;

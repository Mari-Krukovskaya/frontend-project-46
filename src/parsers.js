import yaml from 'js-yaml';

const parseData = (content, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(content);
    case 'yaml':
    case 'yml':
      return yaml.load(content);
    default:
      throw new Error('invalid format!');
  }
};

export default parseData;

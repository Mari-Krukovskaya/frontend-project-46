import yaml from 'js-yaml';

const parseData = (content, format) => {
  switch (format) {
    case 'yaml':
    case 'yml':
      return yaml.load(content);
    case 'json':
    default:
      return JSON.parse(content);
  }
};

export default parseData;

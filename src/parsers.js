import yaml from 'js-yaml';

const parseData = (content, format) => {
  switch (format) {
    case 'yml':
    case 'yaml':
      return yaml.load(content);
    case 'json':
    default:
      return JSON.parse(content);
  }
};

export default parseData;

import yaml from 'js-yaml';

const parseData = (data, format) => {
  switch (format) {
    case 'yaml':
    case 'yml':
      return yaml.load(data);
    case 'json':
    default:
      return JSON.parse(data);
  }
};
export default parseData;

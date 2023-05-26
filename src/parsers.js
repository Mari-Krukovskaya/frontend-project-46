import yaml from 'js-yaml';

const parseData = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
    default:
      return yaml.load(data);
      // throw new Error(`Uknown format: '${format}!'`);
  }
};
export default parseData;

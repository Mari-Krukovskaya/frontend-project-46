import yaml from 'js-yaml';

const parseData = (data, format) => {
  switch (format) {
    case 'yaml':
      return yaml.load(data);
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`Uknown format: '${format}'!`);
  }
};
export default parseData;

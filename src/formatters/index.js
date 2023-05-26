import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const getFormatters = (data, format) => {
  switch (format) {
    case 'stylish':
      return formatStylish(data);
    case 'plain':
      return formatPlain(data);
    case 'json':
      return JSON.stringify(data, null, 2);
    default:
      throw new Error(`Uknown format:' ${format}'!`);
  }
};

export default getFormatters;

import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const getFormatters = (data, format) => {
  switch (format) {
    case 'stylish':
      return formatStylish(data);
    case 'plain':
      return formatPlain(data);
    case 'json':
    default:
      // throw new Error('Uknown format!');
      return JSON.stringify(data, null, 2);
  }
};

export default getFormatters;

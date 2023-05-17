import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const getFormatters = (data, format) => {
  switch (format) {
    case 'stylish':
      return formatStylish(data);
    case 'plain':
      return formatPlain(data);
    default:
      throw new Error(`Uknown format ${format}`);
  }
};

export default getFormatters;

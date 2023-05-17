import formatPlain from './plain.js';
import formatStylish from './stylish.js';
import formatJson from './json.js';

const getFormatters = (data, format) => {
  switch (format) {
    case 'stylish':
      return formatStylish(data);
    case 'plain':
      return formatPlain(data);
    case 'json':
    default:
      return formatJson(data);
  }
};

export default getFormatters;

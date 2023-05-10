import yaml from 'js-yaml';

const parseData = (content, format) => {
switch (format) {
    case 'json':
    return JSON.parse(content);
    case '.ymal':
    case '.yml':
        return yaml.load(content)
    default:
        throw new Error('Incorrect format!');
 }
};

export default parseData;

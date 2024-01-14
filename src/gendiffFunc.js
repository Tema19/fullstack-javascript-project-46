import readJsonYmlFile from './parsers.js';

function addPrefixToObjectKeys(obj, prefix) {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    const newKey = prefix + key;

    if (typeof obj[key] === 'object' && obj[key] !== null) {
      newObj[newKey] = addPrefixToObjectKeys(obj[key], prefix);
    } else {
      newObj[newKey] = obj[key];
    }
  });

  return newObj;
}

function diffObject(obj1, obj2) {
  const result = {};

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Find added and removed keys
  const addedKeys = keys2.filter((key) => !keys1.includes(key));
  const removedKeys = keys1.filter((key) => !keys2.includes(key));

  // Compare values for common keys
  const commonKeys = keys1.filter((key) => keys2.includes(key));
  commonKeys.forEach((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (typeof value1 !== 'object' && typeof value2 !== 'object' && value1 === value2) {
      result[`  ${key}`] = obj1[key];
    }
    if (typeof value1 === 'object' && typeof value2 === 'object') {
      // Recursive comparison for nested objects
      const nestedResult = diffObject(value1, value2);
      if (Object.keys(nestedResult).length > 0) {
        result[`  ${key}`] = nestedResult;
      }
    } else if (value1 !== value2) {
      // Highlight differences in values
      result[`- ${key}`] = (typeof value1 === 'object' && value1 !== null ? addPrefixToObjectKeys(value1, '  ') : value1);
      result[`+ ${key}`] = (typeof value2 === 'object' && value2 !== null ? addPrefixToObjectKeys(value2, '  ') : value2);
    }
  });

  // Highlight added keys
  addedKeys.forEach((key) => {
    if (typeof obj2[key] === 'object') {
      result[`+ ${key}`] = addPrefixToObjectKeys(obj2[key], '  ');
    } else {
      result[`+ ${key}`] = obj2[key];
    }
  });

  // Highlight removed keys
  removedKeys.forEach((key) => {
    if (typeof obj1[key] === 'object') {
      result[`- ${key}`] = addPrefixToObjectKeys(obj1[key], '  ');
    } else {
      result[`- ${key}`] = obj1[key];
    }
  });

  return result;
}

function sortObject(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  const sortedObj = {};
  Object.keys(obj)
    .sort((a, b) => a.slice(2).localeCompare(b.slice(2)))
    .forEach((key) => {
      sortedObj[key] = sortObject(obj[key]);
    });

  return sortedObj;
}

function stylish(obj, depth = 1) {
  const spaces = ' '.repeat(depth * 4 - 2);
  const spacesEnds = ' '.repeat(depth * 4 - 4);
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  const result = Object.entries(obj)
    .map(([key, value]) => `${spaces}${key}: ${stylish(value, depth + 1)}`)
    .join('\n');
  return `{\n${result}\n${spacesEnds}}`;
}

const gendiff = (filepath1, filepath2, formater = stylish) => {
  const data1 = readJsonYmlFile(filepath1);
  const data2 = readJsonYmlFile(filepath2);
  const result = formater(sortObject(diffObject(data1, data2)));
  console.log(result);
  return result;
};

export default gendiff;
export { stylish };

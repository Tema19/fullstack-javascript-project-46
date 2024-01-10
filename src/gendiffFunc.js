import readJsonYmlFile from './parsers.js';

function compareFunc(a, b) {
  if (a.propKey > b.propKey) { return 1; }
  if (b.propKey > a.propKey) { return -1; }
  return 0;
}

const gendiff = (filepath1, filepath2) => {
  const data1 = readJsonYmlFile(filepath1);
  const data2 = readJsonYmlFile(filepath2);
  const result = [];
  Object.entries(data1).forEach((entry1) => {
    const [key1, value1] = entry1;
    if (!Object.keys(data2).includes(key1)) {
      result.push({ propKey: key1, propValue: value1, propStatus: '-' });
    }
  });
  Object.entries(data2).forEach((entry2) => {
    const [key2, value2] = entry2;
    if (!Object.keys(data1).includes(key2)) {
      result.push({ propKey: key2, propValue: value2, propStatus: '+' });
    }
  });
  Object.entries(data1).forEach((entry1) => {
    const [key1, value1] = entry1;
    Object.entries(data2).forEach((entry2) => {
      const [key2, value2] = entry2;
      if ((key1 === key2) && (value1 === value2)) {
        result.push({ propKey: key1, propValue: value1, propStatus: ' ' });
      }
      if ((key1 === key2) && (value1 !== value2)) {
        result.push({ propKey: key1, propValue: value1, propStatus: '-' });
        result.push({ propKey: key1, propValue: value2, propStatus: '+' });
      }
    });
  });
  const sortedResult = result.sort(compareFunc)
    .map((prop) => `   ${prop.propStatus} ${prop.propKey} : ${prop.propValue}`);
  const printedResult = `{\n${sortedResult.join('\n')}\n}`;
  console.log(printedResult);
};

export default gendiff;

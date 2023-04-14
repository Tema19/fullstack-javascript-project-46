import fs from 'fs';
import path from 'path';

const readJsonFile = (filepath, cb) => {
  fs.readFile(path.resolve(filepath), 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    cb(err, JSON.parse(data));
  });
};

export default function gendiff(filepath1, filepath2) {
  readJsonFile(filepath1, (error, data1) => {
    readJsonFile(filepath2, (error, data2) => {
      const result = [];
      const entries1 = Object.entries(data1);
      const entries2 = Object.entries(data2);
      for (const [key1, value1] of entries1) {
        if (!Object.keys(data2).includes(key1)) {
          result.push({ propKey: key1, propValue: value1, propStatus: '-' });
        }
      }
      for (const [key2, value2] of entries2) {
        if (!Object.keys(data1).includes(key2)) {
          result.push({ propKey: key2, propValue: value2, propStatus: '+' });
        }
      }
      for (const [key1, value1] of entries1) {
        for (const [key2, value2] of entries2) {
          if ((key1 === key2) && (value1 === value2)) {
            result.push({ propKey: key1, propValue: value1, propStatus: ' ' });
          }
          if ((key1 === key2) && (value1 !== value2)) {
            result.push({ propKey: key1, propValue: value1, propStatus: '-' });
            result.push({ propKey: key1, propValue: value2, propStatus: '+' });
          }
        }
      }
      const sortedResult = result.sort((a, b) => {
        ((a.propKey > b.propKey) ? 1 : ((b.propKey > a.propKey) ? -1 : 0))
      })
        .map((prop) => `   ${prop.propStatus} ${prop.propKey} : ${prop.propValue}`);
      const printedResult = '{\n' + `${sortedResult.join('\r\n')}` + '\n}';
      console.log(printedResult);
    });
  });
}

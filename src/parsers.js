import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

function readJsonYmlFile(filepath) {
  let result = {};
  if (!fs.existsSync(filepath)) {
    throw new Error(`File '${filepath}' does not exist`);
  }

  try {
    const fileContents = fs.readFileSync(path.resolve(filepath), 'utf8');

    if (path.extname(filepath) === '.json') {
      result = JSON.parse(fileContents);
    }
    if (path.extname(filepath) === '.yml' || path.extname(filepath) === '.yaml') {
      result = yaml.load(fileContents);
    }
  } catch (err) {
    throw new Error('Error reading file:', err);
  }
  return result;
}
export default readJsonYmlFile;
